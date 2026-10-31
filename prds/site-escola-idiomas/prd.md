---
titulo: Site de escola de idiomas
slug: site-escola-idiomas
versao: 3.0.0
status: estavel
superficie: site
dominio: educacao
estende: nenhum
idioma: pt-BR
acessibilidade: WCAG 2.2 AA
atualizado: 2026-10-30
---

# Site de escola de idiomas

Guia de UI/UX para o frontend de sites de escola de idiomas. Sistema de design extraído pelo autor da análise do site da Fisk (fisk.com.br), em set/2026.

> **Para quem é este documento:** é um briefing técnico para uma LLM construir o frontend de uma escola de idiomas.
> Contém tokens de design, receitas de componentes, templates de página e fluxos de conversão que o autor observou em uso no site analisado, de uma rede de franquias de idiomas. São observações de quem olhou o site de fora: não há dados de conversão nem medição que as comprove.
> **Não copie a marca.** Copie a *estrutura*, o *ritmo* e os *padrões de conversão*. Defina `--brand` e o logo com os seus; as outras cores da marca são derivadas (§1.1).

## Escopo

- **Use para:** site institucional e de captação de escola de idiomas, de uma unidade ou de rede com franquias: home, páginas de curso, busca de unidades, pré-matrícula, teste de nível, blog e landing de franquia.
- **Não use para:** portal do aluno, portal do professor, painel do franqueado e qualquer tela de trabalho com tabela, filtro e cadastro: isso é ferramenta, use `sistema-gestao`. Produto que não é site de escola e não tem PRD próprio: use `base-design-system`.
- **Relação com outros PRDs:** autossuficiente (`estende: nenhum`). Os PRDs deste repositório são estilos alternativos, não camadas: use um por projeto e nunca entregue este documento a um agente junto com outro.

## Como usar

1. Copie este arquivo para a raiz do projeto de destino com o nome `PRD-FRONTEND.md`.
2. Defina `--brand` com a cor da sua marca e siga o §1.1 para conferir os contrastes.
3. Peça ao agente: "Siga `PRD-FRONTEND.md`. Antes de entregar, rode o checklist de aceite (§10) e diga o resultado de cada item."

---

## 0. Regras de ouro (leia antes de escrever qualquer linha)

1. **Uma cor de marca só.** Todo o site vive em cor da marca + branco + cinza-texto. Nada de paleta multicolorida, nem nas ilustrações (sem bandeiras). A cor da marca aparece em: botões, títulos de seção, footer, faixa de CTA, rótulos ativos e ícones. O resto é branco, com os dois fundos alternados do §4 (`--brand-tint` e `--bg-gray`).
2. **Uma família tipográfica só.** Montserrat em quatro pesos (400/500/600/700). Zero fonte secundária. Isso elimina a maior parte das decisões e mantém a coesão.
3. **Toda seção termina em uma ação.** Nenhum bloco é puramente informativo: cada um fecha com o CTA indicado nas tabelas do §5.2 e do §5.3 ("Saiba mais", "Conheça!", "Fazer pré-matrícula" ou "Fazer teste de nível").
4. **Duas conversões primárias, sempre visíveis:** `Pré-matrícula` (botão sólido) e `Teste de nível` (ação secundária). A partir de 1200px as duas ficam na faixa 2 do header, que acompanha a rolagem; abaixo disso, numa barra fixa no pé da tela (§5.1). Todo o site empurra para essas duas.
5. **A busca por unidade é função de primeira classe.** Escola de idiomas é negócio local. "Encontre uma unidade" é navegação, não rodapé: fica na faixa 1 do header, na seção 5 da home e no passo 1 da pré-matrícula.
6. **Respiro generoso, com medida.** A partir de 768px, seções com 100px de padding em cima e 120px embaixo; abaixo disso, 60px em cima e embaixo. Nunca aperte.
7. **Mobile-first de verdade.** O CSS base é o do celular e toda media query é `min-width` (576, 768 e 1200px). No mobile o header tem hambúrguer, logo e atalho de unidades; o hero vira 1 coluna; a faixa de CTA empilha.
8. **Sem tema escuro.** Declare `color-scheme: light`.

---

## 1. Design Tokens

Copie este bloco como base do seu CSS. Os valores partem dos que o autor observou no site analisado; os que reprovavam em contraste ou não funcionavam como escritos foram corrigidos na versão 2.0.0 (ver `CHANGELOG.md`). Para usar outra marca, defina só `--brand` e siga o §1.1.

```css
*, *::before, *::after { box-sizing: border-box; }

:root {
  color-scheme: light;   /* sem tema escuro */

  /* ---------- MARCA (defina só --brand; o resto é derivado) ---------- */
  --brand:            #d71920;                                      /* botões, faixa de CTA, destaques */
  --brand-dark:       color-mix(in srgb, var(--brand) 79%, black);  /* #aa1419: footer, hover de botão, badge */
  --brand-deep:       color-mix(in srgb, var(--brand) 42%, black);  /* #5a0b0d: "vinho", títulos de seção, botão pressionado */
  --brand-light:      color-mix(in srgb, var(--brand) 88%, white);  /* #dc353b: só decorativa (gradientes, ilustrações) */
  --brand-tint:       color-mix(in srgb, var(--brand) 6%, white);   /* #fdf1f2: fundo de seção suave */

  /* texto ligado à marca: confira pelo §1.1 ao trocar --brand */
  --on-brand:         #ffffff;            /* texto e ícone sobre --brand */
  --on-brand-dark:    #ffffff;            /* texto e ícone sobre --brand-dark */
  --brand-text:       var(--brand);       /* a marca como texto sobre fundo claro: tag, rótulo ativo, asterisco, números */
  --brand-text-dark:  var(--brand-dark);  /* links, botão outline, ícones */

  /* ---------- NEUTROS ---------- */
  --heading:          #04000b;  /* títulos: quase-preto, NÃO #000 */
  --paragraph:        #666666;  /* corpo de texto e placeholder */
  --input-text:       #212529;  /* texto digitado em campo */
  --dark:             #0e0f11;  /* cookie bar */
  --white:            #ffffff;
  --bg-gray:          #f2f3ef;  /* fundo de seção alternado (quente, não frio) */
  --border:           #dee2e6;  /* divisórias e bordas decorativas; NÃO serve de limite de campo */
  --border-input:     #6c757d;  /* limite de input e select; passos futuros do stepper */

  /* ---------- ESTADO (sempre com ícone e texto, nunca só a cor) ---------- */
  --danger:           #b3261e;
  --success:          #1b6e3a;

  /* ---------- TIPOGRAFIA ---------- */
  --font: "Montserrat", system-ui, -apple-system, sans-serif;

  --fs-hero:      clamp(2.25rem, 1.4rem + 3.2vw, 3.75rem);     /* h1 do hero: 36 a 60px */
  --fs-section:   clamp(1.75rem, 1.2rem + 2.3vw, 3.125rem);    /* título de seção: 28 a 50px */
  --fs-cta:       clamp(1.5rem, 1rem + 2vw, 2.5rem);           /* título da faixa de CTA: 24 a 40px */
  --fs-hero-sub:  clamp(1.125rem, 1rem + .6vw, 1.5625rem);     /* subtítulo do hero: 18 a 25px */
  --fs-card:      clamp(1.375rem, 1.2rem + .6vw, 1.6875rem);   /* h3 de tile e de bloco: 22 a 27px */
  --fs-body-lg:   clamp(1.0625rem, .98rem + .35vw, 1.25rem);   /* corpo do hero: 17 a 20px */
  --fs-item:      1.25rem;         /* 20px: h4 de item, título de card */
  --fs-body:      1.0625rem;       /* 17px: corpo padrão (NÃO 16px) */
  --fs-ui:        max(1rem, 16px); /* 16px: campos, labels, links de navegação */
  --fs-caption:   .875rem;         /* 14px: eyebrow, badge, botão, data */

  --lh-tight:     1.15;  /* h1 */
  --lh-heading:   1.2;   /* h2..h6 e botões */
  --lh-snug:      1.3;   /* subtítulo do hero, título de card */
  --lh-caption:   1.4;   /* textos de 14px */
  --lh-lead:      1.6;   /* corpo do hero */
  --lh-body:      1.7;   /* parágrafos e leitura longa */

  /* ---------- ESPAÇAMENTO (escala de 6 passos) ---------- */
  --space-1: .25rem;  --space-2: .5rem;   --space-3: 1rem;
  --space-4: 1.5rem;  --space-5: 2.5rem;  --space-6: 3.5rem;
  --grid-gap:        2rem;    /* 32px: gap das grades de cards */

  --section-pt:      60px;    /* padding de seção, em cima */
  --section-pb:      60px;    /* padding de seção, embaixo */
  --section-tight:   48px;    /* .section--tight, em cima e embaixo */
  --heading-mb:      40px;    /* espaço entre título de seção e conteúdo */

  /* ---------- LAYOUT ---------- */
  --container:       1320px;  /* largura máxima do .container (1250px úteis com o respiro de 35px) */
  --container-pad:   20px;    /* respiro lateral */
  --header-h:        64px;    /* header de uma faixa */
  --cta-bar-h:       56px;    /* barra fixa das duas conversões, abaixo de 1200px */
  --cookie-h:        0px;     /* altura da cookie bar: o JS grava ao exibir e zera ao fechar */

  /* ---------- FORMA ---------- */
  --r-sm:   6px;    /* inputs e botões */
  --r-md:   8px;    /* badges */
  --r-lg:   20px;   /* cards, imagens, acordeão */
  --r-xl:   32px;   /* faixa de CTA */
  --r-full: 999px;  /* pílulas, eyebrow, campo da faixa de CTA */

  /* ---------- ELEVAÇÃO ---------- */
  --shadow-card:  0 2px 12px 0 rgb(0 0 0 / .09);
  --shadow-hover: 0 20px 40px -12px rgb(0 0 0 / .12), 0 8px 20px -8px color-mix(in srgb, var(--brand) 14%, transparent);
  --shadow-brand: 0 10px 30px 0 color-mix(in srgb, var(--brand) 40%, transparent); /* glow da bolha de chat */

  /* ---------- MOVIMENTO ---------- */
  --t-fast: .2s ease;          /* troca de cor em hover, dropdowns */
  --t-base: .25s ease;         /* cards */
  --t-slow: .35s ease-in-out;  /* imagem e overlay do tile */
}

@media (min-width: 768px) {
  :root { --section-pt: 100px; --section-pb: 120px; --heading-mb: 60px; --container-pad: 35px; }
}
@media (min-width: 1200px) {
  :root { --header-h: 143px; --cta-bar-h: 0px; }   /* header de duas faixas: 64 + 79 */
}

/* ---------- BASE ---------- */
html { scroll-padding-top: var(--header-h); scroll-padding-bottom: calc(var(--cta-bar-h) + var(--cookie-h) + var(--space-4)); }
body {
  margin: 0; padding-bottom: calc(var(--cta-bar-h) + var(--cookie-h));
  font-family: var(--font); font-size: var(--fs-body); line-height: var(--lh-body);
  color: var(--paragraph); background: var(--white);
}
h1, h2, h3, h4 { margin: 0; color: var(--heading); line-height: var(--lh-heading); letter-spacing: 0; }
h1 { line-height: var(--lh-tight); }
a { color: var(--brand-text-dark); }               /* link em texto corrido: cor + sublinhado do navegador */
button, input, select, textarea { font: inherit; } /* sem isso os controles saem em Arial */
::placeholder { color: var(--paragraph); opacity: 1; }

/* Foco: anel duplo, branco por dentro e escuro por fora. Um dos dois contrasta com qualquer fundo (§7). */
:where(a, button, input, select, textarea, summary, [tabindex]):focus-visible {
  outline: 2px solid var(--white); outline-offset: 0;
  box-shadow: 0 0 0 4px var(--heading);
}
```

