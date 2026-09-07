import type { Metadata } from 'next'
import { PaginaStub } from '@/components/PaginaStub'

/**
 * Pagina legale. Si scrive alla fase 7, dai template della skill
 * sito-seo-geo-legal, e resta noindex finché il titolare non l'ha approvata:
 * un footer che linka una pagina legale finta è peggio di non averla.
 */
export const metadata: Metadata = {
  title: 'Note legali',
  description:
    'Titolare ex art. 7 D.Lgs. 70/2003, dati del registro imprese, diritti sui contenuti, legge applicabile e foro.',
  robots: { index: false, follow: true },
}

export default function Pagina() {
  return (
    <PaginaStub
      fase="Legal · fase 7"
      titolo="Note legali"
      intento="Titolare ex art. 7 D.Lgs. 70/2003, dati del registro imprese, diritti sui contenuti, legge applicabile e foro."
      blocchi={[
        'Testo dai template della skill sito-seo-geo-legal',
        'Titolare del trattamento: ragione sociale, P.IVA, sede, contatto (bloccante, da cliente)',
        'Nessun segnaposto: un campo che manca si omette, non si inventa',
      ]}
    />
  )
}
