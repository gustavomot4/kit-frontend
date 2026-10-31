---
titulo: Sistema de gestão
slug: sistema-gestao
versao: 3.0.0
status: estavel
superficie: sistema
dominio: gestao
estende: nenhum
idioma: pt-BR
acessibilidade: WCAG 2.2 AA
atualizado: 2026-10-30
---

# Sistema de gestão

Este arquivo guarda o que fez dar certo o frontend do Dental Flow, um sistema de gestão de clínica que o autor construiu antes, na forma de um prompt reutilizável. Serve para começar um frontend de gestão novo ou para evoluir um que já existe. Foi escrito para um assistente de código que lê o repositório e executa comandos; num assistente só de conversa ele também serve, e a seção 2 diz como. O Dental Flow é a origem do padrão, não um pré-requisito: tudo o que o prompt exige está escrito nele.

## Escopo

- **Use para:** ferramenta de trabalho usada o dia inteiro: painel, agenda, cadastros, listas, formulários, orçamentos, estoque, caixa, relatórios e administração.
- **Não use para:** landing page, site institucional ou página de marketing (escola de idiomas: `site-escola-idiomas`; os demais: `base-design-system`); produto que não é de gestão e não tem PRD próprio (`base-design-system`); aplicativo nativo de celular; sistema de atendimento com agenda para clínica ou consultório, operado pela recepção também no celular, em que a prioridade é parecer familiar a quem vive no WhatsApp (`sistema-clinica-conversa`).
- **Relação com outros PRDs:** autossuficiente, não estende nenhum. Os PRDs deste repositório são estilos alternativos, não camadas: use um por projeto e nunca entregue este junto com outro ao mesmo agente. O `base-design-system` também descreve ferramentas, com outras medidas; num sistema de gestão valem as deste arquivo. O `sistema-clinica-conversa` vem do mesmo produto, o Dental Flow, numa fase posterior: lá está a identidade "conversa", calorosa e pensada para o celular; aqui estão o processo e a arquitetura completos, com identidade neutra e densa para o computador.

## Como usar

1. Preencha somente a seção **1. O que eu preciso**. Onde não souber, escreva “não sei, sugira”: o prompt manda a IA trazer a pergunta com uma resposta recomendada.
2. Anexe o que tiver: capturas das telas atuais, logotipo, documentos de regras. Antes de anexar, troque por dados fictícios ou cubra tudo o que identifica uma pessoa (nome, CPF, telefone e, numa clínica, procedimento e valor). Não envie dado real de paciente, cliente ou funcionário. Para mostrar a aparência esperada, anexe também `exemplos/painel.png` e `exemplos/agenda.png`, que acompanham este arquivo no repositório de origem.
3. Cole tudo a partir de **Início do prompt**. Se preferir manter o arquivo no projeto em vez de colar, copie-o para a raiz com o nome `PRD-FRONTEND.md` e peça: “Siga `PRD-FRONTEND.md` a partir de ‘Início do prompt’.”
4. A primeira resposta deve ser plano e imagens, sem código de produção. Aprove tela por tela, ou responda “siga os caminhos recomendados” para aceitar tudo.
5. Commit, push e publicação só acontecem quando você disser.

As seções 2 a 9 são o padrão. Não é preciso editá-las. O que você escrever na seção 1 prevalece sobre elas, menos sobre o piso que o prompt declara: autorizações e conduta da seção 2, acessibilidade da seção 4 e regras de dados da seção 5. Se o seu pedido bater no piso, a IA para e pergunta.

---

## Início do prompt

Você vai planejar e, depois da minha aprovação, construir ou evoluir um frontend de gestão. As seções 2 a 9 são o padrão: descrevem o que tornou bom o resultado de um projeto anterior meu, o Dental Flow (gestão de clínica: painel, agenda, cadastros, orçamentos, estoque, caixa, relatórios e administração). Você não precisa conhecê-lo: o que vale está escrito aqui, e o que vier marcado como “exemplo do Dental Flow” é ilustração, não regra para o meu produto.

Ordem de precedência, da mais forte para a mais fraca:

1. **O piso:** autorizações e conduta da seção 2, o trecho “Acessibilidade” da seção 4 e as regras de dados da seção 5. Se a seção 1 ou o repositório pedirem algo que viole o piso, pare e pergunte.
2. A seção 1.
3. As instruções do repositório (AGENTS.md, CLAUDE.md, README).
4. O restante das seções 3 a 9.

Onde faltar informação de negócio, não invente a regra: traga a pergunta com uma resposta recomendada e siga com o que não depende dela.

### 1. O que eu preciso

- **Produto e público:** [o que é, quem usa, quanta familiaridade essas pessoas têm com sistemas]
- **Perfis e o que cada um vê:** [ ]
- **Situação:** [projeto novo | evolução do repositório em `<caminho>`]
- **Módulos e telas:** [lista]
- **O que a pessoa precisa conseguir fazer:** [fluxos principais, em frases curtas]
- **Problemas a resolver, se for evolução:** [ex.: listas altas demais, agenda ilegível com muitos registros]
- **Unidades:** [uma | várias]
- **Volume:** [registros por cadastro; atendimentos ou lançamentos por dia]
- **Agenda, se houver:** [dias, horário, duração mínima, nomes das situações]
- **Identidade visual:** [logotipo, cores, fonte | “proponha três direções em imagem”]
- **Dados:** [demonstração local com dados fictícios | API existente em `<endereço/contrato>`]
- **Regras que já decidi:** [lista]
- **Fora do escopo:** [lista]
- **Stack, se diferente do padrão da seção 3:** [ ]
- **Navegadores e aparelhos:** [ ]
- **Idioma e fuso:** [pt-BR, America/Sao_Paulo]
- **Hospedagem e caminho base:** [ ]
- **Onde fica a documentação:** [pasta ou repositório]
- **Autorizações:** commit, push e publicação não estão autorizados até eu dizer.

