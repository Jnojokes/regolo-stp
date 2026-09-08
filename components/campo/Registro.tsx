import Link from 'next/link'
import { hrefPercorso, righeIntervento, servizioDelPercorso } from '@/lib/percorsi'

/**
 * **Il registro: sei righe che sono il passo 1 del brief.**
 *
 * È il meccanismo di tutte le proposte diverse da A, ed è l'unica cosa che
 * hanno davvero in comune — di proposito. Le sei righe sono `radio` con
 * `name="intervento"` e `form="brief-form"`, cioè membri del form che sta in
 * fondo alla pagina: scegliendo si apre il pannello, la riga della scheda dei
 * sei percorsi resta a inchiostro pieno mentre le altre si attenuano, la riga
 * di lettura del brief scrive la risposta, e il brief comincia a «passo 2 di 5».
 * **Zero byte di JavaScript**, e funziona anche a JS spento.
 *
 * Sta in un componente proprio perché B, C e D lo compongono in tre cornici
 * diverse — sotto una domanda a 160 px, sotto un marchio in serif su una
 * fotografia, sotto un paragrafo bianco su una fotografia — e il meccanismo non
 * deve dipendere dalla cornice. Se un giorno le proposte diventano cinque,
 * questo file non si tocca.
 *
 * Le righe sono **sei** e non cinque: sono esattamente le sei risposte del
 * passo 1 (`lib/brief/domande.ts`). Con cinque, il gruppo della hero e quello
 * del brief sarebbero due gruppi diversi con lo stesso nome.
 *
 * Niente `defaultChecked`: al primo caricamento non c'è nessuna scelta e nessun
 * pannello aperto. Unendo i gruppi, una riga spuntata di serie manderebbe allo
 * studio un `intervento` **scritto da noi** a ogni brief di chi non ha toccato
 * la hero — anche nell'oggetto della mail.
 */
export function Registro({
  interventoIniziale = null,
  etichettaGruppo = 'Che intervento hai in mente?',
}: {
  /** La riga già scelta da `?intervento=`: l'unica ragione per cui una riga nasce spuntata. */
  interventoIniziale?: string | null
  /** Il nome accessibile del gruppo: ogni tema lo introduce con parole sue. */
  etichettaGruppo?: string
}) {
  return (
    <>
      {/* Un `radiogroup` etichettato dall'`h1`: la domanda è già in pagina, e
        ripeterla in una `legend` la farebbe sentire due volte.
        Ogni riga e il suo pannello sono **interlacciati**: così la regola
        `:has()` è una sola invece di sei, e il pannello è il fratello
        immediatamente successivo alla riga scelta. */}
      <div className="registro" role="radiogroup" aria-label={etichettaGruppo}>
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
    </>
  )
}
