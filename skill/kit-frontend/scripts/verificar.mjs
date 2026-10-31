#!/usr/bin/env node
// Abre cada tela no Chrome ou Edge instalado, em quatro tamanhos, e roda tela.js mais uma passada de Tab.
// Uso: node verificar.mjs <url ou arquivo.html> [outros] [--saida pasta] [--design DESIGN.md] [--json]
// Saída: 0 sem falha; 1 com falha; 2 não conseguiu rodar. Sem dependências: Node 22+.
import { spawn, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdtempSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { tmpdir, homedir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const valor = nome => { const i = args.indexOf(nome); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return v; };
const saida = resolve(valor('--saida') || 'design/verificacao');
const arquivoDesign = valor('--design') || 'DESIGN.md';
const comoJson = args.includes('--json'); if (comoJson) args.splice(args.indexOf('--json'), 1);
if (!args.length) { console.error('Uso: verificar.mjs <url ou arquivo.html> [outros] [--saida pasta] [--design DESIGN.md] [--json]'); process.exit(2); }

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

// fontes declaradas no DESIGN.md foram decisão, não padrão de gerador
const fontesAprovadas = existsSync(arquivoDesign) ? [...readFileSync(arquivoDesign, 'utf8').matchAll(/fontFamily:\s*["']?([^"'\n,]+)/g)].map(m => m[1].trim()) : [];
const tela = readFileSync(join(aqui, 'tela.js'), 'utf8');

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
await cdp('Page.enable'); await cdp('Runtime.enable');

const erros = [];
ws.addEventListener('message', ev => { const m = JSON.parse(ev.data); if (m.method === 'Runtime.exceptionThrown') erros.push(m.params.exceptionDetails.exception?.description?.split('\n')[0] || m.params.exceptionDetails.text); });

const TAMANHOS = [
  { papel: 'desktop', w: 1440, h: 900, toque: false, captura: true },
  { papel: 'tablet', w: 768, h: 1024, toque: true, captura: false },
  { papel: 'celular', w: 375, h: 812, toque: true, captura: true },
  { papel: 'zoom', w: 320, h: 256, toque: false, captura: true },   // 1280×1024 com 400% de zoom (WCAG 1.4.10)
];

async function abrir(url, t) {
  await cdp('Emulation.setTouchEmulationEnabled', { enabled: t.toque, ...(t.toque ? { maxTouchPoints: 5 } : {}) });
  await cdp('Emulation.setDeviceMetricsOverride', { width: t.w, height: t.h, deviceScaleFactor: 1, mobile: t.toque });
  await cdp('Page.navigate', { url });
  for (let i = 0; i < 50; i++) { await dorme(100); if (await avaliar('document.readyState') === 'complete') break; }
  await avaliar('document.fonts ? document.fonts.ready.then(()=>1) : 1');
  await dorme(250);
}

// Passada de Tab: compara o estilo com foco e sem foco, no elemento e em volta dele
const lerFoco = `(() => {
  const e = document.activeElement; if (!e || e === document.body) return null;
  const P = ['outlineStyle','outlineWidth','outlineColor','boxShadow','borderTopColor','borderTopWidth','backgroundColor','color','textDecorationLine'];
  const foto = n => n ? P.map(p => getComputedStyle(n)[p]).join('|') + getComputedStyle(n,'::after').boxShadow + getComputedStyle(n,'::after').outlineStyle + getComputedStyle(n,'::before').boxShadow : '';
  const cadeia = [e]; for (let n = e.parentElement, i = 0; n && i < 6; n = n.parentElement, i++) cadeia.push(n);
  // contraste do anel contra o fundo em que ele é desenhado; anel duplo com box-shadow fica de fora
  const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const cor = c => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#000'; ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1); const d = ctx.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
  const lin = v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; };
  const lum = c => .2126 * lin(c[0]) + .7152 * lin(c[1]) + .0722 * lin(c[2]);
  const est = getComputedStyle(e); let anel = null;
  if (est.outlineStyle !== 'none' && parseFloat(est.outlineWidth) >= 1 && est.boxShadow === 'none') {
    const a = cor(est.outlineColor); let f = [255, 255, 255, 1], medivel = a[3] === 1;
    for (let n = parseFloat(est.outlineOffset) < 0 ? e : e.parentElement; n; n = n.parentElement) { const st = getComputedStyle(n); if (st.backgroundImage !== 'none') { medivel = false; break; } const c = cor(st.backgroundColor); if (c[3] === 1) { f = c; break; } }
    if (medivel) { const [x, y] = [lum(a), lum(f)].sort((p, q) => q - p); anel = (x + .05) / (y + .05); }
  }
  const com = cadeia.map(foto); e.blur(); const sem = cadeia.map(foto); e.focus();
  const r = e.getBoundingClientRect();
  const pontos = [[r.left + r.width / 2, r.top + r.height / 2], [r.left + 3, r.top + 3], [r.right - 3, r.top + 3], [r.left + 3, r.bottom - 3], [r.right - 3, r.bottom - 3]];
  const dentro = pontos.filter(([x, y]) => x >= 0 && y >= 0 && x < innerWidth && y < innerHeight);
  const descoberto = dentro.some(([x, y]) => { const n = document.elementFromPoint(x, y); return n && (n === e || e.contains(n) || n.contains(e)); });
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

const relatorios = [];
for (const entrada of args) {
  const url = /^(https?|file):/.test(entrada) ? entrada : pathToFileURL(resolve(entrada)).href;
  const nomeBase = (/^https?:/.test(entrada) ? new URL(entrada).pathname.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'inicio' : basename(entrada, '.html')).toLowerCase();
  const pasta = join(saida, nomeBase); mkdirSync(pasta, { recursive: true });
  const achados = new Map(); const medidas = {}; erros.length = 0;
  const somar = (a, onde) => { const k = a.id; if (!achados.has(k)) achados.set(k, { ...a, tamanhos: [onde] }); else { const v = achados.get(k); v.tamanhos.push(onde); if (a.nivel === 'falha') { v.nivel = 'falha'; v.msg = a.msg; v.exemplos = a.exemplos; } } };
  try {
    for (const t of TAMANHOS) {
      await abrir(url, t);
      await avaliar(`window.__kitOpcoes = ${JSON.stringify({ papel: t.papel, fontesAprovadas })}`);
      const r = await avaliar(tela);
      r.achados.forEach(a => somar(a, r.tamanho));
      medidas[t.papel] = r.medidas;
      if (t.captura) { const c = await cdp('Page.captureScreenshot', { format: 'png' }); writeFileSync(join(pasta, `${t.papel}.png`), Buffer.from(c.result.data, 'base64')); }
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
      }
    }
    if (erros.length) somar({ id: 'erro-javascript', nivel: 'falha', msg: `${erros.length} erro(s) de JavaScript ao abrir a tela.`, exemplos: [...new Set(erros)].slice(0, 3) }, 'todos');
  } catch (e) { somar({ id: 'nao-abriu', nivel: 'falha', msg: `Não consegui auditar: ${e.message.split('\n')[0]}`, exemplos: [] }, '-'); }
  const lista = [...achados.values()].sort((a, b) => (a.nivel === b.nivel ? 0 : a.nivel === 'falha' ? -1 : 1) || a.id.localeCompare(b.id));
  const rel = { tela: entrada, capturas: pasta, falhas: lista.filter(a => a.nivel === 'falha').length, avisos: lista.filter(a => a.nivel === 'aviso').length, achados: lista, medidas };
  writeFileSync(join(pasta, 'resultado.json'), JSON.stringify(rel, null, 1));
  relatorios.push(rel);
}
ws.close();

if (comoJson) console.log(JSON.stringify(relatorios, null, 1));
else for (const r of relatorios) {
  console.log(`\n${r.tela}\n  ${r.falhas} falha(s), ${r.avisos} aviso(s). Capturas em ${r.capturas}`);
  for (const a of r.achados) { console.log(`  ${a.nivel === 'falha' ? 'FALHA' : 'aviso'}  ${a.id}: ${a.msg} [${a.tamanhos.join(', ')}]`); a.exemplos.forEach(x => console.log(`         - ${x}`)); }
  const d = r.medidas.desktop; if (d) console.log(`  medidas: fontes ${d.fontes.join(', ')}; tamanhos ${d.tamanhosDeFonte.join(' ')}; ${d.palavrasNaDobra} palavras na dobra`);
}
console.log(`\nNão coberto por este script: leitor de tela real, teste com pessoas, estados que dependem de interação, texto sobre imagem. Faça o roteiro de references/qualidade/acessibilidade.md.`);
await encerrar(relatorios.some(r => r.falhas) ? 1 : 0);
