import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Info, MessageCircle } from "lucide-react";
import { brand } from "@/data/brand";
import { products, priceNotice } from "@/data/products";
import { Catalog } from "@/components/catalog/Catalog";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Catálogo de defumados, linguiças e kits",
  description: "Explore os produtos da Brutona: defumados, linguiças artesanais e kits produzidos em Brumal. Consulte preços e disponibilidade pelo WhatsApp.",
};

export default function CatalogPage() {
  return <main id="conteudo" className="catalog-page"><section className="catalog-intro"><div className="shell"><nav aria-label="Localização na página" className="breadcrumb"><Link href="/">Início</Link><span aria-hidden="true">/</span><span aria-current="page">Catálogo</span></nav><p className="eyebrow">{brand.catalog.eyebrow}</p><div className="catalog-title-row"><h1>{brand.catalog.title}<span>.</span></h1><p>{brand.catalog.description}</p></div><p className="price-notice"><Info size={16} />{priceNotice}</p></div></section><Catalog products={products} /><section className="catalog-contact"><div className="shell"><div><h2>ESCOLHEU SUAS BRUTAS?</h2><p>Confirme disponibilidade e valores com a gente.</p></div><a className="button button-red" href={buildWhatsAppUrl(brand.messages.generic)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />Pedir pelo WhatsApp<ArrowUpRight size={18} /></a></div></section></main>;
}
