# REGOLO — SEO, GEO e legal (istanziato sul cliente)

> 07/09/2026 · Capitolato: `web-references/blocchi/seo-geo-legal.md`. Qui solo le risposte per
> Regolo. Regola madre: **nessun segnaposto online** — un campo mancante si omette.

## Dati che bloccano tutto

Ragione sociale esatta, P.IVA, sede legale, PEC, email, orari, titolare del trattamento,
iscrizioni agli ordini. Oggi confermati: nome (REGOLO STP), indirizzo (Via Campiglione 2/E,
63900 Fermo), telefono (0734 510329). Il resto è in `CONTENUTI-DA-CLIENTE.md` come bloccante.

## Contenuto senza JavaScript

Next.js App Router: i contenuti sono nell'HTML. Da verificare in fase 6 con `curl -A GPTBot`
che i blocchi animati (processo, esploso, prima/dopo) abbiano il testo completo anche senza JS.

## Answer capsule (sorgente unica di description, JSON-LD, «studio», llms.txt)

```
REGOLO è una società tra professionisti di ingegneria civile e architettura con sede a Fermo.
Progetta e dirige lavori su edifici nuovi ed esistenti, pubblici e privati.
Si occupa di progettazione architettonica e strutturale, pratiche edilizie e sismiche,
efficienza energetica e acustica, coordinamento della sicurezza e collaudi.
Segue ogni intervento dal primo incontro al cantiere, con la stessa squadra.
Lo studio è in Via Campiglione 2/E, Fermo; telefono 0734 510329.
```
Le righe su anni di attività, numero di progetti e comuni si aggiungono quando arrivano i numeri.

## Entità e dati strutturati

| Nodo | Campi che abbiamo | Campi che mancano (si omettono finché non arrivano) |
|---|---|---|
| `ProfessionalService` (+ `LocalBusiness`) `#org` | name, url, description (capsule), address (Fermo), telephone, areaServed (Fermo + provincia; i comuni dopo la lista), `knowsAbout` = i 6 servizi, `hasOfferCatalog` → 6 `Service` | vatID, email, openingHours, geo (coordinate della sede: da verificare), sameAs (LinkedIn c'è; GBP?) |
| `Person` × N `#persona-slug` | name, jobTitle, worksFor | `hasCredential` (ordine, sezione, numero), image, sameAs |
| `WebSite`, `WebPage`, `BreadcrumbList` | sempre | — |
| `FAQPage` | sulle 6 pagine servizio (3-8 domande ciascuna, scritte come le fa un cliente) | i testi delle risposte: da scrivere con lo studio |
| `CreativeWork`/`ImageObject` per progetto | luogo, anno, `creditText` | solo quando ci sono le foto |

## GEO — le 12 domande della baseline (da porre prima del deploy, poi a 60 giorni)

Intento locale «trova-professionista»:
1. Chi mi consigli come ingegnere strutturista a Fermo?
2. Studio di architettura a Fermo per ristrutturare una casa: a chi mi rivolgo?
3. Chi fa pratiche sisma bonus in provincia di Fermo?
4. Direzione lavori per una villa nelle Marche, zona Fermo: quale studio?
5. Ingegnere per collaudo statico a Fermo.

Adempimento / problema:
6. Cosa serve per ristrutturare un casolare nelle Marche? Quali pratiche?
7. Come faccio a sapere se la mia casa è sicura dal punto di vista sismico?
8. Quanto tempo ci vuole per un permesso di costruire nelle Marche?
9. Chi può firmare una pratica di miglioramento sismico?

Entità e confronto:
10. Chi è REGOLO STP di Fermo? Cosa fa?
11. Studio Brasili Fermo — è ancora attivo? (verifica della continuità di marca)
12. Quali studi di ingegneria e architettura ci sono a Fermo? (confronto con i concorrenti diretti, da elencare nella scheda nicchia)

Protocollo: Google AI Mode + ChatGPT (chat nuova, senza login, posizione Fermo), screenshot
con la query visibile, archivio in `geo-baseline/AAAA-MM-GG/`. La metrica: **citato con il link**.

## Politica sui crawler di addestramento — decisione n. 9

Uno studio tecnico non vive di opere dell'ingegno riutilizzabili: default proposto **consentiti**
(entrambi i gruppi), nessuna riserva TDM. Se il cliente vuole bloccare: robots + meta
`tdm-reservation` + sezione nelle note legali, tutte e tre.

## Legal

| Voce | Per Regolo |
|---|---|
| Pagine | `/privacy`, `/cookie`, `/note-legali` (tre, separate). Modelli in `skills/sito-seo-geo-legal/templates/` |
| Titolare | la STP con P.IVA e sede: bloccante |
| Analytics | senza cookie (decisione n. 10) → **nessun banner** |
| Terze parti | nessun iframe: mappa statica nel footer, niente YouTube, niente Calendly. Se in futuro entra Google Maps → consent gate |
| Form | Resend come responsabile; checkbox non pre-spuntata; consenso con timestamp e testo; honeypot + rate limit; dichiarare in privacy dove finiscono i dati |
| Settore | professionisti ordinistici: ordine, sezione e numero in pagina e nel JSON-LD; nessuna compliance sanitaria/e-commerce |
| Note legali | art. 7 D.Lgs. 70/2003 + art. 2250 c.c. (STP: registro imprese, REA); diritti sulle foto dei progetti (committenti citati solo se autorizzati); dichiarazione «nessun contenuto generato con IA» salvo lo sfondo OG, se generato |

## Fuori sito

| Cosa | Stato | Da fare |
|---|---|---|
| Google Business Profile | non verificato | controllare se esiste (REGOLO / Brasili), NAP identico al sito, foto vere, sito linkato: **prerequisito per le domande 1-5** |
| LinkedIn | esiste (company page) | allineare NAP e descrizione all'answer capsule |
| Albi (ordine ingegneri e architetti di Fermo), PagineGialle, Bing Places, Apple Business Connect | non verificati | censire, allineare, aggiungere a `sameAs` |
| brasili.net | offline | recuperare le URL con traffico → `REDIRECT.md` |

## Pannello

Default **no** (decisione n. 11): progetti in MDX nel repo, aggiornamenti a preventivo.
