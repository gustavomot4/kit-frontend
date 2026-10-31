# Como criar identidade

Identidade não é trocar a cor do botão. É a soma de decisões que fazem a tela ser reconhecida sem o logo. Princípio que resolve o conflito entre "usar o padrão do mercado" e "ter cara própria":

> **Convenção na interação, identidade na expressão.**
> Como navegar, preencher, filtrar e confirmar segue o que a pessoa já conhece (`padrao-*.md`). Tipografia, cor, forma, composição, imagem e voz são do produto.

Antes de tudo, defina a superfície em `criatividade.md`. Numa tela de marca, a expressão vai muito mais longe do que numa tela de trabalho.

## O que precisa existir numa direção

| Dimensão | Decida | Teste |
| --- | --- | --- |
| Conceito | Uma frase vinda do mundo do produto, com uma tensão: "X, mas Y" | Faria sentido em outro setor? Então é genérica |
| Tipografia | 1 ou 2 famílias e o porquê. Confira `ã õ ç á é` e os números | A primeira fonte que você pensou é a de sempre? Troque |
| Cor | Um matiz de marca, a temperatura dos neutros e o papel de cada cor | Neutros tingidos pelo matiz, não cinza puro. Contraste calculado |
| Forma | Raios, linhas e sombras, com uma regra só | Um raio igual em tudo é falta de decisão |
| Composição | Grade, densidade, alinhamento e o que é herói | Dá para distinguir da grade de cartões padrão? |
| Elemento-assinatura | Uma coisa funcional que só este produto teria | Se tirar, a tela vira qualquer outra? Então é ela |
| Voz | Como o produto fala: 3 frases reais de botão, vazio e erro | Soa como pessoa do setor, não como anúncio |
| Imagem | Foto, ilustração ou nenhuma, e com qual tratamento | Sem imagem de banco nem blob decorativo |

## Exemplos de elemento-assinatura

Saídos dos produtos do dono: agenda como lista de conversas com a linha "Agora" atravessando o dia; situações com forma própria (vazado, cheio, hachurado). O elemento resolve um problema real e, por isso, ninguém o confunde com enfeite.

Direção aprovada por ele em 30/10/2026, numa barbearia fictícia: o salão visto por cadeira, com a listra do poste marcando a ocupada. Veja `assets/design-exemplo.md`.

Uma pergunta que costuma render: **qual é a unidade real do trabalho?** Cadeira, sala, mesa, caminhão, turma. Organizar a tela principal por ela, em vez de uma lista genérica de registros, tende a dar composição própria e leitura de bater o olho.

## Método

1. **Mundo do produto.** Liste 10 coisas concretas do setor: materiais, ferramentas, documentos, lugares, gírias, rituais. Numa barbearia: navalha, espelho, ficha de papel, cadeira, listras. Use as palavras de `PRODUTO.md`.
2. **Três conceitos, em dimensões diferentes.** Não são três cores do mesmo layout: pelo menos tipografia, composição e cor precisam mudar.
   - **A, familiar:** o mais próximo do que o público já usa. Risco baixo.
   - **B, própria:** a que mais parece com o produto e com mais nenhum.
   - **C, inesperada:** um passo além do confortável, para abrir a conversa.

   Recomende pelo público, e diga por quê. Nem sempre a mais própria vence: o dono escolheu a B numa barbearia e a A numa marmitaria cuja dona não entende de tecnologia. A direção A também precisa de decisão própria: familiar não pode virar genérica.
3. **Derive os tokens do conceito** e escreva uma linha do porquê de cada escolha. Se a justificativa serve para qualquer produto, ela não vale.
4. **Revise contra `anti-generico.md`.** Troque toda escolha que caiu num padrão e diga o que trocou.
5. **Aplique à mesma tela real, com os mesmos dados.** A tela mais usada do produto, não a home nem o login. Dados fictícios realistas, nomes brasileiros, um caso difícil (nome longo, lista cheia).
6. **Capture em 1440 × 900 e 375 × 812.** Rode `scripts/verificar.mjs` nas três e corrija as falhas antes de mostrar: acessibilidade não é rodada posterior.
7. **Mostre as imagens.** Para cada uma: nome, conceito em uma frase, o elemento-assinatura. Diga qual recomenda e por quê. Pare e espere.

## Depois da escolha

Escreva `DESIGN.md` (modelo em `assets/design-modelo.md`). Ele guarda valores e motivos. Misturas ("a A com a agenda da B") entram explicitamente. Rode `scripts/contraste.mjs DESIGN.md`.

## Cor: como gerar uma paleta com contraste previsível

Trabalhe em OKLCH, em que a claridade é perceptualmente uniforme: dois tons com a mesma claridade em matizes diferentes têm contraste parecido. A Stripe fez o mesmo em CIELAB para parar de escolher pares aprovados um a um.

- Fixe o matiz e varie a claridade para criar a escala. Reduza o croma nos extremos.
- Neutros: mesmo matiz da marca, com croma entre 0,005 e 0,02.
- Cor de ação: precisa dar 4,5:1 com o texto em cima e 3:1 com o fundo em volta.
- Situações (erro, aviso, sucesso): nunca iguais à cor de marca. Sempre com ícone e texto.

## Fontes

Sirva a fonte pelo próprio projeto em produção, em WOFF2, com `font-display: swap`. Em protótipo pode vir de CDN. Fontes de CDN mandam o IP do visitante a terceiros, o que pesa na LGPD. A pilha do sistema é uma decisão válida quando há motivo (velocidade, telas de baixo custo): escreva o motivo no `DESIGN.md`.

**Fonte instalada no seu computador não é identidade.** Corbel, Trebuchet, Verdana e Segoe vêm com o Windows e não existem no Android nem no iPhone: a captura fica bonita e, no celular da pessoa, a tela muda de letra. "Sem CDN" não quer dizer "sem fonte": um WOFF2 com subconjunto latino, servido pelo projeto, não depende de internet externa e funciona em navegador antigo.

Se usar componentes prontos (shadcn/ui, Radix, React Aria), use o comportamento e a acessibilidade deles e troque a aparência inteira. O visual padrão deles é parte do que hoje se lê como "feito por IA".
