/**
 * Il volume dell'edificio in **tre dimensioni vere**: vertici, spigoli e facce,
 * senza proiezione. Chi lo disegna decide come proiettarlo.
 *
 * ## Perché esiste, e perché non è il ritorno di un file cancellato
 *
 * Un `lib/volume.ts` era già esistito ed è uscito con la proposta che lo
 * ospitava (`DECISIONI.md` n. 47): non perché il 3D fosse tornato vietato, ma
 * perché nessuna delle due reference indicate allora aveva un volume. Adesso ce
 * l'ha una reference misurata — **AIR** apre con un oggetto tridimensionale
 * bianco su bianco al posto della fotografia (`kit/reference/air/`) — e
 * **ecoLINEAR** mescola in galleria «foto, assonometrie a linea e diagrammi».
 * Quindi il volume torna, con due usi diversi e la stessa geometria:
 *
 * | | come si disegna | perché lì |
 * |---|---|---|
 * | **A** «lo studio» | **SVG a facce piene**, bianco su bianco, tre valori vicinissimi più un filo. Server-rendered, zero JavaScript | A non si muove: dichiara. E lo studio **non ha una fotografia** — 62 segnaposto — mentre questa geometria è un dato del repo |
 * | **B** «il foglio» | **wireframe in WebGL grezzo**, ~2 KB, nessuna libreria, che ruota di pochi gradi con lo scorrimento; degrada al wireframe SVG statico | in una tavola da disegno l'assonometria a filo **è** la lingua, non un effetto |
 *
 * Resta fuori **Blender**, per la ragione originale: non ci sono i CAD del
 * cliente, e un edificio modellato a mano sarebbe contenuto inventato. Questo
 * non lo è: sono gli stessi volumi di `lib/esploso.ts` — sei per sei per tre
 * campate — cioè uno **schema**, dichiarato come tale in pagina.
 *
 * ## L'unità e l'orientamento
 *
 * Una cella = 1. La pianta sta su `x` e `y`, la quota su `z`, e `z` **cresce
 * verso l'alto** (in SVG poi si inverte una volta sola, nella proiezione).
 * L'origine è lo spigolo in basso a sinistra della pianta.
 */

export type Punto3 = readonly [number, number, number]
export type Spigolo = readonly [number, number]

/** Le misure del corpo di fabbrica, in celle. Le stesse di `lib/esploso.ts`. */
export const CORPO = { larghezza: 6, profondita: 6, altezza: 3.35 } as const

/** Le campate: tre per lato, come i pilastri dell'esploso. */
const CAMPATE = 3

/* ---------- costruzione ---------------------------------------------------- */

const v: Punto3[] = []
const e: Spigolo[] = []
const chiavi = new Map<string, number>()

/** Aggiunge un vertice e ne restituisce l'indice, senza duplicati. */
function p(x: number, y: number, z: number): number {
  const k = `${x}|${y}|${z}`
  const gia = chiavi.get(k)
  if (gia !== undefined) return gia
  chiavi.set(k, v.length)
  v.push([x, y, z] as const)
  return v.length - 1
}

/** Aggiunge uno spigolo, senza duplicati e senza direzione. */
function s(a: number, b: number) {
  const k = a < b ? `${a}-${b}` : `${b}-${a}`
  if (chiaviSpigolo.has(k)) return
  chiaviSpigolo.add(k)
  e.push([a, b] as const)
}
const chiaviSpigolo = new Set<string>()

const { larghezza: W, profondita: D, altezza: H } = CORPO

/* Il parallelepipedo: otto vertici, dodici spigoli. */
const base = [p(0, 0, 0), p(W, 0, 0), p(W, D, 0), p(0, D, 0)]
const cima = [p(0, 0, H), p(W, 0, H), p(W, D, H), p(0, D, H)]
for (let i = 0; i < 4; i++) {
  s(base[i], base[(i + 1) % 4])
  s(cima[i], cima[(i + 1) % 4])
  s(base[i], cima[i])
}

/* I due solai intermedi: il volume non è una scatola, è tre piani. */
const QUOTE_SOLAIO = [H / 3, (2 * H) / 3]
for (const z of QUOTE_SOLAIO) {
  const a = [p(0, 0, z), p(W, 0, z), p(W, D, z), p(0, D, z)]
  for (let i = 0; i < 4; i++) s(a[i], a[(i + 1) % 4])
}

/* La griglia dei pilastri, disegnata **solo sulle due pareti che si vedono** —
   `x = W` e `y = D`. Le altre due sono di dietro (il criterio è nel commento di
   `facce`) e disegnarle è peso che nessuno guarda. Prima stavano su `x = 0` e
   `y = 0`, cioè esattamente sulle due che non si vedono: il volume usciva senza
   struttura. */
