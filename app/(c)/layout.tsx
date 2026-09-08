import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { fontsThemeC } from '@/lib/fonts/tema-c'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/lib/site'
import { Misurazione } from '@/components/Misurazione'

/**
 * Root layout dell'opzione C — **Halston**, dal sito che il committente ha
 * indicato per nome: *«l'opzione 3 la voglio identica a questo sito»*,
 * `https://halston-architecture-template.webflow.io/`.
 *
 * Le prove stanno in `kit/reference/halston/`, catturate e **misurate nel
 * browser**; i valori sono nel blocco `[data-theme='c']` di `app/globals.css` e
 * il perché di ognuno in `app/css/halston.css`.
 *
 * Rotta di proposta, non indicizzabile: alla decisione n. 1 sopravvive una sola
 * delle tre home e le altre due si cancellano (fase 5).
 */
export const metadata: Metadata = {
  title: {
    default: `${site.nome} — opzione C`,
    template: `%s — ${site.nome} (opzione C)`,
  },
  description:
    'Proposta di homepage per REGOLO, variante «Halston». Rotta di lavoro, non indicizzata.',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  /* `--regolo-paper` di `[data-theme='c']`, misurato sul sito vero
     (`srgb 0.86 0.8586 0.8463`). */
  themeColor: '#dbdbd8',
}

export default function LayoutC({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" data-theme="c" className={fontsThemeC}>
      <body className="con-barra-mobile flex min-h-dvh flex-col">
        <a href="#contenuto" className="skip-link">
          Salta al contenuto
        </a>
        {/* `pastiglia`: marchio a sinistra, la pastiglia granata con
            l'hamburger, il menu al centro e `altro` a destra. È la
            composizione misurata su `1440-hero.jpeg`. */}
        <SiteHeader variante="pastiglia" />
        <main id="contenuto" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Misurazione />
        <SiteFooter conTerritorio variante="pastiglia" />
      </body>
    </html>
  )
}
