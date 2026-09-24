import type { ButtonHTMLAttributes } from "react";

interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Toggle({
  checked,
  onChange,
  disabled,
  className = "",
  ...props
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`
        relative h-6 w-11 shrink-0 rounded-full cursor-pointer
        transition-colors duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
        disabled:cursor-not-allowed disabled:opacity-50
        ${checked ? "bg-primary" : "bg-muted"}
        ${className}
      `}
      {...props}
    >
      <span
        className={`
          absolute top-1 left-1
          h-4 w-4 rounded-full bg-white shadow-sm
          transition-transform duration-200
          ${checked ? "translate-x-5" : ""}
        `}
      />
    </button>
  );
}