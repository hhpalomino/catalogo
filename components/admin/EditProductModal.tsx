"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Modal, Button, Input, Textarea, Select } from "@/components/ui";
import ImageUploadInput from "../ImageUploadInput";
import { useProductStatuses, useProduct, useAsyncAction } from "@/hooks";
import { productApi } from "@/lib/api";
import { PRODUCT_CONDITIONS } from "@/lib/constants";
import type { ProductInput, UploadedImage, EditProductModalProps } from "@/lib/types";

export default function EditProductModal({
  isOpen,
  onClose,
  productId,
  onSuccess,
}: EditProductModalProps) {
  const { statuses } = useProductStatuses();
  const { product, loading: loadingProduct, error: productError } = useProduct(
    isOpen ? productId : null
  );
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [imageInputKey, setImageInputKey] = useState(0);

  const [form, setForm] = useState<ProductInput>({
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

  const { loading, error, execute } = useAsyncAction();

  // Cargar datos del producto en el formulario (solo cuando el producto cambia)
  useEffect(() => {
    if (!product) return;

    setForm({
      title: product.title,
      description: product.description,
      statusId: product.statusId,
      entregado: product.entregado,
      pagado: product.pagado,
      condition: product.condition as any,
      measurements: product.measurements,
      price: product.price,
      images: product.images,
    });

    // Convertir imágenes si es array
    if (Array.isArray((product as any).images)) {
      const images = (product as any).images.map((img: any, index: number) => ({
        id: img.id,
        url: img.imageUrl,
        isMain: img.isMain,
        displayOrder: img.displayOrder || index,
      }));
      setUploadedImages(images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]); // Solo cuando cambia el ID del producto

  // Resetear cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setForm({
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
      setUploadedImages([]);
      setImageInputKey((prev) => prev + 1);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productId) return;

    await execute(
      async () => {
        const submitData = {
          ...form,
          images: uploadedImages.length > 0
            ? uploadedImages.map((img) => img.url).join(",")
            : form.images,
        };
        return await productApi.update(productId, submitData);
      },
      () => {
        toast.success(`✅ Producto "${form.title}" actualizado exitosamente`);
        onClose();
        onSuccess?.();
      },
      (err) => {
        toast.error(`❌ ${err.message}`);
      }
    );
  };

  if (loadingProduct) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Producto" size="lg">
        <div className="flex items-center justify-center py-12">
          <span className="text-lg">Cargando producto...</span>
        </div>
      </Modal>
    );
  }

  if (productError) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Producto" size="lg">
        <div className="p-4 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-lg">
          {productError}
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Producto" size="lg">
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
              id="edit-entregado"
              checked={form.entregado}
              onChange={(e) => setForm({ ...form, entregado: e.target.checked })}
              className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 accent-blue-600"
            />
            <label
              htmlFor="edit-entregado"
              className="text-sm font-medium text-slate-900 dark:text-white cursor-pointer"
            >
              Entregado
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="edit-pagado"
              checked={form.pagado}
              onChange={(e) => setForm({ ...form, pagado: e.target.checked })}
              className="w-5 h-5 rounded border-2 border-slate-300 dark:border-slate-600 accent-blue-600"
            />
            <label
              htmlFor="edit-pagado"
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
            key={`image-upload-edit-${imageInputKey}`}
            productId={productId || "new"}
            onImagesChange={setUploadedImages}
            initialImages={uploadedImages}
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" variant="primary" fullWidth loading={loading}>
            Guardar Cambios
          </Button>
          <Button type="button" variant="secondary" fullWidth onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </form>
    </Modal>
  );
}
