// Event identity used by the organiser area and generated documents.
// Sources: permission letter GDGDIT/2026-27 (14/10/2026) and the master implementation brief.
export const EVENT = {
  name: 'THE INCURSION 2027',
  theme: 'Doomsday Avenger',
  formalReference: 'Incursion – Times runs out',
  format: '24-hour national-level hackathon',
  organiser: 'Google Developer Groups On Campus, DIT Pimpri (GDG DIT)',
  organiserShort: 'GDG DIT',
  host: 'Dr. D. Y. Patil Institute of Technology, Pimpri, Pune 411018',
  finale: '30–31 January 2027 (on campus)',
  contactEmail: 'gdg.dit@dypvp.edu.in',
  website: 'gdgdit.dypvp.edu.in',
};

// Terms that must never appear in generated documents: an old event title,
// organisations that are not authorised co-organisers, and unlicensed IP owners.
export const FORBIDDEN_DOCUMENT_TERMS = [
  /\bUDGAM\b/i,
  /\bACES\b/,
  /\bAWS\s+SBG\b/i,
  /\bMarvel\b/i,
  /\bDisney\b/i,
  /\bAvengers\b/i,
];
