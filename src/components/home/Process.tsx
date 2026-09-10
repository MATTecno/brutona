import { brand } from "@/data/brand";
import type { Photo } from "@/data/assets";
import { EditorialPhoto } from "./EditorialPhoto";
import { Reveal } from "@/components/Reveal";

export function Process({ photo }: { photo: Photo }) {
  return <section className="process-section section-space" id="nosso-processo"><Reveal className="shell">
    <div className="process-lead"><div><p className="eyebrow">{brand.process.eyebrow}</p><h2>{brand.process.title.map(line => <span key={line}>{line}</span>)}</h2></div><EditorialPhoto photo={photo} /></div>
    <ol className="process-pillars">{brand.process.pillars.map((pillar, index) => <li key={pillar.title}><span className="step-number">0{index + 1}</span><h3>{pillar.title}</h3><p>{pillar.text}</p></li>)}</ol>
  </Reveal></section>;
}
