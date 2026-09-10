import { defineConfig } from "@playwright/test";

const externalServer = process.env.TEST_BASE_URL;

export default defineConfig({
  testDir: "./tests/browser",
  timeout: 45000,
  fullyParallel: false,
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  use: { baseURL: externalServer ?? "http://127.0.0.1:3100", browserName: "chromium", trace: "retain-on-failure", screenshot: "only-on-failure" },
  reporter: [["list"], ["html", { open: "never" }]],
  webServer: externalServer ? undefined : {
    command: "npm run start -- --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
