# Criatividade: o que os sites admirados fazem

Referências do dono de 30/10 e 01/11/2026; interpretações do agente. Evidências em `docs/pesquisa/referencias-sites.md` e `docs/pesquisa/identidade-e-sistemas.md`, no repositório do kit. A síntese abaixo acompanha a instalação. Crie a expressão a partir de `MARCA.md`.

## Primeiro, a superfície

| Superfície | Exemplos | Expressão |
| --- | --- | --- |
| **Marca** | Landing, site, página de produto, abertura de app, jogo | Alta. Aplique tudo abaixo |
| **Trabalho** | Sistema, painel, cadastro, tela usada o dia inteiro | Contida. `references/gosto/perfil.md` manda (G01 a G03). Use uma ou duas ideias daqui, como escala no dado principal e o elemento-assinatura |
| **Tarefa curta** | Cadastro, pagamento, passo a passo | Baixa no meio do fluxo. Marca na abertura e na conclusão |

## Depois, o nível de expressão

Em superfície de marca, pergunte na etapa 1 quanto impacto a pessoa quer, mostrando um exemplo de cada nível. Registre a resposta em `expressao:` no `PRODUTO.md`.

| Nível | O que tem | Exemplo de recurso |
| --- | --- | --- |
| `sobrio` | Tipografia e cor decididas, imagem real, movimento só de transição | Título grande, foto do produto, nada animando sozinho |
| `marcante` | Elemento-assinatura forte, cor de marca em áreas inteiras, movimento que acompanha a rolagem | Números que contam ao entrar, imagens que se endireitam ao rolar |
| `espetaculo` | 3D, cena que reage ao mouse e à rolagem, trilho horizontal, transição de tela inteira | Objeto 3D na abertura, projetos que deslizam de lado |

Sem resposta, comece em `marcante`. Na rodada 1, ao menos uma direção fica um nível acima do pedido: errar para mais custa uma frase do dono; errar para menos custou uma rodada inteira em 13/11/2026 ("achei bem fraquinho o três, eu queria algo mais criativo que chocasse"). Se o dono reprovar as três por falta de impacto, a rodada 2 sobe um nível em todas.

## O que a primeira rodada ensinou

Observações de 30/10/2026, contextualizadas:

| Decisão | Referência e aplicação |
| --- | --- |
| Escala e peso | Nubank: 156px; C6: 100px, peso 300; Valorant: condensada pesada. Hierarquia com escala responsiva |
| Tipografia | Nubank, C6, Itaú, 99, iFood, Valorant e Fortnite têm fonte própria ou distinta. Epic, Hyper3D e Cequence mostram que fonte comum pode conviver com identidade |
| Cor e forma | 99: amarelo e imagens com cantos amplos; Valorant: cortes retos; Nubank: curvas. Defina papéis e motivos para cor e forma |
| Imagem | Nove dos onze usam foto, arte ou render com peso; CozyGPU repete desenho de linha; Hyper3D mostra resultado; Cequence, diagrama. Use material próprio ou licenciado |
| Mensagem e ritmo | Nubank e iFood Parceiros aproximam promessa e primeiro campo. Alterne composição conforme o conteúdo, com uma ação dominante e prova verificável |
| Tema | Jogos e ferramentas de criação da amostra usam escuro; bancos variam. Tema depende da superfície e do produto; trabalho segue G05 |

## Sete referências acrescentadas em 01/11/2026

Páginas públicas em 1280 × 720; base documental no Canva. Não é manual oficial das marcas.

