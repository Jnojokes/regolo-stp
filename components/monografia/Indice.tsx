import { righeIntervento, servizioDelPercorso } from '@/lib/percorsi'

/**
 * **L'indice del monografico: sei voci che sono il passo 1 del brief.**
 *
 * ## Che cos'era e cosa è
 *
 * Era `components/campo/Registro.tsx`, il meccanismo dell'opzione B: sei righe
 * più **sei pannelli** con `comprende` / `svolge` / `serve` letti da
 * `lib/percorsi.ts`. Misurato sul build: **2.179 caratteri, il 19 % di tutta la
 * pagina di D** — il secondo blocco più verboso dopo il brief. Il committente ha
 * chiesto *«molto meno copy e più media»* e *«troppo testo, non penso avremo
 * tutto questo da scrivere»*, e questo era il posto dove il testo si accumulava.
 *
 * I pannelli **non ci sono più**, e non è un taglio a caso: un indice non
 * spiega, **rimanda**. Le sei voci restano, con il numero e il tecnicismo, come
 * il sommario di un fascicolo. Chi vuole sapere cosa comprende un percorso
 * clicca e legge la pagina servizio, che è dove quel contenuto vive già.
 *
 * ## Il meccanismo non si tocca
 *
 * Le sei voci sono `radio` nativi con `name="intervento"` e
 * `form="brief-form"`: sono membri del form che sta in fondo alla pagina, anche
 * se nel DOM stanno duemila pixel più su. La risposta entra in `FormData` da
 * sé, **zero byte di JavaScript**, e il brief comincia a «passo 2 di 5». È il
 * gesto che A e C non hanno — A perché la sua hero è una fotografia e un payoff,
 * C perché il suo funnel parte dal brief per scelta (`DECISIONI.md` n. 40 e la
 * pagina di C).
 *
 * La scelta si **vede** senza pannelli: la voce scelta resta a inchiostro pieno
 * e le altre si attenuano, con `:has()` — Baseline da dicembre 2023 e già in
 * produzione in questa pagina. È il minimo perché un controllo non sia muto, e
 * costa zero caratteri.
 *
 * Le voci sono **sei** e non cinque: sono esattamente le sei risposte del passo
 * 1 (`lib/brief/domande.ts`). Con cinque, il gruppo dell'indice e quello del
 * brief sarebbero due gruppi diversi con lo stesso nome.
 *
 * Niente `defaultChecked` se non arriva da `?intervento=`: unendo i gruppi, una
 * voce spuntata di serie manderebbe allo studio un `intervento` **scritto da
 * noi** a ogni brief di chi non ha toccato l'indice, anche nell'oggetto della
 * mail.
 */
export function Indice({
  interventoIniziale = null,
  etichettaGruppo = 'Che intervento hai in mente?',
}: {
  /** La voce già scelta da `?intervento=`: l'unica ragione per cui nasce spuntata. */
  interventoIniziale?: string | null
  /** Il nome accessibile del gruppo. */
  etichettaGruppo?: string
}) {
  return (
    <ol className="indice-monografia" role="radiogroup" aria-label={etichettaGruppo}>
      {righeIntervento.map((r, i) => {
        const servizio = r.percorso ? servizioDelPercorso(r.percorso) : null
        return (
          <li key={r.intervento}>
            <label className="indice-voce" htmlFor={`percorso-${r.intervento}`}>
              {/* Il numero di voce dell'indice. In un sommario numerare è
                  legittimo — le voci hanno un ordine di lettura — mentre nello
                  smistamento di A no, perché sei alternative mutuamente
                  esclusive non hanno un primo e un ultimo. */}
              <span className="indice-numero" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
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
              <span className="indice-nome">{r.etichetta}</span>
              {/* Il tecnicismo: la stessa relazione esito/tecnicismo dei sei
                  servizi. «Altro» non ne ha uno e la cella resta **vuota**, come
                  in AS Associates, che spedisce la tabella con i buchi invece di
                  riempirli. */}
              <span className="indice-tecnicismo">{servizio ? servizio.sottotitolo : ''}</span>
            </label>
          </li>
        )
      })}
    </ol>
  )
}
