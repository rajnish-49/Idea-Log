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
        className="px-4 py-2 border rounded m-2 w-full"
        onChange={onChange}
      />
    </div>
  );
}
