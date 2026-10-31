# Changelog — Sistema de clínica no estilo conversa

## 2.0.0 — 2026-10-30

Correções de `docs/pendencias.md`, medidas com `scripts/verificar.mjs` nos três exemplos. Nenhuma cor mudou, então a tabela de contraste da seção 9 continua a mesma. O PRD segue em rascunho.

### Corrigido

- Tamanhos de fonte (seção 2, tokens): `--text-hero: clamp(36px, 4vw, 54px)` → `clamp(2.25rem, 4vw, 3.375rem)`; `--text-display: 34px` → `2.125rem`; `--text-display-sm: 28px` → `1.75rem`; `--text-title: 22px` → `1.375rem`; `--text-heading: 20px` → `1.25rem`; `--text-section: 18px` → `1.125rem`; `--text-lead: 17px` → `1.0625rem`; `--text-body: 16px` → `1rem`; `--text-ui: 15px` → `0.9375rem`; `--text-small: 14px` → `0.875rem`; `--text-caption: 13px` → `0.8125rem`; `--text-micro: 12px` → `0.75rem`. O valor com a letra no tamanho padrão é o mesmo; muda que o tamanho de letra escolhido no navegador passa a valer. Regra nova na seção 3 e item no checklist.
- `body { min-width: 320px }` (seção 2) → sem `min-width`. Em 320 px com a barra de rolagem de 15 px, o conteúdo ficava 15 px mais largo que a janela e a página rolava na horizontal. Seção 5.1: o conteúdo quebra, não rola.
- Marca (tabela de personalização, 5.3 e tela Entrar): a sigla “VS” num quadrado de `--primary` com raio `--radius-md` e o símbolo de 34, 36 e 88 px saem. A marca é só o nome em duas palavras, com versão positiva sobre `--card` e negativa sobre `--foreground`; a sigla fica só no ícone da aba, sem forma atrás. Contraria a regra do dono do kit sobre logo em quadradinho (G17, 28/10/2026).
- Detalhe da consulta, linha Procedimento: ícone `sparkles` → `clipboard-list`. O `sparkles` virou o símbolo de produto feito por IA.
- Tela Entrar: “A agenda, os pacientes e o dia da clínica em um só lugar.” → “Quem vem hoje e quem ainda não confirmou.”. A frase antiga é de anúncio, não de quem trabalha numa clínica.
- Seção 5.1: nova linha “Altura até 480 px”: tudo o que é fixo rola junto (barra superior, barra de abas, botão flutuante, aviso, rodapé de formulário, barra de resumo, coluna de detalhe). Antes não havia regra: em 320 × 256 as barras cobriam 53% da janela em hoje.html e agenda-semana.html e 88% em hoje-celular.html. Tamanho de conferência 320 × 256 acrescentado.
- `exemplos/hoje.html`, `hoje-celular.html` e `agenda-semana.html` refeitos: fontes em `rem`, sem `min-width`, marca sem quadrado, ícone do assunto, regra de altura baixa, e o link da marca com 44 px de altura (sem o quadrado ele tinha 20 px). `agenda-semana.html`, que era só de computador, ganha a versão responsiva do PRD: abaixo de 900 px a semana vira 3 dias (terça, quarta e quinta) e os cartões, que tinham 18 px de largura em 375 px, ficam acima de 24 px. Antes, os três falhavam em 320 × 256 (camadas fixas, rolagem horizontal de 15 px) e o `agenda-semana.html` também em 375 px (44 alvos abaixo de 24 px).
- `exemplos/hoje.png`, `hoje-celular.png`, `agenda-semana.png` e `capa.png` refeitos.

### Decisões para o autor revisar

