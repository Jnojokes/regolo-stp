#!/usr/bin/env node
/**
 * opzioni-diff.mjs — quanto sono diverse davvero due (o più) opzioni di design.
 *
 * Post-mortem REGOLO, 08/09/2026: le opzioni C e D condividevano il 97 % delle classi con B —
 * tre palette sullo stesso sito — e nessuno l'aveva misurato prima di presentarle. Questo script
 * misura la distanza su cinque assi (gesto della hero, impaginazione, tipografia, fotografia,
 * chrome e movimento) più la sovrapposizione delle classi, e monta la **striscia di confronto**
 * (reference · opzione a 1440 · opzione a 390) per la prova dei tre secondi.
 *
 *   node scripts/opzioni-diff.mjs http://localhost:3000 / /opzione-b /opzione-c \
 *        --ref /=storey --ref /opzione-b=studio-foundry --reference-dir kit/reference --out collaudo/opzioni
 *
 * Esce 1 se una coppia di opzioni risulta «la stessa opzione ricolorata»: classi condivise > 50 %
 * oppure meno di 3 assi su 5 diversi. Env PW_EXECUTABLE per usare Chrome. Richiede playwright.
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const BASE = (args.find((a) => /^https?:\/\//.test(a)) || '').replace(/\/$/, '');
if (!BASE) { console.error('Uso: opzioni-diff.mjs <https://base> /rotta-a /rotta-b [...] [--ref /rotta=slug] [--reference-dir kit/reference] [--out dir]'); process.exit(2); }
const opt = { out: 'collaudo/opzioni', refDir: 'kit/reference', refs: {}, soglia: 0.5, assi: 3 };
const rotte = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === '--out') opt.out = args[++i];
  else if (a === '--reference-dir') opt.refDir = args[++i];
  else if (a === '--ref') { const [r, s] = args[++i].split('='); opt.refs[r] = s; }
  else if (a === '--soglia') opt.soglia = Number(args[++i]);
  else if (a === '--assi') opt.assi = Number(args[++i]);
  else if (a.startsWith('/')) rotte.push(a);
}
if (rotte.length < 2) { console.error('Servono almeno due rotte (es. / /opzione-b)'); process.exit(2); }
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
fs.mkdirSync(opt.out, { recursive: true });
const slug = (r) => (r.replace(/^\/|\/$/g, '') || 'home').replace(/[^a-z0-9]+/gi, '-').toLowerCase();

// ── firma di una pagina: gira nel browser, solo lettura ──────────────────────
const FIRMA = () => {
  const cs = (el) => getComputedStyle(el);
  const vis = (el) => { const r = el.getBoundingClientRect(); const s = cs(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const lum = (rgb) => { const m = (rgb || '').match(/\d+(\.\d+)?/g); if (!m) return null; const [r, g, b] = m.slice(0, 3).map(Number); return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; };
  const hex = (rgb) => { const m = (rgb || '').match(/\d+(\.\d+)?/g); if (!m) return rgb; return '#' + m.slice(0, 3).map((x) => Math.round(+x).toString(16).padStart(2, '0')).join(''); };
  const W = innerWidth, H = innerHeight;
  // classi
  const classi = new Set();
  let n = 0;
  for (const el of document.querySelectorAll('body *')) { if (n++ > 6000) break; if (typeof el.className === 'string') el.className.split(/\s+/).filter(Boolean).forEach((c) => classi.add(c)); }
  // sezioni di primo livello
  const main = document.querySelector('main') || document.body;
  const sezioni = [...main.children].filter(vis).slice(0, 40).map((s) => {
    const r = s.getBoundingClientRect(); const st = cs(s);
    const img = [...s.querySelectorAll('img, video, picture, [style*="background-image"]')].filter(vis).map((i) => i.getBoundingClientRect()).sort((a, b) => b.width * b.height - a.width * a.height)[0];
    const bg = st.backgroundColor;
    return { tag: s.tagName.toLowerCase(), h: Math.round(r.height), full: r.width >= W * 0.97, bg: bg !== 'rgba(0, 0, 0, 0)' ? hex(bg) : null, scuro: bg !== 'rgba(0, 0, 0, 0)' ? (lum(bg) ?? 1) < 0.35 : null, imgFull: !!(img && img.width >= W * 0.8 && img.height >= H * 0.5) };
  });
  // hero = prima sezione visibile alta almeno il 40% del viewport, altrimenti la prima
  const hero = [...main.children].filter(vis).find((s) => s.getBoundingClientRect().height >= H * 0.4) || [...main.children].filter(vis)[0] || main;
  const hr = hero.getBoundingClientRect();
  const h1 = document.querySelector('h1');
  const h1r = h1 && h1.getBoundingClientRect();
  const heroImg = [...hero.querySelectorAll('img, video, picture, [style*="background-image"]')].filter(vis).map((i) => i.getBoundingClientRect()).sort((a, b) => b.width * b.height - a.width * a.height)[0];
  const heroBg = cs(hero).backgroundColor;
  const bodyBg = cs(document.body).backgroundColor;
  const pageLum = lum(heroBg !== 'rgba(0, 0, 0, 0)' ? heroBg : bodyBg !== 'rgba(0, 0, 0, 0)' ? bodyBg : 'rgb(255,255,255)');
  const gesto = {
    altezzaPct: Math.round(hr.height / H * 100),
    immaginePiena: !!(heroImg && heroImg.width >= W * 0.8 && heroImg.height >= H * 0.5),
    video: !!hero.querySelector('video'),
    testoSuImmagine: !!(heroImg && h1r && h1r.top < heroImg.bottom && h1r.bottom > heroImg.top && h1r.left < heroImg.right && h1r.right > heroImg.left),
    scuro: pageLum !== null && pageLum < 0.35,
    h1px: h1 ? Math.round(parseFloat(cs(h1).fontSize)) : 0,
    h1sborda: !!(h1r && (h1r.right > W + 4 || h1r.left < -4)),
    h1allineamento: h1 ? cs(h1).textAlign : null,
    ctaHero: [...hero.querySelectorAll('a, button')].filter(vis).map((a) => (a.textContent || '').trim()).filter(Boolean).slice(0, 4),
  };
  // impaginazione
  const larg = sezioni.map((s) => s).length ? [...main.children].filter(vis).map((s) => { const inner = [...s.children].find(vis) || s; return Math.round(inner.getBoundingClientRect().width); }).sort((a, b) => a - b) : [];
  const contenitore = larg.length ? larg[Math.floor(larg.length / 2)] : W;
  const bande = sezioni.filter((s) => s.full && s.bg && s.bg !== hex(bodyBg)).length;
  const griglie = [...main.querySelectorAll('*')].filter((el) => vis(el) && /grid|flex/.test(cs(el).display) && el.children.length >= 3 && [...el.children].filter(vis).length >= 3).slice(0, 30);
  const colonne = griglie.map((g) => { const tops = [...g.children].filter(vis).map((c) => Math.round(c.getBoundingClientRect().top)); const prima = tops[0]; return tops.filter((t) => Math.abs(t - prima) < 4).length; });
  const impaginazione = { contenitore, bande, sezioni: sezioni.length, colonneMax: Math.max(0, ...colonne), sequenza: sezioni.slice(0, 12).map((s) => `${s.imgFull ? 'IMG' : s.scuro ? 'scuro' : s.bg ? 'banda' : '·'}`).join(' ') };
  // tipografia
  const fam = (el) => (el ? cs(el).fontFamily.split(',')[0].replace(/"/g, '').trim() : null);
  const p = document.querySelector('main p, p');
  const tipografia = { display: fam(h1), corpo: fam(p), h1px: gesto.h1px, corpopx: p ? Math.round(parseFloat(cs(p).fontSize)) : 0, fonts: [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/"/g, '')))].slice(0, 6), maiuscole: !!(h1 && cs(h1).textTransform === 'uppercase') };
  // fotografia
  const imgs = [...document.querySelectorAll('img, video, picture')].filter(vis).map((i) => i.getBoundingClientRect()).filter((r) => r.width >= 200);
  const areaImg = imgs.reduce((a, r) => a + r.width * r.height, 0);
  const areaPag = W * document.documentElement.scrollHeight;
  const fotografia = { quante: imgs.length, quotaPagina: Math.round(areaImg / areaPag * 100), aPienaLarghezza: imgs.filter((r) => r.width >= W * 0.95).length, primaProporzione: imgs[0] ? (imgs[0].width / imgs[0].height).toFixed(2) : null };
  // chrome e movimento
  const header = document.querySelector('header, [class*="header"], nav');
  const navLinks = header ? [...header.querySelectorAll('a')].filter(vis).length : 0;
  const chrome = { header: header ? cs(header).position : null, voci: navLinks, hamburger: !!document.querySelector('button[aria-label*="menu" i], button[aria-controls], [class*="burger"], [class*="hamburger"]'), lenis: !!(window.lenis || document.querySelector('.lenis')), gsap: !!window.gsap, animazioni: document.getAnimations().length, infinite: document.getAnimations().filter((a) => a.effect && a.effect.getTiming().iterations === Infinity).length, transizioni: [...document.querySelectorAll('body *')].slice(0, 3000).filter((el) => { const t = cs(el).transitionDuration; return t && t !== '0s'; }).length };
  // palette
  const conta = {};
  n = 0;
  for (const el of document.querySelectorAll('body *')) { if (n++ > 4000) break; if (!vis(el)) continue; const bg = cs(el).backgroundColor; if (bg && bg !== 'rgba(0, 0, 0, 0)') conta[hex(bg)] = (conta[hex(bg)] || 0) + 1; }
  const palette = Object.entries(conta).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([c]) => c);
  // conversione
  const form = document.querySelector('form');
  const fr = form && form.getBoundingClientRect();
  const conversione = { form: !!form, formA: fr ? Math.round((fr.top + scrollY) / document.documentElement.scrollHeight * 100) + '% della pagina' : null, tel: !!document.querySelector('a[href^="tel:"]'), whatsapp: !!document.querySelector('a[href*="wa.me"], a[href*="whatsapp"]') };
  return { classi: [...classi], gesto, impaginazione, tipografia, fotografia, chrome, palette, conversione, altezza: document.documentElement.scrollHeight };
};

const browser = await chromium.launch(process.env.PW_EXECUTABLE ? { executablePath: process.env.PW_EXECUTABLE } : {});
const firme = {};
for (const r of rotte) {
  firme[r] = {};
  for (const w of [1440, 390]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w < 768 ? 844 : 900 }, deviceScaleFactor: 1, isMobile: w < 768, hasTouch: w < 768, locale: 'it-IT' });
    const page = await ctx.newPage();
    try { await page.goto(BASE + r, { waitUntil: 'networkidle', timeout: 45000 }); } catch (e) { console.error(`! ${r} @${w}: ${String(e.message).slice(0, 80)}`); await ctx.close(); continue; }
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(opt.out, `${slug(r)}-${w}-hero.png`) });
    // sveglia i reveal, poi torna su
    for (let y = 0; y < 8000; y += 700) { await page.mouse.wheel(0, 700); await page.waitForTimeout(60); }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(500);
    try { await page.screenshot({ path: path.join(opt.out, `${slug(r)}-${w}-intera.png`), fullPage: true }); } catch { /* pagine infinite */ }
    firme[r][w] = await page.evaluate(FIRMA);
    await ctx.close();
  }
}

