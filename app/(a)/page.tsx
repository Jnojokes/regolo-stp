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
import { JsonLd } from '@/components/JsonLd'
import { nodoStudio } from '@/lib/seo/studio'

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
 * I **due** blocchi wow, e non sono di fila (CLAUDE.md § Regole, 3): la
 * hero-oggetto in posizione 1 — l'assonometria bianca su bianca al posto della
 * fotografia, gesto di AIR misurato — e l'esploso in posizione 6, che alla
 * ripassata di design si separa allo scorrimento in CSS puro. Fra i due ci sono
 * quattro sezioni ferme.
 *
 * Le otto sezioni si dividono in **quattro famiglie di impaginazione** e non
 * due, e nessuna è due volte di fila: la tabella sta in `app/css/sezioni.css`
 * (§ Le famiglie di impaginazione). Prima erano quattro `.testa-sezione`
 * consecutive.
 *
 * L'unico `h1` della pagina sta nella hero.
 */
export default function Home() {
  return (
    <>
      {/* `CLAUDE.md` § SEO: `ProfessionalService` + `LocalBusiness` su **home e
          contatti**. La home era l'unica delle otto rotte senza nessun nodo —
          e proprio quella che il capitolato nomina per prima. Il `description`
          è la stessa frase del `metadata` qui sopra, non un testo nuovo: due
          descrizioni diverse della stessa pagina sono un dato che diverge. */}
      <JsonLd dati={nodoStudio(metadata.description as string)} />
      <BarraProposta opzione="a" />
      {/* Il ritmo di A: **quattro silenzi da 200 px** e due tagli netti verso il
          nero. Il passo lo dichiara il blocco che *arriva*, non quello che
          finisce — lo spazio fra due blocchi appartiene al secondo — quindi la
          sequenza è di nove valori e non di diciotto, e si legge qui:
          hero 0 · smistamento 48 · progetti 200 · servizi 96 · fasi 96 ·
          esploso 200 · persone 200 · territorio 48 · brief 200 · footer 0.
          A respira per passi dichiarati; le altre due proposte non hanno un
          ritmo verticale — C mette una lastra per finestra e vuoto in mezzo, D
          impagina pagine di fascicolo — ed è una differenza di meccanismo, non
          di spaziatura. */}
      <Hero />
      <Smistamento />
      <Progetti />
      <Servizi />
      <ComeLavoriamo />
      <Esploso />
      <Persone />
      <Territorio />
      <Brief pagina="/" />
    </>
  )
}
