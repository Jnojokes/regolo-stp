/**
 * Lo stesso edificio di `lib/esploso.ts`, **in prospettiva** invece che in
 * isometria: è il degrado del blocco 3D dell'opzione B (decisione n. 44).
 *
 * ## Perché esiste un secondo proiettore
 *
 * Il committente ha riaperto il divieto di 3D in pagina, e in C entra un volume
 * vero in WebGL. Ma un canvas non è contenuto: senza JavaScript, senza WebGL o
 * con `prefers-reduced-motion: reduce` in pagina deve restare qualcosa di
 * leggibile — è la regola 4 di `CLAUDE.md`, non toccata. Quel qualcosa è un
 * **SVG reso dal server** dagli stessi volumi.
 *
 * E deve essere un disegno **diverso** da quello di A, altrimenti il degrado di
 * C diventa il blocco di A riciclato — che è esattamente il difetto che questa
 * fase esiste per non ripetere. La differenza non è una tinta: A proietta in
 * **isometria** (linee parallele, nessun punto di fuga: è una tavola tecnica,
 * si misura), C proietta in **prospettiva** (le fughe convergono: è una veduta,
 * si guarda). Stesso dato, due lingue.
 *
 * ## Come funziona la proiezione
 *
 * Tre passaggi, tutti a mano perché sono venti righe e una libreria di matrici
 * per venti righe è 40 KB per niente:
 *
 * 1. si centra il modello sul proprio baricentro di pianta, così ruota su sé
 *    stesso invece che scappare fuori dal riquadro;
 * 2. si ruota di `IMBARDATA` attorno all'asse verticale e di `INCLINAZIONE`
 *    attorno all'orizzontale — è la vista di tre quarti dall'alto con cui si
 *    guarda un modello sul tavolo;
 * 3. si divide per la profondità (`FUOCO / (distanza + profondità)`): è la
 *    prospettiva, e la ragione per cui questo disegno non si può misurare con un
 *    righello mentre quello di A sì.
 *
 * Le facce nascoste si scartano col **prodotto scalare fra la normale e la
 * direzione di vista**, non a occhio: in isometria le facce visibili sono sempre
 * le stesse tre e si potevano elencare a mano (`lib/esploso.ts` lo fa), in
 * prospettiva dipendono da dove sta la scatola nel riquadro. E si disegnano
 * **da dietro in avanti**, ordinate per profondità del baricentro, perché un
 * SVG non ha un depth buffer.
 */

import { volumi, type Scatola } from './esploso'

/* ---------- la camera ------------------------------------------------------ */

/** Vista di tre quarti: 34° di imbardata, 24° d'inclinazione dall'alto. */
const IMBARDATA = (34 * Math.PI) / 180
const INCLINAZIONE = (24 * Math.PI) / 180
/**
 * Distanza dell'occhio dal modello e alzo, in celle. **Risolti, non scelti**:
 * una ricerca su tutte e quattro le condizioni — pacchetto chiuso e aperto,
 * riquadro a 1440 e a 390 — cerca la massima estensione verticale che resta
 * dentro il riquadro. Con i valori di prima due livelli su cinque uscivano dal
 * bordo alto. Sono gli stessi di `components/fonderia/VolumeVivo.tsx`, e devono
 * restare gli stessi: l'SVG è il **fotogramma di degrado** del canvas, e due
 * camere diverse si vedrebbero come un salto nel punto in cui WebGL parte.
 */
const DISTANZA = 35.5
const ALZO = -6
/** Lunghezza focale, in unità di disegno per cella. */
const FUOCO = 560

const cosI = Math.cos(IMBARDATA)
const senI = Math.sin(IMBARDATA)
const cosC = Math.cos(INCLINAZIONE)
const senC = Math.sin(INCLINAZIONE)

/** Il centro di pianta del modello: 6 celle di lato, quindi 3. */
const CENTRO = 3

type Punto3 = readonly [number, number, number]

/** Dal modello alla camera: imbardata attorno a z, poi inclinazione attorno a x. */
function inCamera([x, y, z]: Punto3): Punto3 {
  const px = x - CENTRO
  const py = y - CENTRO
  const rx = px * cosI - py * senI
  const ry = px * senI + py * cosI
  /* `ry` è la profondità, `z` l'altezza: l'inclinazione le mescola. */
  return [rx, z * cosC - ry * senC, ry * cosC + z * senC]
}

/** Dalla camera allo schermo. Il segno di `y` si inverte: in SVG y cresce in giù. */
function proietta(p: Punto3): readonly [number, number] {
  const [cx, cy, cz] = inCamera(p)
  const k = FUOCO / (DISTANZA + cz)
  return [cx * k, -(cy + ALZO) * k]
}

const arrotonda = (n: number) => Math.round(n * 10) / 10

/* ---------- le facce di una scatola ---------------------------------------- */

