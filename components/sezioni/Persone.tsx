import { DaCliente, Placeholder } from '@/components/Placeholder'
import { Sezione } from '@/components/sezioni/Sezione'
import { notaPersone, persone } from '@/lib/persone'
import { eSegnaposto } from '@/lib/site'

/**
 * Le persone (CLAUDE.md § Homepage, blocco 9 · catalogo blocchi G2).
 *
 * Chi arriva qui ha già sentito il nome per passaparola e sta decidendo se
 * fidarsi: in una società tra professionisti non si scelgono i servizi, si
 * sceglie chi firma. È l'ultimo blocco di prova prima del brief, e per questo è
 * anche quello in cui non si inventa niente — nome, abilitazione e ritratto
 * sono dati bloccanti (CONTENUTI-DA-CLIENTE.md) e restano caselle dichiarate
 * vuote finché non arrivano dallo studio.
 *
 * Le caselle vuote si mostrano invece di nascondere il blocco. È la scelta
 * scomoda: un blocco nascosto non si vede mancare e nessuno lo compila, mentre
 * quattro rettangoli in pagina sono una domanda che il cliente vede in call.
 * Quattro però è un'ipotesi di impaginazione e non un organigramma — lo studio
 * è di 2-10 persone — e `notaPersone` lo dichiara sotto la griglia, perché
 * nessuno legga «quattro» come una proposta.
 *
 * Nome, ruolo e abilitazione stanno in tre elementi distinti e non in una riga
 * unica come nei prototipi: alla fase 6 diventano `Person` + `hasCredential`
 * (CLAUDE.md § SEO) senza rifare il blocco. L'abilitazione è la parte che pesa
 * davvero: ordine, sezione e numero sono ciò che dice chi può firmare, ed è la
 * ragione per cui questo blocco esiste.
 *
 * Il ritratto è in 3/4 verticale per tutti: è il taglio di una foto di persona,
 * e tenerlo identico impedisce che la griglia salti quando arrivano quattro
 * foto scattate in quattro modi diversi (TODO-MEDIA.md).
 */
export function Persone({ variante }: { variante: 'a' | 'b' }) {
  /* La variante cambia solo la testa: griglia, dati e ordine sono gli stessi. */
  const testa =
    variante === 'b'
      ? { etichetta: 'le persone', titolo: 'Chi firma il progetto.' }
      : {
          etichetta: 'le persone',
          titolo: 'In una società tra professionisti si sceglie chi firma.',
        }

  return (
    <Sezione
      id="persone"
      passo="largo"
      asse={variante === 'b'}
      etichetta={testa.etichetta}
      titolo={testa.titolo}
      nota={notaPersone}
    >
      {/* Una lista, non quattro <div>: quante sono le persone è un'informazione,
          e chi usa uno screen reader la sente prima di scorrerle una per una. */}
      <ul className="persone">
        {persone.map((persona, indice) => (
          <li key={indice}>
            {/* I quattro ritratti stanno a **quote verticali disuguali**: quattro
                rettangoli identici allineati sono una griglia di card, e questo
                è l'ultimo blocco di prova prima del brief. Il rapporto resta
                3/4 per tutti, così quando arrivano le foto vere la riga non
                salta (TODO-MEDIA.md). */}
            <Placeholder
              label={persona.ritratto}
              specifica="1200 × 1600 px · AVIF · ≤ 200 KB"
              ratio="3 / 4"
            />
            {/* Il nome è un <h3> come il nome delle schede progetto: una scheda
                con un nome è un titolo, e chi naviga per titoli deve poter
                entrare nelle persone. Che adesso siano quattro segnaposto
                identici è un problema dei segnaposto, non della struttura. */}
            <h3 className="persona-nome">
              <DaCliente>{persona.nome}</DaCliente>
            </h3>
            <span className="persona-ruolo">
              {/* Il mestiere è vero per tre caselle e un segnaposto per la
                  quarta: si evidenzia solo quello che manca. */}
              {eSegnaposto(persona.ruolo) ? <DaCliente>{persona.ruolo}</DaCliente> : persona.ruolo}
            </span>
            <span className="persona-abilitazioni">
              <DaCliente>{persona.abilitazioni}</DaCliente>
            </span>
          </li>
        ))}
      </ul>
    </Sezione>
  )
}
