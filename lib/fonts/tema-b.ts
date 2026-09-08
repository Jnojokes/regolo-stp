import localFont from 'next/font/local'

/**
 * Opzione B «ecoLINEAR» — il sistema di **ecoLINEAR Studio**
 * (https://ecolinearstudio.com/), che il committente ha chiesto per nome
 * dicendo *«l'opzione 2 la voglio identica a questo sito»*.
 *
 * ## Una famiglia sola, e non è un'interpretazione
 *
 * Misurato sul sito vero con Playwright, contando i nodi di testo:
 * `famiglie: [['Montserrat', 60]]`. **Sessanta nodi su sessanta.** Non c'è una
 * seconda famiglia, non c'è una monospace, non c'è un display separato: tutta
 * la pagina è Montserrat, e la gerarchia la fanno il corpo e il peso.
 *
 * I pesi sono cinque e li usa tutti — misurati nella stessa passata:
 * **300** (4 nodi) sulle annotazioni · **400** (18) sul corpo · **500** (16)
 * sui numeri delle fasi e sulle etichette · **600** (19) sui titoli e sulla
 * nav · **700** (3) sul nome dello studio dentro il testo. Per questo l'asse
 * non si stringe più di `300:700`: ogni gradino è in pagina.
 *
 * ## La trappola del peso di default
 *
 * `varLib.instancer` con `wght=300:700` lascia il **default a 300**, verificato
 * (`[('wght', 300.0, 300.0, 700.0)]`). Un elemento senza `font-weight`
 * esplicito esce **filiforme**, che a corpo 18 su carta chiara è quasi
 * invisibile. Il `font-weight` esplicito non è pignoleria: è la condizione
 * perché la pagina si veda. `@layer base` mette un `font-weight: 400` su
 * `body` e ogni blocco dichiara il suo.
 *
 * 33.396 byte per tutta la proposta, contro i 40,7 di Archivo in A.
 */
const montserrat = localFont({
  variable: '--font-montserrat',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
  /* `preload: false` su tutte le rotte di proposta: Turbopack fonde i
     `@font-face` dei temi in un chunk solo, quindi il preload scaricherebbe
     anche i font delle altre due. Il debito sparisce alla fase 5 con le rotte
     non scelte (`STATO.md` § Aperto). */
  preload: false,
  src: [
    {
      path: '../../public/fonts/montserrat-regolo-latin-var.woff2',
      weight: '300 700',
      style: 'normal',
    },
  ],
})

export const fontsThemeB = montserrat.variable
