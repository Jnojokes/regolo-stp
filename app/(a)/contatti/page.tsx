import type { Metadata } from 'next'
import { PaginaStub } from '@/components/PaginaStub'

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'Studio REGOLO, Via Campiglione 2/E, Fermo. Telefono 0734 510329. Raccontaci il progetto in cinque domande.',
}

export default function Contatti() {
  return (
    <PaginaStub
      fase="Contatti"
      titolo="Cinque domande. Poi vi richiamiamo noi."
      intento="Il brief qualificato in versione completa. È l’unica azione che il sito deve ottenere."
      blocchi={[
        'Brief a 5 passi — costruito alla fase 2, funziona anche senza JavaScript',
        'Contatti diretti: telefono, email, PEC (da cliente)',
        'Dove siamo — mappa statica, nessun iframe di terzi',
        'Schema ProfessionalService + LocalBusiness',
      ]}
    />
  )
}
