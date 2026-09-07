import { servizi } from '@/lib/servizi'
import { site } from '@/lib/site'

/**
 * Il nodo `ProfessionalService` + `LocalBusiness` di REGOLO.
 *
 * `CLAUDE.md` § SEO chiede questa coppia **sulla home e sui contatti**. Era
 * scritta a mano in `/studio` — la sola pagina che il capitolato *non* nomina —
 * e mancava sulle due che nomina. Una volta è un nodo; tre volte, copiato in
 * tre file, è un dato che diverge: il giorno che il numero di telefono cambia
 * in `lib/site.ts`, due copie su tre restano indietro senza che niente si
 * rompa in modo visibile.
 *
 * Quindi sta qui, una volta, e le pagine passano solo il `description` — che è
 * l'unica cosa che davvero cambia fra loro, perché ogni pagina descrive sé
 * stessa con le parole del suo contesto.
 *
 * **Nessun dato inventato entra da questa porta.** Tutti i campi vengono da
 * `lib/site.ts` (sede, telefono, qualifica: confermati in `CLAUDE.md`
 * § Cliente) o dall'elenco chiuso dei servizi. `areaServed` resta «Fermo e
 * provincia», che è una deduzione dalla sede: è segnata in
 * `CONTENUTI-DA-CLIENTE.md` come da confermare, e i comuni entrano con la
 * decisione n. 13.
 */
export function nodoStudio(descrizione: string) {
  return {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    name: site.nomeEsteso,
    description: descrizione,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.via,
      postalCode: site.cap,
      addressLocality: site.citta,
      addressRegion: site.provincia,
      addressCountry: 'IT',
    },
    /* In forma E.164 (`+39…`): è quella che una macchina può chiamare. In
       pagina il numero resta scritto come si legge. */
    telephone: site.telefonoHref,
    /* «Fermo + provincia», come il nodo `Service` di `/servizi/[slug]`. **Non**
       le tre province del blocco Territorio: quel perimetro è il riquadro
       geografico dell'autocomplete del brief, non un'affermazione su dove lo
       studio lavori. Qui invece un'area di servizio *è* un'affermazione, e in
       forma leggibile da una macchina: si dichiara solo quella che risulta
       dalla sede. */
    areaServed: `${site.citta} e provincia`,
    /* `knowsAbout` vuole argomenti, non slogan: il titolo di un servizio è un
       esito per il committente, il sottotitolo è la competenza. */
    knowsAbout: servizi.map((s) => s.sottotitolo),
  }
}
