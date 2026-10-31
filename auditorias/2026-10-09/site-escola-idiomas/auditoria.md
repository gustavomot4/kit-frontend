# Auditoria — `fiskuiuxguide.md`

> **Registro histórico.** Auditoria da versão 1.0.0, feita quando o arquivo se chamava `fiskuiuxguide.md`. Essa versão está guardada ao lado, como [original.md](original.md); os números de linha citados aqui são os dela. As telas `mockup-1` e `mockup-2` desta pasta seguem a versão 1.0.0, com os erros apontados. A versão corrigida é [prds/site-escola-idiomas/prd.md](../../../prds/site-escola-idiomas/prd.md) e as mudanças estão no [CHANGELOG](../../../prds/site-escola-idiomas/CHANGELOG.md).

**Documento:** "Guia de UI/UX para Frontends de Escolas de Idiomas" (476 linhas). Os números de linha citados são os do arquivo.
**Data:** 09/10/2026. **Escopo:** coerência interna, padrões, acessibilidade (WCAG 2.2 AA), ambiguidade, erros pontuais.
**Método:** leitura integral; contraste calculado por script com a fórmula de luminância relativa da WCAG (não estimado); medições em Chrome headless (largura de botões, cor de placeholder, espessura de borda, fonte herdada); dois mockups construídos seguindo o guia à risca.

## Resumo e veredito

O guia é bom como inventário de padrões de conversão e de arquitetura de informação para escola de idiomas, mas **não está pronto para ser entregue a um agente como especificação**. Cinco motivos:

1. **Contradiz-se em pontos centrais.** As duas conversões "sempre visíveis" somem no header mobile; a busca de unidade "de primeira classe" não aparece no header nem na home; `--lh-body` vale 1,6 e o corpo é 1,7 em outros quatro lugares.
2. **As receitas de CSS, seguidas ao pé da letra, reprovam na WCAG 2.2 AA.** Verificado por cálculo: foco invisível (1,00 a 1,44:1 nas superfícies da marca), asterisco obrigatório a 1,05:1, borda de input a 1,30:1, texto branco sobre foto sem scrim, títulos que não crescem com zoom de 200%.
3. **"Troque só `--brand-*`" não funciona.** Há vermelho fixo fora dos tokens, nenhuma regra para derivar as cinco variantes e todo texto sobre a marca é `#fff` fixo: com marca clara (amarelo, laranja, verde, ciano) os botões ficam entre 1,4 e 3,0:1.
4. **Omite o que mais expõe o projeto:** LGPD nos formulários (inclusive dados de menores), SEO local, estados de erro/vazio/carregando e o fluxo inteiro da segunda conversão primária (teste de classificação).
5. **Metade do que foi preciso para montar os mockups não está no documento** (26 grupos de decisões listados no fim).

**65 achados: 3 críticos, 18 altos, 25 médios, 19 baixos.** Dos 67 pares de contraste calculados, 35 ficam abaixo de 4,5:1 e 21 abaixo de 3:1 (a maioria em cenários que o guia não protege: foto clara, marca trocada, foco, bordas).

## Como ler a tabela

- **Severidade.** *Crítico*: seguir o guia gera falha objetiva de acessibilidade ou exposição legal, ou inviabiliza o uso declarado do documento. *Alto*: contradição ou omissão em algo central, que leva dois agentes a resultados diferentes ou a defeito visível. *Médio*: inconsistência localizada ou retrabalho. *Baixo*: imprecisão ou polimento.
- **[F]** = fato verificado (lido na linha citada, calculado ou medido). **[J]** = julgamento meu. Um achado pode ter as duas partes.
- A correção é sempre um texto ou valor para colar no guia.

## Achados

### 1. Coerência interna

