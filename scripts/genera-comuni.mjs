/**
 * Rigenera lib/brief/comuni.ts — l'elenco dei comuni di Fermo, Macerata e
 * Ascoli Piceno che alimenta il <datalist> del passo 2 del brief.
 *
 * Sorgente: matteocontrini/comuni-json, derivato dall'elenco ISTAT dei comuni
 * italiani. Dato pubblico amministrativo, non contenuto del cliente: si può
 * scrivere in chiaro (CLAUDE.md § Regole, 1 vale sui contenuti dello studio).
 *
 * Uso: node scripts/genera-comuni.mjs
 * Da rilanciare solo se ISTAT cambia l'elenco (fusioni, nuove istituzioni).
 */
import { writeFileSync } from 'node:fs'

const FONTE = 'https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json'
const PROVINCE = ['FM', 'MC', 'AP']
/** Numerosità attesa: se non torna, l'elenco a monte è cambiato e va guardato. */
const ATTESI = { FM: 40, MC: 55, AP: 33 }

const risposta = await fetch(FONTE)
if (!risposta.ok) throw new Error(`Sorgente non raggiungibile: ${risposta.status}`)
const tutti = await risposta.json()

const perProvincia = {}
for (const sigla of PROVINCE) {
  const nomi = tutti
    .filter((c) => c.sigla === sigla)
    .map((c) => c.nome)
    .sort((a, b) => a.localeCompare(b, 'it'))
  if (nomi.length !== ATTESI[sigla]) {
    throw new Error(`${sigla}: attesi ${ATTESI[sigla]} comuni, trovati ${nomi.length}`)
  }
  perProvincia[sigla] = nomi
}

const oggi = new Date().toISOString().slice(0, 10)
const blocco = (sigla) =>
  `  ${sigla}: [\n${perProvincia[sigla].map((n) => `    ${JSON.stringify(n)},`).join('\n')}\n  ],`

writeFileSync(
  new URL('../lib/brief/comuni.ts', import.meta.url),
  `/**
 * I comuni delle tre province in cui lavora lo studio: Fermo, Macerata,
 * Ascoli Piceno. Alimentano il <datalist> del passo 2 del brief.
 *
 * GENERATO — non modificare a mano: \`node scripts/genera-comuni.mjs\`.
 * Sorgente: elenco ISTAT dei comuni italiani via matteocontrini/comuni-json.
 * Rigenerato il ${oggi}. ${PROVINCE.map((s) => `${s} ${perProvincia[s].length}`).join(' · ')} = ${PROVINCE.reduce(
   (n, s) => n + perProvincia[s].length,
   0,
 )} comuni.
 *
 * Nota: il datalist si renderizza lato server (components/brief/Brief.tsx), così
 * i 128 nomi stanno nell'HTML e non nel bundle JavaScript. Questo file non va
 * importato da un componente client.
 */

export const PROVINCE_SERVITE = ${JSON.stringify(PROVINCE)} as const
export type ProvinciaServita = (typeof PROVINCE_SERVITE)[number]

export const comuniPerProvincia: Record<ProvinciaServita, readonly string[]> = {
${PROVINCE.map(blocco).join('\n')}
}

/** Elenco piatto ordinato, per il <datalist>. */
export const comuni: readonly { nome: string; provincia: ProvinciaServita }[] = PROVINCE_SERVITE.flatMap(
  (provincia) => comuniPerProvincia[provincia].map((nome) => ({ nome, provincia })),
).sort((a, b) => a.nome.localeCompare(b.nome, 'it'))

/** Confronto tollerante: ignora maiuscole, accenti e spazi doppi. */
const chiave = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z]+/g, ' ')
    .trim()

const indice = new Map(comuni.map((c) => [chiave(c.nome), c]))

/**
 * Riporta un comune scritto a mano alla sua forma ufficiale.
 * Torna \`null\` se non è nelle tre province: non è un errore — lo studio lavora
 * anche fuori — ma nella mail va segnalato.
 */
export function riconosciComune(scritto: string) {
  return indice.get(chiave(scritto)) ?? null
}
`,
)

console.log(
  `lib/brief/comuni.ts rigenerato — ${PROVINCE.map((s) => `${s} ${perProvincia[s].length}`).join(', ')}`,
)
