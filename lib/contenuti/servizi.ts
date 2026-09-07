import { percorsi } from '@/lib/percorsi'
import { servizi, type Servizio } from '@/lib/servizi'
import { daCliente } from '@/lib/site'
import { schemaServizio, type ContenutoServizio, type IngressoServizio } from './schema'

/**
 * Il contenuto delle sei pagine servizio: per chi è, cosa comprende, cosa serve
 * da te, e le domande frequenti.
 *
 * ## Che cosa è nostro e che cosa è dello studio
 *
 * Tutto quello che c'è qui è **nostro**, cioè una proposta di Blu Lang, e
 * descrive un *metodo*: come si svolge un incarico, cosa serve per partire, che
 * domande fa un committente. Niente qui dentro afferma un fatto sullo studio —
 * nessun tempo, nessun prezzo, nessuna abilitazione, nessun numero, nessun
 * progetto (CLAUDE.md § Regole, 1 e § Obiettivo).
 *
 * Le fonti sono tre, tutte già approvate:
 *  — i sei titoli e sottotitoli vengono da CLAUDE.md § I sei servizi;
 *  — `comprende` e `serveDaTe` dei cinque percorsi vengono da `lib/percorsi.ts`,
 *    cioè dai due prototipi in `kit/opzioni/`, che sono il brief visivo;
 *  — le competenze citate (architettonico e strutturale, pratiche edilizie e
 *    sismiche, termica e acustica, coordinamento sicurezza, collaudi) sono
 *    quelle dichiarate dallo studio in CLAUDE.md § Cliente.
 *
 * ## Perché niente è «validato»
 *
 * `kit/REGOLO_SEO-GEO-LEGAL.md` è esplicito sulle FAQ: «i testi delle risposte:
 * da scrivere con lo studio». Quindi ogni voce nasce con `validato: false`, e
 * questo ha due conseguenze meccaniche:
 *  — in pagina il blocco lo dichiara, con un segnaposto visibile;
 *  — **lo schema `FAQPage` non viene emesso** per le domande non validate.
 * Mandare a un motore di ricerca una risposta che il cliente non ha confermato
 * vorrebbe dire far dire allo studio, in prima persona e in un risultato di
 * ricerca, una cosa che lo studio non ha detto. Un `validato: true` alla volta,
 * quando la risposta torna firmata.
 *
 * ## Sulle domande che chiedono «quanto tempo»
 *
 * Ce n'è una, e la risposta **non dà un numero**: CLAUDE.md § Obiettivo vieta di
 * promettere tempi sulle pratiche. Dire da cosa dipendono i tempi e che li si
 * mette in chiaro prima di cominciare è un'informazione vera; dire «trenta
 * giorni» è una promessa che non è nostra da fare.
 */

/* -------------------------------------------------------------------------- */

const percorsoDi = (slug: string) => percorsi.find((p) => p.slug === slug)

/** `comprende` e `serveDaTe` dei cinque percorsi vengono dal brief visivo. */
function dalPercorso(slug: string) {
  const p = percorsoDi(slug)
  return {
    comprende: p ? [...p.comprende] : [],
    serveDaTe: p ? [...p.serve] : [],
  }
}

/* -------------------------------------------------------------------------- */

/* Il tipo d'ingresso, non quello d'uscita: `validato` e `serveDaTeValidato`
   hanno un valore di default nello schema, quindi qui si omettono — ed è
   giusto che si omettano, perché il default è «non validato». */
