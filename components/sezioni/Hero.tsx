import Link from 'next/link'
import { Quota } from '@/components/Quota'
import { Volume } from '@/components/sezioni/Volume'
import { RUOLI } from '@/lib/contenuti/schema'
import { ctaPrimaria, site } from '@/lib/site'

/**
 * La hero dell'opzione A «Lo studio».
 *
 * ## Cosa è cambiato alla ripassata di design (08/09/2026)
 *
 * **1. La fotografia non c'è più, e al suo posto c'è un oggetto.** Era un campo
 * 4/3 che sbordava a destra: il default della categoria — foto d'opera più
 * payoff grande lo fanno Heatherwick, Yazdani, LPAS, Halston — e soprattutto
 * **una promessa che il repo non mantiene**, perché quel campo oggi è un
 * rettangolo grigio e in call è la prima cosa che il cliente vede. Il gesto
 * nuovo è quello misurato su **AIR**: nessuna fotografia sopra la piega, le due
 * voci del payoff spinte ai **due margini**, e in mezzo un oggetto
 * tridimensionale bianco su bianco che passa dietro e fra loro
 * (`components/sezioni/Volume.tsx`).
 *
 * **2. L'h1 sta in tre righe a 1440, non in quattro.** Quattro righe a 132 px
 * costano 454 px di altezza e spingevano la CTA a `top: 844` su un viewport
 * utile di 760: fuori pagina. Tre righe ne costano 340, e la CTA arriva
 * intorno a 660.
 *
 * **3. La CTA punta a `#brief`, non a `/contatti#brief`.** La home il brief ce
 * l'ha in fondo: il bottone principale mandava l'utente su un'altra rotta a
 * rifare la stessa cosa. `ctaPrimaria.label` resta quello — un CTA tiene lo
 * stesso nome per tutto il flusso — e cambia solo la destinazione.
 *
 * ## Le righe sono spezzate a mano, e i numeri della verifica stanno qui
 *
 * È l'unica eccezione consentita dalla regola dell'interlinea (`CLAUDE.md`
 * § Tipografia): a `lh 0.86` un testo che il browser manda a capo starebbe
 * sotto la soglia d'inchiostro di Archivo, quindi la composizione dev'essere
 * fissa e verificata riga per riga. Verificata com'è cambiata, con fontTools
 * sui contorni del file vero, tenendo conto della tracciatura (−0,018 em) e
 * della **posizione orizzontale** di ogni glifo:
 *
 * | | larghezza | a 1440 (1392 px utili) | a 390 (358 px utili) |
 * |---|---|---|---|
 * | `Progettiamo` | 5,383 em | 710,6 px | 301,4 px |
 * | `e dirigiamo.` | 5,053 em | 667,0 px | 283,0 px |
 * | `Dal disegno al cantiere.` | 7,779 em `wdth 75` | 1.026,8 px | — |
 * | `Dal disegno` · `al cantiere.` | 3,972 · 3,687 em | — | 222,4 · 206,5 px |
 *
 * Le coppie di righe: **1-2 tocca di 0,045 em** — la coda della `g` di
 * «Progettiamo» contro il punto della `i` di «dirigiamo.», in una finestra
 * larga 0,1 em — ed è la composizione che c'era già, non una che introduco io;
 * **2-3 è pulita a 1440** (il tecnico è allineato al margine destro e parte a
 * 365 px, dove la `g` non arriva) e a 390 tocca di 0,009 em, cioè **mezzo
 * pixel**. Nessuna maiuscola accentata in tutto il payoff, quindi il caso
 * peggiore di Archivo (1,136 em) non è mai in gioco. **Se un giorno si cambia
 * una parola, questa tabella va rifatta.**
 *
 * Il tecnico va su **una riga sopra i 67 rem e su due sotto**: la soglia non è
 * scelta, è dove `(100vw − 2 × margine)` smette di reggere i 1.027 px della
 * riga intera — misurato a 1.064 px, arrotondato al rem successivo. Le due metà
 * sono due `<span>` che passano da `inline` a `block`, non un `<br>` spento con
 * `display: none`: così il testo nel DOM è uno solo, e a spezzarlo è
 * l'impaginazione e non una copia nascosta.
 */

