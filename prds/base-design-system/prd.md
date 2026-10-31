---
titulo: Design system base
slug: base-design-system
versao: 3.0.0
status: estavel
superficie: base
dominio: geral
estende: nenhum
idioma: pt-BR
acessibilidade: WCAG 2.2 AA
atualizado: 2026-10-30
---

# Design system base

Contrato de design para produtos que **não têm um PRD específico neste
repositório**. Define sozinho fonte, cor, medidas e comportamento, em qualquer
stack.

Os números de referência são **medições do autor**: CSS de produção do apple.com
(computed styles + leitura das folhas), fontes medidas em `canvas` e o Human
Interface Guidelines. O documento não guarda data, URL nem método dessas
medições, então leia-as como observação do autor, não como dado reproduzível. Os
contrastes são outra coisa: foram calculados pela fórmula de luminância relativa
da WCAG, com os dois hex ao lado (seção 9). Onde existe uma armadilha conhecida,
ela está escrita — a maioria dos erros de "seguir um padrão bonito" vem de
copiar um valor sem saber por que ele existe.

## Escopo

- **Use para:** produto sem PRD próprio neste repositório — página de
  apresentação de produto ou serviço (**vitrine**), sequência curta com um
  objetivo, como cadastro, checkout e onboarding (**fluxo**), e tela de trabalho
  densa, como painel de acompanhamento, console e área administrativa
  (**ferramenta**). A seção 10 diz o que muda entre os três. Web em primeiro
  lugar; a tabela "Nativo" da seção 12 traduz os conceitos para iOS e Android.
  Só tema claro: tema escuro está fora de escopo, não gere.
- **Não use para:** site institucional de escola de idiomas — use
  `site-escola-idiomas`. Frontend de sistema de gestão (cadastros, agenda,
  orçamentos, estoque, caixa, relatórios) — use `sistema-gestao`.
- **Relação com outros PRDs:** autossuficiente (`estende: nenhum`). Os PRDs
  deste repositório são estilos alternativos, não camadas que se somam: escolha
  **um** por projeto e nunca entregue este documento a um agente junto com
  outro. Eles dão ordens opostas sobre fonte, pesos, raios, breakpoints e
  tamanho de controle.

## Como usar

1. Copie este arquivo para a raiz do projeto de destino com o nome
   `PRD-FRONTEND.md`.
2. Troque os tokens de marca seguindo a seção 15 e recalcule a tabela de
   contraste da seção 9 com os valores novos.
3. Peça ao agente: "Siga `PRD-FRONTEND.md`. Antes de entregar, rode o checklist
   de aceite (seção 13) e diga o resultado de cada item." A seção 14 traz o
   prompt completo, com o resumo das regras.

---

## Índice

