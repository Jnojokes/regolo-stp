# REGOLO STP — architettura del sito

> 03/09/2026 · BluLang · Documento di lavoro interno

## 1. Il cliente, per quello che sappiamo

| Dato | Valore | Fonte |
|---|---|---|
| Ragione sociale | REGOLO — società tra professionisti | LinkedIn |
| Settore | ingegneria civile e architettura | LinkedIn |
| Sede | Via Campiglione 2/E, 63900 Fermo (FM) | LinkedIn |
| Telefono | 0734 510329 | LinkedIn |
| Dimensione | 2-10 dipendenti, 15 persone che dichiarano REGOLO come datore | LinkedIn |
| Sito attuale | brasili.net — **offline, restituisce errore** | verificato 03/09/2026 |
| Attività dichiarata | progettazione e direzione lavori, architettonica e strutturale, su edifici nuovi ed esistenti, pubblici e privati | LinkedIn |
| Competenze dichiarate | ingegneria civile, architettura, urbanistica, lavori pubblici, direzione lavori, coordinamento sicurezza, collaudi, progettazione termica, progettazione acustica, consulenza immobiliare, pratiche sisma e superbonus | LinkedIn |
| Come si raccontano | «progetto organico, funzionale alle esigenze, attento ai costi realizzativi, curato fino al dettaglio estetico e funzionale, con attenzione a efficienza energetica, comfort acustico e sicurezza strutturale» | LinkedIn |

**Non sappiamo ancora** (sta nei punti aperti): il peso relativo fra privato e pubblico nel
loro fatturato, quali progetti sono pubblicabili, che materiale fotografico hanno, se il
dominio resta brasili.net, e in che formato tengono i modelli CAD/BIM.

## 2. Il ragionamento di partenza

Per uno studio tecnico locale il sito non è il primo contatto: è il **secondo**. Qualcuno
fa il nome, la persona cerca il nome, e in quel momento decide se fidarsi. Il sito non deve
generare domanda fredda — deve **vincere il confronto** quando il nome è già sul tavolo.

Da qui tre conseguenze sull'impianto:

1. **La prova pesa più dell'effetto.** Progetti veri, con dati veri, persone con la faccia.
2. **Serve un'unica azione forte**: un brief qualificato, non un "contattaci".
3. **L'estetica deve essere alta perché è il proxy della competenza** — un committente non
   sa giudicare un calcolo strutturale, ma sa giudicare se un sito è fatto bene.

Modello di riferimento per l'impianto: **Storey Architecture** e **Studio Foundry**
(scheda `web-references/references/studi-tecnici.md`, tier B). Estetica: fascia Studio
Foundry / Nabil Issa. Da **non** copiare: l'impianto dei grandi studi-prestigio, che non
hanno né CTA né form perché non ne hanno bisogno.

## 3. Cosa deve fare il sito

| | |
|---|---|
| Azione primaria | **brief qualificato inviato** dal form multi-step |
| Azione secondaria | telefonata da mobile |
| Terza | scaricare/consultare un progetto simile al proprio |
| Cosa NON deve fare | dare prezzi, promettere tempi sulle pratiche, sembrare un'agenzia immobiliare |
| Metrica | brief/settimana e **completezza** del brief; non le visite |

## 4. Struttura del sito

```
/                          Home
/progetti                  indice filtrabile
/progetti/<slug>           scheda progetto
/servizi                   indice
/servizi/<slug>            una pagina per servizio (5-6)
/studio                    chi siamo, metodo, persone
/contatti                  contatti + form completo
/note                      (opzionale) approfondimenti — vedi punti aperti
/privacy  /cookie          legal
```

### I servizi, nominati come li nomina il cliente

Il nome tecnico resta, ma in seconda riga. Modello Studio Foundry.

| Titolo in pagina | Sotto-titolo tecnico |
|---|---|
| La tua casa, dal disegno al cantiere | progettazione architettonica e direzione lavori |
| Ristrutturare, ampliare, recuperare | interventi sull'esistente, cambi di destinazione |
| Mettere in sicurezza la struttura | progettazione strutturale, adeguamento e miglioramento sismico |
| Pratiche, permessi e bonus | pratiche edilizie, sisma bonus, agibilità, condoni |
| Comfort, energia, acustica | progettazione termica e acustica, efficientamento |
| Opere pubbliche e collaudi | lavori pubblici, coordinamento sicurezza, collaudi |

