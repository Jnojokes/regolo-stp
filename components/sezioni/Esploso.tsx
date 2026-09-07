import type { CSSProperties } from 'react'
import { Sezione } from '@/components/sezioni/Sezione'
import { DESCRIZIONE, VIEWBOX, livelli } from '@/lib/esploso'

/**
 * WOW 1 — l'esploso strutturale (CLAUDE.md § Homepage, blocco 7).
 *
 * È il blocco che racconta «il mestiere che nelle foto non si vede»: un
 * committente guarda le fotografie e vede le finiture, cioè l'ultimo dei cinque
 * livelli. La struttura che le regge, l'involucro che tiene fuori l'acqua e gli
 * impianti che fanno il comfort non si fotografano — e sono la metà del lavoro
 * di uno studio di ingegneria civile.
 *
 * **In SVG a livelli, non in 3D** (DECISIONI.md, 03/09): il 3D entra solo se
 * arrivano i CAD del cliente, e costa un ordine di grandezza in più di peso e
 * di batteria.
 *
 * ## In questa fase è fermo, e non è un ripiego
 *
 * I cinque livelli sono **già separati**: la geometria la calcola il server
 * (`lib/esploso.ts`) e finisce nell'HTML. Vuol dire che senza JavaScript il
 * disegno è completo, e che con `prefers-reduced-motion: reduce` resta com'è —
 * il contenuto non vive dentro un'animazione (CLAUDE.md § Regole, 4 e 6).
 *
 * Alla fase 5 ScrollTrigger animerà **solo** la variabile `--dy` dei cinque
 * `<g>`, cioè un `transform`: niente ricalcolo di geometria a runtime, niente
 * layout, niente `width`/`height` animate (CLAUDE.md § Regole, 7).
 *
 * ## L'evidenziazione dal mouse
 *
 * Passando sopra una voce della legenda il livello corrispondente resta pieno e
 * gli altri scendono di opacità. È in `kit/REGOLO_Due_Opzioni.md` come gesto
 * della call di vendita, e l'avevamo perso passando dal prototipo.
 *
 * È in **CSS puro** (`:has()` sulla sezione, cinque regole in
 * `app/css/sezioni.css`): nessun JavaScript, e l'unica proprietà toccata è
 * `opacity`, che con `transform` è la sola che si anima (CLAUDE.md § Regole, 7).
 * Vive dentro `@media (hover: hover)` perché su un touch screen un `:hover`
 * resta appiccicato dopo il tocco.
 *
 * Non è un canale di informazione: quale livello sia quale lo dice il testo
 * accanto, che c'è sempre. Per questo va bene che sia solo per il mouse — chi
 * naviga da tastiera non perde niente, perché non c'è niente da scoprire.
 *
 * ## Fase 3 bis — la faccia dice la luce, il retino dice il livello
 *
 * I nove token caldi sono morti: `involucro #e7e3da` e `finiture #f7f5f0` erano
 * la famiglia della crema, `apertura #2f4a42` il verde pietra che la fase
 * esclude, e c'erano una terra, un blu e un verde scuro. Peggio: erano
 * verificati su un fondo che questa fase ha cambiato, e su bianco puro
 * `finiture` sarebbe stato a 1,09:1 — i due livelli più esterni senza
 * silhouette.
 *
 * Ora il disegno si legge **come si legge un disegno tecnico**:
 *
 * - **tre valori per le tre facce** dell'isometria (14,73 · 8,83 · 4,89 sul
 *   nero): la faccia dice da dove viene la luce, e vale uguale per tutti e
 *   cinque i livelli;
 * - **cinque retini per i cinque livelli**: pieno · 45° · contorno · tratteggio
 *   · punteggiato. Il retino dice il livello, e si vede anche in bianco e nero;
 * - **il contorno di ogni volume in `carta`, a 21:1**: è la silhouette che
 *   prima non c'era, perché le facce erano `color-mix` senza `stroke`;
 * - i **serramenti sono il vuoto**: hanno il colore del fondo della banda, così
 *   leggono come aperture e non come pannelli.
 *
 * Da nove token a tre più cinque retini, e la decisione del 07/09 — «il colore
 * non porta informazione da solo» — è rispettata meglio di prima: qui il colore
 * non porta informazione **affatto**. La legenda ripete comunque i cinque
 * livelli in testo, e il testo alternativo dell'SVG li elenca dal basso in su.
 */
