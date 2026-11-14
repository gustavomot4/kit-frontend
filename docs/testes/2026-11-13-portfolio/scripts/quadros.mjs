// Captura quadros de uma página em várias posições de rolagem (para ver animação de scroll).
// Uso: node quadros.mjs <url> <pasta-saida> <fração1,fração2,...> [largura] [altura]
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
const [url, saida, fracs, W = '1440', H = '900'] = process.argv.slice(2);
mkdirSync(saida, { recursive: true });
const exe = ['C:/Program Files/Google/Chrome/Application/chrome.exe', `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const porta = 9400 + Math.floor(Math.random() * 400);
const nav = spawn(exe, ['--headless=new', `--remote-debugging-port=${porta}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'q-'))}`, '--use-angle=swiftshader', '--enable-unsafe-swiftshader', `--window-size=${W},${H}`, 'about:blank'], { stdio: 'ignore' });
const dormir = ms => new Promise(r => setTimeout(r, ms));
let alvo;
for (let i = 0; i < 50 && !alvo; i++) { await dormir(200); try { alvo = (await (await fetch(`http://127.0.0.1:${porta}/json`)).json()).find(t => t.type === 'page'); } catch {} }
const ws = new WebSocket(alvo.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map();
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); } };
const cmd = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await cmd('Emulation.setDeviceMetricsOverride', { width: +W, height: +H, deviceScaleFactor: 1, mobile: false });
if (process.env.MOVIMENTO === 'reduce') await cmd('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await cmd('Page.navigate', { url }); await dormir(5000);
const total = (await cmd('Runtime.evaluate', { expression: 'document.documentElement.scrollHeight - innerHeight', returnByValue: true })).result.value;
let n = 0;
for (const f of fracs.split(',').map(Number)) {
  const y = Math.round(total * f);
  // rola em passos, como uma roda de mouse
  await cmd('Runtime.evaluate', { expression: `(async()=>{const a=scrollY,b=${y};for(let k=1;k<=20;k++){scrollTo(0,a+(b-a)*k/20);await new Promise(r=>setTimeout(r,40));}})()`, awaitPromise: true });
  await dormir(1600);
  const { data } = await cmd('Page.captureScreenshot', { format: 'jpeg', quality: 70 });
  writeFileSync(join(saida, `q${String(++n).padStart(2, '0')}-${Math.round(f * 100)}.jpg`), Buffer.from(data, 'base64'));
}
ws.close(); nav.kill(); console.log(`${n} quadros em ${saida} (altura rolável ${total}px)`);
