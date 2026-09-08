import { Placeholder } from '@/components/Placeholder'
import { site } from '@/lib/site'

/** Le due righe del claim: una sola sorgente per i due strati. */
const CLAIM = ['Progettiamo e dirigiamo.', 'Dal disegno al cantiere.'] as const

/**
 * Hero dell'opzione B «La fonderia» — **la colata**.
 *
 * ## L'errore che questo file ripara
 *
 * Il committente ha mandato tre schermate di `studio-foundry.sujen.co` prese
 * *durante lo scorrimento*. La versione precedente di questa hero era costruita
 * su `kit/reference/studio-foundry/1440-hero.jpeg`, che è **il fotogramma
 * finale**: la fotografia partiva già a piena finestra dal primo frame. Cioè
 * era stato copiato il risultato e buttato il gesto.
 *
 * Le prove del gesto erano già nel repo, e non erano state lette come
 * sequenza:
 *
 * - `1440-meta-30.jpeg` — a un terzo di pagina la carta è quasi tutta vuota e
 *   le fotografie sono **schegge angolari piccole**, sparse, con la pastiglia
 *   `MENU` fissa in basso a destra;
 * - `1440-meta-55.jpeg` — una scheggia entra dal basso **crescendo**;
 * - `1440-intera.jpeg` — la pagina intera è alta 17.503 px a 1440 e per la
 *   maggior parte è carta senza niente sopra.
 *
 * Quindi la prima schermata di C **non è una fotografia**: è carta, con una
 * scheggia in mezzo. La fotografia arriva scorrendo.
 *
 * ## Il gesto, e perché costa zero
 *
 * `@property` + `animation-timeline: view()`: due custom property registrate
 * (`--colata`, l'apertura; `--taglio`, la deformazione) pilotano un
 * `clip-path: polygon()` calcolato in `calc()`. **Zero byte di JavaScript**, ed
 * è lo stesso meccanismo già in pagina e già collaudato per il prima/dopo
 * (`app/css/campi.css`, il commento «L'UNICA ANIMAZIONE ALLO SCORRIMENTO»).
 *
 * Le cautele sono le quattro di quel blocco più una nuova, e stanno tutte in
 * `app/css/temi-cd.css`. La quinta: i valori iniziali delle due property sono
 * **lo stato finito** (`--colata: 1`, `--taglio: 0`), perché fuori dalla
 * `animation-range` — e in tutti i casi in cui l'animazione non si applica
 * (Firefox, `prefers-reduced-motion: reduce`) — quello è ciò che si vede.
 * Dove il gesto manca si vede la pagina di ieri, che era già finita.
 *
 * ## Perché il marchio è scritto due volte
 *
 * Nella reference il marchio sta **sopra** la fotografia, ed è il gesto che
 * `kit/reference/SCHEDA.md` dice di prendere da Studio Foundry. Ma qui la
 * fotografia arriva dopo: al primo fotogramma il marchio è su carta, all'ultimo
 * su una fotografia scura. Un solo strato che cambia colore strada facendo
 * sarebbe **illeggibile a metà** — nel fotogramma in cui la scheggia ha coperto
 * mezza parola, quella metà è inchiostro su nero.
 *
 * Allora il testo è **due strati registrati pixel su pixel**:
 *
 * 1. `.colata-strato-inchiostro` — inchiostro sulla carta (21:1). Contiene
 *    l'`h1` vero e il claim vero. Sta **sotto** la fotografia, che quindi lo
 *    copre esattamente dove arriva;
 * 2. `.colata-strato-carta` — carta, `aria-hidden`, ritagliato con **lo stesso
 *    poligono** della fotografia, e porta lui il velo come
 *    `background-color` vero.
 *
 * Il risultato non è un effetto: è una **garanzia**. Dove c'è carta si legge
 * inchiostro, dove c'è fotografia si legge carta, e non esiste un fotogramma
 * intermedio in cui un carattere stia su un fondo del proprio tono. Il velo è
 * un colore e non un gradiente perché `scripts/collaudo/contrasto-dom.mjs` sa
 * misurare solo quello (decisione n. 38): il caso peggiore possibile — una
 * fotografia bianca pura — resta calcolabile a mano.
 *
 * ## Cosa NON c'è
 *
 * **Il registro non è più qui.** Le sei righe che sono il passo 1 del brief
 * restano il meccanismo di D, dove diventano l'indice del monografico; C vende
 * con le fotografie e non chiede niente sopra la piega — che è anche ciò che
 * fanno le due reference. Il brief di C parte da «passo 1 di 5».
 *
 * La fotografia resta un **segnaposto dichiarato** anche mentre si vede
 * (decisione n. 27): squadrette, specifica e riga di licenza sono ancora lì, e
 * `NEXT_PUBLIC_MEDIA_DEMO=0` la riporta al campo vuoto.
 */
export function HeroFonderia() {
  return (
    /* La scena è alta due schermate e non porta contenuto: è la corsa dello
       scorrimento durante la quale il palco resta fermo. La `view-timeline` è
       dichiarata qui e il palco, che le è figlio, la usa per nome. */
    <section className="colata-scena" aria-label={`${site.nomeEsteso} — la copertina`}>
      <div className="colata-palco">
        {/* Lo strato 1: l'inchiostro sulla carta. È il contenuto vero, e sta
            sotto la fotografia. */}
        <div className="colata-strato colata-strato-inchiostro">
          <h1 className="colata-marchio">{site.nomeEsteso}</h1>
          <p className="colata-claim">
            {CLAIM.map((riga) => (
              <span key={riga}>{riga}</span>
            ))}
          </p>
        </div>

        {/* La scheggia: la fotografia, ritagliata dal poligono che si apre. */}
        <Placeholder
          label="Fotografia di un’opera realizzata — dallo studio, non un render"
          specifica="2400 × 1650 px · AVIF · ≤ 250 KB"
          demo="opera-01"
          priorita
          className="colata-scheggia"
        />

        {/* Lo strato 2: la carta sopra la fotografia, con lo stesso ritaglio.
            `aria-hidden` perché è la stessa frase dello strato 1: chi ascolta
            la sentirebbe due volte. */}
        <div className="colata-strato colata-strato-carta" aria-hidden="true">
          <p className="colata-marchio">{site.nomeEsteso}</p>
          <p className="colata-claim">
            {CLAIM.map((riga) => (
              <span key={riga}>{riga}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
