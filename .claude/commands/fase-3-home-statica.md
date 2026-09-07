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


**Media.** I blocchi di prova (hero, progetti, ritratti, prima/dopo) restano rettangoli con
l'etichetta di cosa ci andrà, e ogni riga va in `TODO-MEDIA.md`: lì non entra mai materiale
generato. Se invece serve uno sfondo, una texture o un gradiente materico — che prova non è —
generalo tu con **Higgsfield** seguendo la skill `sito-media`: `select_workspace` sul workspace
privato, `gpt_image_2`, poi scarica l'URL della CDN con `curl -sSL -o public/images/<nome>.png`,
converti in WebP (lato lungo ≤ 2400, q82) e segna la riga con «generato: sì» in `TODO-MEDIA.md`.

Verifica il budget di entrambe con Chrome DevTools MCP. Aggiorna `STATO.md` (prossima:
`/fase-4-contenuti`; nota: la decisione n. 1 si prende su queste due pagine). Poi fermati e
mostrami le due home su desktop e su mobile.

Prima di fermarti: `git add -A && git commit -m "fase 3 — home statica"`. Niente push: lo fa chi segue il progetto da GitHub Desktop.
