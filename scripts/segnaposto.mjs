/**
 * La lista della spesa, generata dalle pagine rese.
 *
 * ## Perché esiste
 *
 * Il committente ha chiesto *«invece di mettere "DA CLIENTE" metti lorem ipsum
 * come placeholder»* per le proposte C e D, che sono una demo di vendita. La
 * richiesta è giusta, ma i `[[DA CLIENTE: …]]` facevano **due** lavori e solo
 * uno era «farsi vedere»:
 *
 * 1. dichiarare in pagina che il contenuto manca;
 * 2. **essere la lista della spesa** — `CONTENUTI-DA-CLIENTE.md` esiste perché
 *    quelle stringhe si possono contare.
 *
 * Sostituire il testo e fermarsi lì avrebbe cancellato il secondo, e il difetto
 * si sarebbe scoperto il giorno in cui si chiedono i contenuti allo studio e
 * nessuno sa più che cosa chiedere. Quindi: in pagina il lorem ipsum, e la
 * richiesta resta nel DOM in `data-chiede`. Questo script la raccoglie.
 *
 * ## Perché legge l'HTML e non il codice
 *
 * Non è una scelta di comodo: è **più robusto del `grep` che sostituisce**. La
 * critica della ricognizione ha trovato che cinque `[[DA CLIENTE` di
 * `/opzione-c` stavano **fuori** dal componente `DaCliente` — due in un
 * `<caption class="sr-only">`, due in `.confronto-specifica`, uno in una `nota`
 * passata dalla pagina — quindi erano invisibili all'unico gancio automatico che
 * c'era. Un raccoglitore che legge la pagina resa non ha quel punto cieco: vede
 * quello che vede il visitatore, più gli attributi. E dice **su quale rotta** sta
 * ogni buco, che un `grep` sul codice non sa dire.
 *
 * Raccoglie tutte e due le forme, perché il sito ne ha due per una ragione:
 *
 * - `data-chiede="…"` — C e D, dove in pagina si legge lorem ipsum;
 * - `[[DA CLIENTE: …]]` — A e le pagine interne, dove il segnaposto **si deve
 *   vedere** perché A è la proposta candidata alla produzione, e la regola 1 di
 *   `CLAUDE.md` vale lì.
 *
 * ## Uso
 *
 *     npm run build && node scripts/segnaposto.mjs           # stampa il rapporto
 *     npm run build && node scripts/segnaposto.mjs --scrivi  # aggiorna il .md
 *
 * Con `--scrivi` sostituisce **solo** il blocco fra i due marcatori in
 * `CONTENUTI-DA-CLIENTE.md`. Tutto il resto del file — le tabelle dei
 * bloccanti, le note, le date di «Chiesto il» e «Ricevuto» — è scritto a mano e
 * non si tocca: un generatore che sovrascrive quello che una persona ha
 * annotato viene spento dopo due volte.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const RESO = '.next/server/app'
const DOC = 'CONTENUTI-DA-CLIENTE.md'
const INIZIO = '<!-- SEGNAPOSTO:inizio -->'
const FINE = '<!-- SEGNAPOSTO:fine -->'

/* Come si chiama una rotta, per il rapporto. `index` è la home. */
const nomeRotta = (f) => '/' + f.replace(/\.html$/, '').replace(/^index$/, '')

function htmlResi(dir, prefisso = '') {
  const fuori = []
  for (const voce of readdirSync(dir)) {
    const p = join(dir, voce)
    if (statSync(p).isDirectory()) fuori.push(...htmlResi(p, prefisso + voce + '/'))
    else if (voce.endsWith('.html')) fuori.push([prefisso + voce, p])
  }
  return fuori
}

const pagine = htmlResi(RESO).sort((a, b) => a[0].localeCompare(b[0]))
if (pagine.length === 0) {
  console.error(`nessun HTML in ${RESO}: lancia prima \`npm run build\`.`)
  process.exit(1)
}

/** chiave della richiesta → { rotte: Set, forma } */
const richieste = new Map()

