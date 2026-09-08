/**
 * Le interlinee che si sovrappongono, misurate — **sulla stringa vera**.
 *
 * Il committente ha detto: *«le interlinee che si sovrappongono vanno
 * ampliate»*. Questo script è la prova, e la regola che controlla è quella
 * scritta in `app/globals.css` § «L'interlinea è un numero misurato»:
 *
 *   **un testo che il browser manda a capo non scende sotto la soglia
 *   d'inchiostro dei caratteri che lo compongono.**
 *
 * Tre cose lo distinguono dal controllo ovvio (`line-height < font-size`):
 *
 * 1. **guarda quante righe occupa davvero.** Un titolo a interlinea 0,86 su una
 *    riga sola non ha niente da toccare; lo stesso titolo su due righe sì. Il
 *    conteggio si fa dividendo l'altezza resa per il passo di riga, sul DOM
 *    vero;
 * 2. **la soglia è l'inchiostro, non la scatola di riga.** Quello che si tocca
 *    sono i contorni. Le metriche dichiarate in `hhea`/`OS/2` descrivono la
 *    scatola, e sbagliano nella direzione costosa: per Inter danno 1,210 dove
 *    l'inchiostro chiede 1,232 nel caso peggiore e **0,750 su `REGOLO STP`**;
 * 3. **la soglia dipende dai caratteri che ci sono**, non da una categoria.
 *    Dividere il mondo in «testo misto» e «tutto maiuscolo» sembrava
 *    ragionevole e non regge: in Elsie il maiuscolo con accenti (`Ì` più la coda
 *    della `Q`) chiede 1,121, cioè *più* del testo misto, mentre `REGOLO STP` —
 *    che non ha né accenti né `Q` — sta comodo a **0,729**. Due stringhe tutte
 *    maiuscole possono avere soglie diverse del 40 %.
 *
 * E su un sito italiano l'alto **non è la maiuscola: è l'accento sulla
 * maiuscola.** In Inter la `E` sale a 0,728 em e la `È` a 0,942: chi misura la
 * cap-height sbaglia di due decimi di em, che a 63 px sono 13 px. È esattamente
 * il difetto che il committente ha visto nei titoli dell'opzione C, che stavano
 * a 63,36 px con interlinea 63,36.
 *
 * ## Da dove vengono i numeri
 *
 * `soglie.json`, generato da `soglie.py` leggendo i **contorni** dei file veri
 * di `public/fonts/` con fontTools: per ogni carattere, quanto sale e quanto
 * scende il suo inchiostro. Si rifà così:
 *
 *   python3 -m venv /tmp/ft && /tmp/ft/bin/pip -q install fonttools brotli
 *   /tmp/ft/bin/python scripts/collaudo/soglie.py
 *
 * Le impronte dei font stanno dentro `soglie.json`: se un file cambia, lo
 * script se ne accorge e lo dice, invece di misurare contro una tabella vecchia.
 *
 * Uso: `node interlinee.mjs` con il build di produzione su :3001.
 */
import { chromium } from 'playwright'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const SOGLIE = JSON.parse(readFileSync(new URL('./soglie.json', import.meta.url), 'utf8'))

/** Quale voce di `soglie.json` veste un `font-family` risolto dal browser. */
const FILE = {
  archivo: 'archivo-regolo-latin-var.woff2',
  montserrat: 'montserrat-regolo-latin-var.woff2',
  generalsans: 'generalsans-regolo-latin-var.woff2',
  jetbrainsmono: 'jetbrainsmono-regolo-latin-400.woff2',
}

const ROTTE = [
  ['A', '/'],
  ['B', '/opzione-b'],
  ['C', '/opzione-c'],
  ['studio', '/studio'],
  ['servizio', '/servizi/strutture'],
  ['progetti', '/progetti'],
  ['scheda', '/progetti/esempio-scheda'],
  ['contatti', '/contatti'],
]

/* L'eccezione della regola, e ce n'è **una**: le righe spezzate a mano. Lì la
   composizione è fissa e si verifica una volta, riga per riga. Un'eccezione che
   non è scritta da qualche parte è un difetto che nessuno rivede più, quindi
   sta qui e non in un commento sparso nel CSS. */
const ECCEZIONI = [
  {
    selettore: '.hero-payoff, .hero-payoff-esito, .hero-payoff-tecnico',
    perche:
      'la hero di A: quattro righe spezzate a mano con <br> e text-wrap: nowrap (app/css/sezioni.css:311-321), composte perché nessuna discendente cada sopra un accento. Il selettore comprende i due <span> figli, non solo il contenitore: il <br> sta dentro di loro, quindi è lì che il misuratore conta due righe. Il giorno che si cambia una parola di quel payoff va riverificata a mano.',
  },
]

