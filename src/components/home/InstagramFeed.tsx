import { Instagram, ArrowUpRight } from "lucide-react";
import { brand } from "@/data/brand";
import { instagramPosts, instagramSelection, publicInstagramUrl, type InstagramPost } from "@/data/instagram";
import { ReferencePhoto } from "@/components/ReferencePhoto";
import { InstagramEmbed } from "./InstagramEmbed";

export function InstagramFeed({ posts = instagramPosts }: { posts?: InstagramPost[] }) {
  const selected = posts.filter(post => publicInstagramUrl(post.url)).slice(0, 4);
  return <section className="instagram-section section-space" id="instagram"><div className="shell">
    <div className="section-heading"><div><p className="eyebrow">{brand.social.eyebrow}</p><h2>{brand.social.title}</h2></div><a className="text-link" href={brand.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18} />{brand.social.cta}<ArrowUpRight size={18} /></a></div>
    {selected.length ? <div className="instagram-grid">{selected.map(post => <InstagramEmbed post={post} key={post.id} />)}</div> : <><p className="instagram-selection-label">{brand.social.selectionLabel}</p><div className="instagram-grid selection-grid">{instagramSelection.map(photo => <a className="instagram-selection" key={photo.src} href={brand.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${brand.social.cta}: ${photo.alt}`}><ReferencePhoto photo={photo} /><span className="social-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span></a>)}</div></>}
  </div></section>;
}
