# Changelog — Site de escola de idiomas

## 3.0.0 — 2026-10-30

Correções de `pesquisa/pendencias.md`, medidas com `scripts/verificar.mjs` nos dois exemplos. Nenhum token mudou, então a tabela de contraste continua a mesma.

### Corrigido

- §4, regra nova de altura baixa: sem regra → com altura até 480px, header, barra das conversões, cookie bar, bolha de chat e Libras passam a rolar com a página. Em 320 × 256, as camadas fixas cobriam 100% da janela.
- §5.1, barra das conversões: colunas `1fr 1fr` → `repeat(2, minmax(0, 1fr))`. Em 320px, o rótulo do botão quebra em vez de sair da barra.
- §5.6, rodapé: link `Política de Privacidade` da linha do copyright com 20px de altura → `display: inline-flex` e `min-height: 44px`.
- §8, item 9: a cookie bar passa a dizer que rola junto em altura baixa.
- §10: novo item de checklist para 320 × 256 e para a altura dos links fora de parágrafo.
- `exemplos/home.html` e `pagina-de-curso.html` ajustados às regras acima; `home.png` (1440 × 5983), `pagina-de-curso.png` (1440 × 4371) e `capa.png` refeitos. Os dois passam sem falha nos quatro tamanhos do verificador.

## 2.0.0 — 2026-10-09
Correções da [auditoria de 2026-10-09](../../auditorias/2026-10-09/site-escola-idiomas/auditoria.md).

Os 65 achados foram tratados; um deles (P06) só em parte (ver "Achados não aplicados"). A lista abaixo segue a ordem do documento.

### Corrigido
- (padrão do repositório) Título de nível 1: "Guia de UI/UX para Frontends de Escolas de Idiomas" → "Site de escola de idiomas". A origem das observações (análise do site da Fisk) continua dita no corpo e no "Aviso de uso".
- (padrão do repositório) "## 10. Checklist de entrega" → "## 10. Checklist de aceite".
- (P09, E03, em parte) Abertura: "já validados em produção por uma rede com +68 anos e centenas de unidades franqueadas" → "que o autor observou em uso no site analisado […] não há dados de conversão nem medição que as comprove"; "Troque a cor de marca (`--brand`) e o logo pelos seus" → "Defina `--brand` e o logo com os seus; as outras cores da marca são derivadas (§1.1)".

