import { defineConfig, devices } from "@playwright/test";

// .webby/qa/PLAYWRIGHT_CAPTURE_PLAN.json reference viewports.
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  webServer: {
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
