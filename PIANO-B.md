# PIANO — opzione B, direzione nuova (fase 3 ter, 08/09/2026)

> File di lavoro di questa fase. Alla **fermata 2** il suo contenuto entra in `STATO.md`
> (la tabella blocco → reference) e in `DECISIONI.md` (le voci 28-34), e questo file si
> cancella. Fino ad allora è il piano approvato, e il codice non lo scavalca.
>
> Metodo: skill `sito-design` § 3, **due passate**. La § 1 è la prima passata. La § 2 è la
> seconda — quello che è cambiato rileggendo il piano contro `kit/reference/SCHEDA.md` e
> contro la lista di calibrazione. Ogni numero in grassetto è **misurato**, non riportato:
> le misure di font le ho rifatte con la pipeline vera del repo, quelle di somiglianza sul
> build in `.next/`.

---

## 0 · La diagnosi, in cinque cifre

FT ha detto che B non gli piace così. Non è un'impressione, ed è misurabile.

| Cosa | Misura |
|---|---|
| classi CSS distinte rese da A / da B / **condivise** | 172 / 165 / **123 → 74,5 %** |
| markup di B che è chrome condiviso (header + barra + brief + footer) | **26,9 KB su 51,7 → 52,0 %** |
| `SiteHeader` reso dalle due home | **1.343 byte, diff = 0 righe** |
| il blocco brief — «il più importante del sito» | **267 elementi, 6 righe di diff** |
| token dichiarati in `[data-theme='a']` e `['b']` | 97 / 98, **42 con lo stesso identico valore** |

I 42 token uguali sono il punto. Fra loro ci sono `--regolo-passo-corto/normale/largo`,
`--regolo-margine`, `--regolo-gutter`, `--regolo-wrap: 1440px`, `--regolo-colonne: 12`,
`--regolo-radius: 0px`: **l'intero sistema di impaginazione è byte-identico nei due temi.**
I soli token di impaginazione che differiscono sono quattro (`--regolo-asse`,
`--regolo-asse-frazione`, `--regolo-misura`, `--regolo-header-h`).

Da qui la conseguenza che chiude la diagnosi: **finché i due temi dichiarano lo stesso
insieme di nomi con gli stessi valori strutturali, qualunque cosa si cambi produce una terza
colorazione della stessa pagina.** È l'errore fatto due volte — prima il grigio medio, poi
l'inversione a nero — e sarebbe l'errore anche stavolta, con un carattere nuovo al posto di
un colore nuovo.

E la prova non è a 1440, è **a 390**: `_dopo/A-390-hero.jpeg` e `_dopo/B-390-hero.jpeg`
messe accanto sono la stessa pagina con l'inchiostro scambiato — stesso lockup, stessa barra
di proposta, e **la stessa identica striscia di quota**, gli stessi cinque ruoli impilati con
lo stesso terminatore obliquo alla stessa altezza. Non «simile»: lo stesso oggetto.

**La direzione, in una riga.** A è un **foglio stampato**: dichiara, sempre uguale a chiunque.
B è uno **strumento**: la pagina *risponde*. La riga scelta nella prima domanda si propaga da
sé — senza una riga di JavaScript — alla tabella dei sei percorsi, alle fasi, alla CTA e al
**passo 1 del brief, che è lo stesso gruppo di radio**. È l'unico meccanismo delle quattro
direzioni provate che **A non può avere per costruzione**: A è una fotografia più un payoff,
non ha una domanda, non ha uno stato da propagare.

---

## 1 · Prima passata — il piano

### 1.1 Colore — sei valori, e il fondo è congelato

**Il nero resta `#000000` e la questione si chiude.** Non perché sia il valore migliore: perché
il fondo di B è già stato cambiato due volte, e cambiarlo una terza è esattamente l'errore che
questa fase esiste per non fare. Bianco è la ricaduta che FT ha già bocciato; un terzo colore
è, per definizione, la terza correzione di un valore. **Quello che cambia non è il valore: è il
lavoro che gli si chiede.** Oggi il nero porta il 100 % della differenza fra le due proposte —
lo dicono le cinque cifre della § 0. Nel piano ne porta **zero**, e gli resta un solo compito,
che è strutturale e che oggi non sta facendo: **il nero è ciò che rende il foglio un oggetto.**
Su carta bianca non puoi avere «un foglio»: hai una pagina. Su una tavola nera un rettangolo
bianco rientrato ha un bordo, ha un margine attorno, sta *sopra* qualcosa.

| Nome | Valore | Ruolo | Contrasto (calcolato) |
|---|---|---|---|
| **tavola** | `#000000` | il fondo: pagina, header, margine di classificazione, silenzio, footer. Nero **pieno** — tre delle quattro reference misurate usano `rgb(0,0,0)`; `#0B0B0B` e `#111` sono la tell n. 5 | 21,00:1 con l'inchiostro chiaro |
| **foglio** | `#FFFFFF` | il documento: **una** colonna bianca continua dalla hero al brief. Bianco puro, non carta calda: Kononenko e AS misurano entrambi `#FFFFFF` (SCHEDA §1) | 21,00:1 dalla tavola |
| **grafite** | `#9A9A9A` sulla tavola · `#454A47` sul foglio | il secondario: apparato di margine, chiavi, sottotitoli | 7,46:1 · 9,04:1 |
| **costruzione** | `#5C5C5C` sulla tavola · `#767676` sul foglio | il filetto. **Mai testo**, su nessuno dei due piani | 3,14:1 · 4,54:1 (soglia 1.4.11 = 3:1) |
| **attenuato** | non è un colore: è `--regolo-attenua: 0.60` in `opacity` sull'inchiostro del piano | il canale con cui la pagina dice «questo campo non è quello in cui sei» | risultante 7,37:1 sulla tavola, 5,74:1 sul foglio — **0,60 è il pavimento e sta in un token**, perché a 0,50 si sfonda |
| **timbro** | `#123C7A` sul foglio · `#93B7DE` sulla tavola | l'inchiostro blu del tampone. **Un accento, in un posto solo**: i 29 segnaposto di B. Si consuma quando i contenuti arrivano | 10,75:1 · 10,07:1 |

