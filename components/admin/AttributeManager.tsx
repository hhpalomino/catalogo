"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

interface AttributeOption {
  id: string;
  value: string;
  displayOrder: number;
}

interface Attribute {
  id: string;
  name: string;
  type: "TEXT" | "SELECT";
  required: boolean;
  displayOrder: number;
  options: AttributeOption[];
}

export default function AttributeManager() {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "TEXT" as "TEXT" | "SELECT",
    required: false,
    displayOrder: 0,
    options: [] as { value: string; displayOrder: number }[],
  });
  const [newOptionValue, setNewOptionValue] = useState("");

  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    try {
      const res = await fetch("/api/attributes");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setAttributes(data);
    } catch {
      toast.error("Error al cargar atributos");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (attribute?: Attribute) => {
    if (attribute) {
      setEditingAttribute(attribute);
      setFormData({
        name: attribute.name,
        type: attribute.type,
        required: attribute.required,
        displayOrder: attribute.displayOrder,
        options: attribute.options.map((opt) => ({
          value: opt.value,
          displayOrder: opt.displayOrder,
        })),
      });
    } else {
      setEditingAttribute(null);
      setFormData({
        name: "",
        type: "TEXT",
        required: false,
        displayOrder: attributes.length,
        options: [],
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAttribute(null);
    setNewOptionValue("");
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("El nombre es requerido");
      return;
    }

    if (formData.type === "SELECT" && formData.options.length === 0) {
      toast.error("Debe agregar al menos una opción");
      return;
    }

    try {
      const url = editingAttribute
        ? `/api/attributes/${editingAttribute.id}`
        : "/api/attributes";
      const method = editingAttribute ? "PUT" : "POST";

      // Recalcular displayOrder basado en índice actual
      const dataToSend = {
        ...formData,
        options: formData.options.map((opt, index) => ({
          ...opt,
          displayOrder: index,
        })),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) throw new Error();

      toast.success(
        editingAttribute
          ? "Atributo actualizado"
          : "Atributo creado exitosamente"
      );
      fetchAttributes();
      handleCloseModal();
    } catch {
      toast.error("Error al guardar atributo");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este atributo? Esta acción no se puede deshacer."))
      return;

    try {
      const res = await fetch(`/api/attributes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Atributo eliminado");
      fetchAttributes();
    } catch {
      toast.error("Error al eliminar atributo");
    }
  };

  const handleAddOption = () => {
    if (!newOptionValue.trim()) return;
    setFormData((prev) => ({
      ...prev,
      options: [
        ...prev.options,
        { value: newOptionValue.trim(), displayOrder: prev.options.length },
      ],
    }));
    setNewOptionValue("");
  };

  const handleRemoveOption = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-neutral-600 dark:text-neutral-400">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <Button
          onClick={() => handleOpenModal()}
          variant="primary"
          className="flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} />
          Nuevo Atributo
        </Button>
      </div>

      {attributes.length === 0 ? (
        <div className="text-center py-12 bg-light dark:bg-dark-alt rounded-lg">
          <p className="text-neutral-600 dark:text-neutral-400">
            No hay atributos. Crea uno para comenzar.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {attributes.map((attr) => (
            <div
              key={attr.id}
              className="p-6 bg-light dark:bg-dark-alt rounded-lg border border-neutral-300 dark:border-dark-border"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-brand-dark dark:text-white">
                    {attr.name}
                    {attr.required && (
                      <span className="ml-2 text-sm text-brand-primary">
                        (Requerido)
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-brand-muted dark:text-brand-light mt-1">
                    Tipo: {attr.type === "TEXT" ? "Texto" : "Selección"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleOpenModal(attr)}
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleDelete(attr.id)}
                    variant="danger"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    Eliminar
                  </Button>
                </div>
              </div>

              {attr.type === "SELECT" && attr.options.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-brand-dark dark:text-brand-light mb-2">
                    Opciones:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {attr.options.map((opt) => (
                      <span
                        key={opt.id}
                        className="px-3 py-1 bg-brand-accent dark:bg-brand-primary text-sm rounded-full"
                      >
                        {opt.value}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingAttribute ? "Editar Atributo" : "Nuevo Atributo"}
      >
        <div className="space-y-4">
          <Input
            label="Nombre del atributo"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="ej: Categoría, Color, Marca..."
            required
          />

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Tipo
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  type: e.target.value as "TEXT" | "SELECT",
                }))
              }
              className="w-full px-4 py-2 border border-neutral-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-alt text-neutral-900 dark:text-white"
            >
              <option value="TEXT">Texto</option>
              <option value="SELECT">Selección</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="required"
              checked={formData.required}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, required: e.target.checked }))
              }
              className="w-4 h-4"
            />
            <label
              htmlFor="required"
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Campo requerido
            </label>
          </div>

          {formData.type === "SELECT" && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Opciones
              </label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newOptionValue}
                  onChange={(e) => setNewOptionValue(e.target.value)}
                  placeholder="Nueva opción..."
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddOption();
                    }
                  }}
                />
                <Button
                  onClick={handleAddOption}
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  Agregar
                </Button>
              </div>

              {formData.options.length > 0 && (
                <div className="space-y-2">
                  {formData.options.map((opt, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-neutral-100 dark:bg-dark rounded"
                    >
                      <span className="text-sm text-neutral-900 dark:text-white">
                        {opt.value}
                      </span>
                      <button
                        onClick={() => handleRemoveOption(index)}
                        className="text-brand-primary hover:text-brand-primary-dark"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button onClick={handleCloseModal} variant="secondary">
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              variant="primary"
              className="flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faSave} />
              {editingAttribute ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
