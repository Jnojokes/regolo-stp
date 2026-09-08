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
 * ## Le due varianti (fase 3 ter)
 *
 * Fino a ieri questo componente non accettava **nessuna prop**, e il markup che
 * rendeva nelle due home era byte-identico: 1.343 byte, zero righe di diff.
 * Tutto ciò che distingueva i due header stava in tre token. Su un blocco che
 * è la prima riga di ogni pagina, era metà della diagnosi «B è A con il
 * negativo».
 *
 * La variante arriva dal **layout**, che è il posto dove il tema si sceglie
 * (`app/(b)/layout.tsx`): è composizione, non un `if` sul tema nel markup.
 *
 * - `lockup` (A) — il marchio e la sede in colonna, il menu che è **una frase**
 *   con le virgole (Kononenko misurato: `Index, Work, About, Contact`), la
 *   barra **sticky** che segue la lettura. È un sito: il chrome resta.
 * - `cartiglio` (B) — la testata **del documento**, e cade sulla stessa griglia
 *   a due colonne di tutti i campi (`components/campo/Campo.tsx`): il nome nel
 *   margine di classificazione, la sede e il menu sul foglio, il menu ai due
 *   estremi con il vuoto in mezzo. **Niente virgole** — quel gesto è di A — e
 *   **non è sticky**: la testata di un documento non ti segue mentre lo leggi.
 *   È una differenza di comportamento, non di colore, e libera la prima
 *   schermata al contenuto, che in una pagina densa è quello che conta. Su
 *   telefono B ha comunque la barra fissa con la CTA.
 */
export function SiteHeader({
  variante = 'lockup',
}: {
  variante?: 'lockup' | 'cartiglio' | 'puntini' | 'pastiglia'
}) {
  return (
    <header className={`site-header site-header-${variante}`}>
      {/* `lockup` è A e basta; tutte le altre tre proposte usano lo stesso
          contenitore a celle — quello che cambia è come il tema lo veste
          (`app/css/campi.css` per B, `app/css/temi-cd.css` per C e D). */}
      <div className={variante === 'lockup' ? 'wrap site-header-riga' : 'cartiglio'}>
        {/* Niente aria-label: sostituirebbe il testo visibile con uno diverso,
            e per chi usa il comando vocale il nome accessibile deve contenere
            quello che si legge. Il testo del link basta da solo. */}
        {variante !== 'lockup' ? (
          /* Nel cartiglio di un disegno il nome e la sede non sono un lockup:
             sono **due celle del riquadro delle iscrizioni**, e cadono sulle
             due colonne del documento — il nome nel margine di
             classificazione, la sede sul foglio, come ogni altro campo. Non è
             un lockup impaginato diversamente: è un'altra cosa. */
          <>
            <Link href="/" className="cartiglio-nome">
              {site.nomeEsteso}
            </Link>
            <p className="cartiglio-sede">
              {site.via} — {site.cap} {site.citta} ({site.provincia})
            </p>
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
          className={`site-nav nav:block hidden ${variante === 'lockup' ? '' : 'site-nav-registro'}`}
        >
          <ul>
            {menu.map((v) => (
              <li key={v.href}>
                {/* In `puntini` la voce è un puntino di 8 px e il nome sta in
                    uno `sr-only`: nascosto alla vista, **non** a chi ascolta né
                    al comando vocale. Con `text-indent: -9999px` il nome
                    restava un nodo di testo dentro il link — invisibile, ma
                    misurabile: il collaudo del contrasto lo prendeva come
                    difetto, e aveva ragione a chiederselo. */}
                <Link href={v.href}>
                  {variante === 'puntini' ? (
                    <span className="sr-only">{v.label.toLowerCase()}</span>
                  ) : (
                    v.label.toLowerCase()
                  )}
                </Link>
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
