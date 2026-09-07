import Link from 'next/link'
import { Placeholder } from '@/components/Placeholder'
import { Quota } from '@/components/Quota'
import { RUOLI } from '@/lib/contenuti/schema'
import {
  hrefBrief,
  hrefPercorso,
  percorsi,
  percorsoIniziale,
  servizioDelPercorso,
} from '@/lib/percorsi'
import { ctaPrimaria, site } from '@/lib/site'

/**
 * La hero, nelle due letture che il cliente deve poter scegliere.
 *
 * `foto` — opzione A «L'elevato». Il payoff in quattro righe a 132 px, la quota
 * dei cinque ruoli che attraversa tutta la larghezza, **una sola** CTA. Vende la
 * competenza dichiarandola: è la lettura giusta se chi arriva ha già sentito il
 * nome e sta decidendo se fidarsi (CLAUDE.md § Obiettivo — il sito è il secondo
 * contatto).
 *
 * `domanda` — opzione B «Il registro». Al posto dello slogan, la domanda che
 * smista: «Che intervento hai in mente?». È il blocco con il miglior rapporto
 * effetto/costo di tutto il catalogo (A3): personalizza il percorso senza
 * nessuna tecnologia, e chi risponde a una domanda ha già cominciato a
 * compilare il brief.
 *
 * ## Cosa è cambiato con la fase 3 bis, e perché
 *
 * **In A**: il payoff non ha più una riga in corsivo colorato — che è la tell
 * «una sola parola del titolo in corsivo/colore» e che l'asse `ital` dei due
 * file variabili non contiene nemmeno più, quindi è tecnicamente impossibile.
 * Al suo posto le due metà della frase stanno alla **stessa dimensione e nella
 * stessa famiglia, a due larghezze diverse** (`wdth 100` e `wdth 75`): la
 * seconda metà è il tecnicismo della prima, che è la stessa relazione
 * esito/tecnicismo dei sei servizi. È il gesto misurato in Kononenko («The»
 * serif + «Systematic» grottesco nella stessa riga) e confermato in Pelizzari
 * (Suisse Intl + Suisse Works a 120 px), fatto con **un asse invece di due
 * famiglie**. E via l'occhiello in maiuscoletto unito da puntini: l'identità
 * della sezione è la quota.
 *
 * **In B**: le cinque card identiche con bordo e raggio — cluster n. 4 — sono
 * diventate **cinque righe di un registro** a cavallo dell'asse verticale, con
 * la chiave d'archivio a sinistra e il radio a destra. `01…05` non è una
 * sequenza e non deve leggersi come tale: cinque alternative mutuamente
 * esclusive non hanno un primo e un ultimo (skill `sito-design` § 5). Dove una
 * sequenza c'è davvero — le cinque fasi, i cinque passi del brief — la
 * numerazione resta.
 *
 * ## Il pannello dell'opzione B cambia senza una riga di JavaScript
 *
 * Non si tocca (`DECISIONI.md` 07/09): i cinque percorsi sono `radio` nativi e i
 * cinque pannelli stanno tutti nel DOM; `:has()` accende quello scelto
 * (`app/css/sezioni.css`). Costa ~2 KB di HTML e in cambio funziona senza
 * JavaScript — che per il blocco che smista il traffico non è un dettaglio —
 * funziona da tastiera di serie con le freccette, e non aggiunge un byte al
 * bundle. Il ridisegno è **CSS sopra questo markup**, non un markup nuovo.
 *
 * Il `radio` rivela, non naviga: per andare da qualche parte ci sono i link
 * dentro il pannello. Un controllo che cambia pagina non è un radio.
 */
export function Hero({ variante }: { variante: 'foto' | 'domanda' }) {
  return variante === 'foto' ? <HeroFoto /> : <HeroDomanda />
}

/* -------------------------------------------------------------------------- */

