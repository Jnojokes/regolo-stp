import { Figura, Segnatura } from '@/components/monografia/Segnatura'
import { Indice } from '@/components/monografia/Indice'
import { DaCliente, Placeholder } from '@/components/Placeholder'
import { Segnaposto } from '@/components/Segnaposto'
import { Confronto } from '@/components/sezioni/Confronto'
import { persone } from '@/lib/persone'
import { fasi } from '@/lib/processo'
import { progetti } from '@/lib/progetti'
import { eSegnaposto, site } from '@/lib/site'

/**
 * I blocchi del fascicolo. Il corpo di D portava **7.323 caratteri**, il +20 %
 * rispetto ad A, e il bersaglio dichiarato è **≤ 3.500** — più alto di quello di
 * C (2.500) perché un monografico porta didascalie e un colophon, e quelle sono
 * il suo contenuto, non il suo riempimento.
 */

/* -------------------------------------------------------------------------- */

/**
 * **Il frontespizio**: la pagina che nessun'altra proposta ha.
 *
 * Un monografico non apre col capitolo: apre con la copertina e poi con la
 * pagina del titolo. Qui sta il **masthead allargato** che il committente ha
 * chiesto — `REGOLO` in Anybody a `wdth 150 / wght 900` — e il corpo non è un
 * gradino di scala: è **calcolato sull'avanzamento misurato del carattere**.
 * `REGOLO` in questo taglio avanza **6,282 em** (letto da `hmtx` con fontTools),
 * quindi `calc((100vw − 2×margine) / 6.282)` lo porta esattamente da margine a
 * margine, a qualunque larghezza e senza moltiplicatori a occhio.
 *
 * È lo stesso metodo del marchio di C, e la ragione per cui vale la pena: la
 * versione precedente di quella hero usava un moltiplicatore stimato e il
 * marchio si fermava **114 px prima del margine destro** — margine 162 contro
 * 60 a sinistra, misurato, mentre nella reference lo scarto fra i due è di
 * 18 px.
 */