Il timbro non entra mai in header, bottoni, stati, anello di fuoco, filetti, tabella, mappa.
Le tre tier A **non hanno accento cromatico** (misurato) e il `DESIGN.md` di refero lo scrive
come divieto.

> **Una trappola da mettere in coda al token, perché è controintuitiva e chiunque legga la
> scheda la reintrodurrà: l'opacità di AS non si trasporta su nero.** Bianco al 40 % su
> `#000000` dà `#666666` = **3,66:1**, sotto AA; al 20 % dà `#333333` = **1,66:1**. AS può
> usare l'opacità come unica gerarchia perché sta su bianco puro. Su due piani serve un
> pavimento dichiarato, ed è `0.60`.

### 1.2 Tipografia — **Anybody**, e il criterio conta più della famiglia

Il difetto non è che Chivo «somiglia» ad Archivo. È una metrica:

| | file nel repo | cap-height | x-height | **x/cap** | **Δ da Archivo** | peso di default |
|---|---|---|---|---|---|---|
| **Archivo** (A) | 40.692 B | **0,686** | 0,526 | 0,767 | — | 600 ⚠ |
| **Chivo** (B oggi) | 26.980 B | **0,686** | 0,511 | 0,745 | **−2,9 %** | 500 ⚠ |
| Bitter | 27.880 B | 0,698 | 0,528 | 0,756 | −1,4 % | 100 ⚠ |
| **Anybody** (proposto) | **19.476 B** | 0,675 | **0,593** | **0,879** | **+14,6 %** | **400** ✓ |

**Archivo e Chivo hanno la cap-height identica al millesimo: 0,686.** Alla stessa dimensione
nominale depositano la stessa quantità di nero, ed è *per questo* che in una schermata sono lo
stesso carattere. E **Bitter — la scelta ovvia, «cambio genere, prendo uno slab» — è più vicino
ad Archivo di quanto lo sia Chivo**: cambiarlo sarebbe stato *ridurre* la differenza percepita
mentre FT alterna due schede in call.

Quindi il criterio, che resta scritto anche se un giorno la famiglia cambia:
**la famiglia di B si sceglie sul Δ x/cap rispetto ad Archivo, e sotto il 5 % non si sceglie.**

**Anybody**, `wght 400:600`, **asse di larghezza bloccato a 100 nel file generato**:

1. È la famiglia **più lontana da Archivo** delle quattordici impaginate, sulla metrica che
   causa lo scambio. E si vede: la `e` ha il fianco piatto, la `a` **non ha coda**, la `z` ha i
   bracci orizzontali, i contrappunzoni sono rettangoli. `PROVINI.md` lo dice già:
   «grottesco **meccanico** … nessun'altra famiglia della lista somiglia a uno strumento».
2. **Costa meno di quello che c'è adesso**: 19.476 byte contro 26.980. **−7,3 KB sul percorso
   critico di un LCP che è testo**, e −21,2 KB rispetto ad Archivo. È l'unica scelta della
   passata che *restituisce* budget.
3. Bloccando l'asse di larghezza **dentro il file**, «A comprime, B no» smette di essere una
   regola di CSS e diventa un fatto fisico: verificato, il file generato contiene
   `fvar = [wght 400-600]` e basta. `font-stretch: 75%` in B non ha su cosa agire.
4. **Le trappole sono verificate, non ipotizzate.** Sorgente `usWeightClass = 100`; dopo
   `varLib.instancer wght=400:600` diventa **400** — misurato — quindi il corpo non esce
   filiforme (la trappola n. 5 sparisce, e il `font-weight: 400` esplicito resta comunque).
   `tnum` presente → l'assert di `genera-font.sh:92` passa e **niente monospace**. `fvar`
   presente → la riga 90 non solleva `KeyError`: **lo script non va aperto.** Tre file,
   cinque righe.
