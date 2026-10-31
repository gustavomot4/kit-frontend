# Relatório consolidado — auditoria dos três PRDs de frontend

> **Registro histórico.** Esta rodada examinou a versão 1.0.0 de cada documento, antes da reorganização do repositório. Os nomes de arquivo e os números de linha citados abaixo são os daquela versão, guardada como `original.md` em cada subpasta. As correções estão no `CHANGELOG.md` de cada PRD.

| Nome na época da auditoria | PRD hoje | Versão auditada |
| --- | --- | --- |
| `DESIGNSYSTEM.md` | [base-design-system](../../../prds/base-design-system/prd.md) | [original.md](base-design-system/original.md) |
| `fiskuiuxguide.md` | [site-escola-idiomas](../../../prds/site-escola-idiomas/prd.md) | [original.md](site-escola-idiomas/original.md) |
| `dental_flow_ap_clinic_CHAT_frontend_generation_prompt.md` (prompt Dental Flow) | [sistema-gestao](../../../prds/sistema-gestao/prd.md) | [original.md](sistema-gestao/original.md) |

Data: 09/10/2026. Os três documentos originais não foram alterados.

## Veredito

Nenhum dos três está pronto para ser entregue a um agente como contrato. Os três produzem telas com cara de produto real quando seguidos à risca (ver as imagens), mas cada um tem contradições internas, pelo menos uma prescrição que reprova na WCAG 2.2 AA e lacunas que obrigam o agente a decidir sozinho. Além disso, os três se contradizem entre si e nada diz qual vale quando.

| Documento | Veredito | Crítico | Alto | Médio | Baixo | Total | Decisões por omissão |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `DESIGNSYSTEM.md` | Boa filosofia e números quase todos certos; corpo, tokens, checklist e prompt não batem entre si | 2 | 12 | 26 | 16 | 56 | 34 |
| `fiskuiuxguide.md` | Bom inventário de conversão; receitas de CSS reprovam em acessibilidade e a troca de marca não funciona | 3 | 18 | 25 | 19 | 65 | 26 grupos |
| Prompt Dental Flow | O mais sólido em processo e comportamento; quase não especifica o visual | 1 | 11 | 24 | 11 | 47 | 35 |
| **Soma** | | **6** | **41** | **75** | **46** | **168** | |

"Decisões por omissão" é quantas vezes, ao montar duas telas, o documento não disse o que fazer. É a medida prática de ambiguidade: dois agentes escolheriam diferente em cada uma.

Relatórios completos, com linha, trecho e correção proposta para cada achado:

- [base-design-system/auditoria.md](base-design-system/auditoria.md)
- [site-escola-idiomas/auditoria.md](site-escola-idiomas/auditoria.md)
- [sistema-gestao/auditoria.md](sistema-gestao/auditoria.md)
- [coerencia-entre-prds.md](coerencia-entre-prds.md)

## Imagens

Marcas, nomes e dados são fictícios. Onde o documento prescreve algo errado, a imagem segue o documento mesmo assim, para mostrar o que ele produz.

| Documento | Imagem 1 | Imagem 2 |
| --- | --- | --- |
| `DESIGNSYSTEM.md` | [Landing](base-design-system/mockup-1.png) (1440 × 3003) | [Tela de ferramenta](base-design-system/mockup-2.png) (1440 × 900) |
| `fiskuiuxguide.md` | [Home](site-escola-idiomas/mockup-1.png) (1440 × 5809) | [Página de curso](site-escola-idiomas/mockup-2.png) (1440 × 4565) |
| Prompt Dental Flow | [Painel](sistema-gestao/mockup-1.png) (1366 × 768) | [Agenda](sistema-gestao/mockup-2.png) (1366 × 768) |

Cada PNG tem o HTML correspondente na mesma pasta.

O que as imagens deixam visível:

- **`DESIGNSYSTEM.md`, ferramenta:** as duas últimas linhas da tabela ("Entregue") estão quase apagadas. É o estado "resolvido" do documento, a 1,77:1.
- **Guia Fisk, home:** o asterisco de campo obrigatório some dentro da faixa vermelha (1,05:1), e os botões "Acesso", "Buscar unidade", "Recusar" e "ACEITAR" saem em Arial, porque as receitas não declaram fonte para `<button>`.
- **Dental Flow, agenda:** os blocos de horário mostram a situação das consultas só por cor da barra, contra a regra do próprio documento.

