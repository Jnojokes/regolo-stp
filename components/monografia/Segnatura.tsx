import type { ReactNode } from 'react'

/**
 * Il guscio dell'opzione D: **una pagina di fascicolo**.
 *
 * ## Perché è il terzo guscio e non una variante del primo
 *
 * A separa le sezioni col vuoto (tre passi: 48 · 96 · 200). C mette una lastra
 * per finestra e vuoto in mezzo. D **impagina**: occhiello corrente in alto,
 * folio al margine esterno, misura su due colonne, figure con didascalia
 * numerata. Sono tre ritmi diversi, e finché C e D usavano il guscio di B la
 * misura non scendeva — classi condivise sul build 97 % → 94 % → 91 %, e sotto
 * la piega 12 righe di diff su 522.
 *
 * Il committente ha chiesto *«uno più istituzionale editorial artigiano
 * architetto»*: la monografia stampata. Storey resta la reference dei **valori
 * misurati** (interlinea stretta, spaziatura negativa anche sul maiuscolo,
 * vuoto disuguale, immagine che sborda da un lato, contatore tono su tono,
 * schedina a righe), non del tono — Storey è minimale e quieta.
 *
 * ## Il contatore tono su tono diventa il **folio**, e non è un travestimento
 *
 * Nella versione precedente era `aria-hidden` più `data-decorativo`, a 1,48:1
 * di contrasto, perché non portava informazione: un numero che il lettore conta
 * a vista non è un dato (`components/Quota.tsx`, le tre condizioni). Come
 * **numero di pagina** porta informazione — dice dove sei nel fascicolo — e
 * allora tre cose cambiano insieme: diventa testo vero, prende un contrasto AA,
 * e **perde `data-decorativo`**. Quell'attributo è un contratto verso
 * `scripts/collaudo/contrasto-dom.mjs` (decisione n. 38): un elemento che porta
 * informazione non può averlo, altrimenti il collaudo smette di guardarlo.
 *
 * ## Il vuoto disuguale è una regola, non un padding
 *
 * Misurato su Storey: nella banda nera l'immagine parte a 500 px dall'alto e le
 * due colonne di testo a 440, e sopra restano 400 px di nero che non fanno
 * niente. Non è centratura e non è padding: è composizione. Qui si esprime con
 * `respiro`, che moltiplica lo spazio **in testa** alla segnatura — quindi lo
 * spazio fra due pagine appartiene alla **seconda**, come in A, ma il valore è
 * dichiarato pagina per pagina invece di venire da tre passi fissi. Mai lo
 * stesso padding fra tutti i blocchi.
 */
export function Segnatura({
  id,
  folio,
  occhiello,
  titolo,
  children,
  figura,
  respiro = 1,
  fondo = 'carta',
  className = '',
}: {
  id?: string
  /**
   * Il numero di pagina, al margine esterno. **Informazione**, non
   * decorazione: vedi il cappello. Va dato in ordine crescente — se due
   * segnature portano lo stesso folio, il fascicolo è sbagliato e si vede.
   */
  folio: string
  /**
   * L'occhiello corrente: in un libro è la riga che dice in che capitolo sei, e
   * si ripete a ogni pagina. In mono, sotto i 14 px, spaziatura **−10 %** —
   * il valore misurato su Storey, e l'opposto del `+0,14em` di default.
   */
  occhiello: string
  titolo?: ReactNode
  children?: ReactNode
  /**
   * La figura, con la sua didascalia. Sborda da **un** lato solo: è il gesto
   * misurato di Storey (un file da 1512 px posizionato a `x = −36`, cioè fuori
   * di 36 px per lato; nelle bande l'immagine sborda da un solo lato).
   */
  figura?: ReactNode
  /** Il moltiplicatore del vuoto in testa. 1 · 2,2 · 2,8 sono i valori misurati. */
  respiro?: number
  /** `carta` è il bianco del fascicolo; `nera` è la banda a metà pagina. */
  fondo?: 'carta' | 'nera'
  className?: string
}) {
  return (
    <section
      id={id}
      className={['segnatura', className].filter(Boolean).join(' ')}
      data-fondo={fondo === 'nera' ? 'nera' : undefined}
      style={{ '--respiro': respiro } as React.CSSProperties}
    >
      <div className="segnatura-testa">
        <p className="segnatura-occhiello">{occhiello}</p>
        {/* Il folio è un `<p>` e non uno `<span>` dentro l'occhiello: sono due
            informazioni diverse — dove sei nel capitolo, e a che pagina — e in
            un fascicolo stanno ai due estremi della riga. */}
        <p className="segnatura-folio">{folio}</p>
      </div>
      {titolo && <h2 className="segnatura-titolo">{titolo}</h2>}
      {children && <div className="segnatura-corpo">{children}</div>}
      {figura}
    </section>
  )
}

/**
 * La figura con la sua didascalia: **`fig. 03 —`**, non «immagine 3».
 *
 * È l'apparato di D, e sostituisce la quota di A. Serviva una sostituzione e non
 * un'omissione: il terminatore obliquo a 45° di A vive in una regola **non
 * isolata per tema** (`app/css/sezioni.css`, `.quota > *::before`) e l'unico
 * override stava in `.quota-registro`, che è morto con l'opzione B. Senza un
 * apparato proprio, D porterebbe la firma grafica di A — che è il difetto che
 * la ricognizione ha trovato e che nessuno aveva visto.
 *
 * Le tre condizioni della quota non si applicano qui, e va detto perché: una
 * quota misura una quantità che il visitatore non conta a vista (`CLAUDE.md`
 * § L'apparato). Una didascalia non misura niente — **nomina**. Sono due
 * apparati diversi, ed è giusto che le due proposte ne abbiano uno ciascuna.
 */
export function Figura({
  numero,
  didascalia,
  children,
  sborda = 'destra',
}: {
  /** Progressivo nel fascicolo. Le figure di un monografico si citano. */
  numero: number
  didascalia: ReactNode
  children: ReactNode
  /** Da quale lato esce dalla misura. **Uno solo**: è la regola di Storey. */
  sborda?: 'destra' | 'sinistra'
}) {
  return (
    <figure className="figura" data-sborda={sborda}>
      {children}
      <figcaption className="figura-didascalia">
        <span className="figura-numero">fig. {String(numero).padStart(2, '0')}</span>
        <span className="figura-testo">{didascalia}</span>
      </figcaption>
    </figure>
  )
}

/** Il fascicolo: tiene la misura, e non dipinge niente. */
export function Fascicolo({ children }: { children: ReactNode }) {
  return <div className="fascicolo">{children}</div>
}
