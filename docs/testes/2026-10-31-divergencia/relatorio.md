# Ritual de divergência, 31/10/2026

**Pergunta:** o kit consegue obrigar o agente a divergir antes de escolher, sem depender do próprio autor para julgar?

**Origem:** mudança 3 da [auditoria](../../auditorias/2026-10-31/relatorio.md). Ali, a recomendação foi escrita antes de existir qualquer direção, as três direções da queijaria eram a mesma página com outra pele, e nenhum agente olhou concorrente ou referência.

## O que mudou

| Peça | O que faz |
| --- | --- |
| `assets/modelos/ideias.md` | A primeira ideia, duas referências de fora do setor com a medida, e os conceitos. No máximo um conceito parte da primeira ideia |
| `scripts/escolha-cega.mjs` (`kit escolha`) | Só avança com `ideias.md` preenchido e direções diferentes. Sorteia rótulos, gera as imagens, guarda a chave fora do pacote e escreve o pedido para um agente novo |
| `scripts/comparar-direcoes.mjs` | Acusa a mesma ideia: título igual e 60% ou mais das seções na mesma ordem |
| `scripts/conferir-marca.mjs` | Avisa quando nenhum concorrente foi olhado de verdade |
| `SKILL.md` e `references/marca/identidade.md` | Etapa 3 com o ritual. Quem fez não recomenda. Dois agentes novos escolhem, e discordância é empate |

## O que o teste mostrou

### Comparador, em conjuntos reais

| Conjunto | Título | Seções em ordem | Resultado | Esperado |
| --- | --- | --- | --- | --- |
| Queijaria (auditoria) | Igual | 75% | Reprova 3 de 3 pares | Reprova |
| Guincho (auditoria) | Igual | Até 20% | Passa | Passa |
| Marmitaria (teste cego) | Igual | 0% | Passa | Passa |
| Barbearia (calibração) | Muda | 0% | Passa | Passa |
| `ferramentas/fixtures/direcoes-iguais` | Igual | 100% | Reprova | Reprova |
| `ferramentas/fixtures/direcoes-mesma-ideia` | Igual | 100% | Reprova, sem acusar a composição | Reprova |

O comparador antigo declarou que as direções da queijaria "diferem". Agora, elas nem chegam à escolha. É só um conjunto real positivo: o limite de 60% ainda é palpite.

### Escolha cega, com dois agentes novos

Usei as [três direções](direcao-a.png) do guincho da auditoria. O agente com o kit tinha escolhido a [B, a rodovia](direcao-b.png).

| Rodada | Escolha | Margem | O que decidiu |
| --- | --- | --- | --- |
| [1](escolha-rodada-1.md) | [C, o pátio](direcao-c.png) | Leve | A faixa da rodovia, com 22 marcas e legenda, é o "mapa cheio de alfinetes" que o `MARCA.md` recusa |
| [2](escolha-rodada-2.md) | B, a rodovia | Leve | Coluna "Falta" e trecho "14 km · 12 min" na própria estrada. Também aponta os 22 marcadores como problema |

Três lições:

- **Um juiz só é ruído.** Dois agentes novos, com o mesmo pedido, escolheram direções diferentes. Por isso o kit pede dois e trata discordância como empate. As duas respostas rejeitaram a A, a fila, e isso já é informação.
- **A marca e a escolha do autor estavam em conflito.** O `MARCA.md` diz que o produto nunca seria "um mapa cheio de alfinetes", e o autor escolheu uma faixa com 22 marcas. Os dois agentes apontaram isso, sem combinar. O autor não apontou.
- **Os agentes acharam falhas no pacote.** A primeira rodada mostrou que a marca ficava visível antes de olhar as imagens: agora ela está em `etapa-2.md`. A segunda mostrou que imagem de celular muito alta chega ilegível: agora a página é cortada em pedaços. A rodada 2 já teve a marca separada, mas nenhuma rodada usou as imagens cortadas.

Cada escolha gastou cerca de 83 mil tokens de contexto e 100 segundos, com Sonnet.

## Contradições resolvidas

| Id | Antes | Agora |
| --- | --- | --- |
| Fonte | `identidade.md` aceitava fonte do sistema com motivo e dizia que fonte instalada não é identidade | A pilha genérica (`system-ui`) vale com motivo. Fonte instalada com nome próprio não é identidade, mesmo com motivo, e `g-fonte-nao-servida` não some mais |
| M1 | Pedido de marca pulava a etapa 3, mas o kit de identidade só vinha depois da direção | Etapas 1 a 4 |
| M2 | `SKILL.md` pedia o kit inteiro sempre; o brief curto pedia só logotipo, cor e fonte | Kit "no tamanho do brief" |
| M3 | O modelo trazia título de 2rem e raios de 8 e 12px, que o kit chama de genéricos | Campos a preencher, vindos do conceito |

A correção da fonte muda o que escrevi no [relatório anterior](../2026-10-31-correcoes-verificador/relatorio.md): o motivo com premissa não dita no pedido, na central com kit, não silencia mais esse aviso. Ela segue com 0 falhas e 2 avisos.

## O que isto não resolve

- **O ritual completo não rodou nesta rodada.** O `ideias.md` do teste foi [preenchido por mim](ideias-do-teste.md), depois das direções prontas. Rodou no [teste seguinte](../2026-10-31-ritual-completo/relatorio.md).
- **A ordem não é garantida.** O script vê se a primeira ideia está escrita, não quando foi escrita. O teste seguinte confirmou isso, e por isso ela ganhou arquivo próprio, com a data conferida. Um agente ainda pode recomendar por fora.
- **A medida pode ser contornada.** Basta uma captura qualquer, ou escrever "erro" no campo.
- **Empate sem dono continua fraco.** Com o dono ausente, o autor escolhe uma das duas e registra. É melhor que antes, não é julgamento externo.
- **Agente sem como chamar outro agente** fica com "escolha sem juízo externo". Isso é um aviso escrito, não um bloqueio.
- **Juízes são LLMs.** Podem ter o mesmo gosto de quem gerou. Isto não substitui a banca da auditoria nem pessoas.
- **O limite está no fim.** O prompt único tem 29.974 tokens, de 30 mil. Cortei texto para caber, e a próxima mudança de texto exige cortar mais ou decidir subir o limite.
- **`kit empacotar` falhou duas vezes nesta rodada** ao gravar `dist/prompt-unico.md`, com erro de escrita do Windows. Repetir resolveu. Não investiguei a causa: uma das rodadas de teste correu sobre um `dist/` desatualizado, e por isso foi descartada e repetida.

## Comandos

| Comando | Resultado |
| --- | --- |
| `node bin/kit.mjs empacotar` | Saída 0, depois de repetir |
| `node ferramentas/validar.mjs` | Saída 0 |
| `node ferramentas/testar.mjs` | 34 de 34 passam |
