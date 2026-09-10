# Brutona: identidade e acervo oficiais

Site institucional com Home, catálogo de 17 produtos, filtros, detalhes em modal e pedidos pelo WhatsApp. Código no GitHub e publicação na Vercel já realizados pelo responsável. Implementação orientada pelo `agents.md`; os originais em `brutona_codex_brief/` são opcionais e não participam do build ou dos testes obrigatórios.

A atualização oficial usa o manual e os arquivos em `brutona_codex_brief/references/BRUTONA`, as fotos de `FOTOS CRISTINA PRODUTOS BRUTONA` e os três arquivos de `Vídeos`. Essas fontes substituem as aproximações visuais das entregas anteriores. Veja a auditoria e o mapa de correspondências em [docs/official-brand.md](docs/official-brand.md).

## Executar

Requer Node.js 22 e npm. `.nvmrc`, `engines` e CI usam a mesma família de Node. As versões das dependências estão no `package-lock.json`; preserve-o nas atualizações.

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

Após `npm ci` e `npm run build`, sem servidor previamente iniciado:

```bash
npx playwright install --with-deps chromium
npm run test:e2e
```

O Playwright inicia o build de produção na porta 3100 e encerra o processo ao terminar, inclusive em falha. Se a porta estiver ocupada, não reutiliza silenciosamente outro build. Para testar um servidor existente, use `TEST_BASE_URL=http://localhost:3001 npm run test:e2e`; nesse caso, o Playwright não inicia nem encerra o servidor externo.

Os testes cobrem navegação, filtros, mensagens do WhatsApp sem envio, modal e FAQ por teclado, menu mobile, endereço, imagens ausentes, legendas contextuais, mapa bloqueado e movimento reduzido. Também verificam fontes, integridade dos logos oficiais, procedência das fotos, reprodução dos três vídeos, abas por teclado e falha de mídia. Geram screenshots de Home, seções, catálogo e modal em 360, 390, 768, 1440 e 1920 px e executam verificações axe de acessibilidade. `test-results/` e o relatório HTML em `playwright-report/` são ignorados pelo Git. Mapas e scripts de Instagram usam respostas controladas, sem depender da disponibilidade dos serviços.

História e depoimentos são testados vazios e preenchidos com fixtures exclusivas de teste. O Instagram é testado sem URLs, carregando, com script bloqueado, embed simulado e largura insuficiente. A página de fixture é interceptada pelo Playwright: não há rota de teste na aplicação nem publicações fictícias nos dados do site. Os embeds reais deverão ser verificados novamente quando suas URLs forem fornecidas.

## Editar conteúdo

- `src/data/brand.ts`: contatos, horários, navegação e textos. Endereço confirmado: Rua da Paciência, 207, Brumal, Santa Bárbara - MG, 35960-000. Quarta-feira: 09:00–20:00.
- `src/data/products.ts`: produtos, preços, unidades, categorias e destaques. Os 17 preços e unidades atuais foram aprovados pelo responsável; o aviso de possível alteração permanece. Produtos inativos não aparecem; filtros são derivados dos ativos.
- `src/data/assets.ts`: origem, enquadramento e situação provisória das fotos.
- `src/data/official.ts`: seleção de fotos oficiais, correspondência com produtos e textos dos vídeos.
- `src/data/official-assets.json`: manifest gerado com dimensões, origem e caminhos de cada mídia oficial.
- `src/data/faq.ts`: cinco perguntas e respostas do brief.
- `src/data/testimonials.ts`: depoimentos; somente registros aprovados com nome e texto são exibidos.
- `src/data/instagram.ts`: seleção visual real e coleção de posts públicos, inicialmente vazia.
- `src/app/globals.css`: tokens de marca, tipografia e estilos responsivos.
- `src/app/second-delivery.css`: novas seções e breakpoint de 1280 px do menu ampliado.
- `src/app/official-brand.css`: fontes locais Unbounded/Figtree, aplicação da identidade oficial, dimensões dos logos, ajustes de tipografia e vídeos.
- `src/lib/whatsapp.ts`: geração de links e mensagens; o telefone vem dos dados da marca.