| ID | Sev. | Categoria | Linha(s) | Problema | Correção proposta |
|---|---|---|---|---|---|
| C01 | alto | Coerência | L15, L18, L335, L457 | **[F]** A regra 4 diz que as duas conversões ficam "sempre visíveis" e o checklist exige "CTA duplo … visível em 100% das páginas"; a regra 7 e o §5.1 mandam o header mobile ter "só logo + hambúrguer". No mobile as duas conversões saem da tela. | Reescrever L18 e L335: "Mobile: header de 64px com hambúrguer, logo e botão `Pré-matrícula` compacto; barra fixa inferior de 56px com `Pré-matrícula` (sólido) e `Teste de classificação` (outline)". Ajustar L457 para o mesmo texto. |
| C02 | alto | Coerência | L16, L431, L322-330, L339-351 | **[F]** Regra 5 e §8.6: a busca de unidade é "navegação, não rodapé" e fica "no topo da navegação". O diagrama do header não tem item de unidades (a busca da faixa 1 é "Pesquisar no site") e a tabela da home não tem seção para isso. | No diagrama, acrescentar na faixa 1 o link `[pino] Encontre uma unidade`. Na tabela 5.2, inserir entre 4 e 5: "Busca de unidade — faixa `.section--tight` com o campo do §5.4 — ancoragem local". |
| C03 | médio | Coerência | L58, L111, L140, L146, L463 | **[F]** `--lh-body: 1.6` contradiz "17px / 1.7" (tabela), `'1.7'` (Tailwind), "17/28.9" e "17px/1.7" (checklist). | `--lh-body: 1.7;` e novo `--lh-lead: 1.6;` para o corpo em destaque (L141). |
| C04 | alto | Coerência | L24, L83, L84, L121-122, L277, L476 | **[F]** "Troque apenas os `--brand-*`", mas a cor da marca está fixa em `--shadow-hover` (`rgba(200,16,46,.14)` = `#c8102e`, um sétimo vermelho que nem é token), `--shadow-brand` (`rgba(215,25,32,.4)`), no anel de foco (`rgba(215,25,32,.15)`) e no config Tailwind. Trocada a marca, sombras e foco continuam vermelhos. | `--shadow-brand: 0 10px 30px 0 color-mix(in srgb, var(--brand) 40%, transparent);` `--shadow-hover: 0 20px 40px -12px rgb(0 0 0 / .12), 0 8px 20px -8px color-mix(in srgb, var(--brand) 14%, transparent);` Foco: ver A01. |
| C05 | alto | Coerência | L154, L175-188, L191, L357 | **[F]** "Três variantes, só isso", mas o par do hero pede "outline branco" + "sólido da marca" em pílula, e as pílulas só existem em branco sólido (`--on-brand`) e fantasma (`--ghost`). Usar `.btn-primary` ao lado mistura raio 6px com 32px. No hero "na cor da marca" (L366) um botão "sólido da marca" some no fundo. | Adicionar `.btn-pill--brand { background: var(--brand); color: var(--on-brand); border-color: var(--brand); }` e reescrever L191: "sobre foto: `.btn-pill--ghost` + `.btn-pill--brand`; sobre fundo da marca: `.btn-pill--ghost` + `.btn-pill--on-brand`". |
| C06 | alto | Coerência | L47-51, L53, L141, L251 | **[F, calculado]** `--fs-hero` e `--fs-section` têm o mesmo mínimo (1.75rem): em viewport ≤ 700px, H1 = H2 = 28px. H3 é 27px fixo. O `h2` da faixa de CTA é 40px fixo, maior que o H1. O subtítulo do hero cai a 16px, abaixo do corpo (17px) e do parágrafo do próprio hero (20px). A hierarquia some no mobile. | `--fs-hero: clamp(2.25rem, 1.4rem + 3.2vw, 3.75rem);` `--fs-section: clamp(1.75rem, 1.2rem + 2.3vw, 3.125rem);` `--fs-hero-sub: clamp(1.125rem, 1rem + .6vw, 1.5625rem);` `--fs-card: clamp(1.375rem, 1.2rem + .6vw, 1.6875rem);` `.cta-band h2 { font-size: clamp(1.5rem, 1rem + 2vw, 2.5rem); }` |
| C07 | médio | Coerência | L147, L463, L50-51, L138-139, L235, L251 | **[F]** "Todo `font-size` de título usa `clamp()`", mas H3 (27px), H4 (20px), `.card__title` (20px) e `.cta-band h2` (40px) são fixos. | Aplicar os clamps de C06 ou trocar L147 por "H1, H2 e subtítulo do hero usam `clamp()`; H3 e H4 são fixos". |
| C08 | médio | Coerência | L18, L92, L252, L303 | **[F]** "Mobile-first de verdade", mas as três media queries do guia são `max-width: 767px` (desktop-first). | Reescrever as três como base mobile + `@media (min-width: 768px)`, ou renomear a regra 7 para "Responsivo de verdade". |
| C09 | médio | Coerência | L64-65, L69-70, L93, L298-299, L303 | **[F]** As receitas ignoram os tokens de layout: `.container` fixa `1320px`/`35px`, então o override `--container-pad: 20px` da L93 não tem efeito (mobile fica com 35px); `.section` fixa `100px 0 120px` e repete a media query; `--section-py-sm` duplica o override da L93 e nunca é usado. O nome `--section-py` engana: o valor inclui o `0` horizontal e não cabe em `padding-block`. | `.container { max-width: var(--container); margin-inline: auto; padding-inline: var(--container-pad); }` `.section { padding-block: var(--section-pt) var(--section-pb); }` com `--section-pt: 100px; --section-pb: 120px;` (60px/60px no mobile). Remover `--section-py-sm`. |
| C10 | médio | Coerência | L455, L40, L137, L159-187, L218-219, L228, L247, L251, L275, L290, L434 | **[F]** O checklist exige "nenhuma cor hardcoded em componente"; as receitas têm 13 ocorrências de `#fff`, mais `#212529`, `#ccc`, `#dee2e6` e `#0e0f11`. O token `--white` nunca é referenciado. | Trocar por `var(--white)`, `var(--border)`, `var(--dark)`; criar `--input-text: #212529;` e `--on-brand: #fff;`. |
| C11 | médio | Coerência | L75-79, L117, L137, L160, L170, L178 | **[F]** `--r-md: 8px` é descrito como raio de "botões", mas `.btn-primary` e `.btn-outline` usam `--r-sm` (6px). A pílula usa `32px` literal em vez de `var(--r-xl)`; o eyebrow usa `30px` (terceiro valor para a mesma forma); `--r-full` nunca é usado. | Comentários: `--r-sm: 6px /* inputs e botões */`, `--r-md: 8px /* badges */`. Pílula e eyebrow: `border-radius: var(--r-full)`. |
| C12 | médio | Coerência | L33, L242, L246-248, L298 | **[F]** A faixa de CTA é chamada de "full-bleed", mas tem `max-width: var(--container)` e raio de 32px: é um card. Sem margem lateral, com 1320px ela fica 35px mais larga de cada lado que o conteúdo do `.container` (1250px úteis) e encosta nas bordas da tela entre 768 e 1320px de viewport. `box-sizing` não é definido em lugar nenhum. | Trocar "full-bleed" por "card largo". `.cta-band { width: min(100% - 2 * var(--container-pad), var(--container) - 2 * var(--container-pad)); }` Acrescentar ao bloco base `*, *::before, *::after { box-sizing: border-box; }`. |
| C13 | médio | Coerência | L306-307, L339-351 | **[F]** O "ritmo de alternância" tem 7 passos e a home tem 11 seções; só a 6 (tint) e a 9 (cinza) têm fundo indicado. Aplicado literalmente, 3-4-5 ficam três brancos seguidos e 7-8 dois — a "monotonia do branco" que a regra quer evitar. | Coluna "Fundo" na tabela 5.2 com um valor por seção. Sugestão: 3 branco, 4 branco, 5 cinza, 6 tint, 7 branco, 8 cinza, 9 branco, 10 tint. |
| C14 | médio | Coerência | L14, L347-349, L359, L361 | **[F]** "Toda seção termina em uma ação", mas os templates não dizem qual ação fecha as seções 7, 8 e 9 da home nem os blocos 3 e 5 da página de curso. | Coluna "CTA de fechamento" (rótulo + variante de botão) nas tabelas 5.2 e 5.3. |
| C15 | baixo | Coerência | L148, L220 | **[F]** "`letter-spacing: 0` em tudo", mas `.course-tile__cta` usa `letter-spacing: .04em`. | Remover da receita, ou trocar L148 por "`letter-spacing: 0`, exceto rótulos de 14px em caixa alta (`.04em`)". |
| C16 | médio | Coerência | L99-125 vs. L29-90 | **[F]** O config Tailwind não espelha os tokens: falta `brand.hero`, `dark`, `border`; nomes diferentes (`--paragraph`→`body`, `--bg-gray`→`surface`, `--fs-body-lg`→`lead`); `rounded-md` continua valendo 6px do Tailwind enquanto `--r-md` é 8px; não há `hero-sub`, `item`, espaçamento nem transições. O trecho começa em `theme:` (não é um arquivo válido). **[J]** O formato é o do Tailwind v3; o v4 configura por `@theme` em CSS. | Gerar o tema a partir dos tokens, com os mesmos nomes: `@theme { --color-brand: var(--brand); --color-brand-dark: var(--brand-dark); … --radius-md: var(--r-md); }`. |
| C17 | baixo | Coerência | L13, L448, L456, L134-142 | **[F]** O peso 800 é carregado ("todos os pesos 400/500/600/700/800") e nenhuma linha da tabela de tipografia ou receita o usa; contradiz "só nos pesos usados". | Remover 800 das três linhas, ou atribuir uso (ex.: números do contador). |
| C18 | baixo | Coerência | L87-89, L181, L334, L392 | **[F]** Durações fora dos tokens: `.18s` nos dropdowns, `.25s` literal na pílula, ".2–.25s" no hover. | Dropdowns: `var(--t-fast)`. Pílula: `var(--t-base)`. L392: "troca de cor em `--t-fast`". |
| C19 | baixo | Coerência | L14, L142, L179, L350 | **[F]** "Opcionalmente `uppercase` nos botões-pílula" na tabela; `text-transform: uppercase` fixo na receita. "SAIBA MAIS" em caixa alta na home e "Saiba Mais" na regra 3, sem dizer qual variante de botão. | "Pílula: sempre caixa alta. `.btn-primary` e `.btn-outline`: caixa de frase." Escrever "Saiba mais" nos dois lugares. |
| C20 | baixo | Coerência | L138, L235 | **[F]** "H3 de card" é 27px na tabela, mas `.card__title` é 20px. Não se sabe se o título do card de blog é `<h3>` com cara de H4. | Renomear a linha da tabela para "H3 de tile/bloco (27px)" e declarar: "`.card__title` é `<h3>` com `--fs-item`". |
| C21 | baixo | Coerência | L359, L374, L430 | **[F]** Modalidades são 4 na página de curso (misturando tamanho de turma com meio), 3 no §8.5 e sem opções no passo 3 do wizard. | Uma lista única usada nos três lugares, em dois eixos: formato (Grupo / Individual) e meio (Presencial / On-line). |
| C22 | baixo | Coerência | L14, L15, L362, L426, L435 | **[F]** A segunda conversão tem quatro nomes: "Teste de classificação", "Fazer Teste", "teste de nível", `iniciou_teste_nivel`. | Padronizar "Teste de nível" (rótulo curto: "Fazer teste") e o evento `iniciou_teste_nivel`. |
| C23 | baixo | Coerência | L30, L32, L33, L366 | **[F]** `--brand-hero` chama-se "hero" mas serve às faixas de CTA; o hero "na cor da marca" não diz qual variável usa. `--brand` e `--brand-hero` são quase idênticos (hsl 358 79% 47% e 357 90% 46%). `--brand-dark` ("títulos escuros") e `--brand-deep` ("títulos de seção") disputam o mesmo papel. | Fundir `--brand-hero` em `--brand`. Comentários: `--brand-dark /* footer, hover, links */`, `--brand-deep /* títulos de seção */`. |
| C24 | médio | Coerência | L412, L433, L434, L470 | **[F]** Três elementos fixos no mesmo canto sem ordem de empilhamento: VLibras "no canto direito" (L412) ou "no canto inferior direito" (L470), chat no canto inferior direito, cookie bar no rodapé. **[J]** Vão se sobrepor e cobrir o elemento em foco (WCAG 2.4.11). | "Cookie bar: `bottom: 0`, altura em `--cookie-h`. Chat: `bottom: calc(var(--cookie-h, 0px) + 24px)`. VLibras: meio da borda direita (posição padrão do plugin)." |
| C25 | baixo | Coerência | L395, L446 | **[F]** O Lenis aparece como comportamento prescrito na tabela do §6 e como "(opcional)" no §9. | L395: "Scroll nativo; Lenis opcional e desligado com `prefers-reduced-motion`". |
| C26 | baixo | Coerência | L264, L376 | **[F]** "Não peça dados pessoais antes de o usuário ter escolhido 'onde'" é escrito como regra geral, mas a faixa de lead pede e-mail, nome e telefone antes de cidade. | L376: acrescentar "no wizard de pré-matrícula". |
| C27 | médio | Coerência | L12, L357 | **[F]** A regra 1 proíbe "paleta multicolorida"; o hero da página de curso pede "bandeira estilizada" como fundo. **[J]** Bandeira não equivale a idioma (inglês: Reino Unido ou EUA?) e texto sobre bandeira multicolorida não tem contraste garantido. | "Fundo do hero interno: ilustração do idioma em tons de `--brand-deep` e `--brand-dark`, com scrim (ver A04). Sem bandeiras." |

### 2. Padrões (CSS, HTML, performance, SEO, LGPD)

