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
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zm10-3.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z",
  eyeOff: "M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a15.8 15.8 0 0 1-3.2 4.1M6.2 6.2C3.5 8 2 12 2 12s3.5 7 10 7a10.8 10.8 0 0 0 3-.4",
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
