import Link from 'next/link'
import { Campo } from '@/components/campo/Campo'
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
/* La chiave del passo 1 del brief, servizio per servizio: è quella che lega la
   riga della tabella alla riga scelta nella hero. Cinque su sei — il sesto
   servizio non è un modo in cui un committente descrive quello che ha in mente
   (`lib/percorsi.ts`), e la sua riga non risponde a nessuna scelta. */
const interventoDelServizio = new Map(percorsi.map((p) => [p.slug, p.intervento]))
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
  contatore,
}: {
  /** `essenziale` = opzione A, sei righe d'indice · `tabella` = opzione B, la scheda tecnica. */
  variante: 'essenziale' | 'tabella'
  id?: string
  /** Il contatore tono su tono dell'opzione D: decorazione, `aria-hidden`. */
  contatore?: string
}) {
  if (variante === 'tabella') return <ServiziTabella id={id} contatore={contatore} />

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

/**
 * Opzione B — **la scheda tecnica**, ed è il ramo del bivio che B doveva
 * prendere e per due passate non ha preso.
 *
 * `SCHEDA.md` § 2 dimostra che le tre reference tier A non condividono
 * un'estetica ma tre meccanismi, e che si dividono su una cosa sola: o
 * l'audacia sta nella **scala** (Kononenko 10,9× · Storey 7,3×) o sta nella
 * **densità e nella tabella** (AS 2,6×). A ha preso la scala; a B era stato
 * assegnato l'altro ramo (`DECISIONI.md` n. 20) e le era arrivato solo il
 * numero 2,6×, cioè un contrasto di scala più basso. Il meccanismo no: fino a
 * ieri questo blocco rendeva **le stesse `.indice`/`.voce` dello Smistamento di
 * A** — in CSS, lo stesso oggetto.
 *
 * Adesso è una **tabella vera**, come l'indice di AS (misurato: 7 colonne, 25
 * righe, passo 27,5 px, **nessun filetto fra le righe**, numeri a destra). Le
 * colonne sono quelle che i dati hanno davvero — esito, tecnicismo, cosa serve
 * da te — e non una di più: la colonna «ruolo firmabile» del primo schizzo
 * avrebbe richiesto una mappa servizio → ruolo che nel repo **non esiste**, cioè
 * un'altra proposta redazionale a carico nostro.
 *
 * ## La riga risponde alla hero
 *
 * `data-intervento` porta la stessa chiave chiusa del passo 1 del brief. Quando
 * qualcuno sceglie in cima alla pagina, **la riga corrispondente resta a
 * inchiostro pieno e le altre scendono al pavimento di attenuazione**: è
 * l'opacità come gerarchia di AS, usata per dire «questa è la tua», e insieme
 * la prova che la pagina risponde. Zero JavaScript: sono sei regole `:has()`
 * in `app/css/campi.css`.
 *
 * Il sesto servizio (`energia-acustica`) non ha «serve da te» e non ha una
 * chiave d'intervento: la cella resta vuota con il segnaposto, e nessun
 * conteggio finge che ci sia. È il gesto di AS, che spedisce la tabella **con i
 * buchi** invece di riempirli (misurato: `Site Area` e `Floor Area` sono vuote
 * su circa un terzo delle 25 righe).
 */
function ServiziTabella({ id, contatore }: { id: string; contatore?: string }) {
  return (
    <Campo
      id={id}
      contatore={contatore}
      etichetta="cosa facciamo"
      titolo="Sei percorsi. Ognuno con quello che serve da te."
      azione={
        <Link className="uscita" href="/servizi">
          tutti i servizi
        </Link>
      }
      nota="Gli elenchi «serve da te» sono una nostra proposta: li conferma lo studio, servizio per servizio. Per «Comfort, energia, acustica» non ne abbiamo scritto nessuno."
    >
      <table className="scheda">
        <thead>
          <tr>
            <th scope="col">esito</th>
            <th scope="col">tecnicismo</th>
            <th scope="col">cosa serve da te</th>
          </tr>
        </thead>
        <tbody>
          {servizi.map((s) => {
            const serve = serveDelServizio.get(s.slug)
            return (
              <tr key={s.slug} data-intervento={interventoDelServizio.get(s.slug)}>
                <th scope="row">
                  <Link href={`/servizi/${s.slug}`}>{s.titolo}</Link>
                </th>
                <td>{s.sottotitolo}</td>
                <td>{serve ? serve.join(', ') : <DaCliente>{MANCA_SERVE}</DaCliente>}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Campo>
  )
}
