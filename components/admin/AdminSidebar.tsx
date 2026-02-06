"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faKey, faBars, faTimes, faChartPie } from "@fortawesome/free-solid-svg-icons";

interface AdminSidebarProps {
  currentSection: "resumen" | "productos" | "cambiar-password";
  onSectionChange: (section: "resumen" | "productos" | "cambiar-password") => void;
}

export default function AdminSidebar({ currentSection, onSectionChange }: AdminSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      id: "resumen" as const,
      label: "Resumen",
      icon: faChartPie,
      description: "Vista general"
    },
    {
      id: "productos" as const,
      label: "Productos",
      icon: faBoxOpen,
      description: "Gestionar catálogo"
    },
    {
      id: "cambiar-password" as const,
      label: "Cambiar Contraseña",
      icon: faKey,
      description: "Seguridad de acceso"
    }
  ];

  return (
    <>
      {/* Botón hamburguesa móvil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 flex items-center justify-center w-12 h-12 bg-[#4F6F52] dark:bg-[#455C47] text-white rounded-lg shadow-lg hover:bg-[#3F5C43] transition-colors"
        aria-label="Abrir menú"
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
      </button>

      {/* Overlay para cerrar en móvil */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto
          w-64 bg-white dark:bg-[#2E2E2E] border-r-2 border-[#DADADA] dark:border-[#415543]
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="p-6">
          <h2 className="text-lg font-bold text-[#2E2E2E] dark:text-white mb-2">
            Menú Admin
          </h2>
          <p className="text-sm text-[#6B6B6B] dark:text-[#DADADA] mb-6">
            Gestión del sistema
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-start gap-3 px-4 py-3 rounded-lg transition-all
                  ${
                    currentSection === item.id
                      ? "bg-[#4F6F52] dark:bg-[#455C47] text-white shadow-md"
                      : "text-[#2E2E2E] dark:text-white hover:bg-[#F5F3EF] dark:hover:bg-[#455C47]"
                  }
                `}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`text-lg mt-0.5 ${
                    currentSection === item.id ? "text-white" : "text-[#4F6F52] dark:text-[#C26D4A]"
                  }`}
                />
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div
                    className={`text-xs mt-0.5 ${
                      currentSection === item.id
                        ? "text-white/80"
                        : "text-[#6B6B6B] dark:text-[#DADADA]"
                    }`}
                  >
                    {item.description}
                  </div>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