for (let i = 1; i < CAMPATE; i++) {
  const x = (W / CAMPATE) * i
  const y = (D / CAMPATE) * i
  s(p(x, D, 0), p(x, D, H)) // parete sud
  s(p(W, y, 0), p(W, y, H)) // parete est
}

/* La falda: una copertura a due acque, che è quello che distingue un edificio
   da un cubo — e in provincia di Fermo è anche quello che si costruisce. */
const COLMO = H + 0.9
const colmoA = p(0, D / 2, COLMO)
const colmoB = p(W, D / 2, COLMO)
s(colmoA, colmoB)
s(colmoA, cima[0])
s(colmoA, cima[3])
s(colmoB, cima[1])
s(colmoB, cima[2])

export const vertici: readonly Punto3[] = v
export const spigoli: readonly Spigolo[] = e

/* ---------- le facce, per il disegno pieno di A ---------------------------- */

/** Una faccia del volume, in coordinate a tre dimensioni. */
export type Faccia3 = { punti: readonly Punto3[]; tono: 0 | 1 | 2; nome: string }

/**
 * Le facce **che si vedono davvero** con la `proietta()` qui sotto, e la lista
 * è stata sbagliata una volta: conteneva la parete `y = 0` e il timpano `x = 0`,
 * che con questa proiezione sono **di dietro**, e non conteneva le due che
 * quella vista mostra. Campionando la silhouette proiettata su una griglia,
 * **il 26,2 % dell'ingombro restava scoperto** — un buco grande quanto una
 * parete, e su carta bianca un buco bianco non si vede finché non ci passa
 * dietro una lettera.
 *
 * Il criterio non è a occhio: in questa isometria la direzione verso
 * l'osservatore è `(1, 1, 1)`, quindi una faccia si vede se la sua normale
 * uscente ha prodotto scalare **positivo** con quella direzione. Ne restano
 * cinque: due pareti, il timpano di destra e **tutte e due le falde** — la
 * falda di dietro si vede perché l'osservatore sta in alto (la sua normale è
 * `(0, −0,9, 3)`, prodotto scalare `2,1`).
 *
 * `tono` dice **quanta luce prende** la faccia, da 0 (in ombra) a 2 (in luce).
 * Non è un colore: il colore lo mette il tema, e su A sono tre valori
 * vicinissimi al bianco, perché su AIR l'oggetto si legge **solo per la propria
 * ombra**.
 */
export const facce: readonly Faccia3[] = [
  {
    nome: 'parete-sud',
    tono: 0,
    punti: [
      [0, D, 0],
      [W, D, 0],
      [W, D, H],
      [0, D, H],
    ],
  },
  {
    nome: 'parete-est',
    tono: 1,
    punti: [
      [W, 0, 0],
      [W, D, 0],
      [W, D, H],
      [W, 0, H],
    ],
  },
  {
    nome: 'timpano-est',
    tono: 1,
    punti: [
      [W, 0, H],
      [W, D / 2, COLMO],
      [W, D, H],
    ],
  },
  {
    nome: 'falda-nord',
    tono: 2,
    punti: [
      [0, 0, H],
      [W, 0, H],
      [W, D / 2, COLMO],
      [0, D / 2, COLMO],
    ],
  },
  {
    nome: 'falda-sud',
    tono: 2,
    punti: [
      [0, D, H],
      [W, D, H],
      [W, D / 2, COLMO],
      [0, D / 2, COLMO],
    ],
  },
]

/**
 * Gli spigoli **che stanno su una faccia visibile**: la silhouette, gli spigoli
 * di displuvio e le righe disegnate sulle due pareti che si vedono — i solai e
 * i pilastri. Fuori restano gli spigoli di dietro.
 *
 * Serve a **A**: disegnare tutti e ventinove gli spigoli sopra le facce fa
 * leggere l'oggetto come un fil di ferro, cioè come un disegno tecnico — che è
 * la lingua di **B**, non quella di A. Su AIR l'oggetto è un solido.
 *
 * Il criterio è geometrico e non una lista scritta a mano: uno spigolo entra se
 * **tutti e due i suoi estremi giacciono sulla stessa faccia visibile**, cioè
 * se soddisfano insieme l'equazione del piano di quella faccia.
 */
function spigoliSuFacceVisibili(): Spigolo[] {
  const quasi = (a: number, b: number) => Math.abs(a - b) < 1e-6
  /* Il piano di ogni faccia visibile, in forma `n·p = d`. */
  const piani = facce.map((f) => {
    const [a, b, c] = [f.punti[0], f.punti[1], f.punti[2]]
    const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]] as const
    const w = [c[0] - a[0], c[1] - a[1], c[2] - a[2]] as const
    const n = [
      u[1] * w[2] - u[2] * w[1],
      u[2] * w[0] - u[0] * w[2],
      u[0] * w[1] - u[1] * w[0],
    ] as const
    return { n, d: n[0] * a[0] + n[1] * a[1] + n[2] * a[2] }
  })
  const sulPiano = (i: number, pi: (typeof piani)[number]) => {
    const [x, y, z] = vertici[i]
    return quasi(pi.n[0] * x + pi.n[1] * y + pi.n[2] * z, pi.d)
  }
  return spigoli.filter(([a, b]) => piani.some((pi) => sulPiano(a, pi) && sulPiano(b, pi)))
}

