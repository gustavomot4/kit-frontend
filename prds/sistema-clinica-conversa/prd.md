---
titulo: Sistema de clínica no estilo conversa
slug: sistema-clinica-conversa
versao: 2.0.0
status: rascunho
superficie: sistema
dominio: saude
estende: nenhum
idioma: pt-BR
acessibilidade: WCAG 2.2 AA
atualizado: 2026-10-30
---

# Sistema de clínica no estilo conversa

Este documento descreve a interface de um sistema de atendimento com hora marcada que se parece com os aplicativos de conversa que a dona e a recepção já usam o dia inteiro. A agenda do dia é uma lista de conversas: iniciais coloridas da pessoa, nome em destaque, horário à esquerda e situação à direita. Ao tocar numa consulta, abre-se o detalhe com os botões de WhatsApp e de ligar. No celular há barra de abas embaixo, botão flutuante, folha inferior e aviso com "Desfazer". O design vem da identidade "direção A · Conversa" do Dental Flow, sistema de clínica odontológica aprovado em 28/10/2026, e foi conferido contra o código implementado. Quem usa este documento não precisa conhecer o Dental Flow; os exemplos usam uma clínica fictícia, a Odonto Vila Serena.

## Escopo

- **Use para:** sistema de atendimento com agenda para clínica, consultório ou outro negócio de serviço com hora marcada, usado pela dona ou pela recepção com pouca familiaridade com sistemas, no computador e no celular. Cobre casca de navegação, agenda do dia, agenda em grade, cadastro de clientes, painel do mês e entrada. O vocabulário é o da clínica: paciente, profissional, consulta, procedimento. Em outro negócio, troque as palavras e mantenha as regras (salão: cliente, profissional, horário, serviço).
- **Não use para:** site institucional, landing ou página de marketing (`site-escola-idiomas` ou `base-design-system`); sistema administrativo denso, pensado primeiro para o computador, com tabelas longas (`sistema-gestao`); aplicativo público de catálogo e solicitações (`app-tarefas-acessivel`); qualquer outro caso (`base-design-system`).
- **Relação com outros PRDs:** autossuficiente, não estende nenhum. Este documento e o `sistema-gestao` vêm do mesmo produto, o Dental Flow, em fases diferentes: o `sistema-gestao` é um prompt completo de processo e arquitetura, com identidade neutra e densa; este é a identidade "conversa", calorosa e familiar. Use um por projeto. Nunca entregue os dois ao mesmo agente: eles dão ordens opostas sobre cor, densidade e navegação.

## Como usar

1. Copie este arquivo para a raiz do projeto com o nome `PRD-FRONTEND.md`.
2. Preencha a tabela abaixo no próprio arquivo, trocando a coluna "Valor".
3. Peça ao agente: "Siga `PRD-FRONTEND.md`. Antes de entregar, rode o checklist de aceite e diga o resultado de cada item."

| O que | Valor | Onde aparece |
| --- | --- | --- |
| Nome do produto, em duas palavras | Vila Serena | Barra superior e tela Entrar: a primeira palavra em `--foreground`, a segunda em `--primary`. Título da aba: `<Tela> — <Nome>`. |
| Sigla, duas letras | VS | Só o ícone da aba: a sigla em `--primary`, `--weight-extrabold`, direto sobre o fundo da aba, sem quadrado nem círculo atrás. Na interface a marca é o nome em duas palavras (linha acima), nunca iniciais dentro de uma forma colorida. |
| Cor de marca | manter `#0D6E66` | Se trocar, troque juntos `--primary`, `--primary-hover`, `--primary-soft`, `--primary-soft-hover` e `--on-primary-muted` (o `--ring` acompanha) e refaça as linhas dessas cores na tabela de contraste da seção 9. `--primary-foreground` sobre a nova `--primary` precisa dar pelo menos 4,5:1. |
| Nomes das situações | Agendado, Confirmado, Em atendimento, Concluído, Cancelado, Faltou | Seção 4.3. Mantenha seis, na mesma ordem e com a mesma forma. |
| Perfis | Responsável e Recepção | Seção 5.2. A Recepção não vê o Painel nem as áreas financeiras. |

## 1. Princípios

Quando um caso não estiver previsto no documento, decida por estas regras, nesta ordem.

1. **Pessoas, não contagens.** A tela mostra quem vem e quando: iniciais, nome, horário. "6 consultas" só aparece como resumo ao lado da lista, nunca no lugar dela.
2. **Padrões que ela já conhece, sem copiar a aparência de ninguém.** Lista de conversas e aviso com "Desfazer" (como no WhatsApp), barra de abas embaixo, chips de filtro, botão flutuante, folha inferior e esqueleto de carregamento vêm de aplicativos do dia a dia. Logotipo, cores e textos desses aplicativos não entram.
3. **Menos texto.** Título curto e nenhum subtítulo explicativo por padrão. Explicação só onde há dúvida real: dica de campo, estado vazio, erro, confirmação.
4. **Uma ação principal por tela.** No computador, botão primário no topo à direita. No celular, botão flutuante ou barra fixa embaixo. As demais ações são secundárias ou ficam no detalhe.
5. **Situação com cor, forma, ícone e texto.** Cor nunca é o único sinal. As seis situações da consulta têm cada uma a sua forma (vazado, cheio, hachurado) e o seu ícone.
6. **Toque confortável.** Alvo de toque com a medida do início da seção 6, texto de corpo com pelo menos `--text-body` e rótulo sempre visível acima do campo, sem depender do texto de exemplo.
7. **Foco que ajuda e não assusta.** O título de cada tela recebe o foco após a navegação, para o leitor de tela anunciar onde a pessoa está, mas sem contorno. O contorno aparece só na navegação por teclado.
8. **Decoração nunca disputa espaço** com campo, aviso ou ação principal.

## 2. Tokens

Cada medida compartilhada está declarada uma vez neste bloco, e o texto das outras seções cita o token, não o número. Os nomes de cor seguem os nomes semânticos do shadcn/ui (`--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--input`, `--ring`), para a equipe reconhecer o padrão; os valores são próprios deste design. Medida que só um componente ou uma tela usa aparece uma vez, na descrição dele (seções 6 e 7).

```css
:root {
  /* cor: superfícies e texto */
  --background: #F6F2EC;
  --foreground: #1B2529;
  --foreground-hover: #0F171A;
  --card: #FFFFFF;
  --card-soft: #FBF8F4;
  --muted: #EEE8DF;
  --muted-foreground: #5B676C;
  --placeholder: #6B7579;
  --border: #EAE3D9;
  --border-strong: #CFC6B9;
  --input: #8F8577;
  --on-dark: #FFFFFF;

  /* cor: marca e ação */
  --primary: #0D6E66;
  --primary-hover: #0A5C55;
  --primary-foreground: #FFFFFF;
  --primary-soft: #E1F0EC;
  --primary-soft-hover: #D2E9E3;
  --on-primary-muted: #CDEBE6;
  --ring: var(--primary);

  /* cor: sobre superfície escura (--foreground como fundo) */
  --on-dark-accent: #8EE3D6;
  --on-dark-muted: #C9D2D5;
  --on-dark-danger: #FFB4A6;
  --on-dark-fill: rgba(255, 255, 255, .12);
  --ring-on-dark: var(--on-dark-accent);

  /* cor: marcador "agora" */
  --accent: #E8613C;
  --accent-text: #B9472A;
  --accent-soft: #FDE9E2;

  /* cor: retorno */
  --destructive: #B23B3B;
  --destructive-soft: #FBE7E7;
  --warning: #7A5000;
  --warning-soft: #FFF1D2;
  --success: #1D7A45;
  --success-soft: #E2F3E8;
  --info: #2F5E9E;
  --info-soft: #E5EDF8;

  /* cor: canal de contato (botão que abre a conversa) */
  --whatsapp: #187A43;
  --whatsapp-hover: #136437;
  --whatsapp-soft: #E3F4EA;

  /* cor: gráficos e agenda */
  --chart-in: #2E9D67;
  --chart-out: #E0603C;
  --chart-grid: #F0EBE3;
  --grid-half: #F3EEE7;
  --today-column: #F5FAF8;
  --slot-edge: rgba(255, 255, 255, .9);
  --overlay: rgba(20, 28, 31, .42);

  /* cor: iniciais das pessoas, fundo e texto de cada tom (4.2; o tom 0 usa o par 1) */
  --avatar-1-bg: #FCE3D6; --avatar-1-fg: #8E3A19;
  --avatar-2-bg: #DDF0E6; --avatar-2-fg: #1D6B45;
  --avatar-3-bg: #E3E8FB; --avatar-3-fg: #3446A3;
  --avatar-4-bg: #F7E3EF; --avatar-4-fg: #8E2F6B;
  --avatar-5-bg: #FFEFC4; --avatar-5-fg: #6E4B00;
  --avatar-6-bg: #DDEDF6; --avatar-6-fg: #245D7E;

  /* situações da consulta: texto (fg), fundo (bg) e barra ou contorno (bar) */
  --status-agendado-fg: #7A5000;     --status-agendado-bg: #FFFFFF;     --status-agendado-bar: #D9940E;
  --status-confirmado-fg: #17663B;   --status-confirmado-bg: #DCF3E5;   --status-confirmado-bar: #1F8A4C;
  --status-atendimento-fg: #FFFFFF;  --status-atendimento-bg: #5B45C2;  --status-atendimento-bar: #3E2C99;
  --status-atendimento-muted: #E4DEFB;
  --status-concluido-fg: #4A5559;    --status-concluido-bg: #ECEEEF;    --status-concluido-bar: #A3ACB0;
  --status-cancelado-fg: #A12F2F;    --status-cancelado-bg: #FBE7E7;    --status-cancelado-bar: #D16464;
  --status-faltou-fg: #934010;       --status-faltou-bg: #FCEBDD;       --status-faltou-bar: #E07B3F;
  --hatch: repeating-linear-gradient(135deg, rgba(255, 255, 255, .55) 0 6px, transparent 6px 12px);

  /* tipografia */
  --font: 'Figtree', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --text-hero: clamp(2.25rem, 4vw, 3.375rem);
  --text-display: 2.125rem; --text-display-sm: 1.75rem; --text-title: 1.375rem; --text-heading: 1.25rem; --text-section: 1.125rem; --text-lead: 1.0625rem;
  --text-body: 1rem; --text-ui: 0.9375rem; --text-small: 0.875rem; --text-caption: 0.8125rem; --text-micro: 0.75rem;
  --weight-regular: 400; --weight-medium: 500; --weight-semibold: 600; --weight-bold: 700; --weight-extrabold: 800;
  --leading-tight: 1.1; --leading-card: 1.22; --leading-body: 1.5;
  --tracking-hero: -1.6px; --tracking-display: -0.8px; --tracking-title: -0.4px; --tracking-caps: 0.6px;

  /* espaço */
  --space-2: 2px; --space-4: 4px; --space-6: 6px; --space-8: 8px; --space-10: 10px; --space-12: 12px; --space-14: 14px; --space-16: 16px;
  --space-18: 18px; --space-20: 20px; --space-24: 24px; --space-28: 28px; --space-32: 32px; --space-40: 40px; --space-48: 48px; --space-56: 56px;

  /* forma */
  --radius-sm: 10px; --radius-md: 12px; --radius: 14px; --radius-box: 16px;
  --radius-lg: 20px; --radius-xl: 24px; --radius-sheet: 28px; --radius-full: 999px;
  --line: 1px; --line-control: 1.5px; --line-error: 2px;

  /* tamanhos */
  --target: 44px; --control-sm: 38px; --control-md: 46px; --control-lg: 54px; --field: 50px; --chip: 40px; --fab: 56px;
  --icon-xs: 14px; --icon-sm: 16px; --icon-md: 18px; --icon: 20px; --icon-lg: 24px;

  /* sombra */
  --shadow-sm: 0 1px 4px rgba(40, 30, 20, .12);
  --shadow: 0 8px 24px rgba(27, 37, 41, .08);
  --shadow-lg: 0 24px 50px rgba(27, 37, 41, .18);
  --shadow-bar: 0 -8px 24px rgba(27, 37, 41, .08);
  --shadow-fab: 0 10px 24px color-mix(in srgb, var(--primary) 35%, transparent);
  --shadow-selected: 0 0 0 2.5px var(--primary), 0 8px 18px color-mix(in srgb, var(--primary) 25%, transparent);
  --shadow-live: 0 4px 12px color-mix(in srgb, var(--status-atendimento-bg) 30%, transparent);

  /* movimento */
  --duration-fast: 120ms; --duration-base: 160ms; --duration-slow: 200ms; --duration-spin: 800ms; --duration-shimmer: 1300ms;

  /* casca */
  --topbar: 68px; --topbar-mobile: 60px; --tabbar: 76px; --page-x: 32px;
  --page-max: 1480px; --page-form: 820px; --page-wide: 1180px;
  --side: 420px; --side-narrow: 380px; --summary: 360px; --overlay-width: 460px;
  --z-footer: 5; --z-topbar: 20; --z-fab: 25; --z-tabbar: 30; --z-popup: 30;
  --z-overlay: 40; --z-panel: 41; --z-menu: 50; --z-toast: 60; --z-skip: 100;
}
@media (max-width: 767px) { :root { --page-x: 16px; } }
```

Base, aplicada antes de qualquer componente:

```css
*, *::before, *::after { box-sizing: border-box; }
html { font-family: var(--font); color: var(--foreground); background: var(--background); line-height: var(--leading-body); font-synthesis: none; -webkit-text-size-adjust: 100%; }
body { margin: 0; font-size: var(--text-body); background: var(--background); }
button, input, select, textarea { font: inherit; color: inherit; }
button { cursor: pointer; }
button:disabled { cursor: not-allowed; }
h1, h2, h3, p, dl, dd, figure { margin: 0; }
ul, ol { margin: 0; padding: 0; }
a { color: var(--primary); text-underline-offset: 3px; }
:focus-visible { outline: 3px solid var(--ring); outline-offset: 2px; }
[data-surface="dark"] :focus-visible { outline-color: var(--ring-on-dark); }
[data-autofocus]:focus { outline: none; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```

## 3. Tipografia

Uma família só, a Figtree, servida pelo próprio projeto (pacote `@fontsource/figtree`, subconjunto latino, pesos 400, 500, 600, 700 e 800) ou pelo Google Fonts com `display=swap`. Números que se comparam em coluna (horários, valores, CPF, telefone, páginas) usam `font-variant-numeric: tabular-nums`.

| Papel | Tamanho | Peso | Altura de linha | Espaçamento | Onde |
| --- | --- | --- | --- | --- | --- |
| Destaque da entrada | `--text-hero` | `--weight-extrabold` | `--leading-tight` | `--tracking-hero` | Só a frase de boas-vindas da tela Entrar |
| Título da tela | `--text-display`; abaixo de 768 px, `--text-display-sm` | `--weight-extrabold` | `--leading-tight` | `--tracking-display` | O `h1` de cada tela |
| Número grande | `--text-display-sm` | `--weight-extrabold` | `--leading-tight` | `--tracking-display` | Valor de indicador, hora do cartão "Próximo", total no anel |
| Nome em destaque | `--text-title` | `--weight-extrabold` | `--leading-tight` | `--tracking-title` | Nome no detalhe da consulta e na ficha, título de diálogo, número da produção |
| Marca e dia | `--text-heading` | `--weight-extrabold` na marca, `--weight-bold` no dia | `--leading-tight` | `--tracking-title` na marca, 0 no dia | Nome do produto na barra, número do dia na faixa de dias |
| Título de bloco | `--text-section` | `--weight-extrabold` | `--leading-body` | 0 | `h2` de cartão, título de estado vazio |
| Leitura de linha | `--text-lead` | `--weight-bold` | `--leading-body` | 0 | Horário da lista, nome no cartão "Próximo", busca de pacientes, botão grande |
| Corpo | `--text-body` | `--weight-regular`; nome em lista `--weight-bold` | `--leading-body` | 0 | Texto corrido, valor de campo, nome do paciente na lista |
| Interface | `--text-ui` | `--weight-semibold`; rótulo de campo `--weight-bold` | `--leading-body` | 0 | Rótulo, chip, aba, item de menu, paginação |
| Secundário | `--text-small` | `--weight-regular` | `--leading-body` | 0 | Segunda linha de item, dica de campo, pílula de situação, erro de campo |
| Legenda | `--text-caption` | `--weight-semibold` | `--leading-body` | 0 | Duração, dia da semana, selo, legenda de gráfico |
| Rótulo em maiúsculas | `--text-caption`; `--text-small` no título do painel; `--text-micro` no rótulo "PRÓXIMO" e no cabeçalho de colunas | `--weight-extrabold`; `--weight-bold` no título do painel | `--leading-body` | `--tracking-caps` | Grupo "MANHÃ · 8", cabeçalho do mês, grupo de horários, título do painel, rótulo "PRÓXIMO", cabeçalho de colunas das listas |
| Miúdo | `--text-micro` | `--weight-bold` | `--leading-card` | 0 | Conteúdo do cartão da grade, horas do eixo, rótulo da barra de abas |

