import { requireCapability } from '@/lib/organiser/session';
import { getRequests } from '@/lib/organiser/services/workflows';
import { prisma } from '@/lib/organiser/db';
import { can } from '@/lib/organiser/permissions';
import { formatINR, sum } from '@/lib/organiser/money';
import { STATUS_LABELS } from '@/lib/organiser/pipeline';
import { requestStageOptions, fundingModeOptions, interactionOptions } from '@/lib/organiser/options';
import { PageHeader, Panel, Notice, Badge, DataTable, Disclosure, TextLink, fmtDate } from '@/components/organiser/ui';
import ActionForm from '@/components/organiser/ActionForm';
import {
  updateRequestAction,
  recordRequestApprovalAction,
  addFundingOptionAction,
  linkIntroducedSponsorAction,
  addInteractionAction,
  recordPaymentAction,
  addRelatedDocumentAction,
} from '../actions';

const stageLabel = (v) => requestStageOptions.find((o) => o.value === v)?.label ?? v;
const modeLabel = (v) => fundingModeOptions.find((o) => o.value === v)?.label ?? v;

function RequestPanel({ r, actor, sponsors }) {
  const edit = can(actor.role, 'institution:edit');
  const isTpo = r.type === 'TPO';
  const received = sum(r.payments, (p) => p.amount);
  return (
    <Panel
      title={r.title}
      description={isTpo ? 'Corporate introductions, outreach and contributions routed through the Training & Placement Office / CCRP.' : 'Innovation and prize-fund support from the Dr. D. Y. Patil Unitech Foundation.'}
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <Badge tone={['APPROVED', 'PARTIALLY_APPROVED'].includes(r.stage) ? 'green' : r.stage === 'DECLINED' ? 'red' : 'yellow'}>{stageLabel(r.stage)}</Badge>
        <Badge>Requested: {r.requestedAmount != null ? formatINR(r.requestedAmount) : 'not set'}</Badge>
        <Badge>Approved: {r.approvalReference ? formatINR(r.approvedAmount) : 'none recorded'}</Badge>
        <Badge>Received: {formatINR(received)}</Badge>
      </div>
      {r.approvalReference && (
        <p className="mb-4 text-sm text-gray-700">
          Approval reference {r.approvalReference}, dated {fmtDate(r.approvedOn)}.
        </p>
      )}

      {edit && (
        <Disclosure summary="Update request details">
          <ActionForm
            action={updateRequestAction}
            schema="institutionalRequest"
            hidden={{ id: r.id }}
            fields={[
              { name: 'title', label: 'Title', required: true, defaultValue: r.title },
              { name: 'stage', label: 'Stage', type: 'select', options: requestStageOptions.filter((o) => !['APPROVED', 'PARTIALLY_APPROVED'].includes(o.value) || o.value === r.stage), allowEmpty: false, defaultValue: r.stage, help: 'Approval is recorded separately with its reference.' },
              { name: 'contactPerson', label: 'Contact person', defaultValue: r.contactPerson },
              { name: 'requestedAmount', label: 'Requested amount (₹)', type: 'rupees', defaultValue: r.requestedAmount ?? '' },
              { name: 'conditions', label: 'Conditions', type: 'textarea', defaultValue: r.conditions },
              { name: 'reportingRequirements', label: 'Reporting requirements', type: 'textarea', defaultValue: r.reportingRequirements },
              isTpo
                ? { name: 'recruitmentRequests', label: 'Recruitment-related requests (subject to placement policy)', type: 'textarea', wide: true, defaultValue: r.recruitmentRequests }
                : { name: 'incubationNotes', label: 'Optional incubation discussions (not commitments)', type: 'textarea', wide: true, defaultValue: r.incubationNotes },
              { name: 'notes', label: 'Notes', type: 'textarea', wide: true, defaultValue: r.notes },
            ]}
          />
        </Disclosure>
      )}

      {can(actor.role, 'institution:recordApproval') && (
        <div className="mt-3">
          <Disclosure summary="Record formal approval">
            <ActionForm
              action={recordRequestApprovalAction}
              schema="institutionalApproval"
              hidden={{ id: r.id }}
              fields={[
                { name: 'approvedAmount', label: 'Approved amount (₹, 0 if declined)', type: 'rupees', required: true, defaultValue: r.approvedAmount ?? '' },
                { name: 'approvedOn', label: 'Approval date', type: 'date', required: true, defaultValue: r.approvedOn },
                { name: 'approvalReference', label: 'Approval reference', required: true, wide: true, defaultValue: r.approvalReference, help: 'Letter or minutes reference from the approving authority.' },
              ]}
            />
          </Disclosure>
        </div>
      )}

      {!isTpo && (
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-semibold">Funding options compared</h3>
          <DataTable
            columns={['Option', 'Amount', 'Description', 'Milestones / conditions']}
            rows={r.fundingOptions.map((o) => [modeLabel(o.mode), formatINR(o.amount), o.description, o.milestones ?? '—'])}
            empty="No options drafted. Add prize money, prototype grant and milestone-based options to compare them."
          />
          {edit && (
            <div className="mt-3">
              <Disclosure summary="Add a funding option">
                <ActionForm
                  action={addFundingOptionAction}
                  schema="fundingOption"
                  hidden={{ id: r.id }}
                  fields={[
                    { name: 'mode', label: 'Type', type: 'select', options: fundingModeOptions, allowEmpty: false },
                    { name: 'amount', label: 'Amount (₹)', type: 'rupees', required: true },
                    { name: 'description', label: 'Description', required: true, wide: true },
                    { name: 'milestones', label: 'Milestones / conditions', type: 'textarea', wide: true },
                  ]}
                />
              </Disclosure>
            </div>
          )}
        </div>
      )}

      {isTpo && (
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-semibold">Companies introduced through the office</h3>
          <DataTable
            columns={['Company', 'Status', 'Confirmed cash']}
            rows={r.introducedSponsors.map((s) => [<TextLink key="n" href={`/organiser/sponsors/${s.id}`}>{s.companyName}</TextLink>, STATUS_LABELS[s.status], s.cashCommitted ? formatINR(s.cashCommitted) : '—'])}
            empty="No introductions recorded yet."
          />
          {can(actor.role, 'sponsor:edit') && (
            <div className="mt-3">
              <Disclosure summary="Record an introduction">
                <ActionForm
                  action={linkIntroducedSponsorAction}
                  hidden={{ id: r.id }}
                  columns={1}
                  fields={[{ name: 'sponsorId', label: 'Company (add it to the CRM first)', type: 'select', required: true, options: sponsors.map((s) => ({ value: s.id, label: s.companyName })) }]}
                />
              </Disclosure>
            </div>
          )}
        </div>
      )}

      <div className="mt-6">
        <h3 className="mb-2 text-sm font-semibold">Meetings and correspondence</h3>
        <DataTable
          columns={['Date', 'Type', 'Summary', 'Outcome']}
          rows={r.interactions.map((i) => [fmtDate(i.occurredAt), interactionOptions.find((o) => o.value === i.type)?.label, i.summary, i.outcome ?? '—'])}
        />
        {edit && (
          <div className="mt-3">
            <Disclosure summary="Log a meeting or letter">
              <ActionForm
                action={addInteractionAction}
                schema="interaction"
                hidden={{ requestId: r.id }}
                fields={[
                  { name: 'type', label: 'Type', type: 'select', options: interactionOptions, allowEmpty: false },
                  { name: 'occurredAt', label: 'Date', type: 'date', required: true },
                  { name: 'attendees', label: 'Attendees' },
                  { name: 'outcome', label: 'Outcome' },
                  { name: 'summary', label: 'Summary', type: 'textarea', required: true, wide: true },
                ]}
              />
            </Disclosure>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold">Receipts</h3>
          <DataTable columns={['Date', 'Amount', 'Reference']} rows={r.payments.map((p) => [fmtDate(p.receivedOn), formatINR(p.amount), p.reference])} empty="None." />
          {can(actor.role, 'payment:record') && r.approvedAmount > 0 && (
            <div className="mt-3">
              <Disclosure summary="Record a receipt">
                <ActionForm
                  action={recordPaymentAction}
                  schema="payment"
                  hidden={{ requestId: r.id }}
                  columns={1}
                  fields={[
                    { name: 'amount', label: 'Amount (₹)', type: 'rupees', required: true },
                    { name: 'receivedOn', label: 'Received on', type: 'date', required: true },
                    { name: 'reference', label: 'Reference', required: true },
                  ]}
                />
              </Disclosure>
            </div>
          )}
        </div>
        <div>
          <h3 className="mb-2 text-sm font-semibold">Documents</h3>
          <ul className="text-sm">
            <li>
              <TextLink href={`/api/organiser/documents/${isTpo ? 'tpo-request' : 'foundation-proposal'}?format=pdf`}>Generate {isTpo ? 'TPO request' : 'Foundation proposal'} (PDF)</TextLink> ·{' '}
              <TextLink href={`/api/organiser/documents/${isTpo ? 'tpo-request' : 'foundation-proposal'}?format=docx`}>DOCX</TextLink>
            </li>
            {r.documents.map((d) => (
              <li key={d.id}>
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-[#1967d2] hover:underline">{d.title}</a>
              </li>
            ))}
          </ul>
          {edit && (
            <div className="mt-3">
              <Disclosure summary="Link a document">
                <ActionForm
                  action={addRelatedDocumentAction}
                  schema="relatedDocument"
                  hidden={{ requestId: r.id }}
                  columns={1}
                  fields={[
                    { name: 'title', label: 'Title', required: true },
                    { name: 'url', label: 'Link', type: 'url', required: true },
                  ]}
                />
              </Disclosure>
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
}

export default async function InstitutionsPage() {
  const actor = await requireCapability('institution:view');
  const [requests, sponsors] = await Promise.all([getRequests(actor), prisma.sponsor.findMany({ orderBy: { companyName: 'asc' } })]);
  return (
    <>
      <PageHeader title="TPO & DPU Unitech Foundation" description="Two separate institutional paths. Neither has committed money until a formal approval is recorded here." />
      <div className="mb-6">
        <Notice>
          Any funding allocation, grant, investment, equity arrangement or incubation commitment is subject to the Foundation&apos;s formal approval and policies. TPO introductions and recruitment engagement follow the institute&apos;s placement policy.
        </Notice>
      </div>
      <div className="flex flex-col gap-6">
        {requests.map((r) => (
          <RequestPanel key={r.id} r={r} actor={actor} sponsors={sponsors} />
        ))}
      </div>
    </>
  );
}
