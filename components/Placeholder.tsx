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
      <span className="bg-paper text-eyebrow text-ph-ink absolute bottom-3 left-3 px-2 py-1 tracking-[0.12em] uppercase">
        {label}
      </span>
    </div>
  )
}

/**
 * Segnaposto di testo. Volutamente vistoso: se finisce in produzione
 * si deve vedere a occhio nudo, non solo nel collaudo.
 */
export function DaCliente({ children }: { children: string }) {
  return (
    <span
      data-placeholder="da-cliente"
      className="bg-accent-soft text-accent-text decoration-accent-text/40 px-1 underline decoration-dotted underline-offset-2"
    >
      {children}
    </span>
  )
}
