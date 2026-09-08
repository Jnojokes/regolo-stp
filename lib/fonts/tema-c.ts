import localFont from 'next/font/local'

/**
 * Opzione C «La parete» — il sistema di **Iad-lab**, una delle tre reference
 * portate dal committente (`DECISIONI.md` n. 35).
 *
 * Due caratteri con due ruoli che non si toccano mai, ed è la sua firma:
 *
 * - **Anybody wide** per le due parole colossali, e solo per quelle. Asse di
 *   larghezza tenuto e portato a 150, peso fino a 900: è il sostituto OFL più
 *   vicino a «Obviously Wide Black». Interlinea 0,85. Non scende mai sotto i
 *   60 px — sotto quella soglia non è più un manifesto, è un titolo.
 *   *Nota*: è lo **stesso file sorgente** di Anybody in B, con l'asse istanziato
 *   al contrario — in B è bloccato a 100, qui va a 150. Stessa famiglia, due
 *   strumenti opposti, e nessuna delle due proposte può fare il gesto dell'altra.
 * - **Inter** per tutta la copia di interfaccia, pesi 400 e 700. È il sostituto
 *   dichiarato di Neue Haas Unica. *«Use weight 400 as default; reserve 700 for
 *   active or emphasized labels only. Do not mix intermediate weights.»*
 */
const anybodyWide = localFont({
  variable: '--font-wide',
  display: 'swap',
  fallback: ['Impact', 'Haettenschweiler', 'sans-serif'],
  preload: false,
  src: [
    {
      path: '../../public/fonts/anybody-wide-regolo-latin-var.woff2',
      weight: '700 900',
      style: 'normal',
    },
  ],
})

const inter = localFont({
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
  preload: false,
  src: [
    {
      path: '../../public/fonts/inter-regolo-latin-var.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
})

export const fontsThemeC = `${anybodyWide.variable} ${inter.variable}`
