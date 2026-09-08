import type { Metadata } from 'next'
import { BarraMobile } from '@/components/BarraMobile'
import { BarraProposta } from '@/components/BarraProposta'
import { Brief } from '@/components/brief/Brief'
import { Documento } from '@/components/campo/Campo'
import { Lastra } from '@/components/campo/Rottura'
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
    'Proposta di homepage per REGOLO, variante «Il marmo»: masthead editoriale su bianco, corpo in serif e accenti come tratti di matita.',
}

/**
 * Home — opzione D «Il marmo», dal sistema di **IDHEAL**.
 *
 * *«A stark white canvas where massive black sans-serif display type dominates
 * the top of the page like a masthead, paired with full-bleed architectural
 * photography… chromatic color appears almost exclusively as thin outline
 * strokes, creating the effect of colored pencil marks on a white page.»*
 *
 * Contenuto e ordine dei blocchi identici a B e C. Quello che la distingue si
 * legge in due righe di testo, non in un colore: **è l'unica proposta in cui il
 * corpo è un serif**, e la tensione fra il lineare industriale dei titoli e il
 * serif letterario del testo è tutta la sua identità — *«industrial sans for
 * headlines, literary serif for reading»*.
 *
 * L'impaginazione è una doppia pagina di rivista: masthead a 105 px, poi
 * **subito** una fotografia grande, poi blocchi asimmetrici a densità compatta
 * (passo di sezione 30 px, non 96). *«Gallery-wall rhythm rather than a
 * marketing-page rhythm.»*
 */
export default function OpzioneD() {
  return (
    <>
      <BarraProposta opzione="d" />
      <Documento>
        <Hero variante="domanda" />
        {/* «A full-bleed masthead with massive display type anchors the top,
            followed **immediately** by a large architectural photograph.» */}
        <Lastra
          label="Fotografia di un’opera realizzata — dallo studio, non un render"
          demo="opera-01"
          nota="Fotografia a piena larghezza, senza cornice e senza raggio: l’architettura è il contenuto."
        />
        <Numeri />
        <Servizi variante="tabella" />
        <ComeLavoriamo variante="sequenza" />
        <Progetti variante="dati" />
        <PrimaDopo />
        <Persone variante="registro" />
      </Documento>
      <Brief pagina="/opzione-d" etichetta="il brief" passo1Esterno quotaForma="registro" />
      <BarraMobile />
    </>
  )
}
