import { requireCapability } from '@/lib/organiser/session';
import { prisma } from '@/lib/organiser/db';
import { can } from '@/lib/organiser/permissions';
import { DOCUMENTS } from '@/lib/organiser/documents/builders';
import { PageHeader, Panel, Notice, TextLink } from '@/components/organiser/ui';

export default async function DocumentsPage() {
  const actor = await requireCapability('documents:generate');
  const sponsors = await prisma.sponsor.findMany({ orderBy: { companyName: 'asc' }, select: { id: true, companyName: true } });
  return (
    <>
      <PageHeader title="Documents" description="Generated on demand from the current records. PDF for sharing, DOCX for editing." />
      <div className="mb-6">
        <Notice>
          Documents carry a status label whenever they contain proposed amounts or pending approvals. They include branding placeholders and blank approval fields, never signatures, seals or sponsor logos. A document is blocked if a record contains an old event title or an unauthorised co-organiser name.
        </Notice>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(DOCUMENTS)
          .filter(([, d]) => !d.finance || can(actor.role, 'budget:view'))
          .map(([slug, d]) => (
            <Panel key={slug} title={d.label}>
              <p className="text-sm">
                <TextLink href={`/api/organiser/documents/${slug}?format=pdf`}>PDF</TextLink> · <TextLink href={`/api/organiser/documents/${slug}?format=docx`}>DOCX</TextLink>
              </p>
              {d.perSponsor && sponsors.length > 0 && (
                <form action={`/api/organiser/documents/${slug}`} className="mt-3 flex flex-wrap items-end gap-2 text-sm">
                  <select name="sponsorId" className="rounded-md border border-gray-300 px-2 py-1.5" required>
                    {sponsors.map((s) => (
                      <option key={s.id} value={s.id}>{s.companyName}</option>
                    ))}
                  </select>
                  <select name="format" className="rounded-md border border-gray-300 px-2 py-1.5">
                    <option value="pdf">PDF</option>
                    <option value="docx">DOCX</option>
                  </select>
                  <button className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50">For one sponsor</button>
                </form>
              )}
            </Panel>
          ))}
      </div>
    </>
  );
}
