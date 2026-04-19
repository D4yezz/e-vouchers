export default function Button({
  onClick,
  className,
  type,
  disabled,
  children,
}) {
  return (
    <button
      disabled={disabled}
      className={`${className} bg-red-600 hover:bg-red-700 cursor-pointer font-semibold py-2 px-4 rounded`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
