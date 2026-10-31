# Estilos de partida

Cinco receitas completas, extraídas de produtos reais. Um estilo dá **estrutura, medidas e comportamento**. Ele não é a identidade do produto: cor, fonte, forma e voz vêm do `DESIGN.md`.

Use no máximo um por projeto: eles dão ordens opostas. Leia `estilos/<slug>/indice.md` e abra só as seções da tarefa.

| Estilo | Ponto de partida para | Tamanho total |
| --- | --- | --- |
| `sistema-gestao` | Sistema de trabalho no computador: cadastros, listas, agenda, relatórios. Traz processo, arquitetura e testes | cerca de 12 mil tokens |
| `sistema-clinica-conversa` | Sistema com hora marcada, usado no computador e no celular por gente sem familiaridade | cerca de 34 mil tokens |
| `app-tarefas-acessivel` | Aplicativo público: catálogo, solicitações, comunidade. Três temas e três tamanhos de letra | cerca de 32 mil tokens |
| `site-escola-idiomas` | Site institucional focado em matrícula e captação | cerca de 22 mil tokens |
| `base-design-system` | Landing, fluxo curto ou ferramenta densa, em linguagem de subtração | cerca de 24 mil tokens |

Se nenhum couber, não force: use só `padrao-*.md` e o `DESIGN.md`.

## O que trocar antes de usar

Estes pontos contrariam `gosto.md` ou `acessibilidade.md`, e o kit prevalece. Foram medidos com `scripts/verificar.mjs` nos exemplos de cada estilo.

| Estilo | Não siga | Faça |
| --- | --- | --- |
| Todos | Barras fixas em janela baixa | Com altura até 480px, tudo o que é fixo rola junto |
| Todos | Tokens de cor, fonte e raio como estão | Substitua pelos do `DESIGN.md`; mantenha medidas de alvo, linha e espaçamento |
| `app-tarefas-acessivel` | Paleta índigo: 24 de 55 cores são padrão do Tailwind, a paleta que o dono reprovou como cara de IA | Crie a paleta antes de qualquer tela. Mantenha só a lógica de pares e dos três temas |
| `app-tarefas-acessivel` | Monograma em quadrado; exemplos sem link de pular | Marca conforme G17; link de pular em toda tela |
| `sistema-clinica-conversa` | Sigla em quadrado colorido | Marca conforme G17 |
| `sistema-clinica-conversa` | Fontes em px e `min-width: 320px` no `body` | Fontes em `rem`, sem `min-width` |
| `sistema-clinica-conversa` | Ícone `sparkles` em Procedimento; frase "em um só lugar" | Ícone do assunto; texto do setor |
| `sistema-gestao` | Barra lateral escura com turquesa como identidade | É o painel que recebeu a reclamação de cara de IA. Mantenha a arquitetura, troque a expressão |
| `sistema-gestao` | Definição escrita em cada indicador | A definição fica a um toque; no cartão, rótulo e número (G03) |
| `sistema-gestao` | "Três direções" que mudam só dois tokens | Direções de `identidade.md` |
| `sistema-gestao` | Exemplos só de computador | Regras de `padrao-navegacao.md` para celular |
| `base-design-system` | "Centralizar formulário é erro" e "espaço vazio é aceito" | Formulário centralizado na área útil (G08). Vazio só quando não parece desalinhado |
| `base-design-system` | Inter sem decisão; "troque quatro tokens e muda de marca" | Etapa de direções; fonte escolhida com motivo |
| `base-design-system` | Texto de 12px e controles de 32px como padrão | Só em ferramenta densa para especialista; público geral usa 16px e 44px |
| `site-escola-idiomas` | Estrutura copiada de um concorrente, trocando só `--brand` | Mantenha o que é convenção do setor; a expressão é da escola |
| `site-escola-idiomas` | `<h2>` seguido de `<h4>` | Não pule nível de título |
