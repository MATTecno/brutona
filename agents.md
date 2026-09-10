# AGENTS.md - Brutona Site V1

## Atualizacao oficial de identidade e midia

Esta secao tem precedencia sobre as descricoes provisorias e o checklist historico abaixo. O manual e acervo recebidos em `brutona_codex_brief/references/BRUTONA`, `FOTOS CRISTINA PRODUTOS BRUTONA` e `Videos` (nome real `Vídeos`) foram incorporados. Auditoria, fontes exatas e correspondencias: `docs/official-brand.md`.

- Fontes oficiais: Unbounded para titulos, Unbounded Light para subtitulos e Figtree para corpo. Arquivos locais em `public/fonts`. Nao retornar a Lilita One/DM Sans.
- Paleta oficial: vermelho `#A0121B`, bege `#EBD9C8`, rosas `#ECC7D8`, `#E35EAA`, `#BC3E8F`, terracota `#CA5A40`, marrom `#3C2B27`, verdes `#3A6111` e `#C0CE75`. Tokens em `globals.css`, aplicacao em `official-brand.css`.
- Usar SVGs oficiais intactos. Nao reconstruir lettering, distorcer, rotacionar, recolorir ou remover elementos. Logo antigo circular nao e a identidade atual.
- `official.ts` e `official-assets.json` controlam fotos e videos, com origem rastreavel. Nove produtos usam fotos oficiais; oito preservam fallback ilustrativo por falta de correspondencia segura. A associacao editorial dos arquivos numericos continua sujeita a conferencia da marca.
- Cris tem retrato real do ensaio. Historia agora usa texto oficial da pagina 2 da apresentacao. Nao inventar datas, premios, formacao ou biografia completa.
- Chef Cris Vieira e a marca pessoal/fundadora; Brutona e a linha de produtos; Lady Brutus e a escola. Nao criar oferta de cursos neste site.
- Tres videos verticais otimizados, com poster, controles e reproducao apos clique. Nao carregar MP4 antes da interacao nem cortar os videos em fundo horizontal. Legendas incorporadas preservadas; transcricao/faixa textual revisada pendente.
- Fotos de pratos prontos nao confirmam composicao de kits. Mockups de embalagens nao sao fotografias de produtos reais. Instagram usa selecao identificada do ensaio enquanto nao houver URLs oficiais.
- Originais permanecem intactos. Regeneracao via `node scripts/prepare-official-assets.mjs`, com FFmpeg instalado.
- Endereco diverge: catalogo/cartao usam Rua da Paciencia, 207; brief/loja usam R. Cleves de Faria, 207. Aguardar confirmacao, preservando o endereco previamente validado. Precos continuam pendentes. Quarta-feira confirmada pelo responsavel: 09:00-20:00.
- O restante deste documento registra a base e o plano originais; itens de logo, fontes, paleta, retrato e historia nao devem voltar a ser tratados como arquivos ausentes.

## Fonte de verdade lida

Este arquivo foi escrito apos leitura integral de `brutona_codex_brief/BRUTONA_SITE_BRIEF.md` e analise visual das imagens em `brutona_codex_brief/references/`.

Observacao de caminho: o brief cita `./references/`, mas no workspace atual os arquivos estao dentro de `brutona_codex_brief/references/`.

## Objetivo do projeto

Construir a V1 do site institucional da Brutona - Charcutaria Artesanal, com home autoral e catalogo visual em `/catalogo`.

A V1 nao e e-commerce. O site deve apresentar marca, Cris Vieira, processo artesanal, produtos, kits corporativos, prova social, Instagram, FAQ, endereco e horarios, sempre conduzindo o visitante ao WhatsApp.

## Principios obrigatorios

- O site deve parecer Brutona antes de parecer "restaurante", "acougue", "delivery", "supermercado" ou template generico.
- A frase central e: `CARNE FRACA NAO ENTRA AQUI.`
- Cris Vieira deve ter destaque real como fundadora e Mestre Charcuteira.
- O conteudo de negocio deve ficar desacoplado da UI em arquivos de dados.
- Nenhum dado oficial pendente deve ser inventado.
- Precos atuais entram como dados temporarios e devem indicar possibilidade de alteracao.
- As referencias visuais orientam identidade, composicao e seed de produtos, mas nao sao necessariamente assets finais.
- Mobile deve ser tratado como experiencia principal, nao como ajuste posterior.
- A arquitetura deve permitir evolucao futura para CMS, API, banco, painel, pedidos e e-commerce sem reescrever a interface.

