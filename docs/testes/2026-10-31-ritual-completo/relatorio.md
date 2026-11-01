# Ritual completo com um agente novo, 31/10/2026

**Pergunta:** um agente novo segue a etapa 3 nova até a tela final? A primeira ideia perde a corrida?

**Método:** um subagente Sonnet 5.5 novo, com o kit instalado numa pasta própria, recebeu um pedido escrito como o dono escreveria, com "decide você e segue": a página de uma funerária de família. Escolhi esse setor porque o cartaz gritante seria o erro mais visível. Como subagente não cria outro agente, ele parou na escolha cega. Entreguei o pedido a dois agentes novos, um de cada vez, e devolvi as respostas para ele terminar. Não houve versão sem kit: isto testa o ritual, não a comparação.

## O que aconteceu

| Passo | Resultado | Prova |
| --- | --- | --- |
| Primeira ideia | Escrita, e é a média do setor: "verde-sálvia, título em letra com serifa, uma flor ou pomba em traço fino, a frase 'Estamos ao seu lado neste momento'" | [ideias.md](ideias.md) |
| Ordem | **Falhou.** O arquivo foi escrito depois de medir referências e baixar fontes | Transcript: medições nas linhas 131 e 135, fontes nas 150 e 157, `ideias.md` na 161 |
| Referências | Tentou Nubank, Einstein (bloqueou), NHS e 99. Citou Nubank e NHS. Dois dos quatro sites já estão no kit | `ideias.md` e capturas do projeto |
| Três direções | Diferentes de verdade: HTML de 6 a 10%, composição de 13 a 25%, cor de 0 a 44% | `comparar-direcoes` |
| Recomendação | Nenhuma antes da escolha, no que o agente escreveu | Transcript |
| Chave do sorteio | Aberta só depois das duas respostas | Transcript: na linha 344 ela é só citada numa nota; na 356 é aberta |
| Escolha cega | Os dois escolheram a B, com margem leve | [escolha 1](escolha-1.md), [escolha 2](escolha-2.md) |
| Tela final | 0 falhas e 0 avisos no verificador; o agente diz ter aplicado o que os dois pediram | [computador](tela-computador.jpg), [celular](tela-celular.jpg) |

## A primeira ideia perdeu

| Direção | Origem | Rodada 1 | Rodada 2 | O que os juízes disseram |
| --- | --- | --- | --- | --- |
| [A, casa do bairro](direcao-a.png) | **Primeira ideia** | Segunda | Segunda | Parece "página de plano de saúde ou clínica": limpa, mas intercambiável |
| [B, o caminho](direcao-b.png) | Mundo do produto e NHS | **Escolhida** | **Escolhida** | "Comece pela ligação. A gente mostra o resto": conduz, com calma e peso de casa de família |
| [C, o número é a casa](direcao-c.png) | Nubank: título gigante, cor em área grande | Atrás | Bem atrás | Serviria a "chaveiro 24h, guincho, desentupidora": passa alarme |

- **A primeira ideia perdeu, por margem leve.** É um caso, com dois juízes LLM. Mostra que a corrida existe, não que sempre dá nisso.
- **A receita de cartaz perdeu com folga.** A direção C aplica o que `references/marca/criatividade.md` manda: é o achado G1 da auditoria visto de perto. Sem a escolha cega, nada a barraria.
- **Desta vez os juízes concordaram,** ao contrário do guincho. Ainda não há base para dizer com que frequência isso ocorre.

## O que a mudança trouxe de novo, e o que não

A tela final tem cara e tom diferentes das duas da auditoria: vinho, serifa, nada de caixa alta ou título de 160px. Mas a assinatura repete um gesto: **linha com marcos**. A queijaria tem o eixo da cura, o guincho tem a rodovia, a funerária tem o caminho com paradas. São 3 de 3. A família de que a auditoria falou passou da pele para a ideia.

**Hipótese:** o kit pede um elemento funcional e a "unidade real do trabalho" (`references/marca/identidade.md:19,29`), e um agente LLM responde a isso desenhando um eixo. Precisa de mais rodadas para confirmar.

## Custo

| | Saída | Maior contexto | Tempo |
| --- | --- | --- | --- |
| Este agente, até a tela final | 144 mil tokens | 346 mil | Cerca de 25 min |
| Cada juiz cego | | Cerca de 98 mil | Cerca de 105 s |
| Queijaria com kit, na auditoria | 141 mil | 316 mil | 23 min |
| Guincho com kit, na auditoria | 152 mil | 302 mil | 25 min |

O ritual não custou muito mais ao agente, numa amostra pequena. Os dois juízes são um custo novo.

## Falhas expostas, e o que mudou depois

A versão testada é a de antes destas correções. **Nenhuma delas rodou com um agente novo gerando telas.** Elas passam nos testes automáticos, e `escolha-cega` agora recusa este próprio projeto.

| Falha | Correção |
| --- | --- |
| Primeira ideia escrita depois das referências | Arquivo próprio, `primeira-ideia.md`. O script recusa se alguma direção ou captura de referência for mais antiga que ele |
| Referências tiradas do repertório do próprio kit | O script recusa os sites citados em `criatividade.md` |
| Barra fixa no meio da captura cobria texto, e os juízes não leram trechos | Camadas fixas saem das capturas de página inteira, e o celular ganha a primeira dobra própria |
| `conferir-marca` não avisou: a marca não tinha tabela de concorrentes | Agora avisa sempre que há espaço livre sem nenhum concorrente olhado |

## O que continua aberto

- **A data do arquivo pode ser burlada,** com `touch` ou reescrevendo a medida. É atrito, não garantia. E pode errar para o outro lado: no Windows, copiar um arquivo mantém a data original.
- **Mudar só o título escapa do comparador:** A e C têm 75% das seções em ordem e passaram, porque o título muda.
- **Sem controle e sem pessoa.** Não sei se esta tela é melhor do que o mesmo agente faria sem o kit, nem se um diretor de arte a aprovaria. Os juízes são LLMs.
- **Possível falso alarme em `a11y-letra-200` (hipótese):** o agente registrou que o verificador aumenta a letra pelo `font-size` do `html`, o que não muda media queries em `rem`, como faria o navegador de verdade. Não conferi.
- **O kit manda baixar fonte e abrir sites de terceiros sem perguntar.** Neste teste, o agente rodou `npm pack` de fontes OFL e mediu Nubank, Einstein, NHS e 99. Ele avisou que ninguém tinha aprovado o download. Em projeto real, isso pede uma regra.

## Comandos

| Comando | Resultado |
| --- | --- |
| `node bin/kit.mjs empacotar` | Saída 0; prompt único com 29.978 tokens, de 30 mil |
| `node ferramentas/validar.mjs` | Saída 0 |
| `node ferramentas/testar.mjs` | 34 de 34 passam |
