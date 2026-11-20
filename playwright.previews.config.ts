import { defineConfig } from '@playwright/test'
import productionConfig from './playwright.config'

export default defineConfig({
  ...productionConfig,
  testDir: './e2e-previews',
  use: { ...productionConfig.use, baseURL: 'http://127.0.0.1:4176' },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4176 --strictPort',
    url: 'http://127.0.0.1:4176',
    reuseExistingServer: false,
  },
})
