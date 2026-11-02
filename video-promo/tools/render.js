// Renderiza la composición cuadro por cuadro. Uso: node render.js stills 0,3.5,...  |  node render.js video salida.mp4
const { chromium } = require('playwright-core');
const { spawn } = require('child_process');
const path = require('path');
const V = path.resolve(__dirname, '..');
(async () => {
  const modo = process.argv[2];
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  const errs = []; p.on('pageerror', (e) => errs.push(e.message)); p.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + V + '/comp/comp.html', { waitUntil: 'load' });
  await p.evaluate(() => window.listo);
  if (modo === 'stills') {
    for (const t of process.argv[3].split(',').map(Number)) {
      await p.evaluate((t) => window.renderFrame(t), t);
      await p.screenshot({ path: `${V}/out/s_${t.toFixed(2)}.jpg`, type: 'jpeg', quality: 85 });
    }
  } else if (modo === 'blur') {
    // motion blur: dos subcuadros por cuadro (t y t + 1/120 s, obturador de 180°) que ffmpeg promedia
    const salida = process.argv[3], N = 50 * 30;
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', '60', '-c:v', 'mjpeg', '-i', '-',
      '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000',
      '-filter_complex', "[0:v]tmix=frames=2:weights='1 1',select='mod(n\\,2)',setpts=N/(30*TB)[v]",
      '-map', '[v]', '-map', '1:a', '-shortest', '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', '30',
      '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', salida], { stdio: ['pipe', 'inherit', 'inherit'] });
    const t0 = Date.now();
    for (let n = 0; n < N; n++) for (const dt of [0, 1 / 120]) {
      const t = n / 30 + dt;
      await p.evaluate((t) => window.renderFrame(t), t);
      const buf = await p.screenshot({ type: 'jpeg', quality: 95 });
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
      if (n % 150 === 0 && dt === 0) console.log(`${(n / 30).toFixed(0)}s · ${((Date.now() - t0) / 1000).toFixed(0)}s transcurridos`);
    }
    ff.stdin.end(); await new Promise((r) => ff.on('close', r));
  } else {
    const fps = Number(process.argv[4] || 30), dur = 50, desde = Number(process.argv[5] || 0), hasta = Number(process.argv[6] || dur);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '16', '-pix_fmt', 'yuv420p', '-r', String(fps), process.argv[3]], { stdio: ['pipe', 'inherit', 'inherit'] });
    const t0 = Date.now();
    const N = Math.round((hasta - desde) * fps);
    for (let i = 0; i < N; i++) {
      const t = desde + i / fps;
      await p.evaluate((t) => window.renderFrame(t), t);
      const buf = await p.screenshot({ type: 'jpeg', quality: 95 });
      if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
      if (i % 150 === 0) process.stdout.write(`${t.toFixed(1)}s(${((Date.now() - t0) / 1000).toFixed(0)}) `);
    }
    ff.stdin.end(); await new Promise((r) => ff.on('close', r));
  }
  console.log('\nerrores', errs.slice(0, 5));
  await b.close();
})();
