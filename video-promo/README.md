# Video promo: herramienta para carpinterías (NALTA Digital)

Video vertical de 50 s (1080×1920, 30 fps) que muestra la herramienta de `carpinteria-universal/` en uso:
catálogo → diseño 3D → precio → lista de cortes → pedido por WhatsApp → panel → cierre con NALTA.

Todo lo que aparece en el teléfono es una grabación real de la herramienta. Los muebles del catálogo son
renders del propio configurador.

## Cómo se arma

1. `tools/renders.js` + `tools/crop_renders.py`: renderiza los muebles del catálogo con el configurador (→ `renders/`).
2. `tools/make_capture_html.py`: arma una copia de la demo para grabar (catálogo con renders, sin elementos de demo).
3. `tools/capture.js`: graba la herramienta a 30 fps con el tiempo controlado (Playwright) y anota cada toque
   (→ `cap/f_XXXX.jpg` + `cap/meta.json`, que se copia a `comp/meta.js`).
4. `comp/comp.html`: la composición. Cada cuadro se calcula a partir del tiempo `t` (`window.renderFrame(t)`).
   Reglas de animación: texto con máscara, movimientos encadenados, cámara que sigue al protagonista,
   transiciones por transformación de objetos.
5. `tools/render.js blur salida.mp4`: renderiza con motion blur (2 subcuadros por cuadro) y codifica con ffmpeg.

Las grabaciones (`cap/`) no están en el repo por su tamaño: se regeneran con los pasos 2 y 3.
Los scripts esperan Chromium en `/opt/pw-browsers/chromium` y `three@0.128.0` + `playwright-core` en `../t/node_modules`.
