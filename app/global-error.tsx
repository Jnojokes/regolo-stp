'use client'

import './globals.css'

/**
 * Errore che rompe anche il root layout: deve portarsi <html> e <body>.
 * Nessun font e nessun componente: è la rete di sicurezza più esterna.
 */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="it" data-theme="a">
      <body className="flex min-h-dvh flex-col justify-center">
        <div className="wrap">
          <p className="eyebrow">Errore</p>
          <h1 className="mt-4 max-w-[18ch]">Il sito non è raggiungibile in questo momento.</h1>
          <p className="text-muted text-lead mt-6 max-w-[46ch]">
            Riprova fra un momento, oppure chiama lo studio allo 0734 510329.
          </p>
          <button type="button" onClick={reset} className="btn mt-10">
            Riprova
          </button>
        </div>
      </body>
    </html>
  )
}
