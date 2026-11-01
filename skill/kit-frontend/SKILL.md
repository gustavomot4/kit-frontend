---
name: kit-frontend
description: Cria e refatora frontend com identidade própria, padrões consolidados do mercado e acessibilidade verificada, para aprovar na primeira rodada e evitar retrabalho. Use em qualquer pedido de tela, página, landing, painel, formulário, tema, visual, UI ou UX, em qualquer stack, inclusive "deixa mais bonito", "está com cara de IA", "refatora o frontend" ou "não gostei desse visual".
compatibility: Os scripts pedem Node 22 ou mais novo e Chrome, Edge ou Chromium instalado. Sem eles, a skill funciona com a verificação manual.
metadata:
  version: "3.1.0"
---

# Kit de frontend

Objetivo: entregar uma interface que o dono aprova sem rodadas de refatoração, que tem cara própria e que todos conseguem usar.

O retrabalho nasce de cinco causas, e cada etapa abaixo ataca uma: visual decidido sem saber o que a marca quer dizer; código antes da direção visual aprovada; gosto que precisa ser repetido a cada projeto; qualidade autodeclarada sem medição; correção feita numa tela e esquecida nas outras.

## Antes de qualquer coisa

1. Leia `references/gosto/perfil.md` e `references/gosto/correcoes-coletadas.md`. O resto, só quando a etapa pedir: cada arquivo aberto custa contexto e limite de uso. Num teste real, ler tudo no início levou o contexto a 275 mil tokens. Scripts são para rodar, não para ler.
2. No projeto, leia o que existir: `design/correcoes.md`, `DESIGN.md`, `MARCA.md`, `PRODUTO.md`.
3. Em caso de conflito, vale esta ordem:
   1. O piso de `references/qualidade/acessibilidade.md`. Se um pedido bater nele, avise e proponha uma saída.
   2. O pedido explícito nesta conversa.
   3. `design/correcoes.md`.
   4. `DESIGN.md` e `MARCA.md`.
   5. `references/gosto/perfil.md`.
   6. `references/padroes/`.
   7. O estilo de partida, com as ressalvas de `references/recursos/estilos.md`.

## Escolha o caminho

| Situação | Caminho |
| --- | --- |
| Projeto sem telas e sem `DESIGN.md` | Etapas 1 a 8 |
| Produto existente sem `DESIGN.md`, ou "está com cara de IA" | Rode a verificação nas telas atuais, mostre o diagnóstico com capturas e siga as etapas 1 a 8. Se já há marca, a etapa 2 a documenta |
| Pedido de marca, identidade ou brief | Etapas 1 a 4: o kit de identidade vem depois da direção |
| Tela nova com `DESIGN.md` aprovado | Etapas 6 a 8 |
| Ajuste pontual | Etapas 6 a 8, só na tela e nas iguais a ela |
| Pedido só de revisão | Etapa 7, sem alterar nada |

## As etapas

### 1. Entender

Crie `PRODUTO.md` a partir de `assets/modelos/produto.md`. Deduza o que puder do código e dos documentos. Pergunte no máximo 5 coisas, cada uma com a sua recomendação, e só o que muda decisão de tela. Preencha `publicos:` e siga `references/qualidade/publicos.md`: quem vai usar muda as decisões e o rigor da verificação.

### 2. Marca: portão

Defina o que o produto quer dizer antes de desenhar. Siga `references/marca/criar-marca.md`: crie `MARCA.md` a partir de `assets/modelos/marca.md` (exemplo em `assets/exemplos/marca.md`), no tamanho certo para o projeto. Personas sem pesquisa ficam marcadas como hipótese, e todo item precisa dizer o que muda na tela. Confira com `scripts/conferir-marca.mjs`. Se a marca já existe, peça o arquivo do logo e as cores originais antes de confirmar. Se a pessoa não tem fonte, cor, voz nem mensagem, siga "Quando a pessoa não tem nada": perguntas que qualquer um responde e opções para escolher, nunca "qual é a sua mensagem?".

