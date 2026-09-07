import type { Metadata } from 'next'
import { PaginaStub } from '@/components/PaginaStub'

/**
 * Pagina legale. Si scrive alla fase 7, dai template della skill
 * sito-seo-geo-legal, e resta noindex finché il titolare non l'ha approvata:
 * un footer che linka una pagina legale finta è peggio di non averla.
 */
export const metadata: Metadata = {
  title: 'Cookie',
  description:
    'Quali cookie usa il sito, con nome, dominio, finalità e durata. L’analytics scelto è senza cookie: nessun banner.',
  robots: { index: false, follow: true },
}

export default function Pagina() {
  return (
    <PaginaStub
      fase="Legal · fase 7"
      titolo="Cookie policy"
      intento="Quali cookie usa il sito, con nome, dominio, finalità e durata. L’analytics scelto è senza cookie: nessun banner."
      blocchi={[
        'Testo dai template della skill sito-seo-geo-legal',
        'Titolare del trattamento: ragione sociale, P.IVA, sede, contatto (bloccante, da cliente)',
        'Nessun segnaposto: un campo che manca si omette, non si inventa',
      ]}
    />
  )
}
