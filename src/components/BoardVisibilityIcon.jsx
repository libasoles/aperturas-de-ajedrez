export default function BoardVisibilityIcon({
  hidden = false,
  className = "h-5 w-5",
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      focusable="false"
    >
      <path
        d="M3 12s3.3-6 9-6 9 6 9 6-3.3 6-9 6-9-6-9-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="2.6"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      {hidden && (
        <path
          d="M4 20 20 4"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
