# TODO MEDIA — REGOLO STP

> Ogni immagine o video placeholder da sostituire prima del go-live, e ogni file generato con IA.
> Regola: nei blocchi di prova (progetti, persone, prima/dopo, cantieri) solo foto dello studio.

| File / blocco | Pagina | Stato | Fonte prevista | Generato con IA | Alt scritto |
|---|---|---|---|---|---|
| hero | home | placeholder | foto dello studio (opera realizzata) | no | da scrivere sul soggetto reale |
| progetti 01-03 in evidenza | home | placeholder | foto dello studio | no | |
| galleria per progetto | /progetti/* | placeholder | foto dello studio | no | |
| ritratti (4+) | home, /studio | placeholder | fotografo o foto dello studio | no | |
| prima/dopo ×2-3 | home | placeholder | foto dello studio, stesso punto | no | |
| esploso strutturale | home (A) | **da costruire in SVG nel codice**, non un'immagine | — | no | testo alternativo con i 5 livelli |
| mappa della provincia (territorio) | home | da costruire in SVG con i comuni | — | no | |
| mappa statica della sede | footer | **placeholder in pagina dalla fase 1** — da generare (tile statico o SVG), nessun cookie | — | no | |
| immagine Open Graph 1200×630 | tutte | da generare | gpt_image_2 (sfondo) + tipografia in codice, oppure foto dello studio | sì se generata → dichiarare | |
| favicon / icone | tutte | da fare dal logo, quando arriva | — | no | |

## Stato dei placeholder in codice (fase 1)

Il componente `components/Placeholder.tsx` disegna il rettangolo: tratteggio nel tema A,
carta millimetrata nel tema B, con l'etichetta di cosa ci andrà. Oggi in pagina ce n'è uno
solo — la mappa del footer. Gli altri entrano con i blocchi, alla fase 3.

Il testo mancante usa `DaCliente` dello stesso file e si vede a occhio: fondo colorato e
sottolineatura punteggiata. Il collaudo (fase 8) cerca `data-placeholder="da-cliente"`.
