/**
 * Route definitions for opening pages and variant pages.
 * Each entry maps a URL slug to an opening/variant nodeId
 * plus unique SEO metadata for SSG.
 */
export const HELP_ROUTE = {
  slug: "ayuda",
  title: "Ayuda de Navegación | Árbol de Aperturas de Ajedrez",
  description:
    "Consulta los atajos y controles del Árbol de Aperturas de Ajedrez para navegar nodos, expandir variantes y usar el tablero interactivo.",
};

export const OPENING_ROUTES = [
  {
    slug: "defensa-escandinava",
    nodeId: "scan-1",
    title: "Defensa Escandinava | Aperturas de Ajedrez",
    description:
      "Aprende la Defensa Escandinava (1.e4 d5): variantes principales, ideas estratégicas y líneas teóricas en un árbol interactivo con tablero animado.",
  },
  {
    slug: "ruy-lopez",
    nodeId: "span-4",
    title: "Ruy López (Apertura Española) | Aperturas de Ajedrez",
    description:
      "Explora la Ruy López o Apertura Española (1.e4 e5 2.Cf3 Cc6 3.Ab5): variantes, planes y líneas teóricas en un árbol interactivo con tablero animado.",
  },
  {
    slug: "apertura-italiana",
    nodeId: "ital-1",
    title: "Apertura Italiana | Aperturas de Ajedrez",
    description:
      "Descubre la Apertura Italiana (1.e4 e5 2.Cf3 Cc6 3.Ac4): variantes como el Giuoco Piano, Ataque Evans y más en un árbol interactivo.",
  },
  {
    slug: "defensa-siciliana",
    nodeId: "sic-1",
    title: "Defensa Siciliana | Aperturas de Ajedrez",
    description:
      "Domina la Defensa Siciliana (1.e4 c5): Najdorf, Dragón, Scheveningen y más variantes en un árbol interactivo con tablero animado.",
  },
  {
    slug: "defensa-francesa",
    nodeId: "fr-1",
    title: "Defensa Francesa | Aperturas de Ajedrez",
    description:
      "Estudia la Defensa Francesa (1.e4 e6): variante Winawer, clásica, Tarrasch y líneas principales en un árbol interactivo con tablero animado.",
  },
  {
    slug: "defensa-caro-kann",
    nodeId: "ck-1",
    title: "Defensa Caro-Kann | Aperturas de Ajedrez",
    description:
      "Analiza la Defensa Caro-Kann (1.e4 c6): variante del avance, clásica, Panov y más en un árbol interactivo con tablero animado.",
  },
  {
    slug: "defensa-pirc",
    nodeId: "pirc-1",
    title: "Defensa Pirc | Aperturas de Ajedrez",
    description:
      "Aprende la Defensa Pirc (1.e4 d6): sistema austriaco, variante clásica y líneas principales en un árbol interactivo con tablero animado.",
  },
  {
    slug: "defensa-alekhine",
    nodeId: "al-1",
    title: "Defensa Alekhine | Aperturas de Ajedrez",
    description:
      "Explora la Defensa Alekhine (1.e4 Cf6): variante de los cuatro peones, moderna y líneas principales en un árbol interactivo.",
  },
  {
    slug: "gambito-de-dama",
    nodeId: "qg-2",
    title: "Gambito de Dama | Aperturas de Ajedrez",
    description:
      "Domina el Gambito de Dama (1.d4 d5 2.c4): aceptado, rehusado, variante Tarrasch y líneas principales en un árbol interactivo.",
  },
  {
    slug: "sistema-londres",
    nodeId: "lon-2",
    title: "Sistema Londres | Aperturas de Ajedrez",
    description:
      "Estudia el Sistema Londres (1.d4 seguido de Af4): planes típicos, estructuras y variantes en un árbol interactivo con tablero animado.",
  },
  {
    slug: "defensa-india-de-rey",
    nodeId: "ki-3a",
    title: "Defensa India de Rey | Aperturas de Ajedrez",
    description:
      "Analiza la Defensa India de Rey (1.d4 Cf6 2.c4 g6): variante clásica, Sämisch, cuatro peones y más en un árbol interactivo.",
  },
  {
    slug: "defensa-nimzo-india",
    nodeId: "nim-3b",
    title: "Defensa Nimzo-India | Aperturas de Ajedrez",
    description:
      "Explora la Defensa Nimzo-India (1.d4 Cf6 2.c4 e6 3.Cc3 Ab4): variante Rubinstein, clásica y líneas principales en un árbol interactivo.",
  },
];