### 2. Como trabalhar comigo

**Etapa 1, antes de qualquer código de produção.** Protótipo estático descartável em HTML e CSS é permitido e fica na pasta de documentação, em `prototipos/`. Entregue, nesta ordem:

1. **Diagnóstico.** Leia o repositório, as instruções dele (AGENTS.md, CLAUDE.md, README) e as capturas. Aponte problemas concretos com medida, por exemplo “a lista de pacientes tem 2.400 px de altura no tamanho `desktop` e a paginação fica fora da tela”. Em projeto novo, o diagnóstico vira lista de premissas e riscos, com o que cada um muda no plano.
2. **Plano em entregas pequenas.** Cada entrega tem até 3 telas, é utilizável sozinha, pode ser validada por mim em 30 minutos e segue a ordem de dependência. Cinco entregas pequenas funcionaram melhor que uma grande.
3. **Imagens das telas propostas.** Monte protótipos estáticos em HTML e CSS com dados fictícios realistas e capture nos tamanhos `desktop` e `celular` da seção 4. Nesta etapa, prototipe a estrutura geral e as telas da primeira entrega, no máximo 4 telas; as demais ganham protótipo no início da própria entrega. Para as telas mais importantes ou discutíveis, mostre duas alternativas e diga qual recomenda e por quê. Inclua os estados que costumam dar problema: lista cheia, erro de formulário, celular. Se não puder gerar imagens, avise e entregue os protótipos HTML.
4. **Decisões de negócio a confirmar.** Uma tabela com a pergunta, as opções, a sua recomendação e a consequência de cada escolha.
5. **Critérios de aceite verificáveis.** Cada critério corresponde a um teste que você vai escrever ou, na acessibilidade, a um passo do roteiro manual da seção 4.
6. **Pare e aguarde.** A aprovação de uma tela não aprova as outras.

**Etapa 2, implementação.** Uma entrega por vez. Ao fim de cada uma, informe o que mudou, como foi validado e o que continua aberto. Depois pare e aguarde minha validação antes da próxima, salvo se eu disser “siga sem parar”.

**Respostas curtas minhas.** “Não sei, sugira” num campo da seção 1: traga a pergunta com a sua recomendação. “Siga os caminhos recomendados”: adote todas as suas recomendações pendentes e registre cada uma como decisão adotada por padrão; isso não autoriza commit, push nem publicação.

**Sem acesso ao repositório ou a um terminal.** Se você não puder ler o repositório ou executar comandos, diga isso na primeira linha, peça os arquivos de que precisa e entregue os comandos para eu rodar. Nunca relate como executado o que não executou.

**Conduta durante todo o trabalho:**

- Trate todo dado já existente como real: não copie para protótipo, teste, captura, documento nem resposta. Se encontrar dado pessoal em captura ou no repositório, avise e peça uma versão anonimizada. Com dado de saúde o cuidado é maior, porque a LGPD o classifica como dado pessoal sensível. Isto é recomendação técnica, não orientação jurídica.
- Não apague nem sobrescreva dados locais existentes. Para validar funções novas, use uma origem isolada (outra porta) com um cenário fictício gerado pelas próprias regras da aplicação, para que os dados de teste obedeçam às mesmas validações da interface.
- Preserve alterações que não são suas. Commit, push e publicação exigem autorização explícita, e cada autorização vale só para aquela ação.
- Relate com fidelidade: testes que falharam, testes instáveis, o que não foi verificado e toda diferença em relação às imagens aprovadas.
- Não crie integrações, regras contratuais, valores automáticos, permissões ou indicadores que eu não pedi. No protótipo, o que eu não pedi pode aparecer marcado como “proposta” e listado na tabela de decisões; nada disso é implementado sem aprovação.

### 3. Stack e arquitetura

Padrão para projeto novo: React, Vite, JavaScript/JSX e CSS Modules, com rotas em hash para funcionar em hospedagem estática e ao recarregar uma rota direta. Sem biblioteca visual pronta. Fonte servida localmente, em WOFF2 (família e pesos na seção 4). Node 22 ou mais novo. Não acrescente dependências sem necessidade. Se o projeto já usa TypeScript, mantenha; lint não substitui checagem de tipos.

Em evolução, a stack, a organização de pastas e a biblioteca visual do repositório prevalecem sobre esta seção. MVVM vale para módulos novos. Migração é decisão a confirmar, nunca pressuposto.

Organização MVVM por módulo, em `src/feature/<modulo>/{model,repository,view_model,view}`:

| Camada | Responsabilidade | Não pode |
| --- | --- | --- |
| View (`.jsx`) | Marcação, semântica, CSS, foco | Conter regra, acessar dados ou armazenamento |
| ViewModel (hook) | Rascunho do formulário, filtros, estado de envio, comandos, parâmetros da rota | Tocar em DOM, CSS ou armazenamento |
| Model | Funções puras: validação, regras, projeções, agregações | Importar React, DOM ou persistência |
| Repository | Executar o Model dentro de uma transação da sessão de dados | Importar React ou Views |

