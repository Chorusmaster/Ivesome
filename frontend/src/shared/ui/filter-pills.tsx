interface FilterPillsProps<T extends string> {
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  labels?: Partial<Record<T, string>>;
}

export function FilterPills<T extends string>({
  options,
  value,
  onChange,
  labels,
}: FilterPillsProps<T>) {
  const getLabel = (option: T) =>
    labels?.[option] ??
    option.charAt(0) + option.slice(1).toLowerCase();

  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`
            px-4 py-1 rounded-full cursor-pointer select-none
            border transition
            ${
              value === option
                ? "bg-primary text-white border-primary"
                : "bg-surface border-border hover:border-primary text-text-secondary"
            }
          `}
        >
          {getLabel(option)}
        </button>
      ))}
    </div>
  );
}