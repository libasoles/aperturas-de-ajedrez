import { useState } from "react";
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
  activeOpening,
  onToggleOpening,
  firstButtonRef,
}) {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <FloatingPanel
      defaultPosition={{
        bottom: DESKTOP_OPENINGS_PANEL_BOTTOM,
        right: DESKTOP_PANEL_RIGHT,
      }}
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
        <div
          className="min-h-0 flex flex-col gap-3 px-4 pb-4 overflow-y-auto"
          style={{ maxHeight: 260 }}
        >
          {openings.map((group, groupIndex) => (
            <div key={group.group} className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neon-cyan/50">
                {t(`panel_groups.${group.group}`, group.group)}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {group.openings.map((opening, openingIndex) => {
                  const isActive = activeOpening === opening.nodeId;

                  return (
                    <button
                      key={opening.label}
                      ref={
                        groupIndex === 0 && openingIndex === 0
                          ? firstButtonRef
                          : undefined
                      }
                      onClick={() => {
                        if (opening.access === "premium") {
                          trackPremiumMenuClick(
                            "premium_menu_opening_click",
                            {
                              node_id: opening.nodeId,
                              opening_id: opening.nodeId,
                              surface: "desktop_panel_opening",
                              locale: detectLocale(),
                              has_access: hasPremiumAccess(),
                            },
                          );
                        }
                        onToggleOpening(opening.nodeId);
                      }}
                      className="flex items-center gap-2 px-3 py-2 border transition-all duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer hover:brightness-125"
                      style={{
                        borderColor: isActive
                          ? opening.glow
                          : `${opening.color}40`,
                        background: isActive
                          ? `${opening.color}20`
                          : `${opening.color}08`,
                        boxShadow: isActive
                          ? `0 0 12px ${opening.glow}40`
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
                        className="font-mono text-[13px] tracking-wide"
                        style={{
                          color: isActive ? opening.text : `${opening.text}cc`,
                          textShadow: isActive
                            ? `0 0 6px ${opening.glow}80`
                            : "none",
                        }}
                      >
                        {t(`panel_openings.${opening.nodeId}`, opening.label)}
                      </span>
                      {opening.access === "premium" && !hasPremiumAccess() && (
                        <PremiumLockIcon
                          className="w-3.5 h-3.5 shrink-0"
                          title="Contenido premium"
                        />
                      )}
                    </button>
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
