# STATO — REGOLO STP

> La memoria fra una sessione e l'altra. Si aggiorna a ogni stop di fase, prima di fermarsi.

| | |
|---|---|
| Ultima fase chiusa | `/fase-1-impalcatura` (07/09/2026) |
| Prossima fase | `/fase-2-conversione` — il brief a 5 passi |
| Deploy | nessuno. `vercel link` quando si vuole un'anteprima (serve `npm i -g vercel`) |
| Come si guarda | `npm run dev`, oppure `npm run build && npm run start -- -p 3210` |
| Budget | rispettato, misurato (tabella sotto) |

## Fatto

| Data | Fase | Cosa | Note |
|---|---|---|---|
| 03/09/2026 | kick-off | reference (scheda `studi-tecnici`), architettura, CLAUDE.md | chat Cowork |
| 07/09/2026 | kick-off | due prototipi di homepage (A «Lo studio», B «Il cantiere») in `opzioni/`, kit completo, PROMPTS | per la call di vendita di FT |
| 07/09/2026 | 0 — avvio | kit e skill letti, file di tracciamento verificati, strumenti provati, nessuna decisione bloccante | — |
| 07/09/2026 | 1 — impalcatura | Next.js 16 + React 19 + TypeScript, Tailwind v4, ESLint flat + Prettier | `npm run lint` e `npm run build` puliti |
| 07/09/2026 | 1 | 5 font self-hosted in `/public/fonts`, subset latino, `display: swap` | 164 KB in tutto; per rotta ne pesano 59 |
| 07/09/2026 | 1 | token dei due temi in `app/globals.css`, contrasto AA verificato coppia per coppia | `[data-theme="a"]` e `[data-theme="b"]`, si cambiano in un punto solo |
| 07/09/2026 | 1 | header (4 voci + una CTA, menu mobile `<details>` senza JS) e footer operativo | solo dati confermati; il resto è `[[DA CLIENTE]]` visibile |
| 07/09/2026 | 1 | 15 rotte con title, description e h1 unici; 404 tematizzata; error e global-error | `/progetti/[slug]` dà 404 vero finché non ci sono progetti |
| 07/09/2026 | 1 | `redirects()` in `next.config.ts` che legge `REDIRECT.md`, senza catch-all | mappa oggi vuota, salta le righe segnaposto e i cicli |

## Misure (07/09/2026, build di produzione, Slow 4G + CPU 4×, viewport 390)

| Metrica | Obiettivo | Misurato su `/` | Esito |
|---|---|---|---|
| LCP | < 2,0 s | 0,68 s | OK |
| CLS | < 0,05 | 0,00 | OK |
| Peso primo caricamento | < 1,2 MB | 218 KB (brotli) | OK |
| JS primo caricamento | < 180 KB gz | 135 KB scaricati / 173 KB contando i chunk in modulepreload | OK |
| Richieste | < 40 | 13 | OK |
| Lighthouse mobile | ≥ 90 ×4 | Accessibilità 100 · Best practices 100 · SEO 100 · Agentic 100 | OK |

Su `/opzione-b` Lighthouse dà SEO 60: è il `noindex` voluto sulla rotta di proposta, non un difetto.

Le pagine stanno sotto le 300 parole leggibili senza JS (la home ne ha 213). È atteso: sono
pagine vuote, i contenuti arrivano alle fasi 2-4. Il meccanismo è verificato — tutto il testo,
il menu e la CTA sono nell'HTML servito, niente dipende dal JavaScript.

## Aperto

| Cosa | Da chi dipende | Blocca |
|---|---|---|
| A / B / mix | cliente, in call | fase 5 (movimento) — non le fasi 2-4 |
| Dominio | cliente | fase 6 (SEO). Finché non c'è, `metadataBase` resta vuoto e non si dichiara nessun canonical |
| Foto e dati dei progetti | cliente | fase 4 (contenuti reali) |
| Vercel CLI non installato (`npm i -g vercel`) | NB | l'anteprima, non lo sviluppo |
| Node locale v25.7.0, non LTS | NB | niente: `.nvmrc` e `engines` fissano 22 LTS, che è quello che usa Vercel. `npm install` avvisa, ed è giusto così |

## Debiti tecnici, da saldare alla fase 5

| Cosa | Perché c'è | Quando sparisce |
|---|---|---|
| `/opzione-b` precarica il serif dell'opzione A (29 KB che non usa) | Turbopack fonde i CSS dei due temi in un chunk solo, e il preload si decide per font, non per rotta | fase 5: resta un tema solo |
| Rotta catch-all `app/(a)/[...nonTrovata]` per il 404 globale | due root layout ⇒ nessun layout di primo livello in cui disegnare il 404 | fase 5: con un layout solo basta `not-found.tsx` |

## Collaudo

| Controllo | Esito | Data |
|---|---|---|
| `seo-check.mjs` | — | |
| `collaudo.py` | — | |
| `cloaking-check.sh` (3 user-agent) | — | |
| Lighthouse mobile ×4 | 100/100/100/100 sullo scheletro | 07/09/2026 |
| Rifiuto consenso → zero richieste ai terzi | n/a se analytics senza cookie | |
| Tastiera | focus visibile, salta-al-contenuto e menu mobile provati | 07/09/2026 |
| Telefono vero | — | |
| `prefers-reduced-motion` | regola in CSS, verificata nel foglio servito | 07/09/2026 |
