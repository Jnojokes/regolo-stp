# SCHEDA delle reference — REGOLO STP

> Cartella di prove della skill `sito-design` § 2. Ogni riga di questa scheda viene da uno
> screenshot in questa cartella e da uno stile **calcolato** letto nel browser, non da una
> descrizione. Catturata il 07/09/2026 con Playwright MCP (Chromium), viewport 1440×900 e
> 390×844, `scale: css`. Nessun sito ha richiesto il passaggio a Chrome DevTools MCP: Storey e
> Dieste, che stanno dietro Cloudflare, hanno risposto 200 a Playwright headless al primo colpo.
>
> I PNG sono stati riconvertiti in JPEG q82 dopo la lettura (22 MB → 11 MB): la cartella è
> l'archivio del ragionamento, non un asset del sito.

## 0 · Selezione finale, e le due esclusioni

Tetto della skill: max **3 tier A** (estetica), **2 tier B** (impianto), **1 tier C** (verticale).

| Tier | Sito | Stato |
|---|---|---|
| **A** | Storey Architecture — https://www.storeyarchitecture.co.uk/ | dentro |
| **A** | Kononenko Architectural Bureau — https://kononenkogroup.com/ | dentro |
| **A** | **AS Associates — https://as-associates.jp/** | **dentro (entra, vedi sotto)** |
| — | Studio Foundry — https://studio-foundry.sujen.co/ | **guardato, fuori dal tier A** |
| narrativa | Eladio Dieste — https://www.eladiodieste.com/ | dentro, fuori tetto: non dà token |
| **B** | ecoLINEAR Studio — https://ecolinearstudio.com/ | dentro, e alla fase 3 quinquies **è il sistema dell'opzione B** |
| **B** | Pelizzari Studio — https://www.pelizzari.com/ | dentro |
| **C** | schlaich bergermann partner — https://www.sbp.de/ | dentro (è il tier C di `references/studi-tecnici.md`) |
| **—** | **Halston (template Webflow) — https://halston-architecture-template.webflow.io/** | **entrato per nome dal committente: è il sistema dell'opzione C** |
| — | Nabil Issa — https://nabilissa.com/ | **guardato, fuori** |

### Le due entrate della fase 3 quinquies, e cosa cambia nella natura di questa scheda

Fino alla 3 ter le reference erano **materiale**: ogni sito dava un gesto o una regola, e le
proposte si componevano con quei gesti. Alla 3 quinquies il committente ha indicato due
indirizzi con una frase che non lascia margine — *«l'opzione 2 la voglio identica a questo
sito»* e *«l'opzione 3 la voglio identica a questo sito»* — e per quei due la scheda cambia
mestiere: non «cosa prendo da qui», ma **la specifica**. Le due tabelle qui sotto sono i valori
con cui `app/globals.css`, `app/css/ecolinear.css` e `app/css/halston.css` sono stati scritti,
e ogni voce ha il suo numero perché ogni voce è stata letta nel browser sui nodi veri.

**Halston non è lo studio di nessuno**: è un template Webflow. Va detto, perché cambia due
cose. Non c'è un cliente da non copiare — è materiale venduto per essere usato — e non c'è un
nome da tenere fuori dalla pagina per rispetto; resta fuori solo perché al cliente di REGOLO
il nome di un template non dice niente (per questo la barra della proposta chiama le tre
opzioni «lo studio», «il foglio», «le bande» e non con i nomi delle reference).

Le due catture sono state rifatte il **08/09/2026**, e una delle due per un difetto: la
`390-hero.jpeg` di Halston era stata presa **a metà caricamento** — solo le fotografie, zero
testo — e una cattura così non è una prova, è una macchia. La ripresa aspetta
`networkidle`, poi `document.fonts.ready`, poi **scorre tutta la pagina e torna in cima**,
perché quel template rivela il testo allo scorrimento: senza il giro, metà dei nodi resta a
`opacity: 0` e la misura direbbe che non esistono.

### Perché AS entra ed esce Studio Foundry

**AS entra.** La sua homepage non è una hero: è un **indice di documenti** — tre colonne
`[Projects]` `[Materials]` `[Info]` e, sotto Materials, le classi di documento con il conteggio
fra parentesi: `Photo_Process (202)` · `Drawing_Study (106)` · `Drawing_Construction (298)` ·
`Notebook (416)`. E `/projects` è una **tabella di dati** con le colonne
`No↓ · Title · Year · Principal use · Location · Site Area · Floor Area`.
È il primo sito della lista in cui il modo di ordinare il lavoro è quello di uno studio
tecnico e non quello di un portfolio. REGOLO ha lo stesso problema di AS — il dato che dice
cosa sanno fare è il **ruolo** (progetto architettonico / strutturale / DL / CSP-CSE /
collaudo), cioè una classe di documento — e `CLAUDE.md` § Scheda progetto vieta di ometterlo.

