# Progresso (para outro agente continuar)

Dono ausente ("decide você e segue"): os portões não param; as escolhas são provisórias e vão marcadas no DESIGN.md.

- [x] Leitura: SKILL.md, perfil.md, correcoes-coletadas.md (vazio), design/correcoes.md (vazio)
- [x] Etapa 1: PRODUTO.md
- [x] Etapa 2: MARCA.md (brief curto; conferir-marca só reclama do logo, que vem na etapa 4)
- [x] Fontes WOFF2 em design/marca/fontes/ (Atkinson Hyperlegible Next, Big Shoulders Display, Public Sans, Bricolage Grotesque). .tmp-npm/ é descartável: apagar no fim
- [ ] Etapa 3: três direções em design/direcoes/ (a-cardapio, b-regua, c-rota) + comparar-direcoes + verificar
      Plano: A = familiar (pano + tinta marrom + ouro, Atkinson); B = própria (ouro-casca em área grande, "régua da cura" 21/45/90, Big Shoulders + Public Sans);
      C = inesperada (azul-serra, rota São Roque -> BH/SP, Bricolage). Recomendação: B com a clareza de preço em linhas da A e a rota da C
- [ ] Etapa 4: DESIGN.md + tokens + contraste + kit de marca em design/marca/ (marca de ferro = anel em C com V dentro)
- [ ] Etapa 5/6: entrega/tela.html (+ entrega/fontes, entrega/*.svg)
- [ ] Etapa 7: verificar.mjs em entrega/tela.html, olhar página inteira
- [ ] Relatório final (até 10 linhas) via SubagentHandback
Fatos que NÃO podem ser inventados: número do registro IMA, frete, pagamento, horário limite do pedido, endereço, fotos, depoimentos.

## Atualização (etapa 3)
- Escritos: design/direcoes/a-cardapio.html, b-regua.html, c-rota.html (capturas rápidas em .tmp-shots/, descartável). Os três renderizam.
- Falta: comparar-direcoes, verificar nas três (--saida design/direcoes/verificacao-a etc.), corrigir falhas, gravar capturas finais em design/direcoes/capturas/
- Etapa 3 feita: comparar-direcoes OK ("As 3 direções diferem"); verificar: A 0/0, B 0 falhas + 1 aviso (contraste sobre listras da semana, medido à mão: ok), C 0/0. Capturas em design/direcoes/verificacao-*/*/ (desktop.png, celular.png, *-inteira.jpg).
- VLibras: o script único cria um shadow DOM; o verificador acusava foco no host. Solução: contêiner #vlibras-access-wrapper com caixa fixa 40x40 e :focus-within com anel de duas cores (já nos 3 arquivos). Repetir na entrega final.
- Decisão provisória: final = B (régua, ouro, Big Shoulders + Public Sans) + linhas de preço claras da A + a semana de envio (já em B) + vitrine de um queijo grande no herói.
- Etapa 4 (parcial): DESIGN.md escrito (contraste 10 pares ok), design/tokens.css, logos e ícone em design/marca/ (copiados para entrega/), fontes em entrega/fontes/. Falta: manual.html (design/marca/manual.html), design/midia.md.
- Etapa 5/6: escrever entrega/tela.html (herói com vitrine de um queijo + régua + semana + quem faz + final + VLibras com anel de foco).
- Etapa 5/6: entrega/tela.html escrita (primeira versão). Falta: olhar capturas, verificar, ajustar.
- entrega/tela.html pronta e verificada (0 falhas, 1 aviso: texto sobre listras da semana, medido: papel sobre #3a2c14 = ~13:1). Largura 320/768/1024/1280 sem rolagem lateral.
- Falta: design/marca/manual.html, design/midia.md, design/direcoes/index.html (prancha para o dono), rodar contraste/conferir-marca/verificar final, apagar .tmp-npm e .tmp-shots, relatório.
- Conhecido: botão do VLibras (terceiro) fica na borda direita e cobre pouco texto no celular.

## CONCLUÍDO (31/10/2026)
- entrega/tela.html (+ entrega/fontes, entrega/icone.svg) pronta. Verificador: 0 falhas, 1 aviso (texto sobre listras, medido à mão ~13:1). Capturas em design/verificacao/tela/.
- design/direcoes/index.html mostra as três direções para o dono trocar. design/marca/ tem logo, ícone, fontes, manual.html. design/midia.md lista o que falta (fotos, logo real).
- .tmp-npm e .tmp-shots apagados.
- Pendências do dono: número do registro IMA, frete e pagamento, horário limite do pedido, descrições das curas (macia/firme/seca, escritas pelo agente), endereço, fotos, logo, domínio. A semana "ter sai, qua a sex 1º ao 3º dia útil" assume que os 3 dias úteis contam do envio.