/** Le sei facce, ognuna coi vertici in senso antiorario visti da fuori. */
const FACCE: readonly {
  chiave: 'alto' | 'basso' | 'nord' | 'sud' | 'est' | 'ovest'
  normale: Punto3
  vertici: readonly Punto3[]
}[] = [
  {
    chiave: 'alto',
    normale: [0, 0, 1],
    vertici: [
      [0, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 1, 1],
    ],
  },
  {
    chiave: 'basso',
    normale: [0, 0, -1],
    vertici: [
      [0, 1, 0],
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ],
  },
  {
    chiave: 'sud',
    normale: [0, -1, 0],
    vertici: [
      [0, 0, 0],
      [1, 0, 0],
      [1, 0, 1],
      [0, 0, 1],
    ],
  },
  {
    chiave: 'nord',
    normale: [0, 1, 0],
    vertici: [
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 1],
      [1, 1, 1],
    ],
  },
  {
    chiave: 'est',
    normale: [1, 0, 0],
    vertici: [
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
    ],
  },
  {
    chiave: 'ovest',
    normale: [-1, 0, 0],
    vertici: [
      [0, 1, 0],
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 1],
    ],
  },
]

/**
 * Quale delle quattro tinte del tema veste una faccia. Sono le stesse quattro
 * di `lib/esploso.ts` — alto, sinistra, destra — più il basso, che in isometria
 * non si vede mai e in prospettiva dal di sotto sì.
 */
export type FacciaVolume = 'alto' | 'sinistra' | 'destra' | 'basso'

export type PoligonoVolume = {
  faccia: FacciaVolume
  punti: string
  /** Profondità del baricentro: serve solo a ordinare il disegno. */
  z: number
}

const TINTA: Record<string, FacciaVolume> = {
  alto: 'alto',
  basso: 'basso',
  nord: 'sinistra',
  ovest: 'sinistra',
  sud: 'destra',
  est: 'destra',
}

function facceVisibili(s: Scatola, dz: number): PoligonoVolume[] {
  const fuori: PoligonoVolume[] = []
  for (const f of FACCE) {
    /* La normale in coordinate di camera. Se guarda via dall'occhio — cioè se
       la sua componente di profondità è positiva — la faccia è nascosta. Si
       confronta la normale ruotata, non quella del modello: è il passaggio che
       in isometria si può saltare e in prospettiva no. */
    const [, , nz] = inCamera([f.normale[0] + CENTRO, f.normale[1] + CENTRO, f.normale[2]])
    const [, , oz] = inCamera([CENTRO, CENTRO, 0])
    if (nz - oz > 0) continue

    const punti = f.vertici.map((v) =>
      proietta([s.x + v[0] * s.w, s.y + v[1] * s.d, s.z + dz + v[2] * s.h]),
    )
    const profondita =
      f.vertici.reduce(
        (acc, v) => acc + inCamera([s.x + v[0] * s.w, s.y + v[1] * s.d, s.z + dz + v[2] * s.h])[2],
        0,
      ) / f.vertici.length

    fuori.push({
      faccia: TINTA[f.chiave],
      punti: punti.map(([x, y]) => `${arrotonda(x)},${arrotonda(y)}`).join(' '),
      z: arrotonda(profondita),
    })
  }
  return fuori
}

/* ---------- i cinque livelli, in prospettiva ------------------------------- */

export type LivelloProiettato = {
  chiave: string
  nome: string
  descrizione: string
  poligoni: PoligonoVolume[]
}

/**
 * `apertura` dice di quanto i livelli sono separati: **0** è il pacchetto
 * chiuso, **1** l'esploso completo. È lo stesso parametro che pilota il
 * volume in WebGL, così il fotogramma di degrado e il primo fotogramma
 * dell'animazione sono la stessa immagine.
 *
 * Il valore reso dal server è **1** — l'esploso completo — per la stessa
 * ragione per cui gli `initial-value` delle property della colata sono lo stato
 * finito: dove il gesto non c'è si deve vedere una figura finita, non un
 * pacchetto chiuso che non spiega niente.
 */
export function livelliProiettati(apertura = 1): LivelloProiettato[] {
  return volumi.map((l) => {
    const poligoni = l.scatole
      .flatMap((s) => facceVisibili(s, l.dz * apertura))
      /* Da dietro in avanti: un SVG non ha un depth buffer, l'ordine di
         sorgente **è** l'ordine di disegno. */
      .sort((a, b) => b.z - a.z)
    return { chiave: l.chiave, nome: l.nome, descrizione: l.descrizione, poligoni }
  })
}

/** Il riquadro, dall'ingombro vero dei poligoni: mai a occhio. */
export function riquadroProiettato(apertura = 1): string {
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const l of livelliProiettati(apertura))
    for (const p of l.poligoni)
      for (const coppia of p.punti.split(' ')) {
        const [x, y] = coppia.split(',').map(Number)
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
  const M = 24
  return `${arrotonda(minX - M)} ${arrotonda(minY - M)} ${arrotonda(maxX - minX + 2 * M)} ${arrotonda(maxY - minY + 2 * M)}`
}

/**
 * Il testo alternativo. Il volume è **contenuto**, non decorazione: chi non lo
 * vede riceve gli stessi cinque livelli nello stesso ordine, e la legenda
 * accanto li ripete comunque in testo leggibile.
 */
export const DESCRIZIONE_VOLUME =
  'Vista in prospettiva di un edificio scomposto nei suoi cinque livelli, dal basso verso l’alto: ' +
  volumi.map((l) => `${l.nome.toLowerCase()} — ${l.descrizione}`).join('; ') +
  '.'
