# Prompt per la sessione successiva — fase 3 quinquies

> Da incollare in una sessione nuova di Claude Code aperta in `/Users/bobonej/GitHub/regolo-stp`.
> Scritto l'08/09/2026, dopo il commit `eb1ae00`, con l'albero di lavoro pulito.
> Questo file si cancella quando la passata è finita.

---

Continui il sito REGOLO STP. Leggi prima `CLAUDE.md`, `STATO.md` (§ Fase 3 quater e § Fase 3
ter) e `DECISIONI.md` (voci 26-38): sono il contesto permanente e non li devo ripetere qui.
Ultimo commit `eb1ae00`, albero pulito, branch `main`.

## Dove siamo

Ci sono **quattro** home di proposta: `/` (A), `/opzione-b`, `/opzione-c`, `/opzione-d`, una per
route group in `app/(a|b|c|d)/`, con `data-theme` sull'`<html>` e i token in `app/globals.css`.
Il committente le ha guardate e ha detto una cosa sola: **«per adesso solo l'opzione A la reputo
valida»**. B, C e D vanno rifatte o buttate.

Il difetto è già stato diagnosticato due volte con lo stesso metodo — **classi condivise misurate
sul build**, non impressioni — e due volte la correzione è stata parziale:

| | condivise con B | quando |
|---|---|---|
| C e D, prima passata | 97 % | erano B ricolorata due volte |
| C e D, oggi | **C 94 % · D 90 %** | le hero e i tre sistemi tipografici sono diversi; **sotto la piega i blocchi sono ancora quelli di B** |

Il numero si rimisura così, e va rimisurato a fine passata:

```bash
npm run build && node -e "
const fs=require('fs');
const cl=s=>new Set([...s.matchAll(/class=\"([^\"]*)\"/g)].flatMap(m=>m[1].split(/\s+/)).filter(Boolean));
const p={};for(const [n,f] of [['A','index'],['C','opzione-c'],['D','opzione-d']]) p[n]=cl(fs.readFileSync('.next/server/app/'+f+'.html','utf8'));
const cop=(x,y)=>((([...p[y]].filter(k=>p[x].has(k)).length)/p[y].size*100).toFixed(0)+'%');
console.log('C vs A',cop('A','C'),'· D vs A',cop('A','D'),'· D vs C',cop('C','D'));"
```

## Che cosa ha chiesto il committente, in questa sessione

Sono tutte sue parole, e sostituiscono quello che dicono `CLAUDE.md` e `DECISIONI.md` dove
contrastano.

1. **«Scendi a 3 opzioni.»** Restano **A, C, D**. **L'opzione B esce**: route `app/(b)/`, tema
   `[data-theme='b']` in `globals.css`, `lib/fonts/tema-b.ts`, il font Anybody se non serve più a
   nessuno, il grosso di `app/css/campi.css` che è suo, e ogni riga di `CLAUDE.md`, `STATO.md`,
   `DECISIONI.md`, `BarraProposta`, `sitemap`, `robots` che la nomina. Attenzione: **C e D usano
   ancora i componenti nati per B** (`components/campo/Campo.tsx`, `Registro.tsx`, `Rottura.tsx`,
   e le sezioni con `variante="tabella" | "sequenza" | "dati" | "registro"`). Quelli non si
   cancellano: si portano via da B, che è l'occasione per **ricomporli** invece di riverniciarli.
2. **«L'opzione A non si tocca.»** Né token, né componenti dove li usa solo lei. Se un componente
   è condiviso, la differenza va nei token o in una variante, **mai in un `if` sul tema nel
   markup**, e **nessuna variante porta il nome di una proposta**.
3. **«L'impianto del funnel tra le diverse opzioni può essere diverso comunque.»** Cade il
   vincolo «stesso contenuto, stesso ordine, stesse parole» con cui erano nate C e D (decisione
   n. 36): **C e D possono avere blocchi, ordine e funnel propri**. Era quel vincolo a produrre
   tre pagine che si somigliano.
4. **«Le altre opzioni oltre la A devono avere molto meno copy e più media.»** E:
   **«troppo testo, non penso avremo tutto questo da scrivere.»** Il taglio è sostanziale, non
   cosmetico: oggi C e D rendono ~7.400 caratteri di testo a testa senza JavaScript.
5. **«Font più display e allargato.»** Display più grandi e **estesi** (asse `wdth` alto). Nota:
   `scripts/genera-font.sh` sapeva già generare `anybody-wide` a `wdth 150 / wght 900` e quella
   riga è stata **tolta** nel commit `2d2be75` — va rimessa se serve (il perché sta nel commento
   di quel commit).
