# Auditoria — Prompt "frontend de gestão no padrão Dental Flow"

> **Registro histórico.** Auditoria da versão 1.0.0, feita quando o arquivo se chamava `dental_flow_ap_clinic_CHAT_frontend_generation_prompt.md`. Essa versão está guardada ao lado, como [original.md](original.md); os números de linha citados aqui são os dela. As telas `mockup-1` e `mockup-2` desta pasta seguem a versão 1.0.0, com os erros apontados. A versão corrigida é [prds/sistema-gestao/prd.md](../../../../prds/sistema-gestao/prd.md) e as mudanças estão no [CHANGELOG](../../../../prds/sistema-gestao/CHANGELOG.md).

Arquivo auditado: `dental_flow_ap_clinic_CHAT_frontend_generation_prompt.md` (172 linhas, seções 1 a 9, lido inteiro; o original não foi alterado).
Data: 09/10/2026.

## Resumo e veredito

**Aprovado com ressalvas como prompt de processo; insuficiente como especificação visual.**
O documento é forte em comportamento: listas paginadas com números, estado na URL, formulários, regras de dados e um roteiro de validação executável. É fraco em três frentes:

1. **Dados de saúde.** Manda anexar "capturas das telas atuais" de um sistema de clínica e ler o repositório, sem uma palavra sobre anonimizar ou sobre LGPD.
2. **Identidade visual.** Toda a parte visual cabe em uma frase (linha 79): 6 cores, 3 raios, 1 fonte. Não há cores de situação, escala tipográfica, pontos de quebra nem regra de uso dos tokens; dois deles reprovam em fundo claro (destaque 1,67–1,78:1; linhas 1,24–1,32:1).
3. **Contradições operacionais.** "Seção 1 prevalece" sem piso inviolável; "sem código" contra protótipos em HTML e CSS; 1440 × 900 contra 1440 × 960; "seções 2 a 8" com uma seção 9; barra de situações só com cor contra "nunca só cor"; 1366 × 768 tratado como área útil do navegador.

**47 achados: 1 crítico, 11 altos, 24 médios, 11 baixos.** Para montar duas telas precisei tomar 35 decisões que o texto não cobre: dois agentes entregariam a mesma estrutura com aparências visivelmente diferentes.

## Como verifiquei

- Leitura integral das 172 linhas; cada achado cita linha e trecho. Buscas por termo no arquivo confirmam as ausências citadas (LGPD, anonimização, ordenação, tablet, tema escuro, ícone, `aria-`, "3:1", exclusão, idioma, sombra, peso de fonte: nenhuma ocorrência).
- Contraste calculado com script em Node (luminância relativa da WCAG 2.x) sobre os hex da linha 79.
- Dois mockups em HTML e CSS renderizados no Chrome headless em 1366 × 768 e medidos por script: tamanho do documento, menor fonte visível, tamanho de cada controle, transbordo horizontal.
- Em cada achado, **Fato** é o que está na linha citada ou foi medido; **Julgamento** é a minha leitura da consequência.

## Achados

