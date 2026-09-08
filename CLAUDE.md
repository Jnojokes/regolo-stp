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
| — | Studio Foundry *(uscita dal tier A)* | è la reference che i prototipi avevano già parafrasato, e i suoi token misurati sono i cluster 1 e 5. Restano due gesti: il marchio che si sovrappone alla foto, i metadati ai due estremi della riga |
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

**Le due opzioni sono lo stesso inchiostro con i ruoli scambiati** (decisione n. 26, che emenda
la n. 21). A è il **tavolo da disegno**: carta bianca, con due tagli netti verso il nero. B è la
**tavola**: nera dall'header al footer, con il contenuto denso su **fogli bianchi** appuntati
sopra. Il fondo medio che B aveva prima era difendibile sui numeri e non si vedeva.

**Ma il colore non è la differenza fra le due proposte, e crederlo è stato l'errore di due
passate** (decisione n. 29, che chiude la questione). Alla fase 3 bis il nero portava il **100 %**
della differenza — misurato: 123 classi CSS uguali su 165, `SiteHeader` byte-identico, 42 token su
98 con lo stesso identico valore, l'intero sistema di impaginazione compreso. Adesso ne porta
**zero**, e il valore resta `#000000` non perché sia il migliore ma perché è già stato cambiato
due volte e la terza correzione di un valore è l'errore da non fare. Al nero resta un compito
solo, e nessun altro colore lo farebbe: **è ciò che rende il foglio un oggetto** — su carta bianca
non puoi avere «un foglio», hai una pagina. La differenza vera sta in § Due opzioni, ed è di
meccanismo. Il rovescio di figura e fondo si riconosce comunque in una miniatura al 25 %
(`kit/reference/_dopo/PROVA-MINIATURA-25.jpeg`).

```
A «L'elevato» — la carta              B «Lo strumento» — la tavola
--paper   #FFFFFF  carta              --paper   #000000  la tavola
--surface #FFFFFF  = carta            --surface #FFFFFF  il foglio: la FIGURA, 21,00:1 dal fondo
--ink     #000000  21,00:1            --ink     #FFFFFF  21,00:1 — in B l'inchiostro è chiaro
--muted   #5E5E5E   6,48:1            --muted   #9A9A9A   7,46:1 sulla tavola
--line    #757575   4,61:1            --line    #5C5C5C   3,14:1 — filetto, MAI testo (1.4.11)
--ph      #ECECE9  superficie         --ph      #000000  campo sulla tavola, quindi bordato
--muted-invert #9A9A9A 7,46:1 su ink  --muted-invert #454A47  9,04:1 sul foglio
--timbro  #123C7A  10,75:1 su carta   --timbro  #93B7DE  10,07:1 sulla tavola
--timbro-soft #E7ECF6                 --timbro-soft transparent (sulla tavola il canale è il filetto)
--errore  #8E1B10   9,07:1 su carta   --errore  #F08C7A   8,74:1 sulla tavola
--btn: inchiostro su carta (A)        --btn: il foglio sulla tavola (B) — verso invertito
```

**In B i token sono legati al PIANO, non alla pagina.** È la regola che fa funzionare
l'inversione, e senza di lei l'opzione B è illeggibile: un elemento non sa su quale piano si
trova, quindi è il piano a ridichiarare i token. Chi *è* un foglio sta in un elenco solo, in
`app/globals.css` (blocco «B: i token sono legati al PIANO»), con due trappole già pagate: non
si ridichiara `--regolo-surface` — il foglio si dipinge con quello — e non entra in lista chi usa
`--color-ink` come **fondo** (la barra della proposta è chrome invertito, non un foglio). Il
foglio ridichiara i `--regolo-*` **e** i gemelli `--color-*`, perché `@theme inline` risolve i
`var()` sulla radice una volta sola: misurato sul pannello, `--regolo-ink: #000` e
`--color-ink: #fff` insieme, cioè testo bianco su foglio bianco.

