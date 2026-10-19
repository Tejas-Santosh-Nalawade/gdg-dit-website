import { notFound } from 'next/navigation';
import { requireActor } from '@/lib/organiser/session';
import { getSponsor } from '@/lib/organiser/services/sponsors';
import { prisma } from '@/lib/organiser/db';
import { NotFoundError } from '@/lib/organiser/errors';
import { can } from '@/lib/organiser/permissions';
import { formatINR, sum } from '@/lib/organiser/money';
import { STATUS_LABELS, CATEGORY_LABELS } from '@/lib/organiser/pipeline';
import { categoryOptions, statusOptions, memberOptions, interactionOptions, statusTone } from '@/lib/organiser/options';
import { TEMPLATES } from '@/lib/organiser/outreach/templates';
import { PageHeader, Panel, Badge, DataTable, Disclosure, Notice, TextLink, fmtDate } from '@/components/organiser/ui';
import ActionForm from '@/components/organiser/ActionForm';
import {
  updateSponsorAction,
  recordConfirmationAction,
  approveAgreementAction,
  addContactAction,
  deleteContactAction,
  addInteractionAction,
  recordPaymentAction,
  addRelatedDocumentAction,
  createDraftAction,
  createTaskAction,
} from '../../actions';

export default async function SponsorDetail({ params }) {
  const actor = await requireActor();
  const { id } = await params;
  let s;
  try {
    s = await getSponsor(actor, id);
  } catch (e) {
    if (e instanceof NotFoundError) notFound();
    throw e;
  }
  const [members, packages] = await Promise.all([
    prisma.committeeMember.findMany({ orderBy: { name: 'asc' } }),
    prisma.sponsorshipPackage.findMany({ orderBy: { name: 'asc' } }),
  ]);
  const edit = can(actor.role, 'sponsor:edit');
  const showMoney = can(actor.role, 'finance:viewTotals');
  const received = showMoney ? sum(s.payments, (p) => p.amount) : 0;

  return (
    <>
      <PageHeader
        title={s.companyName}
        description={`${CATEGORY_LABELS[s.category]}${s.industry ? ` · ${s.industry}` : ''}${s.website ? ` · ${s.website}` : ''}`}
        actions={<Badge tone={statusTone(s.status)}>{STATUS_LABELS[s.status]}</Badge>}
      />

      {showMoney && (
        <div className="mb-6 grid gap-3 md:grid-cols-4">
          <Panel><p className="text-xs uppercase text-gray-500">Requested</p><p className="text-lg font-semibold">{s.requestedAmount != null ? formatINR(s.requestedAmount) : '—'}</p></Panel>
          <Panel><p className="text-xs uppercase text-gray-500">Cash committed (written)</p><p className="text-lg font-semibold">{formatINR(s.cashCommitted)}</p></Panel>
          <Panel><p className="text-xs uppercase text-gray-500">Cash received</p><p className="text-lg font-semibold">{formatINR(received)}</p></Panel>
          <Panel><p className="text-xs uppercase text-gray-500">In-kind (documented)</p><p className="text-lg font-semibold">{s.inKindValue ? formatINR(s.inKindValue) : '—'}</p></Panel>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Panel title="Details and pipeline status">
            {edit ? (
              <ActionForm
                action={updateSponsorAction}
                schema="sponsorUpdate"
                hidden={{ id: s.id }}
                fields={[
                  { name: 'companyName', label: 'Company name', required: true, defaultValue: s.companyName },
                  { name: 'category', label: 'Category', type: 'select', options: categoryOptions, allowEmpty: false, defaultValue: s.category },
                  { name: 'industry', label: 'Industry (detail)', defaultValue: s.industry },
                  { name: 'website', label: 'Official website', type: 'url', defaultValue: s.website },
                  { name: 'status', label: 'Status', type: 'select', options: statusOptions, allowEmpty: false, defaultValue: s.status, help: 'Written-confirmation stages need the confirmation recorded below first.' },
                  { name: 'packageId', label: 'Proposed package', type: 'select', options: packages.map((p) => ({ value: p.id, label: p.name })), defaultValue: s.packageId },
                  ...(showMoney ? [{ name: 'requestedAmount', label: 'Requested contribution (₹)', type: 'rupees', defaultValue: s.requestedAmount }] : []),
                  { name: 'assignedToId', label: 'Assigned to', type: 'select', options: memberOptions(members), defaultValue: s.assignedToId },
                  { name: 'lastContactAt', label: 'Last contact', type: 'date', defaultValue: s.lastContactAt },
                  { name: 'nextFollowUpAt', label: 'Next follow-up', type: 'date', defaultValue: s.nextFollowUpAt },
                  { name: 'researchSource', label: 'Research source', defaultValue: s.researchSource },
                  { name: 'researchDate', label: 'Research date', type: 'date', defaultValue: s.researchDate },
                  { name: 'notes', label: 'Notes', type: 'textarea', wide: true, defaultValue: s.notes },
                ]}
              />
            ) : (
              <dl className="grid gap-2 text-sm md:grid-cols-2">
                <div><dt className="text-gray-500">Assigned to</dt><dd>{s.assignedTo?.name ?? 'Unassigned'}</dd></div>
                <div><dt className="text-gray-500">Next follow-up</dt><dd>{fmtDate(s.nextFollowUpAt)}</dd></div>
                <div><dt className="text-gray-500">Research source</dt><dd>{s.researchSource ?? '—'}</dd></div>
                <div><dt className="text-gray-500">Notes</dt><dd>{s.notes ?? '—'}</dd></div>
              </dl>
            )}
          </Panel>

          <Panel title="Communication history">
            <DataTable
              columns={['Date', 'Type', 'Summary', 'Outcome', 'Recorded by']}
              rows={s.interactions.map((i) => [fmtDate(i.occurredAt), interactionOptions.find((o) => o.value === i.type)?.label, i.summary, i.outcome ?? '—', i.recordedBy])}
            />
            {edit && (
              <div className="mt-4">
                <Disclosure summary="Log an email, call, meeting or proposal">
                  <ActionForm
                    action={addInteractionAction}
                    schema="interaction"
                    hidden={{ sponsorId: s.id }}
                    fields={[
                      { name: 'type', label: 'Type', type: 'select', options: interactionOptions, allowEmpty: false, required: true },
                      { name: 'occurredAt', label: 'Date', type: 'date', required: true },
                      { name: 'attendees', label: 'Attendees' },
                      { name: 'outcome', label: 'Outcome / next step' },
                      { name: 'summary', label: 'Summary', type: 'textarea', required: true, wide: true },
                    ]}
                  />
                </Disclosure>
              </div>
            )}
          </Panel>

          {showMoney && (
            <Panel title="Confirmation, agreement and payments" description="Verbal interest is never recorded here. Amounts need written confirmation.">
              <dl className="mb-4 grid gap-2 text-sm md:grid-cols-2">
                <div><dt className="text-gray-500">Written confirmation</dt><dd>{s.confirmationReference ?? 'None recorded'}{s.confirmationDate ? ` (${fmtDate(s.confirmationDate)})` : ''}</dd></div>
                <div><dt className="text-gray-500">Agreement approval</dt><dd>{s.agreementApprovalRef ?? 'Not approved'}</dd></div>
                <div><dt className="text-gray-500">In-kind support</dt><dd>{s.inKindDescription ?? '—'}</dd></div>
              </dl>
              {can(actor.role, 'sponsor:confirm') && (
                <Disclosure summary="Record written confirmation and committed amounts">
                  <ActionForm
                    action={recordConfirmationAction}
                    schema="sponsorConfirmation"
                    hidden={{ id: s.id }}
                    fields={[
                      { name: 'confirmationReference', label: 'Confirmation reference', defaultValue: s.confirmationReference, help: 'Letter number, signed email subject/date, or PO number.' },
                      { name: 'confirmationDate', label: 'Confirmation date', type: 'date', defaultValue: s.confirmationDate },
                      { name: 'cashCommitted', label: 'Cash committed (₹)', type: 'rupees', defaultValue: s.cashCommitted || '' },
                      { name: 'inKindValue', label: 'In-kind value (₹)', type: 'rupees', defaultValue: s.inKindValue || '' },
                      { name: 'inKindDescription', label: 'In-kind description', wide: true, defaultValue: s.inKindDescription },
                    ]}
                  />
                </Disclosure>
              )}
              {can(actor.role, 'sponsor:approveAgreement') && (
                <div className="mt-3">
                  <Disclosure summary="Record institutional approval of the agreement">
                    <ActionForm
                      action={approveAgreementAction}
                      schema="agreementApproval"
                      hidden={{ id: s.id }}
                      columns={1}
                      fields={[{ name: 'agreementApprovalRef', label: 'Approval reference', required: true, defaultValue: s.agreementApprovalRef, help: 'The institute approval record (e.g. letter number and approving authority).' }]}
                    />
                  </Disclosure>
                </div>
              )}
              <h3 className="mb-2 mt-5 text-sm font-semibold">Payments received</h3>
              <DataTable
                columns={['Received on', 'Amount', 'Reference', 'Recorded by']}
                rows={s.payments.map((p) => [fmtDate(p.receivedOn), formatINR(p.amount), p.reference, p.recordedBy])}
                empty="No payments recorded."
              />
              {can(actor.role, 'payment:record') && (
                <div className="mt-3">
                  <Disclosure summary="Record a payment">
                    <ActionForm
                      action={recordPaymentAction}
                      schema="payment"
                      hidden={{ sponsorId: s.id }}
                      fields={[
                        { name: 'amount', label: 'Amount (₹)', type: 'rupees', required: true },
                        { name: 'receivedOn', label: 'Received on', type: 'date', required: true },
                        { name: 'reference', label: 'Receipt / transaction reference', required: true },
                        { name: 'note', label: 'Note' },
                      ]}
                    />
                  </Disclosure>
                </div>
              )}
            </Panel>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {can(actor.role, 'sponsor:viewContacts') ? (
            <Panel title="Verified contacts" description="Only contacts obtained from an official source.">
              <ul className="flex flex-col gap-3 text-sm">
                {s.contacts.map((c) => (
                  <li key={c.id} className="rounded-md border border-gray-200 p-3">
                    <p className="font-medium">{c.name}{c.designation ? `, ${c.designation}` : ''}</p>
                    {c.email && <p>{c.email}</p>}
                    {c.phone && <p>{c.phone}</p>}
                    <p className="text-xs text-gray-500">Source: {c.source}</p>
                    {edit && (
                      <ActionForm action={deleteContactAction} hidden={{ id: c.id, sponsorId: s.id }} submitLabel="Remove" variant="danger" confirmText="Remove this contact?" />
                    )}
                  </li>
                ))}
                {!s.contacts.length && <li className="text-gray-500">No verified contact yet.</li>}
              </ul>
              {edit && (
                <div className="mt-3">
                  <Disclosure summary="Add a verified contact">
                    <ActionForm
                      action={addContactAction}
                      schema="contact"
                      hidden={{ id: s.id }}
                      columns={1}
                      fields={[
                        { name: 'name', label: 'Name', required: true },
                        { name: 'designation', label: 'Designation' },
                        { name: 'email', label: 'Email', type: 'email' },
                        { name: 'phone', label: 'Phone', type: 'tel' },
                        { name: 'source', label: 'Official contact source', required: true, help: 'E.g. company careers page, TPO introduction email of 12 Nov.' },
                      ]}
                    />
                  </Disclosure>
                </div>
              )}
            </Panel>
          ) : (
            <Notice tone="blue">Contact details are visible to the Marketing & Sponsorship team, Finance and admins only.</Notice>
          )}

          {edit && (
            <Panel title="Draft an email" description="Drafts go to internal approval before anyone sends them.">
              <ActionForm
                action={createDraftAction}
                schema="draftCreate"
                hidden={{ sponsorId: s.id }}
                columns={1}
                submitLabel="Create draft"
                fields={[{ name: 'templateKey', label: 'Template', type: 'select', allowEmpty: false, options: Object.entries(TEMPLATES).filter(([, t]) => t.audience === 'sponsor').map(([value, t]) => ({ value, label: t.label })) }]}
              />
              {s.drafts.length > 0 && (
                <ul className="mt-3 text-sm">
                  {s.drafts.map((d) => (
                    <li key={d.id}>
                      <TextLink href={`/organiser/outreach#${d.id}`}>{d.subject}</TextLink> <Badge>{d.status.replace('_', ' ').toLowerCase()}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          )}

          <Panel title="Tasks">
            <DataTable columns={['Task', 'Owner', 'Due', 'Status']} rows={s.tasks.map((t) => [t.title, t.assignee.name, fmtDate(t.dueDate), t.status])} empty="No tasks." />
            {can(actor.role, 'task:edit') && (
              <div className="mt-3">
                <Disclosure summary="Assign a task">
                  <ActionForm
                    action={createTaskAction}
                    schema="task"
                    hidden={{ sponsorId: s.id }}
                    columns={1}
                    fields={[
                      { name: 'title', label: 'Task', required: true },
                      { name: 'assigneeId', label: 'Assign to', type: 'select', options: memberOptions(members), required: true },
                      { name: 'dueDate', label: 'Due', type: 'date' },
                    ]}
                  />
                </Disclosure>
              </div>
            )}
          </Panel>

          <Panel title="Related proposals and documents">
            <ul className="flex flex-col gap-1 text-sm">
              {s.documents.map((d) => (
                <li key={d.id}>
                  <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-[#1967d2] hover:underline">{d.title}</a>
                </li>
              ))}
              {!s.documents.length && <li className="text-gray-500">None linked.</li>}
            </ul>
            <p className="mt-2 text-sm">
              <TextLink href={`/api/organiser/documents/corporate-proposal?format=pdf&sponsorId=${s.id}`}>Generate proposal (PDF)</TextLink> ·{' '}
              <TextLink href={`/api/organiser/documents/corporate-proposal?format=docx&sponsorId=${s.id}`}>DOCX</TextLink>
            </p>
            {edit && (
              <div className="mt-3">
                <Disclosure summary="Link a document">
                  <ActionForm
                    action={addRelatedDocumentAction}
                    schema="relatedDocument"
                    hidden={{ sponsorId: s.id }}
                    columns={1}
                    fields={[
                      { name: 'title', label: 'Title', required: true },
                      { name: 'url', label: 'Link (Drive, etc.)', type: 'url', required: true },
                    ]}
                  />
                </Disclosure>
              </div>
            )}
          </Panel>
        </div>
      </div>
    </>
  );
}
