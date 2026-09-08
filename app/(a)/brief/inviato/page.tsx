import Link from 'next/link'
import type { Metadata } from 'next'
import { site } from '@/lib/site'

/**
 * Esito «inviato». `noindex`: è una pagina di passaggio, non una pagina del
 * sito, e in un motore di ricerca non ci deve stare.
 *
 * Ci arrivano entrambi i percorsi: senza JavaScript col 303 del route handler,
 * con JavaScript con una `push` dopo la fetch.
 *
 * Cosa NON c'è: nessun «ti rispondiamo entro N ore». Quanto tempo passa prima
 * della telefonata lo decide lo studio, e CLAUDE.md § Obiettivo vieta di
 * promettere tempi. Quello che si può dire con certezza è che il brief è
 * arrivato e che il telefono è questo.
 */
export const metadata: Metadata = {
  title: 'Il brief è arrivato',
  robots: { index: false, follow: false },
}

export default async function BriefInviato({
  searchParams,
}: {
  searchParams: Promise<{ copia?: string }>
}) {
  const { copia } = await searchParams
  const copiaPartita = copia !== 'no'

  return (
    <section className="wrap nav:py-32 py-20">
      <p className="eyebrow">Brief ricevuto</p>
      <h1 className="mt-4 max-w-[18ch]">Il brief è arrivato.</h1>
      <p className="text-muted text-lead mt-6 max-w-[48ch]">
        Lo leggiamo con calma e ti ricontattiamo noi. La prima telefonata parte già dal punto
        giusto: è esattamente a questo che serviva rispondere a cinque domande.
      </p>

      <p className="text-small mt-8 max-w-[48ch]">
        {copiaPartita ? (
          <>
            Ti abbiamo mandato una copia del brief all’indirizzo che ci hai lasciato. Se non la
            trovi, guarda fra la posta indesiderata.
          </>
        ) : (
          <>
            Non siamo riusciti a mandarti la copia per email: controlla che l’indirizzo fosse
            giusto. Il brief allo studio però è arrivato.
          </>
        )}
      </p>

      <div className="border-line mt-12 border-t pt-8">
        <p className="eyebrow">Se preferisci parlarne subito</p>
        <a
          href={`tel:${site.telefonoHref}`}
          className="text-h3 mt-3 inline-block font-medium hover:underline"
        >
          {site.telefono}
        </a>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link href="/progetti" className="btn">
          Guarda i progetti
        </Link>
        <Link href="/" className="btn btn-ghost">
          Torna alla home
        </Link>
      </div>
    </section>
  )
}