Il nero è **pieno**: `#0B0B0B` e `#111` sono la tell n. 5, e tre delle quattro reference
misurate usano `rgb(0,0,0)`. Il fuoco non è mai colorato — è inchiostro sulla carta e carta
sull'inchiostro, quindi 21:1 per costruzione. Ogni rapporto qui sopra è verificato con
`node scripts/contrasto.mjs` (72 coppie distinte su 7 pagine, zero sotto soglia), e il valore
misurato sta in coda a ogni token in `globals.css`. Il `theme-color` dei due layout è la carta
del proprio tema — `#FFFFFF` e `#000000` — e va tenuto allineato a mano: era rimasta la palette
del kick-off su tutte e otto le rotte.

### Tipografia — una famiglia per tema, zero monospace

- **A: Archivo** (OFL, `wght` 400-600 + **`wdth` 62-100**) · **B: Anybody** (OFL, `wght` 400-600,
  `wdth` **istanziato via dentro il file**). Si generano con `bash scripts/genera-font.sh`:
  **40,6 KB e 19,0 KB**, un file per rotta, contro i 60,8 (A) e 138,3 (B) di prima.
- **Il carattere di B si sceglie su una metrica, non su un genere** (decisione n. 30). Archivo e
  Chivo — il carattere che B aveva — hanno la **cap-height identica al millesimo, 0,686**: alla
  stessa dimensione nominale depositano la stessa quantità di nero, ed è per questo che a occhio
  erano lo stesso carattere. La regola: **Δ x/cap ≥ 5 % da Archivo**, e sotto non si sceglie.
  Anybody sta a +14,6 %. La mossa ovvia — uno slab, «cambio genere» — è misurata e scartata:
  Bitter sta a −1,4 %, cioè *più vicino* di Chivo.
- **L'asse di larghezza è la leva del mobile**, e ha una ragione funzionale: a 390 px il
  contrasto di scala estremo si ottiene solo se il display può stringersi, che è il gesto del
  disegnatore quando comprime la scritta per farla stare dentro una quota. Nella hero di A
  «Progettiamo e dirigiamo.» sta a `wdth 100` e «Dal disegno al cantiere.» a `wdth 75`: stessa
  famiglia, stesso corpo, due larghezze. **A comprime, B no** — ed è una delle differenze fra
  le due proposte.
- **Niente monospace.** Archivo e Anybody hanno `tnum` e cifre già di larghezza fissa: le colonne
  di numeri si incolonnano con `font-variant-numeric: tabular-nums`. Via JetBrains Mono, −31 KB
  e una tell del cluster 5 in meno.
- **Nessun asse `ital` nei due file**: «una sola parola del titolo in corsivo» non è vietata, è
  tecnicamente impossibile.
- Trappola verificata con fontTools: il peso **di default** è 600 (Archivo). Anybody in sorgente
  ha `usWeightClass 100` — un corpo senza `font-weight` uscirebbe *filiforme*, che è peggio del
  semibold — ma dopo `varLib.instancer wght=400:600` diventa 400. Il `font-weight` esplicito resta
  comunque obbligatorio.

**Scala** — rapporto fitto 1,125 sul testo (il meccanismo misurato in refero), e la differenza
fra i temi è il **salto**: in A il display è *fuori* dalla scala, in B non c'è nessun salto.
Il corpo **non scala**: 18 px in A e 17 px in B da 320 a 1440.

| | A a 1440 | A a 390 | B a 1440 | B a 390 |
|---|---|---|---|---|
| display | **132** (lh 0,86 · ls −0,018em) | 56 (lh 0,94) | **43,6** (lh 1,0) | 30,6 |
| titolo | 41 (lh 0,96) | 25,6 | 30,6 (lh 1,1) | 24,2 |
| sezione / sottotitolo | 32,4 · 22,8 | 24,2 · 20,3 | 19,1 · 19,1 | 19,1 · **17,0** |
| corpo | **18** (lh 1,5) | 18 | **17** | 17 |
| dato · micro | 14,2 · 12,6 | 14,2 · 12,6 | 13,4 · 12,6 | 13,4 |
| **contrasto** | **7,3×** (= Storey misurato) | 3,1× | **2,6×** (= AS misurato) | 1,8× |

