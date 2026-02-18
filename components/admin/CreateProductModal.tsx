"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Modal, Button, Input, Textarea, Select } from "@/components/ui";
import ImageUploadInput from "../ImageUploadInput";
import { useProductStatuses, useFormState, useAsyncAction } from "@/hooks";
import { productApi } from "@/lib/api";
import { PRODUCT_CONDITIONS } from "@/lib/constants";
import type { UploadedImage, CreateProductModalProps } from "@/lib/types";

interface Attribute {
  id: string;
  name: string;
  type: "TEXT" | "SELECT";
  required: boolean;
  options: { id: string; value: string }[];
}

interface AttributeSelectorProps {
  label: string;
  required: boolean;
  options: { id: string; value: string }[];
  selectedIds: string[];
  onChange: (optionId: string) => void;
  alwaysOpen?: boolean;
}

function AttributeSelector({ label, required, options, selectedIds, onChange, alwaysOpen }: AttributeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openPanel = typeof alwaysOpen === "boolean" ? alwaysOpen : isOpen;
  const selectedOptions = options.filter(opt => selectedIds.includes(opt.id));
  const availableOptions = options.filter(opt => !selectedIds.includes(opt.id));

  return (
    <div>
      <label className="block text-sm font-medium text-brand-dark dark:text-white mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {selectedOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className="inline-flex items-center gap-1 px-3 py-1 bg-brand-pill rounded-full text-sm font-semibold hover:bg-brand-100 transition-colors border border-brand-primary"
            style={{ minHeight: 32 }}
          >
            {opt.value}
            <span className="ml-1 text-brand-primary font-bold">×</span>
          </button>
        ))}
        {selectedOptions.length === 0 && (
          <span className="text-sm text-brand-muted dark:text-brand-light italic">
            Ninguna seleccionada
          </span>
        )}
        {/* Mostrar siempre el botón Agregar si hay opciones disponibles */}
        {availableOptions.length > 0 && !openPanel && (
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1 text-sm font-semibold rounded-full bg-brand-primary text-white hover:bg-brand-primary-dark transition-colors"
          >
            Agregar
          </button>
        )}
      </div>
      {/* Panel desplegable */}
      {options.length > 0 && openPanel && (
        <div className="mt-2 p-2 bg-brand-light dark:bg-brand-dark rounded-lg border border-brand-border dark:border-brand-primary">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {options.map((opt) => (
              <label key={opt.id} className="flex items-center gap-1 cursor-pointer hover:bg-brand-accent dark:hover:bg-brand-primary p-1 rounded">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(opt.id)}
                  onChange={() => {
                    onChange(opt.id);
                  }}
                  className="w-3 h-3 rounded border border-brand-border dark:border-brand-primary accent-brand-primary"
                />
                <span className="text-xs text-brand-dark dark:text-white">
                  {opt.value}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreateProductModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateProductModalProps) {
  const { statuses, defaultStatus } = useProductStatuses();
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [imageInputKey, setImageInputKey] = useState(0);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [attributeValues, setAttributeValues] = useState<Record<string, string[]>>({});
  const [loadingAttributes, setLoadingAttributes] = useState(true);
  
  const { form, setForm, resetForm } = useFormState<any>({
    title: "",
    description: "",
    statusId: defaultStatus?.id || "",
    entregado: false,
    pagado: false,
    condition: "Excellent",
    measurements: "",
    price: "",
    images: [],
  });

  const { loading, error, execute } = useAsyncAction();

  // Cargar atributos cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      fetchAttributes();
    }
  }, [isOpen]);

  const fetchAttributes = async () => {
    try {
      setLoadingAttributes(true);
      const res = await fetch("/api/attributes");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAttributes(data);
      setAttributeValues({});
    } catch {
      toast.error("Error al cargar atributos");
    } finally {
      setLoadingAttributes(false);
    }
  };

  const handleAttributeChange = (attributeId: string, value: string, isMultiple?: boolean) => {
    setAttributeValues((prev) => {
      const attr = attributes.find((a) => a.id === attributeId);
      
      if (attr?.type === "SELECT" && isMultiple) {
        // Para SELECT: manejar múltiples valores
        const currentValues = prev[attributeId] || [];
        const updatedValues = currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value];
        return {
          ...prev,
          [attributeId]: updatedValues,
        };
      } else {
        // Para TEXT: apenas un valor (mantener como array de un elemento)
        return {
          ...prev,
          [attributeId]: [value],
        };
      }
    });
  };

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
      setAttributeValues({});
      setImageInputKey((prev) => prev + 1);
    }
  }, [isOpen, resetForm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (uploadedImages.length === 0) {
      toast.error("❌ Debes agregar al menos una imagen");
      return;
    }

    // Validar atributos requeridos
    for (const attr of attributes) {
      if (attr.required && !attributeValues[attr.id]) {
        toast.error(`❌ El atributo "${attr.name}" es requerido`);
        return;
      }
    }

    await execute(
      async () => {
        const submitData: any = {
          ...form,
          price: form.price === "" ? 0 : parseInt(form.price),
          images: uploadedImages.map((img) => img.url).join(","),
          attributes: Object.entries(attributeValues).flatMap(([attributeId, values]) => {
            const attr = attributes.find((a) => a.id === attributeId);
            // values es siempre un array ahora
            return (values || []).map((value) => ({
              attributeId,
              textValue: attr?.type === "TEXT" ? value : null,
              optionId: attr?.type === "SELECT" ? value : null,
            }));
          }),
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
    <Modal isOpen={isOpen} onClose={onClose} title="Crear Producto" size="xl" fullscreenMobile={true}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-6">
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
              <Textarea
                label="Medidas"
                value={form.measurements}
                onChange={(e) => setForm({ ...form, measurements: e.target.value })}
                placeholder="Ej: Size 42"
              />
              <Input
                label="Precio (pesos)"
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
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
                  className="w-5 h-5 rounded border-2 border-brand-border dark:border-brand-primary accent-brand-primary"
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
                  className="w-5 h-5 rounded border-2 border-brand-border dark:border-brand-primary accent-brand-primary"
                />
                <label
                  htmlFor="create-pagado"
                  className="text-sm font-medium text-slate-900 dark:text-white cursor-pointer"
                >
                  Pagado
                </label>
              </div>
            </div>
            {!loadingAttributes && attributes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Características
                </h3>
                {attributes.map((attr) => (
                  <div key={attr.id}>
                    {attr.type === "TEXT" ? (
                      <Input
                        label={attr.name}
                        required={attr.required}
                        type="text"
                        value={(attributeValues[attr.id] || [])[0] || ""}
                        onChange={(e) =>
                          handleAttributeChange(attr.id, e.target.value)
                        }
                        placeholder={`Ingresa ${attr.name.toLowerCase()}`}
                      />
                    ) : (
                      <AttributeSelector
                        label={attr.name}
                        required={attr.required}
                        options={attr.options}
                        selectedIds={attributeValues[attr.id] || []}
                        onChange={(optionId) => handleAttributeChange(attr.id, optionId, true)}
                        alwaysOpen={true}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div> {/* End left column */}
          {/* Right column */}
          <div className="space-y-6">
            <ImageUploadInput
              key={`image-upload-create-${imageInputKey}`}
              productId={"new"}
              onImagesChange={setUploadedImages}
              initialImages={[]}
            />
          </div>
        </div>
        {/* Sticky action buttons for mobile */}
        <div className="modal-action-bar-create fixed bottom-0 left-0 w-full bg-white dark:bg-[#2E2E2E] py-4 px-4 flex gap-3 border-t border-[#E5E7EB] dark:border-[#25304A] z-20 sm:static sm:border-none sm:bg-transparent sm:px-0">
          <style>{`
            @media (min-width: 640px) {
              .modal-action-bar-create { position: static !important; }
            }
          `}</style>
          <Button type="submit" fullWidth loading={loading} className="bg-[#04b948] hover:bg-[#039e3a] text-white font-semibold border-none" style={{ boxShadow: '0 2px 8px 0 #04b94822' }}>
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
