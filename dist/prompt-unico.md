# Kit de frontend (versão 3.1.0): prompt único

Cole este arquivo numa conversa com qualquer LLM. Tudo o que o texto cita em `references/` está incluído abaixo. Sem acesso a arquivos ou terminal, a resposta entrega o HTML e os comandos e diz o que não pôde executar. Os estilos de partida e os scripts ficam no repositório.


# Kit de frontend

Objetivo: entregar uma interface que o dono aprova sem rodadas de refatoração, que tem cara própria e que todos conseguem usar.

O retrabalho nasce de cinco causas, e cada etapa abaixo ataca uma: visual decidido sem saber o que a marca quer dizer; código antes da direção visual aprovada; gosto que precisa ser repetido a cada projeto; qualidade autodeclarada sem medição; correção feita numa tela e esquecida nas outras.

## Antes de qualquer coisa

1. Leia `references/gosto/perfil.md` e `references/gosto/correcoes-coletadas.md`. O resto, só quando a etapa pedir: cada arquivo aberto custa contexto e limite de uso. Num teste real, ler tudo no início levou o contexto a 275 mil tokens. Scripts são para rodar, não para ler.
2. No projeto, leia o que existir: `design/correcoes.md`, `DESIGN.md`, `MARCA.md`, `PRODUTO.md`.
3. Em caso de conflito, vale esta ordem:
   1. O piso de `references/qualidade/acessibilidade.md`. Se um pedido bater nele, avise e proponha uma saída.
   2. O pedido explícito nesta conversa.
   3. `design/correcoes.md`.
   4. `DESIGN.md` e `MARCA.md`.
   5. `references/gosto/perfil.md`.
   6. `references/padroes/`.
   7. O estilo de partida, com as ressalvas de `references/recursos/estilos.md`.

## Escolha o caminho

| Situação | Caminho |
| --- | --- |
| Projeto sem telas e sem `DESIGN.md` | Etapas 1 a 8 |
| Produto existente sem `DESIGN.md`, ou "está com cara de IA" | Rode a verificação nas telas atuais, mostre o diagnóstico com capturas e siga as etapas 1 a 8. Se já há marca, a etapa 2 a documenta |
| Pedido de marca, identidade ou brief | Etapa 1, etapa 2 e o kit da etapa 4 |
| Tela nova com `DESIGN.md` aprovado | Etapas 6 a 8 |
| Ajuste pontual | Etapas 6 a 8, só na tela e nas iguais a ela |
| Pedido só de revisão | Etapa 7, sem alterar nada |

## As etapas

### 1. Entender

Crie `PRODUTO.md` a partir de `assets/modelos/produto.md`. Deduza o que puder do código e dos documentos. Pergunte no máximo 5 coisas, cada uma com a sua recomendação, e só o que muda decisão de tela.

### 2. Marca: portão

Defina o que o produto quer dizer antes de desenhar. Siga `references/marca/criar-marca.md`: crie `MARCA.md` a partir de `assets/modelos/marca.md` (exemplo em `assets/exemplos/marca.md`), no tamanho certo para o projeto. Personas sem pesquisa ficam marcadas como hipótese, e todo item precisa dizer o que muda na tela. Confira com `scripts/conferir-marca.mjs`. Se a pessoa não tem fonte, cor, voz nem mensagem, siga "Quando a pessoa não tem nada": perguntas que qualquer um responde e opções para escolher, nunca "qual é a sua mensagem?".

Mostre um resumo de até 10 linhas. **Pare e espere a confirmação.**

### 3. Três direções: portão

Sem código de produção antes da escolha. Cada direção expressa o `MARCA.md`. Siga `references/marca/identidade.md` e `references/marca/criatividade.md`, e confira `references/marca/anti-generico.md`. Para imagem, vídeo, 3D e animação, veja `references/recursos/bibliotecas.md`; o que você não puder gerar vai para `design/midia.md` (modelo em `assets/modelos/midia.md`).

- Em `design/direcoes/`: a tela mais usada do produto, com os mesmos dados, em três arquivos HTML estáticos que diferem em tipografia, composição e cor, não só na cor. Gere cada paleta com `scripts/paleta.mjs`. Sem fonte definida, escolha com `references/recursos/fontes.md`.
- Rode a verificação nas três e corrija as falhas.
- Mostre as imagens em 1440 × 900 e 375 × 812, com nome, conceito em uma frase, elemento-assinatura e a sua recomendação. Texto mínimo: quem decide olha a imagem.

**Pare e espere a escolha.** Misturas são bem-vindas. Se o dono rejeitar as três, pergunte o que incomodou, registre em `design/correcoes.md` e refaça.

**Dono ausente.** Se ele disse que não pode responder ("decide você e segue"), não pare nos portões: siga com a sua recomendação e marque a escolha como provisória no `DESIGN.md`. A ordem não muda: `DESIGN.md` vem antes do código. Na entrega, mostre as direções não escolhidas, para ele poder trocar.

### 4. Travar

Escreva `DESIGN.md` a partir de `assets/modelos/design.md` (exemplo preenchido em `assets/exemplos/design.md`) e gere o arquivo de tokens da stack do projeto. Rode `scripts/contraste.mjs DESIGN.md`. Toda cor e todo tamanho usados daqui em diante vêm dele.

Faça o kit de identidade em `design/marca/` (logotipo em curvas, ícone, fontes, manual de uma página), como em `references/marca/criar-marca.md`. Diga com franqueza o que ficou fraco: um símbolo pode precisar de um designer.

### 5. Tela-modelo: portão

Em código real: a casca (navegação nas larguras de `references/padroes/navegacao.md`) e a tela da etapa 3, com carregando, vazio, erro e sucesso. Rode a verificação e mostre as capturas.

**Pare e espere a aprovação.** É aqui que o retrabalho fica barato: uma correção agora vale para todas as telas seguintes.

### 6. Construir

No máximo 3 telas por entrega. Antes de cada tela, leia o padrão correspondente:

| Tela ou peça | Leia |
| --- | --- |
| Lista, tabela, busca, filtro | `references/padroes/lista-tabela.md` |
| Formulário, cadastro, passo a passo | `references/padroes/formulario.md` |
| Escolha entre opções, dropdown | `references/padroes/selecao.md` |
| Menu, casca, responsividade | `references/padroes/navegacao.md` |
| Painel, indicadores, gráfico | `references/padroes/painel.md` |
| Agenda, calendário | `references/padroes/agenda.md` |
| Carregando, vazio, erro | `references/padroes/estados.md` |
| Aviso, confirmação, desfazer | `references/padroes/retorno.md` |
| Landing, site, tela de marca | `references/padroes/landing.md` e `references/marca/criatividade.md` |
| Escolher biblioteca, ícone, animação, 3D, gerar mídia | `references/recursos/bibliotecas.md` |
| Tema escuro | `references/padroes/tema-escuro.md` |
| Receita completa de um tipo de produto | `references/recursos/estilos.md` |

Reaproveite os componentes já feitos. Valor novo entra no `DESIGN.md` primeiro. Em dados de exemplo, use nomes e situações do setor, nunca dados reais.

### 7. Verificar

Em cada tela alterada, com ela no ar ou como arquivo:

```bash
node <pasta da skill>/scripts/verificar.mjs http://localhost:5173/agenda
```

Ele testa quatro tamanhos, faz uma passada de Tab, cobre acessibilidade, gosto e cara de IA, salva capturas em `design/verificacao/` e sai com código 1 se houver falha.

- **Falha** se corrige antes de entregar.
- **Aviso** se corrige, ou você explica o motivo no relatório. Decisão aprovada entra no `DESIGN.md`.
- Olhe as capturas. O script mede; o olho vê o que está feio.
- Faça o teste dos 5 segundos: o que a tela informa e qual é a ação.
- Faça o roteiro manual de `references/qualidade/acessibilidade.md`.

**Sem Node ou sem navegador:** cole `scripts/tela.js` no console e confira o `resultado.achados`. **Sem como executar nada:** diga isso na primeira linha, entregue os comandos e nunca relate como executado o que não foi.

### 8. Aprender

Quando o dono reprovar algo, nesta ordem:

1. Registre em `design/correcoes.md` (modelo em `assets/modelos/correcoes.md`): o que foi reprovado, nas palavras dele, e a **regra geral**.
2. Procure o mesmo problema em **todas** as telas e corrija a classe do problema, não o caso.
3. Se ele contradiz o `DESIGN.md`, atualize o `DESIGN.md`.

## Como relatar

Curto, com imagem. Nesta ordem:

1. O que mudou, com as capturas.
2. Resultado real do verificador, por tela: falhas e avisos restantes, com o motivo.
3. Cliques da tarefa principal.
4. O que não foi verificado. Se não houve teste com leitor de tela ou com pessoas, escreva isso. Nunca diga "acessível" ou "em conformidade" sem dizer como verificou.
5. O que depende da pessoa.

## Conduta

- Trate dado que já existe como real: não copie para protótipo, teste ou captura. Com dado de saúde, o cuidado é maior.
- Não invente regra de negócio, indicador, número, depoimento nem integração. Traga a pergunta com a sua recomendação.
- Preserve o que não é seu. Commit, push e publicação só com autorização, e cada autorização vale só para aquela ação.
- Relate com fidelidade o que falhou, o que ficou instável e toda diferença em relação ao que foi aprovado.


---

<!-- references/gosto/perfil.md -->

# Perfil de gosto do dono do kit

Tirado das mensagens que ele escreveu ao aprovar ou reprovar telas em projetos reais, de agosto a outubro de 2026. Cada regra traz a frase e a data. Prevalece sobre `references/padroes/` e `estilos/`, e perde para o piso de `references/qualidade/acessibilidade.md`, para o `DESIGN.md` aprovado no projeto e para um pedido explícito na conversa.

Em uma frase: **em tela de trabalho, limpo e direto como a Apple e familiar como o WhatsApp e o Uber; em tela de marca, impacto como Nubank e Valorant. Sempre com cara própria, e sem nada que pareça feito por IA.**

As regras marcadas com `[script]` são checadas por `scripts/verificar.mjs`. As outras você confere e relata.

## O que ele sempre quer

