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

Prima di fermarti: `git add -A && git commit -m "fase 2 — conversione"`. Niente push: lo fa chi segue il progetto da GitHub Desktop.
