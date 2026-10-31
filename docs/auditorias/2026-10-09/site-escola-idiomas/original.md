# Guia de UI/UX para Frontends de Escolas de Idiomas
### Sistema de design extraído da análise do site da Fisk (fisk.com.br) — set/2026

> **Para quem é este documento:** é um briefing técnico para uma LLM construir o frontend de uma escola de idiomas.
> Contém tokens de design, receitas de componentes, templates de página e fluxos de conversão **já validados em produção** por uma rede com +68 anos e centenas de unidades franqueadas.
> **Não copie a marca.** Copie a *estrutura*, o *ritmo* e os *padrões de conversão*. Troque a cor de marca (`--brand`) e o logo pelos seus.

---

## 0. Regras de ouro (leia antes de escrever qualquer linha)

1. **Uma cor de marca só.** Todo o site vive em vermelho + branco + cinza-texto. Nada de paleta multicolorida. A cor de marca é usada com parcimônia: botões, títulos de seção, footer, faixas de CTA. O resto é branco.
2. **Uma família tipográfica só.** Montserrat em todos os pesos (400/500/600/700/800). Zero fonte secundária. Isso elimina 90% das decisões e mantém a coesão.
3. **Toda seção termina em uma ação.** Nenhum bloco é puramente informativo: cada um fecha com "Saiba Mais", "Conheça!", "Fazer Pré-matrícula" ou "Fazer Teste".
4. **Duas conversões primárias, sempre visíveis:** `Pré-matrícula` (botão sólido, fixo no header) e `Teste de classificação` (link secundário logo abaixo). Todo o site empurra para essas duas.
5. **A busca por unidade é função de primeira classe.** Escola de idiomas é negócio local. "Encontre uma unidade perto de você" é navegação, não rodapé.
6. **Respiro generoso.** Seções com 100–120px de padding vertical no desktop, 60px no mobile. Nunca aperte.
7. **Mobile-first de verdade.** No mobile o header vira só logo + hambúrguer; o hero vira 1 coluna; a faixa de CTA vira empilhada.

---

## 1. Design Tokens

Copie este bloco como base do seu CSS. Os valores são os reais do site analisado; troque apenas os `--brand-*`.

```css
:root {
  /* ---------- MARCA (troque só aqui) ---------- */
  --brand:            #d71920;  /* vermelho primário, botões e destaques */
  --brand-dark:       #aa1318;  /* footer, hover de botão, títulos escuros */
  --brand-light:      #ed3237;  /* acentos, gradientes, badges */
  --brand-deep:       #5a0f14;  /* "vinho" — títulos de seção grandes */
  --brand-hero:       #e00c18;  /* faixas de CTA full-bleed */
  --brand-tint:       #fff0f0;  /* fundo de seção suave (tom da marca a 5%) */

  /* ---------- NEUTROS ---------- */
  --heading:          #04000b;  /* títulos: quase-preto, NÃO #000 */
  --paragraph:        #666666;  /* corpo de texto */
  --dark:             #0e0f11;  /* fundos escuros / cookie bar */
  --white:            #ffffff;
  --bg-gray:          #f2f3ef;  /* fundo de seção alternado (quente, não frio) */
  --border:           #dee2e6;

  /* ---------- TIPOGRAFIA ---------- */
  --font: "Montserrat", system-ui, -apple-system, sans-serif;

  --fs-hero:      clamp(1.75rem, 4vw, 60px);   /* h1 do hero */
  --fs-hero-sub:  clamp(1rem, 2vw, 25px);      /* subtítulo do hero */
  --fs-section:   clamp(1.75rem, 3.5vw, 50px); /* título de seção */
  --fs-card:      27px;                        /* h3 de card */
  --fs-item:      20px;                        /* h4 de item de lista */
  --fs-body:      17px;                        /* corpo padrão (NÃO 16px) */
  --fs-body-lg:   20px;                        /* corpo em hero/destaque */
  --fs-caption:   14px;                        /* eyebrow, badge, botão */

  --lh-tight:     1.15;  /* h1 */
  --lh-heading:   1.2;   /* h2..h6 */
  --lh-body:      1.6;   /* parágrafos e leitura longa */

  /* ---------- ESPAÇAMENTO (escala de 6 passos) ---------- */
  --space-1: .25rem;  --space-2: .5rem;   --space-3: 1rem;
  --space-4: 1.5rem;  --space-5: 2.5rem;  --space-6: 3.5rem;

  --section-py:      100px 0 120px;  /* padding vertical de seção, desktop */
  --section-py-sm:   60px 0;         /* mobile */
  --heading-mb:      60px;           /* espaço entre título de seção e conteúdo */

  /* ---------- LAYOUT ---------- */
  --container:       1320px;  /* largura máxima do conteúdo */
  --container-pad:   35px;    /* respiro lateral desktop */
  --header-h:        143px;   /* desktop (2 faixas) */
  --header-h-mobile: 64px;

  /* ---------- FORMA ---------- */
  --r-sm:   6px;   /* inputs, botões pequenos */
  --r-md:   8px;   /* botões, badges */
  --r-lg:   20px;  /* cards, imagens */
  --r-xl:   32px;  /* faixas de CTA, botões-pílula */
  --r-full: 999px;

  /* ---------- ELEVAÇÃO ---------- */
  --shadow-card:  0 2px 12px 0 #e7e7e7;
  --shadow-hover: 0 20px 40px -12px rgba(0,0,0,.12), 0 8px 20px -8px rgba(200,16,46,.14);
  --shadow-brand: 0 10px 30px 0 rgba(215,25,32,.4); /* glow na cor da marca */

  /* ---------- MOVIMENTO ---------- */
  --t-fast: .2s ease;
  --t-base: .25s ease;
  --t-slow: .35s ease-in-out;
}

@media (max-width: 767px) {
  :root { --section-py: 60px 0; --container-pad: 20px; --heading-mb: 40px; }
}
```