export const spigoliVisibili: readonly Spigolo[] = spigoliSuFacceVisibili()

/* ---------- proiezione ----------------------------------------------------- */

/**
 * Assonometria isometrica con una rotazione attorno all'asse verticale.
 *
 * `giro` è in radianti e serve **solo a B**, che lo lega allo scorrimento; A lo
 * lascia a 0 e ottiene la stessa isometria dell'esploso, così le due figure
 * dello stesso sito parlano la stessa lingua.
 *
 * L'asse `y` dello schermo è invertito qui, in un posto solo: sopra, `z`
 * cresce verso l'alto come in un disegno tecnico.
 */
export function proietta([x, y, z]: Punto3, giro = 0, lato = 34): readonly [number, number] {
  const cx = x - CORPO.larghezza / 2
  const cy = y - CORPO.profondita / 2
  const rx = cx * Math.cos(giro) - cy * Math.sin(giro)
  const ry = cx * Math.sin(giro) + cy * Math.cos(giro)
  const COS30 = Math.cos(Math.PI / 6)
  const SIN30 = Math.sin(Math.PI / 6)
  return [(rx - ry) * lato * COS30, (rx + ry) * lato * SIN30 - z * lato] as const
}

/** Il riquadro che contiene il volume proiettato, con un margine. */
export function riquadro(giro = 0, lato = 34, margine = 8) {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const punto of vertici) {
    const [px, py] = proietta(punto, giro, lato)
    minX = Math.min(minX, px)
    maxX = Math.max(maxX, px)
    minY = Math.min(minY, py)
    maxY = Math.max(maxY, py)
  }
  const r = (n: number) => Math.round(n * 10) / 10
  return {
    x: r(minX - margine),
    y: r(minY - margine),
    larghezza: r(maxX - minX + 2 * margine),
    altezza: r(maxY - minY + 2 * margine),
  }
}

/** Il `viewBox` per un `<svg>` che disegna il volume fermo. */
export const VIEWBOX = (() => {
  const q = riquadro()
  return `${q.x} ${q.y} ${q.larghezza} ${q.altezza}`
})()

/** Una faccia già proiettata, pronta per l'attributo `points` di un poligono. */
export function puntiFaccia(f: Faccia3, giro = 0, lato = 34): string {
  return f.punti
    .map((punto) =>
      proietta(punto, giro, lato)
        .map((n) => Math.round(n * 10) / 10)
        .join(','),
    )
    .join(' ')
}

/**
 * Gli spigoli già proiettati, come un solo `path` (meno nodi di N `<line>`).
 * `quali` sceglie il repertorio: **tutti** per il fil di ferro di B, **solo
 * quelli su una faccia visibile** per il solido di A.
 */
export function tracciaSpigoli(giro = 0, lato = 34, quali: readonly Spigolo[] = spigoli): string {
  const r = (n: number) => Math.round(n * 10) / 10
  return quali
    .map(([a, b]) => {
      const [x1, y1] = proietta(vertici[a], giro, lato)
      const [x2, y2] = proietta(vertici[b], giro, lato)
      return `M${r(x1)} ${r(y1)}L${r(x2)} ${r(y2)}`
    })
    .join('')
}

/**
 * Le coppie di vertici in coordinate **normalizzate** (−1…1 sui tre assi), nel
 * formato che serve a un `gl.LINES`: sei float per spigolo. È l'unico export
 * pensato per WebGL, e sta qui perché la geometria è la stessa — così se un
 * giorno cambia il corpo di fabbrica, cambiano insieme il disegno di A e quello
 * di B.
 */
export function spigoliNormalizzati(): Float32Array {
  const scala = Math.max(CORPO.larghezza, CORPO.profondita, COLMO) / 2
  const a = new Float32Array(spigoli.length * 6)
  let i = 0
  for (const [da, a2] of spigoli) {
    for (const idx of [da, a2]) {
      const [x, y, z] = vertici[idx]
      a[i++] = (x - CORPO.larghezza / 2) / scala
      a[i++] = (y - CORPO.profondita / 2) / scala
      a[i++] = (z - COLMO / 2) / scala
    }
  }
  return a
}

/**
 * Il testo alternativo. Vale per tutte e due le lingue — SVG e WebGL — perché
 * il **dato** è lo stesso, e chi non vede la figura deve ricevere quello.
 */
export const DESCRIZIONE =
  'Assonometria schematica di un edificio: corpo di fabbrica su tre piani, ' +
  'griglia di pilastri a tre campate per lato, copertura a due falde. ' +
  'È uno schema, non un progetto dello studio.'
