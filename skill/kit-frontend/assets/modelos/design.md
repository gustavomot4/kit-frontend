---
version: alpha
name: <Nome do produto>
description: <O conceito, em uma frase>
colors:
  primary: "#000000"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#000000"
  muted: "#000000"
  border-control: "#000000"
  focus: "#000000"
  danger: "#000000"
  on-danger: "#FFFFFF"
typography:
  title:
    fontFamily: <Família>
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: <Família>
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: <Família>
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.4
rounded:
  control: 8px
  surface: 12px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
    height: 48px
---

<!-- Formato DESIGN.md (Google Labs, versão alpha). Mantenha as seções nesta ordem e os títulos em inglês.
     Validação opcional: npx @google/design.md lint DESIGN.md. Contraste: scripts/contraste.mjs DESIGN.md -->

## Overview

**Conceito:** <uma frase do mundo do produto, com uma tensão: "X, mas Y".>

**Direção aprovada:** <qual proposta, em que data, por quem. Misturas: "A, com a agenda da B".>

**Elemento-assinatura:** <o elemento funcional que só este produto tem.>

**Voz:** <como o produto fala, com uma frase real de botão, uma de vazio e uma de erro.>

**Público:** <resumo de `PRODUTO.md`, no que afeta o design.>

**Como expressa a marca:** <como este visual traduz as palavras de personalidade de `MARCA.md`.>

## Colors

<Papel de cada cor, onde pode e onde não pode aparecer, e o porquê da escolha.>

## Typography

<Por que esta família. Tamanhos em `rem`. Papel de cada estilo.>

## Layout

<Faixas de largura, largura máxima, como a tela é usada no computador, ritmo vertical.>

## Elevation & Depth

<Como as camadas se separam: tom, linha ou sombra, com uma regra só.>

## Shapes

<A lógica dos raios e das linhas.>

## Components

<O que muda em relação aos padrões do kit. Estados: padrão, hover, foco, ativo, desabilitado, erro.>

## Do's and Don'ts

<Decisões que parecem exceção, com o motivo: "Usamos Inter porque…". O verificador aceita fontes declaradas aqui.>
