"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X, ArrowUpRight, MessageCircle } from "lucide-react";
import { brand } from "@/data/brand";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { BrandLogo } from "@/components/BrandLogo";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <header className={`site-header ${pathname !== "/" || scrolled ? "solid" : "over-hero"}`}>
    <div className="header-inner shell">
      <Link className="brand-link" href="/" aria-label="Brutona, início"><BrandLogo light={pathname === "/" && !scrolled} priority /></Link>
      <nav className="desktop-nav" aria-label="Navegação principal">{brand.navigation.map(item => <Link href={item.href} key={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav>
      <a className="button button-red header-cta" href={buildWhatsAppUrl(brand.messages.generic)} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Pedir pelo WhatsApp <ArrowUpRight size={17} /></a>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild><button className="icon-button mobile-menu-trigger" aria-label="Abrir menu" title="Abrir menu"><Menu /></button></Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="mobile-drawer" aria-describedby={undefined}>
            <div className="drawer-top"><Dialog.Title>BRUTONA</Dialog.Title><Dialog.Close asChild><button className="icon-button" aria-label="Fechar menu" title="Fechar menu"><X /></button></Dialog.Close></div>
            <nav aria-label="Navegação mobile">{brand.navigation.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span className="nav-number">0{index + 1}</span>{item.label}<ArrowUpRight size={22} /></Link>)}</nav>
            <a className="button button-red" href={buildWhatsAppUrl(brand.messages.generic)} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}><MessageCircle size={18} /> Pedir pelo WhatsApp</a>
            <p className="drawer-locality">{brand.locality}</p>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  </header>;
}
