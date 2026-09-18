import type { Metadata } from "next";
import "./globals.css";
import "./second-delivery.css";
import "./official-brand.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const siteUrl = "https://brutonacharcutaria.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Brutona | Charcutaria artesanal em Brumal", template: "%s | Brutona" },
  description: "Conheça a Brutona, charcutaria artesanal em Brumal, Santa Bárbara, MG. Defumados, linguiças e kits. Pedidos pelo WhatsApp.",
  icons: { icon: "/official/logo-mark.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header />{children}<Footer /></body></html>;
}