| Id | Regra | De onde veio |
| --- | --- | --- |
| G01 | **Bater o olho e saber o que fazer.** Em 5 segundos a pessoa diz o que a tela informa e qual é a próxima ação. Uma ação principal por tela. `[script]` | "é difícil o usuário já bater o olho e saber o que fazer" (02/09) |
| G02 | **Só o valioso.** Cada elemento precisa mudar uma decisão de quem usa. Espaço não é para preencher. Tire indicador, gráfico e texto que não mudam nada. | "queremos que tenha apenas o valioso, não precisa preencher espaços" (02/09); "elimine da dashboard coisas que não geram valor" (01/10) |
| G03 | **Pouco texto.** Título curto, sem subtítulo explicativo por padrão. Indicador é rótulo e número. `[script]` | "muito texto em algumas partes, principalmente as KPI" (01/10) |
| G04 | **Poucos cliques na tarefa essencial.** Conte os cliques da tarefa mais frequente e relate o número. | "consegue fazer o agendamento em poucos cliques" (02/09) |
| G05 | **Claro por padrão, com cor interessante.** Tema claro é a base. Limpo não pode virar sem graça: a paleta tem decisão própria. | "esse tom mais claro encaixou perfeitamente" (02/09); "coloque cores mais interessantes" (09/10) |
| G06 | **Identidade antes de código, e nada de cara de IA.** Siga `references/marca/identidade.md` e `references/marca/anti-generico.md`. | "muito genérico, muita cara de IA" (09/10); "o sistema não tem identidade visual" (28/10) |
| G07 | **O computador usa a tela do computador.** Nada de layout de celular esticado ou encolhido num monitor. `[script]` | "parece que só pegou tudo que tava no celular e colou no PC, tem muito espaço livre" (20/08) |
| G08 | **Equilíbrio visual na área útil.** Página de largura limitada (formulário, edição, detalhe) fica centralizada na área útil. Nada termina à esquerda com um vazio grande à direita. `[script]` | "espaço muito grande sem conteúdo nenhum e não está centralizado"; "a grande maioria está mais alinhada para a esquerda" (28/10) |
| G09 | **Sem rolagem presa.** Nada de área com rolagem própria dentro de página que também rola. Coluna de detalhe acompanha a rolagem. `[script]` | "você tem que scrollar todos os pacientes do card ao lado primeiro" (28/10) |
| G10 | **Lista grande pagina.** Sempre com faixa e total. `[script]` | "algumas listas são muito grandes, coloque paginações" (28/10) |
| G11 | **Dado que cresce não vai em dropdown.** Use busca com sugestões. Lista suspensa só para opções fixas e poucas. `[script]` | "evite dropdown onde recebe bastante dados" (28/10) |
| G12 | **Tabela diz o que é cada dado.** Cabeçalho sempre; no celular, cada valor com o nome. `[script]` | "uma tabela que mostra os dados mas não fala que dados são" (28/10) |
| G13 | **Situações que não se confundem.** Cor próxima não basta: mude também forma, ícone e texto. Compare duas a duas as situações que ficam lado a lado. | "uma pessoa pode confundir o confirmado com o concluído" (28/10) |
| G14 | **Gráfico de bater o olho.** Rótulo direto no dado, no máximo duas séries sem pedido, e a frase que o gráfico responde como título. | "o gráfico de entrada e saída está confuso, bater o olho e já saber" (28/10) |
| G15 | **O sistema preenche por mim.** Endereço pelo CEP (ViaCEP), `autocomplete` em todo campo, nunca pedir de novo. Comece do contexto: clicar num horário vazio já abre o agendamento com o horário. | "ninguém merece ficar escrevendo todos os campos do endereço" (28/10) |
| G16 | **Familiar para quem só usa o celular.** Barra de abas, folha inferior, "Desfazer", lista de conversas. Copie o comportamento, nunca a aparência. | "pra ela tecnologia é Instagram, Uber, WhatsApp" (28/10) |
| G17 | **Logo não vai em quadradinho.** Nada de iniciais num quadrado colorido. Entregue versões da marca (positiva, negativa) e use a que respira no fundo. `[script]` | "a logo dentro desse quadrado fica muito feia" (28/10) |
| G18 | **Nada solto.** Todo controle pertence a um grupo com sentido. Ícone sozinho na barra precisa de motivo. | "achei meio estranho esse botão de pesquisa solto na navbar" (28/10) |
| G19 | **Estado e ação dizem a mesma coisa.** A situação escrita e o botão seguinte não podem parecer contraditórios. | "aparece se foi confirmado ou não, mas no botão está iniciar atendimento" (28/10) |
| G20 | **Responsivo de verdade.** Formulário longo é o que mais quebra: teste cada um em 375 e 320. `[script]` | "a tela de agendar consulta tem muitos erros de responsividade" (28/10) |
| G21 | **Tema escuro só com estudo.** Nunca inverta cores. Siga `references/padroes/tema-escuro.md` e mostre ideias antes de aplicar. | "esse modo escuro está muito feio"; "faça um estudo com outros do mercado" (09/10) |
| G22 | **Emoção quando o produto pede.** Em jogo e entretenimento, animação, som e imagem são o produto. Só de bater o olho a pessoa sabe o que é. | "sinto que falta emoção" (20/08) |

## Como ele decide

- **Por imagem, não por texto.** Mostre três propostas em imagem, com texto mínimo. "o core são as imagens, não exagere nos textos" (28/10).
- **Pega o melhor de cada proposta.** Escolher "a A com a agenda da B" é normal. Registre a mistura no `DESIGN.md`.
- **Decide com a equipe e o cliente.** Entregue as imagens num formato fácil de repassar (PDF ou página). Um pedido do cliente pode vetar parte da proposta: a agenda em grade, com horas num eixo e dias no outro, foi exigência.
- **Testa de verdade e volta com lista.** Quando ele reclama de uma tela, verifique todas: "tem várias páginas com esse mesmo problema".
- **Pede prova.** Diga o que rodou, com o resultado real, e o que não foi verificado.

## Calibração por imagem

Escolhas feitas olhando telas lado a lado. Cada linha é um sinal, não uma regra: vira regra quando se repete em outro produto.

| Data | Tela e opções | Escolha | O que sugere |
| --- | --- | --- | --- |
| 30/10/2026 | Tela Hoje de uma barbearia fictícia. A: lista como a de conversas. B: o salão por cadeira, com a listra do poste. C: cartaz com o próximo cliente | **B** | Prefere a tela organizada por algo real do negócio a uma lista genérica. Aceita tipografia com caráter e cantos retos num sistema de trabalho, quando têm função |

| 30/10/2026 | Tela principal de uma marmitaria fictícia: uma tela feita por agente sem o kit contra três direções feitas com ele | **A, lista e detalhe, a mais familiar** | Para uma dona que não entende de tecnologia, prefere o formato que ela já conhece, sem painel de indicadores e com pouco texto |

Nas duas vezes ele só deu a escolha, sem motivo: a coluna da direita é leitura do agente. Na primeira, a prancha recomendava a B, o que pode ter pesado. Na segunda, a prancha dizia qual tela vinha do kit, que é dele, e não recomendava nenhuma.

Hipótese a confirmar: a escolha muda com o público. Quanto menos familiaridade de quem usa, mais pesa o formato conhecido. A clínica aponta para o mesmo lado: em 28/10, o grupo preferiu a proposta "conversa".

## Referências que ele cita

| Referência | O que aproveitar | Contexto |
| --- | --- | --- |
| Apple | Limpeza, hierarquia, poucos elementos, tom claro | Pedido em 02/09 e origem do `base-design-system` |
| WhatsApp, Instagram | Lista de conversas, familiaridade | Público leigo |
| Uber, 99, iFood, GetNinjas | Fluxo direto, uma decisão por vez, escolha por cartões | População com níveis variados de letramento |
| EA FC | Menus com impacto, animação, imagem | Só para jogo |
| Nubank, C6, Itaú, 99, iFood Parceiros | Título enorme, cor de marca em área grande, foto real, um campo na primeira dobra | Citados em 30/10 como os que gosta, para criatividade |
| Valorant, Fortnite, Epic Store | Arte dominante, tipografia de impacto, escuro com cor forte | Citados em 30/10, para criatividade |
| Hyper3D, CozyGPU, Cequence | Produto em ação, ilustração própria, diagrama | Citados em 30/10, para criatividade |

Como aplicar essas referências está em `references/marca/criatividade.md`. Ele citou os sites sem dizer do que gosta em cada um: o "o que aproveitar" dessas três linhas é leitura do agente.

## Já reprovado

- Paleta índigo e lilás padrão do Tailwind (`#6366f1`, `#a5b4fc`, `#c7d2fe`): "muita cara de IA".
- Tema escuro por inversão de cores.
- Barra lateral escura com turquesa e cartões brancos iguais: o painel administrativo genérico.
- Tela densa, cansativa, com muita informação ao mesmo tempo.
- Marca dentro de quadrado colorido.

## Ainda sem resposta: pergunte uma vez e registre aqui

1. Há fontes que ele prefere ou detesta?
2. Tema escuro é desejado por padrão ou só quando o produto pedir?
3. Quanto de expressão ele aceita num sistema de trabalho? Em 30/10 escolheu a mais própria numa barbearia e a mais familiar numa marmitaria. Falta entender o que decide.
4. Do que exatamente ele gosta em cada site citado em 30/10? Mostre `references/marca/criatividade.md` e peça para ele marcar o que acertou e o que errou.

## Como este arquivo cresce

Correção recebida em projeto vai para `design/correcoes.md` (ver `SKILL.md`, etapa 8). O comando `kit coletar` junta as correções em `references/gosto/correcoes-coletadas.md`. Quando a mesma correção aparece em dois projetos, ela vira regra aqui.


---

<!-- references/marca/anti-generico.md -->

# O que denuncia interface genérica

Geradores repetem as mesmas escolhas porque são as médias do que viram. Cada item abaixo é um padrão a evitar **quando vem por inércia**. Com motivo escrito no `DESIGN.md`, qualquer um pode ser usado. `[script]` indica o que `scripts/verificar.mjs` detecta.

**O teste final:** cubra o logo e o nome. Dá para saber de quem é a tela? Se ela serviria para qualquer empresa de qualquer setor, não terminou.

**Um item isolado não é o problema.** Sites que o dono admira usam alguns destes: uma palavra do título em cor, Inter, Poppins. Eles compensam com imagem, escala ou ideia. O que denuncia é a soma, sem nada de próprio. Tirar todos os clichês também não basta: título de 48px, cor só no botão e nenhuma imagem é a outra cara do gerador. Veja `references/marca/criatividade.md`.

## Cor

- Índigo, violeta ou lilás da paleta padrão do Tailwind (`#6366f1`, `#4f46e5`, `#4338ca`). `[script: ia-indigo]`
- Paleta inteira de valores padrão do Tailwind ou do shadcn, sem nenhuma decisão. `[script: ia-paleta-padrao]`
- Gradiente de roxo para azul. Gradiente em texto. `[script: ia-gradiente-roxo, ia-texto-gradiente]`
- Quase preto com um acento neon.
- Creme com serifa e terracota: virou o novo padrão de quem foge do índigo.
- Cinza puro nos neutros, sem nenhum tom da marca.
- Texto cinza claro para parecer elegante. Passa do contraste antes de parecer elegante.

## Tipografia

- Inter, Roboto, Poppins ou Montserrat em tudo, sem decisão. `[script: ia-fonte-padrao]`
- Hierarquia só por tamanho, sem peso nem cor.
- Um rótulo pequeno, em caixa alta e espaçado, acima de cada título. `[script: ia-sobrancelha]`
- Uma palavra do título em cor ou gradiente diferente.

## Composição

- Três ou quatro cartões iguais, com ícone em quadradinho, título e duas linhas. `[script: ia-cards-iguais]`
- Cartão dentro de cartão. `[script: ia-cartao-em-cartao]`
- Tudo com o mesmo raio grande e a mesma sombra suave.
- Herói centralizado: título, subtítulo, dois botões e uma captura flutuando em perspectiva.
- Painel padrão: barra lateral escura, quatro indicadores em linha, gráfico de área, tabela de "recentes".
- Cartão com borda colorida só à esquerda. `[script: ia-borda-esquerda]`
- Seções alternando branco e cinza sem relação com o conteúdo.
- Pílula colorida para tudo que é etiqueta.

## Marca e ícones

- Iniciais ou ícone genérico dentro de um quadrado colorido no lugar do logo. `[script: g-logo-em-quadrado]`
- Ícone de faíscas para "inteligente", raio para "rápido", escudo para "seguro". `[script: ia-faisca]`
- Emoji no lugar de ícone. `[script: ia-emoji]`
- Um ícone do mesmo pacote padrão em cada item, mesmo quando o texto já diz tudo.

## Movimento

- A mesma animação de entrada em todas as seções.
- Cartão que sobe e ganha sombra em todo hover.
- Brilho e pulsação sem significado.

## Texto

- Frases vazias: "Transforme seu negócio", "Solução completa", "Sem complicação", "Bem-vindo de volta", "Sua jornada". `[script: ia-texto-cliche]`
- Tríades de adjetivos: "Simples. Rápido. Seguro."
- Números de vaidade inventados: "+10 mil clientes", "99,9%".
- Depoimentos falsos e logos de empresas que não são clientes.
- Subtítulo que repete o título com outras palavras.
- Linguagem de anúncio em tela de trabalho. Quem usa todo dia precisa de rótulo, não de promessa.
- Erro que não diz o que fazer.

