import Link from 'next/link'

import { DaCliente } from '@/components/Placeholder'
import { Sezione } from '@/components/sezioni/Sezione'
import { percorsi } from '@/lib/percorsi'
import { servizi, type Servizio } from '@/lib/servizi'
import { daCliente } from '@/lib/site'

/**
 * «Cosa facciamo» (CLAUDE.md § Homepage, blocco 5).
 *
 * Non è un listino: è la risposta alla domanda che si fa chi è arrivato qui per
 * passaparola — «questa cosa la fanno?». Per questo il titolo di ogni scheda è
 * l'esito per il committente e il tecnicismo sta in seconda riga: chi cerca
 * conferma legge la prima, chi valuta la competenza legge la seconda.
 *
 * Le due varianti dicono la stessa cosa con due promesse diverse, e la
 * differenza è tutta nel contratto che offrono:
 *
 * - `essenziale` (A) — sei voci, nessuna cornice, un filetto sopra. Elenca e
 *   rimanda: il dettaglio è sulla pagina del servizio. È l'opzione «studio»,
 *   dove la tipografia fa il lavoro e la pagina non alza la voce.
 * - `percorsi` (B) — sei schede con cornice che chiudono con «serve da te».
 *   Vende il *metodo*: dire in home quali carte servono per partire è la cosa
 *   che nessuno scrive, ed è quella che fa vincere il confronto.
 *
 * Un solo componente con una prop, non due file: l'architettura è la stessa
 * (CLAUDE.md § Due opzioni), cambiano l'impaginazione e i token. Quando il
 * cliente sceglie si elimina la route, non un componente.
 *
 * Server component e niente stato: sei link sono sei link. Il blocco resta
 * intero senza JavaScript perché non ne ha mai avuto bisogno.
 */

/**
 * La riga di descrizione di ogni scheda, presa dal prototipo B
 * (`kit/opzioni/REGOLO_Opzione_B.html`, sezione `.svcs`): è copy del brief
 * visivo approvato, non testo scritto qui. Descrive il metodo dello studio —
 * cosa fa e in che ordine — e mai un suo progetto, un numero o una data.
 *
 * Il tipo è la chiave chiusa dei sei slug: se domani in `lib/servizi.ts` ne
 * compare un settimo, questo file non compila invece di lasciare una scheda muta.
 */
const descrizioni: Record<Servizio['slug'], string> = {
  'casa-nuova': 'Dall’idea al progetto esecutivo, con la direzione dei lavori fino alla consegna.',
  ristrutturazioni:
    'Verifica di cosa si può fare, progetto, pratiche e cantiere sull’edificio che c’è.',
  strutture:
    'Valutazione della vulnerabilità, progetto di miglioramento o adeguamento, direzione lavori.',
  pratiche:
    'Le carte che servono, fatte bene e nei tempi degli uffici, con i requisiti dei bonus verificati prima.',
  'energia-acustica':
    'Meno consumi, più silenzio, temperatura giusta: progettati, non aggiunti dopo.',
  'opere-pubbliche':
    'Progettazione, sicurezza e collaudo per enti e amministrazioni, con le procedure che conosciamo.',
}

/**
 * `serve` per slug. I percorsi sono **cinque**, i servizi sei: `energia-acustica`
 * non è un modo in cui un committente descrive quello che ha in mente, quindi
 * non ha un percorso e non ha una lista di documenti. Non se ne inventa una
 * (CLAUDE.md § Regole, 1): resta un segnaposto dichiarato.
 */
const serveDelServizio = new Map(percorsi.map((p) => [p.slug, p.serve]))

const MANCA_SERVE = daCliente('cosa serve da te per energia e acustica')

export function Servizi({
  variante,
  id = 'servizi',
}: {
  /** `essenziale` = opzione A · `percorsi` = opzione B. */
  variante: 'essenziale' | 'percorsi'
  id?: string
}) {
  if (variante === 'essenziale') {
    return (
      <Sezione
        id={id}
        fondo="alt"
        etichetta="cosa facciamo"
        titolo="Sei modi in cui possiamo esservi utili."
      >
        <div className="griglia-servizi">
          {servizi.map((s) => (
            <div key={s.slug} className="servizio-essenziale">
              <h3>{s.titolo}</h3>
              <p>{s.sottotitolo}</p>
              {/* «Scopri» e non il titolo del servizio: il titolo è già sopra,
                  e un link che ripete l'intestazione la fa leggere due volte
                  a chi usa uno screen reader. Il contesto lo dà `aria-label`.
                  `min-h-11` = 44 px di bersaglio tattile su una riga che ne
                  misura 23; `items-end` fa crescere il box verso l'alto, nello
                  spazio vuoto della scheda, così la riga resta dove la mette
                  il prototipo. */}
              <Link
                className="servizio-vai flex min-h-11 items-end"
                href={`/servizi/${s.slug}`}
                aria-label={`Scopri: ${s.titolo}`}
              >
                Scopri
              </Link>
            </div>
          ))}
        </div>
      </Sezione>
    )
  }

  return (
    <Sezione
      id={id}
      etichetta="cosa facciamo"
      titolo="Sei percorsi. Ognuno con quello che serve da te."
      azione={
        <Link className="btn btn-ghost" href="/servizi">
          Tutti i servizi
        </Link>
      }
      nota="Gli elenchi «serve da te» sono una nostra proposta: li conferma lo studio, servizio per servizio. Per «Comfort, energia, acustica» non ne abbiamo scritto nessuno."
    >
      <div className="griglia-servizi">
        {servizi.map((s) => {
          const serve = serveDelServizio.get(s.slug)
          return (
            <div key={s.slug} className="servizio-scheda">
              <span className="servizio-tecnicismo">{s.sottotitolo}</span>
              <h3>{s.titolo}</h3>
              <p>{descrizioni[s.slug]}</p>
              <p className="serve-da-te">
                <strong>Serve da te:</strong>{' '}
                {serve ? serve.join(', ') : <DaCliente>{MANCA_SERVE}</DaCliente>}
              </p>
            </div>
          )
        })}
      </div>
    </Sezione>
  )
}
