# OPZIONI — le tre tabelle di composizione

> Scritte alla **ripassata di design, passo 1** (08/09/2026). È il gate A11 della lista unica, e
> fino a oggi mancava: le tre proposte esistevano come codice senza una tabella che dicesse, voce
> per voce, **da quale reference misurata** viene ogni scelta.
>
> La regola che governa queste tre tabelle è una sola: **le opzioni devono differire per come
> FUNZIONANO, non per come sono colorate** (protocollo, regola 14). Tre pelli sullo stesso gesto
> sono una proposta sola. Il criterio di accettazione è misurato — classi condivise ≤ 50 % e
> ≥ 3 assi diversi su 5 per ogni coppia — e si verifica con `scripts/opzioni-diff.mjs` prima di
> dire «pronte».
>
> Le prove stanno in `kit/reference/`, la selezione per proposta in `SCHEDA.md` § 0. Il rapporto
> display 1440/390 di ogni riga «Tipografia» viene da `misure.json`, non da una stima.

## Il rapporto display, misurato sulle reference

Serve come metro per la riga «Tipografia» di ogni tabella, e dice una cosa che non ci si aspetta:
**nessuna delle reference comprime quanto A**.

| Reference | display 1440 | display 390 | rapporto |
|---|---|---|---|
| **AIR** | 71 px | 42 px | **1,69×** |
| **LPAS** | 75 px | 46 px | **1,63×** |
| **Halston** | 42,6 px (l'h1; la copertina 57,6) | 28 px | **1,52×** |
| **ecoLINEAR** | 32 px (l'h1 vero; il logotipo è una funzione della finestra) | 32 px | **1,00×** |
| A oggi | 132 px | 56 px | **2,36×** |

A sta fuori scala rispetto a tutte e quattro, ed è **una scelta e non una svista**: l'asse di
larghezza di Archivo (`wdth 62-100`) le permette di comprimere invece di rimpicciolire, che è il
gesto del disegnatore quando fa stare una scritta dentro una quota. Resta dichiarato qui perché
la prossima passata non lo scambi per un errore.

---

## A «lo studio» — `/`

**Il problema che questa passata risolve.** A non aveva una reference sua: i suoi blocchi
citavano il fondo comune e i suoi token erano nati dal brief, che era voce per voce il cluster
n. 1. E aveva tre difetti misurati al passo 0: **quattro sezioni di fila con lo stesso guscio**,
**nessun momento orchestrato**, e una **CTA che esce dalla pagina**.

| Voce | Cosa fa questa opzione | Da quale reference (slug misurato) |
|---|---|---|
| **Gesto della hero** | **un oggetto tridimensionale bianco su bianco al posto della fotografia**, e il payoff che gli sta **dentro** invece che accanto: le due metà spinte ai due margini, l'oggetto che passa fra loro e le copre. Nessuna foto sopra la piega | `air` — «il disegno occupa la pagina e il tipo gli sta dentro», `air-1440-meta.png` |
| **Perché proprio questo** | non è uno stile, è la risposta a un fatto: **lo studio non ha una fotografia**, ne ha 62 di segnaposto (`CONTENUTI-DA-CLIENTE.md`). I volumi dell'edificio invece ce li ha già, in `lib/esploso.ts`, e sono un dato del repo — non un contenuto inventato | `air` + regola 1 di casa |
| **Impaginazione** | 12 colonne, gutter e margine **24 px**, contenuto max 1440; il contenuto su un asse, i numeri all'estremo opposto, il **vuoto disuguale** in mezzo; tre passi verticali 48 · 96 · 200 dichiarati solo in alto. E la correzione del passo 0: **quattro sezioni di fila non possono avere lo stesso guscio** — `#smistamento`, `#progetti`, `#servizi`, `#processo` oggi sono lo stesso `.sezione > .wrap > .testa-sezione` | `storey` (gutter 20, vuoto disuguale) · `as-associates` (l'indice come scheda tecnica) |
| **Tipografia** | **Archivo sola** (`wght` 400-600 + `wdth` 62-100). Display 132 → 56, rapporto **2,36×** — fuori scala rispetto alle reference, e dichiarato sopra. Interlinea 0,86 sulla hero composta a mano, 0,92 sugli h1 che vanno a capo. Tracciature tutte negative, **anche sulle maiuscole** | `air` (una famiglia sola, −0,04 em sull'h1 maiuscolo, interlinea 0,99) · `storey` (interlinea 1,0, mono a −10 %) |
| **Fotografia** | **sopra la piega non c'è.** Sotto: a piena larghezza, mai in cornice, e quando c'è **sborda da un lato solo** | `air` (nessuna) · `storey` (sborda da un lato) |
| **Movimento — UN momento orchestrato** | **l'esploso si separa allo scorrimento.** Cinque livelli, `translateY` guidato da una `view-timeline`, zero JavaScript, spento con `prefers-reduced-motion`, e lo stato di riposo è quello **già separato** che c'è oggi — quindi senza JS non si perde niente. È scritto in `CLAUDE.md` § Homepage 7 da sempre («che si separano allo scroll») e non è mai stato costruito: nel codice c'è ancora il commento «alla fase 5 ScrollTrigger animerà» | `eladio-dieste` (la linea di quota come struttura, l'asse verticale delle fasi) |
| **Chrome** | lockup + menu-frase con le virgole, barra sticky, **zero bottoni in testata sopra i 56 rem**: sopra la piega la CTA è una sola | `kononenko` («in tutto il sito non esiste un bottone») |
| **Conversione** | CTA «Raccontaci il progetto» nel primo viewport **a 390 e a 1440**, e **puntata a `#brief` della stessa pagina** — oggi va a `/contatti#brief`, cioè esce dalla home che il brief ce l'ha in fondo. Più: **lo smistamento porta i conteggi** (`5 ruoli`, `6 servizi`, `128 comuni`), che è la prova di volume senza scrivere «siamo bravi». E la **barra CTA mobile anche su A** | `lpas` (il conteggio sulla scheda: `5 / 5`, e i contatori per categoria 27 · 13 · 12 · 6 · 14) |
| **Impianto e ordine** | hero-oggetto → smistamento **con i conteggi** → progetti → servizi → come lavoriamo → **esploso (wow, allo scorrimento)** → persone → territorio → brief → footer | l'ordine di `CLAUDE.md` § Homepage, che descrive A |
| **I due wow, e non sono di fila** | 1) la **hero-oggetto** (blocco 1) · 2) l'**esploso che si separa** (blocco 6) | — |
| **Cluster della § 1 che NON uso** | **n. 1** — carta calda + serif display + terracotta. Al suo posto: **carta bianca pura** `#FFFFFF`, **nero pieno** `#000000` (tre reference su quattro misurano `rgb(0,0,0)`), un grottesco con **asse di larghezza**, e **zero accenti** tranne il timbro blu sui soli segnaposto, che si consuma quando i contenuti arrivano | — |

