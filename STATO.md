# STATO — REGOLO STP

> La memoria fra una sessione e l'altra. Si aggiorna a ogni stop di fase, prima di fermarsi.

| | |
|---|---|
| Ultima fase chiusa | `/fase-4-contenuti` (07/09/2026, di notte) |
| Prossima fase | `/fase-5-movimento` — **ma è bloccata**: comincia leggendo la decisione n. 1 (A / B / mix), che la prende il cliente in call con FT. Non si tocca finché non è chiusa |
| Come si guarda una pagina | `/servizi/strutture` è la pagina servizio completa · `/progetti` è l'indice con i filtri · `/progetti/esempio-scheda` è la scheda di esempio |
| Deploy | **`regolo-stp.vercel.app`**, collegato via integrazione GitHub: push su `main` → deploy. Node 22. Nessuna cartella `.vercel` e nessun CLI da installare. Le fasi 1 e 2 sono online |
| Come si guarda | online su `regolo-stp.vercel.app` · in locale `npm run dev`, oppure `npm run build && npm run start:prova -- -p 3210` |
| Come si prova il brief | serve `start:prova` o `dev`: accendono `BRIEF_TRASPORTO=file` e le due mail finiscono in `.brief-dev/` invece di partire |
| Budget | rispettato, misurato (tabella sotto) |

## Fatto

