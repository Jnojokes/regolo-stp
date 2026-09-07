import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Fragment, type ReactNode } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Briciole } from '@/components/Briciole'
import { JsonLd } from '@/components/JsonLd'
import { DaCliente, Placeholder } from '@/components/Placeholder'
import { Confronto } from '@/components/sezioni/Confronto'
import { Sezione } from '@/components/sezioni/Sezione'
import { etichettaDi } from '@/lib/brief/domande'
import { progetti, progettoBySlug, progettoSuccessivo } from '@/lib/contenuti/progetti'
import type { Immagine } from '@/lib/contenuti/schema'
import { eSegnaposto, site } from '@/lib/site'

/**
 * La scheda progetto (CLAUDE.md § Scheda progetto).
 *
 * È la pagina che decide il confronto. Chi arriva qui ha già sentito il nome
 * dello studio da qualcuno e sta cercando la prova che sappiano fare la cosa
 * che serve a lui: la scheda deve rispondere in quest'ordine — com'era e cosa
 * non funzionava, cosa abbiamo scelto di fare, **e con che ruolo**.
 *
 * ## Perché i dati duri sono una tabella e non delle didascalie
 *
 * Luogo, anno, superficie, ruolo, impresa e committente sono *dati*, non
 * decorazione: una `<table>` con `<th scope="row">` li fa leggere in coppia
 * anche a chi usa uno screen reader, e a schermo diventano la targhetta che un
 * committente serio scorre prima del testo. La riga del **ruolo** porta
 * `data-chiave="ruolo"` e si vede di più perché è l'unica che dice cosa sanno
 * fare — è il campo che manca in quasi tutti i siti di studi tecnici, e
 * CLAUDE.md vieta di ometterlo. `impresa` e `committente` invece sono
 * opzionali: se non ci sono la riga **non esiste**, perché «non disponibile»
 * riempie una tabella di niente e fa sembrare la scheda incompleta invece che
 * sobria.
 *
 * ## Perché la scheda di esempio dichiara di esserlo, in cima
 *
 * Finché lo studio non manda progetti veri l'unico MDX in `content/progetti` è
 * una scheda con tutti i campi a `[[DA CLIENTE: …]]`. Senza il cartello in
 * testa quella pagina sarebbe indistinguibile da un progetto vero, ed è la cosa
 * peggiore che possa succedere in questa fase: `esempio: true` accende insieme
 * l'avviso in pagina e il `noindex` nei metadati, così non ci si può dimenticare
 * né dell'uno né dell'altro.
 *
 * ## Il corpo
 *
 * `progetto.corpo` è MDX non compilato e lo compila `next-mdx-remote/rsc` qui,
 * a build time (la rotta è statica). I `[[DA CLIENTE: …]]` che stanno *dentro*
 * la prosa passano da `<DaCliente>` come tutti gli altri: la mappatura di `p` e
 * `li` in `componentiMdx` li riconosce e li avvolge, così un segnaposto in
 * mezzo a un capoverso si vede come si vede negli altri blocchi del sito e non
 * resta una stringa fra parentesi che si può leggere per contenuto.
 *
 * Niente `'use client'` e niente JavaScript proprio: l'unico componente client
 * della pagina è il cursore del prima/dopo, che è già scritto ed è client per
 * conto suo.
 */

/* -------------------------------------------------------------------------- */
/* Segnaposti dentro la prosa MDX                                              */

const SEGNAPOSTO = /(\[\[DA CLIENTE:[^\]]*\]\])/g

/**
 * Avvolge in `<DaCliente>` ogni `[[DA CLIENTE: …]]` che compare in un nodo di
 * testo. Ricorre sulle liste di figli, non dentro gli elementi: nel corpo di
 * una scheda un segnaposto è un capoverso o una voce d'elenco, non una parola
 * dentro un `<em>`. Se un giorno lo diventasse, resterebbe comunque leggibile
 * come testo — le doppie parentesi si vedono — solo senza il filetto.
 */
function evidenziaSegnaposti(nodi: ReactNode): ReactNode {
  if (typeof nodi === 'string') {
    const pezzi = nodi.split(SEGNAPOSTO)
    if (pezzi.length === 1) return nodi
    return pezzi.map((pezzo, i) =>
      pezzo.startsWith('[[DA CLIENTE:') ? (
        <DaCliente key={i}>{pezzo}</DaCliente>
      ) : (
        <Fragment key={i}>{pezzo}</Fragment>
      ),
    )
  }
  if (Array.isArray(nodi)) {
    return nodi.map((nodo, i) => <Fragment key={i}>{evidenziaSegnaposti(nodo)}</Fragment>)
  }
  return nodi
}

