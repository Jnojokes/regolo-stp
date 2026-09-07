/**
 * Dati dello studio. Regola non negoziabile (CLAUDE.md § Regole, 1):
 * qui dentro entrano SOLO dati confermati. Tutto il resto è un placeholder
 * dichiarato, elencato in CONTENUTI-DA-CLIENTE.md, e non deve andare online.
 */

/** Segnaposto inequivocabile. Il collaudo (fase 8) fallisce se ne trova uno in produzione. */
export const daCliente = (cosa: string) => `[[DA CLIENTE: ${cosa}]]`

export const site = {
  /* --- confermato (LinkedIn, verificato 03/09/2026) --- */
  nome: 'REGOLO',
  nomeEsteso: 'REGOLO STP',
  qualifica: 'ingegneria civile e architettura',
  via: 'Via Campiglione 2/E',
  cap: '63900',
  citta: 'Fermo',
  provincia: 'FM',
  telefono: '0734 510329',
  telefonoHref: '+390734510329',

  /* --- da cliente: bloccanti, vedi CONTENUTI-DA-CLIENTE.md --- */
  ragioneSociale: daCliente('ragione sociale esatta'),
  email: daCliente('email pubblica'),
  pec: daCliente('PEC'),
  partitaIva: daCliente('P.IVA'),
  rea: daCliente('numero REA'),
  orari: daCliente('orari di apertura'),
} as const

/** Le 4 voci di menu: uno studio ha quattro cose da dire, non nove. */
export const menu = [
  { href: '/progetti', label: 'Progetti' },
  { href: '/servizi', label: 'Servizi' },
  { href: '/studio', label: 'Studio' },
  { href: '/contatti', label: 'Contatti' },
] as const

export const ctaPrimaria = { href: '/contatti#brief', label: 'Raccontaci il progetto' } as const

export const legal = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/cookie', label: 'Cookie' },
  { href: '/note-legali', label: 'Note legali' },
] as const