| Data | Fase | Cosa | Note |
|---|---|---|---|
| 03/09/2026 | kick-off | reference (scheda `studi-tecnici`), architettura, CLAUDE.md | chat Cowork |
| 07/09/2026 | kick-off | due prototipi di homepage (A «Lo studio», B «Il cantiere»), kit completo, PROMPTS | per la call di vendita di FT |
| 07/09/2026 | 0 — avvio | kit e skill letti, file di tracciamento verificati, strumenti provati, nessuna decisione bloccante | — |
| 07/09/2026 | 1 — impalcatura | Next.js 16 + React 19 + TypeScript, Tailwind v4, ESLint flat + Prettier | `npm run lint` e `npm run build` puliti |
| 07/09/2026 | 1 | 5 font self-hosted in `/public/fonts`, subset latino, `display: swap` | 164 KB in tutto; per rotta ne pesano 59 |
| 07/09/2026 | 1 | token dei due temi in `app/globals.css`, contrasto AA verificato coppia per coppia | `[data-theme="a"]` e `[data-theme="b"]`, si cambiano in un punto solo |
| 07/09/2026 | 1 | header (4 voci + una CTA, menu mobile `<details>` senza JS) e footer operativo | solo dati confermati; il resto è `[[DA CLIENTE]]` visibile |
| 07/09/2026 | 1 | 15 rotte con title, description e h1 unici; 404 tematizzata; error e global-error | `/progetti/[slug]` dà 404 vero finché non ci sono progetti |
| 07/09/2026 | 1 | `redirects()` in `next.config.ts` che legge `REDIRECT.md`, senza catch-all | mappa oggi vuota, salta le righe segnaposto e i cicli |
| 07/09/2026 | **2 — conversione** | **il brief a 5 passi**, componente riusabile in fondo alle due home e in `/contatti` | il dettaglio qui sotto |
| 07/09/2026 | 2 | i cinque passi sono tutti nel DOM: **un solo `<form>` che invia anche senza JS**, con la validazione nativa del browser | provato in un browser con JS disattivato: form 1995 px, un solo bottone, invio → 303 → `/brief/inviato` |
| 07/09/2026 | 2 | a passi solo dopo l'idratazione, con barra di avanzamento, «Indietro / Avanti» e messaggi in italiano | `montato` da `useSyncExternalStore`: primo render identico all'HTML servito |
| 07/09/2026 | 2 | risposte a `radio` nativi; autocomplete dei comuni con `<input list>` + `<datalist>` lato server | 128 comuni ISTAT (FM 40 · MC 55 · AP 33), generati da `scripts/genera-comuni.mjs` |
| 07/09/2026 | 2 | precompilazione del passo 1 da `?intervento=`, **anche senza JS** | valore confrontato con l'elenco chiuso: quattro carichi di prova non selezionano niente e non tornano in pagina |
| 07/09/2026 | 2 | validazione in un solo modulo isomorfo, usata dal browser e dal route handler | `lib/brief/validazione.ts` |
| 07/09/2026 | 2 | honeypot fuori dall'albero di accessibilità + rate limit 5/15 min per IP, con restituzione del credito | niente CAPTCHA |
| 07/09/2026 | 2 | invio con Resend: due mail separate (studio, poi copia di cortesia), non in batch | se la cortesia non parte il brief è arrivato comunque, e la pagina di esito lo dice. **Il trasporto è in revisione**: decisione n. 14, si chiude prima della fase 7 |
| 07/09/2026 | 2 | consenso non pre-spuntato con link a `/privacy`, registrato con momento, testo, versione e pagina | l'IP **non** si registra: serve solo, in memoria, al rate limit |
| 07/09/2026 | 2 | `/brief/inviato` e `/brief/non-inviato`, entrambe `noindex` | con JS un invio fallito resta sul form e non fa perdere le risposte |
| 07/09/2026 | 2 | evento `brief_inviato` (+ `brief_apertura`) in `lib/analytics.ts`, muto finché non c'è l'analytics | parla a Vercel Analytics e a Plausible, i due candidati della decisione n. 10 |
| 07/09/2026 | fuori fase | il kit di progetto è stato spostato in `kit/` dentro il repo; riferimenti in `CLAUDE.md` aggiornati | fatto da FT |
| 07/09/2026 | **3 — home statica** | **due home dagli stessi componenti**: `/` = opzione A «Lo studio», `/opzione-b` = opzione B «Il cantiere» | 12 sezioni condivise, due ordini, due set di token |
| 07/09/2026 | 3 | guscio di sezione condiviso (`components/sezioni/Sezione.tsx`): respiro, occhiello/quota, introduzione, nota di cantiere | la «quota» di B e l'occhiello di A sono lo stesso markup: cambia un token |
| 07/09/2026 | 3 | hero in due varianti: foto + payoff (A) · domanda + cinque percorsi + pannello (B) | **il pannello di B cambia senza JavaScript**: `radio` nativi + `:has()`, provato su tutti e cinque i percorsi |
| 07/09/2026 | 3 | smistamento, numeri, servizi (2 varianti), come lavoriamo (2 varianti), progetti (2 varianti), persone, prima/dopo, esploso, territorio | scritti da sei agenti in parallelo, poi rivisti uno per uno: 16 difetti trovati, 10 corretti in corsa, 0 bloccanti |
| 07/09/2026 | 3 | **esploso strutturale** in SVG, geometria calcolata lato server, cinque livelli già separati | ~6 KB nell'HTML. Corretto un bug del prototipo: metà delle aperture era disegnata sulla faccia non visibile |
| 07/09/2026 | 3 | **territorio** in SVG: perimetro vero delle tre province (ISTAT via openpolis, semplificato a ~100 m) + 128 punti comune | ~4 KB, nessun tile server, nessun cookie. Nessun comune accesso: è la decisione n. 13 |
| 07/09/2026 | 3 | prima/dopo con cursore `input[type=range]` che compare solo dopo l'idratazione | senza JS non c'è un controllo morto: due metà al 50 % con entrambe le etichette |
| 07/09/2026 | 3 | barra CTA mobile sotto i 768 px (B) e barra della proposta in cima a entrambe | la barra della proposta serve alla call di FT e sparisce alla fase 5 |
| 07/09/2026 | 3 | catena dello smistamento chiusa: home → servizio → brief col passo 1 già scelto | provata **senza JavaScript**, tre salti |
| 07/09/2026 | 3 | corretto un disallineamento di idratazione (React 418) nel `<title>` dell'SVG del territorio | trovato con Lighthouse (Best practices 96) e riprodotto in `next dev` |
| 07/09/2026 | 3 | 20 coppie di colore nuove verificate AA, comprese le 15 facce dell'esploso (≥ 3:1 sul fondo) | la palette del prototipo aveva due livelli a 1,5:1: invisibili |
| 07/09/2026 | 3 | **audit avversariale** su sei dimensioni, con confutazione di ogni rilievo non minore | esito qui sotto: un difetto grave trovato e corretto, tre rilievi confutati con prove |
| 07/09/2026 | 3 | corretta la causa comune di **quattro regole CSS morte**: `placeholder-media` era un `@utility` e vinceva su `@layer components` | il blocco prima/dopo era servito **vuoto** (due rettangoli alti 2 px) e la targhetta della hero era larga come tutta la foto. Nota per il futuro in testa a `app/css/sezioni.css` |
| 07/09/2026 | 3 | il brief non si fa più sorprendere dal server senza JS: `pattern` nativi sui tre campi di testo + normalizzazione del comune | «Fermo (FM)» — che è quello che il `<datalist>` mostra — veniva rifiutato dal server e senza JS costava tutte e cinque le risposte. Trappola: i `pattern` si compilano col flag `v`, che vuole `( ) / -` protetti dentro una classe, altrimenti il pattern è **ignorato in silenzio** |
| 07/09/2026 | 3 | il segnaposto di testo ora si vede: filetto pieno a sinistra, tinta, punteggiato | la sola tinta stava a 1,1:1 dalla carta e non si vedeva, mentre il commento del componente prometteva il contrario |
| 07/09/2026 | 3 | «geometra» è diventato un segnaposto | tre mestieri su quattro risultano da CLAUDE.md § Cliente; il quarto veniva dal prototipo e da nessuna fonte confermata. È il tipo di dato plausibile che la regola 1 vieta |
| 07/09/2026 | 3 | rimessa l'evidenziazione legenda ↔ livelli dell'esploso, **in CSS puro** | è il gesto della call in `kit/REGOLO_Due_Opzioni.md` e si era perso passando dal prototipo. `:has()` + `opacity`, dentro `@media (hover: hover)` |
| 07/09/2026 | **4 — contenuti** | **le pagine interne**: sei pagine servizio, indice servizi, indice progetti con i filtri, scheda progetto, studio, contatti | dieci rotte, tutte con briciole, `title` ≤ 60, `description` ≤ 155 e un solo `h1` |
| 07/09/2026 | 4 | contenuti dei progetti in **MDX** con frontmatter validato da **zod**: la build fallisce se un campo manca | provato su quattro guasti: campo `ruolo` assente, ruolo fuori dall'elenco chiuso, `alt` vuoto in galleria, `correlati` che rimanda a uno slug che non esiste |
| 07/09/2026 | 4 | **un solo** MDX di esempio (`content/progetti/esempio-scheda.mdx`), con tutti i campi segnaposto | `esempio: true` accende insieme il `noindex` e il cartello in pagina: una scheda finta non può passare per vera |
| 07/09/2026 | 4 | indice `/progetti` con tre filtri — tipo, comune, ruolo — **come query string**, con il conteggio per voce | link veri, indicizzabili, condivisibili, e funzionanti senza JavaScript perché non ce n'è |
| 07/09/2026 | 4 | le sei pagine servizio complete: esito → per chi è → cosa comprende → cinque fasi → **cosa serve da te** → FAQ → progetti collegati → CTA | la CTA porta al brief con il passo 1 già scelto, e la pagina lo sa da sé: resta statica |
| 07/09/2026 | 4 | **18 FAQ** (3 per servizio) in `<details>` nativi, validate da zod: domanda che finisce con `?`, risposta ≥ 15 parole | nascono `validato: false`, in pagina sono marcate «proposta» e **non entrano nello schema `FAQPage`** finché lo studio non le conferma |
| 07/09/2026 | 4 | `/studio` con la **answer capsule** del kit verbatim, le cinque fasi e le quattro caselle delle persone | la capsule è la sorgente unica: da lì escono la description, il nodo `ProfessionalService` e — alla fase 6 — `llms.txt` |
| 07/09/2026 | 4 | `/contatti` vera: dati confermati, i mancanti come segnaposto, mappa statica **senza iframe**, e il brief | la precompilazione da `?intervento=` continua a funzionare senza JavaScript, che era il requisito da non rompere |
| 07/09/2026 | 4 | `JsonLd` toglie da sé i campi vuoti e i `[[DA CLIENTE]]`, **a ogni livello di annidamento**, e non emette gusci vuoti | «un campo mancante si omette» (`kit/REGOLO_SEO-GEO-LEGAL.md`): un segnaposto in `vatID` non è un buco visibile, è una partita IVA falsa dichiarata a una macchina |
| 07/09/2026 | 4 | corretto un bug della fase 3: la CTA di `/servizi/energia-acustica` produceva un `?intervento=` che il brief scartava in silenzio | il campo ora è `undefined` e il parametro non si mette. Quale risposta del passo 1 gli spetti è la **decisione n. 16**, aperta |

