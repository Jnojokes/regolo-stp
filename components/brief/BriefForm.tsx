'use client'

/**
 * Il form del brief. È il pezzo su cui si gioca tutto il sito, quindi vale la
 * pena dire come sta in piedi.
 *
 * **Un solo form, cinque passi tutti nel DOM.** Il markup servito dal server
 * contiene i cinque `<fieldset>` visibili uno sotto l'altro, con `required`
 * dove serve e un solo bottone «Invia il brief»: così com'è, senza una riga di
 * JavaScript, è un form completo e inviabile, e la validazione la fa il
 * browser (`required`, `type="email"`, `maxlength`) perché quella è HTML.
 *
 * All'idratazione `montato` passa a `true` e lo stesso markup diventa a passi:
 * si nascondono quattro fieldset, comparono la barra di avanzamento e
 * «Indietro / Avanti», e la validazione passa alla nostra
 * (`lib/brief/validazione.ts`, la stessa che gira sul server) per avere
 * messaggi in italiano invece dei fumetti del browser — per questo `noValidate`
 * si accende solo da montati.
 *
 * Il primo render lato client è identico all'HTML del server (`montato` parte
 * da `false`): niente disallineamento di idratazione, e chi ha JS lento vede
 * un form che funziona già.
 *
 * I campi restano **non controllati**: il valore vive nel DOM, si legge con
 * `new FormData(form)`. Vuol dire che il percorso con JS e quello senza
 * leggono lo stesso posto, e che il componente non ri-renderizza a ogni tasto.
 *
 * Le risposte a bottone sono `radio` nativi, non `button aria-pressed` come nel
 * prototipo: senza JS un bottone non conserva la scelta, un radio sì. E da
 * tastiera funzionano già come si deve, con le freccette.
 */

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { traccia } from '@/lib/analytics'
import { CONSENSO } from '@/lib/brief/consenso'
import {
  CAMPO_PAGINA,
  HONEYPOT,
  ULTIMO_PASSO,
  type Campo,
  type Gruppo,
  passi,
} from '@/lib/brief/domande'
import {
  type Errori,
  daFormData,
  passoDellErrore,
  validaPasso,
  validaTutto,
} from '@/lib/brief/validazione'
import { site } from '@/lib/site'

/* `anteprima` non è un guasto: è l'invio spento per scelta sul deploy delle tre
   proposte (DECISIONI.md n. 55). Ha il suo messaggio perché «non è andato a buon
   fine» lì sarebbe falso — ma resta fra i fallimenti, perché il brief non è
   partito. */
type Guasto = null | 'troppi-invii' | 'tecnico' | 'anteprima'

/* Riferimenti stabili: `useSyncExternalStore` li confronta a ogni render. */
const nessunaSottoscrizione = () => () => {}
const snapshotClient = () => true
const snapshotServer = () => false