### 1.1 Como trocar a marca

Defina `--brand`. As quatro variantes saem dela por `color-mix()` e não são editadas. Depois calcule quatro contrastes com a fórmula de luminância relativa da WCAG e ajuste os tokens de texto:

| Confira | Se der menos de 4,5:1 |
|---|---|
| `#ffffff` sobre `--brand` | `--on-brand: var(--heading);` |
| `#ffffff` sobre `--brand-dark` | `--on-brand-dark: var(--heading);` |
| `--brand` sobre `--bg-gray` e sobre `--brand-tint` | `--brand-text: var(--brand-dark);` e, se `--brand-dark` também reprovar, `var(--brand-deep)` |
| `--brand-dark` sobre `--bg-gray` e sobre `--brand-tint` | `--brand-text-dark: var(--brand-deep);` |

Com a marca padrão (`#d71920`) nenhum ajuste é necessário: 5,19 · 7,44 · 4,65 e 4,70 · 6,67 e 6,74. A regra foi conferida por cálculo com outras doze cores de marca (amarelo `#ffd400`, ciano `#00bcd4`, laranja `#f57c00`, verde `#2eab5b`, azul `#1565c0`, roxo `#6a1b9a`, entre outras): aplicados os ajustes, todos os pares da tabela do §7 ficam em 4,5:1 ou mais. `--brand-deep` e branco sobre `--brand-deep` passam com qualquer `--brand`.

Nenhuma receita deste documento escreve a cor da marca nem `#fff` sobre ela: tudo passa pelos tokens acima. Não crie um vermelho de erro a partir da marca; erro é `--danger`.

### 1.2 Equivalente Tailwind (`tailwind.config.js`)

O config não repete valores: cada chave aponta para o token do `:root` acima e usa o mesmo nome. O bloco de tokens continua sendo o único lugar onde um valor é escrito.

```js
/** tailwind.config.js (formato do Tailwind v3) */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx,astro}'],
  theme: {
    screens: { sm: '576px', md: '768px', xl: '1200px' },   // os três breakpoints do §4, e só eles
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--brand)', dark: 'var(--brand-dark)', deep: 'var(--brand-deep)',
          light: 'var(--brand-light)', tint: 'var(--brand-tint)',
          text: 'var(--brand-text)', 'text-dark': 'var(--brand-text-dark)',
        },
        'on-brand':   { DEFAULT: 'var(--on-brand)', dark: 'var(--on-brand-dark)' },
        heading:      'var(--heading)',
        paragraph:    'var(--paragraph)',
        'input-text': 'var(--input-text)',
        dark:         'var(--dark)',
        white:        'var(--white)',
        'bg-gray':    'var(--bg-gray)',
        border:       { DEFAULT: 'var(--border)', input: 'var(--border-input)' },
        danger:       'var(--danger)',
        success:      'var(--success)',
      },
      fontFamily: { sans: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'] },
      fontSize: {
        caption:    ['var(--fs-caption)',  'var(--lh-caption)'],
        ui:         ['var(--fs-ui)',       '1.5'],
        body:       ['var(--fs-body)',     'var(--lh-body)'],     // corpo = 17px/1.7, não 16
        'body-lg':  ['var(--fs-body-lg)',  'var(--lh-lead)'],
        item:       ['var(--fs-item)',     'var(--lh-heading)'],
        card:       ['var(--fs-card)',     'var(--lh-heading)'],
        'hero-sub': ['var(--fs-hero-sub)', 'var(--lh-snug)'],
        cta:        ['var(--fs-cta)',      'var(--lh-heading)'],
        section:    ['var(--fs-section)',  'var(--lh-heading)'],
        hero:       ['var(--fs-hero)',     'var(--lh-tight)'],
      },
      spacing: {
        'section-pt': 'var(--section-pt)', 'section-pb': 'var(--section-pb)', 'section-tight': 'var(--section-tight)',
        'heading-mb': 'var(--heading-mb)', 'container-pad': 'var(--container-pad)', 'grid-gap': 'var(--grid-gap)',
        'header-h': 'var(--header-h)', 'cta-bar-h': 'var(--cta-bar-h)',
      },
      borderRadius: { sm: 'var(--r-sm)', md: 'var(--r-md)', lg: 'var(--r-lg)', xl: 'var(--r-xl)', full: 'var(--r-full)' },
      maxWidth:     { container: 'var(--container)' },
      boxShadow:    { card: 'var(--shadow-card)', hover: 'var(--shadow-hover)', brand: 'var(--shadow-brand)' },
    },
  },
};
```

- A escala `--space-1` a `--space-6` coincide com os passos `1`, `2`, `4`, `6`, `10` e `14` da escala padrão do Tailwind; não precisa de chave própria.
- Transições usam o token direto: `[transition:background-color_var(--t-fast)]`.
- No Tailwind v4 a configuração é feita em CSS (`@theme`); o mapa é o mesmo, chave por chave. O bloco acima não foi testado em build nesta revisão.

---

## 2. Tipografia — como aplicar

| Papel | Tamanho | Peso | Altura de linha | Cor | Detalhes |
|---|---|---|---|---|---|
| **H1 hero** | `--fs-hero` (36 a 60px) | 700 | `--lh-tight` (1.15) | `--white` sobre imagem com scrim / `--heading` sobre branco | `margin-bottom: var(--space-3)` |
| **Subtítulo do hero** | `--fs-hero-sub` (18 a 25px) | 600 | `--lh-snug` (1.3) | herda do hero | |
| **Título de seção (H2)** | `--fs-section` (28 a 50px) | 700 | `--lh-heading` (1.2) | `--brand-deep` | alinhado à esquerda, `margin-bottom: var(--heading-mb)`; grande e no tom escuro da marca, é a assinatura visual |
| **Título da faixa de CTA** | `--fs-cta` (24 a 40px) | 700 | `--lh-heading` | `--on-brand` | caixa alta |
| **Eyebrow / rótulo** | `--fs-caption` (14px) | 700 | `--lh-caption` (1.4) | `--heading` | caixa alta, pílula com `border: 1px solid var(--border)`, `padding: var(--space-2) var(--space-4)`, `border-radius: var(--r-full)`; uso no §5.2 |
| **H3 de tile e de bloco** | `--fs-card` (22 a 27px) | 600 | `--lh-heading` | `--heading` (`--white` no tile) | `margin-bottom: var(--space-3)` |
| **H4 de item** | `--fs-item` (20px) | 600 | `--lh-heading` | `--heading` | `margin-bottom: var(--space-3)` |
| **Título de card** (`.card__title`) | `--fs-item` (20px) | 600 | `--lh-snug` | `--heading` | é um `<h3>` com tamanho de H4 |
| **Corpo** | **`--fs-body` (17px)** | 400 | **`--lh-body` (1.7)** | `--paragraph` (`#666`) | nunca preto puro no corpo |
| **Corpo do hero** | `--fs-body-lg` (17 a 20px) | 500 | `--lh-lead` (1.6) | herda do hero | só dentro do hero |
| **Link de navegação** | `--fs-ui` (16px) | 500 | `--lh-heading` | `--heading` | ativo: `--brand-text`, peso 700 e `aria-current="page"` |
| **Label e texto de campo** | `--fs-ui` (16px) | 600 no label, 400 no campo | 1.5 | `--heading` no label, `--input-text` no campo | |
| **Botão** | `--fs-caption` (14px) | 700 | `--lh-heading` | conforme a variante (§3.1) | pílula: sempre caixa alta, por CSS. `.btn-primary` e `.btn-outline`: caixa de frase |
| **Data, tag, badge, contador de passo** | `--fs-caption` (14px) | 400 na data, 700 nos demais | `--lh-caption` | conforme a receita | |

**Regras:**
- **Nunca** use `#000` nem em título nem em texto. Títulos = `--heading` (`#04000b`), corpo = `--paragraph` (`#666`).
- Corpo em **17px**, não 16px, com altura de linha 1.7 (17/28.9). Aumenta legibilidade para um público amplo (crianças a adultos, pais lendo no celular).
- H1, H2, subtítulo do hero, H3, título da faixa de CTA e corpo do hero usam `clamp()` com termo fluido `rem + vw` e limites em `rem`: o texto cresce com o zoom do navegador e com a fonte padrão do usuário. H4, corpo e textos de 14px são fixos em `rem`. Zero media query para tipografia e nenhum `font-size` fixo em `px` (o único `px` é o piso de 16px de `--fs-ui`, que evita o zoom automático do iOS nos campos).
- `letter-spacing: 0` em tudo. Nada de tracking dramático.
- Pesos carregados: 400, 500, 600 e 700. Nenhum outro.
- Rótulos de botão em caixa de frase no HTML ("Fazer pré-matrícula", "Saiba mais"); a caixa alta da pílula, do eyebrow e da tag vem de `text-transform`, nunca do texto digitado.

---

## 3. Componentes — receitas prontas

### 3.1 Botões (três formas, só isso: primário, outline e pílula)

As receitas valem igual em `<a>` e em `<button>`. O foco vem da regra global do §1.

