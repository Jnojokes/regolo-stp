import { DESCRIZIONE, riquadro, spigoli, tracciaSpigoli, vertici, VIEWBOX } from '@/lib/volume'

/**
 * Le tavole a filo della galleria: **disegni veri al posto dei rettangoli
 * grigi**.
 *
 * La reference mescola «fotografie, assonometrie a linea e diagrammi» nella
 * stessa parete di tavole (`kit/reference/ecolinear/1440-meta-70.jpeg`, dove il
 * pannello grande porta un disegno a filo in ambra e non una foto). I campi
 * grigi restano dove ci andrà una **fotografia** dello studio — quella non la
 * possiamo disegnare — ma dove ci va un **disegno** lo disegniamo davvero.
 *
 * Non è contenuto inventato e non è una deroga alla regola 1: è la stessa
 * geometria di `lib/volume.ts` che A usa per il suo esploso, cioè sei per sei
 * campate e tre piani, dichiarati come **schema** nel testo alternativo. Un
 * edificio modellato a mano sarebbe un progetto finto; un parallelepipedo con
 * la sua griglia di pilastri è un segno convenzionale, come l'arco di porta di
 * `Disegni.tsx`.
 *
 * ## Quattro viste, una geometria
 *
 * Due assonometrie a due angoli diversi e due proiezioni ortogonali. Le
 * ortogonali non aggiungono nessuna misura: **scartano un asse** invece di
 * ruotarlo, che è la differenza fra una pianta e un'assonometria su una tavola
 * vera. È anche il motivo per cui non c'è la pianta: proiettando su `xy` gli
 * spigoli verticali diventano punti e i due solai cadono sul perimetro, quindi
 * la pianta di questo volume è un quadrato con una riga in mezzo — corretta e
 * illeggibile a 300 px.
 */

/** L'unità di disegno delle ortogonali: la stessa di `lib/volume.ts`. */
const LATO = 34
const MARGINE = 8
/** Il secondo angolo dell'assonometria, in radianti. Poco più di 34°. */
const GIRO = 0.6

const arrotonda = (n: number) => Math.round(n * 10) / 10

type Piano = 'prospetto' | 'sezione'

/**
 * Una proiezione ortogonale del volume. Il prospetto guarda il fronte (`x`,
 * `z`), la sezione il fianco (`y`, `z`); in tutte e due la quota cresce verso
 * l'alto nel dato e verso il basso sullo schermo, e l'inversione si fa qui una
 * volta sola — come in `proietta()`.
 */
function ortogonale(piano: Piano) {
  const su = (v: readonly [number, number, number]) =>
    piano === 'prospetto'
      ? ([v[0] * LATO, -v[2] * LATO] as const)
      : ([v[1] * LATO, -v[2] * LATO] as const)

  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const v of vertici) {
    const [x, y] = su(v)
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  }

  /* In una proiezione ortogonale un asse si perde: spigoli diversi in tre
     dimensioni cadono sullo stesso segmento e gli spigoli paralleli allo
     sguardo diventano punti. Ripassare lo stesso tratto N volte non si vede su
     1 px e pesa nel `path`, quindi si scartano. */
  const visti = new Set<string>()
  let d = ''
  for (const [a, b] of spigoli) {
    const [x1, y1] = su(vertici[a])
    const [x2, y2] = su(vertici[b])
    if (x1 === x2 && y1 === y2) continue
    const avanti = x1 < x2 || (x1 === x2 && y1 < y2)
    const chiave = avanti ? `${x1},${y1}|${x2},${y2}` : `${x2},${y2}|${x1},${y1}`
    if (visti.has(chiave)) continue
    visti.add(chiave)
    d += `M${arrotonda(x1)} ${arrotonda(y1)}L${arrotonda(x2)} ${arrotonda(y2)}`
  }

  return {
    d,
    viewBox: `${arrotonda(minX - MARGINE)} ${arrotonda(minY - MARGINE)} ${arrotonda(
      maxX - minX + 2 * MARGINE,
    )} ${arrotonda(maxY - minY + 2 * MARGINE)}`,
  }
}

function riquadroGirato() {
  const q = riquadro(GIRO)
  return `${q.x} ${q.y} ${q.larghezza} ${q.altezza}`
}

export type Vista = 'assonometria' | 'assonometria-girata' | 'prospetto' | 'sezione'

/**
 * Come si chiama ogni vista. Sta qui e non nel blocco che la impagina, perché
 * il nome è del disegno: la didascalia della galleria e il testo alternativo
 * devono dire la stessa cosa, e due elenchi lo garantiscono finché qualcuno non
 * ne aggiorna uno solo.
 */
export const NOMI_VISTA: Record<Vista, string> = {
  assonometria: 'assonometria',
  'assonometria-girata': 'assonometria, secondo angolo',
  prospetto: 'prospetto sul fronte',
  sezione: 'sezione sul fianco',
}

/* Le quattro viste si calcolano una volta sola al caricamento del modulo: sono
   costanti, e ricalcolarle a ogni render sarebbe lavoro per niente. */
const VISTE: Record<Vista, { d: string; viewBox: string }> = {
  assonometria: { d: tracciaSpigoli(), viewBox: VIEWBOX },
  'assonometria-girata': { d: tracciaSpigoli(GIRO), viewBox: riquadroGirato() },
  prospetto: ortogonale('prospetto'),
  sezione: ortogonale('sezione'),
}

/**
 * Una tavola: il disegno dentro il pannello, con le squadrette di registro e la
 * sigla `fig. 0n` in basso — la stessa composizione del pannello delle fasi,
 * perché è la stessa cosa: un disegno appoggiato sul foglio.
 *
 * Il nome accessibile sta sull'`<svg>` e **non** sul contenitore: un
 * `role="img"` sul riquadro renderebbe presentazionali tutti i suoi figli, e la
 * sigla `fig. 0n` — che è un dato, non una decorazione — sparirebbe da chi
 * ascolta.
 */
export function TavolaVolume({
  vista,
  fig,
  su,
  ratio,
}: {
  vista: Vista
  /** Il numero della tavola: lo conta il chiamante sull'ordine dei campi. */
  fig: number
  /** Quante tavole ci sono in tutto: anche questo lo conta il chiamante. */
  su: number
  ratio: string
}) {
  const v = VISTE[vista]
  return (
    <div className="ecolinear-tavola-disegno" style={{ aspectRatio: ratio }}>
      <svg
        className="ecolinear-tavola-filo"
        viewBox={v.viewBox}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={`Tavola ${NOMI_VISTA[vista]}. ${DESCRIZIONE}`}
      >
        <path
          d={v.d}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* La sigla è la forma esatta della reference — `Fig. 01 / 10`,
          `misure.json`, il paragrafo campione della pagina — ed è testo vero:
          la numerazione di una tavola è un dato, non un ornamento. I due
          numeri li conta il chiamante sull'elenco dei campi, quindi se un
          giorno le tavole diventano cinque il denominatore lo segue. */}
      <span className="ecolinear-tavola-fig">
        fig. {String(fig).padStart(2, '0')} / {String(su).padStart(2, '0')}
      </span>
    </div>
  )
}
