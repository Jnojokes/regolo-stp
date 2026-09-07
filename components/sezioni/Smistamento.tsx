import Link from 'next/link'
import { Sezione } from '@/components/sezioni/Sezione'
import { hrefPercorso, percorsi, servizioDelPercorso } from '@/lib/percorsi'

/**
 * Smistamento a domanda (CLAUDE.md § Homepage, blocco 2 · catalogo blocchi A3).
 *
 * È il secondo percorso di conversione del sito: chi arriva sa cosa ha in
 * mente, non sa come si chiama, e questo blocco glielo dice — e lo porta alla
 * pagina del servizio con il passo 1 del brief già scelto.
 *
 * ## Fase 3 bis — cinque righe di indice, non cinque pastiglie
 *
 * Erano cinque pastiglie identiche con bordo e raggio, in fila. `CLAUDE.md`
 * chiede «5 bottoni», e il bersaglio resta: **ogni riga è un `<a>` a piena
 * larghezza, alta 60 px**, con la sottolineatura al passaggio. Ma cinque
 * pastiglie uguali in fila sono il cluster n. 4, e in una pagina il cui unico
 * apparato è la quota leggevano come un pezzo di un altro sito.
 *
 * Le righe portano il **ruolo firmabile** spinto al bordo destro, con il vuoto
 * in mezzo: è la riga di metadati di Pelizzari misurata, ed è anche il primo
 * posto in cui chi legge vede che lo studio firma cinque cose diverse.
 *
 * **Nessuna quota e nessun conteggio**: «5 risposte» si conta a vista, e gli
 * elenchi di `lib/percorsi.ts` sono una *nostra proposta*, non un dato dello
 * studio — appenderne il conteggio come misura sarebbe la regola 1 violata dal
 * meccanismo nato per non violarla.
 *
 * La query string sta sul **secondo** salto (decisione del 07/09): la pastiglia
 * porta al servizio, e la CTA del servizio porta al brief con `?intervento=`.
 */
export function Smistamento({ id = 'smistamento' }: { id?: string }) {
  return (
    <Sezione
      id={id}
      passo="corto"
      etichetta="da dove si parte"
      titolo="Che intervento hai in mente?"
      nota="Ogni voce apre la pagina del servizio e imposta già la prima domanda del brief."
    >
      <ul className="indice" role="list">
        {percorsi.map((percorso) => {
          const servizio = servizioDelPercorso(percorso)
          return (
            <li key={percorso.slug}>
              <Link className="voce" href={hrefPercorso(percorso)}>
                <span className="voce-corpo">
                  <span className="voce-esito">{percorso.etichetta}</span>
                </span>
                <span className="voce-coda">{servizio.sottotitolo}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </Sezione>
  )
}
