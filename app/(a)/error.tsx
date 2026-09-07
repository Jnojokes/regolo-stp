'use client'

import Link from 'next/link'
import { site } from '@/lib/site'

export default function Errore({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="wrap nav:py-32 py-20">
      <p className="eyebrow">Errore</p>
      <h1 className="mt-4 max-w-[18ch]">Qualcosa non ha funzionato.</h1>
      <p className="text-muted text-lead mt-6 max-w-[46ch]">
        Riprova fra un momento. Se serve subito, il telefono funziona sempre:{' '}
        <a href={`tel:${site.telefonoHref}`} className="text-accent-text underline">
          {site.telefono}
        </a>
        .
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <button type="button" onClick={reset} className="btn">
          Riprova
        </button>
        <Link href="/" className="btn btn-ghost">
          Torna alla home
        </Link>
      </div>
    </section>
  )
}
