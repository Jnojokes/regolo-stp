import { Quota } from '@/components/Quota'
import { Sezione } from '@/components/sezioni/Sezione'
import { DaCliente } from '@/components/Placeholder'
import { VIEWBOX, comuneByNome, comuni, comuniServiti, province, sede } from '@/lib/territorio'
import { daCliente } from '@/lib/site'

/**
 * Il territorio (CLAUDE.md § Homepage, blocco 11).
 *
 * Per uno studio locale è la credenziale principale: non «operiamo in tutta
 * Italia», ma i comuni, uno per uno. È anche il blocco che regge la SEO locale
 * (decisione n. 13: quali comuni presidiare).
 *
 * Le tre province disegnate sono quelle dell'autocomplete del brief (CLAUDE.md
 * § Il form): il riquadro geografico del lavoro, non l'elenco di dove hanno
 * lavorato — quello arriva dallo studio e oggi è un segnaposto.
 *
 * ## Niente mappa a tile, e non per estetica
 *
 * Un tile server — Google Maps, Mapbox, OpenStreetMap — è un terzo che riceve
 * l'indirizzo IP di chiunque apra la pagina. Vuol dire una voce in più
 * nell'informativa e, se si vuole essere seri, un consent gate davanti alla
 * mappa. Il perimetro delle tre province in SVG pesa 4 KB nell'HTML, non chiama
 * nessuno e non ha cookie (CLAUDE.md § SEO, GEO, legal — nessun iframe di terzi).
 *
 * Il perimetro è **vero**: viene dai confini amministrativi ISTAT, semplificati
 * a ~100 m (`scripts/genera-territorio.mjs`). Non è un disegno a mano libera
 * che somiglia alle Marche.
 *
 * ## Perché non c'è nessun comune accesso
 *
 * La geometria di un confine non è un'affermazione. Accendere il punto di un
 * comune sì: dice «qui abbiamo lavorato». Quali siano è la decisione n. 13,
 * aperta, e finché lo studio non manda la lista `comuniServiti` resta vuoto e
 * in pagina non si accende niente (CLAUDE.md § Regole, 1).
 *
 * L'unico punto segnato è la **sede**, che è un dato confermato: Via
 * Campiglione 2/E, Fermo. Dire dove si ha lo studio non è dire dove si è
 * lavorato.
 */
/**
 * Il testo alternativo della mappa, come stringa unica (vedi il commento sotto).
 *
 * **Descrive, non afferma.** «Le tre province in cui lavora lo studio» era la
 * versione precedente, ed era un dato che lo studio non ha confermato: dove
 * abbiano lavorato è la decisione n. 13, aperta, e l'elenco accanto è un
 * segnaposto. Il nome accessibile non può dire come fatto quello che il testo
 * visibile dichiara mancante — altrimenti chi usa uno screen reader riceve
 * un'affermazione che chi guarda non riceve.
 *
 * Perché queste tre e non altre: il perimetro è quello delle province su cui è
 * costruito l'autocomplete del brief (CLAUDE.md § Il form, «comune con
 * autocomplete su FM/MC/AP»). È il riquadro geografico, non una credenziale.
 */
const DESCRIZIONE_MAPPA =
  'Le province di ' +
  province.map((p) => p.nome).join(', ') +
  ', con la sede dello studio segnata a Fermo.'

/** Quanti comuni ha una provincia, contati dall'elenco vero. */
const contaComuni = (sigla: string) => comuni.filter((c) => c.sigla === sigla).length