/* ---------------------------------------------------------------------------
   DIFETTI PREESISTENTI IN A, DICHIARATI E FUORI PERIMETRO
   ---------------------------------------------------------------------------
   Questi **sono** difetti secondo la regola — testo che il browser manda a capo
   sotto la soglia del proprio carattere — e non sono stati corretti per una
   ragione precisa: *«l'opzione A non si tocca»*, che è l'istruzione con cui la
   fase 3 quinquies è stata aperta. A è la proposta che il committente ha
   dichiarato valida, e cambiarle un'interlinea è cambiarle la scala.
   Stanno qui e non in un `continue` silenzioso perché la differenza fra
   «misurato e messo da parte» e «non visto» è tutta: il primo si può decidere,
   il secondo no.

   **La correzione, quando A si riaprirà, è di due righe**: in
   `app/globals.css` il tema A ha `--regolo-lh-h1: 0.86`, e ogni `h1` del tema
   lo eredita. Portarlo a **0,92** chiude tutti e quattro (la soglia più alta
   fra loro è 0,917) — ma cambia anche il payoff della hero, che a 0,86 è
   composto a mano e approvato. Quindi: token a 0,92, più un `line-height: 0.86`
   esplicito su `.hero-payoff`. Non si fa qui perché non è una passata su A.
   --------------------------------------------------------------------------- */
const ATTESI_IN_A = [
  { rotta: 'studio', sel: 'h1.mt-3', perche: 'h1 di /studio: due righe a 0,86 (soglia 0,913)' },
  { rotta: 'contatti', sel: 'h1.mt-3', perche: 'h1 di /contatti: tre righe a 0,86 (soglia 0,904)' },
  { rotta: 'scheda', sel: 'h1.mt-7', perche: 'h1 della scheda progetto: il segnaposto va a capo' },
  {
    rotta: 'scheda',
    sel: 'span.da-cliente',
    perche: 'lo stesso testo dell’h1 della scheda, nel suo <span>',
  },
]

/* ---------- 1. i font sono quelli su cui le soglie sono state misurate? ----- */
let ok = true
for (const [chiave, dati] of Object.entries(SOGLIE)) {
  const vera = createHash('sha256')
    .update(readFileSync(new URL(`../../public/fonts/${FILE[chiave]}`, import.meta.url)))
    .digest('hex')
    .slice(0, 6)
  if (vera !== dati.impronta) {
    if (ok) console.log('le soglie non corrispondono più ai file:')
    ok = false
    console.log(`  ${FILE[chiave]}: soglie su ${dati.impronta}, file ${vera}`)
  }
}
console.log(
  ok
    ? `soglie: ${Object.keys(SOGLIE).length} caratteri misurati, impronte tutte corrispondenti\n`
    : '\n  → rifai `soglie.py` prima di fidarti di quello che segue.\n',
)

/* ---------- 2. il DOM vero -------------------------------------------------- */
const b = await chromium.launch()
const guasti = []
const dichiarati = []
let controllati = 0

for (const [nome, rotta] of ROTTE) {
  for (const larghezza of [1440, 390]) {
    const ctx = await b.newContext({ viewport: { width: larghezza, height: 900 } })
    const p = await ctx.newPage()
    await p.goto('http://localhost:3001' + rotta, { waitUntil: 'load' })
    await p.waitForTimeout(350)

    const esito = await p.evaluate(
      ({ soglie, eccezioni }) => {
        const esce = []
        let visti = 0
        const INLINE = ['SPAN', 'A', 'STRONG', 'EM', 'B', 'I', 'BR', 'ABBR', 'TIME', 'SMALL']
        /* Solo i nodi con figli tutti inline: un contenitore misura l'altezza
           dei figli, non delle proprie righe, e conterebbe righe che non ha. */
        const soloInline = (el) => [...el.children].every((c) => INLINE.includes(c.tagName))

        const quale = (cs) => {
          /* `next/font/local` compone il nome della famiglia dal nome della
             variabile JS — `__generalSans_<hash>` —, quindi la chiave di
             `soglie.json` si trova per sottostringa sul nome minuscolo. */
          const f = cs.fontFamily.toLowerCase()
          for (const k of ['archivo', 'montserrat', 'generalsans', 'jetbrainsmono'])
            if (f.includes(k)) return k
          return null
        }

        for (const el of document.querySelectorAll(
          'h1,h2,h3,h4,p,li,span,a,th,td,dt,dd,figcaption,blockquote,summary,legend,label',
        )) {
          const grezzo = (el.textContent || '').trim()
          if (!grezzo || !soloInline(el)) continue
          const cs = getComputedStyle(el)
          if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') continue
          const fs = parseFloat(cs.fontSize)
          if (!fs) continue
          const lh = cs.lineHeight === 'normal' ? fs * 1.2 : parseFloat(cs.lineHeight)
          const r = el.getBoundingClientRect()
          if (r.height < 1 || r.width < 1) continue
          const righe = Math.round(r.height / lh)
          if (righe < 2) continue

          const fam = quale(cs)
          if (!fam) continue
          visti += 1

          /* Il testo come lo compone il browser: `text-transform` cambia i
             glifi, quindi cambia la soglia. */
          const testo =
            cs.textTransform === 'uppercase'
              ? grezzo.toUpperCase()
              : cs.textTransform === 'lowercase'
                ? grezzo.toLowerCase()
                : grezzo

          const g = soglie[fam].glifi
          let alto = 0
          let basso = 0
          let peggiorAlto = ''
          let peggiorBasso = ''
          for (const ch of testo) {
            const m = g[ch]
            if (!m) continue
            if (m[0] > alto) {
              alto = m[0]
              peggiorAlto = ch
            }
            if (m[1] < basso) {
              basso = m[1]
              peggiorBasso = ch
            }
          }
          const soglia = alto - basso
          const rapporto = lh / fs
          if (!soglia || rapporto >= soglia - 0.001) continue

          const sel =
            el.tagName.toLowerCase() +
            (typeof el.className === 'string' && el.className
              ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
              : '')
          const scusa = eccezioni.find((e) => el.matches(e.selettore))
          esce.push({
            sel,
            fs: Math.round(fs * 100) / 100,
            lh: Math.round(lh * 100) / 100,
            rapporto: Math.round(rapporto * 1000) / 1000,
            soglia: Math.round(soglia * 1000) / 1000,
            fam,
            righe,
            manca: Math.round((soglia - rapporto) * fs * 10) / 10,
            colpevoli: `${peggiorAlto || '·'}/${peggiorBasso || '·'}`,
            testo: testo.slice(0, 42),
            scusato: Boolean(scusa),
          })
        }
        return { esce, visti }
      },
      { soglie: SOGLIE, eccezioni: ECCEZIONI },
    )

    controllati += esito.visti
    for (const g of esito.esce) {
      if (g.scusato) continue
      const atteso = ATTESI_IN_A.find((a) => a.rotta === nome && a.sel === g.sel)
      if (atteso) dichiarati.push({ rotta: nome, larghezza, ...g, perche: atteso.perche })
      else guasti.push({ rotta: nome, larghezza, ...g })
    }
    await ctx.close()
  }
}
await b.close()

