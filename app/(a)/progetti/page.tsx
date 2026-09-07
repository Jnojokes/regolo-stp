import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Briciole } from '@/components/Briciole'
import { DaCliente, Placeholder } from '@/components/Placeholder'
import { JsonLd } from '@/components/JsonLd'
import { Sezione } from '@/components/sezioni/Sezione'
import { etichettaDi } from '@/lib/brief/domande'
import { progetti, progettiVeri, type Progetto } from '@/lib/contenuti/progetti'
import { INTERVENTI, RUOLI, type Immagine, type Ruolo } from '@/lib/contenuti/schema'
import { ctaPrimaria, eSegnaposto, site } from '@/lib/site'

/**
 * L'indice dei progetti (CLAUDE.md § Struttura · § SEO · catalogo blocchi D1).
 *
 * Tre cose decidono com'è fatta questa pagina.
 *
 * **1. I filtri sono link, e la loro sede è la query string.** Non c'è nessuno
 * stato in JavaScript: `?tipo=`, `?comune=` e `?ruolo=` *sono* lo stato. Costa
 * un carico di pagina per clic e vale tre cose che uno stato in memoria non dà:
 * un filtro si può indicizzare, si può mandare per mail a un committente
 * («guarda gli interventi sulle strutture a Fermo») e funziona dove non c'è
 * JavaScript — che qui non è un'ipotesi, perché di JavaScript non ce n'è.
 * Prezzo dichiarato: leggere `searchParams` rende la rotta dinamica, come
 * `/contatti` (DECISIONI.md, 07/09).
 *
 * **2. Il contatore accanto a ogni voce è il pezzo che fa il lavoro** (catalogo
 * blocchi D1): prova il volume senza dirlo, e dice quale strada porta da
 * qualche parte *prima* di farla percorrere. Si conta tenendo conto degli altri
 * filtri attivi, altrimenti prometterebbe risultati che il clic non dà.
 * Le voci a zero restano in pagina, spente: nascondere quello che manca
 * nasconde la forma del portfolio, che è un'informazione.
 *
 * **3. Oggi non c'è nemmeno un progetto vero.** `progettiVeri` è vuoto — c'è
 * solo la scheda di esempio, che sta fuori dall'indice per costruzione. Quindi
 * la pagina non finge di essere un portfolio: dichiara che le schede sono il
 * primo dato bloccante, dice cosa serve per pubblicarle, e offre l'unica cosa
 * che può offrire davvero, cioè la scheda di esempio — marcata come esempio.
 * I filtri restano in pagina e funzionanti: le due righe chiuse si costruiscono
 * da `INTERVENTI` e `RUOLI`, la terza dai comuni che stanno nelle schede.
 * Nessun conteggio è inventato: se non ci sono progetti, i contatori dicono zero.
 */

/* -------------------------------------------------------------------------- */
/* Le tre righe di filtro e il loro vocabolario chiuso                        */

const RIGHE = ['tipo', 'comune', 'ruolo'] as const
type Riga = (typeof RIGHE)[number]

/** Una voce di filtro: `chiave` sta nell'URL, `valore` è quello che c'è nelle schede. */
type Voce = { chiave: string; valore: string; etichetta: string; conta: number }

/** Chiave d'URL da un'etichetta: minuscole, senza segni, parole unite da un trattino. */
const inChiave = (v: string) =>
  v
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const maiuscola = (v: string) => `${v.charAt(0).toUpperCase()}${v.slice(1)}`

/* Le due righe chiuse vengono dagli elenchi che validano le schede: se domani
   si aggiunge un ruolo, il filtro compare da sé e non si può dimenticare. */
const vociTipo = INTERVENTI.map((v) => ({
  chiave: v,
  valore: v,
  etichetta: etichettaDi('intervento', v) ?? v,
}))

const vociRuolo = RUOLI.map((v) => ({ chiave: inChiave(v), valore: v, etichetta: maiuscola(v) }))

/* I comuni, invece, vengono **dalle schede** e non dai 128 comuni delle tre
   province: un filtro «Monte Urano» che non ha dietro nessun lavoro non è un
   filtro, è una promessa. Oggi l'elenco è vuoto perché le schede non ci sono. */
