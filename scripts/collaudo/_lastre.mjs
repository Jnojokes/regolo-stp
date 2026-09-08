import { chromium } from 'playwright'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
const p = await ctx.newPage()
await p.goto('http://localhost:3001/opzione-c', { waitUntil: 'load' })
await p.waitForTimeout(400)
console.log(
  JSON.stringify(
    await p.evaluate(() => {
      const out = []
      for (const el of document.querySelectorAll('.colata-lastra, .colata-ritratto, .colata')) {
        const r = el.getBoundingClientRect()
        const cs = getComputedStyle(el)
        out.push({
          cl: el.className.split(/\s+/).slice(0, 2).join('.'),
          w: Math.round(r.width),
          h: Math.round(r.height),
          width: cs.width,
          maxW: cs.maxWidth,
          ar: cs.aspectRatio,
          display: cs.display,
          js: cs.justifySelf,
        })
      }
      return out.slice(0, 8)
    }),
    null,
    1,
  ),
)
await b.close()
