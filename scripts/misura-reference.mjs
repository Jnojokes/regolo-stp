#!/usr/bin/env node
/**
 * misura-reference.mjs — trasforma un URL in una reference «come prova» (regola 9): screenshot,
 * stili calcolati, palette, comportamenti. È l'estrazione (non la copia) presa dal metodo del
 * repo ai-website-cloner-template: si misura il sito, NON si scaricano immagini, video, SVG o testi.
 *
 *   node misura-reference.mjs https://scgroup.dk --slug scgroup-dk --out kit/reference
 *   node misura-reference.mjs https://… --slug … --out … --hero "header, .hero" --sezione ".about"
 *
 * Produce in <out>/<slug>/:
 *   <slug>-1440-hero.png · <slug>-1440-meta.png · <slug>-1440-intera.png · <slug>-390-hero.png · <slug>-390-meta.png
 *   misure.json     stili calcolati (h1/h2/h3/p/bottoni/link), font caricati, contenitore, spazio fra
 *                   sezioni, palette per frequenza, raggi, comportamenti (Lenis/GSAP/ScrollTrigger/
 *                   Swiper/Three/video in hero/sticky header/classi di reveal allo scroll/animazioni infinite),
 *                   e lo stesso h1 a 390 per il rapporto di scala
 *   SCHEDA-blocco.md  il blocco pronto da incollare in SCHEDA.md (tabella misure + comportamenti);
 *                   le righe «cosa fa la hero», «come è ritagliata la fotografia», «la cosa che fa lui
 *                   e gli altri no» e «da qui prendo … per <cliente>» restano da scrivere GUARDANDO i PNG.
 *
 * Richiede playwright (npm i -D playwright; npx playwright install chromium). Env PW_EXECUTABLE per
 * usare Chrome (i siti dietro Cloudflare spesso vogliono un browser vero). Siti che non si aprono:
 * si scrive in SCHEDA.md e si va avanti — non si descrive a memoria.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const URL_ = args.find((a) => /^https?:\/\//.test(a));
if (!URL_) { console.error('Uso: misura-reference.mjs <https://sito> --slug nome --out kit/reference [--hero sel] [--sezione sel]'); process.exit(2); }
const opt = { slug: null, out: 'kit/reference', hero: null, sezione: null, attesa: 1500 };
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--slug') opt.slug = args[++i];
  else if (args[i] === '--out') opt.out = args[++i];
  else if (args[i] === '--hero') opt.hero = args[++i];
  else if (args[i] === '--sezione') opt.sezione = args[++i];
  else if (args[i] === '--attesa') opt.attesa = Number(args[++i]);
}
opt.slug = opt.slug || new URL(URL_).hostname.replace(/^www\./, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
const dir = path.join(opt.out, opt.slug);
fs.mkdirSync(dir, { recursive: true });

// I moduli si cercano prima accanto al repo (npm i -D playwright), poi in ~/.blulang-tools
// (creata da install.sh, fuori da iCloud): così lo script gira anche dalla cartella blulang.
const importa = async (nome) => {
  try { return await import(nome); } catch {
    const os = await import('node:os'); const { pathToFileURL } = await import('node:url'); const { createRequire } = await import('node:module');
    const req = createRequire(pathToFileURL(os.homedir() + '/.blulang-tools/package.json'));
    const m = await import(pathToFileURL(req.resolve(nome)).href); const d = m.default; // modulo CJS: gli export stanno in default
    return d && typeof d === 'object' ? { ...d, ...m, default: d.default ?? d } : m;
  }
};
let chromium;
try { ({ chromium } = await importa('playwright')); } catch { console.error('Manca playwright: npm i -D playwright && npx playwright install chromium (o install.sh, che la mette in ~/.blulang-tools)'); process.exit(2); }
const browser = await chromium.launch(process.env.PW_EXECUTABLE ? { executablePath: process.env.PW_EXECUTABLE } : {});
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

// Lo script di misura: gira nella pagina. Solo lettura del DOM: niente download.
const MISURA = ({ heroSel, sezSel }) => {
  const cs = (el) => getComputedStyle(el);
  const vis = (el) => { const r = el.getBoundingClientRect(); const s = cs(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const num = (v) => (v === 'normal' ? 'normal' : Math.round(parseFloat(v) * 100) / 100);
  const tipo = (sel) => {
    const el = [...document.querySelectorAll(sel)].find(vis); if (!el) return null;
    const s = cs(el); const r = el.getBoundingClientRect();
    return { selettore: sel, testo: (el.textContent || '').trim().slice(0, 80), famiglia: s.fontFamily.split(',')[0].replace(/"/g, '').trim(), px: num(s.fontSize), interlinea: num(s.lineHeight), peso: s.fontWeight, spaziatura: s.letterSpacing, trasformazione: s.textTransform, colore: s.color, larghezza: Math.round(r.width) };
  };
  const tip = {};
  for (const sel of ['h1', 'h2', 'h3', 'p', 'a[href]', 'button, a[class*="btn"], a[class*="button"], a[class*="cta"]', 'nav a', 'small, .eyebrow, [class*="eyebrow"], [class*="label"]']) { const t = tipo(sel); if (t) tip[sel] = t; }
  // font davvero caricati
  const fonts = [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family.replace(/"/g, '')} ${f.weight} ${f.style}`))];
  // palette per frequenza (fondi e testi degli elementi visibili)
  const conta = {};
  const add = (c, k) => { if (!c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent') return; conta[c] = conta[c] || { n: 0, ruoli: new Set() }; conta[c].n++; conta[c].ruoli.add(k); };
  let n = 0;
  for (const el of document.querySelectorAll('body *')) { if (n++ > 4000) break; if (!vis(el)) continue; const s = cs(el); add(s.backgroundColor, 'fondo'); add(s.color, 'testo'); if (s.borderTopWidth !== '0px') add(s.borderTopColor, 'filetto'); }
  const hex = (rgb) => { const m = rgb.match(/\d+(\.\d+)?/g); if (!m) return rgb; const a = m[3] !== undefined ? parseFloat(m[3]) : 1; const h = '#' + m.slice(0, 3).map((x) => Math.round(+x).toString(16).padStart(2, '0')).join(''); return a < 1 ? `${h} α${a}` : h; };
  const palette = Object.entries(conta).sort((a, b) => b[1].n - a[1].n).slice(0, 12).map(([c, v]) => ({ colore: hex(c), n: v.n, ruoli: [...v.ruoli] }));
  const bodyBg = cs(document.body).backgroundColor, htmlBg = cs(document.documentElement).backgroundColor;
  const fondoPagina = hex(bodyBg !== 'rgba(0, 0, 0, 0)' ? bodyBg : htmlBg !== 'rgba(0, 0, 0, 0)' ? htmlBg : 'rgb(255, 255, 255)');
  // raggi
  const raggi = {};
  for (const el of document.querySelectorAll('button, a[class*="btn"], a[class*="button"], [class*="card"], img, article, section > div')) { if (!vis(el)) continue; const r = cs(el).borderTopLeftRadius; raggi[r] = (raggi[r] || 0) + 1; }
  // sezioni: contenitore e spazio verticale
  const sezioni = [...document.querySelectorAll('main > section, main > div, body > section, section')].filter(vis).slice(0, 25);
  const larg = sezioni.map((s) => { const inner = [...s.children].find(vis) || s; return Math.round(inner.getBoundingClientRect().width); }).filter(Boolean).sort((a, b) => a - b);
  const contenitore = larg.length ? larg[Math.floor(larg.length / 2)] : null;
  const spazi = sezioni.map((s) => parseFloat(cs(s).paddingTop) + parseFloat(cs(s).paddingBottom) + parseFloat(cs(s).marginTop) + parseFloat(cs(s).marginBottom)).filter((x) => x > 0).map((x) => Math.round(x));
  const spazioMediano = spazi.length ? spazi.sort((a, b) => a - b)[Math.floor(spazi.length / 2)] : null;
  // hero
  const hero = (heroSel && document.querySelector(heroSel)) || document.querySelector('header + section, main > section:first-of-type, [class*="hero"], section') || document.body;
  const hr = hero.getBoundingClientRect();
  const heroVideo = !!hero.querySelector('video');
  const heroImg = hero.querySelector('img, picture, [style*="background-image"]');
  const heroInfo = { altezza: Math.round(hr.height), altezzaViewport: Math.round(hr.height / innerHeight * 100) + '%', video: heroVideo, videoAutoplay: heroVideo && !!hero.querySelector('video[autoplay]'), immagine: !!heroImg, testoPrimoViewport: (hero.innerText || '').trim().slice(0, 240), cta: [...hero.querySelectorAll('a, button')].filter(vis).map((a) => (a.textContent || '').trim()).filter(Boolean).slice(0, 6) };
  // header
  const header = document.querySelector('header, [class*="header"], nav');
  const headerPos = header ? cs(header).position : null;
  // comportamenti: librerie e animazioni
  const lib = { lenis: !!(window.lenis || document.querySelector('.lenis, [data-lenis]') || document.documentElement.classList.contains('lenis')), gsap: !!window.gsap, scrollTrigger: !!(window.ScrollTrigger || (window.gsap && window.gsap.plugins && window.gsap.plugins.ScrollTrigger)), locomotive: !!document.querySelector('[data-scroll-container], .has-scroll-init'), swiper: !!document.querySelector('.swiper'), splide: !!document.querySelector('.splide'), three: !!(window.THREE || document.querySelector('canvas')), framer: !!document.querySelector('[data-framer-name], [data-projection-id]'), nextjs: !!document.getElementById('__next') || !!document.querySelector('script[src*="/_next/"]'), webflow: !!document.querySelector('[data-wf-page], html[data-wf-site]'), wordpress: !!document.querySelector('link[href*="wp-content"], script[src*="wp-content"]'), astro: !!document.querySelector('astro-island') };
  const animInfinite = document.getAnimations().filter((a) => a.effect && a.effect.getTiming().iterations === Infinity).length;
  const trans = [...document.querySelectorAll('body *')].slice(0, 3000).filter((el) => { const t = cs(el).transitionDuration; return t && t !== '0s'; }).length;
  return { tip, fonts, palette, fondoPagina, raggi, contenitore, spazioMediano, spazi: spazi.slice(0, 12), heroInfo, headerPos, lib, animInfinite, elementiConTransizione: trans, altezzaPagina: Math.round(document.documentElement.scrollHeight), titolo: document.title, lang: document.documentElement.lang, sezSel: sezSel || null };
};

// classi di reveal: differenza fra prima e dopo lo scroll
const REVEAL = () => {
  const snap = {}; let n = 0;
  for (const el of document.querySelectorAll('section, [class*="reveal"], [class*="fade"], [class*="anim"], [data-aos], [class*="inview"], [class*="in-view"]')) { if (n++ > 800) break; snap[n] = el.className && typeof el.className === 'string' ? el.className : ''; }
  return snap;
};

const out = { url: URL_, slug: opt.slug, data: new Date().toISOString().slice(0, 10), strumento: 'misura-reference.mjs (Playwright, stili calcolati dal DOM vivo)' };
try {
  // ── 1440 ──
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, userAgent: UA, locale: 'it-IT' });
  const page = await ctx.newPage();
  const risposte = [];
  page.on('response', (r) => { if (r.request().resourceType() === 'document') risposte.push(r.status()); });
  await page.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(opt.attesa);
  await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  if (risposte[0] && risposte[0] >= 400) out.avviso = `il documento risponde ${risposte[0]} (blocco anti-bot? riprova con PW_EXECUTABLE=Chrome)`;
  // chiudi banner cookie comuni (solo per lo screenshot)
  for (const sel of ['button:has-text("Accetta")', 'button:has-text("Accept all")', 'button:has-text("Accept")', 'button:has-text("Rifiuta")', 'button:has-text("Reject")', '#onetrust-accept-btn-handler', '.cky-btn-accept']) {
    const b = page.locator(sel).first(); if (await b.count()) { await b.click({ timeout: 2000 }).catch(() => {}); break; }
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(dir, `${opt.slug}-1440-hero.png`) });
  const primaScroll = await page.evaluate(REVEAL);
  out.m1440 = await page.evaluate(MISURA, { heroSel: opt.hero, sezSel: opt.sezione });
  // scroll lento fino a metà, screenshot, poi fino in fondo per svegliare i reveal
  const h = out.m1440.altezzaPagina;
  for (let y = 0; y < Math.min(h, 12000); y += 600) { await page.mouse.wheel(0, 600); await page.waitForTimeout(120); }
  await page.waitForTimeout(800);
  const dopoScroll = await page.evaluate(REVEAL);
  const cambiate = new Set();
  for (const k of Object.keys(primaScroll)) { if (primaScroll[k] !== dopoScroll[k]) { const nuove = dopoScroll[k].split(/\s+/).filter((c) => !primaScroll[k].split(/\s+/).includes(c)); nuove.forEach((c) => cambiate.add(c)); } }
  out.classiRevealAlloScroll = [...cambiate].slice(0, 15);
  if (opt.sezione) { await page.locator(opt.sezione).first().scrollIntoViewIfNeeded().catch(() => {}); } else { await page.evaluate((y) => window.scrollTo(0, y), Math.round(h / 2 - 450)); }
  await page.waitForTimeout(700);
  await page.screenshot({ path: path.join(dir, `${opt.slug}-1440-meta.png`) });
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(dir, `${opt.slug}-1440-intera.png`), fullPage: true }).catch(() => {});
  await ctx.close();
  // ── 390 ──
  const ctxM = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1', locale: 'it-IT' });
  const pm = await ctxM.newPage();
  await pm.goto(URL_, { waitUntil: 'domcontentloaded', timeout: 60000 }); await pm.waitForTimeout(opt.attesa);
  await pm.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => {});
  for (const sel of ['button:has-text("Accetta")', 'button:has-text("Accept all")', 'button:has-text("Accept")', 'button:has-text("Rifiuta")']) { const b = pm.locator(sel).first(); if (await b.count()) { await b.click({ timeout: 2000 }).catch(() => {}); break; } }
  await pm.waitForTimeout(500);
  await pm.screenshot({ path: path.join(dir, `${opt.slug}-390-hero.png`) });
  out.m390 = await pm.evaluate(MISURA, { heroSel: opt.hero, sezSel: opt.sezione });
  const hm = out.m390.altezzaPagina;
  for (let y = 0; y < Math.min(hm, 14000); y += 700) { await pm.mouse.wheel(0, 700); await pm.waitForTimeout(100); }
  await pm.evaluate((y) => window.scrollTo(0, y), Math.round(hm / 2 - 400)); await pm.waitForTimeout(600);
  await pm.screenshot({ path: path.join(dir, `${opt.slug}-390-meta.png`) });
  await ctxM.close();
} catch (e) {
  out.errore = String(e.message).slice(0, 200);
  console.error(`! ${URL_}: ${out.errore}`);
}
await browser.close();

// ── scheda ──
const m = out.m1440 || {}, mm = out.m390 || {};
const h1 = m.tip && m.tip.h1, h1m = mm.tip && mm.tip.h1, p = m.tip && m.tip.p, btn = m.tip && m.tip['button, a[class*="btn"], a[class*="button"], a[class*="cta"]'];
const rapporto = h1 && h1m ? (h1.px / h1m.px).toFixed(2) + '×' : '—';
const lh = (v) => (v === 'normal' ? 'normal' : `${v}px`);
const righe = [
  `## ${opt.slug} — \`${URL_}\``,
  '',
  `\`reference/${opt.slug}/\` · 1440 hero + metà + intera · 390 hero + metà · misurato il ${out.data} con misura-reference.mjs (stili calcolati)${out.errore ? ` · **⚠ ${out.errore}**` : ''}${out.avviso ? ` · ⚠ ${out.avviso}` : ''}`,
  '',
  '| Voce | Misura |',
  '|---|---|',
  `| Famiglie caricate | ${(m.fonts || []).slice(0, 6).join(' · ') || '—'} |`,
  `| Display h1 @1440 | ${h1 ? `**${h1.famiglia} ${h1.px}px / ${lh(h1.interlinea)} / peso ${h1.peso}**, ${h1.spaziatura}, ${h1.colore}` : '—'} |`,
  `| Stesso h1 @390 | ${h1m ? `${h1m.px}px / ${lh(h1m.interlinea)} → rapporto **${rapporto}**` : '—'} |`,
  `| h2 @1440 | ${m.tip && m.tip.h2 ? `${m.tip.h2.famiglia} ${m.tip.h2.px}px / ${lh(m.tip.h2.interlinea)} / ${m.tip.h2.peso}` : '—'} |`,
  `| Corpo | ${p ? `${p.famiglia} ${p.px}px / ${lh(p.interlinea)}, larghezza ${p.larghezza}px` : '—'} |`,
  `| Bottone / CTA | ${btn ? `${btn.famiglia} ${btn.px}px, ${btn.trasformazione}, ${btn.spaziatura}` : '—'} |`,
  `| Fondo pagina | ${m.fondoPagina || '—'} |`,
  `| Palette per frequenza | ${(m.palette || []).slice(0, 8).map((c) => `${c.colore} (${c.ruoli.join('/')})`).join(' · ') || '—'} |`,
  `| Raggi usati | ${Object.entries(m.raggi || {}).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([r, n]) => `${r} ×${n}`).join(', ') || '—'} |`,
  `| Contenitore (mediana sezioni) | ${m.contenitore ? m.contenitore + 'px' : '—'} |`,
  `| Spazio fra le sezioni (padding mediano) | ${m.spazioMediano ? m.spazioMediano + 'px' : '—'} |`,
  `| Altezza pagina | ${m.altezzaPagina || '—'}px a 1440 · ${mm.altezzaPagina || '—'}px a 390 |`,
  `| Hero | ${m.heroInfo ? `${m.heroInfo.altezzaViewport} del viewport · video ${m.heroInfo.video ? 'sì' + (m.heroInfo.videoAutoplay ? ' (autoplay)' : '') : 'no'} · immagine ${m.heroInfo.immagine ? 'sì' : 'no'} · CTA: ${m.heroInfo.cta.length ? m.heroInfo.cta.map((c) => `«${c}»`).join(', ') : '**nessuna**'}` : '—'} |`,
  `| Header | ${m.headerPos || '—'} |`,
  `| Librerie e stack | ${Object.entries(m.lib || {}).filter(([, v]) => v).map(([k]) => k).join(', ') || 'nessuna riconosciuta'} |`,
  `| Movimento | ${m.animInfinite || 0} animazioni infinite · ${m.elementiConTransizione || 0} elementi con transition · reveal allo scroll: ${(out.classiRevealAlloScroll || []).join(', ') || 'nessuna classe cambiata'} |`,
  '',
  '**Cosa fa la hero.** [[da scrivere guardando `' + opt.slug + '-1440-hero.png` e `-390-hero.png`]]',
  '',
  '**Come è ritagliata la fotografia.** [[da scrivere guardando i PNG]]',
  '',
  '**La cosa che fa lui e gli altri no.** [[da scrivere]]',
  '',
  '**Il difetto, misurato.** [[se c\'è: contrasto su video, testo sotto le 16px a 390, CTA assente…]]',
  '',
  '> **Da qui prendo, per <CLIENTE>:** [[…]] **Non prendo:** [[…]]',
  '',
];
fs.writeFileSync(path.join(dir, 'misure.json'), JSON.stringify(out, null, 2));
fs.writeFileSync(path.join(dir, 'SCHEDA-blocco.md'), righe.join('\n'));
console.log(righe.slice(0, 22).join('\n'));
console.log(`\n▸ ${dir}: ${fs.readdirSync(dir).filter((f) => f.endsWith('.png')).length} PNG, misure.json, SCHEDA-blocco.md. Ora GUARDA i PNG (Read) e completa le righe fra [[…]].`);
