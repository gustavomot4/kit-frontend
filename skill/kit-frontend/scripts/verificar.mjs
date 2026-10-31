#!/usr/bin/env node
// Abre cada tela no Chrome ou Edge instalado, em quatro tamanhos, e roda tela.js mais uma passada de Tab.
// Também mede letra em 200%, espaçamento 1.4.12, alto contraste e peso, e guarda a página inteira, a prancha com visão simulada e o que o leitor de tela recebe.
// Uso: node verificar.mjs <url ou arquivo.html> [outros] [--saida pasta] [--design DESIGN.md] [--produto PRODUTO.md] [--publicos a,b] [--json]
// Saída: 0 sem falha; 1 com falha; 2 não conseguiu rodar ou nenhuma tela abriu. Sem dependências: Node 22+.
import { spawn, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdtempSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { tmpdir, homedir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const USO = 'Uso: verificar.mjs <url ou arquivo.html> [outros] [--saida pasta] [--design DESIGN.md] [--produto PRODUTO.md] [--publicos a,b] [--json]';
if (args.includes('--help') || args.includes('-h')) { console.log(USO); process.exit(0); }
const valor = nome => { const i = args.indexOf(nome); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return v; };
const saida = resolve(valor('--saida') || 'design/verificacao');
const arquivoDesign = valor('--design') || 'DESIGN.md';
const arquivoProduto = valor('--produto') || 'PRODUTO.md';
const publicosPedidos = valor('--publicos');
const comoJson = args.includes('--json'); if (comoJson) args.splice(args.indexOf('--json'), 1);
const estranha = args.find(a => a.startsWith('-'));
if (estranha) { console.error(`Opção desconhecida: ${estranha}\n${USO}`); process.exit(2); }
if (!args.length) { console.error(USO); process.exit(2); }
// arquivo que não existe não é tela: sem isto, o script audita a página de erro do navegador e relata falhas falsas
const faltando = args.filter(a => !/^https?:/.test(a) && !existsSync(/^file:/.test(a) ? fileURLToPath(a.split('?')[0]) : resolve(a.split('?')[0])));
if (faltando.length) { console.error(`Não achei: ${faltando.join(', ')}. Nada foi verificado.`); process.exit(2); }

function acharNavegador() {
  const candidatos = [process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge', '/Applications/Chromium.app/Contents/MacOS/Chromium',
    `${homedir()}/.cache/ms-playwright/chromium/chrome-linux/chrome`];
  for (const c of candidatos) if (c && existsSync(c)) return c;
  for (const n of ['google-chrome', 'google-chrome-stable', 'chromium', 'chromium-browser', 'microsoft-edge']) {
    const r = spawnSync('which', [n], { encoding: 'utf8' });
    if (r.status === 0 && r.stdout.trim()) return r.stdout.trim();
  }
  return null;
}
const exe = acharNavegador();
if (!exe) { console.error('Não achei Chrome, Edge nem Chromium. Defina CHROME_PATH, ou cole scripts/tela.js no console do navegador.'); process.exit(2); }

// fonte é decisão quando o motivo está em "Do's and Don'ts" do DESIGN.md; só citar nos tokens não basta
const decisoes = existsSync(arquivoDesign) ? /^## Do['’]s and Don['’]ts[^\n]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m.exec(readFileSync(arquivoDesign, 'utf8').replace(/\r\n/g, '\n'))?.[1] || '' : '';
const fontesComMotivo = decisoes.split('\n').filter(l => /\b(porque|pois|motivo|por causa|por isso|j[aá] que)\b/i.test(l));
const tela = readFileSync(join(aqui, 'tela.js'), 'utf8');
// para quem é a tela: muda o rigor de algumas checagens (references/qualidade/publicos.md)
const produto = existsSync(arquivoProduto) ? readFileSync(arquivoProduto, 'utf8') : '';
const campoProduto = nome => new RegExp(`^[\\s*-]*${nome}\\**:\\**\\s*\\[?([^\\]\\n]*)`, 'm').exec(produto)?.[1] || '';
const publicos = (publicosPedidos ?? campoProduto('publicos')).split(',').map(p => p.trim()).filter(p => /^[a-z-]+$/.test(p));
const superficie = campoProduto('superficie').trim();

const perfil = mkdtempSync(join(tmpdir(), 'kit-frontend-'));
const porta = 9400 + Math.floor(Math.random() * 500);
const nav = spawn(exe, ['--headless=new', `--remote-debugging-port=${porta}`, `--user-data-dir=${perfil}`, '--no-first-run', '--no-default-browser-check', '--disable-extensions', 'about:blank'], { stdio: 'ignore' });
const dorme = ms => new Promise(r => setTimeout(r, ms));
const encerrar = async codigo => { try { nav.kill(); } catch { /* já saiu */ } await dorme(400); try { rmSync(perfil, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch { /* o sistema limpa depois */ } process.exit(codigo); };

let alvo;
for (let i = 0; i < 60 && !alvo; i++) { await dorme(200); try { alvo = (await (await fetch(`http://127.0.0.1:${porta}/json`)).json()).find(t => t.type === 'page'); } catch { /* subindo */ } }
if (!alvo) { console.error('O navegador não abriu a porta de depuração.'); await encerrar(2); }
const ws = new WebSocket(alvo.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r));
let id = 0; const esperando = new Map();
ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.id && esperando.has(m.id)) { esperando.get(m.id)(m); esperando.delete(m.id); } });
const cdp = (method, params = {}) => new Promise(res => { const n = ++id; esperando.set(n, res); ws.send(JSON.stringify({ id: n, method, params })); });
const avaliar = async expr => { const r = await cdp('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description || 'erro na página'); return r.result?.result?.value; };
await cdp('Page.enable'); await cdp('Runtime.enable'); await cdp('Network.enable');

const erros = [];
ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.method === 'Runtime.exceptionThrown') erros.push(m.params.exceptionDetails.exception?.description?.split('\n')[0] || m.params.exceptionDetails.text); });
// o que a tela baixa e como o endereço respondeu
const rede = new Map(); let statusDocumento = 0;
ws.addEventListener('message', ev => {
  const m = JSON.parse(ev.data);
  if (m.method === 'Network.responseReceived') { rede.set(m.params.requestId, { url: m.params.response.url, bytes: 0 }); if (m.params.type === 'Document' && !statusDocumento) statusDocumento = m.params.response.status; }
  if (m.method === 'Network.loadingFinished' && rede.has(m.params.requestId)) rede.get(m.params.requestId).bytes = m.params.encodedDataLength;
});

