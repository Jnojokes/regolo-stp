/**
 * Rigenera lib/territorio.ts — la geometria SVG del blocco «Territorio»:
 * il perimetro delle tre province dell'autocomplete del brief (Fermo, Macerata,
 * Ascoli Piceno — CLAUDE.md § Il form) e il punto di ciascuno dei 128 comuni.
 *
 * Sorgente: openpolis/geojson-italy, derivato dai confini amministrativi ISTAT.
 * Dato pubblico amministrativo, non contenuto del cliente — vale la stessa
 * regola di `genera-comuni.mjs`.
 *
 * Perché non una mappa a tile (CLAUDE.md § Homepage, blocco 11): un tile server
 * è un terzo che vede l'IP di chi visita, quindi informativa e banner. Un SVG
 * generato è 6 KB, non ha cookie e non chiama nessuno.
 *
 * ATTENZIONE: quali comuni siano *serviti* è la decisione n. 13, aperta. Qui
 * dentro finiscono tutti e 128 i punti perché la geometria non è un'affermazione;
 * quali accendere lo dice lo studio, e finché non lo dice non se ne accende
 * nessuno (`lib/territorio.ts` → `comuniServiti` resta vuoto).
 *
 * Uso: node scripts/genera-territorio.mjs
 */
import { writeFileSync } from 'node:fs'

const PROVINCE = { FM: 'Fermo', MC: 'Macerata', AP: 'Ascoli Piceno' }
const FONTE = 'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson'
/** Tolleranza di semplificazione, in gradi. ~0,0012° ≈ 100 m: sotto il pixel. */
const TOLLERANZA = 0.0012
/** Larghezza del viewBox. L'altezza si ricava dalle proporzioni vere. */
const LARGHEZZA = 640
const MARGINE = 8

async function scarica(nome) {
  const r = await fetch(`${FONTE}/${nome}`)
  if (!r.ok) throw new Error(`${nome}: HTTP ${r.status}`)
  return r.json()
}

/* ---------- semplificazione (Douglas-Peucker) ------------------------------ */

function distanzaAlSegmento([px, py], [ax, ay], [bx, by]) {
  const dx = bx - ax
  const dy = by - ay
  if (dx === 0 && dy === 0) return Math.hypot(px - ax, py - ay)
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)))
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy))
}

function semplifica(punti, tolleranza) {
  if (punti.length < 3) return punti
  let peggiore = 0
  let indice = 0
  for (let i = 1; i < punti.length - 1; i++) {
    const d = distanzaAlSegmento(punti[i], punti[0], punti[punti.length - 1])
    if (d > peggiore) {
      peggiore = d
      indice = i
    }
  }
  if (peggiore <= tolleranza) return [punti[0], punti[punti.length - 1]]
  return [
    ...semplifica(punti.slice(0, indice + 1), tolleranza).slice(0, -1),
    ...semplifica(punti.slice(indice), tolleranza),
  ]
}

/* ---------- geometria ------------------------------------------------------ */

/** L'anello esterno più lungo: le isole e i buchi qui non servono. */
function anelloPrincipale(geometria) {
  const anelli =
    geometria.type === 'Polygon'
      ? [geometria.coordinates[0]]
      : geometria.coordinates.map((p) => p[0])
  return anelli.reduce((a, b) => (b.length > a.length ? b : a))
}

/** Centroide dell'area (non la media dei vertici: quella la tirano i tratti fitti). */
function centroide(anello) {
  let area = 0
  let cx = 0
  let cy = 0
  for (let i = 0, j = anello.length - 1; i < anello.length; j = i++) {
    const [x1, y1] = anello[j]
    const [x2, y2] = anello[i]
    const f = x1 * y2 - x2 * y1
    area += f
    cx += (x1 + x2) * f
    cy += (y1 + y2) * f
  }
  if (area === 0) return anello[0]
  return [cx / (3 * area), cy / (3 * area)]
}

/* -------------------------------------------------------------------------- */

const [province, comuni] = await Promise.all([
  scarica('limits_IT_provinces.geojson'),
  scarica('limits_IT_municipalities.geojson'),
])

const nostreProvince = Object.entries(PROVINCE).map(([sigla, nome]) => {
  const f = province.features.find((x) => x.properties.prov_name === nome)
  if (!f) throw new Error(`provincia non trovata: ${nome}`)
  return { sigla, nome, anello: anelloPrincipale(f.geometry) }
})

const nostriComuni = comuni.features
  .filter((f) => Object.values(PROVINCE).includes(f.properties.prov_name))
  .map((f) => ({
    nome: f.properties.name,
    sigla: f.properties.prov_acr,
    punto: centroide(anelloPrincipale(f.geometry)),
  }))
  .sort((a, b) => a.nome.localeCompare(b.nome, 'it'))

if (nostriComuni.length !== 128)
  throw new Error(`attesi 128 comuni, trovati ${nostriComuni.length}`)