```css
/* comum às três formas */
.btn-primary, .btn-outline, .btn-pill {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2);
  min-height: 44px;                       /* alvo de toque */
  font: inherit; font-size: var(--fs-caption); font-weight: 700; line-height: var(--lh-heading);
  text-align: center; text-decoration: none; cursor: pointer;
  transition: background-color var(--t-fast), color var(--t-fast), border-color var(--t-fast);
}

/* PRIMARIO — a acao da pagina */
.btn-primary, .btn-outline { padding: 10px 20px; border: 1px solid; border-radius: var(--r-sm); }
.btn-primary       { background: var(--brand); color: var(--on-brand); border-color: var(--brand); }
.btn-primary:hover { background: var(--brand-dark); color: var(--on-brand-dark); border-color: var(--brand-dark); }

/* SECUNDARIO / OUTLINE — acao alternativa, mesmo peso visual, menos urgencia */
.btn-outline       { background: var(--white); color: var(--brand-text-dark); border-color: var(--brand-text-dark); }
.btn-outline:hover { background: var(--brand-dark); color: var(--on-brand-dark); border-color: var(--brand-dark); }

/* PILULA — CTA de hero e de faixa colorida. Sempre em caixa alta. */
.btn-pill {
  width: 100%; padding: 15px var(--space-4);          /* celular: largura total, o rotulo pode quebrar */
  border: 2px solid; border-radius: var(--r-full);
  text-transform: uppercase;
}
@media (min-width: 576px) {
  .btn-pill { width: auto; padding-inline: var(--space-5); white-space: nowrap; }
}
/* solida da marca: a conversao, sobre foto */
.btn-pill--brand            { background: var(--brand); color: var(--on-brand); border-color: var(--brand); }
.btn-pill--brand:hover      { background: var(--brand-dark); color: var(--on-brand-dark); border-color: var(--brand-dark); }
/* branca solida: a conversao, sobre fundo da marca -> vaza para transparente no hover */
.btn-pill--on-brand         { background: var(--white); color: var(--brand-text); border-color: var(--white); }
.btn-pill--on-brand:hover   { background: transparent; color: inherit; border-color: currentColor; }
/* fantasma: a acao de baixo compromisso. Herda a cor do texto do bloco (hero ou faixa) */
.btn-pill--ghost            { background: transparent; color: inherit; border-color: currentColor; }
.btn-pill--ghost:hover      { background: var(--white); color: var(--heading); border-color: var(--white); }

/* pressionado e desabilitado, nas tres formas (por ultimo, para valer sobre o hover) */
.btn-primary:active, .btn-outline:active, .btn-pill:active {
  background: var(--brand-deep); color: var(--white); border-color: var(--brand-deep);
}
.btn-primary:disabled, .btn-outline:disabled, .btn-pill:disabled,
.btn-primary[aria-disabled="true"], .btn-outline[aria-disabled="true"], .btn-pill[aria-disabled="true"] {
  background: var(--bg-gray); color: var(--paragraph); border-color: var(--border); cursor: not-allowed;
}
```

**Padrão de par de CTA:** a ação de baixo compromisso à esquerda ("Fazer teste de nível", com ícone de seta) e a de conversão à direita ("Fazer pré-matrícula"), em todo par do site: no hero, nos depoimentos, na barra das conversões, no wizard ("Voltar" + "Continuar") e no resultado do teste. Sobre foto ou fundo da marca, a da esquerda é *fantasma* e a da direita é *sólida*.

| Fundo do bloco | Cor do texto do bloco | Par |
|---|---|---|
| foto com scrim (hero da home) | `color: var(--white)` | `.btn-pill--ghost` + `.btn-pill--brand` |
| ilustração em tons da marca com scrim (hero de curso) | `color: var(--white)` | `.btn-pill--ghost` + `.btn-pill--on-brand` |
| `--brand` liso (hero de unidades, faixa de CTA) | `color: var(--on-brand)` | `.btn-pill--ghost` + `.btn-pill--on-brand` |

A pílula fantasma e o hover da pílula branca herdam a cor do texto do bloco; por isso o bloco precisa declará-la. Fora de hero e faixa, use `.btn-primary` e `.btn-outline`; nunca misture pílula e botão de raio 6px no mesmo par.

### 3.2 Card de curso (tile de imagem com overlay)

Na leitura do autor, o padrão mais forte do site analisado: faixa horizontal de tiles com imagem de fundo, gradiente escuro na base, nome do idioma e um "Conheça".

```html
<a class="course-tile" href="/cursos/ingles">
  <img src="ingles.webp" alt="" width="596" height="512" loading="lazy">
  <div class="course-tile__body">
    <h3>Inglês</h3>
    <span class="course-tile__cta">Conheça</span>
  </div>
</a>
```
```css
.course-tile {
  position: relative; display: block; overflow: hidden;
  aspect-ratio: 298 / 256;              /* ~1.16:1 */
  color: var(--white); text-decoration: none;
}
.course-tile img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform var(--t-slow); }
.course-tile:hover img { transform: scale(1.06); }
.course-tile::after {                    /* legibilidade do texto sobre foto */
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(to top, rgb(0 0 0 / .8) 0%, rgb(0 0 0 / .55) 50%, transparent 100%);
  transition: background-color var(--t-slow);
}
.course-tile:hover::after { background-color: rgb(0 0 0 / .2); }   /* o overlay escurece */
.course-tile__body { position: absolute; inset: auto 0 0 0; z-index: 1; padding: var(--space-4); }
.course-tile__body h3 {
  margin: 0 0 var(--space-2); font-size: var(--fs-card); font-weight: 600; color: inherit;
  display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;   /* no maximo 2 linhas */
}
.course-tile__cta { font-size: var(--fs-caption); font-weight: 700; line-height: var(--lh-caption); text-transform: uppercase; }

/* foco por dentro: o trilho do carrossel recorta o que sai do tile */
.course-tile:focus-visible        { outline-offset: -2px; box-shadow: none; }
.course-tile:focus-visible::after { box-shadow: inset 0 0 0 4px var(--heading); }
```

- **Forma e grade:** tiles sem raio e encostados (`gap: 0`), formando uma faixa contínua dentro do `.container`. Por tela: 1,2 abaixo de 768px, 2 de 768 a 1199px, 4 a partir de 1200px. Com mais tiles que isso, a faixa é um carrossel (§3.10).
- **Contraste:** nome e "Conheça" ficam na metade de baixo do tile, onde o overlay tem alfa de 0,55 ou mais. No pior caso (foto branca) o texto branco fica a 4,74:1 no ponto mais claro dessa metade. Nome com mais de 2 linhas é cortado; escreva nomes que caibam.
- **Acessibilidade:** `alt=""` na imagem, que é decorativa. O link não leva `aria-label`: seu nome acessível já é "Inglês Conheça", que começa pelo texto visível.

### 3.3 Card de conteúdo / blog

```css
.card {
  background: var(--white); border-radius: var(--r-lg); overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: box-shadow var(--t-base), transform var(--t-base);
}
.card:hover { box-shadow: var(--shadow-hover); transform: translateY(-4px); }
.card--static:hover { box-shadow: var(--shadow-card); transform: none; }   /* card que nao e clicavel inteiro */
.card__img   { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
.card__body  { display: grid; gap: var(--space-2); padding: var(--space-4); }
.card__meta  { font-size: var(--fs-caption); line-height: var(--lh-caption); color: var(--paragraph); }   /* "28 de agosto de 2026" */
.card__tag   { font-size: var(--fs-caption); line-height: var(--lh-caption); font-weight: 700; color: var(--brand-text); text-transform: uppercase; }   /* "Dicas" */
.card__title { margin: 0; font-size: var(--fs-item); font-weight: 600; line-height: var(--lh-snug); color: var(--heading); }
.card__link  { justify-self: start; padding-block: var(--space-2); font-size: var(--fs-caption); line-height: var(--lh-caption); font-weight: 700; color: var(--brand-text-dark); }   /* "Continuar lendo" */
```
Ordem visual do card de blog: **imagem → data → categoria → título → "Continuar lendo"**. Sem resumo/excerpt — o título carrega tudo.

- A data vai em `<time datetime="2026-08-28">28 de agosto de 2026</time>`. O título é um `<h3>`.
- "Continuar lendo" é o único link do card e leva `aria-label="{título do post}. Continuar lendo"`. Com o padding ele mede 36px de altura (o mínimo da WCAG 2.2 para alvo é 24px).
- Imagem em 16:10, card com padding de 24px (`--space-4`). A sombra fica visível sobre branco e sobre `--bg-gray`.

### 3.4 Faixa de CTA (newsletter/lead)

O autor aponta este componente como o principal ponto de captação do site analisado (observação, sem dados de conversão). É um card largo, na cor da marca, com raio `--r-xl`, da mesma largura do conteúdo do `.container`. Na home ele fica sobreposto entre o hero e a primeira seção.

```css
.cta-band {
  /* mesma largura util do .container: nunca encosta na borda da tela */
  width: min(100% - 2 * var(--container-pad), var(--container) - 2 * var(--container-pad));
  margin-inline: auto;
  display: flex; flex-direction: column; gap: var(--space-4);
  padding: var(--space-4) var(--container-pad);
  background: var(--brand); color: var(--on-brand);
  border-radius: var(--r-xl);
}
.cta-band h2 { margin: 0; font-size: var(--fs-cta); font-weight: 700; line-height: var(--lh-heading); text-transform: uppercase; color: inherit; }
.cta-band p a { color: inherit; }  /* link do consentimento: o link da marca (§1) some sobre a propria marca */
.cta-band--overlap { position: relative; z-index: 2; margin-top: -40px; }   /* so na home: invade o hero */
@media (min-width: 768px) {
  .cta-band { flex-direction: row; align-items: center; justify-content: space-between; }
}
```
Título curto e imperativo, que diz o que a pessoa vai receber: **"Receba dicas e novidades da escola"** (a caixa alta vem do CSS). A mesma faixa, sem `--overlap` e com uma pílula no lugar do formulário, fecha a página de curso (§5.3).

### 3.5 Formulário progressivo de 1 campo (padrão de captura de lead)

Na leitura do autor, o detalhe mais inteligente do site analisado: a faixa de CTA pede **um campo por vez**, com contador `1 de 5` e um botão-seta. A intenção é reduzir o atrito percebido (hipótese do autor, sem medição).

