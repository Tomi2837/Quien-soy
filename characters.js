// characters.js

const VARIANTS_BY_CATEGORY = {
  tv_farandula: [
    "version clasica",
    "modo panelista indignado",
    "modo escandalo en vivo",
    "modo meme cronica",
    "edicion prime time"
  ],

  musica: [
    "version clasica",
    "modo recital",
    "modo entrevista rara",
    "modo meme twitter",
    "edicion estudio"
  ],

  futbol: [
    "version clasica",
    "modo festejo termo",
    "modo conferencia picante",
    "modo relato epico",
    "edicion fulbo champagne"
  ],

  streaming_internet: [
    "version clasica",
    "modo reaccion",
    "modo clip viral",
    "modo twitch 3am",
    "edicion chat spam"
  ],

  politica_actualidad: [
    "version clasica",
    "modo debate caliente",
    "modo cadena nacional",
    "modo meme twitter",
    "edicion conferencia rara"
  ],

  memes_virales: [
    "modo template",
    "modo reaccion",
    "modo cursed",
    "modo whatsapp",
    "modo sticker"
  ],

  simpsons_memes: [
    "version clasica",
    "modo escena iconica",
    "modo reaccion",
    "modo meme latino",
    "edicion cursed"
  ],

  ficcion_arg_pop: [
    "version clasica",
    "modo episodio random",
    "modo reaccion",
    "modo meme nacional",
    "edicion prime"
  ],

  cronica_memes: [
    "modo placa roja",
    "modo movil falopa",
    "modo graph desesperado",
    "modo meme nacional",
    "edicion urgencia"
  ],

  frases_argentas: [
    "modo sticker",
    "modo audio de tia",
    "modo estado de whatsapp",
    "modo reaccion",
    "edicion bien grasa"
  ],

  dragon_ball_memes: [
    "version clasica",
    "modo pelea eterna",
    "modo reaccion latino",
    "modo meme doblaje",
    "edicion cursed"
  ],

  tiktok_arg: [
    "modo viral",
    "modo directo",
    "modo recorte",
    "modo meme",
    "edicion algoritmo"
  ],

  fulbo_termo: [
    "modo cancha",
    "modo relato falopa",
    "modo debate termo",
    "modo meme domingo",
    "edicion cabala"
  ]
};

