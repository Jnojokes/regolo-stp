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

## Direzione visiva — valori di partenza, da confermare

Riferimenti: Studio Foundry (https://studio-foundry.sujen.co/), Storey Architecture
(https://www.storeyarchitecture.co.uk/), Nabil Issa (https://nabilissa.com).
Serif display grande sopra fotografia, molto bianco, griglia rigorosa, colore usato con parsimonia.

```
--paper    #F4F2ED   fondo
--ink      #17171A   testo
--muted    #6E6B66   testo secondario
--line     #DCD8D0   filetti
--accent   #2F4A42   accento (verde pietra) — DA CONFERMARE
```

- Display: **Instrument Serif** · Testo: **Instrument Sans**
- Scala tipografica fluida con `clamp()`. Titolo hero molto grande, corpo 17-18 px.
- Griglia 12 colonne, gutter generosi, contenuto max 1440 px.
- Fotografia a piena larghezza, mai in cornice.
- Angoli vivi, niente ombre morbide, niente gradienti.

**Quando arriva il logo del cliente, questi valori si rivedono.** Non inventare un logo.

## Regole non negoziabili

1. **Non inventare contenuti del cliente.** Nessun progetto, nome, numero, testimonianza o
   dato inventato, nemmeno come esempio "realistico". I placeholder si scrivono in modo
   inequivocabile: `[[DA CLIENTE: nome progetto]]`, e ogni placeholder va elencato in
   `CONTENUTI-DA-CLIENTE.md`.
2. **Nessuna immagine stock nei blocchi di prova** (progetti, persone, prima/dopo, cantieri).
   In sviluppo si usano rettangoli grigi con la dicitura di cosa andrà lì.
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

## Due opzioni di homepage (fino alla fase 3)

FT vende con due toni; il cliente sceglie (`DECISIONI.md` n. 1). Stessa architettura, stessi
componenti, due ordini e due set di token. I prototipi stanno nel repo, in
`kit/opzioni/REGOLO_Opzione_A.html` e `kit/opzioni/REGOLO_Opzione_B.html`: sono il brief visivo.

| | A «Lo studio» — route `/` | B «Il cantiere» — route `/opzione-b` |
|---|---|---|
| Token | `paper #F4F2ED · ink #17171A · muted #6E6B66 · line #DCD8D0 · accent #2F4A42` | `ground #F3F4F1 · ink #14181C · steel #5C6670 · grid #D5D9D3 · accent #E4572E` |
| Font | display Instrument Serif · testo Instrument Sans | display Bricolage Grotesque · testo Instrument Sans · dati JetBrains Mono |
| Ordine | hero foto → smistamento → progetti → servizi → come lavoriamo → **esploso SVG** → persone → territorio → brief → footer | **hero-domanda con percorso** → numeri → sei percorsi con «serve da te» → come lavoriamo (timeline) → progetti con dati duri → **prima/dopo** → persone → brief → footer + barra mobile |
| Motivi | quote da disegno tecnico, carta millimetrata nei placeholder di B; tratteggio nei placeholder di A | |

Implementazione: `data-theme="a|b"` sull'`<html>` della route, token in `tailwind.config` per
entrambi, sezioni come componenti riusati con `order`. Dopo la decisione, la route non scelta si
elimina (fase 5): non restano due home in produzione.

## SEO, GEO, legal — il minimo deciso

- Answer capsule, entità, 12 domande della baseline GEO, legal: in `kit/REGOLO_SEO-GEO-LEGAL.md`.
- Crawler di addestramento: default **consentiti** (decisione n. 9). Nessuna riserva TDM.
- Pagine: `/privacy`, `/cookie`, `/note-legali` dai template della skill `sito-seo-geo-legal`.
  Nessun banner (analytics senza cookie), nessun iframe di terzi (mappa statica).
- Ordini professionali: sezione e numero in pagina e in `Person.hasCredential`, quando arrivano.

## Consegna

Per FT e per il cliente: `kit/REGOLO_Due_Opzioni.md`. Alla fine: skill `sito-consegna`.
