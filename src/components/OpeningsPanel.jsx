import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { detectLocale } from "../hooks/useOpeningTreeState";
import { hasPremiumAccess } from "../lib/access";
import { trackPremiumMenuClick } from "../lib/analytics";
import FloatingPanel from "./FloatingPanel";
import PremiumLockIcon from "./PremiumLockIcon";
import {
  DESKTOP_OPENINGS_PANEL_BOTTOM,
  DESKTOP_PANEL_RIGHT,
} from "./panelLayout";

export default function OpeningsPanel({
  openings,
  variantRoutes = [],
  activeOpening,
  activeVariant = null,
  onToggleOpening,
  onToggleVariant = () => {},
  firstButtonRef,
}) {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const locale = detectLocale();
  const variantsByParent = useMemo(() => {
    const map = new Map();
    for (const variant of variantRoutes) {
      if (!map.has(variant.parentNodeId)) {
        map.set(variant.parentNodeId, []);
      }
      map.get(variant.parentNodeId).push(variant);
    }
    return map;
  }, [variantRoutes]);

  const handleOpeningClick = (opening) => {
    if (opening.access === "premium") {
      trackPremiumMenuClick("premium_menu_opening_click", {
        node_id: opening.nodeId,
        opening_id: opening.nodeId,
        surface: "desktop_panel_opening",
        locale,
        has_access: hasPremiumAccess(),
      });
    }

    if (activeOpening === opening.nodeId && activeVariant != null) {
      onToggleVariant(activeVariant);
    } else {
      onToggleOpening(opening.nodeId);
    }
  };

  const handleVariantClick = (variant) => {
    if (variant.access === "premium") {
      trackPremiumMenuClick("premium_menu_variant_click", {
        variant_node_id: variant.variantNodeId,
        opening_id: variant.parentNodeId,
        surface: "desktop_panel_variant",
        locale,
        has_access: hasPremiumAccess(),
      });
    }

    onToggleVariant(variant.variantNodeId);
  };

  const getVariantLabel = (variantRoute) => {
    const title =
      locale === "en"
        ? variantRoute.titleEn
        : locale === "fr"
          ? variantRoute.titleFr
          : variantRoute.title;
    return title.split(" | ")[0];
  };

  return (
    <FloatingPanel
      defaultPosition={{
        bottom: DESKTOP_OPENINGS_PANEL_BOTTOM,
        right: DESKTOP_PANEL_RIGHT,
      }}
      width={492}
      defaultHeight={collapsed ? undefined : 300}
      resizable
      minWidth={420}
      minHeight={220}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-neon-purple/70">
          {t("openings_panel.header")}
        </span>
        <div
          className="flex items-center gap-3"
          onMouseDown={(event) => event.stopPropagation()}
        >
          <button
            tabIndex={-1}
            onClick={() => setCollapsed((current) => !current)}
            className="font-mono text-[14px] leading-none transition-all duration-150 hover:brightness-150 text-neon-purple/50"
          >
            {collapsed ? "▸" : "▾"}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="min-h-0 flex-1 flex flex-col gap-3 px-4 pb-4 overflow-y-auto">
          {openings.map((group, groupIndex) => (
            <div key={group.group} className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neon-cyan/50">
                {t(`panel_groups.${group.group}`, group.group)}
              </span>
              <div className="flex flex-col gap-1">
                {group.openings.map((opening, openingIndex) => {
                  const isActive = activeOpening === opening.nodeId;
                  const variants = variantsByParent.get(opening.nodeId) ?? [];

                  return (
                    <div key={opening.nodeId} className="flex flex-col gap-0.5">
                      <button
                        ref={
                          groupIndex === 0 && openingIndex === 0
                            ? firstButtonRef
                            : undefined
                        }
                        onClick={() => handleOpeningClick(opening)}
                        className="flex min-h-9 w-full items-center gap-2 border-l px-3 py-2 text-left transition-all duration-150 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer hover:brightness-125"
                        style={{
                          borderColor: isActive
                            ? opening.glow
                            : `${opening.color}40`,
                          background: isActive
                            ? `${opening.color}20`
                            : `${opening.color}08`,
                          boxShadow: isActive
                            ? `0 0 12px ${opening.glow}30`
                            : "none",
                          outlineColor: opening.glow,
                        }}
                      >
                        <span
                          className="inline-block w-2 h-2 shrink-0 transition-all duration-150"
                          style={{
                            backgroundColor: isActive
                              ? opening.color
                              : "transparent",
                            border: `1px solid ${opening.color}`,
                            boxShadow: isActive
                              ? `0 0 6px ${opening.glow}`
                              : "none",
                          }}
                        />
                        <span
                          className="min-w-0 flex-1 font-mono text-[13px] tracking-wide"
                          style={{
                            color: isActive
                              ? opening.text
                              : `${opening.text}cc`,
                            textShadow: isActive
                              ? `0 0 6px ${opening.glow}80`
                              : "none",
                          }}
                        >
                          {t(`panel_openings.${opening.nodeId}`, opening.label)}
                        </span>
                        {opening.access === "premium" &&
                          !hasPremiumAccess() && (
                            <PremiumLockIcon
                              className="w-3.5 h-3.5 shrink-0"
                              title="Contenido premium"
                            />
                          )}
                      </button>

                      {variants.map((variant) => {
                        const isVariantActive =
                          activeVariant === variant.variantNodeId;

                        return (
                          <button
                            key={variant.variantNodeId}
                            onClick={() => handleVariantClick(variant)}
                            className="ml-5 flex min-h-8 items-center gap-2 border-l px-3 py-1.5 text-left transition-all duration-150 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer hover:brightness-125"
                            style={{
                              borderColor: isVariantActive
                                ? opening.glow
                                : "transparent",
                              background: isVariantActive
                                ? `${opening.color}18`
                                : "transparent",
                              outlineColor: opening.glow,
                            }}
                          >
                            <span
                              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{
                                backgroundColor: isVariantActive
                                  ? opening.glow
                                  : `${opening.color}70`,
                                boxShadow: isVariantActive
                                  ? `0 0 6px ${opening.glow}`
                                  : "none",
                              }}
                            />
                            <span
                              className="min-w-0 flex-1 font-mono text-[12px] leading-snug"
                              style={{
                                color: isVariantActive
                                  ? opening.text
                                  : `${opening.text}90`,
                                textShadow: isVariantActive
                                  ? `0 0 6px ${opening.glow}60`
                                  : "none",
                              }}
                            >
                              {getVariantLabel(variant)}
                            </span>
                            {variant.access === "premium" &&
                              !hasPremiumAccess() && (
                                <PremiumLockIcon
                                  className="w-3.5 h-3.5 shrink-0"
                                  title="Contenido premium"
                                />
                              )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </FloatingPanel>
  );
}
