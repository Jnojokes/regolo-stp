/**
 * I progetti in evidenza (CLAUDE.md § Homepage, blocco 4 · catalogo blocchi D2).
 *
 * **Non c'è nemmeno un progetto vero, e questo file non ne inventa uno.**
 * Sei-dieci progetti con foto, luogo, anno, mq e ruolo dello studio sono il
 * dato bloccante numero uno (CONTENUTI-DA-CLIENTE.md): finché non arrivano,
 * `/progetti/[slug]` dà un 404 vero (fase 1) e qui ci sono tre schede con i
 * campi giusti e i valori dichiarati vuoti.
 *
 * Il campo **ruolo** non si omette mai, nemmeno adesso (CLAUDE.md § Scheda
 * progetto): è quello che dice cosa sanno fare, e manca in quasi tutti i siti
 * di studi tecnici. Una scheda senza ruolo è una fotografia con una didascalia,
 * non una credenziale.
 *
 * Alla fase 4 questo file diventa l'indice dei progetti veri e le schede
 * acquistano uno `slug` che risolve.
 */

import { daCliente } from './site'

export type DatoDuro = { etichetta: string; valore: string }

export type Progetto = {
  /** Come si chiama la scheda finché non ha un nome. */
  titolo: string
  /** Cosa deve mostrare la foto, per TODO-MEDIA.md. */
  copertina: string
  /** I dati duri, nell'ordine in cui li legge un committente. */
  dati: readonly DatoDuro[]
}

/** I campi di ogni scheda, sempre gli stessi: cambia il valore, non l'elenco. */
function scheda(numero: string, copertina: string): Progetto {
  return {
    titolo: daCliente(`nome del progetto ${numero}`),
    copertina,
    dati: [
      { etichetta: 'Luogo', valore: daCliente('comune') },
      { etichetta: 'Anno', valore: daCliente('anno') },
      { etichetta: 'Superficie', valore: daCliente('mq') },
      {
        etichetta: 'Ruolo dello studio',
        valore: daCliente('ruolo: progetto / DL / sicurezza / collaudo'),
      },
      { etichetta: 'Committente', valore: daCliente('committente, se citabile') },
    ],
  }
}

export const progetti: readonly Progetto[] = [
  scheda('01', 'Foto progetto 01 — dallo studio, non un render'),
  scheda('02', 'Foto progetto 02 — dallo studio, non un render'),
  scheda('03', 'Foto progetto 03 — dallo studio, non un render'),
]

/** Si dichiara in pagina: nessuno deve credere che questi siano progetti. */
export const notaProgetti =
  'Le schede sono vuote per scelta: foto, luoghi, anni, superfici e ruolo dello studio arrivano dallo studio. Il campo «ruolo» resta anche vuoto, perché è quello che fa la differenza.'
