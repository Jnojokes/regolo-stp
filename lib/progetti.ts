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

/**
 * I campi di una scheda, **chiusi**: l'elenco è il messaggio (§ Scheda
 * progetto), quindi non è una stringa libera. Serve a `dato()` qui sotto: chi
 * legge un campo lo chiede per nome, e un nome sbagliato non compila.
 */
export const ETICHETTE_DATI = [
  'Luogo',
  'Anno',
  'Superficie',
  'Ruolo dello studio',
  'Committente',
] as const

export type EtichettaDato = (typeof ETICHETTE_DATI)[number]

export type DatoDuro = { etichetta: EtichettaDato; valore: string }

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

/**
 * Il valore di un campo, **per chiave e mai per indice**.
 *
 * La home leggeva `dati[0]` e `dati[3]` per luogo e ruolo. Il giorno che
 * qualcuno riordina l'array qui sopra — o gli aggiunge «Impresa», che § Scheda
 * progetto elenca fra i dati duri — la scheda stampa la **superficie** sotto la
 * riga del ruolo, e non si rompe niente: nessun tipo cambia, nessun collaudo
 * fallisce, e in pagina resta una credenziale sbagliata. Ma il ruolo è il campo
 * che § Scheda progetto vieta di omettere, cioè quello che dice cosa sanno
 * fare: è l'ultimo che può scivolare in silenzio.
 *
 * Si ferma invece di stampare il campo sbagliato: il tipo chiude l'elenco, e se
 * un progetto vero arriva senza il ruolo il build cade qui, con scritto quale
 * campo manca. È lo stesso patto di `scripts/genera-territorio.mjs`, che si
 * ferma quando le numerosità cambiano.
 */
export function dato(progetto: Progetto, etichetta: EtichettaDato): string {
  const trovato = progetto.dati.find((d) => d.etichetta === etichetta)
  if (!trovato) throw new Error(`Progetto «${progetto.titolo}» senza il campo «${etichetta}»`)
  return trovato.valore
}

export const progetti: readonly Progetto[] = [
  scheda('01', 'Foto progetto 01 — dallo studio, non un render'),
  scheda('02', 'Foto progetto 02 — dallo studio, non un render'),
  scheda('03', 'Foto progetto 03 — dallo studio, non un render'),
]

/** Si dichiara in pagina: nessuno deve credere che questi siano progetti. */
export const notaProgetti =
  'Le schede sono vuote per scelta: foto, luoghi, anni, superfici e ruolo dello studio arrivano dallo studio. Il campo «ruolo» resta anche vuoto, perché è quello che fa la differenza.'