## O que colocar no lugar

Volte a `references/marca/identidade.md`: conceito do mundo do produto, elemento-assinatura funcional, voz de quem é do setor. Substituir um clichê por outro não conta.

Dados de exemplo fazem parte da identidade. "João Silva", "Empresa ABC" e valores redondos denunciam tanto quanto a cor. Use nomes e situações que existiriam nesse negócio.


---

<!-- references/marca/criar-marca.md -->

# Marca: o que definir antes da tela

Sem isto, a identidade nasce de decisões de tela e vira gosto do momento. Aqui se define o que o produto quer dizer, para quem e contra quem. As direções visuais (`references/marca/identidade.md`) são formas de expressar a marca, não o ponto de partida.

Já existe marca? **Documente, não invente.** Preencha `MARCA.md` com o que existe e marque as lacunas.

## Tamanho certo

| Produto | Brief | Kit de identidade |
| --- | --- | --- |
| Pequeno negócio, ferramenta interna, demonstração | `curto`: uma página | Logotipo, cor e fonte |
| Produto para clientes | `completo` | Kit inteiro |
| Marca que vai investir no mercado | `completo` e personas com pesquisa | Kit como ponto de partida para um designer |

Na dúvida, comece curto. Um brief longo que ninguém lê não muda tela nenhuma.

## Quando a pessoa não tem nada

Quem não tem marca não consegue responder "qual é a sua mensagem?". Não pergunte o que ela não sabe. **Faça perguntas que qualquer um responde e, depois, ofereça opções para escolher.**

### Perguntas

1. O que você vende, e para quem? Como diria numa conversa.
2. Por que um cliente volta, ou por que indicaria você?
3. Cite de 2 a 4 sites ou aplicativos de que gosta, de qualquer setor, e um de que não gosta.
4. Quem faz a mesma coisa perto de você, ou o que seu cliente usa hoje?
5. Já existe algo que precisa ficar: nome, cor, logo, foto?

"Não sei" é resposta válida: siga com a sua proposta, marcada como hipótese.

### Referências

Meça o que a pessoa citou:

```bash
node scripts/medir-referencia.mjs https://site-de-que-ela-gosta.com.br
```

O script lista fontes, escala, cores, raios e mídia, sem clicar em nada. Diga o que os sites têm em comum e confirme: gostar de um site não é gostar de tudo nele. Se um site bloquear o acesso, peça uma captura à pessoa. Copie o raciocínio, nunca a marca.

### Opções para escolher

| Falta | O agente oferece | Como |
| --- | --- | --- |
| Nome | 5 opções, com o motivo de cada uma | O agente não confere registro: INPI e domínio ficam com a pessoa |
| Mensagem | 3 promessas, de ângulos diferentes | Uma frase cada |
| Personalidade | 3 conjuntos de três palavras | Cada conjunto com uma frase de exemplo |
| Voz | A mesma mensagem de erro, em 3 tons | É mais fácil escolher lendo do que definindo |
| Cor | 3 paletas | 3 cores vindas do mundo do produto, longe dos concorrentes: `node scripts/paleta.mjs "#cor" --evitar "#concorrente"` |
| Fonte | 3 candidatas | `references/recursos/fontes.md` |
| Logotipo | 3 logotipos tipográficos | `scripts/logotipo.py`, com cada candidata de fonte |

Junte para não cansar. Mensagem, personalidade e voz vão numa única rodada, em texto curto. Cor, fonte e logotipo aparecem juntos nas três direções: ninguém escolhe bem uma paleta no abstrato. Se a pessoa disser "escolhe você", decida e marque como provisório.

Diga a verdade sobre o resultado: é um bom ponto de partida, feito em horas. Não substitui um estúdio de marca, e a escolha precisa ser testada com gente do público.

## Como conduzir o brief

1. **Deduza primeiro:** código, documentos, site atual e conversa.
2. **Pergunte no máximo 5 coisas**, cada uma com a sua recomendação. Pergunte por escolha e por exemplo, não por adjetivo: "Se o produto fosse uma pessoa do setor, quem seria?", "Qual concorrente você não quer parecer?", "O que um cliente diria ao indicar?".
3. **Escreva `MARCA.md`** a partir de `assets/modelos/marca.md`. Veja o nível esperado em `assets/exemplos/marca.md`.
4. **Mostre um resumo de até 10 linhas e espere a confirmação.** Quem decide não lê brief longo.

## Regras do brief

**Todo item muda uma decisão.** A seção "O que isso muda na tela" é obrigatória: "Usa com a mão suja → alvo de 48px". Se nada muda, corte. Hobby e foto de persona não mudam nada.

**Personalidade com custo.** Três palavras, cada uma com o que ela recusa: "Direta, não seca". Palavras que qualquer concorrente diria não valem: moderno, inovador, confiável, simples, premium, profissional.

**Tom em quatro dimensões.** Marque onde o produto fica em cada uma: formal ou casual, sério ou engraçado, respeitoso ou irreverente, neutro ou entusiasmado. O tom varia com o momento: um erro é mais sério que uma boas-vindas. A personalidade não muda.

**Personas: poucas, e honestas sobre a base.**

| Base | O que é | Como tratar |
| --- | --- | --- |
| `hipótese` | Suposição, sem pesquisa | É o padrão do agente. Pode reforçar uma premissa errada: diga como validar |
| `pesquisa` | Entrevistas com pessoas reais; de 5 a 30 já ajudam | Cite quantas |
| `dado` | Pesquisa em escala ou uso real do produto | Cite a fonte |

De 1 a 3 personas: objetivo, medo, contexto de uso e familiaridade com tecnologia. Sem dados reais de pessoas.

**Concorrentes olhados de verdade.** De 3 a 5, incluindo o que a pessoa usa hoje, mesmo que seja caderno ou WhatsApp. Abra as telas e anote cor, fonte e tom. Sem acesso, marque "não verificado". Termine dizendo qual é o espaço livre: o que ninguém ocupa e faz sentido para este produto.

**Sem promessa falsa.** Não invente número, prêmio nem depoimento.

## Kit de identidade

Faça **depois** da escolha da direção (etapa 4 da skill), para não desenhar logo de uma direção descartada.

| Peça | Arquivo | Regra |
| --- | --- | --- |
| Logotipo | `design/marca/logo-positivo.svg`, `logo-negativo.svg` | Em curvas, sem `<text>`. Legível com 24px de altura. 3:1 contra o fundo. Sem iniciais em quadrado (G17) |
| Ícone | `design/marca/icone.svg` | Funciona em 16 e 32px, como ícone de aba e de aplicativo |
| Cor, tipografia, forma | `DESIGN.md` | Valores e motivos, com contraste calculado |
| Fontes | `design/marca/fontes/` | WOFF2 com subconjunto latino e o arquivo de licença ao lado |
| Imagem e ilustração | `design/midia.md` | Um estilo único. Ver `references/recursos/bibliotecas.md` |
| Voz | `MARCA.md` | Frases reais de botão, vazio, erro e sucesso |
| Manual | `design/marca/manual.html` | Uma página: logotipo e usos errados, cor, tipo, voz e o que não fazer |
| Aplicações | No manual | A marca em uma tela real, um post quadrado e o ícone do aplicativo |

Confira com `node scripts/conferir-marca.mjs` e rode `scripts/verificar.mjs` no manual.

## Logotipo: o que esperar

Um agente resolve bem o **logotipo tipográfico**: o nome, numa fonte escolhida, com um detalhe próprio. É o caminho padrão.

```bash
python scripts/logotipo.py fonte.ttf "Nome" design/marca/logo-positivo.svg --peso 700 --cor "#14304f"
```

O script não aplica kerning. Olhe o resultado e ajuste com `--espaco`. Sem logo definido, gere 3 versões com fontes diferentes e mostre cada uma com 24 e 64px de altura, sobre fundo claro e escuro. Um logotipo que só funciona grande está reprovado.

Um **símbolo** só se tiver ideia simples, do mundo do produto: uma forma geométrica, poucos traços. Se sair genérico, diga. Não entregue um símbolo fraco só para ter um. Para símbolo memorável, indique gerador de imagem ou designer, e registre em `design/midia.md`.

## Fonte: três níveis

| Nível | O que é | Quem faz |
| --- | --- | --- |
| 1 | Fonte aberta pouco usada, com escala e peso marcantes (`references/recursos/fontes.md`) | O agente. É o padrão |
| 2 | Logotipo próprio e fonte aberta adaptada | O agente, com revisão de quem entende |
| 3 | Família exclusiva, do zero | Um designer de tipos, quando o produto justificar |

Na SIL Open Font License (a da maioria das fontes do Google Fonts), pode modificar e usar comercialmente, sem vender a fonte sozinha e mantendo a licença junto. Versão modificada não pode usar o Nome Reservado, se a fonte tiver um. Um logotipo feito com a fonte é um documento criado com ela, e a licença não o alcança. Confira a licença de cada fonte. Isso é leitura técnica, não parecer jurídico.

## Depois do brief

- Cada direção de `references/marca/identidade.md` precisa expressar `MARCA.md`. Direção que contradiz o brief sai, por mais bonita que seja.
- O `DESIGN.md` cita a marca e explica como cada escolha a expressa.
- Se o dono escolher contra o brief, é o brief que está errado: pergunte o motivo e atualize.


---

<!-- references/marca/criatividade.md -->

# Criatividade: o que os sites admirados fazem

Medido em 11 sites que o dono do kit citou como os que gosta bastante, em 30/10/2026: Nubank, C6, Itaú, 99, iFood Parceiros, Valorant, Fortnite, Epic Store, Hyper3D, CozyGPU e Cequence. Os números estão em `docs/pesquisa/referencias-sites.md`, no repositório do kit. Copie o raciocínio, nunca a marca, a fonte, a imagem ou o texto.

## Primeiro, a superfície

| Superfície | Exemplos | Expressão |
| --- | --- | --- |
| **Marca** | Landing, site, página de produto, abertura de app, jogo | Alta. Aplique tudo abaixo |
| **Trabalho** | Sistema, painel, cadastro, tela usada o dia inteiro | Contida. `references/gosto/perfil.md` manda (G01 a G03). Use uma ou duas ideias daqui, como escala no dado principal e o elemento-assinatura |
| **Tarefa curta** | Cadastro, pagamento, passo a passo | Baixa no meio do fluxo. Marca na abertura e na conclusão |

## O que levar

### 1. Título muito maior do que parece seguro

Marcas grandes medidas usam títulos de 54 a 156px no computador. Um gerador costuma parar em 48px. Na superfície de marca, comece em 72px no computador e reduza com `clamp()` em `rem` e `vw`, sem quebrar em 320px.

### 2. Peso extremo, não médio

C6 usa peso 300 em 100px; Valorant, uma condensada pesada em caixa alta; Nubank, 600 em tamanho enorme. Peso 600 em tamanho médio é o que todo mundo faz. Escolha um extremo e fique nele.

### 3. A fonte carrega a marca

Nubank, C6, Itaú, iFood, 99, Valorant e Fortnite usam tipografia própria ou pouco comum. Sem orçamento para isso, escolha uma família gratuita, pouco usada e com personalidade, para os títulos. Os que usam Inter, Poppins ou Montserrat (Epic, Hyper3D, Cequence) compensam com imagem forte.

### 4. Cor de marca em área grande

99 pinta metade da primeira dobra de amarelo; Nubank usa faixas inteiras em roxo; iFood, vermelho; Valorant, vermelho e um quase branco quente. A cor não fica só no botão. Regra de partida na superfície de marca: de 20 a 50% da primeira dobra, ou uma faixa de ponta a ponta por página.

