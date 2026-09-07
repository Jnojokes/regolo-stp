import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PaginaStub } from '@/components/PaginaStub'
import Link from 'next/link'
import { hrefBriefServizio, servizi, servizioBySlug } from '@/lib/servizi'

export function generateStaticParams() {
  return servizi.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const s = servizioBySlug(slug)
  if (!s) return {}
  return { title: s.titolo, description: `${s.titolo}: ${s.sottotitolo}. Studio REGOLO, Fermo.` }
}

export default async function Servizio({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const s = servizioBySlug(slug)
  if (!s) notFound()

  return (
    <PaginaStub
      fase="Servizio"
      titolo={s.titolo}
      intento={s.sottotitolo}
      blocchi={[
        'Per chi è',
        'Cosa comprende',
        'Come funziona — le fasi',
        'Cosa serve da te — l’elenco dei documenti (da cliente)',
        'FAQ con <details> e schema FAQPage',
        'Progetti collegati',
        'CTA che precompila il brief con questo tipo di intervento',
      ]}
      azione={
        /* La CTA c'è già, anche se la pagina è ancora un'impalcatura: è
           l'ultimo anello dello smistamento della home, e senza di lei un
           committente arriva qui e non sa dove andare. */
        <Link href={hrefBriefServizio(s)} className="btn">
          Raccontaci il progetto
        </Link>
      }
    />
  )
}
