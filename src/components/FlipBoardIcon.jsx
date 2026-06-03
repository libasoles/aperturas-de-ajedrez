export default function FlipBoardIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M7 3 2 8h3v8h6v-3H8V8h4L7 3Z"
      />
      <path
        fill="currentColor"
        d="m17 21 5-5h-3V8h-6v3h3v5h-4l5 5Z"
      />
    </svg>
  );
}
