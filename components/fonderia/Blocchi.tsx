import { Colata } from '@/components/fonderia/Colata'
import { Placeholder, DaCliente } from '@/components/Placeholder'
import { Segnaposto, SegnapostoCifra } from '@/components/Segnaposto'
import { numeri } from '@/lib/numeri'
import { persone } from '@/lib/persone'
import { fasi } from '@/lib/processo'
import { progetti } from '@/lib/progetti'
import { eSegnaposto, site } from '@/lib/site'

/**
 * I blocchi dell'opzione C, sotto la copertina.
 *
 * Stanno in un file solo e non uno per componente perché sono **piccoli**, ed è
 * il punto: il corpo di C prima portava **7.139 caratteri**, il +17 % rispetto
 * ad A, e il committente ha chiesto *«molto meno copy e più media»* e *«troppo
 * testo, non penso avremo tutto questo da scrivere»*. Il bersaglio dichiarato è
 * **≤ 2.500**. Cinque blocchi da dieci righe ciascuno in cinque file avrebbero
 * cinque cappelli di commento più lunghi del codice.
 *
 * Il taglio non è un'abbreviazione: è una **sottrazione**. Escono da C la
 * tabella dei sei servizi con `comprende`/`svolge`/`serve` (1.187 caratteri), le
 * cinque fasi descritte per esteso (587), il registro con i sei pannelli
 * (2.220), le note di cantiere lunghe. Quello che resta è quello che la
 * reference ha: **una frase, dei numeri, dei nomi, delle fotografie.**
 */

/* -------------------------------------------------------------------------- */

/**
 * La dichiarazione: **una frase**, e sei micro-schegge intorno.
 *
 * È la banda 0 di `1440-intera.jpeg`, misurata: una frase centrata («Studio
 * Foundry is an Auckland-based…») con attorno **sei micro-miniature poligonali**
 * di 49×41 · 49×43 · 51×49 · 63×49 · 67×55 · 71×55 px, sparse fra x 444 e 956,
 * più una fotografia poligonale 305×253. Le sei miniature non hanno equivalente
 * nella nostra C: al posto della dichiarazione c'erano i numeri.
 *
 * Le miniature sono **campi vuoti**, non fotografie: a 50 px una fotografia non
 * si legge, e sei segnaposto di esempio a quella taglia sarebbero sei macchie.
 * Portano il ritaglio del tema e niente altro, quindi sono `aria-hidden` e
 * `data-decorativo` — il contratto della decisione n. 38: un elemento che porta
 * informazione non può avere quell'attributo, e questi non ne portano.
 */
export function Dichiarazione() {
  return (
    <Colata id="studio" primo etichetta="lo studio" valore={site.citta}>
      <p className="colata-dichiarazione">
        Uno studio di ingegneria civile e architettura a {site.citta}: progetto architettonico e
        strutturale, pratiche, cantiere.
      </p>
      <div className="colata-schegge" aria-hidden="true" data-decorativo="">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} data-scheggia={i} />
        ))}
      </div>
    </Colata>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Le quattro cifre, **ai due estremi di quattro righe**.
 *
 * Prima erano una lista con etichetta sotto e una nota di cantiere di 203
 * caratteri — il testo unitario più lungo di tutta la pagina. Qui la nota non
 * c'è: che i numeri arrivino dallo studio lo dice la barra della proposta una
 * volta per tutta la pagina, e lo dice `data-chiede` a ogni cifra. Ripeterlo
 * quattro volte in corpo 12 era rumore che si leggeva come contenuto.
 *
 * Il valore è un **segnaposto dichiarato**, non un numero inventato: sta dentro
 * un `data-chiede`, la barra lo dichiara, e la lista della spesa lo elenca. È la
 * circoscrizione della decisione n. 27 applicata al testo invece che ai media.
 */
