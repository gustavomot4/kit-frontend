# Criatividade: o que os sites admirados fazem

Medido em 11 sites que o dono do kit citou como os que gosta bastante, em 30/10/2026: Nubank, C6, Itaú, 99, iFood Parceiros, Valorant, Fortnite, Epic Store, Hyper3D, CozyGPU e Cequence. Os números estão em `docs/pesquisa/referencias-sites.md`, no repositório do kit. Copie o raciocínio, nunca a marca, a fonte, a imagem ou o texto.

## Primeiro, a superfície

| Superfície | Exemplos | Expressão |
| --- | --- | --- |
| **Marca** | Landing, site, página de produto, abertura de app, jogo | Alta. Aplique tudo abaixo |
| **Trabalho** | Sistema, painel, cadastro, tela usada o dia inteiro | Contida. `references/gosto/perfil.md` manda (G01 a G03). Use uma ou duas ideias daqui, como escala no dado principal e o elemento-assinatura |
| **Tarefa curta** | Cadastro, pagamento, passo a passo | Baixa no meio do fluxo. Marca na abertura e na conclusão |

## O que levar

### 1. Título muito maior do que parece seguro

Marcas grandes medidas usam títulos de 54 a 156px no computador. Um gerador costuma parar em 48px. Na superfície de marca, comece em 72px no computador e reduza com `clamp()` em `rem` e `vw`, sem quebrar em 320px.

### 2. Peso extremo, não médio

C6 usa peso 300 em 100px; Valorant, uma condensada pesada em caixa alta; Nubank, 600 em tamanho enorme. Peso 600 em tamanho médio é o que todo mundo faz. Escolha um extremo e fique nele.

### 3. A fonte carrega a marca

Nubank, C6, Itaú, iFood, 99, Valorant e Fortnite usam tipografia própria ou pouco comum. Sem orçamento para isso, escolha uma família gratuita, pouco usada e com personalidade, para os títulos. Os que usam Inter, Poppins ou Montserrat (Epic, Hyper3D, Cequence) compensam com imagem forte.

### 4. Cor de marca em área grande

99 pinta metade da primeira dobra de amarelo; Nubank usa faixas inteiras em roxo; iFood, vermelho; Valorant, vermelho e um quase branco quente. A cor não fica só no botão. Regra de partida na superfície de marca: de 20 a 50% da primeira dobra, ou uma faixa de ponta a ponta por página.

O problema nunca foi a cor em si. O roxo da Nubank é da Nubank; o índigo padrão do Tailwind não é de ninguém. Veja que cor os concorrentes do setor usam e escolha outra.

### 5. Imagem real manda

Nove dos onze sites têm foto, arte ou render ocupando boa parte da primeira dobra: gente de verdade nos bancos e na 99, personagens nos jogos, o próprio resultado na Hyper3D. É o que um agente menos entrega. Siga `references/recursos/bibliotecas.md`: material real, depois gerado com estilo único, depois ilustração própria.

Texto sobre foto precisa de escurecimento calculado. Sem isso, reprova em contraste.

### 6. Ilustração própria e barata

CozyGPU não usa foto: cada modelo tem um desenho de linha fina sobre preto, com um único ponto laranja. Um gesto repetido virou identidade. **Um agente consegue fazer isso em SVG.** É a melhor saída quando não há foto: defina uma regra simples (traço, cor, um detalhe que se repete) e siga em todos os desenhos.

### 7. Forma extrema e coerente

Valorant usa raio zero. Nubank, pílula em tudo. A 99, cantos de 72px em imagem. O genérico fica no meio: 8 a 12px em tudo. Escolha um extremo, com motivo.

### 8. Mostre o produto funcionando

Hyper3D mostra a entrada e o resultado; Cequence, um diagrama do que o produto faz. Vale mais que três cartões de benefícios. Em sistema, mostre a tela real com dados reais.

### 9. Uma ação na primeira dobra

Nubank e iFood Parceiros colocam o primeiro campo do cadastro direto na primeira dobra. Peça uma coisa só, com finalidade e política à vista.

### 10. Frase curta, com posição

Poucas palavras, uma promessa que só aquela empresa faria. Depois, prova concreta: número real, com unidade e fonte. Número inventado é pior que nenhum.

### 11. Ritmo por contraste

As páginas alternam faixa de cor cheia, branco e imagem de ponta a ponta. Mude a composição a cada bloco, não só o fundo.

### 12. Tema escuro é decisão de setor

Jogos e ferramentas de IA abrem em escuro (Fortnite, Epic, Valorant, Hyper3D, CozyGPU); C6 usa o preto como sinal de exclusividade. Serviço de massa abre em claro (Nubank, 99, iFood, Itaú). Sistema de trabalho do dono segue claro por padrão (G05).

## O que não levar

Esses sites também têm problemas medidos. Não copie:

- Avisos de cookies que cobrem boa parte da tela: o piso de `references/qualidade/acessibilidade.md` prevalece.
- Texto muito pequeno. Hyper3D chega a 7,2px, e CozyGPU a 11px.
- Carrossel como herói: esconde o conteúdo. Só com pausa e quando indispensável.
- Títulos vagos e densidade de anúncio numa tela de trabalho.

## Como usar nas três direções

Numa superfície de marca, ao menos uma direção precisa aplicar de verdade os itens 1, 4 e 5. Se todas ficarem com título de 48px, cor só no botão e sem imagem, refaça: essa é a cara média de gerador, mesmo sem nenhum clichê da lista de `references/marca/anti-generico.md`.

Identidade exigente não dispensa o piso: contraste, foco, teclado, zoom e movimento reduzido continuam valendo.
