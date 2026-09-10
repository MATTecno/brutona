import manifest from "./generated-images.json";
import type { Photo } from "./assets";

export function generatedPhoto(id: keyof typeof manifest, alt: string): Photo {
  return { ...manifest[id], alt, origin: "generated", provisional: true, source: `docs/generated-images.json#${id}` };
}

export function generatedProductPhoto(id: string, name: string): Photo | undefined {
  if (!Object.hasOwn(manifest, id)) return undefined;
  return generatedPhoto(id as keyof typeof manifest, `Imagem ilustrativa de ${name}; aparência e composição podem variar`);
}

export const editorialPhotos = {
  process: generatedPhoto("processo", "Imagem ilustrativa de mãos amarrando um embutido artesanal com barbante"),
  corporate: generatedPhoto("corporativo", "Imagem ilustrativa de presente artesanal com charcutaria; composição conceitual"),
};
