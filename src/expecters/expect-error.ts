export type FailureReason = {
  subject: string
  predicate: string
}

export class ExpectationError extends Error {
  constructor(reason: FailureReason, inverted: boolean = false) {
    const { subject, predicate } = reason
    const errorMsg = inverted ? `Expected ${subject} not to ${predicate}.` : `Expected ${subject} to ${predicate}.`
    super(errorMsg)
  }
}
