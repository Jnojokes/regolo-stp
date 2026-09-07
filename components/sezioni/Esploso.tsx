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
 * ## Il colore non porta informazione
 *
 * La legenda accanto ripete i cinque livelli in testo, nello stesso ordine, e
 * il testo alternativo dell'SVG li elenca dal basso verso l'alto. Il colore è
 * un rinforzo: ogni faccia è comunque ≥ 3:1 sul fondo (verificato con
 * `scripts/contrasto.mjs`, i rapporti sono nei token in `globals.css`), così il
 * disegno si legge anche a monitor tarato male.
 */
export function Esploso() {
  return (
    <Sezione id="esploso" fondo="scuro" className="esploso">
      <div className="grid-12 items-center">
        <div className="nav:col-span-6 col-span-12">
          <svg
            className="esploso-figura"
            viewBox={VIEWBOX}
            role="img"
            aria-labelledby="esploso-titolo"
          >
            <title id="esploso-titolo">{DESCRIZIONE}</title>
            {livelli.map((l) => (
              <g
                key={l.chiave}
                className="esploso-livello"
                data-livello={l.chiave}
                style={
                  {
                    '--dy': `${l.dy}px`,
                    '--tono': `var(--regolo-esploso-${l.chiave})`,
                  } as CSSProperties
                }
              >
                {l.poligoni.map((p, i) => (
                  <polygon key={i} className={`faccia-${p.faccia}`} points={p.punti} />
                ))}
                {l.polilinee.map((p, i) => (
                  <polyline key={i} className={`traccia traccia-${p.traccia}`} points={p.punti} />
                ))}
              </g>
            ))}
          </svg>
        </div>

        <div className="nav:col-start-8 nav:col-span-5 col-span-12">
          <p className="quota">
            <span>Il mestiere che nelle foto non si vede</span>
          </p>
          <h2 className="mt-3 max-w-[20ch]">Un edificio, cinque livelli.</h2>

          {/* La legenda è il contenuto in testo: se l'SVG non si carica, non si
              vede o non si capisce, i cinque livelli sono comunque qui. */}
          <ul className="legenda-esploso mt-8">
            {[...livelli].reverse().map((l) => (
              <li
                key={l.chiave}
                data-livello={l.chiave}
                style={{ '--tono': `var(--regolo-esploso-${l.chiave})` } as CSSProperties}
              >
                <span className="legenda-nome">
                  <span className="legenda-pallino" aria-hidden="true" />
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
