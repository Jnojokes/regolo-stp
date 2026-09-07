import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { RUOLI } from '@/lib/contenuti/schema'
import { site } from '@/lib/site'

/**
 * L'immagine Open Graph — **disegnata in codice, non generata e non stock**.
 *
 * `TODO-MEDIA.md` la dava «bloccata: crediti» (il workspace Higgsfield ne ha
 * 1,79 e ne servono 2). Ma il modo giusto di farla non era né generarla né
 * pescarla in rete: è **la pagina stessa, rimpicciolita**. Stessi caratteri,
 * stessa quota dei cinque ruoli, stesso bianco e nero. Costa zero crediti, zero
 * licenze, non ha tell da riconoscere, e soprattutto **non può divergere dal
 * sito**: se cambia il payoff o l'elenco dei ruoli, cambia anche l'anteprima.
 *
 * Non c'è nessun dato del cliente qui dentro che non sia già confermato: il
 * nome, la qualifica, la città e i cinque ruoli, che vengono dall'elenco chiuso
 * di `lib/contenuti/schema.ts`.
 *
 * `next/og` (satori) non legge i woff2 variabili: le due istanze statiche in
 * `assets/og/` le produce `scripts/genera-font.sh` e non vengono servite al
 * browser. Vengono lette a build time, e l'immagine è prerenderizzata.
 */
export const alt = `${site.nomeEsteso} — ${site.qualifica} a ${site.citta}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const [archivo400, archivo500] = await Promise.all([
  readFile(join(process.cwd(), 'assets/og/archivo-400.ttf')),
  readFile(join(process.cwd(), 'assets/og/archivo-500.ttf')),
])

export default async function Immagine() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        color: '#000000',
        padding: 56,
        fontFamily: 'Archivo',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22 }}>
        <span style={{ fontWeight: 500 }}>{site.nomeEsteso}</span>
        <span style={{ color: '#5E5E5E' }}>
          {site.via} — {site.cap} {site.citta} ({site.provincia})
        </span>
      </div>

      {/* Il payoff alle proporzioni della hero: interlinea 0,86 e spaziatura
          negativa, con i capi a riga **decisi** — satori manda a capo da sé, e
          una riga in più a 88 px fa toccare le discendenti.
          Le due metà qui sono entrambe nere e si distinguono per il solo peso:
          satori non interpola l'asse di larghezza, quindi il gesto delle due
          larghezze non si può riprodurre. È l'unica differenza fra questa
          miniatura e la pagina, ed è dichiarata invece che nascosta. */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {[
          ['Progettiamo', 500],
          ['e dirigiamo.', 500],
          ['Dal disegno', 400],
          ['al cantiere.', 400],
        ].map(([riga, peso]) => (
          <span
            key={riga as string}
            style={{
              fontSize: 88,
              lineHeight: 0.94,
              letterSpacing: -1.6,
              fontWeight: peso as number,
            }}
          >
            {riga}
          </span>
        ))}
      </div>

      {/* La quota dei cinque ruoli: lo stesso apparato della hero, con il
            filetto e l'annotazione all'estremo. */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', height: 1, backgroundColor: '#757575' }} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 12,
            fontSize: 20,
            color: '#5E5E5E',
          }}
        >
          {RUOLI.map((r) => (
            <span key={r}>{r}</span>
          ))}
          <span style={{ color: '#000000', fontWeight: 500 }}>{RUOLI.length} ruoli</span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Archivo', data: archivo400, style: 'normal', weight: 400 },
        { name: 'Archivo', data: archivo500, style: 'normal', weight: 500 },
      ],
    },
  )
}
