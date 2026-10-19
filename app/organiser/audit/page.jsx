import { requireCapability } from '@/lib/organiser/session';
import { prisma } from '@/lib/organiser/db';
import { PageHeader, Panel, DataTable } from '@/components/organiser/ui';

const PAGE = 100;

export default async function AuditPage({ searchParams }) {
  const actor = await requireCapability('audit:view');
  const params = await searchParams;
  const where = params?.type ? { entityType: params.type } : {};
  const entries = await prisma.auditLog.findMany({ where, orderBy: { createdAt: 'desc' }, take: PAGE });
  return (
    <>
      <PageHeader title="Audit log" description={`The latest ${PAGE} changes to sponsorship status, finances, approvals and access. Entries cannot be edited or deleted from this area.`} />
      <Panel>
        <DataTable
          columns={['When (IST)', 'Who', 'Action', 'Record', 'Before', 'After']}
          rows={entries.map((e) => [
            new Date(e.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            e.actorEmail,
            e.action,
            `${e.entityType}${e.entityId ? ` · ${e.entityId.slice(-6)}` : ''}`,
            <code key="b" className="block max-w-xs whitespace-pre-wrap break-words text-xs">{e.before ? JSON.stringify(e.before) : '—'}</code>,
            <code key="a" className="block max-w-xs whitespace-pre-wrap break-words text-xs">{e.after ? JSON.stringify(e.after) : '—'}</code>,
          ])}
          empty="No changes recorded yet."
        />
      </Panel>
    </>
  );
}
