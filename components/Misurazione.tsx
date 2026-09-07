'use client'

import { useEffect } from 'react'
import { traccia } from '@/lib/analytics'

/**
 * I due eventi che non partono da un form: **click telefono** e **click
 * WhatsApp** (`CLAUDE.md` § Analytics — quattro eventi, non quaranta).
 *
 * `lib/analytics.ts` li dichiarava da sempre nel tipo `Evento`, ma nessuno li
 * chiamava: `traccia(` compariva solo due volte, entrambe in `BriefForm`. Due
 * eventi su quattro erano un tipo TypeScript e basta — e `STATO.md` dava tutti
 * e quattro per cablati.
 *
 * ## Perché un ascoltatore delegato e non un componente per ogni link
 *
 * Perché i `tel:` in pagina sono cinque, in cinque componenti diversi (hero A,
 * piede, barra mobile, `/contatti`, schede), e tutti e cinque sono componenti
 * **server**. Avvolgerli avrebbe voluto dire idratare cinque isole per due
 * righe di misurazione, e il conto sarebbe cresciuto a ogni telefono nuovo.
 * Un ascoltatore solo sul documento, in fase di cattura, li prende tutti —
 * compresi quelli che non esistono ancora — e costa un componente che rende
 * `null`.
 *
 * L'evento parte **prima** che la navigazione avvenga e non la ostacola in
 * nessun modo: nessun `preventDefault`, nessuna attesa. Se `traccia` fallisce
 * (e non può: ha il suo `try`), la telefonata parte lo stesso. È la regola di
 * `lib/analytics.ts` — la misurazione non rompe mai una conversione.
 *
 * Nessun cookie e nessun dato personale: si conta che un click è avvenuto, non
 * chi l'ha fatto. È la ragione per cui questo sito non ha un banner
 * (decisione n. 10, `CLAUDE.md` § Analytics).
 */
export function Misurazione() {
  useEffect(() => {
    function alClick(e: MouseEvent) {
      const bersaglio = e.target
      if (!(bersaglio instanceof Element)) return
      const link = bersaglio.closest('a[href]')
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      if (href.startsWith('tel:')) traccia('click_telefono')
      else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) traccia('click_whatsapp')
    }
    /* In cattura: un `stopPropagation` su un link non deve poter far sparire
       la misurazione. */
    document.addEventListener('click', alClick, true)
    return () => document.removeEventListener('click', alClick, true)
  }, [])

  return null
}
