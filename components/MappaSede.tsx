import { province, sede } from '@/lib/territorio'

/**
 * La mappa statica della sede, nel footer (CLAUDE.md § Homepage, blocco 13).
 *
 * **È lo stesso SVG del territorio**, non un'immagine, non un tile, non un
 * iframe:
 *
 * - **zero richieste e zero byte in più**: la geometria è già nel bundle
 *   (`lib/territorio.ts`), e qui si riusa un solo perimetro dei tre;
 * - **zero terzi**: un tile server è qualcuno che vede l'indirizzo IP di chi
 *   visita, quindi una voce in più nell'informativa e — con un consenso — un
 *   gate davanti alla mappa. La decisione del 07/09 lo esclude, e questo la
 *   rispetta anche nel footer;
 * - **si ritematizza**: usa i token della mappa, quindi segue i tre temi.
 *
 * ## Era una striscia, e una striscia non era una mappa
 *
 * Prima il `viewBox` era una finestra 21/6 larga il 62 % del disegno, centrata
 * sulla sede: **356 × 102 px** in cui si vedevano due tratti di confine tagliati
 * ai quattro lati, nessun nome e una crocetta. Il rapporto era stato scelto per
 * non somigliare alla mappa 4/3 di `/contatti` — cioè per una ragione di
 * impaginazione — e il prezzo era che la figura non si riconosceva. Una mappa
 * che non si riconosce non è una mappa: è un ornamento, e un ornamento nel
 * footer non ci va.
 *
 * Adesso il `viewBox` è **il riquadro della provincia della sede**, calcolato
 * dal percorso vero e non scritto a mano, più un margine. In pagina ci sono le
 * tre cose che rendono leggibile una mappa: il **perimetro intero**, il
 * **punto** della sede e il **nome del comune**. Il rapporto lo decide la
 * geometria (FM misura 365,1 × 318,6 unità, cioè 1,15) e non una costante nel
 * CSS: `.mappa-sede-footer` non ha più un `aspect-ratio` da tenere allineato a
 * mano, se lo prende dal `viewBox`.
 *
 * **Un nome solo, ed è quello del comune.** Il comune di Fermo sta nella
 * provincia di Fermo: scrivere anche il nome della provincia metterebbe due
 * «Fermo» a un centimetro di distanza, che è la stessa trappola già evitata in
 * `components/sezioni/Territorio.tsx`. Che provincia sia lo dice il nome
 * accessibile, e accanto alla mappa il footer stampa l'indirizzo per esteso.
 */

/**
 * Il riquadro che contiene un percorso di `lib/territorio.ts`.
 *
 * Quei percorsi hanno una forma sola — `M x y` seguito da `Lx y` e chiuso da
 * `Z`, coordinate assolute, un numero per componente
 * (`scripts/genera-territorio.mjs`) — quindi tutti i numeri del percorso sono
 * coppie di punti e il minimo e il massimo sono il riquadro esatto. Si calcola
 * qui e non in `lib/territorio.ts` perché quel file è **generato** e non si
 * modifica a mano.
 */
function riquadro(d: string) {
  const numeri = (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number)
  let xMin = Infinity
  let xMax = -Infinity
  let yMin = Infinity
  let yMax = -Infinity
  for (let i = 0; i + 1 < numeri.length; i += 2) {
    xMin = Math.min(xMin, numeri[i])
    xMax = Math.max(xMax, numeri[i])
    yMin = Math.min(yMin, numeri[i + 1])
    yMax = Math.max(yMax, numeri[i + 1])
  }
  return { xMin, xMax, yMin, yMax }
}

/* La provincia della sede, non «Fermo» scritto qui dentro: la sede viene da
   `comuni`, e ogni comune porta la sigla di una delle tre province generate.
   Se il giorno che lo studio apre una seconda sede il dato cambia, cambia anche
   il perimetro disegnato, e non resta una provincia sbagliata in fondo a ogni
   pagina. */
const provinciaSede = province.find((p) => p.sigla === sede.sigla)!

/* Il margine intorno al perimetro. Serve a due cose: che il confine non
   combaci con il bordo del riquadro (un perimetro tagliato a filo si legge come
   un ritaglio, che è il difetto da cui si viene) e che il segno della sede, che
   sporge di 9 unità, resti dentro. */
const MARGINE = 12

const R = riquadro(provinciaSede.d)
const VISTA = {
  x: R.xMin - MARGINE,
  y: R.yMin - MARGINE,
  larghezza: R.xMax - R.xMin + 2 * MARGINE,
  altezza: R.yMax - R.yMin + 2 * MARGINE,
}

export function MappaSede() {
  return (
    <svg
      className="mappa-sede-footer"
      viewBox={`${VISTA.x} ${VISTA.y} ${VISTA.larghezza} ${VISTA.altezza}`}
      role="img"
      aria-label={`La provincia di ${provinciaSede.nome}, con la sede dello studio segnata a ${sede.nome}.`}
    >
      <path className="mappa-perimetro" d={provinciaSede.d} />

      {/* La croce di quota al posto del pallino: è il segno con cui si marca un
          punto su una tavola. */}
      <g className="mappa-croce">
        <line x1={sede.x - 9} y1={sede.y} x2={sede.x + 9} y2={sede.y} />
        <line x1={sede.x} y1={sede.y - 9} x2={sede.x} y2={sede.y + 9} />
      </g>

      {/* Il nome, a sinistra del segno: la sede sta sulla costa, cioè
          all'estremo destro del perimetro, e un'etichetta allineata a sinistra
          uscirebbe dal riquadro. L'alone del filetto di fondo la stacca dalla
          linea di confine quando le passa vicino, come sulla mappa grande. */}
      <text
        className="mappa-etichetta mappa-etichetta-sede"
        x={sede.x - 14}
        y={sede.y + 5}
        textAnchor="end"
      >
        {sede.nome}
      </text>
    </svg>
  )
}
