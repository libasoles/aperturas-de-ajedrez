import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { detectLocale } from "../hooks/useOpeningTreeState";
import { hasPremiumAccess } from "../lib/access";
import { trackPremiumMenuClick } from "../lib/analytics";
import FloatingPanel from "./FloatingPanel";
import ClearSearchIcon from "./icons/ClearSearchIcon";
import PremiumLockIcon from "./icons/PremiumLockIcon";
import SearchIcon from "./icons/SearchIcon";
import ToggleSwitchIcon from "./icons/ToggleSwitchIcon";
import {
  DESKTOP_OPENINGS_PANEL_BOTTOM,
  DESKTOP_PANEL_RIGHT,
} from "./panelLayout";
import { Tooltip } from "./ui/Tooltip";

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

const filterVariantNodes = (
  nodes,
  query,
  locale,
  pinnedIds = new Set(),
  filterPinned = false,
) =>
  nodes
    .map((node) => {
      const children = filterVariantNodes(
        node.children,
        query,
        locale,
        pinnedIds,
        filterPinned,
      );
      const isPinned = pinnedIds.has(node.variantNodeId);
      const textMatch =
        !query ||
        normalizeSearchText(getVariantNodeLabel(node, locale), locale).includes(
          query,
        );
      const matches = filterPinned
        ? isPinned && textMatch
        : isPinned || textMatch;

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
  pinnedIds,
  onTogglePin,
}) {
  const isVariantActive = activeVariant === node.variantNodeId;
  const isPinned = pinnedIds.has(node.variantNodeId);
  const pinLabel = isPinned ? "Quitar pin" : "Pinear variante";

  return (
    <div className="flex flex-col gap-0.5">
      <div
        className="group flex items-stretch"
        style={{ marginLeft: `${depth * 20}px` }}
      >
        <button
          onClick={() => onVariantClick(node)}
          className="flex flex-1 min-h-8 items-center gap-2 border-l px-3 py-1.5 text-left transition-all duration-150 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer hover:brightness-125"
          style={{
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
              textShadow: isVariantActive
                ? `0 0 6px ${opening.glow}60`
                : "none",
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
        <Tooltip content={pinLabel} side="left">
          <button
            tabIndex={-1}
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin(node.variantNodeId);
            }}
            aria-label={pinLabel}
            className="flex items-center justify-center px-2 transition-opacity duration-150 cursor-pointer focus-visible:outline-none"
            style={{
              opacity: isPinned ? 1 : undefined,
              color: isPinned ? opening.glow : "#6b7280",
            }}
          >
            <ToggleSwitchIcon
              className={`w-5 h-5 shrink-0 ${isPinned ? "" : "opacity-0 group-hover:opacity-100 transition-opacity duration-150"}`}
              checked={isPinned}
            />
          </button>
        </Tooltip>
      </div>

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
          pinnedIds={pinnedIds}
          onTogglePin={onTogglePin}
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
  pinnedIds = new Set(),
  onToggleOpening,
  onToggleVariant = () => {},
  onTogglePin = () => {},
  onClearPins = () => {},
  firstButtonRef,
}) {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterPinned, setFilterPinned] = useState(false);
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

    if (!query && !filterPinned) {
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
            const isOpeningPinned = pinnedIds.has(opening.nodeId);
            const openingMatchesText =
              !query ||
              normalizeSearchText(
                t(`panel_openings.${opening.nodeId}`, opening.label),
                locale,
              ).includes(query);
            const openingMatches = filterPinned
              ? isOpeningPinned && openingMatchesText
              : isOpeningPinned || openingMatchesText;
            const matchingVariants =
              openingMatches && !filterPinned
                ? openingWithVariants.variants
                : filterVariantNodes(
                    openingWithVariants.variants,
                    query,
                    locale,
                    pinnedIds,
                    filterPinned,
                  );

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
    filterPinned,
    locale,
    openings,
    pinnedIds,
    searchText,
    t,
    variantChildrenByParent,
    variantRouteById,
  ]);

  const handleOpeningClick = (opening) => {
    onClearPins();
    setFilterPinned(false);

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
    onClearPins();
    setFilterPinned(false);

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

  const pinnedFilterLabel = filterPinned
    ? "Mostrar todas las aperturas"
    : "Mostrar solo pineadas";

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
            className="font-mono text-[20px] leading-none transition-all duration-150 hover:brightness-150 text-neon-purple/50"
          >
            {collapsed ? "▸" : "▾"}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="min-h-0 flex-1 flex flex-col gap-3 px-4 pb-4 overflow-y-auto">
          <div className="flex">
            <div className="relative flex-1">
              <input
                type="text"
                role="searchbox"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder={t("openings_panel.search_placeholder")}
                aria-label={t("openings_panel.search_label")}
                className="min-h-9 w-full border border-neon-purple/30 bg-black/30 py-2 pr-9 pl-3 font-mono text-[12px] tracking-wide text-neon-cyan outline-none transition-all duration-150 placeholder:text-neon-purple/55 focus:border-neon-cyan/70 focus:shadow-[0_0_12px_rgba(34,211,238,0.2)]"
              />
              {searchText ? (
                <button
                  onClick={() => setSearchText("")}
                  aria-label="Limpiar búsqueda"
                  className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center text-neon-cyan/70 hover:text-neon-cyan transition-colors duration-150 cursor-pointer"
                >
                  <ClearSearchIcon />
                </button>
              ) : (
                <SearchIcon />
              )}
            </div>
            <Tooltip content={pinnedFilterLabel} side="top">
              <button
                onClick={() => setFilterPinned((v) => !v)}
                aria-label={pinnedFilterLabel}
                className={`flex shrink-0 items-center justify-center px-2 ml-1.5 min-h-9 transition-all duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  filterPinned
                    ? "text-neon-purple"
                    : "text-neon-purple/60 hover:text-neon-purple/90"
                }`}
              >
                <ToggleSwitchIcon checked={filterPinned} />
              </button>
            </Tooltip>
          </div>

          {filteredGroups.length === 0 ? (
            <p className="px-1 py-4 text-center font-mono text-[11px] tracking-wide text-neon-purple/80">
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

                  const isOpeningPinned = pinnedIds.has(opening.nodeId);
                  const openingPinLabel = isOpeningPinned
                    ? "Quitar pin"
                    : "Pinear apertura";
                  return (
                    <div key={opening.nodeId} className="flex flex-col gap-0.5">
                      <div className="group flex items-stretch">
                        <button
                          ref={
                            groupIndex === 0 && openingIndex === 0
                              ? firstButtonRef
                              : undefined
                          }
                          onClick={() => handleOpeningClick(opening)}
                          className="flex flex-1 min-h-9 items-center gap-2 border-l px-3 py-2 text-left transition-all duration-150 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer hover:brightness-125"
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
                          {opening.access === "premium" && !premiumAccess && (
                            <PremiumLockIcon
                              className="w-3.5 h-3.5 shrink-0"
                              title="Contenido premium"
                            />
                          )}
                        </button>
                        <Tooltip content={openingPinLabel} side="left">
                          <button
                            tabIndex={-1}
                            onClick={(e) => {
                              e.stopPropagation();
                              onTogglePin(opening.nodeId);
                            }}
                            aria-label={openingPinLabel}
                            className="flex items-center justify-center px-2 cursor-pointer focus-visible:outline-none"
                            style={{
                              color: isOpeningPinned ? opening.glow : "#6b7280",
                            }}
                          >
                            <ToggleSwitchIcon
                              className={`w-5 h-5 shrink-0 ${isOpeningPinned ? "" : "opacity-0 group-hover:opacity-100 transition-opacity duration-150"}`}
                              checked={isOpeningPinned}
                            />
                          </button>
                        </Tooltip>
                      </div>

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
                          pinnedIds={pinnedIds}
                          onTogglePin={onTogglePin}
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
