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

export const officialProductPhotos: Record<string, Photo> = Object.fromEntries(
  ["bacon", "linguica-tradicional", "linguica-apimentada", "linguica-jilo", "linguica-seca", "linguica-pernil-defumada", "copalombo-maturado", "copalombo-medalhao", "manta-suina"]
    .map(id => [id, manifest[id as keyof typeof manifest] as Photo]),
);

export type BrandFilm = { id: string; src: string; poster: string; title: string; description: string; source: string };
export const brandFilms: BrandFilm[] = [
  { id: "historia", ...manifest.historia, description: "Cris Vieira fala sobre sua trajetória e os nomes Brutona e Lady Brutus. Vídeo original com legendas na imagem." },
  { id: "lancamento", ...manifest.lancamento, description: "Filme de lançamento das marcas de Cris Vieira: Brutona, produtos de charcutaria artesanal, e Lady Brutus, escola de charcutaria." },
  { id: "asmr", ...manifest.asmr, description: "Registro dos produtos embalados da Brutona e dos sons do manuseio das embalagens." },
];
