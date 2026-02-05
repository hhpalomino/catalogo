"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faX } from "@fortawesome/free-solid-svg-icons";

interface UploadedImage {
  id: string;
  url: string;
  isMain?: boolean;
  displayOrder?: number;
}

interface ImageUploadInputProps {
  productId: string;
  onImagesChange: (images: UploadedImage[]) => void;
  initialImages?: UploadedImage[];
}

export default function ImageUploadInput({
  productId,
  onImagesChange,
  initialImages = [],
}: ImageUploadInputProps) {
  const [images, setImages] = useState<UploadedImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>("");

  // Actualizar imágenes cuando cambien las iniciales (incluso si es un array vacío)
  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  const handleFileSelect = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.currentTarget.files;
      if (!files) return;

      setError("");
      setUploading(true);

      try {
        for (const file of Array.from(files)) {
          // Validación en cliente
          if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setError("Solo JPG, PNG y WebP permitidos");
            continue;
          }
          if (file.size > 5 * 1024 * 1024) {
            setError("Máximo 5MB por imagen");
            continue;
          }

          // Subir archivo
          const formData = new FormData();
          formData.append("file", file);
          formData.append("productId", productId);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const data = await response.json();
            setError(data.error || "Error al subir imagen");
            continue;
          }

          const data = await response.json();
          const newImage: UploadedImage = {
            id: data.image.id,
            url: data.image.imageUrl,
            isMain: data.image.isMain,
            displayOrder: data.image.displayOrder,
          };

          setImages((prev) => [...prev, newImage]);
        }
      } catch (err) {
        setError("Error al subir imagen");
        console.error(err);
      } finally {
        setUploading(false);
      }
    },
    [productId]
  );

  const handleRemoveImage = (imageId: string) => {
    // Solo eliminar localmente, no llamar a la API
    // La eliminación real se hará cuando se actualice el producto
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleSetMainImage = (imageId: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isMain: img.id === imageId,
      }))
    );
  };

  // Notificar cambios al padre
  const handleImagesChange = useCallback(() => {
    onImagesChange(images);
  }, [images, onImagesChange]);

  // Efecto para notificar cambios
  useEffect(() => {
    handleImagesChange();
  }, [images, handleImagesChange]);

  return (
    <div className="space-y-4">
      {/* Upload input */}
      <div className="relative">
        <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faCloud} className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">
              Arrastra o haz clic para subir fotos
            </span>
            <span className="text-xs text-gray-500">
              JPG, PNG o WebP. Máximo 5MB
            </span>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {uploading && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-600 text-sm">
          Subiendo imágenes...
        </div>
      )}

      {/* Galería de imágenes subidas */}
      {images.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">
            Imágenes ({images.length})
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={image.url}
                    alt="Producto"
                    fill
                    className="object-cover"
                  />
                  {image.isMain && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Principal
                    </div>
                  )}
                </div>

                {/* Controles */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 opacity-0 group-hover:opacity-100 transition p-2 flex gap-2">
                  {!image.isMain && (
                    <button
                      onClick={() => handleSetMainImage(image.id)}
                      className="flex-1 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded font-medium transition"
                    >
                      Destacar
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveImage(image.id)}
                    className="flex-1 px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded font-medium transition flex items-center justify-center gap-1"
                  >
                    <FontAwesomeIcon icon={faX} className="w-3 h-3" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
