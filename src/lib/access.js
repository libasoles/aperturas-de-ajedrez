export function hasPremiumAccess() {
  const premiumAccessFlag = process.env.NEXT_PUBLIC_HAS_PREMIUM_ACCESS;

  return premiumAccessFlag !== "0";
}

export function canAccessContent(accessLevel = "free") {
  return accessLevel !== "premium" || hasPremiumAccess();
}
