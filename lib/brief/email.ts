/**
 * Le due mail del brief: quella allo studio e la copia di cortesia a chi
 * compila (CLAUDE.md § Il form).
 *
 * Solo lato server. Ogni mail esiste in testo e in HTML: il testo non è un
 * ripiego, è la versione che si legge sul telefono in cantiere.
 *
 * Nell'HTML niente immagini, niente tabelle di impaginazione, niente webfont:
 * una colonna, stili in linea, e il testo resta leggibile anche se il client
 * di posta butta via tutto il CSS.
 *
 * Cosa NON c'è, e volutamente:
 *  — nessuna promessa di tempi di risposta. CLAUDE.md § Obiettivo lo vieta, e
 *    quanto tempo passa prima della chiamata lo decide lo studio, non noi.
 *  — nessun indirizzo IP. Per provare il consenso bastano momento, testo e
 *    versione (lib/brief/registro.ts).
 */

import { site } from '@/lib/site'
import { riconosciComune } from './comuni'
import { CONSENSO } from './consenso'
import { etichettaDi } from './domande'
import type { RegistrazioneConsenso } from './registro'
import type { Brief } from './validazione'

export type Mail = {
  a: string
  oggetto: string
  testo: string
  html: string
  /** Su chi risponde: sulla mail di chi ha compilato. */
  rispondiA?: string
}

/* ---------- righe leggibili ------------------------------------------------ */

const scelta = (gruppo: string, valore: string) => etichettaDi(gruppo, valore) ?? valore

/** Il nome ufficiale del comune, se è una delle tre province; altrimenti quello scritto. */
function nomeDelComune(scritto: string): string {
  return riconosciComune(scritto)?.nome ?? scritto
}

/** Come sopra, ma con la provincia — o con l'avvertenza che è fuori zona. */
function comuneLeggibile(scritto: string): string {
  const riconosciuto = riconosciComune(scritto)
  if (riconosciuto) return `${riconosciuto.nome} (${riconosciuto.provincia})`
  return `${scritto} — fuori da FM, MC e AP`
}

type Riga = { etichetta: string; valore: string }

function righeDelBrief(brief: Brief): Riga[] {
  return [
    { etichetta: 'Intervento', valore: scelta('intervento', brief.intervento) },
    { etichetta: 'Dove', valore: comuneLeggibile(brief.comune) },
    { etichetta: 'Immobile', valore: scelta('immobile', brief.immobile) },
    { etichetta: 'A che punto è', valore: scelta('punto', brief.punto) },
    { etichetta: 'Tempi', valore: scelta('tempi', brief.tempi) },
  ]
}

function righeDiContatto(brief: Brief): Riga[] {
  return [
    { etichetta: 'Nome', valore: brief.nome },
    { etichetta: 'Telefono', valore: brief.telefono },
    { etichetta: 'Email', valore: brief.email },
  ]
}

/* ---------- impaginazione --------------------------------------------------- */

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Testo libero in HTML: i capoversi restano capoversi. */
const capoversi = (s: string) =>
  s
    .split('\n\n')
    .map((p) => `<p style="margin:0 0 12px">${esc(p).replace(/\n/g, '<br>')}</p>`)
    .join('')

const larghezzaEtichette = (righe: Riga[]) => Math.max(...righe.map((r) => r.etichetta.length))

function testoElenco(righe: Riga[]): string {
  const w = larghezzaEtichette(righe)
  return righe.map((r) => `${r.etichetta.padEnd(w)}  ${r.valore}`).join('\n')
}

function htmlElenco(righe: Riga[]): string {
  return (
    '<dl style="margin:0">' +
    righe
      .map(
        (r) =>
          `<dt style="font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#6E6B66;margin:14px 0 2px">${esc(r.etichetta)}</dt>` +
          `<dd style="margin:0;font-size:16px;color:#17171A">${esc(r.valore)}</dd>`,
      )
      .join('') +
    '</dl>'
  )
}

const INIZIO_HTML =
  '<div style="margin:0;padding:24px;background:#F4F2ED;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Helvetica,Arial,sans-serif;color:#17171A;line-height:1.55">' +
  '<div style="max-width:600px;margin:0 auto;background:#FBFAF7;padding:28px;border:1px solid #DCD8D0">'
const FINE_HTML = '</div></div>'

const FILETTO = '<hr style="border:0;border-top:1px solid #DCD8D0;margin:26px 0">'

const titolo = (t: string) =>
  `<h1 style="margin:0 0 4px;font-size:22px;line-height:1.15;font-weight:600;color:#17171A">${esc(t)}</h1>`

const occhiello = (t: string) =>
  `<p style="margin:0 0 18px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#6E6B66">${esc(t)}</p>`

const paragrafo = (t: string) =>
  `<p style="margin:0 0 12px;font-size:16px;color:#17171A">${esc(t)}</p>`

const piccolo = (html: string) => `<div style="font-size:13px;color:#6E6B66">${html}</div>`

/** Riga di separazione nel testo: le mail in monospazio si leggono meglio così. */
const RIGA = '─'.repeat(52)

/* ---------- mail 1: allo studio ------------------------------------------- */

/**
 * La mail che deve arrivare. Se fallisce, il brief è perso: per questo si manda
 * per prima e da sola, non in batch con la copia di cortesia.
 *
 * `rispondiA` è la mail di chi ha compilato: dallo studio si risponde con
 * «Rispondi», senza copiare l'indirizzo a mano.
 */
