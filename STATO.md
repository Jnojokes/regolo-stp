# STATO — REGOLO STP

> La memoria fra una sessione e l'altra. Si aggiorna a ogni stop di fase, prima di fermarsi.

| | |
|---|---|
| Ultima fase chiusa | **fase 3 quinquies (2/2) — le due alternative rifatte «identiche» alle reference indicate** (08/09/2026) |
| Prossima fase | `/fase-5-movimento` — **ma è bloccata**: comincia leggendo la decisione n. 1 (A / B / C), che la prende il cliente in call con FT. Non si tocca finché non è chiusa |
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
| 08/09/2026 | **3 quinquies (2/2)** | **le due alternative rifatte «identiche» ai due indirizzi indicati dal committente**: B = ecoLINEAR, C = Halston, con le lettere rinominate da C/D a B/C | catturate e misurate nel browser; classi condivise con A da 65/54 % a **46 %**; il `<main>` di A byte-identico. Il dettaglio qui sotto |


## Fase 3 quinquies (2/2) — le due alternative rifatte «identiche» alle reference indicate (08/09/2026)

Questa è la seconda metà della stessa giornata, e **sostituisce** buona parte della prima: le due
proposte alternative descritte nella sezione seguente non esistono più. Il committente ha dato
prima una diagnosi e poi due indirizzi.

> *«Le altre due opzioni rispetto la A sono ancora troppo simili in struttura alla A oltre la
> hero section. Devono essere proprio siti diversi.»*
> *«L'opzione 2 la voglio identica a questo sito: https://ecolinearstudio.com/»*
> *«L'opzione 3 la voglio identica a questo sito: https://halston-architecture-template.webflow.io/»*
> *«Fai tutto il necessario fino alla fine per rendere le due opzioni alternative come le
> references. Io vado a dormire.»*
> *«Cancella quello che non è più necessario per mantenere l'opzione A come adesso, l'opzione B
> come ecolinear e l'opzione C come halston.»*

**La diagnosi era giusta e il mio criterio guardava altrove.** Avevo appena portato la
somiglianza fra le due alternative da 94/91 % a 73/61 %, e il bersaglio era sbagliato: quello che
il committente guardava era la somiglianza **con A**, che stava a **65 %** e **54 %**. E la cosa
che si vedeva non era una percentuale — erano tre pagine che, sotto la hero, sono la stessa cosa:
una colonna di blocchi titolo-più-contenuto che scorre.

### Il numero, adesso

| | 3 quater | **3 quinquies (2/2)** |
|---|---|---|
| B dentro A | 65 % | **46 %** (48 classi su 105) |
| C dentro A | 54 % | **46 %** (48 su 105) |
| B ↔ C | 73 % / 61 % | **49 %** (51 su 105) |

Il pavimento è il chrome che *deve* restare condiviso — brief, footer, segnaposto, `wrap` —
quindi 46 % è vicino a quanto si può scendere senza duplicare il form.

### Le tre proposte, adesso

- **A** «lo studio» — un foglio stampato: non si muove, dichiara. **Non toccata**, e verificato
  con un'impronta e non con una promessa: il `<main>` reso di `/` è **byte-identico**, 57.492
  byte, `sha256 537dd84a…`, confrontato col build di `HEAD`.
- **B** «il foglio» — **ecoLINEAR**, misurato: una tavola da disegno. Griglia di costruzione
  tratteggiata, disegni a filo negli angoli (l'arco di una porta, un pilastro con l'asse, una
  linea di sezione), testo in **terracotta** e l'**ambra come superficie**, galleria a quattro
  colonne sfalsate, **fasi pinnate** — il pannello resta fermo, le fasi gli passano accanto e
  ognuna accende il suo disegno — e l'invito **prima** della galleria.
- **C** «le bande» — **Halston**, misurato: nessun contenitore, tutto in maiuscolo, due famiglie
  con la mono sui soli dati, e il ritmo fatto dal **cambio di superficie** — carta, granata,
  mauve, antracite. **Non si muove niente**, e non per risparmio: quella pagina non ha un gesto
  di scorrimento.

### Come sono state prese le misure

Nove catture per reference a 1440 e 390 (`kit/reference/ecolinear/`, `kit/reference/halston/`) e
gli stili **letti nel browser** contando i nodi di testo veri: famiglie, pesi, corpi, interlinee,
tracciature, colori, raggi, ombre. Le tabelle stanno in `kit/reference/SCHEDA.md` e i valori
sono quelli scritti nei token: non c'è una voce «interpretata».

**Un difetto di metodo trovato e corretto**: la `390-hero.jpeg` di Halston era stata catturata
**a metà caricamento** — solo le fotografie, zero testo — e una cattura così non è una prova. La
ripresa aspetta `networkidle`, poi `document.fonts.ready`, poi **scorre tutta la pagina e torna
in cima**, perché quel template rivela il testo allo scorrimento: senza il giro metà dei nodi
resta a `opacity: 0`. È la stessa lezione della passata precedente, in una forma nuova.

### Le otto richieste, e dove sono finite

| | Chiesto | Fatto |
|---|---|---|
| 1 | le due alternative «identiche» alle reference | catturate, misurate, e riscritte da zero: quattro font nuovi (106,8 KB in tutto), due blocchi di token, due fogli di stile (`ecolinear.css` 1.216 righe, `halston.css` 1.066), tre file di componenti nuovi |
| 2 | «devono essere proprio siti diversi» | **46 % con A** contro 65/54, e la differenza è strutturale: A separa col vuoto, B con una griglia di costruzione, C con il colore |
| 3 | rinominare le lettere in **B** e **C** | rotte `/opzione-b` e `/opzione-c`, temi `[data-theme='b']` e `'c'`, tutti gli script del collaudo, la barra della proposta |
| 4 | il passo 1 del brief «diverso su questa opzione rispetto ad A» | **stesso componente, tre apparati** (n. 51): in B la scheda è il pannello con le squadrette d'ambra, l'avanzamento è il righello con la tacca verticale e il numero del passo è il numerone al 12 %; in C l'occhiello è la targa in mono, i filetti non hanno terminatori e le sei risposte sono sei righe. **Zero righe di markup cambiate** |
| 5 | «cancella quello che non è più necessario» | due cartelle di componenti, due fogli di stile, `lib/volume.ts`, due script di collaudo, cinque file di carattere. `lib/esploso.ts` tornato alla versione pre-refactor, con il `<main>` di A verificato identico |
| 6 | «non mi sembra che la versione B abbia il cursore come quello della reference» | vero, e mancava il gesto che spiega tutti gli altri: su ecoLINEAR il puntatore **non c'è** (`cursor: none` su 1.082 elementi) e al suo posto sta il **mirino di un CAD**. Rifatto misurando: quattro tratti da 64 px con 7 px di vuoto al centro, la finestra di selezione da 8 px a spigolo vivo, la lettura di coordinate, l'anello da 52 px sopra gli elementi interattivi. **Il bundle non cresce** (n. 53) |
| 7 | lo screenshot del bug della galleria | non era una misura sbagliata, era **un nome**: `.galleria` esiste già in `pagine.css` come griglia a tre colonne della scheda progetto. Rinominate le sei classi che si scontravano, e nasce un collaudo che controlla i nomi (n. 54) |
| 8 | niente push | nessun push |

### Difetti trovati misurando, che nessuno aveva chiesto di cercare

1. **Il verso di un token conta più del commento che lo accompagna.** `--regolo-ink` di B portava
   il valore *esatto* della reference (3,49:1) con scritto «solo ≥ 24 px». `contrasto-dom.mjs` ha
   trovato **nove** testi sotto soglia: il marchio della testata a 18 px, il nome di un'opera a
   20, la barra della proposta, l'annotazione della quota — tutti ereditavano l'inchiostro senza
   sapere di essere piccoli. Adesso il default è il valore che passa sempre e la tinta esatta è
   **opt-in** (`--regolo-ink-display`, quattro selettori, tutti ≥ 28 px).
2. **Il piano scuro, la terza volta.** Su C metà pagina è banda scura e il blocco che ridichiara
   i token non c'era: **16 testi sotto soglia**, fra cui `passo 1 di 5` a **1,3:1**. La trappola
   è sempre la stessa — `@theme inline` risolve `var(--regolo-ink)` su `:root` una volta sola —
   e questa volta ha una coda nuova: vale anche per i **token derivati**
   (`--regolo-quota-colore`), e vale **al contrario** dove il fondo torna carta dentro una banda
   colorata (la targhetta del segnaposto, a 1,31:1 sulla propria carta).
3. **Il mauve della seconda banda stava a 4,13:1, non a 4,52.** Il commento che avevo scritto
   diceva 4,52 e lo aveva calcolato a mano. `contrasto-dom.mjs` misura in pagina, ed è per questo
   che esiste. Il bianco sopra quel mauve starebbe a 3,84 — peggio — quindi la banda non si può
   rovesciare: si schiarisce, `#8A7474` → `#937D7D`, 4,67:1.
4. **Un contatore CSS non conta gli elementi che non si disegnano.** Il numerone del passo in B
   doveva contare i `<fieldset>`, ma un passo chiuso ha `hidden`, cioè `display: none`: il numero
   restava 1 per tutto il form. Si contano le **tacche fatte**, che sono tutte e cinque in
   pagina, e il valore si legge in `::after`, che nell'ordine del documento viene dopo i figli.
5. **Rigenerare i font sporca anche il file di A.** `varLib.instancer` riscrive `head.modified`,
   quindi Archivo risultava modificato di 124 byte. Il confronto con fontTools dice che il delta
   è **solo** il timestamp più il checksum: zero glifi, zero avanzamenti, `cmap` identica. Il
   file in repo è stato ripristinato, e la nota sta in testa a `scripts/genera-font.sh`: il modo
   di sapere se un font è cambiato davvero non è l'hash.
