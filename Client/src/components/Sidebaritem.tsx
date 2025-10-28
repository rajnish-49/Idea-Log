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
      className={`flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded-lg transition-all duration-200 ${
        active
          ? "bg-teal-50 text-teal-700 border-l-4 border-teal-600 font-semibold shadow-sm"
          : "text-slate-700 hover:bg-sand-100 hover:text-teal-700 font-medium"
      }`}
      onClick={onClick}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 text-sm">{text}</div>
    </div>
  );
}
