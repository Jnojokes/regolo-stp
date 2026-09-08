import { riempimento } from '@/lib/segnaposto'
import { VALORE_ATTESO } from '@/lib/numeri'

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
 * che sostituisce: cinque `[[DA CLIENTE` di `/opzione-b` stavano fuori dal
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
 * Il segnaposto di una **cifra**, e adesso rende un trattino.
 *
 * ## Perché non rende più un numero
 *
 * Rendeva `11`, `75`, `77.039`, `47` — cifre deterministiche ma **plausibili**,
 * nel colore del testo accanto, senza niente in pagina che le dichiarasse. La
 * deroga che circoscrive la regola 1 è scritta per il **lorem ipsum**
 * (`DECISIONI.md` n. 41: *«invece di mettere "DA CLIENTE" metti lorem ipsum»*),
 * e il lorem ipsum si riconosce a vista: «77.039 mq progettati» no. Nessuna
 * voce di `DECISIONI.md` estende quella deroga alle cifre — verificato — quindi
 * la estendeva questo componente di sua iniziativa.
 *
 * La mitigazione c'era e non arrivava dove serve: la barra della proposta scrive
 * «numeri, nomi e progetti sono segnaposto dichiarati», ma sta a `y 64-108` e su
 * `/opzione-c` l'ultima cifra sta a **`y 3822`**, cioè quasi quattromila pixel
 * più in basso.
 *
 * La soluzione non è nuova: è quella che **A usa da sempre** nello stesso
 * blocco (`lib/numeri.ts`, `VALORE_ATTESO`), ed è meglio di un
 * `[[DA CLIENTE: …]]` dentro una cifra da 129 px — che riempirebbe la cella su
 * tre righe e farebbe sembrare la striscia rotta invece che in attesa. Il
 * trattino a corpo display si legge come **una casella da riempire**, e la
 * richiesta resta nel DOM in `data-chiede`, dove `scripts/segnaposto.mjs` la
 * raccoglie.
 */
export function SegnapostoCifra({ chiede, className }: { chiede: string; className?: string }) {
  return (
    <span data-chiede={chiede} className={className ? `segnaposto ${className}` : 'segnaposto'}>
      {VALORE_ATTESO}
    </span>
  )
}
