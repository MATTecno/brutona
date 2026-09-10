"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { brand, mapEmbedUrl, mapUrl } from "@/data/brand";

export function LocationMap() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: "200px" });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={container} className="location-map">
    <div className="map-surface"><div className="map-fallback"><MapPin size={30} /><span>{brand.city}</span></div>
      {visible && <iframe title="Localização da Brutona em Brumal" src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />}
    </div>
    <a href={mapUrl} target="_blank" rel="noopener noreferrer">Abrir rotas no Google Maps <ArrowUpRight size={18} /></a>
  </div>;
}
