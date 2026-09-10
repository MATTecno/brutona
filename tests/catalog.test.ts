import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { products, featuredProducts, getCategories } from "../src/data/products";
import { buildProductWhatsAppUrl, buildWhatsAppUrl } from "../src/lib/whatsapp";
import { brand } from "../src/data/brand";
import { formatPrice } from "../src/lib/format";

test("all 17 products match the source brief, including price and unit", () => {
  const brief = readFileSync("brutona_codex_brief/BRUTONA_SITE_BRIEF.md", "utf8");
  const seedSection = brief.split("# 36. Seed inicial do catálogo")[1].split("# 37.")[0];
  const rows = seedSection.split("\n").filter(row => row.startsWith("| ") && row.includes("R$"));
  assert.equal(rows.length, 17);
  assert.equal(products.length, 17);
  assert.equal(new Set(products.map(p => p.id)).size, 17);
  for (const row of rows) {
    const [, name, priceText] = row.split("|").map(cell => cell.trim());
    const product = products.find(p => p.name.toLocaleLowerCase("pt-BR") === name.toLocaleLowerCase("pt-BR"));
    assert.ok(product, `Missing product: ${name}`);
    const [amount, unit] = priceText.replace("R$ ", "").split("/");
    assert.equal(product.price, Number(amount.replace(",", ".")), name);
    assert.equal(product.priceUnit, unit ?? "kit", name);
    assert.equal(product.active, true);
  }
});

test("categories follow active data and never include an empty category", () => {
  assert.deepEqual(getCategories(products), ["linguicas", "defumados", "suinos", "kits"]);
  assert.deepEqual(getCategories(products.map(p => ({ ...p, active: false }))), []);
  assert.deepEqual(getCategories(products.filter(p => p.category === "kits")), ["kits"]);
  assert.equal(featuredProducts.length, 4);
  assert.deepEqual(featuredProducts.map(p => p.id), ["bacon", "linguica-tradicional", "copalombo-maturado", "kit-presente-caixa"]);
});

test("WhatsApp URL preserves accents and encodes reserved characters", () => {
  const name = "Linguiça Suína com Jiló & Alho + 100%";
  const url = new URL(buildProductWhatsAppUrl(name));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/5531983820546");
  assert.equal(url.searchParams.get("text"), `Olá! Tenho interesse no produto ${name}.`);
  assert.equal([...url.searchParams.keys()].length, 1);
  assert.equal(new URL(buildWhatsAppUrl(brand.messages.generic)).searchParams.get("text"), brand.messages.generic);
});

test("prices use Brazilian currency and Wednesday hours match owner confirmation", () => {
  assert.equal(formatPrice(18.9).replace(/\s/g, " "), "R$ 18,90");
  assert.equal(brand.hours.find(item => item.day === "Quarta")?.time, "09:00 – 20:00");
});
