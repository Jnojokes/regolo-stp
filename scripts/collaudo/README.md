# Collaudo — i sei script che si lanciano a ogni fine passata

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
| `contrasto-dom.mjs` | ogni coppia testo/fondo **calcolata sul DOM vero** di **nove** rotte (le quattro home + cinque interne), non sui token | `sotto soglia: 0`. Alla fine della 3 quater: **145 coppie distinte, zero sotto soglia** |
| `sweep.mjs` | screenshot a scorrimento di **A, B, C e D** a 1440 e 390, più overflow orizzontale e bersagli sotto i 40 px | `sfora: []` a 1440 e `scrollW == clientW` a 390 su tutte e quattro. `path.[object` sulla mappa è un falso positivo noto (è un figlio SVG misurato sul documento). Gli screenshot li scrive **nella cartella da cui gira** e sono ignorati dal git: quelli che restano si scelgono a mano e vanno in `kit/reference/_dopo/` |
| `nojs.mjs` | le due home **senza JavaScript**: quote, pannelli visibili, payoff, asse | in B **un solo pannello** visibile; in A zero (non ne ha) |
| `nojs-rotte.mjs` | **sette** rotte senza JS: testo reso, passi del brief, form, segnaposto | dove il passo 1 sta **fuori** dal form (B, C, D) `passiVisibili: 4` e `contaBrief: passo 2 di 5` — è la prova che il registro della hero propaga la scelta **senza una riga di JavaScript**; su A e `/contatti` `passiVisibili: 5` e `passo 1 di 5`. `overflow: false` ovunque |
| `colata.mjs` | **il gesto di C**, che una schermata sola non sa collaudare: la scheggia a cinque quote di scorrimento, a 1440 e a 390, più i due degradi | apertura **monotona da 0 a 1** (0 a documento fermo, 1 a una schermata), marchio e targhetta del segnaposto **visibili a ogni quota** — sono i due strati registrati e la decisione n. 27 (b) —, `moto ridotto` sul **fotogramma finito** e non sulla scheggia chiusa, e il gesto che funziona **anche senza JavaScript**, perché è CSS. Esce con codice 1 se una sola di queste cade |
| `peso.mjs` | byte **sul filo** fino a `load`, e cosa arriva dopo | A: ~283 KB e 17 richieste fino a `load`; il video della hero deve comparire **solo** in `dopo` |

**Due salti espliciti in `contrasto-dom.mjs`, e sono contratti** (`DECISIONI.md` n. 38):
`.sr-only` (testo che esiste solo per il lettore di schermo, e non ha un fondo da misurare) e
`[data-decorativo]` (i contatori tono su tono di D, a 1,48:1 di proposito). Un elemento che porta
informazione **non può** avere quell'attributo: se lo prende, il collaudo smette di guardarlo.
La regola gemella vale a monte — *quello che il collaudo non sa misurare va reso misurabile*: lo
script risale gli antenati cercando un `background-color`, quindi un `linear-gradient` o una
fotografia lo rendono cieco. Per questo il velo sotto la testata di C e D è un colore vero e il
gradiente morbido sta su un `::after` decorativo.

`scripts/contrasto.mjs` (fuori da questa cartella) è un'altra cosa: calcola i rapporti fra due
valori esadecimali, e serve **prima** di scrivere un token. Questo qui li misura **dopo**, in
pagina, ed è quello che trova i difetti veri — un token può essere giusto e il testo uscire
lo stesso bianco su bianco, che è esattamente quello che è successo con l'inversione di B.

Per LCP, CLS e Lighthouse si usa il **Chrome DevTools MCP** (`performance_start_trace` e
`lighthouse_audit`, `device: mobile`), con `emulate` su Slow 4G + CPU 4× + viewport 390×844×3.