/* ---------- proiezione ----------------------------------------------------- */

const tutti = nostreProvince.flatMap((p) => p.anello)
const lon = tutti.map(([x]) => x)
const lat = tutti.map(([, y]) => y)
const lonMin = Math.min(...lon)
const lonMax = Math.max(...lon)
const latMin = Math.min(...lat)
const latMax = Math.max(...lat)

/* Equirettangolare corretta per il coseno della latitudine media: su un grado e
   mezzo di estensione è indistinguibile da Mercatore, e non deforma le distanze. */
const latMedia = ((latMin + latMax) / 2) * (Math.PI / 180)
const k = Math.cos(latMedia)
const scala = (LARGHEZZA - 2 * MARGINE) / ((lonMax - lonMin) * k)
const ALTEZZA = Math.round((latMax - latMin) * scala + 2 * MARGINE)

const proietta = ([x, y]) => [
  +(MARGINE + (x - lonMin) * k * scala).toFixed(1),
  +(MARGINE + (latMax - y) * scala).toFixed(1),
]

const percorso = (anello) => {
  const semplificato = semplifica(anello, TOLLERANZA).map(proietta)
  const [primo, ...resto] = semplificato
  return `M${primo[0]} ${primo[1]}` + resto.map(([x, y]) => `L${x} ${y}`).join('') + 'Z'
}

/* ---------- scrittura ------------------------------------------------------ */

const oggi = new Date().toISOString().slice(0, 10)
const percorsi = nostreProvince.map((p) => {
  const [cx, cy] = proietta(centroide(p.anello))
  return {
    sigla: p.sigla,
    nome: p.nome,
    vertici: semplifica(p.anello, TOLLERANZA).length,
    d: percorso(p.anello),
    cx,
    cy,
  }
})

writeFileSync(
  new URL('../lib/territorio.ts', import.meta.url),
  `/**
 * Geometria del blocco «Territorio»: il perimetro delle tre province in cui
 * lavora lo studio e il punto di ciascuno dei 128 comuni.
 *
 * GENERATO — non modificare a mano: \`node scripts/genera-territorio.mjs\`.
 * Sorgente: confini amministrativi ISTAT via openpolis/geojson-italy.
 * Rigenerato il ${oggi}. Semplificazione Douglas-Peucker a ${TOLLERANZA}° (~100 m).
 * ${percorsi.map((p) => `${p.sigla} ${p.vertici} vertici`).join(' · ')}.
 *
 * Niente mappa a tile (CLAUDE.md § Homepage, blocco 11): un tile server è un
 * terzo che vede l'IP di chi visita. Questo SVG non chiama nessuno.
 *
 * **Quali comuni sono serviti è la decisione n. 13, aperta.** I 128 punti stanno
 * qui perché la geometria non è un'affermazione; accenderne uno lo è. Finché lo
 * studio non manda la lista, \`comuniServiti\` resta vuoto e in pagina non si
 * accende nessun punto.
 */

export const VIEWBOX = { larghezza: ${LARGHEZZA}, altezza: ${ALTEZZA} } as const

/** \`cx\`/\`cy\` è il centroide dell'area: ci va l'etichetta col nome. */
export type PercorsoProvincia = {
  sigla: string
  nome: string
  d: string
  cx: number
  cy: number
}

export const province: readonly PercorsoProvincia[] = [
${percorsi
  .map(
    (p) =>
      `  {\n    sigla: ${JSON.stringify(p.sigla)},\n    nome: ${JSON.stringify(p.nome)},\n    cx: ${p.cx},\n    cy: ${p.cy},\n    d: ${JSON.stringify(p.d)},\n  },`,
  )
  .join('\n')}
]

export type PuntoComune = { nome: string; sigla: string; x: number; y: number }

export const comuni: readonly PuntoComune[] = [
${nostriComuni
  .map((c) => {
    const [x, y] = proietta(c.punto)
    return `  { nome: ${JSON.stringify(c.nome)}, sigla: ${JSON.stringify(c.sigla)}, x: ${x}, y: ${y} },`
  })
  .join('\n')}
]

/**
 * I comuni in cui lo studio ha lavorato: **decisione n. 13, aperta**.
 * Finché è vuoto in pagina non si accende nessun punto, e il blocco dichiara
 * che l'elenco arriva dallo studio. Non si riempie a intuito.
 */
export const comuniServiti: readonly string[] = []

/** La sede, che è un dato confermato — non un'affermazione sul lavoro svolto. */
export const sede = comuni.find((c) => c.nome === 'Fermo' && c.sigla === 'FM')!

export const comuneByNome = (nome: string) => comuni.find((c) => c.nome === nome)
`,
)

console.log(
  `lib/territorio.ts rigenerato — viewBox ${LARGHEZZA}×${ALTEZZA}, ` +
    percorsi.map((p) => `${p.sigla} ${p.vertici}v`).join(' '),
)
