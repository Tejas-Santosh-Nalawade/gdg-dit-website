import { requireCapability } from '@/lib/organiser/session';
import { getBudget } from '@/lib/organiser/services/finance';
import { computeOverview, loadSnapshot } from '@/lib/organiser/services/overview';
import { prisma } from '@/lib/organiser/db';
import { can } from '@/lib/organiser/permissions';
import { formatINR } from '@/lib/organiser/money';
import { BUDGET_CATEGORY_LABELS, STAGE_LABELS, FUNDING_SOURCE_LABELS, lineEstimate } from '@/lib/organiser/budget';
import {
  budgetCategoryOptions,
  stageOptions,
  fundingSourceOptions,
  quotationOptions,
  paymentStatusOptions,
  memberOptions,
  incomeSourceOptions,
  incomeStatusOptions,
} from '@/lib/organiser/options';
import { PageHeader, Panel, Notice, Badge, DataTable, Disclosure, Stat, fmtDate } from '@/components/organiser/ui';
import ActionForm from '@/components/organiser/ActionForm';
import {
  saveBudgetLineAction,
  approveBudgetLineAction,
  deleteBudgetLineAction,
  setBudgetApprovalAction,
  saveIncomeLineAction,
} from '../actions';

function lineFields(l = {}, members, sponsors) {
  return [
    { name: 'category', label: 'Category', type: 'select', options: budgetCategoryOptions, allowEmpty: false, defaultValue: l.category },
    { name: 'description', label: 'Description', required: true, defaultValue: l.description },
    { name: 'quantity', label: 'Quantity', type: 'number', defaultValue: l.quantity ?? '' },
    { name: 'unitCost', label: 'Unit cost (₹)', type: 'rupees', defaultValue: l.unitCost ?? '' },
    { name: 'estimatedTotal', label: 'Estimated total (₹)', type: 'rupees', defaultValue: l.estimatedTotal ?? '', help: 'Ignored when quantity and unit cost are both set.' },
    { name: 'quotationStatus', label: 'Quotation', type: 'select', options: quotationOptions, allowEmpty: false, defaultValue: l.quotationStatus ?? 'NOT_REQUESTED' },
    { name: 'quotationAmount', label: 'Quoted amount (₹)', type: 'rupees', defaultValue: l.quotationAmount ?? '' },
    { name: 'actualAmount', label: 'Actual amount (₹)', type: 'rupees', defaultValue: l.actualAmount ?? '' },
    { name: 'stage', label: 'Stage', type: 'select', options: stageOptions, allowEmpty: false, defaultValue: l.stage ?? 'ESTIMATE' },
    { name: 'paymentStatus', label: 'Payment status', type: 'select', options: paymentStatusOptions, allowEmpty: false, defaultValue: l.paymentStatus ?? 'UNPAID' },
    { name: 'fundingSource', label: 'Funding source', type: 'select', options: fundingSourceOptions, allowEmpty: false, defaultValue: l.fundingSource ?? 'UNASSIGNED' },
    { name: 'fundingSponsorId', label: 'Funding sponsor', type: 'select', options: sponsors.map((s) => ({ value: s.id, label: s.companyName })), defaultValue: l.fundingSponsorId, help: 'Only for sponsor-funded lines.' },
    { name: 'responsibleId', label: 'Responsible member', type: 'select', options: memberOptions(members), defaultValue: l.responsibleId },
    { name: 'supportingDocUrl', label: 'Supporting document link', type: 'url', defaultValue: l.supportingDocUrl },
    { name: 'notes', label: 'Notes', type: 'textarea', wide: true, defaultValue: l.notes },
  ];
}

