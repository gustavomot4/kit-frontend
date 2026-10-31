# Auditoria — `DESIGNSYSTEM.md` ("Sistema de UI/UX — padrão portátil")

> **Registro histórico.** Auditoria da versão 1.0.0, feita quando o arquivo se chamava `DESIGNSYSTEM.md`. Essa versão está guardada ao lado, como [original.md](original.md); os números de linha citados aqui são os dela. As telas `mockup-1` e `mockup-2` desta pasta seguem a versão 1.0.0, com os erros apontados. A versão corrigida é [prds/base-design-system/prd.md](../../../prds/base-design-system/prd.md) e as mudanças estão no [CHANGELOG](../../../prds/base-design-system/CHANGELOG.md).

Arquivo auditado: `C:\Users\maquina\Desktop\prd_frontend\DESIGNSYSTEM.md` — 1017 linhas, lido inteiro. Os números de linha abaixo são os reais do arquivo.
Data: 09/10/2026. O original não foi alterado.

## Resumo e veredito

**Não está pronto para servir de contrato de design para agentes; fica pronto com cerca de 14 correções.** A filosofia é boa e a maior parte dos números é precisa, mas o documento se contradiz entre corpo, tokens, checklist, script e prompt, e duas prescrições de cor reprovam a WCAG AA.

- **56 achados: 2 críticos, 12 altos, 26 médios, 16 baixos.**
- Os dois críticos são de contraste, calculados: o estado "resolvido" (`--ink-3` a 45–55%) dá **1,60–1,89:1**, e `--ink-3` como "letra miúda" dá **3,24–3,63:1** onde a WCAG pede 4,5:1.
- Os altos são, na maioria, contradições internas: a rampa tem 13 degraus no corpo e 8 nos tokens e no prompt; a "sombra única" convive com cinco sombras prescritas; a escada de raios exclui os 9px e 7px que o segmented manda usar; o acento tem quatro regras incompatíveis.
- Há um erro técnico de base: toque e hover são deduzidos da largura da tela (735px), o que entrega alvo de 28px em tablet.
- O `.shell` só mede 980px com `box-sizing: border-box`, que o arquivo nunca declara (medido: sem ele o conteúdo fica em 1024px).
- O que ele omite pesa tanto quanto o que erra: não há escala de espaçamento, tema escuro, teclado/ARIA, estados de carregamento e erro, nem mapeamento de "cinza/branco" para tokens. Montar os dois mockups exigiu 34 decisões que o documento não cobre.
- Seguido à risca, o resultado visual é coerente e tem cara de produto (ver `mockup-1.png` e `mockup-2.png`): o sistema funciona como estética; falha como especificação fechada.

## Como foi verificado

- **Contraste:** script em Node com a fórmula de luminância relativa da WCAG 2.x e composição alfa sobre o fundo real. 96 pares; 34 reprovam na exigência aplicável.
- **Medições no Chrome headless**, com a URL de fonte da L195: estreitamento óptico da Inter, alargamento por `tabular-nums`, herança de `line-height: calc()`, largura do `.shell` com e sem `border-box`, valor inicial de `font-optical-sizing`.
- **Rede:** as duas URLs do Google Fonts (com e sem `opsz`) e a documentação do Play CDN do Tailwind.
- **Script de auditoria do próprio documento (L942–958):** executado nos dois mockups.
- **Âncoras do índice:** geradas com o algoritmo de slug do GitHub e comparadas.
- **Coluna "Base" na tabela de achados** separa fato de opinião: *calculado*, *medido*, *aritmética*, *leitura* (verificável abrindo a linha), *conhecimento* (padrão técnico que conheço, não reverificado aqui) e *julgamento*.

## Achados

