/**
 * Controllo di contrasto WCAG. Si passano coppie "fg,bg,etichetta".
 * Uso: node scripts/contrasto.mjs "#17171A,#F4F2ED,ink su paper" ...
 */
const lum = (hex) => {
  const n = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
  const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
const rapporto = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}
for (const arg of process.argv.slice(2)) {
  const [fg, bg, ...etichetta] = arg.split(',')
  const r = rapporto(fg.trim(), bg.trim())
  const aa = r >= 4.5 ? 'AA' : r >= 3 ? 'AA-grande' : 'SOTTO'
  console.log(`${r.toFixed(2).padStart(6)}:1  ${aa.padEnd(10)} ${etichetta.join(',').trim()}`)
}