- Um único campo visível por vez: `.input` de 44px, fundo `--white`, `border-radius: var(--r-full)`. **Ao lado** dele, não dentro, o botão-seta circular de 44px: fundo `--white`, ícone `--brand-text`, `aria-label="Próximo campo"`.
- Label acima do campo, com asterisco antes do texto: `* E-mail`. Dentro da faixa o asterisco herda a cor do texto (`--on-brand`); na cor da marca ele sumiria no fundo. O campo leva `required`, e a legenda "* obrigatório" aparece ao lado do contador.
- Contador `1 de 5` à direita, abaixo do campo, em `--fs-caption` e na cor do texto da faixa. Ele fica numa região `aria-live="polite"` que anuncia "Passo 2 de 5" a cada troca.
- Avança com Enter **ou** clique na seta. Do passo 2 em diante há um botão "Voltar" (texto sublinhado em `--fs-caption`, à esquerda do contador). A cada troca o foco vai para o novo campo.
- Ordem dos 5 campos, com `type` e `autocomplete`: **E-mail** (`email` / `email`) → **Nome** (`text` / `name`) → **Telefone/WhatsApp** (`tel` / `tel`) → **Cidade** (`text` / `address-level2`) → **Curso de interesse** (`<select>`). E-mail primeiro porque é o campo que o navegador preenche sozinho e o que identifica o lead.
- **Privacidade** (recomendação técnica; não substitui orientação jurídica): abaixo do campo, desde o passo 1, o texto "Ao continuar, você concorda em receber contato da {Marca} sobre cursos e matrícula. [Política de Privacidade]". Nada é gravado nem enviado a ferramenta de rastreamento antes do envio do último passo.

| Estado | O que aparece |
|---|---|
| Erro de campo | `aria-invalid="true"` no campo; abaixo dele, ícone de alerta + mensagem em peso 600 na cor do texto da faixa, em `<p role="alert">` ligado por `aria-describedby` ("Digite um e-mail válido, como nome@exemplo.com") |
| Enviando | a seta vira indicador de progresso e o botão fica `disabled` |
| Sucesso | o formulário é trocado por "Pronto, {nome}! Enviamos a confirmação para {e-mail}." e o foco vai para esse texto |
| Falha de envio | "Não foi possível enviar. Seus dados continuam aqui." + botão "Tentar de novo" (`.btn-pill--on-brand`) |

### 3.6 Inputs e selects

```css
.input, .select {
  display: block; width: 100%; min-height: 44px;
  padding: var(--space-2) 12px;
  border: 1px solid var(--border-input);
  border-radius: var(--r-sm);
  font: inherit; font-size: var(--fs-ui); line-height: 1.5;   /* 16px+ evita zoom automatico no iOS */
  background: var(--white); color: var(--input-text);
}
.cta-band .input { border-color: var(--white); border-radius: var(--r-full); padding-inline: var(--space-4); }   /* campo da faixa de CTA */
.input:hover, .select:hover { border-color: var(--heading); }
.input:disabled, .select:disabled { background: var(--bg-gray); color: var(--paragraph); cursor: not-allowed; }
.input[aria-invalid="true"], .select[aria-invalid="true"] { border-width: 2px; border-color: var(--danger); }   /* a altura continua 44px */

.label       { display: block; margin-bottom: var(--space-2); font-size: var(--fs-ui); font-weight: 600; line-height: 1.5; color: var(--heading); }
.label .req  { color: var(--brand-text); }   /* asterisco na cor da marca ANTES do texto: "* E-mail" */
.cta-band .label, .cta-band .label .req { color: inherit; }   /* sobre a marca, tudo na cor do texto da faixa */

.field__error { display: flex; gap: var(--space-2); margin: var(--space-2) 0 0; font-size: var(--fs-caption); line-height: var(--lh-caption); font-weight: 600; color: var(--danger); }
.cta-band .field__error { color: inherit; }
```

- **Foco:** a regra global do §1 (anel duplo). Não use `outline: none` nem troque a cor da borda no foco: se a marca for vermelha, uma borda na cor da marca parece erro.
- **Erro:** borda de 2px em `--danger` + ícone de alerta + mensagem em `<p class="field__error" role="alert">`, ligada ao campo por `aria-describedby`. Nunca só a cor.
- **Obrigatório:** asterisco com `aria-hidden="true"`, `required` no campo e a legenda "* obrigatório" no topo do formulário.
- **Atributos:** todo campo tem `<label for>`, `type` e `autocomplete` (`email`, `name`, `tel`, `bday`, `postal-code`, `address-level2`).
- **Busca no header:** input com ícone de lupa à esquerda (`padding-left: 48px`), largura máxima de 560px e fundo `--brand-tint` (tint da marca), para se destacar do branco sem virar caixa cinza. A borda continua `--border-input` (4,25:1 sobre o tint).

### 3.7 Stepper (wizard de matrícula)

```
(✓) Unidade ————————— (2) Sobre Você - - - - - - - ( 3 ) Curso
```
- É uma `<ol>`; o passo atual leva `aria-current="step"`.
- Passo concluído: círculo de 32px preenchido com `--brand`, ícone de check em `--on-brand`, rótulo em `--heading` peso 600.
- Passo atual: círculo de 32px preenchido com `--brand`, número em `--on-brand`, rótulo em `--brand-text` peso 700.
- Passos futuros: círculo de 32px com borda de 2px `--border-input` e número em `--paragraph`; rótulo em `--paragraph` peso 400.
- Linha conectora de 2px: `--brand` até o passo atual, `--border-input` adiante.
- Abaixo de 768px a linha vira vertical e os passos empilham.

### 3.8 Badge de idade

```css
.badge {
  display: inline-block; padding: var(--space-1) var(--space-3);
  background: var(--brand-dark); color: var(--on-brand-dark);   /* 7,44:1 com a marca padrao */
  border-radius: var(--r-md);
  font-size: var(--fs-caption); font-weight: 700; line-height: var(--lh-caption);
}
```
As faixas não se sobrepõem: `4 a 10 anos`, `11 a 14 anos`, `15 anos ou mais`. `--brand-light` não serve de fundo de badge nem de cor de texto.

### 3.9 Acordeão (séries e níveis)

```html
<details class="accordion">
  <summary><span lang="en">Kids</span></summary>
  <div class="accordion__panel">…</div>
</details>
```
```css
.accordion { background: var(--white); border: 1px solid var(--border); border-radius: var(--r-lg); }
.accordion + .accordion { margin-top: var(--space-3); }
.accordion summary {
  display: flex; align-items: center; justify-content: space-between; gap: var(--space-3);
  min-height: 64px; padding: var(--space-3) var(--space-4);
  border-radius: var(--r-lg); cursor: pointer; list-style: none;
  font-size: var(--fs-item); font-weight: 600; line-height: var(--lh-heading); color: var(--heading); text-transform: uppercase;
}
.accordion summary::-webkit-details-marker { display: none; }
.accordion summary::after {              /* chevron */
  content: ""; flex: none; width: 10px; height: 10px; margin-right: var(--space-1);
  border-right: 2px solid currentColor; border-bottom: 2px solid currentColor;
  transform: translateY(-3px) rotate(45deg); transition: transform var(--t-fast);
}
.accordion[open] summary::after { transform: translateY(2px) rotate(-135deg); }
.accordion summary:focus-visible { outline-offset: -2px; box-shadow: inset 0 0 0 4px var(--heading); }   /* foco por dentro */
.accordion__panel { padding: 0 var(--space-4) var(--space-4); }
```
`<details>` nativo: abre com clique, Enter e Espaço sem JS, e o conteúdo fechado continua no HTML. Vários podem ficar abertos ao mesmo tempo.

### 3.10 Carrossel (hero, cursos, depoimentos)

Todo carrossel do site segue as mesmas regras:

- Setas "Anterior" e "Próximo": `<button>` circular de 44px com `aria-label`, fundo `--white`, ícone `--heading`, sombra `--shadow-card`.
- Bullets: ponto visível de 10px dentro de um `<button>` de 24px; o atual é preenchido e leva `aria-current="true"`, os demais são um anel de 2px. Cor: `--brand-text` sobre fundo claro; `--white` no hero, onde bullets e botão de pausa ficam no canto inferior esquerdo do slide, dentro da área do scrim e 56px (`--space-6`) acima da base, para não ficarem sob a faixa de CTA.
- Autoplay só no hero: 6s por slide, pausa com o ponteiro em cima e com foco dentro, e um botão "Pausar"/"Retomar" de 44px sempre visível, com a receita das setas. Cursos e depoimentos não andam sozinhos.
- Slides fora da vista levam `inert`. O contêiner tem `aria-roledescription="carousel"` e um rótulo; cada slide tem `role="group"`, `aria-roledescription="slide"` e `aria-label="2 de 4"`.
- Com `prefers-reduced-motion: reduce` o autoplay nasce desligado (§6).

### 3.11 Demais componentes

Ícones: Lucide, traço de 2px, 24px, em `currentColor`. Ícone decorativo leva `aria-hidden="true"`; botão só de ícone leva `aria-label`.

| Componente | Receita |
|---|---|
| **Card de modalidade** | `.card.card--static` com `.card__body`; ícone de 24px em `--brand-text-dark` dentro de um círculo de 56px `--brand-tint`; `<h3>` em `--fs-item`/600; descrição em corpo. Sem link próprio: o CTA fica no fim da seção. |
| **Card de depoimento** | `.card.card--static` com `.card__body`; `<blockquote>` em corpo; avatar de 48px com as iniciais (fundo `--brand-tint`, texto `--brand-text-dark` 700); nome em `--fs-ui`/600 `--heading`; curso e unidade em `--fs-caption` `--paragraph`. |
| **Card de unidade** | `.card.card--static` com `.card__body`; nome em `<h3>` (`--fs-item`/600); endereço em `<address>`; telefone em `<a href="tel:…">`; links "WhatsApp" e "Ver no mapa"; `.btn-primary` "Fazer pré-matrícula nesta unidade", que leva a `/pre-matricula?unidade={slug}`. |
| **Item com ícone** | o mesmo círculo de 56px com ícone; `<h4>` em `--fs-item`/600; texto em corpo; `gap: var(--space-3)` entre círculo e texto. |
| **Contador** | número em `--fs-section`/700 `--brand-text`; rótulo em `--fs-caption`/600 `--heading`. O valor final está escrito no HTML; a contagem é só efeito visual (§6). |
| **Linha do tempo** | `<ol>`; em cada marco, ano em `--fs-card`/700 `--brand-deep`, título em `--fs-item`/600 e texto em corpo; trilho de 2px `--border` com ponto de 12px `--brand`. Vertical abaixo de 768px; horizontal a partir daí, com as regras do carrossel se não couber. |
| **Dropdown, side-nav, barra das conversões** | §5.1 |
| **Cookie bar e bolha de chat** | §8, itens 8 e 9 |

---

## 4. Layout e ritmo vertical

