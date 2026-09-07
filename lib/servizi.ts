/**
 * I sei servizi. Titolo = esito per il cliente, tecnicismo in seconda riga
 * (CLAUDE.md § I sei servizi).
 *
 * `intervento` è la chiave del **passo 1 del brief** con cui la CTA del servizio
 * precompila il form. Non è il nome del servizio: è una delle sei risposte
 * chiuse che CLAUDE.md § Il form fissa per la prima domanda, e cinque servizi su
 * sei ne hanno una.
 *
 * Il sesto — `energia-acustica` — **non ce l'ha**, ed è dichiarato con
 * `undefined` invece di essere fatto combaciare a forza. Prima aveva
 * `intervento: 'energia-acustica'`, che non è fra le sei chiavi: la CTA
 * produceva `?intervento=energia-acustica`, il brief lo scartava perché non è
 * nell'elenco chiuso, e la precompilazione non faceva niente — un parametro
 * morto in una URL, che è peggio di nessun parametro. Con `undefined` la CTA
 * non lo mette affatto.
 *
 * Quale sia la risposta giusta per quel servizio è una scelta di prodotto, non
 * di codice: sta in DECISIONI.md come voce aperta (una settima risposta nel
 * passo 1? oppure «Ristrutturazione», che è come la descrive chi chiama?).
 */
export const servizi = [
  {
    slug: 'casa-nuova',
    titolo: 'La tua casa, dal disegno al cantiere',
    sottotitolo: 'progettazione architettonica e direzione lavori',
    intervento: 'casa-nuova',
  },
  {
    slug: 'ristrutturazioni',
    titolo: 'Ristrutturare, ampliare, recuperare',
    sottotitolo: "interventi sull'esistente, cambi di destinazione",
    intervento: 'ristrutturazione',
  },
  {
    slug: 'strutture',
    titolo: 'Mettere in sicurezza la struttura',
    sottotitolo: 'progettazione strutturale, adeguamento e miglioramento sismico',
    intervento: 'struttura-sisma',
  },
  {
    slug: 'pratiche',
    titolo: 'Pratiche, permessi e bonus',
    sottotitolo: 'pratiche edilizie, sisma bonus, agibilità',
    intervento: 'pratica-bonus',
  },
  {
    slug: 'energia-acustica',
    titolo: 'Comfort, energia, acustica',
    sottotitolo: 'progettazione termica e acustica, efficientamento',
    /* Nessuna delle sei risposte del passo 1 corrisponde: vedi il commento in
       testa e la voce aperta in DECISIONI.md. */
    intervento: undefined,
  },
  {
    slug: 'opere-pubbliche',
    titolo: 'Opere pubbliche e collaudi',
    sottotitolo: 'lavori pubblici, coordinamento sicurezza, collaudi',
    intervento: 'opera-pubblica',
  },
] as const

export type Servizio = (typeof servizi)[number]

export const servizioBySlug = (slug: string): Servizio | undefined =>
  servizi.find((s) => s.slug === slug)

/**
 * La CTA contestuale della pagina del servizio: porta al brief con il passo 1
 * già scelto (CLAUDE.md § Pagina servizio → CTA · catalogo blocchi F5).
 *
 * È qui che si chiude la catena dello smistamento: home → servizio → brief,
 * senza che nessuno ridigiti il tipo di intervento. La pagina del servizio non
 * ha bisogno di leggere niente dalla query: sa già chi è.
 *
 * Se il servizio non ha una chiave del passo 1, il parametro **non si mette**:
 * una `?intervento=` che il brief scarta è una URL che promette una cosa e non
 * la fa.
 */
export const hrefBriefServizio = (s: Servizio) =>
  s.intervento ? `/contatti?intervento=${s.intervento}#brief` : '/contatti#brief'