## Coerência entre os três

Detalhe em [coerencia-entre-prds.md](coerencia-entre-prds.md). Em resumo:

- O `DESIGNSYSTEM.md` se declara válido para "qualquer aplicação" (L3) e cobre vitrine e ferramenta, o mesmo terreno dos outros dois, com respostas opostas.
- O guia Fisk exige o que o `DESIGNSYSTEM.md` lista como anti-padrão: caixa alta, cartão em landing, sombra colorida, gradiente, animação de entrada, contador de vaidade, peso 700.
- Para ferramenta, `DESIGNSYSTEM.md` e Dental Flow divergem em todo controle: botão de 30–32px contra 44px, campo de 36px contra 44px, linha de 36px contra 50px, corpo de 14px contra rótulo de 16px.
- Fontes, raios e breakpoints são três conjuntos diferentes.

Falta um índice que diga o escopo de cada documento e qual prevalece quando dois se aplicam.

## `DESIGNSYSTEM.md` — principais achados

| Sev. | Linha(s) | Problema | Correção |
| --- | --- | --- | --- |
| crítico | 335 | Estado "resolvido" usa `--ink-3` com opacidade de 45–55%: 1,60 a 1,89:1 em texto de conteúdo | `--ink-2`, peso 400, sem opacidade, com rótulo por extenso |
| crítico | 316, 777 | `--ink-3` indicado para "letra miúda" com piso de 3:1. Dá 3,24 a 3,63:1; a WCAG pede 4,5 para texto pequeno. O comentário do token diz 3,9 | Reservar `--ink-3` para não-texto e texto ≥ 24px; letra miúda em `--ink-2` |
| alto | 551–556 | Chama 2,9:1 de "ilegível" e prescreve no lugar `--fill` + `--ink-3`, que dá 2,82 a 3,13:1, num rótulo que precisa "dizer o que falta" | Texto `--ink-2` sobre `--fill` (4,57 a 4,79:1) |
| alto | 338, 539, 287 | Estado crítico e link se distinguem do texto só pela cor; acento contra `--ink` dá 2,08:1. Contradiz L687 | Crítico = acento + peso 600 + rótulo; link em frase com sublinhado |
| alto | 560–565 | Borda de campo sem cor definida; `--line` (1,27:1) e `--line-2` (1,70:1) reprovam os 3:1 da 1.4.11. Não há rótulo, placeholder nem texto de erro | Borda em `--ink-3`; definir rótulo e mensagem de erro |
| alto | 484–487, 500 | Toque e hover deduzidos da largura da tela: tablet recebe alvo de 28px | `@media (pointer: coarse)` e `(hover: hover)` |
| alto | 471–480, 924, 961 | "Uma sombra só" contra cinco sombras prescritas nos componentes (L561, 592, 599, 608, 643). O script do próprio documento reprova a tela feita à risca | Lista fechada de tokens de sombra; script ignorar `inset` |
| alto | 450–453, 591–592 | Escada de raios fechada, mas o segmented manda 9px e 7px; campo "6–8" e modal "12–18" são faixas | Segmented 8/6, campo 8, modal 12 |
| alto | 133, 843, 979, 787–792 | Rampa tipográfica com 13 degraus no corpo, 8 no JSON e no prompt, 6 tokens no CSS | Uma rampa só |
| alto | 353, 815 | `.shell` só dá 980px com `box-sizing: border-box`, nunca declarado. Medido sem ele: 1024px | Declarar `border-box` nos tokens |
| alto | 971 | O prompt manda seguir `DESIGN-SYSTEM.md`; o arquivo se chama `DESIGNSYSTEM.md` | Acertar o nome |
| médio | 324–327, 764–765 | Os tokens padrão violam o aviso do próprio texto: `#FFFFFF` sobre `#FAF9F7` é um degrau de 1,05:1 | Escurecer `--paper` ou declarar a sombra obrigatória |
| médio | 879 | Afirma que Tailwind por CDN não lê configuração de tema. É falso | Corrigir o aviso |
| baixo | 168, 175, 799 | A fórmula de tracking dá −0,006em em 56px; tabela e token dizem −0,005em | Alinhar |

