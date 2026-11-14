// Testa se o foco pelo teclado traz cada painel do trilho horizontal para a tela (Tab real via CDP).
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
const url = process.argv[2];
const exe = ['C:/Program Files/Google/Chrome/Application/chrome.exe', `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const porta = 9800 + Math.floor(Math.random() * 100);
const nav = spawn(exe, ['--headless=new', `--remote-debugging-port=${porta}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'f-'))}`, '--use-angle=swiftshader', '--enable-unsafe-swiftshader', 'about:blank'], { stdio: 'ignore' });
const dormir = ms => new Promise(r => setTimeout(r, ms));
let alvo; for (let i = 0; i < 50 && !alvo; i++) { await dormir(200); try { alvo = (await (await fetch(`http://127.0.0.1:${porta}/json`)).json()).find(t => t.type === 'page'); } catch {} }
const ws = new WebSocket(alvo.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map();
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); } };
const cmd = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async e => (await cmd('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result.value;
await cmd('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await cmd('Page.navigate', { url }); await dormir(5000);
const res = [];
for (let k = 0; k < 60; k++) {
  await cmd('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  await cmd('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
  await dormir(700);
  const r = await ev(`(()=>{const a=document.activeElement;const p=a.closest('.painel');if(!p)return null;const b=a.getBoundingClientRect();return {painel:p.querySelector('h3').textContent,texto:a.textContent.trim().slice(0,30),naTela:b.left>=0&&b.right<=innerWidth&&b.top>=0&&b.bottom<=innerHeight,horizontal:document.getElementById('projetos').classList.contains('horizontal')}})()`);
  if (r) res.push(r);
}
console.log(JSON.stringify(res, null, 0));
ws.close(); nav.kill();
