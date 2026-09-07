import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { fontsThemeA } from '@/lib/fonts/tema-a'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/lib/site'

/**
 * Root layout dell'opzione A — «Lo studio».
 * Il tema si sceglie qui, sull'<html> della rotta (CLAUDE.md § Due opzioni).
 * L'opzione B ha il proprio root layout in app/(b): è il modo documentato di
 * avere due <html> diversi nello stesso progetto. Alla fase 5 una delle due
 * sparisce e resta un solo layout.
 */
export const metadata: Metadata = {
  // Il dominio definitivo è la decisione n. 2 (blocca la fase 6): finché non
  // c'è, si usa l'origine di anteprima e NON si dichiara un canonical falso.
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: `${site.nome} — ${site.qualifica} a ${site.citta}`,
    template: `%s — ${site.nome}`,
  },
  description:
    'Studio di ingegneria civile e architettura a Fermo. Progettazione e direzione lavori su edifici nuovi ed esistenti, pubblici e privati.',
}

export const viewport: Viewport = {
  themeColor: '#F4F2ED',
}

export default function LayoutA({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" data-theme="a" className={fontsThemeA}>
      <body className="flex min-h-dvh flex-col">
        <a href="#contenuto" className="skip-link">
          Salta al contenuto
        </a>
        <SiteHeader />
        <main id="contenuto" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