### Equivalente Tailwind (`tailwind.config.js`)

```js
theme: {
  extend: {
    colors: {
      brand:   { DEFAULT:'#d71920', dark:'#aa1318', light:'#ed3237', deep:'#5a0f14', tint:'#fff0f0' },
      heading: '#04000b',
      body:    '#666666',
      surface: '#f2f3ef',
    },
    fontFamily: { sans: ['Montserrat', 'system-ui', 'sans-serif'] },
    fontSize: {
      caption: ['14px', '1.4'],
      base:    ['17px', '1.7'],   // corpo = 17px, nao 16
      lead:    ['20px', '1.6'],
      card:    ['27px', '1.2'],
      section: ['clamp(1.75rem,3.5vw,50px)', '1.2'],
      hero:    ['clamp(1.75rem,4vw,60px)', '1.15'],
    },
    borderRadius: { sm:'6px', DEFAULT:'8px', lg:'20px', xl:'32px' },
    maxWidth: { container: '1320px' },
    boxShadow: {
      card:  '0 2px 12px 0 #e7e7e7',
      hover: '0 20px 40px -12px rgb(0 0 0 / .12), 0 8px 20px -8px rgb(200 16 46 / .14)',
      brand: '0 10px 30px 0 rgb(215 25 32 / .4)',
    },
  }
}
```

---

## 2. Tipografia — como aplicar

