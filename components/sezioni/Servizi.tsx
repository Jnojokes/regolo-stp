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
 * Le card sono morte con la fase 3 bis: una griglia 3×2 di riquadri identici è
 * il cluster n. 4 più la voce di casa «griglie a tre colonne». Nessuna delle
 * tre reference tier A mette il proprio lavoro dentro delle card — AS lo mette
 * in una **tabella**, Kononenko in righe a filetti, Storey in bande piene.
 *
 * La riga ha tre campi, e sono i tre che `CLAUDE.md` chiede: l'**esito**, il
 * **tecnicismo** in seconda riga (misurato: sulla stessa riga arriva a 1.083 px
 * in una colonna da 896, e a 762 in 350 su mobile — sfonda), e il **ruolo
 * firmabile** spinto al bordo destro con il vuoto in mezzo, che è la riga di
 * metadati di Pelizzari misurata.
 *
 * **In A non c'è nessun filetto fra le righe**: AS regge 25 righe con sette
 * colonne senza un divisore, e il passo di riga fa il lavoro.
 *
 * ## Perché il titolo sta nel margine e non sopra il blocco
 *
 * È la correzione della catena di gusci: `#smistamento`, `#progetti`,
 * `#servizi`, `#processo` erano quattro `.testa-sezione` di fila, e la tell
 * misurata è «due sezioni di fila con la stessa famiglia di layout»
 * (`sito-design` § 1). Qui la famiglia è quella di Kononenko: la **tabella con
 * l'etichetta buttata a sinistra in un margine vuoto** — sul sito vero
 * «Offices» sta a x = 0 e la tabella comincia a x = 493 — che è anche la
 * famiglia dell'esploso e del territorio, e nessuno dei tre è di fila a un
 * altro.
 *
 * Con la testa è uscita anche l'etichetta `[cosa facciamo]`: il titolo la dice,
 * e sette etichette su otto sezioni erano il doppio del tetto del test
 * meccanico della skill (⌈8 / 3⌉ = 3).
 *
 * L'uscita «tutti i servizi» non è più in alto a destra: sta sotto il titolo,
 * in fondo alla colonna del margine. Un'uscita in alto a destra su ogni sezione
 * è chrome, e qui la colonna stretta è il posto in cui non ruba niente.
 */
export function Servizi({ id = 'servizi' }: { id?: string }) {
  return (
    <Sezione id={id} passo="normale">
      <div className="grid-12 servizi-tavola">
        <div className="servizi-margine nav:col-span-3 col-span-12">
          <h2>Sei modi di esservi utili.</h2>
          <Link className="uscita" href="/servizi">
            tutti i servizi
          </Link>
        </div>

        <ul className="indice nav:col-start-5 nav:col-span-8 col-span-12" role="list">
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
      </div>
    </Sezione>
  )
}
