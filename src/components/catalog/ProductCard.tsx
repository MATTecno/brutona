"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, X, MessageCircle } from "lucide-react";
import { type Product, categoryLabels, priceNotice } from "@/data/products";
import { ReferencePhoto, PhotoPlaceholder } from "@/components/ReferencePhoto";
import { formatPrice } from "@/lib/format";
import { buildProductWhatsAppUrl } from "@/lib/whatsapp";
import Image from "next/image";
import { useState } from "react";

function ProductPhoto({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);
  if (product.photo) return <ReferencePhoto photo={product.photo} />;
  if (product.image && !failed) return <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, 50vw" onError={() => setFailed(true)} style={{ objectFit: "cover" }} />;
  return <PhotoPlaceholder />;
}

export function ProductCard({ product }: { product: Product }) {
  return <Dialog.Root>
    <article className="product-card" data-product-id={product.id}>
      <Dialog.Trigger className="product-trigger" aria-label={`Ver detalhes de ${product.name}`} aria-describedby={product.photo?.note ? `photo-note-${product.id}` : undefined}>
        <div className={`product-photo category-${product.category}`}><ProductPhoto product={product} /><span className="product-category">{categoryLabels[product.category]}</span><span className="product-open" aria-hidden="true"><ArrowUpRight size={22} /></span></div>
        <div className="product-info"><h3>{product.name}</h3><p className="product-price">{formatPrice(product.price)}<span> / {product.priceUnit}</span></p></div>
      </Dialog.Trigger>
      {product.photo?.note && <p id={`photo-note-${product.id}`} className="product-photo-note">{product.photo.note}</p>}
    </article>
    <Dialog.Portal>
      <Dialog.Overlay className="dialog-overlay" />
      <Dialog.Content className="product-modal" aria-describedby={`notice-${product.id}${product.photo?.note ? ` modal-photo-note-${product.id}` : ""}`}>
        <Dialog.Close asChild><button className="icon-button modal-close" aria-label="Fechar detalhes" title="Fechar detalhes"><X size={22} /></button></Dialog.Close>
        <div className={`modal-photo category-${product.category}`}><ProductPhoto product={product} /></div>
        <div className="modal-body"><p className="eyebrow">{categoryLabels[product.category]}</p><Dialog.Title>{product.name}</Dialog.Title>
          {product.description && <p className="product-description">{product.description}</p>}
          {product.photo?.note && <p id={`modal-photo-note-${product.id}`} className="product-description">{product.photo.note}</p>}
          <p className="modal-price">{formatPrice(product.price)}<span> / {product.priceUnit}</span></p>
          <Dialog.Description id={`notice-${product.id}`} className="price-notice">{priceNotice}</Dialog.Description>
          <a className="button button-red" href={buildProductWhatsAppUrl(product.name)} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} /> Pedir pelo WhatsApp <ArrowUpRight size={18} /></a>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}