- A mudança é MAIOR (valor de token e regra), mas o PRD é rascunho e continua sem auditoria. A auditoria de `rascunho` para `estavel` segue pendente.
- `clipboard-list` foi a escolha do agente para o ícone do procedimento; vale confirmar com quem conhece o setor (a odontologia não tem um ícone óbvio na biblioteca de ícones usada).
- Os avisos que o verificador ainda dá (alvo de 40 px no toque nos chips de profissional, ação principal repetida na primeira dobra de `hoje.html`, 192 palavras na dobra de `agenda-semana.html`, conteúdo colado à esquerda em `hoje-celular.html` no computador) não faziam parte da lista e ficaram como estavam.

## 1.0.0 — 2026-10-29
Primeira versão, extraída da identidade "direção A · Conversa" do frontend do Dental Flow (aprovada em 28/10/2026).

### Adicionado

- Documento completo: escopo, uso, princípios, tokens (cor, tipografia, espaço, forma, tamanho, sombra, movimento e casca num bloco só), tipografia, papel de cada cor, iniciais coloridas, as seis situações da consulta, layout, 15 componentes, sete telas (Hoje, Agenda, Agendar consulta, Pacientes, Painel, Entrar, estados de acesso), movimento, acessibilidade e checklist de aceite.
- Fontes usadas: estudo de identidade (seções 1, 3, 5 "A · Conversa" e "Decisão", 6, 13 e 14), `frontend/README.md`, `AGENTS.md`, `src/style/*.css`, `src/component/ui/*`, `src/component/appointment_status.js`, `src/app/*` e as telas Hoje, Agenda, Pacientes, Painel e Entrar. Onde estudo e código divergem, vale o código (lista abaixo).
- Tabela de contraste com 60 pares de texto e 23 de não texto, gerada por script (luminância relativa da WCAG, com alfa e hachura compostos) a partir do próprio bloco de tokens do PRD.
- Clínica fictícia "Odonto Vila Serena" nos exemplos. Perfis renomeados de forma neutra: Responsável (no código, `DENTISTA`) e Recepção; "dentista" virou "profissional".

### Ajustado depois dos exemplos

Achados ao montar as telas de exemplo seguindo o documento à risca. A versão continua 1.0.0, ainda não publicada.