Regras:

- Todo tamanho de fonte é escrito em `rem` (1rem = 16 px), nunca em `px`: quem aumenta a letra no navegador precisa ser obedecido. Os valores em px desta tabela e do texto são o resultado com a letra no tamanho padrão.
- Nenhum texto que a pessoa precise ler fica abaixo de `--text-micro`; a exceção são as iniciais dos círculos (4.2), que repetem o nome escrito ao lado. No celular, valor de campo e texto corrido ficam em `--text-body`.
- Título de tela tem uma linha; quebra com `overflow-wrap: anywhere` se o nome for longo. Nome em lista e em cartão corta com reticências (`white-space: nowrap; overflow: hidden; text-overflow: ellipsis`), nunca quebra.
- Saudação da tela Hoje: "Bom dia" antes de 12 h, "Boa tarde" antes de 18 h, "Boa noite" depois, seguida do primeiro nome de quem entrou.

## 4. Cor e situações

Tema claro somente. Fundo de papel quente, superfícies brancas, verde-petróleo para ação e coral só para marcar o momento atual.

### 4.1 Papel de cada cor

| Token | Papel | Pode aparecer | Não pode |
| --- | --- | --- | --- |
| `--background` | Página | Fundo da página; barra superior do celular; caixa de ajuda da tela Entrar; degradê do rodapé fixo de formulário | — |
| `--card` | Superfície | Barra superior, barra de abas, cartão, lista, campo, painel, folha, diálogo, chip inativo | — |
| `--card-soft` | Superfície recuada | Hover de linha; caixa de dados do detalhe; coluna sem consulta e coluna de dia passado na grade; dia de outro mês | Fundo de campo |
| `--muted` | Neutro de apoio | Hover de botão fantasma, aba e item de menu; fundo do segmentado; campo desabilitado; trilho de barra de progresso; esqueleto | Texto |
| `--foreground` | Texto principal e superfície escura | Todo texto principal; fundo do chip escolhido, do cartão "Próximo", do aviso, do balão do gráfico e do botão de confirmação destrutiva | — |
| `--muted-foreground` | Texto secundário | Segunda linha, dica, duração, rótulo opcional, contagem, eixo de gráfico, texto de estado vazio | Ação, link |
| `--placeholder` | Texto de exemplo | Só dentro de campo vazio | Rótulo, dica |
| `--border` | Divisória | Contorno de cartão, lista, chip inativo, botão secundário, linha de hora da grade | Borda única de campo |
| `--border-strong` | Divisória reforçada | Hover de botão secundário, alça da folha inferior, linha de base do gráfico, risco do nome cancelado | Borda de campo |
| `--input` | Borda de controle | Campo, combobox, lista de seleção | Cartão |
| `--primary` | Ação e seleção | Botão primário, link, aba ativa, linha selecionada, dia de hoje, página atual, etapa concluída, horário escolhido | Texto decorativo |
| `--primary-soft` | Seleção suave | Fundo da aba ativa, da linha selecionada, do cabeçalho da coluna de hoje e do botão suave; halo de foco do campo; círculo do ícone de estado vazio | — |
| `--on-primary-muted` | Texto secundário sobre `--primary` | Dia da semana no dia de hoje da faixa; rótulo e dica do indicador em destaque | Sobre fundo claro |
| `--on-dark-accent`, `--on-dark-muted`, `--on-dark-danger`, `--on-dark-fill` | Sobre `--foreground` | Rótulo "PRÓXIMO", botão do cartão "Próximo", ação do aviso, ícone do aviso; texto secundário; ícone de aviso de erro; fundo de botão secundário | Sobre fundo claro |
| `--accent` | Agora | Linha e ponto "agora" | Texto (3,38:1) |
| `--accent-text` | Texto do agora | Palavra "Agora" na lista; fundo da etiqueta da hora atual na grade | — |
| `--accent-soft` | Halo do agora | Halo do ponto "agora"; círculo decorativo da tela Entrar | Texto |
| `--destructive`, `--destructive-soft` | Erro e perigo | Erro de campo, borda de campo inválido, texto do botão de perigo, alerta e selo de erro | Ação comum |
| `--warning`, `--success`, `--info` e os `-soft` | Retorno | Alertas e selos do tom | Situação da consulta |
| `--whatsapp`, `--whatsapp-hover`, `--whatsapp-soft` | Canal de contato | Só o botão que abre a conversa com o paciente | Qualquer outra ação |
| `--chart-in`, `--chart-out`, `--chart-grid` | Gráfico de dinheiro | Barra de entrada (verde), barra de saída (coral), linha de grade | Texto |
| `--today-column`, `--grid-half`, `--slot-edge` | Agenda em grade | Fundo da coluna de hoje; linha da meia hora; borda clara de 1 px do cartão da consulta | — |
| `--avatar-1-bg` a `--avatar-6-bg` e `--avatar-1-fg` a `--avatar-6-fg` | Iniciais das pessoas | Fundo e texto do círculo de iniciais (4.2) | Situação da consulta; texto fora das iniciais |
| `--overlay` | Véu | Atrás do diálogo, do painel lateral e da folha inferior | Atrás da coluna de detalhe da Agenda (ela não cobre a página) |

### 4.2 Iniciais coloridas

Cada pessoa (paciente, profissional, usuário) é representada por um círculo com as iniciais. A cor identifica a pessoa, não a situação, por isso a paleta é pastel: fundos claros com pouca saturação e texto escuro do mesmo tom. Assim as iniciais não competem com as seis situações, que usam cor saturada, contorno, preenchimento e hachura.

| Tom | Fundo | Texto |
| --- | --- | --- |
| 0, pêssego | `--avatar-1-bg` `#FCE3D6` | `--avatar-1-fg` `#8E3A19` |
| 1, menta | `--avatar-2-bg` `#DDF0E6` | `--avatar-2-fg` `#1D6B45` |
| 2, lavanda | `--avatar-3-bg` `#E3E8FB` | `--avatar-3-fg` `#3446A3` |
| 3, rosa | `--avatar-4-bg` `#F7E3EF` | `--avatar-4-fg` `#8E2F6B` |
| 4, creme | `--avatar-5-bg` `#FFEFC4` | `--avatar-5-fg` `#6E4B00` |
| 5, céu | `--avatar-6-bg` `#DDEDF6` | `--avatar-6-fg` `#245D7E` |

O tom 0 usa o par `--avatar-1-*`, o tom 5 usa o `--avatar-6-*`. Receita:

```css
.avatar[data-tone="0"] { background: var(--avatar-1-bg); color: var(--avatar-1-fg); }
.avatar[data-tone="1"] { background: var(--avatar-2-bg); color: var(--avatar-2-fg); }
.avatar[data-tone="2"] { background: var(--avatar-3-bg); color: var(--avatar-3-fg); }
.avatar[data-tone="3"] { background: var(--avatar-4-bg); color: var(--avatar-4-fg); }
.avatar[data-tone="4"] { background: var(--avatar-5-bg); color: var(--avatar-5-fg); }
.avatar[data-tone="5"] { background: var(--avatar-6-bg); color: var(--avatar-6-fg); }
```

O contraste de cada par está na seção 9.1; todos passam 4,5:1.

- **Iniciais:** primeira letra do primeiro nome e do último sobrenome, em maiúsculas, depois de tirar "Dr." ou "Dra." do começo. Nome de uma palavra dá uma letra; nome vazio dá "?".
- **Escolha do tom:** sempre o mesmo para o mesmo nome, em qualquer tela. Percorra o nome completo, caractere a caractere, com `hash = (hash * 31 + código UTF-16 do caractere) >>> 0`, partindo de 0; o tom é `hash % 6`.
- **Forma:** círculo, `--weight-bold`, `letter-spacing: 0.2px`, `aria-hidden="true"` (o nome está sempre escrito ao lado).

| Tamanho | Diâmetro | Fonte das iniciais | Onde |
| --- | --- | --- | --- |
| `xxs` | 18 px | 8,5 px | Profissional dentro do cartão da grade |
| `xs` | 24 px | 10,5 px | Chip de profissional, opção do combobox |
| `sm` | 36 px | 13 px | Menu da conta, cabeçalho de coluna por profissional |
| `md` | 44 px | 15 px | Item de lista |
| `lg` | 56 px | 19 px | Paciente escolhido no agendamento |
| `xl` | 68 px | 24 px | Detalhe da consulta, ficha do paciente |

### 4.3 As seis situações da consulta

A consulta avança em quatro etapas (Agendado → Confirmado → Em atendimento → Concluído) e pode terminar antes em Cancelado ou Faltou. Concluído, Cancelado e Faltou são finais: não reabrem.

| Situação | Rótulo | Ícone (Lucide) | Forma | Texto | Fundo | Barra ou contorno | Ação seguinte | Aviso depois da ação |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Agendado | Agendado | `clock` | Vazado, contorno tracejado | `--status-agendado-fg` | `--status-agendado-bg` | Contorno `--line-control` tracejado em `--status-agendado-bar` | Confirmar | "Consulta de Helena confirmada" + Desfazer |
| Confirmado | Confirmado | `check` | Cheio claro, barra à esquerda | `--status-confirmado-fg` | `--status-confirmado-bg` | Barra de 4 px em `--status-confirmado-bar` | Iniciar atendimento | "Atendimento de Helena iniciado" + Desfazer |
| Em atendimento | Em atendimento | `stethoscope` | Cheio escuro, com sombra | `--status-atendimento-fg` | `--status-atendimento-bg` | Barra de 4 px em `--status-atendimento-bar`; `--shadow-live` | Concluir atendimento | "Atendimento de Helena concluído" + Desfazer |
| Concluído | Concluído | `check-check` | Cheio cinza, nome em cinza | `--status-concluido-fg` | `--status-concluido-bg` | Barra de 4 px em `--status-concluido-bar` | Agendar de novo | — |
| Cancelado | Cancelado | `x` | Hachurado, nome riscado | `--status-cancelado-fg` | `--status-cancelado-bg` + `--hatch` | Barra de 4 px em `--status-cancelado-bar` | Agendar de novo | "Consulta de Helena cancelada", sem Desfazer |
| Faltou | Faltou | `user-x` | Hachurado | `--status-faltou-fg` | `--status-faltou-bg` + `--hatch` | Barra de 4 px em `--status-faltou-bar` | Agendar de novo | "Falta de Helena registrada", sem Desfazer |

Cancelar e marcar falta pedem confirmação antes (seção 6.14) e não oferecem "Desfazer", porque não reabrem. O aviso usa só o primeiro nome.

Pílula de situação, usada na lista, no detalhe e onde mais a situação aparecer como texto:

```css
.status { --fg: var(--status-agendado-fg); --bg: var(--status-agendado-bg);
  display: inline-flex; align-items: center; gap: var(--space-6); height: 30px; padding: 0 var(--space-12) 0 var(--space-10);
  border-radius: var(--radius-full); background-color: var(--bg); color: var(--fg);
  font-size: var(--text-small); font-weight: var(--weight-semibold); white-space: nowrap; }
.status svg { width: var(--icon-sm); height: var(--icon-sm); stroke-width: 2.4; flex: none; }
.status[data-status="agendado"] { border: var(--line-control) dashed var(--status-agendado-bar); }
.status[data-status="confirmado"] { --fg: var(--status-confirmado-fg); --bg: var(--status-confirmado-bg); }
.status[data-status="atendimento"] { --fg: var(--status-atendimento-fg); --bg: var(--status-atendimento-bg); }
.status[data-status="concluido"] { --fg: var(--status-concluido-fg); --bg: var(--status-concluido-bg); }
.status[data-status="cancelado"] { --fg: var(--status-cancelado-fg); --bg: var(--status-cancelado-bg); }
.status[data-status="faltou"] { --fg: var(--status-faltou-fg); --bg: var(--status-faltou-bg); }
.status[data-status="cancelado"], .status[data-status="faltou"] { background-image: var(--hatch); }
```

```html
<span class="status" data-status="confirmado"><svg aria-hidden="true"><!-- check --></svg>Confirmado</span>
```

Versão compacta, para a lista do dia abaixo de 1100 px (o ponto de quebra da casca do celular, 5.1): círculo de 30 px com o mesmo fundo, contorno e hachura, só o ícone (`stroke-width: 2.5`), o rótulo em `.sr-only` e o mesmo rótulo no atributo `title`.

Legenda da grade: uma lista com as seis situações, cada uma com uma amostra de 20 × 14 px, raio 4 px, mesma forma do cartão (contorno tracejado, barra esquerda de 4 px, hachura) e o rótulo em `--text-caption`, `--weight-semibold`, `--muted-foreground`.

## 5. Layout

### 5.1 Pontos de quebra

Media queries não leem variáveis; use estes valores exatos em `max-width`.

| Abaixo de | O que muda |
| --- | --- |
| 1280 px | Abas da barra superior com `padding: 0 11px` e espaço `--space-18` entre blocos; menu da conta só com as iniciais. Detalhe da tela Hoje com `--side-narrow`. Legenda da grade some. O detalhe da consulta na Agenda deixa de ser coluna e abre como painel por cima, com véu (6.8). Indicadores do Painel em 2 colunas; blocos do Painel em 1 coluna. |
| 1100 px | Casca do celular (5.3): barra compacta em cima e barra de abas embaixo. A ação principal vira botão flutuante. O detalhe da tela Hoje deixa de ficar ao lado e abre ao tocar na consulta. O resumo do agendamento vira barra fixa acima das abas. O aviso e o rodapé de formulário sobem acima das abas. A situação na lista do dia vira a pílula compacta (4.3, 6.5). |
| 900 px | O painel lateral vira folha inferior. A agenda troca Semana por 3 dias e passa a abrir em Dia. A grade usa eixo de 46 px e hora de 68 px. A tela Entrar esconde a ilustração. |
| 768 px | `--page-x` passa a 16 px (já no bloco de tokens). Título da tela em `--text-display-sm`. Formulários em 1 coluna. Cabeçalho de colunas das listas some. Cartão com `padding: var(--space-16)`. Linha de paciente só com iniciais, nome e WhatsApp. Botões do rodapé de formulário dividem a largura. |
| 600 px | Linha da lista do dia com colunas de 50 e 44 px e espaço `--space-10` (6.5); paginação compacta; ações do cartão "Próximo" em largura total, com os botões de `padding` `--space-12` (6.6); aviso em duas linhas (6.10); alerta com a ação embaixo; células do mês com 64 px. |
| 480 px | Botões do diálogo de confirmação dividem a largura. |
| Altura até 480 px | Tudo o que é fixo rola junto com a página: barra superior, barra de abas, botão flutuante, aviso, rodapé de formulário, barra de resumo e coluna de detalhe da Hoje passam a `position: static`. Diálogo, painel e folha, que a pessoa abre e fecha, continuam fixos. A Agenda perde a altura fixa e a rolagem própria da grade. Em 320 × 256, só a barra superior e a de abas fixas já cobririam 53% da janela. |

Tamanhos de conferência: 1440 × 900, 1366 × 768, 1024 × 768, 768 × 1024, 375 × 812, 320 × 568 e 320 × 256 (zoom de 400% em 1280 × 1024), mais zoom de 200% em 1280 × 720. Nenhum deles tem rolagem horizontal na página, e o `body` não tem `min-width`: abaixo de 320 px o conteúdo quebra, não rola.

### 5.2 Navegação por perfil

| Área | Ícone (Lucide) | Responsável | Recepção | No celular |
| --- | --- | --- | --- | --- |
| Hoje | `sun` | sim | sim | aba |
| Agenda | `calendar-days` | sim | sim | aba |
| Pacientes | `users` | sim | sim | aba |
| Painel | `chart-column` | sim | não | em Mais |
| Áreas financeiras e de estoque, se houver | um ícone por área | sim | não | em Mais |
| Clínica (dados, profissionais, procedimentos, acessos) | `building-2` | sim; edição só dele | só leitura | em Mais |

O menu mostra só o que o perfil pode abrir. Se alguém chegar a uma área sem acesso pelo endereço, vê o estado "sem acesso" da seção 7.7. A tela inicial depois de entrar é Hoje.

### 5.3 Casca

**No computador (1100 px ou mais):**

