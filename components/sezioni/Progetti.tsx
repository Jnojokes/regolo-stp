import Link from 'next/link'
import { DaCliente, Placeholder } from '@/components/Placeholder'
import { Campo } from '@/components/campo/Campo'
import { Sezione } from '@/components/sezioni/Sezione'
import { notaProgetti, progetti, type Progetto } from '@/lib/progetti'
import { operaPerIndice, type ChiaveEsempio } from '@/lib/media-demo'

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

  const schede = (
    <div className={conDati ? 'progetti-due' : 'progetti-tre'}>
      {inEvidenza.map((progetto, indice) =>
        conDati ? (
          <SchedaDati key={progetto.copertina} progetto={progetto} demo={operaPerIndice(indice)} />
        ) : (
          <SchedaFoto
            key={progetto.copertina}
            progetto={progetto}
            ratio={RATIO[indice % RATIO.length]}
            demo={operaPerIndice(indice)}
          />
        ),
      )}
    </div>
  )

  if (conDati) {
    return (
      <Campo
        id="progetti"
        etichetta="progetti in evidenza"
        titolo="I dati che un committente serio legge."
        azione={
          <Link className="uscita" href="/progetti">
            tutti i progetti
          </Link>
        }
        nota={notaProgetti}
      >
        {schede}
      </Campo>
    )
  }

  return (
    <Sezione
      id="progetti"
      passo="largo"
      etichetta="progetti in evidenza"
      titolo="Quello che abbiamo costruito."
      azione={
        <Link className="uscita" href="/progetti">
          tutti i progetti
        </Link>
      }
      nota={notaProgetti}
    >
      {schede}
    </Sezione>
  )
}

/**
 * A — foto in 4/3 e i dati sotto il filetto. Il nome è un `h3`: la scheda ha un
 * titolo, e la gerarchia della pagina deve restare leggibile in outline.
 */
function SchedaFoto({
  progetto,
  ratio,
  demo,
}: {
  progetto: Progetto
  ratio: string
  demo?: ChiaveEsempio
}) {
  return (
    <article className="progetto">
      <Placeholder
        label={progetto.copertina}
        specifica={SPECIFICA[ratio] ?? '≥ 1600 px sul lato lungo · AVIF · ≤ 250 KB'}
        ratio={ratio}
        demo={demo}
      />
      <h3 className="progetto-nome">
        <DaCliente>{progetto.titolo}</DaCliente>
      </h3>
      {/* La riga in tre tempi: luogo a sinistra, **ruolo** accanto, e l'uscita
          spinta al bordo con il vuoto in mezzo. È Pelizzari misurato — `2502` …
          `Borromei 9` … `View project` — con una differenza: al posto del
          «codice» c'è il **ruolo**, perché un codice d'archivio in `lib` non
          esiste e sarebbe un dato inventato. E perché sopra tre rettangoli
          vuoti `codice · nome · vedi progetto` **è** un annuncio immobiliare,
          mentre `luogo · direzione lavori · vedi progetto` è una credenziale. */}
      <p className="progetto-riga">
        <span className="progetto-luogo">
          <DaCliente>{progetto.dati[0].valore}</DaCliente>
        </span>
        <span className="progetto-ruolo">
          <DaCliente>{progetto.dati[3].valore}</DaCliente>
        </span>
      </p>
    </article>
  )
}

/* I tre rapporti sono **diversi nella stessa fila**, ed è Kononenko misurato
   (643×405 = 1,59 · 361×525 = 0,69 verticale · 549×405 = 1,36 in una griglia
   sola). Tre 4/3 identici sono tre card, cioè il cluster n. 4; tre rapporti
   diversi sono tre fotografie. La specifica cambia con il rapporto, così la
   riga che il cliente legge in call è quella giusta. */
const RATIO = ['16 / 10', '3 / 4', '4 / 3'] as const
const SPECIFICA: Record<string, string> = {
  '16 / 10': '2400 × 1500 px · AVIF · ≤ 250 KB',
  '3 / 4': '1600 × 2133 px · AVIF · ≤ 250 KB',
  '4 / 3': '1600 × 1200 px · AVIF · ≤ 250 KB',
}

/**
 * B — la targhetta dei dati duri. Il nome è un `h3` come in A: le due varianti
 * sono la stessa pagina con due voci, e l'outline dei titoli non deve cambiare
 * fra l'una e l'altra. La `<caption>` in `sr-only` ripete di che progetto sono
 * i dati: la tabella si deve capire anche letta fuori dal suo contesto visivo.
 * La foto è 16/9 perché entra nella cornice della scheda.
 *
 * **Fase 3 bis**: la cornice della scheda è sparita. Il segnaposto è già una
 * figura con il suo bordo di 1 px, e una cornice attorno a una figura
 * bordata sono due bordi — che è come si arriva al cluster n. 4 senza
 * accorgersene. E i dati **non hanno filetti fra le righe**: AS regge una
 * tabella di 25 righe con sette colonne senza un divisore.
 */
function SchedaDati({ progetto, demo }: { progetto: Progetto; demo?: ChiaveEsempio }) {
  return (
    <article className="progetto-scheda">
      <Placeholder
        label={progetto.copertina}
        specifica="2400 × 1350 px · AVIF · ≤ 250 KB"
        ratio="16 / 9"
        demo={demo}
      />
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