```css
.container { max-width: var(--container); margin-inline: auto; padding-inline: var(--container-pad); }
.section   { padding-block: var(--section-pt) var(--section-pb); }   /* 60/60; 100/120 a partir de 768px, pelos tokens */
.section--tint  { background: var(--brand-tint); }   /* secao destacada */
.section--gray  { background: var(--bg-gray); }      /* alternancia */
.section--tight { padding-block: var(--section-tight); }
.section__title { margin: 0 0 var(--heading-mb); font-size: var(--fs-section); font-weight: 700; color: var(--brand-deep); text-align: left; }

.grid-cards { display: grid; grid-template-columns: 1fr; gap: var(--grid-gap); }
.split      { display: grid; grid-template-columns: 1fr; gap: var(--grid-gap); align-items: center; }   /* imagem | texto */
@media (min-width: 768px) {
  .grid-cards { grid-template-columns: repeat(2, 1fr); }
  .split      { grid-template-columns: 1fr 1fr; gap: var(--space-6); }
}
@media (min-width: 1200px) {
  .grid-cards    { grid-template-columns: repeat(3, 1fr); }
  .grid-cards--4 { grid-template-columns: repeat(4, 1fr); }   /* modalidades */
}
```

O `.container` não tem media query: o respiro lateral muda pelo token `--container-pad`. Quando o H2 está dentro de uma coluna de texto (`.split`), a margem abaixo dele é `var(--space-4)`, não `--heading-mb`: os 40/60px valem para o título que ocupa a largura da seção.

**Ritmo de alternância de fundo** (evita a monotonia do branco infinito): cada seção tem o fundo indicado na coluna "Fundo" das tabelas do §5.2 e do §5.3. São três fundos, `--white`, `--brand-tint` e `--bg-gray`, e nunca dois coloridos iguais em sequência. Se, ao cortar seções, sobrarem dois fundos iguais vizinhos, o segundo vira `--white` (ou `--bg-gray`, se os dois forem brancos).

**Grades:**
- Cursos: faixa de tiles encostados, sem gap e sem raio (§3.2).
- Cards de blog / recursos / depoimentos / unidades: `.grid-cards`, 1 coluna → 2 a partir de 768px → 3 a partir de 1200px, com `gap: var(--grid-gap)` (32px).
- Modalidades: `.grid-cards.grid-cards--4`, 1 → 2 → 4 colunas.
- Diferenciais/prêmios, sobre e viagens: `.split`, 2 colunas a partir de 768px (imagem | texto ou lista de itens com ícone).

**Breakpoints:** três, sempre `min-width`: `576`, `768` e `1200`. O site analisado usa também `992` e `1400`; este guia não precisa deles.

**Altura até 480px: tudo o que é fixo rola junto.** É a única regra que não é de largura. O zoom de 400% num monitor de 1280 × 1024 dá uma janela de 320 × 256; ali o header (64px), a barra das conversões (56px) e a cookie bar (76 a 148px) juntos cobrem a janela inteira e a pessoa não vê conteúdo. Com a janela de até 480px de altura, header, barra das conversões, cookie bar, bolha de chat e botão de Libras deixam de ser fixos e viram itens do fluxo da página (a barra, a cookie bar e os dois botões ficam no fim dela), e o espaço reservado para eles some.

```css
@media (max-height: 480px) {
  html { scroll-padding-top: 0; scroll-padding-bottom: 0; }
  body { padding-bottom: 0; }
  .site-header, .cta-bar, .cookie-bar, .chat-bubble, .libras { position: static; }
  .cookie-bar, .cookie-bar__inner { height: auto; }
  .chat-bubble { margin: var(--space-3) 24px 24px auto; }
  .libras { margin-left: auto; transform: none; }
}
```

| A partir de | O que muda |
|---|---|
| base | 1 coluna em tudo; pílulas com largura total; tiles de curso 1,2 por tela; faixa de CTA empilhada; hero com scrim uniforme; stepper vertical; header de 64px e barra fixa das conversões |
| 576px | pílulas com a largura do rótulo, lado a lado |
| 768px | seções com 100/120px e `--container-pad` de 35px; `.grid-cards` em 2 colunas; `.split` em 2 colunas; tiles 2 por tela; faixa de CTA na horizontal; hero com o texto nos 55% da esquerda; stepper horizontal; footer em colunas |
| 1200px | header de duas faixas (143px), sem barra fixa; `.grid-cards` em 3 colunas (modalidades em 4); tiles 4 por tela; hero em coverflow |

---

## 5. Anatomia das páginas (arquitetura de informação)

### 5.1 Header

**A partir de 1200px: duas faixas, 143px (`--header-h`).**

```
+- Faixa 1 (64px) ---------------------------------------------------------------------------------------+
| [LOGO]      [ Pesquisar no site ......................]      (pino) Encontre uma unidade     [Acesso v] |
+- Faixa 2 (79px) ---------------------------------------------------------------------------------------+
| Home  Sobre Nos v  Cursos v  Blog  E-book  Faca Parte v  Seja um Franqueado  Fale Conosco               |
|                                                                                       [Pre-matricula]   |
|                                                                                        Teste de nivel   |
+---------------------------------------------------------------------------------------------------------+
```
- `<header>` com `position: sticky; top: 0; z-index: 10` e fundo `--white`. A borda inferior de 1px `--border` é a última linha da faixa 2 (contada nos seus 79px), para que o header some os 143px de `--header-h`. As duas faixas usam o `.container`.
- **Faixa 1:** logo; busca do site (§3.6); o link **"Encontre uma unidade"** com ícone de pino, que leva a `/unidades` (`--fs-ui`/600, `--brand-text-dark`, sublinhado); e **`Acesso ▾`**, um `.btn-outline` que abre um dropdown agrupado por perfil — padrão essencial em escola com portal:
  `Para o aluno` (Portal do Aluno, plataforma online) · `Para o franqueado` (Painel, sistema de gestão, webmail) · `Para o professor` (Portal do Professor).
- **Faixa 2:** `<nav aria-label="Principal">` numa linha só, com links em `--fs-ui`/500 `--heading` e `gap: 28px`; o item da página atual fica em `--brand-text`, peso 700, com `aria-current="page"`.
- **CTA duplo à direita da faixa 2:** `.btn-primary` "Pré-matrícula" e, 4px abaixo, o link "Teste de nível" (`--fs-caption`/600, `line-height: var(--lh-heading)`, `--brand-text-dark`, sublinhado, `padding-block: 4px`: 25px de altura, acima do mínimo de 24px para alvo). Botão, respiro e link somam 73px e cabem nos 79px da faixa. Hierarquia clara de compromisso.
- **Dropdown:** o gatilho é um `<button aria-expanded aria-controls>`. O painel fechado tem `visibility: hidden` (não só `opacity: 0`, que deixaria os links focáveis e invisíveis). Abre com clique, Enter e Espaço; Esc fecha e devolve o foco ao gatilho. Entrada: `opacity` + `translateY(-6px)` em `var(--t-fast)`. Painel: fundo `--white`, raio `--r-md`, sombra `--shadow-card`, itens com 44px de altura.

**Abaixo de 1200px: uma faixa de 64px e uma barra fixa no pé da tela.**

```
+- Header (64px) -----------------------+
| [=]           [LOGO]           (pino) |
+---------------------------------------+
|               conteudo                |
+- Barra das conversoes (56px) ---------+
| [ Teste de nivel ]  [ Pre-matricula ] |
+---------------------------------------+
```
- **Header:** hambúrguer à esquerda, logo centralizado, atalho de unidades (ícone de pino) à direita. Os dois botões têm 44px e `aria-label` ("Abrir menu", "Encontre uma unidade").
- **Barra das conversões:** `position: fixed; bottom: 0`, altura de 56px (`--cta-bar-h`) mais `env(safe-area-inset-bottom)`, fundo `--white`, borda superior de 1px `--border`. Dois botões de 44px em duas colunas `repeat(2, minmax(0, 1fr))`: `.btn-outline` "Teste de nível" e `.btn-primary` "Pré-matrícula". Em 320px cada coluna tem cerca de 124px, menos que um rótulo da Montserrat: os botões têm `padding: 4px var(--space-2)`, `white-space: normal` e `line-height: 1.2`, e o rótulo quebra em duas linhas em vez de sair da barra. É ela que mantém as duas conversões sempre visíveis; a partir de 1200px ela some (`--cta-bar-h: 0px`) e o CTA duplo do header assume.
- **Side-nav:** o hambúrguer abre um `<dialog>` modal (foco preso, fundo inerte, Esc fecha) com botão "Fechar" de 44px. Conteúdo, nesta ordem: busca do site, "Encontre uma unidade", os links de navegação, o grupo "Acesso" e os dois CTAs.

### 5.2 Home — ordem das seções (essa sequência é a receita)

| # | Seção | Fundo | CTA de fechamento | Função de negócio |
|---|---|---|---|---|
| 1 | **Hero carrossel** (Swiper, 4 slides, bullets; coverflow a partir de 1200px) | foto + scrim | par de pílulas: `--ghost` "Fazer teste de nível" + `--brand` "Fazer pré-matrícula" | Campanha sazonal / matrícula |
| 2 | **Faixa de CTA de lead** (`.cta-band.cta-band--overlap` com o formulário progressivo) | `--brand` | botão-seta do formulário | Captura de e-mail acima da dobra |
| 3 | **Sobre / método** (`.split`: imagem + texto + números) | `--white` | `.btn-outline` "Saiba mais" | Confiança |
| 4 | **Cursos** — faixa de tiles | `--white` | cada tile é o link ("Conheça") | Navegação comercial principal |
| 5 | **Busca de unidade** (`.section--tight`: título em `--fs-card` + o campo do §5.4) | `--bg-gray` | `.btn-primary` "Buscar" | Ancoragem local |
| 6 | **Recursos digitais** (app, plataforma) | `--white` | `.btn-outline` "Conheça!" | Diferencial competitivo moderno |
| 7 | **Viagens e intercâmbios** (`.split`) | `--brand-tint` | `.btn-outline` "Conheça!" | Upsell / sonho |
| 8 | **Por que nós** — contadores + prêmios/selos | `--white` | `.btn-outline` "Saiba mais" | Prova social institucional |
| 9 | **Linha do tempo** ("{N} décadas de história") | `--brand-tint` | `.btn-outline` "Conheça nossa história" | Autoridade e longevidade |
| 10 | **Depoimentos de alunos** (carrossel de cards) | `--bg-gray` | par: `.btn-outline` "Fazer teste de nível" + `.btn-primary` "Fazer pré-matrícula" | Prova social pessoal |
| 11 | **Blog** (3 posts em `.grid-cards`) | `--white` | `.btn-outline` "Saiba mais", com `aria-label="Saiba mais: todos os posts do blog"` | SEO e nutrição de lead |
| 12 | **Footer** (§5.6) | `--brand-dark` | repete as duas conversões | Navegação completa + repetição do CTA |

