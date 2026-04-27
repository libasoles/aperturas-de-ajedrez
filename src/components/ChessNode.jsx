import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import { defaultPieces } from "react-chessboard";
import { useTranslation } from "react-i18next";
import { toFrenchSAN, toSpanishSAN } from "../utils/chessPath";
import PremiumLockIcon from "./PremiumLockIcon";
import { Tooltip } from "./ui/Tooltip";

function getPieceCode(move, isWhite) {
  if (!move) return null;
  const san = move.replace(/[+#!=?]/g, "");
  const prefix = isWhite ? "w" : "b";
  if (san.startsWith("K")) return `${prefix}K`;
  if (san.startsWith("Q")) return `${prefix}Q`;
  if (san.startsWith("R")) return `${prefix}R`;
  if (san.startsWith("B")) return `${prefix}B`;
  if (san.startsWith("N")) return `${prefix}N`;
  return `${prefix}P`;
}

function ChessNode({ id, data }) {
  const { t, i18n } = useTranslation();
  const san = (move) =>
    i18n.language === "en"
      ? move
      : i18n.language === "fr"
        ? toFrenchSAN(move)
        : toSpanishSAN(move);

  const {
    move,
    color,
    isExpanded,
    hasChildren,
    colors,
    isSelected,
    isInActivePath,
    onToggle,
    onSelect,
    onExpandToFork,
    isPremium,
    isLocked,
  } = data;

  const name =
    data.name || t(`openings:${id}.name`, { defaultValue: "" }) || null;
  const annotation =
    data.annotation ||
    t(`openings:${id}.annotation`, { defaultValue: "" }) ||
    null;

  const isRoot = id === "root";
  const isWhite = color === "white";

  const ringStyle = isSelected
    ? {
        boxShadow: `0 0 0 2px #fff, 0 0 12px ${colors.border}, 0 0 8px ${colors.border}90, 0 0 20px ${colors.edge}40`,
      }
    : isInActivePath
      ? {
          boxShadow: `0 0 0 2px ${colors.border}90, 0 0 8px ${colors.border}90, 0 0 20px ${colors.edge}40`,
        }
      : { boxShadow: `0 0 8px ${colors.border}90, 0 0 20px ${colors.edge}40` };

  const pill = (
    <div
      role="button"
      tabIndex={0}
      data-node-pill-id={id}
      onClick={() => onSelect?.(id)}
      onKeyDown={(e) => {
        if (e.key === " ") {
          e.preventDefault();
          onSelect?.(id);
        }
      }}
      style={{
        backgroundColor: colors.node,
        color: colors.text,
        borderColor: isSelected ? "#fff" : colors.border,
        ...ringStyle,
      }}
      className={[
        "flex items-center gap-2 px-4 py-2 rounded-full border-2 font-mono font-bold cursor-pointer leading-none",
        "transition-all duration-150",
        isRoot ? "text-base ring-2 ring-white/20" : "text-sm",
        "hover:brightness-125 active:scale-95",
        "focus:outline-2 focus:outline-offset-3 focus:outline-white/80",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white/80",
      ].join(" ")}
    >
      {/* Piece icon */}
      {!isRoot &&
        (() => {
          const pieceCode = getPieceCode(move, isWhite);
          const PieceSvg = pieceCode ? defaultPieces[pieceCode] : null;
          return PieceSvg ? (
            <span
              className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full border"
              style={{
                backgroundColor: !isWhite ? colors.text : `${colors.border}30`,
                borderColor: !isWhite
                  ? `${colors.border}60`
                  : `${colors.border}60`,
              }}
            >
              <PieceSvg svgStyle={{ width: "18px", height: "18px" }} />
            </span>
          ) : null;
        })()}

      <span>{isRoot ? t("chess_panel.initial") : san(move)}</span>

      {/* Expand/collapse button — separate click area */}
      {hasChildren && !isLocked && (
        <span
          role="button"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.(id);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              onToggle?.(id);
            }
          }}
          className="flex items-center justify-center w-5 h-5 rounded-full text-sm font-bold leading-none shrink-0 transition-all duration-150 hover:brightness-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
          style={{
            background: `${colors.border}30`,
            border: `1px solid ${colors.border}60`,
            color: colors.text,
          }}
        >
          {isExpanded ? "−" : "+"}
        </span>
      )}

      {hasChildren && isPremium && isLocked && (
        <span
          className="flex items-center justify-center w-5 h-5 rounded-full text-sm font-bold leading-none shrink-0"
          style={{
            background: `${colors.border}30`,
            border: `1px solid ${colors.border}60`,
            color: colors.text,
          }}
        >
          <PremiumLockIcon
            className="w-3.5 h-3.5"
            title={isLocked ? "Contenido bloqueado" : "Contenido restringido"}
            strokeWidth={2.2}
          />
        </span>
      )}
    </div>
  );

  return (
    // The outer div's height = pill height only (label is absolutely positioned).
    // This keeps the ReactFlow node bounds flush with the pill, so edge handles
    // connect at the visual pill center instead of an offset below it.
    <div
      className="relative flex items-center select-none"
      style={{ overflow: "visible" }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "transparent", border: "none" }}
      />

      <Tooltip content={annotation}>{pill}</Tooltip>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "transparent", border: "none" }}
      />

      {/* Expand-to-fork button — only on selected nodes with unexpanded children */}
      {isSelected && hasChildren && !isExpanded && !isLocked && (
        <span
          role="button"
          tabIndex={-1}
          title={t("node.expand_to_fork")}
          onClick={(e) => {
            e.stopPropagation();
            onExpandToFork?.(id);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              e.stopPropagation();
              onExpandToFork?.(id);
            }
          }}
          className="flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold leading-none shrink-0 transition-all duration-150 hover:brightness-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 cursor-pointer animate-[delayed-appear_0.15s_ease_20ms_both]"
          style={{
            position: "absolute",
            right: "-36px",
            top: "50%",
            transform: "translateY(-50%)",
            background: `${colors.border}30`,
            border: `1px solid ${colors.border}60`,
            color: colors.text,
          }}
        >
          →
        </span>
      )}

      {/* Opening name label — absolutely positioned below pill, outside node bounds */}
      {name && (
        <span
          style={{
            color: colors.text,
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: "4px",
            whiteSpace: "nowrap",
          }}
          className="text-[13px] font-sans opacity-70 max-w-30 text-center leading-tight"
        >
          {name}
        </span>
      )}
    </div>
  );
}

export default memo(ChessNode);