| ID | Severidade | Categoria | Linha(s) | Problema | Correção proposta |
| --- | --- | --- | --- | --- | --- |
| A01 | crítico | Dados sensíveis (LGPD) | 8, 40, 51 | **Fato:** L8 "Anexe o que tiver: capturas das telas atuais"; L40 manda ler o repositório "e as capturas"; L51 admite "dados locais existentes". Nenhuma linha manda anonimizar; "sensível" só aparece em "Teste sensível a tempo" (L165). **Julgamento:** em clínica, tela atual traz nome, procedimento e valor, isto é, dado pessoal sensível de saúde (LGPD, art. 5º, II, e art. 11). O prompt induz a enviar isso a um assistente de terceiros e a reproduzi-lo em diagnóstico e documentação. | "Como usar", item 2: "Antes de anexar, troque por dados fictícios ou cubra nome, CPF, telefone, procedimento e valor. Não envie dado real de paciente." Seção 2, conduta: "Trate todo dado já existente como real: não copie para protótipo, teste, captura, documento nem resposta. Se encontrar dado pessoal em captura ou repositório, avise e peça versão anonimizada." Seção 5: "Dado fictício tem de ser reconhecível: CPF com dígito verificador inválido, telefone (00) 90000-0000, e-mail em exemplo.com.br." |
| A02 | alto | Coerência | 13, 19, 30, 40, 108, 123 | **Fato:** L13 "o que você escrever na seção 1 prevalece sobre elas" e L19 "Onde a seção 1 disser outra coisa, vale a seção 1", sem exceção. L40 manda ler AGENTS.md e CLAUDE.md do repositório sem dizer quem vence em conflito. **Julgamento:** cores de marca informadas em L28 podem derrubar o 4,5:1 de L108; "Regras que já decidi" (L30) pode contrariar "não persista senhas" (L123); instrução do repositório pode contrariar L52. Cada agente resolve de um jeito. | Trocar a última frase de L13 e a de L19 por: "Ordem de precedência: 1) autorizações e conduta da seção 2, piso de acessibilidade da seção 4 e regras de dados da seção 5 — se a seção 1 ou o repositório pedirem algo que os viole, pare e pergunte; 2) seção 1; 3) instruções do repositório; 4) o restante das seções 3 a 9." |
| A03 | alto | Acessibilidade (1.4.1) | 72, 100, 106 | **Fato:** L100 pede "um bloco por horário de início com a quantidade e uma barra das situações"; L72 "a View só converte o resultado em posição e cor"; L106 "Situações com cor e texto, nunca só cor". A barra é situação codificada só por cor. No mockup-2 o bloco mede 106 × 44 px: cabe a quantidade, não cabe texto por situação. Testei 9 combinações de 5 cores de situação numa checagem de separação para daltonismo e nenhuma passou em todos os pares (pior par entre ΔE 4,7 e 7,3; no conjunto usado no mockup, vermelho × verde-escuro com ΔE 7,3 em protanopia, abaixo do alvo de 8) — ferramenta heurística, não critério WCAG. | L100: "…um bloco por horário de início com a quantidade e, em texto, a contagem das situações que pedem ação (ex.: '6 · 2 a confirmar'). A barra de situações é reforço: tem legenda visível, ordem fixa de segmentos, 2 px entre eles e nome acessível completo ('sexta 9, 11:00, 6 consultas: 4 confirmadas, 2 a confirmar')." |
| A04 | alto | Padrões / Acessibilidade | 73, 79, 102, 106 | **Fato:** L79 define 6 cores; L73 exige "etiqueta de situação" e L106 "cor e texto", mas não existe cor de sucesso, aviso, erro, informação nem paleta de gráfico (L102). As duas cores de marca usadas como séries dão 8,67:1 e 1,78:1 sobre branco. **Julgamento:** cada agente inventa as suas e o contraste não pode ser auditado no documento. | Acrescentar a L79 (valores calculados nesta auditoria; texto de etiqueta sempre acima de 7:1): "Situações — positivo: texto #0f4544 sobre #dff1ef; aviso: #6a4300 sobre #fbefd9; erro: #8a1c13 sobre #fbe5e2; informação: #1d3d70 sobre #e3ebf8; neutro: #35484e sobre #e9eeed. Séries de gráfico, nesta ordem: #008f88 e #c2620f (3,97:1 e 4,16:1 sobre branco); a partir da terceira série, decisão a confirmar." |
| A05 | alto | Acessibilidade (1.4.3, 1.4.11) | 79, 108 | **Fato (calculado):** "destaque" #1ed8cf dá 1,67:1 sobre "fundo de trabalho" e 1,78:1 sobre branco; "linhas" #d8e2df dá 1,24:1 e 1,32:1; "texto secundário" sobre "tinta" dá 2,00:1; "ação primária" sobre "tinta" dá 2,21:1. L79 não diz onde cada token pode ser usado, e "linhas" é a única cor de borda disponível. L108 só cita "contraste de 4,5:1 no mínimo": falta o 3:1 de bordas de campo, estados, foco e gráficos (WCAG 1.4.11). | L79: "Destaque só sobre tinta (10,75:1) ou sobre ação primária (4,86:1); nunca como texto, ícone, borda ou foco em fundo claro. Linhas (#d8e2df) só em divisórias e contorno de cartão; borda de campo e de controle usa #6b7c80 (4,08:1 sobre o fundo de trabalho, 4,36:1 sobre branco). Na barra lateral, texto em #d8e2df (14,49:1) ou branco; texto secundário não entra ali." L108: acrescentar "; bordas de campo, estados de controle, foco e elementos de gráfico com 3:1". |
| A06 | alto | Coerência / Ambiguidade | 40, 77, 84, 140, 155 | **Fato:** o documento usa "1366 × 768" como tamanho da página ("medindo a altura do documento contra a da janela", L140) e calcula o tamanho das páginas por ele (L84). Uma tela de 1366 × 768 não entrega 768 px de área útil: no Chrome headless desta máquina, janela de 1366 × 768 tem área útil de 1348 × 672. **Estimativa minha** (com as medidas do mockup, que o documento não define: 148 px até o início da lista, 40 px de cabeçalho de colunas, 54 px de paginação, 20 px de margem): lista simples de 8 linhas de 50 px ocupa cerca de 662 px; com rótulo acima do filtro, 686 px. **Julgamento:** o teste passa em 768 e a paginação continua fora da tela no notebook real, que é o defeito descrito em L81. A regra de não rolar vale só para listas; painel e agenda não têm regra. | L77: "desktop 1366 × 768 de tela, isto é, 1366 × 640 de área útil do navegador (precisa funcionar bem aqui)". L84, L140 e L155: trocar "1366 × 768" por "1366 × 640" e recalcular: "7 em listas simples, 5 em listas com filtros ou totais". L100 e L102: "A agenda rola só a grade; o painel pode rolar a página." |
| A07 | alto | Ambiguidade (responsivo) | 77, 79, 83, 93, 100 | **Fato:** L77 lista larguras (1366, 1440, 375, 320, 720) e nenhum ponto de quebra; "No celular" (L79, L83, L93) e "Em tela estreita" (L100) não têm largura; tablet não aparece no arquivo. **Julgamento:** em 720 px (o zoom de 200% do próprio L77) e entre 768 e 1024 px o agente não sabe se há barra lateral, tabela ou cartão. | L77: "Pontos de quebra: a partir de 1024 px, barra lateral fixa e tabela; de 600 a 1023 px, menu recolhido e tabela só com as colunas principais; abaixo de 600 px, cartões, seletor de seção e alternância entre lista e calendário. Capturar também 768 × 1024." |
| A08 | alto | Ambiguidade / Acessibilidade | 86, 108, 156 | **Fato:** L108 "Rótulos visíveis de 16 px, textos auxiliares de pelo menos 14 px"; L156 "Rótulos abaixo de 16 px pioram a leitura". Não há definição de "rótulo" nem escala (título de página, título de seção, célula de tabela, cabeçalho de coluna, etiqueta, número de indicador, texto de bloco da agenda). A WCAG não fixa tamanho mínimo de fonte: é regra da casa listada sob "Alvo WCAG 2.2 AA". Medi no mockup-2: "12 consultas" em 16 px/600 tem 94,4 px e o bloco oferece 90 px; em 14 px tem 82,6 px. **Julgamento:** um agente põe célula de tabela em 16 px, outro em 14 px, e a densidade muda. | L108: "Escala (IBM Plex Sans, pesos 400, 500 e 600): título de página 26/32; título de seção 18/24; rótulo de campo, botão, aba, item de menu e dado principal da linha 16/22; cabeçalho de coluna, dado secundário, etiqueta de situação, legenda e definição de indicador 14/20; número de indicador 30/36. Nada abaixo de 14 px. O tamanho mínimo é regra deste padrão, não da WCAG." |
| A09 | alto | Coerência (agenda × tamanho de alvo) | 100, 108 | **Fato:** L100 "cartões proporcionais à duração, lado a lado quando se sobrepõem"; L108 "controles com pelo menos 44 px". Não há escala (px por minuto), altura mínima nem limite de colunas: numa escala em que 30 min valem 44 px, uma consulta de 15 min mede 22 px, abaixo até dos 24 px da WCAG 2.5.8. No mockup-2, cumprindo os 44 px, a grade de 450 px mostra 9 passos de 30 min, isto é, 4,5 h do dia em 1366 × 768 (7 passos, 3,5 h, na área útil de 672 px). | L100: "Escala de 48 px a cada 30 min. Nenhum cartão ou bloco tem menos de 44 × 44 px: duração menor que 30 min ocupa 44 px e mostra a duração em texto. No máximo 3 cartões lado a lado; o excedente vira '+N', que abre a lista. A grade tem rolagem própria e abre no horário atual." |
| A10 | alto | Prompt (escopo e capacidade) | 3, 19, 40, 42, 127–132, 172 | **Fato:** L3 promete "qualquer assistente de código"; L42 pede, em uma só resposta, protótipos "das telas propostas" em duas larguras, com "duas alternativas" para as importantes e três estados; L19 lista 8 módulos. Só as imagens têm saída prevista ("Se não puder gerar imagens, avise…", L42); "Leia o repositório" (L40) e "rode e relate o resultado real" (L127) não têm. **Julgamento:** 8 módulos × 2 larguras × alternativas × estados passa de 40 capturas antes de qualquer aprovação; um assistente de conversa sem terminal não cumpre L127–132 e o prompt não diz o que fazer. | L42: "Na Etapa 1, prototipe a estrutura geral e as telas da primeira entrega (no máximo 4 telas, em 1366 × 768 e 375 × 812); as demais ganham protótipo no início da própria entrega." Seção 2: "Se não puder ler o repositório ou executar comandos, diga isso na primeira linha, peça os arquivos de que precisa e entregue os comandos para eu rodar. Nunca relate como executado o que não executou." |
| A11 | alto | Coerência (dados) | 29, 64–69, 114, 139, 141 | **Fato:** L29 oferece "API existente" como opção, mas L69 ("snapshot compartilhado… uma gravação por vez"), L114 ("Contrato de armazenamento. Mantenha chave, versão…"), L139 ("armazenamento inalterado pela simples consulta") e L141 ("snapshots antigos abrem sem conversão") só fazem sentido com armazenamento local. **Julgamento:** com API, o agente força um snapshot local sobre a API ou improvisa. | Seção 3, depois de L69: "Com API existente, o Repository chama a API e não há snapshot local: a gravação envia chave de idempotência, conflito se resolve pela versão do registro, histórico e auditoria são do servidor. Na seção 6, 'armazenamento inalterado' vira 'nenhuma requisição de escrita ao consultar' e o teste de snapshots antigos não se aplica." |
| A12 | alto | Ambiguidade (referência ao Dental Flow) | 19, 79 | **Fato:** L19 pede "o mesmo nível de um projeto anterior meu, o Dental Flow" e a parte visual está em uma frase de L79. Faltam: cor da barra lateral ("escura", sem token) e do texto dela, superfície de cartão, a que componente cada raio se aplica, largura da barra lateral, espaçamentos (L86 e L156 citam "espaçamento" sem valor), sombras, pesos de fonte, ícones. **Julgamento:** o comportamento é reproduzível só com o texto; a aparência não (35 decisões listadas no fim). | Anexar ao prompt 3 capturas do Dental Flow (painel, lista, agenda) com dados fictícios e acrescentar a L79: "Barra lateral em tinta, 232 px, texto #d8e2df, item ativo com fundo #10293a e marca em destaque. Cartões brancos (#ffffff) com contorno de 1 px em linhas, sem sombra. Raio 10 em campos e botões, 14 em cartões, 18 em diálogos. Espaçamentos múltiplos de 4 (8, 12, 16, 24). Ícones de traço de 1,8 px em 20 px." |
| A13 | médio | Coerência | 10, 38, 42, 172 | **Fato:** L10 "plano e imagens, sem código"; L38 "antes de qualquer código"; L42 "Monte protótipos estáticos em HTML e CSS"; L172 "Não escreva código de produção nesta etapa". Três redações para a mesma regra, duas delas incompatíveis com L42. | L10 e L38: "sem código de produção (protótipo estático descartável em HTML e CSS é permitido e fica na pasta de documentação, em `prototipos/`)". |
| A14 | médio | Prompt | 7, 9, 10 | **Fato:** L9 manda colar "a partir de Início do prompt"; as frases "não sei, sugira" (L7) e "siga os caminhos recomendados" (L10) ficam fora do trecho colado e não são definidas dentro dele. L19 cobre só "informação de negócio". | Seção 2: "Se eu escrever 'não sei, sugira' em um campo, traga a pergunta com recomendação. Se eu responder 'siga os caminhos recomendados', adote todas as suas recomendações pendentes e registre cada uma como decisão adotada por padrão." |
| A15 | médio | Prompt | 24, 40, 172 | **Fato:** L24 admite "projeto novo", mas L40 ("Leia o repositório… Aponte problemas concretos com medida") e L172 exigem diagnóstico. Em projeto novo não há o que medir. | L40: "Em projeto novo, o diagnóstico vira lista de premissas e riscos, com o que cada um muda no plano." |
| A16 | médio | Prompt | 45, 47 | **Fato:** "Pare e aguarde" (L45) está só na Etapa 1. L47 diz "Uma entrega por vez. Ao fim de cada uma, informe…", sem dizer se o agente espera validação antes da seguinte. | L47: "Ao fim de cada entrega, pare e aguarde minha validação antes da próxima, salvo se eu disser 'siga sem parar'." |
| A17 | médio | Coerência (stack) | 3, 32, 58, 60 | **Fato:** L3 diz que serve para "evoluir um que já existe"; L58 só prevê "Se o projeto já usa TypeScript, mantenha". Não diz o que fazer quando o repositório usa outra biblioteca de interface, outro roteador ou outra organização que não MVVM e L32 ficou em branco. | L58: "Em evolução, a stack, a organização de pastas e a biblioteca visual do repositório prevalecem sobre esta seção. MVVM vale para módulos novos. Migração é decisão a confirmar, nunca pressuposto." |
| A18 | médio | Erro pontual (resoluções) | 42, 77, 132, 139, 140 | **Fato:** L77 "1440 × 900" × L132 "desktop 1440 × 960". L42 "375 px" sem altura × L132 "375 × 812". L77 "zoom de 200% (equivale a 720 px de largura)": 720 é metade de 1440, não de 1366 (683), que é o tamanho que "precisa funcionar bem". L132 define dois projetos Playwright e nenhum é 1366 × 768, embora L140 exija prova nele. | L77 vira tabela única: "desktop principal 1366 × 768 (projeto Playwright 'desktop'); desktop largo 1440 × 900; celular 375 × 812 (projeto 'celular'); reflow 320 × 568; zoom de 200% = 683 × 384". L42, L132 e L139 passam a citar esses nomes. Ver também A06. |
| A19 | médio | Ambiguidade (identidade) | 28, 42, 79 | **Fato:** três caminhos sem ligação: L28 "proponha três direções em imagem"; L42 "duas alternativas" para telas importantes; L79 "Se eu não der identidade visual, parta deste conjunto e troque a cor de marca". Não diz qual dos 6 tokens é a "cor de marca", para qual cor trocar, nem em que tela mostrar as direções. Trocada a cor, os contrastes de L79 deixam de valer. | L79: "Se eu não der identidade visual, use este conjunto sem alterar e pergunte a cor de marca na tabela de decisões. 'Três direções' são três versões do painel em 1366 × 768 que mudam só ação primária e destaque, cada uma com a tabela de contraste calculada." |
| A20 | médio | Acessibilidade (2.4.7, 2.4.11) | 93, 108 | **Fato:** L108 só diz "foco visível"; L93 manda "barra de ações fixa". A WCAG 2.2 inclui 2.4.11 (foco não encoberto, AA) e a barra fixa encobre o campo focado ao tabular. O único token chamativo, "destaque", dá 1,67:1 em fundo claro. | L108: "Foco: contorno de 3 px com 2 px de afastamento, em ação primária sobre áreas claras (8,11:1) e em destaque sobre a barra lateral (10,75:1)." L93: "A página usa `scroll-padding-bottom` igual à altura da barra fixa; a barra deixa de ser fixa quando a janela tem menos de 480 px de altura." |
| A21 | médio | Acessibilidade (4.1.3) | 85, 94, 100, 104 | **Fato:** L104 lista "sucesso" sem dizer como é anunciado; a faixa "1–8 de 124" (L85), o aviso de "registros fora da área visível" (L100) e a contagem da busca mudam sem troca de foco. Só a falha de gravação tem tratamento ("leva o foco ao aviso", L94). | L104: "Sucesso, faixa e total após filtrar, quantidade de resultados da busca e aviso de registros fora da área usam `role=\"status\"`; erro de leitura e de gravação usam `role=\"alert\"`; região em carregamento recebe `aria-busy=\"true\"`." |
| A22 | médio | Acessibilidade (1.3.1) / Caso não coberto | 83 | **Fato:** L83 pede "cabeçalho de colunas" e, no celular, "cartão curto". Não diz a marcação, não há a palavra "ordenação" no arquivo e não diz como o cartão preserva o rótulo de cada coluna. | L83: "Lista é `<table>` com legenda oculta e `<th scope=\"col\">`. Cada lista declara a ordem padrão (ex.: nome, de A a Z). Coluna ordenável tem botão no cabeçalho e `aria-sort`, e a ordem vai para a URL. No celular, `<ul>` de cartões em que cada dado mantém o rótulo em texto." |
| A23 | médio | Acessibilidade (2.1.1) | 73, 88, 100, 102, 108 | **Fato:** L108 pede "Navegação completa por teclado" de forma geral; L100 só define foco para "tela estreita". "Abas" (L73, L102) têm estado na URL (L88), mas não se diz se são links ou `role="tab"`. **Julgamento:** a agenda do mockup-2 tem 32 blocos visíveis; sem modelo definido, cada agente escolhe entre 32 paradas de Tab e grade com setas. | L100: "Blocos e cartões são botões na ordem dia e depois horário; cada cabeçalho de dia é um botão que lista o dia. Escolher bloco ou dia move o foco para o título do painel em qualquer largura." L102: "Abas que mudam a URL são links com `aria-current=\"page\"`." |
| A24 | médio | Acessibilidade (2.4.1, 2.4.2) / Padrões | 58, 108, 159 | **Fato:** L58 fixa "rotas em hash"; L108 não menciona meio de pular a navegação, título de página por rota nem foco ao trocar de rota; L159 só trata a remontagem do formulário. Com rota em hash, o link de salto clássico (`href="#conteudo"`) troca a rota. | L108: "Primeiro elemento da página: botão 'Pular para o conteúdo', que move o foco por script para o `<main>` (âncora não serve em rota em hash). A cada rota, `document.title` vira 'Tela · Produto' e o foco vai para o `h1`. `<nav>` e `<main>` têm nome." |
| A25 | médio | Ambiguidade | 83, 106, 108 | **Fato:** L83 "as ações na própria linha"; L106 "ações com verbo e objeto ('Cadastrar paciente')"; L108 permite esconder rótulo "para ganhar espaço" sem dizer quando. Medi: "Cadastrar paciente" em 16 px ocupa 135,7 px. No painel de 340 px do mockup-2 só coube um botão de ícone. | L108: "Rótulo visível é obrigatório em campo de formulário. Pode ser ocultado só na busca (com botão rotulado) e em ações de linha." L83: "Ação de linha: até 2 botões de texto curto ('Abrir', 'Editar') com nome acessível completo ('Editar Marina Teles'); as demais ficam em 'Mais ações'." |
| A26 | médio | Padrões / LGPD | 110 | **Fato:** L110 "exportação CSV. Valor desconhecido sai vazio", sem codificação, separador, formato de número e de data. Não há proteção contra fórmula em célula (texto iniciado por =, +, - ou @) nem limite para colunas com dado pessoal. **Julgamento:** Excel em pt-BR espera ponto e vírgula e vírgula decimal; CSV com vírgula abre em uma coluna só. | L110: "CSV em UTF-8 com BOM, separador ';', fim de linha CRLF, número com vírgula decimal e sem símbolo de moeda, data AAAA-MM-DD. Célula de texto iniciada por =, +, - ou @ recebe apóstrofo. Exportar gera evento de auditoria. Coluna com dado de saúde só entra se eu pedir." |
| A27 | médio | Padrões / LGPD | 64–69, 114, 123 | **Fato:** "armazenamento" aparece em L64, L65, L114 e L139 sem dizer qual; L69 diz "aceita uma gravação por vez" e não trata duas abas abertas; L123 diz que login e perfis "são telas de demonstração", mas não manda avisar quem usa. **Julgamento:** registro de clínica em armazenamento local sem proteção, mais alguém cadastrando paciente real, é incidente. | L69: "Armazenamento: `localStorage`, uma chave `<produto>:dados` com campo `versao`. Antes de gravar, releia a chave; se outra aba gravou (evento `storage`), recarregue o snapshot e peça para repetir." L123: "Enquanto os dados forem locais, a tela de entrada mostra: 'Demonstração: os dados ficam só neste navegador, sem proteção. Não cadastre pessoas reais.'" |
| A28 | médio | LGPD | 88, 98 | **Fato:** L88 "Busca, filtros, aba, data, página e seleção ficam na URL"; L98 diz que a busca é "por nome e por identificadores". O trecho depois de # não vai ao servidor, mas fica no histórico, em favoritos e em link copiado. **Julgamento:** nome ou CPF de paciente no histórico do navegador de uma recepção compartilhada. | L88: "Na URL vão filtros, aba, data, página e o ID interno do registro selecionado. Texto de busca só vai para a URL se não for identificador (CPF, telefone, prontuário); nesses casos fica em `sessionStorage`." |
| A29 | médio | Coerência / LGPD | 92, 98 | **Fato:** L92 "paciente exige apenas o nome"; L98 "Mostre dados que distinguem homônimos", sem dizer quais. Se só o nome é obrigatório, dois homônimos podem não ter nenhum dado distintivo; e nada limita a exposição (CPF inteiro no diálogo?). | L98: "Para distinguir homônimos, mostre o que existir, nesta ordem: data de nascimento, 4 últimos dígitos do telefone, código do cadastro. Nunca o CPF completo (mostre ***.***.789-10). Se nada existir, mostre o código e a data do cadastro." |
| A30 | médio | Ambiguidade | 104 | **Fato:** L104 "Inclua um painel de revisão fora da navegação principal", sem rota e sem dizer se vai para o build publicado. **Julgamento:** tela que simula falha de gravação, acessível em produção, é risco. | L104: "O painel de revisão fica em `#/revisao`, existe só no servidor de desenvolvimento e na origem isolada, não entra no build publicado, e um teste confirma a ausência." |
| A31 | médio | Coerência | 42, 54, 102, 168 | **Fato:** L54 "Não crie… indicadores que eu não pedi"; L42 pede protótipo com "dados fictícios realistas"; L102 e L168 exigem painel com indicadores definidos. Se a seção 1 não listar indicadores, o agente entrega painel vazio ou viola L54. No mockup-1 inventei 4. | L54: "…No protótipo, o que eu não pedi pode aparecer marcado como 'proposta' e listado na tabela de decisões; nada disso é implementado sem aprovação." |
| A32 | médio | Ambiguidade (seção 1) | 23–34, 98, 100, 102, 123, 131 | **Fato:** a seção 1 não pergunta: perfis de usuário (L123 fala de "perfis"), se há mais de uma unidade (L102 exige "filtros de período e de unidade"), volume de registros (decide o que é "cadastro grande", L98), dias, horário e duração mínima da agenda (L100), navegadores e aparelhos, idioma e fuso, caminho base da hospedagem (exigido em L131). | Acrescentar à seção 1: "**Perfis e o que cada um vê:** [ ]", "**Unidades:** [uma ou várias]", "**Volume:** [registros por cadastro; atendimentos por dia]", "**Agenda:** [dias, horário, duração mínima]", "**Navegadores e aparelhos:** [ ]", "**Idioma e fuso:** [pt-BR, America/Sao_Paulo]", "**Hospedagem e caminho base:** [ ]". |
| A33 | médio | Ambiguidade (termos vagos) | 41, 77, 83, 93, 96, 98, 100, 108 | **Fato (trechos):** "entregas pequenas" (L41); "funcionar bem" (L77); "cerca de 50 px" e "cartão curto" (L83); "Formulário longo" (L93); "poucas opções" (L96); "cadastros grandes" e "centenas de itens" (L98); "muitos registros no mesmo horário" e "atalhos de período" (L100); "perto de 7:1" (L108). Nenhum tem limite numérico, e L44 exige critérios de aceite testáveis. | "Entrega pequena: até 3 telas, validável em 30 min. Linha de 48 a 52 px; cartão de até 96 px. Formulário longo: mais de 8 campos. Poucas opções: até 5. Cadastro grande: mais de 50 itens. Muitos no mesmo horário: mais de 3. Atalhos de período: Hoje, Esta semana, Próxima semana. Texto secundário: 7:1 ou mais." |
| A34 | médio | Padrões | 58, 129–132 | **Fato:** L58 "lint não substitui checagem de tipos", mas a lista de validação (L129–132) não tem checagem de tipos. L130 fixa `node --test` "sem framework extra" e nenhuma versão do Node: no Node 24.19 desta máquina `node --test` executou um arquivo `.ts`; versões antigas não fazem isso (não testei quais). | Seção 6: "5. Havendo TypeScript, `tsc --noEmit`." L58: "Node 22 ou mais novo; registre a versão no README." |
| A35 | médio | Acessibilidade (3.3.4) / Caso não coberto | 19, 51, 95, 117–120 | **Fato:** o arquivo não trata exclusão, inativação nem estorno ("apag" só aparece em "Não apague… dados locais", L51); L95 só pede confirmação "ao sair com alterações". Há módulo de caixa (L19). A WCAG 3.3.4 (AA) pede revisão, confirmação ou reversão em transação financeira e em alteração de dado. | Seção 4, Formulários (regra de negócio, confirmar na tabela de decisões): "Lançamento de caixa, conclusão de atendimento e inativação passam por tela de conferência antes de gravar. Não há exclusão definitiva: registro é inativado com motivo; lançamento errado é estornado, não editado." |
| A36 | médio | Acessibilidade (critério não mensurável) | 44, 108, 138–139, 143 | **Fato:** L108 "Alvo WCAG 2.2 AA"; L44 "Cada critério deve corresponder a um teste"; a prova prescrita é axe mais teclado em diálogos e formulários (L138–139); L143 admite que não cobre "leitor de tela". **Julgamento:** conformidade AA não se demonstra só com axe; do jeito que está, "AA" vira afirmação sem prova. | L108: "Critério de aceite: zero violação no axe por grupo de telas e roteiro manual por tela (só teclado; zoom de 200% e de 400%; foco sempre visível e nunca encoberto; ordem de leitura; nenhuma informação só por cor). O relatório diz 'WCAG 2.2 AA: verificado por axe e roteiro manual; leitor de tela não verificado'." |
| A37 | baixo | Erro pontual | 13, 19, 170 | **Fato:** L13 "As seções 2 a 8 são o padrão" e L19 "As seções 2 a 8 descrevem…", mas existe "### 9. Formato da sua primeira resposta" (L170), que repete a Etapa 1 (L38–45). | "seções 2 a 9" nos dois lugares, ou fundir a seção 9 na Etapa 1. |
| A38 | baixo | Erro pontual | nome do arquivo, 1, 3 | **Fato:** o nome traz "ap_clinic" e "CHAT"; o título (L1) e o texto só falam em "Dental Flow" e em "qualquer assistente de código" (L3). Nenhuma das 172 linhas explica os dois termos. | Explicar em L3 o que são "ap_clinic" e "CHAT" ou renomear para `dental_flow_frontend_generation_prompt.md`. Se "CHAT" for versão para assistente de conversa, ver A10. |
| A39 | baixo | Coerência | 139, 164 | **Fato:** L139 "Uma varredura por todas as telas com axe" × L164 "Varredura única de todas as telas. Estoura o tempo limite… Divida por grupo de telas." | L139: "Varredura com axe em todas as telas, dividida por grupo de telas, com nomes muito longos…" |
| A40 | baixo | Padrões (stack) | 58, 79, 130, 132, 139 | **Fato:** nenhuma versão é citada (React, Vite, Node, Playwright); "rotas em hash" não diz se com biblioteca ou roteador próprio, o que esbarra em "Não acrescente dependências sem necessidade"; "axe" vem sem pacote; "Fonte servida localmente" vem sem pesos, formato nem fonte de reserva. React, Vite, CSS Modules, `node --test`, Playwright, axe e as regras `no-restricted-imports` e `no-restricted-globals` do ESLint existem e combinam entre si. | L58: "Registre no README a versão maior de React, Vite e Node. Rotas em hash com roteador próprio de até cerca de 100 linhas; biblioteca de rotas é decisão a confirmar. Testes com `@playwright/test` e `@axe-core/playwright`. IBM Plex Sans em WOFF2, pesos 400, 500 e 600, `font-display: swap`, reserva `'Segoe UI', system-ui, sans-serif`." |
| A41 | baixo | Padrões (pastas) | 60, 71, 73 | **Fato:** L60 define `src/feature/<modulo>/…`; o "único arquivo de funções puras" (L71), os componentes compartilhados e o arquivo de tokens (L73) não têm pasta. | L60: "`src/shared/ui` (componentes), `src/shared/rules` (regras usadas por mais de um módulo), `src/shared/data` (sessão de dados), `src/shared/styles/tokens.css`." |
| A42 | baixo | Padrões (commit e documentação) | 52, 147–150 | **Fato:** L52 trata só de autorização: não há formato de mensagem, granularidade nem ramo. L147–150 listam documentos sem nome de arquivo nem estrutura de pasta. | Seção 7: "Um commit por entrega, mensagem `<módulo>: <o que mudou>`, em ramo `entrega/NN-nome`. Documentos: `README.md`, `entregas/NN-nome.md`, `modulos/<modulo>.md`, `INDICE.md`, `imagens/`, todos dentro da pasta informada na seção 1." |
| A43 | baixo | Acessibilidade (julgamento) | 108 | **Fato:** tamanhos de fonte em px ("16 px", "14 px"). **Julgamento:** o zoom do navegador atende à WCAG 1.4.4, mas px ignora o tamanho de fonte padrão que a pessoa configurou no navegador. | L108: "Tamanhos de fonte em `rem` (1rem = 16 px)." |
| A44 | baixo | Casos não cobertos | 106, 110 | **Fato:** tema escuro e outros idiomas não são citados, nem como fora do padrão; L110 limita impressão a "Relatório", e o domínio tem orçamento e recibo. | L110: "Têm versão de impressão: relatório, orçamento e recibo de caixa (A4 retrato, sem navegação, com data e unidade). Fora do padrão, salvo pedido na seção 1: tema escuro e outros idiomas." |
| A45 | baixo | Ambiguidade | 92, 102, 115, 167 | **Fato:** termos do Dental Flow aparecem como regra geral: "filtros de período e de unidade" (L102), "Sem clínica" (L115), "unidade, forma de atendimento" (L167), sem o "No Dental Flow," que L92 usa. | L102: "…filtros de período e, havendo mais de uma unidade, de unidade". Prefixar os exemplos de L115 e L167 com "Exemplo do Dental Flow:". |
| A46 | baixo | Padrões (build) | 131, 166 | **Fato:** L166 reconhece que os dois builds "escrevem no mesmo lugar" e resolve com ordem de execução. | L131: "Build da hospedagem com `--outDir dist-hospedagem`; cada prévia aponta para a sua pasta." |
| A47 | baixo | Acessibilidade / Ambiguidade | 110, 116 | **Fato:** "Valor desconhecido sai vazio" (L110) e "fica vazio" (L116). **Julgamento:** na tela, célula vazia não se distingue de dado ainda carregando e não é anunciada por leitor de tela. | L116: "Na tela, valor desconhecido aparece como 'Não informado' em texto secundário; no CSV sai vazio." |

