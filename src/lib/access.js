export function hasPremiumAccess() {
  return import.meta.env.VITE_PREMIUM_ACCESS === "1";
}

export function canAccessContent(accessLevel = "free") {
  return accessLevel !== "premium" || hasPremiumAccess();
}
