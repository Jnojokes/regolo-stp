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
  etichetta = 'il brief',
  passo1Esterno = false,
  quotaForma = 'misura',
}: {
  /** La pagina che ospita il blocco: finisce nella registrazione del consenso. */
  pagina: string
  /** Il passo 1 precompilato da `?intervento=`, già validato lato server. */
  interventoIniziale?: string | null
  /**
   * L'etichetta del blocco, fra parentesi quadre e in minuscolo come tutte le
   * altre. Prima era la «quota» numerata dell'opzione B («Sez. 07 — Il brief»):
   * un numero che il lettore conta a vista, quindi non una quota — la sola
   * quota di questo blocco è la barra di avanzamento, «passo n di 5», che è
   * l'unica quantità del sito che cambia (`components/Quota.tsx`).
   */
  etichetta?: string
  /**
   * L'opzione B: il passo 1 è la hero, e qui diventa una riga di lettura.
   * Vedi `components/brief/BriefForm.tsx`.
   */
  passo1Esterno?: boolean
  /** La forma della quota di avanzamento: `misura` in A, `registro` in B. */
  quotaForma?: 'misura' | 'registro'
}) {
  return (
    <section id="brief" className="brief">
      <div className="wrap brief-griglia">
        <div className="brief-testo">
          <p className="eyebrow brief-occhiello">{etichetta}</p>
          <h2 className="mt-3">
            {passo1Esterno
              ? 'La prima l’hai già risposta. Ne restano quattro.'
              : 'Cinque domande. Poi vi richiamiamo noi.'}
          </h2>
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

        <div className="brief-colonna-scheda">
          <BriefForm
            pagina={pagina}
            interventoIniziale={interventoIniziale}
            idComuni={ID_COMUNI}
            passo1Esterno={passo1Esterno}
            quotaForma={quotaForma}
          />
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
