export default function PremiumLockIcon({
  className = "",
  title,
  strokeWidth = 1.8,
}) {
  return (
    <svg
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title ? <title>{title}</title> : null}
      <path d="M7 10V7.75a5 5 0 1 1 10 0V10" />
      <rect x="5" y="10" width="14" height="10" rx="2.5" />
      <path d="M12 14v3" />
      <circle cx="12" cy="14" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
