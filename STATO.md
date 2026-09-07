# STATO — REGOLO STP

> La memoria fra una sessione e l'altra. Si aggiorna a ogni stop di fase, prima di fermarsi.

| | |
|---|---|
| Ultima fase chiusa | `/fase-2-conversione` (07/09/2026) |
| Prossima fase | `/fase-3-home-statica` |
| Deploy | nessuno. `vercel link` quando si vuole un'anteprima (serve `npm i -g vercel`) |
| Come si guarda | `npm run dev` · oppure `npm run build && npm run start:prova -- -p 3210` |
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
| 07/09/2026 | 2 | invio con Resend: due mail separate (studio, poi copia di cortesia), non in batch | se la cortesia non parte il brief è arrivato comunque, e la pagina di esito lo dice |
| 07/09/2026 | 2 | consenso non pre-spuntato con link a `/privacy`, registrato con momento, testo, versione e pagina | l'IP **non** si registra: serve solo, in memoria, al rate limit |
| 07/09/2026 | 2 | `/brief/inviato` e `/brief/non-inviato`, entrambe `noindex` | con JS un invio fallito resta sul form e non fa perdere le risposte |
| 07/09/2026 | 2 | evento `brief_inviato` (+ `brief_apertura`) in `lib/analytics.ts`, muto finché non c'è l'analytics | parla a Vercel Analytics e a Plausible, i due candidati della decisione n. 10 |
| 07/09/2026 | fuori fase | il kit di progetto è stato spostato in `kit/` dentro il repo; riferimenti in `CLAUDE.md` aggiornati | fatto da FT |

## Misure (07/09/2026, build di produzione, Slow 4G + CPU 4×, viewport 390)

Byte **sul filo** (`encodedDataLength`), non decompressi: il budget parla di KB gz.

| Metrica | Obiettivo | `/` | `/contatti` | Esito |
|---|---|---|---|---|
| LCP | < 2,0 s | 0,70 s | 0,64 s | OK |
| CLS | < 0,05 | 0,00 | 0,00 | OK |
| Peso primo caricamento | < 1,2 MB | 231 KB | 232 KB | OK |
| JS primo caricamento | < 180 KB gz | 143 KB | 143 KB | OK |
| Richieste | < 40 | 17 | 17 | OK |
| Documento HTML | — | 12,4 KB | 12,7 KB | i 128 `<option>` del datalist costano ~1 KB gz |
| Lighthouse mobile | ≥ 90 ×4 | 100 · 100 · 100 · 100 | 100 · 100 · 100 · 100 | OK, 53 controlli passati, 0 falliti |

Il brief è costato **8 KB gz di JavaScript** (da 135 a 143 KB): resta 37 KB di margine sul budget.
Su `/opzione-b` il peso sale a 337 KB per i font in più — è il debito tecnico di fase 1, non il brief.

## Aperto

| Cosa | Da chi dipende | Blocca |
|---|---|---|
| A / B / mix | cliente, in call | fase 5 (movimento) — non le fasi 3-4 |
| `RESEND_API_KEY`, `BRIEF_FROM`, `BRIEF_TO` (vedi `.env.example`) | titolare + decisione n. 2 | **il collaudo della fase 8**: senza questi il brief non parte in produzione, e il codice risponde «non inviato» invece di fingere |
| Dominio | cliente | fase 6 (SEO). Finché non c'è, `metadataBase` resta vuoto e non si dichiara nessun canonical |
| Foto e dati dei progetti | cliente | fase 4 (contenuti reali) |
| Quale analytics (decisione n. 10) | NB | fase 7. Gli eventi sono già cablati: `lib/analytics.ts` è muto finché non c'è la libreria |
| Vercel CLI non installato (`npm i -g vercel`) | NB | l'anteprima, non lo sviluppo |
| Node locale v25.7.0, non LTS | NB | niente: `.nvmrc` e `engines` fissano 22 LTS, che è quello che usa Vercel |

## Debiti tecnici, da saldare alla fase 5

| Cosa | Perché c'è | Quando sparisce |
|---|---|---|
| `/opzione-b` precarica il serif dell'opzione A (29 KB che non usa) | Turbopack fonde i CSS dei due temi in un chunk solo, e il preload si decide per font, non per rotta | fase 5: resta un tema solo |
| Rotta catch-all `app/(a)/[...nonTrovata]` per il 404 globale | due root layout ⇒ nessun layout di primo livello in cui disegnare il 404 | fase 5: con un layout solo basta `not-found.tsx` |
| `/brief/inviato` e `/brief/non-inviato` stanno in `(a)`, quindi chi invia da `/opzione-b` atterra su una pagina col tema A | stesso motivo: due root layout, e una pagina di esito per tema sarebbe duplicazione per una rotta che sparisce | fase 5 |

## Da fare alla fase 7 (legal), che nasce dalla fase 2

- In `/privacy`: dichiarare **Resend** come responsabile del trattamento, dire che il consenso si
  conserva nella casella dello studio con momento, testo e versione, e che l'indirizzo IP **non**
  si registra (si usa in memoria, per pochi minuti, per il solo rate limit).
- Alzare `CONSENSO.versione` in `lib/brief/consenso.ts` se il testo cambia: i consensi già
  raccolti restano legati alla versione con cui sono stati dati.

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
| Contrasto AA delle coppie nuove | 20 coppie verificate con `scripts/contrasto.mjs`, tutte ≥ 4,5:1 (bordi dei controlli ≥ 3:1) | 07/09/2026 |
