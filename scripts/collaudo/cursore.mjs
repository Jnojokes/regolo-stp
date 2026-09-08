/**
 * Il mirino CAD dell'opzione B, che una schermata sola non sa collaudare.
 *
 * Il gesto ha **quattro stati** (carta, elemento interattivo, campo di testo,
 * puntatore fermo prima del primo movimento) e **cinque degradi** (senza
 * JavaScript, con `prefers-reduced-motion: reduce`, su puntatore grosso, e le
 * altre due proposte che non lo hanno). Una fotografia ne prova uno.
 *
 * E ce n'è una che vale più delle altre: `cursor: none` **nasconde il
 * puntatore di sistema**. Se il sostituto non compare, il visitatore ha una
 * pagina che non sa usare — quindi la prova che conta non è «il mirino si
 * vede», è **«dove il mirino non c'è, il puntatore è tornato»**.
 *
 * Uso: `node cursore.mjs` con il build di produzione su :3001.
 * Esce con codice 1 se una sola condizione cade.
 */
import { chromium } from 'playwright'

const URL_B = 'http://localhost:3001/opzione-b'
const guasti = []
let provate = 0
const ok = (cond, cosa, visto) => {
  provate += 1
  if (!cond) guasti.push(`${cosa} — visto: ${JSON.stringify(visto)}`)
  console.log(`  ${cond ? '✔' : '✘'} ${cosa}`)
}

const b = await chromium.launch()

