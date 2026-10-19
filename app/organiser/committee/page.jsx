import { requireCapability } from '@/lib/organiser/session';
import { prisma } from '@/lib/organiser/db';
import { can, ROLE_LABELS } from '@/lib/organiser/permissions';
import { getSettings } from '@/lib/organiser/settings';
import { rosterVerification, DOMAIN_LABELS, DOMAINS } from '@/lib/organiser/roster';
import { domainOptions, roleOptions, memberOptions } from '@/lib/organiser/options';
import { PageHeader, Panel, Badge, DataTable, Disclosure, Notice, fmtDate } from '@/components/organiser/ui';
import ActionForm from '@/components/organiser/ActionForm';
import { saveCommitteeMemberAction, setStatedTeamSizeAction, createTaskAction, setTaskStatusAction, saveOrganiserAction } from '../actions';

const memberFields = (m = {}) => [
  { name: 'serialNo', label: 'Sr. No.', type: 'number', defaultValue: m.serialNo ?? '' },
  { name: 'name', label: 'Name', defaultValue: m.name, help: 'Leave blank only if the official record is blank.' },
  { name: 'domain', label: 'Domain', type: 'select', options: domainOptions, allowEmpty: false, defaultValue: m.domain },
  { name: 'position', label: 'Position', required: true, defaultValue: m.position },
  { name: 'verified', label: 'Verified against the official committee record', type: 'checkbox', defaultValue: m.verified },
  { name: 'notes', label: 'Notes', defaultValue: m.notes },
];

