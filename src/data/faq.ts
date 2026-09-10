export type FAQItem = { id: string; question: string; answer: string };

export const faqItems: FAQItem[] = [
  { id: "pedido", question: "Como faço um pedido?", answer: "Os pedidos são combinados diretamente pelo WhatsApp da Brutona." },
  { id: "disponibilidade", question: "Os produtos estão sempre disponíveis?", answer: "Como a produção é artesanal, a disponibilidade pode variar. Confirme pelo WhatsApp." },
  { id: "precos", question: "Os preços do site são atualizados?", answer: "Os valores são informativos e podem sofrer alterações. Consulte disponibilidade e valor final antes do pedido." },
  { id: "empresas", question: "Vocês trabalham com kits corporativos?", answer: "Sim. Entre em contato pelo WhatsApp para consultar opções e disponibilidade." },
  { id: "localizacao", question: "Onde fica a Brutona?", answer: "Em Brumal, distrito de Santa Bárbara, Minas Gerais." },
];
