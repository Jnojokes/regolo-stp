import type { Metadata } from 'next'
import Link from 'next/link'
import { Briciole } from '@/components/Briciole'
import { JsonLd } from '@/components/JsonLd'
import { DaCliente, Placeholder } from '@/components/Placeholder'
import { Sezione } from '@/components/sezioni/Sezione'
import { notaPersone, persone } from '@/lib/persone'
import { fasi, introProcesso } from '@/lib/processo'
import { servizi } from '@/lib/servizi'
import { ctaPrimaria, eSegnaposto, site } from '@/lib/site'

/**
 * La pagina dello studio (CLAUDE.md § Struttura: «chi siamo, metodo, persone»).
 *
 * È la pagina che decide la fiducia. Chi arriva qui ha già sentito il nome per
 * passaparola (CLAUDE.md § Obiettivo) e sta facendo una cosa sola: capire chi
 * mette la firma. In una società tra professionisti non si compra un catalogo
 * di servizi, si compra una persona abilitata che risponde al telefono — e per
 * questo la pagina è ordinata così, dal generale al nome proprio: **chi siamo**
 * (cosa siamo, in cinque righe) → **come lavoriamo** (il metodo, che è la sola
 * promessa che possiamo fare oggi) → **le persone** (chi firma) → il brief.
 *
 * Le tre sezioni non hanno contenuto proprio: sono i tre moduli condivisi con
 * la home (`lib/processo`, `lib/persone`) e la capsule. Voluto: se il metodo
 * fosse riscritto qui, fra un mese direbbe una cosa diversa da quella che dice
 * la home, e chi ha letto le due pagine se ne accorge prima di noi.
 *
 * L'ordine inverso — le persone in cima — sarebbe più lusinghiero e oggi
 * mostrerebbe per prima cosa quattro rettangoli vuoti: le persone stanno in
 * fondo perché è dopo aver letto il metodo che il nome di chi lo applica
 * significa qualcosa.
 */

/**
 * L'**answer capsule**, verbatim da `kit/REGOLO_SEO-GEO-LEGAL.md` § Answer
 * capsule. È la **sorgente unica** del testo che il sito dà su REGOLO: da qui
 * escono la `description` di questa pagina, la `description` del nodo
 * `ProfessionalService` e — alla fase 6 — `llms.txt`. Se cambia, cambia qui e
 * cambia in tutti e tre i posti insieme.
 *
 * Sono cinque frasi, che nel documento occupano sei righe: la terza va a capo
 * perché il blocco è impaginato a 100 colonne, non perché siano due frasi.
 * Verificato carattere per carattere contro il documento. Il testo è
 * quello approvato, parola per parola, e non si riscrive per «farlo suonare
 * meglio»: è l'unico testo su REGOLO che qualcuno ha validato.
 *
 * Quello che NON c'è è deliberato. Il documento dice: «le righe su anni di
 * attività, numero di progetti e comuni si aggiungono quando arrivano i
 * numeri». Finché non arrivano, quelle righe non esistono — nemmeno arrotondate
 * (CLAUDE.md § Regole, 1) — e la nota della sezione lo dichiara in pagina.
 */
const CAPSULE = [
  'REGOLO è una società tra professionisti di ingegneria civile e architettura con sede a Fermo.',
  'Progetta e dirige lavori su edifici nuovi ed esistenti, pubblici e privati.',
  'Si occupa di progettazione architettonica e strutturale, pratiche edilizie e sismiche, efficienza energetica e acustica, coordinamento della sicurezza e collaudi.',
  'Segue ogni intervento dal primo incontro al cantiere, con la stessa squadra.',
  /* L'unica frase della capsule che contiene dati anagrafici: via e telefono
     arrivano da `lib/site`, non riscritti qui. La stringa che ne esce è quella
     del documento, carattere per carattere, ma se un giorno lo studio corregge
     un numero civico o un numero di telefono non resta una seconda versione
     in questa pagina — che è il modo classico in cui il NAP di uno studio
     finisce per dire due cose diverse in due punti del sito. */
  `Lo studio è in ${site.via}, ${site.citta}; telefono ${site.telefono}.`,
] as const

/** La capsule su una riga: è la forma che vuole un `description` di JSON-LD. */
const CAPSULE_UNA_RIGA = CAPSULE.join(' ')

export const metadata: Metadata = {
  /* Il template del layout aggiunge « — REGOLO»: 41 caratteri in tutto. */
  title: 'Chi siamo e chi firma i progetti',
  /* Compressione della capsule, non un testo nuovo: le cinque frasi intere
     stanno in 474 caratteri e il limite di fase è 155. Le parole sono le sue. */
  description:
    'Società tra professionisti di ingegneria civile e architettura a Fermo: chi siamo, come lavoriamo, chi firma. Dal primo incontro al cantiere.',
}

