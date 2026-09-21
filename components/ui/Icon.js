const PATHS = {
  upright: "M7 17L17 7M8 7h9v9",
  up: "M12 19V5M5 12l7-7 7 7",
  plus: "M12 5v14M5 12h14",
  x: "M6 6l12 12M18 6L6 18",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
  edit: "M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4",
  chevUp: "M6 15l6-6 6 6",
  chevDown: "M6 9l6 6 6-6",
  upload: "M12 16V4M7 9l5-5 5 5M4 20h16",
  logout: "M9 4H5v16h4M16 8l4 4-4 4M20 12H9",
  check: "M5 12l5 5L20 7",
};

export default function Icon({ name, size = 16, strokeWidth = 1.6, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
