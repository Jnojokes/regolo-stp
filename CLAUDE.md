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

## Direzione visiva — rifatta dalle prove, fase 3 bis (07-08/09/2026)

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
| A | **Studio Foundry** *(uscita alla 3 bis, rientrata alla 3 ter)* | era uscita perché i suoi token misurati sono i cluster 1 e 5; **rientra scelta per nome dal committente** (`DECISIONI.md` n. 37) ed è il sistema dell'opzione C. Quello che dà: la fotografia a piena finestra con tutto il resto sopra, il marchio che le passa sopra da bordo a bordo, i metadati ai due estremi della riga |
| — | Nabil Issa *(fuori)* | il suo gesto è già nel progetto via tier B; quello che aggiungerebbe è cluster 2 + cluster 5, più un banner cookie |
| narrativa | Eladio Dieste | la **linea di quota come struttura**, l'asse verticale delle fasi, la luce radente, e la regola: l'accento viene dal materiale, non da un catalogo |
| B | ecoLINEAR · Pelizzari | impianto: le fasi al posto dei servizi, la CTA prima della galleria, la riga di metadati in tre tempi con l'azione al bordo |
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

**Le tre proposte, e le tre carte** (le decisioni n. 26 e n. 29 riguardavano l'inversione di B e
sono **storia**: B è uscita con la n. 39). Nessuna delle tre è l'inversione di un'altra, e non
per caso — l'inversione di figura e fondo era il modo in cui due passate avevano provato a
distinguere due proposte **cambiando un valore**, e non ha funzionato nessuna delle due volte.

```
A «Lo studio» — carta bianca      C «La fonderia» — carta calda    D «La monografia» — bianco
--paper   #FFFFFF                 --paper   #F3F0EC                --paper   #FFFFFF
--surface #FFFFFF                 --surface #FFFFFF                --surface #FFFFFF
--ink     #000000  21,00:1        --ink     #1B1B19  15,18:1       --ink     #000000  21,00:1
--muted   #5E5E5E   6,48:1        --muted   #6A665F   5,03:1       --muted   #4A4A4A
--line    #757575   4,61:1        --line    #B9B3A8   1,90:1 filo  --line    #5C5C5C  filo
--ph      #ECECE9                 --ph      #E7E2DA                --ph      grigio di campo
--timbro  #123C7A  10,75:1        --timbro  #123C7A   8,86:1       --timbro  #123C7A
--errore  #8E1B10   9,07:1        --errore  #8E1B10   8,15:1       --errore  #8E1B10
```

Il **nero** non porta più nessuna differenza fra le proposte — era il difetto della 3 bis, dove
ne portava il 100 % — e gli resta un compito solo: in D è la **banda a metà pagina**, il momento
grande dell'unica proposta che non si muove. È pieno, `#000000`: `#0B0B0B` e `#111` sono la tell
n. 5, e tre delle quattro reference misurate usano `rgb(0,0,0)`.

**La regola dei token legati al piano resta, e ha già ripagato una volta in questa passata.**
Chi cambia fondo ridichiara i token, e ridichiara **tutti e due i prefissi** — `--regolo-*` e i
gemelli `--color-*` — perché `@theme inline` risolve i `var()` sulla radice una volta sola.
Spacchettando i fogli di stile ho perso il blocco che lo faceva sul footer scuro di C, e il
collaudo l'ha ritrovato in due righe: `3,02:1` su una voce e **`1:1` sull'annotazione**, cioè
nero su nero. Il blocco è tornato in `app/css/fonderia.css` con il commento che spiega perché
esiste.

Il fuoco non è mai colorato — è inchiostro sulla carta e carta sull'inchiostro, quindi 21:1 per
costruzione. Ogni rapporto è verificato **sul DOM vero** con
`node scripts/collaudo/contrasto-dom.mjs`: **102 coppie distinte su 8 rotte, zero sotto soglia**.
Il `theme-color` di ogni layout è la carta del proprio tema e va tenuto allineato a mano.

### Tipografia — una famiglia display per tema, e le soglie sono misurate

