# Marmitaria (nome provisório)

Tudo aqui afeta decisões de tela. O que ninguém sabia, está marcado como "não sei" e segue com a minha recomendação. O dono do pedido estava fora e não pôde responder: toda decisão abaixo foi tomada pelo agente e precisa de confirmação.

## Quem usa
- **Perfis:** a dona da marmitaria (tia do pedido). Uma pessoa só. Um ajudante no balcão pode usar a mesma tela. Entregadores **não** usam o sistema: recebem a lista de fora dele (decisão minha; app de entregador fica fora do escopo).
- **Familiaridade com tecnologia:** "não entende nada". Conhece WhatsApp. Tudo o que não se parece com WhatsApp precisa se explicar sozinho.
- **Letramento, idade, necessidades de acessibilidade:** não sei. Assumo 50 anos ou mais e vista cansada: letra grande (18px de base), contraste alto, alvo de toque de 48px, uma decisão por vez.
- **Aparelho e situação:** celular é o principal (não sei a marca; assumo Android). Um computador velho no balcão (não sei a tela nem o navegador; assumo 1366 × 768 e Chrome antigo, até a versão 109 que ainda roda no Windows 7). Mãos sujas, pressa na hora do almoço, uma mão só. Consequência: nada de recurso novo de CSS ou JavaScript, nada de efeito pesado, nada que dependa de internet para carregar (sem CDN, sem fonte baixada).

## O que precisam fazer
- **Tarefa mais frequente:** anotar o pedido que chegou pelo WhatsApp, cerca de 60 vezes por dia.
- **Meta de cliques para ela:** cliente que já pediu antes, até 4 toques (abrir, escolher o cliente, confirmar, salvar). Cliente novo, preenchendo.
- **Outras tarefas, em ordem:**
  1. Passar o pedido para um entregador (hoje ela faz no caderno, depois de anotar). Meta: 1 toque por pedido.
  2. Marcar que a marmita ficou pronta (1 toque), que o entregador saiu com as prontas (1 toque para a sacola toda) e que o pedido foi entregue (1 toque).
  3. Achar um pedido quando o cliente liga perguntando "cadê o meu?".
- **A decisão que a tela principal precisa ajudar a tomar:** "O que falta sair, e com quem?" Em segundo lugar: "Falta algum pedido sem entregador?"

## Mundo do produto
Tampa de alumínio com o número escrito a caneta (é assim que ela separa as marmitas), marmitex P, M e G, a mistura do dia (frango, bife, omelete), arroz, feijão, salada, sacola plástica com nó, elástico, caderno de pauta, balcão, motoboy e sua bag, bairro, "troco pra 50", Pix, maquininha, "sai o Cláudio com quatro".

## Referências
- **Gosto de:** WhatsApp pela familiaridade (lista, "desfazer", botão grande). Pelo perfil de gosto do kit: limpo, direto, sem cara de IA.
- **Não quero parecer com:** painel administrativo genérico (barra escura, quatro indicadores, gráfico).
- **Exigências de quem usa ou contrata:** separar por entregador, como o caderno faz hoje.

## Marca
Não existe. O nome "Marmitaria" é provisório e aparece em dois lugares (`<title>` e `.marca` no `index.html`). A marca é só o nome em texto, sem quadradinho.

## Limites
- **Stack e bibliotecas:** HTML e CSS puros, sem framework, sem build. Um único arquivo JavaScript pequeno só para os botões responderem; a tela continua legível sem ele.
- **Dados:** demonstração local, nomes e bairros inventados do setor. Sem backend: ao recarregar a página, volta tudo ao exemplo.
- **Fora do escopo:** login, cadastro de cardápio e de clientes, relatórios, integração com WhatsApp, impressão, pagamento online, aplicativo do entregador, cancelar e editar pedido.
