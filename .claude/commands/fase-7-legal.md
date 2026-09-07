Leggi `CLAUDE.md`, `STATO.md`, `DECISIONI.md` e `REGOLO_SEO-GEO-LEGAL.md`. Applica la skill
`sito-seo-geo-legal` (parte legal) e i suoi `templates/`.

**Fase 7 — legal.** Titolare = REGOLO STP con ragione sociale esatta, P.IVA, sede, PEC: finché
mancano, le tre pagine restano `noindex`, con `[[DA CLIENTE]]` al posto dei dati, e la riga è
in `CONTENUTI-DA-CLIENTE.md`.

- `/privacy`, `/cookie`, `/note-legali` dai template: dati raccolti (brief via Resend,
  navigazione su Vercel, misurazione senza cookie), basi giuridiche in tabella, conservazione,
  fornitori con link alle loro policy (Vercel, Resend, Vercel Analytics o Plausible),
  trasferimenti extra-UE, diritti artt. 15-22, Garante. Cookie policy che dice **che il sito non
  usa cookie non tecnici** e cosa succede se si rifiutano quelli tecnici (niente). Note legali
  con art. 7 D.Lgs. 70/2003 + art. 2250 c.c., ordini professionali, diritti sulle foto dei
  progetti, dichiarazione sui contenuti generati con IA (solo lo sfondo OG, se generato), foro.
- Analytics **senza cookie** (decisione n. 10): nessun banner. Se cambia idea, il banner segue
  il capitolato § 4.2.
- Nessun iframe di terzi. La mappa nel footer è statica.
- Form: checkbox non pre-spuntata con link a `/privacy` (fase 2); l'informativa dice dove
  finiscono i dati.
- Link alle tre pagine nel footer di ogni pagina, e i link rispondono 200.

Aggiorna `STATO.md` (prossima: `/fase-8-collaudo`). Poi fermati e mostrami le tre pagine.

Prima di fermarti: `git add -A && git commit -m "fase 7 — legal"`. Niente push: lo fa chi segue il progetto da GitHub Desktop.
