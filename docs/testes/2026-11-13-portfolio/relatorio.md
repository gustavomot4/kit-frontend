# Teste real: portfólio pessoal de um desenvolvedor de IA

Em 13/11/2026, um agente (Claude Opus 5.5, no app desktop do Claude Code) usou o kit 3.2.0, instalado em `.agents/skills/kit-frontend`, para criar e publicar o portfólio de um desenvolvedor que hoje trabalha com LLMs e agentes. O próprio dono do kit era o cliente. O site foi publicado no GitHub Pages no mesmo dia.

O ponto principal: **o kit acertou o processo e a qualidade técnica, mas errou o nível de expressão e não tinha nada para o conteúdo.** As quatro reprovações do dono foram por falta de impacto (duas) e por texto que não vendia (duas). Nenhuma foi por acessibilidade, responsividade ou bug que o verificador deixou passar.

## Números

| Medida | Valor |
| --- | --- |
| Caminho | Site novo: etapas 1 a 5, depois publicação. A etapa 8 foi acionada 4 vezes |
| Decisões do dono | 6 respostas de múltipla escolha nas etapas 1 e 2, 4 portões e 2 autorizações (publicar o site e o README do perfil) |
| Reprovações | 4: rodada 1 inteira ("fraquinho"); efeito na foto e conteúdo ("o conteúdo não vende"); seção de perguntas ("meio forçado"); e, antes delas, a promessa da marca ("não se prenda a backend") |
| Direções | 6 em duas rodadas, mais 1 fusão. A fusão passou por 3 versões de conteúdo até a aprovação |
| Verificador | Mais de 30 rodadas em 10 arquivos. Falhas reais achadas: 8. Falsos positivos e avisos repetidos sem ação possível: 3 tipos |
| Escolha cega | 4 avaliadores, de 1,5 a 3 min e de 110 mil a 170 mil tokens cada. Rodada 1: empate (B e C), e o dono reprovou as três. Rodada 2: os dois apontaram a D, e o dono pediu a fusão D com E |
| Arquivos do kit lidos | 16, alguns só em parte |
| Scripts escritos fora do kit | 3: quadros de rolagem, foco no trilho horizontal e PDF do currículo (em `scripts/`) |
| Resultado | Site em https://gustavomot4.github.io/: 0 falhas nas 3 páginas, 0,5 MB no celular, fontes e bibliotecas servidas pelo próprio site |

## O que funcionou

- **Portões e direções em HTML estático.** A rodada 1 inteira foi reprovada e custou pouco: nenhuma linha de código de produção foi jogada fora. A regra "sem código antes da escolha" se pagou.
- **Perguntas com recomendação.** Na etapa 1, 4 perguntas de múltipla escolha bastaram para objetivo, idioma, curadoria de projetos e foto. O dono respondeu tudo de uma vez.
- **Opções no lugar de perguntas abertas.** Na marca, oferecer 3 promessas e 3 personalidades fez o dono responder com o que queria de verdade ("destacar a minha criatividade", "não se prenda a backend"), mesmo recusando todas.
- **`verificar.mjs`.** Achou 8 problemas reais que passariam no olho:
  - alvos de toque menores que 44px;
  - foto deformada pela borda dentro de `border-box`;
  - um erro de JavaScript que só aparecia quando a janela mudava de tamanho (handler de foco preso a um `ScrollTrigger` já revertido);
  - texto cortado com letra em 200%, por causa de `overflow:hidden` na abertura;
  - letras coladas herdadas de um `letter-spacing` em `em`;
  - linha com mais de 80 caracteres;
  - página 404 sem o link de pular para o conteúdo;
  - texto colado à esquerda na página de privacidade.