/**
 * La mappatura dei tag MDX.
 *
 * `h1` diventa un `h2`: l'`h1` della pagina è il nome del progetto, e un `#`
 * scritto per distrazione in un file di contenuto non deve poter creare un
 * secondo `h1` (CLAUDE.md § Regole, 8). Il resto della resa — misura della
 * riga, spazi, titoli — la fa la classe `.prosa` in `app/css/pagine.css`, quindi
 * qui non serve mappare altro.
 */
const componentiMdx = {
  h1: (props: { children?: ReactNode }) => <h2>{props.children}</h2>,
  p: (props: { children?: ReactNode }) => <p>{evidenziaSegnaposti(props.children)}</p>,
  li: (props: { children?: ReactNode }) => <li>{evidenziaSegnaposti(props.children)}</li>,
}

/* -------------------------------------------------------------------------- */
/* Foto o rettangolo                                                           */

/**
 * Una foto della scheda. Finché il file non c'è si disegna il rettangolo che
 * dice cosa andrà lì (CLAUDE.md § Regole, 2: niente stock, niente render).
 * Quando `file` arriva diventa un `next/image` che riempie la stessa cornice:
 * il rapporto d'aspetto è deciso qui, così l'immagine vera non sposta niente.
 */
function Foto({
  immagine,
  ratio,
  sizes,
  priorita = false,
  className = '',
}: {
  immagine: Immagine
  ratio: string
  sizes: string
  priorita?: boolean
  className?: string
}) {
  if (!immagine.file) {
    return <Placeholder label={immagine.segnaposto} ratio={ratio} className={className} />
  }
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: ratio }}>
      <Image
        src={immagine.file}
        alt={immagine.alt}
        fill
        sizes={sizes}
        priority={priorita}
        className="object-cover"
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  /* Anche le schede di esempio: restano raggiungibili per URL — servono a far
     vedere allo studio come sarà una scheda — e sono `noindex`. */
  return progetti.map((p) => ({ slug: p.slug }))
}

/** Taglia sull'ultima parola intera, senza mai superare il limite. */
function ritaglia(testo: string, massimo: number) {
  const pulito = testo.replace(/\s+/g, ' ').trim()
  if (pulito.length <= massimo) return pulito
  const tagliato = pulito.slice(0, massimo - 1)
  const spazio = tagliato.lastIndexOf(' ')
  return `${spazio > 0 ? tagliato.slice(0, spazio) : tagliato}…`
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p = progettoBySlug(slug)
  if (!p) return {}

  /* Una scheda finta non va nei motori, e non ha nemmeno un titolo da dare:
     il nome del progetto è un `[[DA CLIENTE]]`, e un segnaposto in un `<title>`
     è l'unico posto della pagina dove non si può vedere che è un segnaposto.
     Quindi il titolo dice quello che la pagina è davvero. */
  if (p.esempio) {
    return {
      title: 'Scheda progetto di esempio',
      description:
        'Scheda di esempio: nessun dato è reale. Serve a mostrare quali campi servono per pubblicare un progetto, ruolo dello studio compreso.',
      robots: { index: false, follow: false },
    }
  }

  /* Il template del layout aggiunge « — REGOLO»: 48 caratteri di titolo sono
     il massimo che sta dentro i 60. Il sommario è la description; se è ancora
     un segnaposto non si emette niente, perché un segnaposto in un meta tag
     finisce nei risultati di ricerca. */
  return {
    title: ritaglia(p.titolo, 48),
    description: eSegnaposto(p.sommario) ? undefined : ritaglia(p.sommario, 155),
  }
}

/* -------------------------------------------------------------------------- */

