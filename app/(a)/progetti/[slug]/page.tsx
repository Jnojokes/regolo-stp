import { notFound } from 'next/navigation'

/**
 * Scheda progetto. Non esiste ancora nessun progetto: i contenuti sono
 * bloccanti e stanno in CONTENUTI-DA-CLIENTE.md. Finché non arrivano,
 * qualunque slug è un 404 vero — non una pagina finta.
 */
export function generateStaticParams() {
  return []
}

export default async function Progetto({ params }: { params: Promise<{ slug: string }> }) {
  await params
  notFound()
}
