"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ImageUploadInput from "../ImageUploadInput";

interface UploadedImage {
  id: string;
  url: string;
  isMain?: boolean;
  displayOrder?: number;
}

type Product = {
  id?: string;
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

export default function AdminProductForm({ 
  initialProduct,
  initialImages = []
}: { 
  initialProduct?: Product;
  initialImages?: UploadedImage[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [statuses, setStatuses] = useState<ProductStatus[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(initialImages);

  const [form, setForm] = useState<Product>(
    initialProduct || {
      title: "",
      description: "",
      statusId: "",
      entregado: false,
      pagado: false,
      condition: "Excellent",
      measurements: "",
      price: 0,
      images: "",
    }
  );

  const conditions = ["Excellent", "Very good", "Good", "Regular"];

  // Cargar statuses disponibles
  useEffect(() => {
    fetch('/api/product-statuses')
      .then((res) => res.json())
      .then((data) => {
        setStatuses(data);
        // Si no hay statusId inicial, usar el default
        if (!form.statusId && data.length > 0) {
          const defaultStatus = data.find((s: ProductStatus) => s.isDefault) || data[0];
          setForm(prev => ({ ...prev, statusId: defaultStatus.id }));
        }
      })
      .catch((err) => console.error('Error loading statuses:', err));
  }, [form.statusId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Si hay imágenes subidas, actualizar la lista en el formulario
      if (uploadedImages.length > 0) {
        const imageUrls = uploadedImages.map(img => img.url).join(",");
        setForm(prev => ({ ...prev, images: imageUrls }));
      }

      const method = initialProduct?.id ? "PUT" : "POST";
      const url = initialProduct?.id
        ? `/api/products/${initialProduct.id}`
        : "/api/products";

      // Usar form.images (que puede contener URLs nuevas de upload o las antiguas)
      const submitData = {
        ...form,
        images: uploadedImages.length > 0 
          ? uploadedImages.map(img => img.url).join(",")
          : form.images,
      };

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el producto");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
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
            onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) })}
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
          productId={initialProduct?.id || "new"}
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
          className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors"
        >
          {loading ? "Guardando..." : initialProduct ? "Actualizar" : "Crear"} Producto
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 px-4 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
