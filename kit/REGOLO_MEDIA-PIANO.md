# REGOLO — media-piano

> 07/09/2026 · Regole in `web-references/blocchi/media-pipeline.md`. Gerarchia: foto dello
> studio → servizio fotografico → archivio (solo atmosfera) → generato. Nei blocchi di prova
> non entra mai materiale generato o d'archivio.

## Blocco per blocco

| Blocco | Media che serve | Da dove viene | Se manca |
|---|---|---|---|
| Hero | 1 foto orizzontale di un'opera realizzata, ≥ 2400 px | studio | mezza giornata di fotografo su 2-3 opere (vale più di qualsiasi effetto); mai un render, mai stock |
| Progetti in evidenza (3) + indice (6-10) | 3-6 foto per progetto, anche di cantiere | studio (anche da telefono) | il progetto non si pubblica finché non ha almeno una foto |
| Persone (4+) | ritratti 3:4, stessa luce | fotografo o studio | rettangolo grigio; il blocco non va online senza |
| Prima / dopo (2-3) | coppie dallo stesso punto | studio | si toglie il blocco, non si simula |
| Esploso strutturale (A) | nessuna foto: **SVG costruito in codice** | noi | — |
| Territorio | SVG della provincia con i comuni | noi, dalla lista del cliente | — |
| Servizi (6) | nessuna immagine obbligatoria; eventuali icone di linea | noi | — |
| Footer | mappa statica della sede | noi (tile statico senza cookie o SVG) | — |
| Open Graph 1200×630 | 1 immagine per il sito | foto dello studio + tipografia; se serve uno sfondo, `gpt_image_2` dichiarato | — |
| Video hero | **no** | — | non serve: la foto vera vale di più |

## Da chiedere al cliente (in ordine, con il minimo per andare online)

1. ▲ **Foto dei progetti**: 6-10 progetti, ≥ 3 foto ciascuno, la migliore orizzontale ≥ 2400 px.
2. ▲ **Ritratti** delle persone che vanno in pagina (o mezza giornata di fotografo per tutto).
3. **Coppie prima/dopo** su 2-3 recuperi, stesso punto di ripresa.
4. **Logo** in vettoriale, se esiste.
5. **CAD/BIM** di 2-3 progetti: decide se il 3D entra.

## Da generare (solo dove conviene)

| Cosa | Strumento | Nota |
|---|---|---|
| Sfondo per l'Open Graph, se la foto non regge il crop | Higgsfield `gpt_image_2` | dichiarato in pagina e nei dati strutturati (IPTC `digitalSourceType`) |
| Icone di linea dei sei servizi | `gpt_image_2` → ripulite a mano, o disegnate in SVG | opzionale |
| Placeholder di staging | qualsiasi | segnati in `TODO-MEDIA.md`, sostituiti prima del go-live |

Niente immagini generate di edifici, cantieri o persone: in un settore locale il visitatore
riconosce i luoghi, e una foto finta annulla tutto il resto.

## 3D — sì o no

Domanda d'ingresso: il 3D risponde a qualcosa che una foto non risponde? Su edifici già
costruiti e fotografati, di solito no. **L'esploso strutturale si fa in SVG**, che racconta la
stessa cosa a costo zero di peso. Il 3D entra solo se lo studio manda i CAD/BIM (Revit, IFC)
di 2-3 progetti — allora la strada è conversione → `gltf-transform` → `<model-viewer>` con
fallback immagine, < 2 MB, lazy (`3d-e-blender.md`). Decisione n. 12.
