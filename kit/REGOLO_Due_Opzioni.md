# REGOLO — due opzioni per la proposta

> 07/09/2026 · Blu Lang · per FT, da mostrare in call. I due prototipi sono pagine web
> navigabili (link nella chat Cowork del 07/09; copie in `opzioni/`). Stessa architettura di
> `REGOLO_Architettura_Sito.md`, due modi di raccontarla.

## Le due opzioni, affiancate

| | **Opzione A — «Lo studio»** | **Opzione B — «Il cantiere»** |
|---|---|---|
| Idea in una riga | Il sito che vince il confronto quando qualcuno ha già fatto il nome | Il sito che risponde subito a chi ha un intervento in mente |
| Prima cosa che si vede | Fotografia grande di un'opera realizzata, payoff in due tempi, una CTA | La domanda «Che intervento hai in mente?» con cinque percorsi |
| Linguaggio visivo | Editoriale: carta e inchiostro, serif (Instrument Serif), verde pietra, molto bianco, griglia rigorosa | Tecnico: carta millimetrata, grotesque (Bricolage), arancio segnaletico, quote da disegno tecnico, monospaziato per i dati |
| Blocco speciale | **Esploso strutturale**: i cinque livelli dell'edificio si separano allo scroll (fondazioni → struttura → involucro → impianti → finiture). Fa vedere il mestiere dell'ingegnere, invisibile nelle foto finite | **Percorso immediato**: scelto l'intervento, la pagina dice cosa comprende, come si svolge e cosa serve da te. Più il **prima/dopo** con il cursore |
| Ordine dei blocchi | hero → smistamento → progetti → servizi → come lavoriamo → esploso → persone → territorio → brief → footer | domanda + percorso → numeri → sei percorsi con «serve da te» → come lavoriamo → progetti con dati duri → prima/dopo → persone → brief → footer + barra mobile |
| Conversione | Brief in 5 passi, precompilato dallo smistamento | Lo stesso brief, precompilato dal percorso scelto; su telefono barra fissa Chiama · WhatsApp · Brief |
| Cosa dice dello studio | «Progettiamo e dirigiamo, dal disegno al cantiere»: autorevolezza, continuità, la persona che firma | «Sappiamo cosa fare e te lo diciamo subito»: chiarezza, velocità, niente ansia da pratiche |
| Quando rende di più | Committenti che scelgono con calma e confrontano più studi; opere di pregio; committenza pubblica | Chi arriva da Google con un problema preciso (pratica, bonus, sisma); molto traffico da telefono |
| Stack e costo base | Identici (Next.js, Tailwind, GSAP/Lenis, Vercel; `REGOLO_CLAUDE.md`). Cambia solo il blocco speciale | Identici. Il prima/dopo è senza librerie; i percorsi sono contenuto, non tecnologia |

I blocchi si possono ricombinare: la domanda-percorso di B può stare sotto la hero di A; l'esploso
di A può entrare in B. Le due opzioni servono a far scegliere un **tono**, non a chiudere una lista.

## Cosa è segnaposto nei prototipi (e si vede: è dichiarato in pagina)

| Elemento | Nel prototipo | Nel sito |
|---|---|---|
| Fotografie (hero, progetti, ritratti, prima/dopo) | riquadri tratteggiati / millimetrati con l'etichetta di cosa ci va | foto dello studio, mai stock né generate nei blocchi di prova |
| Numeri (anni, progetti, mq, comuni) | trattini | i loro |
| Progetti | «Progetto 01/02/03», comune e anno vuoti | 6-10 progetti reali con i dati duri e il **ruolo dello studio** |
| Persone | «Nome Cognome», ruolo generico | ritratti, nomi, ordine e abilitazioni |
| Testimonianze, territorio | assenti o solo la struttura | 3-5 citazioni con nome; elenco comuni |
| Email, PEC, P.IVA, orari | «email · PEC», «P.IVA» | dati reali |
| Elenchi «cosa serve da te» (B) | esempio scritto da noi | li valida lo studio, servizio per servizio |
| Brief | funziona come interfaccia, invio disattivato | invio allo studio via email + copia a chi compila |

Dati reali già dentro: nome, sede (Via Campiglione 2/E, Fermo), telefono 0734 510329, i sei
servizi come nominati in architettura, le competenze dichiarate su LinkedIn.

## Cosa può decidere il cliente oggi

| # | Decisione | Perché conta adesso |
|---|---|---|
| 1 | **A, B, o un mix** (il tono) | decide la direzione visiva prima di scrivere codice |
| 2 | **Dominio**: brasili.net, dominio nuovo, o entrambi con redirect | canonical, redirect e Search Console partono da qui |
| 3 | **Che foto esistono** dei progetti (anche da telefono, purché loro) | senza foto vere, A perde metà della forza; B regge meglio |
| 4 | **Peso privato / pubblico** nel loro lavoro | cambia l'ordine dei servizi e dei progetti in evidenza |
| 5 | **Chi firma**: le persone che vanno in pagina, con ordine e abilitazioni | in una STP si compra la persona |
| 6 | Se hanno **CAD/BIM** di 2-3 progetti | decide se il 3D entra (oggi non è in proposta) |

Il resto dei punti aperti è in `REGOLO_Architettura_Sito.md` § 11.

## Cosa serve dal cliente per partire (il minimo)

6-10 progetti con foto, luogo, anno, mq, ruolo dello studio · ritratti e dati delle persone ·
P.IVA, PEC, email, orari · iscrizioni agli ordini · elenco dei comuni in cui hanno lavorato.
La lista completa è in `REGOLO_Architettura_Sito.md` § 10.

## Come mostrarli in call

- Aprire i due link dal portatile; su telefono la B mostra la barra fissa in basso.
- In A: scorrere fino all'esploso e passare il mouse sulla legenda a destra.
- In B: cliccare i cinque percorsi in alto, poi provare il brief (si precompila).
- Non promettere prezzi né tempi delle pratiche: il sito, per scelta, non li dice.
