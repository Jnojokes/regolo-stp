# CLAUDE.md — sito REGOLO STP

> Copiare questo file nella root del repo con il nome `CLAUDE.md`.
> Claude Code lo legge a ogni sessione: è il contesto permanente del progetto.

## Cliente

REGOLO — società tra professionisti di ingegneria civile e architettura, Fermo (Marche).
Via Campiglione 2/E, 63900 Fermo (FM) · tel. 0734 510329 · 2-10 persone.
Progettazione e direzione lavori, architettonica e strutturale, su edifici nuovi ed
esistenti, pubblici e privati. Competenze: urbanistica, lavori pubblici, coordinamento
sicurezza, collaudi, progettazione termica e acustica, pratiche sisma e bonus edilizi.

Il sito precedente (brasili.net) è offline: si parte da zero.

## Obiettivo del sito

Il sito è il **secondo** contatto, non il primo: chi arriva ha già sentito il nome per
passaparola e sta decidendo se fidarsi. Deve **vincere il confronto**, non generare
domanda fredda.

- Azione primaria: **brief qualificato inviato** dal form multi-step.
- Azione secondaria: telefonata da mobile.
- Non deve: dare prezzi, promettere tempi sulle pratiche, sembrare un'agenzia immobiliare.

## Stack

- **Next.js** (App Router, TypeScript) · **Tailwind CSS** · **GSAP + ScrollTrigger** · **Lenis**
- Font self-hosted in `/public/fonts` (woff2, `font-display: swap`). Niente Google Fonts a runtime.
- Immagini via `next/image`, AVIF con fallback WebP.
- Deploy **Vercel**. Form via route handler + Resend.
- Contenuti in file MDX/JSON nel repo (niente CMS, salvo decisione contraria).

## Direzione visiva — rifatta dalle prove, fase 3 bis, e riscritta per B e C alla 3 quinquies (07-08/09/2026)

> I valori qui sotto **sostituiscono** quelli del kick-off. I precedenti (`paper #F4F2ED`,
> Instrument Serif display, `accent #2F4A42`, e per l'opzione B `ground #F3F4F1`,
> `accent #E4572E`, JetBrains Mono per i dati) erano — voce per voce — i cluster n. 1 e n. 5
> della lista di calibrazione della skill `sito-design`: carta calda, serif display ad alto
> contrasto, accento terracotta, maiuscoletto spaziato sopra ogni titolo, monospace per le
> etichette dati, «A · B · C», «→» in coda ai link. Erano un default, non una scelta.
>
> Le prove stanno in **`kit/reference/`**: nove siti catturati a 1440 e a 390, guardati, e con
> gli stili **misurati** nel browser (`SCHEDA.md`); quattordici caratteri OFL impaginati con le
> parole vere del brief e pesati (`_provini/PROVINI.md`); lo stato di partenza in `_prima/`.
> Il perché di ogni scelta è in `DECISIONI.md` (voci 17-27).

### Le reference, dopo la revisione del 07/09