6. **Un difetto che ha visto il committente e non il collaudo, e vale più degli altri cinque.**
   La galleria di B si chiamava `.galleria`, che in `pagine.css` è la griglia a tre colonne
   della scheda progetto: le quattro colonne finivano in **435 px** invece di 1.400. Nessuno
   degli otto script l'ha preso perché non è contrasto, non è interlinea, non è overflow del
   documento (`scrollW` restava 1440) e non è peso: **è un nome**, e i nomi non si guardano.
   Adesso c'è `collisioni.mjs`, ed è stato provato rimettendo il difetto.
7. **Il bersaglio del marchio nella testata era 27 px (B) e 33 (C).** Passa WCAG 2.5.8, che
   chiede 24, ma in A lo stesso link arriva a 44 e la differenza non era una scelta. Portato a 44
   in tutte e due, e il padding non sposta il testo di un pixel.

### Verifiche a fine passata

| Prova | Esito |
|---|---|
| `npm run build` · `tsc --noEmit` · `eslint` | puliti |
| `contrasto-dom.mjs` | **123 coppie distinte su 8 rotte, zero sotto soglia** |
| `interlinee.mjs` | **1.020 testi che vanno a capo, zero sotto la soglia d'inchiostro** in B e C. I quattro difetti dichiarati di A restano dichiarati e vengono stampati a parte |
| `sweep.mjs` | `sfora: []` a 1440 su tutte e tre; `scrollW == clientW` a 390 su tutte e tre |
| `nojs-rotte.mjs` | testo reso, `passiVisibili: 5`, `passo 1 di 5` e form inviabile su tutte e tre; `overflow: false` su sei rotte |
| `peso.mjs` | A 292 KB / 17 richieste · B 322 / 19 · C 304 / 17 · `/servizi/strutture` 218 / 12. Il mirino CAD **non fa crescere il bundle**: B resta a 149 KB di JavaScript, come C che non lo ha. Il video della hero solo in `dopo` |
| «A non si tocca» | `<main>` di `/` **byte-identico** a `HEAD`: 57.492 byte, `sha256 537dd84a…` |
| `cursore.mjs` *(nuovo)* | **21 prove su 21**: quattro stati del mirino e cinque degradi. La prova che conta è che **dove il mirino non c'è, il puntatore di sistema è tornato** |
| `collisioni.mjs` *(nuovo)* | nessuna classe di B o C stilata da un foglio condiviso fuori dai sette prefissi dichiarati. Provato rimettendo il difetto: esce con codice 1 e lo nomina |
| `soglie.py` | rigenerato per i quattro font nuovi; `interlinee.mjs` verifica le impronte e si ferma se non corrispondono |

### Cosa resta aperto

- **La decisione n. 1**, che è bloccante: quale delle tre home. Le altre due si cancellano.
- **La licenza di General Sans** (n. 48): non è OFL come il resto del repo. Da confermare al
  cliente prima del go-live.
- **Il debito del preload**: `/opzione-b` e `/opzione-c` scaricano i 40 KB di Archivo che non
  usano, perché Turbopack fonde i `@font-face` dei tre temi in un chunk solo. Sparisce alla
  fase 5 con le rotte non scelte.
- I quattro difetti d'interlinea **dichiarati** di A: la correzione è di due righe
  (`--regolo-lh-h1` da 0,86 a 0,92 più un `line-height: 0.86` esplicito sulla hero) e non si fa
  qui perché non è una passata su A.
- Le schermate di confronto in `kit/reference/_dopo/` sono state rifatte con le tre opzioni
  nuove.

## Fase 3 quinquies (1/2) — tre opzioni, e la differenza è di meccanismo (08/09/2026)

> **Superata dalla 2/2**, che sta qui sopra: le due proposte alternative descritte in questa
> sezione — «la fonderia» e «la monografia» — non esistono più. Resta perché il metodo e i
> difetti trovati valgono ancora, e perché la decisione n. 46 si legge solo sapendo da dove
> viene.

Il committente ha detto due cose che chiudono due passate: *«scendi a 3 opzioni»* e *«per adesso
solo l'opzione A la reputo valida»*. E ne ha dette altre nove, che sono il resto della passata.

### Il numero che conta ha cambiato bersaglio

Per tre passate il criterio è stato **classi CSS condivise, misurate sul build**, e per tre
passate la correzione ha toccato un *valore* dove serviva un *meccanismo*:

| | prima | dopo | correzione tentata |
|---|---|---|---|
| C e D vs B, prima passata | — | 97 % | (erano B ricolorata due volte) |
| C e D vs B, fase 3 quater | 97 % | C 94 % · D 90 % | palette e carattere |
| **C↔D, questa passata** | **C 94 % · D 91 %** | **C 73 % · D 61 %** | **tre gusci, tre fogli, tre funnel** |

Con B fuori, il 90-94 % con B non è più un difetto: è un file cancellato. Il numero che conta da
adesso è **C↔D**, e la parte scesa è quella strutturale. Sotto la piega il markup di C e D
differiva di **12 righe su 522**; adesso non condividono nemmeno un blocco.

Il pavimento è ~60 %, ed è il chrome che *deve* restare condiviso: brief, footer, segnaposto,
bottoni. `D dentro C 61 %` è praticamente il pavimento.

### Le tre proposte, in una frase ciascuna

- **A** «Lo studio» — un foglio stampato: non si muove, dichiara. **Non toccata.**
- **C** «La fonderia» — **lo scorrimento è il meccanismo**: la fotografia è una scheggia che si
  apre, una lastra per finestra, il vuoto in mezzo, il volume che si separa.
- **D** «La monografia» — un **fascicolo rilegato**: frontespizio, folio, `fig. n`, colophon.
  Non si muove niente.

### L'errore mio più grosso della passata, e come si è visto

Il committente ha mandato tre schermate di `studio-foundry.sujen.co` prese **durante lo
scorrimento**. Io avevo guardato `1440-hero.jpeg`, che è **il fotogramma finale**, e costruito
quello: la fotografia partiva già a piena finestra dal primo frame. Copiato il risultato, buttato
il gesto.