- Link "Ir para o conteúdo" como primeiro elemento focável, fora da tela até receber foco; com foco, aparece em `top: 12px; left: 16px`, fundo `--card`, `--shadow`, raio `--radius-md`, `--weight-bold`, `z-index: var(--z-skip)`.
- Barra superior `position: sticky; top: 0`, altura `--topbar`, fundo `--card`, borda inferior `--line` `--border`, `padding: 0 var(--page-x)`, espaço `--space-28` entre marca, navegação e conta, `z-index: var(--z-topbar)`.
- Marca: só o nome, sem símbolo em forma colorida, em `--text-heading`, `--weight-extrabold`, `--tracking-title`, com altura mínima `--target`; a segunda palavra em `--primary`. Esta é a versão positiva, sobre `--card`. Sobre `--foreground` vale a negativa: primeira palavra em `--on-dark` e segunda em `--on-dark-accent`. A marca leva para Hoje.
- Abas: pílulas de 42 px de altura, `padding: 0 14px`, raio `--radius-full`, ícone `--icon` e texto `--text-ui` `--weight-semibold` em `--muted-foreground`, espaço `--space-8`. Hover: fundo `--muted`, texto `--foreground`. Ativa: fundo `--primary-soft`, texto `--primary`, `aria-current="page"`.
- Conta, à direita: iniciais `sm`, nome em `--text-ui` `--weight-bold` (no máximo 160 px, com reticências), perfil em `--text-caption` `--muted-foreground` e seta para baixo `--icon-md`. Abre um menu suspenso com "Nome · Perfil" (`--text-small` `--muted-foreground`), uma divisória e "Sair" (`log-out`) em `--destructive`. Menu suspenso: largura mínima 220 px, fundo `--card`, borda `--line` `--border`, raio `--radius-box`, `padding: var(--space-6)`, `--shadow-lg`, `z-index: var(--z-menu)`, a 8 px do botão; item com altura mínima `--target`, `padding: 0 var(--space-12)`, raio `--radius-sm`, `--text-ui` `--weight-semibold`, ícone `--icon-md` `--muted-foreground`, destacado (teclado ou mouse) com fundo `--muted`.
- Conteúdo: `max-width: var(--page-max)`, centralizado, `padding: var(--space-28) var(--page-x) var(--space-40)`.

**No celular e no tablet (abaixo de 1100 px):**

- Barra superior compacta `position: sticky`, altura `--topbar-mobile`, fundo `color-mix(in srgb, var(--background) 94%, transparent)` com `backdrop-filter: blur(10px)`, borda inferior `--line` `--border`. Marca com o nome em `--text-section`; conta só com as iniciais.
- Barra de abas `position: fixed` embaixo, altura `calc(var(--tabbar) + env(safe-area-inset-bottom))`, fundo `--card`, borda superior `--line` `--border`, `padding: 6px 8px env(safe-area-inset-bottom)`, `z-index: var(--z-tabbar)`. Quatro colunas iguais: as três áreas de aba e Mais (`ellipsis`).
- Item de aba: coluna com ícone `--icon-lg` dentro de uma pílula de 58 × 32 px e rótulo em `--text-micro` `--weight-bold` `--muted-foreground`, altura mínima 56 px. Ativo: rótulo `--primary`, pílula `--primary-soft`.
- Mais: abre a folha inferior "Mais opções" (6.8) com uma linha por área (altura mínima 64 px; ícone `--icon-lg` num quadrado de 44 px, raio `--radius`, fundo `--primary-soft`, cor `--primary`; nome em `--text-body` `--weight-bold`; dica de uma linha em `--text-small` `--muted-foreground`; seta à direita) e o botão "Sair da conta" (altura 52 px, raio `--radius`, borda `--line-control` `--border`, texto `--destructive` `--weight-bold`).
- Conteúdo: `padding: var(--space-18) var(--page-x) calc(var(--tabbar) + var(--space-32) + env(safe-area-inset-bottom))`.

### 5.4 Larguras de página

| Página | Largura máxima | Uso |
| --- | --- | --- |
| Inteira | `--page-max` | Hoje, Agenda, listas, Painel |
| Formulário | `--page-form` | Cadastro e edição |
| Larga | `--page-wide` | Agendar consulta (formulário com resumo ao lado) |

Formulário e página larga ficam centralizados, com o cabeçalho na mesma coluna do conteúdo. Grade de campos: 2 colunas, espaço `--space-16` entre linhas e `--space-18` entre colunas; campo que ocupa a linha inteira usa `grid-column: 1 / -1`.

Cabeçalho de tela: título à esquerda e ações à direita, alinhados pela base, `flex-wrap: wrap`, espaço `--space-16` entre linhas e `--space-24` entre colunas, margem inferior `--space-20` (`--space-16` abaixo de 768 px). Subtítulo, quando houver, em `--text-body` `--muted-foreground`, `margin-top: var(--space-4)`. Link de volta acima do título: seta `arrow-left` `--icon-md`, texto `--text-ui` `--weight-semibold`, altura mínima `--target`.

## 6. Componentes

Todo componente interativo tem os estados padrão, hover, foco, ativo e desabilitado; os que recebem dado têm também erro e carregando. Foco por teclado é sempre o contorno da base (seção 2), salvo onde o componente diz outra coisa. Ícones são de traço, do conjunto Lucide (pacote `lucide-react` ou `lucide`), com `aria-hidden="true"` quando há texto ao lado.

**Alvo de toque.** Controle isolado (botão de ícone, fechar, item de lista, botão principal) tem pelo menos `--target` de altura e de largura. Controles em grupo (chips, horários, paginação, segmentado, botões pequenos lado a lado) têm pelo menos `--control-sm` de altura. Todos ficam acima do mínimo de 24 × 24 px da WCAG 2.2.

### 6.1 Botão

```css
.button { display: inline-flex; align-items: center; justify-content: center; gap: var(--space-8);
  height: var(--control-md); padding: 0 var(--space-18); border: var(--line-control) solid transparent; border-radius: var(--radius-md);
  font-size: var(--text-body); font-weight: var(--weight-semibold); white-space: nowrap; text-decoration: none;
  transition: background-color var(--duration-fast), border-color var(--duration-fast), color var(--duration-fast); }
.button svg { width: var(--icon); height: var(--icon); flex: none; }
.button.sm { height: var(--control-sm); padding: 0 var(--space-14); border-radius: var(--radius-sm); font-size: var(--text-small); }
.button.sm svg { width: var(--icon-md); height: var(--icon-md); }
.button.lg { height: var(--control-lg); padding: 0 var(--space-24); border-radius: var(--radius); font-size: var(--text-lead); }
.button.block { width: 100%; }
.button:active:not(:disabled) { transform: translateY(1px); }
.button:disabled { opacity: .55; }
```

| Variante | Fundo | Texto | Borda | Hover | Uso |
| --- | --- | --- | --- | --- | --- |
| `primary` | `--primary` | `--primary-foreground` | — | fundo `--primary-hover` | A ação principal da tela ou do detalhe |
| `secondary` | `--card` | `--foreground` | `--border` | borda `--border-strong`, fundo `--card-soft` | Ação ao lado da principal, Voltar, Remarcar, Ligar, Ficha |
| `ghost` | transparente | `--foreground` | — | fundo `--muted` | Botão de ícone, fechar |
| `soft` | `--primary-soft` | `--primary` | — | fundo `--primary-soft-hover` | Agendar de novo |
| `danger` | `--card` | `--destructive` | `--border` | fundo `--destructive-soft`, borda `color-mix(in srgb, var(--destructive) 25%, var(--card))` | Faltou, Cancelar |
| `whatsapp` | `--whatsapp` | `--on-dark` | — | fundo `--whatsapp-hover` | Só o botão que abre a conversa com o paciente |
| `dark` | `--foreground` | `--on-dark` | — | fundo `--foreground-hover` | Confirmação de ação destrutiva no diálogo |

- **Ativo:** mantém a cor do hover e desce 1 px.
- **Desabilitado:** opacidade 0,55, cursor `not-allowed`, sem hover.
- **Carregando:** o ícone dá lugar a `loader-circle` girando (`--duration-spin`, linear, infinito); o botão fica desabilitado com `aria-busy="true"` e mantém o texto, para a largura não pular.
- **Botão de ícone:** `--target` × `--target`, raio `--radius-md`, ícone `--icon`, variante `ghost` ou `secondary`, com `aria-label` e `title` iguais.
- **Link com cara de botão:** a mesma classe num `<a>`. Link externo (conversa, telefone) abre com `target="_blank" rel="noreferrer"`, exceto `tel:`.

### 6.2 Campo

| Parte | Regra |
| --- | --- |
| Rótulo | Sempre visível, acima do campo, `--text-ui` `--weight-bold`, ligado ao campo por `for`. Campo opcional leva " (opcional)" em `--weight-medium` `--muted-foreground`; obrigatório não leva marca, porque é a maioria. |
| Controle | Altura mínima `--field`, raio `--radius`, borda `--line-control` `--input`, fundo `--card`, `padding: 0 var(--space-14)`, texto `--text-body` `--foreground`. Texto de exemplo em `--placeholder`, só para mostrar formato. |
| Dica | Abaixo do campo, `--text-small` `--muted-foreground`, ligada por `aria-describedby`. Some quando há erro. |
| Hover | Borda `--muted-foreground`. |
| Foco | Sem contorno; borda `--primary` e halo `box-shadow: 0 0 0 4px var(--primary-soft)`. Vale para foco por mouse e por teclado. |
| Erro | `aria-invalid="true"`, borda `--line-error` `--destructive`, halo de foco `--destructive-soft`. Mensagem abaixo, `--text-small` `--weight-semibold` `--destructive`, com `circle-alert` `--icon-sm`, ligada por `aria-describedby`. |
| Desabilitado | Fundo `--muted`, texto `--muted-foreground`. |
| Carregando | Quando o campo dispara uma busca (CEP), um `loader-circle` `--icon` gira dentro do campo, à direita, com rótulo oculto "Buscando o endereço". |
| Ícone à esquerda | `--icon` `--muted-foreground`, a 16 px da borda; texto com `padding-left: 46px`. |
| Botão dentro do campo | 46 × 46 px, a 4 px da borda direita, fundo transparente, hover `--muted`; texto com `padding-right: 56px`. Ex.: mostrar senha, com `aria-pressed`. |

- **Lista de seleção nativa:** só para listas fixas e curtas (unidade, forma de pagamento). `appearance: none`, seta `chevron-down` `--icon` em `--muted-foreground` a 12 px da direita, `padding-right: 40px`.
- **Texto longo:** `padding: var(--space-12) var(--space-14)`, altura mínima 96 px, `resize: vertical`.
- **Caixa de marcar:** 22 × 22 px com `accent-color: var(--primary)`, rótulo à direita em `--weight-semibold`, linha com altura mínima `--target`.
- **Máscaras e teclado:** CPF `000.000.000-00` e CEP `00000-000` com `inputmode="numeric"`; celular `(00) 00000-0000` com `inputmode="tel"`; e-mail com `type="email"`. Preencha `autocomplete` (`name`, `tel`, `email`, `postal-code`, `address-line1`, `username`, `current-password`).
- **Endereço:** CEP primeiro. Com 8 dígitos, a busca preenche rua e bairro e o foco vai para o número. Se a busca falhar, os campos ficam livres para digitar e a dica diz isso. Rua ocupa a linha inteira; Número leva o exemplo "Ex.: 120 ou s/n"; Complemento, "Apto, bloco, sala".

### 6.3 Combobox

Campo de busca com lista de sugestões, no lugar da lista de seleção quando as opções vêm de um cadastro que cresce (procedimentos; profissionais acima de 6).

- **Campo:** o mesmo do 6.2, com `search` à esquerda e, quando há escolha, botão `x` à direita com `aria-label="Limpar <nome>"`. Ao receber foco, seleciona o texto e abre a lista.
- **Lista:** `position: absolute; top: calc(100% + 6px)`, largura do campo, `padding: var(--space-4)`, fundo `--card`, borda `--line` `--border`, raio `--radius-box`, `--shadow`, `z-index: var(--z-popup)`; altura máxima 312 px com rolagem.
- **Opção:** altura mínima `--target`, `padding: var(--space-8) var(--space-10)`, raio `--radius-md`, espaço `--space-10`. Iniciais `xs` opcionais; nome em `--text-ui` `--weight-semibold` com reticências; detalhe à direita em `--text-small` `--muted-foreground` com números tabulares; a opção já escolhida leva `check` `--icon-md` em `--primary`. Abaixo de 600 px, o detalhe desce para a linha de baixo.
- **Opção ativa** (teclado ou mouse): fundo `--primary-soft`.
- **Limite:** 8 opções. Havendo mais, a última linha diz "Mostrando 8 de 23. Continue digitando para achar os outros." em `--text-caption` `--muted-foreground`, com borda superior `--line` `--border`.
- **Vazio:** "Nenhum resultado", `--text-small` `--muted-foreground`, `role="status"`.
- **Busca:** ignora maiúsculas e acentos; procura no nome e no detalhe.
- **Teclado e ARIA:** seção 9.2.

### 6.4 Chips e segmentado

**Chips de filtro** (`role="group"` com `aria-label`, cada chip um `<button aria-pressed>`):

- Altura `--chip`, `padding: 0 var(--space-14)`, raio `--radius-full`, fundo `--card`, borda `--line` `--border`, espaço `--space-8`, `--text-ui` `--weight-semibold` `--foreground`.
- Conteúdo: iniciais `xs` (com `margin-left: -6px`) quando o chip é uma pessoa; rótulo; contagem em `--muted-foreground`.
- Hover: borda `--border-strong`. Ativo (no clique): fundo `--muted`. Escolhido (`aria-pressed="true"`): fundo e borda `--foreground`, texto `--on-dark`, contagem `--on-dark-muted`.
- O primeiro chip é "Todos" com o total. Escolher um chip mostra só aquele grupo; escolher "Todos" limpa o filtro.
- A fileira rola na horizontal sem barra visível (`overflow-x: auto; scrollbar-width: none`) e tem `padding: var(--space-6); margin: calc(-1 * var(--space-6))`, para o contorno de foco não ser cortado. Em formulário, a fileira quebra linha em vez de rolar.
- Profissionais aparecem em chips até 6; acima disso, o filtro e a escolha viram combobox.

**Segmentado** (troca de visão, `role="group"`, botões com `aria-pressed`):

- Caixa `inline-flex`, fundo `--muted`, raio `--radius-md`, `padding: var(--space-4)`, espaço `--space-2`.
- Botão: altura `--control-sm`, `padding: 0 var(--space-16)`, raio `--radius-sm`, sem borda, `--text-ui` `--weight-bold` `--muted-foreground`. Hover: texto `--foreground`. Ativo (no clique): fundo `--card-soft`. Escolhido (`aria-pressed="true"`): fundo `--card`, texto `--foreground`, `--shadow-sm`.

### 6.5 Item de lista no estilo conversa

A consulta do dia como uma conversa: horário à esquerda, iniciais, nome em destaque e situação à direita. A linha inteira é um `<button>` que abre o detalhe.

```css
.agenda-list { background: var(--card); border: var(--line) solid var(--border); border-radius: var(--radius-lg); padding: var(--space-6); }
.agenda-group { padding: var(--space-12) var(--space-14) var(--space-6); font-size: var(--text-caption); font-weight: var(--weight-extrabold);
  letter-spacing: var(--tracking-caps); text-transform: uppercase; color: var(--muted-foreground); }
.agenda-row { width: 100%; display: grid; grid-template-columns: 58px 44px minmax(0, 1fr) auto; gap: var(--space-12); align-items: center;
  padding: var(--space-10) var(--space-12); border: 0; border-radius: var(--radius); background: transparent; text-align: left; color: var(--foreground); }
.agenda-row:hover { background: var(--card-soft); }
.agenda-row:active { background: var(--muted); }
.agenda-row[aria-pressed="true"] { background: var(--primary-soft); box-shadow: inset 3px 0 0 var(--primary); }
.agenda-row .time { font-size: var(--text-lead); font-weight: var(--weight-bold); font-variant-numeric: tabular-nums; }
.agenda-row .duration { display: block; font-size: var(--text-caption); color: var(--muted-foreground); }
.agenda-row .name { display: block; font-weight: var(--weight-bold); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.agenda-row .meta { display: block; font-size: var(--text-small); color: var(--muted-foreground); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.agenda-row[data-status="concluido"] .time, .agenda-row[data-status="concluido"] .name { color: var(--muted-foreground); }
.agenda-row[data-status="cancelado"] .name { text-decoration: line-through; text-decoration-color: var(--border-strong); }
@media (max-width: 599px) { .agenda-row { grid-template-columns: 50px 44px minmax(0, 1fr) auto; gap: var(--space-10); padding: var(--space-10) var(--space-8); } }
```

- **Colunas:** horário (`.time`) com a duração embaixo ("30 min"); iniciais `md`; nome do paciente e, embaixo, "Procedimento · Profissional"; situação. A situação é a pílula do 4.3 a partir de 1100 px e a versão compacta abaixo disso.
- **Grupos:** "MANHÃ · 8", "TARDE · 5", "NOITE · 1" (manhã antes de 12 h, tarde antes de 18 h), em ordem de horário.
- **Selecionado** (`aria-pressed="true"`): só a partir de 1100 px, quando o detalhe fica ao lado. Abaixo disso a linha abre a folha e não fica marcada.

