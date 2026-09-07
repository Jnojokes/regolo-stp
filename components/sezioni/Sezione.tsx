import type { ReactNode } from 'react'

/**
 * Il guscio di ogni sezione della home.
 *
 * Esiste per una ragione sola: il **ritmo**. Respiro fra i blocchi, posizione
 * dell'occhiello, larghezza dell'introduzione, filetto di separazione sono la
 * stessa cosa in tutte le sezioni, e se ogni sezione se li riscrive divergono
 * al terzo blocco. Qui si cambiano in un punto.
 *
 * L'occhiello si chiama «quota» perché nell'opzione B è la linea di misura del
 * disegno tecnico («Sez. 03 — Come lavoriamo»), mentre in A è un occhiello
 * normale. Il markup è identico: cambia un token
 * (`--regolo-quota-riga`), non un `if` sul tema.
 *
 * Il titolo è sempre un `<h2>`: l'`<h1>` è uno per pagina e ce l'ha la hero.
 */
export function Sezione({
  id,
  quota,
  titolo,
  intro,
  azione,
  nota,
  children,
  fondo = 'carta',
  filo = false,
  filoSotto = false,
  titoloLargo = false,
  stretta = false,
  className = '',
}: {
  id?: string
  /** L'occhiello / quota. Nell'opzione B ci va anche il numero di sezione. */
  quota?: string
  /** Il titolo del blocco. Sempre `h2`. */
  titolo?: ReactNode
  /** Una riga di intento sotto il titolo. */
  intro?: ReactNode
  /** Una CTA in alto a destra, allineata al titolo. */
  azione?: ReactNode
  /**
   * Nota di cantiere: «questo blocco è vuoto per scelta, il contenuto arriva
   * dallo studio». Deve leggersi come una nota di servizio, non come contenuto.
   */
  nota?: ReactNode
  children?: ReactNode
  /** `carta` = fondo di pagina · `alt` = fascia più chiara · `scuro` = inchiostro. */
  fondo?: 'carta' | 'alt' | 'scuro'
  /** Un filetto sopra la sezione. */
  filo?: boolean
  /**
   * Un filetto sotto. Serve alle strisce che stanno *fra* due blocchi — lo
   * smistamento fra la hero e i progetti — dove il filetto separa quello che
   * viene dopo, non quello che viene prima (è il `border-bottom` di `.sort`
   * nel prototipo A).
   */
  filoSotto?: boolean
  /**
   * Titolo a piena larghezza. Serve ai titoli lunghi dell'opzione B, che nel
   * prototipo corrono per tutta la riga invece di stringersi in 26 caratteri.
   */
  titoloLargo?: boolean
  /** Meno respiro: per le strisce sottili come lo smistamento. */
  stretta?: boolean
  className?: string
}) {
  const classi = [
    stretta ? 'sezione-stretta' : 'sezione',
    fondo === 'alt' ? 'sezione-alt' : '',
    fondo === 'scuro' ? 'sezione-scura' : '',
    filo ? 'sezione-filo' : '',
    filoSotto ? 'sezione-filo-sotto' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const haTesta = quota || titolo || intro || azione

  return (
    <section id={id} className={classi}>
      <div className="wrap">
        {haTesta && (
          <div className={azione ? 'testa-sezione' : undefined}>
            <div>
              {quota && (
                <p className="quota">
                  <span>{quota}</span>
                </p>
              )}
              {titolo && <h2 className={titoloLargo ? 'mt-3' : 'mt-3 max-w-[26ch]'}>{titolo}</h2>}
              {intro && <p className="intro-sezione text-lead">{intro}</p>}
            </div>
            {azione}
          </div>
        )}

        {children && <div className={haTesta ? 'mt-10' : undefined}>{children}</div>}

        {nota && <p className="nota-cantiere">{nota}</p>}
      </div>
    </section>
  )
}
