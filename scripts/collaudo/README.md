# Collaudo — i sette script che si lanciano a ogni fine passata

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
| `sweep.mjs` | screenshot a scorrimento di **A, B e C** a 1440 e 390, più overflow orizzontale e bersagli sotto i 40 px | `sfora: []` e `scrollW == clientW` su tutte e sei le viste. Le **due eccezioni** — i figli di un `<svg>`, che `getBoundingClientRect()` misura senza il `viewBox`, e il mirino CAD, che è un punto in `position: fixed` sul puntatore — non sono un `continue` silenzioso: finiscono in `scusati`, si contano e si stampano col motivo. Gli screenshot li scrive **nella cartella da cui gira** e sono ignorati dal git: quelli che restano si scelgono a mano e vanno in `kit/reference/_dopo/` |
| `nojs-rotte.mjs` | **sei** rotte senza JS: testo reso, passi del brief, form, segnaposto | `passiVisibili: 5` e `contaBrief: passo 1 di 5` su **tutte e tre** le home, `overflow: false` ovunque. **Attenzione a cosa vuol dire adesso**: alla 3 ter una delle proposte partiva da `passo 2 di 5`, perché il suo indice *era* il passo 1 e la scelta arrivava al form senza una riga di JavaScript. Quella proposta non c'è più (`DECISIONI.md` n. 39) e nessuna delle tre chiede niente sopra la piega, quindi tre volte `5` è il valore **giusto** e non un difetto di misura. Se un giorno una proposta ricomincia a precompilare il passo 1, il numero deve scendere a 4 su quella rotta: è la prova che il funnel funziona senza JS |
| `interlinee.mjs` | ogni testo **che va a capo**, su 8 rotte × 2 larghezze, contro la **soglia d'inchiostro della stringa vera** (`soglie.json`, generato da `soglie.py` con fontTools sui contorni dei file di `public/fonts`) | `nessuno sotto la soglia`. Dice anche **quali due caratteri** si toccherebbero, che è dove il difetto si vede. Un'eccezione dichiarata: `.hero-payoff` di A, quattro righe spezzate a mano. Esce con codice 1 se cade |
| `peso.mjs` | byte **sul filo** fino a `load`, e cosa arriva dopo | A ~326 KB / 18 richieste · B ~321 / 19 · C ~303 / 17 · `/servizi/strutture` ~218 / 12. Il video della hero deve comparire **solo** in `dopo`. Le 40 KB di Archivo che scendono anche su B e su C sono il debito dichiarato del preload (Turbopack fonde i `@font-face` dei tre temi in un chunk solo) e spariscono alla fase 5 con le rotte non scelte |
| `cursore.mjs` | **il mirino CAD dell'opzione B**, che una schermata sola non sa collaudare: quattro stati (carta · elemento interattivo · campo di testo · prima del primo movimento) e cinque degradi | `21 prove su 21`. La prova che conta non è «il mirino si vede»: è **«dove il mirino non c'è, il puntatore di sistema è tornato»** — `cursor: none` nasconde il puntatore, e se il sostituto non compare il visitatore ha una pagina che non sa usare. Verifica anche che la lettura di coordinate sia la posizione **vera** in millimetri, non un numero decorativo. Esce con codice 1 se una sola prova cade |
| `collisioni.mjs` | i **nomi di classe** di B e C che un foglio **condiviso** stila con un selettore non qualificato | `nessuna classe … fuori da quelle dichiarate`. Esiste per un difetto che ha visto il committente e non il collaudo: la galleria di B si chiamava `.galleria`, che in `pagine.css` è la griglia a **tre colonne** della scheda progetto — le quattro colonne finivano in 435 px invece di 1.400 e la riga di licenza sbordava sopra la fotografia accanto. I sette prefissi condivisi **per scelta** (brief, barre, segnaposto, `btn`, `wrap`, occhiello, `da-cliente`) sono dichiarati nel file, con il motivo. Esce con codice 1 |
| `soglie.py` | non è un collaudo: **genera** `soglie.json` leggendo i contorni dei font con fontTools. Si rilancia **quando cambiano i font**, e `interlinee.mjs` si ferma se le impronte non corrispondono più | quattro file, e la riga `impronte tutte corrispondenti` in testa a `interlinee.mjs` |

**Due salti espliciti in `contrasto-dom.mjs`, e sono contratti** (`DECISIONI.md` n. 38):
`.sr-only` (testo che esiste solo per il lettore di schermo, e non ha un fondo da misurare) e
`[data-decorativo]` (le linee di costruzione tratteggiate e il numerone di fase al 12 % di B). Un elemento che porta
informazione **non può** avere quell'attributo: se lo prende, il collaudo smette di guardarlo.
La regola gemella vale a monte — *quello che il collaudo non sa misurare va reso misurabile*: lo
script risale gli antenati cercando un `background-color`, quindi un `linear-gradient` o una
fotografia lo rendono cieco. Per questo ogni fondo di banda è un colore vero.

**Il piano scuro, e perché è la trappola che torna.** `@theme inline` emette
`--color-ink: var(--regolo-ink)` su `:root`, e quel `var()` si risolve **una volta sola, lì**.
Un blocco che sta su un fondo scuro e ridichiara solo `--regolo-ink` non muove `--color-ink` di
un pixel: metà del CSS condiviso continua a leggere il valore della radice. In questa passata
`contrasto-dom.mjs` l'ha ripresa **due volte** — 16 testi sotto soglia sull'opzione C, fra cui
`passo 1 di 5` a **1,3:1**, inchiostro su antracite — e la correzione è sempre la stessa:
ridichiarare **tutti e due** i prefissi sul piano, con il valore letterale. Vale anche per i
token derivati: `--regolo-quota-colore: var(--regolo-muted)` ha la stessa trappola un piano più
sotto, e va riscritto anche lui.

**E il verso di un token conta.** Sull'opzione B `--regolo-ink` portava il valore *esatto* della
reference (3,49:1) con un commento che diceva «solo ≥ 24 px». Un commento non è un vincolo:
nove testi lo ereditavano senza sapere di essere piccoli. Adesso `--regolo-ink` è il valore che
passa sempre e la tinta esatta sta in `--regolo-ink-display`, che **solo** il display chiede.
Il default deve essere lo stato che va bene anche quando nessuno ci pensa — è la stessa regola
dell'`initial-value` delle proprietà registrate.

**`colata.mjs` e `volume.mjs` sono stati cancellati** insieme ai gesti che misuravano: la
scheggia allo scorrimento e il volume in WebGL vivevano nelle due proposte precedenti, rifatte
da zero sulle due reference indicate dal committente. Un collaudo che interroga classi che non
esistono più passa sempre, e passa a vuoto.

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
