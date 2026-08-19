import { defineConfig, devices } from "@playwright/test";

// .webby/qa/PLAYWRIGHT_CAPTURE_PLAN.json reference viewports.
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: {
    // PLAYWRIGHT_BASE_URL lets a capture run target a deployed preview (e.g. Vercel) instead
    // of the local dev server — used for the final-vercel-qa evidence round.
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000",
    trace: "retain-on-failure",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: "npm run start",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    {
      name: "functional",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
      testMatch: /functional\.spec\.ts/,
    },
    {
      name: "evidence",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /evidence\.spec\.ts/,
    },
  ],
});
