import FilterCheckbox from "./filter-checkbox";

export type FilterOption<T extends string> = {
  value: T;
  label: string;
};

type FilterGroupProps<T extends string> = {
  title: string;
  options: FilterOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
};

function FilterGroup<T extends string>({ title, options, value, onChange }: FilterGroupProps<T>) {
  const handleChange = (optionValue: T, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((value) => value !== optionValue));
    }
  };

  return (
    <div>
      <div className="font-medium text-body mb-2">{title}</div>

      <div>
        {options.map((option) => (
          <FilterCheckbox
            key={option.value}
            id={`${option.value}_filter`}
            label={option.label}
            checked={value.includes(option.value)}
            onChange={(checked) => handleChange(option.value, checked)}
          />
        ))}
      </div>
    </div>
  );
}

export default FilterGroup;