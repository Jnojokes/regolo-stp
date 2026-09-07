/**
 * Validazione del brief. Isomorfa: **lo stesso codice** gira nel browser
 * (messaggi in linea passo per passo) e nel route handler (che non si fida di
 * niente). Una sola regola scritta una volta sola: non possono divergere.
 *
 * Attenzione a cosa entra in questo file: lo importa un componente client.
 * Niente Node, e niente `comuni.ts` — i 128 nomi stanno nell'HTML del
 * `<datalist>`, non nel bundle. Il riconoscimento del comune è lato server
 * (`riconosciComune`) e non è una validazione: lo studio lavora anche fuori
 * dalle tre province.
 *
 * Senza JavaScript questa validazione non gira, e va bene: lì il lavoro lo fa
 * la validazione nativa del browser (`required`, `type="email"`, `maxlength`),
 * che è HTML e funziona da sola. Il server resta l'ultima parola in entrambi
 * i casi.
 */

import { HONEYPOT, campi, gruppi, nomiDelPasso, passi } from './domande'

export type Errori = Record<string, string>

export type Brief = {
  intervento: string
  comune: string
  immobile: string
  punto: string
  tempi: string
  nome: string
  telefono: string
  email: string
  note: string
}

/** Cosa può arrivare da una FormData: stringhe, o niente. */
export type Grezzo = Record<string, string | undefined>

/* ---------- normalizzazione ------------------------------------------------ */

/** Caratteri di controllo via, spazi normalizzati: si fa prima di ogni controllo. */
const CONTROLLO = /[\u0000-\u001f\u007f-\u009f\u200b-\u200f\u2028\u2029\ufeff]/g
/** Come sopra, ma il ritorno a capo (\u000a) resta: serve al testo lungo. */
const CONTROLLO_TRANNE_RIGHE =
  /[\u0000-\u0009\u000b-\u001f\u007f-\u009f\u200b-\u200f\u2028\u2029\ufeff]/g

export function pulisci(valore: string | undefined): string {
  if (!valore) return ''
  return valore.replace(CONTROLLO, '').replace(/\s+/g, ' ').trim()
}

/**
 * Il comune come lo scrive una persona vera, riportato alla forma che il
 * riconoscimento si aspetta.
 *
 * Il `<datalist>` mostra «Fermo (FM)» e ha `value="Fermo"`: chi sceglie dalla
 * tendina ottiene «Fermo», ma chi **scrive quello che legge** ottiene
 * «Fermo (FM)» — e quella era una stringa che il server rifiutava. Senza
 * JavaScript il rifiuto costava tutte e cinque le risposte, sul campo che
 * quasi tutti compilano per primo. Qui la sigla in coda si toglie e non si
 * discute: è informazione che abbiamo già.
 *
 * Si toglie anche una sigla senza parentesi («Fermo FM») e si normalizzano gli
 * apostrofi tipografici, perché l'elenco ISTAT usa quello dritto.
 */
export function pulisciComune(valore: string | undefined): string {
  return pulisci(valore)
    .replace(/[\u2018\u2019\u02bc]/g, "'")
    .replace(/[\s,]*\(\s*[A-Za-z]{2}\s*\)\s*$/, '')
    .replace(/[\s,]+[A-Za-z]{2}$/, (m) => (/^[\s,]+(?:di|da|il|la|le|lo)$/i.test(m) ? m : ''))
    .trim()
}

