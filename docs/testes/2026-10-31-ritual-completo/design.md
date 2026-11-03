---
version: alpha
name: Casa Amparo
description: Uma casa de família com a luz acesa, que mostra o caminho a quem não sabe por onde começar
colors:
  primary: "#843143"
  on-primary: "#fbf5f6"
  primary-hover: "#6f2335"
  rose: "#f3d6dc"
  luz: "#f3c969"
  background: "#fbf5f6"
  on-background: "#231719"
  surface: "#f3e6e9"
  on-surface: "#231719"
  muted: "#52424a"
  line: "#dcc8cd"
  border-control: "#98878a"
  focus: "#231719"
typography:
  title:
    fontFamily: Newsreader
    fontSize: 3.25rem
    fontWeight: 500
    lineHeight: 1.06
  heading:
    fontFamily: Newsreader
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.15
  number:
    fontFamily: Newsreader
    fontSize: 3.25rem
    fontWeight: 600
    lineHeight: 1.1
  body:
    fontFamily: Public Sans
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: Public Sans
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.25
rounded:
  control: 6px
  surface: 6px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
  xl: 56px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
    height: 64px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
    height: 64px
  button-on-panel:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary-hover}"
    rounded: "{rounded.control}"
    height: 64px
  panel-text:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  panel-secondary-text:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.rose}"
  panel-light-icon:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.luz}"
  page-secondary-text:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted}"
  box-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
  box-secondary-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
  link-on-page:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary-hover}"
---

<!-- Direção ESCOLHIDA SEM O DONO: o dono não pôde responder. Tudo aqui é provisório até ele confirmar. -->

## Overview

**Conceito:** uma casa de família com a luz acesa, que mostra o caminho a quem não sabe por onde começar. Sóbria, mas de casa.

**Direção aprovada:** PROVISÓRIA. Direção B ("O caminho"), em 31/10/2026. Escolha cega com dois agentes novos, um de cada vez, que só viram as imagens: os dois escolheram a B, com margem leve. O dono não respondeu; a escolha vale até ele dizer o contrário. As outras duas direções ficam em `design/direcoes/` (A, "casa do bairro", verde-sálvia; C, "o número é a casa", azul-noite e âmbar) para ele poder trocar. Misturas: da C vieram o número do telefone em tamanho grande e a casinha com a janela acesa; da A, o aviso "Atendemos 24 horas" perto do número. Os dois agentes pediram também: o botão de ligar perto do título, o painel menos pesado, "Comece aqui" no lugar de "Você está aqui", e marcadores só nos passos.

**Elemento-assinatura:** o caminho, uma linha vertical com três paradas (a ligação, o velório, o cartório) e a etiqueta "Comece aqui" na primeira. Resolve o problema real de quem chega: mostra tudo o que vai acontecer e onde ela está. Sem ele, a página vira uma lista de serviços de qualquer setor. Em segundo plano, a casinha com a janela acesa: a luz acesa de madrugada é o "24 horas".

**Voz:** a de quem atende, em "a gente" e "você". Botão: "Ligar agora". Vazio: "Você não precisa ter nada em mãos. Ligue assim mesmo." Erro: "Não deu para abrir o WhatsApp. Ligue para (32) 99999-0000: a gente atende 24 horas." Nunca exclamação, nunca eufemismo que esconde, nunca "falecimento" onde "morte" é o que se quer dizer.

**Público:** quem acaba de perder alguém, quase sempre no celular, em choque e sem saber por onde começar; quem resolve pela família e compara preços; quem quer deixar tudo combinado em vida e lê com calma, em letra grande. Hipótese de `PRODUTO.md`: `publicos` = pouca-leitura, idosos, baixa-visao, cognitivo, surdos-libras.

**Como expressa a marca:** *Calma, não lenta:* o vinho em área grande, a serifa e a ausência de qualquer movimento; a ação continua a um toque. *Clara, não fria:* passos nomeados, preço escrito, frases curtas. *De família, não de empresa:* "a gente", "há 40 anos", a casinha no lugar de um logotipo corporativo.

## Colors

Vinho e papel rosado, com uma única luz quente. Longe do preto e dourado, do azul-marinho e do verde-sálvia que as funerárias costumam usar; o espaço livre é uma cor de casa, e não de cerimônia. (Os concorrentes da cidade não foram olhados: essa leitura é hipótese.)

- **`primary` (`#843143`):** o painel da primeira dobra, o botão de ação nas áreas claras, a linha e os marcadores do caminho, o nome. Mais claro e quente que o primeiro vinho testado (`#7b2a3e`), porque dois agentes acharam o painel solene demais. Passa 7,8:1 com o texto claro.
- **`primary-hover` (`#6f2335`):** estado de hover e texto de link nas áreas claras.
- **`rose` (`#f3d6dc`):** texto de apoio sobre o painel e o halo do primeiro marcador. 6,2:1 sobre `primary`.
- **`luz` (`#f3c969`):** só a janela acesa da casinha, sobre o vinho. É a única cor quente: significa "atendemos agora". Não usar em texto, em botão nem em fundo. Sobre claro, a casinha usa `#e3a72f`.
- **`background`, `surface`, `line`:** papel rosado, o quadro de "Quer deixar tudo combinado" e as réguas. Neutros tingidos de vinho, sem cinza puro.
- **`muted` (`#52424a`):** texto de apoio. 8,7:1 sobre `background`.
- **`focus`:** anel de foco de 3px em `#231719`, com halo branco de 6px; nas áreas vinho, anel branco com halo vinho.