**Studio Foundry esce.** Due ragioni, entrambe verificate e non di gusto:
1. È la reference che i due prototipi in `kit/opzioni/` avevano già **parafrasato** (serif
   display enorme sopra la foto, claim in due tempi, servizi nominati come li nomina il
   cliente): tenerla nel tier A significa ri-importare la stessa media da cui la fase 3 è
   uscita generica.
2. I suoi token misurati sono, voce per voce, i cluster n. 1 e n. 5 della lista di
   calibrazione: fondo `#F3F0EC` (carta calda), display serif ad altissimo contrasto (Elsie,
   700, tutto maiuscolo), monospace 10-14 px maiuscolo per le micro-etichette.
   Sono gli stessi che `CLAUDE.md` § Direzione visiva aveva già scritto.

Di Studio Foundry **restano due gesti**, presi senza la sua palette e senza le sue famiglie, e
li dichiaro: la parola-marchio che attraversa tutta la larghezza e **si sovrappone** alla foto
a piena pagina; i metadati spinti ai due estremi della riga (`RESIDENTIAL` a sinistra, `2025`
a destra, e in mezzo il vuoto) invece di uniti da puntini.

**Nabil Issa resta fuori.** Il suo gesto strutturale — la domanda in hero al posto dello
slogan, i capitoli numerati — è già dentro il progetto: è l'opzione B di `CLAUDE.md`
(«hero-domanda con percorso»), e ci è arrivata dal tier B. Quello che aggiungerebbe è
l'estetica: nero quasi pieno `#0B0B0B` + maiuscolo ultra-sottile in linea da 1 parola +
pastiglia `border-radius: 50%` per il CTA. Cioè il cluster n. 2 più il cluster n. 5. In più è
un portfolio personale, non uno studio con committenza, e apre con un banner cookie —
il contrario della decisione presa qui (analytics senza cookie, nessun banner).

---

## 1 · Le tabelle, sito per sito

### Storey Architecture · tier A · `storey/`

