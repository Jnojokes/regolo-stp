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
 * - `centrato` (C) — il menu **al centro** sopra la fotografia, il marchio
 *   piccolo a sinistra, la pastiglia «contatti» a destra: è la composizione
 *   misurata su `kit/reference/studio-foundry/1440-hero.jpeg`. Sostituisce la
 *   variante `puntini`, che riduceva ogni voce a un punto di 8 px con il nome in
 *   uno `sr-only` — veniva dalla direzione «la parete», scartata dal committente,
 *   e il risultato in pagina era **un menu che a 1440 non si vedeva**.
 * - `pastiglia` (D) — la stessa griglia a tre celle, ma il menu resta piccolo e
 *   quieto sopra la fotografia, come in `kit/reference/storey/1440-hero.jpeg`.
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
  conPastiglia = false,
}: {
  variante?: 'lockup' | 'cartiglio' | 'centrato' | 'pastiglia'
  /**
   * La pastiglia «contatti» all'estremo destro della testata.
   *
   * In A **non c'è, e non deve tornarci**: sopra la piega la CTA è una sola,
   * quella della hero (`CLAUDE.md` § Homepage, blocco 1), e la nota qui sopra
   * spiega perché è stata togliata. Le due reference misurate ce l'hanno tutte
   * e due — `CONTACT` in Studio Foundry, `Contact` in Storey, sempre a destra e
   * sempre sopra la fotografia — e nelle proposte che aprono con una fotografia
   * è **l'unica** CTA sopra la piega, perché lì la hero non ne ha: quindi il
   * conto di `CLAUDE.md` resta uno.
   *
   * Arriva dal layout, non da un `if` sul tema nel markup.
   */
  conPastiglia?: boolean
}) {
  /* Con la pastiglia, «contatti» **esce dal menu**: è la composizione delle due
     reference misurate — Storey ha `Projects Studio Journal` più la pastiglia
     `Contact`, Studio Foundry ha `Works Studio Approach` più `CONTACT` — e
     senza questo filtro la voce compare due volte nella stessa riga, che è il
     difetto che si vedeva in pagina. La pastiglia non è una CTA in più: è
     **quella** voce, in un'altra forma. */
  const voci = conPastiglia ? menu.filter((v) => v.href !== '/contatti') : menu

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
          className={`site-nav nav:block hidden ${variante === 'lockup' ? '' : `site-nav-${variante}`}`}
        >
          <ul>
            {voci.map((v) => (
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

        {/* La pastiglia all'estremo destro: è l'azione, ed è il solo oggetto
            con un raggio in tutto il tema (`--regolo-radius` vale 0 su ogni
            rettangolo). Punta a `/contatti` e non al brief, perché la reference
            dice «Contact» e perché il brief ha già la sua CTA in fondo alla
            pagina: due bottoni che portano allo stesso posto sopra la piega
            erano il difetto corretto ad aprile su A. */}
        {conPastiglia && (
          <Link href="/contatti" className="testata-pastiglia nav:inline-flex hidden">
            contatti
          </Link>
        )}

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
