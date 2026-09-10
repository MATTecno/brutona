import type { Photo } from "@/data/assets";
import { ReferencePhoto } from "@/components/ReferencePhoto";

export function EditorialPhoto({ photo, className = "" }: { photo: Photo; className?: string }) {
  return <figure className={`editorial-photo ${className}`}><div className="editorial-frame"><ReferencePhoto photo={photo} /></div>{photo.note && <figcaption>{photo.note}</figcaption>}</figure>;
}