## Misure (07/09/2026, build di produzione, Slow 4G + CPU 4×, viewport 390)

Byte **sul filo** (`encodedDataLength`), non decompressi: il budget parla di KB gz.

| Metrica | Obiettivo | `/` (A) | `/opzione-b` (B) | `/contatti` | Esito |
|---|---|---|---|---|---|
| LCP | < 2,0 s | 0,75 s | 0,72 s | 0,72 s | OK |
| CLS | < 0,05 | 0,000 | 0,006 | 0,000 | OK |
| Peso primo caricamento | < 1,2 MB | 280 KB | 363 KB | 242 KB | OK |
| JS primo caricamento | < 180 KB gz | **149 KB** | 149 KB | 143 KB | OK, 31 KB di margine |
| Richieste | < 40 | 27 | 22 | 17 | OK |
| Documento HTML | — | 26,2 KB | 19,7 KB | 12,7 KB | dentro ci sono l'esploso (~6 KB), la mappa (~4 KB), i 5 pannelli di B (~2 KB) e i 128 `<option>` del datalist (~1 KB) |
| Lighthouse mobile | ≥ 90 ×4 | 100 · 100 · 100 · 100 | 100 · 100 · **60** · 100 | 100 ×4 | OK — vedi sotto |
| Resa | — | statica | statica | **dinamica per scelta** | vedi sotto |