- A sessão de dados mantém um snapshot compartilhado, aceita uma gravação por vez, grava registro, histórico e auditoria juntos e só publica o novo estado depois de persistir.
- Na demonstração local, o armazenamento é o `localStorage`, em uma chave `<produto>:dados` com campo `versao` (em evolução, mantenha a chave que já existe). Antes de gravar, a sessão relê a chave; se outra aba gravou (evento `storage`), recarrega o snapshot e pede para repetir a ação.
- Com API existente, o Repository chama a API e não há snapshot local. Idempotência, conflito de versão, histórico e auditoria passam a ser do servidor: use o que o contrato oferece e leve à tabela de decisões o que ele não cobre.
- Configure o ESLint para impor essas fronteiras com `no-restricted-imports` e `no-restricted-globals` por pasta. Sem isso a separação se desfaz em poucas semanas.
- Uma regra usada por mais de um módulo fica em um único arquivo de funções puras. Nunca copie a regra.
- Cálculos de tela (posição em calendário, totais, agrupamentos) são funções puras testáveis sem navegador; a View só converte o resultado em posição, texto e cor.
- Componentes compartilhados desde o início: campo com rótulo e erro, botão, cabeçalho de página, estados de carregamento, vazio e erro, lista paginada, seletor com busca, abas e etiqueta de situação. Todos os tokens da seção 4 em um único arquivo.

### 4. Padrão de interface

**Tamanhos de referência.** São medidas da área útil do navegador, e o resto do prompt as cita pelo nome. Um notebook de 1366 × 768 não entrega 768 px à página: descontadas a barra do sistema e as do navegador, sobram cerca de 640 px de altura (estimativa; confirme no aparelho de quem vai usar). Por isso o tamanho principal é 1366 × 640.

| Nome | Área útil | Para quê |
| --- | --- | --- |
| `desktop` | 1366 × 640 | Principal: é nele que se mede “sem rolar a página”. Projeto `desktop` do Playwright. |
| `desktop-largo` | 1440 × 900 | Conferir que nada estica nem sobra. |
| `tablet` | 768 × 1024 | Menu recolhido, tabela com as colunas principais. |
| `celular` | 375 × 812 | Projeto `celular` do Playwright. |
| `reflow` | 320 × 568 | Reflow da WCAG 1.4.10, equivalente ao zoom de 400%. Nada rola na horizontal. |
| `zoom-200` | 683 × 320 | O `desktop` com zoom de 200%. |

Pontos de quebra: a partir de 1024 px, barra lateral fixa e tabela; abaixo de 1024 px, a barra lateral vira o topo da página, com o logotipo e um botão “Menu” que abre a navegação, e rola junto com ela; de 600 a 1023 px, a tabela mostra só as colunas principais; abaixo de 600 px, cartões no lugar da tabela, seletor de seção nos formulários e alternância entre lista e calendário na agenda. Neste prompt, “celular” quer dizer abaixo de 600 px; em código, `celular` é o tamanho 375 × 812 da tabela.

**Altura baixa.** Com a janela de até 480 px de altura (o zoom de 400% num monitor de 1280 × 1024 dá 320 × 256), tudo o que é fixo rola junto com a página: barra lateral, barra de ações e cabeçalho. Camada fixa que cobre mais da metade de uma janela dessas deixa a pessoa sem conteúdo. A grade da agenda também perde a rolagem própria e a página rola inteira.

**Estrutura.** Barra lateral escura com logotipo e navegação, área de trabalho clara, cabeçalho de página com título, uma frase de contexto e a ação principal à direita. Usuário e unidade ficam no rodapé da barra lateral; não há barra superior.

**Identidade visual.** Se eu não der identidade visual, use os tokens abaixo sem alterar e pergunte a cor de marca na tabela de decisões. Cor de marca são dois tokens, `--primaria` e `--destaque`; os outros não mudam com ela. Se eu pedir “três direções”, entregue três versões do painel no tamanho `desktop` que mudam só esses dois tokens, cada uma com a tabela de contraste recalculada.

```css
:root {
  /* cor de marca */
  --primaria: #145453;       /* botão primário, link, aba e item escolhidos, foco em área clara */
  --destaque: #1ed8cf;       /* só sobre --tinta ou --primaria; nunca em fundo claro */
  /* base */
  --tinta: #01101f;          /* texto principal; fundo da barra lateral */
  --fundo: #f5f8f7;          /* área de trabalho */
  --superficie: #ffffff;     /* cartão, tabela, campo, diálogo; é também o "branco" do texto sobre --primaria e sobre a barra lateral */
  --secundario: #35484e;     /* texto secundário, só em área clara */
  --linhas: #d8e2df;         /* divisória e contorno de cartão; texto da barra lateral */
  --borda: #6b7c80;          /* borda de campo, de botão secundário e de bloco da agenda */
  --neutro-fundo: #e9eeed;   /* hover, escolhido, desabilitado, etiqueta neutra */
  --desabilitado: #5a6b6f;   /* texto de controle desabilitado */
  --lateral-ativo: #10293a;  /* fundo do item ativo da barra lateral */
  --lateral-apoio: #a9bcb8;  /* texto de apoio e ícone inativo da barra lateral */
  /* situações: -texto sobre -fundo na etiqueta; -marca em barra, ponto e ícone */
  --positivo-texto: #0f4544; --positivo-fundo: #dff1ef; --positivo-marca: #145453;
  --aviso-texto: #6a4300;    --aviso-fundo: #fbefd9;    --aviso-marca: #a87400;
  --erro-texto: #8a1c13;     --erro-fundo: #fbe5e2;     --erro-marca: #c0362c;
  --info-texto: #1d3d70;     --info-fundo: #e3ebf8;     --info-marca: #3565b0;
  --neutro-texto: var(--secundario);                    --neutro-marca: var(--borda);
  /* séries de gráfico, nesta ordem */
  --serie-1: #008f88;
  --serie-2: #c2620f;
  /* forma */
  --raio-p: 10px;            /* campo, botão, bloco, item de menu */
  --raio-m: 14px;            /* cartão */
  --raio-g: 18px;            /* diálogo */
  --largura-lateral: 232px;
  --alvo: 44px;              /* menor largura e menor altura de um controle */
  --altura-linha: 48px;      /* linha de lista */
  /* tipografia */
  --fonte: "IBM Plex Sans", "Segoe UI", system-ui, sans-serif;
}
```

