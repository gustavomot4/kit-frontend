# Benchmark: o que cada sistema faz bem e o que o kit aproveitou

Consulta feita em 30/10/2026, com acréscimos de 31/10 e 01/11/2026. **Lido na fonte** quer dizer que abri a página oficial; entrevistas publicadas por fornecedores são identificadas como tais. **Observação** quer dizer que vem do uso do produto ou de conhecimento geral, sem documento oficial lido nesta rodada: trate como ponto de partida.

## Sistemas de design e produtos

| Sistema | O que faz bem | O que entrou no kit | Onde | Base |
| --- | --- | --- | --- | --- |
| GOV.UK Design System | Formulário para toda a população, testado com gente real | Validar ao avançar; resumo de erros com foco; "Erro:" no título; uma pergunta por página; não pedir duas vezes | `padroes/formulario` | Lido na fonte |
| Carbon (IBM) | Tabela densa e estados vazios bem tipificados | Cinco alturas de linha; cabeçalho igual à linha; paginação no rodapé; barra de lote; tipos de vazio; uma ação por estado | `padroes/lista-tabela`, `padroes/estados` | Lido na fonte |
| Atlassian | Escrita de mensagens | Estrutura causa, o que fazer e consequência; não inventar causa; "por favor" só em caso grave | `padroes/retorno`, `padroes/estados` | Lido na fonte |
| Apple HIG | Tamanhos e ampliação de texto | 44pt no toque, 28pt com mouse; ampliação de 200%; regras de movimento reduzido; contraste nos dois temas | `padroes/navegacao`, `padroes/tema-escuro`, `gosto` | Lido na fonte |
| Android, classes de janela | Faixas de largura objetivas | 600, 840, 1200; altura abaixo de 480 desaconselha dois painéis, o que deu base à regra das barras fixas | `padroes/navegacao`, `acessibilidade` | Lido na fonte |
| Linear (refresh de 03/2026) | Densidade sem ruído, tema gerado de poucas variáveis | Navegação recua para o conteúdo; hierarquia por peso e contraste; menos separadores e ícones | `padroes/painel`, `padroes/navegacao` | Lido na fonte |
| Stripe | Cor acessível de forma sistemática | Espaço de cor perceptual para ter contraste previsível | `identidade` | Resumo da busca sobre o texto da Stripe (2019) |
| Shopify Polaris | Índice de recursos | Filtros e abas de visão acima da lista, ação em massa contextual | `padroes/lista-tabela` | Observação. A documentação mudou de endereço e não foi lida |
| Material 3 | Tema escuro por elevação | Camadas mais claras no alto, fundo não preto | `padroes/tema-escuro` | Observação. A página não carregou conteúdo |
| WhatsApp, Instagram | Familiaridade para qualquer pessoa | Lista de conversas, abas embaixo, "Desfazer" | `padroes/agenda`, `padroes/navegacao` | Observação |
| Uber, 99, iFood | Fluxo para população ampla | Uma decisão por tela, escolha por cartão, folha inferior | `padroes/formulario`, `padroes/agenda` | Observação |
| Google Calendar | Grade de horários | Linha do agora, clicar para criar | `padroes/agenda` | Observação |

## Norma e lei

| Fonte | O que entrou | Base |
| --- | --- | --- |
| WCAG 2.2 | Piso; 1.4.10 (320 e 256px); 2.4.11; 2.5.8 | Lido na fonte (2.5.8 pela lista de critérios novos e conhecimento geral: 24px) |
| ABNT NBR 17225:2025 | Norma brasileira, alinhada à WCAG 2.2, com 146 diretrizes | Notícias e resumos; o texto da norma não foi lido |
| Lei 13.146/2015 | Art. 63: sites de empresas com sede ou representação no país e de governo; símbolo de acessibilidade em destaque | Lido na fonte. O que exige de cada caso segue sendo questão jurídica |
| Lei 10.436/2002 | Libras é língua e não substitui o português escrito | Lido na fonte |
| Lei 15.263/2025 | Roteiro de linguagem simples do art. 5º; vale para o poder público | Lido na fonte |
| WCAG 2.2: 1.2.6, 1.4.1, 1.4.8 | Libras em mídia (AAA), uso de cor (A), medida de linha, justificação e entrelinha (AAA, adotados como aviso) | Lido na fonte |
| WCAG 3.0, rascunho de 10/09/2026 | O algoritmo de contraste ainda não foi definido. O kit fica em 4,5:1 e 3:1 | Lido na fonte |
| W3C, conteúdo para dificuldades cognitivas (2021) | Metas da ficha `cognitivo` | Lido na fonte |