| ID | Sev. | Categoria | Linha(s) | Problema | Correção proposta |
|---|---|---|---|---|---|
| P01 | alto | Padrões | L158-173, L269-276 | **[F, medido]** As receitas de botão não definem `display`: como `<a>` (o `text-decoration: none` indica esse uso) o botão é inline e sua caixa de 38px vaza de uma linha de 28,9px. Não definem `font-family`: como `<button>` renderizam em Arial; `.input`/`.select` também (medido nos mockups). Isso quebra a regra 2 ("uma família só"). Faltam ainda `cursor`, `line-height`, `:focus-visible`, `:disabled`; `.btn-outline` não tem `text-decoration` nem `transition`. | Bloco comum: `.btn-primary, .btn-outline { display: inline-flex; align-items: center; justify-content: center; min-height: 44px; font: inherit; font-size: 14px; font-weight: 700; line-height: 1.2; text-decoration: none; cursor: pointer; }` e `.input, .select { font: inherit; font-size: 16px; }`. |
| P02 | médio | Padrões | L169, L272 | **[F, medido]** `border: .8px` vira 1px em tela 1x, 0,8px em 1,25x e 0,5px em 2x. E uma borda de `1px` lida por `getComputedStyle` em tela a 125% retorna "0.8px". **[J]** O valor é quase certamente um artefato da extração feita em Windows a 125%, não uma decisão de design. | `border: 1px solid …` nos dois lugares; apagar o comentário "0.8px, nao 1px". |
| P03 | alto | Padrões | L403, L443, L467 | **[F]** A stack lista "React + Vite" primeiro; o checklist exige "conteúdo legível sem JS" e o §6 alerta para crawlers. Um SPA renderizado no cliente não entrega HTML sem JS. | L443: "Next.js ou Astro com SSG/SSR (obrigatório: a home, os cursos e as unidades precisam sair em HTML)". Remover "React + Vite" como opção. |
| P04 | alto | Padrões | L16, L364-368, L471 | **[F]** O guia chama o negócio de "local" e exige Lighthouse SEO ≥ 90, mas não fala de SEO local: página própria por unidade, dados estruturados, NAP, `title`/`description`, canonical, sitemap, `hreflang` (o wizard tem "País", L372). SEO só aparece no blog (L350) e no alerta de JS. | Novo §5.7: "Cada unidade tem URL própria `/unidades/{uf}/{cidade}/{slug}` com JSON-LD `LanguageSchool` (name, address, geo, telephone, openingHours, url). Páginas de curso com JSON-LD `Course`. Endereço e telefone em texto no footer da unidade. `title` e `meta description` únicos; canonical; sitemap.xml". |
| P05 | crítico | Padrões | L258-264, L373, L434-435 | **[F]** O formulário de lead coleta 5 dados pessoais sob o título "CADASTRE-SE E FIQUE POR DENTRO!" sem finalidade, consentimento ou link de política. "E-mail primeiro porque … já converte o lead sozinho" implica gravar o e-mail antes do envio final. A pré-matrícula coleta nascimento e dados de menor e do responsável sem nenhuma menção a consentimento. As tags (GTM, GA4, Meta, TikTok, Clarity) não são condicionadas ao aceite da cookie bar, e o Clarity grava sessão em páginas com formulário. A cookie bar só tem Recusar/ACEITAR (sem categorias) e dá destaque visual maior ao aceitar. **[J]** Risco de LGPD (arts. 7º, 8º, 9º e 14); validar com o jurídico — isto não é parecer. | Acrescentar ao §3.5: "Abaixo do campo: 'Ao continuar, você concorda em receber contato da {Marca}. [Política de Privacidade]'. Nada é gravado antes do último passo". Ao §5.5: "Se menor de 18: bloco 'Responsável' (nome, e-mail, telefone) + checkbox não marcado 'Sou responsável legal e autorizo o tratamento dos dados do aluno para fins de matrícula'". Ao §8.9-10: "Nenhuma tag dispara antes do aceite (Consent Mode v2); categorias Necessários / Desempenho / Marketing; Recusar e Aceitar com o mesmo peso visual; Clarity com mascaramento de todos os campos". |
| P06 | médio | Padrões | L394, L435, L444-449, L466, L471 | **[J]** "Lighthouse ≥ 90 em Performance" convive mal com o que o guia prescreve: três bibliotecas de animação (Swiper, Framer Motion, Lenis), cinco tags de rastreamento, VLibras, chat, hero com slides desfocados e cinco arquivos de fonte. **[F]** O guia não trata do LCP: L466 manda `loading="lazy"` nas imagens sem excluir a do hero, e não pede `width`/`height`. Não medi Lighthouse. | "Primeiro slide do hero: `<img fetchpriority="high">` sem `lazy`, com `width` e `height`. Fonte: Montserrat variável (`wght 400..700`), auto-hospedada, `font-display: swap` e fallback com `size-adjust`. VLibras e chat só carregam após a primeira interação. Revelação de scroll com CSS + IntersectionObserver, sem Framer Motion." |
| P07 | médio | Padrões | L134, L198-204, L233, L341, L411 | **[F]** A semântica se resume a `<nav aria-label>`. Não há regra de um único `<h1>` (o hero é um carrossel de 4 slides com "H1 hero"), de nível de heading dos cards, de `<button>` vs. `<a>` (Acesso, acordeões, bullets, seta do formulário), de `<header>`/`<main>`/`<footer>` nem de `<time datetime>`. | Ao §7: "Um `<h1>` por página (no carrossel, só o slide 1; os demais usam `<p>` com o mesmo estilo). Seções `<section aria-labelledby>` com `<h2>`; títulos de card `<h3>`. Ação na página = `<button>`; navegação = `<a>`. Landmarks `<header>`, `<main>`, `<footer>`. Datas em `<time datetime>`". |
| P08 | baixo | Padrões | L233 | **[F]** "28 Agosto, 2026" não é formato de data do português brasileiro. | "28 de agosto de 2026" em `<time datetime="2026-08-28">`. |
| P09 | baixo | Padrões | L5, L240, L258, L348, L393, L412, L428, L441 | **[F]** Afirmações sem fonte: "já validados em produção", "o componente mais rentável", "reduz drasticamente o atrito", "alinhada ao que o site usa", VLibras "praticamente obrigatório". Os exemplos "+68 anos", "68+ anos" e "24×" são dados da Fisk e podem ser copiados para outra escola; "6 décadas" não bate com "+68 anos". Não consultei o site da Fisk. **[J]** A LBI (art. 63) exige acessibilidade, não um widget específico. | Trocar por "observado no site analisado; sem dados de conversão". Exemplos com placeholder: `{N}+ anos`, `{prêmio} {N}×`. L412: "recomendado; não substitui a conformidade com a WCAG". |
| P10 | baixo | Padrões | L82, L349 | **[F, calculado]** `--shadow-card` usa cor opaca `#e7e7e7`: sobre `--bg-gray` fica a 1,11:1 e a sombra dos cards some na seção cinza (visível no mockup 1, depoimentos). | `--shadow-card: 0 2px 12px 0 rgb(0 0 0 / .09);` |

### 3. Acessibilidade (WCAG 2.2 AA)

