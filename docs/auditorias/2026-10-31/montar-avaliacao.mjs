// Monta a página para o dono escolher às cegas: novo sorteio, imagens embutidas e sem nome de arquivo que denuncie a origem.
// Tira o botão e a nota de Libras da tela que os tem: para quem escreveu o kit, eles dizem de onde a tela veio.
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomInt } from 'node:crypto';
import { pathToFileURL } from 'node:url';

const S = process.argv[2], destino = process.argv[3];
const pasta = join(S, 'dono'); mkdirSync(pasta, { recursive: true });

const exe = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const perfil = mkdtempSync(join(tmpdir(), 'dono-')), porta = 9000 + randomInt(90);
const nav = spawn(exe, ['--headless=new', `--remote-debugging-port=${porta}`, `--user-data-dir=${perfil}`, '--no-first-run', '--disable-extensions', 'about:blank'], { stdio: 'ignore' });
const dorme = ms => new Promise(r => setTimeout(r, ms));
let alvo; for (let i = 0; i < 60 && !alvo; i++) { await dorme(200); try { alvo = (await (await fetch(`http://127.0.0.1:${porta}/json`)).json()).find(p => p.type === 'page'); } catch {} }
const ws = new WebSocket(alvo.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r));
let n = 0; const esp = new Map();
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && esp.has(m.id)) { esp.get(m.id)(m); esp.delete(m.id); } });
const cdp = (method, params = {}) => new Promise(r => { const i = ++n; esp.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async e => (await cdp('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result?.result?.value;
await cdp('Page.enable'); await cdp('Runtime.enable');
const SEM_LIBRAS = `(() => {
  document.head.appendChild(Object.assign(document.createElement('style'), { textContent: '[vw],#vlibras-access-wrapper{display:none!important}' }));
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), tirar = [];
  for (let x; (x = w.nextNode());) if (/vlibras/i.test(x.textContent) && x.parentElement && !['SCRIPT','STYLE'].includes(x.parentElement.tagName)) tirar.push(x.parentElement);
  tirar.forEach(e => e.remove());
  return tirar.length;
})()`;
for (const [papel, w, h, movel] of [['computador', 1440, 900, false], ['celular', 375, 812, true]]) {
  await cdp('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: movel });
  await cdp('Page.navigate', { url: pathToFileURL(join(S, 'proj-q1', 'entrega', 'tela.html')).href });
  for (let i = 0; i < 50; i++) { await dorme(100); if (await ev('document.readyState') === 'complete') break; }
  await ev('document.fonts.ready.then(()=>1)'); await dorme(2500);
  await ev(SEM_LIBRAS); await dorme(300);
  const altura = await ev('document.documentElement.scrollHeight');
  const c = await cdp('Page.captureScreenshot', { format: 'jpeg', quality: 80, captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: altura, scale: 1 } });
  writeFileSync(join(pasta, `q1-${papel}.jpg`), Buffer.from(c.result.data, 'base64'));
}
ws.close(); nav.kill(); await dorme(400); try { rmSync(perfil, { recursive: true, force: true }); } catch {}

const imagem = (id, papel) => {
  const arquivo = id === 'q1' ? join(pasta, `q1-${papel}.jpg`) : join(S, 'verif', `neutro-${id}`, 'tela', papel === 'computador' ? 'desktop-inteira.jpg' : 'celular-inteira.jpg');
  return `data:image/jpeg;base64,${readFileSync(arquivo).toString('base64')}`;
};
// a ordem de cada par sai do sorteio e fica só na chave
const sorteia = par => randomInt(2) ? par : [par[1], par[0]];
const q = sorteia(['q1', 'q2']), g = sorteia(['g1', 'g2']);
const chave = { 'Tela 1': q[0], 'Tela 2': q[1], 'Tela 3': g[0], 'Tela 4': g[1], origem: { q1: 'queijaria com kit', q2: 'queijaria sem kit', g1: 'guincho com kit', g2: 'guincho sem kit' } };
writeFileSync(join(S, 'chave-dono.json'), JSON.stringify(chave, null, 1));

const tela = (rotulo, id) => `<section aria-labelledby="t${rotulo}">
  <h3 id="t${rotulo}">Tela ${rotulo}</h3>
  <img src="${imagem(id, 'computador')}" alt="Tela ${rotulo}, página inteira no computador" width="1440">
  <details><summary>Ver a Tela ${rotulo} no celular</summary><img class="cel" src="${imagem(id, 'celular')}" alt="Tela ${rotulo}, página inteira no celular" width="375"></details>
</section>`;
writeFileSync(destino, `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Avaliação às cegas</title>
<style>
:root { --fundo: #f4f4f2; --tinta: #1c1c1a; --apoio: #55554f; --linha: #8a8a82; }
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--fundo); color: var(--tinta); font: 1rem/1.5 system-ui, sans-serif; }
main { max-width: 90rem; margin: 0 auto; padding: 1rem; }
h1 { font-size: 1.5rem; margin: .5rem 0; } h2 { font-size: 1.25rem; margin: 2.5rem 0 .25rem; border-top: 2px solid var(--tinta); padding-top: 1rem; } h3 { font-size: 1.125rem; margin: 1.5rem 0 .5rem; }
p { margin: .25rem 0 .75rem; max-width: 70ch; color: var(--apoio); }
img { display: block; width: 100%; height: auto; border: 1px solid var(--linha); background: #fff; }
img.cel { width: min(100%, 23.4375rem); margin-top: .5rem; }
summary { cursor: pointer; padding: .75rem 0; min-height: 44px; }
summary:focus-visible { outline: 3px solid var(--tinta); outline-offset: 2px; }
</style></head><body><main>
<h1>Qual você aprovaria sem pedir para refazer?</h1>
<p>Olhe cada par até o fim da página. Vale responder "nenhuma". Botões de terceiros foram tirados das capturas.</p>
<h2>Pedido 1: site de uma queijaria</h2>
<p>Família que faz queijo Canastra há três gerações e quer vender direto para São Paulo e Belo Horizonte. Sem foto boa e sem logo. "Quero que quem abre entenda que isso é coisa séria e dê vontade de pedir."</p>
${tela(1, q[0])}
${tela(2, q[1])}
<h2>Pedido 2: central de guincho</h2>
<p>Tela que o atendente deixa aberta o turno todo, num monitor só, para ver o que está esperando, qual guincho está livre e mais perto, o que vai estourar o prazo de 60 minutos, e mandar um guincho.</p>
${tela(3, g[0])}
${tela(4, g[1])}
</main></body></html>
`);
console.log('página gravada; a chave ficou guardada sem ser impressa');
process.exit(0);