- **`comparar-direcoes.mjs`.** Pegou duas direções da rodada 2 com 97% da cor e 89% da ordem das seções em comum, quando no olho elas pareciam diferentes. Uma delas foi refeita em fundo escuro.
- **Escolha cega.** Mais útil pelas críticas do que pelo voto. Os avaliadores acharam defeitos reais que o verificador não acusa: fundo que não chegava à borda no celular, pílulas sobrepostas, legenda escondida, um objeto 3D que "não combina com o projeto". Na rodada 2 o voto bateu com a direção que o dono mais usou.
- **`design/correcoes.md`.** Cada reprovação virou regra geral antes da correção. Duas delas valem para qualquer site de marca (ver "Mudanças propostas").
- **`paleta.mjs`, `contraste.mjs` e `conferir-tokens.mjs`.** As cores foram tiradas do mural da foto real, passaram nos 12 pares de contraste e o conferidor achou o único valor fora do `DESIGN.md` (o halo atrás da foto).
- **Peso medido.** O verificador mostrou 1,2 MB no celular. A causa era o Three.js carregado mesmo com o 3D escondido. Depois da correção, 0,5 MB.
- **Conduta.** "Não invente número" segurou o texto: todo número veio de README, currículo ou medição, e o agente sinalizou quando a prova era mais fraca do que a frase ("projeto real", e não "em produção", porque o currículo diz prova de conceito).
- **Bloco "Vale desde a primeira tela".** VLibras, hover só com mouse e altura de 480px estavam em todas as direções desde a primeira rodada.

## O que não funcionou

### 1. O nível de expressão da rodada 1 ficou abaixo do pedido

As três direções da rodada 1 (perfil, linha de metrô, catálogo escuro) passaram no verificador e eram diferentes entre si. O dono reprovou as três: "eu queria algo mais criativo que chocasse, algo que brilhe os olhos de quem vê, [...] gosto bastante de animações, modelos 3D, efeitos quando scrolla o mouse".

Causa: o kit não pergunta o nível de impacto. O perfil diz "em tela de marca, impacto como Nubank e Valorant", mas `criatividade.md` cita animação e 3D só duas vezes, `landing.md` não fala de movimento, e o `anti-generico.md` pesa mais na hora de escolher. O agente leu "limpo e direto" como padrão e "impacto" como exceção.

### 2. O kit não tem método para o conteúdo

Depois de aprovar o visual, o dono reprovou duas vezes pelo texto: "o site está muito bonito, mas o conteúdo não vende, [...] não bate na ferida". A primeira correção (uma seção de perguntas do recrutador com "Sim." e prova) foi reprovada como "meio forçado". Só a terceira versão passou: afirmações em primeira pessoa, cada uma com uma prova e a habilidade nomeada, além de "Próximo passo" no lugar de "Onde ainda para".

Causa: o kit trata texto como algo a reduzir (G03, "pouco texto") e não como argumento. Não há referência sobre o que o público precisa acreditar, onde estão as provas nem como escrever sem soar como anúncio. `grep` por "objeção", "argumento" ou "persuas" em `references/` não acha nada.

Agravante: as melhores provas apareceram tarde. Um jogo publicado e jogável, deploy com volta automática e a troca de modelo quando a cota acaba só entraram depois que o dono pediu para "verificar o meu GitHub inteiro de ponta a ponta". Na etapa 1, o agente leu só os READMEs dos 5 projetos que pareciam principais.

### 3. O verificador e a escolha cega não enxergam movimento

- As capturas são paradas. Com trilho horizontal fixado por GSAP, a página inteira no computador sai em branco depois do primeiro projeto. Um avaliador escreveu "tudo aparece em branco depois do hydra-orch".
- O agente escreveu `scripts/quadros.mjs`, que captura a página em vários pontos da rolagem, e colou esses quadros à mão no pacote da escolha cega e no material para o dono.
- O verificador não percebeu que, no trilho horizontal, 10 de 24 links recebiam foco fora da tela, porque o navegador rola o contêiner com `overflow:hidden`. O agente achou com `scripts/foco.mjs` e corrigiu (24 de 24 na tela).
- O `g-colado-a-esquerda` acusou erro numa abertura em que a foto é uma camada absoluta que se abre no scroll. Era falso positivo.

