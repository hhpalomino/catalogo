"use client";

import toast from "react-hot-toast";
import { Modal, Button } from "@/components/ui";
import { useAsyncAction } from "@/hooks";
import { productApi } from "@/lib/api";
import type { DeleteProductModalProps } from "@/lib/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeleteProductModal({
  isOpen,
  onClose,
  productId,
  productTitle,
  onSuccess,
}: DeleteProductModalProps) {
  const { loading, error, execute } = useAsyncAction();

  const handleDelete = async () => {
    if (!productId) return;

    await execute(
      async () => {
        return await productApi.delete(productId);
      },
      () => {
        toast.success(`✅ Producto "${productTitle}" eliminado exitosamente`);
        onClose();
        onSuccess?.();
      },
      (err) => {
        toast.error(`❌ ${err.message}`);
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Eliminar Producto" size="sm">
      <div className="space-y-6">
        {error && (
          <div className="p-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
            <FontAwesomeIcon icon={faTrash} className="text-3xl text-red-600 dark:text-red-400" />
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              ¿Estás seguro?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              ¿Deseas eliminar el producto{" "}
              <span className="font-semibold">&quot;{productTitle}&quot;</span>?
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Esta acción no se puede deshacer.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="danger"
            fullWidth
            loading={loading}
            onClick={handleDelete}
            icon={faTrash}
          >
            Eliminar
          </Button>
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
