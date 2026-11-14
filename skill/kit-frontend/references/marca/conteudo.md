# Conteúdo: o texto como argumento

**Quando:** site, landing, portfólio, página de produto. Em tela de marca, o visual faz a pessoa ficar; o texto faz a pessoa agir. "Pouco texto" (G03) continua valendo: pouco não quer dizer vazio.

De onde veio: teste de 13/11/2026 (`docs/testes/2026-11-13-portfolio`, no repositório do kit). O dono aprovou o visual e reprovou o texto duas vezes: "o site está muito bonito, mas o conteúdo não vende, [...] não bate na ferida". A primeira correção, em perguntas e respostas dirigidas ao leitor, também foi reprovada: "meio forçado".

## 1. Inventário de provas, na etapa 1

Antes do brief, levante os fatos. O texto só é tão bom quanto as provas que você achou.

- **Leia todas as fontes, não só as que parecem principais:** todos os repositórios, os READMEs inteiros, currículo, site atual, apresentação, avaliações reais. No teste de 13/11, as provas mais fortes (um jogo publicado e jogável, deploy com volta automática) só apareceram na segunda leitura, quando o dono pediu "verifique o meu GitHub inteiro".
- **Registre no `PRODUTO.md`,** na tabela "Provas": fato verificável, o que ele prova, fonte, se pode publicar.
- **Só fato com fonte.** Número sem fonte não entra. Use a palavra que a fonte permite: "em produção", "em uso por uma loja", "prova de conceito" e "protótipo" não são sinônimos.
- **Fonte que não pode aparecer** (trabalho sob sigilo, cliente que não autorizou): entra só como conhecimento genérico, como a tecnologia e o tipo de problema, sem nome, tela nem número. Não abra arquivos de anotação ou de credenciais ao levantar material.
- **Dado pessoal** (telefone, endereço, contato de terceiros) não vai para página nem para PDF publicado sem pedido explícito.

## 2. O que o público precisa acreditar

Para cada perfil de `PRODUTO.md`, escreva de 2 a 4 crenças que levam à ação, e a prova que sustenta cada uma. A ordem dos blocos da página segue essas crenças, da mais decisiva para a menos.

| Público (exemplo) | Precisa acreditar | Prova que sustenta |
| --- | --- | --- |
| Quem contrata dev de IA | "Usa IA fora do tutorial" | Trabalho real com agentes, com o que foi entregue |
| | "Entende além do prompt" | Sistema próprio com testes e arquitetura |
| | "Sabe provar que funciona" | Métrica de avaliação, backtest, QA |
| | "Entrega de ponta a ponta" | Algo publicado que a pessoa pode abrir agora |

Crença sem prova não vira frase: vira pergunta ao dono ou fica de fora.

## 3. Como escrever

- **Afirmação, prova e habilidade nomeada.** "Faço vários LLMs trabalharem como um sistema só." Logo abaixo, o fato que prova e as tecnologias. A crença do público fica implícita: o texto mostra, não anuncia que está respondendo.
- **Não fale com o leitor sobre o que ele quer.** "O que todo recrutador quer saber" e listas de "Sim." soaram forçados. O mesmo vale para "Por que me contratar?" e afins.
- **Caso ou projeto: problema, o que eu fiz, número.** Uma linha cada. O número fica grande, com legenda curta embaixo.
- **Limite honesto vira "Próximo passo".** Mostra evolução sem esconder o que falta.
- **Número no lugar de adjetivo.** "568 testes aprovados", não "robusto e confiável".
- **A coisa mais forte que dá para tocar vem antes.** Produto publicado com botão "Jogar agora" ou "Abrir" vale mais que descrição.
- **Título que só serve para esta pessoa ou empresa.** Se trocar o nome e a frase continua funcionando para outra, é genérica. Teste também contra `references/marca/anti-generico.md` (frases vazias e de efeito).
- **Primeira pessoa e linguagem literal** em portfólio; a voz de `MARCA.md` nos demais.

## 4. No processo

- **Etapa 1:** o inventário de provas entra no `PRODUTO.md`.
- **Etapa 2:** o resumo da marca mostra ao dono as 3 a 6 provas mais fortes, em até 10 linhas junto com o resto. Prova fraca ou dúvida sobre o que pode publicar vira pergunta, com recomendação.
- **Etapa 3:** as três direções usam o mesmo texto e as mesmas provas. O texto é dado do produto, não decoração de uma direção.
- **Revisão:** antes de mostrar, leia a página como o público, em 30 segundos. Diga em voz alta quem é, o que faz, qual prova ficou na memória e qual é a ação. Se faltar uma, o texto não terminou.

## Conferência

- [ ] Toda frase com número ou resultado tem fonte no inventário.
- [ ] Cada bloco sustenta uma crença do público, e a mais decisiva vem primeiro.
- [ ] Nenhuma pergunta dirigida ao leitor sobre o que ele quer.
- [ ] Cada projeto tem problema, o que foi feito e um número, com limite em "Próximo passo".
- [ ] Nada de trabalho sob sigilo ou dado pessoal sem autorização.
