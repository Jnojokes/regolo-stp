import type { Metadata } from 'next'
import { PaginaStub } from '@/components/PaginaStub'

export const metadata: Metadata = {
  title: 'Progetti',
  description:
    'I lavori dello studio: edifici nuovi, recuperi, strutture e opere pubbliche, con luogo, anno, superficie e ruolo dello studio.',
}

export default function Progetti() {
  return (
    <PaginaStub
      fase="Indice"
      titolo="Quello che abbiamo costruito."
      intento="Indice filtrabile. I filtri sono query string, non stato JS: indicizzabili e condivisibili."
      blocchi={[
        'Griglia dei progetti con contatore per categoria',
        'Filtri per tipo di intervento e per comune, come ?tipo= e ?comune=',
        'Ogni scheda: foto, tipo, anno, luogo',
        'I progetti arrivano dal cliente: 6-10, con almeno una foto ciascuno',
      ]}
    />
  )
}
