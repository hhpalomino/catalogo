"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      // Redirect to admin
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Error de conexión");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="max-w-md w-full">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Admin Panel
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faUser} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="admin"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 bg-blue-800 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-700 !text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          {/* Back to home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Volver al catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
