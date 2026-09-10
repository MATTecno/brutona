import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import sharp from "sharp";

const root = "brutona_codex_brief/references";
const brand = `${root}/BRUTONA`;
const photos = `${root}/FOTOS CRISTINA PRODUTOS BRUTONA`;
const records = {};
await mkdir("public/official", { recursive: true });
await mkdir("public/fonts", { recursive: true });

// Keep source files untouched; web derivatives only resize and compress.
async function photo(id, source, alt, note) {
  const src = `/official/${id}.webp`;
  const result = await sharp(source).rotate().resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true }).webp({ quality: 86 }).toFile(`public${src}`);
  records[id] = { src, width: result.width, height: result.height, alt, source, origin: "official", provisional: false, ...(note ? { note } : {}) };
}
const productPhotos = [
  ["bacon", 22, "Bacon da Brutona em peça e fatias sobre uma tábua"],
  ["linguica-tradicional", 96, "Linguiça tradicional da Brutona, crua e preparada"],
  ["linguica-apimentada", 106, "Linguiça apimentada da Brutona, acompanhada de pimentas"],
  ["linguica-jilo", 116, "Linguiça com jiló da Brutona, crua e preparada, com jilós na composição"],
  ["linguica-seca", 21, "Linguiça suína seca da Brutona em embalagem com rótulo identificado"],
  ["linguica-pernil-defumada", 95, "Linguiça suína defumada da Brutona em embalagem com rótulo identificado"],
  ["copalombo-maturado", 15, "Copalombo da Brutona em peça e fatias finas"],
  ["copalombo-medalhao", 161, "Medalhões de copalombo da Brutona preparados sobre uma tábua"],
  ["manta-suina", 144, "Manta suína da Brutona preparada, fatiada e acompanhada de queijo", "Sugestão de preparo. Consulte as opções de recheio."],
];
for (const [id, number, alt, note] of productPhotos) await photo(id, `${photos}/PRODUTOS/${number}_brutona.produtos.jpg`, alt, note);
await photo("hero", `${photos}/PRODUTOS/1_brutona.produtos.jpg`, "Tábua de charcutaria da Brutona com carnes, queijos e uvas sobre mesa de madeira");
await photo("processo", `${photos}/PRODUTOS/69_brutona.produtos.jpg`, "Peças de charcutaria da Brutona envolvidas em rede sobre uma tábua");
await photo("corporativo", `${photos}/PRODUTOS/1_brutona.produtos.jpg`, "Tábua de charcutaria da Brutona para compartilhar", "Composição do ensaio oficial; não representa o conteúdo de um kit fechado.");
await photo("cris", `${photos}/CRISTINA/8_brutona.cristina.jpg`, "Chef Cris Vieira à mesa com os produtos da Brutona");
await photo("cris-retrato", `${photos}/CRISTINA/2_brutona.cristina.jpg`, "Retrato oficial de Chef Cris Vieira, fundadora da Brutona");
await photo("mesa", `${photos}/PRODUTOS/40_brutona.produtos.jpg`, "Feijoada, arroz e acompanhamentos na mesa do ensaio oficial da Brutona");

for (const [id, file] of [
  ["logo", "LOGOTIPO PRINCIPAL + ÍCONE/SVG/Logotipo principal + ícone vermelho.svg"],
  ["logo-light", "LOGOTIPO PRINCIPAL + ÍCONE/SVG/Logotipo principal + ícone bege.svg"],
  ["logo-mark", "ÍCONE/SVG/ÍCONE VERMELHO.svg"],
]) {
  const source = `${brand}/LOGOTIPO E VARIAÇÕES/${file}`;
  const src = `/official/${id}.svg`;
  await copyFile(source, `public${src}`);
  const { width, height } = await sharp(source).metadata();
  records[id] = { src, width, height, alt: "Brutona Charcutaria Artesanal", source, origin: "official", provisional: false };
}
for (const [id, file] of [["unbounded", "Unbounded/Unbounded-VariableFont_wght.ttf"], ["figtree", "Figtree/Figtree-VariableFont_wght.ttf"], ["figtree-italic", "Figtree/Figtree-Italic-VariableFont_wght.ttf"]]) {
  await copyFile(`${brand}/ELEMENTOS/TIPOGRAFIAS/${file}`, `public/fonts/${id}.ttf`);
}
await sharp(`${brand}/ELEMENTOS/PATTERN/XADREX ROSA/XADREX ROSA.png`).resize({ width: 800 }).webp({ quality: 85 }).toFile("public/official/pattern-pink.webp");

const films = [
  ["historia", "Lançamento Marca/CrisVieira_História.mov", 4, "Cris conta sua história"],
  ["lancamento", "Lançamento Marca/Crisvieira.MOV", 28, "Um novo capítulo"],
  ["asmr", "Brutona_Reels asmr.mov", 4, "Um pouco do nosso dia a dia"],
];
for (const [id, file, time, title] of films) {
  const source = `${root}/Vídeos/${file}`;
  const src = `/official/${id}.mp4`;
  const poster = `/official/${id}-poster.webp`;
  if (!process.argv.includes("--photos-only")) {
    execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", source, "-map", "0:v:0", "-map", "0:a:0?", "-vf", "scale=720:-2,setsar=1", "-c:v", "libx264", "-preset", "fast", "-crf", "25", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k", "-movflags", "+faststart", `public${src}`]);
    execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-ss", String(time), "-i", source, "-frames:v", "1", "-vf", "scale=720:-2", `public${poster}`]);
  }
  records[id] = { src, poster, width: 720, height: 1280, title, source, origin: "official", provisional: false };
  console.log(`Prepared ${id}`);
}
await writeFile("src/data/official-assets.json", JSON.stringify(records, null, 2) + "\n");
console.log("Official assets prepared; originals preserved.");
