/**
 * Le immagini e il video di **esempio** del prototipo.
 *
 * ## Perché esistono, visto che `CLAUDE.md` § Regole, 2 vieta lo stock
 *
 * Perché la regola vieta lo stock **in produzione**, dove una foto presa
 * altrove dichiara un'opera che non è dello studio. In una call di proposta il
 * problema è l'opposto: un prototipo fatto di rettangoli vuoti si guarda male,
 * e la discussione finisce sui buchi invece che sull'impaginazione. Il cliente
 * l'ha chiesto due volte, in questi termini: «prendi le robe che ci sono su
 * internet», «non fa niente se c'è copyright perché tanto poi li cambieremo, è
 * solo per esempio».
 *
 * La regola non viene tolta: viene **circoscritta**, e le tre condizioni sono
 * scritte qui perché chi arriva dopo le trovi accanto ai file.
 *
 * 1. **Si spegne con una variabile d'ambiente.** `NEXT_PUBLIC_MEDIA_DEMO=0`
 *    e ogni campo torna il segnaposto dichiarato che era, senza toccare il
 *    codice. Alla fase 5 si cancellano questo file e `public/demo/`.
 * 2. **Restano segnaposto anche mentre si vedono.** Il campo tiene le
 *    squadrette, la targhetta con la specifica e in più una riga di fonte e
 *    licenza. In pagina si legge «esempio», e la barra della proposta lo
 *    ripete in testa a ogni schermata.
 * 3. **Nessun ritratto, nessuna persona.** I quattro campi delle persone
 *    restano vuoti: una faccia presa altrove sotto il nome di un ingegnere è
 *    un'altra cosa rispetto a una facciata presa altrove sotto la dicitura
 *    «esempio», e nessuna variabile d'ambiente la rende accettabile.
 *
 * ## Perché sono tutte in bianco e nero
 *
 * Non è un filtro. Il sito **non ha colori** — l'unico è il timbro dei
 * segnaposto, e si consuma quando i contenuti arrivano. Otto fotografie
 * a colori, riprese da otto persone diverse con otto bilanciamenti del bianco,
 * avrebbero portato in pagina la sola cosa che il progetto ha deciso di non
 * avere, e per giunta in modo incoerente. In grigio l'insieme legge come un
 * servizio unico, che è anche quello che sarà: le foto vere le farà una
 * persona sola. Il video porta lo stesso trattamento via CSS
 * (`filter: grayscale(1)`), perché il file resta a colori e si può cambiare
 * idea senza ricodificarlo.
 *
 * ## Provenienza
 *
 * Otto fotografie da **StockSnap.io**, tutte **CC0 1.0** (pubblico dominio:
 * uso commerciale libero, nessuna attribuzione dovuta — l'autore lo scriviamo
 * lo stesso, perché è giusto e perché serve a chi le sostituirà). Il video è
 * di **Mixkit**, licenza Mixkit Free — uso commerciale libero, niente
 * attribuzione. Nessuna delle due fonti è un sito di reference del progetto:
 * `regolo-stp.vercel.app` è già pubblico, e le fotografie di progetto di studi
 * concorrenti non ci vanno nemmeno per finta.
 *
 * Sorgenti a 960 px sul lato lungo: è quello che StockSnap serve. La specifica
 * in pagina continua a chiedere 2400 px, e lo scarto fra le due cose è
 * volutamente visibile.
 */

/** L'interruttore. `NEXT_PUBLIC_` perché il segnaposto si rende anche lato client. */
export const MEDIA_DEMO = process.env.NEXT_PUBLIC_MEDIA_DEMO !== '0'

export type Esempio = {
  /** Percorso in `public/`. */
  src: string
  larghezza: number
  altezza: number
  /** Cosa si vede davvero: entra nel nome accessibile del campo. */
  soggetto: string
  autore: string
  fonte: string
  licenza: string
  pagina: string
  /** Se c'è, il campo rende un video e `src` diventa il poster. */
  video?: string
}

