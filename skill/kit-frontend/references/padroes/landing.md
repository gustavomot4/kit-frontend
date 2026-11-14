# Landing e site institucional

**Quando:** página de apresentação de produto ou empresa. É onde a cara de IA mais aparece e onde a identidade pode ir mais longe. Leia junto `references/marca/criatividade.md`, que traz o que os sites admirados fazem: esta ficha cuida do que precisa funcionar; aquela, do impacto. O estilo `base-design-system` é sóbrio de propósito e não serve como padrão para landing de impacto.

## Regra

- **A primeira tela diz o que é, para quem e o que fazer.** Em 5 segundos, sem rolar. Título concreto, do setor, com a palavra que o cliente usaria. (G01)
- **Herói vem do assunto:** o produto real, o lugar real, o resultado real. Nada de captura flutuando em perspectiva nem blob.
- **Só o que convence.** Cada bloco sustenta, com prova, uma crença de quem vai decidir (`references/marca/conteudo.md`), sem perguntar ao leitor o que ele quer. Sem contador de vaidade e sem logos de quem não é cliente. Depoimento só real, com nome e resultado.
- **Uma ação principal, repetida no fim.** Negócio local: telefone, WhatsApp e endereço sempre à vista.
- **Ritmo:** troque composição entre os blocos: não repita a mesma grade de cartões. Texto de leitura com até 70 caracteres por linha.
- **Mobile primeiro de verdade:** mais de metade do público chega pelo celular. A primeira dobra é desenhada em 375px.
- **Desempenho é parte do design:** imagem principal com `fetchpriority="high"` e dimensões declaradas; `loading="lazy"` no resto; WebP ou AVIF; fonte com subconjunto. HTML vindo do servidor; conteúdo legível sem JavaScript.
- **Dados pessoais:** nenhum rastreador antes do aceite. Recusar pesa igual a aceitar. Aviso de cookies não bloqueia a página e não cobre o conteúdo em zoom alto.
- **Carrossel:** só quando indispensável, com pausa, sem autoplay fora do herói.
- **SEO local:** `title` e `description` únicos, HTML semântico, JSON-LD do tipo do negócio.

## Texto

O texto é argumento, com provas levantadas antes do brief. Siga `references/marca/conteudo.md`: inventário de provas, o que o público precisa acreditar e afirmação com prova, sem perguntas dirigidas ao leitor.

## Movimento

Para os níveis `marcante` e `espetaculo` de `references/marca/criatividade.md`. Vem do teste de 13/11/2026 (`docs/testes/2026-11-13-portfolio`, no repositório do kit).

- **A página funciona sem ele.** Todo o conteúdo está no HTML e legível sem JavaScript. Biblioteca que não carregar deixa a página parada, nunca vazia.
- **Movimento reduzido:** com `prefers-reduced-motion: reduce`, nada se move sozinho. Cena 3D num quadro só, trilho horizontal vira coluna, números já no valor final.
- **Peso no celular:** não baixe a biblioteca 3D quando a cena está escondida naquela largura. Confira se o elemento aparece antes do `import()`. No teste, isso levou a página de 1,2 MB para 0,6 MB. Em tela estreita, troque a cena por um desenho parado em SVG.
- **Trilho horizontal fixado na rolagem:** o foco do teclado precisa trazer o painel para a tela. Ao receber foco, leve a rolagem até o painel e zere o `scrollLeft` do contêiner com `overflow:hidden`, que o navegador mexe sozinho. `verificar.mjs` acusa `a11y-foco-fora-da-tela`.
- **Nada fica invisível esperando a rolagem.** Animação de entrada move, gira ou cresce; não parte de `opacity: 0`. Captura de página inteira, leitor de tela e quem rola rápido não podem perder conteúdo.
- **Tamanho real:** fixe o trilho só em tela larga e alta (por exemplo, a partir de 1025 × 600) e empilhe abaixo disso.
- **Biblioteca servida pelo projeto, com versão fixa,** como as fontes (`references/recursos/bibliotecas.md`).
- **Mostre e verifique:** `scripts/rolagem.mjs` captura a página em vários pontos da rolagem, com e sem movimento reduzido.

## No processo do kit

Vem do teste de 01/11/2026 (`docs/testes/2026-11-01-oficina/relatorio.md`, no repositório do kit).

- **A home é a tela principal** das três direções.
- **Estados da etapa 5.** Site estático não carrega dados. No lugar de carregando e sucesso, confira que tudo funciona sem JavaScript e que há página de erro (404) com saída para o início e para a ação principal. O vazio, quando existe, diz o que fazer.
- **Entrega mínima:** página de privacidade, SEO local, `og:image` com o endereço completo, ícone de aba e de celular. Dado do negócio que o dono não confirmou fica como "a preencher". Para a `og:image` (1200 × 630), monte uma página HTML com a marca e capture-a. PDF publicado, como currículo ou cardápio, segue a regra de dado pessoal de `references/marca/conteudo.md`.
- **Barra fixa no celular:** se ela traz a ação principal, tire o mesmo botão da primeira dobra (`g-acao-repetida`).
- **Foto que ainda não existe:** espaço do tamanho exato, listado em `design/midia.md`. Conferido o texto sobre ele, marque com `data-conferido="a11y-contraste-imagem"`.

## Como fugir do template

Comece pelo conteúdo real do negócio, nunca por seções de modelo. Mostre o que só essa empresa tem: o endereço, a foto real do espaço, o preço, o nome de quem atende. Use `references/marca/identidade.md` e dê à página um elemento que só exista nela.

**Verifique:** `g-muito-texto`, `ia-cards-iguais`, `ia-texto-cliche`, `a11y-camadas-fixas`. Teste a primeira dobra em 375px e a página em conexão lenta.