**Le rotte dinamiche, e perché.** Non sono una regressione e al collaudo della fase 8 non vanno
segnalate come tale:

| Rotta | Perché legge la richiesta |
|---|---|
| `/contatti` | `?intervento=` precompila il passo 1 del brief, e deve funzionare **anche senza JavaScript**: il valore va scelto sul server |
| `/progetti` | i tre filtri sono query string per essere indicizzabili e condivisibili (CLAUDE.md § SEO), e senza JS non c'è altro posto dove leggerli |
| `/brief/inviato`, `/brief/non-inviato` | leggono il motivo dell'esito; sono `noindex` |
| `/api/brief` | è un endpoint |

Tutto il resto è statico, comprese le sei pagine servizio e le schede progetto.

### Fase 4 — le pagine interne (07/09/2026, stesse condizioni)

| Rotta | LCP | CLS | Richieste | Peso | JS | Documento |
|---|---|---|---|---|---|---|
| `/servizi/strutture` | 0,77 s | 0,000 | 22 | 245 KB | 144 KB | 8,0 KB |
| `/progetti` | 0,74 s | 0,000 | 18 | 246 KB | 150 KB | 9,0 KB |
| `/progetti/esempio-scheda` | 0,77 s | 0,000 | 20 | 246 KB | 150 KB | 7,2 KB |
| `/studio` | 0,75 s | 0,000 | 17 | 239 KB | 144 KB | 7,6 KB |
| `/contatti` | 0,74 s | 0,000 | 18 | 246 KB | 144 KB | 14,1 KB |

Lighthouse mobile: **100 · 100 · 100 · 100** su `/servizi/strutture` (49 controlli) e su
`/progetti` (50 controlli), zero falliti.

**`zod`, `gray-matter` e `next-mdx-remote` non entrano nel bundle client**: zero chunk su
quattordici (verificato a grep sui chunk serviti). Le tre dipendenze della fase 4 costano zero
byte a chi apre il sito, e il JavaScript resta fra 144 e 150 KB su 180 di budget.

