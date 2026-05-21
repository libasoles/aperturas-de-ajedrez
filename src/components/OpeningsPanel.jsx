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

const OPENINGS_PANEL_DEFAULT_HEIGHT = 300;

const normalizeSearchText = (value, locale) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase(locale);

const getVariantLabelForLocale = (variantRoute, locale) => {
  const title =
    locale === "en"
      ? variantRoute.titleEn
      : locale === "fr"
        ? variantRoute.titleFr
        : variantRoute.title;
  return title.split(" | ")[0];
};

const getVariantNodeLabel = (variantNode, locale) =>
  variantNode.route
    ? getVariantLabelForLocale(variantNode.route, locale)
    : variantNode.variantNodeId;

const createVariantNode = (variant, variantRouteById, childrenByParent) => ({
  ...variant,
  route: variantRouteById.get(variant.variantNodeId) ?? null,
  children: (childrenByParent.get(variant.variantNodeId) ?? []).map((child) =>
    createVariantNode(child, variantRouteById, childrenByParent),
  ),
});

const filterVariantNodes = (nodes, query, locale) =>
  nodes
    .map((node) => {
      const children = filterVariantNodes(node.children, query, locale);
      const matches = normalizeSearchText(
        getVariantNodeLabel(node, locale),
        locale,
      ).includes(query);

      if (!matches && children.length === 0) {
        return null;
      }

      return matches ? node : { ...node, children };
    })
    .filter(Boolean);

function VariantMenuNode({
  node,
  depth,
  opening,
  activeVariant,
  locale,
  onVariantClick,
  premiumAccess,
}) {
  const isVariantActive = activeVariant === node.variantNodeId;

  return (
    <div className="flex flex-col gap-0.5">
      <button
        onClick={() => onVariantClick(node)}
        className="flex min-h-8 items-center gap-2 border-l px-3 py-1.5 text-left transition-all duration-150 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer hover:brightness-125"
        style={{
          marginLeft: `${depth * 20}px`,
          borderColor: isVariantActive ? opening.glow : "transparent",
          background: isVariantActive ? `${opening.color}18` : "transparent",
          outlineColor: opening.glow,
        }}
      >
        <span
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
          style={{
            backgroundColor: isVariantActive
              ? opening.glow
              : `${opening.color}70`,
            boxShadow: isVariantActive ? `0 0 6px ${opening.glow}` : "none",
          }}
        />
        <span
          className="min-w-0 flex-1 font-mono text-[12px] leading-snug"
          style={{
            color: isVariantActive ? opening.text : `${opening.text}90`,
            textShadow: isVariantActive ? `0 0 6px ${opening.glow}60` : "none",
          }}
        >
          {getVariantNodeLabel(node, locale)}
        </span>
        {node.access === "premium" && !premiumAccess && (
          <PremiumLockIcon
            className="w-3.5 h-3.5 shrink-0"
            title="Contenido premium"
          />
        )}
      </button>

      {node.children.map((child) => (
        <VariantMenuNode
          key={child.variantNodeId}
          node={child}
          depth={depth + 1}
          opening={opening}
          activeVariant={activeVariant}
          locale={locale}
          onVariantClick={onVariantClick}
          premiumAccess={premiumAccess}
        />
      ))}
    </div>
  );
}