### Prima passata — il piano

**Colore**, sei valori con un nome ciascuno:

```
--paper   #FFFFFF   la carta                       --line    #757575   il filetto, 4,61:1
--ink     #000000   l'inchiostro, 21,00:1          --ph      #ECECE9   il campo che aspetta un media
--muted   #5E5E5E   la seconda voce, 6,48:1        --timbro  #123C7A   il tampone, solo sui segnaposto
```

**Tipografia**: una famiglia, **Archivo**, e due assi. Il peso porta la gerarchia (400 corpo,
500 titoli, 600 display), la **larghezza** porta il mobile: a 390 il display si comprime a
`wdth 75` invece di rimpicciolire. Nessuna monospace: le cifre si incolonnano con
`font-variant-numeric: tabular-nums`.

**Impaginazione**, in una frase: *un foglio stampato in cui il contenuto sta a sinistra su un
asse, l'apparato numerico al bordo destro, e in mezzo un vuoto che non è mai lo stesso.*

```
1440                                              390
┌────────────────────────────────────────────┐    ┌──────────────┐
│ REGOLO STP    progetti, servizi, studio…   │    │ REGOLO  menu │
├────────────────────────────────────────────┤    ├──────────────┤
│ Progettiamo          ╱▓▓▓╲                 │    │  ╱▓▓▓╲       │
│ e dirigiamo.       ╱▓▓▓▓▓▓▓╲               │    │ Progettiamo  │
│ Dal disegno      ▓▓▓╲   il volume, bianco  │    │ e dirigiamo. │
│ al cantiere.       ╲▓▓▓╱  su bianco        │    │ Dal disegno  │
│ ├──────────────────────────────┤ 5 ruoli   │    │ al cantiere. │
│ ( Raccontaci il progetto )  0734 510329    │    │ ├───┤ 5 ruoli│
└────────────────────────────────────────────┘    │ ( Raccontaci)│
   il tipo e l'oggetto sullo stesso piano         └──────────────┘
```

