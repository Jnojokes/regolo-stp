import Link from 'next/link'

import { Sezione } from '@/components/sezioni/Sezione'
import { hrefPercorso, percorsi } from '@/lib/percorsi'

/**
 * Smistamento a domanda (catalogo blocchi A3, CLAUDE.md § Homepage blocco 2):
 * la seconda cosa che si vede nell'opzione A, subito sotto la hero.
 *
 * Serve a smistare, non a raccontare. Chi arriva qui ha già sentito il nome
 * dello studio e sta decidendo se fidarsi: la domanda «che intervento hai in
 * mente?» lo mette davanti al proprio caso invece che a un elenco di servizi, e
 * lo porta in un colpo alla pagina giusta con il passo 1 del brief già scelto.
 *
 * Le cinque voci sono **link**, non bottoni, ed è la scelta che conta:
 * - restano navigabili senza JavaScript, perché in pagina sono cinque `<a href>`
 *   veri (`next/link` li rende tali) e non un `onClick`;
 * - sono cinque URL indicizzabili, quindi il blocco lavora anche per la ricerca;
 * - non c'è nessuno stato da tenere in memoria fra due pagine.
 * Un bottone avrebbe richiesto JavaScript per fare esattamente questo, peggio.
 *
 * Dove finisce il tipo di intervento: **non** nella query string della
 * pastiglia. La pastiglia porta a `/servizi/<slug>` e la CTA di quella pagina
 * punta a `/contatti?intervento=…#brief`, perché la pagina del servizio sa già
 * di che intervento parla — una `?intervento=` qui sarebbe un parametro inerte,
 * e farla leggere a quella pagina vorrebbe dire perdere la resa statica di sei
 * rotte per un dato che ha già. Catena provata senza JavaScript, tre salti
 * (`lib/percorsi.ts` e DECISIONI.md, 07/09).
 *
 * È una striscia sottile (`stretta` + `filoSotto`), non una sezione piena: la
 * domanda sta sulla **stessa riga** delle pastiglie come nel prototipo, così
 * non compete con la hero e non ruba l'unica CTA primaria. Per questo il titolo
 * non passa da `Sezione` (che lo metterebbe sopra, a piena larghezza) ma è un
 * `h2` dentro il contenitore flex, ed è dimensionato `text-h3`: nella gerarchia
 * di pagina è una sezione, nel peso visivo è una domanda di servizio.
 *
 * La riga sotto dice dove portano le pastiglie. Sembra pedante ed è voluta: un
 * committente che non sa se sta scegliendo un filtro o cambiando pagina non
 * clicca.
 */
export function Smistamento({ id = 'smistamento' }: { id?: string }) {
  /* L'`h2` fa da etichetta alla lista: chi usa uno screen reader sente la
     domanda prima delle voci. L'id deriva da quello della sezione perché due
     id uguali in pagina rompono il collegamento, non lo raddoppiano. */
  const idDomanda = `${id}-domanda`

  return (
    <Sezione id={id} stretta filoSotto>
      <div className="striscia-domanda">
        <h2 id={idDomanda} className="text-h3 max-w-[20ch]">
          Che intervento hai in mente?
        </h2>

        <ul className="pastiglie" aria-labelledby={idDomanda}>
          {percorsi.map((percorso) => (
            <li key={percorso.slug}>
              {/* `min-h-11` = 44 px: bersaglio tattile pieno anche con il testo
                  piccolo della pastiglia. */}
              <Link className="pastiglia" href={hrefPercorso(percorso)}>
                {percorso.etichetta}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-small text-muted mt-6 max-w-[62ch]">
        Ogni voce apre la pagina del servizio e imposta già la prima domanda del brief.
      </p>
    </Sezione>
  )
}
