import { brand } from "../data/brand";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsAppUrl(productName: string): string {
  return buildWhatsAppUrl(`Olá! Tenho interesse no produto ${productName}.`);
}
