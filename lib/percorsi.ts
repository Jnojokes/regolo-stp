/**
 * I cinque percorsi dello smistamento a domanda (catalogo blocchi A3).
 *
 * Sono cinque, non sei: `energia-acustica` è un servizio ma non un modo in cui
 * un committente descrive quello che ha in mente. Chi vuole meno bollette dice
 * «devo ristrutturare».
 *
 * Ogni percorso porta al servizio **e** precompila il passo 1 del brief
 * (CLAUDE.md § Homepage, blocco 2): `intervento` è la stessa chiave chiusa di
 * `lib/brief/domande.ts`, non una stringa libera.
 *
 * I testi vengono dai due prototipi in `kit/opzioni/`, che sono il brief visivo
 * approvato: descrivono il *metodo* dello studio, non i suoi progetti. Le tre
 * competenze citate — architettonico e strutturale insieme, pratiche, cantiere —
 * sono quelle dichiarate dallo studio.
 *
 * `serve` è l'unica lista che resta una **proposta**: quali documenti chiedano
 * davvero a un committente per partire lo sa solo lo studio, e la riga è in
 * CONTENUTI-DA-CLIENTE.md. In pagina il blocco lo dichiara.
 */

import type { Servizio } from './servizi'
import { servizioBySlug } from './servizi'

export type Percorso = {
  /** Numero di quota, come nei prototipi: «01 Casa nuova». */
  numero: string
  /** L'etichetta con cui il committente riconosce il proprio caso. */
  etichetta: string
  /** Il servizio a cui porta. */
  slug: Servizio['slug']
  /** La chiave del passo 1 del brief. */
  intervento: string
  /** Cosa comprende l'incarico. */
  comprende: readonly string[]
  /** Come si svolge, in tre tempi. */
  svolge: readonly string[]
  /** Cosa serve da chi commissiona. **Proposta**, da confermare. */
  serve: readonly string[]
}

export const percorsi: readonly Percorso[] = [
  {
    numero: '01',
    etichetta: 'Casa nuova',
    slug: 'casa-nuova',
    intervento: 'casa-nuova',
    comprende: [
      'progetto architettonico e strutturale',
      'pratiche edilizie e sismiche',
      'direzione lavori e sicurezza',
    ],
    svolge: [
      'primo incontro e fattibilità',
      'progetto e autorizzazioni',
      'cantiere fino alla consegna',
    ],
    serve: ['il terreno o l’immobile', 'le esigenze della famiglia', 'un budget orientativo'],
  },
  {
    numero: '02',
    etichetta: 'Ristrutturazione o ampliamento',
    slug: 'ristrutturazioni',
    intervento: 'ristrutturazione',
    comprende: ['verifica di cosa si può fare', 'progetto e pratiche', 'direzione lavori'],
    svolge: ['rilievo dello stato attuale', 'progetto e titolo edilizio', 'cantiere'],
    serve: [
      'planimetrie o vecchie pratiche',
      'foto dello stato attuale',
      'chi abita l’immobile durante i lavori',
    ],
  },
  {
    numero: '03',
    etichetta: 'Pratica o bonus',
    slug: 'pratiche',
    intervento: 'pratica-bonus',
    comprende: [
      'verifica dei requisiti prima di partire',
      'la pratica giusta, completa',
      'rapporto con gli uffici',
    ],
    svolge: ['controllo dei documenti', 'deposito e integrazioni', 'chiusura e agibilità'],
    serve: [
      'titolo di proprietà o visura',
      'planimetria catastale',
      'eventuali pratiche precedenti',
    ],
  },
  {
    numero: '04',
    etichetta: 'Struttura e sisma',
    slug: 'strutture',
    intervento: 'struttura-sisma',
    comprende: [
      'valutazione della vulnerabilità',
      'progetto di miglioramento o adeguamento',
      'direzione lavori strutturale',
    ],
    svolge: ['rilievo e indagini', 'progetto e deposito sismico', 'cantiere e collaudo'],
    serve: ['accesso all’edificio per il rilievo', 'progetti originali, se esistono'],
  },
  {
    numero: '05',
    etichetta: 'Opera pubblica',
    slug: 'opere-pubbliche',
    intervento: 'opera-pubblica',
    comprende: ['progettazione nei livelli richiesti', 'coordinamento della sicurezza', 'collaudo'],
    svolge: ['indirizzo e fattibilità', 'progetto e verifica', 'esecuzione e collaudo'],
    serve: ['il documento di indirizzo o il bando', 'il cronoprogramma dell’ente'],
  },
]

/** Il servizio di un percorso, con titolo e sottotitolo di `CLAUDE.md`. */
export function servizioDelPercorso(p: Percorso): Servizio {
  const s = servizioBySlug(p.slug)
  if (!s) throw new Error(`lib/percorsi.ts: slug sconosciuto «${p.slug}»`)
  return s
}

/**
 * La URL della pagina del servizio.
 *
 * CLAUDE.md § Homepage, blocco 2 chiede che ogni bottone «porti al servizio **e**
 * precompili il passo 1 del form via query string». La query string non sta qui
 * ma sul salto successivo: la pagina del servizio **sa già** di che intervento
 * parla, e la sua CTA punta a `/contatti?intervento=…#brief` da sola.
 *
 * Il motivo è che una `?intervento=` su `/servizi/<slug>` sarebbe un parametro
 * che non fa niente — e per farlo funzionare la pagina del servizio dovrebbe
 * leggere la query, cioè rinunciare alla resa statica per un dato che ha già.
 * L'esito per chi compila è identico: dallo smistamento al brief senza
 * ridigitare niente. La deviazione è in DECISIONI.md.
 */
export const hrefPercorso = (p: Percorso) => `/servizi/${p.slug}`

/** La URL del brief con il passo 1 già scelto, per le CTA dentro il pannello. */
export const hrefBrief = (p: Percorso) => `/contatti?intervento=${p.intervento}#brief`

/** Il percorso da cui parte il pannello dell'opzione B, senza JavaScript. */
export const percorsoIniziale = percorsi[1]
