# Sistema de UI/UX — padrão portátil

Documento de referência para **qualquer aplicação, em qualquer stack**.
Copie este arquivo para a raiz do projeto e trate-o como contrato de design.

Os números aqui não são estimativa nem gosto pessoal: saíram do CSS de produção
do apple.com (computed styles + leitura das folhas), de fontes medidas em
`canvas` e do Human Interface Guidelines. Onde existe uma armadilha conhecida,
ela está escrita — a maioria dos erros de "seguir um padrão bonito" vem de
copiar um valor sem saber por que ele existe.

---

## Índice

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

**Espaço vazio é resultado aceito, não problema a resolver.**

Duas consequências que as pessoas resistem:

- **Dado duplicado é dado a menos, não a mais.** Se o mesmo número aparece num
  card, num gráfico e numa tabela da mesma tela, dois deles saem.
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
| **Ação primária** | exatamente **1** visível por tela |
| Blocos de informação sem rolar | no máximo **5** |
| Texto auxiliar | no máximo **1 linha** |

**A informação herói** é a que muda o que a pessoa faz nos próximos minutos —
não a mais impressionante. Num painel operacional aberto de hora em hora, o
herói é *"quem é o próximo e quando"*, não o faturamento do mês.

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
Francisco só em macOS/iOS; no Windows cai em Segoe UI, no Android em Roboto —
três desenhos com altura de x e ritmo diferentes. Toda a calibração abaixo fica
presa a uma fonte que a maioria dos visitantes não tem.

E o argumento definitivo: **a própria apple.com não usa `-apple-system`**. Ela
auto-hospeda 63 arquivos `@font-face` de SF Pro. "Stack de sistema" não é o
padrão Apple; **servir uma webfont é**. Deixe a stack de sistema como
*fallback*, nunca como plano.

### 3.2 Rampa de tamanhos

Uma lista fechada. Nunca invente 15px, 18px, 22px, 26px.

```
12 · 14 · 17 · 19 · 21 · 24 · 28 · 32 · 40 · 48 · 56 · 64 · 80
```

**No máximo 4 tamanhos por tela.** Escolha 4 desta lista e declare quais:

| Tipo de tela | Escolha sugerida |
| --- | --- |
| Vitrine / marketing | 56 · 28 · 17 · 14 |
| Fluxo / formulário | 28 · 21 · 17 · 14 |
| Ferramenta densa / ERP | 28 · 17 · 14 · 12 |

Quer um quinto tamanho? Tire outro.

### 3.3 Line-height é fórmula, não tabela

```css
--lh-titulo: calc(1em + 4px);   /* todo título, nos 13 degraus */
--lh-corpo:  calc(1em + 8px);   /* texto de leitura */
--lh-denso:  calc(1em + 6px);   /* célula de tabela, rótulo */
--lh-botao:  calc(1em + 3px);   /* rótulo de botão */
```

Confere em toda a rampa: 80→84 · 64→68 · 56→60 · 48→52 · 40→44 · 32→36 · 28→32 ·
24→28 · 21→25 · 19→23 · 17→21 · 14→18 · 12→16.

### 3.4 Tracking é função do TAMANHO, não do papel

O espaçamento lateral desenhado na fonte é proporcional ao corpo. Em corpo
grande o branco entre letras cresce junto e passa a parecer frouxo — o aperto
precisa ser devolvido à mão.

| Tamanho | letter-spacing |
| --- | --- |
| 80px | `-0.015em` |
| 64px | `-0.009em` |
| 56px | `-0.005em` |
| 48px | `-0.003em` |
| 19–40px | `0` |
| 17px | `-0.011em` |
| 14px | `-0.008em` |
| 12px | `-0.005em` |

Acima de 40px a curva é `-(tamanho − 40) × 0.000375em`.

⚠️ **Duas armadilhas, e as duas fazem estrago:**

1. **Não copie o tracking da Apple literalmente.** Ela usa `-0.022em` no corpo
   de 17px porque a SF Pro Text é um desenho com espaçamento lateral largo. A
   Inter já nasce apertada — o mesmo número fecha demais e come a legibilidade.
   Use **metade**.
2. **Não aplique tracking positivo entre 19 e 32px.** A Apple usa `+0.004` a
   `+0.012em` nessa faixa, mas isso é compensação por usar o corte *Display* em
   corpo pequeno. Com `font-optical-sizing: auto` a compensação é automática —
   copiar é **corrigir duas vezes** e o texto fica frouxo. **Zere de 19 a 40px.**

### 3.5 Optical sizing

