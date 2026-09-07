import { Confronto } from '@/components/sezioni/Confronto'
import { Sezione } from '@/components/sezioni/Sezione'

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
 */
export function PrimaDopo() {
  return (
    <Sezione
      id="prima-dopo"
      fondo="alt"
      nota="Servono due o tre coppie di fotografie riprese dallo stesso punto: è il vincolo che fa funzionare il blocco, e senza quello non si mette online."
    >
      <div className="grid-12 items-center">
        <div className="nav:col-span-4 col-span-12">
          <p className="etichetta-sezione">Sez. 05 — Prima / dopo</p>
          <h2 className="mt-3 max-w-[18ch]">La prova che chiunque capisce al volo.</h2>
          <p className="intro-sezione text-lead">
            Due fotografie dallo stesso punto. Su un recupero è la cosa più convincente che si possa
            mettere in una pagina, e non ha bisogno di essere spiegata.
          </p>
        </div>

        <div className="nav:col-start-6 nav:col-span-7 col-span-12">
          <Confronto prima="Prima — foto dallo studio" dopo="Dopo — stesso punto di ripresa" />
        </div>
      </div>
    </Sezione>
  )
}
