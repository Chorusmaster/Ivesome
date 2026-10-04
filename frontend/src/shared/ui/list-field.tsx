import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

import Input from "@/shared/ui/input";

interface ListFieldProps {
  id: string;
  label: string;
  placeholder: string;
  addLabel: string;
  removeLabel: string;
  resetKey: unknown;
  values: string[];
  onChange: (values: string[]) => void;
}

function ListField({
  id,
  label,
  placeholder,
  addLabel,
  removeLabel,
  resetKey,
  values,
  onChange,
}: ListFieldProps) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue("");
  }, [resetKey]);

  const disabled = useMemo(() => {
    const value = inputValue.trim();
    return (
      !value ||
      values.some((existing) => existing.toLowerCase() === value.toLowerCase())
    );
  }, [inputValue]);

  const addValue = () => {
    if (disabled) return;

    onChange([...values, inputValue.trim()]);
    setInputValue("");
  };

  return (
    <div>
      <label htmlFor={id} className="font-medium text-text-primary">
        {label}
      </label>
      <div className="mt-1 flex items-end gap-2">
        <Input
          id={id}
          placeholder={placeholder}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addValue();
            }
          }}
        />
        <button
          type="button"
          onClick={addValue}
          disabled={disabled}
          className="button h-11.5 bg-surface hover:shadow-sm disabled:shadow-none disabled:text-border border border-border"
        >
          {addLabel}
        </button>
      </div>
      <ul className="mt-2 flex flex-wrap gap-2">
        {values.map((value, index) => (
          <li
            key={`${value}-${index}`}
            className="flex items-center gap-1 rounded-full bg-surface px-2 py-1 text-sm text-text-primary"
          >
            {value}
            <button
              type="button"
              onClick={() =>
                onChange(values.filter((_, itemIndex) => itemIndex !== index))
              }
              aria-label={`${removeLabel} ${value}`}
              className="text-muted hover:text-text-primary"
            >
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListField;