O mecanismo central da tipografia da Apple é trocar a fonte por tamanho: SF Pro
**Text** até 17px, SF Pro **Display** de 19px para cima. Na web isso sai de graça
com uma fonte de eixo `opsz`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,600&display=swap" rel="stylesheet">
```

```css
body, input, select, textarea, button { font-optical-sizing: auto; }
```

Medido: a Inter estreita **0,8%** sozinha de 14px para 48px — exatamente o
trabalho da troca Text→Display.

⚠️ **O `opsz,` na URL não é decorativo.** `family=Inter:wght@...` e
`family=Inter:opsz,wght@...` servem **arquivos diferentes**. Esquecer o `opsz,`
desliga o recurso em silêncio, sem erro nenhum.

⚠️ Navegador antigo ignora `font-optical-sizing` e trava no corte Text. Os
títulos ficam levemente largos e nada mais quebra — **mas não apoie a hierarquia
no opsz**. Ela tem que se sustentar em peso e tamanho sozinha.

### 3.6 Pesos

**Só 400 e 600.** Nada de 500, 700, 800. (Verificado: não existe peso 700 na
tipografia de marketing da apple.com.)

**Hierarquia se resolve por peso antes de tamanho.** Título e corpo compartilham
a **mesma cor**; o que os separa é 600 contra 400. Esse é o ganho real — cabe em
4 degraus e funciona em qualquer densidade.

### 3.7 Caixa alta

**Não use.** Nenhum token de tipografia do apple.com aplica `text-transform`.
O "eyebrow" deles é um título de 21–24px em caixa normal; o rótulo de grupo da
barra lateral é 13px peso 600 em caixa normal.

Se o produto exigir um versalete, ele é a **única** exceção: rótulo curto,
`letter-spacing: 0.06em`, nunca numa frase. Mas a opção melhor quase sempre é
transformar o rótulo em **título de verdade**.

Cabeçalho de coluna em caixa alta com tracking é a assinatura visual de
dashboard genérico. Use caixa normal, cinza secundário, `letter-spacing: 0`.

### 3.8 Números

`font-variant-numeric: tabular-nums` em **toda** célula de moeda, contagem,
horário, percentual e ID — qualquer número comparável verticalmente.

⚠️ Tabular alarga os algarismos em **~4%**. Ligue **antes** de fechar as larguras
de coluna, não depois.

Texto corrido fica com números proporcionais.

---

## 4. Cor

### 4.1 A regra

**Uma escala de neutros + UM acento.**

O acento marca **ação primária** e **estado crítico**. Nada mais. Se ele aparece
em tudo, não marca nada.

Seleção, status, categoria, ênfase — tudo isso se resolve na escala de neutros,
por **peso, posição e preenchimento**.

### 4.2 Escolha do acento — calcule, não escolha do catálogo

O acento vai pintar um botão preenchido com texto branco em cima. O mínimo é
4,5:1, e **quase nenhuma cor de sistema passa**:

| Cor | Branco em cima |
| --- | --- |
| systemBlue `#007AFF` | 4,02:1 ❌ |
| systemRed | 3,55:1 ❌ |
| systemBrown | 3,50:1 ❌ |
| systemPurple | 4,13:1 ❌ |
| systemTeal | 2,57:1 ❌ |
| systemGreen | 2,22:1 ❌ |
| systemOrange | 2,20:1 ❌ |
| systemIndigo | 5,65:1 ✅ |
| Azul do botão do apple.com `#0071E3` | 4,70:1 ⚠️ passa raspando |

**Mire ≥ 7:1.** Aí o mesmo hex serve para **fundo de botão com texto branco** e
para **texto sobre papel** — e você não precisa de um segundo tom para links, que
é justamente onde a Apple precisa de dois azuis (`#0071E3` para botão, `#0066CC`
para link). Um acento que passa em 7:1 mantém a regra de um acento de graça.

Processo: escolha o *hue* pela marca → escureça até bater o alvo com branco →
derive os papéis abaixo.

### 4.3 Os papéis do mesmo hue

```
--accent          fundo de botão preenchido E cor de link      (≥7:1)
--accent-hover    MAIS CLARO que o base
--accent-active   mais escuro que o base
--accent-tint     ~12% de opacidade, para seleção e realce
```

⚠️ **Hover mais claro, active mais escuro.** É o inverso da convenção web comum
(medido: `#0071E3` → hover `#0077ED` → active `#006EDB`). Se adotar, revise
**todos** os hovers de uma vez — meia migração deixa botões se comportando de
dois jeitos na mesma tela.

⚠️ **Não use o acento com alfa no anel de foco.** Ver 6.4 — reprova na WCAG.

### 4.4 Neutros: escolha uma temperatura e não misture

Cinzas de sistema costumam ser **azulados** (B > R). Se a marca é quente (couro,
madeira, âmbar, terra), misturar as duas famílias faz o off-white parecer
encardido e o cinza parecer sujo.

Monte a rampa inteira na mesma temperatura, casada por luminância:

```
--paper      fundo da aplicação
--surface    cartões, listas, tabelas          (normalmente #FFFFFF)
--sunken     cabeçalho de tabela, área recuada
--fill       trilhos, chips, campos             (~12% de opacidade)
--line       separador
--ink        texto principal        ≥ 12:1
--ink-2      texto secundário       ≥ 4,5:1
--ink-3      letra miúda            ≥ 3:1  — nunca uma frase longa
```

⚠️ **Os label colors do iOS reprovam AA na web.** Achatados sobre branco:
`secondaryLabel` = 3,44:1 · `tertiaryLabel` = 1,74:1 · `quaternaryLabel` =
1,37:1. Funcionam num iPhone a 30cm com texto de 17px; num monitor a 60cm com
texto de 13px, não. Use os números da web, não os do sistema.

