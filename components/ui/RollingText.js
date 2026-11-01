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