5. **La riserva di `PROVINI.md` («a 17 px il corpo è un po' strano») era formata su un'altra
   domanda** — *può essere il display di A a 96 px?* — e l'ho verificata ai corpi veri di B, su
   tavola nera e su foglio bianco: `kit/reference/_provini/provino-b2-1440.jpeg`. A 43,6 · 30,6
   · 17 · 13,4 regge su tutti e due i piani, e la x-height alta lavora **a favore** della
   tabella. Ripiego dichiarato adesso, così non si improvvisa: **Encode Sans** (−4,9 %,
   37,9 KB) → **Zilla Slab** solo riaprendo la regola con cui è uscito Geist. **Non** Bitter,
   **non** Young Serif, **non** Chivo: sono le tre che il numero esclude.

**Scala — quattro corpi, come AS.** 43,6 · 30,6 · 17 · 13,4 (+ 12,6 per la micro), contrasto
**2,6×**, nessun salto. Il corpo non scala da 320 a 1440. Le spaziature restano quattro valori
tutti negativi. Interlinea come funzione del corpo.

### 1.3 Impaginazione — il concetto in una frase

> **Una pagina sola e un documento solo: la tavola nera è il margine del disegno e porta
> l'apparato, il foglio bianco comincia al 34,4 % e non finisce più fino al brief, e i blocchi
> non sono sezioni separate da vuoto ma campi contigui divisi da un filetto.**

Il 34,4 % è misurato: Kononenko butta l'etichetta «Offices» nel margine vuoto a x≈417 e
comincia la tabella a **x=493 su 1440 = 34,2 %**.

Tre conseguenze, e sono le tre che valgono:

- **I tre passi verticali muoiono in B.** `--regolo-passo-corto/normale/largo` non esistono
  più in `[data-theme='b']`: al loro posto **`--regolo-appeso: 12px`, valore unico**, e lo
  spazio fra due campi **non è un token, è quello che il contenuto occupa**. Gli intervalli
  escono disuguali *per costruzione* — che è la lettura letterale del vuoto disuguale misurato
  su Storey — e nega alla radice l'aggiunta di casa «lo stesso padding fra tutti i blocchi».
  È la prima volta in tre passate che i due temi smettono di essere lo stesso sistema.
- **Un solo silenzio in tutta la pagina**: i 200 px di tavola davanti al brief. In A ce ne sono
  quattro. Quel vuoto resta un token, perché è l'unico posto in cui il vuoto è un'affermazione.
- **Un solo foglio, non otto.** Oggi `globals.css:434-441` elenca **otto** selettori che si
  dipingono di bianco su un fondo: sono card, cioè il **cluster 4 dentro la proposta che
  dovrebbe non averlo**. Diventa un foglio continuo, e la lista diventa
  `data-piano="tavola|foglio"` più due regole per i due **stati** (`.riga:hover`,
  `.riga:has(input:checked)`) — che un attributo statico non può esprimere.

#### Wireframe — 1440

```
▓ tavola #000000   ┃ foglio #FFFFFF   ┃ l'asse è il BORDO SINISTRO del foglio: 34,4 % = x 495
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓ REGOLO STP                             progetti, servizi, studio, contatti    ▓ 72
▓ Via Campiglione 2/E — 63900 Fermo (FM)                                        ▓
▓───────────────────────────────────────────────────────────────────────────────▓
▓ proposta · opzione B — «lo strumento»              …  guarda l'opzione A      ▓ 40
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ ← il foglio comincia
▓ 01                               ┃ Che intervento hai in mente?    43,6/1,0   ┃   e NON finisce più
▓                                  ┃                                            ┃
▓                                  ┃ Scegli il tuo caso: ti diciamo subito cosa ┃  CAMPO 01 — hero
▓                                  ┃ comprende, come si svolge e cosa serve da  ┃  (l'unico h1)
▓                                  ┃ parte tua.                       17/1,5    ┃
▓  progetto architettonico   progetto strutturale   direzione lavori …  5 ruoli ┃ ← la QUOTA-REGISTRO:
▓                                  ┃                                            ┃   attraversa i due piani,
▓ 01  progettazione e DL           ┃ ○ Casa nuova                               ┃   niente terminatori
▓ 02  interventi sull'esistente    ┃ ◉ Ristrutturazione o ampliamento  ‾‾‾‾‾‾‾  ┃ ← il filetto si traccia
▓                                  ┃    cosa comprende  come si svolge          ┃   sotto la riga scelta
▓                                  ┃    cosa serve da te                        ┃
▓                                  ┃    ▸ Raccontaci il progetto                ┃
▓ 03  pratiche e bonus             ┃ ○ Pratica o bonus                          ┃
▓ 04  struttura e sisma            ┃ ○ Struttura e sisma                        ┃
▓ 05  opere pubbliche              ┃ ○ Opera pubblica                           ┃
▓ 06  altro                        ┃ ○ Altro                     ← SEI righe    ┃
▓                                  ┠┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┨ ← filetto di campo:
▓ 02                               ┃   —       —        —        —              ┃   fra due campi NON
▓                                  ┃   anni  progetti   mq    comuni    12,6    ┃   c'è vuoto     CAMPO 02
▓                                  ┠┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┨
▓ 03                               ┃ Sei percorsi                     30,6      ┃  CAMPO 03 — LA TABELLA
▓                                  ┃ esito           tecnicismo    compr. serve  ruolo firmabile
▓ ← nessun filetto fra le righe    ┃ La tua casa…    progettazione…  (3)  (3)   progetto architettonico
▓   (AS: 25 righe, 7 colonne,      ┃ Ristrutturare…  interventi…     (3)  (3)   direzione lavori
▓    senza un filetto — misurato)  ┃ Mettere in sic… progettazione…  (3)  (3)   progetto strutturale
▓                                  ┃ Pratiche…       pratiche…       (3)  (2)   —
▓ ← CINQUE righe ad attenuato 0,60 ┃ Comfort…        termica…        (3)  [[DA CLIENTE]]
▓   la sesta è quella scelta sopra ┃ Opere pubbliche…lavori pubblici (3)  (2)   collaudo
▓                                  ┠┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┨
▓ 04   ▪ primo incontro            ┃ Come lavoriamo                             ┃  CAMPO 04 — le fasi
▓      ▪ fattibilità e costi       ┃ testo della fase                           ┃  a cavallo dell'asse
▓      ▪ progetto                  ┃ attenuata                                  ┃  (Dieste misurato:
▓      ▪ autorizzazioni            ┃ attenuata                                  ┃   la dimensione dice
▓      ▪ cantiere e DL             ┃ attenuata                                  ┃   l'importanza)
▓                                  ┠┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┨
▓ 05                               ┃ Progetti                                   ┃  CAMPO 05
▓  rapporti DIVERSI nella stessa   ┃ ┌──────────┐ luogo   direzione lavori      ┃  la copertina RESTA.
▓  fila (Kononenko: 1,59 · 0,69)   ┃ │  16/10   │ anno · mq · ruolo             ┃  Sborda dal SOLO
▓                                  ┃ └──────────┘ committente · impresa         ┃  margine destro
▓                                  ┃      ┌───────────────────────────────────────┤ (Storey: x = −36)
▓                                  ┠┈┈┈┈┈┴───────────────────────────────────────┘
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓·············································
▓  stato attuale — sulla TAVOLA            │ progetto — sul FOGLIO                    CAMPO 06 — IL WOW
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓·············································
▓                    [═════════════▓═════════════]  50 %                        ▓  taglio 21:1, piena
▓                                  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  larghezza — unica
▓ 07                               ┃ Le persone                                 ┃  eccezione all'asse
▓                                  ┃ ┌────┐ ┌──────┐ ┌───┐ ┌─────┐   altezze    ┃  CAMPO 07 — nessun
▓                                  ┃ │    │ │      │ │   │ │     │  DISUGUALI   ┃  media demo, nessun
▓                                  ┃ └────┘ │      │ └───┘ │     │              ┃  movimento
▓                                  ┃  nome  └──────┘  nome └─────┘              ┃
▓                                  ┃  ruolo · abilitazione                      ┃
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓            il foglio si interrompe: 200 px, l'UNICO silenzio                   ▓  (in A ce ne sono 4)
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
▓ 08                               ┃ Il brief                                   ┃  CAMPO 08 ★
▓                                  ┃  1 · tipo di intervento                    ┃  IL PASSO 1 NON
▓                                  ┃    Ristrutturazione o ampliamento · cambia ┃  ESISTE: è la hero.
▓                                  ┃  ─────────────────────  passo 2 di 5       ┃  Stesso name, attributo
▓                                  ┃  2 · dove                                  ┃  form → 0 KB di JS
▓                                  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
▓ Via Campiglione 2/E   0734 510329        P.IVA [[DA CLIENTE]]      ⊹ mappa     ▓  footer a tre tempi
▓ 63900 Fermo (FM)      mail · PEC         REA · orari                (SVG)      ▓  + quota 128 comuni
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

#### Wireframe — 390, **progettata, non compressa**

A 390 la banda di margine **sparisce** (decisione n. 24: a 96 px l'asse passava in mezzo al
testo). L'apparato non si accatasta sotto il contenuto: **si ribalta in una striscia di tavola
alta 20 px sopra ogni campo**, con lo stato spinto al bordo destro — la riga a tre tempi di
Pelizzari, misurata. Il foglio va a piena larghezza.

```
▓ REGOLO STP                menu ▓  header 72 · bersaglio 56×44 (già corretto)
▓ proposta · opzione B  › opz. A ▓
▓ 01 ·························· ▓  ← l'apparato è una STRISCIA di tavola, 12,6 px
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Che intervento hai in mente?  ┃  h1 30,6 / lh 1,0
┃ Scegli il tuo caso…      17   ┃  CAMPO 01
┃ progetto arch. … 5 ruoli      ┃  la quota-registro: due tempi, numero a destra
┃ ○ Casa nuova                  ┃  nome a 17, tecnicismo sotto a 12,6
┃ ◉ Ristrutturazione o ampl. ‾‾ ┃
┃   cosa comprende          (3) ┃  il pannello resta UNA colonna: le tre chiavi
┃   come si svolge          (3) ┃  diventano tre gruppi impilati, non tre
┃   cosa serve da te        (3) ┃  colonne da 100 px
┃   ▸ Raccontaci il progetto    ┃
┠┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┨
▓ 03 ····················· (6) ▓
┃ esito              ruolo      ┃  ← la TABELLA butta le colonne, non impila:
┃ La tua casa…    progetto arch.┃    dove AS a 390 tiene «No + Title», REGOLO
┃ Ristrutturare…  direzione lav.┃    tiene **titolo + RUOLO**, perché il ruolo
┃ …                             ┃    è il dato che CLAUDE.md vieta di omettere
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
▓ [ chiama │ WhatsApp │ raccontaci il progetto ]   barra fissa 22 % · 29 % · 49 %
```

### 1.4 Regola di allineamento — tre ancoraggi, e nessun quarto

1. Tutto il **contenuto** si allinea al **bordo sinistro del foglio** (34,4 %).
2. Tutto l'**apparato** — indice di campo, chiavi, conteggi — sta nel **margine di
   classificazione**, allineato al margine di pagina, sulla tavola.
3. Tutti i **numeri** vanno all'**estremo destro** della loro riga, con `tabular-nums` e il
   vuoto in mezzo (Pelizzari misurato: `2502` a sinistra, `View project` spinto a destra).

Niente centrato, mai. Niente giustificato.

### 1.5 Tre principi

1. **La pagina risponde.** Ogni cosa che si vede è la risposta alla domanda in cima. Chi non
   ha scelto niente vede tutto allo stesso livello; chi ha scelto vede la sua riga a inchiostro
   pieno e le altre al pavimento di attenuazione. Nessun JavaScript.
2. **Un documento, non delle sezioni.** Un foglio solo, campi contigui separati da un filetto,
   intervalli disuguali perché li decide il contenuto. Un solo silenzio, davanti al brief.
3. **L'apparato di B è più piccolo di quello di A, non più grande.** A è un manifesto con
   quattro barre nere e quasi niente in pagina: può permettersi un apparato che si vede. B è
   densa, e in una pagina densa ogni segno ripetuto diventa fondo. **In B un filetto esiste
   solo se delimita un piano o porta uno stato. Mai per annunciare un blocco.**

---

## 2 · Seconda passata — cosa è cambiato, e perché

Ho scritto **quattro** direzioni indipendenti dalle stesse prove — la scheda tecnica (AS), il
disegno al posto della foto (Kononenko), la linea di quota come struttura (Dieste), la pagina
che risponde — e le ho fatte giudicare da **dodici revisori** (tre lenti per direzione:
anti-default, differenza da A per meccanismo, brief e fattibilità), più un confronto finale che
le vedeva tutte. La parte che è servita di più non è chi ha vinto: è **quello che tutte e
quattro hanno sbagliato allo stesso modo.** Se quattro direzioni indipendenti fanno la stessa
scelta, quella scelta non è una scelta: è la mediana del modello. Sette casi, e tutti e sette
sono stati corretti.

| # | Cosa facevano tutte e quattro | Perché è la media | Cosa c'è al suo posto |
|---|---|---|---|
| 1 | **Toglievano dalla home di B i volti e le opere** (indice senza immagini, ritratti «moduli di rilievo», campi di testo) | È la mediana per «tecnico = serio», e su **questo** brief è commercialmente sbagliata: il sito è il **secondo** contatto, chi arriva sta decidendo se fidarsi, e in una STP di 2-10 persone a Fermo le due cose che chiudono quella decisione sono **le facce e le opere**. AS può avere una home senza immagini perché dietro l'indice ha 203 progetti veri | La fotografia **resta** e cambia ruolo (§ 3). I quattro campi ritratto restano in home come campi dichiarati con la specifica: **il campo ritratto vuoto è l'unico segnaposto della home che fa un lavoro vero** — è la lista della spesa che fa arrivare le foto |
| 2 | **Applicavano il datasheet di AS alla tabella progetti** (7 colonne) | `progettiVeri.length` = **0**, `content/progetti/` ha un solo file marcato `esempio: true`, e **cinque colonne su sette sarebbero `[[DA CLIENTE]]` su ogni riga**. In AS cinque colonne su sette sono piene sempre. E la mitigazione che tutte proponevano — «si mostra `/progetti`» — **è impossibile**: `/progetti` sta in `app/(a)`, si renderizza con Archivo su carta bianca | **La tabella va dove i dati ci sono**: i **sei percorsi** (sei righe, tutti i campi presenti, due colonne che si compilano da sole dagli enum) e le **cinque fasi**. I progetti restano campi dichiarati con la copertina. La frase da dire in call per prima: «*questa tabella si riempie da sé il giorno che ci mandate tre schede: il codice c'è già*» — `vociConConta()` è cablato e funziona a zero |
| 3 | **Spendevano l'apertura sulle animazioni in una rivelazione allo scorrimento** (`opacity 0→1` + `translateY` sfalsato) | È il pattern di movimento **più generato che esista sul web**. Chiamarlo «la compilazione» o «il plotter» non lo cambia: è il racconto sulla palette, spostato sul movimento | **In B nessuna animazione comincia perché la pagina ha scorso.** Il movimento è solo la **risposta a un'azione**. Una eccezione sola, e ripara un difetto: § 3 |
| 4 | **Sceglievano il carattere per genere** (due Bitter «cambio genere», due Chivo + un serif nei titoli) | Sono le due mosse più prevedibili che esistano, e **nessuna delle due risolve il difetto**: misurato, Bitter è **più vicino** ad Archivo di quanto lo sia Chivo | Il **criterio** al posto del genere: Δ x/cap ≥ 5 % da Archivo → **Anybody, +14,6 %** (§ 1.2) |
| 5 | **Rigonfiavano l'apparato** che `STATO.md` aveva appena potato: sette intestazioni ancorate · tre spessori + tacche + squadrette + retini · **tredici filetti a piena larghezza sopra i titoli** · otto indici di campo con stato | «Un motivo che sta ovunque non è una firma: è la texture della pagina, cioè la definizione del cluster 5». Un filetto sopra ogni titolo e un occhiello sopra ogni titolo **sono lo stesso gesto con un materiale diverso** | Il principio n. 3: l'apparato di B è **più piccolo** di quello di A. Controllo col grep: `<Quota` = **3** in B, e nessuna classe nuova che disegni un filetto orizzontale a piena larghezza sopra un titolo |
| 6 | **Lasciavano `BriefForm.tsx` identico e lo vestivano col CSS** (tutte e quattro) | Cioè: **l'ultima schermata delle due proposte — 267 elementi, l'unica azione primaria — restava la stessa in tutte e quattro.** Ed è anche il blocco che tre di loro mettevano per ultimo, dichiarando che se il tempo finisce si taglia lì | Il brief si fa **per primo**, ed è la propagazione (§ 3). Trenta righe su 559, zero righe di logica |
| 7 | **Nessuna sapeva che B è una pagina sola** | Progetti, servizi, studio, contatti e le legali stanno **tutte** in `app/(a)`. Ogni mitigazione del tipo «il meccanismo si vede aprendo `/progetti`» è vuota | Va scritto nel piano perché condiziona la regia della call, e perché alla fase 5 la rotta superstite eredita **le pagine interne di A** qualunque proposta vinca |

**E tre cose che ho tolto alla direzione vincente prima di scriverne una riga**, perché
sarebbero state default con un costume addosso:

- il **cartiglio fisso** a 1440 — una fascia in fondo alla finestra con la CTA sottolineata la
  si farebbe per qualsiasi brief, e `CLAUDE.md` prescrive la barra fissa **sotto** 768 px;
- **«un campo dichiara il proprio stato»** (`01 · vuoto`, `03 · proposta`) — la direzione si
  condannava da sola: «*un sito con l'archivio pieno non ha bisogno di un campo che dichiari di
  essere vuoto*». Quando i contenuti arrivano restano otto etichette `01…08` incolonnate accanto
  a otto titoli, cioè l'occhiello «SEZ. 01 —» traslato a sinistra. **Un'identità non può avere
  per motore uno stato transitorio del repo**;
- la **rietichettatura delle cinque fasi** con lo `svolge` del percorso scelto: `svolge` ha tre
  voci e le fasi sono cinque — servirebbero dieci frasi nuove sul metodo dello studio, cioè
  **contenuto del cliente inventato**. Regola non negoziabile n. 1.

**Quattro valori che non entrano nella lista delle differenze e in call non si nominano**:
gutter 24→32, `--regolo-header-h` 72→56, `--regolo-misura` 30→26 rem, corpo 17→16. Sono
difendibili (`SCHEDA` § 2) e **invisibili**. Metterli in vetrina è esattamente la mossa retorica
che ha prodotto i due fallimenti precedenti.

---

## 3 · Il meccanismo, dove vive

### 3.1 La propagazione — il cuore, e costa **0 KB**

La riga scelta in hero **è** il passo 1 del brief: stesso `name="intervento"`, attributo
`form="brief-form"`, e `:has()` per accendere tutto il resto. Ma come l'aveva scritta la
direzione aveva due difetti deterministici, non ipotetici, e la correzione rende il meccanismo
**più forte**:

- `Hero.tsx:177` mette `defaultChecked` su `percorsi[1]`. Unendo i gruppi, **ogni brief inviato
  da chi non ha toccato la hero arriverebbe allo studio con `intervento: ristrutturazione o
  ampliamento` scritto da noi** — su un sito la cui azione primaria è il brief *qualificato*, un
  dato falso alla fonte, che finisce anche nell'oggetto della mail. → **niente `defaultChecked`**;
- un gruppo di radio è definito da *form owner + name*: 5 in hero + 6 nel brief = **undici
  membri di un solo gruppo**, e le frecce ciclherebbero su tutti e undici a quattromila pixel di
  distanza. → **un solo gruppo, tutto nella hero, e le righe diventano sei** — che sono
  esattamente le sei risposte del passo 1 (`lib/brief/domande.ts`). Non è un capriccio: è la
  condizione perché la hero *sia* il passo 1. Deviazione dichiarata dai «5 bottoni» di
  `CLAUDE.md` § Homepage blocco 2, con una riga in `DECISIONI.md`;
- nel brief, al posto del primo `fieldset`, una **riga di lettura**:
  `1 · tipo di intervento — Ristrutturazione o ampliamento · cambia`, dove *cambia* è un
  `href="#percorsi"`;
- il ripiego `@supports not selector(:has(*))` smette di mostrare un pannello mentre niente è
  spuntato e mostra **tutti e sei** i pannelli aperti: una lista espansa è una degradazione
  onesta, un pannello aperto senza una scelta è una bugia.

**La frase che si dice in call, ed è una differenza di funzione e non di gusto:**

> In A il brief comincia a «passo 1 di 5». **In B comincia a «passo 2 di 5», perché la prima
> domanda l'hai già risposta nella prima schermata.**

Due cose vanno **provate prima** di dire fatto: il gruppo con `form=` letto da NVDA e
VoiceOver, e l'**INP** con CPU rallentata 4× (`:has()` su un documento da 141 KB). Ripiego se
una delle due non regge: la query string dello smistamento, **già nel repo**.

### 3.2 L'animazione — una sola regola, una sola eccezione

**Fin dove.** Il committente ha aperto l'asse; si spende in **un posto solo** (skill § 7), e il
posto è il momento in cui la pagina risponde: si sceglie una riga, e nello stesso gesto il
foglio si apre, la riga corrispondente della tabella dei sei percorsi va a inchiostro pieno
mentre le altre scendono al pavimento, la CTA cambia frase, e il brief in fondo ha la prima
risposta scritta. **600-700 ms in tutto, solo `transform` e `opacity`.**

**Con che tecnica.** `:has()` + `input:checked` + l'attributo `form`. **0 KB di JavaScript**,
nessun componente client nuovo, `package.json` continua a non contenere nessuna libreria di
animazione — GSAP + ScrollTrigger sono ~70 KB gz su 30 di margine: **fuori, e non è
un'opinione**. `:has()` è Baseline da dicembre 2023 **ed è già in produzione in questa stessa
pagina** (`sezioni.css:619-668`). I `@keyframes` e le `transition` stanno **dentro**
`@media (prefers-reduced-motion: no-preference)`, così con `reduce` non esistono e non c'è
nessun `animation: none` da ricordarsi su un blocco nuovo. Gli stati continuano a cambiare:
cambiano di colpo.

**L'unica eccezione allo scorrimento, e ripara un difetto.** Il prima/dopo: oggi senza
JavaScript il cursore non viene reso — giustamente, sarebbe un controllo morto — e il blocco
wow di B resta fermo a «50 %». Con `animation-timeline: view()` il taglio **si rivela
scorrendo**: non è decorazione, è la sostituzione di un controllo che senza JS non esiste. Tre
condizioni: dentro `@supports (animation-timeline: view())` e fuori di lì lo stato scritto nel
CSS è quello **finito**; **niente `animation-fill-mode: both`** (è la trappola con cui questa
tecnica lascia il contenuto invisibile); e l'animazione si spegne al primo `input` dell'utente,
perché **una dichiarazione di animazione batte lo stile inline** e `Confronto.tsx:70` scrive
`--x` in `style`.

> **Supporto, con il dato verificato oggi** (web-features explorer): Chrome/Edge **115+**
> (lug 2023), Safari e Safari iOS **26+** (set 2025), **Firefox: non supportato** — è ciò che
> blocca il Baseline da settembre 2025. Copertura globale ~82 %. **Il piano non ci poggia
> sopra**: il meccanismo è `:has()`, e in Firefox il prima/dopo resta esattamente com'è oggi.

**Dove si ferma — e questa lista è la parte anti-default.** Nessuna dissolvenza all'ingresso di
una sezione. Nessun hover su una scheda (non ci sono schede). **Nessun conteggio che sale sui
quattro numeri**: il valore è `'—'`, animare un trattino sarebbe un'animazione su un dato che
non esiste, e sul dato vero sarebbe decorazione. Niente sui ritratti. Niente sui campi del
brief — un campo che si muove mentre lo compili è un difetto. Niente sull'header e sulla barra
della proposta: sono l'unica cosa ferma della pagina, ed è la loro funzione. Nessuna parallasse.

### 3.3 La fotografia — resta, e cambia ruolo

> **In B una fotografia entra solo se è la prova di un'affermazione fatta lì accanto, e quando
> entra è l'unico oggetto autorizzato ad attraversare il confine fra la tavola e il foglio.**

Comincia sulla tavola nera e finisce sul foglio bianco, o viceversa. È un **ruolo**, non un
rapporto d'immagine — e **A non può averlo**, perché A non ha due piani nella stessa banda.

Tre posti, non uno di più: **il prima/dopo** (il solo wow, ed è l'unico posto in cui la
fotografia *è* il contenuto); **le schede progetto** con la copertina; **i quattro campi
ritratto**, che restano campi dichiarati e vuoti con specifica `1200 × 1600 px · AVIF ·
≤ 200 KB`. Fuori: la hero (è una domanda), i sei percorsi, le fasi. Mai in cornice, e quando
sborda sborda da **un** lato solo.

**Il livello dimostrativo non si tocca**: `lib/media-demo.ts` e `components/MediaEsempio.tsx`
restano invariati come codice e come API — sono agnostici rispetto al piano, perché il colore
del segnaposto lo prende il contenitore. `NEXT_PUBLIC_MEDIA_DEMO` resta l'interruttore, il video
resta fuori dal percorso critico, con `prefers-reduced-motion` non viene reso affatto. **Sui
ritratti non entrano mai, e la garanzia è nella composizione**: `MediaEsempio` non è montato in
`Persone`, quindi la decisione n. 27 (c) non dipende da una variabile d'ambiente che qualcuno
può accendere.

Una cosa cambia e vale la pena prenderla: la riga di fonte e licenza **esce da dentro
l'immagine** e va appesa al filetto del campo, accanto alla specifica. Guadagna 21:1 invece di
stare su un fondo fotografico variabile, e le tre condizioni della decisione n. 27 restano tutte.

### 3.4 La quota e il guscio `Sezione.tsx`

**La quota si tiene e si ridisegna.** Le tre condizioni non si toccano (sono `CLAUDE.md`), le
quote restano **tre**, cambia lo **strumento**:

- in **A** è una **linea di misura**: filetto, terminatori obliqui a 45° ISO 129-1, annotazione
  all'estremo. **Resta esattamente com'è**;
- in **B** non si disegna come linea: è una **riga del documento**. Le stesse tre quantità
  (`5 ruoli`, `128 comuni · FM 40 · MC 55 · AP 33`, `passo n di 5`) compaiono come campi
  dichiarati — etichetta al bordo sinistro, numero incolonnato a destra con `tabular-nums`,
  **nessun terminatore obliquo**. *Un documento non disegna quote su se stesso: dichiara valori
  nei campi.*
- Implementazione: una prop `forma?: 'misura' | 'registro'`, default `'misura'`. `numero: number`
  resta tipizzato, il tetto di tre resta, il controllo resta un grep.

**Il guscio esce da B.** Non perché condividere sia sbagliato, ma perché `Sezione.tsx`
**codifica un ritmo**, e il ritmo è il problema in forma di componente: `passo-corto/normale/largo`,
`testa-sezione`, `etichetta-sezione`, `intro-sezione`, `corpo-sezione`, `nota-cantiere`, `wrap`
sono **11 delle 123 classi condivise**, ed è il pezzo che garantisce che le due pagine cadano
sullo stesso respiro qualunque cosa si faccia ai colori. In B non ci sono sezioni: ci sono
**campi di un documento**. Serve `components/campo/Campo.tsx`, e **`Sezione.tsx` resta intatto
per A e per tutte le rotte interne**, che stanno in `app/(a)` e non si toccano.

---

## 4 · Cosa si tocca nel repo, e in che ordine

L'ordine è dichiarato prima perché **se si taglia, si taglia dal fondo** — e perché il rischio
n. 1 è proprio che il ridisegno si fermi prima del brief.

| # | Cosa | Perché in questa posizione |
|---|---|---|
| **1** | I **token** di `[data-theme='b']` + **`Campo.tsx`** + `data-piano` + il carattere | tutto il resto ci poggia. `--regolo-passo-*` si toglie da B **per ultimo dentro questo passo**, e solo dopo aver riscritto chi lo legge: `Brief.tsx:37` monta `className="brief passo-largo"` in **tutti e due** i temi, `globals.css:1288` ci appende i 200 px, `.hero-registro` legge `passo-corto`. **Un `var()` non definito rende la dichiarazione invalida e il `padding-top` torna a 0, in silenzio** |
| **2** | Il **brief** e la propagazione | è il rischio n. 1, e sono ~30 righe su 559. Non va per ultimo |
| **3** | **Header** e **footer** | 26,9 KB di chrome condiviso: è il pezzo col ritorno più alto per riga scritta |
| **4** | La **quota-registro** (`forma`) | ~40 righe, e toglie l'oggetto più letteralmente identico delle due home |
| **5** | Le **sezioni** (hero, numeri, sei percorsi, fasi, progetti, prima/dopo, persone) | se si taglia, si taglia qui |

**Igiene che vale a prescindere da chi vince la fase 5**, e va fatta comunque:

- `text-accent-text` è usata in **7 file** ma `--color-accent-text` **non esiste più** in
  `globals.css`: in Tailwind v4 la classe non viene generata. È codice morto che finge una
  regola che non c'è;
- `Persone` ha `variante: 'a' | 'b'` — **una prop che nomina il tema**, cioè un `if` sul tema
  spostato di un livello. Diventa `'ritratti' | 'registro'`, e la regola si estende: *nessuna
  variante porta il nome di una proposta*;
- l'**asse esce dal tema**: `sezioni.css:443/446/464` da `[data-theme='b'] [data-asse]` a
  `[data-asse]` puro. **Verificato sicuro oggi**: in `app/(a)/page.tsx` tutti e quattro i
  predicati che passerebbero `asse` sono falsi.

**Cosa NON si tocca**: l'opzione A, in nessuna sua parte. `BriefForm.tsx` nella sua logica
(validazione, honeypot, rate limit, consenso, `<datalist>`: zero modifiche). `lib/media-demo.ts`
e `MediaEsempio.tsx`. `scripts/genera-font.sh`, che con Anybody **non va aperto** — solo la sua
riga di chiamata. Le rotte interne, che stanno in `app/(a)`.

---

## 5 · Il criterio di accettazione — falsificabile, non «è bella»

1. **La prova delle classi.** `npx next build`, poi si ricontano le classi distinte in
   `.next/server/app/index.html` e `opzione-b.html`. Oggi **123 su 165 = 74,5 %**. Soglia:
   **sotto il 50 %**, o la diagnosi non è chiusa — *indipendentemente da quanto bella sia la
   pagina*. Entra in `STATO.md` come definizione di «fatto» del blocco, non come verifica finale.
2. **La prova del grigio, forma severa.** Togliere il colore non prova niente qui: le due home
   sono già acromatiche. La versione che dice qualcosa è **dare a tutte e due la stessa carta
   bianca**. Oggi il risultato è: stessa griglia, stesso `wrap`, stesso margine, stessi tre
   passi, stesso guscio, stessa quota, stesso bottone, stesso brief → **una pagina sola**. Dopo,
   devono restare in piedi quattro cose: un foglio continuo rientrato al 34,4 % contro tredici
   blocchi a piena larghezza; campi contigui contro tre passi verticali; una tabella dove A ha
   un elenco; e **uno stato che si propaga**.
3. **La prova del componente.** `SiteHeader` deve smettere di rendere **1.343 byte identici**, e
   il brief deve smettere di rendere **267 elementi identici**.

Più il collaudo di sempre, a **ogni blocco** e non alla fine: `contrasto-dom.mjs` → `sotto
soglia: 0` · `sweep.mjs` → `sfora: []` · `nojs.mjs` e `nojs-rotte.mjs` · `peso.mjs` dentro il
budget · Lighthouse mobile ≥ 90 su tutte e quattro le voci.

---

## 6 · I rischi, in ordine di gravità

1. **Il ridisegno si ferma prima del brief** e restano 267 elementi identici. È il rischio n. 1
   perché si verifica **da solo**. → il brief si fa **secondo**, non ultimo (§ 4).
2. **Il gruppo di radio condiviso manda allo studio un dato che il visitatore non ha dato** e
   rompe la tastiera. → § 3.1, e prova con NVDA e VoiceOver **prima** di dire fatto.
3. **Il meccanismo è un comportamento, e la call si fa guardando.** Le due bocciature precedenti
   sono venute da un giudizio dato su un'immagine. → la composizione deve differire **da sola**
   (prova del grigio); in consegna, **tre schermate dello stesso punto con tre scelte diverse**,
   affiancate; in call si aprono le due rotte vere e **si clicca una riga**; e **B si mostra per
   prima**, perché chi vede prima un display da 132 px legge il secondo come «meno disegnato»
   qualunque cosa ci sia sotto.
4. **Il foglio ridichiara i token e un contenitore dimenticato dà bianco su bianco.** È la
   trappola n. 1, già pagata: il primo giro dopo l'inversione dava **11 difetti, fra cui il
   brief tutto bianco su bianco**. → `data-piano` + due regole per i due stati, **entrambi i
   prefissi sempre**, `contrasto-dom.mjs` a ogni blocco. Attenzione a `--regolo-quota-colore`:
   in B vale `#9A9A9A`, che sulla tavola dà 7,46:1 e **su un foglio bianco 2,81:1**. Qualunque
   cosa attraversi i due piani va scritta con `#767676` (4,54:1 sul foglio, 4,62:1 sulla tavola).
5. **Anybody**: la sola scelta del piano che poggiava su una prova formata su un'altra domanda.
   → il provino ai corpi veri di B **l'ho già fatto** (`_provini/provino-b2-1440.jpeg`); ordine
   di ripiego scritto: Encode Sans → Zilla Slab (solo riaprendo la regola di Geist).
6. **La tabella migliore del sito ha zero righe.** → la tabella va dove i dati ci sono; in call
   si dice la frase per prima e si mostra **una seconda tavola del documento pieno**, perché una
   proposta si vende nello stato in cui verrà consegnata.
7. **L'apparato torna texture.** → principio n. 3 + due grep.
8. **INP**, l'unica voce di budget che questo piano può peggiorare. → si **misura** con CPU 4×,
   non si assume. Se sfonda, il `:has()` scende dal `body` al contenitore del foglio.
9. **Togliere i ritratti e le opere** farebbe perdere la call anche vincendo il giudizio di
   design. → la loro presenza diventa una **decisione registrata**: chi li vuole togliere deve
   emendare una voce.
10. **Il costo**: ~700 righe nuove su una rotta che alla fase 5 ha il 50 % di probabilità di
    essere cancellata — più del preventivo scritto all'origine (`DECISIONI.md`: «costo della
    seconda variante: **solo l'ordine dei blocchi e i token**»), che è esattamente il preventivo
    che ha prodotto due volte la stessa pagina. → l'ordine di § 4, e si taglia dal fondo.

---

## 7 · Le decisioni da registrare in `DECISIONI.md`

| n. | Decisione |
|---|---|
| 28 | **Le due proposte differiscono per meccanismo, non per token.** B smette di usare `Sezione.tsx` e i tre passi verticali; criterio di accettazione: classi condivise **< 50 %** |
| 29 | **Il fondo di B resta `#000000` e la questione si chiude** — presa e non riapribile. Il nero smette di portare la differenza e fa un solo lavoro: rendere il foglio un oggetto |
| 30 | **Il carattere di B è Anybody** (`wght 400:600`, `wdth` bloccato a 100, **19.476 B**). Criterio: Δ x/cap ≥ 5 % da Archivo. Emenda la n. 19 |
| 31 | **La hero di B è il passo 1 del brief** (stesso `name`, attributo `form`, niente `defaultChecked`). Le righe passano da cinque a **sei**: deviazione dichiarata da `CLAUDE.md` § Homepage blocco 2. Chiude anche la n. 16 |
| 32 | **In B nessuna animazione comincia perché la pagina ha scorso**, tranne il prima/dopo dentro `@supports` |
| 33 | **La fotografia resta in home** (prima/dopo, copertine, campi ritratto) ed è l'unico oggetto che attraversa i due piani. Rafforza la n. 27 |
| 34 | **La quota prende una `forma`**: linea di misura in A, riga di registro in B. Le tre condizioni e il tetto di tre non si toccano |

---

## 8 · Cosa chiedo prima di partire

- **Le sei righe della hero al posto di cinque** (decisione 31) sono una deviazione da
  `CLAUDE.md` § Homepage blocco 2. È la condizione perché la hero *sia* il passo 1: senza, il
  meccanismo non esiste. Se non va bene, il ripiego è la query string che c'è già — e la
  propagazione diventa un link invece di uno stato.
- **`PIANO-B.md` in root** è un file di lavoro: alla fermata 2 si fonde in `STATO.md` e
  `DECISIONI.md` e si cancella.
- I `woff2` scaricati in `kit/reference/_provini/` per i provini **non si committano**
  (com'è già stato fatto la volta scorsa): restano gli HTML e i JPEG.
