// Imprime uma página em PDF A4 pelo Chrome sem janela. Uso: node pdf.mjs <url> <saida.pdf>
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
const [url, saida] = process.argv.slice(2);
const exe = ['C:/Program Files/Google/Chrome/Application/chrome.exe', `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const porta = 9900 + Math.floor(Math.random() * 90);
const nav = spawn(exe, ['--headless=new', `--remote-debugging-port=${porta}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'p-'))}`, 'about:blank'], { stdio: 'ignore' });
const dormir = ms => new Promise(r => setTimeout(r, ms));
let alvo; for (let i = 0; i < 50 && !alvo; i++) { await dormir(200); try { alvo = (await (await fetch(`http://127.0.0.1:${porta}/json`)).json()).find(t => t.type === 'page'); } catch {} }
const ws = new WebSocket(alvo.webSocketDebuggerUrl); await new Promise(r => ws.onopen = r);
let id = 0; const pend = new Map();
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); } };
const cmd = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await cmd('Page.navigate', { url }); await dormir(2500);
const { data } = await cmd('Page.printToPDF', { preferCSSPageSize: true, printBackground: true, generateTaggedPDF: true });
writeFileSync(saida, Buffer.from(data, 'base64'));
ws.close(); nav.kill(); console.log('PDF em', saida);
