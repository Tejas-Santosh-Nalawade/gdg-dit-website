// Outreach templates. They fill only verified CRM fields; anything unknown is
// left as a [bracketed placeholder] for the drafter to complete before review.
// Nothing here sends email: drafts are approved internally and sent by a person.
import { EVENT } from '../event';
import { formatINR } from '../money';

const P = (label) => `[${label}]`;

function greeting(ctx) {
  return ctx.contactName ? `Dear ${ctx.contactName},` : `Dear ${P('contact name')},`;
}

function signature(ctx) {
  return [
    'Warm regards,',
    ctx.senderName ?? P('your name'),
    ctx.senderRole ?? P('your role'),
    `${EVENT.organiser}`,
    `${EVENT.host}`,
    `${EVENT.contactEmail}`,
  ].join('\n');
}

function packageLine(ctx) {
  if (ctx.packageName && ctx.packageAmount != null) return `the ${ctx.packageName} package (${formatINR(ctx.packageAmount)})`;
  if (ctx.packageName) return `the ${ctx.packageName} package`;
  return `a sponsorship package suited to ${ctx.companyName ?? P('company')}`;
}

export const TEMPLATES = {
  initial: {
    label: 'Initial sponsorship email',
    audience: 'sponsor',
    subject: (ctx) => `Sponsorship invitation: ${EVENT.name}, a 24-hour national hackathon by ${EVENT.organiserShort}`,
    body: (ctx) => `${greeting(ctx)}

I am writing on behalf of ${EVENT.organiser} at ${EVENT.host}. We are organising ${EVENT.name} ("${EVENT.formalReference}"), a ${EVENT.format} whose Grand Finale takes place on campus on ${EVENT.finale}.

Student teams from colleges across India will build solutions to real-world problems through an online PPT round, a video-prototype round and the on-campus finale, supported by industry mentors.

We would welcome ${ctx.companyName ?? P('company')} as a sponsor and would like to propose ${packageLine(ctx)}. Benefits can include approved logo placement, website recognition, a technical workshop or mentorship session, and a sponsored challenge, agreed with you in writing.

Could we schedule a short call to share the proposal? ${P('suggest two time slots')}

${signature(ctx)}`,
  },
  tpoIntroduction: {
    label: 'TPO introduction request',
    audience: 'institution',
    subject: () => `Request for corporate introductions: ${EVENT.name} sponsorship`,
    body: (ctx) => `Respected ${ctx.contactName ?? P('TPO / CCRP contact')},

${EVENT.organiser} is organising ${EVENT.name} ("${EVENT.formalReference}"), with the Grand Finale on campus on ${EVENT.finale}.

We request your guidance and, where you consider it appropriate, introductions to companies that may be interested in supporting the event as sponsors or mentors. The attached corporate proposal describes the event, the proposed packages and the benefits on offer. All amounts in it are proposals pending approval.

Any recruitment-related engagement a company requests would be routed through you and follow the institute's placement policy and participant consent.

Companies we believe may be a good fit: ${P('list from CRM, with reasons')}

${signature(ctx)}`,
  },
  meetingRequest: {
    label: 'Corporate meeting request',
    audience: 'sponsor',
    subject: (ctx) => `Meeting request: ${EVENT.name} and ${ctx.companyName ?? P('company')}`,
    body: (ctx) => `${greeting(ctx)}

Thank you for your interest in ${EVENT.name}. We would value 30 minutes to walk you through the event plan, audience and sponsorship options, and to understand what would be most useful for ${ctx.companyName ?? P('company')}.

Proposed slots: ${P('slot 1')} / ${P('slot 2')}. We are happy to meet online or at your office.

${signature(ctx)}`,
  },
  proposalFollowUp: {
    label: 'Proposal follow-up',
    audience: 'sponsor',
    subject: (ctx) => `Following up: ${EVENT.name} sponsorship proposal`,
    body: (ctx) => `${greeting(ctx)}

I am following up on the sponsorship proposal for ${EVENT.name} that we shared on ${ctx.lastContactDate ?? P('date sent')}. We would be glad to answer any questions or adjust the package to suit ${ctx.companyName ?? P('company')}.

Would ${P('date')} work for a short call?

${signature(ctx)}`,
  },
  meetingSummary: {
    label: 'Meeting summary',
    audience: 'sponsor',
    subject: (ctx) => `Summary of our meeting: ${EVENT.name}`,
    body: (ctx) => `${greeting(ctx)}

Thank you for meeting with us on ${P('meeting date')}. A summary of what we discussed:

1. ${P('point discussed')}
2. ${P('point discussed')}

Agreed next steps:
- ${P('action, owner, date')}

Nothing in this summary is a commitment by either side until confirmed in writing.

${signature(ctx)}`,
  },
  confirmation: {
    label: 'Sponsor confirmation',
    audience: 'sponsor',
    subject: (ctx) => `Confirmation of sponsorship: ${EVENT.name}`,
    body: (ctx) => `${greeting(ctx)}

Thank you for confirming ${ctx.companyName ?? P('company')}'s support for ${EVENT.name}, as per your written confirmation ${ctx.confirmationReference ?? P('confirmation reference')}.

Agreed contribution: ${ctx.cashCommitted ? formatINR(ctx.cashCommitted) : P('amount')}${ctx.inKindDescription ? `; in-kind: ${ctx.inKindDescription}` : ''}
Agreed deliverables: ${P('list from the deliverables checklist')}

This confirmation is subject to the institute's approval of the sponsorship agreement. Payment details and the invoice will follow from ${P('finance contact')}.

${signature(ctx)}`,
  },
  paymentReminder: {
    label: 'Payment reminder',
    audience: 'sponsor',
    subject: () => `Gentle reminder: sponsorship contribution for ${EVENT.name}`,
    body: (ctx) => `${greeting(ctx)}

This is a gentle reminder about the sponsorship contribution of ${ctx.outstanding != null ? formatINR(ctx.outstanding) : P('amount')} for ${EVENT.name}, as per invoice ${P('invoice number')} dated ${P('invoice date')}.

If the payment has already been made, please share the transaction reference so we can reconcile it.

${signature(ctx)}`,
  },
  postEventReport: {
    label: 'Post-event sponsor report',
    audience: 'sponsor',
    subject: () => `${EVENT.name}: sponsor impact report`,
    body: (ctx) => `${greeting(ctx)}

Thank you for supporting ${EVENT.name}. Please find attached the post-event impact report, covering participation, the delivery of each agreed benefit and photographs approved for sharing.

Highlights: ${P('verified figures only')}

We would be glad to hear your feedback and hope to work together again.

${signature(ctx)}`,
  },
  foundationProposal: {
    label: 'DPU Unitech Foundation proposal cover note',
    audience: 'institution',
    subject: () => `Proposal for innovation and prize-fund support: ${EVENT.name}`,
    body: (ctx) => `Respected ${ctx.contactName ?? P('Foundation contact')},

${EVENT.organiser} submits for your consideration a proposal for innovation and prize-fund support for ${EVENT.name}.

The proposal compares three ways the Foundation could support student innovators: prize money for finalists, prototype grants, and milestone-based funding for teams that continue development. Requested amount: ${ctx.requestedAmount != null ? formatINR(ctx.requestedAmount) : P('amount')}, subject to the Foundation's formal approval and policies.

${signature(ctx)}`,
  },
};

