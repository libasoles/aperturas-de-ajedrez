import {
  OPENING_ENTRY_BY_NODE_ID,
  VARIANT_ENTRY_BY_NODE_ID,
} from "./openingCatalog.js";

/**
 * Route definitions for opening pages and variant pages.
 * Each entry maps a URL slug to an opening/variant nodeId
 * plus unique SEO metadata for SSG.
 */
export const HELP_ROUTE = {
  slug: "ayuda",
  slugEn: "help",
  slugFr: "aide",
  title: "Ayuda de Navegación | Árbol de Aperturas de Ajedrez",
  titleEn: "Navigation Help | Chess Opening Tree",
  titleFr: "Aide à la Navigation | Arbre des Ouvertures d'Échecs",
  description:
    "Consulta los atajos y controles del Árbol de Aperturas de Ajedrez para navegar nodos, expandir variantes y usar el tablero interactivo.",
  descriptionEn:
    "Check the keyboard shortcuts and controls of the Chess Opening Tree to navigate nodes, expand variations, and use the interactive board.",
  descriptionFr:
    "Consultez les raccourcis clavier et les commandes de l'Arbre des Ouvertures d'Échecs pour naviguer, développer les variantes et utiliser l'échiquier interactif.",
};

const OPENING_ROUTE_DEFS = [
  {
    slug: "defensa-escandinava",
    slugEn: "scandinavian-defense",
    slugFr: "defense-scandinave",
    nodeId: "scan-1",
    title: "Defensa Escandinava | Aperturas de Ajedrez",
    titleEn: "Scandinavian Defense | Chess Openings",
    titleFr: "Défense Scandinave | Ouvertures d'Échecs",
    description:
      "Aprende la Defensa Escandinava (1.e4 d5): variantes principales, ideas estratégicas y líneas teóricas en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Learn the Scandinavian Defense (1.e4 d5): main variations, strategic ideas, and theoretical lines in an interactive tree with animated board.",
    descriptionFr:
      "Apprenez la Défense Scandinave (1.e4 d5) : variantes principales, idées stratégiques et lignes théoriques dans un arbre interactif avec échiquier animé.",
  },
  {
    slug: "ruy-lopez",
    slugEn: "ruy-lopez",
    slugFr: "ruy-lopez",
    nodeId: "span-4",
    title: "Ruy López (Apertura Española) | Aperturas de Ajedrez",
    titleEn: "Ruy López (Spanish Opening) | Chess Openings",
    titleFr: "Ruy López (Partie Espagnole) | Ouvertures d'Échecs",
    description:
      "Explora la Ruy López o Apertura Española (1.e4 e5 2.Cf3 Cc6 3.Ab5): variantes, planes y líneas teóricas en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Explore the Ruy López or Spanish Opening (1.e4 e5 2.Nf3 Nc6 3.Bb5): variations, plans, and theoretical lines in an interactive tree with animated board.",
    descriptionFr:
      "Explorez le Ruy López ou Partie Espagnole (1.e4 e5 2.Cf3 Cc6 3.Fb5) : variantes, plans et lignes théoriques dans un arbre interactif avec échiquier animé.",
  },
  {
    slug: "apertura-italiana",
    slugEn: "italian-game",
    slugFr: "partie-italienne",
    nodeId: "ital-1",
    title: "Apertura Italiana | Aperturas de Ajedrez",
    titleEn: "Italian Game | Chess Openings",
    titleFr: "Partie Italienne | Ouvertures d'Échecs",
    description:
      "Descubre la Apertura Italiana (1.e4 e5 2.Cf3 Cc6 3.Ac4): variantes como el Giuoco Piano, Ataque Evans y más en un árbol interactivo.",
    descriptionEn:
      "Discover the Italian Game (1.e4 e5 2.Nf3 Nc6 3.Bc4): variations like Giuoco Piano, Fried Liver, Two Knights, and more in an interactive tree.",
    descriptionFr:
      "Découvrez la Partie Italienne (1.e4 e5 2.Cf3 Cc6 3.Fc4) : variantes comme le Giuoco Piano, Fried Liver, Deux Cavaliers et plus dans un arbre interactif.",
  },
  {
    slug: "apertura-escocesa",
    slugEn: "scotch-game",
    slugFr: "partie-ecossaise",
    nodeId: "scot-1",
    title: "Apertura Escocesa | Aperturas de Ajedrez",
    titleEn: "Scotch Game | Chess Openings",
    titleFr: "Partie Ecossaise | Ouvertures d'Échecs",
    description:
      "Explora la Apertura Escocesa (1.e4 e5 2.Cf3 Cc6 3.d4): juego abierto, iniciativa central y líneas tácticas en un árbol interactivo.",
    descriptionEn:
      "Explore the Scotch Game (1.e4 e5 2.Nf3 Nc6 3.d4): open play, central initiative, and tactical lines in an interactive tree.",
    descriptionFr:
      "Explorez la Partie Ecossaise (1.e4 e5 2.Cf3 Cc6 3.d4) : jeu ouvert, initiative centrale et lignes tactiques dans un arbre interactif.",
  },
  {
    slug: "defensa-siciliana",
    slugEn: "sicilian-defense",
    slugFr: "defense-sicilienne",
    nodeId: "sic-1",
    title: "Defensa Siciliana | Aperturas de Ajedrez",
    titleEn: "Sicilian Defense | Chess Openings",
    titleFr: "Défense Sicilienne | Ouvertures d'Échecs",
    description:
      "Domina la Defensa Siciliana (1.e4 c5): Najdorf, Dragón, Scheveningen y más variantes en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Master the Sicilian Defense (1.e4 c5): Najdorf, Dragon, Scheveningen, and more variations in an interactive tree with animated board.",
    descriptionFr:
      "Maîtrisez la Défense Sicilienne (1.e4 c5) : Najdorf, Dragon, Scheveningen et plus de variantes dans un arbre interactif avec échiquier animé.",
  },
  {
    slug: "defensa-francesa",
    slugEn: "french-defense",
    slugFr: "defense-francaise",
    nodeId: "fr-1",
    title: "Defensa Francesa | Aperturas de Ajedrez",
    titleEn: "French Defense | Chess Openings",
    titleFr: "Défense Française | Ouvertures d'Échecs",
    description:
      "Estudia la Defensa Francesa (1.e4 e6): variante Winawer, clásica, Tarrasch y líneas principales en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Study the French Defense (1.e4 e6): Winawer, Classical, Tarrasch, and main lines in an interactive tree with animated board.",
    descriptionFr:
      "Étudiez la Défense Française (1.e4 e6) : variante Winawer, classique, Tarrasch et lignes principales dans un arbre interactif avec échiquier animé.",
  },
  {
    slug: "defensa-caro-kann",
    slugEn: "caro-kann-defense",
    slugFr: "defense-caro-kann",
    nodeId: "ck-1",
    title: "Defensa Caro-Kann | Aperturas de Ajedrez",
    titleEn: "Caro-Kann Defense | Chess Openings",
    titleFr: "Défense Caro-Kann | Ouvertures d'Échecs",
    description:
      "Analiza la Defensa Caro-Kann (1.e4 c6): variante del avance, clásica, Panov y más en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Analyze the Caro-Kann Defense (1.e4 c6): Advance, Classical, Fantasy, and more variations in an interactive tree with animated board.",
    descriptionFr:
      "Analysez la Défense Caro-Kann (1.e4 c6) : variante d'avance, classique, Fantaisie et plus dans un arbre interactif avec échiquier animé.",
  },
  {
    slug: "defensa-pirc",
    slugEn: "pirc-defense",
    slugFr: "defense-pirc",
    nodeId: "pirc-1",
    title: "Defensa Pirc | Aperturas de Ajedrez",
    titleEn: "Pirc Defense | Chess Openings",
    titleFr: "Défense Pirc | Ouvertures d'Échecs",
    description:
      "Aprende la Defensa Pirc (1.e4 d6): sistema austriaco, variante clásica y líneas principales en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Learn the Pirc Defense (1.e4 d6): Austrian Attack, Classical System, and main lines in an interactive tree with animated board.",
    descriptionFr:
      "Apprenez la Défense Pirc (1.e4 d6) : attaque autrichienne, système classique et lignes principales dans un arbre interactif avec échiquier animé.",
  },
  {
    slug: "defensa-alekhine",
    slugEn: "alekhine-defense",
    slugFr: "defense-alekhine",
    nodeId: "al-1",
    title: "Defensa Alekhine | Aperturas de Ajedrez",
    titleEn: "Alekhine's Defense | Chess Openings",
    titleFr: "Défense Alekhine | Ouvertures d'Échecs",
    description:
      "Explora la Defensa Alekhine (1.e4 Cf6): variante de los cuatro peones, moderna y líneas principales en un árbol interactivo.",
    descriptionEn:
      "Explore Alekhine's Defense (1.e4 Nf6): Four Pawns Attack, Modern Variation, and main lines in an interactive tree.",
    descriptionFr:
      "Explorez la Défense Alekhine (1.e4 Cf6) : attaque des quatre pions, variante moderne et lignes principales dans un arbre interactif.",
  },
  {
    slug: "defensa-moderna",
    slugEn: "modern-defense",
    slugFr: "defense-moderne",
    nodeId: "mod-1",
    title: "Defensa Moderna | Aperturas de Ajedrez",
    titleEn: "Modern Defense | Chess Openings",
    titleFr: "Défense Moderne | Ouvertures d'Échecs",
    description:
      "Domina la Defensa Moderna (1.e4 g6): enfoque hipermoderno con fianchetto en g7, variantes Ataque Austriaco y Clásica en un árbol interactivo.",
    descriptionEn:
      "Master the Modern Defense (1.e4 g6): hypermodern approach with g7 fianchetto, Austrian Attack and Classical variations in an interactive tree.",
    descriptionFr:
      "Maîtrisez la Défense Moderne (1.e4 g6) : approche hypermoderne avec fianchetto en g7, variantes Attaque Autrichienne et Classique dans un arbre interactif.",
  },
  {
    slug: "defensa-nimzowitsch",
    slugEn: "nimzowitsch-defense",
    slugFr: "defense-nimzowitsch",
    nodeId: "nw-1",
    title: "Defensa Nimzowitsch | Aperturas de Ajedrez",
    titleEn: "Nimzowitsch Defense | Chess Openings",
    titleFr: "Défense Nimzowitsch | Ouvertures d'Échecs",
    description:
      "Domina la Defensa Nimzowitsch (1.e4 Cc6): apertura hipermoderna donde las negras dejan que las blancas ocupen el centro para atacarlo con d5 o e5.",
    descriptionEn:
      "Master the Nimzowitsch Defense (1.e4 Nc6): a hypermodern opening where Black allows White to occupy the center and then attacks it with d5 or e5.",
    descriptionFr:
      "Maîtrisez la Défense Nimzowitsch (1.e4 Cc6) : une ouverture hypermoderne où les Noirs laissent les Blancs occuper le centre pour l'attaquer avec d5 ou e5.",
  },
  {
    slug: "gambito-de-dama",
    slugEn: "queens-gambit",
    slugFr: "gambit-dame",
    nodeId: "qg-2",
    title: "Gambito de Dama | Aperturas de Ajedrez",
    titleEn: "Queen's Gambit | Chess Openings",
    titleFr: "Gambit Dame | Ouvertures d'Échecs",
    description:
      "Domina el Gambito de Dama (1.d4 d5 2.c4): aceptado, rehusado, variante Tarrasch y líneas principales en un árbol interactivo.",
    descriptionEn:
      "Master the Queen's Gambit (1.d4 d5 2.c4): Accepted, Declined, Slav Defense, and main lines in an interactive tree.",
    descriptionFr:
      "Maîtrisez le Gambit Dame (1.d4 d5 2.c4) : accepté, refusé, défense slave et lignes principales dans un arbre interactif.",
  },
  {
    slug: "sistema-londres",
    slugEn: "london-system",
    slugFr: "systeme-londres",
    nodeId: "lon-2",
    title: "Sistema Londres | Aperturas de Ajedrez",
    titleEn: "London System | Chess Openings",
    titleFr: "Système Londres | Ouvertures d'Échecs",
    description:
      "Estudia el Sistema Londres (1.d4 seguido de Af4): planes típicos, estructuras y variantes en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Study the London System (1.d4 followed by Bf4): typical plans, structures, and variations in an interactive tree with animated board.",
    descriptionFr:
      "Étudiez le Système Londres (1.d4 suivi de Ff4) : plans typiques, structures et variantes dans un arbre interactif avec échiquier animé.",
  },
  {
    slug: "defensa-india-de-rey",
    slugEn: "kings-indian-defense",
    slugFr: "defense-indienne-roi",
    nodeId: "ki-3a",
    title: "Defensa India de Rey | Aperturas de Ajedrez",
    titleEn: "King's Indian Defense | Chess Openings",
    titleFr: "Défense Indienne du Roi | Ouvertures d'Échecs",
    description:
      "Analiza la Defensa India de Rey (1.d4 Cf6 2.c4 g6): variante clásica, Sämisch, cuatro peones y más en un árbol interactivo.",
    descriptionEn:
      "Analyze the King's Indian Defense (1.d4 Nf6 2.c4 g6): Classical, Sämisch, Four Pawns, and more in an interactive tree.",
    descriptionFr:
      "Analysez la Défense Indienne du Roi (1.d4 Cf6 2.c4 g6) : variante classique, Sämisch et plus dans un arbre interactif.",
  },
  {
    slug: "defensa-nimzo-india",
    slugEn: "nimzo-indian-defense",
    slugFr: "defense-nimzo-indienne",
    nodeId: "nim-3b",
    title: "Defensa Nimzo-India | Aperturas de Ajedrez",
    titleEn: "Nimzo-Indian Defense | Chess Openings",
    titleFr: "Défense Nimzo-Indienne | Ouvertures d'Échecs",
    description:
      "Explora la Defensa Nimzo-India (1.d4 Cf6 2.c4 e6 3.Cc3 Ab4): variante Rubinstein, clásica y líneas principales en un árbol interactivo.",
    descriptionEn:
      "Explore the Nimzo-Indian Defense (1.d4 Nf6 2.c4 e6 3.Nc3 Bb4): Rubinstein, Classical, and main lines in an interactive tree.",
    descriptionFr:
      "Explorez la Défense Nimzo-Indienne (1.d4 Cf6 2.c4 e6 3.Cc3 Fb4) : variante Rubinstein, classique et lignes principales dans un arbre interactif.",
  },
  {
    slug: "defensa-holandesa",
    slugEn: "dutch-defense",
    slugFr: "defense-hollandaise",
    nodeId: "dutch-1",
    title: "Defensa Holandesa | Aperturas de Ajedrez",
    titleEn: "Dutch Defense | Chess Openings",
    titleFr: "Défense Hollandaise | Ouvertures d'Échecs",
    description:
      "Domina la Defensa Holandesa (1.d4 f5): variantes Leningrado, Muro de Piedra y Clásica en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Master the Dutch Defense (1.d4 f5): Leningrad, Stonewall, and Classical variations in an interactive tree with animated board.",
    descriptionFr:
      "Maîtrisez la Défense Hollandaise (1.d4 f5) : variantes Leningrad, Mur de Pierre et Classique dans un arbre interactif avec échiquier animé.",
  },
  {
    slug: "defensa-eslava",
    slugEn: "slav-defense",
    slugFr: "defense-slave",
    nodeId: "qg-3c",
    title: "Defensa Eslava | Aperturas de Ajedrez",
    titleEn: "Slav Defense | Chess Openings",
    titleFr: "Défense Slave | Ouvertures d'Échecs",
    description:
      "Domina la Defensa Eslava (1.d4 d5 2.c4 c6): variante de cambio, línea clásica, eslava aceptada y semi-eslava en un árbol interactivo con tablero animado.",
    descriptionEn:
      "Master the Slav Defense (1.d4 d5 2.c4 c6): exchange variation, classical line, accepted slav and semi-slav in an interactive tree with animated board.",
    descriptionFr:
      "Maîtrisez la Défense Slave (1.d4 d5 2.c4 c6) : variante d'échange, ligne classique, slave acceptée et semi-slave dans un arbre interactif avec échiquier animé.",
  },
  // ── Apertura Zukertort ────────────────────────────────────
  {
    slug: "apertura-zukertort",
    slugEn: "zukertort-opening",
    slugFr: "ouverture-zukertort",
    nodeId: "nf3",
    title: "Apertura Zukertort | Aperturas de Ajedrez",
    titleEn: "Zukertort Opening | Chess Openings",
    titleFr: "Ouverture Zukertort | Ouvertures d'Échecs",
    description:
      "Aprende la Apertura Zukertort (1.Cf3 d5 2.b3): apertura hipermoderna que controla el centro desde la distancia con el fiancheto de dama y el alfil en b2.",
    descriptionEn:
      "Learn the Zukertort Opening (1.Nf3 d5 2.b3): a hypermodern opening that controls the center from a distance with the queenside fianchetto and bishop on b2.",
    descriptionFr:
      "Apprenez l'Ouverture Zukertort (1.Cf3 d5 2.b3) : une ouverture hypermoderne qui contrôle le centre de loin avec le fianchetto de dame et le fou en b2.",
  },
];

