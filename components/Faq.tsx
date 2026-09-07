import { JsonLd } from '@/components/JsonLd'
import type { Faq as VoceFaq } from '@/lib/contenuti/schema'

/**
 * Le domande frequenti (catalogo blocchi C4 · prompt della fase 4).
 *
 * `<details>`/`<summary>` nativi: si aprono **senza JavaScript**, sono
 * navigabili da tastiera di serie e uno screen reader annuncia già lo stato
 * aperto/chiuso. Un accordion scritto a mano vorrebbe dire duecento righe di
 * ARIA per fare peggio.
 *
 * Le domande sono scritte come le fa un committente, non come le farebbe un
 * tecnico: è il senso del blocco, e vale anche per la ricerca.
 *
 * ## Lo schema `FAQPage` si emette solo sulle risposte validate
 *
 * `kit/REGOLO_SEO-GEO-LEGAL.md` dice che i testi delle risposte vanno scritti
 * **con lo studio**. Le nostre sono una proposta, e finché è così restano fuori
 * dallo schema: dare a un motore di ricerca una risposta non confermata vuol
 * dire farla comparire in un risultato come se fosse dello studio. Le domande
 * si vedono comunque in pagina — marcate come proposta — perché è lì che
 * servono a chi legge e a chi le deve validare.
 *
 * Il primo `<details>` è aperto: chi arriva su una FAQ tutta chiusa spesso non
 * apre niente, e la prima domanda è quella che risponde al dubbio più comune.
 */
export function Faq({
  voci,
  titolo = 'Domande che ci fanno',
}: {
  voci: readonly VoceFaq[]
  titolo?: string
}) {
  if (voci.length === 0) return null
  const validate = voci.filter((v) => v.validato)

  return (
    <>
      <h2 className="mt-3">{titolo}</h2>

      <div className="faq mt-8">
        {voci.map((v, i) => (
          <details key={v.domanda} name="faq" open={i === 0}>
            <summary>
              {v.domanda}
              {!v.validato && (
                <span className="faq-proposta" title="Risposta da validare con lo studio">
                  proposta
                </span>
              )}
            </summary>
            <div className="faq-risposta">
              <p>{v.risposta}</p>
            </div>
          </details>
        ))}
      </div>

      {validate.length > 0 && (
        <JsonLd
          dati={{
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: validate.map((v) => ({
              '@type': 'Question',
              name: v.domanda,
              acceptedAnswer: { '@type': 'Answer', text: v.risposta },
            })),
          }}
        />
      )}
    </>
  )
}
