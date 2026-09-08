# Provini tipografici — 07/09/2026

> Non si scelgono i caratteri a memoria. Quattordici famiglie **OFL, scaricabili in woff2
> latino da fontsource**, impaginate con le parole vere del brief (le più lunghe: «Mettere in
> sicurezza», «Ristrutturare, ampliare, recuperare», «efficientamento», «coordinamento
> sicurezza», «1.240 m²») ai corpi veri (96 px display, 34 px medio, 17 px corpo), sul fondo
> candidato, e **guardate**. Le tre pagine di prova sono qui accanto (`provino*.html`) e si
> riaprono con `python3 -m http.server` dentro questa cartella dopo aver riscaricato i woff2.

## Pesi reali, misurati (woff2, subset latino, da cdn.jsdelivr.net/fontsource)

| Famiglia | Assi | KB |
|---|---|---|
| Familjen Grotesk | wght | **18,9** |
| Host Grotesk | wght | 20,3 |
| Public Sans | wght | 26,8 |
| Zilla Slab | 400 statico | 26,5 |
| Young Serif | 400 statico | 27,0 |
| Encode Sans | **wdth + wght** | 44,6 |
| Geist | wght | 29,4 |
| Instrument Sans (in repo) | wght | 30,1 |
| Chivo | wght | 33,2 |
| Bitter | wght | 34,1 |
| Archivo | wght | 34,9 |
| Schibsted Grotesk | wght | 46,8 |
| Anybody | **wdth + wght** | 56,9 |
| Archivo | **wdth + wght** | **90,1** |
| Fraunces | wght + soft + wonk | 67,3 |
| Source Serif 4 | wght + opsz | 122,4 |
| Newsreader | wght + opsz | 132,0 |

Per confronto, quello che il repo carica oggi: A = Instrument Serif 30,7 + Instrument Sans
30,1 = **60,8 KB**; B = Bricolage 76,9 + Instrument Sans 30,1 + JetBrains Mono 31,3 =
**138,3 KB**.

## Cosa si vede, guardando i provini

`provini-1440-1.jpeg` · `provini-1440-2.jpeg` · `provini-1440-3.jpeg`

| Famiglia | Cosa fa a 96 px | Verdetto |
|---|---|---|
| **Anybody** 700 | grottesco **meccanico**: fianchi piatti sulla `e`, `z` quadrata, aperture chiuse. Nessun'altra famiglia della lista somiglia a uno strumento. Ha l'asse di larghezza 50-150 % | candidato display forte; a 17 px il corpo è un po' strano — resta display |
| **Archivo** 700/500 | grottesco americano largo e ben costruito, autorevole senza gridare; asse di larghezza 62-125 % | candidato display **e** testo |
| **Chivo** 700 | il più massiccio e sicuro dei grotteschi; ottima presenza | candidato display; nessun asse di larghezza |
| Encode Sans 600 | DIN-oide, corretto, un po' anonimo | ripiego |
| Public Sans 700 | è il carattere del design system federale americano: neutro fino all'istituzionale | no: neutralità non è identità |
| Geist 600 | pulito, e **è il carattere di Studio Foundry**: usarlo sarebbe copiare la reference | escluso per questo |
| Schibsted / Host / Familjen | grotteschi nuovi e piacevoli, sapore «startup editoriale» | no |
| **Young Serif** 400 | serif display **a basso contrasto**, grosso, terminali svasati: l'anti-didone. Molto riconoscibile | tenuto in riserva: sapore artigianale, rischioso su una STP di ingegneria |
| Zilla Slab 400 | slab tecnico, contrasto basso, aria da dattiloscritto | riserva, ma è il carattere di marca di Mozilla |
| Bitter 600 | slab pesante e solido | riserva |
| **Newsreader** 500 · Source Serif 4 600 | transizionali/didone-oidi: contrasto alto, grazie fini | **esclusi: sono il cluster n. 1**, cioè esattamente Instrument Serif con un altro nome |

## Il provino che decide: l'asse di larghezza a 390 px

`provini-390-larghezza.jpeg` — display 44 px, viewport 390 px, le tre parole più lunghe del sito.

| | wdth 100 % | wdth 80 % | wdth 62 % |
|---|---|---|---|
| Anybody | «Ristrutturare,» **sfonda** i 390 px | entra | entra, molto stretto e scuro |
| Archivo | entra | entra con agio | entra, condensato e limpido |
| Encode Sans | entra | entra | — |
| Chivo (nessun asse) | **sfonda** di poco | — | — |