## Fora do escopo da V1

Nao implementar:

- banco de dados;
- autenticacao;
- cadastro ou login;
- painel administrativo;
- carrinho;
- checkout;
- pagamento online;
- frete;
- estoque;
- pedidos salvos;
- cursos;
- regras de envio para outras cidades;
- multilíngue.

## Leitura das referencias visuais

### `instagram-feed-reference.png`

Mostra o universo atual da marca no Instagram. Elementos importantes:

- logo circular vermelho com tipografia branca pesada;
- bio com Brumal, Santa Barbara - MG;
- tom de "sabor de roca", defumados, embutidos e linguicas artesanais;
- presenca de Cris Vieira no feed;
- imagens quentes com madeira, carnes, fogo, mesa e producao;
- posts com texto grande em branco sobre vermelho/rosa queimado;
- mistura de produto, bastidor e personalidade.

Aplicacao no site:

- usar Instagram como prova de vida e ponte para conteudo real;
- hero e secoes editoriais devem herdar calor, textura e impacto;
- nao criar estetica fria ou corporativa.

### `instagram-post-reference.png`

Mostra um post/reel com montagem de tabua, comida em close e producao real.

Elementos importantes:

- camera proxima das maos e alimentos;
- tabua, uvas, embutidos, queijo, folhas e mesa;
- legenda direta, com humor e desejo;
- reforco de artesanal, feito a mao e sem conservante artificial;
- comentarios reais funcionando como prova social.

Aplicacao no site:

- priorizar fotos e videos reais quando chegarem;
- usar copy curta e apetitoso-direta;
- estruturar Instagram com embed resiliente e fallback visual.

### `logo-reference.png`

Mostra logo temporario em circulo vermelho com lettering branco robusto.

Aplicacao no site:

- tratar como placeholder;
- preparar slots em `public/brand/logo.png`, `public/brand/logo-white.png` e `public/brand/logo-mark.png`;
- nao redesenhar nem assumir vetorizacao como logo oficial;
- componentes devem trocar logo sem refatoracao.

### `catalogo-01.png`

Mostra uma tela de cardapio/delivery com produtos, fotos pequenas e preco.

Dados extraidos:

- Kit Presente Caixa - R$ 119,90;
- Bacon - R$ 59,90/kg;
- Tabela Varejo - nao usar como produto;
- Linguica suina de alho poro - R$ 49,90/kg;
- Linguica de Pernil Defumada - R$ 59,90/kg;
- Orelhinha Defumada - R$ 39,90/kg;
- Pezinho Defumado - R$ 39,90/kg;
- Papada Defumada - R$ 39,90/kg.

Aplicacao no site:

- usar apenas como seed de catalogo;
- nao copiar UX de delivery;
- criar cards editoriais, com fotografia maior e composicao de marca.

### `catalogo-02.png`

Complementa produtos e precos.

Dados extraidos:

- Frango Defumado - R$ 39,90/kg;
- Kit Feijoada - R$ 49,90;
- Linguica Suina Tradicional - R$ 44,90/kg;
- Linguica suina apimentada - R$ 45,90/kg;
- Linguica suina com jilo - R$ 49,90/kg;
- Copalombo Defumado e maturado - R$ 18,90/100g;
- Manta Suina - R$ 79,90/kg;
- Copalombo medalhao defumado - R$ 79,90/kg;
- Costelinha defumada - R$ 79,90/kg.

Aplicacao no site:

- derivar categorias dos dados;
- preservar aviso de disponibilidade/preco sujeito a alteracao;
- fotos de produto podem usar placeholders quando a imagem real nao existir.

### `catalogo-03.png`

Confirma parte dos dados do catalogo e inclui:

- Linguica Seca - R$ 79,90/kg.

Aplicacao no site:

- completar seed inicial;
- evitar duplicacao de produtos repetidos entre prints;
- manter normalizacao de nomes e unidades.

### `story-kit-corporativo-01.png`

Referencia forte para kits corporativos.

Elementos importantes:

- bacon/produto no topo em foto grande;
- vermelho profundo dominando a metade inferior;
- headline grande, branca, arredondada;
- pequenos titulos em caixa alta com tracking amplo;
- copy de fim de ano com tom humano e levemente ironico;
- frase de marca no rodape.