**Tre righe su cosa rende unica questa pagina.** Primo: è l'unica delle tre che apre **senza
un'immagine fotografica** e senza un colore, e non per povertà — perché quello che ha da mostrare
è una geometria. Secondo: l'unico colore satura del progetto sta in un posto solo, sui segnaposto,
**e ha una data di scadenza**. Terzo: il contrasto di scala è 7,3×, cioè quello misurato su
Storey, e a 390 non si ottiene rimpicciolendo ma **comprimendo**.

### Seconda passata — che cosa ho cambiato rileggendo il piano contro il brief

1. **La hero aveva una fotografia accanto al testo, e l'ho tolta.** L'avrei fatta uguale per
   qualsiasi studio tecnico: foto di un'opera + payoff grande è il default della categoria (lo
   fanno Heatherwick, Yazdani, LPAS, Studio X, Halston). E soprattutto **era una promessa che il
   repo non può mantenere**: la foto oggi è un rettangolo grigio con una didascalia, quindi la
   prima cosa che il cliente vede in call è un buco. L'oggetto bianco su bianco lo sostituisce con
   una cosa che esiste davvero.
2. **Lo smistamento non portava nessun numero, e adesso ne porta tre.** Cinque righe di indice
   senza dati erano un menu travestito; con `5 ruoli`, `6 servizi`, `128 comuni` — tutti contabili
   dal repo — diventano la prova. Viene da LPAS, ed è il motivo per cui l'ho misurata.
3. **La CTA della hero andava a `/contatti#brief`.** L'avrei lasciata: è una URL che funziona. Ma
   la home **ha il brief in fondo**, quindi il bottone principale mandava l'utente su un'altra
   rotta a rifare la stessa cosa. Ora è un'ancora interna, come in B e in C.
4. **Non avevo previsto un momento orchestrato**, e la ragione che mi ero dato — «A è un foglio
   stampato, non si muove» — è buona per il resto della pagina e **falsa per l'esploso**, che nel
   capitolato si separa allo scorrimento da prima che la fase 3 cominciasse.

---

## B «il foglio» — `/opzione-b`

**Il vincolo non cambia**: B **è** ecoLINEAR, per nome dal committente (n. 46). Quello che cambia
è che la ripassata l'ha rimisurata con lo script, e la misura ha detto due cose che la scheda
scritta a mano non diceva.

