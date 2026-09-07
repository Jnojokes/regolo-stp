/**
 * L'esploso strutturale: cinque livelli di un edificio che si separano
 * (CLAUDE.md § Homepage, blocco 7 — WOW 1). **In SVG a livelli, non in 3D**
 * (DECISIONI.md, 03/09): il 3D entra solo con i CAD del cliente.
 *
 * È il blocco che racconta «il mestiere che nelle foto non si vede»: un
 * committente guarda le foto e vede le finiture, non la struttura che le regge.
 *
 * Qui c'è **solo geometria**: nessun colore, nessuna animazione. Le facce
 * escono come stringhe di punti già proiettate in isometria, e ogni livello
 * porta il proprio `dy` — di quanto è sollevato rispetto al pacchetto chiuso.
 *
 * Alla fase 3 il `dy` è quello di `SEPARAZIONE` e i livelli stanno già
 * separati: senza JavaScript il disegno è completo e leggibile, e con
 * `prefers-reduced-motion: reduce` resta così.
 * Alla fase 5 ScrollTrigger animerà **solo** il `translate` dei cinque `<g>`
 * fra 0 e `dy` — cioè `transform`, che è la sola cosa che si anima
 * (CLAUDE.md § Regole, 7). La geometria non si ricalcola mai a runtime.
 *
 * Il `viewBox` si ricava dall'ingombro vero dei poligoni, non a occhio: così
 * il disegno non esce dal riquadro né lascia margini morti.
 */

/* ---------- proiezione isometrica ------------------------------------------ */

/** Lato della cella, in unità SVG. */
const LATO = 34
/** Quanto si stacca ogni livello da quello sotto, in celle. */
const SEPARAZIONE = 1.5

const COS30 = Math.cos(Math.PI / 6)
const SIN30 = Math.sin(Math.PI / 6)

/** Da coordinate di pianta (x, y) e quota (z) a coordinate SVG. */
const iso = (x: number, y: number, z: number): [number, number] => [
  (x - y) * LATO * COS30,
  (x + y) * LATO * SIN30 - z * LATO,
]

const arrotonda = (n: number) => Math.round(n * 10) / 10
const punti = (p: [number, number][]) =>
  p.map(([x, y]) => `${arrotonda(x)},${arrotonda(y)}`).join(' ')

/* ---------- volumi --------------------------------------------------------- */

/**
 * Quale faccia. Le prime tre sono le facce visibili di un prisma e cambiano
 * solo di ombreggiatura; `apertura` è un serramento, e ha un colore proprio —
 * altrimenti una finestra dello stesso colore della parete non è una finestra,
 * ed è quello che rendeva l'involucro un blocco grigio invece di un involucro.
 */
export type Faccia = 'alto' | 'sinistra' | 'destra' | 'apertura'

export type Poligono = { faccia: Faccia; punti: string }
export type Polilinea = { punti: string; traccia: 'calore' | 'acqua' | 'aria' }

/**
 * Le tre facce visibili di un parallelepipedo appoggiato in (x, y) a quota z.
 * In isometria le altre tre non si vedono mai: disegnarle è peso inutile.
 */
function prisma(
  x: number,
  y: number,
  z: number,
  larghezza: number,
  profondita: number,
  altezza: number,
): Poligono[] {
  const w = larghezza
  const d = profondita
  const h = altezza
  return [
    {
      faccia: 'sinistra',
      punti: punti([
        iso(x, y + d, z),
        iso(x + w, y + d, z),
        iso(x + w, y + d, z + h),
        iso(x, y + d, z + h),
      ]),
    },
    {
      faccia: 'destra',
      punti: punti([
        iso(x + w, y, z),
        iso(x + w, y + d, z),
        iso(x + w, y + d, z + h),
        iso(x + w, y, z + h),
      ]),
    },
    {
      faccia: 'alto',
      punti: punti([
        iso(x, y, z + h),
        iso(x + w, y, z + h),
        iso(x + w, y + d, z + h),
        iso(x, y + d, z + h),
      ]),
    },
  ]
}

