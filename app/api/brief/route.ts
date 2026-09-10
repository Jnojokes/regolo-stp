/**
 * POST /api/brief — l'unico modo in cui il brief diventa una mail.
 *
 * Lo stesso endpoint serve i due percorsi, e questo è il punto:
 *
 *  — **senza JavaScript** il browser fa un POST vero del `<form>`; qui si
 *    risponde con un **303** e il browser va in GET sulla pagina di esito.
 *    (Attenzione: `redirect()` di Next, in un route handler, serve un 307, che
 *    su un POST fa ri-POSTare la richiesta sulla destinazione. Serve un 303
 *    scritto a mano.)
 *
 *  — **con JavaScript** il componente manda la stessa FormData in `fetch` con
 *    `Accept: application/json`, e qui si risponde in JSON.
 *
 * Un solo percorso di validazione, un solo invio, un solo posto in cui
 * guardare quando qualcosa non arriva.
 */

import { NextResponse } from 'next/server'
import { CAMPO_PAGINA } from '@/lib/brief/domande'
import { mailAlloStudio, mailDiCortesia } from '@/lib/brief/email'
import { destinatarioStudio, inviaBrief } from '@/lib/brief/invio'
import { controllaLimite, ipDellaRichiesta, restituisciCredito } from '@/lib/brief/rate-limit'
import { registraConsenso } from '@/lib/brief/registro'
import { daFormData, valida } from '@/lib/brief/validazione'
import { MEDIA_DEMO } from '@/lib/media-demo'
import { daCliente } from '@/lib/site'

/** Il brief non si mette in cache mai, in nessuna forma. */
export const dynamic = 'force-dynamic'

/**
 * Motivi di fallimento che la pagina «non inviato» sa spiegare.
 * `anteprima` non è un guasto: è l'invio spento per scelta nell'anteprima delle
 * tre proposte (DECISIONI.md n. 55). Resta un fallimento — il brief **non** è
 * partito, e nessuna risposta deve lasciarlo credere.
 */
type Motivo = 'troppi-invii' | 'dati' | 'tecnico' | 'anteprima'

export async function POST(richiesta: Request) {
  const vuoleJson = richiesta.headers.get('accept')?.includes('application/json') ?? false
  const rispondi = vuoleJson ? rispostaJson : (esito: Risposta) => rispostaHtml(esito, richiesta)

  /* 1. Rate limit. Prima di tutto: anche leggere la FormData costa. */
  const ip = ipDellaRichiesta(richiesta.headers)
  const limite = controllaLimite(ip)
  if (!limite.ok) {
    return rispondi({ ok: false, motivo: 'troppi-invii', riprovaTra: limite.riprovaTraSecondi })
  }

  /* 2. La FormData. Un corpo che non è una form è un client che non è il nostro. */
  let dati
  try {
    dati = daFormData(await richiesta.formData())
  } catch {
    restituisciCredito(ip, limite.segno)
    return rispondi({ ok: false, motivo: 'tecnico' })
  }

  /* 3. Validazione. La stessa funzione che gira nel browser, qui però decide. */
  const esito = valida(dati)

  if (!esito.ok && 'bot' in esito) {
    // Honeypot pieno. Al bot si risponde «tutto bene» e non si manda niente:
    // un 400 gli dice quale campo evitare la prossima volta.
    console.warn('[brief] honeypot pieno: invio scartato')
    return rispondi({ ok: true, cortesiaInviata: true })
  }

  if (!esito.ok) {
    // Chi sbaglia un campo non ha consumato un invio.
    restituisciCredito(ip, limite.segno)
    return rispondi({
      ok: false,
      motivo: 'dati',
      errori: esito.errori,
      primoPasso: esito.primoPasso,
    })
  }

  /* 4. Consenso: momento, testo, versione, pagina. È la prova, e sta nella mail. */
  const pagina = paginaDiPartenza(dati[CAMPO_PAGINA], richiesta)
  const consenso = registraConsenso(pagina)

  /* 5. Le due mail. Se la configurazione non basta a spedirle, lo dice
        `inviaBrief`: la decisione su cosa serve per partire sta tutta lì,
        non metà qui e metà là. */
  const destinatario = destinatarioStudio() ?? daCliente('email dello studio')

  const inviato = await inviaBrief(
    mailAlloStudio(esito.brief, consenso, destinatario),
    mailDiCortesia(esito.brief, consenso),
  )

  if (!inviato.ok) {
    restituisciCredito(ip, limite.segno)
    /* Le tre proposte si guardano da un link mandato per mail, e chi prova il
       brief da lì è il cliente stesso. Su quel deploy l'invio non è
       configurato **per scelta** (nessuna chiave su Vercel), quindi «problema
       tecnico» direbbe una cosa falsa: il form ha funzionato, è l'invio a
       essere spento. Si dice quello — ma solo con l'interruttore della demo
       acceso e solo per la configurazione mancante: un Resend che rifiuta resta
       un guasto vero. Alla fase 5 `lib/media-demo.ts` si cancella, e questo
       ramo con lui. */
    const anteprima = MEDIA_DEMO && inviato.motivo === 'configurazione'
    return rispondi({ ok: false, motivo: anteprima ? 'anteprima' : 'tecnico' })
  }

  return rispondi({ ok: true, cortesiaInviata: inviato.cortesiaInviata })
}

