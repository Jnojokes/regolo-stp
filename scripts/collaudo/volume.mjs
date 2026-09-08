/**
 * Il volume di C: **il 3D c'è, e i tre degradi sono tre pagine finite.**
 *
 * Il committente ha riaperto il divieto di 3D in pagina (`DECISIONI.md` n. 44) e
 * in C è entrato un volume in **WebGL grezzo** — cinque livelli dagli stessi
 * prismi di `lib/esploso.ts`, ~5 KB invece dei ~130 di `three.js`.
 *
 * Un canvas non porta informazione da solo, quindi quello che va collaudato non
 * è «si vede il 3D» ma **che nessuno dei tre stati sia una pagina rotta**:
 *
 *   con WebGL         il canvas si accende (`data-acceso`) e copre l'SVG
 *   senza WebGL       il canvas resta spento e **l'SVG del server è visibile**
 *   moto ridotto      idem: il canvas non si monta affatto
 *   senza JavaScript  idem, e il canvas non esiste nemmeno
 *
 * In tutti e quattro la **legenda** e il nome accessibile dell'SVG ci sono: sono
 * il contenuto, e il disegno ne è l'illustrazione.
 */
import { chromium } from 'playwright'
import { PNG } from 'pngjs'

const URL = 'http://localhost:3001/opzione-c'
const b = await chromium.launch()
const guasti = []

/**
 * Quanto inchiostro c'è nel riquadro del volume, **dallo screenshot della
 * pagina composta**.
 *
 * Il primo tentativo leggeva i pixel dal contesto WebGL con `readPixels`, e
 * dava sempre **0 %**: senza `preserveDrawingBuffer` il buffer di disegno è già
 * stato svuotato dopo il compositing, e `getContext` restituisce il contesto
 * esistente ignorando gli attributi che gli si passano dopo. Era una misura
 * falsa che per un po' ha accusato un canvas che funzionava — e prima ancora ha
 * mascherato quello che non funzionava.
 *
 * Lo screenshot invece guarda quello che guarda una persona: si contano i pixel
 * che **non sono la carta**. Vale per il canvas e per l'SVG allo stesso modo,
 * quindi è anche la misura che dice se il fotogramma di degrado è vuoto.
 */
async function inchiostro(p) {
  const el = await p.$('.colata-volume')
  if (!el) return null
  const png = PNG.sync.read(await el.screenshot({ type: 'png' }))
  let diversi = 0
  for (let i = 0; i < png.data.length; i += 4) {
    /* La carta di C è `#F3F0EC`. La soglia di 10 per canale salta la
       compressione e l'antialiasing del testo, non un disegno. */
    const d =
      Math.abs(png.data[i] - 0xf3) +
      Math.abs(png.data[i + 1] - 0xf0) +
      Math.abs(png.data[i + 2] - 0xec)
    if (d > 30) diversi += 1
  }
  return Math.round((diversi / (png.width * png.height)) * 100)
}

const stato = (p) =>
  p.evaluate(() => {
    const svg = document.querySelector('.volume-piano')
    const tela = document.querySelector('.volume-vivo')
    const leg = document.querySelectorAll('.volume-legenda li')
    const vis = (el) => {
      if (!el) return false
      const r = el.getBoundingClientRect()
      return r.width > 1 && r.height > 1 && getComputedStyle(el).visibility !== 'hidden'
    }
    return {
      svgInPagina: Boolean(svg),
      svgVisibile: vis(svg),
      facce: svg ? svg.querySelectorAll('polygon').length : 0,
      livelli: svg ? svg.querySelectorAll('g[data-livello]').length : 0,
      nome: svg ? svg.getAttribute('aria-label')?.slice(0, 46) : null,
      telaInPagina: Boolean(tela),
      telaAccesa: Boolean(tela?.hasAttribute('data-acceso')),
      legenda: leg.length,
    }
  })

