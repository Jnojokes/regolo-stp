#!/usr/bin/env bash
# Genera i due font del sito in public/fonts, dalla sorgente OFL su fontsource.
#
# Perché uno script e non due file scaricati a mano: il file di fontsource con
# l'asse di larghezza pesa 90 KB, e a noi servono due assi ristretti e il solo
# latino. Instancer + subset portano Archivo da 90,1 a 40,6 KB e Chivo da 33,2 a
# 27,0 — cioè 66 KB per le due rotte contro i 123 dei file interi, sul percorso
# critico di un LCP che è testo.
#
# Uso:  bash scripts/genera-font.sh
# Serve: python3 (crea un venv usa-e-getta con fonttools + brotli), curl.
#
# Gli assi NON si stringono più di così, e il motivo è in pagina:
#   Archivo wght 400:600 — 400 corpo, 500 titoli, 600 mai (riserva)
#           wdth  62:100 — 100 e 75 a 1440, 88 e 66 a 390, 82 e 62 a 320.
#                          L'asse di larghezza è la leva del mobile: il display
#                          si stringe per stare in riga, che è il gesto del
#                          disegnatore dentro una quota (kit/reference/_provini).
#   Chivo   wght 400:600 — B non stringe niente: non ha asse di larghezza e non
#                          gli serve, perché il suo display è 43,6 px e non 152.
#
# Trappola verificata con fontTools, da non dimenticare mai:
#   il peso di DEFAULT di Archivo è 600 e quello di Chivo è 500. Se il CSS non
#   dichiara `font-weight`, il testo di corpo esce semibold. Per questo
#   `lib/fonts/*.ts` dichiara `weight: '400 600'` e `@layer base` mette un
#   `font-weight: 400` esplicito su `body`.
set -euo pipefail

cd "$(dirname "$0")/.."
DEST="public/fonts"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Latino di base + i pochi segni che il sito usa davvero (✕ dell'errore del
# brief, ≤ ≥ delle specifiche, © § ° ─, le frecce dei controlli). Le frecce
# ornamentali in coda ai link non ci sono più: vedi CLAUDE.md § Direzione visiva.
LAT="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2190-2193,U+2194,U+2212,U+2215,U+2264-2265,U+2500,U+25B8,U+25C2,U+2715,U+FEFF,U+FFFD"
FEAT="ccmp,liga,locl,rvrn,tnum,pnum,frac,numr,dnom,kern,mark,mkmk"

echo "· venv usa-e-getta"
python3 -m venv "$TMP/venv" >/dev/null
"$TMP/venv/bin/pip" install --quiet fonttools brotli

fai() { # nome  url  assi  uscita
  local nome="$1" url="$2" assi="$3" out="$4"
  echo "· $nome"
  curl -sSL -o "$TMP/$nome.woff2" "$url"
  local prima; prima=$(wc -c <"$TMP/$nome.woff2")
  # shellcheck disable=SC2086
  "$TMP/venv/bin/fonttools" varLib.instancer "$TMP/$nome.woff2" $assi -o "$TMP/$nome-inst.ttf" >/dev/null
  "$TMP/venv/bin/pyftsubset" "$TMP/$nome-inst.ttf" \
    --unicodes="$LAT" --layout-features="$FEAT" \
    --flavor=woff2 --output-file="$DEST/$out"
  local dopo; dopo=$(wc -c <"$DEST/$out")
  echo "  $prima → $dopo byte  ($out)"
}

fai archivo \
  "https://cdn.jsdelivr.net/fontsource/fonts/archivo:vf@latest/latin-wdth-normal.woff2" \
  "wght=400:600 wdth=62:100" \
  "archivo-regolo-latin-var.woff2"

fai chivo \
  "https://cdn.jsdelivr.net/fontsource/fonts/chivo:vf@latest/latin-wght-normal.woff2" \
  "wght=400:600" \
  "chivo-regolo-latin-var.woff2"

echo
echo "Fatto. Controllo degli assi e delle funzioni tipografiche:"
"$TMP/venv/bin/python" - "$DEST" <<'PY'
import sys, glob, os
from fontTools.ttLib import TTFont
for f in sorted(glob.glob(os.path.join(sys.argv[1], "*-regolo-*.woff2"))):
    t = TTFont(f)
    assi = [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in t["fvar"].axes]
    gsub = sorted({r.FeatureTag for r in t["GSUB"].table.FeatureList.FeatureRecord})
    assert "tnum" in gsub, f"{f}: manca tnum, le colonne di numeri si disallineano"
    print(f"  {os.path.basename(f)}  {assi}  tnum:sì  glifi:{len(t.getGlyphOrder())}")
PY
