Leggi `CLAUDE.md`, `STATO.md`, `DECISIONI.md`, `CHECKLIST-SITO.md` e `kit/OPZIONI.md` se esiste.
Poi leggi per intero la skill `sito-design` (§ 1 lista di calibrazione, § 2 e 2-bis/ter/quater,
§ 3 due passate, § 6 movimento, § 7 revisori) e `sito-sviluppo`. Qui valgono soprattutto le
regole 9, 10, 11, 13 e 14 del protocollo.

**Cosa facciamo.** Una ripassata di design su **tutte e tre le rotte** — `/` (opzione A «Lo
studio»), `/opzione-b`, `/opzione-c` (se in `app/` si chiamano diversamente, usa i nomi veri e
dimmelo) — con il metodo nuovo: reference misurate, opzioni che si distinguono per **gesto**,
revisori terzi agli stop, diversità misurata prima di dire «pronte».

Non è una rifinitura. A non ha mai avuto una reference misurata: i suoi token sono nati dal
brief, e quel brief era voce per voce il cluster n. 1 della § 1 — va rifatta con reference
**sue**. B e C hanno reference vere (ecoLINEAR, Halston) e vanno passate contro la § 1 e contro
la tabella delle tell.

Sono **quattro passi, uno stop per passo**, anche in sessioni diverse. Non passare al passo
dopo senza che io abbia risposto.

## Resta vero per tutta la ripassata

- Il sito serve come esempio per la call di vendita di FT: **non va live**. `/opzione-b` e
  `/opzione-c` restano `noindex` e fuori sitemap.
- La decisione n. 1 (A / B / C / mix) **la prendo io con il cliente**, non tu: la ripassata
  serve a renderla una scelta vera, non a chiuderla.
- Nessun contenuto del cliente si inventa, nemmeno «realistico»: `[[DA CLIENTE: …]]` visibile
  in pagina + riga in `CONTENUTI-DA-CLIENTE.md`; blocchi di prova con l'etichetta di cosa ci
  andrà + riga in `TODO-MEDIA.md`. Niente nomi, numeri, percentuali o testimonianze finte.
- Ogni opzione ha **un** momento orchestrato di movimento, costruito davvero (non statico),
  solo `transform` e `opacity`, spento con `prefers-reduced-motion`.
- Ogni opzione ha l'azione primaria (brief a 5 passi) raggiungibile **nel primo viewport a 390
  e a 1440** — a 1440 il viewport utile è ~760 px, la barra del browser conta.
- Budget di performance verificato a ogni blocco, non alla fine.
- **Non si fa**: usare un DESIGN.md / tokens.json / theme.css come input di un'opzione (è una
  pelle, non una reference); scaricare immagini, video, SVG o testi delle reference; ricostruire
  un sito 1:1; lanciare `/impeccable init|document|extract|craft|live`; riscrivere `CLAUDE.md`.

---

## Passo 0 — strumenti e inventario (regola 10)

Prima di guardare il design, verifica che lo strumento ci sia. `install.sh` non è mai stato
lanciato su questo Mac, quindi aspettati che manchi qualcosa.

1. Verifica e riporta, una riga per voce: le skill `sito-*` e `web-references` visibili;
   `web-design-guidelines`, `humanizer`, `playwright-cli` in `/skills`; `impeccable` in
   `claude plugin list`; `~/.blulang-tools` con playwright, `@axe-core/playwright` e chromium;
   gli MCP `chrome-devtools` e `context7` che rispondono.
2. Se manca qualcosa: `bash ~/Documents/Claude/Projects/blulang/skills/install.sh`. Se una
   singola voce non si installa (il binario di `impeccable` si scarica da GitHub Releases al
   primo uso e può fallire), **non fermare la ripassata**: scrivila in `STATO.md` § Revisori
   come «non disponibile, controllo X non fatto» e vai avanti senza. Il resto non si salta.
