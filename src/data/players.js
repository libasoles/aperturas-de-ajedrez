export const PLAYER_CATALOG = [
  {
    id: "capablanca",
    slug: "capablanca",
    name: "Jose Raul Capablanca",
    keyName: "Capablanca, Jose Raul",
    displayName: "Jose Raul Capablanca",
    title: "Jose Raul Capablanca",
    routes: {
      es: "jugadores/capablanca",
      en: "players/capablanca",
      fr: "joueurs/capablanca",
    },
  },
  {
    id: "alekhine",
    slug: "alekhine",
    name: "Alexander Alekhine",
    keyName: "Alekhine, Alexander",
    displayName: "Alexander Alekhine",
    title: "Alexander Alekhine",
    routes: {
      es: "jugadores/alekhine",
      en: "players/alekhine",
      fr: "joueurs/alekhine",
    },
  },
];

export const PLAYER_BY_SLUG = Object.fromEntries(
  PLAYER_CATALOG.flatMap((player) => [
    [player.slug, player],
    ...Object.values(player.routes).map((route) => [
      route.split("/").at(-1),
      player,
    ]),
  ]),
);

export function stripLocalePrefix(pathname) {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return { locale: "en", path: pathname.slice(3) || "/" };
  }
  if (pathname === "/fr" || pathname.startsWith("/fr/")) {
    return { locale: "fr", path: pathname.slice(3) || "/" };
  }
  return { locale: "es", path: pathname };
}

export function resolvePlayerRoute(pathname) {
  const { locale, path } = stripLocalePrefix(pathname);
  const slug = path.replace(/^\/|\/$/g, "");
  const player = PLAYER_CATALOG.find(
    (candidate) => candidate.routes[locale] === slug,
  );
  return player ? { locale, player } : null;
}

export function resolvePlayerBySlug(slug) {
  return PLAYER_BY_SLUG[slug] ?? null;
}
