import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

import Input from "@/shared/ui/input";

const SUGGESTION_DEBOUNCE_MS = 300;

interface ListSuggestion {
  id: string;
  name: string;
  usageCount: number;
}

interface ListFieldProps {
  id: string;
  label: string;
  placeholder: string;
  addLabel: string;
  removeLabel: string;
  resetKey: unknown;
  values: string[];
  onChange: (values: string[]) => void;
  fetchSuggestions: (search: string) => Promise<ListSuggestion[]>;
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
  fetchSuggestions,
}: ListFieldProps) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<ListSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestionError, setSuggestionError] = useState(false);

  useEffect(() => {
    setInputValue("");
  }, [resetKey]);

  useEffect(() => {
    const search = inputValue.trim();
    let isCurrentRequest = true;

    if (!search) {
      setSuggestions([]);
      setIsLoadingSuggestions(false);
      setSuggestionError(false);
      return;
    }

    setSuggestions([]);
    setIsLoadingSuggestions(true);
    setSuggestionError(false);

    const timeoutId = window.setTimeout(async () => {
      try {
        const results = await fetchSuggestions(search);
        if (isCurrentRequest) {
          setSuggestions(results);
        }
      } catch {
        if (isCurrentRequest) {
          setSuggestions([]);
          setSuggestionError(true);
        }
      } finally {
        if (isCurrentRequest) {
          setIsLoadingSuggestions(false);
        }
      }
    }, SUGGESTION_DEBOUNCE_MS);

    return () => {
      isCurrentRequest = false;
      window.clearTimeout(timeoutId);
    };
  }, [inputValue, fetchSuggestions]);

  const filteredSuggestions = useMemo(() => {
    const value = inputValue.trim().toLowerCase();

    return suggestions.filter(
      (suggestion) =>
        suggestion.name.toLowerCase().includes(value) &&
        !values.some(
          (existing) => existing.toLowerCase() === suggestion.name.toLowerCase(),
        ),
    );
  }, [inputValue, suggestions, values]);

  const disabled = useMemo(() => {
    const value = inputValue.trim();

    return (
      !value ||
      values.some((existing) => existing.toLowerCase() === value.toLowerCase())
    );
  }, [inputValue, values]);

  const addValue = () => {
    if (disabled) return;

    onChange([...values, inputValue.trim()]);
    setInputValue("");
  };

  const selectSuggestion = (suggestion: string) => {
    onChange([...values, suggestion]);
    setInputValue("");

    setShowSuggestions(false);
  };

  return (
    <div>
      <label htmlFor={id} className="font-medium text-text-primary">
        {label}
      </label>

      <div className="mt-1 flex items-end gap-2">
        <div className="relative flex-1">
          <Input
            id={id}
            placeholder={placeholder}
            value={inputValue}
            autoComplete="off"
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            onChange={(event) => {
              setInputValue(event.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addValue();
              }

              if (event.key === "Escape") {
                setShowSuggestions(false);
              }
            }}
          />

          {showSuggestions && inputValue.trim() && (
            <div className="absolute z-10 mt-1 w-full max-h-64 overflow-auto rounded-md border border-border bg-background shadow-md">
              {isLoadingSuggestions ? (
                <p className="px-3 py-2 text-sm text-muted">
                  {t("shared.listField.loadingSuggestions")}
                </p>
              ) : suggestionError ? (
                <p role="status" className="px-3 py-2 text-sm text-danger">
                  {t("shared.listField.suggestionsError")}
                </p>
              ) : filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectSuggestion(suggestion.name)}
                    className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm text-text-primary hover:bg-surface"
                  >
                    <span>{suggestion.name}</span>
                    <span className="shrink-0 text-muted">
                      {t("shared.listField.usageCount", {
                        count: suggestion.usageCount,
                      })}
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-2 text-sm text-muted">
                  {t("shared.listField.noSuggestions")}
                </p>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={addValue}
          disabled={disabled}
          className="button h-11.5 border border-border bg-surface hover:shadow-sm disabled:text-border disabled:shadow-none"
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