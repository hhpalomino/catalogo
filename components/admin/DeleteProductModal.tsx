"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

type DeleteProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
  productTitle?: string;
  onSuccess?: () => void;
};

export default function DeleteProductModal({
  isOpen,
  onClose,
  productId,
  productTitle,
  onSuccess,
}: DeleteProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!productId) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      // Cerrar modal y notificar éxito
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-red-600 dark:bg-red-700 px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FontAwesomeIcon icon={faTrash} />
            Eliminar Producto
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-red-200 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-lg">
              {error}
            </div>
          )}

          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border-2 border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-red-800 dark:text-red-200 font-semibold mb-2">
              ⚠️ Atención: Esta acción no se puede deshacer
            </p>
            <p className="text-red-700 dark:text-red-300 text-sm">
              Estás a punto de eliminar {productTitle ? `"${productTitle}"` : "este producto"} permanentemente. Todos los datos asociados se perderán.
            </p>
          </div>

          <p className="text-slate-700 dark:text-slate-300 mb-6">
            ¿Estás seguro de que deseas continuar?
          </p>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 !text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faTrash} size="sm" />
              {loading ? "Eliminando..." : "Confirmar Eliminación"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
