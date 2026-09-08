'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Il **mirino CAD** al posto del puntatore: il gesto che mancava all'opzione B.
 *
 * Il committente: *«non mi sembra che la versione B abbia il cursore come
 * quello della reference»*. Aveva ragione, e non era un dettaglio: su
 * `ecolinearstudio.com` il puntatore di sistema **non c'è** — `cursor: none` su
 * 1.082 elementi — e al suo posto sta il mirino di un programma di disegno.
 * Su una proposta che *è* una tavola da disegno, è il gesto che spiega tutti
 * gli altri.
 *
 * ## Misurato, pezzo per pezzo
 *
 * Letto nel browser sul sito vero muovendo il puntatore
 * (`kit/reference/SCHEDA.md` § ecoLINEAR):
 *
 * | pezzo | misura |
 * |---|---|
 * | il **mirino** | quattro tratti da **64 × 1 px** in `rgba(217,142,54,.4)`, con un **vuoto di 7 px** al centro: le linee non si incrociano sul punto, lo lasciano libero |
 * | la **finestra di selezione** | un quadrato di **8 × 8 px**, 1 px di bordo in `rgba(217,142,54,.75)`, **spigolo vivo**. È il *pick box* di AutoCAD, e resta 8 × 8 in ogni stato (verificato su carta, su un link e su una fotografia) |
 * | la **lettura di coordinate** | 10 px, tracciatura **+0,8 px**, colore `rgba(157,116,96,.55)`, accanto al punto |
 * | l'**anello** | invisibile a riposo (2 × 2, bordo trasparente); sopra un elemento interattivo diventa **52 × 52** con `background rgba(217,142,54,.08)` e il bordo in ambra piena |
 * | il verso | sopra un link la lettura **si spegne** e compare l'anello: i due stati non convivono |
 *
 * ## Le quattro condizioni, e nessuna è negoziabile
 *
 * `cursor: none` è la cosa più facile da rompere di tutto il sito: se il
 * sostituto non compare, il visitatore ha una pagina **senza puntatore**.
 * Quindi il puntatore di sistema si nasconde **solo** quando il mirino è
 * davvero vivo, e il segnale è un attributo che mette il JavaScript:
 * `data-cursore="cad"` sull'`<html>`. Senza JavaScript l'attributo non c'è,
 * la regola non si applica, e non c'è niente da riparare.
 *
 * 1. **`prefers-reduced-motion: reduce` → non si installa.** Un mirino che
 *    segue il puntatore è moto continuo, e `CLAUDE.md` § Regole, 4 dice che
 *    con quella preferenza le animazioni non partono. Qui non «partono più
 *    piano»: non esistono, e resta il puntatore di sistema.
 * 2. **Solo puntatore fine** (`(hover: hover) and (pointer: fine)`): su un
 *    telefono non c'è un puntatore da sostituire, quindi non si aggiunge né
 *    un ascoltatore né un nodo.
 * 3. **Sui campi del form il puntatore di sistema torna.** La reference
 *    nasconde il cursore anche sopra gli `input`, e lì la copiatura si ferma:
 *    la barra di testo che dice «qui si scrive» è un'affordance, e l'azione
 *    primaria di questo sito è **il brief inviato**. Deviazione dichiarata, e
 *    la direzione è quella giusta: si perde un pixel di somiglianza, non si
 *    perde il form.
 * 4. **Si animano solo `transform` e `opacity`** (§ Regole, 7). Il mirino si
 *    sposta con `translate3d`, l'anello cresce con `scale` — la reference
 *    transisce `width`/`height`, che fanno layout — e la comparsa è `opacity`.
 *
 * ## Perché la lettura di coordinate non è un dato inventato
 *
 * La reference scrive `X 9.240  Y 5.544`, che sono i pixel divisi per 75,75:
 * un'unità che non dichiara. Qui la conversione è **definita dalle specifiche**
 * — CSS fissa 96 px = 1 pollice, quindi 1 px = 0,264583 mm — e il numero è la
 * posizione vera del puntatore in **millimetri**, che è l'unità del disegno
 * tecnico. Non è una quota (`CLAUDE.md` § L'apparato: una quota ha due estremi
 * su un oggetto in pagina, e questa non ne ha): è una **lettura**, che è
 * un'altra cosa, e nella reference è un altro oggetto.
 *
 * Porta `data-decorativo` per il contratto della decisione n. 38, e stavolta
 * l'attributo è nel suo caso proprio: il numero è vero ma **non porta
 * informazione** — dov'è il puntatore lo dice il puntatore. Nessuno deve
 * leggere quei millimetri per usare il sito.
 */
