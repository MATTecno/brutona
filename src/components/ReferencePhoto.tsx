"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { ImageIcon } from "lucide-react";
import type { Photo } from "@/data/assets";

export function PhotoPlaceholder({ label = "Foto em breve" }: { label?: string }) {
  return <div className="photo-placeholder"><ImageIcon size={28} strokeWidth={1.2} aria-hidden="true" /><span>{label}</span></div>;
}

export function ReferencePhoto({ photo, className = "", priority = false, sizes = "(max-width: 639px) 100vw, 50vw" }: { photo: Photo; className?: string; priority?: boolean; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  const { crop } = photo;
  // Container-relative dimensions cover the frame without stretching the source crop.
  const cropStyle: CSSProperties = crop ? { width: `max(100cqw, ${crop.width / crop.height * 100}cqh)`, aspectRatio: `${crop.width} / ${crop.height}` } : {};
  return <div className={`reference-photo ${className}`}>
    {failed ? <PhotoPlaceholder /> : crop ? <div className="reference-crop" style={cropStyle}>
      <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} priority={priority}
        sizes={`${Math.ceil(photo.width / crop.width * 100)}vw`} onError={() => setFailed(true)}
        style={{ width: `${photo.width / crop.width * 100}%`, maxWidth: "none", height: "auto", left: `${-crop.x / crop.width * 100}%`, top: `${-crop.y / crop.height * 100}%` }} />
    </div> : <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} onError={() => setFailed(true)} style={{ objectFit: "cover" }} />}
  </div>;
}
