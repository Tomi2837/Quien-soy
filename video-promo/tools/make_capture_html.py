# Arma una copia de la demo universal para grabarla en video (catálogo con renders, sin elementos de "demo").
import re, sys, os
V = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
R = 'file://' + V + '/renders/'
s = open('/home/user/Quien-soy/carpinteria-universal/index.html', encoding='utf-8').read()
def rep(a, b, cnt=1):
    global s
    assert s.count(a) == cnt, (s.count(a), a[:70]); s = s.replace(a, b)
def rep_re(pat, b):
    global s
    s2, n = re.subn(pat, lambda m: b, s, flags=re.S); assert n == 1, (n, pat[:60]); s = s2

rep_re(r'const unsplash = .*?MODELOS\.forEach\(\(m\) => \(m\.imagen = unsplash\(m\.foto\)\)\);', '''const MODELOS = [
  { id: "bajomesada-grafito", nombre: "Bajo mesada a medida",     categoria: "Cocinas",     config: "comoda",     descripcion: "Puertas y cajones a la medida exacta de tu mesada." },
  { id: "tv-grafito",         nombre: "Mueble de TV flotante",    categoria: "Living",      config: "tv",         descripcion: "Rack bajo con nicho central y patas metálicas." },
  { id: "tv-roble",           nombre: "Rack de TV con cajones",   categoria: "Living",      config: "tv",         descripcion: "Cajones amplios y estante abierto al centro." },
  { id: "placard-blanco",     nombre: "Placard de piso a techo",  categoria: "Dormitorio",  config: "placard",    descripcion: "Puertas de abrir, maletero y barral de colgar." },
  { id: "placard-nogal",      nombre: "Placard con cajonera",     categoria: "Dormitorio",  config: "placard",    descripcion: "Cajonera central entre dos módulos para colgar." },
  { id: "comoda-roble",       nombre: "Cómoda de 12 cajones",     categoria: "Dormitorio",  config: "comoda",     descripcion: "Tres columnas de cajones con correderas telescópicas." },
  { id: "mesaluz-roble",      nombre: "Mesa de luz dos cajones",  categoria: "Dormitorio",  config: "mesaluz",    descripcion: "Madera clara, perillas y patas metálicas." },
  { id: "biblioteca-nogal",   nombre: "Biblioteca de pared",      categoria: "Bibliotecas", config: "biblioteca", descripcion: "Quince nichos de piso a techo." },
  { id: "biblioteca-blanca",  nombre: "Biblioteca con puerta",    categoria: "Bibliotecas", config: "biblioteca", descripcion: "Estantes abiertos y un módulo cerrado." },
];
MODELOS.forEach((m) => (m.imagen = "''' + R + '''" + m.id + ".jpg"));''')
rep('const CATEGORIAS = ["Cocinas", "Living", "Dormitorio", "Bibliotecas", "Escritorios", "Mesas", "Baño", "Comercial"];',
    'const CATEGORIAS = ["Cocinas", "Living", "Dormitorio", "Bibliotecas"];')
# Hero: mosaico con renders
s = re.sub(r'(<div class="mosaico revelar">).*?(</div>)', lambda m: m.group(1) + f'''
      <figure><img src="{R}placard-blanco.jpg" alt="Placard blanco" width="279" height="345"><figcaption>PLACARD</figcaption></figure>
      <figure><img src="{R}comoda-roble.jpg" alt="Cómoda de roble" width="279" height="346"><figcaption>CÓMODA</figcaption></figure>
      <figure><img src="{R}biblioteca-nogal.jpg" alt="Biblioteca de nogal" width="278" height="345"><figcaption>BIBLIOTECA</figcaption></figure>
    ''' + m.group(2), s, count=1, flags=re.S)
# Pedidos de ejemplo con ids que existen y sin la marca "Ejemplo"
rep('it("mesa-luz-cajones", 2, "45 cm de ancho")', 'it("mesaluz-roble", 2, "45 cm de ancho")')
rep('it("bajo-mesada", 1, "2,40 m lineales"), it("vanitory", 1)', 'it("bajomesada-grafito", 1, "2,40 m lineales"), it("tv-roble", 1)')
s = s.replace('ejemplo: true', 'ejemplo: false')
# Sin propuesta de agencia ni scroll suave (la grabación controla el scroll)
rep('iniciarIntroAgencia();\n</script>', '</script>')
rep('$("#estudio").scrollIntoView({ behavior: "smooth" })', 'window.__irEstudio && window.__irEstudio()', 2)
rep('</head>', '''<style>
  html{scroll-behavior:auto!important}
  .barra-demo,.nota-demo,#btn-borrar-ejemplos,#intro-agencia,.etiqueta-demo,.wa-flotante{display:none!important}
  .js .revelar{opacity:1!important;transform:none!important}
</style>
</head>''')
open(V + '/cap/app.html', 'w', encoding='utf-8').write(s)
print('ok', len(s))
