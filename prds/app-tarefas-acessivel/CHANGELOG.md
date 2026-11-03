# Histórico de alterações

## 2.0.0 — 2026-10-31

Correções de `docs/pendencias.md`. Os dois exemplos agora passam sem falha em `scripts/verificar.mjs`, nos três temas.

### Corrigido

- Paleta índigo e neutros padrão do Tailwind → azul-tinta (matiz 238 em OKLCH), com neutros tingidos pelo mesmo matiz: `--ui-action` `#4338ca` → `#025e88`; pressionado `#312e81` → `#014261`; suave `#eef0ff` → `#e7f3fc`; linha `#c9cdfb` → `#b1d7f1`; texto `#111827` → `#111a20`. Situações que eram padrão do Tailwind foram deslocadas 7 graus: `#b91c1c` → `#b42b01`, `#fee2e2` → `#fee2df`, `#fef3c7` → `#f9f5c8`, `#0f766e` → `#077674`, `#9d174d` → `#9f1640`.
- §9.1: as 165 linhas de contraste foram recalculadas; todas passam.
- Marca: iniciais em quadrado → nome ou logotipo, sem quadrado. O nome fica visível também abaixo de 440px.
- Ícones: caracteres como ⌂ e ◇, e um desenho aproximado → Phosphor Duotone (licença MIT), como §3.2 já pedia.

### Adicionado

- §5.2 e §5.4: regra de altura até 480px, em que barra superior, abas e rodapé de ação rolam junto.
- §5.2 e §5.4: link de pular para o conteúdo em toda tela.

### Decisões para o autor revisar

- O azul-tinta foi escolha técnica para sair do índigo, sem brief de marca. Um estilo de partida não é identidade: o `DESIGN.md` do projeto continua mandando.
- A auditoria segue pendente, e o PRD continua em rascunho.

## 1.0.0 — 2026-10-10

### Adicionado

- PRD agnóstico de aplicativo acessível orientado a tarefas, com três temas, tokens, componentes, modelos de tela e checklist de aceite.
- Receitas CSS e exemplos independentes de framework para catálogo e etapa de formulário.
- Registro da inspeção visual e dos limites da verificação.
- Inclusão no catálogo como rascunho para revisão e reutilização.
