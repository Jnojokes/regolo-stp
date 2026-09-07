import type { Metadata } from 'next'
import { Brief } from '@/components/brief/Brief'
import { PaginaStub } from '@/components/PaginaStub'
import { interventoDaQuery } from '@/lib/brief/domande'

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'Studio REGOLO, Via Campiglione 2/E, Fermo. Telefono 0734 510329. Raccontaci il progetto in cinque domande.',
}

/**
 * Questa pagina legge `?intervento=` e quindi si renderizza a ogni richiesta.
 * È una scelta, non una dimenticanza: il passo 1 precompilato deve funzionare
 * **anche senza JavaScript**, e per farlo il valore va scelto sul server. Il
 * prezzo è la cache CDN su questa pagina — che non ha immagini, non fa
 * fetch e non è la pagina su cui si misura l'LCP.
 *
 * Le due home restano statiche: lì il brief non legge la query string, e lo
 * smistamento della home (fase 3) porta al servizio o qui.
 */
export default async function Contatti({
  searchParams,
}: {
  searchParams: Promise<{ intervento?: string | string[] }>
}) {
  const { intervento } = await searchParams

  return (
    <>
      <PaginaStub
        fase="Contatti"
        titolo="Cinque domande. Poi vi richiamiamo noi."
        intento="Il brief qualificato in versione completa. È l’unica azione che il sito deve ottenere."
        blocchi={[
          'Brief a 5 passi — qui sotto: funziona anche senza JavaScript',
          'Contatti diretti: telefono, email, PEC (da cliente)',
          'Dove siamo — mappa statica, nessun iframe di terzi',
          'Schema ProfessionalService + LocalBusiness',
        ]}
      />
      <Brief pagina="/contatti" interventoIniziale={interventoDaQuery(intervento)} />
    </>
  )
}
