import { cifra, riempimento } from '@/lib/segnaposto'

/**
 * Il segnaposto di testo delle proposte C e D: **lorem ipsum in pagina, la
 * richiesta nel DOM**.
 *
 * Il perché sta per esteso in `lib/segnaposto.ts`. In breve: il committente ha
 * chiesto il lorem ipsum al posto dei `[[DA CLIENTE: …]]` perché C e D sono una
 * demo di vendita, e quelle stringhe facevano **due** lavori — dichiarare il
 * buco *e* essere la lista della spesa. Qui il primo lavoro lo fa il testo
 * finto, il secondo lo fa `data-chiede`, che `scripts/segnaposto.mjs` raccoglie
 * dall'HTML buildato per generare `CONTENUTI-DA-CLIENTE.md`.
 *
 * `data-chiede` è anche il gancio del collaudo, e copre **più** casi del `grep`
 * che sostituisce: cinque `[[DA CLIENTE` di `/opzione-c` stavano fuori dal
 * componente `DaCliente` — in un `caption.sr-only`, in due
 * `.confronto-specifica`, in una `nota` passata dalla pagina — quindi il gancio
 * vecchio non li vedeva.
 *
 * **Non si usa in A** (che resta con i segnaposto visibili: è la proposta
 * candidata alla produzione) e **non si usa sui nomi delle persone**, dove un
 * lorem ipsum sotto la faccia di un ingegnere sarebbe la cosa vietata dalla
 * decisione n. 27 (c).
 */
export function Segnaposto({
  chiede,
  parole = 3,
  maiuscola = true,
  className,
}: {
  /**
   * Che cosa manca, in parole, e **come lo si chiede allo studio**: finisce
   * verbatim in `CONTENUTI-DA-CLIENTE.md`, quindi si scrive come lo leggerebbe
   * il titolare — «nome del progetto 01», non «titolo».
   */
  chiede: string
  parole?: number
  maiuscola?: boolean
  className?: string
}) {
  return (
    <span
      data-chiede={chiede}
      className={className ? `segnaposto ${className}` : 'segnaposto'}
      /* `lang="la"` non è pignoleria: senza di lui una sintesi vocale italiana
         legge «lorem ipsum dolor» con la fonetica italiana e suona come se
         fosse contenuto. Dichiararlo latino è il minimo che si può fare per non
         far passare un riempimento per una frase. */
      lang="la"
    >
      {riempimento(chiede, parole, maiuscola)}
    </span>
  )
}

/**
 * Il segnaposto di una **cifra**: gli stessi due lavori, e la stessa
 * circoscrizione della decisione n. 27 — il valore si vede, ma è dichiarato
 * segnaposto dall'attributo, dalla barra della proposta e dalla lista della
 * spesa. Fuori da C e D non si usa.
 */
export function SegnapostoCifra({
  chiede,
  cifre = 2,
  className,
}: {
  chiede: string
  cifre?: number
  className?: string
}) {
  return (
    <span data-chiede={chiede} className={className ? `segnaposto ${className}` : 'segnaposto'}>
      {cifra(chiede, cifre)}
    </span>
  )
}
