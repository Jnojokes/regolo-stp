import { DaCliente } from '@/components/Placeholder'
import { Sezione } from '@/components/sezioni/Sezione'
import { VALORE_ATTESO, notaNumeri, numeri } from '@/lib/numeri'

/**
 * I quattro numeri (CLAUDE.md § Homepage, blocco 3 · catalogo blocchi B1).
 *
 * Nel funnel è la riga che regge il confronto: chi arriva qui ha già sentito il
 * nome per passaparola e sta decidendo di chi fidarsi. Anni, progetti, mq,
 * comuni sono le quattro cose che rispondono a «siete grandi abbastanza per la
 * mia cosa?» senza che nessuno debba scrivere «affidabilità e professionalità».
 * Quattro e non otto: oltre il quarto nessuno legge, e ogni numero in più è un
 * numero in più da difendere.
 *
 * Sta subito dopo la hero-domanda dell'opzione B, a passo `corto` perché i due
 * blocchi sono un solo pensiero. Non ha `titolo`: un `<h2>` qui prometterebbe un
 * blocco di contenuto che non c'è.
 *
 * ## Fase 3 bis — le celle non hanno più i bordi
 *
 * Erano quattro celle divise da `border-right`. Con il filetto portato a 4,99:1
 * — perché in questo sito **un filetto è informazione** — quattro divisori
 * verticali accanto all'asse leggevano come un errore di impaginazione. Ora le
 * celle si separano con lo **spazio e l'allineamento all'asse**, che è AS
 * misurato: 25 righe e sette colonne senza un filetto, con il solo passo a
 * farle leggere.
 *
 * La cifra è a `display` con `tabular-nums`. **Il trattino resta** finché il
 * dato non arriva (decisione del 07/09): un `[[DA CLIENTE: mq progettati]]` a
 * 44 px riempie la cella su tre righe e fa sembrare la pagina rotta invece che
 * in attesa. Il segnaposto dichiarato è uno, nella nota. E qui **non c'è nessuna
 * quota**: il solo numero disponibile sarebbe «4 voci», che si conta a vista.
 *
 * Perché una `<ul>` e non una `<dl>`. In una `<dl>` il termine è l'etichetta e
 * la definizione è il valore, e la specifica impone `<dt>` prima di `<dd>`:
 * verrebbe l'etichetta sopra e il numero sotto, il contrario del prototipo
 * approvato (e `.numero-etichetta` ha il margine in alto, quindi in cima alla
 * cella starebbe pure sbagliata). L'alternativa — mettere il `<dd>` prima del
 * `<dt>` per salvare l'impaginazione — è markup non valido e racconta una bugia
 * al lettore di schermo. Allora un elenco di quattro voci, valore e etichetta
 * in due `<span>`: onesto da leggere, giusto da guardare. `role="list"` perché
 * il reset toglie i pallini e con quelli Safari toglie anche la semantica.
 *
 * I valori stanno nel DOM come testo servito: senza JavaScript si leggono
 * uguale, e il contatore animato — se si farà — arriva alla fase 5 e parte da
 * quello che c'è già scritto (CLAUDE.md § Regole, 4).
 *
 * Le cifre non ci sono ancora e non si inventano (CLAUDE.md § Regole, 1). Nella
 * cella c'è un trattino: un `[[DA CLIENTE: mq progettati]]` impaginato a 44 px
 * riempirebbe la cella su tre righe e la striscia non si leggerebbe più — la
 * pagina sembrerebbe rotta invece che in attesa. Il segnaposto dichiarato è
 * **uno**, nella nota: il collaudo lo trova comunque cercando `[[DA CLIENTE`, e
 * chi guarda capisce a occhio che le cifre mancano (vedi `lib/numeri.ts`).
 *
 * La nota sta sotto perché `Sezione` la mette dopo i figli, ed è giusto: sopra
 * sembrerebbe un'introduzione, cioè contenuto; sotto si legge per quello che è,
 * una nota di cantiere — e sotto stanno anche quelle degli altri blocchi.
 */
export function Numeri() {
  return (
    <Sezione
      id="numeri"
      passo="corto"
      asse
      etichetta="i numeri"
      nota={
        <>
          Le cifre le mette lo studio: quattro, non otto. Le etichette sono una nostra proposta.{' '}
          <DaCliente>{notaNumeri}</DaCliente>
        </>
      }
    >
      <ul className="numeri" role="list">
        {numeri.map((numero) => (
          <li key={numero.etichetta} className="numero">
            <span className="numero-valore" aria-hidden={numero.valore === VALORE_ATTESO}>
              {numero.valore}
            </span>
            <span className="numero-etichetta">{numero.etichetta}</span>
          </li>
        ))}
      </ul>
    </Sezione>
  )
}
