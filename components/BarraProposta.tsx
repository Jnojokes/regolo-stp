import Link from 'next/link'
import { MEDIA_DEMO } from '@/lib/media-demo'

/**
 * Barra della proposta: dice quale delle due home si sta guardando e permette
 * di passare all'altra con un click.
 *
 * Serve a FT, non al cliente: da una sola anteprima si mostrano entrambe le
 * proposte senza dettare due indirizzi al telefono. È la barra `.proposal` dei
 * due prototipi, ed è anche il posto dove si dichiara — prima di ogni altra
 * cosa, in cima alla pagina — che i contenuti sono indicativi: così nessuno
 * legge i segnaposto come una proposta di testo, o i quattro rettangoli delle
 * persone come un organigramma.
 *
 * **Sparisce alla fase 5**, insieme alla rotta non scelta (DECISIONI.md n. 1):
 * in produzione non restano due home, e su una home sola questa barra è solo
 * una riga di rumore sopra la hero.
 */
export function BarraProposta({ opzione }: { opzione: 'a' | 'b' }) {
  // I nomi sono quelli di CLAUDE.md § Due opzioni, che sono anche quelli con cui
  // FT le vende in call: non si cambiano da qui. «L'elevato» e «Il registro»
  // sono i nomi *interni* dei due temi nel codice e nella cartella di prove —
  // dicono il meccanismo tipografico, non il tono — e restano lì.
  const questa = opzione === 'a' ? 'opzione A — «lo studio»' : 'opzione B — «il cantiere»'
  const altra =
    opzione === 'a'
      ? { href: '/opzione-b', label: 'guarda l’opzione B' }
      : { href: '/', label: 'guarda l’opzione A' }

  return (
    <div className="barra-proposta">
      <div className="wrap">
        <span>
          <strong>proposta · {questa}</strong> — prototipo di homepage
        </span>

        <span>
          {/* La riga cambia con l'interruttore dei media: quando i campi
              portano un esempio, dire «sono segnaposto dichiarati» sarebbe
              falso — chi guarda vede delle fotografie. Con la dimostrazione
              accesa la frase dice esattamente quello che si sta guardando, e
              con `NEXT_PUBLIC_MEDIA_DEMO=0` torna quella di prima. */}
          <span className="barra-proposta-avvertenza">
            {MEDIA_DEMO
              ? 'le fotografie e il video sono esempi liberi da licenza, non opere dello studio; numeri, nomi e progetti sono segnaposto dichiarati'
              : 'le fotografie, i numeri, i nomi e i progetti arrivano dallo studio: in pagina sono segnaposto dichiarati'}
          </span>
          <Link href={altra.href}>{altra.label}</Link>
        </span>
      </div>
    </div>
  )
}
