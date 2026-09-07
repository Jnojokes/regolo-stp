# REGOLO — serie di prompt per Claude Code (istanziata dal template «sito nuovo», 07/09/2026)

> Spacchettata in `PROMPTS/` e copiata in `.claude/commands/` del repo: `/fase-0-avvio` … `/fase-8-collaudo`.
> Le fasi 3D e pannello non ci sono: `DECISIONI.md` n. 11-12 le tiene fuori.

<!-- FILE: fase-0-avvio.md -->
Leggi `CLAUDE.md`, `STATO.md`, `DECISIONI.md`. Segui le regole della skill `sito-sviluppo` e
leggi la skill `web-references` (in particolare `references/studi-tecnici.md`,
`blocchi/catalogo-blocchi.md`, `blocchi/stack-e-performance.md`, `blocchi/seo-geo-legal.md`).
Il kit del progetto è aggiunto con `--add-dir` (`~/Documents/Claude/Projects/blulang/REGOLO`):
leggi lì `REGOLO_Architettura_Sito.md`, `REGOLO_SEO-GEO-LEGAL.md`, `REGOLO_MEDIA-PIANO.md` e
apri i due prototipi `opzioni/REGOLO_Opzione_A.html` e `opzioni/REGOLO_Opzione_B.html`: sono il
brief visivo delle due home.

Costruiamo il sito di REGOLO STP, studio di ingegneria civile e architettura a Fermo. Questa è
la sessione di avvio: non si scrive codice.

1. Dimmi in dieci righe come hai capito il progetto: chi è il cliente, qual è l'unica azione
   che il sito deve ottenere (il brief a 5 passi), cosa c'è di vero in mano (oggi: nome,
   indirizzo, telefono, i sei servizi; niente foto, niente numeri) e cosa manca.
2. Controlla che esistano `STATO.md`, `DECISIONI.md`, `CONTENUTI-DA-CLIENTE.md`,
   `TODO-MEDIA.md`, `REDIRECT.md` nel repo; se manca qualcosa copialo dal kit.
3. Elenca le voci di `DECISIONI.md` ancora aperte che **bloccano la fase 1**. Oggi nessuna
   dovrebbe bloccarla: stack, font e token provvisori sono in `CLAUDE.md`. Se ne trovi, fermati.
4. Verifica gli strumenti: le skill `sito-*` e `web-references` sono visibili, Context7 e Chrome
   DevTools MCP rispondono. Se manca qualcosa, dimmi cosa e come si installa (`skills/install.sh`).

Aggiorna `STATO.md` (prossima fase: `/fase-1-impalcatura`) e fermati.

<!-- FILE: fase-1-impalcatura.md -->
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

<!-- FILE: fase-2-conversione.md -->
Leggi `CLAUDE.md`, `STATO.md`, `DECISIONI.md`. Segui le regole della skill `sito-sviluppo`.

**Fase 2 — il brief a 5 passi, per primo.** È in `CLAUDE.md` § Il form. Lo facciamo prima
della home perché è l'unica cosa che il sito deve davvero ottenere.

Completo: una domanda per schermata (tipo di intervento → dove, con autocomplete sui comuni di
FM/MC/AP + tipo di immobile → a che punto sei → tempi → contatti), barra di avanzamento,
precompilazione del passo 1 da `?intervento=`, validazione lato client **e** server, honeypot,
rate limit, invio con Resend alla casella `[[DA CLIENTE: email dello studio]]` (in sviluppo
la mail va a un indirizzo di test) con copia di cortesia a chi compila, **consenso privacy non
pre-spuntato con link a `/privacy`** e registrazione di consenso con timestamp e testo. Niente
CAPTCHA. Pagine di esito «inviato» / «non inviato», `noindex`. Il brief vive come componente
riusabile: sta in fondo alla home (entrambe le opzioni) e in `/contatti`.

**Deve funzionare anche con JavaScript disattivato**: un unico form che invia lo stesso.
Evento di misurazione sull'invio riuscito (uno dei 4 di `CLAUDE.md` § Analytics).

