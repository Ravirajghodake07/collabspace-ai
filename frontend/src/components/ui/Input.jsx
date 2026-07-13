function Input({
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        px-4
        py-3
        rounded-xl
        bg-[#1E293B]
        border
        border-slate-700
        text-white
        placeholder:text-slate-500
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-blue-500
        transition
      "
    />
  );
}

export default Input;