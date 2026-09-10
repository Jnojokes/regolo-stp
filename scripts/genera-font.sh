#!/usr/bin/env bash
# Genera i font del sito in public/fonts. Uno per proposta, piu' la mono di C.
#
#   A  Archivo        (OFL, fontsource)   — il progetto
#   B  Montserrat     (OFL, fontsource)   — ecoLINEAR Studio, misurato: una sola famiglia
#   C  General Sans   (ITF, Fontshare)    — Halston, 298 nodi di testo su 332
#      JetBrains Mono (OFL, fontsource)   — Halston, i valori e le micro-etichette
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

# Nota per chi rilancia questo script: `varLib.instancer` riscrive
# `head.modified` con l'ora corrente, e `pyftsubset` non la ricalcola (il suo
# default e' `--no-recalc-timestamp`). Quindi **ogni** rigenerazione fa comparire
# i quattro file come modificati in git anche quando i contorni sono identici:
# il delta e' un timestamp piu' il checksum che ne dipende. Succede anche ad
# Archivo, che e' il font dell'opzione A, e A non si tocca. Il modo di sapere se
# un font e' cambiato davvero non e' l'hash: e' confrontare glifi, avanzamenti,
# `cmap`, assi e `hhea`/`OS/2` con fontTools. Se il confronto dice «zero
# avanzamenti diversi», il file rigenerato si butta e si tiene quello in repo.

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

# ============================================================================
# OPZIONE B «ecoLINEAR» — https://ecolinearstudio.com/
# ============================================================================
# **Montserrat, e nient'altro.** Misurato sul sito vero con Playwright:
# `famiglie: [['Montserrat', 60]]`, cioe' **una sola famiglia su 60 nodi di
# testo**, con i pesi 300 · 400 · 500 · 600 · 700. Non e' un sostituto ne'
# un'interpretazione: e' il carattere di quella pagina, e il committente ha
# chiesto quella pagina.
#
# I pesi non si stringono piu' di 300:700 perche' li usa tutti: 300 sulle
# annotazioni, 400 sul corpo, 500 sui numeri delle fasi, 600 sui titoli e sulla
# nav, 700 sul nome dello studio dentro il testo.
fai montserrat \
  "https://cdn.jsdelivr.net/fontsource/fonts/montserrat:vf@latest/latin-wght-normal.woff2" \
  "wght=300:700" \
  "montserrat-regolo-latin-var.woff2"

# ============================================================================
# OPZIONE C «Halston» — https://halston-architecture-template.webflow.io/
# ============================================================================
# Due famiglie, misurate: `General Sans` su **298 nodi** e `JetBrains Mono` su
# **34**. La mono non e' decorazione: porta i valori (`48+ HOUSES`,
# `AVG. 14 MONTHS`) e le micro-etichette maiuscole, che su quella pagina sono
# 270 occorrenze.
#
# **LICENZA, e va detta.** General Sans non e' OFL: e' ITF (Indian Type
# Foundry) sotto la loro licenza gratuita, che permette l'uso commerciale e il
# self-hosting. Tutto il resto del repo viene da fontsource in OFL, quindi
# questa e' una **deviazione dichiarata**: la ragione e' che il committente ha
# chiesto quel sito «identico», e General Sans e' il suo carattere. Se un
# giorno la licenza dovesse dare fastidio, il sostituto piu' vicino in OFL e'
# Hanken Grotesk o Be Vietnam Pro — ma non sono lo stesso carattere, e la
# differenza si vede sulle maiuscole strette.
#
# **TRAPPOLA della sorgente**: Fontshare serve i file da URL con un hash, che
# cambia quando ITF ricompila il font. Quindi l'indirizzo qui sotto si ricava
# dal loro CSS a ogni generazione invece di essere scritto a mano.
GS_URL="https://$(curl -sS 'https://api.fontshare.com/v2/css?f[]=general-sans@1,2' \
  | grep -o 'cdn.fontshare.com/wf/[A-Z0-9/]*\.woff2' | head -1)"
echo "· General Sans: $GS_URL"
fai general-sans \
  "$GS_URL" \
  "wght=400:600" \
  "generalsans-regolo-latin-var.woff2"

# La mono di Halston. Torna in repo dopo essere uscita alla fase 3 bis
# («niente monospace per le etichette dati», cluster n. 5, −31 KB): quel
# divieto difendeva il progetto da un **default**, e qui non e' un default —
# e' il carattere che quella pagina usa per i suoi valori. Un solo peso: 400.
fai jetbrains-mono \
  "https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono:vf@latest/latin-wght-normal.woff2" \
  "wght=400" \
  "jetbrainsmono-regolo-latin-400.woff2"

