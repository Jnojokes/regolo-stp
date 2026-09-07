/**
 * I cinque passi del brief (CLAUDE.md § Il form).
 *
 * Questo file è l'unica fonte di verità: da qui si generano il markup, la
 * validazione (client e server) e le due mail. Cambiare una domanda qui la
 * cambia in tutti e tre i posti, e non serve toccare altro.
 *
 * Regole di costruzione (catalogo blocchi F1):
 *  — una domanda per schermata, si parte dalla più facile;
 *  — ogni risposta è un bottone finché è possibile: qui sono `radio` nativi,
 *    che senza JavaScript conservano la scelta e da tastiera funzionano già;
 *  — i dati personali solo all'ultimo passo;
 *  — il campo libero finale è opzionale.
 *
 * Isomorfo: nessun import di Node, nessun import dei 128 comuni. Lo usa anche
 * il componente client, quindi qui dentro non entra niente di pesante.
 */

export type Opzione = { valore: string; etichetta: string }

export type Gruppo = {
  genere: 'gruppo'
  nome: string
  /** Etichetta del gruppo. Si usa solo quando il passo ha più di un elemento. */
  etichetta: string
  opzioni: readonly Opzione[]
}

export type Campo = {
  genere: 'campo'
  nome: string
  etichetta: string
  tipo: 'testo' | 'comune' | 'tel' | 'email' | 'testolungo'
  obbligatorio: boolean
  aiuto?: string
  /** Va nell'attributo `autocomplete`: fa risparmiare tempo su mobile. */
  autoCompleta?: string
  massimo: number
  /**
   * Il `pattern` HTML del campo. **Serve solo a chi non ha JavaScript**, ed è
   * la differenza fra un errore che il browser segnala sul campo — con le
   * risposte al loro posto — e un errore che solo il server vede, che costa un
   * 303 e tutte e cinque le risposte.
   *
   * Deve essere più **permissivo** della validazione lato server, non più
   * severo: qui si scartano solo le cose che il server rifiuterebbe di sicuro.
   * Se i due divergono, la parola resta al server (`validazione.ts`).
   */
  schema?: string
  /** Il messaggio nativo quando il `pattern` non passa. */
  schemaTitolo?: string
}

export type Consenso = { genere: 'consenso'; nome: string }

export type Elemento = Gruppo | Campo | Consenso

export type Passo = {
  id: string
  /** La domanda. Diventa il `<legend>` del passo: non un heading, così la
   *  gerarchia dei titoli della pagina resta intatta (un solo h1). */
  domanda: string
  aiuto?: string
  elementi: readonly Elemento[]
}

/* -------------------------------------------------------------------------- */

