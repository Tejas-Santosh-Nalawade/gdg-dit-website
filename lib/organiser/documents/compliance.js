import { FORBIDDEN_DOCUMENT_TERMS } from '../event';

function collectStrings(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => collectStrings(v, out));
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => collectStrings(v, out));
  return out;
}

/** Returns the forbidden terms a document model contains (old titles, unauthorised co-organisers, unlicensed IP). */
export function complianceProblems(doc) {
  const text = collectStrings(doc).join('\n');
  return FORBIDDEN_DOCUMENT_TERMS.filter((re) => re.test(text)).map((re) => re.source);
}

export function assertCompliant(doc) {
  const problems = complianceProblems(doc);
  if (problems.length) {
    throw new Error(`Document blocked: it contains terms that may not appear in INCURSION documents (${problems.join(', ')}). Fix the source record and try again.`);
  }
}
