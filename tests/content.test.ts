import { test } from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync, existsSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { BrandStory } from "../src/components/home/BrandStory";
import { Testimonials } from "../src/components/home/Testimonials";
import { brand } from "../src/data/brand";
import { testimonials } from "../src/data/testimonials";
import { faqItems } from "../src/data/faq";
import { instagramPosts, publicInstagramUrl } from "../src/data/instagram";
import { products } from "../src/data/products";
import approved from "./fixtures/approved-content.json";
import logoHashes from "./fixtures/official-logos.json";
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

test("catalog uses nine product photos, three captioned context photos and five neutral placeholders", () => {
  const photos: Record<string, [string, number]> = {
    bacon: ["bacon", 22], "linguica-tradicional": ["linguica-tradicional", 96],
    "linguica-apimentada": ["linguica-apimentada", 106], "linguica-jilo": ["linguica-jilo", 116],
    "linguica-seca": ["linguica-seca", 21], "linguica-pernil-defumada": ["linguica-pernil-defumada", 95],
    "copalombo-maturado": ["copalombo-maturado", 15], "copalombo-medalhao": ["copalombo-medalhao", 161],
    "manta-suina": ["manta-suina", 144], "kit-presente-caixa": ["hero", 1],
    "linguica-alho-poro": ["linguica-tradicional", 96], "kit-feijoada": ["mesa", 40],
  };
  const contexts: Record<string, [string, string]> = {
    "kit-presente-caixa": ["serving", "Sugestão de apresentação. Consulte a composição do kit."],
    "linguica-alho-poro": ["category", "Foto da linha de linguiças. Sabor não representado."],
    "kit-feijoada": ["serving", "Sugestão de preparo. Não representa o conteúdo do kit."],
  };
  assert.equal(existsSync("public/generated"), false);
  assert.equal(products.filter(p => p.photo).length, 12);
  assert.deepEqual(products.filter(p => !p.photo).map(p => p.id), ["orelhinha-defumada", "pezinho-defumado", "papada-defumada", "frango-defumado", "costelinha-defumada"]);
  for (const product of products) {
    if (!product.photo) { assert.equal(product.image, ""); continue; }
    const [file, number] = photos[product.id];
    assert.equal(product.photo.src, `/official/${file}.webp`, product.id);
    assert.ok(product.photo.source.endsWith(`/PRODUTOS/${number}_brutona.produtos.jpg`), product.id);
    assert.equal(product.image, product.photo.src);
    assert.equal(product.photo.origin, "official");
    assert.ok(product.photo.alt.trim());
    if (contexts[product.id]) {
      assert.deepEqual([product.photo.usage, product.photo.note], contexts[product.id]);
      assert.match(product.photo.alt, /não representa|não o conteúdo/);
    } else assert.equal(product.photo.usage ?? "product", "product");
  }
});

test("official media preserve provenance, dimensions and original logo files", async () => {
  assert.equal(Object.keys(officialProductPhotos).length, 12);
  for (const entry of Object.values(officialManifest)) {
    assert.ok(existsSync(`public${entry.src}`));
    assert.ok(entry.source.startsWith("brutona_codex_brief/references/"));
    assert.equal(entry.origin, "official");
    assert.equal(entry.provisional, false);
    if ("poster" in entry) {
      assert.ok(statSync(`public${entry.src}`).size > 0);
      assert.equal(readFileSync(`public${entry.src}`).toString("ascii", 4, 8), "ftyp");
      const poster = await sharp(`public${entry.poster}`).metadata();
      assert.equal(poster.width, entry.width);
      assert.equal(poster.height, entry.height);
      continue;
    }
    const dimensions = await sharp(`public${entry.src}`).metadata();
    assert.equal(dimensions.width, entry.width);
    assert.equal(dimensions.height, entry.height);
  }
  for (const [src, hash] of Object.entries(logoHashes)) assert.equal(createHash("sha256").update(readFileSync(`public${src}`)).digest("hex"), hash, src);
  for (const name of ["unbounded", "figtree", "figtree-italic"]) assert.ok(statSync(`public/fonts/${name}.ttf`).size > 0);
  assert.ok((await sharp("public/official/pattern-pink.webp").metadata()).width);
  assert.equal(officialPhotos.cris.origin, "official");
  assert.equal(brandFilms.length, 3);
  assert.ok(brand.story.approved && brand.story.source?.startsWith("brutona_codex_brief/references/"));
  assert.ok(brand.cris.paragraphs.join(" ").includes("Lady Brutus"));
});

test("FAQ answers match the versioned contract and corporate CTA uses its dedicated message", () => {
  assert.equal(faqItems.length, 5);
  assert.deepEqual(faqItems, approved.faq);
  assert.equal(new URL(buildWhatsAppUrl(brand.messages.corporate)).searchParams.get("text"), "Olá! Vim pelo site e gostaria de saber mais sobre os kits corporativos da Brutona.");
});

test("Instagram accepts only public post and reel URLs", () => {
  assert.equal(publicInstagramUrl("https://instagram.com/p/TEST_123/?utm_source=fixture"), "https://www.instagram.com/p/TEST_123/");
  for (const invalid of ["javascript:alert(1)", "https://example.com/p/abc/", "https://www.instagram.com/accounts/login/", "https://www.instagram.com/", "not-a-url", "https://www.instagram.com:8080/p/abc/"]) assert.equal(publicInstagramUrl(invalid), null);
});
