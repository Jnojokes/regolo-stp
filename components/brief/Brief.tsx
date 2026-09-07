import { comuni } from '@/lib/brief/comuni'
import { site } from '@/lib/site'
import { BriefForm } from './BriefForm'

/**
 * Il blocco di conversione (catalogo blocchi F1): il più importante del sito, e
 * l'unica cosa che il sito deve davvero ottenere. Si costruisce per primo, e
 * tutto il resto è la strada che porta qui.
 *
 * Componente riusabile: sta in fondo alla home (in entrambe le opzioni) e in
 * `/contatti`. Il tema non lo tocca — cambiano i token, non il markup.
 *
 * Il `<datalist>` dei 128 comuni si disegna **qui**, lato server, e il form lo
 * punta con `list=`. Così l'autocomplete è nativo (funziona senza JavaScript,
 * da tastiera, e su mobile usa la tendina del sistema) e i nomi stanno
 * nell'HTML servito invece che nel bundle JavaScript.
 */
export function Brief({
  pagina,
  interventoIniziale = null,
  quota = 'Raccontaci il progetto',
}: {
  /** La pagina che ospita il blocco: finisce nella registrazione del consenso. */
  pagina: string
  /** Il passo 1 precompilato da `?intervento=`, già validato lato server. */
  interventoIniziale?: string | null
  /**
   * L'occhiello del blocco. Nell'opzione B le sezioni sono numerate («Sez. 01 —
   * …») e il brief è la settima: senza questa prop la serie si interrompeva
   * proprio sul blocco che deve convertire, e il prototipo B numera anche
   * quello. In A e in `/contatti` resta l'occhiello normale.
   */
  quota?: string
}) {
  return (
    <section id="brief" className="brief">
      <div className="wrap nav:grid-12 nav:gap-16 nav:py-28 grid gap-10 py-16">
        <div className="nav:col-span-5 nav:self-start">
          <p className="eyebrow brief-occhiello">{quota}</p>
          <h2 className="mt-3">Cinque domande. Poi vi richiamiamo noi.</h2>
          <p className="brief-lead text-lead mt-5 max-w-[40ch]">
            Non è un «contattaci»: è un brief. Un minuto, una domanda per volta, e i dati personali
            solo all’ultimo passo. Alla fine sappiamo già cosa serve e la prima telefonata parte dal
            punto giusto.
          </p>
          <p className="brief-lead text-small mt-8">
            Preferisci parlarne subito?{' '}
            <a href={`tel:${site.telefonoHref}`} className="brief-telefono">
              {site.telefono}
            </a>
          </p>
        </div>

        <div className="nav:col-span-7">
          <BriefForm pagina={pagina} interventoIniziale={interventoIniziale} idComuni={ID_COMUNI} />
        </div>
      </div>

      {/* Fuori dal form, e fuori dal componente client: 128 <option> nell'HTML,
          zero byte nel bundle. */}
      <datalist id={ID_COMUNI}>
        {comuni.map((c) => (
          <option key={`${c.provincia}-${c.nome}`} value={c.nome}>
            {c.nome} ({c.provincia})
          </option>
        ))}
      </datalist>
    </section>
  )
}

const ID_COMUNI = 'elenco-comuni'
