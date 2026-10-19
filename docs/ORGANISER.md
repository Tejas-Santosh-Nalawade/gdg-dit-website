# Organiser area: THE INCURSION 2027 sponsorship and event management

A private area at `/organiser` for GDG DIT organisers. It covers the sponsor CRM, outreach drafts, packages, the INCURSION budget, the TPO and DPU Unitech Foundation workflows, the committee roster and document generation. The public site does not change: none of this data is rendered on public pages, and `/organiser` is excluded from search engines.

## Ground rules built into the code

- GDG DIT is the sole organiser. Generated documents are blocked if a record contains the old UDGAM title, ACES, AWS SBG, Marvel, Disney or Avengers (`lib/organiser/event.js`).
- The permission letter defines the timeline. Milestone status is computed from today's date (India time) and the progress the team records. Nothing is marked complete automatically.
- Money counts as confirmed only with written confirmation **and** a recorded institutional approval of the agreement. Verbal interest never counts (`lib/organiser/pipeline.js`).
- The INCURSION budget shows "Budget pending verification" until every line has an approved amount and an admin records the approval reference.
- Cash and in-kind support are tracked separately. Lines funded in kind are excluded from the cash requirement, and sponsor allocations cannot exceed what each sponsor committed in writing.
- No email is sent. Drafts need approval from a different admin, and a person sends them from the official mailbox and records it.
- Every change to sponsorship status, money, approvals, the roster or access is written to an append-only audit log.

## Roles

| Role | Can do |
|---|---|
| Admin (Event Director) | Everything, including approving agreements, budget lines, the budget and outreach drafts, editing the roster and managing access |
| Finance | Budget lines, income, payments, written confirmations, institutional approvals, audit log |
| Marketing & Sponsorship | CRM, contacts, communication log, tasks, outreach drafts, TPO/Foundation workflow, documents |
| Organiser (read-only) | Overview counts, pipeline, roster. No contacts, no money, no documents |

## Setup

1. Create a PostgreSQL database (Neon, Supabase, Cloud SQL or any Postgres 14+).
2. Create a Google OAuth client (Google Cloud Console, APIs & Services, Credentials). Add `https://<your-domain>/api/auth/callback/google` as an authorised redirect URI.
3. Copy `.env.example` to `.env.local` (or set the same variables in Vercel) and fill in `DATABASE_URL`, `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` and `ORGANISER_BOOTSTRAP_ADMINS`.
4. Apply the schema: `npm run db:migrate`.
5. Seed: put the internal seed file at `prisma/seed-data/incursion.local.json` (git-ignored; it holds the roster and budget figures) or point `SEED_FILE` at it, then run `npm run db:seed`. Seeding only fills empty tables, so it is safe to re-run.
6. Sign in at `/organiser/sign-in` with a bootstrap admin account, then add other organisers under Committee, Organiser access.

For local work without Google, set `ORGANISER_DEV_LOGIN=true`. That shortcut is ignored in production builds.

## Tests

```bash
npm test                                            # unit tests
TEST_DATABASE_URL=postgresql://... npm test         # plus integration tests on a real database
```

The integration tests migrate a new, uniquely named schema in the database you point them at and drop only that schema at the end.

## Code map

- `prisma/schema.prisma`: data model (amounts are whole rupees)
- `lib/organiser/`: rules (`pipeline.js`, `budget.js`, `milestones.js`, `roster.js`), permissions, validation schemas shared by forms and server, audit log
- `lib/organiser/services/`: every read and write, each checking the role and validating input
- `lib/organiser/documents/`: document builders and PDF/DOCX renderers
- `app/organiser/`: pages and server actions; `app/api/organiser/documents/[slug]`: document downloads