| ID | Sev. | Categoria | Linha(s) | Problema | Correção proposta |
|---|---|---|---|---|---|
| A01 | crítico | Acessibilidade | L277, L420, L158-188 | **[F, calculado]** `.input:focus` remove o outline e põe um anel `rgba(215,25,32,.15)`: 1,28:1 sobre branco e 1,01:1 dentro da faixa de CTA, onde a borda vermelha também some — foco invisível no "componente mais rentável" (2.4.7). `outline: none` apaga o foco em modo de alto contraste. Usa `:focus` e não cobre `.select`. Nenhuma receita de botão tem foco. E L420 manda "anel na cor da marca", que dá 1,44:1 no footer, 1,05:1 na faixa, 1,00:1 no hero da cor da marca e 3,70:1 na cookie bar. | Uma regra global: `:where(a, button, input, select, textarea, summary, [tabindex]):focus-visible { outline: 2px solid var(--white); outline-offset: 0; box-shadow: 0 0 0 4px var(--heading); }` (anel branco por dentro, escuro por fora: funciona em qualquer fundo). Apagar o `outline: none` da L277 e trocar L420 por "anel duplo branco + `--heading`". |
| A02 | alto | Acessibilidade | L247, L261, L279 | **[F, calculado]** O asterisco de obrigatório é `var(--brand)` e o §3.5 o coloca dentro da faixa de CTA, cujo fundo é `--brand-hero`: `#d71920` sobre `#e00c18` = 1,05:1. Fica invisível (visto no mockup 1). Não há `required` nem legenda do asterisco (3.3.2). | `.cta-band .req { color: var(--white); }`; exigir `required` no input e "(obrigatório)" no label em vez de só o asterisco. |
| A03 | alto | Acessibilidade | L272, L290 | **[F, calculado]** A borda de input `--border` (`#dee2e6`) dá 1,30:1 sobre branco, 1,17:1 sobre cinza e 1,18:1 sobre tint. Reprova 1.4.11 (3:1) para o limite do campo. A linha do stepper usa a mesma cor. | Novo token `--border-input: #6c757d;` (4,69:1 sobre branco, 4,21:1 sobre cinza, 4,24:1 sobre tint) em `.input`, `.select` e nos passos futuros do stepper. `--border` fica só para divisórias. |
| A04 | alto | Acessibilidade | L134, L187, L216, L219 | **[F, calculado]** O hero pede "branco sobre imagem" sem scrim: sobre foto de cinza médio dá 3,95:1; a pílula fantasma, 3,07:1. No tile de curso o overlay tem alpha 0,39 no topo de um h3 de uma linha (2,76:1 sobre foto branca) e 0,25 no topo de um h3 de duas linhas (1,82:1; 3,18:1 sobre foto clara `#c0c0c0`). Branco só passa em 4,5:1 com alpha ≥ 0,54 sobre foto branca. | Hero: "scrim obrigatório `linear-gradient(90deg, rgb(0 0 0 / .7) 0%, rgb(0 0 0 / .55) 55%, transparent 100%)`; texto restrito aos 55% da esquerda". Tile: `linear-gradient(to top, rgb(0 0 0 / .8) 0%, rgb(0 0 0 / .55) 50%, transparent 100%)`. |
| A05 | alto | Acessibilidade | L341, L394 | **[F]** Depoimentos e cursos têm "auto-play lento" sem botão de pausa (2.2.2) e sem setas nem bullets, logo sem alternativa ao arrastar (2.5.7). Só o hero tem bullets, sem tamanho (**[J]** o padrão do Swiper é 8px; 2.5.8 pede 24px). Os slides laterais "visíveis e desfocados" continuam focáveis. Autoplay do hero não é definido. | "Todo carrossel: setas anterior/próximo de 44px, bullets com área de 24px, botão pausar/retomar se houver autoplay (mínimo 6s por slide, pausa em hover e foco), `inert` nos slides não ativos, `aria-roledescription="carousel"` e rótulo 'N de M' por slide." |
| A06 | alto | Acessibilidade | L388, L393-395, L397-401 | **[F]** O bloco `prefers-reduced-motion` só encurta `animation`/`transition` de CSS. **[J]** Não alcança o que o guia prescreve em JS: autoplay do Swiper, revelações do Framer Motion, contador de números e Lenis. Não testei as bibliotecas. | Acrescentar: "Com `matchMedia('(prefers-reduced-motion: reduce)')`: Swiper com `autoplay: false`; `<MotionConfig reducedMotion="user">`; contador mostra o valor final; Lenis não é instanciado". No CSS, somar `animation-iteration-count: 1 !important; scroll-behavior: auto !important;`. |
| A07 | alto | Acessibilidade | L334-335 | **[F]** Os dropdowns "aparecem com `opacity` + `translateY`": escondidos só por opacidade, os links seguem focáveis e invisíveis. Não diz se abrem por hover ou clique, nem `aria-expanded`, Esc ou devolução de foco. O side-nav mobile não tem foco preso, fundo inerte nem botão fechar, e não se sabe onde ficam busca, Acesso e CTAs. | "Dropdown = `<button aria-expanded aria-controls>`; painel com `visibility: hidden` quando fechado; abre por clique, Enter e Espaço; Esc fecha e devolve o foco. Side-nav = `<dialog>` modal com botão 'Fechar' de 44px; contém busca, Acesso e os dois CTAs no topo." |
| A08 | alto | Acessibilidade | L256-281, L370-374 | **[F]** Nenhum estado de erro, sucesso ou validação (3.3.1, 3.3.3). Não há tokens semânticos; como a marca é vermelha, o foco (`border-color: var(--brand)`) tem a cara de erro. Sem `autocomplete` (1.3.5), `type`, `for`. O formulário progressivo não tem voltar, gestão de foco ao trocar de campo nem anúncio do passo. **[F, medido]** Com a receita, um `<select disabled>` (cascata do passo 1) só recebe `opacity: .7`: quase igual ao habilitado. | Tokens `--danger: #b3261e; --success: #1b6e3a;`. "Erro: borda 2px `--danger` + ícone + mensagem em `<p id role="alert">` ligada por `aria-describedby`. Campos com `autocomplete` (`email`, `name`, `tel`, `bday`, `address-level2`). Formulário progressivo: botão 'Voltar', foco vai para o novo campo, `aria-live="polite"` anuncia 'Passo 2 de 5'. `.select:disabled { background: var(--bg-gray); color: var(--paragraph); cursor: not-allowed; }`." |
| A09 | alto | Acessibilidade | L47-49, L52, L147 | **[F, calculado]** O termo fluido dos `clamp()` é `vw` puro, que não acompanha o zoom: a 1440px o H1 mede 57,6px; com zoom de 200% continua com 57,6px de tela (0% de aumento) e o H2 cresce 12%. **[J]** É a falha F94 da WCAG (1.4.4). Mínimo em `rem` e máximo em `px` também não fecham: com fonte base de 40px o mínimo (70px) passa do máximo (60px). Corpo e legendas em `px` ignoram a preferência de tamanho de fonte do usuário. | Usar os clamps de C06 (termo fluido `rem + vw`, limites em `rem`). `--fs-body: 1.0625rem; --fs-caption: .875rem; --fs-body-lg: 1.25rem;`. |
| A10 | médio | Acessibilidade | L160, L170, L260, L333, L413 | **[F, medido]** O guia pede alvos de "44px+", mas `.btn-primary` mede 36px como `<button>` e 38 a 44px como `<a>` conforme o `line-height` herdado; `.btn-outline`, 38 a 40px. A seta circular dentro de um input de 44px fica menor que isso. **[J]** O "link sublinhado menor … logo abaixo" do botão tem cerca de 18px de altura colado a outro alvo (2.5.8 pede 24px ou espaçamento). | `min-height: 44px` nas receitas (ver P01). Seta: botão de 44px ao lado do input, não dentro. Link do teste: `padding-block: 6px; font-size: 14px;` e 8px de distância do botão. |
| A11 | médio | Acessibilidade | L178-180, L191 | **[F, medido]** `.btn-pill` tem `white-space: nowrap` e `padding: 15px 40px`; com o rótulo prescrito "Fazer Teste de classificação →" mede 344px. Em viewport de 375px sobram 335px; em 320px, 280px: rolagem horizontal (1.4.10). | `@media (max-width: 575px) { .btn-pill { white-space: normal; padding-inline: 24px; width: 100%; } }` |
| A12 | médio | Acessibilidade | L407-420 | **[F]** O §7 não menciona: `lang="pt-BR"` e `lang` nos trechos em outro idioma (3.1.1/3.1.2 — o próprio template usa KIDS, TEENS, YOUNG ADULTS, L361); skip link (2.4.1); `<title>` por página (2.4.2); estilo de link dentro de texto corrido (1.4.1); foco não encoberto pelo header fixo, cookie bar e chat (2.4.11); valor final do contador para leitor de tela; nome acessível do hambúrguer e do chat. | Acrescentar ao §7 e ao checklist: "`<html lang="pt-BR">` e `lang` em palavras estrangeiras; skip link 'Pular para o conteúdo'; link em texto: `--brand-dark` + sublinhado; `html { scroll-padding-top: var(--header-h); scroll-padding-bottom: 96px; }`; contador com o valor final no HTML; `aria-label` em botões só de ícone". |
| A13 | médio | Acessibilidade | L31, L281, L414 | **[F, calculado]** A linha de contraste do guia cobre 3 pares e erra 1: branco sobre `#d71920` é 5,19:1, não 4,9 (4,96 é o valor de `#e00c18`). Omite os que reprovam: branco sobre `--brand-light` 4,11:1 (indicada para badges de 14px); `--brand-light` como texto 4,11:1; placeholder padrão do Chrome (`#757575`, medido) sobre `--brand-tint` 4,16:1 na busca do header. | Substituir L414 pela tabela desta auditoria. Acrescentar `::placeholder { color: var(--paragraph); opacity: 1; }` e "`--brand-light` não recebe texto branco menor que 24px nem é usada como cor de texto". |
| A14 | baixo | Acessibilidade | L198, L222 | **[F]** A justificativa do `aria-label="Conheça Inglês"` está errada: o link já contém `<h3>Inglês</h3>`, então o nome seria "Inglês CONHEÇA". **[J]** O `aria-label` inverte a ordem do texto visível (2.5.3 recomenda começar pelo rótulo visível). | Remover o `aria-label` do tile, ou usar `aria-label="Inglês — conheça o curso"`. Manter a regra da L410 para links cujo único texto é genérico. |

### 4. Ambiguidade e casos não cobertos

