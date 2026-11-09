import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')

describe('public page privacy baseline', () => {
  it('does not load third-party font providers automatically', () => {
    expect(html).not.toMatch(/fonts\\.(googleapis|gstatic)\\.com/i)
  })
})