Se a obrigação legal importar num projeto, peça leitura jurídica.

## Como distribuir para vários agentes

| Formato | Situação em 10/2026 | Decisão |
| --- | --- | --- |
| Agent Skills (`SKILL.md`) | Padrão aberto em agentskills.io: nome e descrição, instruções abaixo de 5 mil tokens, referências sob demanda | **Formato principal** |
| Pastas das skills | `.agents/skills/` é o caminho compartilhado, segundo fontes secundárias que divergem. A documentação do Claude Code cita só `.claude/skills/` | Cópia única em `.agents/skills/`, com ponte nas pastas de cada agente |
| `AGENTS.md` | Mantido pela Agentic AI Foundation (Linux Foundation). Página oficial lista mais de 20 ferramentas | Bloco curto apontando para a skill |
| `DESIGN.md` | Formato do Google Labs, em alpha: tokens em YAML e prosa, com `lint`, `diff` e exportação para DTCG e Tailwind | **Formato do que o agente produz** em cada projeto |
| Tokens DTCG | Primeira versão estável em 10/2025 (não é norma W3C formal) | Pelo `export` do `DESIGN.md`, quando a stack pedir |
| Chat sem arquivos | Sem suporte a skills | `dist/prompt-unico.md` |

## Concorrentes diretos

| Projeto | Abordagem | O que aprendemos | O que o kit faz diferente |
| --- | --- | --- | --- |
| Impeccable | Comandos de ajuste e detector determinístico, com `PRODUCT.md` e `DESIGN.md` | Detector sem LLM funciona; contexto em arquivo; instalar por agente | Perfil de um dono real e correções que acumulam |
| Skill `frontend-design` (Anthropic) | Plano em dois passes antes de codar, revisando o que caiu no padrão | Tipografia carrega personalidade; lista de clichês atualizada, inclusive creme e terracota | Portões de aprovação com imagem e verificador |
| Web Interface Guidelines (Vercel) | Regras em `AGENTS.md` e skill de revisão | Regras objetivas de interação | Regras ligadas a padrões de tela |
| UI UX Pro Max | Banco pesquisável por tipo de produto | Consulta sob demanda gasta menos contexto; proveniência de dados | As tabelas empurram o padrão da categoria; o kit parte do mundo do produto |
| Interface Design | Ofício de produto e `system.md` | Testes de troca, de assinatura e de nome de token; filtro de falso positivo | Cobre marca e landing, e mede no navegador |

Nada foi copiado desses projetos: as regras foram escritas aqui a partir do que eles ensinam e do histórico do dono.

## Marca

| Fonte | O que entrou em `references/marca/criar-marca.md` | Base |
| --- | --- | --- |
| Nielsen Norman Group: tom de voz | Quatro dimensões: formal ou casual, sério ou engraçado, respeitoso ou irreverente, neutro ou entusiasmado; o tom varia com o momento | Lido na fonte |
| Nielsen Norman Group: tipos de persona | Persona por hipótese é barata e pode reforçar premissas erradas; a qualitativa, com 5 a 30 pessoas, serve à maioria | Lido na fonte |
| SIL Open Font License | Pode modificar e usar comercialmente; não vender a fonte sozinha; Nome Reservado; documento criado com a fonte não é alcançado | Lido na fonte |

