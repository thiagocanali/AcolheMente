import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

test('production dependencies do not reintroduce Supabase clients', () => {
  for (const name of Object.keys(manifest.dependencies ?? {})) {
    assert.doesNotMatch(name, /supabase/i, `Unexpected Supabase runtime dependency: ${name}`)
  }
})

test('browser source never references database credentials or Supabase runtime', () => {
  const sourceDir = fileURLToPath(new URL('../src/', import.meta.url))
  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name)
      if (statSync(path).isDirectory()) {
        walk(path)
      } else if (/\.(vue|ts|tsx|js|jsx)$/.test(name)) {
        const code = readFileSync(path, 'utf8')
        assert.doesNotMatch(code, /@supabase\/|supabase\.auth|supabase\.from\s*\(/i, `Supabase client usage in ${path}`)
        assert.doesNotMatch(code, /import\.meta\.env\.VITE_[A-Z0-9_]*(?:DATABASE_URL|DATABASE_PASSWORD|AUTH_SECRET|SECRET_KEY|SERVICE_ROLE_KEY|PRIVATE_KEY|ACCESS_TOKEN)/, `Secret exposed to Vite in ${path}`)
      }
    }
  }
  walk(sourceDir)
})


test('fictional admin and profile previews remain development-only', () => {
  const entry = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8')
  assert.match(entry, /import\.meta\.env\.DEV\s*\?\s*new URLSearchParams\(window\.location\.search\)\.get\(['"]preview['"]\)\s*:\s*null/)
  assert.match(entry, /preview === ['"]admin['"]/, 'Admin preview should be explicit')
  assert.match(entry, /preview === ['"]profile['"]/, 'Profile preview should be explicit')
})
