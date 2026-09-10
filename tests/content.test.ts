import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync, existsSync } from "node:fs";
import { BrandStory } from "../src/components/home/BrandStory";
import { Testimonials } from "../src/components/home/Testimonials";
import { brand } from "../src/data/brand";
import { testimonials } from "../src/data/testimonials";
import { faqItems } from "../src/data/faq";
import { instagramPosts, publicInstagramUrl } from "../src/data/instagram";
import { products } from "../src/data/products";
import manifest from "../src/data/generated-images.json";
import { buildWhatsAppUrl } from "../src/lib/whatsapp";
import officialManifest from "../src/data/official-assets.json";
import { officialProductPhotos, officialPhotos, brandFilms } from "../src/data/official";
import sharp from "sharp";

test("history and testimonials render only approved nonempty content", () => {
  assert.match(renderToStaticMarkup(createElement(BrandStory)), /Nascida da vontade de fazer bacon/);
  assert.equal(renderToStaticMarkup(createElement(Testimonials)), "");
  const story = { eyebrow: "Fixture", title: "História de teste", paragraphs: ["Texto exclusivo do teste."], approved: false };
  assert.equal(renderToStaticMarkup(createElement(BrandStory, { story })), "");
  assert.match(renderToStaticMarkup(createElement(BrandStory, { story: { ...story, approved: true } })), /Texto exclusivo do teste/);
  assert.equal(renderToStaticMarkup(createElement(BrandStory, { story: { ...story, approved: true, paragraphs: ["  "] } })), "");
  const item = { id: "fixture", name: "Pessoa fictícia de teste", text: "Depoimento exclusivo do teste.", approved: true };
  assert.match(renderToStaticMarkup(createElement(Testimonials, { items: [item] })), /Depoimento exclusivo do teste/);
  assert.equal(renderToStaticMarkup(createElement(Testimonials, { items: [{ ...item, approved: false }] })), "");
  assert.equal(renderToStaticMarkup(createElement(Testimonials, { items: [{ ...item, name: " " }] })), "");
  assert.equal(testimonials.length, 0);
  assert.equal(instagramPosts.length, 0);
});

test("18 generated assets exist, have correct dimensions and product association", () => {
  assert.equal(Object.keys(manifest).length, 18);
  for (const [id, entry] of Object.entries(manifest)) {
    assert.ok(existsSync(`public${entry.src}`), id);
    const png = readFileSync(`public${entry.src}`);
    assert.equal(png.readUInt32BE(16), entry.width, id);
    assert.equal(png.readUInt32BE(20), entry.height, id);
  }
  const generated = products.filter(p => p.photo?.origin === "generated");
  assert.equal(generated.length, 8);
  for (const product of generated) {
    assert.equal(product.image, `/generated/${product.id}.png`);
    assert.equal(product.photo?.provisional, true);
    assert.ok(product.photo?.alt.includes("Imagem ilustrativa"));
  }
  assert.equal(products.find(p => p.id === "bacon")?.photo?.origin, "official");
});

test("official media preserve provenance, dimensions and original logo files", async () => {
  assert.equal(Object.keys(officialProductPhotos).length, 9);
  for (const entry of Object.values(officialManifest)) {
    assert.ok(existsSync(`public${entry.src}`));
    assert.ok(existsSync(entry.source));
    assert.equal(entry.origin, "official");
    assert.equal(entry.provisional, false);
    if ("poster" in entry) { assert.ok(existsSync(`public${entry.poster}`)); continue; }
    const dimensions = await sharp(`public${entry.src}`).metadata();
    assert.equal(dimensions.width, entry.width);
    assert.equal(dimensions.height, entry.height);
    if (entry.src.endsWith(".svg")) assert.deepEqual(readFileSync(`public${entry.src}`), readFileSync(entry.source));
  }
  assert.equal(officialPhotos.cris.origin, "official");
  assert.equal(brandFilms.length, 3);
  assert.ok(brand.story.approved && brand.story.source && existsSync(brand.story.source));
  assert.ok(brand.cris.paragraphs.join(" ").includes("Lady Brutus"));
});

test("FAQ answers match the brief and corporate CTA uses its dedicated message", () => {
  const brief = readFileSync("brutona_codex_brief/BRUTONA_SITE_BRIEF.md", "utf8");
  assert.equal(faqItems.length, 5);
  for (const item of faqItems) { assert.ok(brief.includes(item.question)); assert.ok(brief.includes(item.answer)); }
  assert.equal(new URL(buildWhatsAppUrl(brand.messages.corporate)).searchParams.get("text"), "Olá! Vim pelo site e gostaria de saber mais sobre os kits corporativos da Brutona.");
});

test("Instagram accepts only public post and reel URLs", () => {
  assert.equal(publicInstagramUrl("https://instagram.com/p/TEST_123/?utm_source=fixture"), "https://www.instagram.com/p/TEST_123/");
  for (const invalid of ["javascript:alert(1)", "https://example.com/p/abc/", "https://www.instagram.com/accounts/login/", "https://www.instagram.com/", "not-a-url", "https://www.instagram.com:8080/p/abc/"]) assert.equal(publicInstagramUrl(invalid), null);
});