- **Barra lateral.** Fundo `--tinta`, texto `--linhas`, nome do produto e do usuário em branco, texto de apoio e ícone inativo em `--lateral-apoio`. Item ativo: fundo `--lateral-ativo`, texto branco em peso 600, faixa de 3 px em `--destaque` à esquerda e `aria-current="page"`. `--secundario` e botão primário não entram nela.
- **Superfícies.** Cartão em `--superficie` com contorno de 1 px em `--linhas`, sem sombra. Diálogo sobre véu de `--tinta` a 60% de opacidade. `--linhas` nunca é borda de campo nem de controle: para isso existe `--borda`.
- **Controles.** Botão primário: `--primaria` com texto branco; hover e pressionado em `--tinta`. Botão secundário e campo: `--superficie`, borda de 1 px em `--borda`, texto em `--tinta`; hover em `--neutro-fundo`. Escolhido (linha, bloco, opção): contorno de 2 px em `--primaria` sobre `--neutro-fundo`. Aba escolhida: texto em `--tinta` e traço inferior de 3 px em `--primaria`. Desabilitado: texto em `--desabilitado` sobre `--neutro-fundo`, sem borda. Erro de campo: borda de 2 px e mensagem em `--erro-texto`, com ícone. Foco: ver “Acessibilidade”.
- **Situações.** Etiqueta com o nome escrito, em `-texto` sobre `-fundo`. `-marca` serve a segmento de barra, ponto e ícone, nunca a texto. Os nomes das situações vêm da seção 1: associe cada um a um dos cinco papéis e mostre a associação na tabela de decisões.
- **Gráficos.** Séries na ordem dos tokens, sobre `--superficie`, cada uma com nome na legenda ou rótulo direto. Eixo em `--borda`, linhas de grade em `--linhas`. A partir da terceira série, a cor é decisão a confirmar.
- **Tipografia.** IBM Plex Sans nos pesos 400, 500 e 600, com tamanhos em `rem` (1rem = 16 px). Tamanho e altura de linha: título de página 26/32; título de seção 18/24; rótulo de campo, botão, aba, item de menu e dado principal da linha 16/22; cabeçalho de coluna, dado secundário, etiqueta de situação, legenda, definição de indicador e texto de bloco da agenda 14/20; número de indicador 30/36. Peso 600 em títulos, números de indicador, botões e no item de menu ou aba escolhidos; 500 em rótulos, abas, itens de menu e cabeçalhos de coluna; 400 no resto. No protótipo descartável a fonte pode vir de uma CDN.
- **Espaço e ícones.** Espaçamentos de 4, 8, 12, 16 ou 24 px; margem da área de trabalho de 24 px, 16 px abaixo de 600 px. Ícones em SVG, traço de 1,8 px, 20 px, sempre com texto ao lado ou nome acessível.

**Listagens.** O defeito mais comum é a lista alta, com a paginação fora da tela.

- A partir de 600 px, a lista é uma `<table>` com legenda oculta e `<th scope="col">`: uma linha de 48 px por registro, cabeçalho de colunas e as ações na própria linha. Abaixo de 600 px, vira uma `<ul>` de cartões de até 96 px, em que cada dado mantém o rótulo em texto.
- Ação de linha: até 2 botões de texto curto (“Abrir”, “Editar”) com nome acessível completo (“Editar Marina Teles”); as demais ficam em “Mais ações”. Em lista de painel lateral, a ação é um botão de ícone com o mesmo nome acessível.
- Cada lista declara a ordem padrão (por exemplo: nome, de A a Z). Coluna ordenável tem botão no cabeçalho e `aria-sort`, e a ordem vai para a URL.
- Paginação sempre. Escolha o tamanho da página para que busca, lista e paginação caibam no tamanho `desktop` sem rolar a página: 7 em listas simples, 5 em listas com filtros ou totais e em listas secundárias (históricos, relações), 4 em listas dentro de painéis laterais, 6 em diálogos de busca. Se a medida mostrar que não cabe, diminua o tamanho da página, nunca a fonte nem a altura da linha.
- Mostre a faixa e o total (“1–7 de 124”). Totais e somas consideram todos os registros filtrados, não só a página.
- Densidade vem de espaçamento e de uma linha por registro, não de letra pequena.

**Estado na URL.** Busca, filtros, aba, data, página, ordem e o ID interno do registro selecionado ficam na URL e sobrevivem a abrir um detalhe, voltar e recarregar. Exceção: texto de busca com dígito (CPF, telefone, número de cadastro) não vai para a URL, que fica no histórico e em link copiado; guarde em `sessionStorage`. Mudar um filtro volta à primeira página. Parâmetro inválido é limitado ao intervalo válido.

**Formulários.**

- Obrigatório é só o que a regra exige. Exemplo do Dental Flow: o cadastro de paciente exige apenas o nome.
- Formulário com mais de 8 campos vira seções navegáveis com contagem de preenchimento e barra de ações fixa; abaixo de 600 px, um seletor de seção. Com a janela de até 480 px de altura, a barra rola junto (ver “Altura baixa”).
- Um erro abre a seção do campo, leva o foco a ele e fica associado ao campo. Falha de gravação conserva tudo o que foi digitado e leva o foco ao aviso.
- Bloqueie o envio duplicado, inclusive dois envios antes da próxima renderização, e peça confirmação ao sair com alterações.
- Escolha única entre até 5 opções usa botões de opção com “limpar” quando for opcional, não um campo de texto livre.
- Ação que movimenta dinheiro ou encerra um registro (lançamento de caixa, conclusão de atendimento, inativação) passa por tela de conferência antes de gravar. Não há exclusão definitiva: registro é inativado com motivo; lançamento errado é estornado, não editado. É regra de negócio: confirme na tabela de decisões.

