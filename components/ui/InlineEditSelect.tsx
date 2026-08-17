"use client";

import { useState, type ReactNode } from "react";

interface InlineEditSelectProps {
  value: string;
  options: { value: string; label: string }[];
  badge: ReactNode;
  onChange: (value: string) => void;
}

export function InlineEditSelect({ value, options, badge, onChange }: InlineEditSelectProps) {
  const [editing, setEditing] = useState(false);

  if (!editing) {
    return (
      <button
        type="button"
        onDoubleClick={() => setEditing(true)}
        className="cursor-pointer text-left"
        aria-label="Doble click para editar"
      >
        {badge}
      </button>
    );
  }

  return (
    <select
      autoFocus
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        setEditing(false);
      }}
      onBlur={() => setEditing(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setEditing(false);
      }}
      className="rounded-sm border border-border bg-white px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