Contra a cor sozinha: nenhuma informação depende dela. O passo "Comece aqui" tem texto e forma de seta; os serviços têm nome e preço escritos.

## Typography

**Newsreader** (serifa, 500 e 600) nos títulos e nos números, porque tem formas de caligrafia e algarismos de altura de linha que ficam bonitos em tamanho grande, o que dá a voz de carta de uma casa antiga sem ser enfeitada. **Public Sans** (400 a 700) no texto e nos botões, porque é neutra e legível em 18px. Duas famílias, com função: a serifa fala, a sem serifa instrui.

Tamanhos em `rem`. Texto corrido em 1,125rem (18px), nada abaixo de 1rem. Título da primeira dobra de 2,25rem a 3,5rem. Título de seção de 1,875rem a 2,625rem. Números: até 3,75rem. Entrelinha de 1,6 no texto. Letras sem aperto (`letter-spacing` 0). Fontes servidas pelo próprio projeto (WOFF2, subconjunto latino, OFL-1.1, com as licenças ao lado), sem CDN.

## Layout

- **Computador (a partir de 64rem):** duas colunas. À esquerda, o painel vinho, com 34% da largura, fixo na altura da tela: marca, título, "Atendemos 24 horas", o número, os botões e o sinal do preço. À direita, o caminho e, abaixo dele, os serviços e o convite para combinar antes, numa coluna de até 62rem.
- **Celular (até 64rem):** coluna única. O painel vira a primeira dobra, com o número grande, que é um toque para ligar. Uma barra fixa na base leva "Ligar agora" e "WhatsApp". O texto deixa 3,5rem livres à direita, onde fica o botão de Libras (VLibras).
- **Altura até 480px:** a barra e o painel deixam de ser fixos.
- Ritmo vertical de 3,5rem entre paradas.

## Elevation & Depth

Sem sombra. As camadas se separam por tom (vinho, papel, rosado) e por régua de 2 a 3px em `line` ou `primary`.

## Shapes

Raio de 6px nos botões e no quadro de "combinar antes", em tudo. Marcadores do caminho são círculos; a etiqueta "Comece aqui" tem a ponta de uma seta voltada para o marcador. Linhas de 3px no caminho e de 2px nas réguas. Cantos pouco arredondados dão seriedade sem frieza; pílulas seriam de aplicativo e cantos retos, de cartório.

## Components

- **Botão de ligar (`button-primary`, `button-on-panel`):** 64px de altura, texto centralizado em Public Sans 700 1,25rem; o rótulo é "Ligar agora" e o número fica na linha de baixo. Estados: padrão, hover (`primary-hover`), foco (anel de 3px), ativo (igual ao hover). Sem estado desabilitado.
- **Botão de WhatsApp:** contorno de 2px, mesma altura, texto "Chamar no WhatsApp".
- **O número:** link para `tel:`, em Newsreader 600, sublinhado de 3px em `rose`, no painel; é o maior texto da primeira dobra.
- **Parada do caminho:** marcador de círculo na linha, título em Newsreader 600 e uma ou duas frases. A primeira é cheia, com halo, e leva a etiqueta "Comece aqui".
- **Serviço:** nome, preço e uma pergunta ("Perguntar sobre o Essencial") que abre o WhatsApp com a mensagem pronta. O preço é Newsreader 600, 2,125rem.
- **Barra do celular:** dois botões de 56px na base. Os três botões da página têm o mesmo verbo e objeto em todo lugar ("Ligar agora").

## Do's and Don'ts

- Faça: uma ação por tela (ligar), repetida onde a pessoa está. Escreva o preço sem "consulte".
- Faça: deixar a página completa sem foto. Quando a fachada chegar, entra no bloco descrito em `design/midia.md`.
- Não: preto total, pomba, flor, cruz, vela como ornamento, ou frase religiosa. A casa atende famílias de crenças diferentes, e há cremação.
- Não: animação, vídeo com som, contador de "atendimentos", depoimento ou selo que não existe.
- Não: prometer o que cada serviço inclui. O dono não informou; a página manda perguntar e abre o WhatsApp com a pergunta pronta.
- Não: marcador de passo onde não há passo. Serviços e "combinar antes" ficam fora da linha.
- Usamos `system-ui` só como reserva se a fonte não carregar; a identidade está nas duas fontes servidas.
- Limites conhecidos: o logotipo é tipográfico com uma casinha simples, feito em horas e sem kerning; um designer pode refinar. Escolha de direção, cor e voz não foi testada com pessoas.
