/**
 * La registrazione del consenso: quello che finisce nella mail allo studio ed è
 * la prova di cosa è stato accettato e quando.
 *
 * Solo lato server (lo usa il route handler): tiene fuori dal bundle client
 * `Intl.DateTimeFormat` e la formattazione delle date.
 */
import { CONSENSO } from './consenso'

export type RegistrazioneConsenso = {
  /** ISO 8601 con offset: senza fuso orario un timestamp non prova niente. */
  quando: string
  /** Lo stesso in chiaro, ora italiana, per chi legge la mail. */
  quandoLeggibile: string
  versione: string
  testo: string
  /** La pagina da cui è stato inviato il brief. */
  pagina: string
}

/** Formato leggibile, ora di Roma, indipendente dal fuso del server. */
function leggibile(data: Date): string {
  const f = new Intl.DateTimeFormat('it-IT', {
    dateStyle: 'long',
    timeStyle: 'medium',
    timeZone: 'Europe/Rome',
  })
  return `${f.format(data)} (ora italiana)`
}

/** ISO con l'offset di Roma, non con lo `Z` del server. */
function isoConOffset(data: Date): string {
  const parti = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Rome',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'longOffset',
  }).formatToParts(data)
  const p = (t: string) => parti.find((x) => x.type === t)?.value ?? ''
  // longOffset dà "GMT+02:00": il formato ISO vuole "+02:00".
  const offset = p('timeZoneName').replace('GMT', '') || 'Z'
  return `${p('year')}-${p('month')}-${p('day')}T${p('hour')}:${p('minute')}:${p('second')}${offset}`
}

/**
 * La registrazione del consenso, così come finisce nella mail allo studio.
 *
 * Non registriamo l'indirizzo IP: per provare *cosa* è stato accettato bastano
 * il momento, il testo e la versione, e l'identità è nei dati di contatto
 * stessi. L'IP si usa solo, in memoria e per pochi minuti, per il rate limit
 * (DECISIONI.md, fase 2).
 */
export function registraConsenso(pagina: string, adesso = new Date()): RegistrazioneConsenso {
  return {
    quando: isoConOffset(adesso),
    quandoLeggibile: leggibile(adesso),
    versione: CONSENSO.versione,
    testo: CONSENSO.testo,
    pagina,
  }
}
