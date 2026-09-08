import localFont from 'next/font/local'

/**
 * Opzione D «La casa» — il sistema di **Storey Architecture**
 * (https://www.storeyarchitecture.co.uk/), chiesto dal committente per nome.
 * È l'unica delle reference che era già nel tier A di `SCHEDA.md`, quindi i
 * suoi valori qui sotto sono **misurati nel browser**, non descritti.
 *
 * Tre caratteri, e il terzo è la firma:
 *
 * - **Anybody Wide** istanziato a `wdth 150 / wght 900`, statico, 11.620 byte:
 *   il **masthead allargato** del frontespizio, chiesto dal committente («font
 *   più display e allargato»). La famiglia non è scelta per genere ma su una
 *   metrica: la soglia d'inchiostro in maiuscolo è **0,876**, la più bassa fra i
 *   caratteri display del repo, e Storey — la reference di D — ha «interlinea
 *   1,0 esatta a ogni corpo display». Con Inter (soglia 1,158) quel valore è
 *   irriproducibile: è il difetto che il committente ha visto nei titoli a 63,4
 *   px con interlinea 63,4. Il masthead allargato e l'interlinea stretta sono la
 *   **stessa** decisione. Costa 7,8 KB **meno** del file variabile di Anybody
 *   uscito con l'opzione B.
 * - **Inter** (400/500) come New Grotesk: il corpo, i titoli e il claim.
 * - **IBM Plex Mono** come New Grotesk Mono: numerazione `01)` — con la
 *   parentesi chiusa, non `01 —` — e micro-etichette. Spaziatura **−10 %**,
 *   che è il valore misurato e l'opposto del `+0,14em` di default.
 * - **Caveat**, e **una volta sola in tutta la pagina**. Storey usa una
 *   calligrafica (Biro) esattamente una volta, ed è una firma proprio perché
 *   non si ripete: se in pagina se ne trovano due, la regola è stata violata.
 *   Istanziata a un peso solo, 27,4 KB.
 *
 * I numeri che governano questo tema, misurati su `kit/reference/storey/`:
 * interlinea **1,0 esatta a ogni corpo display** (115,2/115,2 · 100,8/100,8 ·
 * 31,7/31,7), spaziatura **−3 %** sul display, contrasto di scala **7,3×**,
 * **nessun `max-width`** (il contenuto sta al 100 %), gutter **20 px**,
 * `border-radius` **zero occorrenze** e `box-shadow` **zero**.
 */
const anybodyWide = localFont({
  variable: '--font-anybody-wide',
  display: 'swap',
  fallback: ['Arial Black', 'Helvetica Neue', 'Impact', 'sans-serif'],
  preload: false,
  src: [
    {
      path: '../../public/fonts/anybody-wide-regolo-latin-900.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})

const inter = localFont({
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: 'Arial',
  fallback: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
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

const caveat = localFont({
  variable: '--font-mano',
  display: 'swap',
  fallback: ['Bradley Hand', 'cursive'],
  preload: false,
  src: [
    { path: '../../public/fonts/caveat-regolo-latin-500.woff2', weight: '500', style: 'normal' },
  ],
})

export const fontsThemeD = `${anybodyWide.variable} ${inter.variable} ${plexMono.variable} ${caveat.variable}`
