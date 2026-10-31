---
titulo: Aplicativo acessível orientado a tarefas
slug: app-tarefas-acessivel
versao: 2.0.0
status: rascunho
superficie: app
dominio: geral
estende: nenhum
idioma: pt-BR
acessibilidade: WCAG 2.2 AA
atualizado: 2026-10-31
---

# Aplicativo acessível orientado a tarefas

Guia autossuficiente para recriar uma interface com texto grande, escolhas por cartões, formulários por etapas, acompanhamento de solicitações e três temas. A linguagem visual foi extraída do frontend atual do ConectaRocinha, incluindo suas alterações locais de 10/10/2026, e convertida em padrões que podem servir a outros produtos. Os nomes das entidades, os serviços, as permissões e as regras de negócio pertencem à aplicação de destino.

O documento se inspira na organização dos PRDs de design system base, site de escola de idiomas e sistema de gestão do repositório `prd_frontend`: medidas explícitas, receitas, anatomia de telas, contraste calculado e aceite verificável. A identidade descrita aqui vem do sistema observado.

## Escopo

- **Use para:** aplicativos de atendimento, catálogos, comunidades, solicitações, oportunidades, serviços, conteúdo e processos simples; produtos em que a pessoa precisa reconhecer uma tarefa e agir com poucos controles por etapa.
- **Não use para:** reproduzir um site institucional de marketing ou a densidade de um sistema administrativo com tabelas e barra lateral permanente. No catálogo de referência, esses casos têm estilos próprios em `site-escola-idiomas` e `sistema-gestao`.
- **Relação com outros PRDs:** autossuficiente. Selecione este como referência visual do projeto. Uma especificação funcional pode acompanhá-lo para definir dados e regras. Os outros PRDs visuais são referências de organização, sem herança de suas cores, fontes ou navegação.

**Agnóstico, neste guia, significa:** independente do domínio, da marca, do backend, do framework e do provedor de autenticação. A geometria, a hierarquia, a tipografia e os comportamentos visuais são deliberadamente definidos. Alterar o nome dos módulos não exige alterar o design system.

## Como usar

1. Copie este arquivo para a raiz da aplicação de destino como `PRD-FRONTEND.md`.
2. Preencha o quadro abaixo e entregue a especificação funcional que já existir.
3. Peça ao agente: “Siga `PRD-FRONTEND.md`. Recrie a linguagem visual usando as receitas deste arquivo. Adapte as entidades ao meu produto e verifique o checklist de aceite antes de entregar.”
4. Comece por uma entrada, uma listagem, um detalhe e uma etapa de formulário. Confira essas telas antes de estender o padrão aos módulos restantes.
5. Use os estados de carregamento, vazio, erro e sucesso durante a revisão. Dados de demonstração devem ser fictícios e identificados.

| Informação de destino | Preencher |
| --- | --- |
| Nome e sigla do produto | Nome ou logotipo próprios, sem iniciais em quadrado |
| Público e tarefa mais frequente | Quem usa e o que tenta concluir |
| Quatro destinos principais | Início, catálogo principal, acompanhamento, conta; adaptar os rótulos |
| Categorias do início | Até quatro famílias de tarefas, com nomes e ícones próprios |
| Objeto da listagem | Solicitação, atividade, oportunidade, item ou outra entidade real |
| Fatos necessários à escolha | Ex.: local, prazo, valor, disponibilidade; apenas os pertinentes |
| Estados do processo | Nomes e transições definidos pelo produto |
| Perfis de acesso | Como muda o conteúdo para cada perfil, se houver |
| Campos e validações | Obrigatórios, opcionais, formatos e finalidade |
| Integrações opcionais | Autenticação, contato, arquivo, áudio, vídeo, pagamento |
| Marca | Manter a paleta padrão ou substituir os pares de tokens com novo cálculo de contraste |

Quando uma informação funcional estiver ausente, descreva a lacuna. O guia visual não cria requisitos de cobrança, contratação, coleta de documentos ou publicação de dados.

## Índice

