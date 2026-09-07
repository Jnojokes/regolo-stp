/**
 * Il consenso privacy del brief.
 *
 * Regola (CLAUDE.md § Il form): casella **non pre-spuntata**, link
 * all'informativa, e «il consenso va registrato con timestamp e testo
 * dell'informativa».
 *
 * Perché il testo sta qui e non nel componente: quello che si registra deve
 * essere *esattamente* quello che l'utente ha letto. Se il testo vive dentro
 * il JSX e la registrazione lo riscrive a mano, prima o poi divergono e la
 * prova del consenso non vale più. Una costante, un solo posto, una versione.
 *
 * Quando il testo cambia si alza `versione`: i consensi già raccolti restano
 * legati alla versione con cui sono stati dati.
 *
 * Isomorfo, e volutamente minuscolo: lo importa anche il componente client.
 * La registrazione (timestamp, formattazione) sta in `registro.ts`, che è solo
 * lato server.
 */

export const CONSENSO = {
  versione: '2026-09-07',

  /** Il testo accanto alla casella. È anche quello che finisce nella mail. */
  testo:
    'Ho letto l’informativa privacy e acconsento al trattamento dei miei dati ' +
    'per essere ricontattato in merito alla richiesta inviata.',

  /** Come è spezzato in pagina, per mettere il link dentro la frase. */
  primaDelLink: 'Ho letto l’',
  testoDelLink: 'informativa privacy',
  dopoIlLink:
    ' e acconsento al trattamento dei miei dati per essere ricontattato in merito alla richiesta inviata.',

  href: '/privacy',
} as const

/* Il testo spezzato deve ricomporre il testo registrato: se qualcuno cambia una
   metà e non l'altra, la build lo dice invece di scoprirlo in collaudo. */
const ricomposto = CONSENSO.primaDelLink + CONSENSO.testoDelLink + CONSENSO.dopoIlLink
if (ricomposto !== CONSENSO.testo) {
  throw new Error(
    'lib/brief/consenso.ts: il testo spezzato per il link non ricompone CONSENSO.testo. ' +
      'Il consenso registrato non corrisponderebbe a quello mostrato.',
  )
}
