'use client';

import { useActionState, useState } from 'react';
import * as schemas from '@/lib/organiser/schemas';
import { cn } from '@/lib/utils';

const SCHEMAS = {
  sponsorCreate: schemas.sponsorCreateSchema,
  sponsorUpdate: schemas.sponsorUpdateSchema,
  sponsorConfirmation: schemas.sponsorConfirmationSchema,
  agreementApproval: schemas.agreementApprovalSchema,
  contact: schemas.contactSchema,
  interaction: schemas.interactionSchema,
  payment: schemas.paymentSchema,
  relatedDocument: schemas.relatedDocumentSchema,
  package: schemas.packageSchema,
  budgetLine: schemas.budgetLineSchema,
  budgetLineApproval: schemas.budgetLineApprovalSchema,
  budgetApproval: schemas.budgetApprovalSchema,
  incomeLine: schemas.incomeLineSchema,
  institutionalRequest: schemas.institutionalRequestSchema,
  institutionalApproval: schemas.institutionalApprovalSchema,
  fundingOption: schemas.fundingOptionSchema,
  draftCreate: schemas.draftCreateSchema,
  draftEdit: schemas.draftEditSchema,
  draftReview: schemas.draftReviewSchema,
  task: schemas.taskSchema,
  committeeMember: schemas.committeeMemberSchema,
  organiser: schemas.organiserSchema,
  milestoneProgress: schemas.milestoneProgressSchema,
  sponsorTarget: schemas.sponsorTargetSchema,
};

const inputClass =
  'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-[#4285f4] focus:outline-none focus:ring-2 focus:ring-[#4285f4]/30';

export function toDateInput(value) {
  if (!value) return '';
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
}

function Field({ f, error }) {
  const id = `f-${f.name}-${f.key ?? ''}`;
  const common = {
    id,
    name: f.name,
    required: f.required,
    'aria-invalid': Boolean(error),
    'aria-describedby': error ? `${id}-err` : undefined,
  };
  let control;
  if (f.type === 'textarea') {
    control = <textarea {...common} rows={f.rows ?? 3} defaultValue={f.defaultValue ?? ''} className={inputClass} placeholder={f.placeholder} />;
  } else if (f.type === 'select') {
    control = (
      <select {...common} defaultValue={f.defaultValue ?? ''} className={inputClass}>
        {f.allowEmpty !== false && <option value="">{f.emptyLabel ?? '—'}</option>}
        {f.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  } else if (f.type === 'checkbox') {
    return (
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" name={f.name} defaultChecked={Boolean(f.defaultValue)} className="h-4 w-4" />
        {f.label}
      </label>
    );
  } else {
    const type = f.type === 'rupees' ? 'text' : f.type ?? 'text';
    const value = f.type === 'date' ? toDateInput(f.defaultValue) : f.defaultValue ?? '';
    control = (
      <input
        {...common}
        type={type}
        inputMode={f.type === 'rupees' || f.type === 'number' ? 'numeric' : undefined}
        defaultValue={value}
        className={inputClass}
        placeholder={f.placeholder ?? (f.type === 'rupees' ? '₹ whole rupees' : undefined)}
      />
    );
  }
  return (
    <div className={cn('flex flex-col gap-1', f.wide && 'md:col-span-2')}>
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-wide text-gray-600">
        {f.label}
        {f.required && <span className="text-[#ea4335]"> *</span>}
      </label>
      {control}
      {f.help && <p className="text-xs text-gray-500">{f.help}</p>}
      {error && (
        <p id={`${id}-err`} className="text-xs text-[#ea4335]">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * A form bound to a server action. It validates with the same schema as the
 * server before submitting, then shows the server's verdict.
 */
export default function ActionForm({ action, schema, fields = [], hidden = {}, submitLabel = 'Save', variant = 'primary', confirmText, columns = 2, children }) {
  const [state, formAction, pending] = useActionState(action, null);
  const [clientErrors, setClientErrors] = useState({});
  const errors = { ...(state?.fieldErrors ?? {}), ...clientErrors };

  function onSubmit(e) {
    const fd = new FormData(e.currentTarget);
    const s = schema ? SCHEMAS[schema] : null;
    if (s) {
      const parsed = schemas.parseForm(s, fd);
      if (!parsed.ok) {
        e.preventDefault();
        setClientErrors(parsed.fieldErrors);
        return;
      }
    }
    setClientErrors({});
    if (confirmText && !window.confirm(confirmText)) e.preventDefault();
  }

  return (
    <form action={formAction} onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      {Object.entries(hidden).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v ?? ''} />
      ))}
      {fields.length > 0 && (
        <div className={cn('grid gap-4', columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : 'grid-cols-1')}>
          {fields.map((f) => (
            <Field key={f.name} f={f} error={errors[f.name]} />
          ))}
        </div>
      )}
      {children}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className={cn(
            'rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50',
            variant === 'primary' && 'bg-[#4285f4] text-white hover:bg-[#3367d6]',
            variant === 'secondary' && 'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50',
            variant === 'danger' && 'border border-[#ea4335] bg-white text-[#ea4335] hover:bg-red-50',
          )}
        >
          {pending ? 'Saving…' : submitLabel}
        </button>
        {state?.ok && !pending && <span className="text-sm text-[#188038]">{state.message}</span>}
        {state && !state.ok && !pending && (
          <span role="alert" className="text-sm text-[#ea4335]">
            {state.error}
          </span>
        )}
      </div>
    </form>
  );
}