**La fase 3 è costata 5,4 KB gz di JavaScript** (da 143,3 a 148,7): dodici sezioni, due home, e
un solo componente client in tutto (`Confronto.tsx`, il cursore del prima/dopo). Il resto è HTML
servito. Restano 31 KB di margine sul budget per le fasi 4 e 5.

Il SEO 60 su `/opzione-b` è **il `noindex` voluto** sulla rotta di proposta: l'unico controllo
Lighthouse che falla è `is-crawlable`. Non è un difetto (STATO, fase 1; DECISIONI 07/09).

Su `/opzione-b` il peso totale sale per i font in più — debito tecnico della fase 1, non della 3.

## Aperto

| Cosa | Da chi dipende | Blocca |
|---|---|---|
| **A / B / mix — decisione n. 1** | cliente, in call con FT | **la fase 5**. Le due pagine su cui decidere sono in piedi: `/` e `/opzione-b` dallo stesso deploy, con la barra in cima per passare dall'una all'altra. La fase 4 si può fare comunque: i contenuti sono gli stessi per entrambe |
| Come parte la mail del brief: **decisione n. 14** (Resend / SMTP dello studio / SMTP di una casella `brief@`) | NB con il titolare | **la fase 7**: `/privacy` deve nominare il responsabile del trattamento, e con SMTP non c'è nessun terzo da nominare. Le variabili in `.env.example` sono quelle dell'opzione A: quali servano davvero lo dice la n. 14 |
| Dominio | cliente | fase 6 (SEO). Finché non c'è, `metadataBase` resta vuoto, non si dichiara nessun canonical e il `BreadcrumbList` **non si emette** (URL relativi in un JSON-LD non servono a niente) |
| **Le 18 risposte alle FAQ da validare** | studio | niente: in pagina si vedono marcate «proposta». Bloccano solo lo schema `FAQPage`, che oggi non si emette |
| **Decisione n. 16**: che risposta del passo 1 dare a «Comfort, energia, acustica» | NB con FT | niente. Oggi quella CTA manda al brief senza precompilare |
| Foto e dati dei progetti | cliente | fase 4 (contenuti reali) |
| Quale analytics (decisione n. 10) | NB | fase 7. Gli eventi sono già cablati: `lib/analytics.ts` è muto finché non c'è la libreria |
| Node locale v25.7.0, non LTS | NB | niente: `.nvmrc` e `engines` fissano 22 LTS, che è quello che usa Vercel |

## Debiti tecnici, da saldare alla fase 5

| Cosa | Perché c'è | Quando sparisce |
|---|---|---|
| `/opzione-b` precarica il serif dell'opzione A (29 KB che non usa) | Turbopack fonde i CSS dei due temi in un chunk solo, e il preload si decide per font, non per rotta | fase 5: resta un tema solo |
| Rotta catch-all `app/(a)/[...nonTrovata]` per il 404 globale | due root layout ⇒ nessun layout di primo livello in cui disegnare il 404 | fase 5: con un layout solo basta `not-found.tsx` |
| `/brief/inviato` e `/brief/non-inviato` stanno in `(a)`, quindi chi invia da `/opzione-b` atterra su una pagina col tema A | stesso motivo: due root layout, e una pagina di esito per tema sarebbe duplicazione per una rotta che sparisce | fase 5 |
| La `BarraProposta` in cima alle due home | serve alla call di FT: dice quale opzione si sta guardando e permette di passare all'altra | fase 5, con la rotta non scelta |
| `.con-barra-mobile` riserva 5,5rem invece di 4,25 | la cella del WhatsApp è un segnaposto che a 320 px va a capo e alza la barra di una riga. Con lo spazio per una riga sola l'ultimo pixel del footer finiva sotto la barra | quando arriva il numero WhatsApp vero |
| `components/PaginaStub.tsx` ancora usato da 10 rotte | le pagine interne arrivano dopo la home | fasi 4 e successive |

## Da fare alla fase 7 (legal), che nasce dalla fase 2

