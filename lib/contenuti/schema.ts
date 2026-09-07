import { z } from 'zod'

/**
 * Lo schema dei contenuti in `content/`, validato con zod.
 *
 * Il punto non è la comodità dei tipi: è che **la build fallisce** se un campo
 * manca o è di un tipo sbagliato (CLAUDE.md, prompt della fase 4). Su un sito
 * dove i contenuti li scriverà qualcun altro in un file di testo, un campo
 * dimenticato è la cosa più probabile che possa succedere — e il posto giusto
 * dove scoprirlo è la build, non la pagina pubblicata.
 *
 * Regola che questo file rende meccanica: il **ruolo dello studio** è un elenco
 * chiuso e non può essere vuoto (CLAUDE.md § Scheda progetto — «il campo ruolo
 * non va mai omesso: è quello che dice cosa sanno fare»). Un refuso in un ruolo
 * ferma la build invece di finire in pagina.
 */

/* -------------------------------------------------------------------------- */

/** Il ruolo dello studio nell'incarico. Elenco chiuso, dal prompt di fase. */
export const RUOLI = [
  'progetto architettonico',
  'progetto strutturale',
  'direzione lavori',
  'coordinamento sicurezza',
  'collaudo',
] as const

export type Ruolo = (typeof RUOLI)[number]

/**
 * Il tipo di intervento: **la stessa chiave chiusa del passo 1 del brief**
 * (`lib/brief/domande.ts`). Tenerne una copia qui sarebbe la strada per farle
 * divergere; il controllo di coerenza fra i due elenchi è in `progetti.ts`.
 */
export const INTERVENTI = [
  'casa-nuova',
  'ristrutturazione',
  'pratica-bonus',
  'struttura-sisma',
  'opera-pubblica',
  'altro',
] as const

/** Le tre province dell'autocomplete del brief (CLAUDE.md § Il form). */
export const PROVINCE = ['FM', 'MC', 'AP', 'altra'] as const

/* -------------------------------------------------------------------------- */

/**
 * Un'immagine. `alt` è **obbligatorio** e non può essere una stringa vuota:
 * un `alt` vuoto dichiara «questa immagine è decorativa», e in una scheda
 * progetto nessuna foto è decorativa — sono la prova.
 *
 * Finché la foto non c'è, `segnaposto` dice cosa ci andrà: il rettangolo in
 * pagina e la riga in TODO-MEDIA.md nascono da qui.
 */
const immagine = z.object({
  /** Il file, quando ci sarà. Assente = si disegna un rettangolo. */
  file: z.string().min(1).optional(),
  /** Cosa deve mostrare la foto. Diventa l'etichetta del rettangolo. */
  segnaposto: z.string().min(3, 'dì cosa andrà in questa immagine'),
  alt: z.string().min(3, 'l’alt descrive cosa si vede, non «immagine1»'),
})

export type Immagine = z.infer<typeof immagine>

/* -------------------------------------------------------------------------- */

export const schemaProgetto = z.object({
  /**
   * `true` = scheda di esempio, non un progetto vero: resta `noindex`, esce
   * dall'indice e in pagina lo dichiara. È l'interruttore che tiene la scheda
   * di esempio fuori dai motori senza doversi ricordare di cancellarla.
   */
  esempio: z.boolean().default(false),

  titolo: z.string().min(3),
  sommario: z.string().min(10, 'una riga che dica cosa è questo intervento'),

  intervento: z.enum(INTERVENTI),
  comune: z.string().min(2),
  provincia: z.enum(PROVINCE),

  /* Anno e superficie restano stringhe: finché sono segnaposto non sono numeri,
     e trasformarli in numeri obbligherebbe a inventare uno zero. */
  anno: z.string().min(1),
  superficieMq: z.string().min(1),

  ruolo: z
    .array(z.enum(RUOLI))
    .min(1, 'il ruolo dello studio non si omette mai: è quello che dice cosa sapete fare'),

  committente: z.string().optional(),
  impresa: z.string().optional(),

  copertina: immagine,
  galleria: z.array(immagine).default([]),

  primaDopo: z
    .object({
      prima: z.string().min(3),
      dopo: z.string().min(3),
    })
    .optional(),

  /** Slug di altre schede. Verificati in `progetti.ts`: uno slug morto ferma la build. */
  correlati: z.array(z.string()).default([]),
})

export type FrontmatterProgetto = z.infer<typeof schemaProgetto>

/* -------------------------------------------------------------------------- */

/**
 * Una domanda frequente di una pagina servizio.
 *
 * `validato` è il campo che conta. Le risposte le scriviamo noi come proposta,
 * ma `kit/REGOLO_SEO-GEO-LEGAL.md` dice che i testi vanno scritti **con lo
 * studio**: finché `validato` è falso, la domanda si mostra in pagina marcata
 * come proposta e **non entra nello schema `FAQPage`**. Mandare a un motore di
 * ricerca una risposta che il cliente non ha confermato è il modo di far dire a
 * Google, in prima persona, una cosa che lo studio non ha detto.
 */
export const schemaFaq = z.object({
  domanda: z
    .string()
    .min(10)
    .refine((d) => d.trimEnd().endsWith('?'), 'una domanda finisce con un punto di domanda'),
  risposta: z
    .string()
    .min(1)
    .refine(
      (r) => r.trim().split(/\s+/).length >= 15,
      'una risposta sotto le quindici parole non è autoconclusiva: chi la legge deve poter smettere di leggere lì',
    ),
  validato: z.boolean().default(false),
})

export type Faq = z.infer<typeof schemaFaq>

export const schemaServizio = z.object({
  /**
   * Una riga sotto il titolo: cosa ottiene chi affida questo incarico.
   * Non può essere la prima voce di `perChi` — ripetere la stessa frase a
   * dieci centimetri di distanza fa sembrare la pagina generata.
   */
  sommario: z.string().min(30).max(180),
  perChi: z.array(z.string().min(10)).min(2),
  comprende: z.array(z.string().min(5)).min(2),
  serveDaTe: z.array(z.string().min(5)).min(1),
  /** `false` = l'elenco «serve da te» è una nostra proposta, da validare. */
  serveDaTeValidato: z.boolean().default(false),
  faq: z.array(schemaFaq).min(3, 'da tre a otto domande').max(8, 'da tre a otto domande'),
})

export type ContenutoServizio = z.infer<typeof schemaServizio>
/** Come si scrive un contenuto servizio a mano: i campi con default si omettono. */
export type IngressoServizio = z.input<typeof schemaServizio>
