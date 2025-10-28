import type { ReactElement } from "react";

const variantStyles = {
  primary:
    "bg-teal-600 text-white shadow-sm hover:shadow-md hover:bg-teal-700 active:bg-teal-800 transition-all duration-200",
  secondary:
    "border-2 border-teal-200 text-teal-700 hover:bg-teal-50 bg-white hover:border-teal-300 transition-all duration-200",
};

const sizeStyles = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const defaultStyles =
  "rounded-lg flex items-center justify-center transition-all duration-200 font-medium";

export interface ButtonProps {
  variant: keyof typeof variantStyles;
  size: keyof typeof sizeStyles;
  text: string;
  StartIcon?: ReactElement;
  EndIcon?: ReactElement;
  onClick?: () => void;
  Fullwidth?: boolean;
  loading?: boolean;
}

export const Button = (props: ButtonProps) => {
  const combinedClassName = [
    variantStyles[props.variant],
    sizeStyles[props.size],
    defaultStyles,
    props.Fullwidth ? "w-full" : "",
    props.loading ? "opacity-50 cursor-not-allowed" : "",
  ].join(" ");

  return (
    <button
      className={combinedClassName}
      onClick={props.loading ? undefined : props.onClick}
      disabled={props.loading}
    >
      {props.StartIcon && <span className="mr-2">{props.StartIcon}</span>}
      <span className="px-2">{props.loading ? "Loading..." : props.text}</span>
      {props.EndIcon && <span className="ml-2">{props.EndIcon}</span>}
    </button>
  );
};