/* ---------- 3. il verdetto -------------------------------------------------- */
if (dichiarati.length) {
  const unici = new Set(dichiarati.map((d) => `${d.rotta} ${d.sel}`))
  console.log(
    `· ${unici.size} difetti **preesistenti in A**, misurati e fuori perimetro («A non si tocca»):`,
  )
  for (const u of unici) {
    const d = dichiarati.find((x) => `${x.rotta} ${x.sel}` === u)
    console.log(`    ${u.padEnd(34)} manca ${d.manca}px — ${d.perche}`)
  }
  const scaduti = ATTESI_IN_A.filter(
    (a) => !dichiarati.some((d) => d.rotta === a.rotta && d.sel === a.sel),
  )
  if (scaduti.length)
    console.log(
      `  ⚠ ${scaduti.length} voci di ATTESI_IN_A non si presentano più: qualcuno le ha corrette,\n    e la lista in testa a questo file va accorciata.`,
    )
  console.log()
}

if (guasti.length === 0) {
  console.log(
    `✔ interlinee: su ${controllati} testi che vanno a capo, nessuno sta sotto la soglia\n` +
      `  d'inchiostro dei propri caratteri — a parte i ${dichiarati.length ? 'difetti dichiarati di A' : 'nessuno'} qui sopra.\n` +
      `  ${ROTTE.length} rotte × 2 larghezze. Eccezione composta a mano: .hero-payoff.`,
  )
} else {
  console.log(`✘ ${guasti.length} testi sotto soglia su ${controllati} che vanno a capo:\n`)
  guasti.sort((a, b2) => b2.manca - a.manca)
  console.log(
    `  ${'rotta'.padEnd(9)} ${'vp'.padEnd(5)} ${'selettore'.padEnd(28)} ${'corpo'.padEnd(7)} ${'lh'.padEnd(7)} ${'rapp'.padEnd(6)} ${'soglia'.padEnd(7)} ${'manca'.padEnd(7)} ${'righe'.padEnd(6)} ${'alto/basso'.padEnd(10)} testo`,
  )
  for (const g of guasti)
    console.log(
      `  ${g.rotta.padEnd(9)} ${String(g.larghezza).padEnd(5)} ${g.sel.slice(0, 28).padEnd(28)} ${String(g.fs).padEnd(7)} ${String(g.lh).padEnd(7)} ${String(g.rapporto).padEnd(6)} ${String(g.soglia).padEnd(7)} ${(g.manca + 'px').padEnd(7)} ${String(g.righe).padEnd(6)} ${g.colpevoli.padEnd(10)} ${g.testo}`,
    )
  console.log(
    '\n  «manca» = quanti pixel di interlinea servono per arrivare alla soglia.\n  «alto/basso» = i due caratteri che si toccherebbero: è lì che si vede il difetto.',
  )
  process.exitCode = 1
}
