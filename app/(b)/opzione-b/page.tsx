import type { Metadata } from 'next'
import { BarraMobile } from '@/components/BarraMobile'
import { BarraProposta } from '@/components/BarraProposta'
import { Brief } from '@/components/brief/Brief'
import { ComeLavoriamo } from '@/components/sezioni/ComeLavoriamo'
import { Hero } from '@/components/sezioni/Hero'
import { Numeri } from '@/components/sezioni/Numeri'
import { Persone } from '@/components/sezioni/Persone'
import { PrimaDopo } from '@/components/sezioni/PrimaDopo'
import { Progetti } from '@/components/sezioni/Progetti'
import { Servizi } from '@/components/sezioni/Servizi'

export const metadata: Metadata = {
  title: 'Homepage',
  description:
    'Proposta di homepage per REGOLO, variante «Il cantiere»: la domanda al posto dello slogan e i dati duri dei progetti in evidenza.',
}

/**
 * Home — opzione B «Il cantiere».
 *
 * Stessa architettura dell'opzione A, altro ordine e altri token: **si smista
 * prima e si dimostra dopo**. La differenza non è di gusto. In A si conquista
 * con una fotografia e poi si chiede cosa serve; in B la prima cosa che la
 * pagina fa è una domanda, e tutto il resto è la risposta a quella domanda.
 *
 * Ordine di CLAUDE.md § Due opzioni: hero-domanda con i cinque percorsi →
 * numeri → sei percorsi con «serve da te» → come lavoriamo (timeline) →
 * progetti con i dati duri → prima/dopo → persone → brief → footer, più la
 * barra CTA fissa su mobile.
 *
 * Anche qui un solo blocco «wow»: il prima/dopo. È l'unico pezzo di tutta la
 * pagina che ha bisogno di JavaScript, e solo per muovere il taglio.
 *
 * `/opzione-b` è `noindex` (lo dichiara il layout in `app/(b)`): è una rotta di
 * proposta, non una pagina del sito.
 */
export default function OpzioneB() {
  return (
    <>
      <BarraProposta opzione="b" />
      <Hero variante="domanda" />
      <Numeri />
      <Servizi variante="percorsi" />
      <ComeLavoriamo variante="timeline" />
      <Progetti variante="dati" />
      <PrimaDopo />
      <Persone variante="b" />
      <Brief pagina="/opzione-b" etichetta="il brief" />
      <BarraMobile />
    </>
  )
}
