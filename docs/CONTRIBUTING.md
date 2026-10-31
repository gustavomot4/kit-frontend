# Padrão do repositório

Este arquivo define como um PRD é nomeado, organizado e escrito aqui. Todo PRD novo segue este padrão; todo PRD existente é corrigido para segui-lo.

Os PRDs são a fonte dos **estilos de partida** do kit. A identidade de cada produto não mora aqui: nasce no `DESIGN.md` do projeto, pelo processo de `skill/kit-frontend/SKILL.md`. Regras do kit (`references/gosto/perfil.md`, `references/qualidade/acessibilidade.md`) prevalecem sobre um PRD. Para mudar o kit, ver [AGENTS.md](../AGENTS.md).

## Estrutura

```
.
├── README.md                 catálogo e instruções de uso
├── AGENTS.md                 como trabalhar neste repositório
├── package.json              metadados do comando kit-frontend
├── bin/                      instalador e comandos
├── skill/kit-frontend/       o que é instalado nos projetos
├── dist/                     gerado: prompt único e llms.txt
├── prds/
│   ├── modelo-de-prd.md      ponto de partida para um PRD novo
│   └── <slug>/
│       ├── prd.md            o documento
│       ├── CHANGELOG.md      o que mudou em cada versão
│       └── exemplos/
│           ├── capa.png      primeira dobra do exemplo principal (1440 × 900)
│           ├── <tela>.html   exemplo estático, arquivo único
│           └── <tela>.png    captura do mesmo exemplo
├── ferramentas/
│   ├── validar.mjs           confere se o repositório segue este padrão
│   ├── testar.mjs            testes do kit
│   └── fixtures/             telas de teste
└── docs/
    ├── CONTRIBUTING.md       este padrão
    ├── pendencias.md         o que falta fazer
    ├── pesquisa/             benchmark e medições
    ├── testes/
    │   └── <AAAA-MM-DD>-<nome>/   telas, capturas e relatório de um teste
    └── auditorias/
        └── <AAAA-MM-DD>/
            ├── relatorio.md  consolidado da rodada
            └── <slug>/
                ├── auditoria.md  achados, com linha e correção
                └── original.md   a versão exata que foi auditada
```

A pasta de um PRD contém só o que serve a quem vai usá-lo. Material de auditoria fica em `docs/auditorias/`.

### Onde cada coisa fica

| Tipo de arquivo | Lugar |
| --- | --- |
| O que uma convenção exige na raiz | Raiz: `README.md`, `AGENTS.md`, `package.json`, `LICENSE` e arquivos de ponto |
| O que o agente usa num projeto | `skill/kit-frontend/` |
| Perfil do dono | `references/gosto/` |
| Como criar marca e identidade | `references/marca/` |
| Ficha de um tipo de tela | `references/padroes/` |
| Norma de qualidade | `references/qualidade/` |
| Catálogo de terceiros | `references/recursos/` |
| Modelo em branco e exemplo preenchido | `assets/modelos/`, `assets/exemplos/` |
| Código executado pelo agente | `scripts/` |
| Fonte de um estilo | `prds/<slug>/` |
| Código usado só para manter o kit | `ferramentas/` |
| Pesquisa, teste, auditoria e pendência | `docs/` |

O validador recusa arquivo fora desses lugares na raiz, em `prds/`, `docs/`, `references/` e `assets/`.

## Nomes

