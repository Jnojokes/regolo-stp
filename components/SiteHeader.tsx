import Link from 'next/link'
import { menu, ctaPrimaria, site } from '@/lib/site'

/**
 * Barra di navigazione: quattro voci, e **nessun bottone**.
 *
 * ## Perché la pastiglia in alto a destra è sparita
 *
 * Kononenko, misurato: «in tutto il sito non esiste un bottone» — il menu è una
 * **frase** (`Index, Work, About, Contact`) con la sottolineatura sulla voce
 * corrente. Storey ha una sola pastiglia «Contact», e AS non ha nemmeno il
 * menu: la sua home *è* l'indice. Nei due prototipi di REGOLO la CTA
 * «Raccontaci il progetto →» stava in alto a destra **e** nella hero, cioè due
 * volte nella stessa schermata: la prima diceva al visitatore che il sito ha
 * qualcosa da vendergli prima di avergli detto chi è.
 *
 * Ora sopra la piega la CTA è **una**, quella della hero, che è anche quello che
 * chiede `CLAUDE.md` § Homepage, blocco 1 («una sola CTA»). Da 896 px in giù la
 * scomparsa `<details>` la contiene, perché lì la hero è più lontana.
 *
 * Il marchio è **tipografia**, non un logo inventato (decisione n. 5: il logo lo
 * manda il cliente). Sotto il nome c'è la sede, a `micro`: un indirizzo in
 * chiaro nella prima riga della pagina è la prima prova di essere un posto
 * vero — che su un sito che è il *secondo* contatto vale più di un pittogramma.
 *
 * Il menu a scomparsa mobile resta una `<details>`: funziona senza JavaScript e
 * da tastiera (CLAUDE.md § Regole, 4 e 5).
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header-riga">
        {/* Niente aria-label: sostituirebbe il testo visibile con uno diverso,
            e per chi usa il comando vocale il nome accessibile deve contenere
            quello che si legge. Il testo del link basta da solo. */}
        <Link href="/" className="logo-lockup">
          <span className="logo-name">{site.nomeEsteso}</span>
          {/* Sotto i 480 px la seconda riga manderebbe a capo un lockup che è
              dentro una barra sticky: lì resta il solo nome. */}
          <span className="logo-qualifier hidden min-[30rem]:block">
            {site.via} — {site.cap} {site.citta} ({site.provincia})
          </span>
        </Link>

        {/* Il menu è una frase: le voci sono separate da virgole vere, messe dal
            CSS e non dal testo, così non entrano nel nome accessibile dei link
            né in un eventuale copia-incolla della voce. */}
        <nav aria-label="Principale" className="site-nav nav:block hidden">
          <ul>
            {menu.map((v) => (
              <li key={v.href}>
                <Link href={v.href}>{v.label.toLowerCase()}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile: disclosure nativa, nessun JS. Qui la CTA c'è, perché il menu
            è chiuso e la hero è più lontana. */}
        <details className="menu-mobile nav:hidden">
          <summary>menu</summary>
          <div className="menu-mobile-pannello">
            <nav aria-label="Principale, mobile" className="wrap py-6">
              <ul className="flex flex-col">
                {menu.map((v) => (
                  <li key={v.href} className="border-line border-b last:border-b-0">
                    <Link href={v.href} className="text-h3 block py-4">
                      {v.label.toLowerCase()}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={ctaPrimaria.href} className="btn mt-6 w-full">
                {ctaPrimaria.label}
              </Link>
              <a href={`tel:${site.telefonoHref}`} className="hero-telefono mt-4">
                {site.telefono}
              </a>
            </nav>
          </div>
        </details>
      </div>
    </header>
  )
}