## 5. Sequenza della homepage

Ogni blocco ha un ruolo dichiarato. Il codice fra parentesi rimanda a
`web-references/blocchi/catalogo-blocchi.md`.

| # | Blocco | Ruolo | Cod. | Contenuto |
|---|---|---|---|---|
| 1 | **Hero** | attenzione | A1/A2 | foto grande di un'opera realizzata (non render), payoff in due tempi, **una sola** CTA: «Raccontaci il progetto». Menu di 4 voci |
| 2 | **Smistamento a domanda** | attenzione + conversione | A3 | «Che intervento hai in mente?» → 5 bottoni. Ogni scelta porta al servizio giusto **e precompila il primo passo del form**. È il blocco con il miglior rapporto effetto/costo del sito |
| 3 | **Numeri** | prova | B1 | anni di attività · progetti · mq progettati · comuni in cui hanno operato. Quattro, non otto |
| 4 | **Progetti in evidenza** | prova | D1 | 3-4 schede con foto, tipo, anno, luogo. Link a tutti i progetti |
| 5 | **Cosa facciamo** | comprensione | C1 | le 6 card della tabella sopra |
| 6 | **Come lavoriamo** | comprensione | C2 | 5 fasi con avanzamento allo scroll: primo incontro → fattibilità e costi → progetto → autorizzazioni → cantiere e direzione lavori. Risponde alla domanda vera di chi non ha mai costruito: «e poi cosa succede?» |
| 7 | **WOW 1 — esploso strutturale** | comprensione + attenzione | E2 | i livelli di un edificio si separano allo scroll: fondazioni → struttura → involucro → impianti → finiture. **È il blocco che fa vedere il mestiere dell'ingegnere**, che nelle foto finite è invisibile. Da fare in SVG a livelli, non in 3D |
| 8 | **Prima / dopo** | prova | B4 | slider su 2-3 recuperi. Nel settore è la prova che il non addetto capisce al volo |
| 9 | **Le persone** | prova | G2 | ritratti, nome, ruolo, abilitazioni. In una STP si compra la persona |
| 10 | **Testimonianze** | prova | B3 | 3 citazioni con nome e cognome, ciascuna linkata al progetto di cui parla |
| 11 | **Il territorio** | prova | B5 | SVG della provincia con i comuni in cui hanno lavorato. Per uno studio locale è la credenziale principale |
| 12 | **Brief qualificato** ★ | conversione | F1 | il blocco più importante del sito. Dettaglio al punto 6 |
| 13 | **Footer operativo** | conversione | G1 | indirizzo, telefono cliccabile, mail, PEC, P.IVA, orari, mappa statica |
| — | **Barra CTA mobile** | conversione | F2 | fissa sotto 768 px: Chiama · WhatsApp · Brief |