export function Hero() {
  return (
    <section className="hero-elevato">
      <div className="wrap">
        {/* La scena: due strati sulla stessa cella di griglia. Sotto l'oggetto,
            sopra il testo — l'oggetto **interseca** il payoff invece di stargli
            accanto, che è la differenza fra AIR e tutti gli altri. L'SVG si
            stira alla cella e `preserveAspectRatio` lo centra: nessuna misura
            cablata, quindi non c'è niente che possa sbordare sulla barra nera
            della proposta quando la pagina cambia altezza. */}
        <div className="hero-scena">
          <div className="hero-lastra">
            {/* Il payoff approvato, **intero**: «dal disegno al cantiere» è la
                continuità che vince il confronto, e non si perde per far stare
                un corpo. */}
            <h1 className="hero-payoff">
              <span className="hero-payoff-esito">
                Progettiamo
                <br />e dirigiamo.
              </span>
              {/* La seconda voce sta al **margine opposto**, non sotto la
                  prima: è il gesto di AIR (la `A` a sinistra, la `R` a destra,
                  e in mezzo l'oggetto). Non cambia colore e non va in corsivo —
                  quelle sono le tell — cambia **larghezza**: `wdth 75` contro
                  `wdth 100`, stessa famiglia e stesso corpo. È la stessa
                  relazione esito/tecnicismo dei sei servizi. */}
              <span className="hero-payoff-tecnico">
                <span className="hero-payoff-riga">Dal disegno</span>{' '}
                <span className="hero-payoff-riga">al cantiere.</span>
              </span>
            </h1>

            {/* La quota che passa le tre condizioni: due estremi sui bordi del
                campo di testo, un numero che il repo conta (`RUOLI.length`,
                elenco chiuso in `lib/contenuti/schema.ts`), e una quantità che
                il visitatore non conta a vista. È anche il dato che dice **cosa
                sanno fare**, che CLAUDE.md § Scheda progetto vieta di omettere. */}
            <Quota voci={RUOLI} numero={RUOLI.length} unita="ruoli" className="hero-quota" />

            <div className="hero-basso">
              {/* L'azione prima della spiegazione, e non è una svista: il
                  payoff sopra ha già detto cosa fa lo studio, e la CTA deve
                  stare dentro il primo viewport a 390 **e** a 1440. La riga di
                  lead le sta **accanto**, nel vuoto a destra, che è il posto in
                  cui su AIR stanno le tre righe di micro-testo. */}
              <div className="hero-azioni">
                {/* Un'ancora interna: il brief è in fondo a questa pagina. */}
                <Link href="#brief" className="btn">
                  {ctaPrimaria.label}
                </Link>
                {/* Il telefono non è una seconda CTA: è l'azione secondaria
                    dichiarata, e da mobile è spesso la prima in assoluto. */}
                <a href={`tel:${site.telefonoHref}`} className="hero-telefono">
                  {site.telefono}
                </a>
              </div>

              <p className="hero-lead">
                Uno studio di ingegneria civile e architettura a {site.citta}. Progetto
                architettonico e strutturale, pratiche, cantiere: la stessa squadra, dall’idea alla
                consegna.
              </p>
            </div>
          </div>

          {/* L'oggetto sta **dopo** il testo nel DOM e **sotto** in pagina: chi
              legge con una sintesi vocale riceve prima il payoff e poi la
              descrizione della figura, mentre il piano lo decidono `z-index` e
              la posizione assoluta, non l'ordine di sorgente. */}
          <Volume />
        </div>
      </div>
    </section>
  )
}
