// Genera "fotos" de catálogo renderizando muebles con el propio configurador 3D.
const { chromium } = require('playwright-core');
const path = require('path');
const V = path.resolve(__dirname, '..');
const T = path.resolve(V, '../t/node_modules/three');
const MODELOS = [
  { id: 'placard-blanco',   tipo: 'placard',   o: { color: 'blanco', ancho: 2000 } },
  { id: 'placard-nogal',    tipo: 'placard',   o: { color: 'nogal', ancho: 1600, columnas: [{tipo:'colgar',cantidad:1},{tipo:'cajones',cantidad:5},{tipo:'colgar',cantidad:1}] } },
  { id: 'comoda-roble',     tipo: 'comoda',    o: { color: 'roble', ancho: 1400, columnas: [{tipo:'cajones',cantidad:4},{tipo:'cajones',cantidad:4},{tipo:'cajones',cantidad:4}] } },
  { id: 'mesaluz-roble',    tipo: 'mesaluz',   o: { color: 'roble' } },
  { id: 'biblioteca-nogal', tipo: 'biblioteca',o: { color: 'nogal', ancho: 1600, columnas: [{tipo:'estantes',cantidad:5},{tipo:'estantes',cantidad:5},{tipo:'estantes',cantidad:5}] } },
  { id: 'biblioteca-blanca',tipo: 'biblioteca',o: { color: 'blanco', ancho: 1200, columnas: [{tipo:'estantes',cantidad:4},{tipo:'puerta',cantidad:2}] } },
  { id: 'tv-grafito',       tipo: 'tv',        o: { color: 'grafito' } },
  { id: 'tv-roble',         tipo: 'tv',        o: { color: 'roble', ancho: 2000, columnas: [{tipo:'cajones',cantidad:2},{tipo:'estantes',cantidad:1},{tipo:'cajones',cantidad:2}] } },
  { id: 'bajomesada-grafito', tipo: 'comoda',  o: { color: 'grafito', ancho: 1800, alto: 880, prof: 580, base: 'zocalo', columnas: [{tipo:'puerta',cantidad:1},{tipo:'cajones',cantidad:3},{tipo:'puerta',cantidad:1}] } },
];
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1200, height: 1100 }, deviceScaleFactor: 2 });
  await p.route('**/three.min.js', r => r.fulfill({ path: T + '/build/three.min.js' }));
  await p.route('**/OrbitControls.js', r => r.fulfill({ path: T + '/examples/js/controls/OrbitControls.js' }));
  await p.route('https://images.unsplash.com/**', r => r.abort());
  await p.goto('file:///home/user/Quien-soy/carpinteria-universal/index.html');
  await p.addStyleTag({ content: '.visor-barra,.visor-pie,.barra-demo,.wa-flotante,.header{display:none!important} html{scroll-behavior:auto!important}' });
  await p.evaluate(() => document.querySelector('#intro-agencia').close());
  await p.waitForTimeout(800);
  await p.evaluate(() => document.querySelector('#btn-cotas').click());   // sin cotas para la foto
  for (const m of MODELOS) {
    await p.evaluate(({ tipo, o }) => {
      estado = cargarTipo(tipo); Object.assign(estado, o); sincronizarControles(true); actualizar();
    }, m);
    await p.waitForTimeout(1400);
    await p.locator('#visor').screenshot({ path: `${V}/renders/${m.id}-raw.png` });
    console.log('ok', m.id);
  }
  await b.close();
})();