export const TEMPLATE_KEYS = Object.keys(TEMPLATES);

export function buildTemplateContext({ sponsor, request, sender }) {
  const contact = sponsor?.contacts?.[0];
  const received = (sponsor?.payments ?? []).reduce((a, p) => a + p.amount, 0);
  return {
    companyName: sponsor?.companyName,
    contactName: contact?.name ?? request?.contactPerson ?? undefined,
    packageName: sponsor?.package?.name,
    packageAmount: sponsor?.package?.amount ?? undefined,
    lastContactDate: sponsor?.lastContactAt ? new Date(sponsor.lastContactAt).toLocaleDateString('en-IN') : undefined,
    confirmationReference: sponsor?.confirmationReference ?? undefined,
    cashCommitted: sponsor?.cashCommitted || undefined,
    inKindDescription: sponsor?.inKindDescription ?? undefined,
    outstanding: sponsor?.cashCommitted ? sponsor.cashCommitted - received : undefined,
    requestedAmount: request?.requestedAmount ?? undefined,
    senderName: sender?.name,
    senderRole: sender?.roleLabel,
  };
}

export function renderTemplate(key, ctx) {
  const t = TEMPLATES[key];
  if (!t) throw new Error(`Unknown template: ${key}`);
  return { subject: t.subject(ctx), body: t.body(ctx) };
}
