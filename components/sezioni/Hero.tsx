import Link from 'next/link'
import { Placeholder } from '@/components/Placeholder'
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
 * `foto` — opzione A «Lo studio». Una fotografia di un'opera realizzata, il
 * payoff in due tempi, **una sola** CTA. Vende la competenza mostrandola: è la
 * lettura giusta se chi arriva ha già sentito il nome e sta decidendo se
 * fidarsi (CLAUDE.md § Obiettivo — il sito è il secondo contatto).
 *
 * `domanda` — opzione B «Il cantiere». Al posto dello slogan, la domanda che
 * smista: «Che intervento hai in mente?». È il blocco con il miglior rapporto
 * effetto/costo di tutto il catalogo (A3): personalizza il percorso senza
 * nessuna tecnologia, e chi risponde a una domanda ha già cominciato a
 * compilare il brief.
 *
 * ## Il pannello dell'opzione B cambia senza una riga di JavaScript
 *
 * I cinque percorsi sono `radio` nativi e i cinque pannelli stanno tutti nel
 * DOM; `:has()` accende quello scelto (`app/css/sezioni.css`). Costa ~2 KB di
 * HTML e in cambio:
 *  — funziona con JavaScript disattivato, che per il blocco che smista il
 *    traffico non è un dettaglio;
 *  — funziona da tastiera di serie, con le freccette, senza scrivere ARIA;
 *  — non aggiunge un byte al bundle.
 * Il prototipo usava `button` + `aria-pressed` + un `innerHTML`: senza JS non
 * mostrava niente. Questa è la stessa idea del `<datalist>` dei comuni nel
 * brief — il lavoro lo fa la piattaforma.
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
    <section className="hero-foto">
      {/* La foto è il contenuto, non una decorazione: quando arriva quella vera
          diventa un `next/image` con `priority` e `sizes="100vw"`, ed è l'LCP
          della pagina (TODO-MEDIA.md). Oggi è un rettangolo dichiarato. */}
      <Placeholder
        label="Fotografia di un’opera realizzata — dallo studio, non un render"
        className="absolute inset-0 h-full w-full"
      />

      <div className="hero-velo">
        <div className="wrap">
          <p className="eyebrow">
            Progettazione e direzione lavori · edifici nuovi ed esistenti · pubblici e privati
          </p>
          <h1 className="hero-payoff mt-4 max-w-[20ch]">
            Progettiamo e dirigiamo.
            <br />
            <em>Dal disegno al cantiere.</em>
          </h1>
          <p className="text-lead mt-5 max-w-[44ch]">
            Uno studio di ingegneria civile e architettura a {site.citta}. Progetto architettonico e
            strutturale, pratiche, cantiere: la stessa squadra, dall’idea alla consegna.
          </p>
          {/* Una sola CTA (CLAUDE.md § Homepage, blocco 1). Il telefono accanto
              non è una seconda CTA: è l'azione secondaria, e su mobile è spesso
              la prima in assoluto. */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href={ctaPrimaria.href} className="btn">
              {ctaPrimaria.label}
            </Link>
            <a href={`tel:${site.telefonoHref}`} className="text-muted text-small">
              oppure chiama · {site.telefono}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

function HeroDomanda() {
  return (
    <section className="hero-domanda sezione-filo border-b-line nav:pt-16 nav:pb-16 border-b pt-10 pb-12">
      <div className="wrap">
        <p className="quota quota-centrata">
          <span>Sez. 01 — Il punto di partenza</span>
        </p>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <h1 className="hero-payoff max-w-[16ch]">
            Che intervento
            <br />
            hai <em>in mente?</em>
          </h1>
          <p className="text-muted text-lead max-w-[40ch]">
            Scegli il tuo caso: ti diciamo subito cosa comprende, come si svolge e cosa serve da
            parte tua. Ingegneria civile e architettura, a {site.citta}.
          </p>
        </div>

        {/* Un `radiogroup` etichettato dall'`h1`: la domanda è già in pagina, e
            ripeterla in una `legend` la farebbe sentire due volte. */}
        <div className="percorsi" role="radiogroup" aria-label="Che intervento hai in mente?">
          {percorsi.map((p) => (
            <label key={p.intervento} className="percorso" htmlFor={`percorso-${p.intervento}`}>
              <span className="percorso-numero">
                <input
                  type="radio"
                  id={`percorso-${p.intervento}`}
                  name="percorso"
                  value={p.intervento}
                  defaultChecked={p.intervento === percorsoIniziale.intervento}
                />
                {p.numero}
              </span>
              <span className="percorso-nome">{p.etichetta}</span>
            </label>
          ))}
        </div>

        {/* I cinque pannelli, tutti serviti. Ne si vede uno: quello del percorso
            scelto. `data-iniziale` è il ripiego per i browser senza `:has()`. */}
        {percorsi.map((p) => {
          const servizio = servizioDelPercorso(p)
          const iniziale = p.intervento === percorsoIniziale.intervento
          return (
            <div
              key={p.intervento}
              className="pannello"
              data-percorso={p.intervento}
              data-iniziale={iniziale ? '' : undefined}
            >
              <div>
                {/* Il nome del percorso ripete il controllo scelto qui sopra:
                    non è un titolo, e come titolo si sentirebbe due volte. */}
                <p className="pannello-titolo">{p.etichetta}</p>
                {/* I tre scomparti sono **etichette di elenco**, non titoli di
                    sezione. Come `h3` salterebbero un livello — l'unico titolo
                    sopra è l'`h1` della domanda — e Lighthouse lo segnala giusto.
                    Un `aria-labelledby` sull'elenco dà l'associazione senza
                    inventare un livello di gerarchia che non esiste. */}
                <p className="pannello-chiave" id={`${p.intervento}-comprende`}>
                  Cosa comprende
                </p>
                <ul aria-labelledby={`${p.intervento}-comprende`}>
                  {p.comprende.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
                <Link href={hrefBrief(p)} className="btn">
                  Raccontaci il progetto
                </Link>
              </div>

              <div>
                <p className="pannello-chiave" id={`${p.intervento}-svolge`}>
                  Come si svolge
                </p>
                <ul aria-labelledby={`${p.intervento}-svolge`}>
                  {p.svolge.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="pannello-chiave" id={`${p.intervento}-serve`}>
                  Cosa serve da te
                </p>
                <ul aria-labelledby={`${p.intervento}-serve`}>
                  {p.serve.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
                <p className="text-small mt-4">
                  <Link
                    href={hrefPercorso(p)}
                    className="underline decoration-1 underline-offset-4"
                  >
                    {servizio.titolo}
                  </Link>
                </p>
              </div>
            </div>
          )
        })}

        <p className="nota-cantiere">
          Gli elenchi «cosa serve da te» sono una proposta: quali documenti servano davvero per
          partire lo dice lo studio, servizio per servizio.
        </p>
      </div>
    </section>
  )
}