- **Hero:** um `<h1>` só, no slide 1; nos outros slides o título é um `<p>` com o mesmo estilo. Texto em `--white` sobre scrim obrigatório: abaixo de 768px, `rgb(0 0 0 / .6)` sobre o slide inteiro; a partir de 768px, `linear-gradient(90deg, rgb(0 0 0 / .7) 0%, rgb(0 0 0 / .55) 55%, transparent 100%)`, com o texto restrito aos 55% da esquerda. No pior caso (foto branca) isso dá 5,74:1 e 4,74:1. A imagem do slide 1 leva `fetchpriority="high"`, `width` e `height`, sem `loading="lazy"`.
- **Brancos seguidos:** 3 e 4 são os únicos; a faixa de tiles, que é imagem de ponta a ponta, separa as duas.
- **Eyebrow:** uma linha acima do H2 nas seções 3, 4 e 6 a 11, com o nome curto da seção ("Sobre nós", "Cursos", "Blog"), a 16px (`--space-3`) do título. Não entra no hero, na faixa de CTA nem na busca de unidade, e só existe na home.
- **Números e prêmios** são os da escola: `{N}+ anos`, `{N} unidades`, `{prêmio} {N}×`. Não copie os do site analisado.

> Se você precisa cortar, mantenha **1, 2, 4, 5, 8, 10, 12**. Na leitura do autor, é o esqueleto mínimo de uma home de escola de idiomas que converte.

### 5.3 Página de curso (`/cursos/{idioma}`) — template reutilizável

| # | Bloco | Fundo | CTA de fechamento |
|---|---|---|---|
| 1 | **Hero interno**: ilustração do idioma em tons de `--brand-deep` e `--brand-dark`, sem bandeiras, com o scrim do hero (§5.2); `<h1>` "Curso de Inglês", subtítulo motivacional, 1 parágrafo | ilustração + scrim | par de pílulas: `--ghost` "Fazer teste de nível" + `--on-brand` "Fazer pré-matrícula" |
| 2 | **"{Idioma} para todas as fases da vida"** — 3 blocos por faixa etária (`.grid-cards`), cada um com **badge de idade** (`4 a 10 anos`, `11 a 14 anos`, `15 anos ou mais`), `<h3>` e descrição | `--white` | `.btn-outline` "Saiba mais" em cada bloco, com `aria-label="Saiba mais: {nome do bloco}"` |
| 3 | **Modalidades de aula** — 4 cards (`.grid-cards--4`): Em grupo · Individual · Presencial · On-line | `--brand-tint` | `.btn-primary` "Fazer pré-matrícula" |
| 4 | **Metodologia** — `.split`: texto + 2 blocos (Método próprio · Recursos tecnológicos) | `--white` | `.btn-outline` "Conheça!" |
| 5 | **Séries/níveis** — acordeões por faixa (§3.9): `Kids`, `Teens`, `Young Adults & Adults`, cada rótulo com `lang="en"` | `--bg-gray` | `.btn-primary` "Fazer pré-matrícula" |
| 6 | **Faixa final** — `.cta-band` sem `--overlap`, dentro de uma `.section--tight`: "Teste seu nível de inglês" | `--white` | `.btn-pill--on-brand` "Fazer teste" |

*Segmentar por idade antes de qualquer outra coisa é, na leitura do autor, o padrão mais importante de escola de idiomas.* As modalidades são sempre as mesmas quatro, em dois eixos — **formato** (em grupo ou individual) e **meio** (presencial ou on-line) — aqui, no §8 e no passo 3 da pré-matrícula.

### 5.4 Busca de unidades (`/unidades`)

- Hero em `--brand` liso, texto em `--on-brand`, com ilustração isométrica do mapa em tons da marca e headline pessoal: **"{Marca} perto de você!"**.
- Barra de busca larga logo abaixo do hero: `<label>` visível "Onde você quer estudar?", campo com o placeholder `CEP, cidade, estado ou nome da unidade` e `.btn-primary` "Buscar". Ao lado, o botão "Usar minha localização" (`.btn-outline`, com ícone). A localização só é pedida ao navegador depois desse clique, nunca ao carregar a página.
- Resultado em cards de unidade (§3.11), em `.grid-cards`, ordenados por distância quando há CEP ou localização e por nome nos outros casos; 9 por vez, com o botão "Ver mais unidades". O número de resultados é anunciado numa região `aria-live="polite"` ("12 unidades em Campinas").
- A mesma barra, sem o hero, é a seção 5 da home; lá o envio leva a `/unidades?q={termo}`.

| Estado | O que aparece |
|---|---|
| Inicial (sem busca) | as unidades do estado mais buscado ou, com localização permitida, as 9 mais próximas |
| Carregando | 3 cards-esqueleto no lugar da lista e `aria-busy="true"` na região de resultados |
| Sem resultado | "Não encontramos unidades para "{termo}"." + as 3 unidades mais próximas, quando houver CEP ou localização + `.btn-outline` "Conhecer as aulas on-line" |
| Termo inválido (CEP incompleto) | erro de campo do §3.6: "Digite o CEP com 8 números." |
| Localização negada | "Não foi possível usar sua localização. Busque por CEP ou cidade." abaixo do campo, que recebe o foco |
| Falha de rede | "Não foi possível buscar agora." + `.btn-outline` "Tentar de novo"; o termo digitado é mantido |

### 5.5 Pré-matrícula (`/pre-matricula`) — wizard de 3 passos

**Passo 1 — Unidade:** campo de CEP como atalho ("Digite seu CEP para achar a unidade mais próxima") e, abaixo dele, selects em cascata `País → Estado → Cidade → Bairro → Unidade` (cada um só habilita ao preencher o anterior; desabilitado tem a aparência do §3.6). Se a página abre com `?unidade={slug}` (vinda do card de unidade), o wizard começa no passo 2 com a unidade já mostrada e um link "Trocar unidade".
**Passo 2 — Sobre Você:** nome, data de nascimento, e-mail, telefone. Se a data indicar menos de 18 anos, aparece o bloco "Responsável": nome, e-mail e telefone do responsável e a caixa, desmarcada por padrão, "Sou responsável legal e autorizo o tratamento dos dados do aluno para fins de matrícula".
**Passo 3 — Curso:** curso, formato (em grupo / individual), meio (presencial / on-line) e turno (manhã / tarde / noite). Abaixo, o resumo dos três passos para revisão, o link para a Política de Privacidade e o botão "Enviar pré-matrícula".

Cada passo tem "Voltar" (`.btn-outline`) e "Continuar" (`.btn-primary`); os dados preenchidos são mantidos ao voltar. Os itens de consentimento são recomendação técnica e não substituem orientação jurídica.

| Estado | O que aparece |
|---|---|
| Erro de validação | erro de campo do §3.6 em cada campo; o foco vai para o primeiro campo com erro |
| Enviando | "Enviar pré-matrícula" fica `disabled` com o rótulo "Enviando…" |
| Sucesso | tela "Pré-matrícula recebida": número de protocolo, unidade escolhida, "A unidade entra em contato em até {N} dias úteis" e `.btn-outline` "Fazer teste de nível" |
| Falha de envio | "Não foi possível enviar. Seus dados continuam aqui." + `.btn-primary` "Tentar de novo" |

Por que funciona, na leitura do autor: escolher a unidade **primeiro** ancora o lead a uma escola física real (e roteia o lead ao franqueado certo). No wizard de pré-matrícula, não peça dados pessoais antes de o usuário ter escolhido "onde".

### 5.6 Footer (na cor `--brand-dark`)

`<footer>` com logo na cor do texto + 4 colunas de links + copyright. Colunas, cada uma num `<nav aria-label>`: **Sobre nós · Cursos · Faça parte · Acesso**. Repita ali `Pré-matrícula`, `Teste de nível`, `Trabalhe Conosco`, `Seja um franqueado` e `Política de Privacidade`. Texto e links em `--on-brand-dark` sobre `--brand-dark` (7,44:1 com a marca padrão), links sublinhados no hover e no foco. Abaixo de 768px as colunas empilham. O link `Política de Privacidade` da linha do copyright, que fica fora de parágrafo, tem `display: inline-flex` e `min-height: 44px`.

### 5.7 Teste de nível (`/teste-de-nivel`)

É a segunda conversão primária e tem fluxo próprio, em quatro etapas com o stepper do §3.7:

1. **Idioma:** escolha do idioma, em cards de rádio (um `<fieldset>` com `<legend>`).
2. **Questões:** 15 questões de múltipla escolha, uma por tela, com "Questão 4 de 15", "Voltar" e "Próxima". Cada questão é um `<fieldset>`; o enunciado no idioma testado leva `lang`. Sem tempo limite.
3. **Seus dados:** nome e e-mail, com o texto de consentimento do §3.5. Vêm depois das questões, não antes.
4. **Resultado:** nível estimado (por exemplo "Intermediário — B1"), uma frase sobre o que ele significa, o curso indicado e o par `.btn-outline` "Encontrar uma unidade" + `.btn-primary` "Fazer pré-matrícula".

Estados: sair no meio guarda as respostas no próprio navegador e oferece "Continuar de onde parei"; falha de envio mostra "Não foi possível calcular seu resultado." + "Tentar de novo", sem perder as respostas.

### 5.8 Demais páginas do menu

Todas usam header, footer e a faixa final de CTA do §5.3. Uma linha por página:

| Página | Blocos | CTA |
|---|---|---|
| **Sobre nós** | hero interno · história (linha do tempo) · números · prêmios | `.btn-primary` "Fazer pré-matrícula" |
| **Blog (lista)** | título · filtro por categoria · `.grid-cards` com 9 posts · paginação | "Continuar lendo" em cada card |
| **Blog (post)** | `<article>` com `<h1>`, data em `<time>`, texto em coluna de até 720px · 3 posts relacionados | faixa final de CTA |
| **E-book** | capa + lista do que o material traz · formulário de nome e e-mail com o consentimento do §3.5 | `.btn-primary` "Baixar e-book" |
| **Faça parte / Trabalhe conosco** | texto · vagas ou formulário | `.btn-primary` "Enviar" |
| **Seja um franqueado** | landing própria: hero · números da rede · etapas · formulário | `.btn-primary` "Quero ser franqueado" |
| **Fale conosco** | formulário (nome, e-mail, unidade, mensagem) · canais | `.btn-primary` "Enviar mensagem" |
| **Política de Privacidade** | texto corrido em coluna de até 720px, com sumário | — |
| **404** | "Página não encontrada" · busca do site · links para Cursos e Unidades | `.btn-primary` "Voltar para a home" |

### 5.9 SEO local e dados estruturados