⚠️ **O par página/superfície precisa ser um degrau real.** A Apple vive sem
borda de 1px porque `#FFF` sobre `#F5F5F7` é um degrau visível. Se o seu `--paper`
for quase branco, ou você escurece o papel, ou a sombra do cartão passa a ser
obrigatória — senão o cartão some.

### 4.5 Estado sem cor

Status, categoria e seleção **não** usam cor. Use:

| Estado | Como |
| --- | --- |
| Resolvido / concluído | `--ink-3`, peso 400, opacidade 45–55% |
| Neutro / pendente | `--ink`, peso 400 |
| Exige ação | `--ink`, peso **600** + rótulo por extenso |
| Crítico | `--accent` |

Cor por categoria (4 pessoas, 6 projetos, 8 etiquetas) é a maneira mais rápida
de destruir o acento. Se precisar distinguir N itens, use **inicial ou nome**,
não matiz.

---

## 5. Layout

### 5.1 Largura: 980px é o CONTEÚDO, não o contêiner

A medida famosa da Apple é o texto, não a caixa:

```css
.shell { max-width: 1024px; padding: 0 22px; }   /* 1024 − 44 = 980 */
```

⚠️ Declarar `max-width: 980px` com padding de 20px entrega **940px** de conteúdo
— 40px a menos, com o rótulo de que é a medida da Apple.

| Contexto | Largura |
| --- | --- |
| Conteúdo de vitrine | **980px** (contêiner 1024 + 22) |
| Bloco de leitura corrida | **692px** |
| Formulário de fluxo | **560px** |
| Ferramenta / ERP | **fluida**, com gutter de 22px |

⚠️ **Não trave uma ferramenta em 980px.** Essa régua é largura de *leitura em
coluna única*. Num painel, tabela e grade de cartões ocupam a largura
disponível; só as **colunas de texto** ficam limitadas em 692px.

⚠️ **O texto para de crescer em 1441px.** Acima disso a Apple mantém 980px. Não
deixe a linha de leitura esticar em monitor grande.

### 5.2 Breakpoints: uma régua só

```
≤734   |   735–1068   |   1069–1440   |   ≥1441
```

Use **estes** no produto inteiro. Misturar 720/767/768 com 734/1068 cria dois
sistemas de dobra e o bug aparece exatamente na faixa entre eles.

(O 833px existe na Apple, mas é **exclusivo da altura da barra de navegação** —
não vire breakpoint de layout.)

### 5.3 Gutter no mobile é proporcional, não fixo

```css
@media (max-width: 734px) { .shell { width: 87.5%; max-width: none; padding: 0; } }
```

A margem cresce de 20px num aparelho de 320 para 27px num de 430. Um gutter fixo
aperta o telefone grande.

### 5.4 Ritmo vertical

O par é **assimétrico**: o rodapé da seção é maior que o topo.

| Contexto | Desktop | ≤1068 | ≤734 |
| --- | --- | --- | --- |
| Seção de vitrine | 96px / 104px | 80px / 80px | 72px / 78px |
| Bloco de conteúdo | 40px | 32px | 32px |
| Padding de cartão | 24px | 20px | 16px |

⚠️ **A Apple usa 110–162px, e copiar isso quebra páginas curtas.** Ela sustenta
esse ar porque a página de produto tem 18 blocos e o leitor rola 6.000px. Numa
página de 5 seções, 110px faz o rodapé encostar na dobra e a página lê como
inacabada.

⚠️ **Nunca use ritmo de vitrine numa ferramenta.** Ali o padding de cartão (24px)
e o gutter (22px) são o ritmo.

### 5.5 Grade

```css
.grid { column-gap: 40px; row-gap: 82px; }
@media (max-width: 1068px) { .grid { column-gap: 24px; } }
@media (max-width: 734px)  { .grid { column-gap: 0; } }   /* vira coluna única */
```

O gap de **linha** é muito maior que o de **coluna**. É isso que faz blocos
irmãos lerem como blocos, e não como uma malha.

### 5.6 Alinhamento: à esquerda por padrão

Contado em 164 blocos de texto de uma página de produto: **102 à esquerda**, 61
centralizados. O próprio herói do MacBook Air é **à esquerda**.

**Regra:** centralize apenas quando o bloco é **dono sozinho da faixa
horizontal** — abertura de capítulo, com título e no máximo uma linha de apoio.
Dentro de coluna, célula de grade, cartão, tabela ou formulário: **sempre à
esquerda**.

Centralizar formulário e título de painel é copiar a impressão errada.

### 5.7 Fundo cinza marca capítulo, não alterna

A troca de fundo (`branco` ↔ `cinza`) separa **capítulos**, não seções
consecutivas. Proporção medida: ~1 bloco cinza para cada 3 brancos.

⚠️ Faixa de fundo tem que ser **full-bleed** (borda a borda, sem raio). Um bloco
cinza com margem lateral e canto arredondado flutuando no meio da página fica
pior do que a borda de 1px que você estava tentando remover.

---

## 6. Geometria: raios, sombra, alvos

### 6.1 Escada de raios

Valores em uso, por frequência. Não existe 4px, 10px, 16px nem 20px:

