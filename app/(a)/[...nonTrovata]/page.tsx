import { notFound } from 'next/navigation'

/**
 * Cattura ogni URL che nessuna rotta serve e la manda al 404 del tema A,
 * con header, footer e status 404 veri.
 * Serve perché il progetto ha due root layout (uno per tema) e quindi non ha
 * un layout di primo livello in cui disegnare un 404 globale.
 * Alla fase 5, quando resta un solo tema, questo file si può togliere.
 */
export default function CatturaTutto() {
  notFound()
}
