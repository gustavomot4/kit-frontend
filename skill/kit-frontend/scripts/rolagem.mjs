#!/usr/bin/env node
// Captura a tela em vários pontos da rolagem, como quem rola com a roda do mouse, para ver movimento, 3D e trilho horizontal.
// Faz duas passadas: com movimento e com movimento reduzido. A página inteira do verificador não mostra o que só aparece rolando.
// Uso: node rolagem.mjs <url ou arquivo.html> [outros] [--pontos 0,8,16,25,35,50,70,100] [--largura 1440] [--altura 900] [--saida design/verificacao]
// Saída: 0 capturou; 2 nada capturado. Em <saida>/<tela>/rolagem/ ficam os quadros e rolagem.html, para mostrar ao dono e à escolha cega.
import { spawn } from 'node:child_process';
import { writeFileSync, existsSync, mkdtempSync, mkdirSync, rmSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';

const USO = 'Uso: rolagem.mjs <url ou arquivo.html> [outros] [--pontos 0,8,16,25,35,50,70,100] [--largura 1440] [--altura 900] [--saida pasta]';
const args = process.argv.slice(2);
const opcao = (nome, padrao) => { const i = args.indexOf(nome); return i >= 0 ? args.splice(i, 2)[1] : padrao; };
const saida = resolve(opcao('--saida', 'design/verificacao'));
const pontos = opcao('--pontos', '0,8,16,25,35,50,70,100').split(',').map(Number).filter(n => n >= 0 && n <= 100);
const largura = +opcao('--largura', '1440'), altura = +opcao('--altura', '900');
if (!args.length || !pontos.length || !(largura > 0) || !(altura > 0)) { console.error(USO); process.exit(2); }
const estranha = args.find(a => a.startsWith('-'));
if (estranha) { console.error(`Opção desconhecida: ${estranha}\n${USO}`); process.exit(2); }
const exe = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`, 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find(c => c && existsSync(c));
if (!exe) { console.error('Não achei Chrome, Edge nem Chromium. Defina CHROME_PATH.'); process.exit(2); }

const perfil = mkdtempSync(join(tmpdir(), 'kit-frontend-'));
const porta = 10100 + Math.floor(Math.random() * 90);
// WebGL por software: sem isto, cena 3D sai em branco num navegador sem janela
const nav = spawn(exe, ['--headless=new', `--remote-debugging-port=${porta}`, `--user-data-dir=${perfil}`, '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', 'about:blank'], { stdio: 'ignore' });
const dorme = ms => new Promise(r => setTimeout(r, ms));
const fechar = async c => { try { nav.kill(); } catch { /* já saiu */ } await dorme(400); try { rmSync(perfil, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); } catch { /* o sistema limpa depois */ } process.exit(c); };
let alvo; for (let t = 0; t < 60 && !alvo; t++) { await dorme(200); try { alvo = (await (await fetch(`http://127.0.0.1:${porta}/json`)).json()).find(p => p.type === 'page'); } catch { /* subindo */ } }
if (!alvo) { console.error('O navegador não abriu a porta de depuração.'); await fechar(2); }
const ws = new WebSocket(alvo.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r));
let id = 0; const esp = new Map();
ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.id && esp.has(m.id)) { esp.get(m.id)(m); esp.delete(m.id); } });
const cdp = (method, params = {}) => new Promise(res => { const n = ++id; esp.set(n, res); ws.send(JSON.stringify({ id: n, method, params })); setTimeout(() => { if (esp.has(n)) { esp.delete(n); res({}); } }, 30000); });
const ev = async e => (await cdp('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result?.result?.value;
await cdp('Page.enable'); await cdp('Runtime.enable');
await cdp('Emulation.setDeviceMetricsOverride', { width: largura, height: altura, deviceScaleFactor: 1, mobile: largura < 768 });

async function abrir(url, reduzido) {
  await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: reduzido ? 'reduce' : 'no-preference' }] });
  await cdp('Page.navigate', { url });
  for (let i = 0; i < 60; i++) { await dorme(100); if (await ev('document.readyState') === 'complete') break; }
  await ev('document.fonts ? document.fonts.ready.then(() => 1) : 1');
  // tempo para módulos, bibliotecas e cenas 3D subirem
  await dorme(2500);
}

