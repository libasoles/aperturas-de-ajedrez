import { describe, expect, it } from "vitest";
import {
  detectLocaleFromPathname,
  localizedPath,
  stripLocalePrefix,
} from "./locale";

const englishDomain = { hostname: "chessopenings.com.ar" };

describe("domain locale helpers", () => {
  it("detects English on chessopenings.com.ar without a locale prefix", () => {
    expect(
      detectLocaleFromPathname("/", { location: englishDomain, htmlLang: "es" }),
    ).toBe("en");
    expect(
      stripLocalePrefix("/sicilian-defense/", { location: englishDomain }),
    ).toEqual({ locale: "en", path: "/sicilian-defense/" });
  });

  it("keeps English URLs clean on the English domain", () => {
    expect(
      localizedPath({
        locale: "en",
        slug: "sicilian-defense",
        location: englishDomain,
      }),
    ).toBe("/sicilian-defense/");
    expect(localizedPath({ locale: "en", slug: "sicilian-defense" })).toBe(
      "/en/sicilian-defense/",
    );
  });
});