export default function Studio() {
  /* Un nodo `Person` senza nome non è una persona: è un mestiere che lavora da
     nessuno. `JsonLd` toglie da sé i campi `[[DA CLIENTE]]`, ma toglie il nodo
     intero solo se resta vuoto — e `jobTitle` e `worksFor` non sono segnaposto,
     quindi il nodo sopravvivrebbe senza `name` (verificato nel browser: senza
     questo filtro il documento emette quattro `Person` anonimi). Il nome è la
     condizione di esistenza del nodo, e si dichiara qui. */
  const personeConNome = persone.filter((p) => !eSegnaposto(p.nome))

  return (
    <>
      <div className="testa-pagina">
        <div className="wrap">
          <Briciole percorso={[{ href: '/studio', label: 'Studio' }]} />
          <p className="eyebrow mt-6">Lo studio</p>
          <h1 className="mt-3">Si sceglie chi firma, non l’insegna.</h1>
          <p className="sommario text-lead">
            Cosa siamo, come lavoriamo e chi mette la firma sui progetti. Sono le tre cose che vale
            la pena sapere prima di affidare un incarico, e stanno tutte in questa pagina.
          </p>
        </div>
      </div>

      <Sezione
        id="chi-siamo"
        quota="Chi siamo"
        titolo="Cosa siamo e cosa facciamo."
        nota="In questo testo non ci sono anni di attività, numero di progetti, metri quadri o comuni: quelle righe si aggiungono quando arrivano i numeri dallo studio (CONTENUTI-DA-CLIENTE.md). È anche la sorgente unica di quello che il sito e le risposte generate dicono su REGOLO: si cambia qui, non in dieci posti."
      >
        <div className="prosa">
          {/* Le prime due frasi insieme — cosa siamo, cosa facciamo — poi una
              frase per paragrafo: competenze, metodo, dove siamo. Il testo è
              quello della capsule; a cambiare è solo dove va a capo. */}
          <p>
            {CAPSULE[0]} {CAPSULE[1]}
          </p>
          <p>{CAPSULE[2]}</p>
          <p>{CAPSULE[3]}</p>
          {/* La sede resta prosa e il numero non è un link: il telefono
              cliccabile sta nell'intestazione, nella CTA in fondo e nel footer,
              e un link dentro un testo verbatim è la prima cosa che si rompe
              quando il testo cambia. */}
          <p>{CAPSULE[4]}</p>
        </div>
      </Sezione>

      <Sezione
        fondo="alt"
        id="metodo"
        quota="Come lavoriamo"
        titolo="Il metodo: cinque passaggi, sempre gli stessi."
        intro={introProcesso}
      >
        {/* Le stesse cinque fasi della home e delle pagine servizio, dallo
            stesso modulo. Il numero lo mette un counter CSS: scriverlo a mano
            vorrebbe dire mantenerlo allineato all'ordine dell'array. */}
        {/* `role="list"`: `list-style: none` toglie il ruolo di lista in Safari
            con VoiceOver, e «cinque passaggi» è metà dell'informazione. È la
            stessa ragione per cui ce l'hanno le liste della home. */}
        <ol className="processo-elenco max-w-[62ch]" role="list">
          {fasi.map((f) => (
            <li key={f.titolo}>
              <div>
                <strong className="processo-titolo">{f.titolo}</strong>
                <p>{f.testoLungo}</p>
              </div>
            </li>
          ))}
        </ol>
      </Sezione>

      <Sezione
        id="persone"
        quota="Le persone"
        titolo="Chi firma il progetto."
        intro="Nome, mestiere e abilitazione, per ciascuno. È la parte della pagina che dice cosa possiamo firmare."
        nota={
          <>
            Ordine, sezione e numero d’iscrizione sono la parte che pesa davvero — sono ciò che dice
            chi può firmare — e non ci sono ancora: finché mancano, nessuna persona entra nei dati
            strutturati della pagina. {notaPersone}
          </>
        }
      >
        {/* Una lista e non quattro <div>: quante sono le persone è
            un'informazione, e chi usa uno screen reader la sente prima di
            scorrerle una per una. Stesso markup del blocco della home
            (`components/sezioni/Persone.tsx`): quando arrivano i nomi si
            riempiono i due posti insieme. */}
        <ul className="griglia-persone" role="list">
          {persone.map((persona) => (
            <li key={persona.ruolo}>
              <Placeholder label={persona.ritratto} ratio="3 / 4" />
              {/* `h3` sotto l'`h2` della sezione: il nome di una persona è un
                  titolo, e chi naviga per titoli deve poter entrare qui. */}
              <h3 className="persona-nome">
                <DaCliente>{persona.nome}</DaCliente>
              </h3>
              <span className="persona-ruolo">
                {/* Tre mestieri su quattro risultano da CLAUDE.md § Cliente, il
                    quarto no: si evidenzia solo quello che manca davvero. */}
                {eSegnaposto(persona.ruolo) ? (
                  <DaCliente>{persona.ruolo}</DaCliente>
                ) : (
                  persona.ruolo
                )}
              </span>
              <span className="persona-abilitazioni">
                <DaCliente>{persona.abilitazioni}</DaCliente>
              </span>
            </li>
          ))}
        </ul>
      </Sezione>

      <Sezione>
        <div className="cta-contestuale">
          <p className="eyebrow">Vi siamo sembrati le persone giuste?</p>
          <h2 className="mt-3 max-w-[26ch]">Cinque domande. Poi vi richiamiamo noi.</h2>
          <p className="intro-sezione text-lead">
            Non serve avere un progetto: bastano l’immobile e l’idea. Le domande sono cinque e i
            dati personali si chiedono solo all’ultima.
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

      {/* Il nodo dello studio. `ProfessionalService` è già una sottoclasse di
          `LocalBusiness`: il doppio `@type` è quello che chiede il capitolato
          (`kit/REGOLO_SEO-GEO-LEGAL.md` § Entità) e serve ai consumatori che
          cercano `LocalBusiness` per nome.

          Niente `url` e niente `@id`: l'URL assoluto ha bisogno del dominio,
          che è la decisione n. 2 e oggi non c'è — e il nodo `#org` canonico lo
          emetterà la home alla fase 6, quando il dominio ci sarà. `email`,
          `vatID`, `openingHours` e `geo` non sono qui perché non li abbiamo:
          nessun segnaposto online, un campo mancante si omette.

          `telephone` in forma E.164 (`+39…`), che è quella che una macchina
          può chiamare; in pagina il numero resta scritto come si legge. */}
      <JsonLd
        dati={{
          '@context': 'https://schema.org',
          '@type': ['ProfessionalService', 'LocalBusiness'],
          name: site.nomeEsteso,
          description: CAPSULE_UNA_RIGA,
          address: {
            '@type': 'PostalAddress',
            streetAddress: site.via,
            postalCode: site.cap,
            addressLocality: site.citta,
            addressRegion: site.provincia,
            addressCountry: 'IT',
          },
          telephone: site.telefonoHref,
          /* «Fermo + provincia», come il nodo `Service` di `/servizi/[slug]` e
             come `kit/REGOLO_SEO-GEO-LEGAL.md` § Entità. **Non** le tre province
             del blocco Territorio: quel perimetro è il riquadro geografico
             dell'autocomplete del brief e non un'affermazione su dove lo studio
             lavori (`lib/territorio.ts`, decisione del 07/09 sui comuni spenti).
             Qui un'area di servizio è invece esattamente un'affermazione, e in
             forma leggibile da una macchina: si dichiara solo quella che risulta
             dalla sede. I comuni entrano con la decisione n. 13. */
          areaServed: `${site.citta} e provincia`,
          /* `knowsAbout` vuole argomenti, non slogan: il titolo di un servizio
             è un esito per il committente («la tua casa, dal disegno al
             cantiere»), il sottotitolo è la competenza («progettazione
             architettonica e direzione lavori»). Il catalogo con i titoli è già
             l'`ItemList` di `/servizi`. */
          knowsAbout: servizi.map((s) => s.sottotitolo),
        }}
      />

      {/* Una `Person` per chi firma — oggi nessuna, perché nessuno dei quattro
          nomi c'è: il documento resta senza questi nodi finché non arrivano. */}
      {personeConNome.map((persona) => (
        <JsonLd
          key={persona.ruolo}
          dati={{
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: persona.nome,
            jobTitle: persona.ruolo,
            /* L'abilitazione si costruisce solo se c'è: la condizione di
               esistenza di una credenziale è la credenziale. `JsonLd` scarta
               ormai anche i gusci annidati rimasti col solo `@type`, quindi
               questa è la seconda rete e non la prima — ma il campo si dichiara
               dove si sa se il dato c'è, non si delega alla pulizia a valle. */
            ...(eSegnaposto(persona.abilitazioni)
              ? {}
              : {
                  hasCredential: {
                    '@type': 'EducationalOccupationalCredential',
                    name: persona.abilitazioni,
                  },
                }),
            worksFor: { '@type': 'ProfessionalService', name: site.nomeEsteso },
          }}
        />
      ))}
    </>
  )
}
