import Link from 'next/link'
import { MEDIA_DEMO } from '@/lib/media-demo'

/**
 * Barra della proposta: dice quale delle tre home si sta guardando e permette
 * di passare alle altre con un click.
 *
 * Serve a FT, non al cliente: da una sola anteprima si mostrano entrambe le
 * proposte senza dettare due indirizzi al telefono. È la barra `.proposal` dei
 * due prototipi, ed è anche il posto dove si dichiara — prima di ogni altra
 * cosa, in cima alla pagina — che i contenuti sono indicativi: così nessuno
 * legge i segnaposto come una proposta di testo, o i quattro rettangoli delle
 * persone come un organigramma.
 *
 * **Sparisce alla fase 5**, insieme alle rotte non scelte (DECISIONI.md n. 1):
 * in produzione non restano tre home, e su una home sola questa barra è solo
 * una riga di rumore sopra la hero.
 */
const PROPOSTE = {
  a: { nome: 'opzione A — «lo studio»', href: '/' },
  c: { nome: 'opzione C — «la fonderia»', href: '/opzione-c' },
  d: { nome: 'opzione D — «la monografia»', href: '/opzione-d' },
} as const

type Opzione = keyof typeof PROPOSTE

export function BarraProposta({ opzione }: { opzione: Opzione }) {
  // I nomi sono quelli di CLAUDE.md § Le quattro opzioni, che sono anche quelli
  // con cui FT le vende in call. Da qui non si cambiano.
  //
  // Tre, non quattro: l'opzione B è uscita (`DECISIONI.md` n. 39). Non era una
  // variante di troppo in un catalogo — era la proposta da cui C e D erano nate
  // per ricolorazione, e finché stava in mezzo il confronto in call si giocava
  // su tre schede che si somigliavano. La barra le mette in fila perché
  // alternarle *è* la dimostrazione.
  const questa = PROPOSTE[opzione].nome
  const altre = (Object.keys(PROPOSTE) as Opzione[]).filter((k) => k !== opzione)

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
          {altre.map((k) => (
            <Link key={k} href={PROPOSTE[k].href} className="barra-proposta-vai">
              {k.toUpperCase()}
            </Link>
          ))}
        </span>
      </div>
    </div>
  )
}
