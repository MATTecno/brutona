import manifest from "./official-assets.json";
import type { Photo } from "./assets";

export const officialPhotos = {
  hero: manifest.hero as Photo,
  process: manifest.processo as Photo,
  corporate: manifest.corporativo as Photo,
  cris: manifest.cris as Photo,
  portrait: manifest["cris-retrato"] as Photo,
  board: manifest.hero as Photo,
  table: manifest.mesa as Photo,
  logo: manifest.logo as Photo,
  logoLight: manifest["logo-light"] as Photo,
};

export const officialProductPhotos: Partial<Record<string, Photo>> = {
  ...Object.fromEntries(
    ["bacon", "linguica-tradicional", "linguica-apimentada", "linguica-jilo", "linguica-seca", "linguica-pernil-defumada", "copalombo-maturado", "copalombo-medalhao", "manta-suina"]
      .map(id => [id, manifest[id as keyof typeof manifest] as Photo]),
  ),
  "kit-presente-caixa": {
    ...manifest.hero, origin: "official", usage: "serving",
    alt: "Tábua de charcutaria do ensaio da Brutona como sugestão de apresentação, não o conteúdo do Kit Presente Caixa",
    note: "Sugestão de apresentação. Consulte a composição do kit.",
  },
  "linguica-alho-poro": {
    ...manifest["linguica-tradicional"], origin: "official", usage: "category",
    alt: "Foto da linha de linguiças da Brutona; não representa o sabor alho-poró",
    note: "Foto da linha de linguiças. Sabor não representado.",
  },
  "kit-feijoada": {
    ...manifest.mesa, origin: "official", usage: "serving",
    alt: "Feijoada pronta com acompanhamentos como sugestão de preparo, não o conteúdo do Kit Feijoada",
    note: "Sugestão de preparo. Não representa o conteúdo do kit.",
  },
};

export type BrandFilm = { id: string; src: string; poster: string; title: string; description: string; source: string };
export const brandFilms: BrandFilm[] = [
  { id: "historia", ...manifest.historia, description: "Cris Vieira fala sobre sua trajetória e os nomes Brutona e Lady Brutus. Vídeo original com legendas na imagem." },
  { id: "lancamento", ...manifest.lancamento, description: "Filme de lançamento das marcas de Cris Vieira: Brutona, produtos de charcutaria artesanal, e Lady Brutus, escola de charcutaria." },
  { id: "asmr", ...manifest.asmr, description: "Registro dos produtos embalados da Brutona e dos sons do manuseio das embalagens." },
];
