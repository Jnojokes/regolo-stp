/**
 * Rate limit del brief: finestra scorrevole in memoria, per indirizzo IP.
 *
 * Perché in memoria e non su Redis (DECISIONI.md, fase 2): il brief di uno
 * studio di cinque persone riceve qualche invio al giorno. Su Fluid Compute
 * l'istanza si riusa fra richieste, quindi la finestra tiene per il caso
 * normale; quando l'istanza è fredda o ce n'è più di una, il limite diventa
 * più permissivo — mai più severo, quindi non chiude fuori nessuno. È il
 * compromesso giusto: costa zero servizi da mantenere e non c'è niente da
 * pagare. Se un giorno arriva spam vero, la sostituzione è un file.
 *
 * L'IP si tiene in memoria per la durata della finestra e non finisce in
 * nessuna mail e in nessun log (CLAUDE.md § Il form, minimizzazione).
 *
 * Niente CAPTCHA: costa conversione, e su un brief da cinque passi con
 * honeypot non serve.
 */

/** Quanti invii per IP nella finestra. */
const MAX = 5
/** Ampiezza della finestra. */
const FINESTRA_MS = 15 * 60 * 1000
/** Oltre questo numero di IP in memoria si fa pulizia: non è una cache infinita. */
const MAX_CHIAVI = 5000

const visite = new Map<string, number[]>()

export type EsitoLimite =
  /** `segno` è il momento registrato: serve solo per restituire il credito. */
  { ok: true; segno: number } | { ok: false; riprovaTraSecondi: number }

/**
 * L'IP del chiamante secondo gli header del proxy.
 * Su Vercel `x-forwarded-for` è impostato dalla piattaforma e il primo valore è
 * il client. In locale non c'è: si usa una chiave sola, che va benissimo perché
 * in locale c'è un solo client.
 */
export function ipDellaRichiesta(headers: Headers): string {
  const inoltrato = headers.get('x-forwarded-for')
  if (inoltrato) {
    const primo = inoltrato.split(',')[0]?.trim()
    if (primo) return primo
  }
  return headers.get('x-real-ip')?.trim() || 'locale'
}

export function controllaLimite(ip: string, adesso = Date.now()): EsitoLimite {
  if (visite.size > MAX_CHIAVI) potaTutto(adesso)

  const soglia = adesso - FINESTRA_MS
  const recenti = (visite.get(ip) ?? []).filter((t) => t > soglia)

  if (recenti.length >= MAX) {
    const piuVecchio = Math.min(...recenti)
    visite.set(ip, recenti)
    return {
      ok: false,
      riprovaTraSecondi: Math.max(1, Math.ceil((piuVecchio + FINESTRA_MS - adesso) / 1000)),
    }
  }

  recenti.push(adesso)
  visite.set(ip, recenti)
  return { ok: true, segno: adesso }
}

/**
 * Un invio rifiutato dalla validazione non deve consumare il credito: chi non
 * ha JavaScript e sbaglia la mail cinque volte non va chiuso fuori per un
 * quarto d'ora. Si toglie **quel** momento, non l'ultimo della lista: due
 * richieste vicine non si rubano il credito a vicenda.
 */
export function restituisciCredito(ip: string, segno: number): void {
  const recenti = visite.get(ip)
  if (!recenti?.length) return
  const i = recenti.lastIndexOf(segno)
  if (i < 0) return
  recenti.splice(i, 1)
  if (recenti.length === 0) visite.delete(ip)
}

function potaTutto(adesso: number): void {
  const soglia = adesso - FINESTRA_MS
  for (const [ip, tempi] of visite) {
    const recenti = tempi.filter((t) => t > soglia)
    if (recenti.length === 0) visite.delete(ip)
    else visite.set(ip, recenti)
  }
}

/** Solo per i test manuali: svuota la finestra. */
export function azzeraLimite(): void {
  visite.clear()
}
