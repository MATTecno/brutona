import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("complete desktop product flow and accessible modal", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("CARNE FRACA");
  await page.getByRole("link", { name: "Conheça nossos produtos", exact: true }).click();
  await expect(page).toHaveURL(/\/catalogo$/);
  await expect(page.locator(".product-card")).toHaveCount(17);
  await page.getByRole("button", { name: "Linguiças 6" }).click();
  await expect(page.locator(".product-card")).toHaveCount(6);
  const trigger = page.getByRole("button", { name: "Ver detalhes de Linguiça Suína com Jiló", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading")).toHaveText("Linguiça Suína com Jiló");
  const href = await dialog.getByRole("link", { name: "Pedir pelo WhatsApp" }).getAttribute("href");
  expect(new URL(href!).searchParams.get("text")).toBe("Olá! Tenho interesse no produto Linguiça Suína com Jiló.");
  expect(await page.locator("body").evaluate(el => getComputedStyle(el).overflow)).toBe("hidden");
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(await page.locator("body").evaluate(el => getComputedStyle(el).overflow)).not.toBe("hidden");
  await trigger.press("Enter");
  await dialog.getByRole("button", { name: "Fechar detalhes" }).click();
  await trigger.click();
  await page.locator(".dialog-overlay").click({ position: { x: 5, y: 5 } });
  await expect(dialog).not.toBeVisible();
  await page.getByRole("button", { name: "Todos 17" }).click();
  await expect(page.locator(".product-card")).toHaveCount(17);
  await page.getByRole("navigation", { name: "Navegação principal", exact: true }).getByRole("link", { name: "Cris Vieira" }).click();
  await expect(page).toHaveURL(/\/#cris-vieira$/);
  await expect(page.locator("#cris-vieira")).toBeInViewport();
  await page.getByRole("button", { name: "Ver detalhes de Bacon", exact: true }).click();
  await expect(dialog.getByRole("heading")).toHaveText("Bacon");
});

test("mobile menu, filters and reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/catalogo");
  await page.getByLabel("Categoria", { exact: true }).selectOption("kits");
  await expect(page.locator(".product-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Ver detalhes de Kit Feijoada", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Pedir pelo WhatsApp" })).toBeInViewport();
  await page.getByRole("button", { name: "Fechar detalhes" }).click();
  const menu = page.getByRole("button", { name: "Abrir menu" });
  await menu.click();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole("navigation", { name: "Navegação mobile" }).getByRole("link", { name: "Onde encontrar" }).click();
  await expect(page).toHaveURL(/\/#onde-encontrar$/);
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator("#onde-encontrar")).toBeInViewport();
  expect(await page.locator("html").evaluate(el => getComputedStyle(el).scrollBehavior)).toBe("auto");
});

test("missing photo and blocked map retain contact actions", async ({ page }) => {
  await page.route("**/maps.google.com/**", route => route.abort());
  await page.route("**/_next/image?**", route => route.abort());
  await page.goto("/");
  await expect(page.locator(".hero-photo .photo-placeholder")).toBeVisible();
  await page.locator("#onde-encontrar").scrollIntoViewIfNeeded();
  await expect(page.getByRole("link", { name: "Abrir rotas no Google Maps" })).toBeVisible();
  await expect(page.locator("#onde-encontrar").getByRole("link", { name: "(31) 98382-0546" })).toBeVisible();
  await page.getByRole("button", { name: "Ver detalhes de Bacon", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Pedir pelo WhatsApp" })).toBeVisible();
});

for (const width of [360, 390, 768, 1440, 1920]) {
  test(`responsive screenshots and accessibility at ${width}px`, async ({ page }, testInfo) => {
    const heights: Record<number, number> = { 360: 667, 390: 844, 768: 1024, 1440: 900, 1920: 1080 };
    const height = heights[width];
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const path of ["/", "/catalogo"]) {
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("h1")).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow).toBe(false);
      if (path === "/") {
        const heroHeight = await page.locator(".hero").evaluate(el => el.getBoundingClientRect().height);
        expect(heroHeight).toBeLessThan(height);
        expect(await page.locator(".manifesto .eyebrow").evaluate(el => el.getBoundingClientRect().top)).toBeLessThan(height - 12);
        expect(await page.locator(".hero h1 span").evaluateAll(els => els.every(el => el.scrollWidth <= el.clientWidth))).toBe(true);
        for (const id of ["nosso-processo", "cris-vieira", "historia", "empresas", "instagram", "como-pedir", "perguntas"]) {
          const section = page.locator(`#${id}`);
          await section.scrollIntoViewIfNeeded();
          await expect.poll(() => section.locator("img").evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
          // Fixed navigation is captured separately in viewport screenshots.
          await section.screenshot({ path: testInfo.outputPath(`${id}-${width}.png`), style: ".site-header, .skip-link { visibility: hidden !important; }" });
        }
        await page.evaluate(() => window.scrollTo(0, 0));
      }
      const name = path === "/" ? "home" : "catalogo";
      await page.screenshot({ path: testInfo.outputPath(`${name}-viewport-${width}.png`) });
      await page.screenshot({ path: testInfo.outputPath(`${name}-${width}.png`), fullPage: true });
      const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(result.violations.map(v => `${v.id}: ${v.nodes.map(n => n.failureSummary).join("; ")}`)).toEqual([]);
    }
    await page.getByRole("button", { name: "Ver detalhes de Kit Presente Caixa", exact: true }).click();
    await expect.poll(() => page.getByRole("dialog").locator("img").evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`modal-${width}.png`) });
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(result.violations.map(v => `${v.id}: ${v.nodes.map(n => n.failureSummary).join("; ")}`)).toEqual([]);
  });
}
