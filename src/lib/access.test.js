import { afterEach, describe, expect, it, vi } from "vitest";

import { canAccessContent, hasPremiumAccess } from "./access";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("hasPremiumAccess", () => {
  afterEach(() => {
    vi.stubEnv("VITE_HAS_PREMIUM_ACCESS", undefined);
  });

  it("denies access when VITE_HAS_PREMIUM_ACCESS is unset", () => {
    vi.stubEnv("VITE_HAS_PREMIUM_ACCESS", undefined);

    expect(hasPremiumAccess()).toBe(false);
  });

  it("grants access when VITE_HAS_PREMIUM_ACCESS is 1", () => {
    vi.stubEnv("VITE_HAS_PREMIUM_ACCESS", "1");

    expect(hasPremiumAccess()).toBe(true);
  });

  it("blocks access when VITE_HAS_PREMIUM_ACCESS is 0 (simulates gated user)", () => {
    vi.stubEnv("VITE_HAS_PREMIUM_ACCESS", "0");

    expect(hasPremiumAccess()).toBe(false);
  });

  it("blocks access when legacy VITE_HAS_PREMIUM_ACCESS is 0", () => {
    vi.stubEnv("VITE_HAS_PREMIUM_ACCESS", "0");

    expect(hasPremiumAccess()).toBe(false);
  });
});

describe("canAccessContent", () => {
  it("always allows free content", () => {
    expect(canAccessContent("free")).toBe(true);
  });

  it("blocks premium content when VITE_HAS_PREMIUM_ACCESS=0 (gating enabled)", () => {
    vi.stubEnv("VITE_HAS_PREMIUM_ACCESS", "0");
    expect(canAccessContent("premium")).toBe(false);
  });

  it("blocks premium content when VITE_HAS_PREMIUM_ACCESS is undefined (gating enabled)", () => {
    vi.stubEnv("VITE_HAS_PREMIUM_ACCESS", undefined);

    expect(canAccessContent("premium")).toBe(false);
  });
});
