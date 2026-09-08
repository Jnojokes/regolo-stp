import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { fontsThemeB } from '@/lib/fonts/tema-b'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/lib/site'
import { Misurazione } from '@/components/Misurazione'
import { Cursore } from '@/components/ecolinear/Cursore'

/**
 * Root layout dell'opzione B — **ecoLINEAR**, dal sito che il committente ha
 * indicato per nome: *«l'opzione 2 la voglio identica a questo sito»*,
 * `https://ecolinearstudio.com/`.
 *
 * Le prove stanno in `kit/reference/ecolinear/`, catturate e **misurate nel
 * browser**; i valori sono nel blocco `[data-theme='b']` di `app/globals.css` e
 * il perché di ognuno in `app/css/ecolinear.css`.
 *
 * Rotta di proposta, non indicizzabile: alla decisione n. 1 sopravvive una sola
 * delle tre home e le altre due si cancellano (fase 5).
 */
export const metadata: Metadata = {
  title: {
    default: `${site.nome} — opzione B`,
    template: `%s — ${site.nome} (opzione B)`,
  },
  description:
    'Proposta di homepage per REGOLO, variante «ecoLINEAR». Rotta di lavoro, non indicizzata.',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  /* Senza `viewport-fit: cover` l'`env(safe-area-inset-bottom)` della barra fissa
     vale **sempre 0** su iOS, quindi la barra finisce sotto la tacca del gesto.
     Voce B13 della lista unica, misurata: c'era la `env()` e mancava il flag. */
  viewportFit: 'cover',
  /* La carta del tema, cioè `--regolo-paper` di `[data-theme='b']`, che è il
     valore misurato sul sito vero. Va tenuto allineato a mano: è già stato due
     volte il residuo di una direzione precedente. */
  themeColor: '#ececec',
}

export default function LayoutB({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" data-theme="b" className={fontsThemeB}>
      <body className="con-barra-mobile flex min-h-dvh flex-col">
        <a href="#contenuto" className="skip-link">
          Salta al contenuto
        </a>
        {/* `destra`: marchio a sinistra, menu a destra in maiuscolo. È la
            composizione misurata, e la variante non porta il nome della
            proposta — dice che forma ha la testata. */}
        <SiteHeader variante="destra" />
        <main id="contenuto" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Misurazione />
        {/* Il mirino CAD al posto del puntatore: è il gesto che la reference ha
            su tutta la pagina, quindi sta nel layout e non in un blocco. Si
            installa da sé **solo** su puntatore fine e senza
            `prefers-reduced-motion`, e senza JavaScript non rende niente —
            perché il `cursor: none` che lo accompagna è appeso a un attributo
            che mette lui. */}
        <Cursore />
        <SiteFooter conTerritorio variante="destra" />
      </body>
    </html>
  )
}