Aplicacao no site:

- secao B2B deve ser visualmente potente;
- evitar linguagem corporativa fria;
- usar bloco vermelho/vinho com imagem real e CTA para WhatsApp.

### `story-kit-corporativo-02.png`

Mostra kit embalado, produtos com rotulos, alho, ervas e mesa.

Elementos importantes:

- embalagem artesanal com cordao;
- produtos alinhados em mesa;
- marrom escuro e creme;
- destaque para preco por colaborador no story, mas esse dado nao deve ser usado sem confirmacao atual;
- CTA explicito para WhatsApp;
- identificacao de Cris Vieira como Mestre Charcuteira.

Aplicacao no site:

- destacar kit como presente corporativo artesanal;
- WhatsApp corporativo deve usar mensagem propria;
- nao hardcodar valores corporativos sem confirmacao.

### `loja-horarios-endereco.png`

Confirma informacoes de loja e contato.

Dados:

- Brutona Charcutaria;
- endereco: R. Cleves De Faria, 207 - Brumal, Santa Barbara - MG, 35960-000, Brasil;
- quinta: 09:00 - 20:00;
- sexta: 09:00 - 20:00;
- sabado: 09:00 - 20:00;
- domingo: 09:00 - 12:00;
- segunda: fechada;
- terca: fechada;
- e-mail: contato@brutonacharcutaria.com.br.

Nota: o brief original deixava quarta-feira pendente; o responsavel confirmou posteriormente 09:00-20:00.

Aplicacao no site:

- criar secao "Onde encontrar" com endereco, mapa, WhatsApp, e-mail e horarios;
- mapa deve ser incorporado com altura responsiva;
- horario de quarta deve aparecer como 09:00-20:00, conforme confirmacao do responsavel.

## Direcao visual consolidada

### Paleta provisoria

Centralizar em tokens:

```css
:root {
  --brutona-red: #ad1321;
  --brutona-wine: #641f27;
  --brutona-dark: #281e1b;
  --brutona-brown: #4a3029;
  --brutona-cream: #eadbc8;
  --brutona-light: #f6efe6;
  --brutona-pink: #edc4cc;
}
```

Usar alternancia de secoes claras e escuras:

1. Hero escuro/fotografico.
2. Manifesto creme.
3. Produtos claro ou vinho.
4. Processo escuro.
5. Cris claro/editorial.
6. Empresas vinho.
7. Clientes creme.
8. Instagram claro.
9. Como pedir escuro.
10. Onde encontrar creme.
11. CTA final vermelho/vinho.

### Tipografia

- Display: fonte pesada, arredondada, expressiva, de alto impacto.
- Texto: sans-serif limpa, confortavel em mobile.
- Nao copiar fonte proprietaria a partir das imagens.
- Configurar fontes de forma centralizada para futura troca.

### Fotografia

Priorizar:

- close de carnes;
- linguicas;
- defumados;
- fogo, brasa, fumaca;
- madeira;
- ervas e temperos;
- embalagem artesanal;
- maos trabalhando;
- retratos da Cris;
- consumo e compartilhamento.

Enquanto assets reais nao chegarem:

- usar placeholders claramente identificados;
- nao usar fotos aleatorias como se fossem produtos da Brutona.

## Stack recomendada

Usar:

- Next.js com App Router;
- TypeScript;
- Tailwind CSS;
- Framer Motion para movimentos discretos;
- Next Image;
- Metadata API do Next.js.

Se o projeto existente, ao ser criado, tiver outra versao idiomatica do Next/Tailwind, adaptar sem contrariar o brief.

## Estrutura inicial recomendada

```text
src/
├── app/
│   ├── page.tsx
│   ├── catalogo/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Manifesto.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── Process.tsx
│   │   ├── CrisVieira.tsx
│   │   ├── BrandStory.tsx
│   │   ├── Corporate.tsx
│   │   ├── Testimonials.tsx
│   │   ├── InstagramFeed.tsx
│   │   ├── HowToOrder.tsx
│   │   ├── Location.tsx
│   │   ├── FAQ.tsx
│   │   └── FinalCTA.tsx
│   └── catalog/
│       ├── ProductCard.tsx
│       ├── ProductGrid.tsx
│       ├── ProductFilters.tsx
│       └── ProductModal.tsx
├── data/
│   ├── brand.ts
│   ├── products.ts
│   ├── testimonials.ts
│   ├── faq.ts
│   └── instagram.ts
├── lib/
│   ├── whatsapp.ts
│   └── utils.ts
└── types/
    └── index.ts
```

