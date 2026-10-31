#!/usr/bin/env python3
"""Converte um texto em curvas SVG, para o logotipo não depender de fonte instalada.

Uso: python logotipo.py <fonte.ttf|otf> "Nome" saida.svg [--peso 700] [--espaco 0] [--cor "#14304f"]
Requer: pip install fonttools. WOFF2 também pede: pip install brotli.
Não aplica kerning: olhe o resultado e ajuste --espaco, em unidades da fonte.
"""
import argparse
import sys

try:
    from fontTools.pens.boundsPen import BoundsPen
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.pens.transformPen import TransformPen
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer
except ImportError:
    sys.exit("Falta o fonttools. Instale com: pip install fonttools")

p = argparse.ArgumentParser(description="Converte texto em curvas SVG")
p.add_argument("fonte")
p.add_argument("texto")
p.add_argument("saida")
p.add_argument("--peso", type=float, help="peso, em fonte variável")
p.add_argument("--espaco", type=float, default=0, help="espaço extra entre letras, em unidades da fonte")
p.add_argument("--cor", default="currentColor")
a = p.parse_args()

fonte = TTFont(a.fonte)
if "fvar" in fonte and a.peso is not None:
    fonte = instancer.instantiateVariableFont(fonte, {"wght": a.peso})
glifos = fonte.getGlyphSet()
mapa = fonte.getBestCmap()
faltam = sorted({c for c in a.texto if ord(c) not in mapa})
if faltam:
    sys.exit(f"A fonte não tem: {' '.join(faltam)}")

caneta = SVGPathPen(glifos)
limites = BoundsPen(glifos)
x = 0
for c in a.texto:
    glifo = glifos[mapa[ord(c)]]
    transformacao = (1, 0, 0, -1, x, 0)
    glifo.draw(TransformPen(caneta, transformacao))
    glifo.draw(TransformPen(limites, transformacao))
    x += glifo.width + a.espaco
if not limites.bounds:
    sys.exit("O texto não tem nenhuma forma para desenhar.")

x0, y0, x1, y1 = limites.bounds
rotulo = a.texto.replace("&", "&amp;").replace("<", "&lt;").replace('"', "&quot;")
svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x0:g} {y0:g} {x1 - x0:g} {y1 - y0:g}" role="img" aria-label="{rotulo}">'
    f'<title>{rotulo}</title><path fill="{a.cor}" d="{caneta.getCommands()}"/></svg>\n'
)
with open(a.saida, "w", encoding="utf-8") as f:
    f.write(svg)
print(f"{a.saida}: {x1 - x0:g} × {y1 - y0:g} unidades, sem kerning. Confira no olho, com 24px de altura.")
