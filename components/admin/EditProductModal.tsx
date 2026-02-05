"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import ImageUploadInput from "../ImageUploadInput";

interface UploadedImage {
  id: string;
  url: string;
  isMain?: boolean;
  displayOrder?: number;
}

type Product = {
  id: string;
  title: string;
  description: string;
  statusId: string;
  entregado: boolean;
  pagado: boolean;
  condition: string;
  measurements: string;
  price: number;
  images: string;
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

type EditProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  productId: string | null;
  onSuccess?: () => void;
};

export default function EditProductModal({
  isOpen,
  onClose,
  productId,
  onSuccess,
}: EditProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [error, setError] = useState("");
  const [statuses, setStatuses] = useState<ProductStatus[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [imageInputKey, setImageInputKey] = useState(0); // Para forzar re-mount del componente
  const [form, setForm] = useState<Product>({
    id: "",
    title: "",
    description: "",
    statusId: "",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "",
    price: 0,
    images: "",
  });

  const conditions = ["Excellent", "Very good", "Good", "Regular"];

  // Cargar statuses disponibles
  useEffect(() => {
    if (isOpen) {
      fetch('/api/product-statuses')
        .then((res) => res.json())
        .then((data) => setStatuses(data))
        .catch((err) => console.error('Error loading statuses:', err));
    }
  }, [isOpen]);

  // Cargar producto cuando se abre el modal o resetear cuando se cierra
  useEffect(() => {
    if (isOpen && productId) {
      setLoadingProduct(true);
      setError("");
      fetch(`/api/products/${productId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Error al cargar el producto");
          return res.json();
        })
        .then((data) => {
          setForm({
            id: data.id,
            title: data.title,
            description: data.description,
            statusId: data.statusId,
            entregado: data.entregado,
            pagado: data.pagado,
            condition: data.condition,
            measurements: data.measurements,
            price: data.price,
            images: Array.isArray(data.images) 
              ? data.images.map((img) => (img as { id: string; imageUrl: string }).imageUrl).join(",")
              : data.images,
          });
          
          // Cargar imágenes para el componente ImageUploadInput
          if (Array.isArray(data.images)) {
            const images = data.images.map((img, index: number) => ({
              id: (img as { id: string; imageUrl: string; isMain?: boolean; displayOrder?: number }).id,
              url: (img as { id: string; imageUrl: string; isMain?: boolean; displayOrder?: number }).imageUrl,
              isMain: (img as { id: string; imageUrl: string; isMain?: boolean; displayOrder?: number }).isMain,
              displayOrder: (img as { id: string; imageUrl: string; isMain?: boolean; displayOrder?: number }).displayOrder || index,
            }));
            setUploadedImages(images);
          }
        })
        .catch((err) => {
          setError(err.message || "Error al cargar el producto");
        })
        .finally(() => {
          setLoadingProduct(false);
        });
    } else if (!isOpen) {
      // Resetear estado cuando se cierra el modal
      setUploadedImages([]);
      setError("");
      setLoading(false);
      setImageInputKey(prev => prev + 1); // Forzar re-mount del ImageUploadInput
    }
  }, [isOpen, productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Usar las imágenes del componente ImageUploadInput
      const submitData = {
        ...form,
        images: uploadedImages.length > 0 
          ? uploadedImages.map(img => img.url).join(",")
          : form.images,
      };

      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }

      toast.success(`✅ Producto "${form.title}" actualizado exitosamente`);
      // Cerrar modal y notificar éxito
      onClose();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      toast.error(`❌ ${errorMessage}`);
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
            Editar Producto
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
          {loadingProduct ? (
            <div className="text-center py-12">
              <p className="text-slate-600 dark:text-slate-400">Cargando producto...</p>
            </div>
          ) : (
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
                    id="entregado"
                    checked={form.entregado}
                    onChange={(e) => setForm({ ...form, entregado: e.target.checked })}
                    className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 accent-blue-600"
                  />
                  <label htmlFor="entregado" className="text-sm font-medium text-slate-900 dark:text-white cursor-pointer">
                    Entregado
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="pagado"
                    checked={form.pagado}
                    onChange={(e) => setForm({ ...form, pagado: e.target.checked })}
                    className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 accent-blue-600"
                  />
                  <label htmlFor="pagado" className="text-sm font-medium text-slate-900 dark:text-white cursor-pointer">
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
                  key={`image-upload-${imageInputKey}-${productId}`}
                  productId={productId || "new"}
                  onImagesChange={setUploadedImages}
                  initialImages={uploadedImages}
                />
                {uploadedImages.length === 0 && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                    ⚠ Necesitas al menos una foto para actualizar el producto
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
                  {loading ? "Actualizando..." : "Actualizar Producto"}
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
          )}
        </div>
      </div>
    </div>
  );
}
