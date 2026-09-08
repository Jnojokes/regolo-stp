/**
 * Le classi che si scontrano con i fogli condivisi.
 *
 * Il difetto che questo script esiste per non far ripetere: la galleria
 * dell'opzione B si chiamava `.galleria`, e `.galleria` **esiste già** in
 * `app/css/pagine.css` — è la griglia di fotografie a tre colonne della scheda
 * progetto, con una regola **non qualificata per tema**. Risultato in pagina:
 * l'etichetta, il titolo e il contenitore delle colonne finivano ognuno in una
 * cella su tre, le quattro colonne stavano in **435 px** invece di 1.400, i
 * campi media uscivano larghi 88 px e la riga di licenza sbordava sopra la
 * fotografia accanto. L'ha visto il committente, non il collaudo.
 *
 * Perché nessuno degli altri script lo prendeva: non è un problema di
 * contrasto, di interlinea, di overflow del documento né di peso. È un
 * problema di **nomi**, e i nomi non si guardano — si controllano.
 *
 * ## Come funziona
 *
 * 1. legge i tre fogli **condivisi** e raccoglie ogni nome di classe che
 *    stilano con un selettore **non qualificato** (senza `[data-theme=…]`):
 *    quelli sono i nomi già presi;
 * 2. apre le rotte di proposta e raccoglie le classi che stanno davvero nel
 *    `<main>` — dal DOM, non dal codice, così prende anche quelle che arrivano
 *    da una prop o da una variante e non da una stringa scritta a mano;
 * 3. sottrae quelle **condivise per scelta**, che sono dichiarate qui sotto con
 *    il motivo;
 * 4. quello che resta è un difetto e lo stampa. Esce con codice 1.
 *
 * Uso: `node collisioni.mjs` con il build di produzione su :3001.
 */
import { readFileSync } from 'node:fs'
import { chromium } from 'playwright'

const RADICE = new URL('../../', import.meta.url)

/** I fogli che valgono per tutte e tre le proposte. */
const CONDIVISI = ['app/css/sezioni.css', 'app/css/pagine.css', 'app/globals.css']

const ROTTE = [
  ['B', 'http://localhost:3001/opzione-b'],
  ['C', 'http://localhost:3001/opzione-c'],
]

/* I prefissi che le tre proposte condividono **per scelta**, e il perché di
   ognuno. Non è una lista di eccezioni: è la dichiarazione di cos'è chrome.
   Aggiungerne uno vuol dire decidere che un altro pezzo di pagina è comune, e
   va fatto sapendolo. */
const CONDIVISE_PER_SCELTA = [
  [
    'brief',
    'il brief è lo stesso componente su tutte e tre: stesse domande, cinque passi. È la condizione perché in call si confronti la lingua visiva a parità di contenuto (DECISIONI n. 51). Ogni tema lo veste dal suo foglio',
  ],
  [
    'barra-',
    'la barra della proposta e la barra CTA mobile sono chrome: la prima sparisce alla fase 5, la seconda è la stessa su tutte le rotte del sito',
  ],
  [
    'placeholder-',
    'il segnaposto media è un contratto, non uno stile: squadrette, specifica del formato, riga di fonte e licenza (DECISIONI n. 27 b). Cambiarlo per tema vorrebbe dire tre dichiarazioni diverse della stessa cosa',
  ],
  [
    'btn',
    'il bottone è un controllo: la forma la danno i token `--regolo-btn-*`, che ogni tema ridichiara',
  ],
  ['wrap', 'il contenitore di pagina, guidato da `--regolo-wrap` (che in C è `none`)'],
  ['eyebrow', 'i token dell’occhiello; le quadre di A sono disapplicate dai due temi'],
  ['da-cliente', 'il segnaposto di testo visibile, che in B e C rende lorem ipsum'],
]

const senzaCommenti = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '')

/* ---------- 1. i nomi già presi ------------------------------------------- */
const presi = new Map() // classe → i fogli che la stilano
for (const f of CONDIVISI) {
  const css = senzaCommenti(readFileSync(new URL(f, RADICE), 'utf8'))
  for (const m of css.matchAll(/([^{}]+)\{/g)) {
    const selettore = m[1].trim()
    if (selettore.startsWith('@')) continue
    for (const parte of selettore.split(',')) {
      /* Un selettore qualificato per tema non è un nome preso: è già una
         dichiarazione di appartenenza. */
      if (parte.includes('[data-theme')) continue
      for (const c of parte.matchAll(/\.([a-zA-Z][\w-]*)/g)) {
        const nome = c[1]
        if (!presi.has(nome)) presi.set(nome, new Set())
        presi.get(nome).add(f)
      }
    }
  }
}

const scelta = (c) => CONDIVISE_PER_SCELTA.find(([p]) => c === p || c.startsWith(p))

/* ---------- 2. il DOM vero ------------------------------------------------- */
const b = await chromium.launch()
const guasti = []
let contate = 0

for (const [nome, url] of ROTTE) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage()
  await p.goto(url, { waitUntil: 'load' })
  await p.waitForTimeout(300)
  const usate = await p.evaluate(() => {
    const s = new Set()
    for (const el of document.querySelectorAll('main, main *')) {
      const c = el.getAttribute('class')
      if (c) for (const x of c.trim().split(/\s+/)) s.add(x)
    }
    return [...s]
  })
  contate += usate.length
  for (const c of usate) {
    if (!presi.has(c) || scelta(c)) continue
    guasti.push({ rotta: nome, classe: c, fogli: [...presi.get(c)].join(', ') })
  }
  await ctx.close()
}
await b.close()

/* ---------- 3. il verdetto ------------------------------------------------- */
console.log(
  `nomi presi dai fogli condivisi: ${presi.size} · classi in pagina: ${contate} · ` +
    `condivise per scelta: ${CONDIVISE_PER_SCELTA.length} prefissi`,
)

if (!guasti.length) {
  console.log(
    '\n✔ collisioni: nessuna classe di B o di C viene stilata da un foglio condiviso\n' +
      '  fuori da quelle dichiarate qui sopra.',
  )
  process.exit(0)
}

console.log(`\n✘ ${guasti.length} collisioni:\n`)
for (const g of guasti) {
  console.log(`  ${g.rotta}  .${g.classe.padEnd(28)} stilata da ${g.fogli}`)
}
console.log(
  '\n  Una classe di blocco porta il prefisso del suo tema. Un nome generico non\n' +
    '  è un nome libero: è un nome già preso, e la regola condivisa vince su\n' +
    '  quello che il tema non ridichiara.',
)
process.exit(1)
