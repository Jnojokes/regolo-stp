/**
 * Geometria del blocco «Territorio»: il perimetro delle tre province
 * dell'autocomplete del brief (FM, MC, AP — CLAUDE.md § Il form) e il punto di
 * ciascuno dei loro 128 comuni. È il riquadro geografico, non un'affermazione
 * su dove lo studio abbia lavorato.
 *
 * GENERATO — non modificare a mano: `node scripts/genera-territorio.mjs`.
 * Sorgente: confini amministrativi ISTAT via openpolis/geojson-italy.
 * Rigenerato il 2026-09-07. Semplificazione Douglas-Peucker a 0.0012° (~100 m).
 * FM 166 vertici · MC 255 vertici · AP 160 vertici.
 *
 * Niente mappa a tile (CLAUDE.md § Homepage, blocco 11): un tile server è un
 * terzo che vede l'IP di chi visita. Questo SVG non chiama nessuno.
 *
 * **Quali comuni sono serviti è la decisione n. 13, aperta.** I 128 punti stanno
 * qui perché la geometria non è un'affermazione; accenderne uno lo è. Finché lo
 * studio non manda la lista, `comuniServiti` resta vuoto e in pagina non si
 * accende nessun punto.
 */

export const VIEWBOX = { larghezza: 640, altezza: 637 } as const

/** `cx`/`cy` è il centroide dell'area: ci va l'etichetta col nome. */
export type PercorsoProvincia = {
  sigla: string
  nome: string
  d: string
  cx: number
  cy: number
}

