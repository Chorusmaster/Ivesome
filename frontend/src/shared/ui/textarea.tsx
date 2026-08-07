import type { ComponentProps } from "react";
import { useId } from "react";

type TextareaProps = ComponentProps<"textarea"> & {
  label?: string;
};

function Textarea({
  id,
  label,
  className,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="font-medium text-text-primary">
          {label}
        </label>
      )}

      <textarea
        id={inputId}
        className={"w-full border border-border p-2.5 mt-1 rounded-input placeholder:text-muted focus:outline-1 focus:outline-primary " + className}
        {...props}
      />
    </div>
  );
}

export default Textarea;