/**
 * Un'apertura sul filo di una parete: un poligono piatto, complanare alla
 * faccia su cui sta, disegnato dopo di essa perché le si sovrapponga.
 *
 * In questa isometria (`x` va a destra e in basso, `y` a sinistra e in basso)
 * le sole due facce verticali che si vedono sono il piano `x = L` e il piano
 * `y = L`: le altre due guardano dietro. Il prototipo metteva metà delle
 * aperture su `x = 0`, cioè dietro l'edificio, e quelle quattro finestre non
 * si sono mai viste — si intravedeva solo il loro spigolo sopra il tetto.
 */
function apertura(lato: 'sinistra' | 'destra', u: number, v: number): Poligono {
  const L = 6
  const z0 = 0.9 + v
  const z1 = 2.1 + v

  /* faccia destra: il piano x = L, l'apertura corre lungo y */
  if (lato === 'destra') {
    return {
      faccia: 'apertura',
      punti: punti([iso(L, u, z0), iso(L, u + 1.2, z0), iso(L, u + 1.2, z1), iso(L, u, z1)]),
    }
  }

  /* faccia sinistra: il piano y = L, l'apertura corre lungo x */
  return {
    faccia: 'apertura',
    punti: punti([iso(u, L, z0), iso(u + 1.2, L, z0), iso(u + 1.2, L, z1), iso(u, L, z1)]),
  }
}

const polilinea = (p: [number, number, number][], traccia: Polilinea['traccia']): Polilinea => ({
  punti: p
    .map(([x, y, z]) => iso(x, y, z))
    .map(([a, b]) => `${arrotonda(a)},${arrotonda(b)}`)
    .join(' '),
  traccia,
})

/* ---------- i cinque livelli ----------------------------------------------- */

export type Livello = {
  /** 0 in basso, 4 in cima: l'ordine di disegno e l'ordine di impilamento. */
  indice: number
  /** La chiave del token di colore e della classe CSS. */
  chiave: 'fondazioni' | 'struttura' | 'involucro' | 'impianti' | 'finiture'
  nome: string
  /** Cosa fa lo studio a quel livello. Compare nella legenda. */
  descrizione: string
  poligoni: Poligono[]
  polilinee: Polilinea[]
  /** Quanto è sollevato, in unità SVG. Alla fase 5 è il valore da animare. */
  dy: number
}

/** Spessore di ciascun livello, in celle: serve a impilarli senza compenetrarli. */
const SPESSORI = [0.7, 3.35, 3.35, 0.25, 0.3]

