"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faKey, faChartPie, faBars, faTimes, faTags } from "@fortawesome/free-solid-svg-icons";

interface AdminSidebarProps {
  currentSection: "resumen" | "productos" | "atributos" | "cambiar-password";
  onSectionChange: (section: "resumen" | "productos" | "atributos" | "cambiar-password") => void;
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
      id: "atributos" as const,
      label: "Atributos",
      icon: faTags,
      description: "Categorías y características"
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
      {/* Botón móvil flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-brand-primary text-white rounded-full shadow-xl hover:bg-brand-primary-dark transition-colors"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
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

      {/* Sidebar desktop */}
      <aside
        className={`
          hidden lg:block sticky top-0 left-0 h-screen
          w-64 bg-[#F3F7FF] dark:bg-[#1A2233] border-r-2 border-[#D6E4FF] dark:border-[#2563EB]
        `}
      >
        <div className="p-6">
          <h2 className="text-lg font-bold text-[#2563EB] dark:text-[#E88C76] mb-2">
            Menú Admin
          </h2>
          <p className="text-sm text-[#64748B] dark:text-[#A3B0C5] mb-6">
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
                      ? "bg-[#2563EB] text-white shadow-md"
                      : "text-[#18468B] dark:text-[#E88C76] hover:bg-[#E6EEFB] dark:hover:bg-[#18468B]"
                  }
                `}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`text-lg mt-0.5 ${
                    currentSection === item.id ? "text-white" : "text-[#2563EB] dark:text-[#E88C76]"
                  }`}
                />
                <div className="text-left flex-1">
                  <div className="font-semibold text-sm">{item.label}</div>
                  <div
                    className={`text-xs mt-0.5 ${
                      currentSection === item.id
                        ? "text-white/80"
                        : "text-[#64748B] dark:text-[#A3B0C5]"
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

      {/* Panel móvil inferior */}
      <div
        className={`
          lg:hidden fixed left-0 right-0 bottom-0 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="bg-white dark:bg-brand-dark rounded-t-3xl border-t border-brand-border dark:border-brand-primary shadow-2xl px-5 pt-4 pb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-brand-dark dark:text-white">
                Menú Admin
              </h2>
              <p className="text-xs text-brand-muted dark:text-brand-light">
                Gestión del sistema
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-light dark:bg-brand-primary"
              aria-label="Cerrar menú"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-left transition-colors
                  ${
                    currentSection === item.id
                      ? "bg-brand-primary text-white"
                      : "bg-brand-light dark:bg-brand-accent text-brand-dark dark:text-white"
                  }
                `}
              >
                <span
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-xl
                    ${
                      currentSection === item.id
                        ? "bg-white/15 text-white"
                        : "bg-white dark:bg-brand-dark text-brand-primary dark:text-brand-accent"
                    }
                  `}
                >
                  <FontAwesomeIcon icon={item.icon} />
                </span>
                <div>
                  <div className="text-sm font-semibold">{item.label}</div>
                  <div
                    className={`text-xs mt-0.5 ${
                      currentSection === item.id ? "text-white/80" : "text-brand-muted dark:text-brand-light"
                    }`}
                  >
                    {item.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