```
3px · 6px · 8px · 12px · 18px · 28px · 50% · 980px
```

| Uso | Raio |
| --- | --- |
| Botão de vitrine, chip | `980px` (pílula) |
| Mídia grande, imagem de destaque | `28px` |
| Cartão de superfície densa | `18px` |
| Cartão, modal | `12px` |
| Campo, botão de app | `8px` |
| Pílula de navegação, bloco pequeno | `6px` |
| Avatar | `50%` |

⚠️ **Arredondar pela metade é pior que não arredondar.** Raio 0 em tudo é uma
postura coerente. Mas se arredondar o cartão e esquecer o interruptor, a pílula
da navegação e o *segmented*, o resultado lê como bug, não como estilo. **É tudo
ou nada.**

### 6.2 Sombra: uma só, ou nenhuma

A folha de produção inteira de uma página de produto da Apple (1,3 MB) contém
**uma única sombra de elevação**. Todo o resto é anel de foco ou `none`.

**Separe superfícies por tom e por espaço.** Quase nunca por sombra, e
praticamente nunca por borda de 1px.

Quando a sombra é necessária (superfície densa, cartão branco sobre página
cinza): `box-shadow: 2px 4px 12px 0 rgba(0,0,0,.08)`.

### 6.3 Alvos

| Contexto | Mínimo |
| --- | --- |
| Mouse (≥735px) | 28px |
| Dedo (≤734px) | **44px** |

⚠️ **Não engorde o botão para chegar aos 44px.** A Apple mantém o botão em ~35px
de caixa e estica a **área de clique** com margem invisível:

```css
.btn { position: relative; }
.btn::after { content: ''; position: absolute; inset: -6px; }  /* alvo, não caixa */
```

Copiar só o padding cria regressão de acessibilidade; copiar 44px de caixa
destrói a densidade da ferramenta. Faça as duas coisas separadamente.

⚠️ **Abaixo de 735px `hover` não existe.** Nenhuma ação pode depender dele: um
botão revelado em hover apaga o alvo *e* o dado no aparelho onde a pessoa mais
usa o produto. Alvos são persistentes.

### 6.4 Anel de foco — o ponto onde você faz melhor que a Apple

A Apple usa `outline: 4px solid rgba(keyColor, .6)`. Composto sobre branco isso
dá **2,27:1** e **reprova na WCAG 1.4.11**, que exige 3:1 para indicador
não-textual.

**Use o acento em opacidade cheia:**

```css
:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
tr:focus-visible, .card:focus-visible { outline-offset: 3px; }
```

- `outline`, não `box-shadow`: box-shadow é recortado por `overflow: hidden`, que
  todo cartão usa.
- Offset maior em linha de tabela: com 2px o anel encosta no separador da linha
  vizinha e vira ruído.
- Só em `:focus-visible`, nunca em `:focus` — senão o anel aparece no clique de
  mouse.

---

## 7. Componentes

Especificações concretas. Adapte as unidades ao stack (px na web, pt no iOS,
dp no Android) mas mantenha as **proporções**.

### Botão — a escada de três degraus, sem segunda cor

É assim que a regra de um acento sobrevive:

| Degrau | Aparência |
| --- | --- |
| 1º — primário | preenchimento no **acento**, texto branco, peso 600 |
| 2º — secundário | preenchimento em **tinta neutra** (`--ink`) ou `--fill` |
| 3º — terciário | **texto** no acento, sem caixa, sem raio; sublinhado só no hover |

⚠️ Se o segundo degrau virar um tom claro do acento, ele vira um **segundo
acento** e a regra cai.

| Variante | Altura | Padding | Tipo | Raio |
| --- | --- | --- | --- | --- |
| Primário (vitrine) | ~44px | 12/22 | 17px | pílula |
| Secundário (vitrine) | ~36px | 9/16 | 14px | pílula |
| Primário (ferramenta) | 30–32px | 6/12 | 14px | 8px |
| Terciário / link | — | 0 | 14px | — |

⚠️ **Desabilitado não pode ser `opacity`.** Branco a 42% sobre o acento clareado
cai para ~2,9:1 — ilegível. Troque a **superfície**: fundo `--fill`, texto
`--ink-3`.

