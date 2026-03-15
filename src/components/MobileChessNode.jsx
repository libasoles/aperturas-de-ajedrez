import { Handle, Position } from "@xyflow/react";
import { memo } from "react";
import { defaultPieces } from "react-chessboard";
import { toSpanishSAN } from "../utils/chessPath";

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

function MobileChessNode({ id, data }) {
  const {
    move,
    name,
    color,
    opening,
    isExpanded,
    hasChildren,
    colors,
    isSelected,
    isInActivePath,
    onToggle,
    onSelect,
    onExpandToFork,
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
        "flex flex-col items-center gap-2 px-2 py-3 rounded-full border-2 font-mono font-bold cursor-pointer leading-none min-h-[94px]",
        "transition-all duration-150",
        isRoot ? "text-base ring-2 ring-white/20" : "text-sm",
        "hover:brightness-125 active:scale-95",
        "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white/80",
      ].join(" ")}
    >
      {hasChildren && (
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
            transform: "rotate(270deg)",
          }}
        >
          {isExpanded ? "−" : "+"}
        </span>
      )}

      <span
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          letterSpacing: "0.02em",
          transform: "rotate(180deg)",
        }}
      >
        {toSpanishSAN(move)}
      </span>

      {!isRoot &&
        (() => {
          const pieceCode = getPieceCode(move, isWhite);
          const PieceSvg = pieceCode ? defaultPieces[pieceCode] : null;
          return PieceSvg ? (
            <span
              className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full border"
              style={{
                backgroundColor: !isWhite ? colors.text : `${colors.border}30`,
                borderColor: `${colors.border}60`,
                transform: "rotate(270deg)",
              }}
            >
              <PieceSvg svgStyle={{ width: "18px", height: "18px" }} />
            </span>
          ) : null;
        })()}
    </div>
  );

  return (
    <div
      className="relative flex items-center select-none"
      style={{ overflow: "visible" }}
    >
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ background: "transparent", border: "none" }}
      />

      {pill}

      <Handle
        type="source"
        position={Position.Top}
        style={{ background: "transparent", border: "none" }}
      />

      {isSelected && hasChildren && !isExpanded && (
        <span
          role="button"
          tabIndex={-1}
          title="Expandir hasta bifurcación"
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
            right: "-34px",
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

      {name && (
        <span
          style={{
            color: colors.text,
            position: "absolute",
            left: "110%",
            whiteSpace: "nowrap",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            rotate: "180deg",
          }}
          className="text-[12px] font-sans opacity-70 leading-tight"
        >
          {name}
        </span>
      )}
    </div>
  );
}

export default memo(MobileChessNode);