- Cada unidade tem URL própria, `/unidades/{uf}/{cidade}/{slug}`, com nome, endereço e telefone em texto (não em imagem) e JSON-LD `LanguageSchool`: `name`, `address`, `geo`, `telephone`, `openingHours`, `url`.
- Páginas de curso com JSON-LD `Course`.
- `<title>` e `meta description` únicos por página; `<link rel="canonical">`; `sitemap.xml` com cursos, unidades e posts.
- Se o site atende mais de um país ou idioma (o passo 1 da pré-matrícula tem "País"), `hreflang` em cada versão.

---

## 6. Movimento e microinterações

| Elemento | Comportamento |
|---|---|
| **Entrada de seção** | `opacity: 0; transform: translateY(50px)` → `opacity: 1; translateY(0)` em `var(--t-slow)` quando entra na viewport (transição de CSS disparada por IntersectionObserver). Uma vez só, sem repetir ao voltar. |
| **Texto do hero** | `translateY(10px)` + fade, escalonado (80ms entre linhas) |
| **Hover de tile de curso** | imagem `scale(1.06)` e overlay mais escuro (`rgb(0 0 0 / .2)` a mais), os dois em `var(--t-slow)` |
| **Hover de card** | `translateY(-4px)` + sombra `--shadow-hover`, em `var(--t-base)` |
| **Hover de botão** | só troca de cor, em `var(--t-fast)`. **Nunca** escala nem pula. |
| **Contador de números** | anima de 0 até o valor ao entrar na tela (ex.: `0+ → {N}+ anos`). O valor final já está no HTML. |
| **Carrosséis** | Swiper com as regras do §3.10. Hero: `coverflow` a partir de 1200px, com os slides laterais visíveis, desfocados e `inert`; `slide` abaixo disso; autoplay de 6s com botão de pausa. Cursos e depoimentos: `slide`, sem autoplay. |
| **Scroll** | nativo. Sem biblioteca de smooth scroll. |

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important; animation-iteration-count: 1 !important;
    transition-duration: 1ms !important; scroll-behavior: auto !important;
  }
}
```

O bloco acima só alcança o que é CSS. O que roda em JS também precisa obedecer: com `matchMedia('(prefers-reduced-motion: reduce)').matches`, o Swiper é criado com `autoplay: false` e efeito `slide`, o contador mostra o valor final sem contar, e a revelação de scroll não é aplicada.

⚠️ **Armadilha real observada no site:** o conteúdo revelado por scroll fica **invisível para crawlers e para prints** se o JS falhar ou o observer não disparar. Renderize com `opacity: 1` por padrão e aplique o estado inicial da animação só via JS — senão você perde SEO e acessibilidade.

---

## 7. Acessibilidade — o que copiar e o que corrigir

Piso: WCAG 2.2 AA.

**Copie:**
- `aria-label` descritivo em todo link cujo único texto visível é genérico (`aria-label="{título do post}. Continuar lendo"`, `aria-label="Saiba mais: {assunto}"`) e em todo botão só de ícone (`aria-label="Próximo campo"`, "Abrir menu", "Abrir chat"). Quando o link já contém o nome do destino, como o tile de curso, não precisa.
- `<nav aria-label="Cursos">`, `<nav aria-label="Sobre nós">` — nomeie cada bloco de navegação.
- **Widget de Libras** (VLibras) na posição padrão do plugin, no meio da borda direita. Recomendado em site educacional brasileiro; não substitui a conformidade com a WCAG.
- Alvos de 44px nos botões e campos; nenhum alvo com menos de 24px.

**Semântica:**
- `<html lang="pt-BR">`. Palavra ou trecho em outro idioma leva `lang`: `<span lang="en">Kids</span>`.
- Landmarks `<header>`, `<main id="conteudo">` e `<footer>`. O primeiro elemento focável da página é o skip link "Pular para o conteúdo".
- Um `<h1>` por página. Seções em `<section aria-labelledby>` com `<h2>`; títulos de card e de bloco em `<h3>`; itens em `<h4>`.
- Ação na página é `<button>` (Acesso, acordeão, bullets, seta do formulário, hambúrguer); navegação é `<a>`.
- Datas em `<time datetime>`. `<title>` único por página.

**Foco:**
- Uma regra só, a do §1: anel branco de 2px colado ao elemento e anel `--heading` de 2px por fora. Nunca `outline: none`, nunca anel só na cor da marca (sobre a própria marca ele dá 1,00:1).
- Um dos dois anéis sempre contrasta: o branco passa de 3:1 em todo fundo de luminância até 0,30 e o escuro em todo fundo acima de 0,10; as duas faixas se sobrepõem. Os fundos do guia estão na tabela abaixo.
- Onde o contêiner recorta (tile de curso, acordeão), o anel é desenhado por dentro (§3.2, §3.9).
- Foco não encoberto: o header fixo, a barra das conversões e a cookie bar entram no `scroll-padding` do §1.

**Cor nunca é o único sinal:** erro = borda + ícone + texto; passo do stepper = check ou número + peso do rótulo; item atual da navegação = peso 700 + `aria-current`; link em texto corrido = cor + sublinhado; bullet atual = preenchido contra anel.

**Contraste** dos pares que este guia prescreve, com a marca padrão (`--brand: #d71920`). Calculado pela fórmula de luminância relativa da WCAG; cores com alfa foram compostas sobre o fundo antes do cálculo. Ao trocar a marca, refaça as linhas que têm token `--brand*` (§1.1).

| Par | Texto | Fundo | Razão | Passa 4,5 | Passa 3,0 |
|---|---|---|---|---|---|
| Corpo e placeholder (`--paragraph`) sobre `--white` | `#666666` | `#ffffff` | 5,74:1 | sim | sim |
| Corpo sobre `--bg-gray` (também campo e botão desabilitados) | `#666666` | `#f2f3ef` | 5,15:1 | sim | sim |
| Corpo e placeholder sobre `--brand-tint` | `#666666` | `#fdf1f2` | 5,21:1 | sim | sim |
| Títulos (`--heading`) sobre `--white` (também botões da cookie bar e hover da pílula fantasma) | `#04000b` | `#ffffff` | 20,79:1 | sim | sim |
| Títulos sobre `--bg-gray` | `#04000b` | `#f2f3ef` | 18,66:1 | sim | sim |
| Títulos sobre `--brand-tint` | `#04000b` | `#fdf1f2` | 18,85:1 | sim | sim |
| H2 (`--brand-deep`) sobre `--white` | `#5a0b0d` | `#ffffff` | 14,11:1 | sim | sim |
| H2 sobre `--bg-gray` | `#5a0b0d` | `#f2f3ef` | 12,66:1 | sim | sim |
| H2 sobre `--brand-tint` | `#5a0b0d` | `#fdf1f2` | 12,79:1 | sim | sim |
| `--brand-text` sobre `--white` (tag, rótulo ativo, asterisco, contador, pílula branca) | `#d71920` | `#ffffff` | 5,19:1 | sim | sim |
| `--brand-text` sobre `--bg-gray` | `#d71920` | `#f2f3ef` | 4,65:1 | sim | sim |
| `--brand-text` sobre `--brand-tint` | `#d71920` | `#fdf1f2` | 4,70:1 | sim | sim |
| `--brand-text-dark` sobre `--white` (links, botão outline) | `#aa1419` | `#ffffff` | 7,44:1 | sim | sim |
| `--brand-text-dark` sobre `--bg-gray` | `#aa1419` | `#f2f3ef` | 6,67:1 | sim | sim |
| `--brand-text-dark` sobre `--brand-tint` (também o ícone no círculo) | `#aa1419` | `#fdf1f2` | 6,74:1 | sim | sim |
| `--on-brand` sobre `--brand` (botão primário, faixa de CTA e seu asterisco, hero de unidades) | `#ffffff` | `#d71920` | 5,19:1 | sim | sim |
| `--on-brand-dark` sobre `--brand-dark` (footer, hover de botão, badge) | `#ffffff` | `#aa1419` | 7,44:1 | sim | sim |
| `--white` sobre `--brand-deep` (botão pressionado) | `#ffffff` | `#5a0b0d` | 14,11:1 | sim | sim |
| Texto de campo (`--input-text`) sobre `--white` | `#212529` | `#ffffff` | 15,43:1 | sim | sim |
| Texto de campo sobre `--brand-tint` (busca do header) | `#212529` | `#fdf1f2` | 13,99:1 | sim | sim |
| Erro (`--danger`) sobre `--white` | `#b3261e` | `#ffffff` | 6,54:1 | sim | sim |
| Erro sobre `--bg-gray` | `#b3261e` | `#f2f3ef` | 5,86:1 | sim | sim |
| Erro sobre `--brand-tint` | `#b3261e` | `#fdf1f2` | 5,93:1 | sim | sim |
| Sucesso (`--success`) sobre `--white` | `#1b6e3a` | `#ffffff` | 6,29:1 | sim | sim |
| Sucesso sobre `--bg-gray` | `#1b6e3a` | `#f2f3ef` | 5,64:1 | sim | sim |
| Sucesso sobre `--brand-tint` | `#1b6e3a` | `#fdf1f2` | 5,70:1 | sim | sim |
| Cookie bar: `--white` sobre `--dark` | `#ffffff` | `#0e0f11` | 19,18:1 | sim | sim |
| Hero abaixo de 768px: `--white` sobre foto branca com scrim de 0,6 (pior caso) | `#ffffff` | `#666666` | 5,74:1 | sim | sim |
| Hero a partir de 768px: `--white` sobre foto branca com scrim de 0,55 (pior caso, na borda da área de texto) | `#ffffff` | `#737373` | 4,74:1 | sim | sim |
| Tile: `--white` sobre foto branca com overlay de 0,55 (pior caso, a meia altura) | `#ffffff` | `#737373` | 4,74:1 | sim | sim |
| Borda de campo (`--border-input`) sobre `--white` | `#6c757d` | `#ffffff` | 4,69:1 | sim | sim |
| Borda de campo sobre `--bg-gray` | `#6c757d` | `#f2f3ef` | 4,21:1 | não (é borda: vale 3,0) | sim |
| Borda de campo sobre `--brand-tint` (busca do header) | `#6c757d` | `#fdf1f2` | 4,25:1 | não (é borda: vale 3,0) | sim |
| Foco: anel `--heading` sobre `--white` | `#04000b` | `#ffffff` | 20,79:1 | sim | sim |
| Foco: anel `--heading` sobre `--bg-gray` | `#04000b` | `#f2f3ef` | 18,66:1 | sim | sim |
| Foco: anel `--heading` sobre `--brand-tint` | `#04000b` | `#fdf1f2` | 18,85:1 | sim | sim |
| Foco: anel `--white` sobre `--brand` | `#ffffff` | `#d71920` | 5,19:1 | sim | sim |
| Foco: anel `--white` sobre `--brand-dark` | `#ffffff` | `#aa1419` | 7,44:1 | sim | sim |
| Foco: anel `--white` sobre `--dark` | `#ffffff` | `#0e0f11` | 19,18:1 | sim | sim |
| Foco: anel `--white` sobre foto com scrim de 0,55 (pior caso) | `#ffffff` | `#737373` | 4,74:1 | sim | sim |

