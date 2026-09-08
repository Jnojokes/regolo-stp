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

# --- D: il masthead allargato ------------------------------------------------
# Anybody istanziato a `wdth 150 / wght 900`: un solo taglio, statico.
#
# Perche' Anybody, e perche' questa e' UNA decisione e non due. Il committente
# ha chiesto due cose separate — «font piu' display e allargato» e «le interlinee
# che si sovrappongono vanno ampliate» — e misurando i sei file veri di
# public/fonts si scopre che sono la stessa cosa. La soglia sotto la quale un
# testo che il browser manda a capo si tocca davvero e' `alto(E-accentata) +
# basso(g)`, letta dai contorni con fontTools:
#
#   Anybody 1,019 · Archivo 1,050 · Elsie 1,094 · Caveat 1,101
#   Inter   1,158 · Plex Mono 1,161
#
# Storey — la reference di D, e l'unica del tier A — ha «interlinea 1,0 esatta a
# ogni corpo display», misurata. Con Inter (1,158) quel valore e' irriproducibile:
# i titoli di D stavano a 63,4 px con interlinea 63,4 e si toccavano, ed e' il
# difetto che il committente ha visto. Anybody sta a 1,019, cioe' e' l'unica
# famiglia del repo che regge l'1,0 su piu' righe. Quindi il masthead allargato e
# l'interlinea stretta si ottengono con la stessa scelta.
#
# `wdth 150` e' il massimo dell'asse (50-150) ed e' il senso della riga: e' il
# masthead *esteso*, non un peso in piu'. `wght 900` e' anch'esso il massimo.
# Statico e non variabile: D usa un taglio solo, e un file variabile con due assi
# per un taglio solo e' peso regalato.
#
# Questa riga era stata scritta e poi tolta nel commit 2d2be75, quando usciva la
# direzione «la parete» che la usava. Torna per un motivo misurato, non perche'
# c'era.
fai anybody-wide \
  "https://cdn.jsdelivr.net/fontsource/fonts/anybody:vf@latest/latin-wdth-normal.woff2" \
  "wght=900 wdth=150" \
  "anybody-wide-regolo-latin-900.woff2"

# Il mono tecnico dell'opzione B. Non e' un ripensamento sul divieto della
# fase 3 bis («niente monospace per le etichette dati», cluster n. 5): e' che il
# brief visivo e' cambiato. Le tre reference scelte dal committente hanno tutte
# lo stesso gesto centrale — «editorial sans + technical mono» — e la mono ci
# sta SOLO sotto i 14 px, come annotazione, mai come contenuto.
fai plexmono \
  "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-mono@latest/latin-400-normal.woff2" \
  "" \
  "plexmono-regolo-latin-400.woff2"

# --- C e D: la copia di interfaccia -----------------------------------------
# Inter: il sostituto dichiarato di Neue Haas Unica (C) e di Helvetica Neue (D).
# Una famiglia sola per tutta la copia di interfaccia, pesi 400 e 700 in C,
# 400 e 500 in D.
fai inter \
  "https://cdn.jsdelivr.net/fontsource/fonts/inter:vf@latest/latin-wght-normal.woff2" \
  "wght=400:700" \
  "inter-regolo-latin-var.woff2"

# Anybody Wide (35,9 KB) e Source Serif 4 (32,0 KB) erano il display di «la
# parete» e il corpo di «il marmo»: le due direzioni scartate dal committente
# (DECISIONI n. 37). Sono uscite di qui e dal repo — un file generato che
# nessun @font-face nomina non e' un avanzo innocuo, e' 68 KB che alla prossima
# lettura qualcuno prova a rimettere in pagina.

# --- opzione C «la fonderia» (Studio Foundry) -------------------------------
# Elsie 900: e' **il** carattere del display di Studio Foundry, e qui non e' un
# sostituto ne' un'ispirazione — il committente ha chiesto quella pagina.
# Serif ad altissimo contrasto, sempre TUTTO MAIUSCOLO e mai sotto i 40 px: a
# corpo piccolo le grazie sottili spariscono e resta una macchia.
fai elsie \
  "https://cdn.jsdelivr.net/fontsource/fonts/elsie@latest/latin-900-normal.woff2" \
  "" \
  "elsie-regolo-latin-900.woff2"

# --- opzione D «la casa» (Storey) -------------------------------------------
# La calligrafica. Storey usa **Biro una volta sola in tutta la pagina** — e' la
# sua firma, ed e' una firma proprio perche' non si ripete. Caveat e' il
# sostituto OFL: entra in un punto solo, e se un giorno se ne trova un secondo
# la regola e' stata violata.
fai caveat \
  "https://cdn.jsdelivr.net/fontsource/fonts/caveat:vf@latest/latin-wght-normal.woff2" \
  "wght=500" \
  "caveat-regolo-latin-500.woff2"

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
    # Le famiglie che non portano mai un dato non hanno bisogno di `tnum`: una
    # monospace ce l'ha per costruzione (tutte le cifre sono gia' larghe uguale),
    # e una calligrafica non incolonnera' mai niente — Caveat entra in pagina
    # una volta sola, per una riga scritta a mano. Chiederlo a loro sarebbe
    # pretendere una chiave inglese da una chiave fissa.
    # Le famiglie di solo display: entrano in pagina a corpo grande e non
    # portano mai una colonna di numeri. Elsie sta sempre TUTTO MAIUSCOLO sopra
    # i 40 px; Caveat entra una volta sola, per una riga scritta a mano.
    SOLO_DISPLAY = ("elsie", "caveat")
    senza_dati = mono or os.path.basename(f).startswith(SOLO_DISPLAY)
    if not senza_dati:
        assert "tnum" in gsub, f"{f}: manca tnum, le colonne di numeri si disallineano"
    nota = "monospace" if mono else ("senza dati" if senza_dati else "tnum:sì")
    print(f"  {os.path.basename(f)}  {assi}  {nota}  glifi:{len(t.getGlyphOrder())}")
PY