✅ **Botão desabilitado deve DIZER o que falta.** Troque o rótulo ("Escolha um
horário", "Preencha seus dados") em vez de deixar uma placa colorida apagada.

### Campo

Altura 36px (ferramenta) / 44px (fluxo e mobile) · raio 6–8px · padding lateral
10–14px · borda por `box-shadow: inset 0 0 0 1px` (não `border`, para não mexer
no box model) · foco engrossa para 2px no acento.

**Erro:** ou o acento (se a regra define acento = estado crítico), ou tinta pura
com peso 600. **Nunca as duas coisas em telas diferentes do mesmo produto.**

### Lista agrupada

O padrão que mais muda a percepção de qualidade:

- contêiner arredondado, sem borda em volta de **cada** linha;
- separador **recuado** até onde o conteúdo começa (16–20px, ou depois do
  avatar/ícone);
- linha de 44px;
- `hover` = troca de fundo, não de borda.

### Tabela

Cabeçalho 28px, caixa **normal**, cinza secundário, `letter-spacing: 0`.
Linha 36px no mouse / 44px no dedo. Padding lateral 12px.
Números à direita com `tabular-nums`.

⚠️ **Zebra só em tabela multicoluna.** Em 2–3 colunas ela não ajuda a acompanhar
nada e cai direto na regra de subtração.

**No mobile a tabela vira cartões empilhados** — nunca rolagem horizontal em
tabela de dados.

### Segmented control

Altura 32px · trilho `--fill` com raio 9px · inset 2px · pílula selecionada
branca com raio 7px e sombra `0 3px 8px rgba(0,0,0,.12), 0 3px 1px rgba(0,0,0,.04)`.
**Sem cor:** a posição da pílula é o estado.

### Interruptor

38×22 · botão de 18px · curso de 16px · raio total.
Ligado = preenchimento em **tinta** (não no acento, se houver N na mesma tela).
Botão branco com `box-shadow: 0 1px 2px rgba(0,0,0,.18)`.

### Cartão — e quando NÃO usar cartão

O modelo **inverte** conforme a superfície:

| Superfície | Cartão |
| --- | --- |
| Página de marketing | **não existe** — raio 0, fundo transparente, sem sombra. O conteúdo se sustenta sozinho no espaço. |
| Superfície densa (loja, painel, listagem) | página cinza, cartão branco, raio 18px, `box-shadow: 2px 4px 12px rgba(0,0,0,.08)`, **sem borda** |

Enfiar cartão em página de marketing é o erro mais comum de quem "aplica um
design system" numa landing.

### Navegação lateral

Largura 260–264px · padding interno **8px** · item de 32px com raio 6px e padding
lateral 10px · gap de 2px · selecionado = pílula neutra + peso 600.

⚠️ **A pílula não existe sem o respiro de 8px.** Com padding lateral cheio sai um
retângulo colado nas duas bordas — pior que não arredondar.

### Barra translúcida

```css
background: var(--paper);                      /* sólido, declarado ANTES */
background: rgba(<paper>, 0.8);
-webkit-backdrop-filter: saturate(1.8) blur(20px);
backdrop-filter: saturate(1.8) blur(20px);
```

A **saturação** é o que impede o fundo de virar cinza morto atrás do vidro — não
use só `blur`.

⚠️ **Critério mecânico: use `backdrop-filter` só onde há conteúdo rolando por
baixo.** Sobre um fundo chapado ele não produz efeito nenhum e ainda força uma
camada de composição. Sim no topo de uma página com herói; sim numa barra fixa
sobre tabela rolando; **não** numa barra sobre fundo liso.

⚠️ **Duas barras nunca ficam fixas ao mesmo tempo.** Se existe uma barra
secundária (contexto, produto, filtros), a global solta e só a secundária gruda.

### Modal

Raio 12–18px · sombra difusa · véu `rgba(0,0,0,.28)` com `blur(4px)`.

**Numa confirmação destrutiva, a ação destrutiva É a ação primária daquele
diálogo** — ela usa o acento legitimamente. A proteção é o **texto explícito com
o número real** ("Apagar 143 registros") e o "Voltar" neutro ao lado. Vermelho
separado não é necessário.

### Estado vazio

**Uma frase.** Sem ícone, sem título grande, sem segunda linha pedagógica. Quem
olha uma tabela vazia já sabe que ela está vazia — o que falta é **o que fazer a
respeito**. Se houver uma ação, ela vem junto; se não, só a frase.

### Toast

Fundo tinta a 92% com blur · texto branco · raio 8px · uma frase.
**Sem ícone e sem cor por tipo:** a frase já diz o que aconteceu.

---

## 8. Movimento

| Uso | Duração |
| --- | --- |
| Hover, mudança de cor | 120–180ms |
| Entrada de painel, gaveta | 240–300ms |
| Transição de tela | 300–350ms |

Curva: `cubic-bezier(0.28, 0.11, 0.32, 1)`.

- Animação de entrada em tela usada muitas vezes por dia é **custo, não
  encanto**. Corte.
- Nada de animação em loop permanente.
- `@media (prefers-reduced-motion: reduce)` zerando tudo é obrigatório.

---

## 9. Acessibilidade

Não é uma seção separada do design — é parte do contrato.

- **Contraste:** texto normal ≥ 4,5:1 · texto grande e elementos de UI ≥ 3:1 ·
  acento com branco em cima ≥ 4,5:1 (mire 7:1).
- **Anel de foco ≥ 3:1** contra o fundo. Acento com alfa **reprova** — ver 6.4.
- **Nunca codifique informação só por cor.** Sempre cor + (texto | peso |
  posição | forma).
- **Todo controle tem nome acessível.** Interruptor sem rótulo visível precisa de
  `<label for>` ou `aria-label` — a palavra ao lado costuma ser o único nome que
  o leitor de tela tem.
- **Alvo de 44px no toque.**
- **Ordem de leitura = ordem visual.** Não use `order` do flex/grid para
  reorganizar conteúdo que importa.
- **Movimento reduzido respeitado.**

---

## 10. Três referências, não uma

O erro mais comum ao "seguir um padrão bonito" é aplicar a linguagem da **página
de marketing** dentro de uma **ferramenta**. São produtos diferentes — inclusive
dentro da própria Apple, que usa um sistema no apple.com e outro na Apple Store
e nos apps do macOS.

| Tipo | Referência | Corpo | Botão primário | Superfície | Ritmo |
| --- | --- | --- | --- | --- | --- |
| **Vitrine** (landing, institucional) | página de produto | 17px | pílula ~44px | sem cartão | 96px |
| **Fluxo** (checkout, onboarding, form) | fluxo de pagamento | 17px | pílula, fixa embaixo | cartão leve | uma decisão por tela |
| **Ferramenta** (painel, ERP, admin) | app de desktop / loja | 14px | retângulo 30px, raio 8px | página cinza + cartão branco | linha de 36px |

Se você usar corpo de 17px e pílula de 44px numa tabela de ERP, vai ter uma tela
bonita onde cabe metade dos dados.

**No fluxo, uma regra específica:** a ação primária vai numa **barra fixa
inferior**, com o resumo do que já foi escolhido como legenda dela. Botão de
avanço inline sai da tela enquanto a pessoa rola a lista de opções — e a barra
fixa é o espaço mais valioso do celular, não pode ser gasta com resumo passivo.

---

## 11. Anti-padrões

Os detalhes que mais denunciam interface genérica:

| ❌ Não | ✅ Em vez disso |
| --- | --- |
| Cabeçalho de coluna em CAIXA ALTA com tracking | caixa normal, cinza secundário |
| Cor por categoria (N matizes) | inicial, nome ou posição |
| Badge colorido para status | peso, opacidade e texto |
| Ícone decorativo ao lado de cada KPI | nada — o rótulo já nomeia o número |
| Cartão em página de marketing | espaço |
| Centralizar formulário e título de painel | alinhar à esquerda |
| Borda de 1px contornando tudo | degrau de tom + espaço |
| Várias sombras de elevação | uma só, ou nenhuma |
| `backdrop-filter` sobre fundo chapado | fundo sólido |
| "Simulado", "Beta", "Novo" repetido 3× na tela | uma vez, se muda a leitura |
| Gráfico que só pode subir | nenhum gráfico |
| Sparkline + gráfico grande da mesma série | um dos dois |
| Total de uma coluna de 4 números | nada |
| Percentual sem ponto de comparação | valor absoluto, ou nada |
| Contador de vaidade ("11k clientes") | nada |
| Zebra em tabela de 2 colunas | separador simples |
| Ação escondida em `hover` | alvo persistente |
| Botão desabilitado sem dizer o porquê | rótulo que diz o que falta |
| Gradiente, sombra colorida, brilho, textura | superfície plana e um tom de fundo |
| Animação de entrada em tela de uso diário | nada |
| Confirmação sem o número real do impacto | "Apagar 143 registros" |
| Três famílias tipográficas | uma |
| Peso 500 e 700 misturados a 400/600 | só 400 e 600 |
| Anel de foco com alfa | acento em opacidade cheia |

---

## 12. Tokens prontos

### CSS

```css
:root {
  color-scheme: light;

  /* Superfícies — escolha UMA temperatura e não misture */
  --paper:    #FAF9F7;
  --surface:  #FFFFFF;
  --sunken:   #F4F2EC;
  --fill:     rgba(118, 114, 106, 0.12);
  --fill-2:   rgba(120, 116, 108, 0.18);

  /* Traços */
  --line:     #E8E4DC;
  --line-2:   #CBC6BC;

  /* Texto */
  --ink:      #1C1B19;   /* 16,9:1 */
  --ink-2:    #6B6862;   /*  5,6:1 */
  --ink-3:    #8A867E;   /*  3,9:1 — só letra miúda */

  /* Acento — troque estes quatro e o produto muda de marca */
  --accent:        #8E2C26;   /* 8,3:1 com branco: serve fundo E texto */
  --accent-hover:  #9C332C;   /* mais claro */
  --accent-active: #7A2520;   /* mais escuro */
  --accent-tint:   #F1E6E5;
  --on-accent:     #FFFFFF;

  /* Tipografia */
  --t-display: 3.5rem;    /* 56 → 48 → 40 nos breakpoints */
  --t1: 1.75rem;          /* 28 */
  --t2: 1.3125rem;        /* 21 */
  --t3: 1.0625rem;        /* 17 */
  --t4: 0.875rem;         /* 14 */
  --t5: 0.75rem;          /* 12 */

  --lh-titulo: calc(1em + 4px);
  --lh-corpo:  calc(1em + 8px);
  --lh-denso:  calc(1em + 6px);
  --lh-botao:  calc(1em + 3px);

  --tr-56: -0.005em;
  --tr-48: -0.003em;
  --tr-40:  0em;
  --tr-17: -0.011em;
  --tr-14: -0.008em;
  --tr-12: -0.005em;

  /* Geometria */
  --r-pill: 980px;
  --r-28:   28px;
  --r-18:   18px;
  --r-12:   12px;
  --r-8:     8px;
  --r-6:     6px;

  /* Layout */
  --shell:  1024px;   /* 1024 − 44 = 980 de conteúdo */
  --prosa:   692px;
  --gutter:   22px;
  --secao-pt: 96px;
  --secao-pb: 104px;

  --ease: cubic-bezier(0.28, 0.11, 0.32, 1);
}

@media (max-width: 1068px) {
  :root { --t-display: 3rem; --secao-pt: 80px; --secao-pb: 80px; }
}
@media (max-width: 734px) {
  :root { --t-display: 2.5rem; --secao-pt: 72px; --secao-pb: 78px; }
}
```

### JSON (design tokens)

```json
{
  "color": {
    "paper": "#FAF9F7", "surface": "#FFFFFF", "sunken": "#F4F2EC",
    "line": "#E8E4DC",
    "ink": "#1C1B19", "ink2": "#6B6862", "ink3": "#8A867E",
    "accent": "#8E2C26", "accentHover": "#9C332C",
    "accentActive": "#7A2520", "onAccent": "#FFFFFF"
  },
  "font": { "size": [12, 14, 17, 21, 28, 40, 48, 56], "weight": [400, 600] },
  "radius": [6, 8, 12, 18, 28, 980],
  "layout": { "shell": 1024, "gutter": 22, "prosa": 692,
              "breakpoints": [734, 1068, 1441] },
  "target": { "mouse": 28, "touch": 44 },
  "motion": { "fast": 150, "base": 280, "ease": "cubic-bezier(0.28,0.11,0.32,1)" }
}
```

### Tailwind

```js
theme: {
  extend: {
    screens: { sm: '735px', lg: '1069px', xl: '1441px' },
    colors: {
      paper: '#FAF9F7', surface: '#FFFFFF', sunken: '#F4F2EC',
      line: '#E8E4DC',
      ink: { DEFAULT: '#1C1B19', 2: '#6B6862', 3: '#8A867E' },
      accent: { DEFAULT: '#8E2C26', hover: '#9C332C', active: '#7A2520' }
    },
    fontSize: {
      xs:  ['0.75rem',   { lineHeight: 'calc(1em + 6px)', letterSpacing: '-0.005em' }],
      sm:  ['0.875rem',  { lineHeight: 'calc(1em + 6px)', letterSpacing: '-0.008em' }],
      base:['1.0625rem', { lineHeight: 'calc(1em + 8px)', letterSpacing: '-0.011em' }],
      lg:  ['1.3125rem', { lineHeight: 'calc(1em + 4px)', letterSpacing: '0' }],
      xl:  ['1.75rem',   { lineHeight: 'calc(1em + 4px)', letterSpacing: '0' }],
      '4xl':['3.5rem',   { lineHeight: 'calc(1em + 4px)', letterSpacing: '-0.005em' }]
    },
    borderRadius: { pill: '980px', '28': '28px', '18': '18px',
                    '12': '12px', '8': '8px', '6': '6px' },
    fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
  }
}
```

⚠️ Se o Tailwind vier por **CDN**, ele não lê `tailwind.config` de tema sem etapa
de build. Nesse caso os tokens vivem em `:root` no CSS autoral e o Tailwind fica
só para `flex`/`grid`/`spacing`. Duas proibições concretas: nada de
`bg-[#8E2C26]` no HTML (cor sempre por `var()`), e nada de `rounded-2xl` (16px)
nem `shadow-md` — furam a escada de raios e a sombra única.

### Nativo

| Conceito | iOS (SwiftUI) | Android (Compose) |
| --- | --- | --- |
| Rampa | `.font(.system(size:weight:))`, mesmos degraus | `TextStyle(fontSize = N.sp)` |
| Tabular | `.monospacedDigit()` | `FontFeature("tnum")` |
| Raio | `RoundedRectangle(cornerRadius:)` | `RoundedCornerShape()` |
| Alvo | 44pt | 48dp |
| Lista agrupada | `List { }.listStyle(.insetGrouped)` | `Card` + `Divider` recuado |
| Acento | `.tint(accent)` | `colorScheme.primary` |

---

## 13. Checklist de aceite

Todos os itens são **verificáveis**, não opinião.

**Composição**
- [ ] Teste dos 5 segundos passa: dá para dizer o que a tela informa e qual é a ação.
- [ ] Exatamente 1 informação herói.
- [ ] Exatamente 1 ação primária visível (ou zero, declarado, em tela de leitura).
- [ ] Máximo 5 blocos sem rolar.
- [ ] Nenhum dado aparece duas vezes na mesma tela.
- [ ] Todo texto auxiliar cabe em 1 linha.

**Tipografia**
- [ ] No máximo 2 famílias no produto inteiro.
- [ ] No máximo 4 tamanhos nesta tela, todos da rampa.
- [ ] Só pesos 400 e 600.
- [ ] Zero `text-transform: uppercase`.
- [ ] `tabular-nums` em toda coluna numérica.

**Cor**
- [ ] Um acento. Ele aparece em no máximo 2 lugares nesta tela.
- [ ] Nenhuma informação codificada só por cor.
- [ ] Texto secundário ≥ 4,5:1; acento com branco ≥ 4,5:1; anel de foco ≥ 3:1.

**Geometria e layout**
- [ ] Raios da escada; nenhum componente ficou de fora.
- [ ] No máximo uma sombra de elevação no produto.
- [ ] Conteúdo de leitura em 980px (contêiner 1024 + 22).
- [ ] Breakpoints 734/1068/1441 — e só eles.
- [ ] Blocos alinhados à esquerda, exceto abertura de capítulo.
- [ ] Alvo ≥ 44px abaixo de 735px.
- [ ] Nenhuma ação depende de `hover`.

**Estados**
- [ ] Vazio, carregando, erro e "tudo feito" existem e foram vistos.
- [ ] Botão desabilitado diz o que falta.
- [ ] Confirmação destrutiva mostra o número real do impacto.
- [ ] Passada de `Tab` em todos os controles: o anel aparece e não é cortado.

### Auditoria automática (web)

Cole no console da página. Ele lê o DOM **renderizado**, não o CSS-fonte:

```js
(() => {
  const ACC = ['rgb(142, 44, 38)'];               // troque pelo seu acento em rgb()
  const vis = el => { const r = el.getBoundingClientRect(), s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.opacity !== '0'; };
  const els  = [...document.querySelectorAll('body *')].filter(vis);
  const leaf = els.filter(e => !e.children.length && e.textContent.trim());
  const shell = document.querySelector('main [class*=shell], main > div');
  return {
    familias:  [...new Set(els.map(e => getComputedStyle(e).fontFamily.split(',')[0].replace(/["']/g,'').trim()))],
    tamanhos:  [...new Set(leaf.map(e => getComputedStyle(e).fontSize))].sort((a,b)=>parseFloat(a)-parseFloat(b)),
    pesos:     [...new Set(leaf.map(e => getComputedStyle(e).fontWeight))].sort(),
    caixaAlta: leaf.filter(e => getComputedStyle(e).textTransform === 'uppercase').map(e => e.textContent.trim()),
    acentoFundo: els.filter(e => ACC.includes(getComputedStyle(e).backgroundColor)).map(e => e.textContent.trim().slice(0,30)),
    sombras:   [...new Set(els.map(e => getComputedStyle(e).boxShadow).filter(v => v !== 'none'))],
    conteudo:  shell ? shell.clientWidth - parseFloat(getComputedStyle(shell).paddingLeft) * 2 : null
  };
})()
```

**Esperado:** 1–2 famílias · ≤4 tamanhos · `["400","600"]` · `caixaAlta` vazio ·
`acentoFundo` com **1 item** (o nome da sua ação primária) · `sombras` com no
máximo 2 entradas · `conteudo` = 980.

---

## 14. Prompt para agentes de IA

Cole junto com a tarefa quando pedir UI a um assistente de código:

> Siga `DESIGN-SYSTEM.md` deste repositório. Em resumo:
>
> **Subtração antes de decoração** — todo elemento tem que mudar uma decisão do
> usuário; se não muda, não desenhe. Espaço vazio é resultado aceito.
>
> Por tela: **1 informação herói**, **1 ação primária**, máximo 5 blocos sem
> rolar, texto auxiliar de no máximo 1 linha.
>
> **Tipografia:** uma família; tamanhos só da rampa `12·14·17·21·28·40·48·56`;
> no máximo 4 por tela; `line-height: calc(1em + 4px)` em título e
> `calc(1em + 8px)` em corpo; **só pesos 400 e 600**; sem caixa alta;
> `tabular-nums` em toda coluna numérica.
>
> **Cor:** neutros + **um** acento, e o acento marca só ação primária e estado
> crítico. Status, seleção e categoria se resolvem em peso, opacidade e posição.
> Nunca codifique informação só por cor. Anel de foco em opacidade cheia.
>
> **Geometria:** escada de raios `6·8·12·18·28·980`, aplicada em *todos* os
> componentes; no máximo uma sombra de elevação; alvo de 44px no toque; nenhuma
> ação dependendo de `hover`.
>
> **Layout:** conteúdo em 980px (contêiner 1024 + 22 de padding); breakpoints
> 734/1068/1441; blocos alinhados à esquerda, exceto abertura de capítulo.
>
> **Referência certa:** vitrine ≠ formulário ≠ ferramenta. Não use corpo de 17px
> e botão de 44px numa tabela densa; não use cartão em página de marketing.
>
> Antes de entregar, rode o checklist da seção 13 e me diga o resultado do teste
> dos 5 segundos para cada tela.

---

## 15. Como adaptar para outra marca

1. Escolha o *hue* do acento pela marca.
2. Escureça até bater **≥7:1** com texto branco. Esse é `--accent` — e com 7:1
   o mesmo hex serve para fundo de botão **e** para link, então você não precisa
   de um segundo tom.
3. Derive `--accent-hover` (mais claro), `--accent-active` (mais escuro) e
   `--accent-tint` (~12%).
4. Escolha a **temperatura** dos neutros — quente ou fria — e monte a rampa
   inteira nela. Não misture.
5. Confira que `--surface` sobre `--paper` é um degrau visível. Se não for, ou
   escureça o papel, ou assuma a sombra no cartão.
6. Não mexa em mais nada. Rampa tipográfica, line-height, tracking, raios,
   alvos, breakpoints e regras de composição são **estruturais**: valem para
   qualquer marca.
