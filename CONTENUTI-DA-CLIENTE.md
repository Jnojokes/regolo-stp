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