export default async function BudgetPage() {
  const actor = await requireCapability('budget:view');
  const { lines, historical, income } = await getBudget(actor);
  const overview = computeOverview(await loadSnapshot());
  const [members, sponsors] = await Promise.all([
    prisma.committeeMember.findMany({ orderBy: { name: 'asc' } }),
    prisma.sponsor.findMany({ where: { confirmationReference: { not: null } }, orderBy: { companyName: 'asc' } }),
  ]);
  const settings = (await prisma.setting.findMany()).reduce((a, s) => ({ ...a, [s.key]: s.value }), {});
  const meta = settings['historical.meta'] ?? {};
  const approval = overview.budgetApproval;
  const edit = can(actor.role, 'budget:edit');
  const approve = can(actor.role, 'budget:approve');
  const t = overview.totals;
  const h = overview.historical;

  return (
    <>
      <PageHeader
        title="INCURSION budget"
        description="Estimates, quotations, approvals, commitments, invoices and payments are kept apart. Cash sponsorship and in-kind support are never added together."
      />

      <div className="mb-6">
        {overview.budgetApproved ? (
          <Notice tone="blue" title="Budget approved">
            Approved by {approval.approvedBy} on {fmtDate(approval.approvedOn)} (ref. {approval.approvalReference}).
          </Notice>
        ) : (
          <Notice title="Budget pending verification">
            No approval is recorded. Figures are planning estimates seeded from the historical budget. Record each line&apos;s approved amount, then mark the budget approved with the approval reference.
          </Notice>
        )}
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Proposed (all lines)" value={formatINR(t.proposed)} />
        <Stat label="Covered in kind" value={formatINR(t.inKindCovered)} />
        <Stat label="Approved" value={formatINR(t.approved)} hint={`${t.approvedLineCount} of ${t.lineCount} lines`} />
        <Stat label="Actual to date" value={formatINR(t.actual)} />
      </div>

      {overview.allocationIssues.length > 0 && (
        <div className="mb-6">
          <Notice tone="red" title="Funding allocation problems">
            <ul className="ml-5 list-disc">{overview.allocationIssues.map((m, i) => <li key={i}>{m}</li>)}</ul>
          </Notice>
        </div>
      )}

      <Panel title="Budget lines" className="mb-6">
        <DataTable
          columns={['Category', 'Description', 'Qty × unit', 'Estimate', 'Quote', 'Approved', 'Actual', 'Stage', 'Funding', 'Owner', '']}
          rows={lines.map((l) => [
            BUDGET_CATEGORY_LABELS[l.category],
            l.description,
            l.quantity != null && l.unitCost != null ? `${l.quantity} × ${formatINR(l.unitCost)}` : '—',
            formatINR(lineEstimate(l)),
            l.quotationAmount != null ? formatINR(l.quotationAmount) : '—',
            l.approvedAmount != null ? <span key="a" title={l.approvalRecord}>{formatINR(l.approvedAmount)}</span> : '—',
            l.actualAmount != null ? formatINR(l.actualAmount) : '—',
            <Badge key="s" tone={l.stage === 'PAID' ? 'green' : l.stage === 'ESTIMATE' ? 'neutral' : 'blue'}>{STAGE_LABELS[l.stage]}</Badge>,
            `${FUNDING_SOURCE_LABELS[l.fundingSource]}${l.fundingSponsor ? ` (${l.fundingSponsor.companyName})` : ''}`,
            l.responsible?.name ?? '—',
            edit || approve ? (
              <div key="e" className="flex min-w-[16rem] flex-col gap-2">
                {edit && (
                  <Disclosure summary="Edit">
                    <ActionForm action={saveBudgetLineAction} schema="budgetLine" hidden={{ id: l.id }} fields={lineFields(l, members, sponsors)} />
                    {l.approvedAmount == null && (
                      <div className="mt-3">
                        <ActionForm action={deleteBudgetLineAction} hidden={{ id: l.id }} submitLabel="Delete line" variant="danger" confirmText="Delete this budget line?" />
                      </div>
                    )}
                  </Disclosure>
                )}
                {approve && (
                  <Disclosure summary="Record approval">
                    <ActionForm
                      action={approveBudgetLineAction}
                      schema="budgetLineApproval"
                      hidden={{ id: l.id }}
                      columns={1}
                      fields={[
                        { name: 'approvedAmount', label: 'Approved amount (₹)', type: 'rupees', required: true, defaultValue: l.approvedAmount ?? '' },
                        { name: 'approvalRecord', label: 'Approval record', required: true, defaultValue: l.approvalRecord, help: 'Who approved it and where (letter, minutes, email).' },
                      ]}
                    />
                  </Disclosure>
                )}
              </div>
            ) : null,
          ])}
        />
        {edit && (
          <div className="mt-4">
            <Disclosure summary="Add a budget line">
              <ActionForm action={saveBudgetLineAction} schema="budgetLine" fields={lineFields({}, members, sponsors)} />
            </Disclosure>
          </div>
        )}
      </Panel>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <Panel title="Income other than sponsors" description="Entry fees and institute allocations. Estimates never count as secured money.">
          <DataTable
            columns={['Source', 'Description', 'Amount', 'Status', 'Reference']}
            rows={income.map((i) => [incomeSourceOptions.find((o) => o.value === i.source)?.label, i.description, formatINR(i.amount), i.status.toLowerCase(), i.reference ?? '—'])}
          />
          {edit && (
            <div className="mt-4 flex flex-col gap-3">
              {income.map((i) => (
                <Disclosure key={i.id} summary={`Edit: ${i.description}`}>
                  <ActionForm
                    action={saveIncomeLineAction}
                    schema="incomeLine"
                    hidden={{ id: i.id }}
                    fields={[
                      { name: 'source', label: 'Source', type: 'select', options: incomeSourceOptions, allowEmpty: false, defaultValue: i.source },
                      { name: 'description', label: 'Description', required: true, defaultValue: i.description },
                      { name: 'quantity', label: 'Quantity', type: 'number', defaultValue: i.quantity ?? '' },
                      { name: 'rate', label: 'Rate (₹)', type: 'rupees', defaultValue: i.rate ?? '' },
                      { name: 'amount', label: 'Amount (₹)', type: 'rupees', defaultValue: i.amount },
                      { name: 'status', label: 'Status', type: 'select', options: incomeStatusOptions, allowEmpty: false, defaultValue: i.status },
                      { name: 'reference', label: 'Reference', defaultValue: i.reference },
                    ]}
                  />
                </Disclosure>
              ))}
              <Disclosure summary="Add income line">
                <ActionForm
                  action={saveIncomeLineAction}
                  schema="incomeLine"
                  fields={[
                    { name: 'source', label: 'Source', type: 'select', options: incomeSourceOptions, allowEmpty: false },
                    { name: 'description', label: 'Description', required: true },
                    { name: 'quantity', label: 'Quantity', type: 'number' },
                    { name: 'rate', label: 'Rate (₹)', type: 'rupees' },
                    { name: 'amount', label: 'Amount (₹)', type: 'rupees' },
                    { name: 'status', label: 'Status', type: 'select', options: incomeStatusOptions, allowEmpty: false },
                    { name: 'reference', label: 'Reference' },
                  ]}
                />
              </Disclosure>
            </div>
          )}
        </Panel>

        {approve && (
          <Panel title="Budget approval" description="Mark approved only with the institute's approval reference. Every line needs an approved amount first.">
            <ActionForm
              action={setBudgetApprovalAction}
              schema="budgetApproval"
              fields={[
                { name: 'status', label: 'Status', type: 'select', allowEmpty: false, defaultValue: approval.status, options: [{ value: 'PENDING_VERIFICATION', label: 'Pending verification' }, { value: 'APPROVED', label: 'Approved' }] },
                { name: 'approvedBy', label: 'Approved by (name, designation)', defaultValue: approval.approvedBy },
                { name: 'approvalReference', label: 'Approval reference', defaultValue: approval.approvalReference },
                { name: 'approvedOn', label: 'Approval date', type: 'date', defaultValue: approval.approvedOn },
              ]}
            />
          </Panel>
        )}
      </div>

      <Panel
        title="Historical budget reference (read-only)"
        description={`${meta.source ?? 'Source document'}. ${meta.note ?? ''}`}
      >
        <div className="mb-4">
          {h.consistent ? (
            <Notice tone="blue" title="Arithmetic verified">
              Every line, section and total in the source document recomputes correctly: expenses {formatINR(h.expenseTotal)}, expected income {formatINR(h.incomeTotal)}, net requirement {formatINR(h.net)}.
            </Notice>
          ) : (
            <Notice tone="red" title="Reconciliation differences">
              <ul className="ml-5 list-disc">{h.issues.map((i, k) => <li key={k}>{i.message}</li>)}</ul>
            </Notice>
          )}
          {meta.documentTitle && <p className="mt-2 text-xs text-gray-500">Title in source document: {meta.documentTitle}. Not used in any INCURSION document.</p>}
          {meta.statedInWords && <p className="mt-1 text-xs text-gray-500">Amount in words: {meta.statedInWords}.</p>}
        </div>
        <DataTable
          columns={['Section', 'Particulars', 'Qty', 'Rate', 'Amount']}
          rows={historical.map((i) => [i.section, i.particulars, i.quantity ?? '—', i.rate != null ? formatINR(i.rate) : '—', formatINR(i.amount)])}
        />
      </Panel>
    </>
  );
}
