// Builds format-neutral document models from verified records. Renderers turn
// a model into PDF or DOCX. Every builder labels proposed or unapproved figures.
import { EVENT } from '../event';
import { formatINR, sum } from '../money';
import { computeOverview } from '../services/overview';
import { STATUS_LABELS, CATEGORY_LABELS, CONFIRMED_CASH_STATUSES } from '../pipeline';
import { BUDGET_CATEGORY_LABELS, STAGE_LABELS, FUNDING_SOURCE_LABELS, lineEstimate } from '../budget';
import { MILESTONE_STATUS_LABELS } from '../milestones';
import { DOMAIN_LABELS } from '../roster';
import { TEMPLATES, renderTemplate, buildTemplateContext } from '../outreach/templates';

export const PENDING_LABEL = 'DRAFT – CONTAINS PROPOSED AMOUNTS PENDING APPROVAL';
export const BUDGET_PENDING_LABEL = 'BUDGET PENDING VERIFICATION – NOT AN APPROVED BUDGET';

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }) : '—';

const BLANK = '____________________';

function brandingSection() {
  return {
    branding: ['Approved GDG On Campus DIT Pimpri logo', 'Approved institute logo'],
  };
}

function identitySection() {
  return {
    heading: 'About the event',
    fields: [
      { label: 'Event', value: `${EVENT.name}: ${EVENT.theme}` },
      { label: 'Formal reference', value: EVENT.formalReference },
      { label: 'Format', value: EVENT.format },
      { label: 'Organised by', value: EVENT.organiser },
      { label: 'Host institution', value: EVENT.host },
      { label: 'Grand Finale', value: EVENT.finale },
    ],
  };
}

function timelineTable(overview) {
  return {
    heading: 'Event timeline (as per permission letter)',
    table: {
      columns: ['Milestone', 'Dates', 'Status'],
      widths: [3, 3, 2],
      rows: overview.milestones.map((m) => [
        m.name,
        m.startDate.getTime() === m.endDate.getTime() ? fmtDate(m.startDate) : `${fmtDate(m.startDate)} – ${fmtDate(m.endDate)}`,
        MILESTONE_STATUS_LABELS[m.status],
      ]),
    },
  };
}

function approvalFields(roles) {
  return {
    heading: 'Approval record',
    paragraphs: ['To be completed by the approving authority. This document carries no approval until these fields are filled and signed.'],
    fields: roles.flatMap((r) => [
      { label: `${r} – name`, value: BLANK },
      { label: `${r} – signature and date`, value: BLANK },
    ]),
  };
}

function packageRows(packages, money) {
  const rows = packages
    .filter((p) => p.active)
    .map((p) => [p.name, p.amount != null ? money(p.amount) : 'To be set', p.slots != null ? String(p.slots) : '—', p.benefits.join('; ') || '—']);
  return rows.length ? rows : [['No packages configured yet', '—', '—', '—']];
}

function contactFields() {
  return {
    heading: 'Contact',
    fields: [
      { label: 'Sponsorship contact', value: BLANK },
      { label: 'Designation', value: 'Marketing & Sponsorship Team, GDG DIT' },
      { label: 'Email', value: EVENT.contactEmail },
      { label: 'Phone', value: BLANK },
    ],
  };
}

// ---------------------------------------------------------------------------

