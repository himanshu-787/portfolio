// import { defineConfig, devices } from "@playwright/test";

// const isCI = !!process.env.CI;

// export default defineConfig({
//   testDir: "./e2e",
//   fullyParallel: true,
//   forbidOnly: isCI,
//   retries: isCI ? 1 : 0,
//   workers: isCI ? 1 : 2,
//   reporter: isCI ? [["list"], ["html", { open: "never" }]] : [["list"], ["html", { open: "never" }]],
//   use: { baseURL: "http://localhost:3000", trace: "on-first-retry" },
//   projects: [
//     { name: "desktop", use: { ...devices["Desktop Chrome"] } },
//     { name: "mobile", use: { ...devices["Pixel 5"] } },
//   ],
//   webServer: {
//     // CI builds in a separate step; locally this builds then starts.
//     command: isCI ? "npm run start" : "npm run build && npm run start",
//     url: "http://localhost:3000",
//     reuseExistingServer: !isCI,
//     timeout: 240_000,
//   },
// });





import { defineConfig, devices } from "@playwright/test";

const isCI = !!process.env.CI;
const remoteUrl = process.env.PLAYWRIGHT_BASE_URL; // set to test a deployed site

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : 2,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: remoteUrl ?? "http://localhost:3000", trace: "on-first-retry" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 5"] } },
  ],
  // No local server when testing a deployed URL.
  webServer: remoteUrl
    ? undefined
    : {
        // CI builds in a separate step; locally this builds then starts.
        command: isCI ? "npm run start" : "npm run build && npm run start",
        url: "http://localhost:3000",
        reuseExistingServer: !isCI,
        timeout: 240_000,
      },
});