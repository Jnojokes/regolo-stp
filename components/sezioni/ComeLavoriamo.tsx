import { Sezione } from '@/components/sezioni/Sezione'
import { fasi, introProcesso } from '@/lib/processo'

/**
 * Le cinque fasi (CLAUDE.md § Homepage, blocco 6).
 *
 * ## Qui la numerazione è legittima, e la skill lo dice
 *
 * `sito-design` § 5 chiede di verificare, prima di numerare, che il contenuto
 * **sia** una sequenza. Qui lo è, e si controlla in `lib/processo.ts`: primo
 * incontro → fattibilità e costi → progetto → autorizzazioni → cantiere e
 * direzione lavori. È il motivo per cui `01…05` resta qui e **non** sui cinque
 * percorsi della hero B, che sono alternative mutuamente esclusive.
 *
 * ## La dimensione dice l'importanza
 *
 * Le due fasi che il committente **vive** — il primo incontro e il cantiere —
 * stanno a `titolo`; le tre che facciamo noi stanno a `sottotitolo`. È Dieste
 * misurato: nella sua timeline la scala dell'immagine dice quanto conta, e le
 * cose non sono tutte uguali perché sono nella stessa fila.
 *
 * ## Due impaginazioni, due assi
 *
 * - **A** — le cinque fasi appese a un **filetto orizzontale**, con la tacca
 *   dove comincia ognuna: è lo stesso apparato della quota, applicato a una
 *   sequenza. (Non *è* una quota: «5 fasi» si conta a vista, quindi fallisce la
 *   terza condizione della regola in `components/Quota.tsx`.)
 * - **B** — le fasi **a cavallo dell'asse verticale**: il numero a sinistra,
 *   sull'asse, il testo a destra. È il gesto di Dieste ruotato, e in B l'asse
 *   c'è già: la sequenza ci si appende invece di disegnarsi una linea propria.
 *
 * Alla fase 5 si anima l'avanzamento; con `prefers-reduced-motion` le cinque
 * tacche sono già piene, perché uno stato iniziale vuoto è indistinguibile da
 * un blocco rotto.
 */
export function ComeLavoriamo({
  variante,
  id = 'processo',
}: {
  variante: 'elenco' | 'timeline'
  id?: string
}) {
  const suAsse = variante === 'timeline'

  return (
    <Sezione
      id={id}
      asse={suAsse}
      passo={suAsse ? 'corto' : 'normale'}
      etichetta="come lavoriamo"
      titolo="E poi cosa succede?"
      intro={introProcesso}
      titoloLargo
    >
      {/* Una `<ol>` e non cinque `<div>`: la sequenza è il contenuto del blocco,
          e deve stare nel markup e non solo nel disegno. */}
      <ol className={suAsse ? 'fasi fasi-asse' : 'fasi fasi-quota'} role="list">
        {fasi.map((fase, indice) => {
          const vissuta = indice === 0 || indice === fasi.length - 1
          return (
            <li key={fase.titolo} data-vissuta={vissuta ? '' : undefined}>
              <span className="fase-numero" data-numero="">
                {String(indice + 1).padStart(2, '0')}
              </span>
              <span className="fase-corpo">
                <strong className="fase-titolo">{fase.titolo}</strong>
                <span className="fase-testo">{suAsse ? fase.testoBreve : fase.testoLungo}</span>
              </span>
            </li>
          )
        })}
      </ol>
    </Sezione>
  )
}
