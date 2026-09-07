import Link from 'next/link'
import { legal, menu, site } from '@/lib/site'
import { DaCliente, Placeholder } from '@/components/Placeholder'

/**
 * Footer operativo (catalogo blocchi G1): nei servizi professionali è la
 * pagina contatti che nessuno chiama così.
 * In pagina ci sono SOLO i dati confermati; email, PEC, P.IVA e orari sono
 * segnaposto dichiarati — nessuno di questi può andare online
 * (CONTENUTI-DA-CLIENTE.md, bloccanti).
 */
export function SiteFooter() {
  return (
    <footer className="border-line bg-paper border-t">
      <div className="wrap nav:grid-cols-12 nav:gap-8 grid gap-10 py-14">
        <div className="nav:col-span-4">
          <p className="logo-name">{site.nome}</p>
          <p className="text-muted text-small mt-2">
            <DaCliente>{site.ragioneSociale}</DaCliente>
          </p>
          <address className="text-small mt-6 not-italic">
            {site.via}
            <br />
            {site.cap} {site.citta} ({site.provincia})
          </address>
        </div>

        <div className="nav:col-span-3">
          <h2 className="eyebrow">Contatti</h2>
          <ul className="text-small mt-4 space-y-2">
            <li>
              <a href={`tel:${site.telefonoHref}`} className="hover:text-accent-text">
                {site.telefono}
              </a>
            </li>
            <li>
              <DaCliente>{site.email}</DaCliente>
            </li>
            <li>
              PEC · <DaCliente>{site.pec}</DaCliente>
            </li>
            <li>
              P.IVA <DaCliente>{site.partitaIva}</DaCliente>
            </li>
            <li>
              <DaCliente>{site.orari}</DaCliente>
            </li>
          </ul>
        </div>

        <div className="nav:col-span-2">
          <h2 className="eyebrow">Sito</h2>
          <ul className="text-small mt-4 space-y-2">
            {menu.map((v) => (
              <li key={v.href}>
                <Link href={v.href} className="hover:text-accent-text">
                  {v.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav:col-span-3">
          <Placeholder label="Come si arriva in studio" className="mappa-footer" />
        </div>
      </div>

      <div className="border-line border-t">
        <div className="wrap text-muted text-small flex flex-wrap items-center justify-between gap-4 py-6">
          <p>
            © {new Date().getFullYear()} {site.nome} — {site.qualifica}, {site.citta}
          </p>
          <ul className="flex flex-wrap gap-6">
            {legal.map((v) => (
              <li key={v.href}>
                <Link href={v.href} className="hover:text-accent-text">
                  {v.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
