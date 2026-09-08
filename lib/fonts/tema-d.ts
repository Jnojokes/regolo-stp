import localFont from 'next/font/local'

/**
 * Opzione D «Il marmo» — il sistema di **IDHEAL**, una delle tre reference
 * portate dal committente (`DECISIONI.md` n. 35).
 *
 * La sua firma è **la tensione fra due generi nella stessa pagina**:
 * *«industrial sans for headlines, literary serif for reading»*. È l'unica
 * delle quattro proposte in cui il corpo del testo non è un lineare — e si
 * riconosce leggendo una riga, non guardando un colore.
 *
 * - **Inter** per il masthead e i titoli, peso 500 a 105 px: il sostituto
 *   dichiarato di Helvetica Neue LT Pro (Md). *«The medium weight at extreme
 *   sizes is signature: heavy enough to anchor the page, never so heavy it
 *   becomes a poster.»* Niente 700 sul display.
 * - **Source Serif 4** a `opsz 20` per il corpo e i titoli editoriali. New
 *   Century Schoolbook non è libero e i sostituti dichiarati sono Charter,
 *   Source Serif, Crimson: Source Serif è l'unico con un asse ottico, e a
 *   `opsz 20` ha le grazie **robuste** dello Schoolbook invece delle grazie
 *   fini di un didone — che sarebbe il cluster n. 1 della lista di
 *   calibrazione, cioè il difetto da cui tutta la fase 3 bis era partita.
 *   *«Never set body text below 16px in New Century Schoolbook — the serif
 *   needs size to remain readable.»*
 */
const inter = localFont({
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
  preload: false,
  src: [
    {
      path: '../../public/fonts/inter-regolo-latin-var.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
})

const sourceSerif = localFont({
  variable: '--font-serif',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
  fallback: ['Charter', 'Georgia', 'serif'],
  preload: false,
  src: [
    {
      path: '../../public/fonts/sourceserif-regolo-latin-var.woff2',
      weight: '400 600',
      style: 'normal',
    },
  ],
})

export const fontsThemeD = `${inter.variable} ${sourceSerif.variable}`