O problema nunca foi a cor em si. O roxo da Nubank é da Nubank; o índigo padrão do Tailwind não é de ninguém. Veja que cor os concorrentes do setor usam e escolha outra.

### 5. Imagem real manda

Nove dos onze sites têm foto, arte ou render ocupando boa parte da primeira dobra: gente de verdade nos bancos e na 99, personagens nos jogos, o próprio resultado na Hyper3D. É o que um agente menos entrega. Siga `references/recursos/bibliotecas.md`: material real, depois gerado com estilo único, depois ilustração própria.

Texto sobre foto precisa de escurecimento calculado. Sem isso, reprova em contraste.

### 6. Ilustração própria e barata

CozyGPU não usa foto: cada modelo tem um desenho de linha fina sobre preto, com um único ponto laranja. Um gesto repetido virou identidade. **Um agente consegue fazer isso em SVG.** É a melhor saída quando não há foto: defina uma regra simples (traço, cor, um detalhe que se repete) e siga em todos os desenhos.

### 7. Forma extrema e coerente

Valorant usa raio zero. Nubank, pílula em tudo. A 99, cantos de 72px em imagem. O genérico fica no meio: 8 a 12px em tudo. Escolha um extremo, com motivo.

### 8. Mostre o produto funcionando

Hyper3D mostra a entrada e o resultado; Cequence, um diagrama do que o produto faz. Vale mais que três cartões de benefícios. Em sistema, mostre a tela real com dados reais.

### 9. Uma ação na primeira dobra

Nubank e iFood Parceiros colocam o primeiro campo do cadastro direto na primeira dobra. Peça uma coisa só, com finalidade e política à vista.

### 10. Frase curta, com posição

Poucas palavras, uma promessa que só aquela empresa faria. Depois, prova concreta: número real, com unidade e fonte. Número inventado é pior que nenhum.

### 11. Ritmo por contraste

As páginas alternam faixa de cor cheia, branco e imagem de ponta a ponta. Mude a composição a cada bloco, não só o fundo.

### 12. Tema escuro é decisão de setor

Jogos e ferramentas de IA abrem em escuro (Fortnite, Epic, Valorant, Hyper3D, CozyGPU); C6 usa o preto como sinal de exclusividade. Serviço de massa abre em claro (Nubank, 99, iFood, Itaú). Sistema de trabalho do dono segue claro por padrão (G05).

## O que não levar

Esses sites também têm problemas medidos. Não copie:

- Avisos de cookies que cobrem boa parte da tela: o piso de `references/qualidade/acessibilidade.md` prevalece.
- Texto muito pequeno. Hyper3D chega a 7,2px, e CozyGPU a 11px.
- Carrossel como herói: esconde o conteúdo. Só com pausa e quando indispensável.
- Títulos vagos e densidade de anúncio numa tela de trabalho.

## Como usar nas três direções

Numa superfície de marca, ao menos uma direção precisa aplicar de verdade os itens 1, 4 e 5. Se todas ficarem com título de 48px, cor só no botão e sem imagem, refaça: essa é a cara média de gerador, mesmo sem nenhum clichê da lista de `references/marca/anti-generico.md`.

Identidade exigente não dispensa o piso: contraste, foco, teclado, zoom e movimento reduzido continuam valendo.


---

<!-- references/marca/identidade.md -->

# Como criar identidade

Identidade não é trocar a cor do botão. É a soma de decisões que fazem a tela ser reconhecida sem o logo. Princípio que resolve o conflito entre "usar o padrão do mercado" e "ter cara própria":

> **Convenção na interação, identidade na expressão.**
> Como navegar, preencher, filtrar e confirmar segue o que a pessoa já conhece (`references/padroes/`). Tipografia, cor, forma, composição, imagem e voz são do produto.

Parta de `MARCA.md` (`references/marca/criar-marca.md`): cada direção é uma forma diferente de expressar a mesma marca. Depois, defina a superfície em `references/marca/criatividade.md`. Numa tela de marca, a expressão vai muito mais longe do que numa tela de trabalho.

## O que precisa existir numa direção

| Dimensão | Decida | Teste |
| --- | --- | --- |
| Conceito | Uma frase vinda do mundo do produto, com uma tensão: "X, mas Y" | Faria sentido em outro setor? Então é genérica |
| Tipografia | 1 ou 2 famílias e o porquê. Confira `ã õ ç á é` e os números | A primeira fonte que você pensou é a de sempre? Troque |
| Cor | Um matiz de marca, a temperatura dos neutros e o papel de cada cor | Neutros tingidos pelo matiz, não cinza puro. Contraste calculado |
| Forma | Raios, linhas e sombras, com uma regra só | Um raio igual em tudo é falta de decisão |
| Composição | Grade, densidade, alinhamento e o que é herói | Dá para distinguir da grade de cartões padrão? |
| Elemento-assinatura | Uma coisa funcional que só este produto teria | Se tirar, a tela vira qualquer outra? Então é ela |
| Voz | Como o produto fala: 3 frases reais de botão, vazio e erro | Soa como pessoa do setor, não como anúncio |
| Imagem | Foto, ilustração ou nenhuma, e com qual tratamento | Sem imagem de banco nem blob decorativo |

## Exemplos de elemento-assinatura

Saídos dos produtos do dono: agenda como lista de conversas com a linha "Agora" atravessando o dia; situações com forma própria (vazado, cheio, hachurado). O elemento resolve um problema real e, por isso, ninguém o confunde com enfeite.

Direção aprovada por ele em 30/10/2026, numa barbearia fictícia: o salão visto por cadeira, com a listra do poste marcando a ocupada. Veja `assets/exemplos/design.md`.

Uma pergunta que costuma render: **qual é a unidade real do trabalho?** Cadeira, sala, mesa, caminhão, turma. Organizar a tela principal por ela, em vez de uma lista genérica de registros, tende a dar composição própria e leitura de bater o olho.

## Método

1. **Mundo do produto.** Liste 10 coisas concretas do setor: materiais, ferramentas, documentos, lugares, gírias, rituais. Numa barbearia: navalha, espelho, ficha de papel, cadeira, listras. Use as palavras de `PRODUTO.md` e o espaço livre de `MARCA.md`.
2. **Três conceitos, em dimensões diferentes.** Não são três cores do mesmo layout: pelo menos tipografia, composição e cor precisam mudar.
   - **A, familiar:** o mais próximo do que o público já usa. Risco baixo.
   - **B, própria:** a que mais parece com o produto e com mais nenhum.
   - **C, inesperada:** um passo além do confortável, para abrir a conversa.

   Recomende pelo público, e diga por quê. Nem sempre a mais própria vence: o dono escolheu a B numa barbearia e a A numa marmitaria cuja dona não entende de tecnologia. A direção A também precisa de decisão própria: familiar não pode virar genérica.
3. **Derive os tokens do conceito** e escreva uma linha do porquê de cada escolha. Se a justificativa serve para qualquer produto, ela não vale.
4. **Revise contra `references/marca/anti-generico.md`.** Troque toda escolha que caiu num padrão e diga o que trocou.
5. **Aplique à mesma tela real, com os mesmos dados.** A tela mais usada do produto, não a home nem o login. Dados fictícios realistas, nomes brasileiros, um caso difícil (nome longo, lista cheia).
6. **Capture em 1440 × 900 e 375 × 812.** Rode `scripts/verificar.mjs` nas três e corrija as falhas antes de mostrar: acessibilidade não é rodada posterior.
7. **Mostre as imagens.** Para cada uma: nome, conceito em uma frase, o elemento-assinatura. Diga qual recomenda e por quê. Pare e espere.

## Depois da escolha

Escreva `DESIGN.md` (modelo em `assets/modelos/design.md`). Ele guarda valores e motivos. Misturas ("a A com a agenda da B") entram explicitamente. Rode `scripts/contraste.mjs DESIGN.md`. Depois, faça o kit de identidade de `references/marca/criar-marca.md`.

## Cor: como gerar uma paleta com contraste previsível

Use `node scripts/paleta.mjs "#cor"`: a partir de uma cor, ele gera neutros, ação, situações e o bloco `colors` do `DESIGN.md`, com todos os pares calculados, em tema claro ou escuro. Ele garante leitura, não beleza: a decisão que conta é qual cor passar, e ela vem do mundo do produto e do espaço livre diante dos concorrentes.

Por baixo, o script trabalha em OKLCH, em que a claridade é perceptualmente uniforme: dois tons com a mesma claridade em matizes diferentes têm contraste parecido. A Stripe fez o mesmo em CIELAB para parar de escolher pares aprovados um a um.

- Fixe o matiz e varie a claridade para criar a escala. Reduza o croma nos extremos.
- Neutros: mesmo matiz da marca, com croma entre 0,005 e 0,02.
- Cor de ação: precisa dar 4,5:1 com o texto em cima e 3:1 com o fundo em volta.
- Situações (erro, aviso, sucesso): nunca iguais à cor de marca. Sempre com ícone e texto.

## Fontes

Sem fonte definida, siga `references/recursos/fontes.md`: candidatas por personalidade, como testar e como servir.

Sirva a fonte pelo próprio projeto em produção, em WOFF2, com `font-display: swap`. Em protótipo pode vir de CDN. Fontes de CDN mandam o IP do visitante a terceiros, o que pesa na LGPD. A pilha do sistema é uma decisão válida quando há motivo (velocidade, telas de baixo custo): escreva o motivo no `DESIGN.md`.

**Fonte instalada no seu computador não é identidade.** Corbel, Trebuchet, Verdana e Segoe vêm com o Windows e não existem no Android nem no iPhone: a captura fica bonita e, no celular da pessoa, a tela muda de letra. "Sem CDN" não quer dizer "sem fonte": um WOFF2 com subconjunto latino, servido pelo projeto, não depende de internet externa e funciona em navegador antigo.

Se usar componentes prontos (shadcn/ui, Radix, React Aria), use o comportamento e a acessibilidade deles e troque a aparência inteira. O visual padrão deles é parte do que hoje se lê como "feito por IA".


---

<!-- references/padroes/agenda.md -->

# Agenda

**Quando:** produto com hora marcada. Vem de dois projetos reais; a grade foi exigência de quem usa.

## Regra

- **Duas visões, sem trocar uma pela outra.** "Hoje" é uma lista de pessoas (familiar, para atender). "Agenda" é uma grade com horas no eixo vertical e dias no horizontal, com o bloco do tamanho da duração (para planejar).
- **Escala fixa:** 80px por hora a partir de 900px de largura. A grade tem rolagem própria, a página não rola, e ela abre no horário atual.
- **Linha "agora"** atravessa toda a grade e é mais forte na coluna de hoje. A hora aparece escrita. Atualiza a cada 30 segundos.
- **Clicar num horário livre** abre o agendamento já com dia, hora e profissional. Pelo teclado, há um botão "Agendar" equivalente. (G15)
- **Situações que não se confundem:** cor, forma, ícone e texto. Exemplo testado: vazado tracejado para agendado, cheio para confirmado, hachurado para cancelado e falta. (G13)
- **Nome acessível completo** no bloco: "sexta 9, 11:00, Helena Prado, limpeza, confirmado".
- **Sobreposição:** blocos lado a lado, até 3. Acima disso, um botão "+N" que lista no painel.
- **Bloco menor que o texto:** mostre menos dias antes de reduzir a fonte. Alvo de pelo menos 24 × 24px; 44 no toque.
- **Abaixo de 900px:** visões Dia, 3 dias e Mês. Padrão: Dia.
- **Detalhe ao lado a partir de 1280px:** a grade encolhe e nada fica coberto. Abaixo disso, painel ou folha inferior.
- **Filtro por profissional** em chips com contagem, até 6; acima disso, busca. Visão, data e filtro ficam na URL.
- **WhatsApp:** abre a conversa com o lembrete pronto e não envia sozinho.

