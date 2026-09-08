import type { Metadata } from 'next'
import { BarraMobile } from '@/components/BarraMobile'
import { BarraProposta } from '@/components/BarraProposta'
import { Brief } from '@/components/brief/Brief'
import { Documento } from '@/components/campo/Campo'
import { Lastra, Parola } from '@/components/campo/Rottura'
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
    'Proposta di homepage per REGOLO, variante «La parete»: parete d’esposizione su carbone, due parole colossali e la fotografia a piena finestra.',
}

/**
 * Home — opzione C «La parete», dal sistema di **Iad-lab**.
 *
 * *«Iad-lab operates as a digital exhibition wall rather than a conventional
 * website: a near-black canvas interrupted by full-bleed photographic panels
 * and two colossal display words that bleed past the viewport edges.»*
 *
 * Il **contenuto e l'ordine dei blocchi sono identici a quelli di B**, ed è
 * voluto: tre proposte con lo stesso contenuto isolano la sola variabile che
 * il cliente deve giudicare, cioè la lingua visiva. Quello che cambia è come
 * la pagina si compone — qui in **sezioni a piena finestra** che alternano
 * parola, testo breve e fotografia, con la fotografia che è **l'unica sorgente
 * di colore** di tutto il sistema.
 *
 * Le due parole colossali sono `DISEGNO` e `CANTIERE`: non sono copy nuovo,
 * sono le due metà del payoff approvato («dal disegno al cantiere») e i nomi di
 * due delle cinque fasi in `lib/processo.ts`. A questa scala una parola sola
 * per schermata è il massimo che ci sta, ed è il punto.
 *
 * Il meccanismo di B non si tocca: la hero è il passo 1 del brief, la scelta si
 * propaga, tutto senza JavaScript.
 */
export default function OpzioneC() {
  return (
    <>
      <BarraProposta opzione="c" />
      <Documento>
        {/* La pagina **apre con la parola**, come la reference: «the two program
            words are each given their own full-viewport section with the text
            bleeding past the edges». È la prima schermata, e non c'è altro
            dentro — poi arriva la domanda, che è il meccanismo. */}
        <Parola sopra="[01 · il progetto]" sotto="fattibilità · progetto · autorizzazioni">
          DISEGNO
        </Parola>
        <Hero variante="domanda" />
        <Numeri />
        <Servizi variante="tabella" />
        <Lastra
          label="Fotografia di un’opera realizzata — dallo studio, non un render"
          demo="opera-01"
          nota="[la parete: la fotografia è l’unica sorgente di colore del sistema]"
        />
        <ComeLavoriamo variante="sequenza" />
        <Progetti variante="dati" />
        <Parola sopra="[02 · il cantiere]" sotto="direzione lavori · sicurezza · collaudo">
          CANTIERE
        </Parola>
        <PrimaDopo />
        <Persone variante="registro" />
      </Documento>
      <Brief pagina="/opzione-c" etichetta="il brief" passo1Esterno quotaForma="registro" />
      <BarraMobile />
    </>
  )
}
