Leggi `CLAUDE.md`, `STATO.md`, `DECISIONI.md` e `REGOLO_SEO-GEO-LEGAL.md` nel kit. Applica la
skill `sito-seo-geo-legal` (SEO tecnico, dati strutturati, GEO) e il capitolato
`web-references/blocchi/seo-geo-legal.md`.

**Fase 6 — SEO e GEO.** Nell'ordine della skill:

1. **Nessun segnaposto online**: le pagine con `[[DA CLIENTE]]` visibili (progetti, persone,
   servizi non validati) diventano `noindex` ed escono dalla sitemap finché non sono complete.
2. SEO tecnico: meta per pagina, canonical assoluto sul dominio di `DECISIONI.md` n. 2 (**se
   non è deciso, fermati**), Open Graph con immagine dedicata 1200×630, set favicon + manifest,
   `robots.ts` e `sitemap.ts` generati dai contenuti, security header, redirect da `REDIRECT.md`.
3. **Contenuto leggibile senza JS**: `curl -A GPTBot` su home, una pagina servizio, `/studio`.
4. JSON-LD in un solo `@graph` tipizzato (`lib/seo/jsonld.tsx` sul modello di paolo-ghidoni):
   `ProfessionalService` `#org` con i campi di `REGOLO_SEO-GEO-LEGAL.md` (solo quelli confermati:
   `vatID`, `email`, `openingHours`, `geo` restano fuori finché non arrivano), `hasOfferCatalog`
   con i sei `Service`, `Person` per ogni persona pubblicata, `WebSite`, `WebPage`,
   `BreadcrumbList`, `FAQPage` sui servizi. Nessun campo vuoto.
5. GEO: l'answer capsule del kit come sorgente unica di description, `#org.description`,
   `/studio` e `llms.txt` **generato** (route handler, dai contenuti). `robots.txt` con i gruppi
   del capitolato secondo la decisione n. 9 (default: entrambi consentiti).
6. Prepara `scripts/seo-check.mjs` copiandolo dalla skill `sito-collaudo` e fallo girare
   sull'anteprima.

Aggiorna `STATO.md` (prossima: `/fase-7-legal`). Poi fermati e mostrami il JSON-LD validato e
`llms.txt`.

Prima di fermarti: `git add -A && git commit -m "fase 6 — seo geo"`. Niente push: lo fa chi segue il progetto da GitHub Desktop.