## Como os grandes fazem

| Sistema | O que aproveitar |
| --- | --- |
| Google Calendar | Grade de horas e dias, linha do agora, clicar para criar (observação) |
| WhatsApp | Lista de conversas: iniciais, nome em destaque, hora; é o modelo da tela "Hoje" (observação) |
| Uber | Detalhe sobe em folha inferior, com ação clara na parte de baixo (observação) |

Receitas completas em `estilos/sistema-clinica-conversa/` e `estilos/sistema-gestao/`.

**Verifique:** `g-rolagem-presa` (marque a grade com `data-rolagem-propria` quando a página não rola), `a11y-alvo`. Testar com 3 consultas no mesmo horário e com o nome mais longo do cadastro.


---

<!-- references/padroes/estados.md -->

# Carregando, vazio e erro

Toda tela com dados tem os três, mais o sucesso. São a parte que mais falta em entrega de agente, e por isso entram no aceite da tela-modelo.

## Carregando

- Esqueleto com o formato do conteúdo real, parado com movimento reduzido.
- Reserve o espaço para a tela não pular.
- Passou de 1 segundo, diga em texto com `role="status"`.
- Em botão: mantém o texto e a largura, com `aria-busy`.

## Vazio

Identifique qual dos três é, porque pedem texto diferente:

| Tipo | Quando | O que dizer |
| --- | --- | --- |
| Sem dados | Primeiro uso | O que vai aparecer aqui e como começar. Uma ação principal |
| Resultado da pessoa | Busca ou filtro sem resultado | Por que está vazio e como ajustar. Mantenha busca e filtros |
| Erro de acesso | Sem permissão, configuração faltando | Por que não há dados e o que fazer, sem código |
| Tudo feito | Lista zerada | Uma frase positiva. Sem próxima ação, sem texto extra |

Regras: substitua a tabela inteira, sem cabeçalho vazio. Título curto, uma frase. Nunca deixe sem saída quando existe próximo passo. Nada de ilustração genérica de pasta vazia, que é outro clichê: sem imagem é melhor do que imagem de banco.

## Erro de leitura

Mantenha a casca e o menu. No lugar do conteúdo: o que aconteceu, "Tentar de novo" e os dados já carregados, quando existirem. `role="alert"`.

## Erro de gravação

Fica junto da ação. Nada do que foi digitado se perde. Foco no aviso. Repetir não duplica.

## Sem acesso e endereço inexistente

Mesma casca, título que explica e "Voltar para o início". Sem código 403 nem 404 na tela.

## Como os grandes fazem

| Sistema | O que aproveitar |
| --- | --- |
| Carbon | Tipos de estado vazio, uma só ação principal por estado, substituir o elemento, imagem opcional, esqueleto em vez de spinner |
| Atlassian | Causa, o que fazer e o que acontece se não fizer; se não sabe a causa, não invente |

**Como provar:** deixe na tela de desenvolvimento um jeito de forçar cada estado. Capture cada um na tela-modelo.


---

<!-- references/padroes/formulario.md -->

# Formulário

**Quando:** cadastro, edição, agendamento, qualquer coleta de dados.

## Regra

- **Peça só o necessário.** Obrigatório é o que a regra de negócio exige. Marque os **opcionais** com "(opcional)"; não use asterisco quando a maioria é obrigatória.
- **Rótulo visível acima do campo.** Dica de uma frase abaixo do rótulo. Placeholder só como exemplo de formato.
- **Preencha pela pessoa.** CEP preenche o endereço, com foco indo para o número; se a busca falhar, os campos ficam livres. `autocomplete` e `inputmode` em todo campo. Comece do contexto da tela de origem. (G15)
- **Tamanho do campo sugere o tamanho da resposta.** Largura limitada e formulário centralizado na área útil. (G08)
- **Mais de 8 campos:** divida em seções com título. Para público com pouca familiaridade, uma pergunta por tela, com "Voltar" no topo e "Continuar" fixo no rodapé.
- **Valide ao tentar avançar**, não enquanto a pessoa digita. Aceite formatos variados: limpe espaço e pontuação de número e código antes de validar.
- **Erro em três lugares:** prefixo "Erro:" no título da aba, resumo no topo com foco e links para os campos, mensagem junto de cada campo. Em formulário curto, leve o foco direto ao primeiro campo com erro.
- **Mensagem que resolve:** diga o que corrigir ("Digite o CEP com 8 números"), nunca "Campo inválido". Borda de 2px, ícone e texto. (`references/padroes/retorno.md`)
- **Nunca perca o que foi digitado.** Falha de envio mantém tudo e leva o foco ao aviso.
- **Bloqueie envio duplo** até na lógica, não só no botão. O botão mostra "Salvando…".
- **Confirme antes de sair** com alterações não salvas.
- **Dado pessoal:** diga para que serve e onde está a política, antes do botão de envio.
- **Escolha única até 5 opções:** botões de opção visíveis. Mais que isso, ver `references/padroes/selecao.md`.

## Como os grandes fazem

| Sistema | O que aproveitar |
| --- | --- |
| GOV.UK | Validar ao avançar; resumo de erros com foco; "Erro:" no título; uma pergunta por página; "Continuar"; link "Voltar" no topo; não pedir duas vezes |
| Atlassian | Mensagem de erro: causa, o que fazer, o que acontece se não fizer; sem "por favor" nem "desculpe" para erro simples |
| Uber, iFood | Um passo por tela, resumo sempre à vista, escolha por cartão (observação) |

GOV.UK desliga o `required` nativo e usa `novalidate` para controlar a mensagem. Faça o mesmo quando houver validação própria.

## Erros comuns

Rótulo dentro do campo; campo de data em três dropdowns; máscara que impede colar; erro só em cor; botão desabilitado sem dizer o que falta; formulário que quebra em 375px; campos colados à esquerda com o vazio à direita.

**Verifique:** `a11y-nome`, `a11y-alvo`, `g-colado-a-esquerda`, e rode em 375 e 320 cada formulário. Force o erro e faça o caminho só com teclado.


---

<!-- references/padroes/landing.md -->

# Landing e site institucional

**Quando:** página de apresentação de produto ou empresa. É onde a cara de IA mais aparece e onde a identidade pode ir mais longe. Leia junto `references/marca/criatividade.md`, que traz o que os sites admirados fazem: esta ficha cuida do que precisa funcionar; aquela, do impacto. O estilo `base-design-system` é sóbrio de propósito e não serve como padrão para landing de impacto.

## Regra

- **A primeira tela diz o que é, para quem e o que fazer.** Em 5 segundos, sem rolar. Título concreto, do setor, com a palavra que o cliente usaria. (G01)
- **Herói vem do assunto:** o produto real, o lugar real, o resultado real. Nada de captura flutuando em perspectiva nem blob.
- **Só o que convence.** Cada bloco responde a uma objeção de quem vai comprar. Sem contador de vaidade e sem logos de quem não é cliente. Depoimento só real, com nome e resultado.
- **Uma ação principal, repetida no fim.** Negócio local: telefone, WhatsApp e endereço sempre à vista.
- **Ritmo:** troque composição entre os blocos: não repita a mesma grade de cartões. Texto de leitura com até 70 caracteres por linha.
- **Mobile primeiro de verdade:** mais de metade do público chega pelo celular. A primeira dobra é desenhada em 375px.
- **Desempenho é parte do design:** imagem principal com `fetchpriority="high"` e dimensões declaradas; `loading="lazy"` no resto; WebP ou AVIF; fonte com subconjunto. HTML vindo do servidor; conteúdo legível sem JavaScript.
- **Dados pessoais:** nenhum rastreador antes do aceite. Recusar pesa igual a aceitar. Aviso de cookies não bloqueia a página e não cobre o conteúdo em zoom alto.
- **Carrossel:** só quando indispensável, com pausa, sem autoplay fora do herói.
- **SEO local:** `title` e `description` únicos, HTML semântico, JSON-LD do tipo do negócio.

## Como fugir do template

Comece pelo conteúdo real do negócio, nunca por seções de modelo. Mostre o que só essa empresa tem: o endereço, a foto real do espaço, o preço, o nome de quem atende. Use `references/marca/identidade.md` e dê à página um elemento que só exista nela.

**Verifique:** `g-muito-texto`, `ia-cards-iguais`, `ia-texto-cliche`, `a11y-camadas-fixas`. Teste a primeira dobra em 375px e a página em conexão lenta.


---

<!-- references/padroes/lista-tabela.md -->

# Lista e tabela

**Quando:** qualquer conjunto de registros que a pessoa percorre, compara ou opera.

## Regra

- **Sempre diga o que é cada dado:** `<table>` com `<th scope="col">`, cabeçalho visível e legenda oculta. Abaixo de 600px vira lista de cartões, com cada valor acompanhado do nome. (G12)
- **Densidade por tipo de uso.** Linha de 40px para uso diário denso, 48px como padrão de sistema, 56 a 64px quando a linha tem duas linhas de texto. O cabeçalho tem a mesma altura das linhas. No toque, nunca abaixo de 44px.
- **Alinhamento.** Número e moeda à direita, com `tabular-nums`. Texto à esquerda. Data no formato de sempre.
- **Busca e filtros acima, paginação abaixo, sempre à vista.** A paginação fica no rodapé da tabela. Mostre a faixa e o total: "21–40 de 134". (G10)
- **Filtro e busca mudam a URL** (exceto dado pessoal) e voltam à página 1. Voltar do detalhe devolve à mesma página.
- **Ordem padrão declarada.** Coluna ordenável usa botão no cabeçalho com `aria-sort`. O ícone aparece na coluna ativa.
- **Ações na linha:** até 2 visíveis, com nome completo para leitor de tela ("Editar Marina Teles"). O resto em "Mais ações". Nada aparece só no hover: no toque, hover não existe.
- **Ação em lote:** barra no topo da tabela só com itens selecionados, com contagem e cancelar. Nesse modo, as ações de linha ficam desativadas.
- **Colunas demais:** corte a que não muda decisão. Só depois considere truncar, e o texto completo precisa estar no detalhe.
- **Sem cabeçalho quando vazia:** o estado vazio substitui a tabela inteira (`references/padroes/estados.md`).
- **Carregando:** esqueleto nas linhas, nunca spinner no lugar da tabela.

## Como os grandes fazem

| Sistema | O que aproveitar |
| --- | --- |
| Carbon (IBM) | Cinco alturas de linha (24, 32, 40, 48, 64px), cabeçalho igual à linha, paginação no rodapé, barra de lote no topo |
| Polaris (Shopify) | Filtros e abas de visão acima da lista, busca junto, ação em massa contextual (conhecimento geral) |
| Linear | Densidade alta sem ruído: hierarquia por peso e contraste, poucos separadores |
| Stripe | Número alinhado, filtro por chips, linha inteira abre o detalhe (observação) |

## Erros comuns

Tabela alta com a paginação fora da tela; ação revelada só no hover; rolagem horizontal em tabela de dados no celular; linha clicável sem link de verdade; texto pequeno para caber mais (compacte com espaçamento, não com fonte).

**Verifique:** `g-tabela-sem-cabecalho`, `g-lista-sem-paginacao`, `a11y-rolagem-horizontal`.


---

<!-- references/padroes/navegacao.md -->

# Navegação e casca

**Quando:** a estrutura fixa do produto, em todas as telas.

## Regra por largura

Faixas baseadas nas classes de janela do Android, que qualquer plataforma pode usar:

| Largura | Navegação | Conteúdo |
| --- | --- | --- |
| Até 599px | Barra de abas embaixo, 3 a 5 itens, sempre com ícone e texto. O resto em "Mais" | 1 coluna |
| 600 a 839px | Abas embaixo ou trilho lateral | 1 coluna, ou 2 quando há lista e detalhe |
| 840 a 1199px | Trilho ou barra superior | 2 colunas |
| 1200px ou mais | Barra lateral ou superior | Até 3 áreas; a tela é usada de verdade (G07) |

Em altura de até 480px (celular deitado, zoom alto), tudo o que é fixo passa a rolar junto.

## Regra

- **O menu mostra só o que o perfil pode abrir**, sempre na mesma ordem.
- **Item atual:** fundo, peso e `aria-current="page"`, não só cor.
- **Ação principal:** no topo à direita no computador; no celular, botão flutuante com rótulo ou barra fixa no rodapé. Nunca as duas barras inferiores ao mesmo tempo.
- **Voltar:** tela interna tem voltar visível. O botão do navegador sempre funciona; filtros e aba ficam na URL.
- **Marca:** leva ao início. Sem quadradinho de iniciais. (G17)
- **Busca:** quando importante, campo visível num lugar com sentido. Evite a lupa solta. (G18)
- **Pular para o conteúdo** é o primeiro item no Tab. No celular, o conteúdo vem antes da barra de abas na ordem de leitura.
- **Coluna de detalhe** ao lado da lista acompanha a rolagem. Só o corpo dela rola, e a ação principal fica sempre à vista. (G09)
- **Hover** só dentro de `@media (hover: hover) and (pointer: fine)`. Alvo se decide por `pointer`, não por largura.

## Como os grandes fazem

| Sistema | O que aproveitar |
| --- | --- |
| Android, classes de janela | Faixas em 600, 840, 1200 e 1600dp; altura compacta abaixo de 480dp desaconselha dois painéis |
| Apple | Controles com 44pt no toque e 28pt com mouse; ampliação de texto de pelo menos 200% |
| Linear | Navegação recua para o conteúdo aparecer: barra lateral com contraste baixo, ícones menores |
| WhatsApp, Instagram | Abas embaixo, poucos destinos, ícone e rótulo (observação) |

## Erros comuns

Menu de hambúrguer no computador; layout de celular centralizado num monitor; barra lateral fixa em 320px; dois menus para a mesma coisa; ícone sem texto em público leigo; rota nova sem foco no título.

**Verifique:** `g-pouco-uso-da-tela`, `a11y-camadas-fixas`, `a11y-pular`, `g-logo-em-quadrado`.


---

<!-- references/padroes/painel.md -->

# Painel

**Quando:** a tela que abre o dia ou resume uma operação. É onde mais aparecem reclamações de poluição e de cara de IA. (G02, G03)

## Regra

- **Responda a uma pergunta.** Antes de desenhar, escreva qual decisão a pessoa toma ao abrir. "Quem vem agora?" muda o layout inteiro em relação a "Quanto faturei?".
- **Herói é o que muda os próximos minutos**, não o número mais impressionante. Ele fica no topo, sem precisar de cartão.
- **Só o que vira ação.** Para cada indicador, escreva a ação que ele dispara. Sem ação, sai. Até 4 indicadores por visão.
- **Indicador:** rótulo, número e uma comparação quando houver, com o período explícito. A definição fica a um toque de distância; não vira parágrafo no cartão. Conflito conhecido: o `sistema-gestao` manda escrever a definição no cartão, o que já gerou reclamação de excesso de texto. Prevalece esta regra.
- **Pendências com atalho:** "23 sem confirmação" abre a lista já filtrada.
- **Sem repetir** o mesmo dado em cartão, gráfico e tabela.
- **Desconhecido não é zero.** Valor ausente aparece como ausente e fica fora da soma.

## Gráfico (G14)

- Título é a resposta: "Entradas superaram as saídas em 4 de 6 meses", não "Fluxo de caixa".
- Rótulo direto na série em vez de legenda. No máximo 2 séries sem pedido explícito.
- Eixo começando em zero em barras. Sem 3D, sem sombra, sem linha suavizada escondendo dado.
- Duas cores que se distinguem em tons de cinza, com posição ou padrão como segundo sinal.
- Alternativa em tabela, pois nem todo mundo lê gráfico. Sem altura artificial para o zero.

## Fugindo do painel genérico

Evite a fórmula de barra escura, quatro cartões e gráfico de área. Alternativas reais, que saem do trabalho:

- Painel que é uma lista: "o dia de hoje" no lugar de resumo.
- Painel que é uma frase: "Faltam 3 confirmações para fechar a manhã", seguida da lista delas.
- Faixa densa de números em linha, sem cartões, separados por espaço.

## Como os grandes fazem

| Sistema | O que aproveitar |
| --- | --- |
| Linear | Densidade sem sobrecarga: hierarquia por peso e contraste, menos separadores e ícones |
| Stripe | Número com comparação e período claros (observação) |
| Apple | Subtração: elementos que não servem à tarefa saem |

**Verifique:** `g-muito-texto`, `g-acoes-demais`, `ia-cards-iguais`. Faça o teste dos 5 segundos.


---

<!-- references/padroes/retorno.md -->

# Retorno: aviso, erro, confirmação, desfazer

Escolha o tipo pela gravidade e por quem precisa agir.

| Situação | Use |
| --- | --- |
| Ação concluída, sem consequência | Aviso curto na tela, com `role="status"` |
| Ação concluída e reversível | Aviso com "Desfazer". Melhor que perguntar antes |
| Ação irreversível (cancelar, apagar, falta) | Diálogo, com o número real do impacto: "Apagar 143 registros" |
| Erro que impede continuar | Mensagem no lugar do problema, com `role="alert"` |
| Situação que precisa de atenção | Faixa na própria tela, que não some sozinha |

## Mensagem

Estrutura: o que aconteceu, o que fazer, e o que acontece se não fizer, quando importar. Fale com "você". Sem "por favor" nem "desculpe" em erro simples; guarde para quando a consequência é grave. Sem jargão, sem código. Não sabe a causa? Diga que algo deu errado e dê o próximo passo. Se há várias causas possíveis, comece pela solução mais provável.

Botão com verbo e objeto: "Cancelar consulta", nunca "Sim" ou "OK". No diálogo, o foco abre na opção segura e Esc fecha sem fazer nada.

## Aviso temporário

- Fica de 5 a 8 segundos, conforme o tamanho; pausa com foco ou ponteiro.
- Nunca é o único lugar de uma informação ou ação importante. Tela com "Desfazer" mantém outro caminho para reverter.
- Acima de barras e botão flutuante, sem cobrir ação. Máximo de 3.
- Texto do aviso e estado da tela concordam. (G19)

## Movimento

Mostra de onde algo veio; nada se mexe sozinho. Tudo em 100 a 300ms, com `prefers-reduced-motion` zerando. Jogo e entretenimento são outra regra. (G22)

**Como os grandes fazem:** Atlassian dá a estrutura da mensagem; WhatsApp e Gmail popularizaram o "Desfazer" no lugar de perguntar antes (observação).


---

<!-- references/padroes/selecao.md -->

# Escolher entre opções

Escolha o controle pelo tamanho da lista e por quanto ela pode crescer. (G11)

| Situação | Controle |
| --- | --- |
| 2 opções, liga e desliga, efeito imediato | Interruptor |
| 2 a 5 opções, escolha única | Botões de opção ou cartões, todos visíveis |
| 2 a 5 opções, várias escolhas | Caixas de marcar |
| 6 a 12 opções fixas, que não crescem | Lista suspensa nativa |
| Dado de cadastro que cresce (paciente, serviço, cidade) | Busca com sugestões |
| Mais de 50 itens, ou homônimos | Diálogo de busca, com dados que distinguem |
| Filtros de uma lista | Chips, até 6; acima disso, busca |

## Busca com sugestões

- Rótulo visível. Ao focar, abre as sugestões mais usadas.
- Ignora maiúsculas, acentos e pontuação. Procura no nome e nos identificadores.
- Digitar não muda a escolha; só escolher um resultado muda. Esc mantém a anterior.
- Até 8 sugestões, e diga quando há mais: "Mostrando 8 de 23".
- Sem resultado: diga isso e ofereça criar, quando fizer sentido.
- Homônimos: mostre o que distingue (nascimento, 4 últimos dígitos do telefone). Nunca o CPF completo.
- Teclado: setas navegam, Enter escolhe, Esc fecha. `role="combobox"` e `listbox`, conforme o WAI-ARIA Authoring Practices. Use uma base testada em vez de escrever à mão.

## Erros comuns

Dropdown com centenas de itens; lista que corta no celular; ícone sem rótulo como opção; escolha múltipla que perde a seleção ao filtrar.

**Verifique:** `g-lista-suspensa-longa`.


---

<!-- references/padroes/tema-escuro.md -->

# Tema escuro

Pedido explicitamente depois de um tema escuro reprovado. (G21) Só crie quando o produto pedir, e mostre ideias em imagem antes de aplicar.

## Regra

- **Não é inversão.** É uma paleta nova, com seus próprios pares calculados.
- **Fundo sem preto puro:** cinza muito escuro, tingido pelo matiz da marca. Sobre `#000`, texto branco cria halo em muita gente.
- **Elevação por claridade:** quanto mais alta a camada, mais clara. Sombra quase não aparece no escuro. Defina de 3 a 4 níveis.
- **Texto sem branco puro** na leitura longa: de 87 a 92% de claridade. Contraste continua em 4,5:1 ou mais.
- **Cor de marca precisa de outro tom.** A cor saturada do tema claro vibra no escuro. Clareie e dessature, e recalcule o par com o texto em cima.
- **Situações ganham par próprio:** texto claro sobre fundo escuro do mesmo matiz.
- **Imagem e sombra:** reduza um pouco o brilho de foto e troque ilustração de fundo branco.
- **Três estados:** claro, escuro e seguir o sistema. Guarde a escolha e aplique antes da primeira pintura, para não piscar.
- **`color-scheme: dark`** para controles nativos e barras de rolagem.
- **Alto contraste é outro tema.** Não use como substituto, e respeite `forced-colors`.

## Como testar

Todos os pares em `scripts/contraste.mjs`. Capture as telas principais nos dois temas. Olhe em ambiente escuro e claro. Foco, borda de campo e gráfico continuam em 3:1.

## Como os grandes fazem

| Sistema | O que aproveitar |
| --- | --- |
| Material | Elevação por camada mais clara, fundo escuro não preto, cores dessaturadas (conhecimento geral) |
| Apple | Verificar contraste nos dois modos; versão de maior contraste quando a pessoa pedir |
| Linear | Geração de tema a partir de poucas variáveis, para claro e escuro saírem do mesmo sistema |

Exemplo completo de três temas em `estilos/app-tarefas-acessivel/`, com a ressalva de `references/recursos/estilos.md` sobre a paleta.


---

<!-- references/qualidade/acessibilidade.md -->

# Acessibilidade: o piso

Piso: **WCAG 2.2 nível AA**, que a **ABNT NBR 17225:2025** (Acessibilidade em conteúdo e aplicações web) acompanha no Brasil. A Lei Brasileira de Inclusão (13.146/2015) trata de acessibilidade em sites; o que ela exige de cada caso é questão jurídica, não técnica.

Este piso prevalece sobre tudo no kit, inclusive `references/gosto/perfil.md`, `DESIGN.md` e estilos. Se um pedido bater nele, avise e proponha o caminho que atende aos dois.

**Não declare "acessível" nem "em conformidade".** Diga o que foi verificado e como. Ferramenta automática encontra só parte dos problemas: o resto pede teclado, leitor de tela e pessoas.

## Para quem, e o que muda para cada um

