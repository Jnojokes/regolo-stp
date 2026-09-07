import { chromium } from 'playwright'
const lum = (r,g,b) => { const f=c=>{c/=255; return c<=0.03928?c/12.92:((c+0.055)/1.055)**2.4}; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b) }
const rap = (a,b) => { const [x,y]=[lum(...a),lum(...b)].sort((p,q)=>q-p); return (x+0.05)/(y+0.05) }
const parse = s => { const m=s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/); return m?[+m[1],+m[2],+m[3], m[4]===undefined?1:+m[4]]:null }
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
const p = await ctx.newPage()
const tutti = []
for (const url of ['http://localhost:3001/','http://localhost:3001/opzione-b','http://localhost:3001/servizi/strutture','http://localhost:3001/progetti','http://localhost:3001/contatti','http://localhost:3001/studio','http://localhost:3001/progetti/esempio-scheda']) {
  await p.goto(url, { waitUntil: 'networkidle' })
  const r = await p.evaluate(() => {
    const out = []
    const fondo = el => { let n = el; while (n && n !== document.documentElement) { const bg = getComputedStyle(n).backgroundColor; if (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) return bg; n = n.parentElement } return getComputedStyle(document.body).backgroundColor }
    document.querySelectorAll('body *').forEach(el => {
      const t = Array.from(el.childNodes).filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim()
      if (t.length < 2) return
      const cs = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      if (r.width===0 || r.height===0 || cs.visibility==='hidden' || cs.opacity==='0') return
      out.push({ fg: cs.color, bg: fondo(el), size: parseFloat(cs.fontSize), weight: cs.fontWeight, cls: (el.className||'').toString().split(' ')[0].slice(0,26), testo: t.slice(0,24) })
    })
    return out
  })
  for (const x of r) tutti.push({ url: url.replace('http://localhost:3001',''), ...x })
}
await b.close()
const visti = new Set(); const guasti = []
let n = 0
for (const x of tutti) {
  const fg = parse(x.fg), bg = parse(x.bg)
  if (!fg || !bg) continue
  const k = x.fg + '|' + x.bg + '|' + x.size + '|' + x.weight
  if (visti.has(k)) continue
  visti.add(k); n++
  const c = rap(fg.slice(0,3), bg.slice(0,3))
  const grande = x.size >= 24 || (x.size >= 18.66 && +x.weight >= 700)
  const soglia = grande ? 3 : 4.5
  if (c < soglia) guasti.push({ c: +c.toFixed(2), soglia, ...x })
}
console.log(`coppie distinte: ${n} · sotto soglia: ${guasti.length}`)
for (const g of guasti) console.log(`  ${g.c}:1 (serve ${g.soglia}) ${g.size}px w${g.weight} ${g.fg} su ${g.bg} — .${g.cls} «${g.testo}» ${g.url}`)
