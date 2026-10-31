# Changelog — Sistema de gestão

## 3.0.0 — 2026-10-30

Correções de `docs/pendencias.md`, medidas com `scripts/verificar.mjs` nos dois exemplos. Nenhum token mudou, então a tabela de contraste continua a mesma.

### Corrigido

- Altura baixa (seção 4, “Formulários” e novo parágrafo “Altura baixa”): “A barra deixa de ser fixa quando a janela tem menos de 480 px de altura” → “Com a janela de até 480 px de altura, tudo o que é fixo rola junto”: barra lateral, barra de ações e cabeçalho, e a grade da agenda perde a rolagem própria. Antes só a barra de ações do formulário era citada, e o limite era “menos de 480”; agora é “até 480”, para valer em 320 × 256.
- Painel: “Indicadores com a definição escrita logo abaixo” → rótulo e número no cartão, com a definição a um toque, num botão de informação de 44 × 44 px (`aria-expanded`, nome “Como é contado: <rótulo>”). Armadilha “Indicador sem definição” reescrita no mesmo sentido.
- Pontos de quebra: “abaixo de 1024 px, o menu fica recolhido atrás de um botão” → a barra lateral vira o topo da página, com logotipo e botão “Menu”, e rola junto.
- Agenda: “Abaixo de 600 px, alterne entre lista do dia e calendário” → além disso, abaixo de 768 px o calendário mostra um dia por vez (seis colunas não dão 112 px ao bloco de 14 px); a lista é o padrão abaixo de 600 px.
- `exemplos/painel.html` e `exemplos/agenda.html` refeitos e responsivos: antes só de computador, rolavam na horizontal até 958 px (painel) e 1123 px (agenda) em 320 px e tinham botão de dia com 17 px de largura; agora passam em 1440 × 900, 768 × 1024, 375 × 812 e 320 × 256. Subtítulo do painel “Cada número diz o que conta e o que não conta” saiu (a frase deixou de ser verdadeira no cartão); subtítulo da agenda “Escolha um horário para ver as consultas ao lado” saiu (não vale com o painel embaixo). Blocos de tokens duplicados no `agenda.html` removidos.
- `exemplos/painel.png`, `agenda.png` (1366 × 640) e `capa.png` refeitos.

### Adicionado

- Gráfico de colunas vira barras horizontais, com o valor no fim de cada uma, abaixo de 600 px.
- Botão “Menu” e navegação recolhida no `painel.html` e no `agenda.html`, com Esc para fechar.

### Decisões para o autor revisar

- A mudança é MAIOR (regra de uma tela já construída), mas a auditoria nova de cada MAIOR ainda não foi feita: segue pendente, junto com a dos outros dois estáveis.
- A barra lateral escura com turquesa, as “três direções” que mudam só dois tokens e a identidade do painel seguem como estavam; `references/recursos/estilos.md` continua mandando trocá-las.

## 2.0.1 — 2026-10-29

### Corrigido
- Escopo: "Não use para" e "Relação com outros PRDs" passam a citar o `sistema-clinica-conversa`, que vem do mesmo produto e cobre sistemas de atendimento com agenda na identidade "conversa". Nenhuma prescrição mudou.

## 2.0.0 — 2026-10-09
Correções da [auditoria de 2026-10-09](../../docs/auditorias/2026-10-09/sistema-gestao/auditoria.md).

Dos 47 achados, 41 foram aplicados por inteiro, 2 em parte (A40, A44) e 4 não foram aplicados (A41, A42, A46, A47). Os contrastes foram recalculados com script (luminância relativa da WCAG) e conferem com os da auditoria; ao fim da revisão final, os 38 pares da tabela de contraste foram recalculados de novo, sem divergência.

### Corrigido

Cabeçalho, escopo e uso

