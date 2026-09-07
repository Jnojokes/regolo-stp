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