### 6.6 Cartão "Próximo"

Responde "quem é o próximo?". É a consulta Agendada ou Confirmada de hoje com o início mais cedo a partir de 10 minutos atrás.

- `<section aria-label="Próximo paciente" data-surface="dark">`, fundo `--foreground`, texto `--on-dark`, raio `--radius-lg`, `padding: var(--space-10) var(--space-12) var(--space-10) var(--space-18)`, espaço `--space-16`, `flex-wrap: wrap`, margem inferior `--space-14`.
- **Rótulo:** ponto de 8 px em `--on-dark-accent` com halo `0 0 0 4px color-mix(in srgb, var(--on-dark-accent) 22%, transparent)` e o texto "PRÓXIMO · EM 20 MIN" em `--text-micro` `--weight-extrabold` `--tracking-caps` maiúsculo `--on-dark-accent`. O tempo diz "agora" quando já passou do início, "em 20 min" abaixo de 1 hora e "em 1 h 15 min" acima.
- **Corpo** (um `<button>` que abre o detalhe): hora em `--text-display-sm` `--weight-extrabold` números tabulares; ao lado, nome em `--text-lead` `--weight-bold` e "Procedimento · Profissional · 30 min" em `--text-small` `--on-dark-muted`. Hover: fundo `color-mix(in srgb, var(--on-dark) 6%, transparent)`, raio `--radius-md`.
- **Ações**, à direita: "Iniciar atendimento" (`stethoscope`), só se a consulta estiver Confirmada, com fundo `--on-dark-accent` e texto `--foreground`; "WhatsApp" (`message-circle`), com fundo `--on-dark-fill` e texto `--on-dark`. Ambos na altura `--control-md`.
- **Compacto** (agenda abaixo de 900 px): `padding: var(--space-8) var(--space-12)`, raio `--radius-box`, hora em `--text-title`, nome em `--text-ui`, segunda linha em `--text-caption`, sem as ações; tocar abre o detalhe.
- Abaixo de 600 px, corpo e ações ocupam a largura toda e os botões dividem a linha. A 375 px o cartão tem 313 px de largura útil, e "Iniciar atendimento" (144 px de ícone e texto) mais "WhatsApp" (106 px) não cabem com o `padding` de `--space-18` do botão (precisam de ≈330 px): os botões ficam com `padding: 0 var(--space-12)` e `flex: 1 1 auto` (cada um com o seu conteúdo e a sobra dividida igualmente) e o contêiner das ações com `min-width: 0`, senão os botões o empurram para fora do cartão.

```css
@media (max-width: 599px) {
  .next-body, .next-actions { flex: 1 1 100%; }
  .next-actions { min-width: 0; }
  .next-actions .button { flex: 1 1 auto; min-width: 0; padding: 0 var(--space-12); }
}
```

### 6.7 Linha "agora"

- **Na lista do dia:** um item `aria-hidden="true"` entre a última consulta que já começou e a primeira que ainda não começou. Ponto de 10 px `--accent` com halo `0 0 0 4px var(--accent-soft)`, a palavra "Agora" em `--text-caption` `--weight-bold` `--accent-text` e uma linha de 2 px `--accent` até a borda, `margin: var(--space-4) var(--space-14)`. Se todas as consultas já começaram, a linha não aparece.
- **Na grade:** seção 7.2.
- A hora usada pela linha, pelo cartão "Próximo" e pelos grupos é atualizada a cada 30 s.

### 6.8 Painel lateral e folha inferior

O mesmo componente em três formas: **coluna**, ao lado da página, só para o detalhe da consulta na Agenda a partir de 1280 px (7.2); **painel**, à direita e por cima da página, de 900 a 1279 px e, a partir de 1280 px, nas demais ações rápidas; **folha**, que sobe de baixo, abaixo de 900 px. Abre o detalhe da consulta, o menu Mais e outras ações rápidas. A coluna não cobre nada e é um diálogo não modal: a agenda continua inteira e clicável. O painel e a folha escurecem a página com o véu; o aviso com "Desfazer" fica acima do véu e continua clicável sem fechar o painel.

| | Coluna (Agenda, 1280 px ou mais) | Painel (900 px ou mais) | Folha (abaixo de 900 px) |
| --- | --- | --- | --- |
| Posição | segunda coluna de `.agenda-main`, largura `var(--overlay-width)`, da altura da coluna (7.2) | `position: fixed; top: 0; right: 0; bottom: 0`, largura `min(var(--overlay-width), 100vw)` | `position: fixed; left: 0; right: 0; bottom: 0`, altura máxima `88dvh` |
| Fundo e borda | `--card`, borda `--line` `--border`, raio `--radius-xl` | `--card`, borda esquerda `--line` `--border`, `--shadow-lg` | `--card`, raio `--radius-sheet` nos cantos de cima, `--shadow-lg` |
| Véu | nenhum | `--overlay` atrás; tocar no véu fecha | `--overlay` atrás; tocar no véu fecha |
| Alça | nenhuma | nenhuma | 44 × 5 px, raio `--radius-full`, `--border-strong`, `margin: var(--space-10) auto 0` |
| Cabeçalho | `padding: var(--space-18) var(--space-24) var(--space-4)` | `padding: var(--space-18) var(--space-24) var(--space-4)` | `padding: var(--space-6) var(--space-16) 0 var(--space-20)` |
| Corpo | `padding: var(--space-10) var(--space-24) var(--space-24)`, espaço `--space-20`, rolagem própria com `overscroll-behavior: contain` | o mesmo da coluna | `padding: var(--space-8) var(--space-20) var(--space-20)`, espaço `--space-16` |
| Rodapé opcional | `padding: var(--space-14) var(--space-24) var(--space-20)`, borda superior `--line` `--border` | o mesmo da coluna | `padding: var(--space-12) var(--space-20) calc(var(--space-16) + env(safe-area-inset-bottom))` |
| Entrada | nenhuma: a grade muda de largura de uma vez (seção 8) | desliza 24 px da direita, opacidade de 0,4 a 1, `--duration-slow` `ease-out` | sobe 40 px, opacidade de 0,4 a 1, `--duration-slow` `ease-out` |

- **Título:** curto, em maiúsculas (`--text-small` `--weight-bold` `--muted-foreground` `--tracking-caps`), por exemplo "CONSULTA". O nome da pessoa vem no corpo, grande.
- **Fechar:** botão de ícone `x` `--icon-lg` `ghost` com `aria-label="Fechar"`, no canto do cabeçalho. Esc também fecha.
- **Foco:** vai para o painel, a folha ou a coluna ao abrir e volta ao elemento que o abriu ao fechar.
- `z-index: var(--z-panel)` no painel e na folha; o véu usa `--z-overlay`. A coluna não tem `z-index`: é parte da página.

**Detalhe da consulta** (conteúdo do painel e da coluna lateral da tela Hoje), de cima para baixo. Os itens 1 a 5 rolam dentro do corpo; o item 6, a ação principal, é o rodapé e fica sempre visível, sem rolar:

1. Iniciais `xl` e, ao lado, o nome em `--text-title` e "34 anos · (11) 98765-4321" em `--text-ui` `--muted-foreground` (sem telefone: "Sem telefone cadastrado").
2. Três atalhos numa grade `1.2fr 1fr 1fr`, espaço `--space-8`, todos `sm`: "WhatsApp" (`whatsapp`, `message-circle`), "Ligar" (`secondary`, `phone`, link `tel:`) e "Ficha" (`secondary`, `user-round`). Sem telefone, WhatsApp e Ligar ficam desabilitados. O WhatsApp abre `https://wa.me/55<DDD><número>?text=<lembrete>` com o texto "Olá, Helena! Lembrando da sua consulta de limpeza no dia 28/10/2026 às 10:00. Podemos confirmar?". Nada é enviado sozinho: a conversa abre e a pessoa decide.
3. Caixa de dados: `<dl>` com fundo `--card-soft`, raio `--radius-box`, `padding: var(--space-18)`, espaço `--space-14`. Cada linha é uma grade `24px 1fr` com espaço `--space-12`: ícone `--icon` `--muted-foreground`; rótulo em `--text-caption` `--weight-semibold` `--muted-foreground`; valor em `--text-body` `--weight-medium`. Linhas: Horário ("Hoje, 10:00 às 10:30 · 30 min", ícone `clock`), Procedimento ("Limpeza · R$ 180,00", `clipboard-list`, o ícone da ficha do procedimento, nunca `sparkles`), Profissional (`stethoscope`), Observação (`sticky-note`). Valor vazio: "Não informado" em `--muted-foreground` `--weight-regular`.
4. Etapas (6.15). Em Cancelado e Faltou, no lugar delas, um alerta (`danger` para Cancelado, `warning` para Faltou) "Consulta cancelada" ou "Paciente faltou", com "Para atender de novo, agende uma nova consulta.". Em Concluído, alerta `success` "Atendimento concluído" abaixo das etapas.
5. Ações secundárias, só em situação aberta: grade de 3 colunas, espaço `--space-8`, todas `sm`: "Remarcar" (`secondary`, `calendar-sync`), "Faltou" (`danger`, `user-x`) e "Cancelar" (`danger`, `x`).
6. **Rodapé, ação principal:** botão `lg` `block` `primary` com a ação seguinte do 4.3 (`clock` para Confirmar, `stethoscope` para Iniciar e Concluir). Em situação final, "Agendar de novo" (`soft`, `rotate-ccw`) abre o agendamento com paciente e profissional já escolhidos. O rodapé nunca sai da tela: a rolagem é só do corpo.

Receita da coluna de detalhe, usada na tela Hoje (7.1) e na Agenda a partir de 1280 px (7.2). No painel e na folha, corpo e rodapé seguem a tabela acima.

```css
.detail-column { display: flex; flex-direction: column; overflow: hidden; background: var(--card); border: var(--line) solid var(--border); border-radius: var(--radius-xl); }
.detail-column .detail-body { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; gap: var(--space-20); padding: var(--space-24); overflow-y: auto; overscroll-behavior: contain; }
.detail-column .detail-foot { flex: none; padding: var(--space-14) var(--space-24) var(--space-20); border-top: var(--line) solid var(--border); }
```

### 6.9 Botão flutuante

Abaixo de 1100 px, a ação principal da tela (Agendar, Novo paciente) sai do cabeçalho e flutua.

- `position: fixed; right: var(--space-18); bottom: calc(var(--tabbar) + var(--space-18) + env(safe-area-inset-bottom))`, `z-index: var(--z-fab)`.
- Variante `primary`, altura `--fab`, `padding: 0 var(--space-24) 0 var(--space-18)`, raio `--radius-lg`, `--shadow-fab`, ícone (`plus` ou `user-plus`) e rótulo curto: "Agendar", "Novo paciente". Nunca só o ícone.
- A lista embaixo dele reserva 72 px de margem inferior, para o botão não cobrir a paginação nem o último item.
- **Com aviso na tela** (6.10), o botão sobe para ficar acima da pilha de avisos, com a mesma transição do aviso: `transition: bottom var(--duration-slow) ease-out`. A base passa a ser a barra de abas + a altura da pilha + `--space-10`; o `--space-16` é a distância que a própria área de avisos mantém da barra. A área de avisos mede a pilha e a publica no `<html>` (`--toast-stack`, em px, e o atributo `data-toast` enquanto houver aviso):

```css
.fab { transition: bottom var(--duration-slow) ease-out; }
html[data-toast] .fab { bottom: calc(var(--tabbar) + var(--space-16) + var(--toast-stack) + var(--space-10) + env(safe-area-inset-bottom)); }
```

```js
const area = document.querySelector('.toasts');
new ResizeObserver(() => {
  const altura = area.getBoundingClientRect().height;
  document.documentElement.style.setProperty('--toast-stack', altura + 'px');
  document.documentElement.toggleAttribute('data-toast', altura > 0);
}).observe(area);
```

- **Camadas**, de baixo para cima: conteúdo, botão flutuante (`--z-fab`), barra de abas (`--z-tabbar`), véu (`--z-overlay`), painel e folha (`--z-panel`), aviso (`--z-toast`). Botão e aviso não se sobrepõem; o aviso fica acima de tudo, inclusive do véu, e continua clicável com um painel aberto.

### 6.10 Aviso com "Desfazer"

Aviso curto embaixo, depois de uma ação que mudou um dado.

- **Área:** `position: fixed`, centralizada, `bottom: var(--space-24)` (abaixo de 1100 px, `calc(var(--tabbar) + var(--space-16) + env(safe-area-inset-bottom))`), largura `min(var(--overlay-width), calc(100vw - 32px))`, avisos empilhados com espaço `--space-10`, `z-index: var(--z-toast)`. No máximo 3 ao mesmo tempo; o quarto tira o mais antigo.
- **Aviso** (`data-surface="dark"`): `display: flex`, espaço `--space-12`, `padding: var(--space-12) var(--space-10) var(--space-12) var(--space-14)`, raio `--radius-box`, fundo `--foreground`, texto `--on-dark`, `--shadow-lg`.
- **Ícone:** círculo de 34 px com fundo `--on-dark-fill`; `check-check` `--icon-md` em `--on-dark-accent`, ou `circle-alert` em `--on-dark-danger` no erro.
- **Texto:** título em `--text-ui` `--weight-bold`; descrição opcional em `--text-small` `--on-dark-muted`.
- **Desfazer:** altura `--control-sm`, `padding: 0 var(--space-12)`, raio `--radius-sm`, fundo `--on-dark-fill`, texto `--on-dark-accent` `--weight-bold`. Desfazer volta a situação anterior e mostra "Situação restaurada", sem novo Desfazer.
- **Fechar:** 38 × 38 px, fundo transparente, `x` `--icon-md` em `--on-dark-muted`, `aria-label="Fechar aviso"`.
- **Abaixo de 600 px:** o aviso tem duas linhas. Em cima, o ícone e o texto, que ocupa o resto da linha; embaixo, "Desfazer" e "Fechar" alinhados à direita (sem "Desfazer", só "Fechar", também à direita), com espaço de `--space-8` entre as linhas. "Fechar" continua. A 375 px o texto tem 273 px e "Consulta de Helena confirmada" cabe numa linha.

```css
@media (max-width: 599px) {
  .toast { flex-wrap: wrap; row-gap: var(--space-8); }
  .toast-text { flex: 1 1 calc(100% - 34px - var(--space-12)); }
  .toast-undo, .toast-text + .toast-close { margin-left: auto; }
}
```

- **Tempo:** 5 s, pausado enquanto o ponteiro ou o foco estiver no aviso. Arrastar para baixo fecha.
- **Movimento:** entra subindo 16 px com opacidade de 0 a 1 em `--duration-slow` `ease-out`; sai com opacidade até 0 em `--duration-fast` `ease-in`.
- **Erro:** "Não foi possível mudar a situação", com a mensagem do servidor na descrição e sem Desfazer.

### 6.11 Paginação

Listas que crescem mostram 20 itens por página. A página atual fica no endereço (`?pagina=3`), para voltar da ficha ao mesmo lugar.

- `<nav aria-label="Páginas de pacientes">` abaixo da lista, `display: flex; justify-content: space-between; flex-wrap: wrap`, espaço `--space-10` × `--space-16`.
- **Resumo:** "Mostrando **21–40** de **134** pacientes", `--text-small` `--muted-foreground`, números em `--foreground` tabulares.
- **Botões:** "Anterior" (`chevron-left`) e "Próxima" (`chevron-right`) com `padding: 0 var(--space-14)`; números com largura mínima 42 px. Todos com altura 42 px, raio `--radius-md`, borda `--line-control` `--border`, fundo `--card`, `--text-ui` `--weight-bold`, números tabulares, espaço `--space-4` entre números.
- **Números mostrados:** a primeira, a última, a atual e as vizinhas; "…" no lugar de saltos maiores que uma página.
- **Estados:** hover com borda `--primary`; página atual com fundo e borda `--primary`, texto `--primary-foreground`, `aria-current="page"`; "Anterior" na primeira página e "Próxima" na última ficam desabilitados (texto `--muted-foreground`, fundo transparente, opacidade 0,6).
- **Abaixo de 600 px:** os números somem e entra "Página 3 de 7" entre os botões; o resumo ocupa a linha de cima, centralizado.
- Trocar de página rola até o topo da lista se ele saiu da tela.

### 6.12 Esqueleto, estado vazio e erro