const grezzo: Record<Servizio['slug'], IngressoServizio> = {
  'casa-nuova': {
    sommario:
      'Dal primo sopralluogo sul terreno alla consegna delle chiavi, con lo stesso studio che progetta, deposita le pratiche e dirige il cantiere.',
    perChi: [
      'Hai un terreno, o stai per comprarlo, e vuoi sapere cosa ci si può costruire davvero.',
      'Vuoi una casa disegnata sulla tua famiglia, non scelta da un catalogo.',
      'Preferisci un solo interlocutore dal primo schizzo alla consegna delle chiavi.',
    ],
    ...dalPercorso('casa-nuova'),
    faq: [
      {
        domanda: 'Prima di comprare un terreno, potete dirmi cosa ci si può costruire?',
        risposta:
          'Sì, ed è il momento in cui serve di più. Si guardano lo strumento urbanistico del comune, gli indici di edificabilità, le distanze, i vincoli paesaggistici e sismici: da lì si capisce quanta superficie è realizzabile e con che forma. È una verifica che conviene fare prima della firma, non dopo.',
      },
      {
        domanda: 'Il progetto architettonico e quello strutturale li fate insieme?',
        risposta:
          'Sì, e per una casa nuova è la differenza fra un progetto che sta in piedi al primo colpo e uno che va rifatto. La forma e ciò che la regge nascono dallo stesso tavolo: le luci, gli sbalzi, le aperture grandi si decidono sapendo già come si sostengono, invece di scoprirlo quando la struttura arriva dopo il disegno.',
      },
      {
        domanda: 'Chi controlla il cantiere e le spese mentre si costruisce?',
        risposta:
          'La direzione dei lavori, che è un incarico distinto dal progetto e serve proprio a questo: verificare che l’impresa esegua quello che è stato disegnato, controllare gli stati di avanzamento prima di pagarli e tenere il filo della sicurezza. Senza qualcuno che la faccia, il committente si trova solo davanti all’impresa.',
      },
    ],
  },

  ristrutturazioni: {
    sommario:
      'Prima si verifica cosa si può fare davvero su quell’immobile, poi si disegna: è l’ordine che evita i progetti da rifare.',
    perChi: [
      'Hai una casa o un immobile e vuoi capire cosa si può fare prima di innamorarti di un’idea.',
      'Devi ampliare, cambiare la destinazione d’uso o recuperare un edificio rimasto fermo.',
      'Hai vecchie pratiche, o non le hai, e non sai se lo stato attuale è regolare.',
    ],
    ...dalPercorso('ristrutturazioni'),
    faq: [
      {
        domanda: 'Cosa serve per ristrutturare un casolare, e quali pratiche ci vogliono?',
        risposta:
          'Prima di tutto il rilievo dello stato attuale e la verifica che quello che c’è sia regolare: molti interventi si bloccano lì, non sul progetto. Poi il titolo edilizio giusto per il tipo di lavori, il deposito sismico se si toccano le strutture, e le pratiche energetiche. Quale titolo serva dipende dall’intervento, e si stabilisce prima di disegnare.',
      },
      {
        domanda: 'Non trovo le pratiche originali dell’immobile: è un problema?',
        risposta:
          'È una situazione frequente e si affronta. Si cercano negli archivi del comune e in catasto, si confronta quello che si trova con l’edificio come è oggi, e se emergono differenze si valuta se e come si possono sistemare. È una verifica da fare all’inizio: scoprire una difformità a lavori aperti costa molto più che scoprirla prima.',
      },
      {
        domanda: 'Si può ristrutturare vivendo nell’immobile?',
        risposta:
          'A volte sì, a volte conviene lavorare per fasi, a volte no: dipende da quali impianti si toccano, se si interviene sulle strutture e da quanto si può isolare il cantiere dal resto della casa. È una delle prime cose da mettere in chiaro, perché cambia il progetto, l’organizzazione del cantiere e la sua durata.',
      },
    ],
  },

  strutture: {
    sommario:
      'Sapere quanto è sicuro un edificio è una misura, non un’opinione: si rileva, si calcola, e da lì si decide se e come intervenire.',
    perChi: [
      'Vuoi sapere se l’edificio in cui vivi o lavori è sicuro dal punto di vista sismico.',
      'Devi intervenire su murature, solai o fondazioni e ti serve chi firma il calcolo.',
      'Sei un amministratore e devi portare in assemblea una valutazione fatta bene.',
    ],
    ...dalPercorso('strutture'),
    faq: [
      {
        domanda: 'Come faccio a sapere se la mia casa è sicura dal punto di vista sismico?',
        risposta:
          'Con una valutazione della sicurezza: si rileva la geometria reale delle strutture, si indaga di che materiali sono fatte, si ricostruisce come sono state costruite e si calcola quanto l’edificio è in grado di sopportare. Il risultato non è un sì o un no ma una misura, e da quella si decide se e come conviene intervenire.',
      },
      {
        domanda: 'Che differenza c’è fra miglioramento e adeguamento sismico?',
        risposta:
          'L’adeguamento porta l’edificio a rispettare integralmente le richieste della norma per una costruzione nuova; il miglioramento aumenta la sicurezza senza arrivare a quel livello. Sull’esistente il miglioramento è spesso l’intervento sensato: costa meno, è meno invasivo e in molti casi è la strada che la norma stessa prevede per gli edifici che ci sono già.',
      },
      {
        domanda: 'Chi può firmare una pratica di miglioramento sismico?',
        risposta:
          'Un tecnico abilitato alla progettazione strutturale e iscritto al proprio ordine professionale, che si assume la responsabilità del calcolo e lo deposita agli uffici competenti. Non è un adempimento che si delega all’impresa: il progetto strutturale e la sua direzione sono incarichi professionali distinti, e vanno affidati per iscritto prima di aprire il cantiere.',
      },
    ],
  },

  pratiche: {
    sommario:
      'Le carte giuste, complete la prima volta, con i requisiti dei bonus verificati prima di cominciare e non a lavori finiti.',
    perChi: [
      'Devi presentare una pratica edilizia e vuoi che sia completa la prima volta.',
      'Vuoi capire se il tuo intervento rientra in un bonus, prima di contarci.',
      'Hai bisogno dell’agibilità, di una sanatoria o di chiudere una pratica rimasta aperta.',
    ],
    ...dalPercorso('pratiche'),
    faq: [
      {
        domanda: 'Quanto tempo ci vuole per un permesso di costruire?',
        risposta:
          'Non è un numero che si possa promettere: dipende dal comune, dal tipo di intervento, dai pareri di altri enti che servono — paesaggistico, sismico, dei vigili del fuoco — e da quanto la pratica è completa quando entra. Quello che si può fare è dire quali passaggi servono e quali tempi dipendono dagli uffici, e metterlo in chiaro prima di cominciare.',
      },
      {
        domanda: 'Come si verifica se un intervento rientra in un bonus edilizio?',
        risposta:
          'Si controllano i requisiti prima di progettare, non dopo: che tipo di intervento è, che caratteristiche deve avere per accedere, quali adempimenti e quali asseverazioni servono, e in che ordine vanno fatti. È la verifica che evita il caso peggiore, cioè scoprire a lavori finiti che manca un requisito e che la detrazione non si può prendere.',
      },
      {
        domanda: 'Ho una difformità rispetto alle pratiche depositate: si può sistemare?',
        risposta:
          'Spesso sì, e la strada dipende da cos’è la difformità, da quando è stata realizzata e dalla norma vigente in quel momento. Il primo passo è sempre lo stesso: capire esattamente cosa risulta agli atti e cosa c’è nella realtà. Solo dopo si valuta quale procedura è applicabile e che cosa comporta.',
      },
    ],
  },

  'energia-acustica': {
    sommario:
      'Meno consumi, meno rumore e la temperatura giusta si progettano insieme all’edificio: aggiunti dopo diventano compromessi visibili.',
    perChi: [
      'Paghi bollette che non ti tornano e vuoi capire da dove se ne va il calore.',
      'Stai progettando o ristrutturando e vuoi decidere gli impianti prima, non dopo.',
      'Hai un problema di rumore fra unità, o devi rispettare requisiti acustici.',
    ],
    /* Il sesto servizio è l'unico senza un percorso nella hero: `comprende` viene
       dal prototipo B, `serveDaTe` non è mai stato scritto e resta un segnaposto. */
    comprende: [
      'verifica dei consumi e diagnosi dell’involucro',
      'progettazione termica e acustica, insieme al progetto',
      'requisiti acustici passivi e verifiche di legge',
    ],
    serveDaTe: [daCliente('cosa serve da te per comfort, energia e acustica')],
    faq: [
      {
        domanda: 'Conviene cambiare la caldaia o isolare prima l’involucro?',
        risposta:
          'Quasi sempre prima l’involucro, e il motivo è semplice: un impianto dimensionato su una casa che perde calore resta grande, costoso e in funzione più del necessario. Ridurre prima le dispersioni permette di scegliere un impianto più piccolo, che consuma meno e dura meglio. L’ordine degli interventi si decide sui numeri della casa, non per abitudine.',
      },
      {
        domanda: 'Il comfort acustico si può progettare anche su un edificio che c’è già?',
        risposta:
          'Sì, ma con vincoli diversi da una costruzione nuova: sull’esistente si lavora su serramenti, stratigrafie, impianti e sui punti in cui il rumore passa da un’unità all’altra. Il primo passo è capire per quale via arriva il rumore, perché intervenire sulla parete sbagliata è la spesa più frequente e la più inutile.',
      },
      {
        domanda: 'Perché progettare termica e acustica insieme al resto?',
        risposta:
          'Perché sono decisioni che cambiano la forma dell’edificio, non un accessorio da aggiungere alla fine: gli spessori delle pareti, la posizione e la dimensione delle aperture, i passaggi degli impianti. Aggiunte dopo diventano compromessi visibili e costosi; decise insieme al progetto non si vedono e costano quello che devono costare.',
      },
    ],
  },

  'opere-pubbliche': {
    sommario:
      'Progettazione nei livelli richiesti, coordinamento della sicurezza e collaudo per enti e amministrazioni, con le procedure del codice.',
    perChi: [
      'Sei un comune o un ente e devi affidare progettazione, sicurezza o collaudo.',
      'Hai bisogno di un progetto nei livelli richiesti dal codice dei contratti.',
      'Ti serve un coordinatore della sicurezza o un collaudatore per un’opera in corso.',
    ],
    ...dalPercorso('opere-pubbliche'),
    faq: [
      {
        domanda: 'In quali livelli di progettazione lavorate per un ente?',
        risposta:
          'Nei livelli che l’ente richiede per quella procedura, dal documento di fattibilità al progetto esecutivo, con gli elaborati che servono a mettere l’opera a base di gara. Quali livelli servano e con che contenuti lo stabilisce la procedura scelta dall’ente: si concorda all’inizio, insieme al cronoprogramma.',
      },
      {
        domanda: 'Cosa fa il coordinatore della sicurezza durante i lavori?',
        risposta:
          'Verifica che le imprese applichino il piano di sicurezza, coordina le lavorazioni quando in cantiere ci sono più imprese insieme, aggiorna il piano quando il cantiere cambia e sospende le lavorazioni se ci sono pericoli gravi. È una figura obbligatoria in molti cantieri e la sua responsabilità è personale, non dell’impresa.',
      },
      {
        domanda: 'Il collaudo lo può fare chi ha progettato o diretto i lavori?',
        risposta:
          'No, e la ragione è la sostanza dell’istituto: il collaudo è una verifica indipendente di quello che è stato costruito, e chi lo firma deve essere estraneo alla progettazione e alla direzione di quell’opera. È esattamente per questo che a un ente serve un collaudatore terzo, e perché lo stesso studio non può ricoprire entrambi i ruoli sulla stessa opera.',
      },
    ],
  },
}