const TAMANHOS = [
  { papel: 'desktop', w: 1440, h: 900, toque: false, captura: true },
  { papel: 'tablet', w: 768, h: 1024, toque: true, captura: false },
  { papel: 'celular', w: 375, h: 812, toque: true, captura: true },
  { papel: 'zoom', w: 320, h: 256, toque: false, captura: true },   // 1280×1024 com 400% de zoom (WCAG 1.4.10)
];

async function abrir(url, t) {
  await cdp('Emulation.setTouchEmulationEnabled', { enabled: t.toque, ...(t.toque ? { maxTouchPoints: 5 } : {}) });
  await cdp('Emulation.setDeviceMetricsOverride', { width: t.w, height: t.h, deviceScaleFactor: 1, mobile: t.toque });
  await cdp('Network.setCacheDisabled', { cacheDisabled: t.papel === 'celular' });
  rede.clear(); statusDocumento = 0;
  const abriu = await cdp('Page.navigate', { url });
  if (abriu.result?.errorText) throw new Error(abriu.result.errorText);
  for (let i = 0; i < 50; i++) { await dorme(100); if (await avaliar('document.readyState') === 'complete') break; }
  if (statusDocumento >= 400) throw new Error(`o endereço respondeu ${statusDocumento}`);
  // foto com loading="lazy" só carrega perto da tela: sem isto, a medida e a captura da página inteira saem sem ela
  await avaliar(`Promise.race([Promise.all([...document.images].map(i => { i.loading = 'eager'; return i.complete ? 0 : new Promise(r => { i.addEventListener('load', r, { once: true }); i.addEventListener('error', r, { once: true }); }); })), new Promise(r => setTimeout(r, 4000))]).then(() => 1)`);
  await avaliar('document.fonts ? document.fonts.ready.then(()=>1) : 1');
  await dorme(250);
}

