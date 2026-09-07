import Link from 'next/link'

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
  const questa = opzione === 'a' ? 'opzione A — «l’elevato»' : 'opzione B — «il registro»'
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
          <span className="barra-proposta-avvertenza">
            le fotografie, i numeri, i nomi e i progetti arrivano dallo studio: in pagina sono
            segnaposto dichiarati
          </span>
          <Link href={altra.href}>{altra.label}</Link>
        </span>
      </div>
    </div>
  )
}