Assets:

```text
public/
├── brand/
│   ├── logo.png
│   ├── logo-white.png
│   ├── logo-mark.png
│   ├── hero-poster.jpg
│   └── hero-video.mp4
├── cris/
│   └── cris-vieira.jpg
├── products/
│   ├── bacon.jpg
│   ├── linguica-tradicional.jpg
│   └── ...
└── social/
    └── ...
```

## Ordem de implementacao

### 1. Fundacao do projeto

Objetivo: criar uma base tecnica limpa antes de desenhar secoes.

Tarefas:

- verificar se ja existe app Next.js no repositorio;
- se nao existir, inicializar Next.js com TypeScript e App Router;
- configurar Tailwind CSS;
- configurar aliases de importacao, se aplicavel;
- criar `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/catalogo/page.tsx` e `src/app/globals.css`;
- configurar metadata base de Home e Catalogo;
- definir tokens de cor, tipografia, radius, espacamentos e sombras;
- criar utilitario `cn` em `lib/utils.ts`, se o stack usar composicao de classes.

Verificacao:

- app sobe localmente;
- TypeScript compila;
- Tailwind aplica estilos;
- paginas `/` e `/catalogo` existem.

### 2. Dados, tipos e helpers

Objetivo: separar conteudo de negocio da UI desde o inicio.

Tarefas:

- criar tipos compartilhados em `types/index.ts` ou nos proprios arquivos de dados;
- criar `data/products.ts` com seed dos produtos das referencias;
- criar `data/brand.ts` para historia, Cris Vieira, contatos, endereco, horarios e textos provisórios;
- criar `data/faq.ts`;
- criar `data/testimonials.ts` com placeholders claramente marcados;
- criar `data/instagram.ts` com slots para URLs e fallback;
- criar `lib/whatsapp.ts`.

Produtos iniciais:

- Kit Presente Caixa - R$ 119,90 - unidade/kit;
- Bacon - R$ 59,90/kg;
- Linguica Suina de Alho Poro - R$ 49,90/kg;
- Linguica de Pernil Defumada - R$ 59,90/kg;
- Orelhinha Defumada - R$ 39,90/kg;
- Pezinho Defumado - R$ 39,90/kg;
- Papada Defumada - R$ 39,90/kg;
- Frango Defumado - R$ 39,90/kg;
- Kit Feijoada - R$ 49,90 - kit;
- Linguica Suina Tradicional - R$ 44,90/kg;
- Linguica Suina Apimentada - R$ 45,90/kg;
- Linguica Suina com Jilo - R$ 49,90/kg;
- Copalombo Defumado e Maturado - R$ 18,90/100g;
- Manta Suina - R$ 79,90/kg;
- Copalombo Medalhao Defumado - R$ 79,90/kg;
- Costelinha Defumada - R$ 79,90/kg;
- Linguica Seca - R$ 79,90/kg.

Nao cadastrar `Tabela Varejo` como produto.

Categorias iniciais:

- `linguicas`;
- `defumados`;
- `suinos`;
- `kits`;
- `especiais`.

Regras do WhatsApp:

- numero: `5531983820546`;
- mensagem generica: `Ola! Vim pelo site da Brutona e gostaria de fazer um pedido.`;
- mensagem de produto: `Ola! Tenho interesse no produto [nome].`;
- mensagem corporativa: `Ola! Vim pelo site e gostaria de saber mais sobre os kits corporativos da Brutona.`;
- sempre usar `encodeURIComponent`.

Verificacao:

- dados importam sem ciclo estranho;
- filtros podem ser derivados de produtos ativos;
- URLs de WhatsApp ficam codificadas corretamente.

### 3. Assets e placeholders

Objetivo: deixar a interface pronta para receber fotos reais sem retrabalho.

Tarefas:

- criar pastas `public/brand`, `public/products`, `public/cris` e `public/social`;
- copiar ou preparar placeholder do logo de referencia somente se necessario;
- criar placeholders visuais identificaveis para produtos sem imagem real;
- usar nomes de arquivo estaveis nos dados;
- adicionar TODOs no codigo/dados indicando assets pendentes.

