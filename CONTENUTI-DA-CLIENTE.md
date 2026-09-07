# CONTENUTI DA CLIENTE — REGOLO STP

> Ogni `[[DA CLIENTE: …]]` nel codice e ogni dato che manca. ▲ = minimo per andare online.

## Bloccanti (senza questi non si pubblica)

| Cosa | Dove serve | A chi lo chiedo | Chiesto il | Ricevuto |
|---|---|---|---|---|
| ▲ Ragione sociale esatta, P.IVA, sede legale, REA | footer, note legali, JSON-LD | titolare | | |
| ▲ Telefono diretto, email pubblica, PEC, orari | footer, contatti, JSON-LD | titolare | | |
| ▲ **Casella dove arrivano i brief** (`BRIEF_TO`) — può non essere la mail pubblica | route `/api/brief` | titolare | | |
| ▲ **Mittente delle mail del brief** (`BRIEF_FROM`): dominio da verificare su Resend | route `/api/brief` | titolare (dipende dalla decisione n. 2) | | |
| ▲ Titolare del trattamento ed email per i diritti privacy | privacy | titolare | | |
| ▲ Dominio definitivo e accesso DNS (o accesso a brasili.net) | canonical, redirect, deploy | titolare | | |
| ▲ Iscrizioni: ordini degli ingegneri/architetti, sezione, numero; coordinatore sicurezza; CTU; certificazioni | studio, persone, JSON-LD `hasCredential` | titolare | | |

## Contenuti

| Placeholder | Pagina | Cosa serve (minimo accettabile) | Chiesto il | Ricevuto |
|---|---|---|---|---|
| ▲ 6-10 progetti | /progetti, home | per ciascuno: foto (anche di cantiere, anche da telefono, purché loro), luogo, anno, mq, **ruolo dello studio**, committente se citabile | | |
| ▲ Le persone | /studio, home | ritratto, nome, ruolo, abilitazioni e numero d'ordine | | |
| Numeri | home | anni di attività, progetti chiusi, mq progettati, comuni | | |
| Elenco dei comuni in cui hanno lavorato | home (territorio), SEO | lista, anche solo nomi | | |
| 3-5 testimonianze con nome e cognome | home | basta una telefonata registrata e trascritta, ognuna legata a un progetto | | |
| Elenco «cosa serve da te» per ciascuno dei 6 servizi | /servizi/* | i documenti che chiedono davvero a un cliente per partire | | |
| Vecchie URL di brasili.net con traffico | REDIRECT.md | export da Search Console o Analytics del vecchio sito, se esiste | | |
| Loghi imprese partner, pubblicazioni, premi | home, studio | solo se citabili | | |
| Tempo di risposta da dichiarare nella mail di cortesia, se lo vogliono | mail del brief | una frase: oggi non promettiamo nessun tempo (CLAUDE.md § Obiettivo) | | |
| Se le sei voci di «tipo di immobile» del brief vanno bene | brief, passo 2 | oggi: casa indipendente · appartamento · edificio intero · capannone o ufficio · terreno · altro | | |
| Titolare del trattamento, base giuridica e tempi di conservazione dei brief | /privacy (fase 7) | serve per dichiarare Resend come responsabile e dire quanto si tengono i brief | | |

## Media (dettaglio in TODO-MEDIA.md)

| Cosa | Blocco | Minimo accettabile | Chiesto il | Ricevuto |
|---|---|---|---|---|
| ▲ Foto hero di un'opera realizzata | hero | orizzontale, lato lungo ≥ 2400 px, non un render | | |
| Coppie prima/dopo su 2-3 recuperi | prima/dopo | stesso punto di ripresa | | |
| Modelli CAD/BIM di 2-3 progetti (Revit, IFC, SketchUp, Archicad) | decide il 3D | — | | |
