"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminProductList from "@/components/admin/AdminProductList";
import { formatPriceCLP } from "@/lib/product-ui";

type Product = {
  id: string;
  title: string;
  description: string;
  status: {
    id: string;
    name: string;
    displayName: string;
    color: string;
    displayOrder: number;
    isActive: boolean;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  entregado: boolean;
  pagado: boolean;
  condition: string;
  measurements: string;
  price: number;
  images: Array<{
    id: string;
    imageUrl: string;
    isMain: boolean;
    displayOrder: number;
  }>;
};

interface AdminPageClientProps {
  products: Product[];
}

export default function AdminPageClient({ products }: AdminPageClientProps) {
  const [currentSection, setCurrentSection] = useState<"resumen" | "productos" | "cambiar-password">("resumen");
  
  // States para cambiar contraseña
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      const msg = "Las contraseñas no coinciden";
      setError(msg);
      toast.error(`❌ ${msg}`);
      return;
    }

    if (newPassword.length < 4) {
      const msg = "La contraseña debe tener al menos 4 caracteres";
      setError(msg);
      toast.error(`❌ ${msg}`);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "Error al cambiar contraseña";
        setError(errorMsg);
        toast.error(`❌ ${errorMsg}`);
        setLoading(false);
        return;
      }

      toast.success("✅ Contraseña cambiada exitosamente");
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch {
      const msg = "Error de conexión";
      setError(msg);
      toast.error(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar 
        currentSection={currentSection} 
        onSectionChange={setCurrentSection}
      />

      {/* Contenido principal */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header profesional de admin */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-white dark:bg-[#2E2E2E] border-b border-[#DADADA] dark:border-[#415543] mb-10">
          <div className="flex items-center gap-3 max-w-7xl mx-auto">
            <div className="w-10 h-10 bg-[#4F6F52] dark:bg-[#455C47] rounded-lg flex items-center justify-center text-xl font-bold text-white">
              {currentSection === "resumen" ? "📊" : currentSection === "productos" ? "📦" : "🔐"}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[#2E2E2E] dark:text-white">
                {currentSection === "resumen" ? "Resumen General" : currentSection === "productos" ? "Gestión de Productos" : "Cambiar Contraseña"}
              </h1>
              <p className="text-xs sm:text-sm text-[#6B6B6B] dark:text-[#DADADA]">
                {currentSection === "resumen" 
                  ? "Vista general de Garage Market" 
                  : currentSection === "productos" 
                    ? "Catálogo de Garage Market" 
                    : "Actualiza tu contraseña de acceso"}
              </p>
            </div>
          </div>
        </div>

        {/* Contenido según sección */}
        {currentSection === "resumen" ? (
          <>
            {/* Stats */}
            <div className="py-8 space-y-4 mb-8">
              {/* Fila 1: Estados con cantidad y precio */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Pendientes */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Pendientes</p>
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                      {products.filter((p) => p.status.name === "pendiente").length}
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-yellow-500">
                      ${formatPriceCLP(products.filter((p) => p.status.name === "pendiente").reduce((sum: number, p) => sum + p.price, 0))}
                    </p>
                  </div>
                </div>

                {/* Disponibles */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Disponibles</p>
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl sm:text-3xl font-bold text-green-600">
                      {products.filter((p) => p.status.name === "disponible").length}
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-green-500">
                      ${formatPriceCLP(products.filter((p) => p.status.name === "disponible").reduce((sum: number, p) => sum + p.price, 0))}
                    </p>
                  </div>
                </div>

                {/* Vendidos */}
                <div className="bg-white dark:bg-[#455C47] p-4 rounded-lg shadow">
                  <p className="text-sm text-[#6B6B6B] dark:text-[#DADADA] mb-1">Vendidos</p>
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl sm:text-3xl font-bold text-[#4F6F52] dark:text-white">
                      {products.filter((p) => p.status.name === "vendido").length}
                    </p>
                    <p className="text-base sm:text-lg font-semibold text-[#C26D4A] dark:text-[#C26D4A]">
                      ${formatPriceCLP(products.filter((p) => p.status.name === "vendido").reduce((sum: number, p) => sum + p.price, 0))}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fila 2: Montos de dinero */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* $ Recibido */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">💰 Recibido</p>
                  <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
                    ${formatPriceCLP(products.filter((p) => p.pagado).reduce((sum: number, p) => sum + p.price, 0))}
                  </p>
                </div>

                {/* $ Pendiente de Pago */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">⏳ Pendiente de Pago</p>
                  <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                    ${formatPriceCLP(products.filter((p) => p.status.name === "vendido" && !p.pagado).reduce((sum: number, p) => sum + p.price, 0))}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : currentSection === "productos" ? (
          <>
            {/* Products Table */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
              <AdminProductList products={products} />
            </div>
          </>
        ) : (
          /* Sección Cambiar Contraseña */
          <div className="py-8 max-w-2xl">
            <div className="bg-white dark:bg-[#2E2E2E] rounded-lg shadow-lg p-8">
              <form onSubmit={handlePasswordChange} className="space-y-6">
                {error && (
                  <div className="p-4 bg-[#F8D7DA] dark:bg-[#5C2E2E] border border-[#C0392B] rounded-lg text-[#C0392B] dark:text-[#F8D7DA] text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-4 bg-[#D4EDDA] dark:bg-[#2E5C3C] border border-[#2E7D32] rounded-lg text-[#2E7D32] dark:text-[#D4EDDA] text-sm">
                    ✓ Contraseña cambiada exitosamente
                  </div>
                )}

                {/* Contraseña Actual */}
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] dark:text-white mb-2">
                    Contraseña Actual
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faLock} className="text-[#6B6B6B] dark:text-[#DADADA]" />
                    </div>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-[#DADADA] dark:border-[#415543] rounded-lg bg-white dark:bg-[#455C47] text-[#2E2E2E] dark:text-white focus:outline-none focus:border-[#4F6F52] focus:ring-2 focus:ring-[#C26D4A]"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Nueva Contraseña */}
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] dark:text-white mb-2">
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faLock} className="text-[#6B6B6B] dark:text-[#DADADA]" />
                    </div>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-[#DADADA] dark:border-[#415543] rounded-lg bg-white dark:bg-[#455C47] text-[#2E2E2E] dark:text-white focus:outline-none focus:border-[#4F6F52] focus:ring-2 focus:ring-[#C26D4A]"
                      placeholder="••••••••"
                      minLength={4}
                    />
                  </div>
                  <p className="mt-1 text-xs text-[#6B6B6B] dark:text-[#DADADA]">
                    Mínimo 4 caracteres
                  </p>
                </div>

                {/* Confirmar Contraseña */}
                <div>
                  <label className="block text-sm font-medium text-[#2E2E2E] dark:text-white mb-2">
                    Confirmar Nueva Contraseña
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FontAwesomeIcon icon={faLock} className="text-[#6B6B6B] dark:text-[#DADADA]" />
                    </div>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-[#DADADA] dark:border-[#415543] rounded-lg bg-white dark:bg-[#455C47] text-[#2E2E2E] dark:text-white focus:outline-none focus:border-[#4F6F52] focus:ring-2 focus:ring-[#C26D4A]"
                      placeholder="••••••••"
                      minLength={4}
                    />
                  </div>
                </div>

                {/* Botón Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#4F6F52] hover:bg-[#3F5C43] disabled:bg-[#6B6B6B] disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  {loading ? "Cambiando..." : "Cambiar Contraseña"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
