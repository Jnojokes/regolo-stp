import type { Metadata } from 'next'
import { BarraMobile } from '@/components/BarraMobile'
import { Documento } from '@/components/campo/Campo'
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
 * ## Fase 3 ter — che cosa distingue davvero questa pagina dalla A
 *
 * Non il colore, e non il corpo del display: quelli erano i due valori corretti
 * nelle passate precedenti, e non è bastato — misurato sul build, le due home
 * rendevano **123 classi CSS uguali su 165** e i due temi dichiaravano **42
 * token con lo stesso identico valore**, l'intero sistema di impaginazione
 * compreso.
 *
 * Adesso la differenza è **come funziona la pagina**: le sei righe della hero
 * sono i `radio` del passo 1 del brief (`form="brief-form"`), quindi scegliendo
 * si risponde davvero, e il brief in fondo comincia a «passo 2 di 5». Costa
 * zero byte di JavaScript, e A non lo può fare — non ha una domanda in hero,
 * non ha uno stato da propagare.
 *
 * `/opzione-b` è `noindex` (lo dichiara il layout in `app/(b)`): è una rotta di
 * proposta, non una pagina del sito.
 */
export default function OpzioneB() {
  return (
    <>
      <BarraProposta opzione="b" />
      {/* Il documento: **un foglio solo**, dipinto una volta da `<Documento>`
          con una banda verticale che comincia al 34,4 % e passa dietro tutti i
          campi. Non è una scelta estetica — è la ragione per cui in B non si
          può disegnare un nono foglio per distrazione: prima erano otto
          selettori elencati a mano in `globals.css`, cioè otto card. */}
      <Documento>
        <Hero variante="domanda" />
      </Documento>

      {/* FERMATA 1 — questi sei blocchi sono ancora quelli della fase 3 bis, e
          stanno **fuori** dal documento apposta. Il foglio è una banda di
          sfondo continua: se passasse dietro una `<Sezione>`, che impagina a
          piena larghezza, il titolo finirebbe sul bianco senza dichiarare il
          piano — cioè bianco su bianco (la trappola n. 2, verificata in pagina
          proprio così). Entrano nel documento alla fermata 2, uno alla volta,
          convertiti in `<Campo>`; e solo allora escono da `[data-theme='b']` i
          tre `--regolo-passo-*`, che è l'ultimo passo perché è quello che
          rompe in silenzio. */}
      <Numeri />
      <Servizi variante="percorsi" />
      <ComeLavoriamo variante="timeline" />
      <Progetti variante="dati" />
      <PrimaDopo />
      <Persone variante="b" />
      {/* Il brief sta **fuori** dal documento: davanti a lui c'è l'unico
          silenzio della pagina — 200 px di tavola — e in A ce ne sono quattro.
          `passo1Esterno`: la prima domanda l'ha già fatta la hero, e le sue sei
          righe sono i radio di questo form. */}
      <Brief pagina="/opzione-b" etichetta="il brief" passo1Esterno quotaForma="registro" />
      <BarraMobile />
    </>
  )
}
