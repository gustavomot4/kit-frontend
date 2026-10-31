// Testes do kit, sem dependências. Uso: node ferramentas/testar.mjs
// Instala em pastas temporárias e confere o verificador contra as fixtures.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { razao, lerCor, paresDoDesign } from '../skill/kit-frontend/scripts/contraste.mjs';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const kit = (...a) => spawnSync(process.execPath, [join(raiz, 'bin', 'kit.mjs'), ...a], { encoding: 'utf8', cwd: raiz, maxBuffer: 1e8 });
const temp = () => mkdtempSync(join(tmpdir(), 'kit-teste-'));
const RUIM = join(raiz, 'ferramentas', 'fixtures', 'tela-ruim.html');
const BOA = join(raiz, 'ferramentas', 'fixtures', 'tela-boa.html');
const SONDA_A11Y = join(raiz, 'ferramentas', 'fixtures', 'sonda-acessibilidade.html');
const SONDA_IA = join(raiz, 'ferramentas', 'fixtures', 'sonda-cara-de-ia.html');
const SONDA_FOTOS = join(raiz, 'ferramentas', 'fixtures', 'sonda-fotos.html');
const SONDA_CAMADA = join(raiz, 'ferramentas', 'fixtures', 'sonda-camada-fixa.html');

test('instala num projeto vazio com skill, pontes e correções', () => {
  const p = temp();
  const r = kit('instalar', p);
  assert.equal(r.status, 0, r.stderr);
  for (const f of ['.agents/skills/kit-frontend/SKILL.md', '.agents/skills/kit-frontend/references/gosto/perfil.md', '.agents/skills/kit-frontend/scripts/verificar.mjs', '.agents/skills/kit-frontend/scripts/comparar-direcoes.mjs', '.agents/skills/kit-frontend/estilos/sistema-gestao/indice.md', '.claude/skills/kit-frontend/SKILL.md', 'AGENTS.md', 'CLAUDE.md', 'design/correcoes.md']) assert.ok(existsSync(join(p, f)), f);
  assert.match(readFileSync(join(p, '.claude/skills/kit-frontend/SKILL.md'), 'utf8'), /\.agents\/skills\/kit-frontend\/SKILL\.md/);
  assert.ok(!existsSync(join(p, '.cursor')), 'não cria pasta de agente não detectado');
  rmSync(p, { recursive: true, force: true });
});

test('preserva o que é do projeto e é idempotente', () => {
  const p = temp();
  writeFileSync(join(p, 'AGENTS.md'), '# Regras do meu projeto\n\nNão apague isto.\n');
  writeFileSync(join(p, 'DESIGN.md'), 'meu design\n');
  writeFileSync(join(p, '.gitignore'), 'node_modules\n');
  mkdirSync(join(p, 'design')); writeFileSync(join(p, 'design', 'correcoes.md'), '- 2026-10-30 | Agenda | feio | regra | nada\n');
  mkdirSync(join(p, '.cursor'));
  kit('instalar', p); kit('atualizar', p);
  const agents = readFileSync(join(p, 'AGENTS.md'), 'utf8');
  assert.match(agents, /Não apague isto/);
  assert.equal(agents.match(/kit-frontend:inicio/g).length, 1, 'bloco só uma vez');
  assert.equal(readFileSync(join(p, 'DESIGN.md'), 'utf8'), 'meu design\n');
  assert.match(readFileSync(join(p, 'design', 'correcoes.md'), 'utf8'), /feio/);
  assert.ok(existsSync(join(p, '.cursor/rules/kit-frontend.mdc')), 'detecta o Cursor');
  assert.equal(readFileSync(join(p, '.gitignore'), 'utf8').match(/design\/verificacao/g).length, 1);
  rmSync(p, { recursive: true, force: true });
});

test('--agentes todos cria as pontes e --global usa a pasta indicada', () => {
  const p = temp(); kit('instalar', p, '--agentes', 'todos');
  for (const f of ['.github/skills/kit-frontend/SKILL.md', '.github/copilot-instructions.md', '.gemini/skills/kit-frontend/SKILL.md', '.windsurf/rules/kit-frontend.md', '.clinerules/kit-frontend.md']) assert.ok(existsSync(join(p, f)), f);
  rmSync(p, { recursive: true, force: true });
  const h = temp(); const r = kit('instalar', '--global', '--home', h);
  assert.equal(r.status, 0, r.stderr);
  assert.ok(existsSync(join(h, '.agents/skills/kit-frontend/SKILL.md')));
  assert.ok(existsSync(join(h, '.claude/skills/kit-frontend/SKILL.md')));
  rmSync(h, { recursive: true, force: true });
});

