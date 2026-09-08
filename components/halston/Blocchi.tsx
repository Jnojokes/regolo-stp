import Link from 'next/link'
import { DaCliente, Placeholder } from '@/components/Placeholder'
import { Segnaposto, SegnapostoCifra } from '@/components/Segnaposto'
import { RUOLI } from '@/lib/contenuti/schema'
import { numeri } from '@/lib/numeri'
import { persone } from '@/lib/persone'
import { fasi } from '@/lib/processo'
import { progetti } from '@/lib/progetti'
import { servizi } from '@/lib/servizi'
import { eSegnaposto, site } from '@/lib/site'

/**
 * I blocchi dell'opzione C «Halston».
 *
 * Il committente ha chiesto *«l'opzione 3 la voglio identica a questo sito»*
 * indicando `https://halston-architecture-template.webflow.io/`. Il sito è
 * stato catturato e **misurato nel browser** con Playwright: catture in
 * `kit/reference/halston/`, tabella in `SCHEDA.md`.
 *
 * ## Che cos'è quella pagina, e perché non somiglia né ad A né a B
 *
 * **Bande a piena larghezza che cambiano superficie.** Non c'è un contenitore
 * centrato e non c'è spazio bianco fra i blocchi: una banda finisce dove
 * comincia il colore della prossima. Misurato: `--regolo-wrap: none`, margine
 * 20 px, **zero ombre**, raggio 3 px, e **270 occorrenze** di
 * `text-transform: uppercase`.
 *
 * Le quattro differenze strutturali:
 *
 * 1. **il ritmo lo fa il colore**, non lo spazio. A separa le sezioni col
 *    vuoto (tre passi); B tiene la composizione con una griglia di
 *    costruzione; qui i blocchi si toccano e cambiano fondo — carta, granata,
 *    banda scura, carta;
 * 2. **le bande sono due-up a metà e metà**: testo su un lato, fotografia
 *    sull'altro, a piena altezza, alternate. Nessun margine fra i due;
 * 3. **la testa di sezione è a tre punti su un filetto**: etichetta a
 *    sinistra, pastiglia al centro, etichetta a destra. Non un occhiello sopra
 *    un titolo;
 * 4. **i valori stanno nella monospace.** Dove c'è un dato o un'etichetta c'è
 *    JetBrains Mono; tutto il resto è la proporzionale. Misurato: 34 nodi su
 *    332.
 */

/* -------------------------------------------------------------------------- */

/**
 * La pastiglia-etichetta: **il micro-elemento firma** di Halston.
 *
 * Misurata su `1440-meta-35.jpeg` e `-70.jpeg`: mono, maiuscola, 1 px di
 * bordo, 3 px di raggio, e **un punto** all'inizio. Compare su `• QUOTE`,
 * `• TESTIMONIALS`, `• HOMEOWNER`. È il modo in cui quella pagina nomina le
 * cose, e ce n'è una per blocco.
 *
 * Il punto è `aria-hidden`: è un segno, non una parola.
 */
export function Targa({ children }: { children: React.ReactNode }) {
  return (
    <span className="targa">
      <span className="targa-punto" aria-hidden="true" />
      {children}
    </span>
  )
}

/**
 * La testa di sezione a **tre punti su un filetto**: etichetta a sinistra,
 * pastiglia al centro, etichetta a destra.
 *
 * `1440-meta-70.jpeg`, misurato: `CLIENT` a sinistra, `• TESTIMONIALS`
 * centrata, `PERSPECTIVES` a destra, tutte in mono maiuscola su una riga con un
 * filetto sopra. È la sostituzione dell'occhiello: dove A mette un'etichetta
 * sopra un titolo, qui la sezione si annuncia con tre voci ai tre punti della
 * riga.
 */
