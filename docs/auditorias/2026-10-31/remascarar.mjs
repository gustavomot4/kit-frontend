// Refaz a máscara sem texto das telas de sistema, parando os relógios antes: a atualização da tela desfazia a máscara.
import { spawn } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
const S = process.argv[2];
const telas = JSON.parse(readFileSync(join(S, 'chave.json'), 'utf8')).filter(t => t.brief === 'guincho');
const destino = join(S, 'banca-mascara-2'); rmSync(destino, { recursive: true, force: true }); mkdirSync(destino, { recursive: true });
const exe = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const perfil = mkdtempSync(join(tmpdir(), 'mascara-')), porta = 9100 + Math.floor(Math.random() * 90);
const nav = spawn(exe, ['--headless=new', `--remote-debugging-port=${porta}`, `--user-data-dir=${perfil}`, '--no-first-run', '--disable-extensions', 'about:blank'], { stdio: 'ignore' });
const dorme = ms => new Promise(r => setTimeout(r, ms));
let alvo; for (let i = 0; i < 60 && !alvo; i++) { await dorme(200); try { alvo = (await (await fetch(`http://127.0.0.1:${porta}/json`)).json()).find(p => p.type === 'page'); } catch {} }
const ws = new WebSocket(alvo.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r));
let n = 0; const esp = new Map();
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && esp.has(m.id)) { esp.get(m.id)(m); esp.delete(m.id); } });
const cdp = (method, params = {}) => new Promise(r => { const i = ++n; esp.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async e => (await cdp('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result?.result?.value;
await cdp('Page.enable'); await cdp('Runtime.enable');
await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
const MASCARA = `(() => {
  const ultimo = setTimeout(() => {}, 0); for (let i = 0; i <= ultimo + 50; i++) { clearTimeout(i); clearInterval(i); }
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), nos = [];
  for (let x; (x = w.nextNode());) if (x.textContent.trim() && x.parentElement && !['SCRIPT','STYLE','NOSCRIPT'].includes(x.parentElement.tagName)) nos.push(x);
  let trocados = 0;
  for (const x of nos) {
    if (x.parentElement.closest('svg')) { x.parentElement.style.fill = 'transparent'; continue; }
    const c = getComputedStyle(x.parentElement).color, s = document.createElement('span');
    s.textContent = x.textContent;
    s.style.cssText = 'background:' + c + ';color:transparent;opacity:.55;-webkit-box-decoration-break:clone;box-decoration-break:clone;border-radius:0';
    x.replaceWith(s); trocados++;
  }
  return trocados;
})()`;
for (const t of telas) {
  // janela já na altura da página inteira, medida na primeira rodada
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: t.rotulo === 'T' ? 1429 : 900, deviceScaleFactor: 1, mobile: false });
  await cdp('Page.navigate', { url: pathToFileURL(join(S, `proj-${t.id}`, 'entrega', 'tela.html')).href });
  for (let i = 0; i < 50; i++) { await dorme(100); if (await ev('document.readyState') === 'complete') break; }
  await ev('document.fonts.ready.then(()=>1)'); await dorme(800);
  const trocados = await ev(MASCARA); await dorme(1500);
  const legivel = await ev(`[...document.querySelectorAll('body *')].filter(e => [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && getComputedStyle(e).color !== 'rgba(0, 0, 0, 0)' && !e.closest('script,style')).length`);
  const h = await ev('document.documentElement.scrollHeight');
  // sem mudar o tamanho da janela: a captura além da janela dispara resize, e a tela se redesenha sem a máscara
  const c = await cdp('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
  writeFileSync(join(destino, `tela-${t.rotulo.toLowerCase()}-sem-texto.jpg`), Buffer.from(c.result.data, 'base64'));
  console.log(t.rotulo, 'trocados', trocados, 'ainda legíveis', legivel, 'altura', h);
}
ws.close(); nav.kill(); await dorme(400); try { rmSync(perfil, { recursive: true, force: true }); } catch {}
process.exit(0);