O modelo de produto segue o brief e acrescenta `photo` opcional. Para trocar uma foto, versione o derivado em `public/official` e atualize sua associação em `official.ts`, com `src`, `alt`, `width`, `height`, `origin: "official"`, `source` e `provisional: false`. `products.ts` deriva `image` de `photo`; sem foto, ambos preservam o placeholder e as ações. `crop` é opcional. `usage` aceita `product` (padrão), `category` ou `serving`; os dois últimos exigem `note`, exibida no card e no modal. A origem oficial comprova de onde veio o arquivo, não que ele representa exatamente aquele sabor ou kit. Ao receber foto exata, remova a legenda contextual e ajuste `usage` e `alt`. Descrições ausentes não são inventadas. A unidade dos dois kits é `kit`.

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
- Catálogo: nove fotos associadas ao produto, três fotos reais contextuais com legenda e cinco placeholders neutros. Confira a tabela em `docs/official-brand.md`.
- Instagram: duas fotos do ensaio oficial, assim identificadas e vinculadas ao perfil. Não são apresentadas como posts publicados; URLs de posts continuam pendentes.

Os vídeos de história (89,63 s), lançamento (70,63 s) e ASMR (36,9 s) foram convertidos de HEVC/MOV para H.264/AAC MP4 com `faststart`, largura 720 px e proporção 9:16. O áudio original é preservado, mas só inicia após ação do visitante. As abas usam setas, Home/End e foco visível. Trocar de vídeo desmonta o player anterior. Sem reprodução automática ao entrar na página, sem download de MP4 antes do clique, com poster e link direto em caso de erro. As legendas já presentes na imagem dos originais foram preservadas; uma faixa de legendas/transcrição textual revisada ainda deve ser fornecida para acessibilidade completa dos vídeos.

Para regenerar os derivados, é necessário FFmpeg no sistema:

```bash
node scripts/prepare-official-assets.mjs
```

`--photos-only` atualiza fotos, fontes e manifest preservando os MP4/posters já gerados. O script não altera os originais, nem usa IA para retocar as fotografias. Para novas fotos, atualize a seleção no script e a correspondência em `official.ts`.

As 18 imagens geradas por IA foram retiradas de `public`, e seus módulos de fallback foram removidos. `docs/generated-images.json` permanece somente como histórico de prompts; seus caminhos antigos não são assets publicados. Nenhum original fornecido foi apagado. Next Image preserva dimensões, otimização e carregamento tardio; em falha, “Foto em breve” mantém espaço e ações.

As categorias são editoriais provisórias: seis linguiças, oito defumados, Manta Suína em suínos e dois kits. “Especiais” continua disponível no tipo, sem filtro enquanto vazia. Destaques: Bacon, Linguiça Suína Tradicional, Copalombo Defumado e Maturado e Kit Presente Caixa.

## Limites desta entrega

Home: Hero, Manifesto, Destaques, Processo, Cris, História com vídeos, Empresas, Depoimentos (ocultos), Instagram, Como pedir, Localização, FAQ, CTA e Footer. A ordem fica em `src/app/page.tsx`. O catálogo oferece filtros e modal compartilhado com a Home. O mapa externo é solicitado perto da localização; endereço, contato e rotas permanecem disponíveis se o serviço falhar.

Continuam pendentes fotos exatas de oito produtos: três usam contexto real e cinco têm “Foto em breve”. Também permanecem pendentes biografia completa de Cris, depoimentos aprovados, URLs públicas de posts e legendas/transcrições revisadas dos vídeos. As nove associações do ensaio são editoriais, não novas certificações comerciais. Não há oferta de cursos: Lady Brutus é citada apenas para explicar a arquitetura oficial de marcas.

O responsável confirmou Rua da Paciência, 207, substituindo o endereço divergente do brief antigo, e aprovou os preços atuais. Quarta-feira permanece 09:00–20:00. GitHub e Vercel já estão configurados pelo responsável; esta entrega não altera hospedagem nem publica alterações. O domínio informado é `brutonacharcutaria.com.br`, cuja configuração e DNS serão feitos pelo responsável. Canonical, sitemap e compartilhamento com URLs absolutas continuam para a preparação específica do domínio.

## Contratos e auditoria local