test('coletar traz correções novas uma vez só', () => {
  const p = temp(); mkdirSync(join(p, 'design'));
  const linha = `- 2099-01-01 | Teste | teste automático ${Date.now()} | regra | nada`;
  writeFileSync(join(p, 'design', 'correcoes.md'), linha + '\n');
  const destino = join(raiz, 'skill/kit-frontend/references/gosto/correcoes-coletadas.md');
  const antes = readFileSync(destino, 'utf8');
  try {
    assert.match(kit('coletar', p).stdout, /1 correção/);
    assert.match(kit('coletar', p).stdout, /0 correção/);
    assert.ok(readFileSync(destino, 'utf8').includes(linha.slice(2)));
  } finally { writeFileSync(destino, antes); rmSync(p, { recursive: true, force: true }); }
});

test('contraste confere com valores conhecidos', () => {
  assert.equal(razao(lerCor('#fff'), lerCor('#000')).toFixed(2), '21.00');
  assert.equal(razao(lerCor('#ffffff'), lerCor('#0d6e66')).toFixed(2), '6.11');
  assert.equal(razao(lerCor('#ffffff'), lerCor('rgb(102, 102, 102)')).toFixed(2), '5.74');
  const b = lerCor('oklch(1 0 0)'); assert.ok(b.every(v => Math.round(v) === 255));
  const { pares } = paresDoDesign(readFileSync(join(raiz, 'skill/kit-frontend/assets/modelos/design.md'), 'utf8'));
  assert.ok(pares.some(p => p.nome === 'on-primary sobre primary'));
  assert.ok(pares.some(p => p.nome === 'componente button-primary' && p.fundo === '#000000'));
  const exemplo = kit('contraste', join(raiz, 'skill/kit-frontend/assets/exemplos/design.md'));
  assert.equal(exemplo.status, 0, exemplo.stdout);
});

test('o verificador reprova a tela ruim e aprova a boa', () => {
  const s = temp();
  const r = kit('verificar', RUIM, BOA, '--saida', s, '--json');
  assert.equal(r.status, 1, 'sai com 1 quando há falha');
  const [ruim, boa] = JSON.parse(r.stdout.slice(0, r.stdout.lastIndexOf('\n\nNão coberto')));
  const ids = ruim.achados.map(a => a.id);
  for (const id of ['a11y-idioma', 'a11y-h1', 'a11y-main', 'a11y-nome', 'a11y-alt', 'a11y-contraste', 'a11y-zoom', 'a11y-alvo', 'a11y-rolagem-horizontal', 'a11y-camadas-fixas', 'a11y-foco-invisivel', 'a11y-movimento', 'g-lista-suspensa-longa', 'g-tabela-sem-cabecalho', 'g-rolagem-presa', 'g-logo-em-quadrado', 'g-acoes-demais', 'g-fonte-nao-servida', 'ia-fonte-padrao', 'ia-indigo', 'ia-gradiente-roxo', 'ia-texto-gradiente', 'ia-sobrancelha', 'ia-cards-iguais', 'ia-cartao-em-cartao', 'ia-texto-cliche']) assert.ok(ids.includes(id), `faltou ${id}`);
  assert.deepEqual(boa.achados.map(a => a.id), [], 'a tela boa não tem achado');
  assert.ok(existsSync(join(boa.capturas, 'desktop.png')) && existsSync(join(boa.capturas, 'zoom.png')));
  rmSync(s, { recursive: true, force: true });
});

const lerRelatorio = r => JSON.parse(r.stdout.slice(0, r.stdout.lastIndexOf('\n\nNão coberto')));

test('a sonda de acessibilidade aponta os defeitos plantados', () => {
  const s = temp();
  const [sonda] = lerRelatorio(kit('verificar', SONDA_A11Y, '--publicos', 'pouca-leitura,surdos-libras', '--saida', s, '--json'));
  const ids = sonda.achados.map(a => a.id);
  assert.equal(sonda.achados.find(a => a.id === 'a11y-libras').nivel, 'aviso', 'sem superfície pública, Libras segue como aviso');
  const controles = ['a11y-nome', 'a11y-contraste', 'a11y-foco-invisivel', 'a11y-alvo', 'a11y-titulos'];
  const plantados = ['a11y-so-cor', 'a11y-clique-sem-semantica', 'a11y-nome-visivel', 'a11y-icone-sem-texto', 'a11y-tabindex-positivo', 'a11y-alto-contraste', 'a11y-erro-sem-ligacao', 'a11y-leitura-dificil', 'a11y-link-vago', 'a11y-alt-ruim', 'a11y-letra-200', 'a11y-espacamento', 'a11y-justificado', 'a11y-caixa-alta', 'a11y-italico-longo', 'a11y-linha-longa', 'a11y-entrelinha', 'a11y-video-legenda', 'a11y-video-sem-controle', 'a11y-libras'];
  for (const id of [...controles, ...plantados]) assert.ok(ids.includes(id), `faltou ${id}`);
  rmSync(s, { recursive: true, force: true });
});

