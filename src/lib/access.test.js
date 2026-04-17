import { afterEach, describe, expect, it, vi } from "vitest";

import { canAccessContent, hasPremiumAccess } from "./access";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("hasPremiumAccess", () => {
  it("grants access when VITE_PREMIUM_ACCESS is 1", () => {
    vi.stubEnv("VITE_PREMIUM_ACCESS", "1");

    expect(hasPremiumAccess()).toBe(true);
  });

  it("blocks access when VITE_PREMIUM_ACCESS is 0 (simulates gated user)", () => {
    vi.stubEnv("VITE_PREMIUM_ACCESS", "0");

    expect(hasPremiumAccess()).toBe(false);
  });
});

describe("canAccessContent", () => {
  it("always allows free content", () => {
    expect(canAccessContent("free")).toBe(true);
  });

  it("blocks premium content when VITE_PREMIUM_ACCESS=0 (gating enabled)", () => {
    vi.stubEnv("VITE_PREMIUM_ACCESS", "0");

    expect(canAccessContent("premium")).toBe(false);
  });
});
