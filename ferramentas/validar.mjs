// Confere se o repositório segue o padrão descrito em CONTRIBUTING.md.
// Uso: node ferramentas/validar.mjs
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SUPERFICIES = ['base', 'site', 'sistema', 'fluxo', 'app'];
const STATUS = ['rascunho', 'estavel', 'obsoleto'];
const CAMPOS = ['titulo', 'slug', 'versao', 'status', 'superficie', 'dominio', 'estende', 'idioma', 'acessibilidade', 'atualizado'];
const SECOES = ['Escopo', 'Como usar', 'Acessibilidade', 'Checklist de aceite'];
const MAIUSCULOS = ['README.md', 'CONTRIBUTING.md', 'CHANGELOG.md', 'LICENSE', 'LICENSE.md', 'AGENTS.md', 'SKILL.md'];
const GERADOS = [join('skill', 'kit-frontend', 'estilos'), 'dist', 'node_modules'];
const NOME_PASTA = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const NOME_ARQUIVO = /^[a-z0-9]+(-[a-z0-9]+)*(\.[a-z0-9]+)+$/;
const SLUG = new RegExp(`^(${SUPERFICIES.join('|')})-[a-z0-9]+(-[a-z0-9]+){0,2}$`);

const erros = [];
const erro = (onde, msg) => erros.push(`${onde}: ${msg}`);
const rel = caminho => relative(raiz, caminho).split(sep).join('/');
const ler = caminho => readFileSync(caminho, 'utf8').replace(/^﻿/, '');

function percorrer(pasta, visita) {
  for (const item of readdirSync(pasta, { withFileTypes: true })) {
    if (item.name.startsWith('.')) continue;
    const caminho = join(pasta, item.name);
    if (GERADOS.some(g => relative(raiz, caminho) === g)) continue;
    visita(caminho, item);
    if (item.isDirectory()) percorrer(caminho, visita);
  }
}

// 1. Nomes de arquivos e pastas
const markdowns = [];
percorrer(raiz, (caminho, item) => {
  if (item.isDirectory()) {
    if (!NOME_PASTA.test(item.name)) erro(rel(caminho), 'nome de pasta fora do padrão (minúsculas com hífen)');
    return;
  }
  if (!MAIUSCULOS.includes(item.name) && !NOME_ARQUIVO.test(item.name)) erro(rel(caminho), 'nome de arquivo fora do padrão (minúsculas com hífen)');
  if (item.name.endsWith('.md')) markdowns.push(caminho);
});

// 2. Links relativos e âncoras dos arquivos Markdown
const semCodigo = texto => texto.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
function ancoras(texto) {
  const vistas = new Map();
  const lista = new Set();
  for (const linha of texto.replace(/```[\s\S]*?```/g, '').split(/\r?\n/)) {
    const m = /^#{1,6}\s+(.*?)\s*#*\s*$/.exec(linha);
    if (!m) continue;
    const base = m[1].replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').toLowerCase()
      .replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
    const n = vistas.get(base) ?? 0;
    vistas.set(base, n + 1);
    lista.add(n ? `${base}-${n}` : base);
  }
  return lista;
}
const cacheAncoras = new Map();
const ancorasDe = caminho => {
  if (!cacheAncoras.has(caminho)) cacheAncoras.set(caminho, ancoras(ler(caminho)));
  return cacheAncoras.get(caminho);
};
for (const arquivo of markdowns) {
  const texto = semCodigo(ler(arquivo));
  for (const m of texto.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    const alvo = m[1];
    if (/^(https?:|mailto:|tel:)/.test(alvo) || alvo.startsWith('<')) continue;
    const [parte, ancora] = alvo.split('#');
    const destino = parte ? resolve(dirname(arquivo), decodeURIComponent(parte)) : arquivo;
    if (!existsSync(destino)) { erro(rel(arquivo), `link quebrado: ${alvo}`); continue; }
    if (ancora && destino.endsWith('.md') && !ancorasDe(destino).has(decodeURIComponent(ancora).toLowerCase())) {
      erro(rel(arquivo), `âncora inexistente: ${alvo}`);
    }
  }
}

// 3. Cada PRD
const pastaPrds = join(raiz, 'prds');
const slugs = existsSync(pastaPrds) ? readdirSync(pastaPrds, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name) : [];
const readme = existsSync(join(raiz, 'README.md')) ? ler(join(raiz, 'README.md')) : '';
if (!readme) erro('README.md', 'não existe');

