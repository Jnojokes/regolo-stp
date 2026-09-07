/**
 * I quattro eventi, non quaranta (CLAUDE.md § Analytics).
 *
 * Quale analytics si installa è la decisione n. 10, ancora aperta: il vincolo
 * è «senza cookie», e i due candidati sono Vercel Analytics e Plausible. Questo
 * modulo parla a entrambi e non fa niente se non c'è nessuno dei due — così la
 * misurazione è già cablata nei blocchi e alla fase 7 si installa la libreria
 * senza toccare i componenti.
 *
 * Niente `dataLayer`: GA4 vorrebbe il banner, e il banner è quello che stiamo
 * evitando.
 */

/** L'elenco è chiuso di proposito: un quinto evento è una decisione, non una riga. */
export type Evento = 'brief_apertura' | 'brief_inviato' | 'click_telefono' | 'click_whatsapp'

type ConVercelAnalytics = {
  va?: (comando: 'event', dati: { name: string; data?: Record<string, string> }) => void
  plausible?: (evento: string, opzioni?: { props: Record<string, string> }) => void
}

export function traccia(evento: Evento, dati?: Record<string, string>): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as ConVercelAnalytics
  try {
    w.va?.('event', { name: evento, data: dati })
    w.plausible?.(evento, dati ? { props: dati } : undefined)
  } catch {
    // La misurazione non deve mai rompere una conversione.
  }
}