Não recebem texto: `--brand-light` (branco sobre ela dá 4,55:1 com a marca padrão, sem folga, e cai abaixo de 4,5 com outras marcas) e `--border` (1,30:1 sobre branco; é só divisória).

**Corrija no seu projeto (falhas que o autor viu no site analisado, por inspeção de fora; não foram verificadas por terceiros):**
- Imagens sem `loading="lazy"` e com `alt="Slide 3"` (sem valor semântico). Use `alt` descritivo ou `alt=""` se decorativo; `lazy` em tudo abaixo da dobra, menos na imagem do hero; `width` e `height` em todas.
- Logo com largura nativa de 797px renderizado a 102px — sirva imagens no tamanho certo (`srcset` + WebP/AVIF).
- `!important` espalhado no CSS de botões. Com tokens você não precisa disso.
- Garanta foco visível de teclado em todos os interativos: o anel duplo do §1, não um anel na cor da marca.

---

## 8. Conversão e confiança — os padrões que geram valor

São padrões que o autor observou no site analisado e considera os que geram valor; o guia não traz dados de conversão.

1. **Escada de compromisso.** Ofereça sempre três degraus: *ler* (blog/e-book) → *experimentar* (teste de nível gratuito, aula experimental) → *converter* (pré-matrícula). O "Teste de nível" é o degrau do meio e existe em toda página.
2. **Isca de conteúdo.** Um item de menu inteiro dedicado a `E-book`. Material gratuito troca conteúdo por e-mail.
3. **Prova social em três camadas:** números (`{N}+ anos`), prêmios/selos institucionais (`{prêmio} {N}×`), e depoimentos nominais de alunos. Use as três — cada uma convence um público diferente.
4. **Segmentação por idade antes de tudo.** Pais e adultos são compradores diferentes. Rotule com faixa etária explícita (`4 a 10 anos`).
5. **Modalidade explícita.** Formato (em grupo ou individual) e meio (presencial ou on-line), comparados lado a lado. É a primeira dúvida de quem procura curso hoje.
6. **Ancoragem local.** Buscador de unidades na faixa 1 do header, na seção 5 da home e como passo 1 da matrícula.
7. **Rota do franqueado.** Se o modelo for franquia, `Seja um Franqueado` fica no menu principal — é um funil B2B independente com sua própria landing page.
8. **Chat flutuante:** bolha circular de 56px em `--brand`, ícone em `--on-brand`, sombra `--shadow-brand`, `aria-label="Abrir chat"`, no canto inferior direito: `right: 24px; bottom: calc(var(--cta-bar-h) + var(--cookie-h) + 24px)`. Resposta rápida para dúvida de matrícula. O script do chat só carrega depois da primeira interação com a página.
9. **Cookie bar LGPD** ancorada no pé da tela, sem modal (com altura até 480px ela rola junto, §4): `position: fixed; bottom: var(--cta-bar-h)`, fundo `--dark`, texto `--white`. Três controles: `Recusar` e `Aceitar`, com a mesma receita e o mesmo peso visual (fundo `--white`, texto `--heading`, raio `--r-sm`, 44px), e o link `Preferências`, que abre as categorias Necessários / Desempenho / Marketing. Link para a Política de Privacidade no texto. O JS grava a altura da barra em `--cookie-h` ao exibir e zera ao fechar, para que ela não cubra o chat, o fim da página nem o elemento em foco.
10. **Rastreamento:** GTM + GA4 + Meta Pixel + TikTok Pixel + Clarity. Nenhuma tag dispara antes do aceite na cookie bar (Consent Mode v2), e cada uma respeita a categoria escolhida. Clarity com mascaramento de todos os campos de formulário. Depois do aceite, dispare eventos nomeados em: `clicou_pre_matricula`, `enviou_lead_newsletter`, `iniciou_teste_nivel`, `buscou_unidade`, `concluiu_pre_matricula`.

Os itens 9 e 10, o texto de consentimento do §3.5 e o bloco do responsável do §5.5 são recomendação técnica para tratar dados pessoais com cuidado. Não substituem orientação jurídica sobre a LGPD.

---

## 9. Stack recomendada

Parte do que o autor identificou no site analisado, reduzida ao que o guia precisa:

- **Next.js ou Astro, com SSG ou SSR.** É obrigatório: home, cursos e unidades precisam sair em HTML do servidor, pelo alerta do §6 e pelo SEO local do §5.9. SPA renderizado só no cliente não serve.
- **Swiper** para todos os carrosséis (hero, cursos, depoimentos), com as regras do §3.10; com `prefers-reduced-motion: reduce` é criado sem autoplay e com efeito `slide` (§6)
- **Revelação de scroll em CSS + IntersectionObserver**, sem biblioteca de animação; não é aplicada com `prefers-reduced-motion: reduce` (§6)
- **Scroll nativo**, sem biblioteca de smooth scroll
- **Tailwind** com o config do §1.2, ou CSS puro com as custom properties
- **Montserrat** variável (`wght 400..700`), auto-hospedada via `@fontsource-variable/montserrat`, com `font-display: swap`. Só os pesos 400, 500, 600 e 700 são usados.
- **Lucide** para os ícones
- **VLibras** (`https://vlibras.gov.br/app/vlibras-plugin.js`) para acessibilidade em Libras, carregado depois da primeira interação com a página

O site analisado usa também Framer Motion e Lenis; este guia dispensa os dois para não pôr três bibliotecas de animação na conta de desempenho.

---

## 10. Checklist de aceite

**Tokens e tipografia**
- [ ] Tokens do §1 definidos em um único arquivo; nenhuma cor em hex nem a cor da marca escrita em componente (a exceção é o preto com alfa dos scrims, §3.2 e §5.2); `--brand` é a única cor de marca escrita; `color-scheme: light` declarado
- [ ] Montserrat variável (`wght 400..700`), auto-hospedada, com `font-display: swap`; só os pesos 400, 500, 600 e 700 aparecem no CSS
- [ ] Corpo em 17px com altura de linha 1.7; títulos com `clamp()` de termo `rem + vw`; nenhum `font-size` em `px` (exceto o piso de `--fs-ui`) e nenhuma media query de tipografia
- [ ] Com a marca padrão, os pares do §7 dão as razões da tabela; com outra marca, os quatro testes do §1.1 foram refeitos e todo par de texto passa 4,5:1 e todo limite de campo, 3,0:1

**Layout**
- [ ] CSS base do celular; toda media query é `min-width` em 576, 768 ou 1200px; nada rola na horizontal a 320px de largura
- [ ] Seções com 60px em cima e embaixo; a partir de 768px, 100px em cima e 120px embaixo; fundos alternados como nas tabelas do §5.2 e do §5.3
- [ ] Home na ordem do §5.2 (12 seções); template de curso do §5.3 reaproveitado para todos os idiomas

**Conversão**
- [ ] As duas conversões (Pré-matrícula e Teste de nível) visíveis em toda página: no header a partir de 1200px, na barra fixa de 56px abaixo disso
- [ ] "Encontre uma unidade" na faixa 1 do header, na seção 5 da home e no passo 1 da pré-matrícula; busca por CEP, estado, cidade ou nome, com os estados do §5.4
- [ ] Wizard de pré-matrícula em 3 passos, com selects em cascata, os estados do §5.5 e, para menor de 18 anos, o bloco do responsável
- [ ] Faixa de CTA com formulário de 1 campo por vez, texto de consentimento com link para a Política de Privacidade e nada gravado antes do último passo
- [ ] Teste de nível em 4 etapas (§5.7); SEO local do §5.9 (JSON-LD `LanguageSchool` por unidade e `Course` por curso, `sitemap.xml`)

**Acessibilidade**
- [ ] Foco de teclado visível em todo interativo pela regra global do §1; nenhum `outline: none`; alvos de 44px nos botões e campos
- [ ] Todo campo com `<label for>`, `type` e `autocomplete`; erro com borda de 2px `--danger`, ícone e texto em `role="alert"`
- [ ] `<html lang="pt-BR">`, skip link, um `<h1>` por página, `<title>` único, landmarks; `aria-label` em todo link de texto genérico e em todo botão só de ícone
- [ ] Texto sobre foto só com scrim (hero e tile de curso)
- [ ] Carrosséis com setas, bullets, `inert` nos slides fora da vista e autoplay só no hero, com botão de pausa
- [ ] `prefers-reduced-motion: reduce` respeitado também no JS: Swiper sem autoplay e em `slide`, contador no valor final, sem revelação de scroll

**Desempenho e dados pessoais**
- [ ] Home, cursos e unidades com o conteúdo no HTML do servidor (SSG ou SSR); conteúdo legível com JS desligado
- [ ] Imagens em WebP com `srcset`, `width`, `height` e `alt` real (ou `alt=""` se decorativa); `loading="lazy"` abaixo da dobra e nunca na imagem do hero, que leva `fetchpriority="high"`
- [ ] Em 320 × 256 (altura até 480px), header, barra das conversões, cookie bar, chat e Libras rolam junto com a página e nada fixo cobre a janela; todo link fora de parágrafo tem 44px de altura (§4).
- [ ] Cookie bar não-bloqueante, com `Recusar` e `Aceitar` de mesmo peso; nenhuma tag de rastreamento dispara antes do aceite; eventos do item 10 do §8 só depois dele
- [ ] Chat e VLibras só carregam depois da primeira interação; chat no canto inferior direito acima da cookie bar e da barra das conversões; Libras no meio da borda direita
- [ ] Lighthouse ≥ 90 em Performance, Acessibilidade, SEO e Boas Práticas

---

### Aviso de uso
Os tokens, medidas e padrões acima descrevem *decisões de design* observadas publicamente e são reutilizáveis. **Logo, nome, fotografia, ilustrações e textos da Fisk são propriedade da marca** e não devem ser copiados. Defina `--brand` com a sua cor (§1.1), use suas próprias imagens e escreva seus próprios textos. As afirmações sobre o site analisado são observações do autor, feitas de fora, e os itens de consentimento e de LGPD são recomendação técnica: nenhum dos dois substitui verificação independente nem orientação jurídica.
