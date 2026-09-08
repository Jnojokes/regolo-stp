import { Campo } from '@/components/campo/Campo'
import { Registro } from '@/components/campo/Registro'
import { Placeholder } from '@/components/Placeholder'
import { site } from '@/lib/site'

/**
 * Hero dell'opzione C «La fonderia» — dal sistema di **Studio Foundry**,
 * chiesto per nome dal committente.
 *
 * Guardata, non descritta: `kit/reference/studio-foundry/1440-hero.jpeg`.
 * La pagina apre con **una fotografia che riempie tutta la finestra** e ci
 * sovrappone tutto il resto — è il gesto che nessuna delle altre proposte ha,
 * e non è un dettaglio di stile: è un'altra idea di che cos'è una home. In A
 * la fotografia sta accanto al testo; qui il testo sta **sopra** la fotografia.
 *
 * Tre cose, tutte prese dalla schermata:
 *
 * 1. **Il marchio attraversa l'intera larghezza e si sovrappone alla foto.**
 *    Serif ad altissimo contrasto, tutto maiuscolo, allineato ai due bordi.
 *    È l'`h1`: in questo sistema il titolo della pagina è il nome dello studio,
 *    non una frase — e la frase arriva dopo, in basso, in un lineare leggero.
 * 2. **Il claim in due tempi**, in basso a sinistra, sopra l'immagine.
 * 3. **Nessun riquadro.** Niente card, niente fondo, niente ombra: solo
 *    tipografia su fotografia.
 *
 * Il registro — il meccanismo, cioè le sei righe che *sono* il passo 1 del
 * brief — arriva **sotto la piega**, sulla carta calda: sopra c'è il
 * manifesto, sotto comincia il lavoro. È la stessa scelta della reference, che
 * sopra la piega non chiede niente.
 *
 * La fotografia resta un **segnaposto dichiarato** anche mentre si vede
 * (decisione n. 27): squadrette, specifica e riga di licenza sono ancora tutte
 * lì, e `NEXT_PUBLIC_MEDIA_DEMO=0` la riporta al campo vuoto.
 */
export function HeroFonderia({
  interventoIniziale = null,
}: {
  interventoIniziale?: string | null
}) {
  return (
    <>
      <section className="fonderia-hero">
        <Placeholder
          label="Fotografia di un’opera realizzata — dallo studio, non un render"
          specifica="2400 × 1650 px · AVIF · ≤ 250 KB"
          demo="opera-01"
          priorita
          className="fonderia-foto"
        />

        {/* Il marchio sopra la fotografia. `aria-hidden` sulle lettere no: è
            l'h1 vero della pagina, ed è anche il nome che il passaparola ha
            pronunciato — su un sito che è il secondo contatto, vederlo per
            primo e grande è esattamente il punto. */}
        <h1 className="fonderia-marchio">{site.nomeEsteso}</h1>

        <p className="fonderia-claim">
          <span>Progettiamo e dirigiamo.</span>
          <span>Dal disegno al cantiere.</span>
        </p>
      </section>

      <Campo primo id="percorsi" etichetta="il punto di partenza">
        <h2 className="fonderia-domanda">Che intervento hai in mente?</h2>
        <p className="hero-lead">
          Scegli il tuo caso: ti diciamo subito cosa comprende, come si svolge e cosa serve da parte
          tua. Ingegneria civile e architettura, a {site.citta}.
        </p>
        <Registro interventoIniziale={interventoIniziale} />
      </Campo>
    </>
  )
}
