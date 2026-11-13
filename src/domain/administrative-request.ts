/**
 * Pure, non-persistent domain prototype. No patient or contact information.
 * Proposed lifecycle only: pending professional and privacy validation.
 */
export const requestStatuses = ['received', 'reviewing', 'contacted', 'closed'] as const
export type RequestStatus = (typeof requestStatuses)[number]

const allowedTransitions: Readonly<Record<RequestStatus, readonly RequestStatus[]>> = {
  received: ['reviewing', 'closed'],
  reviewing: ['contacted', 'closed'],
  contacted: ['closed'],
  closed: [],
}

export function isRequestStatus(value: unknown): value is RequestStatus {
  return typeof value === 'string' && requestStatuses.some(status => status === value)
}

export function canTransition(from: RequestStatus, to: RequestStatus): boolean {
  return allowedTransitions[from].includes(to)
}

export type TransitionResult =
  | { ok: true; status: RequestStatus }
  | { ok: false; reason: 'invalid_status' | 'invalid_transition' }

export function transitionRequest(from: unknown, to: unknown): TransitionResult {
  if (!isRequestStatus(from) || !isRequestStatus(to)) {
    return { ok: false, reason: 'invalid_status' }
  }
  if (!canTransition(from, to)) {
    return { ok: false, reason: 'invalid_transition' }
  }
  return { ok: true, status: to }
}