Le prove erano **già nel repo** e non le avevo lette come sequenza: `1440-meta-30.jpeg` (carta
quasi vuota, le fotografie ridotte a schegge di 99-303 px), `1440-meta-55.jpeg` (una scheggia che
entra dal basso crescendo), `1440-intera.jpeg` (17.503 px di altezza, di cui **l'84 % vuoto**).
La lezione è metodologica e vale oltre questa passata: **una cattura a pagina intera di un sito
con gesti allo scorrimento è inservibile come inventario** — prende gli elementi a opacità 0 e a
maschera chiusa. Chi ne ha bisogno ricattura a passi di una schermata.

### Le undici richieste, e dove sono finite

| | Chiesto | Fatto |
|---|---|---|
| 1 | «scendi a 3 opzioni», B esce | rotta, tema (246 righe), `tema-b.ts`, il woff2 di Anybody, `campi.css` (45 KB), `temi-cd.css` (22 KB), `<Parola>`, `HeroDomanda`, `Numeri`, i quattro rami di variante, `nojs.mjs`. CSS non minificato: **130 KB → 89** |
| 2 | «l'opzione A non si tocca» | verificato con un'impronta, non con una promessa: il `<main>` reso di `/`, `/studio` e `/servizi/strutture`. Cambia di **53 byte**, ed è **una riga** — il link «B» nella barra della proposta. Diff, non deduzione |
| 3 | il funnel può divergere | **tre funnel**: A smistamento + «passo 1 di 5» · C niente sopra la piega + «passo 1 di 5» · D **l'indice che è il passo 1** + «passo 2 di 5», zero JavaScript |
| 4 | «molto meno copy e più media» | corpo misurato: **C 7.139 → 2.029** (−72 %) · **D 7.323 → 3.450** (−53 %). A resta 6.593 |
| 5 | «font più display e allargato» | **Anybody Wide** `wdth 150 / wght 900` per il masthead di D, 11,6 KB — **7,8 KB meno** del file che è uscito. E i due display si calcolano sull'**avanzamento misurato** del carattere, non su un moltiplicatore |
| 6 | «le interlinee che si sovrappongono» | la soglia è **l'inchiostro, per stringa**, non la scatola di riga né una categoria. `soglie.py` + `interlinee.mjs`: **zero difetti in C e D** su 902 testi che vanno a capo |
| 7 | lorem ipsum al posto di `[[DA CLIENTE]]` | in C e D, **con la lista della spesa dall'altro lato**: `data-chiede` + `scripts/segnaposto.mjs`. 61 richieste su 17 rotte, di cui **29 solo dentro un attributo** |
| 8 | la scheggia che si apre allo scroll | fatta e collaudata (`colata.mjs`). Zero byte di JavaScript, e funziona **anche a JS spento** |
| 9 | «più istituzionale editorial artigiano» | D da «La casa» a «La monografia»: frontespizio, folio, occhiello corrente, `fig. n`, colophon con una riga scritta a mano |
| 10 | «non ha senso la regola niente 3D» | il volume di C in **WebGL grezzo, ~5 KB** invece dei ~130 di `three.js`. Degrada su tre livelli |
| 11 | niente push | nessun push |

### Difetti trovati misurando, che nessuno aveva visto

Sono la parte che vale la pena rileggere, perché non erano nell'elenco:

1. **C e D restavano senza apparato grafico.** Il terminatore obliquo a 45° di A sta in una
   regola **non isolata per tema** (`sezioni.css`, `.quota > *::before`) e l'unico override viveva
   in `.quota-registro`, morto con B: C e D avrebbero portato la firma di A. Ognuna ha adesso il
   suo — la riga di metadati ai due estremi, la didascalia numerata.
2. **La testata di C era posizionata su una misura di un altro blocco** (`top: 44px`, la barra
   della proposta a 1440). A 390 la barra manda a capo e diventa 150 px: la testata **non si
   vedeva**.
3. **Il claim delle due hero era tagliato a documento fermo.** Il palco comincia 120 px sotto il
   bordo a 1440 e **226 a 390**: gli ultimi 226 px di una `100svh` stanno sotto la piega. Non era
   nuovo — si vede in `_dopo/CD-390.jpeg`.
4. **`clip-path` taglia i discendenti a qualunque posizione**, quindi clippare il segnaposto
   intero faceva **sparire** la targhetta della specifica e la riga di licenza: contro la
   decisione n. 27 (b). Il ritaglio sta sul media, la dichiarazione sotto la scheggia.
5. **La `contain` di una view-timeline non comincia a scroll 0** se sopra c'è qualcosa in flusso:
   fuori range le property tornano all'`initial-value`, che è lo stato finito — cioè si vedeva
   esattamente il difetto da riparare. Ora `scroll(root)` con una range in unità assolute.
6. **Il footer scuro di C:** spacchettando i fogli ho perso il blocco che ridichiara i token sul
   piano scuro, e il collaudo l'ha ritrovato in due righe — `3,02:1` su una voce e **`1:1`
   sull'annotazione**, nero su nero. È la trappola di `@theme inline` che risolve i `var()` sulla
   radice una volta sola.
7. **La media query della testata era rimasta puntata al nome vecchio** della classe: a 390 la
   `<details>` finiva in una colonna implicita e sfondava di 8 px.
8. **`reduced-motion` globale non spegne una timeline di scorrimento**: la regola mette
   `animation-duration: 0.01ms !important`, e su una timeline progressiva la durata è ignorata.
   Una regola che sembra spegnere tutto e non spegne questo è peggio di nessuna regola.

### Misure a fine passata

| Cosa | Esito |
|---|---|
| `next build` · `tsc --noEmit` · `eslint` | puliti |
| Contrasto sul DOM vero, 8 rotte | **102 coppie distinte, zero sotto soglia** |
| Interlinee, 8 rotte × 2 larghezze, soglia per stringa | **zero in C e D** su 902 testi che vanno a capo |
| Sfondamento orizzontale a 320 · 390 · 768 · 1440 | **nessuno** su nessuna rotta (il vecchio `table.scheda` a 320 è uscito con la tabella) |
| Senza JavaScript | A e C «passo 1 di 5», **D «passo 2 di 5»** — l'indice propaga la scelta senza una riga di JS |
| La colata | apertura monotona 0 → 1 a 1440 e 390, marchio e targhetta visibili a **ogni** quota, `reduced-motion` sul fotogramma finito |
| Copy (corpo) | A 6.593 · **C 2.029** (≤ 2.500) · **D 3.450** (≤ 3.500) |
| Classi condivise | **C dentro D 73 % · D dentro C 61 %** (erano 94 % e 91 %) |
| L'opzione A | **non toccata**: impronta del `<main>` verificata. Tre delta in tutto, tutti rimozioni di avanzi di B, tutti senza effetto visivo — il link «B» nella barra, l'attributo `data-piano="foglio"` e la classe `brief-tacche-misura`, che non hanno **nessuna regola CSS** in tutto il repo. L'esploso SVG è **byte-identico** (11.540 B), che è la prova che il refactor della geometria non l'ha sfiorato |
| Peso sul filo a 390 (build di produzione) | A 324 KB · **C 289** · **D 348** · servizio 214. Richieste 18 · 16 · 20 · 12, contro un limite di 40 |
| **Il volume in WebGL, quanto costa** | **+2 KB di JavaScript misurati** su `/opzione-c` (152 contro i 150 di A), contro un budget di 180 KB e i ~130 che avrebbe voluto `three.js`. La stima dichiarata nella decisione n. 44 era ~5 KB: il numero vero è più basso |
| Font per rotta | A 40 KB · C 91 · D 120. Lo scarto è il **debito del preload**, non un peso nuovo: ogni rotta di proposta scarica anche l'Archivo di A, che non usa. Sparisce alla fase 5 |

### Cosa resta aperto

- **Quattro difetti d'interlinea in A**, misurati e **fuori perimetro** («A non si tocca»): gli
  `h1` di `/studio`, `/contatti` e della scheda progetto vanno a capo a interlinea 0,86 contro
  una soglia di 0,90-0,92. La correzione è **di due righe** — `--regolo-lh-h1` da 0,86 a 0,92,
  più un `line-height: 0.86` esplicito su `.hero-payoff`, che è composto a mano e approvato — e
  la decide chi decide su A. Sono elencati in `ATTESI_IN_A` dentro `interlinee.mjs`, che avvisa
  se un giorno sparissero da soli.
- **Lighthouse e il peso non sono stati rimisurati** su C e D dopo la ricomposizione. `peso.mjs`
  gira, ma il numero di riferimento è quello di A: va rifatto prima della fase 8. Il volume in
  WebGL aggiunge ~5 KB gz di JavaScript su `/opzione-c` e va verificato sul filo.
- **Il debito del preload** resta: le due rotte di proposta scaricano l'Archivo di A che non
  usano, perché Turbopack fonde i `@font-face` dei temi in un chunk solo. Sparisce alla fase 5
  con le rotte non scelte.
- **La barra della proposta** è ancora in flusso sopra la hero, e il suo ingombro cambia con la
  larghezza (44 px a 1440, 150 a 390): tre valori nel CSS di C e D ne tengono conto. Sparisce
  alla fase 5 e quei tre valori diventano semplicemente aria.

## Fase 3 quater — C e D rifatte sulle due reference indicate (08/09/2026)

FT ha guardato le due proposte nuove e ha detto: *«non hanno senso le opzioni C e D»*. La
diagnosi non è un'impressione, è la stessa misura della 3 ter presa sul build: **C e D
condividevano il 97 % delle classi con B**. Erano **B ricolorata due volte**, cioè l'errore della
n. 28 ripetuto un livello più su — si era corretto un *valore* (palette e carattere) dove serviva
un *meccanismo*. L'argomento con cui la n. 36 lo difendeva («contenuto identico è la condizione
perché il cliente giudichi la lingua visiva») è giusto in astratto e sbagliato per quello che
serve qui: **quattro schede che in miniatura si somigliano non sono quattro proposte.**

Il committente ha chiuso la questione dando due indirizzi — `studio-foundry.sujen.co` e
`storeyarchitecture.co.uk` — ed erano **già tutti e due in `kit/reference/`**, catturati a 1440 e
a 390 e misurati nel browser. Storey è anche l'unica delle quattro già nel tier A di `SCHEDA.md`.
Tensione da dichiarare: Studio Foundry era **uscita** dal tier A alla 3 bis con una motivazione
scritta (i suoi token misurati sono i cluster 1 e 5). Rientra perché l'ha scelta il committente
guardandola, e la skill `sito-design` lo prevede alla lettera.

### Il gesto che cambia: che cos'è la prima schermata

Non una tinta. C e D aprono tutte e due con una **fotografia a piena finestra e il testo sopra** —
che né A né B hanno, perché A mette la foto accanto al testo e B apre con una domanda su fondo
nero — e ci mettono sopra **l'opposto**:

```
C «La fonderia»                          D «La casa»
┌──────────────────────────────┐         ┌──────────────────────────────┐
│ REGOLO · menu centrato · CTA │         │ regolo · menu centrato · CTA │
│                              │         │                              │
│ REGOLO STP  ← 194 px a 1440, │         │            (foto)            │
│   serif 900, da bordo a bordo│         │                              │
│           (foto)             │         │ ▓▓ ░░ ░░ ░░ ░░  ← 5 segmenti │
│                              │         │ Uno studio di ingegneria…    │
│ Progettiamo e dirigiamo.     │         │ progetto arch. · strutt. · … │
│ Dal disegno al cantiere.     │         │ ( Raccontaci il progetto )   │
└──────────────────────────────┘         └──────────────────────────────┘
il tipo è il soggetto                    il tipo si toglie di mezzo
```

### Blocco → reference → cosa ho preso → quale cluster NON uso

