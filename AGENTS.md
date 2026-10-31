# Instruções para agentes que trabalham neste repositório

Este repositório é o **kit**, não um produto. O que é instalado nos projetos fica em `skill/kit-frontend/`. Para usar o kit num produto, siga `skill/kit-frontend/SKILL.md`.

## Antes de mudar

- `skill/kit-frontend/estilos/` e `dist/` são gerados. Edite `prds/` ou `skill/kit-frontend/references/` e rode `node bin/kit.mjs empacotar`.
- `references/gosto/perfil.md` guarda frases e decisões do dono. Regra nova ali precisa de evidência: a frase e a data. Não invente preferência.
- Padrão novo em `references/padroes/` diz de onde veio. Lido na fonte vai para `docs/pesquisa/benchmark.md`; o resto é marcado como observação. Escreva com suas palavras: não copie texto de terceiros.
- `SKILL.md` fica abaixo de 5 mil tokens e 500 linhas. Detalhe vai para `references/`, a um nível de distância.
- Checagem nova no verificador ganha caso em `ferramentas/fixtures/` e em `ferramentas/testar.mjs`.
- Fixture boa não pode ter falha nem aviso; se uma checagem pegar a fixture boa, corrija a checagem.

## Antes de concluir

```bash
node bin/kit.mjs empacotar
```

```bash
node ferramentas/validar.mjs
```

```bash
node ferramentas/testar.mjs
```

Relate o resultado real de cada um. Este repositório não tem commit nem publicação automática: só com autorização.