| ID | Sev. | Categoria | Linha(s) | Problema | Correção proposta |
|---|---|---|---|---|---|
| M01 | crítico | Ambiguidade | L6, L24, L29-34, L476 | **[F]** O uso declarado do guia é trocar a marca, e não há regra para derivar `--brand-dark/light/deep/hero/tint` de uma cor nova. O único indício ("tom da marca a 5%") está errado: 5% de `#d71920` sobre branco dá `#fdf4f4`, não `#fff0f0`. **[F, calculado]** Marca clara quebra tudo que usa `#fff` fixo sobre a marca (L159, L185, L247, L251, L288, L380) e a marca como texto (L184, L234, L279, L288): amarelo `#ffd400` 1,43:1; ciano `#00bcd4` 2,30:1; laranja `#f57c00` 2,70:1; verde `#2eab5b` 2,96:1; azul-claro `#1e9be5` 3,05:1. | Bloco de derivação: `--brand-dark: color-mix(in srgb, var(--brand) 79%, black); --brand-deep: color-mix(in srgb, var(--brand) 42%, black); --brand-light: color-mix(in srgb, var(--brand) 88%, white); --brand-tint: color-mix(in srgb, var(--brand) 6%, white); --on-brand: #fff;` Regra: "Se branco sobre `--brand` der menos de 4,5:1, defina `--on-brand: var(--heading)` e use `--brand-deep` onde a marca aparece como texto sobre branco. Confira a tabela de contraste antes de entregar". Trocar todo `color: #fff` sobre a marca por `var(--on-brand)`. |
| M02 | alto | Ambiguidade | L15, L322-330, L432 | **[F]** O "Teste de classificação" é uma das duas conversões primárias e não tem template nem fluxo. Também não há template para Sobre, Blog (lista e post), E-book, Faça Parte, Seja um Franqueado (L432 cita "landing page própria"), Fale Conosco, 404 e Política de Privacidade — todos no menu. | Novo §5.x "Teste de nível": passos (idioma → 15 questões → nome e e-mail → resultado com nível e CTA de pré-matrícula). Para as demais: uma linha por página com blocos e CTA, ou "fora do escopo deste guia". |
| M03 | alto | Ambiguidade | L258-264, L364-368, L370-374 | **[F]** Estados não cobertos. Busca de unidade: vazio, sem resultado, carregando, erro, geolocalização (o título diz "perto de você" e nada especifica pedir localização nem o que fazer se negada), ordenação, paginação. Lead: sucesso e erro; o que o 5º passo faz. Wizard: revisão, sucesso, erro, entrada vinda de "nesta unidade" (L368) — pula o passo 1? —, e por que 5 selects se a outra página busca por CEP. Campos do responsável não são listados. | Tabela "Estado × componente" no §5.4 e §5.5. Mínimo: "Sem resultado: 'Não encontramos unidades para {termo}' + 3 mais próximas + aulas on-line. Geolocalização só após clique em 'Usar minha localização'. Wizard: se vier com `?unidade=`, começa no passo 2; passo 1 aceita CEP como atalho; tela final com protocolo e próximos passos". |
| M04 | médio | Ambiguidade | L311, L314 | **[F]** "Breakpoints usados: 576 / 768 / 992 / 1200 / 1400. Fique nesses", mas só 767 aparece no guia. Não se sabe o que muda nos outros, onde o header vira hambúrguer nem o que é "tablet" na grade 3→2→1. **[F, medido]** No mockup, o menu de 8 itens a 17px mede 935px + 141px do CTA: não cabe abaixo de ~1150px. | Tabela breakpoint × componente. Mínimo: "Header de duas faixas a partir de 1200px; abaixo, header mobile. Grades: 1 coluna < 768; 2 colunas 768–1199; 3 colunas ≥ 1200". |
| M05 | médio | Ambiguidade | L15, L71, L132-142, L320-335 | **[F]** O header não tem: estilo dos links de nav (a tabela de tipografia não tem linha para eles), divisão dos 143px entre as faixas, fundo, borda, largura da busca, estilo do "Acesso ▾", tamanho do "link … menor", estado ativo, nem se é fixo ("fixo no header", L15) e para que serve `--header-h`. | "Faixa 1: 64px; faixa 2: 79px; fundo `--white`; borda inferior 1px `--border`; `position: sticky; top: 0`. Nav: 16px/500 `--heading`, ativo `--brand` 700, gap 28px. Acesso: `.btn-outline`. Link do teste: 14px/600 `--brand-dark` sublinhado." |
| M06 | médio | Ambiguidade | L12, L17, L137-138, L262, L270, L289, L310, L333, L389-390, L394, L433 | **[F]** Termos sem valor: "com parcimônia", "respiro generoso" ("100–120px" é 100 em cima e 120 embaixo), "14–18px", "600–700", "16–25px", "contador discreto", "select em formulário longo: 50px", "ícone cinza, rótulo cinza", "gap: 0 … ou gap: 8px", "carrossel/grade", "link … menor", "~80ms", "overlay escurece" (sem CSS na receita), "auto-play lento", "~56px". | Um valor por item. Ex.: eyebrow 14px; H3 600; `mb` 16px; contador 14px `--white`; cinza do stepper `--border-input`; tiles sem gap; overlay no hover `rgb(0 0 0 / .85)` na base; autoplay 6s; chat 56px. |
| M07 | médio | Ambiguidade | L137, L288-290, L302, L312, L347-349, L358, L361, L368 | **[F]** Componentes citados sem receita: acordeão, badge de idade (os tokens apontam `--brand-light` + `--r-md` + 14px, que com texto branco dá 4,11:1), contador, linha do tempo, card de depoimento, card de unidade, item com ícone, passo concluído do stepper, dropdown, side-nav, cookie bar, bullets. O eyebrow (L137) e `.section--tight` (L302) são definidos e nunca usados em template. Não há biblioteca de ícones, alinhamento dos títulos de seção, padding de card nem proporção de imagem. | Uma receita por componente no §3 (mesmo formato de 3.1 a 3.6). Badge: `background: var(--brand-dark); color: var(--on-brand)` (7,46:1). Ícones: Lucide, traço 2px, 24px. Títulos de seção alinhados à esquerda; card com padding de 24px; imagem de card 16:10. |
| M08 | médio | Ambiguidade | L77, L207-220, L310 | **[F]** Tile de curso: sem raio, embora `--r-lg` valha para "cards, imagens"; sem quantidade por linha; `transition: transform` no tile sem nenhum transform (código morto, L210). **[J]** Nome longo ("Português para Estrangeiros" a 27px em 250px úteis) quebra em 2 ou 3 linhas e sai da zona escura do overlay. | "Tiles sem raio, encostados; 4 por vez a partir de 1200px (largura 298px), 2 no tablet, 1,2 no mobile. `h3` com `font-size: clamp(1.25rem, 1rem + .9vw, 1.6875rem)` e no máximo 2 linhas." Remover a `transition` da L210. |
| M09 | médio | Ambiguidade | L246, L362 | **[F]** A `.cta-band` carrega `margin: -40px auto 0` ("invade o hero") na receita base; usada como "faixa final" da página de curso, invade a seção anterior. **[F, verificado no mockup]** Sem `position` e `z-index` ela fica atrás de um carrossel com `transform`. | Tirar a margem negativa da base e criar `.cta-band--overlap { margin-top: -40px; position: relative; z-index: 2; }` só para a home. |
| M10 | baixo | Ambiguidade | (ausente) | **[F]** Tema escuro não é mencionado; um agente pode inventar um. | Uma linha no §0: "Sem tema escuro. Declarar `color-scheme: light`." |
| M11 | baixo | Ambiguidade | L358 | **[F]** As faixas etárias do exemplo se sobrepõem: "A partir de 11 anos" inclui "Acima de 15 anos". | `4 a 10 anos`, `11 a 14 anos`, `15 anos ou mais`. |

### 5. Erros pontuais

| ID | Sev. | Categoria | Linha(s) | Problema | Correção proposta |
|---|---|---|---|---|---|
| E01 | baixo | Erro pontual | L380, L434 | **[F]** "Termo de Privacidade" no footer e "política" na cookie bar. | "Política de Privacidade" nos dois. |
| E02 | baixo | Erro pontual | L12, L261, L279, L281 | **[F]** Um guia que manda trocar a marca descreve a cor pelo nome: "vermelho + branco", "asterisco vermelho", "rosa muito claro". | "cor da marca", "asterisco na cor da marca", "tint da marca". |
| E03 | baixo | Erro pontual | L6, L24, L476 | **[F]** A instrução central aparece em três formas: troque "`--brand`" (uma variável), "os `--brand-*`", "`--brand*`". | Uma forma só: "defina `--brand`; as demais são derivadas (ver M01)". |

Os erros numéricos estão nos achados em que pesam: "≈ 4.9:1" (A13), "tom da marca a 5%" (M01), ".8px" (P02), "100–120px" (M06).

**Verificado e sem problema:** a "escala de 6 passos" tem de fato seis variáveis (L60-62) — o problema é que só uma receita a usa (`gap: var(--space-4)`, L249) e ela pula de 1.5rem para 2.5rem, sem os 2rem (32px) que o próprio guia pede no gap das grades (L311). Os breakpoints citados (L314) e o `767px` das media queries são compatíveis. O footer é `--brand-dark` em todas as menções que citam a variável (L30, L378, L414). A URL do VLibras (L449) coincide com a que conheço do plugin oficial, mas não a testei nesta sessão.

### Contagem

| Severidade | Qtde | IDs |
|---|---|---|
| Crítico | 3 | P05, A01, M01 |
| Alto | 18 | C01, C02, C04, C05, C06, P01, P03, P04, A02, A03, A04, A05, A06, A07, A08, A09, M02, M03 |
| Médio | 25 | C03, C07, C08, C09, C10, C11, C12, C13, C14, C16, C24, C27, P02, P06, P07, A10, A11, A12, A13, M04, M05, M06, M07, M08, M09 |
| Baixo | 19 | C15, C17, C18, C19, C20, C21, C22, C23, C25, C26, P08, P09, P10, A14, M10, M11, E01, E02, E03 |
| **Total** | **65** | |

## Tabela de contraste