export const province: readonly PercorsoProvincia[] = [
  {
    sigla: 'FM',
    nome: 'Fermo',
    cx: 436.5,
    cy: 303.9,
    d: 'M581.9 282L590.4 302.3L593.7 329.5L587 331.6L565.9 331.8L563.2 333.1L561.1 332L557.3 325.7L556.5 319.2L523.4 332.8L506.4 344.4L496.9 348.6L482.6 348.9L482.8 359L475.7 354.5L474.7 352.2L467.8 356.2L462.6 363.7L456.1 367.8L448.9 374.9L447.3 375.6L440.2 373.3L435.9 378.6L435.5 382.8L432.5 384.3L430.2 388.5L425.4 390.6L416.5 390.5L406.4 387.8L393.8 392.1L388.5 391L380.1 394.4L366.2 409L355.6 405.7L349.1 400.5L346.7 400.1L343.6 399.7L343.5 402.7L338.7 406.1L336.6 405.7L336.3 403.3L333.5 404.3L329.9 409.3L331.6 411.4L335 411.5L335.3 412.9L332.7 417.4L329.1 418.9L331.3 423.9L330 429.6L339.9 437.1L340.1 441.2L334.2 451L330.9 451.4L323.9 456.3L323.1 457.8L325.4 465.3L321.7 468.2L319.6 468L309.7 449.2L296.1 447.6L291.7 444.1L283.9 442.4L276.8 443L272.5 440.8L267.3 447.3L266.1 451.8L258.5 452.2L254 454.6L253 461.2L243.4 467.3L239.6 458.9L236.9 442.9L234.2 439.2L232.4 439.9L229.5 432.5L230.2 424.9L228.6 420.6L230.5 418L244.1 407.9L248.7 409.6L248.3 406.3L254.9 405.2L272 391.3L280.3 380.7L285 379.1L288.2 379.9L290.7 371.2L295.2 363.3L302.3 358.3L311.6 355.1L317.8 348.9L322.1 348.6L323.7 350.1L324.1 355.6L325.8 356.4L324.3 359.8L325.4 365.3L330.1 373.2L332.6 374.4L341.1 375.5L341 373.8L342.9 373.9L346.6 368.2L352.2 364.4L364.4 368.1L369 366L369.1 361.6L373.1 347.1L370.3 336.3L370.7 331.4L376.6 324.1L382.9 318.8L379.3 317.1L372.5 318.5L363.2 324.3L354 314.9L352.1 304.6L352 295.1L353.2 290.9L357.3 287.4L358.2 284.2L355.8 279.2L356.4 277L354 273.7L361.1 263.2L364.9 260.7L370.4 253L379.6 251.6L387.8 252.7L390.3 247.6L395.3 245.1L402.7 245L402.9 236.9L406.4 230.9L407.1 225.8L404.4 217.1L408.5 214.8L421.4 214.5L423.8 212.4L430.2 211.2L434.4 211.7L443.9 217.8L445.8 217.1L454.3 195.2L454 185.4L450.4 170.8L454.6 167.8L468.2 170.5L471.7 169.7L480.8 165.3L496.7 163.4L510.6 156.4L523.3 154.5L532.3 149.6L543.6 178.5L553 196.9L559.7 225.1L568 247.6L571.1 253.1L572.6 251.6L572.9 248.8L572.9 251.7L571.5 253.2L573.5 261.8L581.9 282Z',
  },
  {
    sigla: 'MC',
    nome: 'Macerata',
    cx: 242.1,
    cy: 232.7,
    d: 'M157 38.3L160.4 38.3L166.6 42.9L176.5 44.7L181.7 52.4L188 53.2L190.7 55.8L197.4 52L201.9 51.5L223.5 53.6L225.6 53.1L234 40.9L234.7 35.5L244.9 19.7L265.9 18.3L260.5 22.9L263.8 29.3L267.3 32.8L268.5 42.4L270.5 48.3L278.1 55.2L285.6 67.4L297.2 70L297.6 73.3L306.4 70.5L309.3 67.8L309.5 65L311.4 61.9L316.6 57.8L335.3 48.2L341.7 38.9L354.8 39.8L354.5 37.1L362.3 30.4L369.3 36.4L375.1 35.9L381.2 37.8L397.3 34.3L398.5 32.3L402.1 32.1L409.5 34.9L427.4 34.4L441.5 32.5L446.6 29.3L447 30.9L443.9 36.6L439.2 40.4L438.3 43.8L442.9 51.1L459.2 53L465.5 51.7L474 45.3L482.9 41.4L483.4 39.7L481.9 29.3L469.7 31L468.7 28.4L465.5 25.5L451.8 22.3L450.7 19.9L454.1 16.6L462 14.2L463.8 12.3L474.2 8L490.1 46.4L513 116.1L520 129.7L528.1 139.3L532.3 149.6L523.3 154.5L510.6 156.4L496.7 163.4L480.8 165.3L471.7 169.7L468.2 170.5L458.4 167.6L454.2 168L450.4 170.8L454 185.4L454.3 195.2L445.8 217.1L443.9 217.8L434.4 211.7L430.2 211.2L423.8 212.4L421.4 214.5L407.5 215.3L404.4 217.1L407.1 225.8L406.4 230.9L402.9 236.9L402.7 245L395.3 245.1L390.3 247.6L387.8 252.7L379.6 251.6L370.4 253L364.9 260.7L361.1 263.2L354 273.7L356.4 277L355.8 279.2L358.2 284.2L357.3 287.4L353.2 290.9L352 295.1L352.1 304.6L354 314.9L363.2 324.3L372.5 318.5L379.3 317.1L382.9 318.8L376.6 324.1L370.7 331.4L370.3 336.3L373.1 347.1L369.1 361.6L369 366L364.4 368.1L352.2 364.4L346.6 368.2L342.9 373.9L341 373.8L341.1 375.5L332.6 374.4L330.1 373.2L325.4 365.3L324.3 359.8L325.8 356.4L324.1 355.6L323.7 350.1L322.1 348.6L317.8 348.9L311.6 355.1L302.3 358.3L295.2 363.3L290.7 371.2L288.2 379.9L285 379.1L280.3 380.7L272 391.3L254.9 405.2L248.3 406.3L248.7 409.6L244.1 407.9L230.5 418L228.6 420.6L230.2 424.9L229.5 432.5L232.4 439.9L234.2 439.2L236.9 442.9L239.6 458.9L243.4 467.3L239.3 479.2L238.4 484.2L239.7 486.4L237.9 495.5L227 506L212.5 512.5L208.7 510.6L198.2 514.3L193 511.9L185 496.4L174.3 481.6L168.8 469.4L150.9 461.2L143.1 455.3L135.6 445.6L129 449.1L125.4 455.1L118.5 458.9L111.1 458.8L107.2 454.4L104.7 453.6L102.4 458.4L104.2 468.2L98.6 482.9L96 485.4L90.4 484.8L88.8 479L89.8 471.5L87.4 467.3L86.3 458.1L90.7 440.4L86.5 438.5L74.9 437.3L75.6 433.5L74.2 428.3L70.5 427.8L67.6 425.6L62.2 418.3L54.3 417.1L44.1 410L45.7 402.9L49.9 398L51.3 393.7L39.6 374.4L45.1 362.6L46.7 363.8L48.6 362.6L50.3 354.1L46.3 348.4L42.5 345.6L40.7 335.6L45 308.3L41.4 308.3L38 303.8L36.9 289.5L35.5 286.3L22.6 283.3L18.5 285.4L13.7 285.6L8 272.5L8.3 265.6L18.8 260.7L25 250L28.2 228.2L24.3 214.1L30.6 210.4L33.4 207.1L41.8 204.9L45.1 201.5L37.3 182.2L36.2 171.4L38.6 168.9L44.8 166.7L48 161.1L53.3 169L86.5 159.2L92.8 154L94 151.2L95.8 151.1L97.4 144L108.1 141.2L112.7 137.4L119.6 123.4L127.5 117L124.7 114L129.4 111.8L132.1 99.4L140 92.7L140.9 84L140 81.4L145 77.2L145.5 73.7L148.6 73.7L150.2 75.2L153.7 70.5L154 68.1L150.3 62.3L145.2 57.6L145.5 53.6L153.2 48.2L157 38.3Z',
  },
  {
    sigla: 'AP',
    nome: 'Ascoli Piceno',
    cx: 424,
    cy: 470.5,
    d: 'M395.2 559.1L393.5 562.7L394.5 578.9L388.4 589.8L382 593.4L370.6 591.5L364.6 592L362 593.6L358.2 598.8L356.5 604.9L356.5 612.5L357.9 617L356.2 619.4L354.1 618.4L350.4 613.7L330.3 628.7L317.4 623.8L313.9 624.2L310.9 622L310.3 623.4L301.1 617.6L295 611.1L287.6 600.3L282.4 596.7L273.8 594.6L271.4 592.2L270 588.3L267.8 587.3L256.5 587L253.7 597L250.6 601.8L242 598.1L223.4 594.4L216.8 591.7L212.2 592L213 588.4L218.9 580.3L218.6 575.9L215.5 572.3L216.6 569.9L224.4 568.3L228.9 562.3L231.5 561.4L236.6 561.7L240.6 564.1L241.6 570.7L245.6 565.3L248.6 548.8L253.4 540.8L256.3 532.1L255.5 527.3L251.2 522L247 501.3L243.9 492.7L238.4 484.2L239.3 479.2L243.4 467.3L253 461.2L254 454.6L258.5 452.2L266.1 451.8L267.3 447.3L272.1 441L276.8 443L287.6 443L291.7 444.1L296.1 447.6L309.7 449.2L320.4 468.7L325.4 465.4L323.1 457.8L323.9 456.3L330.9 451.4L334.2 451L340.1 441.2L339.9 437.1L330 429.6L331.3 423.9L329.1 418.9L332.7 417.4L335.3 412.9L335 411.5L331.6 411.4L329.9 409.3L333.5 404.3L336.3 403.3L336.6 405.7L338.7 406.1L343.5 402.7L343.6 399.7L346.7 400.1L349.1 400.5L355.6 405.7L366.2 409L380.1 394.4L388.5 391L393.8 392.1L406.4 387.8L416.5 390.5L425.4 390.6L430.2 388.5L432.5 384.3L435.5 382.8L435.9 378.6L440.2 373.3L447.3 375.6L448.9 374.9L456.1 367.8L462.6 363.7L467.8 356.2L474.7 352.2L475.7 354.5L482.8 359L482.6 348.9L496.9 348.6L506.4 344.4L523.4 332.8L556.5 319.2L557.3 325.7L561.1 332L563.2 333.1L565.9 331.8L587 331.6L593.7 329.5L602.3 371.5L612 410.4L615.8 418.7L618.6 431.7L632 465.2L611.4 467.4L597.7 473.1L577.8 477L574.3 478.7L571.9 482.5L567.4 485.7L552.4 492.2L531.4 495.8L522.8 496L511.2 500.9L511 503.9L513.7 505.6L507 522L493.9 527.9L488 531.7L486.5 534.2L470.3 537.2L466.4 534.4L465.5 530L466.2 528L463.9 526.8L457.4 531.7L449.9 534.8L443.4 534.1L435.2 539.2L423.9 536.4L418.5 527.3L412.4 526.6L409.3 543L401.9 548.2L395.2 559.1Z',
  },
]