// A primeira dobra não mostra o resto da página: num teste real, fotos de catálogo com 1402px de altura passaram porque ninguém viu essa parte
async function capturarInteira(pasta, t) {
  const altura = await avaliar('document.documentElement.scrollHeight');
  const c = await cdp('Page.captureScreenshot', { format: 'jpeg', quality: 80, captureBeyondViewport: true, clip: { x: 0, y: 0, width: t.w, height: Math.min(altura, 12000), scale: 1 } });
  if (c.result?.data) writeFileSync(join(pasta, `${t.papel}-inteira.jpg`), Buffer.from(c.result.data, 'base64'));
}

// Quem compra pelo celular paga pelos dados. Limites do kit: 2 MB avisa, 5 MB reprova.
const MB = 1048576;
function medirPeso(somar, onde) {
  const arquivos = [...rede.values()].filter(a => a.bytes > 0).sort((a, b) => b.bytes - a.bytes);
  const total = arquivos.reduce((n, a) => n + a.bytes, 0), texto = b => `${(b / MB).toFixed(1).replace('.', ',')} MB`;
  if (total > 2 * MB) somar({ id: 'q-pagina-pesada', nivel: total > 5 * MB ? 'falha' : 'aviso', msg: `A tela baixa ${texto(total)} no celular. Converta as fotos para WebP ou AVIF, no tamanho em que aparecem.`, exemplos: arquivos.slice(0, 3).map(a => `${texto(a.bytes)} ${decodeURIComponent(a.url.split('?')[0].split('/').pop()).slice(0, 40)}`) }, onde);
  return total;
}

