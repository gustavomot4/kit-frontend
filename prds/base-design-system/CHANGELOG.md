# Changelog — Design system base

## 3.0.0 — 2026-10-30

Correções de `docs/pendencias.md`, medidas com `scripts/verificar.mjs` nos dois exemplos. Nenhum token mudou, então a tabela de contraste continua a mesma.

### Corrigido

- Seção 5.6: “Centralizar formulário e título de painel é copiar a impressão errada” → o **texto** do formulário e o título de painel ficam à esquerda; a **coluna** de um formulário, edição ou detalhe fica centralizada na área útil, com sobra igual dos dois lados. A regra de alinhamento era do texto e lida como regra da posição da coluna, o que contraria a regra de equilíbrio visual do dono do kit (G08, 28/10/2026). Anti-padrão da seção 11 e checklist da seção 13 no mesmo sentido.
- Seção 1: “Espaço vazio é resultado aceito, não problema a resolver” → o vazio é aceito desde que não deixe a tela torta: coluna de largura limitada centralizada, sem vazio grande de um lado só. Repetido no prompt da seção 14.
- Seção 7, Tabela: acrescentado o caso de 735–1068 px. Com a lateral de 264 px sobram cerca de 440 px; o cartão ocupa a linha inteira e saem as colunas que não mudam decisão. Antes a tabela de 612 px rolava a página na horizontal em 768 px (906 px de largura).
- `exemplos/landing.html`: a navegação da barra não quebrava linha e “Entrar” saía da tela em 320 px (341 px de largura em 305 px úteis). Agora `flex-wrap`, com lacuna de 16 px abaixo de 734 px. O link de pular e os itens da barra passam a ter pelo menos `--alvo` de altura e de largura.
- `exemplos/ferramenta.html`: as ações do topo não quebravam linha e a tabela estourava em 768 px. Agora `.topo` e `.acoes-topo` quebram linha, o campo tem `max-width: 100%` e, de 735 a 1068 px, o cartão ocupa a linha inteira e a tabela corta Bicicleta e Serviço.
- Regra de altura baixa, nos dois exemplos: com janela de até 480 px de altura, a barra translúcida e a barra de topo do celular deixam de ser `sticky` e `scroll-padding-top` volta a 0.
- `exemplos/landing.png`, `ferramenta.png` e `capa.png` refeitos.

### Adicionado

- Seção 5.9, “Altura baixa e largura mínima”: com janela de até 480 px de altura tudo o que é fixo rola junto (modal e gaveta ficam fixos); nenhuma largura de 320 a 1440 px rola a página na horizontal. Referências na barra inferior do fluxo (seção 10) e no checklist da seção 13.

### Decisões para o autor revisar

- A mudança é MAIOR (regra de uma tela já construída), mas a auditoria nova de cada MAIOR ainda não foi feita: segue pendente, junto com a dos outros dois estáveis.
- O Inter sem decisão, o texto de 12 px e os controles de 32 px como padrão, e a frase “troque quatro tokens e muda de marca” seguem como estavam; `references/recursos/estilos.md` continua mandando trocá-los. O aviso de alvo abaixo de 44 px no toque na ferramenta (16 de 26 alvos: botões do segmented com 40 px, links de ordem com 26 px de altura) não foi mexido: não é falha e a tabela vira cartões no celular.

## 2.0.0 — 2026-10-09
Correções da [auditoria de 2026-10-09](../../docs/auditorias/2026-10-09/base-design-system/auditoria.md).

