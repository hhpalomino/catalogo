"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

interface AuthButtonProps {
  initialIsAdmin: boolean;
}

export default function AuthButton({ initialIsAdmin }: AuthButtonProps) {
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedUsername, setLoggedUsername] = useState("admin");
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        toast.success(`✅ ¡Bienvenido ${username}!`);
        setLoggedUsername(username);
        setIsAdmin(true);
        setIsOpen(false);
        setUsername("");
        setPassword("");
        router.refresh();
      } else {
        const data = await response.json();
        const errorMsg = data.error || "Error al iniciar sesión";
        setError(errorMsg);
        toast.error(`❌ ${errorMsg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      toast.success("✅ Sesión cerrada");
      setIsAdmin(false);
      // Forzar recarga completa para que el middleware se ejecute
      window.location.href = "/";
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      toast.error("❌ Error al cerrar sesión");
    }
  };

  // Si está logueado, mostrar controles en línea
  if (isAdmin) {
    return (
      <div className="flex items-center gap-3">
        {/* Navegación */}
        <nav className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 text-sm font-medium text-[#4F6F52] dark:text-white hover:bg-[#F5F3EF] dark:hover:bg-[#455C47] rounded-lg transition-colors"
          >
            Catálogo
          </button>
          <button
            onClick={() => router.push("/admin")}
            className="px-4 py-2 text-sm font-medium text-[#4F6F52] dark:text-white hover:bg-[#F5F3EF] dark:hover:bg-[#455C47] rounded-lg transition-colors"
          >
            Administración
          </button>
        </nav>

        {/* Nombre de usuario */}
        <span className="hidden sm:inline-block text-sm font-semibold text-[#2E2E2E] dark:text-white px-3 py-1 bg-[#F5F3EF] dark:bg-[#455C47] rounded-lg">
          {loggedUsername}
        </span>

        {/* Botón cerrar sesión */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#C0392B] hover:bg-[#A0311E] text-white transition-colors"
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
        >
          <FontAwesomeIcon icon={faSignOutAlt} className="text-base" />
        </button>
      </div>
    );
  }

  // Si NO está logueado, mostrar botón con popover
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#E2E7E3] dark:bg-[#455C47] hover:bg-[#CAD3CB] dark:hover:bg-[#3F5C43] transition-colors"
        aria-label="Iniciar sesión"
        title="Iniciar sesión"
      >
        <FontAwesomeIcon
          icon={faCog}
          className="text-[#4F6F52] dark:text-white text-lg"
        />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#2E2E2E] rounded-lg shadow-lg border border-[#DADADA] dark:border-[#415543] z-50"
        >
          <form onSubmit={handleLogin} className="p-4">
            <h3 className="text-lg font-semibold mb-3 text-[#2E2E2E] dark:text-white">
              Iniciar Sesión
            </h3>

            {error && (
              <div className="mb-3 p-2 bg-[#F8D7DA] dark:bg-[#5C2E2E] border border-[#C0392B] rounded text-[#C0392B] dark:text-[#F8D7DA] text-sm">
                {error}
              </div>
            )}

            <div className="mb-3">
              <label className="block text-sm font-medium text-[#2E2E2E] dark:text-white mb-1">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#DADADA] dark:border-[#415543] rounded-lg bg-white dark:bg-[#455C47] text-[#2E2E2E] dark:text-white focus:outline-none focus:border-[#4F6F52] focus:ring-2 focus:ring-[#C26D4A]"
                required
                autoFocus
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#2E2E2E] dark:text-white mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border-2 border-[#DADADA] dark:border-[#415543] rounded-lg bg-white dark:bg-[#455C47] text-[#2E2E2E] dark:text-white focus:outline-none focus:border-[#4F6F52] focus:ring-2 focus:ring-[#C26D4A]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4F6F52] text-white py-2 px-4 rounded-lg hover:bg-[#3F5C43] disabled:bg-[#6B6B6B] disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
