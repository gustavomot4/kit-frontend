---
name: kit-frontend
description: Cria e refatora frontend com identidade própria, padrões consolidados do mercado e acessibilidade verificada, para aprovar na primeira rodada e evitar retrabalho. Use em qualquer pedido de tela, página, landing, painel, formulário, tema, visual, UI ou UX, em qualquer stack, inclusive "deixa mais bonito", "está com cara de IA", "refatora o frontend" ou "não gostei desse visual".
compatibility: Os scripts pedem Node 22 ou mais novo e Chrome, Edge ou Chromium instalado. Sem eles, a skill funciona com a verificação manual.
metadata:
  version: "3.0.0"
---

# Kit de frontend

Objetivo: entregar uma interface que o dono aprova sem rodadas de refatoração, que tem cara própria e que todos conseguem usar.

O retrabalho nasce de quatro causas, e cada etapa abaixo ataca uma: código antes da direção visual aprovada; gosto que precisa ser repetido a cada projeto; qualidade autodeclarada sem medição; correção feita numa tela e esquecida nas outras.

## Antes de qualquer coisa

1. Leia `references/gosto.md` e `references/correcoes-coletadas.md`. O resto, só quando a etapa pedir: cada arquivo aberto custa contexto e limite de uso. Num teste real, ler tudo no início levou o contexto a 275 mil tokens. Scripts são para rodar, não para ler.
2. No projeto, leia o que existir: `design/correcoes.md`, `DESIGN.md`, `PRODUTO.md`.
3. Em caso de conflito, vale esta ordem:
   1. O piso de `references/acessibilidade.md`. Se um pedido bater nele, avise e proponha uma saída.
   2. O pedido explícito nesta conversa.
   3. `design/correcoes.md`.
   4. `DESIGN.md`.
   5. `references/gosto.md`.
   6. `references/padrao-*.md`.
   7. O estilo de partida, com as ressalvas de `references/estilos.md`.

## Escolha o caminho

| Situação | Caminho |
| --- | --- |
| Projeto sem telas e sem `DESIGN.md` | Etapas 1 a 7 |
| Produto existente sem `DESIGN.md`, ou "está com cara de IA" | Rode a verificação nas telas atuais, mostre o diagnóstico com capturas e siga as etapas 1 a 7 |
| Tela nova com `DESIGN.md` aprovado | Etapas 5 a 7 |
| Ajuste pontual | Etapas 5 a 7, só na tela e nas iguais a ela |
| Pedido só de revisão | Etapa 6, sem alterar nada |

## As etapas

### 1. Entender

Crie `PRODUTO.md` a partir de `assets/produto-modelo.md`. Deduza o que puder do código e dos documentos. Pergunte no máximo 5 coisas, cada uma com a sua recomendação, e só o que muda decisão de tela.

### 2. Três direções: portão

Sem código de produção antes da escolha. Siga `references/identidade.md` e `references/criatividade.md`, e confira `references/anti-generico.md`. Para imagem, vídeo, 3D e animação, veja `references/bibliotecas.md`; o que você não puder gerar vai para `design/midia.md` (modelo em `assets/midia-modelo.md`).

- Em `design/direcoes/`: a tela mais usada do produto, com os mesmos dados, em três arquivos HTML estáticos que diferem em tipografia, composição e cor, não só na cor.
- Rode a verificação nas três e corrija as falhas.
- Mostre as imagens em 1440 × 900 e 375 × 812, com nome, conceito em uma frase, elemento-assinatura e a sua recomendação. Texto mínimo: quem decide olha a imagem.

**Pare e espere a escolha.** Misturas são bem-vindas. Se o dono rejeitar as três, pergunte o que incomodou, registre em `design/correcoes.md` e refaça.

**Dono ausente.** Se ele disse que não pode responder ("decide você e segue"), não pare nos portões: siga com a sua recomendação e marque a escolha como provisória no `DESIGN.md`. A ordem não muda: `DESIGN.md` vem antes do código. Na entrega, mostre as direções não escolhidas, para ele poder trocar.

### 3. Travar

Escreva `DESIGN.md` a partir de `assets/design-modelo.md` (exemplo preenchido em `assets/design-exemplo.md`) e gere o arquivo de tokens da stack do projeto. Rode `scripts/contraste.mjs DESIGN.md`. Toda cor e todo tamanho usados daqui em diante vêm dele.

### 4. Tela-modelo: portão

Em código real: a casca (navegação nas larguras de `references/padrao-navegacao.md`) e a tela da etapa 2, com carregando, vazio, erro e sucesso. Rode a verificação e mostre as capturas.

**Pare e espere a aprovação.** É aqui que o retrabalho fica barato: uma correção agora vale para todas as telas seguintes.

### 5. Construir

No máximo 3 telas por entrega. Antes de cada tela, leia o padrão correspondente:

| Tela ou peça | Leia |
| --- | --- |
| Lista, tabela, busca, filtro | `references/padrao-lista-tabela.md` |
| Formulário, cadastro, passo a passo | `references/padrao-formulario.md` |
| Escolha entre opções, dropdown | `references/padrao-selecao.md` |
| Menu, casca, responsividade | `references/padrao-navegacao.md` |
| Painel, indicadores, gráfico | `references/padrao-painel.md` |
| Agenda, calendário | `references/padrao-agenda.md` |
| Carregando, vazio, erro | `references/padrao-estados.md` |
| Aviso, confirmação, desfazer | `references/padrao-retorno.md` |
| Landing, site, tela de marca | `references/padrao-landing.md` e `references/criatividade.md` |
| Escolher biblioteca, ícone, animação, 3D, gerar mídia | `references/bibliotecas.md` |
| Tema escuro | `references/padrao-tema-escuro.md` |
| Receita completa de um tipo de produto | `references/estilos.md` |

Reaproveite os componentes já feitos. Valor novo entra no `DESIGN.md` primeiro. Em dados de exemplo, use nomes e situações do setor, nunca dados reais.

### 6. Verificar

Em cada tela alterada, com ela no ar ou como arquivo:

```bash
node <pasta da skill>/scripts/verificar.mjs http://localhost:5173/agenda
```

Ele testa quatro tamanhos, faz uma passada de Tab, cobre acessibilidade, gosto e cara de IA, salva capturas em `design/verificacao/` e sai com código 1 se houver falha.

- **Falha** se corrige antes de entregar.
- **Aviso** se corrige, ou você explica o motivo no relatório. Decisão aprovada entra no `DESIGN.md`.
- Olhe as capturas. O script mede; o olho vê o que está feio.
- Faça o teste dos 5 segundos: o que a tela informa e qual é a ação.
- Faça o roteiro manual de `references/acessibilidade.md`.

**Sem Node ou sem navegador:** cole `scripts/tela.js` no console e confira o `resultado.achados`. **Sem como executar nada:** diga isso na primeira linha, entregue os comandos e nunca relate como executado o que não foi.

### 7. Aprender

Quando o dono reprovar algo, nesta ordem:

1. Registre em `design/correcoes.md` (modelo em `assets/correcoes-modelo.md`): o que foi reprovado, nas palavras dele, e a **regra geral**.
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
