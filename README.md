# Kit de frontend

Artefatos que qualquer agente de código usa para criar frontend com a sua cara, padrões consolidados do mercado e acessibilidade medida. O objetivo é parar o ciclo de refatorar telas que não agradaram.

| A causa do retrabalho | O que o kit faz |
| --- | --- |
| Código antes de a direção visual ser aprovada | Três direções em imagem e tela-modelo: o agente para e espera |
| Gosto que precisa ser repetido a cada projeto | [Perfil de gosto](skill/kit-frontend/references/gosto.md) tirado das suas reprovações reais |
| "Está pronto" sem prova | [Verificador](skill/kit-frontend/scripts/verificar.mjs) que abre a tela no navegador e mede |
| Correção numa tela, esquecida nas outras | Toda reprovação vira regra em `design/correcoes.md` e volta para o kit |
| Cara de IA | [Lista do que denuncia](skill/kit-frontend/references/anti-generico.md) e [método de identidade](skill/kit-frontend/references/identidade.md) |
| Reinventar o que já existe | [Padrões](skill/kit-frontend/references/) tirados do [benchmark](pesquisa/benchmark.md) |
| Tela correta, mas sem impacto | [Criatividade](skill/kit-frontend/references/criatividade.md), medida [nos sites que você admira](pesquisa/referencias-sites.md) |
| Sem imagem, animação nem 3D | [Catálogo de bibliotecas e geração de mídia](skill/kit-frontend/references/bibliotecas.md) |

Princípio: **convenção na interação, identidade na expressão.** Como navegar e preencher segue o que as pessoas conhecem; tipografia, cor, forma e voz são do produto.

## Instalar

Precisa de Node 22 ou mais novo e, enquanto o repositório for privado, de git autenticado com acesso a ele. Dentro do projeto:

```bash
npx github:gustavomot4/kit-frontend instalar
```

Isso coloca a skill em `.agents/skills/kit-frontend/`, cria as pontes de cada agente detectado e `design/correcoes.md`. Nada do projeto é sobrescrito: blocos em arquivos existentes ficam entre marcadores, e `DESIGN.md`, `PRODUTO.md` e `design/correcoes.md` nunca são tocados.

Para valer em todos os projetos da máquina:

```bash
npx github:gustavomot4/kit-frontend instalar --global
```

Com o repositório clonado, os mesmos comandos funcionam com `node bin/kit.mjs`, que é o que os comandos abaixo usam. `coletar` precisa do clone, porque grava as correções no próprio kit.

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

Force outros agentes com `--agentes cursor,copilot` ou `--agentes todos`. Testei a instalação e os arquivos gerados; não abri cada um desses agentes para confirmar que lê as pontes.

## Usar

Peça o que pediria normalmente: "cria o painel de agendamentos". O agente acha a skill e segue as etapas:

1. **Entende** o produto em `PRODUTO.md`, com no máximo 5 perguntas.
2. **Mostra três direções** em imagem. Você escolhe ou mistura.
3. **Trava** a decisão em `DESIGN.md`, o formato aberto do Google.
4. **Constrói a tela-modelo** em código. Você aprova.
5. **Constrói o resto**, por entregas de até 3 telas, consultando os padrões.
6. **Verifica** cada tela e mostra o resultado real.
7. **Aprende:** cada reprovação vira regra e é corrigida em todas as telas.

## Comandos

```bash
node bin/kit.mjs verificar http://localhost:5173/agenda
```

```bash
node bin/kit.mjs contraste DESIGN.md
```

```bash
node bin/kit.mjs coletar ../meu-projeto
```

```bash
node bin/kit.mjs empacotar
```

`verificar` testa 1440 × 900, 768 × 1024, 375 × 812 com toque e 320 × 256 (zoom de 400%), com passada de Tab e movimento reduzido. `coletar` traz as correções de um projeto para o kit, e é assim que ele aprende o seu gosto. `empacotar` gera os estilos por seção e o prompt único, e precisa rodar depois de mudar a skill ou um PRD.

