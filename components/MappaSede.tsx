import { VIEWBOX, province, sede } from '@/lib/territorio'

/**
 * La mappa statica della sede, nel footer.
 *
 * **È un ritaglio dello stesso SVG del territorio**, centrato su Fermo. Non è
 * un'immagine, non è un tile, non è un iframe:
 *
 * - **zero richieste e zero byte in più**: la geometria è già nel bundle
 *   (`lib/territorio.ts`), e qui si riusa cambiando solo il `viewBox`;
 * - **zero terzi**: un tile server è qualcuno che vede l'indirizzo IP di chi
 *   visita, quindi una voce in più nell'informativa e — con un consenso — un
 *   gate davanti alla mappa. La decisione del 07/09 lo esclude, e questo la
 *   rispetta anche nel footer, che era rimasto un rettangolo dichiarato;
 * - **si ritematizza**: usa i token della mappa, quindi segue i due temi.
 *
 * Il ritaglio è 21/6 — largo e basso — perché su `/contatti` c'è già una mappa
 * 4/3 nella sezione «dove siamo», e due riquadri identici a una schermata di
 * distanza sembrano un errore di impaginazione, non due mappe.
 *
 * Il rettangolo lo si è potuto togliere **perché il dato c'era già**: l'unico
 * segnaposto che questa fase ha davvero eliminato è quello che non aspettava
 * niente dal cliente. Gli altri restano campi dichiarati, ed è giusto così.
 */
export function MappaSede() {
  /* Una finestra centrata sulla sede, con il
     rapporto della striscia. I valori sono ritagliati dentro il viewBox, così
     la finestra non esce mai dal disegno. Il 62 % è la larghezza in cui la
     sede si legge **dentro un contesto**: al 40 % il ritaglio mostrava la
     costa e poco altro, e una mappa che non si riconosce non è una mappa. */
  const larghezza = VIEWBOX.larghezza * 0.62
  const altezza = larghezza * (6 / 21)
  const x = Math.min(Math.max(sede.x - larghezza / 2, 0), VIEWBOX.larghezza - larghezza)
  const y = Math.min(Math.max(sede.y - altezza / 2, 0), VIEWBOX.altezza - altezza)

  return (
    <svg
      className="mappa-sede-footer"
      viewBox={`${x} ${y} ${larghezza} ${altezza}`}
      role="img"
      aria-label="Il territorio intorno alla sede di Fermo, con la sede segnata."
    >
      {province.map((p) => (
        <path key={p.sigla} className="mappa-perimetro" d={p.d} />
      ))}
      {/* La croce di quota al posto del pallino: è il segno con cui si marca un
          punto su una tavola, ed è lo stesso apparato del resto del sito. */}
      <g className="mappa-croce">
        <line x1={sede.x - 9} y1={sede.y} x2={sede.x + 9} y2={sede.y} />
        <line x1={sede.x} y1={sede.y - 9} x2={sede.x} y2={sede.y + 9} />
      </g>
    </svg>
  )
}
