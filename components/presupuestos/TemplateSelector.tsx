"use client";

import { BUDGET_TEMPLATES } from "@/lib/mock-data";

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void;
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="template-select" className="text-sm font-medium text-primary">
        Plantilla reutilizable
      </label>
      <select
        id="template-select"
        defaultValue=""
        onChange={(e) => {
          if (e.target.value) onSelect(e.target.value);
        }}
        className="w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-sm text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="" disabled>
          Elegir plantilla…
        </option>
        {BUDGET_TEMPLATES.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
}
