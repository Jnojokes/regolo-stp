/**
 * Il testo di riempimento delle proposte C e D, e **la lista della spesa che
 * non deve sparire con lui**.
 *
 * ## Che cosa ha chiesto il committente, e cosa costava dirgli solo «sì»
 *
 * *«Invece di mettere "DA CLIENTE" metti lorem ipsum come placeholder.»* La
 * ragione è buona: C e D sono una **demo di vendita**, e una pagina con
 * trentaquattro `[[DA CLIENTE: nome del progetto]]` sposta la discussione sui
 * buchi invece che sull'impaginazione — è lo stesso argomento con cui la
 * decisione n. 27 ha fatto entrare i media di esempio.
 *
 * Ma i `[[DA CLIENTE: …]]` facevano **due lavori**, e solo uno era «farsi
 * vedere»:
 *
 * 1. dichiarare in pagina che il contenuto manca;
 * 2. **essere la lista della spesa**: `CONTENUTI-DA-CLIENTE.md` esiste perché
 *    quelle stringhe si possono contare, e il collaudo della fase 8 le cerca
 *    con un `grep`.
 *
 * Sostituire il testo e fermarsi lì avrebbe cancellato il secondo. Il giorno che
 * si chiedono i contenuti allo studio, nessuno saprebbe più *che cosa* chiedere,
 * e il difetto si scoprirebbe solo allora.
 *
 * ## Come restano tutti e due
 *
 * Il testo che si vede è lorem ipsum; **la richiesta resta nel DOM**, in un
 * attributo: `data-chiede="nome del progetto 01"`. Da lì
 * `scripts/segnaposto.mjs` la raccoglie dall'HTML **buildato di ogni rotta** e
 * genera la sezione di `CONTENUTI-DA-CLIENTE.md`.
 *
 * Raccogliere dall'HTML invece che dal codice non è un dettaglio: è **più
 * robusto del `grep` che sostituisce**. La critica della ricognizione ha trovato
 * che cinque `[[DA CLIENTE` di `/opzione-b` stanno **fuori** dal componente
 * `DaCliente` — due in un `<caption class="sr-only">`, due in
 * `.confronto-specifica`, uno in una `nota` passata dalla pagina — quindi erano
 * invisibili all'unico gancio automatico che c'era. Un raccoglitore che legge la
 * pagina resa non ha questo punto cieco: vede quello che vede il visitatore, più
 * gli attributi.
 *
 * ## Il testo è deterministico, e deve esserlo
 *
 * Nessun `Math.random()`: a parità di richiesta esce sempre la stessa frase.
 * Serve a due cose concrete — il diff di un build non cambia se non è cambiato
 * niente, e la resa del server è identica a quella del client, quindi non c'è
 * nessun disallineamento di idratazione da inseguire. Il seme è la richiesta
 * stessa, così due campi diversi non ricevono lo stesso riempimento e la pagina
 * non sembra fatta di frasi ripetute.
 *
 * ## Dove NON si usa
 *
 * - **In A**, che resta con i `[[DA CLIENTE: …]]` visibili: A è la proposta che
 *   il committente ha già dichiarato valida, e la regola 1 di `CLAUDE.md` vale
 *   dove il sito è candidato ad andare in produzione.
 * - **Sui ritratti**, mai: un lorem ipsum sotto la faccia di un ingegnere è la
 *   stessa cosa vietata dalla decisione n. 27 (c). I campi ritratto restano
 *   vuoti e il **nome** resta una richiesta dichiarata, non una parola finta.
 * - **Sui dati veri dello studio** (`lib/site.ts`): indirizzo, telefono, comuni
 *   ISTAT non sono segnaposto e non diventano lorem ipsum.
 */

/**
 * Il serbatoio. È il lorem ipsum canonico: chiunque lo riconosce a vista come
 * testo di riempimento, ed è esattamente la ragione per cui va bene qui — non
 * deve poter passare per una proposta di testo.
 */
const SERBATOIO =
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(
    ' ',
  )

/** Somma di controllo stabile su una stringa: è il seme, e non è casuale. */
function seme(chiave: string): number {
  let h = 0
  for (let i = 0; i < chiave.length; i += 1) h = (h * 31 + chiave.charCodeAt(i)) % 100003
  return h
}

/**
 * `parole` parole di riempimento, sempre le stesse per la stessa `chiave`.
 *
 * `maiuscola` alza la prima lettera: serve dove il segnaposto sta al posto di un
 * titolo o di un nome, cioè dove una minuscola si leggerebbe come un errore di
 * composizione invece che come un riempimento.
 */
export function riempimento(chiave: string, parole: number, maiuscola = true): string {
  const da = seme(chiave) % SERBATOIO.length
  const scelte: string[] = []
  for (let i = 0; i < parole; i += 1) scelte.push(SERBATOIO[(da + i) % SERBATOIO.length])
  const testo = scelte.join(' ')
  return maiuscola ? testo.charAt(0).toUpperCase() + testo.slice(1) : testo
}

/**
 * Un numero di riempimento, deterministico, per i campi che aspettano una cifra
 * (anni, mq, conteggi). **Non è un dato inventato che passa per vero**: sta
 * dentro un elemento con `data-chiede`, la barra della proposta dichiara che i
 * numeri sono segnaposto, e la lista della spesa lo elenca. È la stessa
 * circoscrizione della decisione n. 27, applicata al testo invece che ai media.
 */
export function cifra(chiave: string, cifre: number): string {
  const n = seme(chiave)
  const grezzo = String(n).padStart(cifre, '7').slice(0, cifre)
  /* Le migliaia si separano come le scrive un italiano: 1.240, non 1,240. */
  return Number(grezzo).toLocaleString('it-IT')
}