test('a sonda de clichês aponta os looks novos', () => {
  const s = temp();
  const [sonda] = lerRelatorio(kit('verificar', SONDA_IA, '--saida', s, '--json'));
  const ids = sonda.achados.map(a => a.id);
  for (const id of ['ia-creme-terracota', 'ia-palavra-destaque', 'ia-mono-enfeite', 'ia-numeracao', 'ia-sombra-dura', 'ia-vidro', 'ia-metrica-heroi', 'ia-jornal', 'ia-pulso', 'ia-pontos-medios', 'ia-seta', 'ia-frase-de-efeito', 'ia-texto-cliche']) assert.ok(ids.includes(id), `faltou ${id}`);
  rmSync(s, { recursive: true, force: true });
});

test('a verificação guarda a prancha, o que o leitor de tela recebe e o alto contraste', () => {
  const s = temp();
  const [boa] = lerRelatorio(kit('verificar', BOA, '--saida', s, '--json'));
  for (const f of ['prancha.html', 'alto-contraste.png', 'visao-deuteranopia.png', 'visao-protanopia.png', 'visao-tritanopia.png', 'visao-achromatopsia.png', 'visao-blurredVision.png', 'leitor-de-tela.txt']) assert.ok(existsSync(join(boa.capturas, f)), f);
  const leitor = readFileSync(join(boa.capturas, 'leitor-de-tela.txt'), 'utf8');
  assert.match(leitor, /heading: Hoje, quinta/); assert.match(leitor, /button: Marcar horário/);
  assert.match(readFileSync(join(boa.capturas, 'prancha.html'), 'utf8'), /visao-deuteranopia\.png/);
  rmSync(s, { recursive: true, force: true });
});

test('alvo que não abre não vira relatório de falhas', () => {
  const s = temp();
  const ajuda = kit('verificar', '--help');
  assert.equal(ajuda.status, 0); assert.match(ajuda.stdout, /Uso: verificar/);
  const nada = kit('verificar', join(s, 'nao-existe.html'), '--saida', s);
  assert.equal(nada.status, 2); assert.match(nada.stderr, /Não achei/); assert.doesNotMatch(nada.stdout, /a11y-/);
  const opcao = kit('verificar', BOA, '--algo', '--saida', s);
  assert.equal(opcao.status, 2); assert.match(opcao.stderr, /Opção desconhecida: --algo/);
  const fora = kit('verificar', 'http://127.0.0.1:59321/', '--saida', s, '--json');
  assert.equal(fora.status, 2, 'servidor desligado não é tela com falha');
  assert.deepEqual(lerRelatorio(fora)[0].achados.map(a => a.id), ['nao-abriu']);
  rmSync(s, { recursive: true, force: true });
});

test('a verificação guarda a página inteira, além da primeira dobra', () => {
  const p = temp();
  writeFileSync(join(p, 'longa.html'), '<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0"><a href="#c" style="display:inline-block;padding:14px">Pular para o conteúdo</a><main id="c" style="height:3000px"><h1>Título</h1></main></body></html>');
  const [t] = lerRelatorio(kit('verificar', join(p, 'longa.html'), '--saida', join(p, 's'), '--json'));
  const alturaJpeg = b => { for (let i = 2; i < b.length;) { if (b[i + 1] >= 0xc0 && b[i + 1] <= 0xc2) return b.readUInt16BE(i + 5); i += 2 + b.readUInt16BE(i + 2); } return 0; };
  for (const f of ['desktop-inteira.jpg', 'celular-inteira.jpg']) assert.ok(alturaJpeg(readFileSync(join(t.capturas, f))) >= 3000, f);
  rmSync(p, { recursive: true, force: true });
});

test('foto em tira e foto esticada são apontadas; a foto boa, não', () => {
  const s = temp();
  const [sonda] = lerRelatorio(kit('verificar', SONDA_FOTOS, '--saida', s, '--json'));
  const achado = id => sonda.achados.find(a => a.id === id);
  assert.equal(achado('q-foto-cortada')?.nivel, 'falha'); assert.match(achado('q-foto-cortada').exemplos.join(), /Foto em tira/);
  assert.equal(achado('q-foto-deformada')?.nivel, 'falha'); assert.match(achado('q-foto-deformada').exemplos.join(), /Foto esticada/);
  assert.doesNotMatch(JSON.stringify(sonda.achados), /Foto boa/);
  rmSync(s, { recursive: true, force: true });
});

test('recorte forte em foto de tamanho normal é só aviso', () => {
  const p = temp();
  const foto = /src="(data:image\/png;base64,[^"]+)"/.exec(readFileSync(SONDA_FOTOS, 'utf8'))[1];
  writeFileSync(join(p, 'faixa.html'), `<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0"><a href="#c" style="display:inline-block;padding:14px">Pular para o conteúdo</a><main id="c"><h1>Título</h1><img src="${foto}" alt="Faixa" style="width:300px;height:110px;object-fit:cover"></main></body></html>`);
  const [t] = lerRelatorio(kit('verificar', join(p, 'faixa.html'), '--saida', join(p, 's'), '--json'));
  assert.equal(t.achados.find(a => a.id === 'q-foto-cortada')?.nivel, 'aviso');
  rmSync(p, { recursive: true, force: true });
});

