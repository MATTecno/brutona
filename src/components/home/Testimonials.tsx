import { Quote } from "lucide-react";
import { brand } from "@/data/brand";
import { testimonials, type Testimonial } from "@/data/testimonials";

export function Testimonials({ items = testimonials }: { items?: Testimonial[] }) {
  const approved = items.filter(item => item.approved && item.name.trim() && item.text.trim());
  if (!approved.length) return null;
  return <section className="testimonials-section section-space" id="depoimentos"><div className="shell"><div className="section-heading"><div><p className="eyebrow">{brand.testimonials.eyebrow}</p><h2>{brand.testimonials.title}</h2></div></div><div className="testimonial-grid">{approved.map(item => <figure key={item.id}><Quote size={24} aria-hidden="true" /><blockquote>{item.text}</blockquote><figcaption><strong>{item.name}</strong>{item.role && <span>{item.role}</span>}</figcaption></figure>)}</div></div></section>;
}