**O que está bom:** o princípio de subtração é aplicável de verdade; a seção 4.2 acerta os doze números de contraste; o anel de foco está correto; a tabela "três referências" (seção 10) foi a parte mais útil na hora de montar as telas.

## `fiskuiuxguide.md` — principais achados

| Sev. | Linha(s) | Problema | Correção |
| --- | --- | --- | --- |
| crítico | 258–264, 373, 434–435 | Formulário de lead coleta cinco dados pessoais sem finalidade, consentimento nem link de política; pré-matrícula coleta dado de menor sem consentimento do responsável; cinco rastreadores não condicionados ao aceite de cookies | Texto de consentimento no formulário; bloco "Responsável" com aceite; nenhuma tag antes do aceite |
| crítico | 277, 420, 158–188 | `.input:focus` remove o `outline` e deixa um anel a 1,28:1; os botões não têm estilo de foco; o "anel na cor da marca" some no footer (1,44:1) e na faixa de CTA (1,05:1) | Regra global de `:focus-visible` com anel de duas cores |
| crítico | 6, 24, 29–34, 476 | "Troque só `--brand-*`" não tem regra para derivar as seis variantes, e o branco fixo sobre a marca quebra com cor clara (amarelo: 1,43:1) | Derivação com `color-mix()`, token `--on-brand` e conferência de contraste |
| alto | 15, 457 contra 18, 335 | "Duas conversões sempre visíveis" contra header mobile "só logo + hambúrguer" | Botão compacto no header mobile ou barra fixa inferior |
| alto | 16, 431 contra 322–330, 339–351 | Busca de unidade é "função de primeira classe", mas não aparece no header nem na ordem de seções da home | Link no header e linha na tabela da home |
| alto | 83–84, 121–122, 277 | Vermelho fixo fora dos tokens em sombras e foco, incluindo `#c8102e`, que não é token | `color-mix()` a partir de `--brand` |
| alto | 247, 261, 279 | Asterisco de obrigatório em `--brand` dentro da faixa `--brand-hero`: 1,05:1 | Asterisco branco na faixa, mais `required` |
| alto | 272, 290 | Borda de input `#dee2e6`: 1,30:1 | Borda em cinza de pelo menos 3:1 |
| alto | 134, 187, 216–219 | Texto branco sobre foto sem escurecimento no hero; no tile, o título cai a 2,76:1 sobre foto clara | Escurecimento obrigatório sob o texto |
| alto | 47–51, 251 | `clamp()` com `vw` puro: o H1 não cresce com zoom de 200%; H1 e H2 ficam iguais (28px) abaixo de 700px; o título da faixa de CTA (40px fixo) fica maior que o H1 | `clamp()` com termo em `rem` |
| alto | 394, 397–401 | Carrosséis com autoplay sem pausa; o bloco de `prefers-reduced-motion` só cobre CSS, não Swiper, Lenis nem o contador | Botão de pausa; desligar por JS |
| alto | 158–173, 269–276 | Receitas de botão sem `display` nem `font-family`: como `<a>` a caixa vaza da linha, como `<button>` sai em Arial | `display: inline-flex; min-height: 44px; font: inherit` |
| médio | 58 contra 111, 140 | `--lh-body` é 1,6 no CSS e 1,7 no Tailwind e na tabela | Unificar em 1,7 |
| médio | 147 contra 50–51, 251 | "Todo título usa `clamp()`", mas H3, H4 e o título da faixa são fixos | Corrigir a regra ou os valores |
| médio | 18 contra 92 | "Mobile-first de verdade", mas todo o CSS é escrito em `max-width` | Reescrever em `min-width` ou tirar a frase |
| médio | 448 contra 456 | Carrega o peso 800, que nenhuma receita usa; o checklist exige "só os pesos usados" | Tirar o 800 |
| baixo | 414 | Diz que branco sobre `#d71920` é 4,9:1; o valor é 5,19 | Corrigir |

**O que está bom:** a arquitetura de informação do setor (segmentar por idade, modalidade explícita, unidade como primeiro passo da matrícula); o alerta sobre conteúdo que fica invisível se a animação depender de JS; os contrastes de base passam todos.