export const passi: readonly Passo[] = [
  {
    id: 'intervento',
    domanda: 'Che tipo di intervento?',
    elementi: [
      {
        genere: 'gruppo',
        nome: 'intervento',
        etichetta: 'Tipo di intervento',
        opzioni: [
          { valore: 'casa-nuova', etichetta: 'Casa nuova' },
          { valore: 'ristrutturazione', etichetta: 'Ristrutturazione o ampliamento' },
          { valore: 'pratica-bonus', etichetta: 'Pratica o bonus' },
          { valore: 'struttura-sisma', etichetta: 'Struttura e sisma' },
          { valore: 'opera-pubblica', etichetta: 'Opera pubblica' },
          { valore: 'altro', etichetta: 'Altro' },
        ],
      },
    ],
  },
  {
    id: 'dove',
    domanda: 'Dove si trova?',
    elementi: [
      {
        genere: 'campo',
        nome: 'comune',
        etichetta: 'Comune',
        tipo: 'comune',
        obbligatorio: true,
        aiuto: 'Fermo, Macerata, Ascoli Piceno e provincia. Anche fuori: scrivilo comunque.',
        autoCompleta: 'address-level2',
        massimo: 80,
        /* Lettere, apostrofi, trattini, punti e spazi — più la sigla della
           provincia in coda, con o senza parentesi, perché è quello che il
           `<datalist>` mostra («Fermo (FM)») e quindi quello che la gente
           scrive. La sigla la togliamo noi in `pulisciComune`. */
        schema: "\\p{L}[\\p{L}’' .\\-]*(?:[ ,]*\\(?[A-Za-z]{2}\\)?)?",
        schemaTitolo: 'Il nome di un comune: solo lettere, apostrofi e trattini.',
      },
      {
        genere: 'gruppo',
        nome: 'immobile',
        etichetta: 'Tipo di immobile',
        opzioni: [
          { valore: 'casa-indipendente', etichetta: 'Casa indipendente' },
          { valore: 'appartamento', etichetta: 'Appartamento' },
          /* Il committente qui è un amministratore, non un privato: sisma,
             facciate, lavori condominiali sono una filiera a sé, e senza una
             voce propria finivano in «edificio intero» o in «altro» e il
             segnale si perdeva (FT, 07/09/2026). */
          { valore: 'condominio', etichetta: 'Condominio o parti comuni' },
          { valore: 'edificio', etichetta: 'Edificio intero' },
          { valore: 'capannone-ufficio', etichetta: 'Capannone o ufficio' },
          { valore: 'terreno', etichetta: 'Terreno' },
          { valore: 'altro', etichetta: 'Altro' },
        ],
      },
    ],
  },
  {
    id: 'punto',
    domanda: 'A che punto sei?',
    elementi: [
      {
        genere: 'gruppo',
        nome: 'punto',
        etichetta: 'A che punto sei',
        opzioni: [
          { valore: 'idea', etichetta: 'Solo un’idea' },
          { valore: 'ho-immobile', etichetta: 'Ho l’immobile' },
          { valore: 'ho-progetto', etichetta: 'Ho già un progetto' },
          { valore: 'subito', etichetta: 'Devo partire subito' },
        ],
      },
    ],
  },
  {
    id: 'tempi',
    domanda: 'In che tempi?',
    elementi: [
      {
        genere: 'gruppo',
        nome: 'tempi',
        etichetta: 'Tempi',
        opzioni: [
          { valore: 'entro-3-mesi', etichetta: 'Entro 3 mesi' },
          { valore: '3-6-mesi', etichetta: '3-6 mesi' },
          { valore: '6-12-mesi', etichetta: '6-12 mesi' },
          { valore: 'nessuna-fretta', etichetta: 'Non ho fretta' },
        ],
      },
    ],
  },
  {
    id: 'contatti',
    domanda: 'Come ti richiamiamo?',
    aiuto: 'Ultimo passo. Il telefono serve per la prima chiamata, la mail per la copia del brief.',
    elementi: [
      {
        genere: 'campo',
        nome: 'nome',
        etichetta: 'Nome e cognome',
        tipo: 'testo',
        obbligatorio: true,
        autoCompleta: 'name',
        massimo: 80,
        schema: "\\p{L}[\\p{L}’' .\\-]*",
        schemaTitolo: 'Nome e cognome: solo lettere, apostrofi e trattini.',
      },
      {
        genere: 'campo',
        nome: 'telefono',
        etichetta: 'Telefono',
        tipo: 'tel',
        obbligatorio: true,
        autoCompleta: 'tel',
        massimo: 30,
        /* Almeno otto cifre in tutto, con separatori a piacere. Il conteggio
           esatto (8-15 cifre) lo fa il server: un `pattern` non sa contare
           ignorando gli spazi, e qui basta scartare «12».
           ATTENZIONE alle parentesi: i browser compilano `pattern` con il flag
           `v`, che dentro una classe di caratteri considera `( ) / -` dei
           punteggiatori da proteggere. Non protetti, il pattern è invalido e
           viene **ignorato in silenzio** — il campo sembra validato e non lo è. */
        schema: '\\+?[0-9][0-9 .\\(\\)\\/\\-]{6,}',
        schemaTitolo: 'Un numero di telefono: almeno otto cifre.',
      },
      {
        genere: 'campo',
        nome: 'email',
        etichetta: 'Email',
        tipo: 'email',
        obbligatorio: true,
        autoCompleta: 'email',
        massimo: 120,
      },
      {
        genere: 'campo',
        nome: 'note',
        etichetta: 'Qualcosa che dobbiamo sapere (opzionale)',
        tipo: 'testolungo',
        obbligatorio: false,
        massimo: 1500,
      },
      { genere: 'consenso', nome: 'consenso' },
    ],
  },
]

export const ULTIMO_PASSO = passi.length - 1

/* ---------- lookup usati da validazione, markup e mail --------------------- */

/** Tutti i gruppi di scelta, per nome. */
export const gruppi: Record<string, Gruppo> = Object.fromEntries(
  passi
    .flatMap((p) => p.elementi.filter((e): e is Gruppo => e.genere === 'gruppo'))
    .map((g) => [g.nome, g]),
)

/** Tutti i campi, per nome. */
export const campi: Record<string, Campo> = Object.fromEntries(
  passi
    .flatMap((p) => p.elementi.filter((e): e is Campo => e.genere === 'campo'))
    .map((c) => [c.nome, c]),
)

/** Nomi dei campi di un passo: serve alla validazione passo per passo. */
export function nomiDelPasso(indice: number): string[] {
  const passo = passi[indice]
  if (!passo) return []
  return passo.elementi.map((e) => e.nome)
}

/** L'etichetta leggibile di una risposta a scelta. Usata nelle mail. */
export function etichettaDi(nomeGruppo: string, valore: string): string | null {
  return gruppi[nomeGruppo]?.opzioni.find((o) => o.valore === valore)?.etichetta ?? null
}

/**
 * Il valore di `?intervento=` accettato, o `null`.
 * Non si rimanda mai in pagina quello che arriva dalla query string: si
 * confronta con l'elenco chiuso e si scarta tutto il resto.
 */
export function interventoDaQuery(valore: string | string[] | undefined): string | null {
  if (typeof valore !== 'string') return null
  return gruppi.intervento.opzioni.some((o) => o.valore === valore) ? valore : null
}

/** Il campo trappola per i bot. Non è un campo del brief: se è pieno, è un bot. */
export const HONEYPOT = 'sito-web'

/** Il campo nascosto che dice da quale pagina è partito il brief. */
export const CAMPO_PAGINA = 'pagina'
