import Link from 'next/link'
import { DaCliente } from '@/components/Placeholder'
import { Sezione } from '@/components/sezioni/Sezione'
import { percorsi } from '@/lib/percorsi'
import { servizi, type Servizio } from '@/lib/servizi'
import { daCliente } from '@/lib/site'

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

const serveDelServizio = new Map(percorsi.map((p) => [p.slug, p.serve]))
const MANCA_SERVE = daCliente('cosa serve da te per energia e acustica')

/**
 * I sei servizi — **sei righe di un indice, non sei card**.
 *
 * ## Perché le card sono morte con la fase 3 bis
 *
 * Erano una griglia 3×2 di riquadri identici, stesso bordo, stessa altezza
 * minima, e in B con la cornice e il fondo. Cioè il cluster n. 4 della lista di
 * calibrazione («contenuto tagliato in card identiche») più la voce di casa
 * «griglie a tre colonne». Nessuna delle tre reference tier A mette il proprio
 * lavoro dentro delle card: AS lo mette in una **tabella**, Kononenko in righe
 * a filetti, Storey in bande a piena larghezza.
 *
 * La riga ha tre campi, e sono i tre che `CLAUDE.md` chiede:
 *
 * - l'**esito** («Mettere in sicurezza la struttura»), a `sezione`;
 * - il **tecnicismo**, in **seconda riga** e non accanto — misurato: esito +
 *   tecnicismo sulla stessa riga arrivano a 1083 px in una colonna da 896, e a
 *   762 px in 350 su mobile: sfonda;
 * - il **ruolo firmabile**, spinto al bordo destro con il vuoto in mezzo, che è
 *   la riga di metadati di Pelizzari misurata (`2502` … `Borromei 9` …
 *   `View project`, e in mezzo niente).
 *
 * **In A non c'è nessun filetto fra le righe**: AS regge 25 righe con sette
 * colonne senza un divisore, con il solo passo di riga a farle leggere, e in
 * questo sito il filetto non separa mai — misura, o delimita una figura. In B
 * il filetto c'è, perché lì ogni riga porta anche «cosa serve da te» e il
 * confine del gruppo è informazione.
 *
 * Il sesto servizio (`energia-acustica`) non ha un elenco «serve da te»: la
 * colonna resta vuota con il segnaposto, e nessun conteggio finge che ci sia.
 */
export function Servizi({
  variante,
  id = 'servizi',
}: {
  /** `essenziale` = opzione A · `percorsi` = opzione B, con «serve da te». */
  variante: 'essenziale' | 'percorsi'
  id?: string
}) {
  const conServe = variante === 'percorsi'

  return (
    <Sezione
      id={id}
      asse={conServe}
      passo={conServe ? 'corto' : 'normale'}
      etichetta="cosa facciamo"
      titolo={
        conServe ? 'Sei percorsi. Ognuno con quello che serve da te.' : 'Sei modi di esservi utili.'
      }
      titoloLargo={conServe}
      azione={
        <Link className="uscita" href="/servizi">
          tutti i servizi
        </Link>
      }
      nota={
        conServe
          ? 'Gli elenchi «serve da te» sono una nostra proposta: li conferma lo studio, servizio per servizio. Per «Comfort, energia, acustica» non ne abbiamo scritto nessuno.'
          : undefined
      }
    >
      <ul className={conServe ? 'indice indice-righe' : 'indice'} role="list">
        {servizi.map((s, indice) => {
          const serve = serveDelServizio.get(s.slug)
          return (
            <li key={s.slug}>
              <Link href={`/servizi/${s.slug}`} className="voce">
                {/* La chiave di riga sta nel campo a sinistra dell'asse, come
                    nel registro della hero. Non è una sequenza — sei servizi
                    non hanno un primo e un ultimo — è l'indice della riga, e
                    riempie con un'informazione un campo che altrimenti sarebbe
                    900 px di vuoto per cinque righe. Solo in B: in A l'asse non
                    c'è e il campo nemmeno. */}
                {conServe && (
                  <span className="voce-chiave" data-numero="">
                    {String(indice + 1).padStart(2, '0')}
                  </span>
                )}
                <span className="voce-corpo">
                  <span className="voce-esito">{s.titolo}</span>
                  {/* Il tecnicismo in seconda riga, come prescrive CLAUDE.md
                      § I sei servizi. Misurato: sulla stessa riga sfonda. */}
                  <span className="voce-tecnicismo">{s.sottotitolo}</span>
                  <span className="voce-descrizione">{descrizioni[s.slug]}</span>
                </span>
                <span className="voce-coda">{s.sottotitolo}</span>
              </Link>

              {conServe && (
                <p className="voce-serve">
                  <span className="voce-serve-chiave">serve da te</span>{' '}
                  {serve ? serve.join(', ') : <DaCliente>{MANCA_SERVE}</DaCliente>}
                </p>
              )}
            </li>
          )
        })}
      </ul>
    </Sezione>
  )
}
