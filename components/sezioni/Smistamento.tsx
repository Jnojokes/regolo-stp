import Link from 'next/link'
import { Sezione } from '@/components/sezioni/Sezione'
import { RUOLI } from '@/lib/contenuti/schema'
import { hrefPercorso, percorsi, servizioDelPercorso } from '@/lib/percorsi'
import { servizi } from '@/lib/servizi'
import { comuni } from '@/lib/territorio'

/**
 * Smistamento a domanda (CLAUDE.md § Homepage, blocco 2 · catalogo blocchi A3).
 *
 * È il secondo percorso di conversione del sito: chi arriva sa cosa ha in
 * mente, non sa come si chiama, e questo blocco glielo dice — e lo porta alla
 * pagina del servizio con il passo 1 del brief già scelto.
 *
 * Cinque righe di indice, non cinque pastiglie: ogni riga è un `<a>` a piena
 * larghezza alta 60 px, con il ruolo firmabile spinto al bordo destro e il
 * vuoto in mezzo. Cinque pastiglie uguali in fila sono il cluster n. 4.
 *
 * ## Alla ripassata di design questo blocco **conta**, ed è la ragione per cui
 * LPAS è entrata nella scheda
 *
 * Su LPAS il conteggio è il modo di provare il volume senza scrivere «siamo
 * bravi»: `5 / 5` sulla scheda-mercato e, più giù, i contatori per categoria —
 * 27 · 13 · 12 · 6 · 14 — letti sui nodi veri. Qui le cinque righe non
 * portavano nessun numero, e cinque voci senza dati sono un menu travestito.
 *
 * I tre numeri sono **gli unici che il repo può contare**, e ognuno viene da un
 * elenco chiuso che il collaudo già usa: `RUOLI.length` da
 * `lib/contenuti/schema.ts`, `servizi.length` da `lib/servizi.ts`,
 * `comuni.length` da `lib/territorio.ts` (l'elenco ISTAT che
 * `scripts/genera-territorio.mjs` rigenera e verifica). Un numero che il repo
 * non conta non si scrive: niente anni di attività, niente progetti, niente mq.
 *
 * E le tre etichette dicono **di che cosa** sono il conteggio, non cosa fa lo
 * studio: «comuni nell'autocomplete» e non «comuni serviti», perché dove
 * abbiano lavorato è la decisione n. 13 ed è aperta (`CLAUDE.md` § Regole, 1).
 *
 * ## Perché questo blocco non ha più una `testa-sezione`
 *
 * Perché quattro sezioni di fila con lo stesso guscio sono una tell
 * misurata (`sito-design` § 1: su 8 sezioni almeno 4 famiglie di layout, mai
 * due di fila della stessa). `#smistamento`, `#progetti`, `#servizi` e
 * `#processo` erano tutte e quattro `.sezione > .wrap > .testa-sezione`, e
 * `#persone` era la quinta. Qui la testa è **a piena larghezza con i numeri al
 * bordo opposto** — che è la regola di casa (il contenuto su un asse, i numeri
 * all'estremo opposto, il vuoto disuguale in mezzo) e insieme il taglio di
 * LPAS: nome grande a sinistra, dato al bordo.
 *
 * L'etichetta `[da dove si parte]` è uscita con la testa, e non è una perdita:
 * il titolo la dice già. Le etichette di sezione della home sono passate da
 * sette a tre — progetti, come lavoriamo, esploso — che è il tetto del test
 * meccanico della skill (⌈8 sezioni / 3⌉).
 *
 * La query string sta sul **secondo** salto (decisione del 07/09): la riga
 * porta al servizio, e la CTA del servizio porta al brief con `?intervento=`.
 */
export function Smistamento({ id = 'smistamento' }: { id?: string }) {
  return (
    <Sezione
      id={id}
      passo="corto"
      nota="Ogni voce apre la pagina del servizio e imposta già la prima domanda del brief. I tre numeri qui sopra sono contati dagli elenchi del sito — i ruoli firmabili, i servizi, i comuni dell’autocomplete del brief — e non sono una dichiarazione su quanto avete lavorato: quella arriva con i progetti."
    >
      <div className="smistamento-testa">
        <h2 className="smistamento-titolo">Che intervento hai in mente?</h2>

        {/* Una `<dl>` e non tre `<div>`: sono coppie chiave-valore, e chi legge
            con una sintesi vocale deve sentire «ruoli firmabili, 5» e non due
            frammenti scollegati. Il valore sta **dopo** la chiave nel DOM e
            **sopra** in pagina: la griglia inverte le due righe, l'ordine di
            lettura resta quello giusto. */}
        <dl className="smistamento-conti">
          <div>
            <dt>ruoli firmabili</dt>
            <dd data-numero="">{RUOLI.length}</dd>
          </div>
          <div>
            <dt>servizi</dt>
            <dd data-numero="">{servizi.length}</dd>
          </div>
          <div>
            <dt>comuni nell’autocomplete</dt>
            <dd data-numero="">{comuni.length}</dd>
          </div>
        </dl>
      </div>

      <ul className="indice smistamento-indice" role="list">
        {percorsi.map((percorso) => {
          const servizio = servizioDelPercorso(percorso)
          return (
            <li key={percorso.slug}>
              <Link className="voce" href={hrefPercorso(percorso)}>
                <span className="voce-corpo">
                  <span className="voce-esito">{percorso.etichetta}</span>
                </span>
                <span className="voce-coda">{servizio.sottotitolo}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </Sezione>
  )
}
