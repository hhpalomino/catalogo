"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id?: string;
  title: string;
  description: string;
  state: string;
  condition: string;
  measurements: string;
  price: number;
  images: string;
};

export default function AdminProductForm({ initialProduct }: { initialProduct?: Product }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<Product>(
    initialProduct || {
      title: "",
      description: "",
      state: "available",
      condition: "Excellent",
      measurements: "",
      price: 0,
      images: "",
    }
  );

  const states = ["available", "reserved", "paid", "delivered", "sold"];
  const conditions = ["Excellent", "Very good", "Good", "Regular"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const method = initialProduct?.id ? "PUT" : "POST";
      const url = initialProduct?.id
        ? `/api/products/${initialProduct.id}`
        : "/api/products";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
          className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
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
          className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none h-24"
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
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          >
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
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
            className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
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
            className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
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
            className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            placeholder="45000"
          />
        </div>
      </div>

      {/* Imágenes */}
      <div>
        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
          Imágenes (URLs separadas por coma) *
        </label>
        <textarea
          required
          value={form.images}
          onChange={(e) => setForm({ ...form, images: e.target.value })}
          className="w-full px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none h-20"
          placeholder="/images/product1.jpg,/images/product2.jpg"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Separa las URLs con comas
        </p>
      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors"
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
