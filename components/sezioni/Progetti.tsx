import Link from 'next/link'
import { DaCliente, Placeholder } from '@/components/Placeholder'
import { Sezione } from '@/components/sezioni/Sezione'
import { notaProgetti, progetti, type Progetto } from '@/lib/progetti'

/**
 * Progetti in evidenza (CLAUDE.md § Homepage, blocco 4 · catalogo blocchi D2):
 * il blocco della prova. Chi arriva qui ha già sentito il nome dello studio e
 * sta decidendo se fidarsi: questo è il punto in cui il sito smette di
 * raccontare e mostra. È anche il blocco più esposto: se le schede sembrano
 * generiche, il confronto è perso.
 *
 * **Le schede sono vuote, e si vede.** Non c'è nemmeno un progetto vero
 * (`lib/progetti.ts`): i valori arrivano da lì già come `[[DA CLIENTE: …]]` e
 * qui si avvolgono in `<DaCliente>` perché nessuno possa scambiarli per
 * contenuto. Meglio un blocco dichiaratamente vuoto che tre progetti inventati:
 * l'impaginazione si collauda comunque, e il vuoto è la lista della spesa da
 * mandare al cliente.
 *
 * **Il campo «Ruolo dello studio» non si omette mai**, nemmeno adesso che è
 * vuoto: è quello che dice cosa sanno fare, e manca in quasi tutti i siti di
 * studi tecnici. Per questo si stampano tutti i dati della scheda in ordine,
 * senza scegliere quali far vedere: l'elenco dei campi *è* il messaggio.
 *
 * Le due varianti dicono la stessa cosa con due voci diverse:
 * - `schede` (A) — tre schede, la foto grande fa il lavoro, i dati sotto in
 *   righe di testo. Vende l'opera.
 * - `dati` (B) — due schede sole, e i dati in una `<table>` vera con
 *   `<th scope="row">`: sono dati, non didascalie, e chi legge con uno screen
 *   reader deve sentire l'intestazione di riga. Vende la competenza.
 *
 * Le schede non sono cliccabili: `/progetti/[slug]` non risolve ancora (fase 1
 * dà un 404 vero) e un link che porta a un errore è peggio di nessun link.
 * Diventano link alla fase 4, quando i progetti esistono. L'unica uscita è
 * «Tutti i progetti» in A, che porta a una pagina che esiste.
 */
export function Progetti({ variante }: { variante: 'schede' | 'dati' }) {
  const conDati = variante === 'dati'

  /* B mostra due schede, non tre: con i dati duri in tabella la colonna è più
     alta, e due schede piene leggono meglio di tre. */
  const inEvidenza = conDati ? progetti.slice(0, 2) : progetti

  return (
    <Sezione
      id="progetti"
      quota={conDati ? 'Sez. 04 — Progetti' : 'Progetti in evidenza'}
      titolo={conDati ? 'I dati che un committente serio legge.' : 'Quello che abbiamo costruito.'}
      azione={
        conDati ? undefined : (
          <Link className="btn btn-ghost" href="/progetti">
            Tutti i progetti
          </Link>
        )
      }
      nota={notaProgetti}
    >
      <div className={conDati ? 'griglia-progetti griglia-progetti-due' : 'griglia-progetti'}>
        {inEvidenza.map((progetto) =>
          conDati ? (
            <SchedaDati key={progetto.copertina} progetto={progetto} />
          ) : (
            <SchedaFoto key={progetto.copertina} progetto={progetto} />
          ),
        )}
      </div>
    </Sezione>
  )
}

/**
 * A — foto in 4/3 e i dati sotto il filetto. Il nome è un `h3`: la scheda ha un
 * titolo, e la gerarchia della pagina deve restare leggibile in outline.
 */
function SchedaFoto({ progetto }: { progetto: Progetto }) {
  return (
    <article>
      <Placeholder label={progetto.copertina} ratio="4 / 3" />
      <div className="progetto-meta">
        <h3 className="progetto-nome">
          <DaCliente>{progetto.titolo}</DaCliente>
        </h3>
        {progetto.dati.map((dato) => (
          <p key={dato.etichetta} className="progetto-riga">
            <strong>{dato.etichetta}</strong> <DaCliente>{dato.valore}</DaCliente>
          </p>
        ))}
      </div>
    </article>
  )
}

/**
 * B — la targhetta dei dati duri. Il nome è un `h3` come in A: le due varianti
 * sono la stessa pagina con due voci, e l'outline dei titoli non deve cambiare
 * fra l'una e l'altra. La `<caption>` in `sr-only` ripete di che progetto sono
 * i dati: la tabella si deve capire anche letta fuori dal suo contesto visivo.
 * La foto è 16/9 perché entra nella cornice della scheda.
 *
 * Resta una riga di CSS da aggiungere in `app/css/sezioni.css` (file che non
 * appartiene a questo componente): nel tema B il rettangolo della foto porta il
 * proprio bordo e raddoppia quello della cornice — serve
 * `.progetto-scheda .placeholder-media { border: 0; border-bottom: 1px solid var(--color-line) }`,
 * come già esiste per `.prima-dopo`.
 */
function SchedaDati({ progetto }: { progetto: Progetto }) {
  return (
    <article className="progetto-scheda">
      <Placeholder label={progetto.copertina} ratio="16 / 9" />
      <h3 className="progetto-nome">
        <DaCliente>{progetto.titolo}</DaCliente>
      </h3>
      <table className="progetto-dati">
        <caption className="sr-only">{`Dati del progetto: ${progetto.titolo}`}</caption>
        <tbody>
          {progetto.dati.map((dato) => (
            <tr key={dato.etichetta}>
              <th scope="row">{dato.etichetta}</th>
              <td>
                <DaCliente>{dato.valore}</DaCliente>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  )
}
