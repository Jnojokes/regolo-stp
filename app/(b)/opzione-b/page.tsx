import type { Metadata } from 'next'
import { BarraMobile } from '@/components/BarraMobile'
import { BarraProposta } from '@/components/BarraProposta'
import { Brief } from '@/components/brief/Brief'
import { Cifre, Dichiarazione, Firme, Metodo, Opere } from '@/components/fonderia/Blocchi'
import { Getto } from '@/components/fonderia/Colata'
import { Volume } from '@/components/fonderia/Volume'
import { HeroFonderia } from '@/components/sezioni/HeroFonderia'

export const metadata: Metadata = {
  title: 'Homepage',
  description:
    'Proposta di homepage per REGOLO, variante «La fonderia»: la fotografia è una scheggia che si apre scorrendo, e il vuoto è la struttura.',
}

/**
 * Home — opzione B «La fonderia», dal sistema di **Studio Foundry**
 * (`kit/reference/studio-foundry/`, guardato).
 *
 * ## Il meccanismo: **lo scorrimento**
 *
 * Ogni proposta ha il suo, e sono tre cose diverse (`DECISIONI.md` n. 40):
 *
 * - **A** è un foglio stampato: non si muove, dichiara;
 * - **C** cola: la fotografia è una scheggia che si apre, una lastra per
 *   finestra, il volume che si separa, il testo del metodo che entra. Il
 *   movimento **porta contenuto**, non lo decora;
 * - **D** è un fascicolo rilegato: non si muove niente.
 *
 * ## Il funnel di C è diverso, e non per caso
 *
 * *«L'impianto del funnel tra le diverse opzioni può essere diverso comunque.»*
 * Il registro delle sei righe — il meccanismo nato per B, che precompilava il
 * passo 1 del brief senza una riga di JavaScript — **esce da C**. C vende con
 * le fotografie e non chiede niente sopra la piega, che è quello che fa la
 * reference: `1440-hero.jpeg` non ha CTA, non ha occhiello, non ha numeri.
 * Il brief parte da «passo 1 di 5».
 *
 * Il registro resta a **D**, dove diventa l'indice del monografico. Così i tre
 * funnel sono tre, e `scripts/collaudo/nojs-rotte.mjs` lo legge come numero: A
 * e C «passo 1 di 5», D «passo 2 di 5».
 *
 * ## L'ordine, e il perché di ognuno
 *
 * copertina → dichiarazione → cifre → tre opere → metodo → volume → firme →
 * brief. Non è l'ordine di `CLAUDE.md` § Homepage e la deviazione è dichiarata:
 * escono la tabella dei sei servizi, il prima/dopo (va a D) e il territorio,
 * perché portavano 2.400 caratteri per dire cose che una proposta con «molto
 * meno copy e più media» non deve dire in home.
 *
 * **Due blocchi wow, non adiacenti** (`CLAUDE.md` § Regole, 3): la colata in
 * copertina e il volume a metà pagina. Fra loro ci sono quattro colate.
 */
export default function OpzioneC() {
  return (
    <>
      <BarraProposta opzione="b" />
      {/* La pagina apre su **carta**, con una scheggia di fotografia in mezzo
          che si apre mentre si scorre. Il perché — e l'errore che ripara — sta
          in `components/sezioni/HeroFonderia.tsx`. */}
      <HeroFonderia />
      <Getto>
        <Dichiarazione />
        <Cifre />
        <Opere />
        <Metodo />
        <Volume />
        <Firme />
      </Getto>
      {/* Nessun `passo1Esterno`: in C il brief comincia dall'inizio. */}
      <Brief pagina="/opzione-b" etichetta="il brief" />
      <BarraMobile />
    </>
  )
}