3. Porta gli script nel repo se non ci sono già:
   `mkdir -p scripts && cp ~/.claude/skills/sito-design/scripts/{misura-reference,opzioni-diff}.mjs ~/.claude/skills/sito-collaudo/scripts/qa-browser.mjs scripts/`
   e provane uno a vuoto (`node scripts/qa-browser.mjs --help` o equivalente) per sapere se
   trova i moduli in `~/.blulang-tools`. Siti dietro Cloudflare:
   `PW_EXECUTABLE="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" node …`.
4. **Inventario**, in una tabella sola: per ciascuna delle tre rotte — quali componenti usa,
   quali reference misurate ha in `kit/reference/` (slug, PNG a 1440 e 390, `misure.json`,
   blocco in `SCHEDA.md` scritto guardando i PNG: c'è o no), se ha una tabella di composizione
   in `kit/OPZIONI.md`, se ha un momento orchestrato. Poi la riga: **cosa manca**.
5. C'è un anti-pattern catturato in `kit/reference/_antipattern-*/`? Se no, segnalo: serve al
   passo 2 come metro.

Aggiorna `STATO.md`, `git add -A && git commit -m "ripassa — passo 0: strumenti e inventario"`,
niente push. **Poi fermati** e mostrami la tabella dell'inventario e cosa non si è installato.

## Passo 1 — le tre tabelle di composizione (prima del codice)

Nessuna riga di CSS in questo passo.

1. **Reference per A.** A non ne ha di sue. Proponimi **2 tier A + 1 tier B** partendo da
   `web-references/references/studi-tecnici.md` e, se serve, da
   `node ~/.claude/skills/sito-kickoff/scripts/awwwards-ricognizione.mjs` (categoria
   architettura/costruzioni): per ognuna una riga con *perché questa per uno studio tecnico di
   Fermo che vive di secondo contatto*. Devono dare un **gesto diverso** da quello di B
   (ecoLINEAR) e di C (Halston) — se coincide, scartala. Aspetta il mio ok sugli URL, poi:
   `node scripts/misura-reference.mjs <url> --slug <slug> --out kit/reference`, **guarda i PNG**
   con Read e scrivi il blocco in `kit/reference/SCHEDA.md` con le righe che contano: cosa fa la
   hero, come è ritagliata la fotografia, **la cosa che fa lui e gli altri no**, il difetto
   misurato, «da qui prendo … / non prendo …».
2. **Riguarda** anche le reference di B e C già in `kit/reference/`: apri i PNG, non fidarti
   della scheda. Se una scheda è stata scritta senza guardare, riscrivila.
3. Scrivi in `kit/OPZIONI.md` **una tabella di composizione per opzione** (§ 2-quater), colonne:
   voce · cosa fa questa opzione · da quale reference (slug misurato). Le voci: gesto della hero,
   impaginazione, tipografia (con il rapporto display 1440/390 preso da `misure.json`, non 26 px
   fissi), fotografia, movimento (**un** momento), chrome, conversione, impianto e ordine dei
   blocchi (**liberi**: possono cambiare fra le opzioni), e l'ultima riga: **quale cluster della
   § 1 questa opzione non usa, e cosa ci mette al suo posto**.
4. Sotto ogni tabella, il piano della prima passata (§ 3): 4-6 colori con un nome ciascuno; le
   famiglie e il loro ruolo; l'impaginazione in una frase con un wireframe ASCII; tre righe su
   cosa rende unica questa pagina. Poi la **seconda passata**: rileggi il piano contro il brief e
   contro la scheda e cambia ogni parte che avresti prodotto uguale per un altro studio tecnico,
   dicendo cosa hai cambiato e perché.

`git commit -m "ripassa — passo 1: composizione e reference"`. **Poi fermati**: le tre tabelle
le approvo io prima che tu scriva codice.

## Passo 2 — la ripassata riga per riga, e il codice

1. **Passa ogni rotta contro la § 1**, riga per riga, e scrivi in `STATO.md` § Ripassata cosa
   hai tolto e perché. I controlli meccanici, con il numero:
   - eyebrow ≤ ⌈sezioni / 3⌉ (la hero conta 1); niente numeri di sezione decorativi, «·»
     multipli, «→» in coda ai link, etichette «PAROLA — frammento», mono per le etichette dati;
   - su 8 sezioni almeno **4 famiglie di layout** diverse; mai due sezioni di fila della stessa
     famiglia; niente tre zig-zag consecutivi, card dentro card, wrapper arrotondato su tutto;
   - h1 ≤ 3 righe a 1440 (obiettivo 2) e ≤ 4 a 390; sottotitolo ≤ 20 parole; ≤ 4 elementi di
     testo in hero; niente pill, badge, «Scroll ↓»;
   - un solo accento, non oltre l'80 % di saturazione; niente `#000`/`#fff` puri, gradient text,
     glow, raggi che cambiano da sezione a sezione, tema che si ribalta a metà pagina;
   - niente icone SVG disegnate a mano (Phosphor o Tabler), niente finte dashboard fatte di
     `div`, niente marquee doppie, nav su una riga sotto gli 80 px a desktop;
   - CTA che non va a capo a desktop e dice cosa succede («Invia il brief», non «Invia»).
   Il cursore CAD di B resta: è misurato dalla reference ed è una scelta, non un default — ma
   verifica che la regola stia sull'attributo che il JS mette **dopo** aver creato il mirino, che
   sui campi del form torni il puntatore di sistema, e che sia spento con `prefers-reduced-motion`
   e su puntatore grosso.
2. **Poi costruisci** seguendo le tabelle approvate. Dove A cambia impianto, il blocco di
   conversione si progetta per primo. Le sezioni restano componenti condivisi con varianti:
   cambiano ordine, tema e composizione, non si duplica il codice.
3. Scrivi in `STATO.md` la tabella **blocco → reference → cosa ho preso** (scala / griglia /
   crop / materia) per tutte e tre. Se per un blocco non sai cosa scrivere, quella reference non
   l'hai guardata: torna a guardarla.
4. `node scripts/qa-browser.mjs http://localhost:<porta> --out collaudo/qa` su tutte e tre le
   rotte: sei larghezze (360, 390, 768, 1024, 1440, 1920), scroll orizzontale, CTA nel primo
   viewport, tap target, contrasto axe. **Guarda gli screenshot**, non solo il log.

`git commit -m "ripassa — passo 2: design"`. **Poi fermati** e mostrami le tre rotte a 1440 e a
390, con la tabella blocco → reference.

## Passo 3 — revisori terzi e diversità misurata

1. Per ogni rotta: `/impeccable critique <rotta>` e `/impeccable audit <rotta>`; poi
   `web-design-guidelines` sui componenti toccati («review `components/**` con
   web-design-guidelines»).
2. **P0 e P1 si correggono adesso**, prima dello stop. P2 e P3 vanno in `STATO.md` § Revisori
   con «fatto» oppure «no, perché». Dove un revisore contraddice una reference misurata o
   `CLAUDE.md` (un carattere, un raggio, un contrasto scelto apposta) **vince la reference**, e
   la riga dice perché. Un revisore non sceglie mai la direzione.
3. `node scripts/opzioni-diff.mjs http://localhost:<porta> / /opzione-b /opzione-c --ref /=<slug-A>
   --ref /opzione-b=<slug-B> --ref /opzione-c=<slug-C>`. Soglia per **ogni coppia**: classi
   condivise ≤ 50 % e almeno 3 assi diversi su 5. Sotto soglia è la stessa opzione ricolorata:
   si torna al passo 1, non si consegna.
4. **Guarda** `collaudo/opzioni/CONFRONTO.png` — reference · opzione a 1440 · opzione a 390 per
   riga. È la prova dei tre secondi, la stessa che farà il cliente. Dimmi in tre righe cosa
   vedresti tu se fossi lui.
5. Spunta in `CHECKLIST-SITO.md` le righe che questa ripassata chiude, **A13 compresa** (revisori
   senza P0/P1 aperti). Le voci SEMPRE sono ✔ o ✘, mai ⚠.

Aggiorna `STATO.md` (prossima fase: la decisione n. 1, poi `/fase-4-contenuti`).
`git add -A && git commit -m "ripassa — passo 3: revisori e diversità"`. Niente push: lo faccio
io da GitHub Desktop. **Poi fermati.**
