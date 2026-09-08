'use client'

import { useEffect, useRef, useState } from 'react'
import { DESCRIZIONE, spigoliNormalizzati, tracciaSpigoli, VIEWBOX } from '@/lib/volume'

/**
 * Il volume assonometrico dei numeri: **due lingue per lo stesso dato**.
 *
 * 1. un `<svg>` a filo, reso dal server, che è il disegno **finito**: senza
 *    JavaScript, senza WebGL, su un telefono e con `prefers-reduced-motion` è
 *    quello che si vede, e non manca niente;
 * 2. sopra, se il browser ce la fa, un `<canvas>` in **WebGL grezzo** — nessuna
 *    libreria, `gl.LINES` sullo stesso `Float32Array` che esce da
 *    `spigoliNormalizzati()` — che gira di pochi gradi con lo scorrimento.
 *
 * La decisione n. 44 è quella che apre la porta al 3D «in pagina» e chiude
 * quella a `three.js`: ~2 KB di codice contro ~130 di libreria, e la geometria
 * è la stessa di `lib/esploso.ts`, cioè un dato del repo e non un edificio
 * modellato a mano.
 *
 * ## Le tre condizioni per accendere il canvas
 *
 * - `prefers-reduced-motion: reduce` → no. Ruota, e ruotare è movimento;
 * - `(pointer: coarse)` → no. Su un telefono un contesto WebGL costa batteria
 *   per un gesto che si vede solo scorrendo, e la pagina ha già il suo peso;
 * - `getContext('webgl')` che torna `null` → no, e il canvas resta vuoto.
 *
 * In tutti e tre i casi non si «ripiega»: **l'SVG non è mai stato tolto**. È lo
 * stesso principio del mirino CAD (`Cursore.tsx`) — la cosa che si aggiunge si
 * aggiunge sopra uno stato già completo, non al posto di un buco.
 *
 * ## Perché la rotazione è di pochi gradi
 *
 * Sopra i dieci l'assonometria smette di essere la stessa figura che sta
 * nell'SVG sotto, e il visitatore che scorre vede due oggetti invece di uno.
 * `GIRO_MAX` è la metà dell'escursione: da −6,3° a +6,3°.
 */
const GIRO_MAX = 0.11

/**
 * Quanto della finestra occupa la figura. `riquadro()` di `lib/volume.ts` mette
 * 8 unità di margine su un ingombro di 353, cioè il **95,5 %**: qui si tiene lo
 * stesso valore, così passando dall'SVG al canvas la figura non cambia taglia.
 */
const RIEMPIMENTO = 0.955

/* `o` è il centro del riquadro e **non è zero**: `spigoliNormalizzati()` centra
   la quota su `COLMO / 2`, cioè sul colmo del tetto e non sulla metà
   dell'ingombro proiettato, quindi la figura è più alta sopra l'asse che sotto.
   Misurato: mezza altezza 1,708 contro un'altezza vera di 1,558 — il 10 % di
   scarto, che senza questa sottrazione è la figura seduta storta nel riquadro. */
const VERTICE = `
attribute vec3 p;
uniform float g;
uniform vec2 s;
uniform vec2 o;
void main() {
  float c = cos(g), n = sin(g);
  vec3 r = vec3(p.x * c - p.y * n, p.x * n + p.y * c, p.z);
  vec2 q = vec2((r.x - r.y) * 0.8660254, (r.x + r.y) * 0.5 - r.z) - o;
  gl_Position = vec4(q.x * s.x, -q.y * s.y, 0.0, 1.0);
}`

const FRAMMENTO = `
precision mediump float;
uniform vec4 col;
void main() { gl_FragColor = col; }`

/** I quattro bordi della figura proiettata a un dato giro, in unità normalizzate. */
function bordi(dati: Float32Array, giro: number) {
  const c = Math.cos(giro)
  const n = Math.sin(giro)
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (let i = 0; i < dati.length; i += 3) {
    const rx = dati[i] * c - dati[i + 1] * n
    const ry = dati[i] * n + dati[i + 1] * c
    const x = (rx - ry) * 0.8660254
    const y = (rx + ry) * 0.5 - dati[i + 2]
    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y)
  }
  return [minX, maxX, minY, maxY] as const
}

