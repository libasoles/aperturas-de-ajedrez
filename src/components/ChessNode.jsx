import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import { defaultPieces } from "react-chessboard";
import { Tooltip } from "./ui/Tooltip";

// SAN usa notación inglesa internamente; esto convierte para mostrar al usuario
export function toSpanishSAN(move) {
  if (!move) return move;
  return move
    .replace(/^K/, "R") // King → Rey
    .replace(/^Q/, "D") // Queen → Dama
    .replace(/^R/, "T") // Rook → Torre
    .replace(/^B/, "A") // Bishop → Alfil
    .replace(/^N/, "C"); // Knight → Caballo
}

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
  const {
    move,
    name,
    annotation,
    color,
    opening,
    isExpanded,
    hasChildren,
    colors,
    isSelected,
    isInActivePath,
    onToggle,
    onSelect,
  } = data;

  const isRoot = opening === "root";
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
      onClick={() => onSelect?.(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
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

      <span>{toSpanishSAN(move)}</span>

      {/* Expand/collapse button — separate click area */}
      {hasChildren && (
        <span
          role="button"
          tabIndex={0}
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
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-1 select-none">
      {/* Handles scoped to the pill so edges connect at pill center, not node center */}
      <div className="relative flex items-center">
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
      </div>

      {/* Opening name label */}
      {name && (
        <span
          style={{ color: colors.text }}
          className="text-[13px] font-sans opacity-70 max-w-30 text-center leading-tight"
        >
          {name}
        </span>
      )}
    </div>
  );
}

export default memo(ChessNode);
