import { requireCapability } from '@/lib/organiser/session';
import { prisma } from '@/lib/organiser/db';
import { can } from '@/lib/organiser/permissions';
import { formatINR } from '@/lib/organiser/money';
import { PageHeader, Panel, Notice, Disclosure, Badge } from '@/components/organiser/ui';
import ActionForm from '@/components/organiser/ActionForm';
import { savePackageAction } from '../actions';

const fields = (p = {}) => [
  { name: 'name', label: 'Package name', required: true, defaultValue: p.name },
  { name: 'amount', label: 'Contribution (₹)', type: 'rupees', defaultValue: p.amount ?? '', help: 'Leave empty until set against the verified budget.' },
  { name: 'slots', label: 'Slots available', type: 'number', defaultValue: p.slots ?? '' },
  { name: 'active', label: 'Offered', type: 'checkbox', defaultValue: p.active ?? true },
  { name: 'benefits', label: 'Benefits (one per line)', type: 'textarea', rows: 5, wide: true, defaultValue: (p.benefits ?? []).join('\n') },
  { name: 'notes', label: 'Internal notes', type: 'textarea', wide: true, defaultValue: p.notes },
];

export default async function PackagesPage() {
  const actor = await requireCapability('budget:view');
  const packages = await prisma.sponsorshipPackage.findMany({ include: { _count: { select: { sponsors: true } } }, orderBy: [{ amount: 'desc' }, { name: 'asc' }] });
  const edit = can(actor.role, 'package:edit');

  return (
    <>
      <PageHeader title="Sponsorship packages" description="Amounts stay editable and should follow the verified event budget and real sponsor interest." />
      <div className="mb-6">
        <Notice>
          Offer only benefits the institute allows: approved logo placement, website recognition, workshops, mentorship, sponsored challenges, networking, and optional recruitment engagement through the placement process with participant consent. Never guaranteed placements or access to student data.
        </Notice>
      </div>
      {edit && (
        <div className="mb-6">
          <Disclosure summary="Add a package">
            <ActionForm action={savePackageAction} schema="package" fields={fields()} />
          </Disclosure>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {packages.map((p) => (
          <Panel key={p.id} title={p.name} description={`${p.amount != null ? formatINR(p.amount) : 'Amount not set'} · ${p.slots ?? 'unlimited'} slots · ${p._count.sponsors} sponsors linked`}>
            {!p.active && <Badge>Not offered</Badge>}
            <ul className="ml-5 list-disc text-sm text-gray-700">
              {p.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            {edit && (
              <div className="mt-3">
                <Disclosure summary="Edit">
                  <ActionForm action={savePackageAction} schema="package" hidden={{ id: p.id }} fields={fields(p)} />
                </Disclosure>
              </div>
            )}
          </Panel>
        ))}
        {!packages.length && <p className="text-sm text-gray-500">No packages configured yet.</p>}
      </div>
    </>
  );
}
