#!/usr/bin/env node
/**
 * qa-browser.mjs — il QA nel browser che nessuno script statico può fare (Playwright + axe-core).
 *
 * Per ogni URL della sitemap (+ home, + --url): a 360 · 390 · 768 · 1024 · 1440 · 1920 screenshot
 * a pagina intera (da GUARDARE, non da archiviare), scroll orizzontale, CTA nel primo viewport
 * (a 390 e a 1440 con 760 px utili: laptop), righe dell'h1, tap target a 390 (WCAG 2.5.8: ≥ 24 px; obiettivo 44), input < 16 px (zoom iOS),
 * errori in console, richieste fallite e mixed content, axe-core (violazioni serious/critical),
 * `prefers-reduced-motion: reduce` (la pagina resta completa), tastiera (Tab → fuoco visibile),
 * e — se c'è un banner — la prova del rifiuto: dopo «Rifiuta» nessuna richiesta verso i domini
 * di misurazione.
 *
 *   npm i -D playwright @axe-core/playwright && npx playwright install chromium   # una volta per repo
 *   node scripts/qa-browser.mjs http://localhost:3140 --out collaudo/qa
 *   node scripts/qa-browser.mjs https://www.dominio.it --cta 'a[href^="tel:"], .cta' --rifiuta 'button:has-text("Rifiuta")'
 *
 * Env: PW_EXECUTABLE=/Applications/Google Chrome.app/Contents/MacOS/Google Chrome per usare Chrome invece del Chromium di Playwright.
 * Opzioni: --out dir (default collaudo/qa-AAAA-MM-GG) · --widths 360,390,768,1024,1440,1920 · --max-pages 25
 * · --url /path (ripetibile) · --cta <selettore> (default: tel:, wa.me, button/a con «preventivo|contatt|
 * prenota|chiama|richiedi|brief|scrivi») · --rifiuta <selettore del pulsante Rifiuta> · --accetta <selettore>
 * · --salta-axe. Esce con 1 se c'è almeno un ✘. Scrive report.json e report.md in --out.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const BASE = (args.find((a) => /^https?:\/\//.test(a)) || '').replace(/\/$/, '');
if (!BASE) { console.error('Uso: qa-browser.mjs <https://dominio> [--out dir] [--widths …] [--cta sel] [--rifiuta sel]'); process.exit(2); }
const opt = { out: `collaudo/qa-${new Date().toISOString().slice(0, 10)}`, widths: [360, 390, 768, 1024, 1440, 1920], max: 25, urls: [], cta: null, rifiuta: null, accetta: null, axe: true };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--out') opt.out = args[++i];
  else if (a === '--widths') opt.widths = args[++i].split(',').map(Number);
  else if (a === '--max-pages') opt.max = Number(args[++i]);
  else if (a === '--url') opt.urls.push(args[++i]);
  else if (a === '--cta') opt.cta = args[++i];
  else if (a === '--rifiuta') opt.rifiuta = args[++i];
  else if (a === '--accetta') opt.accetta = args[++i];
  else if (a === '--salta-axe') opt.axe = false;
}
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
let chromium, AxeBuilder;
try { ({ chromium } = await importa('playwright')); } catch { console.error('Manca playwright: npm i -D playwright && npx playwright install chromium (o install.sh, che la mette in ~/.blulang-tools)'); process.exit(2); }
if (opt.axe) { try { AxeBuilder = (await importa('@axe-core/playwright')).default; } catch { console.error('Manca @axe-core/playwright (npm i -D @axe-core/playwright): axe saltato'); opt.axe = false; } }

fs.mkdirSync(opt.out, { recursive: true });
const esiti = []; // {n, titolo, ok, dettaglio, warn}
const check = (n, titolo, ok, dettaglio = [], warn = false) => { esiti.push({ n, titolo, ok, dettaglio, warn }); console.log(`${ok ? '✔' : warn ? '⚠' : '✘'} ${String(n).padStart(2)}. ${titolo}`); dettaglio.slice(0, 12).forEach((d) => console.log(`       ${d}`)); if (dettaglio.length > 12) console.log(`       … e altre ${dettaglio.length - 12}`); };
const slug = (u) => (new URL(u, BASE).pathname.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '-').toLowerCase();
const TRACK = /googletagmanager\.com|google-analytics\.com|analytics\.google\.com|doubleclick\.net|facebook\.net|facebook\.com\/tr|hotjar\.com|clarity\.ms|linkedin\.com\/px|tiktok\.com\/i18n|plausible\.io|vercel-insights\.com|umami/i;
const CTA_DEFAULT = 'a[href^="tel:"], a[href*="wa.me"], a[href*="whatsapp"], a[href^="mailto:"], button:not([aria-label*="menu" i]), a.cta, a.btn, a.button, [class*="cta"], [class*="btn"], a[href*="contatt"], a[href*="preventiv"], a[href*="prenot"], a[href*="brief"], a[href*="richie"]';

// ── URL ────────────────────────────────────────────────────────────────────
let urls = ['/'];
try {
  const sm = await (await fetch(BASE + '/sitemap.xml')).text();
  for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) { const p = new URL(m[1].trim()).pathname; if (!urls.includes(p)) urls.push(p); }
} catch { /* niente sitemap: solo la home */ }
urls.push(...opt.urls.filter((u) => !urls.includes(u)));
urls = urls.slice(0, opt.max);
console.log(`\nQA nel browser — ${BASE}\n${urls.length} URL · larghezze ${opt.widths.join(', ')} · out ${opt.out}\n`);

