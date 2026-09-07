import type { Metadata } from 'next'
import Link from 'next/link'
import { Briciole } from '@/components/Briciole'
import { Brief } from '@/components/brief/Brief'
import { JsonLd } from '@/components/JsonLd'
import { DaCliente, Placeholder } from '@/components/Placeholder'
import { Sezione } from '@/components/sezioni/Sezione'
import { etichettaDi, interventoDaQuery } from '@/lib/brief/domande'
import { site } from '@/lib/site'

/* title ≤ 60 col suffisso « — REGOLO» del layout, description ≤ 155 (148).
   Indirizzo e telefono non si riscrivono a mano nemmeno qui dentro: vengono da
   `lib/site` come in pagina, così il giorno che un dato confermato cambia non
   resta una copia vecchia nella description. */
export const metadata: Metadata = {
  title: 'Contatti',
  description: `Studio ${site.nome}, ${site.via} a ${site.citta} (${site.provincia}). Telefono ${site.telefono}, oppure racconta il progetto in cinque domande dal brief in fondo alla pagina.`,
}

/**
 * La pagina Contatti: due strade e nient'altro. Il telefono per chi vuole
 * parlare adesso, il brief per chi preferisce scrivere — e in mezzo i dati
 * della sede, che sono il modo in cui uno studio locale si fa verificare.
 *
 * Tre scelte che vale la pena spiegare, perché non sono ovvie:
 *
 * 1. **Questa pagina legge `?intervento=` e quindi si renderizza a ogni
 *    richiesta.** È una scelta, non una dimenticanza: il passo 1 precompilato
 *    deve funzionare **anche senza JavaScript**, e per farlo il valore va
 *    scelto sul server. Il prezzo è la cache CDN su questa pagina — che non ha
 *    immagini, non fa fetch e non è la pagina su cui si misura l'LCP
 *    (DECISIONI.md, 07/09). Le due home restano statiche.
 *    Quando il valore c'è, la testa della pagina **lo dice in chiaro**: un
 *    passo 1 già scelto senza una riga che lo spieghi sembra un errore del
 *    sito, non un servizio.
 *
 * 2. **L'`<h1>` non è quello del brief.** «Cinque domande. Poi vi richiamiamo
 *    noi.» è il titolo del blocco brief, che qui è un `h2` come in tutte le
 *    pagine che lo ospitano: la pagina ha bisogno di un titolo proprio, e il
 *    suo compito è dire che le strade sono due, non ripetere la seconda.
 *
 * 3. **La mappa è un rettangolo, e resterà un'immagine statica.** Nessun
 *    iframe di terzi, per nessuna ragione: un tile server vede l'indirizzo IP
 *    di chi visita, quindi diventa una voce in informativa e un consent gate
 *    davanti alla mappa (CLAUDE.md § SEO, GEO, legal; DECISIONI.md, blocco
 *    Territorio). Chi vuole l'itinerario ha un link normale, che non chiama
 *    nessuno finché non lo si clicca.
 */