- [Princípios](#1-princípios)
- [Tokens dos três temas](#2-tokens)
- [Tipografia e iconografia](#3-tipografia-e-iconografia)
- [Cor](#4-cor)
- [Layout, navegação e CSS dos componentes](#5-layout-e-navegação)
- [Componentes e estados](#6-componentes)
- [Modelos de tela](#7-modelos-de-tela)
- [Movimento e recursos assistivos](#8-movimento-e-recursos-assistivos)
- [Acessibilidade e contraste calculado](#9-acessibilidade)
- [Checklist de aceite](#10-checklist-de-aceite)
- [Exemplos sem framework](#11-exemplo-de-composição-sem-framework)
- [Prompt para outra aplicação](#12-prompt-para-recriar-em-outra-aplicação)
- [Registro de origem](#13-registro-de-origem-e-limite-da-inspeção)

## 1. Princípios

1. **Entrada por intenção.** A primeira tela oferece ações reconhecíveis: “Quero…”, “Preciso…”, “Ver…”. Cada cartão reúne desenho, título, uma frase de apoio e indicação de avanço.
2. **Texto faz parte do controle.** Botões e destinos trazem rótulos. O ícone reforça o significado. O botão de voz também diz “Ouvir” ou “Falar”.
3. **Uma decisão por etapa.** Uma pergunta ocupa o título do formulário; opções ou campos respondem a ela; o avanço fica no rodapé. Campos relacionados à mesma resposta podem coexistir.
4. **Leitura antes de densidade.** Fonte nativa, pesos firmes, texto de apoio legível, controles altos e alturas mínimas que podem crescer com o conteúdo.
5. **Mesma família em todas as telas.** Catálogo, detalhe, conta, aviso e formulário usam a mesma moldura, raios, botões, campos e cores semânticas.
6. **Desktop com largura real.** O conteúdo ocupa a moldura ampla. Listagens ganham filtros laterais e fatos distribuídos quando houver espaço. A aparência móvel não deve virar uma coluna estreita no centro de toda tela de computador.
7. **Categorias e situações são coisas distintas.** A cor de uma categoria identifica o assunto; sucesso, aviso e erro comunicam o estado. Ambos também possuem nome ou símbolo.
8. **A pessoa pode adaptar a leitura.** Claro, escuro, alto contraste, preferência do sistema e três tamanhos de letra fazem parte do padrão.
9. **Retorno explícito.** Ao concluir, diga o que aconteceu e o próximo passo. Ao falhar, diga o que fazer e conserve respostas ainda não enviadas.
10. **Pouco ornamento.** Superfícies planas, bordas, SVGs Duotone e espaço entre blocos sustentam a composição. Gradientes, fotos de fundo e sombras em todos os cartões não fazem parte desta identidade.

## 2. Tokens

Os nomes foram neutralizados com o prefixo `--ui-`. As quatro categorias são numeradas; associe cada uma a um assunto da aplicação. Os valores de cor, fonte, espaço e geometria preservam a versão observada. O bloco seguinte pode ser copiado para um arquivo CSS sem depender do repositório de origem.

O tema claro é o padrão do CSS. A aplicação pode selecionar o tema inicial pela preferência do sistema, como no produto observado. Para trocar, atribua `data-theme="light"`, `data-theme="dark"` ou `data-theme="contrast"` ao elemento raiz.

```css
:root {
  color-scheme: light;

  /* superfícies */
  --ui-bg: #f3f6f8;
  --ui-bar: #ffffff;
  --ui-surface: #ffffff;
  --ui-surface-2: #edf2f5;
  --ui-line: #dae4eb;
  --ui-card-border: #dae4eb;
  --ui-field-border: #7d8991;
  --ui-overlay: rgba(15, 19, 32, 0.5);

  /* texto */
  --ui-text: #111a20;
  --ui-text-2: #384249;

  /* ação */
  --ui-action: #025e88;
  --ui-on-action: #ffffff;
  --ui-action-text: #014261;
  --ui-action-soft: #e7f3fc;
  --ui-action-line: #b1d7f1;
  --ui-selected: #e7f3fc;
  --ui-on-selected: #014261;
  --ui-tab-active: #e7f3fc;
  --ui-on-tab-active: #025e88;
  --ui-highlight: #025e88;
  --ui-on-highlight: #ffffff;
  --ui-focus: #025e88;
  --ui-disabled: #e4e8ea;
  --ui-on-disabled: #4b565d;
  --ui-disabled-line: transparent;

  /* situação */
  --ui-ok: #0a554f;
  --ui-ok-soft: #d9f5ee;
  --ui-warn: #7c3a03;
  --ui-warn-soft: #f9f5c8;
  --ui-danger: #8f1616;
  --ui-danger-soft: #fee2df;
  --ui-neutral: #384249;
  --ui-neutral-soft: #e4e8ea;
  --ui-count: #b42b01;
  --ui-on-count: #ffffff;

  /* liga e desliga */
  --ui-toggle-off: #7d8991;
  --ui-toggle-on: #077674;
  --ui-toggle-knob: #ffffff;
  --ui-toggle-knob-on: #ffffff;

  /* papel: sempre branco, para o que a câmera precisa ler (código em quadrado) */
  --ui-paper: #ffffff;

  /* WhatsApp: igual nos três temas */
  --ui-contact: #25d366;
  --ui-on-contact: #06281c;

  /* blocos de desenho dos cards */
  --ui-tone-1: #e7f3fc;
  --ui-on-tone-1: #025e88;
  --ui-tone-2: #fff1cf;
  --ui-on-tone-2: #8a4b00;
  --ui-tone-3: #d9f5ee;
  --ui-on-tone-3: #077674;
  --ui-tone-4: #ffe1ea;
  --ui-on-tone-4: #9f1640;
  --ui-tone-neutral: #eaeff2;
  --ui-on-tone-neutral: #384249;

  /* desenhos Duotone sobre a superfície, sem caixa pastel */
  --ui-icon-1: #025e88;
  --ui-icon-2: #8a4b00;
  --ui-icon-3: #077674;
  --ui-icon-4: #9f1640;
  --ui-icon-neutral: #384249;

  /* contorno extra de selos e avisos: só o alto contraste usa */
  --ui-edge: 0px;
  --ui-bar-line: 1px;

  /* letra: tudo em rem, para seguir o tamanho escolhido em "Letra, cor e som" */
  --ui-font: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --ui-fs-small: 1rem;
  --ui-fs-body: 1.0625rem;
  --ui-fs-body-lg: 1.1875rem;
  --ui-fs-heading: 1.125rem;
  --ui-fs-card: 1.25rem;
  --ui-fs-title: 1.625rem;
  --ui-fs-display: 2.25rem;
  --ui-fs-button: 1.1875rem;
  --ui-fs-input: 1.25rem;
  /* o nome dos itens do menu encolhe com a largura da tela para os quatro caberem em 320 px */
  --ui-fs-tab: min(1rem, 4.4vw);
  --ui-lh-tight: 1.2;
  --ui-lh-body: 1.45;

  /* espaço */
  --ui-sp-1: 4px;
  --ui-sp-2: 8px;
  --ui-sp-3: 12px;
  --ui-sp-4: 16px;
  --ui-sp-5: 20px;
  --ui-sp-6: 24px;
  --ui-sp-8: 32px;

  /* raio */
  --ui-r-card: 20px;
  --ui-r-control: 16px;
  --ui-r-small: 12px;
  --ui-r-sheet: 26px;
  --ui-r-pill: 999px;

  /* medidas */
  --ui-tap: 48px;
  --ui-btn-h: 58px;
  --ui-col: 600px;
  --ui-col-wide: 1440px;
}

:root[data-theme="dark"] {
  color-scheme: dark;

  --ui-bg: #0e1014;
  --ui-bar: #14171d;
  --ui-surface: #1b2028;
  --ui-surface-2: #232a34;
  --ui-line: #2c333f;
  --ui-card-border: transparent;
  --ui-field-border: #7b8696;
  --ui-overlay: rgba(0, 0, 0, 0.62);

  --ui-text: #eef1f5;
  --ui-text-2: #aeb7c4;

  --ui-action: #2bb5ee;
  --ui-on-action: #03131b;
  --ui-action-text: #7fd4f8;
  --ui-action-soft: #0f3346;
  --ui-action-line: #1d5f80;
  --ui-selected: #0f3346;
  --ui-on-selected: #7fd4f8;
  --ui-tab-active: #2bb5ee;
  --ui-on-tab-active: #03131b;
  --ui-highlight: #9b2f93;
  --ui-on-highlight: #ffffff;
  --ui-focus: #7fd4f8;
  --ui-disabled: #232a34;
  --ui-on-disabled: #aeb7c4;
  --ui-disabled-line: transparent;

  --ui-ok: #74e3a3;
  --ui-ok-soft: #10391f;
  --ui-warn: #f5c451;
  --ui-warn-soft: #3f3011;
  --ui-danger: #ff9b9b;
  --ui-danger-soft: #3a1518;
  --ui-neutral: #aeb7c4;
  --ui-neutral-soft: #232a34;
  --ui-count: #ff9b9b;
  --ui-on-count: #2a0a0c;

  --ui-toggle-off: #7b8696;
  --ui-toggle-on: #2bb5ee;
  --ui-toggle-knob: #ffffff;
  --ui-toggle-knob-on: #03131b;

  --ui-tone-1: #2bb5ee;
  --ui-on-tone-1: #0b0d10;
  --ui-tone-2: #f2b632;
  --ui-on-tone-2: #0b0d10;
  --ui-tone-3: #2bb35a;
  --ui-on-tone-3: #0b0d10;
  --ui-tone-4: #c44fbb;
  --ui-on-tone-4: #0b0d10;
  --ui-tone-neutral: #3a4250;
  --ui-on-tone-neutral: #ffffff;

  --ui-icon-1: #2bb5ee;
  --ui-icon-2: #f2b632;
  --ui-icon-3: #2bb35a;
  --ui-icon-4: #e18ada;
  --ui-icon-neutral: #eef1f5;
}

:root[data-theme="contrast"] {
  color-scheme: dark;

  --ui-icon-1: #ffffff;
  --ui-icon-2: #ffffff;
  --ui-icon-3: #ffffff;
  --ui-icon-4: #ffffff;
  --ui-icon-neutral: #ffffff;

  --ui-bg: #000000;
  --ui-bar: #000000;
  --ui-surface: #000000;
  --ui-surface-2: #000000;
  --ui-line: #ffffff;
  --ui-card-border: #ffffff;
  --ui-field-border: #ffffff;
  --ui-overlay: rgba(0, 0, 0, 0.85);

  --ui-text: #ffffff;
  --ui-text-2: #ffffff;

  --ui-action: #ffd60a;
  --ui-on-action: #000000;
  --ui-action-text: #ffd60a;
  --ui-action-soft: #000000;
  --ui-action-line: #ffd60a;
  --ui-selected: #ffd60a;
  --ui-on-selected: #000000;
  --ui-tab-active: #ffd60a;
  --ui-on-tab-active: #000000;
  --ui-highlight: #ffffff;
  --ui-on-highlight: #000000;
  --ui-focus: #ffd60a;
  --ui-disabled: #000000;
  --ui-on-disabled: #ffffff;
  --ui-disabled-line: #ffffff;

  --ui-ok: #ffffff;
  --ui-ok-soft: #000000;
  --ui-warn: #ffffff;
  --ui-warn-soft: #000000;
  --ui-danger: #ffffff;
  --ui-danger-soft: #000000;
  --ui-neutral: #ffffff;
  --ui-neutral-soft: #000000;
  --ui-count: #ffffff;
  --ui-on-count: #000000;

  --ui-toggle-off: #000000;
  --ui-toggle-on: #ffd60a;
  --ui-toggle-knob: #ffffff;
  --ui-toggle-knob-on: #000000;

  --ui-tone-1: #ffffff;
  --ui-on-tone-1: #000000;
  --ui-tone-2: #ffffff;
  --ui-on-tone-2: #000000;
  --ui-tone-3: #ffffff;
  --ui-on-tone-3: #000000;
  --ui-tone-4: #ffffff;
  --ui-on-tone-4: #000000;
  --ui-tone-neutral: #ffffff;
  --ui-on-tone-neutral: #000000;

  --ui-edge: 2px;
  --ui-bar-line: 2px;
}
```

### 2.1 Convenções adicionais de implementação

O CSS de componentes abaixo mantém algumas medidas locais da interface original, como o padding de cartão e a altura da barra. Elas estão centralizadas na receita do componente correspondente. Não use essas exceções para iniciar uma segunda escala de espaçamentos.

- `--ui-col-wide` define a largura máxima externa, incluindo o padding do conteúdo.
- `--ui-col` serve aos painéis sobrepostos e à opção de tela estreita. O padrão das páginas é amplo.
- `--ui-line` e `--ui-card-border` são divisórias ou contornos decorativos. Campos e escolhas usam `--ui-field-border`.
- `--ui-tone-1` a `--ui-tone-4` e seus pares preservam a paleta de categoria. O ícone de categoria comum usa fundo transparente e `--ui-icon-1` a `--ui-icon-4`.
- `--ui-highlight` é o cartão de atenção preenchido. No escuro ele tem papel magenta próprio, enquanto ações usam azul.
- `--ui-contact` e `--ui-on-contact` são o par verde da ação de contato opcional. Use esse par no canal correspondente ou redefina ambos para outro canal, calculando o contraste.
- `--ui-paper` permanece branco para conteúdo que precisa desse fundo, como um código visual de leitura por câmera.

## 3. Tipografia e iconografia

### 3.1 Tipografia

A família é a pilha nativa declarada em `--ui-font`. O aspecto pode variar entre Windows, Android e outros sistemas, preservando a hierarquia. Não é necessário baixar uma fonte para recriar o padrão.

| Papel | Token | Aplicação |
| --- | --- | --- |
| Apoio, legenda, selo | `--ui-fs-small` | Descrição curta, data, categoria e instrução auxiliar |
| Corpo | `--ui-fs-body` | Parágrafos, avisos e fatos |
| Corpo de destaque | `--ui-fs-body-lg` | Título de linha, texto de confirmação e navegação no desktop |
| Seção e rótulo de campo | `--ui-fs-heading` | Pergunta secundária, grupo de opções e label |
| Título de cartão | `--ui-fs-card` | Categoria ou item principal |
| Título de tela | `--ui-fs-title` | Um `h1` por página ou etapa |
| Resultado de sucesso | `--ui-fs-display` | “Pronto!” e equivalente do produto |
| Botão | `--ui-fs-button` | Verbo e objeto legíveis |
| Valor do campo | `--ui-fs-input` | Texto digitado, sem reduzir o tamanho no celular |
| Menu móvel | `--ui-fs-tab` | Exceção responsiva para os quatro rótulos caberem |

Use peso 700 em títulos, ações e escolhas; 400 no corpo; 500 no apoio de opções; 600 no texto digitado. Use `--ui-lh-tight` nos títulos e ações e `--ui-lh-body` nos parágrafos. As receitas mantêm os ajustes locais de linha dos componentes.

Os tamanhos são em `rem`. A preferência “Normal”, “Grande” e “Maior” altera a raiz para 100%, 115% e 130%, respectivamente. Guarde a escolha com uma chave própria do produto e aplique-a antes da primeira pintura. Em armazenamento indisponível, a escolha pode valer durante a sessão.

Não use altura fixa para truncar títulos ou rótulos. Deixe o texto quebrar, inclusive em botões. O conteúdo extenso deve continuar disponível.

### 3.2 Iconografia

**Família de reprodução: Phosphor Duotone.** A origem utiliza SVGs dessa família, com a cor herdada do contexto e o desenho decorativo oculto dos leitores de tela. A aplicação de destino pode consumir os SVGs diretamente ou usar a integração apropriada ao seu framework.

- Use uma única família no aplicativo. Preserve a camada secundária Duotone.
- O bloco de ícone reserva espaço de alinhamento; nas categorias comuns ele é transparente.
- Os modificadores `sm`, padrão, `lg` e `xl` estão definidos no CSS. A receita controla também o tamanho do SVG dentro do bloco.
- Ícones de fatos, botões e navegação são menores que os desenhos das categorias; use as medidas declaradas nas receitas e no exemplo.
- Ícone decorativo: `aria-hidden="true"` e `focusable="false"`. O texto ao lado fornece o nome.
- Foto e avatar de iniciais são opcionais. Não obrigue envio de foto para a composição funcionar.
- Escolha desenhos ligados à tarefa do destino. Maleta, livro ou ferramenta são exemplos da origem, sem significado obrigatório em outro produto.

## 4. Cor

| Papel | Claro | Escuro | Alto contraste |
| --- | --- | --- | --- |
| Página e superfícies | Fundo cinza frio e cartões brancos | Fundo quase preto e superfícies em três níveis | Preto com contorno branco |
| Ação | Azul-tinta | Azul claro | Amarelo sobre preto |
| Destaque preenchido | Azul-tinta | Magenta | Branco com texto preto |
| Categoria 1 | Azul-tinta | Azul | Branco |
| Categoria 2 | Ocre | Amarelo | Branco |
| Categoria 3 | Verde petróleo | Verde | Branco |
| Categoria 4 | Vinho | Rosa | Branco |
| Sucesso, aviso e erro | Texto escuro sobre fundo suave | Texto claro sobre fundo escuro próprio | Texto, contorno e símbolo; sem depender da diferença de matiz |

Use `--ui-action` para o botão principal e para seleção. Texto de link e texto sobre fundo suave usam `--ui-action-text`, que tem papel próprio. `--ui-on-action` só acompanha `--ui-action`; `--ui-on-highlight` acompanha `--ui-highlight`.

Uma faixa de atenção preenchida pode coexistir com os atalhos de categorias. Ela sinaliza uma pendência concreta, como completar uma informação. A cor de categoria aparece principalmente no desenho; o corpo do cartão continua na superfície do tema.

O tema escuro é uma paleta completa. As ações ficam azuis e o destaque fica magenta conforme os tokens. O alto contraste substitui a maioria dos fundos coloridos por preto, texto branco, seleção amarela e contornos explícitos.

## 5. Layout e navegação

### 5.1 Moldura

Toda tela segue a mesma sequência:

1. Barra superior com marca, retorno quando pertinente, controle de escuta e ações globais.
2. Conteúdo amplo com título, frase de apoio opcional e blocos da tarefa.
3. Rodapé com ação principal, quando a tarefa exigir.
4. Menu principal móvel, quando não houver rodapé de ação.

No desktop, o menu principal aparece na barra superior mesmo em telas com rodapé. No celular, a ação do formulário ou do detalhe ocupa a faixa inferior do menu. Não empilhe duas barras inferiores concorrentes.

Em tela interna móvel, o retorno ocupa o lugar da marca. No desktop, a marca pode permanecer ao lado do retorno, como na origem.

Use altura mínima de viewport dinâmico. O conteúdo pode rolar verticalmente. Topo e rodapé são aderentes ao viewport com `position: sticky`; a área segura inferior do aparelho entra no padding. O conteúdo deve permanecer alcançável por teclado e rolagem.

### 5.2 Regras de adaptação

| Condição da receita | Comportamento |
| --- | --- |
| Janela abaixo do breakpoint de desktop | Marca compacta; navegação inferior em quatro itens; filtros acima da lista |
| Janela a partir de 1100 px | Mesmos destinos no topo, com texto e ícone lado a lado |
| Contêiner estreito | Grades e controles refluem segundo as consultas em `rem` do CSS |
| Grade de categorias com espaço suficiente | Quatro atalhos na mesma linha; antes disso, duas colunas; no limite estreito, uma |
| Catálogo no contêiner amplo | Filtros em coluna lateral e lista contínua à direita |
| Catálogo com espaço adicional | Título e identificação à esquerda; fatos à direita, separados por divisória |
| Conta no contêiner amplo | Opções em duas colunas; cada opção continua sendo uma linha clicável |
| Notificações no contêiner amplo | Texto à esquerda e ações à direita |

As consultas de contêiner respondem à largura útil e ao tamanho da letra. A navegação usa um breakpoint da janela. Preserve essa distinção; não substitua todas as consultas por uma única largura de celular.

**Altura até 480px:** com zoom de 400%, a janela fica em 320 × 256. Barra superior, abas e rodapé de ação deixam de ser fixos e rolam junto (receita em 5.4).

**Link de pular:** toda tela começa por `<a class="ui-skip" href="#conteudo">Pular para o conteúdo</a>`, e o `<main>` tem `id="conteudo"`.

### 5.3 Dois conjuntos de quatro itens

O **menu principal** tem destinos estáveis, como Início, Explorar, Acompanhar e Conta. A **grade do início** reúne categorias de tarefas, como conteúdos, atividades, recursos e pessoas. São estruturas independentes. Rotas secundárias abrem pelos atalhos e mantêm o contexto do destino principal correspondente.

Mantenha o mesmo menu entre perfis de usuário, quando as tarefas permitirem. Adapte o conteúdo do início por perfil. O item atual combina texto, ícone e fundo de seleção; declare `aria-current` de acordo com a rota ou área ativa.

### 5.4 Receita de CSS

O bloco seguinte reúne reset, moldura, navegação e componentes. As classes `ui-` são uma API visual de referência: podem ser adotadas como estão ou mapeadas aos componentes do framework escolhido. O código não implementa estado, rotas, validação, foco de diálogo ou integração de voz; esses comportamentos estão descritos nas próximas seções. O fim do bloco explicita a alternância das duas posições do menu para o exemplo HTML e complementa o estado desabilitado e o movimento reduzido do destino.

```css
/* Base do documento: reset, letra, foco e movimento reduzido. */
*,
*::before,
*::after { box-sizing: border-box; }

html {
  /* lib/theme.ts troca este valor para 115% ou 130% */
  font-size: 100%;
  /* O topo e o rodapé são fixos: quem recebe o foco rola para a faixa livre entre eles, sem ficar encoberto. */
  scroll-padding-block: 10rem;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

body {
  margin: 0;
  min-height: 100dvh;
  background: var(--ui-bg);
  color: var(--ui-text);
  font-family: var(--ui-font);
  font-size: var(--ui-fs-body);
  line-height: var(--ui-lh-body);
  -webkit-font-smoothing: antialiased;
  overflow-wrap: break-word;
}

h1,
h2,
h3,
p { margin: 0; }

button,
input,
select,
textarea { font: inherit; }
button { cursor: pointer; }
a { color: var(--ui-action-text); }
img,
svg { max-width: 100%; }
svg { flex: none; }

:focus-visible {
  outline: 3px solid var(--ui-focus);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Texto só para leitor de tela. */
.ui-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}


/* Receitas compartilhadas: prefixo ui-, fonte nativa e valores dos tokens acima. */

/* ---------- moldura de tela ---------- */
.ui-screen { display: flex; flex-direction: column; min-height: 100dvh; background: var(--ui-bg); color: var(--ui-text); }
.ui-main { flex: 1 0 auto; width: 100%; max-width: var(--ui-col); margin: 0 auto; padding: var(--ui-sp-4) var(--ui-sp-4) var(--ui-sp-6); container-type: inline-size; overflow-wrap: anywhere; }
.ui-main :is(a, button, input, select, textarea, summary, iframe, [tabindex]) { scroll-margin-block: 1rem; }
.ui-main--wide { max-width: var(--ui-col-wide); }
.ui-main--center { display: flex; flex-direction: column; justify-content: center; }
/* O título recebe o foco ao entrar na tela, para o leitor de tela começar por ele. Não é um controle: fica sem contorno. */
.ui-main h1:focus { outline: none; }

.ui-title { margin-bottom: var(--ui-sp-2); font-size: var(--ui-fs-title); font-weight: 700; line-height: var(--ui-lh-tight); letter-spacing: -0.2px; }
.ui-lead { margin-bottom: var(--ui-sp-4); color: var(--ui-text-2); font-size: var(--ui-fs-body); }
.ui-title + .ui-stack,
.ui-title + .ui-section { margin-top: var(--ui-sp-3); }

.ui-footer { position: sticky; bottom: 0; z-index: 15; flex: none; background: var(--ui-bar); border-top: var(--ui-bar-line) solid var(--ui-line); padding: var(--ui-sp-3) var(--ui-sp-4) calc(var(--ui-sp-4) + env(safe-area-inset-bottom, 0px)); }
.ui-footer__inner { display: grid; gap: 10px; width: 100%; max-width: calc(var(--ui-col) - 2 * var(--ui-sp-4)); margin: 0 auto; }
.ui-footer--wide .ui-footer__inner { max-width: calc(var(--ui-col-wide) - 2 * var(--ui-sp-4)); }

/* ---------- topo ---------- */
.ui-topbar { position: sticky; top: 0; z-index: 20; display: flex; flex: none; flex-wrap: wrap; align-items: center; gap: var(--ui-sp-2); min-height: 64px; padding: var(--ui-sp-2) var(--ui-sp-3); background: var(--ui-bar); border-bottom: var(--ui-bar-line) solid var(--ui-line); }
.ui-topbar__start { display: flex; align-items: center; gap: var(--ui-sp-2); min-width: 0; margin-right: auto; }
.ui-topbar__end { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: var(--ui-sp-2); min-width: 0; margin-left: auto; }
.ui-brand { display: flex; align-items: center; gap: 9px; min-height: var(--ui-tap); color: var(--ui-text); font-size: var(--ui-fs-body-lg); font-weight: 700; line-height: var(--ui-lh-tight); }

.ui-topbtn { position: relative; display: inline-flex; align-items: center; gap: 6px; flex: none; min-height: var(--ui-tap); padding: 0 14px; border: 2px solid transparent; border-radius: var(--ui-r-control); background: var(--ui-surface-2); color: var(--ui-text); font-size: var(--ui-fs-small); font-weight: 700; line-height: var(--ui-lh-tight); text-decoration: none; box-shadow: inset 0 0 0 var(--ui-edge) var(--ui-line); }
.ui-topbtn--listen { border-radius: var(--ui-r-pill); border-color: var(--ui-action-line); background: var(--ui-action-soft); color: var(--ui-action-text); box-shadow: none; }
.ui-topbtn { max-width: 100%; }
.ui-topbtn--on { border-color: var(--ui-action); background: var(--ui-action); color: var(--ui-on-action); }

.ui-count { display: inline-grid; place-items: center; flex: none; min-width: 26px; height: 26px; padding: 0 7px; border-radius: var(--ui-r-pill); background: var(--ui-count); color: var(--ui-on-count); font-size: var(--ui-fs-small); font-weight: 700; line-height: 1; }

.ui-offline { display: flex; align-items: center; justify-content: center; gap: var(--ui-sp-2); padding: var(--ui-sp-2) var(--ui-sp-4); background: var(--ui-warn-soft); color: var(--ui-warn); font-size: var(--ui-fs-small); font-weight: 700; text-align: center; border-bottom: var(--ui-edge) solid var(--ui-line); }

/* ---------- menu de 4 itens ---------- */
.ui-tabbar { position: sticky; bottom: 0; z-index: 15; display: flex; flex: none; justify-content: space-around; gap: 2px; padding: 6px 6px calc(var(--ui-sp-2) + env(safe-area-inset-bottom, 0px)); background: var(--ui-bar); border-top: var(--ui-bar-line) solid var(--ui-line); }
.ui-tab { position: relative; display: flex; flex: 1 1 auto; flex-direction: column; align-items: center; justify-content: center; gap: 2px; min-width: 0; min-height: 60px; padding: 0 2px; border-radius: var(--ui-r-small); color: var(--ui-text-2); font-size: var(--ui-fs-tab); font-weight: 700; line-height: var(--ui-lh-tight); text-decoration: none; }
.ui-tab__pill { display: grid; place-items: center; width: min(60px, 100%); height: 32px; border-radius: var(--ui-r-pill); }
.ui-tab--active { color: var(--ui-action-text); font-weight: 700; }
.ui-tab--active .ui-tab__pill { background: var(--ui-tab-active); color: var(--ui-on-tab-active); }

/* no computador os mesmos 4 itens ficam no topo */
.ui-tabbar--top { position: static; flex: 0 1 auto; justify-content: center; gap: var(--ui-sp-2); margin: 0 auto; padding: 0; border: 0; background: transparent; }
.ui-tabbar--top .ui-tab { flex: none; flex-direction: row; gap: var(--ui-sp-2); min-height: 52px; padding: 0 18px; border-radius: var(--ui-r-control); font-size: var(--ui-fs-body-lg); }
.ui-tabbar--top .ui-tab__pill { width: auto; height: auto; border-radius: 0; background: transparent; }
.ui-tabbar--top .ui-tab--active { background: var(--ui-selected); color: var(--ui-on-selected); }
.ui-tabbar--top .ui-tab--active .ui-tab__pill { background: transparent; color: inherit; }

/* ---------- botões ---------- */
.ui-btn { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; min-height: var(--ui-btn-h); padding: 10px 18px; border: 2px solid transparent; border-radius: var(--ui-r-control); background: transparent; color: var(--ui-text); font-size: var(--ui-fs-button); font-weight: 700; line-height: var(--ui-lh-tight); text-align: center; text-decoration: none; }
.ui-btn--primary { background: var(--ui-action); color: var(--ui-on-action); }
.ui-btn--secondary { border-color: var(--ui-action); background: var(--ui-surface); color: var(--ui-action-text); }
.ui-btn--quiet { min-height: var(--ui-tap); color: var(--ui-text); font-weight: 700; text-decoration: underline; text-underline-offset: 4px; }
.ui-btn--contact { background: var(--ui-contact); color: var(--ui-on-contact); }
.ui-btn--danger { border-color: var(--ui-danger); background: var(--ui-surface); color: var(--ui-danger); }
.ui-btn--inline { display: inline-flex; width: auto; }
.ui-btn:active { transform: translateY(1px); }
.ui-btn[aria-disabled="true"],
.ui-btn:disabled { border-style: dashed; border-color: var(--ui-disabled-line); background: var(--ui-disabled); color: var(--ui-on-disabled); cursor: not-allowed; transform: none; }

/* ---------- cartões ---------- */
.ui-card { border: 2px solid var(--ui-card-border); border-radius: var(--ui-r-card); background: var(--ui-surface); color: var(--ui-text); }
.ui-card--pad { position: relative; display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ui-sp-3); padding: 14px; }
.ui-card--ok { border-color: var(--ui-ok); background: var(--ui-ok-soft); }
.ui-card--highlight { border-color: var(--ui-action-line); background: var(--ui-action-soft); }
.ui-card--ok .ui-icon,
.ui-card--highlight .ui-icon,
.ui-card--ok .ui-badge,
.ui-card--highlight .ui-badge,
.ui-rowcard--ok .ui-badge,
.ui-rowcard--highlight .ui-badge { background: var(--ui-surface); }
.ui-card__head { display: flex; align-items: center; gap: var(--ui-sp-3); }
.ui-card__headtext { flex: 1; min-width: 0; }
.ui-card__title { font-size: var(--ui-fs-card); font-weight: 700; line-height: var(--ui-lh-tight); }
.ui-card__sub { margin-top: 2px; color: var(--ui-text-2); font-size: var(--ui-fs-small); line-height: 1.3; }
.ui-card__badge { margin-top: 6px; }
/* O link do título cobre o cartão inteiro: o toque vale em qualquer ponto dele. */
.ui-card__link { color: inherit; text-decoration: none; }
.ui-card__link::after { content: ""; position: absolute; inset: 0; border-radius: inherit; }
.ui-card__link:focus-visible { outline: none; }
/* Outros botões e links do cartão recebem o toque: ficam acima da área do link do título. */
.ui-card--pad :is(a, button, input, select, textarea, summary):not(.ui-card__link) { position: relative; z-index: 1; }
.ui-card:has(.ui-card__link:focus-visible) { outline: 3px solid var(--ui-focus); outline-offset: 2px; }

.ui-heading { display: flex; align-items: center; gap: var(--ui-sp-3); margin-bottom: var(--ui-sp-4); }
.ui-heading__text { flex: 1; min-width: 0; }
.ui-heading .ui-title { margin-bottom: 0; }
.ui-heading__sub { margin-top: 2px; color: var(--ui-text-2); font-size: var(--ui-fs-body); line-height: 1.3; }
.ui-heading__badge { margin-top: 6px; }

.ui-bigcard { display: flex; align-items: center; gap: var(--ui-sp-3); width: 100%; min-height: 92px; padding: var(--ui-sp-3); border: 2px solid var(--ui-card-border); border-radius: var(--ui-r-card); background: var(--ui-surface); color: var(--ui-text); text-align: left; text-decoration: none; }
.ui-bigcard__text { flex: 1; min-width: 0; }
.ui-bigcard__title { display: block; font-size: var(--ui-fs-card); font-weight: 700; line-height: var(--ui-lh-tight); }
.ui-bigcard__sub { display: block; margin-top: 3px; color: var(--ui-text-2); font-size: var(--ui-fs-small); line-height: 1.3; }
.ui-bigcard__go { flex: none; color: var(--ui-text-2); }
.ui-bigcard--tile { flex-direction: column; align-items: flex-start; gap: 10px; min-height: 0; padding: 14px; }
.ui-bigcard--tile .ui-bigcard__go { display: none; }
.ui-bigcard--emphasis { border-color: var(--ui-action-line); background: var(--ui-action-soft); }
.ui-bigcard--emphasis .ui-icon { background: var(--ui-surface); color: var(--ui-action-text); }
.ui-bigcard--highlight { border-color: transparent; background: var(--ui-highlight); color: var(--ui-on-highlight); min-height: 0; padding: 14px; }
.ui-bigcard--highlight .ui-bigcard__title { font-size: var(--ui-fs-heading); }
.ui-bigcard--highlight .ui-bigcard__sub,
.ui-bigcard--highlight .ui-bigcard__go { color: var(--ui-on-highlight); }

/* grade de cards: duas colunas quando cabem, uma quando a letra está grande ou a tela é estreita */
.ui-cardgrid { container-type: inline-size; }
.ui-cardgrid__inner { display: grid; grid-template-columns: 1fr 1fr; gap: var(--ui-sp-3); }
@container (max-width: 17.5rem) {
  .ui-cardgrid__inner { grid-template-columns: 1fr; }
  .ui-cardgrid__inner .ui-bigcard--tile { flex-direction: row; align-items: center; min-height: 80px; }
  .ui-cardgrid__inner .ui-option--tile { flex-direction: row; justify-content: flex-start; min-height: 64px; text-align: left; }
  .ui-cardgrid__inner .ui-option--tile .ui-option__text { flex: 1; min-width: 0; padding-right: 28px; }
}
@container (min-width: 46rem) {
  .ui-cardgrid--auto .ui-cardgrid__inner { grid-template-columns: repeat(4, 1fr); }
}
.ui-cardgrid--three .ui-cardgrid__inner { grid-template-columns: repeat(3, 1fr); gap: var(--ui-sp-2); }
@container (max-width: 17.5rem) {
  .ui-cardgrid--three .ui-cardgrid__inner { grid-template-columns: 1fr; }
}

.ui-icon { display: grid; place-items: center; flex: none; width: 56px; height: 56px; border-radius: var(--ui-r-control); background: transparent; color: var(--ui-icon-neutral); }
.ui-icon > svg { width: 40px; height: 40px; }
.ui-icon--sm { width: 44px; height: 44px; border-radius: var(--ui-r-small); }
.ui-icon--sm > svg { width: 28px; height: 28px; }
.ui-icon--lg { width: 64px; height: 64px; }
.ui-icon--lg > svg { width: 48px; height: 48px; }
.ui-icon--xl { width: 112px; height: 112px; border-radius: var(--ui-r-pill); }
.ui-icon--xl > svg { width: 64px; height: 64px; }
.ui-icon--cat-1 { color: var(--ui-icon-1); }
.ui-icon--cat-2 { color: var(--ui-icon-2); }
.ui-icon--cat-3 { color: var(--ui-icon-3); }
.ui-icon--cat-4 { color: var(--ui-icon-4); }
.ui-icon--ok { background: var(--ui-ok-soft); color: var(--ui-ok); box-shadow: inset 0 0 0 var(--ui-edge) var(--ui-line); }
.ui-icon--contactrn { background: var(--ui-warn-soft); color: var(--ui-warn); box-shadow: inset 0 0 0 var(--ui-edge) var(--ui-line); }
.ui-icon--action { background: var(--ui-action-soft); color: var(--ui-action-text); box-shadow: inset 0 0 0 var(--ui-edge) var(--ui-action-line); }
.ui-icon--contact { background: var(--ui-contact); color: var(--ui-on-contact); }
.ui-icon--plain { background: transparent; color: inherit; }

.ui-rowcard { display: flex; align-items: center; gap: var(--ui-sp-3); width: 100%; min-height: 72px; padding: var(--ui-sp-3) 14px; border: 2px solid var(--ui-card-border); border-radius: var(--ui-r-card); background: var(--ui-surface); color: var(--ui-text); font: inherit; text-align: left; text-decoration: none; }
.ui-rowcard__text { flex: 1; min-width: 0; }
.ui-rowcard__title { display: block; font-size: var(--ui-fs-body-lg); font-weight: 700; line-height: var(--ui-lh-tight); }
.ui-rowcard__sub { display: block; margin-top: 2px; color: var(--ui-text-2); font-size: var(--ui-fs-small); line-height: 1.3; }
.ui-rowcard__badge { display: block; margin-top: 6px; }
.ui-rowcard__go { flex: none; color: var(--ui-text-2); }
.ui-rowcard--ok { border-color: var(--ui-ok); background: var(--ui-ok-soft); }
.ui-rowcard--highlight { border-color: var(--ui-action-line); background: var(--ui-action-soft); }
.ui-rowcard--highlight .ui-icon,
.ui-rowcard--ok .ui-icon { background: var(--ui-surface); }

.ui-avatar { display: grid; place-items: center; flex: none; width: 56px; height: 56px; overflow: hidden; border-radius: var(--ui-r-pill); background: var(--ui-action-soft); color: var(--ui-action-text); font-size: var(--ui-fs-card); font-weight: 700; line-height: 1; box-shadow: inset 0 0 0 var(--ui-edge) var(--ui-action-line); }
.ui-avatar--lg { width: 84px; height: 84px; font-size: var(--ui-fs-title); }
.ui-avatar img { width: 100%; height: 100%; object-fit: cover; }

.ui-badge { display: inline-flex; align-items: center; gap: 5px; max-width: 100%; padding: 4px 10px; border-radius: var(--ui-r-pill); background: var(--ui-neutral-soft); color: var(--ui-neutral); font-size: var(--ui-fs-small); font-weight: 700; line-height: 1.3; box-shadow: inset 0 0 0 var(--ui-edge) var(--ui-line); }
.ui-badge--ok { background: var(--ui-ok-soft); color: var(--ui-ok); }
.ui-badge--warn { background: var(--ui-warn-soft); color: var(--ui-warn); }
.ui-badge--info { background: var(--ui-action-soft); color: var(--ui-action-text); }
.ui-badge--danger { background: var(--ui-danger-soft); color: var(--ui-danger); }

/* ---------- avisos na tela ---------- */
.ui-notice { display: flex; align-items: flex-start; gap: 10px; padding: var(--ui-sp-3) 14px; border-radius: var(--ui-r-small); background: var(--ui-action-soft); color: var(--ui-action-text); font-size: var(--ui-fs-body); line-height: 1.35; box-shadow: inset 0 0 0 var(--ui-edge) var(--ui-line); }
.ui-notice__body { flex: 1; min-width: 0; }
.ui-notice__title { display: block; font-weight: 700; }
.ui-notice__action { margin-top: var(--ui-sp-2); }
.ui-notice--ok { background: var(--ui-ok-soft); color: var(--ui-ok); }
.ui-notice--warn { background: var(--ui-warn-soft); color: var(--ui-warn); }
.ui-notice--error { background: var(--ui-danger-soft); color: var(--ui-danger); }
.ui-linkbtn { display: inline-flex; align-items: center; gap: 6px; min-height: var(--ui-tap); padding: 0; border: 0; background: transparent; color: inherit; font-size: inherit; font-weight: 700; text-decoration: underline; text-underline-offset: 4px; }

/* avisos que aparecem por alguns segundos, no alto, para não cobrir o botão principal */
.ui-toasts { position: fixed; top: 72px; right: 0; left: 0; z-index: 70; display: grid; justify-items: center; gap: var(--ui-sp-2); padding: 0 var(--ui-sp-3); pointer-events: none; }
.ui-toasts > .ui-notice { width: 100%; max-width: calc(var(--ui-col) - 2 * var(--ui-sp-3)); pointer-events: auto; box-shadow: inset 0 0 0 var(--ui-edge) var(--ui-line), 0 8px 24px var(--ui-overlay); }

/* ---------- blocos de conteúdo ---------- */
/* Itens de grade podem ficar mais estreitos que a maior palavra: ela quebra, a tela não rola para o lado. */
.ui-stack > *,
.ui-section > *,
.ui-options > *,
.ui-cardgrid__inner > *,
.ui-footer__inner > *,
.ui-sheet__actions > * { min-width: 0; }
.ui-stack { display: grid; gap: var(--ui-sp-3); }
.ui-stack--tight { gap: var(--ui-sp-2); }
.ui-stack--loose { gap: var(--ui-sp-5); }
.ui-list { display: grid; gap: var(--ui-sp-3); margin: 0; padding: 0; list-style: none; }
.ui-list > * { min-width: 0; }
.ui-section { display: grid; gap: var(--ui-sp-3); }
.ui-section + .ui-section,
.ui-stack > .ui-section + * { margin-top: var(--ui-sp-2); }
.ui-section__title { font-size: var(--ui-fs-heading); font-weight: 700; line-height: var(--ui-lh-tight); }
.ui-text { color: var(--ui-text-2); font-size: var(--ui-fs-body); }
.ui-text--strong { color: var(--ui-text); font-weight: 700; }
.ui-loading { padding: var(--ui-sp-6) 0; color: var(--ui-text-2); font-size: var(--ui-fs-body); text-align: center; }

.ui-facts { display: grid; gap: 7px; margin: 0; padding: 0; list-style: none; }
.ui-fact { display: flex; align-items: center; gap: 9px; font-size: var(--ui-fs-body); line-height: 1.25; }
.ui-fact > svg { color: var(--ui-action-text); }
.ui-fact__text { min-width: 0; }
.ui-fact__sub { display: block; color: var(--ui-text-2); font-size: var(--ui-fs-small); }
.ui-fact b { font-weight: 700; }
.ui-facts--boxed { gap: 10px; }
.ui-facts--boxed .ui-fact { padding: var(--ui-sp-3) 14px; border: 2px solid var(--ui-card-border); border-radius: var(--ui-r-small); background: var(--ui-surface); font-size: var(--ui-fs-body-lg); }

.ui-empty { display: flex; flex: 1; flex-direction: column; align-items: center; justify-content: center; gap: var(--ui-sp-2); padding: var(--ui-sp-8) 0; text-align: center; }
.ui-empty__title { font-size: var(--ui-fs-title); font-weight: 700; line-height: var(--ui-lh-tight); }
.ui-empty__title--sm { font-size: var(--ui-fs-card); }
.ui-empty__text { max-width: 30ch; color: var(--ui-text-2); font-size: var(--ui-fs-body); }
.ui-empty__action { width: 100%; margin-top: var(--ui-sp-3); }
.ui-empty .ui-icon { margin-bottom: var(--ui-sp-3); }

.ui-success { display: flex; flex-direction: column; align-items: center; padding-top: var(--ui-sp-5); text-align: center; }
.ui-success .ui-icon { margin-bottom: 18px; }
.ui-success__title { font-size: var(--ui-fs-display); font-weight: 700; line-height: var(--ui-lh-tight); }
.ui-success__text { margin-top: 6px; color: var(--ui-text-2); font-size: var(--ui-fs-body-lg); }
.ui-success__next { margin-top: var(--ui-sp-6); }

/* ---------- linha do tempo ---------- */
.ui-timeline { display: grid; margin: 0; padding: 0; list-style: none; }
.ui-timeline__step { position: relative; display: grid; grid-template-columns: 40px 1fr; gap: var(--ui-sp-3); min-height: 66px; padding-bottom: var(--ui-sp-3); }
.ui-timeline__step::before { content: ""; position: absolute; top: 40px; bottom: 0; left: 18px; width: 4px; background: var(--ui-line); }
.ui-timeline__step:last-child { min-height: 40px; padding-bottom: 0; }
.ui-timeline__step:last-child::before { display: none; }
.ui-timeline__dot { z-index: 1; display: grid; place-items: center; width: 40px; height: 40px; border-radius: var(--ui-r-pill); background: var(--ui-neutral-soft); color: var(--ui-neutral); box-shadow: inset 0 0 0 var(--ui-edge) var(--ui-line); }
.ui-timeline__title { display: block; padding-top: 2px; font-size: var(--ui-fs-body-lg); font-weight: 700; line-height: var(--ui-lh-tight); }
.ui-timeline__text { display: block; color: var(--ui-text-2); font-size: var(--ui-fs-small); line-height: 1.3; }
.ui-timeline__step--done .ui-timeline__dot { background: var(--ui-ok); color: var(--ui-ok-soft); }
.ui-timeline__step--done::before { background: var(--ui-ok); }
.ui-timeline__step--now .ui-timeline__dot { background: var(--ui-action); color: var(--ui-on-action); box-shadow: 0 0 0 5px var(--ui-action-line); }
.ui-timeline__step--todo .ui-timeline__title { color: var(--ui-text-2); font-weight: 700; }

/* ---------- passos ---------- */
.ui-steps { display: flex; align-items: center; gap: 6px; margin-bottom: var(--ui-sp-4); }
.ui-steps__bar { flex: 1; height: 8px; border-radius: var(--ui-r-pill); background: var(--ui-line); box-shadow: inset 0 0 0 var(--ui-edge) var(--ui-line); }
.ui-steps__bar--on { background: var(--ui-action); box-shadow: none; }
.ui-steps__label { margin-left: var(--ui-sp-2); color: var(--ui-text-2); font-size: var(--ui-fs-small); font-weight: 700; white-space: nowrap; }

/* ---------- escolhas ---------- */
.ui-fieldset { min-width: 0; margin: 0; padding: 0; border: 0; }
.ui-fieldset__legend { margin-bottom: var(--ui-sp-2); padding: 0; font-size: var(--ui-fs-heading); font-weight: 700; line-height: var(--ui-lh-tight); }
.ui-options { display: grid; gap: 10px; }
.ui-option { position: relative; display: flex; align-items: center; gap: var(--ui-sp-3); min-height: 64px; padding: 10px 14px; border: 2px solid var(--ui-field-border); border-radius: var(--ui-r-control); background: var(--ui-surface); color: var(--ui-text); font-size: var(--ui-fs-body-lg); font-weight: 700; line-height: var(--ui-lh-tight); cursor: pointer; }
.ui-option__input { position: absolute; width: 1px; height: 1px; margin: 0; opacity: 0; }
.ui-option__text { flex: 1; min-width: 0; }
.ui-option__sub { display: block; margin-top: 2px; color: var(--ui-text-2); font-size: var(--ui-fs-small); font-weight: 500; }
.ui-option__check { display: grid; place-items: center; flex: none; width: 30px; height: 30px; border: 2px solid var(--ui-field-border); border-radius: var(--ui-r-pill); color: transparent; }
.ui-option:has(.ui-option__input:checked) { border-color: var(--ui-action); background: var(--ui-selected); color: var(--ui-on-selected); box-shadow: inset 0 0 0 1px var(--ui-action); }
.ui-option:has(.ui-option__input:checked) .ui-option__sub { color: inherit; }
.ui-option:has(.ui-option__input:checked) .ui-option__check { border-color: var(--ui-action); background: var(--ui-action); color: var(--ui-on-action); }
.ui-option:has(.ui-option__input:focus-visible) { outline: 3px solid var(--ui-focus); outline-offset: 2px; }
.ui-option:has(.ui-option__input:disabled) { background: var(--ui-disabled); color: var(--ui-on-disabled); cursor: not-allowed; }
.ui-option--tile { flex-direction: column; justify-content: center; gap: var(--ui-sp-2); min-height: 96px; padding: 10px 8px; font-size: var(--ui-fs-body); text-align: center; }
.ui-option--tile .ui-option__check { position: absolute; top: 6px; right: 6px; width: 24px; height: 24px; }
.ui-option--tile .ui-option__text { flex: none; }

.ui-chips { display: flex; flex-wrap: wrap; gap: 9px; margin: 0; padding: 0; border: 0; }
.ui-chip { display: inline-flex; align-items: center; gap: 7px; min-width: 0; max-width: 100%; min-height: var(--ui-tap); padding: 6px 16px; text-align: left; border: 2px solid var(--ui-field-border); border-radius: var(--ui-r-pill); background: var(--ui-surface); color: var(--ui-text); font-size: var(--ui-fs-body); font-weight: 700; line-height: var(--ui-lh-tight); }
.ui-chip[aria-pressed="true"] { border-color: var(--ui-action); background: var(--ui-action); color: var(--ui-on-action); }

.ui-toggle { display: flex; align-items: center; gap: var(--ui-sp-3); width: 100%; min-height: 72px; padding: var(--ui-sp-3) 14px; border: 2px solid var(--ui-card-border); border-radius: var(--ui-r-card); background: var(--ui-surface); color: var(--ui-text); text-align: left; }
.ui-toggle__text { flex: 1; min-width: 0; }
.ui-toggle__label { display: block; font-size: var(--ui-fs-body-lg); font-weight: 700; line-height: var(--ui-lh-tight); }
.ui-toggle__sub { display: block; margin-top: 2px; color: var(--ui-text-2); font-size: var(--ui-fs-small); line-height: 1.3; }
.ui-toggle__track { position: relative; flex: none; width: 56px; height: 32px; border-radius: var(--ui-r-pill); background: var(--ui-toggle-off); box-shadow: inset 0 0 0 var(--ui-edge) var(--ui-line); transition: background-color 150ms ease; }
.ui-toggle__track::after { content: ""; position: absolute; top: 3px; left: 3px; width: 26px; height: 26px; border-radius: var(--ui-r-pill); background: var(--ui-toggle-knob); transition: transform 150ms ease; }
.ui-toggle[aria-checked="true"] .ui-toggle__track { background: var(--ui-toggle-on); box-shadow: none; }
.ui-toggle[aria-checked="true"] .ui-toggle__track::after { background: var(--ui-toggle-knob-on); transform: translateX(24px); }

/* ---------- campos ---------- */
.ui-field { display: grid; gap: 7px; }
.ui-field__label { font-size: var(--ui-fs-heading); font-weight: 700; line-height: var(--ui-lh-tight); }
.ui-field__hint { color: var(--ui-text-2); font-size: var(--ui-fs-small); }
.ui-field__row { display: flex; align-items: stretch; gap: var(--ui-sp-2); }
.ui-field__row > .ui-input { flex: 1; min-width: 0; }
.ui-field__error { display: flex; align-items: flex-start; gap: var(--ui-sp-2); padding: 10px var(--ui-sp-3); border-radius: var(--ui-r-small); background: var(--ui-danger-soft); color: var(--ui-danger); font-size: var(--ui-fs-body); font-weight: 700; line-height: 1.35; box-shadow: inset 0 0 0 var(--ui-edge) var(--ui-line); }
.ui-input { width: 100%; min-height: 60px; padding: 10px var(--ui-sp-4); border: 2px solid var(--ui-field-border); border-radius: var(--ui-r-control); background: var(--ui-surface); color: var(--ui-text); font-size: var(--ui-fs-input); font-weight: 600; line-height: 1.3; }
.ui-input::placeholder { color: var(--ui-text-2); font-weight: 500; opacity: 1; }
.ui-input:focus { border-color: var(--ui-focus); outline: none; box-shadow: 0 0 0 4px var(--ui-action-line); }
.ui-input[aria-invalid="true"] { border-color: var(--ui-danger); box-shadow: 0 0 0 4px var(--ui-danger-soft); }
textarea.ui-input { min-height: 132px; resize: vertical; }

.ui-search { display: flex; align-items: center; gap: 10px; min-height: 60px; padding: 4px 6px 4px 14px; border: 2px solid var(--ui-field-border); border-radius: var(--ui-r-control); background: var(--ui-surface); color: var(--ui-text-2); }
.ui-search:focus-within { border-color: var(--ui-focus); box-shadow: 0 0 0 4px var(--ui-action-line); }
.ui-search__input { flex: 1; min-width: 0; min-height: var(--ui-tap); padding: 0; border: 0; background: transparent; color: var(--ui-text); font-size: var(--ui-fs-body-lg); }
.ui-search__input::placeholder { color: var(--ui-text-2); opacity: 1; }
.ui-search__input:focus { outline: none; }

.ui-voice { display: inline-flex; align-items: center; gap: 6px; flex: none; min-height: var(--ui-tap); padding: 0 var(--ui-sp-3); border: 2px solid var(--ui-action-line); border-radius: var(--ui-r-pill); background: var(--ui-action-soft); color: var(--ui-action-text); font-size: var(--ui-fs-small); font-weight: 700; line-height: var(--ui-lh-tight); }
.ui-voice[aria-pressed="true"] { border-color: var(--ui-action); background: var(--ui-action); color: var(--ui-on-action); }
.ui-voice--block { min-height: 56px; padding: 0 var(--ui-sp-4); border-style: dashed; border-radius: var(--ui-r-control); }

.ui-qr { display: block; width: min(220px, 100%); height: auto; padding: var(--ui-sp-2); border: 2px solid var(--ui-card-border); border-radius: var(--ui-r-small); background: var(--ui-paper); }

/* ---------- painel que sobe de baixo ---------- */
.ui-sheet-layer { position: fixed; inset: 0; z-index: 60; display: flex; align-items: flex-end; justify-content: center; background: var(--ui-overlay); }
.ui-sheet { width: 100%; max-width: var(--ui-col); max-height: 92dvh; overflow-y: auto; padding: 10px var(--ui-sp-4) calc(18px + env(safe-area-inset-bottom, 0px)); border: 2px solid var(--ui-card-border); border-bottom: 0; border-radius: var(--ui-r-sheet) var(--ui-r-sheet) 0 0; background: var(--ui-surface); color: var(--ui-text); animation: cr-sheet-in 200ms ease-out both; }
.ui-sheet::before { content: ""; display: block; width: 46px; height: 5px; margin: 0 auto 14px; border-radius: var(--ui-r-pill); background: var(--ui-field-border); }
.ui-sheet__title { margin-bottom: 6px; font-size: var(--ui-fs-title); font-weight: 700; line-height: var(--ui-lh-tight); }
.ui-sheet__title:focus { outline: none; }
.ui-sheet__text { margin-bottom: var(--ui-sp-4); color: var(--ui-text-2); font-size: var(--ui-fs-body); }
.ui-sheet__actions { display: grid; gap: 10px; margin-top: var(--ui-sp-5); }
@keyframes cr-sheet-in { from { transform: translateY(24px); opacity: 0; } }

/* ---------- telas muito estreitas ---------- */
/*
 * 320 px com zoom de 200% deixa o conteúdo com cerca de 130 px. As peças se ajustam pela
 * largura do conteúdo (.ui-main é o contêiner), em rem, para valer também com a letra maior.
 */
@container (max-width: 15rem) {
  .ui-steps { flex-wrap: wrap; }
  .ui-steps__label { flex-basis: 100%; margin-left: 0; white-space: normal; }
  .ui-card__head,
  .ui-heading { flex-direction: column; align-items: flex-start; }
  .ui-field__row { flex-direction: column; }
  .ui-voice { align-self: flex-start; }
  .ui-search { flex-wrap: wrap; }
  .ui-search .ui-voice { flex-basis: 100%; justify-content: center; }
}
@container (max-width: 11rem) {
  .ui-bigcard,
  .ui-rowcard,
  .ui-toggle { flex-direction: column; align-items: flex-start; }
  .ui-bigcard__go,
  .ui-rowcard__go { display: none; }
  .ui-icon--lg { width: 56px; height: 56px; }
  .ui-timeline__step { grid-template-columns: 32px 1fr; gap: var(--ui-sp-2); }
  .ui-timeline__dot { width: 32px; height: 32px; }
  .ui-timeline__step::before { top: 32px; left: 14px; }
  .ui-notice { flex-direction: column; }
  .ui-option { flex-direction: column; align-items: flex-start; }
  .ui-option .ui-option__text { flex: none; max-width: 100%; padding-right: 0; }
  .ui-option__check { position: absolute; top: 6px; right: 6px; width: 24px; height: 24px; }
  .ui-input { padding-inline: var(--ui-sp-2); }
}
/* O topo e o rodapé não estão dentro do contêiner: seguem a largura da janela. */
@media (max-width: 15rem) {
  .ui-topbar { padding-inline: var(--ui-sp-2); }
  .ui-topbtn { padding: 0 var(--ui-sp-2); }
  .ui-topbtn > svg { display: none; }
  .ui-footer { padding-inline: var(--ui-sp-2); }
  .ui-btn { padding-inline: var(--ui-sp-2); }
  .ui-main { padding-inline: var(--ui-sp-2); }
  .ui-sheet { padding-inline: var(--ui-sp-2); }
}


/* Lista ampla: o mesmo conteúdo e os mesmos três filtros em qualquer tela. */
.ui-catalog { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ui-sp-5); }
.ui-catalog > * { min-width: 0; }
.ui-catalog__body { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ui-sp-5); }
.ui-catalog__filters { display: grid; align-content: start; gap: var(--ui-sp-3); min-width: 0; }
.ui-catalog__results { min-width: 0; }
.ui-catalog__summary { color: var(--ui-text-2); font-size: var(--ui-fs-small); scroll-margin-top: 7rem; }
.ui-catalog__summary:focus { outline: none; }
.ui-catalog__pagination { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--ui-sp-3); padding-top: var(--ui-sp-3); border-top: 1px solid var(--ui-line); }
.ui-catalog__pagination > span { color: var(--ui-text-2); font-weight: 700; }
.ui-catalog__pagination .ui-btn { flex: 0 1 auto; }
.ui-catalog-item > .ui-card { height: 100%; }

@container (max-width: 26rem) {
  .ui-catalog__pagination > span { flex-basis: 100%; order: -1; text-align: center; }
  .ui-catalog__pagination .ui-btn { flex: 1 1 7rem; }
}

/* Em rem, o layout volta a empilhar quando a pessoa aumenta a letra. */
@container (min-width: 56rem) {
  .ui-catalog__body { grid-template-columns: 14rem minmax(0, 1fr); gap: var(--ui-sp-8); align-items: start; }
  .ui-catalog__filters { padding: var(--ui-sp-5); border: 2px solid var(--ui-card-border); border-radius: var(--ui-r-card); background: var(--ui-surface); }
  .ui-catalog__filters .ui-chips { display: grid; }
  .ui-catalog__filters .ui-chip { justify-content: flex-start; width: 100%; }
  .ui-catalog-item > .ui-card { padding: var(--ui-sp-5); }
  .ui-catalog-item .ui-card__title { font-size: 1.375rem; }
}

@container (min-width: 68rem) {
  .ui-catalog-item > .ui-card { grid-template-columns: minmax(0, 1fr) minmax(16rem, 0.75fr); align-items: center; gap: var(--ui-sp-6); }
  .ui-catalog-item .ui-facts { padding-left: var(--ui-sp-5); border-left: 1px solid var(--ui-line); }
}


.ui-profile,
.ui-profile__menu { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--ui-sp-3); min-width: 0; }
.ui-profile { margin-top: var(--ui-sp-3); }
.ui-profile > *,
.ui-profile__menu > * { min-width: 0; }

@container (min-width: 56rem) {
  .ui-profile__menu { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--ui-sp-5); }
  .ui-profile .ui-rowcard { min-height: 96px; padding: var(--ui-sp-5); }
  .ui-profile .ui-rowcard__title { font-size: 1.375rem; }
  .ui-profile .ui-icon--sm { width: 56px; height: 56px; }
  .ui-profile .ui-icon--sm > svg { width: 40px; height: 40px; }
}


@container (min-width: 56rem) {
  .ui-notification-item > .ui-card { grid-template-columns: minmax(0, 1fr) minmax(15rem, 20rem); align-items: center; gap: var(--ui-sp-3) var(--ui-sp-6); padding: var(--ui-sp-5); }
  .ui-notification-item .ui-card__head { grid-row: span 2; }
  .ui-notification-item .ui-card__title { font-size: 1.375rem; }
}


.ui-video { display: block; width: 100%; aspect-ratio: 16 / 9; height: auto; border: 2px solid var(--ui-line); border-radius: var(--ui-r-card); background: var(--ui-surface-2); }
.ui-content-list { padding-left: var(--ui-sp-6); color: var(--ui-text); overflow-wrap: anywhere; }
.ui-content-list li + li { margin-top: var(--ui-sp-3); }


.ui-cover { display: block; width: 100%; max-height: 18rem; object-fit: cover; border-radius: var(--ui-r-card); border: 2px solid var(--ui-card-border); }


.ui-details { border: 2px solid var(--ui-card-border); border-radius: var(--ui-r-control); background: var(--ui-surface); padding: var(--ui-sp-3); }
.ui-details summary { min-height: var(--ui-tap); display: flex; align-items: center; color: var(--ui-action-text); font-weight: 700; cursor: pointer; }
.ui-details[open] summary { margin-bottom: var(--ui-sp-3); }
.ui-photo { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: var(--ui-sp-4); color: var(--ui-action-text); }
.ui-file-name { overflow-wrap: anywhere; }


/* Amostras de "A" para os três tamanhos de letra. Seguem as variáveis de tokens.css. */
.ui-font-sample { font-weight: 700; line-height: 1; }
.ui-font-sample--1 { font-size: var(--ui-fs-body); }
.ui-font-sample--2 { font-size: var(--ui-fs-card); }
.ui-font-sample--3 { font-size: var(--ui-fs-title); }


/* O exemplo HTML contém as duas posições do menu; o controlador pode renderizar só uma. */
.ui-tabbar--top { display: none; }
.ui-brand--desktop { display: none; }
@media (min-width: 1100px) {
  .ui-tabbar--top { display: flex; }
  .ui-tabbar--bottom { display: none; }
  .ui-brand--desktop { display: flex; }
}
/* Estados explicitados para a implementação de destino. */
.ui-input:disabled,
.ui-search:has(.ui-search__input:disabled) {
  background: var(--ui-disabled); color: var(--ui-on-disabled);
}
.ui-toggle[aria-disabled="true"] {
  background: var(--ui-disabled); color: var(--ui-on-disabled); cursor: not-allowed;
}
@media (prefers-reduced-motion: reduce) {
  .ui-btn:active { transform: none; }
}
/* Pular para o conteúdo: aparece ao receber foco */
.ui-skip { position: absolute; left: -999px; top: 8px; z-index: 80; display: inline-flex; align-items: center; min-height: var(--ui-tap); padding: 0 var(--ui-sp-4); background: var(--ui-surface); color: var(--ui-action-text); font-weight: 700; }
.ui-skip:focus { left: 8px; }
/* Ícones Phosphor Duotone dentro de texto e de abas */
.ui-tab__pill svg { width: 24px; height: 24px; }
.ui-chip svg, .ui-topbtn svg, .ui-option__check svg { width: 1.125em; height: 1.125em; vertical-align: -.15em; }
/* Altura até 480px (zoom de 400%): tudo o que é fixo rola junto */
@media (max-height: 480px) {
  .ui-topbar, .ui-footer, .ui-tabbar { position: static; }
}
```

## 6. Componentes

### 6.1 Barra superior e menu

**Barra superior:** nome ou logotipo nas telas de entrada; retorno textual nas telas internas, acompanhado da marca no desktop quando houver espaço. À direita ficam “Ouvir” e avisos pertinentes. Em tela interna móvel, o aviso pode sair do topo para preservar o espaço de “Voltar” e “Ouvir”.

**Menu móvel:** quatro links com desenho acima do rótulo. O escolhido recebe pílula atrás do desenho e cor de texto de seleção. **Menu desktop:** os mesmos quatro links, horizontais, dentro do topo. O escolhido recebe fundo no item inteiro.

**Contador:** pequeno, circular e com nome acessível completo. O valor visual pode ser limitado, mas o nome deve informar a quantidade real quando conhecida. Não transforme uma contagem em promessa de evento que ainda não foi recebido.

### 6.2 Botão

| Variante | Uso | Aparência |
| --- | --- | --- |
| `primary` | Próxima ação da tarefa | Fundo de ação, texto do par correspondente |
| `secondary` | Alternativa ou revisão | Superfície, borda de ação, texto de ação |
| `quiet` | Ação discreta | Texto sublinhado, sem preenchimento |
| `danger` | Ação destrutiva definida pelo produto | Superfície, borda e texto de erro |
| `contact` | Canal externo opcional | Par verde de contato da paleta padrão |
| `inline` | Modificador de largura | Largura do conteúdo, conservando o alvo de toque |

Use um botão primário por etapa ou tarefa. A navegação usa links; executar uma ação local usa botão. Enquanto uma ação estiver em andamento, bloqueie o envio e mostre uma palavra como “Salvando…”. O resultado da operação fica em aviso ou tela de conclusão.

O estado desabilitado é distinto do estado em andamento: os dois bloqueiam a ação, e o segundo também informa atividade. Um link desabilitado exige bloquear a navegação no controlador; o atributo visual sozinho não faz isso.

### 6.3 Cartões de intenção, categoria e linha

**Cartão de intenção (`ui-bigcard`):** desenho à esquerda, título e uma frase no centro, seta de avanço à direita. Toda a área é um único link ou botão. Use a versão `tile` na grade de categorias, com o desenho acima do texto.

**Cartão de atenção (`highlight`):** preenchido com o par de destaque e texto curto sobre uma pendência. **Cartão de ênfase (`emphasis`):** fundo suave de ação, mantendo título e apoio legíveis. A escolha entre ambos depende do papel da informação, não de alternância decorativa.

**Linha clicável (`ui-rowcard`):** avatar ou ícone, título, apoio, selo ou contador opcional e indicação de avanço. Serve a conta, histórico, conteúdo e lista de pessoas.

**Cartão de conteúdo (`ui-card`):** título, identificação, fatos e ações secundárias. Quando o título abre o detalhe, estenda a área do link ao cartão e mantenha os demais controles acima dessa área. Não aninhe um botão dentro de outro botão ou link.

### 6.4 Fatos e identificação

Fatos aparecem em lista, cada um com ícone e valor. Dê destaque ao valor necessário à escolha. Local, prazo, quantidade ou preço são exemplos; preserve apenas os dados pertinentes ao produto.

No detalhe, os fatos podem usar caixas individuais. Na lista ampla, distribua-os ao lado da identificação conforme a receita de catálogo. Um fato desconhecido deve permanecer desconhecido; não use zero, “gratuito” ou “disponível” como substituto automático.

Avatar de foto usa recorte circular e `object-fit: cover`. Sem foto, use iniciais calculadas a partir de um nome de exibição. O avatar não substitui o nome escrito.

### 6.5 Selos, avisos e mensagens temporárias

**Selo:** texto curto de situação, com ícone opcional e fundo semântico. **Aviso de página:** ícone, título opcional, mensagem e ação pertinente. **Mensagem temporária:** mesmo aviso em camada acima do conteúdo, próximo ao topo, com controle de fechamento.

Informação necessária à tarefa deve estar disponível na própria tela ou no histórico adequado. Não dependa exclusivamente de uma mensagem que desaparece. Evite acumular mensagens idênticas durante tentativas repetidas.

Erro precisa dizer o que aconteceu e a próxima ação: “Não deu para abrir. Confira a conexão e tente de novo.” O texto final deve refletir a causa conhecida, sem inventá-la.

### 6.6 Busca e filtros

Busca é uma superfície com lupa, campo e atalho de voz opcional. O campo pode ter rótulo visualmente oculto, desde que mantenha nome acessível. Os demais campos têm label visível.

Filtros rápidos usam `ui-chip`, com texto, estado pressionado e marca de seleção. Eles quebram linha; não introduza rolagem horizontal obrigatória. No catálogo amplo, os mesmos filtros ficam na lateral. Mudar busca ou filtro reinicia a paginação.

**Paginação:** controles Anterior e Próxima, identificação da página e faixa dos itens exibidos. O catálogo da origem utiliza páginas de seis itens; esse tamanho pode ser adotado como configuração inicial, sem transformá-lo em regra funcional universal. Se o contrato fornecer total e última página, mostre-os. Sem total, não invente “de N”; use a página e a faixa conhecidas.

Ao trocar de página, preserve busca e filtros, indique carregamento e leve a leitura ao resumo dos resultados. A escolha de persistir filtros na URL ou na sessão depende dos dados do destino; não coloque informação sensível em um endereço compartilhável.

### 6.7 Campos e arquivo

Cada campo reúne label, dica opcional, controle e erro associado. Use `aria-describedby` para dica e erro e `aria-invalid` quando houver falha. O erro traz texto, símbolo e cor.

- Texto curto e textarea seguem a mesma moldura. O textarea permite crescimento vertical.
- Telefone, moeda e identificadores usam teclado e formatação compatíveis com o destino. Máscara não equivale a validação de negócio.
- O atalho “Falar” pode ficar ao lado do campo; na textarea, abaixo. Digitação continua disponível.
- Arquivo usa botão rotulado, instrução de tipo e limite real, nome do arquivo escolhido e retorno de validação.
- O seletor nativo de arquivo continua sendo usado pelo controlador. A composição não envia o arquivo automaticamente.
- Falha de envio conserva o conteúdo e permite nova tentativa. O tratamento de dados e a política correspondente pertencem ao produto.

### 6.8 Opções e interruptor

**Opção:** radio ou checkbox nativo dentro de um cartão de escolha. O cartão inteiro é o rótulo. O estado escolhido combina contorno, fundo e marca; o grupo usa `fieldset` e `legend`. Se a pergunta já for o título, a legenda pode ficar visualmente oculta.

**Interruptor:** linha com título, explicação opcional e trilho. Use papel `switch` e `aria-checked`, ou um controle nativo equivalente. O trilho se desloca e muda de cor. Não use interruptor para executar uma operação que precise de confirmação antes de ocorrer.

### 6.9 Progresso, linha do tempo e conclusão

**Barra de etapas:** segmentos preenchidos e texto “Passo n de total”. Os segmentos são decorativos; o texto informa o progresso. No limite estreito, o texto quebra para outra linha.

**Linha do tempo:** marcadores conectados e três papéis visuais: feito, atual e futuro. Cada etapa tem título e apoio. Use nomes reais do processo e não acrescente uma transição que o backend não informou.

**Conclusão:** desenho central, título de resultado, uma frase dizendo o que ocorreu, explicação breve do próximo passo e ação para continuar. O resultado só aparece depois da confirmação correspondente.

### 6.10 Painel sobreposto

O `ui-sheet` sobe da borda inferior, com fundo de véu, cantos superiores arredondados, indicador de pega, título, conteúdo e até duas ações. Continua limitado à largura própria do painel no desktop.

O controlador deve fornecer nome de diálogo, `aria-modal`, foco inicial no título, contenção do Tab, fechamento com Escape e retorno ao controle que abriu. Enquanto aberto, o conteúdo de fundo fica indisponível à interação e à navegação assistiva. Não dependa somente do véu visual. Clique fora só fecha quando a tarefa permitir descartar a abertura sem perder dados.

### 6.11 Mídia e conteúdo expansível

Vídeo usa caixa na proporção da receita, título acessível, controles pertinentes e uma alternativa quando o player não abrir. Aulas ou partes aparecem como linhas com título e estado atual. Um serviço externo disponível para incorporar vídeo precisa ser confirmado no destino.

Imagem de catálogo é opcional, com largura do conteúdo, altura limitada e recorte conforme a receita. Texto alternativo depende do significado da imagem. Conteúdo expansível usa `details` e `summary`, com texto de abertura compreensível.

### 6.12 Estados dos componentes

As regras abaixo completam a especificação de estados. A origem mantém o hover discreto; reproduza a geometria e os pares de cor da variante.

| Família | Padrão e hover | Foco | Pressionado ou escolhido | Desabilitado | Erro ou falha |
| --- | --- | --- | --- | --- | --- |
| Botão e link de ação | Mantém a variante; cursor indica ação; texto continua legível | Anel global; no cartão, envolve a área clicável | Botão desloca conforme a receita; seleção usa o par de ação | Par desabilitado; bloqueio real no controlador | Aviso próximo; rótulo e dados conservados |
| Cartão clicável | Superfície e indicação de avanço; sem mudança de tamanho no hover | Contorno do cartão inteiro | Destino abre pela mesma área; não cria seleção sem necessidade | Somente quando houver causa funcional e explicação | Aviso de leitura ou indisponibilidade |
| Campo e busca | Superfície e borda de campo; hover conserva a moldura | Borda de foco e anel externo da receita | Digitação conserva valor; busca anuncia resultado | Controle nativo desabilitado com motivo pertinente | Borda, mensagem associada e símbolo |
| Chip e opção | Texto e borda visíveis | Anel no alvo inteiro | Marca, estado acessível, fundo e contorno de seleção | Interação bloqueada; texto ainda identificável | Erro do grupo associado à legenda ou ao campo |
| Interruptor | Trilho, título e apoio | Anel no controle | `aria-checked` e posição da pega | Estado e motivo legíveis | Reverte ou informa falha conforme o contrato |
| Etapas e timeline | Informação de progresso, sem hover de controle | Só recebe foco se for controle real | Etapa atual e feita com texto correspondente | Não aplicável a indicador puramente informativo | Processo interrompido vira estado textual real |
| Selo, aviso e vazio | Informação; sem cursor de ação quando não houver ação | Apenas links e botões internos | Sem seleção artificial | Não aplicável à mensagem | A própria mensagem apresenta a falha |
| Painel | Véu e superfície; conteúdo com rolagem própria | Contido no diálogo e devolvido ao fechar | Controle mantém seu estado usual | Botão de envio bloqueado durante a operação | Mensagem no painel; conserva respostas |

## 7. Modelos de tela

### 7.1 Entrada sem conta

**Ordem:** topo com marca, escuta e acesso às preferências; pergunta de intenção; frase curta; cartões de intenção; rodapé com entrar e criar conta.

Use uma coluna contínua de cartões. A ordem expressa a prioridade do público. A autenticação abre depois da intenção quando esse for o fluxo do produto. Preserve o destino necessário ao retorno usando a integração real.

### 7.2 Início com conta

**Ordem:** saudação; pendência concreta, se houver; grade de categorias; uma seção de atividade atual ou tarefas publicadas; avisos pertinentes.

Para outro perfil, mantenha a moldura e os quatro destinos principais. Troque os blocos por suas tarefas: publicar, consultar interessados, acompanhar itens ou ver recursos. Não use dados fictícios para preencher uma pendência real.

### 7.3 Catálogo com filtros

**Ordem:** título; busca; corpo com filtros e resultados; resumo de página; lista contínua de cartões; paginação.

No desktop amplo, filtros ficam na lateral e fatos podem ocupar a segunda área do cartão. No celular, tudo empilha. O catálogo continua sendo uma lista de leitura, sem virar um mosaico de painéis administrativos.

### 7.4 Detalhe de item

**Ordem:** retorno; título com desenho e identificação; fatos em caixas ou lista; descrição; situação pertinente; ação principal no rodapé.

A ação depende do estado: solicitar, continuar, abrir acompanhamento ou outra ação real. Item encerrado explica a situação; item inexistente oferece retorno; falha de leitura permite tentar novamente.

### 7.5 Acompanhamento e detalhe do processo

**Lista:** título e linhas com item, contexto e situação. Se houver dois papéis de atuação, use seções como “Meus pedidos” e “Itens que publiquei”, com nomes adaptados.

**Detalhe:** identificação do item; linha do tempo; explicação do que acontece agora; retorno ao item e ações permitidas. O estado pode continuar aberto, estar concluído ou ter sido encerrado. Escreva o que foi confirmado.

### 7.6 Avisos

**Ordem:** título; explicação de retenção apenas quando definida; lista de avisos; ação contextual por item; ação de apagar ou arquivar apenas se disponível no produto.

Aviso novo usa destaque e identificação textual. No desktop, ações ficam ao lado do texto; no celular, abaixo. Uma página sem avisos usa estado vazio e atalho útil. A política de retenção da origem não é herdada.

### 7.7 Conta e preferências

**Conta:** linha de identificação em destaque; opções de dados, documento ou resumo, aparência, segurança, perfis adicionais pertinentes e saída. No desktop, o menu de opções utiliza duas colunas.

**Preferências:** três opções de letra com amostra; três temas com amostra; interruptor para acompanhar o sistema; recursos opcionais de áudio e acessibilidade. Mostre o estado escolhido sem exigir interpretação apenas da cor.

### 7.8 Formulário por etapas

**Ordem:** retorno; progresso textual e visual; pergunta como título; apoio curto; opções ou campos; erros próximos; ação de avanço no rodapé.

O fluxo pode servir a perfil, anúncio, recurso, conteúdo, estabelecimento ou qualquer objeto equivalente. O número de etapas vem dos campos reais. A última etapa resume respostas e oferece pontos de revisão antes da ação final.

Campos opcionais devem dizer “Se quiser” ou equivalente quando isso ajudar. Permita continuar sem foto se ela for opcional. Um endereço pode abrir uma sequência secundária de perguntas em vez de aumentar a complexidade da revisão.

### 7.9 Diretório e contato

**Escolha de categoria:** pergunta, grade de categorias e alternativa para ver tudo. **Lista de pessoas ou recursos:** busca, filtro pertinente, cartões com identificação, fatos e contato. **Detalhe:** identificação, descrição, localização ou contexto e ação de contato.

O canal externo é opcional. Endereço, horário e dados de contato só aparecem quando a regra de exposição do destino permitir. O layout não define essas permissões.

### 7.10 Conteúdo, aulas e materiais

**Catálogo:** busca e linhas de conteúdo com título e autor ou organização. **Detalhe:** título, mídia ou alternativa, descrição, partes ou aulas, conteúdo em lista e ação para a próxima parte. Reações e contagens só entram quando existirem.

A criação de conteúdo reutiliza o formulário por etapas. Tipo de URL, número de vídeos, limite de arquivo e campos exigidos vêm do contrato funcional.

### 7.11 Plano, habilitação e segurança opcionais

**Plano:** identificação do plano, situação, escolhas reais e ação de prosseguir. **Habilitação de perfil:** explicação do que muda e confirmação pertinente. **Segurança:** situação atual, explicação legível e ação para configurar.

Uma configuração com código visual preserva `--ui-paper` e traz passos textuais. Esses modelos não definem preço, elegibilidade, credenciais, pagamento ou política de autenticação. Não acrescente essas jornadas a um produto que não precise delas.

### 7.12 Indicadores simples

Use título, ação de carregar ou atualizar, linhas com valor e descrição e agrupamento pertinente. O sistema observado tem indicadores simples em linhas; mapas, gráficos, agenda e tabelas analíticas extensas exigem uma especificação própria caso o destino os solicite.

### 7.13 Matriz de estados das telas

| Estado | O que aparece | O que permanece possível |
| --- | --- | --- |
| Carregando | Mensagem curta ligada à tarefa; região ocupada de forma estável | Navegação pertinente e cancelamento quando houver |
| Vazio inicial | Ícone, título, explicação de quando surgirá conteúdo e próxima ação | Iniciar a tarefa ou explorar alternativa |
| Busca sem resultado | Busca e filtros conservados; mensagem específica | Limpar ou mudar filtros |
| Erro de leitura | Aviso explícito e “Tentar de novo” | Repetir a leitura e voltar |
| Erro de gravação | Mensagem próxima à ação, respostas conservadas | Corrigir ou tentar novamente |
| Enviando | Rótulo em andamento, bloqueio de duplicidade e anúncio acessível | Ler o que está acontecendo |
| Sucesso | Resultado confirmado e próximo passo | Continuar, consultar ou voltar |
| Sem acesso ou requisito pendente | Explicação compatível com a autorização real | Voltar ou resolver o requisito quando permitido |
| Item encerrado ou indisponível | Situação textual, ação coerente com ela | Consultar histórico ou explorar alternativa |
| Sem conexão | Faixa de conectividade e mensagem contextual de falha, se ocorrer | Retomar quando a conexão voltar; sem promessa de modo offline completo |

## 8. Movimento e recursos assistivos

O movimento tem função de resposta: pressionar botão, deslocar a pega do interruptor e apresentar o painel inferior. As durações e curvas estão nas receitas. Não anime a posição de listas, títulos ou fatos ao carregar dados.

Com `prefers-reduced-motion: reduce`, elimine animações e transições desnecessárias e mantenha a troca imediata de estado. Um indicador textual continua informando a operação. Não use brilho contínuo ou animação decorativa para substituir informação.

**Ouvir:** lê o conteúdo relevante da tela e oferece estado de interrupção. **Falar:** transcreve para um campo existente, quando a plataforma oferecer suporte. **Leitura automática:** preferência explícita, desligável. **Tradução assistiva opcional:** depende da integração escolhida e deve informar sua necessidade de conexão, quando houver.

A presença visual desses controles não comprova suporte do navegador, permissão de microfone, qualidade da transcrição ou funcionamento de um serviço externo. A aplicação de destino deve conectar e validar cada recurso que oferecer.

## 9. Acessibilidade

**Meta da aplicação de destino: WCAG 2.2 AA.** O guia fornece pares de cor calculados e regras de implementação. A inspeção da origem não constitui uma certificação de acessibilidade de todas as jornadas.

### 9.1 Contraste calculado

As tabelas usam luminância relativa sRGB: converter cada canal para 0–1; usar `c / 12,92` quando `c <= 0,04045` e `((c + 0,055) / 1,055)^2,4` nos demais casos; combinar com pesos 0,2126, 0,7152 e 0,0722; calcular `(Lmaior + 0,05) / (Lmenor + 0,05)`.

O limite adotado é 4,5:1 para os pares de texto e 3:1 para ícone informativo, contorno de campo, foco e estado de controle. As razões são arredondadas apenas para exibição; o resultado usa o valor sem arredondamento. Nomes das categorias foram neutralizados conforme os tokens.

#### Claro

| Uso e fundo | Texto ou traço | Fundo | Razão | Critério | Resultado |
| --- | --- | --- | --- | --- | --- |
| Texto principal sobre `--ui-bg` | `#111a20` | `#f3f6f8` | 16,23:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-bar` | `#111a20` | `#ffffff` | 17,61:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-surface` | `#111a20` | `#ffffff` | 17,61:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-surface-2` | `#111a20` | `#edf2f5` | 15,62:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-bg` | `#384249` | `#f3f6f8` | 9,47:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-bar` | `#384249` | `#ffffff` | 10,28:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-surface` | `#384249` | `#ffffff` | 10,28:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-surface-2` | `#384249` | `#edf2f5` | 9,11:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-bg` | `#014261` | `#f3f6f8` | 9,91:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-bar` | `#014261` | `#ffffff` | 10,75:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-surface` | `#014261` | `#ffffff` | 10,75:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-surface-2` | `#014261` | `#edf2f5` | 9,53:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-action-soft` | `#014261` | `#e7f3fc` | 9,54:1 | Texto 4,5 | Passa |
| Botão primário sobre `--ui-action` | `#ffffff` | `#025e88` | 7,10:1 | Texto 4,5 | Passa |
| Destaque sobre `--ui-highlight` | `#ffffff` | `#025e88` | 7,10:1 | Texto 4,5 | Passa |
| Opção escolhida sobre `--ui-selected` | `#014261` | `#e7f3fc` | 9,54:1 | Texto 4,5 | Passa |
| Menu escolhido sobre `--ui-tab-active` | `#025e88` | `#e7f3fc` | 6,29:1 | Texto 4,5 | Passa |
| Desabilitado sobre `--ui-disabled` | `#4b565d` | `#e4e8ea` | 6,11:1 | Texto 4,5 | Passa |
| Sucesso sobre `--ui-ok-soft` | `#0a554f` | `#d9f5ee` | 7,52:1 | Texto 4,5 | Passa |
| Aviso sobre `--ui-warn-soft` | `#7c3a03` | `#f9f5c8` | 7,68:1 | Texto 4,5 | Passa |
| Erro sobre `--ui-danger-soft` | `#8f1616` | `#fee2df` | 7,48:1 | Texto 4,5 | Passa |
| Neutro sobre `--ui-neutral-soft` | `#384249` | `#e4e8ea` | 8,33:1 | Texto 4,5 | Passa |
| Contagem sobre `--ui-count` | `#ffffff` | `#b42b01` | 6,39:1 | Texto 4,5 | Passa |
| Contato opcional sobre `--ui-contact` | `#06281c` | `#25d366` | 7,97:1 | Texto 4,5 | Passa |
| Ícone 1 sobre `--ui-bg` | `#025e88` | `#f3f6f8` | 6,54:1 | UI 3,0 | Passa |
| Ícone 1 sobre `--ui-surface` | `#025e88` | `#ffffff` | 7,10:1 | UI 3,0 | Passa |
| Ícone 2 sobre `--ui-bg` | `#8a4b00` | `#f3f6f8` | 6,27:1 | UI 3,0 | Passa |
| Ícone 2 sobre `--ui-surface` | `#8a4b00` | `#ffffff` | 6,80:1 | UI 3,0 | Passa |
| Ícone 3 sobre `--ui-bg` | `#077674` | `#f3f6f8` | 5,02:1 | UI 3,0 | Passa |
| Ícone 3 sobre `--ui-surface` | `#077674` | `#ffffff` | 5,45:1 | UI 3,0 | Passa |
| Ícone 4 sobre `--ui-bg` | `#9f1640` | `#f3f6f8` | 7,27:1 | UI 3,0 | Passa |
| Ícone 4 sobre `--ui-surface` | `#9f1640` | `#ffffff` | 7,89:1 | UI 3,0 | Passa |
| Ícone neutro sobre `--ui-bg` | `#384249` | `#f3f6f8` | 9,47:1 | UI 3,0 | Passa |
| Ícone neutro sobre `--ui-surface` | `#384249` | `#ffffff` | 10,28:1 | UI 3,0 | Passa |
| Borda de campo sobre `--ui-bg` | `#7d8991` | `#f3f6f8` | 3,30:1 | UI 3,0 | Passa |
| Borda de campo sobre `--ui-surface` | `#7d8991` | `#ffffff` | 3,58:1 | UI 3,0 | Passa |
| Borda de campo sobre `--ui-surface-2` | `#7d8991` | `#edf2f5` | 3,18:1 | UI 3,0 | Passa |
| Foco sobre `--ui-bg` | `#025e88` | `#f3f6f8` | 6,54:1 | UI 3,0 | Passa |
| Foco sobre `--ui-bar` | `#025e88` | `#ffffff` | 7,10:1 | UI 3,0 | Passa |
| Foco sobre `--ui-surface` | `#025e88` | `#ffffff` | 7,10:1 | UI 3,0 | Passa |
| Foco sobre `--ui-surface-2` | `#025e88` | `#edf2f5` | 6,29:1 | UI 3,0 | Passa |
| Interruptor desligado sobre `--ui-toggle-off` | `#ffffff` | `#7d8991` | 3,58:1 | UI 3,0 | Passa |
| Interruptor ligado sobre `--ui-toggle-on` | `#ffffff` | `#077674` | 5,45:1 | UI 3,0 | Passa |
| Texto principal sobre `--ui-action-soft` | `#111a20` | `#e7f3fc` | 15,62:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-ok-soft` | `#111a20` | `#d9f5ee` | 15,30:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-action-soft` | `#384249` | `#e7f3fc` | 9,11:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-ok-soft` | `#384249` | `#d9f5ee` | 8,93:1 | Texto 4,5 | Passa |
| Ação de erro sobre `--ui-bg` | `#8f1616` | `#f3f6f8` | 8,43:1 | Texto 4,5 | Passa |
| Ação de erro sobre `--ui-surface` | `#8f1616` | `#ffffff` | 9,15:1 | Texto 4,5 | Passa |
| Ação de erro sobre `--ui-surface-2` | `#8f1616` | `#edf2f5` | 8,12:1 | Texto 4,5 | Passa |
| Foco em superfície semântica sobre `--ui-action-soft` | `#025e88` | `#e7f3fc` | 6,29:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-ok-soft` | `#025e88` | `#d9f5ee` | 6,17:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-warn-soft` | `#025e88` | `#f9f5c8` | 6,39:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-danger-soft` | `#025e88` | `#fee2df` | 5,80:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-neutral-soft` | `#025e88` | `#e4e8ea` | 5,75:1 | UI 3,0 | Passa |

#### Escuro

| Uso e fundo | Texto ou traço | Fundo | Razão | Critério | Resultado |
| --- | --- | --- | --- | --- | --- |
| Texto principal sobre `--ui-bg` | `#eef1f5` | `#0e1014` | 16,81:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-bar` | `#eef1f5` | `#14171d` | 15,84:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-surface` | `#eef1f5` | `#1b2028` | 14,44:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-surface-2` | `#eef1f5` | `#232a34` | 12,76:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-bg` | `#aeb7c4` | `#0e1014` | 9,40:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-bar` | `#aeb7c4` | `#14171d` | 8,86:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-surface` | `#aeb7c4` | `#1b2028` | 8,08:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-surface-2` | `#aeb7c4` | `#232a34` | 7,14:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-bg` | `#7fd4f8` | `#0e1014` | 11,49:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-bar` | `#7fd4f8` | `#14171d` | 10,83:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-surface` | `#7fd4f8` | `#1b2028` | 9,87:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-surface-2` | `#7fd4f8` | `#232a34` | 8,73:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-action-soft` | `#7fd4f8` | `#0f3346` | 8,01:1 | Texto 4,5 | Passa |
| Botão primário sobre `--ui-action` | `#03131b` | `#2bb5ee` | 8,04:1 | Texto 4,5 | Passa |
| Destaque sobre `--ui-highlight` | `#ffffff` | `#9b2f93` | 6,52:1 | Texto 4,5 | Passa |
| Opção escolhida sobre `--ui-selected` | `#7fd4f8` | `#0f3346` | 8,01:1 | Texto 4,5 | Passa |
| Menu escolhido sobre `--ui-tab-active` | `#03131b` | `#2bb5ee` | 8,04:1 | Texto 4,5 | Passa |
| Desabilitado sobre `--ui-disabled` | `#aeb7c4` | `#232a34` | 7,14:1 | Texto 4,5 | Passa |
| Sucesso sobre `--ui-ok-soft` | `#74e3a3` | `#10391f` | 8,15:1 | Texto 4,5 | Passa |
| Aviso sobre `--ui-warn-soft` | `#f5c451` | `#3f3011` | 7,85:1 | Texto 4,5 | Passa |
| Erro sobre `--ui-danger-soft` | `#ff9b9b` | `#3a1518` | 8,01:1 | Texto 4,5 | Passa |
| Neutro sobre `--ui-neutral-soft` | `#aeb7c4` | `#232a34` | 7,14:1 | Texto 4,5 | Passa |
| Contagem sobre `--ui-count` | `#2a0a0c` | `#ff9b9b` | 9,08:1 | Texto 4,5 | Passa |
| Contato opcional sobre `--ui-contact` | `#06281c` | `#25d366` | 7,97:1 | Texto 4,5 | Passa |
| Ícone 1 sobre `--ui-bg` | `#2bb5ee` | `#0e1014` | 8,11:1 | UI 3,0 | Passa |
| Ícone 1 sobre `--ui-surface` | `#2bb5ee` | `#1b2028` | 6,97:1 | UI 3,0 | Passa |
| Ícone 2 sobre `--ui-bg` | `#f2b632` | `#0e1014` | 10,44:1 | UI 3,0 | Passa |
| Ícone 2 sobre `--ui-surface` | `#f2b632` | `#1b2028` | 8,97:1 | UI 3,0 | Passa |
| Ícone 3 sobre `--ui-bg` | `#2bb35a` | `#0e1014` | 6,98:1 | UI 3,0 | Passa |
| Ícone 3 sobre `--ui-surface` | `#2bb35a` | `#1b2028` | 6,00:1 | UI 3,0 | Passa |
| Ícone 4 sobre `--ui-bg` | `#e18ada` | `#0e1014` | 8,02:1 | UI 3,0 | Passa |
| Ícone 4 sobre `--ui-surface` | `#e18ada` | `#1b2028` | 6,89:1 | UI 3,0 | Passa |
| Ícone neutro sobre `--ui-bg` | `#eef1f5` | `#0e1014` | 16,81:1 | UI 3,0 | Passa |
| Ícone neutro sobre `--ui-surface` | `#eef1f5` | `#1b2028` | 14,44:1 | UI 3,0 | Passa |
| Borda de campo sobre `--ui-bg` | `#7b8696` | `#0e1014` | 5,16:1 | UI 3,0 | Passa |
| Borda de campo sobre `--ui-surface` | `#7b8696` | `#1b2028` | 4,43:1 | UI 3,0 | Passa |
| Borda de campo sobre `--ui-surface-2` | `#7b8696` | `#232a34` | 3,92:1 | UI 3,0 | Passa |
| Foco sobre `--ui-bg` | `#7fd4f8` | `#0e1014` | 11,49:1 | UI 3,0 | Passa |
| Foco sobre `--ui-bar` | `#7fd4f8` | `#14171d` | 10,83:1 | UI 3,0 | Passa |
| Foco sobre `--ui-surface` | `#7fd4f8` | `#1b2028` | 9,87:1 | UI 3,0 | Passa |
| Foco sobre `--ui-surface-2` | `#7fd4f8` | `#232a34` | 8,73:1 | UI 3,0 | Passa |
| Interruptor desligado sobre `--ui-toggle-off` | `#ffffff` | `#7b8696` | 3,69:1 | UI 3,0 | Passa |
| Interruptor ligado sobre `--ui-toggle-on` | `#03131b` | `#2bb5ee` | 8,04:1 | UI 3,0 | Passa |
| Texto principal sobre `--ui-action-soft` | `#eef1f5` | `#0f3346` | 11,71:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-ok-soft` | `#eef1f5` | `#10391f` | 11,39:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-action-soft` | `#aeb7c4` | `#0f3346` | 6,55:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-ok-soft` | `#aeb7c4` | `#10391f` | 6,37:1 | Texto 4,5 | Passa |
| Ação de erro sobre `--ui-bg` | `#ff9b9b` | `#0e1014` | 9,44:1 | Texto 4,5 | Passa |
| Ação de erro sobre `--ui-surface` | `#ff9b9b` | `#1b2028` | 8,11:1 | Texto 4,5 | Passa |
| Ação de erro sobre `--ui-surface-2` | `#ff9b9b` | `#232a34` | 7,17:1 | Texto 4,5 | Passa |
| Foco em superfície semântica sobre `--ui-action-soft` | `#7fd4f8` | `#0f3346` | 8,01:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-ok-soft` | `#7fd4f8` | `#10391f` | 7,79:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-warn-soft` | `#7fd4f8` | `#3f3011` | 7,72:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-danger-soft` | `#7fd4f8` | `#3a1518` | 9,75:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-neutral-soft` | `#7fd4f8` | `#232a34` | 8,73:1 | UI 3,0 | Passa |

#### Alto contraste

| Uso e fundo | Texto ou traço | Fundo | Razão | Critério | Resultado |
| --- | --- | --- | --- | --- | --- |
| Texto principal sobre `--ui-bg` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-bar` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-surface` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-surface-2` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-bg` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-bar` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-surface` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-surface-2` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-bg` | `#ffd60a` | `#000000` | 14,88:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-bar` | `#ffd60a` | `#000000` | 14,88:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-surface` | `#ffd60a` | `#000000` | 14,88:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-surface-2` | `#ffd60a` | `#000000` | 14,88:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-action-soft` | `#ffd60a` | `#000000` | 14,88:1 | Texto 4,5 | Passa |
| Botão primário sobre `--ui-action` | `#000000` | `#ffd60a` | 14,88:1 | Texto 4,5 | Passa |
| Destaque sobre `--ui-highlight` | `#000000` | `#ffffff` | 21,00:1 | Texto 4,5 | Passa |
| Opção escolhida sobre `--ui-selected` | `#000000` | `#ffd60a` | 14,88:1 | Texto 4,5 | Passa |
| Menu escolhido sobre `--ui-tab-active` | `#000000` | `#ffd60a` | 14,88:1 | Texto 4,5 | Passa |
| Desabilitado sobre `--ui-disabled` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Sucesso sobre `--ui-ok-soft` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Aviso sobre `--ui-warn-soft` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Erro sobre `--ui-danger-soft` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Neutro sobre `--ui-neutral-soft` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Contagem sobre `--ui-count` | `#000000` | `#ffffff` | 21,00:1 | Texto 4,5 | Passa |
| Contato opcional sobre `--ui-contact` | `#06281c` | `#25d366` | 7,97:1 | Texto 4,5 | Passa |
| Ícone 1 sobre `--ui-bg` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Ícone 1 sobre `--ui-surface` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Ícone 2 sobre `--ui-bg` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Ícone 2 sobre `--ui-surface` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Ícone 3 sobre `--ui-bg` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Ícone 3 sobre `--ui-surface` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Ícone 4 sobre `--ui-bg` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Ícone 4 sobre `--ui-surface` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Ícone neutro sobre `--ui-bg` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Ícone neutro sobre `--ui-surface` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Borda de campo sobre `--ui-bg` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Borda de campo sobre `--ui-surface` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Borda de campo sobre `--ui-surface-2` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Foco sobre `--ui-bg` | `#ffd60a` | `#000000` | 14,88:1 | UI 3,0 | Passa |
| Foco sobre `--ui-bar` | `#ffd60a` | `#000000` | 14,88:1 | UI 3,0 | Passa |
| Foco sobre `--ui-surface` | `#ffd60a` | `#000000` | 14,88:1 | UI 3,0 | Passa |
| Foco sobre `--ui-surface-2` | `#ffd60a` | `#000000` | 14,88:1 | UI 3,0 | Passa |
| Interruptor desligado sobre `--ui-toggle-off` | `#ffffff` | `#000000` | 21,00:1 | UI 3,0 | Passa |
| Interruptor ligado sobre `--ui-toggle-on` | `#000000` | `#ffd60a` | 14,88:1 | UI 3,0 | Passa |
| Texto principal sobre `--ui-action-soft` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-ok-soft` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-action-soft` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-ok-soft` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Ação de erro sobre `--ui-bg` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Ação de erro sobre `--ui-surface` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Ação de erro sobre `--ui-surface-2` | `#ffffff` | `#000000` | 21,00:1 | Texto 4,5 | Passa |
| Foco em superfície semântica sobre `--ui-action-soft` | `#ffd60a` | `#000000` | 14,88:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-ok-soft` | `#ffd60a` | `#000000` | 14,88:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-warn-soft` | `#ffd60a` | `#000000` | 14,88:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-danger-soft` | `#ffd60a` | `#000000` | 14,88:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-neutral-soft` | `#ffd60a` | `#000000` | 14,88:1 | UI 3,0 | Passa |

Divisórias e contornos decorativos suaves não identificam sozinhos um controle. As bordas dos campos e opções usam o token de borda de campo. O halo suave de foco é reforço; a indicação de foco precisa manter a borda ou o anel de foco de contraste adequado.

Qualquer novo par, imagem sob texto ou troca de marca exige outro cálculo. Usar uma cor aprovada sobre outro fundo não preserva automaticamente a razão desta tabela.

### 9.2 Estrutura, foco e teclado

- Um título principal por tela. Título da aba no formato “Tela · Produto”. Ao navegar, o foco vai ao título, preservando um controle já em uso durante uma atualização do conteúdo.
- Navegação e conteúdo principal têm nome acessível. Disponibilize um atalho para pular ao conteúdo; em SPA, mova também o foco por script quando necessário.
- Botões e campos conservam o alvo mínimo definido por `--ui-tap`. Os rótulos podem crescer; a altura declarada é mínima.
- O foco permanece visível e livre de topo, menu, rodapé e mensagens temporárias. A compensação de rolagem precisa considerar a altura efetiva das barras, inclusive com letra ampliada e quebra de linha.
- Radio, checkbox, botão, link e campo usam semântica nativa. Não transforme uma `div` clicável em substituto sem teclado e nome acessível.
- Erros de campo são associados ao controle. Falha importante usa anúncio apropriado; atualização não urgente usa região de status. Carregamento indica `aria-busy` na região pertinente.
- Cor tem reforço em texto, símbolo, marca ou posição. Contagem, seleção, etapa e erro são compreensíveis sem distinguir a matiz.
- O diálogo prende o foco, torna o fundo inativo à interação assistiva, fecha com Escape quando permitido e devolve o foco ao acionador.
- Refluxo, zoom e letra ampliada conservam texto, ação e leitura. Não use `overflow-x: hidden` para esconder um defeito de largura.
- Vídeo, imagem, arquivo, áudio e recursos assistivos têm alternativas e nomes coerentes com sua função.

### 9.3 Regras que completam a reprodução

Atalho de pular conteúdo, inatividade assistiva do fundo de diálogo, tratamento robusto de mensagens e compensação dinâmica de barras são critérios para a aplicação de destino. A inspeção visual e a leitura das fontes não verificaram integralmente esses comportamentos na origem. Preserve a aparência e valide essas condições durante a implementação.

## 10. Checklist de aceite

Este checklist é para a implementação que usar o guia. Os itens ficam desmarcados até existir evidência no produto de destino.

### Identidade e composição

- [ ] Fonte nativa e hierarquia seguem os tokens; títulos e ações não foram reduzidos para caber.
- [ ] Raios, bordas, espaçamentos e alturas mínimas seguem as receitas.
- [ ] Categorias comuns usam SVG Duotone sobre fundo transparente, com texto de identificação.
- [ ] Ações, destaque preenchido, situações e categorias usam seus papéis próprios.
- [ ] Claro, escuro e alto contraste são paletas completas; troca de tema atualiza toda a tela.
- [ ] Tamanho da letra e tema persistem quando o armazenamento estiver disponível.
- [ ] O desktop utiliza a moldura ampla; formulários e detalhes não foram limitados automaticamente à largura de celular.
- [ ] Cartões comuns permanecem planos; sombra está restrita às camadas sobrepostas previstas.

### Navegação, componentes e estados

- [ ] Menu principal tem quatro destinos compreensíveis e contexto ativo; atalhos do início têm função própria.
- [ ] Navegação sobe para o topo no desktop; no celular, o rodapé de ação ocupa o lugar do menu.
- [ ] Link navega e botão executa ação; cartões não contêm controles interativos aninhados indevidamente.
- [ ] Busca, filtro, paginação e retorno ao detalhe preservam o contexto definido pelo produto.
- [ ] Catálogo amplo mostra filtros laterais e fatos distribuídos quando houver espaço; celular empilha.
- [ ] Formulário pergunta por etapa, mostra progresso, permite revisão e conserva respostas após erro.
- [ ] A operação bloqueia envio duplicado e só apresenta sucesso após confirmação.
- [ ] Todas as telas relevantes demonstram carregamento, vazio, falha de leitura e falha de gravação quando aplicável.
- [ ] Plano, mídia, contato e segurança só aparecem quando existirem no escopo funcional.
- [ ] Textos, nomes, limites, situações e permissões pertencem ao destino; nenhuma regra da origem foi copiada por suposição.

### Acessibilidade e adaptação

- [ ] Pares de cor correspondem à tabela; novos pares têm contraste calculado.
- [ ] Teclado alcança os controles na ordem de leitura, com foco visível e sem encobrimento.
- [ ] Diálogo contém o foco, deixa o fundo inativo, fecha conforme previsto e devolve o foco.
- [ ] Rótulos, erros, seleções, status e regiões em carregamento possuem semântica e anúncio adequados.
- [ ] Um `h1`, título de aba e gestão de foco acompanham a troca de rota ou etapa.
- [ ] Atalho de pular conteúdo funciona com a navegação utilizada.
- [ ] Em 1440 × 900 e em 1920 × 1080, a moldura ampla e a organização de desktop funcionam.
- [ ] Em 768 × 1024, 375 × 812 e 320 × 800, não há rolagem horizontal da página nem perda de ação.
- [ ] Claro, escuro e alto contraste foram revisados; 320 px com letra a 130% foi incluído.
- [ ] Zoom de 200% e de 400%, movimento reduzido e textos longos foram exercitados.
- [ ] Teste automatizado de acessibilidade e roteiro manual tiveram seus resultados registrados, com limites explícitos.
- [ ] Voz, leitura automática, vídeo, arquivos e serviços externos foram verificados apenas se oferecidos.

## 11. Exemplo de composição sem framework

O exemplo usa as classes e tokens deste documento. Insira os dois blocos CSS em um arquivo de estilos ou em `<style>`. Os SVGs são espaços reservados: substitua-os pelos desenhos Phosphor Duotone apropriados, mantendo o caráter decorativo. Rotas e eventos devem ser conectados ao produto.

### 11.1 Catálogo

```html
<div class="ui-screen">
  <a class="ui-skip" href="#conteudo">Pular para o conteúdo</a>
  <header class="ui-topbar">
    <div class="ui-topbar__start">
      <span class="ui-brand">
        <span class="ui-brand__name">Aplicativo</span>
      </span>
    </div>
    <nav class="ui-tabbar ui-tabbar--top" aria-label="Menu principal">
      <a class="ui-tab" href="/inicio"><span class="ui-tab__pill" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z" opacity="0.2"/><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"/></svg></span>Início</a>
      <a class="ui-tab ui-tab--active" href="/explorar" aria-current="page"><span class="ui-tab__pill" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M128,32a96,96,0,1,0,96,96A96,96,0,0,0,128,32Zm16,112L80,176l32-64,64-32Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z"/></svg></span>Explorar</a>
      <a class="ui-tab" href="/acompanhar"><span class="ui-tab__pill" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M216,64V192H128V64Z" opacity="0.2"/><path d="M224,128a8,8,0,0,1-8,8H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128ZM128,72h88a8,8,0,0,0,0-16H128a8,8,0,0,0,0,16Zm88,112H128a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16ZM82.34,42.34,56,68.69,45.66,58.34A8,8,0,0,0,34.34,69.66l16,16a8,8,0,0,0,11.32,0l32-32A8,8,0,0,0,82.34,42.34Zm0,64L56,132.69,45.66,122.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm0,64L56,196.69,45.66,186.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z"/></svg></span>Acompanhar</a>
      <a class="ui-tab" href="/conta"><span class="ui-tab__pill" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M224,128a95.76,95.76,0,0,1-31.8,71.37A72,72,0,0,0,128,160a40,40,0,1,0-40-40,40,40,0,0,0,40,40,72,72,0,0,0-64.2,39.37h0A96,96,0,1,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"/></svg></span>Conta</a>
    </nav>
    <div class="ui-topbar__end"><button class="ui-topbtn ui-topbtn--listen" type="button">Ouvir</button></div>
  </header>
  <main id="conteudo" class="ui-main ui-main--wide" aria-labelledby="catalog-title">
    <h1 class="ui-title" id="catalog-title">Explorar atividades</h1>
    <div class="ui-catalog">
      <div class="ui-search" role="search">
        <label class="ui-sr-only" for="busca">Buscar atividade</label>
        <input class="ui-search__input" id="busca" type="search" placeholder="Buscar atividade">
      </div>
      <div class="ui-catalog__body">
        <section class="ui-catalog__filters" aria-labelledby="filter-title">
          <h2 class="ui-section__title" id="filter-title">Filtrar atividades</h2>
          <div class="ui-chips" role="group" aria-label="Filtros">
            <button class="ui-chip" type="button" aria-pressed="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z" opacity="0.2"/><path d="M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z"/></svg> Perto de mim</button>
            <button class="ui-chip" type="button" aria-pressed="false">Nesta semana</button>
          </div>
        </section>
        <section class="ui-catalog__results" aria-label="Resultados">
          <p class="ui-catalog__summary" role="status">Página 1 · Atividades 1 a 1</p>
          <ul class="ui-list">
            <li class="ui-catalog-item">
              <article class="ui-card ui-card--pad">
                <div class="ui-card__head">
                  <span class="ui-icon ui-icon--cat-2" aria-hidden="true">
                    <svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M216,48V88H40V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z" opacity="0.2"/><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"/></svg>
                  </span>
                  <div class="ui-card__headtext">
                    <h2 class="ui-card__title"><a class="ui-card__link" href="/atividades/oficina">Oficina de fotografia</a></h2>
                    <p class="ui-card__sub">Espaço Horizonte · exemplo fictício</p>
                    <div class="ui-card__badge"><span class="ui-badge ui-badge--info">Inscrições abertas</span></div>
                  </div>
                </div>
                <ul class="ui-facts"><li class="ui-fact">Sábado, às 10h</li><li class="ui-fact">Unidade Centro</li></ul>
              </article>
            </li>
          </ul>
          <nav class="ui-catalog__pagination" aria-label="Páginas de atividades">
            <button class="ui-btn ui-btn--secondary ui-btn--inline" type="button" disabled>Anterior</button>
            <span>Página 1</span>
            <button class="ui-btn ui-btn--secondary ui-btn--inline" type="button" disabled>Próxima</button>
          </nav>
        </section>
      </div>
    </div>
  </main>
  <nav class="ui-tabbar ui-tabbar--bottom" aria-label="Menu principal">
    <a class="ui-tab" href="/inicio"><span class="ui-tab__pill" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z" opacity="0.2"/><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"/></svg></span>Início</a>
    <a class="ui-tab ui-tab--active" href="/explorar" aria-current="page"><span class="ui-tab__pill" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M128,32a96,96,0,1,0,96,96A96,96,0,0,0,128,32Zm16,112L80,176l32-64,64-32Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z"/></svg></span>Explorar</a>
    <a class="ui-tab" href="/acompanhar"><span class="ui-tab__pill" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M216,64V192H128V64Z" opacity="0.2"/><path d="M224,128a8,8,0,0,1-8,8H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128ZM128,72h88a8,8,0,0,0,0-16H128a8,8,0,0,0,0,16Zm88,112H128a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16ZM82.34,42.34,56,68.69,45.66,58.34A8,8,0,0,0,34.34,69.66l16,16a8,8,0,0,0,11.32,0l32-32A8,8,0,0,0,82.34,42.34Zm0,64L56,132.69,45.66,122.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm0,64L56,196.69,45.66,186.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z"/></svg></span>Acompanhar</a>
    <a class="ui-tab" href="/conta"><span class="ui-tab__pill" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M224,128a95.76,95.76,0,0,1-31.8,71.37A72,72,0,0,0,128,160a40,40,0,1,0-40-40,40,40,0,0,0,40,40,72,72,0,0,0-64.2,39.37h0A96,96,0,1,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"/></svg></span>Conta</a>
  </nav>
</div>
```

### 11.2 Uma etapa de formulário

```html
<div class="ui-screen">
  <a class="ui-skip" href="#conteudo">Pular para o conteúdo</a>
  <header class="ui-topbar">
    <div class="ui-topbar__start">
      <span class="ui-brand ui-brand--desktop">
        <span class="ui-brand__name">Aplicativo</span>
      </span>
      <a class="ui-topbtn" href="/explorar"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M112,56V200L40,128Z" opacity="0.2"/><path d="M216,120H120V56a8,8,0,0,0-13.66-5.66l-72,72a8,8,0,0,0,0,11.32l72,72A8,8,0,0,0,120,200V136h96a8,8,0,0,0,0-16ZM104,180.69,51.31,128,104,75.31Z"/></svg> Voltar</a>
    </div>
    <nav class="ui-tabbar ui-tabbar--top" aria-label="Menu principal">
      <a class="ui-tab" href="/inicio"><span class="ui-tab__pill" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z" opacity="0.2"/><path d="M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z"/></svg></span>Início</a>
      <a class="ui-tab ui-tab--active" href="/explorar" aria-current="true"><span class="ui-tab__pill" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M128,32a96,96,0,1,0,96,96A96,96,0,0,0,128,32Zm16,112L80,176l32-64,64-32Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z"/></svg></span>Explorar</a>
      <a class="ui-tab" href="/acompanhar"><span class="ui-tab__pill" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M216,64V192H128V64Z" opacity="0.2"/><path d="M224,128a8,8,0,0,1-8,8H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128ZM128,72h88a8,8,0,0,0,0-16H128a8,8,0,0,0,0,16Zm88,112H128a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16ZM82.34,42.34,56,68.69,45.66,58.34A8,8,0,0,0,34.34,69.66l16,16a8,8,0,0,0,11.32,0l32-32A8,8,0,0,0,82.34,42.34Zm0,64L56,132.69,45.66,122.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm0,64L56,196.69,45.66,186.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z"/></svg></span>Acompanhar</a>
      <a class="ui-tab" href="/conta"><span class="ui-tab__pill" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M224,128a95.76,95.76,0,0,1-31.8,71.37A72,72,0,0,0,128,160a40,40,0,1,0-40-40,40,40,0,0,0,40,40,72,72,0,0,0-64.2,39.37h0A96,96,0,1,1,224,128Z" opacity="0.2"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"/></svg></span>Conta</a>
    </nav>
    <div class="ui-topbar__end"><button class="ui-topbtn ui-topbtn--listen" type="button">Ouvir</button></div>
  </header>
  <main id="conteudo" class="ui-main ui-main--wide" aria-labelledby="step-title">
    <div class="ui-steps">
      <span class="ui-steps__bar ui-steps__bar--on" aria-hidden="true"></span>
      <span class="ui-steps__bar ui-steps__bar--on" aria-hidden="true"></span>
      <span class="ui-steps__bar" aria-hidden="true"></span>
      <span class="ui-steps__label">Passo 2 de 3</span>
    </div>
    <h1 class="ui-title" id="step-title">Quando você prefere participar?</h1>
    <p class="ui-lead">Escolha uma opção.</p>
    <fieldset class="ui-fieldset">
      <legend class="ui-sr-only">Horário de participação</legend>
      <div class="ui-options">
        <label class="ui-option">
          <input class="ui-option__input" type="radio" name="horario" value="manha" checked>
          <span class="ui-option__text">De manhã<span class="ui-option__sub">Antes do almoço</span></span>
          <span class="ui-option__check" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z" opacity="0.2"/><path d="M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z"/></svg></span>
        </label>
        <label class="ui-option">
          <input class="ui-option__input" type="radio" name="horario" value="tarde">
          <span class="ui-option__text">De tarde</span>
          <span class="ui-option__check" aria-hidden="true"><svg viewBox="0 0 256 256" fill="currentColor" focusable="false" aria-hidden="true"><path d="M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z" opacity="0.2"/><path d="M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z"/></svg></span>
        </label>
      </div>
    </fieldset>
  </main>
  <div class="ui-footer ui-footer--wide">
    <div class="ui-footer__inner"><button class="ui-btn ui-btn--primary" type="button">Continuar</button></div>
  </div>
</div>
```

Os exemplos apresentam a composição visual. O agente deve implementar os controladores e a semântica de formulário pertinente, além de substituir os símbolos de navegação pelos SVGs da família escolhida.

## 12. Prompt para recriar em outra aplicação

```text
Use PRD-FRONTEND.md como referência visual autossuficiente.

Objetivo: recriar a linguagem de aplicativo orientado a tarefas descrita no
documento, adaptando o conteúdo ao produto informado no quadro de destino.

Preserve a fonte nativa, os SVGs Phosphor Duotone, os três temas, a escala de
texto, os raios e os controles grandes. Use moldura ampla no desktop, menu
de quatro destinos no topo e, no celular, navegação inferior substituída
pelo rodapé de ação nas tarefas que tenham uma ação principal.

Mapeie os módulos reais para os modelos de tela do documento. Não herde
nomes, endpoints, permissões, preços, limites, dados pessoais ou regras de
negócio do produto de origem. Use a especificação funcional fornecida.

Implemente primeiro entrada, catálogo, detalhe e uma etapa de formulário.
Reutilize a moldura e os componentes nas telas seguintes. Conserve a lista
ampla com filtros laterais no desktop e o empilhamento no celular.

Inclua estados reais de carregamento, vazio, erro, envio e conclusão.
Recursos de voz, autenticação, arquivos, contato, mídia ou cobrança só
entram quando estiverem no escopo. Exemplos usam dados fictícios.

Antes de entregar, execute o checklist e informe o resultado de cada grupo,
as telas e tamanhos exercitados, os arquivos criados e as integrações que
foram verificadas. Diferencie demonstração visual de funcionamento real.
```

## 13. Registro de origem e limite da inspeção

Esta seção registra como o guia foi extraído. Ela pode permanecer como histórico e não é dependência para implementar em outro projeto.

| Fonte | Uso no guia |
| --- | --- |
| `prd_frontend/prds/modelo-de-prd.md` e `CONTRIBUTING.md` | Cabeçalho, escopo, uso, tokens, receitas, contraste e checklist |
| PRDs `base-design-system`, `site-escola-idiomas` e `sistema-gestao` | Referências de organização e de nível de especificação; sem herança visual |
| `src/styles/tokens.css`, `base.css` e `ui.css` do frontend CNR | Valores e receitas da identidade atual |
| `src/ui`, `src/shell`, `src/lib/theme.ts` e `src/lib/useMediaQuery.ts` | Composição, estados, navegação, preferência de tema e letra |
| CSS de catálogo, perfil, avisos, cursos e comércio | Adaptações amplas e mídia |
| `src/dev/Gallery.tsx` e `gallery.pacote2.tsx` | Inventário de 60 telas, passos e variações com dados fictícios |
| Rotas e páginas do CNR | Modelos de tarefa e limites funcionais observáveis |

**Versão de origem:** checkout `3rd_ap_connecta_rocinha`, branch `a_dsv_gustavo_am`, HEAD `9cc0edb`, com alterações locais preexistentes. O guia retrata os arquivos presentes em 10/10/2026; não representa apenas o conteúdo desse commit.

**Cobertura visual:** as 60 entradas da galeria foram abertas e capturadas em 1440 × 900 e em 375 × 812. Foram conferidas mais 31 situações em 320 × 800 com letra a 130% e alto contraste, além de amostras do tema escuro e do painel inferior. As medições de largura dessas 151 situações não mostraram rolagem horizontal da página. Foram revisadas as capturas em pranchas e amostras individuais; essa verificação não equivale a ensaio integral de todas as operações.

**Comportamento do painel conferido:** a amostra abre como diálogo, fecha com Escape e devolve o foco ao acionador. Isso não comprova, por si só, todos os requisitos assistivos do diálogo.

**Exemplos do próprio guia:** os dois blocos HTML foram extraídos e renderizados com o CSS deste arquivo em oito combinações de largura, tema e tamanho de letra. Foram conferidos catálogo e etapa de formulário em 1440 px e 375 px no tema claro, 375 px no escuro e 320 px no alto contraste com letra a 130%. Essas amostras preservaram a troca de navegação e não mostraram rolagem horizontal da página.

**Acesso externo:** login, cadastro e recuperação de senha do MS_Access foram observados separadamente. Usam composição própria de formulário em cartão central. Os tokens deste guia descrevem a identidade do aplicativo CNR; não afirmam que aquela interface de acesso já usa as mesmas receitas. A autenticação de um destino pode ter provedor próprio ou receber uma adaptação visual explicitamente implementada.

**Limites:** a galeria usa dados fictícios e adaptadores locais de desenvolvimento. A inspeção é de aparência, composição e alguns comportamentos de interface. Ela não prova autorização, contratação, pagamento, envio externo, persistência em backend, leitura de tela, todas as condições de zoom ou conformidade integral com WCAG. Os critérios adicionais dessas áreas permanecem no checklist da implementação de destino.

O arquivo está pronto para revisão e reutilização como especificação visual. O estado `rascunho` do cabeçalho indica que não passou pelo processo completo de publicação do catálogo de referência, que também exige exemplos próprios e auditoria editorial.
