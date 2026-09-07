# DECISIONI — REGOLO STP

> Le scelte prese e perché; le scelte aperte con le opzioni. Claude propone, decide chi segue
> il progetto. Una voce «aperta» che blocca una fase ferma la fase, non si aggira.

## Aperte

| # | Decisione | Opzioni (con costo) | Chi decide | Entro | Blocca |
|---|---|---|---|---|---|
| 1 | **Tono del sito: A «Lo studio» / B «Il cantiere» / mix** (prototipi in `opzioni/`) | A: esploso strutturale SVG (M) · B: percorso-domanda + prima/dopo (B+B) · mix: es. hero di A + percorso di B | cliente con FT | prima della fase 5 | fase 5 |
| 2 | Dominio: brasili.net / dominio REGOLO / entrambi con redirect | brasili.net è reputazione acquisita: se si cambia, redirect 301 pagina per pagina | cliente | prima della fase 6 | fase 6 |
| 3 | Continuità di marca con «Brasili» | quanto si eredita nel nome e nei testi | cliente | prima dei contenuti | fase 4 |
| 4 | Peso privato/pubblico nel fatturato | cambia l'ordine di servizi e progetti in evidenza | cliente | prima della fase 3 | fase 3 (ordine) |
| 5 | Colori e font definitivi; logo | valori provvisori in `CLAUDE.md`; se arriva un logo si rivedono | cliente | prima della fase 5 | — |
| 6 | Wow n. 2 (rilluminazione WebGL di una foto, E1) | dentro (A) / fuori | NB, su budget | prima della fase 5 | — |
| 7 | Bilingue IT/EN | solo con committenza estera reale | cliente | prima dei contenuti | — |
| 8 | Sezione «Note»/approfondimenti | solo se qualcuno in studio la alimenta | cliente | prima del lancio | — |
| 9 | Crawler di addestramento: consentiti / bloccati | studio tecnico, nessuna opera dell'ingegno da proteggere: default proposto **consentiti** | cliente | fase 6 | fase 6 |
| 10 | Analytics | **senza cookie** (Vercel Analytics o Plausible) → nessun banner. Alternativa GA4 → banner completo | NB | fase 7 | fase 7 |
| 11 | Pannello per il cliente | default **no**: progetti nel repo, aggiornamenti a preventivo. Sì solo se pubblicano progetti spesso | cliente | prima del lancio | — |
| 12 | 3D | dipende dai CAD/BIM di 2-3 progetti (mail agli asset n. 9). Oggi **fuori** | NB, dopo la mail | — | — |
| 13 | Quali comuni presidiare in SEO | si parte da dove hanno già lavorato | cliente + noi | dopo la lista lavori | fase 6 |

## Prese

