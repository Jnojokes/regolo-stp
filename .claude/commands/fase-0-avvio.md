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
Fra gli strumenti verifica anche **Higgsfield** (generazione immagini/video/3D): se non risponde,
si installa con `claude mcp add --scope user --transport http higgsfield https://mcp.higgsfield.ai/mcp`
e poi `/mcp` per autorizzare. Non blocca le prime fasi: serve dalla 3 in poi.


Aggiorna `STATO.md` (prossima fase: `/fase-1-impalcatura`) e fermati.

Prima di fermarti: `git add -A && git commit -m "fase 0 — avvio"`. Niente push: lo fa chi segue il progetto da GitHub Desktop.
