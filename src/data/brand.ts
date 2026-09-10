import type { Photo } from "./assets";

export type BrandStoryData = { eyebrow: string; title: string; paragraphs: string[]; approved: boolean; photo?: Photo; showFilms?: boolean; source?: string };

export const brand = {
  name: "Brutona",
  descriptor: "Charcutaria artesanal",
  locality: "Brumal, Minas Gerais",
  whatsapp: "5531983820546",
  phone: "(31) 98382-0546",
  email: "contato@brutonacharcutaria.com.br",
  instagram: "https://www.instagram.com/brutonacharcutaria/",
  instagramHandle: "@brutonacharcutaria",
  address: "R. Cleves De Faria, 207, Brumal, Santa Bárbara - MG, 35960-000, Brasil",
  street: "R. Cleves De Faria, 207",
  city: "Brumal · Santa Bárbara, MG",
  postalCode: "35960-000",
  hours: [
    { day: "Segunda", time: "Fechado" },
    { day: "Terça", time: "Fechado" },
    { day: "Quarta", time: "09:00 – 20:00" },
    { day: "Quinta", time: "09:00 – 20:00" },
    { day: "Sexta", time: "09:00 – 20:00" },
    { day: "Sábado", time: "09:00 – 20:00" },
    { day: "Domingo", time: "09:00 – 12:00" },
  ],
  messages: {
    generic: "Olá! Vim pelo site da Brutona e gostaria de fazer um pedido.",
    corporate: "Olá! Vim pelo site e gostaria de saber mais sobre os kits corporativos da Brutona.",
  },
  navigation: [
    { label: "A Brutona", href: "/#a-brutona" },
    { label: "Produtos", href: "/catalogo" },
    { label: "Nosso processo", href: "/#nosso-processo" },
    { label: "Cris Vieira", href: "/#cris-vieira" },
    { label: "Empresas", href: "/#empresas" },
    { label: "Onde encontrar", href: "/#onde-encontrar" },
  ],
  hero: {
    headline: ["CARNE FRACA", "NÃO ENTRA AQUI."],
    description: "Charcutaria artesanal feita com tempo, fogo, técnica e personalidade.",
    productsCta: "Conheça nossos produtos",
    orderCta: "Pedir pelo WhatsApp",
  },
  manifesto: {
    eyebrow: "O jeito Brutona",
    title: "Aqui não tem pressa.",
    accent: "Tem tempo, fogo, fumaça e técnica.",
    description: "Charcutaria artesanal feita em pequena escala, com ingredientes selecionados e o mínimo de aditivo necessário. De Brumal, para reconectar pessoas às boas memórias através do sabor.",
  },
  featured: { eyebrow: "Feitas por aqui", title: "AS BRUTAS DA CASA.", cta: "Conhecer todos os produtos" },
  process: {
    eyebrow: "O tempo também é ingrediente",
    title: ["TEMPO.", "FOGO.", "CURA."],
    pillars: [
      { title: "Produção artesanal", text: "Produção cuidadosa em escala compatível com o processo artesanal." },
      { title: "Ingredientes selecionados", text: "O produto começa antes do fogo." },
      { title: "Cura e maturação", text: "Tempo também é ingrediente." },
      { title: "Defumação", text: "Fumaça, temperatura, madeira e técnica." },
      { title: "Produção própria", text: "A Brutona produz sua própria charcutaria." },
    ],
  },
  story: {
    eyebrow: "Nossa história",
    title: "TUDO COMEÇOU COM A VONTADE DE FAZER BACON.",
    paragraphs: [
      "Nascida da vontade de fazer bacon, a Brutona existe para conduzir as pessoas a uma viagem no tempo através do sabor, reconectando memórias afetivas, história e cultura.",
      "Carne de verdade, feita com técnica, paciência e respeito ao tempo. Ingredientes selecionados, fornecedores locais e sustentáveis e o mínimo necessário de aditivos.",
    ],
    approved: true,
    showFilms: true,
    source: "brutona_codex_brief/references/BRUTONA/ID Visual Brutona - Imagens/Apresentação Identidade Visual atualizada - Brutona__Página_02.jpg",
  } as BrandStoryData,
  corporate: {
    eyebrow: "Presente com personalidade",
    title: "BRUTONA PRA SUA EMPRESA.",
    description: "Para presentear colaboradores, clientes e parceiros. Para reunir gente em confraternizações e ações corporativas. Charcutaria artesanal que merece um lugar à mesa.",
    cta: "Montar meu kit",
  },
  testimonials: { eyebrow: "À mesa com a Brutona", title: "QUEM PROVA, CONTA." },
  social: { eyebrow: "Um pouco do nosso dia a dia", title: "@BRUTONACHARCUTARIA", cta: "Ver no Instagram", selectionLabel: "Seleção do ensaio oficial da Brutona" },
  howToOrder: {
    eyebrow: "Da nossa produção para a sua mesa",
    title: "COMO COLOCAR UMA BRUTA NA MESA",
    steps: ["Escolha seus produtos.", "Fale com a Brutona.", "Confirme disponibilidade e valores.", "Combine seu pedido pelo WhatsApp."],
    cta: "Fazer meu pedido",
  },
  faq: { eyebrow: "Antes de pedir", title: "BOA PERGUNTA." },
  cris: {
    name: "Cris Vieira",
    role: "Fundadora · Mestre Charcuteira",
    title: "POR TRÁS DA BRUTONA, TEM UMA BRUTA.",
    paragraphs: ["Chef Cris Vieira é a fundadora por trás da Brutona, a marca de produtos de charcutaria artesanal. Sua atuação também dá origem à Lady Brutus, escola de charcutaria."],
  },
  location: { eyebrow: "De Brumal, com personalidade", title: "A BRUTONA É LOGO ALI." },
  finalCta: { title: "JÁ DEU FOME?", description: "Escolha suas brutas. O próximo passo é uma boa conversa.", label: "Fazer meu pedido" },
  catalog: { eyebrow: "Catálogo Brutona", title: "AS BRUTAS", description: "Charcutaria artesanal produzida em Brumal." },
};

export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.address)}`;
export const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(brand.address)}&output=embed`;
