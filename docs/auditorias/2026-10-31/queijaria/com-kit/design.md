---
version: alpha
name: Curral Velho
description: Queijo de cura lenta, vendido em letra de cartaz
colors:
  primary: "#1b1409"
  on-primary: "#f0b323"
  brand: "#f0b323"
  on-brand: "#1b1409"
  surface: "#fffdf8"
  on-surface: "#1b1409"
  ink: "#1b1409"
  on-ink: "#fffdf8"
  muted: "#5b4c33"
  line: "#e8dfc9"
  border-control: "#1b1409"
  focus: "#1b1409"
  focus-halo: "#fffdf8"
  cura-21-top: "#f3dc8c"
  cura-21-side: "#e0b94d"
  cura-45-top: "#e9b84a"
  cura-45-side: "#cf9420"
  cura-90-top: "#d08f2a"
  cura-90-side: "#a8660f"
typography:
  display:
    fontFamily: Big Shoulders Display
    fontSize: 10rem
    fontWeight: 900
    lineHeight: 0.92
  title:
    fontFamily: Big Shoulders Display
    fontSize: 4.5rem
    fontWeight: 900
    lineHeight: 0.95
  number:
    fontFamily: Big Shoulders Display
    fontSize: 6rem
    fontWeight: 900
    lineHeight: 0.85
  label:
    fontFamily: Big Shoulders Display
    fontSize: 1.5rem
    fontWeight: 800
    lineHeight: 1.1
  body:
    fontFamily: Public Sans
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.55
rounded:
  none: 0px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
  xl: 56px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.none}"
    height: 56px
  button-on-ink:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    rounded: "{rounded.none}"
    height: 56px
  header-brand:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
  section-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
  section-ink-heading:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.brand}"
  page-muted-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
---

<!-- ESCOLHA PROVISÓRIA: o dono não pôde responder ("decide você e segue"). Direção escolhida pelo agente. As três direções estão em design/direcoes/ para ele trocar. -->

## Overview

**Conceito:** queijo de cura lenta, vendido em letra de cartaz. A página tem pressa de mostrar o preço e o prazo, e a coisa que ela vende é o tempo.

**Direção aprovada:** provisória, escolhida pelo agente em 31/10/2026: a **B (A régua da cura)**, com a clareza de preço e a ação por cura da **A (Cardápio)** e o esquema de envio e prazo da **C (A rota)**, reduzido a uma semana de cinco dias. Não houve escolha do dono. A e C ficam guardadas em `design/direcoes/`.

**Elemento-assinatura:** a régua da cura. Os três queijos ficam numa linha de dias (0 a 100), cada um na posição do seu tempo: 21%, 45% e 90%. A distância entre eles é o tempo que o queijo passa na prateleira. Se tirar a régua, a página vira uma lista de três preços.

**Voz:** direta, com calor. Botão: "Pedir 45 dias". Vazio: "Sem pedido por enquanto. Escolha uma cura e fale com a gente." Erro: "O WhatsApp não abriu. Ligue ou mande mensagem para (37) 99999-0000." Sucesso: "Pedido enviado. A gente responde para confirmar o envio de terça."

**Público:** compradores de São Paulo e Belo Horizonte, de 30 a 70 anos, no celular com uma mão (hipótese, sem pesquisa). Parte com letra grande. O pedido é pelo WhatsApp.

**Como expressa a marca:** direta (preço, dia e prazo no alto, letra de cartaz, nada de rodeio); firme (prova com registro, prazo e origem, nunca com adjetivo); de casa (a marca de ferro, o C com um V dentro, estampada na casca, e nenhum xadrez nem trigo).

**Imagem:** o produto é desenhado em SVG, com uma regra só: queijo visto de cima e de lado, sem contorno, três tons por cura (mais escuro quanto mais dias), marcas de pano na lateral e a marca de ferro na casca. Sem foto: ainda não existe. Quando houver foto boa do queijo, ela entra no herói e a vitrine desenhada sai.

## Colors

- **Ouro de casca `#f0b323` (brand):** é a cor da marca e fica em área grande: o cabeçalho com o título e a faixa do pedido. Sempre com texto `#1b1409` em cima (9,7:1). Nunca texto branco nem cinza sobre ouro.
- **Tinta `#1b1409` (primary, ink):** texto, botões, linhas de 3px e a seção do envio. Quase preta com um fundo de madeira queimada, sem ser cinza puro.
- **Papel `#fffdf8` (surface):** o fundo de leitura. Neutro quente, sem virar creme: não há terracota nem serifa.
- **Marrom suave `#5b4c33` (muted):** só para apoio sobre o papel. Nunca sobre ouro.
- **Cores dos queijos:** só no desenho. Não são cores de interface e não carregam informação sozinhas: o número de dias e o texto estão sempre ao lado.
- **Por que ouro:** os sites de queijo artesanal costumam ser creme, marrom e verde de fazenda (hipótese, não verificada). O ouro de casca em área cheia, com tinta quase preta, é a cor do próprio queijo e não se confunde com eles.

