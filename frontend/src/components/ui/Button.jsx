function Button({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full
        py-3
        rounded-xl
        font-semibold
        text-white
        bg-gradient-to-r
        from-blue-600
        to-indigo-600
        hover:from-blue-700
        hover:to-indigo-700
        transition
        shadow-lg
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;