| Voce | Misurato |
|---|---|
| Famiglie | **New Grotesk** (400/500) · **New Grotesk Mono** (400) · **Biro** — una calligrafica, usata **una volta sola** in tutta la pagina |
| Scala 1440 | 115,2 · 100,8 · 31,7 · 23 · 21,6 (Biro) · 15,8 · 14,4 · 11,5 px |
| Scala 390 | 58,5 · 46,8 · 31,2 · 16,8 · 9,8 · 5,9 px |
| Interlinea | **1,0 esatta a ogni corpo display** (115,2/115,2 · 100,8/100,8 · 31,7/31,7); i capoversi in banda nera stanno intorno a 1,18 |
| Spaziatura | display **−3 %** · mono **−10 %** (negativa, su maiuscolo: l'opposto del default `+0,14em`) |
| Contrasto di scala | 115,2 / 15,8 = **7,3×** |
| Contenitore | nessun `max-width` (100 %). Gutter **20 px a 1440**, 16 px a 390 |
| Angoli / ombre | `border-radius` **zero occorrenze** in tutta la pagina · `box-shadow` **zero** |
| Fotografia | hero 1440×990 (1,45) a piena pagina; un secondo file 1512 px posizionato a `x = −36`, cioè **sborda di 36 px per lato**. Nelle bande, l'immagine sborda da **un solo** lato |
| Numerazione | `01)` — con la parentesi chiusa, in mono, non `01 —` |
| Cosa fa lui e gli altri no | il **vuoto disuguale**: nella banda nera l'immagine parte a 500 px dall'alto e le due colonne di testo a 440, e sopra restano 400 px di nero senza niente. Non è centratura, non è padding: è composizione. In più una **schedina a righe** (carta rigata, piè di pagina in mono `ST / CTF  THANK YOU  STOREY.STUDIO`) con una riga scritta a mano, e un **numerone tono su tono** (`3` grigio su grigio) come contatore di sezione |
| **Da qui prendo per REGOLO** | l'interlinea 1,0 sui titoli e la spaziatura **negativa anche sulle etichette maiuscole**; il vuoto verticale disuguale fra le colonne di uno stesso blocco; l'immagine che sborda da **un** lato; il contatore di sezione grande e tono su tono; e il coraggio del gutter da 20 px |

### Kononenko Architectural Bureau · tier A · `kononenko/`

| Voce | Misurato |
|---|---|
| Famiglie | due, con i nomi offuscati (`h`, `n`): **`h` è un serif ad alto contrasto** (didone), **`n` è un neogrotesco**. E stanno **nella stessa riga di titolo**: «The» in serif a x=305, «Systematic» in grottesco a x=427 |
| Scala 1440 | 131,3 · 88,5 · 60 · 30 · 14,3 · 12 · **9** px |
| Scala 390 | 41,6 · 37,4 · 31,2 · 27 · 14,6 · 9,4 px |
| Interlinea | 131,3 → **0,70** · 88,5 → 0,90 · 60 → 0,80 · 30 → 1,10 · 12 → 1,20. Sotto 1 solo sopra i 60 px |
| Spaziatura | −0,03 em sul display · −0,02 em sui piccoli |
| Contrasto di scala | 131,3 / 12 = **10,9×** |
| Contenitore | gutter **23 px**; le misure di testo sono 337,5 px e 525 px (23 % e 36 % di 1440) |
| Fondo | **bianco puro `#FFFFFF`**, non carta calda |
| Angoli / ombre | solo `50 %` (17 elementi: pallini). Nessun raggio su rettangoli, **nessuna ombra** |
| Fotografia | hero 1440×900; un'immagine 1504 px a `x = −32`; nella griglia **rapporti misti nella stessa fila**: 643×405 (1,59), 361×525 (0,69 verticale), 549×405 (1,36) |
| Cosa fa lui e gli altri no | **gli schizzi a mano**. A metà pagina l'immagine non è una foto: sono disegni a penna, non incorniciati, sparsi a scale diverse su bianco. E il **menu è una frase**: `Index, Work, About, Contact` separati da virgole, con la sottolineatura sulla voce corrente. In tutto il sito **non esiste un bottone**. Le sedi sono una **tabella a filetti** con l'etichetta «Offices» buttata a sinistra in un margine vuoto e la tabella che comincia a x=493 |
| **Da qui prendo per REGOLO** | l'interlinea **0,70-0,80** sopra i 60 px; il **titolo a due famiglie** (una parola in un carattere, una nell'altro — che è anche il modo di distinguere l'esito dal tecnicismo dei sei servizi); il **disegno** al posto della fotografia dove la foto non c'è; la tabella a filetti con l'etichetta nel margine vuoto; i rapporti d'immagine **misti** nella stessa griglia; il menu senza bottone |

### AS Associates · tier A · `as-associates/`

| Voce | Misurato |
|---|---|
| Famiglie | **una sola**: Unica 77 LL, pesi 400/500 |
| Scala 1440 | **quattro corpi in tutto il sito**: 36 · 22 · 16 · 14 px |
| Interlinea | 1,25 e 1,40. Nessun valore sotto 1 |
| Spaziatura | `+0,32 px` costante a ogni corpo (cioè +0,009 em a 36 px e +0,023 em a 14 px) |
| Contrasto di scala | 36 / 14 = **2,6×** — bassissimo, e funziona comunque |
| Griglia | **12 colonne da 96,33 px**, gutter 32 px, a 1440 |
| Angoli / ombre | zero e zero |
| Fondo | bianco puro |
| Gerarchia | fatta con l'**opacità**, non con un secondo colore: etichetta `[Projects]` al 40 % di nero, conteggio `(202)` al 20 % |
| Etichette | fra **parentesi quadre** (`[Projects]`, `[Materials]`, `[Info]`, `[P] Datasheet`) — non maiuscoletto spaziato |
| Home | `document.scrollHeight = 900` su viewport 900: **la home non scorre**. È un indice che sta in una schermata |
| Indice progetti | tabella `No↓ · Title · Year · Principal use · Location · Site Area · Floor Area`, **senza un solo filetto fra le righe** (passo 27,5 px), numeri allineati a destra con spazio fino come separatore delle migliaia (`265 , 011m²`). A 390 px **butta via le colonne** e tiene `No` + `Title`: non scroll orizzontale, non card |
| Cosa fa lui e gli altri no | il sito **è** una scheda tecnica. Il lavoro è classificato per **tipo di documento** con il **conteggio**, che è la prova di volume senza una parola di autoelogio |
| **Da qui prendo per REGOLO** | l'indice `/progetti` come **tabella di dati** (con `ruolo` fra le colonne, che `CLAUDE.md` vieta di omettere) e il suo mobile a colonne ridotte; il conteggio fra parentesi accanto a ogni voce di filtro; le etichette fra **parentesi quadre**; l'opacità come unica gerarchia sui metadati; la disciplina dei **quattro corpi**. Non prendo la sua bassa escursione di scala: REGOLO ha una hero da vendere, AS no |

### Eladio Dieste · reference narrativa · `eladio-dieste/`

| Voce | Misurato |
|---|---|
| Famiglie | una sola, un grottesco (pesi 400/500) |
| Scala 1440 | 122,9 · 52,7 · 32,9 · 19,7 · 18,6 · 17,6 · 15,4 · 13,2 px; misure di testo 433-526 px |
| Interlinea / spaziatura | 1,0 sul display; ls **−0,05 em** a 122,9 px, −0,04 em a 52,7 |
| Fondo | **nero `#000`**, testo crema `#F1ECE8`, accento `#A55F2D` — che è il **mattone**: il materiale con cui Dieste ha costruito |
| Hero | un `<canvas>` 1440×900 (Three.js) sopra una foto di volta in mattoni a luce radente |
| Gutter | 18 px |
| Cosa fa lui e gli altri no | **il nome spaccato nei due angoli opposti**, entrambi che sbordano dal bordo («Eladio» in alto a sinistra, «Dieste» in basso a destra), e il **menu che è una linea di quota**: un filetto attraversa tutta la larghezza a metà schermo e cinque parole pendono da sotto, con un pallino sulla corrente. A metà pagina, una **timeline ad asse verticale**: un filetto al centro, gli anni **sopra** l'asse, e le foto a cavallo dell'asse **a scale disuguali** — la dimensione dell'immagine dice l'importanza |
| **Da qui prendo per REGOLO** | la **linea di quota come struttura di navigazione e di sezione** (è il gesto giusto per uno studio che disegna: un filetto con le cose appese, non un occhiello); l'**asse verticale** per le cinque fasi di «come lavoriamo» e per la timeline; la **luce radente su una superficie** come soggetto dell'immagine generata (§ 3 del prompt di fase); e la regola sull'accento: **viene dal materiale che il cliente costruisce davvero**, non da un catalogo. Non prendo il nero pieno né il crema: sono, insieme, i cluster n. 1 e n. 2 |

### ecoLINEAR Studio · **il sistema dell'opzione B** · `ecolinear/`

> Rimisurato l'08/09/2026 su nove catture (`1440-hero`, `1440-meta-18/35/52/70/88`,
> `1440-intera`, `390-hero`, `390-meta`). Dove i numeri di questa tabella non coincidono con
> la prima passata, valgono questi: la prima era una lettura di superficie.