| Tier | Sito | Cosa dà |
|---|---|---|
| A | Storey Architecture | interlinea 1,0, spaziatura negativa anche sulle maiuscole, vuoto disuguale, l'immagine che sborda da **un** lato |
| A | Kononenko Architectural Bureau | interlinea 0,70-0,80 sopra i 60 px, titolo a due voci, il **disegno** al posto della foto, la tabella a filetti con l'etichetta nel margine vuoto |
| A | **AS Associates** *(entrata)* | l'indice come **scheda tecnica** con il ruolo in colonna, i conteggi fra parentesi, le etichette fra `[quadre]`, l'opacità come gerarchia |
| A | **Studio Foundry** *(uscita alla 3 bis, rientrata alla 3 ter, e di nuovo solo materiale alla 3 quinquies)* | era uscita perché i suoi token misurati sono i cluster 1 e 5; è rientrata scelta per nome dal committente (n. 37) e ha retto una passata come sistema di una proposta. Adesso quel posto ce l'ha ecoLINEAR (n. 46) e di lei resta quello che dava: la fotografia a piena finestra con tutto il resto sopra, il marchio che le passa sopra da bordo a bordo, i metadati ai due estremi della riga |
| — | Nabil Issa *(fuori)* | il suo gesto è già nel progetto via tier B; quello che aggiungerebbe è cluster 2 + cluster 5, più un banner cookie |
| narrativa | Eladio Dieste | la **linea di quota come struttura**, l'asse verticale delle fasi, la luce radente, e la regola: l'accento viene dal materiale, non da un catalogo |
| **B** | **ecoLINEAR** *(promossa: alla 3 quinquies **è** il sistema dell'opzione B, n. 46)* | non più «cosa prendo da qui» ma la **specifica**, misura per misura: Montserrat sola, la carta grigia e il testo in terracotta, l'ambra come superficie, la griglia di costruzione tratteggiata, i segni di registro, le fasi pinnate col righello, la CTA prima della galleria |
| B | Pelizzari | impianto: la riga di metadati in tre tempi con l'azione spinta al bordo, le colonne di altezza disuguale |
| **—** | **Halston** (template Webflow) *(entrata per nome: **è** il sistema dell'opzione C, n. 46)* | la specifica dell'opzione C: due famiglie con la mono sui soli dati, 270 maiuscoli, zero ombre, raggio 3 px, nessun contenitore, e le **bande a piena larghezza che cambiano superficie**. Fuori dall'opzione C dà una lezione sola, ed è grossa: il ritmo di una pagina si può fare col **cambio di superficie** invece che col vuoto |
| C | schlaich bergermann partner | i progetti classificati per **tipologia strutturale**; e la prova, in negativo, che l'arancio è il default di settore dell'ingegneria |

### Colore — una sola tinta satura, e ha una data di scadenza

Le tre tier A **non hanno un accento cromatico** (misurato: Storey bianco/nero/foto, Kononenko
bianco e nero puri, AS bianco e nero con l'opacità come gerarchia) e il `DESIGN.md` di refero
lo scrive come divieto. Quindi nel sito c'è **un accento solo**, e sta in **un posto solo**: i
62 segnaposto. È l'inchiostro **blu del tampone** con cui si timbra e si vista un documento —
il segno che ne dichiara lo stato — ed è l'unico colore del progetto che **si consuma**: quando
i contenuti arrivano sparisce dalla pagina da sé.

**Blu e non viola, e il motivo è un numero.** Il primo valore era `#45327F`, e la
giustificazione reggeva; ma in HSL quella tinta sta a **255°**, cioè in mezzo ai tre indaco di
default dei modelli (239° · 258° · 262°) — la impronta digitale del design generato, che è
esattamente ciò che questa fase esiste per non avere. `#123C7A` sta a **216°**, passa meglio su
entrambi i fondi, e in Italia il tampone del timbro professionale è blu. Non entra mai in header, bottoni, stati, anello di fuoco, filetti,
esploso, mappa.

**Le tre proposte, e le tre carte** (le decisioni n. 26 e n. 29 riguardavano l'inversione della
vecchia B e sono **storia**: quella proposta è uscita con la n. 39). Nessuna delle tre è
l'inversione di un'altra, e non per caso — l'inversione di figura e fondo era il modo in cui due
passate avevano provato a distinguere due proposte **cambiando un valore**, e non ha funzionato
nessuna delle due volte. Alla 3 quinquies B e C portano i valori **letti dai due siti indicati**
(n. 46), con le correzioni di contrasto dichiarate (n. 49).

```
A «lo studio» — carta bianca      B «il foglio» — carta grigia      C «le bande» — carta calda
--paper   #FFFFFF                 --paper   #ECECEC  misurato       --paper   #DBDBD8  misurato
--surface #FFFFFF                 --surface #F3F5F1  il pannello    --surface #E6E5E3
--ink     #000000  21,00:1        --ink     #6F5142   6,06:1        --ink     #171716  12,93:1
--muted   #5E5E5E   6,48:1        --muted   #876352   4,52:1        --muted   #6D5C5C   4,54:1
--line    #757575   4,61:1        --line    rgba(157,116,96,.38)    --line    filo di banda
--ph      #ECECE9                 --ph      #E3E3E1                 --ph      #B8B7B0  misurato
--timbro  #123C7A  10,75:1        --timbro  #123C7A   9,29:1        --timbro  #123C7A
--errore  #8E1B10   9,07:1        --errore  #8E1B10   8,05:1        --errore  #8E1B10
                                  --ambra   #D98E36  SUPERFICIE     --granata #593939   7,32:1
                                  --ambra-testo #965E1C  4,54:1     --banda   #2E2D2B   9,92:1
                                  --ink-display #9D7460  3,49:1     --mauve   #937D7D   4,67:1
                                     (la tinta esatta, solo ≥ 24 px)   --muted-invert #AB9C9C 5,22:1
```

**In B e in C il colore satura è una superficie, non un accento**, e sono due modi diversi di
esserlo: l'**ambra** di B riempie i segni di registro, il blocco dentro il logotipo e il fondo
del bottone — dove deve essere *testo* su carta cambia valore, perché `#D98E36` sta a 2,26:1; il
**granata** di C riempie una banda intera da bordo a bordo e si porta dietro il bianco.

Il **nero** non porta più nessuna differenza fra le proposte — era il difetto della 3 bis, dove
ne portava il 100 % — e in B e C non c'è nemmeno: l'inchiostro di B è una terra e quello di C è
un antracite misurato. Dove il nero resta, in A, è pieno: `#0B0B0B` e `#111` sono la tell n. 5,
e tre delle quattro reference misurate usano `rgb(0,0,0)`.

**La regola dei token legati al piano resta, e in questa passata ha ripagato due volte** (n. 50).
Chi cambia fondo ridichiara i token, e ridichiara **tutti e due i prefissi** — `--regolo-*` e i
gemelli `--color-*` — perché `@theme inline` risolve i `var()` sulla radice **una volta sola**.
Su C, dove metà pagina è banda scura, mancava del tutto: `contrasto-dom.mjs` ha trovato
**16 testi sotto soglia**, fra cui `passo 1 di 5` a **1,3:1**, inchiostro su antracite. E vale
anche per i token **derivati**: `--regolo-quota-colore: var(--regolo-muted)` ha la stessa
trappola un piano più sotto. Simmetricamente, dove il fondo torna **carta** dentro una banda
colorata — la targhetta e la riga di licenza del segnaposto, che sono dipinte di carta per
dichiarazione (n. 27 b) — il piano torna con lui.

Il fuoco non è mai colorato — è inchiostro sulla carta e carta sull'inchiostro, quindi 21:1 per
costruzione. Ogni rapporto è verificato **sul DOM vero** con
`node scripts/collaudo/contrasto-dom.mjs`: **123 coppie distinte su 8 rotte, zero sotto soglia**.
Il `theme-color` di ogni layout è la carta del proprio tema e va tenuto allineato a mano.

### Tipografia — una famiglia display per tema, e le soglie sono misurate

- **A: Archivo** (OFL, `wght` 400-600 + **`wdth` 62-100**, 40,7 KB) · **B: Montserrat**
  (OFL, `wght` 300-700, **33,4 KB**) e nient'altro · **C: General Sans** (`wght` 400-600,
  24,3 KB) + **JetBrains Mono 400** (8,5 KB). Quattro file, **106,8 KB** in tutto, generati con
  `bash scripts/genera-font.sh`.
- **Il carattere non si sceglie più: si legge.** Per B e per C non c'è stata una selezione — il
  committente ha chiesto quei due siti «identici», e i caratteri sono i loro, contati sui nodi di
  testo veri con Playwright: **Montserrat 60 su 60** in ecoLINEAR (nessuna seconda famiglia,
  nessun display separato: la gerarchia la fanno il corpo e il peso, e i pesi in pagina sono
  tutti e cinque — 300 · 400 · 500 · 600 · 700); **General Sans 298 nodi contro JetBrains Mono
  34** in Halston, dove la divisione del lavoro è netta: dove c'è un **dato** o una
  micro-etichetta c'è la mono, tutto il resto è la proporzionale.
- **General Sans non è OFL** (n. 48): è di Indian Type Foundry, su Fontshare, con licenza
  gratuita che permette uso commerciale e self-hosting. È una **deviazione dichiarata** dalla
  regola del repo, da confermare al cliente prima del go-live. Trappola: Fontshare serve i file
  da URL con un **hash che cambia**, quindi lo script ricava l'indirizzo dal loro CSS a ogni
  generazione invece di tenerlo scritto.
- **La monospace torna, e solo in C.** Non è un ripensamento sul divieto della 3 bis
  («monospace per le etichette dati» è il cluster n. 5): quel divieto difendeva il progetto da un
  **default** — la mono che compare perché «fa tecnico». Qui non è un default: è il carattere che
  quella pagina usa per i suoi valori, misurato. In A e in B non c'è: le loro cifre si
  incolonnano con `font-variant-numeric: tabular-nums`, e per questo `scripts/genera-font.sh`
  **asserisce che `tnum` esista** — con un'esenzione per-font, dichiarata, per General Sans, che
  non ce l'ha perché in Halston i numeri incolonnati stanno nella mono.
- **Il corpo non è un gradino di scala dove deve toccare i due margini.** Il logotipo della
  copertina di B si calcola sull'**avanzamento misurato** del carattere:
  `calc((100vw − 2×margine) / 6.37)` per «REGOLO STP» in Montserrat 300, letto da `hmtx` con
  fontTools (6,567 em di avanzamento meno 0,20 em di tracciatura). Il metodo conta: la prima
  versione di un marchio a piena larghezza usava un moltiplicatore stimato e si fermava **114 px
  prima** del margine destro.
- **L'asse di larghezza è la leva del mobile** in A, e ha una ragione funzionale: a 390 px il
  contrasto di scala estremo si ottiene solo se il display può stringersi, che è il gesto del
  disegnatore quando comprime la scritta per farla stare dentro una quota. Nella hero di A
  «Progettiamo e dirigiamo.» sta a `wdth 100` e «Dal disegno al cantiere.» a `wdth 75`: stessa
  famiglia, stesso corpo, due larghezze. **A comprime; B e C non hanno l'asse**, quindi non c'è
  niente da disapplicare.
- **Nessun asse `ital`**: «una sola parola del titolo in corsivo» non è vietata, è tecnicamente
  impossibile.
- Trappola verificata con fontTools, **e ha due facce opposte**: il peso di default di Archivo è
  **600**, quindi un corpo senza `font-weight` esplicito esce semibold; `varLib.instancer` con
  `wght=300:700` lascia il default di Montserrat a **300**, quindi lo stesso corpo esce
  **filiforme**, che a 18 px su carta chiara è quasi invisibile. In tutti e due i casi la
  conclusione è la stessa: `lib/fonts/*.ts` dichiara l'intervallo, `@layer base` mette un
  `font-weight: 400` su `body`, e ogni blocco dichiara il suo. Il `font-weight` esplicito non è
  pignoleria: è la condizione perché la pagina si veda.

**Scala** — rapporto fitto 1,125 sul testo (il meccanismo misurato in refero), e la differenza
fra i temi è il **salto**: in A il display è *fuori* dalla scala; in B il logotipo della
copertina è una funzione della finestra e non appartiene a nessuna scala, mentre sotto di lui la
scala è quella misurata su ecoLINEAR; in C la scala è quella misurata su Halston, e il salto è
enorme fra il titolo di copertina (57,6) e il numerone (129,6). Il corpo **non scala** da 320 a
1440.

| | A a 1440 | A a 390 | B a 1440 | C a 1440 |
|---|---|---|---|---|
| display | **132** (lh 0,86 · ls −0,018em) | 56 (lh 0,94) | **il logotipo**: `(100vw−2m)/6,37` ≈ 219 (lh 1,12) | **57,6** la copertina (lh 1,0 · ls −0,05em) |
| numerone | — | — | **158,4** al 12 % di opacità (lh 1,0) | **129,6** (lh **0,8**) |
| titolo | 41 (lh 0,96) | 25,6 | **46,1** (lh **1,12**) | 43,2 · 31 (lh 1,2) |
| corpo | **18** (lh 1,5) | 18 | 18 · 16 | 19,4 · 16 |
| dato · micro | 14,2 · 12,6 | 14,2 · 12,6 | 14 · 12 · 10 · 8,5 | **13,7 la mono** (lh 1,0) · 12 |
| **contrasto** | **7,3×** (= Storey misurato) | 3,1× | **12,2×** | **9,5×** |

**Le tracciature non sono più tutte negative, e questa volta è misurato.** In A restano i quattro
valori negativi (−0,030 / −0,018 / −0,015 / −0,010) più lo zero del corpo, e la regola vale: è
l'unico punto in cui le tre tier A vanno tutte contro il default `+0,14em`. Ma **ecoLINEAR ha
valori positivi** — +0,9 px e +0,6 px sulle etichette, +1,02 sul micro, misurati — e in C il
display sta a **−0,05 em** (−7,2 px su 144), cioè più stretto di qualunque valore di A. Le due
proposte portano le tracciature dei loro siti, e il divieto resta scritto **per A**.

**L'interlinea è un numero misurato, e la regola non è «alza sempre».** Un testo che **il
browser manda a capo** non scende sotto la **soglia d'inchiostro** dei caratteri che lo
compongono: il punto più alto meno il punto più basso, in em, fra i caratteri che quella stringa
ha davvero. Tre cose la rendono diversa da come la si scrive di solito:

1. **è l'inchiostro, non la scatola di riga.** Quello che si tocca sono i contorni; `hhea`/`OS/2`
   descrivono la scatola e sbagliano nella direzione costosa;
2. **in italiano l'alto non è la maiuscola: è l'accento sulla maiuscola.** Misurare la cap-height
   sbaglia di due decimi di em, che a 63 px sono 13 px, ed è esattamente il difetto che il
   committente ha visto in un titolo a 63,36 px con interlinea 63,36;
3. **dipende dalla stringa, non da una categoria.** «Testo misto» contro «tutto maiuscolo» non
   regge: ci sono caratteri in cui il maiuscolo accentato chiede *più* del testo misto, mentre
   «REGOLO STP» — che non ha né accenti né discendenti — sta comodo a 0,71.

I quattro caratteri in repo, misurati sui contorni: caso peggiore **1,136** (Archivo) · 1,198
(Montserrat) · 1,208 (General Sans) · 1,197 (JetBrains Mono); su «REGOLO STP» **0,710** ·
0,710 · 0,748 · 0,751. Le impronte dei file stanno in `soglie.json` e `interlinee.mjs` **si
ferma** se non corrispondono più: una tabella di soglie che descrive font che non ci sono più è
peggio di nessuna tabella.

**L'eccezione è una sola**: righe **spezzate a mano** (`<br>` + `text-wrap: nowrap`) e verificate
una per una. È la hero di A — quattro righe a 132 px, interlinea 0,86, soglia 1,050 — dove la
composizione è fissa e nessuna discendente cade sopra un accento. Per questo A non è in difetto,
e per questo se un giorno si cambia una parola di quel payoff va riverificata a mano.

Si rimisura con `node scripts/collaudo/interlinee.mjs`, che legge la tabella per-carattere di
`soglie.json` — generata da `soglie.py` con fontTools sui contorni dei file veri — guarda **quante
righe occupa davvero** ogni testo in pagina, e dice **quali due caratteri** si toccherebbero.

### Impaginazione

- **12 colonne**, gutter **24 px** e margine di pagina **24 px** a 1440 (16 a 390 e a 320) —
  non i 64 di prima: misurati 20 (Storey), 23 (Kononenko), 32 (AS). Contenuto max 1440.
  `--regolo-margine` e `--regolo-gutter` sono **due token distinti**.
- **Il contenuto sta su un asse, i numeri all'estremo opposto, e il vuoto in mezzo.** In A
  l'asse è orizzontale: apparato al bordo destro, colonne 11-12.
- Ritmo verticale su base 4, **tre passi** — 48 · 96 · 200 a 1440 — dichiarati solo in alto:
  lo spazio fra due blocchi appartiene al secondo. Mai lo stesso padding fra tutti i blocchi.
- Misura della prosa: 34 rem (A) · **38 rem (B**, che sono i 609 px misurati) · 34 rem (C).
  Mai su più di una colonna.
- Fotografia a piena larghezza, **mai in cornice**, e quando c'è sborda da **un** lato solo.
- **Le tre voci qui sopra descrivono A, e B e C le disapplicano per dichiarazione** (n. 46).
  B non ha un ritmo verticale: la composizione la tiene la **griglia di costruzione**
  tratteggiata a 13,5 / 17 / 85 / 86,5 %, e i blocchi si appoggiano a lei. C non ha nemmeno un
  contenitore — margine 20 px, bande da bordo a bordo — e il ritmo lo fa il **cambio di
  superficie**, non lo spazio bianco: fra una banda e l'altra non c'è vuoto, c'è un colore
  diverso.
- Angoli vivi, niente ombre morbide, niente gradienti — unanime nelle tre tier A, **e le due
  reference indicate lo contraddicono su un punto ciascuna, misurato**: ecoLINEAR ha raggio 2 px
  e **due ombre** (`0 30px 60px -35px rgba(0,0,0,.35)` e l'alone d'ambra
  `0 0 12px rgba(217,142,54,.55)`); Halston ha raggio 3 px e **zero ombre**. Il divieto resta
  scritto per A.

### L'apparato: la quota, e la regola che la tiene onesta

Il motivo grafico del sito è **uno**: la quota (filetto + terminatore obliquo a 45° ISO 129-1 +
un'annotazione). Si disegna **solo se passa tre condizioni**: due estremi su un oggetto reale
in pagina · un numero **che il repo può contare** · una quantità **che il visitatore non conta
a vista**. Tutte tre, o il filetto non si disegna. In tutto il sito ne restano **tre**:
`5 ruoli` (le due hero, da `RUOLI.length`), `128 comuni · FM 40 · MC 55 · AP 33` (territorio),
`passo n di 5` (il brief, l'unica che si muove). Header, persone e barra CTA mobile **non ne
hanno**: è il controllo della regola. La quota è un componente
(`components/Quota.tsx`) e il suo `numero` è tipizzato `number`, così una quota senza numero
non compila.

**Il terminatore a 45° è di A, e non si presta.** Sta in una regola base non qualificata
(`app/css/sezioni.css`, `.quota > *::before`), quindi ogni tema che usa `Quota` se lo porta
dietro se non lo disapplica — ed è esattamente quello che era successo alla barra di avanzamento
del brief su tutte e tre le rotte (n. 51). B ha terminatori **verticali** (il righello delle
fasi) e C non ha terminatori affatto (filetti da 1 px e il valore in mono all'estremo destro):
ognuna delle tre proposte ha il **suo** apparato, e due apparati diversi che si somigliano sono
peggio di due apparati diversi.

Le 23 vecchie `quota="Sez. 04 — Progetti"` sono diventate **etichette**: minuscole, fra
parentesi quadre messe dal CSS, sulla stessa riga del titolo e non sopra. Nessuna è una quota:
non portano un numero.

### Cosa non deve esserci — si controlla con un `grep`

Occhiello in maiuscoletto spaziato sopra un titolo · «→» in coda a link e bottoni · metadati
uniti da «·» · una parola del titolo in corsivo o in un altro colore · card identiche con
raggio e ombra · griglie a tre colonne con l'etichetta sopra · monospace per le etichette dati ·
nero tinto al posto del nero · sezioni centrate · lo stesso padding fra tutti i blocchi ·
`border-top`/`border-bottom` fra le righe di un elenco o di una tabella **in A** (il filetto non
separa mai: misura, o delimita una figura).

E tre voci nuove, che questa passata ha aggiunto perché le ha viste succedere:

- **una variante che porta il nome di una proposta.** `variante="puntini"` era la direzione «la
  parete», scartata, e il suo effetto in pagina era **un menu che a 1440 non si vedeva**: le voci
  erano punti di 8 px col nome in uno `sr-only`. Un nome accessibile che nessuno vede non è una
  scelta di stile, è una voce di menu mancante;
- **un blocco posizionato su una misura scritta a mano di un altro blocco.** La testata di C
  stava a `top: 44px`, l'altezza della barra della proposta a 1440; a 390 quella barra manda a
  capo e diventa 150 px, e la testata sparisce;
- **un componente senza chiamanti tenuto «di riserva».** Non è una riserva, è un invito a
  rimetterlo in pagina alla prossima lettura, e vale anche per un **collaudo**: `colata.mjs` e
  `volume.mjs` interrogavano gesti cancellati, cioè passavano a vuoto, e un «ok» che non guarda
  niente è peggio di uno script che non c'è (n. 47);
- **una classe di blocco con un nome generico** (n. 54). I fogli condivisi
  (`sezioni.css`, `pagine.css`, `globals.css`) stilano nomi **non qualificati per tema**, quindi
  un nome generico non è un nome libero: è un nome **già preso**. La galleria di B si chiamava
  `.galleria`, che in `pagine.css` è la griglia a tre colonne della scheda progetto: le quattro
  colonne sfalsate finivano in 435 px invece di 1.400 e la riga di licenza sbordava sopra la
  fotografia accanto. Ogni classe di blocco porta il prefisso del suo tema, e
  `scripts/collaudo/collisioni.mjs` lo controlla su tutto il markup reso;
- **`cursor: none` senza la garanzia che il sostituto sia vivo** (n. 53). Nascondere il
  puntatore di sistema è la cosa più facile da rompere di tutto il sito: se il mirino non
  compare, il visitatore ha una pagina che non sa usare. La regola è appesa a un attributo che
  mette il JavaScript **dopo** aver creato il mirino, quindi senza JavaScript non si applica;
- **un valore esatto messo nel token che tutti ereditano, con un commento che dice quando si
  può usare** (n. 49). Il commento non è un vincolo: `--regolo-ink` di B portava il valore della
  reference a 3,49:1 con scritto «solo ≥ 24 px», e nove testi piccoli l'hanno ereditato. Il
  default di un token deve essere lo stato che va bene anche quando nessuno ci pensa, e
  l'eccezione va chiesta per nome.

**Quando arriva il logo del cliente, questi valori si rivedono** (decisione n. 5). Lo slot per
il colore del marchio è **uno**: il segno sulla voce corrente del menu. Non inventare un logo.

## Regole non negoziabili

1. **Non inventare contenuti del cliente.** Nessun progetto, nome, numero, testimonianza o
   dato inventato, nemmeno come esempio "realistico". In **A e nelle pagine interne** i
   placeholder si scrivono in modo inequivocabile e **si vedono**:
   `[[DA CLIENTE: nome progetto]]`.
   *Eccezione dichiarata, solo per le proposte B e C* (decisione n. 41): sono una demo di
   vendita, e lì il segnaposto rende **lorem ipsum**. La regola non si toglie, si **circoscrive**,
   e con una condizione che è il punto: la richiesta resta nel DOM in `data-chiede`, e
   `node scripts/segnaposto.mjs --scrivi` la raccoglie dall'HTML buildato di **ogni** rotta e
   genera la sezione di `CONTENUTI-DA-CLIENTE.md`. È **più robusto** del `grep` che sostituisce —
   misurato: 28 richieste su 58 esistono solo dentro un `data-chiede`, quindi il vecchio gancio
   non le vedeva. **Sui nomi delle
   persone non si usa mai** (n. 27 c): un nome finto sotto la qualifica di un ingegnere è la
   stessa cosa vietata di una faccia presa altrove.
2. **Nessuna immagine stock nei blocchi di prova** (progetti, persone, prima/dopo, cantieri).
   In sviluppo si usano rettangoli grigi con la dicitura di cosa andrà lì.
   *Eccezione dichiarata, solo per il prototipo* (decisione n. 27): dietro
   `NEXT_PUBLIC_MEDIA_DEMO` i campi mostrano media **di esempio** — CC0 e Mixkit Free,
   in bianco e nero — restando segnaposto: squadrette, specifica del formato e riga di
   fonte e licenza in pagina. **Mai sui ritratti**, e si spegne con una variabile.
   Alla fase 5 si cancellano `lib/media-demo.ts` e `public/demo/`.
3. **Massimo 2 blocchi wow**, mai due di fila.
4. **Tutto degrada**: senza JS il contenuto resta leggibile e il form inviabile; con
   `prefers-reduced-motion: reduce` le animazioni non partono.
5. **Mobile first.** Ogni blocco ha una versione mobile progettata, non "disattivata".
6. **Performance budget** (vedi sotto): si verifica a ogni blocco aggiunto, non alla fine.
7. Animare solo `transform` e `opacity`.
8. Un solo `h1` per pagina, gerarchia corretta, focus sempre visibile.

## Performance budget

| Metrica | Obiettivo | Limite |
|---|---|---|
| LCP mobile 4G | < 2,0 s | 2,5 s |
| CLS | < 0,05 | 0,1 |
| INP | < 150 ms | 200 ms |
| Peso home al primo caricamento | < 1,2 MB | 1,8 MB |
| JS al primo caricamento | < 180 KB gz | 250 KB |
| Immagine hero | < 250 KB | 400 KB |
| Video hero | < 2,5 MB | 4 MB |
| Richieste | < 40 | 60 |

Lighthouse mobile ≥ 90 su tutte e quattro le voci prima di considerare fatto un blocco.

## Struttura

```
/                     Home
/progetti             indice filtrabile (filtri come query string, indicizzabili)
/progetti/[slug]      scheda progetto
/servizi              indice
/servizi/[slug]       6 servizi
/studio               chi siamo, metodo, persone
/contatti             contatti + form completo
/privacy /cookie      legal
```

## I sei servizi (titolo come esito, tecnicismo in seconda riga)

| Slug | Titolo | Sottotitolo |
|---|---|---|
| `casa-nuova` | La tua casa, dal disegno al cantiere | progettazione architettonica e direzione lavori |
| `ristrutturazioni` | Ristrutturare, ampliare, recuperare | interventi sull'esistente, cambi di destinazione |
| `strutture` | Mettere in sicurezza la struttura | progettazione strutturale, adeguamento e miglioramento sismico |
| `pratiche` | Pratiche, permessi e bonus | pratiche edilizie, sisma bonus, agibilità |
| `energia-acustica` | Comfort, energia, acustica | progettazione termica e acustica, efficientamento |
| `opere-pubbliche` | Opere pubbliche e collaudi | lavori pubblici, coordinamento sicurezza, collaudi |

## Homepage — sequenza dei blocchi

1. **Hero** — foto di opera realizzata, payoff in due tempi, **una sola** CTA «Raccontaci il progetto». Menu di 4 voci.
2. **Smistamento a domanda** — «Che intervento hai in mente?» + 5 bottoni. Ogni bottone porta al servizio **e** precompila il passo 1 del form via query string.
3. **Numeri** — quattro: anni · progetti · mq · comuni. Nel DOM anche senza JS.
4. **Progetti in evidenza** — 3-4 schede: foto, tipo, anno, luogo.
5. **Cosa facciamo** — le 6 card dei servizi.
6. **Come lavoriamo** — 5 fasi con avanzamento allo scroll (sticky + ScrollTrigger; su mobile lista verticale): primo incontro → fattibilità e costi → progetto → autorizzazioni → cantiere e direzione lavori.
7. **WOW 1 — esploso strutturale** — SVG a livelli (fondazioni → struttura → involucro → impianti → finiture) che si separano allo scroll. **In A resta SVG**, e per una ragione che non è cambiata: deve funzionare senza JavaScript e ritematizzarsi. Su mobile: sequenza di step con i livelli che si accendono uno alla volta. *Il divieto di 3D «in pagina» invece è caduto* (decisione n. 44): in C lo stesso edificio è **colato in prospettiva vera** in WebGL grezzo (~5 KB, nessuna libreria), dagli stessi volumi di `lib/esploso.ts`, con un SVG in prospettiva come degrado. Stesso dato, due lingue. Resta fuori **Blender**, e per il motivo originale: non ci sono i CAD del cliente, e un edificio modellato a mano sarebbe contenuto inventato.
8. **Prima / dopo** — slider con due immagini sovrapposte e `clip-path` guidato da un `input[type=range]` accessibile da tastiera. Niente librerie.
9. **Le persone** — ritratto, nome, ruolo, abilitazioni.
10. **Testimonianze** — 3, con nome e cognome, ognuna linkata al progetto.
11. **Territorio** — SVG della provincia con i comuni serviti. Niente mappa a tile.
12. **Brief qualificato** ★ — vedi sotto.
13. **Footer operativo** — indirizzo, telefono cliccabile, mail, PEC, P.IVA, orari, mappa statica.
+ **Barra CTA mobile** fissa sotto 768 px: Chiama · WhatsApp · Brief.

## Il form (il blocco più importante)

Cinque passi, una domanda per schermata, barra di avanzamento, dati personali **solo all'ultimo passo**.

1. Tipo di intervento → Casa nuova · Ristrutturazione o ampliamento · Pratica o bonus · Struttura e sisma · Opera pubblica · Altro
2. Dove → comune (autocomplete su FM/MC/AP) + tipo di immobile
3. A che punto sei → Solo un'idea · Ho l'immobile · Ho già un progetto · Devo partire subito
4. Tempi → Entro 3 mesi · 3-6 · 6-12 · Non ho fretta
5. Contatti → nome · telefono · email · note (opzionale) · consenso privacy (non pre-spuntato)

- Il passo 1 si precompila da `?intervento=` quando si arriva dal blocco 2.
- Senza JS: un unico form che funziona lo stesso.
- Honeypot + rate limit. **Niente CAPTCHA.**
- Invio con Resend alla mail dello studio + copia di cortesia all'utente.
- Il consenso va registrato con timestamp e testo dell'informativa.

## Scheda progetto

Copertina → contesto e problema → cosa abbiamo fatto → **dati duri** → galleria →
prima/dopo se presente → CTA contestuale («Hai un intervento simile?», precompila il form)
→ progetto successivo.

Dati duri: luogo · anno · superficie in mq · **ruolo dello studio** (progetto architettonico /
strutturale / direzione lavori / coordinamento sicurezza / collaudo) · impresa · committente.
Il campo **ruolo** non va mai omesso: è quello che dice cosa sanno fare.

## Pagina servizio

Titolo come esito → per chi è → cosa comprende → come funziona (fasi) → **cosa serve da te**
(elenco documenti) → FAQ con `<details>` + schema `FAQPage` → progetti collegati → CTA.

## SEO

- URL parlanti, `sitemap.xml`, `robots.txt`.
- Metadati per pagina: title ≤ 60, description ≤ 155, Open Graph 1200×630.
- Schema.org: `ProfessionalService` + `LocalBusiness` (home e contatti), `FAQPage`, `Person`.
- Nessuna pagina importante raggiungibile solo via JS. I filtri progetti sono query string.
- Predisporre i redirect 301 da brasili.net verso le pagine nuove (mappa in `REDIRECT.md`).

## Analytics

Vercel Analytics o Plausible: **senza cookie**, così non serve il banner. Eventi da tracciare:
apertura form · completamento form · click telefono · click WhatsApp. Quattro, non quaranta.

## File di servizio da mantenere nel repo

- `CONTENUTI-DA-CLIENTE.md` — ogni richiesta di contenuto, con la rotta. La sezione fra i due
  marcatori `SEGNAPOSTO:inizio`/`:fine` è **generata**
  (`npm run build && node scripts/segnaposto.mjs --scrivi`) e raccoglie tutte e due le forme:
  i `[[DA CLIENTE: …]]` visibili di A e i `data-chiede` di B e C. Il resto del file — bloccanti,
  note, date di «Chiesto il» e «Ricevuto» — è scritto a mano e il generatore non lo tocca
- `TODO-MEDIA.md` — ogni immagine/video placeholder da sostituire prima del go-live
- `REDIRECT.md` — mappa dei redirect da brasili.net
- `DECISIONI.md` — le scelte prese e il perché

## Definizione di «fatto» per ogni blocco

- [ ] Funziona su mobile reale
- [ ] Funziona senza JS
- [ ] Rispetta `prefers-reduced-motion`
- [ ] Navigabile da tastiera, focus visibile
- [ ] Contrasto AA
- [ ] Non sfonda il performance budget
- [ ] Nessun contenuto inventato: solo `[[DA CLIENTE: …]]`

## Le tre opzioni di homepage (fino alla fase 5)

FT vende con più toni; il cliente sceglie (`DECISIONI.md` n. 1). Erano quattro; l'opzione B del
kick-off **è uscita** (n. 39) e le due alternative sono state **rifatte da zero** alla fase 3
quinquies sui due indirizzi che il committente ha indicato per nome (n. 46):

> *«l'opzione 2 la voglio identica a questo sito: https://ecolinearstudio.com/»*
> *«l'opzione 3 la voglio identica a questo sito: https://halston-architecture-template.webflow.io/»*

Prima di quei due indirizzi c'era la diagnosi, ed era giusta: *«le altre due opzioni rispetto la
A sono ancora troppo simili in struttura alla A oltre la hero section. Devono essere proprio siti
diversi.»* Il numero lo confermava — le due alternative condividevano **65 %** e **54 %** delle
classi con A — ma la cosa che si vedeva non era una percentuale: erano tutte e tre **una colonna
di blocchi titolo-più-contenuto che scorre**.

**Cade il vincolo «stesso contenuto, stesso ordine, stesse parole»** (*«l'impianto del funnel tra
le diverse opzioni può essere diverso comunque»*). Resta invece per il **brief**, che è lo stesso
componente su tutte e tre — stesse domande, cinque passi — vestito da tre apparati diversi
(n. 51): è lì che il confronto in call misura la lingua visiva a parità di contenuto.

| | Da dove viene | Come si riconosce in tre secondi |
|---|---|---|
| **A** «lo studio» — `/` | il progetto, fase 3 bis | carta bianca, payoff a 132 px, la fotografia accanto al testo |
| **B** «il foglio» — `/opzione-b` | **ecoLINEAR Studio**, misurato | carta grigia e testo **in terracotta**, griglia di costruzione **tratteggiata**, disegni a filo negli angoli, un blocco d'ambra dentro il logotipo — e al posto del puntatore il **mirino di un CAD**, con la lettura di coordinate in millimetri |
| **C** «le bande» — `/opzione-c` | **Halston** (template Webflow), misurato | nessun contenitore, tutto in **maiuscolo**, e **bande a piena larghezza** che cambiano superficie: carta, granata, mauve, antracite |

I nomi dicono il **meccanismo e non la reference**, e la ragione è di vendita (n. 52): in cima
alla pagina «ecoLINEAR» sarebbe il nome di un altro studio di architettura, e «Halston» il nome
di un template. Le prove misurate stanno in `kit/reference/ecolinear/` e `kit/reference/halston/`
— nove catture ciascuna, a 1440 e a 390 — con le tabelle in `kit/reference/SCHEDA.md`. I
prototipi del kick-off in `kit/opzioni/` sono il brief visivo di **A** e di nessun'altra.

**La regola che governa questa tabella, e che tre passate hanno violato: le proposte devono
differire per come FUNZIONANO, non per come sono colorate.** Il criterio di accettazione è un
numero misurato sul `<main>` reso — **classi CSS condivise** — e la storia è questa:

| passata | il numero | il bersaglio |
|---|---|---|
| 3 bis | 97 % con B | era sbagliato: si misurava la somiglianza con la proposta che poi è uscita |
| 3 ter | C 94 %, D 90 % con B | idem |
| 3 quater | C↔D 73 % / 61 % | ancora sbagliato: il committente guardava la somiglianza **con A** |
| **3 quinquies** | **B dentro A 46 % · C dentro A 46 % · B↔C 49 %** | **giusto**, ed è il numero da tenere |

Il pavimento è il chrome condiviso — brief, footer, segnaposto, `wrap` — quindi ~45 % è vicino a
quanto si può scendere senza duplicare il form.

| | A «lo studio» — `/` | B «il foglio» — `/opzione-b` | C «le bande» — `/opzione-c` |
|---|---|---|---|
| **Meccanismo** | un **foglio stampato**: non si muove, dichiara. L'audacia sta nella scala — 7,3× di contrasto, display 132 | una **tavola da disegno**: la griglia di costruzione attraversa la pagina, le fasi sono **pinnate** — il pannello resta fermo e le fasi gli passano accanto, ognuna accende il suo disegno | **il colore fa il ritmo.** I blocchi si toccano e cambiano superficie; non c'è spazio bianco fra un blocco e l'altro, e non c'è **niente** che si muove |
| **Guscio** | `components/sezioni/Sezione.tsx`: sezioni separate dal vuoto, **tre passi** 48 · 96 · 200 | nessun guscio: il **foglio** è il contenitore, e i blocchi si appoggiano alla griglia tratteggiata a 13,5 / 17 / 85 / 86,5 % | nessun guscio e **nessun `max-width`**: margine 20 px e bande da bordo a bordo |
| **Funnel** | smistamento a cinque bottoni sopra la piega, brief da «passo 1 di 5» | l'**invito prima della galleria**, come nella reference; il brief parte da «passo 1 di 5» | **niente** sopra la piega: C vende con le bande e chiede alla fine |
| Token | `paper #FFFFFF · ink #000000 · muted #5E5E5E · line #757575` | `paper #ECECEC · surface #F3F5F1`, e una rampa di **una sola tinta** (20°, sat 24 %): `ink #6F5142 · muted #876352 · ink-display #9D7460`, più l'**ambra `#D98E36` come superficie** | `paper #DBDBD8 · ink #171716 · muted #6D5C5C`, **granata `#593939`**, mauve `#937D7D`, banda `#2E2D2B` |
| Accento | `timbro #123C7A`, **solo** sui segnaposto di A | l'ambra **non è un accento: è una superficie** — riempimenti, squadrette, il blocco nel logotipo, il fondo del bottone. Dove deve essere testo su carta entra `#965E1C` | nessuno: il granata **è una banda**, non un accento |
| Font | **Archivo** (`wght` 400-600 + `wdth` 62-100): il display si comprime | **Montserrat sola** `wght 300:700` (33,4 KB) — misurato: 60 nodi di testo su 60, e usa tutti e cinque i pesi | **General Sans** `wght 400:600` (24,3 KB) + **JetBrains Mono 400** (8,5 KB): misurato 298 nodi contro 34, e dove c'è un dato c'è la mono |
| Apparato | la quota: filetto + terminatore obliquo a 45° ISO 129-1 | i **segni di registro**: squadrette d'ambra agli angoli, e il **righello** con una tacca per fase. Le quote hanno terminatori **verticali**, non obliqui | la **targa**: pastiglia in mono maiuscolo, 1 px di bordo, 3 px di raggio, un punto pieno davanti. E la testa di sezione a **tre punti su un filetto** |
| Testata | lockup + menu-frase con le virgole, barra **sticky** | marchio a sinistra, menu a destra in maiuscolo su una **pastiglia che compare scorrendo** (opacità di uno `::before`, `animation-timeline: scroll(root)`) | marchio, **pastiglia granata `MENU`**, menu **centrato sulla finestra**. A 390 la pastiglia passa a destra |
| Movimento | nessuno | **due gesti allo scorrimento, tutti in CSS** (le fasi pinnate e la pastiglia della testata) più **uno al puntatore**: il mirino CAD, che è l'unico JavaScript di movimento del progetto — misurato, **zero KB** di crescita del bundle | **nessuno**, e non per risparmio: quella pagina non ha un gesto di scorrimento, il suo effetto è il cambio di superficie |
| Puntatore | quello di sistema | **sostituito**: `cursor: none` e il mirino di un programma di disegno — quattro tratti con 7 px di vuoto al centro, la finestra di selezione da 8 px, la lettura di coordinate in mm, e un anello da 52 px sopra gli elementi interattivi (n. 53). Si spegne su `prefers-reduced-motion`, su puntatore grosso, senza JavaScript e **sui campi del form** | quello di sistema |
| Copy (corpo, misurato) | 6.612 caratteri | **4.158** | **4.189** |
| Altezza a 1440 | 8.677 px | 10.184 | 8.331 |
| Ordine | hero foto → smistamento → progetti → servizi → come lavoriamo → **esploso SVG** → persone → territorio → brief → footer | copertina-foglio → quote → **invito** → galleria a colonne sfalsate → **fasi pinnate** → opere → persone → brief → footer | copertina → **due bande due-up** → citazione a due toni → servizi su banda scura → numeri → progetti → metodo → persone → brief → footer |

**I blocchi wow, e sono due per pagina al massimo** (§ Regole, 3): A l'esploso SVG e il
territorio; B le **fasi pinnate** e la galleria a colonne sfalsate; C non ne ha, e **è una
scelta** — la sua sorpresa è il primo cambio di banda.

**Deviazione dichiarata da § Homepage — sequenza dei blocchi**: quell'elenco descrive A. B e C
hanno blocchi e ordine propri, ed è ciò che la frase del committente sul funnel autorizza. Il
motivo è anche misurato: il corpo di B e di C sta sotto i 4.200 caratteri contro i 6.612 di A,
e una proposta con «molto meno copy e più media» non dice in home tutto quello che dice A.

**Il lorem ipsum, e l'altro lato del lorem ipsum.** In B e C i segnaposto di testo rendono
riempimento invece di `[[DA CLIENTE: …]]`, perché sono una demo di vendita (n. 41). Ma quelle
stringhe erano anche **la lista della spesa**: quindi la richiesta resta nel DOM in
`data-chiede`, e `node scripts/segnaposto.mjs --scrivi` la raccoglie dall'HTML buildato di
**tutte** le rotte e genera la sezione di `CONTENUTI-DA-CLIENTE.md`. Misurato: **28 richieste su
58 esistono solo dentro un `data-chiede`** — un `grep` sul codice ne perderebbe metà. In A i
segnaposto restano **visibili**, e sui **nomi delle persone** non si usa mai (n. 27 c).

**«Identico» non scavalca l'AA** (n. 49). Tutti e due i siti veri hanno testo sotto soglia — il
terracotta di ecoLINEAR a 3,49:1, la sua ambra a 2,26, il mauve di Halston a 4,13 — e la
correzione **tiene la tinta e la saturazione e muove solo la luminosità**, con il rapporto
scritto in coda a ogni token. E il **verso** di un token conta più del commento che lo
accompagna: `--regolo-ink` porta il valore che passa **sempre**, la tinta esatta sta in
`--regolo-ink-display` e la chiede solo il display.

Implementazione: `data-theme="a|b|c"` sull'`<html>` della route, token nel blocco `@theme inline`
di `app/globals.css` (Tailwind v4 non ha più un `tailwind.config`). **Le varianti si passano dal
layout o dalla pagina** — che è dove il tema si sceglie: è composizione, non un `if` sul tema nel
markup. E **nessuna variante porta il nome di una proposta**: `'lockup' | 'destra' |
'pastiglia'`, non `'a' | 'b' | 'c'`. **I fogli di stile sono tre e disgiunti** —
`sezioni.css` (A), `ecolinear.css` (B), `halston.css` (C): qualche regola è duplicata, ed è il
prezzo dichiarato (n. 45), perché finché due proposte scrivono nello stesso file vestire l'una è
ricolorare l'altra. **Un piano scuro ridichiara `--regolo-*` e `--color-*`** (n. 50): il `var()`
di `@theme inline` si risolve su `:root` una volta sola. Dopo la decisione, le due rotte non
scelte si eliminano (fase 5): non restano tre home in produzione, e con quelle sparisce anche il
debito del preload (`/opzione-b` e `/opzione-c` scaricano l'Archivo di A che non usano, perché
Turbopack fonde i `@font-face` dei temi in un chunk solo).

## SEO, GEO, legal — il minimo deciso

- Answer capsule, entità, 12 domande della baseline GEO, legal: in `kit/REGOLO_SEO-GEO-LEGAL.md`.
- Crawler di addestramento: default **consentiti** (decisione n. 9). Nessuna riserva TDM.
- Pagine: `/privacy`, `/cookie`, `/note-legali` dai template della skill `sito-seo-geo-legal`.
  Nessun banner (analytics senza cookie), nessun iframe di terzi (mappa statica).
- Ordini professionali: sezione e numero in pagina e in `Person.hasCredential`, quando arrivano.

## Consegna

Per FT e per il cliente: `kit/REGOLO_Due_Opzioni.md`. Alla fine: skill `sito-consegna`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