function HeroFoto() {
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
          <Placeholder
            label="Fotografia di un’opera realizzata — dallo studio, non un render"
            specifica="2400 × 1650 px · AVIF · ≤ 250 KB"
            className="hero-figura"
            ratio="4 / 3"
          />
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function HeroDomanda() {
  return (
    <section className="hero-registro">
      <div className="wrap">
        <div className="hero-registro-testa">
          {/* L'etichetta di sezione sta nel campo vuoto a **sinistra
              dell'asse**, non sopra il titolo: Kononenko butta «Offices» a
              x≈417 e comincia la tabella a x=493. Un occhiello sopra un titolo
              è la tell n. 5; un'etichetta nel margine è un'informazione al suo
              posto. */}
          <p className="eyebrow hero-registro-etichetta">il punto di partenza</p>

          <div className="hero-registro-domanda">
            <h1>Che intervento hai in mente?</h1>
            <p className="hero-lead">
              Scegli il tuo caso: ti diciamo subito cosa comprende, come si svolge e cosa serve da
              parte tua. Ingegneria civile e architettura, a {site.citta}.
            </p>
          </div>
        </div>

        {/* La stessa quota di A: è la grammatica condivisa che rende le due
            pagine due proposte dello stesso studio e non due lavori. */}
        <Quota voci={RUOLI} numero={RUOLI.length} unita="ruoli" className="hero-quota" />

        {/* Un `radiogroup` etichettato dall'`h1`: la domanda è già in pagina, e
            ripeterla in una `legend` la farebbe sentire due volte.
            Ogni riga e il suo pannello sono **interlacciati**: così la regola
            `:has()` è una sola invece di cinque, e il pannello è il fratello
            immediatamente successivo alla riga scelta. */}
        <div className="registro" role="radiogroup" aria-label="Che intervento hai in mente?">
          {percorsi.map((p) => {
            const servizio = servizioDelPercorso(p)
            const iniziale = p.intervento === percorsoIniziale.intervento
            return (
              <div key={p.intervento} className="registro-coppia">
                <label className="riga" htmlFor={`percorso-${p.intervento}`}>
                  {/* La chiave d'archivio, a sinistra dell'asse. Non è un
                      passo di un processo: è l'indice della riga. */}
                  <span className="riga-chiave" data-numero="">
                    {p.numero}
                  </span>
                  <span className="riga-ruolo">{servizio.sottotitolo}</span>
                  <span className="riga-scelta">
                    <input
                      type="radio"
                      id={`percorso-${p.intervento}`}
                      name="percorso"
                      value={p.intervento}
                      defaultChecked={iniziale}
                    />
                    <span className="riga-nome">{p.etichetta}</span>
                  </span>
                </label>

                {/* Il pannello: la **figura** bianca con 1 px di inchiostro sul
                    bordo. Non è più una card scura a tre colonne con la
                    micro-etichetta monospace sopra — che era, insieme, il
                    cluster n. 4 e la «griglia a tre colonne con l'etichetta
                    sopra» della lista di casa.
                    `data-iniziale` è il ripiego per i browser senza `:has()`. */}
                <div
                  className="pannello"
                  data-percorso={p.intervento}
                  data-iniziale={iniziale ? '' : undefined}
                >
                  <div>
                    <p className="pannello-chiave" id={`${p.intervento}-comprende`}>
                      cosa comprende
                    </p>
                    <ul aria-labelledby={`${p.intervento}-comprende`}>
                      {p.comprende.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="pannello-chiave" id={`${p.intervento}-svolge`}>
                      come si svolge
                    </p>
                    <ul aria-labelledby={`${p.intervento}-svolge`}>
                      {p.svolge.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="pannello-chiave" id={`${p.intervento}-serve`}>
                      cosa serve da te
                    </p>
                    <ul aria-labelledby={`${p.intervento}-serve`}>
                      {p.serve.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pannello-azioni">
                    <Link href={hrefBrief(p)} className="btn">
                      Raccontaci il progetto
                    </Link>
                    <Link href={hrefPercorso(p)} className="pannello-vai">
                      {servizio.titolo}
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="nota-cantiere">
          Gli elenchi «cosa serve da te» sono una proposta: quali documenti servano davvero per
          partire lo dice lo studio, servizio per servizio.
        </p>
      </div>
    </section>
  )
}
