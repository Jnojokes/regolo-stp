import Link from 'next/link'
import { Placeholder } from '@/components/Placeholder'
import { Quota } from '@/components/Quota'
import { RUOLI } from '@/lib/contenuti/schema'
import { ctaPrimaria, site } from '@/lib/site'

/**
 * La hero dell'opzione A «Lo studio»: il payoff in quattro righe a 132 px, la
 * quota dei cinque ruoli che attraversa tutta la larghezza, **una sola** CTA.
 * Vende la competenza dichiarandola, che è la lettura giusta se chi arriva ha
 * già sentito il nome e sta decidendo se fidarsi (`CLAUDE.md` § Obiettivo — il
 * sito è il secondo contatto).
 *
 * Le due metà della frase stanno alla **stessa dimensione e nella stessa
 * famiglia, a due larghezze diverse** (`wdth 100` e `wdth 75`): la seconda metà
 * è il tecnicismo della prima, che è la stessa relazione esito/tecnicismo dei
 * sei servizi. È il gesto misurato in Kononenko («The» serif + «Systematic»
 * grottesco nella stessa riga), fatto con **un asse invece di due famiglie**.
 *
 * ## Perché questo file non ha più una `variante`
 *
 * Fino alla fase 3 quater ne aveva due — `foto` per A e `domanda` per B — e il
 * componente era un interruttore fra due hero senza niente in comune. Con
 * l'uscita di B (`DECISIONI.md` n. 39) il secondo ramo non ha più chiamanti, e
 * un interruttore con un ramo solo non è un'astrazione: è un livello di
 * indirezione che nasconde di che cosa si sta parlando. Le altre due proposte
 * hanno hero proprie — `components/fonderia/Colata.tsx` per C,
 * `components/monografia/Copertina.tsx` per D — e non passano da qui.
 *
 * **Le quattro righe del payoff sono spezzate a mano** (`<br>` +
 * `text-wrap: nowrap`, `app/css/sezioni.css`), e non è un vezzo: a interlinea
 * 0,86 stanno **sotto** la soglia d'inchiostro di Archivo (1,050 em, misurata
 * con fontTools sul file vero), quindi la coda della `g` di «Progettiamo» e il
 * puntino della `i` di «e dirigiamo.» occupano la stessa fascia. Funziona
 * perché la composizione è **fissa e verificata riga per riga**; il giorno che
 * qualcuno cambia una parola va riverificata. È l'unica eccezione consentita
 * dalla regola dell'interlinea in `CLAUDE.md` § Tipografia.
 */

export function Hero() {
  return (
    <section className="hero-elevato">
      <div className="wrap">
        {/* Il payoff approvato, **intero**: «dal disegno al cantiere» è la
            continuità che vince il confronto, e non si perde per far stare un
            corpo. Le quattro righe sono decise e misurate — per questo
            `text-wrap` non le ri-spezza (vedi `@layer base`). */}
        <h1 className="hero-payoff">
          <span className="hero-payoff-esito">
            Progettiamo
            <br />e dirigiamo.
          </span>
          <span className="hero-payoff-tecnico">
            Dal disegno
            <br />
            al cantiere.
          </span>
        </h1>

        {/* La quota che passa le tre condizioni: due estremi sui bordi del
            campo di testo, un numero che il repo conta (`RUOLI.length`, elenco
            chiuso in `lib/contenuti/schema.ts`), e una quantità che il
            visitatore non conta a vista. È anche il dato che dice **cosa sanno
            fare**, che CLAUDE.md § Scheda progetto vieta di omettere. */}
        <Quota voci={RUOLI} numero={RUOLI.length} unita="ruoli" className="hero-quota" />

        <div className="hero-basso">
          <div className="hero-testo">
            <p className="hero-lead">
              Uno studio di ingegneria civile e architettura a {site.citta}. Progetto architettonico
              e strutturale, pratiche, cantiere: la stessa squadra, dall’idea alla consegna.
            </p>
            {/* Una sola CTA (CLAUDE.md § Homepage, blocco 1). Il telefono
                accanto non è una seconda CTA: è l'azione secondaria dichiarata,
                e su mobile è spesso la prima in assoluto. */}
            <div className="hero-azioni">
              <Link href={ctaPrimaria.href} className="btn">
                {ctaPrimaria.label}
              </Link>
              <a href={`tel:${site.telefonoHref}`} className="hero-telefono">
                {site.telefono}
              </a>
            </div>
          </div>

          {/* Il campo della fotografia **sborda a destra** oltre il margine:
              Kononenko misurato ha un'immagine a `x = −32`, Storey un file da
              1512 px a `x = −36`. Mai a sinistra: il margine è la spina della
              griglia. Quando arriva la foto vera diventa un `next/image` con
              `priority` e `sizes`, ed è l'LCP di questa metà di pagina — che
              oggi invece è il payoff, cioè testo (TODO-MEDIA.md). */}
          {/* `demo` riempie il campo con il video di esempio: è il solo posto
              del sito dove c'è del movimento, e dice la stessa cosa del payoff
              — «dal disegno al cantiere». Resta un segnaposto: squadrette,
              specifica e riga di provenienza sono ancora tutte lì, e
              `NEXT_PUBLIC_MEDIA_DEMO=0` lo riporta al rettangolo dichiarato.
              L'LCP non cambia: quello che si carica subito è il poster da
              36 KB, il file da 2,1 MB arriva dopo. */}
          <Placeholder
            label="Fotografia di un’opera realizzata — dallo studio, non un render"
            specifica="2400 × 1650 px · AVIF · ≤ 250 KB"
            className="hero-figura"
            ratio="4 / 3"
            demo="cantiere-loop"
            priorita
          />
        </div>
      </div>
    </section>
  )
}
