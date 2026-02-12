"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faTimes } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
        onClose();
        setSuccess(false);
      }, 2000);
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-brand-dark rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-brand-dark dark:text-white">
            Cambiar Contraseña
          </h2>
          <button
            onClick={onClose}
            className="text-brand-muted hover:text-brand-primary dark:hover:text-brand-light transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-brand-accent dark:bg-brand-primary text-brand-primary dark:text-white rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-brand-accent dark:bg-brand-primary text-brand-primary dark:text-white rounded-lg text-sm">
              ✓ Contraseña cambiada exitosamente
            </div>
          )}

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-brand-dark dark:text-white mb-2">
              Contraseña Actual
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-brand-muted" size="sm" />
              </div>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-brand-border dark:border-brand-primary rounded-lg bg-white dark:bg-brand-dark text-brand-dark dark:text-white focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-brand-dark dark:text-white mb-2">
              Nueva Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-brand-muted" size="sm" />
              </div>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-brand-border dark:border-brand-primary rounded-lg bg-white dark:bg-brand-dark text-brand-dark dark:text-white focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="••••••••"
                minLength={4}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-brand-dark dark:text-white mb-2">
              Confirmar Nueva Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-brand-muted" size="sm" />
              </div>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-brand-border dark:border-brand-primary rounded-lg bg-white dark:bg-brand-dark text-brand-dark dark:text-white focus:outline-none focus:border-brand-primary transition-colors"
                placeholder="••••••••"
                minLength={4}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-brand-light dark:bg-brand-accent hover:bg-brand-accent dark:hover:bg-brand-primary text-brand-dark dark:text-white font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark !text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