1. **Cartão da grade em linha única (7.2).** O limite de `.one-line` era 34 px, mas o cartão de 30 minutos tem 37 px e as duas linhas pedem 14,64 + 1 + 15,86 + 8 de padding + 3 de borda tracejada = 42,5 px (o nome saía cortado em 4,5 px). Agora: abaixo de 43 px. A receita ganhou `.slot.one-line .time` e `.slot.one-line .name` (sem eles o nome não cortava com reticências).
2. **Cartão com 3 faixas ou mais (7.2).** Antes: primeiro nome cortado ("Hele…") em 38 px internos. Agora: só o ícone e as iniciais do paciente (classe `.packed`); com menos de 38 px de largura interna, só o ícone. A hora passou a depender da largura interna do cartão (container query: início e fim a partir de 86 px, só o início a partir de 50 px; em linha única, 150 e 114 px), porque as faixas deixaram de ser a única medida da largura (item 12). Em duas faixas e linha única a hora sai (sobravam 18 px para o nome).
3. **Pílula compacta: 1100 ou 600 px? (4.3, 5.1, 6.5).** O 6.5 dizia 1100 px e a tabela 5.1 dizia "lista do dia compacta" a 600 px. Conferido no código do Dental Flow (`today_view.jsx` e `use_today_view_model.js`): `wide = useMediaQuery('(min-width: 1100px)')` e `<StatusPill compact={!vm.wide}/>`, ou seja, a pílula é compacta abaixo de 1100 px; os 600 px do código (`agenda.module.css`, `@media (max-width: 599px)`) só mudam a grade da linha (colunas 50 e 40 px, espaço 10, padding 9 8; o PRD usa 44 no lugar de 40, como já registrado). O PRD agora diz isso nas duas linhas da tabela 5.1 (1100: pílula compacta; 600: colunas da linha) e no 4.3.
4. **Dobra da tela Hoje (7.1, 6.8).** A grade de lista e detalhe vinha depois do cabeçalho, da faixa de dias, dos chips e do lembrete (≈375 px); a 1440 × 900 a ação principal do detalhe ficava em y ≈ 945–1000, abaixo da dobra, e as etapas eram cortadas. Agora a tela é uma grade de duas colunas desde o alto do conteúdo (`.today`: coluna `.today-main` com os itens 1 a 5 e a lista; detalhe `.detail-column.today-detail`, `sticky` em `top: calc(var(--topbar) + var(--space-20))`, `max-height: calc(100dvh - var(--topbar) - var(--space-40))`). O detalhe ganhou rodapé (`.detail-foot`, `border-top`) com a ação seguinte, fora da rolagem; as ações secundárias passaram a ser o item 5 do corpo e a ação principal o item 6. Receita da coluna em 6.8, da grade em 7.1; item novo no checklist.
5. **Botão flutuante × aviso (6.9, 6.10).** O botão (`bottom: tabbar + --space-18`) e a área de avisos (`bottom: tabbar + --space-16`) ocupavam a mesma faixa, e o aviso (`--z-toast` 60) cobria o botão (`--z-fab` 25). Agora, com aviso na tela, o botão sobe para `tabbar + --space-16 + altura da pilha + --space-10`, com `transition: bottom var(--duration-slow) ease-out`; a pilha é medida por um `ResizeObserver` que escreve `--toast-stack` e `data-toast` no `<html>`. A ordem de camadas ficou escrita no 6.9.
6. **Aviso a 375 px (6.10).** Em uma linha só (ícone 34 + texto + "Desfazer" 85 + "Fechar" 38 + espaços) o texto ficava com 126 px e "Consulta de Helena confirmada" quebrava em três linhas (aviso de 91,5 px). Agora, abaixo de 600 px, o aviso tem duas linhas: ícone e texto em cima, "Desfazer" e "Fechar" embaixo, à direita; "Fechar" continua.
7. **Cartão "Próximo" abaixo de 600 px (6.6).** "Iniciar atendimento" (144 px) e "WhatsApp" (106 px) com `padding: 0 --space-18` pedem ≈330 px e o cartão tem 313 px a 375 px; o contêiner das ações estourava o cartão (sem `min-width: 0`). Agora: `padding: 0 var(--space-12)`, contêiner com `min-width: 0` e botões com `flex: 1 1 auto`. A decisão da revisão era `flex: 1`; mantive a divisão da sobra por igual, mas a partir do tamanho do conteúdo (`1 1 auto`), porque `flex: 1` (base zero) deixa o botão de iniciar 15 px menor que o texto a 375 px. Receita escrita no 6.6.
8. **Cores fora dos tokens (2, 4.1, 4.2, 7.2, 9.1).** As 12 cores das iniciais (hex na tabela do 4.2) e o `rgba(255, 255, 255, .9)` da borda do `.slot` estavam escritos fora do bloco da seção 2, contra "cada medida compartilhada está declarada uma vez neste bloco". Agora são `--avatar-1-bg` … `--avatar-6-bg`, `--avatar-1-fg` … `--avatar-6-fg` (o tom 0 usa o par 1) e `--slot-edge`, no bloco de tokens; a tabela do 4.2 mostra o token de cada tom e traz a receita `.avatar[data-tone]`; o 7.2 usa `var(--slot-edge)`; o 4.1 ganhou a linha das iniciais e o `--slot-edge`; os seis pares das iniciais na tabela 9.1 passaram a citar os tokens. Razões recalculadas por script (`avatar.mjs`, fórmula de luminância relativa da WCAG): 6,17, 5,45, 6,74, 6,20, 6,89 e 5,95, iguais às da tabela.
9. **Data do texto do WhatsApp (6.8).** O exemplo dizia "no dia 30/10/2026 às 10:00" ao lado de "Hoje, 10:00 às 10:30" e de "Quarta, 28 de outubro" (7.1); 30/10/2026 é sexta. Agora: "no dia 28/10/2026 às 10:00".
10. **Chips da tela Hoje (7.1).** "Todos 14", "Dra. Lia 6" e "Dr. Caio 5" somavam 11, não 14. Agora o exemplo traz "Dra. Bianca 3" (6 + 5 + 3 = 14) e diz que "Todos" é a soma dos demais.
11. **Altura da grade (7.2).** Antes: `.grid-body { max-height: max(420px, calc(100dvh - 330px)) }` (e `max(380px, calc(100dvh - 360px - var(--tabbar)))` abaixo de 900 px), com o 330 supondo a grade a 330 px do alto; com chips e cartão "Próximo" ela começa a ≈362 px e o corpo terminava ≈100 px abaixo da janela a 900 px de altura. Agora: `.agenda-main` é uma coluna flex com `height: calc(100dvh - var(--topbar))` (`--topbar-mobile` abaixo de 1100 px), a grade tem `flex: 1 1 auto; min-height: 0` e `.grid-body` tem `flex: 1 1 auto; min-height: calc(var(--hour) * 3); overflow-y: auto`. Receita no 7.2.
12. **Painel lateral da Agenda (6.8, 7.2, 4.1, 5.1, 8).** O painel era `position: fixed` sem reservar espaço e cobria, a 1440 px, as colunas de sexta a domingo, a legenda, as ações do cabeçalho (segmentado e "Agendar consulta"), as ações do cartão "Próximo" e o menu da conta, apesar de o estudo pedir que "a grade continua visível". Agora: a partir de 1280 px o detalhe da consulta é uma coluna própria (`.agenda-main[data-panel]`, segunda coluna de `var(--overlay-width)`, `.detail-column`) e a grade encolhe ao lado; abaixo de 1280 px abre como painel (900 a 1279 px) ou folha (abaixo de 900 px), por cima, com véu `--overlay` e botão fechar. Consequências escritas: sem animação na coluna (seção 8), `--overlay` também atrás do painel (4.1), linha da tabela 5.1 a 1280 px, foco e Esc na coluna (9.2) e dois itens de checklist. O código do Dental Flow difere nos dois pontos (ver "Divergências entre o estudo e o código").

