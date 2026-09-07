import type { ReactNode } from 'react'
import { servizi } from '@/lib/servizi'

/**
 * Impalcatura di pagina: h1, una riga di intento, e l'elenco dichiarato di
 * cosa ci andrà. Serve a tenere la gerarchia e le URL corrette da subito;
 * i contenuti arrivano alle fasi 2-4. Nessun testo inventato del cliente.
 */
export function PaginaStub({
  titolo,
  intento,
  blocchi,
  fase,
  azione,
}: {
  titolo: string
  intento: string
  blocchi: string[]
  fase: string
  /**
   * Una CTA vera dentro una pagina che è ancora un'impalcatura. Serve alle
   * pagine dei servizi: lo smistamento della home promette di portare al
   * servizio **e** di precompilare il brief, e senza questa la catena si
   * interrompe sull'ultimo salto (CLAUDE.md § Homepage, blocco 2).
   */
  azione?: ReactNode
}) {
  return (
    <section className="wrap nav:py-24 py-16">
      <p className="eyebrow">{fase}</p>
      <h1 className="mt-4 max-w-[18ch]">{titolo}</h1>
      <p className="text-muted text-lead mt-6 max-w-[52ch]">{intento}</p>

      <h2 className="eyebrow mt-14">Cosa andrà in questa pagina</h2>
      <ol className="border-line mt-4 max-w-[62ch] border-t">
        {blocchi.map((b, i) => (
          <li key={b} className="border-line text-small flex gap-4 border-b py-3">
            <span className="text-muted font-mono tabular-nums">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ol>

      {azione && <div className="mt-10">{azione}</div>}
    </section>
  )
}

export const elencoServizi = servizi.map((s) => `${s.titolo} — ${s.sottotitolo}`)
