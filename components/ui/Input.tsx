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

const baseInputClasses = "w-full px-4 py-2 border-2 border-[#DADADA] dark:border-[#415543] rounded-lg bg-white dark:bg-[#455C47] text-[#2E2E2E] dark:text-white placeholder-[#6B6B6B] dark:placeholder-[#DADADA] focus:outline-none focus:border-[#4F6F52] focus:ring-2 focus:ring-[#C26D4A] disabled:opacity-50 disabled:cursor-not-allowed";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = true, className = "", ...props }, ref) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="block text-sm font-medium text-[#2E2E2E] dark:text-white mb-1">
            {label}
            {props.required && <span className="text-[#C0392B] ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`${baseInputClasses} ${error ? "border-[#C0392B]" : ""} ${className}`}
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

Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, fullWidth = true, className = "", rows = 4, ...props }, ref) => {
    return (
      <div className={`${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label className="block text-sm font-medium text-[#2E2E2E] dark:text-white mb-1">
            {label}
            {props.required && <span className="text-[#C0392B] ml-1">*</span>}
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