export function BriefForm({
  interventoIniziale,
  passo1Esterno = false,
  pagina,
  idComuni,
}: {
  /** Il valore di `?intervento=`, già validato lato server. */
  interventoIniziale: string | null
  /**
   * L'opzione B: il passo 1 **non è qui**, è la hero. Le sue sei righe sono
   * `radio` con `name="intervento"` e `form="brief-form"`, cioè membri di
   * questo form anche se stanno cinquemila pixel più su — l'attributo `form`
   * include un controllo posseduto da un form fuori dal suo sottoalbero,
   * quindi il valore entra in `FormData` da sé e la validazione non cambia di
   * una riga.
   *
   * Qui il primo passo diventa una **riga di lettura** con «cambia», e il
   * percorso comincia dal secondo. La frase che si dice in call è questa:
   * *in A il brief comincia a «passo 1 di 5»; in B a «passo 2 di 5», perché la
   * prima domanda l'hai già risposta nella prima schermata.*
   *
   * Costo: questa prop e ~30 righe. Validazione, honeypot, rate limit,
   * consenso e `<datalist>`: **zero modifiche**.
   */
  passo1Esterno?: boolean
  /** Da che pagina parte il brief: finisce nella registrazione del consenso. */
  pagina: string
  /** L'id del `<datalist>` dei comuni, che il server disegna fuori dal form. */
  idComuni: string
}) {
  const router = useRouter()
  const prefisso = useId().replace(/[^a-zA-Z0-9]/g, '')

  /* `montato` dice se l'idratazione è avvenuta. `useSyncExternalStore` con uno
     snapshot lato server `false` e uno lato client `true` è il modo di saperlo
     senza chiamare setState dentro un effetto: React rende prima l'HTML del
     server — il form completo, senza passi — e passa a `true` appena idratato. */
  const montato = useSyncExternalStore(nessunaSottoscrizione, snapshotClient, snapshotServer)

  /* Con il passo 1 fuori, il percorso comincia da 1: il passo 0 resta nel
     modello (la validazione e `passoDellErrore` continuano a parlare di lui,
     e il dato c'è davvero) ma non è una schermata in cui si può stare. */
  const primoPasso = passo1Esterno ? 1 : 0
  const [passo, setPasso] = useState(primoPasso)
  const [errori, setErrori] = useState<Errori>({})
  const [inCorso, setInCorso] = useState(false)
  const [guasto, setGuasto] = useState<Guasto>(null)

  const formRef = useRef<HTMLFormElement>(null)
  const legende = useRef<(HTMLElement | null)[]>([])
  const daMettereAFuoco = useRef<number | null>(null)
  const aperturaTracciata = useRef(false)

  /* Cambiato passo: il fuoco va sulla domanda nuova. La `<legend>` contiene sia
     «Passo 3 di 5» sia la domanda, quindi con un solo spostamento di fuoco uno
     screen reader annuncia dove sei e cosa ti si chiede. */
  useEffect(() => {
    const quale = daMettereAFuoco.current
    if (quale === null) return
    daMettereAFuoco.current = null
    legende.current[quale]?.focus()
  }, [passo])

  const id = useCallback(
    (nome: string, suffisso = '') => `${prefisso}-${nome}${suffisso}`,
    [prefisso],
  )

  const leggi = () => (formRef.current ? daFormData(new FormData(formRef.current)) : {})

  const aFuoco = (nome: string) => {
    /* In B il campo `intervento` non è un discendente del form: è nella hero,
       e ci appartiene per l'attributo `form`. Se non sta nel sottoalbero lo si
       cerca nel documento — altrimenti «vai all'errore» non porterebbe da
       nessuna parte proprio sulla domanda che apre la pagina. */
    const dentro = formRef.current?.querySelector<HTMLElement>(`[name="${nome}"]`)
    if (dentro) {
      dentro.focus()
      return
    }
    /* Fuori dal sottoalbero vuol dire: è la hero di B, cinquemila pixel più su.
       Lì il solo `focus()` sposterebbe il fuoco senza far vedere dove, quindi
       si porta anche in vista. In A questo ramo non si percorre mai — tutti i
       campi sono dentro il form — ed è voluto: A non si tocca. */
    const fuori = document.querySelector<HTMLElement>(`[form="brief-form"][name="${nome}"]`)
    fuori?.scrollIntoView({ block: 'center', behavior: 'auto' })
    fuori?.focus()
  }

  function vaiAlPasso(prossimo: number) {
    daMettereAFuoco.current = prossimo
    setPasso(prossimo)
  }

  function avanti() {
    const trovati = validaPasso(passo, leggi())
    if (Object.keys(trovati).length > 0) {
      setErrori(trovati)
      aFuoco(Object.keys(trovati)[0])
      return
    }
    setErrori({})
    setGuasto(null)
    vaiAlPasso(Math.min(passo + 1, ULTIMO_PASSO))
  }

  function indietro() {
    setGuasto(null)
    vaiAlPasso(Math.max(passo - 1, primoPasso))
  }

  /** Il primo tocco sul form è «apertura form», uno dei quattro eventi. */
  function primoContatto() {
    if (aperturaTracciata.current) return
    aperturaTracciata.current = true
    traccia('brief_apertura', { pagina })
  }

  /**
   * Un messaggio d'errore va via appena il campo è a posto: tenerlo lì mentre
   * la casella è già spuntata è peggio che non averlo mai mostrato.
   * Si ricontrolla **solo** il campo che è cambiato — validare tutto il passo a
   * ogni tasto farebbe comparire errori su campi che nessuno ha ancora toccato.
   */
  function campoCambiato(evento: React.FormEvent<HTMLFormElement>) {
    primoContatto()
    const nome = (evento.target as unknown as { name?: string }).name
    if (!nome || !errori[nome]) return
    const rimasti = validaPasso(passo, leggi())
    if (rimasti[nome]) return
    setErrori((precedenti) => {
      const { [nome]: risolto, ...resto } = precedenti
      void risolto
      return resto
    })
  }

  async function invia(evento: React.FormEvent<HTMLFormElement>) {
    // Senza JS non si passa da qui: il browser fa il POST del form e basta.
    evento.preventDefault()
    const form = evento.currentTarget

    // Invio da tastiera in mezzo al percorso: non è un invio, è un «Avanti».
    if (passo < ULTIMO_PASSO) {
      avanti()
      return
    }

    const trovati = validaTutto(leggi())
    if (Object.keys(trovati).length > 0) {
      setErrori(trovati)
      const dove = Math.max(passoDellErrore(trovati), primoPasso)
      if (dove !== passo) vaiAlPasso(dove)
      aFuoco(Object.keys(trovati)[0])
      return
    }

    setErrori({})
    setGuasto(null)
    setInCorso(true)

    try {
      const risposta = await fetch(form.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })

      if (risposta.ok) {
        traccia('brief_inviato', { pagina })
        // Se la copia di cortesia non è partita la pagina di ringraziamento
        // lo dice, invece di promettere una mail che non è uscita.
        const corpo = (await risposta.json().catch(() => null)) as {
          cortesiaInviata?: boolean
        } | null
        router.push(corpo?.cortesiaInviata === false ? '/brief/inviato?copia=no' : '/brief/inviato')
        return
      }

      if (risposta.status === 429) {
        setGuasto('troppi-invii')
      } else if (risposta.status === 422) {
        const corpo = (await risposta.json()) as { errori?: Errori }
        const dalServer = corpo.errori ?? {}
        setErrori(dalServer)
        const dove = Math.max(passoDellErrore(dalServer), primoPasso)
        if (dove !== passo) vaiAlPasso(dove)
      } else {
        // Il 503 dell'anteprima porta `motivo: 'anteprima'`; tutto il resto è
        // un guasto vero, e un corpo illeggibile anche.
        const corpo = (await risposta.json().catch(() => null)) as { motivo?: string } | null
        setGuasto(corpo?.motivo === 'anteprima' ? 'anteprima' : 'tecnico')
      }
    } catch {
      // Rete caduta a metà: le risposte restano dove sono, si riprova.
      setGuasto('tecnico')
    } finally {
      setInCorso(false)
    }
  }

  const errore = (nome: string) => errori[nome]

  return (
    <form
      ref={formRef}
      id="brief-form"
      action="/api/brief"
      method="post"
      noValidate={montato}
      onSubmit={invia}
      onFocusCapture={primoContatto}
      onChangeCapture={campoCambiato}
      className="brief-scheda"
    >
      {/* Trappola per i bot: fuori dall'albero di accessibilità e fuori dal
          percorso di tabulazione, quindi invisibile a chi compila davvero.
          Se arriva pieno, l'invio si scarta senza dire perché. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={id(HONEYPOT)}>Sito web</label>
        <input
          id={id(HONEYPOT)}
          name={HONEYPOT}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <input type="hidden" name={CAMPO_PAGINA} value={pagina} />

      {/* La barra di avanzamento è **la terza e ultima quota del sito**: cinque
          tacche, il tratto pieno fino a quella corrente, e l'annotazione che
          dice a che punto si è. È l'unica quota che si muove, perché è l'unico
          posto del sito dove la quantità cambia (DECISIONI n. 17).

          Il disegno è `aria-hidden` — il conto in chiaro sta nella `<legend>` di
          ogni passo, e sentirlo due volte è rumore — ma l'annotazione si rende
          **sempre**, anche senza JavaScript: senza JS i cinque `<fieldset>` sono
          tutti visibili e «passo 1 di 5» è vero a pagina ferma. Per questo sta
          **fuori** dai fieldset e si rende una volta sola. */}
      <div className="brief-avanzamento">
        <ol className={'brief-tacche'} aria-hidden="true">
          {passi.map((p, i) => (
            /* Senza JavaScript nessuna tacca prendeva `data-fatto`: il disegno
               diceva zero su cinque mentre l'annotazione accanto diceva
               «passo 1 di 5». Sono le due metà della stessa quota e devono
               dire la stessa cosa. Senza JS si è al passo 1, quindi si accende
               la prima e una sola — non tutte, che direbbe «finito». */
            <li key={p.id} data-fatto={i <= (montato ? passo : primoPasso) ? '' : undefined} />
          ))}
        </ol>
        <p className="brief-avanzamento-conta" aria-hidden="true" data-numero="">
          passo {(montato ? passo : primoPasso) + 1} di {passi.length}
        </p>
      </div>

      {passi.map((p, i) => {
        /* ---- opzione B: il passo 1 è la hero, qui è una riga di lettura ----
           I sei valori sono tutti nel markup e li accende `:has()` guardando
           quale radio della hero è spuntato: **zero JavaScript**, e il testo è
           testo vero — selezionabile, copiabile, letto dagli screen reader —
           non un `content` generato. Senza `:has()` resta visibile la riga
           «non ancora scelto», che è una degradazione onesta.
           `cambia` è un'ancora al registro: riporta alla domanda invece di
           duplicarla qui. */
        if (i === 0 && passo1Esterno) {
          const gruppo = p.elementi.find((el) => el.genere === 'gruppo')
          const opzioni = gruppo && gruppo.genere === 'gruppo' ? gruppo.opzioni : []
          return (
            <p
              key={p.id}
              className="brief-risposta"
              data-errore={errore('intervento') ? '' : undefined}
            >
              <span className="brief-risposta-chiave">1 · {p.domanda.toLowerCase()}</span>
              <span className="brief-risposta-valore">
                {opzioni.map((o) => (
                  <span key={o.valore} data-vale={o.valore}>
                    {o.etichetta}
                  </span>
                ))}
                <span className="brief-risposta-vuoto">non ancora scelto</span>
              </span>
              <a href="#percorsi" className="brief-risposta-cambia">
                cambia
              </a>
            </p>
          )
        }

        const soloGruppo = p.elementi.length === 1 && p.elementi[0].genere === 'gruppo'
        const gruppoUnico = soloGruppo ? (p.elementi[0] as Gruppo) : null
        const descrizioni = [
          p.aiuto ? id(p.id, '-aiuto') : null,
          gruppoUnico && errore(gruppoUnico.nome) ? id(gruppoUnico.nome, '-errore') : null,
        ].filter(Boolean) as string[]

        return (
          <fieldset
            key={p.id}
            className="brief-passo"
            hidden={montato && passo !== i}
            aria-describedby={descrizioni.length ? descrizioni.join(' ') : undefined}
          >
            <legend
              className="brief-domanda"
              tabIndex={-1}
              ref={(el) => {
                legende.current[i] = el
              }}
            >
              <span className="brief-conta" hidden={!montato}>
                Passo {i + 1} di {passi.length}
              </span>
              <span className="brief-domanda-testo">{p.domanda}</span>
            </legend>

            {p.aiuto && (
              <p id={id(p.id, '-aiuto')} className="brief-aiuto">
                {p.aiuto}
              </p>
            )}

            {p.elementi.map((el) => {
              if (el.genere === 'gruppo') {
                return (
                  <GruppoDiScelta
                    key={el.nome}
                    gruppo={el}
                    id={id}
                    errore={errore(el.nome)}
                    /* Un solo elemento nel passo: la legend del passo è già
                       l'etichetta del gruppo, non serve annidare un fieldset. */
                    annidato={!soloGruppo}
                    valoreIniziale={el.nome === 'intervento' ? interventoIniziale : null}
                  />
                )
              }
              if (el.genere === 'campo') {
                return (
                  <CampoDiTesto
                    key={el.nome}
                    campo={el}
                    id={id}
                    errore={errore(el.nome)}
                    idComuni={idComuni}
                  />
                )
              }
              return <CasellaConsenso key={el.nome} id={id} errore={errore(el.nome)} />
            })}
          </fieldset>
        )
      })}

      {guasto && (
        <p
          className="brief-guasto"
          /* L'anteprima è un'informazione, non un allarme: `status` si fa
             leggere senza interrompere, e il filetto smette di essere rosso. */
          role={guasto === 'anteprima' ? 'status' : 'alert'}
          data-tipo={guasto === 'anteprima' ? 'anteprima' : undefined}
        >
          {guasto === 'troppi-invii' ? (
            <>
              Sono già partiti diversi brief da questa connessione. Le risposte sono qui, riprova
              fra qualche minuto — oppure chiama lo studio allo{' '}
              <a href={`tel:${site.telefonoHref}`}>{site.telefono}</a>.
            </>
          ) : guasto === 'anteprima' ? (
            <>
              Questa è un’anteprima: l’invio è spento, quindi il brief non è partito e non è stato
              salvato da nessuna parte. Sul sito vero, a questo punto, arriva allo studio, e chi lo
              compila ne riceve una copia per mail.
            </>
          ) : (
            <>
              L’invio non è andato a buon fine. Le risposte sono ancora qui: riprova, oppure chiama
              lo studio allo <a href={`tel:${site.telefonoHref}`}>{site.telefono}</a>.
            </>
          )}
        </p>
      )}

      <div className="brief-azioni">
        <button
          type="button"
          className="btn btn-ghost brief-indietro"
          /* Con il passo 1 fuori, il primo passo utile è l'1: «Indietro» lì non
           porta da nessuna parte, e un bottone che non fa niente è peggio di un
           bottone che non c'è. Per tornare alla prima domanda c'è «cambia»
           nella riga di lettura, che risale alla hero. */
          hidden={!montato || passo === primoPasso}
          onClick={indietro}
        >
          Indietro
        </button>
        <button
          type="button"
          className="btn"
          hidden={!montato || passo === ULTIMO_PASSO}
          onClick={avanti}
        >
          Avanti
        </button>
        <button
          type="submit"
          className="btn"
          hidden={montato && passo !== ULTIMO_PASSO}
          disabled={inCorso}
        >
          {inCorso ? 'Invio…' : 'Invia il brief'}
        </button>
      </div>
    </form>
  )
}

