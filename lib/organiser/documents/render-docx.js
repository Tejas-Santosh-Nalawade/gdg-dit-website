import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  HeadingLevel,
  Packer,
  PageNumber,
  PageOrientation,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';

const BLUE = '1A73E8';
const GREY = '5F6368';
const border = { style: BorderStyle.SINGLE, size: 4, color: 'BDC1C6' };
const borders = { top: border, bottom: border, left: border, right: border };

function cell(text, { header = false, width } = {}) {
  return new TableCell({
    borders,
    width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
    shading: header ? { type: ShadingType.CLEAR, color: 'auto', fill: 'E8F0FE' } : undefined,
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    children: String(text ?? '')
      .split('\n')
      .map((line) => new Paragraph({ children: [new TextRun({ text: line, bold: header, size: 18 })] })),
  });
}

function table({ columns, rows, widths }) {
  const total = (widths ?? columns.map(() => 1)).reduce((a, b) => a + b, 0);
  const pct = (widths ?? columns.map(() => 1)).map((w) => Math.round((w / total) * 100));
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({ tableHeader: true, children: columns.map((c, i) => cell(c, { header: true, width: pct[i] })) }),
      ...rows.map((r) => new TableRow({ children: r.map((v, i) => cell(v, { width: pct[i] })) })),
    ],
  });
}

function sectionChildren(section) {
  const out = [];
  if (section.branding) {
    out.push(
      table({ columns: section.branding.map((b) => `[${b}]`), rows: [section.branding.map(() => '\n\n')] }),
      new Paragraph({ text: '' }),
    );
    return out;
  }
  if (section.heading) out.push(new Paragraph({ text: section.heading, heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 } }));
  for (const p of section.paragraphs ?? []) out.push(new Paragraph({ children: [new TextRun({ text: p, size: 21 })], spacing: { after: 120 } }));
  for (const b of section.bullets ?? []) out.push(new Paragraph({ text: b, bullet: { level: 0 }, spacing: { after: 60 } }));
  for (const f of section.fields ?? []) {
    out.push(
      new Paragraph({
        spacing: { after: 80 },
        children: [new TextRun({ text: `${f.label}: `, bold: true, size: 21 }), new TextRun({ text: String(f.value ?? '—'), size: 21 })],
      }),
    );
  }
  if (section.table) out.push(table(section.table), new Paragraph({ text: '' }));
  return out;
}

export async function renderDocx(doc) {
  const landscape = doc.sections.some((s) => s.landscape);
  const header = new Header({
    children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: doc.eventLine, size: 16, color: GREY })] })],
  });
  const footer = new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: `Generated ${doc.generatedOn} from the GDG DIT sponsorship records · Page `, size: 16, color: GREY }),
          new TextRun({ children: [PageNumber.CURRENT], size: 16, color: GREY }),
          new TextRun({ text: ' of ', size: 16, color: GREY }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: GREY }),
        ],
      }),
    ],
  });
  const children = [
    new Paragraph({ children: [new TextRun({ text: doc.title, bold: true, size: 40, color: BLUE })], spacing: { after: 80 } }),
  ];
  if (doc.subtitle) children.push(new Paragraph({ children: [new TextRun({ text: doc.subtitle, size: 24, color: GREY })], spacing: { after: 160 } }));
  if (doc.statusLabel) {
    children.push(
      new Paragraph({
        border: { top: border, bottom: border, left: border, right: border },
        shading: { type: ShadingType.CLEAR, color: 'auto', fill: 'FEF7E0' },
        children: [new TextRun({ text: doc.statusLabel, bold: true, size: 20, color: 'B06000' })],
        spacing: { after: 200 },
      }),
    );
  }
  for (const s of doc.sections) children.push(...sectionChildren(s));

  const document = new Document({
    creator: 'GDG DIT organiser system',
    title: doc.title,
    styles: { default: { document: { run: { font: 'Arial' } } } },
    sections: [
      {
        properties: landscape ? { page: { size: { orientation: PageOrientation.LANDSCAPE } } } : {},
        headers: { default: header },
        footers: { default: footer },
        children,
      },
    ],
  });
  return Packer.toBuffer(document);
}
