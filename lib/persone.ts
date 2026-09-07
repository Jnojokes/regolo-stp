/**
 * Le persone (CLAUDE.md § Homepage, blocco 9 · catalogo blocchi G2).
 *
 * «In una società tra professionisti si sceglie chi firma»: è il blocco che
 * chiude la fiducia, e per questo è anche quello in cui non si inventa niente.
 * Nome, ruolo, ordine e numero d'iscrizione sono dati bloccanti
 * (CONTENUTI-DA-CLIENTE.md) e i ritratti sono foto dello studio, mai stock
 * (CLAUDE.md § Regole, 2).
 *
 * Qui ci sono quattro caselle vuote dichiarate. Il **ruolo** è l'unica cosa
 * suggerita, e tre dei quattro risultano da fonti confermate: CLAUDE.md
 * § Cliente dice «società tra professionisti di ingegneria civile e
 * architettura» (l'ingegnere e l'architetto) e mette il «coordinamento
 * sicurezza» fra le competenze dichiarate.
 *
 * Il quarto — «geometra» — veniva dal prototipo e **non risulta da nessuna
 * fonte confermata**: è diventato un segnaposto. Che in studio ci sia un
 * geometra è probabile e per questo era facile scriverlo, ed è esattamente il
 * tipo di dato plausibile che la regola 1 vieta.
 *
 * Quante persone siano davvero e chi faccia cosa lo dice lo studio: è di 2-10
 * persone (LinkedIn, verificato), quindi quattro caselle sono un'ipotesi di
 * impaginazione, non un organigramma.
 */

import { daCliente } from './site'

export type Persona = {
  nome: string
  /**
   * Il mestiere. Per tre caselle su quattro risulta da CLAUDE.md § Cliente;
   * per la quarta è un segnaposto, perché nessuna fonte lo conferma.
   */
  ruolo: string
  /** Ordine, sezione e numero: dato bloccante. */
  abilitazioni: string
  /** Cosa deve dire la foto, per TODO-MEDIA.md. */
  ritratto: string
}

export const persone: readonly Persona[] = [
  {
    nome: daCliente('nome e cognome'),
    ruolo: 'ingegnere',
    abilitazioni: daCliente('ordine, sezione e numero'),
    ritratto: 'Ritratto — foto dello studio',
  },
  {
    nome: daCliente('nome e cognome'),
    ruolo: 'architetto',
    abilitazioni: daCliente('ordine, sezione e numero'),
    ritratto: 'Ritratto — foto dello studio',
  },
  {
    nome: daCliente('nome e cognome'),
    ruolo: 'ingegnere · coordinamento sicurezza',
    abilitazioni: daCliente('ordine e abilitazione CSP/CSE'),
    ritratto: 'Ritratto — foto dello studio',
  },
  {
    nome: daCliente('nome e cognome'),
    /* Non «geometra»: nessuna fonte confermata dice che in studio ce ne sia
       uno. Il mestiere di chi segue pratiche e cantiere lo dice lo studio. */
    ruolo: daCliente('mestiere di chi segue pratiche e cantiere'),
    abilitazioni: daCliente('albo o collegio, e numero'),
    ritratto: 'Ritratto — foto dello studio',
  },
]

/** Perché le caselle sono quattro e non altre: si dichiara in pagina. */
export const notaPersone =
  'Quante persone e chi firma cosa lo dice lo studio: queste quattro caselle sono un’ipotesi di impaginazione.'
