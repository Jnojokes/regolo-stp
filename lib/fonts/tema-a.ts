import localFont from 'next/font/local'
import { instrumentSans } from './testo'

/** Opzione A «Lo studio»: serif display + sans di testo. */
const instrumentSerif = localFont({
  variable: '--font-instrument-serif',
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/instrument-serif-latin-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/instrument-serif-latin-400-italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
})

export const fontsThemeA = `${instrumentSerif.variable} ${instrumentSans.variable}`
