import PDFDocument from 'pdfkit';

const BLUE = '#1a73e8';
const GREY = '#5f6368';
const LINE = '#bdc1c6';
const MARGIN = 50;

// Standard PDF fonts cannot draw the rupee sign, so callers pass "Rs." amounts.
function safe(text) {
  return String(text ?? '').replace(/₹/g, 'Rs. ');
}

function ensureSpace(pdf, height) {
  if (pdf.y + height > pdf.page.height - MARGIN - 20) pdf.addPage();
}

function drawTable(pdf, { columns, rows, widths }) {
  const usable = pdf.page.width - MARGIN * 2;
  const weights = widths ?? columns.map(() => 1);
  const total = weights.reduce((a, b) => a + b, 0);
  const colW = weights.map((w) => (w / total) * usable);
  const pad = 4;
  const fontSize = columns.length > 6 ? 7.5 : 9;

  const rowHeight = (cells, bold) => {
    pdf.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(fontSize);
    return Math.max(...cells.map((c, i) => pdf.heightOfString(safe(c), { width: colW[i] - pad * 2 }))) + pad * 2;
  };

  const drawRow = (cells, { header = false } = {}) => {
    const h = rowHeight(cells, header);
    if (pdf.y + h > pdf.page.height - MARGIN - 20) {
      pdf.addPage();
      if (!header) drawRow(columns, { header: true });
    }
    const y = pdf.y;
    let x = MARGIN;
    cells.forEach((c, i) => {
      if (header) pdf.rect(x, y, colW[i], h).fill('#e8f0fe');
      pdf.rect(x, y, colW[i], h).lineWidth(0.5).stroke(LINE);
      pdf
        .fillColor('#202124')
        .font(header ? 'Helvetica-Bold' : 'Helvetica')
        .fontSize(fontSize)
        .text(safe(c), x + pad, y + pad, { width: colW[i] - pad * 2 });
      x += colW[i];
    });
    pdf.x = MARGIN;
    pdf.y = y + h;
  };

  drawRow(columns, { header: true });
  for (const r of rows) drawRow(r);
  pdf.moveDown(0.8);
}

function drawSection(pdf, section) {
  const width = pdf.page.width - MARGIN * 2;
  if (section.branding) {
    const boxW = (width - 12 * (section.branding.length - 1)) / section.branding.length;
    ensureSpace(pdf, 60);
    const y = pdf.y;
    section.branding.forEach((label, i) => {
      const x = MARGIN + i * (boxW + 12);
      pdf.rect(x, y, boxW, 46).dash(3, { space: 3 }).lineWidth(0.7).stroke(LINE).undash();
      pdf.fillColor(GREY).font('Helvetica-Oblique').fontSize(8).text(`[${label}]`, x, y + 19, { width: boxW, align: 'center' });
    });
    pdf.x = MARGIN;
    pdf.y = y + 58;
    return;
  }
  if (section.heading) {
    ensureSpace(pdf, 40);
    pdf.moveDown(0.4).fillColor(BLUE).font('Helvetica-Bold').fontSize(13).text(safe(section.heading), MARGIN, pdf.y, { width });
    pdf.moveDown(0.3);
  }
  pdf.fillColor('#202124').font('Helvetica').fontSize(10);
  for (const p of section.paragraphs ?? []) {
    ensureSpace(pdf, 24);
    pdf.font('Helvetica').fontSize(10).text(safe(p), MARGIN, pdf.y, { width, align: 'left' }).moveDown(0.4);
  }
  for (const b of section.bullets ?? []) {
    ensureSpace(pdf, 18);
    pdf.font('Helvetica').fontSize(10).text(`•  ${safe(b)}`, MARGIN + 8, pdf.y, { width: width - 8 }).moveDown(0.2);
  }
  for (const f of section.fields ?? []) {
    ensureSpace(pdf, 16);
    pdf.font('Helvetica-Bold').fontSize(10).text(`${safe(f.label)}: `, MARGIN, pdf.y, { continued: true, width });
    pdf.font('Helvetica').text(safe(f.value ?? '—'));
    pdf.moveDown(0.15);
  }
  if (section.table) {
    pdf.moveDown(0.3);
    drawTable(pdf, section.table);
  }
}

export function renderPdf(doc) {
  const landscape = doc.sections.some((s) => s.landscape);
  const pdf = new PDFDocument({
    size: 'A4',
    layout: landscape ? 'landscape' : 'portrait',
    margins: { top: MARGIN + 10, bottom: MARGIN, left: MARGIN, right: MARGIN },
    bufferPages: true,
    info: { Title: safe(doc.title), Author: 'GDG DIT organiser system' },
  });
  const chunks = [];
  pdf.on('data', (c) => chunks.push(c));
  const done = new Promise((resolve, reject) => {
    pdf.on('end', () => resolve(Buffer.concat(chunks)));
    pdf.on('error', reject);
  });

  const width = pdf.page.width - MARGIN * 2;
  pdf.fillColor(BLUE).font('Helvetica-Bold').fontSize(20).text(safe(doc.title), MARGIN, MARGIN + 10, { width });
  if (doc.subtitle) pdf.fillColor(GREY).font('Helvetica').fontSize(12).text(safe(doc.subtitle), { width });
  pdf.moveDown(0.6);
  if (doc.statusLabel) {
    const y = pdf.y;
    pdf.rect(MARGIN, y, width, 22).fill('#fef7e0');
    pdf.fillColor('#b06000').font('Helvetica-Bold').fontSize(9.5).text(safe(doc.statusLabel), MARGIN + 8, y + 7, { width: width - 16 });
    pdf.x = MARGIN;
    pdf.y = y + 32;
  }
  for (const s of doc.sections) drawSection(pdf, s);

  const range = pdf.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    pdf.switchToPage(i);
    const bottom = pdf.page.height - MARGIN + 18;
    // Writing inside the bottom margin must not trigger an automatic page break.
    const saved = pdf.page.margins.bottom;
    pdf.page.margins.bottom = 0;
    pdf.fillColor(GREY).font('Helvetica').fontSize(7.5);
    pdf.text(safe(doc.eventLine), MARGIN, MARGIN - 18, { width, align: 'right', lineBreak: false });
    pdf.text(`Generated ${safe(doc.generatedOn)} from the GDG DIT sponsorship records  ·  Page ${i + 1} of ${range.count}`, MARGIN, bottom, {
      width,
      align: 'center',
      lineBreak: false,
    });
    pdf.page.margins.bottom = saved;
  }
  pdf.end();
  return done;
}