export function Frontespizio() {
  return (
    <Segnatura folio="1" occhiello="frontespizio" respiro={1}>
      <p className="frontespizio-masthead" aria-hidden="true">
        REGOLO
      </p>
      {/* Il nome accessibile lo porta il testo qui sotto: il masthead è la
          stessa parola in forma di disegno, e chi ascolta non deve sentirla due
          volte. */}
      <p className="frontespizio-riga">
        {site.nomeEsteso} — società tra professionisti · ingegneria civile e architettura
      </p>
      <p className="frontespizio-luogo">
        {site.citta} ({site.provincia}) · MMXXVI
      </p>
    </Segnatura>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * L'indice, cioè il funnel di D: sei voci che **sono** il passo 1 del brief.
 * Il perché sta in `Indice.tsx`; qui c'è solo la cornice editoriale.
 */
export function Sommario({ interventoIniziale = null }: { interventoIniziale?: string | null }) {
  return (
    <Segnatura
      id="percorsi"
      folio="2"
      occhiello="indice"
      titolo="Da dove si comincia."
      respiro={2.2}
    >
      <Indice interventoIniziale={interventoIniziale} />
    </Segnatura>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Le tavole: **un progetto per pagina**, con la figura che sborda da un lato e i
 * dati duri in tabella a filetti.
 *
 * Il campo **ruolo dello studio** non si omette mai: `CLAUDE.md` § Scheda
 * progetto lo vieta, ed è il dato che dice cosa sanno fare. Qui i cinque dati
 * ci stanno tutti, al contrario di C che ne tiene due: una monografia è il posto
 * dove i dati si leggono, e questo è il suo contenuto — non il suo testo di
 * troppo.
 *
 * La figura sborda alternativamente a destra e a sinistra, **una per volta**: è
 * il gesto misurato di Storey (nelle bande l'immagine esce da un solo lato).
 * Alternare evita che tre tavole di fila leggano come un motivo.
 */
export function Tavole() {
  return (
    <>
      {progetti.map((p, i) => (
        <Segnatura
          key={p.copertina}
          id={i === 0 ? 'progetti' : undefined}
          folio={String(3 + i)}
          occhiello={`tavole — ${i + 1} di ${progetti.length}`}
          titolo={
            <Segnaposto chiede={`nome del progetto ${String(i + 1).padStart(2, '0')}`} parole={3} />
          }
          respiro={i === 0 ? 2.8 : 1}
          figura={
            <Figura
              numero={i + 1}
              sborda={i % 2 === 0 ? 'destra' : 'sinistra'}
              didascalia={
                <Segnaposto
                  chiede={`didascalia della fotografia del progetto ${i + 1}: cosa si vede e da dove`}
                  parole={6}
                  maiuscola={false}
                />
              }
            >
              <Placeholder
                label={p.copertina}
                specifica="2400 × 1650 px · AVIF · ≤ 250 KB"
                demo={(['opera-01', 'opera-02', 'interno-01'] as const)[i % 3]}
                className="figura-lastra"
              />
            </Figura>
          }
        >
          <table className="tavola-dati">
            <caption className="sr-only">Dati del progetto {i + 1}</caption>
            <tbody>
              {p.dati.map((d) => (
                <tr key={d.etichetta}>
                  <th scope="row">{d.etichetta}</th>
                  <td>
                    <Segnaposto
                      chiede={`${d.etichetta.toLowerCase()} del progetto ${i + 1}`}
                      parole={2}
                      maiuscola={false}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Segnatura>
      ))}
    </>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Il metodo: cinque voci numerate **`01)`** — con la parentesi chiusa, che è la
 * numerazione misurata di Storey e non `01 —` — con **una proposizione
 * ciascuna**, su due colonne.
 *
 * **Solo i titoli.** `lib/processo.ts` ha due testi per fase — `testoLungo` per A
 * e `testoBreve` — e all'inizio qui c'era il breve. Misurato sul build, il
 * blocco usciva a **472 caratteri** e il corpo di D a 3.953 contro un bersaglio
 * di 3.500: i cinque titoli («Primo incontro», «Fattibilità e costi»,
 * «Progetto», «Autorizzazioni», «Cantiere e direzione lavori») dicono già la
 * sequenza, e la riga sotto la ripeteva con altre parole. Il taglio è dove il
 * testo era ridondante, non dove faceva comodo.
 *
 * Le due colonne restano: sono i due capoversi in banda nera di
 * `1440-meta-52.jpeg`, misurati a 24 px con interlinea 27,6.
 */
export function Metodo() {
  return (
    <Segnatura
      id="processo"
      folio={String(3 + progetti.length)}
      occhiello="il metodo"
      titolo="Come si lavora."
      respiro={2.2}
    >
      <ol className="metodo-voci" role="list">
        {fasi.map((f, i) => (
          <li key={f.titolo}>
            <span className="metodo-numero">{String(i + 1).padStart(2, '0')})</span>
            <span className="metodo-nome">{f.titolo}</span>
          </li>
        ))}
      </ol>
    </Segnatura>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * La banda nera: **l'unico momento grande di D**, e il display è centrato sopra
 * la fotografia.
 *
 * È `1440-meta-28.jpeg`, misurato: una banda a piena larghezza con la
 * fotografia sotto e il display centrato a ~130 px, interlinea 1,0. Centrato è
 * una deviazione dichiarata dalla voce di casa «niente sezioni centrate»:
 * quella regola difende A, che è una tavola a filo sinistro. Qui è il gesto
 * misurato della reference, e vale **una volta** in tutta la pagina.
 *
 * È anche il solo posto dove l'interlinea 1,0 di Storey è **riproducibile**: il
 * display è Anybody Wide tutto maiuscolo, e la sua soglia d'inchiostro su questa
 * stringa sta sotto 1,0. Con Inter (soglia 1,158 sul caso peggiore) lo stesso
 * valore faceva toccare i titoli, ed era il difetto che il committente ha visto.
 */
export function Banda() {
  return (
    <Segnatura folio={String(4 + progetti.length)} occhiello="l’opera" respiro={1} fondo="nera">
      <Placeholder
        label="Fotografia di un’opera realizzata — dallo studio, non un render"
        specifica="2400 × 1350 px · AVIF · ≤ 250 KB"
        demo="opera-02"
        className="banda-foto"
      />
      <p className="banda-claim">Dal disegno al cantiere</p>
    </Segnatura>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Il prima/dopo, **come figura numerata**. È il blocco «wow» di D, e resta solo
 * a lei: C ha i suoi due (la colata e il volume), e `CLAUDE.md` § Regole 3 ne
 * ammette due per pagina.
 *
 * `Confronto` è un client component e non si tocca: il cursore compare solo
 * dopo l'idratazione, così senza JavaScript non c'è un controllo morto. Ed è
 * l'**unica** animazione allo scorrimento di D — sta in `app/css/sezioni.css`
 * perché la usa anche una pagina di A, e ripara un difetto: senza JavaScript il
 * taglio resterebbe fermo a metà, cioè una fotografia divisa in due che non
 * dimostra niente.
 */
export function PrimaDopo() {
  return (
    <Segnatura
      id="prima-dopo"
      folio={String(5 + progetti.length)}
      occhiello="prima e dopo"
      titolo="Lo stesso edificio, due volte."
      respiro={2.2}
      figura={
        <Figura
          numero={progetti.length + 1}
          sborda="destra"
          didascalia={
            <Segnaposto
              chiede="didascalia del prima/dopo: che intervento è, dove, in che anno"
              parole={6}
              maiuscola={false}
            />
          }
        >
          <Confronto
            prima="[[DA CLIENTE: foto dello stato attuale]]"
            dopo="[[DA CLIENTE: foto dopo, stesso punto di ripresa]]"
            specifica="1600 × 1000 px · AVIF · ≤ 250 KB"
            demoPrima="prima-01"
            demoDopo="dopo-01"
          />
        </Figura>
      }
    />
  )
}

/* -------------------------------------------------------------------------- */

/**
 * I ritratti come tavola, con le didascalie.
 *
 * I campi restano **vuoti** e i nomi restano `[[DA CLIENTE]]` **visibili**, non
 * lorem ipsum: è la decisione n. 27 (c), e vale anche per il testo. Una faccia
 * presa altrove sotto il nome di un ingegnere e un nome finto sotto la sua
 * qualifica sono lo stesso errore. Tre ruoli su quattro invece risultano da
 * `CLAUDE.md` § Cliente e sono dati veri: marcarli come mancanti sarebbe una
 * bugia nella direzione opposta, e `eSegnaposto` esiste per distinguerli.
 *
 * **Le abilitazioni non stanno qui**, e non è una dimenticanza: erano quattro
 * `[[DA CLIENTE: ordine, sezione e numero]]` per 160 caratteri, e il blocco era
 * il più verboso della pagina dopo il brief (691 caratteri misurati). Ordine,
 * sezione e numero sono un dato **bloccante** e vanno in pagina — ma in
 * `/studio`, dove le persone hanno una scheda, e nel nodo `Person.hasCredential`
 * dello schema (`CLAUDE.md` § SEO). In una copertina di monografico i nomi si
 * elencano; le credenziali si leggono dentro. `CONTENUTI-DA-CLIENTE.md` le
 * elenca comunque, perché la lista della spesa si raccoglie da **tutte** le
 * rotte, non solo dalla home.
 */
export function Ritratti() {
  return (
    <Segnatura
      id="persone"
      folio={String(6 + progetti.length)}
      occhiello="chi firma"
      titolo="Chi firma il progetto."
      respiro={2.8}
    >
      <ul className="ritratti" role="list">
        {persone.map((p, i) => (
          <li key={i}>
            <Placeholder
              label={p.ritratto}
              specifica="1200 × 1500 px · AVIF · ≤ 120 KB"
              className="ritratto-lastra"
            />
            <p className="ritratto-nome">
              <DaCliente>{p.nome}</DaCliente>
            </p>
            <p className="ritratto-ruolo">
              {eSegnaposto(p.ruolo) ? <DaCliente>{p.ruolo}</DaCliente> : p.ruolo}
            </p>
          </li>
        ))}
      </ul>
    </Segnatura>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * **Il colophon**: la schedina a righe, i metadati in mono ai due estremi, e
 * **una riga scritta a mano**.
 *
 * È il blocco di `1440-meta-52.jpeg`, misurato: una carta rigata con il piè di
 * pagina in mono (`ST / CTF   THANK YOU   STOREY.STUDIO`) e una riga
 * calligrafica. È il materiale «artigiano» che il committente ha chiesto, e non
 * è inventato: sta nella reference ed è già misurato in `SCHEDA.md`.
 *
 * La calligrafica è **una volta sola in tutta la pagina**, ed è una firma
 * proprio perché non si ripete: Storey usa Biro esattamente una volta. Se in
 * pagina se ne trovano due, la regola è stata violata — si controlla con un
 * `grep` di `--font-mano`.
 *
 * Un colophon è anche il posto giusto per dire che cosa si sta guardando: la
 * barra della proposta lo dichiara in cima, e qui il fascicolo si chiude
 * dicendo la stessa cosa nella sua lingua.
 */
export function Colophon() {
  return (
    <Segnatura
      folio={String(7 + progetti.length)}
      occhiello="colophon"
      respiro={2.2}
      className="colophon"
    >
      <div className="colophon-scheda">
        <p className="colophon-mano">Grazie di essere arrivato fin qui.</p>
        <div className="colophon-righe" aria-hidden="true" data-decorativo="">
          <span />
          <span />
          <span />
        </div>
        <p className="colophon-piede">
          <span>{site.nomeEsteso}</span>
          <span>
            {site.via} — {site.cap} {site.citta}
          </span>
          <span>{site.telefono}</span>
        </p>
      </div>
    </Segnatura>
  )
}
