export function hasPremiumAccess() {
  const premiumAccessFlag = import.meta.env.VITE_HAS_PREMIUM_ACCESS;

  return premiumAccessFlag === "1";
}

export function canAccessContent(accessLevel = "free") {
  return accessLevel !== "premium" || hasPremiumAccess();
}