function corporateProposal(snapshot, overview, { money, sponsorId }) {
  const sponsor = sponsorId ? snapshot.sponsors.find((s) => s.id === sponsorId) : null;
  const hasAmounts = snapshot.packages.some((p) => p.amount != null);
  return {
    title: 'Corporate Sponsorship Proposal',
    subtitle: sponsor ? `Prepared for ${sponsor.companyName}` : 'For prospective corporate sponsors',
    statusLabel: hasAmounts || !overview.budgetApproved ? PENDING_LABEL : null,
    sections: [
      brandingSection(),
      identitySection(),
      {
        heading: 'Why partner with INCURSION',
        bullets: [
          'Reach student developers and innovators from colleges across India through a two-month online selection and a 24-hour on-campus finale.',
          'Engage with participants through technical workshops, mentorship sessions or a sponsored challenge.',
          'Support real-world problem solving alongside industry mentors and the GDG DIT community.',
        ],
      },
      timelineTable(overview),
      {
        heading: 'Sponsorship packages',
        paragraphs: [
          'Package amounts and benefits are proposals. They are finalised with each sponsor in writing and are subject to institutional approval.',
        ],
        table: { columns: ['Package', 'Contribution', 'Slots', 'Benefits'], widths: [2, 2, 1, 5], rows: packageRows(snapshot.packages, money) },
      },
      {
        heading: 'Possible benefits',
        bullets: [
          'Approved logo placement on event material and the event website.',
          'Website and social media recognition.',
          'A technical workshop or mentorship session.',
          'A sponsored technical challenge or prize category.',
          'Industry networking at the Grand Finale.',
          'Optional recruitment engagement, only through the institute’s placement process and with participant consent.',
        ],
        paragraphs: [
          'GDG DIT does not offer guaranteed placements, exclusive access to student data, or any benefit that conflicts with institute policy.',
        ],
      },
      contactFields(),
    ],
  };
}

function tpoRequest(snapshot, overview, { money }) {
  const req = snapshot.requests.find((r) => r.type === 'TPO');
  const introduced = req ? snapshot.sponsors.filter((s) => s.introducedViaId === req.id) : [];
  const prospects = snapshot.sponsors.filter((s) => !['DECLINED', 'POSTPONED'].includes(s.status));
  return {
    title: 'Request for Sponsorship Support',
    subtitle: 'To the Training & Placement Office / Central Corporate Relations and Placements',
    statusLabel: PENDING_LABEL,
    sections: [
      brandingSection(),
      identitySection(),
      {
        heading: 'Request',
        paragraphs: [
          `${EVENT.organiser} requests the office’s guidance and, where appropriate, introductions to companies that may sponsor or mentor at ${EVENT.name}.`,
          'No funding, introduction or benefit is assumed to be approved by this request. Recruitment-related requests from companies will follow the institute’s placement policy.',
        ],
        fields: [
          { label: 'Requested support', value: req?.requestedAmount != null ? `${money(req.requestedAmount)} (proposed)` : 'Introductions and guidance' },
          { label: 'Current stage', value: req ? req.stage.replaceAll('_', ' ').toLowerCase() : 'not requested' },
        ],
      },
      {
        heading: 'Companies proposed for introduction',
        table: {
          columns: ['Company', 'Category', 'Pipeline status', 'Introduced via office'],
          widths: [3, 3, 2, 2],
          rows: prospects.map((s) => [s.companyName, CATEGORY_LABELS[s.category], STATUS_LABELS[s.status], introduced.includes(s) ? 'Yes' : 'No']),
        },
      },
      {
        heading: 'Recruitment-related requests',
        paragraphs: [req?.recruitmentRequests || 'None recorded.'],
      },
      approvalFields(['Training & Placement Officer', 'Hackathon Coordinator']),
    ],
  };
}

function foundationProposal(snapshot, overview, { money }) {
  const req = snapshot.requests.find((r) => r.type === 'FOUNDATION');
  const options = req?.fundingOptions ?? [];
  const modeLabel = { PRIZE_MONEY: 'Prize money', PROTOTYPE_GRANT: 'Prototype grants', MILESTONE_FUNDING: 'Milestone-based funding', GENERAL_SUPPORT: 'General support' };
  return {
    title: 'Innovation & Prize-Fund Proposal',
    subtitle: 'To the Dr. D. Y. Patil Unitech Foundation',
    statusLabel: PENDING_LABEL,
    sections: [
      brandingSection(),
      identitySection(),
      {
        heading: 'Proposal',
        paragraphs: [
          `${EVENT.organiser} requests the Foundation’s consideration of support for student innovators at ${EVENT.name}.`,
          'Any allocation, grant, investment, equity arrangement or incubation commitment remains subject to the Foundation’s formal approval and applicable policies.',
        ],
        fields: [
          { label: 'Requested amount', value: req?.requestedAmount != null ? `${money(req.requestedAmount)} (proposed)` : 'To be determined' },
          { label: 'Approval status', value: req?.approvalReference ? `Approved: ${money(req.approvedAmount)} (ref. ${req.approvalReference})` : 'Not approved' },
        ],
      },
      {
        heading: 'Funding options compared',
        table: {
          columns: ['Option', 'Amount', 'Description', 'Milestones / conditions'],
          widths: [2, 2, 4, 3],
          rows: options.length
            ? options.map((o) => [modeLabel[o.mode], money(o.amount), o.description, o.milestones || '—'])
            : [['Prize money', 'To be set', 'Awards to winning teams at the Grand Finale.', '—'], ['Prototype grants', 'To be set', 'Small grants to finalist teams to continue building.', '—'], ['Milestone-based funding', 'To be set', 'Staged funding released on agreed development milestones.', 'Milestones to be agreed']],
        },
      },
      { heading: 'Conditions', paragraphs: [req?.conditions || 'None recorded.'] },
      { heading: 'Reporting requirements', paragraphs: [req?.reportingRequirements || 'None recorded.'] },
      { heading: 'Optional incubation discussions', paragraphs: [req?.incubationNotes || 'None recorded. Any incubation discussion is exploratory and not a commitment.'] },
      approvalFields(['Foundation authority', 'Principal']),
    ],
  };
}