Mostre um resumo de até 10 linhas. **Pare e espere a confirmação.**

### 3. Três direções: portão

Sem código de produção antes da escolha. Cada direção expressa o `MARCA.md`. Siga `references/marca/identidade.md` e `references/marca/criatividade.md`, e confira `references/marca/anti-generico.md`. Para imagem, vídeo, 3D e animação, veja `references/recursos/bibliotecas.md`; o que você não puder gerar vai para `design/midia.md` (modelo em `assets/modelos/midia.md`).

- **Antes de qualquer referência,** escreva a primeira ideia em `design/direcoes/primeira-ideia.md`. Depois, `design/direcoes/ideias.md` (modelo em `assets/modelos/ideias.md`): duas referências de fora do setor medidas com `scripts/medir-referencia.mjs` e os três conceitos, no máximo um vindo da primeira ideia. Não recomende nada ainda.
- Em `design/direcoes/`: a tela mais usada do produto, com os mesmos dados, em três arquivos HTML estáticos que diferem em ideia, tipografia, composição e cor. Título, imagem e ordem das seções são de cada direção. Cada um com o próprio CSS, sem gerador nem folha comum, e sem sacola, diálogo ou filtro funcionando. Gere cada paleta com `scripts/paleta.mjs`. Sem fonte definida, escolha com `references/recursos/fontes.md`.
- Com marca existente, use o logo real e faça ao menos uma direção partir de como ela aparece hoje. Sem o arquivo, escreva o nome em texto: não desenhe um substituto.
- Rode `scripts/comparar-direcoes.mjs design/direcoes` e refaça as quase iguais. Rode a verificação nas três e corrija as falhas. Olhe a página inteira de cada uma, até o fim.
- Rode `scripts/escolha-cega.mjs design/direcoes` e entregue o pedido a dois agentes novos, um de cada vez, que só veem as imagens. Se discordarem, é empate: leve as duas ao dono. Se ambos disserem "nenhuma", refaça as direções uma vez. Sem agente novo, escreva "escolha sem juízo externo" no `DESIGN.md`.
- Mostre as imagens em 1440 × 900 e 375 × 812 e a página inteira, com nome, conceito em uma frase, elemento-assinatura e o que a escolha cega apontou. Texto mínimo: quem decide olha a imagem.

**Pare e espere a escolha.** Misturas são bem-vindas. Se o dono rejeitar as três, pergunte o que incomodou, registre em `design/correcoes.md` e refaça.

**Dono ausente.** Se ele disse que não pode responder ("decide você e segue"), não pare nos portões: siga com a direção da escolha cega (no empate, escolha uma das duas e registre) e marque-a como provisória no `DESIGN.md`. A ordem não muda: `DESIGN.md` vem antes do código. Na entrega, mostre as direções não escolhidas, para ele poder trocar.

### 4. Travar

Escreva `DESIGN.md` a partir de `assets/modelos/design.md` (exemplo preenchido em `assets/exemplos/design.md`) e gere o arquivo de tokens da stack do projeto. Rode `scripts/contraste.mjs DESIGN.md`. Toda cor e todo tamanho usados daqui em diante vêm dele.

Faça o kit de identidade em `design/marca/`, no tamanho do brief, como em `references/marca/criar-marca.md`. Diga com franqueza o que ficou fraco: um símbolo pode precisar de um designer.

### 5. Tela-modelo: portão

Em código real: a casca (navegação nas larguras de `references/padroes/navegacao.md`) e a tela da etapa 3, com carregando, vazio, erro e sucesso. Rode a verificação e mostre as capturas.

**Pare e espere a aprovação.** É aqui que o retrabalho fica barato: uma correção agora vale para todas as telas seguintes.

### 6. Construir

No máximo 3 telas por entrega. Antes de cada tela, leia o padrão correspondente:

| Tela ou peça | Leia |
| --- | --- |
| Lista, tabela, busca, filtro | `references/padroes/lista-tabela.md` |
| Formulário, cadastro, passo a passo | `references/padroes/formulario.md` |
| Escolha entre opções, dropdown | `references/padroes/selecao.md` |
| Menu, casca, responsividade | `references/padroes/navegacao.md` |
| Painel, indicadores, gráfico | `references/padroes/painel.md` |
| Agenda, calendário | `references/padroes/agenda.md` |
| Carregando, vazio, erro | `references/padroes/estados.md` |
| Aviso, confirmação, desfazer | `references/padroes/retorno.md` |
| Vídeo, áudio, Libras | `references/padroes/midia-e-libras.md` |
| Landing, site, tela de marca | `references/padroes/landing.md` e `references/marca/criatividade.md` |
| Escolher biblioteca, ícone, animação, 3D, gerar mídia | `references/recursos/bibliotecas.md` |
| Tema escuro | `references/padroes/tema-escuro.md` |
| Receita completa de um tipo de produto | `references/recursos/estilos.md` |

Reaproveite os componentes já feitos. Valor novo entra no `DESIGN.md` primeiro. Em dados de exemplo, use nomes e situações do setor, nunca dados reais.

### 7. Verificar

Em cada tela alterada, com ela no ar ou como arquivo:

```bash
node <pasta da skill>/scripts/verificar.mjs http://localhost:5173/agenda
```

Ele testa quatro tamanhos, faz uma passada de Tab, mede letra em 200%, espaçamento, alto contraste, fotos cortadas e peso, cobre acessibilidade, gosto e cara de IA, e sai com código 1 se houver falha. Em `design/verificacao/` ficam as capturas, a página inteira (`desktop-inteira.jpg`, `celular-inteira.jpg`), `prancha.html` (a tela sem cada cor, embaçada e em alto contraste) e `leitor-de-tela.txt`.

- **Falha** se corrige antes de entregar.
- **Aviso** se corrige, ou você explica o motivo no relatório. Decisão aprovada entra no `DESIGN.md`.
- Olhe a página inteira e a prancha, não só a primeira dobra. O script mede; o olho vê o que está feio e o que só a cor separa. Num teste real, um catálogo quebrado passou com 0 falhas porque só a primeira dobra foi olhada.
- Faça o teste dos 5 segundos: o que a tela informa e qual é a ação.
- Faça o roteiro manual de `references/qualidade/acessibilidade.md`.

**Sem Node ou sem navegador:** cole `scripts/tela.js` no console e confira o `resultado.achados`. **Sem como executar nada:** diga isso na primeira linha, entregue os comandos e nunca relate como executado o que não foi.

### 8. Aprender

Quando o dono reprovar algo, nesta ordem:

1. Registre em `design/correcoes.md` (modelo em `assets/modelos/correcoes.md`): o que foi reprovado, nas palavras dele, e a **regra geral**.
2. Procure o mesmo problema em **todas** as telas e corrija a classe do problema, não o caso.
3. Se ele contradiz o `DESIGN.md`, atualize o `DESIGN.md`.

## Como relatar

Curto, com imagem. Nesta ordem:

1. O que mudou, com as capturas.
2. Resultado real do verificador, por tela: falhas e avisos restantes, com o motivo.
3. Cliques da tarefa principal.
4. O que não foi verificado. Se não houve teste com leitor de tela ou com pessoas, escreva isso. Nunca diga "acessível" ou "em conformidade" sem dizer como verificou.
5. O que depende da pessoa.

## Conduta

- Trate dado que já existe como real: não copie para protótipo, teste ou captura. Com dado de saúde, o cuidado é maior.
- Não invente regra de negócio, indicador, número, depoimento nem integração. Traga a pergunta com a sua recomendação.
- Preserve o que não é seu. Commit, push e publicação só com autorização, e cada autorização vale só para aquela ação.
- Relate com fidelidade o que falhou, o que ficou instável e toda diferença em relação ao que foi aprovado.