Contagem: 1 crítico, 11 altos, 24 médios, 11 baixos.

Não encontrei erro de ortografia, espaço duplo nem palavra repetida no arquivo (leitura mais checagem mecânica).

## Contraste

Fórmula de luminância relativa da WCAG 2.x. Exigência: 4,5:1 para texto normal, 3:1 para texto grande e para componentes, foco e elementos gráficos (1.4.11).

### Pares formados pelos tokens do documento (linha 79)

O documento dá seis cores com nome de papel e não diz quais pares são permitidos. A tabela cobre os pares que os nomes sugerem e os que o texto não proíbe. Branco (#ffffff) não é token do documento; entra porque "área de trabalho clara" e cartões levam a ele.

| Par | Primeiro plano | Fundo | Razão | Resultado |
| --- | --- | --- | --- | --- |
| Texto principal (tinta) sobre fundo de trabalho | #01101f | #f5f8f7 | 17,94:1 | passa (AAA) |
| Texto secundário sobre fundo de trabalho | #35484e | #f5f8f7 | 8,98:1 | passa (AAA); o documento pede "perto de 7:1" |
| Ação primária como texto, ícone ou borda sobre fundo de trabalho | #145453 | #f5f8f7 | 8,11:1 | passa (AAA) |
| Fundo de trabalho como rótulo sobre ação primária | #f5f8f7 | #145453 | 8,11:1 | passa (AAA) |
| Destaque sobre tinta (barra lateral) | #1ed8cf | #01101f | 10,75:1 | passa (AAA) |
| Tinta sobre destaque | #01101f | #1ed8cf | 10,75:1 | passa (AAA) |
| Linhas como texto claro sobre tinta | #d8e2df | #01101f | 14,49:1 | passa (AAA) |
| Tinta sobre linhas (faixa ou cabeçalho cinza) | #01101f | #d8e2df | 14,49:1 | passa (AAA) |
| Texto secundário sobre linhas | #35484e | #d8e2df | 7,25:1 | passa (AAA) |
| Ação primária sobre destaque, ou destaque sobre ação primária | #145453 | #1ed8cf | 4,86:1 | passa AA por 0,36 |
| **Destaque sobre fundo de trabalho** | #1ed8cf | #f5f8f7 | **1,67:1** | **reprova** como texto (4,5) e como ícone, borda ou foco (3) |
| **Linhas sobre fundo de trabalho** | #d8e2df | #f5f8f7 | **1,24:1** | **reprova** como borda de campo ou de controle (3); serve só como divisória decorativa |
| **Texto secundário sobre tinta** | #35484e | #01101f | **2,00:1** | **reprova** |
| **Ação primária sobre tinta** (botão primário ou item ativo na barra lateral) | #145453 | #01101f | **2,21:1** | **reprova** como componente (3) |
| **Texto secundário sobre ação primária** | #35484e | #145453 | **1,11:1** | **reprova** |
| Tinta sobre branco* | #01101f | #ffffff | 19,17:1 | passa (AAA) |
| Texto secundário sobre branco* | #35484e | #ffffff | 9,60:1 | passa (AAA) |
| Branco* sobre ação primária (rótulo de botão) | #ffffff | #145453 | 8,67:1 | passa (AAA) |
| Ação primária sobre branco* | #145453 | #ffffff | 8,67:1 | passa (AAA) |
| **Destaque sobre branco*** | #1ed8cf | #ffffff | **1,78:1** | **reprova** |
| **Branco* sobre destaque** | #ffffff | #1ed8cf | **1,78:1** | **reprova** |
| **Linhas sobre branco*** (borda de campo em cartão) | #d8e2df | #ffffff | **1,32:1** | **reprova** como borda de campo (3) |
| Fundo de trabalho contra branco* | #f5f8f7 | #ffffff | 1,07:1 | informativo: cartão branco não se separa do fundo sem contorno; a WCAG não exige |

\* Branco não é token do documento.

Leitura: os três pares de texto que o documento claramente pretende (texto principal, texto secundário, rótulo de botão primário) passam com folga. Os dois tokens sem regra de uso, destaque e linhas, reprovam em qualquer superfície clara.

### Pares que escolhi para os mockups (escolha minha, não do documento)

| Uso no mockup | Primeiro plano | Fundo | Razão | Resultado |
| --- | --- | --- | --- | --- |
| Barra lateral, item inativo | #d8e2df | #01101f | 14,49:1 | passa |
| Barra lateral, item ativo (texto) | #ffffff | #10293a | 15,00:1 | passa |
| Barra lateral, ícone e marca do item ativo | #1ed8cf | #10293a | 8,41:1 | passa |
| Barra lateral, texto de apoio | #a9bcb8 | #01101f | 9,65:1 | passa |
| Barra lateral, fundo do item ativo contra tinta | #10293a | #01101f | 1,28:1 | informativo: o estado ativo também tem marca em destaque, peso 600 e `aria-current` |
| Iniciais do avatar | #ffffff | #145453 | 8,67:1 | passa |
| Etiqueta "Confirmada" | #0f4544 | #dff1ef | 9,19:1 | passa |
| Etiqueta "A confirmar" | #6a4300 | #fbefd9 | 7,64:1 | passa |
| Etiquetas propostas em A04 (não aparecem nas imagens): informação, erro, neutro | #1d3d70, #8a1c13, #35484e | #e3ebf8, #fbe5e2, #e9eeed | 8,96:1, 7,72:1, 8,19:1 | passam |
| Barra de situações, "A confirmar" | #b07f00 | #f5f8f7 | 3,34:1 | passa (3) |
| Barra de situações, "Confirmada" | #145453 | #f5f8f7 | 8,11:1 | passa |
| Barra de situações, "Concluída" | #3565b0 | #f5f8f7 | 5,40:1 | passa |
| Barra de situações, "Faltou" | #c0362c | #f5f8f7 | 5,16:1 | passa |
| Barra de situações, "Cancelada" | #74858a | #f5f8f7 | 3,60:1 | passa (3) |
| Barra de situações, "A confirmar" no bloco selecionado | #b07f00 | #dff1ef | 3,05:1 | passa (3) no limite |
| Bloco selecionado, texto | #01101f | #dff1ef | 16,40:1 | passa |
| Bloco selecionado, contorno | #145453 | #dff1ef | 7,42:1 | passa |
| Cabeçalho do dia de hoje, texto principal e secundário | #01101f, #35484e | #eaf4f2 | 17,09:1, 8,55:1 | passam |
| Gráfico, série "Centro" | #008f88 | #ffffff | 3,97:1 | passa (3) |
| Gráfico, série "Jardim América" | #c2620f | #ffffff | 4,16:1 | passa (3) |
| Botão desabilitado ("Anterior") | #5f7074 | #f5f8f7 | 4,84:1 | passa; a WCAG isenta controle desabilitado |
| Contorno de foco (no CSS, não aparece na imagem) | #145453 | #ffffff e #f5f8f7 | 8,67:1 e 8,11:1 | passa |
| **Borda de campo, de botão secundário e de bloco** (segui o documento: única cor de borda é "linhas") | #d8e2df | #ffffff | **1,32:1** | **reprova** (3); ver A05 |

Separação entre as 5 cores da barra de situações para daltonismo: testei 9 combinações numa ferramenta heurística e nenhuma passou em todos os pares (ver A03). Não é critério WCAG; reforça que a barra não pode depender só de cor.

## O que está bom

- **Processo em duas etapas com parada e autorização por ação** (L38–47, L52): "A aprovação de uma tela não aprova as outras" e "cada autorização vale só para aquela ação" são inequívocos.
- **Relato fiel** (L53, L143): manda declarar teste instável, o que não foi verificado e o que a prova não cobre; e prevê saída para quem não gera imagem (L42).
- **Listas com número e teste** (L83–85, L140, L155): tamanho de página por tipo de lista, faixa "1–8 de 124", totais sobre o filtro inteiro e um teste que mede altura do documento contra a janela. É a parte mais reproduzível do documento.
- **Estado na URL com saneamento** (L88) e **formulários** (L94–95, L160): foco no campo com erro, conservação do que foi digitado, trava de envio duplo no ViewModel com idempotência no Model.
- **Estados de tela mais painel para simular falhas** (L104): torna testável o que normalmente fica sem teste.
- **Linguagem financeira e de dados** (L106, L116, L122): "valor apresentado não é valor recebido", "desconhecido não é zero", centavos inteiros.
- **Gráficos** (L102): tabela alternativa, mesma escala entre séries, zero sem altura artificial.
- **Piso de acessibilidade acima do mínimo** (L108): 44 px (a WCAG 2.2 AA pede 24), `prefers-reduced-motion`, foco devolvido ao fechar diálogo, hierarquia de títulos; reflow em 320 px e 720 px entram nos testes (L139).
- **Fronteiras de arquitetura impostas por lint** (L70) e **armadilhas concretas** (seção 8). Conferi L162: o `Intl.NumberFormat` de pt-BR separa "R$" do número com U+00A0 e `\s` casa; espaço comum não casa.
- **Contraste dos pares principais**: 17,94:1, 8,98:1 e 8,67:1.

## Os mockups

- `mockup-1` é o painel inicial; `mockup-2` é a agenda. Escolhi a agenda porque L100 a descreve com regras próprias (bloco por horário, barra de situações, painel lateral de 4 por página, aviso de registros fora da área) e é onde as contradições A03 e A09 ficam visíveis.
- Produto fictício para a seção 1: "Aurora Odontologia", duas unidades, dados inventados.
- Renderização em 1366 × 768, que o documento fixa como referência (L77). Medido por script nas duas telas: documento de 1366 × 768 sem rolagem, IBM Plex Sans carregada nos pesos 400, 500 e 600, nenhum texto visível abaixo de 14 px, todos os controles (21 e 64) com 44 px ou mais nas duas dimensões, nenhum transbordo horizontal.
- Na agenda, a grade mede 728 × 450 px e mostra 9 passos de 30 min (08:00 a 12:30). Na área útil de uma janela de 1366 × 768 no Chrome headless (1348 × 672), a grade cai para 354 px: 7 passos completos, 3,5 h.

### Onde segui o documento mesmo com erro apontado

1. Borda de campo, de botão secundário e de bloco em "linhas" #d8e2df: 1,24 a 1,32:1 (A05).
2. Barra de situações só com cor dentro do bloco (A03). Legenda e painel lateral atenuam; a barra continua dependendo de cor.
3. Controles de 44 px e texto de 14 px ou mais na agenda: só 4,5 h do dia cabem (A09).
4. 1366 × 768 tratado como área útil (A06).
5. Painel lateral com 4 registros por página, fixo (L84, L100): sobra altura e cada linha estica para 96 px.
6. Sem ordenação nas listas e sem barra superior global, porque o documento não prevê.

## Decisões que precisei tomar por omissão do documento

Cada item é um ponto em que o texto não disse o que fazer.

**Identidade e estrutura**

1. Produto, unidades e módulos da seção 1; usei os 8 módulos de L19 com "Pacientes" no lugar de "Cadastros".
2. Mantive os 6 tokens sem trocar nada. L79 manda "troque a cor de marca" e não diz qual token é a marca nem para qual cor.
3. Fundo da barra lateral em tinta #01101f. L79 diz só "escura".
4. Texto da barra lateral (#d8e2df inativo, branco ativo, #a9bcb8 de apoio), fundo do item ativo (#10293a) e marca em destaque. Usei destaque só sobre tinta.
5. Superfície de cartão branca, contorno de 1 px em "linhas", sem sombra.
6. A que serve cada raio: 10 em campos, botões, blocos e itens de menu; 14 em cartões; 18 ficou sem uso (reservei a diálogos).
7. Escala tipográfica (26/32, 18/24, 16/22, 14/20, 30/36) e pesos 400, 500 e 600.
8. O que é "rótulo" (16 px) e o que é "auxiliar" (14 px): pus em 14 px o texto do bloco da agenda, etiquetas, legenda, eixos, definições, contagem por dia e as linhas 2 e 3 de cada registro.
9. Largura da barra lateral (232 px), margens (20 e 24 px) e intervalos (14 e 16 px).
10. Ícones: desenhei em SVG, traço de 1,8 px, 20 px. O documento não cita ícones.
11. Onde ficam usuário e unidade: rodapé da barra lateral, sem barra superior.
12. Fonte pelo Google Fonts só para renderizar. L58 pede fonte servida localmente.
13. Foco: contorno de 3 px em ação primária com 2 px de afastamento.
14. A tela não rola: aplicativo com a altura da janela. O documento só exige isso de listas.
15. Rótulo do filtro à esquerda do campo, não acima (economiza 24 px de altura).

**Painel**

16. Ação principal do painel: "Agendar consulta".
17. Quais abas: Atendimento, Financeiro, Estoque.
18. Quais indicadores (4) e a definição de cada um, contra L54, que proíbe criar indicador não pedido.
19. Tipo de gráfico (colunas agrupadas por unidade), eixo de 0 a 30 e lugar do alternador "Gráfico / Tabela".
20. Cores das séries: #008f88 e #c2620f. Com os tokens do documento, destaque daria 1,78:1.
21. Rótulo direto só no pico, em hoje e nos zeros; zero escrito "0", sem coluna.
22. Formato da pendência: frase com a quantidade, linha de apoio e atalho com verbo e objeto.
23. Linha "Dados até hoje, sexta, às 10:20".

**Agenda**

24. Visão semanal de segunda a sábado, início às 08:00, passos de 30 min, 48 px por passo.
25. Conteúdo do bloco: "N consultas" em 14 px/600 e barra de 6 px, em bloco de 44 px.
26. Barra: segmentos proporcionais à contagem, ordem fixa, 2 px entre eles.
27. Conjunto e nomes das situações (A confirmar, Confirmada, Concluída, Faltou, Cancelada), suas cores e a legenda acima da grade.
28. "Atalhos de período" lido como Hoje, Esta semana e Próxima semana, mais setas de semana anterior e seguinte.
29. Aviso de registros fora da área: faixa sob a grade com a contagem e o botão "Ver a tarde".
30. Painel lateral: 340 px, alternador "Horário 11:00 / Dia inteiro", registro em 3 linhas, ordem alfabética por paciente.
31. Ação da linha como botão de ícone de 44 px com nome acessível, porque texto com verbo e objeto não cabia (tensão com L106).
32. Realce de hoje (coluna tingida e "· hoje" em texto) e do bloco escolhido (contorno de 2 px e fundo #dff1ef).
33. Filtro de profissional como botão que abre diálogo de busca (L98); unidade como `select`.
34. Cabeçalho de dia clicável, com o total de consultas do dia.
35. Aparência do botão desabilitado.

## O que não consegui verificar

- **O Dental Flow em si.** Não tenho acesso ao projeto: não sei se o texto descreve fielmente o que foi construído.
- **Versões atuais** de React, Vite, Playwright e axe: não consultei a internet; afirmo só que existem e são compatíveis entre si.
- **Altura útil em navegador com interface** numa tela física de 1366 × 768: medi só no Chrome headless (1348 × 672).
- **Em qual versão do Node** `node --test` passou a aceitar `.ts`: testei só a 24.19.
- **Leitor de tela e teclado nos mockups:** são HTML estático; a marcação tem nomes acessíveis e títulos, mas não foi testada com tecnologia assistiva nem com axe.
- **Telas de celular (375 px), reflow (320 px) e zoom de 200%:** não produzi; o pedido era de duas imagens de desktop.
- **Separação de cores para daltonismo:** veio de ferramenta heurística, não de critério WCAG.
