"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ImageUploadInput from "../ImageUploadInput";

interface UploadedImage {
  id: string;
  url: string;
  isMain?: boolean;
  displayOrder?: number;
}

type Product = {
  title: string;
  description: string;
  statusId: string;
  entregado: boolean;
  pagado: boolean;
  condition: string;
  measurements: string;
  price: number;
};

type ProductStatus = {
  id: string;
  name: string;
  displayName: string;
  color: string;
  displayOrder: number;
  isActive: boolean;
  isDefault: boolean;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function CreateProductModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statuses, setStatuses] = useState<ProductStatus[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [imageInputKey, setImageInputKey] = useState(0);
  const [form, setForm] = useState<Product>({
    title: "",
    description: "",
    statusId: "",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "",
    price: 0,
  });

  const conditions = ["Excellent", "Very good", "Good", "Regular"];

  // Cargar statuses disponibles
  useEffect(() => {
    if (isOpen) {
      fetch('/api/product-statuses')
        .then((res) => res.json())
        .then((data) => {
          setStatuses(data);
          // Usar el status default
          const defaultStatus = data.find((s: ProductStatus) => s.isDefault) || data[0];
          if (defaultStatus) {
            setForm(prev => ({ ...prev, statusId: defaultStatus.id }));
          }
        })
        .catch((err) => console.error('Error loading statuses:', err));
    }
  }, [isOpen]);

  // Resetear cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setUploadedImages([]);
      setError("");
      setLoading(false);
      setImageInputKey(prev => prev + 1);
      setForm({
        title: "",
        description: "",
        statusId: "",
        entregado: false,
        pagado: false,
        condition: "Excellent",
        measurements: "",
        price: 0,
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const submitData = {
        ...form,
        images: uploadedImages.map(img => img.url).join(","),
      };

      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error("Error al crear el producto");
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
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Crear Producto
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-lg">
                {error}
              </div>
            )}

            {/* Título */}
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Título *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                placeholder="Ej: Urban Sneakers"
              />
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                Descripción *
              </label>
              <textarea
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 resize-none h-24"
                placeholder="Descripción del producto"
              />
            </div>

            {/* Grid 2 columnas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Estado */}
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                  Estado *
                </label>
                <select
                  value={form.statusId}
                  onChange={(e) => setForm({ ...form, statusId: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  {statuses.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.displayName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Condición */}
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                  Condición *
                </label>
                <select
                  value={form.condition}
                  onChange={(e) => setForm({ ...form, condition: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  {conditions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Medidas */}
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                  Medidas *
                </label>
                <input
                  type="text"
                  required
                  value={form.measurements}
                  onChange={(e) => setForm({ ...form, measurements: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="Ej: Size 42"
                />
              </div>

              {/* Precio */}
              <div>
                <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                  Precio (pesos) *
                </label>
                <input
                  type="number"
                  required
                  value={form.price}
                  onChange={(e) =>
                    setForm({ ...form, price: parseInt(e.target.value) })
                  }
                  className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="45000"
                />
              </div>
            </div>

            {/* Checkboxes: Entregado y Pagado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="create-entregado"
                  checked={form.entregado}
                  onChange={(e) => setForm({ ...form, entregado: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 accent-blue-600"
                />
                <label htmlFor="create-entregado" className="text-sm font-medium text-slate-900 dark:text-white cursor-pointer">
                  Entregado
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="create-pagado"
                  checked={form.pagado}
                  onChange={(e) => setForm({ ...form, pagado: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 accent-blue-600"
                />
                <label htmlFor="create-pagado" className="text-sm font-medium text-slate-900 dark:text-white cursor-pointer">
                  Pagado
                </label>
              </div>
            </div>

            {/* Imágenes */}
            <div>
              <label className="block text-sm font-medium text-slate-900 dark:text-white mb-3">
                Fotos del Producto *
              </label>
              <ImageUploadInput
                key={`image-upload-create-${imageInputKey}`}
                productId="new"
                onImagesChange={setUploadedImages}
                initialImages={uploadedImages}
              />
              {uploadedImages.length === 0 && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  ⚠ Necesitas al menos una foto para crear el producto
                </p>
              )}
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || uploadedImages.length === 0}
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 !text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors"
              >
                {loading ? "Creando..." : "Crear Producto"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
