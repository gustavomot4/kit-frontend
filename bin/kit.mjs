#!/usr/bin/env node
// CLI do kit: instalar num projeto, atualizar, verificar telas, calcular contraste, coletar correções e empacotar.
// Sem dependências. Uso: node bin/kit.mjs ajuda
import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync, rmSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative, sep } from 'node:path';
import { homedir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const NOME = 'kit-frontend';
const origem = join(raiz, 'skill', NOME);
const versao = /version:\s*"([^"]+)"/.exec(readFileSync(join(origem, 'SKILL.md'), 'utf8'))?.[1] ?? '0.0.0';
const [comando = 'ajuda', ...resto] = process.argv.slice(2);
const opcao = n => { const i = resto.indexOf(n); if (i < 0) return null; const v = resto[i + 1]; resto.splice(i, 2); return v; };
const marca = n => { const i = resto.indexOf(n); if (i < 0) return false; resto.splice(i, 1); return true; };
const escrever = (c, t) => { mkdirSync(dirname(c), { recursive: true }); writeFileSync(c, t); };
const INICIO = `<!-- ${NOME}:inicio -->`, FIM = `<!-- ${NOME}:fim -->`;

// Aviso curto para os arquivos de instrução que cada agente lê sempre
const aviso = caminho => `${INICIO}
## Frontend

Para qualquer trabalho de interface (tela, página, componente, visual, UI, UX), siga \`${caminho}/SKILL.md\` antes de escrever código. Ele define o processo, os portões de aprovação, o gosto do dono e a verificação obrigatória. \`design/correcoes.md\` e \`DESIGN.md\` deste projeto prevalecem sobre ele, menos no piso de acessibilidade.
${FIM}
`;
// Skill mínima para agentes que só procuram na própria pasta: aponta para a cópia única
const descricao = /description:\s*(.+)/.exec(readFileSync(join(origem, 'SKILL.md'), 'utf8'))[1];
const ponte = caminho => `---\nname: ${NOME}\ndescription: ${descricao}\n---\n\nLeia e siga \`${caminho}/SKILL.md\`. Os caminhos citados lá são relativos a essa pasta.\n`;

// Onde cada agente procura. pasta: sinal de que o agente é usado no projeto.
const PONTES_PROJETO = [
  { agente: 'claude', sempre: true, skill: `.claude/skills/${NOME}/SKILL.md`, instrucao: 'CLAUDE.md' },
  { agente: 'cursor', pasta: '.cursor', skill: `.cursor/skills/${NOME}/SKILL.md`, regra: { arquivo: `.cursor/rules/${NOME}.mdc`, cabecalho: `---\ndescription: Trabalho de frontend, UI e UX\nglobs: ["**/*.{tsx,jsx,vue,svelte,astro,html,css,scss}"]\nalwaysApply: false\n---\n\n` } },
  { agente: 'copilot', pasta: '.github', skill: `.github/skills/${NOME}/SKILL.md`, instrucao: '.github/copilot-instructions.md' },
  { agente: 'gemini', pasta: '.gemini', skill: `.gemini/skills/${NOME}/SKILL.md` },
  { agente: 'windsurf', pasta: '.windsurf', regra: { arquivo: `.windsurf/rules/${NOME}.md`, cabecalho: '' } },
  { agente: 'cline', pasta: '.clinerules', regra: { arquivo: `.clinerules/${NOME}.md`, cabecalho: '' } },
];
const PONTES_GLOBAIS = ['.claude/skills', '.codex/skills', '.gemini/skills', '.copilot/skills', '.cursor/skills'];

function comBloco(arquivo, bloco, cabecalho = '') {
  if (!existsSync(arquivo)) { escrever(arquivo, cabecalho + bloco); return 'criado'; }
  const atual = readFileSync(arquivo, 'utf8');
  if (atual.includes(INICIO)) {
    const novo = atual.replace(new RegExp(`${INICIO}[\\s\\S]*?${FIM}\\r?\\n?`), bloco);
    if (novo === atual) return 'igual';
    writeFileSync(arquivo, novo); return 'atualizado';
  }
  writeFileSync(arquivo, atual.replace(/\s*$/, '\n\n') + bloco);
  return 'acrescentado';
}