- **A: Archivo** (OFL, `wght` 400-600 + **`wdth` 62-100**, 40,7 KB) · **C: Elsie 900** (11,2 KB)
  per il display, Inter per il corpo, IBM Plex Mono sotto i 14 px · **D: Anybody Wide**
  (`wdth 150 / wght 900`, statico, **11,6 KB**) per il masthead, Inter, Plex Mono, e **Caveat una
  volta sola** in tutta la pagina. Si generano con `bash scripts/genera-font.sh`.
- **Il masthead allargato di D e l'interlinea 1,0 di Storey sono la stessa decisione** (n. 43).
  Il committente ha chiesto due cose in due momenti — *«font più display e allargato»* e *«le
  interlinee che si sovrappongono vanno ampliate»* — e misurando i file veri sono un problema
  solo: Storey ha «interlinea 1,0 esatta a ogni corpo display», e con Inter quel valore è
  **irriproducibile** (soglia 1,232 nel caso peggiore). Anybody a `wdth 150` è l'unico candidato
  che dà insieme il masthead esteso e una soglia bassa, e costa **7,8 KB meno** del file
  variabile di Anybody uscito con l'opzione B: è la seconda scelta della fase che restituisce
  budget invece di spenderlo.
- **Il corpo non è un gradino di scala dove deve toccare i due margini.** Il marchio di C e il
  masthead di D si calcolano sull'**avanzamento misurato** del carattere:
  `calc((100vw − 2×margine) / 6.44)` per «REGOLO STP» in Elsie, `/ 6.282` per «REGOLO» in Anybody
  Wide, letti da `hmtx` con fontTools. Il metodo conta: la prima versione del marchio di C usava
  un moltiplicatore stimato e si fermava **114 px prima** del margine destro — 162 contro 60 a
  sinistra, misurato — mentre nella reference lo scarto fra i due margini è 18 px.
- **L'asse di larghezza è la leva del mobile** in A, e ha una ragione funzionale: a 390 px il
  contrasto di scala estremo si ottiene solo se il display può stringersi, che è il gesto del
  disegnatore quando comprime la scritta per farla stare dentro una quota. Nella hero di A
  «Progettiamo e dirigiamo.» sta a `wdth 100` e «Dal disegno al cantiere.» a `wdth 75`: stessa
  famiglia, stesso corpo, due larghezze. **A comprime; C non ha l'asse (Elsie è statico) e D lo
  ha istanziato al massimo dentro il file**, quindi non c'è niente da disapplicare.
- **La monospace c'è, e solo sotto i 14 px.** Non è un ripensamento sul divieto della 3 bis
  («monospace per le etichette dati» è il cluster n. 5): è che le tre reference portate dal
  committente hanno tutte lo stesso gesto — lineare editoriale più mono tecnica — e la mono sta
  **solo** come annotazione, mai come contenuto. In A non c'è affatto: le sue cifre si
  incolonnano con `font-variant-numeric: tabular-nums` su Archivo, che ha `tnum`.
- **Nessun asse `ital`**: «una sola parola del titolo in corsivo» non è vietata, è tecnicamente
  impossibile.
- Trappola verificata con fontTools: il peso **di default** di Archivo è 600. Un corpo senza
  `font-weight` esplicito esce semibold, quindi `lib/fonts/*.ts` dichiara `weight: '400 600'` e
  `@layer base` mette un `font-weight: 400` su `body`.

**Scala** — rapporto fitto 1,125 sul testo (il meccanismo misurato in refero), e la differenza
fra i temi è il **salto**: in A il display è *fuori* dalla scala; in C il marchio è una funzione
della finestra e non appartiene a nessuna scala; in D il masthead è la stessa cosa, e sotto di
lui la scala è quella misurata su Storey. Il corpo **non scala** da 320 a 1440.

| | A a 1440 | A a 390 | C a 1440 | D a 1440 |
|---|---|---|---|---|
| display | **132** (lh 0,86 · ls −0,018em) | 56 (lh 0,94) | **il marchio**: `(100vw−2m)/6,44` ≈ 209 (lh 1,1) | **il masthead**: `(100vw−2m)/6,282` ≈ 214 (lh 0,9) |
| titolo | 41 (lh 0,96) | 25,6 | 84 le opere (lh 1,1) · 44 le fasi | 44 (lh **1,16**) · 120 la banda (lh 1,0) |
| corpo | **18** (lh 1,5) | 18 | 17 | 17 |
| dato · micro | 14,2 · 12,6 | 14,2 · 12,6 | 11 la mono | 11 la mono (ls **−0,1em**) |
| **contrasto** | **7,3×** (= Storey misurato) | 3,1× | **19×** | **19,5×** |

