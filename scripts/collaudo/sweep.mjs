import { chromium } from 'playwright'
const b = await chromium.launch()
const out = []
for (const w of [1440, 390]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } })
  const p = await ctx.newPage()
  for (const [nome, url] of [['A','http://localhost:3001/'],['B','http://localhost:3001/opzione-b']]) {
    await p.goto(url, { waitUntil: 'networkidle' })
    const h = await p.evaluate(() => document.documentElement.scrollHeight)
    const passi = Math.ceil(h / 860)
    for (let i = 0; i < passi; i++) {
      await p.evaluate((y) => window.scrollTo({top: y, behavior:'instant'}), i * 860)
      await p.waitForTimeout(120)
      await p.screenshot({ path: `sweep-${nome}-${w}-${String(i).padStart(2,'0')}.jpeg`, quality: 82, type: 'jpeg' })
    }
    // controlli
    const r = await p.evaluate(() => {
      const de = document.documentElement
      const sfora = []
      document.querySelectorAll('body *').forEach(el => {
        if (el.classList.contains('skip-link') || el.closest('details:not([open])')) return
        const b = el.getBoundingClientRect()
        if (b.width > 0 && (b.right > de.clientWidth + 1 || b.left < -1)) {
          sfora.push(`${el.tagName.toLowerCase()}.${(el.className||'').toString().split(' ')[0].slice(0,24)}`)
        }
      })
      const piccoli = []
      document.querySelectorAll('a, button, input, summary, label').forEach(el => {
        const b = el.getBoundingClientRect()
        if (b.width > 0 && b.height > 0 && b.height < 40 && !el.closest('.site-footer-coda, .site-nav, .barra-proposta, .quota')) {
          piccoli.push(`${el.tagName.toLowerCase()}.${(el.className||'').toString().split(' ')[0].slice(0,22)} h${Math.round(b.height)}`)
        }
      })
      return { h: de.scrollHeight, scrollW: de.scrollWidth, clientW: de.clientWidth, sfora: [...new Set(sfora)].slice(0,8), piccoli: [...new Set(piccoli)].slice(0,8) }
    })
    out.push({ nome, w, ...r, schermate: passi })
  }
  await ctx.close()
}
await b.close()
console.log(JSON.stringify(out, null, 1))
