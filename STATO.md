# STATO — REGOLO STP

> La memoria fra una sessione e l'altra. Si aggiorna a ogni stop di fase, prima di fermarsi.

| | |
|---|---|
| Ultima fase chiusa | kick-off (kit pronto, 07/09/2026) |
| Prossima fase | `/fase-0-avvio` |
| Deploy | nessuno |
| Budget | — |

## Fatto

| Data | Fase | Cosa | Note |
|---|---|---|---|
| 03/09/2026 | kick-off | reference (scheda `studi-tecnici`), architettura, CLAUDE.md | chat Cowork |
| 07/09/2026 | kick-off | due prototipi di homepage (A «Lo studio», B «Il cantiere») in `opzioni/`, kit completo, PROMPTS | per la call di vendita di FT |

## Aperto

| Cosa | Da chi dipende | Blocca |
|---|---|---|
| A / B / mix | cliente, in call | fase 5 (movimento) — non le fasi 1-4 |
| Dominio | cliente | fase 6 (SEO) |
| Foto e dati dei progetti | cliente | fase 4 (contenuti reali) |

## Collaudo

| Controllo | Esito | Data |
|---|---|---|
| `seo-check.mjs` | — | |
| `collaudo.py` | — | |
| `cloaking-check.sh` (3 user-agent) | — | |
| Lighthouse mobile ×4 | — | |
| Rifiuto consenso → zero richieste ai terzi | n/a se analytics senza cookie | |
| Tastiera | — | |
| Telefono vero | — | |
| `prefers-reduced-motion` | — | |
