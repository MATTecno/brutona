import { ArrowUpRight, MessageCircle } from "lucide-react";
import { brand } from "@/data/brand";
import type { Photo } from "@/data/assets";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { EditorialPhoto } from "./EditorialPhoto";
import { Reveal } from "@/components/Reveal";

export function Corporate({ photo }: { photo: Photo }) {
  return <section className="corporate-section section-space" id="empresas"><Reveal className="shell corporate-grid"><EditorialPhoto photo={photo} /><div className="corporate-copy"><p className="eyebrow">{brand.corporate.eyebrow}</p><h2>{brand.corporate.title}</h2><p>{brand.corporate.description}</p><a className="button button-light" href={buildWhatsAppUrl(brand.messages.corporate)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />{brand.corporate.cta}<ArrowUpRight size={20} /></a></div></Reveal></section>;
}
