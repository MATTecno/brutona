export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  crop?: { x: number; y: number; width: number; height: number };
  origin: "reference" | "generated" | "official";
  source: string;
  provisional: boolean;
} & ({ usage?: "product"; note?: string } | { usage: "category" | "serving"; note: string });

// TODO: replace reference screenshots with official high-resolution assets.
// Crops are presentation-only; the original files remain unchanged.
export const assets = {
  bacon: {
    src: "/brand/story-kit-corporativo-01.png",
    alt: "Fatias de bacon da Brutona sobre uma tábua de madeira",
    width: 518,
    height: 902,
    crop: { x: 10, y: 112, width: 496, height: 305 },
    source: "brutona_codex_brief/references/story-kit-corporativo-01.png",
    origin: "reference",
    provisional: true,
  },
  board: {
    src: "/brand/instagram-post-reference.png",
    alt: "Montagem artesanal de uma tábua com charcutaria, queijos e uvas",
    width: 1855,
    height: 927,
    crop: { x: 428, y: 22, width: 493, height: 290 },
    source: "brutona_codex_brief/references/instagram-post-reference.png",
    origin: "reference",
    provisional: true,
  },
  logo: {
    src: "/brand/logo.png",
    alt: "Brutona Charcutaria Artesanal",
    width: 164,
    height: 256,
    crop: { x: 4, y: 92, width: 154, height: 154 },
    source: "brutona_codex_brief/references/logo-reference.png",
    origin: "reference",
    provisional: true,
  },
} satisfies Record<string, Photo>;

// Original screenshots retained for Instagram test fixtures and source auditing.
