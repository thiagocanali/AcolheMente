import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

test('production dependencies do not reintroduce Supabase clients', () => {
  for (const name of Object.keys(manifest.dependencies ?? {})) {
    assert.doesNotMatch(name, /supabase/i, `Unexpected Supabase runtime dependency: ${name}`)
  }
})

test('browser source never references database credentials or Supabase runtime', () => {
  const sourceDir = new URL('../src/', import.meta.url).pathname
  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name)
      if (statSync(path).isDirectory()) {
        walk(path)
      } else if (/\.(vue|ts|tsx|js|jsx)$/.test(name)) {
        const code = readFileSync(path, 'utf8')
        assert.doesNotMatch(code, /@supabase\/|supabase\.auth|supabase\.from\s*\(/i, `Supabase client usage in ${path}`)
        assert.doesNotMatch(code, /import\.meta\.env\.VITE_(?:DATABASE_URL|AUTH_SECRET|SUPABASE_SERVICE_ROLE_KEY)/, `Secret exposed to Vite in ${path}`)
      }
    }
  }
  walk(sourceDir)
})
