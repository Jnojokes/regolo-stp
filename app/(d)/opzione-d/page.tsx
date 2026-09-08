import type { Metadata } from 'next'
import { BarraMobile } from '@/components/BarraMobile'
import { BarraProposta } from '@/components/BarraProposta'
import { Brief } from '@/components/brief/Brief'
import { Documento } from '@/components/campo/Campo'
import { Lastra } from '@/components/campo/Rottura'
import { ComeLavoriamo } from '@/components/sezioni/ComeLavoriamo'
import { HeroCasa } from '@/components/sezioni/HeroCasa'
import { Numeri } from '@/components/sezioni/Numeri'
import { Persone } from '@/components/sezioni/Persone'
import { PrimaDopo } from '@/components/sezioni/PrimaDopo'
import { Progetti } from '@/components/sezioni/Progetti'
import { Servizi } from '@/components/sezioni/Servizi'

export const metadata: Metadata = {
  title: 'Homepage',
  description:
    'Proposta di homepage per REGOLO, variante «La casa»: fotografia a piena finestra, tipo piccolo, vuoto disuguale e numeri tono su tono.',
}

/**
 * Home — opzione D «La casa», dal sistema di **Storey Architecture**, chiesto
 * per nome dal committente (`DECISIONI.md` n. 37) e **unica delle quattro
 * reference già misurata nel tier A** di `SCHEDA.md`: i suoi valori non sono
 * descritti, sono letti dal browser.
 *
 * C e D aprono tutte e due con una fotografia a piena finestra, e sopra ci
 * mettono l'opposto. C ci scrive il nome dello studio alto quanto lo schermo;
 * **D non ci mette quasi niente**: marchio piccolo, menu piccolo, cinque
 * segmenti, un paragrafo in lineare leggero, una pastiglia bianca. Il contrasto
 * di scala fra le due prime schermate è la differenza, e si vede in una
 * miniatura al 25 %.
 *
 * I tre gesti misurati di Storey che qui diventano regole:
 * **interlinea 1,0** anche sul display, **spaziatura negativa anche sulle
 * maiuscole** (−0,03em sul titolo, −0,1em sulla mono), e il **vuoto disuguale**
 * — dopo una lastra il campo successivo respira 2,2 volte tanto, e `#persone`
 * 2,8. Non è padding: è composizione.
 *
 * I numeri di campo (`contatore`) sono tono su tono, a 1,48:1: sono
 * **decorazione dichiarata** (`data-decorativo`), nessuna informazione ci passa,
 * e il collaudo del contrasto li salta apposta.
 *
 * **Onestà sul residuo**: come in C, sotto la piega i blocchi sono ancora quelli
 * di B, vestiti dal tema ma non ricomposti. Le classi condivise con B sono
 * passate dal 97 % al **90 %**.
 */
export default function OpzioneD() {
  return (
    <>
      <BarraProposta opzione="d" />
      {/* Come Storey: **fotografia a piena finestra**, e sopra ci va il meno
          possibile — marchio piccolo, cinque segmenti, un paragrafo, una
          pastiglia bianca. Il contrario di C, che sopra la stessa fotografia ci
          mette un marchio alto quanto lo schermo. */}
      <HeroCasa />
      <Documento>
        <Numeri contatore="02" />
        <Servizi variante="tabella" contatore="03" />
        <ComeLavoriamo variante="sequenza" contatore="04" />
        <Progetti variante="dati" contatore="05" />
        {/* La banda nera con il claim bianco sopra la fotografia: è il blocco a
            metà pagina di Storey, 115 px e interlinea 1,0. */}
        <Lastra
          label="Fotografia di un’opera realizzata — dallo studio, non un render"
          demo="opera-02"
          nota="02) l’opera, non il render"
        />
        <PrimaDopo />
        <Persone variante="registro" contatore="07" />
      </Documento>
      <Brief pagina="/opzione-d" etichetta="il brief" passo1Esterno quotaForma="registro" />
      <BarraMobile />
    </>
  )
}