### 4. Rodadas e fusão foram improvisadas

- Para a rodada 2, o agente moveu a rodada 1 para `design/direcoes/rodada-1/` à mão e corrigiu os caminhos das imagens. Os scripts não sabem de rodadas.
- A fusão de duas direções (D com E), que o `SKILL.md` chama de "mistura bem-vinda", não tem etapa própria. Ela virou um oitavo arquivo, verificado e capturado, antes do `DESIGN.md`. Foi aí que o dono reprovou a abertura e o conteúdo, então essa parada merece ser explícita.

### 5. Avisos que não têm o que fazer

Em todas as rodadas voltaram os mesmos 3 avisos, já justificados no `DESIGN.md`:
- `ia-sombra-dura`: a sombra dura é a assinatura de adesivo do grafite;
- `a11y-contraste-imagem`: texto com fundo sólido;
- `q-camada-sobre-texto`: o botão de Libras sobre uma faixa que anda.

O verificador só aceita justificativa para fonte. Cada rodada custou leitura e explicação repetida.

### 6. Foto da pessoa

- O dono pediu "gere uma nova imagem minha mais profissional". O kit não tem orientação para retrato. O agente recomendou usar a foto real no mural, recortou em 4:5 e 1:1 e explicou por que um rosto gerado por IA prejudica na entrevista. Deu certo, mas foi julgamento do agente.
- Na fusão, a foto ganhou um zoom de tela inteira com uma tarja por cima. O dono reprovou: "tire esse zoom na minha foto".

### 7. Atritos menores

- **Instalação:** a primeira mensagem do dono foi um `MODULE_NOT_FOUND` por rodar `node ../kit-frontend/bin/kit.mjs instalar` de dentro da pasta onde o kit estava. O README não deixa claro de onde rodar.
- **`conferir-marca.mjs MARCA.md`:** falhou com "Não achei .../MARCA.md/MARCA.md". O script espera a pasta, não o arquivo.
- **Escolha cega:** o pacote com 60 imagens custou de 110 mil a 170 mil tokens por avaliador. Um avaliador deixou de abrir o `etapa-2.md` porque o prompt do agente dizia "olhe apenas as imagens". O script não entrega o prompt pronto.
- **Dados pessoais em PDF:** o currículo original tinha telefone, bairro e o contato de uma referência. Sem regra no kit, coube ao agente perceber que o botão "Ver currículo" publicaria tudo isso. O currículo novo saiu sem esses dados.

## Mudanças propostas, por prioridade

