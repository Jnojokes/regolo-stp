import { chromium } from 'playwright'
const b = await chromium.launch()
const ctx = await b.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } })
const p = await ctx.newPage()
for (const [nome, url] of [['A','http://localhost:3001/'],['B','http://localhost:3001/opzione-b']]) {
  await p.goto(url, { waitUntil: 'load' })
  const r = await p.evaluate(() => {
    const q = s => document.querySelectorAll(s).length
    const vis = s => Array.from(document.querySelectorAll(s)).filter(e => e.getBoundingClientRect().height > 0).length
    return {
      quote: q('.quota'),
      voci: q('.quota-voce'),
      annot: (document.querySelector('.quota-annotazione')||{}).textContent?.trim(),
      pannelliNelDom: q('.pannello'),
      pannelliVisibili: vis('.pannello'),
      righe: q('.riga'),
      payoff: (document.querySelector('.hero-payoff')||{}).textContent?.replace(/\s+/g,' ').trim(),
      asse: getComputedStyle(document.documentElement).getPropertyValue('--regolo-asse').trim(),
      testo: document.body.innerText.length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }
  })
  console.log(nome, JSON.stringify(r))
  await p.screenshot({ path: `nojs-${nome}.jpeg`, quality: 88, type: 'jpeg' })
}
await b.close()