export function TestaBanda({
  sinistra,
  targa,
  destra,
}: {
  sinistra: string
  targa: string
  destra: string
}) {
  return (
    <div className="testa-banda">
      <span className="testa-banda-capo">{sinistra}</span>
      <Targa>{targa}</Targa>
      <span className="testa-banda-capo">{destra}</span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * La copertina: **la barra di contenuto e poi il media a piena finestra**.
 *
 * `1440-hero.jpeg`, misurato: in alto il titolo in maiuscolo su due righe a
 * 57,6 px con interlinea **1,0** e tracciatura **−0,05 em**; sotto un filetto
 * **spezzato in due** con un vuoto in mezzo; poi una riga a tre colonne — le
 * discipline in granata a sinistra, `RECOGNITION` con il suo valore al centro,
 * un bottone **contornato** `CONSULTATION +` a destra; e sotto, a piena
 * finestra, **il video** — `heroInfo.video: true`, hero al 135 % del viewport.
 *
 * Le due righe del titolo sono **spezzate a mano**: a interlinea 1,0 su testo
 * tutto maiuscolo la soglia d'inchiostro lo consente, ma la composizione va
 * fissata perché il browser non spezzi «PROGETTIAMO E / DIRIGIAMO» in un punto
 * qualsiasi. È la stessa eccezione dichiarata della hero di A, e vale per lo
 * stesso motivo.
 *
 * ## Il filetto spezzato, che è **il secondo wow** (`kit/OPZIONI.md` § C)
 *
 * I due `<span>` non sono una decorazione ripetuta: sono **la cosa che Halston
 * fa e gli altri no**. Sotto il titolo non c'è una riga, ce ne sono due,
 * separate da un vuoto che cade al **49 % della finestra** — la pagina si
 * *divide* invece di allinearsi, ed è la stessa idea delle bande un'ottava
 * sopra. A 390 tornano una riga sola, misurato, e allo scorrimento (a 1440) i
 * due tronconi si chiudono l'uno verso l'altro e diventano quella riga: il
 * gesto della sua stessa versione mobile, eseguito. Sta tutto in
 * `app/css/halston.css` § IL FILETTO CHE SI RICOMPONE — qui il markup serve
 * solo a esistere in due pezzi, e resta `aria-hidden`: non porta nessuna
 * informazione, quindi non c'è niente da degradare.
 */
export function Copertina() {
  return (
    <section className="halston-copertina" aria-label={`${site.nomeEsteso} — la copertina`}>
      <div className="copertina-barra">
        <h1 className="copertina-titolo">
          Progettiamo e dirigiamo.
          <br />
          Dal disegno al cantiere.
        </h1>

        <div className="copertina-filetto" aria-hidden="true" data-decorativo="">
          <span />
          <span />
        </div>

        <div className="copertina-riga">
          {/* Le tre discipline in granata, come le tre di Halston
              (ARCHITECTURE / INTERIOR DESIGN / RENOVATION). Qui sono i tre
              mestieri che `CLAUDE.md` § Cliente dichiara: non sono inventati. */}
          <ul className="copertina-discipline" role="list">
            <li>Progettazione architettonica</li>
            <li>Progettazione strutturale</li>
            <li>Direzione lavori e sicurezza</li>
          </ul>

          <div className="copertina-riconoscimento">
            <p className="halston-micro">Ruoli firmabili</p>
            <p className="copertina-valore">{RUOLI.length} ruoli, dalla firma al collaudo</p>
          </div>

          <Link href="#brief" className="halston-bottone">
            <span>Raccontaci il progetto</span>
            <span aria-hidden="true">+</span>
          </Link>
        </div>
      </div>

      {/* **La copertina è un video, non una fotografia.** Misurato sulla
          reference: `heroInfo.video: true` (autoplay) e hero al **135 %** del
          viewport, cioè un campo pensato per essere guardato — che è la
          ragione per cui qui il video ha senso e in A non ce l'aveva. Il file
          di esempio esiste già: `cantiere-loop`, 2,1 MB su un budget di 2,5
          (`CLAUDE.md` § Performance budget), e **non entra nel primo
          caricamento** — `MediaEsempio` serve il poster da 36 KB e chiama il
          file quando il browser è libero.

          Con `prefers-reduced-motion: reduce` resta **il solo poster**, e non
          per una regola CSS: `MediaEsempio` rende un elemento diverso, perché
          un `<video autoplay>` scarica comunque. Il campo resta un segnaposto
          dichiarato — squadrette, specifica del formato e riga di fonte e
          licenza (decisione n. 27 b) — e `NEXT_PUBLIC_MEDIA_DEMO=0` lo
          riporta al rettangolo. */}
      <Placeholder
        label="Video di un’opera realizzata o di un cantiere — dallo studio, non un render"
        specifica="1920 × 1080 px · MP4 muto in loop, ≤ 10 s · ≤ 2,5 MB"
        demo="cantiere-loop"
        priorita
        className="copertina-media"
      />
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Le bande **due-up alternate**, ed è il gesto strutturale della proposta.
 *
 * `1440-meta-18.jpeg`, misurato: una banda granata con il testo a sinistra e
 * la fotografia a destra, poi una banda mauve con la fotografia a sinistra e il
 * testo a destra. **Metà e metà, a piena larghezza, senza margini fra i due
 * lati e senza spazio fra le bande.** Il fondo cambia a ogni banda: è il colore
 * a fare il ritmo, dove A usa lo spazio bianco.
 *
 * ## La banda che invade la carta, ed è **il primo wow** (`kit/OPZIONI.md` § C)
 *
 * Se in questa proposta il ritmo lo fa il colore, il colore deve poter
 * **arrivare**: il granata non comincia dove finisce la carta, la invade al
 * passaggio della piega. La superficie sale guidata dalla `view-timeline`
 * della banda, in solo `transform`, zero JavaScript — il codice e i rapporti
 * di contrasto stanno in `app/css/halston.css` § LA BANDA CHE INVADE.
 *
 * Qui non serve markup: il livello che sale è uno `::before` della banda. Lo
 * **stato di riposo è la banda già piena** — senza `animation-timeline`, senza
 * JavaScript e con `prefers-reduced-motion: reduce` il granata c'è dal primo
 * pixel e non si perde una parola.
 */
export function Bande() {
  return (
    <>
      <section className="banda banda-granata" aria-labelledby="banda-studio">
        <div className="banda-testo">
          <h2 id="banda-studio" className="banda-titolo">
            Uno studio di ingegneria civile e architettura a {site.citta}.
          </h2>
        </div>
        <Placeholder
          label="Fotografia dello studio o di un cantiere — dallo studio"
          specifica="1400 × 1000 px · AVIF · ≤ 200 KB"
          demo="interno-01"
          className="banda-media"
        />
      </section>

      <section className="banda banda-mauve banda-rovescia" aria-labelledby="banda-metodo">
        <Placeholder
          label="Fotografia di cantiere — dallo studio"
          specifica="1400 × 1000 px · AVIF · ≤ 200 KB"
          demo="cantiere-01"
          className="banda-media"
        />
        <div className="banda-testo">
          <h2 id="banda-metodo" className="banda-titolo">
            La stessa squadra dal primo incontro alla consegna, con una persona di riferimento.
          </h2>
          <Link href="/studio" className="halston-bottone">
            <span>Lo studio</span>
            <span aria-hidden="true">+</span>
          </Link>
        </div>
      </section>
    </>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * I servizi come **righe su banda scura**, con il valore in monospace a destra.
 *
 * `1440-meta-52.jpeg`, misurato: fondo `#2E2D2B`, una riga per servizio con un
 * filetto fra le righe, il nome in **maiuscolo** a sinistra nel rosa muto, e
 * all'estremo destro un **valore in mono** (`48+ HOUSES`, `AVG. 14 MONTHS`).
 * Righe alte ~150 px.
 *
 * I valori qui sono **segnaposto dichiarati** (`data-chiede`), perché quanti
 * incarichi e quanto durano lo sa lo studio: inventarli sarebbe la cosa che
 * `CLAUDE.md` § Regole, 1 vieta, e in un blocco che parla di volumi sarebbe
 * anche la più facile da credere.
 *
 * **Il filetto fra le righe qui è ammesso**, ed è una deviazione dichiarata
 * dalla voce di casa «il filetto non separa mai»: quella regola difende A. Su
 * questa reference il filetto fra le righe è il modo in cui la banda si legge,
 * ed è misurato.
 */
export function Servizi() {
  return (
    <section className="halston-servizi" id="servizi" aria-labelledby="servizi-titolo">
      <h2 id="servizi-titolo" className="sr-only">
        Cosa facciamo
      </h2>
      <TestaBanda sinistra="Studio" targa="Servizi" destra={`${servizi.length} voci`} />
      <ul className="servizi-righe" role="list">
        {servizi.map((s) => (
          <li key={s.slug}>
            <Link href={`/servizi/${s.slug}`} className="servizi-riga">
              <span className="servizi-nome">{s.titolo}</span>
              <span className="servizi-valore">{s.sottotitolo}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * La citazione a **due toni**: la prima frase in inchiostro pieno, il resto nel
 * grigio medio.
 *
 * `1440-meta-35.jpeg`, misurato: ritratto piccolo all'estremo sinistro, un
 * filetto in cima che parte da x=370, un grande segno di citazione, il testo a
 * 43,2 px con la **prima frase più scura del resto**, l'attribuzione
 * `nome · ruolo` con il nome più scuro, e una targa `• QUOTE` a destra.
 *
 * Il testo **non è una testimonianza inventata**: è la frase del payoff dello
 * studio, che viene dal prototipo approvato, più un segnaposto dichiarato per
 * la parte che manca. `CLAUDE.md` § Regole, 1 vieta le testimonianze
 * inventate, e questa è la ragione per cui la seconda metà è lorem ipsum con la
 * sua richiesta in `data-chiede` e non una frase che suona bene.
 */
export function Citazione() {
  return (
    <section className="citazione" aria-labelledby="citazione-titolo">
      <h2 id="citazione-titolo" className="sr-only">
        Le parole dello studio
      </h2>
      <Placeholder
        label="Ritratto del titolare — foto dello studio"
        specifica="600 × 750 px · AVIF · ≤ 90 KB"
        ratio="4 / 5"
        className="citazione-ritratto"
      />
      <div className="citazione-corpo">
        <div className="citazione-testa">
          <span className="citazione-segno" aria-hidden="true">
            &rdquo;
          </span>
          <Targa>Studio</Targa>
        </div>
        <blockquote className="citazione-testo">
          <p>
            <strong>Progettiamo e dirigiamo: dal disegno al cantiere.</strong>{' '}
            <Segnaposto
              chiede="la frase del titolare sul modo di lavorare dello studio, da confermare parola per parola"
              parole={18}
              maiuscola={false}
            />
          </p>
        </blockquote>
        <p className="citazione-firma">
          <span className="citazione-nome">
            <DaCliente>{persone[0].nome}</DaCliente>
          </span>
          <span className="citazione-ruolo">
            {eSegnaposto(persone[0].ruolo) ? (
              <DaCliente>{persone[0].ruolo}</DaCliente>
            ) : (
              persone[0].ruolo
            )}
          </span>
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * I progetti: **una banda per opera**, il nome grande e i dati in mono.
 *
 * Il campo **ruolo dello studio** non si omette: `CLAUDE.md` § Scheda progetto
 * lo vieta, ed è il dato che dice cosa sanno fare. Qui sta nella riga di mono
 * accanto ad anno e luogo, che è dove Halston mette i suoi valori.
 */
export function Progetti() {
  return (
    <section className="halston-progetti" id="progetti" aria-labelledby="progetti-titolo">
      <h2 id="progetti-titolo" className="sr-only">
        Progetti in evidenza
      </h2>
      <TestaBanda sinistra="Opere" targa="Progetti" destra={`${progetti.length} schede`} />
      {progetti.map((p, i) => (
        <article key={p.copertina} className="progetto-banda">
          <Placeholder
            label={p.copertina}
            specifica="1800 × 1200 px · AVIF · ≤ 220 KB"
            demo={(['opera-01', 'opera-02', 'opera-03'] as const)[i % 3]}
            className="progetto-media"
          />
          <div className="progetto-testo">
            <h3 className="halston-progetto-nome">
              <Segnaposto
                chiede={`nome del progetto ${String(i + 1).padStart(2, '0')}`}
                parole={3}
              />
            </h3>
            <dl className="halston-progetto-dati">
              {p.dati.map((d) => (
                <div key={d.etichetta}>
                  <dt>{d.etichetta}</dt>
                  <dd>
                    <Segnaposto
                      chiede={`${d.etichetta.toLowerCase()} del progetto ${i + 1}`}
                      parole={2}
                      maiuscola={false}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      ))}
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Il metodo: cinque righe su carta, il numero in mono e il titolo in
 * maiuscolo. La stessa forma delle righe dei servizi, su un'altra superficie —
 * che è il modo in cui quella pagina riusa un impianto senza ripetere un
 * blocco.
 */
export function Metodo() {
  return (
    <section className="halston-metodo" id="processo" aria-labelledby="metodo-titolo">
      <h2 id="metodo-titolo" className="sr-only">
        Come lavoriamo
      </h2>
      <TestaBanda sinistra="Metodo" targa="Come lavoriamo" destra={`${fasi.length} fasi`} />
      <ol className="metodo-righe" role="list">
        {fasi.map((f, i) => (
          <li key={f.titolo}>
            <span className="metodo-numero">{String(i + 1).padStart(2, '0')}</span>
            <span className="metodo-nome">{f.titolo}</span>
            <span className="metodo-testo">{f.testoBreve}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * I numeri, in **quattro celle su banda scura** con il valore in mono.
 *
 * È la stessa lingua delle righe dei servizi (nome + valore in mono) ma in
 * griglia invece che in colonna: quattro celle con il filetto fra loro.
 */
export function Numeri() {
  return (
    <section className="halston-numeri" id="numeri" aria-labelledby="numeri-titolo">
      <h2 id="numeri-titolo" className="sr-only">
        Lo studio in numeri
      </h2>
      <dl className="numeri-celle">
        {numeri.map((n) => (
          <div key={n.etichetta}>
            <dd>
              <SegnapostoCifra chiede={n.chiedere} cifre={n.etichetta.includes('mq') ? 5 : 2} />
            </dd>
            <dt>{n.etichetta}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/** Le persone: quattro campi ritratto e una targa per ognuno. */
export function Persone() {
  return (
    <section className="halston-persone" id="persone" aria-labelledby="persone-titolo">
      <h2 id="persone-titolo" className="sr-only">
        Chi firma il progetto
      </h2>
      <TestaBanda sinistra="Studio" targa="Chi firma" destra={`${persone.length} persone`} />
      <ul className="persone-celle" role="list">
        {persone.map((p, i) => (
          <li key={i}>
            <Placeholder
              label={p.ritratto}
              specifica="1200 × 1500 px · AVIF · ≤ 120 KB"
              ratio="4 / 5"
              className="persona-media"
            />
            <p className="halston-persona-nome">
              <DaCliente>{p.nome}</DaCliente>
            </p>
            <p className="persona-targa">
              <Targa>{eSegnaposto(p.ruolo) ? <DaCliente>{p.ruolo}</DaCliente> : p.ruolo}</Targa>
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
