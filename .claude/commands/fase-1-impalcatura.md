Leggi `CLAUDE.md`, `STATO.md`, `DECISIONI.md`. Segui le regole della skill `sito-sviluppo`.

**Fase 1 — impalcatura.** Next.js App Router con TypeScript, Tailwind, ESLint e Prettier. Usa
Context7 per la documentazione, non la memoria.

- Font self-hosted in `/public/fonts` (woff2, `font-display: swap`, `preload` sui tagli
  above-the-fold): **Instrument Serif** e **Instrument Sans** per l'opzione A, **Bricolage
  Grotesque** e **JetBrains Mono** in più per l'opzione B (`CLAUDE.md` § Due opzioni).
- Design token in `tailwind.config` per **entrambi** i set (A e B), selezionati da
  `data-theme="a|b"` sull'`<html>` della route. I valori sono «da confermare»: si cambiano in
  un punto solo.
- Layout: header con le 4 voci (Progetti, Servizi, Studio, Contatti) e CTA «Raccontaci il
  progetto»; footer operativo con **solo i dati confermati** (REGOLO STP, Via Campiglione 2/E,
  63900 Fermo, tel. 0734 510329) — email, PEC, P.IVA e orari restano `[[DA CLIENTE]]` e sono già
  in `CONTENUTI-DA-CLIENTE.md`; scala tipografica fluida con `clamp()`, griglia 12 colonne,
  contenuto max 1440 px.
- Le pagine vuote della struttura di `CLAUDE.md` (`/`, `/opzione-b`, `/progetti`,
  `/progetti/[slug]`, `/servizi`, `/servizi/[slug]` con i sei slug, `/studio`, `/contatti`,
  `/privacy`, `/cookie`, `/note-legali`), ognuna con `title`, `description` e `h1` provvisori
  ma unici. 404 e pagina di errore.
- `REDIRECT.md` è nel repo: predisponi `redirects()` in `next.config` leggendo la mappa (oggi
  vuota), senza catch-all.

Verifica il performance budget del solo scheletro con Chrome DevTools MCP. Aggiorna `STATO.md`
(prossima: `/fase-2-conversione`). Poi fermati e mostrami header, footer e la scala tipografica
su desktop e mobile, nei due temi.

Prima di fermarti: `git add -A && git commit -m "fase 1 — impalcatura"`. Niente push: lo fa chi segue il progetto da GitHub Desktop.