**Budget wow:** uno solo obbligatorio (il #7). Il secondo — rilluminazione WebGL di una
foto di progetto, che mostra lo stesso edificio con la luce del mattino e della sera (E1,
https://tympanus.net/Tutorials/RelightingImages) — è nei punti aperti perché dipende dal
budget. Le transizioni di pagina (E4) sono considerate rifinitura di base, non wow.

## 6. Il form di brief — 5 passi

Una domanda per schermata, barra di avanzamento, i dati personali **solo all'ultimo passo**.

| Passo | Domanda | Risposte |
|---|---|---|
| 1 | Che tipo di intervento? | Casa nuova · Ristrutturazione o ampliamento · Pratica o bonus · Struttura e sisma · Opera pubblica · Altro |
| 2 | Dove si trova? | comune (autocomplete sui comuni FM/MC/AP) + tipo di immobile |
| 3 | A che punto sei? | Solo un'idea · Ho l'immobile · Ho già un progetto · Devo partire subito |
| 4 | In che tempi? | Entro 3 mesi · 3-6 mesi · 6-12 mesi · Non ho fretta |
| 5 | Come ti richiamiamo? | nome · telefono · email · note (opzionale) · consenso privacy |

Il passo 1 arriva già compilato se si è passati dal blocco 2 della home.
Funziona anche senza JS (fallback: un unico form). Honeypot + rate limit, niente CAPTCHA.

## 7. Scheda progetto

Copertina → il contesto e il problema → cosa abbiamo fatto → **dati duri** → galleria →
prima/dopo se c'è → CTA contestuale («Hai un intervento simile?», che precompila il form) →
progetto successivo.

I dati duri sono la parte che il committente serio legge:

| Campo | Esempio |
|---|---|
| Luogo | Fermo (FM) |
| Anno | 2024 |
| Superficie | 320 mq |
| **Ruolo dello studio** | progetto architettonico · progetto strutturale · direzione lavori · coordinamento sicurezza |
| Impresa esecutrice | (se citabile) |
| Committente | privato / Comune di … |

Il campo **ruolo** è quello che manca in tutti i siti degli studi tecnici, ed è quello che
dice cosa sanno fare davvero.

## 8. Pagina servizio

Titolo come esito → per chi è → cosa comprende → come funziona (le fasi) → **cosa serve da
te** (l'elenco dei documenti: toglie ansia e qualifica) → FAQ (`<details>` + schema
`FAQPage`) → progetti collegati → CTA.

## 9. SEO locale

- Traffico utile: navigazionale (cercano «Regolo Fermo», e forse ancora «studio Brasili»)
  e locale («ingegnere strutturista Fermo», «pratiche sisma bonus provincia di Fermo»).
- Serve **una pagina per coppia servizio × territorio** che si vuole presidiare, non una
  sola pagina servizi. Quali comuni presidiare lo decide il cliente con noi: si parte da
  dove hanno già lavorato (blocco 11), non da una lista astratta.
- Se brasili.net va dismesso: **redirect 301 verso le pagine nuove**, non verso la home,
  e mantenere il dominio attivo. È traffico e reputazione già acquisita, buttarla è un errore.
- Schema.org `ProfessionalService` + `LocalBusiness`, `FAQPage`, `Person` sul team.
- Scheda Google Business allineata al sito, con le stesse foto.

## 10. Asset da chiedere a Regolo

▲ = minimo per andare online.

1. ▲ **6-10 progetti** con foto (anche di cantiere, anche da telefono: purché loro), luogo, anno, mq, ruolo dello studio, committente se citabile
2. ▲ **Ritratti delle persone** + nome, ruolo, abilitazioni e numero d'ordine
3. ▲ Dati: P.IVA, PEC, sede, telefono diretto, orari
4. ▲ Iscrizioni: ordine degli ingegneri/architetti, coordinatore sicurezza, CTU, certificazioni
5. Coppie **prima/dopo** su 2-3 recuperi, scattate dallo stesso punto
6. 3-5 **testimonianze con nome e cognome** (basta una telefonata registrata e trascritta)
7. Numeri: anni, progetti chiusi, mq, comuni
8. Elenco dei comuni in cui hanno lavorato (per la mappa)
9. **Modelli CAD/BIM** di 2-3 progetti (Revit, IFC, SketchUp, Archicad): decidono se il 3D entra o no — vedi `web-references/blocchi/3d-e-blender.md`
10. Loghi delle imprese partner, eventuali pubblicazioni e premi

## 11. Punti aperti — decisioni che non prendiamo noi

| # | Decisione | Chi decide | Serve entro |
|---|---|---|---|
| 1 | Dominio: si tiene brasili.net, si passa a un dominio REGOLO, o si tengono entrambi con redirect | cliente | prima dello sviluppo |
| 2 | Nome e continuità di marca: quanto si eredita da Brasili | cliente | prima dei contenuti |
| 3 | Peso privato/pubblico nel fatturato: cambia l'ordine dei blocchi e i servizi in evidenza | cliente | prima della home |
| 4 | Wow n.2 (rilluminazione WebGL): dentro o fuori | Niccolò, su budget | prima dello sviluppo |
| 5 | Bilingue IT/EN: solo se c'è committenza estera reale | cliente | prima dei contenuti |
| 6 | Sezione «Note» / approfondimenti: solo se qualcuno in studio la alimenta davvero | cliente | prima del lancio |
| 7 | CMS o contenuti nel repo: dipende da chi aggiornerà i progetti | Niccolò | prima dello sviluppo |
| 8 | 3D sì/no: dipende dalla risposta al punto 9 degli asset | Niccolò, dopo la mail | prima dello sviluppo |
| 9 | Quali comuni presidiare in SEO | cliente + noi | dopo la lista lavori |
