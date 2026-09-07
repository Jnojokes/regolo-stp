import type { Metadata } from 'next'
import Link from 'next/link'
import { servizi } from '@/lib/servizi'

export const metadata: Metadata = {
  title: 'Servizi',
  description:
    'Progettazione architettonica e strutturale, pratiche e bonus, energia e acustica, opere pubbliche e collaudi. Sei modi di lavorare insieme.',
}

export default function Servizi() {
  return (
    <section className="wrap nav:py-24 py-16">
      <p className="eyebrow">Indice</p>
      <h1 className="mt-4 max-w-[18ch]">Sei modi in cui possiamo esservi utili.</h1>

      <ul className="border-line mt-14 border-t">
        {servizi.map((s) => (
          <li key={s.slug} className="border-line border-b">
            <Link
              href={`/servizi/${s.slug}`}
              className="hover:bg-accent-soft group nav:flex-row nav:items-baseline nav:justify-between nav:gap-8 flex flex-col gap-2 py-8 transition-colors"
            >
              <h2 className="text-h3 max-w-[24ch]">{s.titolo}</h2>
              <p className="text-muted text-small nav:max-w-[34ch] nav:text-right">
                {s.sottotitolo}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
