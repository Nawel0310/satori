"use client";

import type { ChangeEvent } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  "aria-label": string;
  id?: string;
}

export function SearchInput({ value, onChange, placeholder, "aria-label": ariaLabel, id }: SearchInputProps) {
  const inputId = id ?? `search-${ariaLabel.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className="relative flex-1">
      <label htmlFor={inputId} className="sr-only">
        {ariaLabel}
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
        id={inputId}
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-sm border border-border bg-white py-2.5 pl-9 pr-3 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
