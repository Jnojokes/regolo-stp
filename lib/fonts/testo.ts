import localFont from 'next/font/local'

/**
 * Font di testo, comune ai due temi. Sta in un modulo suo perché next/font
 * precarica TUTTI i font dichiarati in un modulo importato dalla rotta: se i
 * quattro font stessero nello stesso file, l'opzione A si scaricherebbe anche
 * Bricolage e JetBrains Mono (105 KB) senza usarli.
 */
export const instrumentSans = localFont({
  variable: '--font-instrument-sans',
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/instrument-sans-latin-var.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
})