- In `/privacy`: dire che il consenso si conserva nella casella dello studio con momento, testo e
  versione, e che l'indirizzo IP **non** si registra (si usa in memoria, per pochi minuti, per il
  solo rate limit). **Se** e chi nominare come responsabile del trattamento dipende dalla
  decisione n. 14: con Resend c'è un terzo da nominare, con l'SMTP della casella dello studio no.
- Alzare `CONSENSO.versione` in `lib/brief/consenso.ts` se il testo cambia: i consensi già
  raccolti restano legati alla versione con cui sono stati dati.

## Esito dell'audit della fase 3

Sei revisori indipendenti (contenuto inventato, senza JavaScript, accessibilità, mobile,
performance, fedeltà al capitolato), e ogni rilievo non minore passato a un secondo agente con
il compito di **confutarlo**. Tre dimensioni su sei sono arrivate a termine prima che la
sessione esaurisse il limite: **accessibilità, mobile e performance non hanno girato**, e sono
il primo posto da guardare quando si riprende (le loro voci sono comunque coperte da Lighthouse
e dalle misure qui sopra, ma non da una lettura avversariale).

| Rilievo | Esito |
|---|---|
| Il blocco prima/dopo è servito vuoto (regole CSS morte per la cascata `@utility`) | **confermato e corretto** — era il difetto peggiore della fase, e non l'avevo visto perché non avevo guardato quel blocco da vicino |
| Senza JS un rifiuto del server costa le cinque risposte del brief | **confermato**, mitigato con i `pattern` nativi e la normalizzazione del comune; il residuo è la **decisione n. 15**, aperta |
| Il segnaposto di testo non si vede (1,1:1 dal fondo) | **confermato e corretto** |
| «geometra» fra i mestieri delle persone | **confermato e corretto** (era l'unico dei quattro senza fonte) |
| L'esploso ha perso l'evidenziazione della legenda | **confermato e corretto** in CSS puro |
| La mappa afferma «le tre province in cui lavora lo studio» | **confutato** — FM/MC/AP viene da `CLAUDE.md` § Il form e dal kick-off, e il brief lo dice già in prima persona. Resta un verbo troppo fermo: corretto in una descrizione |
| I quattro mestieri delle persone dichiarati come dato | **confutato** — è una scelta scritta in quattro posti, e la cautela sta in cima alla pagina, non dopo la griglia. Ma la verifica ha isolato «geometra», che era il difetto vero |
| Manca la barra CTA mobile sull'opzione A | **confutato** — l'ordine dei blocchi di `CLAUDE.md` § Due opzioni la mette solo in B, come i prototipi. **Vale la pena rivederlo con FT**: su A, da telefono, dopo la hero il numero ricompare solo nel footer |

## Collaudo

| Controllo | Esito | Data |
|---|---|---|
| `seo-check.mjs` | — | |
| `collaudo.py` | — | |
| `cloaking-check.sh` (3 user-agent) | — | |
| Lighthouse mobile ×4 | 100/100/100/100 su `/` e `/contatti` | 07/09/2026 |
| Brief senza JavaScript, end-to-end | invio completo → `/brief/inviato`, mail scritte; invio incompleto bloccato dal browser | 07/09/2026 |
| Brief con JavaScript, end-to-end | cinque passi, errori in linea, invio → mail; il consenso mancante blocca e non manda niente | 07/09/2026 |
| Rate limit e honeypot | 8 invii rotti non consumano credito; 5 buoni passano, il sesto è 429; honeypot pieno → 200 e nessuna mail | 07/09/2026 |
| Rifiuto consenso → zero richieste ai terzi | n/a se analytics senza cookie | |
| Tastiera | fuoco visibile, Tab + frecce sui radio, fuoco sulla domanda a ogni cambio di passo, fuoco sul primo campo sbagliato | 07/09/2026 |
| Telefono vero | — (provato a 390 px: una colonna, bersagli da 50 px, nessuno scroll orizzontale) | |
| `prefers-reduced-motion` | verificato nel browser: le transizioni scendono a 0,00001 s | 07/09/2026 |
| Contrasto AA delle coppie nuove | 40 coppie in tutto verificate con `scripts/contrasto.mjs`; le 15 facce dell'esploso sono ≥ 3:1 sul fondo | 07/09/2026 |
| **Le due home senza JavaScript** | pannello dei cinque percorsi: 5/5 corretti, un solo pannello alla volta · pastiglie: cinque link veri · prima/dopo: nessun cursore morto · esploso: cinque livelli già separati nell'HTML | 07/09/2026 |
| Catena dello smistamento senza JS | home → `/servizi/pratiche` → `/contatti?intervento=pratica-bonus#brief` → passo 1 già su «Pratica o bonus» | 07/09/2026 |
| Idratazione | zero errori in console su entrambe le pagine, in `next dev` e in produzione | 07/09/2026 |
| Mobile 320 / 390 / 430 / 768 px | nessuno scroll orizzontale, barra mobile che non copre il footer, bersagli ≥ 44 px | 07/09/2026 |
| Nessuna richiesta a terzi | zero: font self-hosted, nessun tile server, nessun analytics ancora installato | 07/09/2026 |
| **Fase 4 — lo schema ferma la build** | provato su quattro guasti: `ruolo` assente, ruolo fuori dall'elenco chiuso, `alt` vuoto in galleria, `correlati` verso uno slug inesistente. Tutti e quattro fermano `next build` con il nome del file e del campo | 07/09/2026 |
| **I filtri di `/progetti` senza JavaScript** | provati con due schede temporanee, poi cancellate: conteggi corretti e coerenti fra i tre filtri, voci a zero spente e non cliccabili, la voce attiva che si disattiva, `noindex, follow` solo con un filtro attivo, tre query ostili che non applicano niente e non compaiono in pagina | 07/09/2026 |
| Le dieci pagine con e senza JavaScript | nessuna perde testo. Le due differenze sono attese: sulla scheda progetto mancano le 7 parole del suggerimento del cursore (che senza JS non esiste) e `/contatti` senza JS ha **più** testo, perché i cinque passi del brief sono tutti visibili | 07/09/2026 |
| FAQ senza JavaScript | i `<details name="faq">` si aprono e si chiudono a vicenda, e la risposta si legge | 07/09/2026 |
| Corpo MDX senza JavaScript | i tre capoversi del racconto sono nell'HTML servito, e i tre segnaposto dentro la prosa sono evidenziati | 07/09/2026 |
| `title` ≤ 60 e `description` ≤ 155 | misurati sull'HTML servito di tutte e undici le rotte, suffisso « — REGOLO» compreso | 07/09/2026 |
| Mobile 320 / 390 / 768 / 1440 px | nessuna delle dieci pagine sfonda in orizzontale. Corretto: le etichette del prima/dopo si sovrapponevano sotto i 430 px | 07/09/2026 |

---

# Nota della notte del 07/09

Ho chiuso la **fase 3** e la **fase 4** e mi sono fermato, come da istruzioni. La fase 5 non
l'ho cominciata: comincia leggendo la decisione n. 1 (A / B / mix), che la prende il cliente in
call con FT. **Le due rotte sono entrambe in piedi, nessun tono è stato scelto, nessun mix
provvisorio è stato portato avanti.**

## La prima cosa da guardare

**`http://localhost:3210/servizi/strutture`** — è la pagina servizio completa, ed è quella che
mostra come sarà il sito quando avrà dei contenuti. Poi **`/progetti`**: con zero schede mostra
un cartello che spiega cosa manca, e i tre filtri sono in pagina e funzionanti (li ho provati
con due schede temporanee, che ho cancellato).

Se hai dieci minuti, il terzo posto è **`/progetti/esempio-scheda`**: è la scheda di esempio, ed
è il file che lo studio copia per pubblicare il primo progetto vero.

## Le tre decisioni che ho scritto invece di prendere

| # | Cosa | Perché non l'ho presa io |
|---|---|---|
| **1** | A / B / mix | è del cliente, e blocca la fase 5 |
| **15** | senza JavaScript un rifiuto del server costa ancora le cinque risposte del brief, nel caso residuo | chiuderlo bene vuol dire riscrivere il route handler come Server Action e ri-collaudare la fase 2: è un costo M, e la decisione è tua |
| **16** | «Comfort, energia, acustica» non ha una risposta nel passo 1 del brief | tre opzioni, una delle quali sposta un capitolato. Oggi la CTA di quel servizio manda al brief senza precompilare, e non finge il contrario |

Non ho toccato le n. 2 (dominio) e n. 14 (come parte la mail del brief). Non ho chiesto né usato
la chiave Resend e non ho provato nessun invio reale: il trasporto su file è rimasto come stava.

## Cosa ho corretto che non sapevo di dover correggere

Tre difetti veri, trovati dall'audit avversariale e non da me:

1. **Il blocco prima/dopo era servito completamente vuoto.** `placeholder-media` era un
   `@utility` di Tailwind, che compila in `@layer utilities` e vince su `@layer components`:
   quattro regole di blocco perdevano in silenzio. Non me ne ero accorto perché avevo
   fotografato quel blocco e non l'avevo guardato.
2. **Senza JavaScript il brief perdeva le cinque risposte** se il server rifiutava un valore che
   il browser aveva accettato — e il caso tipico era `Fermo (FM)`, cioè esattamente quello che
   il `<datalist>` mostra.
3. **La CTA di `/servizi/energia-acustica` produceva un `?intervento=` che il brief scartava in
   silenzio**: un parametro morto in una URL.

E due cose che avevo scritto io e che non andavano: il segnaposto di testo stava a 1,1:1 dal
fondo (cioè non si vedeva, mentre il commento del componente prometteva il contrario), e
«geometra» fra i mestieri delle persone era l'unico dei quattro senza nessuna fonte confermata.

## Cosa non è stato provato, e va provato

- **Il ramo «progetto vero» della scheda progetto.** Con `esempio: false` cambiano cinque cose
  (`robots`, il `title`, il nodo `CreativeWork`, l'omissione di impresa e committente, il
  «progetto successivo») e nessuna è stata eseguita: serve un MDX vero. Il primo progetto che
  arriva va guardato in pagina.
- **`next/image` non è mai stato eseguito**: nessuna immagine ha ancora un file. Il ramo è tre
  righe, ma è codice non collaudato — rapporto d'aspetto, ritaglio e `sizes` vanno visti con la
  prima foto vera.
- **Accessibilità, mobile e performance non hanno avuto una lettura avversariale**: l'audit della
  fase 3 si è fermato a metà per il limite di sessione. Sono coperti da Lighthouse e dalle
  misure, non da qualcuno che cercava di rompere.
- **Nessuna prova su un telefono vero.** Tutto il mobile è emulato.

## Due cose da sapere per lavorare qui

- **`next start` serve il build che c'era all'avvio.** Ricostruire senza riavviare fa servire
  chunk vecchi e sembrare rotto ciò che funziona: ci ho perso mezz'ora prima di capirlo. Serve
  build **e** riavvio insieme.
- **Non far costruire più agenti nello stesso `.next`.** I build concorrenti si sovrascrivono i
  chunk e le pagine cominciano a rispondere 500 senza che ci sia niente di rotto nel codice. È
  successo, e mi ha invalidato una misura.

## Debiti piccoli, segnati e non urgenti

- `favicon.ico` risponde 404 su tutto il sito: dipende dal logo, che è la decisione n. 5.
- `robots.txt` e `sitemap.xml` non ci sono: sono della fase 6.
- I nodi JSON-LD si riferiscono all'organizzazione **per nome** invece che con un `@id`, perché
  il dominio manca. Da legare in fase 6, insieme a `areaServed`, che oggi dice «Fermo e
  provincia» sulle pagine servizio e su `/contatti` mentre il brief e la mappa parlano di tre
  province: **due nodi dicono due cose diverse**, e va allineato una volta per tutte.
- `components/PaginaStub.tsx` è ancora usato dalle tre pagine legali: sparisce alla fase 7.
- Il file `content/progetti/esempio-scheda.mdx` va **cancellato al go-live**. Il valore
  `esempio: true` resta nello schema per la prossima volta.

