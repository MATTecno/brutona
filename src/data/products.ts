import { type Photo } from "./assets";
import { officialProductPhotos } from "./official";

export type ProductCategory = "linguicas" | "defumados" | "suinos" | "kits" | "especiais";
export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription?: string;
  description?: string;
  price: number;
  priceUnit: "kg" | "100g" | "unidade" | "kit";
  image: string;
  photo?: Photo;
  featured: boolean;
  active: boolean;
};

export const categoryLabels: Record<ProductCategory, string> = {
  linguicas: "Linguiças", defumados: "Defumados", suinos: "Suínos", kits: "Kits", especiais: "Especiais",
};
export const categoryOrder: ProductCategory[] = ["linguicas", "defumados", "suinos", "kits", "especiais"];
export const priceNotice = "Preços sujeitos a alteração. Consulte disponibilidade.";

// Prices and units approved by the owner; categories remain editorial.
// Independent approved contracts live in tests/fixtures/approved-content.json.
const seed: Array<[string, string, ProductCategory, number, Product["priceUnit"], boolean]> = [
  ["kit-presente-caixa", "Kit Presente Caixa", "kits", 119.90, "kit", true],
  ["bacon", "Bacon", "defumados", 59.90, "kg", true],
  ["linguica-alho-poro", "Linguiça Suína de Alho Poró", "linguicas", 49.90, "kg", false],
  ["linguica-pernil-defumada", "Linguiça de Pernil Defumada", "linguicas", 59.90, "kg", false],
  ["orelhinha-defumada", "Orelhinha Defumada", "defumados", 39.90, "kg", false],
  ["pezinho-defumado", "Pezinho Defumado", "defumados", 39.90, "kg", false],
  ["papada-defumada", "Papada Defumada", "defumados", 39.90, "kg", false],
  ["frango-defumado", "Frango Defumado", "defumados", 39.90, "kg", false],
  ["kit-feijoada", "Kit Feijoada", "kits", 49.90, "kit", false],
  ["linguica-tradicional", "Linguiça Suína Tradicional", "linguicas", 44.90, "kg", true],
  ["linguica-apimentada", "Linguiça Suína Apimentada", "linguicas", 45.90, "kg", false],
  ["linguica-jilo", "Linguiça Suína com Jiló", "linguicas", 49.90, "kg", false],
  ["copalombo-maturado", "Copalombo Defumado e Maturado", "defumados", 18.90, "100g", true],
  ["manta-suina", "Manta Suína", "suinos", 79.90, "kg", false],
  ["copalombo-medalhao", "Copalombo Medalhão Defumado", "defumados", 79.90, "kg", false],
  ["costelinha-defumada", "Costelinha Defumada", "defumados", 79.90, "kg", false],
  ["linguica-seca", "Linguiça Seca", "linguicas", 79.90, "kg", false],
];

export const products: Product[] = seed.map(([slug, name, category, price, priceUnit, featured]) => {
  const photo = officialProductPhotos[slug];
  return { id: slug, slug, name, category, price, priceUnit, featured, active: true, image: photo?.src ?? "", photo };
});

const featuredOrder = ["bacon", "linguica-tradicional", "copalombo-maturado", "kit-presente-caixa"];
export const featuredProducts = products.filter(p => p.active && p.featured)
  .sort((a, b) => featuredOrder.indexOf(a.id) - featuredOrder.indexOf(b.id));

export function getCategories(items: Product[]) {
  return categoryOrder.filter(category => items.some(p => p.active && p.category === category));
}
