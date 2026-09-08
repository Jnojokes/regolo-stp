/**
 * I disegni a filo di ecoLINEAR: la cosa che fa di quella pagina **un foglio da
 * disegno tecnico** invece di un sito con dei blocchi.
 *
 * Guardati in `kit/reference/ecolinear/1440-hero.jpeg`: negli angoli della
 * prima schermata ci sono un arco di apertura di una porta con il suo stipite,
 * un cerchio con l'asse di centro, e in basso a destra una sezione a filetti
 * paralleli. Sono **linee sottili in terracotta al 38 %**, non riempimenti, e
 * non illustrano niente: dicono che quella superficie è una tavola.
 *
 * ## Perché sono disegnati e non immagini
 *
 * Sono **primitive geometriche** — archi, cerchi, segmenti, tratteggi — e non
 * rappresentano nessuna opera del cliente: `CLAUDE.md` § Regole, 1 vieta di
 * inventare contenuti dello studio, e un arco di porta non è un contenuto, è
 * un segno convenzionale del disegno edilizio. È la stessa distinzione per cui
 * l'esploso di A è ammesso: geometria calcolata, non un progetto finto.
 *
 * Sono **`aria-hidden` e `data-decorativo`**, che è un contratto verso
 * `scripts/collaudo/contrasto-dom.mjs` (decisione n. 38): stanno a 1,9:1 di
 * proposito e nessuna informazione ci passa. Se un giorno uno di loro dovesse
 * portare un dato, l'attributo va togliato e il contrasto rifatto.
 *
 * `vector-effect="non-scaling-stroke"` su tutti: il tratto resta di 1 px a
 * qualunque scala, che è quello che fa un CAD e non quello che fa un SVG
 * scalato.
 */

const filo = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1,
  vectorEffect: 'non-scaling-stroke' as const,
}

/** L'arco di apertura di una porta, con lo stipite e il muro. In alto a sinistra. */
export function SegnoPorta({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`segno ${className}`.trim()}
      viewBox="0 0 240 200"
      aria-hidden="true"
      data-decorativo=""
      preserveAspectRatio="xMinYMin meet"
    >
      {/* il muro, in doppio filo come in pianta */}
      <path d="M0 18 H200 M0 30 H200" {...filo} />
      <path d="M18 18 V190 M30 18 V190" {...filo} />
      {/* i tre segni di misura sul muro */}
      <path d="M80 30 V44 M110 30 V44 M140 30 V44" {...filo} />
      {/* l'anta e il suo arco di apertura */}
      <path d="M200 30 V150" {...filo} />
      <path d="M200 30 A120 120 0 0 1 80 150" {...filo} />
    </svg>
  )
}

/** Un cerchio con l'asse di centro: il segno di un pilastro in pianta. */
export function SegnoPilastro({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`segno ${className}`.trim()}
      viewBox="0 0 120 160"
      aria-hidden="true"
      data-decorativo=""
      preserveAspectRatio="xMinYMin meet"
    >
      <circle cx="60" cy="72" r="58" {...filo} />
      {/* l'asse esce dal cerchio da tutte e due le parti: è la convenzione */}
      <path d="M60 0 V160" {...filo} />
    </svg>
  )
}

/** Una sezione a filetti paralleli: il segno di un solaio o di una scala. */
export function SegnoSezione({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`segno ${className}`.trim()}
      viewBox="0 0 320 140"
      aria-hidden="true"
      data-decorativo=""
      preserveAspectRatio="xMaxYMax meet"
    >
      <path d="M0 108 H320 M0 120 H320" {...filo} />
      {/* i montanti, a passo costante: è il tratteggio di una struttura */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path key={i} d={`M${230 + i * 14} 40 V108`} {...filo} />
      ))}
      <path d="M188 40 H320" {...filo} />
    </svg>
  )
}

