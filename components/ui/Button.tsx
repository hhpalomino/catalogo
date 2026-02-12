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
  primary: "bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#153B7D] text-white focus:ring-2 focus:ring-[#E88C76]",
  secondary: "bg-[#E88C76] hover:bg-[#E26A4F] text-white focus:ring-2 focus:ring-[#2563EB]",
  danger: "bg-[#D14343] hover:bg-[#A0311E] text-white focus:ring-2 focus:ring-[#E88C76]",
  success: "bg-[#149E55] hover:bg-[#0F7A3D] text-white focus:ring-2 focus:ring-[#2563EB]",
  ghost: "bg-transparent hover:bg-[#E8F0FE] dark:hover:bg-[#25304A] text-[#2563EB] dark:text-[#E88C76] focus:ring-2 focus:ring-[#E88C76]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

export const Button = ({
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
}: ButtonProps) => {
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
