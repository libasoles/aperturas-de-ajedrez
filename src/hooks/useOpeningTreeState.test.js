/**
 * Tests for useOpeningTreeState — focused on menu-selection behaviour.
 *
 * Coverage targets:
 *   • toggleOpening: sets selectedNodeId to the opening root node on activation
 *   • toggleOpening: preserves selectedNodeId when deactivating (toggling off)
 *   • toggleOpening: correctly switches selectedNodeId when changing openings
 *   • toggleVariant: sets selectedNodeId to the variant node on activation
 *   • toggleVariant: also sets activeOpening to the variant's parent opening
 *   • toggleVariant: preserves selectedNodeId when deactivating
 *   • toggleVariant: is a no-op for unknown variant node IDs
 */

import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

// ── Mocks (hoisted by Vitest) ────────────────────────────────────────────────

// i18n calls dynamic import() at module load — mock the whole thing.
vi.mock("../i18n", () => ({
  default: { changeLanguage: vi.fn(), language: "es" },
}));

// react-ga4 is only used when analytics is initialised (which it won't be in
// tests since VITE_GA_MEASUREMENT_ID is unset), but mock it anyway to keep
// the import graph clean.
vi.mock("../lib/analytics", () => ({
  trackPremiumNodeClick: vi.fn(),
  trackPremiumMenuClick: vi.fn(),
  initAnalytics: vi.fn(),
}));

// ── Subject under test ───────────────────────────────────────────────────────

import { useOpeningTreeState } from "./useOpeningTreeState";

// ── Helpers ──────────────────────────────────────────────────────────────────

beforeEach(() => {
  // Prevent actual URL mutations from polluting test output / JSDOM state.
  vi.spyOn(history, "pushState").mockImplementation(() => {});
  vi.spyOn(history, "replaceState").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

// ── toggleOpening ─────────────────────────────────────────────────────────────

describe("toggleOpening", () => {
  it("sets selectedNodeId to the opening root node when activating", () => {
    const { result } = renderHook(() => useOpeningTreeState());

    act(() => {
      result.current.toggleOpening("scan-1");
    });

    expect(result.current.selectedNodeId).toBe("scan-1");
    expect(result.current.activeOpening).toBe("scan-1");
  });

  it("preserves selectedNodeId when deactivating the same opening", () => {
    const { result } = renderHook(() => useOpeningTreeState());

    act(() => {
      result.current.toggleOpening("scan-1");
    });
    expect(result.current.selectedNodeId).toBe("scan-1");

    // Toggle off — the board should stay on the last viewed position.
    act(() => {
      result.current.toggleOpening("scan-1");
    });
    expect(result.current.selectedNodeId).toBe("scan-1");
    expect(result.current.activeOpening).toBeNull();
  });

  it("updates selectedNodeId when switching to a different opening", () => {
    const { result } = renderHook(() => useOpeningTreeState());

    act(() => {
      result.current.toggleOpening("scan-1"); // Scandinavian
    });
    expect(result.current.selectedNodeId).toBe("scan-1");

    act(() => {
      result.current.toggleOpening("sic-1"); // Sicilian
    });
    expect(result.current.selectedNodeId).toBe("sic-1");
    expect(result.current.activeOpening).toBe("sic-1");
  });

  it("does not affect activeVariant — it is cleared on every toggleOpening call", () => {
    const { result } = renderHook(() => useOpeningTreeState());

    // First activate a variant so activeVariant is non-null.
    act(() => {
      result.current.toggleVariant("scan-5a1");
    });
    expect(result.current.activeVariant).toBe("scan-5a1");

    // Now switch opening — variant filter must clear.
    act(() => {
      result.current.toggleOpening("sic-1");
    });
    expect(result.current.activeVariant).toBeNull();
    expect(result.current.selectedNodeId).toBe("sic-1");
  });
});

// ── toggleVariant ─────────────────────────────────────────────────────────────

describe("toggleVariant", () => {
  it("sets selectedNodeId to the variant node when activating", () => {
    const { result } = renderHook(() => useOpeningTreeState());

    act(() => {
      result.current.toggleVariant("scan-5a1");
    });

    expect(result.current.selectedNodeId).toBe("scan-5a1");
    expect(result.current.activeVariant).toBe("scan-5a1");
  });

  it("also sets activeOpening to the variant's parent opening", () => {
    const { result } = renderHook(() => useOpeningTreeState());

    act(() => {
      result.current.toggleVariant("scan-5a1"); // parent: scan-1 (Scandinavian)
    });

    expect(result.current.activeOpening).toBe("scan-1");
  });

  it("preserves selectedNodeId when deactivating the same variant", () => {
    const { result } = renderHook(() => useOpeningTreeState());

    act(() => {
      result.current.toggleVariant("scan-5a1");
    });
    expect(result.current.selectedNodeId).toBe("scan-5a1");

    // Toggle off — board stays on last viewed position.
    act(() => {
      result.current.toggleVariant("scan-5a1");
    });
    expect(result.current.selectedNodeId).toBe("scan-5a1");
    expect(result.current.activeVariant).toBeNull();
  });

  it("updates selectedNodeId when switching between variants", () => {
    const { result } = renderHook(() => useOpeningTreeState());

    act(() => {
      result.current.toggleVariant("scan-5a1"); // Mieses-Kotroc
    });
    expect(result.current.selectedNodeId).toBe("scan-5a1");

    act(() => {
      result.current.toggleVariant("scan-5a2"); // Classical
    });
    expect(result.current.selectedNodeId).toBe("scan-5a2");
    expect(result.current.activeVariant).toBe("scan-5a2");
  });

  it("is a no-op when given an unknown variant nodeId", () => {
    const { result } = renderHook(() => useOpeningTreeState());

    const selectedBefore = result.current.selectedNodeId;
    const variantBefore = result.current.activeVariant;

    act(() => {
      result.current.toggleVariant("nonexistent-variant-xyz");
    });

    expect(result.current.selectedNodeId).toBe(selectedBefore);
    expect(result.current.activeVariant).toBe(variantBefore);
  });
});

describe("premium gating", () => {
  it("does not open the premium overlay when access is enabled", () => {
    vi.stubEnv("VITE_HAS_PREMIUM_ACCESS", "1");

    const { result } = renderHook(() => useOpeningTreeState());
    const premiumNode = result.current.nodes.find(
      (node) => node.id === "mod-1",
    );

    expect(premiumNode).toBeDefined();

    act(() => {
      premiumNode.data.onSelect("mod-1");
    });

    expect(result.current.selectedNodeId).toBe("mod-1");
    expect(result.current.premiumOverlayVersion).toBe(0);
  });

  it("opens the premium overlay when access is disabled", () => {
    vi.stubEnv("VITE_HAS_PREMIUM_ACCESS", "0");

    const { result } = renderHook(() => useOpeningTreeState());
    const premiumNode = result.current.nodes.find(
      (node) => node.id === "mod-1",
    );

    expect(premiumNode).toBeDefined();

    act(() => {
      premiumNode.data.onSelect("mod-1");
    });

    expect(result.current.selectedNodeId).toBe("mod-1");
    expect(result.current.premiumOverlayVersion).toBe(1);
  });
});