export function Esploso() {
  return (
    <Sezione id="esploso" fondo="scuro" passo="largo" className="esploso">
      <div className="grid-12 items-center">
        <div className="nav:col-span-6 col-span-12">
          <svg
            className="esploso-figura"
            viewBox={VIEWBOX}
            role="img"
            aria-labelledby="esploso-titolo"
          >
            <title id="esploso-titolo">{DESCRIZIONE}</title>
            {/* I cinque retini. Sono `<pattern>` SVG, quindi zero byte di
                immagine, zero richieste, e si ritematizzano con i token. */}
            <defs>
              <pattern id="retino-45" width="6" height="6" patternUnits="userSpaceOnUse">
                <path d="M-1,1 l2,-2 M0,6 l6,-6 M5,7 l2,-2" className="retino-tratto" />
              </pattern>
              <pattern id="retino-tratteggio" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M0,4 h4" className="retino-tratto" />
              </pattern>
              <pattern id="retino-punti" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="0.9" className="retino-punto" />
              </pattern>
            </defs>
            {livelli.map((l) => (
              <g
                key={l.chiave}
                className="esploso-livello"
                data-livello={l.chiave}
                style={{ '--dy': `${l.dy}px` } as CSSProperties}
              >
                {/* Ogni faccia si disegna due volte: sotto il valore della
                    faccia (la luce), sopra il retino del livello. È il modo con
                    cui costa meno di quindici `<pattern>` — uno per coppia
                    livello×faccia — e tiene i due canali indipendenti. */}
                {l.poligoni.map((p, i) => (
                  <polygon key={i} className={`faccia faccia-${p.faccia}`} points={p.punti} />
                ))}
                {l.poligoni.map((p, i) =>
                  p.faccia === 'apertura' ? null : (
                    <polygon key={`r${i}`} className="retino" points={p.punti} />
                  ),
                )}
                {l.polilinee.map((p, i) => (
                  <polyline key={i} className={`traccia traccia-${p.traccia}`} points={p.punti} />
                ))}
              </g>
            ))}
          </svg>
        </div>

        <div className="nav:col-start-8 nav:col-span-5 col-span-12">
          <p className="etichetta-sezione">il mestiere che nelle foto non si vede</p>
          <h2 className="mt-3 max-w-[20ch]">Un edificio, cinque livelli.</h2>

          {/* La legenda è il contenuto in testo: se l'SVG non si carica, non si
              vede o non si capisce, i cinque livelli sono comunque qui. */}
          <ul className="legenda-esploso mt-8">
            {[...livelli].reverse().map((l) => (
              <li key={l.chiave} data-livello={l.chiave}>
                <span className="legenda-nome">
                  {/* Il campione ripete il **retino**, non un colore: è il
                      canale che porta l'informazione nel disegno. */}
                  <span className="legenda-campione" aria-hidden="true" />
                  {l.nome}
                </span>
                <span>{l.descrizione}</span>
              </li>
            ))}
          </ul>

          <p className="nota-cantiere">
            Col mouse sopra una voce dell’elenco, il livello corrispondente resta acceso e gli altri
            si attenuano. In questa fase il disegno è fermo: alla fase del movimento i livelli si
            separeranno scorrendo, e chi ha chiesto meno animazioni al sistema operativo continuerà
            a vederli così come sono adesso.
          </p>
        </div>
      </div>
    </Sezione>
  )
}