| # | Mudança | Onde | Ataca |
| --- | --- | --- | --- |
| 1 | **Método de conteúdo.** Nova referência `references/conteudo/argumento.md`. (a) Inventário de provas na etapa 1: ler todas as fontes (repositórios, README, currículo, site atual) e montar a tabela "fato verificável → o que prova → fonte". (b) Para cada público, o que ele precisa acreditar e qual prova sustenta isso. (c) Escrever em afirmações com prova e habilidade nomeada, nunca em pergunta e resposta dirigida ao leitor. (d) Limite vira "próximo passo", sem esconder. (e) Número só verificado | `SKILL.md` (etapas 1 e 3), `landing.md`, modelo de `PRODUTO.md` | Reprovações 2 e 3 |
| 2 | **Pergunta de nível de expressão na etapa 1**, com imagens de exemplo: sóbrio, marcante, espetáculo (3D, scroll, animação). Em superfície de marca, a rodada 1 traz pelo menos uma direção no nível acima do pedido | `SKILL.md`, `criatividade.md`, `perfil.md` (G22) | Reprovação 1 |
| 3 | **Seção de movimento** em `landing.md` e `criatividade.md`: movimento ligado ao scroll, 3D com versão parada, orçamento de peso no celular (não baixar a biblioteca se o elemento está escondido), foco em trilho horizontal, nada se mexendo sobre a foto da pessoa | `references/padroes/landing.md`, `criatividade.md` | Reprovações 1 e 2 |
| 4 | **`scripts/rolagem.mjs`** (base em `scripts/quadros.mjs` deste teste): quadros em vários pontos da rolagem, com e sem movimento reduzido. Chamado pelo `verificar.mjs` quando houver GSAP, ScrollTrigger, `position:sticky` ou canvas, e incluído na `escolha-cega.mjs` e na `prancha.mjs` | `scripts/` | Seção 3 |
| 5 | **Nova checagem `a11y-foco-fora-da-tela`:** depois de cada Tab, esperar a animação e acusar o foco fora da área visível (base em `scripts/foco.mjs`) | `verificar.mjs` | Seção 3 |
| 6 | **Exceção aceita para qualquer aviso:** uma linha em "Do's and Don'ts" no formato `aceito: <id> — <motivo>` rebaixa o aviso para "aceito" no relatório. O aviso de contraste sobre imagem passa a lembrar o `data-conferido` | `verificar.mjs`, modelo de `DESIGN.md` | Seção 5 |
| 7 | **Rodadas e fusão:** `--rodada N` na `escolha-cega.mjs`, `comparar-direcoes.mjs` e `prancha.mjs`, arquivando a anterior em `rodada-N/`. Etapa 3b, "Fusão", com arquivo próprio, verificação, quadros de rolagem e parada para o dono antes do `DESIGN.md` | `SKILL.md`, scripts | Seção 4 |
| 8 | **Retrato:** foto real antes de gerada, critérios de uma boa foto que dá para pedir à pessoa, recortes 4:5, 1:1 e 1200 × 630, e nada de rosto gerado como se fosse a pessoa | `bibliotecas.md`, modelo de `midia.md` | Seção 6 |
| 9 | **Entrega de site estático:** imagem de prévia (1200 × 630) gerada de uma página HTML, ícone a partir do símbolo da marca, `.nojekyll`, 404 com caminhos absolutos e PDF sem dados pessoais (telefone, endereço, referência) | `landing.md` ("Entrega mínima"), base em `scripts/pdf.mjs` | Seção 7 |
| 10 | **Conduta: fontes que não podem aparecer.** Conteúdo vindo de trabalho não divulgável entra só como habilidade genérica. Não abrir arquivos de anotações ou credenciais ao levantar material | `SKILL.md` ("Conduta") | Privacidade |
| 11 | **Escolha cega mais barata e sem ambiguidade:** folhas de contato em vez de 60 imagens soltas, e o script imprime o prompt exato do avaliador, já com a permissão para o `etapa-2.md` | `escolha-cega.mjs` | Seção 7 |
| 12 | **Pequenos:** `conferir-marca.mjs` aceitar o caminho do arquivo; README com o comando de instalação a partir da pasta onde o kit foi clonado e um exemplo de caminho relativo | `conferir-marca.mjs`, `README.md` | Seção 7 |

## O que mudou na 3.3.0

| Mudança do quadro acima | Feito |
| --- | --- |
| 1. Método de conteúdo | Nova `references/marca/conteudo.md`. Etapa 1 do `SKILL.md` pede o inventário de provas; a etapa 2 mostra as provas no resumo; a etapa 3 usa o mesmo texto nas três direções. Tabela "Provas" no modelo de `PRODUTO.md`. `landing.md` liga o texto a essa referência |
| 2. Nível de expressão | Seção "Depois, o nível de expressão" em `criatividade.md` (`sobrio`, `marcante`, `espetaculo`), pergunta na etapa 1, campo `expressao:` no modelo de `PRODUTO.md` e uma direção um nível acima na etapa 3 |
| 3. Movimento | Seção "Movimento e 3D" em `criatividade.md` e "Movimento" em `landing.md`: funciona sem JavaScript, movimento reduzido, peso no celular, foco em trilho horizontal, nada invisível esperando a rolagem, foto da pessoa fora do efeito |
| 4. Quadros de rolagem | `scripts/rolagem.mjs`, com e sem movimento reduzido, e `rolagem.html` para mostrar. Citado nas etapas e em `landing.md`. A integração com `escolha-cega.mjs` e `prancha.mjs` ficou para depois |
| 5. Foco fora da tela | `a11y-foco-fora-da-tela` no `verificar.mjs`: na passada de Tab de sempre e, quando há rolagem animada (ScrollTrigger e afins), numa segunda passada com movimento. Caso novo em `ferramentas/testar.mjs`. Conferido também no portfólio: a cópia sem a correção de foco foi reprovada com os links do trilho, e o site publicado passou |
| 12. Instalação | README explica o caminho do `kit.mjs` e o erro `Cannot find module` |
| Prompt único | O limite do teste subiu de 32 mil para 38 mil tokens, por decisão do dono em 13/11/2026. O arquivo já tinha 32,7 mil antes desta versão e ficou com 35,3 mil |

