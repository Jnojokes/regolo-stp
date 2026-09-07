/**
 * I comuni delle tre province in cui lavora lo studio: Fermo, Macerata,
 * Ascoli Piceno. Alimentano il <datalist> del passo 2 del brief.
 *
 * GENERATO — non modificare a mano: `node scripts/genera-comuni.mjs`.
 * Sorgente: elenco ISTAT dei comuni italiani via matteocontrini/comuni-json.
 * Rigenerato il 2026-09-07. FM 40 · MC 55 · AP 33 = 128 comuni.
 *
 * Nota: il datalist si renderizza lato server (components/brief/Brief.tsx), così
 * i 128 nomi stanno nell'HTML e non nel bundle JavaScript. Questo file non va
 * importato da un componente client.
 */

export const PROVINCE_SERVITE = ['FM', 'MC', 'AP'] as const
export type ProvinciaServita = (typeof PROVINCE_SERVITE)[number]

export const comuniPerProvincia: Record<ProvinciaServita, readonly string[]> = {
  FM: [
    'Altidona',
    'Amandola',
    'Belmonte Piceno',
    'Campofilone',
    'Falerone',
    'Fermo',
    "Francavilla d'Ete",
    'Grottazzolina',
    'Lapedona',
    'Magliano di Tenna',
    'Massa Fermana',
    'Monsampietro Morico',
    'Montappone',
    'Monte Giberto',
    'Monte Rinaldo',
    'Monte San Pietrangeli',
    'Monte Urano',
    'Monte Vidon Combatte',
    'Monte Vidon Corrado',
    'Montefalcone Appennino',
    'Montefortino',
    'Montegiorgio',
    'Montegranaro',
    'Monteleone di Fermo',
    'Montelparo',
    'Monterubbiano',
    'Montottone',
    'Moresco',
    'Ortezzano',
    'Pedaso',
    'Petritoli',
    'Ponzano di Fermo',
    'Porto San Giorgio',
    "Porto Sant'Elpidio",
    'Rapagnano',
    "Sant'Elpidio a Mare",
    'Santa Vittoria in Matenano',
    'Servigliano',
    'Smerillo',
    'Torre San Patrizio',
  ],
  MC: [
    'Apiro',
    'Appignano',
    'Belforte del Chienti',
    'Bolognola',
    'Caldarola',
    'Camerino',
    'Camporotondo di Fiastrone',
    'Castelraimondo',
    'Castelsantangelo sul Nera',
    'Cessapalombo',
    'Cingoli',
    'Civitanova Marche',
    'Colmurano',
    'Corridonia',
    'Esanatoglia',
    'Fiastra',
    'Fiuminata',
    'Gagliole',
    'Gualdo',
    'Loro Piceno',
    'Macerata',
    'Matelica',
    'Mogliano',
    'Monte Cavallo',
    'Monte San Giusto',
    'Monte San Martino',
    'Montecassiano',
    'Montecosaro',
    'Montefano',
    'Montelupone',
    'Morrovalle',
    'Muccia',
    'Penna San Giovanni',
    'Petriolo',
    'Pieve Torina',
    'Pioraco',
    'Poggio San Vicino',
    'Pollenza',
    'Porto Recanati',
    'Potenza Picena',
    'Recanati',
    'Ripe San Ginesio',
    'San Ginesio',
    'San Severino Marche',
    "Sant'Angelo in Pontano",
    'Sarnano',
    'Sefro',
    'Serrapetrona',
    'Serravalle di Chienti',
    'Tolentino',
    'Treia',
    'Urbisaglia',
    'Ussita',
    'Valfornace',
    'Visso',
  ],
  AP: [
    'Acquasanta Terme',
    'Acquaviva Picena',
    'Appignano del Tronto',
    'Arquata del Tronto',
    'Ascoli Piceno',
    'Carassai',
    'Castel di Lama',
    'Castignano',
    'Castorano',
    'Colli del Tronto',
    'Comunanza',
    'Cossignano',
    'Cupra Marittima',
    'Folignano',
    'Force',
    'Grottammare',
    'Maltignano',
    'Massignano',
    'Monsampolo del Tronto',
    'Montalto delle Marche',
    'Montedinove',
    "Montefiore dell'Aso",
    'Montegallo',
    'Montemonaco',
    'Monteprandone',
    'Offida',
    'Palmiano',
    'Ripatransone',
    'Roccafluvione',
    'Rotella',
    'San Benedetto del Tronto',
    'Spinetoli',
    'Venarotta',
  ],
}

/** Elenco piatto ordinato, per il <datalist>. */
export const comuni: readonly { nome: string; provincia: ProvinciaServita }[] =
  PROVINCE_SERVITE.flatMap((provincia) =>
    comuniPerProvincia[provincia].map((nome) => ({ nome, provincia })),
  ).sort((a, b) => a.nome.localeCompare(b.nome, 'it'))

/** Confronto tollerante: ignora maiuscole, accenti e spazi doppi. */
const chiave = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z]+/g, ' ')
    .trim()

const indice = new Map(comuni.map((c) => [chiave(c.nome), c]))

/**
 * Riporta un comune scritto a mano alla sua forma ufficiale.
 * Torna `null` se non è nelle tre province: non è un errore — lo studio lavora
 * anche fuori — ma nella mail va segnalato.
 */
export function riconosciComune(scritto: string) {
  return indice.get(chiave(scritto)) ?? null
}
