import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { fontsThemeA } from '@/lib/fonts/tema-a'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/lib/site'
import { Misurazione } from '@/components/Misurazione'

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

/* Il colore della barra del browser su mobile. Era `#F4F2ED`, cioè la carta
   calda del kick-off: uno dei due valori che la fase 3 bis ha sostituito, e
   restava servito su tutte e otto le rotte del gruppo A. È la carta del tema,
   e va tenuto allineato a `--regolo-paper` in `app/globals.css`. */
export const viewport: Viewport = {
  /* Senza `viewport-fit: cover` l'`env(safe-area-inset-bottom)` della barra fissa
     vale **sempre 0** su iOS, quindi la barra finisce sotto la tacca del gesto.
     Voce B13 della lista unica, misurata: c'era la `env()` e mancava il flag. */
  viewportFit: 'cover',
  themeColor: '#FFFFFF',
}

export default function LayoutA({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" data-theme="a" className={fontsThemeA}>
      <body className="flex min-h-dvh flex-col">
        <a href="#contenuto" className="skip-link">
          Salta al contenuto
        </a>
        <SiteHeader />
        {/* `tabIndex={-1}` sul bersaglio dello skip link, e non è pignoleria:
            senza, il browser sposta il punto di partenza della tabulazione ma
            **non muove il fuoco**, e su parte dei lettori di schermo il cursore
            virtuale resta dov'era — cioè il link fa una cosa diversa da quella
            che dice. `outline-offset` negativo perché l'anello su un elemento
            largo quanto la pagina, disegnato fuori, esce dalla finestra. */}
        <main id="contenuto" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Misurazione />
        <SiteFooter />
      </body>
    </html>
  )
}
