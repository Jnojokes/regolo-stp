/**
 * Rettangolo al posto di una foto che non abbiamo (CLAUDE.md § Regole, 2):
 * in sviluppo niente stock, un campo che dice cosa andrà lì.
 *
 * ## Fase 3 bis — via le due texture, dentro le squadrette e la specifica
 *
 * Prima il motivo cambiava col tema: tratteggio da disegno tecnico in A, carta
 * millimetrata in B. Erano **due texture decorative identiche su ogni blocco**,
 * che dicono «disegno» e non dicono niente — e su un fondo a 1,18:1 dalla carta
 * non potevano nemmeno portare il significato «qui va una fotografia», perché
 * una superficie a quel contrasto non è percepibile come un'affermazione.
 *
 * Al loro posto due cose che portano informazione:
 *
 * — **quattro squadrette d'angolo** in `--color-line` (4,61:1 sulla carta):
 *   sono i segni di registro con cui si delimita un'area su una tavola, e sono
 *   loro a dire dove comincia e dove finisce il campo. È anche la ragione per
 *   cui non sono decorazione: senza di loro il segnaposto sarebbe un grafico
 *   inaccessibile. Se qualcuno le «pulisce» alla fase 5, il blocco perde l'unico
 *   canale che regge il significato;
 * — **la scheda di specifica**: cosa manca *e in che formato deve arrivare*
 *   (`2400 × 1650 px · AVIF · ≤ 250 KB`). Legge «modulo in attesa», non «buco»,
 *   e in call è la lista della spesa da mandare allo studio.
 *
 * Davanti a un ingegnere questo è più forte di un intonaco generato con un
 * cartello che dice che non è suo — che è la ragione per cui in tutto il sito
 * **non c'è nemmeno un'immagine generata** (`TODO-MEDIA.md` nomina la hero per
 * prima fra i blocchi dove «non entra mai»).
 *
 * Ogni segnaposto usato va segnato in TODO-MEDIA.md.
 */
export function Placeholder({
  label,
  specifica,
  className = '',
  ratio,
}: {
  /** Cosa andrà lì, in parole: è anche il nome accessibile del campo. */
  label: string
  /**
   * Il formato in cui deve arrivare: `2400 × 1650 px · AVIF · ≤ 250 KB`.
   * Non entra nel nome accessibile — a chi ascolta non serve — ma sta in pagina
   * perché è quello che trasforma un buco in una richiesta.
   */
  specifica?: string
  className?: string
  ratio?: string
}) {
  return (
    <div
      className={`placeholder-media ${className}`.trim()}
      style={ratio ? { aspectRatio: ratio } : undefined}
      role="img"
      aria-label={`Segnaposto: ${label}`}
    >
      {/* Le quattro squadrette. `aria-hidden` perché il significato è già nel
          nome accessibile del campo: leggerle sarebbe rumore. */}
      <span className="placeholder-registro" aria-hidden="true" />
      {/* La classe, non le utility: vedi la nota in `app/globals.css`. Con le
          utility Tailwind questa targhetta non era spostabile da nessun blocco. */}
      <span className="placeholder-etichetta">
        {label}
        {specifica ? <span className="placeholder-specifica">{specifica}</span> : null}
      </span>
    </div>
  )
}

/**
 * Segnaposto di testo: si deve vedere a occhio nudo, non solo nel collaudo
 * (CLAUDE.md § Regole, 10 — un `[[DA CLIENTE]]` visibile in produzione è un
 * difetto bloccante, quindi qui il difetto deve essere impossibile da mancare).
 *
 * Come si vede è in `app/globals.css`, classe `.da-cliente`: filetto pieno a
 * sinistra, tinta, sottolineatura punteggiata. La tinta **da sola non basta** —
 * un fondo abbastanza chiaro da lasciare leggibile il testo sta a 1,1:1 dalla
 * carta, cioè è invisibile.
 *
 * **Questi 62 segnaposto sono l'unico posto del sito dove c'è colore.** Il
 * `timbro` (`#45327F`, 10,42:1 sulla carta) è l'inchiostro con cui si annota lo
 * stato di un documento, e qui dice che il contenuto manca. È anche l'unico
 * colore del progetto che **si consuma**: quando i contenuti arrivano, sparisce
 * dalla pagina da sé. Dentro una banda scura il valore è vincolato al piano
 * (`--regolo-timbro-piano`), perché `timbro` sul nero sta a 2,02:1.
 *
 * `data-placeholder="da-cliente"` è l'aggancio del collaudo della fase 8.
 */
export function DaCliente({ children }: { children: string }) {
  return (
    <span data-placeholder="da-cliente" className="da-cliente">
      {children}
    </span>
  )
}
