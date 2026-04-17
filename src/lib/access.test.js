import { afterEach, describe, expect, it, vi } from "vitest";

import { canAccessContent, hasPremiumAccess } from "./access";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("hasPremiumAccess", () => {
  it("enables premium access only with the numeric env flag", () => {
    vi.stubEnv("VITE_PREMIUM_ACCESS", "1");

    expect(hasPremiumAccess()).toBe(true);
  });

  it("treats missing or non-1 values as no premium access", () => {
    vi.stubEnv("VITE_PREMIUM_ACCESS", "0");

    expect(hasPremiumAccess()).toBe(false);
  });
});

describe("canAccessContent", () => {
  it("always allows free content", () => {
    expect(canAccessContent("free")).toBe(true);
  });

  it("blocks premium content when premium access is disabled", () => {
    vi.stubEnv("VITE_PREMIUM_ACCESS", "0");

    expect(canAccessContent("premium")).toBe(false);
  });
});