- [Escopo](#escopo)
- [Como usar](#como-usar)

1. [O princípio](#1-o-princípio)
2. [Composição de tela](#2-composição-de-tela)
3. [Tipografia](#3-tipografia)
4. [Cor](#4-cor)
5. [Layout](#5-layout)
6. [Geometria: raios, sombra, alvos](#6-geometria-raios-sombra-alvos)
7. [Componentes](#7-componentes)
8. [Movimento](#8-movimento)
9. [Acessibilidade](#9-acessibilidade)
10. [Três referências, não uma](#10-três-referências-não-uma)
11. [Anti-padrões](#11-anti-padrões)
12. [Tokens prontos](#12-tokens-prontos)
13. [Checklist de aceite](#13-checklist-de-aceite)
14. [Prompt para agentes de IA](#14-prompt-para-agentes-de-ia)
15. [Como adaptar para outra marca](#15-como-adaptar-para-outra-marca)

---

## 1. O princípio

> **Subtração antes de decoração.**

Cada elemento na tela precisa responder a uma pergunta:

**"Que decisão do usuário este dado muda?"**

Se a resposta for *"nenhuma"*, ele **sai**. Não é reduzido, não é movido para o
rodapé, não vira um ícone menor: sai.

Não valem como resposta: "dá contexto", "mostra profissionalismo", "transmite
confiança", "preenche o espaço", "o concorrente tem". Uma decisão real é do tipo
*"cancelar este pedido"*, *"ligar para o cliente das 15h"*, *"subir o preço"*,
*"escolher o plano anual"*, *"ir até lá hoje"*.

**Espaço vazio é resultado aceito, não problema a resolver.** Com uma condição:
o vazio não pode deixar a tela torta. Coluna de largura limitada fica centralizada
na área útil (5.6), com sobra igual dos dois lados; nada termina à esquerda com
um vazio grande à direita.

Duas consequências que as pessoas resistem:

- **Dado duplicado é dado a menos, não a mais.** Se o mesmo número aparece num
  card, num gráfico e numa tabela da mesma tela, dois deles saem. Duas exceções:
  o item herói pode repetir na lista de onde ele vem, e o painel de detalhe
  repete os campos da linha selecionada.
- **Texto que ensina o óbvio é ruído.** Numa ferramenta usada todo dia, "clique
  para editar" é insulto na décima abertura. Texto explicativo só onde a
  interface não se explica sozinha, e no máximo **uma linha**.

### Como auditar uma tela existente

1. Liste **todos** os elementos visuais (card, KPI, gráfico, coluna, botão,
   chip, parágrafo, selo, ornamento). Conte.
2. Para cada um, escreva a decisão concreta que ele muda — ou escreva
   literalmente "nenhuma".
3. Corte tudo que ficou com "nenhuma".
4. Conte de novo. **A redução tem que ser real**: reagrupar os mesmos elementos
   com outro nome, ou empurrá-los para um modal, não é subtração — é maquiagem.
5. Separe **controle** (o usuário age nele) de **display** (o usuário só lê).
   Cortar display é subtração; cortar controle é **perda funcional** e precisa
   de aprovação humana explícita.

---

## 2. Composição de tela

| Regra | Valor |
| --- | --- |
| Informação **herói** | exatamente **1** por tela |
| **Ação primária** | exatamente **1** visível por tela (zero numa tela só de leitura, declarado) |
| Blocos de informação sem rolar | no máximo **5** |
| Texto auxiliar | no máximo **1 linha** |

Para essas contas valerem como aceite, cada termo tem medida:

- **Tela** e **sem rolar** = o primeiro viewport, nos dois tamanhos de
  referência: **1440×900** e **390×844**. A regra vale nos dois.
- **Bloco de informação** = região com título próprio ou superfície própria.
  Barra, navegação lateral e rodapé não contam.
- **Texto auxiliar** = legenda ou dica ligada a um controle ou a um número, com
  até **60 caracteres**. Parágrafo de corpo não é texto auxiliar.
- **Ação primária** = o único preenchimento em `--accent` do viewport. Numa
  página longa, a mesma ação pode repetir uma vez no fechamento.

**A informação herói** é a que muda o que a pessoa faz nos próximos minutos —
não a mais impressionante. Num painel operacional aberto de hora em hora, o
herói é *"quem é o próximo e quando"*, não o faturamento do mês. Numa
ferramenta ela fica no topo do conteúdo, direto sobre a página, sem cartão.

**A ação primária** é a mais frequente, não a mais importante. Se o botão em
destaque é algo que se faz uma vez por mês, ele está errado.

**Telas sem ação primária existem e tudo bem.** Um relatório é leitura. Assumir
isso é mais honesto do que fabricar um botão para justificar o acento.

### Teste dos 5 segundos

Abra a tela por 5 segundos e diga em voz alta: **(a)** o que ela informa e
**(b)** qual é a ação. Se não conseguir, a hierarquia está errada — não é
problema de cor.

---

## 3. Tipografia

### 3.1 Uma família (no máximo duas)

Uma família resolve 95% dos produtos. Uma segunda só se justifica quando existe
uma voz de marca a carregar, e nesse caso ela fica **restrita aos títulos de uma
única superfície** (a vitrine), nunca na ferramenta.

| Stack | O que usar |
| --- | --- |
| Web | **Inter** com o eixo `opsz` — ver 3.5 |
| iOS / macOS | SF Pro (sistema) |
| Android | Roboto / Roboto Flex |
| Desktop nativo | fonte do sistema |
| Documento / e-mail | fonte do sistema, sem webfont |

⚠️ **Não confie em stack de sistema na web.** `-apple-system` resolve para San
Francisco só em macOS/iOS; no Windows e no Android o navegador ignora a
palavra-chave e usa o próximo nome da stack (Segoe UI, Roboto) — três desenhos
com altura de x e ritmo diferentes. Toda a calibração abaixo fica presa a uma
fonte que a maioria dos visitantes não tem.

E o argumento definitivo: **a própria apple.com não usa `-apple-system`**. Ela
auto-hospeda a SF Pro — 63 arquivos `@font-face`, na contagem do autor. "Stack
de sistema" não é o padrão Apple; **servir uma webfont é**. Deixe a stack de
sistema como *fallback*, nunca como plano.

### 3.2 Rampa de tamanhos

Uma lista fechada. Nunca invente 15px, 16px, 18px, 24px.

```
12 · 14 · 17 · 21 · 28 · 40 · 48 · 56
```

**No máximo 4 tamanhos por tela.** Cada tipo de tela já tem os seus quatro, um
por papel:

| Papel | Vitrine | Fluxo | Ferramenta |
| --- | --- | --- | --- |
| Display (herói) | 56 / 600 | 28 / 600 | 28 / 600 |
| Título de seção (600) · apoio do herói (400) | 28 | 21 | 17 |
| Corpo (400) · título de bloco (600) | 17 | 17 | 14 |
| Legenda, rótulo, rodapé, cabeçalho de coluna | 14 | 14 | 12 |

40 e 48 existem para o display da vitrine encolher: `--t-display` vale 56 em
≥1069px, 48 em 735–1068px e 40 em ≤734px, e os três contam como um tamanho só.

Quer um quinto tamanho? Tire outro.

### 3.3 Line-height é fórmula, não tabela

```css
--lh-titulo: calc(1em + 4px);   /* todo título, nos 8 degraus */
--lh-corpo:  calc(1em + 8px);   /* parágrafo de leitura, em 17 e em 14 */
--lh-denso:  calc(1em + 6px);   /* 14 e 12 em tabela, lista, rótulo e legenda */
--lh-botao:  calc(1em + 3px);   /* rótulo de botão e de segmented */
```

Confere em toda a rampa, como título: 56→60 · 48→52 · 40→44 · 28→32 · 21→25 ·
17→21 · 14→18 · 12→16. Corpo: 17→25 · 14→22. Denso: 14→20 · 12→18. Botão:
17→20 · 14→17.

⚠️ **Declare o line-height em cada classe de texto, nunca só no `body`.**
`calc(1em + Npx)` é resolvido em px no elemento em que foi declarado e herdado
como comprimento: um `body` de 17px passa 25px para um `h1` de 56px, e todo
título quebra. As classes da seção 12 já declaram um por um.

### 3.4 Tracking é função do TAMANHO, não do papel

O espaçamento lateral desenhado na fonte é proporcional ao corpo. Em corpo
grande o branco entre letras cresce junto e passa a parecer frouxo — o aperto
precisa ser devolvido à mão.

| Tamanho | letter-spacing |
| --- | --- |
| 56px | `-0.005em` |
| 48px | `-0.003em` |
| 21 · 28 · 40px | `0` |
| 17px | `-0.011em` |
| 14px | `-0.008em` |
| 12px | `-0.005em` |

Esta tabela foi calibrada para **Inter com o eixo `opsz`**. Com outra família,
recalibre (seção 15).

⚠️ **Duas armadilhas, e as duas fazem estrago:**

1. **Não copie o tracking da Apple literalmente no corpo pequeno.** Ela usa
   `-0.022em` em 17px porque a SF Pro Text é um desenho com espaçamento lateral
   largo. Na avaliação do autor, a Inter já nasce mais apertada — o mesmo número
   fecha demais e come a legibilidade. De 12 a 17px a tabela usa **metade**.
2. **Não aplique tracking positivo no corpo médio.** A Apple usa `+0.004` a
   `+0.012em` entre 19 e 32px, mas isso é compensação por usar o corte *Display*
   em corpo pequeno. Com o eixo `opsz` a compensação é automática — copiar é
   **corrigir duas vezes** e o texto fica frouxo. **Zere em 21, 28 e 40px.**

### 3.5 Optical sizing

O mecanismo central da tipografia da Apple é trocar a fonte por tamanho: SF Pro
**Text** até 17px, SF Pro **Display** de 19px para cima. Na web isso sai de graça
com uma fonte de eixo `opsz`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,600&display=swap" rel="stylesheet">
```

Não há CSS a escrever: `font-optical-sizing: auto` já é o valor inicial. Só não
o desligue (`none`).

Com o eixo ligado, a Inter estreita sozinha conforme o corpo cresce, de 14px até
32px (os limites do eixo na URL acima) — o mesmo trabalho da troca
Text→Display.

⚠️ **O `opsz,` na URL não é decorativo.** `family=Inter:wght@...` e
`family=Inter:opsz,wght@...` servem **arquivos diferentes**. Esquecer o `opsz,`
desliga o recurso em silêncio, sem erro nenhum.

⚠️ Navegador antigo ignora `font-optical-sizing` e trava no corte Text. Os
títulos ficam levemente largos e nada mais quebra — **mas não apoie a hierarquia
no opsz**. Ela tem que se sustentar em peso e tamanho sozinha.

### 3.6 Pesos

**Só 400 e 600.** Nada de 500, 700, 800. (Observação do autor: não existe peso
700 na tipografia de marketing da apple.com.)

**Hierarquia se resolve por peso antes de tamanho.** Título e corpo compartilham
a **mesma cor**; o que os separa é 600 contra 400. Esse é o ganho real — cabe em
4 degraus e funciona em qualquer densidade.

### 3.7 Caixa alta

**Não use. Sem exceção.** Na leitura do autor, nenhum token de tipografia do
apple.com aplica `text-transform`: o "eyebrow" deles é um título de 21–24px em
caixa normal, e o rótulo de grupo da barra lateral é 13px peso 600 em caixa
normal.

Aqui, o rótulo de grupo (navegação lateral, seção de formulário) é o tamanho de
legenda da tela em peso 600, `--ink-2`, caixa normal. Se ele pede mais destaque
que isso, transforme-o em **título de verdade**.

Cabeçalho de coluna em caixa alta com tracking é a assinatura visual de
dashboard genérico. Use caixa normal, `--ink-2`, peso 400 e o tracking do
tamanho (3.4).

### 3.8 Números

`font-variant-numeric: tabular-nums` em **toda** célula de moeda, contagem,
horário, percentual e ID — qualquer número comparável verticalmente.

⚠️ Tabular alarga a sequência, e o quanto depende dos dígitos: quase nada em
"380,00", muito em "1.111,11", porque o 1 proporcional é estreito. Ligue
**antes** de fechar as larguras de coluna, e dimensione a coluna pela pior
sequência (só algarismos 1).

Texto corrido fica com números proporcionais.

---

## 4. Cor

### 4.1 A regra

**Uma escala de neutros + UM acento.**

O acento marca a **ação**: preenchimento da ação primária, texto de link e de
ação terciária, anel de foco. Nada mais. Se ele aparece em tudo, não marca nada.

| Onde o acento aparece | Teto |
| --- | --- |
| Preenchimento em `--accent` | **1 por viewport** (a mesma ação pode repetir uma vez no fechamento da página) |
| Texto em `--accent` (link em frase, ação terciária) | **3 por viewport** |
| Anel de foco | não conta: só existe durante o foco |

Viewport é o da seção 2: 1440×900 e 390×844. Link de navegação (barra, lateral,
rodapé) é `--ink` ou `--ink-2`, não acento.

Seleção, status, categoria, ênfase — tudo isso se resolve na escala de neutros,
por **peso, posição e preenchimento**.

**Perigo não é acento.** Erro de campo, estado crítico e ação destrutiva usam
`--danger`, um vermelho reservado a esses três lugares. Se a ação mais frequente
e o aviso de atraso têm a mesma cor, "Nova ordem" e "Atrasada 2 dias" viram o
mesmo sinal — e "Salvar" fica idêntico a "Apagar 143 registros". `--danger`
nunca pinta ação comum, link nem decoração, e vem sempre com texto por extenso
(4.5).

### 4.2 Escolha do acento — calcule, não escolha do catálogo

O acento vai pintar um botão preenchido com texto branco em cima. O mínimo é
4,5:1, e **quase nenhuma cor de sistema passa** (hex do iOS em tema claro):

| Cor | Branco em cima |
| --- | --- |
| systemBlue `#007AFF` | 4,02:1 ❌ |
| systemRed `#FF3B30` | 3,55:1 ❌ |
| systemBrown `#A2845E` | 3,50:1 ❌ |
| systemPurple `#AF52DE` | 4,13:1 ❌ |
| systemTeal `#30B0C7` | 2,57:1 ❌ |
| systemGreen `#34C759` | 2,22:1 ❌ |
| systemOrange `#FF9500` | 2,20:1 ❌ |
| systemIndigo `#5856D6` | 5,65:1 ✅ |
| Azul do botão do apple.com `#0071E3` | 4,70:1 ⚠️ passa raspando |

**Requisito: `--accent` ≥ 4,5:1 sobre `--fill` aplicado em `--sunken`**
(`#E5E3DC`), o fundo mais escuro em que ele vira texto. Isso equivale a
**≥ 5,8:1 com branco**. Aí o mesmo hex serve para **fundo de botão com texto
branco** e para **texto em qualquer superfície** — e você não precisa de um
segundo tom para links, que é justamente onde a Apple precisa de dois azuis
(`#0071E3` para botão, `#0066CC` para link). O acento padrão, `#1F4E8C`, dá
8,31:1 com branco e 6,46:1 nesse pior fundo.

Processo: escolha o *hue* pela marca → escureça até bater o requisito → derive
os papéis abaixo.

### 4.3 Os papéis do mesmo hue

```
--accent          fundo de botão preenchido, cor de link e anel de foco
--accent-hover    MAIS CLARO que o base, ainda dentro do requisito de 4.2
--accent-active   mais escuro que o base
--on-accent       texto sobre --accent e sobre --danger

--danger          erro de campo, estado crítico, ação destrutiva (mesmo requisito de 4.2)
--danger-hover    mais claro
--danger-active   mais escuro
```

⚠️ **Hover mais claro, active mais escuro.** É o inverso da convenção web comum
(observado no apple.com: `#0071E3` → hover `#0077ED` → active `#006EDB`). Se
adotar, revise **todos** os hovers de uma vez — meia migração deixa botões se
comportando de dois jeitos na mesma tela.

⚠️ **Não use o acento com alfa no anel de foco.** Ver 6.4 — reprova na WCAG.

⚠️ **Marca vermelha?** `--accent` e `--danger` ficam com o mesmo hue. Continua
funcionando, porque erro e crítico nunca dependem só da cor (4.5), mas a
confirmação destrutiva perde a diferença para o botão comum. Se a marca permite
escolher, tire o acento da faixa vermelha.

### 4.4 Neutros: escolha uma temperatura e não misture

Cinzas de sistema costumam ser **azulados** (B > R). Se a marca é quente (couro,
madeira, âmbar, terra), misturar as duas famílias faz o off-white parecer
encardido e o cinza parecer sujo.

Monte a rampa inteira na mesma temperatura, casada por luminância:

```
--paper      fundo da página
--surface    cartão, lista, tabela, campo, modal       (normalmente #FFFFFF)
--sunken     área recuada: faixa de capítulo, navegação lateral,
             cabeçalho de tabela, hover de linha
--fill       preenchimento translúcido (12%): trilho, chip, botão
             secundário, bloco de carregamento
--fill-2     hover de tudo que está em --fill; fundo de avatar (18%)
--line       separador de 1px, por border — nunca por box-shadow
--ink        texto principal                            ≥ 12:1
--ink-2      texto secundário, legenda, placeholder     ≥ 4,5:1
--ink-3      NÃO escreve texto corrido: borda de campo, trilho de
             interruptor desligado, ícone, texto de 28px ou mais   ≥ 3:1
```

Onde este documento diz "branco" e "cinza", leia assim:

| Tipo de tela | Página | Área recuada ("cinza") | Cartão ("branco") |
| --- | --- | --- | --- |
| Vitrine | `--paper` | faixa de capítulo em `--sunken`, full-bleed (5.7) | não existe |
| Fluxo | `--paper` | — | `--surface`, raio 12px, `--shadow-card` |
| Ferramenta | `--paper` | navegação lateral e cabeçalho de tabela em `--sunken` | `--surface`, raio 18px, `--shadow-card` |

⚠️ **`--ink-3` não escreve letra miúda.** 3:1 só vale para elemento de interface
e para texto grande — que nesta rampa quer dizer **28px ou mais** (a WCAG põe o
corte em 24px, ou 18,66px em negrito). Legenda, rótulo e rodapé são `--ink-2`.

⚠️ **`--ink-2` tem fundos proibidos:** `--fill-2` em qualquer superfície (4,01 a
4,44:1) e `--fill` aplicado em `--sunken` (4,31:1). Em cima de preenchimento, o
texto é `--ink`. A única exceção prescrita é o controle desabilitado (botão e
campo), `--ink-2` sobre `--fill`, que por isso só existe sobre `--surface` e
`--paper` (ver Botão).

⚠️ **Os label colors do iOS reprovam AA na web.** Achatados sobre branco:
`secondaryLabel` (`rgba(60, 60, 67, .6)`) = 3,44:1 · `tertiaryLabel` (`.3`) =
1,73:1 · `quaternaryLabel` (`.18`) = 1,37:1. Funcionam num iPhone a 30cm com
texto de 17px; num monitor a 60cm com texto de 13px, não. Use os números da web,
não os do sistema.

⚠️ **O par página/superfície precisa ser um degrau real.** A Apple vive sem
borda de 1px porque `#FFFFFF` sobre `#F5F5F7` é um degrau visível: 1,09:1. Os
neutros padrão daqui ficam mais próximos — `--surface` sobre `--paper` dá
1,05:1 — então vale a regra: **abaixo de 1,08:1 entre cartão e página, a sombra
do cartão (`--shadow-card`) é obrigatória.** Com os tokens padrão, sempre. A
faixa de capítulo (`--sunken` sobre `--paper`, 1,06:1) se sustenta por ser
full-bleed: a aresta atravessa a tela inteira.

**Só existe tema claro** (`color-scheme: light`). Tema escuro está fora de
escopo: não gere bloco `prefers-color-scheme: dark`.

### 4.5 Estado: peso e texto antes de cor

Status, categoria e seleção **não** usam cor. O único estado com cor é o
crítico, e nele a cor nunca vai sozinha. Use:

| Estado | Como |
| --- | --- |
| Resolvido / concluído | `--ink-2`, peso 400 + rótulo por extenso ("Entregue") |
| Neutro / pendente | `--ink`, peso 400 |
| Exige ação | `--ink`, peso **600** + rótulo por extenso |
| Crítico | `--danger`, peso **600** + rótulo por extenso ("Atrasada 2 dias") |

⚠️ **`opacity` não apaga texto que alguém precisa ler.** `--ink-2` a 50% sobre
branco dá 2,08:1. "Resolvido" continua sendo conteúdo: nome, serviço, horário.
O tom mais claro permitido para texto é `--ink-2`, em opacidade cheia.

Cor por categoria (4 pessoas, 6 projetos, 8 etiquetas) é a maneira mais rápida
de destruir o acento. Se precisar distinguir N itens, use **inicial ou nome**,
não matiz.

---

## 5. Layout

### 5.1 Largura: 980px é o CONTEÚDO, não o contêiner

A medida famosa da Apple é o texto, não a caixa:

```css
*, *::before, *::after { box-sizing: border-box; }   /* sem isto a caixa vira 1068 e o conteúdo, 1024 */
.shell { max-width: 1024px; margin-inline: auto; padding-inline: 22px; }   /* 1024 − 44 = 980 */
```

⚠️ Declarar `max-width: 980px` com padding de 20px entrega **940px** de conteúdo
— 40px a menos, com o rótulo de que é a medida da Apple.

| Contexto | Largura |
| --- | --- |
| Conteúdo de vitrine | **980px** (contêiner 1024 + 22) |
| Parágrafo, em qualquer tipo de tela | no máximo **692px** |
| Formulário de fluxo | **560px** (`class="shell shell-fluxo"`) |
| Ferramenta | **fluida**, com gutter de 22px |

⚠️ **Não trave uma ferramenta em 980px.** Essa régua é largura de *leitura em
coluna única*. Num painel, tabela e grade de cartões ocupam a largura
disponível; só as **colunas de texto** ficam limitadas em 692px.

⚠️ **O conteúdo para de crescer em 980px.** O `.shell` mede 1024px (980 de
conteúdo) em qualquer janela de 1024px ou mais. Não deixe a linha de leitura esticar em monitor grande.

### 5.2 Breakpoints: uma régua só

```
≤734   |   735–1068   |   ≥1069
```

Use **estes** no produto inteiro. Misturar 720/767/768 com 734/1068 cria dois
sistemas de dobra e o bug aparece exatamente na faixa entre eles.

(A Apple tem ainda um corte em 1441px e um em 833px, este **exclusivo da altura
da barra de navegação**. Aqui nenhum dos dois muda nada, então não entram na
régua.)

Breakpoint mede largura, e só largura. Ele não diz se o ponteiro é dedo ou
mouse — para isso, ver 6.3.

### 5.3 Gutter no mobile é proporcional, não fixo

```css
@media (max-width: 734px) { .shell { width: 87.5%; max-width: none; padding-inline: 0; } }
```

A margem cresce de 20px num aparelho de 320 para 27px num de 430. Um gutter fixo
aperta o telefone grande. Em 735px a régua muda e a margem volta a 22px: o
conteúdo vai de 642px (em 734) para 691px (em 735), e esse salto é o corte entre
telefone e tablet, não um erro.

### 5.4 Ritmo vertical

O par é **assimétrico**: o rodapé da seção é maior que o topo.

| Contexto | ≥1069 | 735–1068 | ≤734 |
| --- | --- | --- | --- |
| Seção de vitrine (topo / rodapé) | 96px / 104px | 80px / 88px | 72px / 78px |
| Bloco de conteúdo | 40px | 32px | 32px |
| Padding de cartão | 24px | 20px | 16px |

⚠️ **Na medição do autor, a Apple usa 110–162px, e copiar isso quebra páginas
curtas.** Ela sustenta esse ar porque a página de produto tem 18 blocos e o
leitor rola 6.000px. Numa página de 5 seções, 110px faz o rodapé encostar na
dobra e a página lê como inacabada.

⚠️ **Nunca use ritmo de vitrine numa ferramenta.** Ali o padding de cartão (24px)
e o gutter (22px) são o ritmo: 22px entre cartões e entre colunas.

### 5.5 Grade

```css
.grid { display: grid; grid-template-columns: repeat(var(--cols, 2), minmax(0, 1fr));
        column-gap: 40px; row-gap: 82px; }
@media (max-width: 1068px) { .grid { column-gap: 24px; } }
@media (max-width: 734px)  { .grid { grid-template-columns: minmax(0, 1fr); } }   /* coluna única */
```

Colunas: **2** para bloco de mídia + texto, **3** para bloco só de texto curto
(pergunta, característica). Em ≤734px, sempre 1.

O gap de **linha** é muito maior que o de **coluna**. É isso que faz blocos
irmãos lerem como blocos, e não como uma malha.

### 5.6 Alinhamento: à esquerda por padrão

Contagem do autor numa página de produto do apple.com: de 164 blocos de texto,
**102 à esquerda** e 61 centralizados (as duas parcelas somam 163; a contagem
original não diz onde ficou o bloco restante). O próprio herói do MacBook Air é
**à esquerda**.

**Regra:** centralize apenas quando o bloco é **dono sozinho da faixa
horizontal** — abertura de capítulo, com título e no máximo uma linha de apoio.
Abertura centralizada não leva botão: herói com ação fica à esquerda. Dentro de
coluna, célula de grade, cartão, tabela ou formulário: **sempre à esquerda**.

O **texto** de formulário e o título de painel ficam à esquerda: centralizá-los é
copiar a impressão errada. A **coluna** de um formulário, de uma edição ou de um
detalhe, essa sim, fica centralizada na área útil (`margin-inline: auto`), com
sobra igual dos dois lados. Alinhar à esquerda é regra do texto, não da posição
da coluna: o formulário de fluxo (560px) e o `.shell` já nascem centralizados.

### 5.7 Fundo cinza marca capítulo, não alterna

A troca de fundo (`--paper` ↔ `--sunken`) separa **capítulos**, não seções
consecutivas. Proporção medida pelo autor: ~1 bloco cinza para cada 3 brancos.

⚠️ Faixa de fundo tem que ser **full-bleed** (borda a borda, sem raio). Um bloco
cinza com margem lateral e canto arredondado flutuando no meio da página fica
pior do que a borda de 1px que você estava tentando remover.

### 5.8 Espaçamento: uma escala fechada

Distância entre elementos sai desta lista, e só dela:

```
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40
```

| Entre | Espaço |
| --- | --- |
| Título de item e sua segunda linha · campo e frase de erro | 4px |
| Título e linha de apoio · rótulo e campo · botões lado a lado · ícone ou avatar e texto | 8px |
| Campos empilhados · cabeçalho de cartão e conteúdo | 16px |
| Linha de apoio e ação | 32px |
| Ação e mídia · um bloco de conteúdo e o seguinte | 40px (32px em ≤1068) |
| Cartões e colunas de ferramenta | `--gutter` (22px) |

12, 20 e 24 são paddings: 12px no lado de campo, botão e célula; 24 / 20 / 16
no cartão (5.4). Gutter (22px), gaps da grade (40 / 82) e ritmo de seção (5.4)
têm token próprio e ficam fora da escala. Medida interna de componente — o
inset de 2px do segmented, o padding de 10px do item de navegação — está na
especificação dele (seção 7) e não se reaproveita.

### 5.9 Altura baixa e largura mínima

**Com a janela de até 480px de altura, tudo o que é fixo rola junto.** O zoom de
400% num monitor de 1280 × 1024 dá uma janela de 320 × 256, e uma barra de 48px
ali já cobre quase um quinto do que a pessoa vê; com a barra do fluxo, a metade.
Nessa altura a barra translúcida e a barra de topo da ferramenta deixam de ser
`sticky`, `scroll-padding-top` volta a 0 e a barra inferior do fluxo vira o fim
da página. Modal e gaveta, que a pessoa abre e fecha, continuam fixos.

```css
@media (max-height: 480px) {
  .bar, .barra-mobile { position: static; }
  html { scroll-padding-top: 0; }
}
```

**Nenhuma largura de 320px a 1440px rola a página na horizontal.** Barra de
navegação, ações do topo e grupos de controles quebram linha em vez de sair da
tela (`flex-wrap: wrap`); campo tem `max-width: 100%`. Em tabela, o que não cabe
é cortado por coluna (ver Tabela, na seção 7), nunca por rolagem.

---

## 6. Geometria: raios, sombra, alvos

### 6.1 Escada de raios

Uma lista fechada. Não existe 3px, 4px, 10px, 16px nem 20px:

```
6px · 8px · 12px · 18px · 28px · 50% · 980px
```

| Uso | Raio |
| --- | --- |
| Botão de vitrine e de fluxo, chip, trilho do interruptor | `980px` (pílula) |
| Mídia | `28px` |
| Cartão de ferramenta, superfície desenhada dentro de mídia | `18px` |
| Cartão de fluxo, modal, contêiner de lista agrupada | `12px` |
| Campo, botão de ferramenta, trilho do segmented, toast | `8px` |
| Item de navegação lateral, pílula do segmented, cabeçalho de tabela, bloco de carregamento | `6px` |
| Avatar, botão do interruptor | `50%` |

Raio de dentro = raio de fora menos a distância entre as bordas: trilho de 8px
com inset de 2px dá pílula de 6px.

⚠️ **Arredondar pela metade é pior que não arredondar.** Raio 0 em tudo é uma
postura coerente. Mas se arredondar o cartão e esquecer o interruptor, a pílula
da navegação e o *segmented*, o resultado lê como bug, não como estilo. **É tudo
ou nada.**

### 6.2 Sombra: três papéis, nenhuma outra

Na leitura do autor, a folha de produção inteira de uma página de produto da
Apple (1,3 MB) contém **uma única sombra de elevação**. Todo o resto é anel de
foco ou `none`.

**Separe superfícies por tom e por espaço.** Quase nunca por sombra, e
praticamente nunca por borda de 1px.

Aqui existem três sombras, uma por papel:

| Token | Valor | Papel |
| --- | --- | --- |
| `--shadow-card` | `2px 4px 12px 0 rgba(0, 0, 0, 0.08)` | cartão `--surface` sobre a página (obrigatória com os tokens padrão — ver 4.4) |
| `--shadow-control` | `0 1px 2px 0 rgba(0, 0, 0, 0.18)` | peça móvel de controle: pílula do segmented, botão do interruptor |
| `--shadow-modal` | `0 16px 48px 0 rgba(0, 0, 0, 0.18)` | camada flutuante: modal e menu |

Nenhum outro `box-shadow` de elevação existe. A borda de campo é `inset` e não
é elevação; o anel de foco é `outline`.

### 6.3 Alvos

| Ponteiro | Mínimo |
| --- | --- |
| Fino (`pointer: fine` — mouse, trackpad) | 28px |
| Grosso (`pointer: coarse` — dedo) | **44px**, em qualquer largura de tela |

⚠️ **Largura de tela não diz qual é o ponteiro.** Um tablet de 1024px é toque;
uma janela de 600px no desktop é mouse. Alvo e hover se decidem por `pointer` e
`hover`, nunca por breakpoint.

⚠️ **Não engorde o botão para chegar aos 44px.** A Apple mantém o botão em ~35px
de caixa e estica a **área de clique** com margem invisível:

```css
:root { --alvo: 28px; }
@media (pointer: coarse) { :root { --alvo: 44px; } }

.btn, .chave, .terciario { position: relative; }
.btn::after, .chave::after, .terciario::after {          /* alvo, não caixa */
  content: ''; position: absolute; top: 50%; left: 50%;
  width: max(100%, var(--alvo)); height: max(100%, var(--alvo));
  transform: translate(-50%, -50%);
}
```

Copiar só o padding cria regressão de acessibilidade; copiar 44px de caixa
destrói a densidade da ferramenta. Faça as duas coisas separadamente.

Campo, segmented, item de navegação e linha de tabela não usam o truque: neles
a própria caixa cresce no toque (`--h-controle` 32 → 44px, `--h-linha`
36 → 44px). Link dentro de frase é isento, pela exceção de texto corrido da
WCAG 2.5.8.

⚠️ **Hover não existe no toque.** Nenhuma ação pode depender dele: um botão
revelado em hover apaga o alvo *e* o dado no aparelho onde a pessoa mais usa o
produto. Alvos são persistentes. Todo estilo de hover vai dentro de
`@media (hover: hover) and (pointer: fine)`, para não ficar grudado depois do
toque.

### 6.4 Anel de foco — o ponto onde você faz melhor que a Apple

A Apple usa um `outline` de 4px na cor de destaque a 60%. Composto sobre branco
isso dá **2,27:1** com `rgba(0, 125, 250, .6)` e **2,46:1** com o azul de botão,
`rgba(0, 113, 227, .6)`. Nos dois casos **reprova na WCAG 1.4.11**, que exige
3:1 para indicador não-textual.

**Use o acento em opacidade cheia:**

```css
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.card:focus-visible { outline-offset: 3px; }
.toast :focus-visible { outline-color: var(--surface); }   /* sobre tinta o acento dá 1,65:1 */
```

- `outline`, não `box-shadow`: acompanha o raio, não disputa com as sombras do
  componente e continua visível em `forced-colors`. Nenhum dos dois escapa de um
  ancestral com `overflow: hidden` — contêiner que recorta precisa de **4px ou
  mais de folga interna** em volta de qualquer controle.
- Offset de 3px no cartão focável, para o anel não encostar na sombra.
- Linha de tabela não recebe `tabindex`: o foco vai no link da primeira célula
  (ver Tabela).
- Só em `:focus-visible`, nunca em `:focus` — senão o anel aparece no clique de
  mouse.

---

## 7. Componentes

Especificações concretas. Adapte as unidades ao stack (px na web, pt no iOS,
dp no Android) mas mantenha as **proporções**.

Três regras valem para todos:

- **Toda altura é `min-height`.** Com zoom de texto o componente cresce; não
  corta.
- **Texto que não cabe:** título quebra em até 2 linhas; rótulo de botão nunca
  quebra (`white-space: nowrap`); célula de tabela corta com reticências (ver
  Tabela).
- **Hover** só dentro de `@media (hover: hover) and (pointer: fine)` (6.3).

### Botão — a escada de três degraus, sem segunda cor

É assim que a regra de um acento sobrevive:

| Degrau | Aparência |
| --- | --- |
| 1º — primário | preenchimento `--accent`, texto `--on-accent`, peso 600 |
| 2º — secundário | preenchimento `--fill`, texto `--ink`, peso 400. Quando o bloco não tem primário e ele é a ação mais forte dali: preenchimento `--ink`, texto `--surface` |
| 3º — terciário | texto `--accent`, peso 400, sem caixa, sem raio; sublinhado no hover e no foco |

⚠️ Se o segundo degrau virar um tom claro do acento, ele vira um **segundo
acento** e a regra cai.

| Variante | Altura | Padding lateral | Tipo | Raio |
| --- | --- | --- | --- | --- |
| Primário (vitrine e fluxo) | 44px | 22px | 17px | pílula |
| Secundário (vitrine e fluxo) | 36px | 16px | 14px | pílula |
| Primário e secundário (ferramenta) | 32px | 12px | 14px | 8px |
| Terciário | a do texto + `padding-block: 6px` | 0 | o do texto vizinho | — |

A altura vem de `min-height`, com `line-height: var(--lh-botao)` e sem padding
vertical: somar `14 + 3` de linha com `6 + 6` de padding dá 29px, não 32.
Controles de alturas diferentes na mesma linha alinham pelo centro.

| Estado | Primário | Secundário em `--fill` | Secundário em `--ink` | Terciário |
| --- | --- | --- | --- | --- |
| Hover | `--accent-hover` | `--fill-2` | `--ink-2` | `--accent-hover`, sublinhado |
| Pressionado | `--accent-active` | `--fill-2` | `--ink` | `--accent-active` |
| Foco | anel (6.4) | anel | anel | anel + sublinhado |
| Desabilitado | `--fill` + texto `--ink-2` | idem | idem | texto `--ink-2`, sem sublinhado |

Ação destrutiva (só em confirmação — ver Modal): preenchimento `--danger`,
hover `--danger-hover`, pressionado `--danger-active`, texto `--on-accent`.

⚠️ **Desabilitado não pode ser `opacity`.** Um primário com `opacity: .42`
(texto branco sobre `--accent`, composto sobre `--paper`) cai para **2,12:1** —
ilegível. Troque a **superfície**: fundo `--fill`, texto `--ink-2`, que dá
4,79:1 sobre `--surface` e 4,57:1 sobre `--paper`. Sobre `--sunken` o par cai a
4,31:1: formulário com botão que pode desabilitar não vai em faixa `--sunken`.

✅ **Botão desabilitado deve DIZER o que falta.** Troque o rótulo ("Escolha um
horário", "Preencha seus dados") em vez de deixar uma placa colorida apagada.
Para a instrução chegar a quem usa teclado e leitor de tela, use
`aria-disabled="true"` e mantenha o botão focável: o atributo `disabled` tira o
botão da ordem de Tab e esconde justamente o rótulo que explica.

**Semântica e teclado:** `<button>` para ação, `<a>` para navegação. Enter e
Espaço acionam. Com `aria-disabled="true"` o clique não faz nada.

### Link

Dentro de frase: `--accent` com **sublinhado permanente**
(`text-decoration: underline; text-underline-offset: 2px`). A cor sozinha não
separa o link do texto vizinho — `--accent` contra `--ink` dá 2,07:1, e a WCAG
pede 3:1 ou um segundo sinal. Sem sublinhado só a ação terciária isolada, fora
de parágrafo. Link de navegação (barra, lateral, rodapé): `--ink` ou `--ink-2`,
sem sublinhado; o hover sublinha.

### Campo

| Medida | Valor |
| --- | --- |
| Altura | `--h-controle`: 32px na ferramenta com ponteiro fino, 44px em `pointer: coarse`. Em fluxo e vitrine, 44px sempre |
| Raio · padding lateral | 8px · 12px |
| Fundo · texto | `--surface` · `--ink` |
| Fonte | 14px na ferramenta; 17px em fluxo, vitrine e em `pointer: coarse` (abaixo de 16px o iOS dá zoom no foco) |
| Borda | `box-shadow: inset 0 0 0 1px var(--ink-3)` — não `border`, para não mexer no box model. 4,04:1 sobre `--surface` |
| Rótulo | visível, acima, a 8px do campo: 14px, peso 600, `--ink`. Campo sem rótulo visível (busca) leva `aria-label` |
| Placeholder | `--ink-2`. É exemplo de preenchimento, nunca o rótulo |
| Hover | borda `--ink-2` |
| Foco | a borda engrossa para 2px em `--accent`; no lugar do anel, `outline: 2px solid transparent` (que aparece em `forced-colors`) |
| Desabilitado | fundo `--fill`, sem borda, texto `--ink-2` |
| Erro | borda de 2px em `--danger` + **uma frase** 4px abaixo, em `--danger`, dizendo o que corrigir. `aria-invalid="true"` no campo e a frase ligada por `aria-describedby` |

`<select>` e `<textarea>` seguem o campo: mesma borda, raio e estados.
Checkbox e radio são os nativos, com `accent-color: var(--ink)`, 16px, rótulo à
direita a 8px, dentro do mesmo `<label>`.

Formulário que coleta dado pessoal diz, antes do botão de envio, para que o
dado serve e onde está a política de privacidade.

### Lista agrupada

O padrão que mais muda a percepção de qualidade:

- contêiner `--surface` com raio 12px, sem borda em volta de **cada** linha;
  dentro de um cartão, o próprio cartão é o contêiner;
- separador `--line` **recuado** até onde o conteúdo começa (o padding lateral
  da linha, ou depois do avatar/ícone);
- linha de 44px, padding lateral 16px (dentro de cartão, o padding do cartão);
  segunda linha de texto no tamanho de legenda, `--ink-2`;
- `hover` = fundo `--sunken`, não borda.

**Semântica e teclado:** `<ul>` / `<li>`. Linha clicável é um `<a>` ou
`<button>` que ocupa a linha inteira.

### Tabela

Cabeçalho 28px, fundo `--sunken` com raio 6px nas pontas, texto no tamanho de
legenda da tela (12px na ferramenta), peso 400, `--ink-2`, caixa **normal**,
tracking do tamanho (3.4).
Linha `--h-linha`: 36px com ponteiro fino / 44px em `pointer: coarse`. Padding
lateral 12px. Separador `--line` entre linhas.
Valores comparáveis (moeda, contagem, percentual, horário) à direita;
identificador à esquerda; todos com `tabular-nums`.
Hover de linha: `--sunken`. Selecionada: `--sunken` + primeira célula em peso
600 + `aria-selected="true"`.
Dentro de cartão: `margin-inline: -12px`, para o texto da primeira coluna
alinhar com o título do cartão.

**Texto que não cabe na célula:**
`white-space: nowrap; overflow: hidden; text-overflow: ellipsis`, com o valor
inteiro em `title`. Antes de cortar célula, corte coluna: a que não muda decisão
sai.

⚠️ **Zebra só com 5 colunas ou mais**, em `--sunken` nas linhas pares — e então
sem hover de fundo. Em 2–3 colunas ela não ajuda a acompanhar nada e cai direto
na regra de subtração.

**Em ≤734px a tabela vira cartões empilhados** — um por linha, cada valor com o
nome da coluna em `--ink-2` — nunca rolagem horizontal em tabela de dados.

Em 735–1068px, com a lateral de 264px ao lado, sobram cerca de 440px para a
tabela: o cartão ocupa a linha inteira, a coluna de 288px passa para baixo e
saem as colunas que não mudam decisão (no exemplo, Bicicleta e Serviço).

**Semântica e teclado:** `<table>` com `<th scope="col">`. Linha que abre
detalhe tem um link na primeira célula, e é ele que recebe o foco; não ponha
`tabindex` em `<tr>`.

### Segmented control

Altura `--h-controle` (32px) · trilho `--fill` com raio 8px · inset 2px · pílula
selecionada `--surface` com raio 6px e `--shadow-control` · texto 14px `--ink`,
peso 600 no selecionado · hover na opção não selecionada: `--fill` · de 2 a 5
opções.
**Sem cor:** o estado é a posição da pílula **mais o peso 600** — a pílula
sozinha dá de 1,16 a 1,29:1 contra o trilho e não vale como sinal.

**Semântica e teclado:** `role="radiogroup"` com nome; cada opção é
`role="radio"` com `aria-checked`. Uma parada de Tab só (`tabindex="0"` na
selecionada, `-1` nas outras); ← e → movem e selecionam. Abas de conteúdo usam o
mesmo desenho com `role="tablist"`, `tab` e `tabpanel`.

### Interruptor

38×22 · botão de 18px · curso de 16px · trilho em pílula, botão em 50%.
Desligado = trilho `--ink-3` (4,04:1 sobre `--surface`). Ligado = trilho
`--ink`, **sempre** — nunca no acento. Desabilitado = trilho `--fill`.
Botão `--surface` com `--shadow-control`. Rótulo à esquerda, interruptor à
direita, 8px entre os dois.
A caixa tem 22px de altura; o alvo vem do `::after` de 6.3 — 38×28 com mouse,
44×44 no toque.

**Semântica e teclado:** `<button role="switch">` com `aria-checked`, nomeado
pelo rótulo ao lado (`aria-labelledby`). Espaço e Enter alternam. O efeito é
imediato, sem botão de salvar.

### Cartão — e quando NÃO usar cartão

O modelo **inverte** conforme a superfície:

| Superfície | Cartão |
| --- | --- |
| Vitrine (página de marketing) | **não existe** — raio 0, fundo transparente, sem sombra. O conteúdo se sustenta sozinho no espaço. |
| Fluxo | `--surface`, raio 12px, `--shadow-card`, padding 24px, **sem borda** |
| Ferramenta (painel, listagem, loja) | página `--paper`, cartão `--surface`, raio 18px, `--shadow-card`, **sem borda**. Padding 24 / 20 / 16px (5.4); 16px entre o cabeçalho e o conteúdo |

Enfiar cartão em página de marketing é o erro mais comum de quem "aplica um
design system" numa landing.

### Mídia

Imagem ou captura do produto. Raio 28px · proporção fixa por `aspect-ratio`:
**16:10** quando ocupa a largura do contêiner, **4:3** dentro de célula de
grade · fundo `--sunken` quando é ilustração ou enquanto a imagem carrega · sem
texto sobreposto, sem gradiente. Superfície desenhada dentro dela: `--surface`,
raio 18px.

Mídia não é faixa de capítulo (5.7): é conteúdo, fica dentro do contêiner e por
isso tem raio. `alt` descreve o que a imagem mostra; a puramente decorativa leva
`alt=""`.

### Ícone

Só quando substitui uma palavra dentro de um controle (fechar, buscar, abrir
menu) — nunca ao lado de um rótulo que já nomeia. 16px junto de texto de 14px,
20px junto de texto de 17px · traço de 1,5px em `currentColor`, sem
preenchimento. `aria-hidden="true"` no ícone e o nome no controle
(`aria-label`). Botão só de ícone: caixa de 32px, alvo pelo `::after` de 6.3.

Sem logotipo fornecido, a marca é o nome em texto, 17px peso 600, `--ink`. Não
desenhe um logotipo.

### Navegação lateral

Largura 264px · fundo `--sunken` · padding interno **8px** · item de
`--h-controle` (32px) com raio 6px e padding lateral 10px · gap de 2px · texto
14px `--ink` · hover = `--fill` · selecionado = `--fill` + peso 600 +
`aria-current="page"`. Rótulo de grupo: 12px, peso 600, `--ink-2`, padding
lateral 10px.

Em ≤734px a lateral sai do lado do conteúdo e vira gaveta, aberta por um botão
"Menu" na barra; a gaveta segue a semântica do Modal.

⚠️ **A pílula não existe sem o respiro de 8px.** Com padding lateral cheio sai um
retângulo colado nas duas bordas — pior que não arredondar.

**Semântica e teclado:** `<nav aria-label="…">` com `<ul>`; cada item é um
`<a>`; Tab percorre na ordem visual.

### Barra translúcida

```css
.bar { position: sticky; top: 0; z-index: 10; min-height: 48px; background: var(--paper); }
@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .bar {
    background: color-mix(in srgb, var(--paper) 80%, transparent);
    -webkit-backdrop-filter: saturate(1.8) blur(20px);
    backdrop-filter: saturate(1.8) blur(20px);
  }
}
html { scroll-padding-top: 48px; }   /* o foco não fica escondido atrás da barra */
```

O fundo translúcido só entra onde o navegador desfoca; sem `backdrop-filter` a
barra fica sólida. 48px de altura, `sticky`, sem borda inferior. Marca à
esquerda, links de 14px. Texto na barra é sempre `--ink`: com conteúdo escuro
rolando por baixo, `--ink-2` cai a 3,48:1.

A **saturação** é o que impede o fundo de virar cinza morto atrás do vidro — não
use só `blur`.

⚠️ **Critério mecânico: use `backdrop-filter` só onde há conteúdo rolando por
baixo.** Sobre um fundo chapado ele não produz efeito nenhum e ainda força uma
camada de composição. Sim no topo de uma página com herói; sim numa barra fixa
sobre tabela rolando; **não** numa barra sobre fundo liso.

⚠️ **Duas barras nunca ficam fixas ao mesmo tempo.** Se existe uma barra
secundária (contexto, produto, filtros), a global solta e só a secundária gruda.

### Modal

Largura 560px (em ≤734px, a largura da tela menos 22px de cada lado) · padding
24px · fundo `--surface` · raio 12px · `--shadow-modal` · véu `rgba(0,0,0,.28)`
com `backdrop-filter: blur(4px)`. Título no tamanho de título de seção da tela
(3.2). Botões no rodapé, à direita, com 8px entre eles: o neutro ("Voltar")
antes, a ação depois.

**Numa confirmação destrutiva, a ação destrutiva É a ação primária daquele
diálogo** — e é o único preenchimento dele, em `--danger`. A proteção é o
**texto explícito com o número real** ("Apagar 143 registros") e o "Voltar"
neutro ao lado, que recebe o foco inicial.

**Semântica e teclado:** `<dialog>` aberto com `showModal()` e nomeado por
`aria-labelledby`. Foco inicial no botão neutro; Tab fica preso no diálogo; Esc
fecha; ao fechar, o foco volta ao controle que abriu.

### Estados de tela: vazio, carregando, erro, tudo feito

Toda tela ou bloco com dados tem os quatro.

**Vazio — uma frase.** Sem ícone, sem título grande, sem segunda linha
pedagógica. Quem olha uma tabela vazia já sabe que ela está vazia — o que falta
é **o que fazer a respeito**. Se houver uma ação, ela vem junto; se não, só a
frase.

**Carregando — o layout já montado.** No lugar de cada texto ou número, um
bloco estático em `--fill`, raio 6px, com a altura da linha que ele substitui.
Sem spinner e sem shimmer: os dois são loop (seção 8). Passou de 400ms, aparece
a frase "Carregando…" em `--ink-2`, numa região com `role="status"`.

**Erro — uma frase com a causa e a ação "Tentar de novo"** (botão secundário),
no lugar do conteúdo que falhou, em `--ink`, numa região com `role="alert"`.
Sem ícone, sem ilustração.

**Tudo feito — uma frase**, em `--ink-2`, sem ilustração ("Nenhuma ordem
pendente hoje.").

### Toast

Fundo tinta a 92% (`color-mix(in srgb, var(--ink) 92%, transparent)`) com
`backdrop-filter: blur(20px)` · texto `--surface`, 14px · raio 8px · padding
12px 16px · uma frase · embaixo, centralizado, a 24px da borda (acima da barra
fixa, se houver) · fica 5 s e não some enquanto tiver foco ou hover.
**Sem ícone e sem cor por tipo:** a frase já diz o que aconteceu. No máximo uma
ação ("Desfazer"), em texto `--surface` sublinhado.

**Semântica e teclado:** a região `role="status"` já existe na página antes de o
texto entrar. Erro que pede ação não é toast: é a frase de erro no lugar onde o
problema está.

### O que não está nesta lista

Select, checkbox e radio estão em Campo; abas, em Segmented control. Para o
resto — tooltip, paginação, breadcrumb, seletor de data — use o controle nativo
do navegador com a fonte herdada e `accent-color: var(--ink)`. Onde não houver
nativo, componha com o que já existe aqui (botão terciário, texto `--ink-2`,
lista agrupada). Não crie componente nem estilo novo. Gráfico não tem
especificação além dos anti-padrões da seção 11: antes de desenhar um, pergunte.

---

## 8. Movimento

| Uso | Duração | Token |
| --- | --- | --- |
| Hover, mudança de cor | 150ms | `--dur-fast` |
| Entrada de painel, gaveta, modal | 280ms | `--dur-base` |
| Transição de tela | 320ms | `--dur-screen` |

Curva: `cubic-bezier(0.28, 0.11, 0.32, 1)` (`--ease`).

- Animação de entrada em tela usada muitas vezes por dia é **custo, não
  encanto**. Corte.
- Nada de animação em loop permanente — spinner e shimmer de carregamento
  inclusive (ver Estados de tela).
- `@media (prefers-reduced-motion: reduce)` zerando tudo é obrigatório. O bloco
  está nos tokens (seção 12).

---

## 9. Acessibilidade

Não é uma seção separada do design — é parte do contrato. Piso: **WCAG 2.2 AA**.

### 9.1 Contraste dos pares prescritos

Razão calculada pela fórmula de luminância relativa da WCAG,
`(L1 + 0,05) / (L2 + 0,05)`. `--fill` e `--fill-2` são translúcidos: o hex da
coluna "Fundo" já é o composto sobre a superfície indicada. Trocou um token,
refaça a tabela.

**Texto — exige 4,5:1**

| Par | Texto | Fundo | Razão | Passa 4,5 | Passa 3,0 |
| --- | --- | --- | --- | --- | --- |
| `--ink` sobre `--surface` | `#1C1B19` | `#FFFFFF` | 17,21:1 | sim | sim |
| `--ink` sobre `--paper` | `#1C1B19` | `#FAF9F7` | 16,36:1 | sim | sim |
| `--ink` sobre `--sunken` | `#1C1B19` | `#F4F2EC` | 15,37:1 | sim | sim |
| `--ink` sobre `--fill` em `--surface` | `#1C1B19` | `#EFEEED` | 14,85:1 | sim | sim |
| `--ink` sobre `--fill` em `--paper` | `#1C1B19` | `#EAE9E6` | 14,16:1 | sim | sim |
| `--ink` sobre `--fill` em `--sunken` | `#1C1B19` | `#E5E3DC` | 13,37:1 | sim | sim |
| `--ink` sobre `--fill-2` em `--surface` | `#1C1B19` | `#E6E6E4` | 13,75:1 | sim | sim |
| `--ink` sobre `--fill-2` em `--paper` | `#1C1B19` | `#E2E1DE` | 13,14:1 | sim | sim |
| `--ink` sobre `--fill-2` em `--sunken` | `#1C1B19` | `#DDDBD5` | 12,43:1 | sim | sim |
| `--ink` sobre `--fill` duas vezes em `--sunken` (hover no segmented, pior caso) | `#1C1B19` | `#D8D5CF` | 11,75:1 | sim | sim |
| `--ink-2` sobre `--surface` | `#6B6862` | `#FFFFFF` | 5,55:1 | sim | sim |
| `--ink-2` sobre `--paper` | `#6B6862` | `#FAF9F7` | 5,28:1 | sim | sim |
| `--ink-2` sobre `--sunken` | `#6B6862` | `#F4F2EC` | 4,96:1 | sim | sim |
| `--ink-2` sobre `--fill` em `--surface` (desabilitado) | `#6B6862` | `#EFEEED` | 4,79:1 | sim | sim |
| `--ink-2` sobre `--fill` em `--paper` (desabilitado) | `#6B6862` | `#EAE9E6` | 4,57:1 | sim | sim |
| `--accent` sobre `--surface` | `#1F4E8C` | `#FFFFFF` | 8,31:1 | sim | sim |
| `--accent` sobre `--paper` | `#1F4E8C` | `#FAF9F7` | 7,90:1 | sim | sim |
| `--accent` sobre `--sunken` | `#1F4E8C` | `#F4F2EC` | 7,42:1 | sim | sim |
| `--accent` sobre `--fill` em `--sunken` (pior fundo) | `#1F4E8C` | `#E5E3DC` | 6,46:1 | sim | sim |
| `--accent-hover` sobre `--surface` | `#2A5B9C` | `#FFFFFF` | 6,83:1 | sim | sim |
| `--accent-hover` sobre `--paper` | `#2A5B9C` | `#FAF9F7` | 6,49:1 | sim | sim |
| `--accent-hover` sobre `--sunken` | `#2A5B9C` | `#F4F2EC` | 6,10:1 | sim | sim |
| `--accent-hover` sobre `--fill` em `--sunken` (pior fundo) | `#2A5B9C` | `#E5E3DC` | 5,31:1 | sim | sim |
| `--accent-active` sobre `--fill` em `--sunken` (pior fundo) | `#183F73` | `#E5E3DC` | 8,17:1 | sim | sim |
| `--danger` sobre `--surface` | `#8E2C26` | `#FFFFFF` | 8,27:1 | sim | sim |
| `--danger` sobre `--paper` | `#8E2C26` | `#FAF9F7` | 7,86:1 | sim | sim |
| `--danger` sobre `--sunken` | `#8E2C26` | `#F4F2EC` | 7,39:1 | sim | sim |
| `--danger` sobre `--fill` em `--sunken` (pior fundo) | `#8E2C26` | `#E5E3DC` | 6,43:1 | sim | sim |
| `--on-accent` sobre `--accent` | `#FFFFFF` | `#1F4E8C` | 8,31:1 | sim | sim |
| `--on-accent` sobre `--accent-hover` | `#FFFFFF` | `#2A5B9C` | 6,83:1 | sim | sim |
| `--on-accent` sobre `--accent-active` | `#FFFFFF` | `#183F73` | 10,51:1 | sim | sim |
| `--on-accent` sobre `--danger` | `#FFFFFF` | `#8E2C26` | 8,27:1 | sim | sim |
| `--on-accent` sobre `--danger-hover` | `#FFFFFF` | `#9C332C` | 7,18:1 | sim | sim |
| `--on-accent` sobre `--danger-active` | `#FFFFFF` | `#7A2520` | 9,94:1 | sim | sim |
| `--surface` sobre `--ink` (secundário em tinta) | `#FFFFFF` | `#1C1B19` | 17,21:1 | sim | sim |
| `--surface` sobre `--ink-2` (secundário em tinta, hover) | `#FFFFFF` | `#6B6862` | 5,55:1 | sim | sim |
| Toast: `--surface` sobre tinta a 92%, com `--surface` por baixo (pior caso) | `#FFFFFF` | `#2E2D2B` | 13,71:1 | sim | sim |
| Barra: `--ink` sobre `--paper` a 80%, com `--ink` por baixo (pior caso, sem contar o desfoque) | `#1C1B19` | `#CECDCB` | 10,79:1 | sim | sim |

**Texto de 28px ou mais e elemento de interface — exige 3,0:1**

| Par | Frente | Fundo | Razão | Passa 4,5 | Passa 3,0 |
| --- | --- | --- | --- | --- | --- |
| `--ink-3` sobre `--surface` (borda de campo, trilho desligado, ícone, texto ≥ 28px) | `#827E76` | `#FFFFFF` | 4,04:1 | não | sim |
| `--ink-3` sobre `--paper` | `#827E76` | `#FAF9F7` | 3,84:1 | não | sim |
| `--ink-3` sobre `--sunken` | `#827E76` | `#F4F2EC` | 3,61:1 | não | sim |
| `--ink-3` sobre `--fill` em `--sunken` (pior fundo) | `#827E76` | `#E5E3DC` | 3,14:1 | não | sim |
| Interruptor desligado: botão `--surface` sobre trilho `--ink-3` | `#FFFFFF` | `#827E76` | 4,04:1 | não | sim |
| Interruptor ligado: botão `--surface` sobre trilho `--ink` | `#FFFFFF` | `#1C1B19` | 17,21:1 | sim | sim |
| Anel de foco `--accent` contra `--surface` | `#1F4E8C` | `#FFFFFF` | 8,31:1 | sim | sim |
| Anel de foco `--accent` contra `--paper` | `#1F4E8C` | `#FAF9F7` | 7,90:1 | sim | sim |
| Anel de foco `--accent` contra `--sunken` | `#1F4E8C` | `#F4F2EC` | 7,42:1 | sim | sim |
| Anel de foco `--surface` dentro do toast | `#FFFFFF` | `#2E2D2B` | 13,71:1 | sim | sim |
| Borda de erro `--danger` contra `--surface` | `#8E2C26` | `#FFFFFF` | 8,27:1 | sim | sim |
| Borda de erro `--danger` contra `--paper` | `#8E2C26` | `#FAF9F7` | 7,86:1 | sim | sim |

**Pares que reprovam, e por isso são proibidos**

| Par | Razão | Regra |
| --- | --- | --- |
| `--ink-2` sobre `--fill-2` (em `--surface` / `--paper` / `--sunken`) | 4,44 / 4,24 / 4,01:1 | sobre `--fill-2`, texto `--ink` |
| `--ink-2` sobre `--fill` em `--sunken` | 4,31:1 | texto `--ink`; nada desabilitado sobre `--sunken` |
| `--ink-2` na barra translúcida, com `--ink` por baixo | 3,48:1 | na barra, texto `--ink` |
| `--ink-3` em texto abaixo de 28px | 3,61 a 4,04:1 | legenda e rótulo são `--ink-2` |
| Texto com `opacity` (`--ink-2` a 50% sobre `--surface`) | 2,08:1 | nenhum texto com `opacity` |
| Anel de foco `--accent` dentro do toast | 1,65:1 | anel `--surface` |

**Onde a cor não basta, o segundo sinal é obrigatório**

| Par | Razão entre as duas cores | Segundo sinal |
| --- | --- | --- |
| Link `--accent` no meio de texto `--ink` | 2,07:1 | sublinhado permanente |
| Crítico `--danger` ao lado de texto `--ink` | 2,08:1 | peso 600 + rótulo por extenso |
| Pílula `--surface` do segmented contra o trilho `--fill` | 1,16 a 1,29:1 | peso 600 no selecionado |
| Item selecionado da lateral (`--fill` sobre `--sunken`) | 1,15:1 | peso 600 + `aria-current` |

### 9.2 Regras

- **Contraste:** texto ≥ 4,5:1 · texto grande e elemento de interface ≥ 3:1.
  Texto grande, nesta rampa, é 28px ou mais.
- **Anel de foco ≥ 3:1** contra todo fundo em que aparece. Acento com alfa
  **reprova** — ver 6.4.
- **Foco nunca encoberto:** `scroll-padding-top` igual à altura da barra fixa;
  com a barra inferior do fluxo, `scroll-padding-bottom` igual à altura dela.
- **Nunca codifique informação só por cor.** Sempre cor + (texto | peso |
  posição | forma).
- **Todo controle tem nome acessível.** Com rótulo visível: `<label for>` ou
  `aria-labelledby`. Sem rótulo visível: `aria-label`. A palavra ao lado do
  interruptor costuma ser o único nome que o leitor de tela tem — ligue-a ao
  controle.
- **Teclado:** tudo que o mouse faz, o teclado faz. A linha "Semântica e
  teclado" de cada componente da seção 7 é parte do aceite.
- **Alvo:** 44px em `pointer: coarse`, 28px com ponteiro fino (6.3).
- **Estrutura:** `<html lang="…">`; o primeiro elemento focável é o link "Pular
  para o conteúdo", visível no foco, apontando para o `<main>`; um `<main>`, um
  `<h1>`, títulos sem pular nível; cada `<nav>` com `aria-label`.
- **Zoom e reflow:** a 200% de zoom e a 320px de largura nada é cortado e nada
  rola na horizontal. Por isso as alturas são `min-height`, as fontes estão em
  `rem` e a tabela vira cartões em ≤734px.
- **Espaçamento de texto:** com line-height 1,5, espaço entre parágrafos de 2em,
  letter-spacing 0,12em e word-spacing 0,16em, nada é cortado nem se sobrepõe.
- **`forced-colors`:** borda feita com `box-shadow` some nesse modo. O campo
  ganha `outline: 1px solid CanvasText` dentro de
  `@media (forced-colors: active)`.
- **Ordem de leitura = ordem visual.** Não use `order` do flex/grid para
  reorganizar conteúdo que importa.
- **Movimento reduzido respeitado** (seção 8).

---

## 10. Três referências, não uma

O erro mais comum ao "seguir um padrão bonito" é aplicar a linguagem da **página
de marketing** dentro de uma **ferramenta**. São produtos diferentes — inclusive
dentro da própria Apple, que usa um sistema no apple.com e outro na Apple Store
e nos apps do macOS.

| Tipo | Referência | Corpo | Botão primário | Superfície | Ritmo |
| --- | --- | --- | --- | --- | --- |
| **Vitrine** (landing, página de produto) | página de produto | 17px | pílula de 44px | sem cartão; faixa de capítulo em `--sunken` | seção de 96 / 104px |
| **Fluxo** (checkout, onboarding, cadastro) | fluxo de pagamento | 17px | pílula de 44px, fixa embaixo | cartão de fluxo (raio 12px), coluna de 560px | uma decisão por tela |
| **Ferramenta** (painel, console, admin) | app de desktop / loja | 14px | retângulo de 32px, raio 8px | página `--paper` + cartão `--surface` (raio 18px) | linha de 36px, gutter de 22px |

Se você usar corpo de 17px e pílula de 44px numa tabela densa, vai ter uma tela
bonita onde cabe metade dos dados.

**Na vitrine, o teste da seção 1 se traduz assim.** Entram: herói (título, uma
linha de apoio, a ação e uma mídia), até 6 blocos de recurso (mídia, título e
parágrafo), preço, perguntas, um fechamento que repete a ação do herói e o
rodapé legal (separador `--line`, texto de 14px em `--ink-2`, links de
navegação). Imagem do produto entra porque mostra o que se está comprando.
Depoimento só entra com nome, função e um resultado medido. Parede de
logotipos e contador de vaidade não entram.

**No fluxo, uma regra específica:** a ação primária vai numa **barra fixa
inferior**, que contém o botão primário e, acima dele, **uma linha de resumo**
do que já foi escolhido (item · preço), em 14px. Nada além disso. Botão de
avanço inline sai da tela enquanto a pessoa rola a lista de opções — e a barra
fixa é o espaço mais valioso do celular. Com a janela de até 480px de altura ela
deixa de ser fixa (5.9).

---

## 11. Anti-padrões

Os detalhes que mais denunciam interface genérica:

| ❌ Não | ✅ Em vez disso |
| --- | --- |
| Cabeçalho de coluna em CAIXA ALTA com tracking | caixa normal, cinza secundário |
| Cor por categoria (N matizes) | inicial, nome ou posição |
| Badge colorido para status | peso, tom de tinta e texto por extenso |
| Texto apagado com `opacity` | `--ink-2` em opacidade cheia |
| Ícone decorativo ao lado de cada KPI | nada — o rótulo já nomeia o número |
| Cartão em página de marketing | espaço |
| Centralizar o texto do formulário e o título de painel | texto à esquerda; a coluna do formulário centralizada na área útil |
| Borda de 1px contornando tudo | degrau de tom + espaço |
| Sombra inventada para dar profundidade | as três dos tokens, cada uma no seu papel |
| `backdrop-filter` sobre fundo chapado | fundo sólido |
| "Simulado", "Beta", "Novo" repetido 3× na tela | uma vez, se muda a leitura |
| Gráfico que só pode subir | nenhum gráfico |
| Sparkline + gráfico grande da mesma série | um dos dois |
| Total de uma coluna de 4 números | nada |
| Percentual sem ponto de comparação | valor absoluto, ou nada |
| Contador de vaidade ("11k clientes") | nada |
| Zebra em tabela de 2 colunas | separador simples |
| Ação escondida em `hover` | alvo persistente |
| Alvo e hover decididos pela largura da tela | `pointer` e `hover` |
| Mesma cor para a ação primária e para erro ou atraso | `--accent` na ação, `--danger` no perigo |
| Botão desabilitado sem dizer o porquê | rótulo que diz o que falta |
| Gradiente, sombra colorida, brilho, textura | superfície plana e um tom de fundo |
| Animação de entrada em tela de uso diário | nada |
| Confirmação sem o número real do impacto | "Apagar 143 registros" |
| Três famílias tipográficas | uma |
| Peso 500 e 700 misturados a 400/600 | só 400 e 600 |
| Anel de foco com alfa | acento em opacidade cheia |

---

## 12. Tokens prontos

Os quatro formatos abaixo dizem a mesma coisa. Cole o CSS inteiro no começo do
CSS do projeto: as medidas são declaradas aqui, uma vez, e o resto do projeto só
usa `var()`. Trocou um valor, troque em todos os formatos.

### CSS

```css
/* Base */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-padding-top: 48px; }   /* altura da barra fixa (seção 7); sem barra fixa, remova */
body { margin: 0; background: var(--paper); color: var(--ink);
       font-family: Inter, system-ui, sans-serif; font-size: var(--t-17); font-weight: 400; }
button, input, select, textarea { font: inherit; letter-spacing: inherit; }

:root {
  color-scheme: light;

  /* Superfícies — uma temperatura só, não misture */
  --paper:    #FAF9F7;
  --surface:  #FFFFFF;
  --sunken:   #F4F2EC;
  --fill:     rgba(118, 114, 106, 0.12);
  --fill-2:   rgba(118, 114, 106, 0.18);
  --line:     #E8E4DC;

  /* Texto — razão sobre --surface · --paper */
  --ink:      #1C1B19;   /* 17,21 · 16,36 */
  --ink-2:    #6B6862;   /*  5,55 ·  5,28 */
  --ink-3:    #827E76;   /*  4,04 ·  3,84 — só não-texto e texto de 28px ou mais */

  /* Acento — troque estes quatro e o produto muda de marca */
  --accent:        #1F4E8C;   /* 8,31 com branco: serve de fundo E de texto */
  --accent-hover:  #2A5B9C;   /* mais claro; 6,83 */
  --accent-active: #183F73;   /* mais escuro; 10,51 */
  --on-accent:     #FFFFFF;

  /* Perigo — só erro de campo, estado crítico e ação destrutiva */
  --danger:        #8E2C26;   /* 8,27 com branco */
  --danger-hover:  #9C332C;   /* 7,18 */
  --danger-active: #7A2520;   /* 9,94 */

  /* Tipografia: a rampa 12·14·17·21·28·40·48·56 */
  --t-12: 0.75rem;
  --t-14: 0.875rem;
  --t-17: 1.0625rem;
  --t-21: 1.3125rem;
  --t-28: 1.75rem;
  --t-display: 3.5rem;      /* 56; vira 48 em 735–1068 e 40 em ≤734 */
  --tr-display: -0.005em;   /* acompanha o tamanho: −0,003em em 48, 0 em 40 */
  --tr-17: -0.011em;
  --tr-14: -0.008em;
  --tr-12: -0.005em;        /* 21 e 28 têm tracking 0 */
  --lh-titulo: calc(1em + 4px);
  --lh-corpo:  calc(1em + 8px);
  --lh-denso:  calc(1em + 6px);
  --lh-botao:  calc(1em + 3px);

  /* Geometria: 50% (avatar, botão do interruptor) é escrito direto */
  --r-6:    6px;
  --r-8:    8px;
  --r-12:  12px;
  --r-18:  18px;
  --r-28:  28px;
  --r-pill: 980px;
  --shadow-card:    2px 4px 12px 0 rgba(0, 0, 0, 0.08);
  --shadow-control: 0 1px 2px 0 rgba(0, 0, 0, 0.18);
  --shadow-modal:   0 16px 48px 0 rgba(0, 0, 0, 0.18);

  /* Espaçamento (5.8) */
  --s-4: 4px;  --s-8: 8px;  --s-12: 12px;  --s-16: 16px;
  --s-20: 20px;  --s-24: 24px;  --s-32: 32px;  --s-40: 40px;

  /* Alturas e alvos (6.3 e seção 7) */
  --h-grande:   44px;   /* botão primário e campo de vitrine e de fluxo */
  --h-medio:    36px;   /* botão secundário de vitrine e de fluxo */
  --h-botao:    32px;   /* botão de ferramenta: no toque o alvo cresce pelo ::after, a caixa não */
  --h-controle: 32px;   /* campo, segmented e item de navegação da ferramenta; 44px no toque */
  --h-linha:    36px;   /* linha de tabela; 44px no toque */
  --alvo:       28px;

  /* Layout (seção 5) */
  --shell:   1024px;    /* 1024 − 44 = 980 de conteúdo */
  --prosa:    692px;
  --fluxo:    560px;
  --gutter:    22px;
  --secao-pt:  96px;
  --secao-pb: 104px;
  --bloco:     40px;
  --pad-cartao: 24px;
  --grade-col: 40px;
  --grade-lin: 82px;

  /* Movimento (seção 8) */
  --dur-fast:   150ms;
  --dur-base:   280ms;
  --dur-screen: 320ms;
  --ease: cubic-bezier(0.28, 0.11, 0.32, 1);
}

@media (max-width: 1068px) {
  :root { --t-display: 3rem; --tr-display: -0.003em;
          --secao-pt: 80px; --secao-pb: 88px; --bloco: 32px; --pad-cartao: 20px; --grade-col: 24px; }
}
@media (max-width: 734px) {
  :root { --t-display: 2.5rem; --tr-display: 0em;
          --secao-pt: 72px; --secao-pb: 78px; --pad-cartao: 16px; }
}
@media (pointer: coarse) {
  :root { --alvo: 44px; --h-controle: 44px; --h-linha: 44px; }
}

/* Texto — cada classe declara tamanho, line-height e tracking (3.3); o peso é .w-600 ou 400 */
.t-display { font-size: var(--t-display); line-height: var(--lh-titulo); letter-spacing: var(--tr-display); font-weight: 600; }
.t-28 { font-size: var(--t-28); line-height: var(--lh-titulo); letter-spacing: 0; }
.t-21 { font-size: var(--t-21); line-height: var(--lh-titulo); letter-spacing: 0; }
.t-17 { font-size: var(--t-17); line-height: var(--lh-corpo);  letter-spacing: var(--tr-17); }
.t-14 { font-size: var(--t-14); line-height: var(--lh-denso);  letter-spacing: var(--tr-14); }
.t-12 { font-size: var(--t-12); line-height: var(--lh-denso);  letter-spacing: var(--tr-12); }
.lh-titulo { line-height: var(--lh-titulo); }   /* título em 17, 14 ou 12 */
.lh-corpo  { line-height: var(--lh-corpo); }    /* parágrafo em 14 */
.w-600 { font-weight: 600; }
.num { font-variant-numeric: tabular-nums; }

/* Layout */
.shell { max-width: var(--shell); margin-inline: auto; padding-inline: var(--gutter); }
.shell-fluxo { max-width: calc(var(--fluxo) + 2 * var(--gutter)); }   /* junto de .shell: 560 de conteúdo */
.grid  { display: grid; grid-template-columns: repeat(var(--cols, 2), minmax(0, 1fr));
         column-gap: var(--grade-col); row-gap: var(--grade-lin); }
@media (max-width: 734px) {
  .shell { width: 87.5%; max-width: none; padding-inline: 0; }
  .grid  { grid-template-columns: minmax(0, 1fr); }
}

/* Foco e alvo (6.3 e 6.4) */
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.card:focus-visible { outline-offset: 3px; }
.toast :focus-visible { outline-color: var(--surface); }
.btn, .chave, .terciario { position: relative; }
.btn::after, .chave::after, .terciario::after {
  content: ''; position: absolute; top: 50%; left: 50%;
  width: max(100%, var(--alvo)); height: max(100%, var(--alvo));
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) { input, select, textarea { outline: 1px solid CanvasText; } }

/* Movimento reduzido (seção 8) */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important;
                           transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
}
```

Fonte: a URL com `opsz` da seção 3.5 entra no `<head>`. O CSS não precisa de
`font-optical-sizing`.

### JSON (design tokens)

```json
{
  "color": {
    "paper": "#FAF9F7", "surface": "#FFFFFF", "sunken": "#F4F2EC",
    "fill": "rgba(118, 114, 106, 0.12)", "fill2": "rgba(118, 114, 106, 0.18)",
    "line": "#E8E4DC",
    "ink": "#1C1B19", "ink2": "#6B6862", "ink3": "#827E76",
    "accent": "#1F4E8C", "accentHover": "#2A5B9C", "accentActive": "#183F73",
    "danger": "#8E2C26", "dangerHover": "#9C332C", "dangerActive": "#7A2520",
    "onAccent": "#FFFFFF"
  },
  "font": {
    "family": ["Inter", "system-ui", "sans-serif"],
    "size": [12, 14, 17, 21, 28, 40, 48, 56],
    "weight": [400, 600],
    "tracking": { "12": "-0.005em", "14": "-0.008em", "17": "-0.011em", "21": "0",
                  "28": "0", "40": "0", "48": "-0.003em", "56": "-0.005em" },
    "lineHeight": { "titulo": "1em + 4px", "corpo": "1em + 8px", "denso": "1em + 6px", "botao": "1em + 3px" }
  },
  "radius": [6, 8, 12, 18, 28, "50%", 980],
  "shadow": {
    "card": "2px 4px 12px 0 rgba(0, 0, 0, 0.08)",
    "control": "0 1px 2px 0 rgba(0, 0, 0, 0.18)",
    "modal": "0 16px 48px 0 rgba(0, 0, 0, 0.18)"
  },
  "space": [4, 8, 12, 16, 20, 24, 32, 40],
  "height": { "grande": 44, "medio": 36, "botao": 32, "controle": 32, "linha": 36, "toque": 44 },
  "target": { "pointerFine": 28, "pointerCoarse": 44 },
  "layout": { "shell": 1024, "conteudo": 980, "prosa": 692, "fluxo": 560, "gutter": 22,
              "breakpoints": { "smMax": 734, "mdMax": 1068 } },
  "motion": { "fast": 150, "base": 280, "screen": 320, "ease": "cubic-bezier(0.28, 0.11, 0.32, 1)" }
}
```

### Tailwind

Tailwind 3. Tudo em `theme`, **fora de `extend`**: `extend` soma ao padrão e
deixaria `md`, `text-3xl`, `rounded-2xl`, `font-bold` e `shadow-md` disponíveis.
O display responsivo é `text-40 sm:text-48 lg:text-56 font-semibold`; cada
tamanho já traz o seu tracking.

```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: { sm: '735px', lg: '1069px' },
    colors: {
      transparent: 'transparent', current: 'currentColor',
      paper: '#FAF9F7', surface: '#FFFFFF', sunken: '#F4F2EC',
      fill: { DEFAULT: 'rgba(118, 114, 106, 0.12)', 2: 'rgba(118, 114, 106, 0.18)' },
      line: '#E8E4DC',
      ink: { DEFAULT: '#1C1B19', 2: '#6B6862', 3: '#827E76' },
      accent: { DEFAULT: '#1F4E8C', hover: '#2A5B9C', active: '#183F73' },
      danger: { DEFAULT: '#8E2C26', hover: '#9C332C', active: '#7A2520' },
      'on-accent': '#FFFFFF'
    },
    fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    fontWeight: { normal: '400', semibold: '600' },
    fontSize: {
      12: ['0.75rem',   { lineHeight: 'calc(1em + 6px)', letterSpacing: '-0.005em' }],
      14: ['0.875rem',  { lineHeight: 'calc(1em + 6px)', letterSpacing: '-0.008em' }],
      17: ['1.0625rem', { lineHeight: 'calc(1em + 8px)', letterSpacing: '-0.011em' }],
      21: ['1.3125rem', { lineHeight: 'calc(1em + 4px)', letterSpacing: '0' }],
      28: ['1.75rem',   { lineHeight: 'calc(1em + 4px)', letterSpacing: '0' }],
      40: ['2.5rem',    { lineHeight: 'calc(1em + 4px)', letterSpacing: '0' }],
      48: ['3rem',      { lineHeight: 'calc(1em + 4px)', letterSpacing: '-0.003em' }],
      56: ['3.5rem',    { lineHeight: 'calc(1em + 4px)', letterSpacing: '-0.005em' }]
    },
    lineHeight: { titulo: 'calc(1em + 4px)', corpo: 'calc(1em + 8px)',
                  denso: 'calc(1em + 6px)', botao: 'calc(1em + 3px)' },
    borderRadius: { none: '0', 6: '6px', 8: '8px', 12: '12px', 18: '18px', 28: '28px',
                    pill: '980px', full: '50%' },
    boxShadow: { none: 'none',
                 card: '2px 4px 12px 0 rgba(0, 0, 0, 0.08)',
                 control: '0 1px 2px 0 rgba(0, 0, 0, 0.18)',
                 modal: '0 16px 48px 0 rgba(0, 0, 0, 0.18)' },
    spacing: { 0: '0px', 1: '4px', 2: '8px', 3: '12px', 4: '16px', 5: '20px',
               6: '24px', 8: '32px', 10: '40px', gutter: '22px' },
    maxWidth: { shell: '1024px', prosa: '692px', fluxo: '560px' },
    transitionDuration: { fast: '150ms', base: '280ms', screen: '320ms' },
    transitionTimingFunction: { DEFAULT: 'cubic-bezier(0.28, 0.11, 0.32, 1)' }
  }
}
```

Tailwind 4 não lê `tailwind.config.js` por padrão: o mesmo conteúdo vai em
`@theme`, e `--namespace-*: initial` apaga o padrão do grupo. Duração e curva
ficam nas variáveis de `:root` do CSS acima.

```css
@import "tailwindcss";
@theme {
  --breakpoint-*: initial;  --breakpoint-sm: 735px;  --breakpoint-lg: 1069px;
  --color-*: initial;
  --color-paper: #FAF9F7;  --color-surface: #FFFFFF;  --color-sunken: #F4F2EC;
  --color-fill: rgba(118, 114, 106, 0.12);  --color-fill-2: rgba(118, 114, 106, 0.18);
  --color-line: #E8E4DC;
  --color-ink: #1C1B19;  --color-ink-2: #6B6862;  --color-ink-3: #827E76;
  --color-accent: #1F4E8C;  --color-accent-hover: #2A5B9C;  --color-accent-active: #183F73;
  --color-danger: #8E2C26;  --color-danger-hover: #9C332C;  --color-danger-active: #7A2520;
  --color-on-accent: #FFFFFF;
  --font-sans: Inter, system-ui, sans-serif;
  --font-weight-*: initial;  --font-weight-normal: 400;  --font-weight-semibold: 600;
  --text-*: initial;
  --text-12: 0.75rem;    --text-12--line-height: calc(1em + 6px);  --text-12--letter-spacing: -0.005em;
  --text-14: 0.875rem;   --text-14--line-height: calc(1em + 6px);  --text-14--letter-spacing: -0.008em;
  --text-17: 1.0625rem;  --text-17--line-height: calc(1em + 8px);  --text-17--letter-spacing: -0.011em;
  --text-21: 1.3125rem;  --text-21--line-height: calc(1em + 4px);  --text-21--letter-spacing: 0;
  --text-28: 1.75rem;    --text-28--line-height: calc(1em + 4px);  --text-28--letter-spacing: 0;
  --text-40: 2.5rem;     --text-40--line-height: calc(1em + 4px);  --text-40--letter-spacing: 0;
  --text-48: 3rem;       --text-48--line-height: calc(1em + 4px);  --text-48--letter-spacing: -0.003em;
  --text-56: 3.5rem;     --text-56--line-height: calc(1em + 4px);  --text-56--letter-spacing: -0.005em;
  --leading-*: initial;  --leading-titulo: calc(1em + 4px);  --leading-corpo: calc(1em + 8px);
  --leading-denso: calc(1em + 6px);  --leading-botao: calc(1em + 3px);
  --radius-*: initial;  --radius-6: 6px;  --radius-8: 8px;  --radius-12: 12px;  --radius-18: 18px;
  --radius-28: 28px;  --radius-pill: 980px;  --radius-full: 50%;
  --shadow-*: initial;
  --shadow-card: 2px 4px 12px 0 rgba(0, 0, 0, 0.08);
  --shadow-control: 0 1px 2px 0 rgba(0, 0, 0, 0.18);
  --shadow-modal: 0 16px 48px 0 rgba(0, 0, 0, 0.18);
}
```

No v4 o espaçamento aceita qualquer inteiro (`p-7`): use só 1, 2, 3, 4, 5, 6, 8
e 10, que dão a escala de 5.8.

Duas proibições valem nos dois: nada de `bg-[#1F4E8C]` no HTML (cor sempre pelo
token) e nada de valor arbitrário de raio, sombra, tamanho de fonte ou
espaçamento fora da escala (`rounded-[10px]`, `shadow-[…]`, `text-[15px]`).

### Nativo

Mesmos degraus e mesmas cores; só a unidade muda (pt no iOS, sp e dp no Android).

| Conceito | iOS (SwiftUI) | Android (Compose) |
| --- | --- | --- |
| Rampa | `@ScaledMetric(relativeTo: .body) var n = 17` e `.font(.system(size: n, weight: .regular))`, com os degraus da rampa. `.font(.system(size:))` sozinho ignora o Dynamic Type | `TextStyle(fontSize = 17.sp)`, com os degraus da rampa |
| Tabular | `.monospacedDigit()` | `TextStyle(fontFeatureSettings = "tnum")` |
| Raio | `RoundedRectangle(cornerRadius: 12)` | `RoundedCornerShape(12.dp)` |
| Alvo no toque | 44pt | 48dp, o mínimo do Material, acima dos 44 do documento |
| Lista agrupada | `List { }.listStyle(.insetGrouped)` | `Card` + `Divider` recuado |
| Acento | `.tint(accent)` | `colorScheme.primary` |

---

## 13. Checklist de aceite

Todos os itens são **verificáveis**, não opinião. Onde o script de auditoria
(abaixo) confere o item, o nome do campo vem entre parênteses.

**Composição** (viewports 1440×900 e 390×844, seção 2)
- [ ] Teste dos 5 segundos passa: dá para dizer o que a tela informa e qual é a ação.
- [ ] Exatamente 1 informação herói.
- [ ] Exatamente 1 ação primária visível, ou zero, declarado, em tela de leitura (`acentoFundo`).
- [ ] No máximo 5 blocos de informação sem rolar.
- [ ] Nenhum dado aparece duas vezes na mesma tela, salvo as duas exceções da seção 1.
- [ ] Todo texto auxiliar cabe em 1 linha e tem até 60 caracteres.

**Tipografia**
- [ ] No máximo 2 famílias no produto; a segunda só nos títulos da vitrine (`familias`).
- [ ] No máximo 4 tamanhos nesta tela, todos de `12·14·17·21·28·40·48·56`; 40, 48 e 56 contam como um (`tamanhos`).
- [ ] Só pesos 400 e 600 (`pesos`).
- [ ] Zero `text-transform: uppercase` (`caixaAlta`).
- [ ] Line-height e tracking declarados em cada classe de texto, com os valores de 3.3 e 3.4, nunca só no `body`.
- [ ] `tabular-nums` em toda coluna numérica.
- [ ] A URL da fonte tem `opsz,` (3.5).

**Cor**
- [ ] Um acento: no máximo 1 preenchimento e 3 textos em `--accent` por viewport (`acentoFundo`, `acentoTexto`).
- [ ] `--danger` só em erro de campo, estado crítico e ação destrutiva, sempre com texto por extenso.
- [ ] Todo par de texto e fundo está na tabela 9.1, nenhum par proibido aparece e nenhum texto tem `opacity` (`textoComOpacity`).
- [ ] Nenhuma informação só por cor: cada caso tem o segundo sinal da tabela 9.1.
- [ ] Anel de foco visível, com contraste de pelo menos 3:1 contra o fundo em que aparece.

**Geometria e layout**
- [ ] Raios só da escada `6·8·12·18·28·50%·980`, cada componente no seu (6.1) (`raiosFora`).
- [ ] Sombras só `--shadow-card`, `--shadow-control` e `--shadow-modal`, cada uma no seu papel (`sombrasFora`).
- [ ] Espaçamento só da escala `4·8·12·16·20·24·32·40` (5.8).
- [ ] Vitrine: contêiner com 980px de conteúdo e parágrafos de até 692px. Fluxo: coluna de 560px. Ferramenta: fluida (`conteudo`).
- [ ] Breakpoints 734 e 1068, e só eles.
- [ ] Nada rola na horizontal em 320px nem em 768px, e nada fixo cobre a janela de 320 × 256 (5.9).
- [ ] Texto alinhado à esquerda, exceto abertura de capítulo; coluna de largura limitada (fluxo, formulário, detalhe) centralizada na área útil, com sobra igual dos dois lados.
- [ ] Alvo de 44px em `pointer: coarse` e de 28px com ponteiro fino.
- [ ] Nenhuma ação depende de `hover`.

**Estados e acessibilidade**
- [ ] Vazio, carregando, erro e "tudo feito" existem e foram vistos.
- [ ] Todo componente interativo tem padrão, hover, foco, pressionado, desabilitado e, nos que recebem dado, erro.
- [ ] Botão desabilitado diz o que falta e usa `aria-disabled`.
- [ ] Confirmação destrutiva mostra o número real do impacto.
- [ ] Passada de `Tab` em todos os controles: o anel aparece, não é cortado e não fica atrás de barra fixa.
- [ ] Estrutura de 9.2: `lang`, link de pular, um `<main>`, um `<h1>`, `<nav>` com nome (`estrutura`).
- [ ] A 200% de zoom e a 320px de largura nada é cortado e nada rola na horizontal.
- [ ] `prefers-reduced-motion: reduce` zera as animações.

### Auditoria automática (web)

Cole no console da página, com a janela em 1440×900 e de novo em 390×844. Ele lê
o DOM **renderizado** e só o que está no primeiro viewport. O acento, as sombras
e o `.shell` vêm dos tokens da seção 12, então trocar de marca não muda o script.

```js
(() => {
  const sonda = document.body.appendChild(document.createElement('i'));
  const token = (prop, nome) => { sonda.style[prop] = `var(${nome})`; return getComputedStyle(sonda)[prop]; };
  const ACENTO = token('backgroundColor', '--accent');
  const SOMBRAS = ['--shadow-card', '--shadow-control', '--shadow-modal'].map(n => token('boxShadow', n));
  sonda.remove();
  const RAIOS = ['0px', '6px', '8px', '12px', '18px', '28px', '980px', '50%'];
  const cs = e => getComputedStyle(e), unicos = a => [...new Set(a)];
  const vis = e => { const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.top < innerHeight && r.bottom > 0 && r.left < innerWidth
        && cs(e).visibility !== 'hidden' && cs(e).display !== 'none'; };
  const els = [...document.querySelectorAll('body *')].filter(vis);
  const textos = [], tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = tw.nextNode());) if (n.textContent.trim() && vis(n.parentElement)) textos.push(n.parentElement);
  const txt = e => e.textContent.trim().slice(0, 30);
  const shell = document.querySelector('.shell');
  return {
    viewport:  `${innerWidth}x${innerHeight}`,
    familias:  unicos(textos.map(e => cs(e).fontFamily.split(',')[0].replace(/["']/g, '').trim())),
    tamanhos:  unicos(textos.map(e => cs(e).fontSize)).sort((a, b) => parseFloat(a) - parseFloat(b)),
    pesos:     unicos(textos.map(e => cs(e).fontWeight)).sort(),
    caixaAlta: unicos(textos.filter(e => cs(e).textTransform === 'uppercase').map(txt)),
    textoComOpacity: unicos(textos.filter(e => +cs(e).opacity < 1).map(txt)),
    acentoFundo: unicos(els.filter(e => cs(e).backgroundColor === ACENTO).map(txt)),
    acentoTexto: unicos(textos.filter(e => cs(e).color === ACENTO).map(txt)),
    sombrasFora: unicos(els.map(e => cs(e).boxShadow).filter(v => v !== 'none' && !v.includes('inset') && !SOMBRAS.includes(v))),
    raiosFora: unicos(els.flatMap(e => ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'].map(c => cs(e)[`border${c}Radius`])).filter(v => !RAIOS.includes(v))),
    conteudo:  shell ? Math.round(shell.clientWidth - parseFloat(cs(shell).paddingLeft) - parseFloat(cs(shell).paddingRight)) : null,
    estrutura: { lang: document.documentElement.lang, main: document.querySelectorAll('main').length,
                 h1: document.querySelectorAll('h1').length,
                 navSemNome: document.querySelectorAll('nav:not([aria-label]):not([aria-labelledby])').length }
  };
})()
```

**Esperado:** `familias` com 1 ou 2 itens · `tamanhos` com no máximo 4 (40, 48 e
56 contam como um) · `pesos` `["400","600"]` · `caixaAlta`, `textoComOpacity`,
`sombrasFora` e `raiosFora` vazios · `acentoFundo` com 0 ou 1 item (o nome da
ação primária) · `acentoTexto` com no máximo 3 · `conteudo` 980 numa vitrine a
partir de 1069px, 560 num fluxo, `null` numa ferramenta (sem `.shell`) ·
`estrutura` com `lang` preenchido, `main` 1, `h1` 1 e `navSemNome` 0.

**O que o script não vê:** pseudo-elementos (o alvo ampliado pelo `::after`),
`opacity` herdada de um ancestral e os estados que não estão na tela (hover,
foco, erro, modal, toast). Esses ficam no checklist e na passada de `Tab`.

---

## 14. Prompt para agentes de IA

Cole junto com a tarefa quando pedir UI a um assistente de código. O arquivo
`PRD-FRONTEND.md` tem de estar na raiz do projeto (ver "Como usar").

> Siga `PRD-FRONTEND.md`, na raiz deste projeto. Em resumo:
>
> **Subtração antes de decoração** — todo elemento tem que mudar uma decisão do
> usuário; se não muda, não desenhe. Espaço vazio é resultado aceito, desde que a coluna de largura limitada fique centralizada.
>
> **Por tela** (viewports 1440×900 e 390×844): **1 informação herói**, **1 ação
> primária** (ou nenhuma, declarada, em tela de leitura), no máximo 5 blocos de
> informação sem rolar, texto auxiliar de no máximo 1 linha e 60 caracteres.
>
> **Tipografia:** Inter com `opsz`, uma família (no máximo duas, a segunda só
> nos títulos da vitrine); tamanhos só da rampa
> `12·14·17·21·28·40·48·56`, no máximo 4 por tela (o display é 56 em ≥1069px, 48
> em 735–1068px e 40 em ≤734px, e conta como um); line-height por fórmula,
> declarado em cada classe, nunca só no `body`: `calc(1em + 4px)` em título,
> `calc(1em + 8px)` em parágrafo, `calc(1em + 6px)` em tabela, lista, rótulo e
> legenda de 14 e 12, `calc(1em + 3px)` em botão; tracking por tamanho (12
> `-0.005em` · 14 `-0.008em` · 17 `-0.011em` · 21, 28 e 40 `0` · 48 `-0.003em` · 56
> `-0.005em`); **só pesos 400 e 600**; sem caixa alta; `tabular-nums` em toda
> coluna numérica.
>
> **Cor:** neutros + **um** acento, que marca só a ação: no máximo 1
> preenchimento e 3 textos (link, terciário) em `--accent` por viewport. Erro de
> campo, estado crítico e ação destrutiva usam `--danger`, sempre com texto por
> extenso. Status, seleção e categoria se resolvem em peso, posição e
> preenchimento neutro, nunca em matiz nem em `opacity` (a única cor de estado é
> o crítico). `--ink-3` não escreve texto abaixo de 28px. Link dentro de frase
> leva sublinhado permanente. Anel de foco em opacidade cheia.
>
> **Geometria:** escada de raios `6·8·12·18·28·50%·980`, aplicada em *todos* os
> componentes; três sombras, `--shadow-card`, `--shadow-control` e
> `--shadow-modal`, cada uma no seu papel; espaçamento só de
> `4·8·12·16·20·24·32·40`; alvo de 44px em `pointer: coarse` e de 28px com
> ponteiro fino; estilos de hover só dentro de `@media (hover: hover) and
> (pointer: fine)`, e nenhuma ação depende de `hover`.
>
> **Layout:** com `box-sizing: border-box`, conteúdo da vitrine em 980px
> (contêiner 1024 + 22 de padding), parágrafo de até 692px, formulário de fluxo
> em 560px, ferramenta fluida; breakpoints 734 e 1068; texto alinhado à
> esquerda, exceto abertura de capítulo, e coluna de largura limitada centralizada
> na área útil.
>
> **Referência certa:** vitrine ≠ fluxo ≠ ferramenta (seção 10). Não use corpo
> de 17px e botão de 44px numa tabela densa; não use cartão em página de
> marketing.
>
> **Estados e acessibilidade:** vazio, carregando, erro e tudo feito em toda
> tela com dados; botão desabilitado com `aria-disabled` e dizendo o que falta;
> foco visível; semântica e teclado de cada componente (seção 7); WCAG 2.2 AA.
>
> Use os tokens da seção 12 como estão e não invente valor fora deles. Antes de
> entregar, rode o checklist da seção 13 e o script de auditoria, e me diga o
> resultado de cada item e o do teste dos 5 segundos para cada tela.

---

## 15. Como adaptar para outra marca

1. Escolha o *hue* do acento pela marca. Se a marca é vermelha, tire o acento da
   faixa vermelha, senão ele e `--danger` voltam a ser a mesma cor (4.3).
2. Escureça até `--accent` bater o requisito de 4.2: ≥ 4,5:1 sobre `--fill`
   aplicado em `--sunken`, o que pede cerca de 5,8:1 com branco. Com isso o mesmo
   hex serve de fundo de botão **e** de link, e você não precisa de um segundo
   tom.
3. Derive `--accent-hover` (mais claro, ainda dentro do requisito) e
   `--accent-active` (mais escuro). `--danger` segue o mesmo requisito.
4. Escolha a **temperatura** dos neutros, quente ou fria, e refaça
   `--paper`, `--surface`, `--sunken`, `--fill`, `--line`, `--ink`, `--ink-2` e
   `--ink-3` nela. Não misture. Metas: `--ink` ≥ 12:1; `--ink-2` ≥ 4,5:1 sobre
   `--sunken` e sobre `--fill` em `--paper`; `--ink-3` ≥ 3:1 sobre `--surface`,
   `--paper` e `--sunken`.
5. Confira `--surface` sobre `--paper`. Abaixo de 1,08:1 a `--shadow-card` é
   obrigatória (4.4); se quiser dispensá-la, escureça o papel.
6. Se trocar a família da fonte, recalibre o tracking de 12 a 17px e de 48px ou
   mais (3.4) e confira os line-heights (3.3): a tabela vale para Inter com
   `opsz`. Rampa, raios, alvos, breakpoints e regras de composição são
   **estruturais** e valem para qualquer marca.
7. Atualize os valores nos três formatos da seção 12 (CSS, JSON, Tailwind) e
   **refaça a tabela 9.1** com os valores novos, par por par.
