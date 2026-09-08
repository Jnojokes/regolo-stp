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
  # Con assi vuoti la famiglia e' statica: `varLib.instancer` fallirebbe (nessuna
  # tabella `fvar`) e `set -euo pipefail` farebbe cadere tutto lo script.
  if [ -n "$assi" ]; then
    # shellcheck disable=SC2086
    "$TMP/venv/bin/fonttools" varLib.instancer "$TMP/$nome.woff2" $assi -o "$TMP/$nome-inst.ttf" >/dev/null
  else
    cp "$TMP/$nome.woff2" "$TMP/$nome-inst.ttf"
  fi
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

# Anybody, e l'asse di larghezza si blocca a 100 **dentro il file**.
# Non e' un dettaglio di pipeline: e' la ragione della scelta. «A comprime,
# B no» era una regola di CSS che qualcuno poteva disapplicare; cosi' il file
# di B non contiene l'asse e `font-stretch` in B non ha su cosa agire.
# Misurato dopo questa riga: fvar = [wght 400-600] e basta, 19.476 byte,
# `usWeightClass` 400 (la sorgente e' 100: la trappola del peso di default
# sparisce qui, ma il `font-weight` esplicito resta comunque), `tnum` presente.
fai anybody \
  "https://cdn.jsdelivr.net/fontsource/fonts/anybody:vf@latest/latin-wdth-normal.woff2" \
  "wght=400:600 wdth=100" \
  "anybody-regolo-latin-var.woff2"

# Il mono tecnico dell'opzione B. Non e' un ripensamento sul divieto della
# fase 3 bis («niente monospace per le etichette dati», cluster n. 5): e' che il
# brief visivo e' cambiato. Le tre reference scelte dal committente hanno tutte
# lo stesso gesto centrale — «editorial sans + technical mono» — e la mono ci
# sta SOLO sotto i 14 px, come annotazione, mai come contenuto.
fai plexmono \
  "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.woff2" \
  "" \
  "plexmono-regolo-latin-400.woff2"

# --- opzione C «la parete» (Iad-lab) ----------------------------------------
# Display: Anybody con l'asse di larghezza TENUTO e portato a 150 — e' il
# sostituto OFL piu' vicino a «Obviously Wide Black»: un grottesco meccanico
# largo e pesantissimo, che a 900 e wdth 150 fa la parola colossale che sborda.
# In B lo stesso file ha l'asse istanziato via a 100: stessa famiglia, due
# strumenti opposti, e nessuna delle due puo' fare il gesto dell'altra.
fai anybodywide \
  "https://cdn.jsdelivr.net/fontsource/fonts/anybody:vf@latest/latin-wdth-normal.woff2" \
  "wght=700:900 wdth=100:150" \
  "anybody-wide-regolo-latin-var.woff2"

# Inter: il sostituto dichiarato di Neue Haas Unica (C) e di Helvetica Neue (D).
# Una famiglia sola per tutta la copia di interfaccia, pesi 400 e 700 in C,
# 400 e 500 in D.
fai inter \
  "https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@latest/latin-wght-normal.woff2" \
  "wght=400:700" \
  "inter-regolo-latin-var.woff2"

# --- opzione D «il marmo» (IDHEAL) ------------------------------------------
# Il serif editoriale: New Century Schoolbook non e' libero, e i sostituti
# dichiarati sono Charter / Source Serif / Crimson. Source Serif 4 e' l'unico
# con un asse ottico, e a `opsz 20` ha le grazie robuste dello Schoolbook invece
# delle grazie fini di un didone — che sarebbe il cluster n. 1.
fai sourceserif \
  "https://cdn.jsdelivr.net/fontsource/fonts/source-serif-4:vf@latest/latin-opsz-normal.woff2" \
  "wght=400:600 opsz=20" \
  "sourceserif-regolo-latin-var.woff2"

# --- due istanze STATICHE per l'immagine Open Graph -------------------------
# `next/og` (satori) non legge i woff2 variabili: vuole un file statico a un
# peso fisso. Queste due non vengono servite al browser — stanno fuori da
# `public/` — e le legge solo `app/(a)/opengraph-image.tsx` a build time.
echo "· istanze statiche per l'Open Graph"
mkdir -p assets/og
for peso in 400 500; do
  "$TMP/venv/bin/fonttools" varLib.instancer "$TMP/archivo.woff2" \
    "wght=$peso" "wdth=100" -o "$TMP/og-$peso.ttf" >/dev/null
  "$TMP/venv/bin/pyftsubset" "$TMP/og-$peso.ttf" \
    --unicodes="$LAT" --layout-features="$FEAT" \
    --output-file="assets/og/archivo-$peso.ttf"
  echo "  assets/og/archivo-$peso.ttf  $(wc -c <"assets/og/archivo-$peso.ttf") byte"
done

echo
echo "Fatto. Controllo degli assi e delle funzioni tipografiche:"
"$TMP/venv/bin/python" - "$DEST" <<'PY'
import sys, glob, os
from fontTools.ttLib import TTFont
for f in sorted(glob.glob(os.path.join(sys.argv[1], "*-regolo-*.woff2"))):
    t = TTFont(f)
    assi = (
        [(a.axisTag, a.minValue, a.defaultValue, a.maxValue) for a in t["fvar"].axes]
        if "fvar" in t
        else "statico"
    )
    gsub = sorted({r.FeatureTag for r in t["GSUB"].table.FeatureList.FeatureRecord})
    # `tnum` serve a rendere tabellari le cifre di una famiglia proporzionale.
    # Una monospace ha gia' tutte le cifre della stessa larghezza per
    # definizione, e infatti IBM Plex Mono non espone la funzione: chiederla
    # anche a lei sarebbe come pretendere una chiave inglese da una chiave fissa.
    mono = t["post"].isFixedPitch != 0
    if not mono:
        assert "tnum" in gsub, f"{f}: manca tnum, le colonne di numeri si disallineano"
    print(f"  {os.path.basename(f)}  {assi}  {'monospace' if mono else 'tnum:sì'}  glifi:{len(t.getGlyphOrder())}")
PY