/**
 * Variant routes — each maps to a specific line within an opening.
 * parentNodeId is the opening panel button to highlight.
 * variantNodeId is the subtree root to display.
 */
const VARIANT_ROUTE_DEFS = [
  // ── Escandinava ──────────────────────────────────────────
  {
    slug: "defensa-escandinava/mieses-kotroc",
    slugEn: "scandinavian-defense/mieses-kotroc",
    slugFr: "defense-scandinave/mieses-kotroc",
    variantNodeId: "scan-5a1",
    parentNodeId: "scan-1",
    title: "Variante Mieses-Kotroc | Escandinava | Aperturas de Ajedrez",
    titleEn: "Mieses-Kotroc Variation | Scandinavian | Chess Openings",
    titleFr: "Variante Mieses-Kotroc | Scandinave | Ouvertures d'Échecs",
    description:
      "Aprende la variante Mieses-Kotroc de la Defensa Escandinava (1.e4 d5 2.exd5 Dxd5 3.Cc3 Dd6): líneas principales y planes estratégicos en un árbol interactivo.",
    descriptionEn:
      "Learn the Mieses-Kotroc variation of the Scandinavian Defense (1.e4 d5 2.exd5 Qxd5 3.Nc3 Qd6): main lines and strategic plans in an interactive tree.",
    descriptionFr:
      "Apprenez la variante Mieses-Kotroc de la Défense Scandinave (1.e4 d5 2.exd5 Dxd5 3.Cc3 Dd6) : lignes principales et plans stratégiques dans un arbre interactif.",
  },
  {
    slug: "defensa-escandinava/clasica",
    slugEn: "scandinavian-defense/classical",
    slugFr: "defense-scandinave/classique",
    variantNodeId: "scan-5a2",
    parentNodeId: "scan-1",
    title: "Variante Clásica | Escandinava | Aperturas de Ajedrez",
    titleEn: "Classical Variation | Scandinavian | Chess Openings",
    titleFr: "Variante Classique | Scandinave | Ouvertures d'Échecs",
    description:
      "Estudia la variante Clásica de la Escandinava (1.e4 d5 2.exd5 Dxd5 3.Cc3 Da5): la línea más tradicional con planes de flanco de dama.",
    descriptionEn:
      "Study the Classical variation of the Scandinavian (1.e4 d5 2.exd5 Qxd5 3.Nc3 Qa5): the most traditional line with queenside plans.",
    descriptionFr:
      "Étudiez la variante Classique de la Scandinave (1.e4 d5 2.exd5 Dxd5 3.Cc3 Da5) : la ligne la plus traditionnelle avec plans sur l'aile dame.",
  },
  {
    slug: "defensa-escandinava/moderna",
    slugEn: "scandinavian-defense/modern",
    slugFr: "defense-scandinave/moderne",
    variantNodeId: "scan-3b",
    parentNodeId: "scan-1",
    title: "Variante Moderna | Escandinava | Aperturas de Ajedrez",
    titleEn: "Modern Variation | Scandinavian | Chess Openings",
    titleFr: "Variante Moderne | Scandinave | Ouvertures d'Échecs",
    description:
      "Explora la variante Moderna de la Escandinava (1.e4 d5 2.exd5 Cf6): recaptura con caballo evitando exponer la dama.",
    descriptionEn:
      "Explore the Modern variation of the Scandinavian (1.e4 d5 2.exd5 Nf6): knight recapture avoiding early queen exposure.",
    descriptionFr:
      "Explorez la variante Moderne de la Scandinave (1.e4 d5 2.exd5 Cf6) : reprise par le cavalier évitant l'exposition précoce de la dame.",
  },
  {
    slug: "defensa-escandinava/gambito-islandes",
    slugEn: "scandinavian-defense/icelandic-gambit",
    slugFr: "defense-scandinave/gambit-islandais",
    variantNodeId: "scan-5b2",
    parentNodeId: "scan-1",
    title: "Gambito Islandés | Escandinava | Aperturas de Ajedrez",
    titleEn: "Icelandic Gambit | Scandinavian | Chess Openings",
    titleFr: "Gambit Islandais | Scandinave | Ouvertures d'Échecs",
    description:
      "Analiza el Gambito Islandés de la Escandinava (1.e4 d5 2.exd5 Cf6 3.d4 e6): sacrificio de peón por desarrollo rápido y actividad.",
    descriptionEn:
      "Analyze the Icelandic Gambit of the Scandinavian (1.e4 d5 2.exd5 Nf6 3.d4 e6): pawn sacrifice for rapid development and activity.",
    descriptionFr:
      "Analysez le Gambit Islandais de la Scandinave (1.e4 d5 2.exd5 Cf6 3.d4 e6) : sacrifice de pion pour un développement rapide et de l'activité.",
  },

  // ── Ruy López ────────────────────────────────────────────
  {
    slug: "ruy-lopez/defensa-morphy",
    slugEn: "ruy-lopez/morphy-defense",
    slugFr: "ruy-lopez/defense-morphy",
    variantNodeId: "span-5a",
    parentNodeId: "span-4",
    title: "Defensa Morphy | Ruy López | Aperturas de Ajedrez",
    titleEn: "Morphy Defense | Ruy López | Chess Openings",
    titleFr: "Défense Morphy | Ruy López | Ouvertures d'Échecs",
    description:
      "Estudia la Defensa Morphy de la Ruy López (3...a6): la respuesta más popular, base de la variante cerrada y abierta.",
    descriptionEn:
      "Study the Morphy Defense of the Ruy López (3...a6): the most popular response, basis of the Closed and Open variations.",
    descriptionFr:
      "Étudiez la Défense Morphy du Ruy López (3...a6) : la réponse la plus populaire, base des variantes fermée et ouverte.",
  },
  {
    slug: "ruy-lopez/cerrada",
    slugEn: "ruy-lopez/closed",
    slugFr: "ruy-lopez/fermee",
    variantNodeId: "span-7a1",
    parentNodeId: "span-4",
    title: "Variante Cerrada | Ruy López | Aperturas de Ajedrez",
    titleEn: "Closed Variation | Ruy López | Chess Openings",
    titleFr: "Variante Fermée | Ruy López | Ouvertures d'Échecs",
    description:
      "Explora la Variante Cerrada de la Ruy López (3...a6 4.Aa4 Cf6): la línea más sólida y posicional del ajedrez moderno.",
    descriptionEn:
      "Explore the Closed Variation of the Ruy López (3...a6 4.Ba4 Nf6): the most solid and positional line in modern chess.",
    descriptionFr:
      "Explorez la Variante Fermée du Ruy López (3...a6 4.Fa4 Cf6) : la ligne la plus solide et positionnelle des échecs modernes.",
  },
  {
    slug: "ruy-lopez/abierta",
    slugEn: "ruy-lopez/open",
    slugFr: "ruy-lopez/ouverte",
    variantNodeId: "span-9a1b",
    parentNodeId: "span-4",
    title: "Variante Abierta | Ruy López | Aperturas de Ajedrez",
    titleEn: "Open Variation | Ruy López | Chess Openings",
    titleFr: "Variante Ouverte | Ruy López | Ouvertures d'Échecs",
    description:
      "Analiza la Variante Abierta de la Ruy López (5...b5): línea activa y táctica con juego abierto en el centro.",
    descriptionEn:
      "Analyze the Open Variation of the Ruy López (5...b5): active and tactical line with open center play.",
    descriptionFr:
      "Analysez la Variante Ouverte du Ruy López (5...b5) : ligne active et tactique avec jeu ouvert au centre.",
  },
  {
    slug: "ruy-lopez/variante-cambio",
    slugEn: "ruy-lopez/exchange-variation",
    slugFr: "ruy-lopez/variante-echange",
    variantNodeId: "span-6ae",
    parentNodeId: "span-4",
    title: "Variante de Cambio | Ruy López | Aperturas de Ajedrez",
    titleEn: "Exchange Variation | Ruy López | Chess Openings",
    titleFr: "Variante d'Échange | Ruy López | Ouvertures d'Échecs",
    description:
      "Domina la Variante de Cambio de la Ruy López (4.Axc6 dxc6): dobla los peones negros buscando ventaja en el final.",
    descriptionEn:
      "Master the Exchange Variation of the Ruy López (4.Bxc6 dxc6): doubles Black's pawns seeking endgame advantage.",
    descriptionFr:
      "Maîtrisez la Variante d'Échange du Ruy López (4.Fxc6 dxc6) : double les pions noirs en cherchant un avantage en finale.",
  },
  {
    slug: "ruy-lopez/defensa-berlin",
    slugEn: "ruy-lopez/berlin-defense",
    slugFr: "ruy-lopez/defense-berlin",
    variantNodeId: "span-5b",
    parentNodeId: "span-4",
    title: "Defensa Berlín | Ruy López | Aperturas de Ajedrez",
    titleEn: "Berlin Defense | Ruy López | Chess Openings",
    titleFr: "Défense Berlin | Ruy López | Ouvertures d'Échecs",
    description:
      "Aprende la Defensa Berlín (3...Cf6): el arma del empate utilizada por Kramnik, con el famoso final de Berlín.",
    descriptionEn:
      "Learn the Berlin Defense (3...Nf6): the drawing weapon used by Kramnik, featuring the famous Berlin Endgame.",
    descriptionFr:
      "Apprenez la Défense Berlin (3...Cf6) : l'arme du match nul utilisée par Kramnik, avec la célèbre finale de Berlin.",
  },
  {
    slug: "ruy-lopez/gambito-schliemann",
    slugEn: "ruy-lopez/schliemann-gambit",
    slugFr: "ruy-lopez/gambit-schliemann",
    variantNodeId: "span-5c",
    parentNodeId: "span-4",
    title: "Gambito Schliemann | Ruy López | Aperturas de Ajedrez",
    titleEn: "Schliemann Gambit | Ruy López | Chess Openings",
    titleFr: "Gambit Schliemann | Ruy López | Ouvertures d'Échecs",
    description:
      "Explora el Gambito Schliemann (3...f5): la respuesta más agresiva e irregular contra la Ruy López.",
    descriptionEn:
      "Explore the Schliemann Gambit (3...f5): the most aggressive and irregular response against the Ruy López.",
    descriptionFr:
      "Explorez le Gambit Schliemann (3...f5) : la réponse la plus agressive et irrégulière contre le Ruy López.",
  },
  // ── Escocesa ─────────────────────────────────────────────
  {
    slug: "apertura-escocesa/clasica",
    slugEn: "scotch-game/classical",
    slugFr: "partie-ecossaise/classique",
    variantNodeId: "scot-8a",
    parentNodeId: "scot-1",
    title: "Escocesa Clásica | Apertura Escocesa | Aperturas de Ajedrez",
    titleEn: "Classical Scotch | Scotch Game | Chess Openings",
    titleFr: "Ecossaise Classique | Partie Ecossaise | Ouvertures d'Échecs",
    description:
      "Explora la Escocesa Clásica (1.e4 e5 2.Cf3 Cc6 3.d4 exd4 4.Cxd4 Cf6 5.Cxc6 bxc6 6.e5 De7): ventaja espacial blanca y estructura dañada negra.",
    descriptionEn:
      "Explore the Classical Scotch (1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Nxd4 Nf6 5.Nxc6 bxc6 6.e5 Qe7): White's space advantage vs. Black's damaged structure.",
    descriptionFr:
      "Explorez l'Ecossaise Classique (1.e4 e5 2.Cf3 Cc6 3.d4 exd4 4.Cxd4 Cf6 5.Cxc6 bxc6 6.e5 De7) : avantage d'espace blanc contre structure noire abîmée.",
  },
  {
    slug: "apertura-escocesa/con-alfil-e3",
    slugEn: "scotch-game/with-be3",
    slugFr: "partie-ecossaise/avec-fe3",
    variantNodeId: "scot-7b",
    parentNodeId: "scot-1",
    title: "Escocesa con Ae3 | Apertura Escocesa | Aperturas de Ajedrez",
    titleEn: "Scotch with Be3 | Scotch Game | Chess Openings",
    titleFr: "Ecossaise avec Fe3 | Partie Ecossaise | Ouvertures d'Échecs",
    description:
      "Analiza la Escocesa con Ae3 (1.e4 e5 2.Cf3 Cc6 3.d4 exd4 4.Cxd4 Ac5 5.Ae3 Df6 6.c3): desarrollo sólido y control central tras el alfil en c5.",
    descriptionEn:
      "Analyze the Scotch with Be3 (1.e4 e5 2.Nf3 Nc6 3.d4 exd4 4.Nxd4 Bc5 5.Be3 Qf6 6.c3): solid development and central control against the bishop on c5.",
    descriptionFr:
      "Analysez l'Ecossaise avec Fe3 (1.e4 e5 2.Cf3 Cc6 3.d4 exd4 4.Cxd4 Ac5 5.Fe3 Df6 6.c3) : développement solide et contrôle central face au fou en c5.",
  },
  // ── Italiana ─────────────────────────────────────────────
  {
    slug: "apertura-italiana/giuoco-piano",
    slugEn: "italian-game/giuoco-piano",
    slugFr: "partie-italienne/giuoco-piano",
    variantNodeId: "ital-2a",
    parentNodeId: "ital-1",
    title: "Giuoco Piano | Apertura Italiana | Aperturas de Ajedrez",
    titleEn: "Giuoco Piano | Italian Game | Chess Openings",
    titleFr: "Giuoco Piano | Partie Italienne | Ouvertures d'Échecs",
    description:
      "Estudia el Giuoco Piano (3...Ac5): el juego tranquilo de la Italiana con planes de c3 y d4 para dominar el centro.",
    descriptionEn:
      "Study the Giuoco Piano (3...Bc5): the quiet game of the Italian with c3 and d4 plans to dominate the center.",
    descriptionFr:
      "Étudiez le Giuoco Piano (3...Fc5) : le jeu tranquille de l'Italienne avec les plans c3 et d4 pour dominer le centre.",
  },
  {
    slug: "apertura-italiana/dos-caballos",
    slugEn: "italian-game/two-knights",
    slugFr: "partie-italienne/deux-cavaliers",
    variantNodeId: "ital-2b",
    parentNodeId: "ital-1",
    title: "Defensa de los Dos Caballos | Italiana | Aperturas de Ajedrez",
    titleEn: "Two Knights Defense | Italian Game | Chess Openings",
    titleFr: "Défense des Deux Cavaliers | Italienne | Ouvertures d'Échecs",
    description:
      "Analiza la Defensa de los Dos Caballos (3...Cf6): respuesta agresiva que ignora la amenaza a f7, incluyendo el Fried Liver.",
    descriptionEn:
      "Analyze the Two Knights Defense (3...Nf6): aggressive response that ignores the f7 threat, including the Fried Liver Attack.",
    descriptionFr:
      "Analysez la Défense des Deux Cavaliers (3...Cf6) : réponse agressive qui ignore la menace sur f7, incluant le Fried Liver.",
  },
  {
    slug: "apertura-italiana/fried-liver",
    slugEn: "italian-game/fried-liver",
    slugFr: "partie-italienne/fried-liver",
    variantNodeId: "ital-6b2",
    parentNodeId: "ital-1",
    title: "Ataque Fried Liver | Italiana | Aperturas de Ajedrez",
    titleEn: "Fried Liver Attack | Italian Game | Chess Openings",
    titleFr: "Attaque Fried Liver | Italienne | Ouvertures d'Échecs",
    description:
      "Domina el Ataque Fried Liver (Cxf7): el famoso sacrificio de caballo en la Italiana, una de las celadas más conocidas del ajedrez.",
    descriptionEn:
      "Master the Fried Liver Attack (Nxf7): the famous knight sacrifice in the Italian Game, one of the most well-known traps in chess.",
    descriptionFr:
      "Maîtrisez l'Attaque Fried Liver (Cxf7) : le célèbre sacrifice de cavalier dans la Partie Italienne.",
  },

  // ── Siciliana ────────────────────────────────────────────
  {
    slug: "defensa-siciliana/najdorf",
    slugEn: "sicilian-defense/najdorf",
    slugFr: "defense-sicilienne/najdorf",
    variantNodeId: "sic-9a1",
    parentNodeId: "sic-1",
    title: "Variante Najdorf | Siciliana | Aperturas de Ajedrez",
    titleEn: "Najdorf Variation | Sicilian | Chess Openings",
    titleFr: "Variante Najdorf | Sicilienne | Ouvertures d'Échecs",
    description:
      "Domina la Variante Najdorf de la Siciliana (5...a6): la línea más jugada del mundo con el Ataque Inglés y Fischer.",
    descriptionEn:
      "Master the Najdorf Variation of the Sicilian (5...a6): the most played line in the world, featuring the English Attack and Fischer.",
    descriptionFr:
      "Maîtrisez la Variante Najdorf de la Sicilienne (5...a6) : la ligne la plus jouée au monde avec l'Attaque Anglaise et Fischer.",
  },
  {
    slug: "defensa-siciliana/dragon",
    slugEn: "sicilian-defense/dragon",
    slugFr: "defense-sicilienne/dragon",
    variantNodeId: "sic-9a2",
    parentNodeId: "sic-1",
    title: "Variante del Dragón | Siciliana | Aperturas de Ajedrez",
    titleEn: "Dragon Variation | Sicilian | Chess Openings",
    titleFr: "Variante du Dragon | Sicilienne | Ouvertures d'Échecs",
    description:
      "Explora la Variante del Dragón (5...g6): fianchetto agresivo con el Ataque Yugoslavo, una de las líneas más agudas del ajedrez.",
    descriptionEn:
      "Explore the Dragon Variation (5...g6): aggressive fianchetto with the Yugoslav Attack, one of the sharpest lines in chess.",
    descriptionFr:
      "Explorez la Variante du Dragon (5...g6) : fianchetto agressif avec l'Attaque Yougoslave, l'une des lignes les plus aiguës.",
  },
  {
    slug: "defensa-siciliana/scheveningen",
    slugEn: "sicilian-defense/scheveningen",
    slugFr: "defense-sicilienne/scheveningen",
    variantNodeId: "sic-9a3",
    parentNodeId: "sic-1",
    title: "Variante Scheveningen | Siciliana | Aperturas de Ajedrez",
    titleEn: "Scheveningen Variation | Sicilian | Chess Openings",
    titleFr: "Variante Scheveningen | Sicilienne | Ouvertures d'Échecs",
    description:
      "Estudia la Variante Scheveningen (5...e6): estructura flexible e6+d6 con el Ataque Keres y la línea clásica.",
    descriptionEn:
      "Study the Scheveningen Variation (5...e6): flexible e6+d6 structure featuring the Keres Attack and Classical line.",
    descriptionFr:
      "Étudiez la Variante Scheveningen (5...e6) : structure flexible e6+d6 avec l'Attaque Keres et la ligne classique.",
  },
  {
    slug: "defensa-siciliana/clasica",
    slugEn: "sicilian-defense/classical",
    slugFr: "defense-sicilienne/classique",
    variantNodeId: "sic-7b1",
    parentNodeId: "sic-1",
    title: "Variante Clásica | Siciliana | Aperturas de Ajedrez",
    titleEn: "Classical Variation | Sicilian | Chess Openings",
    titleFr: "Variante Classique | Sicilienne | Ouvertures d'Échecs",
    description:
      "Analiza la Variante Clásica de la Siciliana (2...Cc6 seguido de Cf6): incluye la Sveshnikov y líneas con d6.",
    descriptionEn:
      "Analyze the Classical Variation of the Sicilian (2...Nc6 followed by Nf6): includes the Sveshnikov and lines with d6.",
    descriptionFr:
      "Analysez la Variante Classique de la Sicilienne (2...Cc6 suivi de Cf6) : inclut la Sveshnikov et les lignes avec d6.",
  },
  {
    slug: "defensa-siciliana/sveshnikov",
    slugEn: "sicilian-defense/sveshnikov",
    slugFr: "defense-sicilienne/sveshnikov",
    variantNodeId: "sic-9b1b",
    parentNodeId: "sic-1",
    title: "Variante Sveshnikov | Siciliana | Aperturas de Ajedrez",
    titleEn: "Sveshnikov Variation | Sicilian | Chess Openings",
    titleFr: "Variante Sveshnikov | Sicilienne | Ouvertures d'Échecs",
    description:
      "Domina la Variante Sveshnikov de la Siciliana (5...e5): línea agresiva que debilita d5 a cambio de juego activo.",
    descriptionEn:
      "Master the Sveshnikov Variation of the Sicilian (5...e5): aggressive line that weakens d5 in exchange for active play.",
    descriptionFr:
      "Maîtrisez la Variante Sveshnikov de la Sicilienne (5...e5) : ligne agressive qui affaiblit d5 en échange d'un jeu actif.",
  },
  {
    slug: "defensa-siciliana/taimanov",
    slugEn: "sicilian-defense/taimanov",
    slugFr: "defense-sicilienne/taimanov",
    variantNodeId: "sic-7b2",
    parentNodeId: "sic-1",
    title: "Variante Taimanov | Siciliana | Aperturas de Ajedrez",
    titleEn: "Taimanov Variation | Sicilian | Chess Openings",
    titleFr: "Variante Taimanov | Sicilienne | Ouvertures d'Échecs",
    description:
      "Explora la Variante Taimanov de la Siciliana (2...Cc6 seguido de e6): flexible y sólida, favorita de Kasparov.",
    descriptionEn:
      "Explore the Taimanov Variation of the Sicilian (2...Nc6 followed by e6): flexible and solid, a Kasparov favorite.",
    descriptionFr:
      "Explorez la Variante Taimanov de la Sicilienne (2...Cc6 suivi de e6) : flexible et solide, favorite de Kasparov.",
  },
  {
    slug: "defensa-siciliana/kan",
    slugEn: "sicilian-defense/kan",
    slugFr: "defense-sicilienne/kan",
    variantNodeId: "sic-7c1",
    parentNodeId: "sic-1",
    title: "Variante Kan | Siciliana | Aperturas de Ajedrez",
    titleEn: "Kan Variation | Sicilian | Chess Openings",
    titleFr: "Variante Kan | Sicilienne | Ouvertures d'Échecs",
    description:
      "Estudia la Variante Kan de la Siciliana (2...e6 seguido de a6): sistema muy flexible con múltiples transposiciones.",
    descriptionEn:
      "Study the Kan Variation of the Sicilian (2...e6 followed by a6): very flexible system with multiple transpositions.",
    descriptionFr:
      "Étudiez la Variante Kan de la Sicilienne (2...e6 suivi de a6) : système très flexible avec de multiples transpositions.",
  },
  {
    slug: "defensa-siciliana/cerrada",
    slugEn: "sicilian-defense/closed",
    slugFr: "defense-sicilienne/fermee",
    variantNodeId: "sic-2b",
    parentNodeId: "sic-1",
    title: "Siciliana Cerrada | Aperturas de Ajedrez",
    titleEn: "Closed Sicilian | Chess Openings",
    titleFr: "Sicilienne Fermée | Ouvertures d'Échecs",
    description:
      "Analiza la Siciliana Cerrada (2.Cc3): sistema posicional que evita la apertura del centro, con fianchetto y juego tranquilo.",
    descriptionEn:
      "Analyze the Closed Sicilian (2.Nc3): positional system that avoids opening the center, with fianchetto and quiet play.",
    descriptionFr:
      "Analysez la Sicilienne Fermée (2.Cc3) : système positionnel qui évite l'ouverture du centre, avec fianchetto.",
  },

  // ── Francesa ─────────────────────────────────────────────
  {
    slug: "defensa-francesa/variante-avance",
    slugEn: "french-defense/advance-variation",
    slugFr: "defense-francaise/variante-avance",
    variantNodeId: "fr-4a",
    parentNodeId: "fr-1",
    title: "Variante del Avance | Francesa | Aperturas de Ajedrez",
    titleEn: "Advance Variation | French Defense | Chess Openings",
    titleFr: "Variante d'Avance | Française | Ouvertures d'Échecs",
    description:
      "Aprende la Variante del Avance de la Francesa (3.e5): gana espacio y cierra el centro, con planes de c5 para las negras.",
    descriptionEn:
      "Learn the Advance Variation of the French Defense (3.e5): gains space and closes the center, with c5 plans for Black.",
    descriptionFr:
      "Apprenez la Variante d'Avance de la Française (3.e5) : gagne de l'espace et ferme le centre, avec les plans c5 pour les Noirs.",
  },
  {
    slug: "defensa-francesa/variante-cambio",
    slugEn: "french-defense/exchange-variation",
    slugFr: "defense-francaise/variante-echange",
    variantNodeId: "fr-4b",
    parentNodeId: "fr-1",
    title: "Variante del Cambio | Francesa | Aperturas de Ajedrez",
    titleEn: "Exchange Variation | French Defense | Chess Openings",
    titleFr: "Variante d'Échange | Française | Ouvertures d'Échecs",
    description:
      "Estudia la Variante del Cambio de la Francesa (3.exd5 exd5): simplifica el centro buscando posiciones igualadas.",
    descriptionEn:
      "Study the Exchange Variation of the French Defense (3.exd5 exd5): simplifies the center seeking balanced positions.",
    descriptionFr:
      "Étudiez la Variante d'Échange de la Française (3.exd5 exd5) : simplifie le centre en cherchant des positions équilibrées.",
  },
  {
    slug: "defensa-francesa/winawer",
    slugEn: "french-defense/winawer",
    slugFr: "defense-francaise/winawer",
    variantNodeId: "fr-5c1",
    parentNodeId: "fr-1",
    title: "Variante Winawer | Francesa | Aperturas de Ajedrez",
    titleEn: "Winawer Variation | French Defense | Chess Openings",
    titleFr: "Variante Winawer | Française | Ouvertures d'Échecs",
    description:
      "Explora la Variante Winawer de la Francesa (3.Cc3 Ab4): clava el caballo creando tensión, la línea más aguda de la Francesa.",
    descriptionEn:
      "Explore the Winawer Variation of the French Defense (3.Nc3 Bb4): pins the knight creating tension, the sharpest French line.",
    descriptionFr:
      "Explorez la Variante Winawer de la Française (3.Cc3 Fb4) : cloue le cavalier créant de la tension, la ligne la plus aiguë.",
  },
  {
    slug: "defensa-francesa/clasica",
    slugEn: "french-defense/classical",
    slugFr: "defense-francaise/classique",
    variantNodeId: "fr-5c2",
    parentNodeId: "fr-1",
    title: "Variante Clásica | Francesa | Aperturas de Ajedrez",
    titleEn: "Classical Variation | French Defense | Chess Openings",
    titleFr: "Variante Classique | Française | Ouvertures d'Échecs",
    description:
      "Analiza la Variante Clásica de la Francesa (3.Cc3 Cf6): desarrollo normal con planes de obtener contrajuego con c5.",
    descriptionEn:
      "Analyze the Classical Variation of the French Defense (3.Nc3 Nf6): normal development with plans to generate counterplay with c5.",
    descriptionFr:
      "Analysez la Variante Classique de la Française (3.Cc3 Cf6) : développement normal avec plans de contre-jeu avec c5.",
  },
  {
    slug: "defensa-francesa/tarrasch",
    slugEn: "french-defense/tarrasch",
    slugFr: "defense-francaise/tarrasch",
    variantNodeId: "fr-4d",
    parentNodeId: "fr-1",
    title: "Variante Tarrasch | Francesa | Aperturas de Ajedrez",
    titleEn: "Tarrasch Variation | French Defense | Chess Openings",
    titleFr: "Variante Tarrasch | Française | Ouvertures d'Échecs",
    description:
      "Domina la Variante Tarrasch de la Francesa (3.Cd2): evita la clavada Ab4, con líneas abiertas y cerradas.",
    descriptionEn:
      "Master the Tarrasch Variation of the French Defense (3.Nd2): avoids the Bb4 pin, with open and closed lines.",
    descriptionFr:
      "Maîtrisez la Variante Tarrasch de la Française (3.Cd2) : évite le clouage Fb4, avec lignes ouvertes et fermées.",
  },

  // ── Caro-Kann ────────────────────────────────────────────
  {
    slug: "defensa-caro-kann/clasica",
    slugEn: "caro-kann-defense/classical",
    slugFr: "defense-caro-kann/classique",
    variantNodeId: "ck-4a",
    parentNodeId: "ck-1",
    title: "Variante Clásica | Caro-Kann | Aperturas de Ajedrez",
    titleEn: "Classical Variation | Caro-Kann | Chess Openings",
    titleFr: "Variante Classique | Caro-Kann | Ouvertures d'Échecs",
    description:
      "Estudia la Variante Clásica de la Caro-Kann (3.Cc3 dxe4 4.Cxe4 Af5): el alfil se activa tempranamente, línea muy sólida.",
    descriptionEn:
      "Study the Classical Variation of the Caro-Kann (3.Nc3 dxe4 4.Nxe4 Bf5): the bishop activates early, a very solid line.",
    descriptionFr:
      "Étudiez la Variante Classique de la Caro-Kann (3.Cc3 dxe4 4.Cxe4 Ff5) : le fou s'active tôt, ligne très solide.",
  },
  {
    slug: "defensa-caro-kann/variante-avance",
    slugEn: "caro-kann-defense/advance-variation",
    slugFr: "defense-caro-kann/variante-avance",
    variantNodeId: "ck-4b",
    parentNodeId: "ck-1",
    title: "Variante del Avance | Caro-Kann | Aperturas de Ajedrez",
    titleEn: "Advance Variation | Caro-Kann | Chess Openings",
    titleFr: "Variante d'Avance | Caro-Kann | Ouvertures d'Échecs",
    description:
      "Analiza la Variante del Avance de la Caro-Kann (3.e5): gana espacio restringiendo las piezas negras, con Af5 como respuesta típica.",
    descriptionEn:
      "Analyze the Advance Variation of the Caro-Kann (3.e5): gains space restricting Black's pieces, with Bf5 as the typical response.",
    descriptionFr:
      "Analysez la Variante d'Avance de la Caro-Kann (3.e5) : gagne de l'espace en restreignant les pièces noires.",
  },
  {
    slug: "defensa-caro-kann/variante-cambio",
    slugEn: "caro-kann-defense/exchange-variation",
    slugFr: "defense-caro-kann/variante-echange",
    variantNodeId: "ck-4c",
    parentNodeId: "ck-1",
    title: "Variante del Cambio | Caro-Kann | Aperturas de Ajedrez",
    titleEn: "Exchange Variation | Caro-Kann | Chess Openings",
    titleFr: "Variante d'Échange | Caro-Kann | Ouvertures d'Échecs",
    description:
      "Explora la Variante del Cambio de la Caro-Kann (3.exd5 cxd5): simplifica el centro, posición simétrica y posicional.",
    descriptionEn:
      "Explore the Exchange Variation of the Caro-Kann (3.exd5 cxd5): simplifies the center, symmetric and positional position.",
    descriptionFr:
      "Explorez la Variante d'Échange de la Caro-Kann (3.exd5 cxd5) : simplifie le centre, position symétrique et positionnelle.",
  },
  {
    slug: "defensa-caro-kann/variante-fantasia",
    slugEn: "caro-kann-defense/fantasy-variation",
    slugFr: "defense-caro-kann/variante-fantaisie",
    variantNodeId: "ck-4d",
    parentNodeId: "ck-1",
    title: "Variante Fantasía | Caro-Kann | Aperturas de Ajedrez",
    titleEn: "Fantasy Variation | Caro-Kann | Chess Openings",
    titleFr: "Variante Fantaisie | Caro-Kann | Ouvertures d'Échecs",
    description:
      "Domina la Variante Fantasía de la Caro-Kann (3.f3): agresiva, busca un centro masivo de peones con e4 y d4.",
    descriptionEn:
      "Master the Fantasy Variation of the Caro-Kann (3.f3): aggressive, seeks a massive pawn center with e4 and d4.",
    descriptionFr:
      "Maîtrisez la Variante Fantaisie de la Caro-Kann (3.f3) : agressive, cherche un centre de pions massif avec e4 et d4.",
  },

  // ── Pirc ─────────────────────────────────────────────────
  {
    slug: "defensa-pirc/ataque-austriaco",
    slugEn: "pirc-defense/austrian-attack",
    slugFr: "defense-pirc/attaque-autrichienne",
    variantNodeId: "pirc-6a",
    parentNodeId: "pirc-1",
    title: "Ataque Austriaco | Pirc | Aperturas de Ajedrez",
    titleEn: "Austrian Attack | Pirc Defense | Chess Openings",
    titleFr: "Attaque Autrichienne | Pirc | Ouvertures d'Échecs",
    description:
      "Aprende el Ataque Austriaco contra la Pirc (4.f4): la continuación más agresiva, buscando el avance f5.",
    descriptionEn:
      "Learn the Austrian Attack against the Pirc (4.f4): the most aggressive continuation, seeking the f5 advance.",
    descriptionFr:
      "Apprenez l'Attaque Autrichienne contre la Pirc (4.f4) : la continuation la plus agressive, cherchant l'avance f5.",
  },
  {
    slug: "defensa-pirc/sistema-clasico",
    slugEn: "pirc-defense/classical-system",
    slugFr: "defense-pirc/systeme-classique",
    variantNodeId: "pirc-6b",
    parentNodeId: "pirc-1",
    title: "Sistema Clásico | Pirc | Aperturas de Ajedrez",
    titleEn: "Classical System | Pirc Defense | Chess Openings",
    titleFr: "Système Classique | Pirc | Ouvertures d'Échecs",
    description:
      "Estudia el Sistema Clásico de la Pirc (4.Cf3): desarrollo tranquilo y sólido con planes posicionales.",
    descriptionEn:
      "Study the Classical System of the Pirc (4.Nf3): quiet and solid development with positional plans.",
    descriptionFr:
      "Étudiez le Système Classique de la Pirc (4.Cf3) : développement tranquille et solide avec plans positionnels.",
  },
  {
    slug: "defensa-pirc/ataque-150",
    slugEn: "pirc-defense/150-attack",
    slugFr: "defense-pirc/attaque-150",
    variantNodeId: "pirc-6c",
    parentNodeId: "pirc-1",
    title: "Ataque 150 | Pirc | Aperturas de Ajedrez",
    titleEn: "150 Attack | Pirc Defense | Chess Openings",
    titleFr: "Attaque 150 | Pirc | Ouvertures d'Échecs",
    description:
      "Explora el Ataque 150 contra la Pirc (4.Ae3 seguido de Dd2 y O-O-O): enroques opuestos con ataque directo al rey.",
    descriptionEn:
      "Explore the 150 Attack against the Pirc (4.Be3 followed by Qd2 and O-O-O): opposite castling with direct king attack.",
    descriptionFr:
      "Explorez l'Attaque 150 contre la Pirc (4.Fe3 suivi de Dd2 et 0-0-0) : roques opposés avec attaque directe du roi.",
  },

  // ── Alekhine ─────────────────────────────────────────────
  {
    slug: "defensa-alekhine/variante-moderna",
    slugEn: "alekhine-defense/modern-variation",
    slugFr: "defense-alekhine/variante-moderne",
    variantNodeId: "al-6a",
    parentNodeId: "al-1",
    title: "Variante Moderna | Alekhine | Aperturas de Ajedrez",
    titleEn: "Modern Variation | Alekhine's Defense | Chess Openings",
    titleFr: "Variante Moderne | Alekhine | Ouvertures d'Échecs",
    description:
      "Analiza la Variante Moderna de la Alekhine (4.Cf3): desarrollo sólido con dxe5 y juego posicional.",
    descriptionEn:
      "Analyze the Modern Variation of Alekhine's Defense (4.Nf3): solid development with dxe5 and positional play.",
    descriptionFr:
      "Analysez la Variante Moderne de la Alekhine (4.Cf3) : développement solide avec dxe5 et jeu positionnel.",
  },
  {
    slug: "defensa-alekhine/variante-cambio",
    slugEn: "alekhine-defense/exchange-variation",
    slugFr: "defense-alekhine/variante-echange",
    variantNodeId: "al-6b",
    parentNodeId: "al-1",
    title: "Variante del Cambio | Alekhine | Aperturas de Ajedrez",
    titleEn: "Exchange Variation | Alekhine's Defense | Chess Openings",
    titleFr: "Variante d'Échange | Alekhine | Ouvertures d'Échecs",
    description:
      "Estudia la Variante del Cambio de la Alekhine (4.c4): ataca el caballo en d5, buscando ventaja de espacio.",
    descriptionEn:
      "Study the Exchange Variation of Alekhine's Defense (4.c4): attacks the knight on d5, seeking space advantage.",
    descriptionFr:
      "Étudiez la Variante d'Échange de la Alekhine (4.c4) : attaque le cavalier en d5, cherchant l'avantage d'espace.",
  },
  {
    slug: "defensa-alekhine/cuatro-peones",
    slugEn: "alekhine-defense/four-pawns-attack",
    slugFr: "defense-alekhine/attaque-quatre-pions",
    variantNodeId: "al-6c",
    parentNodeId: "al-1",
    title: "Variante de los Cuatro Peones | Alekhine | Aperturas de Ajedrez",
    titleEn: "Four Pawns Attack | Alekhine's Defense | Chess Openings",
    titleFr: "Attaque des Quatre Pions | Alekhine | Ouvertures d'Échecs",
    description:
      "Domina la Variante de los Cuatro Peones de la Alekhine (4.f4): la más agresiva, cadena de peones masiva en el centro.",
    descriptionEn:
      "Master the Four Pawns Attack of Alekhine's Defense (4.f4): the most aggressive, massive pawn chain in the center.",
    descriptionFr:
      "Maîtrisez l'Attaque des Quatre Pions de la Alekhine (4.f4) : la plus agressive, chaîne de pions massive au centre.",
  },

  // ── Gambito de Dama ──────────────────────────────────────
  {
    slug: "gambito-de-dama/aceptado",
    slugEn: "queens-gambit/accepted",
    slugFr: "gambit-dame/accepte",
    variantNodeId: "qg-3a",
    parentNodeId: "qg-2",
    title: "Gambito de Dama Aceptado | Aperturas de Ajedrez",
    titleEn: "Queen's Gambit Accepted | Chess Openings",
    titleFr: "Gambit Dame Accepté | Ouvertures d'Échecs",
    description:
      "Aprende el Gambito de Dama Aceptado (2...dxc4): acepta el peón, las blancas recuperan con desarrollo activo.",
    descriptionEn:
      "Learn the Queen's Gambit Accepted (2...dxc4): accepts the pawn, White recovers with active development.",
    descriptionFr:
      "Apprenez le Gambit Dame Accepté (2...dxc4) : accepte le pion, les Blancs récupèrent avec un développement actif.",
  },
  {
    slug: "gambito-de-dama/declinado",
    slugEn: "queens-gambit/declined",
    slugFr: "gambit-dame/refuse",
    variantNodeId: "qg-3b",
    parentNodeId: "qg-2",
    title: "Gambito de Dama Declinado | Aperturas de Ajedrez",
    titleEn: "Queen's Gambit Declined | Chess Openings",
    titleFr: "Gambit Dame Refusé | Ouvertures d'Échecs",
    description:
      "Estudia el Gambito de Dama Declinado (2...e6): mantiene el centro sólido con la Ortodoxa y Cambridge Springs.",
    descriptionEn:
      "Study the Queen's Gambit Declined (2...e6): maintains a solid center with the Orthodox and Cambridge Springs variations.",
    descriptionFr:
      "Étudiez le Gambit Dame Refusé (2...e6) : maintient un centre solide avec l'Orthodoxe et Cambridge Springs.",
  },
  {
    slug: "gambito-de-dama/defensa-eslava",
    slugEn: "queens-gambit/slav-defense",
    slugFr: "gambit-dame/defense-slave",
    variantNodeId: "qg-3c",
    parentNodeId: "qg-2",
    title: "Defensa Eslava | Gambito de Dama | Aperturas de Ajedrez",
    titleEn: "Slav Defense | Queen's Gambit | Chess Openings",
    titleFr: "Défense Slave | Gambit Dame | Ouvertures d'Échecs",
    description:
      "Explora la Defensa Eslava (2...c6): refuerza d5 sin bloquear el alfil de dama, con la Semi-Eslava y la Eslava Aceptada.",
    descriptionEn:
      "Explore the Slav Defense (2...c6): reinforces d5 without blocking the queen's bishop, with the Semi-Slav and Accepted Slav.",
    descriptionFr:
      "Explorez la Défense Slave (2...c6) : renforce d5 sans bloquer le fou dame, avec la Semi-Slave et la Slave Acceptée.",
  },

  // ── Londres ──────────────────────────────────────────────
  {
    slug: "sistema-londres/clasico",
    slugEn: "london-system/classical",
    slugFr: "systeme-londres/classique",
    variantNodeId: "lon-7a",
    parentNodeId: "lon-2",
    title: "Londres Clásico | Sistema Londres | Aperturas de Ajedrez",
    titleEn: "Classical London | London System | Chess Openings",
    titleFr: "Londres Classique | Système Londres | Ouvertures d'Échecs",
    description:
      "Analiza el Sistema Londres Clásico (Ae7, enroque corto): estructura sólida y juego posicional en el centro.",
    descriptionEn:
      "Analyze the Classical London System (Be7, kingside castling): solid structure and positional play in the center.",
    descriptionFr:
      "Analysez le Système Londres Classique (Fe7, roque côté roi) : structure solide et jeu positionnel au centre.",
  },
  {
    slug: "sistema-londres/contra-c5",
    slugEn: "london-system/vs-c5",
    slugFr: "systeme-londres/contre-c5",
    variantNodeId: "lon-7b",
    parentNodeId: "lon-2",
    title: "Londres vs c5 | Sistema Londres | Aperturas de Ajedrez",
    titleEn: "London vs c5 | London System | Chess Openings",
    titleFr: "Londres vs c5 | Système Londres | Ouvertures d'Échecs",
    description:
      "Estudia la respuesta c5 contra el Sistema Londres: las negras desafían el centro inmediatamente buscando juego activo.",
    descriptionEn:
      "Study the c5 response against the London System: Black immediately challenges the center seeking active play.",
    descriptionFr:
      "Étudiez la réponse c5 contre le Système Londres : les Noirs contestent le centre immédiatement en cherchant un jeu actif.",
  },

  // ── India de Rey ─────────────────────────────────────────
  {
    slug: "defensa-india-de-rey/clasica",
    slugEn: "kings-indian-defense/classical",
    slugFr: "defense-indienne-roi/classique",
    variantNodeId: "ki-10a1",
    parentNodeId: "ki-3a",
    title: "Variante Clásica | India de Rey | Aperturas de Ajedrez",
    titleEn: "Classical Variation | King's Indian Defense | Chess Openings",
    titleFr: "Variante Classique | Indienne du Roi | Ouvertures d'Échecs",
    description:
      "Domina la Variante Clásica de la India de Rey (Ae2, O-O): la línea más popular con e5, d5 y ataque en el flanco de rey.",
    descriptionEn:
      "Master the Classical Variation of the King's Indian Defense (Be2, O-O): the most popular line with e5, d5, and kingside attack.",
    descriptionFr:
      "Maîtrisez la Variante Classique de l'Indienne du Roi (Fe2, 0-0) : la ligne la plus populaire avec e5, d5 et attaque sur l'aile roi.",
  },
  {
    slug: "defensa-india-de-rey/samisch",
    slugEn: "kings-indian-defense/samisch",
    slugFr: "defense-indienne-roi/samisch",
    variantNodeId: "ki-8a2",
    parentNodeId: "ki-3a",
    title: "Variante Sämisch | India de Rey | Aperturas de Ajedrez",
    titleEn: "Sämisch Variation | King's Indian Defense | Chess Openings",
    titleFr: "Variante Sämisch | Indienne du Roi | Ouvertures d'Échecs",
    description:
      "Explora la Variante Sämisch de la India de Rey (f3): agresiva, prepara Ae3 y el avance g4 en el flanco de rey.",
    descriptionEn:
      "Explore the Sämisch Variation of the King's Indian Defense (f3): aggressive, prepares Be3 and the g4 advance on the kingside.",
    descriptionFr:
      "Explorez la Variante Sämisch de l'Indienne du Roi (f3) : agressive, prépare Fe3 et l'avance g4 sur l'aile roi.",
  },

  // ── Nimzo-India ──────────────────────────────────────────
  {
    slug: "defensa-nimzo-india/clasica",
    slugEn: "nimzo-indian-defense/classical",
    slugFr: "defense-nimzo-indienne/classique",
    variantNodeId: "nim-6b1",
    parentNodeId: "nim-3b",
    title: "Variante Clásica | Nimzo-India | Aperturas de Ajedrez",
    titleEn: "Classical Variation | Nimzo-Indian Defense | Chess Openings",
    titleFr: "Variante Classique | Nimzo-Indienne | Ouvertures d'Échecs",
    description:
      "Analiza la Variante Clásica de la Nimzo-India (4.Dc2): evita doblar peones y presiona la columna c.",
    descriptionEn:
      "Analyze the Classical Variation of the Nimzo-Indian Defense (4.Qc2): avoids doubling pawns and pressures the c-file.",
    descriptionFr:
      "Analysez la Variante Classique de la Nimzo-Indienne (4.Dc2) : évite le doublement de pions et presse la colonne c.",
  },
  {
    slug: "defensa-nimzo-india/rubinstein",
    slugEn: "nimzo-indian-defense/rubinstein",
    slugFr: "defense-nimzo-indienne/rubinstein",
    variantNodeId: "nim-6b2",
    parentNodeId: "nim-3b",
    title: "Variante Rubinstein | Nimzo-India | Aperturas de Ajedrez",
    titleEn: "Rubinstein Variation | Nimzo-Indian Defense | Chess Openings",
    titleFr: "Variante Rubinstein | Nimzo-Indienne | Ouvertures d'Échecs",
    description:
      "Estudia la Variante Rubinstein de la Nimzo-India (4.e3): sólida y clásica, consolida el centro con Ad3 y Cf3.",
    descriptionEn:
      "Study the Rubinstein Variation of the Nimzo-Indian Defense (4.e3): solid and classical, consolidates the center with Bd3 and Nf3.",
    descriptionFr:
      "Étudiez la Variante Rubinstein de la Nimzo-Indienne (4.e3) : solide et classique, consolide le centre avec Fd3 et Cf3.",
  },

  // ── Defensa Holandesa ──────────────────────────────────────
  {
    slug: "defensa-holandesa/leningrado",
    slugEn: "dutch-defense/leningrad",
    slugFr: "defense-hollandaise/leningrad",
    variantNodeId: "dutch-5a",
    parentNodeId: "dutch-1",
    title: "Variante Leningrado | Defensa Holandesa | Aperturas de Ajedrez",
    titleEn: "Leningrad Variation | Dutch Defense | Chess Openings",
    titleFr: "Variante Leningrad | Défense Hollandaise | Ouvertures d'Échecs",
    description:
      "Aprende la Variante Leningrado de la Defensa Holandesa (3...g6): fianchetto de alfil en g7 y ataque directo en el flanco de rey.",
    descriptionEn:
      "Learn the Leningrad Variation of the Dutch Defense (3...g6): fianchetto of the bishop on g7 and direct kingside attack.",
    descriptionFr:
      "Apprenez la Variante Leningrad de la Défense Hollandaise (3...g6) : fianchetto du fou en g7 et attaque directe sur l'aile roi.",
  },
  {
    slug: "defensa-holandesa/muro-de-piedra",
    slugEn: "dutch-defense/stonewall",
    slugFr: "defense-hollandaise/mur-de-pierre",
    variantNodeId: "dutch-7b1",
    parentNodeId: "dutch-1",
    title: "Variante Muro de Piedra | Defensa Holandesa | Aperturas de Ajedrez",
    titleEn: "Stonewall Variation | Dutch Defense | Chess Openings",
    titleFr:
      "Variante Mur de Pierre | Défense Hollandaise | Ouvertures d'Échecs",
    description:
      "Estudia la Variante Muro de Piedra de la Defensa Holandesa (2...e6 3...d5): estructura sólida con peones en d5-e6-f5, formación defensiva característica.",
    descriptionEn:
      "Study the Stonewall Variation of the Dutch Defense (2...e6 3...d5): solid structure with pawns on d5-e6-f5, characteristic defensive formation.",
    descriptionFr:
      "Étudiez la Variante Mur de Pierre de la Défense Hollandaise (2...e6 3...d5) : structure solide avec pions en d5-e6-f5, formation défensive caractéristique.",
  },
  {
    slug: "defensa-holandesa/clasica",
    slugEn: "dutch-defense/classical",
    slugFr: "defense-hollandaise/classique",
    variantNodeId: "dutch-7b2",
    parentNodeId: "dutch-1",
    title: "Variante Clásica | Defensa Holandesa | Aperturas de Ajedrez",
    titleEn: "Classical Variation | Dutch Defense | Chess Openings",
    titleFr: "Variante Classique | Défense Hollandaise | Ouvertures d'Échecs",
    description:
      "Explora la Variante Clásica de la Defensa Holandesa (2...e6 3...Be7): desarrollo flexible que mantiene opciones antes de comprometerse con d5.",
    descriptionEn:
      "Explore the Classical Variation of the Dutch Defense (2...e6 3...Be7): flexible development that keeps options before committing to d5.",
    descriptionFr:
      "Explorez la Variante Classique de la Défense Hollandaise (2...e6 3...Be7) : développement flexible qui maintient les options avant de s'engager sur d5.",
  },

  // ── Defensa Eslava ──────────────────────────────────────
  {
    slug: "defensa-eslava/variante-de-cambio",
    slugEn: "slav-defense/exchange-variation",
    slugFr: "defense-slave/variante-echange",
    variantNodeId: "qg-4ce",
    parentNodeId: "qg-3c",
    title: "Variante de Cambio | Defensa Eslava | Aperturas de Ajedrez",
    titleEn: "Exchange Variation | Slav Defense | Chess Openings",
    titleFr: "Variante d'Échange | Défense Slave | Ouvertures d'Échecs",
    description:
      "Explora la Variante de Cambio de la Defensa Eslava (3.cxd5 cxd5): las blancas simplifican el centro buscando igualdad con estructura simétrica de peones.",
    descriptionEn:
      "Explore the Exchange Variation of the Slav Defense (3.cxd5 cxd5): White simplifies the center seeking equality with a symmetrical pawn structure.",
    descriptionFr:
      "Explorez la Variante d'Échange de la Défense Slave (3.cxd5 cxd5) : les Blancs simplifient le centre en cherchant l'égalité avec une structure de pions symétrique.",
  },
  {
    slug: "defensa-eslava/eslava-aceptada",
    slugEn: "slav-defense/accepted-slav",
    slugFr: "defense-slave/slave-acceptee",
    variantNodeId: "qg-7c1",
    parentNodeId: "qg-3c",
    title: "Eslava Aceptada | Defensa Eslava | Aperturas de Ajedrez",
    titleEn: "Accepted Slav | Slav Defense | Chess Openings",
    titleFr: "Slave Acceptée | Défense Slave | Ouvertures d'Échecs",
    description:
      "Aprende la Eslava Aceptada (4...dxc4): las negras conservan el peón con b5, llevando a posiciones tácticas con el avance blanco a4.",
    descriptionEn:
      "Learn the Accepted Slav (4...dxc4): Black holds the pawn with b5, leading to tactical positions with White's a4 advance.",
    descriptionFr:
      "Apprenez la Slave Acceptée (4...dxc4) : les Noirs conservent le pion avec b5, menant à des positions tactiques avec l'avance blanche a4.",
  },
  {
    slug: "defensa-eslava/semi-eslava",
    slugEn: "slav-defense/semi-slav",
    slugFr: "defense-slave/semi-slave",
    variantNodeId: "qg-7c2",
    parentNodeId: "qg-3c",
    title: "Semi-Eslava | Defensa Eslava | Aperturas de Ajedrez",
    titleEn: "Semi-Slav | Slav Defense | Chess Openings",
    titleFr: "Semi-Slave | Défense Slave | Ouvertures d'Échecs",
    description:
      "Estudia la Semi-Eslava (4...e6): la combinación de c6 y e6 crea tensiones únicas con las variantes Merano y Anti-Merano, muy afiladas.",
    descriptionEn:
      "Study the Semi-Slav (4...e6): the combination of c6 and e6 creates unique tensions with the sharp Merano and Anti-Merano variations.",
    descriptionFr:
      "Étudiez la Semi-Slave (4...e6) : la combinaison de c6 et e6 crée des tensions uniques avec les variantes Merano et Anti-Merano, très aiguës.",
  },
  {
    slug: "defensa-eslava/clasica",
    slugEn: "slav-defense/classical",
    slugFr: "defense-slave/classique",
    variantNodeId: "qg-7c3",
    parentNodeId: "qg-3c",
    title: "Línea Clásica | Defensa Eslava | Aperturas de Ajedrez",
    titleEn: "Classical Variation | Slav Defense | Chess Openings",
    titleFr: "Variante Classique | Défense Slave | Ouvertures d'Échecs",
    description:
      "Domina la Línea Clásica de la Defensa Eslava (4...Bf5): las negras desarrollan el alfil antes de jugar e6, manteniendo la actividad de piezas.",
    descriptionEn:
      "Master the Classical Variation of the Slav Defense (4...Bf5): Black develops the bishop before playing e6, maintaining piece activity.",
    descriptionFr:
      "Maîtrisez la Variante Classique de la Défense Slave (4...Ff5) : les Noirs développent le fou avant de jouer e6, maintenant l'activité des pièces.",
  },

  // ── Defensa Moderna ──────────────────────────────────────
  {
    slug: "defensa-moderna/ataque-austriaco",
    slugEn: "modern-defense/austrian-attack",
    slugFr: "defense-moderne/attaque-autrichienne",
    variantNodeId: "mod-6a",
    parentNodeId: "mod-1",
    title: "Ataque Austriaco | Defensa Moderna | Aperturas de Ajedrez",
    titleEn: "Austrian Attack | Modern Defense | Chess Openings",
    titleFr: "Attaque Autrichienne | Défense Moderne | Ouvertures d'Échecs",
    description:
      "Aprende el Ataque Austriaco de la Defensa Moderna (4.f4): la continuación más agresiva, preparando el avance f5 y la presión sobre el flanco de rey.",
    descriptionEn:
      "Learn the Austrian Attack of the Modern Defense (4.f4): the most aggressive continuation, preparing the f5 advance and kingside pressure.",
    descriptionFr:
      "Apprenez l'Attaque Autrichienne de la Défense Moderne (4.f4) : la continuation la plus agressive, préparant l'avance f5 et la pression sur l'aile roi.",
  },
  {
    slug: "defensa-moderna/clasica",
    slugEn: "modern-defense/classical",
    slugFr: "defense-moderne/classique",
    variantNodeId: "mod-6b",
    parentNodeId: "mod-1",
    title: "Variante Clásica | Defensa Moderna | Aperturas de Ajedrez",
    titleEn: "Classical Variation | Modern Defense | Chess Openings",
    titleFr: "Variante Classique | Défense Moderne | Ouvertures d'Échecs",
    description:
      "Estudia la Variante Clásica de la Defensa Moderna (4.Cf3): desarrollo sólido con Be2 y enroque corto, manteniendo la tensión central.",
    descriptionEn:
      "Study the Classical Variation of the Modern Defense (4.Nf3): solid development with Be2 and kingside castling, maintaining central tension.",
    descriptionFr:
      "Étudiez la Variante Classique de la Défense Moderne (4.Cf3) : développement solide avec Fe2 et roque côté roi, maintenant la tension centrale.",
  },
  {
    slug: "defensa-nimzowitsch/avanzada",
    slugEn: "nimzowitsch-defense/advance",
    slugFr: "defense-nimzowitsch/avancee",
    variantNodeId: "nw-7a",
    parentNodeId: "nw-1",
    title: "Variante Avanzada | Nimzowitsch | Aperturas de Ajedrez",
    titleEn: "Advance Variation | Nimzowitsch | Chess Openings",
    titleFr: "Variante Avancée | Nimzowitsch | Ouvertures d'Échecs",
    description:
      "Estudia la Variante Avanzada de la Defensa Nimzowitsch (3.e5 Af5): las blancas avanzan el peón e creando espacio, mientras las negras desarrollan el alfil fuera de la cadena.",
    descriptionEn:
      "Study the Advance Variation of the Nimzowitsch Defense (3.e5 Bf5): White advances the e-pawn gaining space while Black develops the bishop outside the pawn chain.",
    descriptionFr:
      "Étudiez la Variante Avancée de la Défense Nimzowitsch (3.e5 Ff5) : les Blancs avancent le pion e en gagnant de l'espace tandis que les Noirs développent le fou hors de la chaîne.",
  },
  {
    slug: "defensa-nimzowitsch/intercambio",
    slugEn: "nimzowitsch-defense/exchange",
    slugFr: "defense-nimzowitsch/echange",
    variantNodeId: "nw-7b",
    parentNodeId: "nw-1",
    title: "Variante de Intercambio | Nimzowitsch | Aperturas de Ajedrez",
    titleEn: "Exchange Variation | Nimzowitsch | Chess Openings",
    titleFr: "Variante d'Échange | Nimzowitsch | Ouvertures d'Échecs",
    description:
      "Explora la Variante de Intercambio de la Defensa Nimzowitsch (3.exd5 Dxd5): posición abierta con la dama negra activa en d5 y tensión central inmediata.",
    descriptionEn:
      "Explore the Exchange Variation of the Nimzowitsch Defense (3.exd5 Qxd5): open position with Black's active queen on d5 and immediate central tension.",
    descriptionFr:
      "Explorez la Variante d'Échange de la Défense Nimzowitsch (3.exd5 Dxd5) : position ouverte avec la dame noire active en d5 et tension centrale immédiate.",
  },
  {
    slug: "defensa-nimzowitsch/kennedy",
    slugEn: "nimzowitsch-defense/kennedy",
    slugFr: "defense-nimzowitsch/kennedy",
    variantNodeId: "nw-7c",
    parentNodeId: "nw-1",
    title: "Variante Kennedy | Nimzowitsch | Aperturas de Ajedrez",
    titleEn: "Kennedy Variation | Nimzowitsch | Chess Openings",
    titleFr: "Variante Kennedy | Nimzowitsch | Ouvertures d'Échecs",
    description:
      "Aprende la Variante Kennedy de la Defensa Nimzowitsch (2...e5): las negras contraatacan el centro inmediatamente con e5, buscando juego dinámico y desequilibrado.",
    descriptionEn:
      "Learn the Kennedy Variation of the Nimzowitsch Defense (2...e5): Black immediately counterattacks the center with e5, seeking dynamic and unbalanced play.",
    descriptionFr:
      "Apprenez la Variante Kennedy de la Défense Nimzowitsch (2...e5) : les Noirs contre-attaquent immédiatement le centre avec e5, cherchant un jeu dynamique et déséquilibré.",
  },
  // ── Apertura Zukertort ────────────────────────────────────
  {
    slug: "apertura-zukertort/variante-clasica",
    slugEn: "zukertort-opening/classical-variation",
    slugFr: "ouverture-zukertort/variante-classique",
    variantNodeId: "zuk-8a",
    parentNodeId: "nf3",
    title: "Variante Clásica | Apertura Zukertort | Aperturas de Ajedrez",
    titleEn: "Classical Variation | Zukertort Opening | Chess Openings",
    titleFr: "Variante Classique | Ouverture Zukertort | Ouvertures d'Échecs",
    description:
      "Estudia la Variante Clásica de la Apertura Zukertort (1.Cf3 d5 2.b3 Cf6 3.Ab2 e6 4.e3 Ae7 5.d4): juego posicional sólido con estructura equilibrada y plan de Ce5.",
    descriptionEn:
      "Study the Classical Variation of the Zukertort Opening (1.Nf3 d5 2.b3 Nf6 3.Bb2 e6 4.e3 Be7 5.d4): solid positional play with a balanced structure and the Nd2-e5 plan.",
    descriptionFr:
      "Étudiez la Variante Classique de l'Ouverture Zukertort (1.Cf3 d5 2.b3 Cf6 3.Fb2 e6 4.e3 Fe7 5.d4) : jeu positionnel solide avec une structure équilibrée et le plan Cd2-e5.",
  },
  {
    slug: "apertura-zukertort/doble-fiancheto",
    slugEn: "zukertort-opening/double-fianchetto",
    slugFr: "ouverture-zukertort/double-fianchetto",
    variantNodeId: "zuk-8b",
    parentNodeId: "nf3",
    title: "Doble Fiancheto | Apertura Zukertort | Aperturas de Ajedrez",
    titleEn: "Double Fianchetto | Zukertort Opening | Chess Openings",
    titleFr: "Double Fianchetto | Ouverture Zukertort | Ouvertures d'Échecs",
    description:
      "Explora el Doble Fiancheto Nimzo-Larsen de la Apertura Zukertort (1.Cf3 d5 2.b3 Cf6 3.Ab2 g6 4.g3 Ag7 5.Ag2): ambos bandos fianchetan el alfil de rey en posiciones cerradas.",
    descriptionEn:
      "Explore the Nimzo-Larsen Double Fianchetto of the Zukertort Opening (1.Nf3 d5 2.b3 Nf6 3.Bb2 g6 4.g3 Bg7 5.Bg2): both sides fianchetto the kingside bishop in closed strategic positions.",
    descriptionFr:
      "Explorez le Double Fianchetto Nimzo-Larsen de l'Ouverture Zukertort (1.Cf3 d5 2.b3 Cf6 3.Fb2 g6 4.g3 Fg7 5.Fg2) : les deux camps fianchettent le fou de roi dans des positions stratégiques fermées.",
  },
  {
    slug: "apertura-zukertort/pirc-invertido",
    slugEn: "zukertort-opening/reversed-pirc",
    slugFr: "ouverture-zukertort/pirc-inverse",
    variantNodeId: "zuk-8c",
    parentNodeId: "nf3",
    title: "Pirc Invertido | Apertura Zukertort | Aperturas de Ajedrez",
    titleEn: "Reversed Pirc | Zukertort Opening | Chess Openings",
    titleFr: "Pirc Inversé | Ouverture Zukertort | Ouvertures d'Échecs",
    description:
      "Aprende el Pirc Invertido de la Apertura Zukertort (1.Cf3 d5 2.b3 c5 3.Ab2 Cc6 4.e3 e5 5.d4): negras ocupan el centro agresivamente, blancas responden con d4.",
    descriptionEn:
      "Learn the Reversed Pirc of the Zukertort Opening (1.Nf3 d5 2.b3 c5 3.Bb2 Nc6 4.e3 e5 5.d4): Black aggressively seizes the center, White responds with d4.",
    descriptionFr:
      "Apprenez le Pirc Inversé de l'Ouverture Zukertort (1.Cf3 d5 2.b3 c5 3.Fb2 Cc6 4.e3 e5 5.d4) : les Noirs occupent le centre agressivement, les Blancs répondent avec d4.",
  },
  {
    slug: "apertura-zukertort/gambito-ross",
    slugEn: "zukertort-opening/ross-gambit",
    slugFr: "ouverture-zukertort/gambit-ross",
    variantNodeId: "zuk-4c",
    parentNodeId: "nf3",
    title: "Gambito Ross | Apertura Zukertort | Aperturas de Ajedrez",
    titleEn: "Ross Gambit | Zukertort Opening | Chess Openings",
    titleFr: "Gambit Ross | Ouverture Zukertort | Ouvertures d'Échecs",
    description:
      "Estudia el Gambito Ross de la Apertura Zukertort (1.Cf3 e5 2.Cxe5 d6 3.Cf3): blancas aceptan el peón negro con ventaja material mientras negras buscan compensación posicional.",
    descriptionEn:
      "Study the Ross Gambit of the Zukertort Opening (1.Nf3 e5 2.Nxe5 d6 3.Nf3): White accepts Black's pawn with a material advantage while Black seeks positional compensation.",
    descriptionFr:
      "Étudiez le Gambit Ross de l'Ouverture Zukertort (1.Cf3 e5 2.Cxe5 d6 3.Cf3) : les Blancs acceptent le pion noir avec un avantage matériel tandis que les Noirs cherchent une compensation positionnelle.",
  },
];

export const OPENING_ROUTES = OPENING_ROUTE_DEFS.map((route) => ({
  access: OPENING_ENTRY_BY_NODE_ID[route.nodeId]?.access ?? "free",
  discoverable: OPENING_ENTRY_BY_NODE_ID[route.nodeId]?.discoverable ?? true,
  ...route,
}));

export const VARIANT_ROUTES = VARIANT_ROUTE_DEFS.map((route) => ({
  access: VARIANT_ENTRY_BY_NODE_ID[route.variantNodeId]?.access ?? "free",
  discoverable:
    VARIANT_ENTRY_BY_NODE_ID[route.variantNodeId]?.discoverable ?? true,
  ...route,
}));

/** Map from slug → opening route */
export const ROUTE_BY_SLUG = Object.fromEntries(
  OPENING_ROUTES.flatMap((r) => [
    [r.slug, r],
    [r.slugEn, r],
    [r.slugFr, r],
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
    [r.slugFr, r],
  ]),
);

/** Map from variantNodeId → variant route */
export const VARIANT_ROUTE_BY_NODE_ID = Object.fromEntries(
  VARIANT_ROUTES.map((r) => [r.variantNodeId, r]),
);
