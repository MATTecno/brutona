# Brutona: identidade e acervo oficiais

Site institucional local com Home, catálogo de 17 produtos, filtros, detalhes em modal e pedidos pelo WhatsApp. Implementação orientada pelo `agents.md` e pelo brief em `brutona_codex_brief/`.

A atualização oficial usa o manual e os arquivos em `brutona_codex_brief/references/BRUTONA`, as fotos de `FOTOS CRISTINA PRODUTOS BRUTONA` e os três arquivos de `Vídeos`. Essas fontes substituem as aproximações visuais das entregas anteriores. Veja a auditoria e o mapa de correspondências em [docs/official-brand.md](docs/official-brand.md).

## Executar

Requer Node.js 22 e npm. As versões resolvidas estão no `package-lock.json`.

```bash
npm ci
npm run dev -- --port 3000
```

Abra `http://localhost:3000`. Se a porta estiver ocupada, use outra, por exemplo `--port 3001`.

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Para avaliar o build de produção, após `npm run build`:

```bash
npm run start -- --port 3001
```

## Testes no navegador

Com o servidor local em execução:

```bash
npx playwright install chromium
npm run test:e2e
```

Para outra porta, use `TEST_BASE_URL=http://localhost:3001 npm run test:e2e`.

Os testes cobrem navegação, filtros, mensagens do WhatsApp sem envio, modal e FAQ por teclado, menu mobile, imagens ausentes, mapa bloqueado e movimento reduzido. Também verificam fontes, integridade dos logos oficiais, procedência das fotos, reprodução dos três vídeos, abas por teclado e falha de mídia. Geram screenshots de Home, seções, catálogo e modal em 360, 390, 768, 1440 e 1920 px e executam verificações axe de acessibilidade. Os resultados ficam em `test-results/` (ignorado pelo Git).

História e depoimentos são testados vazios e preenchidos com fixtures exclusivas de teste. O Instagram é testado sem URLs, carregando, com script bloqueado, embed simulado e largura insuficiente. A página de fixture é interceptada pelo Playwright: não há rota de teste na aplicação nem publicações fictícias nos dados do site. Os embeds reais deverão ser verificados novamente quando suas URLs forem fornecidas.

## Editar conteúdo

- `src/data/brand.ts`: contatos, horários, navegação, processo, história, empresas e passos de pedido. Quarta-feira: 09:00–20:00, confirmado pelo responsável.
- `src/data/products.ts`: produtos, preços, unidades, categorias e destaques. Preços são provisórios. Produtos inativos não aparecem; filtros são derivados dos ativos.
- `src/data/assets.ts`: origem, enquadramento e situação provisória das fotos.
- `src/data/official.ts`: seleção de fotos oficiais, correspondência com produtos e textos dos vídeos.
- `src/data/official-assets.json`: manifest gerado com dimensões, origem e caminhos de cada mídia oficial.
- `src/data/generated.ts` e `generated-images.json`: fallback ilustrativo dos produtos ainda sem foto correspondente.
- `src/data/faq.ts`: cinco perguntas e respostas do brief.
- `src/data/testimonials.ts`: depoimentos; somente registros aprovados com nome e texto são exibidos.
- `src/data/instagram.ts`: seleção visual real e coleção de posts públicos, inicialmente vazia.
- `src/app/globals.css`: tokens de marca, tipografia e estilos responsivos.
- `src/app/second-delivery.css`: novas seções e breakpoint de 1280 px do menu ampliado.
- `src/app/official-brand.css`: fontes locais Unbounded/Figtree, aplicação da identidade oficial, dimensões dos logos, ajustes de tipografia e vídeos.
- `src/lib/whatsapp.ts`: geração de links e mensagens; o telefone vem dos dados da marca.

O modelo de produto segue o brief e acrescenta `photo` opcional. Para trocar por uma foto oficial, adicione o arquivo em `public/products` e atualize `image` e `photo` com `src`, `alt`, `width`, `height`, `origin: "official"`, `source` e `provisional: false`. O campo `crop` é opcional; omita-o para fotos novas sem enquadramento específico. A identificação ilustrativa depende de `origin` e desaparece com a foto oficial. Descrições ausentes não são inventadas nem exibidas. A unidade dos dois kits é `kit`.

Os componentes de layout e as páginas são renderizados no servidor, com componentes cliente para menu, filtro, modal, falha de imagem, mapa, animações, vídeos e embeds. Não há API, banco, autenticação, carrinho ou persistência de pedidos. As entradas por IntersectionObserver preservam o conteúdo visível sem animação e respeitam movimento reduzido.

### Habilitar conteúdo pendente

História: já preenchida a partir da página 2 da apresentação oficial, com `approved: true`. `showFilms` habilita os vídeos na seção. A apresentação de Cris usa a arquitetura de marcas do manual, sem inventar datas, prêmios ou formação. Para ocultar conteúdo não aprovado, use `approved: false`. Depoimentos continuam vazios: cadastrar registros com `approved: true` em `testimonials.ts` quando forem fornecidos.

Instagram: cadastrar até quatro URLs públicas HTTPS de `instagram.com/p/.../` ou `instagram.com/reel/.../`. O componente valida as URLs e limita a exibição a quatro. Cada registro pode conter `fallbackPhoto` real e legenda. Imagens geradas não são aceitas como fallback de publicação. O script é solicitado uma única vez por página, perto da seção, quando a largura comporta o embed. Durante carregamento ou falha, a imagem alternativa e o link continuam disponíveis. Em telas estreitas, somente o fallback é exibido. Sem URLs, aparecem duas referências reais vinculadas ao perfil, identificadas como seleção visual, sem simular posts.

