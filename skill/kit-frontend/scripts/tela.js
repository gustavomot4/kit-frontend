// Audita a tela renderizada. Roda dentro da página, pelo verificar.mjs ou colado no console do navegador.
// Devolve { achados: [{ id, nivel, msg, exemplos }], medidas }. nivel: falha | aviso.
// a11y-* vem da WCAG 2.2 e da ABNT NBR 17225; g-* vem do perfil de gosto; ia-* vem de references/marca/anti-generico.md.
((opcoes = window.__kitOpcoes || {}) => {
  const papel = opcoes.papel || 'desktop';
  const aprovadas = (opcoes.fontesAprovadas || []).map(f => f.toLowerCase());
  const achados = [];
  const achar = (id, nivel, msg, exemplos = []) => achados.push({ id, nivel, msg, exemplos: [...new Set(exemplos)].slice(0, 5) });
  const cs = (e, p) => getComputedStyle(e, p);
  const num = v => parseFloat(v) || 0;
  const curto = (t, n = 34) => (t || '').replace(/\s+/g, ' ').trim().slice(0, n);
  const vis = e => {
    const r = e.getBoundingClientRect(), s = cs(e);
    return r.width > 1 && r.height > 1 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0 && !e.closest('[inert],[hidden]');
  };
  const todos = [...document.querySelectorAll('body *')].filter(e => !e.closest('svg') || e.tagName === 'svg').filter(vis);

  // cor: o canvas converte qualquer formato do navegador para sRGB
  const tela2d = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const cor = c => { tela2d.clearRect(0, 0, 1, 1); tela2d.fillStyle = '#000'; tela2d.fillStyle = c; tela2d.fillRect(0, 0, 1, 1); const d = tela2d.getImageData(0, 0, 1, 1).data; return { r: d[0], g: d[1], b: d[2], a: d[3] / 255 }; };
  const sobre = (f, b) => ({ r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a), b: f.b * f.a + b.b * (1 - f.a), a: 1 });
  const lin = v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
  const lum = c => .2126 * lin(c.r) + .7152 * lin(c.g) + .0722 * lin(c.b);
  const razao = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };
  const hex = c => '#' + [c.r, c.g, c.b].map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
  const satura = c => { const m = Math.max(c.r, c.g, c.b), n = Math.min(c.r, c.g, c.b); return m ? (m - n) / m : 0; };
  const matiz = c => { const m = Math.max(c.r, c.g, c.b), n = Math.min(c.r, c.g, c.b), d = m - n; if (!d) return 0; const h = m === c.r ? (c.g - c.b) / d % 6 : m === c.g ? (c.b - c.r) / d + 2 : (c.r - c.g) / d + 4; return (h * 60 + 360) % 360; };

  const sobrepoe = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  const midia = 'img,svg,video,picture,canvas';
  // fundo efetivo; null quando há imagem ou gradiente atrás do texto (não dá para medir assim)
  const fundo = e => {
    const r = e.getBoundingClientRect(), pilha = [];
    for (let n = e, nivel = 0; n; n = n.parentElement, nivel++) {
      const s = cs(n);
      if (s.backgroundImage !== 'none') return null;
      if (nivel < 7 && [...n.querySelectorAll(midia)].some(m => !m.closest('button,a') && !m.contains(e) && m.getBoundingClientRect().width > 80 && sobrepoe(m.getBoundingClientRect(), r))) return null;
      const c = cor(s.backgroundColor);
      if (c.a > 0) { pilha.push(c); if (c.a === 1) break; }
    }
    let b = { r: 255, g: 255, b: 255, a: 1 };
    for (const c of pilha.reverse()) b = sobre(c, b);
    return b;
  };

  // textos visíveis
  const comTexto = new Map();
  const andador = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = andador.nextNode());) {
    const p = n.parentElement, t = n.textContent.trim();
    if (!t || !p || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TITLE'].includes(p.tagName) || p.closest('svg') || !vis(p)) continue;
    comTexto.set(p, (comTexto.get(p) || '') + ' ' + t);
  }
  const textos = [...comTexto.keys()];
  const oculto = e => { const r = e.getBoundingClientRect(); return r.right <= 0 || r.bottom <= -2000 || r.left >= innerWidth + 2000 || e.closest('[aria-hidden="true"]'); };

  // medidas gerais
  const contagem = (lista, f) => { const m = {}; lista.forEach(i => { const k = f(i); m[k] = (m[k] || 0) + (comTexto.get(i) || '').length; }); return Object.entries(m).sort((a, b) => b[1] - a[1]); };
  const familias = contagem(textos, e => cs(e).fontFamily.split(',')[0].replace(/["']/g, '').trim());
  const tamanhos = [...new Set(textos.map(e => num(cs(e).fontSize)))].sort((a, b) => a - b);
  const primeiraDobra = e => { const r = e.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0 && r.left < innerWidth && r.right > 0; };
  const palavrasDobra = textos.filter(e => primeiraDobra(e) && !e.closest('nav,header,footer,[aria-hidden="true"]')).reduce((n, e) => n + (comTexto.get(e) || '').trim().split(/\s+/).length, 0);

  // --- acessibilidade -------------------------------------------------------------------------------
  const interativos = todos.filter(e => e.matches('a[href],button,input:not([type=hidden]),select,textarea,summary,[role=button],[role=link],[role=tab],[role=radio],[role=checkbox],[role=switch],[role=menuitem],[tabindex]:not([tabindex="-1"])'));
  const nomeDe = e => {
    if (e.getAttribute('aria-label')) return e.getAttribute('aria-label');
    const ref = e.getAttribute('aria-labelledby');
    if (ref) return ref.split(/\s+/).map(i => document.getElementById(i)?.textContent || '').join(' ').trim();
    if (e.labels && e.labels.length) return [...e.labels].map(l => l.textContent).join(' ').trim();
    if (e.matches('input[type=submit],input[type=button]')) return e.value;
    if (e.matches('input,select,textarea')) return e.title || '';
    return (e.textContent || '').trim() || e.querySelector('img[alt]')?.alt || e.querySelector('svg[aria-label]')?.getAttribute('aria-label') || e.querySelector('svg title')?.textContent || e.title || '';
  };

  if (papel === 'desktop') {
    if (!document.documentElement.lang) achar('a11y-idioma', 'falha', '<html> sem lang.');
    if (!document.title.trim()) achar('a11y-titulo-aba', 'falha', 'Página sem <title>.');
    const mains = document.querySelectorAll('main,[role=main]').length;
    if (mains !== 1) achar('a11y-main', 'falha', `Esperado 1 <main>; há ${mains}.`);
    const h1s = [...document.querySelectorAll('h1')].filter(vis).length;
    if (h1s !== 1) achar('a11y-h1', 'falha', `Esperado 1 <h1>; há ${h1s}.`);
    const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({ n: +h.tagName[1], t: curto(h.textContent, 24) }));
    const saltos = hs.filter((h, i) => i && h.n - hs[i - 1].n > 1).map(h => `h${h.n}: ${h.t}`);
    if (saltos.length) achar('a11y-titulos', 'aviso', 'Hierarquia de títulos pula nível.', saltos);
    const semNomeNav = [...document.querySelectorAll('nav')].filter(n => !n.getAttribute('aria-label') && !n.getAttribute('aria-labelledby')).length;
    if (document.querySelectorAll('nav').length > 1 && semNomeNav) achar('a11y-nav', 'aviso', `${semNomeNav} <nav> sem nome, com mais de uma na página.`);
    const semNome = interativos.filter(e => !nomeDe(e).trim() && !(e.matches('input,select,textarea') && e.closest('label')));
    if (semNome.length) achar('a11y-nome', 'falha', `${semNome.length} controle(s) sem nome acessível.`, semNome.map(e => e.outerHTML.slice(0, 60)));
    const semAlt = [...document.images].filter(i => !i.hasAttribute('alt'));
    if (semAlt.length) achar('a11y-alt', 'falha', `${semAlt.length} imagem(ns) sem alt.`, semAlt.map(i => i.src.slice(-40)));
    const vp = document.querySelector('meta[name=viewport]')?.content || '';
    if (/user-scalable\s*=\s*(no|0)|maximum-scale\s*=\s*1(\.0)?(\s|,|$)/i.test(vp)) achar('a11y-zoom', 'falha', 'A meta viewport bloqueia o zoom.', [vp]);

    // contraste de texto
    let medidos = 0, semMedida = 0; const reprova = [];
    for (const e of textos) {
      if (oculto(e) && e.closest('[aria-hidden="true"]')) continue;
      const b = fundo(e); if (!b) { semMedida++; continue; }
      const c = cor(cs(e).color); if (c.a === 0) continue;
      const rz = razao(sobre(c, b), b), s = num(cs(e).fontSize), g = s >= 24 || (s >= 18.66 && +cs(e).fontWeight >= 700);
      if (rz < 1.05) continue;   // invisível de propósito
      medidos++;
      if (rz < (g ? 3 : 4.5) && !e.closest('button:disabled,[aria-disabled="true"]')) reprova.push(`${rz.toFixed(2)}:1 ${hex(c)} sobre ${hex(b)} "${curto(e.textContent, 22)}"`);
    }
    if (reprova.length) achar('a11y-contraste', 'falha', `${reprova.length} texto(s) abaixo do contraste mínimo.`, reprova);
    if (semMedida) achar('a11y-contraste-imagem', 'aviso', `${semMedida} texto(s) sobre imagem ou gradiente não medidos: confira à mão.`);

    // fonte fixa em px ignora o tamanho de letra escolhido no navegador
    let px = 0, rem = 0;
    for (const f of document.styleSheets) { try { for (const r of f.cssRules) { const t = r.cssText || ''; px += (t.match(/(font-size|--(text|fs|t)-[a-z0-9-]*):\s*[\d.]+px/g) || []).length; rem += (t.match(/(font-size|--(text|fs|t)-[a-z0-9-]*):\s*(clamp\()?[\d.]+(rem|em)/g) || []).length; } } catch { /* outra origem */ } }
    if (px > 3 && px > rem) achar('a11y-fonte-px', 'aviso', `Fontes em px (${px}) mais que em rem (${rem}): o tamanho de letra do navegador é ignorado.`);
    const miudos = textos.filter(e => num(cs(e).fontSize) < 12 && !oculto(e) && !e.closest('header a,a[aria-label]'));
    if (miudos.length) achar('a11y-fonte-pequena', 'aviso', `${miudos.length} texto(s) abaixo de 12px.`, miudos.map(e => `${cs(e).fontSize} "${curto(e.textContent, 18)}"`));
  }

  // alvos
  if (papel === 'desktop' || papel === 'celular' || papel === 'tablet') {
    const medir = e => { const r = e.getBoundingClientRect(), a = cs(e, '::after'), aw = a.position === 'absolute' ? num(a.width) : 0, ah = a.position === 'absolute' ? num(a.height) : 0; return { w: Math.max(r.width, aw), h: Math.max(r.height, ah), t: curto(nomeDe(e), 22) || e.tagName }; };
    const alvos = interativos.filter(e => !(e.tagName === 'A' && cs(e).display === 'inline') && !e.closest('p,li p') && !oculto(e) && e.getBoundingClientRect().width > 2).map(medir);
    const menores = alvos.filter(a => a.w < 24 || a.h < 24);
    if (menores.length) achar('a11y-alvo', 'falha', `${menores.length} alvo(s) abaixo de 24×24px (WCAG 2.5.8).`, menores.map(a => `${a.t} ${Math.round(a.w)}×${Math.round(a.h)}`));
    if (papel === 'celular') {
      const toque = alvos.filter(a => (a.w < 44 || a.h < 44) && a.w >= 24 && a.h >= 24);
      if (toque.length) achar('a11y-toque', 'aviso', `${toque.length} de ${alvos.length} alvo(s) abaixo de 44×44px no toque.`, toque.map(a => `${a.t} ${Math.round(a.w)}×${Math.round(a.h)}`));
    }
  }

  // rolagem horizontal: vale em todo tamanho
  const raiz = document.documentElement;
  if (raiz.scrollWidth > raiz.clientWidth + 1) {
    const larg = raiz.clientWidth;
    const culpados = todos.filter(e => e.getBoundingClientRect().right > larg + 1 && !e.closest('[style*="overflow"]')).map(e => `${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}`);
    achar('a11y-rolagem-horizontal', 'falha', `A página rola na horizontal: ${raiz.scrollWidth}px em ${larg}px.`, culpados);
  }

  // camadas fixas em janela baixa
  const faixas = new Array(innerHeight).fill(0);
  todos.filter(e => ['fixed', 'sticky'].includes(cs(e).position) && !e.closest('dialog[open]')).forEach(e => {
    const r = e.getBoundingClientRect();
    if (r.width < innerWidth * .6 || r.left >= innerWidth || r.right <= 0 || r.bottom <= 0 || r.top >= innerHeight || r.height >= innerHeight) return;
    for (let y = Math.max(0, Math.floor(r.top)); y < Math.min(innerHeight, Math.ceil(r.bottom)); y++) faixas[y] = 1;
  });
  const coberto = faixas.reduce((a, b) => a + b, 0), parte = coberto / innerHeight;
  if (innerHeight <= 480 && parte > .5) achar('a11y-camadas-fixas', 'falha', `Em ${innerWidth}×${innerHeight}, camadas fixas cobrem ${Math.round(parte * 100)}% da altura: quem usa zoom alto quase não vê conteúdo.`);
  else if (innerHeight <= 480 && parte > .35) achar('a11y-camadas-fixas', 'aviso', `Em ${innerWidth}×${innerHeight}, camadas fixas cobrem ${Math.round(parte * 100)}% da altura.`);

  // --- gosto -----------------------------------------------------------------------------------------
  if (papel === 'desktop' || papel === 'celular') {
    const doc = raiz.scrollHeight > innerHeight + 40;
    const presas = todos.filter(e => { const s = cs(e); return /(auto|scroll)/.test(s.overflowY) && e.scrollHeight > e.clientHeight + 40 && e.clientHeight > 80 && e !== document.body && e !== raiz && !e.closest('dialog,[role=dialog],[data-rolagem-propria],textarea,pre'); });
    if (doc && presas.length) achar('g-rolagem-presa', 'aviso', 'Área com rolagem própria dentro de página que também rola: a pessoa fica presa e o resto não aparece (G09).', presas.map(e => `${e.tagName.toLowerCase()}.${String(e.className).split(' ')[0]}`));
    const limite = papel === 'desktop' ? 180 : 110;
    if (palavrasDobra > limite) achar('g-muito-texto', 'aviso', `${palavrasDobra} palavras na primeira dobra (limite ${limite}): muito texto para bater o olho (G03).`);
  }
  if (papel === 'desktop') {
    const selects = [...document.querySelectorAll('select')].filter(s => s.options.length > 12);
    if (selects.length) achar('g-lista-suspensa-longa', selects.some(s => s.options.length > 30) ? 'falha' : 'aviso', 'Lista suspensa longa: dado que cresce pede busca, não dropdown (G11).', selects.map(s => `${nomeDe(s) || s.name}: ${s.options.length} opções`));
    const tabelas = [...document.querySelectorAll('table')].filter(t => vis(t) && t.getAttribute('role') !== 'presentation' && !t.querySelector('th'));
    if (tabelas.length) achar('g-tabela-sem-cabecalho', 'falha', `${tabelas.length} tabela(s) sem cabeçalho: não dá para saber que dado é cada coluna (G12).`);
    const temPaginacao = /(pr[oó]xim|anterior|p[aá]gina \d|ver mais|carregar mais)/i.test(document.body.innerText);
    const longas = [...document.querySelectorAll('tbody,ul,ol')].filter(l => l.children.length > 30 && vis(l));
    if (longas.length && !temPaginacao) achar('g-lista-sem-paginacao', 'aviso', `Lista com ${longas[0].children.length} itens e sem paginação (G10).`);

    // ocupação do espaço no computador
    const area = (document.querySelector('main,[role=main]') || document.body).getBoundingClientRect();
    const folhas = todos.filter(e => { const r = e.getBoundingClientRect(); return (comTexto.has(e) || e.matches('img,svg,table,canvas,video,input,select,button')) && r.top < innerHeight * 2 && r.left >= area.left - 1 && r.right <= area.right + 1 && (document.querySelector('main,[role=main]') ? e.closest('main,[role=main]') : true) && !cs(e).position.match(/fixed/); });
    if (folhas.length > 3 && innerWidth >= 1200) {
      const esq = Math.min(...folhas.map(e => e.getBoundingClientRect().left)), dir = Math.max(...folhas.map(e => e.getBoundingClientRect().right));
      const sobraE = esq - area.left, sobraD = area.right - dir, largura = area.width;
      if (sobraD > largura * .25 && sobraD > 2 * sobraE + 48) achar('g-colado-a-esquerda', 'aviso', `Conteúdo termina ${Math.round(sobraD)}px antes da borda direita e começa a ${Math.round(sobraE)}px da esquerda: parece desalinhado (G08).`);
      else if ((dir - esq) / largura < .5) achar('g-pouco-uso-da-tela', 'aviso', `Conteúdo usa ${Math.round((dir - esq) / largura * 100)}% da largura: parece o celular colado no computador (G07).`);
    }

    // mais de uma ação principal na primeira dobra
    const grupos = {};
    interativos.filter(primeiraDobra).filter(e => e.matches('button,a,[role=button]')).forEach(e => { const c = cor(cs(e).backgroundColor); if (c.a > .9 && satura(c) > .25) { (grupos[hex(c)] ||= []).push(curto(e.textContent, 20)); } });
    const maior = Object.values(grupos).sort((a, b) => b.length - a.length)[0];
    if (maior && maior.length >= 3) achar('g-acoes-demais', 'aviso', `${maior.length} botões preenchidos com a mesma cor na primeira dobra: qual é a ação principal? (G01)`, maior);

    // logo em quadradinho
    const logos = todos.filter(e => { const r = e.getBoundingClientRect(), s = cs(e), t = (e.textContent || '').trim(); const raio = num(s.borderTopLeftRadius); return r.top < 140 && r.left < 320 && r.width >= 24 && r.width <= 72 && Math.abs(r.width / r.height - 1) < .15 && raio > 0 && !s.borderTopLeftRadius.includes('%') && raio < r.width / 2 && cor(s.backgroundColor).a > .9 && satura(cor(s.backgroundColor)) > .2 && /^[A-ZÀ-Ú]{1,3}$/.test(t); });
    if (logos.length) achar('g-logo-em-quadrado', 'aviso', 'Marca como iniciais dentro de um quadrado colorido: você já reprovou isso (G17).', logos.map(e => e.textContent.trim()));

    // --- cara de IA ----------------------------------------------------------------------------------
    const principal = (familias[0]?.[0] || '').toLowerCase();
    const padrao = ['inter', 'roboto', 'arial', 'helvetica', 'helvetica neue', 'system-ui', '-apple-system', 'segoe ui', 'open sans', 'poppins', 'sans-serif', 'montserrat', 'lato'];
    if (padrao.includes(principal) && !aprovadas.includes(principal)) achar('ia-fonte-padrao', 'aviso', `Fonte principal "${familias[0][0]}" é escolha padrão de gerador. Se foi decisão, declare no DESIGN.md.`);
    const servidas = new Set([...(document.fonts || [])].map(f => f.family.replace(/["']/g, '').toLowerCase()));
    if (principal && !servidas.has(principal) && !['system-ui', '-apple-system', 'ui-sans-serif', 'ui-serif', 'sans-serif', 'serif', 'monospace'].includes(principal) && !aprovadas.includes(principal)) achar('g-fonte-nao-servida', 'aviso', `Fonte "${familias[0][0]}" vem do sistema, não do projeto: em outro aparelho, como um Android, a tela muda de letra. Sirva em WOFF2 ou declare a decisão no DESIGN.md.`);
    const TW = { indigo: 'eef2ff e0e7ff c7d2fe a5b4fc 818cf8 6366f1 4f46e5 4338ca 3730a3 312e81', violeta: 'f5f3ff ede9fe ddd6fe c4b5fd a78bfa 8b5cf6 7c3aed 6d28d9 5b21b6 4c1d95', roxo: 'faf5ff f3e8ff e9d5ff d8b4fe c084fc a855f7 9333ea 7e22ce 6b21a8 581c87', azul: 'eff6ff dbeafe bfdbfe 93c5fd 60a5fa 3b82f6 2563eb 1d4ed8 1e40af 1e3a8a', cinza: 'f9fafb f3f4f6 e5e7eb d1d5db 9ca3af 6b7280 4b5563 374151 1f2937 111827', ardosia: 'f8fafc f1f5f9 e2e8f0 cbd5e1 94a3b8 64748b 475569 334155 1e293b 0f172a', zinco: 'fafafa f4f4f5 e4e4e7 d4d4d8 a1a1aa 71717a 52525b 3f3f46 27272a 18181b', vermelho: 'fef2f2 fee2e2 fecaca fca5a5 f87171 ef4444 dc2626 b91c1c 991b1b 7f1d1d', verde: 'f0fdf4 dcfce7 bbf7d0 86efac 4ade80 22c55e 16a34a 15803d 166534 14532d', esmeralda: 'ecfdf5 d1fae5 a7f3d0 6ee7b7 34d399 10b981 059669 047857 065f46 064e3b', ambar: 'fffbeb fef3c7 fde68a fcd34d fbbf24 f59e0b d97706 b45309 92400e 78350f' };
    const cores = new Set(); todos.forEach(e => { const s = cs(e); [s.color, s.backgroundColor].forEach(v => { const c = cor(v); if (c.a > .5) cores.add(hex(c)); }); });
    const achadas = {}; for (const [fam, lista] of Object.entries(TW)) { const h = lista.split(' ').filter(x => cores.has('#' + x)); if (h.length) achadas[fam] = h; }
    const totalTW = Object.values(achadas).flat().length;
    if (achadas.indigo || achadas.violeta || achadas.roxo) achar('ia-indigo', 'aviso', 'Índigo ou violeta da paleta padrão do Tailwind: a paleta que você reprovou como "muita cara de IA".', [...(achadas.indigo || []), ...(achadas.violeta || []), ...(achadas.roxo || [])].map(x => '#' + x));
    if (totalTW >= 5) achar('ia-paleta-padrao', 'aviso', `${totalTW} cores idênticas à paleta padrão do Tailwind: paleta sem decisão própria.`, Object.keys(achadas));
    const textoGrad = textos.filter(e => cs(e).webkitBackgroundClip === 'text' || cs(e).backgroundClip === 'text');
    if (textoGrad.length) achar('ia-texto-gradiente', 'aviso', 'Texto com gradiente.', textoGrad.map(e => curto(e.textContent, 24)));
    const gradRoxo = todos.filter(e => /gradient/.test(cs(e).backgroundImage) && (cs(e).backgroundImage.match(/rgba?\([^)]+\)/g) || []).some(v => { const c = cor(v); return c.a > .3 && satura(c) > .3 && matiz(c) >= 230 && matiz(c) <= 300; }));
    if (gradRoxo.length) achar('ia-gradiente-roxo', 'aviso', 'Gradiente em tons de roxo ou azul-violeta.');
    const sobrancelhas = [...document.querySelectorAll('h1,h2,h3,h4')].filter(vis).filter(h => { const a = h.previousElementSibling; if (!a || !vis(a) || (a.textContent || '').length > 40) return false; const s = cs(a); return num(s.fontSize) <= 15 && (s.textTransform === 'uppercase') && num(s.letterSpacing) > .2; });
    if (sobrancelhas.length >= 2) achar('ia-sobrancelha', 'aviso', `${sobrancelhas.length} rótulos em caixa alta com tracking acima de títulos.`, sobrancelhas.map(h => curto(h.previousElementSibling.textContent, 20)));
    const quadradoIcone = c => [...c.querySelectorAll('div,span,i,figure')].some(q => { const r = q.getBoundingClientRect(), s = cs(q); return r.width >= 28 && r.width <= 72 && Math.abs(r.width / r.height - 1) < .15 && num(s.borderTopLeftRadius) > 0 && cor(s.backgroundColor).a > .2 && q.querySelector('svg') && !(q.textContent || '').trim(); });
    const grades = todos.filter(p => p.children.length >= 3 && /grid|flex/.test(cs(p).display)).filter(p => { const f = [...p.children].filter(vis); if (f.length < 3) return false; const w = f[0].getBoundingClientRect().width; return f.every(c => Math.abs(c.getBoundingClientRect().width - w) < w * .06) && f.filter(quadradoIcone).length >= 3; });
    if (grades.length) achar('ia-cards-iguais', 'aviso', 'Grade de cartões iguais com ícone em quadradinho, título e texto: o layout mais repetido por gerador.');
    const cartao = e => { const s = cs(e); return num(s.borderTopLeftRadius) >= 8 && cor(s.backgroundColor).a > .9 && (s.boxShadow !== 'none' || num(s.borderTopWidth) >= 1) && e.getBoundingClientRect().height > 60; };
    const cartoes = todos.filter(cartao);
    const aninhados = cartoes.filter(c => { let p = c.parentElement; while (p) { if (cartoes.includes(p) && c.getBoundingClientRect().width > p.getBoundingClientRect().width * .4) return true; p = p.parentElement; } return false; });
    if (aninhados.length >= 2) achar('ia-cartao-em-cartao', 'aviso', `${aninhados.length} cartões dentro de cartões.`);
    const emoji = textos.filter(e => e.closest('button,a,nav,h1,h2,h3') && /\p{Extended_Pictographic}/u.test(comTexto.get(e)) && !/^[\s✓✔✕×←→↑↓]+$/.test(comTexto.get(e)));
    if (emoji.length) achar('ia-emoji', 'aviso', 'Emoji fazendo papel de ícone em controle ou título.', emoji.map(e => curto(e.textContent, 18)));
    const faiscas = document.querySelectorAll('svg[class*="sparkle" i],[data-lucide*="sparkle" i],[class*="lucide-sparkle" i]').length;
    if (faiscas) achar('ia-faisca', 'aviso', `${faiscas} ícone(s) de faíscas: virou o símbolo de produto feito por IA.`);
    const bordaEsq = cartoes.filter(c => { const s = cs(c); return num(s.borderLeftWidth) >= 3 && num(s.borderRightWidth) <= 1 && satura(cor(s.borderLeftColor)) > .3; });
    if (bordaEsq.length >= 3) achar('ia-borda-esquerda', 'aviso', `${bordaEsq.length} cartões com borda colorida à esquerda.`);
    const cliches = (document.body.innerText || '').match(/\b(transforme (seu|sua|a)|revolucion\w+|potencialize|sem complica[cç][aã]o|bem-vindo de volta|bem-vinda de volta|lorem ipsum|simples\. r[aá]pido|solu[cç][aã]o completa|pr[oó]ximo n[ií]vel|sua jornada|em um s[oó] lugar|seamless|supercharge|unleash|all-in-one|elevate your)\b/gi);
    if (cliches) achar('ia-texto-cliche', 'aviso', 'Frases de gerador no texto da tela.', cliches.map(c => c.toLowerCase()));
  }

  const raios = {}; todos.forEach(e => { const v = cs(e).borderTopLeftRadius; if (v !== '0px') raios[v] = (raios[v] || 0) + 1; });
  return {
    url: location.href, tamanho: `${innerWidth}x${innerHeight}`, papel, achados,
    medidas: { fontes: familias.slice(0, 4).map(f => f[0]), tamanhosDeFonte: tamanhos, palavrasNaDobra: palavrasDobra, raios, sombras: new Set(todos.map(e => cs(e).boxShadow).filter(v => v !== 'none')).size, camadasFixasPx: coberto, alvos: interativos.length },
  };
})()
