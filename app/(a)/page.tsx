import type { Metadata } from 'next'
import { BarraProposta } from '@/components/BarraProposta'
import { Brief } from '@/components/brief/Brief'
import { ComeLavoriamo } from '@/components/sezioni/ComeLavoriamo'
import { Esploso } from '@/components/sezioni/Esploso'
import { Hero } from '@/components/sezioni/Hero'
import { Persone } from '@/components/sezioni/Persone'
import { Progetti } from '@/components/sezioni/Progetti'
import { Servizi } from '@/components/sezioni/Servizi'
import { Smistamento } from '@/components/sezioni/Smistamento'
import { Territorio } from '@/components/sezioni/Territorio'

export const metadata: Metadata = {
  description:
    'Studio di ingegneria civile e architettura a Fermo. Progettazione e direzione lavori su edifici nuovi ed esistenti, pubblici e privati.',
}

/**
 * Home — opzione A «Lo studio».
 *
 * L'ordine è quello di CLAUDE.md § Due opzioni, e non è un elenco di blocchi
 * carini: è un argomento. Fotografia (so fare) → smistamento (dimmi cosa ti
 * serve) → progetti (l'ho già fatto) → servizi (in sei modi) → come lavoriamo
 * (e poi cosa succede?) → esploso (il mestiere che nelle foto non si vede) →
 * persone (chi firma) → territorio (qui, non «in tutta Italia») → brief.
 *
 * Le sezioni sono gli stessi componenti dell'opzione B: cambiano l'ordine, il
 * tema e la variante, non il codice. Alla decisione n. 1 una delle due rotte
 * si elimina e i componenti restano dove sono.
 *
 * Un solo blocco «wow» in questa pagina — l'esploso — e non è di fila a un
 * altro (CLAUDE.md § Regole, 7). In questa fase è fermo: il movimento arriva
 * alla fase 5.
 *
 * L'unico `h1` della pagina sta nella hero.
 */
export default function Home() {
  return (
    <>
      <BarraProposta opzione="a" />
      <Hero variante="foto" />
      <Smistamento />
      <Progetti variante="schede" />
      <Servizi variante="essenziale" />
      <ComeLavoriamo variante="elenco" />
      <Esploso />
      <Persone variante="a" />
      <Territorio />
      <Brief pagina="/" />
    </>
  )
}