// PW_EXECUTABLE=/percorso/Chromium per usare un browser già installato (es. quello del Playwright MCP o Chrome)
const browser = await chromium.launch(process.env.PW_EXECUTABLE ? { executablePath: process.env.PW_EXECUTABLE } : {});
const report = { base: BASE, data: new Date().toISOString(), pagine: {} };
const overflow = [], ctaKo = [], h1Ko = [], tapKo = [], tapWarn = [], inputKo = [], consoleKo = [], reteKo = [], mixed = [], axeKo = [], rmKo = [], tabKo = [];

for (const u of urls) {
  const url = BASE + u;
  report.pagine[u] = {};
  for (const w of opt.widths) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 844 : 900 }, deviceScaleFactor: 1, isMobile: w < 768, hasTouch: w < 768, locale: 'it-IT' });
    const page = await ctx.newPage();
    const errori = [], falliti = [];
    page.on('pageerror', (e) => errori.push(String(e.message || e).slice(0, 160)));
    page.on('console', (m) => { if (m.type() === 'error') errori.push(m.text().slice(0, 160)); });
    page.on('response', (r) => { if (r.status() >= 400) falliti.push(`${r.status()} ${r.url().slice(0, 120)}`); });
    page.on('request', (r) => { if (BASE.startsWith('https') && r.url().startsWith('http://')) mixed.push(`${u} @${w}: ${r.url().slice(0, 100)}`); });
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    } catch (e) { check(0, `${u} @${w}: non caricata (${String(e.message).slice(0, 80)})`, false); await ctx.close(); continue; }
    await page.waitForTimeout(600);
    // screenshot a pagina intera
    const file = path.join(opt.out, `${slug(u)}-${w}.png`);
    try { await page.screenshot({ path: file, fullPage: true }); } catch { /* pagine infinite */ }
    // overflow orizzontale
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (ov > 2) overflow.push(`${u} @${w}: scroll orizzontale di ${ov}px`);
    // CTA nel primo viewport (390 e 1440). A 1440 il viewport utile è quello di un laptop con la
    // barra del browser: ~760 px, non i 900 dello screenshot (regola hero, sito-design § 1).
    if (w === 390 || w === 1440) {
      const sel = opt.cta || CTA_DEFAULT;
      const trovata = await page.evaluate(({ sel, h }) => {
        const re = /preventiv|contatt|prenot|chiam|richied|brief|scriv|whatsapp|telefon|call|book|quote|contact/i;
        for (const el of document.querySelectorAll(sel)) {
          const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
          if (r.width < 24 || r.height < 24 || cs.visibility === 'hidden' || cs.display === 'none' || r.top < 0 || r.top > h) continue;
          const txt = (el.textContent || '') + ' ' + (el.getAttribute('href') || '') + ' ' + (el.getAttribute('aria-label') || '');
          if (re.test(txt) || /^tel:|wa\.me|whatsapp/.test(el.getAttribute('href') || '')) return txt.trim().slice(0, 60);
        }
        return null;
      }, { sel, h: w < 768 ? 844 : 760 });
      if (!trovata) ctaKo.push(`${u} @${w}: nessuna CTA (chiama / preventivo / contatti) nel primo viewport (${w < 768 ? 844 : 760} px utili)`);
      // righe del titolo della hero: > 3 a 1440, > 4 a 390 (tell della hero, sito-design § 1)
      const h1 = await page.evaluate(() => {
        const el = document.querySelector('h1'); if (!el) return null;
        const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
        return { righe: Math.max(1, Math.round(r.height / lh)), parole: (el.textContent || '').trim().split(/\s+/).length, top: Math.round(r.top) };
      });
      if (h1 && h1.righe > (w < 768 ? 4 : 3)) h1Ko.push(`${u} @${w}: h1 su ${h1.righe} righe (${h1.parole} parole)`);
    }
    // tap target e input a 390
    if (w === 390) {
      const r = await page.evaluate(() => {
        const ko = [], warn = [], inp = [];
        for (const el of document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [role=button]')) {
          const b = el.getBoundingClientRect(); const cs = getComputedStyle(el);
          if (b.width === 0 || b.height === 0 || cs.visibility === 'hidden' || el.getAttribute('aria-hidden') === 'true' || el.tabIndex < 0) continue;
          if (b.right <= 0 || b.left >= innerWidth || b.bottom <= 0) continue; // fuori schermo (skip link, honeypot)
          // WCAG 2.5.8 esclude i link in linea dentro un testo: si misurano bottoni e link «a blocco»
          const inline = cs.display === 'inline' && el.tagName === 'A' && el.closest('p, li, td, label, dd, figcaption, blockquote');
          const lab = ((el.textContent || '').trim() || el.getAttribute('aria-label') || el.getAttribute('href') || el.tagName).slice(0, 40);
          const nativo = el.tagName === 'INPUT' && /checkbox|radio/.test(el.type); // WCAG 2.5.8: i controlli nativi sono esclusi
          if (inline || nativo) { /* esclusi dalla misura */ }
          else if (b.width < 24 || b.height < 24) ko.push(`${lab} ${Math.round(b.width)}×${Math.round(b.height)}`);
          else if ((b.width < 44 || b.height < 44) && (el.tagName === 'A' || el.tagName === 'BUTTON') && !el.closest('p, li, td, footer')) warn.push(`${lab} ${Math.round(b.width)}×${Math.round(b.height)}`);
          if (/INPUT|SELECT|TEXTAREA/.test(el.tagName) && parseFloat(cs.fontSize) < 16) inp.push(`${el.name || el.id || el.tagName} ${cs.fontSize}`);
        }
        return { ko, warn, inp };
      });
      r.ko.forEach((x) => tapKo.push(`${u}: ${x}`)); r.warn.slice(0, 5).forEach((x) => tapWarn.push(`${u}: ${x}`)); r.inp.forEach((x) => inputKo.push(`${u}: ${x}`));
    }
    // axe a 390 e 1440
    if (opt.axe && (w === 390 || w === 1440)) {
      try {
        const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
        for (const v of res.violations) if (v.impact === 'serious' || v.impact === 'critical') axeKo.push(`${u} @${w}: ${v.id} (${v.impact}, ${v.nodes.length}) — ${v.help}`);
        report.pagine[u][`axe-${w}`] = res.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }));
      } catch (e) { axeKo.push(`${u} @${w}: axe non eseguito (${String(e.message).slice(0, 60)})`); }
    }
    // reduced motion + tastiera a 1440
    if (w === 1440) {
      const parole = await page.evaluate(() => document.body.innerText.split(/\s+/).length);
      const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', locale: 'it-IT' });
      const p2 = await ctx2.newPage();
      try {
        await p2.goto(url, { waitUntil: 'networkidle', timeout: 45000 }); await p2.waitForTimeout(600);
        const parole2 = await p2.evaluate(() => document.body.innerText.split(/\s+/).length);
        const anim = await p2.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running' && a.effect && a.effect.getTiming().iterations === Infinity).length);
        if (parole2 < parole * 0.8) rmKo.push(`${u}: con reduced-motion mancano parole (${parole2} vs ${parole})`);
        if (anim > 0) rmKo.push(`${u}: ${anim} animazioni infinite ancora attive con reduced-motion`);
        await p2.screenshot({ path: path.join(opt.out, `${slug(u)}-1440-reduced-motion.png`), fullPage: false });
      } catch { /* ignora */ }
      await ctx2.close();
      // tastiera: 8 Tab, il fuoco deve muoversi e vedersi
      const foc = await page.evaluate(async () => {
        const r = []; return r;
      });
      let visibili = 0, mossi = 0;
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press('Tab');
        const info = await page.evaluate(() => {
          const el = document.activeElement; if (!el || el === document.body) return null;
          const cs = getComputedStyle(el);
          const ring = (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || (cs.boxShadow && cs.boxShadow !== 'none') || (cs.borderColor && el.matches(':focus-visible') && cs.borderWidth !== '0px');
          return { tag: el.tagName, ring };
        });
        if (info) { mossi++; if (info.ring) visibili++; }
      }
      if (mossi < 3) tabKo.push(`${u}: con 8 Tab il fuoco si è mosso solo ${mossi} volte`);
      else if (visibili < mossi * 0.6) tabKo.push(`${u}: fuoco spesso invisibile (${visibili}/${mossi} con anello visibile)`);
      void foc;
    }
    // console e rete (una volta per pagina, alla larghezza 1440 o l'ultima)
    if (w === 1440 || w === opt.widths[opt.widths.length - 1]) {
      [...new Set(errori)].slice(0, 5).forEach((e) => consoleKo.push(`${u}: ${e}`));
      [...new Set(falliti)].filter((f) => !/favicon\.ico/.test(f)).slice(0, 5).forEach((f) => reteKo.push(`${u}: ${f}`));
    }
    report.pagine[u][w] = { overflow: ov, errori: [...new Set(errori)], falliti: [...new Set(falliti)] };
    await ctx.close();
  }
}