### Corrigido
- (padrão do repositório) Título `# Sistema de UI/UX — padrão portátil` → `# Design system base`. Parágrafo de abertura deixa de dizer "qualquer aplicação, em qualquer stack" e passa a dizer que as medições do apple.com são observações do autor, sem método registrado; os contrastes são calculados.
- (F10) Rampa tipográfica: 13 degraus no corpo (`12·14·17·19·21·24·28·32·40·48·56·64·80`) contra 8 nos tokens e no prompt → 8 no documento inteiro: `12·14·17·21·28·40·48·56`. A tabela "escolha sugerida" virou tabela de papel por tipo de tela (display, título de seção, corpo, legenda).
- (F41) Tracking: saíram as linhas de 80px, 64px e a faixa "19–40px"; a tabela 3.4 tem só os 8 degraus. A fórmula "acima de 40px", que dava −0,006em em 56px contra −0,005em da tabela, saiu.
- (F29) 3.3: aviso de que `calc(1em + Npx)` é herdado em px; line-height declarado por classe, nunca só no `body`.
- (F56) 3.3: 14px tem line-height fechado — +6 em tabela, lista, rótulo e legenda; +8 em parágrafo. `--lh-botao` vale também para o segmented.
- (F36, parte) 3.5: a regra `font-optical-sizing: auto`, que repetia o valor inicial do CSS, saiu; ficou a instrução de não desligar.
- (F43) 3.5: "a Inter estreita 0,8% de 14px para 48px" (medido na auditoria: 6,61%) → "estreita sozinha conforme o corpo cresce, de 14px até 32px", sem número. 3.8: "tabular alarga ~4%" (medido: de 2,7% a 38%) → "o quanto depende dos dígitos; dimensione a coluna pela pior sequência".
- (F47) 3.7: cabeçalho de coluna com `letter-spacing: 0` → tracking do tamanho (tabela 3.4), peso 400, `--ink-2`.
- (F51) 3.1: "`-apple-system` no Windows cai em Segoe UI, no Android em Roboto" → "o navegador ignora a palavra-chave e usa o próximo nome da stack".
- (F24) Seção 2: "tela", "sem rolar", "bloco de informação", "texto auxiliar" e "ação primária" ganharam medida (viewports 1440×900 e 390×844; 60 caracteres; barra, lateral e rodapé não contam como bloco).
- (F25) Seção 1: exceções à regra de dado duplicado — herói na lista de origem; painel de detalhe.
- (apple.com) 3.1, 3.4, 3.6 e 3.7: "63 arquivos `@font-face`", "a Inter já nasce apertada", "não existe peso 700" e "nenhum token aplica `text-transform`" passam a ser atribuídos ao autor ("na contagem do autor", "observação do autor"). Nenhum número foi apagado nem trocado.
- (F01) 4.5, estado "Resolvido": `--ink-3`, peso 400, opacidade 45–55% (1,60 a 1,89:1) → `--ink-2`, peso 400, sem opacidade, com rótulo por extenso (5,55 sobre `--surface`, 5,28 sobre `--paper`, 4,96 sobre `--sunken`). `opacity` em texto informativo passa a ser proibida.
- (F02) `--ink-3` deixa de ser "letra miúda ≥ 3:1" e passa a ser só não-texto (borda de campo, trilho de interruptor desligado, ícone) e texto de 28px ou mais. Valor `#8A867E` (3,63 / 3,45 / 3,24 sobre surface / paper / sunken) → `#827E76` (4,04 / 3,84 / 3,61; 3,14 sobre `--fill` em `--sunken`). Legenda, rótulo e rodapé passam a `--ink-2`.
- (F03, F37) 4.5, estado "Crítico": `--accent` (só cor) → `--danger` + peso 600 + rótulo por extenso.
- (F11) 4.1: as quatro regras do acento viraram uma. Papéis: preenchimento da ação primária, texto de link e de terciário, anel de foco. Tetos: 1 preenchimento e 3 textos em `--accent` por viewport (1440×900 e 390×844); a mesma ação pode repetir no fechamento da página; link de navegação não é acento.
- (F55) 4.2: "Mire ≥ 7:1" → requisito: `--accent` ≥ 4,5:1 sobre `--fill` aplicado em `--sunken` (`#E5E3DC`), o que equivale a ≥ 5,8:1 com branco.
- (F15) 4.4: "branco" e "cinza" mapeados a tokens por tipo de tela; "degrau real" ganhou limiar (abaixo de 1,08:1 entre cartão e página, `--shadow-card` é obrigatória; os tokens padrão dão 1,05:1).
- (F44, parte) 4.4: `tertiaryLabel` 1,74:1 → 1,73:1 (recalculado com `rgba(60, 60, 67, .3)` sobre branco); os três label colors ganharam o valor `rgba` usado na conta. 4.2: a tabela de cores de sistema ganhou os hex.
- (grupo "combinações não proibidas" da tabela de contraste) 4.4: `--ink-2` proibido sobre `--fill-2` (4,01 a 4,44:1) e sobre `--fill` em `--sunken` (4,31:1).
- (F48, parte) 4.4: `--fill-2` ganhou papel (hover de `--fill`, fundo de avatar); `--line` ganhou regra de implementação (1px, por `border`).
- (F12) 5.1: `.shell { max-width: 1024px; padding: 0 22px }` → acrescidos `box-sizing: border-box` global e `margin-inline: auto`; sem o primeiro, o conteúdo media 1024px, não 980.
- (F30) 5.2: régua `≤734 | 735–1068 | 1069–1440 | ≥1441` → `≤734 | 735–1068 | ≥1069`. O corte de 1441px não mudava nenhum token nem regra. "O texto para de crescer em 1441px" → "o conteúdo para de crescer em 980px".
- (F42) 5.4: ritmo de seção em 735–1068px `80px / 80px` → `80px / 88px`, para o par continuar assimétrico como o texto diz.
- (F28) 5.5: `.grid` ganhou `display: grid` e `grid-template-columns`; `column-gap: 0` em ≤734 (que não fazia coluna única) → `grid-template-columns: minmax(0, 1fr)`. Colunas: 2 para mídia + texto, 3 para texto curto.
- (F45) 5.6: "164 blocos: 102 à esquerda, 61 centralizados" continua como contagem do autor, agora com a nota de que as parcelas somam 163.
- (F15) 5.7: "`branco` ↔ `cinza`" → "`--paper` ↔ `--sunken`".
- (apple.com) 5.4 e 5.7: "110–162px" e "~1 bloco cinza para cada 3 brancos" atribuídos ao autor.
- (F09) 6.1: escada de raios `3·6·8·12·18·28·50%·980` → `6·8·12·18·28·50%·980` (3px não tinha uso). "Cartão, modal 12px" → "cartão de fluxo, modal, contêiner de lista agrupada"; "cartão de superfície densa 18px" → "cartão de ferramenta". Regra do raio concêntrico (fora menos inset).
- (F08) 6.2: "Sombra: uma só, ou nenhuma", que convivia com cinco `box-shadow` prescritos → três sombras com token e papel: `--shadow-card` `2px 4px 12px 0 rgba(0,0,0,.08)`, `--shadow-control` `0 1px 2px 0 rgba(0,0,0,.18)`, `--shadow-modal` `0 16px 48px 0 rgba(0,0,0,.18)`. A sombra da pílula do segmented (`0 3px 8px rgba(0,0,0,.12), 0 3px 1px rgba(0,0,0,.04)`) passou a ser `--shadow-control`, a mesma do botão do interruptor.
- (F05) 6.3: alvo decidido por largura ("Mouse ≥735px 28px / Dedo ≤734px 44px") → por ponteiro (`pointer: fine` 28px / `pointer: coarse` 44px, em qualquer largura). "Abaixo de 735px `hover` não existe" → "hover não existe no toque", com estilos de hover dentro de `@media (hover: hover) and (pointer: fine)`.
- (F17, F18) 6.3: `.btn::after { inset: -6px }` (alvo de 41–42px num botão de 29–30px) → pseudo-elemento centrado com `max(100%, var(--alvo))` nos dois eixos, aplicado a botão, interruptor e terciário; `--alvo` vale 28px e sobe para 44px em `pointer: coarse`.
- (F44, parte) 6.4: "`rgba(keyColor, .6)` … 2,27:1" → os dois valores com o `rgba` ao lado: 2,27:1 com `rgba(0, 125, 250, .6)` e 2,46:1 com `rgba(0, 113, 227, .6)`.
- (F49) 6.4: "`box-shadow` é recortado por `overflow: hidden`, que todo cartão usa" → o que recorta é o ancestral, e recorta `outline` também; a regra passa a ser 4px de folga interna.
- (F07, parte) 6.4: `tr:focus-visible` saiu; linha de tabela não recebe `tabindex`, o foco vai no link da primeira célula.
- (F17) Botão: alturas "~44px", "~36px" e "30–32px" com padding vertical (que davam 44, 35 e 29px) → `min-height` de 44, 36 e 32px, sem padding vertical. Padding "12/22", "9/16", "6/12" → só o lateral: 22, 16 e 12px.
- (F32) Botão: secundário "em `--ink` ou `--fill`" sem critério → `--fill` + `--ink` por padrão; `--ink` + `--surface` quando o bloco não tem primário; peso 400. A ferramenta ganhou secundário (32px, raio 8px). Tabela de estados (hover, pressionado, foco, desabilitado) para os três degraus.
- (F04, F44) Botão desabilitado: fundo `--fill` + texto `--ink-3` (2,82 a 3,13:1, o mesmo valor que o texto chamava de ilegível) → `--fill` + `--ink-2` (4,79 sobre `--surface`, 4,57 sobre `--paper`), com `aria-disabled="true"` no lugar do atributo `disabled`. A frase "branco a 42% … ~2,9:1", que não se reproduzia, virou conta refeita com os tokens atuais: 2,12:1.
- (F03) Link: "sublinhado só no hover" → sublinhado permanente dentro de frase (`--accent` contra `--ink` dá 2,07:1); sem sublinhado só a ação terciária isolada.
- (F06) Campo: "raio 6–8px", "padding lateral 10–14px", borda sem cor, erro "ou acento ou tinta 600" → tabela com um valor por medida: raio 8px, padding 12px, fundo `--surface`, borda `inset 0 0 0 1px var(--ink-3)` (4,04:1), rótulo visível 14px/600, placeholder `--ink-2`, hover, foco, desabilitado e erro (borda 2px `--danger` + frase ligada por `aria-describedby`, `aria-invalid`).
- (F17, linha "campo de 36px ao lado de botão de 32px") Campo de ferramenta: 36px → 32px (`--h-controle`), a mesma altura do botão e do segmented; 44px em `pointer: coarse` e em fluxo.
- (F09) Segmented: trilho 9px → 8px; pílula 7px → 6px. "Pílula selecionada branca" → `--surface`.
- (F32) Segmented: fonte 14px, peso 600 no selecionado, hover, 2 a 5 opções. O estado passa a ser posição + peso (a pílula sozinha dá 1,16:1 contra o trilho).
- (F52, F32) Interruptor: "ligado = tinta (não no acento, se houver N na mesma tela)" → "ligado = `--ink`, sempre". Desligado, que não tinha cor, = `--ink-3` (4,04:1 sobre `--surface`). Rótulo à esquerda.
- (F18) Interruptor e terciário: alvo de 22px e de ~17px → `::after` de 6.3 (38×28 com mouse, 44×44 no toque) e `padding-block: 6px` no terciário.
- (F32, F35, F47) Tabela: cabeçalho com fundo, raio, tamanho e tracking; "números à direita" → valores comparáveis à direita, identificador à esquerda; hover e selecionada em `--sunken`; "zebra só em tabela multicoluna" → com 5 colunas ou mais; regra de truncamento.
- (F32) Lista agrupada: fundo e raio do contêiner, padding lateral, segunda linha; "recuado 16–20px" → o padding lateral da linha. Navegação lateral: "260–264px" → 264px; fundo `--sunken`; fonte, hover, rótulo de grupo e comportamento em ≤734px. Cartão: linha para o cartão de fluxo ("cartão leve"). Modal: "raio 12–18px", "sombra difusa" → raio 12px, `--shadow-modal`, largura 560px, padding 24px, ordem dos botões. Toast: posição, duração, padding e valor do blur.
- (F37) Modal: a ação destrutiva deixa de usar `--accent` e passa a `--danger`; saiu a frase "vermelho separado não é necessário".
- (F27) Barra translúcida: `rgba(<paper>, 0.8)`, que não se derivava do token e anulava o sólido "declarado antes" → sólido por padrão e `color-mix(in srgb, var(--paper) 80%, transparent)` dentro de `@supports (backdrop-filter…)`. Altura 48px, `sticky`, sem borda; texto só em `--ink` (com conteúdo escuro por baixo, `--ink-2` cai a 3,48:1).
- (F48, parte) Seção 8: durações em faixa ("120–180ms", "240–300ms", "300–350ms") → um valor cada, com token: 150ms `--dur-fast`, 280ms `--dur-base`, 320ms `--dur-screen`.
- (F13) Seção 8: "nada de animação em loop" passa a dizer que spinner e shimmer de carregamento entram na proibição.
- (F50) Seção 9: "interruptor sem rótulo visível precisa de `<label for>` ou `aria-label`" → com rótulo visível, `<label for>` ou `aria-labelledby`; sem rótulo visível, `aria-label`.
- (F55) Seção 9: saiu o "(mire 7:1)"; o requisito do acento está em 4.2.
- (F05) Seção 9: "alvo de 44px no toque" → 44px em `pointer: coarse`, 28px com ponteiro fino.
- (F37, F55, decisão do autor) `--accent` padrão `#8E2C26` (vermelho) → `#1F4E8C` (azul): 8,31:1 com branco e 6,46:1 sobre `--fill` em `--sunken`. `--accent-hover` `#9C332C` → `#2A5B9C` (6,83:1, mais claro); `--accent-active` `#7A2520` → `#183F73` (10,51:1, mais escuro). O vermelho da v1 passou para `--danger`, `--danger-hover` e `--danger-active`, de modo que ação e perigo deixam de ser a mesma cor. Em 4.2, 4.3 e 9.1 a troca já estava gravada; os tokens da seção 12 acompanham agora.
- (F36) Tokens: o CSS não declarava `font-family` nem `font: inherit` nos controles → `body { font-family: Inter, system-ui, sans-serif }` e `button, input, select, textarea { font: inherit; letter-spacing: inherit }`.
- (F12) Tokens: sem `box-sizing: border-box` global → incluído no bloco CSS, junto de `.shell` (com `margin-inline: auto`) e `.grid` (de 5.1 e 5.5).
- (F02, F44) Tokens: `--ink-3` `#8A867E` → `#827E76`. Comentários de contraste sem fundo (`16,9`, `5,6`, `3,9`, que não batiam com nenhum fundo) → razão sobre `--surface` e `--paper`: `--ink` 17,21 · 16,36; `--ink-2` 5,55 · 5,28; `--ink-3` 4,04 · 3,84. O comentário "só letra miúda" virou "só não-texto e texto de 28px ou mais".
- (F48) Tokens: `--fill` com base `118, 114, 106` e `--fill-2` com `120, 116, 108` → a mesma base `118, 114, 106` nos dois (12% e 18%), que é a que a tabela 9.1 já usava. Durações: o CSS não tinha token e o JSON só tinha 2 das 3 → `--dur-fast` 150ms, `--dur-base` 280ms, `--dur-screen` 320ms no CSS, no JSON (`motion.screen`) e no Tailwind.
- (F22) Tokens: `--t-display` caía de 56 para 48 e 40 mas o tracking ficava em `--tr-56` → `--tr-display`: `-0.005em`, `-0.003em` em ≤1068px, `0em` em ≤734px. No Tailwind, cada tamanho carrega o seu tracking (`text-40 sm:text-48 lg:text-56`), no lugar do `4xl` único.
- (F10, F29) Tokens: nomes `--t1`…`--t5` (que não diziam o tamanho) → `--t-12`, `--t-14`, `--t-17`, `--t-21`, `--t-28`, `--t-display`. Classes de texto `.t-display`, `.t-28`, `.t-21`, `.t-17`, `.t-14`, `.t-12`, `.lh-titulo`, `.lh-corpo`, `.w-600`, `.num`, cada uma com tamanho, line-height e tracking declarados (3.3 já prometia essas classes). O tracking de 40 (`--tr-40`), 48 e 56 (`--tr-48`, `--tr-56`) passou a vir de `--tr-display`.
- (F08, F09) Tokens: o CSS só tinha cinco raios (`--r-pill`, `--r-28`…`--r-6`) e nenhuma sombra → raios `--r-6` a `--r-pill` com 50% escrito direto, e `--shadow-card`, `--shadow-control`, `--shadow-modal`. JSON: `radius` `[6, 8, 12, 18, 28, 980]` → `[6, 8, 12, 18, 28, "50%", 980]`, com `shadow`.
- (F14, F17, F05) Tokens: escala de espaçamento `--s-4` a `--s-40`; alturas `--h-grande` 44, `--h-medio` 36, `--h-controle` 32, `--h-linha` 36; `--alvo` 28px, e em `pointer: coarse` `--alvo`, `--h-controle` e `--h-linha` valem 44px. JSON: `target` `{ mouse: 28, touch: 44 }` → `{ pointerFine: 28, pointerCoarse: 44 }`, com `height` e `space`.
- (F26) Tokens: o `@media (prefers-reduced-motion: reduce)` que a seção 8 chamava de obrigatório não estava no bloco → incluído.
- (F30) JSON: `breakpoints: [734, 1068, 1441]` → `{ smMax: 734, mdMax: 1068 }`. Tailwind: `screens { sm: '735px', lg: '1069px', xl: '1441px' }` → sem `xl`.
- (F19) Tailwind: a configuração inteira estava em `theme.extend`, que soma ao padrão e deixava `md`, `text-3xl`, `rounded-2xl`, `font-bold` e `shadow-md` disponíveis → tudo em `theme`, fora de `extend`. Faltavam 40 e 48 (display responsivo), `fill`, `fill-2`, `on-accent`, `danger`, sombras, curva e durações → incluídos. Tamanhos `xs…4xl` → `12…56` (um nome por degrau); `lineHeight` com `titulo`, `corpo`, `denso` e `botao`. Variante `@theme` para o Tailwind 4.
- (F20) Tailwind: a frase "se o Tailwind vier por CDN, ele não lê `tailwind.config` de tema sem etapa de build" (falsa, segundo a documentação do Play CDN) saiu. Ficaram as proibições: `bg-[#8E2C26]` → `bg-[#1F4E8C]` (acento novo) e valores arbitrários de raio, sombra, fonte e espaçamento; `rounded-2xl` e `shadow-md` deixam de existir por construção.
- (F40) Nativo: Compose `FontFeature("tnum")` (API do Flutter) → `TextStyle(fontFeatureSettings = "tnum")`; SwiftUI `.font(.system(size:weight:))`, que ignora o Dynamic Type → `@ScaledMetric(relativeTo: .body)` com `.font(.system(size: n, weight:))`; `RoundedCornerShape()` → `RoundedCornerShape(12.dp)`. Alvo: 44pt no iOS e 48dp no Android, com a razão (mínimo do Material) escrita.
- (F21) Prompt: "Siga `DESIGN-SYSTEM.md` deste repositório" (o arquivo se chamava `DESIGNSYSTEM.md`) → "Siga `PRD-FRONTEND.md`, na raiz deste projeto", o nome que "Como usar" manda dar ao arquivo.
- (F11) Checklist: "Um acento. Ele aparece em no máximo 2 lugares nesta tela" (regra que o corpo nunca teve) → "no máximo 1 preenchimento e 3 textos em `--accent` por viewport", a mesma regra de 4.1. O prompt dizia "o acento marca só ação primária e estado crítico": agora diz a regra de 4.1 e manda o crítico para `--danger`.
- (F08) Checklist, prompt e script: "no máximo uma sombra de elevação" e `sombras` com "no máximo 2 entradas" (o mockup feito à risca retornava 3) → as três sombras dos tokens. O script passa a comparar cada `box-shadow` com os valores resolvidos de `--shadow-card`, `--shadow-control` e `--shadow-modal`, ignorando `inset` (campo é borda, não elevação): campo `sombrasFora` vazio.
- (F30) Checklist e prompt: "Breakpoints 734/1068/1441" → "734 e 1068".
- (F05) Checklist: "Alvo ≥ 44px abaixo de 735px" → "44px em `pointer: coarse` e 28px com ponteiro fino"; prompt: "alvo de 44px no toque" → o mesmo, e hover só dentro de `@media (hover: hover) and (pointer: fine)`.
- (F31) Checklist e script: "conteúdo de leitura em 980px" e `conteudo = 980` em qualquer tela (a ferramenta fluida retornava 1132) → vitrine 980 com parágrafos de até 692, fluxo 560, ferramenta fluida. O seletor `main [class*=shell], main > div` (o primeiro `div` filho de `main`) → `.shell`; o fluxo ganhou `.shell-fluxo` (560 de conteúdo) e 5.1 diz como usar.
- (F54) Script: `leaf` (só elementos sem filhos, que ignorava `<td>texto <b>x</b></td>`) → `TreeWalker` de nós de texto; só o que está no viewport; acento comparado com o valor resolvido de `--accent` (antes, a string fixa `rgb(142, 44, 38)`, que ficava velha a cada troca de marca). Campos novos: `viewport`, `acentoTexto`, `textoComOpacity`, `raiosFora`, `estrutura`. Os limites que continuam (pseudo-elementos, `opacity` herdada, estados fora da tela) estão escritos abaixo do script.
- (F56) Prompt: só citava `calc(1em + 4px)` e `calc(1em + 8px)` → os quatro line-heights (+4, +8, +6, +3) e o tracking dos oito degraus.
- (F55, F16) Seção 15: "escureça até bater ≥7:1 com texto branco" → o requisito de 4.2 (≥ 4,5:1 sobre `--fill` em `--sunken`, cerca de 5,8:1 com branco); o passo que derivava `--accent-tint` saiu.
- (F23) Seção 15: tracking e line-height "estruturais, valem para qualquer marca" → a tabela 3.4 vale para Inter com `opsz`; ao trocar a família, recalibre o tracking de 12 a 17px e de 48px ou mais e confira os line-heights.
- (F37) Seção 15: marca vermelha → o acento sai da faixa vermelha; `--danger` segue o mesmo requisito de contraste.
- (padrão do repositório, regra 5) Checklist: ganhou "pressionado" e "desabilitado" entre os estados de componente e o grupo "Estados e acessibilidade" (estrutura de 9.2, zoom a 200% e reflow a 320px, `prefers-reduced-motion`), que o corpo exigia e o checklist não conferia.
- (F53) 5.3: o gutter proporcional (87,5% em ≤734px) dá conteúdo de 642px em 734px e de 691px em 735px, e o texto não dizia → passa a declarar o salto como o corte entre telefone e tablet. A correção proposta não foi aplicada (ver "Achados não aplicados").
- (F39) 10, fluxo: a barra fixa inferior levava "o resumo do que já foi escolhido como legenda" e, na frase seguinte, "não pode ser gasta com resumo passivo" → "contém o botão primário e, acima dele, uma linha de resumo (item · preço), em 14px. Nada além disso."
- (precisão) 5.1: "o `.shell` trava em qualquer janela acima de 1068px" → mede 1024px (980 de conteúdo) em janelas de 1024px ou mais. 2: "Ação primária: exatamente 1 visível por tela" ganhou "zero numa tela só de leitura, declarado", que o texto abaixo já admitia. 6.2: os `rgba` das três sombras passaram a ter a mesma grafia dos tokens (`rgba(0, 0, 0, 0.08)`).
`- (exemplos) \`landing.html\` e \`ferramenta.html\` refeitos com o bloco CSS da seção 12 copiado como está (a v1 tinha os tokens da v1, com \`--ink-3\` \`#8A867E\`, \`--line-2\`, \`--accent-tint\` e o acento vermelho), sem os erros da v1: linhas "Entregue" a 1,77:1 (\`--ink-3\` a 50%) → \`--ink-2\` sem opacidade, 5,55:1 sobre \`--surface\`; interruptor com trilho \`--fill-2\` e caixa de 22px sem alvo → trilho \`--ink-3\` (4,04:1), alvo de 38×28 pelo \`::after\`; segmented com raios 9 e 7 → 8 e 6, pílula com \`--shadow-control\` (e não duas sombras próprias); campo de 36px ao lado de botão de 32px → \`--h-controle\` de 32px nos dois; borda de campo \`--line-2\` (1,70:1) → \`--ink-3\` (4,04:1); "Atrasada 2 dias" na cor do botão primário → \`--danger\` + 600 + rótulo; sombra do cartão escrita à mão → \`--shadow-card\`; barra translúcida \`rgba(250,249,247,.8)\` → \`color-mix\` dentro de \`@supports\`; botão com padding vertical (29 e 35px de altura) → \`min-height\` de 32, 36 e 44px; alvo \`inset: -6px\` → alvo centrado de \`max(100%, var(--alvo))\`; botões de plano e "Pedir ao fornecedor" em \`--ink\` por não haver primário no bloco; mídia com altura fixa → \`aspect-ratio\` 16:10 e 4:3; espaçamentos de 2, 6, 10, 14, 18 e 28px → escala 4·8·12·16·20·24·32·40; símbolo desenhado para a marca → nome em texto (17px, 600); \`font-optical-sizing: auto\` e \`box-sizing\` avulsos → vêm dos tokens.
`- (exemplos) A vitrine ganhou o fechamento que repete a ação do herói (seção 10); as duas telas ganharam link de pular, \`<nav>\` rotulado no rodapé, link na primeira célula da tabela, valor inteiro em \`title\`, tabela em cartões e lateral em gaveta em ≤734px, e \`pointer: coarse\`/hover nas regras. O script de auditoria da seção 13 dá limpo nas duas, em 1440×900 e em 390×844.

### Adicionado
- (padrão do repositório) 9.1: tabela de contraste dos pares prescritos (38 de texto, 12 de texto grande e interface), com hex, razão calculada e as colunas "passa 4,5" e "passa 3,0"; tabela dos pares proibidos; tabela dos segundos sinais obrigatórios.
- (F26) 9.2: foco não encoberto (`scroll-padding`), estrutura (`lang`, link de pular, um `<main>`, um `<h1>`, `<nav>` rotulado), zoom a 200% e reflow a 320px, espaçamento de texto, `forced-colors`, definição de texto grande (28px ou mais nesta rampa), teclado.
- (F07) Linha "Semântica e teclado" em botão, lista agrupada, tabela, segmented, interruptor, navegação lateral, modal e toast.
- (F13) "Estados de tela": carregando (blocos estáticos em `--fill`, frase após 400ms, sem spinner), erro (causa + "Tentar de novo") e tudo feito, ao lado do estado vazio que já existia.
- (F33) Componentes novos, em uma regra cada: Link, Mídia, Ícone, select, textarea, checkbox e radio; "O que não está nesta lista" manda usar o controle nativo.
- (F38) Mídia: proporção 16:10 na largura do contêiner e 4:3 em célula de grade, fundo `--sunken`, sem texto sobreposto.
- (F35) Regras de texto que não cabe: título em até 2 linhas, rótulo de botão sem quebra, célula com reticências e `title`.
- (omissões 7, 8, 26, 33, 34) Ícone (16/20px, traço 1,5px); marca em texto quando não há logotipo; tabela dentro de cartão com `margin-inline: -12px`; posição do rótulo do interruptor; lista dentro de cartão.
- (padrão do repositório, regra 8) Campo: formulário que coleta dado pessoal diz a finalidade e onde está a política.
- (nota da tabela de contraste) 6.4: dentro do toast o anel de foco é `--surface` (13,71:1); o acento sobre tinta dá 1,65:1.
- (F14) 5.8: escala de espaçamento fechada `4·8·12·16·20·24·32·40`, com tabela de uso.
- (omissão 14) 5.6: abertura centralizada não leva botão; herói com ação fica à esquerda.
- (omissão 20) 5.1: parágrafo com no máximo 692px em qualquer tipo de tela.
- (F37) Tokens `--danger` `#8E2C26`, `--danger-hover` `#9C332C` e `--danger-active` `#7A2520` (8,27 / 7,18 / 9,94:1 com branco), reservados a erro de campo, estado crítico e ação destrutiva.
- (F34) 4.4 e Escopo: tema escuro declarado fora de escopo.
- (omissão 25) Seção 2: numa ferramenta, a informação herói fica no topo do conteúdo, sobre a página, sem cartão.
- (omissões 15, 19, 21, 23, 27) 3.2: tamanho e peso de apoio do herói, título de bloco, rodapé, rótulo e cabeçalho de coluna, por tipo de tela.
- (padrão do repositório) Cabeçalho YAML com os dez campos obrigatórios.
- (padrão do repositório) Seção `## Escopo` (Use para, Não use para, Relação com outros PRDs) e seção `## Como usar` (copiar como `PRD-FRONTEND.md`). As duas entraram no índice.
- (F26, F48) Tokens: `--shadow-*`, `--s-*`, `--h-*`, `--shell`, `--fluxo`, `--bloco`, `--pad-cartao`, `--grade-col`, `--grade-lin` e os três tokens de duração. JSON e Tailwind ganham as cores `fill`, `fill2`, `danger*` e `onAccent` que não tinham.