// Passada de Tab: compara o estilo com foco e sem foco, no elemento e em volta dele
const lerFoco = `(() => {
  let e = document.activeElement; if (!e || e === document.body) return null;
  // botão de terceiros, como o do VLibras, vive num shadow DOM: o foco de verdade está lá dentro
  while (e.shadowRoot && e.shadowRoot.activeElement) e = e.shadowRoot.activeElement;
  const pai = n => n.parentElement || n.getRootNode().host || null;
  const P =['outlineStyle','outlineWidth','outlineColor','boxShadow','borderTopColor','borderTopWidth','backgroundColor','color','textDecorationLine'];
  const foto = n => n ? P.map(p => getComputedStyle(n)[p]).join('|') + getComputedStyle(n,'::after').boxShadow + getComputedStyle(n,'::after').outlineStyle + getComputedStyle(n,'::before').boxShadow : '';
  const cadeia = [e]; for (let n = pai(e), i = 0; n && i < 6; n = pai(n), i++) cadeia.push(n);
  // contraste do anel contra o fundo em que ele é desenhado; anel duplo com box-shadow fica de fora
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const cor = c => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#000'; ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1); const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const lin = v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
  const lum = c => .2126 * lin(c[0]) + .7152 * lin(c[1]) + .0722 * lin(c[2]);
  const est = getComputedStyle(e); let anel = null;
  // campo invisível (opacidade 0) não pinta o próprio anel: quem desenha é o rótulo em volta
  if (est.outlineStyle !== 'none' && parseFloat(est.outlineWidth) >= 1 && est.boxShadow === 'none' && +est.opacity > 0) {
    const a = cor(est.outlineColor); let f = [255, 255, 255, 1], medivel = a[3] === 1;
    for (let n = parseFloat(est.outlineOffset) < 0 ? e : pai(e); n; n = pai(n)) { const st = getComputedStyle(n); if (st.backgroundImage !== 'none') { medivel = false; break; } const c = cor(st.backgroundColor); if (c[3] === 1) { f = c; break; } }
    if (medivel) { const [x, y] = [lum(a), lum(f)].sort((p, q) => q - p); anel = (x + .05) / (y + .05); }
  }
  const com = cadeia.map(foto); e.blur(); const sem = cadeia.map(foto); e.focus();
  const r = e.getBoundingClientRect();
  const pontos = [[r.left + r.width / 2, r.top + r.height / 2], [r.left + 3, r.top + 3], [r.right - 3, r.top + 3], [r.left + 3, r.bottom - 3], [r.right - 3, r.bottom - 3]];
  const dentro = pontos.filter(([x, y]) => x >= 0 && y >= 0 && x < innerWidth && y < innerHeight);
  const descoberto = dentro.some(([x, y]) => { const n = e.getRootNode().elementFromPoint(x, y); return n && (n === e || e.contains(n) || n.contains(e)); });
  return { nome: (e.getAttribute('aria-label') || e.textContent || e.value || e.name || e.tagName).trim().replace(/\\s+/g,' ').slice(0, 30), muda: com.some((v, i) => v !== sem[i]), encoberto: !descoberto && dentro.length > 0, anel };
})()`;
async function passarTab(paradas = 14) {
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  const movimento = await avaliar(`document.getAnimations().filter(a => { const t = a.effect && a.effect.getTiming(); return t && t.iterations === Infinity && a.playState === 'running' && (t.duration > 1); }).length`);
  // sem transição: o estilo lido logo depois do blur precisa ser o estado final
  await avaliar(`document.head.appendChild(Object.assign(document.createElement('style'), { id: '__kit', textContent: '*,*::before,*::after{transition:none!important}' })) && 1`);
  const lista = [];
  for (let i = 0; i < paradas; i++) {
    await cdp('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await cdp('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await dorme(30);
    const f = await avaliar(lerFoco); if (f) lista.push(f);
  }
  await avaliar(`document.getElementById('__kit')?.remove(); 1`);
  await cdp('Emulation.setEmulatedMedia', { features: [] });
  return { lista, movimento };
}

// O que a pessoa muda no navegador. Compara com a tela normal, para não acusar um corte que já era proposital.
const CORTES = `[...document.querySelectorAll('body *')].filter(e => { const s = getComputedStyle(e), r = e.getBoundingClientRect(); if (!/(hidden|clip)/.test(s.overflowX + s.overflowY) || s.textOverflow === 'ellipsis' || s.visibility === 'hidden' || r.width <= 2 || r.height <= 2 || e.closest('[aria-hidden="true"]') || !(e.textContent || '').trim()) return false; return e.scrollHeight > e.clientHeight + 2 || e.scrollWidth > e.clientWidth + 2; }).map(e => (e.textContent || '').trim().replace(/\\s+/g, ' ').slice(0, 30))`;
const LATERAL = `document.documentElement.scrollWidth > document.documentElement.clientWidth + 1`;
const SEM_CONTORNO = `[...document.querySelectorAll('input:not([type=hidden],[type=checkbox],[type=radio],[type=range],[type=color],[type=file]),select,textarea')].filter(e => { const r = e.getBoundingClientRect(), s = getComputedStyle(e); if (r.width <= 2 || r.height <= 2 || s.visibility === 'hidden') return false; const tem = n => n && ['Top', 'Bottom', 'Left', 'Right'].some(l => parseFloat(getComputedStyle(n)['border' + l + 'Width']) > 0 && getComputedStyle(n)['border' + l + 'Style'] !== 'none'); return !tem(e) && !tem(e.parentElement); }).map(e => e.getAttribute('aria-label') || e.labels?.[0]?.textContent?.trim() || e.name || e.id || e.tagName)`;
async function passarPreferencias(pasta, somar, onde) {
  await avaliar(`document.activeElement?.blur(); window.scrollTo(0, 0); 1`);
  const antes = await avaliar(CORTES), lateralAntes = await avaliar(LATERAL);
  const novos = l => [...new Set(l)].filter(t => !antes.includes(t));
  await avaliar(`document.documentElement.style.fontSize = '200%'; 1`); await dorme(120);
  const letra = novos(await avaliar(CORTES)), lateral = await avaliar(LATERAL);
  await avaliar(`document.documentElement.style.fontSize = ''; 1`);
  if (letra.length) somar({ id: 'a11y-letra-200', nivel: 'falha', msg: `${letra.length} texto(s) cortados com a letra do navegador em 200%: use min-height no lugar de height (WCAG 1.4.4).`, exemplos: letra.slice(0, 5) }, onde);
  else if (lateral && !lateralAntes) somar({ id: 'a11y-letra-200', nivel: 'aviso', msg: 'Com a letra do navegador em 200%, a tela passa a rolar para o lado.', exemplos: [] }, onde);
  await avaliar(`document.head.appendChild(Object.assign(document.createElement('style'), { id: '__kitEsp', textContent: '*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}' })) && 1`); await dorme(120);
  const espaco = novos(await avaliar(CORTES));
  await avaliar(`document.getElementById('__kitEsp')?.remove(); 1`);
  if (espaco.length) somar({ id: 'a11y-espacamento', nivel: 'falha', msg: `${espaco.length} texto(s) cortados quando a pessoa aumenta o espaçamento (WCAG 1.4.12).`, exemplos: espaco.slice(0, 5) }, onde);
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'forced-colors', value: 'active' }] }); await dorme(120);
  const semContorno = await avaliar(SEM_CONTORNO);
  const contraste = await cdp('Page.captureScreenshot', { format: 'png' }); writeFileSync(join(pasta, 'alto-contraste.png'), Buffer.from(contraste.result.data, 'base64'));
  await cdp('Emulation.setEmulatedMedia', { features: [] });
  if (semContorno.length) somar({ id: 'a11y-alto-contraste', nivel: 'falha', msg: `${semContorno.length} campo(s) somem em alto contraste: o contorno vem só de box-shadow ou do fundo. Declare uma borda, mesmo transparente.`, exemplos: semContorno.slice(0, 5) }, onde);
}

