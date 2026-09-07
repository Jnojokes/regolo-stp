import type { ReactNode } from 'react'

/**
 * Il guscio di ogni sezione della home.
 *
 * Esiste per una ragione sola: il **ritmo**. Respiro fra i blocchi, posizione
 * dell'etichetta e larghezza dell'introduzione sono la stessa cosa in dodici
 * sezioni, e se ogni sezione se li riscrive divergono al terzo blocco.
 *
 * ## Fase 3 bis — tre cose sono cambiate
 *
 * **1. L'etichetta non sta più sopra il titolo.** Era un occhiello in
 * maiuscoletto spaziato — «SEZ. 04 — PROGETTI» — cioè la tell n. 5 della lista
 * di calibrazione, e nessuna delle tre reference tier A ne usa uno. Ora è
 * minuscola, fra parentesi quadre (AS misurato: `[Projects]`, `[Materials]`) e
 * sta **sulla stessa riga** del titolo, nel campo a sinistra. Le quadre le mette
 * il CSS, così non finiscono nel nome accessibile né in un copia-incolla.
 *
 * **2. Non è una quota.** La «quota» dell'opzione B numerava le sezioni con un
 * filetto che non misurava niente. Una quota si disegna solo se porta un numero
 * che il repo può contare e che il visitatore non conta a vista
 * (`components/Quota.tsx`, DECISIONI n. 17): in tutto il sito sono tre, e
 * nessuna è qui.
 *
 * **3. Il respiro non è più uguale per tutti.** Tre passi — `corto` 48,
 * `normale` 96, `largo` 200 a 1440 — assegnati per **ruolo del blocco** e
 * dichiarati **solo in alto**: lo spazio fra due blocchi appartiene al secondo,
 * quindi il ritmo di una pagina è una sequenza di nove valori invece di
 * diciotto e non può divergere. Il padding sotto vale 0,6 volte quello sopra,
 * così l'etichetta di una sezione sta sempre più vicina al proprio contenuto
 * che al blocco precedente, e il raggruppamento si legge **senza divisori**.
 *
 * Il titolo è sempre un `<h2>`: l'`<h1>` è uno per pagina e ce l'ha la hero.
 */
export function Sezione({
  id,
  etichetta,
  titolo,
  intro,
  azione,
  nota,
  children,
  fondo = 'carta',
  passo = 'normale',
  asse = false,
  titoloLargo = false,
  className = '',
}: {
  id?: string
  /** L'etichetta di sezione: minuscola, fra parentesi quadre messe dal CSS. */
  etichetta?: string
  /** Il titolo del blocco. Sempre `h2`. */
  titolo?: ReactNode
  /** Una riga di intento sotto il titolo. */
  intro?: ReactNode
  /** Un'uscita in alto a destra, allineata al titolo. */
  azione?: ReactNode
  /**
   * Nota di cantiere: «questo blocco è vuoto per scelta, il contenuto arriva
   * dallo studio». Deve leggersi come una nota di servizio, non come contenuto.
   */
  nota?: ReactNode
  children?: ReactNode
  /** `carta` = fondo di pagina · `scuro` = inchiostro, a taglio netto. */
  fondo?: 'carta' | 'scuro'
  /**
   * Il respiro **sopra** il blocco: `corto` quando questo blocco e il
   * precedente sono un solo pensiero, `largo` quando deve atterrare da solo.
   */
  passo?: 'corto' | 'normale' | 'largo' | 'nessuno'
  /**
   * Il blocco è composto sull'asse verticale del tema B, quindi l'asse si
   * disegna. **Senza questo l'asse non passa**, ed è voluto: un asse che
   * attraversa un blocco impaginato a piena larghezza taglia i paragrafi a
   * metà, e la pagina non sembra rigorosa, sembra rotta.
   */
  asse?: boolean
  /** Titolo a piena larghezza, per i titoli lunghi. */
  titoloLargo?: boolean
  className?: string
}) {
  const classi = ['sezione', `passo-${passo}`, fondo === 'scuro' ? 'sezione-scura' : '', className]
    .filter(Boolean)
    .join(' ')

  const haTesta = etichetta || titolo || intro || azione

  return (
    <section id={id} className={classi} data-asse={asse ? '' : undefined}>
      <div className="wrap">
        {haTesta && (
          <div className="testa-sezione">
            <div className="testa-sezione-titolo">
              {/* Etichetta e titolo sulla stessa riga: l'etichetta sta nel campo
                  a sinistra, il titolo comincia dove comincia il contenuto. */}
              {etichetta && <p className="etichetta-sezione">{etichetta}</p>}
              <div>
                {titolo && <h2 className={titoloLargo ? undefined : 'max-w-[26ch]'}>{titolo}</h2>}
                {intro && <p className="intro-sezione text-lead">{intro}</p>}
              </div>
            </div>
            {azione}
          </div>
        )}

        {children && <div className={haTesta ? 'corpo-sezione' : undefined}>{children}</div>}

        {nota && <p className="nota-cantiere">{nota}</p>}
      </div>
    </section>
  )
}