const vociComune = [...new Set(progettiVeri.map((p) => p.comune))]
  /* Un comune ancora `[[DA CLIENTE: …]]` non è un comune: filtrare per un
     valore che non conosciamo metterebbe un segnaposto nell'indirizzo e — non
     passando da `<DaCliente>`, perché qui l'etichetta è testo di interfaccia —
     lo stamperebbe in pagina come se fosse un dato. La scheda resta comunque
     nell'elenco e sotto «Tutti»: è solo il filtro che non la nomina. */
  .filter((v) => !eSegnaposto(v))
  .sort((a, b) => a.localeCompare(b, 'it'))
  .map((v) => ({ chiave: inChiave(v), valore: v, etichetta: v }))

const VOCABOLARIO: Record<Riga, readonly Omit<Voce, 'conta'>[]> = {
  tipo: vociTipo,
  comune: vociComune,
  ruolo: vociRuolo,
}

const NOME_RIGA: Record<Riga, string> = {
  tipo: 'Intervento',
  comune: 'Comune',
  ruolo: 'Ruolo',
}

/* -------------------------------------------------------------------------- */
/* Query string → filtri. Elenco chiuso, sempre.                              */

type Attivi = Partial<Record<Riga, Omit<Voce, 'conta'>>>
type Query = Record<string, string | string[] | undefined>

/**
 * Ogni valore che arriva dall'URL si confronta con il vocabolario chiuso della
 * sua riga: quello che non c'è **non è un filtro applicato a metà, è nessun
 * filtro**, e soprattutto non torna in pagina in nessuna forma. È la stessa
 * regola di `?intervento=` nel brief (fase 2): un parametro ripetuto arriva
 * come array e vale come assente.
 */
function leggiFiltri(query: Query): Attivi {
  const attivi: Attivi = {}
  for (const riga of RIGHE) {
    const grezzo = query[riga]
    if (typeof grezzo !== 'string') continue
    const voce = VOCABOLARIO[riga].find((v) => v.chiave === grezzo)
    if (voce) attivi[riga] = voce
  }
  return attivi
}

/** L'URL dell'indice con questi filtri. L'ordine è fisso: la stessa selezione dà la stessa URL. */
function href(attivi: Attivi): string {
  const query = new URLSearchParams()
  for (const riga of RIGHE) {
    const voce = attivi[riga]
    if (voce) query.set(riga, voce.chiave)
  }
  const stringa = query.toString()
  /* L'ancora tiene il fuoco della pagina sui filtri: senza JavaScript un clic
     è un carico di pagina, e ripartire dall'intestazione ogni volta farebbe
     perdere il posto a chi sta confrontando due filtri. */
  return stringa ? `/progetti?${stringa}#elenco` : '/progetti#elenco'
}

/** Come sarebbero i filtri togliendo (o cambiando) una riga sola. */
const con = (attivi: Attivi, riga: Riga, voce?: Omit<Voce, 'conta'>): Attivi => ({
  ...attivi,
  [riga]: voce,
})

/**
 * Un progetto passa i filtri attivi. `salta` esclude una riga dal confronto:
 * serve ai contatori, che per la riga «comune» devono contare *dentro* gli
 * altri filtri ma non dentro il comune già scelto.
 */
function passa(p: Progetto, attivi: Attivi, salta?: Riga): boolean {
  if (salta !== 'tipo' && attivi.tipo && p.intervento !== attivi.tipo.valore) return false
  if (salta !== 'comune' && attivi.comune && p.comune !== attivi.comune.valore) return false
  if (salta !== 'ruolo' && attivi.ruolo && !p.ruolo.includes(attivi.ruolo.valore as Ruolo))
    return false
  return true
}

/** Le voci di una riga con il conteggio calcolato dentro gli altri filtri attivi. */
function vociConConta(riga: Riga, attivi: Attivi): Voce[] {
  const base = progettiVeri.filter((p) => passa(p, attivi, riga))
  return VOCABOLARIO[riga].map((v) => ({
    ...v,
    conta: base.filter((p) => passa(p, { [riga]: v })).length,
  }))
}

/* -------------------------------------------------------------------------- */

/* Gli URL assoluti del JSON-LD hanno bisogno del dominio (decisione n. 2):
   finché non c’è, il campo si omette invece di dichiararne uno inventato. */
const origine = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '')

