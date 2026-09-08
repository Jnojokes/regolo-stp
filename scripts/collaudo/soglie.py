"""Le soglie d'interlinea, misurate dai contorni dei font veri.

Le tabelle in `interlinee.mjs` e in `app/globals.css` vengono da qui. Non sono
le metriche dichiarate in `hhea`/`OS/2` — quelle descrivono la **scatola di
riga**, non l'inchiostro, e sbagliano nella direzione sbagliata: `hhea` di Inter
dà 1,210 dove l'inchiostro chiede 1,158, quindi allargherebbe l'interlinea di
mezzo pixel in più del necessario su ogni titolo del sito.

Quello che si tocca sono i **contorni**: la coda di una discendente della riga
sopra contro il punto più alto della riga sotto. E su un sito italiano il punto
più alto **non è la maiuscola: è l'accento sulla maiuscola** — in Inter la `E`
sale a 0,728 em e la `È` a 0,942. Chi misura la cap-height sbaglia di due
decimi di em, che a 63 px sono 13 px, ed è esattamente il difetto che il
committente ha visto nei titoli dell'opzione D.

Due colonne, perché un testo tutto maiuscolo non ha discendenti tranne la coda
della `Q` e può stare molto più stretto: è la ragione per cui il marchio di C in
Elsie maiuscolo regge un'interlinea che un titolo in Inter non regge.

Uso:
    python3 -m venv /tmp/ft && /tmp/ft/bin/pip -q install fonttools brotli
    /tmp/ft/bin/python scripts/collaudo/soglie.py
"""

import glob
import hashlib
import json
import os

from fontTools.pens.boundsPen import BoundsPen
from fontTools.ttLib import TTFont

# Niente categorie: la soglia si calcola **sui caratteri che ci sono davvero**.
#
# Provare a dividere il mondo in «testo misto» e «tutto maiuscolo» sembrava
# ragionevole e non regge: in Elsie il maiuscolo con accenti (`Ì` più la coda
# della `Q`) chiede **1,121**, cioè *più* del testo misto (1,094), mentre
# `REGOLO STP` — che non ha né accenti né `Q` — sta comodo a 0,80. Due stringhe
# tutte maiuscole possono avere soglie diverse del 40 %, quindi la categoria non
# è l'unità di misura giusta: il carattere lo è.
#
# Da qui esce una tabella per-carattere che `interlinee.mjs` usa per calcolare la
# soglia della stringa vera che ha in pagina.

RADICE = os.path.join(os.path.dirname(__file__), '..', '..', 'public', 'fonts')


def estremo(font, upm, caratteri, alto):
    """Il punto d'inchiostro più alto (o più basso) fra i caratteri dati."""
    cmap = font.getBestCmap()
    glifi = font.getGlyphSet()
    valore = 0.0
    for ch in caratteri:
        nome = cmap.get(ord(ch))
        if not nome or nome not in glifi:
            continue
        pen = BoundsPen(glifi)
        glifi[nome].draw(pen)
        if not pen.bounds:
            continue
        y = pen.bounds[3] if alto else pen.bounds[1]
        if (alto and y / upm > valore) or (not alto and y / upm < valore):
            valore = y / upm
    return valore


def tabella(font, upm):
    """Per ogni carattere: quanto sale e quanto scende il suo inchiostro, in em."""
    cmap = font.getBestCmap()
    glifi = font.getGlyphSet()
    fuori = {}
    for punto, nome in cmap.items():
        if nome not in glifi or punto < 32 or punto > 0x2FFF:
            continue
        pen = BoundsPen(glifi)
        try:
            glifi[nome].draw(pen)
        except Exception:
            continue
        if not pen.bounds:
            continue
        alto = round(pen.bounds[3] / upm, 4)
        basso = round(pen.bounds[1] / upm, 4)
        fuori[chr(punto)] = [alto, basso]
    return fuori


# Un file per tema, e la chiave è quella che `interlinee.mjs` ricava dalla
# `font-family` calcolata in pagina. La tabella si rigenera **quando cambiano i
# font**: le impronte stampate qui sotto sono l'unico modo di accorgersi che
# `soglie.json` descrive dei caratteri che non sono più in `public/fonts`.
CHIAVI = {
    'archivo-regolo-latin-var.woff2': 'archivo',
    'montserrat-regolo-latin-var.woff2': 'montserrat',
    'generalsans-regolo-latin-var.woff2': 'generalsans',
    'jetbrainsmono-regolo-latin-400.woff2': 'jetbrainsmono',
}

fuori = {}
print(f'{"file":40s} {"peggiore":>9s} {"REGOLO":>8s} {"impronta":>9s}  (soglia in em)')
for percorso in sorted(glob.glob(os.path.join(RADICE, '*.woff2'))):
    base = os.path.basename(percorso)
    if base not in CHIAVI:
        continue
    font = TTFont(percorso)
    upm = font['head'].unitsPerEm
    tab = tabella(font, upm)
    with open(percorso, 'rb') as f:
        impronta = hashlib.sha256(f.read()).hexdigest()[:6]
    fuori[CHIAVI[base]] = {'impronta': impronta, 'glifi': tab}

    def soglia(testo):
        alti = [tab[c][0] for c in testo if c in tab]
        bassi = [tab[c][1] for c in testo if c in tab]
        return (max(alti) if alti else 0) - (min(bassi) if bassi else 0)

    peggiore = soglia(''.join(tab.keys()))
    print(
        f'{base:40s} {peggiore:9.3f} {soglia("REGOLO STP"):8.3f} {impronta:>9s}'
    )

DESTINAZIONE = os.path.join(os.path.dirname(__file__), 'soglie.json')
with open(DESTINAZIONE, 'w') as f:
    json.dump(fuori, f, separators=(',', ':'), ensure_ascii=False)
print(f'\nscritto {os.path.relpath(DESTINAZIONE)} — {os.path.getsize(DESTINAZIONE)} byte')
