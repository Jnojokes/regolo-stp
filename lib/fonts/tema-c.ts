import localFont from 'next/font/local'

/**
 * Opzione C «Halston» — il sistema del template **Halston**
 * (https://halston-architecture-template.webflow.io/), che il committente ha
 * chiesto per nome dicendo *«l'opzione 3 la voglio identica a questo sito»*.
 *
 * ## Due famiglie, e la divisione del lavoro è misurata
 *
 * Contati i nodi di testo sul sito vero con Playwright:
 * **General Sans su 298 nodi, JetBrains Mono su 34.** La mono non è
 * decorazione e non è un vezzo da «technical look»: porta **i valori**
 * (`48+ HOUSES`, `62+ INTERIORS`, `AVG. 14 MONTHS`) e le micro-etichette
 * maiuscole, che su quella pagina sono **270 occorrenze** di `text-transform:
 * uppercase`. Dove c'è un dato o un'etichetta c'è la mono; tutto il resto è
 * la proporzionale.
 *
 * ## La licenza, e va detta
 *
 * **General Sans non è OFL.** È di Indian Type Foundry, distribuito su
 * Fontshare sotto la loro licenza gratuita, che permette l'uso commerciale e
 * il self-hosting. Tutto il resto del repo viene da fontsource in OFL, quindi
 * questa è una **deviazione dichiarata**: la ragione è che il committente ha
 * chiesto quel sito «identico» e General Sans è il suo carattere. Il sostituto
 * OFL più vicino sarebbe Hanken Grotesk o Be Vietnam Pro, ma non sono lo
 * stesso carattere e la differenza si vede sulle maiuscole strette, che qui
 * sono ovunque.
 *
 * **Trappola della sorgente**: Fontshare serve i file da URL con un hash che
 * cambia quando ITF ricompila. Per questo `scripts/genera-font.sh` ricava
 * l'indirizzo dal loro CSS a ogni generazione invece di tenerlo scritto.
 *
 * ## Perché la monospace torna in repo
 *
 * Era uscita alla fase 3 bis con una motivazione scritta — «niente monospace
 * per le etichette dati», il cluster n. 5 della lista di calibrazione, −31 KB.
 * Quel divieto difendeva il progetto da un **default**: la mono che compare
 * perché «fa tecnico». Qui non è un default, è il carattere che quella pagina
 * usa per i suoi valori, e il committente ha chiesto quella pagina. Un peso
 * solo, 400, e **8.516 byte**: un quarto di quello che pesava JetBrains Mono
 * intera la prima volta.
 *
 * 24.332 + 8.516 = **32,8 KB** per tutta la proposta.
 */
const generalSans = localFont({
  variable: '--font-general-sans',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
  preload: false,
  src: [
    {
      path: '../../public/fonts/generalsans-regolo-latin-var.woff2',
      weight: '400 600',
      style: 'normal',
    },
  ],
})

const jetbrainsMono = localFont({
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  preload: false,
  src: [
    {
      path: '../../public/fonts/jetbrainsmono-regolo-latin-400.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
})

export const fontsThemeC = `${generalSans.variable} ${jetbrainsMono.variable}`
