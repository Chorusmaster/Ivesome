type FilterCheckboxProps = {
  id: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

function FilterCheckbox({
  id,
  label,
  checked,
  onChange,
}: FilterCheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="size-4 accent-primary"
      />
      <label className="text-text-primary" htmlFor={id}>{label}</label>
    </div>
  );
}

export default FilterCheckbox;