import type { ReactNode } from 'react'

/**
 * Il guscio dell'opzione C — e il motivo per cui non è quello di nessun altro.
 *
 * ## Perché esiste un terzo guscio
 *
 * A usa `components/sezioni/Sezione.tsx`: sezioni separate dal vuoto, con tre
 * passi dichiarati (48 · 96 · 200). B usava `components/campo/Campo.tsx`: campi
 * contigui divisi da un filetto. C e D usavano **quello di B**, ed è la ragione
 * per cui la misura non scendeva: classi condivise sul build 97 % → 94 % → 91 %,
 * e sotto la piega il markup di C e D differiva di **12 righe su 522**. Un
 * guscio codifica un ritmo, e il ritmo era il difetto in forma di componente.
 *
 * ## Che cosa fa questo, invece: una lastra per finestra
 *
 * Non è una scelta di gusto, è la reference misurata. `1440-intera.jpeg` di
 * Studio Foundry è alta **17.503 px** e solo il **15,6 %** dell'altezza contiene
 * pixel diversi dal fondo: **l'84 % è carta vuota**. I media stanno a **passo
 * verticale 900 px esatto**, cioè uno per schermata. Il vuoto non è il residuo
 * fra due blocchi: è la struttura.
 *
 * Tre conseguenze, e sono la differenza:
 *
 * 1. **una colata occupa una finestra**, `min-height: 100svh`, e dentro di lei
 *    il contenuto è poco e sta in alto o in basso, mai «centrato nel blocco».
 *    Dove A dichiara un passo fra due sezioni, qui non c'è nessun passo: c'è
 *    l'altezza della finestra;
 * 2. **la riga di metadati passa dietro la lastra**, non sotto. È misurato su
 *    `390-meta.jpeg`: la riga corre da x 12 a x 377 e la fotografia la copre in
 *    mezzo, quindi si vedono solo i due capi (`RESIDENTIAL` risulta troncata a
 *    x=42). Noi la mettevamo **sotto** l'immagine, in un `flex` con
 *    `space-between`: lo stesso gesto in due z-order diversi, e il loro è più
 *    forte perché la lastra *interrompe* il dato invece di didascalizzarlo;
 * 3. **nessun filetto fra le colate.** Il filetto era di B, dove serviva a
 *    dividere campi contigui. Qui le colate non si toccano: non c'è niente da
 *    dividere.
 *
 * ## Cosa NON c'è
 *
 * **Nessun titolo di sezione grande.** In C il titolo grande è **uno** e sta
 * nella copertina: è il marchio. Le colate portano un'etichetta in mono e, al
 * massimo, una riga. Se una colata avesse un `h2` a 40 px, C diventerebbe una
 * pagina di sezioni con delle foto — cioè A con un altro carattere.
 *
 * **Nessun contatore di sezione.** È il gesto di Storey e sta in D, dove è
 * diventato il numero di pagina del fascicolo. Qui non c'è niente da numerare:
 * le colate non sono una sequenza.
 */
export function Colata({
  id,
  etichetta,
  valore,
  children,
  media,
  primo = false,
  className = '',
}: {
  id?: string
  /**
   * Il capo sinistro della riga di metadati: che cos'è questa colata. Mono,
   * minuscola, sotto i 14 px — sopra, una mono smette di essere un'annotazione
   * e diventa contenuto.
   */
  etichetta?: ReactNode
  /**
   * Il capo destro, all'altro estremo della riga, con il vuoto in mezzo. È il
   * gesto che `kit/reference/SCHEDA.md` dice di prendere da Studio Foundry:
   * `RESIDENTIAL` a x 81-175 e `2025` a x 1369-1406, **1194 px di vuoto**
   * misurati fra i due. Non «uniti da un puntino», che è la tell di casa.
   */
  valore?: ReactNode
  /** Il testo, poco: una riga, una cifra, un nome. */
  children?: ReactNode
  /** La lastra: passa **sopra** la riga di metadati e la taglia in mezzo. */
  media?: ReactNode
  /** La prima colata dopo la copertina non ha bisogno di tutta la finestra. */
  primo?: boolean
  className?: string
}) {
  const haRiga = etichetta || valore

  return (
    <section
      id={id}
      className={['colata', primo ? 'colata-prima' : '', className].filter(Boolean).join(' ')}
    >
      {haRiga && (
        <p className="colata-riga">
          {etichetta && <span className="colata-riga-capo">{etichetta}</span>}
          {valore && <span className="colata-riga-capo">{valore}</span>}
        </p>
      )}
      {children}
      {media}
    </section>
  )
}

/**
 * Il documento di C: **non dipinge niente e non spazia niente.**
 *
 * Tiene un solo valore, il tetto di 1440 px, e lo tiene perché le colate lo
 * leggono per calcolare i propri margini. Che sia vuoto è il punto: in B il
 * contenitore dipingeva il foglio e dichiarava il 34,4 % da cui cominciava; qui
 * non c'è nessun foglio e nessun asse, c'è la carta e quello che ci sta sopra.
 */
export function Getto({ children }: { children: ReactNode }) {
  return <div className="getto">{children}</div>
}