const BASE_CHARACTERS = [
  // TV Y FARANDULA
  { name: "Susana Gimenez", category: "tv_farandula" },
  { name: "Moria Casan", category: "tv_farandula" },
  { name: "Marcelo Tinelli", category: "tv_farandula" },
  { name: "Guido Kaczka", category: "tv_farandula" },
  { name: "Marley", category: "tv_farandula" },
  { name: "Dario Barassi", category: "tv_farandula" },
  { name: "Pampita", category: "tv_farandula" },
  { name: "Wanda Nara", category: "tv_farandula" },
  { name: "Yanina Latorre", category: "tv_farandula" },
  { name: "Mirtha Legrand", category: "tv_farandula" },
  { name: "Juana Viale", category: "tv_farandula" },
  { name: "Angel de Brito", category: "tv_farandula" },
  { name: "Lizy Tagliani", category: "tv_farandula" },
  { name: "Georgina Barbarossa", category: "tv_farandula" },
  { name: "Vero Lozano", category: "tv_farandula" },
  { name: "Marcelo Polino", category: "tv_farandula" },
  { name: "Flor de la V", category: "tv_farandula" },
  { name: "Carmen Barbieri", category: "tv_farandula" },
  { name: "Nazarena Velez", category: "tv_farandula" },
  { name: "Paula Chaves", category: "tv_farandula" },

  // MUSICA
  { name: "Charly Garcia", category: "musica" },
  { name: "Gustavo Cerati", category: "musica" },
  { name: "Luis Alberto Spinetta", category: "musica" },
  { name: "Fito Paez", category: "musica" },
  { name: "Andres Calamaro", category: "musica" },
  { name: "Lali", category: "musica" },
  { name: "Tini", category: "musica" },
  { name: "Maria Becerra", category: "musica" },
  { name: "Duki", category: "musica" },
  { name: "Bizarrap", category: "musica" },
  { name: "Nicki Nicole", category: "musica" },
  { name: "Emilia", category: "musica" },
  { name: "Wos", category: "musica" },
  { name: "Trueno", category: "musica" },
  { name: "Tiago PZK", category: "musica" },
  { name: "La Joaqui", category: "musica" },
  { name: "Cazzu", category: "musica" },
  { name: "Nathy Peluso", category: "musica" },
  { name: "Dillom", category: "musica" },
  { name: "Luck Ra", category: "musica" },
  { name: "Abel Pintos", category: "musica" },
  { name: "Soledad Pastorutti", category: "musica" },
  { name: "Ricky Maravilla", category: "musica" },
  { name: "Palito Ortega", category: "musica" },
  { name: "Axel", category: "musica" },

  // FUTBOL
  { name: "Lionel Messi", category: "futbol" },
  { name: "Diego Maradona", category: "futbol" },
  { name: "Juan Roman Riquelme", category: "futbol" },
  { name: "Carlos Tevez", category: "futbol" },
  { name: "Martin Palermo", category: "futbol" },
  { name: "Angel Di Maria", category: "futbol" },
  { name: "Emiliano Dibu Martinez", category: "futbol" },
  { name: "Lionel Scaloni", category: "futbol" },
  { name: "Marcelo Gallardo", category: "futbol" },
  { name: "Pablo Aimar", category: "futbol" },
  { name: "Javier Mascherano", category: "futbol" },
  { name: "Sergio Aguero", category: "futbol" },
  { name: "Gonzalo Higuain", category: "futbol" },
  { name: "Ariel Ortega", category: "futbol" },
  { name: "Rodrigo De Paul", category: "futbol" },
  { name: "Javier Zanetti", category: "futbol" },
  { name: "Gabriel Batistuta", category: "futbol" },
  { name: "Claudio Caniggia", category: "futbol" },
  { name: "Julian Alvarez", category: "futbol" },
  { name: "Enzo Fernandez", category: "futbol" },

  // STREAMERS E INTERNET
  { name: "Coscu", category: "streaming_internet" },
  { name: "Momo", category: "streaming_internet" },
  { name: "Spreen", category: "streaming_internet" },
  { name: "Davoo Xeneize", category: "streaming_internet" },
  { name: "La Cobra", category: "streaming_internet" },
  { name: "Luquita Rodriguez", category: "streaming_internet" },
  { name: "Migue Granados", category: "streaming_internet" },
  { name: "Nati Jota", category: "streaming_internet" },
  { name: "Nico Occhiato", category: "streaming_internet" },
  { name: "Grego Rossello", category: "streaming_internet" },
  { name: "Martin Cirio", category: "streaming_internet" },
  { name: "Santi Maratea", category: "streaming_internet" },
  { name: "Papo MC", category: "streaming_internet" },
  { name: "Robleis", category: "streaming_internet" },
  { name: "Brunenger", category: "streaming_internet" },
  { name: "Ibai", category: "streaming_internet" },
  { name: "Auronplay", category: "streaming_internet" },
  { name: "TheGrefg", category: "streaming_internet" },

  // POLITICA Y ACTUALIDAD
  { name: "Javier Milei", category: "politica_actualidad" },
  { name: "Cristina Fernandez de Kirchner", category: "politica_actualidad" },
  { name: "Mauricio Macri", category: "politica_actualidad" },
  { name: "Alberto Fernandez", category: "politica_actualidad" },
  { name: "Sergio Massa", category: "politica_actualidad" },
  { name: "Patricia Bullrich", category: "politica_actualidad" },
  { name: "Horacio Rodriguez Larreta", category: "politica_actualidad" },
  { name: "Axel Kicillof", category: "politica_actualidad" },
  { name: "Guillermo Moreno", category: "politica_actualidad" },
  { name: "Myriam Bregman", category: "politica_actualidad" },
  { name: "Jose Luis Espert", category: "politica_actualidad" },
  { name: "Victoria Villarruel", category: "politica_actualidad" },
  { name: "Juan Grabois", category: "politica_actualidad" },
  { name: "Martin Lousteau", category: "politica_actualidad" },
  { name: "Anibal Fernandez", category: "politica_actualidad" },

  // MEMES VIRALES
  { name: "Ricardo Fort", category: "memes_virales" },
  { name: "Tano Pasman", category: "memes_virales" },
  { name: "Zulma Lobato", category: "memes_virales" },
  { name: "Marta Minujin", category: "memes_virales" },
  { name: "Anabela Ascar", category: "memes_virales" },
  { name: "Tito Speranza", category: "memes_virales" },
  { name: "Amalia Granata", category: "memes_virales" },
  { name: "Silvia Suller", category: "memes_virales" },
  { name: "Jacobo Winograd", category: "memes_virales" },
  { name: "El Bananero", category: "memes_virales" },
  { name: "Yayo Guridi", category: "memes_virales" },
  { name: "Pachu Peña", category: "memes_virales" },
  { name: "Pablo Granados", category: "memes_virales" },
  { name: "Miguel del Sel", category: "memes_virales" },
  { name: "El Dipy", category: "memes_virales" },
  { name: "La Bomba Tucumana", category: "memes_virales" },
  { name: "Alfredo Casero", category: "memes_virales" },
  { name: "Fabio Alberti", category: "memes_virales" },
  { name: "Diego Capusotto", category: "memes_virales" },
  { name: "Caruso Lombardi", category: "memes_virales" },
  { name: "Guillote Coppola", category: "memes_virales" },
  { name: "Gino Renni", category: "memes_virales" },
  { name: "Marixa Balli", category: "memes_virales" },
  { name: "Matias Ale", category: "memes_virales" },
  { name: "Virginia Gallardo", category: "memes_virales" },
  { name: "El Negro de WhatsApp", category: "memes_virales" },
  { name: "El Gigolo", category: "memes_virales" },
  { name: "La Chabona", category: "memes_virales" },
  { name: "El Pepo", category: "memes_virales" },
  { name: "El Eachi", category: "memes_virales" },
  { name: "El Pity Alvarez", category: "memes_virales" },
  { name: "El Hombre Gato", category: "memes_virales" },
  { name: "La Faraona", category: "memes_virales" },
  { name: "El Viejo Inimputable", category: "memes_virales" },
  { name: "El Taxista Anti Messi", category: "memes_virales" },
  { name: "El Hombre Pala", category: "memes_virales" },
  { name: "El Chabon del Sillazo", category: "memes_virales" },
  { name: "La Señora del Meme de Cronica", category: "memes_virales" },
  { name: "El Viejo del Fernet", category: "memes_virales" },
  { name: "El Pibe del Mate", category: "memes_virales" },

  // SIMPSONS MEMES
  { name: "Homero Simpson", category: "simpsons_memes" },
  { name: "Homero entrando al arbusto", category: "simpsons_memes" },
  { name: "Homero retrocediendo", category: "simpsons_memes" },
  { name: "Homero gordo compu", category: "simpsons_memes" },
  { name: "Homero baboso", category: "simpsons_memes" },
  { name: "Homero enojado", category: "simpsons_memes" },
  { name: "Homero cerebro", category: "simpsons_memes" },
  { name: "Homero inteligente", category: "simpsons_memes" },
  { name: "Bart Simpson", category: "simpsons_memes" },
  { name: "Bart pizarra", category: "simpsons_memes" },
  { name: "Bart castigado", category: "simpsons_memes" },
  { name: "Bart triste", category: "simpsons_memes" },
  { name: "Lisa Simpson", category: "simpsons_memes" },
  { name: "Lisa presentacion", category: "simpsons_memes" },
  { name: "Lisa señalando", category: "simpsons_memes" },
  { name: "Marge Simpson", category: "simpsons_memes" },
  { name: "Abuelo Simpson", category: "simpsons_memes" },
  { name: "Abuelo entra y sale", category: "simpsons_memes" },
  { name: "Ned Flanders", category: "simpsons_memes" },
  { name: "Sr Burns", category: "simpsons_memes" },
  { name: "Burns excelente", category: "simpsons_memes" },
  { name: "Milhouse", category: "simpsons_memes" },
  { name: "Nelson haha", category: "simpsons_memes" },
  { name: "Ralph soy especial", category: "simpsons_memes" },
  { name: "Skinner aurora boreal", category: "simpsons_memes" },
  { name: "Moe", category: "simpsons_memes" },
  { name: "Apu", category: "simpsons_memes" },
  { name: "Comic Book Guy", category: "simpsons_memes" },
  { name: "Lenny", category: "simpsons_memes" },
  { name: "Carl", category: "simpsons_memes" },

  // FICCION ARGENTINA Y POP
  { name: "Pepe Argento", category: "ficcion_arg_pop" },
  { name: "Moni Argento", category: "ficcion_arg_pop" },
  { name: "Coqui Argento", category: "ficcion_arg_pop" },
  { name: "Paola Argento", category: "ficcion_arg_pop" },
  { name: "Maria Elena Fuseneco", category: "ficcion_arg_pop" },
  { name: "Dardo Fuseneco", category: "ficcion_arg_pop" },
  { name: "Mama Cora", category: "ficcion_arg_pop" },
  { name: "Bombita Rodriguez", category: "ficcion_arg_pop" },
  { name: "Violencia Rivas", category: "ficcion_arg_pop" },
  { name: "Micky Vainilla", category: "ficcion_arg_pop" },
  { name: "Mafalda", category: "ficcion_arg_pop" },
  { name: "Manolito", category: "ficcion_arg_pop" },
  { name: "Susanita", category: "ficcion_arg_pop" },
  { name: "Felipe", category: "ficcion_arg_pop" },
  { name: "Guille", category: "ficcion_arg_pop" },
  { name: "Clemente", category: "ficcion_arg_pop" },
  { name: "Patoruzu", category: "ficcion_arg_pop" },
  { name: "Isidoro Cañones", category: "ficcion_arg_pop" },
  { name: "Hijitus", category: "ficcion_arg_pop" },
  { name: "Larguirucho", category: "ficcion_arg_pop" },

  // CRONICA MEMES
  { name: "Cronica urgente", category: "cronica_memes" },
  { name: "Cronica insolito", category: "cronica_memes" },
  { name: "Cronica no lo soñe", category: "cronica_memes" },
  { name: "Cronica un monton", category: "cronica_memes" },
  { name: "Cronica tremendo", category: "cronica_memes" },
  { name: "Cronica impactante", category: "cronica_memes" },
  { name: "Cronica alta placa roja", category: "cronica_memes" },
  { name: "Cronica flecha y circulo", category: "cronica_memes" },
  { name: "Cronica movil delirante", category: "cronica_memes" },
  { name: "Cronica graph falopa", category: "cronica_memes" },

  // FRASES ARGENTAS
  { name: "Que miras bobo", category: "frases_argentas" },
  { name: "No hay plata", category: "frases_argentas" },
  { name: "Muchaaaaachos", category: "frases_argentas" },
  { name: "Es una banda", category: "frases_argentas" },
  { name: "Banco", category: "frases_argentas" },
  { name: "Anulo mufa", category: "frases_argentas" },
  { name: "A mimir", category: "frases_argentas" },
  { name: "Fulbo", category: "frases_argentas" },
  { name: "Se tenia que decir y se dijo", category: "frases_argentas" },
  { name: "Vos no podes decir semejante barbaridad", category: "frases_argentas" },
  { name: "Para la mano Macri", category: "frases_argentas" },
  { name: "Hermosa mañana verdad", category: "frases_argentas" },
  { name: "Bueno quien tiene hambre", category: "frases_argentas" },
  { name: "Me sirve", category: "frases_argentas" },
  { name: "Hoy se come", category: "frases_argentas" },

  // DRAGON BALL MEMES
  { name: "Goku", category: "dragon_ball_memes" },
  { name: "Vegeta", category: "dragon_ball_memes" },
  { name: "Piccolo", category: "dragon_ball_memes" },
  { name: "Gohan", category: "dragon_ball_memes" },
  { name: "Freezer", category: "dragon_ball_memes" },
  { name: "Cell", category: "dragon_ball_memes" },
  { name: "Majin Buu", category: "dragon_ball_memes" },
  { name: "Bills", category: "dragon_ball_memes" },
  { name: "Whis", category: "dragon_ball_memes" },
  { name: "Goku ultra instinto meme", category: "dragon_ball_memes" },
  { name: "Vegeta mi orgullo", category: "dragon_ball_memes" },
  { name: "Piccolo estratega", category: "dragon_ball_memes" },
  { name: "Freezer empresario", category: "dragon_ball_memes" },
  { name: "Yamcha muerto", category: "dragon_ball_memes" },
  { name: "Mr Satan vendiendo humo", category: "dragon_ball_memes" },

  // TIKTOK ARG
  { name: "Turro de TikTok", category: "tiktok_arg" },
  { name: "Pibe POV", category: "tiktok_arg" },
  { name: "Minita GRWM", category: "tiktok_arg" },
  { name: "Influencer motivacional", category: "tiktok_arg" },
  { name: "Tiktoker vendiendo curso", category: "tiktok_arg" },
  { name: "Tiktoker opinologo", category: "tiktok_arg" },
  { name: "Tiktoker de chimentos", category: "tiktok_arg" },
  { name: "Pibe del trend", category: "tiktok_arg" },
  { name: "Pibe sigma berreta", category: "tiktok_arg" },
  { name: "Tiktoker de fulbo", category: "tiktok_arg" },

  // FULBO TERMO
  { name: "Hincha que rompe la tele", category: "fulbo_termo" },
  { name: "Relator que grita gol 20 minutos", category: "fulbo_termo" },
  { name: "Panelista anti Boca", category: "fulbo_termo" },
  { name: "Panelista anti River", category: "fulbo_termo" },
  { name: "Hincha mufa", category: "fulbo_termo" },
  { name: "Hincha cabulero", category: "fulbo_termo" },
  { name: "Termo del mundial", category: "fulbo_termo" },
  { name: "Pibe que vive en TyC Sports", category: "fulbo_termo" },
  { name: "Viejo que putea al tecnico", category: "fulbo_termo" },
  { name: "Hincha del ascenso", category: "fulbo_termo" }
];

const CATEGORY_LABELS = {
  tv_farandula: "TV y farandula",
  musica: "Musica",
  futbol: "Fulbo",
  streaming_internet: "Streamers",
  politica_actualidad: "Politica",
  memes_virales: "Memes argentinos",
  simpsons_memes: "Simpsons memes",
  ficcion_arg_pop: "Ficcion nacional",
  cronica_memes: "Cronica memes",
  frases_argentas: "Frases argentas",
  dragon_ball_memes: "Dragon Ball memes",
  tiktok_arg: "TikTok argento",
  fulbo_termo: "Fulbo termo"
};

function buildPool() {
  const pool = [];
  let id = 1;

  for (const base of BASE_CHARACTERS) {
    const variants = VARIANTS_BY_CATEGORY[base.category];

    for (const variant of variants) {
      pool.push({
        id,
        baseName: base.name,
        category: base.category,
        categoryLabel: CATEGORY_LABELS[base.category],
        displayName: `${base.name} - ${variant}`
      });
      id++;
    }
  }

  return pool;
}

export const CHARACTER_POOL = buildPool();
export const CATEGORIES = CATEGORY_LABELS;