**Seleção em cadastros grandes.** Com mais de 50 itens, use um diálogo de busca em vez de um `select`. Digitar não muda a seleção, só escolher um resultado muda. Busca sem diferenciar acentos nem pontuação, por nome e por identificadores. Em cadastro de pessoas, para distinguir homônimos mostre o que existir, nesta ordem: data de nascimento, 4 últimos dígitos do telefone, código do cadastro; se nada existir, o código e a data do cadastro. Nunca o CPF completo (mostre `***.***.789-10`). Escape fecha e mantém a escolha anterior, com o foco de volta ao campo.

**Agenda ou calendário, se houver.** Com mais de 3 registros no mesmo horário, cartões lado a lado ficam ilegíveis.

- Escala de 48 px a cada 30 min. A grade tem rolagem própria e abre no horário atual; no tamanho `desktop` a página não rola.
- Sem filtro de responsável: um bloco por horário de início, com a quantidade e, em texto, quantos pedem ação (exemplo: “6 consultas” e, abaixo, “2 a confirmar”). A barra de situações é reforço, nunca o único sinal: 6 px, na borda esquerda do bloco, com legenda visível, ordem fixa dos segmentos e 2 px entre eles. O nome acessível do bloco diz tudo (exemplo: “sexta 9, 11:00, 6 consultas: 4 confirmadas, 2 a confirmar”).
- Com um responsável filtrado: cartões proporcionais à duração. Os que se sobrepõem ficam lado a lado, até 3 e só enquanto cada um mantiver 44 px de largura; o excedente vira um botão “+N”, que lista o horário no painel.
- Nenhum bloco ou cartão tem menos de 44 × 44 px: duração menor que 30 min ocupa 44 px e mostra a duração em texto. Se o texto do bloco não couber em 14 px, mostre menos dias; não reduza a fonte nem corte o texto.
- Blocos e cartões são botões, na ordem dia e depois horário; cada cabeçalho de dia é um botão que lista o dia. Escolher bloco ou dia move o foco para o título do painel, em qualquer largura. O dia de hoje traz a palavra “hoje”.
- Ao lado, um painel lista o dia ou o horário escolhido, 4 por página.
- Atalhos de período: Hoje, Esta semana, Próxima semana. Quando houver registros fora da área visível da grade, avise com a contagem e um botão que leva até eles.
- Abaixo de 768 px, o calendário mostra um dia por vez: seis colunas não dão 112 px ao bloco, e o texto de 14 px não cabe em menos. Os seis dias viram um seletor de botões de 44 px, e o dia escolhido aparece por extenso acima da grade.
- Abaixo de 600 px, alterne entre lista do dia e calendário, com a lista como padrão.

**Painel.** Abas por assunto, com filtro de período no topo e, havendo mais de uma unidade, filtro de unidade. Abas que mudam a URL são links com `aria-current="page"`. Indicador mostra só o rótulo e o número. A definição (o que conta e o que não conta) fica a um toque: um botão de informação de 44 × 44 px ao lado do rótulo, com nome acessível “Como é contado: <rótulo>” e `aria-expanded`, que abre o texto sob o número. Pendências com atalho que abre o módulo já filtrado. Não repita listas dos módulos no painel. Todo gráfico tem alternativa em tabela, com o alternador “Gráfico | Tabela” no próprio cartão, usa a mesma escala nas séries e não dá altura artificial ao zero. Abaixo de 600 px, as colunas lado a lado viram barras horizontais, uma linha por dia, com o valor no fim de cada barra e as mesmas cores e escala. O painel pode rolar a página.

**Estados.** Toda tela trata carregamento, vazio com a próxima ação, erro de leitura com “tentar novamente”, erro de gravação e sucesso. Inclua um painel de revisão para simular carregamento lento, falha de leitura e falha de gravação: é o que permite testar esses estados. Ele fica em `#/revisao`, fora da navegação principal, existe só no servidor de desenvolvimento e na origem isolada e não entra no build publicado.

**Linguagem.** Português direto, ações com verbo e objeto (exemplo: “Cadastrar paciente”), sem jargão técnico. Palavras financeiras exatas, por exemplo: valor apresentado não é valor recebido, orçamento não é receita, quantidade de registros não é ocupação. Tema escuro e outros idiomas ficam fora do padrão, salvo pedido na seção 1.

**Impressão e exportação.** Relatório tem versão de impressão sem navegação e exportação CSV: UTF-8 com BOM, separador `;`, fim de linha CRLF, número com vírgula decimal e sem símbolo de moeda, data `AAAA-MM-DD`. Valor desconhecido sai vazio. Célula de texto iniciada por `=`, `+`, `-` ou `@` recebe um apóstrofo na frente. Exportar gera evento de auditoria. Coluna com dado pessoal sensível (de saúde, por exemplo) só entra se eu pedir.

#### Acessibilidade

Alvo: WCAG 2.2 AA. Este trecho faz parte do piso da ordem de precedência.