const DESCRIZIONE =
  'I lavori dello studio, filtrabili per tipo di intervento, comune e ruolo: progetto architettonico o strutturale, direzione lavori, sicurezza, collaudo.'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Query>
}): Promise<Metadata> {
  const attivi = leggiFiltri(await searchParams)
  const conFiltri = RIGHE.some((r) => attivi[r])

  /* Una combinazione di filtri non è una pagina: è una vista della stessa
     pagina. Indicizzarle vorrebbe dire mettere in concorrenza fra loro decine
     di URL che dicono la stessa cosa con meno contenuto. Il canonical vero lo
     dichiara la fase 6, quando c'è il dominio; qui basta non farsi indicizzare,
     `follow` acceso perché le schede vanno comunque scoperte. */
  return {
    title: 'Progetti',
    description: DESCRIZIONE,
    ...(conFiltri ? { robots: { index: false, follow: true } } : {}),
  }
}

export default async function Progetti({ searchParams }: { searchParams: Promise<Query> }) {
  const attivi = leggiFiltri(await searchParams)
  const attiviIn = RIGHE.map((r) => attivi[r]).filter((v): v is Omit<Voce, 'conta'> => Boolean(v))
  const risultati = progettiVeri.filter((p) => passa(p, attivi))

  /* La scheda di esempio non è un progetto e non entra nell'indice: si prende
     dai dati, non per slug scritto a mano, così se il file cambia nome il link
     sparisce invece di diventare un 404. */
  const esempio = progetti.find((p) => p.esempio)

  const quanti =
    risultati.length === 0
      ? 'Nessun progetto'
      : risultati.length === 1
        ? '1 progetto'
        : `${risultati.length} progetti`

  return (
    <>
      <div className="testa-pagina">
        <div className="wrap">
          <Briciole percorso={[{ href: '/progetti', label: 'Progetti' }]} />
          <p className="eyebrow mt-6">Indice</p>
          <h1>Quello che abbiamo costruito.</h1>
          <p className="sommario text-lead">
            Ogni scheda dice dove, quando, quanti metri quadri e — soprattutto — che ruolo abbiamo
            avuto: progetto architettonico o strutturale, direzione lavori, coordinamento sicurezza,
            collaudo. È il dato che dice cosa sappiamo fare.
          </p>
        </div>
      </div>

      <Sezione
        id="elenco"
        etichetta="filtra"
        titolo="Cerca per intervento, comune o ruolo."
        intro="I filtri stanno nell’indirizzo: una selezione si può salvare, mandare per mail o aprire su un altro telefono, ed è la stessa pagina che vede un motore di ricerca."
        nota="Le voci senza risultati restano in pagina, spente: mostrare solo quelle piene nasconderebbe la forma del portfolio, che è un’informazione anche quando dice «qui non abbiamo ancora niente»."
      >
        <div className="filtri">
          {RIGHE.map((riga) => (
            <RigaFiltro key={riga} riga={riga} attivi={attivi} />
          ))}
        </div>

        {/* Il link in mezzo al testo porta la sua sottolineatura addosso: la
            regola globale di `globals.css` è `a { text-decoration: none }`,
            giusta per i bottoni e per le schede, sbagliata per un link dentro
            un capoverso — che senza sottolineatura non si distingue dal testo. */}
        <p className="text-body mt-10">
          <strong>{quanti}</strong>
          {attiviIn.length > 0 && (
            <> con questi filtri: {attiviIn.map((v) => v.etichetta).join(' · ')}</>
          )}
          .
          {attiviIn.length > 0 && (
            <>
              {' '}
              <Link href={href({})} className="text-accent-text underline underline-offset-2">
                Togli i filtri
              </Link>
            </>
          )}
        </p>

        {risultati.length > 0 && (
          <ul className="griglia-progetti mt-10" role="list">
            {risultati.map((p) => (
              <li key={p.slug}>
                <Scheda progetto={p} />
              </li>
            ))}
          </ul>
        )}
      </Sezione>

      {progettiVeri.length === 0 && (
        <Sezione
          etichetta="primo dato bloccante"
          titolo="Le schede non ci sono ancora, e non le inventiamo."
        >
          <div className="avviso">
            <p>
              <strong>Nessun progetto pubblicato.</strong> Le schede sono il primo dato che manca
              per aprire il sito: servono 6-10 interventi e, per ciascuno, almeno una foto dello
              studio — anche di cantiere, anche da telefono, purché vostra — il comune, l’anno, la
              superficie in mq e il <strong>ruolo</strong> dello studio. Appena arrivano, l’indice e
              i filtri qui sopra si popolano da soli: non c’è altro codice da scrivere.
            </p>
          </div>

          {esempio && (
            <p className="text-small mt-8 max-w-[68ch]">
              Intanto si può vedere com’è fatta una scheda:{' '}
              <Link
                href={`/progetti/${esempio.slug}`}
                className="text-accent-text underline underline-offset-2"
              >
                apri la scheda di esempio
              </Link>
              . È un <strong>esempio</strong>, non un progetto: i campi ci sono tutti, i valori sono
              dichiarati vuoti, e resta fuori dall’indice e dai motori di ricerca.
            </p>
          )}
        </Sezione>
      )}

      <Sezione>
        <div className="cta-contestuale">
          <p className="eyebrow">Hai un intervento da fare?</p>
          <h2 className="mt-3 max-w-[26ch]">Cinque domande. Poi vi richiamiamo noi.</h2>
          <p className="intro-sezione text-lead">
            Una domanda per schermata, i dati personali solo all’ultimo passo. Alla prima telefonata
            sappiamo già di cosa si tratta.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href={ctaPrimaria.href} className="btn">
              {ctaPrimaria.label}
            </Link>
            <a href={`tel:${site.telefonoHref}`} className="text-muted text-small">
              oppure chiama · {site.telefono}
            </a>
          </div>
        </div>
      </Sezione>

      {/* `CollectionPage` con l'elenco **solo sulla pagina senza filtri**: le
          viste filtrate sono `noindex`, e dichiarare un ItemList parziale a una
          macchina che non deve indicizzare quella URL è rumore. Gli URL assoluti
          hanno bisogno del dominio (decisione n. 2): finché non c'è, `JsonLd`
          toglie da sé i campi vuoti. Con zero progetti resta il solo guscio con
          nome e descrizione — nessun `numberOfItems: 0` da spiegare. */}
      <JsonLd
        dati={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `Progetti — ${site.nomeEsteso}`,
          description: DESCRIZIONE,
          isPartOf: { '@type': 'ProfessionalService', name: site.nomeEsteso },
          ...(attiviIn.length === 0 && risultati.length > 0
            ? {
                mainEntity: {
                  '@type': 'ItemList',
                  numberOfItems: risultati.length,
                  itemListElement: risultati.map((p, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    name: p.titolo,
                    url: origine ? `${origine}/progetti/${p.slug}` : '',
                  })),
                },
              }
            : {}),
        }}
      />
    </>
  )
}

