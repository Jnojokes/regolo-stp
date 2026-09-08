import Link from 'next/link'
import { Placeholder } from '@/components/Placeholder'
import { RUOLI } from '@/lib/contenuti/schema'
import { ctaPrimaria, site } from '@/lib/site'

/**
 * La **copertina** del monografico: la fotografia a piena finestra, e sopra
 * quasi niente.
 *
 * È `kit/reference/storey/1440-hero.jpeg`, misurata: marchio piccolo, menu
 * piccolo, e in basso a sinistra un paragrafo in lineare leggero con sopra una
 * **barra a cinque segmenti**, il primo pieno. Nessun tipo grande — che è
 * l'opposto esatto di C, dove il marchio attraversa la finestra da bordo a
 * bordo. Il contrasto fra le due prime schermate **è** la differenza, e si vede
 * in una miniatura al 25 %.
 *
 * I cinque segmenti portano i **cinque ruoli firmabili** (`RUOLI.length`,
 * contati dal repo) e sono un **avanzamento**, non una quota: non hanno
 * terminatori obliqui, perché non misurano niente. L'elenco in chiaro sta
 * sotto, e il disegno è `aria-hidden` — sentirlo due volte è rumore.
 *
 * ## I due difetti corretti nel portarla qui
 *
 * Veniva da `components/sezioni/HeroCasa.tsx`, che montava anche il registro:
 * l'ha lasciato là dove serve, cioè nell'**indice** (`Indice.tsx`), dove la
 * pagina lo usa come sommario del fascicolo.
 *
 * 1. **il claim era un `h1` di due frasi da 158 caratteri**, il quarto testo più
 *    lungo della pagina, e `CLAUDE.md` dichiarava per D «sopra quasi niente».
 *    Adesso è **una frase**. La seconda — «la stessa squadra, dall'idea alla
 *    consegna» — è una **promessa operativa** che `CONTENUTI-DA-CLIENTE.md`
 *    elenca fra le cose da confermare frase per frase: toglierla da qui non
 *    perde niente, perché vive già in `/studio` dove la capsule si confermerà;
 * 2. **veniva tagliato in basso a documento fermo.** Misurato: il blocco
 *    comincia 120 px sotto il bordo a 1440 e **226 a 390** — sopra ci sono la
 *    testata (76 px) e la barra della proposta (44 a 1440, ma 150 a 390, perché
 *    manda a capo) — quindi gli ultimi 226 px di una `100svh` stanno sotto la
 *    piega. Si vede in `kit/reference/_dopo/CD-390.jpeg`, dove la seconda riga
 *    del paragrafo è troncata. Qui il blocco è `min-height` invece di `height`
 *    e il contenuto è ancorato in basso con un margine che tiene conto della
 *    barra: cresce se serve, invece di tagliare.
 *
 * La fotografia resta un **segnaposto dichiarato** anche mentre si vede
 * (decisione n. 27): squadrette, specifica e riga di licenza sono ancora lì, e
 * `NEXT_PUBLIC_MEDIA_DEMO=0` la riporta al campo vuoto.
 */
export function Copertina() {
  return (
    <section className="copertina" aria-label={`${site.nomeEsteso} — la copertina`}>
      <Placeholder
        label="Fotografia di un’opera realizzata — dallo studio, non un render"
        specifica="2400 × 1650 px · AVIF · ≤ 250 KB"
        demo="opera-03"
        priorita
        className="copertina-foto"
      />

      <div className="copertina-basso">
        <ol className="copertina-segmenti" aria-hidden="true">
          {RUOLI.map((r, i) => (
            <li key={r} data-pieno={i === 0 ? '' : undefined} />
          ))}
        </ol>

        <h1 className="copertina-claim">
          Uno studio di ingegneria civile e architettura a {site.citta}.
        </h1>

        <p className="copertina-ruoli">{RUOLI.join(' · ')}</p>

        <Link href={ctaPrimaria.href} className="copertina-pastiglia">
          {ctaPrimaria.label}
        </Link>
      </div>
    </section>
  )
}
