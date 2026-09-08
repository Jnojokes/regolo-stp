import localFont from 'next/font/local'

/**
 * Opzione B «Lo strumento» — **Anybody**, una famiglia sola per tutto.
 *
 * ## Perché si è cambiato carattere (fase 3 ter, `DECISIONI.md` n. 30)
 *
 * Non perché Chivo fosse brutto: perché **si scambiava con Archivo**, ed è un
 * numero, non un'impressione. Misurato sui due file veri di `public/fonts/`:
 *
 * ```
 *              file        cap-height   x-height   x/cap    Δ da Archivo
 * Archivo (A)  40.692 B      0,686       0,526     0,767        —
 * Chivo   (B)  26.980 B      0,686       0,511     0,745      −2,9 %
 * Anybody      19.488 B      0,675       0,593     0,879     +14,6 %
 * ```
 *
 * **Archivo e Chivo hanno la cap-height identica al millesimo.** Alla stessa
 * dimensione nominale depositano la stessa quantità di nero: è per questo che
 * in una schermata sono lo stesso carattere. Il criterio che resta scritto
 * anche se un giorno la famiglia cambia: **la famiglia di B si sceglie sul
 * Δ x/cap rispetto ad Archivo, e sotto il 5 % non si sceglie.** Ordine di
 * ripiego già pesato: Encode Sans (−4,9 %) → Zilla Slab, ma solo riaprendo la
 * regola con cui è uscito Geist (è il carattere di marca di Mozilla). **Non**
 * Bitter: misurato, è *più vicino* ad Archivo di quanto lo sia Chivo (−1,4 %),
 * cioè la mossa ovvia «cambio genere, prendo uno slab» avrebbe *ridotto* la
 * differenza percepita.
 *
 * `PROVINI.md` lo descrive per quello che è: «grottesco **meccanico** — fianchi
 * piatti sulla `e`, `z` quadrata, aperture chiuse. **Nessun'altra famiglia
 * della lista somiglia a uno strumento**». La `a` non ha coda, i contrappunzoni
 * sono rettangoli.
 *
 * ## Tre cose verificate, non supposte
 *
 * **1. L'asse di larghezza è bloccato a 100 dentro il file.** Anybody in
 * sorgente ha `wdth 50-150`, cioè lo stesso trucco di Archivo; `genera-font.sh`
 * lo istanzia via e il file generato contiene `fvar = [wght 400-600]` e basta.
 * «A comprime, B no» smette di essere una regola di CSS che qualcuno può
 * disapplicare e diventa un fatto fisico: `font-stretch: 75%` in B non ha su
 * cosa agire.
 *
 * **2. Costa meno di quello che c'era.** 19.488 byte contro i 26.980 di Chivo:
 * **−7,3 KB sul percorso critico di un LCP che è testo**, e −21,2 KB rispetto
 * ad Archivo. È l'unica scelta della fase che *restituisce* budget.
 *
 * **3. La trappola del peso di default sparisce, ma la regola resta.** La
 * sorgente ha `usWeightClass 100` — con Anybody grezzo un corpo senza
 * `font-weight` uscirebbe filiforme, che è peggio del semibold di Archivo e
 * Chivo. Dopo `varLib.instancer wght=400:600` il valore diventa **400**
 * (misurato). Il `font-weight` esplicito in `@layer base` resta comunque.
 *
 * Niente monospace: `tnum` c'è (l'assert di `genera-font.sh` lo verifica) e le
 * colonne di numeri si incolonnano con `font-variant-numeric: tabular-nums`.
 * Il provino ai corpi veri di B — 43,6 · 30,6 · 17 · 13,4, su tavola nera e su
 * foglio bianco — è `kit/reference/_provini/provino-b2-1440.jpeg`: la riserva
 * di `PROVINI.md` («a 17 px il corpo è un po' strano») era formata su un'altra
 * domanda, il display di A a 96 px.
 */
const anybody = localFont({
  variable: '--font-anybody',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
  // Turbopack mette i `@font-face` dei due temi nello stesso chunk CSS e Next
  // precarica tutto quello che ci trova: senza questo, l'opzione A si
  // scaricherebbe anche Anybody. `/opzione-b` è una rotta di proposta e sparisce
  // alla fase 5, quindi il preload lo perde lei, non la produzione.
  preload: false,
  src: [
    {
      path: '../../public/fonts/anybody-regolo-latin-var.woff2',
      weight: '400 600',
      style: 'normal',
    },
  ],
})

/**
 * Il mono tecnico — **e sotto i 14 px, mai come contenuto**.
 *
 * La fase 3 bis aveva tolto JetBrains Mono con un argomento giusto: «monospace
 * per le piccole etichette dati» è la tell n. 5 della lista di calibrazione, e
 * le cifre di un grottesco con `tnum` si incolonnano lo stesso. Quell'argomento
 * vale ancora **contro un default**. Qui il brief visivo è cambiato: le tre
 * reference scelte dal committente hanno tutte lo stesso gesto tipografico
 * centrale — un editoriale enorme accanto a una mono minuscola — e una di loro
 * lo scrive per esteso: «la mono segnala *tecnico / normativo / specifica* e
 * sta sotto i 14 px, così legge come annotazione e non come contenuto». La
 * skill lo prevede: *dove il brief fissa una direzione la si segue alla
 * lettera, anche se chiede uno di questi look.*
 *
 * IBM Plex Mono e non JetBrains: è disegnata per la documentazione tecnica,
 * non per il codice, e a 10-12 px resta neutra invece di fare la vezzosa.
 * **13,5 KB**, un peso solo, e non ha `tnum` perché non le serve — una
 * monospace ha già tutte le cifre della stessa larghezza.
 */
const plexMono = localFont({
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  preload: false,
  src: [
    {
      path: '../../public/fonts/plexmono-regolo-latin-400.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
})

export const fontsThemeB = `${anybody.variable} ${plexMono.variable}`
