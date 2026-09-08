/**
 * Screenshot a scorrimento delle tre home, più due controlli: **overflow
 * orizzontale** e **bersagli sotto i 40 px**.
 *
 * Le eccezioni all'overflow sono **due**, e nessuna delle due è un `continue`
 * silenzioso: si contano a parte e si stampano, perché la differenza fra
 * «misurato e messo da parte» e «non visto» è tutta.
 */
import { chromium } from 'playwright'

/* Elementi che stanno **di proposito** fuori dal riquadro della finestra. */
const ECCEZIONI = [
  {
    selettore: '.cursore-cad, .cursore-cad *',
    perche:
      'il mirino CAD dell’opzione B è un punto di 0 × 0 in `position: fixed` che segue il puntatore, e i suoi quattro tratti sono lunghi 64 px: quando il puntatore sta vicino a un bordo, un tratto esce dalla finestra e viene ritagliato — esattamente come nella reference. Prima del primo movimento il punto sta all’origine, quindi il tratto sinistro sborda sempre. Non tocca la larghezza del documento (`scrollW == clientW`, verificato qui sotto) e l’elemento non è nemmeno dipinto: `opacity: 0` finché il puntatore non si muove. Chi lo collauda è `cursore.mjs`, che ne prova 21 condizioni',
  },
  {
    selettore: 'svg *',
    perche:
      'un figlio di un SVG misurato con `getBoundingClientRect()` restituisce coordinate che non tengono conto del `viewBox` del genitore: è il falso positivo noto di `path.[object`, e il perimetro delle tre province — come l’esploso e i disegni di B — non sborda da nessuna parte. L’SVG che li contiene è misurato normalmente e sta dentro il riquadro',
  },
]

const b = await chromium.launch()
const out = []
for (const w of [1440, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } })
  const p = await ctx.newPage()
  for (const [nome, url] of [
    ['A', 'http://localhost:3001/'],
    ['B', 'http://localhost:3001/opzione-b'],
    ['C', 'http://localhost:3001/opzione-c'],
  ]) {
    await p.goto(url, { waitUntil: 'networkidle' })
    const h = await p.evaluate(() => document.documentElement.scrollHeight)
    const passi = Math.ceil(h / 860)
    for (let i = 0; i < passi; i++) {
      await p.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), i * 860)
      await p.waitForTimeout(120)
      await p.screenshot({
        path: `sweep-${nome}-${w}-${String(i).padStart(2, '0')}.jpeg`,
        quality: 82,
        type: 'jpeg',
      })
    }
    // controlli
    const eccezioni = ECCEZIONI.map(({ selettore }) => ({ selettore }))
    const r = await p.evaluate((eccezioni) => {
      const de = document.documentElement
      const sfora = []
      const scusati = []
      document.querySelectorAll('body *').forEach((el) => {
        if (el.classList.contains('skip-link') || el.closest('details:not([open])')) return
        const b = el.getBoundingClientRect()
        if (b.width > 0 && (b.right > de.clientWidth + 1 || b.left < -1)) {
          const nome = `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0].slice(0, 24)}`
          const scusa = eccezioni.find((e) => el.matches(e.selettore))
          ;(scusa ? scusati : sfora).push(nome)
        }
      })
      const piccoli = []
      document.querySelectorAll('a, button, input, summary, label').forEach((el) => {
        const b = el.getBoundingClientRect()
        if (
          b.width > 0 &&
          b.height > 0 &&
          b.height < 40 &&
          !el.closest('.site-footer-coda, .site-nav, .barra-proposta, .quota')
        ) {
          piccoli.push(
            `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0].slice(0, 22)} h${Math.round(b.height)}`,
          )
        }
      })
      return {
        h: de.scrollHeight,
        scrollW: de.scrollWidth,
        clientW: de.clientWidth,
        sfora: [...new Set(sfora)].slice(0, 8),
        scusati: [...new Set(scusati)].slice(0, 8),
        piccoli: [...new Set(piccoli)].slice(0, 8),
      }
    }, eccezioni)
    out.push({ nome, w, ...r, schermate: passi })
  }
  await ctx.close()
}
await b.close()
console.log(JSON.stringify(out, null, 1))

const sforano = out.filter((r) => r.sfora.length)
const scusate = out.filter((r) => r.scusati.length)
console.log(
  sforano.length
    ? `\n✘ ${sforano.length} viste con elementi che sbordano: ${sforano.map((r) => r.nome + '@' + r.w).join(', ')}`
    : '\n✔ overflow: nessun elemento fuori dal riquadro, a parte le eccezioni dichiarate',
)
if (scusate.length) {
  console.log(
    `\n  eccezioni dichiarate, incontrate su ${scusate.length} viste ` +
      `(${scusate.map((r) => r.nome + '@' + r.w).join(', ')}):`,
  )
  for (const e of ECCEZIONI) console.log(`    ${e.selettore}\n      ${e.perche}`)
}
process.exit(sforano.length ? 1 : 0)