// ── confronto a coppie (sulla firma a 1440, con il 390 per la CTA) ───────────
const jaccard = (a, b) => { const A = new Set(a), B = new Set(b); const inter = [...A].filter((x) => B.has(x)).length; return inter / (A.size + B.size - inter || 1); };
const diff = (a, b) => {
  const assi = [];
  const g1 = a.gesto, g2 = b.gesto;
  const gesto = (g1.immaginePiena !== g2.immaginePiena) + (g1.testoSuImmagine !== g2.testoSuImmagine) + (g1.scuro !== g2.scuro) + (Math.max(g1.h1px, g2.h1px) / Math.max(1, Math.min(g1.h1px, g2.h1px)) >= 1.6) + (g1.h1sborda !== g2.h1sborda) + (g1.video !== g2.video);
  assi.push({ asse: 'gesto della hero', diverso: gesto >= 2, nota: `${g1.immaginePiena ? 'foto piena' : 'no foto piena'}/${g1.scuro ? 'scuro' : 'chiaro'}/h1 ${g1.h1px}${g1.h1sborda ? ' sborda' : ''} vs ${g2.immaginePiena ? 'foto piena' : 'no foto piena'}/${g2.scuro ? 'scuro' : 'chiaro'}/h1 ${g2.h1px}${g2.h1sborda ? ' sborda' : ''}` });
  const i1 = a.impaginazione, i2 = b.impaginazione;
  const imp = (Math.abs(i1.contenitore - i2.contenitore) > 200) + (Math.abs(i1.bande - i2.bande) >= 2) + (i1.colonneMax !== i2.colonneMax) + (i1.sequenza !== i2.sequenza);
  assi.push({ asse: 'impaginazione', diverso: imp >= 2, nota: `contenitore ${i1.contenitore} vs ${i2.contenitore} · bande ${i1.bande} vs ${i2.bande} · colonne ${i1.colonneMax} vs ${i2.colonneMax}` });
  const t1 = a.tipografia, t2 = b.tipografia;
  const tip = (t1.display !== t2.display) + (t1.corpo !== t2.corpo) + (Math.max(t1.h1px, t2.h1px) / Math.max(1, Math.min(t1.h1px, t2.h1px)) >= 1.6) + (t1.maiuscole !== t2.maiuscole);
  assi.push({ asse: 'tipografia', diverso: tip >= 2, nota: `${t1.display} ${t1.h1px} / ${t1.corpo} vs ${t2.display} ${t2.h1px} / ${t2.corpo}` });
  const f1 = a.fotografia, f2 = b.fotografia;
  const foto = (Math.abs(f1.quotaPagina - f2.quotaPagina) >= 15) + (Math.abs(f1.aPienaLarghezza - f2.aPienaLarghezza) >= 1) + (f1.primaProporzione !== f2.primaProporzione);
  assi.push({ asse: 'fotografia', diverso: foto >= 2, nota: `quota ${f1.quotaPagina}% vs ${f2.quotaPagina}% · a piena larghezza ${f1.aPienaLarghezza} vs ${f2.aPienaLarghezza}` });
  const c1 = a.chrome, c2 = b.chrome;
  const chr = (c1.header !== c2.header) + (c1.hamburger !== c2.hamburger) + (Math.abs(c1.voci - c2.voci) >= 3) + (c1.lenis !== c2.lenis) + (Math.abs(c1.animazioni - c2.animazioni) >= 3);
  assi.push({ asse: 'chrome e movimento', diverso: chr >= 2, nota: `header ${c1.header}/${c1.voci} voci/${c1.animazioni} anim vs ${c2.header}/${c2.voci} voci/${c2.animazioni} anim` });
  const paletteComune = a.palette.filter((c) => b.palette.includes(c)).length;
  return { jaccard: jaccard(a.classi, b.classi), assi, assiDiversi: assi.filter((x) => x.diverso).length, paletteComune };
};

