/**
 * I quattro numeri (CLAUDE.md § Homepage, blocco 3 · catalogo blocchi B1):
 * anni · progetti · mq · comuni. Quattro, non otto.
 *
 * Le etichette sono nostre, i valori sono dello studio e non ci sono ancora:
 * un numero inventato qui è la cosa più facile da smentire di tutto il sito
 * (CLAUDE.md § Regole, 1).
 *
 * ## Perché un trattino e non `[[DA CLIENTE]]` in ogni cella
 *
 * Il valore si impagina nel carattere display a ~44 px. Un
 * `[[DA CLIENTE: mq progettati]]` lì dentro riempie la cella su tre righe, e la
 * striscia dei numeri diventa illeggibile: non si capisce più che sono quattro
 * quote affiancate, e la pagina sembra rotta invece che in attesa. È quello che
 * fa il prototipo B, e ha ragione: nella cella ci va un `—`.
 *
 * Il segnaposto dichiarato resta **uno**, nella nota del blocco: così il
 * collaudo della fase 8 lo trova comunque cercando `[[DA CLIENTE`, e chi guarda
 * la pagina capisce a occhio che le cifre mancano. Quattro segnaposto per dire
 * la stessa cosa erano quattro volte lo stesso rumore.
 *
 * Il valore sta nel DOM anche senza JavaScript: il contatore animato, se si
 * farà, arriva alla fase 5 e parte da quello che c'è già scritto.
 */

import { daCliente } from './site'

/** Il valore in attesa. Non una stringa vuota: una quota che si vede. */
export const VALORE_ATTESO = '—'

export type Numero = {
  /** Il valore. Oggi `VALORE_ATTESO`; alla fase 4 una cifra. */
  valore: string
  etichetta: string
  /** Che cosa chiedere allo studio, per CONTENUTI-DA-CLIENTE.md. */
  chiedere: string
}

export const numeri: readonly Numero[] = [
  {
    valore: VALORE_ATTESO,
    etichetta: 'anni di attività',
    chiedere: 'da che anno lavora lo studio (o il predecessore, se la continuità si dichiara)',
  },
  {
    valore: VALORE_ATTESO,
    etichetta: 'progetti seguiti',
    chiedere: 'quanti incarichi chiusi, anche un ordine di grandezza difendibile',
  },
  {
    valore: VALORE_ATTESO,
    etichetta: 'mq progettati',
    chiedere:
      'superficie complessiva progettata: è il dato che il committente italiano legge per primo',
  },
  {
    valore: VALORE_ATTESO,
    etichetta: 'comuni in cui abbiamo lavorato',
    chiedere: 'quanti comuni, e quali (serve anche al blocco Territorio e alla decisione n. 13)',
  },
]

/**
 * L'unico segnaposto dichiarato del blocco: quello che va chiesto allo studio.
 * Lo compone dalle quattro voci di `chiedere`, così se una cambia cambia qui.
 */
export const notaNumeri = daCliente(
  'le quattro cifre — ' + numeri.map((n) => n.etichetta).join(', '),
)
