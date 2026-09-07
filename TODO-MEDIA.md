# TODO MEDIA — REGOLO STP

> Ogni immagine o video placeholder da sostituire prima del go-live, e ogni file generato con IA.
> Regola: nei blocchi di prova (progetti, persone, prima/dopo, cantieri) solo foto dello studio.
> Aggiornato alla **fase 3 bis** (parte 2/2).
>
> Da adesso ogni segnaposto immagine **porta in pagina la propria specifica**
> (`2400 × 1650 px · AVIF · ≤ 250 KB`): la riga di questa tabella e il campo in pagina dicono
> la stessa cosa, e quella in pagina è quella che il cliente vede in call.

## Il livello dimostrativo — otto foto e un video di esempio (fase 3 bis, 2/2)

**Questi file non sono contenuti: sono un'impalcatura, e hanno un interruttore.**
`NEXT_PUBLIC_MEDIA_DEMO=0` li spegne tutti e ogni campo torna il rettangolo dichiarato che era.
Alla fase 5 si cancellano `lib/media-demo.ts`, `components/MediaEsempio.tsx` e `public/demo/`, e
non resta traccia. La decisione, con le tre condizioni che la circoscrivono, è la **n. 27**.

Perché esistono: un prototipo di rettangoli vuoti si guarda male in call, e la discussione
finisce sui buchi invece che sull'impaginazione. Perché non annullano la regola n. 2: **i campi
restano segnaposto mentre si vedono** — squadrette d'angolo, targhetta con la specifica del
formato richiesto, riga di fonte e licenza in pagina, e la barra della proposta che cambia frase
da sé. E **nessun ritratto**: i quattro campi delle persone restano vuoti, perché una faccia
presa altrove sotto il nome di un ingegnere non è la stessa cosa di una facciata sotto la
dicitura «esempio».

Tutte in **bianco e nero**, e non è un filtro: il sito non ha colori tranne il timbro dei
segnaposto. Otto sorgenti a colori, con otto bilanciamenti del bianco diversi, avrebbero portato
in pagina l'unica cosa che il progetto ha deciso di non avere. Le fotografie sono convertite in
grigio alla sorgente; il video resta a colori sul disco e si desatura in CSS, così la decisione
si può ribaltare senza ricodificarlo.