for (const [file, percorso] of pagine) {
  const html = readFileSync(percorso, 'utf8')
  const rotta = nomeRotta(file)

  /* Forma 1: l'attributo delle proposte C e D. */
  for (const m of html.matchAll(/data-chiede="([^"]+)"/g)) aggiungi(m[1], rotta, 'lorem ipsum')

  /* Forma 2: il segnaposto visibile di A e delle pagine interne. Le entità
     dell'HTML reso vanno decodificate, altrimenti «un'opera» esce come
     «un&#x27;opera» e due voci identiche sembrano due voci diverse. */
  for (const m of html.matchAll(/\[\[DA CLIENTE:\s*([^\]]+)\]\]/g))
    aggiungi(decodifica(m[1]), rotta, 'visibile')
}

function decodifica(s) {
  return s
    .replace(/&#x27;|&apos;|&#39;/g, '’')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#x2019;/g, '’')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function aggiungi(chiave, rotta, forma) {
  const k = chiave.trim()
  if (!richieste.has(k)) richieste.set(k, { rotte: new Set(), forme: new Set() })
  const v = richieste.get(k)
  v.rotte.add(rotta)
  v.forme.add(forma)
}

/* ---------- il rapporto ----------------------------------------------------- */
const voci = [...richieste.entries()].sort((a, b) => a[0].localeCompare(b[0], 'it'))
const perRotta = new Map()
for (const [, v] of voci) for (const r of v.rotte) perRotta.set(r, (perRotta.get(r) || 0) + 1)

console.log(`${voci.length} richieste distinte su ${pagine.length} pagine rese.\n`)
console.log('  per rotta:')
for (const [r, n] of [...perRotta.entries()].sort((a, b) => b[1] - a[1]))
  console.log(`    ${String(n).padStart(3)}  ${r}`)

const soloLorem = voci.filter(([, v]) => v.forme.has('lorem ipsum') && !v.forme.has('visibile'))
const soloVisibile = voci.filter(([, v]) => v.forme.has('visibile') && !v.forme.has('lorem ipsum'))
const doppie = voci.filter(([, v]) => v.forme.size > 1)
console.log(
  `\n  ${soloLorem.length} solo come lorem ipsum (C e D) · ${soloVisibile.length} solo visibili (A e pagine interne) · ${doppie.length} in tutte e due le forme`,
)

/* Una richiesta che compare **solo** in C o D e da nessuna parte in forma
   visibile è quella che il vecchio `grep` avrebbe perso: vale la pena dirlo,
   perché è la ragione per cui questo script esiste. */
if (soloLorem.length)
  console.log(
    `\n  le ${soloLorem.length} voci qui sotto esistono solo dentro un \`data-chiede\`:\n  senza questo raccoglitore sparirebbero dalla lista della spesa.`,
  )

const tabella = [
  '| Cosa serve | Dove (rotte) | Come si vede in pagina |',
  '|---|---|---|',
  ...voci.map(([k, v]) => {
    const rotte = [...v.rotte].sort().join(' · ')
    const forme = [...v.forme].sort().join(' + ')
    return `| ${k} | ${rotte} | ${forme} |`
  }),
].join('\n')

const blocco = [
  INIZIO,
  '',
  '> **Generato**, non scritto a mano: `npm run build && node scripts/segnaposto.mjs --scrivi`.',
  `> ${voci.length} richieste distinte, raccolte dall'HTML reso di ${pagine.length} pagine.`,
  '> Le due forme sono volute: in A il segnaposto **si vede** (è la proposta candidata alla',
  '> produzione), in C e D si legge lorem ipsum e la richiesta resta in `data-chiede`.',
  '',
  tabella,
  '',
  FINE,
].join('\n')

if (!process.argv.includes('--scrivi')) {
  console.log(`\n  (con \`--scrivi\` aggiorna il blocco generato in ${DOC})`)
  process.exit(0)
}

let doc = readFileSync(DOC, 'utf8')
if (doc.includes(INIZIO) && doc.includes(FINE)) {
  const a = doc.indexOf(INIZIO)
  const b = doc.indexOf(FINE) + FINE.length
  doc = doc.slice(0, a) + blocco + doc.slice(b)
} else {
  doc = doc.trimEnd() + '\n\n## Ogni segnaposto in pagina, rotta per rotta\n\n' + blocco + '\n'
}
writeFileSync(DOC, doc)
console.log(`\n✔ aggiornato il blocco generato in ${DOC} (${voci.length} voci).`)