- **Contraste.** Texto com 4,5:1 ou mais; texto secundário com 7:1 ou mais; borda de campo, estado de controle, foco e elemento de gráfico com 3:1 ou mais. Use só os pares da tabela abaixo. Par novo, inclusive o de uma cor que eu informar na seção 1, entra na tabela com a razão calculada antes de ir para a tela; se reprovar, pare e pergunte.
- **Tamanhos.** Nenhum texto abaixo de 14 px e rótulo de campo em 16 px (regra deste padrão; a WCAG não fixa tamanho de fonte). Controles com pelo menos 44 × 44 px.
- **Foco.** Sempre visível: contorno de 3 px com 2 px de afastamento, em `--primaria` nas áreas claras e em `--destaque` na barra lateral. Nunca encoberto: a página usa `scroll-padding-bottom` igual à altura da barra de ações fixa.
- **Teclado.** Navegação completa por teclado. Diálogos prendem o foco e o devolvem ao fechar. O primeiro elemento da página é o botão “Pular para o conteúdo”, que move o foco por script para o `<main>` (âncora não serve em rota em hash). A cada rota, `document.title` vira “Tela · Produto” e o foco vai para o `h1`. `<nav>` e `<main>` têm nome.
- **Estrutura.** Hierarquia de títulos sem saltos. Rótulo visível é obrigatório em campo de formulário; só pode ser ocultado na busca (com botão rotulado) e em ações de linha, e nesses casos o nome acessível continua.
- **Avisos.** Sucesso, faixa e total depois de filtrar, quantidade de resultados da busca e aviso de registros fora da área visível usam `role="status"`. Erro de leitura e de gravação usam `role="alert"`. Região em carregamento recebe `aria-busy="true"`.
- **Cor.** Nenhuma informação só por cor: situação tem o nome escrito, série de gráfico tem legenda, item escolhido tem contorno, erro tem ícone e mensagem.
- **Movimento.** Transições desligadas com `prefers-reduced-motion`.
- **Como provar.** Zero violação no axe por grupo de telas, mais um roteiro manual por tela: só teclado; zoom de 200% e de 400%; foco sempre visível e nunca encoberto; ordem de leitura; nenhuma informação só por cor. O relatório diz “WCAG 2.2 AA: verificado por axe e roteiro manual; leitor de tela não verificado”.

Contraste dos tokens, pela fórmula de luminância relativa da WCAG. Par que só passa em 3,0 não pode ser texto.

| Par | Texto ou traço | Fundo | Razão | Passa 4,5 | Passa 3,0 |
| --- | --- | --- | --- | --- | --- |
| Texto principal | `--tinta` `#01101f` | `--fundo` `#f5f8f7` | 17,94:1 | sim | sim |
| Texto principal | `--tinta` `#01101f` | `--superficie` `#ffffff` | 19,17:1 | sim | sim |
| Texto em hover ou em item escolhido | `--tinta` `#01101f` | `--neutro-fundo` `#e9eeed` | 16,36:1 | sim | sim |
| Texto secundário | `--secundario` `#35484e` | `--fundo` `#f5f8f7` | 8,98:1 | sim | sim |
| Texto secundário | `--secundario` `#35484e` | `--superficie` `#ffffff` | 9,60:1 | sim | sim |
| Texto secundário; etiqueta neutra | `--secundario` `#35484e` | `--neutro-fundo` `#e9eeed` | 8,19:1 | sim | sim |
| Link, aba escolhida, foco | `--primaria` `#145453` | `--fundo` `#f5f8f7` | 8,11:1 | sim | sim |
| Link, aba escolhida, foco | `--primaria` `#145453` | `--superficie` `#ffffff` | 8,67:1 | sim | sim |
| Contorno de escolhido | `--primaria` `#145453` | `--neutro-fundo` `#e9eeed` | 7,40:1 | sim | sim |
| Rótulo do botão primário | branco `#ffffff` | `--primaria` `#145453` | 8,67:1 | sim | sim |
| Rótulo do botão primário em hover | branco `#ffffff` | `--tinta` `#01101f` | 19,17:1 | sim | sim |
| Borda de controle; marca de neutro | `--borda` `#6b7c80` | `--superficie` `#ffffff` | 4,36:1 | não | sim |
| Borda de controle; marca de neutro | `--borda` `#6b7c80` | `--fundo` `#f5f8f7` | 4,08:1 | não | sim |
| Borda de controle; marca de neutro | `--borda` `#6b7c80` | `--neutro-fundo` `#e9eeed` | 3,72:1 | não | sim |
| Texto desabilitado | `--desabilitado` `#5a6b6f` | `--neutro-fundo` `#e9eeed` | 4,76:1 | sim | sim |
| Mensagem e borda de erro | `--erro-texto` `#8a1c13` | `--superficie` `#ffffff` | 9,31:1 | sim | sim |
| Mensagem e borda de erro | `--erro-texto` `#8a1c13` | `--fundo` `#f5f8f7` | 8,71:1 | sim | sim |
| Barra lateral: texto | `--linhas` `#d8e2df` | `--tinta` `#01101f` | 14,49:1 | sim | sim |
| Barra lateral: nome do produto e do usuário | branco `#ffffff` | `--tinta` `#01101f` | 19,17:1 | sim | sim |
| Barra lateral: texto de apoio, ícone inativo | `--lateral-apoio` `#a9bcb8` | `--tinta` `#01101f` | 9,65:1 | sim | sim |
| Barra lateral: texto do item ativo | branco `#ffffff` | `--lateral-ativo` `#10293a` | 15,00:1 | sim | sim |
| Barra lateral: faixa e ícone do item ativo | `--destaque` `#1ed8cf` | `--lateral-ativo` `#10293a` | 8,41:1 | sim | sim |
| Barra lateral: foco | `--destaque` `#1ed8cf` | `--tinta` `#01101f` | 10,75:1 | sim | sim |
| Destaque sobre ação primária | `--destaque` `#1ed8cf` | `--primaria` `#145453` | 4,86:1 | sim | sim |
| Etiqueta de positivo | `--positivo-texto` `#0f4544` | `--positivo-fundo` `#dff1ef` | 9,19:1 | sim | sim |
| Etiqueta de aviso | `--aviso-texto` `#6a4300` | `--aviso-fundo` `#fbefd9` | 7,64:1 | sim | sim |
| Etiqueta de erro | `--erro-texto` `#8a1c13` | `--erro-fundo` `#fbe5e2` | 7,72:1 | sim | sim |
| Etiqueta de informação | `--info-texto` `#1d3d70` | `--info-fundo` `#e3ebf8` | 8,96:1 | sim | sim |
| Marca de positivo | `--positivo-marca` `#145453` | `--neutro-fundo` `#e9eeed` | 7,40:1 | sim | sim |
| Marca de aviso | `--aviso-marca` `#a87400` | `--neutro-fundo` `#e9eeed` | 3,47:1 | não | sim |
| Marca de erro | `--erro-marca` `#c0362c` | `--neutro-fundo` `#e9eeed` | 4,71:1 | sim | sim |
| Marca de informação | `--info-marca` `#3565b0` | `--neutro-fundo` `#e9eeed` | 4,92:1 | sim | sim |
| Série 1 de gráfico | `--serie-1` `#008f88` | `--superficie` `#ffffff` | 3,97:1 | não | sim |
| Série 2 de gráfico | `--serie-2` `#c2620f` | `--superficie` `#ffffff` | 4,16:1 | não | sim |
| Proibido: destaque em fundo claro | `--destaque` `#1ed8cf` | `--superficie` `#ffffff` | 1,78:1 | não | não |
| Proibido: linhas como borda de campo | `--linhas` `#d8e2df` | `--superficie` `#ffffff` | 1,32:1 | não | não |
| Proibido: texto secundário na barra lateral | `--secundario` `#35484e` | `--tinta` `#01101f` | 2,00:1 | não | não |
| Proibido: botão primário na barra lateral | `--primaria` `#145453` | `--tinta` `#01101f` | 2,21:1 | não | não |