6. **«Le interlinee che si sovrappongono vanno ampliate.»** È un difetto vero e **misurato**:
   testi su più righe con `line-height` ≤ corpo — **B 1 · C 7 · D 9**. I peggiori: i titoli di D
   a **63,4 px con interlinea 63,4** e i nomi dei progetti di C a **60 px con 57,6**. Regola da
   scrivere: l'interlinea stretta (< 1,0) vale **solo dove il testo sta su una riga sola**; su più
   righe si alza. Lo si rimisura con lo script in fondo a questo file.
7. **«Invece di mettere "DA CLIENTE" metti lorem ipsum come placeholder.»** Sostituisce la regola
   1 di `CLAUDE.md` **per le proposte C e D**, che sono una demo di vendita. Da chiudere con la
   testa: i `[[DA CLIENTE: …]]` sono anche la **lista della spesa** (`CONTENUTI-DA-CLIENTE.md`) e
   il gancio del collaudo (`grep '\[\[DA CLIENTE'`). Servono tutti e due i lati: in pagina lorem
   ipsum, e da qualche altra parte — un attributo, un dato, un file — l'elenco di *che cosa* va
   in ogni buco, altrimenti la lista della spesa sparisce. **I ritratti restano vuoti**
   (decisione n. 27 (c)): una faccia presa altrove sotto il nome di un ingegnere no.
8. **«Ma poi manca tutto il discorso delle animazioni»** — ed è la cosa più importante della
   passata. Ha mandato **tre schermate di `studio-foundry.sujen.co` prese durante lo scroll**: la
   pagina apre sulla carta con la fotografia ritagliata a **scheggia angolare piccola al centro**,
   e **mentre si scorre la scheggia cresce e si deforma** fino a coprire la finestra, scoprendo
   `STUDIO FOUNDRY` in serif dietro e il claim in basso. **La mia opzione C ha copiato il
   fotogramma finale e buttato l'animazione**: oggi la foto è già a piena finestra dal primo
   frame. Questo gesto è il wow di C e va costruito. Ha anche chiesto di **«concentrarsi su testi
   on scroll tipo metodo e queste robe»**.
   - Si fa **in CSS**, senza librerie: `animation-timeline: view()` / `scroll()` + `@property`
     per animare un `clip-path`. Supporto verificato: **Chrome/Edge 115+, Safari 26+, Firefox
     no** — dove manca, si vede il fotogramma finale, che è la pagina di oggi.
   - **Rispetta `prefers-reduced-motion`** (regola 4 di `CLAUDE.md`, non toccata).
   - La decisione n. 32 («in B nessuna animazione comincia perché la pagina ha scorso») era
     scritta **per B**, che esce. Per C e D il committente ha chiesto l'opposto: va scritta una
     decisione nuova che lo dice, con il perché.
