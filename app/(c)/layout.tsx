import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { fontsThemeC } from '@/lib/fonts/tema-c'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/lib/site'
import { Misurazione } from '@/components/Misurazione'

/**
 * Root layout dell'opzione C — «La parete».
 * Rotta di proposta, non indicizzabile: sparisce alla fase 5 con le altre non
 * scelte (`DECISIONI.md` n. 1 e n. 35).
 */
export const metadata: Metadata = {
  title: {
    default: `${site.nome} — opzione C`,
    template: `%s — ${site.nome} (opzione C)`,
  },
  description:
    'Proposta di homepage per REGOLO, variante «La parete». Rotta di lavoro, non indicizzata.',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: '#222222',
}

export default function LayoutC({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" data-theme="c" className={fontsThemeC}>
      <body className="con-barra-mobile flex min-h-dvh flex-col">
        <a href="#contenuto" className="skip-link">
          Salta al contenuto
        </a>
        <SiteHeader variante="puntini" />
        <main id="contenuto" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Misurazione />
        <SiteFooter conTerritorio variante="puntini" />
      </body>
    </html>
  )
}