let ko = 0;
const righe = [];
console.log(`\nOpzioni — ${BASE} · ${rotte.join('  ')}\n`);
for (let i = 0; i < rotte.length; i++) for (let j = i + 1; j < rotte.length; j++) {
  const a = firme[rotte[i]][1440], b = firme[rotte[j]][1440];
  if (!a || !b) continue;
  const d = diff(a, b);
  const stessa = d.jaccard > opt.soglia || d.assiDiversi < opt.assi;
  if (stessa) ko++;
  console.log(`${stessa ? '✘' : '✔'} ${rotte[i]} ↔ ${rotte[j]}: classi condivise ${Math.round(d.jaccard * 100)} % · assi diversi ${d.assiDiversi}/5 · colori di fondo in comune ${d.paletteComune}/5 → ${stessa ? 'LA STESSA OPZIONE RICOLORATA' : 'opzioni diverse'}`);
  for (const x of d.assi) console.log(`     ${x.diverso ? '≠' : '='} ${x.asse}: ${x.nota}`);
  righe.push({ a: rotte[i], b: rotte[j], ...d, stessa });
}
// conversione e CTA per ogni opzione (a 390 e 1440)
console.log('\nConversione, per opzione:');
for (const r of rotte) {
  const a = firme[r][1440], m = firme[r][390];
  if (!a) continue;
  console.log(`  ${r}: form ${a.conversione.form ? 'sì (' + a.conversione.formA + ')' : 'NO'} · tel ${a.conversione.tel ? 'sì' : 'no'} · WhatsApp ${a.conversione.whatsapp ? 'sì' : 'no'} · CTA in hero @1440: ${a.gesto.ctaHero.length ? a.gesto.ctaHero.map((c) => `«${c}»`).join(', ') : 'NESSUNA'} · @390: ${m && m.gesto.ctaHero.length ? m.gesto.ctaHero.map((c) => `«${c}»`).join(', ') : 'NESSUNA'}`);
}

