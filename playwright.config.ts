import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5 * 1000 },
  retries: 1,
  reporter: [['line'], ['allure-playwright']],
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  outputDir: 'test-results',
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'tests-chromium',
      use: { storageState: 'tests/storage/loggedInState.json', browserName: 'chromium' },
    },
  ],
});