1. Minúsculas, palavras separadas por hífen, sem acento, sem espaço e sem sublinhado: `site-escola-idiomas`, não `Site_Escola de Idiomas`.
2. As únicas exceções são os arquivos que uma convenção externa pede em maiúsculas: `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `LICENSE`, `AGENTS.md`, `SKILL.md`.
3. Nome de arquivo ou pasta não carrega marca de terceiros, nome de cliente, nome de ferramenta nem marcador de rascunho (`final`, `novo`, `v2`, `chat`).
4. Datas em nomes usam `AAAA-MM-DD`.
5. Os nomes dentro da pasta de um PRD são fixos: `prd.md`, `CHANGELOG.md`, `exemplos/`, `exemplos/capa.png`.
6. Um exemplo é nomeado pela tela que mostra (`home`, `painel`, `agenda`), nunca por número (`mockup-1`). O `.html` e o `.png` do mesmo exemplo têm o mesmo nome.

### Slug do PRD

O slug é o nome da pasta e o valor do campo `slug`. Formato:

```
<superficie>-<tema>
```

`<tema>` tem de uma a três palavras, sem preposição. `<superficie>` vem desta lista fechada:

| Superfície | O que é | Exemplo de slug |
| --- | --- | --- |
| `base` | sistema de design geral, para produto sem PRD específico | `base-design-system` |
| `site` | site institucional, landing, página de marketing | `site-escola-idiomas` |
| `sistema` | ferramenta de trabalho: painel, gestão, ERP, admin | `sistema-gestao` |
| `fluxo` | sequência curta com um objetivo: checkout, cadastro, onboarding | `fluxo-checkout` |
| `app` | aplicativo de celular, nativo ou híbrido | `app-delivery` |

Para criar uma superfície nova, acrescente a linha nesta tabela na mesma alteração que cria o PRD.

## Cabeçalho obrigatório

Todo `prd.md` começa com este bloco, antes do título:

```yaml
---
titulo: Site de escola de idiomas
slug: site-escola-idiomas
versao: 2.0.0
status: estavel
superficie: site
dominio: educacao
estende: nenhum
idioma: pt-BR
acessibilidade: WCAG 2.2 AA
atualizado: 2026-10-09
---
```

| Campo | Valores | Regra |
| --- | --- | --- |
| `titulo` | texto | Igual ao título de nível 1 do documento. Sem marca de terceiros. |
| `slug` | `<superficie>-<tema>` | Igual ao nome da pasta. |
| `versao` | `MAIOR.MENOR.CORRECAO` | Ver "Versão e changelog". |
| `status` | `rascunho`, `estavel`, `obsoleto` | `estavel` exige auditoria sem achado crítico em aberto. |
| `superficie` | lista fechada acima | Igual ao prefixo do slug. |
| `dominio` | uma palavra | Setor a que se aplica; `geral` quando não há. |
| `estende` | `nenhum` ou o slug de outro PRD | Ver "Um PRD por projeto". |
| `idioma` | `pt-BR` | Identificadores de código ficam como são. |
| `acessibilidade` | `WCAG 2.2 AA` | O piso do repositório. Um PRD pode exigir mais, nunca menos. |
| `atualizado` | `AAAA-MM-DD` | Data da última mudança de versão. |

## Seções obrigatórias

Todo `prd.md` tem um único título de nível 1, igual ao campo `titulo`, e quatro seções cujo título contém exatamente estas palavras. O título pode ter número ou complemento (`## 9. Acessibilidade`).

| Seção | Onde | O que traz |
| --- | --- | --- |
| **Escopo** | logo depois da abertura | três itens: *Use para*, *Não use para*, *Relação com outros PRDs* |
| **Como usar** | depois do Escopo | o que entregar ao agente e com que frase |
| **Acessibilidade** | onde fizer sentido | a tabela de contraste de todo par de texto e fundo que o documento prescreve |
| **Checklist de aceite** | perto do fim | só itens que alguém consegue verificar |

O resto do conteúdo segue a estrutura que fizer sentido para o PRD. O modelo em [`prds/modelo-de-prd.md`](../prds/modelo-de-prd.md) traz um esqueleto.

## Um PRD por projeto

Cada PRD é autossuficiente: define sozinho fonte, cor, medidas e comportamento. Os PRDs deste repositório são estilos alternativos, não camadas que se somam. Dois deles entregues ao mesmo agente dão ordens opostas.

- No projeto de destino, o PRD escolhido é copiado para a raiz com o nome `PRD-FRONTEND.md`.
- Um PRD só pode depender de outro se declarar `estende: <slug>`. Nesse caso ele diz, em *Relação com outros PRDs*, o que herda e que ele próprio prevalece onde os dois divergem.
- Um PRD novo que se sobrepõe a um existente precisa dizer, no *Escopo* dos dois, quando se usa um e quando se usa o outro.

## Regras de conteúdo

1. **Todo número é reproduzível.** Razão de contraste é calculada pela fórmula de luminância relativa da WCAG, com os dois hex ao lado do resultado. Medição de terceiros traz o método; sem método, é escrita como observação do autor.
2. **Um valor, um lugar.** Cada medida é declarada uma vez, como token. Texto, tokens, exemplos de código, checklist e prompt dizem a mesma coisa.
3. **Sem faixa onde o agente precisa escolher.** "Raio de 6 a 8px" vira um valor, ou uma regra que diz quando é 6 e quando é 8.
4. **Sem adjetivo no lugar de medida.** "Respiro generoso" e "sombra sutil" não são especificação.
5. **Estados completos.** Componente interativo tem padrão, hover, foco, ativo, desabilitado e erro. Tela tem carregando, vazio e erro.
6. **Cor nunca é o único sinal.** Estado, categoria e erro têm também texto, peso, ícone ou posição.
7. **Foco visível sempre**, com contraste de pelo menos 3:1 contra todos os fundos em que o componente aparece.
8. **Dados pessoais.** Formulário que coleta dado pessoal diz a finalidade e onde está a política. Exemplos usam só dados fictícios.
9. **Marca de terceiros.** Um site real pode ser citado como origem de uma observação. Logo, nome, texto e imagem dele não entram no PRD nem nos exemplos.
10. **Código que funciona como está escrito.** Uma receita de CSS colada num arquivo vazio produz o que o texto promete.

## PRD extraído de um produto existente

Boa parte dos PRDs nasce de uma interface que já existe. Nesse caso:

1. **O código implementado é a fonte de verdade.** Estudos, protótipos e propostas explicam o porquê, mas valem só onde o código não diz outra coisa. As divergências encontradas vão para o `CHANGELOG.md`, com a escolha feita.
2. **A origem é citada pelo nome do produto e pela data da decisão**, não por caminho local: quem lê no GitHub não tem acesso à máquina do autor.
3. **O PRD descreve o estilo, não o produto.** Entidades, regras de negócio e integrações do produto de origem só aparecem como exemplo, marcadas como tal.
4. **Inspiração em marca de terceiros fica no padrão de interação.** "A agenda funciona como a lista de conversas de um aplicativo de mensagem" é uma regra válida; o logotipo, as cores e os textos desse aplicativo não entram.
5. **Começa em `status: rascunho`** e só passa a `estavel` depois da auditoria.

## Exemplos

- Cada PRD tem pelo menos dois exemplos, de telas de natureza diferente.
- Um exemplo é um arquivo HTML único, com CSS no `<style>`, sem framework e sem imagem externa. Fotos são substituídas por SVG ou blocos de cor.
- Marca, nomes e dados são fictícios.
- O `.png` é a captura do `.html`, na largura de 1440px ou no tamanho de referência que o PRD fixar.
- `capa.png` é a primeira dobra (1440 × 900) do exemplo principal. É a imagem que aparece no catálogo do README.
- Os exemplos seguem a versão atual do `prd.md`. Mudou uma medida ou uma regra, os exemplos são refeitos.

Para capturar um exemplo com o Chrome:

```bash
chrome --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1440,900 --virtual-time-budget=8000 --screenshot=exemplos/painel.png exemplos/painel.html
```

Para página inteira, aumente a altura da janela até a altura do documento.

Para celular, a janela do Chrome headless não fica mais estreita que 500px: com `--window-size=375,812` o layout sai com 500px e a imagem é cortada. Capture uma página auxiliar que carregue o exemplo num `<iframe>` de 375 × 812 e recorte a imagem nessa área.

## Versão e changelog

| Parte | Sobe quando |
| --- | --- |
| MAIOR | a mudança altera uma tela já construída com o PRD: valor de token, medida, regra |
| MENOR | algo é acrescentado sem alterar o que existia: componente, estado, seção |
| CORRECAO | texto, exemplo ou referência é corrigido sem mudar nenhuma prescrição |

Toda mudança de versão entra no `CHANGELOG.md` da pasta do PRD, com a versão mais nova em cima:

```markdown
## 2.1.0 — 2026-11-03

### Corrigido
### Adicionado
### Removido
### Decisões para o autor revisar
```

Em *Corrigido*, valor antigo e valor novo aparecem lado a lado. A data da versão mais recente é a mesma do campo `atualizado` do `prd.md`, e a versão aparece também na linha do PRD no catálogo do README (com o status, quando não é `estavel`).

## Auditoria

Um PRD passa por auditoria antes de receber `status: estavel` e a cada versão MAIOR. A auditoria verifica coerência interna, padrões, acessibilidade, ambiguidade e erros pontuais, e monta pelo menos duas telas seguindo o documento à risca.

- O resultado fica em `docs/auditorias/<AAAA-MM-DD>/<slug>/auditoria.md`.
- A versão exata que foi auditada é guardada ao lado, como `original.md`. Os números de linha da auditoria se referem a ela.
- Auditoria é registro: depois de gravada, não é reescrita. Correções vão para o PRD e para o changelog dele.

## Antes de publicar um PRD

Os exemplos passam por `node bin/kit.mjs verificar <arquivo>` sem falha. Hoje há falhas conhecidas, listadas em [pendencias.md](pendencias.md).

O validador confere nomes, cabeçalhos, seções obrigatórias, pares de exemplo, versão e data do changelog, a linha do catálogo, a auditoria de todo PRD `estavel`, os links entre arquivos e os limites da skill:

```bash
node ferramentas/validar.mjs
```

Ele não julga o conteúdo. Os itens abaixo continuam sendo de quem escreve:

- [ ] `node ferramentas/validar.mjs` termina sem problema.
- [ ] Pasta em `prds/<superficie>-<tema>/`, com `prd.md`, `CHANGELOG.md` e `exemplos/`.
- [ ] Cabeçalho completo; `slug` igual ao nome da pasta; `titulo` igual ao título de nível 1.
- [ ] Seções *Escopo*, *Como usar*, *Acessibilidade* e *Checklist de aceite* presentes.
- [ ] Todo par de texto e fundo prescrito tem o contraste calculado e passa em WCAG 2.2 AA.
- [ ] Nenhum valor aparece com dois números diferentes no documento.
- [ ] Nenhuma faixa nem adjetivo onde o agente precisaria escolher.
- [ ] Pelo menos dois exemplos, com `.html`, `.png` e `capa.png`, feitos com a versão atual.
- [ ] Nenhuma marca de terceiros nem dado real em nomes, texto ou exemplos.
- [ ] Linha do PRD acrescentada ao catálogo do [README](../README.md).
