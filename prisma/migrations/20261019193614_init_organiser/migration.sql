-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'FINANCE', 'SPONSORSHIP', 'VIEWER');

-- CreateEnum
CREATE TYPE "Domain" AS ENUM ('EVENT_DIRECTOR_FINANCE', 'OPERATIONS_PARTICIPANT_HOSPITALITY', 'MARKETING_SPONSORSHIP', 'COMMUNITY', 'DESIGN', 'TECH', 'MEDIA');

-- CreateEnum
CREATE TYPE "SponsorStatus" AS ENUM ('PROSPECT', 'RESEARCH', 'OUTREACH_READY', 'CONTACTED', 'RESPONSE_RECEIVED', 'MEETING_SCHEDULED', 'PROPOSAL_SUBMITTED', 'NEGOTIATION', 'WRITTEN_CONFIRMATION', 'AGREEMENT_PENDING', 'CONFIRMED', 'PAYMENT_PENDING', 'PAID', 'IN_KIND_CONFIRMED', 'POSTPONED', 'DECLINED');

-- CreateEnum
CREATE TYPE "SponsorCategory" AS ENUM ('TECHNOLOGY', 'SOFTWARE_PRODUCT', 'CLOUD_AI', 'CYBERSECURITY', 'ENGINEERING_AUTOMOTIVE', 'FOOD_HOSPITALITY', 'TRAINING_CONSULTANCY', 'LOCAL_BUSINESS', 'OTHER');

-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('EMAIL', 'CALL', 'MEETING', 'PROPOSAL', 'NOTE');

-- CreateEnum
CREATE TYPE "DraftStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'SENT_MANUALLY');

-- CreateEnum
CREATE TYPE "BudgetCategory" AS ENUM ('FOOD', 'PRIZES', 'BRANDING', 'GUESTS_JUDGES', 'LOGISTICS', 'INAUGURATION', 'VALEDICTORY', 'NIGHT_TIME', 'TECH_INFRASTRUCTURE', 'PARTICIPANT_MATERIALS', 'SAFETY', 'HOSPITALITY', 'CONTINGENCY', 'OTHER');

-- CreateEnum
CREATE TYPE "BudgetStage" AS ENUM ('ESTIMATE', 'QUOTED', 'APPROVED', 'COMMITTED', 'INVOICED', 'PAID');

-- CreateEnum
CREATE TYPE "QuotationStatus" AS ENUM ('NOT_REQUESTED', 'REQUESTED', 'RECEIVED');

-- CreateEnum
CREATE TYPE "FundingSource" AS ENUM ('UNASSIGNED', 'INSTITUTE', 'SPONSOR_CASH', 'IN_KIND', 'ENTRY_FEES', 'FOUNDATION');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PARTIAL', 'PAID');

-- CreateEnum
CREATE TYPE "IncomeSource" AS ENUM ('ENTRY_FEES', 'INSTITUTE', 'OTHER');

-- CreateEnum
CREATE TYPE "IncomeStatus" AS ENUM ('ESTIMATE', 'CONFIRMED', 'RECEIVED');

-- CreateEnum
CREATE TYPE "InstitutionType" AS ENUM ('TPO', 'FOUNDATION');

-- CreateEnum
CREATE TYPE "RequestStage" AS ENUM ('NOT_REQUESTED', 'DRAFTING', 'INTERNAL_REVIEW', 'SUBMITTED', 'UNDER_DISCUSSION', 'APPROVED', 'PARTIALLY_APPROVED', 'DECLINED', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "FundingMode" AS ENUM ('PRIZE_MONEY', 'PROTOTYPE_GRANT', 'MILESTONE_FUNDING', 'GENERAL_SUPPORT');

-- CreateEnum
CREATE TYPE "MilestoneProgress" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'DONE');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('OPEN', 'DONE');