for (const slug of slugs) {
  const pasta = join(pastaPrds, slug);
  const onde = `prds/${slug}`;
  if (!SLUG.test(slug)) erro(onde, `slug fora do formato <superficie>-<tema> (superfícies: ${SUPERFICIES.join(', ')}; tema com 1 a 3 palavras)`);
  for (const fixo of ['prd.md', 'CHANGELOG.md', 'exemplos/capa.png']) {
    if (!existsSync(join(pasta, fixo))) erro(onde, `falta ${fixo}`);
  }

  // exemplos: pares .html/.png com o mesmo nome
  const pastaEx = join(pasta, 'exemplos');
  if (existsSync(pastaEx)) {
    const arquivos = readdirSync(pastaEx).filter(n => statSync(join(pastaEx, n)).isFile());
    const htmls = arquivos.filter(n => n.endsWith('.html')).map(n => n.slice(0, -5));
    const pngs = arquivos.filter(n => n.endsWith('.png') && n !== 'capa.png').map(n => n.slice(0, -4));
    if (htmls.length < 2) erro(`${onde}/exemplos`, `tem ${htmls.length} exemplo(s); o mínimo é 2`);
    for (const n of htmls) if (!pngs.includes(n)) erro(`${onde}/exemplos`, `${n}.html sem ${n}.png`);
    for (const n of pngs) if (!htmls.includes(n)) erro(`${onde}/exemplos`, `${n}.png sem ${n}.html`);
    for (const n of arquivos) if (/^(mockup|exemplo|tela)-?\d+\./.test(n)) erro(`${onde}/exemplos`, `${n}: nomeie pelo que a tela mostra, não por número`);
  }

  if (!existsSync(join(pasta, 'prd.md'))) continue;
  const texto = ler(join(pasta, 'prd.md'));
  const fm = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(texto);
  if (!fm) { erro(`${onde}/prd.md`, 'sem cabeçalho (bloco entre --- no início do arquivo)'); continue; }
  const campos = Object.fromEntries(fm[1].split(/\r?\n/).filter(l => l.includes(':')).map(l => {
    const i = l.indexOf(':');
    return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
  }));
  const em = `${onde}/prd.md`;
  for (const c of CAMPOS) if (!campos[c]) erro(em, `cabeçalho sem o campo "${c}"`);
  for (const c of Object.keys(campos)) if (!CAMPOS.includes(c)) erro(em, `cabeçalho com campo desconhecido "${c}"`);
  if (campos.slug && campos.slug !== slug) erro(em, `slug "${campos.slug}" diferente do nome da pasta`);
  if (campos.superficie && campos.superficie !== slug.split('-')[0]) erro(em, `superficie "${campos.superficie}" diferente do prefixo do slug`);
  if (campos.status && !STATUS.includes(campos.status)) erro(em, `status "${campos.status}" inválido (${STATUS.join(', ')})`);
  if (campos.versao && !/^\d+\.\d+\.\d+$/.test(campos.versao)) erro(em, `versao "${campos.versao}" fora do formato MAIOR.MENOR.CORRECAO`);
  if (campos.atualizado && !/^\d{4}-\d{2}-\d{2}$/.test(campos.atualizado)) erro(em, `atualizado "${campos.atualizado}" fora do formato AAAA-MM-DD`);
  if (campos.idioma && campos.idioma !== 'pt-BR') erro(em, `idioma "${campos.idioma}" (esperado pt-BR)`);
  if (campos.acessibilidade && campos.acessibilidade !== 'WCAG 2.2 AA') erro(em, `acessibilidade "${campos.acessibilidade}" (esperado WCAG 2.2 AA)`);
  if (campos.estende && campos.estende !== 'nenhum' && !slugs.includes(campos.estende)) erro(em, `estende "${campos.estende}", que não é um PRD deste repositório`);

  const corpo = texto.slice(fm[0].length).replace(/```[\s\S]*?```/g, '');
  const titulos = [...corpo.matchAll(/^(#{1,6})\s+(.*?)\s*$/gm)].map(m => ({ nivel: m[1].length, texto: m[2] }));
  const h1 = titulos.filter(t => t.nivel === 1);
  if (h1.length !== 1) erro(em, `tem ${h1.length} títulos de nível 1; o esperado é 1`);
  else if (campos.titulo && h1[0].texto !== campos.titulo) erro(em, `título de nível 1 "${h1[0].texto}" diferente do campo titulo "${campos.titulo}"`);
  for (const s of SECOES) if (!titulos.some(t => t.texto.includes(s))) erro(em, `falta um título de seção com "${s}"`);

  if (existsSync(join(pasta, 'CHANGELOG.md')) && campos.versao) {
    const primeira = /^##\s+(\d+\.\d+\.\d+)(?:\s+—\s+(\d{4}-\d{2}-\d{2}))?/m.exec(ler(join(pasta, 'CHANGELOG.md')));
    if (!primeira) erro(`${onde}/CHANGELOG.md`, 'sem nenhuma versão (## MAIOR.MENOR.CORRECAO — AAAA-MM-DD)');
    else {
      if (primeira[1] !== campos.versao) erro(`${onde}/CHANGELOG.md`, `versão mais recente ${primeira[1]} diferente da versao ${campos.versao} do prd.md`);
      if (!primeira[2]) erro(`${onde}/CHANGELOG.md`, `a versão ${primeira[1]} não tem data (## ${primeira[1]} — AAAA-MM-DD)`);
      else if (campos.atualizado && primeira[2] !== campos.atualizado) erro(em, `atualizado ${campos.atualizado} diferente da data da versão mais recente no CHANGELOG (${primeira[2]})`);
    }
  }

  // catálogo: uma linha da tabela do README com o link do PRD, a versão e o status quando não é estável
  const linhas = readme.split(/\r?\n/).filter(l => l.startsWith('|') && l.includes(`](prds/${slug}/prd.md)`));
  if (linhas.length !== 1) erro('README.md', `${linhas.length} linha(s) do catálogo com o link de prds/${slug}/prd.md; o esperado é 1`);
  else {
    if (campos.versao && !linhas[0].includes(campos.versao)) erro('README.md', `a linha de ${slug} no catálogo não traz a versão ${campos.versao}`);
    if (campos.status && campos.status !== 'estavel' && !linhas[0].includes(campos.status)) erro('README.md', `a linha de ${slug} no catálogo não diz que o status é ${campos.status}`);
  }

  // estável exige auditoria guardada em auditorias/<AAAA-MM-DD>/<slug>/auditoria.md
  if (campos.status === 'estavel') {
    const pastaAud = join(raiz, 'auditorias');
    const auditado = existsSync(pastaAud) && readdirSync(pastaAud).some(d => existsSync(join(pastaAud, d, slug, 'auditoria.md')));
    if (!auditado) erro(em, 'status estavel sem auditoria em auditorias/<AAAA-MM-DD>/' + slug + '/auditoria.md');
  }
}

// 4. A skill: limites do padrão Agent Skills e referências que existem
const pastaSkill = join(raiz, 'skill', 'kit-frontend');
const skillMd = join(pastaSkill, 'SKILL.md');
if (!existsSync(skillMd)) erro('skill/kit-frontend', 'falta SKILL.md');
else {
  const t = ler(skillMd);
  const nome = /^name:\s*(.+)$/m.exec(t)?.[1].trim();
  const descricao = /^description:\s*(.+)$/m.exec(t)?.[1].trim() ?? '';
  if (nome !== 'kit-frontend') erro('SKILL.md', `name "${nome}" diferente da pasta`);
  if (!descricao || descricao.length > 1024) erro('SKILL.md', `description com ${descricao.length} caracteres (de 1 a 1024)`);
  if (t.split(/\r?\n/).length > 500) erro('SKILL.md', 'mais de 500 linhas');
  if (t.length / 3.4 > 5000) erro('SKILL.md', `cerca de ${Math.round(t.length / 3.4)} tokens (limite 5000)`);
  for (const m of t.matchAll(/`((?:references|assets|scripts)\/[\w./-]+?\.\w+)`/g)) if (!existsSync(join(pastaSkill, m[1]))) erro('SKILL.md', `cita ${m[1]}, que não existe`);
  if (!existsSync(join(pastaSkill, 'estilos'))) erro('skill/kit-frontend', 'falta estilos/: rode node bin/kit.mjs empacotar');
}

if (erros.length) {
  console.log(`${erros.length} problema(s):\n`);
  for (const e of erros) console.log(`  - ${e}`);
  process.exit(1);
}
console.log(`Tudo certo: ${slugs.length} PRD(s), ${markdowns.length} arquivo(s) Markdown, nomes, links e cabeçalhos conferidos.`);
