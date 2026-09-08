'use client'

import { useEffect, useRef } from 'react'
import { volumi } from '@/lib/esploso'

/**
 * Il volume in **WebGL grezzo**: cinque livelli che si separano allo
 * scorrimento, senza nessuna libreria.
 *
 * ## Perché senza libreria
 *
 * `three.js` tree-shaken sta a ~130 KB gz su un budget di 180 KB gz per tutto
 * il primo carico. Quello che serve qui è: proiezione in prospettiva, un depth
 * buffer, e quaranta parallelepipedi a facce piene. È un `mat4`, due shader di
 * dieci righe e un `drawElements`. Il resto di un motore 3D — materiali, luci,
 * scene graph, caricatori, raycasting — non entrerebbe mai in pagina.
 *
 * ## Perché il canvas non decide niente
 *
 * Non c'è nessun `if (supportaWebGL)` da qualche parte a scegliere fra due rami.
 * L'SVG in prospettiva reso dal server **è già in pagina** (`Volume.tsx`), e
 * questo componente gli si mette sopra *solo se* riesce: se `getContext` torna
 * `null`, se uno shader non compila, o se `prefers-reduced-motion` è `reduce`,
 * la funzione esce e non tocca niente. Il fallback non è un ramo da ricordarsi:
 * è lo stato di partenza.
 *
 * ## Le tre cautele
 *
 * 1. **`prefers-reduced-motion` si legge, non si assume.** Il volume si muove
 *    con lo scorrimento, quindi con la preferenza attiva non si monta affatto e
 *    resta l'SVG con i livelli separati — che è il fotogramma finale, cioè la
 *    figura completa. Si ascolta anche il cambio della preferenza a pagina
 *    aperta: chi la attiva mentre legge non deve ricaricare;
 * 2. **niente `requestAnimationFrame` continuo.** Un ciclo che gira sempre
 *    scalda il telefono per disegnare lo stesso fotogramma. Si ridisegna solo
 *    quando la progressione di scorrimento è cambiata davvero, e si smette del
 *    tutto quando il blocco esce dalla finestra (`IntersectionObserver`);
 * 3. **il contesto si perde.** Su mobile il browser può revocare un contesto
 *    WebGL sotto pressione di memoria: `webglcontextlost` va gestito, altrimenti
 *    al ritorno resta un canvas nero **sopra** l'SVG buono. Qui si nasconde il
 *    canvas e ricompare il disegno del server.
 */

/* ---------- le due matrici, scritte a mano --------------------------------- */

/**
 * Prodotto di due matrici 4×4 **in ordine colonna**, che è come le vuole WebGL
 * (`uniformMatrix4fv` con `transpose = false`) e come sono scritte le tre qui
 * sotto: `m[colonna * 4 + riga]`.
 *
 * La prima versione moltiplicava **in riga** mentre le matrici erano scritte in
 * colonna. Il risultato non era un errore visibile: era un canvas **vuoto**, e
 * cioè il difetto peggiore dei tre stati di degrado — accendendosi il canvas
 * nasconde l'SVG reso dal server, quindi il blocco *sembrava* funzionare e non
 * c'era niente.
 *
 * Come si è trovato, perché il metodo conta più della correzione: la matematica
 * rifatta in Node sugli stessi dati dava **87 vertici su 104 dentro il tronco di
 * vista**, quindi la geometria era giusta; un triangolo di prova disegnato nella
 * stessa pagina riempiva il **32 %** dei pixel, quindi WebGL funzionava; e
 * `getUniform` sulla `uVP` viva mostrava **zeri** dove Node aveva 0,51. Tre
 * misure, e la terza dice dov'è il difetto. Controllare `data-acceso` diceva
 * solo che il programma era stato linkato.
 */
function per(a: Float32Array, b: Float32Array): Float32Array {
  const r = new Float32Array(16)
  for (let col = 0; col < 4; col += 1)
    for (let riga = 0; riga < 4; riga += 1)
      r[col * 4 + riga] =
        a[riga] * b[col * 4] +
        a[4 + riga] * b[col * 4 + 1] +
        a[8 + riga] * b[col * 4 + 2] +
        a[12 + riga] * b[col * 4 + 3]
  return r
}