| File | Dove | Soggetto | Autore | Fonte | Licenza | Peso |
|---|---|---|---|---|---|---|
| `cantiere-loop.mp4` + poster | hero A | scheletro in costruzione e gru, in controluce | Mixkit | [Mixkit](https://mixkit.co/free-stock-video/sunset-behind-a-building-under-construction-3971/) | Mixkit Free | **2,09 MB** + 36 KB |
| `opera-01.jpg` | progetti 01 | edificio a piani sfalsati dal basso | Chuttersnap | [StockSnap](https://stocksnap.io/photo/building-structure-4KWA8Y07O4) | CC0 1.0 | 41 KB |
| `opera-02.jpg` | progetti 02 | facciata residenziale con logge | The Building Envelope | [StockSnap](https://stocksnap.io/photo/abstract-modern-I6XJM4PDE1) | CC0 1.0 | 85 KB |
| `opera-03.jpg` | progetti 04 | spigolo bianco con finestre irregolari | The Building Envelope | [StockSnap](https://stocksnap.io/photo/building-exterior-AJU8JTAEJQ) | CC0 1.0 | 47 KB |
| `cantiere-01.jpg` | progetti 03 | edificio con ponteggi e due gru | 贝莉儿 NG | [StockSnap](https://stocksnap.io/photo/building-construction-QDDPZH3YSO) | CC0 1.0 | 92 KB |
| `interno-01.jpg` | progetti 05 | interno a pianta libera con pilastri | Marc Mueller | [StockSnap](https://stocksnap.io/photo/architecture-building-LJRZ7AR6G4) | CC0 1.0 | 54 KB |
| `dettaglio-01.jpg` | progetti 06 | bordo di copertura grecata contro il cielo | Scott Webb | [StockSnap](https://stocksnap.io/photo/blue-sky-F16UC7XO6F) | CC0 1.0 | 38 KB |
| `prima-01.jpg` | prima/dopo, metà «stato attuale» | stanza al grezzo, infissi smontati | Skitter Photo | [StockSnap](https://stocksnap.io/photo/construction-renovation-XEOT0ES7GA) | CC0 1.0 | 97 KB |
| `dopo-01.jpg` | prima/dopo, metà «progetto» | stanza finita, intonaco e luce | David Hellmann | [StockSnap](https://stocksnap.io/photo/house-architecture-Y3U84QOQNW) | CC0 1.0 | 52 KB |

CC0 1.0 è pubblico dominio: uso commerciale libero, **nessuna attribuzione dovuta**. L'autore è
scritto lo stesso, in pagina e qui, perché è giusto e perché serve a chi le sostituirà.
Mixkit Free è uso commerciale libero senza attribuzione. Le fonti sono state scelte apposta
**fuori** dai siti di reference del progetto: `regolo-stp.vercel.app` è già pubblico, e le
fotografie di progetto di studi concorrenti non ci vanno nemmeno per finta.

Le sorgenti StockSnap sono a **960 px** sul lato lungo — è tutto quello che il CDN serve — mentre
la specifica in pagina continua a chiedere 2400. Lo scarto è voluto e visibile: è la differenza
fra un esempio e una fotografia commissionata.

Il video: 8 s, 640 × 360, 2,09 MB — dentro l'obiettivo di 2,5 MB di § Performance budget.
`preload="none"` e il poster da 36 KB reggono l'LCP da soli. Con `prefers-reduced-motion: reduce`
**non viene reso affatto**: al suo posto arriva il poster come immagine, perché un `<video
autoplay>` scarica e parte comunque e nasconderlo in CSS avrebbe lasciato 2 MB sul filo per chi
ha chiesto meno movimento (`components/MediaEsempio.tsx`).

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
| Rettangoli di prova | `components/Placeholder.tsx` — **fase 3 bis**: via le due texture (tratteggio in A, carta millimetrata in B), dentro **quattro squadrette d'angolo** in `--color-line` (4,61:1) e la **scheda di specifica** con il formato richiesto. Un elemento e quattro gradienti | 0 | le due texture erano decorative e identiche su ogni blocco: dicevano «disegno» e non dicevano niente. E il piano del segnaposto sta a 1,18:1 dalla carta, quindi non poteva portare da solo il significato «qui va una fotografia»: ora lo portano le squadrette |

Entrambi si rigenerano con `node scripts/genera-territorio.mjs` e ricalcolando `lib/esploso.ts`
(la geometria è codice, non un file: cambia una costante e cambia il disegno).

## Niente materiale generato nei blocchi di prova

Regola della skill `sito-media` e di `CLAUDE.md` § Regole, 2: in hero, progetti, ritratti e
prima/dopo **non entra mai** materiale generato con IA. Alla fase 3 non è stato generato niente:
i due SVG sono geometria calcolata da dati pubblici, non immagini prodotte da un modello.

## Fase 3 bis — due segnaposto in meno, e nessuno stock

**Zero immagini generate e zero stock in tutto il sito, e non è un ripiego.** Il prompt della
fase prevedeva sfondi materici generati; FT ha poi chiesto di prendere immagini «da internet»
per non lasciare rettangoli vuoti. La risposta è la stessa in entrambi i casi, e la ragione è
scritta in due posti indipendenti:

- `TODO-MEDIA.md` § «Niente materiale generato nei blocchi di prova» nomina **la hero per
  prima**, e `CLAUDE.md` § Regole 2 vieta lo stock nei blocchi di prova;
- l'antipattern n. 1 della scheda nicchia: «render di repertorio o foto stock di cantieri — il
  visitatore locale riconosce che non è roba loro; **brucia esattamente la fiducia che il sito
  doveva costruire**». Il pubblico di REGOLO sono progettisti e imprese.

La skill `refero-design` arriva alla stessa conclusione dall'altra parte (§ 9): un segnaposto
va bene **quando evita una finta immagine**, purché abbia rapporto fisso, art direction e
didascalia. I nostri ce li hanno tutti e tre, più la specifica del formato.

### I due che sono spariti — perché non aspettavano niente dal cliente

| Cosa | Come | Perché così |
|---|---|---|
| **Immagine Open Graph** 1200×630 | `app/(a)/opengraph-image.tsx`: **la pagina stessa in miniatura** — stessi caratteri, stessa quota dei cinque ruoli, stesso bianco e nero. Prerenderizzata a build time, 56 KB | Zero crediti, zero licenze, nessuna tell da riconoscere, e **non può divergere dal sito**: se cambia il payoff o l'elenco dei ruoli, cambia l'anteprima. `next/og` non legge i woff2 variabili: le due istanze statiche le produce `scripts/genera-font.sh` in `assets/og/`, fuori da `public/` |
| **Mappa della sede** nel footer | `components/MappaSede.tsx`: un **ritaglio dello stesso SVG del territorio**, con la croce di quota sulla sede | Zero richieste, zero byte in più (la geometria è già nel bundle), zero terzi, nessun iframe. La decisione del 07/09 sui tile server vale anche nel footer, che era rimasto un rettangolo |

### Quello che resta un campo dichiarato, e resta giusto così

Progetti, persone, prima/dopo e la fotografia della hero. Sono i blocchi di **prova**: è lì
che una foto che non è loro costa la vendita. Da questa fase ogni campo porta in pagina la
propria **specifica** (`2400 × 1650 px · AVIF · ≤ 250 KB`) e quattro squadrette di registro:
legge «modulo in attesa», non «buco», e in call è la lista della spesa da mandare allo studio.

Il **prima/dopo** è il caso in cui questo ha cambiato il blocco: prima erano due segnaposto
grigi sovrapposti a 1,17:1 — un cursore che non rivelava niente. Ora le due metà sono
i **due piani** del tema, il taglio sta a **21:1**, e il blocco dimostra **lo strumento** finché le
due fotografie dallo stesso punto non arrivano.

### Se un giorno serve generare

I crediti Higgsfield sono **1,79** (`gpt_image_2`: 0,5 a 1k/low, 2 a 2k/medium, 6,5 a
2k/high). Non servono più per l'Open Graph. Se si decide di generare uno sfondo materico —
che prova non è — si segue `sito-media`, si converte in WebP, si segna qui con «generato: sì»
e si dichiara `additionalProperty` IPTC `digitalSourceType` sull'`ImageObject`.

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
