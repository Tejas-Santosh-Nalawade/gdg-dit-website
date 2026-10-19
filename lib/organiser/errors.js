export class ValidationError extends Error {
  constructor(fieldErrors, message = 'Please correct the highlighted fields.') {
    super(message);
    this.name = 'ValidationError';
    this.fieldErrors = fieldErrors;
  }
}

export class RuleError extends Error {
  constructor(problems) {
    super(Array.isArray(problems) ? problems.join(' ') : problems);
    this.name = 'RuleError';
    this.problems = Array.isArray(problems) ? problems : [problems];
  }
}

export class NotFoundError extends Error {
  constructor(what = 'Record') {
    super(`${what} not found.`);
    this.name = 'NotFoundError';
  }
}
