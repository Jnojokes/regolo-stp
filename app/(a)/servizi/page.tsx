import type { Metadata } from 'next'
import Link from 'next/link'
import { Briciole } from '@/components/Briciole'
import { JsonLd } from '@/components/JsonLd'
import { Sezione } from '@/components/sezioni/Sezione'
import { contenutoServizio } from '@/lib/contenuti/servizi'
import { fasi, introProcesso } from '@/lib/processo'
import { ctaPrimaria, site } from '@/lib/site'
import { servizi } from '@/lib/servizi'

/**
 * L'indice dei servizi.
 *
 * Sei voci, non nove: chi arriva qui sta cercando di capire in quale casella
 * cade il proprio problema, e ogni casella in più è una decisione in più da
 * prendere prima di poter chiamare.
 *
 * Il titolo di ogni servizio è un **esito** e non una prestazione — «mettere in
 * sicurezza la struttura», non «progettazione strutturale» — e il tecnicismo
 * sta in seconda riga per chi lo cerca (CLAUDE.md § I sei servizi). Serve a due
 * lettori diversi con lo stesso testo: il committente riconosce il proprio
 * caso, il collega o l'ente riconosce la competenza.
 *
 * Sotto le sei voci ci sono le cinque fasi, una volta sola: è la risposta alla
 * domanda che viene subito dopo «cosa fate», cioè «e poi cosa succede». Nelle
 * pagine dei singoli servizi è ripetuta perché lì è il contesto giusto, ma chi
 * legge solo l'indice non deve restare senza.
 */

export const metadata: Metadata = {
  title: 'Servizi',
  description:
    'Progettazione architettonica e strutturale, ristrutturazioni, sisma, pratiche e bonus, energia e acustica, opere pubbliche. Studio REGOLO, Fermo.',
}

export default function Servizi() {
  return (
    <>
      <div className="testa-pagina">
        <div className="wrap">
          <Briciole percorso={[{ href: '/servizi', label: 'Servizi' }]} />
          <p className="eyebrow mt-6">Cosa facciamo</p>
          <h1 className="mt-3">Sei modi in cui possiamo esservi utili.</h1>
          <p className="sommario text-lead">
            Progetto architettonico e strutturale, pratiche, cantiere: la stessa squadra dall’idea
            alla consegna. Ogni pagina dice cosa comprende l’incarico e — cosa che quasi nessuno
            scrive — cosa serve da parte tua per cominciare.
          </p>
        </div>
      </div>

      <Sezione>
        {/* Lo stesso indice della home: righe, non card. Il titolo del
            servizio è un `h2` perché in questa pagina i sei servizi sono il
            contenuto, non un elenco di rimandi. */}
        <ul className="indice" role="list">
          {servizi.map((s) => {
            const c = contenutoServizio(s.slug)
            return (
              <li key={s.slug}>
                <Link href={`/servizi/${s.slug}`} className="voce">
                  <span className="voce-corpo">
                    <h2 className="voce-esito">{s.titolo}</h2>
                    <span className="voce-tecnicismo">{s.sottotitolo}</span>
                    {c && <span className="voce-descrizione">{c.sommario}</span>}
                  </span>
                  <span className="voce-coda">{s.sottotitolo}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </Sezione>

      <Sezione etichetta="come lavoriamo" titolo="E poi cosa succede?" intro={introProcesso}>
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

      <Sezione>
        <div className="cta-contestuale">
          <p className="eyebrow">Non sai in quale casella cade il tuo caso?</p>
          <h2 className="mt-3 max-w-[26ch]">Raccontacelo in cinque domande.</h2>
          <p className="intro-sezione text-lead">
            La prima domanda del brief è esattamente questa, e non serve indovinare: se non rientra
            in nessuna delle sei, c’è «Altro».
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

      {/* Il catalogo dei sei servizi come lista di offerte. Il nodo `#org`
          completo lo emette la fase 6: qui basta il riferimento per nome. */}
      <JsonLd
        dati={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'I servizi di REGOLO',
          itemListElement: servizi.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Service',
              name: s.titolo,
              serviceType: s.sottotitolo,
              url: `/servizi/${s.slug}`,
              provider: { '@type': 'ProfessionalService', name: site.nomeEsteso },
            },
          })),
        }}
      />
    </>
  )
}
