import type { Metadata } from 'next'
import { BarraMobile } from '@/components/BarraMobile'
import { BarraProposta, titoloProposta } from '@/components/BarraProposta'
import { Brief } from '@/components/brief/Brief'
import {
  Bande,
  Citazione,
  Copertina,
  Metodo,
  Numeri,
  Persone,
  Progetti,
  Servizi,
} from '@/components/halston/Blocchi'

/* Titolo e descrizione finiscono nell'anteprima del link quando lo si manda al
   cliente (DECISIONI.md n. 55), quindi dicono il **meccanismo** e non la
   reference: «Halston» lì sarebbe il nome di un template (n. 52). */
export const metadata: Metadata = {
  title: { absolute: titoloProposta('c') },
  description:
    'Proposta di homepage per REGOLO, opzione C «le bande»: bande a piena larghezza che cambiano superficie, tutto in maiuscolo, i valori in monospace.',
}

/**
 * Home — opzione C «Halston», dal sito che il committente ha indicato per nome:
 * *«l'opzione 3 la voglio identica a questo sito»*,
 * `https://halston-architecture-template.webflow.io/`.
 *
 * Catturato e **misurato nel browser** con Playwright:
 * `kit/reference/halston/` ha sei schermate a 1440 e due a 390, e `SCHEDA.md`
 * la tabella dei valori contati sui nodi di testo veri.
 *
 * ## L'impianto, e perché non è quello di A né quello di B
 *
 * `CLAUDE.md` § Homepage descrive l'ordine dei blocchi di **A**; qui l'ordine è
 * quello della reference, ed è una **deviazione dichiarata**:
 *
 * | | Halston, misurato | qui |
 * |---|---|---|
 * | 1 | la barra di contenuto e il media a piena finestra | `Copertina` |
 * | 2 | due bande **due-up alternate** che cambiano fondo | `Bande` |
 * | 3 | la citazione a **due toni** col ritratto all'estremo | `Citazione` |
 * | 4 | i servizi come **righe su banda scura**, valore in mono | `Servizi` |
 * | 5 | i numeri in celle sulla banda | `Numeri` |
 * | 6 | i progetti, una banda per opera | `Progetti` |
 * | 7 | il metodo, righe su carta | `Metodo` |
 * | 8 | chi firma | `Persone` |
 *
 * **Il ritmo lo fa il colore.** A separa le sezioni col vuoto (tre passi
 * dichiarati); B tiene la composizione con una griglia di costruzione
 * tratteggiata; qui i blocchi **si toccano** e cambiano superficie — carta,
 * granata, mauve, banda scura, carta. Misurato: nessun `max-width`, margine
 * 20 px, zero ombre, raggio 3 px, e 270 occorrenze di maiuscolo.
 *
 * ## Il funnel
 *
 * C **non chiede niente fino in fondo**: nessun registro sopra la piega,
 * nessuna domanda a metà pagina. Il bottone della copertina porta al brief con
 * un'ancora e il brief comincia da «passo 1 di 5». È la terza forma delle tre:
 * A smista con cinque bottoni che precompilano il passo 1, B mette l'invito
 * prima della galleria, C vende con le bande e chiede alla fine.
 *
 * ## Il movimento — e la riga di scheda che era sbagliata
 *
 * Fino all'08/09 questo file diceva *«nessuno: quella pagina non ha un gesto di
 * scorrimento»*. **È falso, ed è stata una lettura mancata, non una scelta.**
 * Rimisurata: Halston carica **gsap + ScrollTrigger + Lenis** e ha **205
 * elementi a `opacity: 0`** prima dello scorrimento, che scendono a **78** dopo
 * aver percorso la pagina — tanto che la prima cattura a 390 uscì vuota proprio
 * per questo. La rivelazione allo scorrimento **è** il suo sistema.
 *
 * Quindi qui ci sono tre cose, tutte in CSS e tutte a zero KB:
 *
 * 1. **il momento orchestrato** — la banda granata che *invade* la carta al
 *    passaggio della piega (`Bande`, blocchi 3-4): una superficie che sale in
 *    solo `transform`, guidata dalla `view-timeline` della banda;
 * 2. **il secondo wow** — il filetto spezzato della copertina (blocco 2) che si
 *    ricompone: i due tronconi si chiudono e diventano una riga sola, che è la
 *    sua versione a 390. I due non sono di fila;
 * 3. **la rivelazione, che è sistema e non wow** — teste di banda e righe dei
 *    servizi entrano con `opacity` e 16 px di `translateY`, dove la reference
 *    ce l'ha. **Al contrario della reference**, però: lo stato di riposo è il
 *    contenuto *già visibile*, perché su Halston senza JavaScript metà pagina
 *    resta a `opacity: 0` e la regola 4 di casa lo vieta.
 *
 * Tutto sta in `app/css/halston.css`, dentro un `@supports` e un
 * `@media (prefers-reduced-motion: no-preference)` **esplicito**: la regola
 * globale azzera `animation-duration`, e su una timeline di scorrimento la
 * durata è ignorata.
 */
export default function OpzioneC() {
  return (
    <>
      <BarraProposta opzione="c" />
      <Copertina />
      <Bande />
      <Citazione />
      <Servizi />
      <Numeri />
      <Progetti />
      <Metodo />
      <Persone />
      {/* Nessun `passo1Esterno`: in C il brief comincia dall'inizio. */}
      <Brief pagina="/opzione-c" etichetta="il brief" />
      <BarraMobile segnaposto="riempimento" href="#brief" />
    </>
  )
}
