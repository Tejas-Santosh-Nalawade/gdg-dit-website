import Link from 'next/link';
import { cn } from '@/lib/utils';

export function PageHeader({ title, description, actions }) {
  return (
    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{title}</h1>
        {description && <p className="mt-1 max-w-3xl text-sm text-gray-600">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({ title, description, children, className, id }) {
  return (
    <section id={id} className={cn('rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:p-6', className)}>
      {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
      {description && <p className="mt-1 text-sm text-gray-600">{description}</p>}
      <div className={cn(title || description ? 'mt-4' : '')}>{children}</div>
    </section>
  );
}

const TONES = {
  neutral: 'bg-gray-100 text-gray-700',
  blue: 'bg-[#e8f0fe] text-[#1967d2]',
  green: 'bg-[#e6f4ea] text-[#137333]',
  yellow: 'bg-[#fef7e0] text-[#b06000]',
  red: 'bg-[#fce8e6] text-[#c5221f]',
};

export function Badge({ tone = 'neutral', children }) {
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', TONES[tone])}>{children}</span>;
}

export function Stat({ label, value, hint, tone }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className={cn('mt-1 text-xl font-semibold text-gray-900', tone === 'warn' && 'text-[#b06000]', tone === 'good' && 'text-[#137333]')}>{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export function Notice({ tone = 'yellow', title, children }) {
  return (
    <div className={cn('rounded-lg border px-4 py-3 text-sm', tone === 'yellow' && 'border-[#f9ab00]/40 bg-[#fef7e0] text-[#7a4a00]', tone === 'red' && 'border-[#ea4335]/40 bg-[#fce8e6] text-[#a50e0e]', tone === 'blue' && 'border-[#4285f4]/40 bg-[#e8f0fe] text-[#174ea6]')}>
      {title && <p className="font-semibold">{title}</p>}
      <div className={title ? 'mt-1' : ''}>{children}</div>
    </div>
  );
}

export function DataTable({ columns, rows, empty = 'Nothing recorded yet.' }) {
  if (!rows.length) return <p className="text-sm text-gray-500">{empty}</p>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-xs uppercase tracking-wide text-gray-500">
            {columns.map((c) => (
              <th key={c} className="whitespace-nowrap px-3 py-2 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-gray-100 align-top last:border-0">
              {r.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-gray-800">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Disclosure({ summary, children }) {
  return (
    <details className="group rounded-lg border border-gray-200 bg-gray-50 p-3">
      <summary className="cursor-pointer select-none text-sm font-medium text-[#1967d2]">{summary}</summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

export function TextLink({ href, children }) {
  return (
    <Link href={href} className="font-medium text-[#1967d2] hover:underline">
      {children}
    </Link>
  );
}

export const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' }) : '—';
