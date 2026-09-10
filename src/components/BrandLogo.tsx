import Image from "next/image";
import { officialPhotos } from "@/data/official";

export function BrandLogo({ light = false, className = "", priority = false }: { light?: boolean; className?: string; priority?: boolean }) {
  const photo = light ? officialPhotos.logoLight : officialPhotos.logo;
  return <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} priority={priority} className={`official-logo ${className}`} />;
}