- (M01, C23, E03) Variantes da marca deixam de ser hex fixos e passam a ser derivadas de `--brand` por `color-mix()`: `--brand-dark` `#aa1318` → 79% de `--brand` + preto (`#aa1419`; branco sobre ela 7,46 → 7,44:1); `--brand-deep` `#5a0f14` → 42% + preto (`#5a0b0d`; sobre branco 13,88 → 14,11:1); `--brand-light` `#ed3237` → 88% + branco (`#dc353b`); `--brand-tint` `#fff0f0` → 6% + branco (`#fdf1f2`; corpo `#666` sobre ela 5,19 → 5,21:1). O comentário "tom da marca a 5%" estava errado (5% dá `#fdf4f4`) e saiu. A instrução de troca de marca, que aparecia em três formas (`--brand`, `--brand-*`, `--brand*`), agora é uma só: "defina `--brand`" (§1.1).
- (C23) `--brand-hero` (`#e00c18`) fundido em `--brand` (`#d71920`): a faixa de CTA passa de 4,96 para 5,19:1 com texto branco. Papéis separados nos comentários: `--brand-dark` = footer, hover, badge; `--brand-deep` = títulos de seção e botão pressionado; `--brand-light` = só decorativa.
- (C03) `--lh-body`: 1.6 → 1.7 (o valor que a tabela, o Tailwind e o checklist já usavam). O 1.6 do corpo do hero virou `--lh-lead`.
- (C06, A09, C07) Tamanhos fluidos com termo `rem + vw` e limites em `rem`: `--fs-hero` `clamp(1.75rem, 4vw, 60px)` → `clamp(2.25rem, 1.4rem + 3.2vw, 3.75rem)`; `--fs-section` `clamp(1.75rem, 3.5vw, 50px)` → `clamp(1.75rem, 1.2rem + 2.3vw, 3.125rem)`; `--fs-hero-sub` `clamp(1rem, 2vw, 25px)` → `clamp(1.125rem, 1rem + .6vw, 1.5625rem)`; `--fs-card` `27px` → `clamp(1.375rem, 1.2rem + .6vw, 1.6875rem)`; `--fs-body-lg` `20px` → `clamp(1.0625rem, .98rem + .35vw, 1.25rem)`; `--fs-item` `20px` → `1.25rem`; `--fs-body` `17px` → `1.0625rem`; `--fs-caption` `14px` → `.875rem`. No celular a ordem passa a ser H1 36 > H2 28 > H3 22 > subtítulo 18 > corpo 17 (antes H1 = H2 = 28 e subtítulo 16).
- (C04) Cor da marca fixa fora dos tokens: `--shadow-hover` `rgba(200,16,46,.14)` → `color-mix(in srgb, var(--brand) 14%, transparent)`; `--shadow-brand` `rgba(215,25,32,.4)` → `color-mix(in srgb, var(--brand) 40%, transparent)`.
- (P10) `--shadow-card`: `0 2px 12px 0 #e7e7e7` → `0 2px 12px 0 rgb(0 0 0 / .09)`. A sombra agora escurece o fundo em que está: 1,23:1 sobre branco e 1,22:1 sobre `--bg-gray` (antes 1,24 e 1,11, sumia no cinza).
- (C08, C09) Tokens mobile-first: a base é a do celular e os overrides são `min-width`. `--section-py: 100px 0 120px` e `--section-py-sm: 60px 0` → `--section-pt` / `--section-pb` (60/60; 100/120 a partir de 768px). `--container-pad` 35px com override de 20px que não funcionava → 20px na base, 35px a partir de 768px. `--header-h: 143px` + `--header-h-mobile: 64px` → um só `--header-h` (64px; 143px a partir de 1200px).
- (C11) Comentários dos raios: `--r-sm` "inputs, botões pequenos" → "inputs e botões"; `--r-md` "botões, badges" → "badges"; `--r-xl` "faixas de CTA, botões-pílula" → "faixa de CTA"; `--r-full` ganha uso (pílulas, eyebrow, campo da faixa).
- (C16) Config do Tailwind: trecho solto começando em `theme:` com hex repetidos e nomes diferentes (`body`, `surface`, `lead`, `base`) → arquivo completo em que cada chave aponta para o token (`var(--…)`) e tem o mesmo nome; `screens` com os três breakpoints; `borderRadius.md` deixa de valer os 6px padrão do Tailwind.
- (C17) Regra 2: "todos os pesos (400/500/600/700/800)" → "quatro pesos (400/500/600/700)". O 800 não era usado em nenhuma receita.
- (E02) Regra 1: "vermelho + branco" → "cor da marca + branco".
- (M06, em parte) Regra 1: "com parcimônia" → lista fechada de onde a marca aparece. Regra 6: "100–120px" → "100px em cima e 120px embaixo".
- (C01, C02, C08, C22, em parte) Regras 4, 5 e 7 reescritas: dizem onde ficam as duas conversões abaixo de 1200px (barra fixa), onde fica a busca de unidade (faixa 1 do header, seção 5 da home, passo 1 da pré-matrícula) e que toda media query é `min-width`. "Teste de classificação" → "Teste de nível".
- (P09) Regra 2: "elimina 90% das decisões" → "elimina a maior parte das decisões".
- (C03, C07, C20, M06) Tabela de tipografia refeita com os tokens e uma coluna de altura de linha. Faixas viraram um valor: eyebrow "14–18px" → 14px; H3 "600–700" → 600; `mb` do H3 "16–25px" → 16px; `mb` do H4 15px → 16px (`--space-3`). "H3 de card (27px)" → "H3 de tile e de bloco"; `.card__title` declarado como `<h3>` com `--fs-item`. Eyebrow: borda `#ccc` → `var(--border)`, `padding 8px 30px` → `8px 24px` (tokens), `radius 30px` → `var(--r-full)`. Regra "todo `font-size` de título usa `clamp()`" → lista de quem é fluido e quem é fixo.
- (C19) Caixa dos rótulos: "opcionalmente `uppercase` nos botões-pílula" → pílula sempre em caixa alta por CSS; `.btn-primary` e `.btn-outline` em caixa de frase ("Saiba Mais" / "SAIBA MAIS" → "Saiba mais"; "ACEITAR" → "Aceitar").
- (P01, A10) Botões: as receitas não tinham `display`, fonte, `line-height` nem altura mínima (36px como `<button>` em Arial) → bloco comum com `display: inline-flex`, `font: inherit`, `line-height: 1.2`, `min-height: 44px`, `cursor: pointer`, `text-decoration: none` e transição; estados pressionado e desabilitado acrescentados.
- (P02) `border: .8px` → `1px` em `.btn-outline` e `.input`; saiu o comentário "0.8px, nao 1px".
- (C10, M01) Cores fixas nas receitas → tokens: `#fff` sobre a marca → `var(--on-brand)` / `var(--on-brand-dark)`; `#fff` de fundo → `var(--white)`; `#212529` → `var(--input-text)`; `#ccc` e `#dee2e6` → `var(--border)` / `var(--border-input)`. A marca como texto → `var(--brand-text)` / `var(--brand-text-dark)`.
- (C11, C18) Pílula: `border-radius: 32px` → `var(--r-full)`; `transition … .25s` → `var(--t-fast)`.
- (A11) Pílula: `white-space: nowrap` e `padding: 15px 40px` fixos (344px com o rótulo do hero, mais que uma tela de 320px) → largura total e quebra de linha abaixo de 576px; `nowrap` e 40px laterais a partir de 576px.
- (A04, C05) Pílula fantasma: fundo `rgba(255,255,255,.15)` e borda `rgba(255,255,255,.55)` (3,54:1 no pior caso sobre o scrim; hover 2,81:1) → fundo transparente, texto e borda na cor do texto do bloco; hover em `--white` com texto `--heading` (20,79:1). Hover da pílula branca: `color: #fff` → `color: inherit`.
- (A04) Overlay do tile: `rgba(0,0,0,.75) 0%, rgba(0,0,0,.15) 55%` → `rgb(0 0 0 / .8) 0%, rgb(0 0 0 / .55) 50%`; título limitado a 2 linhas. Pior caso (foto branca) no topo do texto: 1,82:1 → 4,74:1.
- (M06, M08) Tile: "overlay escurece" ganhou CSS (`background-color: rgb(0 0 0 / .2)` no hover); `transition: transform` sem transform no tile saiu; `h3` 27px → `var(--fs-card)`; "gap: 0 … ou gap: 8px" e "carrossel/grade" → sem gap, sem raio, 1,2 / 2 / 4 por tela.
- (C15) Tile: `letter-spacing: .04em` saiu da receita (a regra "`letter-spacing: 0` em tudo" fica sem exceção). "CONHEÇA" digitado em caixa alta → "Conheça" + `text-transform`.
- (A14) Tile: `aria-label="Conheça Inglês"` removido; a justificativa estava errada (o link já contém o `<h3>`).
- (P08) Data do card: "28 Agosto, 2026" → "28 de agosto de 2026" em `<time datetime>`.
- (C12, M09) Faixa de CTA: "full-bleed" → "card largo"; `max-width: var(--container)` (35px mais larga que o conteúdo de cada lado) → `width: min(100% - 2 * var(--container-pad), var(--container) - 2 * var(--container-pad))`; a margem negativa saiu da base e foi para `.cta-band--overlap`, com `position: relative; z-index: 2`. `padding: 20px 35px` → `24px` vertical (`--space-4`) e `--container-pad` lateral.
- (C06) `.cta-band h2`: `40px` → `var(--fs-cta)` (24 a 40px).
- (C08) Media queries das receitas: `max-width: 767px` → base de celular + `min-width: 768px`.
- (A02) Asterisco de obrigatório dentro da faixa: `var(--brand)` sobre a faixa (1,05:1) → herda a cor do texto da faixa (5,19:1); `required` e legenda "* obrigatório" exigidos.
- (A10) Botão-seta do formulário progressivo: "à direita" dentro do campo → ao lado do campo, com 44px.
- (A01) `.input:focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 3px rgba(215,25,32,.15) }` (anel a 1,28:1 sobre branco e 1,01:1 na faixa) → removido; o foco é a regra global de anel duplo.
- (A03) Borda de `.input`/`.select`: `var(--border)` (1,30:1) → `var(--border-input)` (4,69:1). Linha e passos futuros do stepper: `#dee2e6` → `var(--border-input)`.
- (M06) `.input`: "height: 44px; select em formulário longo: 50px" → `min-height: 44px` para os dois. Stepper: "ícone cinza, rótulo cinza" → `--border-input` no círculo, `--paragraph` no rótulo. Contador do formulário: "discreto" → `--fs-caption`, cor do texto da faixa.
- (E02) "asterisco vermelho" → "asterisco na cor da marca"; "rosa muito claro" → "tint da marca".
- (C09) `.container` e `.section` passam a ler os tokens: `max-width: 1320px; padding-inline: 35px` → `var(--container)` / `var(--container-pad)`; `padding: 100px 0 120px` + media query → `padding-block: var(--section-pt) var(--section-pb)`; `.section--tight` `48px 0` → `var(--section-tight)`.
- (C13) Ritmo de fundo: a linha de 7 passos, que não casava com as 11 seções, → coluna "Fundo" com um valor por seção nas tabelas da home e da página de curso, mais a regra para quando se cortam seções.
- (M04) Breakpoints: "576 / 768 / 992 / 1200 / 1400", dos quais só 767 aparecia → três (`576`, `768`, `1200`), com a tabela do que muda em cada um. Grade de cards: "3 colunas desktop → 2 tablet → 1 mobile" → 1 / 2 a partir de 768px / 3 a partir de 1200px.
- (C01) Header abaixo de 1200px: "só logo centralizado + hambúrguer" (as duas conversões sumiam) → hambúrguer, logo e atalho de unidades, mais uma barra fixa de 56px no pé da tela com "Teste de nível" e "Pré-matrícula".
- (C02) Diagrama do header: ganhou "Encontre uma unidade" na faixa 1. Home: ganhou a seção 5 "Busca de unidade" (a tabela vai de 11 para 12 linhas; o esqueleto mínimo "1, 2, 4, 7, 9, 11" → "1, 2, 4, 5, 8, 10, 12").
- (A07, C18) Dropdowns: "aparecem com `opacity` + `translateY(-6px)` em `.18s`" → gatilho `<button aria-expanded>`, painel com `visibility: hidden` quando fechado, teclado e Esc definidos, duração `var(--t-fast)`. "Menu vira side-nav" → `<dialog>` modal com conteúdo e ordem definidos.
- (A10) Link do teste no header: "link sublinhado menor" (12px no exemplo, colado ao botão) → 14px/600 com `padding-block: 4px` (25px de alvo), 4px abaixo do botão.
- (C22) Nome da segunda conversão, que tinha quatro formas → "Teste de nível" em todo o documento (rótulo curto "Fazer teste"; evento `iniciou_teste_nivel`, que já era esse).
- (C27) Hero da página de curso: "bandeira estilizada" → ilustração do idioma em tons de `--brand-deep` e `--brand-dark`, com scrim, sem bandeiras.
- (M11) Faixas etárias: "4 a 10 anos / A partir de 11 anos / Acima de 15 anos" (sobrepostas) → "4 a 10 anos / 11 a 14 anos / 15 anos ou mais".
- (C21) Modalidades: 4 na página de curso, 3 no §8 e sem opções no wizard → as mesmas quatro nos três lugares, em dois eixos: formato (em grupo / individual) e meio (presencial / on-line).
- (C26) "Não peça dados pessoais antes de o usuário ter escolhido 'onde'" → restrito ao wizard de pré-matrícula.
- (E01) "Termo de Privacidade" → "Política de Privacidade".
- (P09) Exemplos com dados do site analisado → placeholders: "6 décadas de história" → "{N} décadas"; "+68 anos" → `{N}+ anos`; "Selo de Excelência em Franchising 24×" → `{prêmio} {N}×`. Placeholder da busca de unidade reescrito.
- (P09) §3.2, §3.4 e §3.5: "o padrão mais forte do site", "o componente mais rentável", "reduz drasticamente o atrito" → escritos como leitura do autor, sem dados de conversão. Exemplo de título da faixa trocado por um texto próprio.
- (A06) §6, movimento: o bloco `prefers-reduced-motion` só alcançava CSS (`animation-duration` e `transition-duration`) → ganhou `animation-iteration-count: 1` e `scroll-behavior: auto`, e o parágrafo seguinte obriga o JS a obedecer: Swiper com `autoplay: false` e efeito `slide`, contador no valor final, revelação de scroll não aplicada.
- (C25) §6 e §9: "smooth-scroll suavizado (Lenis) no wrapper da página" na tabela e "Lenis (opcional)" na stack → "Scroll nativo" nos dois lugares; Lenis saiu.
- (A12) §7, semântica: `lang="pt-BR"` e `lang` em trecho estrangeiro, landmarks, skip link "Pular para o conteúdo", um `<h1>` por página, `<button>` para ação e `<a>` para navegação, `<time datetime>`, `<title>` único, foco não encoberto (`scroll-padding` no §1), link em texto corrido com cor e sublinhado. "Alvos de toque de 44px+ nos botões do mobile" → "Alvos de 44px nos botões e campos; nenhum alvo com menos de 24px".
- (A13) §7: a linha de contraste ("≈ 5.7:1 · ≈ 4.9:1 · ≈ 7.4:1", com um valor errado) → tabela de 40 pares com os dois hex e a razão calculada (conferida por script nesta revisão: 40 de 40 batem). `::placeholder` em `--paragraph`; `--brand-light` e `--border` não recebem texto (branco sobre `--brand-light` dá 4,55:1 com a marca padrão e cai abaixo de 4,5 com outras marcas).
- (A01) §7 e §10: "`:focus-visible` com anel na cor da marca" (1,00:1 sobre a própria marca) → o anel duplo do §1, com a regra de qual dos dois anéis contrasta em cada fundo.
- (P09) §7: o widget de Libras "praticamente obrigatório" e "fixo no canto direito" → "recomendado em site educacional brasileiro; não substitui a conformidade com a WCAG", no meio da borda direita. §8 e §9: "alinhada ao que o site usa" → "parte do que o autor identificou no site analisado"; a abertura do §8 passa a dizer que são observações do autor, sem dados de conversão.
- (C24) §8: três elementos fixos disputavam o canto inferior direito → barra das conversões (`--cta-bar-h`), cookie bar (`bottom: var(--cta-bar-h)`; `--cookie-h` gravado pelo JS), bolha de chat (`bottom: calc(var(--cta-bar-h) + var(--cookie-h) + 24px)`) e Libras no meio da borda direita, nessa ordem de empilhamento.
- (M06) §6 e §8: "~80ms" → 80ms; "auto-play lento" → 6s com pausa; chat "~56px" → 56px; "contador discreto" → `--fs-caption`.
- (P05) §8: cookie bar "Recusar (outline) e ACEITAR (sólido)", sem categorias → `Recusar` e `Aceitar` com a mesma receita (fundo `--white`, texto `--heading`, 44px), mais `Preferências` com Necessários / Desempenho / Marketing e o link para a Política de Privacidade. Rastreamento: "dispare eventos nomeados" → nenhuma tag dispara antes do aceite (Consent Mode v2), cada uma respeita a categoria, Clarity com mascaramento de todos os campos. Os itens de consentimento são recomendação técnica e a nota diz que não substituem orientação jurídica.
- (P03) §9: "React + Vite (ou Next.js se SEO for prioridade)" → "Next.js ou Astro, com SSG ou SSR", obrigatório; SPA renderizado só no cliente deixou de ser opção.
- (coerência entre seções, revisão final) Regra 4: "faixa 2 do header fixo" → "header, que acompanha a rolagem" (ele é `position: sticky`, não `fixed`). Regra 1: "os dois fundos alternados" → nomeia `--brand-tint` e `--bg-gray`. Base: o token dizia `--lh-tight` (1.15) para o `h1` e a regra de base dava `--lh-heading` (1.2) a todos os títulos → `h1 { line-height: var(--lh-tight) }`.
- (coerência entre seções, revisão final) Par de CTA: a ordem "fantasma à esquerda, sólida à direita" valia só para o hero e o resultado do teste (§5.7) trazia o inverso → uma regra para todo par (baixo compromisso à esquerda, conversão à direita): hero, depoimentos, barra das conversões, wizard e resultado do teste. §5.7: `.btn-primary` "Fazer pré-matrícula" + `.btn-outline` "Encontrar uma unidade" → `.btn-outline` "Encontrar uma unidade" + `.btn-primary` "Fazer pré-matrícula".
- (coerência entre seções, revisão final) Botão "Pausar/Retomar" do carrossel, que não tinha receita → "com a receita das setas". Cookie bar: botões sem raio → `--r-sm`. §8.10: eventos nomeados disparam "depois do aceite". §9: Swiper e revelação de scroll passam a citar `prefers-reduced-motion`. §7: "marca vermelha" → "se a marca for vermelha" (E02); a lista "Corrija no seu projeto" diz que são observações do autor, por inspeção de fora.
- (coerência entre seções, revisão dos exemplos) §3.4: o link "Política de Privacidade" dentro da faixa de CTA saía na cor de link do §1 (`--brand-text-dark`, `#aa1419`) sobre `--brand` (`#d71920`) = 1,43:1 → `.cta-band p a { color: inherit }`, que herda `--on-brand` (5,19:1). §5.1: header de 64 + 79px + borda de 1px somava 144px, e `--header-h` vale 143px → a borda inferior de 1px é a última linha da faixa 2, contada nos 79px.
- (padrão do repositório, A01, A06, A12, P03, P05, C24, P09) §10: "Checklist de entrega", 17 itens, alguns contrariando o corpo → "Checklist de aceite", 23 itens em cinco grupos, todos verificáveis e com os valores do documento: "100–120px de padding (60px no mobile)" → 60px, e 100px em cima e 120px embaixo a partir de 768px; "Header com CTA duplo … 100% das páginas" → header a partir de 1200px, barra fixa de 56px abaixo; "Imagens … `loading="lazy"`" → nunca na imagem do hero, que leva `fetchpriority="high"`; "Widget de Libras e bolha de chat no canto inferior direito" → chat no canto inferior direito acima da cookie bar e da barra, Libras no meio da borda direita; "Cookie bar … + eventos de conversão no GTM" → nenhuma tag antes do aceite; "`prefers-reduced-motion` respeitado" → também no JS; "Montserrat … só nos pesos usados" → variável `wght 400..700`, só 400, 500, 600 e 700 no CSS. Itens novos: breakpoints, contraste ao trocar a marca, SSG/SSR, SEO local, formulários, semântica, foco, scrim.
- (E03, P09) "Aviso de uso": "Substitua `--brand*` pela sua paleta" → "Defina `--brand` com a sua cor (§1.1)"; acrescentou que as afirmações sobre o site analisado são observações do autor e que os itens de LGPD são recomendação técnica.
- (P06) §9: Framer Motion saiu (revelação de scroll em CSS + IntersectionObserver); Montserrat `@fontsource/montserrat` com cinco pesos → variável `wght 400..700` via `@fontsource-variable/montserrat`, `font-display: swap`; VLibras e chat só carregam após a primeira interação. §7: `lazy` em tudo abaixo da dobra, menos na imagem do hero; `width` e `height` em todas.
- (exemplos) `exemplos/home.html` e `exemplos/pagina-de-curso.html` refeitos com a versão 2.0.0: o bloco de tokens e as receitas do §3 e do §4 estão colados sem alteração, e todo texto e todo par de cores foi conferido em Chrome (229 blocos de texto fora de foto e de scrim, nenhum abaixo de 4,5:1, ou 3:1 em texto grande; o texto sobre scrim segue as razões do §7). Saíram os erros herdados da v1: asterisco da faixa de CTA a 1,05:1, botões e placeholders em Arial, faixa de CTA 35px mais larga que o conteúdo, badge a 4,11:1, borda de campo a 1,30:1, foco a 1,28:1, sombra do card sumindo no cinza, datas "2 Outubro, 2026", "Termo de Privacidade", "Teste de classificação", `.8px`, peso 800 no logo, hero de curso com bandeira, eyebrow fora da home. Entraram o que o PRD já exigia: header de 64px e barra das conversões abaixo de 1200px, carrossel com setas, bullets, pausa e `inert`, consentimento na faixa de lead, cookie bar com Recusar e Aceitar iguais, skip link, JSON-LD `Course`. A home mostra as seções 1, 2, 4, 5, 7, 8, 10, 11 e 12 do §5.2 (cortadas: 3, 6 e 9). Capturas refeitas: `home.png` (1440 × 5959), `pagina-de-curso.png` (1440 × 4347) e `capa.png` (1440 × 900).