### Decisões para o autor revisar

**Contraste: pares do código que reprovam e a correção adotada no PRD.** Calculado com a fórmula de luminância relativa da WCAG; hachura e alfa compostos sobre o fundo.

- Borda de campo `--input` `#CFC6B9`: 1,68:1 sobre `#FFFFFF` e 1,51:1 sobre `#F6F2EC`, abaixo de 3:1 para limite de controle → `#8F8577` (3,62:1 e 3,25:1). O valor antigo continua como `--border-strong`, só em decoração (hover de botão secundário, alça da folha, linha de base do gráfico, risco do nome cancelado).
- Texto de exemplo `#8A9397` sobre `#FFFFFF`: 3,13:1 → `--placeholder` `#6B7579` (4,72:1).
- "Sem consultas" na coluna vazia, `#8F979A` sobre `#FBF8F4`: 2,80:1 → `--muted-foreground` (5,50:1).
- Dia de outro mês, `#A0A8AB` sobre `#FBF8F4`: 2,28:1 → `--muted-foreground` (5,50:1), com peso 400 contra 700 do mês corrente.
- Eixo do gráfico `#6E797D` sobre `#FFFFFF`: 4,47:1 → `--muted-foreground` (5,83:1).
- Seta da lista de pacientes `#A3A9A5` sobre `#FFFFFF`: 2,39:1 → `--muted-foreground`.
- Cartões de dia passado com `opacity: .72`: o texto composto cai para 2,82:1 a 3,71:1 (por exemplo, detalhe do Concluído `#899295` sobre `#F1F3F3`, 2,86:1; nome do Em atendimento `#FFFFFF` sobre `#8979D3`, 3,65:1) → cartão sem opacidade; o dia passado fica marcado pelo título da coluna em `--muted-foreground` e pelo fundo da coluna em `--card-soft`.
- Anel de foco `#0D6E66` sobre superfície escura `#1B2529` (cartão "Próximo", aviso): 2,56:1 → `--ring-on-dark` `#8EE3D6` (10,50:1) dentro de `[data-surface="dark"]`.
- Contorno do Agendado (2,56:1), barra do Concluído (1,98:1) e barra do Faltou (2,55:1) ficam abaixo de 3:1, mas são apoio: a situação também tem ícone, rótulo e nome acessível. Mantidos.