| Voce | Cosa fa questa opzione | Da quale reference (slug misurato) |
|---|---|---|
| **Gesto della hero** | **il foglio da disegno**: griglia di costruzione tratteggiata a 13,5 / 17 / 85 / 86,5 %, tre disegni a filo negli angoli, il logotipo `REGOLO STP` calcolato sull'avanzamento vero del carattere — `(100vw − 2m) / 6,37` ≈ 219 px a 1440 — con **un blocco d'ambra dentro una lettera** | `ecolinear` — `1440-hero`, e il logotipo con il blocco d'ambra |
| **Impaginazione** | **nessun guscio e nessun ritmo verticale**: la composizione la tiene la griglia di costruzione, e i blocchi si appoggiano a lei. Misura della prosa **38 rem** = i 609 px misurati | `ecolinear` (misura 609 px, spazio mediano fra sezioni 96 px) |
| **Tipografia** | **Montserrat sola** — misurato: **60 nodi di testo su 60**, e usa tutti e cinque i pesi (300 · 400 · 500 · 600 · 700). Rapporto display **1,00×**: a 390 il corpo non scende, scende la finestra. Tracciature **positive** sulle etichette (+0,9 e +0,6 px), che è l'unica reference del kit a farlo | `ecolinear` (`misure.json`: sei pesi caricati, h1 32 px identico a 1440 e a 390) |
| **Fotografia** | mai in cornice e **senza rapporto d'aspetto dichiarato**: colonne di larghezza fissa, l'altezza la decide il file (240, 364, 407, 522 px nella stessa griglia), raggio 0 su tutte. E la galleria mescola **fotografie, assonometrie a linea e diagrammi** | `ecolinear` — la riga «La fotografia, come è ritagliata», rimisurata l'08/09 |
| **Media** | i campi della galleria non sono più rettangoli grigi: portano **disegni veri** — assonometria, sezione, pianta — generati dagli stessi volumi di `lib/esploso.ts`. Non è contenuto inventato, è geometria del repo, la stessa che A usa per l'esploso da sempre | `ecolinear` (la galleria mista) + regola 1 di casa |
| **Movimento — UN momento orchestrato** | **le fasi pinnate diventano un plotter.** Oggi il disegno appare in dissolvenza; adesso viene **tracciato**: una maschera che scorre (solo `transform`) scopre il tratto mentre un mirino d'ambra lo precede, cioè la stessa lingua del puntatore già in pagina. Guidato dalla `view-timeline` della fase, spento con `prefers-reduced-motion`, stato di riposo = il disegno finito | `ecolinear` (pannello pinnato + il mirino CAD, `1440-meta-52`) |
| **Il secondo wow, e non è di fila** | **i numeri sono quote su un volume.** Il blocco `Numeri` (posizione 2) diventa un **wireframe assonometrico in WebGL grezzo** — ~2 KB misurati, nessuna libreria, dagli stessi volumi di `lib/esploso.ts` — con le quattro cifre appese come **quote vere**, filetto e annotazione. Degrada a un SVG assonometrico statico, e le cifre restano nel DOM. Le fasi pinnate stanno in posizione 5: **non sono di fila** | `ecolinear` (le quote che portano un numero vero, `14.34 M — ESC 1:50`) · decisione n. 44 (WebGL grezzo, non `three.js`) |
| **Chrome** | marchio a sinistra, menu a destra in maiuscolo su una **pastiglia che compare scorrendo** (`animation-timeline: scroll(root)` sull'opacità di uno `::before`) | `ecolinear` (`1440-meta-18`) |
| **Puntatore** | **sostituito**: `cursor: none` e il mirino di un programma di disegno — quattro tratti con 7 px di vuoto al centro, la finestra di selezione da 8 px, la lettura di coordinate in mm, l'anello da 52 px sopra gli interattivi. Verificato sulla reference: **senza JavaScript `cursor: none` sta su 0 elementi anche da loro**, quindi la garanzia della n. 53 è fedele e non una nostra cautela | `ecolinear` (misurato con e senza JS l'08/09) |
| **Conversione** | **qui la reference non basta, e lo dichiaro.** Su ecoLINEAR la prima azione è a metà pagina — sopra la piega ci sono solo `About · Projects · Contact` — e la regola di casa impone l'azione primaria nel primo viewport a 390 **e** a 1440. Soluzione fedele all'apparato invece che aggiunta sopra: la CTA entra nella copertina **come annotazione di quota**, filetto e terminatore verticale, in basso a destra del logotipo | `ecolinear` per la forma (la quota), regola di casa per la posizione |
| **Impianto e ordine** | copertina-foglio → **numeri-volume (wow)** → invito → galleria a colonne sfalsate → **fasi pinnate col plotter (wow)** → opere → persone → brief → footer | `ecolinear`: l'invito **prima** della galleria, i servizi come fasi |
| **Cluster della § 1 che NON uso** | **n. 5** — chrome da template. Niente occhiello in maiuscoletto spaziato, niente «→» in coda, niente metadati uniti da «·», niente monospace per le etichette (B non ha una mono: le cifre si incolonnano con `tabular-nums`). Al suo posto i **segni di registro**: squadrette d'ambra agli angoli | — |

### Prima passata — il piano

