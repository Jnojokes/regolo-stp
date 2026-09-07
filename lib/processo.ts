/**
 * Le cinque fasi di «Come lavoriamo» (CLAUDE.md § Homepage, blocco 6).
 *
 * Risponde alla domanda vera di chi non ha mai costruito — «e poi cosa
 * succede?» — che è anche il titolo del blocco nei due prototipi.
 *
 * Due lunghezze dello stesso testo, dai due prototipi in `kit/opzioni/`:
 * l'opzione A ha una lista verticale con spazio, l'opzione B una timeline
 * orizzontale in cinque colonne, dove una riga in più manda tutto a capo.
 * Non sono due contenuti: è lo stesso contenuto a due misure.
 *
 * Descrivono il metodo dello studio, non i suoi progetti: nessun numero,
 * nessun tempo promesso, nessun nome.
 */

export type Fase = {
  titolo: string
  /** Opzione A: lista verticale, c'è spazio per una frase in più. */
  testoLungo: string
  /** Opzione B: timeline in cinque colonne, una riga sola. */
  testoBreve: string
}

export const fasi: readonly Fase[] = [
  {
    titolo: 'Primo incontro',
    testoLungo:
      'Ci raccontate l’idea, l’immobile, i vincoli. Noi vi diciamo cosa è possibile e cosa serve.',
    testoBreve: 'L’idea, l’immobile, i vincoli. Vi diciamo cosa è possibile.',
  },
  {
    titolo: 'Fattibilità e costi',
    testoLungo:
      'Verifiche urbanistiche e strutturali, prima stima dei costi realizzativi. Prima di disegnare.',
    testoBreve: 'Verifiche urbanistiche e strutturali, prima stima dei costi. Prima di disegnare.',
  },
  {
    titolo: 'Progetto',
    testoLungo:
      'Architettonico e strutturale insieme: la forma e ciò che la regge nascono dallo stesso tavolo.',
    testoBreve: 'Architettonico e strutturale dallo stesso tavolo.',
  },
  {
    titolo: 'Autorizzazioni',
    testoLungo:
      'Pratiche edilizie, sismiche, energetiche. Le seguiamo noi, con i tempi degli uffici messi in chiaro.',
    testoBreve: 'Pratiche edilizie, sismiche, energetiche, con i tempi degli uffici in chiaro.',
  },
  {
    titolo: 'Cantiere e direzione lavori',
    testoLungo:
      'In cantiere fino alla consegna: controllo delle lavorazioni, dei costi e della sicurezza.',
    testoBreve: 'Controllo di lavorazioni, costi e sicurezza fino alla consegna.',
  },
]

/** Il testo introduttivo del blocco, nella versione dell'opzione A. */
export const introProcesso =
  'La domanda vera di chi non ha mai costruito. Cinque passaggi, sempre gli stessi, con una persona di riferimento dall’inizio alla fine.'
