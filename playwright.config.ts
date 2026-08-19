import { defineConfig, devices } from "@playwright/test";

// Dedicated port for this project's test server. Deliberately not 3000: another local project
// listens there, and with reuseExistingServer the suite silently ran against IT.
const LOCAL_PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3100);

// .webby/qa/PLAYWRIGHT_CAPTURE_PLAN.json reference viewports.
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: {
    // PLAYWRIGHT_BASE_URL lets a capture run target a deployed preview (e.g. Vercel) instead
    // of the local dev server — used for the final-vercel-qa evidence round.
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${LOCAL_PORT}`,
    trace: "retain-on-failure",
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `npm run start -- --port ${LOCAL_PORT}`,
        url: `http://localhost:${LOCAL_PORT}`,
        // Never adopt a stranger's server. This suite previously ran green against an unrelated
        // app that happened to occupy :3000, so results were meaningless. Own the port, and if
        // it is already taken, fail loudly instead of testing someone else's site.
        reuseExistingServer: false,
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