/** Un GET su questo indirizzo non è un errore del server: è la pagina sbagliata. */
export async function GET() {
  return NextResponse.json(
    { errore: 'Il brief si invia dal form.', dove: '/contatti#brief' },
    { status: 405, headers: { Allow: 'POST' } },
  )
}

/* -------------------------------------------------------------------------- */

type Risposta =
  | { ok: true; cortesiaInviata: boolean }
  | {
      ok: false
      motivo: Motivo
      errori?: Record<string, string>
      primoPasso?: number
      riprovaTra?: number
    }

function rispostaJson(esito: Risposta) {
  if (esito.ok) return NextResponse.json({ ok: true, cortesiaInviata: esito.cortesiaInviata })
  // `anteprima` è un 503 e non un 2xx: il componente tratta ogni 2xx come un
  // brief arrivato, e questo non lo è.
  const stato =
    esito.motivo === 'troppi-invii'
      ? 429
      : esito.motivo === 'dati'
        ? 422
        : esito.motivo === 'anteprima'
          ? 503
          : 500
  const intestazioni = esito.riprovaTra ? { 'Retry-After': String(esito.riprovaTra) } : undefined
  return NextResponse.json(esito, { status: stato, headers: intestazioni })
}

/**
 * Il percorso senza JavaScript: 303 e via alla pagina di esito.
 * 303 e non 307 perché il browser deve seguire in **GET**: con un 307
 * ri-POSTerebbe il brief sulla pagina di ringraziamento.
 */
function rispostaHtml(esito: Risposta, richiesta: Request) {
  const dove = esito.ok
    ? esito.cortesiaInviata
      ? '/brief/inviato'
      : '/brief/inviato?copia=no'
    : `/brief/non-inviato?motivo=${esito.motivo}`
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL(dove, richiesta.url).toString(),
      ...(esito.ok || !esito.riprovaTra ? {} : { 'Retry-After': String(esito.riprovaTra) }),
    },
  })
}

/**
 * Da quale pagina è partito il brief, per la registrazione del consenso.
 * Si accetta solo un percorso interno: il campo arriva dal client, e quello
 * che arriva dal client non si scrive da nessuna parte senza guardarlo.
 */
function paginaDiPartenza(dichiarata: string | undefined, richiesta: Request): string {
  if (dichiarata && /^\/[\w\-/?=&.]{0,120}$/.test(dichiarata)) return dichiarata
  const referer = richiesta.headers.get('referer')
  if (referer) {
    try {
      const url = new URL(referer)
      if (url.origin === new URL(richiesta.url).origin) return url.pathname + url.search
    } catch {
      /* referer illeggibile: si va al ripiego */
    }
  }
  return '(pagina non registrata)'
}
