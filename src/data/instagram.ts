import { type Photo } from "./assets";
import { officialPhotos } from "./official";

export type InstagramPost = { id: string; url: string; fallbackPhoto?: Photo; caption?: string };

// TODO: add exact URLs of public posts selected by the brand.
export const instagramPosts: InstagramPost[] = [];
export const instagramSelection = [officialPhotos.board, officialPhotos.table];

export function publicInstagramUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || !["www.instagram.com", "instagram.com"].includes(url.hostname) || url.port || url.username || url.password) return null;
    if (!/^\/(p|reel)\/[A-Za-z0-9_-]+\/?$/.test(url.pathname)) return null;
    return `https://www.instagram.com${url.pathname.replace(/\/$/, "")}/`;
  } catch { return null; }
}
