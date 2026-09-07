import type { Metadata } from 'next'
import { PaginaStub } from '@/components/PaginaStub'

export const metadata: Metadata = {
  title: 'Homepage',
  description:
    'Proposta di homepage per REGOLO, variante «Il cantiere»: la domanda al posto dello slogan e i dati duri dei progetti in evidenza.',
}

/** Home, opzione B: stessi blocchi, altro ordine e altri token. */
export default function OpzioneB() {
  return (
    <PaginaStub
      fase="Home · opzione B «Il cantiere»"
      titolo="Che intervento hai in mente?"
      blocchi={[
        'Hero-domanda con percorso — la domanda al posto dello slogan, 5 percorsi',
        'Numeri — anni · progetti · mq · comuni',
        'Sei percorsi con «cosa serve da te»',
        'Come lavoriamo — timeline delle 5 fasi',
        'Progetti con i dati duri — luogo, anno, mq, ruolo dello studio',
        'WOW — prima / dopo',
        'Le persone',
        'Brief qualificato',
        'Footer operativo + barra CTA mobile',
      ]}
      intento="Stessa architettura dell’opzione A, altro ordine e altri token: si smista prima, si dimostra dopo."
    />
  )
}