/* -------------------------------------------------------------------------- */

/**
 * Valida il contenuto dei sei servizi allo stesso modo delle schede progetto:
 * una FAQ senza punto di domanda, una risposta sotto le quindici parole o un
 * elenco troppo corto **fermano la build**. Le regole sono in
 * `lib/contenuti/schema.ts` e vengono dal prompt della fase 4.
 */
function valida(): Record<string, ContenutoServizio> {
  const validati: Record<string, ContenutoServizio> = {}

  for (const s of servizi) {
    const esito = schemaServizio.safeParse(grezzo[s.slug])
    if (!esito.success) {
      const problemi = esito.error.issues
        .map((i) => `  · ${i.path.join('.') || '(radice)'}: ${i.message}`)
        .join('\n')
      throw new Error(`Il contenuto del servizio «${s.slug}» non è valido:\n${problemi}`)
    }
    validati[s.slug] = esito.data
  }

  const mancanti = Object.keys(grezzo).filter((k) => !servizi.some((s) => s.slug === k))
  if (mancanti.length) {
    throw new Error(
      `lib/contenuti/servizi.ts ha contenuto per slug che non esistono: ${mancanti.join(', ')}`,
    )
  }

  return validati
}

export const contenutiServizi = valida()

export const contenutoServizio = (slug: string): ContenutoServizio | undefined =>
  contenutiServizi[slug]

/** Le FAQ che possono entrare nello schema `FAQPage`: solo quelle validate. */
export const faqValidate = (slug: string) =>
  (contenutoServizio(slug)?.faq ?? []).filter((f) => f.validato)
