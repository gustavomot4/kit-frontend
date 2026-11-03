# Central de despacho de guinchos (Fernão Dias)

Tudo aqui afeta decisões de tela. O dono pediu "decide você e segue": o que não veio no pedido está marcado como **hipótese** e vai para a lista de confirmação no fim.

## Quem usa

- **Perfis:** atendente da central. Dois por turno, 24 horas, no mesmo computador e no mesmo monitor. Recebem a chamada por telefone, olham a tela, mandam o guincho. O dono olha de vez em quando (hipótese).
- **Familiaridade com tecnologia:** planilha e WhatsApp. Nada de sistema de despacho (dito pelo dono: "hoje é tudo em planilha e WhatsApp").
- **Letramento, idade, necessidades de acessibilidade conhecidas:** não informados. Hipótese: adultos de idades variadas, turnos longos e noturnos, telefone numa mão e teclado na outra, atenção dividida entre a pessoa na linha e a tela.
- **publicos:** [daltonismo, baixa-visao, cognitivo] <!-- hipótese. daltonismo: a tela inteira fala de situação (livre, a caminho, estourou) e não pode depender de cor. baixa-visao: turno de 12 horas diante do mesmo monitor. cognitivo: quem atende está ao telefone; nada pode depender de memorizar nem de ler muito -->
- **superficie:** interna
- **Aparelho e situação:** um computador de mesa com um monitor só (resolução desconhecida: projetar para 1366 × 768 no mínimo e 1920 × 1080 como ideal), aberto o turno inteiro, com telefone ao lado. Pressa constante, atenção dividida. Funciona de noite e de dia.

## O que precisam fazer

- **Tarefa mais frequente:** mandar um guincho para uma chamada que está esperando. A frequência por turno é desconhecida.
- **Meta de cliques para ela:** 1 clique para a chamada mais urgente (ela já abre selecionada e o guincho recomendado já vem escolhido); 2 para qualquer outra.
- **Outras tarefas, em ordem:** ver o que está esperando e o que vai estourar o prazo; ver quem está livre e onde; acompanhar o guincho a caminho; desfazer um despacho errado. Registrar chamada nova é uma tela à parte, que esta não faz.
- **A decisão que a tela principal precisa ajudar a tomar:** "Qual chamada vai estourar o prazo de 60 minutos, e qual guincho livre eu mando para ela agora?"

## Mundo do produto

Guincho plataforma, guincho pesado, prancha, acostamento, marco de quilômetro, sentido São Paulo e sentido Belo Horizonte, praça de pedágio, retorno, base, pane, pneu, bateria, colisão, apólice, protocolo da seguradora, "o segurado está esperando no acostamento", pisca-alerta, rádio. A rodovia é uma linha reta de uns 450 km: a distância entre dois pontos é uma subtração de quilômetros.

## Referências

- **Gosto de:** o que o dono pediu em outros produtos: limpo e direto, familiar (WhatsApp, Uber), poucos cliques, só o que ajuda a decidir (`references/gosto/perfil.md`). Do Uber, a ideia de ver quanto falta para o carro chegar. Nenhuma referência específica foi citada para este produto.
- **Não quero parecer com:** planilha com 14 abas e cores de marca-texto; painel de gerente com quatro indicadores e gráfico de área; mapa de frota coberto de alfinetes.
- **Exigências de quem usa ou contrata:** a seguradora cobra chegada em até 60 minutos. Contrato perdido por isso.

## Marca

Não informada. O nome da empresa não veio no pedido: a tela usa um nome provisório em texto, sem logotipo desenhado. Veja `MARCA.md`.

## Limites

- **Stack e bibliotecas:** HTML e CSS puros, num arquivo que abre direto no navegador. Um pouco de JavaScript embutido só para o despacho e o relógio funcionarem no exemplo; sem framework, sem build, sem CDN.
- **Dados:** exemplos inventados (nomes, placas, quilômetros e seguradoras fictícios). Sem GPS, telefonia nem mapa.
- **Fora do escopo:** cadastro de chamada nova, relatórios, financeiro, rastreamento real, mapa real.

## Pressupostos que o dono precisa confirmar (hipóteses, não regras)

1. O prazo de 60 minutos conta a partir da abertura da chamada e vale para seguradora; no exemplo, vale também para particular.
2. O tempo de chegada estimado usa velocidade média de 70 km/h, em linha reta pela rodovia, sem considerar retorno nem trânsito.
3. Há dois tipos de guincho (plataforma e pesado) e só o tipo certo é recomendado para cada veículo.
4. Os 14 caminhões enviam a posição (quilômetro) para a central. Se hoje a posição vem por rádio ou WhatsApp, o atendente digita, e a tela precisa de um campo para isso.
5. Os quilômetros e os marcos (Contagem 490, Extrema 940 etc.) são aproximações para o exemplo; os reais vêm da concessionária.
6. "Vence logo" aparece quando faltam 15 minutos ou menos, ou quando o guincho sugerido chegaria depois do prazo. "Estourou" é prazo negativo. Os 15 minutos são palpite.
7. A sugestão de guincho não repete: cada guincho livre vai para a chamada que vence primeiro. O atendente pode trocar.
