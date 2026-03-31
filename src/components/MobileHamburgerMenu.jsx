import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PANEL_OPENINGS, detectLocale } from "../hooks/useOpeningTreeState";
import { VARIANT_ROUTES } from "../data/routes";

// Build Map<parentNodeId, variantRoute[]> once at module level
const VARIANTS_BY_PARENT = new Map();
for (const v of VARIANT_ROUTES) {
  if (!VARIANTS_BY_PARENT.has(v.parentNodeId)) {
    VARIANTS_BY_PARENT.set(v.parentNodeId, []);
  }
  VARIANTS_BY_PARENT.get(v.parentNodeId).push(v);
}

// Locale-aware variant label: "Variante Mieses-Kotroc | Escandinava | ..." → "Variante Mieses-Kotroc"
function getVariantLabel(variantRoute, locale) {
  const title =
    locale === "en"
      ? variantRoute.titleEn
      : locale === "fr"
        ? variantRoute.titleFr
        : variantRoute.title;
  return title.split(" | ")[0];
}

export default function MobileHamburgerMenu({
  activeOpening,
  activeVariant,
  onToggleOpening,
  onToggleVariant,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const locale = detectLocale();

  const handleOpeningClick = (nodeId) => {
    // If a child variant is active for this opening, clicking the parent
    // should deactivate the variant while keeping the opening active —
    // not toggle the opening off (which is what toggleOpening would do
    // since activeOpening === nodeId was set by toggleVariant).
    if (activeOpening === nodeId && activeVariant !== null) {
      onToggleVariant(activeVariant); // clears variant, keeps opening active
    } else {
      onToggleOpening(nodeId);
    }
    setIsOpen(false);
  };

  const handleVariantClick = (variantNodeId) => {
    onToggleVariant(variantNodeId);
    setIsOpen(false);
  };

  return (
    <>
      {/*
       * Hamburger trigger button.
       * CSS bottom-left = visual top-left when phone held landscape (rotated 90° CW).
       * The ☰ icon is rotated -90° so it appears upright in landscape.
       */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label={t("hamburger_menu.open", "Abrir menú")}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          zIndex: 50,
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(10, 10, 20, 0.85)",
          border: "none",
          borderTopRightRadius: 6,
          color: "var(--color-neon-purple)",
          cursor: "pointer",
          backdropFilter: "blur(4px)",
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: 20,
            lineHeight: 1,
            transform: "rotate(-90deg)",
          }}
        >
          ☰
        </span>
      </button>

      {/* Full-screen landscape menu overlay */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 51,
            overflow: "hidden",
          }}
        >
          {/*
           * Inner rotated panel — mirrors the MobileChessBoard rotation pattern:
           *   - Centered at 50%/50%
           *   - rotate(-90deg) = content appears in landscape orientation
           *   - width: 100vh (the tall CSS dimension → becomes the visual landscape width)
           *   - height: 100vw (the narrow CSS dimension → becomes the visual landscape height)
           * Inside this div, coordinates align naturally with landscape:
           *   local left = landscape left, local top = landscape top.
           */}
          <div
            className="panel"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(-90deg)",
              width: "100vh",
              height: "100vw",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              background: "var(--color-app)",
              borderRadius: 0,
              border: "none",
            }}
          >
            {/* Header */}
            <div
              className="panel-divider"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 16px",
                flexShrink: 0,
              }}
            >
              <span
                className="font-mono uppercase"
                style={{
                  fontSize: 11,
                  letterSpacing: "0.35em",
                  color:
                    "color-mix(in srgb, var(--color-neon-purple) 70%, transparent)",
                }}
              >
                {t("openings_panel.header")}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label={t("hamburger_menu.close", "Cerrar menú")}
                style={{
                  background: "none",
                  border: "none",
                  color:
                    "color-mix(in srgb, var(--color-neon-purple) 50%, transparent)",
                  fontSize: 18,
                  lineHeight: 1,
                  cursor: "pointer",
                  padding: "4px 6px",
                }}
              >
                ✕
              </button>
            </div>

            {/*
             * Columns area — flex-row so each PANEL_OPENINGS group is a column.
             * Since local coordinates align with landscape, flex-row = side-by-side columns.
             */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "row",
                overflow: "hidden",
              }}
            >
              {PANEL_OPENINGS.map((group, groupIndex) => (
                <div
                  key={group.group}
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    borderRight:
                      groupIndex < PANEL_OPENINGS.length - 1
                        ? "1px solid color-mix(in srgb, var(--color-neon-purple) 12%, transparent)"
                        : "none",
                    padding: "8px 0",
                  }}
                >
                  {/* Group label */}
                  <div
                    className="font-mono uppercase"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.3em",
                      padding: "4px 12px 8px",
                      color:
                        "color-mix(in srgb, var(--color-neon-cyan) 50%, transparent)",
                    }}
                  >
                    {group.group}
                  </div>

                  {group.openings.map((opening) => {
                    const isOpeningActive = activeOpening === opening.nodeId;
                    const variants = VARIANTS_BY_PARENT.get(opening.nodeId) ?? [];

                    return (
                      <div key={opening.nodeId}>
                        {/* Opening row */}
                        <button
                          onClick={() => handleOpeningClick(opening.nodeId)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            width: "100%",
                            minHeight: 40,
                            padding: "0 12px",
                            background: isOpeningActive
                              ? `${opening.color}20`
                              : "transparent",
                            border: "none",
                            borderLeft: `3px solid ${
                              isOpeningActive
                                ? opening.glow
                                : `${opening.color}40`
                            }`,
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              flexShrink: 0,
                              background: isOpeningActive
                                ? opening.color
                                : "transparent",
                              border: `1px solid ${opening.color}`,
                              boxShadow: isOpeningActive
                                ? `0 0 6px ${opening.glow}`
                                : "none",
                            }}
                          />
                          <span
                            className="font-mono"
                            style={{
                              fontSize: 14,
                              color: isOpeningActive
                                ? opening.text
                                : `${opening.text}cc`,
                              textShadow: isOpeningActive
                                ? `0 0 6px ${opening.glow}80`
                                : "none",
                            }}
                          >
                            {t(
                              `panel_openings.${opening.nodeId}`,
                              opening.label
                            )}
                          </span>
                        </button>

                        {/* Variant rows — indented under parent opening */}
                        {variants.map((variant) => {
                          const isVariantActive =
                            activeVariant === variant.variantNodeId;
                          const label = getVariantLabel(variant, locale);

                          return (
                            <button
                              key={variant.variantNodeId}
                              onClick={() =>
                                handleVariantClick(variant.variantNodeId)
                              }
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                width: "100%",
                                minHeight: 36,
                                paddingLeft: 28,
                                paddingRight: 12,
                                background: isVariantActive
                                  ? `${opening.color}18`
                                  : "transparent",
                                border: "none",
                                borderLeft: `3px solid ${
                                  isVariantActive ? opening.glow : "transparent"
                                }`,
                                cursor: "pointer",
                                textAlign: "left",
                              }}
                            >
                              <span
                                style={{
                                  width: 4,
                                  height: 4,
                                  flexShrink: 0,
                                  borderRadius: "50%",
                                  background: isVariantActive
                                    ? opening.glow
                                    : `${opening.color}60`,
                                }}
                              />
                              <span
                                className="font-mono"
                                style={{
                                  fontSize: 13,
                                  color: isVariantActive
                                    ? opening.text
                                    : `${opening.text}80`,
                                  textShadow: isVariantActive
                                    ? `0 0 6px ${opening.glow}60`
                                    : "none",
                                  lineHeight: 1.3,
                                }}
                              >
                                {label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
