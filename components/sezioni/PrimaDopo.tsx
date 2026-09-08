import { Confronto } from '@/components/sezioni/Confronto'
import { Campo } from '@/components/campo/Campo'

/**
 * Prima / dopo (CLAUDE.md § Homepage, blocco 8 · catalogo blocchi B4).
 *
 * È il blocco che più converte nel recupero edilizio, e il motivo è banale:
 * una fotografia del prima e una del dopo dallo stesso punto le capisce
 * chiunque, senza sapere niente di edilizia. Su due o tre recuperi vale più di
 * qualsiasi descrizione del metodo.
 *
 * Il rischio del blocco non è tecnico: è che le due foto siano riprese da punti
 * diversi. In quel caso non prova niente e si vede — la riga è in
 * TODO-MEDIA.md con il vincolo «stesso punto di ripresa».
 *
 * Qui c'è solo il guscio: il cursore sta in `Confronto`, che è l'unico pezzo
 * client di tutta la home, perché il `clip-path` lo muove JavaScript.
 *
 * **Fase 3 bis**: le due metà non sono più due segnaposto grigi sovrapposti —
 * due tinte a 1,17:1 l'una dall'altra, cioè un cursore che non rivelava niente.
 * Sono i **due piani** del tema, e il taglio sta a **21:1**. Il blocco dimostra lo
 * strumento, che è quello che si può dimostrare finché le fotografie non ci
 * sono, e la casella porta già la propria specifica.
 */
export function PrimaDopo() {
  return (
    <Campo
      id="prima-dopo"
      pieno
      etichetta="prima e dopo"
      titolo="La prova che chiunque capisce al volo."
      intro="Due fotografie dallo stesso punto. Su un recupero è la cosa più convincente che si possa mettere in una pagina, e non ha bisogno di essere spiegata."
      nota="Servono due o tre coppie di fotografie riprese dallo stesso punto: è il vincolo che fa funzionare il blocco, e senza quello non si mette online."
    >
      <Confronto
        prima="[[DA CLIENTE: foto dello stato attuale]]"
        dopo="[[DA CLIENTE: foto dopo, stesso punto di ripresa]]"
        specifica="1600 × 1000 px · AVIF · ≤ 250 KB"
        demoPrima="prima-01"
        demoDopo="dopo-01"
      />
    </Campo>
  )
}
