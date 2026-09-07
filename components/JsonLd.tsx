/**
 * Un blocco di dati strutturati.
 *
 * Due cose per cui esiste invece di scrivere `<script>` a mano ogni volta:
 *
 * 1. **Niente campi vuoti.** `senzaVuoti` toglie in profondità `undefined`,
 *    stringhe vuote, array vuoti e — soprattutto — ogni valore che è ancora un
 *    `[[DA CLIENTE: …]]`. La regola madre di
 *    `kit/REGOLO_SEO-GEO-LEGAL.md` è «nessun segnaposto online: un campo
 *    mancante si omette», e in un JSON-LD questo conta il doppio: un segnaposto
 *    in `vatID` non è un buco visibile in pagina, è una partita IVA falsa
 *    dichiarata in modo leggibile da una macchina.
 *
 * 2. **Serializzazione sicura.** `</script>` dentro una stringa chiuderebbe il
 *    tag: `<` si scrive `\\u003c`. I contenuti li scriverà qualcun altro in un
 *    file di testo, quindi non è un caso di scuola.
 *
 * Se dopo la pulizia resta solo il guscio (`@context` e `@type`), non si emette
 * niente: un nodo senza dati non aiuta nessuno e va comunque scaricato.
 */

type Valore = string | number | boolean | null | Valore[] | { [chiave: string]: Valore }

const eSegnaposto = (v: unknown) => typeof v === 'string' && v.includes('[[DA CLIENTE')

function senzaVuoti(valore: Valore): Valore | undefined {
  if (valore === null || valore === undefined) return undefined
  if (eSegnaposto(valore)) return undefined
  if (typeof valore === 'string') return valore.trim() === '' ? undefined : valore
  if (Array.isArray(valore)) {
    const pulito = valore.map(senzaVuoti).filter((v): v is Valore => v !== undefined)
    return pulito.length ? pulito : undefined
  }
  if (typeof valore === 'object') {
    const pulito: Record<string, Valore> = {}
    for (const [k, v] of Object.entries(valore)) {
      const p = senzaVuoti(v as Valore)
      if (p !== undefined) pulito[k] = p
    }
    /* Un nodo in cui restano solo `@type`/`@context` è un **guscio vuoto**: va
       tolto a ogni livello, non solo alla radice. Altrimenti un
       `hasCredential`, un `geo` o un `contactPoint` fatti di soli campi
       segnaposto finiscono nell'output come `{"@type":"…"}` — cioè come
       un'affermazione senza contenuto, che è il difetto che questo file esiste
       per evitare. */
    const conDati = Object.keys(pulito).some((k) => !k.startsWith('@'))
    return conDati ? pulito : undefined
  }
  return valore
}

export function JsonLd({ dati }: { dati: Record<string, Valore> }) {
  const pulito = senzaVuoti(dati)
  if (!pulito || typeof pulito !== 'object' || Array.isArray(pulito)) return null

  /* Restano solo `@context` e `@type`? Allora non c'è nessun dato da dare. */
  const chiavi = Object.keys(pulito).filter((k) => !k.startsWith('@'))
  if (chiavi.length === 0) return null

  return (
    <script
      type="application/ld+json"

      dangerouslySetInnerHTML={{
        __html: JSON.stringify(pulito).replace(/</g, '\\u003c'),
      }}
    />
  )
}
