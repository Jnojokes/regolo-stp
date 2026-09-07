# Collaudo — i cinque script che si lanciano a ogni fine passata

Sono gli script con cui la fase 3 bis è stata verificata. Stavano in uno scratchpad di
sessione, cioè sparivano insieme alla sessione: qui restano, e la prossima passata non deve
riscriverli.

Girano tutti su **`localhost:3001`, build di produzione**, e vogliono Playwright:

```bash
npm run build && npx next start -p 3001 &
cd scripts/collaudo && npm i playwright && npx playwright install chromium   # una volta sola
```

| Script | Cosa misura | Cosa deve dire |
|---|---|---|
| `contrasto-dom.mjs` | ogni coppia testo/fondo **calcolata sul DOM vero** di sette rotte, non sui token | `sotto soglia: 0`. Alla fine della 3 bis: 72 coppie distinte |
| `sweep.mjs` | screenshot a scorrimento di A e B a 1440 e 390, più overflow orizzontale e bersagli sotto i 40 px | `sfora: []`. `path.[object` sulla mappa è un falso positivo noto (è un figlio SVG misurato sul documento) |
| `nojs.mjs` | le due home **senza JavaScript**: quote, pannelli visibili, payoff, asse | in B **un solo pannello** visibile; in A zero (non ne ha) |
| `nojs-rotte.mjs` | cinque rotte senza JS: testo reso, passi del brief, form, segnaposto | `passiVisibili: 5` e `contaBrief: passo 1 di 5` dove c'è il brief; `overflow: false` ovunque |
| `peso.mjs` | byte **sul filo** fino a `load`, e cosa arriva dopo | A: ~283 KB e 17 richieste fino a `load`; il video della hero deve comparire **solo** in `dopo` |

`scripts/contrasto.mjs` (fuori da questa cartella) è un'altra cosa: calcola i rapporti fra due
valori esadecimali, e serve **prima** di scrivere un token. Questo qui li misura **dopo**, in
pagina, ed è quello che trova i difetti veri — un token può essere giusto e il testo uscire
lo stesso bianco su bianco, che è esattamente quello che è successo con l'inversione di B.

Per LCP, CLS e Lighthouse si usa il **Chrome DevTools MCP** (`performance_start_trace` e
`lighthouse_audit`, `device: mobile`), con `emulate` su Slow 4G + CPU 4× + viewport 390×844×3.
