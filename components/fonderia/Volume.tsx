import { Colata } from '@/components/fonderia/Colata'
import { VolumeVivo } from '@/components/fonderia/VolumeVivo'
import { DESCRIZIONE_VOLUME, livelliProiettati, riquadroProiettato } from '@/lib/volume'

/**
 * Il volume: i cinque livelli dell'edificio in **prospettiva vera**, che si
 * separano allo scorrimento.
 *
 * ## Perché c'è del 3D, dopo un divieto
 *
 * Il committente ha riaperto la questione: *«ma non ha senso la regola niente 3D
 * in pagina»*. La regola non diceva «il 3D è brutto», diceva due cose diverse —
 * l'esploso di A dev'essere SVG perché deve funzionare senza JavaScript e
 * ritematizzarsi, e Blender era fuori perché **non ci sono i CAD del cliente** e
 * un edificio modellato a mano sarebbe contenuto inventato. La seconda parte non
 * è cambiata e resta.
 *
 * Quello che è cambiato è che il divieto in blocco non serviva: `lib/esploso.ts`
 * **non è un disegno**, sotto è geometria 3D vera — prismi definiti da
 * `(x, y, z, w, d, h)` e poi *proiettati* in isometria. Il volume esiste già nel
 * repo come nostra geometria calcolata, non come contenuto del cliente. A lo
 * disegna piatto come una tavola tecnica; C lo **cola** in volume. **Stesso
 * dato, due lingue**, e in call alternare le due schede è la dimostrazione.
 *
 * ## Perché non c'è `three.js`
 *
 * Il committente aveva messo in conto lo sfondamento del budget. Non serve
 * spenderlo: cinque prismi a facce piene con un depth buffer sono ~150 righe di
 * WebGL grezzo, cioè **~5 KB gz** contro i ~130 di `three.js` tree-shaken, su un
 * budget di 180 KB gz per tutto il primo carico. Se in call il volume non regge,
 * passare a `three.js` è la sostituzione di un file — lo dico perché la scelta
 * resta sua, non mia (`DECISIONI.md` n. 44).
 *
 * ## Come degrada, e sono tre livelli
 *
 * Nessuno dei tre è una pagina rotta, ed è la regola 4 di `CLAUDE.md`:
 *
 * 1. **senza JavaScript, senza WebGL, o con `prefers-reduced-motion: reduce`** —
 *    si vede l'**SVG in prospettiva reso dal server** che è qui sotto, con i
 *    livelli **già separati**. È lo stesso principio degli `initial-value` della
 *    colata: dove il gesto non c'è si vede una figura finita, non un pacchetto
 *    chiuso che non spiega niente;
 * 2. **con WebGL** — `VolumeVivo` monta un canvas *sopra* l'SVG e lo nasconde.
 *    Se qualcosa va storto — contesto negato, shader che non compila — il canvas
 *    non si monta e l'SVG resta dove è: il fallback non è un ramo da ricordarsi,
 *    è lo stato di partenza;
 * 3. **la legenda è testo vero** in tutti i casi. Un canvas non porta
 *    informazione da solo, e i cinque livelli sono contenuto: chi non vede né il
 *    canvas né l'SVG li legge comunque, in ordine.
 */
export function Volume() {
  const livelli = livelliProiettati(1)
  const viewBox = riquadroProiettato(1)

  return (
    <Colata
      id="volume"
      etichetta="un edificio, cinque livelli"
      valore={`${livelli.length} livelli`}
    >
      <div className="colata-volume">
        {/* Il fotogramma di partenza, reso dal server. `VolumeVivo` gli mette il
            canvas sopra quando WebGL c'è; qui non c'è nessuna condizione da
            valutare, perché lo stato senza JavaScript **è** questo. */}
        <svg
          className="volume-piano"
          viewBox={viewBox}
          role="img"
          aria-label={DESCRIZIONE_VOLUME}
          /* La geometria è calcolata sul server e non si ricalcola mai a
             runtime: `preserveAspectRatio` la scala, non la ridisegna. */
          preserveAspectRatio="xMidYMid meet"
        >
          {livelli.map((l) => (
            <g key={l.chiave} data-livello={l.chiave}>
              {l.poligoni.map((p, i) => (
                <polygon key={i} points={p.punti} data-faccia={p.faccia} />
              ))}
            </g>
          ))}
        </svg>

        <VolumeVivo />

        {/* La legenda: testo, sempre. Non è una didascalia del disegno — è il
            contenuto del blocco, e il disegno ne è l'illustrazione. */}
        <ol className="volume-legenda" role="list">
          {livelli.map((l) => (
            <li key={l.chiave} data-livello={l.chiave}>
              <span className="volume-legenda-nome">{l.nome}</span>
            </li>
          ))}
        </ol>
      </div>
    </Colata>
  )
}
