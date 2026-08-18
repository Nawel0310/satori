"use client";

import { useState } from "react";
import { XIcon } from "./icons";
import { normalizeSearchText } from "@/lib/format";

export interface SearchSelectOption {
  id: string;
  label: string;
}

interface SearchSelectProps {
  label: string;
  options: SearchSelectOption[];
  value: string;
  onChange: (id: string) => void;
  searchPlaceholder: string;
  emptyMessage?: string;
  placeholder?: string;
  showAllOnFocus?: boolean;
}

export function SearchSelect({
  label,
  options,
  value,
  onChange,
  searchPlaceholder,
  emptyMessage = "No hay opciones disponibles.",
  placeholder,
  showAllOnFocus = false,
}: SearchSelectProps) {
  const [query, setQuery] = useState(() => options.find((o) => o.id === value)?.label ?? "");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setQuery(options.find((o) => o.id === value)?.label ?? "");
  }

  const matches = query.trim()
    ? options.filter((o) => normalizeSearchText(o.label).includes(normalizeSearchText(query.trim()))).slice(0, 6)
    : showAllOnFocus
      ? options
      : [];

  function selectOption(option: SearchSelectOption) {
    setQuery(option.label);
    setShowSuggestions(false);
    setActiveIndex(-1);
    onChange(option.id);
  }

  function clearSelection() {
    setQuery("");
    setActiveIndex(-1);
    onChange("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      if (matches.length === 0) return;
      e.preventDefault();
      setShowSuggestions(true);
      setActiveIndex((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      if (matches.length === 0) return;
      e.preventDefault();
      setShowSuggestions(true);
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < matches.length) {
        e.preventDefault();
        selectOption(matches[activeIndex]);
      } else if (matches.length === 1) {
        e.preventDefault();
        selectOption(matches[0]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  const fieldId = `search-select-${label.toLowerCase().replace(/\s+/g, "-")}`;
  const listboxId = `${fieldId}-listbox`;
  const activeOptionId =
    activeIndex >= 0 && activeIndex < matches.length ? `${fieldId}-option-${matches[activeIndex].id}` : undefined;

  if (options.length === 0) {
    return (
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-primary">{label}</label>
        <p className="rounded-sm border border-dashed border-border bg-surface px-3.5 py-2.5 text-sm text-secondary">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={`${fieldId}-search`} className="text-sm font-medium text-primary">
        {label}
      </label>
      <div className="relative">
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-secondary"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          id={`${fieldId}-search`}
          type="text"
          autoComplete="off"
          role="combobox"
          aria-expanded={showSuggestions && matches.length > 0}
          aria-controls={listboxId}
          aria-activedescendant={activeOptionId}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
          onKeyDown={handleKeyDown}
          placeholder={value === "" && placeholder ? placeholder : searchPlaceholder}
          className={`w-full rounded-sm border border-border bg-white py-2.5 pl-9 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary ${
            value !== "" && placeholder ? "pr-9" : "pr-3"
          }`}
        />
        {value !== "" && placeholder ? (
          <button
            type="button"
            aria-label="Quitar selección"
            onMouseDown={clearSelection}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
          >
            <XIcon />
          </button>
        ) : null}
        {showSuggestions && matches.length > 0 ? (
          <ul id={listboxId} role="listbox" className="absolute z-10 mt-1 w-full rounded-sm border border-border bg-white py-1 shadow-md">
            {matches.map((option, index) => (
              <li key={option.id} id={`${fieldId}-option-${option.id}`} role="option" aria-selected={index === activeIndex}>
                <button
                  type="button"
                  onMouseDown={() => selectOption(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`block w-full px-3.5 py-2 text-left text-sm text-primary hover:bg-surface ${
                    index === activeIndex ? "bg-surface" : ""
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
