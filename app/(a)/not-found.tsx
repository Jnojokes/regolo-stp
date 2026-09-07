import Link from 'next/link'
import { menu } from '@/lib/site'

export const metadata = { title: 'Pagina non trovata' }

export default function NonTrovata() {
  return (
    <section className="wrap nav:py-32 py-20">
      <p className="eyebrow">Errore 404</p>
      <h1 className="mt-4 max-w-[16ch]">Questa pagina non c’è.</h1>
      <p className="text-muted text-lead mt-6 max-w-[46ch]">
        L’indirizzo è sbagliato, oppure la pagina è stata spostata. Da qui si riparte.
      </p>
      <ul className="border-line mt-12 max-w-[42ch] border-t">
        {menu.map((v) => (
          <li key={v.href} className="border-line border-b">
            <Link href={v.href} className="hover:text-accent-text text-h3 block py-4">
              {v.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/" className="btn mt-10">
        Torna alla home
      </Link>
    </section>
  )
}