| Blocco | Reference | Cosa ho preso | Cluster che NON uso | Cosa c'è al suo posto |
|---|---|---|---|---|
| **Hero C** ★ | `studio-foundry/1440-hero` | la fotografia a **100 svh** e il marchio che le passa sopra **da bordo a bordo**: il corpo non è un gradino di scala ma una funzione della finestra e delle 10 lettere di `REGOLO STP` — `(100vw − 2×margine)/10 × 1,44`, cioè **194 px a 1440** e proporzionalmente a ogni altra larghezza | **4** il riquadro: niente card, niente fondo, niente ombra sotto il testo · **5** l'occhiello sopra il claim | in questo sistema l'`h1` **è il nome dello studio**, non una frase — e su un sito che è il secondo contatto, il nome che il passaparola ha pronunciato è esattamente la prima cosa da vedere. La frase arriva dopo, in basso, in lineare |
| **Hero D** ★ | `storey/1440-hero` (tier A, misurata) | il contrario: **niente tipo grande**. Marchio piccolo, menu piccolo, e in basso a sinistra un paragrafo in lineare leggero con sopra **una barra a cinque segmenti**, il primo pieno. Il vuoto sopra il paragrafo è **disuguale di proposito** — nella reference l'immagine parte a 500 px e il testo a 440, con 400 px di nero sopra che non fanno niente | **5** i metadati uniti da puntini con l'occhiello sopra · la quota di A: qui **non ci sono terminatori obliqui**, non è una misura | i cinque segmenti portano i **cinque ruoli firmabili** (`RUOLI.length`, contati dal repo) e sono un **avanzamento**, non una quota. L'elenco in chiaro sta sotto, in mono a **−0,1em**, e il disegno è `aria-hidden`: sentirlo due volte è rumore |
| **La testata** (C e D) | Studio Foundry · Storey | menu **centrato** sopra la fotografia, marchio a sinistra, pastiglia a destra | **5** il logotipo spaziato | il velo sotto la testata è un **`background-color` vero** e non un gradiente, perché il collaudo del contrasto sa misurare solo quello: caso peggiore calcolato a mano (foto bianca pura → `#575757`), **6,36:1** in C e **6,19:1** in D. Il gradiente morbido sta su un `::after` dichiarato decorativo (decisione n. 38) |
| **Il carattere** | `_provini/` | **C: Elsie 900** per display e titoli (11.176 B) + Inter per il corpo + Plex Mono per le micro-etichette. **D: Inter sola** per display e corpo, Plex Mono per le annotazioni, e **Caveat** per una riga sola | **1** il serif display su carta calda *come default* — qui è una scelta del committente su una schermata, non una ricaduta | i tre sistemi tipografici non si scambiano in miniatura: B è un grottesco meccanico, C è un serif ad altissimo contrasto, D è un lineare neutro con l'interlinea a **1,0** e la spaziatura negativa **anche sulle maiuscole** (−0,03em sul display) — i due gesti misurati su Storey |
| **Le fotografie** (C) | Studio Foundry | il ritaglio **non rettangolare**: `clip-path` a poligono angolare su copertine, ritratti e lastra, con la diagonale che si specchia sulle schede pari | **4** la card con raggio e ombra | l'unico raggio del tema sta sulle pastiglie, e la fotografia non è mai in cornice |
| **Il vuoto** (D) | Storey (misurato) | il **vuoto disuguale** come regola, non come padding: dopo una lastra il campo successivo respira **2,2×**, `#persone` **2,8×**, e fra i blocchi **non c'è nessun filetto** perché nella reference non ce ne sono | la voce di casa «lo stesso padding fra tutti i blocchi» | i **contatori tono su tono** (`--regolo-tono #d4d4d4`, 1,48:1) fanno atmosfera dietro ogni campo: sono `aria-hidden` **e** `data-decorativo`, cioè un contratto — un elemento che porta informazione non può avere quell'attributo |
| **Il footer** (D) | Storey | una riga scritta a mano — «Grazie di essere arrivato fin qui.» — in **Caveat 500** | **5** la firma calligrafica come decorazione sparsa | è **una sola**, in un posto solo, e solo in D. 28.048 B per un gesto che in call si vede: è il prezzo dichiarato |
| **Il meccanismo** | — | **non si tocca**: il registro è ancora il passo 1 del brief, la scelta si propaga fino al form con `form="brief-form"` e `:has()`, zero byte di JavaScript | — | in C e in D il registro sta **sotto la piega**: sopra c'è il manifesto, sotto comincia il lavoro. È la stessa scelta delle due reference, che sopra la piega non chiedono niente |

### Il criterio di accettazione, e come è andato davvero

Lo stesso della n. 28 — **classi condivise misurate sul build**, non un'impressione:

| | prima | dopo | |
|---|---|---|---|
| C vs B | 97 % | **94 %** | −3 punti |
| D vs B | 97 % | **90 %** | −7 punti |

**Non è un risultato pieno, e va detto come sta.** Le prime schermate e i tre sistemi tipografici
sono tre siti diversi — quello si vede in una miniatura al 25 %, che era il test. **Sotto la
piega no**: C e D riusano ancora `Numeri`, `Servizi`, `ComeLavoriamo`, `Progetti`, `PrimaDopo` e
`Persone` di B, vestiti dal tema (ritagli angolari in C, contatori e vuoto disuguale in D) ma
**non ricomposti**. Il lavoro che resta è ricomporre quei blocchi, non ricolorarli.

### Verifiche fatte

| Cosa | Esito |
|---|---|
| Contrasto misurato sul DOM reale | **A+B 89 coppie · C+D 72 coppie · zero sotto soglia** |
| Sfondamento orizzontale a 390, 768, 1440 | nessuno su nessuna delle quattro rotte |
| `next build` · `tsc --noEmit` · `eslint` | puliti |
| L'opzione A | **non toccata**: nessun token, nessun componente suo, nessun `if` sul tema nel markup |

### Cosa resta aperto

- **I blocchi sotto la piega di C e D**, come sopra. È il residuo dichiarato, non un difetto
  scoperto dopo.
- Il collaudo completo (Lighthouse sulle quattro rotte, prova senza JS su C e D, mobile reale)
  **non è stato rifatto** per C e D: il committente ha chiesto una demo pronta *a livello di
  design* per una pre-sales, non il gate della fase 8. Va rifatto prima di considerarle finite.
- I debiti di font restano quelli della 3 ter (le rotte di proposta scaricano l'Archivo di A per
  via del chunk unico di Turbopack): spariscono alla fase 5 con le tre rotte non scelte.

## Fase 3 ter — l'opzione B rifatta per meccanismo (08/09/2026)