Calculada por script (`contraste.js` e `tabela.js`, no scratchpad) com a luminância relativa da WCAG 2.x; cores com alfa compostas sobre o fundo antes do cálculo. "Texto grande" = 24px, ou 18,66px em negrito. Texto de 14px em negrito **não** é grande.

<!-- CONTRASTE:INICIO -->
#### A. Neutros sobre fundos claros

| Par (texto ou 1º plano → fundo) | Hex | Razão | AA texto normal (4,5) | AA texto grande / UI (3,0) | Onde / observação |
|---|---|---|---|---|---|
| `--paragraph` → `--white` | `#666666` / `#ffffff` | 5,74:1 | passa | passa | corpo (L140) |
| `--paragraph` → `--bg-gray` | `#666666` / `#f2f3ef` | 5,15:1 | passa | passa | corpo em `.section--gray` (L301) |
| `--paragraph` → `--brand-tint` | `#666666` / `#fff0f0` | 5,19:1 | passa | passa | corpo em `.section--tint` (L300) |
| `--heading` → `--white` | `#04000b` / `#ffffff` | 20,79:1 | passa | passa | H3/H4 (L138-139) |
| `--heading` → `--bg-gray` | `#04000b` / `#f2f3ef` | 18,66:1 | passa | passa |  |
| `--heading` → `--brand-tint` | `#04000b` / `#fff0f0` | 18,79:1 | passa | passa |  |
| `#212529` (texto de input) → `--white` | `#212529` / `#ffffff` | 15,43:1 | passa | passa | L275 |
| `#212529` (texto de input) → `--brand-tint` | `#212529` / `#fff0f0` | 13,94:1 | passa | passa | busca do header (L281) |
| `--white` → `--dark` | `#ffffff` / `#0e0f11` | 19,18:1 | passa | passa | cookie bar (L434); cor do texto não é especificada |

#### B. Branco sobre cada `--brand-*`

| Par (texto ou 1º plano → fundo) | Hex | Razão | AA texto normal (4,5) | AA texto grande / UI (3,0) | Onde / observação |
|---|---|---|---|---|---|
| `--white` → `--brand` | `#ffffff` / `#d71920` | 5,19:1 | passa | passa | `.btn-primary` (L159). O guia diz 4,9 (L414) |
| `--white` → `--brand-dark` | `#ffffff` / `#aa1318` | 7,46:1 | passa | passa | footer (L380), hover (L164, L173). O guia diz 7,4 |
| `--white` → `--brand-light` | `#ffffff` / `#ed3237` | 4,11:1 | **reprova** | passa | badges (L31) — cor do texto não especificada; 14px bold não é "texto grande" |
| `--white` → `--brand-deep` | `#ffffff` / `#5a0f14` | 13,88:1 | passa | passa | não prescrito; referência |
| `--white` → `--brand-hero` | `#ffffff` / `#e00c18` | 4,96:1 | passa | passa | `.cta-band` (L247, L251); `.btn-pill--on-brand:hover` (L185) |

#### C. Cores de marca como texto sobre os fundos claros

| Par (texto ou 1º plano → fundo) | Hex | Razão | AA texto normal (4,5) | AA texto grande / UI (3,0) | Onde / observação |
|---|---|---|---|---|---|
| `--brand` → `--white` | `#d71920` / `#ffffff` | 5,19:1 | passa | passa | `.card__tag` (L234), rótulo do stepper (L288), `.btn-pill--on-brand` (L184), asterisco (L279) |
| `--brand` → `--bg-gray` | `#d71920` / `#f2f3ef` | 4,65:1 | passa | passa |  |
| `--brand` → `--brand-tint` | `#d71920` / `#fff0f0` | 4,69:1 | passa | passa |  |
| `--brand-dark` → `--white` | `#aa1318` / `#ffffff` | 7,46:1 | passa | passa | `.btn-outline` (L168), `.card__link` (L236) |
| `--brand-dark` → `--bg-gray` | `#aa1318` / `#f2f3ef` | 6,69:1 | passa | passa |  |
| `--brand-dark` → `--brand-tint` | `#aa1318` / `#fff0f0` | 6,74:1 | passa | passa |  |
| `--brand-deep` → `--white` | `#5a0f14` / `#ffffff` | 13,88:1 | passa | passa | título de seção H2 (L136) |
| `--brand-deep` → `--bg-gray` | `#5a0f14` / `#f2f3ef` | 12,45:1 | passa | passa |  |
| `--brand-deep` → `--brand-tint` | `#5a0f14` / `#fff0f0` | 12,54:1 | passa | passa |  |
| `--brand-light` → `--white` | `#ed3237` / `#ffffff` | 4,11:1 | **reprova** | passa | "acentos" (L31) |
| `--brand-light` → `--bg-gray` | `#ed3237` / `#f2f3ef` | 3,69:1 | **reprova** | passa |  |
| `--brand-light` → `--brand-tint` | `#ed3237` / `#fff0f0` | 3,71:1 | **reprova** | passa |  |
| `--brand-hero` → `--white` | `#e00c18` / `#ffffff` | 4,96:1 | passa | passa | não prescrito como texto; referência |
| `--brand-hero` → `--bg-gray` | `#e00c18` / `#f2f3ef` | 4,45:1 | **reprova** | passa |  |
| `--brand-hero` → `--brand-tint` | `#e00c18` / `#fff0f0` | 4,48:1 | **reprova** | passa |  |

#### D. Marca sobre marca e sobre escuro

| Par (texto ou 1º plano → fundo) | Hex | Razão | AA texto normal (4,5) | AA texto grande / UI (3,0) | Onde / observação |
|---|---|---|---|---|---|
| `--brand` (asterisco `.req`) → `--brand-hero` | `#d71920` / `#e00c18` | 1,05:1 | **reprova** | **reprova** | asterisco do label dentro da faixa de CTA (L261 + L279 + L247) |
| `--brand` (anel de foco) → `--brand-hero` | `#d71920` / `#e00c18` | 1,05:1 | **reprova** | **reprova** | "anel na cor da marca" (L420) na faixa de CTA |
| `--brand` (anel de foco) → `--brand-dark` | `#d71920` / `#aa1318` | 1,44:1 | **reprova** | **reprova** | L420 no footer (L378) |
| `--brand` (anel de foco) → `--brand` | `#d71920` / `#d71920` | 1,00:1 | **reprova** | **reprova** | L420 no hero "na cor da marca" (L366) |
| `--brand` (anel de foco) → `--dark` | `#d71920` / `#0e0f11` | 3,70:1 | **reprova** | passa | L420 na cookie bar (L434) |
| `--brand` (anel de foco) → `--white` | `#d71920` / `#ffffff` | 5,19:1 | passa | passa | L420 sobre branco |
| `--brand` (botão ACEITAR) → `--dark` | `#d71920` / `#0e0f11` | 3,70:1 | **reprova** | passa | limite do botão na cookie bar (L434) |

#### E. Elementos não textuais (o limiar que vale é 3,0 — WCAG 1.4.11)

| Par (texto ou 1º plano → fundo) | Hex | Razão | AA texto normal (4,5) | AA texto grande / UI (3,0) | Onde / observação |
|---|---|---|---|---|---|
| `--border` (borda de input) → `--white` | `#dee2e6` / `#ffffff` | 1,30:1 | **reprova** | **reprova** | L272 — limite do campo (1.4.11) |
| `--border` (borda de input) → `--bg-gray` | `#dee2e6` / `#f2f3ef` | 1,17:1 | **reprova** | **reprova** |  |
| `--border` (borda de input) → `--brand-tint` | `#dee2e6` / `#fff0f0` | 1,18:1 | **reprova** | **reprova** | busca do header (L281) |
| `#dee2e6` (linha do stepper) → `--white` | `#dee2e6` / `#ffffff` | 1,30:1 | **reprova** | **reprova** | L290 — passos futuros |
| anel de foco `rgba(215,25,32,.15)` → `--white` | `#f9ddde` / `#ffffff` | 1,28:1 | **reprova** | **reprova** | L277 |
| anel de foco `rgba(215,25,32,.15)` → `--brand-tint` | `#f9d0d1` / `#fff0f0` | 1,27:1 | **reprova** | **reprova** | L277 + L281 |
| anel de foco `rgba(215,25,32,.15)` → `--brand-hero` | `#df0e19` / `#e00c18` | 1,01:1 | **reprova** | **reprova** | L277 no input da faixa de CTA (L260) |
| borda em foco `--brand` × borda em repouso `--border` | `#d71920` / `#dee2e6` | 3,98:1 | **reprova** | passa | L277 — mudança de estado (0,8px de espessura) |
| `#ccc` (borda do eyebrow) → `--white` | `#cccccc` / `#ffffff` | 1,61:1 | **reprova** | **reprova** | L137 — decorativa, não exigida |
| `--shadow-card #e7e7e7` → `--white` | `#e7e7e7` / `#ffffff` | 1,24:1 | **reprova** | **reprova** | L82 — decorativa |
| `--shadow-card #e7e7e7` → `--bg-gray` | `#e7e7e7` / `#f2f3ef` | 1,11:1 | **reprova** | **reprova** | L82 — cards na seção cinza (L349): a sombra some |

#### F. Placeholder e desabilitado