// ── striscia di confronto ───────────────────────────────────────────────────
const cella = (src, didascalia) => src && fs.existsSync(src) ? `<figure><img src="data:image/png;base64,${fs.readFileSync(src).toString('base64')}"><figcaption>${didascalia}</figcaption></figure>` : `<figure class="vuota"><figcaption>${didascalia}<br><small>manca</small></figcaption></figure>`;
const refPng = (s) => { if (!s) return null; const d = path.join(opt.refDir, s); if (!fs.existsSync(d)) return null; const f = fs.readdirSync(d).find((x) => /1440-hero\.(png|jpe?g)$/i.test(x)); return f ? path.join(d, f) : null; };
const righeHtml = rotte.map((r) => `<div class="riga"><h2>${r}${opt.refs[r] ? ` ← ${opt.refs[r]}` : ''}</h2><div class="celle">${cella(refPng(opt.refs[r]), `reference ${opt.refs[r] || '—'} @1440`)}${cella(path.join(opt.out, `${slug(r)}-1440-hero.png`), 'opzione @1440')}${cella(path.join(opt.out, `${slug(r)}-390-hero.png`), 'opzione @390')}</div></div>`).join('');
const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;background:#111;color:#eee;font:14px/1.4 system-ui;padding:24px}h1{font-size:18px;margin:0 0 16px}h2{font-size:15px;margin:18px 0 8px;color:#bbb}.celle{display:grid;grid-template-columns:2fr 2fr 1fr;gap:12px;align-items:start}figure{margin:0}img{width:100%;display:block;border:1px solid #333}figcaption{font-size:12px;color:#999;margin-top:4px}.vuota{min-height:120px;border:1px dashed #444;display:flex;align-items:center;justify-content:center}</style><h1>Confronto opzioni — ${BASE} · ${new Date().toISOString().slice(0, 10)} · la prova dei tre secondi</h1>${righeHtml}`;
fs.writeFileSync(path.join(opt.out, 'CONFRONTO.html'), html);
{
  const ctx = await browser.newContext({ viewport: { width: 1800, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('file://' + path.resolve(path.join(opt.out, 'CONFRONTO.html')));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(opt.out, 'CONFRONTO.png'), fullPage: true });
  await ctx.close();
}
await browser.close();
fs.writeFileSync(path.join(opt.out, 'firme.json'), JSON.stringify({ base: BASE, data: new Date().toISOString(), firme, confronti: righe }, null, 2));
console.log(`\n▸ ${opt.out}/CONFRONTO.png (reference · 1440 · 390 per ogni opzione) — da guardare. firme.json con i numeri.`);
if (!righe.length) { console.log('\n✘ nessuna coppia valutata: le rotte non si sono caricate.'); process.exit(2); }
console.log(ko ? `\n✘ ${ko} coppia/e sono la stessa opzione ricolorata: cambia il gesto (hero, impaginazione, fotografia), non la palette.` : '\n✔ le opzioni sono diverse su almeno tre assi.');
process.exit(ko ? 1 : 0);