> **Storia.** L'opzione B è uscita dal repo alla fase 3 quinquies (`DECISIONI.md` n. 39). Questa
> sezione si tiene perché il **metodo** che descrive è quello che ha funzionato tre volte — la
> diagnosi in cifre prese sul build, non in impressioni — e perché due dei suoi meccanismi sono
> sopravvissuti a lei: il registro che *è* il passo 1 del brief (oggi l'indice di D) e il
> prima/dopo che si apre da sé senza JavaScript.

FT ha guardato B e ha detto che non gli piaceva. Aveva ragione, e la ragione era **misurabile**:
non era una questione di gusto, era che B non era una direzione diversa da A — era **A con il
negativo**.

### La diagnosi, in cinque cifre prese sul build

| | prima | dopo |
|---|---|---|
| classi CSS distinte rese da B, di quelle che rende anche A | **123 su 165 → 74,5 %** | **101 su 162 → 62,3 %** |
| markup di B che è chrome condiviso (header + brief + footer) | **26,9 KB su 51,7 → 52,0 %** | 27,3 KB su 132,3 → **20,6 %** |
| `SiteHeader` reso dalle due home | **1.343 byte, diff 0 righe** | due componenti diversi |
| il blocco brief | **267 elementi, 6 righe di diff** | il passo 1 non c'è: è la hero |
| token con lo **stesso identico valore** nei due temi | **42 su 98** | 39 su 95, e **nessuno di impaginazione** |

I 42 token uguali erano il punto: fra loro c'erano `--regolo-passo-corto/normale/largo`,
`--regolo-margine`, `--regolo-gutter`, `--regolo-wrap`, `--regolo-colonne`. *L'intero sistema di
impaginazione era byte-identico nei due temi.* Finché è così, qualunque cosa si cambi produce una
terza colorazione della stessa pagina — che è l'errore già fatto due volte (prima il grigio
medio, poi l'inversione a nero).

E la prova peggiore non era a 1440, era **a 390**: le due hero condividevano la **stessa identica
striscia di quota**, stesse cinque parole, stesso ordine, stessi terminatori obliqui, stessa
altezza. Non «simile»: lo stesso oggetto. Sta in `kit/reference/_prima/3bis-B-390-hero.jpeg`.

### Come si è deciso: quattro direzioni, dodici giudizi, un confronto

Quattro direzioni indipendenti scritte dalle stesse prove — la scheda tecnica (AS), il disegno al
posto della fotografia (Kononenko), la linea di quota come struttura (Dieste), la pagina che
risponde — **dodici giudizi**, tre lenti per direzione (anti-default, differenza da A per
meccanismo, brief e fattibilità), e un confronto finale che le vedeva tutte.

La parte che è servita di più non è chi ha vinto: è **quello che tutte e quattro hanno sbagliato
allo stesso modo**. Se quattro direzioni indipendenti fanno la stessa scelta, quella scelta non è
una scelta: è la mediana del modello. Sette casi, tutti corretti:

| # | Cosa facevano tutte e quattro | Cosa c'è al suo posto |
|---|---|---|
| 1 | toglievano **volti e opere** dalla home di B | la fotografia resta e cambia ruolo (decisione n. 33). Il campo ritratto vuoto è l'unico segnaposto della home che fa un lavoro vero: è la lista della spesa che fa arrivare le foto |
| 2 | mettevano la **tabella AS sui progetti**, che ha **zero righe** e cinque colonne su sette `[[DA CLIENTE]]` — e proponevano di «mostrare `/progetti`», che sta in `app/(a)` e si renderizza con Archivo su carta bianca | la tabella va **dove i dati ci sono**: i sei percorsi (`.scheda`) e le cinque fasi. I progetti restano campi dichiarati con la copertina |
| 3 | spendevano l'apertura sulle animazioni in una **rivelazione allo scorrimento** | decisione n. 32: in B il movimento è **solo la risposta a un'azione**. Una eccezione, e ripara un difetto |
| 4 | sceglievano il carattere **per genere** (due Bitter, due Chivo + un serif) | decisione n. 30: si sceglie sul **Δ x/cap**. Bitter, la mossa ovvia, è *più vicino* ad Archivo di quanto lo sia Chivo |
| 5 | **rigonfiavano l'apparato** appena potato: tredici filetti a piena larghezza sopra i titoli, sette intestazioni ancorate, otto indici di campo | l'apparato di B è **più piccolo** di quello di A, non più grande: in una pagina densa ogni segno ripetuto diventa fondo. In B un filetto esiste solo se delimita un piano o porta uno stato |
| 6 | lasciavano **`BriefForm` identico** e lo vestivano col CSS — cioè l'ultima schermata delle due proposte restava la stessa in tutte e quattro | il brief si è fatto **per secondo**, non per ultimo: 30 righe su 559, zero righe di logica |
| 7 | non sapevano che **B è una pagina sola** | progetti, servizi, studio, contatti e le legali stanno tutte in `app/(a)`: alla fase 5 la rotta superstite eredita le pagine interne di A qualunque proposta vinca |

### Il meccanismo: **la pagina risponde**

A è un foglio stampato: dichiara, sempre uguale a chiunque. B è uno **strumento**. Le sei righe
della hero sono `radio` con `name="intervento"` e `form="brief-form"`, cioè membri del form che
sta cinquemila pixel più giù. Scegliendo:

- si apre il pannello del percorso;
- la riga corrispondente della **scheda dei sei percorsi** resta a inchiostro pieno e le altre
  cinque scendono al pavimento di attenuazione (l'opacità come gerarchia, AS misurato);
- la **riga di lettura del brief** scrive la risposta;
- e il brief comincia a **«passo 2 di 5»**.

**Zero byte di JavaScript**, verificato a JS spento. In A il brief comincia a «passo 1 di 5»; in B
a 2, perché la prima domanda l'hai già risposta nella prima schermata. **A non lo può fare per
costruzione**: non ha una domanda in hero, non ha uno stato da propagare.

### Blocco → reference → cosa ho preso → quale cluster NON uso

| Blocco | Reference | Cosa ho preso | Cluster che NON uso | Cosa c'è al suo posto |
|---|---|---|---|---|
| **Il guscio** (`components/campo/Campo.tsx`) | Kononenko (`1440-meta-16`: l'etichetta nel margine vuoto a x≈417, la tabella a x=493 = 34,2 %) · Storey (il vuoto disuguale) | il documento a due colonne: margine di classificazione sulla tavola, contenuto sul foglio. **Nessun ritmo verticale**: `--regolo-appeso` 12 px, e lo spazio fra due campi è quello che il contenuto occupa | la voce di casa «lo stesso padding fra tutti i blocchi» — che i tre passi garantivano identici nei due temi · **4** gli otto fogli bianchi su un fondo, cioè otto card | intervalli disuguali **per costruzione**, un solo filetto di confine, e **un foglio solo**: una classe, non una lista di otto selettori da ricordare a mano |
| **La testata** (`cartiglio`) | Kononenko (il menu-frase, che resta di A) · Pelizzari (i metadati ai due estremi) | tre celle sulla stessa griglia dei campi: nome nel margine, sede al bordo del foglio, menu al bordo destro. **Niente virgole** e **non sticky** | **5** il logotipo spaziato · il menu-frase, che è il gesto di A e non si divide in due | la testata di un documento non ti segue mentre lo leggi: restituisce la prima schermata al contenuto, e su telefono la CTA resta nella barra fissa |
| **Hero B** | AS (l'indice) · le sei risposte del brief | sei righe di registro che **sono** il passo 1 del brief; il pannello si apre come un record, senza bordo né fondo | **4** le card · **5** l'occhiello · e la `01…05` come chiave di riga: cinque alternative non hanno un primo e un ultimo | l'opacità come gerarchia più un filetto che porta uno **stato** — e finché non si sceglie **non si attenua niente** |
| **Numeri** | Storey · AS | quattro celle sul foglio, il trattino finché il dato non arriva | **4** quattro card con bordo | la nota va **nel margine**: è un'annotazione a margine, che è letteralmente il posto suo |
| **Sei percorsi** ★ | **AS `1440-meta-datasheet`** (7 colonne, 25 righe, passo 27,5 px, **nessun filetto fra le righe**) | la **tabella vera**, ed è il ramo del bivio che B doveva prendere e non aveva mai preso. Le colonne sono tre perché tre sono i dati che esistono | **3** il broadsheet · la colonna «ruolo firmabile» del primo schizzo, che avrebbe richiesto una mappa servizio → ruolo che nel repo **non esiste** | la riga **risponde alla hero**; la cella vuota del sesto servizio resta vuota — AS spedisce la tabella **con i buchi** invece di riempirli |
| **Come lavoriamo** | Dieste `1440-meta-22` (la dimensione dice l'importanza) | il numero in **colonna a sinistra**, non sopra il titolo; le due fasi che il committente vive a corpo maggiore | **5** «FASE 01 —» sopra ogni titolo | qui la numerazione è **legittima**: cinque fasi sono una sequenza vera. È l'unico numero progressivo rimasto in B |
| **Progetti** | Pelizzari (la riga a tre tempi) · Kononenko (rapporti misti) | due schede con i dati duri, la copertina in 16/9 | **4** tre card identiche | i cinque dati restano `[[DA CLIENTE]]`, e il **ruolo** non si omette mai |
| **Prima / dopo** (wow) | Storey (l'immagine che sborda) | **l'unico campo `pieno`**: esce dal foglio e attraversa i due piani, perché lì il taglio *è* il contenuto | **4** la maniglia rotonda con l'ombra | e A non lo può avere: non ha due piani nella stessa banda |
| **Le persone** | Kononenko · Pelizzari (altezze disuguali) | quattro campi a quote verticali disuguali; il dato che conta è l'**abilitazione** | **4** quattro card uguali col ritratto tondo | `MediaEsempio` **non è montato** in `Persone`: il divieto della n. 27 (c) non dipende da una variabile d'ambiente che qualcuno può accendere |
| **Il brief** ★ | — | il passo 1 non è un `fieldset`: è una **riga di lettura** con «cambia», e la barra di avanzamento perde i terminatori obliqui | **5** l'ultima occorrenza del motivo di A dentro B | «passo 2 di 5», e la frase si dice in call |
| **Il carattere** | `_provini/provino-b2-1440.jpeg` | Anybody, scelto sul Δ x/cap (+14,6 %) e non sul genere | **1** il serif display · lo slab, che *misurato* è più vicino ad Archivo di Chivo | 19.488 byte, **−7,3 KB** su Chivo, e l'asse di larghezza istanziato via dentro il file |

### Misure a fine fase (build di produzione)

| Metrica | Obiettivo | `/` (A) | `/opzione-b` (B) | Esito |
|---|---|---|---|---|
| LCP mobile, Slow 4G + CPU 4× | < 2,0 s | **0,90 s** | **0,82 s** | OK — l'LCP resta testo (`.hero-lead`) |
| CLS | < 0,05 | 0,000 | **0,004** | OK |
| Peso fino a `load` | < 1,2 MB | 285 KB | **268 KB** | OK |
| JS al primo caricamento | < 180 KB gz | 150 KB | **150 KB** | OK — **nessuna libreria di animazione**: il meccanismo è `:has()` |
| Richieste fino a `load` | < 40 | 17 | **15** | OK |
| Font per rotta | — | 40,7 KB | **59 KB** (19 Anybody + 40 Archivo che non usa) | il debito del preload, vedi sotto |
| **Contrasto** | AA | **75 coppie distinte** su sette rotte, **zero sotto soglia** | | OK |
| Overflow orizzontale | zero | `sfora: []` a 1440 e 390 | | OK (`path.[object` a 390 è il falso positivo noto) |
| Senza JavaScript | tutto si rende | ✓ | ✓ **e il meccanismo funziona**: pannello, attenuazione, riga di lettura, `FormData` | OK |
| Lighthouse mobile | ≥ 90 | **99 · 100 · 100 · 100** | **93 · 100 · 100 · 60** | OK; il 60 è il `noindex` dichiarato |

**Il debito del preload, adesso è misurato.** `/opzione-b` scarica i 40 KB di Archivo che non usa
— Turbopack fonde i `@font-face` dei due temi in un chunk solo e Next precarica quello che ci
trova — e **non precarica il proprio**. Sotto la simulazione di Lighthouse costa **1,1 s di LCP**
(3,1 s contro i 2,0 di A); con il preload di Anybody scende a 2,7 s. Non si può correggere senza
toccare A: mettere `preload: true` su Anybody fa precaricare Anybody **anche ad A** — verificato.
Sparisce alla fase 5 con la rotta non scelta. Con il metodo di misura del repo (throttling vero,
Slow 4G + CPU 4×) il numero è 0,82 s, cioè dentro il budget: le due misure rispondono a domande
diverse e vanno lette tutte e due.

### Il criterio di accettazione, e come è andato davvero

Era: **classi condivise sotto il 50 %**. Risultato: **74,5 % → 62,3 %**. Non è sotto la soglia, e
va detto perché — non per aggirarla:

delle 101 classi ancora condivise, **24 sono le interne del form del brief** (`brief-campo`,
`brief-opzione`, `brief-passo`…), la cui logica il piano dichiara intoccabile — 559 righe testate,
validazione, honeypot, rate limit, consenso; **~14 sono le interne del footer**; **~12 sono
utility Tailwind** (`mt-3`, `flex`, `text-h3`). Scendere sotto il 50 % da qui richiederebbe di
**rinominare** quelle classi, che sposterebbe il numero senza cambiare niente: cosmesi travestita
da meccanismo, cioè esattamente l'errore che il criterio esisteva per prendere.

Quello che il criterio doveva prendere l'ha preso: sono uscite tutte le classi **strutturali** —
il guscio (`.sezione`, `.passo-*`, `.testa-sezione`, `.corpo-sezione`), l'indice condiviso con lo
Smistamento di A (`.indice`, `.voce*`), il lockup della testata, l'apparato dell'asse. La prova
del grigio in forma severa — **la stessa carta bianca sotto tutte e due** — le lascia in piedi
come due proposte: un foglio continuo rientrato al 34,4 % contro blocchi a piena larghezza, campi
contigui contro tre passi verticali, una tabella dove A ha un elenco, e **uno stato che si
propaga**. La prova della miniatura al 25 % sta in `kit/reference/_dopo/PROVA-MINIATURA-25.jpeg`.

### Igiene chiusa strada facendo

- **`text-accent-text`** era usata in 7 file ma `--color-accent-text` non esiste più da due
  palette: in Tailwind v4 la classe non veniva generata affatto. Codice morto che fingeva una
  regola di stile che non c'era.
- **`Persone` aveva `variante: 'a' | 'b'`** — una prop che nomina il tema, cioè un `if` sul tema
  spostato di un livello, e cambiava solo il testo del titolo. Ora è `'ritratti' | 'registro'`, e
  la regola vale da qui in avanti: **nessuna variante porta il nome di una proposta.**
- **L'asse è uscito dal tema e dal repo**: `Sezione` aveva una prop `asse` che nessuno passava più
  e ~65 righe di CSS che disegnavano un filetto e poi spostavano ogni contenuto per non farsi
  tagliare da lui. In B l'asse **è diventato il bordo del foglio**: non c'è più niente da riparare.
- **La favicon mancava** (404 su `/favicon.ico`). Ora `app/(a)/icon.svg` e `app/(b)/icon.svg`:
  non un logo inventato — `CLAUDE.md` lo vieta — ma il **meccanismo di ciascuna proposta a 16 px**,
  la linea di quota per A e il foglio sulla tavola per B. Si rifanno quando arriva il marchio.

### Cosa resta aperto

- **Il debito del preload** (sopra): 40 KB e 1,1 s di LCP simulato su `/opzione-b`. Sparisce alla
  fase 5 con la rotta non scelta, e non è correggibile prima senza toccare A.
- **`apple-icon` e un `favicon.ico` di ripiego** per i client che lo chiedono comunque.
- **La answer capsule non è mai stata confermata dallo studio**, e due sue frasi sono promesse
  operative che finiscono nel `description` del JSON-LD. La riga bloccante è in
  `CONTENUTI-DA-CLIENTE.md`, e **non è compito nostro chiuderla**.
- Restano i rilievi minori dell'audit della 3 bis che non toccavano B: il ritmo a tre passi sulle
  rotte interne, i filetti fra le righe di alcuni elenchi in A, `.cta-contestuale`, i metadati
  uniti da «·», `.fasi-quota` che si chiama quota pur non essendolo.

## Fase 3 bis — il ridisegno sulle reference vere (07-08/09/2026)

La fase 3 era uscita generica per due motivi che la skill `sito-design` documenta: **nessuno
aveva aperto una reference** (`kit/reference/` era vuota, i prototipi erano una parafrasi) e i
token di partenza erano, voce per voce, i cluster n. 1 e n. 5 della lista di calibrazione.
Niente è stato revertato: i commit delle fasi 3 e 4 restano e si è costruito sopra.

### Cosa c'è adesso in `kit/reference/`

| Cartella | Cosa |
|---|---|
| `SCHEDA.md` | nove siti catturati a 1440 e a 390 (hero, sezione a metà, pagina intera), **guardati** uno per uno, con gli stili **misurati** nel browser: famiglie reali, corpi, interlinee, spaziature, larghezze di contenitore, passo fra le sezioni. Più la § 2, che mette le tre tier A a confronto meccanismo per meccanismo, e la § 0, che motiva le due modifiche al tier |
| `_provini/PROVINI.md` | **14 famiglie OFL** impaginate con le parole vere del brief ai corpi veri, pesate in KB, e tre prove decisive: i didoni sono il cluster 1, l'asse di larghezza è la leva del mobile, le cifre tabellari eliminano il monospace |
| `_prima/` · `_dopo/` | le due home prima e dopo, a 1440 e a 390 |
| `refero/DESIGN-structured.md` | un solo `DESIGN.md` editoriale non-SaaS, usato **solo** come evidenza su scala e spazio |

**Due modifiche al tier, decise in scheda.** *AS Associates entra nel tier A*: la sua home è un
indice di documenti con i conteggi, e `/projects` è una tabella di dati con la destinazione
d'uso in colonna — è il primo sito della lista in cui il lavoro è ordinato come lo ordina uno
studio tecnico, ed è esattamente il problema del campo «ruolo». *Studio Foundry esce dal tier A*:
è la reference che i prototipi avevano già parafrasato e i suoi token misurati sono i cluster
1 e 5; restano due suoi gesti, dichiarati. *Nabil Issa resta fuori*: il suo gesto è già nel
progetto via tier B, e quello che aggiungerebbe è cluster 2 + cluster 5 più un banner cookie.

### Il piano, in due passate

Quattro direzioni indipendenti scritte dalle stesse prove (la scala · la scheda tecnica · la
materia · la quota), **dodici giudizi** — tre lenti per direzione: anti-default, aderenza al
brief, fattibilità — e una sintesi che parte dalla vincente e innesta il meglio delle altre.
La seconda passata ha cambiato dodici parti del piano; le più grosse:

| Prima | Dopo | Perché |
|---|---|---|
| l'apparato di quota su 12 blocchi su 15 | **tre quote in tutto il sito**, con un test a tre condizioni | un motivo che sta ovunque non è una firma: è la texture della pagina, cioè la definizione del cluster 5 |
| «zero tinte sature» | **un accento solo, e il suo lavoro è dichiarare ciò che manca** | zero colore è la mossa di default per «serio», ed era misurabilmente sbagliata: lasciava i 62 segnaposto con due canali su tre e un fondo a 1,1:1 |
| griglie a 8 e a 14 colonne per distinguere i temi | **12 per entrambi**, e la differenza è l'**asse** | 8 e 14 non avevano nessuna prova nella cartella, e costavano i 28 `col-span-*` già scritti |
| il display a 176 px con il payoff potato in tre sostantivi | **132 px e il payoff intero** | la geometria stava potando il messaggio: se ne andava «dirigiamo», che è metà di quello che lo studio vende |
| la texture materica generata nella hero | **zero immagini generate in tutto il sito** | `TODO-MEDIA.md` nomina la hero per prima fra i blocchi dove non entra mai materiale generato |
| i nove token caldi dell'esploso «restano» | tre valori per le facce, e cinque retini alla parte 2/2 | erano il cluster 1 sopravvissuto intatto nel momento più guardato di A |

### Blocco → reference → cosa ho preso → quale cluster NON uso

Tutti i blocchi delle due home. Le colonne 4 e 5 sono la parte che conta.
«**Q:**» segna la quota **solo dove esiste**: in tutto il sito sono tre.

| Blocco | Reference | Cosa ho preso | Cluster che NON uso | Cosa c'è al suo posto |
|---|---|---|---|---|
| **Token, tutti** | SCHEDA § 2 · refero | nero **pieno** (3 reference su 4 misurano `rgb(0,0,0)`), gutter 24 e non 64, angoli vivi e zero ombre (unanime), interlinea come funzione del corpo, quattro spaziature **tutte negative** | **1** carta calda `#F4F2ED` · **5** nero tinto `#17171A`, `+0,14em` sulle etichette, mono per i dati | bianco puro (A) e un fondo a **luminanza media** (B, L 0,541 come refero); `#000000`; spaziatura negativa anche sulle maiuscole |
| **Caratteri** | `_provini/PROVINI.md` | Archivo (A, asse di larghezza) e Chivo (B), una famiglia per tema | **1** il serif display ad alto contrasto — e i due candidati «diversi» (Newsreader, Source Serif) sono lo stesso cluster con un altro nome | un grottesco con **asse di larghezza**, che a 390 px è l'unico modo di tenere il contrasto di scala. Niente monospace: `tabular-nums` |
| **Accento** | Storey · Kononenko · AS · refero · sbp | le tre tier A non hanno accento; refero lo scrive come divieto; sbp dimostra che l'arancio è il default di settore | **1** terracotta · **2** l'acido su fondo scuro · l'arancio `#E4572E` · e, dopo la n. 25, **l'indaco/viola**, che è il tell n. 1 di refero | **un** accento, sui **soli segnaposto**: `#123C7A`, l'inchiostro blu del tampone. Si consuma quando i contenuti arrivano |
| **Header** | Kononenko (`1440-hero`) | il menu è una **frase** con le virgole; «in tutto il sito non esiste un bottone»; il marchio è tipografia | **5** la pastiglia «Raccontaci il progetto →» in alto a destra, il logotipo a `+0,26em`, la freccia | **zero bottoni**: sopra la piega la CTA è una sola, quella della hero. Sotto il nome, la sede in chiaro |
| **Hero A** | Storey (vuoto disuguale) · Kononenko (titolo a due voci) · Dieste (**la quota con le parole appese**) · Studio Foundry (2 gesti) | il payoff **intero** su quattro righe a 132 px, le due metà a `wdth 100` e `wdth 75`; la quota da margine a margine; il campo foto che sborda a destra | **1** in pieno (crema + didone + riga in corsivo verde) · **5** l'occhiello unito da puntini, «→» su due bottoni | **Q: `5 ruoli`** — da `RUOLI.length`, elenco chiuso in `lib/contenuti/schema.ts`. È il dato che dice cosa sanno fare |
| **Hero B** | AS (l'indice) · Dieste (**l'asse verticale**) · Kononenko (l'etichetta nel margine vuoto) | cinque **righe di registro** a cavallo dell'asse; la riga scelta apre la **figura bianca** con 1 px di inchiostro | **4** le cinque card identiche con raggio 3 px, e il pannello scuro a tre colonne con la micro-etichetta mono sopra · **5** «SEZ. 01 — IL PUNTO DI PARTENZA» centrato fra due filetti | il filetto di riga **c'è** (ogni riga porta un radio: il confine del bersaglio è informazione), e `01…05` è una chiave d'archivio, non una sequenza |
| **Smistamento** (A) | AS (righe di indice) · Pelizzari (l'azione al bordo, il vuoto in mezzo) | cinque righe alte 60 px, il **ruolo firmabile** spinto in colonna 11-12 | **4** le cinque pastiglie identiche in fila · **5** l'occhiello, la freccia su ogni voce | righe di indice **con l'affordance**: ogni riga è un `<a>` a piena larghezza, sottolineata al passaggio. **Nessun conteggio**: gli elenchi di `lib/percorsi.ts` sono una nostra proposta, non un dato dello studio |
| **Numeri** (B) | Storey (il numerone tono su tono) · AS (l'opacità come gerarchia) | quattro celle **senza bordi fra loro** a destra dell'asse, cifra a `display` con `tnum` | **4** quattro card con bordo · **5** le unità in mono maiuscolo | il **trattino** resta finché il dato non arriva, in `line` invece che in `ink`: si legge come una casella da riempire. **Mai «128» qui**: l'etichetta dice «comuni in cui abbiamo lavorato», e quel numero lì sarebbe un dato vero che produce un'affermazione falsa |
| **Servizi / sei percorsi** | Kononenko + Pelizzari (titolo a due voci) · AS (quattro corpi, la tabella senza filetti) · sbp (solo l'impianto) | tre campi per riga: **esito** · **tecnicismo in seconda riga** · **ruolo firmabile** al bordo destro | **4** la griglia 3×2 di card con l'icona sopra · **5** sei occhielli, «Scopri →» | in **A nessun filetto** fra le righe (AS regge 25 righe con sette colonne senza); in **B** uno per riga, perché lì ogni riga porta anche «serve da te». Il sesto servizio non ha elenco: resta il segnaposto |
| **Come lavoriamo** | Dieste `1440-meta-22` (l'asse, le cose a cavallo a scale disuguali) | in **A** cinque fasi appese a un filetto con cinque tacche; in **B** a cavallo dell'asse verticale | **4** cinque card numerate · **5** `FASE 01 —` ripetuto cinque volte | qui la numerazione è **legittima** e la § 5 della skill la autorizza: è una sequenza vera (`lib/processo.ts`). E **la dimensione dice l'importanza**: le due fasi che il committente vive a `titolo`, le tre nostre a `sottotitolo` |
| **Progetti** | Pelizzari `1440-meta-42` (riga a tre tempi, colonne di altezza disuguale) · Kononenko (**rapporti misti nella stessa fila**) · AS (il ruolo in colonna) | in **A** tre segnaposto a rapporti **diversi** (16/10 · 3/4 · 4/3) e sfalsati; in **B** due schede con i dati duri **senza filetti fra le righe** | **4** tre card identiche 4/3, stesso raggio, ombra · **5** i metadati uniti da «·» | la riga a tre tempi porta **`luogo · ruolo · azione`**, non un «codice» — che non esiste in `lib/progetti.ts` e sarebbe un dato d'archivio inventato. E sopra tre rettangoli vuoti `codice · nome · vedi progetto` **è** un annuncio immobiliare; `luogo · direzione lavori · vedi progetto` è una credenziale |
| **Esploso** (wow A) | Storey (banda nera a taglio netto) · Kononenko `1440-meta-32` (**il disegno al posto della fotografia**) | banda `ink` a piena larghezza; **tre valori per le tre facce** (la faccia dice la luce) e **cinque retini per i cinque livelli** (il retino dice il livello); contorno in `carta` a 21:1 | **1** i nove token caldi (`involucro #e7e3da`, `finiture #f7f5f0`, `apertura #2f4a42`, una terra, un blu) · **4** l'esploso come illustrazione dentro una card | si legge **anche in bianco e nero**, e la legenda mostra i **retini** invece di pallini colorati. La decisione «il colore non porta informazione da solo» è rispettata meglio di prima: qui il colore non ne porta affatto. **Nessuna quota**: «5 livelli» si conta a vista |
| **Prima / dopo** (wow B) | Storey (l'immagine che sborda) · ecoLINEAR (la **lettura** numerica accanto al controllo) | il cursore taglia fra i **due piani**: la metà «stato attuale» è la tavola nera, quella «progetto» è il foglio bianco — taglio a **21:1**. Con i media di esempio dentro, ogni riga porta la propria targhetta piena, così il contrasto sotto il testo è un piano e non una fotografia | **4** la maniglia rotonda con l'ombra · **5** «PRIMA — dopo» in maiuscoletto | **è il blocco che rende B mostrabile oggi.** Prima erano due grigi a 1,17:1: un cursore che non rivelava niente. **Lettura, non quota**: `50 %` è il valore di un controllo, e si rende anche senza JavaScript |
| **Le persone** | Kononenko (la tabella con l'etichetta nel margine) · Pelizzari (altezze disuguali) | quattro campi a **quote verticali disuguali**; sotto il ritratto una piccola tabella: nome · ruolo · **abilitazione** | **4** quattro card uguali col ritratto tondo e l'ombra. E il divieto: **nessun ritratto generato** | il dato che conta è l'**abilitazione**, non la faccia, ed è quella che alla fase 6 finisce in `Person.hasCredential`. **Nessuna quota**: il solo numero sarebbe «4 caselle», che si leggerebbe «lo studio ha 4 persone» — un dato inventato |
| **Territorio** (A) | `lib/territorio.ts` · Kononenko · ecoLINEAR (la quota che porta un numero) | il perimetro vero a 1 px su `carta`; la sede come **croce di quota** | nessuna mappa a tile (un tile server è un terzo che vede l'IP) · niente pin a goccia | **Q: `128 comuni nell'autocomplete · FM 40, MC 55, AP 33`** — la sola quota con una fonte pubblica citabile. **L'annotazione dice cos'è**: le tre province dell'autocomplete del brief, non «dove abbiamo lavorato». `comuniServiti = []`: nessun comune acceso |
| **Brief** ★ | ecoLINEAR (la CTA prima della galleria) · Storey (il vuoto disuguale prima) · AS (una domanda per schermata) | **200 px di silenzio** davanti; in A l'**unica** banda che porta una scheda chiara; la barra di avanzamento ridisegnata come **linea di misura a cinque tacche** | **4** la scheda con l'ombra e il raggio · **1/5** in A era un blocco pieno color accento, cioè l'unica area grande di colore del sito | **Q: `passo n di 5`** — l'unica quota che si muove, perché l'unico posto dove la quantità cambia. Senza JS dice «passo 1 di 5», che è vero. Tutto il resto della fase 2 non si tocca: un solo form, radio col pallino, `<datalist>`, honeypot, niente CAPTCHA |
| **Footer** | Storey `1440-meta-52` (la schedina col piè a tre tempi) · Pelizzari (l'azione al bordo) | tre tempi: indirizzo · contatti · dati fiscali al bordo destro, il vuoto in mezzo. In **A** banda `ink` **saldata al brief**; in **B** la tavola continua e cambia solo un filetto in testa | **5** le quattro colonne di link con un occhiello sopra ognuna, i dati uniti da puntini, le icone social | il **telefono è il corpo più grande** del footer: la gerarchia racconta quella delle azioni. La mappa non è più un segnaposto ma un **ritaglio dello stesso SVG del territorio** con la croce sulla sede. In **B** il footer ospita la quota `128 comuni`, perché B non ha il blocco Territorio |
| **Barra CTA mobile** (B) | AS (la barra fissa piatta, etichette a peso disuguale) | tre celle a larghezza **disuguale** — 22 % · 29 % · 49 % — tre fogli bianchi con la tavola nelle fughe, solo testo | **4** tre pastiglie tonde galleggianti con l'ombra · **5** «→» | le larghezze dicono la priorità, e con metà barra ci sta «raccontaci il progetto» intero. La cella del WhatsApp resta un segnaposto dichiarato |
| **Segnaposto immagine** | ecoLINEAR (i **segni di registro**) · AS · Kononenko (il disegno dove la foto non c'è) | quattro **squadrette d'angolo** in `line` (4,61:1) e la **scheda di specifica** dentro: cosa manca *e in che formato* | **3** il tratteggio (A) e la carta millimetrata (B): due texture decorative su ogni blocco che dicono «disegno» e non dicono niente | il campo dice `2400 × 1650 px · AVIF · ≤ 250 KB`: legge «modulo in attesa», non «buco», e in call è la lista della spesa. È anche ciò che refero chiama *intentional placeholder* |
| **Segnaposto di testo** (62) | ecoLINEAR (l'annotazione come segno di stato) | i **tre canali** restano tutti e tre; cambia solo il colore | **zero accenti**, che sarebbe la mossa elegante e sbagliata: con la sola palette neutra i canali scendono a due e il fondo torna a 1,1:1 dalla carta | **è l'unico posto del sito dove c'è colore, e ha una data di scadenza.** Dentro una banda scura il token è vincolato al piano (`timbro-chiaro`, 10,07:1) |

### Misure a fine fase 2/2 (build di produzione, Slow 4G + CPU 4×, viewport 390)

Rifatte **dopo** l'inversione di B e dopo l'ingresso dei media di esempio: i numeri della
parte 1/2 non valgono più, perché la home adesso carica un poster, una fotografia e un video.

| Metrica | Obiettivo | `/` (A) | `/opzione-b` (B) | `/servizi/strutture` | Esito |
|---|---|---|---|---|---|
| LCP | < 2,0 s | **0,74 s** | — | — | OK. L'LCP resta **testo**: il display della hero |
| CLS | < 0,05 | **0,00** | — | — | OK |
| Peso fino a `load` | < 1,2 MB | **283 KB** | **254 KB** | **210 KB** | OK. In A ci sono 51 KB di immagini (poster 36 + prima copertina) |
| Video della hero | < 2,5 MB | **2,09 MB** | — | — | OK, e **fuori dal percorso critico**: parte a 194 ms, cioè dopo `load` (145 ms) |
| Immagine della hero (poster) | < 250 KB | **36 KB** | — | — | OK |
| JS al primo caricamento | < 180 KB gz | **150 KB** | 150 KB | 144 KB | +1 KB sulla parte 1/2: è `MediaEsempio`, l'unico componente client aggiunto |
| Richieste fino a `load` | < 40 | **17** (28 con il video e i prefetch) | 13 (20) | 12 (21) | OK |
| **Font per rotta** | — | **40,7 KB** | 67,7 KB | 40,7 KB | invariato |
| Documento HTML | — | 30 KB | 24 KB | 13 KB | dentro ci sono l'esploso coi retini, la mappa, i cinque pannelli di B e i 128 `<option>` |
| Lighthouse mobile | ≥ 90 | **100 · 100 · 100 · 100** (56 controlli, 0 falliti) | 100 · 100 · **60** · 100 (58 controlli, 1 fallito) | 100 · 100 · 100 · 100 | il 60 di B è il `noindex` dichiarato: è una rotta di proposta |
| **Contrasto** | AA | **72 coppie distinte** sulle sette rotte renderizzate, **zero sotto soglia** | | | OK, rimisurato dopo l'inversione: in B è cambiata ogni coppia |

**Il video non entra nel peso della pagina**, ed è una scelta di codice, non un'interpretazione
del budget: con l'attributo `autoplay` il browser ignora `preload="none"` e mette i 2,1 MB sul
percorso di caricamento — misurato, la home passava da 283 KB a 2,4 MB, cioè oltre il *limite*.
Il video parte quindi da `requestIdleCallback` (`components/MediaEsempio.tsx`), e a reggere
l'LCP c'è il poster da 36 KB.

Il debito del preload resta e si è **dimezzato**: `/opzione-b` scarica ancora i 40,7 KB di
Archivo che non usa, perché Turbopack fonde i `@font-face` dei due temi in un chunk solo e Next
precarica quello che ci trova. Prima erano 105 KB nella direzione opposta. Sparisce alla fase 5
con la rotta non scelta.

### Verifiche fatte a fine fase

| Controllo | Esito |
|---|---|
| **Senza JavaScript**, cinque rotte | tutto si rende: il brief è un solo form con i cinque `<fieldset>` visibili e «passo 1 di 5» in chiaro; in B **un solo pannello** visibile, quello scelto; il cursore del prima/dopo non c'è (sarebbe un controllo morto) ma la **lettura «50 %» sì**; nessun overflow orizzontale |
| **Contrasto AA** | **72 coppie distinte** di colore su sette rotte renderizzate, **zero sotto soglia** (`scratchpad/contrasto.mjs`, misurate sul DOM vero e non sui token). Rimisurate dopo l'inversione di B, dove **ogni coppia è cambiata**: il primo giro dava 11 difetti, fra cui il brief tutto bianco su bianco |
| **Overflow orizzontale** | zero a 1440, 390 e 320 su entrambe le home (`scrollWidth == clientWidth`) |
| **Bersagli tattili** | i link isolati e il lockup del marchio portati a 44 px sotto i 56 rem; i `radio` restano 18 px ma la loro `<label>` è 48 |
| **Lighthouse mobile** | 100 · 100 · 100 · 100 su `/`, su `/opzione-b` (tranne il SEO 60 del `noindex` dichiarato) e su `/servizi/strutture` |
| **L'asse di B non attraversa più nessun testo** | era il difetto visibile («sembra buggata»): 28 elementi tagliati, ora zero fuori dalle figure, davanti alle quali il filetto passa dietro |
| **`prefers-reduced-motion`** | il video della hero non viene reso affatto: al suo posto il poster come immagine. Non è nascosto in CSS — sarebbero 2 MB scaricati per chi ha chiesto meno movimento |
| **Bersaglio del menu su telefono** | era 36,3 × 44 px (largo quanto la parola). Ora **56 × 44** a 390 e a 320 |
| **Prima/dopo a 390 px** | le due didascalie non attraversano più il taglio: ognuna sta nella sua metà. Verificato che il `clip-path` continui a rivelare al 50 % del riquadro (la prima correzione, con `left: 50%`, tagliava al 75 %) |
| **Legenda dell'esploso a 390 px** | da due colonne da 192 e 150 px a una sola da 358: le descrizioni passano da 3-4 righe a 2 |

### Cosa è cambiato nella parte 2/2

**1. L'opzione B è rovesciata** (decisione n. 26). FT l'aveva detto guardandola: «è troppo
simile all'opzione A». Il fondo medio `#C0C3C1` era difendibile sui numeri e non si vedeva. Ora
B è nera dall'header al footer e il contenuto denso sta su **fogli bianchi**. Costo: in B i
token vanno legati al **piano** e non alla pagina, perché un elemento non sa su quale piano si
trova. L'elenco dei fogli sta in `app/globals.css`. Trappola pagata e scritta: `@theme inline`
risolve i `var()` sulla radice **una volta sola**, quindi ridichiarare `--regolo-ink` su un
sottoalbero non tocca `--color-ink` — misurato sul pannello, `#000` e `#fff` insieme. Vanno
ridichiarati tutti e due i prefissi.

**2. I campi mostrano media di esempio** (decisione n. 27), dietro `NEXT_PUBLIC_MEDIA_DEMO`.
Otto fotografie CC0 da StockSnap e un video Mixkit, tutti in bianco e nero. **Restano
segnaposto**: squadrette, specifica del formato, riga di fonte e licenza, e la barra della
proposta cambia frase da sé. **Nessun ritratto.** L'elenco file per file, con licenza e peso, è
in `TODO-MEDIA.md`.

**3. Ventiquattro rilievi di un audit avversariale** (sei revisori indipendenti, ogni rilievo
passato a chi doveva smontarlo). Chiusi in questa passata: il brief bianco su bianco di B, le
due metà del prima/dopo dello stesso bianco, la griglia a tre zone dei sei percorsi (una regola
duplicata fuori dal suo selettore vinceva su tutte le righe), il `theme-color` della palette
morta su otto rotte, lo skip link che non spostava il fuoco, la croce dell'errore che entrava
nel parlato, la barra di avanzamento che senza JS diceva zero su cinque, il bersaglio del menu a
36 px, le didascalie del prima/dopo che si attraversavano a 390, la legenda dell'esploso a due
colonne strette, la home senza JSON-LD e `/contatti` senza `LocalBusiness`, i due eventi di
analytics mai chiamati, le legali con filetti e monospazio, e la mail del brief ancora tutta
nella palette del kick-off.

### Cosa resta aperto

- **I media dei blocchi di prova** restano campi dichiarati: quello che si vede è un livello
  dimostrativo con l'interruttore, non un contenuto. Le foto vere sono ancora la cosa che manca
  di più, ed è dove lo stock costa la vendita. Due segnaposto sono invece spariti per sempre,
  perché non aspettavano niente dal cliente: l'**immagine Open Graph** (disegnata in codice, la
  pagina in miniatura) e la **mappa del footer** (ritaglio dello stesso SVG del territorio).
- **La answer capsule non è mai stata confermata dallo studio.** L'abbiamo scritta noi dal
  profilo LinkedIn (`kit/00-KICKOFF.md`: «non c'è ancora un trascritto del meeting»), e due
  delle sue frasi sono promesse operative — «con la stessa squadra», «una persona di
  riferimento dall'inizio alla fine» — che vivono in quattro punti del sito e finiscono nel
  `description` del JSON-LD, cioè in una forma che una macchina ripete. Aggiunta la riga
  bloccante in `CONTENUTI-DA-CLIENTE.md`; il testo in pagina **non è stato toccato**, perché è
  copy di vendita e la decisione è di chi la fa.
- **Rilievi dell'audit non ancora chiusi**, tutti minori o di redazione: il ritmo a tre passi
  non esiste sulle rotte interne; in A restano filetti fra le righe di alcuni elenchi;
  `.cta-contestuale` è una card il cui contenitore non è interattivo; restano metadati uniti da
  «·»; `.fasi-quota` si chiama quota pur non essendolo; `Persone` ha la prop di variante
  chiamata come il tema.
- **I crediti Higgsfield** (1,79) non servono più per l'Open Graph. Restano utili solo se si
  decide di generare qualcosa di materico, che oggi il piano esclude. Nano Banana Pro **non è
  gratis**: costa 2 crediti, provato — «Out of credits in the selected workspace».
- Il **debito del preload** resta e si è dimezzato: `/opzione-b` scarica i 40,7 KB di Archivo
  che non usa, perché Turbopack fonde i `@font-face` dei due temi in un chunk solo. Prima
  erano 105 KB nella direzione opposta. Sparisce alla fase 5 con la rotta non scelta.

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
| Quale analytics (decisione n. 10) | NB | fase 7. **Tutti e quattro** gli eventi sono ora cablati: `brief_apertura` e `brief_inviato` in `BriefForm`, `click_telefono` e `click_whatsapp` in `components/Misurazione.tsx` (un ascoltatore delegato, non un componente per link). `lib/analytics.ts` resta muto finché non c'è la libreria. *Fino all'08/09 questa riga diceva «già cablati» e valeva per due su quattro: gli altri due erano solo una voce del tipo `Evento`* |
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
| **1** | A / B / C | è del cliente, e blocca la fase 5 |
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

