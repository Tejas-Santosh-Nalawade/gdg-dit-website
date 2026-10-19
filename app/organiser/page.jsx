import { requireActor } from '@/lib/organiser/session';
import { getOverview } from '@/lib/organiser/services/overview';
import { can } from '@/lib/organiser/permissions';
import { formatINR } from '@/lib/organiser/money';
import { MILESTONE_STATUS_LABELS, daysUntil } from '@/lib/organiser/milestones';
import { STATUS_LABELS, SPONSOR_STATUSES } from '@/lib/organiser/pipeline';
import { PageHeader, Panel, Stat, Notice, Badge, DataTable, Disclosure, TextLink, fmtDate } from '@/components/organiser/ui';
import ActionForm from '@/components/organiser/ActionForm';
import { recordMilestoneProgressAction, setSponsorTargetAction } from './actions';

const MILESTONE_TONE = { UPCOMING: 'neutral', ACTIVE: 'blue', COMPLETED: 'green', OVERDUE: 'red', PENDING_VERIFICATION: 'yellow' };

export default async function OrganiserOverview({ searchParams }) {
  const actor = await requireActor();
  const params = await searchParams;
  const o = await getOverview(actor);
  const money = (v) => formatINR(v);

  return (
    <>
      <PageHeader
        title="Executive overview"
        description={`Live position as of ${fmtDate(o.generatedAt)}. Only written, approved commitments count as confirmed money.`}
      />

      {params?.denied && (
        <div className="mb-6">
          <Notice tone="red">Your role does not have access to that page. Ask the Event Director if you need it.</Notice>
        </div>
      )}

      {!o.budgetApproved && (
        <div className="mb-6">
          <Notice title="Budget pending verification">
            The INCURSION budget has no recorded approval. All budget figures below are planning estimates, not approved amounts.
          </Notice>
        </div>
      )}

      {!o.restricted ? (
        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          <Stat label="Approved event budget" value={o.budgetApproved ? money(o.totals.approved) : 'Pending verification'} tone={o.budgetApproved ? undefined : 'warn'} />
          <Stat label="Proposed budget" value={money(o.totals.proposed)} hint={`Cash requirement ${money(o.totals.proposedCash)}`} />
          <Stat label="Sponsor target" value={o.sponsorTarget != null ? money(o.sponsorTarget) : 'Not set'} />
          <Stat label="Confirmed cash commitments" value={money(o.pipeline.confirmedCash)} />
          <Stat label="Cash received" value={money(o.pipeline.cashReceived)} tone="good" />
          <Stat label="Pending payments" value={money(o.pipeline.pendingPayments)} />
          <Stat label="Documented in-kind support" value={money(o.pipeline.inKind)} />
          <Stat
            label="Outstanding funding gap"
            value={money(o.funding.gap)}
            hint={o.funding.basis === 'APPROVED' ? 'Against approved budget' : 'Against proposed budget'}
            tone={o.funding.gap > 0 ? 'warn' : 'good'}
          />
          <Stat label="Institutional support approved" value={money(o.institutionalApproved)} />
          <Stat label="Requested from prospects" value={money(o.pipeline.requested)} hint="Not confirmed" />
        </div>
      ) : null}

      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat label="Sponsor prospects" value={o.pipeline.prospects} />
        <Stat label="Proposals submitted" value={o.pipeline.proposalsSubmitted} />
        <Stat label="Meetings completed" value={o.pipeline.meetingsCompleted} />
        <Stat label="Follow-ups due" value={o.pipeline.followUpsDue} tone={o.pipeline.followUpsDue ? 'warn' : undefined} />
        <Stat label="Agreements awaiting approval" value={o.pipeline.awaitingAgreement} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Timeline" description="Dates from the permission letter. Status uses today's date and the progress recorded here.">
          <DataTable
            columns={['Milestone', 'Dates', 'Status', '']}
            rows={o.milestones.map((m) => [
              m.name,
              m.startDate.getTime() === m.endDate.getTime() ? fmtDate(m.startDate) : `${fmtDate(m.startDate)} – ${fmtDate(m.endDate)}`,
              <span key="s" className="flex flex-col gap-1">
                <Badge tone={MILESTONE_TONE[m.status]}>{MILESTONE_STATUS_LABELS[m.status]}</Badge>
                {m.status === 'UPCOMING' && <span className="text-xs text-gray-500">in {daysUntil(m.startDate)} days</span>}
                {m.progressNote && <span className="text-xs text-gray-500">{m.progressNote}</span>}
              </span>,
              can(actor.role, 'milestone:record') ? (
                <Disclosure key="d" summary="Record progress">
                  <ActionForm
                    action={recordMilestoneProgressAction}
                    schema="milestoneProgress"
                    hidden={{ id: m.id }}
                    columns={1}
                    fields={[
                      { name: 'progress', label: 'Progress', type: 'select', allowEmpty: false, defaultValue: m.progress ?? 'NOT_STARTED', options: [{ value: 'NOT_STARTED', label: 'Not started' }, { value: 'IN_PROGRESS', label: 'In progress' }, { value: 'DONE', label: 'Done' }] },
                      { name: 'progressNote', label: 'Note / evidence', defaultValue: m.progressNote },
                    ]}
                  />
                </Disclosure>
              ) : null,
            ])}
          />
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel title="Follow-ups due today or overdue">
            <DataTable
              columns={['Company', 'Due', 'Assigned to']}
              rows={o.followUps.map((f) => [<TextLink key="l" href={`/organiser/sponsors/${f.id}`}>{f.companyName}</TextLink>, fmtDate(f.nextFollowUpAt), f.assignee ?? 'Unassigned'])}
              empty="No follow-ups due."
            />
          </Panel>
          <Panel title="Open tasks">
            <DataTable
              columns={['Task', 'Assigned to', 'Due']}
              rows={o.openTasks.map((t) => [t.title, t.assignee?.name, fmtDate(t.dueDate)])}
              empty="No open tasks."
            />
          </Panel>
          <Panel title="Pipeline by status">
            <div className="flex flex-wrap gap-2">
              {SPONSOR_STATUSES.filter((s) => o.pipeline.byStatus[s]).map((s) => (
                <Badge key={s}>
                  {STATUS_LABELS[s]}: {o.pipeline.byStatus[s]}
                </Badge>
              ))}
              {!Object.values(o.pipeline.byStatus).some(Boolean) && <p className="text-sm text-gray-500">No sponsors recorded.</p>}
            </div>
          </Panel>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Verification flags" description="Items that need checking against official records before they are relied on.">
          <ul className="flex flex-col gap-2 text-sm">
            {o.roster.findings
              .filter((f) => f.severity !== 'LOW' || f.code === 'UNVERIFIED')
              .map((f, i) => (
                <li key={i} className="flex gap-2">
                  <Badge tone={f.severity === 'HIGH' ? 'red' : f.severity === 'MEDIUM' ? 'yellow' : 'neutral'}>{f.severity}</Badge>
                  <span>{f.message}</span>
                </li>
              ))}
            {!o.restricted &&
              o.allocationIssues.map((m, i) => (
                <li key={`a${i}`} className="flex gap-2">
                  <Badge tone="red">FUNDING</Badge>
                  <span>{m}</span>
                </li>
              ))}
          </ul>
          <p className="mt-3 text-sm">
            <TextLink href="/organiser/committee">Open the roster verification report</TextLink>
          </p>
        </Panel>
        {can(actor.role, 'settings:edit') && (
          <Panel title="Sponsor target" description="The cash amount the team aims to raise from sponsors. Set it from the verified budget.">
            <ActionForm
              action={setSponsorTargetAction}
              schema="sponsorTarget"
              columns={1}
              fields={[{ name: 'sponsorTarget', label: 'Target (₹)', type: 'rupees', defaultValue: o.sponsorTarget ?? '' }]}
            />
          </Panel>
        )}
      </div>
    </>
  );
}
