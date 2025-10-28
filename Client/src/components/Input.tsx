export function Input({
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  value?: string;
}) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        className="px-4 py-3 border-2 border-sand-200 rounded-lg m-2 w-full font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 transition-all"
        onChange={onChange}
      />
    </div>
  );
}