Regras:

- nao inserir imagens genericas que parecam produto oficial;
- nao afirmar que o logo temporario e oficial;
- foto da Cris deve ser slot prioritario.

Verificacao:

- nenhum componente quebra quando imagem real ainda nao existe;
- alt text descreve o conteudo ou indica placeholder quando for o caso.

### 4. Layout global, Header e Footer

Objetivo: criar navegacao e estrutura persistente.

Header desktop:

- menu: A Brutona, Produtos, Nosso processo, Cris Vieira, Empresas, Onde encontrar;
- CTA: `PEDIR PELO WHATSAPP`;
- transparente no topo sobre o hero;
- sticky;
- muda para solido ou blur discreto ao rolar;
- contraste preservado.

Header mobile:

- drawer ou tela cheia;
- links grandes, sem quebra feia;
- CTA acessivel para polegar;
- fechar ao clicar em link, ESC e backdrop.

Footer:

- logo;
- Instagram;
- WhatsApp;
- endereco;
- e-mail;
- horarios;
- links internos;
- copyright;
- espaco para dados juridicos futuros.

Verificacao:

- navegacao por teclado;
- estados de foco visiveis;
- menu mobile funcional;
- CTA abre WhatsApp correto.

### 5. Home - primeira dobra e manifesto

Objetivo: estabelecer personalidade antes da venda.

Hero:

- fundo escuro/fotografico;
- preferir video curto de producao quando existir;
- fallback com poster/foto forte;
- `muted`, `playsInline`, poster otimizado;
- headline em duas linhas: `CARNE FRACA` / `NAO ENTRA AQUI.`;
- supporting copy: `Charcutaria artesanal feita com tempo, fogo, tecnica e personalidade.`;
- CTAs: catalogo e WhatsApp.

Manifesto:

- secao creme;
- copy curta: `Aqui nao tem pressa. Tem tempo, fogo, fumaca e tecnica.`;
- texto de apoio sobre producao propria em Brumal, ingredientes selecionados e sabor autoral.

Verificacao:

- primeira dobra impactante no desktop e mobile;
- headline nao quebra mal;
- CTAs acessiveis;
- video nao prejudica performance.

### 6. Home - produtos em destaque

Objetivo: vender desejo, nao tabela.

Tarefas:

- selecionar 4 a 6 produtos com `featured: true`;
- criar cards com imagem, nome, preco, unidade e micro CTA;
- usar layout editorial com ritmo, nao lista de delivery;
- CTA de secao para `/catalogo`.

Verificacao:

- cards leem bem em mobile;
- precos exibem aviso de alteracao;
- dados vêm de `data/products.ts`.

### 7. Home - processo Brutona

Objetivo: explicar autoridade artesanal.

Headline:

```text
TEMPO.
FOGO.
CURA.
```

Pilares:

- Producao artesanal;
- Ingredientes selecionados;
- Cura e maturacao;
- Defumacao;
- Producao propria.

Direcao:

- secao escura;
- imagens ou placeholders com textura;
- movimento suave;
- linguagem curta e sensorial.

Verificacao:

- secao nao parece institucional generica;
- texto nao fica longo;
- `prefers-reduced-motion` respeitado.

### 8. Home - Cris Vieira e historia da marca

Objetivo: dar o peso correto a Cris e deixar historia substituivel.

Cris Vieira:

- nome em destaque;
- titulo: `Fundadora · Mestre Charcuteira`;
- headline provisoria: `POR TRAS DA BRUTONA, TEM UMA BRUTA.`;
- foto grande;
- composicao editorial assimetrica;
- conteudo vindo de `data/brand.ts`.

Historia da marca:

- criar estrutura pronta:

```ts
brandStory: {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image?: string;
}
```

Regras:

- nao inventar datas, premios, origem ou biografia;
- usar placeholders claros ate chegada da historia oficial.

Verificacao:

- Cris nao fica escondida em rodape;
- texto oficial pode ser substituido editando apenas dados.

### 9. Home - empresas, clientes e Instagram

Objetivo: cobrir B2B, prova social e presenca ativa.

Empresas:

- secao vinho/vermelho inspirada nos stories;
- headline: `BRUTONA PRA SUA EMPRESA.`;
- falar de colaboradores, clientes, parceiros, confraternizacoes e acoes corporativas;
- CTA: `MONTAR MEU KIT`;
- usar mensagem corporativa de WhatsApp.

