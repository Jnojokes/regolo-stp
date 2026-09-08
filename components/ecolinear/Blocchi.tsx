import Link from 'next/link'
import { DaCliente, Placeholder } from '@/components/Placeholder'
import { Segnaposto, SegnapostoCifra } from '@/components/Segnaposto'
import {
  GrigliaCostruzione,
  SegnoFase,
  SegnoPilastro,
  SegnoPorta,
  SegnoSezione,
} from '@/components/ecolinear/Disegni'
import { numeri } from '@/lib/numeri'
import { persone } from '@/lib/persone'
import { fasi } from '@/lib/processo'
import { progetti } from '@/lib/progetti'
import { eSegnaposto, site } from '@/lib/site'

/**
 * I blocchi dell'opzione B «ecoLINEAR».
 *
 * Il committente ha chiesto *«l'opzione 2 la voglio identica a questo sito»*
 * indicando `https://ecolinearstudio.com/`. Il sito è stato catturato e
 * **misurato nel browser** (`kit/reference/ecolinear/`, tabella in
 * `SCHEDA.md`), e quello che segue è il suo impianto blocco per blocco.
 *
 * ## Che cos'è quella pagina, e perché non somiglia ad A
 *
 * È **un foglio da disegno tecnico**: fondo grigio carta, linee di costruzione
 * tratteggiate che la attraversano, disegni a filo negli angoli, e il testo in
 * **terracotta** invece che in nero. A è una colonna di sezioni separate dal
 * vuoto; qui la pagina è una superficie unica su cui sono appoggiate delle cose.
 *
 * Le quattro differenze strutturali, non di vestito:
 *
 * 1. **niente ritmo verticale dichiarato.** A ha tre passi (48 · 96 · 200); qui
 *    non ce n'è nessuno: la griglia di costruzione tiene la composizione e i
 *    blocchi cadono dove la griglia li mette;
 * 2. **la galleria è a colonne sfalsate**, non una griglia allineata. Misurato
 *    sulla reference: quattro colonne, ognuna con il proprio scarto verticale,
 *    e i media di rapporto diverso nella stessa fila;
 * 3. **le fasi sono pinnate.** Il pannello di sinistra e il righello di destra
 *    restano fermi mentre le fasi passano: un blocco che *non scorre* è la cosa
 *    che A non ha per costruzione;
 * 4. **i segni di registro al posto dell'occhiello.** Dove A mette
 *    un'etichetta, qui ci sono quattro squadrette d'angolo in ambra attorno
 *    alla parola. È il gesto che `SCHEDA.md` dice di prendere da qui.
 */

/* -------------------------------------------------------------------------- */

/**
 * La copertina: **il foglio**.
 *
 * `kit/reference/ecolinear/1440-hero.jpeg`, misurato: la griglia tratteggiata,
 * i tre disegni a filo negli angoli, il marchio grande e centrato in terracotta
 * con **un blocco in ambra** sopra una lettera, e un filetto sottile e scuro
 * sotto.
 *
 * Il blocco d'ambra è il gesto che rende quel logotipo un logotipo: nella
 * reference copre la barra della `E` di `ecoLINEAR`. Qui sta sopra la `O` di
 * `REGOLO`, che è la lettera con il contorno chiuso — l'unica su cui un blocco
 * pieno legge come un intervento e non come un errore di stampa.
 *
 * Il corpo del marchio **non è un gradino di scala**: è una funzione della
 * finestra e delle dieci lettere, come in `A` la quota è una funzione dei
 * ruoli. Così tocca i due margini a qualunque larghezza.
 */
