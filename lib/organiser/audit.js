// Append-only audit trail for sponsorship status and financial changes.
function toJson(value) {
  if (value === undefined || value === null) return undefined;
  return JSON.parse(JSON.stringify(value));
}

export async function writeAudit(tx, actor, { action, entityType, entityId, before, after }) {
  await tx.auditLog.create({
    data: {
      actorEmail: actor.email,
      action,
      entityType,
      entityId: entityId ?? null,
      before: toJson(before),
      after: toJson(after),
    },
  });
}

/** Keeps only the fields that changed, so the log stays readable. */
export function diff(before, after) {
  const b = {};
  const a = {};
  for (const key of Object.keys(after)) {
    const bv = before?.[key];
    const av = after[key];
    const same =
      bv instanceof Date || av instanceof Date
        ? new Date(bv ?? 0).getTime() === new Date(av ?? 0).getTime() && (bv == null) === (av == null)
        : JSON.stringify(bv ?? null) === JSON.stringify(av ?? null);
    if (!same) {
      b[key] = bv ?? null;
      a[key] = av ?? null;
    }
  }
  return { before: b, after: a, changed: Object.keys(a).length > 0 };
}
