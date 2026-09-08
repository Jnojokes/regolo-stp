import Link from 'next/link'
import { Sezione } from '@/components/sezioni/Sezione'
import { servizi, type Servizio } from '@/lib/servizi'

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
export function Servizi({ id = 'servizi' }: { id?: string }) {
  return (
    <Sezione
      id={id}
      passo="normale"
      etichetta="cosa facciamo"
      titolo="Sei modi di esservi utili."
      azione={
        <Link className="uscita" href="/servizi">
          tutti i servizi
        </Link>
      }
    >
      <ul className="indice" role="list">
        {servizi.map((s) => (
          <li key={s.slug}>
            <Link href={`/servizi/${s.slug}`} className="voce">
              <span className="voce-corpo">
                <span className="voce-esito">{s.titolo}</span>
                {/* Il tecnicismo in seconda riga, come prescrive CLAUDE.md
                    § I sei servizi. Misurato: sulla stessa riga sfonda. */}
                <span className="voce-tecnicismo">{s.sottotitolo}</span>
                <span className="voce-descrizione">{descrizioni[s.slug]}</span>
              </span>
              <span className="voce-coda">{s.sottotitolo}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Sezione>
  )
}

/* -------------------------------------------------------------------------- */