| Quem | O que precisa | Regra |
| --- | --- | --- |
| Pessoa cega | Estrutura e nomes | Semântica nativa, títulos em ordem, nome em todo controle, avisos anunciados |
| Baixa visão, pessoa idosa | Texto que cresce sem quebrar | Fonte em `rem`, zoom de 200% e 400%, contraste, nada de texto em imagem |
| Daltonismo | Sinal além da cor | Texto, forma ou ícone em todo estado |
| Mobilidade reduzida, tremor | Alvo grande e teclado | 44 × 44 no toque, tudo pelo teclado, sem exigir arrasto |
| Baixo letramento, pouca familiaridade | Clareza | Frases curtas, uma decisão por tela, ícone sempre com texto, padrões conhecidos |
| Pessoa surda | Equivalente visual | Legenda em vídeo, nada só em áudio, Libras em site público (VLibras recomendado, não substitui o resto) |
| Sensível a movimento | Controle | `prefers-reduced-motion`, nada piscando, pausa em todo carrossel |
| Situação temporária | Contraste e tamanho | Sol na tela, uma mão só, conexão ruim |

## Regras com número

| Tema | Regra | Critério |
| --- | --- | --- |
| Contraste de texto | 4,5:1; texto de 24px ou mais, ou 18,66px em negrito, 3:1 | 1.4.3 |
| Contraste de interface | 3:1 para borda de campo, ícone que informa, foco e gráfico | 1.4.11 |
| Alvo | Mínimo de 24 × 24px. Padrão do kit: 44 × 44px no toque | 2.5.8 |
| Fonte | Em `rem`. Corpo de pelo menos 16px em tela de uso geral; nada abaixo de 12px | 1.4.4 |
| Largura | Sem rolagem horizontal em 320px de largura (1280px com zoom de 400%) | 1.4.10 |
| Espaçamento de texto | Nada cortado com altura de linha 1,5 e espaçamento entre letras 0,12em | 1.4.12 |
| Foco | Sempre visível, 3:1, nunca coberto por barra fixa | 2.4.7, 2.4.11 |
| Teclado | Tudo acessível, sem armadilha, ordem lógica | 2.1.1, 2.1.2, 2.4.3 |
| Arrasto | Toda ação de arrastar tem alternativa sem arrasto | 2.5.7 |
| Erros | Identificados em texto, com sugestão de correção | 3.3.1, 3.3.3 |
| Entrada repetida | Não peça de novo o que já foi informado | 3.3.7 |
| Login | Sem teste cognitivo; permita colar senha e usar gerenciador | 3.3.8 |
| Ajuda | No mesmo lugar em todas as telas | 3.2.6 |
| Tempo | Aviso com ação não some enquanto tiver foco ou ponteiro; a ação também existe em outro lugar | 2.2.1 |

## O que agentes costumam errar

- **Barra fixa em zoom alto.** Em janela baixa, cabeçalho, abas e aviso de cookies cobrem a tela. Regra do kit: com altura até 480px, tudo o que é fixo passa a rolar junto.

```css
@media (max-height: 480px) {
  .barra-superior, .barra-inferior, .barra-de-acoes, .aviso-de-cookies { position: static; }
}
```

- **`min-width: 320px` no `body`.** Com barra de rolagem clássica no Windows, cria rolagem horizontal. Não declare.
- **`outline: none`** sem substituto de 3:1. O halo claro em volta do campo não basta como único sinal.
- **Anel de foco de uma cor só.** A cor de marca que passa sobre o fundo claro pode reprovar sobre a barra escura. Meça contra cada fundo e troque a cor do anel nas áreas escuras.
- **`maximum-scale=1`** na meta viewport. Nunca.
- **Placeholder como rótulo.** Some ao digitar. Rótulo visível sempre acima do campo.
- **`<div>` clicável.** Use `<button>` e `<a>`.
- **Combobox, abas e menu feitos à mão com ARIA errado.** Prefira o nativo ou uma base testada (React Aria, Radix). Se fizer à mão, siga o WAI-ARIA Authoring Practices.
- **Texto truncado sem saída.** `title` não chega a quem usa toque ou teclado. O conteúdo completo precisa existir em outro lugar.
- **`aria-label` que não contém o texto visível.** Quem usa controle por voz fala o que vê (2.5.3).
- **Mudança sem anúncio.** Resultado de busca e confirmação usam `role="status"`; erro urgente usa `role="alert"`.
- **Rota de SPA sem foco.** A cada troca de tela, atualize `document.title` e mova o foco para o `h1`.

## Roteiro de verificação

Rode `scripts/verificar.mjs` em cada tela. Depois faça à mão e relate cada item:

1. **Só teclado:** percorra a tela com Tab, Shift+Tab, Enter, Espaço, Esc e setas. O foco aparece sempre? Abre e fecha diálogo devolvendo o foco?
2. **Zoom:** 200% e 400%. Nada some, nada rola para o lado, barra fixa não cobre.
3. **Letra grande:** aumente a fonte padrão do navegador para 200%. O texto precisa crescer.
4. **Leitor de tela:** NVDA no Windows, VoiceOver no Mac ou iPhone, TalkBack no Android. Percorra por títulos, preencha um formulário com erro, abra um diálogo. Se não puder rodar, escreva "leitor de tela não verificado".
5. **Sem cor:** veja a tela em tons de cinza. Toda situação continua distinguível?
6. **Alto contraste:** modo de alto contraste do Windows (`forced-colors`). Borda feita com `box-shadow` some.
7. **Movimento reduzido:** ative no sistema. Nada se move sozinho.
8. **Linguagem:** leia em voz alta. Alguém sem familiaridade entende na primeira leitura?

## Linguagem simples

Frase curta, voz ativa e palavra do dia a dia. Botão com verbo e objeto ("Marcar horário"). Evite sigla sem explicação. Nunca mostre código de erro. Diga o que aconteceu e o que fazer. Para público com letramento variado, use ícone e texto juntos, e teste com alguém do público.


---

<!-- references/recursos/bibliotecas.md -->

# Bibliotecas e geração de mídia

Catálogo para não escrever à mão o que já existe, e para conseguir o que um agente sozinho não produz: imagem, vídeo, som e 3D. Licença e tamanho conferidos no npm em 30/10/2026, salvo marcação. Confira de novo antes de instalar.

## Regras

1. **O que o projeto já usa vem primeiro.** Só acrescente se resolver um problema real da tela.
2. **O nativo vem antes:** CSS para transição, `<dialog>` para diálogo, `<details>` para expansível, `popover` para balão.
3. **Antes de instalar:** `npm view <pacote> license dist.unpackedSize`. Sem licença clara, não use em produto.
4. **Protótipo pode usar CDN.** Produção instala com versão fixa e serve do próprio projeto.
5. **Biblioteca pronta traz a aparência pronta.** Use o comportamento e troque o visual (`references/marca/anti-generico.md`).
6. **Movimento e 3D custam.** Respeite `prefers-reduced-motion`, ofereça alternativa estática e meça o peso num celular simples.

## Código

| Precisa de | Use | Pacote | Licença | Observação |
| --- | --- | --- | --- | --- |
| Diálogo, combobox, abas e menus acessíveis em React | React Aria Components | `react-aria-components` | Apache-2.0 | O mais completo em acessibilidade. Sem visual |
| O mesmo, em peças separadas | Radix Primitives | `@radix-ui/react-dialog` e outros | MIT | Base do shadcn/ui |
| O mesmo, fora do React | Ark UI | `@ark-ui/react`; há versões para outros frameworks (não conferidas) | MIT | Sem visual |
| Ícones com personalidade | Phosphor | `@phosphor-icons/web` | MIT | Seis pesos, inclusive duotone |
| Ícones de traço | Iconoir, Tabler | `iconoir`, `@tabler/icons-webfont` | MIT; a Tabler não declara no npm: confira | Boas opções ao Lucide |
| Ícones padrão de gerador | Lucide | `lucide` | ISC | Serve, mas é a escolha de inércia. Decida |
| Fonte servida pelo projeto | Fontsource | `@fontsource-variable/<familia>` | A da fonte: confira | Sem CDN em produção, por causa da LGPD. Qual escolher: `references/recursos/fontes.md` |
| Gerar paleta com contraste | `scripts/paleta.mjs` | Nenhum | Do kit | Parte de uma cor e calcula todos os pares |
| Logotipo em curvas | `scripts/logotipo.py`, com fonttools; em JavaScript, opentype.js | `fonttools` (pip), `opentype.js` | fonttools: MIT, por conhecimento geral; opentype.js: MIT | Não aplica kerning sozinho: confira no olho |
| Reduzir fonte a um subconjunto | pyftsubset, subset-font | `fonttools` (pip), `subset-font` | subset-font: BSD-3-Clause | Fonte com subconjunto latino pesa bem menos |
| Animação de interface | Motion | `motion` | MIT | Para o que CSS não resolve |
| Animação com linha do tempo e rolagem | GSAP | `gsap` | Licença própria, gratuita, não é de código aberto: leia | Para peças de marca |
| Animação feita em ferramenta | dotLottie, Rive | `@lottiefiles/dotlottie-web`, `@rive-app/canvas` | MIT | Pedem um arquivo de animação. A Hyper3D carrega Rive |
| Carrossel | Embla, Swiper | `embla-carousel`, `swiper` | MIT | Embla é o menor. Swiper aparece em Nubank, 99 e Fortnite. Siga as regras de pausa |
| Rolagem suavizada | Lenis | `lenis` | MIT | Evite salvo pedido: mexe na rolagem nativa e no zoom |
| Modelo 3D numa página, com pouco código | model-viewer | `@google/model-viewer` | Apache-2.0 | Tem `alt` e carrega `.glb`. Comece por ele |
| Cena 3D sob medida | Three.js | `three` | MIT | Peso alto; exija versão estática |
| Cena feita em editor visual | Spline | `@splinetool/viewer` | Sem licença no npm: leia os termos | Conveniente, com dependência do serviço |
| Gráfico completo | ECharts | `echarts` | Apache-2.0 | Grande; importe só os módulos usados |
| Gráfico sob medida em React | visx | `@visx/visx` | MIT | Peças de baixo nível |
| Gráfico simples | SVG à mão | Nenhum | Nenhuma | Costuma bastar e pesa quase nada |
| Conversão e cálculo de cor | culori | `culori` | MIT | OKLCH para sRGB, usado para gerar paletas |
| Escalas de cor prontas | Radix Colors | `@radix-ui/colors` | MIT | Use a lógica; os valores prontos viram padrão |
| Varredura extra de acessibilidade | axe | `@axe-core/playwright` | MPL-2.0 | Complementa `scripts/verificar.mjs` em projeto com Playwright |

## Mídia pronta

Baseado em conhecimento geral, não conferido nesta rodada. Confirme a licença de cada arquivo.

| Precisa de | Onde |
| --- | --- |
| Modelos 3D, texturas e iluminação | Poly Haven, ambientCG |
| Modelos 3D estilizados, para jogo | Kenney |
| Fontes | Google Fonts, Fontshare |
| Foto | Unsplash, Pexels. Banco de imagem denuncia: é o último recurso |

## Gerar imagem, vídeo, som e 3D com IA

Sem imagem, a tela fica sem a principal coisa que os sites admirados têm (`references/marca/criatividade.md`). Ordem de preferência:

1. Foto e material reais do negócio.
2. Mídia gerada com um estilo único, escrito no `DESIGN.md`.
3. Ilustração própria em SVG, feita pelo agente.
4. Nenhuma imagem. Banco de imagem só se o resto não for possível.