Le spaziature sono **quattro valori, tutti negativi** (−0,030 / −0,018 / −0,015 / −0,010) più
lo zero del corpo: **nessun valore positivo, comprese le etichette piccole**. È l'unico punto
in cui le tre tier A vanno tutte contro il default (`+0,14em`, che è quello che c'era qui).

**L'interlinea è un numero misurato, e la regola non è «alza sempre».** Un testo che **il
browser manda a capo** non scende sotto la **soglia d'inchiostro** dei caratteri che lo
compongono: il punto più alto meno il punto più basso, in em, fra i caratteri che quella stringa
ha davvero. Tre cose la rendono diversa da come la si scrive di solito:

1. **è l'inchiostro, non la scatola di riga.** Quello che si tocca sono i contorni; `hhea`/`OS/2`
   descrivono la scatola e sbagliano nella direzione costosa — per Inter danno 1,210 dove
   l'inchiostro chiede 1,232 nel caso peggiore e **0,750** su «REGOLO STP»;
2. **in italiano l'alto non è la maiuscola: è l'accento sulla maiuscola.** In Inter la `E` sale a
   0,728 em e la `È` a **0,942**. Misurare la cap-height sbaglia di due decimi di em, che a 63 px
   sono 13 px, ed è esattamente il difetto che il committente ha visto nei titoli di D (63,36 px
   con interlinea 63,36);
3. **dipende dalla stringa, non da una categoria.** «Testo misto» contro «tutto maiuscolo» non
   regge: in Elsie il maiuscolo con accenti (`Ì` più la coda della `Q`) chiede 1,121, cioè *più*
   del testo misto, mentre «REGOLO STP» sta comodo a 0,729.

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
  l'asse è orizzontale (apparato al bordo destro, colonne 11-12); in **B è verticale**, un
  filetto al 34,4 % che attraversa dall'header al footer (al margine, 8 px, sotto i 56 rem:
  a 96 px passava in mezzo al testo — verificato in pagina).
- Ritmo verticale su base 4, **tre passi** — 48 · 96 · 200 a 1440 — dichiarati solo in alto:
  lo spazio fra due blocchi appartiene al secondo. Mai lo stesso padding fra tutti i blocchi.
- Misura della prosa: 34 rem (A) · 30 rem (B). Mai su più di una colonna.
- Fotografia a piena larghezza, **mai in cornice**, e quando c'è sborda da **un** lato solo.
- Angoli vivi, niente ombre morbide, niente gradienti — unanime nelle tre tier A.

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
  rimetterlo in pagina alla prossima lettura: `<Parola>`, `HeroDomanda` e i quattro rami
  `tabella`/`sequenza`/`dati`/`registro` sono usciti con B, e con loro il 30 % delle classi
  condivise fra C e D.

**Quando arriva il logo del cliente, questi valori si rivedono** (decisione n. 5). Lo slot per
il colore del marchio è **uno**: il segno sulla voce corrente del menu. Non inventare un logo.

## Regole non negoziabili

1. **Non inventare contenuti del cliente.** Nessun progetto, nome, numero, testimonianza o
   dato inventato, nemmeno come esempio "realistico". In **A e nelle pagine interne** i
   placeholder si scrivono in modo inequivocabile e **si vedono**:
   `[[DA CLIENTE: nome progetto]]`.
   *Eccezione dichiarata, solo per le proposte C e D* (decisione n. 41): sono una demo di
   vendita, e lì il segnaposto rende **lorem ipsum**. La regola non si toglie, si **circoscrive**,
   e con una condizione che è il punto: la richiesta resta nel DOM in `data-chiede`, e
   `node scripts/segnaposto.mjs --scrivi` la raccoglie dall'HTML buildato di **ogni** rotta e
   genera la sezione di `CONTENUTI-DA-CLIENTE.md`. È **più robusto** del `grep` che sostituisce —
   misurato: 29 richieste su 61 esistono solo dentro un `data-chiede`, e cinque `[[DA CLIENTE`
   stavano fuori dal componente, quindi il vecchio gancio non le vedeva. **Sui nomi delle
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
  i `[[DA CLIENTE: …]]` visibili di A e i `data-chiede` di C e D. Il resto del file — bloccanti,
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

