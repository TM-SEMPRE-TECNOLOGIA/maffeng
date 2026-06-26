import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: './test_screenshots',
  reporter: [['html', { outputFolder: 'test_report', open: 'never' }], ['list']],
  use: {
    headless: false,
    slowMo: 200,
    viewport: { width: 1440, height: 900 },
    screenshot: 'on',
    baseURL: 'http://localhost:8080',
  },
  webServer: {
    command: 'npx serve "Design Maffeng/Vai entrar no projeto" -l 8080 --no-clipboard',
    port: 8080,
    reuseExistingServer: true,
    timeout: 15000,
  },
});
