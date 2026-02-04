import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',            // where your test files are
  timeout: 30_000,               // max time per test
  expect: {
    timeout: 5_000,              // max time for expect assertions
  },
  fullyParallel: true,           // run tests in parallel
  retries: 1,                    // retry once if test fails (optional)
  reporter: [
    ['list'],                     // console-friendly output
    ['html', { open: 'never' }], // HTML report, won't auto-open
  ],
  use: {
    testIdAttribute: 'data-test',
    headless: false,              // run in headed mode for easier debug
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure', // capture screenshots only on failure
    video: 'retain-on-failure',    // record videos only when a test fails
    trace: 'on-first-retry',       // create trace for debugging first retry
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});


