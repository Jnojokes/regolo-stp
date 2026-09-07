import Link from 'next/link'
import { menu, ctaPrimaria, site } from '@/lib/site'

/**
 * Barra di navigazione: 4 voci + una sola CTA.
 * Sotto `nav` (896 px) il menu diventa una scomparsa `<details>`: funziona
 * senza JavaScript e da tastiera (CLAUDE.md § Regole, 4 e 5).
 */
export function SiteHeader() {
  return (
    <header className="border-line bg-paper/90 sticky top-0 z-30 border-b backdrop-blur-sm">
      <div className="wrap nav:py-0 flex min-h-(--regolo-header-h) items-center justify-between gap-4 py-3">
        {/* Niente aria-label: sostituirebbe il testo visibile con uno diverso,
            e per chi usa il comando vocale il nome accessibile deve contenere
            quello che si legge. Il testo del link basta da solo. */}
        <Link href="/" className="logo-lockup">
          <span className="logo-name">{site.nome}</span>
          {/* Sotto i 480 px il sottotitolo manderebbe a capo il lockup e
              farebbe crescere una barra che è sticky: lì resta il solo nome. */}
          <span className="logo-qualifier hidden min-[30rem]:block">
            {site.qualifica} · {site.citta}
          </span>
        </Link>

        <nav aria-label="Principale" className="nav:block hidden">
          <ul className="text-small flex items-center gap-8">
            {menu.map((v) => (
              <li key={v.href}>
                <Link href={v.href} className="hover:text-accent-text">
                  {v.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href={ctaPrimaria.href} className="btn nav:inline-flex hidden">
          {ctaPrimaria.label}
        </Link>

        {/* Mobile: disclosure nativa, nessun JS */}
        <details className="menu-mobile nav:hidden">
          <summary>Menu</summary>
          <div className="border-line bg-paper absolute inset-x-0 top-full border-b">
            <nav aria-label="Principale, mobile" className="wrap py-6">
              <ul className="flex flex-col">
                {menu.map((v) => (
                  <li key={v.href} className="border-line border-b last:border-b-0">
                    <Link href={v.href} className="text-h3 block py-4">
                      {v.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={ctaPrimaria.href} className="btn mt-6 w-full justify-center">
                {ctaPrimaria.label}
              </Link>
              <a href={`tel:${site.telefonoHref}`} className="text-muted text-small mt-4 block">
                oppure chiama · {site.telefono}
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  )
}