As marcas de situação estão medidas contra `--neutro-fundo`, o fundo do bloco escolhido; sobre `--superficie` e `--fundo` a razão é maior, e sobre o `-fundo` da própria situação a menor é 3,57:1 (aviso). `--linhas` como divisória ou contorno de cartão é decorativa e não entra na conta.

### 5. Dados e regras

- **Contrato de armazenamento.** Mantenha chave, versão, IDs e relações. Prefira mudanças aditivas: campos e coleções novos são opcionais e lidos como vazios quando ausentes. A leitura nunca grava. Mudança incompatível precisa ser proposta com a migração antes de ser feita.
- **Nada é atribuído em silêncio.** Registro antigo sem um dado novo aparece como pendência (exemplo do Dental Flow: “Sem clínica”), com uma tela para vincular explicitamente os registros escolhidos. Texto livre antigo é exibido como “registro anterior”, sem conversão automática.
- **Desconhecido não é zero.** Valor não informado fica vazio, é contado à parte e nunca entra em soma como zero.
- **Operações idempotentes.** Repetir uma ação de conclusão devolve o registro existente, sem duplicar itens nem histórico.
- **Situação que exige registro vira ação.** Se “Concluída” depende de informar o que foi feito, ela sai do campo de situação e passa a ser um botão com tela própria.
- **Travas explícitas.** O que foi enviado ou validado não muda até ser devolvido para correção. Estados de documentos (rascunho, enviado, em correção, validado) são independentes do estado do registro de origem.
- **Efeitos colaterais só quando pedidos.** Concluir um atendimento não cria lançamento financeiro; registrar estoque não cria pagamento.
- **Histórico e auditoria.** Cada gravação efetiva registra data, responsável e o que mudou, na mesma transação. Salvar sem mudança não gera evento.
- **Dinheiro em centavos inteiros.** Não invente desconto, arredondamento, comissão ou repasse.
- **Demonstração não é segurança.** Login e perfis locais são telas de demonstração: não persista senhas e não trate uma visão local como controle de acesso. Enquanto os dados forem locais, a tela de entrada mostra: “Demonstração: os dados ficam só neste navegador, sem proteção. Não cadastre pessoas reais.”
- **Dado fictício reconhecível.** Demonstração, protótipo, teste e documentação só levam dados fictícios, feitos para não se confundirem com reais: nomes inventados, e-mail em `example.com`, telefone com DDD 00 e CPF com dígito verificador inválido. Se a validação da interface recusar um desses valores, deixe o campo vazio; não gere um número válido.

### 6. Validação

Antes de dizer que uma entrega está pronta, rode e relate o resultado real de:

1. Lint.
2. Havendo TypeScript, `tsc --noEmit`.
3. Testes unitários dos Models, sem navegador e sem framework extra (`node --test`). Cada regra dos critérios de aceite tem um teste.
4. Build normal e build com o caminho base da hospedagem.
5. Testes de ponta a ponta com Playwright (`@playwright/test`) em dois projetos, `desktop` e `celular`, nos tamanhos da seção 4, no servidor de desenvolvimento e também na prévia do build final.

O que os testes de ponta a ponta precisam provar:

- Cada fluxo completo, seguido de recarregar a página e comparar o que ficou gravado.
- Falha de leitura e de gravação: mensagem, foco, preenchimento conservado e repetição sem duplicar. Esses testes dependem do painel de revisão e rodam só onde ele existe (servidor de desenvolvimento e origem isolada); na prévia do build, um teste confirma que `#/revisao` não existe.
- Teclado e foco nos diálogos e formulários.
- Uma varredura com axe (`@axe-core/playwright`) em todas as telas, dividida por grupo de telas, mais: nomes muito longos sem espaços, os tamanhos `reflow`, `zoom-200`, `tablet` e `desktop-largo`, nenhum erro de JavaScript e armazenamento inalterado pela simples consulta (com API: nenhuma requisição de escrita ao consultar).
- Que nenhum texto visível tem menos de 14 px e nenhum controle tem menos de 44 × 44 px, medidos por script em cada tela.
- Que listas principais mostram busca e paginação sem rolar a página no tamanho `desktop`, medindo a altura do documento contra a da janela.
- Que snapshots antigos abrem sem conversão e sem gravação (com API, este teste não se aplica).