| Data | Decisione | Perché | Chi |
|---|---|---|---|
| 03/09/2026 | Stack: Next.js App Router + TS, Tailwind, GSAP + ScrollTrigger, Lenis, Vercel, form con Resend | stack standard della libreria; `next/image` fa la differenza su un sito di fotografie | NB |
| 03/09/2026 | Il sito è il **secondo** contatto; azione primaria = brief qualificato a 5 passi | scheda nicchia studi tecnici | NB |
| 03/09/2026 | Impianto tier B (Storey, Studio Foundry), estetica tier A, mai l'impianto dei grandi studi | scheda nicchia | NB |
| 03/09/2026 | Esploso strutturale in SVG a livelli, non in 3D | il 3D entra solo con i CAD del cliente | NB |
| 07/09/2026 | La home si costruisce in **due varianti** (`/` = A, `/opzione-b` = B) fino alla fase 3, poi si tiene quella scelta | FT deve vendere con due opzioni; costo della seconda variante: solo l'ordine dei blocchi e i token | NB |
| 07/09/2026 | Next.js 16 + React 19, Tailwind **v4** (token in `@theme inline` dentro `app/globals.css`, non in `tailwind.config`) | Tailwind v4 non usa più un file di config JS: i token stanno nel CSS. `@theme inline` è la forma documentata quando il valore è una variabile che cambia col tema — senza `inline` i colori di A resterebbero congelati anche dentro B | NB |
| 07/09/2026 | Due **root layout** in `app/(a)` e `app/(b)`, uno per tema | è il modo documentato di avere due `<html>` diversi (e quindi due `data-theme`) nello stesso progetto. Costo: navigare fra `/` e `/opzione-b` ricarica la pagina, e il 404 globale ha bisogno di una rotta catch-all in `(a)`. Alla fase 5 resta un layout solo e la complicazione sparisce | NB |
| 07/09/2026 | Tema B: aggiunto `accent-strong #C7431D` per i fondi pieni, l'arancio `#E4572E` resta per il testo grande | bianco su `#E4572E` dà 3,68:1, sotto il minimo AA di 4,5:1: il CTA principale dell'opzione B non era leggibile a norma. L'arancio acceso resta dov'è grande (titoli), il fondo del bottone si scurisce di poco | NB |
| 07/09/2026 | Font della sola opzione B con `preload: false` | Turbopack mette i `@font-face` dei due temi in un unico chunk CSS e Next precarica tutto quello che ci trova: l'opzione A si scaricava 105 KB di Bricolage e JetBrains Mono senza usarli | NB |
| 07/09/2026 | `/opzione-b` è `noindex` | è una rotta di proposta, non una pagina del sito. Lighthouse SEO su quella rotta dà 60 per questo motivo: è voluto | NB |
| 07/09/2026 | Il brief è **un solo `<form>` con i cinque passi tutti nel DOM**; la divisione a passi arriva con l'idratazione | è il solo modo di far funzionare davvero il form senza JS senza mantenere due markup diversi. `montato` viene da `useSyncExternalStore` (snapshot server `false`, client `true`): il primo render lato client è identico all'HTML servito, niente disallineamento | NB |
| 07/09/2026 | Le risposte a bottone sono **`radio` nativi**, non `button aria-pressed` come nei prototipi | un bottone senza JS non conserva la scelta; un radio sì, e da tastiera funziona già con le freccette. Costo: il pallino si vede. Guadagno: il blocco più importante del sito non dipende dal JavaScript | NB |
| 07/09/2026 | Autocomplete dei comuni con **`<input list>` + `<datalist>` renderizzato lato server** | zero JavaScript, zero librerie, accessibile di serie, e su mobile usa la tendina del sistema. I 128 nomi stanno nell'HTML (12,4 KB gz di documento in tutto) e non nel bundle. L'alternativa — un combobox scritto a mano — costava ~200 righe di ARIA per fare peggio | NB |
| 07/09/2026 | Elenco dei comuni **generato** da `scripts/genera-comuni.mjs` sull'elenco ISTAT (FM 40 · MC 55 · AP 33 = 128), non scritto a mano | un nome di comune sbagliato su un sito locale è un difetto vero. Lo script verifica le numerosità attese e si ferma se l'elenco a monte cambia. Dato pubblico amministrativo: non è contenuto del cliente | NB |
| 07/09/2026 | Validazione in **un solo modulo isomorfo** (`lib/brief/validazione.ts`), usato dal client e dal route handler | una regola scritta due volte diverge. Senza JS il lavoro lo fa la validazione nativa del browser (`required`, `type="email"`, `maxlength`), che è HTML: `noValidate` si accende solo da montati | NB |
| 07/09/2026 | **Due mail separate, non `batch.send`** | il batch di Resend è atomico: una copia di cortesia rifiutata farebbe cadere anche la notifica allo studio, cioè si perderebbe il lead. Prima lo studio, poi la cortesia; se la cortesia non parte il brief è arrivato comunque e la pagina di esito lo dice | NB |
| 07/09/2026 | **Consenso: si registrano momento, testo, versione e pagina — non l'IP** | per provare *cosa* è stato accettato bastano quelli, e l'identità è nei dati di contatto stessi. L'IP resta in memoria pochi minuti per il solo rate limit e non finisce in nessuna mail: minimizzazione, e una cosa in meno da dichiarare in informativa. Il testo vive in `lib/brief/consenso.ts` con un controllo che fa fallire la build se quello mostrato e quello registrato divergono | NB |
| 07/09/2026 | Rate limit **in memoria**, 5 invii per IP ogni 15 minuti, con restituzione del credito sugli invii rifiutati | uno studio di cinque persone riceve qualche brief al giorno: un Redis è un servizio in più da mantenere per niente. Su Fluid Compute l'istanza si riusa, e quando è fredda il limite diventa più permissivo — mai più severo, quindi non chiude fuori nessuno. Il credito si restituisce perché chi non ha JS e sbaglia la mail cinque volte non va bloccato per un quarto d'ora | NB |
| 07/09/2026 | Trasporto su file dietro **`BRIEF_TRASPORTO=file`**, esplicito, non su `NODE_ENV` | `next start` gira con `NODE_ENV=production` anche in locale, ed è così che si guarda questo progetto: un gate implicito lì avrebbe disattivato la prova, o peggio si sarebbe acceso dove non doveva. Lo accendono `npm run dev` e `npm run start:prova`; su Vercel viene ignorato e l'invio si rifiuta | NB |
| 07/09/2026 | Con JS un invio fallito **resta sul form**, con le risposte al loro posto; le pagine di esito servono il percorso senza JS | far perdere cinque risposte per un errore di rete è il modo più sicuro di perdere il contatto. `/brief/non-inviato` esiste, è `noindex`, e mette il telefono dove si vede | NB |
| 07/09/2026 | `/contatti` è **dinamica**: legge `?intervento=` sul server | il passo 1 precompilato deve funzionare anche senza JavaScript, e per farlo il valore va scelto lato server. Prezzo: nessuna cache CDN su una pagina che non ha immagini, non fa fetch e non è quella su cui si misura l'LCP (misurato: 640 ms). Le due home restano statiche | NB |
| 07/09/2026 | Tipo di immobile a sei voci (casa indipendente · appartamento · edificio intero · capannone o ufficio · terreno · altro) | il catalogo blocchi F1 dice «ogni risposta è un bottone finché è possibile». È una tassonomia di form, non un contenuto dello studio: se non gli torna, si cambia in `lib/brief/domande.ts` e cambia in tutti e tre i posti (markup, validazione, mail) | NB |
| 07/09/2026 | Le mail **non promettono tempi di risposta** | CLAUDE.md § Obiettivo lo vieta, e quanto passa prima della telefonata lo decide lo studio. Se vogliono dichiarare un tempo, è una riga da aggiungere e sta in CONTENUTI-DA-CLIENTE.md | NB |
| 07/09/2026 | Il kit di progetto è stato spostato **dentro il repo**, in `kit/` | i prototipi e il capitolato servono a ogni fase: averli nel repo evita gli `--add-dir` e li versiona insieme al codice a cui si riferiscono. I riferimenti in `CLAUDE.md` sono stati aggiornati | FT |
