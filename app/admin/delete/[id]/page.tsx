"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DeleteProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paramsData, setParamsData] = useState<{ id: string } | null>(null);

  // Unwrap params promise on mount
  useEffect(() => {
    (async () => {
      const resolved = await params;
      setParamsData(resolved);
    })();
  }, [params]);

  const handleDelete = async () => {
    if (!paramsData) return;
    if (!confirm("¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/products/${paramsData.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar el producto");
      setLoading(false);
    }
  };

  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium mb-4 inline-flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Volver al Admin
        </Link>
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-400">
          Eliminar Producto
        </h1>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border-2 border-red-300 dark:border-red-700 rounded-lg">
          <p className="text-red-800 dark:text-red-200 font-semibold">
            ⚠️ Atención: Esta acción no se puede deshacer
          </p>
          <p className="text-red-700 dark:text-red-300 text-sm mt-2">
            Estás a punto de eliminar este producto permanentemente. Todos los datos asociados se perderán.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors inline-flex items-center justify-center gap-2"
          >
            <FontAwesomeIcon icon={faTrash} />
            {loading ? "Eliminando..." : "Confirmar Eliminación"}
          </button>
          <button
            onClick={() => router.back()}
            className="flex-1 px-4 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </main>
  );
}
