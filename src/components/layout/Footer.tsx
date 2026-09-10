import Link from "next/link";
import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";
import { brand } from "@/data/brand";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  return <footer className="site-footer"><div className="shell">
    <div className="footer-main">
      <div><Link className="footer-wordmark" href="/" aria-label="Brutona, início"><BrandLogo light /></Link><p>{brand.descriptor}<br />{brand.city}</p></div>
      <nav aria-label="Navegação do rodapé">{brand.navigation.map(item => <Link key={item.href} href={item.href}>{item.label}<ArrowUpRight size={15} /></Link>)}</nav>
      <div className="footer-contact"><a href={brand.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} />{brand.instagramHandle}</a><a href={buildWhatsAppUrl(brand.messages.generic)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />{brand.phone}</a><a href={`mailto:${brand.email}`}>{brand.email}</a><p>{brand.street}<br />{brand.city} · {brand.postalCode}</p></div>
      <div className="footer-hours"><p className="eyebrow">Horários</p>{brand.hours.map(({ day, time }) => <div key={day}><span>{day}</span><span>{time}</span></div>)}</div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Brutona Charcutaria Artesanal.</span><span>Carne fraca não entra aqui.</span></div>
  </div></footer>;
}
