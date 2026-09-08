import type { ReactNode } from 'react'

/**
 * Il guscio dell'opzione B — e il motivo per cui B non usa `Sezione.tsx`.
 *
 * ## Perché esiste un secondo guscio
 *
 * Non per gusto, e non perché condividere sia sbagliato: `CLAUDE.md` § Due
 * opzioni prescrive «sezioni come componenti riusati con `order`», ed è quello
 * che si è fatto per due passate. Il problema è che **`Sezione.tsx` codifica un
 * ritmo**, e il ritmo era il difetto in forma di componente.
 *
 * Misurato sul build (fase 3 ter): le due home rendevano **123 classi CSS
 * uguali su 165**, e i due temi dichiaravano **42 token con lo stesso identico
 * valore** — fra cui `--regolo-passo-corto/normale/largo`, `--regolo-margine`,
 * `--regolo-gutter`, `--regolo-wrap`, `--regolo-colonne`. Cioè: *l'intero
 * sistema di impaginazione era byte-identico nei due temi*, e undici delle 123
 * classi condivise erano proprio il guscio (`.sezione`, `.passo-*`,
 * `.testa-sezione`, `.etichetta-sezione`, `.intro-sezione`, `.corpo-sezione`,
 * `.nota-cantiere`, `.wrap`). Finché le due pagine cadono sullo stesso respiro,
 * qualunque cosa si cambi ai colori produce **una terza colorazione della
 * stessa pagina** — che è l'errore già fatto due volte.
 *
 * ## Che cosa fa questo, invece
 *
 * In B non ci sono sezioni separate da un vuoto: c'è **un documento**, e i
 * blocchi sono **campi contigui divisi da un filetto**. Tre conseguenze, e sono
 * la differenza:
 *
 * 1. **Non esiste un ritmo verticale.** Niente `passo-corto/normale/largo`: un
 *    campo pende dal proprio filetto di `--regolo-appeso` (12 px) e finisce
 *    dove finisce il suo contenuto. Gli intervalli escono **disuguali per
 *    costruzione** — è la lettura letterale del vuoto disuguale misurato su
 *    Storey, e nega alla radice l'aggiunta di casa «lo stesso padding fra tutti
 *    i blocchi». L'unico vuoto dichiarato di tutta la pagina è il silenzio
 *    davanti al brief (`--regolo-silenzio`).
 * 2. **Il foglio è uno solo, e continuo per costruzione.** Prima erano otto
 *    rettangoli bianchi appoggiati su un fondo — cioè il cluster n. 4 dentro la
 *    proposta che dovrebbe non averlo — elencati a mano in `globals.css`, e ogni
 *    blocco nuovo andava ricordato lì o usciva illeggibile. Adesso c'è **una
 *    classe sola**, `.campo-foglio`, e i campi sono contigui: il padding di uno
 *    finisce dove comincia il filetto del prossimo, quindi le colonne bianche
 *    si saldano in una. Non c'è un foglio da inventare per blocco.
 *    (Il primo tentativo dipingeva una banda di sfondo su `<Documento>`: più
 *    elegante, e **invisibile a `scripts/collaudo/contrasto-dom.mjs`**, che
 *    cerca un `background-color` risalendo gli antenati. Un piano che il
 *    collaudo non sa misurare torna illeggibile in silenzio — è già successo
 *    due volte in questa fase. Il commento lungo sta in `app/css/campi.css`.)
 * 3. **Il margine di classificazione è la tavola, non un pannello.** Niente
 *    bordo, niente fondo, niente raggio: è il margine del disegno, e ci sta
 *    l'apparato — l'etichetta fra quadre e, dove ce n'è uno, l'indice del
 *    campo.
 *
 * ## Quello che NON c'è, e va lasciato fuori
 *
 * **Nessun numero di campo** (`01…08`). Sembrava la mossa giusta — l'archivio
 * che si numera — ed è invece l'occhiello «SEZ. 01 —» traslato nel margine di
 * sinistra: un numero che il lettore conta a vista non è informazione
 * (`components/Quota.tsx`, le tre condizioni). **Nessuno stato dichiarato**
 * (`[vuoto]`, `[proposta]`): un'identità non può avere per motore uno stato
 * transitorio del repo — il giorno che i contenuti arrivano resterebbero otto
 * etichette morte. **Nessun filetto sopra il titolo**: in B un filetto esiste
 * solo se delimita un piano o porta uno stato, mai per annunciare un blocco.
 *
 * Il titolo è sempre un `<h2>`: l'`<h1>` è uno per pagina e ce l'ha la hero.
 */