**Outras correções e acréscimos ao que o código faz.**

- Contorno de foco cortado nos chips: a fileira tem `overflow-x: auto` e só 2 px de respiro → `padding: var(--space-6)` com margem negativa igual.
- Estados que o código não tem e o PRD exige (CONTRIBUTING, regra 5): ativo no clique (botão desce 1 px; linha da lista, chip e segmentado mudam de fundo), hover de campo (borda `--muted-foreground`), hover de chip e da faixa de dias (borda `--border-strong`).
- Foco escondido pela casca: o código não tem `scroll-padding`; o PRD acrescenta (9.2).
- Cadastro de paciente sem finalidade dos dados nem link para a política (CONTRIBUTING, regra 8): o PRD acrescenta a frase no topo do formulário.
- Descartar alterações usa `window.confirm` no código; o PRD usa o diálogo de confirmação do próprio sistema.
- Busca de paciente: o PRD proíbe termo de busca, CPF e telefone no endereço da página.
- Lista estreita: o código põe as iniciais de 44 px numa coluna de 40 px → coluna de 44 px.

**Valores consolidados** (o código tem valores quase iguais para o mesmo papel; o PRD fixa um).

- Tamanhos de fonte: 25 valores viraram 12 papéis. 12,5 → 12; 13,5 → 13; 14,5 → 14; 15,5 → 15; 16,5 → 16; 19 → 18; 21 e 23 → 22; 24 (número da produção) → 22; 29 e 30 → 28; 11,5 (hora na grade) → 12. Iniciais mantêm 8,5, 10,5, 13, 15, 19 e 24, ligados ao diâmetro.
- Raios: 9 → 10; 18 → 20; acrescentados `--radius-md` 12 e `--radius-box` 16, muito usados no código fora dos tokens.
- Ícones: 15, 16 e 17 → 16 ou 18; 19, 20 e 21 → 20; 22 e 26 → 24.
- Espaços ímpares: 3 → 4 (cartão da grade), 9 → 10 (linha da lista), 22 → 24 (botão grande, cartão), 26 → 24 (diálogo).
- Durações: 140 ms → 120 ms; 220 ms → 200 ms.
- Rótulos em maiúsculas: espaçamento 0,5, 0,8 e 1 px → `--tracking-caps` 0,6 px.
- Texto secundário sobre escuro: `#B8C4C7`, `#B9C3C6` e `#C9D2D5` → `--on-dark-muted` `#C9D2D5`.
- Alertas: o código usa cores próprias de texto e borda para cada tom (`#234A7E`, `#175F37`, `#644300`, `#8E2B2B` e quatro bordas); o PRD usa o token do tom sobre o `-soft` (todos passam 4,5:1) e borda com `color-mix`. O alerta de aviso passa do fundo `#FFF4DA` para `--warning-soft` `#FFF1D2`.
- `--shadow-sm` do código (`0 1px 2px rgba(27, 37, 41, .06)`) não era usado; passou a ser a sombra do segmentado (`0 1px 4px rgba(40, 30, 20, .12)`).
- Cores soltas promovidas a token: `#D2E9E3`, `#136437`, `#0F171A`, `#8EE3D6`, `#CDEBE6`, `#FFB4A6`, `#E4DEFB`, `#F3EEE7`, `#F5FAF8`, `#F0EBE3`, `rgba(20, 28, 31, .42)`. O texto da ilustração da entrada (`#35484E`) passou a `--muted-foreground` e o fundo do segmentado (`#EDE7DE`) a `--muted`.

**Escolhas a confirmar.**