### Removido
- (F10) Degraus 19, 24, 32, 64 e 80px da rampa, com as linhas de line-height e de tracking que só existiam para eles.
- (F16) Token `--accent-tint` (`#F1E6E5`): nenhum componente o usava e três regras do próprio documento proibiam o uso para o qual ele foi criado.
- (F30) Breakpoint de 1441px.
- (F46) 3.7: a exceção do versalete (`letter-spacing: 0.06em`). O checklist e o script já exigiam zero `text-transform: uppercase`.
- (F16) Tokens: `--accent-tint` `#F1E6E5` saiu também do bloco CSS (o item 3 da seção 15 também).
- (F48) Tokens: `--line-2` `#CBC6BC` (1,70:1 sobre `--surface`), que não tinha papel em nenhuma regra.

### Decisões para o autor revisar
- **Acento azul e `--danger` vermelho (F37, F55).** O acento padrão deixou de ser o vermelho `#8E2C26` e virou o azul `#1F4E8C`; o vermelho ficou com `--danger`. A auditoria dava duas saídas (acento fora da faixa vermelha, ou um `--danger` separado) e as duas foram feitas. Toda tela construída com a v1 muda de cor.
- **Rampa de 8 degraus (F10, opção a).** Saem 19, 24, 32, 64 e 80px. A opção b (criar os tokens que faltavam e manter 13 degraus) não foi adotada.
- **Papel e cartão (F15).** Ficou `--paper` `#FAF9F7` com `--shadow-card` obrigatória (1,05:1 entre cartão e página). A alternativa, escurecer o papel para `#F5F4F1` (1,10:1), mudaria todas as superfícies.
- **`--ink-3` `#827E76` (F02)**, só para não-texto e texto de 28px ou mais, e **texto grande = 28px ou mais**: mais estrito que a WCAG (24px, ou 18,66px em negrito), porque a rampa não tem 24.
- **Acento: 1 preenchimento e 3 textos por viewport (F11)**, com a repetição permitida no fechamento da página.
- **Tema escuro fora de escopo (F34)**, no lugar de especificar o bloco `prefers-color-scheme`.
- **Escala de espaçamento `4·8·12·16·20·24·32·40` (F14).** A auditoria propôs `4·8·16·24·32·40`; 12 e 20 entraram por serem paddings já usados, e o "rótulo a 6px do campo" proposto virou 8px, porque 6 não está na escala.
- **Componentes novos (F33)**: link, mídia, ícone, select, textarea, checkbox e radio, mais a regra de usar o controle nativo para o resto.
- **Nomes dos tokens de tipografia mudaram**: `--t1`…`--t5` e `--tr-56`/`--tr-48`/`--tr-40` → `--t-12`…`--t-28`, `--t-display` e `--tr-display`. Quem já copiou o bloco da v1 precisa trocar.
- **Android 48dp contra os 44 do documento (F40).** O Material pede 48dp no toque; a tabela "Nativo" usa o mínimo de cada plataforma e diz isso.
- **Campo e botão no toque (F17).** Em `pointer: coarse` o campo e o segmented da ferramenta crescem para 44px e o botão fica em 32px, com alvo de 44px pelo `::after`: alturas diferentes na mesma linha, alinhadas pelo centro.
- **Tailwind 3 e 4 (F19).** O bloco de config é o do Tailwind 3; o `@theme` do 4 acompanha. No 4 o espaçamento aceita qualquer inteiro e não dá para restringir: a regra ficou em texto.
- **Exemplos.** A vitrine ganhou o fechamento com a ação repetida (seção 10) e perdeu o símbolo desenhado da marca (7, "Ícone": a marca sem logotipo é o nome em texto). Na ferramenta, "Registrar retirada" ficou em `--fill` (o topo da tela já tem o primário) e "Pedir ao fornecedor" em `--ink` (o cartão não tem primário).

### Achados não aplicados
- (F53) A correção proposta, `padding-inline: max(22px, 6.25%)`, não elimina o salto entre 734px e 735px: 6,25% de 734px continua sendo 45,9px contra 22px. O comportamento ficou como é (e é o da Apple) e o texto de 5.3 agora o declara.
- (F26, em parte) "Texto grande = ≥ 24px, ou ≥ 19px em 600": aplicado como 28px ou mais, ver "Decisões".
- (F14, em parte) "rótulo → campo 6px": aplicado como 8px, ver "Decisões".
- (F54, em parte) Pseudo-elementos, `opacity` herdada e estados fora da tela continuam fora do alcance do script; o limite está escrito na seção 13.
- (F45) A contagem "164 blocos: 102 à esquerda, 61 centralizados" continua como contagem do autor, que o repositório não consegue reproduzir; a nota diz que as parcelas somam 163.

## 1.0.0
Versão original, arquivada em [original.md](../../docs/auditorias/2026-10-09/base-design-system/original.md).
