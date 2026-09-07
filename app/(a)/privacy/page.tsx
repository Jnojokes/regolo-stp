import type { Metadata } from 'next'
import { PaginaStub } from '@/components/PaginaStub'

/**
 * Pagina legale. Si scrive alla fase 7, dai template della skill
 * sito-seo-geo-legal, e resta noindex finché il titolare non l'ha approvata:
 * un footer che linka una pagina legale finta è peggio di non averla.
 */
export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'Chi tratta i dati, quali, per quali finalità e con quale base giuridica; i diritti agli artt. 15-22 e il reclamo al Garante.',
  robots: { index: false, follow: true },
}

export default function Pagina() {
  return (
    <PaginaStub
      fase="Legal · fase 7"
      titolo="Informativa privacy"
      intento="Chi tratta i dati, quali, per quali finalità e con quale base giuridica; i diritti agli artt. 15-22 e il reclamo al Garante."
      blocchi={[
        'Testo dai template della skill sito-seo-geo-legal',
        'Titolare del trattamento: ragione sociale, P.IVA, sede, contatto (bloccante, da cliente)',
        'Nessun segnaposto: un campo che manca si omette, non si inventa',
      ]}
    />
  )
}
