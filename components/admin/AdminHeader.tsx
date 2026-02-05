"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faSignOutAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ChangePasswordModal from "./ChangePasswordModal";

export default function AdminHeader() {
  const router = useRouter();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (!confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      return;
    }

    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      console.error("Error al cerrar sesión");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-end gap-2 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium rounded-lg transition-colors"
          title="Volver"
        >
          <FontAwesomeIcon icon={faArrowLeft} size="sm" />
          Volver
        </Link>
        <button
          onClick={() => setShowPasswordModal(true)}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium rounded-lg transition-colors"
          title="Cambiar contraseña"
        >
          <FontAwesomeIcon icon={faKey} size="sm" />
          Cambiar Contraseña
        </button>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="inline-flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 !text-white rounded-lg transition-colors disabled:opacity-50"
          title="Cerrar sesión"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
      </div>

      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </>
  );
}