function copiarSkill(destino) {
  rmSync(destino, { recursive: true, force: true });
  cpSync(origem, destino, { recursive: true });
  escrever(join(destino, '.kit.json'), JSON.stringify({ versao, origem: raiz, instalado: new Date().toISOString().slice(0, 10) }, null, 2) + '\n');
}

function instalar() {
  const global = marca('--global');
  const pedidos = opcao('--agentes');
  const inicio = opcao('--home') || homedir();
  if (global) {
    const canonica = join(inicio, '.agents', 'skills', NOME);
    copiarSkill(canonica);
    console.log(`  skill em ${canonica}`);
    for (const p of PONTES_GLOBAIS) { escrever(join(inicio, p, NOME, 'SKILL.md'), ponte(canonica.split(sep).join('/'))); console.log(`  ponte em ${join(p, NOME)}`); }
    console.log(`\nInstalado para todos os projetos desta máquina (versão ${versao}).`);
    return;
  }
  const destino = resolve(opcao('--destino') || resto[0] || '.');
  if (!existsSync(destino) || !statSync(destino).isDirectory()) { console.error(`Pasta não existe: ${destino}`); process.exit(2); }
  const relativa = `.agents/skills/${NOME}`;
  copiarSkill(join(destino, relativa));
  console.log(`  skill em ${relativa}`);
  console.log(`  AGENTS.md: ${comBloco(join(destino, 'AGENTS.md'), aviso(relativa))}`);
  const todos = pedidos === 'todos', lista = pedidos && !todos ? pedidos.split(',') : null;
  for (const p of PONTES_PROJETO) {
    const quer = lista ? lista.includes(p.agente) : todos || p.sempre || existsSync(join(destino, p.pasta));
    if (!quer) continue;
    if (p.skill) { escrever(join(destino, p.skill), ponte(relativa)); console.log(`  ${p.agente}: ${p.skill}`); }
    if (p.instrucao) console.log(`  ${p.agente}: ${p.instrucao} ${comBloco(join(destino, p.instrucao), aviso(relativa))}`);
    if (p.regra) console.log(`  ${p.agente}: ${p.regra.arquivo} ${comBloco(join(destino, p.regra.arquivo), aviso(relativa), p.regra.cabecalho)}`);
  }
  // o que é do projeto nunca é sobrescrito
  const correcoes = join(destino, 'design', 'correcoes.md');
  if (!existsSync(correcoes)) { escrever(correcoes, readFileSync(join(origem, 'assets', 'modelos', 'correcoes.md'), 'utf8')); console.log('  design/correcoes.md criado'); }
  const ignorar = join(destino, '.gitignore');
  if (existsSync(ignorar) && !readFileSync(ignorar, 'utf8').includes('design/verificacao')) { writeFileSync(ignorar, readFileSync(ignorar, 'utf8').replace(/\s*$/, '\n') + '\n# capturas do verificador\ndesign/verificacao/\n'); console.log('  .gitignore: design/verificacao/'); }
  console.log(`\nInstalado (versão ${versao}). Peça ao agente qualquer tarefa de frontend; ele começa por ${relativa}/SKILL.md.`);
}

function delegar(script) {
  const r = spawnSync(process.execPath, [join(origem, 'scripts', script), ...resto], { stdio: 'inherit' });
  process.exit(r.status ?? 2);
}

