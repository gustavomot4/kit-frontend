# Fase 1 do benchmark: medir para todos, 31/10/2026

**Pergunta:** depois das mudanças, o verificador aponta o que antes deixava passar, sem acusar a tela boa?

**Método:** duas páginas com defeitos plantados, hoje em `ferramentas/fixtures/`, rodadas antes e depois com `scripts/verificar.mjs`. Depois, os 11 exemplos dos estilos, para achar falso positivo em tela real.

## Portão da fase

| Grupo | Plantados | Antes | Depois | Portão |
| --- | --- | --- | --- | --- |
| Controles, já no escopo | 5 | 4 | 5 | 5 |
| Acessibilidade, fora do escopo | 17 | 0 diretos | 16 | 14 |
| Clichês visuais e de texto | 12 | 0 | 12 | 10 |
| `tela-boa.html` | Sem defeito | 0 falhas, 0 avisos | 0 falhas, 0 avisos | 0 e 0 |

O defeito que continua sem detecção é o gráfico separado só por cor. Ele fica para a prancha, porque pede olho. A situação só por cor virou aviso por heurística, e os pontos coloridos de legenda também disparam.

**Isto não prova cobertura geral.** Escrevi as regras depois de plantar os defeitos, então a sonda mede se as regras funcionam, não quantos problemas reais elas pegam. Um clone de cada clichê escrito de outro jeito pode passar.

## Falsos positivos achados nos exemplos reais

| Regra | Problema | Correção |
| --- | --- | --- |
| `ia-sombra-dura` | Lia o desfoque de sombra suave como deslocamento | Lê a partir da cor, sombra por sombra |
| `a11y-nome-visivel` | Reprovava cartão com muito texto cujo nome trazia a mesma informação | Basta o nome conter 60% das palavras visíveis |
| `a11y-clique-sem-semantica` | Acusava maquete marcada com `aria-hidden` | Ignora o que está fora da árvore de acessibilidade |
| `a11y-foco-contraste` (antiga) | Media o anel de campo invisível, com opacidade 0 | Só mede o que é pintado |
| `verificar.mjs` (antigo) | Não abria arquivo com `?` no endereço, no Windows | Tira a consulta do nome da pasta |

## Calibração do índice de legibilidade

Rode com `node docs/testes/2026-10-31-fase-1/calibrar.mjs`.

| Grupo | Textos | Faixa do índice |
| --- | --- | --- |
| Fácil: instruções do dia a dia | 5 | De 66 a 89 |
| Médio: notícia, site, aviso | 4 | De 18 a 72 |
| Difícil: lei, contrato, termos | 4 | De −86 a −4 |

Limites adotados: abaixo de 10 em qualquer tela; abaixo de 50, ou frase média acima de 25 palavras, com `pouca-leitura` ou `cognitivo`.

Os textos foram escritos ou escolhidos por mim, e são poucos. A constante 248,835 foi deduzida de fontes secundárias. O índice mede palavra e frase longa, não sentido: texto curto e confuso passa.

## VLibras

Abri uma página com a linha de script da documentação, no Chrome: o botão apareceu na borda direita, e o script baixou arquivos de `vlibras.gov.br` e `cdn.jsdelivr.net`. Não medi a qualidade da tradução, o nome acessível do botão nem o uso com leitor de tela.

## Limites

- Sem teste com pessoas surdas, cegas, daltônicas ou com pouca leitura, e sem leitor de tela real.
- As fichas de `publicos.md` e `midia-e-libras.md` ainda não passaram por um agente novo nem por um produto real.
- A simulação de visão é do Chrome e gera imagem para olhar. O veredito continua humano.
- Os exemplos foram medidos em 1440 × 900, 768 × 1024, 375 × 812 e 320 × 256. Em `app-tarefas-acessivel`, também nos temas escuro e de alto contraste.
