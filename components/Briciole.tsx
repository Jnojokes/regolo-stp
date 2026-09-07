import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { DaCliente } from '@/components/Placeholder'
import { eSegnaposto } from '@/lib/site'

/**
 * Le briciole di pane (prompt della fase 4: «ogni pagina: […] breadcrumb»).
 *
 * Servono a due lettori diversi e nello stesso markup:
 *  — a chi arriva da una ricerca su una pagina interna, che deve capire in un
 *    colpo d'occhio dove è finito e come si sale;
 *  — al motore di ricerca, con il `BreadcrumbList` che disegna il percorso
 *    sotto il titolo nei risultati.
 *
 * L'ultima voce **non è un link**: è la pagina in cui si è già. Un link a sé
 * stessa è un bersaglio che non fa niente, e in una lista di navigazione è
 * anche una bugia sulla struttura. Porta `aria-current="page"`.
 *
 * L'URL assoluto nel JSON-LD ha bisogno del dominio, che è la decisione n. 2 e
 * oggi non c'è: senza `NEXT_PUBLIC_SITE_URL` il `BreadcrumbList` **non si
 * emette** invece di emetterlo con URL relativi o inventati. Le briciole
 * visibili ci sono comunque — e sono quelle che servono a una persona.
 */

export type Briciola = { href: string; label: string }

export function Briciole({ percorso }: { percorso: readonly Briciola[] }) {
  const voci: Briciola[] = [{ href: '/', label: 'Home' }, ...percorso]
  const origine = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')

  return (
    <>
      <nav aria-label="Dove sei" className="briciole">
        {/* `role="list"`: `.briciole ol` ha `list-style: none`, e con quello
            Safari toglie anche la semantica di lista. */}
        <ol role="list">
          {voci.map((v, i) => {
            const ultima = i === voci.length - 1
            return (
              <li key={v.href}>
                {ultima ? (
                  <span aria-current="page">
                    {/* L'ultima voce è il nome della pagina, e su una scheda
                        progetto quel nome è ancora un segnaposto: si deve
                        vedere come si vede in tutto il resto del sito. */}
                    {eSegnaposto(v.label) ? <DaCliente>{v.label}</DaCliente> : v.label}
                  </span>
                ) : (
                  <Link href={v.href}>{v.label}</Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {origine && (
        <JsonLd
          dati={{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: voci.map((v, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: v.label,
              item: `${origine}${v.href}`,
            })),
          }}
        />
      )}
    </>
  )
}
