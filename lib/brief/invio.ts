/**
 * Invio delle due mail del brief.
 *
 * Due scelte da spiegare (DECISIONI.md, fase 2):
 *
 * 1. **Due invii separati, non un batch.** Resend ha `batch.send`, ma il batch
 *    è atomico: se la copia di cortesia viene rifiutata (indirizzo inesistente,
 *    dominio che rimbalza) cade anche la notifica allo studio, cioè si perde il
 *    lead. Quindi: prima la mail allo studio, e solo se quella è passata la
 *    copia di cortesia, che è «meglio se arriva» e non blocca l'esito.
 *
 * 2. **Trasporto su file, e solo se lo si chiede.** Con `BRIEF_TRASPORTO=file`
 *    le due mail si scrivono in `.brief-dev/` (.txt e .html) e si stampano in
 *    console invece di partire: serve a provare il form end-to-end — e a farlo
 *    vedere — senza una chiave e senza spedire niente a nessuno. Lo accendono
 *    gli script `dev` e `start:prova` in package.json.
 *
 *    Il gate è **esplicito** e non su `NODE_ENV`, per due motivi: `next start`
 *    gira con `NODE_ENV=production` anche quando si guarda il sito in locale
 *    (ed è così che si guarda questo progetto), e un ripiego implicito è
 *    esattamente il tipo di cosa che un giorno si accende dove non deve. Su
 *    Vercel la variabile viene ignorata: se c'è, è un errore di
 *    configurazione e si rifiuta l'invio invece di scrivere un file che
 *    nessuno leggerà.
 *
 *    Senza chiave e senza `BRIEF_TRASPORTO=file` il brief **non si dà per
 *    inviato**: si risponde «non inviato» e si logga. Non si perde un lead in
 *    silenzio.
 */

import { Resend } from 'resend'
import type { Mail } from './email'

export type EsitoInvio =
  | { ok: true; trasporto: 'resend' | 'file'; cortesiaInviata: boolean }
  | { ok: false; motivo: string }

type Configurazione = {
  chiave?: string
  da?: string
  a?: string
}

function configurazione(): Configurazione {
  return {
    chiave: process.env.RESEND_API_KEY?.trim() || undefined,
    da: process.env.BRIEF_FROM?.trim() || undefined,
    a: process.env.BRIEF_TO?.trim() || undefined,
  }
}

/**
 * Vero solo se il trasporto su file è stato chiesto esplicitamente e non siamo
 * su un deploy Vercel. `VERCEL` la imposta la piattaforma e non è sovrascrivibile
 * dall'ambiente del progetto: è il modo di essere sicuri che questo ripiego non
 * possa attivarsi davanti a una persona vera.
 */
function scriveSuFile(): boolean {
  const chiesto = process.env.BRIEF_TRASPORTO === 'file'
  if (chiesto && process.env.VERCEL) {
    console.error(
      '[brief] BRIEF_TRASPORTO=file su un deploy Vercel: ignorato, e l’invio si rifiuta',
    )
    return false
  }
  return chiesto
}

/** Un indirizzo plausibile. Serve solo a distinguerlo da un segnaposto. */
const sembraUnIndirizzo = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/**
 * Dove arriva il brief.
 * In produzione è la casella dello studio: dato bloccante, sta in
 * CONTENUTI-DA-CLIENTE.md. Finché non arriva, `BRIEF_TO` non è riempibile con
 * un valore vero e la fase 8 deve fallire, non passare.
 */
export function destinatarioStudio(): string | null {
  return configurazione().a ?? null
}

/* -------------------------------------------------------------------------- */

