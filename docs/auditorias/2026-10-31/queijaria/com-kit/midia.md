# Mídia do projeto

Tudo o que a interface precisa e que o agente não produz sozinho. O agente preenche; o dono aprova e gera o que faltar.

## Estilo único

Queijo Canastra visto de cima e de lado, em SVG, sem contorno, chapado: três tons por cura (casca clara aos 21 dias, ouro aos 45, âmbar aos 90), marcas de pano na lateral, sombra rasa no chão e a marca de ferro da Curral Velho (um C com um V dentro) queimada no topo. Sem gradiente, sem pessoa, sem tábua rústica. O desenho é do próprio projeto, feito à mão em SVG: não há prompt de gerador de imagem.

## Lista

| Arquivo | Onde aparece | Tamanho | Origem | Prompt ou fonte | Licença | Situação |
| --- | --- | --- | --- | --- | --- | --- |
| Queijo desenhado (símbolo `queijo` dentro de `entrega/tela.html`) | Vitrine do herói e régua das curas | Vetorial | Ilustração própria em SVG | Feito à mão, regra acima | Do projeto | Provisório: sai quando houver foto |
| `foto-queijo-heroi.webp` | Vitrine do herói, no lugar do desenho | 1200 × 900 | Foto real | Foto de um queijo inteiro, na cura de 45 dias, luz de janela, fundo liso e escuro, sem logotipo de terceiros | A da família | **Falta** |
| `foto-corte-21.webp`, `foto-corte-45.webp`, `foto-corte-90.webp` | Linhas de cada cura (opcional) | 800 × 600 | Foto real | Uma fatia de cada cura, de frente, mesma luz e mesmo fundo | A da família | **Falta** |
| Logo real, se a família já tiver | Cabeçalho | Vetorial | Arquivo da família | Mande o arquivo e as cores originais | A da família | **Falta** (o logotipo atual é provisório) |

## O que conferir

- Nenhuma pessoa gerada se passa por cliente, funcionário ou depoimento. Não há pessoa na página.
- Nenhuma marca ou personagem de terceiros.
- `alt` escrito para cada imagem que informa. O desenho do herói tem `role="img"` e descrição; os desenhos das curas são decorativos e têm o texto ao lado.
- Foto nova entra com `width` e `height`, WebP e `fetchpriority="high"` no herói.
