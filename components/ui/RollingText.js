// Text that rolls up on hover of its parent link/button (styles in globals.css).
export default function RollingText({ children, className = "" }) {
  return (
    <span className={`roll ${className}`}>
      <span>
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}