// ── consenso: rifiuto = zero richieste ai terzi di misurazione ─────────────
let consenso = null;
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'it-IT' });
  const page = await ctx.newPage();
  const prima = new Set(), dopo = new Set();
  page.on('request', (r) => { if (TRACK.test(r.url())) (consenso === null ? prima : dopo).add(new URL(r.url()).hostname); });
  try {
    await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 45000 }); await page.waitForTimeout(1500);
    const sel = opt.rifiuta || 'button:has-text("Rifiuta"), button:has-text("Rifiuto"), a:has-text("Rifiuta"), button:has-text("Reject"), button:has-text("Decline")';
    const btn = page.locator(sel).first();
    const cBanner = await btn.count();
    if (prima.size) check(11, 'Nessuna richiesta di misurazione prima del consenso', false, [...prima].map((h) => `prima di qualunque scelta: ${h}`));
    else check(11, 'Nessuna richiesta di misurazione prima del consenso', true);
    if (cBanner) {
      consenso = 'rifiutato';
      await btn.click({ timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(2500);
      await page.reload({ waitUntil: 'networkidle' }).catch(() => {}); await page.waitForTimeout(1500);
      const cAncora = await page.locator(sel).first().count();
      check(12, 'Rifiuto del consenso → zero richieste ai terzi, scelta ricordata al ricaricamento', dopo.size === 0 && cAncora === 0,
        [...[...dopo].map((h) => `dopo «Rifiuta»: ${h}`), ...(cAncora ? ['il banner ricompare dopo il ricaricamento (Garante, provv. 327/2025: consent fatigue)'] : [])]);
      if (opt.accetta) {
        const ctxA = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'it-IT' }); const pA = await ctxA.newPage(); const acc = new Set();
        pA.on('request', (r) => { if (TRACK.test(r.url())) acc.add(new URL(r.url()).hostname); });
        await pA.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 45000 }); await pA.locator(opt.accetta).first().click({ timeout: 5000 }).catch(() => {}); await pA.waitForTimeout(3000);
        check(13, 'Accettazione → la misurazione parte', acc.size > 0, acc.size ? [...acc] : ['nessuna richiesta di misurazione dopo «Accetta»: lo script non si carica']);
        await ctxA.close();
      }
    } else {
      check(12, 'Banner non trovato: sito senza cookie (nessun banner richiesto) oppure passa --rifiuta <selettore>', prima.size === 0, [], prima.size === 0);
    }
  } catch (e) { check(12, `Prova del consenso non eseguita: ${String(e.message).slice(0, 80)}`, false, [], true); }
  await ctx.close();
}
await browser.close();