export type PuntoComune = { nome: string; sigla: string; x: number; y: number }

export const comuni: readonly PuntoComune[] = [
  { nome: 'Acquasanta Terme', sigla: 'AP', x: 338.9, y: 571.3 },
  { nome: 'Acquaviva Picena', sigla: 'AP', x: 566.8, y: 429.2 },
  { nome: 'Altidona', sigla: 'FM', x: 571.2, y: 298.7 },
  { nome: 'Amandola', sigla: 'FM', x: 305.7, y: 390.6 },
  { nome: 'Apiro', sigla: 'MC', x: 166.4, y: 81.1 },
  { nome: 'Appignano', sigla: 'MC', x: 311.8, y: 89.9 },
  { nome: 'Appignano del Tronto', sigla: 'AP', x: 483.8, y: 463.6 },
  { nome: 'Arquata del Tronto', sigla: 'AP', x: 267.3, y: 569.4 },
  { nome: 'Ascoli Piceno', sigla: 'AP', x: 432.3, y: 499.2 },
  { nome: 'Belforte del Chienti', sigla: 'MC', x: 244.6, y: 252.5 },
  { nome: 'Belmonte Piceno', sigla: 'FM', x: 417.6, y: 311.5 },
  { nome: 'Bolognola', sigla: 'MC', x: 229.5, y: 393.7 },
  { nome: 'Caldarola', sigla: 'MC', x: 220.4, y: 282.5 },
  { nome: 'Camerino', sigla: 'MC', x: 147.2, y: 275.1 },
  { nome: 'Campofilone', sigla: 'FM', x: 574, y: 322.4 },
  { nome: 'Camporotondo di Fiastrone', sigla: 'MC', x: 257.4, y: 275 },
  { nome: 'Carassai', sigla: 'AP', x: 491, y: 360.9 },
  { nome: 'Castel di Lama', sigla: 'AP', x: 508.8, y: 479.7 },
  { nome: 'Castelraimondo', sigla: 'MC', x: 135.2, y: 221.2 },
  { nome: 'Castelsantangelo sul Nera', sigla: 'MC', x: 208.9, y: 478.1 },
  { nome: 'Castignano', sigla: 'AP', x: 464.5, y: 432.1 },
  { nome: 'Castorano', sigla: 'AP', x: 527.1, y: 464.8 },
  { nome: 'Cessapalombo', sigla: 'MC', x: 240.9, y: 310.9 },
  { nome: 'Cingoli', sigla: 'MC', x: 237.1, y: 79.7 },
  { nome: 'Civitanova Marche', sigla: 'MC', x: 498.8, y: 134.9 },
  { nome: 'Colli del Tronto', sigla: 'AP', x: 533.6, y: 484.3 },
  { nome: 'Colmurano', sigla: 'MC', x: 311.2, y: 249.3 },
  { nome: 'Comunanza', sigla: 'AP', x: 343.5, y: 446.5 },
  { nome: 'Corridonia', sigla: 'MC', x: 396.7, y: 185.1 },
  { nome: 'Cossignano', sigla: 'AP', x: 498.5, y: 394.7 },
  { nome: 'Cupra Marittima', sigla: 'AP', x: 588.9, y: 365.8 },
  { nome: 'Esanatoglia', sigla: 'MC', x: 65.2, y: 186.7 },
  { nome: 'Falerone', sigla: 'FM', x: 372.6, y: 304.3 },
  { nome: 'Fermo', sigla: 'FM', x: 521.7, y: 255.2 },
  { nome: 'Fiastra', sigla: 'MC', x: 201.9, y: 351 },
  { nome: 'Fiuminata', sigla: 'MC', x: 45.1, y: 251.1 },
  { nome: 'Folignano', sigla: 'AP', x: 477.7, y: 523 },
  { nome: 'Force', sigla: 'AP', x: 389.4, y: 412.2 },
  { nome: "Francavilla d'Ete", sigla: 'FM', x: 413, y: 229.7 },
  { nome: 'Gagliole', sigla: 'MC', x: 148, y: 191.2 },
  { nome: 'Grottammare', sigla: 'AP', x: 594.5, y: 397.5 },
  { nome: 'Grottazzolina', sigla: 'FM', x: 451.4, y: 291.5 },
  { nome: 'Gualdo', sigla: 'MC', x: 308.8, y: 329.3 },
  { nome: 'Lapedona', sigla: 'FM', x: 550.4, y: 297.2 },
  { nome: 'Loro Piceno', sigla: 'MC', x: 345.4, y: 251.9 },
  { nome: 'Macerata', sigla: 'MC', x: 364.5, y: 142.9 },
  { nome: 'Magliano di Tenna', sigla: 'FM', x: 444.6, y: 276 },
  { nome: 'Maltignano', sigla: 'AP', x: 501, y: 511.3 },
  { nome: 'Massa Fermana', sigla: 'FM', x: 381.6, y: 261 },
  { nome: 'Massignano', sigla: 'AP', x: 573.4, y: 344.4 },
  { nome: 'Matelica', sigla: 'MC', x: 118.3, y: 167.8 },
  { nome: 'Mogliano', sigla: 'MC', x: 382.7, y: 232.8 },
  { nome: 'Monsampietro Morico', sigla: 'FM', x: 425.5, y: 336.9 },
  { nome: 'Monsampolo del Tronto', sigla: 'AP', x: 562.1, y: 461.4 },
  { nome: 'Montalto delle Marche', sigla: 'AP', x: 464.2, y: 388.2 },
  { nome: 'Montappone', sigla: 'FM', x: 369.1, y: 274 },
  { nome: 'Monte Cavallo', sigla: 'MC', x: 97.2, y: 388.9 },
  { nome: 'Monte Giberto', sigla: 'FM', x: 462.7, y: 307.8 },
  { nome: 'Monte Rinaldo', sigla: 'FM', x: 439.4, y: 358.8 },
  { nome: 'Monte San Giusto', sigla: 'MC', x: 439.3, y: 194.9 },
  { nome: 'Monte San Martino', sigla: 'MC', x: 349.3, y: 358.9 },
  { nome: 'Monte San Pietrangeli', sigla: 'FM', x: 435.8, y: 229.3 },
  { nome: 'Monte Urano', sigla: 'FM', x: 491.5, y: 226.7 },
  { nome: 'Monte Vidon Combatte', sigla: 'FM', x: 462.7, y: 338.9 },
  { nome: 'Monte Vidon Corrado', sigla: 'FM', x: 383.7, y: 286.8 },
  { nome: 'Montecassiano', sigla: 'MC', x: 355.2, y: 96.1 },
  { nome: 'Montecosaro', sigla: 'MC', x: 468.5, y: 141.1 },
  { nome: 'Montedinove', sigla: 'AP', x: 438.1, y: 402.2 },
  { nome: 'Montefalcone Appennino', sigla: 'FM', x: 366.3, y: 391 },
  { nome: 'Montefano', sigla: 'MC', x: 343.8, y: 57.4 },
  { nome: "Montefiore dell'Aso", sigla: 'AP', x: 536.4, y: 343.8 },
  { nome: 'Montefortino', sigla: 'FM', x: 280.9, y: 433.6 },
  { nome: 'Montegallo', sigla: 'AP', x: 295.4, y: 507.5 },
  { nome: 'Montegiorgio', sigla: 'FM', x: 415.4, y: 275.5 },
  { nome: 'Montegranaro', sigla: 'FM', x: 466.8, y: 194.8 },
  { nome: 'Monteleone di Fermo', sigla: 'FM', x: 410.2, y: 336.8 },
  { nome: 'Montelparo', sigla: 'FM', x: 419.1, y: 371.5 },
  { nome: 'Montelupone', sigla: 'MC', x: 422.5, y: 110.5 },
  { nome: 'Montemonaco', sigla: 'AP', x: 274.4, y: 475 },
  { nome: 'Monteprandone', sigla: 'AP', x: 588.1, y: 453.6 },
  { nome: 'Monterubbiano', sigla: 'FM', x: 516.9, y: 310.9 },
  { nome: 'Montottone', sigla: 'FM', x: 441.2, y: 326.3 },
  { nome: 'Moresco', sigla: 'FM', x: 535.6, y: 320 },
  { nome: 'Morrovalle', sigla: 'MC', x: 437.6, y: 146.8 },
  { nome: 'Muccia', sigla: 'MC', x: 118.1, y: 326.1 },
  { nome: 'Offida', sigla: 'AP', x: 514.5, y: 431.2 },
  { nome: 'Ortezzano', sigla: 'FM', x: 455.1, y: 358.3 },
  { nome: 'Palmiano', sigla: 'AP', x: 373, y: 448.1 },
  { nome: 'Pedaso', sigla: 'FM', x: 585.8, y: 310.8 },
  { nome: 'Penna San Giovanni', sigla: 'MC', x: 347.4, y: 334.8 },
  { nome: 'Petriolo', sigla: 'MC', x: 368.9, y: 208.6 },
  { nome: 'Petritoli', sigla: 'FM', x: 485.1, y: 331.1 },
  { nome: 'Pieve Torina', sigla: 'MC', x: 122.7, y: 371.1 },
  { nome: 'Pioraco', sigla: 'MC', x: 100.3, y: 238.6 },
  { nome: 'Poggio San Vicino', sigla: 'MC', x: 145.3, y: 94.2 },
  { nome: 'Pollenza', sigla: 'MC', x: 308, y: 175.2 },
  { nome: 'Ponzano di Fermo', sigla: 'FM', x: 482.7, y: 296 },
  { nome: 'Porto Recanati', sigla: 'MC', x: 475.8, y: 37.9 },
  { nome: 'Porto San Giorgio', sigla: 'FM', x: 557.1, y: 241.5 },
  { nome: "Porto Sant'Elpidio", sigla: 'FM', x: 533.4, y: 180.8 },
  { nome: 'Potenza Picena', sigla: 'MC', x: 475.5, y: 89.7 },
  { nome: 'Rapagnano', sigla: 'FM', x: 454.3, y: 257.3 },
  { nome: 'Recanati', sigla: 'MC', x: 410.2, y: 65.6 },
  { nome: 'Ripatransone', sigla: 'AP', x: 545.6, y: 387.8 },
  { nome: 'Ripe San Ginesio', sigla: 'MC', x: 319, y: 269.6 },
  { nome: 'Roccafluvione', sigla: 'AP', x: 357.4, y: 500.8 },
  { nome: 'Rotella', sigla: 'AP', x: 420.6, y: 423.3 },
  { nome: 'San Benedetto del Tronto', sigla: 'AP', x: 609.8, y: 437.9 },
  { nome: 'San Ginesio', sigla: 'MC', x: 282.3, y: 300.7 },
  { nome: 'San Severino Marche', sigla: 'MC', x: 204.3, y: 170.4 },
  { nome: "Sant'Angelo in Pontano", sigla: 'MC', x: 336.6, y: 300.7 },
  { nome: "Sant'Elpidio a Mare", sigla: 'FM', x: 506, y: 189.8 },
  { nome: 'Santa Vittoria in Matenano', sigla: 'FM', x: 389.4, y: 367.2 },
  { nome: 'Sarnano', sigla: 'MC', x: 267.4, y: 364.4 },
  { nome: 'Sefro', sigla: 'MC', x: 77, y: 277.4 },
  { nome: 'Serrapetrona', sigla: 'MC', x: 207.9, y: 244.8 },
  { nome: 'Serravalle di Chienti', sigla: 'MC', x: 68.4, y: 353 },
  { nome: 'Servigliano', sigla: 'FM', x: 388.3, y: 331.7 },
  { nome: 'Smerillo', sigla: 'FM', x: 352.3, y: 379.6 },
  { nome: 'Spinetoli', sigla: 'AP', x: 551.8, y: 478.5 },
  { nome: 'Tolentino', sigla: 'MC', x: 284.3, y: 217.9 },
  { nome: 'Torre San Patrizio', sigla: 'FM', x: 461.3, y: 235.7 },
  { nome: 'Treia', sigla: 'MC', x: 286.2, y: 133.3 },
  { nome: 'Urbisaglia', sigla: 'MC', x: 329.7, y: 220.8 },
  { nome: 'Ussita', sigla: 'MC', x: 198.3, y: 427.6 },
  { nome: 'Valfornace', sigla: 'MC', x: 161.2, y: 348.9 },
  { nome: 'Venarotta', sigla: 'AP', x: 394.1, y: 470.4 },
  { nome: 'Visso', sigla: 'MC', x: 129.4, y: 437.6 },
]

/**
 * I comuni in cui lo studio ha lavorato: **decisione n. 13, aperta**.
 * Finché è vuoto in pagina non si accende nessun punto, e il blocco dichiara
 * che l'elenco arriva dallo studio. Non si riempie a intuito.
 */
export const comuniServiti: readonly string[] = []

/** La sede, che è un dato confermato — non un'affermazione sul lavoro svolto. */
export const sede = comuni.find((c) => c.nome === 'Fermo' && c.sigla === 'FM')!

export const comuneByNome = (nome: string) => comuni.find((c) => c.nome === nome)
