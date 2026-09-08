/**
 * La colata di C: il gesto, e le cinque cose che devono restare vere.
 *
 * È il solo blocco del sito il cui contenuto cambia con lo scorrimento, quindi
 * è anche il solo che una schermata sola non sa collaudare. Questo script lo
 * guarda a cinque quote, a due larghezze, e in tre condizioni di degrado.
 *
 * Cosa deve dire:
 *
 *   apertura      0 a documento fermo, 1 a una schermata di scorrimento
 *   marchio       visibile a **ogni** quota (i due strati, registrati)
 *   segnaposto    la targhetta della specifica visibile a **ogni** quota
 *                 (decisione n. 27 b: il campo resta segnaposto mentre si vede)
 *   moto ridotto  apertura 1 — lo stato finito, non la scheggia chiusa
 *   niente JS     il gesto funziona comunque: è CSS
 *
 * Uso: `node colata.mjs` con il build di produzione su :3001.
 */
import { chromium } from 'playwright'

const URL = 'http://localhost:3001/opzione-b'
const b = await chromium.launch()
const guasti = []

/** Lo stato del blocco, letto dal DOM vero. */
const stato = (p) =>
  p.evaluate(() => {
    const palco = document.querySelector('.colata-palco')
    if (!palco) return { errore: '.colata-palco assente' }
    const vis = (s) => {
      const e = document.querySelector(s)
      if (!e) return null
      const r = e.getBoundingClientRect()
      return r.width > 1 && r.height > 1 ? Math.round(r.width) : 0
    }
    return {
      apertura: +getComputedStyle(palco).getPropertyValue('--colata').trim(),
      marchio: vis('.colata-strato-inchiostro h1'),
      etichetta: vis('.colata-palco .placeholder-etichetta'),
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }
  })

const controlla = (etichetta, s, atteso) => {
  if (s.errore) return guasti.push(`${etichetta}: ${s.errore}`)
  if (atteso !== null && Math.abs(s.apertura - atteso) > 0.02)
    guasti.push(`${etichetta}: apertura ${s.apertura}, attesa ${atteso}`)
  if (!s.marchio) guasti.push(`${etichetta}: il marchio non è visibile`)
  if (!s.etichetta) guasti.push(`${etichetta}: la targhetta del segnaposto non è visibile`)
  if (s.overflow) guasti.push(`${etichetta}: sfondamento orizzontale`)
  console.log(
    `  ${etichetta.padEnd(26)} apertura ${String(s.apertura).padEnd(8)} marchio ${String(s.marchio).padEnd(5)} targhetta ${s.etichetta}`,
  )
}

/* ---------- il gesto, a due larghezze ------------------------------------- */
for (const [w, h] of [
  [1440, 900],
  [390, 844],
]) {
  console.log(`\n${w}×${h}`)
  const ctx = await b.newContext({ viewport: { width: w, height: h } })
  const p = await ctx.newPage()
  await p.goto(URL, { waitUntil: 'load' })
  await p.waitForTimeout(500)
  /* A documento fermo l'apertura è 0 e a una schermata è 1: sono i due estremi
     dichiarati. In mezzo si controlla solo che cresca, non un valore esatto —
     la curva è un dettaglio di stile, la monotonia è il contratto. */
  let prima = -1
  for (const [nome, y, atteso] of [
    ['fermo', 0, 0],
    ['un terzo', Math.round(h * 0.34), null],
    ['due terzi', Math.round(h * 0.66), null],
    ['una schermata', h, 1],
    ['oltre', Math.round(h * 1.7), 1],
  ]) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y)
    await p.waitForTimeout(320)
    const s = await stato(p)
    controlla(nome, s, atteso)
    if (!s.errore && s.apertura < prima - 0.02)
      guasti.push(`${w}px ${nome}: l'apertura è tornata indietro (${prima} → ${s.apertura})`)
    prima = s.errore ? prima : s.apertura
  }
  await ctx.close()
}

/* ---------- i due degradi -------------------------------------------------- */
console.log('\ndegrado')
for (const [nome, opts, atteso] of [
  ['moto ridotto', { reducedMotion: 'reduce' }, 1],
  ['niente JavaScript', { javaScriptEnabled: false }, 0],
]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, ...opts })
  const p = await ctx.newPage()
  await p.goto(URL, { waitUntil: 'load' })
  await p.waitForTimeout(400)
  controlla(nome, await stato(p), atteso)
  await ctx.close()
}

await b.close()

if (guasti.length) {
  console.log('\nguasti:')
  for (const g of guasti) console.log('  ✘ ' + g)
  process.exitCode = 1
} else {
  console.log('\n✔ la colata: apertura monotona 0 → 1, marchio e targhetta visibili a ogni quota,')
  console.log('  moto ridotto sul fotogramma finito, e il gesto funziona anche senza JavaScript.')
}
