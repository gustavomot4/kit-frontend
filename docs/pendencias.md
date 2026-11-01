# Pendências conhecidas

Resultado de `scripts/verificar.mjs` nos 11 exemplos dos estilos, em 31/10/2026: 6 passam sem falha. O verificador ficou mais rigoroso nessa data, então parte das falhas abaixo já existia e passava despercebida. Veja o [relatório](testes/2026-10-31-fase-1/relatorio.md).

| Exemplo | Falhas | Causa provável |
| --- | --- | --- |
| `base-design-system/ferramenta` | `a11y-alto-contraste` | Campo de busca sem borda própria |
| `base-design-system/landing` | `a11y-letra-200`, `a11y-espacamento` | Maquete do produto em caixa de altura fixa |
| `sistema-clinica-conversa/agenda-semana` | `a11y-letra-200`, `a11y-espacamento`, `a11y-nome-visivel` | Consultas em células de altura proporcional ao tempo |
| `sistema-gestao/agenda` | `a11y-letra-200` | Grade de calendário com altura fixa |
| `site-escola-idiomas/home` | `a11y-letra-200`, `a11y-espacamento` | Cartões de curso com altura fixa |

Avisos continuam nos outros exemplos, como fonte comum, texto na primeira dobra e camada fixa sobre texto. Os estilos não são a identidade de um produto: o agente troca essas escolhas pelas do `DESIGN.md`.

## Correções a fazer

1. Corrigir as cinco telas acima, trocando altura fixa por `min-height` onde der. Em agenda com altura proporcional ao tempo, decidir o que fazer com a letra grande.
2. Nova auditoria dos PRDs que mudaram de versão maior. Os estáveis estão em 3.x e 4.x, com auditoria da 1.0.0, e `app-tarefas-acessivel` segue em rascunho na 2.0.0.
3. Fases 2 e 3 do plano do benchmark: gancho, integração contínua, desvio contra o `DESIGN.md`, método de direções, roteiro de estados e teste cego com origem oculta.
4. Do [teste no Codex](testes/2026-10-31-outro-agente/relatorio.md): medir links repetidos com o mesmo nome e controles repetidos por item, e repetir o teste com o kit corrigido, até a etapa 8.
5. Da [auditoria de 31/10](auditorias/2026-10-31/relatorio.md): as mudanças 1, 2, 4 a 7, 9 e 10 e as perguntas ao dono. Da mudança 8, só falta o desvio contra o `DESIGN.md` ([o que já foi feito](testes/2026-10-31-correcoes-verificador/relatorio.md)).
6. Da [mudança 3](testes/2026-10-31-ritual-completo/relatorio.md): repetir o ritual com as correções, em mais briefs e com controle sem kit. Conferir o gesto de "linha com marcos", que apareceu em 3 de 3 telas, e o possível falso alarme de `a11y-letra-200` com media queries em `rem`.

## Decisões em aberto

- **Licença:** o repositório ainda não tem. Sem ela, ninguém além do dono tem direito de uso.
- **Teste real:** houve duas rodadas, nenhuma até a tela final: a segunda, no Codex, parou na escolha da direção. `references/marca/criatividade.md`, `references/recursos/bibliotecas.md`, `references/recursos/fontes.md`, a etapa de marca e o caminho de quem não tem nada não foram testados com um agente novo nem com uma pessoa sem marca. O mesmo vale para `references/qualidade/publicos.md` e `references/padroes/midia-e-libras.md`, que também não passaram por pessoas surdas, cegas, daltônicas ou com pouca leitura. Não se sabe se o brief reduz refação.
- **Validador oficial do `DESIGN.md`:** os modelos seguem a especificação lida em 30/10/2026, mas `npx @google/design.md lint` não foi executado. O formato ainda é alpha e pode mudar.

## Antes de tornar o repositório público

Hoje ele é privado. Para abrir, revise:

- `skill/kit-frontend/references/gosto/perfil.md`: frases pessoais do dono, de projetos reais.
- `prds/app-tarefas-acessivel/prd.md`, seção 13: cita pastas e um branch internos do produto de origem, contra a regra do `CONTRIBUTING.md`.
- `docs/auditorias/`: guarda versões antigas, com nomes de clientes e caminhos da máquina do autor.
- `prds/` e `docs/pesquisa/`: citam produtos e empresas pelo nome. Confirme se pode.
- `references/gosto/perfil.md` também é a parte mais pessoal do kit: quem for usar precisa trocar pelo próprio perfil.