// rola em passos curtos, como uma roda de mouse: animação presa à rolagem precisa ver o caminho, não só o destino
const rolarAte = y => ev(`(async () => { const a = scrollY, b = ${y}; for (let k = 1; k <= 20; k++) { scrollTo(0, a + (b - a) * k / 20); await new Promise(r => setTimeout(r, 40)); } return 1; })()`);

let capturadas = 0;
for (const entrada of args) {
  const url = /^(https?|file):/.test(entrada) ? entrada : pathToFileURL(resolve(entrada)).href;
  const nome = (/^https?:/.test(entrada) ? new URL(entrada).pathname.replace(/\.html?$/i, '').replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'index' : basename(entrada.split('?')[0], '.html')).toLowerCase();
  const pasta = join(saida, nome, 'rolagem'); rmSync(pasta, { recursive: true, force: true }); mkdirSync(pasta, { recursive: true });
  const linhas = [];
  for (const reduzido of [false, true]) {
    await abrir(url, reduzido);
    const total = await ev('Math.max(0, document.documentElement.scrollHeight - innerHeight)') || 0;
    const quadros = [];
    for (const [n, p] of pontos.entries()) {
      await rolarAte(Math.round(total * p / 100)); await dorme(1200);
      const c = await cdp('Page.captureScreenshot', { format: 'jpeg', quality: 72 });
      if (!c.result?.data) continue;
      const arquivo = `${reduzido ? 'reduzido' : 'movimento'}-${String(n + 1).padStart(2, '0')}-${p}.jpg`;
      writeFileSync(join(pasta, arquivo), Buffer.from(c.result.data, 'base64'));
      quadros.push({ arquivo, p }); capturadas++;
    }
    linhas.push({ reduzido, total, quadros });
  }
  const [com, sem] = linhas;
  const diferenca = com.total && sem.total ? Math.abs(com.total - sem.total) / Math.max(com.total, sem.total) : 0;
  const bloco = l => `<h2>${l.reduzido ? 'Com movimento reduzido' : 'Com movimento'} <small>(${l.total} px de rolagem)</small></h2><ul>${l.quadros.map(q => `<li><img src="${q.arquivo}" alt="Tela em ${q.p}% da rolagem" loading="lazy"><span>${q.p}%</span></li>`).join('')}</ul>`;
  writeFileSync(join(pasta, 'rolagem.html'), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Rolagem: ${nome}</title><style>body{margin:0;padding:1.5rem;font:1rem/1.5 system-ui,sans-serif;background:#fff;color:#1a1a1a}h1{font-size:1.5rem;margin:0}h2{font-size:1.125rem;margin:2rem 0 .5rem}small{font-weight:400;color:#555}ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:12px}li{margin:0}img{display:block;width:100%;height:auto;border:1px solid #ccc}span{font-size:.875rem;color:#555}</style></head><body><h1>Rolagem: ${nome}</h1><p>${largura} × ${altura}. Cada quadro é a tela depois de rolar até a porcentagem indicada.</p>${linhas.map(bloco).join('')}</body></html>`);
  console.log(`${entrada}\n  ${com.quadros.length + sem.quadros.length} quadros em ${pasta}`);
  // com movimento reduzido, trilho fixado deve virar coluna: a altura rolável muda
  if (diferenca > .1) console.log(`  A altura rolável muda ${Math.round(diferenca * 100)}% com movimento reduzido: confira nos quadros que nada ficou de fora.`);
  if (!com.total) console.log('  A página não rola nessa altura.');
}
ws.close();
console.log(`\nAbra rolagem.html e olhe quadro a quadro. Isto mostra o movimento; quem julga se ele serve é o dono.`);
await fechar(capturadas ? 0 : 2);