`tests/fixtures/approved-content.json` contém os valores esperados independentes do código: 17 produtos, cinco FAQs, endereço, horários e mensagens. Foi conferido com o brief e com as decisões posteriores do responsável. Não gere essa fixture a partir dos dados da aplicação: isso esconderia regressões. Mudanças comerciais aprovadas devem atualizar os dados e a fixture em um mesmo pull request, explicando a aprovação. `tests/fixtures/official-logos.json` guarda SHA-256 dos três SVGs, conferidos byte a byte com os originais; só atualizar após nova conferência de arquivos oficiais.

Os testes obrigatórios validam apenas conteúdo e assets versionados. A auditoria opcional `npm run audit:references` verifica disponibilidade dos originais, igualdade dos logos e FAQ do brief. Exige o acervo local nos caminhos do manifest; se faltar, informa os arquivos e sai com erro, sem bloquear testes ou build. A regeneração dos derivados também exige os originais e, para vídeos, FFmpeg. Não envie o acervo privado inteiro ao Git para executar CI.

Para reproduzir a verificação, use um clone limpo da branch com esta entrega, sem copiar `brutona_codex_brief`, `node_modules` ou `.next`; execute `npm ci`, lint, typecheck, `npm test`, build, instalação do Chromium e `npm run test:e2e`, nessa ordem.

## GitHub Actions e proteção da master

`.github/workflows/quality.yml` roda em pull requests para `master`, pushes nessa branch e execução manual. O job/check `quality` executa a sequência acima no Ubuntu 24.04 com Node 22, sem segredos de deploy. Qualquer etapa falha o check; execuções antigas da mesma referência são canceladas. Relatórios, screenshots e traces de falhas ficam nos artifacts por sete dias.

O workflow será executado remotamente depois que estas alterações forem enviadas. Testes locais não comprovam um check verde no GitHub. A proteção da branch **não foi ativada por esta implementação**. Após o primeiro check aparecer:

1. Em Settings do repositório, crie uma proteção/ruleset ativo para `master`, conforme disponibilidade da conta.
2. Exija pull request antes do merge, sem aprovação obrigatória de outra pessoa para o fluxo individual.
3. Exija o check `quality` e a branch atualizada com a base antes de integrar alterações.
4. Desabilite force push e exclusão da branch; aplique a regra também aos administradores, sem bypass habitual.
5. Confirme em um PR de teste que uma falha em `quality` impede o merge. Se o plano do GitHub não oferecer essa proteção, registre a limitação e não considere o bloqueio ativo.

Referência: [proteção de branches no GitHub](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).

A integração Git atual com a Vercel permanece intacta. O fluxo é branch de trabalho, PR, checks aprovados, avaliação do preview e merge na `master`. CI sozinho não bloqueia a publicação da Vercel: a proteção do merge é uma configuração separada e um push direto pode acionar deploy. Confira no painel qual branch está configurada como Production Branch; não foi presumida ou alterada por esta entrega. [Integração Git da Vercel](https://vercel.com/docs/git).

Após o merge, conferir Home, catálogo, fotos, endereço e links do WhatsApp na versão hospedada, sem enviar mensagens. Caso haja regressão, usar a versão anterior no painel da Vercel e corrigir por novo PR. Domínio, revisão em Safari/celular real, SEO por ambiente e acessibilidade textual dos vídeos permanecem como próximos cuidados de lançamento.

### Verificação desta entrega

Validado em uma cópia isolada dos arquivos destinados ao Git, incluindo os arquivos novos desta entrega, sem o acervo ignorado, dependências ou build copiados: `npm ci`, lint, typecheck, 10 testes unitários, build e 19 testes de navegador. Screenshots e axe cobrem as cinco larguras descritas acima. O servidor de testes encerrou automaticamente ao concluir. A auditoria opcional passou com os originais no workspace e retornou o erro explicativo esperado na cópia sem acervo.

Cinco cópias descartáveis com preço, unidade, endereço, horário ou mensagem propositalmente incorretos fizeram os testes correspondentes falharem. Nenhuma dessas alterações entrou no site. Isso não equivale a uma execução remota do GitHub Actions ou à ativação da proteção; ambas ainda dependem do envio das alterações e da configuração no GitHub.
