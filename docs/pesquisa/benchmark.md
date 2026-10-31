# Benchmark: o que cada sistema faz bem e o que o kit aproveitou

Consulta feita em 30/10/2026. **Lido na fonte** quer dizer que abri a página oficial. **Observação** quer dizer que vem do uso do produto ou de conhecimento geral, sem documento oficial lido nesta rodada: trate como ponto de partida.

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
| Lei 13.146/2015 | Citada sem afirmar obrigação específica | Não confirmei o artigo nesta rodada |

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

Nada foi copiado desses projetos: as regras foram escritas aqui a partir do que eles ensinam e do histórico do dono.

## Marca

| Fonte | O que entrou em `references/marca/criar-marca.md` | Base |
| --- | --- | --- |
| Nielsen Norman Group: tom de voz | Quatro dimensões: formal ou casual, sério ou engraçado, respeitoso ou irreverente, neutro ou entusiasmado; o tom varia com o momento | Lido na fonte |
| Nielsen Norman Group: tipos de persona | Persona por hipótese é barata e pode reforçar premissas erradas; a qualitativa, com 5 a 30 pessoas, serve à maioria | Lido na fonte |
| SIL Open Font License | Pode modificar e usar comercialmente; não vender a fonte sozinha; Nome Reservado; documento criado com a fonte não é alcançado | Lido na fonte |

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
- [Impeccable](https://github.com/pbakaus/impeccable), [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design), [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines)

## Criatividade

Os sites de marca que o dono citou em 30/10/2026 foram medidos em [referencias-sites.md](referencias-sites.md), e o resultado está em `skill/kit-frontend/references/marca/criatividade.md`.

## O que falta estudar

Interior dos apps de Nubank, iFood e Mercado Livre; a home do iFood, que parou numa verificação de segurança; ERP brasileiros; Padrão Digital de Governo (gov.br/ds não carregou conteúdo); teste com leitor de tela e com pessoas do público.
