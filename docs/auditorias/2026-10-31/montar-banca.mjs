// Monta o pacote cego: sorteia rótulos, copia as capturas e gera versões sem nome e sem texto.
import { spawn } from 'node:child_process';
import { copyFileSync, mkdirSync, writeFileSync, existsSync, rmSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { randomInt } from 'node:crypto';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const S = process.argv[2];
const banca = join(S, 'banca'), mascara = join(S, 'banca-mascara');
for (const p of [banca, mascara]) { rmSync(p, { recursive: true, force: true }); mkdirSync(p, { recursive: true }); }

const telas = [
  { id: 'q1', brief: 'queijaria', kit: true }, { id: 'q2', brief: 'queijaria', kit: false },
  { id: 'g1', brief: 'guincho', kit: true }, { id: 'g2', brief: 'guincho', kit: false },
];
// letras sorteadas: nada no nome diz a origem nem o brief
const letras = ['K', 'M', 'R', 'T'];
for (let i = letras.length - 1; i > 0; i--) { const j = randomInt(i + 1); [letras[i], letras[j]] = [letras[j], letras[i]]; }
telas.forEach((t, i) => { t.rotulo = letras[i]; });
writeFileSync(join(S, 'chave.json'), JSON.stringify(telas, null, 1));
for (const t of telas) {
  const v = join(S, 'verif', `neutro-${t.id}`, 'tela');
  copyFileSync(join(v, 'desktop-inteira.jpg'), join(banca, `tela-${t.rotulo}-computador-inteira.jpg`));
  copyFileSync(join(v, 'desktop.png'), join(banca, `tela-${t.rotulo}-computador-primeira-dobra.png`));
  copyFileSync(join(v, 'celular-inteira.jpg'), join(banca, `tela-${t.rotulo}-celular-inteira.jpg`));
}

// versões mascaradas, pelo protocolo de depuração do Chrome
const exe = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const perfil = mkdtempSync(join(tmpdir(), 'banca-'));
const porta = 9300 + randomInt(90);
const nav = spawn(exe, ['--headless=new', `--remote-debugging-port=${porta}`, `--user-data-dir=${perfil}`, '--no-first-run', '--disable-extensions', 'about:blank'], { stdio: 'ignore' });
const dorme = ms => new Promise(r => setTimeout(r, ms));
let alvo; for (let i = 0; i < 60 && !alvo; i++) { await dorme(200); try { alvo = (await (await fetch(`http://127.0.0.1:${porta}/json`)).json()).find(p => p.type === 'page'); } catch {} }
const ws = new WebSocket(alvo.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r));
let n = 0; const esp = new Map();
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && esp.has(m.id)) { esp.get(m.id)(m); esp.delete(m.id); } });
const cdp = (method, params = {}) => new Promise(r => { const i = ++n; esp.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = e => cdp('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true });
await cdp('Page.enable'); await cdp('Runtime.enable');
await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
const fotografar = async nome => {
  const h = (await ev('document.documentElement.scrollHeight')).result.result.value;
  const c = await cdp('Page.captureScreenshot', { format: 'jpeg', quality: 80, captureBeyondViewport: true, clip: { x: 0, y: 0, width: 1440, height: Math.min(h, 6000), scale: 1 } });
  writeFileSync(nome, Buffer.from(c.result.data, 'base64'));
};
const abrir = async t => {
  await cdp('Page.navigate', { url: pathToFileURL(join(S, `proj-${t.id}`, 'entrega', 'tela.html')).href });
  for (let i = 0; i < 50; i++) { await dorme(100); if ((await ev('document.readyState')).result.result.value === 'complete') break; }
  await ev('document.fonts.ready.then(()=>1)'); await dorme(800);
  // o botão de terceiros e o nome saem: o que se mede é a tela
};
// tira o nome da marca e os logos; mantém todo o resto
const SEM_NOME = `(() => {
  const nomes = /curral velho|central fern[aã]o dias|central de atendimento/gi;
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let x; (x = w.nextNode());) if (nomes.test(x.textContent)) { nomes.lastIndex = 0; x.textContent = x.textContent.replace(nomes, m => '\\u2588'.repeat(Math.min(m.length, 10))); }
  document.querySelectorAll('header a svg, header svg[aria-label], [class*=logo] svg, img[alt*=logo i], a[aria-label*=Curral i] svg').forEach(e => { e.style.visibility = 'hidden'; });
  document.title = ''; return 1;
})()`;
// troca cada texto por uma barra na mesma cor: sobram escala, peso, cor, forma e composição
const SEM_TEXTO = `(() => {
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), nos = [];
  for (let x; (x = w.nextNode());) if (x.textContent.trim() && x.parentElement && !['SCRIPT','STYLE','NOSCRIPT'].includes(x.parentElement.tagName)) nos.push(x);
  for (const x of nos) {
    if (x.parentElement.closest('svg')) { x.parentElement.style.fill = 'transparent'; continue; }
    const c = getComputedStyle(x.parentElement).color, s = document.createElement('span');
    s.textContent = x.textContent;
    s.style.cssText = 'background:' + c + ';color:transparent;opacity:.55;-webkit-box-decoration-break:clone;box-decoration-break:clone;border-radius:0';
    x.replaceWith(s);
  }
  document.querySelectorAll('header a svg, header svg[aria-label], [class*=logo] svg').forEach(e => { e.style.visibility = 'hidden'; });
  return 1;
})()`;
for (const t of telas) {
  await abrir(t); await ev(SEM_NOME); await fotografar(join(mascara, `tela-${t.rotulo}-sem-nome.jpg`));
  await abrir(t); await ev(SEM_TEXTO); await fotografar(join(mascara, `tela-${t.rotulo}-sem-texto.jpg`));
}
ws.close(); nav.kill(); await dorme(400); try { rmSync(perfil, { recursive: true, force: true }); } catch {}
console.log('pronto', telas.map(t => t.rotulo).length, 'telas');
process.exit(0);