function budgetTimeline(snapshot, overview, { money }) {
  const t = overview.totals;
  return {
    title: 'Event Budget & Timeline Tracker',
    subtitle: `As of ${fmtDate(overview.generatedAt)}`,
    statusLabel: overview.budgetApproved ? null : BUDGET_PENDING_LABEL,
    sections: [
      {
        heading: 'Budget status',
        fields: overview.budgetApproved
          ? [
              { label: 'Status', value: 'Approved' },
              { label: 'Approved by', value: overview.budgetApproval.approvedBy },
              { label: 'Reference', value: overview.budgetApproval.approvalReference },
              { label: 'Date', value: fmtDate(overview.budgetApproval.approvedOn) },
            ]
          : [{ label: 'Status', value: 'Pending verification. Figures are planning estimates.' }],
      },
      {
        heading: 'Summary',
        table: {
          columns: ['Measure', 'Amount'],
          widths: [4, 2],
          rows: [
            ['Proposed budget (all lines)', money(t.proposed)],
            ['Of which covered in kind', money(t.inKindCovered)],
            ['Proposed cash requirement', money(t.proposedCash)],
            ['Approved (lines with approval record)', `${money(t.approved)} (${t.approvedLineCount} of ${t.lineCount} lines)`],
            ['Confirmed sponsor cash', money(overview.pipeline.confirmedCash)],
            ['Cash received from sponsors', money(overview.pipeline.cashReceived)],
            ['Institutional support approved', money(overview.institutionalApproved)],
            ['Other confirmed income', money(overview.otherConfirmedIncome)],
            ['Estimated income (not confirmed)', money(overview.estimatedIncome)],
            [`Funding gap (against ${overview.funding.basis === 'APPROVED' ? 'approved' : 'proposed'} budget)`, money(overview.funding.gap)],
          ],
        },
      },
      {
        heading: 'Budget lines',
        table: {
          columns: ['Category', 'Description', 'Qty', 'Unit', 'Estimate', 'Approved', 'Actual', 'Stage', 'Funding', 'Owner'],
          widths: [2, 4, 1, 1.4, 1.6, 1.6, 1.6, 1.6, 1.8, 2],
          rows: snapshot.lines.map((l) => [
            BUDGET_CATEGORY_LABELS[l.category],
            l.description,
            l.quantity != null ? String(l.quantity) : '—',
            l.unitCost != null ? money(l.unitCost) : '—',
            money(lineEstimate(l)),
            l.approvedAmount != null ? money(l.approvedAmount) : '—',
            l.actualAmount != null ? money(l.actualAmount) : '—',
            STAGE_LABELS[l.stage],
            FUNDING_SOURCE_LABELS[l.fundingSource] + (l.fundingSponsor ? ` (${l.fundingSponsor.companyName})` : ''),
            l.responsible?.name ?? '—',
          ]),
        },
        landscape: true,
      },
      timelineTable(overview),
    ],
  };
}

