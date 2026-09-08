import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { NextConfig } from 'next'

/**
 * I redirect si leggono da REDIRECT.md, che è la mappa che teniamo a mano.
 * Regole (web-references § SEO tecnico):
 *  — una riga per URL, mai un catch-all;
 *  — le righe segnaposto [[DA CLIENTE: …]] si ignorano;
 *  — una riga che rimanda a sé stessa si ignora (sarebbe un ciclo).
 * Oggi la mappa è vuota: brasili.net è offline e le URL con traffico vanno
 * ancora recuperate (CONTENUTI-DA-CLIENTE.md).
 */
function redirectDaMappa() {
  let testo: string
  try {
    testo = readFileSync(join(process.cwd(), 'REDIRECT.md'), 'utf8')
  } catch {
    return []
  }

  const regole: { source: string; destination: string; permanent: boolean }[] = []

  for (const riga of testo.split('\n')) {
    if (!riga.trimStart().startsWith('|')) continue

    const celle = riga
      .split('|')
      .slice(1, -1)
      .map((c) => c.trim().replace(/`/g, ''))
    if (celle.length < 3) continue

    const [source, destination, tipo] = celle

    if (!source.startsWith('/') || !destination.startsWith('/')) continue // intestazioni e segnaposto
    if (source.includes('[[') || destination.includes('[[')) continue
    if (source.includes('*') || destination.includes('*')) continue // mai catch-all
    if (source === destination) continue // ciclo

    regole.push({ source, destination, permanent: tipo !== '302' && tipo !== '307' })
  }

  return regole
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  /* `global-not-found.tsx` è **la** soluzione documentata quando un progetto ha
     più di un root layout, che è il nostro caso (tre temi, tre `<html>`).
     Senza, Next non ha un layout in cui comporre il 404 globale e serve la sua
     pagina di errore predefinita: misurato prima della correzione, ogni URL
     inesistente rendeva un `<body>` da 51 byte con `<html id="__next_error__">`
     senza `lang`, zero landmark e zero testo — cioè, a JavaScript spento, una
     pagina bianca. Regola 4 di `CLAUDE.md`. */
  experimental: {
    globalNotFound: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return redirectDaMappa()
  },
}

export default nextConfig