export const esempi = {
  'cantiere-loop': {
    src: '/demo/cantiere-loop-poster.jpg',
    video: '/demo/cantiere-loop.mp4',
    larghezza: 1280,
    altezza: 720,
    soggetto: 'lo scheletro di un edificio in costruzione e una gru, in controluce',
    autore: 'Mixkit',
    fonte: 'Mixkit',
    licenza: 'Mixkit Free License',
    pagina: 'https://mixkit.co/free-stock-video/sunset-behind-a-building-under-construction-3971/',
  },
  'opera-01': {
    src: '/demo/opera-01.jpg',
    larghezza: 960,
    altezza: 641,
    soggetto: 'un edificio moderno a piani sfalsati, ripreso dal basso',
    autore: 'Chuttersnap',
    fonte: 'StockSnap.io',
    licenza: 'CC0 1.0',
    pagina: 'https://stocksnap.io/photo/building-structure-4KWA8Y07O4',
  },
  'opera-02': {
    src: '/demo/opera-02.jpg',
    larghezza: 960,
    altezza: 720,
    soggetto: 'la facciata di un edificio residenziale con logge e parapetti',
    autore: 'The Building Envelope',
    fonte: 'StockSnap.io',
    licenza: 'CC0 1.0',
    pagina: 'https://stocksnap.io/photo/abstract-modern-I6XJM4PDE1',
  },
  'opera-03': {
    src: '/demo/opera-03.jpg',
    larghezza: 960,
    altezza: 720,
    soggetto: 'lo spigolo di un edificio bianco con finestre irregolari',
    autore: 'The Building Envelope',
    fonte: 'StockSnap.io',
    licenza: 'CC0 1.0',
    pagina: 'https://stocksnap.io/photo/building-exterior-AJU8JTAEJQ',
  },
  'cantiere-01': {
    src: '/demo/cantiere-01.jpg',
    larghezza: 960,
    altezza: 640,
    soggetto: 'un edificio in costruzione con i ponteggi e due gru',
    autore: '贝莉儿 NG',
    fonte: 'StockSnap.io',
    licenza: 'CC0 1.0',
    pagina: 'https://stocksnap.io/photo/building-construction-QDDPZH3YSO',
  },
  'interno-01': {
    src: '/demo/interno-01.jpg',
    larghezza: 960,
    altezza: 539,
    soggetto: 'un interno a pianta libera con pilastri e grandi finestre',
    autore: 'Marc Mueller',
    fonte: 'StockSnap.io',
    licenza: 'CC0 1.0',
    pagina: 'https://stocksnap.io/photo/architecture-building-LJRZ7AR6G4',
  },
  'prima-01': {
    src: '/demo/prima-01.jpg',
    larghezza: 960,
    altezza: 636,
    soggetto: 'una stanza al grezzo, con gli infissi smontati e il calcinaccio a terra',
    autore: 'Skitter Photo',
    fonte: 'StockSnap.io',
    licenza: 'CC0 1.0',
    pagina: 'https://stocksnap.io/photo/construction-renovation-XEOT0ES7GA',
  },
  'dopo-01': {
    src: '/demo/dopo-01.jpg',
    larghezza: 960,
    altezza: 640,
    soggetto: 'la stessa stanza finita: intonaco, pavimento e due finestre in luce',
    autore: 'David Hellmann',
    fonte: 'StockSnap.io',
    licenza: 'CC0 1.0',
    pagina: 'https://stocksnap.io/photo/house-architecture-Y3U84QOQNW',
  },
  'dettaglio-01': {
    src: '/demo/dettaglio-01.jpg',
    larghezza: 960,
    altezza: 636,
    soggetto: 'il bordo di una copertura metallica grecata contro il cielo',
    autore: 'Scott Webb',
    fonte: 'StockSnap.io',
    licenza: 'CC0 1.0',
    pagina: 'https://stocksnap.io/photo/blue-sky-F16UC7XO6F',
  },
} as const satisfies Record<string, Esempio>

export type ChiaveEsempio = keyof typeof esempi

/**
 * L'esempio da mettere in un campo, o `undefined` se la dimostrazione è
 * spenta. Una funzione sola, così nessun componente deve ricordarsi di
 * controllare l'interruttore.
 */
export function esempio(chiave?: ChiaveEsempio): Esempio | undefined {
  if (!MEDIA_DEMO || !chiave) return undefined
  return esempi[chiave]
}

/**
 * Le sei opere del prototipo, in ordine. I progetti veri arrivano da
 * `content/progetti/*.mdx` e non hanno — giustamente — nessun campo che
 * riguardi la dimostrazione: la copertina di esempio la sceglie l'indice, così
 * il livello dimostrativo non lascia traccia nei contenuti. Quando le foto
 * vere arrivano, questo elenco e il file che lo contiene spariscono insieme.
 */
export const opere: ChiaveEsempio[] = [
  'opera-01',
  'opera-02',
  'cantiere-01',
  'opera-03',
  'interno-01',
  'dettaglio-01',
]

export const operaPerIndice = (i: number): ChiaveEsempio => opere[i % opere.length]
