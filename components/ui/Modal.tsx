/**
 * Componente Modal reutilizable
 * Base para todos los modales de la aplicación
 */

"use client";

import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
  fullscreenMobile?: boolean;
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
  xxl: "max-w-7xl",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  fullscreenMobile = false,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className={`bg-white dark:bg-[#2E2E2E] shadow-2xl w-full ${sizeClasses[size] || ''} max-h-[90vh] overflow-y-auto px-1 sm:px-10 p-6
        ${fullscreenMobile ? 'rounded-none h-screen w-screen max-w-none max-h-none fixed top-0 left-0 z-50 sm:rounded-lg sm:max-h-[90vh] sm:w-full sm:static' : 'rounded-lg'}
        `}
        style={{ touchAction: 'auto', WebkitOverflowScrolling: 'touch' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-[#2E2E2E] border-b border-[#DADADA] dark:border-[#415543] px-4 sm:px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#2E2E2E] dark:text-white">
            {title}
          </h2>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="text-[#6B6B6B] hover:text-[#2E2E2E] dark:text-[#DADADA] dark:hover:text-white transition-colors"
              aria-label="Cerrar modal"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          )}
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