| Papel | Tamanho | Peso | Cor | Detalhes |
|---|---|---|---|---|
| **H1 hero** | `clamp(1.75rem, 4vw, 60px)` | 700 | branco sobre imagem / `--heading` sobre branco | `line-height: 1.15`, `mb: 1rem` |
| **Subtítulo do hero** | `clamp(1rem, 2vw, 25px)` | 600 | herda do hero | `line-height: 1.3` |
| **Título de seção (H2)** | `clamp(1.75rem, 3.5vw, 50px)` | 700 | `--brand-deep` (`#5a0f14`) | `mb: 60px` — grande e escuro-avermelhado, é a assinatura visual |
| **Eyebrow / rótulo** | 14–18px | 700 | `--heading` | `text-transform: uppercase`, pílula com `border 1px #ccc`, `padding 8px 30px`, `radius 30px` |
| **H3 de card** | 27px | 600–700 | `--heading` | `mb: 16–25px` |
| **H4 de item** | 20px | 600 | `--heading` | `mb: 15px` |
| **Corpo** | **17px / 1.7** | 400 | `--paragraph` (#666) | nunca preto puro no corpo |
| **Corpo em destaque** | 20px / 1.6 | 500 | herda | usado dentro do hero |
| **Botão** | 14px | 700 | — | opcionalmente `uppercase` nos botões-pílula |

**Regras:**
- **Nunca** use `#000` nem em título nem em texto. Títulos = `#04000b`, corpo = `#666`.
- Corpo em **17px**, não 16px — o site inteiro roda em 17/28.9. Aumenta legibilidade para um público amplo (crianças a adultos, pais lendo no celular).
- Todo `font-size` de título usa `clamp()`. Zero media query para tipografia.
- `letter-spacing: 0` em tudo. Nada de tracking dramático.

---

## 3. Componentes — receitas prontas

### 3.1 Botões (três variantes, só isso)

```css
/* PRIMARIO — a acao da pagina */
.btn-primary {
  background: var(--brand); color: #fff; border: none;
  padding: 10px 20px; border-radius: var(--r-sm);
  font-size: 14px; font-weight: 700; text-decoration: none;
  transition: background var(--t-fast), color var(--t-fast), box-shadow var(--t-fast);
}
.btn-primary:hover { background: var(--brand-dark); }

/* SECUNDARIO / OUTLINE — acao alternativa, mesmo peso visual, menos urgencia */
.btn-outline {
  background: #fff; color: var(--brand-dark);
  border: .8px solid var(--brand-dark);   /* borda fina: 0.8px, nao 1px */
  padding: 10px 20px; border-radius: var(--r-sm);
  font-size: 14px; font-weight: 700;
}
.btn-outline:hover { background: var(--brand-dark); color: #fff; }

/* PILULA — CTA de hero e de faixa colorida */
.btn-pill {
  display: inline-flex; align-items: center; justify-content: center; gap: .5rem;
  padding: 15px 40px; border-radius: 32px;
  font-size: 14px; font-weight: 700; text-transform: uppercase;
  border: 2px solid #fff; white-space: nowrap;
  transition: background-color .25s, color .25s, border-color .25s;
}
/* sobre fundo da marca: branco solido -> vaza para transparente no hover */
.btn-pill--on-brand         { background: #fff; color: var(--brand); }
.btn-pill--on-brand:hover   { background: transparent; color: #fff; }
/* sobre imagem escura: fantasma translucido */
.btn-pill--ghost            { background: rgba(255,255,255,.15); color: #fff; border-color: rgba(255,255,255,.55); }
.btn-pill--ghost:hover      { background: rgba(255,255,255,.28); }
```

**Padrão de par de CTA no hero:** *outline branco* à esquerda (ação de baixo compromisso: "Fazer Teste de classificação →") + *sólido da marca* à direita (ação de conversão: "Fazer Pré-matrícula"). Sempre nessa ordem.

### 3.2 Card de curso (tile de imagem com overlay)

O padrão mais forte do site: grade horizontal de tiles com imagem de fundo, gradiente escuro na base, nome do idioma e um "CONHEÇA".

```html
<a class="course-tile" href="/cursos/ingles" aria-label="Conheça Inglês">
  <img src="ingles.webp" alt="" loading="lazy">
  <div class="course-tile__body">
    <h3>Inglês</h3>
    <span class="course-tile__cta">CONHEÇA</span>
  </div>
</a>
```
```css
.course-tile {
  position: relative; display: block; overflow: hidden;
  aspect-ratio: 298 / 256;              /* ~1.16:1 */
  transition: transform var(--t-slow);
}
.course-tile img { width:100%; height:100%; object-fit:cover; transition: transform var(--t-slow); }
.course-tile:hover img { transform: scale(1.06); }
.course-tile::after {                    /* legibilidade do texto sobre foto */
  content:""; position:absolute; inset:0;
  background: linear-gradient(to top, rgba(0,0,0,.75) 0%, rgba(0,0,0,.15) 55%, transparent 100%);
}
.course-tile__body { position:absolute; inset:auto 0 0 0; padding:24px; z-index:1; color:#fff; }
.course-tile__body h3 { font-size:27px; font-weight:600; color:#fff; margin-bottom:8px; }
.course-tile__cta { font-size:14px; font-weight:700; letter-spacing:.04em; opacity:.9; }
```
**Acessibilidade obrigatória:** `aria-label="Conheça {Curso}"` no link (o texto "CONHEÇA" sozinho não diz nada para leitor de tela) e `alt=""` na imagem decorativa.

### 3.3 Card de conteúdo / blog

```css
.card {
  background:#fff; border-radius: var(--r-lg); overflow:hidden;
  box-shadow: var(--shadow-card);
  transition: box-shadow var(--t-base), transform var(--t-base);
}
.card:hover { box-shadow: var(--shadow-hover); transform: translateY(-4px); }
.card__meta  { font-size:14px; color:var(--paragraph); }        /* "28 Agosto, 2026" */
.card__tag   { font-size:14px; font-weight:700; color:var(--brand); text-transform:uppercase; } /* "DICAS" */
.card__title { font-size:20px; font-weight:600; color:var(--heading); line-height:1.3; }
.card__link  { font-size:14px; font-weight:700; color:var(--brand-dark); } /* "Continuar lendo" */
```
Ordem visual do card de blog: **imagem → data → categoria → título → "Continuar lendo"**. Sem resumo/excerpt — o título carrega tudo.

### 3.4 Faixa de CTA (newsletter/lead) — o componente mais rentável

Card horizontal `full-bleed`, cor da marca, `border-radius: 32px`, sobreposto entre o hero e a primeira seção.

```css
.cta-band {
  max-width: var(--container); margin: -40px auto 0; /* invade o hero */
  background: var(--brand-hero); color:#fff;
  border-radius: var(--r-xl); padding: 20px 35px;
  display:flex; gap: var(--space-4); align-items:center; justify-content:space-between;
}
.cta-band h2 { font-size:40px; font-weight:700; text-transform:uppercase; line-height:1.2; color:#fff; }
@media (max-width:767px){ .cta-band { flex-direction:column; align-items:stretch; text-align:left; } }
```
Título curto e imperativo em caixa alta: **"CADASTRE-SE E FIQUE POR DENTRO!"**.

### 3.5 Formulário progressivo de 1 campo (padrão de captura de lead)

O detalhe mais inteligente do site: a faixa de CTA pede **um campo por vez**, com contador `1 de 5` e um botão-seta. Reduz drasticamente o atrito percebido.

- Um único input visível por vez, `height: 44px`, fundo branco, `radius: 32px`, botão-seta circular à direita.
- Label acima com asterisco vermelho: `* E-mail`.
- Contador discreto no canto inferior direito: `1 de 5`.
- Avança com Enter **ou** clique na seta; `aria-label="Próximo campo"` no botão.
- Ordem sugerida dos 5 campos: **E-mail → Nome → Telefone/WhatsApp → Cidade → Curso de interesse**. E-mail primeiro porque é o dado que já converte o lead sozinho.

### 3.6 Inputs e selects

```css
.input, .select {
  height: 44px;                 /* select em formulario longo: 50px */
  padding: 8px 12px;
  border: .8px solid var(--border);
  border-radius: var(--r-sm);
  font-size: 16px;              /* 16px+ evita zoom automatico no iOS */
  background: #fff; color: #212529;
}
.input:focus { outline: none; border-color: var(--brand); box-shadow: 0 0 0 3px rgba(215,25,32,.15); }
.label  { font-size:16px; margin-bottom:8px; display:block; }
.label .req { color: var(--brand); }  /* asterisco vermelho ANTES do texto: "* E-mail" */
```
Busca no header: input com ícone de lupa à esquerda (`padding-left: 48px`), fundo `--brand-tint` (rosa muito claro) para se destacar do branco sem virar caixa cinza.

### 3.7 Stepper (wizard de matrícula)

```
(●) Unidade ————————— ( ) Sobre Você ————————— ( ) Curso
```
- Passo atual: círculo 32px preenchido com a marca, ícone branco dentro, rótulo em `--brand` peso 700.
- Passos futuros: ícone cinza, rótulo cinza.
- Linha conectora: 2px, na cor da marca entre concluídos, `#dee2e6` adiante.
- No mobile a linha vira vertical e os passos empilham.

---

## 4. Layout e ritmo vertical

```css
.container { max-width: 1320px; margin-inline:auto; padding-inline: 35px; }
.section   { padding: 100px 0 120px; }               /* desktop */
.section--tint  { background: var(--brand-tint); }   /* secao destacada */
.section--gray  { background: var(--bg-gray); }      /* alternancia */
.section--tight { padding: 48px 0; }
@media (max-width:767px){ .section { padding: 60px 0; } }
```

**Ritmo de alternância de fundo** (evita a monotonia do branco infinito):
`branco → branco → tint da marca → branco → cinza quente → branco → footer marca`

**Grades:**
- Cursos: carrossel/grade horizontal de tiles ~300×256, `gap: 0` (tiles encostados, formando uma faixa contínua) ou `gap: 8px`.
- Cards de blog / recursos: 3 colunas desktop → 2 tablet → 1 mobile, `gap: 32px`.
- Diferenciais/prêmios: 2 colunas (imagem | lista de itens com ícone).

**Breakpoints usados:** `576 / 768 / 992 / 1200 / 1400`. Fique nesses.

---

## 5. Anatomia das páginas (arquitetura de informação)

### 5.1 Header (duas faixas, desktop)

```
+- Faixa 1 ----------------------------------------------------------+
| [LOGO]      [ Pesquisar no site ......................]  [Acesso v] |
+- Faixa 2 ----------------------------------------------------------+
| Home  Sobre Nos v  Cursos v  Blog  E-book  Faca Parte v  Seja um    |
| Franqueado  Fale Conosco               [Pre-matricula]              |
|                                        Teste de classificacao       |
+---------------------------------------------------------------------+
```
- **`Acesso ▾`** é um dropdown agrupado por perfil — padrão essencial em escola com portal:
  `Para o aluno` (Portal do Aluno, plataforma online) · `Para o franqueado` (Painel, sistema de gestão, webmail) · `Para o professor` (Portal do Professor).
- **CTA duplo à direita:** botão sólido `Pré-matrícula` + link sublinhado menor `Teste de classificação` logo abaixo. Hierarquia clara de compromisso.
- Dropdowns aparecem com `opacity` + `translateY(-6px)` em `.18s`.
- **Mobile:** altura de 64px, só logo centralizado + hambúrguer à esquerda; menu vira side-nav.

### 5.2 Home — ordem das seções (essa sequência é a receita)

| # | Seção | Função de negócio |
|---|---|---|
| 1 | **Hero carrossel** (Swiper, efeito coverflow, 4 slides, bullets) | Campanha sazonal / matrícula |
| 2 | **Faixa de CTA de lead** (formulário progressivo) | Captura de e-mail acima da dobra |
| 3 | **Sobre / método** (imagem + texto + números) | Confiança |
| 4 | **CURSOS** — grade de tiles | Navegação comercial principal |
| 5 | **Recursos digitais** ("Universo …": app, plataforma) | Diferencial competitivo moderno |
| 6 | **Viagens e intercâmbios** (fundo tint) | Upsell / sonho |
| 7 | **Por que nós** — contador animado + prêmios/selos | Prova social institucional |
| 8 | **Linha do tempo** ("6 décadas de história") | Autoridade e longevidade |
| 9 | **Depoimentos de alunos** (fundo cinza, carrossel) | Prova social pessoal |
| 10 | **Blog** (3 posts + "SAIBA MAIS") | SEO e nutrição de lead |
| 11 | **Footer** na cor da marca | Navegação completa + repetição do CTA |

> Se você precisa cortar, mantenha **1, 2, 4, 7, 9, 11**. É o esqueleto mínimo de uma home de escola de idiomas que converte.

### 5.3 Página de curso (`/cursos/{idioma}`) — template reutilizável

1. **Hero interno**: fundo temático do idioma (bandeira estilizada), título `Curso de Inglês`, subtítulo motivacional, 1 parágrafo, e o **par de CTAs** (outline "Fazer Teste de classificação →" + sólido "Fazer Pré-matrícula").
2. **"{Idioma} para todas as fases da vida"** — 3 blocos por faixa etária, cada um com **badge de idade** (`4 a 10 anos`, `A partir de 11 anos`, `Acima de 15 anos`), título, descrição e "Saiba Mais". *Este é o padrão mais importante de escola de idiomas: segmentar por idade antes de qualquer outra coisa.*
3. **Modalidades de aula** — 4 cards: Grupos Regulares · Ensino Personalizado · Aulas Presenciais · Aulas On-line.
4. **Metodologia** — texto + CTA "Conheça!" + blocos (Método próprio · Recursos tecnológicos).
5. **Séries/níveis** — acordeões por faixa (`KIDS ▾`, `TEENS ▾`, `YOUNG ADULTS & ADULTS ▾`).
6. **Faixa final**: "TESTE SEU NÍVEL DE INGLÊS! → FAZER TESTE".

### 5.4 Busca de unidades (`/unidades`)

- Hero na cor da marca com ilustração isométrica do mapa e headline pessoal: **"{Marca} perto de você!"**.
- Barra de busca larga logo abaixo do hero, com placeholder que ensina todos os modos de busca aceitos: `Busque por CEP, Estado, Cidade ou Nome da Unidade.`
- Resultado em cards com endereço, telefone/WhatsApp, link do mapa e botão "Fazer pré-matrícula nesta unidade".

### 5.5 Pré-matrícula (`/pre-matricula`) — wizard de 3 passos

**Passo 1 — Unidade:** selects em cascata `País → Estado → Cidade → Bairro → Unidade` (cada um só habilita ao preencher o anterior).
**Passo 2 — Sobre Você:** nome, nascimento, e-mail, telefone, responsável se menor de idade.
**Passo 3 — Curso:** curso, modalidade, turno.

Por que funciona: escolher a unidade **primeiro** ancora o lead a uma escola física real (e roteia o lead ao franqueado certo). Não peça dados pessoais antes de o usuário ter escolhido "onde".

### 5.6 Footer (na cor `--brand-dark`)

Logo em branco + 4 colunas de links + copyright. Colunas: **Sobre nós · Cursos · Faça parte · Acesso**. Repita ali `Pré-matrícula`, `Teste de classificação`, `Trabalhe Conosco`, `Seja um franqueado` e `Termo de Privacidade`. Texto branco puro sobre a cor da marca.

---

## 6. Movimento e microinterações

| Elemento | Comportamento |
|---|---|
| **Entrada de seção** | `opacity: 0; transform: translateY(50px)` → `opacity: 1; translateY(0)` quando entra na viewport (IntersectionObserver / Framer Motion). Uma vez só, sem repetir ao voltar. |
| **Texto do hero** | `translateY(10px)` + fade, escalonado (~80ms entre linhas) |
| **Hover de tile de curso** | imagem `scale(1.06)` em `.35s ease-in-out`, overlay escurece |
| **Hover de card** | `translateY(-4px)` + sombra `--shadow-hover` |
| **Hover de botão** | só troca de cor, `.2–.25s`. **Nunca** escala nem pula. |
| **Contador de números** | anima de 0 até o valor ao entrar na tela (ex.: `0+ → 68+ anos`) |
| **Carrosséis** | Swiper: hero em `coverflow` com slides laterais visíveis e desfocados; depoimentos e cursos em `slide` com auto-play lento |
| **Scroll** | smooth-scroll suavizado (Lenis) no wrapper da página |

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 1ms !important; transition-duration: 1ms !important; }
}
```

⚠️ **Armadilha real observada no site:** o conteúdo revelado por scroll fica **invisível para crawlers e para prints** se o JS falhar ou o observer não disparar. Renderize com `opacity: 1` por padrão e aplique o estado inicial da animação só via JS — senão você perde SEO e acessibilidade.

---

## 7. Acessibilidade — o que copiar e o que corrigir

**Copie:**
- `aria-label` descritivo em todo link cujo texto visível é genérico: `aria-label="Conheça Inglês"`, `aria-label="{título do post}. Continuar lendo"`, `aria-label="Próximo campo"`.
- `<nav aria-label="Cursos">`, `<nav aria-label="Sobre nós">` — nomeie cada bloco de navegação.
- **Widget de Libras** (VLibras) fixo no canto direito. Em site educacional brasileiro é praticamente obrigatório e é um diferencial forte.
- Alvos de toque de 44px+ nos botões do mobile.
- Contraste: `#666` sobre branco ≈ 5.7:1 ✅ · branco sobre `#d71920` ≈ 4.9:1 ✅ · branco sobre `#aa1318` (footer) ≈ 7.4:1 ✅.

