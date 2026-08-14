"use client";

import { useState } from "react";

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
}

export function SearchSelect({
  label,
  options,
  value,
  onChange,
  searchPlaceholder,
  emptyMessage = "No hay opciones disponibles.",
  placeholder,
}: SearchSelectProps) {
  const [query, setQuery] = useState(() => options.find((o) => o.id === value)?.label ?? "");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [prevValue, setPrevValue] = useState(value);
  if (value !== prevValue) {
    setPrevValue(value);
    setQuery(options.find((o) => o.id === value)?.label ?? "");
  }

  const matches = query.trim()
    ? options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6)
    : [];

  function selectOption(option: SearchSelectOption) {
    setQuery(option.label);
    setShowSuggestions(false);
    onChange(option.id);
  }

  const fieldId = `search-select-${label.toLowerCase().replace(/\s+/g, "-")}`;

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
      <label className="text-sm font-medium text-primary">{label}</label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="relative sm:flex-[2]">
          <label htmlFor={`${fieldId}-search`} className="sr-only">
            {searchPlaceholder}
          </label>
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
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
            placeholder={searchPlaceholder}
            className="w-full rounded-sm border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {showSuggestions && matches.length > 0 ? (
            <ul className="absolute z-10 mt-1 w-full rounded-sm border border-border bg-white py-1 shadow-md">
              {matches.map((option) => (
                <li key={option.id}>
                  <button
                    type="button"
                    onMouseDown={() => selectOption(option)}
                    className="block w-full px-3.5 py-2 text-left text-sm text-primary hover:bg-surface"
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <select
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary sm:flex-1"
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