O perfil de gosto ganhou as duas linhas de calibração deste teste e a frase sobre público técnico. As mudanças 6 a 11 estão em `docs/pendencias.md`.

## O que já está bom e não deve mudar

- A ordem marca → direções → `DESIGN.md` → tela-modelo, com paradas. Foi o que deixou as quatro reprovações baratas.
- O verificador como prova obrigatória, com falha e aviso separados, capturas e `leitor-de-tela.txt`. Pela árvore do leitor de tela, o agente achou 12 links com o mesmo nome ("Ver como funciona") e deu nome único a cada um.
- A escolha cega com críticas escritas. Manter, só baratear (mudança 11).
- `correcoes.md` com regra geral, e não com o caso.
- Fontes e bibliotecas servidas pelo próprio projeto, com versão fixa e licença ao lado.
- "Não invente número, depoimento nem integração."
- Leitura sob demanda: 16 arquivos lidos, e o tamanho do kit não pesou.

## Para o perfil de gosto

Sinais deste teste para a tabela de calibração de `references/gosto/perfil.md` (via `kit coletar`):

| Data | Tela e opções | Escolha | O que sugere |
| --- | --- | --- | --- |
| 13/11/2026 | Portfólio pessoal. Rodada 1: perfil, linha de metrô, catálogo escuro | **Nenhuma** ("fraquinho") | Em marca pessoal, o padrão do kit é tímido demais: espera 3D, animação e scroll |
| 13/11/2026 | Rodada 2: fitas 3D, foto que se abre no mural, máquinas 3D em fundo escuro | **Fusão das duas claras com 3D**, recusando a escura | Impacto com tema claro e cor do mundo do produto em área inteira; a escolha cega apontou a D, que foi a base |
| 13/11/2026 | Fusão aprovada no visual | Reprovou o zoom na própria foto e o texto que não vende | A foto da pessoa não é palco de efeito; texto é argumento com prova, sem pergunta dirigida ao leitor |

Hipótese que reforça a anterior: quando o público é técnico (aqui, recrutadores e tech leads), o dono aceita mais expressão do que com público leigo.

## Arquivos deste teste

- `correcoes-do-projeto.md`: as correções registradas no projeto, nas palavras do dono.
- `scripts/quadros.mjs`, `scripts/foco.mjs`, `scripts/pdf.mjs`: escritos durante o teste, candidatos às mudanças 4, 5 e 9.
- `imagens/`: prancha da rodada 1, quadros de rolagem da direção D e da fusão, e a primeira dobra do site publicado.

## Limites deste relatório

- O agente que fez o site também escreveu este relatório. Os números de reprovação e de falhas vêm do histórico da sessão. Os tokens dos avaliadores vêm do registro de cada um.
- Não houve teste com pessoas do público, leitor de tela real nem celular real. O dono ficou de abrir o site no celular.
- É n = 1 de portfólio pessoal. As mudanças 1 a 3 precisam ser repetidas num site de marca de outro setor antes de virar regra fixa.
