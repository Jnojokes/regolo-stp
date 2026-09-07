'use client'

import { useState, useSyncExternalStore } from 'react'
import { Placeholder } from '@/components/Placeholder'

/* Riferimenti stabili: `useSyncExternalStore` li confronta a ogni render. */
const nessunaSottoscrizione = () => () => {}
const snapshotClient = () => true
const snapshotServer = () => false

/**
 * Il confronto prima/dopo: due immagini sovrapposte e un `clip-path` guidato da
 * un `input[type=range]`. Niente librerie (catalogo blocchi B4).
 *
 * ## Perché il cursore compare solo dopo l'idratazione
 *
 * Il `clip-path` lo muove JavaScript: senza JS un `input[type=range]` in pagina
 * sarebbe un controllo che si può afferrare e che non fa niente — peggio che
 * non averlo. Quindi senza JS non c'è: si vedono le due metà tagliate al 50 %,
 * entrambe etichettate, che è un contenuto leggibile e onesto. Con JS il
 * cursore appare e funziona, anche da tastiera (frecce, Home, Fine: se lo
 * occupa `input[type=range]` di suo).
 *
 * È la stessa regola del brief: quello che la piattaforma non sa fare da sola
 * non si finge, si dichiara.
 *
 * ## Perché non è un'animazione
 *
 * `--x` cambia solo quando una persona muove il cursore. Non c'è nessuna
 * transizione: il taglio segue il dito senza ritardo, e
 * `prefers-reduced-motion` non ha niente da spegnere.
 */
export function Confronto({ prima, dopo }: { prima: string; dopo: string }) {
  const montato = useSyncExternalStore(nessunaSottoscrizione, snapshotClient, snapshotServer)
  const [x, setX] = useState(50)

  return (
    <>
      <div className="prima-dopo" style={{ '--x': `${x}%` } as React.CSSProperties}>
        <Placeholder label={prima} />
        <Placeholder label={dopo} className="prima-dopo-dopo" />

        {montato && (
          <>
            <div className="prima-dopo-maniglia" aria-hidden="true" />
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={x}
              onChange={(e) => setX(Number(e.currentTarget.value))}
              aria-label="Confronto fra prima e dopo"
              aria-valuetext={`${x}% del dopo visibile`}
            />
          </>
        )}
      </div>

      {/* Il suggerimento esiste solo se il controllo esiste. */}
      {montato && (
        <p className="text-muted text-small mt-3">Trascina, oppure usa le frecce da tastiera.</p>
      )}
    </>
  )
}