- **Esqueleto:** blocos empilhados com espaço `--space-10`, raio `--radius`, fundo `linear-gradient(90deg, var(--muted), var(--card-soft), var(--muted))` com `background-size: 200% 100%`, animado da direita para a esquerda em `--duration-shimmer` `ease-in-out` infinito. O conjunto tem `role="status"` e `aria-label="Carregando"`. A quantidade e a altura de cada tela estão na seção 7. Nunca a palavra "Carregando…" sozinha no lugar da lista.
- **Estado vazio:** coluna centralizada, espaço `--space-10`, `padding: var(--space-48) var(--space-20)`, fundo `--card`, borda `--line` `--border`, raio `--radius-lg`. Círculo de 56 px `--primary-soft` com ícone `--icon-lg` `--primary`; título `h2` em `--text-section` `--weight-extrabold`; uma frase em `--muted-foreground` com largura máxima de 46 caracteres; a ação que resolve, quando houver.
- **Erro ao carregar:** o mesmo bloco, com `role="alert"`, círculo `--destructive-soft` e `circle-alert` `--destructive`, título "Não foi possível carregar", a mensagem do servidor ou "Tente de novo em instantes." e o botão "Tentar de novo" (`secondary`, `rotate-cw`, altura `--target`).

### 6.13 Alerta e selo

- **Alerta:** `display: flex; align-items: center`, espaço `--space-14`, `padding: var(--space-14) var(--space-18)`, raio `--radius-box`, `--text-ui`. Fundo `--<tom>-soft`, texto `--<tom>` (`--destructive` no tom de perigo), borda `--line` `color-mix(in srgb, currentColor 25%, transparent)`. Ícone `--icon` num círculo de 38 px com fundo `color-mix(in srgb, currentColor 12%, transparent)`: `info`, `check-check`, `triangle-alert` ou `octagon-alert`. Título opcional em `--weight-bold`; ação opcional à direita. Perigo usa `role="alert"`; os outros, `role="status"`. Abaixo de 600 px, a ação desce e ocupa a largura.
- **Selo:** altura 28 px, `padding: 0 var(--space-10)`, raio `--radius-full`, `--text-caption` `--weight-semibold`, ícone `--icon-sm` opcional. Tons: neutro (`--muted` com `--muted-foreground`), `primary`, `success`, `warning`, `info` e perigo, cada um com o `-soft` de fundo.

### 6.14 Diálogo de confirmação

Só para ação que não se desfaz (cancelar consulta, marcar falta, descartar alterações). Modal.

- Véu `--overlay`, aparece em `--duration-base`. Caixa centralizada, largura `min(var(--overlay-width), calc(100vw - 32px))`, fundo `--card`, raio `--radius-xl`, `padding: var(--space-24)`, `--shadow-lg`, espaço `--space-12`; entra subindo 4% da própria altura com opacidade de 0 a 1 em `--duration-base`.
- Título em `--text-title` `--weight-extrabold`, como pergunta: "Cancelar esta consulta?". Texto em `--text-body` `--muted-foreground` com a consequência: "A consulta cancelada não pode ser reaberta. Para atender o paciente, será preciso agendar de novo."
- Botões à direita, espaço `--space-10`: "Voltar" (`secondary`) e a ação com verbo e objeto, "Cancelar consulta" ou "Marcar falta" (`dark`; `primary` quando a ação não é destrutiva). Abaixo de 480 px, os dois dividem a largura.
- O foco abre em "Voltar". Esc e "Voltar" fecham sem fazer nada. Enquanto salva, o botão da ação fica em carregando.

### 6.15 Faixa de dias, etapas, cartão e indicador

**Faixa de dias** (`<nav aria-label="Dias da semana">`): os 7 dias da semana atual, de segunda a domingo, cada um um link com `flex: 1 0 58px`, largura máxima 72 px, altura 66 px, raio `--radius-box`, fundo `--card`, borda `--line` `--border`; dia da semana abreviado em `--text-caption` `--weight-semibold` `--muted-foreground` e número em `--text-heading` `--weight-bold`. Hover: borda `--border-strong`. Hoje: fundo e borda `--primary`, número `--primary-foreground`, dia da semana `--on-primary-muted`, `aria-current="date"`. Os outros dias abrem a agenda na visão Dia daquela data. Sem espaço, a faixa rola na horizontal.

**Etapas da consulta** (`<ol aria-label="Etapas da consulta">`): as quatro etapas do 4.3 lado a lado, com a legenda "Situação: **Confirmado** · Próximo: **iniciar atendimento**" acima, em `--text-small` `--muted-foreground`.

- Cada etapa: círculo de 26 px e o rótulo embaixo em `--text-caption` `--weight-semibold`, ligados por uma linha de 2 px na altura do centro do círculo.
- Pendente: círculo com fundo `--background` e borda 2 px `--border`, rótulo `--muted-foreground`, linha `--border`.
- Feita (a atual e as anteriores): círculo `--primary` com `check` `--icon-xs` em `--primary-foreground`, rótulo `--foreground`, linha `--primary`. A atual leva `aria-current="step"`.
- Próxima: círculo com fundo `--card`, borda 2 px tracejada `--primary` e halo `0 0 0 4px var(--primary-soft)`, rótulo `--primary` `--weight-extrabold`, e o texto oculto " (próximo passo)".

**Cartão:** fundo `--card`, borda `--line` `--border`, raio `--radius-lg`, `padding: var(--space-20) var(--space-24)` (`--space-16` abaixo de 768 px). Cabeçalho opcional com `h2` em `--text-section` `--weight-extrabold` e uma ação à direita, margem inferior `--space-14`.

**Indicador:** cartão com `padding: var(--space-18) var(--space-20)` e espaço `--space-4`. Ícone `--icon` num quadrado de 40 px, raio `--radius-md`, com as cores do selo do tom; rótulo em `--text-ui` `--weight-semibold` `--muted-foreground`; valor em `--text-display-sm` `--weight-extrabold` `--tracking-display`, números tabulares; dica em `--text-small` `--muted-foreground`. Em destaque (um por tela, o saldo): fundo e borda `--primary`, valor `--primary-foreground`, rótulo e dica `--on-primary-muted`, quadrado do ícone `--on-dark-fill` com ícone `--on-dark`. Abaixo de 600 px: `padding: var(--space-14)`, quadrado de 34 px, valor em `--text-heading` sem quebra de linha.

## 7. Telas

Toda tela começa pelo cabeçalho do 5.4, com o `h1` que recebe o foco na navegação, e atualiza o título da aba para `<Tela> — <Nome do produto>`. Filtros, visão e página escolhidos ficam no endereço, para voltar ao mesmo lugar e para compartilhar o link.

### 7.1 Hoje

A tela inicial. Responde em segundos: quem vem hoje, quem é o próximo, quem ainda não confirmou.

**Layout.** A partir de 1100 px a tela é uma grade de duas colunas, `grid-template-columns: minmax(0, 1fr) var(--side)` (`--side-narrow` abaixo de 1280 px), espaço `--space-24`, `align-items: start`. A da esquerda (`.today-main`) leva os itens 1 a 5 e a lista; a da direita é o detalhe (item 6), que começa no alto do conteúdo, ao lado do cabeçalho: assim a ação seguinte cabe na primeira dobra de 1440 × 900. Abaixo de 1100 px é uma coluna só e o detalhe some.

1. **Cabeçalho:** "Bom dia, Carla" e o subtítulo "Quarta, 28 de outubro · 14 consultas". Ação: "Agendar consulta" (`primary`, `plus`), que vira o botão flutuante "Agendar" abaixo de 1100 px.
2. **Faixa de dias** (6.15), margem inferior `--space-14`.
3. **Chips por profissional** (6.4): "Todos 14", "Dra. Lia 6", "Dr. Caio 5", "Dra. Bianca 3" (a contagem de "Todos" é a soma das outras). O filtro fica em `?profissional=`.
4. **Cartão "Próximo"** (6.6), só abaixo de 1100 px; acima disso, o detalhe ao lado já abre com o próximo paciente.
5. **Lembrete de confirmação**, só se houver consultas Agendadas: `clock` `--icon` e "4 pacientes ainda não confirmaram" (singular: "1 paciente ainda não confirmou"), `padding: var(--space-12) var(--space-16)`, raio `--radius-box`, fundo `--status-agendado-bg`, texto `--status-agendado-fg` `--text-ui` `--weight-semibold`, margem inferior `--space-14`.
6. **Lista e detalhe:**
   - Lista: 6.5, com a linha "agora" do 6.7, no fim da coluna `.today-main`.
   - Detalhe: `<aside class="detail-column today-detail" aria-label="Consulta selecionada">` com o corpo e o rodapé da receita do 6.8 (as ações secundárias rolam com o corpo; a ação seguinte fica no rodapé, sempre à vista). Abre com o próximo paciente; sem próximo, com a primeira consulta a partir de agora; sem ela, com a primeira do dia. Sem nenhuma, "Escolha uma consulta para ver os detalhes." centralizado em `--muted-foreground`, sem rodapé.
   - Receita da grade e da coluna fixa:

```css
.today { display: grid; grid-template-columns: minmax(0, 1fr) var(--side); gap: var(--space-24); align-items: start; }
.today-main { min-width: 0; }
.today-detail { position: sticky; top: calc(var(--topbar) + var(--space-20)); max-height: calc(100dvh - var(--topbar) - var(--space-40)); }
@media (max-width: 1279px) { .today { grid-template-columns: minmax(0, 1fr) var(--side-narrow); } }
@media (max-width: 1099px) { .today { display: block; } .today-detail { display: none; } }
```

   - Abaixo de 1100 px a coluna lateral some; tocar na consulta abre o detalhe no painel ou na folha (6.8).

| Estado | O que aparece no lugar da lista |
| --- | --- |
| Carregando | Esqueleto de 6 blocos de 64 px |
| Vazio | `calendar-check`, "Nenhuma consulta hoje", "Quando houver consultas para hoje, elas aparecem aqui em ordem de horário." e "Agendar consulta" |
| Filtro sem resultado | A lista vazia do profissional, com o mesmo estado vazio |
| Erro | Erro ao carregar (6.12) |

### 7.2 Agenda

Grade de tempo: horas no eixo vertical, dias no horizontal, cada consulta um cartão com a altura da duração do procedimento.

**Cabeçalho:** título "Agenda" e subtítulo com o período e o total ("26 de outubro a 1 de novembro · 65 consultas"; na visão Dia, "Hoje, 28 de outubro"). Ações, nesta ordem: "Período anterior" (botão de ícone `secondary`, `chevron-left`), "Hoje" (`secondary`), "Próximo período" (`chevron-right`), o segmentado de visão e "Agendar consulta" (`primary`, `plus`; botão flutuante abaixo de 1100 px).

**Visões:**

| Visão | Colunas | Quando |
| --- | --- | --- |
| Semana (padrão a partir de 900 px) | 7 dias, de segunda a domingo | Só a partir de 900 px |
| 3 dias | O dia escolhido e os 2 seguintes | Só abaixo de 900 px; substitui Semana |
| Dia (padrão abaixo de 900 px) | A partir de 900 px, uma coluna por profissional; abaixo, uma coluna só | Sempre |
| Mês | Calendário de 7 colunas com a contagem por dia | Sempre |

Visão, data, profissional e consulta aberta ficam no endereço: `?ver=semana&data=2026-10-28&profissional=3&consulta=812`.

**Abaixo do cabeçalho:** chips por profissional com contagem e, à direita, a legenda das situações (4.3), que some abaixo de 1280 px e desce para a linha de baixo quando não couber (com a coluna de detalhe aberta, por exemplo). Depois, o cartão "Próximo" (6.6) quando o período mostrado inclui hoje e há próximo paciente; compacto abaixo de 900 px.

**Grade:**

```css
.grid { --axis: 58px; --hour: 80px; display: flex; flex-direction: column; min-width: 0; overflow: hidden;
  background: var(--card); border: var(--line) solid var(--border); border-radius: var(--radius-lg); }
.grid-head, .grid-canvas { display: grid; grid-template-columns: var(--axis) repeat(var(--columns), minmax(0, 1fr)); }
.grid-head { border-bottom: var(--line) solid var(--border); }
.grid-col-head { display: flex; align-items: center; gap: var(--space-10); min-width: 0; padding: var(--space-10) var(--space-12); border-left: var(--line) solid var(--border); }
.grid-col-head b { display: block; font-size: var(--text-body); font-weight: var(--weight-extrabold); }
.grid-col-head small { display: block; font-size: var(--text-caption); font-weight: var(--weight-semibold); color: var(--muted-foreground); }
.grid-col-head[data-today] { background: var(--primary-soft); }
.grid-col-head[data-today] b, .grid-col-head[data-today] small { color: var(--primary); }
.grid-col-head[data-past] b { color: var(--muted-foreground); }
.grid-body { flex: 1 1 auto; min-height: calc(var(--hour) * 3); overflow-y: auto; overscroll-behavior: contain; }
.grid-canvas { position: relative; }
.grid-hours { position: relative; }
.grid-hours span { position: absolute; right: var(--space-10); transform: translateY(-50%); font-size: var(--text-micro);
  font-weight: var(--weight-bold); color: var(--muted-foreground); font-variant-numeric: tabular-nums; }
.grid-hours span:first-child { transform: none; top: var(--space-4) !important; }
.grid-column { position: relative; border-left: var(--line) solid var(--border);
  background-image: repeating-linear-gradient(to bottom,
    var(--border) 0, var(--border) 1px, transparent 1px, transparent calc(var(--hour) / 2),
    var(--grid-half) calc(var(--hour) / 2), var(--grid-half) calc(var(--hour) / 2 + 1px), transparent calc(var(--hour) / 2 + 1px), transparent var(--hour)); }
.grid-column[data-today] { background-color: var(--today-column); }
.grid-column[data-past], .grid-column[data-empty] { background-color: var(--card-soft); }
.grid-empty { position: absolute; top: var(--space-16); left: 0; right: 0; text-align: center;
  font-size: var(--text-caption); font-weight: var(--weight-semibold); color: var(--muted-foreground); }
@media (max-width: 899px) {
  .grid { --axis: 46px; --hour: 68px; }
  .grid-col-head { justify-content: center; text-align: center; padding: var(--space-8) var(--space-4); }
  .grid-hours span { right: var(--space-6); }
}
```

- **Altura:** sem número fixo. A página da Agenda tem a altura da janela abaixo da barra superior (`<main class="agenda-main">`, com o `padding` da casca dentro da altura) e a coluna da esquerda (`.agenda-col`) é uma coluna `flex`: cabeçalho, chips e cartão "Próximo" têm a altura que têm, a grade ocupa o que sobra (`flex: 1 1 auto; min-height: 0`) e só o corpo da grade rola (`.grid-body`, `flex: 1 1 auto; overflow-y: auto`), com o piso de 3 horas (`calc(var(--hour) * 3)`). Se o que está acima da grade deixar menos que o piso, a página rola.

```css
.agenda-main { display: grid; grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); gap: var(--space-24); height: calc(100dvh - var(--topbar)); }
.agenda-col { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.agenda-col > .grid { flex: 1 1 auto; min-height: 0; }
.agenda-col .page-actions { margin-left: auto; }
.filters-row { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-12) var(--space-20); margin-bottom: var(--space-14); }
.filters-row .legend { margin-left: auto; }
.agenda-detail { min-height: 0; }
.agenda-detail .detail-head { display: flex; align-items: center; justify-content: space-between; padding: var(--space-18) var(--space-24) var(--space-4); }
.agenda-detail .detail-body { padding-top: var(--space-10); }
@media (min-width: 1280px) { .agenda-main[data-panel] { grid-template-columns: minmax(0, 1fr) var(--overlay-width); } }
@media (max-width: 1099px) { .agenda-main { height: calc(100dvh - var(--topbar-mobile)); } }
```

- **Consulta aberta:** a partir de 1280 px, clicar num cartão abre o detalhe numa coluna própria: o `<main class="agenda-main" data-panel>` ganha a segunda coluna, `<aside class="detail-column agenda-detail">` com cabeçalho "CONSULTA" e fechar, corpo e rodapé do 6.8, e a grade encolhe para caber ao lado. Nada fica coberto: nem as colunas da grade, nem a legenda, nem as ações do cabeçalho, nem o menu da conta. Fechar (botão ou Esc) tira o `data-panel` e a grade volta à largura inteira. Abaixo de 1280 px o detalhe abre como painel (900 a 1279 px) ou folha (abaixo de 900 px), por cima da página e com véu. Com a coluna aberta cada dia fica mais estreito (≈119 px a 1440 px, contra ≈188 px); por isso o conteúdo dos cartões acompanha a largura (ver "Conteúdo pelo espaço"), e o cabeçalho e a linha dos chips quebram em duas linhas quando preciso.