export async function inviaBrief(alloStudio: Mail, diCortesia: Mail): Promise<EsitoInvio> {
  const { chiave, da } = configurazione()

  if (scriveSuFile()) return trasportoSuFile(alloStudio, diCortesia)

  /* Per spedire davvero servono tutte e tre: la chiave, il mittente verificato
     e una casella vera dove far arrivare il brief. Il destinatario arriva come
     argomento e può essere il segnaposto `[[DA CLIENTE: …]]`: è il caso in cui
     il dato bloccante non è ancora arrivato, e allora NON si finge di aver
     spedito. */
  const manca = [
    !chiave && 'RESEND_API_KEY',
    !da && 'BRIEF_FROM',
    !sembraUnIndirizzo(alloStudio.a) && 'BRIEF_TO (la casella dello studio)',
  ].filter(Boolean)

  if (manca.length > 0) {
    console.error(
      `[brief] invio impossibile: manca ${manca.join(', ')}. ` +
        'In locale si prova con `npm run dev` o `npm run start:prova`, che accendono BRIEF_TRASPORTO=file.',
    )
    return { ok: false, motivo: 'configurazione' }
  }

  const resend = new Resend(chiave)
  const mittente = da as string

  // 1. Allo studio. Questa deve passare: se non passa, il brief è perso.
  const studio = await resend.emails.send({
    from: mittente,
    to: [alloStudio.a],
    replyTo: alloStudio.rispondiA,
    subject: alloStudio.oggetto,
    text: alloStudio.testo,
    html: alloStudio.html,
  })

  if (studio.error) {
    console.error('[brief] la mail allo studio non è partita:', studio.error.message)
    return { ok: false, motivo: 'invio' }
  }

  // 2. La copia di cortesia. Se non parte, il brief è comunque arrivato: si
  //    annota e si va avanti, non si dice all'utente che è andata male.
  const cortesia = await resend.emails.send({
    from: mittente,
    to: [diCortesia.a],
    subject: diCortesia.oggetto,
    text: diCortesia.testo,
    html: diCortesia.html,
  })

  if (cortesia.error) {
    console.error('[brief] copia di cortesia non partita:', cortesia.error.message)
  }

  return { ok: true, trasporto: 'resend', cortesiaInviata: !cortesia.error }
}

/* ---------- trasporto su file ---------------------------------------------- */

/**
 * Scrive le due mail su disco invece di spedirle. `.brief-dev/` è ignorato da
 * git. Import dinamici: `node:fs` non deve finire nel grafo quando questo
 * ripiego non si usa.
 */
async function trasportoSuFile(alloStudio: Mail, diCortesia: Mail): Promise<EsitoInvio> {
  try {
    const { mkdir, writeFile } = await import('node:fs/promises')
    const { join } = await import('node:path')

    const cartella = join(process.cwd(), '.brief-dev')
    await mkdir(cartella, { recursive: true })

    const marca = new Date().toISOString().replace(/[:.]/g, '-')
    const scritti: string[] = []

    for (const [nome, mail] of [
      ['studio', alloStudio],
      ['cortesia', diCortesia],
    ] as const) {
      const base = `${marca}-${nome}`
      const intestazione = [
        `A:          ${mail.a}`,
        mail.rispondiA ? `Rispondi a: ${mail.rispondiA}` : null,
        `Oggetto:    ${mail.oggetto}`,
        '',
        '='.repeat(52),
        '',
      ]
        .filter((r) => r !== null)
        .join('\n')

      await writeFile(join(cartella, `${base}.txt`), intestazione + mail.testo, 'utf8')
      await writeFile(
        join(cartella, `${base}.html`),
        `<!doctype html><html lang="it"><meta charset="utf-8">` +
          `<title>${mail.oggetto}</title>` +
          `<p style="font:13px ui-monospace,monospace;padding:8px 24px;background:#17171A;color:#F4F2ED;margin:0">` +
          `A: ${mail.a}${mail.rispondiA ? ` · Rispondi a: ${mail.rispondiA}` : ''}<br>Oggetto: ${mail.oggetto}</p>` +
          mail.html,
        'utf8',
      )
      scritti.push(`${base}.txt`, `${base}.html`)
    }

    console.log(
      `\n[brief] BRIEF_TRASPORTO=file: le due mail sono state scritte in .brief-dev/ invece di partire\n` +
        scritti.map((f) => `        ${f}`).join('\n') +
        `\n\n${'─'.repeat(52)}\n${alloStudio.testo}${'─'.repeat(52)}\n`,
    )

    return { ok: true, trasporto: 'file', cortesiaInviata: true }
  } catch (errore) {
    console.error('[brief] trasporto su file fallito:', errore)
    return { ok: false, motivo: 'invio' }
  }
}