export function Cursore() {
  const [attivo, setAttivo] = useState(false)
  const mirino = useRef<HTMLDivElement>(null)
  const lettura = useRef<HTMLSpanElement>(null)

  /* Prima passata: si decide **se** il mirino può esistere. Sta in un effetto
     separato perché `matchMedia` non esiste sul server, e perché il primo
     render deve essere identico all'HTML servito (nessun nodo). */
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const fermo = window.matchMedia('(prefers-reduced-motion: reduce)')
    const decidi = () => setAttivo(fine.matches && !fermo.matches)
    decidi()
    /* Le due preferenze cambiano a runtime: un mouse collegato a un tablet, o
       l'interruttore di sistema del movimento. Se cambiano, il mirino compare
       o sparisce da sé. */
    fine.addEventListener('change', decidi)
    fermo.addEventListener('change', decidi)
    return () => {
      fine.removeEventListener('change', decidi)
      fermo.removeEventListener('change', decidi)
    }
  }, [])

  /* Seconda passata: il moto. Nessuno stato di React qui dentro — la posizione
     del puntatore è un valore continuo, e passarla da `useState` vorrebbe dire
     un render per ogni pixel. Si scrive sul nodo, e la scrittura si accorpa in
     un `requestAnimationFrame`. */
  useEffect(() => {
    if (!attivo) return
    const nodo = mirino.current
    if (!nodo) return

    const radice = document.documentElement

    let x = 0
    let y = 0
    let stato = 'carta'
    let frame = 0

    /* **Tutto quello che tocca il DOM del mirino sta qui dentro**, e non in
       `muovi()`. Un `pointermove` arriva alla frequenza del dispositivo — su un
       trackpad Apple sono ~120 eventi al secondo, e con `pointerrawupdate` di
       più — mentre i fotogrammi sono 60: scrivere `dataset.stato` e
       `dataset.visibile` nel gestore voleva dire **due invalidazioni di stile
       per evento** invece di due per fotogramma, cioè il doppio del lavoro per
       zero pixel di differenza. Il calcolo dello stato resta in `muovi()`,
       dov'è: solo lì c'è il bersaglio dell'evento. */
    const disegna = () => {
      frame = 0
      nodo.style.transform = `translate3d(${x}px, ${y}px, 0)`
      /* Si scrive solo se il valore cambia davvero: fra due fotogrammi lo stato
         è lo stesso quasi sempre, e un attributo riscritto identico è
         comunque una mutazione. */
      if (nodo.dataset.stato !== stato) nodo.dataset.stato = stato
      if (nodo.dataset.visibile === undefined) nodo.dataset.visibile = ''
      if (lettura.current) {
        /* 1 px CSS = 25,4 / 96 mm. La virgola è quella italiana, come il resto
           del sito, e la larghezza non balla perché Montserrat ha `tnum`. */
        const mm = (v: number) => (v * 0.264583).toFixed(1).replace('.', ',')
        lettura.current.textContent = `X ${mm(x)}  Y ${mm(y)}  mm`
      }
    }

    const muovi = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY

      /* Lo stato lo decide **cosa c'è sotto**, non un elenco di rotte: un
         `closest()` sul bersaglio dell'evento. `label` c'è perché in questo
         form è cliccabile quanto il suo controllo. */
      const t = e.target as Element | null
      const campo = t?.closest?.('input, textarea, select, [contenteditable="true"]')
      const tocca = t?.closest?.('a, button, summary, label, [role="button"]')
      stato = campo ? 'campo' : tocca ? 'attivo' : 'carta'
      /* **`cursor: none` si accende qui, al primo movimento, e non al
         montaggio.** Prima l'attributo si metteva appena l'effetto girava,
         mentre il mirino resta a `opacity: 0` finché il puntatore non si muove:
         misurato, chi arriva su questa pagina e scorre **con il trackpad o con
         la rotellina** — due dita su un Mac non spostano il puntatore —
         percorre tutti e 10.945 i pixel della pagina **senza nessun puntatore
         in finestra**, né quello di sistema né il mirino. Non è un lampo prima
         del primo movimento: è uno stato stabile che dura quanto la lettura, ed
         è esattamente il caso che la decisione n. 53 esiste per escludere. Il
         commento in testa a questo file lo diceva già — «l'attributo lo mette
         il JavaScript **dopo** che il mirino esiste» — ma lo metteva dopo che
         esisteva il **nodo**, che non è la stessa cosa.

         Questo **non** va rimandato al `requestAnimationFrame`: è la riga che
         garantisce che ci sia un puntatore in finestra, e un fotogramma di
         ritardo su quella garanzia è esattamente il buco che la decisione
         n. 53 esiste per escludere. */
      radice.dataset.cursore = 'cad'

      if (!frame) frame = requestAnimationFrame(disegna)
    }

    /* Il mirino non compare finché il puntatore non si muove: chi arriva da
       tastiera non si vede apparire un oggetto che non ha chiesto. E sparisce
       quando il puntatore esce dalla finestra, altrimenti resta appiccicato
       all'ultimo pixel toccato. */
    const esci = () => {
      /* Il fotogramma in coda si annulla, altrimenti rimetterebbe `visibile`
         mezzo istante dopo averlo tolto: adesso che è `disegna()` a scriverlo,
         uscire dalla finestra e ridisegnare sono due cose in corsa. */
      if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
      delete nodo.dataset.visibile
      /* E con lui se ne va `cursor: none`: se il puntatore esce dalla finestra
         o la finestra perde il fuoco, il mirino non si vede più, quindi il
         puntatore di sistema deve tornare. Al rientro lo rimette `muovi()`. */
      delete radice.dataset.cursore
    }

    window.addEventListener('pointermove', muovi, { passive: true })
    document.addEventListener('pointerleave', esci)
    window.addEventListener('blur', esci)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', muovi)
      document.removeEventListener('pointerleave', esci)
      window.removeEventListener('blur', esci)
      delete radice.dataset.cursore
    }
  }, [attivo])

  if (!attivo) return null

  return (
    <div ref={mirino} className="cursore-cad" data-stato="carta" aria-hidden data-decorativo>
      {/* Quattro tratti e un vuoto di 7 px al centro: nella reference le linee
          non si incrociano sul punto, lo lasciano libero. È il mirino di un
          programma di disegno, non una croce. */}
      <span className="cursore-riga" data-verso="sx" />
      <span className="cursore-riga" data-verso="dx" />
      <span className="cursore-riga" data-verso="su" />
      <span className="cursore-riga" data-verso="giu" />
      <span className="cursore-mira" />
      <span className="cursore-anello" />
      <span className="cursore-lettura" ref={lettura} />
    </div>
  )
}