Conclusione, e non è una preferenza: su un telefono da 390 px il contrasto di scala estremo
si ottiene **solo** se il display può stringersi. È lo stesso gesto del disegnatore che
comprime la scritta per farla stare dentro una quota. Con un asse di larghezza il display può
stare a 44-52 px dove senza asse resterebbe a 36. Le due famiglie che lo permettono nel
budget sono **Archivo** (90,1 KB con l'asse, 34,9 senza) ed **Encode Sans** (44,6 KB).

## Il provino che elimina un font: le cifre tabellari

`provini-cifre-tabellari.jpeg` — la riga `111` a confronto, con e senza
`font-variant-numeric: tabular-nums`, su Archivo, Chivo e Anybody.

Le tre famiglie hanno **cifre già di larghezza fissa**: le colonne di numeri allineate a
destra si incolonnano perfettamente senza `tabular-nums` e, soprattutto, **senza una famiglia
monospace**. AS Associates fa così (nessun mono in tutto il sito, e la sua tabella `Site Area
/ Floor Area` è allineata al pixel).

Quindi **JetBrains Mono esce**: −31,3 KB, e insieme sparisce una delle tell del cluster n. 5
(«monospace per le piccole etichette dati»). Le cifre dei dati duri si compongono con
`font-variant-numeric: tabular-nums` sul grottesco, che è una riga di CSS.

---

# Fase 3 ter (08/09/2026) — il carattere di B si è scelto su una **metrica**

I provini di sopra rispondevano a una domanda sola: *quale carattere regge il display di A a
96 px?* Per l'opzione B la domanda è un'altra — *quale carattere non si scambia con Archivo in
una schermata?* — e la risposta non si vede a occhio: si misura.

## La misura che spiega il difetto

Presa con fontTools **sui due file veri di `public/fonts/`**, non sulle sorgenti:

| | file nel repo | cap-height | x-height | **x/cap** | **Δ da Archivo** | peso di default |
|---|---|---|---|---|---|---|
| **Archivo** (A) | 40.692 B | **0,686** | 0,526 | 0,767 | — | 600 |
| **Chivo** (B fino a ieri) | 26.980 B | **0,686** | 0,511 | 0,745 | −2,9 % | 500 |
| Bitter | 27.880 B | 0,698 | 0,528 | 0,756 | −1,4 % | 100 |
| Zilla Slab 400 | 23.104 B ×2 pesi | 0,650 | 0,445 | 0,685 | −10,7 % | — |
| Young Serif 400 | 24.472 B | 0,750 | 0,500 | 0,667 | −13,1 % | — |
| **Anybody** (`wdth` bloccato 100) | **19.488 B** | 0,675 | **0,593** | **0,879** | **+14,6 %** | 400 |

**Archivo e Chivo hanno la cap-height identica al millesimo: 0,686.** Alla stessa dimensione
nominale depositano la stessa quantità di nero, ed è per questo che a occhio sono lo stesso
carattere. Non era un'impressione di FT: era una metrica.

E **Bitter — la mossa ovvia, «cambio genere, prendo uno slab» — è più vicino ad Archivo di
quanto lo sia Chivo.** Sceglierlo avrebbe *ridotto* la differenza percepita mentre si alternano
due schede in call. È il motivo per cui il criterio conta più della famiglia:

> **La famiglia di B si sceglie sul Δ x/cap rispetto ad Archivo, e sotto il 5 % non si sceglie.**

Ordine di ripiego, già pesato: **Encode Sans** (−4,9 %, 37,9 KB) → **Zilla Slab**, ma solo
riaprendo la regola con cui è uscito Geist (è il carattere di marca di Mozilla). Non Bitter,
non Young Serif, non Chivo: sono le tre che il numero esclude.

## I due provini nuovi

| File | Cosa mette a confronto |
|---|---|
| `provino-b.html` → `provino-b-1440.jpeg` | Archivo e Chivo (i due controlli) contro Bitter, Zilla Slab, Young Serif e Anybody, con **le parole vere di B** — la domanda della hero, un titolo di servizio, il corpo, una tabella a cinque colonne e la riga dei ruoli |
| `provino-b-cifre.html` | le cifre incolonnate con e senza `tabular-nums`, e la riga vera a 390 px |
| `provino-b2.html` → `provino-b2-1440.jpeg` | **la prova che decide**: Anybody, Encode Sans, Chivo e Archivo ai corpi veri di B (43,6 · 30,6 · 17 · 13,4) e **sui due piani**, tavola nera a sinistra e foglio bianco a destra |

`provino-b2` esiste per una ragione precisa: la riga di questa scheda che dava Anybody per
«**a 17 px il corpo è un po' strano — resta display**» era formata rispondendo alla *prima*
domanda, il display di A a 96 px. B non ha un display a 96 px. Ai suoi corpi veri, su tutti e
due i piani, il corpo regge — e la x-height alta lavora **a favore** della tabella, che è dove
B vive.

Verificato con la pipeline vera del repo (`varLib.instancer` + `pyftsubset`, stessa `LAT` e
stessa `FEAT` di `scripts/genera-font.sh`): il file generato contiene **`fvar = [wght 400-600]`
e basta** — l'asse di larghezza è istanziato via, quindi «A comprime, B no» non è più una regola
di CSS che si può disapplicare; `usWeightClass` esce a **400** (la sorgente è 100: senza la
pipeline il corpo uscirebbe filiforme, non semibold); `tnum` c'è, quindi niente monospace.

> I `woff2` di prova **non si committano**, come le altre volte: si riscaricano da fontsource
> con gli URL in `scripts/genera-font.sh` e si riapre la cartella con
> `python3 -m http.server`. Restano gli HTML e i JPEG, che sono le prove.
