import Link from 'next/link'
import { DaCliente } from '@/components/Placeholder'
import { ctaPrimaria, daCliente, site } from '@/lib/site'

/**
 * Barra CTA fissa sotto i 768 px (CLAUDE.md § Homepage · catalogo blocchi F2).
 *
 * Su un servizio locale la telefonata è la seconda azione del sito e spesso, da
 * mobile, la prima in assoluto: la barra la tiene sotto il pollice per tutta la
 * pagina, senza costringere a risalire fino all'header.
 *
 * Sono tre celle e nessuno stato, quindi non è un componente client. Che si
 * veda solo sotto i 768 px lo decide il CSS (`.barra-mobile`), non JavaScript:
 * così c'è già al primo paint e non compare a caricamento finito.
 * La pagina che la ospita deve avere la classe `con-barra-mobile`, altrimenti
 * la barra — che è fissa — copre l'ultima riga del footer.
 *
 * La cella WhatsApp è una casella dichiarata vuota, e non è un link:
 * `site.telefono` è un fisso, e un fisso non ha WhatsApp. Puntare `wa.me` sul
 * fisso aprirebbe una chat che non esiste, e inventare un cellulare è fuori
 * discussione (CLAUDE.md § Regole, 1). Il numero va chiesto allo studio; se
 * decidono di non averlo la cella si toglie e la barra torna a due voci.
 *
 * Le tre celle **non sono larghe uguali**: 25 % · 25 % · 50 %. Le larghezze
 * dicono la priorità, e la priorità è quella di CLAUDE.md § Obiettivo — il
 * brief è l'azione primaria. Con metà barra la frase intera «raccontaci il
 * progetto» ci sta (misurata a 390 px), quindi la cella non si chiama più
 * «Brief»: un CTA dice esattamente cosa succede, e mantiene lo stesso nome per
 * tutto il flusso (skill `sito-design` § 8).
 */
export function BarraMobile() {
  return (
    <nav aria-label="Azioni rapide" className="barra-mobile">
      <a href={`tel:${site.telefonoHref}`} data-piano="foglio">
        chiama
      </a>

      {/* Uno <span>, non un <a> disabilitato: non c'è niente da toccare, e un
          link che non porta da nessuna parte è peggio di una casella vuota.
          Il testo è corto perché in una cella da ~110 px il segnaposto lungo
          manderebbe la barra su tre righe. */}
      <span className="barra-mobile-manca text-eyebrow" data-piano="foglio">
        <DaCliente>{daCliente('WhatsApp')}</DaCliente>
      </span>

      <Link href={ctaPrimaria.href} className="barra-mobile-brief" data-piano="foglio">
        raccontaci il progetto
      </Link>
    </nav>
  )
}