FT vende con più toni; il cliente sceglie (`DECISIONI.md` n. 1). Erano quattro; **l'opzione B è
uscita** (n. 39), e non per gradimento: era la proposta da cui C e D erano nate per
ricolorazione, e finché stava in mezzo il confronto in call si giocava su tre schede che si
somigliavano.

**Cade anche il vincolo «stesso contenuto, stesso ordine, stesse parole»** con cui erano nate C e
D. Il committente: *«l'impianto del funnel tra le diverse opzioni può essere diverso comunque»*.
Era quel vincolo a produrre tre pagine che si somigliano — e l'argomento con cui lo si difendeva
(«contenuto identico è la condizione perché il cliente giudichi la lingua visiva») è giusto in
astratto e sbagliato qui: tre schede che in miniatura si somigliano non sono tre proposte.

| | Da dove viene | Come si riconosce in tre secondi |
|---|---|---|
| **A** «Lo studio» — `/` | il progetto, fase 3 bis | carta bianca, payoff a 132 px, la fotografia accanto al testo |
| **C** «La fonderia» — `/opzione-c` | Studio Foundry | carta calda quasi vuota, il marchio in serif da bordo a bordo, **una scheggia di fotografia che si apre scorrendo** |
| **D** «La monografia» — `/opzione-d` | Storey Architecture (i valori) + la monografia stampata (il tono) | fotografia a piena finestra, tipo piccolo, e poi **un fascicolo**: frontespizio, folio, `fig. n`, colophon |

I prototipi del kick-off stanno in `kit/opzioni/`: sono il brief visivo di A, non di C e D.

**La regola che governa questa tabella, e che tre passate hanno violato: le proposte devono
differire per come FUNZIONANO, non per come sono colorate.** Il criterio di accettazione è un
numero misurato sul build — **classi CSS condivise** — e la storia è questa: 97 % → 94 % → 91 %,
con la correzione che ogni volta toccava un *valore* (la palette, il carattere, il nero) dove
serviva un *meccanismo*. Alla 3 quinquies la separazione è strutturale — tre gusci, tre fogli di
stile, tre funnel — e il numero è sceso a **C dentro D 73 %, D dentro C 61 %**, contro un
pavimento di ~60 % che è il chrome condiviso (brief, footer, segnaposto).

| | A «Lo studio» — `/` | C «La fonderia» — `/opzione-c` | D «La monografia» — `/opzione-d` |
|---|---|---|---|
| **Meccanismo** | un **foglio stampato**: non si muove, dichiara. L'audacia sta nella scala — 7,3× di contrasto, display 132 | **lo scorrimento.** La fotografia è una scheggia che si apre, il volume si separa, il testo del metodo entra: il movimento **porta contenuto** | un **fascicolo rilegato**: non si muove niente. Una sola eccezione, e ripara un difetto — il prima/dopo che senza JS resterebbe fermo a metà |
| **Guscio** | `components/sezioni/Sezione.tsx`: sezioni separate dal vuoto, **tre passi** 48 · 96 · 200 | `components/fonderia/Colata.tsx`: **una lastra per finestra** e il vuoto in mezzo. Nessun passo dichiarato: il ritmo è l'altezza della finestra (misurato: l'84 % della reference è carta vuota) | `components/monografia/Segnatura.tsx`: **pagine di fascicolo** — occhiello corrente, folio al margine esterno, misura su due colonne. Il vuoto è **disuguale per dichiarazione** (`--respiro` 1 · 2,2 · 2,8) |
| **Funnel** | smistamento a cinque bottoni sopra la piega, brief da «passo 1 di 5» | **niente**, sopra la piega: C vende con le fotografie, come la reference, e il brief parte da «passo 1 di 5» | **l'indice**: sei voci che *sono* il passo 1 (`form="brief-form"`), quindi il brief comincia a «passo 2 di 5», **zero byte di JavaScript** |
| Token | `paper #FFFFFF · ink #000000 · muted #5E5E5E · line #757575` | la **carta calda**: `paper #F3F0EC · ink #1B1B19 · muted #6A665F` | bianco puro, e il **nero** per la banda a metà pagina |
| Accento | `timbro #123C7A`, **solo** sui segnaposto di A | idem | idem |
| Font | **Archivo** (`wght` 400-600 + `wdth` 62-100): il display si comprime | **Elsie 900** (11,2 KB) per il display + Inter per il corpo + Plex Mono sotto i 14 px | **Anybody Wide** `wdth 150 / wght 900` (11,6 KB) per il masthead + Inter + Plex Mono + **Caveat una volta sola** |
| Apparato | la quota: filetto + terminatore obliquo a 45° ISO 129-1 | la **riga di metadati ai due estremi**, con il vuoto in mezzo e la lastra che la taglia | la **didascalia numerata** `fig. 03` più il **folio**. Una quota misura; una didascalia nomina |
| Testata | lockup + menu-frase con le virgole, barra **sticky** | tre celle sulla carta, menu **centrato**, pastiglia «contatti» — **in flusso**, scorre via, e la sostituisce una pastiglia `MENU` fissa in basso a destra | le stesse tre celle ma **sopra la fotografia**, e ci resta |
| Copy (corpo, misurato) | 6.593 caratteri | **2.029** | **3.450** |
| Ordine | hero foto → smistamento → progetti → servizi → come lavoriamo → **esploso SVG** → persone → territorio → brief → footer | copertina-scheggia → dichiarazione → cifre → **tre opere** → metodo → **volume 3D** → firme → brief → footer | copertina → **frontespizio** → indice → **tre tavole** → metodo → banda nera → **prima/dopo** → ritratti → **colophon** → brief → footer |