## Identidade oficial

Unbounded nos títulos, Unbounded Light em subtítulos selecionados e Figtree nos textos. As fontes fornecidas estão em `public/fonts`, servidas localmente. Lilita One e DM Sans foram removidas.

Paleta do manual: vermelho `#A0121B`, bege `#EBD9C8`, rosa claro `#ECC7D8`, rosa `#E35EAA`, rosa escuro `#BC3E8F`, terracota `#CA5A40`, marrom `#3C2B27`, verde `#3A6111` e verde claro `#C0CE75`. Os HEX estão centralizados nos tokens; neutros funcionais de interface não são apresentados como cores da marca. Vermelho e rosas têm presença principal, verde apoia processo/pedido e marrom fica restrito ao rodapé. O xadrez rosa oficial aparece como detalhe do manifesto.

Logos SVG principal vermelho/bege e ícone vermelho foram copiados sem alteração. Não há reconstrução tipográfica, distorção, recoloração por CSS, remoção de elementos ou uso do antigo círculo como identidade atual. O favicon também usa o ícone oficial.

## Fotos e vídeos

Os originais permanecem intactos em `references`. Os derivados otimizados ficam em `public/official`: 15 fotografias WebP, 3 logos SVG, xadrez, 3 vídeos MP4 e seus posters. O manifest registra a fonte exata. As 167 fotos de produtos, 10 retratos, 11 fotos do acervo histórico e os três vídeos foram examinados para seleção; não é necessário carregar todo o ensaio na página.

- Hero: tábua do ensaio, fotografia horizontal em alta. Os vídeos verticais foram preservados em sua proporção original na seção de história, sem recorte agressivo para o hero.
- Cris: foto 8 do diretório `CRISTINA`, substituindo o espaço reservado.
- Processo e empresas: fotos reais do ensaio. A composição editorial da seção empresas não é anunciada como conteúdo de um kit fechado.
- Catálogo: nove produtos com fotos oficiais; oito continuam com ilustrações identificadas. Confira a tabela e as pendências em `docs/official-brand.md`.
- Instagram: duas fotos do ensaio oficial, assim identificadas e vinculadas ao perfil. Não são apresentadas como posts publicados; URLs de posts continuam pendentes.

Os vídeos de história (89,63 s), lançamento (70,63 s) e ASMR (36,9 s) foram convertidos de HEVC/MOV para H.264/AAC MP4 com `faststart`, largura 720 px e proporção 9:16. O áudio original é preservado, mas só inicia após ação do visitante. As abas usam setas, Home/End e foco visível. Trocar de vídeo desmonta o player anterior. Sem reprodução automática ao entrar na página, sem download de MP4 antes do clique, com poster e link direto em caso de erro. As legendas já presentes na imagem dos originais foram preservadas; uma faixa de legendas/transcrição textual revisada ainda deve ser fornecida para acessibilidade completa dos vídeos.

Para regenerar os derivados, é necessário FFmpeg no sistema:

```bash
node scripts/prepare-official-assets.mjs
```

`--photos-only` atualiza fotos, fontes e manifest preservando os MP4/posters já gerados. O script não altera os originais, nem usa IA para retocar as fotografias. Para novas fotos, atualize a seleção no script e a correspondência em `official.ts`.

O acervo anterior de 18 imagens geradas e seus prompts permanece em `public/generated` e `docs/generated-images.json`, para rastreabilidade. Somente os oito fallbacks ainda necessários entram no catálogo, sempre com “Imagem ilustrativa”. Fotos oficiais removem essa identificação automaticamente. Next Image preserva dimensões, otimização e carregamento tardio; em falha, “Foto em breve” mantém espaço e ações.

As categorias são editoriais provisórias: seis linguiças, oito defumados, Manta Suína em suínos e dois kits. “Especiais” continua disponível no tipo, sem filtro enquanto vazia. Destaques: Bacon, Linguiça Suína Tradicional, Copalombo Defumado e Maturado e Kit Presente Caixa.

## Limites desta entrega

Home: Hero, Manifesto, Destaques, Processo, Cris, História com vídeos, Empresas, Depoimentos (ocultos), Instagram, Como pedir, Localização, FAQ, CTA e Footer. A ordem fica em `src/app/page.tsx`. O catálogo oferece filtros e modal compartilhado com a Home. O mapa externo é solicitado perto da localização; endereço, contato e rotas permanecem disponíveis se o serviço falhar.

Continuam pendentes: fotos correspondentes aos oito produtos restantes, confirmação das associações editoriais do ensaio, biografia completa de Cris, depoimentos aprovados, URLs públicas de posts e legendas/transcrições revisadas dos vídeos. Não há oferta de cursos: Lady Brutus é citada apenas para explicar a arquitetura oficial de marcas.

O catálogo PDF traz Rua da Paciência, 207; o brief e a referência da loja trazem R. Cleves de Faria, 207. Até confirmação, o site preserva o endereço anteriormente validado. Os materiais novos não confirmam preços atuais. O horário de quarta-feira foi confirmado pelo responsável: 09:00–20:00. Antes da publicação, validar endereço, preços, descrições e domínio. Canonical e imagens sociais com URL absoluta dependem do domínio confirmado. Nenhuma publicação foi realizada.
