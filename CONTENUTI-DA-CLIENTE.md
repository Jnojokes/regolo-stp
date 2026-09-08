# CONTENUTI DA CLIENTE — REGOLO STP

> Ogni `[[DA CLIENTE: …]]` nel codice e ogni dato che manca. ▲ = minimo per andare online.

## Bloccanti (senza questi non si pubblica)

| Cosa | Dove serve | A chi lo chiedo | Chiesto il | Ricevuto |
|---|---|---|---|---|
| ▲ Ragione sociale esatta, P.IVA, sede legale, REA | footer, note legali, JSON-LD | titolare | | |
| ▲ Telefono diretto, email pubblica, PEC, orari | footer, contatti, JSON-LD | titolare | | |
| ▲ **Casella dove arrivano i brief** (`BRIEF_TO`) — può non essere la mail pubblica | route `/api/brief` | titolare | | |
| ▲ **Mittente delle mail del brief** (`BRIEF_FROM`): dominio da verificare su Resend | route `/api/brief` | titolare (dipende dalla decisione n. 2) | | |
| ▲ **Numero WhatsApp** (un mobile: il fisso non ce l'ha) | barra CTA mobile dell'opzione B | titolare | | |
| ▲ Titolare del trattamento ed email per i diritti privacy | privacy | titolare | | |
| ▲ Dominio definitivo e accesso DNS (o accesso a brasili.net) | canonical, redirect, deploy | titolare | | |
| ▲ Iscrizioni: ordini degli ingegneri/architetti, sezione, numero; coordinatore sicurezza; CTU; certificazioni | studio, persone, JSON-LD `hasCredential` | titolare | | |
| ▲ **Conferma della answer capsule, frase per frase** | /studio in chiaro, e `description` del JSON-LD di home, studio e contatti | titolare | | |
| **Zona servita**: «Fermo e provincia» è una deduzione dalla sede, non un dato | `areaServed` del JSON-LD su home, studio, contatti, servizi | titolare (si chiude con la decisione n. 13) | | |

**Sulla capsule.** Le cinque frasi di `kit/REGOLO_SEO-GEO-LEGAL.md` § Answer capsule le abbiamo
scritte noi, dal profilo LinkedIn: `kit/00-KICKOFF.md` dichiara in testa che **non c'è ancora un
trascritto del meeting**. Due di quelle frasi sono promesse operative — «con la stessa squadra»,
«una persona di riferimento dall'inizio alla fine» — e vivono in quattro punti del sito
(`Hero.tsx`, `servizi/page.tsx`, `lib/processo.ts`, `studio/page.tsx`), da dove finiscono nel
`description` del JSON-LD, cioè in una forma che una macchina legge e ripete. Per il payoff, che
viene dallo stesso prototipo, questa tabella ha già la riga «è nostro, dal prototipo approvato:
se non li rappresenta si cambia adesso». La capsule non ce l'aveva, ed è lo stesso standard.
Finché non torna confermata, quelle due frasi non vanno considerate contenuto dello studio.

## Contenuti

| Placeholder | Pagina | Cosa serve (minimo accettabile) | Chiesto il | Ricevuto |
|---|---|---|---|---|
| ▲ 6-10 progetti | /progetti, home | per ciascuno: foto (anche di cantiere, anche da telefono, purché loro), luogo, anno, mq, **ruolo dello studio**, committente se citabile. Con zero schede l'indice mostra un cartello che spiega cosa manca invece di una griglia vuota | | |
| ▲ Le persone | /studio, home | ritratto, nome, ruolo, abilitazioni e numero d'ordine | | |
| Numeri | home | anni di attività, progetti chiusi, mq progettati, comuni | | |
| Elenco dei comuni in cui hanno lavorato | home (territorio), **filtro «Comune» di /progetti**, SEO | lista, anche solo nomi. Nota: il filtro per comune dell'indice si costruisce dai comuni **veri** delle schede — un comune ancora segnaposto non compare fra i filtri, e quella scheda si trova solo per tipo o per ruolo | | |
| 3-5 testimonianze con nome e cognome | home | basta una telefonata registrata e trascritta, ognuna legata a un progetto | | |
| Elenco «cosa serve da te» per ciascuno dei 6 servizi | home (opzione B), /servizi/* | i documenti che chiedono davvero a un cliente per partire; per «Comfort, energia, acustica» non ne abbiamo nemmeno una proposta, e in home si vede il segnaposto | | |
| Vecchie URL di brasili.net con traffico | REDIRECT.md | export da Search Console o Analytics del vecchio sito, se esiste | | |
| Loghi imprese partner, pubblicazioni, premi | home, studio | solo se citabili | | |
| Tempo di risposta da dichiarare nella mail di cortesia, se lo vogliono | mail del brief | una frase: oggi non promettiamo nessun tempo (CLAUDE.md § Obiettivo) | | |
| Se le sette voci di «tipo di immobile» del brief vanno bene | brief, passo 2 | oggi: casa indipendente · appartamento · **condominio o parti comuni** · edificio intero · capannone o ufficio · terreno · altro | | |
| Titolare del trattamento, base giuridica e tempi di conservazione dei brief | /privacy (fase 7) | dipende dalla decisione n. 14: con Resend c'è un responsabile da nominare, con l'SMTP dello studio no | | |
| «Cosa serve da te» per **Comfort, energia, acustica** | home B, /servizi/energia-acustica | è il sesto servizio, l'unico senza percorso nella hero: gli altri cinque hanno una proposta nostra, questo no | | |
| Conferma dei cinque elenchi «cosa serve da te» proposti | home B, /servizi/* | li abbiamo scritti noi dal prototipo: vanno letti e corretti servizio per servizio | | |
| Quante persone sono e chi firma cosa | home, /studio | in pagina ci sono quattro caselle: è un'ipotesi di impaginazione, non un organigramma | | |
| Se il payoff «Progettiamo e dirigiamo. Dal disegno al cantiere.» va bene | home A (è l'h1) | è nostro, dal prototipo approvato: se non li rappresenta si cambia adesso, non dopo | | |
| ▲ **Le 18 risposte alle FAQ** dei sei servizi | /servizi/* | le abbiamo scritte noi come proposta e in pagina sono marcate «proposta»: finché non tornano confermate **non entrano nei dati strutturati** (`kit/REGOLO_SEO-GEO-LEGAL.md`: «i testi delle risposte: da scrivere con lo studio»). Si validano una per una mettendo `validato: true` in `lib/contenuti/servizi.ts` | | |
| Conferma dei sei elenchi «cosa serve da te» | /servizi/* | cinque vengono dal prototipo, per «Comfort, energia, acustica» non è mai stato scritto e è un segnaposto | | |
| Conferma dei sei sommari dei servizi | /servizi/* | una riga per servizio, nostra: dice cosa ottiene chi affida l'incarico | | |
| Conferma dei sei elenchi «per chi è» | /servizi/* | tre voci per servizio, nostre | | |
| ▲ **Il primo progetto vero** | /progetti/* | c'è un solo MDX di esempio (`content/progetti/esempio-scheda.mdx`) con tutti i campi segnaposto: si copia, si rinomina lo slug, si riempie e si toglie `esempio: true`. I campi obbligatori li impone `lib/contenuti/schema.ts` e la build fallisce se ne manca uno | | |
| Per ogni progetto: il **racconto** (contesto e problema, cosa abbiamo fatto, come è andata in cantiere) | /progetti/* | è il corpo MDX. I dati duri sono il frontmatter; il corpo è quello che un altro committente legge per capire se ragionate come serve a lui | | |
| Coordinate geografiche della sede | JSON-LD `LocalBusiness` | il kit le dà «da verificare»: non le abbiamo inventate, e il campo `geo` oggi si omette | | |

## Media (dettaglio in TODO-MEDIA.md)

| Cosa | Blocco | Minimo accettabile | Chiesto il | Ricevuto |
|---|---|---|---|---|
| ▲ Foto hero di un'opera realizzata | hero | orizzontale, lato lungo ≥ 2400 px, non un render | | |
| Coppie prima/dopo su 2-3 recuperi | prima/dopo | stesso punto di ripresa | | |
| Modelli CAD/BIM di 2-3 progetti (Revit, IFC, SketchUp, Archicad) | decide il 3D | — | | |

## Ogni segnaposto in pagina, rotta per rotta

<!-- SEGNAPOSTO:inizio -->

> **Generato**, non scritto a mano: `npm run build && node scripts/segnaposto.mjs --scrivi`.
> 61 richieste distinte, raccolte dall'HTML reso di 17 pagine.
> Le due forme sono volute: in A il segnaposto **si vede** (è la proposta candidata alla
> produzione), in C e D si legge lorem ipsum e la richiesta resta in `data-chiede`.

| Cosa serve | Dove (rotte) | Come si vede in pagina |
|---|---|---|
| albo o collegio, e numero | / · /studio | visibile |
| anno | /progetti/esempio-scheda | visibile |
| anno del progetto 1 | /opzione-c · /opzione-d | lorem ipsum |
| anno del progetto 2 | /opzione-c · /opzione-d | lorem ipsum |
| anno del progetto 3 | /opzione-c · /opzione-d | lorem ipsum |
| com’era l’immobile e qual era il problema da risolvere. Due o tre capoversi, scritti come si racconterebbero a voce a un committente nuovo: cosa c’era, cosa non funzionava, quali vincoli — urbanistici, strutturali, di budget o di famiglia — hanno dato la forma all’intervento. | /progetti/esempio-scheda | visibile |
| com'era l'immobile e qual era il problema da risolvere. Due o tre\\ncapoversi, scritti come si racconterebbero a voce a un committente nuovo: cosa\\nc'era, cosa non funzionava, quali vincoli — urbanistici, strutturali, di budget\\no di famiglia — hanno dato la forma all'intervento. | /progetti/esempio-scheda | visibile |
| committente del progetto 1 | /opzione-d | lorem ipsum |
| committente del progetto 2 | /opzione-d | lorem ipsum |
| committente del progetto 3 | /opzione-d | lorem ipsum |
| committente, solo se autorizzato a citarlo | /progetti/esempio-scheda | visibile |
| comune | / · /progetti/esempio-scheda | visibile |
| cosa serve da te per comfort, energia e acustica | /servizi/energia-acustica | visibile |
| da che anno lavora lo studio (o il predecessore, se la continuità si dichiara) | /opzione-c | lorem ipsum |
| didascalia del prima/dopo: che intervento è, dove, in che anno | /opzione-d | lorem ipsum |
| didascalia della fotografia del progetto 1: cosa si vede e da dove | /opzione-d | lorem ipsum |
| didascalia della fotografia del progetto 2: cosa si vede e da dove | /opzione-d | lorem ipsum |
| didascalia della fotografia del progetto 3: cosa si vede e da dove | /opzione-d | lorem ipsum |
| elenco dei comuni in cui avete lavorato | / | visibile |
| email pubblica | / · /cookie · /note-legali · /opzione-c · /opzione-d · /privacy · /progetti/esempio-scheda · /servizi · /servizi/casa-nuova · /servizi/energia-acustica · /servizi/opere-pubbliche · /servizi/pratiche · /servizi/ristrutturazioni · /servizi/strutture · /studio | visibile |
| foto dello stato attuale | /opzione-d | visibile |
| foto dopo, stesso punto di ripresa | /opzione-d | visibile |
| impresa esecutrice, se citabile | /progetti/esempio-scheda | visibile |
| le scelte di progetto e il perché. Non l’elenco delle lavorazioni: le due o tre decisioni che hanno fatto la differenza, e cosa sarebbe andato storto scegliendo diversamente. È la parte che un altro committente legge per capire se ragionate come serve a lui. | /progetti/esempio-scheda | visibile |
| le scelte di progetto e il perché. Non l'elenco delle lavorazioni:\\nle due o tre decisioni che hanno fatto la differenza, e cosa sarebbe andato\\nstorto scegliendo diversamente. È la parte che un altro committente legge per\\ncapire se ragionate come serve a lui. | /progetti/esempio-scheda | visibile |
| luogo del progetto 1 | /opzione-d | lorem ipsum |
| luogo del progetto 2 | /opzione-d | lorem ipsum |
| luogo del progetto 3 | /opzione-d | lorem ipsum |
| mestiere di chi segue pratiche e cantiere | / · /opzione-c · /opzione-d · /studio | visibile |
| nome del progetto | /progetti/esempio-scheda | visibile |
| nome del progetto 01 | / · /opzione-c · /opzione-d | lorem ipsum + visibile |
| nome del progetto 02 | / · /opzione-c · /opzione-d | lorem ipsum + visibile |
| nome del progetto 03 | / · /opzione-c · /opzione-d | lorem ipsum + visibile |
| nome e cognome | / · /opzione-c · /opzione-d · /studio | visibile |
| opzionale, ma è quello che nessuno scrive e tutti vorrebbero leggere. Un imprevisto e come si è risolto vale dieci righe di metodo. | /progetti/esempio-scheda | visibile |
| opzionale, ma è quello che nessuno scrive e tutti vorrebbero\\nleggere. Un imprevisto e come si è risolto vale dieci righe di metodo. | /progetti/esempio-scheda | visibile |
| orari di apertura | / · /cookie · /note-legali · /opzione-c · /opzione-d · /privacy · /progetti/esempio-scheda · /servizi · /servizi/casa-nuova · /servizi/energia-acustica · /servizi/opere-pubbliche · /servizi/pratiche · /servizi/ristrutturazioni · /servizi/strutture · /studio | visibile |
| ordine e abilitazione CSP/CSE | / · /studio | visibile |
| ordine, sezione e numero | / · /studio | visibile |
| P.IVA | / · /cookie · /note-legali · /opzione-c · /opzione-d · /privacy · /progetti/esempio-scheda · /servizi · /servizi/casa-nuova · /servizi/energia-acustica · /servizi/opere-pubbliche · /servizi/pratiche · /servizi/ristrutturazioni · /servizi/strutture · /studio | visibile |
| PEC | / · /cookie · /note-legali · /opzione-c · /opzione-d · /privacy · /progetti/esempio-scheda · /servizi · /servizi/casa-nuova · /servizi/energia-acustica · /servizi/opere-pubbliche · /servizi/pratiche · /servizi/ristrutturazioni · /servizi/strutture · /studio | visibile |
| quanti comuni, e quali (serve anche al blocco Territorio e alla decisione n. 13) | /opzione-c | lorem ipsum |
| quanti incarichi chiusi, anche un ordine di grandezza difendibile | /opzione-c | lorem ipsum |
| ragione sociale esatta | / · /cookie · /note-legali · /opzione-c · /opzione-d · /privacy · /progetti/esempio-scheda · /servizi · /servizi/casa-nuova · /servizi/energia-acustica · /servizi/opere-pubbliche · /servizi/pratiche · /servizi/ristrutturazioni · /servizi/strutture · /studio | visibile |
| ruolo dello studio del progetto 1 | /opzione-d | lorem ipsum |
| ruolo dello studio del progetto 2 | /opzione-d | lorem ipsum |
| ruolo dello studio del progetto 3 | /opzione-d | lorem ipsum |
| ruolo dello studio nel progetto 1: progetto architettonico / strutturale / direzione lavori / coordinamento sicurezza / collaudo | /opzione-c | lorem ipsum |
| ruolo dello studio nel progetto 2: progetto architettonico / strutturale / direzione lavori / coordinamento sicurezza / collaudo | /opzione-c | lorem ipsum |
| ruolo dello studio nel progetto 3: progetto architettonico / strutturale / direzione lavori / coordinamento sicurezza / collaudo | /opzione-c | lorem ipsum |
| ruolo: progetto / DL / sicurezza / collaudo | / | visibile |
| superficie complessiva progettata: è il dato che il committente italiano legge per primo | /opzione-c | lorem ipsum |
| superficie del progetto 1 | /opzione-d | lorem ipsum |
| superficie del progetto 2 | /opzione-d | lorem ipsum |
| superficie del progetto 3 | /opzione-d | lorem ipsum |
| superficie in mq | /progetti/esempio-scheda | visibile |
| tipo del progetto 1 (residenziale, pubblico…) | /opzione-c | lorem ipsum |
| tipo del progetto 2 (residenziale, pubblico…) | /opzione-c | lorem ipsum |
| tipo del progetto 3 (residenziale, pubblico…) | /opzione-c | lorem ipsum |
| una riga che dica cosa è questo intervento | /progetti/esempio-scheda | visibile |
| WhatsApp | /opzione-c · /opzione-d | visibile |

<!-- SEGNAPOSTO:fine -->