- **Montagem:** o elemento `.grid` recebe o número de colunas em `--columns` (por exemplo, `style="--columns: 7"`); dentro de `.grid-body`, o `.grid-canvas` tem altura `(fim − início da janela) / 60 × --hour`, com `.grid-hours` na primeira coluna e uma `.grid-column` por dia ou profissional.
- **Janela de horas:** de 7 h às 19 h, ampliada até a hora cheia anterior à primeira consulta ou posterior à última. Um rótulo por hora no eixo ("08:00"); linha `--border` na hora cheia e `--grid-half` na meia hora.
- **Cabeçalho da coluna:** "Seg 26" e, embaixo, "Hoje · 14 consultas" ou "12 consultas". Na visão Dia por profissional: iniciais `sm`, nome e "Ortodontia · 6 consultas". Dia passado com o título em `--muted-foreground` e a coluna em `--card-soft`; dia sem consulta com a coluna em `--card-soft` e "Sem consultas" no topo (`.grid-empty`).
- **Rolagem inicial:** 1 hora antes de agora quando hoje está na tela; senão, meia hora antes da primeira consulta. Só rola de novo quando o período muda.

**Cartão da consulta** (um `<button>` posicionado na coluna):

```css
.slot { --fg: var(--status-confirmado-fg); --bg: var(--status-confirmado-bg); --bar: var(--status-confirmado-bar);
  position: absolute; z-index: 1; display: flex; flex-direction: column; gap: 1px; overflow: hidden; text-align: left;
  padding: var(--space-4) var(--space-6) var(--space-4) var(--space-10); border: var(--line) solid var(--slot-edge);
  border-radius: var(--radius-sm); background-color: var(--bg); color: var(--foreground);
  font-size: var(--text-micro); line-height: var(--leading-card); }
.slot::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 4px; background: var(--bar); }
.slot:hover { filter: brightness(.97); z-index: 2; }
.slot:focus-visible { outline-offset: 1px; z-index: 3; }
.slot[aria-current="true"] { box-shadow: var(--shadow-selected); z-index: 3; }
.slot .time { display: flex; align-items: center; gap: var(--space-4); font-weight: var(--weight-bold); color: var(--fg); font-variant-numeric: tabular-nums; white-space: nowrap; }
.slot .time svg { width: var(--icon-xs); height: var(--icon-xs); stroke-width: 2.6; margin-left: auto; flex: none; }
.slot .name { font-size: var(--text-caption); font-weight: var(--weight-bold); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.slot .detail, .slot .who { color: var(--muted-foreground); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.slot .who { display: flex; align-items: center; gap: var(--space-4); margin-top: auto; font-weight: var(--weight-semibold); }
.slot.one-line { flex-direction: row; align-items: center; gap: var(--space-4); }
.slot.one-line .time { flex: none; }
.slot.one-line .name { flex: 1 1 auto; min-width: 0; }
.slot { container-type: inline-size; }
@container (width < 86px) { .slot .to { display: none; } }
@container (width < 50px) { .slot .at { display: none; } }
@container (width < 150px) { .slot.one-line .to { display: none; } }
@container (width < 114px) { .slot.one-line .at { display: none; } }
@container (width < 38px) { .slot.packed .name { display: none; } }
.slot[data-status="agendado"] { --fg: var(--status-agendado-fg); --bg: var(--status-agendado-bg); border: var(--line-control) dashed var(--status-agendado-bar); }
.slot[data-status="agendado"]::before { display: none; }
.slot[data-status="atendimento"] { --fg: var(--status-atendimento-fg); --bg: var(--status-atendimento-bg); --bar: var(--status-atendimento-bar); color: var(--status-atendimento-fg); box-shadow: var(--shadow-live); }
.slot[data-status="atendimento"] .detail, .slot[data-status="atendimento"] .who { color: var(--status-atendimento-muted); }
.slot[data-status="concluido"] { --fg: var(--status-concluido-fg); --bg: var(--status-concluido-bg); --bar: var(--status-concluido-bar); }
.slot[data-status="concluido"] .name { color: var(--status-concluido-fg); }
.slot[data-status="cancelado"] { --fg: var(--status-cancelado-fg); --bg: var(--status-cancelado-bg); --bar: var(--status-cancelado-bar); background-image: var(--hatch); }
.slot[data-status="cancelado"] .name { color: var(--muted-foreground); text-decoration: line-through; }
.slot[data-status="faltou"] { --fg: var(--status-faltou-fg); --bg: var(--status-faltou-bg); --bar: var(--status-faltou-bar); background-image: var(--hatch); }
```

- **Posição:** `top = (início − início da janela) / 60 × --hour + 1,5 px`; `height = max(duração / 60 × --hour − 3 px, 26 px)`. A duração é a do procedimento; sem ela, 30 minutos.
- **Simultâneas lado a lado:** consultas que se sobrepõem formam um grupo; cada uma vai para a primeira faixa livre do grupo, e o grupo divide a largura em partes iguais: `left: calc(faixa / faixas × 100% + 3px)`, `width: calc(100% / faixas − 6px)`. Com um profissional escolhido no filtro, o cartão ocupa a largura do dia.
- **Conteúdo pelo espaço:** o ícone da situação nunca sai do cartão, porque Confirmado e Concluído têm a mesma forma e sem ele só a cor os separaria. O resto depende das faixas, da largura e da altura do cartão:
  - **1 ou 2 faixas:** nome completo, cortado com reticências depois do ícone; procedimento (`.detail`) com altura de 64 px ou mais; profissional (`.who`, iniciais `xxs` e primeiro nome) com 84 px ou mais e sem filtro de profissional.
  - **3 faixas ou mais** (classe `.packed`): só o ícone e as iniciais do paciente (duas letras, as mesmas do 4.2, em `--text-caption` `--weight-bold`, sem círculo e com `aria-hidden="true"`), sem hora, nome, procedimento nem profissional. Se a largura interna do cartão for menor que 38 px (14 do ícone + 4 de espaço + 20 das iniciais), só o ícone.
  - **Hora**, pela largura interna do cartão (sem borda nem padding), no `.at` (início) e no `.to` (fim, com o travessão): em duas linhas, início e fim ("09:00–09:30") a partir de 86 px, só o início a partir de 50 px, nenhuma abaixo disso; em linha única, 150 px e 114 px, porque o nome precisa do resto. A 1440 px, sem a coluna de detalhe aberta, isso dá início e fim no cartão sozinho, só o início no de duas faixas com duas linhas e nenhuma hora no de duas faixas em linha única.
  - **Linha única:** abaixo de 43 px de altura, hora e nome ficam na mesma linha (`.one-line`): duas linhas pedem 14,64 px (`--text-micro` × `--leading-card`) + 1 px de espaço + 15,86 px (`--text-caption` × `--leading-card`) + 8 px de padding + 3 px de borda tracejada = 42,5 px. O cartão de 30 minutos, com 37 px, é sempre `.one-line`; o de 45 minutos (57 px), não.
- **Nome acessível:** "09:00 às 09:30, Helena Prado, Limpeza, Dra. Lia Moura, Confirmado". Clicar abre o detalhe na coluna ao lado da grade ou, abaixo de 1280 px, no painel (6.8), sem tirar a grade da tela; o cartão aberto leva `aria-current="true"`.

**Agendar num horário livre:** com o mouse sobre um espaço vazio de hoje (a partir de agora) ou de um dia futuro, aparece um cartão fantasma de 30 minutos no horário arredondado para baixo de 15 em 15 minutos: borda `--line-control` tracejada `--primary`, fundo `color-mix(in srgb, var(--primary-soft) 85%, transparent)`, raio `--radius-sm`, "+ 09:30 · Agendar" em `--text-micro` `--weight-bold` `--primary`. Clicar abre o agendamento com dia, hora e profissional preenchidos. Pelo teclado, o caminho é o botão "Agendar consulta"; um texto oculto antes da grade diz isso.

**Linha "agora"** (só quando hoje está na tela e a hora atual cabe na janela, `aria-hidden="true"`, `z-index: 4`, sem receber clique):

- Linha de 2 px atravessando todas as colunas, de `--axis` até a borda direita, em `color-mix(in srgb, var(--accent) 45%, transparent)`, com um ponto de 10 px `--accent` no começo.
- Na coluna de hoje, por cima, uma linha de 3 px em `--accent`.
- No eixo, a hora atual numa etiqueta: fundo `--accent-text`, texto `--on-dark` `--text-micro` `--weight-extrabold`, números tabulares, raio 6 px, `padding: var(--space-2) var(--space-4)`, a 4 px da esquerda.

**Mês:** cabeçalho com "SEG" a "DOM" no estilo de rótulo em maiúsculas (seção 3), `padding: var(--space-10) var(--space-12)`. Cada dia é um `<button>` com altura mínima 104 px (64 px abaixo de 600 px), `padding: var(--space-10) var(--space-12)` (`var(--space-8) var(--space-6)` abaixo de 600 px), bordas superior e esquerda `--line` `--border`, fundo `--card`, hover `--card-soft`. Número do dia em `--text-body` `--weight-bold`; hoje com o número num círculo de 30 px `--primary` e `--primary-foreground`; dia de outro mês com fundo `--card-soft` e número em `--muted-foreground` `--weight-regular`. Dia com consultas mostra um selo `primary` com `calendar-plus` e "6 consultas" (abaixo de 600 px, só o número). Nome acessível "28: 6 consultas". Clicar abre a visão Dia daquela data.

| Estado | O que aparece |
| --- | --- |
| Carregando | Esqueleto de 1 bloco de 480 px no lugar da grade; ao trocar de período, a grade anterior fica até chegar a nova |
| Vazio | A grade, com todas as colunas em "Sem consultas", e o botão de agendar |
| Erro | Erro ao carregar (6.12) no lugar da grade |

### 7.3 Agendar consulta

Página larga (`--page-wide`). A partir de 1100 px, formulário à esquerda e resumo fixo à direita numa grade `minmax(0, 1fr) var(--summary)` com espaço `--space-24`.

- **Formulário**, em cartões empilhados com espaço `--space-16`, cada um com título e ícone `--icon` `--primary`: paciente (busca por nome; escolhido, aparece com iniciais `lg`, nome em `--text-lead` e o botão "Trocar"), profissional (chips até 6, combobox acima), procedimento (combobox), dia e horário, observação (até 255 caracteres).
- **Horários livres:** depois de escolher o profissional e o dia, os horários livres aparecem agrupados por período ("MANHÃ", "TARDE"), numa grade `repeat(auto-fill, minmax(78px, 1fr))` com espaço `--space-8`. Cada horário é um botão de 42 px, raio `--radius-md`, borda `--line-control` `--border`, `--text-ui` `--weight-bold`, números tabulares; hover com borda `--primary`; escolhido com fundo `--primary`, texto `--primary-foreground` e `aria-pressed="true"`. Até 8 por período, com "Ver todos (14)" embaixo, que vira "Ver menos". Enquanto confere, "Conferindo a agenda…"; sem horário livre, "Não há horário livre neste dia. Escolha outro dia ou informe o horário manualmente."
- **Resumo:** `position: sticky; top: calc(var(--topbar) + var(--space-20))`, fundo `--card`, borda, raio `--radius-xl`, `padding: var(--space-24)`. Título "Resumo da consulta"; lista em `--card-soft` com Paciente, Profissional, Procedimento e Dia e horário (o que falta aparece em itálico `--muted-foreground`, por exemplo "Escolha o paciente"); alerta `warning` "Este horário já está ocupado" se ele se sobrepõe a outra consulta do mesmo profissional; botão `lg` `block` "Agendar consulta" e, embaixo, "Cancelar" (`ghost`, `block`).
- **Abaixo de 1100 px:** uma coluna; o resumo vira uma barra fixa acima da barra de abas (fundo `--card`, borda superior, `--shadow-bar`, `padding: var(--space-10) var(--page-x)`), com o paciente em `--text-ui` `--weight-bold`, o resto em `--text-caption` e o botão "Agendar" à direita. O aviso de sobreposição desce para dentro do formulário.

### 7.4 Pacientes

**Lista:**

1. Cabeçalho "Pacientes", subtítulo "248 cadastrados", ação "Novo paciente" (`user-plus`; botão flutuante abaixo de 1100 px).
2. Busca grande: campo `type="search"` com `search` à esquerda, altura `--control-lg`, raio `--radius-full`, `padding-left: 50px`, texto `--text-lead`, largura máxima 640 px (inteira abaixo de 768 px), rótulo oculto "Buscar paciente" e o exemplo "Buscar pelo nome, CPF ou telefone". A busca ignora acentos e maiúsculas e filtra enquanto se digita.
3. Lista num cartão (`padding: var(--space-6) var(--space-6) var(--space-10)`), agrupada pela primeira letra do nome (letra em `--text-small` `--weight-extrabold` `--primary`, `padding: var(--space-12) var(--space-14) var(--space-4)`). Durante a busca, "12 pacientes encontrados" em `--text-small` `--weight-semibold` `--muted-foreground`, com `role="status"`.
4. Cabeçalho de colunas (só visual, `aria-hidden="true"`): "PACIENTE", "CELULAR", "CPF" e "WHATSAPP", em `--text-micro` `--weight-extrabold` `--tracking-caps` maiúsculo `--muted-foreground`, borda inferior `--line` `--border`. As células levam o rótulo em texto oculto ("Celular: ").
5. Linha: um link para a ficha numa grade `44px minmax(0, 1.4fr) minmax(0, .8fr) minmax(0, .8fr) 22px` com espaço `--space-14` e `padding: var(--space-10) 66px var(--space-10) var(--space-12)`, raio `--radius`, hover `--card-soft`. Iniciais `md`; nome em `--text-body` `--weight-bold` com reticências e, embaixo, "Centro · 34 anos" em `--text-small` `--muted-foreground`; celular e CPF em `--text-ui` `--muted-foreground` tabulares; `chevron-right` `--icon` `--muted-foreground`. Fora do link, à direita, o botão redondo de conversa: 44 × 44 px, raio `--radius-full`, fundo `--whatsapp-soft`, `message-circle` `--icon` em `--whatsapp`, `aria-label="WhatsApp de Helena Prado"`. Abaixo de 768 px, a grade fica `44px minmax(0, 1fr)` e celular, CPF e seta somem.
6. Paginação (6.11), 20 por página.

| Estado | O que aparece |
| --- | --- |
| Carregando | Esqueleto de 8 blocos de 60 px |
| Nenhum cadastro | `users`, "Nenhum paciente cadastrado", "Os pacientes cadastrados aparecem aqui, em ordem alfabética." e "Cadastrar o primeiro paciente" |
| Busca sem resultado | `search`, "Ninguém encontrado", "Confira a grafia ou busque pelo CPF ou telefone." e "Limpar a busca" (`secondary`) |
| Erro | Erro ao carregar (6.12) |

**Ficha:** link de volta "Pacientes", título com o nome, ação "Editar" (`secondary`, `pencil`). Um cartão de perfil (iniciais `xl`, nome em `--text-title`, "34 anos · Centro" em `--muted-foreground`, e à direita "Agendar consulta" `primary`, "WhatsApp" `whatsapp` e "Ligar" `secondary`; abaixo de 768 px os botões descem e dividem a largura). Embaixo, três cartões lado a lado (um por linha abaixo de 1100 px): Contato (celular, e-mail), Documento (CPF, nascimento com a idade), Endereço. Cada um com a lista de dados do 6.8. Carregando: esqueleto de 3 blocos de 140 px.

**Cadastro e edição:** página de formulário (`--page-form`), título "Novo paciente" ou "Editar paciente", link de volta. Cartões com título e ícone: "Quem é o paciente" (`user-round`: Nome completo na linha inteira, CPF, Data de nascimento opcional), "Como falar com ele(a)" (`message-circle`: Celular / WhatsApp opcional, E-mail opcional), "Endereço" (`map-pin`: campos do 6.2). Antes do primeiro cartão, uma linha em `--text-small` `--muted-foreground` diz para que os dados servem e onde está a política: "Usamos estes dados para agendar e lembrar as consultas. Veja a política de privacidade." com o link.

- **Rodapé fixo:** `position: sticky; bottom: 0` (abaixo de 1100 px, `bottom: calc(var(--tabbar) + env(safe-area-inset-bottom))`), `z-index: var(--z-footer)`, `padding: var(--space-14) 0`, fundo `linear-gradient(transparent, var(--background) 30%)`, botões à direita com espaço `--space-10`: "Cancelar" (`secondary`) e "Salvar paciente" (`lg`; "Salvar alterações" na edição). Abaixo de 768 px, os dois dividem a largura.
- **Erros:** ao salvar com campo inválido, alerta `warning` "Confira os campos destacados abaixo." no topo e cada erro no seu campo, com o foco no primeiro. CPF repetido: "Já existe um paciente com este CPF na clínica." no campo CPF. Falha do servidor: alerta `danger` "Não foi possível salvar" com a mensagem, mantendo tudo o que foi digitado.
- **Carregando** (edição): esqueleto de 3 blocos de 160 px. **Salvando:** botão de salvar em carregando.
- Sair com alterações não salvas pede confirmação (6.14): título "Descartar as alterações?", texto "Há alterações não salvas. Se sair agora, elas se perdem.", botões "Voltar" e "Sair sem salvar".