/**
 * Il disegno dentro il pannello di una fase: **una linea sola, in ambra**, che
 * cambia con la fase. Nella reference è una spezzata che scende a gradini
 * (`1440-meta-52.jpeg`) e per l'ultima fase un tratteggio a mattoni con una
 * fascia gialla (`1440-meta-88.jpeg`): il disegno dice *a che punto del
 * cantiere si è*, e questo è il motivo per cui non è la stessa figura ogni
 * volta.
 *
 * Cinque disegni per cinque fasi, e ognuno è la fase: l'incontro (un punto e
 * due assi), la fattibilità (una spezzata che sale), il progetto (una pianta a
 * gradini), le autorizzazioni (un riquadro con il visto), il cantiere (il
 * tratteggio a mattoni con il corso di gialla).
 */
export function SegnoFase({ indice }: { indice: number }) {
  return (
    <svg
      className="segno segno-fase"
      viewBox="0 0 360 300"
      aria-hidden="true"
      data-decorativo=""
      preserveAspectRatio="xMidYMid meet"
    >
      {indice === 0 && (
        <>
          <path d="M40 150 H320 M180 40 V260" {...filo} />
          <circle cx="180" cy="150" r="10" {...filo} />
          <circle cx="180" cy="150" r="34" {...filo} />
        </>
      )}
      {indice === 1 && (
        <>
          <path d="M40 250 H320" {...filo} />
          <path d="M40 250 L120 250 L120 190 L200 190 L200 120 L280 120 L280 60" {...filo} />
          <path d="M40 60 V250" {...filo} />
        </>
      )}
      {indice === 2 && (
        <>
          <path d="M70 90 H200 V150 H250 V230 H70 Z" {...filo} />
          <path d="M200 90 V150 M70 150 H200" {...filo} />
          <path d="M110 230 V240 M150 230 V240" {...filo} />
        </>
      )}
      {indice === 3 && (
        <>
          <path d="M70 70 H290 V230 H70 Z" {...filo} />
          <path d="M70 110 H290" {...filo} />
          {/* il visto: due segmenti, come un timbro */}
          <path d="M210 170 l24 24 l44 -54" {...filo} strokeWidth={2} />
        </>
      )}
      {indice === 4 && (
        <>
          {[0, 1, 2, 3].map((r) => (
            <g key={r}>
              {[0, 1, 2, 3, 4].map((c) => (
                <rect
                  key={c}
                  x={70 + c * 46 + (r % 2 ? 23 : 0)}
                  y={100 + r * 30}
                  width="42"
                  height="26"
                  {...filo}
                />
              ))}
            </g>
          ))}
          {/* il corso in ambra piena: l'unico riempimento di tutti i disegni */}
          <rect x="70" y="226" width="226" height="22" fill="var(--regolo-ambra)" stroke="none" />
        </>
      )}
    </svg>
  )
}

/**
 * La griglia di costruzione: le linee tratteggiate che attraversano la prima
 * schermata da bordo a bordo.
 *
 * Misurate sulla reference: due verticali e due orizzontali, in terracotta al
 * 38 %, tratteggiate. Sono l'unica cosa che tiene insieme la composizione della
 * hero — senza di loro il marchio galleggia in mezzo al grigio — e sono anche
 * il motivo per cui quella pagina si legge come una tavola.
 *
 * Non è un `background-image` a gradienti ripetuti ma quattro `<line>`: così le
 * quote si possono agganciare a una posizione precisa, che è quello che serve
 * quando la griglia deve incrociare il marchio in un punto e non in un altro.
 */
export function GrigliaCostruzione() {
  return (
    <svg
      className="griglia-costruzione"
      aria-hidden="true"
      data-decorativo=""
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {[13.5, 86.5].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="100" strokeDasharray="1.4 1.4" {...filo} />
      ))}
      {[17, 85].map((y) => (
        <line key={y} x1="0" y1={y} x2="100" y2={y} strokeDasharray="1.4 1.4" {...filo} />
      ))}
    </svg>
  )
}