export default async function CommitteePage() {
  const actor = await requireCapability('roster:view');
  const [members, settings, tasks, organisers] = await Promise.all([
    prisma.committeeMember.findMany({ orderBy: [{ serialNo: 'asc' }, { name: 'asc' }] }),
    getSettings(),
    prisma.task.findMany({ include: { assignee: true, sponsor: true }, orderBy: [{ status: 'asc' }, { dueDate: 'asc' }] }),
    can(actor.role, 'organiser:manage') ? prisma.organizer.findMany({ include: { committeeMember: true }, orderBy: { email: 'asc' } }) : [],
  ]);
  const report = rosterVerification(members, { teamSize: settings.statedTeamSize, domainCounts: settings.statedDomainCounts });
  const editRoster = can(actor.role, 'roster:edit');

  return (
    <>
      <PageHeader title="Committee" description="Initial structure from the team roster (GDGDIT/2026-27, 14 Oct 2026). Names and roles change only after checking against the official committee record." />

      <Panel title="Administrative verification report" className="mb-6">
        <p className="mb-3 text-sm text-gray-700">
          Stated team size: <strong>{report.statedTeamSize ?? 'not set'}</strong> · Roster entries: <strong>{report.total}</strong> · Named: <strong>{report.named}</strong> · Blank: <strong>{report.blank}</strong>
        </p>
        <ul className="flex flex-col gap-2 text-sm">
          {report.findings.map((f, i) => (
            <li key={i} className="flex gap-2">
              <Badge tone={f.severity === 'HIGH' ? 'red' : f.severity === 'MEDIUM' ? 'yellow' : 'neutral'}>{f.severity}</Badge>
              <span>{f.message}</span>
            </li>
          ))}
          {!report.findings.length && <li className="text-[#137333]">The roster matches the stated structure and every entry is verified.</li>}
        </ul>
        {editRoster && (
          <div className="mt-4">
            <Disclosure summary="Change the stated team size">
              <ActionForm action={setStatedTeamSizeAction} columns={1} fields={[{ name: 'statedTeamSize', label: 'Stated organising team size', type: 'number', defaultValue: report.statedTeamSize ?? '' }]} />
            </Disclosure>
          </div>
        )}
      </Panel>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        {DOMAINS.map((d) => {
          const list = members.filter((m) => m.domain === d);
          return (
            <Panel key={d} title={`${DOMAIN_LABELS[d]} (${list.length}${settings.statedDomainCounts?.[d] != null ? ` of ${settings.statedDomainCounts[d]} stated` : ''})`}>
              <ul className="flex flex-col gap-2 text-sm">
                {list.map((m) => (
                  <li key={m.id} className="flex flex-col gap-1 border-b border-gray-100 pb-2 last:border-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="w-8 text-gray-400">{m.serialNo ?? ''}</span>
                      <span className={m.name ? 'font-medium' : 'italic text-[#c5221f]'}>{m.name ?? 'Name missing in roster'}</span>
                      <Badge tone={/lead|director/i.test(m.position) ? 'blue' : 'neutral'}>{m.position}</Badge>
                      {m.verified ? <Badge tone="green">Verified</Badge> : <Badge tone="yellow">Unverified</Badge>}
                    </div>
                    {editRoster && (
                      <Disclosure summary="Edit">
                        <ActionForm action={saveCommitteeMemberAction} schema="committeeMember" hidden={{ id: m.id }} fields={memberFields(m)} />
                      </Disclosure>
                    )}
                  </li>
                ))}
              </ul>
            </Panel>
          );
        })}
      </div>

      {editRoster && (
        <Panel title="Add a verified member" className="mb-6" description="For seats confirmed in the official committee record but missing from the roster.">
          <ActionForm action={saveCommitteeMemberAction} schema="committeeMember" fields={memberFields({ verified: true })} />
        </Panel>
      )}

      <Panel title="Sponsorship tasks" className="mb-6">
        <DataTable
          columns={['Task', 'Assigned to', 'Sponsor', 'Due', 'Status', '']}
          rows={tasks.map((t) => [
            t.title,
            t.assignee.name,
            t.sponsor?.companyName ?? '—',
            fmtDate(t.dueDate),
            t.status === 'DONE' ? <Badge key="b" tone="green">Done</Badge> : <Badge key="b" tone="yellow">Open</Badge>,
            can(actor.role, 'task:edit') ? (
              <ActionForm key="a" action={setTaskStatusAction} hidden={{ id: t.id, status: t.status === 'DONE' ? 'OPEN' : 'DONE' }} submitLabel={t.status === 'DONE' ? 'Reopen' : 'Mark done'} variant="secondary" />
            ) : null,
          ])}
          empty="No tasks yet."
        />
        {can(actor.role, 'task:edit') && (
          <div className="mt-4">
            <Disclosure summary="Assign a task">
              <ActionForm
                action={createTaskAction}
                schema="task"
                fields={[
                  { name: 'title', label: 'Task', required: true, wide: true },
                  { name: 'assigneeId', label: 'Assign to', type: 'select', options: memberOptions(members), required: true },
                  { name: 'dueDate', label: 'Due', type: 'date' },
                ]}
              />
            </Disclosure>
          </div>
        )}
      </Panel>

      {can(actor.role, 'organiser:manage') && (
        <Panel title="Organiser access" description="Who can sign in to this area, and what they can do.">
          <div className="mb-4">
            <Notice tone="blue">
              Admin: everything, including approvals. Finance: budget, payments, confirmations. Marketing & Sponsorship: CRM, outreach drafts, institution workflows. Read-only: overview, pipeline and roster without contacts or money.
            </Notice>
          </div>
          <DataTable
            columns={['Email', 'Name', 'Role', 'Committee member', 'Active', '']}
            rows={organisers.map((o) => [
              o.email,
              o.name,
              ROLE_LABELS[o.role],
              o.committeeMember?.name ?? '—',
              o.active ? 'Yes' : 'No',
              <Disclosure key="e" summary="Edit">
                <ActionForm
                  action={saveOrganiserAction}
                  schema="organiser"
                  hidden={{ id: o.id }}
                  columns={1}
                  fields={[
                    { name: 'email', label: 'Email', type: 'email', required: true, defaultValue: o.email },
                    { name: 'name', label: 'Name', required: true, defaultValue: o.name },
                    { name: 'role', label: 'Role', type: 'select', options: roleOptions, allowEmpty: false, defaultValue: o.role },
                    { name: 'committeeMemberId', label: 'Committee member', type: 'select', options: memberOptions(members), defaultValue: o.committeeMemberId },
                    { name: 'active', label: 'Can sign in', type: 'checkbox', defaultValue: o.active },
                  ]}
                />
              </Disclosure>,
            ])}
          />
          <div className="mt-4">
            <Disclosure summary="Add an organiser">
              <ActionForm
                action={saveOrganiserAction}
                schema="organiser"
                fields={[
                  { name: 'email', label: 'Google account email', type: 'email', required: true },
                  { name: 'name', label: 'Name', required: true },
                  { name: 'role', label: 'Role', type: 'select', options: roleOptions, allowEmpty: false, defaultValue: 'VIEWER' },
                  { name: 'committeeMemberId', label: 'Committee member', type: 'select', options: memberOptions(members) },
                  { name: 'active', label: 'Can sign in', type: 'checkbox', defaultValue: true },
                ]}
              />
            </Disclosure>
          </div>
        </Panel>
      )}
    </>
  );
}