function packageSheet(snapshot, overview, { money }) {
  return {
    title: 'Sponsorship Package Sheet',
    subtitle: EVENT.name,
    statusLabel: PENDING_LABEL,
    sections: [
      brandingSection(),
      {
        heading: 'Packages',
        paragraphs: ['All amounts are proposals based on the event budget, which is pending verification. Final terms are agreed in writing with each sponsor.'],
        table: { columns: ['Package', 'Contribution', 'Slots', 'Benefits'], widths: [2, 2, 1, 5], rows: packageRows(snapshot.packages, money) },
      },
      {
        heading: 'Policy notes',
        bullets: [
          'Logos are used only with the sponsor’s written approval of the artwork.',
          'Recruitment engagement is optional and runs through the institute’s placement process with participant consent.',
          'No guaranteed placements and no access to participant personal data are offered.',
        ],
      },
      contactFields(),
    ],
  };
}

function outreachTemplates() {
  return {
    title: 'Corporate Outreach Email Templates',
    subtitle: 'For internal drafting. Every email is reviewed and approved internally before a person sends it.',
    statusLabel: null,
    sections: Object.entries(TEMPLATES).map(([key, t]) => {
      const r = renderTemplate(key, buildTemplateContext({}));
      return { heading: t.label, fields: [{ label: 'Subject', value: r.subject }], paragraphs: r.body.split('\n\n') };
    }),
  };
}

function meetingTracker(snapshot) {
  const meetings = snapshot.interactions
    .filter((i) => i.type === 'MEETING')
    .sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt));
  const name = (id) => snapshot.sponsors.find((s) => s.id === id)?.companyName ?? snapshot.requests.find((r) => r.id === id)?.title ?? '—';
  return {
    title: 'Sponsor Meeting Tracker',
    subtitle: `Meetings recorded in the sponsorship CRM`,
    statusLabel: null,
    sections: [
      {
        heading: 'Meetings',
        table: {
          columns: ['Date', 'With', 'Attendees', 'Summary', 'Outcome / next step'],
          widths: [1.5, 2.5, 2.5, 5, 3],
          rows: meetings.length
            ? meetings.map((m) => [fmtDate(m.occurredAt), name(m.sponsorId ?? m.requestId), m.attendees || '—', m.summary, m.outcome || '—'])
            : [['—', 'No meetings recorded yet', '', '', '']],
        },
        landscape: true,
      },
      {
        heading: 'Upcoming follow-ups',
        table: {
          columns: ['Company', 'Status', 'Next follow-up', 'Assigned to'],
          widths: [3, 2, 2, 3],
          rows: snapshot.sponsors
            .filter((s) => s.nextFollowUpAt)
            .sort((a, b) => new Date(a.nextFollowUpAt) - new Date(b.nextFollowUpAt))
            .map((s) => [s.companyName, STATUS_LABELS[s.status], fmtDate(s.nextFollowUpAt), s.assignedTo?.name ?? '—']),
        },
      },
    ],
  };
}

function confirmationChecklist(snapshot, overview, { money, sponsorId }) {
  const targets = sponsorId
    ? snapshot.sponsors.filter((s) => s.id === sponsorId)
    : snapshot.sponsors.filter((s) => s.confirmationReference);
  const check = (ok) => (ok ? 'Done' : 'Pending');
  return {
    title: 'Sponsorship Confirmation & Deliverables Checklist',
    subtitle: sponsorId && targets[0] ? targets[0].companyName : 'All sponsors with written confirmation',
    statusLabel: targets.some((s) => !s.agreementApprovalRef) ? 'CONTAINS AGREEMENTS PENDING INSTITUTIONAL APPROVAL' : null,
    sections: targets.length
      ? targets.map((s) => ({
          heading: s.companyName,
          fields: [
            { label: 'Pipeline status', value: STATUS_LABELS[s.status] },
            { label: 'Cash committed', value: s.cashCommitted ? money(s.cashCommitted) : '—' },
            { label: 'Cash received', value: money(sum(s.payments, (p) => p.amount)) },
            { label: 'In-kind support', value: s.inKindValue ? `${s.inKindDescription} (${money(s.inKindValue)})` : '—' },
          ],
          table: {
            columns: ['Step', 'Status', 'Evidence'],
            widths: [4, 1.5, 4],
            rows: [
              ['Written confirmation received', check(s.confirmationReference), s.confirmationReference || '—'],
              ['Agreement approved by institute', check(s.agreementApprovalRef), s.agreementApprovalRef || '—'],
              ['Payment received in full', check(s.cashCommitted > 0 && sum(s.payments, (p) => p.amount) >= s.cashCommitted), s.payments.map((p) => p.reference).join(', ') || '—'],
              ['Logo artwork approved by sponsor', 'Pending', BLANK],
              ['Website recognition published', 'Pending', BLANK],
              ['Workshop / mentorship session scheduled', 'Pending', BLANK],
              ['Sponsored challenge brief agreed', 'Pending', BLANK],
              ['Post-event report sent', 'Pending', BLANK],
            ],
          },
        }))
      : [{ heading: 'No sponsors yet', paragraphs: ['No sponsor has a written confirmation on record.'] }],
  };
}

