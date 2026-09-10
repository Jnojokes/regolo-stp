import Link from 'next/link'
import { MEDIA_DEMO } from '@/lib/media-demo'
import { site } from '@/lib/site'

/**
 * Barra della proposta: dice quale delle tre home si sta guardando e permette
 * di passare alle altre con un click.
 *
 * Nata per FT in call: da una sola anteprima si mostrano tutte e tre le
 * proposte senza dettare tre indirizzi al telefono. Adesso le tre home arrivano
 * al cliente anche come tre link in una mail (DECISIONI.md n. 55), e per lui fa
 * lo stesso lavoro. È la barra `.proposal` dei due prototipi, ed è anche il
 * posto dove si dichiara — prima di ogni altra cosa, in cima alla pagina — che
 * i contenuti sono indicativi: così nessuno legge i segnaposto come una
 * proposta di testo, o i quattro rettangoli delle persone come un organigramma.
 *
 * **Sparisce alla fase 5**, insieme alle rotte non scelte (DECISIONI.md n. 1):
 * in produzione non restano tre home, e su una home sola questa barra è solo
 * una riga di rumore sopra la hero.
 */
const PROPOSTE = {
  a: { lettera: 'A', meccanismo: '«lo studio»', href: '/' },
  b: { lettera: 'B', meccanismo: '«il foglio»', href: '/opzione-b' },
  c: { lettera: 'C', meccanismo: '«le bande»', href: '/opzione-c' },
} as const

export type Opzione = keyof typeof PROPOSTE

/**
 * Il `<title>` di ognuna delle tre home, che è anche il titolo della sua
 * anteprima quando il link si incolla in una mail (`og:title` lo eredita).
 *
 * Sta qui e non nelle tre pagine perché è **la stessa tabella dei nomi**, e
 * perché così la fase 5 non lo può dimenticare: cancellare questo file rompe
 * la build finché la home che resta non torna al titolo di produzione.
 */
export function titoloProposta(opzione: Opzione) {
  const { lettera, meccanismo } = PROPOSTE[opzione]
  return `${site.nome} — opzione ${lettera} ${meccanismo}`
}

export function BarraProposta({ opzione }: { opzione: Opzione }) {
  // I nomi sono quelli di CLAUDE.md § Le tre opzioni, che sono anche quelli
  // con cui FT le vende in call. Da qui non si cambiano.
  //
  // **Non portano il nome della reference.** B viene da ecoLINEAR e C da
  // Halston — il committente le ha indicate per nome — ma «opzione B —
  // ecoLINEAR» in cima alla pagina direbbe al cliente di REGOLO il nome di un
  // altro studio di architettura, che è l'ultima cosa che deve leggere in una
  // call di vendita. I nomi dicono il **meccanismo**, che è anche quello che si
  // confronta: «il foglio» è la tavola da disegno con le linee di costruzione e
  // le fasi pinnate, «le bande» è il ritmo fatto dal colore. Da dove vengono
  // sta in `CLAUDE.md`, in `DECISIONI.md` e nei commenti dei due fogli di
  // stile, cioè dove lo leggiamo noi.
  //
  // Tre, non quattro: l'opzione B del kick-off è uscita
  // (`DECISIONI.md` n. 39) e le due alternative sono state rifatte da zero.
  // La barra le mette in fila perché alternarle *è* la dimostrazione.
  const questa = `opzione ${PROPOSTE[opzione].lettera} — ${PROPOSTE[opzione].meccanismo}`
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
