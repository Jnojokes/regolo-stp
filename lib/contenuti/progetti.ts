import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { gruppi } from '@/lib/brief/domande'
import { INTERVENTI, schemaProgetto, type FrontmatterProgetto } from './schema'

/**
 * Legge le schede progetto da `content/progetti/*.mdx` e le valida.
 *
 * Gira **al momento della build** (le rotte sono statiche): quello che qui
 * lancia un errore ferma `next build`. È il punto: i progetti li scriverà
 * qualcun altro in un file di testo, e un campo dimenticato deve fermare la
 * build e non finire in pagina (prompt della fase 4).
 *
 * Solo lato server: importa `node:fs`.
 */

const CARTELLA = join(process.cwd(), 'content', 'progetti')

export type Progetto = FrontmatterProgetto & {
  slug: string
  /** Il corpo MDX, non compilato: lo compila la pagina. */
  corpo: string
}

/* -------------------------------------------------------------------------- */

/**
 * Il tipo di intervento della scheda deve essere una delle chiavi del passo 1
 * del brief. Sono due elenchi in due file — `lib/contenuti/schema.ts` e
 * `lib/brief/domande.ts` — e senza questo controllo prima o poi divergono: uno
 * slug in più da una parte e lo smistamento smette di collegare le schede senza
 * che niente si rompa in modo visibile. Qui la divergenza ferma la build.
 */
function verificaCoerenzaInterventi(): void {
  const nelBrief = new Set(gruppi.intervento.opzioni.map((o) => o.valore))
  const soloQui = INTERVENTI.filter((i) => !nelBrief.has(i))
  const soloNelBrief = [...nelBrief].filter((i) => !INTERVENTI.includes(i as never))
  if (soloQui.length || soloNelBrief.length) {
    throw new Error(
      'lib/contenuti/schema.ts e lib/brief/domande.ts non hanno più le stesse chiavi di intervento. ' +
        `Solo nello schema: ${soloQui.join(', ') || '—'}. Solo nel brief: ${soloNelBrief.join(', ') || '—'}.`,
    )
  }
}

function leggi(): Progetto[] {
  verificaCoerenzaInterventi()

  let file: string[]
  try {
    file = readdirSync(CARTELLA).filter((f) => f.endsWith('.mdx'))
  } catch {
    /* La cartella può non esistere ancora: zero progetti è uno stato valido,
       e `/progetti/[slug]` risponde 404 vero (fase 1). */
    return []
  }

  const progetti = file.map((nome) => {
    const slug = nome.replace(/\.mdx$/, '')
    const { data, content } = matter(readFileSync(join(CARTELLA, nome), 'utf8'))

    const esito = schemaProgetto.safeParse(data)
    if (!esito.success) {
      const problemi = esito.error.issues
        .map((i) => `  · ${i.path.join('.') || '(radice)'}: ${i.message}`)
        .join('\n')
      throw new Error(`content/progetti/${nome} non è valido:\n${problemi}`)
    }

    if (!content.trim()) {
      throw new Error(
        `content/progetti/${nome}: il corpo è vuoto. Il frontmatter sono i dati duri, ` +
          'ma la scheda vive del racconto — contesto, scelte, cantiere.',
      )
    }

    return { ...esito.data, slug, corpo: content }
  })

  /* Uno slug correlato che non esiste è un link morto: si trova adesso. */
  const esistenti = new Set(progetti.map((p) => p.slug))
  for (const p of progetti) {
    for (const c of p.correlati) {
      if (!esistenti.has(c)) {
        throw new Error(`content/progetti/${p.slug}.mdx rimanda a «${c}», che non esiste.`)
      }
    }
  }

  /* Più recenti prima. Gli anni segnaposto non sono numeri e finiscono in coda
     nell'ordine in cui stanno nella cartella: è l'unico ordine onesto. */
  return progetti.sort((a, b) => (Number(b.anno) || 0) - (Number(a.anno) || 0))
}

/** Tutte le schede, esempi compresi. */
export const progetti: readonly Progetto[] = leggi()

/**
 * Le schede da mostrare nell'indice e nella navigazione. Le schede di esempio
 * restano raggiungibili per URL — servono a far vedere allo studio come sarà
 * una scheda — ma non contano come portfolio.
 */
export const progettiVeri: readonly Progetto[] = progetti.filter((p) => !p.esempio)

export const progettoBySlug = (slug: string) => progetti.find((p) => p.slug === slug)

/** La scheda dopo questa, per il «progetto successivo» a fondo scheda. */
export function progettoSuccessivo(slug: string): Progetto | undefined {
  const elenco = progettiVeri.length > 0 ? progettiVeri : progetti
  if (elenco.length < 2) return undefined
  const i = elenco.findIndex((p) => p.slug === slug)
  if (i < 0) return undefined
  return elenco[(i + 1) % elenco.length]
}