## Públicos, Libras e leitura

| Fonte | O que entrou | Onde | Base |
| --- | --- | --- | --- |
| VLibras: página oficial e documentação do widget | Gratuito, automático; instalação por uma linha. Testado no Chrome em 31/10/2026: o botão aparece, e o script baixa de `vlibras.gov.br` e `cdn.jsdelivr.net` | `padroes/midia-e-libras` | Lido na fonte e testado |
| Hand Talk | Alternativa comercial. Não avaliada | `padroes/midia-e-libras` | Página aberta, sem preço |
| Nielsen Norman: usuários com pouca leitura | Coluna única, menu linear, o principal no alto, nada se mexendo | `qualidade/publicos` | Lido na fonte |
| Wery e Diliberto (OpenDyslexic) | Não prometer fonte para dislexia | `qualidade/publicos` | Lido na fonte; estudo pequeno, com 12 alunos |
| FTC sobre a accessiBe, 04/2025 | Widget não é atestado | `qualidade/publicos` | Lido na fonte |
| Censo 2022 e Inaf 2024 | Tamanho do público | `qualidade/publicos` | Por CNN Brasil e Poder360; IBGE e Inaf não abriram |
| Martins et al. (1996), índice adaptado ao português | `a11y-leitura-dificil`. A constante 248,835 foi deduzida de fontes secundárias (206,835 + 42) e calibrada em [teste próprio](../testes/2026-10-31-fase-1/relatorio.md) | `qualidade/acessibilidade` | Resumos; o relatório original não foi lido |

## Fontes

