import { test, expect } from "./test";
import { build } from "esbuild";
import { readFileSync } from "node:fs";

let fixtureHtml: string;
test.beforeAll(async () => {
  const result = await build({ entryPoints: ["tests/browser/fixture.tsx"], bundle: true, write: false, platform: "browser", format: "iife", jsx: "automatic", define: { "process.env.NODE_ENV": '"production"', "process.env": "{}" } });
  const css = readFileSync("src/app/globals.css", "utf8").replace('@import "tailwindcss";', "") + readFileSync("src/app/second-delivery.css", "utf8");
  fixtureHtml = `<!doctype html><html lang="pt-BR"><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>Fixture de teste</title><style>${css}</style></head><body><div id="root"></div><script>${result.outputFiles[0].text.replace(/<\/script/gi, "<\\/script")}</script></body></html>`;
});

test("new sections, corporate links, FAQ and both navigation surfaces", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#depoimentos")).toHaveCount(0);
  await expect(page.locator("#historia")).toHaveCount(1);
  await expect(page.locator(".process-pillars li")).toHaveCount(5);
  await expect(page.locator(".order-steps li")).toHaveCount(4);
  await expect(page.locator("#nosso-processo img")).toHaveAttribute("alt", /Peças de charcutaria da Brutona/);
  const corporate = page.locator("#empresas").getByRole("link", { name: "Montar meu kit" });
  const url = new URL((await corporate.getAttribute("href"))!);
  expect(url.pathname).toBe("/5531983820546");
  expect(url.searchParams.get("text")).toContain("kits corporativos da Brutona");
  const questions = page.locator("#perguntas summary");
  await questions.first().focus();
  await page.keyboard.press("Enter");
  await questions.nth(1).focus();
  await page.keyboard.press("Space");
  await expect(page.locator("#perguntas details[open]")).toHaveCount(2);
  await page.keyboard.press("Space");
  await expect(page.locator("#perguntas details[open]")).toHaveCount(1);
  for (const route of ["/", "/catalogo"]) {
    for (const [name, id] of [["Nosso processo", "nosso-processo"], ["Empresas", "empresas"]]) {
      await page.goto(route);
      await page.getByRole("navigation", { name: "Navegação principal", exact: true }).getByRole("link", { name, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport();
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/catalogo");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expect(page.getByRole("navigation", { name: "Navegação mobile" }).getByRole("link")).toHaveCount(6);
  await page.getByRole("navigation", { name: "Navegação mobile" }).getByRole("link", { name: "Empresas" }).click();
  await expect(page.locator("#empresas")).toBeInViewport();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("context photos retain clear captions in cards, modal and failure state", async ({ page }) => {
  await page.goto("/catalogo");
  await expect(page.getByText("Imagem ilustrativa", { exact: true })).toHaveCount(0);
  for (const [id, caption] of [
    ["kit-presente-caixa", "Sugestão de apresentação. Consulte a composição do kit."],
    ["linguica-alho-poro", "Foto da linha de linguiças. Sabor não representado."],
    ["kit-feijoada", "Sugestão de preparo. Não representa o conteúdo do kit."],
  ]) {
    const card = page.locator(`[data-product-id="${id}"]`);
    await expect(card.getByText(caption, { exact: true })).toBeVisible();
    await expect(card.getByRole("button")).toHaveAccessibleDescription(caption);
    await card.getByRole("button").click();
    await expect(page.getByRole("dialog").getByText(caption, { exact: true })).toBeVisible();
    await expect(page.getByRole("dialog")).toHaveAccessibleDescription(`Preços sujeitos a alteração. Consulte disponibilidade. ${caption}`);
    await page.getByRole("button", { name: "Fechar detalhes" }).click();
  }
  const noPhoto = page.locator('[data-product-id="orelhinha-defumada"]');
  await expect(noPhoto.getByText("Foto em breve")).toBeVisible();
  await noPhoto.getByRole("button").click();
  await expect(page.getByRole("dialog").getByText("Foto em breve")).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Pedir pelo WhatsApp" })).toHaveAttribute("href", /wa.me\/5531983820546/);
  await page.keyboard.press("Escape");
  await page.route("**/_next/image?**", route => route.abort());
  await page.reload();
  const card = page.locator('[data-product-id="kit-presente-caixa"]');
  await expect(card.getByText("Foto em breve")).toBeVisible();
  await card.getByRole("button").click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "Pedir pelo WhatsApp" })).toBeVisible();
  await expect(page.getByRole("dialog").getByText("Sugestão de apresentação. Consulte a composição do kit.", { exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.goto("/");
  await page.getByRole("button", { name: "Ver detalhes de Kit Presente Caixa", exact: true }).click();
  await expect(page.getByRole("dialog").getByText("Sugestão de apresentação. Consulte a composição do kit.", { exact: true })).toBeVisible();
});

for (const scenario of ["empty", "blocked", "loading", "success", "narrow"]) {
  test(`Instagram ${scenario}: real fallbacks and lazy single script`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.setViewportSize({ width: scenario === "narrow" ? 360 : 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    let scriptRequests = 0;
    await page.route("**/www.instagram.com/embed.js", async route => {
      scriptRequests++;
      if (scenario === "blocked") return route.abort();
      if (scenario === "loading") return route.fulfill({ contentType: "text/javascript", body: "window.instgrm = { Embeds: { process() {} } };" });
      return route.fulfill({ contentType: "text/javascript", body: 'window.instgrm = { Embeds: { process() { document.querySelectorAll("blockquote.instagram-media").forEach(q => { const f = document.createElement("iframe"); f.title = "Publicação de teste"; f.srcdoc = "<html lang=pt-BR><body>Publicação simulada apenas no teste</body></html>"; q.replaceWith(f); }); } } };' });
    });
    await page.route("**/__fixture**", route => route.fulfill({ contentType: "text/html", body: fixtureHtml }));
    await page.goto(`/__fixture?scenario=${scenario}`);
    await expect(page.locator("#instagram")).toBeAttached();
    expect(scriptRequests).toBe(0);
    await page.locator("#instagram").scrollIntoViewIfNeeded();
    if (scenario === "empty") {
      await expect(page.locator(".instagram-selection")).toHaveCount(2);
      expect(scriptRequests).toBe(0);
    } else {
      await expect(page.locator(".instagram-post")).toHaveCount(4);
      if (scenario === "success") {
        await expect(page.locator(".embed-ready").first()).toBeVisible();
        await expect(page.locator(".instagram-fallback").first()).toBeHidden();
        await page.locator(".instagram-post").last().scrollIntoViewIfNeeded();
        await expect(page.locator(".embed-ready")).toHaveCount(4);
      } else {
        await expect(page.locator(".instagram-fallback").first()).toBeVisible();
        await expect(page.locator(".embed-ready")).toHaveCount(0);
      }
      if (scenario === "narrow") expect(scriptRequests).toBe(0);
      else await expect.poll(() => scriptRequests).toBe(1);
      await expect(page.locator(".instagram-link").first()).toHaveAttribute("href", "https://www.instagram.com/p/FIXTURE_0/");
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    expect(errors).toEqual([]);
  });
}
