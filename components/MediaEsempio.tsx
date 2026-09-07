'use client'

import Image from 'next/image'
import { useEffect, useRef, useSyncExternalStore } from 'react'
import type { Esempio } from '@/lib/media-demo'

/**
 * L'esempio dentro un campo segnaposto: un video se c'è un file da muovere,
 * un'immagine altrimenti.
 *
 * ## Perché è un componente client per due righe di logica
 *
 * Perché `prefers-reduced-motion` qui non è una questione di stile. Un
 * `<video autoplay>` **scarica e parte comunque**: `preload="none"` viene
 * ignorato quando c'è `autoplay`, e nessuna regola CSS può impedire a un
 * elemento che esiste di caricarsi. Nasconderlo con `display: none` toglie il
 * fotogramma dallo schermo e lascia i 2,1 MB sul filo.
 *
 * Chi chiede meno movimento riceve quindi **l'elemento diverso**, non lo stesso
 * elemento spento: un `next/image` col poster, che è la stessa inquadratura e
 * pesa 36 KB. È l'unico modo di rispettare `CLAUDE.md` § Regole, 4 sul serio.
 *
 * `useSyncExternalStore` invece di `useEffect`: il server rende sempre
 * l'immagine — che è la scelta prudente, e regge anche senza JavaScript — e il
 * client passa al video solo se il sistema non chiede `reduce`. Nessun salto di
 * impaginazione, perché immagine e video hanno lo stesso riquadro.
 */
const QUERY = '(prefers-reduced-motion: reduce)'

function sottoscrivi(notifica: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', notifica)
  return () => mq.removeEventListener('change', notifica)
}
const menoMovimentoClient = () => window.matchMedia(QUERY).matches
/* Sul server non si sa, e nel dubbio si serve l'immagine. */
const menoMovimentoServer = () => true

export function MediaEsempio({ dato, priorita }: { dato: Esempio; priorita: boolean }) {
  const menoMovimento = useSyncExternalStore(sottoscrivi, menoMovimentoClient, menoMovimentoServer)
  const video = useRef<HTMLVideoElement>(null)

  /* Il video parte **dopo**, e non con l'attributo `autoplay`.
     Con `autoplay` il browser ignora `preload="none"` e mette i 2,1 MB sul
     percorso di caricamento della pagina: misurato, il peso della home passava
     da 265 KB a 2,4 MB, cioè oltre il limite di § Performance budget. Qui
     invece il caricamento critico è il **poster** — 36 KB, ed è lui a reggere
     l'LCP — e il file arriva quando il browser non ha altro da fare.
     `requestIdleCallback` non c'è su Safari: il `setTimeout` è il ripiego. */
  useEffect(() => {
    const v = video.current
    if (!v) return
    const parti = () => {
      v.preload = 'auto'
      /* `play()` restituisce una promessa che può essere rifiutata (una
         politica del browser, una scheda in secondo piano): non è un errore da
         propagare, il poster resta ed è la stessa inquadratura. */
      void v.play().catch(() => {})
    }
    /* I tipi del DOM dichiarano `requestIdleCallback` come sempre presente;
       su Safari non c'è. Il controllo è a runtime, e il `typeof` è il modo di
       farlo senza che TypeScript lo consideri superfluo. */
    const conIdle = typeof window.requestIdleCallback === 'function'
    const id = conIdle
      ? window.requestIdleCallback(parti, { timeout: 3000 })
      : window.setTimeout(parti, 1200)
    return () => {
      if (conIdle) window.cancelIdleCallback(id)
      else window.clearTimeout(id)
    }
  }, [menoMovimento])

  if (dato.video && !menoMovimento) {
    return (
      <video
        ref={video}
        className="placeholder-esempio"
        poster={dato.src}
        width={dato.larghezza}
        height={dato.altezza}
        muted
        loop
        playsInline
        preload="none"
        /* Non è un contenuto da guardare, è una superficie: niente controlli,
           fuori dall'ordine di tabulazione e fuori dall'albero accessibile —
           il nome del campo lo dà già il segnaposto che lo contiene. */
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={dato.video} type="video/mp4" />
      </video>
    )
  }

  return (
    <Image
      className="placeholder-esempio"
      src={dato.src}
      alt=""
      width={dato.larghezza}
      height={dato.altezza}
      sizes="(max-width: 56rem) 100vw, 50vw"
      priority={priorita}
      aria-hidden="true"
    />
  )
}