// A mesma tela como outras pessoas veem. É simulação: mostra o problema, não prova que ele não existe.
const VISOES = [['deuteranopia', 'Sem verde (deuteranopia)'], ['protanopia', 'Sem vermelho (protanopia)'], ['tritanopia', 'Sem azul (tritanopia)'], ['achromatopsia', 'Sem cor nenhuma'], ['blurredVision', 'Visão embaçada']];
async function montarPrancha(pasta, tela) {
  for (const [tipo] of VISOES) {
    await cdp('Emulation.setEmulatedVisionDeficiency', { type: tipo }); await dorme(60);
    const c = await cdp('Page.captureScreenshot', { format: 'png' });
    if (c.result?.data) writeFileSync(join(pasta, `visao-${tipo}.png`), Buffer.from(c.result.data, 'base64'));
  }
  await cdp('Emulation.setEmulatedVisionDeficiency', { type: 'none' });
  const figuras = [['desktop.png', 'Como foi feita'], ...VISOES.map(([t, n]) => [`visao-${t}.png`, n]), ['alto-contraste.png', 'Alto contraste do sistema']];
  writeFileSync(join(pasta, 'prancha.html'), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Prancha: ${tela}</title><style>body{margin:0;padding:1.5rem;font:1rem/1.5 system-ui,sans-serif;background:#fff;color:#1a1a1a}h1{font-size:1.5rem;margin:0}ul{list-style:none;margin:1rem 0 0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,28rem),1fr));gap:1.5rem}img{width:100%;height:auto;border:1px solid #767676}</style></head><body><main><h1>Prancha de ${tela}</h1><p>Simulação no Chrome. Procure duas situações que passaram a parecer iguais. Não substitui teste com pessoas.</p><ul>${figuras.map(([a, n]) => `<li><figure style="margin:0"><figcaption>${n}</figcaption><img src="${a}" alt="${n}"></figure></li>`).join('')}</ul></main></body></html>`);
}

// O que o leitor de tela recebe, em ordem. Acusa controle sem nome e fica guardado para ler.
const PAPEIS = new Set(['banner', 'navigation', 'main', 'contentinfo', 'complementary', 'search', 'region', 'form', 'heading', 'link', 'button', 'textbox', 'searchbox', 'combobox', 'listbox', 'checkbox', 'radio', 'switch', 'slider', 'spinbutton', 'tab', 'menuitem', 'image', 'img', 'table', 'dialog', 'alert', 'status']);
const COM_NOME = new Set(['link', 'button', 'textbox', 'searchbox', 'combobox', 'listbox', 'checkbox', 'radio', 'switch', 'slider', 'spinbutton', 'tab', 'menuitem']);
async function lerArvore(pasta, somar, onde) {
  await cdp('Accessibility.enable');
  const nos = (await cdp('Accessibility.getFullAXTree')).result?.nodes || [];
  await cdp('Accessibility.disable');
  const porId = new Map(nos.map(n => [n.nodeId, n])), linhas = [], semNome = [];
  const visitar = (n, nivel) => {
    if (!n) return;
    const papel = n.role?.value, nome = (n.name?.value || '').trim().replace(/\s+/g, ' '), mostra = !n.ignored && PAPEIS.has(papel);
    if (mostra) linhas.push(`${'  '.repeat(nivel)}${papel}: ${nome || '(sem nome)'}`);
    if (!n.ignored && COM_NOME.has(papel) && !nome) semNome.push(papel);
    (n.childIds || []).forEach(id => visitar(porId.get(id), nivel + (mostra ? 1 : 0)));
  };
  visitar(nos.find(n => !n.parentId), 0);
  writeFileSync(join(pasta, 'leitor-de-tela.txt'), linhas.join('\n') + '\n');
  if (semNome.length) somar({ id: 'a11y-nome', nivel: 'falha', msg: `${semNome.length} controle(s) sem nome na árvore de acessibilidade.`, exemplos: semNome.slice(0, 5) }, onde);
}

const relatorios = [];
for (const entrada of args) {
  const url = /^(https?|file):/.test(entrada) ? entrada : pathToFileURL(resolve(entrada)).href;
  const nomeBase = (/^https?:/.test(entrada) ? new URL(entrada).pathname.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'inicio' : basename(entrada.split('?')[0], '.html')).toLowerCase();
  const pasta = join(saida, nomeBase); mkdirSync(pasta, { recursive: true });
  const achados = new Map(); const medidas = {}; erros.length = 0;
  const somar = (a, onde) => { const k = a.id; if (!achados.has(k)) achados.set(k, { ...a, tamanhos: [onde] }); else { const v = achados.get(k); v.tamanhos.push(onde); if (a.nivel === 'falha') { v.nivel = 'falha'; v.msg = a.msg; v.exemplos = a.exemplos; } } };
  try {
    for (const t of TAMANHOS) {
      await abrir(url, t);
      await avaliar(`window.__kitOpcoes = ${JSON.stringify({ papel: t.papel, fontesComMotivo, publicos, superficie })}`);
      const r = await avaliar(tela);
      r.achados.forEach(a => somar(a, r.tamanho));
      medidas[t.papel] = r.medidas;
      if (t.captura) { const c = await cdp('Page.captureScreenshot', { format: 'png' }); writeFileSync(join(pasta, `${t.papel}.png`), Buffer.from(c.result.data, 'base64')); }
      if (t.papel === 'desktop' || t.papel === 'celular') await capturarInteira(pasta, t);
      if (t.papel === 'celular') r.medidas.bytes = medirPeso(somar, r.tamanho);
      if (t.papel === 'desktop') {
        const { lista, movimento } = await passarTab();
        const semSinal = lista.filter(f => !f.muda).map(f => f.nome);
        if (semSinal.length) somar({ id: 'a11y-foco-invisivel', nivel: 'falha', msg: `${semSinal.length} de ${lista.length} paradas de Tab sem mudança visível.`, exemplos: semSinal.slice(0, 5) }, r.tamanho);
        const fracos = lista.filter(f => f.anel !== null && f.anel < 3).map(f => `${f.nome}: ${f.anel.toFixed(2)}:1`);
        if (fracos.length) somar({ id: 'a11y-foco-contraste', nivel: 'falha', msg: `${fracos.length} anel(éis) de foco abaixo de 3:1 contra o fundo (WCAG 1.4.11).`, exemplos: fracos.slice(0, 5) }, r.tamanho);
        const cobertos = lista.filter(f => f.encoberto).map(f => f.nome);
        if (cobertos.length) somar({ id: 'a11y-foco-encoberto', nivel: 'falha', msg: `${cobertos.length} controle(s) com foco escondido atrás de outra camada (WCAG 2.4.11).`, exemplos: cobertos.slice(0, 5) }, r.tamanho);
        if (lista.length && !/pular|ir para|skip/i.test(lista[0].nome)) somar({ id: 'a11y-pular', nivel: 'aviso', msg: `A primeira parada de Tab é "${lista[0].nome}", não o link de pular para o conteúdo.`, exemplos: [] }, r.tamanho);
        if (!lista.length) somar({ id: 'a11y-teclado', nivel: 'falha', msg: 'Nenhum controle recebeu foco pelo Tab.', exemplos: [] }, r.tamanho);
        if (movimento) somar({ id: 'a11y-movimento', nivel: 'falha', msg: `${movimento} animação(ões) em loop continuam com movimento reduzido ativado.`, exemplos: [] }, r.tamanho);
        await passarPreferencias(pasta, somar, r.tamanho);
        await montarPrancha(pasta, nomeBase);
        await lerArvore(pasta, somar, r.tamanho);
      }
    }
    if (erros.length) somar({ id: 'erro-javascript', nivel: 'falha', msg: `${erros.length} erro(s) de JavaScript ao abrir a tela.`, exemplos: [...new Set(erros)].slice(0, 3) }, 'todos');
  } catch (e) { somar({ id: 'nao-abriu', nivel: 'falha', msg: `Não consegui auditar: ${e.message.split('\n')[0]}`, exemplos: [] }, '-'); }
  const lista = [...achados.values()].sort((a, b) => (a.nivel === b.nivel ? 0 : a.nivel === 'falha' ? -1 : 1) || a.id.localeCompare(b.id));
  const rel = { tela: entrada, capturas: pasta, publicos, abriu: !achados.has('nao-abriu'), falhas: lista.filter(a => a.nivel === 'falha').length, avisos: lista.filter(a => a.nivel === 'aviso').length, achados: lista, medidas };
  writeFileSync(join(pasta, 'resultado.json'), JSON.stringify(rel, null, 1));
  relatorios.push(rel);
}
ws.close();

if (comoJson) console.log(JSON.stringify(relatorios, null, 1));
else for (const r of relatorios) {
  console.log(`\n${r.tela}\n  ${r.falhas} falha(s), ${r.avisos} aviso(s). Capturas em ${r.capturas}`);
  for (const a of r.achados) { console.log(`  ${a.nivel === 'falha' ? 'FALHA' : 'aviso'}  ${a.id}: ${a.msg} [${a.tamanhos.join(', ')}]`); a.exemplos.forEach(x => console.log(`         - ${x}`)); }
  const d = r.medidas.desktop, peso = r.medidas.celular?.bytes; if (d) console.log(`  medidas: fontes ${d.fontes.join(', ')}; tamanhos ${d.tamanhosDeFonte.join(' ')}; ${d.palavrasNaDobra} palavras na dobra${peso ? `; ${(peso / MB).toFixed(1).replace('.', ',')} MB no celular` : ''}`);
}
console.log(`\nNão coberto por este script: leitor de tela real, teste com pessoas, estados que dependem de interação, texto sobre imagem e o que só a cor separa. Olhe a página até o fim em desktop-inteira.jpg e celular-inteira.jpg, depois prancha.html e leitor-de-tela.txt, e faça o roteiro de references/qualidade/acessibilidade.md.`);
await encerrar(relatorios.every(r => !r.abriu) ? 2 : relatorios.some(r => r.falhas) ? 1 : 0);
