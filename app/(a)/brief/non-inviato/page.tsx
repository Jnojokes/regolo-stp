import Link from 'next/link'
import type { Metadata } from 'next'
import { site } from '@/lib/site'

/**
 * Esito «non inviato», `noindex`.
 *
 * Ci arriva solo chi non ha JavaScript: con JS il form resta dov'è, con le
 * risposte al loro posto, e il messaggio compare in linea — perdere cinque
 * risposte per un errore di rete è il modo più sicuro di perdere il contatto
 * (DECISIONI.md, fase 2).
 *
 * La cosa più utile che questa pagina può fare è mettere il numero di telefono
 * dove si vede: il canale alternativo, non le scuse.
 */
export const metadata: Metadata = {
  title: 'Il brief non è partito',
  robots: { index: false, follow: false },
}

const SPIEGAZIONI = {
  'troppi-invii': {
    titolo: 'Aspetta qualche minuto.',
    testo:
      'Da questa connessione sono già partiti diversi brief di seguito. È una difesa contro gli invii automatici, non un giudizio: riprova fra qualche minuto, oppure chiama.',
  },
  dati: {
    titolo: 'Manca qualche risposta.',
    testo:
      'Una delle cinque domande è rimasta senza risposta, o un contatto non è nella forma giusta. Torna al brief e ricontrolla: i campi obbligatori sono segnati.',
  },
  tecnico: {
    titolo: 'È colpa nostra.',
    testo:
      'La richiesta non è arrivata allo studio per un problema tecnico. Riprova fra poco: se non funziona nemmeno la seconda volta, il telefono qui sotto funziona sempre.',
  },
} as const

type Motivo = keyof typeof SPIEGAZIONI

export default async function BriefNonInviato({
  searchParams,
}: {
  searchParams: Promise<{ motivo?: string }>
}) {
  const { motivo } = await searchParams
  // Quello che arriva dalla query string non si rimanda in pagina: si confronta
  // con l'elenco chiuso e il resto diventa «tecnico».
  const chiave: Motivo = motivo && motivo in SPIEGAZIONI ? (motivo as Motivo) : 'tecnico'
  const spiegazione = SPIEGAZIONI[chiave]

  return (
    <section className="wrap nav:py-32 py-20">
      <p className="eyebrow">Il brief non è partito</p>
      <h1 className="mt-4 max-w-[18ch]">{spiegazione.titolo}</h1>
      <p className="text-muted text-lead mt-6 max-w-[48ch]">{spiegazione.testo}</p>

      <div className="border-line mt-12 border-t pt-8">
        <p className="eyebrow">Chiama lo studio</p>
        <a
          href={`tel:${site.telefonoHref}`}
          className="text-h3 hover:text-accent-text mt-3 inline-block font-medium"
        >
          {site.telefono}
        </a>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/contatti#brief" className="btn">
          Torna al brief
        </Link>
        <Link href="/" className="btn btn-ghost">
          Torna alla home
        </Link>
      </div>
    </section>
  )
}
