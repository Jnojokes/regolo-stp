import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { fontsThemeD } from '@/lib/fonts/tema-d'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/lib/site'
import { Misurazione } from '@/components/Misurazione'

/**
 * Root layout dell'opzione D — «Il marmo».
 * Rotta di proposta, non indicizzabile: sparisce alla fase 5 con le altre non
 * scelte (`DECISIONI.md` n. 1 e n. 35).
 */
export const metadata: Metadata = {
  title: {
    default: `${site.nome} — opzione D`,
    template: `%s — ${site.nome} (opzione D)`,
  },
  description:
    'Proposta di homepage per REGOLO, variante «Il marmo». Rotta di lavoro, non indicizzata.',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function LayoutD({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" data-theme="d" className={fontsThemeD}>
      <body className="con-barra-mobile flex min-h-dvh flex-col">
        <a href="#contenuto" className="skip-link">
          Salta al contenuto
        </a>
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