export function Copertina() {
  return (
    <section className="foglio" aria-label={`${site.nomeEsteso} — la copertina`}>
      <GrigliaCostruzione />
      <SegnoPorta className="segno-porta" />
      <SegnoPilastro className="segno-pilastro" />
      <SegnoSezione className="segno-sezione" />

      <div className="foglio-centro">
        <h1 className="foglio-marchio">
          <span>REG</span>
          {/* La lettera con il blocco: `aria-hidden` sul blocco, non sulla
              lettera — il marchio dev'essere leggibile per intero da chi
              ascolta, e un blocco di colore non si legge. */}
          <span className="foglio-lettera">
            O<span className="foglio-blocco" aria-hidden="true" />
          </span>
          <span>LO STP</span>
        </h1>
        <p className="foglio-filetto" aria-hidden="true" data-decorativo="" />
        <p className="foglio-sotto">
          Ingegneria civile e architettura a {site.citta}: progetto architettonico e strutturale,
          pratiche, cantiere.
        </p>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * La galleria a **colonne sfalsate**.
 *
 * `1440-meta-18.jpeg`, misurato: quattro colonne, ognuna con uno scarto
 * verticale diverso, e dentro **rapporti misti nella stessa fila** — fotografie,
 * render, assonometrie a filo, sezioni, piante. Non è una griglia di card: è
 * una parete di tavole appese.
 *
 * Lo scarto è dichiarato per colonna (`--scarto`) e non calcolato da una
 * libreria di masonry: quattro valori fissi fanno la stessa cosa, senza
 * JavaScript e senza salti al caricamento.
 *
 * I rapporti sono **quattro diversi** e si ripetono in ordine sfalsato, così
 * due media adiacenti non hanno mai la stessa forma — che è la differenza fra
 * una parete di tavole e una griglia di riquadri.
 */
const RAPPORTI = ['3 / 4', '4 / 3', '1 / 1', '16 / 10'] as const
const MEDIA = [
  'opera-01',
  'opera-02',
  'opera-03',
  'interno-01',
  'cantiere-01',
  'dettaglio-01',
] as const

export function Galleria() {
  /* Otto campi su quattro colonne: due per colonna, con i rapporti sfalsati.
     Sei portano un media di esempio, due restano **campi vuoti** — nella
     reference le assonometrie a filo sono disegni e non fotografie, e un campo
     vuoto con le sue squadrette dice «qui va una tavola» meglio di una foto di
     repertorio. */
  const campi = Array.from({ length: 8 }, (_, i) => ({
    ratio: RAPPORTI[(i * 3) % RAPPORTI.length],
    demo: i % 4 === 3 ? undefined : MEDIA[i % MEDIA.length],
    colonna: i % 4,
  }))

  return (
    <section className="galleria" id="progetti" aria-labelledby="galleria-titolo">
      <p className="registro-etichetta">
        <span>progetti</span>
      </p>
      <h2 id="galleria-titolo" className="ecolinear-titolo">
        Quello che abbiamo costruito.
      </h2>
      <div className="galleria-colonne">
        {[0, 1, 2, 3].map((c) => (
          <div key={c} className="galleria-colonna" data-colonna={c}>
            {campi
              .filter((x) => x.colonna === c)
              .map((x, i) => (
                <figure key={i} className="galleria-tavola">
                  <Placeholder
                    label={
                      x.demo
                        ? 'Fotografia di un’opera realizzata — dallo studio, non un render'
                        : 'Tavola: assonometria, sezione o pianta — dal progetto dello studio'
                    }
                    specifica={
                      x.demo ? '1600 × 2000 px · AVIF · ≤ 200 KB' : '1600 × 1600 px · SVG o AVIF'
                    }
                    ratio={x.ratio}
                    demo={x.demo}
                    className="galleria-media"
                  />
                  <figcaption className="galleria-didascalia">
                    <Segnaposto
                      chiede={`nome e luogo della tavola ${c * 2 + i + 1} della galleria`}
                      parole={3}
                      maiuscola={false}
                    />
                  </figcaption>
                </figure>
              ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Le fasi, **pinnate**: il blocco per cui questa proposta esiste.
 *
 * `1440-meta-52.jpeg` e `-88.jpeg`, misurati. A sinistra un pannello quadrato
 * `#F3F5F1` con **quattro squadrette d'angolo in ambra** e dentro un disegno a
 * filo che cambia con la fase, con la didascalia `fig. 0n` in basso — e
 * cambia con lui, perché nomina la tavola che si sta vedendo. A destra
 * l'etichetta `il metodo` fra le squadrette, il **numerone al 12 % di
 * opacità** a 158,4 px, il titolo a 46,1 px e un paragrafo di misura 609 px.
 * All'estremo destro un **righello verticale** con una tacca per fase.
 *
 * ## Pinnato senza JavaScript
 *
 * La reference lo fa con ScrollTrigger. Qui il pannello e il righello sono
 * `position: sticky` e le fasi scorrono accanto: **zero byte di JavaScript**, e
 * il risultato in lettura è lo stesso — la tavola resta, il metodo passa.
 * Senza JS funziona identico, perché non c'è JS; con
 * `prefers-reduced-motion: reduce` non cambia niente, perché niente si anima:
 * `sticky` non è un'animazione, è una posizione.
 *
 * Il pannello mostra il disegno **dell'ultima fase entrata in vista** con
 * `:has()` — no: `:has()` non sa dire «quale è più vicino al centro» senza JS.
 * Quindi i cinque disegni sono tutti in pagina, impilati nel pannello, e ognuno
 * si accende quando la sua fase è in vista con `animation-timeline: view()`.
 * Dove quel supporto manca (Firefox) resta visibile **il primo**, che è uno
 * stato finito e coerente: la tavola del primo incontro accanto al metodo.
 */
export function Fasi() {
  return (
    <section className="fasi-pinnate" id="processo" aria-labelledby="fasi-titolo">
      <div className="fasi-tavola">
        <div className="fasi-pannello">
          {/* La didascalia sta **dentro** il disegno, non sul pannello: così si
              accende con lui e il numero è quello della tavola che si sta
              vedendo. Con una didascalia fissa sul pannello si leggeva
              `fig. 05` accanto al numerone `02`, cioè due numeri che dicono
              cose diverse nello stesso riquadro. Il numero lo conta il repo —
              è l'indice della fase — e non è scritto a mano. */}
          {fasi.map((f, i) => (
            <div key={f.titolo} className="fasi-disegno" data-fase={i}>
              <SegnoFase indice={i} />
              <p className="fasi-fig">fig. 0{i + 1}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="fasi-corpo">
        <p className="registro-etichetta">
          <span>il metodo</span>
        </p>
        <h2 id="fasi-titolo" className="sr-only">
          Come lavoriamo, in {fasi.length} fasi
        </h2>
        {fasi.map((f, i) => (
          <article key={f.titolo} className="fase" data-fase={i}>
            {/* Il numerone tono su tono: 158,4 px al 12 % di opacità, misurato.
                È **decorazione dichiarata** — il numero della fase è già
                nell'ordine di lettura e nel titolo, e a 1,9:1 non può portare
                informazione (decisione n. 38). */}
            <span className="fase-numerone" aria-hidden="true" data-decorativo="">
              0{i + 1}
            </span>
            <h3 className="fase-titolo">{f.titolo}</h3>
            <p className="fase-testo">{f.testoLungo}</p>
          </article>
        ))}
      </div>

      {/* Il righello: una tacca per fase, all'estremo destro. Porta un numero
          che il repo conta (`fasi.length`), quindi è informazione e non
          decorazione — e per questo ha un nome accessibile invece di
          `aria-hidden`. */}
      <div className="fasi-righello" role="img" aria-label={`${fasi.length} fasi`}>
        <span className="fasi-righello-asta" />
        {fasi.map((f, i) => (
          <span key={f.titolo} className="fasi-tacca" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * I numeri, come **quote vere**.
 *
 * È la lezione che `SCHEDA.md` dice di prendere da qui: *«una quota in pagina
 * dichiara una quantità che esiste o non si disegna»*. Nella reference la quota
 * porta `14.34 M — ESC 1:50`, cioè un numero vero con la sua scala. Qui i
 * quattro numeri dello studio stanno su una **linea di quota** con i due
 * terminatori e l'annotazione sopra, e ognuno è un valore che il committente
 * darà: quindi non è ornamento.
 */
export function Numeri() {
  return (
    <section className="numeri-quota" id="numeri" aria-labelledby="numeri-titolo">
      <p className="registro-etichetta">
        <span>i numeri</span>
      </p>
      <h2 id="numeri-titolo" className="ecolinear-titolo">
        Quanto abbiamo costruito.
      </h2>
      <dl className="quote-numeri">
        {numeri.map((n) => (
          <div key={n.etichetta} className="quota-numero">
            <dt>{n.etichetta}</dt>
            <dd>
              <SegnapostoCifra chiede={n.chiedere} cifre={n.etichetta.includes('mq') ? 5 : 2} />
            </dd>
            <span className="quota-linea" aria-hidden="true" data-decorativo="" />
          </div>
        ))}
      </dl>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/** Le persone: campi ritratto vuoti, nome e ruolo. Il nome resta dichiarato. */
export function Persone() {
  return (
    <section className="ecolinear-persone" id="persone" aria-labelledby="persone-titolo">
      <p className="registro-etichetta">
        <span>chi firma</span>
      </p>
      <h2 id="persone-titolo" className="ecolinear-titolo">
        Chi firma il progetto.
      </h2>
      <ul className="ecolinear-firme" role="list">
        {persone.map((p, i) => (
          <li key={i}>
            <Placeholder
              label={p.ritratto}
              specifica="1200 × 1500 px · AVIF · ≤ 120 KB"
              ratio="4 / 5"
              className="ecolinear-ritratto"
            />
            <p className="ecolinear-nome">
              <DaCliente>{p.nome}</DaCliente>
            </p>
            <p className="ecolinear-ruolo">
              {eSegnaposto(p.ruolo) ? <DaCliente>{p.ruolo}</DaCliente> : p.ruolo}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * L'invito: **la CTA prima della galleria**, che è l'impianto misurato di
 * ecoLINEAR e che `CLAUDE.md` § Le tre opzioni già registrava come sua.
 *
 * `1440-meta-88.jpeg`: l'etichetta `information` fra le squadrette, la domanda
 * a 46,1 px, un paragrafo con **il nome dello studio in ambra e in grassetto**
 * dentro il testo, e una pastiglia `CONTACT US →` con la freccia in un
 * cerchietto, anche lei fra le squadrette.
 *
 * L'ambra sul nome dello studio è testo, quindi qui **non** è il valore della
 * reference (2,26:1) ma `--regolo-ambra-testo`, che ha la stessa tinta e la
 * stessa saturazione a 4,54:1. Il perché sta nel blocco dei token.
 */
export function Invito() {
  return (
    <section className="invito" aria-labelledby="invito-titolo">
      <p className="registro-etichetta">
        <span>informazioni</span>
      </p>
      <h2 id="invito-titolo" className="ecolinear-titolo">
        Hai un progetto?
      </h2>
      <p className="invito-testo">
        Da <strong>{site.nomeEsteso}</strong> ogni incarico si segue con la stessa squadra, dal
        primo incontro alla consegna.
      </p>
      <p className="registro-azione">
        <Link href="#brief" className="invito-pastiglia">
          <span>Raccontaci il progetto</span>
          <span className="invito-freccia" aria-hidden="true">
            →
          </span>
        </Link>
      </p>
    </section>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Le tre opere in evidenza, come **schede tecniche di tavola**: il nome, i dati
 * duri in una riga di quota, e il campo della fotografia.
 *
 * Il campo **ruolo dello studio** non si omette: `CLAUDE.md` § Scheda progetto
 * lo vieta, ed è il dato che dice cosa sanno fare.
 */
export function Opere() {
  return (
    <section className="opere" aria-labelledby="opere-titolo">
      <p className="registro-etichetta">
        <span>in evidenza</span>
      </p>
      <h2 id="opere-titolo" className="ecolinear-titolo">
        Tre tavole.
      </h2>
      <div className="opere-tre">
        {progetti.map((p, i) => (
          <article key={p.copertina} className="opera">
            <Placeholder
              label={p.copertina}
              specifica="1600 × 1200 px · AVIF · ≤ 200 KB"
              ratio="4 / 3"
              demo={(['opera-01', 'opera-02', 'opera-03'] as const)[i % 3]}
              className="opera-media"
            />
            <h3 className="opera-nome">
              <Segnaposto
                chiede={`nome del progetto ${String(i + 1).padStart(2, '0')}`}
                parole={3}
              />
            </h3>
            <dl className="opera-dati">
              {p.dati.slice(0, 4).map((d) => (
                <div key={d.etichetta}>
                  <dt>{d.etichetta}</dt>
                  <dd>
                    <Segnaposto
                      chiede={`${d.etichetta.toLowerCase()} del progetto ${i + 1}`}
                      parole={2}
                      maiuscola={false}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