export function VolumeAssonometrico() {
  const tela = useRef<HTMLCanvasElement | null>(null)
  const [acceso, setAcceso] = useState(false)

  useEffect(() => {
    const c = tela.current
    if (!c) return
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches
    ) {
      return
    }

    const gl = c.getContext('webgl', { alpha: true, antialias: true })
    if (!gl) return

    const compila = (tipo: number, sorgente: string) => {
      const s = gl.createShader(tipo)
      if (!s) return null
      gl.shaderSource(s, sorgente)
      gl.compileShader(s)
      return s
    }
    const vs = compila(gl.VERTEX_SHADER, VERTICE)
    const fs = compila(gl.FRAGMENT_SHADER, FRAMMENTO)
    const prog = gl.createProgram()
    if (!vs || !fs || !prog) return
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const dati = spigoliNormalizzati()
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, dati, gl.STATIC_DRAW)
    const aP = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(aP)
    gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 0, 0)

    /* Il colore lo decide il tema, non il codice: il canvas eredita `color` dal
       CSS e qui lo si legge. Così se un giorno la carta di B cambia, cambia
       anche il filo, e non ci sono due verità sullo stesso valore. */
    const letto = getComputedStyle(c).color.match(/[\d.]+/g) ?? ['157', '116', '96']
    const uCol = gl.getUniformLocation(prog, 'col')
    gl.uniform4f(
      uCol,
      Number(letto[0]) / 255,
      Number(letto[1]) / 255,
      Number(letto[2]) / 255,
      letto[3] === undefined ? 1 : Number(letto[3]),
    )
    const uG = gl.getUniformLocation(prog, 'g')
    const uS = gl.getUniformLocation(prog, 's')

    /* L'ingombro si misura ai tre giri estremi e si tiene l'unione: così la
       figura non «respira» dentro il riquadro mentre gira. */
    const b = [-GIRO_MAX, 0, GIRO_MAX]
      .map((g) => bordi(dati, g))
      .reduce(
        (m, v) =>
          [
            Math.min(m[0], v[0]),
            Math.max(m[1], v[1]),
            Math.min(m[2], v[2]),
            Math.max(m[3], v[3]),
          ] as const,
      )
    const semiX = (b[1] - b[0]) / 2
    const semiY = (b[3] - b[2]) / 2
    gl.uniform2f(gl.getUniformLocation(prog, 'o'), (b[0] + b[1]) / 2, (b[2] + b[3]) / 2)

    let giro = 0
    let inCoda = false

    /* **Il rettangolo si memorizza, non si rimisura a ogni evento.**
       `getBoundingClientRect()` costringe il browser a calcolare il layout, e
       chiamarlo dentro un gestore di `scroll` — ~100 volte al secondo su un
       trackpad — è il caso da manuale del *layout thrashing*. Per giunta per
       leggere un valore che **scorrendo non cambia**: la posizione della figura
       *nel documento* è la stessa a ogni pixel di scorrimento; quello che
       cambia è `scrollY`, che si legge senza toccare il layout.

       Le due sole cose che spostano la figura nel documento sono un cambio di
       impaginazione e un rientro in finestra dopo che qualcosa sopra è cresciuto:
       la prima la vede il `ResizeObserver` (che chiama `misura()`), la seconda
       l'`IntersectionObserver`, che il rettangolo ce l'ha già in mano e lo dà
       gratis. */
    let cima = 0
    let altezza = 0
    const rileva = (r: DOMRectReadOnly) => {
      cima = r.top + window.scrollY
      altezza = r.height
    }

    const disegna = () => {
      inCoda = false
      gl.viewport(0, 0, c.width, c.height)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uG, giro)
      gl.drawArrays(gl.LINES, 0, dati.length / 3)
    }
    const chiedi = () => {
      if (inCoda) return
      inCoda = true
      requestAnimationFrame(disegna)
    }

    /* Il tratto è **un pixel del dispositivo**, e non è una scelta di stile: in
       `gl.LINES` lo spessore lo decide `gl.lineWidth()`, che ogni browser
       moderno tronca a 1 — un filo più grosso in WebGL grezzo si otterrebbe solo
       disegnando ogni spigolo come due triangoli, cioè scrivendo il motore che
       la decisione n. 44 ha deciso di non avere. Il rapporto di pixel si ferma
       a 2 per non pagare quattro volte i pixel su uno schermo che ne ha nove. */
    const misura = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = c.getBoundingClientRect()
      rileva(r)
      c.width = Math.max(1, Math.round(r.width * dpr))
      c.height = Math.max(1, Math.round(r.height * dpr))
      const u = Math.min(
        (RIEMPIMENTO * c.width) / (2 * semiX),
        (RIEMPIMENTO * c.height) / (2 * semiY),
      )
      gl.uniform2f(uS, (u * 2) / c.width, (u * 2) / c.height)
    }

    /* Il giro è una funzione di **dove sta il riquadro nella finestra**, non del
       tempo: fermando lo scorrimento si ferma anche l'oggetto, che è quello che
       fa un modello guardato e non un'animazione che parte. */
    const aggiorna = () => {
      const centro = (cima - window.scrollY + altezza / 2) / window.innerHeight
      giro = (0.5 - Math.min(1, Math.max(0, centro))) * 2 * GIRO_MAX
      chiedi()
    }

    /* Fuori dalla finestra non si ascolta lo scorrimento: un listener che
       ridisegna un canvas invisibile è il modo più facile di pagare un gesto
       che nessuno vede. */
    const io = new IntersectionObserver((voci) => {
      for (const v of voci) {
        if (v.isIntersecting) {
          /* Il rettangolo dell'osservazione è già misurato: si prende da lì
             invece di chiederne uno nuovo. */
          rileva(v.boundingClientRect)
          window.addEventListener('scroll', aggiorna, { passive: true })
          aggiorna()
        } else {
          window.removeEventListener('scroll', aggiorna)
        }
      }
    })
    const ro = new ResizeObserver(() => {
      misura()
      aggiorna()
    })

    misura()
    aggiorna()
    io.observe(c)
    ro.observe(c)
    setAcceso(true)

    /* Niente `WEBGL_lose_context` in uscita, ed è una scelta: in sviluppo React
       monta l'effetto due volte, e un contesto perso non si riapre — al secondo
       giro `getContext` restituisce lo stesso oggetto, morto, e il canvas resta
       vuoto **solo in sviluppo**, cioè nel momento in cui lo si guarda. Il
       contesto se ne va con il canvas quando la rotta cambia. */
    return () => {
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('scroll', aggiorna)
    }
  }, [])

  return (
    <div className="ecolinear-volume-figura" data-webgl={acceso ? '' : undefined}>
      {/* Il degrado, e si rende per primo: è nell'HTML del server, quindi c'è
          prima che il JavaScript arrivi e resta se non arriva mai. */}
      <svg
        className="ecolinear-volume-filo"
        viewBox={VIEWBOX}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={DESCRIZIONE}
      >
        <path
          d={tracciaSpigoli()}
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* `aria-hidden`: dice la stessa cosa dell'SVG, che il nome accessibile
          ce l'ha già. Due descrizioni della stessa figura sono una di troppo. */}
      <canvas ref={tela} className="ecolinear-volume-tela" aria-hidden="true" />
    </div>
  )
}