| Par (texto ou 1º plano → fundo) | Hex | Razão | AA texto normal (4,5) | AA texto grande / UI (3,0) | Onde / observação |
|---|---|---|---|---|---|
| placeholder padrão do Chrome → `--white` | `#757575` / `#ffffff` | 4,61:1 | passa | passa | medido: `rgb(117,117,117)`; o guia não define `::placeholder` |
| placeholder padrão do Chrome → `--brand-tint` | `#757575` / `#fff0f0` | 4,16:1 | **reprova** | passa | busca do header (L281) |
| select `disabled` com a receita (texto `#212529` a 70%) → `--white` | `#646669` / `#ffffff` | 5,74:1 | passa | passa | medido: o navegador só aplica `opacity:.7` (L269-276 + L372). Isento de contraste, mas quase igual ao habilitado |

#### G. Texto sobre foto (depende da imagem; casos calculados)

| Par (texto ou 1º plano → fundo) | Hex | Razão | AA texto normal (4,5) | AA texto grande / UI (3,0) | Onde / observação |
|---|---|---|---|---|---|
| tile: "CONHEÇA" (branco, `opacity:.9`) → overlay sobre foto branca | `#efefef` / `#616161` | 5,39:1 | passa | passa | L216, L220 — a ~12% da altura (alpha 0,62) |
| tile: h3 branco → overlay sobre foto branca, topo de 1 linha | `#ffffff` / `#9c9c9c` | 2,76:1 | **reprova** | **reprova** | L216, L219 — a ~33% da altura (alpha 0,39) |
| tile: h3 branco → overlay sobre foto branca, topo de 2 linhas | `#ffffff` / `#c0c0c0` | 1,82:1 | **reprova** | **reprova** | a ~46% da altura (alpha 0,25) — "Português para Estrangeiros" |
| tile: h3 branco → overlay sobre foto clara `#c0c0c0`, topo de 2 linhas | `#ffffff` / `#909090` | 3,18:1 | **reprova** | passa |  |
| tile: h3 branco → overlay sobre foto cinza médio `#808080`, topo de 1 linha | `#ffffff` / `#4e4e4e` | 8,31:1 | passa | passa |  |
| hero: H1 branco → foto cinza médio `#808080`, sem scrim | `#ffffff` / `#808080` | 3,95:1 | **reprova** | passa | L134 — o guia não prescreve scrim no hero |
| hero: H1 branco → foto clara `#c0c0c0`, sem scrim | `#ffffff` / `#c0c0c0` | 1,82:1 | **reprova** | **reprova** |  |
| pílula ghost: branco → `rgba(255,255,255,.15)` sobre foto `#808080` | `#ffffff` / `#939393` | 3,07:1 | **reprova** | passa | L187 |
| pílula ghost: branco → `rgba(255,255,255,.15)` sobre foto escura `#333` | `#ffffff` / `#525252` | 7,86:1 | passa | passa | L187 ("sobre imagem escura") |
| pílula ghost hover: branco → `rgba(255,255,255,.28)` sobre foto escura `#333` | `#ffffff` / `#6c6c6c` | 5,24:1 | passa | passa | L188 |

Para texto branco passar em 4,5:1 o fundo precisa ter luminância relativa ≤ 0,183 (cinza `#777` ou mais escuro); para 3:1, ≤ 0,300 (cinza `#959595`). Sobre foto branca isso exige overlay preto com alpha ≥ 0,54.

#### H. Troca de marca (o que acontece com `color:#fff` fixo nas receitas)

| Par (texto ou 1º plano → fundo) | Hex | Razão | AA texto normal (4,5) | AA texto grande / UI (3,0) | Onde / observação |
|---|---|---|---|---|---|
| `#fff` ↔ amarelo `#ffd400` como `--brand` | `#ffffff` / `#ffd400` | 1,43:1 | **reprova** | **reprova** | vale nos dois sentidos: texto branco sobre a marca (L159, L247, L380) e marca como texto sobre branco (L184, L234, L288) |
| `#fff` ↔ ciano `#00bcd4` como `--brand` | `#ffffff` / `#00bcd4` | 2,30:1 | **reprova** | **reprova** | vale nos dois sentidos: texto branco sobre a marca (L159, L247, L380) e marca como texto sobre branco (L184, L234, L288) |
| `#fff` ↔ laranja `#f57c00` como `--brand` | `#ffffff` / `#f57c00` | 2,70:1 | **reprova** | **reprova** | vale nos dois sentidos: texto branco sobre a marca (L159, L247, L380) e marca como texto sobre branco (L184, L234, L288) |
| `#fff` ↔ verde `#2eab5b` como `--brand` | `#ffffff` / `#2eab5b` | 2,96:1 | **reprova** | **reprova** | vale nos dois sentidos: texto branco sobre a marca (L159, L247, L380) e marca como texto sobre branco (L184, L234, L288) |
| `#fff` ↔ azul-claro `#1e9be5` como `--brand` | `#ffffff` / `#1e9be5` | 3,05:1 | **reprova** | passa | vale nos dois sentidos: texto branco sobre a marca (L159, L247, L380) e marca como texto sobre branco (L184, L234, L288) |
| `#fff` ↔ azul `#1565c0` como `--brand` | `#ffffff` / `#1565c0` | 5,75:1 | passa | passa | vale nos dois sentidos: texto branco sobre a marca (L159, L247, L380) e marca como texto sobre branco (L184, L234, L288) |
| `#fff` ↔ roxo `#6a1b9a` como `--brand` | `#ffffff` / `#6a1b9a` | 9,39:1 | passa | passa | vale nos dois sentidos: texto branco sobre a marca (L159, L247, L380) e marca como texto sobre branco (L184, L234, L288) |

#### I. Valores propostos nas correções (conferência)

| Par (texto ou 1º plano → fundo) | Hex | Razão | AA texto normal (4,5) | AA texto grande / UI (3,0) | Onde / observação |
|---|---|---|---|---|---|
| borda de input proposta `#6c757d` → `--white` | `#6c757d` / `#ffffff` | 4,69:1 | passa | passa | A03 — não textual, vale o limiar 3,0 |
| borda de input proposta `#6c757d` → `--bg-gray` | `#6c757d` / `#f2f3ef` | 4,21:1 | **reprova** | passa | A03 — não textual, vale o limiar 3,0 |
| borda de input proposta `#6c757d` → `--brand-tint` | `#6c757d` / `#fff0f0` | 4,24:1 | **reprova** | passa | A03 — não textual, vale o limiar 3,0 |
| placeholder proposto `--paragraph` → `--brand-tint` | `#666666` / `#fff0f0` | 5,19:1 | passa | passa | A13 |
| anel de foco proposto: `--heading` → `--white` | `#04000b` / `#ffffff` | 20,79:1 | passa | passa | A01 (anel externo escuro) |
| anel de foco proposto: `--white` → `--brand-dark` | `#ffffff` / `#aa1318` | 7,46:1 | passa | passa | A01 (anel interno branco no footer) |
| anel de foco proposto: `--white` → `--brand-hero` | `#ffffff` / `#e00c18` | 4,96:1 | passa | passa | A01 (anel interno branco na faixa) |
| badge proposto: `--white` → `--brand-dark` | `#ffffff` / `#aa1318` | 7,46:1 | passa | passa | M07 |
| tile com overlay proposto (alpha 0,57 a 46%): branco → foto branca | `#ffffff` / `#6e6e6e` | 5,13:1 | passa | passa | A04 |
| hero com scrim proposto (alpha 0,55): branco → foto branca | `#ffffff` / `#737373` | 4,76:1 | passa | passa | A04 |

<!-- CONTRASTE:FIM -->

## Pontos a melhorar (só o que tem ganho concreto)

1. **Fechar as três falhas críticas primeiro** (P05, A01, M01): são as únicas em que seguir o guia expõe o projeto.
2. **Tornar os tokens a única fonte de valor.** Hoje as receitas repetem números (C09, C10, C11, C18) e o Tailwind diverge (C16). Com as receitas referenciando só `var(--…)`, trocar a marca ou o espaçamento vira uma edição em um lugar.
3. **Acrescentar três colunas à tabela da home** (fundo, CTA de fechamento, componente): resolve C13, C14 e parte de M07 sem texto novo.
4. **Completar o §3 com as receitas que faltam** (M07) e um bloco de estados (`:hover`, `:focus-visible`, `:disabled`, erro) por componente.
5. **Trocar a linha de contraste da L414 por uma tabela gerada** e pôr no checklist "todos os pares texto/fundo ≥ 4,5:1 após trocar a marca".
6. **Separar o que é observação do site do que é regra.** Frases como "o componente mais rentável" e os números da Fisk (P09) devem virar exemplos com placeholder.
7. **Reduzir a stack** (P03, P06): SSG obrigatório, uma biblioteca de carrossel, revelação de scroll em CSS, sem Lenis.

## O que está bom

