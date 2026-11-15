import { describe, expect, it } from 'vitest'
import {
  canTransition,
  isRequestStatus,
  requestStatuses,
  transitionRequest,
} from '../src/domain/administrative-request'

describe('proposed administrative request lifecycle (no persistence)', () => {
  it('accepts exactly the four proposed statuses', () => {
    expect(requestStatuses).toEqual(['received', 'reviewing', 'contacted', 'closed'])
    for (const status of requestStatuses) expect(isRequestStatus(status)).toBe(true)
    for (const status of ['', 'cancelled', 'reopened', null, 1, {}]) {
      expect(isRequestStatus(status)).toBe(false)
    }
  })

  it('permits only the five documented transitions', () => {
    const valid = new Set([
      'received:reviewing',
      'received:closed',
      'reviewing:contacted',
      'reviewing:closed',
      'contacted:closed',
    ])
    for (const from of requestStatuses) {
      for (const to of requestStatuses) {
        const expected = valid.has(`${from}:${to}`)
        expect(canTransition(from, to)).toBe(expected)
        expect(transitionRequest(from, to)).toEqual(expected
          ? { ok: true, status: to }
          : { ok: false, reason: 'invalid_transition' })
      }
    }
  })

  it('fails closed on invalid input without echoing it', () => {
    const sensitive = 'private-contact@example.invalid'
    expect(transitionRequest('received', sensitive)).toEqual({
      ok: false, reason: 'invalid_status',
    })
    expect(transitionRequest(sensitive, 'closed')).toEqual({
      ok: false, reason: 'invalid_status',
    })
  })

  it('does not mutate input and closed is terminal', () => {
    expect(transitionRequest('closed', 'received')).toEqual({
      ok: false, reason: 'invalid_transition',
    })
  })
  it('rejects untrusted runtime values without exceptions or leaked payloads', () => {
    const untrusted: unknown[] = [
      undefined, null, '', 0, 1, false, true, [], {}, 'RECEIVED',
      '__proto__', 'constructor', 'toString',
      { status: 'received' }, 'private-contact@example.invalid',
    ]
    for (const value of untrusted) {
      expect(isRequestStatus(value)).toBe(false)
      expect(canTransition(value, 'closed')).toBe(false)
      expect(canTransition('received', value)).toBe(false)
      expect(transitionRequest(value, 'closed')).toEqual({
        ok: false, reason: 'invalid_status',
      })
      expect(transitionRequest('received', value)).toEqual({
        ok: false, reason: 'invalid_status',
      })
    }
  })

  it('does not accept repeated transitions, including terminal closure', () => {
    for (const status of requestStatuses) {
      expect(canTransition(status, status)).toBe(false)
      expect(transitionRequest(status, status)).toEqual({
        ok: false, reason: 'invalid_transition',
      })
    }
    expect(requestStatuses.filter(status => canTransition('closed', status))).toEqual([])
  })

})
