# Coerência entre os três documentos

> **Registro histórico.** Esta rodada examinou a versão 1.0.0 de cada documento, antes da reorganização do repositório. Os nomes de arquivo e os números de linha citados abaixo são os daquela versão, guardada como `original.md` em cada subpasta. As correções estão no `CHANGELOG.md` de cada PRD.

| Nome na época da auditoria | PRD hoje | Versão auditada |
| --- | --- | --- |
| `DESIGNSYSTEM.md` | [base-design-system](../../prds/base-design-system/prd.md) | [original.md](base-design-system/original.md) |
| `fiskuiuxguide.md` | [site-escola-idiomas](../../prds/site-escola-idiomas/prd.md) | [original.md](site-escola-idiomas/original.md) |
| `dental_flow_ap_clinic_CHAT_frontend_generation_prompt.md` (prompt Dental Flow) | [sistema-gestao](../../prds/sistema-gestao/prd.md) | [original.md](sistema-gestao/original.md) |

Cada documento descreve um estilo próprio. Lidos em conjunto, eles se contradizem em quase todos os eixos, e nenhum deles diz qual vale em qual situação. O problema fica concreto porque o `DESIGNSYSTEM.md` se declara válido para "qualquer aplicação, em qualquer stack" (L3) e cobre vitrine, fluxo e ferramenta (L706–710), ou seja, o mesmo terreno do guia Fisk (vitrine) e do prompt Dental Flow (ferramenta), com respostas diferentes.

Se um agente receber dois deles ao mesmo tempo, não há como obedecer aos dois.

## Onde eles se contradizem

| Eixo | DESIGNSYSTEM.md | fiskuiuxguide.md | Dental Flow |
| --- | --- | --- | --- |
| Família tipográfica | Inter com eixo `opsz` (L112) | Montserrat (L13) | IBM Plex Sans, servida localmente (L58, L79) |
| Pesos | só 400 e 600; 500/700/800 proibidos (L215) | 400, 500, 600, 700 e 800 (L13, L448) | não define |
| Caixa alta | proibida (L224); checklist exige zero `uppercase` (L914) | usada em eyebrow (L137), botão-pílula (L179), tag (L234) e título da faixa de CTA (L251) | não define |
| Cor | neutros + **um** acento (L251) | uma marca em seis variantes (L29–34) | duas cores de ação: primária `#145453` e destaque `#1ed8cf` (L79) |
| Status | sem cor, sem badge (L331, L730) | — | "com cor e texto" (L106) e componente "etiqueta de situação" (L73) |
| Raios | `6·8·12·18·28·980`; "não existe 4, 10, 16 nem 20" (L450–453) | 6, 8, **20**, 32 (L75–78) | **10**, 14, 18 (L79) |
| Breakpoints | 734 / 1068 / 1441 "e só eles"; misturar com 767/768 "cria dois sistemas de dobra" (L376–380) | 576 / 768 / 992 / 1200 / 1400 (L314), CSS em `max-width: 767px` (L92) | 1366 e 1440 de referência, 375, 320 e 720 (L77) |
| Largura de conteúdo | 980px na vitrine (L361) | 1320px (L69) | fluida |
| Sombra | uma, ou nenhuma (L471); gradiente e sombra colorida são anti-padrão (L746) | três sombras, uma delas um brilho na cor da marca (L82–84); gradiente no tile (L216) | não define |
| Cartão em página de marketing | "não existe" (L607, L732) | cartões com sombra e hover em toda a home (L226–232) | — |
| Ritmo de seção | 96 / 104px; avisa que 110px+ quebra página curta (L400–407) | 100 / 120px (L64) | — |
| Animação de entrada | "custo, não encanto. Corte." (L673) | toda seção entra com fade + deslocamento de 50px (L388) | transições desligadas com `prefers-reduced-motion` (L108) |
| Loop / autoplay | proibido (L675) | carrosséis com autoplay (L394) | — |
| Contador de vaidade | anti-padrão (L742) | obrigatório: contador animado "+68 anos" (L347, L393) | "indicador sem definição" é armadilha (L168) |
| Alvo em mouse | 28px (L486) | 44px só citado para mobile (L413) | 44px em todo controle (L108) |
| Botão em ferramenta | 30–32px de altura (L548) | — | ≥ 44px (L108) |
| Campo em ferramenta | 36px (L560) | 44px (L270) | ≥ 44px (L108) |
| Linha de tabela | 36px no mouse (L580) | — | cerca de 50px (L83) |
| Texto em ferramenta | corpo de 14px (L710), rampa `28·17·14·12` (L142) | — | rótulos de 16px, auxiliares ≥ 14px (L108); "rótulos abaixo de 16px pioram a leitura" (L156) |
| Estado vazio | uma frase, sem ícone (L652) | não define | "vazio com a próxima ação" (L104) |
| Tailwind | permitido com restrições (L852–883) | recomendado (L97, L447) | "sem biblioteca visual pronta", CSS Modules (L58) |