- (A38) Nome e título: `dental_flow_ap_clinic_CHAT_frontend_generation_prompt.md`, “Prompt para gerar um frontend de gestão no padrão Dental Flow” → `prds/sistema-gestao/prd.md`, “Sistema de gestão”. O Dental Flow fica citado como origem do padrão.
- (A37) “As seções 2 a 8 são o padrão” e “As seções 2 a 8 descrevem…” → “seções 2 a 9”, nos dois lugares.
- (A13) “plano e imagens, sem código” e “Etapa 1, antes de qualquer código” → “sem código de produção”; protótipo estático descartável é permitido e fica em `prototipos/`, na pasta de documentação. A seção 9 diz o mesmo.
- (A02) “o que você escrever na seção 1 prevalece sobre elas” e “Onde a seção 1 disser outra coisa, vale a seção 1” → ordem de precedência em quatro níveis: piso (autorizações e conduta da seção 2, “Acessibilidade” da seção 4, regras de dados da seção 5); seção 1; instruções do repositório; restante das seções 3 a 9. Pedido que viola o piso faz a IA parar e perguntar.
- (A10) “em qualquer assistente de código” → escrito para assistente que lê o repositório e executa comandos; em assistente só de conversa vale o que a seção 2 diz.
- (A12, A45) “Quero o mesmo nível de um projeto anterior meu, o Dental Flow” → o Dental Flow é a origem; a IA não precisa conhecê-lo e o que vier marcado como “exemplo do Dental Flow” é ilustração.

Seção 2, como trabalhar

- (A06, A18) Capturas “em 1366 × 768 e em 375 px” → nos tamanhos `desktop` (1366 × 640) e `celular` (375 × 812) da seção 4.
- (A33) “entregas pequenas”, sem medida → até 3 telas, validável em 30 minutos.
- (A10) Protótipos “das telas propostas”, sem limite → estrutura geral e telas da primeira entrega, no máximo 4; as demais no início da própria entrega.
- (A36) “Cada critério deve corresponder a um teste que você vai escrever” → a um teste ou, na acessibilidade, a um passo do roteiro manual da seção 4.
- (A16) Etapa 2 sem parada entre entregas → para e aguarda validação, salvo “siga sem parar”.

Seção 3, stack

- (A17) “Padrão: React, Vite…” → “Padrão para projeto novo”; em evolução, stack, pastas e biblioteca visual do repositório prevalecem, MVVM vale para módulos novos e migração é decisão a confirmar.
- (A03) “a View só converte o resultado em posição e cor” → “em posição, texto e cor”.

Seção 4, interface

- (A06, A18) Tamanhos de referência: “desktop 1366 × 768 (precisa funcionar bem aqui) e 1440 × 900; celular 375 px; reflow em 320 px; zoom de 200% (equivale a 720 px de largura)” → tabela com nomes: `desktop` 1366 × 640 (área útil de um notebook de 1366 × 768), `desktop-largo` 1440 × 900, `tablet` 768 × 1024, `celular` 375 × 812, `reflow` 320 × 568, `zoom-200` 683 × 320. O zoom de 200% passa de 720 px (metade de 1440) para 683 px (metade de 1366).
- (A07) “No celular” e “Em tela estreita”, sem largura → abaixo de 600 px; menu recolhido abaixo de 1024 px.
- (A19) “parta deste conjunto e troque a cor de marca” → use os tokens sem alterar e pergunte a cor de marca na tabela de decisões; cor de marca são `--primaria` e `--destaque`; “três direções” são três versões do painel no tamanho `desktop`, cada uma com a tabela de contraste.
- (A05) `--destaque` `#1ed8cf` sem regra de uso → só sobre `--tinta` (10,75:1) ou `--primaria` (4,86:1), nunca em fundo claro (1,67:1 sobre `#f5f8f7`, 1,78:1 sobre `#ffffff`).
- (A05) `--linhas` `#d8e2df` como única cor de borda (1,24:1 sobre `#f5f8f7`, 1,32:1 sobre `#ffffff`) → só divisória, contorno de cartão e texto da barra lateral; borda de campo e de controle passa a ser `--borda` `#6b7c80` (4,08:1 e 4,36:1).
- (A12) “raios de 10, 14 e 18 px”, sem uso → 10 em campo, botão, bloco e item de menu; 14 em cartão; 18 em diálogo.
- (A33) Listagens: linha “com cerca de 50 px de altura” → 48 px; “cartão curto” → cartão de até 96 px.
- (A06) Listagens: caber “em 1366 × 768” → no tamanho `desktop`; tamanho de página 8 → 7 em listas simples; 6 → 5 em listas com filtros ou totais e em listas secundárias; 4 em painel lateral e 6 em diálogo de busca não mudam. Exemplo de faixa “1–8 de 124” → “1–7 de 124”.
- (A28) Estado na URL: “Busca, filtros, aba, data, página e seleção ficam na URL” → a seleção é o ID interno do registro; texto de busca com dígito (CPF, telefone, número de cadastro) fica em `sessionStorage`, fora da URL.
- (A45) Formulários: “No Dental Flow, paciente exige apenas o nome” → “Exemplo do Dental Flow: o cadastro de paciente exige apenas o nome”.
- (A33) Formulários: “Formulário longo” → com mais de 8 campos; “poucas opções” → até 5.
- (A33) Seleção: “um `select` com centenas de itens” → cadastro com mais de 50 itens.
- (A29) Seleção: “Mostre dados que distinguem homônimos” → em cadastro de pessoas, nesta ordem: data de nascimento, 4 últimos dígitos do telefone, código do cadastro; se nada existir, código e data do cadastro; nunca o CPF completo.
- (A03) Agenda: bloco “com a quantidade e uma barra das situações” (situação só por cor) → quantidade e, em texto, quantos pedem ação (“6 consultas” e, abaixo, “2 a confirmar”); a barra vira reforço, com 6 px na borda esquerda do bloco, legenda visível, ordem fixa, 2 px entre segmentos e nome acessível completo no bloco.
- (A09) Agenda: “cartões proporcionais à duração, lado a lado quando se sobrepõem”, sem escala nem limite → 48 px a cada 30 min; nenhum bloco ou cartão abaixo de 44 × 44 px; até 3 lado a lado e só enquanto cada um mantiver 44 px de largura; excedente em botão “+N”.
- (A33) Agenda: “muitos registros no mesmo horário” → mais de 3; “atalhos de período” → Hoje, Esta semana, Próxima semana.
- (A23) Agenda: “ao escolher um horário leve o foco para a lista”, só em tela estreita → escolher bloco ou dia move o foco para o título do painel em qualquer largura; blocos, cartões e cabeçalhos de dia são botões, na ordem dia e depois horário.
- (A45) Painel: “filtros de período e de unidade” → filtro de período e, havendo mais de uma unidade, de unidade.
- (A30) Estados: “painel de revisão fora da navegação principal”, sem rota → em `#/revisao`, só no servidor de desenvolvimento e na origem isolada, fora do build publicado.
- (A26) Exportação: “exportação CSV”, sem formato → UTF-8 com BOM, separador `;`, CRLF, vírgula decimal sem símbolo de moeda, data `AAAA-MM-DD`, apóstrofo em célula iniciada por `=`, `+`, `-` ou `@`, evento de auditoria ao exportar, coluna com dado pessoal sensível só a pedido.

