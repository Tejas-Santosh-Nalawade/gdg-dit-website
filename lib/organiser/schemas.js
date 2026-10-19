// Validation schemas shared by the browser forms and the server actions.
// The server always re-validates; client checks only give faster feedback.
import { z } from 'zod';

const emptyToUndefined = (v) => (v === '' || v === null ? undefined : v);

const text = (max = 500) => z.preprocess(emptyToUndefined, z.string().trim().max(max).optional());
const requiredText = (max = 200) => z.string().trim().min(1, 'Required').max(max);
const rupees = z.preprocess(
  (v) => (v === '' || v === null || v === undefined ? undefined : Number(String(v).replace(/[,₹\s]/g, ''))),
  z.number({ message: 'Enter an amount in rupees' }).int('Whole rupees only').min(0, 'Cannot be negative').max(100_000_000).optional(),
);
const count = z.preprocess(
  (v) => (v === '' || v === null || v === undefined ? undefined : Number(v)),
  z.number().int().min(0).max(100_000).optional(),
);
const date = z.preprocess(
  (v) => (v === '' || v === null || v === undefined ? undefined : v),
  z.coerce.date({ message: 'Enter a valid date' }).optional(),
);
const url = z.preprocess(
  emptyToUndefined,
  z
    .string()
    .trim()
    .max(500)
    .refine((v) => /^https?:\/\//i.test(v), 'Must start with http:// or https://')
    .optional(),
);
const id = z.preprocess(emptyToUndefined, z.string().max(40).optional());

export const SponsorStatusEnum = z.enum([
  'PROSPECT', 'RESEARCH', 'OUTREACH_READY', 'CONTACTED', 'RESPONSE_RECEIVED', 'MEETING_SCHEDULED',
  'PROPOSAL_SUBMITTED', 'NEGOTIATION', 'WRITTEN_CONFIRMATION', 'AGREEMENT_PENDING', 'CONFIRMED',
  'PAYMENT_PENDING', 'PAID', 'IN_KIND_CONFIRMED', 'POSTPONED', 'DECLINED',
]);
export const SponsorCategoryEnum = z.enum([
  'TECHNOLOGY', 'SOFTWARE_PRODUCT', 'CLOUD_AI', 'CYBERSECURITY', 'ENGINEERING_AUTOMOTIVE',
  'FOOD_HOSPITALITY', 'TRAINING_CONSULTANCY', 'LOCAL_BUSINESS', 'OTHER',
]);
export const RoleEnum = z.enum(['ADMIN', 'FINANCE', 'SPONSORSHIP', 'VIEWER']);
export const DomainEnum = z.enum([
  'EVENT_DIRECTOR_FINANCE', 'OPERATIONS_PARTICIPANT_HOSPITALITY', 'MARKETING_SPONSORSHIP',
  'COMMUNITY', 'DESIGN', 'TECH', 'MEDIA',
]);
export const BudgetCategoryEnum = z.enum([
  'FOOD', 'PRIZES', 'BRANDING', 'GUESTS_JUDGES', 'LOGISTICS', 'INAUGURATION', 'VALEDICTORY',
  'NIGHT_TIME', 'TECH_INFRASTRUCTURE', 'PARTICIPANT_MATERIALS', 'SAFETY', 'HOSPITALITY', 'CONTINGENCY', 'OTHER',
]);

export const sponsorCreateSchema = z.object({
  companyName: requiredText(120),
  category: SponsorCategoryEnum,
  industry: text(120),
  website: url,
  requestedAmount: rupees,
  packageId: id,
  assignedToId: id,
  researchSource: requiredText(300),
  researchDate: date,
  notes: text(2000),
});

export const sponsorUpdateSchema = z.object({
  companyName: requiredText(120),
  category: SponsorCategoryEnum,
  industry: text(120),
  website: url,
  status: SponsorStatusEnum,
  packageId: id,
  requestedAmount: rupees,
  assignedToId: id,
  lastContactAt: date,
  nextFollowUpAt: date,
  researchSource: text(300),
  researchDate: date,
  notes: text(2000),
});

export const sponsorConfirmationSchema = z.object({
  cashCommitted: rupees,
  inKindDescription: text(500),
  inKindValue: rupees,
  confirmationReference: text(300),
  confirmationDate: date,
});

export const agreementApprovalSchema = z.object({
  agreementApprovalRef: requiredText(300),
});

export const contactSchema = z.object({
  name: requiredText(120),
  designation: text(120),
  email: z.preprocess(emptyToUndefined, z.string().trim().email('Enter a valid email').max(200).optional()),
  phone: z.preprocess(
    emptyToUndefined,
    z.string().trim().regex(/^[+0-9 ()-]{7,20}$/, 'Enter a valid phone number').optional(),
  ),
  source: requiredText(300),
});

export const interactionSchema = z.object({
  type: z.enum(['EMAIL', 'CALL', 'MEETING', 'PROPOSAL', 'NOTE']),
  occurredAt: z.coerce.date({ message: 'Enter a valid date' }),
  summary: requiredText(4000),
  outcome: text(1000),
  attendees: text(500),
});

export const paymentSchema = z.object({
  amount: z.preprocess(
    (v) => Number(String(v ?? '').replace(/[,₹\s]/g, '')),
    z.number({ message: 'Enter an amount' }).int().positive('Must be more than zero').max(100_000_000),
  ),
  receivedOn: z.coerce.date({ message: 'Enter a valid date' }),
  reference: requiredText(200),
  note: text(500),
});

export const relatedDocumentSchema = z.object({
  title: requiredText(200),
  url: z
    .string()
    .trim()
    .max(500)
    .refine((v) => /^https?:\/\//i.test(v), 'Must start with http:// or https://'),
});

export const packageSchema = z.object({
  name: requiredText(80),
  amount: rupees,
  benefits: z.preprocess(
    (v) =>
      Array.isArray(v)
        ? v
        : String(v ?? '')
            .split('\n')
            .map((b) => b.trim())
            .filter(Boolean),
    z.array(z.string().max(300)).max(20),
  ),
  slots: count,
  active: z.preprocess((v) => v === true || v === 'on' || v === 'true', z.boolean()),
  notes: text(1000),
});

export const budgetLineSchema = z.object({
  category: BudgetCategoryEnum,
  description: requiredText(300),
  quantity: count,
  unitCost: rupees,
  estimatedTotal: rupees,
  quotationStatus: z.enum(['NOT_REQUESTED', 'REQUESTED', 'RECEIVED']),
  quotationAmount: rupees,
  actualAmount: rupees,
  stage: z.enum(['ESTIMATE', 'QUOTED', 'APPROVED', 'COMMITTED', 'INVOICED', 'PAID']),
  fundingSource: z.enum(['UNASSIGNED', 'INSTITUTE', 'SPONSOR_CASH', 'IN_KIND', 'ENTRY_FEES', 'FOUNDATION']),
  fundingSponsorId: id,
  paymentStatus: z.enum(['UNPAID', 'PARTIAL', 'PAID']),
  responsibleId: id,
  supportingDocUrl: url,
  notes: text(1000),
});

export const budgetLineApprovalSchema = z.object({
  approvedAmount: rupees.refine((v) => v !== undefined, 'Enter the approved amount'),
  approvalRecord: requiredText(300),
});

export const budgetApprovalSchema = z.object({
  status: z.enum(['PENDING_VERIFICATION', 'APPROVED']),
  approvedBy: text(200),
  approvalReference: text(300),
  approvedOn: date,
});

export const incomeLineSchema = z.object({
  source: z.enum(['ENTRY_FEES', 'INSTITUTE', 'OTHER']),
  description: requiredText(300),
  quantity: count,
  rate: rupees,
  amount: rupees,
  status: z.enum(['ESTIMATE', 'CONFIRMED', 'RECEIVED']),
  reference: text(300),
});

export const institutionalRequestSchema = z.object({
  title: requiredText(200),
  stage: z.enum([
    'NOT_REQUESTED', 'DRAFTING', 'INTERNAL_REVIEW', 'SUBMITTED', 'UNDER_DISCUSSION',
    'APPROVED', 'PARTIALLY_APPROVED', 'DECLINED', 'ON_HOLD',
  ]),
  contactPerson: text(200),
  requestedAmount: rupees,
  conditions: text(2000),
  reportingRequirements: text(2000),
  recruitmentRequests: text(2000),
  incubationNotes: text(2000),
  notes: text(2000),
});

export const institutionalApprovalSchema = z.object({
  approvedAmount: rupees.refine((v) => v !== undefined, 'Enter the approved amount (0 if none)'),
  approvalReference: requiredText(300),
  approvedOn: z.coerce.date({ message: 'Enter a valid date' }),
});

export const fundingOptionSchema = z.object({
  mode: z.enum(['PRIZE_MONEY', 'PROTOTYPE_GRANT', 'MILESTONE_FUNDING', 'GENERAL_SUPPORT']),
  amount: z.preprocess((v) => Number(String(v ?? '').replace(/[,₹\s]/g, '')), z.number().int().min(0).max(100_000_000)),
  description: requiredText(500),
  milestones: text(1000),
});

export const draftCreateSchema = z.object({
  templateKey: requiredText(60),
  sponsorId: id,
  requestId: id,
});

export const draftEditSchema = z.object({
  subject: requiredText(300),
  body: requiredText(10000),
});

export const draftReviewSchema = z.object({
  decision: z.enum(['APPROVED', 'REJECTED']),
  reviewNote: text(1000),
});

export const taskSchema = z.object({
  title: requiredText(300),
  assigneeId: requiredText(40),
  sponsorId: id,
  dueDate: date,
});

export const committeeMemberSchema = z.object({
  serialNo: count,
  name: text(120),
  domain: DomainEnum,
  position: requiredText(80),
  verified: z.preprocess((v) => v === true || v === 'on' || v === 'true', z.boolean()),
  notes: text(500),
});

export const organiserSchema = z.object({
  email: z.string().trim().toLowerCase().email('Enter a valid email').max(200),
  name: requiredText(120),
  role: RoleEnum,
  active: z.preprocess((v) => v === true || v === 'on' || v === 'true', z.boolean()),
  committeeMemberId: id,
});

export const milestoneProgressSchema = z.object({
  progress: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'DONE']),
  progressNote: text(500),
});

export const sponsorTargetSchema = z.object({
  sponsorTarget: rupees,
});

/** Turns FormData or a plain object into a validated value or field errors. */
export function parseForm(schema, input) {
  const raw = typeof FormData !== 'undefined' && input instanceof FormData ? formDataToObject(input) : input;
  const result = schema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };
  const fieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join('.') || '_form';
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return { ok: false, fieldErrors };
}

export function formDataToObject(fd) {
  const obj = {};
  for (const [k, v] of fd.entries()) {
    if (k.startsWith('$ACTION')) continue;
    obj[k] = v;
  }
  return obj;
}