### Adicionado
- (padrão do repositório) Cabeçalho YAML com os dez campos; seções "Escopo" e "Como usar" (copiar para a raiz do projeto como `PRD-FRONTEND.md`).
- (M01) §1.1 "Como trocar a marca": quatro contrastes a conferir e o ajuste de cada um. Tokens novos `--on-brand` (`#ffffff`; 5,19:1 sobre `--brand`), `--on-brand-dark` (`#ffffff`; 7,44:1 sobre `--brand-dark`), `--brand-text` (= `--brand`; 5,19 sobre branco, 4,65 sobre cinza, 4,70 sobre tint) e `--brand-text-dark` (= `--brand-dark`; 7,44 / 6,67 / 6,74).
- (A03) `--border-input: #6c757d` para limite de campo (4,69:1 sobre branco, 4,21 sobre `--bg-gray`, 4,25 sobre `--brand-tint`; o limiar é 3,0). `--border` (`#dee2e6`, 1,30:1) fica só para divisórias.
- (A08) `--danger: #b3261e` (6,54:1 sobre branco, 5,86 sobre cinza, 5,93 sobre tint) e `--success: #1b6e3a` (6,29 / 5,64 / 5,70).
- (C10) `--input-text: #212529` (15,43:1 sobre branco), que era hex solto na receita de input.
- (C03, C06) `--lh-lead`, `--lh-snug`, `--lh-caption`, `--fs-cta` (título da faixa de CTA, antes 40px fixo), `--fs-ui` (16px de campos e navegação).
- (C09, C24) `--section-tight` (48px, antes literal), `--grid-gap` (32px, antes literal), `--cta-bar-h`, `--cookie-h`.
- (C12, P01, A01, A13, M10) Bloco "BASE" depois dos tokens: `box-sizing: border-box`, `color-scheme: light`, estilos de `body` e títulos, `font: inherit` nos controles, `::placeholder` em `--paragraph` (5,74:1 sobre branco; 5,21 sobre tint, onde o padrão do Chrome dava 4,16) e a regra global de foco.
- (M10) Regra 8: sem tema escuro.
- (C05) Variante `.btn-pill--brand` (sólida da marca) e a tabela de qual par de pílulas usar em cada fundo.
- (M05) Linhas de "Link de navegação" e "Label e texto de campo" na tabela de tipografia.
- (A08) Estados de campo: hover, desabilitado (`--bg-gray` + `--paragraph`, 5,15:1) e erro (borda de 2px `--danger` + ícone + mensagem com `role="alert"`); `autocomplete`, `type` e `<label for>` exigidos. Formulário progressivo: botão "Voltar", gestão de foco, `aria-live`, e os estados erro, enviando, sucesso e falha.
- (P05) Formulário de lead: texto de consentimento com link para a Política de Privacidade e a regra de não gravar nada antes do último passo.
- (M07) Receitas que faltavam: §3.8 badge de idade (`--on-brand-dark` sobre `--brand-dark`, 7,44:1; antes os tokens apontavam para `--brand-light`, 4,11:1), §3.9 acordeão, §3.11 card de modalidade, de depoimento e de unidade, item com ícone, contador, linha do tempo e biblioteca de ícones (Lucide). Passo concluído do stepper. `.card__img` (16:10), `.card__body` (padding de 24px) e `.card--static`.
- (A05) §3.10 Carrossel: setas de 44px, bullets com alvo de 24px, autoplay só no hero (6s, com pausa), `inert` nos slides fora da vista, papéis e rótulos.
- (M08) Foco por dentro no tile e no acordeão, onde o anel externo seria recortado.
- (C09, M07) Receitas de layout `.section__title`, `.grid-cards`, `.grid-cards--4` e `.split`; regra da margem do H2 dentro de coluna.
- (C14) Coluna "CTA de fechamento" (rótulo + variante de botão) em todas as seções da home e blocos da página de curso.
- (A04) Scrim obrigatório no hero: `rgb(0 0 0 / .6)` uniforme abaixo de 768px (branco a 5,74:1 sobre foto branca) e gradiente `.7 → .55 → 0` a partir de 768px, com o texto nos 55% da esquerda (4,74:1 no pior ponto).
- (M05) Header especificado: faixas de 64 + 79px, `position: sticky`, fundo, borda, estilo dos links de navegação, item ativo, "Acesso" como `.btn-outline`, painel do dropdown.
- (M06, M07) Onde o eyebrow é usado (home, seções 3, 4 e 6 a 11).
- (M03) Tabelas de estado da busca de unidade (inicial, carregando, sem resultado, termo inválido, localização negada, falha de rede) e da pré-matrícula (erro, enviando, sucesso com protocolo, falha). Localização só após clique; ordenação e paginação dos resultados; entrada do wizard por `?unidade=`; CEP como atalho no passo 1; resumo para revisão no passo 3; opções de formato, meio e turno.
- (P05) Pré-matrícula: bloco "Responsável" e caixa de autorização desmarcada quando o aluno tem menos de 18 anos; link da Política de Privacidade antes do envio.
- (M02) §5.7 Teste de nível (idioma → 15 questões → dados → resultado) e §5.8 com uma linha por página do menu (Sobre, Blog, E-book, Faça parte, Franqueado, Fale conosco, Política de Privacidade, 404).
- (P04) §5.9 SEO local: URL por unidade, JSON-LD `LanguageSchool` e `Course`, `title`/`description`, canonical, sitemap, `hreflang`.
- (P07, P06, em parte) Hero: um `<h1>` só; imagem do slide 1 com `fetchpriority="high"`, `width` e `height`, sem `lazy`.