Seção 4, acessibilidade

- O parágrafo “**Acessibilidade.**” → título próprio `#### Acessibilidade`, no fim da seção 4, com lista de regras e tabela de contraste.
- (A05) “contraste de 4,5:1 no mínimo” → 4,5:1 em texto e 3:1 em borda de campo, estado de controle, foco e elemento de gráfico; só os pares da tabela podem ser usados.
- (A33) “texto secundário perto de 7:1” → 7:1 ou mais.
- (A08) “Rótulos visíveis de 16 px, textos auxiliares de pelo menos 14 px” → nenhum texto abaixo de 14 px e rótulo de campo em 16 px, dito como regra deste padrão e não da WCAG; a escala completa fica em “Identidade visual”.
- (A20) “foco visível” → contorno de 3 px com 2 px de afastamento, em `--primaria` nas áreas claras (8,11:1 e 8,67:1) e em `--destaque` na barra lateral (10,75:1); nunca encoberto, com `scroll-padding-bottom` igual à altura da barra fixa.
- (A25) “Ao esconder um rótulo para ganhar espaço, mantenha o nome acessível” → rótulo visível obrigatório em campo de formulário; só se oculta na busca (com botão rotulado) e em ações de linha.

Seções 5 a 9

- (A45) Seção 5: pendência “(‘Sem clínica’)” → “(exemplo do Dental Flow: ‘Sem clínica’)”.
- (A18) Seção 6: Playwright em “desktop 1440 × 960 e celular 375 × 812” → projetos `desktop` (1366 × 640) e `celular` (375 × 812), pelos nomes da seção 4. O 1440 × 960 deixa de existir; 1440 × 900 é o `desktop-largo`, visitado na varredura.
- (A39) Seção 6: “Uma varredura por todas as telas com axe” → varredura dividida por grupo de telas, como a seção 8 já mandava.
- (A18) Seção 6: “320 px, 720 px” → tamanhos `reflow` (320 × 568) e `zoom-200` (683 × 320), mais `tablet` e `desktop-largo`.
- (A06) Seções 6 e 8: listas sem rolar “em 1366 × 768” → no tamanho `desktop`.
- (A11) Seção 6: “armazenamento inalterado pela simples consulta” e “snapshots antigos” ganham a versão para API (nenhuma requisição de escrita ao consultar; o teste de snapshots não se aplica).
- (A45) Seção 8, migração “esperta”: “Atribuir unidade, forma de atendimento ou valor por inferência” → preencher por inferência um dado que falta, com os três como “exemplo do Dental Flow”.