```
--paper   #ECECEC  misurato        --ambra       #D98E36  SUPERFICIE, mai testo su carta
--surface #F3F5F1  il pannello     --ambra-testo #965E1C  4,54:1, quando deve essere testo
--ink     #6F5142  6,06:1          --ink-display #9D7460  3,49:1, la tinta esatta, solo ≥ 24 px
--muted   #876352  4,52:1          --line        rgba(157,116,96,.38)
```

**Tipografia**: **Montserrat e nient'altro**, tutti e cinque i pesi. La gerarchia la fanno corpo
e peso, non due famiglie.

**Impaginazione**, in una frase: *una tavola da disegno in cui la griglia di costruzione
attraversa tutta la pagina e i blocchi si appoggiano a lei.*

```
1440
┌──────────────────────────────────────────────────────┐
┆        ┆                                  ┆          ┆   ← griglia di costruzione
┆   ┌─┐  ┆        REGOLO ▮TP                ┆    ┌──┐  ┆      13,5 / 17 / 85 / 86,5 %
┆   └─┘  ┆   ingegneria civile e arch.      ┆    └──┘  ┆
┆        ┆   ├────────────┤ raccontaci ┬    ┆          ┆   ← la CTA è una quota
└──────────────────────────────────────────────────────┘
```

**Tre righe su cosa rende unica questa pagina.** Primo: è l'unica in cui **il puntatore del
sistema non c'è** e al suo posto sta uno strumento. Secondo: il colore satura non è un accento,
è **una superficie** — riempie i segni di registro, il blocco nel logotipo e il fondo del bottone,
e dove deve essere testo cambia valore. Terzo: il suo momento orchestrato **non fa comparire
niente**: disegna.

### Seconda passata — che cosa ho cambiato

1. **Il disegno delle fasi appariva in dissolvenza.** È il movimento più generato che esista, e in
   più era **rotto**: il disegno 0 restava acceso sotto tutti gli altri e le didascalie finivano
   allo stesso pixel (misurato a cinque quote; corretto il 08/09). Sostituirlo con un tracciamento
   non è un effetto in più: è la sola forma di rivelazione che una tavola da disegno può avere.
2. **La galleria mostrava rettangoli grigi.** Fedele alla regola dei segnaposto, ma la reference
   mescola **assonometrie e diagrammi**, e quelli il repo li sa generare. Un disegno vero al posto
   di un rettangolo grigio non viola la regola 1: non è contenuto del cliente, è geometria.
3. **B non aveva un'azione sopra la piega**, ed ero pronto a giustificarlo con la fedeltà. Non
   regge: la regola di casa non è negoziabile e il committente compra un sito che converte. La
   correzione entra **nella lingua della reference** (una quota) invece che sopra di essa.
4. **Il pannello era `aspect-ratio: 1/1`**, mentre nella reference misurata è più alto che largo
   (403 × 522). Corretto.

---

## C «le bande» — `/opzione-c`

**Il vincolo non cambia**: C **è** Halston (n. 46). Ma la rimisurazione dell'08/09 ha smentito una
riga della scheda, e va detto subito perché cambia il piano.

> **«C non si muove, e non per risparmio: quella pagina non ha un gesto di scorrimento.»**
> È falso, ed era una lettura mancata. Halston carica **gsap + ScrollTrigger + Lenis** e ha
> **205 elementi a `opacity: 0`** prima dello scorrimento, che scendono a **78** dopo aver
> percorso la pagina. La rivelazione allo scorrimento **è** il suo sistema — tanto che la prima
> cattura a 390 uscì vuota proprio per questo. Quindi C non aveva un momento orchestrato **perché
> la reference era stata letta male**, non per una scelta.