**Corrija no seu projeto (falhas encontradas no site analisado):**
- Imagens sem `loading="lazy"` e com `alt="Slide 3"` (sem valor semântico). Use `alt` descritivo ou `alt=""` se decorativo, e `lazy` em tudo abaixo da dobra.
- Logo com largura nativa de 797px renderizado a 102px — sirva imagens no tamanho certo (`srcset` + WebP/AVIF).
- `!important` espalhado no CSS de botões. Com tokens você não precisa disso.
- Garanta foco visível de teclado em todos os interativos (`:focus-visible` com anel na cor da marca).

---

## 8. Conversão e confiança — os padrões que geram valor

1. **Escada de compromisso.** Ofereça sempre três degraus: *ler* (blog/e-book) → *experimentar* (teste de nível gratuito, aula experimental) → *converter* (pré-matrícula). O "Teste de classificação" é o degrau do meio e existe em toda página.
2. **Isca de conteúdo.** Um item de menu inteiro dedicado a `E-book`. Material gratuito troca conteúdo por e-mail.
3. **Prova social em três camadas:** números (`+68 anos`), prêmios/selos institucionais (`Selo de Excelência em Franchising 24×`), e depoimentos nominais de alunos. Use as três — cada uma convence um público diferente.
4. **Segmentação por idade antes de tudo.** Pais e adultos são compradores diferentes. Rotule com faixa etária explícita (`4 a 10 anos`).
5. **Modalidade explícita.** Presencial vs. Online vs. Personalizado, comparados lado a lado. É a primeira dúvida de quem procura curso hoje.
6. **Ancoragem local.** Buscador de unidades no topo da navegação e como passo 1 da matrícula.
7. **Rota do franqueado.** Se o modelo for franquia, `Seja um Franqueado` fica no menu principal — é um funil B2B independente com sua própria landing page.
8. **Chat flutuante** (bolha circular na cor da marca, canto inferior direito, ~56px) — resposta rápida para dúvida de matrícula.
9. **Cookie bar LGPD** ancorada no rodapé, fundo escuro `#0e0f11`, botões `Recusar` (outline) e `ACEITAR` (sólido), link para a política. Não bloqueie a tela com modal.
10. **Rastreamento:** GTM + GA4 + Meta Pixel + TikTok Pixel + Clarity. Dispare eventos nomeados em: `clicou_pre_matricula`, `enviou_lead_newsletter`, `iniciou_teste_nivel`, `buscou_unidade`, `concluiu_pre_matricula`.

