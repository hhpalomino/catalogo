/**
 * Componente Button reutilizable
 * Para estandarizar botones en toda la app
 */

"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconDefinition;
  iconPosition?: "left" | "right";
  loading?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#4F6F52] hover:bg-[#3F5C43] active:bg-[#334B37] text-white focus:ring-2 focus:ring-[#C26D4A]",
  secondary: "bg-[#6B6B6B] hover:bg-[#5A5A5A] text-white focus:ring-2 focus:ring-[#C26D4A]",
  danger: "bg-[#C0392B] hover:bg-[#A0311E] text-white focus:ring-2 focus:ring-[#C26D4A]",
  success: "bg-[#2E7D32] hover:bg-[#1E5A24] text-white focus:ring-2 focus:ring-[#C26D4A]",
  ghost: "bg-transparent hover:bg-[#F5F3EF] dark:hover:bg-[#2E2E2E] text-[#4F6F52] dark:text-[#C26D4A] focus:ring-2 focus:ring-[#C26D4A]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  fullWidth = false,
  disabled,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseClasses = "rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? "w-full" : ""}
    ${className}
  `.trim();

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="animate-spin">⏳</span>
      ) : (
        <>
          {icon && iconPosition === "left" && (
            <FontAwesomeIcon icon={icon} />
          )}
          {children}
          {icon && iconPosition === "right" && (
            <FontAwesomeIcon icon={icon} />
          )}
        </>
      )}
    </button>
  );
}