export function mailAlloStudio(
  brief: Brief,
  consenso: RegistrazioneConsenso,
  destinatario: string,
): Mail {
  const dati = righeDelBrief(brief)
  const contatti = righeDiContatto(brief)
  const oggetto = `Brief · ${scelta('intervento', brief.intervento)} · ${nomeDelComune(brief.comune)}`

  const testo = [
    `BRIEF DAL SITO — ${site.nome}`,
    RIGA,
    '',
    testoElenco(dati),
    '',
    RIGA,
    'CONTATTI',
    '',
    testoElenco(contatti),
    '',
    ...(brief.note ? [RIGA, 'NOTE', '', brief.note, ''] : []),
    RIGA,
    'CONSENSO REGISTRATO',
    '',
    `Momento     ${consenso.quandoLeggibile}`,
    `            ${consenso.quando}`,
    `Versione    ${consenso.versione}`,
    `Pagina      ${consenso.pagina}`,
    `Testo       «${consenso.testo}»`,
    '',
    'Casella non pre-spuntata: il consenso è stato dato attivamente.',
    'L’indirizzo IP non è registrato (usato solo, in memoria, per il rate limit).',
    '',
  ].join('\n')

  const html = [
    INIZIO_HTML,
    occhiello(`Brief dal sito · ${site.nome}`),
    titolo(`${scelta('intervento', brief.intervento)} · ${nomeDelComune(brief.comune)}`),
    htmlElenco(dati),
    FILETTO,
    occhiello('Contatti'),
    htmlElenco(contatti),
    brief.note
      ? `${FILETTO}${occhiello('Note')}<div style="font-size:16px;color:#17171A">${capoversi(brief.note)}</div>`
      : '',
    FILETTO,
    occhiello('Consenso registrato'),
    piccolo(
      `<p style="margin:0 0 8px"><strong>${esc(consenso.quandoLeggibile)}</strong><br>` +
        `<code style="font-size:12px">${esc(consenso.quando)}</code></p>` +
        `<p style="margin:0 0 8px">Versione ${esc(consenso.versione)} · da ${esc(consenso.pagina)}</p>` +
        `<blockquote style="margin:0 0 8px;padding-left:12px;border-left:2px solid #DCD8D0">${esc(consenso.testo)}</blockquote>` +
        '<p style="margin:0">Casella non pre-spuntata: il consenso è stato dato attivamente. ' +
        'L’indirizzo IP non è registrato (usato solo, in memoria, per il rate limit).</p>',
    ),
    FINE_HTML,
  ].join('')

  return { a: destinatario, oggetto, testo, html, rispondiA: brief.email }
}

/* ---------- mail 2: la copia di cortesia ---------------------------------- */

/**
 * La copia a chi ha compilato: serve a due cose — dare la ricevuta di cosa ha
 * scritto, e mettergli in mano il numero di telefono nel momento in cui è più
 * disposto a usarlo.
 */
export function mailDiCortesia(brief: Brief, consenso: RegistrazioneConsenso): Mail {
  const dati = righeDelBrief(brief)
  const nomeSolo = brief.nome.split(' ')[0]

  const testo = [
    `Ciao ${nomeSolo},`,
    '',
    `abbiamo ricevuto il tuo brief. Lo leggiamo e ti ricontattiamo noi.`,
    `Se nel frattempo vuoi parlarne: ${site.telefono}.`,
    '',
    RIGA,
    'QUELLO CHE CI HAI SCRITTO',
    '',
    testoElenco(dati),
    ...(brief.note ? ['', 'Note', '', brief.note] : []),
    '',
    RIGA,
    '',
    `${site.nome} — ${site.qualifica}`,
    `${site.via}, ${site.cap} ${site.citta} (${site.provincia})`,
    site.telefono,
    '',
    `Consenso dato il ${consenso.quandoLeggibile}:`,
    `«${consenso.testo}»`,
    '',
    'Questa mail è la copia della richiesta che hai inviato dal sito.',
    '',
  ].join('\n')

  const html = [
    INIZIO_HTML,
    occhiello(`${site.nome} · ${site.qualifica}`),
    titolo('Abbiamo ricevuto il tuo brief.'),
    paragrafo('Lo leggiamo e ti ricontattiamo noi. Se nel frattempo vuoi parlarne:'),
    `<p style="margin:0 0 4px"><a href="tel:${esc(site.telefonoHref)}" style="font-size:20px;color:#2F4A42;text-decoration:none;font-weight:600">${esc(site.telefono)}</a></p>`,
    FILETTO,
    occhiello('Quello che ci hai scritto'),
    htmlElenco(dati),
    brief.note
      ? `${FILETTO}${occhiello('Note')}<div style="font-size:16px;color:#17171A">${capoversi(brief.note)}</div>`
      : '',
    FILETTO,
    piccolo(
      `<p style="margin:0 0 8px"><strong>${esc(site.nome)}</strong> — ${esc(site.qualifica)}<br>` +
        `${esc(site.via)}, ${esc(site.cap)} ${esc(site.citta)} (${esc(site.provincia)})<br>` +
        `${esc(site.telefono)}</p>` +
        `<p style="margin:0 0 8px">Consenso dato il ${esc(consenso.quandoLeggibile)}:<br>` +
        `<em>${esc(CONSENSO.testo)}</em></p>` +
        '<p style="margin:0">Questa mail è la copia della richiesta che hai inviato dal sito.</p>',
    ),
    FINE_HTML,
  ].join('')

  return {
    a: brief.email,
    oggetto: `Abbiamo ricevuto il tuo brief — ${site.nome}`,
    testo,
    html,
  }
}
