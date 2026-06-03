export default function PinStarIcon({
  className = "w-3.5 h-3.5 shrink-0",
  filled = false,
  style,
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2L8 8H3l5 5-2 9 6-4 6 4-2-9 5-5h-5z" />
    </svg>
  );
}
