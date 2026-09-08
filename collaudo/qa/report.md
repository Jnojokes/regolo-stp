# QA nel browser — http://localhost:3001 · 2026-09-08

| Esito | Controllo | Dettaglio |
|---|---|---|
| ✔ | Nessuna richiesta di misurazione prima del consenso |  |
| ✔ | Banner non trovato: sito senza cookie (nessun banner richiesto) oppure passa --rifiuta <selettore> |  |
| ✔ | Screenshot a 6 larghezze per 1 pagine in collaudo/qa — da guardare, uno per uno |  |
| ✔ | Nessuno scroll orizzontale |  |
| ✔ | CTA (chiama / preventivo / contatti) nel primo viewport a 390 (844 px) e 1440 (760 px utili, laptop) |  |
| ✘ | Tap target ≥ 24 px a 390 (WCAG 2.5.8) | /: progetti 16×57<br>/: servizi 16×57<br>/: studio 16×57<br>/: contatti 16×57 |
| ⚠ | Bottoni e link sotto i 44 px a 390 (obiettivo Apple/Material) | /: B 24×44<br>/: C 24×44 |
| ✘ | Input ≥ 16 px a 390 (iOS non fa zoom) | /: intervento 14.2px<br>/: intervento 14.2px<br>/: intervento 14.2px<br>/: intervento 14.2px<br>/: intervento 14.2px<br>/: intervento 14.2px |
| ✔ | Console senza errori |  |
| ✔ | Nessuna richiesta fallita (4xx/5xx), nessun mixed content |  |
| ✔ | axe-core: nessuna violazione serious/critical (WCAG 2.2 AA) |  |
| ✔ | prefers-reduced-motion: pagina completa, nessuna animazione infinita |  |
| ✔ | Tastiera: il fuoco si muove ed è visibile |  |
