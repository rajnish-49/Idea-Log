import type { ReactElement } from "react";

interface SidebaritemProps {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
  active?: boolean;
}

export function Sidebaritem({
  text,
  icon,
  onClick,
  active = false,
}: SidebaritemProps) {
  return (
    <div
      className={`flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded-lg transition-colors duration-200 ${
        active
          ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500 font-medium"
          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
      }`}
      onClick={onClick}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 text-sm">{text}</div>
    </div>
  );
}