/** Il testo lungo conserva le righe: solo gli spazi orizzontali si comprimono. */
export function pulisciTesto(valore: string | undefined): string {
  if (!valore) return ''
  return valore
    .replace(/\r\n?/g, '\n')
    .replace(CONTROLLO_TRANNE_RIGHE, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/* ---------- regole per campo ----------------------------------------------- */

/** Lettere (accenti compresi), apostrofi, trattini, punti e spazi. */
const NOME_PROPRIO = /^[\p{L}][\p{L}’' .-]*$/u

/**
 * Email: volutamente permissiva. L'unico controllo che dice davvero se un
 * indirizzo esiste è mandarci una mail — che è quello che facciamo subito
 * dopo con la copia di cortesia. Qui si scartano solo le cose che non sono
 * un indirizzo.
 */
const EMAIL = /^[^\s@,;:<>()[\]\\"]+@[^\s@.,;:<>()[\]\\"]+(\.[^\s@.,;:<>()[\]\\"]+)+$/

/** Cifre di un numero di telefono, buttato via tutto il resto. */
const cifre = (s: string) => s.replace(/\D/g, '')

function controllaCampo(nome: string, valore: string): string | null {
  const campo = campi[nome]
  if (!campo) return null

  if (!valore) {
    return campo.obbligatorio ? messaggioMancante(nome) : null
  }
  if (valore.length > campo.massimo) {
    return `Troppo lungo: massimo ${campo.massimo} caratteri.`
  }

  switch (campo.tipo) {
    case 'comune':
      if (valore.length < 2) return 'Scrivi il nome del comune.'
      if (!NOME_PROPRIO.test(valore)) return 'Nel nome di un comune ci sono solo lettere.'
      return null

    case 'testo':
      if (valore.length < 2) return 'Scrivi il tuo nome.'
      if (!NOME_PROPRIO.test(valore)) return 'Nel nome ci sono solo lettere.'
      return null

    case 'tel': {
      const n = cifre(valore)
      if (n.length < 8) return 'Il numero sembra incompleto.'
      if (n.length > 15) return 'Il numero sembra troppo lungo.'
      if (!/^\+?[\d .\-()/]+$/.test(valore)) return 'Scrivi solo cifre, spazi e il prefisso.'
      return null
    }

    case 'email':
      if (!EMAIL.test(valore)) return 'Controlla l’indirizzo: manca qualcosa.'
      return null

    case 'testolungo':
      return null
  }
}

function messaggioMancante(nome: string): string {
  switch (nome) {
    case 'comune':
      return 'Dicci almeno il comune.'
    case 'nome':
      return 'Come ti chiami?'
    case 'telefono':
      return 'Serve un numero per richiamarti.'
    case 'email':
      return 'Serve la mail per mandarti la copia del brief.'
    default:
      return 'Questo campo serve.'
  }
}

function controllaGruppo(nome: string, valore: string): string | null {
  if (!valore) return 'Scegli una risposta.'
  return gruppi[nome]?.opzioni.some((o) => o.valore === valore) ? null : 'Scegli una risposta.'
}

/* ---------- un passo alla volta (lo usa il client) ------------------------- */

/**
 * Valida solo il passo in cui si è: è quello che serve al bottone «Avanti».
 * Torna una mappa vuota se il passo è a posto.
 */
export function validaPasso(indice: number, dati: Grezzo): Errori {
  const errori: Errori = {}
  for (const nome of nomiDelPasso(indice)) {
    if (nome in gruppi) {
      const e = controllaGruppo(nome, pulisci(dati[nome]))
      if (e) errori[nome] = e
    } else if (nome in campi) {
      const grezzo =
        campi[nome].tipo === 'testolungo'
          ? pulisciTesto(dati[nome])
          : campi[nome].tipo === 'comune'
            ? pulisciComune(dati[nome])
            : pulisci(dati[nome])
      const e = controllaCampo(nome, grezzo)
      if (e) errori[nome] = e
    } else if (nome === 'consenso') {
      if (!dati.consenso) errori.consenso = 'Senza il consenso non possiamo ricontattarti.'
    }
  }
  return errori
}

/** Tutti i passi in fila. Il client la usa prima di inviare, il server dentro `valida`. */
export function validaTutto(dati: Grezzo): Errori {
  const errori: Errori = {}
  for (let i = 0; i < passi.length; i++) Object.assign(errori, validaPasso(i, dati))
  return errori
}

/** Il primo passo che contiene un errore: è lì che va riportato chi compila. */
export function passoDellErrore(errori: Errori): number {
  const i = passi.findIndex((p) => p.elementi.some((e) => e.nome in errori))
  return i < 0 ? 0 : i
}

/* ---------- tutto insieme (lo usa il server) ------------------------------- */

export type Esito =
  | { ok: true; brief: Brief }
  | { ok: false; errori: Errori; primoPasso: number }
  | { ok: false; bot: true }

/**
 * Valida l'intero invio. È la funzione che decide, e gira sul server: il
 * client la usa solo per anticipare i messaggi.
 */
export function valida(dati: Grezzo): Esito {
  // Trappola: un campo che nessun umano vede e nessun umano compila.
  if (pulisci(dati[HONEYPOT])) return { ok: false, bot: true }

  const errori = validaTutto(dati)
  if (Object.keys(errori).length > 0) {
    return { ok: false, errori, primoPasso: passoDellErrore(errori) }
  }

  return {
    ok: true,
    brief: {
      intervento: pulisci(dati.intervento),
      comune: pulisciComune(dati.comune),
      immobile: pulisci(dati.immobile),
      punto: pulisci(dati.punto),
      tempi: pulisci(dati.tempi),
      nome: pulisci(dati.nome),
      telefono: pulisci(dati.telefono),
      email: pulisci(dati.email).toLowerCase(),
      note: pulisciTesto(dati.note),
    },
  }
}

/** Da FormData a oggetto piatto di stringhe, senza fidarsi dei tipi. */
export function daFormData(form: FormData): Grezzo {
  const dati: Grezzo = {}
  for (const [chiave, valore] of form.entries()) {
    if (typeof valore === 'string' && dati[chiave] === undefined) dati[chiave] = valore
  }
  return dati
}