Complete com capturas reais das telas na origem isolada e uma tabela de medidas (altura do documento e da janela, rolagem horizontal, menor fonte e menor controle, erros de console). Diga o que essa prova não cobre: teste com pessoas, leitor de tela, dispositivo físico, backend.

#### Checklist de aceite

Uma entrega só está pronta com todos os itens marcados e com a evidência de cada um no relatório.

- [ ] Os passos desta seção rodaram (o de TypeScript só havendo TypeScript) e o relatório traz o resultado real de cada um, inclusive o que falhou.
- [ ] No tamanho `desktop`, toda lista principal mostra busca e paginação sem rolar a página; a tabela de medidas traz a altura do documento e a da janela.
- [ ] Nenhuma tela tem rolagem horizontal nos tamanhos `reflow` e `zoom-200`.
- [ ] Zero violação no axe em cada grupo de telas, e o roteiro manual foi feito tela por tela (seção 4, Acessibilidade, “Como provar”).
- [ ] Toda cor usada é um token e todo par de texto e fundo está na tabela de contraste (seção 4).
- [ ] Nenhum texto abaixo de 14 px e nenhum controle abaixo de 44 × 44 px, medidos por script nas telas novas; a tabela de medidas traz a menor fonte e o menor controle.
- [ ] Cada tela nova foi exercitada em carregamento, vazio, erro de leitura, erro de gravação e sucesso (seção 4, Estados).
- [ ] Recarregar a página depois de cada fluxo mantém o que foi gravado, e a simples consulta não grava nada (seção 5).
- [ ] Protótipos, testes, capturas e documentos só têm dados fictícios (seção 2, Conduta; seção 5).
- [ ] O relatório lista toda diferença em relação às imagens aprovadas e diz o que não foi verificado.
- [ ] Nenhum commit, push ou publicação foi feito sem autorização dada para aquela ação.

### 7. Documentação e relatório

- README com o comportamento atual, como executar (com a versão do Node) e os limites.
- Um documento por entrega: pedido, decisões adotadas, contrato de dados, o que mudou, evidência executada, diferenças em relação ao aprovado e dependências abertas. Separe sempre decisão confirmada, proposta, implementação e evidência.
- Uma ficha curta por módulo com regras, arquivos, testes e limites, e um índice para localizar tudo.
- Guarde junto da documentação as imagens aprovadas, os protótipos (`prototipos/`), o gerador do cenário fictício e o servidor da origem isolada, com caminhos relativos.
- No relatório final, comece pelo que foi encontrado e validado, depois liste o que depende de mim.

### 8. Armadilhas que já custaram tempo

- **Lista que “cabe” só no monitor grande.** Meça no tamanho `desktop`, que já desconta as barras do navegador, e escreva um teste; a paginação some com dois registros a mais.
- **Compactar diminuindo a fonte.** Texto abaixo de 14 px, ou rótulo de campo abaixo de 16 px, piora a leitura. Compacte com espaçamento e com uma linha por registro.
- **Título removido para ganhar espaço.** Quebra a hierarquia de títulos. Oculte visualmente e mantenha no HTML.
- **Texto longo sem espaços.** Estoura grades e tabelas. Use `overflow-wrap: anywhere` e `min-width: 0` nas colunas flexíveis, e teste com nomes de 300 caracteres.
- **Rota em hash que não remonta.** Navegar para a mesma rota não reinicia o formulário. Trate isso na aplicação e, nos testes, navegue pelos links da interface.
- **Envio duplo no mesmo instante.** Desabilitar o botão não basta; trave no ViewModel e torne a operação idempotente no Model.
- **axe no meio de uma transição.** Ele pode ler uma cor intermediária e acusar contraste. Nas varreduras, emule movimento reduzido.
- **Moeda em pt-BR.** O separador entre “R$” e o número é um espaço não separável; nos testes use `\s`.
- **Seletores ambíguos.** O mesmo nome aparece na lista e na auditoria. Use papel, nome exato e a região.
- **Varredura única de todas as telas.** Estoura o tempo limite conforme o sistema cresce. Divida por grupo de telas.
- **Teste sensível a tempo.** Testes com relógio simulado ou envio lento falham quando a máquina está ocupada. Não rode processos pesados em paralelo e repita o teste isolado antes de concluir que é defeito.
- **Dois builds, uma pasta.** O build normal e o da hospedagem escrevem no mesmo lugar. O último build precisa ser o que será servido ou testado.
- **Migração “esperta”.** Preencher por inferência um dado que falta cria dado falso (exemplo do Dental Flow: unidade, forma de atendimento, valor). Pendência visível e vinculação explícita.
- **Indicador sem definição, ou com a definição escrita no cartão.** Todo número do painel tem a definição a um toque, dizendo o que conta e o que não conta. No cartão ficam só o rótulo e o número: texto a mais atrapalha quem precisa bater o olho.

### 9. Formato da sua primeira resposta

Responda somente com os itens da Etapa 1 da seção 2: diagnóstico, plano em entregas, imagens das telas propostas com a recomendação, tabela de decisões com respostas sugeridas e critérios de aceite. Termine dizendo o que precisa da minha aprovação para começar. Não escreva código de produção nesta etapa; protótipo estático não é código de produção.