export default async function Contatti({
  searchParams,
}: {
  searchParams: Promise<{ intervento?: string | string[] }>
}) {
  const { intervento } = await searchParams

  /* Il valore non si rimanda mai in pagina così com'è arrivato: `interventoDaQuery`
     lo confronta con l'elenco chiuso dei sei interventi e scarta tutto il resto.
     L'etichetta leggibile viene dalla stessa fonte delle domande del brief, così
     la riga in testa e il passo 1 non possono dire due cose diverse. */
  const interventoIniziale = interventoDaQuery(intervento)
  const etichettaIntervento = interventoIniziale
    ? etichettaDi('intervento', interventoIniziale)
    : null

  /* Una ricerca per indirizzo, non un punto sulla mappa: le coordinate della
     sede non ce le ha nessuno qui dentro (il kit dice «geo: da verificare») e
     inventarle vorrebbe dire mandare qualcuno nel posto sbagliato. */
  const hrefMappe = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${site.via}, ${site.cap} ${site.citta} ${site.provincia}`,
  )}`

  return (
    <>
      <div className="testa-pagina">
        <div className="wrap">
          <Briciole percorso={[{ href: '/contatti', label: 'Contatti' }]} />
          {/* L'occhiello non ripete la briciola qui sopra: dice cosa c'è in
              pagina, che è una cosa in più del nome della pagina. */}
          <p className="eyebrow mt-6">Contatti e sede</p>
          <h1 className="mt-3">Due modi per cominciare: il telefono o cinque domande.</h1>
          <p className="sommario text-lead">
            Il numero e l’indirizzo dello studio sono qui sotto. Se preferisci scrivere, il brief in
            fondo alla pagina chiede una cosa per volta: alla fine sappiamo già di che intervento si
            tratta, dove è e a che punto sei.
          </p>

          {/* `.nota-inline` e non `.avviso`: questa è una conferma vera rivolta
              a chi legge, mentre `.avviso` è il cartello di cantiere col bordo
              tratteggiato che dice «questo contenuto è provvisorio». Usarlo qui
              insegnerebbe al lettore la cosa sbagliata su cosa vuol dire quel
              bordo — e la scheda progetto di esempio ne ha bisogno per dire
              esattamente quello.
              Un solo figlio dentro, perché è un flex: con l'etichetta in un
              elemento a sé «Stai scrivendo di:» si spezzava su tre righe a
              390 px. Così il testo scorre come una frase sola. */}
          {etichettaIntervento && (
            <p className="nota-inline mt-8">
              <span>
                <strong>Stai scrivendo di:</strong> {etichettaIntervento}. Il primo passo del brief
                è già scelto — se non è quello giusto, si cambia da lì.
              </span>
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#brief" className="btn">
              Raccontaci il progetto
            </Link>
            <a href={`tel:${site.telefonoHref}`} className="btn btn-ghost">
              {site.telefono}
            </a>
          </div>
        </div>
      </div>

      <Sezione
        id="dove"
        etichetta="dove siamo"
        titolo="Dove siamo e come ci si parla."
        intro="I dati diretti dello studio, per chi preferisce non passare dal form."
        nota={
          <>
            Email, PEC, orari e partita IVA sono segnati come mancanti: li deve dare lo studio, sono
            fra i dati bloccanti di CONTENUTI-DA-CLIENTE.md e finché il segnaposto si vede questa
            pagina non è pubblicabile. La mappa è un segnaposto: al suo posto va un’immagine
            statica, non un riquadro incorporato.
          </>
        }
      >
        <div className="nav:grid-12 nav:gap-12 grid gap-10">
          <div className="nav:col-span-6">
            <dl className="contatti-diretti">
              <div>
                <dt>Indirizzo</dt>
                <dd>
                  {/* Non è un link: un indirizzo che apre una mappa a sorpresa
                      porta fuori dal sito chi voleva solo leggerlo. Il link alle
                      mappe sta accanto al segnaposto, dichiarato. */}
                  <address className="not-italic">
                    {site.via}
                    <br />
                    {site.cap} {site.citta} ({site.provincia})
                  </address>
                </dd>
              </div>
              <div>
                <dt>Telefono</dt>
                <dd>
                  <a href={`tel:${site.telefonoHref}`}>{site.telefono}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <DaCliente>{site.email}</DaCliente>
                </dd>
              </div>
              <div>
                <dt>PEC</dt>
                <dd>
                  <DaCliente>{site.pec}</DaCliente>
                </dd>
              </div>
              <div>
                <dt>Orari</dt>
                <dd>
                  <DaCliente>{site.orari}</DaCliente>
                </dd>
              </div>
              <div>
                <dt>Partita IVA</dt>
                <dd>
                  <DaCliente>{site.partitaIva}</DaCliente>
                </dd>
              </div>
            </dl>
          </div>

          <div className="nav:col-span-6">
            <Placeholder label="Mappa statica della sede — nessun cookie di terzi" ratio="4 / 3" />
            {/* La didascalia non ripete l'indirizzo: sta nella colonna qui a
                sinistra, e a 390 px le due copie finiscono nella stessa
                schermata a mezzo centimetro di distanza. Qui serve solo la
                cosa che la colonna non ha, cioè l'itinerario. */}
            <p className="text-muted text-small mt-4">
              <a
                href={hrefMappe}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-text underline underline-offset-4"
              >
                Cerca l’indirizzo nelle mappe
              </a>{' '}
              (si apre in una scheda nuova)
            </p>
          </div>
        </div>
      </Sezione>

      <Brief pagina="/contatti" etichetta="il brief" interventoIniziale={interventoIniziale} />

      {/* `ContactPage` con l'organizzazione in `about`. Due assenze volute:
          nessun `url`/`@id`, perché il dominio è la decisione n. 2 e un nodo con
          un URL inventato è peggio di un nodo senza URL (stessa regola delle
          briciole); nessun `geo`, perché le coordinate della sede non sono un
          dato che abbiamo — «geo: da verificare» nel kit. I campi ancora
          `[[DA CLIENTE]]` (ragione sociale, email, P.IVA, orari) li toglie da sé
          `<JsonLd>`: un segnaposto in `vatID` sarebbe una partita IVA falsa
          dichiarata in modo leggibile da una macchina.
          Attenzione per quando gli orari arrivano: `openingHours` vuole la
          forma di schema.org («Mo-Fr 09:00-18:00»), mentre `site.orari` è la
          frase che si legge in pagina. Se il dato arriva come frase — «solo su
          appuntamento» è il caso probabile — questo campo va tolto da qui e
          rifatto come `openingHoursSpecification`, non riempito con la frase. */}
      <JsonLd
        dati={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: `Contatti — ${site.nomeEsteso}`,
          inLanguage: 'it-IT',
          about: {
            /* `LocalBusiness` accanto a `ProfessionalService`: `CLAUDE.md`
               § SEO chiede la coppia su **home e contatti**, ed era proprio
               questa la pagina in cui c'era un tipo solo. Un'attività con un
               indirizzo civico e un telefono è entrambe le cose, e i due tipi
               si dichiarano su uno stesso nodo, non su due. */
            '@type': ['ProfessionalService', 'LocalBusiness'],
            name: site.nomeEsteso,
            legalName: site.ragioneSociale,
            description: `Studio di ${site.qualifica} a ${site.citta}.`,
            telephone: site.telefonoHref,
            email: site.email,
            vatID: site.partitaIva,
            openingHours: site.orari,
            areaServed: `${site.citta} e provincia`,
            address: {
              '@type': 'PostalAddress',
              streetAddress: site.via,
              postalCode: site.cap,
              addressLocality: site.citta,
              addressRegion: site.provincia,
              addressCountry: 'IT',
            },
          },
        }}
      />
    </>
  )
}
