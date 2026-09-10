import { ArrowUpRight, MessageCircle } from "lucide-react";
import { brand } from "@/data/brand";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Reveal } from "@/components/Reveal";

export function HowToOrder() {
  return <section className="how-to-order section-space" id="como-pedir"><Reveal className="shell"><div className="section-heading"><div><p className="eyebrow">{brand.howToOrder.eyebrow}</p><h2>{brand.howToOrder.title}</h2></div><a className="button button-light" href={buildWhatsAppUrl(brand.messages.generic)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />{brand.howToOrder.cta}<ArrowUpRight size={18} /></a></div><ol className="order-steps">{brand.howToOrder.steps.map((text, index) => <li key={text}><span className="step-number">0{index + 1}</span><h3>{text}</h3></li>)}</ol></Reveal></section>;
}
