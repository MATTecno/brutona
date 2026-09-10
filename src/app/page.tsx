import Link from "next/link";
import { ArrowUpRight, ArrowDown, MapPin, MessageCircle, Mail } from "lucide-react";
import { brand } from "@/data/brand";
import { featuredProducts, priceNotice } from "@/data/products";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ReferencePhoto } from "@/components/ReferencePhoto";
import { BrandLogo } from "@/components/BrandLogo";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { LocationMap } from "@/components/home/LocationMap";
import { Process } from "@/components/home/Process";
import { BrandStory } from "@/components/home/BrandStory";
import { Corporate } from "@/components/home/Corporate";
import { Testimonials } from "@/components/home/Testimonials";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { HowToOrder } from "@/components/home/HowToOrder";
import { FAQ } from "@/components/home/FAQ";
import { officialPhotos } from "@/data/official";

export default function Home() {
  const whatsappUrl = buildWhatsAppUrl(brand.messages.generic);
  return <main id="conteudo">
    <section className="hero" aria-labelledby="hero-title">
      <ReferencePhoto photo={officialPhotos.hero} className="hero-photo" priority sizes="100vw" />
      <div className="hero-shade" />
      <div className="shell hero-inner"><div className="hero-content">
        <div className="hero-brand"><BrandLogo light priority /></div>
        <h1 id="hero-title">{brand.hero.headline.map(line => <span key={line}>{line}</span>)}</h1>
        <p className="hero-description">{brand.hero.description}</p>
        <div className="hero-actions"><Link href="/catalogo" className="button button-red">{brand.hero.productsCta}<ArrowUpRight size={20} /></Link><a href={whatsappUrl} className="button button-outline" target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />{brand.hero.orderCta}</a></div>
      </div><div className="hero-bottom"><span><MapPin size={15} />{brand.locality}</span><a href="#a-brutona" aria-label="Conhecer a Brutona" title="Conhecer a Brutona"><ArrowDown size={21} /></a><span>Tempo. Fogo. Personalidade.</span></div></div>
    </section>

    <section className="manifesto section-space" id="a-brutona"><div className="shell manifesto-grid">
      <div><p className="eyebrow section-label"><span className="small-rule" />{brand.manifesto.eyebrow}</p><h2>{brand.manifesto.title}<br /><span>{brand.manifesto.accent}</span></h2></div>
      <div className="manifesto-side"><p>{brand.manifesto.description}</p><span className="origin-label"><MapPin size={16} /> Feita em Brumal, Minas Gerais</span></div>
    </div></section>

    <section className="featured section-space" id="produtos"><div className="shell"><div className="section-heading"><div><p className="eyebrow">{brand.featured.eyebrow}</p><h2>{brand.featured.title}</h2></div><Link className="text-link" href="/catalogo">{brand.featured.cta}<ArrowUpRight size={20} /></Link></div><ProductGrid products={featuredProducts} featured /><p className="price-notice featured-notice">{priceNotice}</p></div></section>

    <Process photo={officialPhotos.process} />
    <section className="cris-section section-space" id="cris-vieira"><div className="shell cris-grid"><div className="cris-image"><ReferencePhoto photo={officialPhotos.cris} /></div><div className="cris-copy"><p className="eyebrow">{brand.cris.role}</p><h2>{brand.cris.title}</h2><div className="cris-name"><span className="small-rule" /><p>{brand.cris.name}</p></div>{brand.cris.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<div className="cris-origin"><BrandLogo /><span>Feita com tempo.<br />Feita com personalidade.</span></div></div></div></section>
    <BrandStory />
    <Corporate photo={officialPhotos.corporate} />
    <Testimonials />
    <InstagramFeed />
    <HowToOrder />

    <section className="location-section section-space" id="onde-encontrar"><div className="shell"><div className="section-heading"><div><p className="eyebrow">{brand.location.eyebrow}</p><h2>{brand.location.title}</h2></div><MapPin size={36} strokeWidth={1.3} aria-hidden="true" /></div><div className="location-grid"><div className="location-details"><h3>Venha encontrar a gente.</h3><address>{brand.street}<br />{brand.city}<br />CEP {brand.postalCode}</address><div className="contact-links"><a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} />{brand.phone}<ArrowUpRight size={16} /></a><a href={`mailto:${brand.email}`}><Mail size={18} /><span>{brand.email}</span></a></div><div className="opening-hours"><h3>Horários da loja</h3><dl>{brand.hours.map(({ day, time }) => <div key={day}><dt>{day}</dt><dd className={time === "A confirmar" ? "pending-time" : ""}>{time}</dd></div>)}</dl></div></div><LocationMap /></div></div></section>

    <FAQ />
    <section className="final-cta"><div className="shell final-inner"><div><p className="eyebrow">Carne fraca não entra aqui.</p><h2>{brand.finalCta.title}</h2><p>{brand.finalCta.description}</p></div><a className="button button-light" href={whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} />{brand.finalCta.label}<ArrowUpRight size={22} /></a></div></section>
  </main>;
}