-- CreateTable
CREATE TABLE "Organizer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'VIEWER',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "committeeMemberId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organizer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommitteeMember" (
    "id" TEXT NOT NULL,
    "serialNo" INTEGER,
    "name" TEXT,
    "domain" "Domain" NOT NULL,
    "position" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommitteeMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "updatedBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Milestone" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "source" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "progress" "MilestoneProgress",
    "progressNote" TEXT,
    "progressRecordedAt" TIMESTAMP(3),
    "progressRecordedBy" TEXT,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SponsorshipPackage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER,
    "benefits" TEXT[],
    "slots" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SponsorshipPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "category" "SponsorCategory" NOT NULL,
    "industry" TEXT,
    "website" TEXT,
    "status" "SponsorStatus" NOT NULL DEFAULT 'PROSPECT',
    "packageId" TEXT,
    "requestedAmount" INTEGER,
    "cashCommitted" INTEGER NOT NULL DEFAULT 0,
    "inKindDescription" TEXT,
    "inKindValue" INTEGER NOT NULL DEFAULT 0,
    "confirmationReference" TEXT,
    "confirmationDate" TIMESTAMP(3),
    "agreementApprovalRef" TEXT,
    "agreementApprovedAt" TIMESTAMP(3),
    "assignedToId" TEXT,
    "lastContactAt" TIMESTAMP(3),
    "nextFollowUpAt" TIMESTAMP(3),
    "researchSource" TEXT,
    "researchDate" TIMESTAMP(3),
    "notes" TEXT,
    "introducedViaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SponsorContact" (
    "id" TEXT NOT NULL,
    "sponsorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "source" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SponsorContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interaction" (
    "id" TEXT NOT NULL,
    "sponsorId" TEXT,
    "requestId" TEXT,
    "type" "InteractionType" NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,
    "outcome" TEXT,
    "attendees" TEXT,
    "recordedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "sponsorId" TEXT,
    "requestId" TEXT,
    "amount" INTEGER NOT NULL,
    "receivedOn" TIMESTAMP(3) NOT NULL,
    "reference" TEXT NOT NULL,
    "note" TEXT,
    "recordedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelatedDocument" (
    "id" TEXT NOT NULL,
    "sponsorId" TEXT,
    "requestId" TEXT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RelatedDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutreachDraft" (
    "id" TEXT NOT NULL,
    "templateKey" TEXT NOT NULL,
    "sponsorId" TEXT,
    "requestId" TEXT,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "status" "DraftStatus" NOT NULL DEFAULT 'DRAFT',
    "createdBy" TEXT NOT NULL,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewNote" TEXT,
    "sentRecordedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutreachDraft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "assigneeId" TEXT NOT NULL,
    "sponsorId" TEXT,
    "dueDate" TIMESTAMP(3),
    "status" "TaskStatus" NOT NULL DEFAULT 'OPEN',
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoricalBudgetItem" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "category" "BudgetCategory",
    "section" TEXT NOT NULL,
    "particulars" TEXT NOT NULL,
    "quantity" INTEGER,
    "rate" INTEGER,
    "amount" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "HistoricalBudgetItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetLine" (
    "id" TEXT NOT NULL,
    "category" "BudgetCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER,
    "unitCost" INTEGER,
    "estimatedTotal" INTEGER NOT NULL,
    "quotationStatus" "QuotationStatus" NOT NULL DEFAULT 'NOT_REQUESTED',
    "quotationAmount" INTEGER,
    "approvedAmount" INTEGER,
    "actualAmount" INTEGER,
    "stage" "BudgetStage" NOT NULL DEFAULT 'ESTIMATE',
    "fundingSource" "FundingSource" NOT NULL DEFAULT 'UNASSIGNED',
    "fundingSponsorId" TEXT,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "responsibleId" TEXT,
    "supportingDocUrl" TEXT,
    "approvalRecord" TEXT,
    "notes" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BudgetLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncomeLine" (
    "id" TEXT NOT NULL,
    "source" "IncomeSource" NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER,
    "rate" INTEGER,
    "amount" INTEGER NOT NULL,
    "status" "IncomeStatus" NOT NULL DEFAULT 'ESTIMATE',
    "reference" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IncomeLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstitutionalRequest" (
    "id" TEXT NOT NULL,
    "type" "InstitutionType" NOT NULL,
    "title" TEXT NOT NULL,
    "stage" "RequestStage" NOT NULL DEFAULT 'NOT_REQUESTED',
    "contactPerson" TEXT,
    "requestedAmount" INTEGER,
    "approvedAmount" INTEGER,
    "approvalReference" TEXT,
    "approvedOn" TIMESTAMP(3),
    "conditions" TEXT,
    "reportingRequirements" TEXT,
    "recruitmentRequests" TEXT,
    "incubationNotes" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InstitutionalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FundingOption" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "mode" "FundingMode" NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "milestones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FundingOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorEmail" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "before" JSONB,
    "after" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_email_key" ON "Organizer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organizer_committeeMemberId_key" ON "Organizer"("committeeMemberId");

-- CreateIndex
CREATE UNIQUE INDEX "Milestone_key_key" ON "Milestone"("key");

-- CreateIndex
CREATE UNIQUE INDEX "SponsorshipPackage_name_key" ON "SponsorshipPackage"("name");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_committeeMemberId_fkey" FOREIGN KEY ("committeeMemberId") REFERENCES "CommitteeMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "SponsorshipPackage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "CommitteeMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_introducedViaId_fkey" FOREIGN KEY ("introducedViaId") REFERENCES "InstitutionalRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SponsorContact" ADD CONSTRAINT "SponsorContact_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "InstitutionalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "InstitutionalRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedDocument" ADD CONSTRAINT "RelatedDocument_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedDocument" ADD CONSTRAINT "RelatedDocument_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "InstitutionalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutreachDraft" ADD CONSTRAINT "OutreachDraft_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutreachDraft" ADD CONSTRAINT "OutreachDraft_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "InstitutionalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "CommitteeMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "Sponsor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetLine" ADD CONSTRAINT "BudgetLine_fundingSponsorId_fkey" FOREIGN KEY ("fundingSponsorId") REFERENCES "Sponsor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetLine" ADD CONSTRAINT "BudgetLine_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "CommitteeMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundingOption" ADD CONSTRAINT "FundingOption_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "InstitutionalRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
