# Kit de frontend

Artefatos que qualquer agente de código usa para criar frontend com a sua cara, padrões consolidados do mercado e acessibilidade medida. O objetivo é parar o ciclo de refatorar telas que não agradaram.

| A causa do retrabalho | O que o kit faz |
| --- | --- |
| Visual decidido sem saber o que a marca quer dizer | [Brief de marca](skill/kit-frontend/references/marca/criar-marca.md) com mensagem, personas, concorrentes e voz, antes de qualquer tela |
| Pessoa sem fonte, cor, voz nem mensagem | [Caminho para quem não tem nada](skill/kit-frontend/references/marca/criar-marca.md#quando-a-pessoa-não-tem-nada): perguntas simples e opções para escolher, com [gerador de paleta](skill/kit-frontend/scripts/paleta.mjs) e [guia de fontes](skill/kit-frontend/references/recursos/fontes.md) |
| Código antes de a direção visual ser aprovada | Três direções em imagem, [comparadas](skill/kit-frontend/scripts/comparar-direcoes.mjs) para não serem a mesma tela, e tela-modelo: o agente para e espera |
| Gosto que precisa ser repetido a cada projeto | [Perfil de gosto](skill/kit-frontend/references/gosto/perfil.md) tirado das suas reprovações reais |
| "Está pronto" sem prova | [Verificador](skill/kit-frontend/scripts/verificar.mjs) que abre a tela no navegador e mede |
| Correção numa tela, esquecida nas outras | Toda reprovação vira regra em `design/correcoes.md` e volta para o kit |
| Cara de IA | [Lista do que denuncia](skill/kit-frontend/references/marca/anti-generico.md) e [método de identidade](skill/kit-frontend/references/marca/identidade.md) |
| "Para todos" só no texto | [Fichas por público](skill/kit-frontend/references/qualidade/publicos.md) e [Libras e mídia](skill/kit-frontend/references/padroes/midia-e-libras.md), ativadas pelo `PRODUTO.md` e cobradas pelo verificador |
| Reinventar o que já existe | [Padrões](skill/kit-frontend/references/) tirados do [benchmark](docs/pesquisa/benchmark.md) |
| Tela correta, mas sem impacto | [Criatividade](skill/kit-frontend/references/marca/criatividade.md), medida [nos sites que você admira](docs/pesquisa/referencias-sites.md) |
| Sem imagem, animação nem 3D | [Catálogo de bibliotecas e geração de mídia](skill/kit-frontend/references/recursos/bibliotecas.md) |

Princípio: **convenção na interação, identidade na expressão.** Como navegar e preencher segue o que as pessoas conhecem; tipografia, cor, forma e voz são do produto.

## Instalar

Precisa de Node 22 ou mais novo e de git com acesso ao repositório, que é privado. Clone o kit uma vez, ao lado dos seus projetos:

```bash
git clone https://github.com/gustavomot4/kit-frontend.git
```

Depois, dentro de cada projeto:

```bash
node ../kit-frontend/bin/kit.mjs instalar
```

Isso coloca a skill em `.agents/skills/kit-frontend/`, cria as pontes de cada agente detectado e `design/correcoes.md`. Nada do projeto é sobrescrito: blocos em arquivos existentes ficam entre marcadores, e `DESIGN.md`, `PRODUTO.md` e `design/correcoes.md` nunca são tocados.

Para valer em todos os projetos da máquina:

```bash
node ../kit-frontend/bin/kit.mjs instalar --global
```

Para atualizar, rode `git pull` no clone e `node ../kit-frontend/bin/kit.mjs atualizar` no projeto. A instalação com `npx github:` não funciona no npm 12, que bloqueia pacotes vindos de git por padrão.

### Compatibilidade

| Agente | Como recebe |
| --- | --- |
| Claude Code | `.claude/skills/` e `CLAUDE.md` (sempre) |
| Codex, Amp, opencode, Zed, Factory, Devin e outros | `AGENTS.md` e `.agents/skills/` |
| Cursor | `.cursor/skills/` e `.cursor/rules/`, quando detecta `.cursor/` |
| GitHub Copilot | `.github/skills/` e `.github/copilot-instructions.md`, quando detecta `.github/` |
| Gemini CLI | `AGENTS.md`, `.agents/skills/` e `.gemini/skills/` |
| Windsurf, Cline | Regra em `.windsurf/rules/` e `.clinerules/` |
| ChatGPT, Gemini, Claude na web, ou qualquer LLM sem arquivos | Cole [`dist/prompt-unico.md`](dist/prompt-unico.md) |

Force outros agentes com `--agentes cursor,copilot` ou `--agentes todos`. O Codex achou e seguiu a skill num [teste real](docs/testes/2026-10-31-outro-agente/relatorio.md). Nos outros, testei a instalação e os arquivos gerados, mas não abri cada agente para confirmar que lê as pontes.

## Usar

Peça o que pediria normalmente: "cria o painel de agendamentos". O agente acha a skill e segue as etapas:

1. **Entende** o produto em `PRODUTO.md`, com no máximo 5 perguntas.
2. **Define a marca** em `MARCA.md`: mensagem, personas, concorrentes, personalidade e voz. Você confirma.
3. **Mostra três direções** em imagem. Você escolhe ou mistura.
4. **Trava** a decisão em `DESIGN.md`, o formato aberto do Google, e faz o kit de identidade: logotipo, ícone, fontes e manual.
5. **Constrói a tela-modelo** em código. Você aprova.
6. **Constrói o resto**, por entregas de até 3 telas, consultando os padrões.
7. **Verifica** cada tela e mostra o resultado real.
8. **Aprende:** cada reprovação vira regra e é corrigida em todas as telas.

## Comandos

Rode dentro do projeto, para as capturas ficarem na pasta dele.

```bash
node ../kit-frontend/bin/kit.mjs verificar http://localhost:5173/agenda
```

```bash
node ../kit-frontend/bin/kit.mjs direcoes design/direcoes
```

```bash
node ../kit-frontend/bin/kit.mjs escolha design/direcoes
```

```bash
node ../kit-frontend/bin/kit.mjs contraste DESIGN.md
```

```bash
node ../kit-frontend/bin/kit.mjs marca
```

```bash
node ../kit-frontend/bin/kit.mjs paleta "#0e5f4b"
```

```bash
node ../kit-frontend/bin/kit.mjs referencia https://site-de-que-voce-gosta.com.br
```

```bash
node ../kit-frontend/bin/kit.mjs coletar
```

Depois de mudar a skill ou um PRD, rode dentro do clone do kit:

```bash
node bin/kit.mjs empacotar
```

`verificar` testa 1440 × 900, 768 × 1024, 375 × 812 com toque e 320 × 256 (zoom de 400%), com passada de Tab e movimento reduzido. Também mede letra em 200%, espaçamento, alto contraste, fotos cortadas e peso, e guarda a página inteira (`desktop-inteira.jpg`, `celular-inteira.jpg`), `prancha.html` (a tela sem cada cor e embaçada) e `leitor-de-tela.txt`. Com `publicos:` no `PRODUTO.md`, ou `--publicos`, o rigor muda conforme quem usa. `direcoes` compara as propostas visuais e reprova as quase iguais. `coletar` traz as correções de um projeto para o kit, e é assim que ele aprende o seu gosto. `empacotar` gera os estilos por seção e o prompt único.

## Estilos de partida

Receitas completas, extraídas de produtos reais. Dão estrutura e medidas; a identidade vem do `DESIGN.md`. [Quando usar cada um e o que trocar antes](skill/kit-frontend/references/recursos/estilos.md).

| PRD | Use para | Versão | Exemplos |
| --- | --- | --- | --- |
| [Design system base](prds/base-design-system/prd.md) | Produto sem PRD específico: landing, fluxo ou ferramenta, em linguagem sóbria, com neutros e um único acento | 3.0.0 | [landing](prds/base-design-system/exemplos/landing.png) · [ferramenta](prds/base-design-system/exemplos/ferramenta.png) |
| [Site de escola de idiomas](prds/site-escola-idiomas/prd.md) | Site institucional de escola de idiomas ou curso livre, voltado a matrícula e captação de contatos | 4.0.0 | [home](prds/site-escola-idiomas/exemplos/home.png) · [página de curso](prds/site-escola-idiomas/exemplos/pagina-de-curso.png) |
| [Sistema de gestão](prds/sistema-gestao/prd.md) | Sistema de trabalho com painel, agenda, cadastros, listas e relatórios. Traz também processo, arquitetura e validação | 3.0.0 | [painel](prds/sistema-gestao/exemplos/painel.png) · [agenda](prds/sistema-gestao/exemplos/agenda.png) |
| [Sistema de clínica no estilo conversa](prds/sistema-clinica-conversa/prd.md) | Sistema de atendimento com agenda, usado pela recepção no computador e no celular | 2.0.0 (rascunho) | [hoje](prds/sistema-clinica-conversa/exemplos/hoje.png) · [agenda](prds/sistema-clinica-conversa/exemplos/agenda-semana.png) · [celular](prds/sistema-clinica-conversa/exemplos/hoje-celular.png) |
| [Aplicativo acessível orientado a tarefas](prds/app-tarefas-acessivel/prd.md) | Aplicativos de atendimento, catálogos, comunidades e solicitações, com controles grandes, formulários por etapas e três temas | 2.0.0 (rascunho) | [catálogo](prds/app-tarefas-acessivel/exemplos/catalogo.png) · [etapa de formulário](prds/app-tarefas-acessivel/exemplos/etapa.png) |

Marcas, nomes e dados das telas de exemplo são fictícios. O que ainda falha está em [pendências](docs/pendencias.md).

## Estrutura

```
.
├── README.md                 o que é e como instalar
├── AGENTS.md                 como trabalhar neste repositório
├── package.json              metadados do comando
├── bin/kit.mjs               instalador e comandos
├── skill/kit-frontend/       o que é instalado nos projetos
│   ├── SKILL.md              entrada: etapas e portões
│   ├── references/
│   │   ├── gosto/            perfil do dono e correções coletadas
│   │   ├── marca/            criar a marca, identidade, criatividade, anti-genérico
│   │   ├── padroes/          uma ficha por tipo de tela
│   │   ├── qualidade/        acessibilidade
│   │   └── recursos/         bibliotecas, fontes e estilos de partida
│   ├── assets/
│   │   ├── modelos/          MARCA.md, DESIGN.md, PRODUTO.md, correções, mídia
│   │   └── exemplos/         marca e design preenchidos
│   ├── scripts/              verificador, comparador de direções, contraste, paleta, referências, marca, logotipo, prancha, tokens
│   └── estilos/              PRDs por seção (gerado)
├── prds/                     fonte dos estilos, com exemplos e o modelo de PRD novo
├── dist/                     prompt único e llms.txt (gerado)
├── docs/
│   ├── CONTRIBUTING.md       o padrão do repositório
│   ├── pendencias.md         o que falta fazer
│   ├── pesquisa/             benchmark e medições dos sites
│   ├── testes/               calibração e teste cego, com telas e relatório
│   └── auditorias/           registro das rodadas de auditoria
└── ferramentas/              validador do repositório, testes e fixtures
```

Na raiz fica só o que uma convenção exige ali. O validador recusa arquivo solto.

## Mudar o kit

Ver [CONTRIBUTING.md](docs/CONTRIBUTING.md) e [AGENTS.md](AGENTS.md). Antes de concluir:

```bash
node bin/kit.mjs empacotar
```

```bash
node ferramentas/validar.mjs
```

```bash
node ferramentas/testar.mjs
```

## Auditorias

- [Rodada de 2026-10-09](docs/auditorias/2026-10-09/relatorio.md): 168 achados nas versões 1.0.0 de três PRDs. As correções estão no `CHANGELOG.md` de cada um.
- Sem auditoria, por isso em `rascunho`: `app-tarefas-acessivel` e `sistema-clinica-conversa`. Os três estáveis estão em 3.x e 4.x e aguardam nova rodada.
