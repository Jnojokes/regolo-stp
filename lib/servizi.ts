/**
 * I sei servizi. Titolo = esito per il cliente, tecnicismo in seconda riga
 * (CLAUDE.md § I sei servizi). `intervento` è il valore che precompila il
 * passo 1 del brief via query string, dal blocco di smistamento della home.
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
    intervento: 'energia-acustica',
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
 */
export const hrefBriefServizio = (s: Servizio) => `/contatti?intervento=${s.intervento}#brief`
