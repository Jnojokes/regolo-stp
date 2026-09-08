import Link from 'next/link'
import { Campo } from '@/components/campo/Campo'
import { Placeholder } from '@/components/Placeholder'
import { Quota } from '@/components/Quota'
import { RUOLI } from '@/lib/contenuti/schema'
import { hrefPercorso, righeIntervento, servizioDelPercorso } from '@/lib/percorsi'
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
export function Hero({
  variante,
  interventoIniziale = null,
}: {
  variante: 'foto' | 'domanda'
  /**
   * Solo per `domanda`: la riga già scelta da `?intervento=`. È l'unica ragione
   * per cui una riga può nascere spuntata — è una scelta che il visitatore ha
   * già fatto altrove, non una che gli mettiamo in bocca noi.
   */
  interventoIniziale?: string | null
}) {
  return variante === 'foto' ? (
    <HeroFoto />
  ) : (
    <HeroDomanda interventoIniziale={interventoIniziale} />
  )
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

/* -------------------------------------------------------------------------- */

/**
 * Hero B — «Lo strumento». **È il passo 1 del brief**, e questo è il
 * meccanismo dell'intera proposta (`DECISIONI.md` n. 31).
 *
 * Le sei righe sono `radio` con `name="intervento"` e `form="brief-form"`: sono
 * membri del form che sta in fondo alla pagina, anche se stanno cinquemila
 * pixel più su. L'attributo `form` include un controllo posseduto da un form
 * fuori dal suo sottoalbero, quindi la risposta entra in `FormData` da sé.
 * Costo: **zero byte di JavaScript**. E A non lo può fare — non ha una domanda
 * in hero, non ha uno stato da propagare: è il primo meccanismo di questa fase
 * che non è né colore né scala.
 *
 * ## Tre cose che sono cambiate, e nessuna è cosmetica
 *
 * **1. Le righe sono sei, non cinque.** Sono esattamente le sei risposte del
 * passo 1 (`lib/percorsi.ts` → `righeIntervento`, costruite da `passi[0]`). Se
 * fossero cinque, il gruppo della hero e quello del brief sarebbero due gruppi
 * diversi con lo stesso nome, e il brief riceverebbe un valore che non sa
 * validare. Deviazione dichiarata dai «5 bottoni» di `CLAUDE.md` § Homepage
 * blocco 2: vale **solo** per B, lo smistamento di A resta a cinque.
 *
 * **2. Non c'è più `defaultChecked`.** Prima la riga 02 era spuntata di serie
 * («per far vedere il pannello»). Unita al brief, quella riga avrebbe spedito
 * allo studio `intervento: ristrutturazione o ampliamento` **scritto da noi**
 * a ogni invio di chi non ha toccato la hero — su un sito la cui azione
 * primaria è il brief *qualificato*, un dato falso alla fonte, che finisce
 * anche nell'oggetto della mail. Al primo caricamento non c'è nessuna scelta e
 * nessun pannello aperto. L'unica eccezione è `?intervento=`, che è una scelta
 * che il visitatore ha già fatto altrove.
 *
 * **3. La riga scelta non «diventa un foglio».** Non serve più: in B il foglio
 * c'è già ed è uno solo (`components/campo/Campo.tsx`). Il segnale è quello di
 * AS misurato — **l'opacità come gerarchia** — più un filetto che *porta uno
 * stato*: appena si sceglie, le altre righe scendono al pavimento
 * `--regolo-attenua` (0,60 → 5,74:1, AA) e la scelta prende il filetto.
 * Finché non si sceglie niente, tutte le righe stanno allo stesso livello: la
 * pagina non attenua qualcosa prima che ci sia un motivo.
 *
 * Il ripiego senza `:has()` non è cambiato di forma ma di verso: prima mostrava
 * **un** pannello mentre niente era spuntato — cioè una bugia. Ora li mostra
 * **tutti e sei** aperti: una lista espansa è una degradazione onesta.
 */
function HeroDomanda({ interventoIniziale }: { interventoIniziale?: string | null }) {
  return (
    <Campo primo id="percorsi" etichetta="il punto di partenza" className="campo-hero">
      <h1 className="hero-domanda">Che intervento hai in mente?</h1>
      <p className="hero-lead">
        Scegli il tuo caso: ti diciamo subito cosa comprende, come si svolge e cosa serve da parte
        tua. Ingegneria civile e architettura, a {site.citta}.
      </p>

      {/* La quota, forma «registro»: le stesse tre condizioni e lo stesso
          numero contato dal repo, disegnato con l'altro strumento. Niente
          filetto per voce e niente terminatore obliquo a 45° — quelli sono la
          firma di A, e un motivo grafico condiviso identico da due proposte non
          è il motivo di nessuna delle due (`components/Quota.tsx`). */}
      <Quota
        voci={RUOLI}
        numero={RUOLI.length}
        unita="ruoli"
        forma="registro"
        className="hero-quota-registro"
      />

      {/* Un `radiogroup` etichettato dall'`h1`: la domanda è già in pagina, e
          ripeterla in una `legend` la farebbe sentire due volte.
          Ogni riga e il suo pannello sono **interlacciati**: così la regola
          `:has()` è una sola invece di sei, e il pannello è il fratello
          immediatamente successivo alla riga scelta. */}
      <div className="registro" role="radiogroup" aria-label="Che intervento hai in mente?">
        {righeIntervento.map((r) => {
          const servizio = r.percorso ? servizioDelPercorso(r.percorso) : null
          return (
            <div key={r.intervento} className="registro-coppia">
              <label className="riga" htmlFor={`percorso-${r.intervento}`}>
                <span className="riga-scelta">
                  <input
                    type="radio"
                    id={`percorso-${r.intervento}`}
                    name="intervento"
                    value={r.intervento}
                    /* Il legame con il brief in fondo alla pagina. Non è una
                       scorciatoia: è il meccanismo. */
                    form="brief-form"
                    defaultChecked={interventoIniziale === r.intervento}
                  />
                  <span className="riga-nome">{r.etichetta}</span>
                </span>
                {/* Il tecnicismo, che è il sottotitolo del servizio: la stessa
                    relazione esito/tecnicismo dei sei servizi. «Altro» non ne
                    ha uno, e la cella resta vuota — come AS, che spedisce la
                    tabella con i buchi invece di riempirli. */}
                <span className="riga-ruolo">{servizio ? servizio.sottotitolo : ''}</span>
              </label>

              {r.percorso && servizio ? (
                <div className="pannello" data-percorso={r.intervento}>
                  <div>
                    <p className="pannello-chiave" id={`${r.intervento}-comprende`}>
                      cosa comprende
                    </p>
                    <ul aria-labelledby={`${r.intervento}-comprende`}>
                      {r.percorso.comprende.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="pannello-chiave" id={`${r.intervento}-svolge`}>
                      come si svolge
                    </p>
                    <ul aria-labelledby={`${r.intervento}-svolge`}>
                      {r.percorso.svolge.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="pannello-chiave" id={`${r.intervento}-serve`}>
                      cosa serve da te
                    </p>
                    <ul aria-labelledby={`${r.intervento}-serve`}>
                      {r.percorso.serve.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pannello-azioni">
                    {/* In B il brief è **nella stessa pagina** e la risposta è
                        già data: l'ancora ci porta, non ricomincia. */}
                    <a href="#brief" className="btn">
                      Raccontaci il progetto
                    </a>
                    <Link href={hrefPercorso(r.percorso)} className="pannello-vai">
                      {servizio.titolo}
                    </Link>
                  </div>
                </div>
              ) : (
                /* «Altro» non ha un pannello, e non gliene inventiamo uno: non
                   è un percorso, è la risposta di chi non si riconosce negli
                   altri cinque. Porta solo al brief, dove lo racconta. */
                <div className="pannello pannello-scarno" data-percorso={r.intervento}>
                  <p>Raccontacelo nel brief: cinque domande, e la prima l’hai già risposta.</p>
                  <div className="pannello-azioni">
                    <a href="#brief" className="btn">
                      Raccontaci il progetto
                    </a>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <p className="nota-cantiere">
        Gli elenchi «cosa serve da te» sono una proposta: quali documenti servano davvero per
        partire lo dice lo studio, servizio per servizio.
      </p>
    </Campo>
  )
}
