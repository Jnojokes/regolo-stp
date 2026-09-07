# REGOLO — avvio (i comandi, in ordine)

> 07/09/2026. Repo: `~/GitHub/regolo-stp` (spostato fuori da ~/Documents il 07/09: iCloud sincronizzava `.git` e `node_modules`). Kit: `~/Documents/Claude/Projects/blulang/REGOLO/`.

```bash
# 0. una volta per Mac: skill + MCP a scope utente
bash ~/Documents/Claude/Projects/blulang/skills/install.sh

# 1. il repo locale è già creato dal kit (git init + primo commit «Kit di progetto Blu Lang»).
#    È stato creato da Cowork, che non può cancellare file: restano dei .lock da togliere. Poi il remote:
#    crea su GitHub un repo PRIVATO e VUOTO (senza README) chiamato regolo-stp sull'account **Jnojokes**
#    (è quello che Vercel vede: su un account personale diverso l'app Vercel non si installa).
cd ~/GitHub/regolo-stp
find .git -name '*.lock' -delete; find .git/objects -name 'tmp_obj_*' -delete
git branch -M main
git remote add origin https://github.com/Jnojokes/regolo-stp.git   # fatto il 07/09: repo su Jnojokes
git push -u origin main

# 2. Claude Code nel repo, con il kit e i repo di riferimento leggibili
claude --add-dir ~/Documents/Claude/Projects/blulang/REGOLO --add-dir ~/GitHub/paolo-ghidoni --add-dir ~/Documents/GitHub/AON
```

Poi, in Claude Code, in questo ordine — uno alla volta, ogni fase si ferma e aggiorna `STATO.md`:

| Comando | Cosa esce | Quando FT/cliente decide |
|---|---|---|
| `/fase-0-avvio` | lettura del kit, dieci righe, strumenti verificati | — |
| `/fase-1-impalcatura` | Next.js + Tailwind, font, token **A e B**, layout, pagine vuote, 404 | — |
| `/fase-2-conversione` | il brief a 5 passi, funzionante anche senza JS | provarlo |
| `/fase-3-home-statica` | **due home**: `/` (A «Lo studio») e `/opzione-b` (B «Il cantiere»), senza animazioni | **A / B / mix** → `DECISIONI.md` n. 1 |
| `/fase-4-contenuti` | progetti, servizi con FAQ, studio, contatti | — |
| `/fase-5-movimento` | Lenis, transizioni, il blocco speciale dell'opzione scelta; l'altra route si toglie | — |
| `/fase-6-seo-geo` | meta, sitemap, robots, JSON-LD, llms.txt | dominio (n. 2), crawler (n. 9) |
| `/fase-7-legal` | privacy, cookie, note legali; nessun banner (analytics senza cookie) | dati societari |
| `/fase-8-collaudo` | script + checklist, rapporto in `STATO.md` | — |

Vercel: `vercel link` dopo la fase 1, quando c'è qualcosa da vedere. Ogni push → anteprima.
Sessione nuova? `claude` (stessi `--add-dir`) e la fase che `STATO.md` indica.