Coerência entre seções (revisão final do documento inteiro)

- Piso da ordem de precedência: “Como usar” citava “a conduta da seção 2, a acessibilidade da seção 4 e as regras de dados da seção 5” e o prompt, “autorizações e conduta da seção 2, o trecho ‘Acessibilidade’ da seção 4 e as regras de dados da seção 5” → as duas listas dizem o mesmo (autorizações incluídas).
- Tamanho `tablet`: “Menu recolhido com tabela” → “Menu recolhido, tabela com as colunas principais”, como nos pontos de quebra (de 600 a 1023 px).
- Tamanho `reflow`: “Nada rola na horizontal” → também diz que é o reflow da WCAG 1.4.10, equivalente ao zoom de 400% do roteiro manual.
- Pontos de quebra e “Estrutura” diziam duas vezes que o menu recolhe: fundidos em “abaixo de 1024 px, o menu fica recolhido atrás de um botão ‘Menu’”.
- “celular” entre aspas (abaixo de 600 px) e `celular` (375 × 812) passam a ser distinguidos no texto.
- Agenda: “a página não rola” → “no tamanho `desktop` a página não rola”; em 683 × 320 (`zoom-200`) nenhuma grade cabe sem rolar a página.
- Seção 6: os testes de falha de leitura e de gravação “rodam só no servidor de desenvolvimento” → “só onde o painel existe (servidor de desenvolvimento e origem isolada)”, como na seção 4 (“Estados”).
- Seção 6 e checklist: a tabela de medidas era “altura da página, rolagem horizontal, erros de console” e o checklist pedia “altura do documento e da janela” → uma só lista, com menor fonte e menor controle; o checklist pedia “medidos por script” a fonte e o controle mínimos sem que a seção 6 tivesse esse teste → a seção 6 ganha um item que os mede.
- Checklist: “Os cinco passos desta seção” → “Os passos desta seção (o de TypeScript só havendo TypeScript)”, porque o `tsc` é condicional.
- Seção 8: “Rótulos abaixo de 16 px pioram a leitura” → “Texto abaixo de 14 px, ou rótulo de campo abaixo de 16 px”, que é a regra da seção 4.
- Seção 4: o peso 600 vale também para aba escolhida (“no item escolhido” → “no item de menu ou aba escolhidos”); a barra lateral ganha o nome do produto e do usuário em branco, que só estava na tabela; o comentário de `--superficie` diz que ela é o “branco” dos textos sobre `--primaria` e a barra lateral.
- Seção 3: “Tokens de cor, raio e fonte em um único arquivo” → “Todos os tokens da seção 4”, já que o bloco ganhou medidas, situações e séries.
- Marcação de exemplos de clínica: “6 consultas”, o nome acessível do bloco, “Cadastrar paciente” e as palavras financeiras da seção “Linguagem” passam a vir como exemplo, não como regra.

Exemplos (`painel.html` e `agenda.html`, refeitos com o PRD corrigido)

