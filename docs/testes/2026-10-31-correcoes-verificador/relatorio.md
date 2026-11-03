# Correções baratas do verificador, 31/10/2026

**Pergunta:** os atalhos que a [auditoria](../../auditorias/2026-10-31/relatorio.md) provou estão fechados, sem acusar o que está certo?

**Método:** rodei `scripts/verificar.mjs` antes e depois em 19 alvos: as 4 telas da auditoria sem `DESIGN.md` nem `PRODUTO.md`, as 2 com kit com os próprios arquivos, 2 controles e os 11 exemplos dos estilos.

## O que mudou

| Correção | Antes | Depois |
| --- | --- | --- |
| Fonte citada só nos tokens do `DESIGN.md` | Sem aviso | Aviso. Só vale com o motivo na mesma linha, em "Do's and Don'ts" |
| `@font-face` só com `src: local()` | Contava como fonte servida | `g-fonte-nao-servida` |
| Herói dentro de `<header>` | Queijaria com kit: 0 palavras na dobra | 66 palavras. Fica fora da conta só o `header` sem `h1` |
| Creme, serifa e ferrugem escura | Queijaria sem kit: sem aviso | `ia-creme-terracota`. A claridade mínima caiu de 0,35 para 0,22 |
| `ia-numeracao` em identificador | Guincho com kit: "01, 03, 02" acusado | Sem aviso. Só conta corrida crescente de três |
| Foco dentro de shadow DOM | VLibras puro: falha `a11y-foco-invisivel` | Sem falha. O verificador agora entra no shadow DOM |
| Camada fixa sobre texto (`q-camada-sobre-texto`) | Não media | Aviso |

## Resultado

| Tela | Antes | Depois | O que mudou |
| --- | --- | --- | --- |
| Queijaria sem kit | 0 falhas, 3 avisos | 0 falhas, 4 avisos | `ia-creme-terracota` |
| Queijaria com kit | 0 falhas, 1 aviso | 0 falhas, 2 avisos | `q-camada-sobre-texto` |
| Guincho sem kit | 4 falhas, 12 avisos | 4 falhas, 12 avisos | Palavras na dobra: de 472 para 505 |
| Guincho com kit | 0 falhas, 3 avisos | 0 falhas, 2 avisos | Saiu `ia-numeracao`; palavras: de 237 para 247 |
| Mediana plantada | 0 falhas, 0 avisos | 0 falhas, 1 aviso | `g-fonte-nao-servida` |
| `tela-boa.html` | 0 falhas, 0 avisos | 0 falhas, 0 avisos | |
| 11 exemplos dos estilos | 6 sem falha | 6 sem falha | 5 ganham `q-camada-sobre-texto`; palavras mudam em 2 |

## A camada fixa

- **Como mede:** por cálculo, sem rolar a página. Camada no meio da tela conta em qualquer ponto da rolagem. Camada no topo ou na base conta só onde rolar não tira o texto de baixo. Faixa com 60% da largura ou mais continua com `a11y-camadas-fixas`.
- **Exemplos:** dos 5 exemplos com o aviso novo, conferi um, `sistema-clinica-conversa/hoje`: no fim da rolagem, o botão "Agendar" cobre a última linha. Os outros 4 não conferi um a um. Em `site-escola-idiomas/home` são 20 textos, o que pode ser ruído.
- **É aviso, não falha:** o texto no meio da página ainda pode ser lido ao rolar.

## Correção do diagnóstico da auditoria

O achado G9 propôs documentar o contêiner que um agente criou para o foco do VLibras. Estava errado. Testei a linha de `references/padroes/midia-e-libras.md` numa página pura: o botão já tem anel de foco próprio, dentro de um shadow DOM aberto, e o verificador só não enxergava lá dentro. A falha era falso alarme, e o contêiner não é necessário. A auditoria não foi reescrita, como pede `docs/CONTRIBUTING.md`: a correção fica registrada aqui.

## Exceção a uma regra do repositório

`AGENTS.md` diz que, se uma checagem pegar a fixture boa, se corrige a checagem. Aqui mudei a fixture, porque o defeito era dela: `tela-boa.html` usava `src: local("Georgia")`, o atalho que a correção fecha, sobre creme com serifa e ferrugem. Ela agora serve Public Sans, com a licença em `ferramentas/fixtures/fontes/`. O dono aprovou isso ao aprovar a mudança 8 da auditoria. A regra segue valendo para os outros casos.

## O que isto não resolve

- **Mediana continua passando.** A mediana plantada segue com 0 falhas e saída 0. O verificador é o piso, e isso só muda com a banca da auditoria.
- **Motivo falso passa.** A central com kit usa Bahnschrift e escreveu "porque o computador da central é Windows", o que o pedido não disse. O script confere se há motivo, não se ele é verdadeiro.
- **Regras escritas depois de ver os defeitos.** Pegam o que a auditoria mostrou; não provam cobertura geral.
- **Fora desta rodada:** desvio contra o `DESIGN.md` (G10) e as contradições M1 a M3. Medir desvio pede critério para `clamp()` e não é barato.

## Comandos

| Comando | Resultado |
| --- | --- |
| `node bin/kit.mjs empacotar` | Saída 0; prompt único com 29,6 mil tokens, de 30 mil |
| `node ferramentas/validar.mjs` | Saída 0 |
| `node ferramentas/testar.mjs` | 32 de 32 passam: eram 26, mais 7 novos, menos 1 trocado |