| Ferramenta | O que faz | Como o agente usa |
| --- | --- | --- |
| [CozyGPU](https://cozygpu.com/models) | Monta 12 modelos abertos (6 de imagem, 4 de vídeo, 2 de áudio) em GPU na nuvem, na conta RunPod do dono, com cobrança por segundo de uso | A página não cita API. O agente escreve os prompts em `design/midia.md` e o dono gera |
| [Hyper3D Rodin](https://hyper3d.ai/pt) | Gera modelo 3D a partir de texto ou imagem | O site cita API e integrações, não testadas. Exporte `.glb` e mostre com `model-viewer` |

Se o ambiente tiver um gerador disponível, use-o. Se não tiver, não finja: entregue `design/midia.md` (modelo em `assets/modelos/midia.md`) e um substituto do tamanho exato na tela.

**Regras para o que é gerado:**

- **Um estilo só.** Escreva um parágrafo de estilo no `DESIGN.md` e repita em todo prompt. Imagens sem unidade denunciam mais que nenhuma.
- **Nada de pessoa falsa como real.** Rosto gerado não pode se passar por cliente, funcionário ou depoimento. Sem imagem de pessoa real sem autorização.
- **Licença por modelo.** Modelos abertos têm licenças diferentes, e alguns proíbem uso comercial. Registre a licença em `design/midia.md`.
- **Sem marca nem personagem de terceiros.**
- **Entrega técnica:** WebP ou AVIF, `width` e `height` declarados, `alt` real, `loading="lazy"` fora da primeira dobra. Vídeo com pausa, sem som automático e com imagem estática para movimento reduzido.
- **Confira antes de usar:** mãos, texto dentro da imagem e detalhes do setor costumam sair errados.


---

<!-- references/recursos/fontes.md -->

# Escolher fonte

Para quem não tem fonte definida. Todas abaixo são gratuitas, com licença OFL-1.1 conferida no npm em 30/10/2026, e podem ser servidas pelo próprio projeto. A descrição do caráter é uma leitura, não uma regra.

**Esta lista é ponto de partida.** Se todo projeto usar a primeira da fila, ela vira o novo padrão de gerador. Consulte também o catálogo do Google Fonts.

## Por personalidade

Parta das três palavras de `MARCA.md`.

| Personalidade | Famílias | Pacote `@fontsource…` |
| --- | --- | --- |
| Direta e prática | Hanken Grotesk, Schibsted Grotesk, Instrument Sans, Public Sans, Albert Sans | `-variable/hanken-grotesk`, `-variable/schibsted-grotesk`, `-variable/instrument-sans`, `-variable/public-sans`, `-variable/albert-sans` |
| Calorosa e próxima | Figtree, Nunito, Karla, Mulish | `-variable/figtree`, `-variable/nunito`, `-variable/karla`, `-variable/mulish` |
| Forte, de cartaz ou letreiro | Barlow Condensed, Archivo, Big Shoulders Display, Anton, League Gothic, Saira Condensed, Oswald | `/barlow-condensed`, `-variable/archivo`, `-variable/big-shoulders-display`, `/anton`, `-variable/league-gothic`, `/saira-condensed`, `-variable/oswald` |
| Diferente, com atitude | Bricolage Grotesque, Familjen Grotesk, Syne, Unbounded | `-variable/bricolage-grotesque`, `-variable/familjen-grotesk`, `-variable/syne`, `-variable/unbounded` |
| Elegante, editorial | Newsreader, Literata, Source Serif 4, DM Serif Display, Instrument Serif | `-variable/newsreader`, `-variable/literata`, `-variable/source-serif-4`, `/dm-serif-display`, `/instrument-serif` |
| Técnica e precisa | IBM Plex Sans, Sora, Red Hat Display; JetBrains Mono para código e dados | `-variable/ibm-plex-sans`, `-variable/sora`, `-variable/red-hat-display`, `-variable/jetbrains-mono` |
| Manual, de caderno | Caveat, Kalam, Gloria Hallelujah. Só em detalhe, nunca em texto corrido | `-variable/caveat`, `/kalam`, `/gloria-hallelujah` |
| Leitura em primeiro lugar | Atkinson Hyperlegible Next, Lexend. Boas para baixa visão e público amplo | `-variable/atkinson-hyperlegible-next`, `-variable/lexend` |

Por inércia, evite: Inter, Roboto, Poppins, Montserrat, Open Sans e Lato, que o verificador aponta. Fraunces e Space Grotesk também viraram padrão. Se uma delas for a escolha certa, escreva o motivo no `DESIGN.md`.

## Como escolher

1. **Pegue 3 candidatas**, de grupos que a marca aceite, e não a primeira que vier à cabeça.
2. **Teste com este texto real**, nos pesos que vai usar, em 14, 16 e 48px:

   > Não há pão, ação e coração: R$ 1.234,56 às 14:30

   Acentos desenhados à parte, números que não alinham e peso que some em tamanho pequeno eliminam a candidata. Para coluna de números, confira `font-variant-numeric: tabular-nums`.
3. **Mostre na tela.** A escolha acontece nas três direções, em imagem, não numa lista de nomes.
4. **Uma família resolve a maioria.** Use duas só se o contraste tiver função: condensada nos títulos e neutra no texto.
5. **Sistema de trabalho pede leitura em 14 a 16px.** Fonte de impacto fica no título e nos números.

## Como servir

Fonte instalada no seu computador não vai para o aparelho da pessoa. Num projeto com bundler:

```bash
npm install @fontsource-variable/hanken-grotesk
```

```js
import '@fontsource-variable/hanken-grotesk';
```

O nome no CSS leva o sufixo: `font-family: 'Hanken Grotesk Variable', system-ui, sans-serif`. O nome exato está no arquivo CSS do pacote.

Em HTML puro, copie de `node_modules/<pacote>/files/` o WOFF2 do subconjunto `latin`, que cobre `ã õ ç`, para `design/marca/fontes/`, com o arquivo de licença ao lado:

```css
@font-face {
  font-family: 'Hanken Grotesk';
  src: url('fontes/hanken-grotesk-latin-wght-normal.woff2') format('woff2');
  font-weight: 100 900;
  font-display: swap;
}
```

Carregue só os pesos usados. Sem acesso a npm, baixe do Google Fonts e reduza com `pyftsubset`.


---

<!-- assets/modelos/design.md -->

```markdown
---
version: alpha
name: <Nome do produto>
description: <O conceito, em uma frase>
colors:
  primary: "#000000"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#000000"
  muted: "#000000"
  border-control: "#000000"
  focus: "#000000"
  danger: "#000000"
  on-danger: "#FFFFFF"
typography:
  title:
    fontFamily: <Família>
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: <Família>
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: <Família>
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.4
rounded:
  control: 8px
  surface: 12px
spacing:
  sm: 8px
  md: 16px
  lg: 24px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
    height: 48px
---

<!-- Formato DESIGN.md (Google Labs, versão alpha). Mantenha as seções nesta ordem e os títulos em inglês.
     Validação opcional: npx @google/design.md lint DESIGN.md. Contraste: scripts/contraste.mjs DESIGN.md -->

## Overview

**Conceito:** <uma frase do mundo do produto, com uma tensão: "X, mas Y".>

**Direção aprovada:** <qual proposta, em que data, por quem. Misturas: "A, com a agenda da B".>

**Elemento-assinatura:** <o elemento funcional que só este produto tem.>

**Voz:** <como o produto fala, com uma frase real de botão, uma de vazio e uma de erro.>

**Público:** <resumo de `PRODUTO.md`, no que afeta o design.>

**Como expressa a marca:** <como este visual traduz as palavras de personalidade de `MARCA.md`.>

## Colors

<Papel de cada cor, onde pode e onde não pode aparecer, e o porquê da escolha.>

## Typography

<Por que esta família. Tamanhos em `rem`. Papel de cada estilo.>

## Layout

<Faixas de largura, largura máxima, como a tela é usada no computador, ritmo vertical.>

## Elevation & Depth

<Como as camadas se separam: tom, linha ou sombra, com uma regra só.>

## Shapes

<A lógica dos raios e das linhas.>

## Components

<O que muda em relação aos padrões do kit. Estados: padrão, hover, foco, ativo, desabilitado, erro.>

## Do's and Don'ts

<Decisões que parecem exceção, com o motivo: "Usamos Inter porque…". O verificador aceita fontes declaradas aqui.>
```


<!-- assets/modelos/produto.md -->

```markdown
# <Nome do produto>

Tudo aqui afeta decisões de tela. O que não souber, marque como "não sei" e siga com a sugestão recomendada. Este arquivo diz o que o produto precisa fazer; o que ele quer dizer, com personas, concorrentes e voz, fica em `MARCA.md`.

## Quem usa
- **Perfis:** <quem, e o que cada um vê>
- **Familiaridade com tecnologia:** <o que essas pessoas já usam no dia a dia>
- **Letramento, idade, necessidades de acessibilidade conhecidas:** <…>
- **Aparelho e situação:** <celular na mão, computador o dia todo, sol, pressa, uma mão só>

## O que precisam fazer
- **Tarefa mais frequente:** <verbo e objeto; quantas vezes por dia>
- **Meta de cliques para ela:** <número>
- **Outras tarefas, em ordem:** <…>
- **A decisão que a tela principal precisa ajudar a tomar:** <…>

## Mundo do produto
<Palavras, objetos, lugares e rituais do setor. É a matéria-prima da identidade.>

## Referências
- **Gosto de:** <produto e o que exatamente nele>
- **Não quero parecer com:** <produto e por quê>
- **Exigências de quem usa ou contrata:** <ex.: agenda em grade é obrigatória>

## Marca
<Logo, cores e fontes que já existem e o que pode mudar. "Não existe" também é resposta.>

## Limites
- **Stack e bibliotecas:** <…>
- **Dados:** <API, demonstração local>
- **Fora do escopo:** <…>
```


<!-- assets/modelos/marca.md -->

```markdown
# Marca: <Nome do produto>

**Brief:** <curto ou completo>

<!-- Curto: Essência, Público e personas, Personalidade, Mensagem e voz, O que isso muda na tela. Completo: todas as seções. -->

## Essência

- **Promessa, em uma frase:** <o que só este produto promete>
- **Por que existe:** <o problema real, nas palavras de quem sente>
- **O que nunca seria:** <o que ele se recusa a ser>

## Público e personas

### <Nome fictício e papel>

- **Base:** <hipótese, pesquisa ou dado>
- **Objetivo:** <o que tenta conseguir>
- **Medo:** <o que não pode dar errado>
- **Contexto de uso:** <aparelho, lugar, pressa, mãos>
- **Familiaridade com tecnologia:** <o que usa no dia a dia>
- **Como validar:** <como confirmar a hipótese; apague se a base for pesquisa ou dado>

## Concorrentes

Inclua o que a pessoa usa hoje, mesmo que não seja um sistema.

| Quem | Cor e fonte | Tom | O que faz bem | Situação |
| --- | --- | --- | --- | --- |
| <nome> | <observado> | <observado> | <observado> | <verificado ou não verificado> |

**Espaço livre:** <o que ninguém ocupa e faz sentido para este produto>

## Personalidade

- **<Palavra>**, não <o que ela recusa>
- **<Palavra>**, não <o que ela recusa>
- **<Palavra>**, não <o que ela recusa>

### Tom

| Formal ou casual | Sério ou engraçado | Respeitoso ou irreverente | Neutro ou entusiasmado |
| --- | --- | --- | --- |
| <posição> | <posição> | <posição> | <posição> |

## Mensagem e voz

- **Em 5 segundos, a pessoa precisa sentir:** <um sentimento>
- **E lembrar:** <uma coisa>

### Frases

- Botão: "<frase real>"
- Vazio: "<frase real>"
- Erro: "<frase real>"
- Sucesso: "<frase real>"

## O que isso muda na tela

| Do brief | Decisão de design |
| --- | --- |
| <fato> | <regra concreta, com medida quando houver> |
| <fato> | <regra concreta> |
| <fato> | <regra concreta> |
```