## Estilos de partida

Receitas completas, extraídas de produtos reais. Dão estrutura e medidas; a identidade vem do `DESIGN.md`. [Quando usar cada um e o que trocar antes](skill/kit-frontend/references/estilos.md).

| PRD | Use para | Versão | Exemplos |
| --- | --- | --- | --- |
| [Design system base](prds/base-design-system/prd.md) | Produto sem PRD específico: landing, fluxo ou ferramenta, em linguagem sóbria, com neutros e um único acento | 3.0.0 | [landing](prds/base-design-system/exemplos/landing.png) · [ferramenta](prds/base-design-system/exemplos/ferramenta.png) |
| [Site de escola de idiomas](prds/site-escola-idiomas/prd.md) | Site institucional de escola de idiomas ou curso livre, voltado a matrícula e captação de contatos | 3.0.0 | [home](prds/site-escola-idiomas/exemplos/home.png) · [página de curso](prds/site-escola-idiomas/exemplos/pagina-de-curso.png) |
| [Sistema de gestão](prds/sistema-gestao/prd.md) | Sistema de trabalho com painel, agenda, cadastros, listas e relatórios. Traz também processo, arquitetura e validação | 3.0.0 | [painel](prds/sistema-gestao/exemplos/painel.png) · [agenda](prds/sistema-gestao/exemplos/agenda.png) |
| [Sistema de clínica no estilo conversa](prds/sistema-clinica-conversa/prd.md) | Sistema de atendimento com agenda, usado pela recepção no computador e no celular | 2.0.0 (rascunho) | [hoje](prds/sistema-clinica-conversa/exemplos/hoje.png) · [agenda](prds/sistema-clinica-conversa/exemplos/agenda-semana.png) · [celular](prds/sistema-clinica-conversa/exemplos/hoje-celular.png) |
| [Aplicativo acessível orientado a tarefas](prds/app-tarefas-acessivel/prd.md) | Aplicativos de atendimento, catálogos, comunidades e solicitações, com controles grandes, formulários por etapas e três temas | 1.0.0 (rascunho) | [catálogo](prds/app-tarefas-acessivel/exemplos/catalogo.png) · [etapa de formulário](prds/app-tarefas-acessivel/exemplos/etapa.png) |

Marcas, nomes e dados das telas de exemplo são fictícios. Os exemplos têm falhas conhecidas, listadas em [pendências](pesquisa/pendencias.md).

## Estrutura

```
.
├── skill/kit-frontend/       o que é instalado nos projetos
│   ├── SKILL.md              entrada: etapas e portões
│   ├── references/           gosto, identidade, anti-genérico, acessibilidade, padrões
│   ├── assets/               modelos de DESIGN.md, PRODUTO.md e correções
│   ├── scripts/              verificador e contraste
│   └── estilos/              PRDs por seção (gerado)
├── bin/kit.mjs               instalador e comandos
├── dist/                     prompt único e llms.txt (gerado)
├── prds/                     fonte dos estilos, com exemplos
├── pesquisa/                 benchmark, fontes e pendências
├── auditorias/               registro das rodadas de auditoria
├── modelos/                  ponto de partida para um estilo novo
└── ferramentas/              validador do repositório e testes
```

## Mudar o kit

Ver [CONTRIBUTING.md](CONTRIBUTING.md) e [AGENTS.md](AGENTS.md). Antes de concluir:

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

- [Rodada de 2026-10-09](auditorias/2026-10-09/relatorio.md): 168 achados nas versões 1.0.0 de três PRDs. As correções estão no `CHANGELOG.md` de cada um.
- Sem auditoria, por isso em `rascunho`: `app-tarefas-acessivel` e `sistema-clinica-conversa`. Os três estáveis estão em 2.x e aguardam nova rodada.
