---
version: alpha
name: Central Fernão Dias
description: A rodovia como régua, com o relógio de 60 minutos na frente
colors:
  primary: "#0a5c43"
  on-primary: "#ffffff"
  primary-hover: "#004a34"
  primary-soft: "#d6f8e8"
  on-primary-soft: "#0a5c43"
  background: "#f3f8f6"
  on-background: "#121e18"
  surface: "#ffffff"
  on-surface: "#121e18"
  muted: "#5f6d66"
  line: "#d7e1dc"
  border-control: "#819089"
  focus: "#0a5c43"
  focus-on-primary: "#ffffff"
  ink: "#121e18"
  danger: "#a43b35"
  on-danger: "#ffffff"
  warning-fill: "#f3b63f"
  on-warning-fill: "#121e18"
  warning-text: "#8a5601"
typography:
  display:
    fontFamily: Bahnschrift
    fontSize: 3rem
    fontWeight: 700
    lineHeight: 1
  minutes:
    fontFamily: Bahnschrift
    fontSize: 1.75rem
    fontWeight: 700
    lineHeight: 1.05
  heading:
    fontFamily: Bahnschrift
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: Bahnschrift
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.35
  label:
    fontFamily: Bahnschrift
    fontSize: 0.9375rem
    fontWeight: 600
    lineHeight: 1.35
rounded:
  plate: 6px
  pin: 4px
spacing:
  sm: 8px
  md: 16px
  lg: 28px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.plate}"
    height: 56px
  topbar:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    height: 64px
  deadline-expired:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-danger}"
  deadline-soon:
    backgroundColor: "{colors.warning-fill}"
    textColor: "{colors.on-warning-fill}"
  deadline-soon-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.warning-text}"
  deadline-expired-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.danger}"
  row-selected:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.on-primary-soft}"
  secondary-text:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
  page-secondary-text:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted}"
---

<!-- Escolha provisória: o dono pediu "decide você e segue" e não viu as direções. As três estão em design/direcoes/ para ele trocar. -->

## Overview

**Conceito:** a Fernão Dias vista como ela é, uma linha reta de 450 km, mas com o relógio de 60 minutos de cada chamada na frente. Uma tela de trabalho com a cara de uma placa de rodovia.

**Direção aprovada:** B, "Rodovia", **provisória**, escolhida pelo agente em 31/10/2026 porque o dono ausente pediu "decide você e segue". Comparada com A (fila e detalhe, como caixa de entrada) e C (pátio, uma vaga por caminhão). Mistura: a régua e a placa de B, com o sinal de situação (ícone e palavra) que também está em A e C.

**Elemento-assinatura:** a régua da rodovia. As chamadas ficam em cima, como pinos com os minutos que faltam. Os guinchos ficam embaixo, vazados quando livres e cheios quando ocupados. Para a chamada escolhida, um trecho verde liga a chamada ao guincho sugerido, com os quilômetros e os minutos. Tirando a régua, a tela vira uma tabela qualquer. Ela serve à decisão real do atendente: "quem está mais perto?".

**Voz:** a de quem trabalha na estrada. Botão: "Mandar G-07". Vazio: "Nenhuma chamada esperando. Tudo despachado." Erro: "Não deu para mandar o G-07. A chamada continua esperando: tente de novo."

**Público:** atendentes de central, dois por turno, no mesmo computador e no mesmo monitor, 12 horas, com o telefone no ouvido. Hipótese: daltonismo, baixa visão e atenção dividida (`PRODUTO.md`).

**Como expressa a marca:** "Calma": cor só no que exige atenção, e nada se mexe além do relógio. "Exata": número com unidade e lugar com quilômetro. "De estrada": placa verde, letra de sinalização, quilômetro e sentido.

## Colors

Verde de placa de rodovia na barra superior, no botão de mandar e na escolha da fila. Neutros com um tom de verde, nunca cinza puro.

