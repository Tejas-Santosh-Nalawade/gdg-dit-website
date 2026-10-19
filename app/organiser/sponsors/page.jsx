import { requireActor } from '@/lib/organiser/session';
import { listSponsors } from '@/lib/organiser/services/sponsors';
import { prisma } from '@/lib/organiser/db';
import { can } from '@/lib/organiser/permissions';
import { formatINR } from '@/lib/organiser/money';
import { STATUS_LABELS, CATEGORY_LABELS } from '@/lib/organiser/pipeline';
import { categoryOptions, statusOptions, memberOptions, statusTone } from '@/lib/organiser/options';
import { PageHeader, Panel, Badge, DataTable, TextLink, Disclosure, fmtDate } from '@/components/organiser/ui';
import ActionForm from '@/components/organiser/ActionForm';
import { createSponsorAction } from '../actions';

export default async function SponsorsPage({ searchParams }) {
  const actor = await requireActor();
  const params = await searchParams;
  const [sponsors, members, packages] = await Promise.all([
    listSponsors(actor),
    prisma.committeeMember.findMany({ orderBy: { name: 'asc' } }),
    prisma.sponsorshipPackage.findMany({ where: { active: true }, orderBy: { name: 'asc' } }),
  ]);
  const showMoney = can(actor.role, 'finance:viewTotals');
  const filtered = sponsors.filter(
    (s) => (!params?.status || s.status === params.status) && (!params?.category || s.category === params.category),
  );

  return (
    <>
      <PageHeader
        title="Sponsor CRM"
        description="Every prospect is researched and verified individually. A company only counts as confirmed with written confirmation and an approved agreement."
      />

      {can(actor.role, 'sponsor:edit') && (
        <div className="mb-6">
          <Disclosure summary="Record a researched prospect">
            <ActionForm
              action={createSponsorAction}
              schema="sponsorCreate"
              submitLabel="Add prospect"
              fields={[
                { name: 'companyName', label: 'Company name', required: true },
                { name: 'category', label: 'Category', type: 'select', options: categoryOptions, required: true, allowEmpty: false },
                { name: 'industry', label: 'Industry (detail)' },
                { name: 'website', label: 'Official website', type: 'url', placeholder: 'https://' },
                { name: 'researchSource', label: 'Research source', required: true, help: 'Where this company was found (e.g. company site, TPO list, LinkedIn page). Do not record guesses.' },
                { name: 'researchDate', label: 'Research date', type: 'date' },
                { name: 'packageId', label: 'Proposed package', type: 'select', options: packages.map((p) => ({ value: p.id, label: p.name })) },
                { name: 'requestedAmount', label: 'Requested contribution (₹)', type: 'rupees' },
                { name: 'assignedToId', label: 'Assigned to', type: 'select', options: memberOptions(members) },
                { name: 'notes', label: 'Notes', type: 'textarea', wide: true },
              ]}
            />
          </Disclosure>
        </div>
      )}

      <Panel>
        <form className="mb-4 flex flex-wrap items-end gap-3 text-sm">
          <label className="flex flex-col gap-1">
            <span className="text-xs uppercase text-gray-500">Status</span>
            <select name="status" defaultValue={params?.status ?? ''} className="rounded-md border border-gray-300 px-2 py-1.5">
              <option value="">All</option>
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs uppercase text-gray-500">Category</span>
            <select name="category" defaultValue={params?.category ?? ''} className="rounded-md border border-gray-300 px-2 py-1.5">
              <option value="">All</option>
              {categoryOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <button className="rounded-md border border-gray-300 px-3 py-1.5 hover:bg-gray-50">Filter</button>
        </form>
        <DataTable
          columns={['Company', 'Category', 'Status', 'Assigned to', 'Last contact', 'Next follow-up', ...(showMoney ? ['Requested', 'Confirmed cash'] : [])]}
          rows={filtered.map((s) => [
            <TextLink key="n" href={`/organiser/sponsors/${s.id}`}>{s.companyName}</TextLink>,
            CATEGORY_LABELS[s.category],
            <Badge key="b" tone={statusTone(s.status)}>{STATUS_LABELS[s.status]}</Badge>,
            s.assignedTo?.name ?? 'Unassigned',
            fmtDate(s.lastContactAt),
            fmtDate(s.nextFollowUpAt),
            ...(showMoney ? [s.requestedAmount != null ? formatINR(s.requestedAmount) : '—', s.cashCommitted ? formatINR(s.cashCommitted) : '—'] : []),
          ])}
          empty="No sponsors match."
        />
      </Panel>
    </>
  );
}
