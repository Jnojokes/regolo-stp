import type { Metadata } from 'next'
import { PaginaStub } from '@/components/PaginaStub'

export const metadata: Metadata = {
  title: 'Studio',
  description:
    'Chi siamo, come lavoriamo e chi firma i progetti. Una società tra professionisti di ingegneria civile e architettura a Fermo.',
}

export default function Studio() {
  return (
    <PaginaStub
      fase="Studio"
      titolo="In una società tra professionisti si sceglie chi firma."
      intento="Le persone, il metodo, le abilitazioni. In una STP si compra la persona, non l’insegna."
      blocchi={[
        'Chi siamo — answer capsule dello studio',
        'Il metodo — le cinque fasi',
        'Le persone — ritratto, nome, ruolo, ordine, sezione e numero (da cliente)',
        'Iscrizioni e abilitazioni, anche nel JSON-LD come Person.hasCredential',
      ]}
    />
  )
}
