import { test as base, expect } from "@playwright/test";

export const test = base.extend<{ externalServices: void }>({
  externalServices: [async ({ page }, use) => {
    // Individual failure/embed scenarios can override these routes later.
    await page.route("https://maps.google.com/**", route => route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="pt-BR"><head><title>Mapa de teste</title></head><body><main>Mapa simulado apenas no teste</main></body></html>',
    }));
    await page.route("https://www.instagram.com/embed.js", route => route.abort());
    await use();
  }, { auto: true }],
});

export { expect };