Aggiorna `STATO.md` (prossima: `/fase-3-home-statica`). Poi fermati e fammelo provare, con JS
attivo e disattivato, e mostrami la mail che arriva.

<!-- FILE: fase-3-home-statica.md -->
Leggi `CLAUDE.md`, `STATO.md`, `DECISIONI.md`. Segui le regole della skill `sito-sviluppo` e
`web-references/blocchi/catalogo-blocchi.md`. Riapri i due prototipi in `opzioni/` del kit.

**Fase 3 — due home statiche, senza animazioni.** Voglio vedere l'impianto e la tipografia
prima che si muova qualcosa, e FT deve poter mostrare le due opzioni dallo stesso deploy.

- `/` = **Opzione A «Lo studio»** e `/opzione-b` = **Opzione B «Il cantiere»**, con gli ordini
  di `CLAUDE.md` § Due opzioni. Le sezioni sono **componenti condivisi** (hero, smistamento,
  numeri, progetti, servizi, come-lavoriamo, esploso, prima-dopo, persone, territorio, brief,
  footer): cambiano ordine, tema e varianti, non il codice.
- Nella B la hero è la domanda «Che intervento hai in mente?» con i cinque percorsi e il
  pannello (cosa comprende · come si svolge · cosa serve da te); nella A la hero è la foto con
  il payoff «Progettiamo e dirigiamo. Dal disegno al cantiere.» e lo smistamento sotto.
- L'esploso (A) e il prima/dopo (B) in questa fase sono **statici**: l'esploso con i livelli già
  separati e le etichette, il prima/dopo con il cursore che funziona (è un `input[type=range]`,
  non un'animazione).
- Contenuti: solo quelli veri. I sei servizi con titolo e sottotitolo di `CLAUDE.md`; i testi
  del processo e delle hero sono in `opzioni/`. Dove mancano dati, `[[DA CLIENTE: …]]` visibile
  e riga in `CONTENUTI-DA-CLIENTE.md`. Nei blocchi di prova rettangoli con l'etichetta di cosa
  ci andrà (tratteggio in A, carta millimetrata in B) e riga in `TODO-MEDIA.md`. Niente stock,
  niente numeri, nomi o testimonianze inventati.
- Un solo `h1` per pagina; ogni immagine con `width`/`height` e `alt`. Versione mobile
  progettata per ogni blocco; nella B la barra fissa Chiama · WhatsApp · Brief sotto i 768 px.
- `/opzione-b` è `noindex` e fuori sitemap: è una pagina di proposta, non del sito.

Verifica il budget di entrambe con Chrome DevTools MCP. Aggiorna `STATO.md` (prossima:
`/fase-4-contenuti`; nota: la decisione n. 1 si prende su queste due pagine). Poi fermati e
mostrami le due home su desktop e su mobile.

<!-- FILE: fase-4-contenuti.md -->
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

<!-- FILE: fase-5-movimento.md -->
Leggi `CLAUDE.md`, `STATO.md`, `DECISIONI.md`. Segui le regole della skill `sito-sviluppo` e
`web-references/blocchi/stack-e-performance.md` § Animazioni.

**Fase 5 — movimento, sull'opzione scelta.** Prima di tutto leggi `DECISIONI.md` n. 1: se è
ancora aperta, **fermati e chiedi**. Se è decisa: la route non scelta si elimina (o si porta il
mix su `/`), e `/opzione-b` sparisce.

- Lenis, transizioni di pagina, rivelazioni allo scroll misurate.
- Il blocco speciale: se **A**, l'esploso strutturale in SVG a livelli (fondazioni → struttura →
  involucro → impianti → finiture) che si separano allo scroll con ScrollTrigger, con la legenda
  che evidenzia il livello; su mobile sequenza di step con i livelli che si accendono uno alla
  volta. Se **B**, il percorso della hero con transizione fra i cinque casi e il prima/dopo già
  fatto; il processo come timeline con avanzamento sticky. Se il wow n. 2 (decisione n. 6) è
  dentro: la rilluminazione WebGL di una foto di progetto, con fallback immagine.