/* ---------- 1. i quattro stati -------------------------------------------- */
console.log('\ni quattro stati, a 1440:')
{
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage()
  await p.goto(URL_B, { waitUntil: 'load' })
  await p.waitForTimeout(500)

  /* Prima del movimento: il nodo c'è (il JavaScript è girato) ma non si vede.
     Chi arriva da tastiera non deve vedersi comparire un oggetto. */
  const primaDelMoto = await p.evaluate(() => {
    const n = document.querySelector('.cursore-cad')
    return {
      c: !!n,
      vis: n ? 'visibile' in n.dataset : null,
      op: n ? getComputedStyle(n).opacity : null,
    }
  })
  ok(primaDelMoto.c === true, 'il nodo esiste dopo l’idratazione', primaDelMoto)
  ok(
    primaDelMoto.vis === false && primaDelMoto.op === '0',
    'invisibile finché il puntatore non si muove',
    primaDelMoto,
  )

  /* Stato «carta»: mirino, finestra di selezione, lettura. */
  await p.mouse.move(700, 430)
  await p.mouse.move(720, 450)
  await p.waitForTimeout(400)
  const carta = await p.evaluate(() => {
    const n = document.querySelector('.cursore-cad')
    const g = (s) => {
      const e = n.querySelector(s)
      const b = e.getBoundingClientRect()
      const cs = getComputedStyle(e)
      return {
        w: Math.round(b.width),
        h: Math.round(b.height),
        x: Math.round(b.x),
        y: Math.round(b.y),
        op: cs.opacity,
        bg: cs.backgroundColor,
        bc: cs.borderColor,
      }
    }
    return {
      stato: n.dataset.stato,
      op: getComputedStyle(n).opacity,
      tr: getComputedStyle(n).transform,
      sx: g('[data-verso="sx"]'),
      dx: g('[data-verso="dx"]'),
      su: g('[data-verso="su"]'),
      giu: g('[data-verso="giu"]'),
      mira: g('.cursore-mira'),
      lettura: { ...g('.cursore-lettura'), t: n.querySelector('.cursore-lettura').textContent },
      cursorBody: getComputedStyle(document.body).cursor,
      cursorLink: getComputedStyle(document.querySelector('a')).cursor,
    }
  })
  ok(carta.stato === 'carta' && carta.op === '1', 'stato «carta» e visibile', carta.stato)
  ok(carta.tr === 'matrix(1, 0, 0, 1, 720, 450)', 'il mirino sta sul puntatore, al pixel', carta.tr)
  ok(
    carta.cursorBody === 'none' && carta.cursorLink === 'none',
    'il puntatore di sistema è nascosto, anche sui link',
    [carta.cursorBody, carta.cursorLink],
  )

  /* Le misure della reference: quattro tratti da 64 × 1 con 7 px di vuoto. */
  ok(
    carta.sx.w === 64 &&
      carta.sx.h === 1 &&
      carta.dx.w === 64 &&
      carta.su.h === 64 &&
      carta.giu.h === 64,
    'quattro tratti da 64 px (misurato sulla reference)',
    [carta.sx, carta.su],
  )
  const vuotoSx = 720 - (carta.sx.x + carta.sx.w)
  const vuotoDx = carta.dx.x - 720
  const vuotoSu = 450 - (carta.su.y + carta.su.h)
  const vuotoGiu = carta.giu.y - 450
  ok(
    [vuotoSx, vuotoDx, vuotoSu, vuotoGiu].every((v) => v === 7),
    'il vuoto al centro è 7 px su tutti e quattro i lati',
    [vuotoSx, vuotoDx, vuotoSu, vuotoGiu],
  )
  ok(carta.mira.w === 8 && carta.mira.h === 8, 'la finestra di selezione è 8 × 8', carta.mira)

  /* La lettura: non è un dato inventato — deve corrispondere alla posizione
     vera del puntatore convertita in millimetri (1 px CSS = 25,4 / 96 mm). */
  const atteso = `X ${(720 * 0.264583).toFixed(1).replace('.', ',')}  Y ${(450 * 0.264583).toFixed(1).replace('.', ',')}  mm`
  ok(
    carta.lettura.t === atteso,
    `la lettura è la posizione vera in mm (${atteso})`,
    carta.lettura.t,
  )

  /* Stato «attivo»: sopra un elemento interattivo compare l'anello e la lettura
     si spegne. Nella reference i due stati non convivono. */
  const l = await p.$('.site-nav a')
  const bb = await l.boundingBox()
  await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2)
  await p.waitForTimeout(400)
  const attivo = await p.evaluate(() => {
    const n = document.querySelector('.cursore-cad')
    const a = n.querySelector('.cursore-anello')
    const b = a.getBoundingClientRect()
    return {
      stato: n.dataset.stato,
      anelloOp: getComputedStyle(a).opacity,
      anelloW: Math.round(b.width),
      letturaOp: getComputedStyle(n.querySelector('.cursore-lettura')).opacity,
    }
  })
  ok(attivo.stato === 'attivo', 'sopra un link lo stato è «attivo»', attivo.stato)
  ok(attivo.anelloOp === '1' && attivo.anelloW === 52, 'l’anello è a 52 px (misurato)', attivo)
  ok(
    attivo.letturaOp === '0',
    'la lettura si spegne: anello **o** lettura, non entrambi',
    attivo.letturaOp,
  )

  /* Stato «campo»: sopra un campo di testo il puntatore di sistema **torna** e
     il mirino si spegne. È la deviazione dichiarata dalla reference, e la
     ragione è che l'azione primaria del sito è il brief inviato. */
  /* Con JavaScript il brief mostra **un passo alla volta**, e il passo 1 ha
     solo dei `radio`: il primo campo di testo è quello del comune, al passo 2.
     Quindi si sceglie una risposta e si va avanti — che collauda anche il
     form. Un campo dentro un `<fieldset hidden>` non ha una geometria, e
     puntarlo sarebbe stato puntare il vuoto: è il difetto che questa prova
     aveva alla prima scrittura. */
  /* La scheda si porta al centro della finestra prima di toccarla: la testata
     è `sticky` e intercetta i click su quello che le passa sotto. */
  await p.evaluate(() => document.querySelector('#brief').scrollIntoView({ block: 'center' }))
  await p.waitForTimeout(300)
  await p.locator('#brief input[type="radio"]').first().check({ force: true })
  await p.locator('#brief button:has-text("Avanti")').first().click({ force: true })
  await p.waitForTimeout(500)
  /* Il campo si cerca con la **prova del colpo**: `elementFromPoint` al suo
     centro deve restituire lui. Senza questa prova la scelta cadeva
     sull'**honeypot** — che è un `input[type=text]` con una geometria vera, e
     sopra il quale non c'è niente da collaudare perché non è raggiungibile.
     È la stessa lezione di prima, una riga più sotto: «ha un rettangolo» non
     vuol dire «è lì». */
  const centro = await p.evaluate(() => {
    for (const e of document.querySelectorAll('input')) {
      if (['radio', 'checkbox'].includes(e.type)) continue
      const b = e.getBoundingClientRect()
      if (!b.width || !b.height) continue
      const x = b.x + b.width / 2
      const y = b.y + b.height / 2
      if (document.elementFromPoint(x, y) === e) return { x, y, nome: e.name }
    }
    return null
  })
  ok(centro !== null, 'c’è un campo di testo davvero raggiungibile nel passo 2', centro)
  await p.mouse.move(centro.x, centro.y)
  await p.waitForTimeout(400)
  const suCampo = await p.evaluate(
    ([x, y]) => {
      const n = document.querySelector('.cursore-cad')
      const i = document.elementFromPoint(x, y)
      return {
        stato: n.dataset.stato,
        op: getComputedStyle(n).opacity,
        cursorCampo: getComputedStyle(i).cursor,
        campo: i.name,
      }
    },
    [centro.x, centro.y],
  )
  ok(suCampo.stato === 'campo', 'sopra un campo di testo lo stato è «campo»', suCampo.stato)
  ok(suCampo.op === '0', 'il mirino si spegne sul campo', suCampo.op)
  ok(
    suCampo.cursorCampo === 'text',
    'e il puntatore di sistema è **tornato** (cursor: text)',
    suCampo.cursorCampo,
  )

  await ctx.close()
}

