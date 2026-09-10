import { Plus } from "lucide-react";
import { brand } from "@/data/brand";
import { faqItems } from "@/data/faq";

export function FAQ() {
  return <section className="faq-section section-space" id="perguntas"><div className="shell faq-grid"><div><p className="eyebrow">{brand.faq.eyebrow}</p><h2>{brand.faq.title}</h2></div><div className="faq-list">{faqItems.map(item => <details key={item.id}><summary>{item.question}<Plus size={21} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div></div></section>;
}
