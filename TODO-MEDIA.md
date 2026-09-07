# TODO MEDIA — REGOLO STP

> Ogni immagine o video placeholder da sostituire prima del go-live, e ogni file generato con IA.
> Regola: nei blocchi di prova (progetti, persone, prima/dopo, cantieri) solo foto dello studio.
> Aggiornato alla fase 3.

## Da sostituire prima del go-live

| Blocco | Pagina | Rapporto | Cosa serve (minimo accettabile) | Generato con IA | Alt |
|---|---|---|---|---|---|
| ▲ Hero | home A | pieno, `min(78vh, 760px)` | **una** foto orizzontale di un'opera realizzata, lato lungo ≥ 2400 px, non un render. È l'LCP della pagina: va servita con `next/image priority` e pesare < 250 KB | no | da scrivere sul soggetto reale |
| ▲ Progetti 01-03 | home A | 4 / 3 | tre foto, una per progetto, anche di cantiere e anche da telefono, purché dello studio | no | descrive cosa si vede, non «immagine1» |
| ▲ Progetti 01-02 | home B | 16 / 9 | le stesse due dei primi due progetti, ritagliate | no | come sopra |
| ▲ Ritratti ×4 | home A e B | 3 / 4 | quattro ritratti, stessa luce e stessa distanza. Quante persone davvero lo dice lo studio | no | nome e ruolo |
| Prima / dopo ×1 (poi 2-3) | home B | 16 / 10 | **due foto dallo stesso punto di ripresa**: è il vincolo che fa funzionare il blocco. Senza, il blocco non va online | no | «prima» e «dopo» dello stesso soggetto |
| Mappa statica della sede — **striscia** | footer, tutte | **21 / 6** | tile statico o SVG. **Nessun cookie di terzi**: niente iframe di Google Maps. È larga e bassa per non essere la stessa immagine della mappa di `/contatti`, che è 4/3 | da decidere | indirizzo in chiaro |
| Immagine Open Graph 1200×630 | tutte | — | fondo + tipografia in codice, oppure una foto dello studio | sì se generata → dichiarare | — |
| Favicon e icone | tutte | — | dal logo, quando arriva (decisione n. 5) | no | — |

## Fase 4 — le pagine interne

| Blocco | Pagina | Rapporto | Cosa serve | Generato con IA | Alt |
|---|---|---|---|---|---|
| ▲ Copertina di ogni progetto | /progetti/* | **16 / 9**, a piena larghezza | una foto per scheda, orizzontale. È l'LCP della scheda (`priority`), quindi < 250 KB. Il rapporto è fissato dalla pagina: un 4/3 verrebbe ritagliato senza che nessuno l'abbia deciso. L'`alt` è **obbligatorio** nello schema e non può essere vuoto: la build fallisce | no | lo scrive lo studio, dice cosa si vede |
| ▲ Galleria di ogni progetto | /progetti/* | libero | tre o più foto per scheda, ognuna con il suo `alt` | no | come sopra |
| Prima / dopo per scheda | /progetti/* | 16 / 10 | due foto dallo stesso punto, campo opzionale nello schema | no | «prima» e «dopo» dello stesso soggetto |
| Mappa statica della sede | /contatti | 4 / 3 | tile statico o SVG, **nessun iframe** (decisione scritta) | da decidere | indirizzo in chiaro |

**Pittogrammi dei sei servizi: non si fanno** (DECISIONI.md, 07/09). La direzione visiva è
tipografica e i titoli dei servizi sono già degli esiti: sei icone aggiungerebbero rumore.
Se il cliente li chiede si disegnano in SVG, non si generano.

## Fatti alla fase 3 — costruiti in codice, non immagini

| Blocco | Come | Peso | Perché non un'immagine |
|---|---|---|---|
| Esploso strutturale (home A) | SVG generato lato server da `lib/esploso.ts` (isometria calcolata, 47 poligoni + 3 polilinee) | ~6 KB nell'HTML | un PNG non si può animare per livelli alla fase 5, non scala e non si ritematizza. E i colori delle cinque facce sono token verificati AA |
| Mappa del territorio (home A) | SVG generato da `lib/territorio.ts` — perimetro **vero** delle tre province (confini ISTAT via openpolis, semplificati a ~100 m) + 128 punti comune | ~4 KB nell'HTML | una mappa a tile è un terzo che vede l'IP di chi visita: informativa più lunga e consent gate. Questo non chiama nessuno |
| Rettangoli di prova | `components/Placeholder.tsx` — tratteggio da disegno tecnico nel tema A, carta millimetrata nel tema B | 0 | — |

Entrambi si rigenerano con `node scripts/genera-territorio.mjs` e ricalcolando `lib/esploso.ts`
(la geometria è codice, non un file: cambia una costante e cambia il disegno).

## Niente materiale generato nei blocchi di prova

Regola della skill `sito-media` e di `CLAUDE.md` § Regole, 2: in hero, progetti, ritratti e
prima/dopo **non entra mai** materiale generato con IA. Alla fase 3 non è stato generato niente:
i due SVG sono geometria calcolata da dati pubblici, non immagini prodotte da un modello.

Se servirà uno sfondo o una texture — che prova non è — si genera con Higgsfield seguendo
`sito-media`, si converte in WebP e si segna qui con «generato: sì».

## Stato dei segnaposto in pagina (fase 3)

Le due home servono **9 rettangoli ciascuna** (6 etichette distinte, perché i quattro ritratti
condividono la stessa): in A hero + 3 progetti + 4 ritratti + mappa della sede; in B 2 progetti +
prima + dopo + 4 ritratti + mappa della sede.

I segnaposto di testo sono 33 in A e 29 in B (19 e 20 testi distinti), tutti visibili a occhio
nudo: filetto pieno a sinistra nel colore dell'accento, tinta di fondo e sottolineatura
punteggiata — tre canali, perché la sola tinta sta a 1,1:1 dalla carta della pagina e non si
vedeva affatto.

Il collaudo della fase 8 cerca `data-placeholder="da-cliente"` e la stringa `[[DA CLIENTE`: oggi
le trova, ed è giusto così — nessuna delle due pagine è pubblicabile.

Il blocco Numeri è l'unica eccezione dichiarata: nella cella c'è un `—` invece del segnaposto,
perché un `[[DA CLIENTE: mq progettati]]` a 44 px riempie la cella su tre righe e fa sembrare la
pagina rotta. Il segnaposto dichiarato del blocco è uno, nella nota (vedi `lib/numeri.ts`).
