import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { titoloProposta } from '@/components/BarraProposta'
import { site } from '@/lib/site'

/**
 * L'anteprima del link dell'opzione B — **la copertina rimpicciolita**, come
 * quella di A (`app/(a)/opengraph-image.tsx`): disegnata in codice, zero
 * crediti, zero licenze, e non può divergere dalla pagina.
 *
 * Esiste perché le tre home arrivano al cliente come tre link in una mail
 * (DECISIONI.md n. 55), e senza un `og:image` Apple Mail, Outlook e WhatsApp
 * mostravano un indirizzo nudo.
 *
 * Dalla copertina (`components/ecolinear/Blocchi.tsx` § Copertina e
 * `app/css/ecolinear.css` § LA COPERTINA) prende il foglio grigio, la griglia di
 * costruzione, il marchio in Montserrat 300 **da margine a margine** con il
 * blocco d'ambra sulla `O`, il filetto scuro e la riga dell'`h1`. Lascia fuori i
 * tre disegni negli angoli e l'azione: in un'anteprima non si clicca niente.
 *
 * **Una deviazione, dichiarata**: la griglia. Sulla pagina è un puntinato da
 * 1 px al 38 %, e in una miniatura larga mezzo schermo di mail sparisce; qui è
 * un filo più deciso, stessa tinta.
 *
 * **Il marchio arriva ai margini come sulla pagina, e la misura è questa**: il
 * PNG reso ha l'inchiostro fra x 62 e x 1150 su un margine di 40 px, cioè 22 px
 * di grazia a sinistra e 9 a destra — gli stessi due valori che la pagina ha a
 * 1440 (22 e 7 px su un margine di 48). Non c'è nessun fattore di correzione
 * per satori: il divisore è quello letto da `hmtx`, e il residuo è la grazia
 * laterale delle lettere, non un errore da compensare.
 */
export const alt = `${titoloProposta('b')}: il marchio sul foglio da disegno, attraversato dalla griglia di costruzione`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/* I valori di `[data-theme='b']` in `app/globals.css`, gli stessi della pagina. */
const CARTA = '#ECECEC'
const INCHIOSTRO_DISPLAY = '#9D7460' // la tinta esatta: solo a corpo grande
const MUTED = '#876352'
const AMBRA = '#D98E36'
const FILETTO = '#3A2A20'
const FILO = 'rgba(157, 116, 96, 0.55)'

/* Il margine della pagina (`clamp(1.25rem, 3.4vw, 3rem)`) a questa larghezza,
   e il marchio calcolato come sulla pagina: `REGOLO STP` in Montserrat 300
   avanza 6,567 em meno 0,20 em di tracciatura, quindi il divisore è 6,37. */
const MARGINE = 40
const CORPO_MARCHIO = (size.width - 2 * MARGINE) / 6.37

const [montserrat300, montserrat400] = await Promise.all([
  readFile(join(process.cwd(), 'assets/og/montserrat-300.ttf')),
  readFile(join(process.cwd(), 'assets/og/montserrat-400.ttf')),
])

export default async function Immagine() {
  const { width: w, height: h } = size
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: CARTA,
        fontFamily: 'Montserrat',
      }}
    >
      {/* La griglia di costruzione: le stesse quattro linee della pagina, al
          13,5 / 86,5 % in larghezza e al 17 / 85 % in altezza. */}
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{ position: 'absolute', left: 0, top: 0 }}
      >
        {[0.135, 0.865].map((x) => (
          <line
            key={x}
            x1={w * x}
            y1={0}
            x2={w * x}
            y2={h}
            stroke={FILO}
            strokeWidth={1.25}
            strokeDasharray="2 2.5"
          />
        ))}
        {[0.17, 0.85].map((y) => (
          <line
            key={y}
            x1={0}
            y1={h * y}
            x2={w}
            y2={h * y}
            stroke={FILO}
            strokeWidth={1.25}
            strokeDasharray="2 2.5"
          />
        ))}
      </svg>

      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          fontSize: CORPO_MARCHIO,
          fontWeight: 300,
          lineHeight: 1.12,
          letterSpacing: -0.02 * CORPO_MARCHIO,
          color: INCHIOSTRO_DISPLAY,
        }}
      >
        <span>REG</span>
        {/* Il blocco d'ambra sulla prima `O`, con le misure di `.foglio-blocco`:
            8 % dai due fianchi della lettera, al 26 % della riga, alto 0,14 em. */}
        <span style={{ display: 'flex', position: 'relative' }}>
          O
          <span
            style={{
              position: 'absolute',
              left: '8%',
              right: '8%',
              top: '26%',
              height: 0.14 * CORPO_MARCHIO,
              backgroundColor: AMBRA,
            }}
          />
        </span>
        <span style={{ whiteSpace: 'pre' }}>LO STP</span>
      </div>

      <div
        style={{ display: 'flex', width: 448, height: 1, marginTop: 36, backgroundColor: FILETTO }}
      />

      <div
        style={{
          display: 'flex',
          maxWidth: 800,
          marginTop: 36,
          fontSize: 26,
          fontWeight: 400,
          lineHeight: 1.6,
          textAlign: 'center',
          color: MUTED,
        }}
      >
        {`${site.qualifica[0].toUpperCase()}${site.qualifica.slice(1)} a ${site.citta}: progetto architettonico e strutturale, pratiche, cantiere.`}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Montserrat', data: montserrat300, style: 'normal', weight: 300 },
        { name: 'Montserrat', data: montserrat400, style: 'normal', weight: 400 },
      ],
    },
  )
}
