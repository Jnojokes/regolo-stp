'use client'

import { useState, useSyncExternalStore } from 'react'

/* Riferimenti stabili: `useSyncExternalStore` li confronta a ogni render. */
const nessunaSottoscrizione = () => () => {}
const snapshotClient = () => true
const snapshotServer = () => false

/**
 * Il confronto prima/dopo: due metà sovrapposte e un `clip-path` guidato da un
 * `input[type=range]`. Niente librerie (catalogo blocchi B4).
 *
 * ## Fase 3 bis — il cursore taglia **tipografia**, non due rettangoli grigi
 *
 * È il blocco che più converte nel recupero edilizio, e finché non arrivano le
 * due fotografie dallo stesso punto di ripresa non prova niente
 * (`TODO-MEDIA.md`: «senza, il blocco non va online»). Prima le due metà erano
 * due segnaposto grigi sovrapposti: due tinte a 1,17:1 l'una dall'altra, cioè
 * un cursore che non rivelava **niente** — il blocco dimostrativo che non
 * dimostra.
 *
 * Ora le due metà sono **`grafite` e `calce`**, cioè il taglio sta a **21:1** e
 * si vede su qualunque schermo e da qualunque distanza. Il blocco dimostra **lo
 * strumento**, che è quello che si può dimostrare oggi; e la casella ha già la
 * sua misura per quando le foto arrivano — la specifica è scritta dentro.
 *
 * ## Perché il cursore compare solo dopo l'idratazione
 *
 * Il `clip-path` lo muove JavaScript: senza JS un `input[type=range]` in pagina
 * sarebbe un controllo che si può afferrare e che non fa niente — peggio che
 * non averlo. Quindi senza JS non c'è: si vedono le due metà tagliate al 50 %,
 * entrambe etichettate, che è un contenuto leggibile e onesto.
 *
 * **La lettura `50 %` invece si rende sempre**, anche senza JavaScript: è vera a
 * pagina ferma, ed è una *lettura di controllo*, non una quota — la distinzione
 * è di ecoLINEAR, che accanto alla quota `14.34 M — ESC 1:50` mette
 * `X 1.538 Y 2.410 · PLOT 23%`.
 *
 * ## Perché non è un'animazione
 *
 * `--x` cambia solo quando una persona muove il cursore. Non c'è nessuna
 * transizione: il taglio segue il dito senza ritardo, e
 * `prefers-reduced-motion` non ha niente da spegnere.
 */
export function Confronto({
  prima,
  dopo,
  specifica,
}: {
  prima: string
  dopo: string
  /** Cosa deve arrivare, e in che formato. Sta dentro le due metà. */
  specifica: string
}) {
  const montato = useSyncExternalStore(nessunaSottoscrizione, snapshotClient, snapshotServer)
  const [x, setX] = useState(50)

  return (
    <>
      <div className="confronto" style={{ '--x': `${x}%` } as React.CSSProperties}>
        <div className="confronto-meta confronto-prima">
          <span className="confronto-stato">stato attuale</span>
          <span className="confronto-specifica">{prima}</span>
          <span className="confronto-specifica">{specifica}</span>
        </div>

        <div className="confronto-meta confronto-dopo">
          <span className="confronto-stato">progetto</span>
          <span className="confronto-specifica">{dopo}</span>
          <span className="confronto-specifica">{specifica}</span>
        </div>

        {montato && (
          <>
            <div className="confronto-maniglia" aria-hidden="true" />
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={x}
              onChange={(e) => setX(Number(e.currentTarget.value))}
              aria-label="Confronto fra stato attuale e progetto"
              aria-valuetext={`${x}% del progetto visibile`}
            />
          </>
        )}
      </div>

      {/* La lettura c'è sempre: senza JavaScript dice 50 %, che è dove il taglio
          sta davvero. Il suggerimento invece esiste solo se il controllo esiste. */}
      <p className="confronto-lettura">
        <span data-numero="">{x} %</span>
        {montato ? <span> — trascina, oppure usa le frecce da tastiera</span> : null}
      </p>
    </>
  )
}