- [Nielsen Norman: tom de voz](https://www.nngroup.com/articles/tone-of-voice-dimensions/), [tipos de persona](https://www.nngroup.com/articles/persona-types/), [SIL Open Font License](https://openfontlicense.org/open-font-license-official-text/)
- GOV.UK: [validação](https://design-system.service.gov.uk/patterns/validation/), [páginas de pergunta](https://design-system.service.gov.uk/patterns/question-pages/)
- Carbon: [tabela de dados](https://carbondesignsystem.com/components/data-table/usage/), [estados vazios](https://carbondesignsystem.com/patterns/empty-states-pattern/)
- [Atlassian: mensagens de erro](https://atlassian.design/foundations/content/designing-messages/error-messages)
- [Apple HIG: acessibilidade](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [Android: classes de janela](https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes)
- [Linear: bastidores do refresh](https://linear.app/now/behind-the-latest-design-refresh)
- [Stripe: sistemas de cor acessíveis](https://stripe.com/blog/accessible-color-systems)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- ABNT NBR 17225: [Agência Gov](https://agenciagov.ebc.com.br/noticias/202503/com-apoio-do-governo-federal-nova-norma-tecnica-da-abnt-e-instituida-para-impulsionar-acessibilidade-digital-no-brasil), [Câmara dos Deputados](https://www2.camara.leg.br/a-camara/estruturaadm/gestao-na-camara-dos-deputados/responsabilidade-social-e-ambiental/acessibilidade/normas-da-abnt-1)
- [Agent Skills: especificação](https://agentskills.io/specification), [AGENTS.md](https://agents.md/), [DESIGN.md](https://github.com/google-labs-code/design.md), [Skills no Claude Code](https://code.claude.com/docs/en/skills), [tokens DTCG](https://designtokens.org/)
- Pastas por agente, em fonte secundária: [mdskills](https://www.mdskills.ai/docs/install-skills)
- [Impeccable](https://github.com/pbakaus/impeccable), [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design), [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines), [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), [Interface Design](https://github.com/Dammyjay93/interface-design)
- WCAG 2.2: [1.2.6](https://www.w3.org/WAI/WCAG22/Understanding/sign-language-prerecorded.html), [1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), [1.4.8](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html); [WCAG 3.0](https://www.w3.org/TR/wcag-3.0/); [W3C, dificuldades cognitivas](https://www.w3.org/TR/coga-usable/)
- Leis: [10.436/2002](https://www.planalto.gov.br/ccivil_03/leis/2002/l10436.htm), [13.146/2015](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm), [15.263/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15263.htm)
- [VLibras](https://www.gov.br/governodigital/pt-br/acessibilidade-e-usuario/vlibras), [widget](https://vlibras.gov.br/doc/widget/installation/webpageintegration.html); [Hand Talk](https://www.handtalk.me/br/); [FTC](https://www.ftc.gov/news-events/news/press-releases/2025/04/ftc-approves-final-order-requiring-accessibe-pay-1-million)
- [Nielsen Norman: pouca leitura](https://www.nngroup.com/articles/writing-for-lower-literacy-users/); [Wery e Diliberto](https://pmc.ncbi.nlm.nih.gov/articles/PMC5629233); [ALT: legibilidade em português](https://arxiv.org/abs/2203.12135); [National Eye Institute](https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases/color-blindness)
- [Censo 2022, por CNN Brasil](https://www.cnnbrasil.com.br/saude/brasil-tem-144-milhoes-de-pessoas-com-deficiencia-diz-ibge/); [Inaf 2024, por Poder360](https://www.poder360.com.br/poder-educacao/3-em-cada-10-brasileiros-sao-analfabetos-funcionais-diz-estudo/)

## Criatividade

Os sites de marca que o dono citou em 30/10/2026 foram medidos em [referencias-sites.md](referencias-sites.md), e o resultado está em `skill/kit-frontend/references/marca/criatividade.md`.

## Identidade e construção de sistemas — 01/11/2026

As sete referências novas do dono foram estudadas em [identidade-e-sistemas.md](identidade-e-sistemas.md). Ali estão os links de cada página e a distinção entre sinais observados, documentos e interpretações do agente.

| Fonte consultada | Base e escopo | O que entrou | Onde |
| --- | --- | --- | --- |
| [Canva Engineering: Easel](https://www.canva.dev/blog/engineering/adding-responsiveness-to-canvas-design-system/) | Lido na fonte; artigo de 22/08/2024 | Composição e regras compartilhadas de layout | `marca/criatividade`, modelo `design` |
| [Canva: tokens](https://www.canva.dev/docs/apps/app-ui-kit/design-tokens/) e [tipografia](https://www.canva.dev/docs/apps/design-guidelines/typography/) | Lido na fonte; documentação pública para apps no Canva | Papéis semânticos de valores e estilos; variantes dos componentes | `marca/criatividade`, modelo `design` |
| [Netflix TechBlog: Hawkins](https://netflixtechblog.com/hawkins-diving-into-the-reasoning-behind-our-design-system-964a7357547) | Lido na fonte; relato de 10/02/2021 sobre Netflix Studio | Base reutilizável e composições específicas com documentação | `marca/criatividade` |
| [Figma: Andes, com a equipe do Mercado Libre](https://www.figma.com/customers/mercado-libre-scales-design-across-latin-america/) | Lido na fonte do relato: entrevista publicada pelo fornecedor; sem inspeção do código | Núcleo compartilhado e padrões de domínio | `marca/criatividade` |
| McDonald’s, BK, Canva, Globoplay, Netflix, Mercado Livre e Inter | Observação das superfícies descritas no estudo; inferências identificadas. Nenhuma preferência por detalhe foi atribuída ao dono | Relacionar mensagem, sinal visual, regra de componente e tarefa; medidas sem receita universal | `gosto/perfil`, `marca/criatividade`, `marca/identidade`, `SKILL.md`, modelos `ideias` e `design` |

## O que falta estudar

Interior dos apps de Nubank, iFood e Mercado Livre; a home do iFood, que parou numa verificação de segurança; ERP brasileiros; Padrão Digital de Governo (gov.br/ds não carregou conteúdo); teste com leitor de tela e com pessoas do público.
