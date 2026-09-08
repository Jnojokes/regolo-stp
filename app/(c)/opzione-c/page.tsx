import type { Metadata } from 'next'
import { BarraMobile } from '@/components/BarraMobile'
import { BarraProposta } from '@/components/BarraProposta'
import { Brief } from '@/components/brief/Brief'
import { Documento } from '@/components/campo/Campo'
import { Lastra } from '@/components/campo/Rottura'
import { ComeLavoriamo } from '@/components/sezioni/ComeLavoriamo'
import { HeroFonderia } from '@/components/sezioni/HeroFonderia'
import { Numeri } from '@/components/sezioni/Numeri'
import { Persone } from '@/components/sezioni/Persone'
import { PrimaDopo } from '@/components/sezioni/PrimaDopo'
import { Progetti } from '@/components/sezioni/Progetti'
import { Servizi } from '@/components/sezioni/Servizi'

export const metadata: Metadata = {
  title: 'Homepage',
  description:
    'Proposta di homepage per REGOLO, variante «La fonderia»: fotografia a piena finestra e il marchio in serif che le passa sopra da bordo a bordo.',
}

/**
 * Home — opzione C «La fonderia», dal sistema di **Studio Foundry**, che il
 * committente ha chiesto per nome indicando l'indirizzo
 * (`DECISIONI.md` n. 37). Guardata, non descritta:
 * `kit/reference/studio-foundry/`.
 *
 * La direzione precedente di questa rotta («La parete», da Iad-lab) è stata
 * scartata dal committente con una frase sola — *«non hanno senso le opzioni C
 * e D»* — e la diagnosi è un numero, non un'impressione: C e D condividevano il
 * **97 % delle classi con B**. Erano B ricolorata due volte.
 *
 * Quello che cambia adesso non è una tinta, è **che cos'è la prima schermata**:
 * qui la home apre con una **fotografia a piena finestra** e ci mette sopra il
 * marchio in serif, da bordo a bordo. In A la fotografia sta accanto al testo;
 * in B non c'è nemmeno, perché B apre con una domanda su fondo nero.
 *
 * Il meccanismo di B non si tocca: il registro — le sei righe che *sono* il
 * passo 1 del brief — arriva **sotto la piega**, sulla carta calda, e la scelta
 * si propaga fino al form senza una riga di JavaScript. Sopra c'è il manifesto,
 * sotto comincia il lavoro: è la stessa scelta della reference, che sopra la
 * piega non chiede niente.
 *
 * **Onestà sul residuo**: sotto la piega C riusa ancora i blocchi di B
 * (`Numeri`, `Servizi`, `ComeLavoriamo`, `Progetti`, `PrimaDopo`, `Persone`),
 * vestiti dal tema ma non ricomposti. Le classi condivise con B sono passate dal
 * 97 % al **94 %**: la hero e il sistema tipografico sono tre siti diversi, i
 * corpi non ancora.
 */
export default function OpzioneC() {
  return (
    <>
      <BarraProposta opzione="c" />
      {/* La pagina apre con **una fotografia a piena finestra** e il marchio in
          serif che ci sta sopra: è il gesto di Studio Foundry, ed è quello che
          nessuna delle altre proposte ha. */}
      <HeroFonderia />
      <Documento>
        <Numeri />
        <Servizi variante="tabella" />
        <ComeLavoriamo variante="sequenza" />
        <Progetti variante="dati" />
        <Lastra
          label="Fotografia di un’opera realizzata — dallo studio, non un render"
          demo="opera-02"
          nota="RESIDENZIALE · [[DA CLIENTE: anno]]"
        />
        <PrimaDopo />
        <Persone variante="registro" />
      </Documento>
      <Brief pagina="/opzione-c" etichetta="il brief" passo1Esterno quotaForma="registro" />
      <BarraMobile />
    </>
  )
}
