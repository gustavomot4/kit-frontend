## 9. Acessibilidade

**Meta da aplicação de destino: WCAG 2.2 AA.** O guia fornece pares de cor calculados e regras de implementação. A inspeção da origem não constitui uma certificação de acessibilidade de todas as jornadas.

### 9.1 Contraste calculado

As tabelas usam luminância relativa sRGB: converter cada canal para 0–1; usar `c / 12,92` quando `c <= 0,04045` e `((c + 0,055) / 1,055)^2,4` nos demais casos; combinar com pesos 0,2126, 0,7152 e 0,0722; calcular `(Lmaior + 0,05) / (Lmenor + 0,05)`.

O limite adotado é 4,5:1 para os pares de texto e 3:1 para ícone informativo, contorno de campo, foco e estado de controle. As razões são arredondadas apenas para exibição; o resultado usa o valor sem arredondamento. Nomes das categorias foram neutralizados conforme os tokens.

#### Claro

| Uso e fundo | Texto ou traço | Fundo | Razão | Critério | Resultado |
| --- | --- | --- | --- | --- | --- |
| Texto principal sobre `--ui-bg` | `#111827` | `#f4f5f8` | 16,27:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-bar` | `#111827` | `#ffffff` | 17,74:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-surface` | `#111827` | `#ffffff` | 17,74:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-surface-2` | `#111827` | `#f0f1f6` | 15,73:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-bg` | `#374151` | `#f4f5f8` | 9,45:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-bar` | `#374151` | `#ffffff` | 10,31:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-surface` | `#374151` | `#ffffff` | 10,31:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-surface-2` | `#374151` | `#f0f1f6` | 9,14:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-bg` | `#312e81` | `#f4f5f8` | 10,48:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-bar` | `#312e81` | `#ffffff` | 11,42:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-surface` | `#312e81` | `#ffffff` | 11,42:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-surface-2` | `#312e81` | `#f0f1f6` | 10,13:1 | Texto 4,5 | Passa |
| Texto de ação sobre `--ui-action-soft` | `#312e81` | `#eef0ff` | 10,09:1 | Texto 4,5 | Passa |
| Botão primário sobre `--ui-action` | `#ffffff` | `#4338ca` | 7,90:1 | Texto 4,5 | Passa |
| Destaque sobre `--ui-highlight` | `#ffffff` | `#4338ca` | 7,90:1 | Texto 4,5 | Passa |
| Opção escolhida sobre `--ui-selected` | `#312e81` | `#eef0ff` | 10,09:1 | Texto 4,5 | Passa |
| Menu escolhido sobre `--ui-tab-active` | `#4338ca` | `#eef0ff` | 6,98:1 | Texto 4,5 | Passa |
| Desabilitado sobre `--ui-disabled` | `#4b5563` | `#e5e7eb` | 6,10:1 | Texto 4,5 | Passa |
| Sucesso sobre `--ui-ok-soft` | `#0a554f` | `#d9f5ee` | 7,52:1 | Texto 4,5 | Passa |
| Aviso sobre `--ui-warn-soft` | `#7c3a03` | `#fef3c7` | 7,66:1 | Texto 4,5 | Passa |
| Erro sobre `--ui-danger-soft` | `#8f1616` | `#fee2e2` | 7,49:1 | Texto 4,5 | Passa |
| Neutro sobre `--ui-neutral-soft` | `#374151` | `#e5e7eb` | 8,33:1 | Texto 4,5 | Passa |
| Contagem sobre `--ui-count` | `#ffffff` | `#b91c1c` | 6,47:1 | Texto 4,5 | Passa |
| Contato opcional sobre `--ui-contact` | `#06281c` | `#25d366` | 7,97:1 | Texto 4,5 | Passa |
| Ícone 1 sobre `--ui-bg` | `#4338ca` | `#f4f5f8` | 7,25:1 | UI 3,0 | Passa |
| Ícone 1 sobre `--ui-surface` | `#4338ca` | `#ffffff` | 7,90:1 | UI 3,0 | Passa |
| Ícone 2 sobre `--ui-bg` | `#8a4b00` | `#f4f5f8` | 6,24:1 | UI 3,0 | Passa |
| Ícone 2 sobre `--ui-surface` | `#8a4b00` | `#ffffff` | 6,80:1 | UI 3,0 | Passa |
| Ícone 3 sobre `--ui-bg` | `#0f766e` | `#f4f5f8` | 5,02:1 | UI 3,0 | Passa |
| Ícone 3 sobre `--ui-surface` | `#0f766e` | `#ffffff` | 5,47:1 | UI 3,0 | Passa |
| Ícone 4 sobre `--ui-bg` | `#9d174d` | `#f4f5f8` | 7,23:1 | UI 3,0 | Passa |
| Ícone 4 sobre `--ui-surface` | `#9d174d` | `#ffffff` | 7,88:1 | UI 3,0 | Passa |
| Ícone neutro sobre `--ui-bg` | `#374151` | `#f4f5f8` | 9,45:1 | UI 3,0 | Passa |
| Ícone neutro sobre `--ui-surface` | `#374151` | `#ffffff` | 10,31:1 | UI 3,0 | Passa |
| Borda de campo sobre `--ui-bg` | `#7f8798` | `#f4f5f8` | 3,31:1 | UI 3,0 | Passa |
| Borda de campo sobre `--ui-surface` | `#7f8798` | `#ffffff` | 3,61:1 | UI 3,0 | Passa |
| Borda de campo sobre `--ui-surface-2` | `#7f8798` | `#f0f1f6` | 3,20:1 | UI 3,0 | Passa |
| Foco sobre `--ui-bg` | `#4338ca` | `#f4f5f8` | 7,25:1 | UI 3,0 | Passa |
| Foco sobre `--ui-bar` | `#4338ca` | `#ffffff` | 7,90:1 | UI 3,0 | Passa |
| Foco sobre `--ui-surface` | `#4338ca` | `#ffffff` | 7,90:1 | UI 3,0 | Passa |
| Foco sobre `--ui-surface-2` | `#4338ca` | `#f0f1f6` | 7,01:1 | UI 3,0 | Passa |
| Interruptor desligado sobre `--ui-toggle-off` | `#ffffff` | `#7f8798` | 3,61:1 | UI 3,0 | Passa |
| Interruptor ligado sobre `--ui-toggle-on` | `#ffffff` | `#0f766e` | 5,47:1 | UI 3,0 | Passa |
| Texto principal sobre `--ui-action-soft` | `#111827` | `#eef0ff` | 15,66:1 | Texto 4,5 | Passa |
| Texto principal sobre `--ui-ok-soft` | `#111827` | `#d9f5ee` | 15,41:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-action-soft` | `#374151` | `#eef0ff` | 9,10:1 | Texto 4,5 | Passa |
| Texto secundário sobre `--ui-ok-soft` | `#374151` | `#d9f5ee` | 8,96:1 | Texto 4,5 | Passa |
| Ação de erro sobre `--ui-bg` | `#8f1616` | `#f4f5f8` | 8,40:1 | Texto 4,5 | Passa |
| Ação de erro sobre `--ui-surface` | `#8f1616` | `#ffffff` | 9,15:1 | Texto 4,5 | Passa |
| Ação de erro sobre `--ui-surface-2` | `#8f1616` | `#f0f1f6` | 8,11:1 | Texto 4,5 | Passa |
| Foco em superfície semântica sobre `--ui-action-soft` | `#4338ca` | `#eef0ff` | 6,98:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-ok-soft` | `#4338ca` | `#d9f5ee` | 6,87:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-warn-soft` | `#4338ca` | `#fef3c7` | 7,10:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-danger-soft` | `#4338ca` | `#fee2e2` | 6,47:1 | UI 3,0 | Passa |
| Foco em superfície semântica sobre `--ui-neutral-soft` | `#4338ca` | `#e5e7eb` | 6,38:1 | UI 3,0 | Passa |
