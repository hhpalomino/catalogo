"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faUserShield, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
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
      router.refresh();
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      toast.error("❌ Error al cerrar sesión");
    }
  };

  // Si está logueado, mostrar controles en línea
  if (isAdmin) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700 font-medium">
          Hola {loggedUsername}
        </span>
        
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer"
          aria-label="Panel de administración"
          title="Panel de administración"
        >
          <FontAwesomeIcon icon={faUserShield} className="text-base" />
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer"
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
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors cursor-pointer"
        aria-label="Iniciar sesión"
      >
        <FontAwesomeIcon
          icon={faCog}
          className="text-gray-700 text-lg"
        />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
        >
          <form onSubmit={handleLogin} className="p-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Iniciar Sesión
            </h3>

            {error && (
              <div className="mb-3 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                autoFocus
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
