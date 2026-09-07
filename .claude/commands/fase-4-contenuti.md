Leggi `CLAUDE.md`, `STATO.md`, `DECISIONI.md`. Segui le regole della skill `sito-sviluppo`.

**Fase 4 — pagine interne.**

- **Progetti**: contenuti in MDX in `content/progetti/<slug>.mdx` con frontmatter validato da
  **zod** (build che fallisce se manca un campo): titolo, luogo, anno, superficie, **ruolo dello
  studio** (elenco chiuso: progetto architettonico · progetto strutturale · direzione lavori ·
  coordinamento sicurezza · collaudo), committente (opzionale), galleria con `alt`
  obbligatorio, prima/dopo (opzionale), progetti correlati. Indice `/progetti` con filtri per
  tipo, comune e ruolo **come query string** (indicizzabili). Scheda: copertina → contesto e
  problema → cosa abbiamo fatto → dati duri → galleria → prima/dopo → CTA «Hai un intervento
  simile?» che precompila il brief → progetto successivo. Oggi i progetti sono
  `[[DA CLIENTE]]`: crea **un solo** MDX di esempio con tutti i campi segnaposto, non sei.
- **Servizi**: le sei pagine con titolo come esito → per chi è → cosa comprende → come funziona
  (le 5 fasi) → **cosa serve da te** (l'elenco dei prototipi B è un esempio: marcalo
  `[[DA CLIENTE: da validare]]`) → FAQ in `<details>` (3-8, domanda che finisce con `?`, risposta
  ≥ 15 parole autoconclusiva; frontmatter validato) con schema `FAQPage` → progetti collegati
  → CTA che precompila il brief con `?intervento=`.
- **Studio**: metodo (le 5 fasi), persone (ritratto, nome, ruolo, ordine e numero —
  `[[DA CLIENTE]]`), la capsule di `REGOLO_SEO-GEO-LEGAL.md` come testo «chi siamo».
- **Contatti**: dati confermati, brief completo, mappa statica (nessun iframe).
- Ogni pagina: URL parlante, `title` ≤ 60, `description` ≤ 155, un `h1`, breadcrumb.

Aggiorna `STATO.md` (prossima: `/fase-5-movimento`). Poi fermati e mostrami una pagina servizio
completa e l'indice progetti con i filtri.

