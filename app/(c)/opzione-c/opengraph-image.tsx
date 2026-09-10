import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { titoloProposta } from '@/components/BarraProposta'
import { RUOLI } from '@/lib/contenuti/schema'
import { site } from '@/lib/site'

/**
 * L'anteprima del link dell'opzione C — **la copertina rimpicciolita**, come
 * quella di A (`app/(a)/opengraph-image.tsx`): disegnata in codice, zero
 * crediti, zero licenze, e non può divergere dalla pagina.
 *
 * Esiste perché le tre home arrivano al cliente come tre link in una mail
 * (DECISIONI.md n. 55), e senza un `og:image` Apple Mail, Outlook e WhatsApp
 * mostravano un indirizzo nudo.
 *
 * In alto è la barra di contenuto della copertina (`components/halston/Blocchi.tsx`
 * § Copertina, `app/css/halston.css` § LA COPERTINA): il titolo in maiuscolo a
 * interlinea 1,0 con i capi a riga decisi, il filetto spezzato al 49 %, le
 * discipline in granata, il valore con la sua etichetta in mono, il bottone
 * contornato.
 *
 * **Sotto, le bande e non il video**, e non per gusto: il video della copertina
 * è un esempio Mixkit, e in un'anteprima perderebbe la riga di fonte e licenza
 * che la decisione n. 27 b pretende da ogni media di esempio. Al suo posto ci
 * sono le superfici della pagina nell'ordine in cui arrivano scorrendo —
 * granata, mauve, antracite — che è anche quello che di C si riconosce in tre
 * secondi: il ritmo fatto dal colore. La prima porta il titolo vero della banda
 * granata, perché tre campiture nude sono un campionario e non una pagina.
 */
export const alt = `${titoloProposta('c')}: il titolo in maiuscolo sopra le bande di colore della pagina`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/* I valori di `[data-theme='c']` in `app/globals.css`, gli stessi della pagina. */
const CARTA = '#DBDBD8'
const INCHIOSTRO = '#171716'
const MUTED = '#6D5C5C'
const LINEA = 'rgba(23, 23, 22, 0.22)'
const GRANATA = '#593939'
const MAUVE = '#937D7D'
const BANDA = '#2E2D2B'

const MARGINE = 28
const CORPO_TITOLO = 64

const [generalSans500, jetbrainsMono400] = await Promise.all([
  readFile(join(process.cwd(), 'assets/og/generalsans-500.ttf')),
  readFile(join(process.cwd(), 'assets/og/jetbrainsmono-400.ttf')),
])

export default async function Immagine() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: CARTA,
        color: INCHIOSTRO,
        fontFamily: 'General Sans',
        fontWeight: 500,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: `36px ${MARGINE}px 30px`,
        }}
      >
        {/* Due righe decise a mano, come sulla pagina: a interlinea 1,0 il
            browser — e satori — non devono poter scegliere dove andare a capo. */}
        {['Progettiamo e dirigiamo.', 'Dal disegno al cantiere.'].map((riga) => (
          <span
            key={riga}
            style={{
              fontSize: CORPO_TITOLO,
              lineHeight: 1,
              letterSpacing: -0.05 * CORPO_TITOLO,
              textTransform: 'uppercase',
            }}
          >
            {riga}
          </span>
        ))}

        {/* Il filetto spezzato: il taglio al 49 %, un vuoto di 20 px. */}
        <div style={{ display: 'flex', marginTop: 28, marginBottom: 22 }}>
          <div style={{ display: 'flex', width: '49%', height: 1, backgroundColor: LINEA }} />
          <div
            style={{
              display: 'flex',
              flexGrow: 1,
              height: 1,
              marginLeft: 20,
              backgroundColor: LINEA,
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              fontSize: 18,
              lineHeight: 1.45,
              letterSpacing: 0.04 * 18,
              textTransform: 'uppercase',
              color: GRANATA,
            }}
          >
            <span>Progettazione architettonica</span>
            <span>Progettazione strutturale</span>
            <span>Direzione lavori e sicurezza</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <span
              style={{
                fontFamily: 'JetBrains Mono',
                fontWeight: 400,
                fontSize: 14,
                letterSpacing: 0.1 * 14,
                textTransform: 'uppercase',
                color: MUTED,
              }}
            >
              Ruoli firmabili
            </span>
            <span style={{ marginTop: 8, fontSize: 22, lineHeight: 1.3 }}>
              {RUOLI.length} ruoli, dalla firma al collaudo
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 52,
              padding: '0 18px',
              border: `1px solid ${INCHIOSTRO}`,
              borderRadius: 3,
              fontFamily: 'JetBrains Mono',
              fontWeight: 400,
              fontSize: 15,
              letterSpacing: 0.06 * 15,
              textTransform: 'uppercase',
            }}
          >
            <span>Raccontaci il progetto</span>
            <span style={{ marginLeft: 40 }}>+</span>
          </div>
        </div>
      </div>

      {/* Le bande, da bordo a bordo e senza vuoto fra l'una e l'altra.
          La prima porta il **suo titolo vero** (`Bande`, la banda granata) in
          bianco: tre campiture vuote erano un campionario di colori, e la banda
          di quella pagina è granata **con il bianco sopra** — è il colore che si
          porta dietro il testo, non una tinta piatta. Il bianco sul granata sta
          a 10,15:1, il valore misurato in `app/css/halston.css`.
          Le due sotto restano strisce: dicono che la pagina continua a cambiare
          superficie, che è il meccanismo, senza rubare l'altezza al titolo. */}
      <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'flex-end',
            padding: `0 ${MARGINE}px 34px`,
            backgroundColor: GRANATA,
            color: '#FFFFFF',
          }}
        >
          <span
            style={{
              /* Sulla pagina la misura è 30ch e la frase va a capo; qui sta su
                 una riga, perché in un'anteprima «Fermo.» da solo sulla seconda
                 riga è un orfano che si vede più della frase. */
              maxWidth: 800,
              fontSize: 31,
              lineHeight: 1.2,
              letterSpacing: -0.013 * 31,
            }}
          >
            Uno studio di ingegneria civile e architettura a {site.citta}.
          </span>
        </div>
        <div style={{ display: 'flex', height: 34, backgroundColor: MAUVE }} />
        <div style={{ display: 'flex', height: 22, backgroundColor: BANDA }} />
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'General Sans', data: generalSans500, style: 'normal', weight: 500 },
        { name: 'JetBrains Mono', data: jetbrainsMono400, style: 'normal', weight: 400 },
      ],
    },
  )
}
