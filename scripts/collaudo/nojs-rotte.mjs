import { chromium } from 'playwright'
const b = await chromium.launch()
const ctx = await b.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } })
const p = await ctx.newPage()
const out = []
for (const [nome, url] of [
  ['A', 'http://localhost:3001/'],
  ['C', 'http://localhost:3001/opzione-b'],
  ['D', 'http://localhost:3001/opzione-c'],
  ['servizio', 'http://localhost:3001/servizi/strutture'],
  ['progetti', 'http://localhost:3001/progetti'],
  ['contatti', 'http://localhost:3001/contatti'],
]) {
  await p.goto(url, { waitUntil: 'load' })
  const r = await p.evaluate(() => {
    const vis = (s) =>
      Array.from(document.querySelectorAll(s)).filter((e) => e.getBoundingClientRect().height > 0)
        .length
    const t = document.body.innerText
    return {
      testo: t.length,
      quote: document.querySelectorAll('.quota').length,
      pannelliVisibili: vis('.pannello'),
      passiBrief: document.querySelectorAll('.brief-passo').length,
      passiVisibili: vis('.brief-passo'),
      contaBrief: (document.querySelector('.brief-avanzamento-conta') || {}).textContent?.trim(),
      lettura: (document.querySelector('.confronto-lettura') || {}).textContent?.trim(),
      cursore: document.querySelectorAll('.confronto input[type=range]').length,
      form: document.querySelectorAll('form').length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      segnaposto: document.querySelectorAll('[data-placeholder="da-cliente"]').length,
    }
  })
  out.push({ nome, ...r })
}
await b.close()
console.log(JSON.stringify(out, null, 1))