export default async function SchedaProgetto({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const p = progettoBySlug(slug)
  if (!p) notFound()

  const successivo = progettoSuccessivo(p.slug)
  const intervento = etichettaDi('intervento', p.intervento) ?? p.intervento
  const luogo = p.provincia === 'altra' ? p.comune : `${p.comune} (${p.provincia})`

  return (
    <>
      <div className="testa-pagina">
        <div className="wrap">
          <Briciole
            percorso={[
              { href: '/progetti', label: 'Progetti' },
              { href: `/progetti/${p.slug}`, label: p.titolo },
            ]}
          />

          {p.esempio && (
            /* Un solo figlio, con il `<strong>` in linea: `.avviso` è un flex, e
               con due figli il titoletto si prende una colonna sua e a 390 px
               strozza il testo in una striscia di quattro parole. */
            <div className="avviso mt-6">
              <span>
                <strong>Scheda di esempio.</strong> Nessun dato di questa pagina è reale: nome,
                luogo, anno, superficie, impresa e committente sono segnaposto. Serve a far vedere
                allo studio quali campi servono per pubblicare un progetto — e a collaudare
                l’impaginazione prima che arrivino i contenuti veri. Non è indicizzata.
              </span>
            </div>
          )}

          {/* Tipo di intervento e anno: il primo è un dato nostro, il secondo
              arriva dalla scheda e può essere ancora un segnaposto — e allora si
              vede come tale, anche qui dove il testo è piccolo. */}
          <p className="eyebrow mt-6">
            {intervento} · {eSegnaposto(p.anno) ? <DaCliente>{p.anno}</DaCliente> : p.anno}
          </p>
          {/* Un titolo segnaposto porta la tinta di `.da-cliente`, e a corpo
              display il rettangolo di quella tinta sfonda sopra la riga: con i
              soliti 0,75 rem copriva l'occhiello. Il respiro in più vale solo
              finché il nome del progetto manca; con il titolo vero il ritmo
              torna quello delle altre pagine interne. */}
          <h1 className={eSegnaposto(p.titolo) ? 'mt-7' : 'mt-3'}>
            {eSegnaposto(p.titolo) ? <DaCliente>{p.titolo}</DaCliente> : p.titolo}
          </h1>
          <p className="sommario text-lead">
            {eSegnaposto(p.sommario) ? <DaCliente>{p.sommario}</DaCliente> : p.sommario}
          </p>
        </div>
      </div>

      {/* La copertina è a piena larghezza e senza cornice (CLAUDE.md § Direzione
          visiva). È il primo elemento sotto la piega: quando arriva la foto vera
          è l'LCP della pagina, e per questo porta già `priority`. */}
      <div className="border-line border-b">
        <Foto
          immagine={p.copertina}
          ratio="16 / 9"
          sizes="100vw"
          priorita
          className="w-full border-0"
        />
      </div>

      {/* Il racconto: contesto e problema, cosa abbiamo fatto, il cantiere. I
          titoli sono `h2` e li scrive il file di contenuto, quindi la sezione
          non ne aggiunge un altro. */}
      <Sezione quota="Il progetto">
        <div className="prosa">
          <MDXRemote source={p.corpo} components={componentiMdx} />
        </div>
      </Sezione>

      <Sezione
        fondo="alt"
        quota="Dati"
        titolo="I dati duri."
        intro="Luogo, anno, superficie e — la riga che conta — con quale ruolo lo studio ha lavorato."
      >
        <table className="dati-duri">
          <caption className="sr-only">
            {eSegnaposto(p.titolo) ? 'Dati del progetto' : `Dati del progetto ${p.titolo}`}
          </caption>
          <tbody>
            <tr>
              <th scope="row">Luogo</th>
              <td>
                {eSegnaposto(p.comune) ? (
                  <>
                    <DaCliente>{p.comune}</DaCliente>
                    {p.provincia !== 'altra' && ` (${p.provincia})`}
                  </>
                ) : (
                  luogo
                )}
              </td>
            </tr>
            <tr>
              <th scope="row">Anno</th>
              <td>{eSegnaposto(p.anno) ? <DaCliente>{p.anno}</DaCliente> : p.anno}</td>
            </tr>
            <tr>
              <th scope="row">Superficie in mq</th>
              <td>
                {eSegnaposto(p.superficieMq) ? (
                  <DaCliente>{p.superficieMq}</DaCliente>
                ) : (
                  p.superficieMq
                )}
              </td>
            </tr>
            {/* Mai omessa: è quella che dice cosa sanno fare, e lo schema di
                `content/` fa fallire la build se l'elenco è vuoto. */}
            <tr data-chiave="ruolo">
              <th scope="row">Ruolo dello studio</th>
              <td>{p.ruolo.join(' · ')}</td>
            </tr>
            {p.impresa && (
              <tr>
                <th scope="row">Impresa</th>
                <td>{eSegnaposto(p.impresa) ? <DaCliente>{p.impresa}</DaCliente> : p.impresa}</td>
              </tr>
            )}
            {p.committente && (
              <tr>
                <th scope="row">Committente</th>
                <td>
                  {eSegnaposto(p.committente) ? (
                    <DaCliente>{p.committente}</DaCliente>
                  ) : (
                    p.committente
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Sezione>

      {p.galleria.length > 0 && (
        <Sezione quota="Galleria" titolo="Come è venuta.">
          <div className="galleria">
            {p.galleria.map((immagine, i) => (
              <Foto
                key={immagine.file ?? `${immagine.segnaposto}-${i}`}
                immagine={immagine}
                ratio="4 / 3"
                sizes="(max-width: 30rem) 100vw, (max-width: 48rem) 50vw, 33vw"
              />
            ))}
          </div>
        </Sezione>
      )}

      {p.primaDopo && (
        <Sezione
          fondo="alt"
          quota="Prima e dopo"
          titolo="Lo stesso punto di ripresa."
          /* L'introduzione parla al committente, non allo sviluppatore: come si
             comporta il cursore senza JavaScript è scritto in `Confronto`, dove
             serve, e in pagina non è un'informazione che aiuti chi legge.
             Questa riga vale identica con e senza il cursore. */
          intro="La stessa inquadratura prima e dopo l’intervento: su un recupero è la prova che non ha bisogno di essere spiegata."
        >
          <Confronto prima={p.primaDopo.prima} dopo={p.primaDopo.dopo} />
        </Sezione>
      )}

      {/* La CTA contestuale (catalogo blocchi F5): arriva nel punto di massima
          persuasione — subito dopo la prova — e porta al brief con il passo 1
          già scelto sul tipo di intervento di *questo* progetto, così chi ha un
          caso simile non deve ridire da capo di cosa si tratta. */}
      <Sezione>
        <div className="cta-contestuale">
          <p className="eyebrow">Hai un intervento simile?</p>
          <h2 className="mt-3 max-w-[26ch]">Cinque domande. Poi vi richiamiamo noi.</h2>
          <p className="intro-sezione text-lead">
            Il brief parte già su «{intervento.toLowerCase()}»: raccontaci solo il tuo caso.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href={`/contatti?intervento=${p.intervento}#brief`} className="btn">
              Raccontaci il progetto
            </Link>
            <a href={`tel:${site.telefonoHref}`} className="text-muted text-small">
              oppure chiama · {site.telefono}
            </a>
          </div>
        </div>
      </Sezione>

      {/* Il progetto successivo: chi ha finito di leggere una scheda è la
          persona più disposta a leggerne un'altra. Se non c'è una seconda
          scheda il blocco non esiste — un «progetto successivo» che rimanda a
          sé stesso è un vicolo cieco travestito da navigazione. */}
      {successivo && (
        <Sezione fondo="alt" filo quota="Progetto successivo">
          <Link href={`/progetti/${successivo.slug}`} className="block max-w-[34rem]">
            <Foto
              immagine={successivo.copertina}
              ratio="16 / 9"
              sizes="(max-width: 48rem) 100vw, 34rem"
            />
            <div className="progetto-meta">
              <h2 className="progetto-nome">
                {eSegnaposto(successivo.titolo) ? (
                  <DaCliente>{successivo.titolo}</DaCliente>
                ) : (
                  successivo.titolo
                )}
              </h2>
              <p className="progetto-riga">
                <strong>{etichettaDi('intervento', successivo.intervento) ?? ''}</strong>{' '}
                {eSegnaposto(successivo.comune) ? (
                  <DaCliente>{successivo.comune}</DaCliente>
                ) : (
                  successivo.comune
                )}
              </p>
            </div>
          </Link>
        </Sezione>
      )}

      {/* `CreativeWork` solo sui progetti veri e solo se hanno un nome:
          dichiarare a una macchina un'opera che non esiste è peggio che non
          dichiarare niente. Sugli *altri* campi ancora segnaposto non serve
          nessun `if` — li toglie `JsonLd` — ma senza il nome resterebbe un nodo
          fatto di sola nazione e creatore, cioè un'opera anonima affermata. */}
      {!p.esempio && !eSegnaposto(p.titolo) && (
        <JsonLd
          dati={{
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: p.titolo,
            description: p.sommario,
            /* `anno` è testo libero: può arrivare «2019», ma anche «2020-2021»
               o «in corso». `dateCreated` è una data, e a una macchina si dà
               solo se lo è davvero — il resto è una stringa vuota, che `JsonLd`
               toglie. In pagina l'anno si vede comunque, qualunque cosa sia. */
            dateCreated: /^\d{4}$/.test(p.anno) ? p.anno : '',
            locationCreated: {
              '@type': 'Place',
              address: {
                '@type': 'PostalAddress',
                addressLocality: p.comune,
                addressRegion: p.provincia === 'altra' ? '' : p.provincia,
                addressCountry: 'IT',
              },
            },
            creator: { '@type': 'ProfessionalService', name: site.nomeEsteso },
          }}
        />
      )}
    </>
  )
}