### Removido
- (C23) Token `--brand-hero`.
- (C09) Tokens `--section-py`, `--section-py-sm` e `--header-h-mobile`.
- (C17) Peso 800 da Montserrat.
- (C25, P06) Lenis e Framer Motion da stack; o guia dispensa as duas bibliotecas.
- (P03) React + Vite como opção de stack.
- (A01, C27, C12) `outline: none` do input, bandeiras como fundo do hero de curso e margem negativa na receita base da faixa de CTA.

### Decisões para o autor revisar
- (M01) **Derivação das variantes da marca.** Apliquei a opção da auditoria: `color-mix()` com 79%, 42%, 88% e 6%. Os hex resultantes para a marca padrão diferem dos originais em poucos pontos por canal (`#aa1318` → `#aa1419`, `#5a0f14` → `#5a0b0d`, `#fff0f0` → `#fdf1f2`); só `--brand-light` muda de forma visível (`#ed3237` → `#dc353b`). Se os hex originais forem intocáveis, a alternativa é mantê-los fixos e documentar o `color-mix()` só como receita para outras marcas.
- (M01) **Regra de troca de marca.** A auditoria propunha um teste só (branco sobre `--brand`). Ele não basta para marcas de luminância média: com verde `#2eab5b`, por exemplo, o texto escuro reprova sobre `--brand-dark`. Por isso o §1.1 tem quatro conferências e quatro tokens de texto (`--on-brand`, `--on-brand-dark`, `--brand-text`, `--brand-text-dark`). Conferido por cálculo com 13 cores de marca.
- (C23) **`--brand-hero` fundido em `--brand`.** A faixa de CTA fica um pouco menos saturada (`#e00c18` → `#d71920`).
- (C17) **Peso 800 removido.** Alternativa: mantê-lo e dar a ele um uso (números do contador).
- (C16) **Tailwind.** Mantive o formato do v3 (`tailwind.config.js`) apontando para os tokens, em vez de reescrever em `@theme` do v4, porque não pude testar um build do v4 nesta revisão.
- (P05) **LGPD.** O texto de consentimento do formulário de lead, o bloco "Responsável" para menor de 18 anos, a regra de não gravar antes do último passo, as categorias da cookie bar (Necessários / Desempenho / Marketing) e "nenhuma tag antes do aceite" estão escritos como recomendação técnica, com a nota de que não substituem orientação jurídica. Os textos exatos (finalidade, base legal, prazo de resposta da unidade) são do jurídico da escola.
- (A05) **Autoplay.** A auditoria aceitava autoplay com pausa em qualquer carrossel; deixei autoplay só no hero (6s) e cursos e depoimentos sem. Se quiser autoplay nos três, as regras de pausa já valem para todos.
- (C01) **Barra fixa das conversões.** Abaixo de 1200px o site ganha uma barra de 56px no pé da tela. É a solução da auditoria para manter as duas conversões sempre visíveis; custa 56px de tela útil no celular.
- (C13, C21, C27, M02, M05, M11) **Valores que a auditoria sugeriu e o documento não tinha:** alternância de fundo por seção, quatro modalidades em dois eixos, hero de curso sem bandeiras, fluxo do teste de nível (4 etapas, 15 questões), medidas do header (64 + 79px) e faixas etárias sem sobreposição. Números como 9 resultados por vez, 9 posts por página e 720px de coluna de texto são escolhas desta revisão, não observação do site.
- (P03) **Stack.** SSG ou SSR passou a obrigatório (Next.js ou Astro). Um projeto que já nasceu em SPA precisa migrar ou usar pré-renderização.
- (P09, A12) **Libras.** O VLibras ficou como "recomendado", não "praticamente obrigatório". A URL do plugin é a que o autor listou e não foi testada nesta revisão.
- (C25, P06) **Bibliotecas de animação.** Framer Motion e Lenis saíram da stack. Se a escola já usa alguma delas, vale a regra do §6: nada de JS anima com `prefers-reduced-motion: reduce`.

### Achados não aplicados
- (P06, em parte) Fallback de fonte com `size-adjust`: o valor depende da métrica da fonte de reserva e não foi medido. O restante do P06 (imagem do hero com `fetchpriority="high"`, fonte variável auto-hospedada, VLibras e chat após a primeira interação, revelação em CSS) está aplicado.

## 1.0.0
Versão original, arquivada em [original.md](../../auditorias/2026-10-09/site-escola-idiomas/original.md).
