"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ReferencePhoto, PhotoPlaceholder } from "@/components/ReferencePhoto";
import { type InstagramPost, publicInstagramUrl } from "@/data/instagram";
import { brand } from "@/data/brand";
import { loadInstagram } from "@/lib/instagram";

export function InstagramEmbed({ post }: { post: InstagramPost }) {
  const container = useRef<HTMLElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [fits, setFits] = useState(false);
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const url = publicInstagramUrl(post.url);
  const ready = fits && loadedUrl === url && url !== null;

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const resize = new ResizeObserver(entries => {
      const canFit = entries[0].contentRect.width >= 326;
      setFits(canFit);
      if (!canFit) setLoadedUrl(null);
    });
    const intersection = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setNear(true); intersection.disconnect(); }
    }, { rootMargin: "200px" });
    resize.observe(element);
    intersection.observe(element);
    return () => { resize.disconnect(); intersection.disconnect(); };
  }, []);

  useEffect(() => {
    const element = host.current;
    if (!near || !fits || !url || !element) return;
    let cancelled = false;
    let iframe: HTMLIFrameElement | null = null;
    const onLoad = () => { if (!cancelled) setLoadedUrl(url); };
    const observer = new MutationObserver(() => {
      const found = element.querySelector("iframe");
      if (!found || found === iframe) return;
      iframe?.removeEventListener("load", onLoad);
      iframe = found;
      if (!iframe.title) iframe.title = "Publicação do Instagram da Brutona";
      iframe.addEventListener("load", onLoad, { once: true });
    });
    // The SDK owns this subtree; React does not reconcile its injected iframe.
    observer.observe(element, { childList: true, subtree: true });
    const quote = document.createElement("blockquote");
    quote.className = "instagram-media";
    quote.dataset.instgrmPermalink = url;
    quote.dataset.instgrmVersion = "14";
    element.replaceChildren(quote);
    void loadInstagram().then(success => {
      if (success && !cancelled) window.instgrm?.Embeds.process();
    }).catch(() => { /* The local image and link remain available. */ });
    return () => { cancelled = true; observer.disconnect(); iframe?.removeEventListener("load", onLoad); element.replaceChildren(); };
  }, [near, fits, url]);

  const fallback = post.fallbackPhoto?.origin === "generated" ? undefined : post.fallbackPhoto;
  return <article ref={container} className="instagram-post">
    <div className={`instagram-embed-slot ${ready ? "embed-ready" : ""}`}>
      <div className="instagram-fallback" hidden={ready}>{fallback ? <ReferencePhoto photo={fallback} /> : <PhotoPlaceholder />}</div>
      <div ref={host} className="instagram-host" aria-hidden={!ready} inert={!ready} />
    </div>
    {post.caption && <p className="instagram-caption">{post.caption}</p>}
    <a className="instagram-link" href={url ?? brand.instagram} target="_blank" rel="noopener noreferrer">{brand.social.cta}<ArrowUpRight size={18} /></a>
  </article>;
}