## Prompt Dental Flow — principais achados

| Sev. | Linha(s) | Problema | Correção |
| --- | --- | --- | --- |
| crítico | 8, 40, 51 | Manda anexar capturas das telas atuais e ler o repositório de um sistema de clínica, sem pedir anonimização | "Antes de anexar, troque por dados fictícios ou cubra nome, CPF, telefone, procedimento e valor" |
| alto | 13, 19, 40 | "A seção 1 prevalece" sem piso: uma cor de marca informada ali pode derrubar o contraste exigido na L108 | Ordem de precedência com acessibilidade e regras de dados acima da seção 1 |
| alto | 100, 106 | "Barra das situações" só por cor contra "situações com cor e texto, nunca só cor" | Contagem em texto no bloco; barra como reforço |
| alto | 79 | Toda a identidade visual cabe em uma frase: 6 cores, 3 raios, 1 fonte. Não há cor de situação, escala tipográfica nem regra de uso dos tokens | Completar a paleta e dizer onde cada token entra |
| alto | 79, 108 | "Destaque" `#1ed8cf` dá 1,78:1 sobre branco; "linhas" `#d8e2df` dá 1,32:1 como borda de campo. Falta o critério de 3:1 para bordas e foco | Destaque só sobre fundo escuro; borda de campo mais escura |
| alto | 77, 84, 140 | 1366 × 768 é tratado como área útil, mas é o tamanho da tela; num navegador real sobram cerca de 650px de altura | Usar a área útil como referência e recalcular as linhas por página |
| alto | 77, 83, 93, 100 | Nenhum ponto de quebra; "celular" e "tela estreita" sem largura; tablet ausente | Definir as faixas |
| alto | 100, 108 | "Cartões proporcionais à duração" contra "controles de pelo menos 44px", sem escala | Altura por meia hora e mínimo de 44px |
| médio | 77 contra 132 | 1440 × 900 na referência, 1440 × 960 nos testes | Unificar |
| médio | 10, 38 contra 42 | "Sem código" contra "protótipos estáticos em HTML e CSS" | Dizer "sem código de produção", como na L172 |
| baixo | 13, 19 contra 170 | "Seções 2 a 8" com uma seção 9 existente | Corrigir a contagem |
| baixo | 77 | Zoom de 200% dado como 720px: é metade de 1440, não de 1366 | Corrigir |

**O que está bom:** o processo em duas etapas com autorização por ação; as listas com tamanho de página definido e teste que mede; o piso de acessibilidade acima do mínimo (44px, reflow em 320px); os três pares de cor principais passam com folga (17,94, 8,98 e 8,67:1).

## Por onde começar a corrigir

1. Criar o índice com escopo e precedência dos três documentos.
2. Corrigir as seis prescrições críticas: estado "resolvido" e `--ink-3` no `DESIGNSYSTEM.md`; consentimento, foco e troca de marca no guia Fisk; anonimização no Dental Flow.
3. Resolver as contradições internas (rampa, raios e sombras no `DESIGNSYSTEM.md`; conversões no mobile e busca de unidade no guia Fisk; precedência da seção 1 no Dental Flow).
4. Preencher as omissões listadas em "Decisões que precisei tomar" de cada auditoria.

## Limites desta auditoria

- Contraste: calculado por script em todos os pares prescritos. Os números principais foram recalculados de forma independente e batem.
- Não verificado: as medições atribuídas ao apple.com e ao site da Fisk; o projeto Dental Flow original.
- Só o estado padrão em desktop foi renderizado. Hover, foco, erro, vazio, celular e zoom tiveram o contraste calculado, não visto.
- Nenhum teste com leitor de tela, teclado ou axe nos mockups, que são estáticos.
- O achado sobre LGPD no guia Fisk e no Dental Flow é leitura técnica, não parecer jurídico.
- Duas medições de um agente divergem do `DESIGNSYSTEM.md` e usaram método diferente do declarado no documento: a Inter estreita 6,61% de 14px para 48px (o texto diz 0,8%, L202) e `tabular-nums` alarga de 2,7% a 38% conforme os dígitos (o texto diz cerca de 4%, L240).
