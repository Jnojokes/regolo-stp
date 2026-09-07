Leggi `CLAUDE.md`, `STATO.md`, `DECISIONI.md`. Segui le regole della skill `sito-sviluppo` e
`web-references/blocchi/stack-e-performance.md` § Animazioni.

**Fase 5 — movimento, sull'opzione scelta.** Prima di tutto leggi `DECISIONI.md` n. 1: se è
ancora aperta, **fermati e chiedi**. Se è decisa: la route non scelta si elimina (o si porta il
mix su `/`), e `/opzione-b` sparisce.

- Lenis, transizioni di pagina, rivelazioni allo scroll misurate.
- Il blocco speciale: se **A**, l'esploso strutturale in SVG a livelli (fondazioni → struttura →
  involucro → impianti → finiture) che si separano allo scroll con ScrollTrigger, con la legenda
  che evidenzia il livello; su mobile sequenza di step con i livelli che si accendono uno alla
  volta. Se **B**, il percorso della hero con transizione fra i cinque casi e il prima/dopo già
  fatto; il processo come timeline con avanzamento sticky. Se il wow n. 2 (decisione n. 6) è
  dentro: la rilluminazione WebGL di una foto di progetto, con fallback immagine.
- Massimo due blocchi wow, mai di fila. Tutto disattivato da `prefers-reduced-motion: reduce`;
  animare solo `transform` e `opacity`; sotto i 768 px gli effetti scroll-driven pesanti si
  sostituiscono con un fade. Nessun testo esiste solo dentro un'animazione.
- Usa Context7 per GSAP/ScrollTrigger/Lenis.

Verifica il budget dopo ogni blocco animato con Chrome DevTools MCP. Aggiorna `STATO.md`
(prossima: `/fase-6-seo-geo`). Poi fermati e fammi vedere il blocco speciale su telefono.

