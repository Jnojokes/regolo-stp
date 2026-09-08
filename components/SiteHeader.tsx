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
 *
 * ## Le tre varianti
 *
 * La variante arriva dal **layout**, che è il posto dove il tema si sceglie: è
 * composizione, non un `if` sul tema nel markup. E nessuna porta il nome di una
 * proposta — dicono che forma ha la testata, non a chi appartiene.
 *
 * - `lockup` (A) — il marchio e la sede in colonna, il menu che è **una frase**
 *   con le virgole (Kononenko misurato: `Index, Work, About, Contact`), la
 *   barra **sticky** che segue la lettura. È un sito: il chrome resta.
 * - `destra` (B, ecoLINEAR) — il marchio a sinistra e il menu **a destra**, in
 *   maiuscolo, su un fondo carta che si stacca dal foglio quando la pagina
 *   scorre. Misurato su `kit/reference/ecolinear/1440-hero.jpeg` e `-meta-18`.
 * - `pastiglia` (C, Halston) — il marchio a sinistra, una **pastiglia granata**
 *   con l'hamburger accanto, il menu **al centro** e `altro` a destra.
 *   Misurato su `kit/reference/halston/1440-hero.jpeg`.
 */
export function SiteHeader({
  variante = 'lockup',
}: {
  variante?: 'lockup' | 'destra' | 'pastiglia'
}) {
  return (
    <header className={`site-header site-header-${variante}`}>
      {/* `lockup` è A e basta; C e D usano lo stesso contenitore a tre celle —
          marchio, menu, pastiglia — e quello che cambia è come il tema lo veste
          (`app/css/fonderia.css` e `app/css/monografia.css`).
          Si chiamava `cartiglio`, che era il nome del gesto **di B**: il
          riquadro delle iscrizioni di una tavola tecnica. B non c'è più e il
          nome descriveva una cosa che non è più in pagina, quindi è `testata`,
          che dice cos'è e non a chi apparteneva. */}
      <div className={variante === 'lockup' ? 'wrap site-header-riga' : 'testata'}>
        {/* Niente aria-label: sostituirebbe il testo visibile con uno diverso,
            e per chi usa il comando vocale il nome accessibile deve contenere
            quello che si legge. Il testo del link basta da solo. */}
        {variante !== 'lockup' ? (
          /* Tre celle sulla riga, come nelle due reference misurate: marchio
             piccolo a sinistra, menu al centro, pastiglia a destra. Il nome non
             è un lockup con la sede sotto — quello è il gesto di A — è una cella
             sola, e la sede non c'è: sopra una prima schermata che deve fare
             effetto, un indirizzo in corpo 12 è rumore. Sta nel footer, dove
             chi la cerca la trova. */
          <>
            <Link href="/" className="testata-nome">
              {site.nomeEsteso}
            </Link>
          </>
        ) : (
          <Link href="/" className="logo-lockup">
            <span className="logo-name">{site.nomeEsteso}</span>
            {/* Sotto i 480 px la seconda riga manderebbe a capo un lockup che è
                dentro una barra sticky: lì resta il solo nome. */}
            <span className="logo-qualifier hidden min-[30rem]:block">
              {site.via} — {site.cap} {site.citta} ({site.provincia})
            </span>
          </Link>
        )}

        {/* Il menu è una frase: le voci sono separate da virgole vere, messe dal
            CSS e non dal testo, così non entrano nel nome accessibile dei link
            né in un eventuale copia-incolla della voce. */}
        <nav
          aria-label="Principale"
          className={`site-nav nav:block hidden ${variante === 'lockup' ? '' : `site-nav-${variante}`}`}
        >
          <ul>
            {menu.map((v) => (
              <li key={v.href}>
                {/* La voce è **sempre testo visibile**, in ogni variante. La
                    variante `puntini` la riduceva a un punto di 8 px con il nome
                    in uno `sr-only`: veniva dalla direzione «la parete», che il
                    committente ha scartato, e a 1440 il risultato era un menu
                    che **non si vedeva** — l'unica cosa che restava in cima
                    alla pagina era il marchio. Le due reference misurate dicono
                    il contrario: Studio Foundry e Storey hanno il menu
                    **centrato sopra la fotografia**, in chiaro, con una
                    pastiglia a destra (`kit/reference/studio-foundry/1440-hero.jpeg`
                    e `kit/reference/storey/1440-hero.jpeg`). Un nome accessibile
                    che nessuno vede non è una scelta di stile: è una voce di
                    menu mancante. */}
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