const controlla = (nome, s, attese) => {
  console.log(
    `  ${nome.padEnd(22)} svg=${(s.svgVisibile ? 'visibile' : 'nascosto').padEnd(9)} livelli=${s.livelli} facce=${String(s.facce).padEnd(4)} inchiostro=${String(s.inchiostro + '%').padEnd(5)}  canvas=${(s.telaInPagina ? (s.telaAccesa ? 'acceso' : 'spento') : 'assente').padEnd(8)} legenda=${s.legenda}`,
  )
  if (!s.svgInPagina) guasti.push(`${nome}: l'SVG del server non è in pagina`)
  /* Tredici scatole — 1 fondazioni, 9 struttura (otto pilastri più il solaio),
     1 involucro, 1 impianti, 1 finiture — e per questa camera **tre facce
     visibili ciascuna**: 39. Il numero non è una stima: viene dal culling per
     prodotto scalare in `lib/volume.ts`, quindi se cambia è cambiata la
     geometria o la camera, e va guardato. */
  if (s.livelli !== 5) guasti.push(`${nome}: ${s.livelli} livelli invece di 5`)
  if (s.facce !== 39)
    guasti.push(
      `${nome}: ${s.facce} facce invece di 39 (13 scatole × 3 visibili) — geometria o camera cambiate`,
    )
  if (s.legenda !== 5) guasti.push(`${nome}: la legenda ha ${s.legenda} voci invece di 5`)
  if (!s.nome) guasti.push(`${nome}: l'SVG non ha nome accessibile`)
  if (attese.acceso !== undefined && s.telaAccesa !== attese.acceso)
    guasti.push(`${nome}: canvas ${s.telaAccesa ? 'acceso' : 'spento'}, atteso il contrario`)
  /* La condizione che conta: se il canvas non è acceso, **l'SVG deve vedersi**.
     Un canvas spento sopra un SVG nascosto è uno schermo vuoto. */
  if (!s.telaAccesa && !s.svgVisibile) guasti.push(`${nome}: nessuno dei due disegni è visibile`)
  /* **La condizione che conta in tutti e quattro gli stati**: nel riquadro ci
     deve essere un disegno. Con il canvas acceso l'SVG è nascosto, quindi un
     canvas vuoto significa un blocco vuoto — ed è il difetto peggiore dei tre
     degradi, perché è l'unico che *sembra* funzionare. La soglia è bassa di
     proposito: il volume occupa una parte del riquadro, non tutto. Sotto il
     4 % non c'è un edificio, c'è la legenda. */
  /* `typeof` e non `< 4` da solo: `undefined < 4` è **falso**, quindi un
     controllo scritto così passa quando la misura non è arrivata. È il modo in
     cui un collaudo smette di guardare senza dirlo — e mi è appena successo. */
  if (typeof s.inchiostro !== 'number')
    guasti.push(`${nome}: la misura dell'inchiostro non è arrivata (${s.inchiostro})`)
  else if (s.inchiostro < 4)
    guasti.push(
      `${nome}: nel riquadro del volume c'è il ${s.inchiostro}% di inchiostro — il disegno non c'è`,
    )
}

for (const [nome, opts, attese] of [
  ['con WebGL', {}, { acceso: true }],
  ['moto ridotto', { reducedMotion: 'reduce' }, { acceso: false }],
  ['niente JavaScript', { javaScriptEnabled: false }, { acceso: false }],
]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, ...opts })
  const p = await ctx.newPage()
  await p.goto(URL, { waitUntil: 'load' })
  /* Il canvas si accende quando il blocco entra in vista: va raggiunto. */
  await p.evaluate(() => document.querySelector('#volume')?.scrollIntoView()).catch(() => {})
  await p.waitForTimeout(700)
  controlla(nome, { ...(await stato(p)), inchiostro: await inchiostro(p) }, attese)
  await ctx.close()
}

/* Senza WebGL non si può simulare con un flag di Playwright: si nega il
   contesto dalla pagina, prima che il componente lo chieda. È la prova che il
   fallback non è un ramo da ricordarsi ma lo stato di partenza. */
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
  await ctx.addInitScript(() => {
    const vero = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (tipo, ...resto) {
      if (String(tipo).startsWith('webgl')) return null
      return vero.call(this, tipo, ...resto)
    }
  })
  const p = await ctx.newPage()
  await p.goto(URL, { waitUntil: 'load' })
  await p.evaluate(() => document.querySelector('#volume')?.scrollIntoView())
  await p.waitForTimeout(700)
  controlla(
    'WebGL negato',
    { ...(await stato(p)), inchiostro: await inchiostro(p) },
    { acceso: false },
  )
  await ctx.close()
}

await b.close()
if (guasti.length) {
  console.log('\nguasti:')
  for (const g of guasti) console.log('  ✘ ' + g)
  process.exitCode = 1
} else {
  console.log(
    '\n✔ il volume: il 3D si accende dove WebGL c’è, e negli altri tre stati resta l’SVG\n  in prospettiva reso dal server, con le sue 5 voci di legenda e il nome accessibile.',
  )
}
