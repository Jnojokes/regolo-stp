import localFont from 'next/font/local'

/**
 * Opzione B «Il registro» — **Chivo**, una famiglia sola per tutto.
 *
 * Dal provino: «il più massiccio e sicuro dei grotteschi; ottima presenza».
 * **Non ha l'asse di larghezza, e in B è giusto così**: il display di B è
 * 43,6 px, non 152, e non deve stringersi per stare in riga — quindi non paga
 * un asse che non usa. Diventa anche una differenza di *meccanismo* fra i due
 * temi, che è quello che li tiene distinguibili: **A comprime, B no.**
 *
 * Niente monospace. Le cifre di Chivo sono già di larghezza fissa e la famiglia
 * ha `tnum`: le colonne di numeri si incolonnano con una riga di CSS
 * (`font-variant-numeric: tabular-nums`) invece che con 31 KB di JetBrains Mono
 * — che era anche il carattere di «SEZ. 01 — IL PUNTO DI PARTENZA», cioè una
 * delle tell del cluster n. 5.
 *
 * Peso di default di Chivo: **500**. Come per Archivo, il `font-weight` va
 * sempre dichiarato. Il file viene da `scripts/genera-font.sh`: 33,2 → 27,0 KB.
 */
const chivo = localFont({
  variable: '--font-chivo',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
  // Turbopack mette i `@font-face` dei due temi nello stesso chunk CSS e Next
  // precarica tutto quello che ci trova: senza questo, l'opzione A si
  // scaricherebbe anche Chivo. `/opzione-b` è una rotta di proposta e sparisce
  // alla fase 5, quindi il preload lo perde lei, non la produzione.
  preload: false,
  src: [
    {
      path: '../../public/fonts/chivo-regolo-latin-var.woff2',
      weight: '400 600',
      style: 'normal',
    },
  ],
})

export const fontsThemeB = chivo.variable
