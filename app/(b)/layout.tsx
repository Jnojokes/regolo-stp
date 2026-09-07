import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { fontsThemeB } from '@/lib/fonts/tema-b'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/lib/site'

/**
 * Root layout dell'opzione B — «Il cantiere».
 * Stessi componenti dell'opzione A: cambiano i token e i font, non il markup.
 * Rotta di proposta, non indicizzabile: sparisce alla fase 5 se il cliente
 * sceglie A (DECISIONI.md n. 1).
 */
export const metadata: Metadata = {
  title: {
    default: `${site.nome} — opzione B`,
    template: `%s — ${site.nome} (opzione B)`,
  },
  description:
    'Proposta di homepage per REGOLO, variante «Il cantiere». Rotta di lavoro, non indicizzata.',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: '#F3F4F1',
}

export default function LayoutB({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" data-theme="b" className={fontsThemeB}>
      {/* `con-barra-mobile` lascia sotto i 768 px lo spazio della barra CTA
          fissa: senza, la barra coprirebbe l'ultima riga del footer. */}
      <body className="con-barra-mobile flex min-h-dvh flex-col">
        <a href="#contenuto" className="skip-link">
          Salta al contenuto
        </a>
        <SiteHeader />
        <main id="contenuto" className="flex-1">
          {children}
        </main>
        <SiteFooter conTerritorio />
      </body>
    </html>
  )
}
