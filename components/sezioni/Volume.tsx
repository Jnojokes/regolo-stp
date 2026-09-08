import {
  VIEWBOX,
  DESCRIZIONE,
  facce,
  puntiFaccia,
  spigoliVisibili,
  tracciaSpigoli,
} from '@/lib/volume'

/**
 * L'oggetto tridimensionale della hero di A — **bianco su bianco**, in SVG
 * server-rendered, zero JavaScript.
 *
 * ## Perché al posto della fotografia
 *
 * È il gesto misurato di **AIR** (`kit/reference/air/air-1440-meta.png`): la
 * prima schermata non ha né una foto né un colore, ha le lettere spinte ai due
 * margini e in mezzo un oggetto che passa **dietro e fra** loro e si legge solo
 * per la propria ombra. Ed è la risposta a un fatto di questo repo, non a un
 * gusto: lo studio **non ha una fotografia** — ne ha 62 di segnaposto — mentre i
 * volumi dell'edificio ce li ha già, in `lib/esploso.ts` e `lib/volume.ts`, e
 * sono un dato del repo, non un contenuto inventato (regola 1).
 *
 * ## Solido, non fil di ferro — ed è la differenza fra A e B
 *
 * Alla prima passata questo componente disegnava **tutti e ventinove** gli
 * spigoli sopra le facce, comprese le tre di dietro, e il risultato si vedeva:
 * una scatola trasparente, cioè un disegno tecnico. Ma il disegno tecnico è la
 * lingua di **B**, che infatti lo stesso volume lo rende in fil di ferro
 * (`components/ecolinear/Volume.tsx`); su AIR l'oggetto è un **solido**.
 *
 * Adesso: le cinque facce visibili piene, e sopra **solo** gli spigoli che
 * giacciono su una di loro (`spigoliVisibili`, 21 su 29 — il criterio è
 * geometrico ed è in `lib/volume.ts`). Fuori restano gli spigoli di dietro, che
 * erano quelli che facevano leggere l'oggetto come una gabbia.
 *
 * Tre valori vicinissimi al bianco per i tre `tono` — 1,32 · 1,17 · 1,06:1 sulla
 * carta — più un filo da 1 px a `--regolo-line` (4,61:1), che è la sola cosa che
 * porta la figura sopra la soglia 3:1 di WCAG 1.4.11. Niente ombre morbide e
 * niente gradienti: l'ombra qui è la **faccia**, come in un'assonometria.
 */
export function Volume({ id = 'hero-volume-titolo' }: { id?: string }) {
  return (
    <svg
      className="hero-volume"
      viewBox={VIEWBOX}
      role="img"
      aria-labelledby={id}
      /* `meet`, e la scala la decide il riquadro che gli dà il CSS. Con `slice`
         l'oggetto riempiva tutta la scena e diventava una velatura grigia
         dietro il testo: su AIR l'oggetto **non** riempie la pagina — occupa
         una fascia, esce dai bordi in alto e in basso, e intorno resta molta
         carta. Quella proporzione è il gesto; riempire tutto è un fondino. */
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Non è `aria-hidden`: la figura **porta informazione** — è lo schema
          dell'edificio di cui parla il payoff — e chi non la vede deve
          riceverla. Un solo nodo di testo, composto altrove: con testo statico
          più un'espressione React serializza un separatore e l'idratazione
          rigenera l'albero (errore 418, già visto sulla mappa del territorio). */}
      <title id={id}>{DESCRIZIONE}</title>

      {facce.map((f) => (
        <polygon
          key={f.nome}
          className={`hero-volume-faccia hero-volume-tono-${f.tono}`}
          points={puntiFaccia(f)}
        />
      ))}

      {/* Un `path` solo per tutti gli spigoli visibili: `tracciaSpigoli()` li
          concatena, e ventuno `<line>` sarebbero ventuno nodi nell'HTML per lo
          stesso disegno. */}
      <path className="hero-volume-filo" d={tracciaSpigoli(0, 34, spigoliVisibili)} />
    </svg>
  )
}