- Alvo de toque: o estudo pede 44 px no mínimo; o código usa 38 px (botão pequeno, segmentado), 40 px (chip), 42 px (paginação, horário) e 36 px (link de volta). O PRD mantém o código nos controles em grupo e fixa a regra: controle isolado com 44 px (o link de volta sobe de 36 para 44 px), controle em grupo com 38 px, todos acima do mínimo de 24 px da WCAG 2.2. Alternativa: subir tudo para 44 px.
- Cartões estreitos da grade (3 ou mais consultas simultâneas): no código o ícone some e Confirmado e Concluído ficam distintos só pela cor. Resolvido no PRD com a alternativa proposta: o ícone nunca sai e, com 3 faixas ou mais, o cartão mostra só o ícone e as iniciais do paciente (ver "Ajustado depois dos exemplos", item 2; seção 7.2 e checklist). O código do Dental Flow precisa da mesma mudança.
- O lembrete "N pacientes ainda não confirmaram" herdou o fundo branco do Agendado depois da revisão das cores; no protótipo era âmbar. Proposta: `--warning-soft` com texto `--warning` (6,30:1).
- A visão Dia por profissional no computador estava "a confirmar" no estudo; o código a implementou e o PRD a mantém.

### Divergências entre o estudo e o código

Em todos os casos o PRD segue o código.

- **Cores das situações.** Estudo, seção 5: Agendado âmbar, Confirmado verde, Em atendimento violeta, Concluído azul, Cancelado vermelho, Faltou cinza. Código, revisão de 28/10/2026 (seção 14 do estudo e `tokens.css`): Agendado vazado com contorno tracejado âmbar, Confirmado verde, Em atendimento roxo cheio, Concluído cinza, Cancelado vermelho hachurado, Faltou terracota hachurado (`#934010`, `#FCEBDD`, `#E07B3F`; a seção 14 não dá a cor do Faltou).
- **Forma.** Estudo: raios "de 12 a 24 px" e botões "de 46 a 54 px". Código: raios 10, 12, 14, 16, 20, 24 e 28 por papel; botões de 38, 46 e 54 px.
- **Barra superior.** O protótipo tem uma busca de paciente na barra; o código a removeu (seção 14).
- **Linha "agora" na lista.** Protótipo: "Agora · 09:40". Código: só "Agora"; a hora aparece na grade.
- **Lembrete de confirmação.** Protótipo: fundo âmbar e link "Ver". Código: fundo branco, sem link.
- **Cartão "Próximo" na tela Hoje.** Estudo: acima da lista. Código: só abaixo de 1100 px; acima disso o detalhe ao lado já abre com o próximo paciente.
- **Dias passados.** Estudo: "esmaecidos". Código: opacidade 0,72 nos cartões, que reprova contraste; o PRD corrige (ver acima).
- **Painel lateral da Agenda.** Estudo: "a grade continua visível". Código (`component/ui/overlay.module.css` e `feature/agenda/view/agenda_view.jsx`): `.panel { position: fixed; top: 0; right: 0; bottom: 0; width: min(460px, 100vw) }` por cima da página, sem reservar espaço (o comentário do CSS diz "ao lado da grade, sem escurecer", mas a grade não encolhe) e sem véu a partir de 900 px (`.backdrop` só abaixo de 900 px). O PRD segue o estudo, não o código: coluna ao lado da grade a partir de 1280 px e, abaixo disso, painel com véu (no código, de 900 a 1279 px não há véu). O Dental Flow precisa da mesma mudança.
- **Detalhe da tela Hoje.** O código já tem `.side` com `position: sticky` e `max-height: calc(100dvh - var(--topbar) - 40px)` com rolagem própria, mas depois do cabeçalho, da faixa, dos chips e do lembrete e sem rodapé: a ação seguinte rola com o corpo. O PRD sobe a coluna para o alto do conteúdo e fixa a ação seguinte num rodapé (item 4 de "Ajustado depois dos exemplos").
- **Filtros.** Estudo, seção 3: chips de dentista, período e situação. Código: só chips de profissional; período pelo segmentado e pelas setas.
