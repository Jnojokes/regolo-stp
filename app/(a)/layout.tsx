import type { Metadata, Viewport } from 'next'
import '../globals.css'
import { fontsThemeA } from '@/lib/fonts/tema-a'
import { SiteHeader } from '@/components/SiteHeader'
import { SiteFooter } from '@/components/SiteFooter'
import { site } from '@/lib/site'
import { Misurazione } from '@/components/Misurazione'
import { BarraMobile } from '@/components/BarraMobile'

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
        {/* La barra CTA fissa sotto i 768 px, **su tutte le rotte del tema A** e
            non solo sulla home. `CLAUDE.md` § Homepage la chiedeva («+ Barra CTA
            mobile fissa sotto 768 px») e stava solo su B e C; misurato a 390
            prima di questa riga, cinque rotte interne — `/progetti`,
            `/progetti/[slug]`, `/servizi`, `/studio`, `/privacy` — **non avevano
            nessuna azione nel primo viewport**, perché a quella larghezza la
            testata è marchio più `menu` chiuso. Voci B3 e B4 della lista unica.

            Sta nel layout e non nelle nove pagine perché è chrome, e il chrome
            di questo tema vive qui: la spaziatura in fondo se la prende da sola
            con `body:has(.barra-mobile)`, quindi non c'è una classe da ricordare
            pagina per pagina.

            **La cella del brief porta a `/contatti#brief` e non a `#brief`**, ed
            è voluto: questa barra è la scorciatoia di tutto il sito e su otto
            rotte su nove il brief non è in pagina. Sulla home la CTA della hero
            invece è un'ancora interna — il form è lì sotto, e mandare altrove
            chi è già sulla pagina giusta era il difetto misurato al passo 0. Le
            due cose fanno lavori diversi e dicono la stessa frase. */}
        <BarraMobile />
      </body>
    </html>
  )
}
