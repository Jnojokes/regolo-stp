import type { Metadata } from 'next'
import { BarraMobile } from '@/components/BarraMobile'
import { BarraProposta } from '@/components/BarraProposta'
import { Brief } from '@/components/brief/Brief'
import {
  Banda,
  Colophon,
  Frontespizio,
  Metodo,
  PrimaDopo,
  Ritratti,
  Sommario,
  Tavole,
} from '@/components/monografia/Blocchi'
import { Copertina } from '@/components/monografia/Copertina'
import { Fascicolo } from '@/components/monografia/Segnatura'

export const metadata: Metadata = {
  title: 'Homepage',
  description:
    'Proposta di homepage per REGOLO, variante «La monografia»: un fascicolo stampato — frontespizio, indice, tavole con i dati duri, colophon.',
}

/**
 * Home — opzione D «La monografia».
 *
 * ## Perché non si chiama più «La casa»
 *
 * Il committente ha chiesto *«uno più istituzionale editorial artigiano
 * architetto»*, e quel nome descriveva la reference, non la proposta. **Storey
 * resta la reference dei valori misurati** — interlinea stretta, spaziatura
 * negativa anche sul maiuscolo, vuoto disuguale, immagine che sborda da un lato,
 * contatore tono su tono, schedina a righe — ma non del tono: Storey è minimale
 * e quieta. Il tono è la **monografia stampata**, e da lì vengono le cose che
 * nessun'altra proposta ha: il **frontespizio** col masthead allargato, il
 * **folio** al margine esterno, l'occhiello corrente, le figure numerate
 * `fig. 03`, il **colophon** con una riga scritta a mano.
 *
 * ## Il meccanismo: **la stampa**
 *
 * In D non si muove niente, ed è la differenza da C, dove lo scorrimento *è* il
 * meccanismo (`DECISIONI.md` n. 40). Una sola eccezione, e **ripara un
 * difetto**: il prima/dopo, che senza JavaScript resterebbe fermo a metà perché
 * il cursore non viene reso. Nessuna rivelazione allo scorrimento: è il pattern
 * di movimento più generato che esista, e chiamarlo diversamente non lo cambia.
 *
 * ## Il funnel di D è l'indice, e fa partire il brief da «passo 2 di 5»
 *
 * Le sei voci del sommario sono `radio` con `form="brief-form"`: sono membri del
 * form che sta in fondo alla pagina, quindi la risposta arriva **senza una riga
 * di JavaScript**. È il gesto che A non ha per costruzione, e che C non ha per
 * scelta — C vende con le fotografie e non chiede niente sopra la piega. Tre
 * proposte, tre funnel, e `scripts/collaudo/nojs-rotte.mjs` lo legge come
 * numero.
 *
 * ## L'ordine è quello di un libro, non di una home
 *
 * copertina → frontespizio → indice → tre tavole → metodo → banda →
 * prima/dopo → ritratti → colophon → brief. Deviazione dichiarata da
 * `CLAUDE.md` § Homepage: escono la tabella dei sei servizi, i numeri e il
 * territorio. I numeri stanno a C, dove sono quattro cifre ai due estremi di
 * quattro righe; qui i dati duri sono **nelle tavole**, che è dove un
 * monografico li mette.
 */
export default function OpzioneD() {
  return (
    <>
      <BarraProposta opzione="d" />
      <Copertina />
      <Fascicolo>
        <Frontespizio />
        <Sommario />
        <Tavole />
        <Metodo />
        <Banda />
        <PrimaDopo />
        <Ritratti />
        <Colophon />
      </Fascicolo>
      {/* `passo1Esterno`: il passo 1 è l'indice, e il brief comincia dal 2. */}
      <Brief pagina="/opzione-d" etichetta="il brief" passo1Esterno />
      <BarraMobile />
    </>
  )
}