- Cores: os exemplos usavam hex soltos e a v1 só tinha seis tokens → o bloco de tokens da seção 4 é copiado sem alteração e nenhuma cor aparece fora dele. Saíram `#eaf4f2` (coluna de hoje), `#dff1ef` (bloco escolhido), `#b07f00`, `#74858a`, `#5f7074` (botão desabilitado), `#edf2f0`, `#14293a` e `#aebbb7`.
- Borda de campo, de botão secundário e de bloco: `--linhas` `#d8e2df`, 1,32:1 sobre branco → `--borda` `#6b7c80`, 4,36:1.
- Agenda, bloco: quantidade e barra só por cor → quantidade e, em texto, “N a confirmar”; barra vertical de 6 px na borda esquerda, com legenda e nome acessível completo. Bloco escolhido: fundo `#dff1ef` → contorno de 2 px em `--primaria` sobre `--neutro-fundo`, que é a regra de “Escolhido”.
- Agenda, tamanho de referência: janela de 1366 × 768 → `desktop` 1366 × 640. A grade mostra 7 passos (08:00 a 11:30) com 48 px por passo, o aviso de registros fora da área diz “55 consultas … a partir das 11:30” e a lista do painel lateral cabe em 4 registros de 70 px (antes esticava a 96 px).
- Painel: a página cabe em 1366 × 640 sem rolar. Para isso, as definições de “Concluídas” e “Faltas” (três linhas) e o texto do gráfico foram encurtados, saiu a frase “Cada atalho abre o módulo já filtrado.” da lista de pendências (o atalho já diz o que abre) e os botões “Gráfico | Tabela” (42 px) passaram a 44 px.
- Os dois exemplos ganham “Pular para o conteúdo”, `<main>` com nome, tamanhos de fonte em `rem`, espaçamentos de 4, 8, 12, 16 e 24 px e ícones de 20 px; o item ativo da barra lateral, o avatar e a marca usam só `--lateral-ativo`, sem o `--primaria` que a tabela proíbe ali.
- Medidos por script em 1366 × 640: sem rolagem, menor fonte 14 px, nenhum controle abaixo de 44 × 44 px, IBM Plex Sans 400, 500 e 600 carregada. O painel também foi medido em 1440 × 900.

### Adicionado

- `exemplos/painel.png` e `exemplos/agenda.png` (1366 × 640, o `desktop`) e `exemplos/capa.png` (1440 × 900, primeira dobra do painel).
- Cabeçalho do padrão do repositório (`titulo`, `slug`, `versao` 2.0.0, `status`, `superficie`, `dominio`, `estende`, `idioma`, `acessibilidade`, `atualizado`).
- Seção “Escopo”, com *Use para*, *Não use para* e *Relação com outros PRDs*.
- (A01) “Como usar”, item 2: trocar por dados fictícios ou cobrir o que identifica uma pessoa antes de anexar; não enviar dado real.
- (A12) “Como usar”, item 2: anexar `exemplos/painel.png` e `exemplos/agenda.png` como referência de aparência.
- “Como usar”, item 3: alternativa de manter o arquivo na raiz do projeto como `PRD-FRONTEND.md`.
- (A32) Seção 1, campos novos: perfis e o que cada um vê; unidades; volume; agenda (dias, horário, duração mínima, nomes das situações); navegadores e aparelhos; idioma e fuso; hospedagem e caminho base.
- (A15) Seção 2: em projeto novo, o diagnóstico vira lista de premissas e riscos.
- (A14) Seção 2, “Respostas curtas minhas”: o que fazer com “não sei, sugira” e com “siga os caminhos recomendados” (que não autoriza commit, push nem publicação), agora dentro do trecho colado.
- (A10) Seção 2: o que fazer quando a IA não pode ler o repositório nem executar comandos.
- (A01) Seção 2, conduta: tratar todo dado existente como real, não copiar para protótipo, teste, captura, documento nem resposta, e pedir versão anonimizada. A menção à LGPD vem marcada como recomendação técnica, não orientação jurídica.
- (A31) Seção 2, conduta: no protótipo, o que não foi pedido pode aparecer marcado como “proposta”; nada é implementado sem aprovação.
- (A34) Seção 3: Node 22 ou mais novo; seção 7: o README registra a versão do Node.
- (A40, em parte) Seção 3: fonte local em WOFF2; família, pesos e reserva ficam na seção 4.
- (A27) Seção 3: na demonstração local, `localStorage` em uma chave `<produto>:dados` com campo `versao`; reler a chave antes de gravar e tratar gravação de outra aba (evento `storage`).
- (A11) Seção 3: com API existente não há snapshot local; idempotência, conflito de versão, histórico e auditoria são do servidor, e o que o contrato não cobre vai para a tabela de decisões.
- (A07) Seção 4: pontos de quebra em 600 e 1024 px, com o que muda em cada faixa.
- (A12) Seção 4: usuário e unidade no rodapé da barra lateral, sem barra superior; barra lateral de 232 px; cartão com contorno de 1 px e sem sombra; diálogo sobre véu de `--tinta` a 60%; espaçamentos de 4, 8, 12, 16 ou 24 px; ícones em SVG de 20 px com traço de 1,8 px.
- (A04, A05, A12) Seção 4: bloco de tokens em CSS. Tokens novos, com o par e a razão calculada:
  - `--superficie` `#ffffff`: `--tinta` sobre ela 19,17:1; `--secundario` 9,60:1; `--primaria` 8,67:1.
  - `--borda` `#6b7c80`: 4,36:1 sobre `#ffffff`, 4,08:1 sobre `#f5f8f7`, 3,72:1 sobre `#e9eeed`.
  - `--neutro-fundo` `#e9eeed`: `--tinta` sobre ele 16,36:1; `--secundario` 8,19:1; `--primaria` 7,40:1.
  - `--desabilitado` `#5a6b6f`: 4,76:1 sobre `#e9eeed`.
  - `--lateral-ativo` `#10293a`: branco sobre ele 15,00:1; `--destaque` 8,41:1.
  - `--lateral-apoio` `#a9bcb8`: 9,65:1 sobre `--tinta` `#01101f`.
  - Situações, texto sobre fundo: positivo `#0f4544` sobre `#dff1ef` 9,19:1; aviso `#6a4300` sobre `#fbefd9` 7,64:1; erro `#8a1c13` sobre `#fbe5e2` 7,72:1; informação `#1d3d70` sobre `#e3ebf8` 8,96:1; neutro `#35484e` sobre `#e9eeed` 8,19:1.
  - Situações, marca (barra, ponto, ícone), sobre `#e9eeed`: positivo `#145453` 7,40:1; aviso `#a87400` 3,47:1; erro `#c0362c` 4,71:1; informação `#3565b0` 4,92:1; neutro `#6b7c80` 3,72:1.
  - Mensagem e borda de erro `#8a1c13`: 9,31:1 sobre `#ffffff`, 8,71:1 sobre `#f5f8f7`.
  - Séries de gráfico sobre `#ffffff`: `--serie-1` `#008f88` 3,97:1; `--serie-2` `#c2620f` 4,16:1.
  - Medidas: `--largura-lateral` 232 px, `--alvo` 44 px, `--altura-linha` 48 px, `--fonte`.
