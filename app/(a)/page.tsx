import type { Metadata } from 'next'
import { PaginaStub } from '@/components/PaginaStub'

export const metadata: Metadata = {
  description:
    'Studio di ingegneria civile e architettura a Fermo. Progettazione e direzione lavori su edifici nuovi ed esistenti, pubblici e privati.',
}

/** Home, opzione A. I tredici blocchi arrivano alla fase 3. */
export default function Home() {
  return (
    <PaginaStub
      fase="Home · opzione A «Lo studio»"
      titolo="Progettiamo e dirigiamo. Dal disegno al cantiere."
      intento="Vincere il confronto quando il nome è già sul tavolo, e portare a un brief qualificato."
      blocchi={[
        'Hero — foto di un’opera realizzata, payoff in due tempi, una sola CTA',
        'Smistamento a domanda — «Che intervento hai in mente?», 5 bottoni che precompilano il brief',
        'Numeri — anni · progetti · mq · comuni',
        'Progetti in evidenza — 3-4 schede con foto, tipo, anno, luogo',
        'Cosa facciamo — le 6 card dei servizi',
        'Come lavoriamo — 5 fasi con avanzamento allo scroll',
        'WOW 1 — esploso strutturale in SVG a livelli',
        'Prima / dopo — slider con clip-path da input range',
        'Le persone — ritratto, nome, ruolo, abilitazioni',
        'Testimonianze — 3, con nome e cognome, linkate al progetto',
        'Territorio — SVG della provincia con i comuni serviti',
        'Brief qualificato — il blocco più importante del sito',
        'Footer operativo',
      ]}
    />
  )
}
