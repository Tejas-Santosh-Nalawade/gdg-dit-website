import Link from 'next/link';
import { getActor } from '@/lib/organiser/session';
import { ROLE_LABELS, can } from '@/lib/organiser/permissions';
import { signOutAction } from './actions';

export const metadata = {
  title: 'Organiser area | INCURSION 2027',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const NAV = [
  { href: '/organiser', label: 'Overview', cap: 'dashboard:view' },
  { href: '/organiser/sponsors', label: 'Sponsors', cap: 'sponsor:view' },
  { href: '/organiser/outreach', label: 'Outreach', cap: 'outreach:draft' },
  { href: '/organiser/packages', label: 'Packages', cap: 'budget:view' },
  { href: '/organiser/budget', label: 'Budget', cap: 'budget:view' },
  { href: '/organiser/institutions', label: 'TPO & Foundation', cap: 'institution:view' },
  { href: '/organiser/committee', label: 'Committee', cap: 'roster:view' },
  { href: '/organiser/documents', label: 'Documents', cap: 'documents:generate' },
  { href: '/organiser/audit', label: 'Audit log', cap: 'audit:view' },
];

export default async function OrganiserLayout({ children }) {
  const actor = await getActor();
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {actor && (
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-8">
            <nav aria-label="Organiser" className="flex flex-wrap gap-1">
              {NAV.filter((n) => can(actor.role, n.cap)).map((n) => (
                <Link key={n.href} href={n.href} className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-[#e8f0fe] hover:text-[#1967d2]">
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span>
                {actor.name} · {ROLE_LABELS[actor.role]}
              </span>
              <form action={signOutAction}>
                <button className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50">Sign out</button>
              </form>
            </div>
          </div>
        </div>
      )}
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">{children}</main>
    </div>
  );
}
