import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function Input({ label, hint, id, className = "", ...props }: InputProps) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-primary">
        {label}
        {props.required ? <span aria-hidden="true" className="text-secondary"> *</span> : null}
      </label>
      <input
        id={inputId}
        className={`w-full rounded-sm border border-border bg-white px-3.5 py-2.5 text-base text-primary placeholder:text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${className}`}
        {...props}
      />
      {hint ? <span className="text-xs text-secondary">{hint}</span> : null}
    </div>
  );
}

export function FieldLabel({ children, ...props }: LabelHTMLAttributes<HTMLLabelElement> & { children: ReactNode }) {
  return (
    <label className="text-sm font-medium text-primary" {...props}>
      {children}
    </label>
  );
}