| Voce | Cosa fa questa opzione | Da quale reference (slug misurato) |
|---|---|---|
| **Gesto della hero** | titolo maiuscolo su due righe, poi **il filetto spezzato in due** con il taglio al 49 % della finestra, poi la riga di metadati in tre tempi — tre discipline / un valore / un bottone contornato — e sotto **il media a piena finestra** | `halston` — `1440-hero`, hero al **135 %** del viewport |
| **Media** | **la copertina è un video**, non una fotografia: la reference misura `video sì (autoplay)`, e il file di esempio esiste già (`cantiere-loop.mp4`, 2,1 MB su un budget di 2,5). Muto, `playsinline`, `loop`, con poster, e **con `prefers-reduced-motion` resta il solo poster** | `halston` (`misure.json`: `heroInfo.video: true`) |
| **Impaginazione** | **nessun contenitore e nessun `max-width`**: margine 20 px e bande da bordo a bordo. Il ritmo lo fa il **cambio di superficie**, non lo spazio bianco: fra una banda e l'altra non c'è vuoto, c'è un colore diverso. Cinque superfici non-carta in pagina, non tre | `halston` (contenitore 1440, spazio mediano 64 px, altezza 20.713 px = 23 schermate) |
| **Tipografia** | **General Sans** + **JetBrains Mono**, e la divisione del lavoro è misurata: 298 nodi contro 34 — dove c'è **un dato** c'è la mono. 270 occorrenze di `uppercase`. Rapporto display **1,52×** (42,6 → 28) | `halston` (`misure.json`) |
| **Movimento — UN momento orchestrato** | **la banda che cambia superficie mentre la attraversi.** Il granata non comincia dove finisce la carta: la **invade** al passaggio della piega, con una superficie che sale guidata dalla `view-timeline` della banda — solo `transform`, zero JavaScript. È l'identità di C portata di un'ottava: se il ritmo lo fa il colore, il colore deve poter **arrivare** | `halston` (le bande a piena larghezza che cambiano superficie) |
| **Il secondo wow, e non è di fila** | **il filetto spezzato si ricompone.** È la cosa che Halston fa e gli altri no — sotto il titolo non c'è una riga ma **due**, separate da un vuoto che cade al 49 %. Nella copertina (posizione 2) i due tronconi si chiudono l'uno verso l'altro allo scorrimento e diventano una riga sola, che è il gesto della sua versione a 390. La banda che invade sta in posizione 3-4: **non sono di fila** | `halston` — la riga «La cosa che fa lui e gli altri no», scritta l'08/09 |
| **La rivelazione, che è sistema e non wow** | i blocchi entrano con `opacity` e un `translateY` di 16 px guidati dalla propria `view-timeline`. **In CSS**, zero KB, spenta con `prefers-reduced-motion`, e lo stato di riposo è il contenuto **già visibile** — al contrario della reference, dove senza JavaScript metà pagina resta a `opacity: 0` | `halston` (205 → 78 elementi a opacità 0, misurati) |
| **Chrome** | marchio, **pastiglia granata `MENU`**, menu **centrato sulla finestra**. A 390 la pastiglia passa a destra. **Correzione**: oggi a 1440 la pastiglia e il menu esteso sono accesi **insieme** — fedele alla reference, che ha lo stesso difetto, ma un bottone-menu accanto a un menu già aperto resta un difetto. A 1440 la pastiglia sparisce | `halston` (misurato: 7 link di nav **più** un `MENU` visibili insieme) |
| **Conversione** | **c'è già ed è giusta**: `RACCONTACI IL PROGETTO +` nella copertina, ancora interna a `#brief`, dentro il primo viewport a 390 e a 1440 | `halston` (il bottone contornato `CONSULTATION +` nella riga di metadati) |
| **Impianto e ordine** | copertina video → due bande due-up → citazione a due toni → servizi su banda scura → numeri → progetti → metodo → persone → brief → footer. **Niente sopra la piega tranne l'azione**: C vende con le bande | `halston` |
| **Cluster della § 1 che NON uso** | **n. 4** — kit SaaS a card. Nessuna card, nessuna ombra (`halston` misura **zero** `box-shadow` contro le due di ecoLINEAR), un solo raggio in tutta la pagina (3 px, e solo sulle targhe), nessun gradiente. Il contenuto è tagliato dalle **superfici**, non da riquadri | — |

### Prima passata — il piano

```
--paper   #DBDBD8  misurato       --granata #593939  7,32:1, una banda intera
--surface #E6E5E3                 --banda   #2E2D2B  9,92:1, l'antracite
--ink     #171716  12,93:1        --mauve   #937D7D  4,67:1 (la reference sta a 4,13: corretto)
--muted   #6D5C5C  4,54:1         --muted-invert #AB9C9C 5,22:1
```

