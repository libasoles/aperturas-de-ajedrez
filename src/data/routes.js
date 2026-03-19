/**
 * Route definitions for opening pages and variant pages.
 * Each entry maps a URL slug to an opening/variant nodeId
 * plus unique SEO metadata for SSG.
 */
export const HELP_ROUTE = {
  slug: "ayuda",
  slugEn: "help",
  title: "Ayuda de Navegación | Árbol de Aperturas de Ajedrez",
  titleEn: "Navigation Help | Chess Opening Tree",
  description:
    "Consulta los atajos y controles del Árbol de Aperturas de Ajedrez para navegar nodos, expandir variantes y usar el tablero interactivo.",
  descriptionEn:
    "Check the keyboard shortcuts and controls of the Chess Opening Tree to navigate nodes, expand variations, and use the interactive board.",
};

export const OPENING_ROUTES = [
  {
    slug: "defensa-escandinava",
    slugEn: "scandinavian-defense",
    nodeId: "scan-1",
    title: "Defensa Escandinava | Aperturas de Ajedrez",
    titleEn: "Scandinavian Defense | Chess Openings",
    description:
      "Aprende la Defensa Escandinava (1.e4 d5): variantes principales, ideas estratégicas y líneas teóricas en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Learn the Scandinavian Defense (1.e4 d5): main variations, strategic ideas, and theoretical lines in an interactive tree with animated board.",
  },
  {
    slug: "ruy-lopez",
    slugEn: "ruy-lopez",
    nodeId: "span-4",
    title: "Ruy López (Apertura Española) | Aperturas de Ajedrez",
    titleEn: "Ruy López (Spanish Opening) | Chess Openings",
    description:
      "Explora la Ruy López o Apertura Española (1.e4 e5 2.Cf3 Cc6 3.Ab5): variantes, planes y líneas teóricas en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Explore the Ruy López or Spanish Opening (1.e4 e5 2.Nf3 Nc6 3.Bb5): variations, plans, and theoretical lines in an interactive tree with animated board.",
  },
  {
    slug: "apertura-italiana",
    slugEn: "italian-game",
    nodeId: "ital-1",
    title: "Apertura Italiana | Aperturas de Ajedrez",
    titleEn: "Italian Game | Chess Openings",
    description:
      "Descubre la Apertura Italiana (1.e4 e5 2.Cf3 Cc6 3.Ac4): variantes como el Giuoco Piano, Ataque Evans y más en un árbol interactivo.",
    descriptionEn:
      "Discover the Italian Game (1.e4 e5 2.Nf3 Nc6 3.Bc4): variations like Giuoco Piano, Fried Liver, Two Knights, and more in an interactive tree.",
  },
  {
    slug: "defensa-siciliana",
    slugEn: "sicilian-defense",
    nodeId: "sic-1",
    title: "Defensa Siciliana | Aperturas de Ajedrez",
    titleEn: "Sicilian Defense | Chess Openings",
    description:
      "Domina la Defensa Siciliana (1.e4 c5): Najdorf, Dragón, Scheveningen y más variantes en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Master the Sicilian Defense (1.e4 c5): Najdorf, Dragon, Scheveningen, and more variations in an interactive tree with animated board.",
  },
  {
    slug: "defensa-francesa",
    slugEn: "french-defense",
    nodeId: "fr-1",
    title: "Defensa Francesa | Aperturas de Ajedrez",
    titleEn: "French Defense | Chess Openings",
    description:
      "Estudia la Defensa Francesa (1.e4 e6): variante Winawer, clásica, Tarrasch y líneas principales en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Study the French Defense (1.e4 e6): Winawer, Classical, Tarrasch, and main lines in an interactive tree with animated board.",
  },
  {
    slug: "defensa-caro-kann",
    slugEn: "caro-kann-defense",
    nodeId: "ck-1",
    title: "Defensa Caro-Kann | Aperturas de Ajedrez",
    titleEn: "Caro-Kann Defense | Chess Openings",
    description:
      "Analiza la Defensa Caro-Kann (1.e4 c6): variante del avance, clásica, Panov y más en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Analyze the Caro-Kann Defense (1.e4 c6): Advance, Classical, Fantasy, and more variations in an interactive tree with animated board.",
  },
  {
    slug: "defensa-pirc",
    slugEn: "pirc-defense",
    nodeId: "pirc-1",
    title: "Defensa Pirc | Aperturas de Ajedrez",
    titleEn: "Pirc Defense | Chess Openings",
    description:
      "Aprende la Defensa Pirc (1.e4 d6): sistema austriaco, variante clásica y líneas principales en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Learn the Pirc Defense (1.e4 d6): Austrian Attack, Classical System, and main lines in an interactive tree with animated board.",
  },
  {
    slug: "defensa-alekhine",
    slugEn: "alekhine-defense",
    nodeId: "al-1",
    title: "Defensa Alekhine | Aperturas de Ajedrez",
    titleEn: "Alekhine's Defense | Chess Openings",
    description:
      "Explora la Defensa Alekhine (1.e4 Cf6): variante de los cuatro peones, moderna y líneas principales en un árbol interactivo.",
    descriptionEn:
      "Explore Alekhine's Defense (1.e4 Nf6): Four Pawns Attack, Modern Variation, and main lines in an interactive tree.",
  },
  {
    slug: "gambito-de-dama",
    slugEn: "queens-gambit",
    nodeId: "qg-2",
    title: "Gambito de Dama | Aperturas de Ajedrez",
    titleEn: "Queen's Gambit | Chess Openings",
    description:
      "Domina el Gambito de Dama (1.d4 d5 2.c4): aceptado, rehusado, variante Tarrasch y líneas principales en un árbol interactivo.",
    descriptionEn:
      "Master the Queen's Gambit (1.d4 d5 2.c4): Accepted, Declined, Slav Defense, and main lines in an interactive tree.",
  },
  {
    slug: "sistema-londres",
    slugEn: "london-system",
    nodeId: "lon-2",
    title: "Sistema Londres | Aperturas de Ajedrez",
    titleEn: "London System | Chess Openings",
    description:
      "Estudia el Sistema Londres (1.d4 seguido de Af4): planes típicos, estructuras y variantes en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Study the London System (1.d4 followed by Bf4): typical plans, structures, and variations in an interactive tree with animated board.",
  },
  {
    slug: "defensa-india-de-rey",
    slugEn: "kings-indian-defense",
    nodeId: "ki-3a",
    title: "Defensa India de Rey | Aperturas de Ajedrez",
    titleEn: "King's Indian Defense | Chess Openings",
    description:
      "Analiza la Defensa India de Rey (1.d4 Cf6 2.c4 g6): variante clásica, Sämisch, cuatro peones y más en un árbol interactivo.",
    descriptionEn:
      "Analyze the King's Indian Defense (1.d4 Nf6 2.c4 g6): Classical, Sämisch, Four Pawns, and more in an interactive tree.",
  },
  {
    slug: "defensa-nimzo-india",
    slugEn: "nimzo-indian-defense",
    nodeId: "nim-3b",
    title: "Defensa Nimzo-India | Aperturas de Ajedrez",
    titleEn: "Nimzo-Indian Defense | Chess Openings",
    description:
      "Explora la Defensa Nimzo-India (1.d4 Cf6 2.c4 e6 3.Cc3 Ab4): variante Rubinstein, clásica y líneas principales en un árbol interactivo.",
    descriptionEn:
      "Explore the Nimzo-Indian Defense (1.d4 Nf6 2.c4 e6 3.Nc3 Bb4): Rubinstein, Classical, and main lines in an interactive tree.",
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
    slugEn: "scandinavian-defense/mieses-kotroc",
    variantNodeId: "scan-5a1",
    parentNodeId: "scan-1",
    title: "Variante Mieses-Kotroc | Escandinava | Aperturas de Ajedrez",
    titleEn: "Mieses-Kotroc Variation | Scandinavian | Chess Openings",
    description:
      "Aprende la variante Mieses-Kotroc de la Defensa Escandinava (1.e4 d5 2.exd5 Dxd5 3.Cc3 Dd6): líneas principales y planes estratégicos en un árbol interactivo.",
    descriptionEn:
      "Learn the Mieses-Kotroc variation of the Scandinavian Defense (1.e4 d5 2.exd5 Qxd5 3.Nc3 Qd6): main lines and strategic plans in an interactive tree.",
  },
  {
    slug: "defensa-escandinava/clasica",
    slugEn: "scandinavian-defense/classical",
    variantNodeId: "scan-5a2",
    parentNodeId: "scan-1",
    title: "Variante Clásica | Escandinava | Aperturas de Ajedrez",
    titleEn: "Classical Variation | Scandinavian | Chess Openings",
    description:
      "Estudia la variante Clásica de la Escandinava (1.e4 d5 2.exd5 Dxd5 3.Cc3 Da5): la línea más tradicional con planes de flanco de dama.",
    descriptionEn:
      "Study the Classical variation of the Scandinavian (1.e4 d5 2.exd5 Qxd5 3.Nc3 Qa5): the most traditional line with queenside plans.",
  },
  {
    slug: "defensa-escandinava/moderna",
    slugEn: "scandinavian-defense/modern",
    variantNodeId: "scan-3b",
    parentNodeId: "scan-1",
    title: "Variante Moderna | Escandinava | Aperturas de Ajedrez",
    titleEn: "Modern Variation | Scandinavian | Chess Openings",
    description:
      "Explora la variante Moderna de la Escandinava (1.e4 d5 2.exd5 Cf6): recaptura con caballo evitando exponer la dama.",
    descriptionEn:
      "Explore the Modern variation of the Scandinavian (1.e4 d5 2.exd5 Nf6): knight recapture avoiding early queen exposure.",
  },
  {
    slug: "defensa-escandinava/gambito-islandes",
    slugEn: "scandinavian-defense/icelandic-gambit",
    variantNodeId: "scan-5b2",
    parentNodeId: "scan-1",
    title: "Gambito Islandés | Escandinava | Aperturas de Ajedrez",
    titleEn: "Icelandic Gambit | Scandinavian | Chess Openings",
    description:
      "Analiza el Gambito Islandés de la Escandinava (1.e4 d5 2.exd5 Cf6 3.d4 e6): sacrificio de peón por desarrollo rápido y actividad.",
    descriptionEn:
      "Analyze the Icelandic Gambit of the Scandinavian (1.e4 d5 2.exd5 Nf6 3.d4 e6): pawn sacrifice for rapid development and activity.",
  },

  // ── Ruy López ────────────────────────────────────────────
  {
    slug: "ruy-lopez/defensa-morphy",
    slugEn: "ruy-lopez/morphy-defense",
    variantNodeId: "span-5a",
    parentNodeId: "span-4",
    title: "Defensa Morphy | Ruy López | Aperturas de Ajedrez",
    titleEn: "Morphy Defense | Ruy López | Chess Openings",
    description:
      "Estudia la Defensa Morphy de la Ruy López (3...a6): la respuesta más popular, base de la variante cerrada y abierta.",
    descriptionEn:
      "Study the Morphy Defense of the Ruy López (3...a6): the most popular response, basis of the Closed and Open variations.",
  },
  {
    slug: "ruy-lopez/cerrada",
    slugEn: "ruy-lopez/closed",
    variantNodeId: "span-7a1",
    parentNodeId: "span-4",
    title: "Variante Cerrada | Ruy López | Aperturas de Ajedrez",
    titleEn: "Closed Variation | Ruy López | Chess Openings",
    description:
      "Explora la Variante Cerrada de la Ruy López (3...a6 4.Aa4 Cf6): la línea más sólida y posicional del ajedrez moderno.",
    descriptionEn:
      "Explore the Closed Variation of the Ruy López (3...a6 4.Ba4 Nf6): the most solid and positional line in modern chess.",
  },
  {
    slug: "ruy-lopez/abierta",
    slugEn: "ruy-lopez/open",
    variantNodeId: "span-9a1b",
    parentNodeId: "span-4",
    title: "Variante Abierta | Ruy López | Aperturas de Ajedrez",
    titleEn: "Open Variation | Ruy López | Chess Openings",
    description:
      "Analiza la Variante Abierta de la Ruy López (5...b5): línea activa y táctica con juego abierto en el centro.",
    descriptionEn:
      "Analyze the Open Variation of the Ruy López (5...b5): active and tactical line with open center play.",
  },
  {
    slug: "ruy-lopez/variante-cambio",
    slugEn: "ruy-lopez/exchange-variation",
    variantNodeId: "span-6ae",
    parentNodeId: "span-4",
    title: "Variante de Cambio | Ruy López | Aperturas de Ajedrez",
    titleEn: "Exchange Variation | Ruy López | Chess Openings",
    description:
      "Domina la Variante de Cambio de la Ruy López (4.Axc6 dxc6): dobla los peones negros buscando ventaja en el final.",
    descriptionEn:
      "Master the Exchange Variation of the Ruy López (4.Bxc6 dxc6): doubles Black's pawns seeking endgame advantage.",
  },
  {
    slug: "ruy-lopez/defensa-berlin",
    slugEn: "ruy-lopez/berlin-defense",
    variantNodeId: "span-5b",
    parentNodeId: "span-4",
    title: "Defensa Berlín | Ruy López | Aperturas de Ajedrez",
    titleEn: "Berlin Defense | Ruy López | Chess Openings",
    description:
      "Aprende la Defensa Berlín (3...Cf6): el arma del empate utilizada por Kramnik, con el famoso final de Berlín.",
    descriptionEn:
      "Learn the Berlin Defense (3...Nf6): the drawing weapon used by Kramnik, featuring the famous Berlin Endgame.",
  },
  {
    slug: "ruy-lopez/gambito-schliemann",
    slugEn: "ruy-lopez/schliemann-gambit",
    variantNodeId: "span-5c",
    parentNodeId: "span-4",
    title: "Gambito Schliemann | Ruy López | Aperturas de Ajedrez",
    titleEn: "Schliemann Gambit | Ruy López | Chess Openings",
    description:
      "Explora el Gambito Schliemann (3...f5): la respuesta más agresiva e irregular contra la Ruy López.",
    descriptionEn:
      "Explore the Schliemann Gambit (3...f5): the most aggressive and irregular response against the Ruy López.",
  },

  // ── Italiana ─────────────────────────────────────────────
  {
    slug: "apertura-italiana/giuoco-piano",
    slugEn: "italian-game/giuoco-piano",
    variantNodeId: "ital-2a",
    parentNodeId: "ital-1",
    title: "Giuoco Piano | Apertura Italiana | Aperturas de Ajedrez",
    titleEn: "Giuoco Piano | Italian Game | Chess Openings",
    description:
      "Estudia el Giuoco Piano (3...Ac5): el juego tranquilo de la Italiana con planes de c3 y d4 para dominar el centro.",
    descriptionEn:
      "Study the Giuoco Piano (3...Bc5): the quiet game of the Italian with c3 and d4 plans to dominate the center.",
  },
  {
    slug: "apertura-italiana/dos-caballos",
    slugEn: "italian-game/two-knights",
    variantNodeId: "ital-2b",
    parentNodeId: "ital-1",
    title: "Defensa de los Dos Caballos | Italiana | Aperturas de Ajedrez",
    titleEn: "Two Knights Defense | Italian Game | Chess Openings",
    description:
      "Analiza la Defensa de los Dos Caballos (3...Cf6): respuesta agresiva que ignora la amenaza a f7, incluyendo el Fried Liver.",
    descriptionEn:
      "Analyze the Two Knights Defense (3...Nf6): aggressive response that ignores the f7 threat, including the Fried Liver Attack.",
  },
  {
    slug: "apertura-italiana/fried-liver",
    slugEn: "italian-game/fried-liver",
    variantNodeId: "ital-6b2",
    parentNodeId: "ital-1",
    title: "Ataque Fried Liver | Italiana | Aperturas de Ajedrez",
    titleEn: "Fried Liver Attack | Italian Game | Chess Openings",
    description:
      "Domina el Ataque Fried Liver (Cxf7): el famoso sacrificio de caballo en la Italiana, una de las celadas más conocidas del ajedrez.",
    descriptionEn:
      "Master the Fried Liver Attack (Nxf7): the famous knight sacrifice in the Italian Game, one of the most well-known traps in chess.",
  },

  // ── Siciliana ────────────────────────────────────────────
  {
    slug: "defensa-siciliana/najdorf",
    slugEn: "sicilian-defense/najdorf",
    variantNodeId: "sic-9a1",
    parentNodeId: "sic-1",
    title: "Variante Najdorf | Siciliana | Aperturas de Ajedrez",
    titleEn: "Najdorf Variation | Sicilian | Chess Openings",
    description:
      "Domina la Variante Najdorf de la Siciliana (5...a6): la línea más jugada del mundo con el Ataque Inglés y Fischer.",
    descriptionEn:
      "Master the Najdorf Variation of the Sicilian (5...a6): the most played line in the world, featuring the English Attack and Fischer.",
  },
  {
    slug: "defensa-siciliana/dragon",
    slugEn: "sicilian-defense/dragon",
    variantNodeId: "sic-9a2",
    parentNodeId: "sic-1",
    title: "Variante del Dragón | Siciliana | Aperturas de Ajedrez",
    titleEn: "Dragon Variation | Sicilian | Chess Openings",
    description:
      "Explora la Variante del Dragón (5...g6): fianchetto agresivo con el Ataque Yugoslavo, una de las líneas más agudas del ajedrez.",
    descriptionEn:
      "Explore the Dragon Variation (5...g6): aggressive fianchetto with the Yugoslav Attack, one of the sharpest lines in chess.",
  },
  {
    slug: "defensa-siciliana/scheveningen",
    slugEn: "sicilian-defense/scheveningen",
    variantNodeId: "sic-9a3",
    parentNodeId: "sic-1",
    title: "Variante Scheveningen | Siciliana | Aperturas de Ajedrez",
    titleEn: "Scheveningen Variation | Sicilian | Chess Openings",
    description:
      "Estudia la Variante Scheveningen (5...e6): estructura flexible e6+d6 con el Ataque Keres y la línea clásica.",
    descriptionEn:
      "Study the Scheveningen Variation (5...e6): flexible e6+d6 structure featuring the Keres Attack and Classical line.",
  },
  {
    slug: "defensa-siciliana/clasica",
    slugEn: "sicilian-defense/classical",
    variantNodeId: "sic-7b1",
    parentNodeId: "sic-1",
    title: "Variante Clásica | Siciliana | Aperturas de Ajedrez",
    titleEn: "Classical Variation | Sicilian | Chess Openings",
    description:
      "Analiza la Variante Clásica de la Siciliana (2...Cc6 seguido de Cf6): incluye la Sveshnikov y líneas con d6.",
    descriptionEn:
      "Analyze the Classical Variation of the Sicilian (2...Nc6 followed by Nf6): includes the Sveshnikov and lines with d6.",
  },
  {
    slug: "defensa-siciliana/sveshnikov",
    slugEn: "sicilian-defense/sveshnikov",
    variantNodeId: "sic-9b1b",
    parentNodeId: "sic-1",
    title: "Variante Sveshnikov | Siciliana | Aperturas de Ajedrez",
    titleEn: "Sveshnikov Variation | Sicilian | Chess Openings",
    description:
      "Domina la Variante Sveshnikov de la Siciliana (5...e5): línea agresiva que debilita d5 a cambio de juego activo.",
    descriptionEn:
      "Master the Sveshnikov Variation of the Sicilian (5...e5): aggressive line that weakens d5 in exchange for active play.",
  },
  {
    slug: "defensa-siciliana/taimanov",
    slugEn: "sicilian-defense/taimanov",
    variantNodeId: "sic-7b2",
    parentNodeId: "sic-1",
    title: "Variante Taimanov | Siciliana | Aperturas de Ajedrez",
    titleEn: "Taimanov Variation | Sicilian | Chess Openings",
    description:
      "Explora la Variante Taimanov de la Siciliana (2...Cc6 seguido de e6): flexible y sólida, favorita de Kasparov.",
    descriptionEn:
      "Explore the Taimanov Variation of the Sicilian (2...Nc6 followed by e6): flexible and solid, a Kasparov favorite.",
  },
  {
    slug: "defensa-siciliana/kan",
    slugEn: "sicilian-defense/kan",
    variantNodeId: "sic-7c1",
    parentNodeId: "sic-1",
    title: "Variante Kan | Siciliana | Aperturas de Ajedrez",
    titleEn: "Kan Variation | Sicilian | Chess Openings",
    description:
      "Estudia la Variante Kan de la Siciliana (2...e6 seguido de a6): sistema muy flexible con múltiples transposiciones.",
    descriptionEn:
      "Study the Kan Variation of the Sicilian (2...e6 followed by a6): very flexible system with multiple transpositions.",
  },
  {
    slug: "defensa-siciliana/cerrada",
    slugEn: "sicilian-defense/closed",
    variantNodeId: "sic-2b",
    parentNodeId: "sic-1",
    title: "Siciliana Cerrada | Aperturas de Ajedrez",
    titleEn: "Closed Sicilian | Chess Openings",
    description:
      "Analiza la Siciliana Cerrada (2.Cc3): sistema posicional que evita la apertura del centro, con fianchetto y juego tranquilo.",
    descriptionEn:
      "Analyze the Closed Sicilian (2.Nc3): positional system that avoids opening the center, with fianchetto and quiet play.",
  },

  // ── Francesa ─────────────────────────────────────────────
  {
    slug: "defensa-francesa/variante-avance",
    slugEn: "french-defense/advance-variation",
    variantNodeId: "fr-4a",
    parentNodeId: "fr-1",
    title: "Variante del Avance | Francesa | Aperturas de Ajedrez",
    titleEn: "Advance Variation | French Defense | Chess Openings",
    description:
      "Aprende la Variante del Avance de la Francesa (3.e5): gana espacio y cierra el centro, con planes de c5 para las negras.",
    descriptionEn:
      "Learn the Advance Variation of the French Defense (3.e5): gains space and closes the center, with c5 plans for Black.",
  },
  {
    slug: "defensa-francesa/variante-cambio",
    slugEn: "french-defense/exchange-variation",
    variantNodeId: "fr-4b",
    parentNodeId: "fr-1",
    title: "Variante del Cambio | Francesa | Aperturas de Ajedrez",
    titleEn: "Exchange Variation | French Defense | Chess Openings",
    description:
      "Estudia la Variante del Cambio de la Francesa (3.exd5 exd5): simplifica el centro buscando posiciones igualadas.",
    descriptionEn:
      "Study the Exchange Variation of the French Defense (3.exd5 exd5): simplifies the center seeking balanced positions.",
  },
  {
    slug: "defensa-francesa/winawer",
    slugEn: "french-defense/winawer",
    variantNodeId: "fr-5c1",
    parentNodeId: "fr-1",
    title: "Variante Winawer | Francesa | Aperturas de Ajedrez",
    titleEn: "Winawer Variation | French Defense | Chess Openings",
    description:
      "Explora la Variante Winawer de la Francesa (3.Cc3 Ab4): clava el caballo creando tensión, la línea más aguda de la Francesa.",
    descriptionEn:
      "Explore the Winawer Variation of the French Defense (3.Nc3 Bb4): pins the knight creating tension, the sharpest French line.",
  },
  {
    slug: "defensa-francesa/clasica",
    slugEn: "french-defense/classical",
    variantNodeId: "fr-5c2",
    parentNodeId: "fr-1",
    title: "Variante Clásica | Francesa | Aperturas de Ajedrez",
    titleEn: "Classical Variation | French Defense | Chess Openings",
    description:
      "Analiza la Variante Clásica de la Francesa (3.Cc3 Cf6): desarrollo normal con planes de obtener contrajuego con c5.",
    descriptionEn:
      "Analyze the Classical Variation of the French Defense (3.Nc3 Nf6): normal development with plans to generate counterplay with c5.",
  },
  {
    slug: "defensa-francesa/tarrasch",
    slugEn: "french-defense/tarrasch",
    variantNodeId: "fr-4d",
    parentNodeId: "fr-1",
    title: "Variante Tarrasch | Francesa | Aperturas de Ajedrez",
    titleEn: "Tarrasch Variation | French Defense | Chess Openings",
    description:
      "Domina la Variante Tarrasch de la Francesa (3.Cd2): evita la clavada Ab4, con líneas abiertas y cerradas.",
    descriptionEn:
      "Master the Tarrasch Variation of the French Defense (3.Nd2): avoids the Bb4 pin, with open and closed lines.",
  },

  // ── Caro-Kann ────────────────────────────────────────────
  {
    slug: "defensa-caro-kann/clasica",
    slugEn: "caro-kann-defense/classical",
    variantNodeId: "ck-4a",
    parentNodeId: "ck-1",
    title: "Variante Clásica | Caro-Kann | Aperturas de Ajedrez",
    titleEn: "Classical Variation | Caro-Kann | Chess Openings",
    description:
      "Estudia la Variante Clásica de la Caro-Kann (3.Cc3 dxe4 4.Cxe4 Af5): el alfil se activa tempranamente, línea muy sólida.",
    descriptionEn:
      "Study the Classical Variation of the Caro-Kann (3.Nc3 dxe4 4.Nxe4 Bf5): the bishop activates early, a very solid line.",
  },
  {
    slug: "defensa-caro-kann/variante-avance",
    slugEn: "caro-kann-defense/advance-variation",
    variantNodeId: "ck-4b",
    parentNodeId: "ck-1",
    title: "Variante del Avance | Caro-Kann | Aperturas de Ajedrez",
    titleEn: "Advance Variation | Caro-Kann | Chess Openings",
    description:
      "Analiza la Variante del Avance de la Caro-Kann (3.e5): gana espacio restringiendo las piezas negras, con Af5 como respuesta típica.",
    descriptionEn:
      "Analyze the Advance Variation of the Caro-Kann (3.e5): gains space restricting Black's pieces, with Bf5 as the typical response.",
  },
  {
    slug: "defensa-caro-kann/variante-cambio",
    slugEn: "caro-kann-defense/exchange-variation",
    variantNodeId: "ck-4c",
    parentNodeId: "ck-1",
    title: "Variante del Cambio | Caro-Kann | Aperturas de Ajedrez",
    titleEn: "Exchange Variation | Caro-Kann | Chess Openings",
    description:
      "Explora la Variante del Cambio de la Caro-Kann (3.exd5 cxd5): simplifica el centro, posición simétrica y posicional.",
    descriptionEn:
      "Explore the Exchange Variation of the Caro-Kann (3.exd5 cxd5): simplifies the center, symmetric and positional position.",
  },
  {
    slug: "defensa-caro-kann/variante-fantasia",
    slugEn: "caro-kann-defense/fantasy-variation",
    variantNodeId: "ck-4d",
    parentNodeId: "ck-1",
    title: "Variante Fantasía | Caro-Kann | Aperturas de Ajedrez",
    titleEn: "Fantasy Variation | Caro-Kann | Chess Openings",
    description:
      "Domina la Variante Fantasía de la Caro-Kann (3.f3): agresiva, busca un centro masivo de peones con e4 y d4.",
    descriptionEn:
      "Master the Fantasy Variation of the Caro-Kann (3.f3): aggressive, seeks a massive pawn center with e4 and d4.",
  },

  // ── Pirc ─────────────────────────────────────────────────
  {
    slug: "defensa-pirc/ataque-austriaco",
    slugEn: "pirc-defense/austrian-attack",
    variantNodeId: "pirc-6a",
    parentNodeId: "pirc-1",
    title: "Ataque Austriaco | Pirc | Aperturas de Ajedrez",
    titleEn: "Austrian Attack | Pirc Defense | Chess Openings",
    description:
      "Aprende el Ataque Austriaco contra la Pirc (4.f4): la continuación más agresiva, buscando el avance f5.",
    descriptionEn:
      "Learn the Austrian Attack against the Pirc (4.f4): the most aggressive continuation, seeking the f5 advance.",
  },
  {
    slug: "defensa-pirc/sistema-clasico",
    slugEn: "pirc-defense/classical-system",
    variantNodeId: "pirc-6b",
    parentNodeId: "pirc-1",
    title: "Sistema Clásico | Pirc | Aperturas de Ajedrez",
    titleEn: "Classical System | Pirc Defense | Chess Openings",
    description:
      "Estudia el Sistema Clásico de la Pirc (4.Cf3): desarrollo tranquilo y sólido con planes posicionales.",
    descriptionEn:
      "Study the Classical System of the Pirc (4.Nf3): quiet and solid development with positional plans.",
  },
  {
    slug: "defensa-pirc/ataque-150",
    slugEn: "pirc-defense/150-attack",
    variantNodeId: "pirc-6c",
    parentNodeId: "pirc-1",
    title: "Ataque 150 | Pirc | Aperturas de Ajedrez",
    titleEn: "150 Attack | Pirc Defense | Chess Openings",
    description:
      "Explora el Ataque 150 contra la Pirc (4.Ae3 seguido de Dd2 y O-O-O): enroques opuestos con ataque directo al rey.",
    descriptionEn:
      "Explore the 150 Attack against the Pirc (4.Be3 followed by Qd2 and O-O-O): opposite castling with direct king attack.",
  },

  // ── Alekhine ─────────────────────────────────────────────
  {
    slug: "defensa-alekhine/variante-moderna",
    slugEn: "alekhine-defense/modern-variation",
    variantNodeId: "al-6a",
    parentNodeId: "al-1",
    title: "Variante Moderna | Alekhine | Aperturas de Ajedrez",
    titleEn: "Modern Variation | Alekhine's Defense | Chess Openings",
    description:
      "Analiza la Variante Moderna de la Alekhine (4.Cf3): desarrollo sólido con dxe5 y juego posicional.",
    descriptionEn:
      "Analyze the Modern Variation of Alekhine's Defense (4.Nf3): solid development with dxe5 and positional play.",
  },
  {
    slug: "defensa-alekhine/variante-cambio",
    slugEn: "alekhine-defense/exchange-variation",
    variantNodeId: "al-6b",
    parentNodeId: "al-1",
    title: "Variante del Cambio | Alekhine | Aperturas de Ajedrez",
    titleEn: "Exchange Variation | Alekhine's Defense | Chess Openings",
    description:
      "Estudia la Variante del Cambio de la Alekhine (4.c4): ataca el caballo en d5, buscando ventaja de espacio.",
    descriptionEn:
      "Study the Exchange Variation of Alekhine's Defense (4.c4): attacks the knight on d5, seeking space advantage.",
  },
  {
    slug: "defensa-alekhine/cuatro-peones",
    slugEn: "alekhine-defense/four-pawns-attack",
    variantNodeId: "al-6c",
    parentNodeId: "al-1",
    title: "Variante de los Cuatro Peones | Alekhine | Aperturas de Ajedrez",
    titleEn: "Four Pawns Attack | Alekhine's Defense | Chess Openings",
    description:
      "Domina la Variante de los Cuatro Peones de la Alekhine (4.f4): la más agresiva, cadena de peones masiva en el centro.",
    descriptionEn:
      "Master the Four Pawns Attack of Alekhine's Defense (4.f4): the most aggressive, massive pawn chain in the center.",
  },

  // ── Gambito de Dama ──────────────────────────────────────
  {
    slug: "gambito-de-dama/aceptado",
    slugEn: "queens-gambit/accepted",
    variantNodeId: "qg-3a",
    parentNodeId: "qg-2",
    title: "Gambito de Dama Aceptado | Aperturas de Ajedrez",
    titleEn: "Queen's Gambit Accepted | Chess Openings",
    description:
      "Aprende el Gambito de Dama Aceptado (2...dxc4): acepta el peón, las blancas recuperan con desarrollo activo.",
    descriptionEn:
      "Learn the Queen's Gambit Accepted (2...dxc4): accepts the pawn, White recovers with active development.",
  },
  {
    slug: "gambito-de-dama/declinado",
    slugEn: "queens-gambit/declined",
    variantNodeId: "qg-3b",
    parentNodeId: "qg-2",
    title: "Gambito de Dama Declinado | Aperturas de Ajedrez",
    titleEn: "Queen's Gambit Declined | Chess Openings",
    description:
      "Estudia el Gambito de Dama Declinado (2...e6): mantiene el centro sólido con la Ortodoxa y Cambridge Springs.",
    descriptionEn:
      "Study the Queen's Gambit Declined (2...e6): maintains a solid center with the Orthodox and Cambridge Springs variations.",
  },
  {
    slug: "gambito-de-dama/defensa-eslava",
    slugEn: "queens-gambit/slav-defense",
    variantNodeId: "qg-3c",
    parentNodeId: "qg-2",
    title: "Defensa Eslava | Gambito de Dama | Aperturas de Ajedrez",
    titleEn: "Slav Defense | Queen's Gambit | Chess Openings",
    description:
      "Explora la Defensa Eslava (2...c6): refuerza d5 sin bloquear el alfil de dama, con la Semi-Eslava y la Eslava Aceptada.",
    descriptionEn:
      "Explore the Slav Defense (2...c6): reinforces d5 without blocking the queen's bishop, with the Semi-Slav and Accepted Slav.",
  },

  // ── Londres ──────────────────────────────────────────────
  {
    slug: "sistema-londres/clasico",
    slugEn: "london-system/classical",
    variantNodeId: "lon-7a",
    parentNodeId: "lon-2",
    title: "Londres Clásico | Sistema Londres | Aperturas de Ajedrez",
    titleEn: "Classical London | London System | Chess Openings",
    description:
      "Analiza el Sistema Londres Clásico (Ae7, enroque corto): estructura sólida y juego posicional en el centro.",
    descriptionEn:
      "Analyze the Classical London System (Be7, kingside castling): solid structure and positional play in the center.",
  },
  {
    slug: "sistema-londres/contra-c5",
    slugEn: "london-system/vs-c5",
    variantNodeId: "lon-7b",
    parentNodeId: "lon-2",
    title: "Londres vs c5 | Sistema Londres | Aperturas de Ajedrez",
    titleEn: "London vs c5 | London System | Chess Openings",
    description:
      "Estudia la respuesta c5 contra el Sistema Londres: las negras desafían el centro inmediatamente buscando juego activo.",
    descriptionEn:
      "Study the c5 response against the London System: Black immediately challenges the center seeking active play.",
  },

  // ── India de Rey ─────────────────────────────────────────
  {
    slug: "defensa-india-de-rey/clasica",
    slugEn: "kings-indian-defense/classical",
    variantNodeId: "ki-10a1",
    parentNodeId: "ki-3a",
    title: "Variante Clásica | India de Rey | Aperturas de Ajedrez",
    titleEn: "Classical Variation | King's Indian Defense | Chess Openings",
    description:
      "Domina la Variante Clásica de la India de Rey (Ae2, O-O): la línea más popular con e5, d5 y ataque en el flanco de rey.",
    descriptionEn:
      "Master the Classical Variation of the King's Indian Defense (Be2, O-O): the most popular line with e5, d5, and kingside attack.",
  },
  {
    slug: "defensa-india-de-rey/samisch",
    slugEn: "kings-indian-defense/samisch",
    variantNodeId: "ki-8a2",
    parentNodeId: "ki-3a",
    title: "Variante Sämisch | India de Rey | Aperturas de Ajedrez",
    titleEn: "Sämisch Variation | King's Indian Defense | Chess Openings",
    description:
      "Explora la Variante Sämisch de la India de Rey (f3): agresiva, prepara Ae3 y el avance g4 en el flanco de rey.",
    descriptionEn:
      "Explore the Sämisch Variation of the King's Indian Defense (f3): aggressive, prepares Be3 and the g4 advance on the kingside.",
  },

  // ── Nimzo-India ──────────────────────────────────────────
  {
    slug: "defensa-nimzo-india/clasica",
    slugEn: "nimzo-indian-defense/classical",
    variantNodeId: "nim-6b1",
    parentNodeId: "nim-3b",
    title: "Variante Clásica | Nimzo-India | Aperturas de Ajedrez",
    titleEn: "Classical Variation | Nimzo-Indian Defense | Chess Openings",
    description:
      "Analiza la Variante Clásica de la Nimzo-India (4.Dc2): evita doblar peones y presiona la columna c.",
    descriptionEn:
      "Analyze the Classical Variation of the Nimzo-Indian Defense (4.Qc2): avoids doubling pawns and pressures the c-file.",
  },
  {
    slug: "defensa-nimzo-india/rubinstein",
    slugEn: "nimzo-indian-defense/rubinstein",
    variantNodeId: "nim-6b2",
    parentNodeId: "nim-3b",
    title: "Variante Rubinstein | Nimzo-India | Aperturas de Ajedrez",
    titleEn: "Rubinstein Variation | Nimzo-Indian Defense | Chess Openings",
    description:
      "Estudia la Variante Rubinstein de la Nimzo-India (4.e3): sólida y clásica, consolida el centro con Ad3 y Cf3.",
    descriptionEn:
      "Study the Rubinstein Variation of the Nimzo-Indian Defense (4.e3): solid and classical, consolidates the center with Bd3 and Nf3.",
  },
];

/** Map from slug → opening route */
export const ROUTE_BY_SLUG = Object.fromEntries(
  OPENING_ROUTES.flatMap((r) => [
    [r.slug, r],
    [r.slugEn, r],
  ]),
);

/** Map from nodeId → opening route */
export const ROUTE_BY_NODE_ID = Object.fromEntries(
  OPENING_ROUTES.map((r) => [r.nodeId, r]),
);

/** Map from slug → variant route */
export const VARIANT_ROUTE_BY_SLUG = Object.fromEntries(
  VARIANT_ROUTES.flatMap((r) => [
    [r.slug, r],
    [r.slugEn, r],
  ]),
);