### 7.5 Painel do mês

Só para o perfil Responsável. Responde "como a clínica está indo no mês".

1. Cabeçalho "Painel de outubro", subtítulo "Como a clínica está indo no mês, até hoje" (mês passado: "Resultado de setembro de 2026"). Ação: "Mês anterior", o nome do mês (`--text-body` `--weight-bold`, largura mínima 150 px, `aria-live="polite"`) e "Próximo mês", desabilitado no mês corrente.
2. Chips por profissional.
3. Sem lançamentos no mês: alerta `info` "Ainda não há lançamentos neste mês" com a ação para lançar. Alertas que o servidor mandar entram aqui, um por linha, no tom que vier.
4. Quatro indicadores (6.15) numa grade de 4 colunas, espaço `--space-16` (2 colunas abaixo de 1280 px, espaço `--space-10` abaixo de 600 px): Entradas (`arrow-down-left`, tom `success`), Saídas (`arrow-up-right`, perigo), Saldo do mês (`wallet`, em destaque), Pacientes atendidos (`users`, `info`). Cada um com uma dica: "Ticket médio de R$ 210,00", "31% das entradas", "Sobrou 69% do que entrou", "Em 18 dias de atendimento".
5. Grade `minmax(0, 1fr) var(--side)` (1 coluna abaixo de 1280 px), espaço `--space-16`:
   - "Entradas e saídas por dia": duas barras por dia lançado, entrada em `--chart-in` à esquerda e saída em `--chart-out` à direita, largura máxima 16 px cada, raio 3 px, 3 px entre elas; altura do gráfico 270 px; eixo em reais à esquerda (`--text-micro` `--muted-foreground`) com linhas de grade `--chart-grid` e linha de base `--border-strong`; embaixo de cada par, o dia (`--text-caption` `--weight-bold`) e o dia da semana. Legenda no cabeçalho do cartão com o total de cada série. Cada dia recebe foco (`tabindex="0"`) e, com foco, hover ou toque, mostra um balão `data-surface="dark"` (fundo `--foreground`, raio `--radius-md`, `padding: var(--space-10) var(--space-12)`, largura mínima 210 px, `--text-caption`) com a data, entradas, saídas e o saldo do dia. Uma tabela `.sr-only` repete os números. Abaixo de 600 px, o gráfico rola na horizontal dentro do cartão. Legenda do gráfico: "Cada par de barras é um dia com lançamento. Passe o mouse ou toque num dia para ver os valores."
   - "Consultas do mês": anel de 170 px com traço de 24 px, uma fatia por situação na cor da barra dela (4.3) e o total no centro (`--text-display-sm` e "consultas"); ao lado, a lista com amostra de cor, rótulo e número; embaixo, "Concluídas 78% · Faltas 6% · Cancelamentos 9%".
6. Segunda grade igual: "Por profissional" (iniciais `md`, nome, barra de 8 px `--primary` sobre trilho `--muted` proporcional às entradas, valor à direita e "saldo R$ 4.180,00" embaixo) e "Produção do mês" (blocos `--card-soft`, raio `--radius`, número em `--text-title` `--weight-extrabold` e rótulo em `--text-caption`).

Carregando: esqueleto de 3 blocos de 150 px. Ao trocar de mês ou de profissional, o conteúdo anterior fica com opacidade 0,7 até chegar o novo. Erro: erro ao carregar no lugar do conteúdo.

### 7.6 Entrar

Duas colunas, `grid-template-columns: minmax(0, 1fr) minmax(0, 560px)`, fundo `--card`, altura mínima `100dvh`.

- **Ilustração**, à esquerda, `aria-hidden="true"`: bloco `--primary-soft` com `margin: var(--space-16) 0 var(--space-16) var(--space-16)`, raio 32 px, `padding: var(--space-56)`, conteúdo alinhado embaixo com espaço `--space-20`. Dois círculos decorativos: 420 px de `color-mix(in srgb, var(--primary) 8%, transparent)` saindo pelo canto superior direito e 180 px de `--accent-soft` no meio. Por cima: o nome da marca em `--text-title`, a frase "Olá! Que bom ter você aqui." em `--text-hero` e "Quem vem hoje e quem ainda não confirmou." em `--text-section` `--weight-regular` `--muted-foreground`, largura máxima 440 px.
- **Formulário**, à direita, centralizado na vertical, `padding: var(--space-56) clamp(24px, 5vw, 64px)`, espaço `--space-18`: marca (só o nome, em `--text-heading`); `h1` "Entrar"; "Use o usuário e a senha que a clínica criou para você." em `--muted-foreground`; campos Usuário (`user-round`, `autocomplete="username"`, foco inicial) e Senha (`lock-keyhole`, botão de mostrar e esconder com `eye` e `eye-off`); botão `lg` `block` "Entrar"; e a caixa de ajuda (fundo `--background`, raio `--radius-box`, `padding: var(--space-14)`, `life-buoy` `--primary`, `--text-ui` `--muted-foreground`): "Esqueceu a senha? Peça para o responsável da clínica criar uma nova para você."
- **Estados:** campos vazios mostram o erro no campo; usuário ou senha errados mostram alerta `danger` "Usuário ou senha incorretos. Confira e tente de novo." acima do formulário e limpam a senha; sessão encerrada mostra alerta `info` "Sua sessão terminou. Entre novamente para continuar."; enquanto confere, o botão fica em carregando. Depois de entrar, a pessoa volta para a tela que tentou abrir ou para Hoje.
- **Abaixo de 900 px:** só o formulário, `padding: var(--space-32) var(--space-20) var(--space-40)`, alinhado no topo.

### 7.7 Estados de acesso e textos

| Situação | Ícone | Título | Texto | Ação |
| --- | --- | --- | --- | --- |
| Sem acesso | `shield-alert` | Esta área é do responsável pela clínica | Seu perfil não tem acesso a esta tela. Se precisar dela, fale com o responsável. | Voltar para Hoje |
| Endereço inexistente | `map-pin-off` | Não encontramos esta página | O endereço pode ter mudado. Use o menu para chegar à tela que você procura. | Voltar para Hoje |
| Erro numa tela | `triangle-alert` | Algo deu errado nesta tela | Os dados salvos não foram afetados. Se continuar, avise o suporte. | Tentar de novo; Voltar para Hoje |
| Sessão encerrada | — | — | Volta para Entrar com o alerta do 7.6 | — |

Esses estados usam o bloco de estado vazio (6.12) dentro da casca, com o menu à vista, e um `h1` oculto com o título.

Textos: frases curtas, verbo no início do botão ("Agendar consulta", "Salvar paciente", "Marcar falta"), sem "registro", "vincular" nem códigos de erro na tela. Seta é ícone, nunca "←" ou "→" escrito. Datas por extenso no cabeçalho ("Quarta, 28 de outubro") e `dd/mm/aaaa` nos campos; horas em `HH:MM`; valores em reais com `R$` e vírgula.

## 8. Movimento

O movimento só mostra de onde algo veio. Nada pisca, nada se repete sozinho, exceto o carregando.

| O que | Duração | Curva | Movimento |
| --- | --- | --- | --- |
| Hover e troca de cor de botão | `--duration-fast` | padrão do navegador | `background-color`, `border-color`, `color` |
| Menu suspenso | `--duration-fast` | `ease-out` | opacidade de 0 a 1 |
| Véu e diálogo | `--duration-base` | `ease-out` | opacidade de 0 a 1; o diálogo também sobe 4% |
| Painel lateral (por cima da página) | `--duration-slow` | `ease-out` | desliza 24 px da direita |
| Folha inferior | `--duration-slow` | `ease-out` | sobe 40 px |
| Aviso | `--duration-slow` ao entrar, `--duration-fast` ao sair | `ease-out`, `ease-in` | sobe 16 px; sai só com opacidade |
| Botão flutuante com aviso na tela | `--duration-slow` | `ease-out` | `bottom`: sobe para ficar acima da pilha de avisos e desce quando ela some |
| Conteúdo do Painel ao trocar de mês | `--duration-slow` | padrão | opacidade 0,7 até chegar o dado novo |
| Carregando em botão e campo | `--duration-spin` | `linear` | giro contínuo |
| Esqueleto | `--duration-shimmer` | `ease-in-out` | brilho contínuo da direita para a esquerda |

Não animam: troca de tela, troca de visão e de período na agenda, a coluna de detalhe da Agenda abrindo e fechando (a grade muda de largura de uma vez), a linha "agora" (salta a cada 30 s), a mudança de cor de uma situação e a rolagem inicial da grade.

Com `prefers-reduced-motion: reduce`, a regra da base (seção 2) zera as durações e para as repetições: painel, folha, diálogo e aviso aparecem no lugar, o esqueleto fica parado e o ícone de carregando fica parado ao lado do texto. O tempo do aviso não muda.

## 9. Acessibilidade

Piso: WCAG 2.2 AA.

### 9.1 Contraste

Calculado pela fórmula de luminância relativa da WCAG a partir dos tokens da seção 2. Onde há transparência, a cor foi composta sobre o fundo indicado. Na hachura, a listra clara (`rgba(255, 255, 255, .55)`) foi composta sobre o fundo da situação, e o fundo sem listra também está na tabela. Texto de controle desabilitado não entra, como a WCAG permite.

| Par | Texto | Fundo | Razão | Texto normal (4,5) | Texto grande e UI (3,0) |
| --- | --- | --- | --- | --- | --- |
| Texto sobre página | `--foreground` #1B2529 | `--background` #F6F2EC | 14,01:1 | passa | passa |
| Texto sobre superfície | `--foreground` #1B2529 | `--card` #FFFFFF | 15,63:1 | passa | passa |
| Texto sobre superfície recuada | `--foreground` #1B2529 | `--card-soft` #FBF8F4 | 14,76:1 | passa | passa |
| Texto sobre hover neutro | `--foreground` #1B2529 | `--muted` #EEE8DF | 12,83:1 | passa | passa |
| Texto sobre seleção suave (linha selecionada, ilustração da entrada) | `--foreground` #1B2529 | `--primary-soft` #E1F0EC | 13,30:1 | passa | passa |
| Secundário sobre página (subtítulo, ajuda da entrada) | `--muted-foreground` #5B676C | `--background` #F6F2EC | 5,22:1 | passa | passa |
| Secundário sobre superfície (segunda linha, eixo, dica) | `--muted-foreground` #5B676C | `--card` #FFFFFF | 5,83:1 | passa | passa |
| Secundário sobre superfície recuada (rótulo de dado, "Sem consultas", dia de outro mês) | `--muted-foreground` #5B676C | `--card-soft` #FBF8F4 | 5,50:1 | passa | passa |
| Secundário sobre neutro (segmentado, campo desabilitado, selo neutro) | `--muted-foreground` #5B676C | `--muted` #EEE8DF | 4,78:1 | passa | passa |
| Secundário sobre seleção suave | `--muted-foreground` #5B676C | `--primary-soft` #E1F0EC | 4,96:1 | passa | passa |
| Texto de exemplo no campo | `--placeholder` #6B7579 | `--card` #FFFFFF | 4,72:1 | passa | passa |
| Primária sobre superfície (link, letra da lista, próxima etapa) | `--primary` #0D6E66 | `--card` #FFFFFF | 6,10:1 | passa | passa |
| Primária sobre página (link de volta) | `--primary` #0D6E66 | `--background` #F6F2EC | 5,47:1 | passa | passa |
| Primária sobre seleção suave (aba ativa, botão suave, selo, coluna de hoje) | `--primary` #0D6E66 | `--primary-soft` #E1F0EC | 5,19:1 | passa | passa |
| Primária no cartão fantasma (coluna de hoje) | `--primary` #0D6E66 | `--primary-soft` 85% sobre `--today-column` #E4F2EE | 5,28:1 | passa | passa |
| Botão primário, página atual, horário escolhido, dia de hoje | `--primary-foreground` #FFFFFF | `--primary` #0D6E66 | 6,10:1 | passa | passa |
| Botão primário em hover | `--primary-foreground` #FFFFFF | `--primary-hover` #0A5C55 | 7,85:1 | passa | passa |
| Secundário sobre primária (dia da semana de hoje, indicador em destaque) | `--on-primary-muted` #CDEBE6 | `--primary` #0D6E66 | 4,83:1 | passa | passa |
| Botão de conversa | `--on-dark` #FFFFFF | `--whatsapp` #187A43 | 5,37:1 | passa | passa |
| Botão de conversa em hover | `--on-dark` #FFFFFF | `--whatsapp-hover` #136437 | 7,22:1 | passa | passa |
| Perigo sobre superfície (botão de perigo, erro de campo, Sair) | `--destructive` #B23B3B | `--card` #FFFFFF | 5,86:1 | passa | passa |
| Perigo sobre perigo suave (hover, alerta, selo) | `--destructive` #B23B3B | `--destructive-soft` #FBE7E7 | 4,93:1 | passa | passa |
| "Agora" na lista | `--accent-text` #B9472A | `--card` #FFFFFF | 5,25:1 | passa | passa |
| Etiqueta da hora atual na grade | `--on-dark` #FFFFFF | `--accent-text` #B9472A | 5,25:1 | passa | passa |
| Claro sobre escuro (chip escolhido, aviso, cartão Próximo, balão) | `--on-dark` #FFFFFF | `--foreground` #1B2529 | 15,63:1 | passa | passa |
| Botão escuro em hover | `--on-dark` #FFFFFF | `--foreground-hover` #0F171A | 18,13:1 | passa | passa |
| Rótulo PRÓXIMO | `--on-dark-accent` #8EE3D6 | `--foreground` #1B2529 | 10,50:1 | passa | passa |
| Secundário sobre escuro (contagem do chip escolhido, aviso, balão) | `--on-dark-muted` #C9D2D5 | `--foreground` #1B2529 | 10,17:1 | passa | passa |
| Desfazer | `--on-dark-accent` #8EE3D6 | `--on-dark-fill` sobre `--foreground` #363F43 | 7,22:1 | passa | passa |
| WhatsApp no cartão Próximo | `--on-dark` #FFFFFF | `--on-dark-fill` sobre `--foreground` #363F43 | 10,74:1 | passa | passa |
| Iniciar atendimento no cartão Próximo | `--foreground` #1B2529 | `--on-dark-accent` #8EE3D6 | 10,50:1 | passa | passa |
| Selo e alerta de sucesso | `--success` #1D7A45 | `--success-soft` #E2F3E8 | 4,64:1 | passa | passa |
| Selo e alerta de aviso | `--warning` #7A5000 | `--warning-soft` #FFF1D2 | 6,30:1 | passa | passa |
| Selo e alerta de informação | `--info` #2F5E9E | `--info-soft` #E5EDF8 | 5,53:1 | passa | passa |
| Pílula Agendado, lembrete de confirmação, hora no cartão Agendado | `--status-agendado-fg` #7A5000 | `--status-agendado-bg` #FFFFFF | 7,05:1 | passa | passa |
| Pílula Confirmado, hora no cartão | `--status-confirmado-fg` #17663B | `--status-confirmado-bg` #DCF3E5 | 5,99:1 | passa | passa |
| Pílula e cartão Em atendimento | `--status-atendimento-fg` #FFFFFF | `--status-atendimento-bg` #5B45C2 | 6,82:1 | passa | passa |
| Pílula Concluído, hora e nome no cartão | `--status-concluido-fg` #4A5559 | `--status-concluido-bg` #ECEEEF | 6,59:1 | passa | passa |
| Pílula Cancelado, hora no cartão | `--status-cancelado-fg` #A12F2F | `--status-cancelado-bg` #FBE7E7 | 5,96:1 | passa | passa |
| Pílula Cancelado, hora no cartão (listra) | `--status-cancelado-fg` #A12F2F | `--status-cancelado-bg` + listra da `--hatch` #FDF4F4 | 6,56:1 | passa | passa |
| Pílula Faltou, hora no cartão | `--status-faltou-fg` #934010 | `--status-faltou-bg` #FCEBDD | 6,05:1 | passa | passa |
| Pílula Faltou, hora no cartão (listra) | `--status-faltou-fg` #934010 | `--status-faltou-bg` + listra da `--hatch` #FEF6F0 | 6,58:1 | passa | passa |
| Nome no cartão Agendado | `--foreground` #1B2529 | `--status-agendado-bg` #FFFFFF | 15,63:1 | passa | passa |
| Detalhe no cartão Agendado | `--muted-foreground` #5B676C | `--status-agendado-bg` #FFFFFF | 5,83:1 | passa | passa |
| Nome no cartão Confirmado | `--foreground` #1B2529 | `--status-confirmado-bg` #DCF3E5 | 13,39:1 | passa | passa |
| Detalhe no cartão Confirmado | `--muted-foreground` #5B676C | `--status-confirmado-bg` #DCF3E5 | 4,99:1 | passa | passa |
| Detalhe no cartão Em atendimento | `--status-atendimento-muted` #E4DEFB | `--status-atendimento-bg` #5B45C2 | 5,24:1 | passa | passa |
| Detalhe no cartão Concluído | `--muted-foreground` #5B676C | `--status-concluido-bg` #ECEEEF | 5,00:1 | passa | passa |
| Nome e detalhe no cartão Cancelado | `--muted-foreground` #5B676C | `--status-cancelado-bg` #FBE7E7 | 4,91:1 | passa | passa |
| Nome e detalhe no cartão Cancelado (listra) | `--muted-foreground` #5B676C | `--status-cancelado-bg` + listra da `--hatch` #FDF4F4 | 5,40:1 | passa | passa |
| Nome no cartão Faltou | `--foreground` #1B2529 | `--status-faltou-bg` #FCEBDD | 13,44:1 | passa | passa |
| Nome no cartão Faltou (listra) | `--foreground` #1B2529 | `--status-faltou-bg` + listra da `--hatch` #FEF6F0 | 14,61:1 | passa | passa |
| Detalhe no cartão Faltou | `--muted-foreground` #5B676C | `--status-faltou-bg` #FCEBDD | 5,01:1 | passa | passa |
| Detalhe no cartão Faltou (listra) | `--muted-foreground` #5B676C | `--status-faltou-bg` + listra da `--hatch` #FEF6F0 | 5,45:1 | passa | passa |
| Iniciais, tom 0 | `--avatar-1-fg` #8E3A19 | `--avatar-1-bg` #FCE3D6 | 6,17:1 | passa | passa |
| Iniciais, tom 1 | `--avatar-2-fg` #1D6B45 | `--avatar-2-bg` #DDF0E6 | 5,45:1 | passa | passa |
| Iniciais, tom 2 | `--avatar-3-fg` #3446A3 | `--avatar-3-bg` #E3E8FB | 6,74:1 | passa | passa |
| Iniciais, tom 3 | `--avatar-4-fg` #8E2F6B | `--avatar-4-bg` #F7E3EF | 6,20:1 | passa | passa |
| Iniciais, tom 4 | `--avatar-5-fg` #6E4B00 | `--avatar-5-bg` #FFEFC4 | 6,89:1 | passa | passa |
| Iniciais, tom 5 | `--avatar-6-fg` #245D7E | `--avatar-6-bg` #DDEDF6 | 5,95:1 | passa | passa |