| Referência | Como a identidade aparece | O que levar para um sistema |
| --- | --- | --- |
| [McDonald’s](https://www.mcdonalds.com.br/) | Speedee, amarelo, alimento e voz cotidiana | A abertura orienta retirada ou entrega; o cardápio muda a composição e preserva os sinais |
| [Burger King](https://www.burgerking.com.br/) | Flame, creme e marrom; letras volumosas e fotos do alimento | A personalidade continua nos nomes e cartões do cardápio, além da campanha |
| [Canva](https://www.canva.com/) | Criações variadas dentro de uma casca estável | Deixar o conteúdo variar e manter controles, hierarquia e espaçamento consistentes |
| [Globoplay](https://globoplay.globo.com/) | Fundo escuro, capas e curadoria por assunto | Fileiras repetem proporções e navegação; categorias mudam a seleção. A arte do destaque não carregou |
| [Netflix](https://www.netflix.com/br/) | Arte, fundo escuro e vermelho nas ações | Landing e ficha pública mantêm atmosfera, mas oferecem informações diferentes para decidir |
| [Mercado Livre](https://www.mercadolivre.com.br/) | Cabeçalho amarelo, área neutra e ação azul | Busca persiste; filtros e cartões dão ordem à comparação. Marca e ação podem ter cores diferentes |
| [Inter](https://inter.co/) | Citrina nos títulos, laranja e controles arredondados | Home e Conta PJ conectam assuntos diferentes por tipografia, imagem e ações |

O Canva documenta [tokens e variantes](https://www.canva.dev/docs/apps/app-ui-kit/design-tokens/) e a composição responsiva no [Easel](https://www.canva.dev/blog/engineering/adding-responsiveness-to-canvas-design-system/). O relato do [Hawkins, no Netflix Studio, de 2021](https://netflixtechblog.com/hawkins-diving-into-the-reasoning-behind-our-design-system-964a7357547) e a [entrevista sobre Andes publicada pela Figma](https://www.figma.com/customers/mercado-libre-scales-design-across-latin-america/) sustentam base compartilhada e composições específicas. Não comprovam a implementação atual de cada página observada.

## Da referência para as telas

1. Em `design/direcoes/ideias.md`, ligue **sinal observado → mensagem percebida → regra aproveitável → aplicação no produto**. Marque a interpretação. O repertório acima não substitui as duas novas referências de fora do setor.
2. Em `DESIGN.md`, registre o que se repete: papéis de cor, tipografia, tratamento de imagem, voz e formas. Separe marca, ação, foco e estados; evite valores isolados por tela.
3. Defina o que varia entre marca, trabalho e tarefa curta. Componentes compartilham tokens, variantes e estados; composições específicas ficam no domínio que as usa.
4. Na tela-modelo, confira a continuidade na navegação, no conteúdo e nos estados. Reuse essas regras nas telas seguintes e documente exceções. Uma campanha não define sozinha um sistema.

## Movimento e 3D

Quando o nível é `marcante` ou `espetaculo`, o movimento faz parte da identidade, não é enfeite. Regras de implementação e de acessibilidade estão em "Movimento" de `references/padroes/landing.md`; bibliotecas em `references/recursos/bibliotecas.md`.

- **O movimento conta a ideia.** No teste de 13/11, fitas do mural em 3D seguiam o mouse e davam lugar a um trilho com um projeto por tela. O movimento tem de vir do conceito da direção, como o elemento-assinatura.
- **Um efeito principal por página.** Abertura em 3D e trilho horizontal já bastam. Repetir a mesma entrada em todas as seções é clichê (`anti-generico.md`).
- **A foto da pessoa não é palco de efeito.** Zoom de tela inteira na foto do dono, com uma frase por cima, foi reprovado em 13/11: "tire esse zoom na minha foto". Movimento perto do rosto, só se ele pedir.
- **Mostre o movimento na escolha.** Capturas paradas escondem o que mais pesa. Rode `scripts/rolagem.mjs` em cada direção e leve os quadros ao dono e à escolha cega.

## O que não levar

Respeite o piso do kit. Evite:

- Logos, fontes proprietárias, textos e imagens de terceiros como ativos do produto.
- Banners cobrindo a tarefa, texto pequeno e movimento sem controle. Carrossel exige motivo, pausa e navegação acessível. Texto sobre imagem pede contraste calculado.
- Transferir densidade comercial ou efeitos de campanha para telas de trabalho.

## Como usar nas três direções

Em superfície de marca, cada direção tem hierarquia e recursos visuais com propósito que continuam nos componentes. Escala, área de cor e tema dependem de `MARCA.md` e da tarefa. Confira identidade e clichês em `references/marca/identidade.md` e `references/marca/anti-generico.md`.

Identidade exigente não dispensa o piso: contraste, foco, teclado, zoom e movimento reduzido continuam valendo.