## Typography

**Big Shoulders Display** (OFL, peso 800 e 900), em caixa alta, para título, número de dias, preço e botão. Letra de cartaz e de letreiro: estreita e pesada, cabe grande na primeira dobra do celular. **Public Sans** (OFL, 400 a 700) para o texto corrido: legível em 18px e sem personalidade que brigue com o título. Ambas servidas por arquivo WOFF2 do projeto, subconjunto latino, com `ã õ ç` conferidos.

- Título da primeira dobra: de 3,4rem no celular a 10rem no computador (`clamp`), peso 900, entrelinha 0,92. Caixa alta só em frases curtas: título, número, botão.
- Corpo: 18px (1,125rem) no celular e no computador, entrelinha 1,55, até 70 caracteres por linha. Nada abaixo de 14,4px.
- Tamanho em `rem`: com a letra do navegador em 200%, o texto cresce.
- Sem itálico. Sem letra apertada: `letter-spacing` nunca abaixo de -0,005em.

## Layout

- Contêiner de 80rem com 1rem de margem lateral mínima. Faixas de ponta a ponta: ouro, papel, tinta, papel, ouro.
- Pontos de quebra: 48rem (provas em três colunas, passos em quatro, cada cura em linha com o botão à direita), 56rem (herói em duas colunas: texto e vitrine) e 72rem (a régua em linha, com os queijos nas posições de 21%, 45% e 90%).
- Abaixo de 72rem a régua vira uma lista de três linhas, cada uma com uma barra cuja largura é proporcional aos dias (21%, 45%, 90%): o tempo continua à vista.
- No celular, o botão de cada cura ocupa a largura toda (alvo de 56px). No computador, fica sob o queijo.
- Ritmo: cada faixa muda de composição: título enorme, régua, semana, texto e selo, chamada final.

## Elevation & Depth

Sem sombra. Camadas se separam por faixa de cor e por linha de tinta de 3px. O único "volume" está no desenho do queijo.

## Shapes

Raio zero em tudo: botão, selo, semana. Linhas de 3px em tinta. O extremo é a regra: cantos retos de letreiro, de carimbo e de caixa de madeira. O queijo desenhado é a única forma redonda da página, e por isso se destaca.

## Components

- **Botão principal:** fundo tinta, texto ouro, 56px de altura, Big Shoulders 800 em caixa alta. Hover: fundo papel e texto tinta. Foco: contorno de 3px em tinta com halo de 6px em papel; nas faixas de tinta, o contrário.
- **Botão sobre ouro ou tinta:** o botão principal funciona sobre o ouro. Na faixa de tinta não há botão.
- **Cura:** número de dias (Big Shoulders 900), descrição de uma frase, preço e botão "Pedir N dias", sempre nessa ordem. Um botão por cura, o mesmo nome em todos.
- **Semana do envio:** cinco células, seg a sex. Terça em ouro e com "sai o queijo"; quarta, quinta e sexta listradas e com "1º, 2º e 3º dia útil". A situação se distingue por cor, listra e texto.
- **Selo do registro:** caixa de 4px em tinta, sem sombra, com "Registro no IMA".
- **VLibras:** botão do widget do governo federal, na borda direita. O contêiner dele recebe um anel de foco de duas cores, porque o botão fica num shadow DOM.

## Do's and Don'ts

- **Faça:** dizer o dia e o prazo (terça, até 3 dias úteis) antes da pergunta "e se não chegar?".
- **Não faça:** foto de banco, queijo sobre tábua rústica, xadrez, trigo, selo "premium" nem depoimento: nada disso existe nem é da família.
- **Não faça:** afirmar o que o dono não disse: número do registro no IMA, selo de qualidade, prêmio, frete, forma de pagamento, endereço ou clientes atendidos.
- **Decisão:** caixa alta só em título, número e botão, nunca em frase longa (dislexia e baixa visão leem pior).
- **Decisão:** a marca de ferro nunca vai dentro de um quadrado colorido (G17). Ela aparece sozinha, em tinta ou em papel, ou sobre a casca do queijo.
- **Decisão:** Big Shoulders Display e Public Sans foram escolhidas com motivo escrito acima. Nenhuma é Inter, Roboto, Poppins ou Montserrat.