export function Campo({
  id,
  etichetta,
  titolo,
  intro,
  azione,
  margine,
  nota,
  children,
  primo = false,
  pieno = false,
  className = '',
}: {
  id?: string
  /** L'etichetta del campo: minuscola, fra parentesi quadre messe dal CSS. Sta nel margine, sulla tavola. */
  etichetta?: string
  /** Il titolo del campo. Sempre `h2`. */
  titolo?: ReactNode
  /** Una riga di intento sotto il titolo. */
  intro?: ReactNode
  /** Un'uscita allineata al titolo, spinta al bordo destro del foglio. */
  azione?: ReactNode
  /**
   * L'apparato che appartiene a **questo** campo e vive nel margine di
   * classificazione: l'elenco delle fasi, i ruoli firmabili. Non decorazione —
   * se non c'è niente da mettere, il margine resta vuoto, ed è il vuoto
   * disuguale di Storey.
   */
  margine?: ReactNode
  /** Nota di cantiere: «questo campo è vuoto per scelta, il contenuto arriva dallo studio». */
  nota?: ReactNode
  children?: ReactNode
  /** Il primo campo del documento non porta il filetto in testa: non separa niente. */
  primo?: boolean
  /**
   * Il campo esce dal foglio e attraversa tutta la larghezza, i due piani
   * compresi. **Uno solo in tutta la pagina**: il prima/dopo, dove il taglio
   * fra tavola e foglio *è* il contenuto.
   */
  pieno?: boolean
  className?: string
}) {
  const classi = ['campo', primo ? 'campo-primo' : '', pieno ? 'campo-pieno' : '', className]
    .filter(Boolean)
    .join(' ')

  const haTesta = titolo || intro || azione

  return (
    <section id={id} className={classi}>
      {/* Il margine di classificazione: sta sulla tavola, quindi qui dentro
          `--regolo-ink` è chiaro e non va ridichiarato niente. A 390 px questa
          colonna si ribalta in una striscia orizzontale sopra il campo, con
          l'apparato spinto ai due bordi (la riga a tre tempi di Pelizzari). */}
      <div className="campo-margine">
        {etichetta && <p className="campo-etichetta">{etichetta}</p>}
        {margine}
        {/* La nota di cantiere sta **nel margine**, non in fondo al contenuto:
            è un'annotazione a margine, che è letteralmente il posto suo. E
            libera il foglio, dove interrompeva la lettura del campo con una
            riga di servizio. A 390 px la striscia non la regge — lì torna in
            fondo al foglio, dove c'era. */}
        {nota && <p className="nota-cantiere campo-nota">{nota}</p>}
      </div>

      {/* La colonna del contenuto sta **sul foglio**, e lo dichiara. Il foglio
          non è dipinto qui — lo dipinge `<Documento>` una volta sola per tutta
          la pagina — ma i token vanno ridichiarati lo stesso, perché un
          elemento non sa su quale piano si trova. Vedi il blocco «B: i token
          sono legati al PIANO» in `app/globals.css`: si ridichiarano **tutti e
          due i prefissi**, e `--regolo-surface` non si tocca. */}
      <div className="campo-foglio" data-piano={pieno ? undefined : 'foglio'}>
        {haTesta && (
          <div className="campo-testa">
            <div>
              {titolo && <h2>{titolo}</h2>}
              {intro && <p className="campo-intro">{intro}</p>}
            </div>
            {azione}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

/**
 * Il foglio — **uno solo**, e lo dipinge lui.
 *
 * Tiene due cose e nient'altro: il tetto di 1440 px (`CLAUDE.md` §
 * Impaginazione — la tavola continua fuori, ed è giusto: la tavola è la pagina,
 * il documento è quello che ci sta sopra) e il **34,4 %** da cui comincia il
 * foglio, che i campi leggono in `--campo-x`.
 *
 * Il 34,4 % è misurato, non scelto: Kononenko butta l'etichetta «Offices» nel
 * margine vuoto a x≈417 e comincia la tabella a **x = 493 su 1440, cioè il
 * 34,2 %**. È lo stesso valore che l'asse aveva già: l'asse non è più un filetto
 * disegnato sopra la pagina, **è diventato il bordo del foglio** — un filetto in
 * meno che attraversa il testo, e un oggetto in più che porta informazione.
 *
 * Sotto i 56 rem il foglio va a tutta larghezza e sono i margini dei campi a
 * diventare strisce di tavola sopra di esso (decisione n. 24: a 96 px l'asse
 * passava in mezzo al testo).
 */
export function Documento({ children }: { children: ReactNode }) {
  return <div className="documento">{children}</div>
}
