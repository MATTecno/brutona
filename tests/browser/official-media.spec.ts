import { test, expect } from "./test";

test("official fonts, logo and real catalog photos replace provisional assets", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  expect(await page.locator("h1").evaluate(el => getComputedStyle(el).fontFamily)).toContain("Unbounded");
  expect(await page.locator("body").evaluate(el => getComputedStyle(el).fontFamily)).toContain("Figtree");
  await expect(page.locator("header img")).toHaveAttribute("src", "/official/logo-light.svg");
  await page.locator("#cris-vieira").scrollIntoViewIfNeeded();
  await expect(page.locator("#cris-vieira .cris-image img")).toHaveAttribute("alt", /Chef Cris Vieira/);
  await expect(page.locator("header img")).toHaveAttribute("src", "/official/logo.svg");
  await page.goto("/catalogo");
  await expect(page.locator(".product-card")).toHaveCount(17);
  await expect(page.locator(".product-card img")).toHaveCount(12);
  await expect(page.locator(".product-card .photo-placeholder")).toHaveCount(5);
  await page.getByRole("button", { name: "Ver detalhes de Bacon", exact: true }).click();
  await expect(page.getByRole("dialog").locator(".illustrative-badge")).toHaveCount(0);
  await expect(page.getByRole("dialog").locator("img")).toHaveAttribute("alt", /Bacon da Brutona/);
  expect(errors).toEqual([]);
});

test("all three official videos play on demand, keep portrait framing and support keyboard tabs", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const requests: string[] = [];
  page.on("request", request => { if (request.url().endsWith(".mp4")) requests.push(request.url()); });
  await page.goto("/");
  await page.locator("#historia").scrollIntoViewIfNeeded();
  await expect(page.locator("video")).toHaveCount(0);
  expect(requests).toEqual([]);
  const tabs = page.getByRole("tablist", { name: "Vídeos da Brutona" }).getByRole("tab");
  for (let index = 0; index < 3; index++) {
    await tabs.nth(index).click();
    await expect(page.locator("video")).toHaveCount(0);
    await page.locator(".film-play").click();
    const video = page.locator("video");
    await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.readyState)).toBeGreaterThan(1);
    await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(0);
    expect(await video.evaluate((el: HTMLVideoElement) => el.videoWidth / el.videoHeight)).toBeCloseTo(9 / 16);
    await video.evaluate((el: HTMLVideoElement) => el.pause());
  }
  await tabs.last().focus();
  await page.keyboard.press("Home");
  await expect(tabs.first()).toBeFocused();
  await expect(tabs.first()).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toBeFocused();
  await expect(page.locator("video")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});

test("video failure retains poster, external file link and navigation", async ({ page }) => {
  await page.route("**/*.mp4", route => route.abort());
  await page.goto("/");
  await page.locator(".film-play").click();
  await expect(page.getByRole("status")).toContainText("Não foi possível carregar o vídeo");
  await expect(page.locator(".film-player img")).toBeVisible();
  await expect(page.getByRole("link", { name: "Abrir vídeo", exact: true })).toHaveAttribute("href", "/official/historia.mp4");
  await expect(page.getByRole("tab", { name: "Um novo capítulo" })).toBeEnabled();
});