- **`primary`:** barra superior, botão "Mandar", linha escolhida e trecho da régua. O verde **não** significa "livre": um guincho livre é um círculo vazado, em qualquer cor. Assim, verde nunca disputa com a situação.
- **`danger`:** só "Estourou" e "Atrasa". Sempre com ícone de X e palavra.
- **`warning-fill` e `warning-text`:** só "Vence logo", com ícone de triângulo e palavra. O texto âmbar passa 4,5:1 sobre branco (`warning-text`); o preenchimento amarelo leva texto escuro.
- **Regra:** o que está normal não tem cor. A cor é o alarme. Se tudo tiver cor, nada chama atenção.
- **Anel de foco:** `primary` nas áreas claras, branco na barra verde.
- **Sem tema escuro nesta entrega.** A central funciona 24 horas e o turno da noite pode pedir um, mas o kit exige estudo antes (G21). Fica como pendência.

## Typography

**Bahnschrift**, a fonte de sinalização do Windows (família DIN, a mesma tradição das placas de estrada), em largura estreita nos números e títulos e normal no texto. Vem com o Windows 10 e o 11, que é o computador da central: por isso **não é servida pelo projeto**. Em outro sistema a tela cai para a fonte do sistema e perde a identidade, sem quebrar. Se a central trocar de computador ou o dono quiser a tela no celular, será preciso servir uma fonte em WOFF2.

Tamanhos em `rem`. Corpo de 16px. O maior número da fila é o tempo que falta (1,75rem), porque é o que a pessoa procura. O guincho sugerido vem logo depois (1,1875rem). Nada abaixo de 12px, e rótulos de 13 a 15px só em apoio.

## Layout

Largura toda do monitor (G07). De cima para baixo: barra, régua, e duas colunas. A coluna da esquerda traz a fila e, abaixo, o que está a caminho. A da direita traz o painel "Mandar" e a frota. As quebras são em `em` (90em, 64em e 52em), para que a letra a 200% também mude o layout.

Até 90em, as colunas da tabela podem quebrar linha. Até 64em a tela vira uma coluna, com o painel "Mandar" logo depois da fila (monitor de 1280 px continua em duas colunas). Até 52em a tabela vira lista com o nome de cada dado, e a régua some (as listas dizem o mesmo). Com altura até 480px, nada é fixo.

## Elevation & Depth

Sem sombra. Camadas por tom e por linha de 1px em `line`. A placa do painel "Mandar" usa uma borda branca interna de 2px dentro do verde, como uma placa de rodovia.

## Shapes

Tudo é placa: retângulo com cantos de 6px. Pinos da régua e etiquetas, 4px. O círculo é só de guincho. Uma regra: retângulo para chamada, círculo para guincho.

## Components

**Pino de chamada (régua):** mostra os minutos que faltam. Vermelho cheio com X: estourou. Âmbar com triângulo (na tabela): vence logo. Contorno: no prazo. O escolhido leva anel verde.

**Guincho (régua e lista):** círculo vazado livre, cheio ocupado, tracejado fora de serviço. Número de dois dígitos dentro.

**Linha da fila:** placa com os minutos e a unidade, o lugar com quilômetro e sentido, o veículo e o problema, quem pediu e o guincho sugerido. A linha escolhida muda de fundo e leva contorno, e `aria-current`.

**Foco:** anel de 3px em `primary`, 2px afastado.

## Do's and Don'ts

- Faça: situação sempre com ícone e palavra ("Estourou", "Vence logo"), nunca só cor.
- Faça: a fila em ordem fixa pelo prazo que falta, nunca pela hora de chegada.
- Faça: escreva "Chega 19:54, 16 min depois do prazo". O número sozinho não diz o que fazer.
- Não faça: verde para "livre". Verde é a marca.
- Não faça: logo em quadrado. Sem logotipo, o nome fica em texto até o dono mandar o arquivo.
- Não faça: som de alarme como único aviso. Quem trabalha com telefone no ouvido não ouve.
- Usamos Bahnschrift (e não uma fonte baixada) porque o computador da central é Windows e a fonte já está lá: sem internet de terceiros, sem arquivo para manter.