function impactReport(snapshot, overview, { money, sponsorId }) {
  const sponsors = sponsorId
    ? snapshot.sponsors.filter((s) => s.id === sponsorId)
    : snapshot.sponsors.filter((s) => CONFIRMED_CASH_STATUSES.includes(s.status) || s.status === 'IN_KIND_CONFIRMED');
  return {
    title: 'Post-Event Sponsor Impact Report',
    subtitle: sponsorId && sponsors[0] ? `For ${sponsors[0].companyName}` : EVENT.name,
    statusLabel: 'TEMPLATE – FILL WITH VERIFIED FIGURES BEFORE SHARING',
    sections: [
      brandingSection(),
      identitySection(),
      {
        heading: 'Participation (verified figures only)',
        fields: [
          { label: 'Registered teams', value: BLANK },
          { label: 'Colleges represented', value: BLANK },
          { label: 'PPT submissions', value: BLANK },
          { label: 'Video prototypes submitted', value: BLANK },
          { label: 'Finalist teams at the Grand Finale', value: BLANK },
          { label: 'Mentors and judges', value: BLANK },
        ],
      },
      {
        heading: 'Sponsor recognition delivered',
        table: {
          columns: ['Sponsor', 'Package', 'Benefit delivered', 'Evidence'],
          widths: [3, 2, 4, 3],
          rows: sponsors.length ? sponsors.map((s) => [s.companyName, s.package?.name ?? '—', BLANK, BLANK]) : [['—', '—', BLANK, BLANK]],
        },
      },
      { heading: 'Highlights', paragraphs: [BLANK, BLANK] },
      { heading: 'Approved photographs', paragraphs: ['Insert only photographs cleared by the Media team for external sharing.'] },
    ],
  };
}

export const DOCUMENTS = {
  'corporate-proposal': { label: 'Corporate sponsorship proposal', build: corporateProposal, perSponsor: true },
  'tpo-request': { label: 'TPO sponsorship-support request', build: tpoRequest },
  'foundation-proposal': { label: 'DPU Unitech Foundation innovation-fund proposal', build: foundationProposal },
  'budget-timeline': { label: 'Event budget and timeline tracker', build: budgetTimeline, finance: true },
  'package-sheet': { label: 'Sponsor package sheet', build: packageSheet },
  'outreach-templates': { label: 'Corporate outreach email templates', build: outreachTemplates },
  'meeting-tracker': { label: 'Sponsor meeting tracker', build: meetingTracker },
  'confirmation-checklist': { label: 'Sponsorship confirmation and deliverables checklist', build: confirmationChecklist, perSponsor: true },
  'impact-report': { label: 'Post-event sponsor impact report', build: impactReport, perSponsor: true },
};

export function buildDocument(slug, snapshot, { money = (v) => formatINR(v), sponsorId, now = new Date() } = {}) {
  const def = DOCUMENTS[slug];
  if (!def) throw new Error(`Unknown document: ${slug}`);
  const overview = computeOverview(snapshot, now);
  const doc = def.build(snapshot, overview, { money, sponsorId });
  return {
    slug,
    ...doc,
    eventLine: `${EVENT.name} · ${EVENT.organiser}`,
    generatedOn: fmtDate(now),
    sections: doc.sections.map((s) => ({ ...s, heading: s.heading })),
  };
}

export { DOMAIN_LABELS };
