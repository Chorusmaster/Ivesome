import type { ComponentProps } from "react";
import { useId } from "react";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

function Input({
  id,
  label,
  className,
  error,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="font-medium text-text-primary">
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={"w-full border border-border p-2.5 mt-1 rounded-input placeholder:text-muted focus:outline-1 focus:outline-primary " + className}
        {...props}
      />
      <div className="text-danger">{error}</div>
    </div>
  );
}

export default Input;