## Os conflitos que mais pesam

**Densidade da ferramenta.** `DESIGNSYSTEM.md` e Dental Flow tratam o mesmo tipo de produto (painel, ERP, gestão) com medidas incompatíveis: botão de 30–32px contra 44px, campo de 36px contra 44px, linha de 36px contra 50px, corpo de 14px contra rótulo de 16px. O Dental Flow é o mais conservador em acessibilidade. Quem usar o `DESIGNSYSTEM.md` para um sistema de gestão e depois colar o prompt Dental Flow recebe duas ordens opostas sobre o tamanho de cada controle.

**Linguagem de vitrine.** O guia Fisk prescreve vários itens que o `DESIGNSYSTEM.md` lista nominalmente como anti-padrão: cartão em página de marketing, caixa alta, sombra colorida, gradiente, animação de entrada, contador de vaidade, peso 700. Não são estilos "parecidos com diferenças": um proíbe o que o outro exige.

**Breakpoints.** O `DESIGNSYSTEM.md` avisa que misturar 734/1068 com 767/768 gera bug na faixa entre eles. O guia Fisk usa exatamente 767/768.

## O que falta para o conjunto funcionar

Um arquivo de índice na raiz (por exemplo `README.md`) com três coisas:

1. **Escopo de cada documento.** Sugestão: `DESIGNSYSTEM.md` é o padrão geral; `fiskuiuxguide.md` vale apenas para site institucional de escola de idiomas e substitui o padrão geral inteiro nesse caso; o prompt Dental Flow é um roteiro de processo e arquitetura para sistemas de gestão.
2. **Precedência quando dois se aplicam.** Em especial entre `DESIGNSYSTEM.md` e Dental Flow numa ferramenta: declarar qual tabela de medidas vale (alvos, altura de linha, tamanho de rótulo). Recomendo as do Dental Flow, por serem as que atendem melhor a WCAG 2.2.
3. **Regra de exclusão.** "Nunca entregue dois destes documentos ao mesmo agente sem dizer qual prevalece."

Alternativa mais simples: retirar do `DESIGNSYSTEM.md` a pretensão de valer para tudo (L3) e dizer no topo de cada arquivo para que tipo de produto ele serve e para qual não serve.

## O que foi conferido de forma independente

Estes pontos foram verificados por cálculo ou por requisição, fora dos relatórios individuais:

- As razões de contraste afirmadas nos três documentos foram recalculadas com a fórmula de luminância relativa da WCAG. Divergências encontradas: `--ink-3` sobre branco é **3,63:1**, não 3,9 (`DESIGNSYSTEM.md` L777); branco sobre `#d71920` é **5,19:1**, não 4,9 (`fiskuiuxguide.md` L414); o anel de foco da Apple composto sobre branco dá **2,46:1**, não 2,27 (`DESIGNSYSTEM.md` L506–507; a conclusão de que reprova continua válida).
- A tabela de cores de sistema da Apple (`DESIGNSYSTEM.md` L266–274) confere em todas as nove linhas.
- A URL da Inter com `opsz` (`DESIGNSYSTEM.md` L195) responde e serve um arquivo diferente da URL sem `opsz`, como o documento afirma (L205–207).
- A URL do VLibras (`fiskuiuxguide.md` L449) responde: redireciona para o jsDelivr e entrega o script.
- A fórmula de tracking (`DESIGNSYSTEM.md` L175) dá −0,006em para 56px; a tabela (L168) e o token (L799) dizem −0,005em. Os outros três degraus conferem.

Não foi possível verificar: as medições atribuídas ao apple.com (63 arquivos `@font-face`, 164 blocos de texto, uma única sombra em 1,3 MB de CSS) e as afirmações sobre o site da Fisk. São plausíveis, mas o texto não dá como reproduzi-las.