/* -------------------------------------------------------------------------- */

type IdFn = (nome: string, suffisso?: string) => string

function GruppoDiScelta({
  gruppo,
  id,
  errore,
  annidato,
  valoreIniziale,
}: {
  gruppo: Gruppo
  id: IdFn
  errore?: string
  annidato: boolean
  valoreIniziale: string | null
}) {
  const idErrore = id(gruppo.nome, '-errore')

  const opzioni = (
    <>
      <div className="brief-opzioni">
        {gruppo.opzioni.map((o) => (
          <label key={o.valore} className="brief-opzione">
            <input
              type="radio"
              name={gruppo.nome}
              value={o.valore}
              defaultChecked={valoreIniziale === o.valore}
              required
            />
            <span>{o.etichetta}</span>
          </label>
        ))}
      </div>
      {errore && (
        <p id={idErrore} className="brief-errore">
          {errore}
        </p>
      )}
    </>
  )

  if (!annidato) return opzioni

  return (
    <fieldset className="brief-sottogruppo" aria-describedby={errore ? idErrore : undefined}>
      <legend className="brief-etichetta">{gruppo.etichetta}</legend>
      {opzioni}
    </fieldset>
  )
}

function CampoDiTesto({
  campo,
  id,
  errore,
  idComuni,
}: {
  campo: Campo
  id: IdFn
  errore?: string
  idComuni: string
}) {
  const idCampo = id(campo.nome)
  const idErrore = id(campo.nome, '-errore')
  const idAiuto = id(campo.nome, '-aiuto')
  const descritto = [campo.aiuto ? idAiuto : null, errore ? idErrore : null]
    .filter(Boolean)
    .join(' ')

  /* Il comune: autocomplete nativo con `list` + `<datalist>`. Nessun JavaScript,
     nessuna libreria, e i 128 nomi stanno nell'HTML servito invece che nel
     bundle (il datalist lo disegna il componente server). */
  const eComune = campo.tipo === 'comune'

  return (
    <div className="brief-campo">
      <label htmlFor={idCampo} className="brief-etichetta">
        {campo.etichetta}
      </label>
      {campo.aiuto && (
        <p id={idAiuto} className="brief-aiuto">
          {campo.aiuto}
        </p>
      )}
      {campo.tipo === 'testolungo' ? (
        <textarea
          id={idCampo}
          name={campo.nome}
          rows={3}
          maxLength={campo.massimo}
          required={campo.obbligatorio}
          aria-invalid={errore ? true : undefined}
          aria-describedby={descritto || undefined}
        />
      ) : (
        <input
          id={idCampo}
          name={campo.nome}
          type={campo.tipo === 'tel' ? 'tel' : campo.tipo === 'email' ? 'email' : 'text'}
          inputMode={campo.tipo === 'tel' ? 'tel' : campo.tipo === 'email' ? 'email' : undefined}
          autoComplete={campo.autoCompleta}
          maxLength={campo.massimo}
          required={campo.obbligatorio}
          /* `pattern` e `title` servono al percorso **senza JavaScript**: sono
             loro a far fermare l'invio sul campo, invece di far scoprire
             l'errore al server dopo il POST — che senza JS vuol dire perdere
             tutte e cinque le risposte. Con JS `noValidate` li disattiva e i
             messaggi tornano i nostri, in italiano. */
          pattern={campo.schema}
          title={campo.schema ? campo.schemaTitolo : undefined}
          aria-invalid={errore ? true : undefined}
          aria-describedby={descritto || undefined}
          list={eComune ? idComuni : undefined}
          spellCheck={eComune ? false : undefined}
        />
      )}
      {errore && (
        <p id={idErrore} className="brief-errore">
          {errore}
        </p>
      )}
    </div>
  )
}

