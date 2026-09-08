import localFont from 'next/font/local'

/**
 * Opzione C «La fonderia» — il sistema di **Studio Foundry**
 * (https://studio-foundry.sujen.co/), chiesto dal committente per nome.
 *
 * Tre caratteri, tre ruoli che non si sovrappongono mai:
 *
 * - **Elsie 900** per il marchio e i nomi dei progetti. È *il* carattere del
 *   display di Studio Foundry, non un sostituto: la richiesta era «l'opzione C
 *   deve essere come questa». Serif ad altissimo contrasto, **sempre tutto
 *   maiuscolo e mai sotto i 40 px** — a corpo piccolo le grazie sottili
 *   spariscono e resta una macchia. 10,9 KB, un peso solo.
 * - **Inter** per il corpo e il claim: un lineare leggero, che nella reference
 *   sta sopra la fotografia in peso normale e non contende niente al serif.
 * - **IBM Plex Mono** per le micro-etichette maiuscole a 10-14 px — i metadati
 *   ai due estremi della riga (`RESIDENZIALE` a sinistra, `2025` a destra) e le
 *   pastiglie `CONTATTI` e `MENU`.
 *
 * `SCHEDA.md` aveva escluso Geist perché «è il carattere di Studio Foundry:
 * usarlo sarebbe copiare la reference». Qui la reference **è** il brief, e la
 * regola della skill è esplicita: dove il brief fissa una direzione la si segue
 * alla lettera. La nota resta scritta perché la distinzione conti ancora la
 * prossima volta.
 */
const elsie = localFont({
  variable: '--font-elsie',
  display: 'swap',
  fallback: ['Playfair Display', 'Didot', 'Georgia', 'serif'],
  preload: false,
  src: [
    { path: '../../public/fonts/elsie-regolo-latin-900.woff2', weight: '900', style: 'normal' },
  ],
})

const inter = localFont({
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
  preload: false,
  src: [
    { path: '../../public/fonts/inter-regolo-latin-var.woff2', weight: '400 700', style: 'normal' },
  ],
})

const plexMono = localFont({
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  preload: false,
  src: [
    { path: '../../public/fonts/plexmono-regolo-latin-400.woff2', weight: '400', style: 'normal' },
  ],
})

export const fontsThemeC = `${elsie.variable} ${inter.variable} ${plexMono.variable}`