**I blocchi wow, e sono due per pagina al massimo** (§ Regole, 3): A l'esploso SVG e il
territorio; C la **colata** e il **volume in WebGL**, non adiacenti; D il **prima/dopo**.

**Deviazione dichiarata da § Homepage — sequenza dei blocchi**: quell'elenco descrive A. C e D
hanno blocchi e ordine propri, ed è ciò che la frase del committente sul funnel autorizza.
Escono da C la tabella dei sei servizi, il prima/dopo e il territorio; da D i sei servizi, i
numeri e il territorio. Il motivo è misurato: portavano 2.400 caratteri a testa per dire cose che
una proposta con «molto meno copy e più media» non deve dire in home.

**Il lorem ipsum, e l'altro lato del lorem ipsum.** In C e D i segnaposto di testo rendono
riempimento invece di `[[DA CLIENTE: …]]`, perché sono una demo di vendita (n. 41). Ma quelle
stringhe erano anche **la lista della spesa**: quindi la richiesta resta nel DOM in
`data-chiede`, e `node scripts/segnaposto.mjs --scrivi` la raccoglie dall'HTML buildato di
**tutte** le rotte e genera la sezione di `CONTENUTI-DA-CLIENTE.md`. Misurato: **29 richieste su
61 esistono solo dentro un `data-chiede`** — un `grep` sul codice ne perderebbe metà. In A i
segnaposto restano **visibili**, e sui **nomi delle persone** non si usa mai (n. 27 c).

Implementazione: `data-theme="a|c|d"` sull'`<html>` della route, token nel blocco `@theme inline`
di `app/globals.css` (Tailwind v4 non ha più un `tailwind.config`). **Le varianti si passano dal
layout o dalla pagina** — che è dove il tema si sceglie: è composizione, non un `if` sul tema nel
markup. E **nessuna variante porta il nome di una proposta**: `'lockup' | 'centrato' |
'pastiglia'`, non `'a' | 'c' | 'd'`. **I fogli di stile sono tre e disgiunti** —
`sezioni.css` (A), `fonderia.css` (C), `monografia.css` (D): qualche regola è duplicata, ed è il
prezzo dichiarato (n. 45), perché finché C e D scrivevano nello stesso file vestire l'una era
ricolorare l'altra. Dopo la decisione, le due rotte non scelte si eliminano (fase 5): non
restano tre home in produzione, e con quelle sparisce anche il debito del preload (`/opzione-c` e
`/opzione-d` scaricano l'Archivo di A che non usano, perché Turbopack fonde i `@font-face` dei
temi in un chunk solo).

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
