/**
 * La quota — l'apparato di misura del disegno tecnico, e l'unico motivo grafico
 * del sito (`DECISIONI.md` n. 17).
 *
 * ## Perché un componente e non una classe CSS
 *
 * Perché la regola va **imposta**, non ricordata. Alla fase 3 lo stesso apparato
 * era già in pagina come occhiello — «SEZ. 01 — IL PUNTO DI PARTENZA» in
 * maiuscoletto monospace, centrato fra due filetti che non misuravano niente
 * (`kit/reference/_prima/B-1440-hero.jpeg`) — cioè decorazione travestita da
 * informazione, che è la definizione del cluster n. 5. Il modo in cui un
 * apparato tecnico torna ornamentale è che *nessuno controlla il numero*.
 *
 * Una quota si disegna **solo se passa tre condizioni**:
 *
 *  1. **due estremi** che coincidono con i bordi di un oggetto reale in pagina;
 *  2. **un'annotazione che è un numero che il repo può contare** — non una
 *     stringa scritta a mano: `RUOLI.length`, `comuni.length`, `passi.length`;
 *  3. **una quantità che il visitatore non conta a vista.** È la condizione che
 *     mancava, ed è quella che fa la differenza: `4 voci`, `6 servizi`,
 *     `5 fasi`, `5 livelli` sono numeri veri e verificabili che il lettore conta
 *     guardando lo schermo, sotto una quota che glieli dichiara. Inutili.
 *
 * Tutte tre, o il filetto non si disegna. In tutto il sito ne restano **tre**:
 * `5 ruoli` (le due hero), `128 comuni · FM 40 · MC 55 · AP 33` (territorio in
 * A, footer in B), `passo n di 5` (il brief — l'unica che si muove, perché è
 * l'unico posto dove la quantità cambia). Header, persone e barra CTA mobile
 * **non ne hanno**, ed è il controllo della regola: se in pagina le quote sono
 * più di tre, la regola è stata violata.
 *
 * Il tipo di `numero` è `number` e non `string` proprio per questo: una quota
 * senza un numero non compila.
 *
 * ## Come è disegnata
 *
 * Le tacche cadono dove finisce ogni etichetta, quindi sono **disuguali per
 * costruzione**: il filetto è la somma dei bordi delle voci, e ogni voce prende
 * la sua larghezza naturale più una quota uguale dello spazio libero. Nessun
 * calcolo in JavaScript e nessuna misura cablata: se una parola cambia, la
 * tacca si sposta. È il gesto di Dieste (il menu che è un filetto a tutta
 * larghezza con le parole appese sotto e la voce corrente segnata), non quello
 * di ecoLINEAR: il terminatore è il **tratto obliquo a 45°** delle scale
 * architettoniche (ISO 129-1), non la freccia delle scale meccaniche.
 *
 * A 390 px le voci si incolonnano e ognuna porta il suo filetto: la quota non
 * si spegne su mobile, cambia forma (`CLAUDE.md` § Regole, 5).
 *
 * ## La `forma` non c'è più, e il perché vale la pena
 *
 * Alla fase 3 ter la quota aveva due forme: `misura` (filetto + terminatore
 * obliquo a 45° ISO 129-1) per A, e `registro` (etichetta a sinistra, valore
 * incolonnato a destra, nessun terminatore) per l'opzione B — perché una quota
 * condivisa **identica** da due proposte non è il motivo grafico di nessuna
 * delle due (`DECISIONI.md` n. 34). Uscita B (n. 39), la seconda forma non ha
 * più chiamanti, e una prop con un valore solo non è un'astrazione.
 *
 * **Ma il problema che risolveva è rimasto, e va detto qui perché è dove
 * qualcuno lo cercherà**: il terminatore obliquo sta nella regola base
 * `.quota > *::before` (`app/css/sezioni.css`), che **non è isolata per tema**.
 * Finché l'override viveva in `.quota-registro`, C e D avevano un'alternativa;
 * cancellandolo con B, avrebbero portato la firma grafica di A senza che
 * nessuno lo notasse. La correzione non è stata rimettere una `forma`: è che
 * **ogni proposta ha adesso un apparato proprio** — la riga di metadati ai due
 * estremi in C, la didascalia numerata più il folio in D — e nessuna delle due
 * monta questo componente. Se un giorno una di loro lo montasse, il
 * terminatore tornerebbe: è il difetto da ricordare.
 */
export function Quota({
  voci,
  numero,
  unita,
  dettaglio,
  className = '',
}: {
  /** Le etichette appese al filetto. Le tacche cadono dove finiscono. */
  voci: readonly string[]
  /**
   * Il numero dell'annotazione. **Va contato dal repo** (`RUOLI.length`), non
   * scritto a mano: è la condizione 2 della regola.
   */
  numero: number
  /** L'unità dell'annotazione: «ruoli», «comuni». */
  unita: string
  /** La scomposizione, quando esiste: «FM 40 · MC 55 · AP 33». Opzionale. */
  dettaglio?: string
  className?: string
}) {
  return (
    <div className={`quota quota-misura ${className}`.trim()}>
      {voci.map((voce) => (
        <span key={voce} className="quota-voce">
          {voce}
        </span>
      ))}
      {/* L'annotazione è l'unico pezzo di testo del sito allineato a destra
          insieme ai numeri: sta all'estremo, con il vuoto in mezzo, come i
          metadati di Pelizzari e la lettura di coordinate di ecoLINEAR. */}
      <span className="quota-annotazione" data-numero="">
        {numero} {unita}
        {dettaglio ? <span className="quota-dettaglio">{dettaglio}</span> : null}
      </span>
    </div>
  )
}