Clientes/depoimentos:

- dados em `data/testimonials.ts`;
- usar placeholders editoriais marcados;
- nao criar nomes ou depoimentos falsos.

Instagram:

- titulo: `@BRUTONACHARCUTARIA`;
- exibir 3 a 4 posts;
- dados em `data/instagram.ts`;
- embed publico com fallback;
- carregar script apenas quando a secao estiver proxima/visivel;
- CTA `Ver no Instagram`.

Verificacao:

- empresas nao parece pagina corporativa fria;
- falha de embed nao quebra renderizacao;
- depoimentos nao se passam por reais.

### 10. Home - como pedir, onde encontrar, FAQ e CTA final

Como pedir:

- titulo: `COMO COLOCAR UMA BRUTA NA MESA`;
- passos:
  1. Escolha seus produtos.
  2. Fale com a Brutona.
  3. Confirme disponibilidade e valores.
  4. Combine seu pedido pelo WhatsApp.
- CTA: `FAZER MEU PEDIDO`.

Onde encontrar:

- endereco completo;
- WhatsApp `(31) 98382-0546`;
- e-mail `contato@brutonacharcutaria.com.br`;
- mapa incorporado;
- horarios:
  - segunda: fechado;
  - terca: fechado;
  - quarta: 09:00-20:00;
  - quinta: 09:00-20:00;
  - sexta: 09:00-20:00;
  - sabado: 09:00-20:00;
  - domingo: 09:00-12:00.

FAQ:

- dados em `data/faq.ts`;
- perguntas iniciais sobre pedido, disponibilidade, precos, kits e localizacao.

CTA final:

- headline: `JA DEU FOME?`;
- copy curta;
- CTA grande para WhatsApp.

Verificacao:

- mapa responsivo;
- horario de quarta nao inventado;
- FAQ acessivel;
- CTA final forte sem excesso.

### 11. Catalogo `/catalogo`

Objetivo: criar catalogo simples, visual e filtravel.

Cabecalho:

- titulo: `AS BRUTAS`;
- subtexto: `Charcutaria artesanal produzida em Brumal.`;
- aviso: `Precos sujeitos a alteracao. Consulte disponibilidade.`

Filtros:

- obrigatorios por categoria;
- categorias derivadas de produtos ativos;
- `Todos` como opcao inicial;
- busca por nome apenas se simples e sem atrasar MVP.

Cards:

- imagem;
- nome;
- preco;
- unidade;
- categoria opcional;
- CTA/indicacao de interacao.

Regras:

- clicar abre modal;
- nao criar pagina individual de produto na V1;
- nao reproduzir UI de delivery dos prints.

Verificacao:

- filtro funcional;
- produtos ativos aparecem;
- layout confortavel em mobile;
- aviso de preco visivel.

### 12. Modal de produto

Objetivo: concentrar detalhe e conversao para WhatsApp.

Conteudo:

- imagem grande;
- nome;
- categoria;
- descricao;
- preco;
- unidade;
- aviso de disponibilidade/preco;
- CTA WhatsApp.

Comportamento:

- fecha com ESC;
- focus trap;
- bloqueia scroll do body;
- fecha ao clicar no backdrop;
- botao de fechar claro;
- animacao curta;
- em mobile pode virar sheet/fullscreen.

Mensagem obrigatoria:

```text
Ola! Tenho interesse no produto [nome].
```

Verificacao:

- acessivel por teclado;
- foco volta ao card/botao que abriu;
- scroll do body restaura;
- WhatsApp recebe nome correto do produto.

### 13. Movimento e microinteracoes

Objetivo: dar personalidade sem prejudicar leitura.

Implementar:

- reveals suaves;
- fade/translate discreto;
- mascara em headlines quando fizer sentido;
- parallax leve em imagens pontuais;
- zoom de 2-4% em hover de fotografia;
- feedback claro em botoes;
- header com transicao ao scroll;
- modal com transicao curta.

Nao implementar:

- scroll hijacking;
- cursor customizado;
- elementos pulando;
- animacoes infinitas sem funcao;
- splash screen;
- loading cinematografico;
- efeitos que prejudiquem performance.

Sempre respeitar `prefers-reduced-motion`.

### 14. SEO, acessibilidade e performance

SEO:

- metadata para Home e Catalogo;
- title e description;
- Open Graph;
- favicon preparado;
- canonical preparado;
- sitemap/robots se fizer sentido.

Termos naturais:

- Brutona Charcutaria;
- charcutaria artesanal;
- charcutaria em Santa Barbara MG;
- charcutaria em Brumal;
- defumados artesanais;
- linguica artesanal;
- Cris Vieira;
- Mestre Charcuteira.

Acessibilidade:

- HTML semantico;
- headings hierarquicos;
- contraste adequado;
- alt text;
- navegacao por teclado;
- focus styles;
- modal acessivel;
- `aria-label` quando necessario;
- area clicavel confortavel;
- nao depender apenas de cor.

Performance:

- Next Image;
- imagens otimizadas;
- lazy loading abaixo da dobra;
- poster otimizado no hero;
- video comprimido;
- evitar JS desnecessario;
- Instagram carregado sob demanda;
- Core Web Vitals bons.

### 15. Revisao visual responsiva

Objetivo: considerar a interface pronta apenas depois de revisao real.

Checar:

- mobile pequeno;
- mobile grande;
- tablet;
- desktop;
- desktop largo.

Pontos criticos:

- hero legivel;
- headline sem quebra ruim;
- CTA ao alcance;
- catalogo confortavel;
- modal usavel como sheet/fullscreen;
- embeds sem overflow;
- mapa com altura adequada;
- textos sem sobreposicao;
- imagens nao distorcidas;
- contraste em secoes escuras e claras.

### 16. Testes e verificacao final

Executar antes de considerar concluido:

- lint;
- typecheck;
- build;
- teste manual de navegacao;
- teste de filtros do catalogo;
- teste do modal por mouse e teclado;
- teste de URLs de WhatsApp;
- revisao mobile;
- revisao com `prefers-reduced-motion`;
- checagem de conteudo pendente/TODOs.

## Criterios de aceite operacionais

A V1 so deve ser considerada pronta quando:

- Home completa e responsiva;
- `/catalogo` implementado;
- filtros funcionais;
- produtos vindos de arquivo de dados;
- modal funcional e acessivel;
- CTA de produto gera mensagem correta no WhatsApp;
- CTA generico funciona;
- CTA corporativo funciona;
- Cris Vieira recebe destaque;
- processo artesanal esta apresentado;
- kits corporativos possuem secao propria;
- depoimentos têm estrutura pronta sem falsos testemunhos;
- Instagram tem embed com fallback;
- Onde encontrar possui mapa, endereco, contato e horarios;
- FAQ funciona;
- visual segue referencias da marca;
- desktop e mobile foram revisados;
- `prefers-reduced-motion` respeitado;
- imagens estao otimizadas;
- SEO basico implementado;
- nenhuma informacao oficial foi inventada;
- conteudo editavel nao esta espalhado nos componentes;
- arquitetura esta preparada para CMS/API futuramente.

## Conteudos pendentes antes do deploy oficial

Confirmar ou obter:

- logo oficial em alta e preferencialmente vetor/SVG;
- versoes do logo principal, branca e reduzida/simbolo;
- paleta oficial;
- tipografias oficiais;
- fotos originais em alta;
- videos/Reels para hero e secoes;
- historia oficial da Brutona;
- biografia oficial de Cris Vieira;
- lista final de produtos;
- precos atualizados;
- descricoes individuais;
- depoimentos reais autorizados;
- URLs dos posts do Instagram;
- dados juridicos adicionais;
- formas de pagamento, caso sejam mencionadas futuramente;
- politica real de retirada/entrega, se entrar depois.

## Roadmap preparado, mas nao implementado agora

V2:

- CMS/painel;
- CRUD de produtos;
- upload de imagens;
- gestao de precos;
- disponibilidade;
- depoimentos;
- posts/destaques editoriais.

V3:

- carrinho;
- pedidos;
- clientes;
- checkout;
- meios de pagamento;
- entrega/retirada;
- notificacoes.

Futuro adicional:

- cursos relacionados a charcutaria;
- conteudo educacional;
- experiencias/eventos;
- area B2B mais completa.

## Regra final de direcao

Se a interface comecar a parecer restaurante generico, e-commerce comum, acougue tradicional, template pronto ou landing page de startup, a direcao esta errada.

O site deve carregar o universo Brutona: carne, fogo, madeira, fumaca, tempo, tecnica, personalidade e Cris Vieira.