# ============================================================================
# USCITI DAL REPO, e perche'
# ============================================================================
# Elsie 900, Anybody Wide 900, Inter, IBM Plex Mono, Caveat 500 erano il
# sistema tipografico delle due proposte precedenti — «La fonderia» su Studio
# Foundry e «La monografia» su Storey. Il committente ha indicato due siti
# diversi e ha chiesto di cancellare quello che non serve piu'.
#
# Un file generato che nessun `@font-face` nomina non e' un avanzo innocuo:
# alla prossima lettura qualcuno prova a rimetterlo in pagina. Le righe che li
# scaricavano sono state cancellate insieme ai file.

# ============================================================================
# LE ANTEPRIME DEL LINK (Open Graph) — istanze statiche per `next/og`
# ============================================================================
# `next/og` (satori) non legge i woff2 e non interpola gli assi: vuole un TTF
# per peso. Si ricavano dai file appena generati, quindi hanno lo stesso
# sottoinsieme latino e non si scarica niente di piu'. Si leggono a build time
# e non arrivano mai al browser. Uno per ogni peso che l'anteprima usa, e
# nessuno di riserva (DECISIONI.md n. 55):
#   B  Montserrat 300 (il marchio) e 400 (la riga dell'h1)
#   C  General Sans 500 (titolo, discipline, valore) e JetBrains Mono 400
# Le due istanze di Archivo in `assets/og/` sono piu' vecchie di questa sezione
# e da qui non si rigenerano: sono l'anteprima di A, e A non si tocca.
echo
echo "· anteprime del link (assets/og)"
"$TMP/venv/bin/python" - "$DEST" "assets/og" <<'PY'
import sys, os
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
sorgente, uscita = sys.argv[1], sys.argv[2]
for file, nome, pesi in (
    ("montserrat-regolo-latin-var.woff2", "montserrat", (300, 400)),
    ("generalsans-regolo-latin-var.woff2", "generalsans", (500,)),
    ("jetbrainsmono-regolo-latin-400.woff2", "jetbrainsmono", (400,)),
):
    for peso in pesi:
        f = TTFont(os.path.join(sorgente, file))
        # La mono e' gia' statica: senza `fvar` l'instancer fallirebbe.
        if "fvar" in f:
            f = instancer.instantiateVariableFont(f, {"wght": peso}, updateFontNames=False)
        f.flavor = None
        dst = os.path.join(uscita, f"{nome}-{peso}.ttf")
        f.save(dst)
        print(f"  {dst}  {os.path.getsize(dst)} byte")
PY

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
    # `tnum` serve a rendere tabellari le cifre di una famiglia proporzionale,
    # e serve **solo a chi porta una colonna di numeri**. Chiederlo a tutti
    # sarebbe pretendere una chiave inglese da una chiave fissa.
    #
    # Chi ne ha bisogno, e perche':
    #   Archivo (A)     si': le sue cifre incolonnano i dati duri delle schede
    #                   progetto, e A non ha una monospace.
    #   Montserrat (B)  si': in ecoLINEAR i numeri delle fasi (01-04) e le
    #                   cifre stanno nella stessa famiglia, che e' l'unica.
    #
    # Chi non ne ha bisogno:
    #   una monospace   ce l'ha per costruzione, tutte le cifre sono gia' larghe
    #                   uguale, e infatti non espone la funzione.
    #   General Sans (C) **no, e non e' un difetto**: in Halston i valori
    #                   incolonnati (`48+ HOUSES`, `AVG. 14 MONTHS`) stanno in
    #                   JetBrains Mono, misurato — 34 nodi su 332. La
    #                   proporzionale non porta mai un dato in colonna, quindi
    #                   non le si chiede una funzione che non usa.
    mono = t["post"].isFixedPitch != 0
    SENZA_COLONNE = ("generalsans",)
    senza_dati = mono or os.path.basename(f).startswith(SENZA_COLONNE)
    if not senza_dati:
        assert "tnum" in gsub, f"{f}: manca tnum, le colonne di numeri si disallineano"
    nota = "monospace" if mono else ("i numeri li porta la mono" if senza_dati else "tnum:sì")
    print(f"  {os.path.basename(f)}  {assi}  {nota}  glifi:{len(t.getGlyphOrder())}")
PY