- (A08, A43, A40 em parte) Seção 4: escala tipográfica (26/32, 18/24, 16/22, 14/20, 30/36), pesos 400, 500 e 600 com o uso de cada um, tamanhos em `rem`, fonte de reserva.
- Seção 4: estados de controle (hover, pressionado, escolhido, aba escolhida, desabilitado, erro), que a v1 não definia.
- (A04) Seção 4: cada situação da seção 1 é associada a um dos cinco papéis; séries de gráfico na ordem dos tokens, com nome na legenda ou rótulo direto; terceira série em diante é decisão a confirmar.
- (A22) Seção 4, listagens: marcação (`<table>` com legenda oculta e `<th scope="col">`; `<ul>` de cartões com rótulo em texto abaixo de 600 px), ordem padrão declarada, coluna ordenável com `aria-sort` e ordem na URL.
- (A25) Seção 4, listagens: ação de linha com até 2 botões de texto curto e nome acessível completo, o resto em “Mais ações”; botão de ícone em lista de painel lateral.
- Seção 4, listagens: se a medida mostrar que não cabe, diminui-se o tamanho da página, nunca a fonte nem a altura da linha.
- (A20) Seção 4, formulários: a barra de ações deixa de ser fixa em janela com menos de 480 px de altura.
- (A35) Seção 4, formulários: tela de conferência antes de gravar ação que movimenta dinheiro ou encerra um registro; inativação com motivo no lugar de exclusão; estorno no lugar de edição de lançamento. Marcada como regra de negócio a confirmar.
- (A06, A09) Seção 4: a agenda rola só a grade, que abre no horário atual; o painel pode rolar a página.
- Seção 4, agenda: se o texto do bloco não couber em 14 px, mostram-se menos dias; a palavra “hoje” marca o dia atual; o aviso de registros fora da área visível traz a contagem e um botão que leva até eles.
- (A23) Seção 4, painel: abas que mudam a URL são links com `aria-current="page"`.
- Seção 4, painel: alternador “Gráfico | Tabela” no próprio cartão.
- (A44, em parte) Seção 4, linguagem: tema escuro e outros idiomas ficam fora do padrão, salvo pedido na seção 1.
- Acessibilidade: tabela de contraste com 38 pares (texto ou traço, fundo, razão, passa 4,5, passa 3,0), incluindo os quatro pares proibidos.
- (A24) Acessibilidade: botão “Pular para o conteúdo” que move o foco por script para o `<main>`; `document.title` e foco no `h1` a cada rota; `<nav>` e `<main>` com nome.
- (A21) Acessibilidade: `role="status"` para sucesso, faixa e total, quantidade de resultados e aviso de registros fora da área; `role="alert"` para erro de leitura e de gravação; `aria-busy` na região em carregamento.
- (A36) Acessibilidade, “Como provar”: zero violação no axe por grupo de telas e roteiro manual por tela; frase fixa no relatório dizendo o que foi e o que não foi verificado.
- (A27) Seção 5: aviso na tela de entrada enquanto os dados forem locais (“Demonstração: os dados ficam só neste navegador, sem proteção. Não cadastre pessoas reais.”).
- (A01) Seção 5, “Dado fictício reconhecível”: nomes inventados, e-mail em `example.com`, telefone com DDD 00, CPF com dígito verificador inválido; se a validação recusar, o campo fica vazio.
- (A34) Seção 6: passo `tsc --noEmit` quando houver TypeScript (a lista passa de 4 para 5 passos).
- (A30) Seção 6: os testes de falha rodam só no servidor de desenvolvimento, onde existe o painel de revisão; na prévia do build, um teste confirma que `#/revisao` não existe.
- (A40, em parte) Seção 6: nomes dos pacotes de teste, `@playwright/test` e `@axe-core/playwright`.
- Seção 6: título “Checklist de aceite”, com 11 itens verificáveis que apontam para as regras das outras seções.
- (A13) Seção 7: os protótipos (`prototipos/`) são guardados com a documentação.