| ID | Severidade | Categoria | Linha(s) | Problema | Correção proposta | Base |
| --- | --- | --- | --- | --- | --- | --- |
| F01 | crítico | Acessibilidade | 335 (vs 316, 684) | Estado "Resolvido / concluído" = `--ink-3`, peso 400, opacidade 45–55%. Dá 1,60–1,89:1 sobre surface, paper e sunken. É texto de conteúdo (nome, serviço, "Entregue"), não controle inativo: reprova 1.4.3 (4,5:1) e os pisos do próprio doc (L316 ≥3:1; L684 ≥4,5:1). Visível nas duas imagens, nas linhas "Entregue". | "Resolvido: `--ink-2`, peso 400, sem opacidade (5,28–5,55:1), com rótulo por extenso ('Entregue')." Proibir `opacity` em texto informativo. | calculado |
| F02 | crítico | Acessibilidade | 316, 777 (vs 684, 920) | `--ink-3` é prescrito para "letra miúda" com piso ≥3:1. Na WCAG 1.4.3, 3:1 só vale para texto grande (≥24px, ou ≥18,66px em negrito); letra miúda exige 4,5:1. Valores: 3,63 (surface), 3,45 (paper), 3,24 (sunken), 2,98 (fill/paper), 2,82 (fill/sunken), 2,97 (accent-tint). O comentário do token diz 3,9:1, que não bate com nenhum fundo. O checklist (L920) só confere "texto secundário", então `--ink-3` passa sem ser medido. | "`--ink-3`: só não-texto (borda de campo, ícone) e texto ≥24px; letra miúda usa `--ink-2`." Trocar o valor para `#827E76` (≥3:1 em todas as superfícies; 3,14 no pior caso) e corrigir o comentário. Checklist: "nenhum texto abaixo de 24px em `--ink-3`". | calculado |
| F03 | alto | Acessibilidade | 338, 539, 287 (vs 331, 687–688) | "Crítico = `--accent`" (só cor) e terciário/link = texto no acento com "sublinhado só no hover". Acento vs `--ink` = 2,08:1; vs `--ink-2` = 1,49:1 — abaixo dos 3:1 que a técnica G183 exige para distinguir por cor. Reprova 1.4.1 para link dentro de frase e contradiz L687 ("Nunca codifique informação só por cor") e o título 4.5 ("Estado sem cor"). | "Crítico: `--accent` + peso 600 + rótulo por extenso." "Link dentro de frase: sublinhado permanente (`text-underline-offset: 2px`); sem sublinhado só em ação terciária isolada, fora de parágrafo." | calculado |
| F04 | alto | Acessibilidade / coerência | 551–556 | O doc chama ~2,9:1 de "ilegível" e manda trocar por fundo `--fill` + texto `--ink-3`. Esse par dá 2,98:1 sobre paper, 3,13 sobre surface e 2,82 sobre sunken — o mesmo valor condenado. A L555 ainda exige que o botão desabilitado "DIGA o que falta": a instrução essencial fica no pior par da tela. Com `disabled` nativo o botão sai da ordem de Tab e o rótulo não chega a teclado nem a leitor de tela. | "Desabilitado: fundo `--fill`, texto `--ink-2` (4,57 paper / 4,79 surface); usar `aria-disabled="true"` mantendo o foco, não o atributo `disabled`." | calculado |
| F05 | alto | Padrões / acessibilidade | 484–487, 500–502, 928 | Tipo de ponteiro deduzido da largura: "Mouse (≥735px) 28px / Dedo (≤734px) 44px" e "Abaixo de 735px `hover` não existe". Tecnicamente errado: tablet (768–1366px) é toque e recebe alvo de 28px; janela estreita no desktop tem hover. | `@media (pointer: coarse) { alvo ≥44px }` e `@media (hover: hover) and (pointer: fine) { estilos de hover }`. Checklist: "Alvo ≥44px em `pointer: coarse`, em qualquer largura". | conhecimento (Media Queries 4) |
| F06 | alto | Acessibilidade | 560–565, 312 | Campo: a borda é "`inset 0 0 0 1px`" sem cor. Os dois tokens de traço reprovam 1.4.11 (3:1): `--line` 1,27:1 e `--line-2` 1,70:1 sobre surface. Fundo indefinido (a L312 lista "campos" em `--fill`; a L560 não cita fundo). Faltam rótulo visível, cor de placeholder, texto de erro (3.3.1), `aria-invalid`/`aria-describedby` e tamanho de fonte (em iOS, menos de 16px dá zoom no foco). "Erro: ou acento ou tinta 600" deixa duas saídas. Borda por `box-shadow` some em `forced-colors`. | "Campo: fundo `--surface`; borda `inset 0 0 0 1px var(--ink-3)` (3,63:1); rótulo visível acima, 14px/600; placeholder `--ink-2`; fonte 14px (16px em `pointer: coarse`); erro = borda 2px `--accent` + frase abaixo ligada por `aria-describedby`, com `aria-invalid="true"`; `@media (forced-colors: active) { outline: 1px solid CanvasText }`." | calculado + leitura |
| F07 | alto | Acessibilidade | 589–599, 641–659, 514, 680–695 | Nenhum componente interativo tem teclado ou semântica: segmented (radiogroup, setas), interruptor (`role="switch"`), modal (prender foco, Esc, devolver foco), toast (`role="status"`, tempo de permanência — 4.1.3, 2.2.1), linha de tabela focável (`tr:focus-visible` pressupõe `tabindex`, sem padrão definido). "aria-" aparece uma vez no arquivo (L690); "teclado", nenhuma; Tab, só no checklist (L935). | Acrescentar a cada componente uma linha "Semântica e teclado". Ex.: "Modal: `<dialog>` + `showModal()`; foco inicial no botão neutro; Esc fecha; foco volta ao acionador." "Toast: `role="status"`, ≥5 s, não some com foco ou hover." | leitura (busca no arquivo) |
| F08 | alto | Coerência | 471–480, 735, 924, 961–963 vs 561–562, 592, 599, 608, 643 | "Uma só sombra, ou nenhuma" e checklist "no máximo uma sombra de elevação", mas o doc prescreve cinco `box-shadow` diferentes: cartão (L608), pílula do segmented (L592), botão do interruptor (L599), modal "sombra difusa" sem valores (L643) e borda/foco de campo (L561–562). O script espera "`sombras` com no máximo 2 entradas": no mockup-2, feito à risca, retorna 3. | Em 6.2: "sombras permitidas = `--shadow-card`, `--shadow-control`, `--shadow-modal`", com valores nos tokens. No script: ignorar `inset` e comparar com a lista de tokens em vez de contar. | medido (script do doc) |
| F09 | alto | Coerência | 450–464, 923, 988 vs 560, 591–592, 643 | Escada fechada "3·6·8·12·18·28·50%·980" e "não existe 4, 10, 16 nem 20", mas o segmented manda 9px (trilho) e 7px (pílula). Campo "6–8px" e modal "12–18px" são faixas onde a tabela (L461–462) fixa 8 e 12. 3px não tem uso em lugar nenhum. "Cartão, modal 12px" × "Cartão de superfície densa 18px": não se diz quando um cartão é 12. Tokens, JSON e prompt omitem 3 e 50%. | Segmented: trilho 8px, pílula 6px (8 menos o inset de 2 = 6: concêntrico e na escada). Campo = 8px. Modal = 12px. "Cartão 12px" vira "cartão de fluxo". Remover 3px ou dar uso. | leitura |
| F10 | alto | Coerência | 133 vs 787–792, 843, 865–870, 979 | A rampa tem 13 degraus em 3.2, 8 no JSON e no prompt, 6 tokens no CSS (mais 48 e 40 por breakpoint) e 6 no Tailwind. 19, 24, 32, 64 e 80 existem no corpo, com line-height e tracking próprios (L155–173), e não existem nos tokens nem no prompt. Um agente guiado pelo prompt trata 24px como proibido; outro, guiado por 3.2, usa. | Escolher uma: (a) rampa = `12·14·17·21·28·40·48·56` no documento inteiro, apagando 19/24/32/64/80 de 3.2–3.4; ou (b) criar os tokens que faltam e pôr a rampa completa no JSON, no Tailwind e no prompt. | leitura |
| F11 | alto | Coerência / ambiguidade | 80, 253, 287, 539, 564, 905, 918, 961–963 | Quatro regras incompatíveis para o acento: "ação primária e estado crítico, nada mais" (L253); "no máximo 2 lugares nesta tela" (L918, que não existe no corpo); script "`acentoFundo` com 1 item" (L962); e, ao mesmo tempo, acento = cor de link (L287), terciário (L539), erro (L564) e foco (L513). "Tela" não é definida (viewport ou página). Uma landing com CTA no herói e no fechamento tem 2 preenchimentos; uma tela de leitura (L91) tem 0 e o script acusa. | "Tela = primeiro viewport (1440×900 e 390×844). Preenchimento em acento: no máximo 1 por viewport; a mesma ação pode repetir no fechamento da página. Texto em acento (link, terciário, crítico): no máximo 3 por viewport." Script: medir só o que está dentro do viewport e aceitar 0 ou 1. | leitura + medido |
| F12 | alto | Padrões | 353, 356–357, 815, 925, 992 | `.shell { max-width: 1024px; padding: 0 22px }` só entrega 980 com `box-sizing: border-box`, que não aparece no arquivo. Medido no Chrome: com o padrão (`content-box`) o conteúdo fica em 1024px e a caixa em 1068px. Falta também `margin-inline: auto` (aqui e na L388). | Acrescentar aos tokens: `*, *::before, *::after { box-sizing: border-box; }` e `.shell { margin-inline: auto; }`. | medido |
| F13 | alto | Coerência | 932 vs 650–654, 675 | O checklist exige "Vazio, carregando, erro e 'tudo feito'", mas só "Estado vazio" é especificado. "Carregando" e "tudo feito" aparecem só nessa linha; erro de página ou bloco não existe (só erro de campo, L564). "Carregando" ainda colide com "Nada de animação em loop permanente" (L675): spinner e shimmer são loops. | "Carregando: mantém o layout; blocos estáticos em `--fill`; texto 'Carregando…' só após 400 ms; sem spinner." "Erro: uma frase com a causa + ação 'Tentar de novo'." "Tudo feito: uma frase, sem ilustração." | leitura (busca no arquivo) |
| F14 | alto | Ambiguidade | 394–402 | Não há escala de espaçamento. O doc define só padding de seção, "bloco de conteúdo" 40, padding de cartão 24, gutter 22 e gaps da grade. Título→apoio, apoio→botão, rótulo→campo, entre botões, cabeçalho de cartão→conteúdo: tudo é escolha livre. Nos dois mockups precisei inventar 10 valores (2, 4, 6, 8, 10, 12, 16, 20, 24, 32). | Escala fechada `4·8·12·16·24·32·40` + tabela de uso: título→apoio 8; apoio→ação 32; ação→mídia 40; rótulo→campo 6; entre botões 8; cabeçalho de cartão→conteúdo 16; entre cartões 22. | leitura + mockups |
| F15 | médio | Ambiguidade / coerência | 309–311, 324–327, 435–438, 608, 710, 764–766 | "Página cinza" e "branco ↔ cinza" não são mapeados a tokens. `--paper` (#FAF9F7) não é cinza e é mais claro que o #F5F5F7 que o doc cita como "degrau visível": surface/paper = 1,05:1 (referência: 1,09:1); paper/sunken = 1,06:1. Pelo aviso das L325–327, os tokens padrão caem justamente no caso de risco, e não há limiar numérico para "degrau real". | "Vitrine: página `--paper`, faixa de capítulo `--sunken`. Ferramenta: página `--paper`, cartão `--surface` com sombra obrigatória enquanto surface/paper for menor que 1,08:1." Ou escurecer `--paper` para `#F5F4F1` (1,10:1). | calculado |
| F16 | médio | Coerência | 290, 783, 1010 vs 256–257, 331, 541–542, 836–842, 858–863 | `--accent-tint` é definido "para seleção e realce", mas "seleção… se resolve na escala de neutros" (L256), "seleção não usa cor" (L331) e "tom claro do acento vira um segundo acento" (L541). Nenhum componente usa o token; ele existe no CSS e some do JSON e do Tailwind. | Remover `--accent-tint` (e o passo 3 da seção 15), ou declarar o único uso permitido (ex.: "fundo da linha com erro"). | leitura |
| F17 | médio | Coerência | 152, 544–548, 710, 489–495 | As alturas da tabela de botões não fecham com `--lh-botao`: primário de ferramenta = 14 + 3 + 2×6 = 29px (doc: 30–32; L710: 30); secundário de vitrine = 35px (doc: ~36). Medido nos mockups: 35px e 29px (forcei 32). Com `inset: -6px`, um botão de 29–30px dá alvo de 41–42px, não 44. | "Primário (ferramenta): `min-height: 32px; padding: 0 12px`." Alvo: `.btn::after { inset: 50% auto auto 50%; width: max(100%, 44px); height: max(100%, 44px); transform: translate(-50%, -50%); }`. | aritmética + medido |
| F18 | médio | Acessibilidade / coerência | 597, 549 vs 486 | Interruptor de 38×22: 22px de altura, abaixo do mínimo do próprio doc para mouse (28px) e dos 24px da WCAG 2.5.8 (só passa pela exceção de espaçamento). Terciário com "padding 0" a 14px gera alvo de ~17–22px de altura. | Estender o `::after` a interruptor e terciário: `.chave::after { inset: -11px -3px }` (44×44) e terciário com `padding-block: 6px` (≥28px). | medido (mockup-2) |
| F19 | médio | Padrões | 855–876 | Tudo está em `theme.extend`, que soma aos padrões do Tailwind em vez de substituir. Continuam disponíveis `md: 768px` e `2xl` (o conflito que a L379 proíbe), `text-3xl` 30px, `rounded` 4px, `rounded-2xl` 16px, `font-medium`, `font-bold`, `shadow-*` e a paleta inteira. Faltam no config: 40 e 48 (o display responsivo), `fill`, `fill-2`, `line-2`, `on-accent`, sombra e curva. O formato é o do Tailwind 3; o 4 configura por `@theme` em CSS. | Mover `screens`, `fontSize`, `borderRadius`, `fontWeight`, `colors` e `boxShadow` para `theme`, fora de `extend`; acrescentar 2.5rem e 3rem; fornecer a variante `@theme` para a v4. | conhecimento (Tailwind) |
| F20 | médio | Padrões (fato errado) | 879–881 | "Se o Tailwind vier por CDN, ele não lê `tailwind.config` de tema sem etapa de build" é falso. A documentação do Play CDN v3 manda editar o objeto `tailwind.config` na própria página; o build de navegador da v4 aceita `@theme` em `<style type="text/tailwindcss">`. | Apagar a frase; manter as duas proibições (`bg-[#…]`, `rounded-2xl`/`shadow-md`). | verificado na documentação (09/10/2026) |
| F21 | médio | Erro pontual | 971 vs 4 | O prompt manda seguir "`DESIGN-SYSTEM.md`"; o arquivo se chama `DESIGNSYSTEM.md`. O agente procura um arquivo que não existe. | Unificar o nome. | leitura |
| F22 | médio | Coerência | 787, 799–801, 824–829, 870 vs 158 | `--t-display` cai 56→48→40 nos breakpoints, mas o tracking fica em `--tr-56`: as media queries não trocam para `--tr-48` nem `--tr-40`. Viola "tracking é função do tamanho". O `'4xl'` do Tailwind tem o mesmo problema. | Criar `--tr-display: -0.005em` e sobrescrever nas duas media queries (`-0.003em`; `0em`). | leitura |
| F23 | médio | Coerência | 1015–1017 vs 179–186, 110–116 | A seção 15 diz que o tracking é "estrutural: vale para qualquer marca", mas 3.4 argumenta que ele depende do desenho da fonte (SF × Inter) e 3.1 prevê Roboto, fonte de sistema e segunda família de marca. | "A tabela 3.4 vale para Inter com `opsz`. Ao trocar de família, recalibre o tracking de 12–17px e de ≥48px." | leitura |
| F24 | médio | Ambiguidade | 79–82, 428–429, 900, 906, 908 | "Bloco de informação", "sem rolar" (em que viewport?) e "texto auxiliar" não são definidos, e são itens de aceite declarados "verificáveis, não opinião". Não se sabe se navegação conta como bloco, se parágrafo de landing é texto auxiliar, nem em que largura ou idioma vale "1 linha". | "Sem rolar = 1440×900 e 390×844. Bloco = região com título ou superfície própria; navegação e barra não contam. Texto auxiliar = legenda ou dica de controle, até 60 caracteres; parágrafo de corpo não é auxiliar." | leitura |
| F25 | médio | Coerência | 54–55, 907 vs 84–86 | "Nenhum dado aparece duas vezes na mesma tela" inviabiliza o próprio exemplo de herói ("quem é o próximo e quando" é, por definição, um item da lista do dia) e qualquer lista + detalhe. | "Exceções: o item herói pode repetir na lista de origem; o painel de detalhe repete os campos da linha selecionada." | leitura + mockup-2 |
| F26 | médio | Acessibilidade (omissões) | 680–695, 560, 574, 580, 591, 615, 621–639, 715–718, 759–829 | A seção 9 tem 7 itens e omite: zoom 200% e reflow a 320px (1.4.4, 1.4.10) — as alturas são fixas em px (campo 36, linha 36/44, item 32, segmented 32) e a lateral de 260px não tem comportamento em tela pequena; foco não encoberto (2.4.11), apesar de o doc prescrever barras fixas; espaçamento de texto (1.4.12); link de pular, landmarks, hierarquia de títulos e `lang`; definição de "texto grande"; `forced-colors`. O bloco "Tokens prontos" não traz o `@media (prefers-reduced-motion)` que a L676 chama de obrigatório. | Acrescentar à seção 9: "alturas são `min-height`"; "`scroll-padding` = altura das barras fixas"; "primeiro link da página = pular para o conteúdo"; "um `<main>`, `<nav>` rotulados, um `<h1>`"; "texto grande = ≥24px, ou ≥19px em 600"; e o snippet de movimento reduzido nos tokens. | leitura |
| F27 | médio | Padrões | 623–628 | Na barra translúcida, `rgba(<paper>, 0.8)` não é derivável do token hex (não existe `--paper-rgb`). O "sólido declarado ANTES" nunca atua: todo navegador aceita `rgba()`, então a segunda declaração sempre vence, e sem `backdrop-filter` a barra fica 80% translúcida sem desfoque. Altura, `sticky` × `fixed` e separação inferior não são especificados. | `.bar { background: var(--paper); height: 48px; position: sticky; top: 0 }` + `@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) { .bar { background: color-mix(in srgb, var(--paper) 80%, transparent); backdrop-filter: saturate(1.8) blur(20px); } }`. | leitura (cascata CSS) |
| F28 | médio | Padrões | 414–418 | `.grid` não tem `display: grid` nem `grid-template-columns`, e o número de colunas não é dito. `column-gap: 0` com o comentário "vira coluna única" não transforma nada em coluna única. | `.grid { display: grid; grid-template-columns: repeat(var(--cols, 2), 1fr); }` e, em ≤734, `grid-template-columns: 1fr`. Dizer as colunas por contexto (2 para mídia + texto, 3 para texto curto). | leitura |
| F29 | médio | Padrões | 148–153, 794–797 | `line-height: calc(1em + Npx)` é resolvido em px no elemento onde é declarado e herdado como comprimento. Medido: `body` de 17px dá 25px, e um `h1` de 56px filho herda 25px. O doc não avisa; declarar no `body` quebra todos os títulos. | Nota em 3.3: "declare o line-height em cada classe de texto, nunca só no `body`". | medido |
| F30 | médio | Coerência | 370–371, 376, 846, 857, 926 | O breakpoint ≥1441 não tem nenhum comportamento associado: nenhum token ou regra muda ali. "O texto para de crescer em 1441px" contradiz o `.shell`, que trava em 1024px. No JSON, `[734, 1068, 1441]` mistura dois limites superiores com um inferior. | Remover 1441 da régua ou dizer o que muda. JSON: `{ "smMax": 734, "mdMax": 1068, "xlMin": 1441 }`. | leitura |
| F31 | médio | Coerência | 361–368, 925, 956, 963 | Três medidas disputam a palavra "leitura": checklist "conteúdo de leitura em 980px", tabela "bloco de leitura corrida 692px" e "980 é largura de leitura em coluna única". O script espera `conteudo = 980` em qualquer tela, mas ferramenta é fluida (L364) e fluxo é 560 (L363): no mockup-2 ele retorna 1132. O seletor `main [class*=shell], main > div` pega o primeiro `div` filho de `main`, que pode não ser o contêiner. | Checklist: "Vitrine: contêiner com 980 de conteúdo; parágrafos ≤692". Script: `document.querySelector('.shell')` e esperado por tipo de tela (980 / 560 / fluido). | medido |
| F32 | médio | Ambiguidade | 535–549, 567–599, 613–619, 641–659 | Componentes com lacunas que mudam o resultado: secundário "tinta ou `--fill`" sem critério, sem cor de texto sobre tinta e sem peso; não há secundário nem terciário de ferramenta, nem tamanho do botão de fluxo; lista agrupada sem raio nem fundo do contêiner; tabela sem tamanho de fonte do cabeçalho, cor de zebra, hover e selecionado, e com "multicoluna" indefinido; segmented sem tamanho de fonte nem peso do selecionado; interruptor sem cor do desligado; lateral sem fundo, fonte e comportamento em ≤734; modal sem largura, padding, sombra e ordem dos botões; toast sem posição, duração e valor do blur. | Completar cada componente. Ex.: "Secundário: `--fill` ao lado de um primário; `--ink` com texto `--surface` quando é a ação mais forte do bloco; peso 400." "Interruptor desligado: trilho `--ink-3`." "Zebra: `--sunken`, só com 5 colunas ou mais." | leitura + mockups |
| F33 | médio | Ambiguidade | 526–659 | Componentes comuns sem nenhuma especificação: checkbox, radio, select/menu, abas, tooltip, paginação, breadcrumb, ícones (só há proibições: L652, L659, L731), imagem/mídia (só o raio 28), cabeçalho e rodapé de vitrine, gráfico (só anti-padrões). | Especificar ao menos checkbox/radio, select, abas e ícones (16/20px, traço 1,5, `--ink`), ou declarar: "fora desta lista, use o controle nativo sem estilo". | leitura |
| F34 | médio | Ambiguidade | 761, 591–592, 887–894 | Só existe tema claro (`color-scheme: light`), e "pílula selecionada branca" está fixa em branco. O doc se declara portátil para iOS e Android, onde tema escuro é esperado, e não diz se está fora de escopo. | Declarar "tema escuro fora de escopo: não gere", ou acrescentar o bloco `@media (prefers-color-scheme: dark)` com os tokens e os contrastes calculados. | leitura |
| F35 | médio | Ambiguidade | 82, 580, 586, 908 | Nada sobre texto longo, truncamento, quebra, idiomas mais extensos ou RTL. "1 linha" e "linha de 36px" não dizem o que fazer quando o conteúdo não cabe. No mockup-2 a coluna de moeda estourou e tive de escolher entre reticências, quebra e remover a coluna. | "Célula de tabela: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` + `title`. Título quebra em até 2 linhas. Rótulo de botão nunca quebra." | leitura + mockup-2 |
| F36 | médio | Padrões | 195–200, 759–829, 874 | O CSS de tokens não declara `font-family` (a stack só aparece no Tailwind, L874) nem `font: inherit` para `button, input, select, textarea`, que por padrão não herdam a família. Já `font-optical-sizing: auto` (L199) é o valor inicial da propriedade: a regra não faz nada. | `body { font-family: Inter, system-ui, sans-serif; } button, input, select, textarea { font: inherit; letter-spacing: inherit; }`. | medido + leitura |
| F37 | médio | Acessibilidade | 253, 645–648, 780 | O acento padrão é um vermelho (#8E2C26) e, pela regra, o mesmo sinal vale para ação primária, link, foco, erro, estado crítico e ação destrutiva. No mockup-2, "Nova ordem" e "Atrasada 2 dias" têm a mesma cor; num diálogo, "Salvar" e "Apagar 143 registros" seriam idênticos. Não viola a WCAG; é risco de leitura. | Recomendar acento fora da faixa vermelha quando o produto tem estados de erro, ou admitir um `--danger` separado só para erro e ação destrutiva. | julgamento |
| F38 | médio | Ambiguidade | 38–48, 440–442, 459, 607, 742, 746 | O teste "que decisão este dado muda?" não é traduzido para vitrine: não diz se imagem de produto, depoimento, FAQ ou rodapé legal passam. Mídia só tem o raio (28px); não há proporção, fundo nem estilo. Um placeholder chapado com raio 28 é, visualmente, o "bloco cinza com canto arredondado flutuando" que as L440–442 condenam. | Lista fechada do que uma vitrine pode ter (herói, até N blocos de recurso com mídia, preço, perguntas, rodapé legal) + "mídia: proporção 16:10 ou 4:3, fundo `--sunken`, sem texto sobreposto". | leitura + mockup-1 |
| F39 | médio | Ambiguidade | 715–718 | No fluxo, a barra fixa leva "o resumo do que já foi escolhido como legenda" e, na frase seguinte, "não pode ser gasta com resumo passivo". Lido em sequência, contradiz. | "A barra fixa contém o botão primário e, acima dele, uma linha de resumo (item · preço). Nada além disso." | leitura |
| F40 | médio | Padrões / acessibilidade | 889–890 | Tabela "Nativo": `FontFeature("tnum")` é API do Flutter, não do Jetpack Compose (lá é `TextStyle(fontFeatureSettings = "tnum")`). E `.font(.system(size:weight:))` fixa o tamanho no iOS e ignora o Dynamic Type — contra o HIG que o doc cita como fonte. | Compose: `TextStyle(fontFeatureSettings = "tnum")`. SwiftUI: `.font(.system(size: N, weight: W))` só com `@ScaledMetric`, ou `Font.custom(_, size:, relativeTo:)`. | conhecimento (APIs das plataformas) |
| F41 | baixo | Erro pontual | 168, 175 | A fórmula "−(tamanho − 40) × 0,000375em" dá −0,006em em 56px; a tabela e o token dizem −0,005em (48, 64 e 80 batem). | Remover a fórmula ou corrigir 56px para −0,006em. | aritmética |
| F42 | baixo | Coerência | 396, 400, 825 | "O par é assimétrico: o rodapé da seção é maior que o topo", mas em ≤1068 o par é 80/80. | 80/88, ou "assimétrico exceto em 735–1068". | leitura |
| F43 | baixo | Erro pontual | 202–203, 240 | "A Inter estreita 0,8% de 14px para 48px": com a URL da L195, no Chrome, a largura por em cai 6,61% (0,00% com `font-optical-sizing: none`). "Tabular alarga ~4%": +9,6% a +10,6% em "0123456789", +2,7% a +3,4% em "R$ 380,00" e +36% a +38% em "R$ 1.111,11". | "Estreita ~6,6% de 14 para 32px ou mais." "Tabular alarga de 3% a 38% conforme os dígitos; dimensione a coluna pela pior sequência (1111)." | medido |
| F44 | baixo | Erro pontual | 775–777, 551–552 | Comentários de contraste dos tokens sem fundo declarado e com valores que não batem: `--ink` "16,9" (17,21 surface / 16,36 paper); `--ink-2` "5,6" (5,55 / 5,28); `--ink-3` "3,9" (3,63 / 3,45). O "~2,9:1" das L551–552 também não é reproduzível (2,08–2,69 conforme a leitura). | Comentar com o fundo: `/* 17,2 surface · 16,4 paper */`, `/* 5,6 · 5,3 */`, `/* 3,6 · 3,4 */`. | calculado |
| F45 | baixo | Erro pontual | 425–426 | "164 blocos: 102 à esquerda, 61 centralizados" soma 163. | Corrigir a contagem ou dizer onde está o 164º. | aritmética |
| F46 | baixo | Coerência | 228–230 vs 914 | 3.7 admite uma exceção de versalete; o checklist exige "Zero `text-transform: uppercase`" e o script trata qualquer caixa alta como falha. | Tirar a exceção do corpo, ou checklist "zero, salvo o rótulo declarado em 3.7". | leitura |
| F47 | baixo | Coerência | 233, 579 vs 158, 172–173, 803–804 | Cabeçalho de coluna com `letter-spacing: 0`, mas "tracking é função do tamanho, não do papel" e a tabela manda −0,005em em 12px e −0,008em em 14px. O tamanho de fonte do cabeçalho nem é dito. | "Cabeçalho: 12px, peso 400, `--ink-2`, tracking da tabela 3.4 (−0,005em)." | leitura |
| F48 | baixo | Coerência | 767–768, 772, 834–849 vs 667–669 | `--fill` e `--fill-2` usam bases RGB diferentes (118,114,106 × 120,116,108). `--fill-2` e `--line-2` não têm papel descrito em lugar nenhum. O JSON omite `fill`, `fill-2`, `line-2` e `accent-tint` e traz 2 durações (150/280) para as 3 faixas da seção 8; o CSS não tem token de duração. | Uma base para os dois fills; descrever `--fill-2` (hover de `--fill`) e `--line-2`, ou removê-los; tokens `--dur-fast: 150ms; --dur-base: 280ms; --dur-screen: 320ms` nos três formatos. | leitura |
| F49 | baixo | Padrões | 514, 517–518, 935 | "`box-shadow` é recortado por `overflow: hidden`, que todo cartão usa": o `overflow` de um elemento não recorta a própria sombra; quem recorta é o `overflow` de um ancestral, e ele recorta `outline` também. Trocar por `outline` não salva o anel de um botão na borda de um cartão com `overflow: hidden`. | "Use `outline` porque acompanha o raio e não disputa com as sombras do componente; para não ser cortado, o contêiner com `overflow: hidden` precisa de 4px ou mais de folga interna." | conhecimento (CSS) |
| F50 | baixo | Erro pontual | 689–691 | "Interruptor sem rótulo visível precisa de `<label for>` ou `aria-label`": `<label for>` é um rótulo visível; a frase se contradiz. | "Com rótulo visível: `<label for>` ou `aria-labelledby`. Sem rótulo visível: `aria-label`." | leitura |
| F51 | baixo | Padrões (imprecisão) | 118–120 | "`-apple-system`… no Windows cai em Segoe UI, no Android em Roboto": fora de sistemas Apple a palavra-chave não resolve para nada; quem entrega Segoe ou Roboto é o que vem depois na stack. | "…no Windows e no Android o navegador ignora `-apple-system` e usa o próximo nome da stack." | conhecimento (CSS) |
| F52 | baixo | Ambiguidade | 598 | "Ligado = preenchimento em tinta (não no acento, se houver N na mesma tela)": N não é definido, e a frase sugere acento quando há um só interruptor, o que contraria a L253. | "Ligado = `--ink`, sempre." | leitura |
| F53 | baixo | Padrões | 388–392 | O gutter proporcional cria um salto no breakpoint: em 734px a margem é 45,9px; em 735px volta a 22px (conteúdo 642 → 691). | `padding-inline: max(22px, 6.25%)` contínuo. | aritmética |
| F54 | baixo | Erro pontual (script) | 942–958 | Limitações do script: `leaf` ignora texto de elementos que têm filhos (`<td>texto <b>x</b></td>`); não enxerga pseudo-elementos (a sombra do interruptor); conta o DOM inteiro, não o viewport; compara o acento por string exata. | Usar `TreeWalker` de nós de texto para tamanhos e pesos; filtrar por `getBoundingClientRect()` dentro do viewport. | leitura + execução |
| F55 | baixo | Coerência | 276–279, 287, 685, 920, 1006–1008 | O alvo de 7:1 aparece como "mire" (L276, L685), como requisito "(≥7:1)" (L287, L1006) e some do checklist (4,5:1, L920). A justificativa é imprecisa: o contraste é simétrico, então 4,5:1 com branco já serve a botão e a link sobre branco; o que os 7:1 compram é folga sobre superfícies não brancas (acento 6,43:1 sobre fill/sunken; `#0071E3` cai a 4,31 sobre `#F5F5F7`). | "Requisito: acento ≥4,5:1 sobre a superfície mais escura onde ele vira texto (`--fill` sobre `--sunken`). Na prática isso pede cerca de 6:1 com branco." | calculado |
| F56 | baixo | Coerência | 151, 710, 866, 980–981 | Corpo de ferramenta é 14px, mas o line-height de 14px não é fechado: `--lh-denso` (+6) é "célula de tabela, rótulo", o Tailwind fixa `sm` em +6 sempre e o prompt só cita +4 e +8. | "14px: +6 em tabela, lista e controle; +8 em parágrafo." Incluir `--lh-denso` e `--lh-botao` no prompt. | leitura |

**Contagem:** crítico 2 · alto 12 · médio 26 · baixo 16 · total 56.

## Tabela de contraste

Fórmula: luminância relativa sRGB da WCAG 2.x, razão `(L1 + 0,05) / (L2 + 0,05)`. Cores com alfa (`--fill`, `--fill-2`, opacidade, toast, barra) foram compostas sobre o fundo real antes do cálculo; os hex das colunas "Frente" e "Fundo" já são os compostos. Script: `scratchpad\ds01\contraste2.js`.

**96 pares calculados; 34 reprovam na exigência aplicável.** "—" no veredito significa que não há exigência WCAG para o par (decorativo, informativo ou controle inativo).

**1. Texto principal `--ink` (L775)**

| Par | Frente | Fundo | Razão | Passa 4,5 (texto normal) | Passa 3,0 (texto grande / UI) | Exigência aplicável | Veredito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--ink` sobre `--surface` | #1C1B19 | #FFFFFF | 17,21:1 | sim | sim | texto 4,5 | passa |
| `--ink` sobre `--paper` | #1C1B19 | #FAF9F7 | 16,36:1 | sim | sim | texto 4,5 | passa |
| `--ink` sobre `--sunken` | #1C1B19 | #F4F2EC | 15,37:1 | sim | sim | texto 4,5 | passa |
| `--ink` sobre `--fill` sobre surface | #1C1B19 | #EFEEED | 14,85:1 | sim | sim | texto 4,5 | passa |
| `--ink` sobre `--fill` sobre paper | #1C1B19 | #EAE9E6 | 14,16:1 | sim | sim | texto 4,5 | passa |
| `--ink` sobre `--fill` sobre sunken | #1C1B19 | #E5E3DC | 13,37:1 | sim | sim | texto 4,5 | passa |
| `--ink` sobre `--fill-2` sobre surface | #1C1B19 | #E7E6E5 | 13,79:1 | sim | sim | texto 4,5 | passa |
| `--ink` sobre `--fill-2` sobre paper | #1C1B19 | #E3E1DE | 13,18:1 | sim | sim | texto 4,5 | passa |
| `--ink` sobre `--accent-tint` | #1C1B19 | #F1E6E5 | 14,09:1 | sim | sim | texto 4,5 | passa |

**2. Texto secundário `--ink-2` (L776) — inclui cabeçalho de tabela sobre `--sunken` (L579) e placeholder**

| Par | Frente | Fundo | Razão | Passa 4,5 (texto normal) | Passa 3,0 (texto grande / UI) | Exigência aplicável | Veredito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--ink-2` sobre `--surface` | #6B6862 | #FFFFFF | 5,55:1 | sim | sim | texto 4,5 | passa |
| `--ink-2` sobre `--paper` | #6B6862 | #FAF9F7 | 5,28:1 | sim | sim | texto 4,5 | passa |
| `--ink-2` sobre `--sunken` | #6B6862 | #F4F2EC | 4,96:1 | sim | sim | texto 4,5 | passa |
| `--ink-2` sobre `--fill` sobre surface | #6B6862 | #EFEEED | 4,79:1 | sim | sim | texto 4,5 | passa |
| `--ink-2` sobre `--fill` sobre paper | #6B6862 | #EAE9E6 | 4,57:1 | sim | sim | texto 4,5 | passa |
| `--ink-2` sobre `--fill` sobre sunken | #6B6862 | #E5E3DC | 4,31:1 | não | sim | texto 4,5 | **reprova** |
| `--ink-2` sobre `--fill-2` sobre surface | #6B6862 | #E7E6E5 | 4,45:1 | não | sim | texto 4,5 | **reprova** |
| `--ink-2` sobre `--fill-2` sobre paper | #6B6862 | #E3E1DE | 4,25:1 | não | sim | texto 4,5 | **reprova** |
| `--ink-2` sobre `--accent-tint` | #6B6862 | #F1E6E5 | 4,55:1 | sim | sim | texto 4,5 | passa |

**3. "Letra miúda" `--ink-3` (L316, L777)**

| Par | Frente | Fundo | Razão | Passa 4,5 (texto normal) | Passa 3,0 (texto grande / UI) | Exigência aplicável | Veredito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--ink-3` sobre `--surface` | #8A867E | #FFFFFF | 3,63:1 | não | sim | texto 4,5 (letra miúda não é texto grande) | **reprova** |
| `--ink-3` sobre `--paper` | #8A867E | #FAF9F7 | 3,45:1 | não | sim | texto 4,5 (letra miúda não é texto grande) | **reprova** |
| `--ink-3` sobre `--sunken` | #8A867E | #F4F2EC | 3,24:1 | não | sim | texto 4,5 (letra miúda não é texto grande) | **reprova** |
| `--ink-3` sobre `--fill` sobre surface | #8A867E | #EFEEED | 3,13:1 | não | sim | texto 4,5 (letra miúda não é texto grande) | **reprova** |
| `--ink-3` sobre `--fill` sobre paper | #8A867E | #EAE9E6 | 2,98:1 | não | não | texto 4,5 (letra miúda não é texto grande) | **reprova** |
| `--ink-3` sobre `--fill` sobre sunken | #8A867E | #E5E3DC | 2,82:1 | não | não | texto 4,5 (letra miúda não é texto grande) | **reprova** |
| `--ink-3` sobre `--fill-2` sobre surface | #8A867E | #E7E6E5 | 2,91:1 | não | não | texto 4,5 (letra miúda não é texto grande) | **reprova** |
| `--ink-3` sobre `--fill-2` sobre paper | #8A867E | #E3E1DE | 2,78:1 | não | não | texto 4,5 (letra miúda não é texto grande) | **reprova** |
| `--ink-3` sobre `--accent-tint` | #8A867E | #F1E6E5 | 2,97:1 | não | não | texto 4,5 (letra miúda não é texto grande) | **reprova** |

**4. Estado "Resolvido / concluído": `--ink-3` com opacidade 45–55% (L335)**

| Par | Frente | Fundo | Razão | Passa 4,5 (texto normal) | Passa 3,0 (texto grande / UI) | Exigência aplicável | Veredito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--ink-3` a 45% sobre `--surface` | #CAC9C5 | #FFFFFF | 1,66:1 | não | não | texto 4,5 | **reprova** |
| `--ink-3` a 45% sobre `--paper` | #C8C5C1 | #FAF9F7 | 1,63:1 | não | não | texto 4,5 | **reprova** |
| `--ink-3` a 45% sobre `--sunken` | #C4C1BB | #F4F2EC | 1,60:1 | não | não | texto 4,5 | **reprova** |
| `--ink-3` a 50% sobre `--surface` | #C5C3BF | #FFFFFF | 1,77:1 | não | não | texto 4,5 | **reprova** |
| `--ink-3` a 50% sobre `--paper` | #C2C0BB | #FAF9F7 | 1,74:1 | não | não | texto 4,5 | **reprova** |
| `--ink-3` a 50% sobre `--sunken` | #BFBCB5 | #F4F2EC | 1,69:1 | não | não | texto 4,5 | **reprova** |
| `--ink-3` a 55% sobre `--surface` | #BFBCB8 | #FFFFFF | 1,89:1 | não | não | texto 4,5 | **reprova** |
| `--ink-3` a 55% sobre `--paper` | #BCBAB4 | #FAF9F7 | 1,85:1 | não | não | texto 4,5 | **reprova** |
| `--ink-3` a 55% sobre `--sunken` | #BAB7B0 | #F4F2EC | 1,80:1 | não | não | texto 4,5 | **reprova** |

**5. Acento como texto: link, terciário, crítico, erro (L287, L338, L539, L564)**

| Par | Frente | Fundo | Razão | Passa 4,5 (texto normal) | Passa 3,0 (texto grande / UI) | Exigência aplicável | Veredito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--accent` sobre `--surface` | #8E2C26 | #FFFFFF | 8,27:1 | sim | sim | texto 4,5 | passa |
| `--accent` sobre `--paper` | #8E2C26 | #FAF9F7 | 7,86:1 | sim | sim | texto 4,5 | passa |
| `--accent` sobre `--sunken` | #8E2C26 | #F4F2EC | 7,39:1 | sim | sim | texto 4,5 | passa |
| `--accent` sobre `--fill` sobre surface | #8E2C26 | #EFEEED | 7,14:1 | sim | sim | texto 4,5 | passa |
| `--accent` sobre `--fill` sobre paper | #8E2C26 | #EAE9E6 | 6,81:1 | sim | sim | texto 4,5 | passa |
| `--accent` sobre `--fill` sobre sunken | #8E2C26 | #E5E3DC | 6,43:1 | sim | sim | texto 4,5 | passa |
| `--accent` sobre `--fill-2` sobre surface | #8E2C26 | #E7E6E5 | 6,63:1 | sim | sim | texto 4,5 | passa |
| `--accent` sobre `--fill-2` sobre paper | #8E2C26 | #E3E1DE | 6,34:1 | sim | sim | texto 4,5 | passa |
| `--accent` sobre `--accent-tint` | #8E2C26 | #F1E6E5 | 6,77:1 | sim | sim | texto 4,5 | passa |
| `--accent-hover` (link em hover) sobre `--surface` | #9C332C | #FFFFFF | 7,18:1 | sim | sim | texto 4,5 | passa |
| `--accent-hover` (link em hover) sobre `--paper` | #9C332C | #FAF9F7 | 6,83:1 | sim | sim | texto 4,5 | passa |
| `--accent-hover` (link em hover) sobre `--sunken` | #9C332C | #F4F2EC | 6,42:1 | sim | sim | texto 4,5 | passa |
| `--accent-active` (link pressionado) sobre `--surface` | #7A2520 | #FFFFFF | 9,94:1 | sim | sim | texto 4,5 | passa |
| `--accent-active` (link pressionado) sobre `--paper` | #7A2520 | #FAF9F7 | 9,45:1 | sim | sim | texto 4,5 | passa |
| `--accent-active` (link pressionado) sobre `--sunken` | #7A2520 | #F4F2EC | 8,88:1 | sim | sim | texto 4,5 | passa |

**6. Texto sobre cor de marca e botões (L537–538, L780–784)**

| Par | Frente | Fundo | Razão | Passa 4,5 (texto normal) | Passa 3,0 (texto grande / UI) | Exigência aplicável | Veredito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--on-accent` (#FFF) sobre `--accent` | #FFFFFF | #8E2C26 | 8,27:1 | sim | sim | texto 4,5 | passa |
| `--on-accent` sobre `--accent-hover` | #FFFFFF | #9C332C | 7,18:1 | sim | sim | texto 4,5 | passa |
| `--on-accent` sobre `--accent-active` | #FFFFFF | #7A2520 | 9,94:1 | sim | sim | texto 4,5 | passa |
| branco sobre `--ink` (secundário em tinta) | #FFFFFF | #1C1B19 | 17,21:1 | sim | sim | texto 4,5 | passa |
| `--ink` sobre `--fill`/paper (secundário em fill) | #1C1B19 | #EAE9E6 | 14,16:1 | sim | sim | texto 4,5 | passa |
| `--ink` sobre `--fill`/surface (secundário em fill) | #1C1B19 | #EFEEED | 14,85:1 | sim | sim | texto 4,5 | passa |
| `--ink` sobre `--fill-2`/paper (secundário em hover) | #1C1B19 | #E3E1DE | 13,18:1 | sim | sim | texto 4,5 | passa |

**7. Botão desabilitado: fundo `--fill`, texto `--ink-3` (L552–553)**

| Par | Frente | Fundo | Razão | Passa 4,5 (texto normal) | Passa 3,0 (texto grande / UI) | Exigência aplicável | Veredito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--ink-3` sobre `--fill`/surface | #8A867E | #EFEEED | 3,13:1 | não | sim | isento na WCAG (controle inativo); o doc exige que o rótulo seja lido (L555) — ver F04 | — |
| `--ink-3` sobre `--fill`/paper | #8A867E | #EAE9E6 | 2,98:1 | não | não | idem | — |
| `--ink-3` sobre `--fill`/sunken | #8A867E | #E5E3DC | 2,82:1 | não | não | idem | — |

**8. Cor como único indicador (1.4.1; técnica G183 pede 3:1 entre o link e o texto vizinho)**

| Par | Frente | Fundo | Razão | Passa 4,5 (texto normal) | Passa 3,0 (texto grande / UI) | Exigência aplicável | Veredito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--accent` vs `--ink` (link/crítico vs texto normal) | #8E2C26 | #1C1B19 | 2,08:1 | não | não | distinção por cor 3,0 | **reprova** |
| `--accent` vs `--ink-2` | #8E2C26 | #6B6862 | 1,49:1 | não | não | distinção por cor 3,0 | **reprova** |

**9. Anel de foco `2px solid var(--accent)` (L513) — 1.4.11**

| Par | Frente | Fundo | Razão | Passa 4,5 (texto normal) | Passa 3,0 (texto grande / UI) | Exigência aplicável | Veredito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| anel `--accent` vs `--surface` | #8E2C26 | #FFFFFF | 8,27:1 | sim | sim | não-textual 3,0 | passa |
| anel `--accent` vs `--paper` | #8E2C26 | #FAF9F7 | 7,86:1 | sim | sim | não-textual 3,0 | passa |
| anel `--accent` vs `--sunken` | #8E2C26 | #F4F2EC | 7,39:1 | sim | sim | não-textual 3,0 | passa |
| anel `--accent` vs `--accent-tint` | #8E2C26 | #F1E6E5 | 6,77:1 | sim | sim | não-textual 3,0 | passa |
| anel `--accent` vs `--ink` (só se houver controle dentro de superfície em tinta, ex.: ação num toast) | #8E2C26 | #1C1B19 | 2,08:1 | não | não | não-textual 3,0 (caso condicional) | **reprova** |

**10. Borda de campo (L561: cor não definida — hipóteses com os tokens existentes) — 1.4.11**

| Par | Frente | Fundo | Razão | Passa 4,5 (texto normal) | Passa 3,0 (texto grande / UI) | Exigência aplicável | Veredito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| borda `--line` vs `--surface` | #E8E4DC | #FFFFFF | 1,27:1 | não | não | não-textual 3,0 | **reprova** |
| borda `--line` vs `--paper` | #E8E4DC | #FAF9F7 | 1,21:1 | não | não | não-textual 3,0 | **reprova** |
| borda `--line-2` vs `--surface` | #CBC6BC | #FFFFFF | 1,70:1 | não | não | não-textual 3,0 | **reprova** |
| borda `--line-2` vs `--paper` | #CBC6BC | #FAF9F7 | 1,62:1 | não | não | não-textual 3,0 | **reprova** |
| borda `--ink-3` vs `--surface` | #8A867E | #FFFFFF | 3,63:1 | não | sim | não-textual 3,0 | passa |
| borda `--ink-3` vs `--paper` | #8A867E | #FAF9F7 | 3,45:1 | não | sim | não-textual 3,0 | passa |

**11. Componentes: fronteira e estado (1.4.11 quando é o único indicador)**

| Par | Frente | Fundo | Razão | Passa 4,5 (texto normal) | Passa 3,0 (texto grande / UI) | Exigência aplicável | Veredito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| segmented: pílula branca vs trilho `--fill`/surface (L591) | #FFFFFF | #EFEEED | 1,16:1 | não | não | estado 3,0 (único sinal além da posição) | **reprova** |
| segmented: pílula branca vs trilho `--fill`/paper | #FFFFFF | #EAE9E6 | 1,22:1 | não | não | estado 3,0 | **reprova** |
| lateral: pílula `--fill` vs fundo `--paper` (L616) | #EAE9E6 | #FAF9F7 | 1,15:1 | não | não | há peso 600 como segundo sinal | — |
| lateral: pílula `--fill` vs fundo `--sunken` | #E5E3DC | #F4F2EC | 1,15:1 | não | não | há peso 600 como segundo sinal | — |
| interruptor ligado: trilho `--ink` vs `--surface` (L598) | #1C1B19 | #FFFFFF | 17,21:1 | sim | sim | não-textual 3,0 | passa |
| interruptor ligado: botão branco vs trilho `--ink` | #FFFFFF | #1C1B19 | 17,21:1 | sim | sim | não-textual 3,0 | passa |
| interruptor desligado (cor não definida; hipótese `--fill-2`): trilho vs `--surface` | #E7E6E5 | #FFFFFF | 1,25:1 | não | não | não-textual 3,0 | **reprova** |
| interruptor desligado (hipótese `--fill-2`): botão branco vs trilho | #FFFFFF | #E7E6E5 | 1,25:1 | não | não | não-textual 3,0 | **reprova** |
| interruptor desligado (hipótese `--fill`): trilho vs `--surface` | #EFEEED | #FFFFFF | 1,16:1 | não | não | não-textual 3,0 | **reprova** |

**12. Degraus de superfície e separadores (sem exigência WCAG; é o "degrau real" das L324–327)**

| Par | Frente | Fundo | Razão | Passa 4,5 (texto normal) | Passa 3,0 (texto grande / UI) | Exigência aplicável | Veredito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `--surface` vs `--paper` (cartão sobre página) | #FFFFFF | #FAF9F7 | 1,05:1 | não | não | informativo | — |
| `--surface` vs `--sunken` | #FFFFFF | #F4F2EC | 1,12:1 | não | não | informativo | — |
| `--paper` vs `--sunken` (faixa de capítulo) | #FAF9F7 | #F4F2EC | 1,06:1 | não | não | informativo | — |
| referência do doc: #FFFFFF vs #F5F5F7 (L325) | #FFFFFF | #F5F5F7 | 1,09:1 | não | não | informativo | — |
| separador `--line` vs `--surface` | #E8E4DC | #FFFFFF | 1,27:1 | não | não | decorativo | — |
| separador `--line` vs `--paper` | #E8E4DC | #FAF9F7 | 1,21:1 | não | não | decorativo | — |

**13. Toast, barra translúcida e véu (L624–627, L643, L658)**

| Par | Frente | Fundo | Razão | Passa 4,5 (texto normal) | Passa 3,0 (texto grande / UI) | Exigência aplicável | Veredito |
| --- | --- | --- | --- | --- | --- | --- | --- |
| toast: branco sobre tinta a 92% / paper | #FFFFFF | #2E2D2B | 13,80:1 | sim | sim | texto 4,5 | passa |
| toast: branco sobre tinta a 92% / surface | #FFFFFF | #2E2D2B | 13,71:1 | sim | sim | texto 4,5 | passa |
| barra 80%: `--ink` com `--paper` por baixo | #1C1B19 | #FAF9F7 | 16,36:1 | sim | sim | texto 4,5 | passa |
| barra 80%: `--ink` com `--ink` por baixo (pior caso, sem contar o blur) | #1C1B19 | #CECDCB | 10,79:1 | sim | sim | texto 4,5 | passa |
| barra 80%: `--ink-2` com `--ink` por baixo (pior caso) | #6B6862 | #CECDCB | 3,48:1 | não | sim | texto 4,5 | **reprova** |
| barra 80%: `--ink` com `--accent` por baixo | #1C1B19 | #E4D0CD | 11,65:1 | sim | sim | texto 4,5 | passa |
| véu do modal: `--ink` vs `--paper` vistos sob rgba(0,0,0,.28) | #141312 | #B4B3B2 | 8,86:1 | sim | sim | informativo (conteúdo inerte atrás do modal) | — |

### Pares que reprovam, agrupados

| Grupo | Razão | Exige | Achado |
| --- | --- | --- | --- |
| Estado "resolvido": `--ink-3` a 45–55% sobre surface, paper e sunken (9 pares) | 1,60 a 1,89:1 | 4,5 | F01 |
| `--ink-3` como texto sobre surface, paper, sunken, fill, fill-2 e accent-tint (9 pares) | 2,78 a 3,63:1 | 4,5 | F02 |
| `--ink-2` sobre `--fill`/sunken, `--fill-2`/surface e `--fill-2`/paper (3 pares) | 4,25 a 4,45:1 | 4,5 | combinações não proibidas pelo doc |
| `--accent` vs `--ink` e vs `--ink-2`, como distinção só por cor (2 pares) | 2,08 e 1,49:1 | 3,0 | F03 |
| Borda de campo com `--line` ou `--line-2` (4 pares) | 1,21 a 1,70:1 | 3,0 | F06 |
| Segmented: pílula branca vs trilho (2 pares) | 1,16 e 1,22:1 | 3,0 | F32 |
| Interruptor desligado, em qualquer hipótese de cor (3 pares) | 1,16 a 1,25:1 | 3,0 | F32 |
| Anel de foco `--accent` sobre superfície em tinta (1 par, condicional) | 2,08:1 | 3,0 | nota |
| `--ink-2` na barra translúcida com conteúdo escuro por baixo (1 par, pior caso) | 3,48:1 | 4,5 | F27 |

Fora da contagem (isento pela WCAG, mas relevante): botão desabilitado `--ink-3` sobre `--fill` = **2,82 a 3,13:1** (F04).

Passam com folga: `--ink` em qualquer superfície (13,18 a 17,21:1); `--ink-2` sobre surface, paper e sunken (5,55 / 5,28 / 4,96); `--accent` como texto em qualquer superfície (6,34 a 8,27); branco sobre `--accent` (8,27), `--accent-hover` (7,18) e `--accent-active` (9,94); toast (13,7); anel de foco sobre superfícies claras (6,77 a 8,27).

### Conferência dos números que o próprio documento afirma

| Linha | Afirmação | Resultado | Confere? |
| --- | --- | --- | --- |
| 266–273 | 8 cores de sistema com branco: 4,02 · 3,55 · 3,50 · 4,13 · 2,57 · 2,22 · 2,20 · 5,65 | idênticos, usando os hex do iOS claro (#007AFF, #FF3B30, #A2845E, #AF52DE, #30B0C7, #34C759, #FF9500, #5856D6) | sim |
| 274 | `#0071E3` com branco = 4,70 | 4,70 | sim |
| 319–321 | secondary / tertiary / quaternaryLabel = 3,44 · 1,74 · 1,37 | 3,44 · 1,73 · 1,37 | sim |
| 506–507 | anel `rgba(keyColor, .6)` sobre branco = 2,27 | 2,27 com `rgba(0,125,250,.6)`; 2,46 com `rgba(0,113,227,.6)` | sim, se keyColor = #007DFA (o doc não dá o hex) |
| 551–552 | opacidade 42% ≈ 2,9:1 | 2,08 a 2,69, conforme a leitura da frase | não |
| 775 | `--ink` 16,9:1 | 17,21 (surface) · 16,36 (paper) | não bate com nenhum fundo |
| 776 | `--ink-2` 5,6:1 | 5,55 (surface) · 5,28 (paper) | sim, sobre surface |
| 777 | `--ink-3` 3,9:1 | 3,63 (surface) · 3,45 (paper) | não |
| 780 | `--accent` 8,3:1 com branco | 8,27 | sim |
| 783 | `--accent-tint` ~12% | `#F1E6E5` = 12% do acento sobre branco | sim |
| 293–294 | hover mais claro, active mais escuro | luminância 0,096 > 0,077 > 0,056 | sim |
| 155–156 | line-height dos 13 degraus | tamanho + 4 em todos | sim |
| 175 | fórmula do tracking acima de 40px | 48, 64 e 80 batem; 56 dá −0,006 | parcial (F41) |
| 391 | gutter 20px em 320 e 27px em 430 | 20,0 e 26,9 | sim |
| 425 | 164 = 102 + 61 | 163 | não (F45) |
| 14–30 | 15 âncoras do índice | todas resolvem pelo slug do GitHub | sim |
| 195, 205–207 | URL do Google Fonts válida; com e sem `opsz` servem arquivos diferentes | HTTP 200 nas duas; arquivos `.woff2` distintos | sim |
| 202 | Inter estreita 0,8% de 14 para 48px | 6,61% | não (F43) |
| 240 | tabular alarga ~4% | 2,7% a 38%, conforme os dígitos | parcial (F43) |
| 353 | 1024 − 44 = 980 | só com `border-box`; sem ele, 1024 | condicional (F12) |
| 879 | Tailwind por CDN não lê config de tema | lê | não (F20) |

### Valores das correções propostas

| Proposta | Par | Razão |
| --- | --- | --- |
| Resolvido em `--ink-2`, sem opacidade (F01) | `#6B6862` sobre surface / paper / sunken | 5,55 / 5,28 / 4,96 |
| `--ink-3` = `#827E76`, só não-texto e texto grande (F02) | sobre surface / paper / sunken / fill-sunken | 4,04 / 3,84 / 3,61 / 3,14 |
| Desabilitado em `--ink-2` sobre `--fill` (F04) | sobre fill-surface / fill-paper / fill-sunken | 4,79 / 4,57 / 4,31 |
| Borda de campo em `--ink-3` atual (F06) | `#8A867E` vs surface / paper | 3,63 / 3,45 |
| `--paper` = `#F5F4F1` (F15) | branco vs novo paper | 1,10 (referência do doc: 1,09) |

## Afirmações sobre apple.com e HIG

O documento diz que os números "saíram do CSS de produção do apple.com" (L6–8). Não acessei o apple.com nesta auditoria; a separação abaixo é entre o que o texto permite conferir, o que coincide com o que conheço e o que não dá para saber.

**Não verificável a partir do texto** (nenhuma fonte, data ou URL é citada):
- 63 arquivos `@font-face` de SF Pro (L124).
- "Não existe peso 700 na tipografia de marketing" (L215–216) e "nenhum token aplica `text-transform`" (L224).
- 164 blocos contados numa página de produto e herói do MacBook Air à esquerda (L425–426).
- Uma única sombra numa folha de 1,3 MB (L473–474).
- Ritmo de 110–162px (L404) e proporção de 1 bloco cinza para 3 brancos (L438).
- "A Inter já nasce apertada" (L181) e "medido em `canvas`" (L7–8): o método de medição não é descrito.

**Coincide com o que conheço, sem reverificar:**
- Botão `#0071E3` → hover `#0077ED` → active `#006EDB`; link `#0066CC`.
- Breakpoints 734 / 1068 / 1441 e 833 na navegação; conteúdo 980 e 692; `87.5%` no mobile.
- `saturate(180%) blur(20px)` sobre fundo a 80%; curva `cubic-bezier(0.28, 0.11, 0.32, 1)`.
- Tracking −0,022em em 17px, positivo em 19–32px, 0 em 40px; line-height = tamanho + 4 em título e + 8 em corpo.
- Cartão da loja com raio 18 e `2px 4px 12px rgba(0,0,0,.08)`.
- A stack do apple.com não usa `-apple-system`.

**Diverge do que conheço ou medi:**
- "Acima de 1441px a Apple mantém 980px" (L370): lembro de páginas de produto que alargam o conteúdo nesse breakpoint. Não reverificado.
- "Não copie o tracking da Apple literalmente… use metade" (L179–182): os valores do doc para 48, 56, 64 e 80px são, pelo que conheço, os da Apple sem alteração; a "metade" só foi aplicada de 12 a 17px. O texto não delimita isso.
- Os dois números medidos da Inter (0,8% e ~4%) não se reproduzem (F43).

## O que está bom

- **O princípio de subtração é operacional.** A pergunta "que decisão este dado muda?", a lista de respostas inválidas (L45–48) e a distinção controle × display com aprovação humana para cortar controle (L69–71) dão um critério de corte que um agente consegue aplicar.
- **A seção 4.2 está certa nos números.** As 12 razões de contraste citadas se reproduzem, e a conclusão ("calcule o acento, não escolha do catálogo") é o conselho correto. O acento padrão passa como fundo e como texto em todas as superfícies (6,34 a 8,27:1).
- **Anel de foco (6.4).** Cita o critério certo (1.4.11), usa `:focus-visible`, opacidade cheia e offset maior em linha de tabela. Calculado: 6,77 a 8,27:1 nas superfícies claras.
- **"Três referências" (seção 10).** Separar vitrine, fluxo e ferramenta com números evita o erro mais comum de agentes. Nos mockups, essa tabela foi a parte mais útil do documento.
- **Aceite executável.** Checklist mais script de console é a ideia certa; o script rodou nos dois mockups e pegou o que promete (famílias, tamanhos, pesos, caixa alta), apesar dos defeitos de F08, F31 e F54.
- **Tipografia como sistema fechado.** Rampa, line-height por fórmula, tracking por tamanho, dois pesos e `tabular-nums`. O aviso sobre o `opsz,` na URL é verdadeiro e foi confirmado.
- **Regras de comportamento concretas.** Tabela vira cartões no mobile, nunca rolagem horizontal (L586); botão desabilitado diz o que falta (L555); confirmação destrutiva com o número real (L645–648); nenhuma ação só em hover (L500).
- **Índice e referências cruzadas.** As 15 âncoras resolvem e "ver 3.5" / "ver 6.4" apontam para seções que existem.

## Script de auditoria do documento rodado nos mockups

| Campo | Esperado (L961–963) | mockup-1 (vitrine) | mockup-2 (ferramenta) |
| --- | --- | --- | --- |
| `familias` | 1–2 | Inter | Inter |
| `tamanhos` | ≤4 | 14, 17, 28, 56 | 12, 14, 17, 28 |
| `pesos` | 400, 600 | 400, 600 | 400, 600 |
| `caixaAlta` | vazio | vazio | vazio |
| `acentoFundo` | 1 item | "Testar 30 dias grátis" | "Nova ordem" |
| `sombras` | ≤2 | 0 | **3** — campo (L561), cartão (L608), segmented (L592) |
| `conteudo` | 980 | 980 | **1132** — ferramenta é fluida (L364) |

O mockup-2 reprova em dois campos do script cumprindo o documento à letra (F08, F31). Fora do script, medi no mockup-2: raios 6, 7, 8, 9, 18, 50% e 980 (7 e 9 fora da escada, F09) e um alvo abaixo de 28px (interruptor de 38×22, F18).

## Onde os mockups seguem o documento mesmo estando errado

| O que se vê na imagem | Regra seguida | Achado |
| --- | --- | --- |
| Linhas "Entregue" quase ilegíveis (1,77:1), nas duas telas | L335: `--ink-3`, 400, opacidade 50% | F01 |
| "Atrasada 2 dias" na mesma cor do botão "Nova ordem" | L338 e L253: crítico e ação primária usam o acento | F03, F37 |
| Interruptor de 22px de altura | L597: 38×22 | F18 |
| Segmented com raios 9 e 7 | L591–592 | F09 |
| Campo de 36px ao lado de botão de 32px, desalinhados em 4px | L560 e L548 | F17 |
| Três sombras diferentes na tela de ferramenta | L561, L592, L608 | F08 |
| Cartões brancos sobre página quase branca; faixa de preços pouco distinta do resto | tokens das L764–766 | F15 |
| Landing sem CTA em acento no fechamento; botões de plano em estilo secundário | L80, L918, L962 na leitura mais restrita | F11 |
| 200px de vazio entre o herói e o capítulo seguinte | L400: 104 + 96 | — |

Acréscimos meus, que o documento não pede e sem os quais as páginas não ficariam corretas: `box-sizing: border-box`, `margin: 0 auto`, `font-family`, `lang="pt-BR"`, landmarks, `th scope`, `role="switch"`, `role="radiogroup"`, `aria-label` no campo, peso 600 e rótulo por extenso no estado crítico.

## Decisões que precisei tomar por omissão do documento

Cada linha é um ponto em que o documento não disse o que fazer. Dois agentes diferentes chegariam a resultados diferentes em qualquer uma delas.

| # | Tela | O que o documento não define | O que escolhi | Linhas relacionadas |
| --- | --- | --- | --- | --- |
| 1 | ambas | `box-sizing` | `border-box` global; sem isso o contêiner não dá 980 | 353 |
| 2 | ambas | Centralização do contêiner | `margin: 0 auto` no `.shell` | 353, 388 |
| 3 | ambas | `font-family` em CSS | Stack do Tailwind (`Inter, system-ui, sans-serif`) e `font: inherit` nos controles | 874 |
| 4 | ambas | Escala de espaçamento | 2, 4, 6, 8, 10, 12, 16, 20, 24 e 32px, caso a caso | 394–402 |
| 5 | ambas | Qual token é "cinza" e qual é "branco" | Página `--paper`; faixa de capítulo e lateral `--sunken`; cartão `--surface` | 309–311, 437, 608 |
| 6 | ambas | Cor dos separadores e como implementá-los | `--line`, com `border` de 1px para não criar sombra extra | 313, 477 |
| 7 | ambas | Ícones (só há proibições) | Nenhum ícone: sem lupa no campo, sem ícone na navegação, sem seta nas linhas | 652, 659, 731 |
| 8 | ambas | Marca e logotipo | Marca de texto em 17px/600 com um símbolo simples em tinta | — |
| 9 | ambas | Estado "resolvido": vale para a linha ou só para o rótulo? Que valor entre 45 e 55%? | Linha inteira, 50% | 335 |
| 10 | ambas | Estado "crítico": só cor? | Acento + peso 600 + rótulo por extenso | 338, 687 |
| 11 | ambas | Secundário: `--ink` ou `--fill`? Cor do texto sobre tinta? Peso? | `--fill` ao lado de um primário e na ferramenta; `--ink` com texto `--surface` nos planos; peso 400 | 538 |
| 12 | vitrine | O que é "tela" para "1 ação primária" e "acento em 2 lugares" | Leitura mais restrita: um único preenchimento em acento na página inteira | 80, 918, 962 |
| 13 | vitrine | Barra: altura, `sticky` ou `fixed`, borda, conteúdo | 48px, `sticky`, sem borda, links de 14px, sem botão | 621–639 |
| 14 | vitrine | Herói com botão pode ser centralizado? | À esquerda (a regra só libera título + 1 linha) | 428–431 |
| 15 | vitrine | Tamanho da linha de apoio do herói | 28px/400, mesma cor do título | 140, 218–220 |
| 16 | vitrine | Aparência de "mídia" (só o raio é dado) | Painel `--sunken` com raio 28 e fragmentos de interface em tom chapado; superfícies internas com raio 18 | 459, 440–442, 746 |
| 17 | vitrine | Número de colunas da grade | 2 nos recursos e nos planos, 3 nas perguntas | 414–418 |
| 18 | vitrine | Parágrafo de recurso conta como "texto auxiliar" de 1 linha? | Não; tratei como corpo, com no máximo 2 linhas | 82, 908 |
| 19 | vitrine | Tamanho dos títulos de bloco | 17px/600 (hierarquia por peso); título de capítulo em 28px/600 | 218–220 |
| 20 | vitrine | Largura dos blocos de texto | `max-width` de 900px no título e 440px nos parágrafos de recurso | 361–362 |
| 21 | vitrine | Rodapé | Linha `--line`, texto de 14px em `--ink-2`, três links | — |
| 22 | vitrine | Preços sem cartão sobre faixa cinza | Abertura centralizada; duas colunas à esquerda, sem superfície | 428, 607 |
| 23 | ferramenta | Lateral: fundo, tamanho de fonte, rótulos de grupo, largura exata | `--sunken`, 14px, sem rótulos de grupo, 264px | 615–616, 226 |
| 24 | ferramenta | Espaço entre blocos numa ferramenta | 22px (o "bloco de conteúdo 40px" parece valer só para vitrine) | 401, 409–410 |
| 25 | ferramenta | Onde fica a informação herói | Direto sobre a página, sem cartão, em 28px/600 | 79, 84–86 |
| 26 | ferramenta | Tabela dentro de cartão: sangra ou fica dentro do padding? | Dentro, com margem de −12px para alinhar o texto das células ao título | 402, 580 |
| 27 | ferramenta | Cabeçalho da tabela: fonte, fundo, raio | 12px/400 em `--ink-2`, fundo `--sunken`, raio 6 | 311, 579 |
| 28 | ferramenta | Zebra, hover e alinhamento de ID | Sem zebra; hover em `--sunken`; ID à esquerda com `tabular-nums` | 583, 581 |
| 29 | ferramenta | Texto que não cabe na célula | Reticências; removi a coluna "Valor", que estourava e não mudava decisão na fila do dia | 580, 240 |
| 30 | ferramenta | Altura real do botão (a fórmula dá 29px) | Forcei 32px | 548, 152 |
| 31 | ferramenta | Campo: cor da borda, fundo, raio, padding, placeholder, rótulo, foco | `--line-2` (1,70:1), `--surface`, 8px, 12px, `--ink-2`, `aria-label` sem rótulo visível, foco de 2px no acento no lugar do `outline` | 560–562, 312 |
| 32 | ferramenta | Segmented: fonte e peso do selecionado | 14px; selecionado em 600 | 591–593 |
| 33 | ferramenta | Interruptor: cor do desligado, posição do rótulo | `--fill-2`; rótulo à esquerda | 597–599 |
| 34 | ferramenta | Lista agrupada: contêiner, linha de duas linhas, recuo | O próprio cartão é o contêiner; duas linhas dentro dos 44px; separador recuado em 24px | 571–575 |

Outras duas leituras que afetam a tela de ferramenta e que o documento deixa em aberto: dividi as ordens entre herói, lista e tabela para que nenhuma se repetisse (F25), e não contei a navegação lateral como "bloco de informação" (F24).

## O que não consegui verificar ou fazer

- **Origem dos números no apple.com e no HIG.** Não acessei o site; ver a seção de afirmações acima.
- **Estados não renderizados.** Os PNGs mostram só o estado padrão. Hover, foco, pressionado, desabilitado, vazio, carregando, erro, modal e toast não aparecem em imagem; os contrastes desses estados foram calculados, não vistos.
- **Responsivo.** Só 1440px foi renderizado. As regras de ≤1068 e ≤734 estão no CSS dos mockups, sem imagem.
- **Tema escuro.** O documento não tem; nada a calcular.
- **Método de medição da Inter.** Medi por `getBoundingClientRect` no Chrome, com a Inter v20 do Google Fonts. O documento diz ter medido em `canvas`, sem detalhar; a diferença de método não explica 0,8% contra 6,61%.
- **Âncoras.** Conferidas só com o algoritmo de slug do GitHub; outros renderizadores de Markdown tratam acentos de forma diferente.
- **Tabela "Nativo" (L887–894).** Não foi testada em SwiftUI nem em Compose; F40 vem do que conheço das APIs.

## Arquivos

- `analise\01-designsystem\auditoria.md` — este relatório.
- `analise\01-designsystem\mockup-1.html` e `mockup-1.png` (1440×3003) — vitrine da marca fictícia Catraca.
- `analise\01-designsystem\mockup-2.html` e `mockup-2.png` (1440×900) — tela "Hoje" da ferramenta.
- Scripts auxiliares no scratchpad da sessão, pasta `ds01`: `contraste.js`, `contraste2.js`, `medir.html`, `render.ps1`.
