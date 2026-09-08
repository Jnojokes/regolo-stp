import Link from 'next/link'
import { Campo } from '@/components/campo/Campo'
import { Registro } from '@/components/campo/Registro'
import { Placeholder } from '@/components/Placeholder'
import { RUOLI } from '@/lib/contenuti/schema'
import { ctaPrimaria, site } from '@/lib/site'

/**
 * Hero dell'opzione D «La casa» — dal sistema di **Storey Architecture**,
 * chiesto per nome dal committente ed **unica reference già misurata nel tier A**
 * di `SCHEDA.md`.
 *
 * Guardata: `kit/reference/storey/1440-hero.jpeg`. Come Studio Foundry apre con
 * una fotografia a piena finestra, ma ci mette sopra l'opposto: **niente tipo
 * grande**. Il marchio è piccolo, il menu è piccolo, e in basso a sinistra c'è
 * un paragrafo in lineare leggero con sopra **una barra a cinque segmenti** —
 * il primo pieno, gli altri vuoti.
 *
 * Quella barra è la cosa che rende questo blocco diverso da ogni altro del
 * progetto: nella reference è un indicatore di sequenza, e qui porta **i cinque
 * ruoli firmabili** (`RUOLI`, contati dal repo). Non è la quota di A —
 * niente terminatori obliqui, niente annotazione all'estremo — è un
 * **avanzamento**: cinque segmenti, e il primo è pieno.
 *
 * Il vuoto sopra il paragrafo è **disuguale** di proposito: è il gesto misurato
 * di Storey — nella sua banda nera l'immagine parte a 500 px dall'alto e le due
 * colonne di testo a 440, e sopra restano 400 px di nero senza niente. Non è
 * centratura, non è padding: è composizione.
 *
 * La CTA è una **pastiglia bianca** sopra la fotografia, e il registro — il
 * meccanismo — arriva sotto la piega, su carta bianca.
 */
export function HeroCasa({ interventoIniziale = null }: { interventoIniziale?: string | null }) {
  return (
    <>
      <section className="casa-hero">
        <Placeholder
          label="Fotografia di un’opera realizzata — dallo studio, non un render"
          specifica="2400 × 1650 px · AVIF · ≤ 250 KB"
          demo="opera-01"
          priorita
          className="casa-foto"
        />

        <div className="casa-basso">
          {/* I cinque segmenti: il primo pieno, gli altri vuoti. Portano i
              cinque ruoli, che è un numero che il repo conta (`RUOLI.length`).
              Il disegno è `aria-hidden` — l'elenco in chiaro sta subito sotto,
              e sentirlo due volte è rumore. */}
          <ol className="casa-segmenti" aria-hidden="true">
            {RUOLI.map((r, i) => (
              <li key={r} data-pieno={i === 0 ? '' : undefined} />
            ))}
          </ol>

          <h1 className="casa-claim">
            Uno studio di ingegneria civile e architettura a {site.citta}. Progetto architettonico e
            strutturale, pratiche, cantiere: la stessa squadra, dall’idea alla consegna.
          </h1>

          <p className="casa-ruoli">{RUOLI.join(' · ')}</p>

          <Link href={ctaPrimaria.href} className="casa-pastiglia">
            {ctaPrimaria.label}
          </Link>
        </div>
      </section>

      <Campo primo id="percorsi" etichetta="il punto di partenza">
        {/* Il contatore tono su tono: è il gesto di Storey — un numero grigio
            su grigio, grande, che fa da atmosfera dietro il blocco. Sta a
            1,48:1, quindi è **decorazione e basta**: `aria-hidden`, e nessuna
            informazione dipende da lui. Se un giorno ne dipendesse, questo
            numero andrebbe scritto in chiaro da un'altra parte. */}
        <span className="casa-contatore" aria-hidden="true" data-decorativo="">
          01
        </span>
        <h2 className="casa-domanda">Che intervento hai in mente?</h2>
        <p className="hero-lead">
          Scegli il tuo caso: ti diciamo subito cosa comprende, come si svolge e cosa serve da parte
          tua.
        </p>
        <Registro interventoIniziale={interventoIniziale} />
      </Campo>
    </>
  )
}