export function Cifre() {
  return (
    <Colata id="numeri" etichetta="i numeri" valore={`${numeri.length} voci`}>
      <ul className="colata-cifre" role="list">
        {numeri.map((n) => (
          <li key={n.etichetta}>
            <SegnapostoCifra chiede={n.chiedere} cifre={n.etichetta.includes('mq') ? 5 : 2} />
            <span className="colata-cifra-nome">{n.etichetta}</span>
          </li>
        ))}
      </ul>
    </Colata>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Le opere: **una per finestra**, e ognuna è un nome grande e una scheggia.
 *
 * `1440-meta-55.jpeg`, misurato: il nome del progetto in serif maiuscolo su due
 * righe, cap **64-65 px**, passo di riga 87 px cioè **interlinea ≈ 0,95**, e —
 * questo è il gesto — **tono su tono**. A metà animazione stava a #A0A19B su
 * #E1E1D9, cioè 1,25:1; a riposo è quasi nero. Noi lo teniamo **leggibile**: il
 * tono su tono a 1,25:1 è atmosfera, e un nome di progetto è informazione.
 * Quindi il nome sta a inchiostro pieno e il **tono su tono lo prende la parola
 * di sfondo**, che è decorazione dichiarata.
 *
 * `ruolo` non si omette mai: `CLAUDE.md` § Scheda progetto lo vieta, ed è il
 * dato che dice cosa sa fare lo studio. Qui è l'unico dato oltre a tipo e anno —
 * gli altri tre (superficie, committente, luogo) stanno nella scheda, non nella
 * home di una proposta che deve avere meno testo.
 */
export function Opere() {
  return (
    <>
      {progetti.map((p, i) => (
        <Colata
          key={p.copertina}
          id={i === 0 ? 'progetti' : undefined}
          etichetta={
            <Segnaposto
              chiede={`tipo del progetto ${i + 1} (residenziale, pubblico…)`}
              parole={1}
              maiuscola={false}
            />
          }
          valore={<Segnaposto chiede={`anno del progetto ${i + 1}`} parole={1} maiuscola={false} />}
          media={
            <Placeholder
              label={p.copertina}
              specifica="2400 × 1650 px · AVIF · ≤ 250 KB"
              demo={(['opera-01', 'opera-02', 'opera-03'] as const)[i % 3]}
              className="colata-lastra"
            />
          }
        >
          <h2 className="colata-opera">
            <Segnaposto chiede={`nome del progetto ${String(i + 1).padStart(2, '0')}`} parole={2} />
          </h2>
          <p className="colata-ruolo">
            <Segnaposto
              chiede={`ruolo dello studio nel progetto ${i + 1}: progetto architettonico / strutturale / direzione lavori / coordinamento sicurezza / collaudo`}
              parole={3}
              maiuscola={false}
            />
          </p>
        </Colata>
      ))}
    </>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Il metodo: cinque fasi, **poche parole ciascuna**, e il testo entra scorrendo.
 *
 * È il blocco su cui il committente ha chiesto di *«concentrarsi su testi on
 * scroll tipo metodo e queste robe»*. In C il movimento allo scorrimento **è il
 * meccanismo** (decisione n. 40), quindi qui è al suo posto: le cinque righe
 * entrano una dopo l'altra con la timeline del blocco, in sola `opacity` e
 * `transform`.
 *
 * `fase.titolo` e basta: i `testoLungo` di `lib/processo.ts` sono la versione di
 * A, e in C sarebbero 587 caratteri per dire quello che cinque titoli dicono
 * già. Il numero resta perché **qui una sequenza c'è davvero** — cinque fasi
 * hanno un primo e un ultimo — e la regola della skill vale al contrario dove
 * le alternative sono mutuamente esclusive.
 */
export function Metodo() {
  return (
    <Colata id="processo" etichetta="come lavoriamo" valore={`${fasi.length} fasi`}>
      <ol className="colata-fasi" role="list">
        {fasi.map((f, i) => (
          <li key={f.titolo} style={{ '--indice': i } as React.CSSProperties}>
            <span className="colata-fase-numero" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="colata-fase-nome">{f.titolo}</span>
          </li>
        ))}
      </ol>
    </Colata>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Le firme: quattro campi ritratto **vuoti**, ritagliati a scheggia.
 *
 * I ritratti restano vuoti e i nomi restano `[[DA CLIENTE]]` **visibili**, non
 * lorem ipsum: è la decisione n. 27 (c), e vale anche per il testo. Una faccia
 * presa altrove sotto il nome di un ingegnere e un nome finto sotto la sua
 * qualifica sono lo stesso errore — e il campo ritratto vuoto è anche l'unico
 * segnaposto della home che fa un lavoro vero: è la lista della spesa che fa
 * arrivare le foto (decisione n. 33).
 *
 * Il ruolo però è una nostra deduzione dal profilo dello studio, non un dato
 * confermato, quindi resta anch'esso dichiarato.
 */
export function Firme() {
  return (
    <Colata id="persone" etichetta="chi firma" valore={`${persone.length} persone`}>
      <ul className="colata-firme" role="list">
        {persone.map((p, i) => (
          <li key={i}>
            <Placeholder
              label={p.ritratto}
              specifica="1200 × 1500 px · AVIF · ≤ 120 KB"
              className="colata-ritratto"
            />
            <span className="colata-firma-nome">
              <DaCliente>{p.nome}</DaCliente>
            </span>
            {/* Tre ruoli su quattro risultano da `CLAUDE.md` § Cliente e sono
                **dati veri**: marcarli come mancanti sarebbe una bugia nella
                direzione opposta. `eSegnaposto` esiste in `lib/site.ts` proprio
                per questo, ed è il modo in cui lo fa anche A. */}
            <span className="colata-firma-ruolo">
              {eSegnaposto(p.ruolo) ? <DaCliente>{p.ruolo}</DaCliente> : p.ruolo}
            </span>
          </li>
        ))}
      </ul>
    </Colata>
  )
}
