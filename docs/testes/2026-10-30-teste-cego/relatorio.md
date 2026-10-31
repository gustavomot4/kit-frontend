# Teste cego do kit: 30/10/2026

**Pergunta:** o kit faz um agente novo entregar algo melhor do que entregaria sem ele?

**Método:** dois subagentes Sonnet novos, sem acesso a esta conversa, receberam o mesmo pedido, escrito como o dono escreveria: a tela principal de um sistema para a marmitaria da tia, em HTML e CSS, com "decide você e segue". O pedido não cita o kit. Um trabalhou numa pasta com o kit instalado; o outro, numa pasta vazia. Conferi os dois com o mesmo verificador, por conta própria. Veja a [prancha](comparacao.png).

## Resultado

| | Sem o kit | Com o kit |
| --- | --- | --- |
| Entrega | 1 tela final, com formulário de novo pedido | `PRODUTO.md` e 3 direções; cortado pelo limite de uso durante a tela-modelo |
| Alternativas para escolher | 0 | 3, com composições diferentes |
| Falhas no verificador | 0 | 0, 0 e 0 |
| Avisos no verificador | 7 | 1, 2 e 1 |
| Painel de quatro números no topo | Sim | Não |
| Cartão dentro de cartão, borda colorida à esquerda | Sim | Não |
| Palavras na primeira dobra | 221 | Entre os limites na A e na C; 262 na B |
| Vindo do mundo do produto | Agrupar por entregador | Agrupar por entregador; número de tampa escrito a caneta; sacolas |
| Premissas registradas | Na mensagem final | Em `PRODUTO.md`, separando o que não sabia |
| Fonte | Segoe UI, do sistema | Corbel, Trebuchet e Verdana, do sistema |
| Tokens de saída | 94 mil | 128 mil, sem ter terminado |
| Maior contexto | 167 mil tokens | 275 mil tokens |

## Veredito do dono

Perguntado qual tela aprovaria sem pedir refação, ele respondeu "uma com o kit" e, depois, a direção **A, Conversas**. A avaliação não foi cega: a prancha dizia de que lado cada tela vinha, e o kit é dele. Falta repetir com as telas sem identificação.

A escolha ensina duas coisas. A primeira é que ter opções funcionou: a tela aprovada não era a que o agente sem o kit fez. A segunda é que a identidade forte não decidiu: ele preferiu a direção mais familiar à que tinha a assinatura mais marcante, a B. O motivo não foi dito.

## O que o teste mostra

- **O processo pegou sem ninguém pedir.** O agente abriu o `CLAUDE.md`, seguiu para a skill, escreveu `PRODUTO.md`, gerou as direções, rodou o verificador, olhou as capturas e corrigiu sozinho.
- **O kit não é o que evita falha de acessibilidade básica.** Sem ele, o Sonnet também zerou as falhas automáticas. Isso desmente uma suposição do kit.
- **A diferença está em identidade e decisão.** Com o kit há três caminhos para escolher, menos elementos genéricos e detalhes tirados do setor.
- **O kit custa mais.** Pelo menos 36% mais tokens de saída, e o contexto foi 1,6 vez maior, sem ter terminado.

## Falhas do kit reveladas, e o que foi feito

| Falha | Correção | Testada de novo? |
| --- | --- | --- |
| Agente leu tudo no início, inclusive o código dos scripts | `SKILL.md` manda ler só o que a etapa pede e rodar os scripts sem abrir | Não |
| Com "decide você e segue", avançou para o código sem `DESIGN.md` | Regra de dono ausente: segue com a recomendação, marca como provisória, `DESIGN.md` vem antes | Não |
| Fontes do Windows nas capturas, que não existem no Android, o aparelho principal da dona | Regra em `references/marca/identidade.md` e aviso `g-fonte-nao-servida` no verificador | O aviso, sim, em teste automático e nas quatro telas |

## Limites

- Uma rodada só, de um modelo, num produto. É indício, não prova.
- O agente com o kit foi cortado pelo limite de uso: a comparação é de direções contra uma tela final. Não existe tela final com o kit.
- O kit testado ainda não tinha `references/marca/criatividade.md` nem `references/recursos/bibliotecas.md`. Essas partes **não foram testadas**, e nenhum dos dois agentes tinha imagem real: a principal lição dos sites admirados não aparece aqui.
- Os subagentes foram instruídos a ler o `CLAUDE.md`, como um agente faz ao abrir um projeto. Uma sondagem do Claude Code confirmou que a skill aparece na lista, mas a autenticação da linha de comando estava expirada e não deu para ver o disparo automático.
- Cursor, Copilot, Codex e Gemini CLI não foram testados.
- Sem celular real, leitor de tela ou pessoas do público. Quem avaliou também escreveu o kit: o juízo que vale é o do dono.
