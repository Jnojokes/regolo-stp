import localFont from 'next/font/local'

/**
 * Opzione A «L'elevato» — **Archivo**, una famiglia sola per tutto: display 152,
 * titoli, corpo, dati, marchio.
 *
 * Perché questa e non un serif display: la scelta è stata fatta guardando
 * quattordici famiglie OFL impaginate con le parole vere del brief
 * (`kit/reference/_provini/PROVINI.md`), e ha due argomenti funzionali.
 *
 * 1. **L'asse di larghezza è la leva del mobile.** A 390 px il contrasto di
 *    scala estremo si ottiene solo se il display può stringersi: il payoff sta
 *    in 350 px a `wdth 88`, non a `wdth 100`. È lo stesso gesto del disegnatore
 *    che comprime la scritta per farla stare dentro una quota.
 * 2. **Fa il gesto di Kononenko con un file invece di due famiglie**: nella hero
 *    «Progettiamo e dirigiamo.» sta a `wdth 100`, «Dal disegno al cantiere.» a
 *    `wdth 75`, stesso corpo e stessa famiglia — la seconda metà è il
 *    tecnicismo della prima, che è la relazione esito/tecnicismo dei sei
 *    servizi.
 *
 * Escluse con prova: Newsreader e Source Serif (didoni: sono il cluster n. 1,
 * cioè Instrument Serif con un altro nome), Geist (è il carattere di Studio
 * Foundry), Public Sans (neutralità non è identità).
 *
 * ## Due trappole verificate con fontTools
 *
 * — Il peso **di default di Archivo è 600**, non 400: senza un `font-weight`
 *   esplicito tutto il corpo esce semibold. `@layer base` lo mette su `body`.
 * — Il file viene da `scripts/genera-font.sh`, che stringe gli assi a
 *   `wght 400:600` e `wdth 62:100` e fa il subset latino: 90,1 KB → **40,6**.
 *   Se serve un peso fuori da 400-600 o una larghezza sotto 62, si cambia lì e
 *   si rigenera; scriverlo solo nel CSS non lo fa esistere.
 */
const archivo = localFont({
  variable: '--font-archivo',
  display: 'swap',
  // L'LCP di questa pagina è **testo**: il display a 152 px è il primo pixel
  // dipinto. Il fallback dichiarato serve a non far cambiare numero di righe
  // al payoff durante lo swap (CLS).
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
  src: [
    {
      path: '../../public/fonts/archivo-regolo-latin-var.woff2',
      weight: '400 600',
      style: 'normal',
    },
  ],
})

export const fontsThemeA = archivo.variable
