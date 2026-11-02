// Graba la herramienta (390x844 @3x) a 30 fps con tiempo controlado y registra cada toque.
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const V = path.resolve(__dirname, '..'), T = path.resolve(V, '../t/node_modules/three');
const FPS = 30, END = 30.0;
const grabando = (r) => r < 20.4 || r >= 25.2;
const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Guion de la grabación (r = segundos desde el inicio de la grabación)
const ACCIONES = [
  { at: 0.7,  tipo: 'scroll', dur: 1.2, destino: { sel: '#filtros', y: 205 }, swipe: [250, 650, 330] },
  { at: 2.3,  tipo: 'tap', sel: '[data-filtro="Dormitorio"]' },
  { at: 2.65, tipo: 'scroll', dur: 0.7, destino: { sel: '[data-personalizar="placard-blanco"]', y: 690 }, swipe: [210, 640, 380] },
  { at: 3.6,  tipo: 'tap', sel: '[data-personalizar="placard-blanco"]' },
  { at: 3.85, tipo: 'scroll', dur: 0.8, destino: { sel: '#estudio', y: 0 } },
  { at: 5.4,  tipo: 'scroll', dur: 0.6, destino: { sel: '#rng-ancho', y: 600 }, swipe: [300, 720, 560] },
  { at: 6.2,  tipo: 'drag', dur: 1.7, sel: '#rng-ancho', desde: 1800, hasta: 2800 },
  { at: 8.4,  tipo: 'scroll', dur: 0.8, destino: { sel: '#colores', y: 590 }, swipe: [300, 760, 440] },
  { at: 9.5,  tipo: 'tap', sel: 'label[for="color-nogal"]' },
  { at: 10.3, tipo: 'tap', sel: '#btn-abrir' },
  { at: 13.6, tipo: 'tap', sel: '#btn-agregar-3d' },
  { at: 15.6, tipo: 'scroll', dur: 1.4, destino: { sel: '#tabla-cortes', y: 150 }, swipe: [200, 700, 260] },
  { at: 25.1, tipo: 'salto', destino: { sel: '#gestion-titulo', y: 70 } },
  { at: 25.6, tipo: 'scroll', dur: 1.0, destino: { sel: '.lista-pedidos .ped', y: 180 }, swipe: [230, 690, 400] },
  { at: 27.2, tipo: 'tap', sel: '#estado-3', sinClick: true },
  { at: 27.65, tipo: 'elegir', sel: '#estado-3', valor: 'produccion' },
];
const RECTS = ['#visor', '#chip-precio', '#avisos', '#toast', '#btn-abrir', '#btn-agregar-3d', '#tabla-cortes', '#totales-cortes', '.lista-pedidos .ped', '#estado-3', '#kpis', '#rng-ancho', '#num-ancho', '#colores'];

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=swiftshader', '--ignore-gpu-blocklist'] });
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.route('**/three.min.js', r => r.fulfill({ path: T + '/build/three.min.js' }));
  await p.route('**/OrbitControls.js', r => r.fulfill({ path: T + '/examples/js/controls/OrbitControls.js' }));
  await p.clock.install();
  await p.goto('file://' + V + '/cap/app.html', { waitUntil: 'load' });
  await p.evaluate(() => { window.__irEstudio = () => {}; try { localStorage.clear(); } catch (e) {} return document.fonts.ready; });
  await p.clock.runFor(1500);
  await p.clock.pauseAt(Date.now() + 5000);

  const centro = (sel) => p.evaluate((s) => { const r = document.querySelector(s).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, sel);
  const destinoY = (d) => p.evaluate(({ sel, y }) => { const el = document.querySelector(sel); const yy = el.getBoundingClientRect().top + scrollY - y; return Math.max(0, Math.min(yy, document.documentElement.scrollHeight - innerHeight)); }, d);
  const meta = { fps: FPS, viewport: [390, 844], dpr: 3, toques: [], frames: {}, mensaje: '', filas: [] };
  const activos = [];
  const N = Math.round(END * FPS);
  for (let f = 0; f < N; f++) {
    const r = f / FPS;
    for (const a of ACCIONES) {
      if (Math.round(a.at * FPS) !== f) continue;
      if (a.tipo === 'scroll' || a.tipo === 'salto') {
        const y0 = await p.evaluate(() => scrollY), y1 = await destinoY(a.destino);
        if (a.tipo === 'salto') { await p.evaluate((y) => scrollTo(0, y), y1); continue; }
        activos.push({ ...a, f0: f, f1: f + Math.round(a.dur * FPS), y0, y1 });
        if (a.swipe) meta.toques.push({ tipo: 'swipe', f0: f, f1: f + Math.round(a.dur * FPS * 0.75), x: a.swipe[0], y0: a.swipe[1], y1: a.swipe[2] });
      } else if (a.tipo === 'tap') {
        const [x, y] = await centro(a.sel);
        meta.toques.push({ tipo: 'tap', f, x, y });
        if (!a.sinClick) await p.evaluate((s) => document.querySelector(s).click(), a.sel);
      } else if (a.tipo === 'elegir') {
        await p.evaluate(({ sel, valor }) => { const el = document.querySelector(sel); el.value = valor; el.dispatchEvent(new Event('change', { bubbles: true })); }, a);
      } else if (a.tipo === 'drag') {
        activos.push({ ...a, f0: f, f1: f + Math.round(a.dur * FPS), camino: [] });
      }
    }
    for (const a of activos) {
      if (f < a.f0 || f > a.f1) continue;
      const k = ease((f - a.f0) / (a.f1 - a.f0));
      if (a.tipo === 'scroll') await p.evaluate((y) => scrollTo(0, y), a.y0 + (a.y1 - a.y0) * k);
      if (a.tipo === 'drag') {
        const v = Math.round((a.desde + (a.hasta - a.desde) * k) / 10) * 10;
        const pos = await p.evaluate(({ sel, v }) => {
          const el = document.querySelector(sel); el.value = v; el.dispatchEvent(new Event('input', { bubbles: true }));
          const rc = el.getBoundingClientRect(), t = (v - el.min) / (el.max - el.min);
          return [rc.left + 10 + t * (rc.width - 20), rc.top + rc.height / 2];
        }, { sel: a.sel, v });
        a.camino.push([f, pos[0], pos[1]]);
        if (f === a.f1) meta.toques.push({ tipo: 'drag', f0: a.f0, f1: a.f1, camino: a.camino });
      }
    }
    await p.clock.runFor(1000 / FPS);
    if (Math.abs(r - 14.2) < 1e-6) {
      meta.mensaje = await p.evaluate(() => armarMensaje({ nombre: 'Laura Gómez', telefono: '11 5555-0101', email: '', localidad: 'Palermo, CABA', instalacion: 'Sí', fecha: '', comentarios: '' }, pedidoItems, '0004'));
    }
    if (Math.abs(r - 18.0) < 1e-6) {
      meta.filas = await p.evaluate(() => [...document.querySelectorAll('#tabla-cortes tbody tr')].map((tr) => { const c = tr.querySelectorAll('td'); const rc = tr.getBoundingClientRect(); return { pieza: c[0].innerText, mat: c[1].innerText, medida: c[2].innerText, cant: c[3].innerText, rect: [rc.left, rc.top, rc.width, rc.height] }; }));
    }
    if (grabando(r)) {
      meta.frames[f] = await p.evaluate((sels) => { const o = {}; for (const s of sels) { const el = document.querySelector(s); if (!el) continue; const rc = el.getBoundingClientRect(); if (rc.width && rc.bottom > 0 && rc.top < innerHeight) o[s] = [Math.round(rc.left), Math.round(rc.top), Math.round(rc.width), Math.round(rc.height)]; } o.scrollY = Math.round(scrollY); return o; }, RECTS);
      await p.screenshot({ path: `${V}/cap/f_${String(f).padStart(4, '0')}.jpg`, type: 'jpeg', quality: 90 });
    }
    if (f % 60 === 0) process.stdout.write(`${f} `);
  }
  fs.writeFileSync(`${V}/cap/meta.json`, JSON.stringify(meta));
  console.log('\nerrores', errs, 'toques', meta.toques.length, 'filas', meta.filas.length);
  await b.close();
})();
