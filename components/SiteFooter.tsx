import Link from 'next/link'
import { legal, menu, site } from '@/lib/site'
import { DaCliente } from '@/components/Placeholder'
import { MappaSede } from '@/components/MappaSede'
import { Quota } from '@/components/Quota'
import { comuni, province } from '@/lib/territorio'

/**
 * Footer operativo (catalogo blocchi G1): nei servizi professionali è la
 * pagina contatti che nessuno chiama così.
 *
 * In pagina ci sono SOLO i dati confermati; email, PEC, P.IVA e orari sono
 * segnaposto dichiarati — nessuno di questi può andare online
 * (CONTENUTI-DA-CLIENTE.md, bloccanti).
 *
 * ## Fase 3 bis — tre tempi, non quattro colonne
 *
 * Erano quattro colonne uguali con un occhiello in maiuscoletto sopra ognuna,
 * che è la voce n. 5 della lista di calibrazione applicata quattro volte di
 * fila. Ora è la **riga in tre tempi** di Storey (`ST / CTF  THANK YOU
 * STOREY.STUDIO`, misurata) e di Pelizzari: indirizzo a sinistra, contatti
 * accanto, dati fiscali spinti al bordo destro, e in mezzo il vuoto.
 *
 * **Il telefono è il corpo più grande del footer.** La telefonata è l'azione
 * secondaria dichiarata (`CLAUDE.md` § Obiettivo) e la gerarchia tipografica
 * del footer deve raccontare la gerarchia delle azioni, non l'organigramma del
 * documento.
 *
 * In A il footer è una banda `ink` **saldata al brief** (passo zero fra i due):
 * il terzo piano della pagina non si interrompe per ricominciare. In B la
 * tavola continua e cambia solo un filetto in testa — perché in B il fondo non
 * cambia mai.
 *
 * La «mappa statica» di `CLAUDE.md` è un **ritaglio dello stesso SVG del
 * territorio** sulla sede (`components/MappaSede.tsx`): zero byte in più, zero
 * terzi, nessun iframe, nessun banner, e nessun segnaposto da riempire.
 */
const contaComuni = (sigla: string) => comuni.filter((c) => c.sigla === sigla).length

export function SiteFooter({
  conTerritorio = false,
  variante = 'lockup',
}: {
  conTerritorio?: boolean
  /**
   * `lockup` (A) chiude un sito; le altre due chiudono una **proposta**, e
   * cade sulla stessa griglia a due colonne di tutti i campi. La variante
   * arriva dal layout, che è dove il tema si sceglie: composizione, non un
   * `if` sul tema nel markup.
   */
  variante?: 'lockup' | 'destra' | 'pastiglia'
}) {
  return (
    <footer className={`site-footer site-footer-${variante}`}>
      <div className="wrap site-footer-riga">
        <div className="site-footer-sede">
          <p className="logo-name">{site.nomeEsteso}</p>
          <p className="site-footer-ragione">
            <DaCliente>{site.ragioneSociale}</DaCliente>
          </p>
          <address className="site-footer-indirizzo not-italic">
            {site.via}
            <br />
            {site.cap} {site.citta} ({site.provincia})
          </address>
        </div>

        <div className="site-footer-contatti">
          {/* Il corpo più grande del footer: è l'azione secondaria del sito. */}
          <a href={`tel:${site.telefonoHref}`} className="site-footer-telefono">
            {site.telefono}
          </a>
          <p className="site-footer-mail">
            <DaCliente>{site.email}</DaCliente>
          </p>
          <p className="site-footer-orari">
            <DaCliente>{site.orari}</DaCliente>
          </p>
          <ul className="site-footer-menu">
            {menu.map((v) => (
              <li key={v.href}>
                <Link href={v.href}>{v.label.toLowerCase()}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* I dati fiscali all'estremo destro, con il vuoto in mezzo: è dove
            stanno i metadati in Pelizzari e la lettura di coordinate in
            ecoLINEAR. Sono anche i dati che si leggono una volta sola. */}
        <dl className="site-footer-dati">
          <dt>PEC</dt>
          <dd>
            <DaCliente>{site.pec}</DaCliente>
          </dd>
          <dt>P.IVA</dt>
          <dd>
            <DaCliente>{site.partitaIva}</DaCliente>
          </dd>
        </dl>

        {/* Non è più un rettangolo dichiarato: è un **ritaglio dello stesso
            SVG del territorio** centrato sulla sede. Zero richieste, zero
            terzi, nessun iframe, e si ritematizza. È l'unico segnaposto che
            questa fase ha potuto eliminare, perché era l'unico che non
            aspettava niente dal cliente. */}
        <MappaSede />
      </div>

      {/* La quota dei 128 comuni sta qui **solo nell'opzione B**, che non ha il
          blocco Territorio (decisione del 07/09 sull'ordine dei blocchi). Così
          le tre quote del sito sono tre in entrambe le proposte, e nessuna
          delle due perde il dato territoriale — che per uno studio locale è la
          credenziale che pesa di più. */}
      {conTerritorio && (
        <div className="wrap site-footer-quota">
          <Quota
            voci={province.map((p) => p.nome)}
            numero={comuni.length}
            unita="comuni nell’autocomplete"
            dettaglio={province.map((p) => `${p.sigla} ${contaComuni(p.sigla)}`).join(', ')}
            /* In B anche l'ultima quota della pagina è una riga di documento:
               niente terminatori obliqui, che sono la firma di A. */
          />
        </div>
      )}

      {/* La riga scritta a mano: **una volta sola in tutta la pagina**, e solo
          nell'opzione C. È la firma di Storey, che usa una calligrafica
          esattamente una volta, in fondo. Negli altri tre temi il CSS non la
          disegna nemmeno — la regola sta lì, non qui, così non si può
          «accendere» per sbaglio da un altro blocco. */}
      {variante === 'pastiglia' ? (
        <div className="wrap">
          <p className="mano">Grazie di essere arrivato fin qui.</p>
        </div>
      ) : null}

      <div className="wrap site-footer-coda">
        <p>
          © {new Date().getFullYear()} {site.nomeEsteso} — {site.qualifica}, {site.citta}
        </p>
        <ul>
          {legal.map((v) => (
            <li key={v.href}>
              <Link href={v.href}>{v.label.toLowerCase()}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
