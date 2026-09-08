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
| `contrasto-dom.mjs` | ogni coppia testo/fondo **calcolata sul DOM vero** di **otto** rotte (le tre home + cinque interne), non sui token | `sotto soglia: 0` |
| `sweep.mjs` | screenshot a scorrimento di **A, C e D** a 1440 e 390, più overflow orizzontale e bersagli sotto i 40 px | `sfora: []` a 1440 e `scrollW == clientW` a 390 su tutte e tre. `path.[object` sulla mappa è un falso positivo noto (è un figlio SVG misurato sul documento). Gli screenshot li scrive **nella cartella da cui gira** e sono ignorati dal git: quelli che restano si scelgono a mano e vanno in `kit/reference/_dopo/` |
| `nojs-rotte.mjs` | **sei** rotte senza JS: testo reso, passi del brief, form, segnaposto | **i tre funnel sono diversi, ed è lì che si legge**: su **D** `passiVisibili: 4` e `contaBrief: passo 2 di 5`, perché l'indice del monografico *è* il passo 1 e la scelta arriva al form senza una riga di JavaScript; su **A** e **C** `passiVisibili: 5` e `passo 1 di 5`, perché nessuna delle due chiede niente sopra la piega. `overflow: false` ovunque |
| `interlinee.mjs` | ogni testo **che va a capo**, su 8 rotte × 2 larghezze, contro la **soglia d'inchiostro della stringa vera** (`soglie.json`, generato da `soglie.py` con fontTools sui contorni dei file di `public/fonts`) | `nessuno sotto la soglia`. Dice anche **quali due caratteri** si toccherebbero, che è dove il difetto si vede. Un'eccezione dichiarata: `.hero-payoff` di A, quattro righe spezzate a mano. Esce con codice 1 se cade |
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

**`nojs.mjs` è stato cancellato.** Confrontava A e B senza JavaScript e interrogava `.quota`,
`.pannello`, `.riga` e `--regolo-asse`, cioè oggetti di B, C e D. Uscita B (`DECISIONI.md` n. 39)
gli restava una rotta sola e metà delle domande erano su classi che non esistono più, mentre
`nojs-rotte.mjs` fa la stessa prova su tutte le rotte e meglio. Uno script che gira e non guarda
niente è peggio di uno che non c'è: si legge il suo «ok» e si crede di aver controllato.

`scripts/contrasto.mjs` (fuori da questa cartella) è un'altra cosa: calcola i rapporti fra due
valori esadecimali, e serve **prima** di scrivere un token. Questo qui li misura **dopo**, in
pagina, ed è quello che trova i difetti veri — un token può essere giusto e il testo uscire
lo stesso bianco su bianco, che è esattamente quello che è successo con l'inversione di B.

Per LCP, CLS e Lighthouse si usa il **Chrome DevTools MCP** (`performance_start_trace` e
`lighthouse_audit`, `device: mobile`), con `emulate` su Slow 4G + CPU 4× + viewport 390×844×3.