/* ---------- 2. i quattro degradi ------------------------------------------ */
console.log('\ni degradi — in tutti il puntatore di sistema deve restare:')
const degradi = [
  ['senza JavaScript', { javaScriptEnabled: false }, URL_B],
  ['prefers-reduced-motion: reduce', { reducedMotion: 'reduce' }, URL_B],
  [
    'puntatore grosso (telefono)',
    { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true },
    URL_B,
  ],
  ['opzione A, che non lo ha', {}, 'http://localhost:3001/'],
  ['opzione C, che non lo ha', {}, 'http://localhost:3001/opzione-c'],
]
for (const [nome, opzioni, url] of degradi) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, ...opzioni })
  const p = await ctx.newPage()
  await p.goto(url, { waitUntil: 'load' })
  await p.waitForTimeout(500)
  if (opzioni.javaScriptEnabled !== false) {
    await p.mouse.move(700, 400)
    await p.waitForTimeout(300)
  }
  const v = await p.evaluate(() => ({
    attr: document.documentElement.getAttribute('data-cursore'),
    nodo: !!document.querySelector('.cursore-cad'),
    cursore: getComputedStyle(document.body).cursor,
  }))
  ok(v.attr === null && v.nodo === false && v.cursore !== 'none', nome, v)
  await ctx.close()
}

await b.close()

/* ---------- 3. il verdetto ------------------------------------------------- */
if (!guasti.length) {
  console.log(
    `\n✔ mirino: ${provate} prove su ${provate}. Il puntatore di sistema si nasconde\n` +
      '  solo dove il suo sostituto è vivo.',
  )
  process.exit(0)
}
console.log(`\n✘ ${guasti.length} prove cadute su ${provate}:\n`)
for (const g of guasti) console.log(`  ${g}`)
process.exit(1)
