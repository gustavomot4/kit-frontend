# Progresso (para quem continuar)

Pedido: página principal da Casa Amparo (funerária, Juiz de Fora). Saída final: `entrega/tela.html`. O dono não responde a perguntas: decida, marque como provisório e siga.

Processo: `.agents/skills/kit-frontend/SKILL.md`. Onde parou fica na última linha marcada com `[ ]` abaixo.

- [x] 0. Leu SKILL.md, perfil de gosto, públicos, acessibilidade, landing, criatividade, identidade, anti-genérico
- [x] 1. PRODUTO.md
- [x] 2. MARCA.md + `node .agents/skills/kit-frontend/scripts/conferir-marca.mjs`
- [x] 3a. design/direcoes/ideias.md (primeira ideia, 2 referências medidas, 3 conceitos)
- [x] 3b. Fontes servidas pelo projeto (design/direcoes/fontes/)
- [x] 3c. Três direções em design/direcoes/*.html (cada uma com o próprio CSS)
- [x] 3d. comparar-direcoes ok (3 direções diferem); verificar.mjs nas três: 0 falha e 0 aviso (design/verificacao-direcoes/) comparar-direcoes + verificar nas três
- [x] 3e. escolha cega feita: dois agentes novos escolheram a mesma tela (R), margem leve nos dois. Chave aberta depois das respostas.
- [x] 4. DESIGN.md + contraste + kit de identidade em design/marca/
- [x] 5. entrega/tela.html
- [x] 6. verificar.mjs na tela final, olhar página inteira e prancha, relatório

Notas de passos:
- 3b: fontes baixadas com `npm pack @fontsource-variable/{figtree,newsreader,public-sans,archivo}` (OFL-1.1, só o subconjunto latino, sem rodar scripts de instalação). Estão em `design/direcoes/fontes/` com a licença de cada uma.
- Referências medidas: nubank.com.br e nhs.uk em `design/referencias/`. einstein.br bloqueou o acesso.

## Onde parou (3e): pedido de agente novo

O processo exige dois agentes novos, sem o contexto desta conversa, que só veem as imagens. Quem abriu a sessão entrega o pedido e devolve as respostas.

- Pedido a entregar: `design/direcoes/cega/pedido.md` (cada agente, um de cada vez). O primeiro grava `design/direcoes/escolha-1.md`; o segundo, `escolha-2.md` (o pedido já diz isso).
- A chave dos rótulos está em `design/direcoes/cega-chave.json`: NÃO abrir antes das duas respostas. Não foi aberta até aqui.
- Depois das respostas: abrir a chave, ver qual direção cada agente escolheu. Se discordarem, é empate: escolher uma das duas e registrar. Se ambos disserem "nenhuma", refazer as direções uma vez.
- Dono ausente: seguir com a direção escolhida e marcá-la como PROVISÓRIA no DESIGN.md. Na entrega, mostrar as direções não escolhidas.

## O que falta depois

4. DESIGN.md (modelo em assets/modelos/design.md), contraste.mjs DESIGN.md, kit de identidade em design/marca/ (logotipo tipográfico com scripts/logotipo.py e a fonte escolhida; sem foto da fachada em arquivo: não desenhar substituto; escrever design/midia.md pedindo a foto).
5. entrega/tela.html: a direção escolhida, refinada, com fontes ao lado (entrega/fontes/), JSON-LD do tipo FuneralHome sem endereço (não informado), title e description únicos.
6. verificar.mjs em entrega/tela.html (--produto PRODUTO.md --design DESIGN.md), olhar a página inteira, prancha, leitor-de-tela.txt, roteiro manual; relatório curto dizendo o que não foi verificado (sem leitor de tela real, sem pessoas, VLibras só visto no Chrome).

## Decisões já tomadas (não refazer)

- O que cada serviço inclui, endereço, nome de quem atende, formas de pagamento: não foram informados, a página não cita. Cada serviço leva a um WhatsApp com mensagem pronta perguntando o que inclui.
- Telefone: tel:+5532999990000. WhatsApp: https://wa.me/5532999990000?text=...
- VLibras: só a linha do script já mostra o botão (visto no Chrome). Ele fica na borda direita, no meio da altura: no celular o texto reserva 3,5rem à direita (o verificador acusa `q-camada-sobre-texto` sem isso).
- Barra fixa de ligar e WhatsApp no celular; vira estática com altura até 480px.
- O verificador simula letra a 200% injetando font-size no html, o que não muda as media queries em rem: layout que depende de largura mínima em rem estoura nesse teste.

## Retomada (depois da escolha cega)

- Escolha: R = direcao-b.html ("O caminho"), margem leve nos dois agentes (concordam). PROVISÓRIA: o dono não respondeu. Na entrega, mostrar as direções A e C.
- Mudanças pedidas pelos dois agentes na B, a aplicar em entrega/tela.html: número do telefone grande no painel e escrito no passo 1; botão de ligar mais perto do título (não no fim do painel); aliviar o peso do painel (tom mais quente #843143, menos largura, título menor); trocar "Você está aqui" por "Comece aqui"; tirar os círculos de "Os três serviços" e "Quer deixar tudo combinado" (não são passos); sinal de preço na primeira dobra; casinha com janela acesa junto do nome (vinda da C).
- Feito: design/marca/logo-positivo.svg, logo-negativo.svg, icone.svg, icone-negativo.svg (Newsreader 600 em curvas + casa com janela acesa; sem kerning, visto a 24 e 64px).
- Feito também: design/midia.md, DESIGN.md (contraste: 13 pares passam). Falta: entrega/tela.html (fontes e marca já copiadas para entrega/), verificar, relatório.

## Estado final (31/10/2026)

- entrega/tela.html pronta (com entrega/fontes/ e entrega/marca/). verificar.mjs: 0 falhas, 0 avisos em 1440x900, 768x1024, 375x812 e 320x256 (design/verificacao/tela/). Também olhei desktop, 768, 1100, celular, alto contraste e a página inteira.
- Direção escolhida provisoriamente: B. As outras duas (A e C) estão em design/direcoes/ para o dono poder trocar.
- Não verificado: leitor de tela real, teste com pessoas, VLibras funcionando (só o botão aparece), Safari e Firefox, a foto da fachada (não recebida).
