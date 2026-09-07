/**
 * Rettangolo al posto di una foto che non abbiamo (CLAUDE.md § Regole, 2):
 * in sviluppo niente stock, un rettangolo che dice cosa andrà lì.
 * Il motivo cambia col tema: tratteggio in A, carta millimetrata in B.
 * Ogni placeholder usato va segnato in TODO-MEDIA.md.
 */
export function Placeholder({
  label,
  className = '',
  ratio,
}: {
  label: string
  className?: string
  ratio?: string
}) {
  return (
    <div
      className={`placeholder-media ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      role="img"
      aria-label={`Segnaposto: ${label}`}
    >
      {/* La classe, non le utility: vedi la nota in `app/globals.css`. Con le
          utility Tailwind questa targhetta non era spostabile da nessun blocco. */}
      <span className="placeholder-etichetta">{label}</span>
    </div>
  )
}

/**
 * Segnaposto di testo: si deve vedere a occhio nudo, non solo nel collaudo
 * (CLAUDE.md § Regole, 10 — un `[[DA CLIENTE]]` visibile in produzione è un
 * difetto bloccante, quindi qui il difetto deve essere impossibile da mancare).
 *
 * Come si vede è in `app/globals.css`, classe `.da-cliente`: un filetto pieno a
 * sinistra nel colore dell'accento, la tinta di fondo e la sottolineatura
 * punteggiata. La tinta **da sola non bastava** — un fondo abbastanza chiaro da
 * lasciare leggibile il testo sta a 1,1:1 dalla carta della pagina, cioè è
 * invisibile: era il caso di prima, e il commento diceva il contrario.
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
