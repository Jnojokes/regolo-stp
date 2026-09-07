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
      },
      {
        genere: 'gruppo',
        nome: 'immobile',
        etichetta: 'Tipo di immobile',
        opzioni: [
          { valore: 'casa-indipendente', etichetta: 'Casa indipendente' },
          { valore: 'appartamento', etichetta: 'Appartamento' },
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
      },
      {
        genere: 'campo',
        nome: 'telefono',
        etichetta: 'Telefono',
        tipo: 'tel',
        obbligatorio: true,
        autoCompleta: 'tel',
        massimo: 30,
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