- **Arquitetura de informação do domínio.** Segmentar por idade antes de tudo (L358, L429), modalidade explícita (L430), escada ler → experimentar → converter (L426), unidade como passo 1 do wizard com a justificativa de roteamento (L376), dropdown "Acesso" por perfil (L331-332). É conhecimento específico que um agente não teria.
- **Alerta sobre conteúdo invisível quando a revelação depende de JS** (L403), com item correspondente no checklist (L467).
- **Movimento contido e com regra clara**: hover só troca cor, "nunca escala nem pula" (L392); entrada uma vez só (L388); `prefers-reduced-motion` presente (L397-401), ainda que incompleto.
- **Detalhes de acessibilidade que guias costumam esquecer**: `aria-label` em link de texto genérico (L410), `alt=""` em imagem decorativa (L222), nome para cada `<nav>` (L411), 16px em inputs por causa do zoom do iOS (L274), cookie bar sem modal (L434).
- **Seção "Corrija no seu projeto"** (L416-420): o guia separa o que copiar do que não copiar.
- **Contrastes de base passam**: `#666` sobre os três fundos claros (5,15 a 5,74:1), títulos (≥ 12,45:1), branco sobre `--brand`, `--brand-dark` e `--brand-hero` (4,96 a 7,46:1).
- **Checklist de entrega verificável** (L455-471) e aviso de propriedade de marca (L475-476).

## Decisões que precisei tomar por omissão do documento

Cada item abaixo é algo que o guia não diz e que tive de escolher para montar os mockups. Dois agentes escolheriam diferente.

**Base e tokens**
1. `box-sizing: border-box` global — não definido; muda a largura útil do `.container` (1250px) e o alinhamento da faixa de CTA (C12).
2. `line-height` do corpo: usei 1,7 (tabela, Tailwind, checklist) contra o token `--lh-body: 1.6` (C03).
3. Não apliquei reset de fonte em controles, porque o guia não traz nenhum: inputs e `<button>` ficaram em Arial (P01).

**Header**
4. Alturas das faixas (65 + 78px), fundo branco, borda de 1px `--border`, largura máxima da busca (560px), cor do ícone de lupa.
5. Links de nav: 17px/500 `--heading`, gap 28px, item ativo em `--brand` 700 (não há linha na tabela de tipografia).
6. "Acesso ▾": usei `.btn-outline` em um `<button>`.
7. Link "Teste de classificação" "menor": 12px/600 `--brand-dark` sublinhado, 2px abaixo do botão (abaixo do menor token, 14px).
8. Busca de unidade no header: criei o link "Encontre uma unidade" com pino na faixa 1, porque a regra 5 exige e o diagrama não tem (C02).
9. Logo: marca fictícia em texto, peso 800 (único uso do peso 800 nas duas páginas).

**Home (mockup 1)**
10. Hero: tamanho do slide (1120 × 560px), raio de 20px, texto à esquerda, espaçamentos entre H1, subtítulo, parágrafo e CTAs, representação estática do coverflow (escala 0,86, blur 4px, rotação 12°).
11. Hero sem scrim, porque o guia não prescreve; usei ilustração escura porque a L186 fala em "imagem escura". Com foto clara o texto não passaria (A04).
12. Par de CTA do hero: `.btn-pill--ghost` + uma pílula sólida que tive de criar (`.btn-pill--brand`) (C05). A seta "→" virou ícone SVG.
13. Bullets: 10px, brancos, 60px acima da base do slide para não ficarem sob a faixa de CTA que invade o hero.
14. Faixa de CTA: `position: relative; z-index: 3` (sem isso some atrás do carrossel, M09); largura do formulário (400px); botão-seta de 36px em `--brand-dark` dentro do input; contador 14px branco; placeholder; título próprio.
15. Busca de unidade na home: criei uma faixa `.section--tight` depois de Cursos, com título em 27px/700 em vez do H2 de 50px. O template da home não tem essa seção (C02).
16. Seções mantidas: 1, 2, 4, 6, 7, 9, 10, 11 e a busca de unidade. Cortei 3 (Sobre), 5 (Recursos digitais) e 8 (Linha do tempo) por altura — a página já passa de 5.800px. O guia só diz qual é o esqueleto mínimo (L353).
17. Eyebrow acima de cada H2 (14px, 16px de margem): o guia define o estilo e não diz onde usar.
18. Títulos de seção alinhados à esquerda; nas seções de duas colunas o H2 fica na coluna de texto, com os 60px de margem que o guia manda.
19. Cursos: quadro estático de carrossel com tiles de 298px, sem gap, sem raio, 4 inteiros e o 5º cortado, sem setas nem bullets (o guia não prescreve controles — A05).
20. CTA de fechamento de cada seção (C14): Viagens "Conheça!" (outline), Por que nós "Saiba Mais" (outline), Depoimentos com o par outline + primário, Blog "SAIBA MAIS" (outline, em caixa alta como na L350).
21. Contadores (50px/700 `--brand`, 4 colunas com divisória), itens com ícone (círculo de 56px em tint, ícone próprio em traço de 2px), card de depoimento (padding 32px, aspas, avatar com iniciais), card de blog (imagem 5:3, padding 24px, espaçamentos).
22. Footer: grade de 1,4fr + 4 colunas, links em 17px, padding 56/24px, CTAs repetidos como links na coluna "Faça parte"; sem endereço nem redes sociais (o guia não menciona).
23. Widgets fixos: ordem de empilhamento (cookie bar de 76px → chat de 56px → Libras de 48px), texto e altura da cookie bar (C24). Reservei 76px no fim da página para a barra não cobrir o copyright na captura.

**Página de curso (mockup 2)**
24. Hero interno: "bandeira estilizada" virou a bandeira do Reino Unido com máscara, sobre azul-marinho — o que contradiz a regra 1 (C27). Padding do hero igual ao de `.section`. Alternância de fundo (branco, tint, branco, cinza): o ritmo da L307 só vale para a home.
25. Blocos por idade como cards com imagem; badge em `--brand-light` com texto branco 14px/700 e raio de 8px (o que os comentários dos tokens indicam; 4,11:1 — M07); títulos "Voga Kids / Teens / Adults"; H3 em 27px/600.
26. Modalidades como 4 cards com ícone; metodologia em duas colunas com 2 cards; acordeão inteiro (painel branco, raio 20px, cabeçalho 20px/600 em caixa alta, chevron, lista de níveis); CTA "Fazer Pré-matrícula" depois dos acordeões; faixa final dentro de um bloco branco com 48px de respiro, com texto próprio.

### Erros do guia mantidos de propósito nos mockups

Para a imagem mostrar o que o guia produz, não o que eu faria:

| O que se vê | Onde | Achado |
|---|---|---|
| Asterisco de obrigatório invisível antes de "E-mail" | mockup 1, faixa de CTA | A02 |
| Placeholders e os botões "Acesso", "Buscar unidade", "Recusar", "ACEITAR" em Arial | os dois mockups | P01 |
| Faixa de CTA 35px mais larga que o conteúdo de cada lado | os dois mockups | C12 |
| 60px entre o H2 e o parágrafo mesmo dentro de coluna | mockup 1, Viagens | L66, L136 |
| Sombra dos cards quase invisível sobre o cinza | mockup 1, Depoimentos | P10 |
| Título "Francês" mais fraco que os outros sobre foto clara | mockup 1, Cursos | A04 |
| Datas como "2 Outubro, 2026" | mockup 1, Blog | P08 |
| Link "Teste de classificação" em 12px colado ao botão | header | A10 |
| Badge branco sobre `--brand-light` (4,11:1) e faixas etárias sobrepostas | mockup 2, fases da vida | M07, M11 |
| Hero em azul, vermelho e branco num site de "uma cor só" | mockup 2 | C27 |
| "Termo de Privacidade" no footer e "Política de Privacidade" na cookie bar | os dois mockups | E01 |
| Bordas de input quase invisíveis (`#dee2e6`, 1px em tela 1x) | header, busca de unidade | A03, P02 |

## O que não foi verificado

- **O site da Fisk não foi consultado.** Não confirmei se os valores "reais" (L24) batem, nem "+68 anos", "24×" ou "validados em produção".
- **Lighthouse e peso de bibliotecas e fontes não foram medidos** (P06 é julgamento).
- **Swiper, Framer Motion e Lenis não foram testados** com `prefers-reduced-motion` (A06 se baseia no funcionamento documentado dessas bibliotecas).
- **Sem teste com leitor de tela nem navegação por teclado**: os mockups são estáticos, sem JS.
- **Só desktop a 1440px foi renderizado.** Os achados de mobile vêm de cálculo e de medição de componentes isolados (por exemplo, a pílula de 344px), não de um mockup mobile.
- **Medições só no Chrome** (placeholder, borda de 0,8px, fonte de controles). Firefox e Safari podem diferir.
- **A avaliação de LGPD (P05) não é parecer jurídico.**
- **Versão do Tailwind** (C16): afirmei de memória que o v4 usa `@theme`; não consultei a documentação nesta sessão.

## Arquivos

- `mockup-1.html` / `mockup-1.png` — home (template do §5.2), 1440px de largura.
- `mockup-2.html` / `mockup-2.png` — página de curso `/cursos/ingles` (template do §5.3), 1440px de largura.
- Nos HTML, comentários `FIEL AO GUIA` marcam erros mantidos e `DECISÃO` marca o que o guia não define.
