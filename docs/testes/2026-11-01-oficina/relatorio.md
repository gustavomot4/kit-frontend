# Teste de usabilidade: site de uma oficina de bairro

Em 01/11/2026, um agente (Claude Opus 5.5, no Claude Code) seguiu o kit 3.1.0 num projeto novo: uma oficina de carros e motos sem marca, com identidade em vermelho e preto e site institucional. O dono fez o papel de quem não tem nada e respondeu às perguntas. O kit levou do pedido ao site aprovado sem nenhuma reprovação. As falhas achadas viraram a versão 3.2.0.

## Números

| Medida | Valor |
| --- | --- |
| Caminho | Projeto sem telas: etapas 1 a 7. A etapa 8 não foi acionada |
| Decisões do dono | 3 portões e 7 respostas em 2 rodadas de perguntas |
| Reprovações | 0 |
| Tempo | 22 min até o brief, 41 min até a direção e 18 min até o site, contando a espera pelas respostas |
| Arquivos do kit lidos | 21 de 185, cerca de 28 mil tokens (estimado). Nenhum de `estilos/` |
| Verificador | 17 rodadas em 7 páginas. 5 falhas: 4 reais e 1 falso positivo |
| Escolha cega | 2 agentes, de 2,5 a 3 min cada. Os dois apontaram a B, e o dono escolheu a A |
| Contexto da sessão | De 72 mil para 459 mil tokens, com 38 imagens lidas |

## O que funcionou

- **Perguntas para quem não tem marca.** Com 7 respostas de múltipla escolha, saíram tipo de oficina, diferencial, nome, promessa e jeito. O brief foi confirmado sem ajuste.
- **Portões.** `design/correcoes.md` terminou vazio.
- **Verificador.** Achou foco escondido atrás do nome gigante, título estourando a tela em 1440px e rolagem lateral em 320px.
- **Crítica da escolha cega.** "Serviria para um dentista" e "nada ali tem graxa" viraram a porca no logo e o orçamento como mensagem, na direção que perdeu o voto.
- **Leitura sob demanda.** O tamanho do kit não pesou.
- **Linha da VLibras.** Funcionou como documentado.

## O que falhou e o que mudou na 3.2.0

| Problema | Mudança |
| --- | --- |
| VLibras, altura de 480px e hover só eram lidos depois das direções | Bloco "Vale desde a primeira tela" no `SKILL.md` |
| `surdos-libras` ficou fora de `publicos:`, por achar que exigia vídeo | Modelo de `PRODUTO.md` e `publicos.md` dizem que a base é só o botão |
| Logo sem lugar no processo; `logotipo.py` não tinha kerning, outros eixos nem símbolo | 3 opções na etapa 4, mostradas no portão da etapa 5. `logotipo.py` com `--eixo`, kerning, `--ajuste`, `--simbolo` e `--variantes` |
| Site institucional: "não a home" e estados de sistema que a página não tem | Caminho próprio no `SKILL.md`, `identidade.md` e seção "No processo do kit" em `landing.md` |
| Nada para apresentar ao dono; o agente escreveu dois scripts à parte | `scripts/prancha.mjs`, que gera HTML e PDF |
| Capturas com barra de rolagem e barra fixa no meio da página inteira | `verificar.mjs` esconde as duas nas capturas e devolve as camadas depois |
| G08 passou com o texto parando na metade da tela: mede a caixa do bloco | `g-colado-a-esquerda` mede onde o texto termina |
| Logo em curvas reprovado como ícone sozinho, com `pouca-leitura` | `a11y-icone-sem-texto` aceita imagem larga com nome |
| Logo sumiu em alto contraste, sem nenhum alerta | Novo aviso `a11y-logo-alto-contraste` e receita em `acessibilidade.md` |
| Link duplicado e botão repetido passaram | Novo aviso `g-acao-repetida` |
| `medir-referencia.mjs` mediu por cima de aviso de cookies | Avisa quando uma camada cobre a dobra, ordena títulos por tamanho e mede a maior imagem |
| Valores fora do `DESIGN.md` passaram | `scripts/conferir-tokens.mjs`, para cor e fonte |
| `paleta.mjs` aceitou `--escuro` e gerou tema claro | Opção desconhecida agora é erro, também em `medir-referencia.mjs` |
| `a11y-so-cor` apontou marcadores com forma própria | Cada cor com forma própria não é apontada |
| Aviso sem saída sobre espaço de foto já conferido | `data-conferido="a11y-contraste-imagem"` |
| Manual pedia tela real antes de ela existir | Aplicações saem depois da tela-modelo |
| A mesma página gerava as pastas `index` e `index-html` | O nome agora é o mesmo por arquivo e por endereço |
| Margem para a VLibras sem receita | Botão medido em `midia-e-libras.md`: 40 × 40px, a 10px da borda. `position: 'L'` funciona; `'BR'` e `'TR'` não mudaram o lugar |
| Imagens pesam no contexto, e a escolha do dono não tinha onde ficar | Regra na etapa 7, e linha `escolha` em `design/correcoes.md` |

## Erros do agente, não do kit

- Não fez à mão teclado, letra do navegador em 200% nem movimento reduzido, e não abriu a prancha completa. O relatório agora pede cada item do roteiro como feito ou não feito.
- Disse que vermelho e preto são comuns em oficinas sem olhar nenhum concorrente. `criar-marca.md` e a conduta agora cobram isso.
- Não pediu os sites de referência nem fez as perguntas abertas de `perfil.md`. Nada mudou no kit por isso.

## Limites

Um projeto só, relatado pelo agente que o fez. O dono estava testando o kit e respondeu em poucas palavras: zero reprovação não mede qualidade. Não houve pessoas do público, leitor de tela real, site publicado nem comparação com o mesmo pedido feito sem o kit. `estilos/` e os padrões de lista, formulário, painel e agenda não entraram.