export default function OpeningsPanel({
  openings,
  variantCatalog = [],
  variantRoutes = [],
  activeOpening,
  activeVariant = null,
  onToggleOpening,
  onToggleVariant = () => {},
  firstButtonRef,
}) {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [searchText, setSearchText] = useState("");
  const locale = detectLocale();
  const premiumAccess = hasPremiumAccess();
  const variantRouteById = useMemo(
    () =>
      new Map(
        variantRoutes.map((variantRoute) => [
          variantRoute.variantNodeId,
          variantRoute,
        ]),
      ),
    [variantRoutes],
  );
  const variantChildrenByParent = useMemo(() => {
    const map = new Map();
    for (const variant of variantCatalog) {
      if (!map.has(variant.parentNodeId)) {
        map.set(variant.parentNodeId, []);
      }
      map.get(variant.parentNodeId).push(variant);
    }
    return map;
  }, [variantCatalog]);

  const getOpeningLabel = (opening) =>
    t(`panel_openings.${opening.nodeId}`, opening.label);

  const filteredGroups = useMemo(() => {
    const query = normalizeSearchText(searchText.trim(), locale);
    const withVariantTree = (opening) => ({
      ...opening,
      variants: (variantChildrenByParent.get(opening.nodeId) ?? []).map(
        (variant) =>
          createVariantNode(variant, variantRouteById, variantChildrenByParent),
      ),
    });

    if (!query) {
      return openings.map((group) => ({
        ...group,
        openings: group.openings.map(withVariantTree),
      }));
    }

    return openings
      .map((group) => {
        const matchingOpenings = group.openings
          .map((opening) => {
            const openingWithVariants = withVariantTree(opening);
            const openingMatches = normalizeSearchText(
              t(`panel_openings.${opening.nodeId}`, opening.label),
              locale,
            ).includes(query);
            const matchingVariants = openingMatches
              ? openingWithVariants.variants
              : filterVariantNodes(openingWithVariants.variants, query, locale);

            if (!openingMatches && matchingVariants.length === 0) {
              return null;
            }

            return {
              ...openingWithVariants,
              variants: matchingVariants,
            };
          })
          .filter(Boolean);

        return matchingOpenings.length > 0
          ? { ...group, openings: matchingOpenings }
          : null;
      })
      .filter(Boolean);
  }, [
    locale,
    openings,
    searchText,
    t,
    variantChildrenByParent,
    variantRouteById,
  ]);

  const handleOpeningClick = (opening) => {
    if (opening.access === "premium") {
      trackPremiumMenuClick("premium_menu_opening_click", {
        node_id: opening.nodeId,
        opening_id: opening.nodeId,
        surface: "desktop_panel_opening",
        locale,
        has_access: premiumAccess,
      });
    }

    if (activeOpening === opening.nodeId && activeVariant != null) {
      onToggleVariant(activeVariant);
    } else {
      onToggleOpening(opening.nodeId);
    }
  };

  const handleVariantClick = (variant) => {
    const variantRoute =
      variant.route ?? variantRouteById.get(variant.variantNodeId);

    if (variant.access === "premium") {
      trackPremiumMenuClick("premium_menu_variant_click", {
        variant_node_id: variant.variantNodeId,
        opening_id: variantRoute?.parentNodeId ?? variant.parentNodeId,
        surface: "desktop_panel_variant",
        locale,
        has_access: premiumAccess,
      });
    }

    onToggleVariant(variant.variantNodeId);
  };

  return (
    <FloatingPanel
      defaultPosition={{
        top: `calc(100dvh - ${
          DESKTOP_OPENINGS_PANEL_BOTTOM + OPENINGS_PANEL_DEFAULT_HEIGHT
        }px)`,
        right: DESKTOP_PANEL_RIGHT,
      }}
      width={492}
      defaultHeight={collapsed ? undefined : OPENINGS_PANEL_DEFAULT_HEIGHT}
      resizable={!collapsed}
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
          <div className="relative">
            <input
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder={t("openings_panel.search_placeholder")}
              aria-label={t("openings_panel.search_label")}
              className="min-h-9 w-full border border-neon-purple/30 bg-black/30 py-2 pr-9 pl-3 font-mono text-[12px] tracking-wide text-neon-cyan outline-none transition-all duration-150 placeholder:text-neon-purple/40 focus:border-neon-cyan/70 focus:shadow-[0_0_12px_rgba(34,211,238,0.2)]"
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-neon-purple/50"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
          </div>

          {filteredGroups.length === 0 ? (
            <p className="px-1 py-4 text-center font-mono text-[11px] tracking-wide text-neon-purple/50">
              {t("openings_panel.no_results")}
            </p>
          ) : null}

          {filteredGroups.map((group, groupIndex) => (
            <div key={group.group} className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neon-cyan/50">
                {t(`panel_groups.${group.group}`, group.group)}
              </span>
              <div className="flex flex-col gap-1">
                {group.openings.map((opening, openingIndex) => {
                  const isActive = activeOpening === opening.nodeId;
                  const variants = opening.variants;

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
                          {getOpeningLabel(opening)}
                        </span>
                        {opening.access === "premium" &&
                          !premiumAccess && (
                            <PremiumLockIcon
                              className="w-3.5 h-3.5 shrink-0"
                              title="Contenido premium"
                            />
                          )}
                      </button>

                      {variants.map((variant) => (
                        <VariantMenuNode
                          key={variant.variantNodeId}
                          node={variant}
                          depth={1}
                          opening={opening}
                          activeVariant={activeVariant}
                          locale={locale}
                          onVariantClick={handleVariantClick}
                          premiumAccess={premiumAccess}
                        />
                      ))}
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