check(1, `Screenshot a ${opt.widths.length} larghezze per ${urls.length} pagine in ${opt.out} — da guardare, uno per uno`, true);
check(2, 'Nessuno scroll orizzontale', overflow.length === 0, overflow);
check(3, 'CTA (chiama / preventivo / contatti) nel primo viewport a 390 (844 px) e 1440 (760 px utili, laptop)', ctaKo.length === 0, ctaKo);
if (h1Ko.length) check(3, 'Titolo della hero: ≤ 3 righe a 1440, ≤ 4 a 390 (sito-design § 1)', false, h1Ko, true);
check(4, 'Tap target ≥ 24 px a 390 (WCAG 2.5.8)', tapKo.length === 0, tapKo);
if (tapWarn.length) check(4, 'Bottoni e link sotto i 44 px a 390 (obiettivo Apple/Material)', false, tapWarn, true);
check(5, 'Input ≥ 16 px a 390 (iOS non fa zoom)', inputKo.length === 0, inputKo);
check(6, 'Console senza errori', consoleKo.length === 0, consoleKo);
check(7, 'Nessuna richiesta fallita (4xx/5xx), nessun mixed content', reteKo.length === 0 && mixed.length === 0, [...reteKo, ...mixed]);
if (opt.axe) check(8, 'axe-core: nessuna violazione serious/critical (WCAG 2.2 AA)', axeKo.length === 0, axeKo);
check(9, 'prefers-reduced-motion: pagina completa, nessuna animazione infinita', rmKo.length === 0, rmKo);
check(10, 'Tastiera: il fuoco si muove ed è visibile', tabKo.length === 0, tabKo);

const fail = esiti.filter((e) => !e.ok && !e.warn), warn = esiti.filter((e) => !e.ok && e.warn);
console.log(`\n${'─'.repeat(58)}\n  ${esiti.length - fail.length - warn.length} ✔ · ${warn.length} ⚠ · ${fail.length} ✘\n${'─'.repeat(58)}`);
fs.writeFileSync(path.join(opt.out, 'report.json'), JSON.stringify({ ...report, esiti }, null, 2));
fs.writeFileSync(path.join(opt.out, 'report.md'), `# QA nel browser — ${BASE} · ${report.data.slice(0, 10)}\n\n| Esito | Controllo | Dettaglio |\n|---|---|---|\n${esiti.map((e) => `| ${e.ok ? '✔' : e.warn ? '⚠' : '✘'} | ${e.titolo} | ${e.dettaglio.slice(0, 6).join('<br>')} |`).join('\n')}\n`);
process.exit(fail.length ? 1 : 0);
