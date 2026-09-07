import localFont from 'next/font/local'
import { instrumentSans } from './testo'

/** Opzione B «Il cantiere»: grotesque display, sans di testo, mono per i dati. */
const bricolageGrotesque = localFont({
  variable: '--font-bricolage-grotesque',
  display: 'swap',
  // Turbopack mette i @font-face dei due temi nello stesso chunk CSS, e Next
  // precarica ogni font che trova nel chunk: senza questo, l'opzione A si
  // scaricherebbe 105 KB di font che non usa. B è una rotta di proposta e
  // sparisce alla fase 5, quindi il preload lo perde lei, non la produzione.
  preload: false,
  src: [
    {
      path: '../../public/fonts/bricolage-grotesque-latin-var.woff2',
      weight: '400 800',
      style: 'normal',
    },
  ],
})

const jetBrainsMono = localFont({
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
  src: [
    {
      path: '../../public/fonts/jetbrains-mono-latin-var.woff2',
      weight: '400 500',
      style: 'normal',
    },
  ],
})

export const fontsThemeB = `${bricolageGrotesque.variable} ${instrumentSans.variable} ${jetBrainsMono.variable}`