### Removido

- “(precisa funcionar bem aqui)”, da linha de tamanhos de referência: virou a regra medida de “sem rolar a página” no tamanho `desktop`.
- O tamanho 1440 × 960 dos testes, que contradizia o 1440 × 900 da seção 4.
- A frase de tokens em linha única da seção 4 (“tinta `#01101f`, ação primária `#145453`…”): os mesmos seis valores estão no bloco de tokens, sem alteração.
- “Situações com cor e texto, nunca só cor”, da seção “Linguagem”: a regra está em “Situações” e em “Acessibilidade” (Cor), sem perda.
- “Abaixo de 1024 px, o menu fica recolhido atrás de um botão ‘Menu’”, de “Estrutura”: foi para os pontos de quebra.

### Decisões para o autor revisar

Onde a correção dependia de escolha sua, apliquei a opção recomendada pela auditoria. Cada item abaixo pode ser trocado sem afetar o resto.

1. **Área útil de 1366 × 640 (A06).** É estimativa da auditoria para um notebook de 1366 × 768, não medição em aparelho: no Chrome sem interface a auditoria mediu 672 px. O texto diz que é estimativa e manda confirmar no aparelho de quem vai usar. Dela saem os tamanhos de página 7 e 5.
2. **Tamanhos de página (A06).** 7 e 5 no lugar de 8 e 6. Listas secundárias (históricos, relações) acompanharam as listas com filtros e foram para 5; diálogo de busca (6) e painel lateral (4) ficaram como estavam. São padrões de partida: a regra que vale é caber sem rolar, medida por teste.
3. **Pontos de quebra em 600 e 1024 px (A07)** e o que muda em cada faixa.
4. **Escala tipográfica (A08)** e a distribuição dos pesos 400, 500 e 600, que é escolha minha a partir dos exemplos da auditoria.
5. **Cores de situação (A04).** Texto e fundo são os da auditoria. As cinco cores de marca são acréscimo meu, porque a barra de situações e os pontos de legenda precisam de uma cor com 3:1 que não seja a do texto: `#145453`, `#a87400`, `#c0362c`, `#3565b0` e `#6b7c80`. A de aviso é `#a87400` e não o `#b07f00` do exemplo da auditoria, que dava 3,05:1 no bloco escolhido; a nova dá 3,47:1.
6. **Séries de gráfico (A04):** `#008f88` e `#c2620f`. A terceira série em diante ficou como decisão a confirmar em cada projeto.
7. **Estados de controle.** A v1 não dizia como é hover, pressionado, escolhido e desabilitado. Usei só tokens que já existiam, mais `--neutro-fundo` `#e9eeed` e `--desabilitado` `#5a6b6f`: hover do botão primário em `--tinta`; escolhido com contorno de 2 px em `--primaria` sobre `--neutro-fundo`. Não usei tom de `--primaria` para hover nem para seleção, para que a troca da cor de marca continue mexendo em dois tokens só.
8. **Agenda (A03, A09).** 48 px a cada 30 min; texto do bloco em duas linhas (“6 consultas”, “2 a confirmar”) e barra de 6 px na vertical, à esquerda. A auditoria sugeria uma linha só (“6 · 2 a confirmar”): medi no Chrome e ela tem 105,9 px em 14 px/600, mais do que cabe no bloco de uma semana de seis dias no tamanho `desktop`. O limite de 3 cartões lado a lado ganhou a condição de 44 px de largura por cartão, porque 3 cartões numa coluna de dia ficariam abaixo do alvo mínimo.
9. **Conferência antes de gravar, inativação e estorno (A35).** É regra de negócio; o texto manda confirmar na tabela de decisões.
10. **Dado real e LGPD (A01).** Entrou como instrução de conduta, com a ressalva de que é recomendação técnica e não orientação jurídica. Troquei o `exemplo.com.br` proposto pela auditoria por `example.com`, que é reservado para exemplos (RFC 2606); `exemplo.com.br` pode ter dono. Acrescentei que, se a validação da interface recusar CPF inválido ou DDD 00, o campo fica vazio, para não contradizer a regra de gerar o cenário fictício pelas validações da aplicação.
11. **Busca fora da URL (A28).** A auditoria falava em “identificador (CPF, telefone, prontuário)”; escrevi “texto de busca com dígito”, que é verificável por código.
12. **Painel de revisão fora do build (A30).** Consequência: os testes de falha de leitura e de gravação rodam só no servidor de desenvolvimento; na prévia do build há um teste de ausência da rota.
13. **Capturas de referência (A12).** A auditoria sugeria anexar três capturas do Dental Flow. Como o documento precisa valer para quem nunca o viu, “Como usar” aponta para `exemplos/painel.png` e `exemplos/agenda.png` deste repositório.
14. **Node 22 ou mais novo (A34).** A auditoria só testou o Node 24.19.
15. **Relação com `base-design-system`.** O Escopo diz que aquele PRD também descreve ferramentas, com outras medidas, e que num sistema de gestão valem as deste. Confira com o Escopo de lá.