9. **«E ne farei uno più istituzionale editorial artigiano architetto.»** È **D**. Oggi D è
   Storey Architecture — minimale, quieta, tipo piccolo. Va spinta verso la **monografia
   stampata**: masthead allargato, impaginazione editoriale, materia da artigiano. Storey resta
   la reference dei valori misurati (interlinea 1,0, spaziatura negativa anche sulle maiuscole,
   vuoto disuguale, l'immagine che sborda da un lato), non del tono.
10. **«Ma non ha senso la regola niente 3D in pagina.»** Il committente **riapre** il divieto
    (`CLAUDE.md` § Homepage blocco 7 «in SVG, non in 3D» e decisione n. 12). Non vuol dire che
    serva del 3D: il wow che ha indicato lui — la scheggia che si apre — è `clip-path`, zero
    JavaScript e zero KB. Se si mette del 3D vero va scritto quanto costa sul budget
    (`three.js` ≈ 150 KB gz contro un budget di 180 KB gz) e va fatto degradare. **Blender non
    serve**: non ci sono CAD/BIM del cliente, e un edificio modellato a mano sarebbe contenuto
    inventato. Il server MCP di Blender in questa sessione non si connetteva nemmeno.
11. **Niente push.** Lo fa chi segue il progetto da GitHub Desktop. Si committa e basta.

## Difetti aperti, già trovati e da chiudere

- **Il menu di C non si vede a 1440.** Nella reference è **centrato sopra la fotografia** con una
  pastiglia «Contact» a destra e il piccolo marchio a sinistra; in pagina resta solo il marchio.
  Verificato guardando `kit/reference/studio-foundry/1440-hero.jpeg` accanto alla schermata mia.
- **`components/BarraProposta.tsx` porta i nomi vecchi**: dice ancora «opzione C — *la parete*» e
  «opzione D — *il marmo*», che sono le due direzioni buttate.
- **Sotto la piega C e D sono ancora B** (§ Dove siamo).

## Le prove: si guardano, non si parafrasano

`kit/reference/` non è una lista di link, è una cartella di prove (skill `sito-design` § 2). Per
questa passata contano:

| Cartella | Che cosa c'è | Serve a |
|---|---|---|
| `studio-foundry/` | `1440-hero`, `1440-intera`, `1440-meta-30`, `1440-meta-55`, `390-hero`, `390-meta` | **C** |
| `storey/` | gli stessi sei | **D** |
| `SCHEDA.md` | gli stili **misurati nel browser** di nove siti; Storey è tier A | tutte e due |
| `_provini/PROVINI.md` | quattordici caratteri OFL impaginati con le parole vere e pesati | il display allargato |
| `_dopo/` | le schermate delle mie passate, per il confronto prima/dopo | il giudizio |

**Aprili con `Read` prima di scrivere CSS.** Le tre schermate dello scroll di Studio Foundry che
il committente ha mandato in chat **non sono nel repo**: se servono, si riprendono da
`studio-foundry.sujen.co` con Playwright scorrendo la pagina, oppure si chiedono a lui.

## Come si verifica

Gli script stanno in `scripts/collaudo/` e il loro `README.md` dice cosa deve rispondere ognuno.
Girano su una build di produzione a `localhost:3001` e vogliono Playwright:

```bash
npm run build && (npx next start -p 3001 &)
ln -sfn /tmp/pw/node_modules scripts/collaudo/node_modules   # o: npm i playwright lì dentro
cd scripts/collaudo && node contrasto-dom.mjs && node sweep.mjs && node nojs-rotte.mjs
```

Ultimi valori buoni: **contrasto 145 coppie distinte su 9 rotte, zero sotto soglia**; nessuno
sfondamento orizzontale a 1440 e a 390; senza JavaScript C e D rendono il testo, il form è
inviabile e il brief parte da «passo 2 di 5». Le tre liste di rotte dentro gli script vanno
aggiornate quando B esce.

Le interlinee sovrapposte si rimisurano con questo, da `scripts/collaudo/`:

```js
// per ogni testo su piu' righe, segnala interlinea <= corpo (le maiuscole si toccano)
for (const el of document.querySelectorAll('h1,h2,h3,p,li,span,a,th,td')) {
  const t = (el.textContent || '').trim(); if (!t || el.children.length) continue
  const cs = getComputedStyle(el), fs = parseFloat(cs.fontSize)
  const lh = cs.lineHeight === 'normal' ? fs * 1.2 : parseFloat(cs.lineHeight)
  const r = el.getBoundingClientRect(); if (r.height < 1 || fs < 14) continue
  if (Math.round(r.height / lh) > 1 && lh < fs * 1.02) console.log(el.tagName, fs, lh, t.slice(0, 40))
}
```

## Metodo, e le due fermate

Skill **`sito-design` § 3**: il piano in due passate — prima colore, tipografia, impaginazione e
principi; poi la revisione contro il brief e contro `SCHEDA.md`, cambiando tutto quello che si
sarebbe prodotto uguale per un brief simile. **Il piano si mostra prima di scrivere codice.**

E la regola che tre passate hanno violato, che qui vale come criterio di accettazione:
**le proposte devono differire per come FUNZIONANO, non per come sono colorate.** Un numero
misurato sul build, non un'impressione.

- **Fermata 1** — il piano, più la hero di C con la scheggia che si apre allo scroll. Committa
  `"tre opzioni — C, la scheggia che si apre (1/2)"`, poi fermati e mostra C accanto ad A.
- **Fermata 2** — B fuori, D istituzionale, copy tagliato, interlinee, lorem ipsum, animazioni
  del metodo, `STATO`/`DECISIONI`/`CLAUDE.md` aggiornati, collaudo rimisurato. Committa
  `"tre opzioni — B esce, D editoriale (2/2)"`.

**Niente push in nessuna delle due.**

## Cosa non si tocca, mai

- **L'opzione A.**
- Il livello dimostrativo dei media: `lib/media-demo.ts` + `components/MediaEsempio.tsx` dietro
  `NEXT_PUBLIC_MEDIA_DEMO`, e **mai sui ritratti** (decisione n. 27).
- La **answer capsule** di `/studio`: è bloccante e la chiude il committente, non io. Quel copy
  non si riscrive da soli.
- I dati veri del cliente in `lib/site.ts` (indirizzo, telefono, comuni ISTAT): non sono
  segnaposto e non diventano lorem ipsum.
