/**
 * Route definitions for opening pages.
 * Each entry maps a URL slug to an opening nodeId (from PANEL_OPENINGS)
 * plus unique SEO metadata for SSG.
 */
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

/** Map from slug → route object */
export const ROUTE_BY_SLUG = Object.fromEntries(
  OPENING_ROUTES.map((r) => [r.slug, r]),
);

/** Map from nodeId → route object */
export const ROUTE_BY_NODE_ID = Object.fromEntries(
  OPENING_ROUTES.map((r) => [r.nodeId, r]),
);