/**
 * Il consenso. Tre cose non negoziabili (CLAUDE.md § Il form):
 * non pre-spuntata, link all'informativa, e il testo è quello registrato —
 * arriva da `CONSENSO`, non è riscritto qui.
 * Il link apre in una scheda nuova perché andarsene dalla pagina, senza
 * JavaScript, vuol dire perdere le risposte.
 */
function CasellaConsenso({ id, errore }: { id: IdFn; errore?: string }) {
  const idCampo = id('consenso')
  const idErrore = id('consenso', '-errore')

  return (
    <div className="brief-campo">
      <div className="brief-consenso">
        <input
          type="checkbox"
          id={idCampo}
          name="consenso"
          value="si"
          required
          aria-invalid={errore ? true : undefined}
          aria-describedby={errore ? idErrore : undefined}
        />
        <label htmlFor={idCampo}>
          {CONSENSO.primaDelLink}
          <Link href={CONSENSO.href} target="_blank" rel="noopener">
            {CONSENSO.testoDelLink}
            <span className="sr-only"> (si apre in una scheda nuova)</span>
          </Link>
          {CONSENSO.dopoIlLink}
        </label>
      </div>
      {errore && (
        <p id={idErrore} className="brief-errore">
          {errore}
        </p>
      )}
    </div>
  )
}