function prospettiva(fovY: number, aspetto: number, vicino: number, lontano: number) {
  const f = 1 / Math.tan(fovY / 2)
  const d = 1 / (vicino - lontano)
  return new Float32Array([
    f / aspetto,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (vicino + lontano) * d,
    -1,
    0,
    0,
    2 * vicino * lontano * d,
    0,
  ])
}

function rotaX(a: number) {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1])
}

function rotaZ(a: number) {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return new Float32Array([c, s, 0, 0, -s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
}

function trasla(x: number, y: number, z: number) {
  return new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1])
}

/* ---------- la geometria, dalle stesse scatole dell'esploso ---------------- */

/**
 * Le sei facce di un cubo unitario, con la **tinta** che dipende dalla
 * direzione: sono le stesse quattro di `lib/esploso.ts` (alto, sinistra,
 * destra) più il basso. Le tinte non arrivano da una luce calcolata — non c'è
 * una luce — arrivano dai token del tema, letti dal CSS: un edificio illuminato
 * da un sole finto è la cosa che fa sembrare generato un volume.
 */
const FACCE: readonly { indici: readonly number[]; tinta: number }[] = [
  { indici: [0, 1, 2, 0, 2, 3], tinta: 0 }, // z = 1, alto
  { indici: [4, 6, 5, 4, 7, 6], tinta: 3 }, // z = 0, basso
  { indici: [0, 4, 5, 0, 5, 1], tinta: 2 }, // y = 0
  { indici: [3, 2, 6, 3, 6, 7], tinta: 1 }, // y = 1
  { indici: [1, 5, 6, 1, 6, 2], tinta: 2 }, // x = 1
  { indici: [0, 3, 7, 0, 7, 4], tinta: 1 }, // x = 0
]

