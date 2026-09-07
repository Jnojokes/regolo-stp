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
