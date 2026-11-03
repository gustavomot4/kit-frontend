# Teste real no Codex, 31/10/2026

**Pergunta:** o kit funciona num projeto novo, em outro agente, sem ninguém explicar nada?

**Método:** o dono instalou a versão 3.1.0 numa pasta vazia e pediu ao Codex (gpt-6.1-sol) um comércio eletrônico para uma loja de roupas real da família. Depois, li a conversa, reabri as três propostas no navegador e rodei o verificador e medições próprias. O nome da loja fica fora deste repositório.

**Até onde foi:** etapas 1 a 3 de 8. O agente parou no portão de escolher a proposta, como o kit manda. As etapas 4 a 8 seguem sem teste.

## O que funcionou

| O que | Evidência |
| --- | --- |
| Outro agente acha a skill só pelo `AGENTS.md` | Leu `SKILL.md` na primeira ação |
| Portões | Parou na marca e nas direções, e só seguiu depois da resposta |
| Perguntas | 4, cada uma com recomendação |
| Consumo de contexto | Cerca de 29 mil de 196 mil tokens vieram de leituras que citam o kit, em 16 arquivos abertos conforme a etapa |
| Relato | Disse o que não testou, marcou personas como hipótese e fotos como geradas por IA |
| Verificador na primeira rodada | Pegou dois problemas reais, que o agente corrigiu |

## O que falhou

As três propostas saíram com 0 falhas e 1 aviso, e estavam com o catálogo quebrado.

| Problema | Medida | Por que passou |
| --- | --- | --- |
| Fotos do catálogo em tira | 1402px de altura nas três; 145px de largura na C no computador; de 115 a 165px no celular | `height` no HTML sem `height:auto` no CSS. O verificador não media, e as capturas paravam na primeira dobra |
| Três propostas quase iguais | HTML de 77 a 84% igual, composição de 52 a 68%, 97% do CSS comum | Gerador e folha de estilo únicos. Nada no kit media a diferença |
| Marca real fora | O perfil é preto, com símbolo trabalhado e nome em caixa alta. As três têm fundo claro e um símbolo redesenhado | O logo ficou como pendência, sem pedido à pessoa |
| Sem Libras | Uma linha de script | Era só aviso, e o kit aceita aviso explicado |
| Letras coladas no título | −0,075em na B, em projeto com `dislexia` e `pouca-leitura` | Não era medido |
| Página pesada | De 5,6 a 7,3 MB no celular | Não era medido |
| `verificar --help` | Virou uma tela: auditou a página de erro do Chrome e relatou 4 falhas falsas | O script não conferia o alvo |

Outros pontos ficaram abertos: `Escolher tamanho` repetido em cada peça, 3 paradas de Tab por produto, catálogo com só 3 peças e busca sem tolerância a erro de digitação.

## O que mudou no kit

| Mudança | Antes | Depois, nas três propostas |
| --- | --- | --- |
| Foto cortada ou esticada (`q-foto-cortada`, `q-foto-deformada`) | Não media | Falha |
| Peso (`q-pagina-pesada`: 2 MB avisa, 5 MB reprova) | Não media | Falha |
| Letras apertadas (`a11y-letra-apertada`) | Não media | Falha, por causa dos públicos listados |
| Libras em site público com `surdos-libras` | Aviso | Falha |
| Página inteira (`desktop-inteira.jpg`, `celular-inteira.jpg`) | Só a primeira dobra | Guardada, e o `SKILL.md` manda olhar |
| Alvo inválido | Falhas falsas | Sai com código 2 e diz o que não achou |
| `scripts/comparar-direcoes.mjs` | Não existia | 3 de 3 pares quase iguais |
| Marca existente | Sem regra para o logo | Pedir o arquivo no portão 2; sem ele, nome em texto; uma direção parte de como a marca aparece hoje |
| Direções | "HTML estático" | Arquivo próprio, sem gerador nem CSS comum |

De 0 falhas, as três passam a 4 falhas cada.

## Calibração

Limites do comparador: HTML igual a partir de 50%, composição a partir de 45%, CSS comum a partir de 50%, cor a partir de 95%.

| Conjunto | HTML igual | Composição | Resultado esperado | Resultado |
| --- | --- | --- | --- | --- |
| As três propostas deste teste | De 77 a 84% | De 52 a 68% | Reprova | 3 de 3 pares |
| `docs/testes/2026-10-30-calibracao/direcoes` | De 11 a 14% | De 21 a 32% | Passa | Passa |
| `docs/testes/2026-10-30-teste-cego/com-kit` | De 2 a 5% | De 22 a 31% | Passa | Passa |
| `ferramentas/fixtures/direcoes-iguais`: mesmo layout, outras classes, fontes e cores | 33% | De 96 a 98% | Reprova | 3 de 3 pares |

São poucos conjuntos, e a cor vê só o fundo pintado na primeira dobra: um par de direções diferentes deu 90%.

Nos 11 exemplos dos estilos e nas 3 direções da calibração, as checagens novas não acusaram nada. Continuam os mesmos 6 de 11 sem falha. `tela-boa.html` segue com 0 falhas e 0 avisos.

## Limites

- Escrevi as regras novas depois de ver estes defeitos. Elas pegam o que este teste mostrou; não provam cobertura geral.
- Os limites de peso e de espaçamento entre letras são decisão do kit, não norma.
- As regras novas de marca e de direções ainda não foram testadas com um agente novo. O teste só prova que o verificador e o comparador pegam as propostas antigas.
- `a11y-libras` só vê se o recurso está na página. Não julga a tradução.
- Nada foi testado com pessoas nem com leitor de tela real.
