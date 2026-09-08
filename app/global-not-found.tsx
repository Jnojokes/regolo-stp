import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import './globals.css'
import { fontsThemeA } from '@/lib/fonts/tema-a'
import { menu, site } from '@/lib/site'

/**
 * Il 404 globale — e il motivo per cui esiste è un difetto misurato, non una
 * preferenza.
 *
 * Il progetto ha **tre root layout** (uno per tema), quindi non c'è un layout
 * di primo livello in cui comporre un 404 globale: Next serviva la sua pagina
 * di errore predefinita, e questo è quello che arrivava sul filo per ogni URL
 * inesistente —
 *
 * ```
 * <html id="__next_error__">…<body><div hidden><!--$--><!--/$--></div>…
 * ```
 *
 * cioè **51 byte di markup** contro i 17.655 di `/studio`, `<html>` senza
 * `lang`, zero `<main>`, zero skip link, zero heading e zero testo: il
 * contenuto stava solo nel payload RSC e compariva **dopo** l'idratazione.
 * Con JavaScript spento, misurato con Playwright, la pagina rendeva **zero
 * caratteri**. È la regola 4 di `CLAUDE.md` («senza JS il contenuto resta
 * leggibile») e le voci B16, C2 e C4 della lista unica.
 *
 * `global-not-found.tsx` + `experimental.globalNotFound` è la soluzione che la
 * documentazione di questa versione di Next indica **esattamente** per il caso
 * «più root layout» (`node_modules/next/dist/docs/01-app/03-api-reference/
 * 03-file-conventions/not-found.md`). Bypassa i layout, quindi qui l'`<html>`
 * e il `<body>` si dichiarano a mano, insieme allo stile e ai caratteri: c'è
 * scritto anche quello, ed è il prezzo.
 *
 * Il tema è **A**, perché A è la proposta candidata alla produzione e perché un
 * 404 deve avere un tema solo. Alla fase 5, quando resta un tema, questo file
 * resta com'è: cambia una stringa.
 *
 * Niente header e niente footer: sono componenti che leggono il tema dal
 * layout, e qui il layout non c'è. Al loro posto il minimo che un 404 deve
 * avere — il marchio, dove sei, le quattro voci di menu, la via d'uscita e il
 * telefono — reso **lato server**, che è il punto di tutto il file.
 */

export const metadata: Metadata = {
  title: `Pagina non trovata — ${site.nome}`,
  description: 'L’indirizzo è sbagliato oppure la pagina è stata spostata.',
  robots: { index: false, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  viewportFit: 'cover',
}

export default function QuattroZeroQuattro() {
  return (
    <html lang="it" data-theme="a" className={fontsThemeA}>
      <body className="flex min-h-dvh flex-col">
        <main id="contenuto" className="wrap nav:py-32 flex-1 py-20">
          <p className="text-small text-muted">Errore 404</p>
          <h1 className="mt-4 max-w-[16ch]">Questa pagina non c’è.</h1>
          <p className="text-muted text-lead mt-6 max-w-[46ch]">
            L’indirizzo è sbagliato, oppure la pagina è stata spostata. Da qui si riparte.
          </p>

          <ul className="border-line mt-12 max-w-[42ch] border-t">
            {menu.map((v) => (
              <li key={v.href} className="border-line border-b">
                <Link href={v.href} className="text-h3 block py-4 hover:underline">
                  {v.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/" className="btn">
              Torna alla home
            </Link>
            <a href={`tel:${site.telefonoHref}`} className="hero-telefono">
              {site.telefono}
            </a>
          </p>
        </main>

        <footer className="wrap text-small text-muted py-10">
          {site.nomeEsteso} — {site.via}, {site.cap} {site.citta} ({site.provincia})
        </footer>
      </body>
    </html>
  )
}