/* -------------------------------------------------------------------------- */

/**
 * Una riga di filtro: il nome della riga, «Tutti», e le voci col contatore.
 *
 * Tre regole che valgono la lettura:
 *
 * — **la voce attiva è un link, e il suo link la disattiva.** È così che si
 *   esce da un filtro senza JavaScript: non c'è nessun altro gesto disponibile,
 *   e un filtro in cui si entra e non si esce è una trappola;
 * — **«Tutti» quando è lo stato corrente non è un link**, come l'ultima briciola
 *   di pane: un bersaglio che riporta dove si è già;
 * — **`data-vuoto` solo sulle voci a zero che non sono attive.** La classe
 *   `.filtro-voce[data-vuoto]` porta `pointer-events: none`: metterla sulla
 *   voce attiva — che a zero ci può arrivare, se gli altri filtri la svuotano —
 *   spegnerebbe l'unica uscita e chiuderebbe fuori chi ha combinato due filtri
 *   incompatibili.
 */
function RigaFiltro({ riga, attivi }: { riga: Riga; attivi: Attivi }) {
  const voci = vociConConta(riga, attivi)
  const attiva = attivi[riga]
  const totale = progettiVeri.filter((p) => passa(p, con(attivi, riga, undefined))).length

  return (
    <div className="filtro-riga">
      <p className="filtro-nome" id={`filtro-${riga}`}>
        {NOME_RIGA[riga]}
      </p>
      {/* `list-style: none` toglie la semantica di lista su Safari/VoiceOver:
          `role="list"` la rimette, come nelle altre liste del sito. */}
      <ul className="filtro-voci" role="list" aria-labelledby={`filtro-${riga}`}>
        <li>
          {attiva ? (
            <Link className="filtro-voce" href={href(con(attivi, riga, undefined))}>
              Tutti <span className="filtro-conta">{totale}</span>
            </Link>
          ) : (
            <span className="filtro-voce" aria-current="true">
              Tutti <span className="filtro-conta">{totale}</span>
            </span>
          )}
        </li>

        {voci.map((v) => {
          const eAttiva = attiva?.chiave === v.chiave
          if (v.conta === 0 && !eAttiva) {
            return (
              <li key={v.chiave}>
                <span className="filtro-voce" data-vuoto="">
                  {v.etichetta} <span className="filtro-conta">0</span>
                </span>
              </li>
            )
          }
          return (
            <li key={v.chiave}>
              <Link
                className="filtro-voce"
                href={href(con(attivi, riga, eAttiva ? undefined : v))}
                aria-current={eAttiva ? 'true' : undefined}
              >
                {v.etichetta} <span className="filtro-conta">{v.conta}</span>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* La riga «Comune» si costruisce dalle schede: finché non ce n'è nessuna
          — o finché il comune è ancora un segnaposto — la riga esiste ma non ha
          voci, e lo dice invece di lasciare un vuoto che sembra un errore di
          impaginazione. Sta **fuori** dall'elenco: è una spiegazione, non
          un'opzione, e dentro l'`<ul>` uno screen reader la conterebbe fra le
          voci selezionabili. */}
      {voci.length === 0 && (
        <p className="text-muted text-small">i comuni compaiono qui appena le schede dicono dove</p>
      )}
    </div>
  )
}

/**
 * La copertina di una scheda dell'indice. Finché il file non c'è si disegna il
 * rettangolo che dice cosa andrà lì (CLAUDE.md § Regole, 2); quando arriva la
 * foto prende lo stesso posto, con lo stesso rapporto d'aspetto, così l'arrivo
 * delle immagini non sposta niente. È la stessa logica della scheda progetto:
 * senza, l'indice avrebbe continuato a mostrare rettangoli grigi il giorno che
 * le foto arrivano, e nessuno se ne accorgerebbe leggendo il codice.
 */
function Copertina({ immagine }: { immagine: Immagine }) {
  if (!immagine.file) {
    return <Placeholder label={immagine.segnaposto} ratio="4 / 3" />
  }
  return (
    <div className="relative" style={{ aspectRatio: '4 / 3' }}>
      <Image
        src={immagine.file}
        alt={immagine.alt}
        fill
        /* Tre colonne fino a 56rem (`.griglia-progetti`), una sotto. */
        sizes="(max-width: 56rem) 100vw, 33vw"
        className="object-cover"
      />
    </div>
  )
}

/**
 * Una scheda dell'indice: foto, nome, e le quattro cose che un committente
 * legge per decidere se aprirla — tipo di intervento, luogo, anno e ruolo.
 * Il **ruolo** non si omette mai (CLAUDE.md § Scheda progetto), nemmeno
 * nell'indice: è quello che distingue «abbiamo disegnato» da «abbiamo diretto
 * il cantiere», e sono due mestieri diversi.
 *
 * Un campo può essere ancora un `[[DA CLIENTE: …]]` anche in una scheda vera —
 * il committente che non si può citare, per esempio: dove capita si vede che è
 * un segnaposto, non lo si stampa come dato.
 */
function Scheda({ progetto: p }: { progetto: Progetto }) {
  const testo = (v: string) => (eSegnaposto(v) ? <DaCliente>{v}</DaCliente> : v)

  return (
    <article>
      <Link href={`/progetti/${p.slug}`}>
        <Copertina immagine={p.copertina} />
        <div className="progetto-meta">
          <h3 className="progetto-nome">{testo(p.titolo)}</h3>
          <p className="progetto-riga">
            <strong>Intervento</strong> {etichettaDi('intervento', p.intervento) ?? p.intervento}
          </p>
          <p className="progetto-riga">
            <strong>Luogo</strong> {testo(p.comune)}
            {p.provincia !== 'altra' && ` (${p.provincia})`}
          </p>
          <p className="progetto-riga">
            <strong>Anno</strong> {testo(p.anno)}
          </p>
          <p className="progetto-riga">
            <strong>Ruolo</strong> {p.ruolo.join(', ')}
          </p>
        </div>
      </Link>
    </article>
  )
}
