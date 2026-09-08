import type { Metadata } from 'next'
import { BarraMobile } from '@/components/BarraMobile'
import { BarraProposta } from '@/components/BarraProposta'
import { Brief } from '@/components/brief/Brief'
import {
  Copertina,
  Fasi,
  Galleria,
  Invito,
  Numeri,
  Opere,
  Persone,
} from '@/components/ecolinear/Blocchi'

export const metadata: Metadata = {
  title: 'Homepage',
  description:
    'Proposta di homepage per REGOLO, variante «ecoLINEAR»: la pagina è un foglio da disegno tecnico, con le fasi del metodo pinnate accanto alla tavola.',
}

/**
 * Home — opzione B «ecoLINEAR», dal sito che il committente ha indicato per
 * nome: *«l'opzione 2 la voglio identica a questo sito»*,
 * `https://ecolinearstudio.com/`.
 *
 * Il sito è stato **catturato e misurato nel browser** con Playwright — non
 * descritto: `kit/reference/ecolinear/` ha sei schermate a 1440 e due a 390, e
 * `SCHEDA.md` la tabella dei valori (famiglie, corpi, interlinee, tracciature,
 * colori, raggi, ombre, contati sui nodi di testo veri).
 *
 * ## L'impianto, e perché non è quello di A
 *
 * `CLAUDE.md` § Homepage descrive l'ordine dei blocchi di **A**. Qui l'ordine è
 * quello della reference, ed è una **deviazione dichiarata**:
 *
 * | | ecoLINEAR, misurato | qui |
 * |---|---|---|
 * | 1 | il foglio: griglia di costruzione, disegni a filo, il marchio grande | `Copertina` |
 * | 2 | i numeri come **quote su un volume** assonometrico | `Numeri` |
 * | 3 | l'invito **prima** della galleria | `Invito` |
 * | 4 | la galleria a **colonne sfalsate**, rapporti misti | `Galleria` |
 * | 5 | i servizi come **fasi pinnate** accanto alla tavola | `Fasi` |
 * | 6 | le tre opere in evidenza | `Opere` |
 * | 7 | chi firma | `Persone` |
 *
 * **L'invito prima della galleria** non è una svista: è l'impianto misurato di
 * ecoLINEAR, e `CLAUDE.md` § Le tre opzioni lo registrava già come il suo
 * contributo. Chi arriva su un sito che è il *secondo* contatto ha già deciso
 * di guardare: la domanda gli si fa prima di fargli scorrere ventisette
 * fotografie, non dopo.
 *
 * ## Il funnel
 *
 * B **non ha un registro a cinque bottoni sopra la piega** come A: l'azione
 * primaria della copertina è una sola, ed è un'**annotazione di quota** in
 * basso a destra del logotipo che porta a `#brief`. Poi l'invito, prima della
 * galleria, che è l'impianto misurato della reference. Il brief comincia da
 * «passo 1 di 5». Tre proposte, tre funnel, e
 * `scripts/collaudo/nojs-rotte.mjs` lo legge come numero.
 *
 * ## I due wow, e non sono di fila
 *
 * 1. **il volume dei numeri** (posizione 2): un'assonometria a filo con le
 *    quattro cifre appese come quote vere. Si rende come SVG dal server — che è
 *    il disegno finito — e sopra, se il browser ce la fa, un `<canvas>` in
 *    WebGL grezzo che gira di pochi gradi con lo scorrimento;
 * 2. **il plotter delle fasi** (posizione 5): il pannello e il righello sono
 *    `position: sticky`, cioè una posizione e non un'animazione, e la tavola
 *    dentro il pannello non compare in dissolvenza — viene **tracciata**, da una
 *    maschera che trasla con un mirino d'ambra sul bordo d'attacco.
 *
 * Fra i due ci sono tre blocchi, quindi la regola dei due wow «mai di fila»
 * (`CLAUDE.md` § Regole, 3) è rispettata.
 *
 * Tutti e due degradano allo stato **finito** e non a quello vuoto: senza
 * JavaScript, senza `animation-timeline` e con `prefers-reduced-motion: reduce`
 * restano il volume in SVG e la prima tavola intera.
 */
export default function OpzioneB() {
  return (
    <>
      <BarraProposta opzione="b" />
      <Copertina />
      <Numeri />
      <Invito />
      <Galleria />
      <Fasi />
      <Opere />
      <Persone />
      {/* Nessun `passo1Esterno`: in B il brief comincia dall'inizio. */}
      <Brief pagina="/opzione-b" etichetta="il brief" />
      <BarraMobile segnaposto="riempimento" href="#brief" />
    </>
  )
}