Le spaziature sono **quattro valori, tutti negativi** (−0,030 / −0,018 / −0,015 / −0,010) più
lo zero del corpo: **nessun valore positivo, comprese le etichette piccole**. È l'unico punto
in cui le tre tier A vanno tutte contro il default (`+0,14em`, che è quello che c'era qui).

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

**Quando arriva il logo del cliente, questi valori si rivedono** (decisione n. 5). Lo slot per
il colore del marchio è **uno**: il segno sulla voce corrente del menu. Non inventare un logo.

## Regole non negoziabili

1. **Non inventare contenuti del cliente.** Nessun progetto, nome, numero, testimonianza o
   dato inventato, nemmeno come esempio "realistico". I placeholder si scrivono in modo
   inequivocabile: `[[DA CLIENTE: nome progetto]]`, e ogni placeholder va elencato in
   `CONTENUTI-DA-CLIENTE.md`.
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
7. **WOW 1 — esploso strutturale** — SVG a livelli (fondazioni → struttura → involucro → impianti → finiture) che si separano allo scroll. **In SVG, non in 3D.** Su mobile: sequenza di step con i livelli che si accendono uno alla volta.
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

- `CONTENUTI-DA-CLIENTE.md` — ogni `[[DA CLIENTE: …]]` presente nel codice, con la pagina
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

## Le quattro opzioni di homepage (fino alla fase 5)

FT vende con più toni; il cliente sceglie (`DECISIONI.md` n. 1 e n. 36). **Quattro proposte, uno
stesso contenuto**: stessi blocchi, stesso ordine, stesse parole. È la condizione perché il
cliente giudichi la *lingua visiva* e non quattro pagine diverse — e perché, in call, passare da
una scheda all'altra sia la dimostrazione.

| | Da dove viene | Come si riconosce in tre secondi |
|---|---|---|
| **A** «Lo studio» — `/` | il progetto, fase 3 bis | carta bianca, payoff a 132 px, fotografia |
| **B** «Il manifesto» — `/opzione-b` | Outsource Consultants | carta osso, bande **indaco** a piena larghezza, display 160 |
| **C** «La parete» — `/opzione-c` | Iad-lab | **carbone**, due parole colossali che sbordano, tre puntini al posto del menu |
| **D** «Il marmo» — `/opzione-d` | IDHEAL | marmo bianco, masthead 105, **il corpo è un serif**, filetti magenta | I prototipi stanno nel repo, in
`kit/opzioni/REGOLO_Opzione_A.html` e `kit/opzioni/REGOLO_Opzione_B.html`: sono il brief visivo.

> **L'opzione B è stata rifatta alla fase 3 ter** (08/09/2026, decisioni 28-34). La riga qui sotto
> è quella corrente. L'ordine dei blocchi non è cambiato; è cambiato **il modo in cui B
> funziona**, e il perché sta in `STATO.md` § Fase 3 ter.

**La regola che governa questa tabella, e che due passate hanno violato: le due proposte devono
differire per come FUNZIONANO, non per come sono colorate.** Alla fase 3 bis B era A con il
negativo, e il difetto era misurabile: 123 classi CSS uguali su 165, `SiteHeader` byte-identico,
il brief con sei righe di diff su 267 elementi, e **42 token su 98 con lo stesso identico valore**
— l'intero sistema di impaginazione compreso. Correggere un valore (il grigio, poi il nero) non
poteva bastare, e non è bastato due volte.

| | A «Lo studio» — route `/` | B «Il manifesto» — route `/opzione-b` |
|---|---|---|
| **Meccanismo** | un **foglio stampato**: dichiara, sempre uguale a chiunque. L'audacia sta nella **scala** — 7,3× di contrasto, display 132 | **la pagina risponde.** Le sei righe della hero *sono* il passo 1 del brief (`form="brief-form"`): scegliendo si apre il pannello, la riga della scheda resta a inchiostro pieno e le altre si attenuano, il brief comincia a «passo 2 di 5». **Zero byte di JavaScript**, e A non lo può fare per costruzione |
| **Guscio** | `components/sezioni/Sezione.tsx`: sezioni separate dal vuoto, **tre passi** 48 · 96 · 200 | `components/campo/Campo.tsx`: **campi contigui** divisi da un filetto. Niente ritmo verticale — `--regolo-appeso` 12 px, e lo spazio fra due campi è quello che il contenuto occupa, quindi gli intervalli escono disuguali *per costruzione*. Un solo silenzio, davanti al brief |
| Impianto | un piano solo, la carta, con due tagli netti verso il nero | **bande a piena larghezza** che alternano superficie — osso · INDACO · osso · INDACO · osso · fotografia a 100vw · osso · INDACO. È il cambio di superficie a fare il ritmo, dove A usa tre passi di spazio bianco (decisione n. 35) |
| Token | il **tavolo da disegno**: `paper #FFFFFF · ink #000000 · muted #5E5E5E · line #757575` | la **carta osso**: `paper #E8E6E0 · ink #000000 · muted #4A4A4A · line #5C5C5C`, più `indaco #1925AA` |
| Accento | `timbro #123C7A`, **solo** sui segnaposto | l'indaco **non è un accento: è una superficie.** Riempie bande intere, porta il titolo in bianco, e **non entra mai nel fondo di un bottone**. Il `timbro #123C7A` resta sui soli segnaposto |
| Font | **Archivo** (`wght` 400-600 + `wdth` 62-100): il display si comprime | **Anybody** 19,0 KB (scelto sul **Δ x/cap**, +14,6 % da Archivo) + **IBM Plex Mono** 13,5 KB **solo sotto i 14 px**. La gerarchia si fa **con la sola dimensione**: una famiglia da 12 a 160 px, nessun secondo peso |
| Apparato | la quota è una **linea di misura**: filetto + terminatore obliquo a 45° ISO 129-1 | la quota è una **riga di documento**: etichetta a sinistra, valore incolonnato a destra, **nessun terminatore**. Un documento non disegna quote su se stesso |
| Testata | lockup + menu-frase con le virgole, barra **sticky** | **cartiglio**: tre celle sulla griglia dei campi, niente virgole, **non sticky** |
| Movimento | nessuno | **solo come risposta a un'azione.** Una eccezione, e ripara un difetto: il prima/dopo che senza JS resterebbe fermo a 50 % |
| Ordine | hero foto → smistamento → progetti → servizi → come lavoriamo → **esploso SVG** → persone → territorio → brief → footer | **hero-domanda con i percorsi** → numeri → sei percorsi (**tabella**) → come lavoriamo → progetti con dati duri → **prima/dopo** → persone → brief → footer + barra mobile |

Implementazione: `data-theme="a|b"` sull'`<html>` della route, token nel blocco `@theme inline`
di `app/globals.css` (Tailwind v4 non ha più un `tailwind.config`). **Le varianti si passano dal
layout o dalla pagina** — che è dove il tema si sceglie: è composizione, non un `if` sul tema nel
markup. E **nessuna variante porta il nome di una proposta**: `'ritratti' | 'registro'`, non
`'a' | 'b'`. Dopo la decisione, la route non scelta si elimina (fase 5): non restano due home in
produzione, e con quella sparisce anche il debito del preload (`/opzione-b` scarica 40 KB di
Archivo che non usa, perché Turbopack fonde i `@font-face` dei due temi in un chunk solo).

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
