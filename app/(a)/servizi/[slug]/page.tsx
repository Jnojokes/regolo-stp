import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Briciole } from '@/components/Briciole'
import { DaCliente } from '@/components/Placeholder'
import { Faq } from '@/components/Faq'
import { JsonLd } from '@/components/JsonLd'
import { Sezione } from '@/components/sezioni/Sezione'
import { contenutoServizio } from '@/lib/contenuti/servizi'
import { progettiVeri } from '@/lib/contenuti/progetti'
import { fasi } from '@/lib/processo'
import { hrefBriefServizio, servizi, servizioBySlug } from '@/lib/servizi'
import { eSegnaposto, site } from '@/lib/site'

/**
 * La pagina di un servizio (CLAUDE.md § Pagina servizio).
 *
 * La sequenza è quella del capitolato, e ogni blocco risponde a una domanda che
 * un committente si fa in quest'ordine: titolo come **esito** (non «servizi di
 * progettazione strutturale» ma «mettere in sicurezza la struttura») → per chi è
 * → cosa comprende → come funziona → **cosa serve da te** → FAQ → progetti
 * collegati → CTA.
 *
 * Il blocco «cosa serve da te» è quello che manca in tutti i siti di studi
 * tecnici, ed è quello che fa alzare il telefono: chi sa già cosa gli verrà
 * chiesto arriva preparato invece di rimandare.
 *
 * La CTA chiude la catena dello smistamento: porta al brief con il passo 1 già
 * scelto, e la pagina lo sa da sé senza leggere la query string — così resta
 * statica (DECISIONI.md, 07/09).
 */

export function generateStaticParams() {
  return servizi.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const s = servizioBySlug(slug)
  if (!s) return {}
  /* title ≤ 60 e description ≤ 155 (prompt di fase). Il template del layout
     aggiunge « — REGOLO»: il titolo qui sta sotto i 45 caratteri. */
  return {
    title: s.titolo,
    description: `${s.sottotitolo.charAt(0).toUpperCase()}${s.sottotitolo.slice(1)}. Studio REGOLO, ingegneria civile e architettura a ${site.citta}.`,
  }
}

export default async function Servizio({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = servizioBySlug(slug)
  if (!s) notFound()

  const c = contenutoServizio(s.slug)
  if (!c) notFound()

  /* I progetti collegati sono quelli con lo stesso tipo di intervento. Oggi
     non ce n'è nessuno vero, e il blocco lo dice invece di sparire: un blocco
     che scompare non si nota, uno che dichiara cosa manca sì. */
  const collegati = progettiVeri.filter((p) => p.intervento === s.intervento)

  return (
    <>
      <div className="testa-pagina">
        <div className="wrap">
          <Briciole
            percorso={[
              { href: '/servizi', label: 'Servizi' },
              { href: `/servizi/${s.slug}`, label: s.titolo },
            ]}
          />
          <p className="eyebrow mt-6">{s.sottotitolo}</p>
          <h1 className="mt-3">{s.titolo}</h1>
          <p className="sommario text-lead">{c.sommario}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={hrefBriefServizio(s)} className="btn">
              Raccontaci il progetto
            </Link>
            <a href={`tel:${site.telefonoHref}`} className="btn btn-ghost">
              {site.telefono}
            </a>
          </div>
        </div>
      </div>

      <Sezione
        etichetta="per chi è"
        titolo="Se ti riconosci in una di queste, è il servizio giusto."
      >
        <ul className="elenco-segnato">
          {c.perChi.map((v) => (
            <li key={v}>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </Sezione>

      <Sezione
        etichetta="cosa comprende"
        titolo="L’incarico, voce per voce."
        intro="Quello che è compreso quando ci si affida a noi per questo tipo di intervento."
      >
        <ul className="elenco-segnato">
          {c.comprende.map((v) => (
            <li key={v}>
              <span>{v}</span>
            </li>
          ))}
        </ul>
      </Sezione>

      <Sezione
        etichetta="come funziona"
        titolo="Cinque passaggi, sempre gli stessi."
        intro="Le stesse cinque fasi di ogni incarico: cambia il contenuto, non il metodo."
      >
        <ol className="fasi fasi-elenco" role="list">
          {fasi.map((f, i) => (
            <li key={f.titolo}>
              <span className="fase-numero" data-numero="">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="fase-corpo">
                <strong className="fase-titolo">{f.titolo}</strong>
                <span className="fase-testo">{f.testoLungo}</span>
              </span>
            </li>
          ))}
        </ol>
      </Sezione>

      <Sezione
        etichetta="cosa serve da te"
        titolo="Cosa portare al primo incontro."
        intro="Sapere in anticipo cosa ti verrà chiesto è metà del tempo risparmiato."
        nota={
          c.serveDaTeValidato
            ? undefined
            : 'Questo elenco è una nostra proposta e va confermato dallo studio, servizio per servizio: è la lista dei documenti che chiedete davvero per partire.'
        }
      >
        <ul className="elenco-segnato">
          {c.serveDaTe.map((v) => (
            <li key={v}>
              <span>{eSegnaposto(v) ? <DaCliente>{v}</DaCliente> : v}</span>
            </li>
          ))}
        </ul>
      </Sezione>

      <Sezione
        etichetta="domande frequenti"
        nota="Le risposte sono una nostra proposta, marcate «proposta» finché lo studio non le conferma. Finché sono così non entrano nei dati strutturati: un motore di ricerca non deve far dire allo studio qualcosa che lo studio non ha detto."
      >
        <Faq voci={c.faq} titolo="Quello che ci chiedono più spesso." />
      </Sezione>

      <Sezione
        etichetta="progetti collegati"
        titolo={
          collegati.length > 0
            ? 'Interventi di questo tipo.'
            : 'Qui andranno gli interventi di questo tipo.'
        }
        nota={
          collegati.length > 0
            ? undefined
            : 'Nessun progetto è ancora pubblicato: foto, luoghi, anni e ruolo dello studio sono il primo dato bloccante (CONTENUTI-DA-CLIENTE.md). Quando arrivano, le schede con questo tipo di intervento compaiono qui da sole.'
        }
      >
        {collegati.length > 0 && (
          <ul className="griglia-progetti" role="list">
            {collegati.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <Link href={`/progetti/${p.slug}`}>{p.titolo}</Link>
              </li>
            ))}
          </ul>
        )}
      </Sezione>

      <Sezione>
        <div className="cta-contestuale">
          <p className="eyebrow">Hai un intervento di questo tipo?</p>
          <h2 className="mt-3 max-w-[26ch]">Cinque domande. Poi vi richiamiamo noi.</h2>
          <p className="intro-sezione text-lead">
            Il brief parte già su «{s.titolo.toLowerCase()}»: non devi ridire da capo di cosa si
            tratta.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link href={hrefBriefServizio(s)} className="btn">
              Raccontaci il progetto
            </Link>
            <a href={`tel:${site.telefonoHref}`} className="text-muted text-small">
              oppure chiama · {site.telefono}
            </a>
          </div>
        </div>
      </Sezione>

      {/* `Service` con l'offerta: il nodo `#org` lo emette la home alla fase 6.
          `provider` resta un riferimento per nome finché non c'è il dominio. */}
      <JsonLd
        dati={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: s.titolo,
          serviceType: s.sottotitolo,
          provider: { '@type': 'ProfessionalService', name: site.nomeEsteso },
          areaServed: `${site.citta} e provincia`,
        }}
      />
    </>
  )
}