---

## 9. Stack recomendada

Alinhada ao que o site usa e ao que é fácil de manter:

- **React + Vite** (ou **Next.js** se SEO for prioridade — recomendado, pelo alerta do §6)
- **Swiper** para todos os carrosséis (hero, cursos, depoimentos)
- **Framer Motion** para as revelações de scroll
- **Lenis** para o smooth scroll (opcional)
- **Tailwind** com o config do §1, ou CSS puro com as custom properties
- **Montserrat** via `@fontsource/montserrat` ou Google Fonts (pesos 400, 500, 600, 700, 800 — só esses)
- **VLibras** (`https://vlibras.gov.br/app/vlibras-plugin.js`) para acessibilidade em Libras

---

## 10. Checklist de entrega

- [ ] Tokens do §1 definidos em um único arquivo; nenhuma cor hardcoded em componente
- [ ] Montserrat carregada com `font-display: swap` e só nos pesos usados
- [ ] Header com CTA duplo (Pré-matrícula + Teste) visível em 100% das páginas
- [ ] Home seguindo a ordem de seções do §5.2
- [ ] Template de curso do §5.3 reaproveitado para todos os idiomas
- [ ] Busca de unidades por CEP/estado/cidade/nome
- [ ] Wizard de pré-matrícula em 3 passos com selects em cascata
- [ ] Formulário progressivo de 1 campo por vez na faixa de CTA
- [ ] Corpo em 17px/1.7, títulos em `clamp()`, zero media query tipográfica
- [ ] Seções com 100–120px de padding (60px no mobile) e alternância de fundo
- [ ] `aria-label` em todo link de texto genérico; foco de teclado visível
- [ ] Imagens em WebP com `srcset`, `loading="lazy"` e `alt` real
- [ ] Conteúdo legível sem JS (não dependa da animação de scroll para exibir)
- [ ] `prefers-reduced-motion` respeitado
- [ ] Cookie bar LGPD não-bloqueante + eventos de conversão no GTM
- [ ] Widget de Libras e bolha de chat no canto inferior direito
- [ ] Lighthouse ≥ 90 em Performance, Acessibilidade, SEO e Boas Práticas

---

### Aviso de uso
Os tokens, medidas e padrões acima descrevem *decisões de design* observadas publicamente e são reutilizáveis. **Logo, nome, fotografia, ilustrações e textos da Fisk são propriedade da marca** e não devem ser copiados. Substitua `--brand*` pela sua paleta, use suas próprias imagens e escreva seus próprios textos.
