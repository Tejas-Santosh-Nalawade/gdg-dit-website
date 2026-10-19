import { getActor } from '@/lib/organiser/session';
import { assertCan, can, ForbiddenError } from '@/lib/organiser/permissions';
import { loadSnapshot } from '@/lib/organiser/services/overview';
import { buildDocument, DOCUMENTS } from '@/lib/organiser/documents/builders';
import { assertCompliant } from '@/lib/organiser/documents/compliance';
import { renderPdf } from '@/lib/organiser/documents/render-pdf';
import { renderDocx } from '@/lib/organiser/documents/render-docx';
import { formatINR } from '@/lib/organiser/money';
import { prisma } from '@/lib/organiser/db';
import { writeAudit } from '@/lib/organiser/audit';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request, { params }) {
  const actor = await getActor();
  if (!actor) return new Response('Sign in required', { status: 401 });
  const { slug } = await params;
  const def = DOCUMENTS[slug];
  if (!def) return new Response('Unknown document', { status: 404 });
  try {
    assertCan(actor, 'documents:generate');
    if (def.finance && !can(actor.role, 'budget:view')) throw new ForbiddenError('budget:view');
  } catch {
    return new Response('Not permitted', { status: 403 });
  }

  const url = new URL(request.url);
  const format = url.searchParams.get('format') === 'docx' ? 'docx' : 'pdf';
  const sponsorIdParam = url.searchParams.get('sponsorId');
  const sponsorId = def.perSponsor && sponsorIdParam && /^[a-z0-9]{1,40}$/i.test(sponsorIdParam) ? sponsorIdParam : undefined;

  const snapshot = await loadSnapshot();
  const doc = buildDocument(slug, snapshot, { sponsorId, money: (v) => formatINR(v, { symbol: format === 'pdf' ? 'Rs.' : '₹' }) });
  try {
    assertCompliant(doc);
  } catch (e) {
    return new Response(e.message, { status: 422 });
  }
  const body = format === 'pdf' ? await renderPdf(doc) : await renderDocx(doc);
  await writeAudit(prisma, actor, { action: 'document.generate', entityType: 'Document', entityId: slug, after: { format, sponsorId: sponsorId ?? null } });

  const filename = `INCURSION-2027-${slug}${sponsorId ? '-sponsor' : ''}.${format}`;
  return new Response(body, {
    headers: {
      'Content-Type': format === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
