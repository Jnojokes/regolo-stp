import { Placeholder } from '@/components/Placeholder'
import type { ChiaveEsempio } from '@/lib/media-demo'

/**
 * Le **rotture**: i due momenti in cui la pagina smette di essere un documento
 * e diventa un manifesto.
 *
 * Le tre reference portate dal committente (`DECISIONI.md` n. 35) hanno lo
 * stesso ritmo, e una lo scrive per esteso: *«wide quiet sections, then sudden
 * full-bleed visual ruptures, then quiet again»*. La pagina non è una sequenza
 * di blocchi uguali con dentro cose diverse: è **quiete, rottura, quiete**.
 *
 * Sono due tipi, e non ce n'è un terzo:
 *
 * - `<Parola>` — una parola sola a scala architettonica che **sborda dai due
 *   lati del viewport**. È il gesto di Iad-lab, e la sua regola è netta: *«do
 *   not set the display heading at a size where all letters fit within the
 *   viewport — the cropping is intentional and defines the visual identity»*.
 *   Il corpo non è un valore fisso ma una funzione del numero di lettere, così
 *   la parola sborda **sempre**, a qualunque larghezza, senza che nessuno
 *   debba ricalcolare un `clamp` quando cambia una parola.
 * - `<Lastra>` — una fotografia a **100vw**, senza margini e senza raggio, fra
 *   due bande quiete. *«Let photography fill 100vw with zero padding or
 *   border-radius. Full-bleed is non-negotiable for visual panels.»*
 *
 * Nessuna delle due è un blocco «wow» nel senso di `CLAUDE.md` § Regole, 3: non
 * hanno interazione, non hanno JavaScript, non aggiungono un byte al bundle.
 * Sono **composizione** — il modo in cui le bande si susseguono — e i due wow
 * di B restano quello che erano: il registro che risponde e il prima/dopo.
 */
export function Parola({
  children,
  sopra,
  sotto,
  banda,
}: {
  /** La parola. Una sola, e maiuscola: a questa scala una seconda non ci sta. */
  children: string
  /** L'annotazione che le sta sopra, in monospace. Opzionale. */
  sopra?: string
  /** L'annotazione che le sta sotto. Opzionale. */
  sotto?: string
  /**
   * La superficie. In B la parola sta sulla banda indaco; in C sta sulla
   * parete di carbone, che è già il fondo della pagina — lì non serve
   * dichiarare niente.
   */
  banda?: 'indaco'
}) {
  return (
    <section className="campo campo-parola" data-banda={banda}>
      {sopra ? <p className="parola-nota">{sopra}</p> : null}
      {/* `--lettere` è il conto vero dei caratteri: il CSS ci divide la
          larghezza della finestra, quindi la parola resta più larga del
          viewport per costruzione. Se domani la parola cambia, il corpo si
          ricalcola da sé. */}
      <p className="parola" style={{ '--lettere': children.length } as React.CSSProperties}>
        {children}
      </p>
      {sotto ? <p className="parola-nota parola-nota-sotto">{sotto}</p> : null}
    </section>
  )
}

/**
 * La lastra: una fotografia a piena finestra fra due bande.
 *
 * Resta un **segnaposto dichiarato** anche mentre si vede, come tutti gli altri
 * (decisione n. 27): squadrette, specifica del formato e riga di fonte e
 * licenza restano al loro posto, e `NEXT_PUBLIC_MEDIA_DEMO=0` la riporta al
 * campo vuoto. Quello che cambia è la **scala**: qui la fotografia non illustra
 * un blocco, è lei il blocco.
 */
export function Lastra({
  label,
  specifica = '2400 × 1350 px · AVIF · ≤ 250 KB',
  demo,
  nota,
}: {
  label: string
  specifica?: string
  demo?: ChiaveEsempio
  /** L'annotazione in monospace sotto la lastra: dice cosa si sta guardando. */
  nota?: string
}) {
  return (
    <section className="campo campo-lastra">
      <Placeholder label={label} specifica={specifica} demo={demo} className="lastra" />
      {nota ? <p className="lastra-nota">{nota}</p> : null}
    </section>
  )
}
