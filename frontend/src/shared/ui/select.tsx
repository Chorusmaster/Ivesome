import type { ComponentProps } from "react";
import { useId } from "react";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label?: string;
  options: SelectOption[];
} & ComponentProps<"select">;

function Select({
  id,
  options,
  label,
  className,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div>
      {label && (
        <label htmlFor={selectId} className="font-medium text-text-primary">
          {label}
        </label>
      )}

      <select
        id={selectId}
        className={"w-full border border-border p-2.5 mt-1 rounded-input placeholder:text-muted focus:outline-1 focus:outline-primary " + className}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;