const ANGOLI: readonly (readonly [number, number, number])[] = [
  [0, 0, 1],
  [1, 0, 1],
  [1, 1, 1],
  [0, 1, 1],
  [0, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
  [0, 1, 0],
]

const CENTRO = 3

/** Vertici e indici di tutti i livelli, con l'indice di livello per vertice. */
function costruisciMaglia() {
  const posizioni: number[] = []
  const tinte: number[] = []
  const livelli: number[] = []
  const indici: number[] = []

  volumi.forEach((liv, iLiv) => {
    for (const s of liv.scatole) {
      for (const f of FACCE) {
        const base = posizioni.length / 3
        /* Ogni faccia ha i **propri** otto vertici: condividerli fra facce
           costringerebbe a interpolare la tinta sugli spigoli, e le facce di
           questo volume sono piene per scelta — niente sfumature. */
        for (const a of ANGOLI) {
          posizioni.push(s.x + a[0] * s.w - CENTRO, s.y + a[1] * s.d - CENTRO, s.z + a[2] * s.h)
          tinte.push(f.tinta)
          livelli.push(iLiv)
        }
        for (const i of f.indici) indici.push(base + i)
      }
    }
  })

  return {
    posizioni: new Float32Array(posizioni),
    tinte: new Float32Array(tinte),
    livelli: new Float32Array(livelli),
    indici: new Uint16Array(indici),
  }
}

const VERTEX = `
attribute vec3 aPos;
attribute float aTinta;
attribute float aLivello;
uniform mat4 uVP;
uniform float uApertura;
uniform float uStacchi[5];
varying float vTinta;
void main() {
  vec3 p = aPos;
  int i = int(aLivello + 0.5);
  float dz = uStacchi[0];
  if (i == 1) dz = uStacchi[1];
  else if (i == 2) dz = uStacchi[2];
  else if (i == 3) dz = uStacchi[3];
  else if (i == 4) dz = uStacchi[4];
  p.z += dz * uApertura;
  vTinta = aTinta;
  gl_Position = uVP * vec4(p, 1.0);
}`

const FRAGMENT = `
precision mediump float;
uniform vec3 uTinte[4];
varying float vTinta;
void main() {
  int i = int(vTinta + 0.5);
  vec3 c = uTinte[0];
  if (i == 1) c = uTinte[1];
  else if (i == 2) c = uTinte[2];
  else if (i == 3) c = uTinte[3];
  gl_FragColor = vec4(c, 1.0);
}`

/** `#rrggbb` → tre float 0-1. I token del tema sono esadecimali. */
function tinta(hex: string): [number, number, number] {
  const n = hex.trim().replace('#', '')
  const v =
    n.length === 3
      ? n
          .split('')
          .map((c) => c + c)
          .join('')
      : n
  return [
    parseInt(v.slice(0, 2), 16) / 255,
    parseInt(v.slice(2, 4), 16) / 255,
    parseInt(v.slice(4, 6), 16) / 255,
  ]
}

export function VolumeVivo() {
  const riferimento = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const tela = riferimento.current
    if (!tela) return

    const motoRidotto = window.matchMedia('(prefers-reduced-motion: reduce)')
    let vivo = false
    let smonta: (() => void) | undefined

    const accendi = () => {
      if (vivo || motoRidotto.matches) return
      const gl = tela.getContext('webgl', { antialias: true, alpha: true })
      if (!gl) return

      const compila = (tipo: number, sorgente: string) => {
        const s = gl.createShader(tipo)
        if (!s) return null
        gl.shaderSource(s, sorgente)
        gl.compileShader(s)
        return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null
      }
      const vs = compila(gl.VERTEX_SHADER, VERTEX)
      const fs = compila(gl.FRAGMENT_SHADER, FRAGMENT)
      const prog = vs && fs ? gl.createProgram() : null
      if (!vs || !fs || !prog) return
      gl.attachShader(prog, vs)
      gl.attachShader(prog, fs)
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
      gl.useProgram(prog)

      const maglia = costruisciMaglia()
      const buffer = (dati: Float32Array, nome: string, componenti: number) => {
        const b = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, b)
        gl.bufferData(gl.ARRAY_BUFFER, dati, gl.STATIC_DRAW)
        const loc = gl.getAttribLocation(prog, nome)
        gl.enableVertexAttribArray(loc)
        gl.vertexAttribPointer(loc, componenti, gl.FLOAT, false, 0, 0)
      }
      buffer(maglia.posizioni, 'aPos', 3)
      buffer(maglia.tinte, 'aTinta', 1)
      buffer(maglia.livelli, 'aLivello', 1)
      const ib = gl.createBuffer()
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib)
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, maglia.indici, gl.STATIC_DRAW)

      /* Le quattro tinte dai token del **volume**, non da quelli dell'esploso
         di A: quelli sono tarati su una banda scura e sulla carta calda stanno
         a 1,13-2,19:1, cioè il disegno era della stessa tinta del foglio. Il
         perché per esteso sta in `app/css/fonderia.css`, blocco «Le tinte del
         volume». Leggerle dal CSS e non scriverle qui è la ragione per cui il
         giorno che la carta cambia il volume cambia con lei. */
      const stile = getComputedStyle(tela.parentElement || tela)
      const leggi = (nome: string, ripiego: string) =>
        tinta(stile.getPropertyValue(nome) || ripiego)
      gl.uniform3fv(
        gl.getUniformLocation(prog, 'uTinte'),
        new Float32Array([
          ...leggi('--volume-alto', '#8f8b84'),
          ...leggi('--volume-sinistra', '#6a665f'),
          ...leggi('--volume-destra', '#46443f'),
          ...leggi('--volume-basso', '#2e2c28'),
        ]),
      )
      gl.uniform1fv(
        gl.getUniformLocation(prog, 'uStacchi'),
        new Float32Array(volumi.map((l) => l.dz)),
      )

      gl.enable(gl.DEPTH_TEST)
      gl.clearColor(0, 0, 0, 0)

      const locVP = gl.getUniformLocation(prog, 'uVP')
      const locApertura = gl.getUniformLocation(prog, 'uApertura')

      let ultima = -1
      const disegna = () => {
        const r = tela.getBoundingClientRect()
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        const w = Math.round(r.width * dpr)
        const h = Math.round(r.height * dpr)
        if (tela.width !== w || tela.height !== h) {
          tela.width = w
          tela.height = h
          ultima = -1
        }
        /* La progressione: 0 quando il blocco entra dal basso, 1 quando il suo
           centro è al centro della finestra. È la stessa corsa della colata, e
           per la stessa ragione: il gesto deve finire *mentre* si guarda, non
           quando è già passato. */
        const finestra = window.innerHeight
        const grezza = 1 - (r.top + r.height / 2 - finestra / 2) / finestra
        const apertura = Math.max(0, Math.min(1, grezza))
        if (Math.abs(apertura - ultima) < 0.004) return
        ultima = apertura

        gl.viewport(0, 0, w, h)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        /* **La camera è risolta, non aggiustata a occhio.** I due numeri —
           `dy = -6` e `distanza = 35,5` — vengono da una ricerca su
           `lib/volume.ts` che cerca la massima estensione verticale
           dell'esploso che resta entro ±0,90 in NDC **in tutti e quattro i
           casi**: pacchetto chiuso e aperto, riquadro a 1440 e a 390. Con i
           valori di prima (−1,5 e 34) due livelli su cinque uscivano dal bordo
           alto: NDC y arrivava a **1,41**. Adesso −0,89 → 0,89 a 1440 e lo
           stesso a 390, dove il riquadro è più stretto e la x va da −0,71 a
           0,75. Un volume centrato e piccolo in mezzo al vuoto non è composto,
           è avanzato: il criterio è **riempire**, non stare dentro. */
        const vista = per(
          per(trasla(0, -6, -35.5), rotaX(-(90 - 24) * (Math.PI / 180))),
          rotaZ(34 * (Math.PI / 180)),
        )
        gl.uniformMatrix4fv(
          locVP,
          false,
          per(prospettiva((32 * Math.PI) / 180, w / h || 1, 0.5, 200), vista),
        )
        gl.uniform1f(locApertura, apertura)
        gl.drawElements(gl.TRIANGLES, maglia.indici.length, gl.UNSIGNED_SHORT, 0)
      }

      let inVista = false
      let sospeso: number | null = null
      const chiedi = () => {
        if (sospeso !== null) return
        sospeso = requestAnimationFrame(() => {
          sospeso = null
          if (inVista) disegna()
        })
      }
      /* Nessun ciclo continuo: si disegna quando la pagina si muove, e solo
         mentre il blocco è in vista. Un `requestAnimationFrame` che gira sempre
         per ridisegnare lo stesso fotogramma è come si scalda un telefono. */
      const osservatore = new IntersectionObserver(
        ([voce]) => {
          inVista = voce.isIntersecting
          if (inVista) chiedi()
        },
        { rootMargin: '20% 0px' },
      )
      osservatore.observe(tela)
      window.addEventListener('scroll', chiedi, { passive: true })
      window.addEventListener('resize', chiedi)

      /* Il contesto si può perdere: su mobile il browser lo revoca sotto
         pressione di memoria. Senza questo, al ritorno resta un canvas nero
         **sopra** l'SVG buono — cioè un difetto peggiore di non avere il 3D. */
      const perso = (e: Event) => {
        e.preventDefault()
        tela.removeAttribute('data-acceso')
      }
      const tornato = () => {
        smonta?.()
        vivo = false
        accendi()
      }
      tela.addEventListener('webglcontextlost', perso)
      tela.addEventListener('webglcontextrestored', tornato)

      tela.setAttribute('data-acceso', '')
      vivo = true
      chiedi()

      smonta = () => {
        osservatore.disconnect()
        window.removeEventListener('scroll', chiedi)
        window.removeEventListener('resize', chiedi)
        tela.removeEventListener('webglcontextlost', perso)
        tela.removeEventListener('webglcontextrestored', tornato)
        if (sospeso !== null) cancelAnimationFrame(sospeso)
        tela.removeAttribute('data-acceso')
      }
    }

    const spegni = () => {
      smonta?.()
      smonta = undefined
      vivo = false
    }

    /* La preferenza si può cambiare a pagina aperta, e chi la attiva mentre
       legge non deve ricaricare per essere ascoltato. */
    const cambio = () => (motoRidotto.matches ? spegni() : accendi())
    motoRidotto.addEventListener('change', cambio)
    accendi()

    return () => {
      motoRidotto.removeEventListener('change', cambio)
      spegni()
    }
  }, [])

  /* `aria-hidden`: il contenuto è l'SVG accanto (che ha il nome accessibile) e
     la legenda in testo. Un canvas che ripete la stessa cosa a chi ascolta è
     rumore, e senza `data-acceso` il CSS lo tiene invisibile — quindi finché
     WebGL non è partito **non copre niente**. */
  return <canvas ref={riferimento} className="volume-vivo" aria-hidden="true" />
}
