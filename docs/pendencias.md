# Pendências conhecidas

Resultado de `scripts/verificar.mjs` nos 11 exemplos dos estilos, em 30/10/2026: 9 passam sem falha.

| Exemplo | Falhas | Causa |
| --- | --- | --- |
| `app-tarefas-acessivel/catalogo`, `etapa` | Barras cobrem 55 e 59% em 320 × 256 | Sem regra de altura baixa |

Avisos continuam nos outros exemplos, como fonte comum e texto na primeira dobra. Os estilos não são a identidade de um produto: o agente troca essas escolhas pelas do `DESIGN.md`.

## Correções a fazer

1. `app-tarefas-acessivel`: trocar a paleta índigo e refazer as 165 linhas de contraste e os exemplos. Acrescentar a regra de altura baixa, o link de pular e os ícones que o próprio PRD exige.
2. `skill/kit-frontend/references/recursos/estilos.md`: tirar as ressalvas que deixaram de valer. `base-design-system`, `sistema-gestao`, `sistema-clinica-conversa` e `site-escola-idiomas` já têm versão nova, mas a tabela "O que trocar antes de usar" ainda é a anterior. Ser conservadora ali não quebra nada; só faz o agente desviar de um problema que já não existe.
3. Nova auditoria dos quatro PRDs que mudaram de versão maior. Os estáveis estão em 3.x, com auditoria da 1.0.0.

## Decisões em aberto

- **Licença:** o repositório ainda não tem. Sem ela, ninguém além do dono tem direito de uso.
- **Teste real:** só houve uma rodada, sem tela final. `references/marca/criatividade.md`, `references/recursos/bibliotecas.md`, `references/recursos/fontes.md`, a etapa de marca e o caminho de quem não tem nada não foram testados com um agente novo nem com uma pessoa sem marca. Não se sabe se o brief reduz refação.
- **Validador oficial do `DESIGN.md`:** os modelos seguem a especificação lida em 30/10/2026, mas `npx @google/design.md lint` não foi executado. O formato ainda é alpha e pode mudar.

## Antes de tornar o repositório público

Hoje ele é privado. Para abrir, revise:

- `skill/kit-frontend/references/gosto/perfil.md`: frases pessoais do dono, de projetos reais.
- `prds/app-tarefas-acessivel/prd.md`, seção 13: cita pastas e um branch internos do produto de origem, contra a regra do `CONTRIBUTING.md`.
- `docs/auditorias/`: guarda versões antigas, com nomes de clientes e caminhos da máquina do autor.
- `prds/` e `docs/pesquisa/`: citam produtos e empresas pelo nome. Confirme se pode.
- `references/gosto/perfil.md` também é a parte mais pessoal do kit: quem for usar precisa trocar pelo próprio perfil.
