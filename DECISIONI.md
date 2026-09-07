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
