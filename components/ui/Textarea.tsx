import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export function Textarea({ label, hint, id, className = "", ...props }: TextareaProps) {
  const textareaId = id ?? `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={textareaId} className="text-sm font-medium text-primary">
        {label}
        {props.required ? <span aria-hidden="true" className="text-secondary"> *</span> : null}
      </label>
      <textarea
        id={textareaId}
        className={`w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-base text-primary placeholder:text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
        {...props}
      />
      {hint ? <span className="text-xs text-secondary">{hint}</span> : null}
    </div>
  );
}
