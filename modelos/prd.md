---
titulo: <Nome legível do PRD>
slug: <superficie>-<tema>
versao: 0.1.0
status: rascunho
superficie: <base | site | sistema | fluxo | app>
dominio: <geral | setor em uma palavra>
estende: nenhum
idioma: pt-BR
acessibilidade: WCAG 2.2 AA
atualizado: <AAAA-MM-DD>
---

# <Nome legível do PRD>

<Um parágrafo: que tipo de produto este documento descreve e de onde vêm as decisões.>

Este documento é um estilo de partida do kit: dá estrutura, medidas e comportamento. Cor, fonte, forma e voz de cada produto vêm do `DESIGN.md` do projeto. Antes de escrever, confira `skill/kit-frontend/references/gosto.md` e `anti-generico.md`: o que contrariar os dois precisa de motivo escrito aqui.

## Escopo

- **Use para:** <tipos de produto e de tela que este PRD cobre.>
- **Não use para:** <o que fica de fora, citando o slug do PRD que cobre cada caso.>
- **Relação com outros PRDs:** autossuficiente. Use um PRD por projeto; não entregue este documento a um agente junto com outro PRD deste repositório.

## Como usar

1. Copie este arquivo para a raiz do projeto com o nome `PRD-FRONTEND.md`.
2. Peça ao agente: "Siga `PRD-FRONTEND.md`. Antes de entregar, rode o checklist de aceite e diga o resultado de cada item."
3. <Passos próprios deste PRD, se houver.>

## 1. Princípios

<As poucas regras que decidem os casos que o resto do documento não prevê.>

## 2. Tokens

<Cada medida declarada uma vez. Todo texto abaixo se refere ao token, não ao número.>

```css
:root {
  /* cor */
  /* tipografia */
  /* espaço */
  /* forma */
  /* movimento */
}
```

## 3. Tipografia

<Família, pesos, rampa de tamanhos, altura de linha. Sem faixas.>

## 4. Cor

<Papel de cada cor e onde ela pode aparecer.>

## 5. Layout

<Larguras, pontos de quebra, ritmo vertical, grade.>

## 6. Componentes

<Para cada componente: medidas e os estados padrão, hover, foco, ativo, desabilitado e erro.>

## 7. Telas

<Estrutura de cada tipo de tela e os estados carregando, vazio e erro.>

## 8. Movimento

<Durações, curva, o que não anima, e o comportamento com `prefers-reduced-motion`.>

## 9. Acessibilidade

Piso: WCAG 2.2 AA.

| Par | Texto | Fundo | Razão | Texto normal (4,5) | Texto grande e UI (3,0) |
| --- | --- | --- | --- | --- | --- |
| <corpo sobre página> | `#______` | `#______` | <calculada> | <passa / reprova> | <passa / reprova> |

- **Foco:** <regra do anel e contraste contra cada fundo.>
- **Alvos:** <tamanho mínimo por tipo de ponteiro.>
- **Teclado:** <ordem, atalhos, diálogos.>
- **Cor:** <o segundo sinal que acompanha cada estado.>
- **Movimento:** <o que desliga com movimento reduzido.>

## 10. Checklist de aceite

Só itens que alguém consegue verificar.

- [ ] <item>
- [ ] <item>