| Voce | Misurato |
|---|---|
| Famiglie | **Montserrat sola: 60 nodi di testo su 60.** Niente monospace, niente display separato |
| Pesi, e li usa tutti | **300** (4 nodi, le annotazioni) · **400** (18, il corpo) · **500** (16, i numeri di fase e le etichette) · **600** (19, i titoli e la nav) · **700** (3, il nome dello studio dentro il testo) |
| Colori | carta `#ECECEC`, pannello `#F3F5F1`, testo `rgb(157,116,96)` (una terra), ambra `rgb(217,142,54)` |
| Scala 1440 | 158,4 (il numerone di fase, al **12 % di opacità**) · 46,1 · 40 · 34,6 · 20 · 18 · 16 · 14 · 12 · 10 · 8,5 px |
| Interlinee | **1,12** sul titolo (51,61 / 46,1) · **1,83** sull'annotazione (33 / 18) · **1,0 esatta** sul numerone (158,4 / 158,4) |
| Tracciature | −0,9216 px sul titolo (= −0,02 em) · **+0,9** e **+0,6** sulle etichette · −3,168 sul numerone · +1,02 sul micro. È l'unica delle reference con **valori positivi** |
| Angoli / ombre | raggio **2 px** (20 occorrenze) e **50 %** (3: le frecce nei cerchietti); **due ombre**, `0 30px 60px -35px rgba(0,0,0,.35)` e `0 0 12px rgba(217,142,54,.55)` (l'alone d'ambra sotto la pastiglia) |
| Contenitore | misura di testo 609 px |
| Altezza | 10.638 px = **11,8 schermate**; 70 `img`, 18 `svg` |
| La prima schermata | **un foglio da disegno**: griglia di costruzione **tratteggiata**, e negli angoli tre disegni a filo — l'arco di apertura di una porta, un cerchio con l'asse, una linea di sezione tratteggiata. Il logotipo centrato con **un blocco d'ambra** dentro una lettera, e un filetto scuro sottile |
| La galleria | **quattro colonne sfalsate** di tipi di disegno misti (foto, assonometrie a linea, diagrammi), con scarti verticali diversi per colonna |
| I servizi | **pinnati**: a sinistra un pannello quadrato `#F3F5F1` con **quattro** squadrette d'ambra agli angoli, un disegno a filo e `fig. 04`; a destra l'etichetta `services` fra squadrette, il numero `01` a 158,4 px al 12 %, il titolo a 46,1 e il paragrafo su 609 px; all'estremo destro un **righello verticale** con una tacca per fase |
| La CTA | «Do you have a project?» **prima** della galleria, con una pastiglia `CONTACT US →` dove la freccia sta **dentro un cerchietto** |
| **Il puntatore** | **non c'è**: `cursor: none` su **1.082 elementi**, e al suo posto il **mirino di un programma di disegno**. Misurato muovendo il puntatore: quattro tratti da **64 × 1 px** in `rgba(217,142,54,.4)` con un **vuoto di 7 px** al centro (le linee non si incrociano sul punto, lo lasciano libero); una **finestra di selezione** di 8 × 8 px, 1 px in `rgba(217,142,54,.75)`, **spigolo vivo**, che resta 8 × 8 in ogni stato; una **lettura di coordinate** a 10 px, tracciatura +0,8, in `rgba(157,116,96,.55)`; e un **anello** invisibile a riposo che sopra un elemento interattivo diventa **52 × 52** con `background rgba(217,142,54,.08)` e il bordo in ambra piena. Sopra un link la lettura **si spegne**: i due stati non convivono |
| **La fotografia, come è ritagliata** *(riguardata l'08/09, ripassata passo 1)* | **mai in cornice e mai con un rapporto d'aspetto dichiarato**: le immagini stanno dentro colonne di larghezza fissa (288 px nella galleria, 403 nel pannello) e l'altezza la decide il file — 240, 364, 407, 522 px nella stessa griglia. Raggio **0 px su tutte**, che è il contrario del raggio 2 px dei pannelli: la fotografia non partecipa al sistema delle pastiglie. Nel pannello delle fasi non c'è nessuna fotografia: c'è **un disegno a filo**, uno solo alla volta |
| **Il difetto misurato** *(nuovo, 08/09)* | **due, e tutti e due si contano.** (1) `object-fit: fill` su **cinque immagini su sei** — 288×240, 288×364, 288×407 con `fill`, cioè deformate; l'unica con `cover` è quella del pannello. (2) **senza JavaScript la pagina perde il 22 % del testo**: 1.055 caratteri contro 1.347, misurati con `javaScriptEnabled: false`. Il puntatore invece **non** è un difetto loro: senza JS `cursor: none` sta su **0 elementi** e il puntatore di sistema torna, che è esattamente la garanzia della decisione n. 53 |
| Impianto (quello che conta) | quattro servizi come **fasi del percorso**; il blocco «Do you have a project?» **prima** della galleria; sezioni pinnate con ScrollTrigger |
| Cosa fa lui e gli altri no | disegna **quote vere**: una linea con le frecce e l'annotazione `14.34 M — ESC 1:50` sopra il titolo, **segni di registro agli angoli** attorno all'etichetta «about us», e una lettura di coordinate `X 1.538 Y 2.410 · PLOT 23%` all'estremo destro. La griglia progetti su mobile è a **due colonne sfalsate** e mescola foto, assonometrie a linea e diagrammi |
| **Da qui prendo per REGOLO** | come **informazione, non come decorazione**: la quota dell'opzione B esiste già ma oggi è ornamentale (due filetti attorno a un occhiello). Qui la quota **porta un numero vero**. Regola che adotto: una quota in pagina dichiara una quantità che esiste (il numero della sezione su quante sono, i mq, quanti progetti, quanti comuni) o non si disegna. E i **segni di registro** al posto dell'occhiello maiuscolo. Dell'impianto: le fasi al posto dei servizi e la CTA prima della galleria — già in `CLAUDE.md` |
| **Non prendo** *(nuovo, 08/09)* | l'`object-fit: fill`, che è il difetto qui sopra e su un sito di progettazione deforma proprio la cosa che deve essere giusta · il testo che compare solo con JavaScript (regola 4 di casa) · l'ambra come **testo** su carta (2,26:1) e la terra a 3,49, che restano superficie e display, non corpo (n. 49) · le **due ombre**, comprese l'alone d'ambra, che nel pannello di B non entrano · e la **didascalia `fig. 0N`**, che nel pannello della reference **non c'è**: l'ho aggiunta io in B, ed è il posto dove il difetto delle due tavole sovrapposte si vedeva |

### Halston (template Webflow) · **il sistema dell'opzione C** · `halston/`

| Voce | Misurato |
|---|---|
| Famiglie | **due, e la divisione del lavoro è misurata**: **General Sans** su 298 nodi di testo, **JetBrains Mono** su 34. Dove c'è un dato o una micro-etichetta c'è la mono (80 nodi la usano fra i 34 contati e i loro figli) |
| Licenza | General Sans è di **Indian Type Foundry**, su Fontshare: uso commerciale e self-hosting permessi, ma **non è OFL** come tutto il resto del repo. Deviazione dichiarata (`DECISIONI.md`) |
| Maiuscolo | **270 occorrenze** di `text-transform: uppercase`. Non è un accento: è la voce normale delle etichette e dei nomi di servizio |
| Colori | inchiostro `srgb .09 .0894 .0841` · carta `srgb .9 .899 .8902` (e `srgb .86 .8586 .8463` sul fondo pagina) · muto `srgb .672 .611 .611` · **granata** `rgb(88,57,57)` · banda scura `srgb .18 .1788 .1682` · medio `srgb .72 .7173 .6925` |
| Scala 1440 | 216 · 129,6 · **115,2** · 57,6 · 43,2 · 42,6 · 31 · 26,8 · 19,4 · 17,4 · 16 · 14,7 · **13,7** · 12 px. Il titolo della copertina è 57,6; il 13,7 è la mono |
| Interlinee | **1,0 esatta** sul display (115,2 / 115,2) · **0,8** sul numerone (129,6 / 103,68) · 1,2 sul titolo di banda (37,2 / 31) · **1,0** sulla mono (13,7 / 13,7) |
| Tracciature | **−7,2 px** sul display (= −0,05 em) · −0,4 px sul corpo |
| Angoli / ombre | raggio **3 px** (42 occorrenze) e **zero ombre**. È l'opposto esatto di ecoLINEAR |
| Contenitore | **nessuno**: non c'è un `max-width` centrato. Margine di pagina 20 px |
| Altezza | 20.713 px = **23 schermate** a 1440; 13.475 px = **16 schermate** a 390 |
| La testata | marchio a 22 px a sinistra, subito accanto una **pastiglia granata** con l'hamburger e `MENU`, il menu **centrato sulla finestra** in maiuscolo, `MORE ⌄` all'estremo destro |
| La copertina | titolo maiuscolo su **due righe**, poi un **filetto spezzato in due** (il taglio cade al 49 % della finestra), poi una riga di metadati in **tre tempi** — tre discipline in granata / `RECOGNITION` + il valore / un bottone **contornato** `CONSULTATION +` — e sotto la fotografia a piena finestra |
| L'impianto | **bande a piena larghezza che cambiano superficie**, due-up e alternate: granata con il testo bianco, poi mauve con il testo scuro, con il lato del media che si scambia |
| La citazione | ritratto all'**estremo** sinistro, filetto in testa, un grande segno di citazione, e il testo a **due toni** — la prima frase a inchiostro pieno, il resto in muto —, poi `nome · ruolo` e una targa `• QUOTE` |
| I servizi | **righe su banda scura**, alte ~150 px, divise da filetti da 1 px: il nome in maiuscolo a sinistra in rosa muto, il **valore in mono** all'estremo destro |
| Le teste di sezione | **tre punti su un filetto**: etichetta a sinistra, targa `• TAG` al centro, etichetta a destra. Non è un titolo centrato |
| Il micro-elemento firma | la **targa**: pastiglia in mono maiuscolo, 1 px di bordo, 3 px di raggio, **un punto pieno davanti** |
| A 390 | la pastiglia `MENU` passa all'**estremo destro**; i due filetti spezzati diventano continui; le tre discipline diventano **una riga** con un `+` dopo **ognuna**, compresa l'ultima |
| **La fotografia, come è ritagliata** *(riguardata l'08/09, ripassata passo 1)* | **da bordo a bordo e tagliata dalla finestra, non da un rapporto d'aspetto**. Il testo sopra ha un margine di 20 px; la fotografia no: comincia a `x = 0`, finisce a `x = 1440` e il suo bordo superiore è il filo inferiore della riga di metadati — non c'è aria fra i due. In basso non finisce: la taglia la piega. Nelle bande due-up la stessa cosa a metà larghezza, e il lato del media si scambia (`.banda-rovescia`). Raggio 0 sulle fotografie, mentre le pastiglie ne hanno 3: la fotografia non è un componente, è una superficie |
| **La cosa che fa lui e gli altri no** *(mancava, 08/09)* | **il filetto spezzato in due**. Sotto il titolo di copertina non c'è una riga: ce ne sono **due**, separate da un vuoto, e il taglio cade al **49 % della finestra** — cioè la riga di metadati sotto è già divisa in due campi prima che ci sia scritto qualcosa. È la stessa idea delle bande, un'ottava sopra: **la pagina si divide invece di allinearsi**. A 390 i due filetti tornano uno, e il gesto sparisce con lui |
| **Il difetto misurato** *(nuovo, 08/09)* | **due navigazioni accese insieme a 1440**: la pastiglia granata `MENU` (che è il comando del menu a scomparsa) sta in testata **mentre** il menu esteso — About · Services · Disciplines · Projects · Journal — è già tutto visibile accanto. Contate sui nodi visibili: 7 link di navigazione **più** un `MENU`. In più l'ultima voce ha il testo duplicato nel DOM (`MoreMore`), che una sintesi vocale legge due volte. Sono difetti da template: un template deve coprire ogni larghezza, e li lascia accesi tutti. **E l'opzione C oggi ha lo stesso**, misurato sul build: a 1440 la `<details>` «menu» è visibile insieme al menu esteso, mentre su A e su B a 1440 la `<details>` è nascosta. Non lo correggo qui: «identico» lo autorizza, un bottone-menu accanto a un menu già aperto è comunque un difetto, e la scelta è di FT (passo 2) |
| **Da qui prendo per REGOLO** | tutto: è la specifica dell'opzione C. Fuori dall'opzione C resta **una** lezione trasferibile — il ritmo di una pagina si può fare con il **cambio di superficie** invece che con il vuoto, e allora non serve un ritmo verticale dichiarato |
| **Non prendo** *(nuovo, 08/09)* | il testo di nav duplicato · il **mauve a 4,13:1** e le altre due tinte sotto soglia, corrette tenendo tinta e saturazione (n. 49) · i «premi» inventati della riga di metadati (`RECOGNITION — Mies van der Rohe Shortlist`), che su REGOLO sarebbero contenuto inventato · e il **video** di copertina, che qui è un file da template e da noi non esiste |

### Pelizzari Studio · tier B (impianto) · `pelizzari/`

| Voce | Misurato |
|---|---|
| Famiglie | **Suisse Intl** + **Suisse Works** — sans e serif della **stessa superfamiglia**. E come Kononenko: **nella stessa riga** («Discover» Intl 500 + «Works» Works 700, entrambi 120 px) |
| Colori | fondo `#F0EFEB`, inchiostro `#111` |
| Scala 1440 | 184,3 · 120 · 32 · 28 · 24 · 20 · 14 · 12 px, tutti a interlinea 1,0 tranne i piccoli |
| Contenitore | `min(100%, 1140px)` |
| Angoli | 20 / 32 / 50 / 64 px (pastiglie) |
| Cosa fa lui e gli altri no | la **riga di metadati in tre tempi** larga quanto la scheda: `2502` (codice) a sinistra, `Borromei 9` (nome) accanto, `View project` **spinto a destra** — e in mezzo il vuoto. Griglia progetti a due colonne di **altezza disuguale**. Il muro di loghi della rassegna stampa come blocco di prova principale |
| **Da qui prendo per REGOLO** | la **riga a tre tempi con l'azione spinta al bordo** per i dati duri delle schede progetto; le due colonne di altezza disuguale; e la conferma che il **titolo a due famiglie** non è un vezzo di un solo sito |
| Antipattern, e vale in vendita | apre con un **muro di cookie a schermo pieno**. La decisione di REGOLO — analytics senza cookie, nessun banner, nessun iframe di terzi — restituisce la prima schermata al contenuto. Va detto in call: è una differenza che si vede |

### schlaich bergermann partner · tier C · `sbp/`

| Voce | Misurato |
|---|---|
| Famiglie | MarkWebPro (geometrico), display in **peso 200** |
| Colori | fondo bianco, accento **arancio `#F26910` / `#F18735`** |
| Scala 1440 | 110 · 70 · 67 · 24 · 21 · 19 · 18 · 17 · 16 px |
| Angoli | 4 px; bottoni pieni arancio **con «→» in coda** |
| Titoli | un filetto arancio corto sotto la **prima parola** del titolo |
| Cosa prendo (solo impianto, come dice la scheda nicchia) | i progetti classificati per **tipologia strutturale** (ponti, stadi, torri, coperture mobili, collaudi, solare) invece che per settore commerciale; il numero di progetti dichiarato come prova |
| **La prova più utile è negativa** | il leader mondiale delle strutture ha l'accento **arancio**, bottone pieno arancio, freccia in coda. L'arancio `#E4572E` dell'opzione B è la stessa famiglia. Per un sito di ingegneria l'arancio non è una scelta: è **il default di settore**, e sommato al cluster n. 1 (vicino a `#D97757`) è due volte default. È una delle ragioni per cui l'accento si rifà |

### refero — `DESIGN.md` «Structured» · `refero/DESIGN-structured.md`

Un solo DESIGN.md, editoriale/museale e **non SaaS** («Renaissance gallery on putty paper»),
usato solo come **evidenza sui token di spazio e tipografia**, come prescrive la skill.

| Evidenza | Valore, e cosa me ne faccio |
|---|---|
| Scala tipografica | **Major Second (1,125) da base 16 px su 12 gradini**, e il gradino display **fuori dalla scala** (374 px). È il meccanismo del contrasto di scala estremo: rapporto **fitto** sul testo e **un salto discontinuo** sul display, non un 1,25 uniforme su tutto |
| Interlinea | funzione del corpo: 0,84 sopra i 90 px · 1,00 fra 52 e 94 · 1,10 a 34 · 1,25-1,50 per l'utilità. Coincide con Kononenko e Storey misurati |
| Spaziatura | **tre soli valori**, tutti negativi e piccoli: −0,009 / −0,005 / −0,001 em |
| Spazio | unità base 4 px · **passo fra le sezioni 80 px** · padding scheda 24 px · gap fra elementi 6 px (densità dichiarata «compact») |
| Colore | canvas a **luminanza media** (`#C4C3B6`, non quasi-bianco), 8 neutri da `#000` a `#FFF`, **zero colore saturo**, con il divieto scritto: «don't introduce any saturated color» |
| Angoli | valori idiosincratici (2 / 9 / 28,8 px) e il divieto esplicito di usare 4/8/12 «off-system» |
| **La prova migliore è la lista «More like this»** | dei 20 vicini, **otto** sono descritti così: «Warm editorial zine. Cream paper» · «editorial broadsheet on warm paper» · «brutalist editorial on warm cream» · «alchemy lab on cream parchment» · «graphite blueprint on warm vellum» · «warm editorial paper with ink» · «Editorial museum on warm paper» · «editorial tech journal on warm…». **Carta calda + editoriale + inchiostro è la mediana, messa nero su bianco da un catalogo di stili.** È esattamente il punto di partenza di `CLAUDE.md` § Direzione visiva |

---

## 2 · Cosa dicono le misure, messe in fila

Le tre tier A **non condividono un'estetica**: condividono tre meccanismi.

| Meccanismo | Storey | Kononenko | AS | Il default generato |
|---|---|---|---|---|
| Interlinea del display | 1,00 | **0,70-0,80** | 1,25 | 1,1-1,2 |
| Spaziatura sul display | −3 % | −3 % | +0,009 em | 0 o positiva |
| Spaziatura sulle etichette maiuscole | **−10 %** | −2 % | +0,023 em | **+0,14 em** ← quello che c'è ora in REGOLO |
| Contrasto di scala | 7,3× | **10,9×** | 2,6× | 3-4× |
| `border-radius` | 0 | 0 (solo cerchi) | 0 | 8-12 px |
| `box-shadow` | 0 | 0 | 0 | `rgba(0,0,0,.1)` |
| Gutter a 1440 | 20 px | 23 px | 32 px | 48-64 px |
| Occhiello maiuscolo spaziato | mai | mai | mai (`[quadre]`) | su ogni titolo |
| Fondo | bianco / nero / foto, a **tagli netti** | bianco puro | bianco puro | crema `#F4F1EA` |
| Immagini | rapporti diversi, sbordano da un lato | **rapporti misti nella stessa fila**, e disegni | **nessuna nell'indice** | tre card uguali |

Due cose sono unanimi e vanno prese senza discutere: **angoli vivi e nessuna ombra** (già in
`CLAUDE.md`, confermato), e **gutter piccoli** — 20-32 px a 1440, contro i 64 px che REGOLO usa
oggi (`clamp(1.25rem, 4vw, 4rem)`).

Una è unanime al contrario di come lavoriamo oggi: **nessuno dei tre mette un occhiello
maiuscolo spaziato sopra i titoli**, e chi usa un'etichetta la spazia in **negativo** o la
mette fra parentesi quadre.

E una è la scelta vera, perché i tre si dividono: **contrasto di scala estremo** (Kononenko
10,9× · Storey 7,3×) **oppure densità e griglia** (AS 2,6×). Non si possono avere entrambi:
o l'audacia sta nella scala, o sta nella tabella. Il prompt di fase dice «l'audacia in un
posto solo», e le due home di REGOLO hanno bisogni diversi — è la decisione che il piano
prende in § 1 di `STATO.md`.

## 3 · Cosa non si è aperto

Niente. Nove siti su nove hanno risposto, compresi Storey e Dieste dietro Cloudflare, e
`styles.refero.design`. Non c'è nessuna riga scritta a memoria in questa scheda.

## 4 · Riga di chiusura, sito per sito

- **Storey** → l'interlinea 1,0, la spaziatura negativa anche sulle maiuscole, il vuoto disuguale, l'immagine che sborda da un lato solo, il contatore tono su tono.
- **Kononenko** → l'interlinea 0,75 sopra i 60 px, il titolo a due famiglie, il disegno al posto della foto, la tabella a filetti con l'etichetta nel margine vuoto, i rapporti misti.
- **AS** → l'indice come scheda tecnica con il `ruolo` in colonna, il conteggio fra parentesi, le etichette fra parentesi quadre, l'opacità come gerarchia, i quattro corpi.
- **Studio Foundry** (fuori) → solo due gesti: il marchio che si sovrappone alla foto; i metadati ai due estremi della riga.
- **Dieste** → la linea di quota come struttura, l'asse verticale delle fasi, la luce radente, e l'accento che viene dal materiale.
- **ecoLINEAR** → alla 3 quinquies non è più «da qui prendo»: **è** l'opzione B, misura per misura. Il gesto che vale oltre questa proposta: **il puntatore sostituito dal mirino di un CAD**, con la lettura di coordinate — su un sito che è una tavola da disegno spiega tutti gli altri gesti. Quello che resta trasferibile: la quota che porta un numero vero, i segni di registro al posto dell'occhiello, le fasi al posto dei servizi, la CTA prima della galleria.
- **Halston** → **è** l'opzione C. Trasferibile: il ritmo fatto dal cambio di superficie invece che dal vuoto; la testa di sezione a tre punti; e la targa in mono con il punto davanti, che è un'etichetta che non ha bisogno di essere un occhiello maiuscolo spaziato.
- **Pelizzari** → la riga di metadati in tre tempi con l'azione al bordo, le colonne di altezza disuguale, la conferma del titolo a due famiglie.
- **sbp** → la classificazione per tipologia strutturale; e la prova, in negativo, che l'arancio è il default del settore.
- **refero / Structured** → il meccanismo della scala (rapporto fitto + un salto), l'interlinea come funzione del corpo, il passo di sezione 80 px su base 4, il canvas a luminanza media, e la lista che dimostra qual è la mediana.