test('página pesada: 2 MB avisa, 5 MB reprova', () => {
  const p = temp();
  const png = Buffer.from(/base64,([^"]+)"/.exec(readFileSync(SONDA_FOTOS, 'utf8'))[1], 'base64');
  const tela = nome => `<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0"><a href="#c" style="display:inline-block;padding:14px">Pular para o conteúdo</a><main id="c"><h1>Título</h1><img src="${nome}.png" alt="Foto" width="200" height="250"></main></body></html>`;
  for (const [nome, mb] of [['media', 3], ['grande', 6]]) { writeFileSync(join(p, `${nome}.png`), Buffer.concat([png, Buffer.alloc(mb * 1048576)])); writeFileSync(join(p, `${nome}.html`), tela(nome)); }
  const [media, grande] = lerRelatorio(kit('verificar', join(p, 'media.html'), join(p, 'grande.html'), '--saida', join(p, 's'), '--json'));
  assert.equal(media.achados.find(a => a.id === 'q-pagina-pesada')?.nivel, 'aviso');
  assert.equal(grande.achados.find(a => a.id === 'q-pagina-pesada')?.nivel, 'falha');
  assert.match(grande.achados.find(a => a.id === 'q-pagina-pesada').exemplos[0], /grande\.png/);
  rmSync(p, { recursive: true, force: true });
});

test('letras apertadas: aviso por padrão, falha para quem tem dificuldade de leitura', () => {
  const p = temp();
  writeFileSync(join(p, 't.html'), '<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0"><a href="#c" style="display:inline-block;padding:14px">Pular para o conteúdo</a><main id="c"><h1 style="letter-spacing:-.07em">Seu look do dia</h1><h2 style="letter-spacing:-.035em">Escolha seu look</h2><h3 style="letter-spacing:-.01em">Peças da semana</h3></main></body></html>');
  const roda = (...extra) => lerRelatorio(kit('verificar', join(p, 't.html'), '--saida', join(p, 's'), '--json', ...extra))[0].achados.find(a => a.id === 'a11y-letra-apertada');
  const padrao = roda();
  assert.equal(padrao.nivel, 'aviso'); assert.match(padrao.exemplos.join(), /Seu look do dia/); assert.doesNotMatch(padrao.exemplos.join(), /Escolha/);
  const rigor = roda('--publicos', 'dislexia');
  assert.equal(rigor.nivel, 'falha'); assert.match(rigor.exemplos.join(), /Escolha/); assert.doesNotMatch(rigor.exemplos.join(), /Peças/);
  rmSync(p, { recursive: true, force: true });
});

test('Libras é falha em site público para surdos, aviso sem esse público e some com o recurso', () => {
  const p = temp();
  const pagina = extra => `<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0"><a href="#c" style="display:inline-block;padding:14px">Pular para o conteúdo</a><main id="c"><h1>Título</h1>${extra}</main></body></html>`;
  writeFileSync(join(p, 'sem.html'), pagina(''));
  writeFileSync(join(p, 'com.html'), pagina('<div vw class="enabled"></div>'));
  const roda = (publicos, arquivo) => { writeFileSync(join(p, 'PRODUTO.md'), `- **publicos:** [${publicos}]\n- **superficie:** publica\n`); return lerRelatorio(kit('verificar', join(p, arquivo), '--saida', join(p, 's'), '--produto', join(p, 'PRODUTO.md'), '--json'))[0].achados.find(a => a.id === 'a11y-libras'); };
  assert.equal(roda('surdos-libras', 'sem.html')?.nivel, 'falha');
  assert.equal(roda('idosos', 'sem.html')?.nivel, 'aviso');
  assert.equal(roda('surdos-libras', 'com.html'), undefined);
  rmSync(p, { recursive: true, force: true });
});

test('o comparador acusa direções quase iguais e aceita as diferentes', () => {
  const iguais = kit('direcoes', join(raiz, 'ferramentas/fixtures/direcoes-iguais'));
  assert.equal(iguais.status, 1, iguais.stdout); assert.match(iguais.stdout, /composição não muda/); assert.match(iguais.stdout, /3 de 3 par/);
  const diferentes = kit('direcoes', join(raiz, 'docs/testes/2026-10-30-teste-cego/com-kit'));
  assert.equal(diferentes.status, 0, diferentes.stdout);
  const p = temp();
  writeFileSync(join(p, 'comum.css'), 'body{margin:0}'.repeat(200));
  writeFileSync(join(p, 'a.html'), '<!doctype html><html lang="pt-BR"><head><title>a</title><link rel="stylesheet" href="comum.css"></head><body><main><h1>A</h1><p>Texto.</p></main></body></html>');
  writeFileSync(join(p, 'b.html'), '<!doctype html><html lang="pt-BR"><head><title>b</title><link rel="stylesheet" href="comum.css"></head><body><div style="margin-top:900px"><section><h2 style="font-family:Georgia">B</h2></section></div></body></html>');
  writeFileSync(join(p, 'index.html'), '<!doctype html><title>comparativo</title>');
  const comum = kit('direcoes', p);
  assert.equal(comum.status, 1, comum.stdout); assert.match(comum.stdout, /CSS é comum/); assert.doesNotMatch(comum.stdout, /index/);
  assert.equal(kit('direcoes', join(p, 'nao-existe')).status, 2);
  assert.equal(kit('direcoes', join(p, 'a.html')).status, 2, 'uma direção só não compara');
  assert.equal(kit('direcoes', '--help').status, 0);
  rmSync(p, { recursive: true, force: true });
});

test('botão dentro de parágrafo é medido; link no meio da frase, não', () => {
  const p = temp();
  writeFileSync(join(p, 't.html'), '<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>:focus-visible{outline:3px solid #000}.b{height:18px;width:18px;padding:0}</style></head><body><a href="#c" style="display:inline-block;padding:14px">Pular para o conteúdo</a><main id="c"><h1>Título</h1><p>Veja <a href="#r">o regulamento completo</a> antes.</p><p><button class="b" aria-label="Fechar aviso">x</button></p></main></body></html>');
  const [t] = lerRelatorio(kit('verificar', join(p, 't.html'), '--saida', join(p, 's'), '--json'));
  const alvo = t.achados.find(a => a.id === 'a11y-alvo');
  assert.ok(alvo, 'botão de 18px dentro de <p> reprova');
  assert.deepEqual(alvo.exemplos.map(x => x.split(' ')[0]), ['Fechar']);
  rmSync(p, { recursive: true, force: true });
});

test('o público do PRODUTO.md muda o rigor', () => {
  const p = temp();
  writeFileSync(join(p, 'PRODUTO.md'), '# Produto\n\n- **publicos:** [pouca-leitura, idosos]\n- **superficie:** publica\n');
  const tela = '<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>:focus-visible{outline:3px solid #000}button{min-width:44px;min-height:44px}</style></head><body><a href="#c" style="display:inline-block;padding:14px">Pular para o conteúdo</a><main id="c"><h1>Título</h1><button aria-label="Excluir"><svg width="20" height="20" aria-hidden="true"><rect width="20" height="20"/></svg></button></main></body></html>';
  writeFileSync(join(p, 't.html'), tela);
  const ids = extra => lerRelatorio(kit('verificar', join(p, 't.html'), '--saida', join(p, 's'), '--json', ...extra))[0].achados.map(a => a.id);
  assert.ok(!ids(['--produto', join(p, 'nao-existe.md')]).includes('a11y-icone-sem-texto'), 'sem público, ícone sozinho passa');
  const comProduto = ids(['--produto', join(p, 'PRODUTO.md')]);
  assert.ok(comProduto.includes('a11y-icone-sem-texto')); assert.ok(comProduto.includes('a11y-libras'), 'superfície pública cobra Libras');
  rmSync(p, { recursive: true, force: true });
});

test('anel de foco sem contraste contra o fundo é falha', () => {
  const p = temp();
  const tela = anel => `<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>:focus-visible{outline:3px solid ${anel};outline-offset:2px}</style></head><body style="margin:0"><header style="background:#14304f;padding:16px"><a href="#c" style="display:inline-block;padding:14px;color:#fff">Pular para o conteúdo</a></header><main id="c" style="padding:24px"><h1>Título</h1><p>Texto.</p></main></body></html>`;
  writeFileSync(join(p, 'fraco.html'), tela('#b3261e'));
  writeFileSync(join(p, 'forte.html'), tela('#ffffff'));
  const r = kit('verificar', join(p, 'fraco.html'), join(p, 'forte.html'), '--saida', join(p, 's'), '--json');
  const [fraco, forte] = JSON.parse(r.stdout.slice(0, r.stdout.lastIndexOf('\n\nNão coberto')));
  assert.ok(fraco.achados.some(a => a.id === 'a11y-foco-contraste' && a.nivel === 'falha'), 'vermelho sobre marinho reprova');
  assert.ok(!forte.achados.some(a => a.id === 'a11y-foco-contraste'), 'branco sobre marinho passa');
  rmSync(p, { recursive: true, force: true });
});

test('fonte só deixa de ser aviso com o motivo em "Do\'s and Don\'ts"', () => {
  const p = temp();
  writeFileSync(join(p, 't.html'), '<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;font-family:Inter,sans-serif"><main style="padding:24px"><h1>Título</h1><p>Texto da tela para medir, com o bastante para ocupar a largura. Texto da tela para medir, com o bastante para ocupar a largura. Texto da tela para medir, com o bastante para ocupar a largura. Texto da tela para medir, com o bastante para ocupar a largura.</p><a href="#" style="display:inline-block;padding:14px">Abrir o relatório</a></main></body></html>');
  const ids = conteudo => { writeFileSync(join(p, 'DESIGN.md'), conteudo); return lerRelatorio(kit('verificar', join(p, 't.html'), '--saida', join(p, 's'), '--design', join(p, 'DESIGN.md'), '--json'))[0].achados.map(a => a.id); };
  const tokens = '---\ntypography:\n  body:\n    fontFamily: Inter\n---\n\n';
  assert.ok(ids(tokens).includes('ia-fonte-padrao'), 'citar nos tokens não basta');
  assert.ok(ids(`${tokens}## Typography\n\nUsamos Inter porque sim.\n`).includes('g-fonte-nao-servida'), 'fora de "Do\'s and Don\'ts" não conta');
  assert.ok(ids(`${tokens}## Do's and Don'ts\n\n- Usamos Inter nos títulos.\n`).includes('ia-fonte-padrao'), 'sem motivo não conta');
  assert.ok(ids(`${tokens}## Do's and Don'ts\n\n- Usamos Barlow porque a interface é densa.\n`).includes('ia-fonte-padrao'), '"interface" não aprova a Inter');
  const comMotivo = ids(`${tokens}## Do's and Don'ts\n\n- Usamos Inter porque o sistema da empresa já a serve em todas as telas.\n`);
  assert.ok(!comMotivo.includes('ia-fonte-padrao') && !comMotivo.includes('g-fonte-nao-servida'), 'com o motivo, é decisão');
  rmSync(p, { recursive: true, force: true });
});

test('fonte em local() não conta como servida; arquivo do projeto, sim', () => {
  const p = temp();
  const pagina = src => `<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>@font-face{font-family:"Marca Texto";src:${src};font-weight:100 900}body{margin:0;font-family:"Marca Texto",sans-serif}</style></head><body><a href="#c" style="display:inline-block;padding:14px">Pular para o conteúdo</a><main id="c"><h1>Título</h1></main></body></html>`;
  writeFileSync(join(p, 'local.html'), pagina('local("Georgia")'));
  writeFileSync(join(p, 'arquivo.html'), pagina(`url("${pathToFileURL(join(raiz, 'ferramentas/fixtures/fontes/public-sans-latin-wght-normal.woff2')).href}") format("woff2")`));
  const [local, arquivo] = lerRelatorio(kit('verificar', join(p, 'local.html'), join(p, 'arquivo.html'), '--saida', join(p, 's'), '--json'));
  assert.ok(local.achados.some(a => a.id === 'g-fonte-nao-servida'), 'local() é a fonte do sistema com outro nome');
  assert.ok(!arquivo.achados.some(a => a.id === 'g-fonte-nao-servida'), 'WOFF2 do projeto é servida');
  rmSync(p, { recursive: true, force: true });
});

test('herói dentro de header conta palavras; cabeçalho de navegação, não', () => {
  const p = temp();
  const muitas = 'Texto do herói para medir a primeira dobra. '.repeat(25);
  const pagina = (cabecalho, corpo) => `<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0"><a href="#c" style="display:inline-block;padding:14px">Pular para o conteúdo</a><header>${cabecalho}</header><main id="c">${corpo}</main></body></html>`;
  writeFileSync(join(p, 'heroi.html'), pagina(`<h1>Título</h1><p>${muitas}</p>`, ''));
  writeFileSync(join(p, 'barra.html'), pagina(`<p>${muitas}</p>`, '<h1>Título</h1>'));
  const [heroi, barra] = lerRelatorio(kit('verificar', join(p, 'heroi.html'), join(p, 'barra.html'), '--saida', join(p, 's'), '--json'));
  assert.ok(heroi.achados.some(a => a.id === 'g-muito-texto'), 'o texto do herói conta');
  assert.ok(!barra.achados.some(a => a.id === 'g-muito-texto'), 'header sem h1 fica fora da conta');
  rmSync(p, { recursive: true, force: true });
});

test('creme, serifa e ferrugem escura ainda são o mesmo clichê', () => {
  const p = temp();
  writeFileSync(join(p, 't.html'), '<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#f5eedf;color:#241a12"><a href="#c" style="display:inline-block;padding:14px;color:#241a12">Pular para o conteúdo</a><main id="c"><h1 style="font-family:Georgia,serif">Queijo de família</h1><a href="#x" style="display:inline-block;padding:14px;background:#8c3a13;color:#fff">Pedir</a></main></body></html>');
  const [t] = lerRelatorio(kit('verificar', join(p, 't.html'), '--saida', join(p, 's'), '--json'));
  assert.ok(t.achados.some(a => a.id === 'ia-creme-terracota'));
  rmSync(p, { recursive: true, force: true });
});

test('identificador fora de ordem não é numeração', () => {
  const p = temp();
  const pagina = numeros => `<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0"><a href="#c" style="display:inline-block;padding:14px">Pular para o conteúdo</a><main id="c"><h1>Título</h1>${numeros.map(n => `<div><span>${n}</span></div>`).join('')}</main></body></html>`;
  writeFileSync(join(p, 'ids.html'), pagina(['01', '03', '02', '04', '07', '05']));
  writeFileSync(join(p, 'seq.html'), pagina(['01', '02', '03']));
  const [ids, seq] = lerRelatorio(kit('verificar', join(p, 'ids.html'), join(p, 'seq.html'), '--saida', join(p, 's'), '--json'));
  assert.ok(!ids.achados.some(a => a.id === 'ia-numeracao'));
  assert.ok(seq.achados.some(a => a.id === 'ia-numeracao'));
  rmSync(p, { recursive: true, force: true });
});

test('botão fixo em shadow DOM: o foco de dentro conta, e o texto sob ele é apontado', () => {
  const s = temp();
  const [sonda] = lerRelatorio(kit('verificar', SONDA_CAMADA, '--saida', s, '--json'));
  const camada = sonda.achados.find(a => a.id === 'q-camada-sobre-texto');
  assert.equal(camada?.nivel, 'aviso'); assert.match(camada.exemplos.join(), /Texto que passa/); assert.ok(camada.tamanhos.includes('375x812'));
  for (const id of ['a11y-foco-invisivel', 'a11y-foco-encoberto', 'a11y-foco-contraste']) assert.ok(!sonda.achados.some(a => a.id === id), id);
  rmSync(s, { recursive: true, force: true });
});

test('botão no canto só é apontado onde rolar não tira o texto de baixo', () => {
  const p = temp();
  const pagina = fim => `<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;font:1.125rem/1.6 sans-serif"><a href="#c" style="display:inline-block;padding:14px">Pular para o conteúdo</a><main id="c" style="padding:16px${fim}"><h1>Título</h1>${'<p>Texto da página com largura inteira para encostar no botão que fica no canto da tela do celular.</p>'.repeat(14)}<p style="text-align:right">Total do pedido</p></main><a href="#n" style="position:fixed;right:16px;bottom:16px;width:96px;height:48px;background:#14304f;color:#fff;display:flex;align-items:center;justify-content:center">Novo</a></body></html>`;
  writeFileSync(join(p, 'folga.html'), pagina(';padding-bottom:96px'));
  writeFileSync(join(p, 'cobre.html'), pagina(''));
  const [folga, cobre] = lerRelatorio(kit('verificar', join(p, 'folga.html'), join(p, 'cobre.html'), '--saida', join(p, 's'), '--json'));
  assert.ok(!folga.achados.some(a => a.id === 'q-camada-sobre-texto'), 'com folga no fim, rolar resolve');
  assert.ok(cobre.achados.some(a => a.id === 'q-camada-sobre-texto'), 'sem folga, o fim da página fica coberto');
  rmSync(p, { recursive: true, force: true });
});

test('conferir-marca aprova o exemplo e reprova o que falta', () => {
  const p = temp();
  const asset = n => readFileSync(join(raiz, 'skill/kit-frontend/assets', n), 'utf8');
  const marca = () => kit('marca', p);
  assert.equal(marca().status, 2, 'sem MARCA.md');
  writeFileSync(join(p, 'MARCA.md'), asset('modelos/marca.md'));
  const modelo = marca();
  assert.equal(modelo.status, 1); assert.match(modelo.stdout, /sem preencher/);
  writeFileSync(join(p, 'MARCA.md'), asset('exemplos/marca.md'));
  const so = marca();
  assert.equal(so.status, 0, so.stdout); assert.match(so.stdout, /Ainda não há design\/marca/);
  assert.doesNotMatch(so.stdout, /arquivo do logo/, 'marca nova não precisa do arquivo');
  const comIdentidade = campo => asset('exemplos/marca.md').replace('## Público e personas', `## Identidade existente\n\n- **Onde aparece hoje:** Instagram\n${campo}\n## Público e personas`);
  writeFileSync(join(p, 'MARCA.md'), comIdentidade(''));
  assert.match(marca().stdout, /arquivo do logo/);
  writeFileSync(join(p, 'MARCA.md'), comIdentidade('- **Arquivo do logo:** pedido em 2026-10-31, não recebido\n'));
  assert.doesNotMatch(marca().stdout, /arquivo do logo/);
  writeFileSync(join(p, 'MARCA.md'), asset('exemplos/marca.md').replace(/\*\*Base:\*\* hipótese, a partir[^\n]*\n/, ''));
  assert.match(marca().stdout, /sem base/);
  writeFileSync(join(p, 'MARCA.md'), asset('exemplos/marca.md').replace(/\| Uma mão só[\s\S]*?\n\| Computador velho[^\n]*\n\| Fala como[^\n]*\n/, ''));
  assert.match(marca().stdout, /O que isso muda na tela/);
  writeFileSync(join(p, 'MARCA.md'), asset('exemplos/marca.md'));
  const pasta = join(p, 'design', 'marca'); mkdirSync(pasta, { recursive: true });
  assert.match(marca().stdout, /Falta design\/marca\/logo-positivo\.svg/);
  const logo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><path d="M0 0h10v10z"/></svg>';
  writeFileSync(join(pasta, 'logo-positivo.svg'), logo);
  writeFileSync(join(pasta, 'logo-negativo.svg'), logo.replace('<path', '<path fill="#fff"'));
  writeFileSync(join(pasta, 'icone.svg'), logo);
  writeFileSync(join(pasta, 'manual.html'), '<!doctype html><title>Manual</title>');
  const kitOk = marca();
  assert.equal(kitOk.status, 0, kitOk.stdout);
  writeFileSync(join(pasta, 'logo-positivo.svg'), '<svg viewBox="0 0 10 10"><text>Nome</text></svg>');
  const comTexto = marca();
  assert.equal(comTexto.status, 1); assert.match(comTexto.stdout, /usa <text>/);
  rmSync(p, { recursive: true, force: true });
});

test('logotipo.py gera curvas sem texto', t => {
  const fonte = 'C:/Windows/Fonts/georgia.ttf';
  const py = spawnSync('python', ['-c', 'import fontTools'], { encoding: 'utf8' });
  if (py.status !== 0 || !existsSync(fonte)) return t.skip('precisa de fonttools e de uma fonte local');
  const p = temp(), saida = join(p, 'logo.svg');
  const r = spawnSync('python', [join(raiz, 'skill/kit-frontend/scripts/logotipo.py'), fonte, 'Marmitaria São João', saida, '--cor', '#14304f'], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stderr);
  const s = readFileSync(saida, 'utf8');
  assert.match(s, /<path fill="#14304f" d="M/); assert.match(s, /viewBox="/); assert.doesNotMatch(s, /<text/);
  assert.match(s, /aria-label="Marmitaria São João"/);
  const falta = spawnSync('python', [join(raiz, 'skill/kit-frontend/scripts/logotipo.py'), fonte, '日本', join(p, 'x.svg')], { encoding: 'utf8' });
  assert.notEqual(falta.status, 0, 'avisa quando a fonte não tem o caractere');
  rmSync(p, { recursive: true, force: true });
});

test('paleta passa em qualquer cor, nos dois temas, e o contraste confirma', () => {
  const p = temp();
  for (const tema of ['claro', 'escuro']) for (const cor of ['#0e5f4b', '#b3261e', '#ffd400', '#00bcd4', '#f57c00', '#2eab5b', '#1565c0', '#6a1b9a', '#8d0de3', '#ff4655', '#111111', '#ffffff', '#a87400', '#999999', '#e91e63', '#00ff00']) {
    const r = kit('paleta', cor, '--tema', tema);
    assert.equal(r.status, 0, `${cor} ${tema}: ${r.stdout}`);
    writeFileSync(join(p, 'DESIGN.md'), `---\n${r.stdout.split(/\r?\n\r?\n/)[0]}\n---\n`);
    const c = kit('contraste', join(p, 'DESIGN.md'));
    assert.equal(c.status, 0, `${cor} ${tema}: ${c.stdout}`);
  }
  assert.match(kit('paleta', '#8d0de3').stdout, /primary: "#8d0de3"/, 'cor que passa não muda');
  const amarelo = kit('paleta', '#ffd400').stdout;
  assert.match(amarelo, /primary: "#ffd400"/); assert.doesNotMatch(amarelo, /on-primary: "#ffffff"/);
  assert.match(kit('paleta', '#0e5f4b', '--evitar', '#187a43').stdout, /pediu para evitar/);
  assert.match(kit('paleta', '#0e5f4b', '--css').stdout, /--primary: #0e5f4b;/);
  assert.equal(kit('paleta', 'azul').status, 2);
  rmSync(p, { recursive: true, force: true });
});

test('medir-referencia mede o que abre e avisa o que não abre', () => {
  const p = temp();
  const ok = kit('referencia', BOA, '--saida', p);
  assert.equal(ok.status, 0, ok.stderr); assert.match(ok.stdout, /Navalha Texto/); assert.match(ok.stdout, /#f7f3ea/);
  assert.ok(existsSync(join(p, 'tela-boa.jpg')));
  const nada = kit('referencia', join(p, 'nao-existe.html'), '--saida', p);
  assert.equal(nada.status, 2); assert.match(nada.stdout, /Não abriu/);
  rmSync(p, { recursive: true, force: true });
});

test('prompt único cabe e traz o essencial', () => {
  const t = readFileSync(join(raiz, 'dist/prompt-unico.md'), 'utf8');
  assert.ok(t.length / 3.4 < 30000, `${Math.round(t.length / 3.4)} tokens`);
  for (const x of ['G01', 'Convenção na interação', 'WCAG 2.2', 'padroes/lista-tabela', 'Tela-modelo', 'Primeiro, a superfície', 'Gerar imagem, vídeo, som e 3D']) assert.ok(t.includes(x), x);
});