export function Territorio() {
  const serviti = comuniServiti.map(comuneByNome).filter((c) => c !== undefined)

  return (
    <Sezione
      id="territorio"
      passo="corto"

      nota="I comuni li manda lo studio: è anche la lista da cui si decide quali presidiare in ricerca. La mappa disegna Fermo, Macerata e Ascoli Piceno perché sono le tre province dell’autocomplete del brief — è il riquadro geografico, non un elenco di dove avete lavorato. Finché la lista non c’è, l’unico punto segnato è la sede."
    >
      <div className="grid-12 items-center">
        <div className="nav:col-span-5 col-span-12">
          <p className="etichetta-sezione">il territorio</p>
          <h2 className="mt-3 max-w-[18ch]">Dove abbiamo lavorato.</h2>
          <p className="intro-sezione text-lead">
            Per uno studio locale è la credenziale che conta più di tutte: i comuni, uno per uno,
            con i progetti collegati.
          </p>

          {/* La seconda delle tre quote del sito, e la sola con una fonte
              pubblica citabile: i 128 comuni delle tre province vengono
              dall'elenco ISTAT (via openpolis) e li genera
              `scripts/genera-territorio.mjs`, che si ferma se le numerosità
              cambiano. Passa il test a tre condizioni: due estremi sul bordo
              del campo, un numero che il repo conta (`comuni.length`), e una
              quantità che nessuno conta a vista guardando la mappa.
              **L'annotazione dice cos'è**: le tre province dell'autocomplete
              del brief, non «dove abbiamo lavorato» — che è la nota qui sotto,
              ed è un'altra affermazione. */}
          <Quota
            voci={province.map((p) => p.nome)}
            numero={comuni.length}
            unita="comuni nell’autocomplete"
            dettaglio={province.map((p) => `${p.sigla} ${contaComuni(p.sigla)}`).join(', ')}
            className="quota-stretta mt-8"
          />

          <ul className="elenco-comuni">
            {serviti.length > 0 ? (
              serviti.map((c) => (
                <li key={`${c.sigla}-${c.nome}`}>
                  {c.nome} ({c.sigla})
                </li>
              ))
            ) : (
              <li>
                <DaCliente>{daCliente('elenco dei comuni in cui avete lavorato')}</DaCliente>
              </li>
            )}
          </ul>
        </div>

        <div className="nav:col-start-7 nav:col-span-6 col-span-12">
          {/* Il perimetro è una figura, non un dato da leggere: il contenuto in
              testo è l'elenco dei comuni qui accanto. Perciò un `aria-label`
              breve e nessuna pretesa di descrivere 581 vertici. */}
          <svg
            className="mappa-provincia"
            viewBox={`0 0 ${VIEWBOX.larghezza} ${VIEWBOX.altezza}`}
            role="img"
            aria-labelledby="territorio-mappa-titolo"
          >
            {/* Un solo figlio di testo, composto in JavaScript. Con testo
                statico *e* un'espressione React serializza un separatore fra i
                due nodi, e dentro un `<title>` quel separatore diventa testo:
                l'idratazione trova due contenuti diversi e rigenera l'albero
                (errore React 418, visto in `next dev`). */}
            <title id="territorio-mappa-titolo">{DESCRIZIONE_MAPPA}</title>

            {province.map((p) => (
              <path key={p.sigla} className="mappa-perimetro" d={p.d} />
            ))}

            {/* Il nome di ogni provincia sul suo centroide: senza, «dove
                abbiamo lavorato» mostra tre forme che nessuno riconosce.
                Sono nomi di enti, non affermazioni sul lavoro svolto. */}
            {province.map((p) => (
              <text
                key={`et-${p.sigla}`}
                className="mappa-etichetta mappa-etichetta-provincia"
                x={p.cx}
                y={p.cy}
                textAnchor="middle"
              >
                {p.nome}
              </text>
            ))}

            {/* La sede: dato confermato, non un'affermazione sul lavoro svolto.
                L'etichetta dice «Sede» e non «Fermo» perché il nome della
                provincia è già lì accanto: due «Fermo» a due centimetri di
                distanza non dicono due cose, ne confondono una. */}
            <circle className="mappa-sede" cx={sede.x} cy={sede.y} r={6} />
            <text className="mappa-etichetta" x={sede.x - 12} y={sede.y + 4} textAnchor="end">
              Sede
            </text>

            {/* Quando arriverà la lista, questi punti si accendono e basta. */}
            {serviti.map((c) => (
              <circle
                key={`${c.sigla}-${c.nome}`}
                className="mappa-sede"
                cx={c.x}
                cy={c.y}
                r={3.5}
              />
            ))}
          </svg>
        </div>
      </div>
    </Sezione>
  )
}
