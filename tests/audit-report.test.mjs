import { test } from 'node:test'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { summarizeAudit } from '../scripts/report-audit.mjs'

const report = (counts = {}) => ({
  auditReportVersion: 2,
  metadata: { vulnerabilities: { info: 0, low: 0, moderate: 0, high: 0, critical: 0, total: 0, ...counts } },
  vulnerabilities: {},
})

test('clean and low-only audit reports do not block', () => {
  assert.equal(summarizeAudit(report()).blocked, false)
  assert.equal(summarizeAudit(report({ low: 1, total: 1 })).blocked, false)
})

test('moderate, high and critical advisories block', () => {
  for (const severity of ['moderate', 'high', 'critical']) {
    assert.equal(summarizeAudit(report({ [severity]: 1, total: 1 })).blocked, true)
  }
})

test('registry errors and incomplete or inconsistent reports fail closed', () => {
  for (const value of [null, {}, { error: { code: 'ENOTFOUND' } },
    report({ total: 1 }), report({ low: -1, total: -1 }),
    { ...report(), auditReportVersion: 99 }, { ...report(), vulnerabilities: null }]) {
    assert.throws(() => summarizeAudit(value))
  }
})

test('CLI returns failure for malformed JSON and blocking advisories', () => {
  const dir = mkdtempSync(join(tmpdir(), 'acolhemente-audit-'))
  try {
    const file = join(dir, 'audit.json')
    for (const [content, expected] of [
      ['not-json', 1],
      [JSON.stringify({ error: { code: 'EAI_AGAIN' } }), 1],
      [JSON.stringify(report({ high: 1, total: 1 })), 1],
      [JSON.stringify(report()), 0],
    ]) {
      writeFileSync(file, content)
      const result = spawnSync(process.execPath, ['scripts/report-audit.mjs', file], { encoding: 'utf8' })
      assert.equal(result.status, expected, result.stderr)
    }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
})