function costruisci(): Livello[] {
  /* Gli otto pilastri, ordinati per profondità (x + y crescente): in
     isometria si disegna da dietro in avanti, altrimenti un pilastro dietro
     copre quello davanti. Il prototipo non li ordinava e con volumi così
     sottili non si vedeva; con la geometria a colori pieni si vede. */
  const griglia: [number, number][] = (
    [
      [0, 0],
      [5, 0],
      [0, 5],
      [5, 5],
      [2.5, 0],
      [2.5, 5],
      [0, 2.5],
      [5, 2.5],
    ] as [number, number][]
  ).sort((a, b) => a[0] + a[1] - (b[0] + b[1]))

  const definizioni: Omit<Livello, 'indice' | 'dy'>[] = [
    {
      chiave: 'fondazioni',
      nome: 'Fondazioni',
      descrizione: 'dove tutto comincia: portanza del terreno e geometria dei plinti',
      poligoni: prisma(-0.4, -0.4, 0, 6.8, 6.8, 0.7),
      polilinee: [],
    },
    {
      chiave: 'struttura',
      nome: 'Struttura',
      descrizione: 'travi, pilastri, solai: è qui che si decide la sicurezza sismica',
      poligoni: [
        ...griglia.flatMap(([x, y]) => prisma(x, y, 0, 1, 1, 3)),
        ...prisma(0, 0, 3, 6, 6, 0.35),
      ],
      polilinee: [],
    },
    {
      chiave: 'involucro',
      nome: 'Involucro',
      descrizione: 'pareti e copertura: energia che non se ne va e acqua che non entra',
      poligoni: [
        ...prisma(0, 0, 0, 6, 6, 3.35),
        ...[
          [1, 0],
          [3, 0],
          [1, 2],
          [3, 2],
        ].flatMap(([u, v]) => [apertura('sinistra', u, v), apertura('destra', u, v)]),
      ],
      polilinee: [],
    },
    {
      chiave: 'impianti',
      nome: 'Impianti',
      descrizione: 'termico, elettrico, acustico: il comfort si progetta, non si aggiunge',
      poligoni: prisma(0, 0, 0, 6, 6, 0.25),
      polilinee: [
        polilinea(
          [
            [0.5, 0.5, 0.4],
            [0.5, 5.5, 0.4],
            [5.5, 5.5, 0.4],
          ],
          'calore',
        ),
        polilinea(
          [
            [5.5, 0.5, 0.4],
            [3, 0.5, 0.4],
            [3, 3, 0.4],
            [0.8, 3, 0.4],
          ],
          'acqua',
        ),
        polilinea(
          [
            [1.5, 1.5, 0.4],
            [1.5, 4.5, 0.4],
            [4.5, 4.5, 0.4],
            [4.5, 1.5, 0.4],
            [1.5, 1.5, 0.4],
          ],
          'aria',
        ),
      ],
    },
    {
      chiave: 'finiture',
      nome: 'Finiture',
      descrizione: 'quello che si vede: superfici, serramenti, dettagli',
      poligoni: prisma(-0.2, -0.2, 0, 6.4, 6.4, 0.3),
      polilinee: [],
    },
  ]

  /* Quota di partenza di ogni livello nel pacchetto chiuso, più lo stacco. */
  let quota = 0
  return definizioni.map((d, i) => {
    const dy = -(quota + i * SEPARAZIONE) * LATO
    quota += SPESSORI[i]
    return { ...d, indice: i, dy: arrotonda(dy) }
  })
}

export const livelli: readonly Livello[] = costruisci()

/* ---------- ingombro ------------------------------------------------------- */

/** Il riquadro che contiene i cinque livelli già separati, con un margine. */
function riquadro() {
  const MARGINE = 10
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity

  for (const l of livelli) {
    const coppie = [...l.poligoni.map((p) => p.punti), ...l.polilinee.map((p) => p.punti)]
      .join(' ')
      .split(' ')
      .filter(Boolean)
    for (const coppia of coppie) {
      const [x, y] = coppia.split(',').map(Number)
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y + l.dy)
      maxY = Math.max(maxY, y + l.dy)
    }
  }

  return {
    x: arrotonda(minX - MARGINE),
    y: arrotonda(minY - MARGINE),
    larghezza: arrotonda(maxX - minX + 2 * MARGINE),
    altezza: arrotonda(maxY - minY + 2 * MARGINE),
  }
}

export const RIQUADRO = riquadro()
export const VIEWBOX = `${RIQUADRO.x} ${RIQUADRO.y} ${RIQUADRO.larghezza} ${RIQUADRO.altezza}`

/**
 * Il testo alternativo. L'SVG è il contenuto, non una decorazione: chi non lo
 * vede deve ricevere gli stessi cinque livelli, nello stesso ordine.
 * La legenda accanto li ripete comunque in testo leggibile.
 */
export const DESCRIZIONE =
  'Esploso isometrico di un edificio nei suoi cinque livelli, dal basso verso l’alto: ' +
  livelli.map((l) => `${l.nome.toLowerCase()} — ${l.descrizione}`).join('; ') +
  '.'
