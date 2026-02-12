/**
 * Componente Input reutilizable
 * Para estandarizar inputs en toda la app
 */

"use client";

import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef } from "react";

interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseInputProps {}
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {}

const baseInputClasses = "w-full px-4 py-2 border-2 border-[#E5E7EB] dark:border-[#25304A] rounded-lg bg-white dark:bg-[#0F1526] text-[#20242B] dark:text-[#E6EBF5] placeholder-[#64748B] dark:placeholder-[#A3B0C5] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#E88C76] disabled:opacity-50 disabled:cursor-not-allowed";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = true, className = "", ...props }, ref) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="block text-sm font-medium text-[#20242B] dark:text-[#E6EBF5] mb-1">
            {label}
            {props.required && <span className="text-[#D14343] ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseInputClasses} ${error ? "border-[#D14343]" : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[#D14343] dark:text-[#D14343]">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-[#64748B] dark:text-[#A3B0C5]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, fullWidth = true, className = "", rows = 4, ...props }, ref) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="block text-sm font-medium text-[#20242B] dark:text-[#E6EBF5] mb-1">
            {label}
            {props.required && <span className="text-[#D14343] ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={`${baseInputClasses} resize-none ${error ? "border-[#C0392B]" : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[#C0392B] dark:text-[#C0392B]">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-[#6B6B6B] dark:text-[#DADADA]">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement>, BaseInputProps {
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, fullWidth = true, options, className = "", ...props }, ref) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="block text-sm font-medium text-[#2E2E2E] dark:text-white mb-1">
            {label}
            {props.required && <span className="text-[#C0392B] ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          className={`${baseInputClasses} ${error ? "border-[#C0392B]" : ""} ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1 text-sm text-[#C0392B] dark:text-[#C0392B]">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-[#6B6B6B] dark:text-[#DADADA]">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