function coletar() {
  const projeto = resolve(resto[0] || '.');
  const arquivo = join(projeto, 'design', 'correcoes.md');
  if (!existsSync(arquivo)) { console.error(`Não achei ${arquivo}`); process.exit(2); }
  const nome = projeto.split(sep).pop();
  const novas = readFileSync(arquivo, 'utf8').split(/\r?\n/).filter(l => /^- \d{4}-\d{2}-\d{2} \|/.test(l));
  const destino = join(origem, 'references', 'gosto', 'correcoes-coletadas.md');
  const atual = readFileSync(destino, 'utf8');
  const inedita = novas.filter(l => !atual.includes(l.slice(2)));
  if (inedita.length) writeFileSync(destino, atual.replace(/\s*$/, '\n') + inedita.map(l => `${l} | origem: ${nome}`).join('\n') + '\n');
  console.log(`${inedita.length} correção(ões) nova(s) de ${nome}; ${novas.length - inedita.length} já estavam. Instale de novo nos projetos para que recebam.`);
}

// Divide cada PRD em arquivos por seção: o agente carrega só o que a tarefa pede
function gerarEstilos() {
  const saida = join(origem, 'estilos');
  rmSync(saida, { recursive: true, force: true });
  const tokens = t => Math.round(t.length / 3.4);
  const slug = t => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 44) || 'secao';
  for (const s of readdirSync(join(raiz, 'prds'), { withFileTypes: true }).filter(i => i.isDirectory()).map(i => i.name)) {
    const texto = readFileSync(join(raiz, 'prds', s, 'prd.md'), 'utf8').replace(/\r\n/g, '\n');
    const corpo = texto.replace(/^---\n[\s\S]*?\n---\n/, '');
    const partes = []; let atual = { titulo: 'Abertura', linhas: [] }, cerca = false;
    for (const l of corpo.split('\n')) {
      if (/^(```|~~~)/.test(l)) cerca = !cerca;
      if (!cerca && /^#{2,4} /.test(l) && (l.startsWith('## ') || tokens(atual.linhas.join('\n')) > 700)) { partes.push(atual); atual = { titulo: l.replace(/^#+\s*/, ''), linhas: [] }; }
      atual.linhas.push(l);
    }
    partes.push(atual);
    const pasta = join(saida, s); mkdirSync(pasta, { recursive: true });
    const indice = [`# Índice do estilo ${s}`, '', 'Gerado de `prds/' + s + '/prd.md` por `kit empacotar`. Não edite aqui. Abra só o que a tarefa pede e confira as ressalvas em `references/recursos/estilos.md`.', '', '| Seção | Arquivo | Tokens |', '| --- | --- | --- |'];
    partes.filter(p => p.linhas.join('').trim()).forEach((p, i) => {
      const nome = `${String(i).padStart(2, '0')}-${slug(p.titulo)}.md`, t = p.linhas.join('\n').trim() + '\n';
      writeFileSync(join(pasta, nome), t);
      indice.push(`| ${p.titulo.replace(/\|/g, '/')} | \`${nome}\` | ${tokens(t)} |`);
    });
    const ex = join(raiz, 'prds', s, 'exemplos');
    const htmls = readdirSync(ex).filter(n => n.endsWith('.html'));
    mkdirSync(join(pasta, 'exemplos'), { recursive: true });
    htmls.forEach(n => cpSync(join(ex, n), join(pasta, 'exemplos', n)));
    indice.push('', `Exemplos em HTML: ${htmls.map(n => '`exemplos/' + n + '`').join(', ')}. Eles mostram estrutura; foram medidos e têm falhas conhecidas (ver \`references/recursos/estilos.md\`).`, '');
    writeFileSync(join(pasta, 'indice.md'), indice.join('\n'));
  }
}

// Um arquivo único para LLM sem acesso a arquivos, e um índice para quem lê da web
function empacotar() {
  gerarEstilos();
  const dist = join(raiz, 'dist'); mkdirSync(dist, { recursive: true });
  const ler = n => readFileSync(join(origem, n), 'utf8').replace(/\r\n/g, '\n');
  const skill = ler('SKILL.md').replace(/^---\n[\s\S]*?\n---\n/, '');
  const todasRefs = readdirSync(join(origem, 'references'), { recursive: true }).map(n => String(n).split(sep).join('/')).filter(n => n.endsWith('.md')).sort();
  const refs = todasRefs.filter(n => n !== 'recursos/estilos.md' && n !== 'gosto/correcoes-coletadas.md').sort((a, b) => (a === 'gosto/perfil.md' ? -1 : b === 'gosto/perfil.md' ? 1 : a.localeCompare(b)));
  const blocos = [`# Kit de frontend (versão ${versao}): prompt único`, '', 'Cole este arquivo numa conversa com qualquer LLM. Tudo o que o texto cita em `references/` está incluído abaixo. Sem acesso a arquivos ou terminal, a resposta entrega o HTML e os comandos e diz o que não pôde executar. Os estilos de partida e os scripts ficam no repositório.', '', skill, ...refs.map(n => `\n---\n\n<!-- references/${n} -->\n\n${ler('references/' + n)}`), `\n---\n\n<!-- assets/modelos/design.md -->\n\n\`\`\`markdown\n${ler('assets/modelos/design.md')}\`\`\`\n`, `\n<!-- assets/modelos/produto.md -->\n\n\`\`\`markdown\n${ler('assets/modelos/produto.md')}\`\`\`\n`, `\n<!-- assets/modelos/marca.md -->\n\n\`\`\`markdown\n${ler('assets/modelos/marca.md')}\`\`\`\n`];
  const unico = blocos.join('\n');
  writeFileSync(join(dist, 'prompt-unico.md'), unico);
  const ll = [`# Kit de frontend`, '', '> Identidade própria, padrões de mercado e acessibilidade verificada para agentes que criam frontend.', '', '## Comece aqui', '- [SKILL.md](../skill/kit-frontend/SKILL.md): processo e portões', '- [Prompt único](prompt-unico.md): tudo em um arquivo, para LLM sem acesso a arquivos', '', '## Referências', ...todasRefs.map(n => `- [${n}](../skill/kit-frontend/references/${n})`), ''];
  writeFileSync(join(dist, 'llms.txt'), ll.join('\n'));
  console.log(`estilos gerados em ${relative(raiz, join(origem, 'estilos'))}; dist/prompt-unico.md com cerca de ${Math.round(unico.length / 3.4 / 1000)} mil tokens`);
}

const AJUDA = `kit-frontend ${versao}

  instalar [pasta]            instala no projeto (padrão: pasta atual)
      --agentes claude,cursor,copilot,gemini,windsurf,cline | todos
      --global                instala para todos os projetos desta máquina
  atualizar [pasta]           igual a instalar; nunca toca em DESIGN.md, PRODUTO.md nem design/correcoes.md
  verificar <url|arquivo>     audita telas em 4 tamanhos e para outros públicos; --publicos a,b; sai com 1 se houver falha
  contraste <a> <b>           razão entre duas cores; ou contraste DESIGN.md
  marca [pasta]               confere se MARCA.md e design/marca/ estão completos
  paleta <cor>                gera paleta completa com contraste calculado; --tema escuro, --evitar, --css
  referencia <url|arquivo>    mede fontes, escala, cores e raios de páginas de que a pessoa gosta
  direcoes <pasta|arquivos>   compara as direções visuais; sai com 1 se duas forem quase iguais
  coletar <pasta>             traz as correções de um projeto para o kit
  empacotar                   gera estilos/ por seção e dist/prompt-unico.md
`;
switch (comando) {
  case 'instalar': case 'atualizar': instalar(); break;
  case 'verificar': delegar('verificar.mjs'); break;
  case 'contraste': delegar('contraste.mjs'); break;
  case 'marca': delegar('conferir-marca.mjs'); break;
  case 'paleta': delegar('paleta.mjs'); break;
  case 'referencia': delegar('medir-referencia.mjs'); break;
  case 'direcoes': delegar('comparar-direcoes.mjs'); break;
  case 'coletar': coletar(); break;
  case 'empacotar': empacotar(); break;
  default: console.log(AJUDA);
}
