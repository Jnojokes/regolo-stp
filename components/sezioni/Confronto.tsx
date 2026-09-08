'use client'

import { useState, useSyncExternalStore } from 'react'
import { MediaEsempio } from '@/components/MediaEsempio'
import { esempio, type ChiaveEsempio } from '@/lib/media-demo'

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
 * Ora le due metà cadono sui **due piani** del tema, cioè il taglio sta a **21:1** e
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
 * ## Il movimento, e perché qui è **l'unica** eccezione di B
 *
 * La regola di B è che nessuna animazione comincia perché la pagina ha scorso:
 * il movimento è la risposta a un'azione. Qui l'eccezione è una, e non è una
 * decorazione — **ripara un difetto**. Senza JavaScript il cursore non viene
 * reso (sarebbe un controllo morto) e il blocco «wow» resta fermo a 50 %: una
 * fotografia divisa a metà che non dimostra niente. Con
 * `animation-timeline: view()` il taglio **si rivela scorrendo**, cioè fa
 * quello che il controllo farebbe se ci fosse.
 *
 * Tre condizioni, tutte in `app/css/campi.css`:
 * la regola sta dentro `@supports (animation-timeline: view())`, e fuori di lì
 * lo stato scritto nel CSS è quello finito; **niente `animation-fill-mode:
 * both`**, che è la trappola con cui questa tecnica lascia il contenuto
 * bloccato sul primo fotogramma dove la dichiarazione cade; e l'animazione si
 * spegne al primo `input` (`data-guidato`), perché una dichiarazione di
 * animazione batte lo stile inline nella cascata.
 *
 * Supporto verificato l'08/09/2026 (web-features explorer): Chrome/Edge 115+,
 * Safari e Safari iOS 26+, **Firefox non supportato** — è ciò che blocca il
 * Baseline da settembre 2025. Dove manca, il blocco resta esattamente com'era:
 * `--x` vale 50 % e il cursore funziona. Nessuna dipendenza.
 *
 * Quando il cursore è in mano a una persona non c'è nessuna transizione: il
 * taglio segue il dito senza ritardo.
 */
export function Confronto({
  prima,
  dopo,
  specifica,
  demoPrima,
  demoDopo,
}: {
  prima: string
  dopo: string
  /** Cosa deve arrivare, e in che formato. Sta dentro le due metà. */
  specifica: string
  /** Le due fotografie di esempio, se la dimostrazione è accesa. */
  demoPrima?: ChiaveEsempio
  demoDopo?: ChiaveEsempio
}) {
  const ePrima = esempio(demoPrima)
  const eDopo = esempio(demoDopo)
  const montato = useSyncExternalStore(nessunaSottoscrizione, snapshotClient, snapshotServer)
  const [x, setX] = useState(50)
  /* Appena qualcuno tocca il cursore, la rivelazione allo scorrimento si spegne
     e non torna. Non è una raffinatezza: **una dichiarazione di animazione
     batte lo stile inline nella cascata**, quindi senza questo il taglio
     continuerebbe a essere guidato dallo scorrimento mentre il dito lo
     trascina — cioè il controllo smetterebbe di controllare. */
  const [guidato, setGuidato] = useState(true)

  return (
    <>
      <div
        className="confronto"
        data-guidato={guidato ? '' : undefined}
        style={{ '--x': `${x}%` } as React.CSSProperties}
      >
        {/* Le immagini stanno **fuori** dalle due metà con `clip-path`, in un
            piano sotto: il taglio deve rivelare la fotografia, non spostarla.
            Ognuna sta dentro la sua metà, quindi eredita il ritaglio da lei. */}
        <div className="confronto-meta confronto-prima">
          {ePrima ? <MediaEsempio dato={ePrima} priorita={false} /> : null}
          <span className="confronto-stato">stato attuale</span>
          <span className="confronto-specifica">{prima}</span>
          <span className="confronto-specifica">{specifica}</span>
        </div>

        <div className="confronto-meta confronto-dopo" data-piano="foglio">
          {eDopo ? <MediaEsempio dato={eDopo} priorita={false} /> : null}
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
              onChange={(e) => {
                setGuidato(false)
                setX(Number(e.currentTarget.value))
              }}
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

      {/* La provenienza sta **sotto** il riquadro e non sopra le fotografie.
          Dentro era una targhetta lunga sul bordo alto: a 1440 stava, a 390
          andava a capo e copriva la testa di tutt'e due le metà. Qui è una
          riga di metadati accanto alla lettura del cursore, che è esattamente
          quello che è. */}
      {ePrima || eDopo ? (
        <p className="confronto-fonte">
          esempio ·{' '}
          {[ePrima, eDopo]
            .filter(Boolean)
            .map((e) => e!.autore)
            .join(' / ')}{' '}
          · StockSnap.io · CC0 1.0
        </p>
      ) : null}
    </>
  )
}
