import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import manifest from "../src/data/official-assets.json";
import approved from "../tests/fixtures/approved-content.json";
import { brand } from "../src/data/brand";

const briefPath = "brutona_codex_brief/BRUTONA_SITE_BRIEF.md";
const sources = new Set([briefPath, brand.story.source!, ...Object.values(manifest).map(entry => entry.source)]);
const missing = [...sources].filter(source => !existsSync(source));
if (missing.length) {
  console.error(`Auditoria indisponível: faltam ${missing.length} arquivos do acervo local.\n${missing.join("\n")}\nRestaure os originais nos caminhos documentados. O acervo não é necessário para testes, build ou CI.`);
  process.exit(1);
}

for (const entry of Object.values(manifest)) {
  assert.ok(existsSync(`public${entry.src}`), entry.src);
  if (entry.src.endsWith(".svg")) assert.deepEqual(readFileSync(`public${entry.src}`), readFileSync(entry.source), entry.src);
}
const brief = readFileSync(briefPath, "utf8");
for (const item of approved.faq) {
  assert.ok(brief.includes(item.question), item.question);
  assert.ok(brief.includes(item.answer), item.id);
}
console.log(`Auditoria concluída: ${sources.size} originais disponíveis, logos idênticos e FAQ conferido com o brief. Preços e endereço seguem a aprovação posterior do responsável, não sobrescrevem a história do acervo.`);