/**
 * Variant routes — each maps to a specific line within an opening.
 * parentNodeId is the opening panel button to highlight.
 * variantNodeId is the subtree root to display.
 */
export const VARIANT_ROUTES = [
  // ── Escandinava ──────────────────────────────────────────
  {
    slug: "defensa-escandinava/mieses-kotroc",
    variantNodeId: "scan-5a1",
    parentNodeId: "scan-1",
    title: "Variante Mieses-Kotroc | Escandinava | Aperturas de Ajedrez",
    description:
      "Aprende la variante Mieses-Kotroc de la Defensa Escandinava (1.e4 d5 2.exd5 Dxd5 3.Cc3 Dd6): líneas principales y planes estratégicos en un árbol interactivo.",
  },
  {
    slug: "defensa-escandinava/clasica",
    variantNodeId: "scan-5a2",
    parentNodeId: "scan-1",
    title: "Variante Clásica | Escandinava | Aperturas de Ajedrez",
    description:
      "Estudia la variante Clásica de la Escandinava (1.e4 d5 2.exd5 Dxd5 3.Cc3 Da5): la línea más tradicional con planes de flanco de dama.",
  },
  {
    slug: "defensa-escandinava/moderna",
    variantNodeId: "scan-3b",
    parentNodeId: "scan-1",
    title: "Variante Moderna | Escandinava | Aperturas de Ajedrez",
    description:
      "Explora la variante Moderna de la Escandinava (1.e4 d5 2.exd5 Cf6): recaptura con caballo evitando exponer la dama.",
  },
  {
    slug: "defensa-escandinava/gambito-islandes",
    variantNodeId: "scan-5b2",
    parentNodeId: "scan-1",
    title: "Gambito Islandés | Escandinava | Aperturas de Ajedrez",
    description:
      "Analiza el Gambito Islandés de la Escandinava (1.e4 d5 2.exd5 Cf6 3.d4 e6): sacrificio de peón por desarrollo rápido y actividad.",
  },

  // ── Ruy López ────────────────────────────────────────────
  {
    slug: "ruy-lopez/defensa-morphy",
    variantNodeId: "span-5a",
    parentNodeId: "span-4",
    title: "Defensa Morphy | Ruy López | Aperturas de Ajedrez",
    description:
      "Estudia la Defensa Morphy de la Ruy López (3...a6): la respuesta más popular, base de la variante cerrada y abierta.",
  },
  {
    slug: "ruy-lopez/cerrada",
    variantNodeId: "span-7a1",
    parentNodeId: "span-4",
    title: "Variante Cerrada | Ruy López | Aperturas de Ajedrez",
    description:
      "Explora la Variante Cerrada de la Ruy López (3...a6 4.Aa4 Cf6): la línea más sólida y posicional del ajedrez moderno.",
  },
  {
    slug: "ruy-lopez/abierta",
    variantNodeId: "span-9a1b",
    parentNodeId: "span-4",
    title: "Variante Abierta | Ruy López | Aperturas de Ajedrez",
    description:
      "Analiza la Variante Abierta de la Ruy López (5...b5): línea activa y táctica con juego abierto en el centro.",
  },
  {
    slug: "ruy-lopez/variante-cambio",
    variantNodeId: "span-6ae",
    parentNodeId: "span-4",
    title: "Variante de Cambio | Ruy López | Aperturas de Ajedrez",
    description:
      "Domina la Variante de Cambio de la Ruy López (4.Axc6 dxc6): dobla los peones negros buscando ventaja en el final.",
  },
  {
    slug: "ruy-lopez/defensa-berlin",
    variantNodeId: "span-5b",
    parentNodeId: "span-4",
    title: "Defensa Berlín | Ruy López | Aperturas de Ajedrez",
    description:
      "Aprende la Defensa Berlín (3...Cf6): el arma del empate utilizada por Kramnik, con el famoso final de Berlín.",
  },
  {
    slug: "ruy-lopez/gambito-schliemann",
    variantNodeId: "span-5c",
    parentNodeId: "span-4",
    title: "Gambito Schliemann | Ruy López | Aperturas de Ajedrez",
    description:
      "Explora el Gambito Schliemann (3...f5): la respuesta más agresiva e irregular contra la Ruy López.",
  },

  // ── Italiana ─────────────────────────────────────────────
  {
    slug: "apertura-italiana/giuoco-piano",
    variantNodeId: "ital-2a",
    parentNodeId: "ital-1",
    title: "Giuoco Piano | Apertura Italiana | Aperturas de Ajedrez",
    description:
      "Estudia el Giuoco Piano (3...Ac5): el juego tranquilo de la Italiana con planes de c3 y d4 para dominar el centro.",
  },
  {
    slug: "apertura-italiana/dos-caballos",
    variantNodeId: "ital-2b",
    parentNodeId: "ital-1",
    title: "Defensa de los Dos Caballos | Italiana | Aperturas de Ajedrez",
    description:
      "Analiza la Defensa de los Dos Caballos (3...Cf6): respuesta agresiva que ignora la amenaza a f7, incluyendo el Fried Liver.",
  },
  {
    slug: "apertura-italiana/fried-liver",
    variantNodeId: "ital-6b2",
    parentNodeId: "ital-1",
    title: "Ataque Fried Liver | Italiana | Aperturas de Ajedrez",
    description:
      "Domina el Ataque Fried Liver (Cxf7): el famoso sacrificio de caballo en la Italiana, una de las celadas más conocidas del ajedrez.",
  },

  // ── Siciliana ────────────────────────────────────────────
  {
    slug: "defensa-siciliana/najdorf",
    variantNodeId: "sic-9a1",
    parentNodeId: "sic-1",
    title: "Variante Najdorf | Siciliana | Aperturas de Ajedrez",
    description:
      "Domina la Variante Najdorf de la Siciliana (5...a6): la línea más jugada del mundo con el Ataque Inglés y Fischer.",
  },
  {
    slug: "defensa-siciliana/dragon",
    variantNodeId: "sic-9a2",
    parentNodeId: "sic-1",
    title: "Variante del Dragón | Siciliana | Aperturas de Ajedrez",
    description:
      "Explora la Variante del Dragón (5...g6): fianchetto agresivo con el Ataque Yugoslavo, una de las líneas más agudas del ajedrez.",
  },
  {
    slug: "defensa-siciliana/scheveningen",
    variantNodeId: "sic-9a3",
    parentNodeId: "sic-1",
    title: "Variante Scheveningen | Siciliana | Aperturas de Ajedrez",
    description:
      "Estudia la Variante Scheveningen (5...e6): estructura flexible e6+d6 con el Ataque Keres y la línea clásica.",
  },
  {
    slug: "defensa-siciliana/clasica",
    variantNodeId: "sic-7b1",
    parentNodeId: "sic-1",
    title: "Variante Clásica | Siciliana | Aperturas de Ajedrez",
    description:
      "Analiza la Variante Clásica de la Siciliana (2...Cc6 seguido de Cf6): incluye la Sveshnikov y líneas con d6.",
  },
  {
    slug: "defensa-siciliana/sveshnikov",
    variantNodeId: "sic-9b1b",
    parentNodeId: "sic-1",
    title: "Variante Sveshnikov | Siciliana | Aperturas de Ajedrez",
    description:
      "Domina la Variante Sveshnikov de la Siciliana (5...e5): línea agresiva que debilita d5 a cambio de juego activo.",
  },
  {
    slug: "defensa-siciliana/taimanov",
    variantNodeId: "sic-7b2",
    parentNodeId: "sic-1",
    title: "Variante Taimanov | Siciliana | Aperturas de Ajedrez",
    description:
      "Explora la Variante Taimanov de la Siciliana (2...Cc6 seguido de e6): flexible y sólida, favorita de Kasparov.",
  },
  {
    slug: "defensa-siciliana/kan",
    variantNodeId: "sic-7c1",
    parentNodeId: "sic-1",
    title: "Variante Kan | Siciliana | Aperturas de Ajedrez",
    description:
      "Estudia la Variante Kan de la Siciliana (2...e6 seguido de a6): sistema muy flexible con múltiples transposiciones.",
  },
  {
    slug: "defensa-siciliana/cerrada",
    variantNodeId: "sic-2b",
    parentNodeId: "sic-1",
    title: "Siciliana Cerrada | Aperturas de Ajedrez",
    description:
      "Analiza la Siciliana Cerrada (2.Cc3): sistema posicional que evita la apertura del centro, con fianchetto y juego tranquilo.",
  },

  // ── Francesa ─────────────────────────────────────────────
  {
    slug: "defensa-francesa/variante-avance",
    variantNodeId: "fr-4a",
    parentNodeId: "fr-1",
    title: "Variante del Avance | Francesa | Aperturas de Ajedrez",
    description:
      "Aprende la Variante del Avance de la Francesa (3.e5): gana espacio y cierra el centro, con planes de c5 para las negras.",
  },
  {
    slug: "defensa-francesa/variante-cambio",
    variantNodeId: "fr-4b",
    parentNodeId: "fr-1",
    title: "Variante del Cambio | Francesa | Aperturas de Ajedrez",
    description:
      "Estudia la Variante del Cambio de la Francesa (3.exd5 exd5): simplifica el centro buscando posiciones igualadas.",
  },
  {
    slug: "defensa-francesa/winawer",
    variantNodeId: "fr-5c1",
    parentNodeId: "fr-1",
    title: "Variante Winawer | Francesa | Aperturas de Ajedrez",
    description:
      "Explora la Variante Winawer de la Francesa (3.Cc3 Ab4): clava el caballo creando tensión, la línea más aguda de la Francesa.",
  },
  {
    slug: "defensa-francesa/clasica",
    variantNodeId: "fr-5c2",
    parentNodeId: "fr-1",
    title: "Variante Clásica | Francesa | Aperturas de Ajedrez",
    description:
      "Analiza la Variante Clásica de la Francesa (3.Cc3 Cf6): desarrollo normal con planes de obtener contrajuego con c5.",
  },
  {
    slug: "defensa-francesa/tarrasch",
    variantNodeId: "fr-4d",
    parentNodeId: "fr-1",
    title: "Variante Tarrasch | Francesa | Aperturas de Ajedrez",
    description:
      "Domina la Variante Tarrasch de la Francesa (3.Cd2): evita la clavada Ab4, con líneas abiertas y cerradas.",
  },

  // ── Caro-Kann ────────────────────────────────────────────
  {
    slug: "defensa-caro-kann/clasica",
    variantNodeId: "ck-4a",
    parentNodeId: "ck-1",
    title: "Variante Clásica | Caro-Kann | Aperturas de Ajedrez",
    description:
      "Estudia la Variante Clásica de la Caro-Kann (3.Cc3 dxe4 4.Cxe4 Af5): el alfil se activa tempranamente, línea muy sólida.",
  },
  {
    slug: "defensa-caro-kann/variante-avance",
    variantNodeId: "ck-4b",
    parentNodeId: "ck-1",
    title: "Variante del Avance | Caro-Kann | Aperturas de Ajedrez",
    description:
      "Analiza la Variante del Avance de la Caro-Kann (3.e5): gana espacio restringiendo las piezas negras, con Af5 como respuesta típica.",
  },
  {
    slug: "defensa-caro-kann/variante-cambio",
    variantNodeId: "ck-4c",
    parentNodeId: "ck-1",
    title: "Variante del Cambio | Caro-Kann | Aperturas de Ajedrez",
    description:
      "Explora la Variante del Cambio de la Caro-Kann (3.exd5 cxd5): simplifica el centro, posición simétrica y posicional.",
  },
  {
    slug: "defensa-caro-kann/variante-fantasia",
    variantNodeId: "ck-4d",
    parentNodeId: "ck-1",
    title: "Variante Fantasía | Caro-Kann | Aperturas de Ajedrez",
    description:
      "Domina la Variante Fantasía de la Caro-Kann (3.f3): agresiva, busca un centro masivo de peones con e4 y d4.",
  },

  // ── Pirc ─────────────────────────────────────────────────
  {
    slug: "defensa-pirc/ataque-austriaco",
    variantNodeId: "pirc-6a",
    parentNodeId: "pirc-1",
    title: "Ataque Austriaco | Pirc | Aperturas de Ajedrez",
    description:
      "Aprende el Ataque Austriaco contra la Pirc (4.f4): la continuación más agresiva, buscando el avance f5.",
  },
  {
    slug: "defensa-pirc/sistema-clasico",
    variantNodeId: "pirc-6b",
    parentNodeId: "pirc-1",
    title: "Sistema Clásico | Pirc | Aperturas de Ajedrez",
    description:
      "Estudia el Sistema Clásico de la Pirc (4.Cf3): desarrollo tranquilo y sólido con planes posicionales.",
  },
  {
    slug: "defensa-pirc/ataque-150",
    variantNodeId: "pirc-6c",
    parentNodeId: "pirc-1",
    title: "Ataque 150 | Pirc | Aperturas de Ajedrez",
    description:
      "Explora el Ataque 150 contra la Pirc (4.Ae3 seguido de Dd2 y O-O-O): enroques opuestos con ataque directo al rey.",
  },

  // ── Alekhine ─────────────────────────────────────────────
  {
    slug: "defensa-alekhine/variante-moderna",
    variantNodeId: "al-6a",
    parentNodeId: "al-1",
    title: "Variante Moderna | Alekhine | Aperturas de Ajedrez",
    description:
      "Analiza la Variante Moderna de la Alekhine (4.Cf3): desarrollo sólido con dxe5 y juego posicional.",
  },
  {
    slug: "defensa-alekhine/variante-cambio",
    variantNodeId: "al-6b",
    parentNodeId: "al-1",
    title: "Variante del Cambio | Alekhine | Aperturas de Ajedrez",
    description:
      "Estudia la Variante del Cambio de la Alekhine (4.c4): ataca el caballo en d5, buscando ventaja de espacio.",
  },
  {
    slug: "defensa-alekhine/cuatro-peones",
    variantNodeId: "al-6c",
    parentNodeId: "al-1",
    title: "Variante de los Cuatro Peones | Alekhine | Aperturas de Ajedrez",
    description:
      "Domina la Variante de los Cuatro Peones de la Alekhine (4.f4): la más agresiva, cadena de peones masiva en el centro.",
  },

  // ── Gambito de Dama ──────────────────────────────────────
  {
    slug: "gambito-de-dama/aceptado",
    variantNodeId: "qg-3a",
    parentNodeId: "qg-2",
    title: "Gambito de Dama Aceptado | Aperturas de Ajedrez",
    description:
      "Aprende el Gambito de Dama Aceptado (2...dxc4): acepta el peón, las blancas recuperan con desarrollo activo.",
  },
  {
    slug: "gambito-de-dama/declinado",
    variantNodeId: "qg-3b",
    parentNodeId: "qg-2",
    title: "Gambito de Dama Declinado | Aperturas de Ajedrez",
    description:
      "Estudia el Gambito de Dama Declinado (2...e6): mantiene el centro sólido con la Ortodoxa y Cambridge Springs.",
  },
  {
    slug: "gambito-de-dama/defensa-eslava",
    variantNodeId: "qg-3c",
    parentNodeId: "qg-2",
    title: "Defensa Eslava | Gambito de Dama | Aperturas de Ajedrez",
    description:
      "Explora la Defensa Eslava (2...c6): refuerza d5 sin bloquear el alfil de dama, con la Semi-Eslava y la Eslava Aceptada.",
  },

  // ── Londres ──────────────────────────────────────────────
  {
    slug: "sistema-londres/clasico",
    variantNodeId: "lon-7a",
    parentNodeId: "lon-2",
    title: "Londres Clásico | Sistema Londres | Aperturas de Ajedrez",
    description:
      "Analiza el Sistema Londres Clásico (Ae7, enroque corto): estructura sólida y juego posicional en el centro.",
  },
  {
    slug: "sistema-londres/contra-c5",
    variantNodeId: "lon-7b",
    parentNodeId: "lon-2",
    title: "Londres vs c5 | Sistema Londres | Aperturas de Ajedrez",
    description:
      "Estudia la respuesta c5 contra el Sistema Londres: las negras desafían el centro inmediatamente buscando juego activo.",
  },

  // ── India de Rey ─────────────────────────────────────────
  {
    slug: "defensa-india-de-rey/clasica",
    variantNodeId: "ki-10a1",
    parentNodeId: "ki-3a",
    title: "Variante Clásica | India de Rey | Aperturas de Ajedrez",
    description:
      "Domina la Variante Clásica de la India de Rey (Ae2, O-O): la línea más popular con e5, d5 y ataque en el flanco de rey.",
  },
  {
    slug: "defensa-india-de-rey/samisch",
    variantNodeId: "ki-8a2",
    parentNodeId: "ki-3a",
    title: "Variante Sämisch | India de Rey | Aperturas de Ajedrez",
    description:
      "Explora la Variante Sämisch de la India de Rey (f3): agresiva, prepara Ae3 y el avance g4 en el flanco de rey.",
  },

  // ── Nimzo-India ──────────────────────────────────────────
  {
    slug: "defensa-nimzo-india/clasica",
    variantNodeId: "nim-6b1",
    parentNodeId: "nim-3b",
    title: "Variante Clásica | Nimzo-India | Aperturas de Ajedrez",
    description:
      "Analiza la Variante Clásica de la Nimzo-India (4.Dc2): evita doblar peones y presiona la columna c.",
  },
  {
    slug: "defensa-nimzo-india/rubinstein",
    variantNodeId: "nim-6b2",
    parentNodeId: "nim-3b",
    title: "Variante Rubinstein | Nimzo-India | Aperturas de Ajedrez",
    description:
      "Estudia la Variante Rubinstein de la Nimzo-India (4.e3): sólida y clásica, consolida el centro con Ad3 y Cf3.",
  },
];

/** Map from slug → opening route */
export const ROUTE_BY_SLUG = Object.fromEntries(
  OPENING_ROUTES.map((r) => [r.slug, r]),
);

/** Map from nodeId → opening route */
export const ROUTE_BY_NODE_ID = Object.fromEntries(
  OPENING_ROUTES.map((r) => [r.nodeId, r]),
);

/** Map from slug → variant route */
export const VARIANT_ROUTE_BY_SLUG = Object.fromEntries(
  VARIANT_ROUTES.map((r) => [r.slug, r]),
);
