import { Sezione } from '@/components/sezioni/Sezione'
import { fasi, introProcesso } from '@/lib/processo'

/**
 * «E poi cosa succede?» (CLAUDE.md § Homepage, blocco 6 · catalogo blocchi C2).
 *
 * Nel funnel sta fra la prova (progetti, servizi) e il brief, e serve a togliere
 * l’ultima paura di chi non ha mai costruito: non «siete bravi?», ma «cosa mi
 * capita nei prossimi due anni?». Chi arriva qui ha già il nome sul tavolo e sta
 * confrontando due studi: vince quello che rende il processo prevedibile. Per
 * questo il blocco dichiara i cinque passaggi e la persona di riferimento, e
 * non dichiara tempi né costi — quelli sarebbero una promessa, e le promesse
 * sulle pratiche non si fanno (CLAUDE.md § Obiettivo).
 *
 * Un solo componente, due varianti, perché il contenuto è uno: `lib/processo.ts`
 * tiene lo stesso testo a due misure (`testoLungo` per la lista di A, dove c’è
 * spazio, `testoBreve` per la timeline di B, dove una riga in più manda a capo
 * cinque colonne). Se fossero due componenti, alla terza revisione del testo
 * sarebbero due contenuti diversi.
 *
 * Niente JavaScript, e non è una rinuncia: la colonna ferma di A è
 * `position: sticky` scritto in `sezioni.css`, quindi funziona anche a JS
 * spento. L’avanzamento allo scroll arriva alla fase 5 e si aggiunge sopra
 * questo markup, non lo sostituisce.
 *
 * La numerazione è fatta in due modi diversi di proposito. In A i «01…05» sono
 * un counter CSS: sono un fatto tipografico, e la sequenza per chi ascolta è già
 * detta dall’`<ol>`. In B «Passo 1» sta nel markup perché lì è l’etichetta del
 * passaggio, non un numero decorativo, e nella timeline orizzontale è l’unica
 * cosa che dice in che ordine si leggono cinque colonne affiancate.
 *
 * Le due liste portano `role="list"` per la stessa ragione dei numeri di
 * `Numeri`: il reset di Tailwind e `list-style: none` togliono a Safari le
 * semantiche di elenco, e qui la sequenza *è* il contenuto — se la togli a chi
 * ascolta, l’`<ol>` non serve più a niente.
 */
export function ComeLavoriamo({
  variante,
  id = 'processo',
}: {
  /**
   * `elenco` = opzione A: colonna ferma a sinistra e cinque fasi lunghe a destra.
   * `timeline` = opzione B: fascia scura e cinque passaggi brevi in orizzontale.
   */
  variante: 'elenco' | 'timeline'
  /** L’ancora del blocco: il menu e la barra della proposta puntano qui. */
  id?: string
}) {
  if (variante === 'timeline') {
    return (
      <Sezione
        id={id}
        fondo="scuro"
        etichetta="come lavoriamo"
        titoloLargo
        titolo="E poi cosa succede? Cinque passaggi, sempre gli stessi."
      >
        {/* Una `<ol>` e non cinque `<div>` come nel prototipo: la sequenza è il
            contenuto del blocco, e deve stare nel markup e non solo nel disegno. */}
        <ol className="processo-timeline" role="list">
          {fasi.map((fase, indice) => (
            <li key={fase.titolo}>
              <span className="processo-passo">Passo {indice + 1}</span>
              <strong className="processo-titolo">{fase.titolo}</strong>
              <p>{fase.testoBreve}</p>
            </li>
          ))}
        </ol>
      </Sezione>
    )
  }

  return (
    <Sezione id={id}>
      {/* Qui la testa di sezione non la mette `Sezione`: deve stare *dentro* la
          colonna che resta ferma, non sopra le due colonne. Le classi sono le
          stesse che usa `Sezione`, così il ritmo con gli altri blocchi tiene. */}
      <div className="grid-12 items-start">
        {/* Il margine sotto vale solo su mobile: lì la colonna non è più
            affiancata e il solo gap della griglia (16 px) incollerebbe la testa
            alla prima fase. Sopra i 56rem la colonna torna ferma di fianco
            all’elenco e il margine sparisce. */}
        <div className="processo-colonna nav:col-span-5 nav:mb-0 col-span-12 mb-6">
          <p className="etichetta-sezione">Come lavoriamo</p>
          <h2 className="mt-3 max-w-[26ch]">E poi cosa succede?</h2>
          <p className="intro-sezione text-lead">{introProcesso}</p>
        </div>

        <ol className="processo-elenco nav:col-start-7 nav:col-span-6 col-span-12" role="list">
          {fasi.map((fase) => (
            <li key={fase.titolo}>
              {/* Il `<div>` non è di troppo: ogni `<li>` è una griglia di due
                  colonne e la prima la occupa il counter CSS. Senza involucro il
                  testo finirebbe sotto il numero invece che accanto. */}
              <div>
                <strong className="processo-titolo">{fase.titolo}</strong>
                <p>{fase.testoLungo}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Sezione>
  )
}
