# Acessibilidade: o piso

Piso: **WCAG 2.2 nível AA**, que a **ABNT NBR 17225:2025** (Acessibilidade em conteúdo e aplicações web) acompanha no Brasil. A Lei Brasileira de Inclusão (13.146/2015) trata de acessibilidade em sites; o que ela exige de cada caso é questão jurídica, não técnica.

Este piso prevalece sobre tudo no kit, inclusive `gosto.md`, `DESIGN.md` e estilos. Se um pedido bater nele, avise e proponha o caminho que atende aos dois.

**Não declare "acessível" nem "em conformidade".** Diga o que foi verificado e como. Ferramenta automática encontra só parte dos problemas: o resto pede teclado, leitor de tela e pessoas.

## Para quem, e o que muda para cada um

| Quem | O que precisa | Regra |
| --- | --- | --- |
| Pessoa cega | Estrutura e nomes | Semântica nativa, títulos em ordem, nome em todo controle, avisos anunciados |
| Baixa visão, pessoa idosa | Texto que cresce sem quebrar | Fonte em `rem`, zoom de 200% e 400%, contraste, nada de texto em imagem |
| Daltonismo | Sinal além da cor | Texto, forma ou ícone em todo estado |
| Mobilidade reduzida, tremor | Alvo grande e teclado | 44 × 44 no toque, tudo pelo teclado, sem exigir arrasto |
| Baixo letramento, pouca familiaridade | Clareza | Frases curtas, uma decisão por tela, ícone sempre com texto, padrões conhecidos |
| Pessoa surda | Equivalente visual | Legenda em vídeo, nada só em áudio, Libras em site público (VLibras recomendado, não substitui o resto) |
| Sensível a movimento | Controle | `prefers-reduced-motion`, nada piscando, pausa em todo carrossel |
| Situação temporária | Contraste e tamanho | Sol na tela, uma mão só, conexão ruim |

## Regras com número

| Tema | Regra | Critério |
| --- | --- | --- |
| Contraste de texto | 4,5:1; texto de 24px ou mais, ou 18,66px em negrito, 3:1 | 1.4.3 |
| Contraste de interface | 3:1 para borda de campo, ícone que informa, foco e gráfico | 1.4.11 |
| Alvo | Mínimo de 24 × 24px. Padrão do kit: 44 × 44px no toque | 2.5.8 |
| Fonte | Em `rem`. Corpo de pelo menos 16px em tela de uso geral; nada abaixo de 12px | 1.4.4 |
| Largura | Sem rolagem horizontal em 320px de largura (1280px com zoom de 400%) | 1.4.10 |
| Espaçamento de texto | Nada cortado com altura de linha 1,5 e espaçamento entre letras 0,12em | 1.4.12 |
| Foco | Sempre visível, 3:1, nunca coberto por barra fixa | 2.4.7, 2.4.11 |
| Teclado | Tudo acessível, sem armadilha, ordem lógica | 2.1.1, 2.1.2, 2.4.3 |
| Arrasto | Toda ação de arrastar tem alternativa sem arrasto | 2.5.7 |
| Erros | Identificados em texto, com sugestão de correção | 3.3.1, 3.3.3 |
| Entrada repetida | Não peça de novo o que já foi informado | 3.3.7 |
| Login | Sem teste cognitivo; permita colar senha e usar gerenciador | 3.3.8 |
| Ajuda | No mesmo lugar em todas as telas | 3.2.6 |
| Tempo | Aviso com ação não some enquanto tiver foco ou ponteiro; a ação também existe em outro lugar | 2.2.1 |

## O que agentes costumam errar

- **Barra fixa em zoom alto.** Em janela baixa, cabeçalho, abas e aviso de cookies cobrem a tela. Regra do kit: com altura até 480px, tudo o que é fixo passa a rolar junto.

```css
@media (max-height: 480px) {
  .barra-superior, .barra-inferior, .barra-de-acoes, .aviso-de-cookies { position: static; }
}
```

- **`min-width: 320px` no `body`.** Com barra de rolagem clássica no Windows, cria rolagem horizontal. Não declare.
- **`outline: none`** sem substituto de 3:1. O halo claro em volta do campo não basta como único sinal.
- **Anel de foco de uma cor só.** A cor de marca que passa sobre o fundo claro pode reprovar sobre a barra escura. Meça contra cada fundo e troque a cor do anel nas áreas escuras.
- **`maximum-scale=1`** na meta viewport. Nunca.
- **Placeholder como rótulo.** Some ao digitar. Rótulo visível sempre acima do campo.
- **`<div>` clicável.** Use `<button>` e `<a>`.
- **Combobox, abas e menu feitos à mão com ARIA errado.** Prefira o nativo ou uma base testada (React Aria, Radix). Se fizer à mão, siga o WAI-ARIA Authoring Practices.
- **Texto truncado sem saída.** `title` não chega a quem usa toque ou teclado. O conteúdo completo precisa existir em outro lugar.
- **`aria-label` que não contém o texto visível.** Quem usa controle por voz fala o que vê (2.5.3).
- **Mudança sem anúncio.** Resultado de busca e confirmação usam `role="status"`; erro urgente usa `role="alert"`.
- **Rota de SPA sem foco.** A cada troca de tela, atualize `document.title` e mova o foco para o `h1`.

## Roteiro de verificação

Rode `scripts/verificar.mjs` em cada tela. Depois faça à mão e relate cada item:

1. **Só teclado:** percorra a tela com Tab, Shift+Tab, Enter, Espaço, Esc e setas. O foco aparece sempre? Abre e fecha diálogo devolvendo o foco?
2. **Zoom:** 200% e 400%. Nada some, nada rola para o lado, barra fixa não cobre.
3. **Letra grande:** aumente a fonte padrão do navegador para 200%. O texto precisa crescer.
4. **Leitor de tela:** NVDA no Windows, VoiceOver no Mac ou iPhone, TalkBack no Android. Percorra por títulos, preencha um formulário com erro, abra um diálogo. Se não puder rodar, escreva "leitor de tela não verificado".
5. **Sem cor:** veja a tela em tons de cinza. Toda situação continua distinguível?
6. **Alto contraste:** modo de alto contraste do Windows (`forced-colors`). Borda feita com `box-shadow` some.
7. **Movimento reduzido:** ative no sistema. Nada se move sozinho.
8. **Linguagem:** leia em voz alta. Alguém sem familiaridade entende na primeira leitura?

## Linguagem simples

Frase curta, voz ativa e palavra do dia a dia. Botão com verbo e objeto ("Marcar horário"). Evite sigla sem explicação. Nunca mostre código de erro. Diga o que aconteceu e o que fazer. Para público com letramento variado, use ícone e texto juntos, e teste com alguém do público.