- Massimo due blocchi wow, mai di fila. Tutto disattivato da `prefers-reduced-motion: reduce`;
  animare solo `transform` e `opacity`; sotto i 768 px gli effetti scroll-driven pesanti si
  sostituiscono con un fade. Nessun testo esiste solo dentro un'animazione.
- Usa Context7 per GSAP/ScrollTrigger/Lenis.

Verifica il budget dopo ogni blocco animato con Chrome DevTools MCP. Aggiorna `STATO.md`
(prossima: `/fase-6-seo-geo`). Poi fermati e fammi vedere il blocco speciale su telefono.

<!-- FILE: fase-6-seo-geo.md -->
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

<!-- FILE: fase-7-legal.md -->
Leggi `CLAUDE.md`, `STATO.md`, `DECISIONI.md` e `REGOLO_SEO-GEO-LEGAL.md`. Applica la skill
`sito-seo-geo-legal` (parte legal) e i suoi `templates/`.

**Fase 7 — legal.** Titolare = REGOLO STP con ragione sociale esatta, P.IVA, sede, PEC: finché
mancano, le tre pagine restano `noindex`, con `[[DA CLIENTE]]` al posto dei dati, e la riga è
in `CONTENUTI-DA-CLIENTE.md`.

- `/privacy`, `/cookie`, `/note-legali` dai template: dati raccolti (brief via Resend,
  navigazione su Vercel, misurazione senza cookie), basi giuridiche in tabella, conservazione,
  fornitori con link alle loro policy (Vercel, Resend, Vercel Analytics o Plausible),
  trasferimenti extra-UE, diritti artt. 15-22, Garante. Cookie policy che dice **che il sito non
  usa cookie non tecnici** e cosa succede se si rifiutano quelli tecnici (niente). Note legali
  con art. 7 D.Lgs. 70/2003 + art. 2250 c.c., ordini professionali, diritti sulle foto dei
  progetti, dichiarazione sui contenuti generati con IA (solo lo sfondo OG, se generato), foro.
- Analytics **senza cookie** (decisione n. 10): nessun banner. Se cambia idea, il banner segue
  il capitolato § 4.2.
- Nessun iframe di terzi. La mappa nel footer è statica.
- Form: checkbox non pre-spuntata con link a `/privacy` (fase 2); l'informativa dice dove
  finiscono i dati.
- Link alle tre pagine nel footer di ogni pagina, e i link rispondono 200.

Aggiorna `STATO.md` (prossima: `/fase-8-collaudo`). Poi fermati e mostrami le tre pagine.

<!-- FILE: fase-8-collaudo.md -->
Leggi `CLAUDE.md`, `STATO.md`, `DECISIONI.md`. Applica la skill `sito-collaudo`.

**Fase 8 — collaudo.** Copia nel repo `scripts/collaudo.py`, `scripts/seo-check.mjs` e
`scripts/cloaking-check.sh` dalla skill (`~/.claude/skills/sito-collaudo/scripts/`) e aggiungi
`"collaudo"` e `"seo:check"` a `package.json`.

1. `collaudo.py` contro il build locale con `--nap "Via Campiglione 2/E" --nap "0734 510329"`:
   tutte le URL, title unici, un `h1`, JSON-LD ovunque, nessun segnaposto nelle pagine
   pubblicate, NAP su ogni pagina, ogni `<img>` con alt, link legali 200.
2. `seo-check.mjs` contro l'anteprima o la produzione. Deve uscire con 0.
3. `cloaking-check.sh` sulla home: browser / GPTBot / ClaudeBot con lo stesso HTML.
4. Lighthouse **mobile** ≥ 90 su tutte e quattro le voci, con Chrome DevTools MCP, sulla home e
   su una pagina servizio.
5. Manuale: tastiera (brief compreso), `prefers-reduced-motion`, brief inviato davvero con JS
   attivo e disattivato, telefono vero (lo faccio io: dimmi cosa guardare).

Correggi quello che fallisce e rilancia finché è pulito. Scrivi il rapporto in `STATO.md`
§ Collaudo con data ed esito per riga, la lista finale di `CONTENUTI-DA-CLIENTE.md` e i
`DECISIONI.md` ancora aperti. Poi fermati: la consegna è della skill `sito-consegna`.
