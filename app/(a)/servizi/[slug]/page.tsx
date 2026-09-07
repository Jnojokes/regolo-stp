import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PaginaStub } from '@/components/PaginaStub'
import { servizi, servizioBySlug } from '@/lib/servizi'

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
    />
  )
}
