"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Modal, Button, Input, Textarea, Select } from "@/components/ui";
import ImageUploadInput from "../ImageUploadInput";
import { useProductStatuses, useFormState, useAsyncAction } from "@/hooks";
import { productApi } from "@/lib/api";
import { PRODUCT_CONDITIONS } from "@/lib/constants";
import type { ProductInput, UploadedImage, CreateProductModalProps } from "@/lib/types";

export default function CreateProductModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateProductModalProps) {
  const { statuses, defaultStatus } = useProductStatuses();
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [imageInputKey, setImageInputKey] = useState(0);
  
  const { form, setForm, resetForm } = useFormState<ProductInput>({
    title: "",
    description: "",
    statusId: defaultStatus?.id || "",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "",
    price: 0,
    images: "",
  });

  const { loading, error, execute } = useAsyncAction();

  // Actualizar statusId cuando se cargan los statuses
  useEffect(() => {
    if (defaultStatus && !form.statusId) {
      setForm((prev) => ({ ...prev, statusId: defaultStatus.id }));
    }
  }, [defaultStatus, form.statusId, setForm]);

  // Resetear cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      resetForm();
      setUploadedImages([]);
      setImageInputKey((prev) => prev + 1);
    }
  }, [isOpen, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploadedImages.length === 0) {
      toast.error("❌ Debes agregar al menos una imagen");
      return;
    }

    await execute(
      async () => {
        const submitData: ProductInput = {
          ...form,
          images: uploadedImages.map((img) => img.url).join(","),
        };
        return await productApi.create(submitData);
      },
      () => {
        toast.success(`✅ Producto "${form.title}" creado exitosamente`);
        onClose();
        onSuccess?.();
      },
      (err) => {
        toast.error(`❌ ${err.message}`);
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Producto" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        <Input
          label="Título"
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Ej: Urban Sneakers"
        />

        <Textarea
          label="Descripción"
          required
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Descripción del producto"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Estado"
            required
            value={form.statusId}
            onChange={(e) => setForm({ ...form, statusId: e.target.value })}
            options={statuses.map((s) => ({ value: s.id, label: s.displayName }))}
          />

          <Select
            label="Condición"
            required
            value={form.condition}
            onChange={(e) => setForm({ ...form, condition: e.target.value as any })}
            options={PRODUCT_CONDITIONS.map((c) => ({ value: c, label: c }))}
          />

          <Input
            label="Medidas"
            type="text"
            required
            value={form.measurements}
            onChange={(e) => setForm({ ...form, measurements: e.target.value })}
            placeholder="Ej: Size 42"
          />

          <Input
            label="Precio (pesos)"
            type="number"
            required
            value={form.price}
            onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
            placeholder="45000"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="create-entregado"
              checked={form.entregado}
              onChange={(e) => setForm({ ...form, entregado: e.target.checked })}
              className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 accent-blue-600"
            />
            <label
              htmlFor="create-entregado"
              className="text-sm font-medium text-slate-900 dark:text-white cursor-pointer"
            >
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
            <label
              htmlFor="create-pagado"
              className="text-sm font-medium text-slate-900 dark:text-white cursor-pointer"
            >
              Pagado
            </label>
          </div>
        </div>

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

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={uploadedImages.length === 0}
          >
            Crear Producto
          </Button>
          <Button type="button" variant="secondary" fullWidth onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
