import { chromium } from 'playwright'
const b = await chromium.launch()
for (const [n, u] of [
  ['A', 'http://localhost:3001/'],
  ['B', 'http://localhost:3001/opzione-b'],
  ['S', 'http://localhost:3001/servizi/strutture'],
]) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 } })
  const p = await ctx.newPage()
  await p.goto(u, { waitUntil: 'load' })
  const r = await p.evaluate(() => {
    const nav = performance.getEntriesByType('navigation')[0]
    const res = performance.getEntriesByType('resource')
    const somma = (f) => res.filter(f).reduce((a, x) => a + (x.transferSize || 0), 0)
    return {
      loadEvent: Math.round(nav.loadEventEnd),
      richieste: res.length + 1,
      totale: Math.round((somma(() => true) + (nav.transferSize || 0)) / 1024),
      primaDiLoad: Math.round(
        (somma((x) => x.responseEnd <= nav.loadEventEnd) + (nav.transferSize || 0)) / 1024,
      ),
      video: Math.round(somma((x) => /\.mp4/.test(x.name)) / 1024),
      videoStart: res.filter((x) => /\.mp4/.test(x.name)).map((x) => Math.round(x.startTime)),
      immagini: Math.round(somma((x) => /_next\/image|\.jpg/.test(x.name)) / 1024),
      font: Math.round(somma((x) => /\.woff2/.test(x.name)) / 1024),
      js: Math.round(somma((x) => /\.js(\?|$)/.test(x.name)) / 1024),
      css: Math.round(somma((x) => /\.css(\?|$)/.test(x.name)) / 1024),
      doc: Math.round((nav.transferSize || 0) / 1024),
    }
  })
  await p.waitForTimeout(6000)
  const dopo = await p.evaluate(() => {
    const res = performance.getEntriesByType('resource')
    const v = res.filter((x) => /\.mp4/.test(x.name))
    return {
      videoKB: Math.round(v.reduce((a, x) => a + (x.transferSize || 0), 0) / 1024),
      videoStart: v.map((x) => Math.round(x.startTime)),
      tutte: res.length + 1,
    }
  })
  console.log(n, JSON.stringify({ ...r, dopo }, null, 0))
  await ctx.close()
}
await b.close()
