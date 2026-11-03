// Testes do kit, sem dependências. Uso: node ferramentas/testar.mjs
// Instala em pastas temporárias e confere o verificador contra as fixtures.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, existsSync, mkdirSync, rmSync, cpSync, utimesSync } from 'node:fs';
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
const SONDA_SITE = join(raiz, 'ferramentas', 'fixtures', 'sonda-marca-e-site.html');

test('instala num projeto vazio com skill, pontes e correções', () => {
  const p = temp();
  const r = kit('instalar', p);
  assert.equal(r.status, 0, r.stderr);
  for (const f of ['.agents/skills/kit-frontend/SKILL.md', '.agents/skills/kit-frontend/references/gosto/perfil.md', '.agents/skills/kit-frontend/scripts/verificar.mjs', '.agents/skills/kit-frontend/scripts/comparar-direcoes.mjs', '.agents/skills/kit-frontend/scripts/escolha-cega.mjs', '.agents/skills/kit-frontend/scripts/prancha.mjs', '.agents/skills/kit-frontend/scripts/conferir-tokens.mjs', '.agents/skills/kit-frontend/assets/modelos/ideias.md', '.agents/skills/kit-frontend/estilos/sistema-gestao/indice.md', '.claude/skills/kit-frontend/SKILL.md', 'AGENTS.md', 'CLAUDE.md', 'design/correcoes.md']) assert.ok(existsSync(join(p, f)), f);
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

test('o comparador acusa a mesma ideia com outra pele', () => {
  const r = kit('direcoes', join(raiz, 'ferramentas/fixtures/direcoes-mesma-ideia'));
  assert.equal(r.status, 1, r.stdout);
  assert.match(r.stdout, /mesma ideia/); assert.doesNotMatch(r.stdout, /composição não muda/, 'só a ideia repete');
});

test('a escolha cega exige ideias.md, recusa direções iguais e não entrega a origem', () => {
  const p = temp(), pasta = join(p, 'design', 'direcoes'), ref = join(p, 'design', 'referencias');
  mkdirSync(pasta, { recursive: true }); mkdirSync(ref, { recursive: true });
  writeFileSync(join(ref, 'um.jpg'), 'x'); writeFileSync(join(ref, 'dois.jpg'), 'x');
  writeFileSync(join(p, 'MARCA.md'), readFileSync(join(raiz, 'skill/kit-frontend/assets/exemplos/marca.md'), 'utf8'));
  for (const f of ['a', 'b', 'c']) cpSync(join(raiz, `docs/testes/2026-10-30-teste-cego/com-kit/${f}.html`), join(pasta, `${f}.html`));
  const roda = () => spawnSync(process.execPath, [join(raiz, 'skill/kit-frontend/scripts/escolha-cega.mjs'), 'design/direcoes'], { encoding: 'utf8', cwd: p, maxBuffer: 1e8 });
  const ideias = ({ referencia = 'um.com', medida = 'design/referencias/um.jpg', refs = 2, sim = 1, extra = '' } = {}) => writeFileSync(join(pasta, 'ideias.md'), `# Ideias\n\n## Referências de fora do setor\n\n| Referência | Setor | Medida | O que levar |\n| --- | --- | --- | --- |\n| ${referencia} | Bancos | ${medida} | Número grande |\n${refs > 1 ? '| dois.com | Jogos | design/referencias/dois.jpg | Mapa como menu |\n' : ''}\n## Conceitos\n\n| Direção | Conceito | De onde veio | Parte da primeira ideia? |\n| --- | --- | --- | --- |\n| A | Conversa, mas sem bate-papo | Marca | ${sim > 0 ? 'sim' : 'não'} |\n| B | Entregador, mas sem mapa | Referência | ${sim > 1 ? 'sim' : 'não'} |\n| C | Caderno, mas que soma | Mundo do produto | não |\n${extra}`);
  assert.match(roda().stdout, /Falta .*ideias\.md/);
  assert.match(roda().stdout, /Escreva em .*primeira-ideia\.md/);
  // a primeira ideia precisa ser mais antiga que as referências e as direções
  // bem no passado: no Windows, a cópia mantém a data original das direções
  const primeira = join(pasta, 'primeira-ideia.md'), antes = new Date('2000-01-01');
  writeFileSync(primeira, 'Lista de pedidos do dia.\n');
  ideias();
  assert.match(roda().stdout, /já não é a primeira/, 'escrita por último, ela não é a primeira');
  utimesSync(primeira, antes, antes);
  writeFileSync(join(pasta, 'ideias.md'), readFileSync(join(raiz, 'skill/kit-frontend/assets/modelos/ideias.md'), 'utf8'));
  const modelo = roda();
  assert.equal(modelo.status, 1); assert.match(modelo.stdout, /Faltam referências/); assert.doesNotMatch(modelo.stdout, /primeira ideia:/);
  ideias({ refs: 1 }); assert.match(roda().stdout, /Faltam referências/);
  ideias({ referencia: 'nubank.com.br' }); assert.match(roda().stdout, /repertório do kit/);
  ideias({ medida: 'olhei o site' }); assert.match(roda().stdout, /sem medida/);
  ideias({ medida: 'erro: o site bloqueou' }); assert.doesNotMatch(roda().stdout, /sem medida/, 'o erro ao tentar vale como registro');
  ideias({ sim: 2 }); assert.match(roda().stdout, /Mais de uma direção/);
  ideias({ extra: '\nRecomendo a B.\n' }); assert.match(roda().stdout, /Tire a recomendação/);
  ideias();
  const pronto = roda();
  assert.equal(pronto.status, 0, pronto.stdout + pronto.stderr);
  const chave = JSON.parse(readFileSync(join(pasta, 'cega-chave.json'), 'utf8'));
  assert.deepEqual(Object.values(chave).sort(), ['a.html', 'b.html', 'c.html']);
  for (const letra of Object.keys(chave)) for (const f of ['primeira-dobra', 'computador-1', 'celular-primeira-dobra', 'celular-1']) assert.ok(existsSync(join(pasta, 'cega', `tela-${letra}-${f}.jpg`)), `${letra} ${f}`);
  assert.ok(!existsSync(join(pasta, 'cega', 'cega-chave.json')), 'a chave fica fora do pacote');
  const pedido = readFileSync(join(pasta, 'cega', 'pedido.md'), 'utf8');
  assert.doesNotMatch(pedido, /[abc]\.html|Conversa, mas|Entregador, mas/, 'quem escolhe não sabe qual é qual');
  assert.doesNotMatch(pedido, /nenhum pedido se perde/, 'a marca fica fora do pedido, até dizer o que viu');
  assert.match(readFileSync(join(pasta, 'cega', 'etapa-2.md'), 'utf8'), /nenhum pedido se perde/);
  for (const f of ['a', 'b', 'c']) rmSync(join(pasta, `${f}.html`));
  for (const f of ['a', 'b']) cpSync(join(raiz, `ferramentas/fixtures/direcoes-mesma-ideia/${f}.html`), join(pasta, `${f}.html`));
  const iguais = roda();
  assert.equal(iguais.status, 1); assert.match(iguais.stdout, /mesma ideia/);
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

test('o motivo tira o aviso de fonte padrão, não o de fonte que não vem do projeto', () => {
  const p = temp();
  writeFileSync(join(p, 't.html'), '<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;font-family:Inter,sans-serif"><main style="padding:24px"><h1>Título</h1><p>Texto da tela para medir, com o bastante para ocupar a largura. Texto da tela para medir, com o bastante para ocupar a largura. Texto da tela para medir, com o bastante para ocupar a largura. Texto da tela para medir, com o bastante para ocupar a largura.</p><a href="#" style="display:inline-block;padding:14px">Abrir o relatório</a></main></body></html>');
  const ids = conteudo => { writeFileSync(join(p, 'DESIGN.md'), conteudo); return lerRelatorio(kit('verificar', join(p, 't.html'), '--saida', join(p, 's'), '--design', join(p, 'DESIGN.md'), '--json'))[0].achados.map(a => a.id); };
  const tokens = '---\ntypography:\n  body:\n    fontFamily: Inter\n---\n\n';
  assert.ok(ids(tokens).includes('ia-fonte-padrao'), 'citar nos tokens não basta');
  assert.ok(ids(`${tokens}## Typography\n\nUsamos Inter porque sim.\n`).includes('ia-fonte-padrao'), 'fora de "Do\'s and Don\'ts" não conta');
  assert.ok(ids(`${tokens}## Do's and Don'ts\n\n- Usamos Inter nos títulos.\n`).includes('ia-fonte-padrao'), 'sem motivo não conta');
  assert.ok(ids(`${tokens}## Do's and Don'ts\n\n- Usamos Barlow porque a interface é densa.\n`).includes('ia-fonte-padrao'), '"interface" não aprova a Inter');
  const comMotivo = ids(`${tokens}## Do's and Don'ts\n\n- Usamos Inter porque o sistema da empresa já a serve em todas as telas.\n`);
  assert.ok(!comMotivo.includes('ia-fonte-padrao'), 'com o motivo, a fonte padrão é decisão');
  assert.ok(comMotivo.includes('g-fonte-nao-servida'), 'mas o motivo não põe a fonte no aparelho de quem usa');
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
  assert.doesNotMatch(so.stdout, /Nenhum concorrente/, 'o exemplo olhou um concorrente');
  writeFileSync(join(p, 'MARCA.md'), asset('exemplos/marca.md').replace('| Observado |', '| Não verificado |'));
  assert.match(marca().stdout, /Nenhum concorrente foi olhado/);
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

const paginaSimples = corpo => `<!doctype html><html lang="pt-BR"><head><title>t</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>:focus-visible{outline:3px solid #000}</style></head><body style="margin:0"><a href="#c" style="display:inline-block;padding:14px">Pular para o conteúdo</a>${corpo}</body></html>`;
const LOGO = pathToFileURL(join(raiz, 'ferramentas/fixtures/marca/logo.svg')).href;

test('a sonda de site aponta ação repetida e logo de cor fixa, e respeita o que foi conferido', () => {
  const s = temp();
  const [sonda] = lerRelatorio(kit('verificar', SONDA_SITE, '--saida', s, '--json'));
  const achado = id => sonda.achados.find(a => a.id === id);
  assert.equal(achado('g-acao-repetida')?.nivel, 'aviso'); assert.match(achado('g-acao-repetida').exemplos.join(), /Onde fica/);
  assert.equal(achado('a11y-logo-alto-contraste')?.nivel, 'aviso'); assert.match(achado('a11y-logo-alto-contraste').exemplos.join(), /Oficina do Teste/);
  assert.equal(achado('a11y-contraste-imagem'), undefined, 'data-conferido tira o aviso');
  rmSync(s, { recursive: true, force: true });
});

test('botão repetido pela barra fixa é apontado no celular, e a barra sai da página inteira', () => {
  const p = temp();
  writeFileSync(join(p, 't.html'), paginaSimples(`<style>.barra{display:none}@media (max-width:767px){.barra{display:block;position:fixed;left:0;right:0;bottom:0;background:#fff}}</style><main id="c"><h1>Título</h1><a href="#z" style="display:inline-block;padding:14px">Chamar no WhatsApp</a><div style="height:2500px"></div></main><div class="barra"><a href="#z" style="display:block;padding:14px">Chamar no WhatsApp</a></div>`));
  const [t] = lerRelatorio(kit('verificar', join(p, 't.html'), '--saida', join(p, 's'), '--json'));
  const repetida = t.achados.find(a => a.id === 'g-acao-repetida');
  assert.deepEqual(repetida?.tamanhos, ['375x812']); assert.match(repetida.exemplos.join(), /Chamar no WhatsApp/);
  rmSync(p, { recursive: true, force: true });
});

test('logo com versão de alto contraste e links diferentes não são apontados', () => {
  const p = temp();
  writeFileSync(join(p, 't.html'), paginaSimples(`<header><a href="#c"><picture><source media="(forced-colors: active)" srcset="${LOGO}"><img src="${LOGO}" width="160" height="32" alt="Oficina do Teste"></picture></a><a href="#a" style="padding:14px;display:inline-block">Ver</a><a href="#b" style="padding:14px;display:inline-block">Ver</a></header><main id="c"><h1>Título</h1><p>Texto.</p></main>`));
  const [t] = lerRelatorio(kit('verificar', join(p, 't.html'), '--saida', join(p, 's'), '--json'));
  for (const id of ['a11y-logo-alto-contraste', 'g-acao-repetida']) assert.ok(!t.achados.some(a => a.id === id), id);
  rmSync(p, { recursive: true, force: true });
});

test('logo com o nome em curvas não é ícone sozinho; ícone continua sendo', () => {
  const p = temp();
  writeFileSync(join(p, 't.html'), paginaSimples(`<header><a href="#c" style="display:inline-block;padding:8px"><img src="${LOGO}" width="160" height="32" alt="Oficina do Teste"></a></header><main id="c"><h1>Título</h1><button aria-label="Excluir" style="min-width:44px;min-height:44px"><svg width="20" height="20" aria-hidden="true"><rect width="20" height="20"/></svg></button></main>`));
  const [t] = lerRelatorio(kit('verificar', join(p, 't.html'), '--publicos', 'pouca-leitura', '--saida', join(p, 's'), '--json'));
  const icone = t.achados.find(a => a.id === 'a11y-icone-sem-texto');
  assert.match(icone.exemplos.join(), /Excluir/); assert.doesNotMatch(icone.exemplos.join(), /Oficina/);
  rmSync(p, { recursive: true, force: true });
});

test('G08 mede onde o texto termina, não a caixa do título', () => {
  const p = temp();
  const texto = '<h1>Privacidade</h1><h2>Dados</h2><p style="max-width:36em">Texto da página, curto o bastante para terminar na metade da tela do computador.</p><h2>Dúvidas</h2><p style="max-width:36em">Outro parágrafo, do mesmo tamanho, para a tela ter mais de três blocos.</p>';
  writeFileSync(join(p, 'colado.html'), paginaSimples(`<main id="c" style="padding:24px">${texto}</main>`));
  writeFileSync(join(p, 'centro.html'), paginaSimples(`<main id="c" style="max-width:760px;margin:0 auto;padding:24px">${texto}</main>`));
  const [colado, centro] = lerRelatorio(kit('verificar', join(p, 'colado.html'), join(p, 'centro.html'), '--saida', join(p, 's'), '--json'));
  assert.ok(colado.achados.some(a => a.id === 'g-colado-a-esquerda'), 'título largo não esconde o vazio à direita');
  assert.ok(!centro.achados.some(a => a.id === 'g-colado-a-esquerda'), 'coluna centralizada passa');
  rmSync(p, { recursive: true, force: true });
});

test('marcador com forma própria não depende só da cor', () => {
  const p = temp();
  const pagina = extra => paginaSimples(`<main id="c"><h1>Título</h1><p><span style="display:inline-block;width:16px;height:16px;background:#d3201f"></span> Para agora</p><p><span style="display:inline-block;width:16px;height:16px;background:#c77700;${extra}"></span> Vem logo</p></main>`);
  writeFileSync(join(p, 'igual.html'), pagina(''));
  writeFileSync(join(p, 'forma.html'), pagina('transform:rotate(45deg)'));
  const [igual, forma] = lerRelatorio(kit('verificar', join(p, 'igual.html'), join(p, 'forma.html'), '--saida', join(p, 's'), '--json'));
  assert.ok(igual.achados.some(a => a.id === 'a11y-so-cor'));
  assert.ok(!forma.achados.some(a => a.id === 'a11y-so-cor'));
  rmSync(p, { recursive: true, force: true });
});

test('a pasta das capturas tem o mesmo nome pelo arquivo e pelo endereço', async () => {
  const p = temp(), porta = 9700 + Math.floor(Math.random() * 90);
  const arquivo = join(p, 'index.html'); writeFileSync(arquivo, paginaSimples('<main id="c"><h1>Título</h1></main>'));
  const servidor = spawn(process.execPath, ['-e', `require('http').createServer((q,s)=>{s.setHeader('content-type','text/html;charset=utf-8');s.end(require('fs').readFileSync(${JSON.stringify(arquivo)}))}).listen(${porta})`], { stdio: 'ignore' });
  await new Promise(r => setTimeout(r, 600));
  try {
    const [porArquivo] = lerRelatorio(kit('verificar', arquivo, '--saida', join(p, 's'), '--json'));
    const [porEndereco] = lerRelatorio(kit('verificar', `http://127.0.0.1:${porta}/index.html`, '--saida', join(p, 's'), '--json'));
    const [raizDoSite] = lerRelatorio(kit('verificar', `http://127.0.0.1:${porta}/`, '--saida', join(p, 's'), '--json'));
    assert.equal(porEndereco.capturas, porArquivo.capturas); assert.equal(raizDoSite.capturas, porArquivo.capturas);
  } finally { servidor.kill(); rmSync(p, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }); }
});

test('paleta e medir-referencia recusam opção desconhecida', () => {
  const r = kit('paleta', '#0e5f4b', '--escuro');
  assert.equal(r.status, 2); assert.match(r.stderr, /Opção desconhecida: --escuro/);
  assert.equal(kit('referencia', BOA, '--algo').status, 2);
});

test('medir-referencia avisa quando uma camada cobre a primeira dobra', () => {
  const p = temp();
  writeFileSync(join(p, 'cookies.html'), '<!doctype html><html lang="pt-BR"><head><title>t</title></head><body style="margin:0"><main><h2 style="font-size:20px">Menor</h2><h1 style="font-size:90px">Maior</h1></main><div style="position:fixed;left:20%;top:20%;width:60%;height:60%;background:#fff">Este site usa cookies para funcionar melhor. Aceita?</div></body></html>');
  writeFileSync(join(p, 'limpa.html'), '<!doctype html><html lang="pt-BR"><head><title>t</title></head><body style="margin:0"><main><h1>Título</h1></main></body></html>');
  const com = kit('referencia', join(p, 'cookies.html'), '--saida', p), sem = kit('referencia', join(p, 'limpa.html'), '--saida', p);
  assert.match(com.stdout, /camada cobre 36%/); assert.match(com.stdout, /títulos: 90px/, 'o maior título vem primeiro');
  assert.doesNotMatch(sem.stdout, /camada cobre/);
  rmSync(p, { recursive: true, force: true });
});

test('conferir-tokens acusa cor e fonte fora do DESIGN.md', () => {
  const p = temp(), site = join(p, 'site'); mkdirSync(site);
  const design = join(p, 'DESIGN.md');
  writeFileSync(design, '---\ncolors:\n  primary: "#d3201f"\n  ink: "#231715"\ntypography:\n  body:\n    fontFamily: Marca Texto\n---\n');
  writeFileSync(join(site, 'a.css'), "#fade { color: #D3201F; background: #123456 }\n.x { font-family: 'Outra', serif }\n.y { font-family: 'Marca Texto', sans-serif; --fonte: 'Marca Texto', serif }\n");
  writeFileSync(join(site, 'b.html'), '<style>.z{color:rgb(1,2,3)}</style><div style="color:#abc"></div><a href="#add">x</a><path fill="#231715"/>');
  const r = kit('tokens', site, '--design', design);
  assert.equal(r.status, 1, r.stdout);
  for (const v of ['#123456', 'fonte "outra"', '#010203', '#aabbcc']) assert.ok(r.stdout.includes(v), v);
  for (const v of ['#d3201f', '#fade', '#add', '#231715', 'marca texto']) assert.ok(!r.stdout.includes(v), v);
  assert.match(r.stdout, /a\.css:1/);
  writeFileSync(join(site, 'a.css'), ".y { color: #d3201f; font-family: 'Marca Texto', sans-serif }\n");
  writeFileSync(join(site, 'b.html'), '<p style="color:#231715">x</p>');
  const ok = kit('tokens', site, '--design', design);
  assert.equal(ok.status, 0, ok.stdout);
  assert.equal(kit('tokens', join(p, 'nao-existe'), '--design', design).status, 2);
  assert.equal(kit('tokens', site, '--design', join(p, 'nao-existe.md')).status, 2);
  assert.equal(kit('tokens', '--algo').status, 2);
  rmSync(p, { recursive: true, force: true });
});

test('a prancha junta as direções num HTML e num PDF', () => {
  const p = temp(), pasta = join(p, 'direcoes'), verif = join(p, 'verificacao'); mkdirSync(pasta);
  const png = Buffer.from(/base64,([^"]+)"/.exec(readFileSync(SONDA_FOTOS, 'utf8'))[1], 'base64');
  for (const d of ['a-conversa', 'b-ficha']) writeFileSync(join(pasta, `${d}.html`), '<!doctype html><title>x</title>');
  writeFileSync(join(pasta, 'ideias.md'), '# Ideias\n\n## Conceitos\n\n| Direção | Conceito | De onde veio | Parte da primeira ideia? |\n| --- | --- | --- | --- |\n| A, Conversa | Conversa, mas com o preço | Marca | sim |\n| B, Ficha | Ficha, mas sem burocracia | Mundo | não |\n');
  const roda = () => kit('prancha', pasta, '--verificacao', verif, '--titulo', 'Três propostas de teste');
  const semCaptura = roda();
  assert.equal(semCaptura.status, 2); assert.match(semCaptura.stderr, /verificar\.mjs/);
  for (const d of ['a-conversa', 'b-ficha']) { mkdirSync(join(verif, d), { recursive: true }); for (const c of ['desktop.png', 'celular.png', 'desktop-inteira.jpg', 'celular-inteira.jpg']) writeFileSync(join(verif, d, c), png); }
  writeFileSync(join(pasta, 'notas.json'), JSON.stringify({ 'b-ficha': { assinatura: 'O carimbo', cega: 'Escolhida pelos dois' } }));
  const ok = roda();
  assert.equal(ok.status, 0, ok.stderr);
  const html = readFileSync(join(pasta, 'comparar-direcoes.html'), 'utf8');
  for (const v of ['Três propostas de teste', 'A, Conversa', 'Conversa, mas com o preço', 'O carimbo', 'Escolhida pelos dois', 'data:image/png;base64,']) assert.ok(html.includes(v), v);
  assert.doesNotMatch(html, /src="[^d]/, 'as imagens vão dentro do arquivo');
  assert.equal(readFileSync(join(pasta, 'comparar-direcoes.pdf')).subarray(0, 4).toString(), '%PDF');
  const denovo = roda();
  assert.equal(denovo.status, 0, 'a prancha não entra na lista de direções');
  assert.match(denovo.stdout, /^2 direções/);
  rmSync(p, { recursive: true, force: true });
});

test('logotipo.py aplica kerning e eixos, põe o símbolo e grava as variantes', t => {
  const py = spawnSync('python', ['-c', 'import fontTools, brotli'], { encoding: 'utf8' });
  if (py.status !== 0) return t.skip('precisa de fonttools e brotli');
  const script = join(raiz, 'skill/kit-frontend/scripts/logotipo.py'), fonte = join(raiz, 'ferramentas/fixtures/fontes/public-sans-latin-wght-normal.woff2');
  const p = temp();
  const roda = (saida, ...extra) => spawnSync('python', [script, fonte, 'AV', join(p, saida), ...extra], { encoding: 'utf8' });
  const largura = a => +/viewBox="\S+ \S+ (\S+)/.exec(readFileSync(join(p, a), 'utf8'))[1];
  assert.equal(roda('com.svg').status, 0); assert.equal(roda('sem.svg', '--sem-kerning').status, 0); assert.equal(roda('aj.svg', '--ajuste', 'A,V:-100').status, 0);
  assert.ok(largura('com.svg') < largura('sem.svg'), 'o kerning da fonte aproxima AV');
  assert.ok(largura('aj.svg') < largura('com.svg'), 'o ajuste soma ao kerning');
  assert.equal(roda('peso.svg', '--eixo', 'wght=800').status, 0);
  const eixo = roda('x.svg', '--eixo', 'opsz=96');
  assert.notEqual(eixo.status, 0); assert.match(eixo.stderr, /não tem o eixo opsz/);
  assert.notEqual(roda('x.svg', '--ajuste', 'errado').status, 0);
  writeFileSync(join(p, 'simbolo.svg'), '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 30"><path fill="#000" fill-rule="evenodd" d="M0 0H40V30H0Z"/></svg>');
  assert.notEqual(roda('logo.svg', '--variantes').status, 0, 'variantes pedem a cor');
  const v = roda('logo.svg', '--cor', '#231715', '--simbolo', join(p, 'simbolo.svg'), '--cor-simbolo', '#d3201f', '--variantes');
  assert.equal(v.status, 0, v.stderr);
  const ler = n => readFileSync(join(p, `logo-${n}.svg`), 'utf8');
  for (const n of ['positivo', 'negativo', 'sobre-marca']) { assert.doesNotMatch(ler(n), /<text/); assert.match(ler(n), /fill-rule="evenodd"/); assert.match(ler(n), /viewBox="/); }
  assert.match(ler('positivo'), /<g fill="#d3201f"/); assert.match(ler('positivo'), /<path fill="#231715"/);
  assert.match(ler('negativo'), /<path fill="#ffffff"/);
  assert.match(ler('sobre-marca'), /<g fill="#231715"/);
  rmSync(p, { recursive: true, force: true });
});

test('prompt único cabe e traz o essencial', () => {
  const t = readFileSync(join(raiz, 'dist/prompt-unico.md'), 'utf8');
  assert.ok(t.length / 3.4 < 32000, `${Math.round(t.length / 3.4)} tokens`);
  for (const x of ['G01', 'Convenção na interação', 'WCAG 2.2', 'padroes/lista-tabela', 'Tela-modelo', 'Primeiro, a superfície', 'Gerar imagem, vídeo, som e 3D']) assert.ok(t.includes(x), x);
});
