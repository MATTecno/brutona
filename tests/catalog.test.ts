import { test } from "node:test";
import assert from "node:assert/strict";
import approved from "./fixtures/approved-content.json";
import { products, featuredProducts, getCategories } from "../src/data/products";
import { buildProductWhatsAppUrl, buildWhatsAppUrl } from "../src/lib/whatsapp";
import { brand, mapUrl, mapEmbedUrl } from "../src/data/brand";
import { formatPrice } from "../src/lib/format";

test("all 17 products match the independently approved prices and units", () => {
  assert.equal(approved.products.length, 17);
  assert.equal(products.length, 17);
  assert.equal(new Set(products.map(p => p.id)).size, 17);
  for (const expected of approved.products) {
    const product = products.find(p => p.id === expected.id);
    assert.ok(product, `Missing product: ${expected.id}`);
    assert.deepEqual({ id: product.id, name: product.name, price: product.price, priceUnit: product.priceUnit }, expected);
    assert.equal(product.slug, expected.id);
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

test("approved address, hours and messages remain consistent across contact URLs", () => {
  for (const key of ["address", "street", "city", "postalCode", "whatsapp", "hours", "messages"] as const) {
    assert.deepEqual(brand[key], approved.brand[key], key);
  }
  assert.equal(new URL(mapUrl).searchParams.get("query"), approved.brand.address);
  assert.equal(new URL(mapEmbedUrl).searchParams.get("q"), approved.brand.address);
  assert.equal(new URL(buildWhatsAppUrl(brand.messages.generic)).searchParams.get("text"), approved.brand.messages.generic);
});