Não texto (piso 3:1): contornos de controle, foco, linhas e ícones que carregam informação.

| Elemento | Cor | Fundo | Razão | Passa 3,0 |
| --- | --- | --- | --- | --- |
| Borda de campo sobre superfície | `--input` #8F8577 | `--card` #FFFFFF | 3,62:1 | passa |
| Borda de campo sobre página | `--input` #8F8577 | `--background` #F6F2EC | 3,25:1 | passa |
| Borda de campo sobre superfície recuada | `--input` #8F8577 | `--card-soft` #FBF8F4 | 3,42:1 | passa |
| Foco sobre página | `--ring` #0D6E66 | `--background` #F6F2EC | 5,47:1 | passa |
| Foco sobre superfície | `--ring` #0D6E66 | `--card` #FFFFFF | 6,10:1 | passa |
| Foco sobre superfície recuada | `--ring` #0D6E66 | `--card-soft` #FBF8F4 | 5,76:1 | passa |
| Foco sobre neutro (segmentado) | `--ring` #0D6E66 | `--muted` #EEE8DF | 5,01:1 | passa |
| Foco sobre seleção suave | `--ring` #0D6E66 | `--primary-soft` #E1F0EC | 5,19:1 | passa |
| Foco sobre coluna de hoje | `--ring` #0D6E66 | `--today-column` #F5FAF8 | 5,78:1 | passa |
| Foco em superfície escura | `--ring-on-dark` #8EE3D6 | `--foreground` #1B2529 | 10,50:1 | passa |
| Borda de campo em foco | `--primary` #0D6E66 | `--card` #FFFFFF | 6,10:1 | passa |
| Borda de campo com erro | `--destructive` #B23B3B | `--card` #FFFFFF | 5,86:1 | passa |
| Linha "agora" na coluna de hoje | `--accent` #E8613C | `--today-column` #F5FAF8 | 3,20:1 | passa |
| Ponto "agora" sobre superfície | `--accent` #E8613C | `--card` #FFFFFF | 3,38:1 | passa |
| Barra de entrada no gráfico | `--chart-in` #2E9D67 | `--card` #FFFFFF | 3,42:1 | passa |
| Barra de saída no gráfico | `--chart-out` #E0603C | `--card` #FFFFFF | 3,55:1 | passa |
| Ícone de conversa na lista de pacientes | `--whatsapp` #187A43 | `--whatsapp-soft` #E3F4EA | 4,71:1 | passa |
| Ícone de erro no aviso | `--on-dark-danger` #FFB4A6 | `--foreground` #1B2529 | 9,18:1 | passa |
| Barra Confirmado (apoio) | `--status-confirmado-bar` #1F8A4C | `--status-confirmado-bg` #DCF3E5 | 3,75:1 | passa |
| Contorno Agendado (apoio) | `--status-agendado-bar` #D9940E | `--status-agendado-bg` #FFFFFF | 2,56:1 | reprova |
| Barra Concluído (apoio) | `--status-concluido-bar` #A3ACB0 | `--status-concluido-bg` #ECEEEF | 1,98:1 | reprova |
| Barra Cancelado (apoio) | `--status-cancelado-bar` #D16464 | `--status-cancelado-bg` #FBE7E7 | 3,09:1 | passa |
| Barra Faltou (apoio) | `--status-faltou-bar` #E07B3F | `--status-faltou-bg` #FCEBDD | 2,55:1 | reprova |

As linhas marcadas "apoio" reforçam a situação, que já tem ícone, rótulo escrito e nome acessível; não são o único sinal. As fatias do anel do Painel usam as mesmas cores e têm ao lado a lista com rótulo e número.

### 9.2 Regras

- **Foco:** contorno de 3 px em `--ring` com 2 px de afastamento em tudo que recebe foco pelo teclado; dentro de `[data-surface="dark"]`, em `--ring-on-dark`. Campo usa borda `--primary` e halo (6.2). Cartão da grade usa 1 px de afastamento. O `h1` recebe foco programático a cada navegação (`tabindex="-1"`, `data-autofocus`), sem contorno.
- **Foco à vista:** nada que recebe foco fica escondido atrás da barra superior, da barra de abas, do rodapé fixo ou do botão flutuante: `html { scroll-padding-top: calc(var(--topbar) + var(--space-16)); }` e, abaixo de 1100 px, `scroll-padding-top: calc(var(--topbar-mobile) + var(--space-16)); scroll-padding-bottom: calc(var(--tabbar) + var(--fab) + var(--space-32));`.
- **Alvos:** a regra do início da seção 6.
- **Teclado na casca:** o primeiro Tab mostra "Ir para o conteúdo", que leva o foco para a área principal (`<main id="conteudo" tabindex="-1">`). Depois vêm marca, abas e conta; no celular, o conteúdo vem antes da barra de abas. A área de avisos é alcançada pela tecla F8 e o aviso não some enquanto tem foco.
- **Teclado na lista e na agenda:** cada consulta da lista é um botão; Enter ou Espaço abre o detalhe. Na grade (`role="region"` com `aria-label="Agenda: 26 de outubro a 1 de novembro"`), os cartões são botões na ordem das colunas e, dentro de cada coluna, por horário; Enter abre o detalhe (coluna ou painel) e Esc fecha e devolve o foco ao cartão. Agendar num horário livre, pelo teclado, é pelo botão "Agendar consulta", e um texto oculto antes da grade diz isso. Chips, segmentado e dias do mês são botões com `aria-pressed` ou nome acessível.
- **Teclado no combobox:** seta para baixo abre a lista e desce; seta para cima sobe; Enter escolhe a opção ativa; Esc fecha e mantém a escolha anterior; Tab sai sem escolher. O campo tem `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-autocomplete="list"` e `aria-activedescendant`; a lista, `role="listbox"` com `aria-label="Sugestões"`; cada opção, `role="option"` com `aria-selected="true"` na ativa. "Nenhum resultado" tem `role="status"`.
- **Diálogos:** o diálogo de confirmação prende o foco, abre em "Voltar" e fecha com Esc. Painel, folha e a coluna de detalhe da Agenda recebem o foco ao abrir, fecham com Esc e devolvem o foco a quem os abriu.
- **Leitura assistiva:** as iniciais são `aria-hidden="true"` porque o nome está escrito ao lado; a pílula compacta tem o rótulo em texto oculto; o cartão da grade tem o nome acessível completo (7.2); o cabeçalho de colunas das listas é visual e cada célula leva o rótulo oculto; contagens que mudam com a busca usam `role="status"`; alerta de perigo usa `role="alert"`; a etapa atual tem `aria-current="step"` e a próxima, o texto oculto "(próximo passo)"; o gráfico tem uma tabela oculta com os mesmos números.
- **Cor nunca é o único sinal:**

| O que | Além da cor |
| --- | --- |
| Situação da consulta | Ícone, rótulo escrito (ou oculto, na pílula compacta) e forma: tracejado, cheio, hachurado, nome riscado |
| Agora | A palavra "Agora" na lista; a hora escrita na grade |
| Erro de campo | Borda de 2 px, ícone e mensagem escrita |
| Linha selecionada | Barra interna de 3 px à esquerda e `aria-pressed` |
| Aba ativa e dia de hoje | Fundo preenchido, `aria-current` e, na grade, "Hoje ·" escrito |
| Chip escolhido | Fundo escuro inteiro e `aria-pressed` |
| Entrada e saída no gráfico | Posição fixa (entrada à esquerda), legenda escrita e valores no balão |

- **Reflow e zoom:** em 320 px de largura e em zoom de 200%, nenhuma tela rola na horizontal. A exceção é o gráfico do Painel, que rola dentro do próprio cartão.
- **Dados pessoais:** formulário que coleta dado pessoal diz para que serve e onde está a política (7.4). Busca, CPF e telefone nunca vão para o endereço da página; o endereço guarda só identificadores, data, visão e página. Exemplos e capturas usam dados fictícios.
- **Movimento:** seção 8.

## 10. Checklist de aceite

**Tokens e base**

- [ ] O CSS do projeto declara todos os tokens da seção 2 com os mesmos nomes e valores, e nenhuma cor, tamanho de fonte ou raio fora deles aparece nas folhas de estilo, salvo as medidas próprias de componente das seções 6 e 7.
- [ ] A Figtree carrega com os pesos 400, 500, 600, 700 e 800; nenhum texto usa outra família.
- [ ] Nenhum texto que a pessoa precisa ler, fora as iniciais, tem menos de 12 px; valor de campo e texto corrido têm 16 px no celular.
- [ ] Todo tamanho de fonte está em `rem`, e o `body` não tem `min-width`.
- [ ] A marca é só o nome, sem iniciais dentro de quadrado ou círculo colorido.
- [ ] Em 320 × 256 nada fixo cobre a janela e nada rola na horizontal (5.1, “Altura até 480 px”).

**Casca**

- [ ] Em 1440 × 900 a barra superior tem 68 px, as abas mostram só as áreas do perfil e a ativa tem fundo `--primary-soft`.
- [ ] Em 375 × 812 há barra de abas embaixo com Hoje, Agenda, Pacientes e Mais, e Mais abre a folha com as demais áreas e "Sair da conta".
- [ ] Entrando como Recepção, Painel e áreas financeiras não aparecem no menu, e abrir o endereço do Painel mostra "Esta área é do responsável pela clínica".
- [ ] O primeiro Tab de qualquer tela mostra "Ir para o conteúdo".

**Hoje e detalhe**

- [ ] A lista mostra horário e duração à esquerda, iniciais coloridas, nome em negrito, "Procedimento · Profissional" e a situação à direita, agrupada em Manhã, Tarde e Noite.
- [ ] O mesmo nome tem a mesma cor de iniciais em todas as telas.
- [ ] A linha "Agora" aparece entre a última consulta já iniciada e a primeira ainda por começar.
- [ ] Em 1440 px o detalhe fica ao lado e abre com o próximo paciente; em 375 px tocar na consulta abre a folha inferior com alça.
- [ ] Em 1440 × 900, sem rolar a página, o detalhe mostra o nome, WhatsApp, Ligar, Ficha, as etapas e a ação seguinte no rodapé; numa janela mais baixa, só o corpo rola e o rodapé continua à vista.
- [ ] O detalhe tem WhatsApp, Ligar e Ficha; o WhatsApp abre `wa.me` com o lembrete pronto e não envia nada sozinho.
- [ ] Confirmar mostra o aviso "Consulta de <nome> confirmada" com "Desfazer", e Desfazer volta a situação para Agendado.
- [ ] Cancelar e Faltou pedem confirmação, abrem o diálogo com o foco em "Voltar" e não oferecem Desfazer.

**Agenda**

- [ ] Em 1440 px a visão padrão é Semana, com horas no eixo vertical, 7 dias no horizontal e 80 px por hora.
- [ ] Um cartão de 30 minutos tem 37 px de altura, com hora e nome na mesma linha (`.one-line`), e um de 1 hora, 77 px, com duas linhas.
- [ ] Três consultas simultâneas no mesmo dia ficam lado a lado, cada uma com um terço da largura menos 6 px, e todas mantêm o ícone da situação; com 3 faixas ou mais o cartão mostra só o ícone e as iniciais do paciente (só o ícone se a largura interna for menor que 38 px).
- [ ] Cada uma das seis situações aparece com a forma do 4.3: Agendado tracejado sem barra, Em atendimento roxo cheio, Cancelado e Faltou hachurados, Cancelado com o nome riscado.
- [ ] Com hoje na tela, a linha "agora" atravessa a grade, é mais forte na coluna de hoje e a hora aparece no eixo.
- [ ] Clicar num horário livre futuro abre o agendamento com dia, hora e profissional preenchidos; num horário passado, nada acontece.
- [ ] Abaixo de 900 px as visões são Dia, 3 dias e Mês, e a padrão é Dia.
- [ ] Escolher um profissional nos chips mostra só as consultas dele e os cartões ocupam a largura do dia.
- [ ] Recarregar a página mantém visão, data, profissional e consulta aberta.
- [ ] A partir de 1280 px, abrir uma consulta põe o detalhe numa coluna ao lado e a grade encolhe: nenhuma coluna da grade, a legenda, as ações do cabeçalho nem o menu da conta ficam cobertos. Abaixo de 1280 px o detalhe abre por cima, com véu e botão fechar.
- [ ] A grade tem a altura que sobra da janela (sem número fixo): em 1440 × 900 a página da Agenda não rola e só o corpo da grade rola.

**Pacientes e formulários**

- [ ] A busca encontra "José" digitando "jose" e mostra "N pacientes encontrados".
- [ ] A lista tem cabeçalho de colunas Paciente, Celular, CPF e WhatsApp a partir de 768 px e mostra 20 por página com "Mostrando 21–40 de N".
- [ ] Voltar da ficha para a lista devolve à mesma página.
- [ ] O cadastro de paciente diz para que servem os dados e tem link para a política.
- [ ] Salvar com CPF repetido mostra o erro no campo CPF, com borda de 2 px, ícone e texto, e mantém o que foi digitado.
- [ ] O rodapé com Cancelar e Salvar fica visível ao rolar e, em 375 px, acima da barra de abas.

**Estados**

- [ ] Hoje, Agenda, Pacientes, ficha e Painel mostram esqueleto ao carregar, estado vazio com uma ação e erro com "Tentar de novo".
- [ ] O botão flutuante não cobre a paginação nem o último item em 375 × 812.

**Acessibilidade**

- [ ] Todos os pares da tabela 9.1 conferem com os valores aplicados no navegador.
- [ ] O axe não aponta violação de nível A ou AA em Hoje, Agenda, Pacientes, cadastro de paciente, Painel e Entrar.
- [ ] Tab percorre todos os controles de cada tela com o contorno visível, inclusive dentro do cartão "Próximo" e do aviso, onde o contorno é `--ring-on-dark`.
- [ ] No combobox de procedimento, setas, Enter e Esc funcionam como na seção 9.2, sem mouse.
- [ ] Em 320 × 568 e em zoom de 200%, nenhuma tela rola na horizontal, exceto o gráfico dentro do cartão.
- [ ] Com movimento reduzido ativado no sistema, painel, folha, diálogo e aviso aparecem sem deslizar e o esqueleto fica parado.
- [ ] Nenhuma situação, erro ou seleção é indicada só por cor (conferir a tabela da seção 9.2 tela a tela).
