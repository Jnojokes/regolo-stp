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
 * | 2 | i numeri come **quote vere** con l'annotazione | `Numeri` |
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
 * B **non ha un registro sopra la piega**: l'invito porta al brief con
 * un'ancora, e il brief comincia da «passo 1 di 5». È diverso da A, che smista
 * con cinque bottoni che precompilano il passo 1, e da C, che non chiede niente
 * fino in fondo. Tre proposte, tre funnel, e
 * `scripts/collaudo/nojs-rotte.mjs` lo legge come numero.
 *
 * ## Il movimento
 *
 * Uno solo, e non è una rivelazione allo scorrimento: **le fasi sono pinnate**
 * — il pannello della tavola e il righello restano fermi mentre le fasi
 * passano. È `position: sticky`, cioè una posizione e non un'animazione:
 * funziona senza JavaScript, e con `prefers-reduced-motion: reduce` non c'è
 * niente da spegnere. L'unica cosa animata è quale disegno è acceso dentro il
 * pannello, e dove quel supporto manca resta acceso il primo, che è uno stato
 * finito.
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
      <BarraMobile />
    </>
  )
}