16. **Agenda no limite do `desktop`.** Em 1366 × 640, os 4 registros do painel lateral ocupam 70 px cada, com 4 px de folga sobre o conteúdo; e o texto “2 a confirmar” (88,3 px) usa a folga de 4 px à direita do bloco escolhido, que tem 87,3 px de área interna. A semana de seis dias cabe, a de sete não. Se o conteúdo real for maior, a regra do próprio PRD manda diminuir o tamanho da página (para 3) ou mostrar menos dias.
17. **Exemplos só em `desktop`.** `painel.html` e `agenda.html` são capturas do tamanho `desktop` (e o painel, do `desktop-largo`). Não implementam os pontos de quebra de 1024 e 600 px: em 683 × 320 e em 320 × 568 eles rolam na horizontal. O PRD continua valendo para quem os construir.

### Achados não aplicados

Todos são de severidade baixa e não apontam erro objetivo; a correção proposta acrescentaria prescrição nova de preferência do autor.

- (A41) Pastas `src/shared/{ui,rules,data,styles}` para componentes, regras comuns, sessão de dados e tokens: nomes de pasta são escolha do autor, e a regra que importa (“um único arquivo”) já está escrita.
- (A42) Formato de commit, ramo por entrega e nomes de arquivo da documentação: fluxo de trabalho do autor; a seção 2 já trata do que é risco, a autorização.
- (A46) Build da hospedagem em `--outDir dist-hospedagem`: a seção 8 já descreve a armadilha e a saída pela ordem dos builds.
- (A47) Mostrar “Não informado” na tela no lugar de célula vazia: julgamento do auditor, muda um texto de interface em todas as telas.
- (A40, parte não aplicada) Versões de React, Vite e Playwright no README e roteador próprio “de até cerca de 100 linhas”: a medida proposta é vaga, e escolher biblioteca de rotas já cai em “não acrescente dependências sem necessidade”.
- (A44, parte não aplicada) Versão de impressão para orçamento e recibo em A4 retrato: específico do domínio de clínica.

## 1.0.0
Versão original, arquivada em [original.md](../../docs/auditorias/2026-10-09/sistema-gestao/original.md).