**Tipografia**: due famiglie con un confine netto — **General Sans** per tutto, **JetBrains Mono
400** dove c'è un dato o una micro-etichetta. Non è «la mono che fa tecnico» (cluster n. 5): è il
carattere che quella pagina usa per i suoi valori, contato sui nodi.

**Impaginazione**, in una frase: *nessun contenitore, e il ritmo lo fa il colore — i blocchi si
toccano e cambiano superficie.*

```
1440
┌────────────────────────────────────────────────┐  carta   #DBDBD8
│ PROGETTIAMO E DIRIGIAMO.        ▭MENU  · · · · │
│ ────────────    ────────────────────────────── │  ← il filetto spezzato
│ tre discipline │ RUOLI FIRMABILI │ (raccontaci)│
├────────────────────────────────────────────────┤
│                  video, 135 svh                │
├───────────────────────┬────────────────────────┤
│  granata #593939      │  mauve #937D7D         │  ← e il granata sale a coprire
└───────────────────────┴────────────────────────┘
```

**Tre righe su cosa rende unica questa pagina.** Primo: è l'unica **senza contenitore** — a 1440
il contenuto tocca i due bordi a 20 px. Secondo: è l'unica in cui **il fondo cambia sei volte** e
il testo cambia con lui, e l'unica il cui piano scuro occupa più della metà della pagina. Terzo:
è l'unica in cui **tutto è maiuscolo** e i valori stanno in una monospace, cioè l'unica in cui la
pagina si legge come un tabulato.

### Seconda passata — che cosa ho cambiato

1. **Avevo scritto che C non si muove, e l'avevo scritto come una scelta.** La rimisurazione dice
   che era un errore di lettura: la reference è piena di rivelazioni allo scorrimento. La
   correzione non è aggiungere un effetto, è **smettere di rivendicare un'assenza**.
2. **La copertina aveva una fotografia**, la reference ha un video. Il file esiste già ed è dentro
   il budget; e il video su C ha un senso che su A non aveva: la copertina è alta 135 svh, cioè è
   pensata per essere guardata.
3. **Le due navigazioni accese insieme a 1440.** Fedele, ma è comunque un difetto: a 1440 la
   pastiglia sparisce. È il punto in cui «identico» cede, come aveva già ceduto sull'AA (n. 49).
4. **Le superfici erano tre nella mia testa e cinque nel foglio** — servizi, numeri, granata,
   brief **e il footer**. Il conto lo scrive il CSS stesso; l'ho allineato.

---

## Quello che vale per tutte e tre

Non è negoziabile e non dipende dalla reference:

- **nessun contenuto del cliente inventato.** In A i segnaposto sono **visibili**
  (`[[DA CLIENTE: …]]`); in B e C rendono lorem ipsum **con la richiesta nel DOM** in
  `data-chiede`, che `scripts/segnaposto.mjs` raccoglie (n. 41). Sui **nomi delle persone** non si
  usa mai (n. 27 c). *Difetto aperto dal passo 0: la barra mobile porta il `[[DA CLIENTE]]`
  visibile di A dentro B e C — va sistemato.*
- **l'azione primaria nel primo viewport a 390 e a 1440**, e a 1440 il viewport utile è ~760 px.
- **un solo momento orchestrato per opzione**, costruito davvero, solo `transform` e `opacity`,
  spento con `prefers-reduced-motion` **con un `@media` esplicito** — la regola globale azzera le
  durate e su una timeline di scorrimento la durata è ignorata.
- **max 2 blocchi wow, mai due di fila.** Verificato sopra per tutte e tre.
- **tutto degrada**: senza JavaScript il contenuto resta leggibile e il form inviabile. Lo stato
  di riposo di ogni gesto è **lo stato finito**, mai quello vuoto.
- **il budget si verifica a ogni blocco.** Il WebGL di B costa ~2 KB misurati (n. 44), il video di
  C 2,1 MB su 2,5 di budget e non entra nel primo caricamento.
- **il brief è lo stesso componente** sulle tre rotte — stesse domande, cinque passi — vestito da
  tre apparati (n. 51). È lì che il confronto in call misura la lingua visiva a parità di
  contenuto.
