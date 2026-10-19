import { requireCapability } from '@/lib/organiser/session';
import { prisma } from '@/lib/organiser/db';
import { can } from '@/lib/organiser/permissions';
import { TEMPLATES } from '@/lib/organiser/outreach/templates';
import { PageHeader, Panel, Badge, Notice, Disclosure, TextLink, fmtDate } from '@/components/organiser/ui';
import ActionForm from '@/components/organiser/ActionForm';
import CopyButton from '@/components/organiser/CopyButton';
import { createDraftAction, editDraftAction, submitDraftAction, reviewDraftAction, markDraftSentAction } from '../actions';

const TONE = { DRAFT: 'neutral', PENDING_APPROVAL: 'yellow', APPROVED: 'green', REJECTED: 'red', SENT_MANUALLY: 'blue' };
const LABEL = { DRAFT: 'Draft', PENDING_APPROVAL: 'Awaiting approval', APPROVED: 'Approved – ready to send', REJECTED: 'Changes requested', SENT_MANUALLY: 'Sent (recorded)' };

export default async function OutreachPage() {
  const actor = await requireCapability('outreach:draft');
  const [drafts, sponsors, requests] = await Promise.all([
    prisma.outreachDraft.findMany({ include: { sponsor: true, request: true }, orderBy: { updatedAt: 'desc' } }),
    prisma.sponsor.findMany({ where: { status: { notIn: ['DECLINED'] } }, orderBy: { companyName: 'asc' } }),
    prisma.institutionalRequest.findMany(),
  ]);
  const canApprove = can(actor.role, 'outreach:approve');

  return (
    <>
      <PageHeader
        title="Outreach drafts"
        description="Generate a draft from a template, fill every [placeholder], submit it for internal approval, then send it yourself from the official mailbox and record it here."
      />
      <div className="mb-6">
        <Notice tone="blue">This system does not send email. No sending integration is connected, and every message needs internal approval first.</Notice>
      </div>
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <Panel title="New sponsor email">
          <ActionForm
            action={createDraftAction}
            schema="draftCreate"
            columns={1}
            submitLabel="Create draft"
            fields={[
              { name: 'templateKey', label: 'Template', type: 'select', allowEmpty: false, options: Object.entries(TEMPLATES).filter(([, t]) => t.audience === 'sponsor').map(([value, t]) => ({ value, label: t.label })) },
              { name: 'sponsorId', label: 'Sponsor', type: 'select', required: true, options: sponsors.map((s) => ({ value: s.id, label: s.companyName })) },
            ]}
          />
        </Panel>
        <Panel title="New TPO / Foundation letter">
          <ActionForm
            action={createDraftAction}
            schema="draftCreate"
            columns={1}
            submitLabel="Create draft"
            fields={[
              { name: 'templateKey', label: 'Template', type: 'select', allowEmpty: false, options: Object.entries(TEMPLATES).filter(([, t]) => t.audience === 'institution').map(([value, t]) => ({ value, label: t.label })) },
              { name: 'requestId', label: 'Request', type: 'select', required: true, options: requests.map((r) => ({ value: r.id, label: r.title })) },
            ]}
          />
        </Panel>
      </div>

      <div className="flex flex-col gap-4">
        {drafts.map((d) => (
          <Panel key={d.id} id={d.id}>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-semibold">{d.subject}</p>
                <p className="text-xs text-gray-500">
                  {TEMPLATES[d.templateKey]?.label} · {d.sponsor ? <TextLink href={`/organiser/sponsors/${d.sponsor.id}`}>{d.sponsor.companyName}</TextLink> : d.request?.title} · by {d.createdBy} · updated {fmtDate(d.updatedAt)}
                </p>
              </div>
              <Badge tone={TONE[d.status]}>{LABEL[d.status]}</Badge>
            </div>
            {d.reviewNote && <p className="mb-3 text-sm text-gray-700">Reviewer note ({d.reviewedBy}): {d.reviewNote}</p>}
            {['DRAFT', 'REJECTED'].includes(d.status) ? (
              <>
                <ActionForm
                  action={editDraftAction}
                  schema="draftEdit"
                  hidden={{ id: d.id }}
                  columns={1}
                  submitLabel="Save draft"
                  fields={[
                    { name: 'subject', label: 'Subject', required: true, defaultValue: d.subject },
                    { name: 'body', label: 'Body', type: 'textarea', rows: 14, required: true, defaultValue: d.body },
                  ]}
                />
                {d.status === 'DRAFT' && (
                  <div className="mt-3">
                    <ActionForm action={submitDraftAction} hidden={{ id: d.id }} submitLabel="Submit for approval" variant="secondary" />
                  </div>
                )}
              </>
            ) : (
              <pre className="whitespace-pre-wrap rounded-md bg-gray-50 p-3 font-sans text-sm text-gray-800">{d.body}</pre>
            )}
            {d.status === 'PENDING_APPROVAL' && canApprove && d.createdBy !== actor.email && (
              <div className="mt-3">
                <Disclosure summary="Review this draft">
                  <ActionForm
                    action={reviewDraftAction}
                    schema="draftReview"
                    hidden={{ id: d.id }}
                    columns={1}
                    submitLabel="Record decision"
                    fields={[
                      { name: 'decision', label: 'Decision', type: 'select', allowEmpty: false, options: [{ value: 'APPROVED', label: 'Approve' }, { value: 'REJECTED', label: 'Request changes' }] },
                      { name: 'reviewNote', label: 'Note to the author', type: 'textarea' },
                    ]}
                  />
                </Disclosure>
              </div>
            )}
            {d.status === 'APPROVED' && (
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <CopyButton text={`Subject: ${d.subject}\n\n${d.body}`} />
                <ActionForm action={markDraftSentAction} hidden={{ id: d.id }} submitLabel="I have sent this email" variant="secondary" confirmText="Confirm you sent this email from the official mailbox." />
              </div>
            )}
          </Panel>
        ))}
        {!drafts.length && <p className="text-sm text-gray-500">No drafts yet.</p>}
      </div>
    </>
  );
}
