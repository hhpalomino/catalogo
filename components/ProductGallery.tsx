"use client";

import { useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  // Estado que guarda el índice de la imagen seleccionada
  // Comienza en 0 (la primera imagen)
  const [selectedImage, setSelectedImage] = useState(0);

  // Si no hay imágenes, mostrar un mensaje
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">Sin imágenes</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Imagen principal */}
      {/* relative: posicionamiento relativo para que funcione el fill de Next/Image */}
      {/* w-full: ancho 100% del contenedor padre */}
      {/* h-96: altura 384px (24rem) */}
      {/* mb-4: margen inferior 1rem */}
      <div className="relative w-full h-96 mb-4">
        {/* Imagen principal que cambia al seleccionar un thumbnail */}
        {/* fill: la imagen llena todo el contenedor padre */}
        {/* sizes: especifica qué tamaño de imagen usar según el viewport */}
        {/* object-cover: la imagen cubre el espacio sin distorsionarse */}
        {/* rounded-lg: bordes redondeados */}
        {/* border: borde sutil */}
        {/* priority: carga esta imagen primero (optimización) */}
        <Image
          src={images[selectedImage]}
          alt={`${title} - imagen ${selectedImage + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover rounded-lg border border-gray-300 dark:border-gray-600"
          priority
        />
      </div>

      {/* Thumbnails - solo mostrar si hay más de 1 imagen */}
      {images.length > 1 && (
        <div
          // Contenedor de los thumbnails
          // flex: utiliza flexbox
          // gap-2: espacio entre thumbnails (0.5rem)
          // flex-wrap: los thumbnails se envuelven si es necesario
          className="flex gap-2 flex-wrap"
        >
          {images.map((img, index) => (
            // Cada thumbnail es un botón
            // relative: para que funcione el fill de la imagen
            // w-20: ancho 80px (5rem)
            // h-20: altura 80px (5rem)
            // p-0: sin padding para que la imagen ocupe todo
            // border-2: borde de 2px
            // border-blue-500: borde azul cuando está seleccionado
            // dark:border-blue-400: azul más claro en dark
            // border-gray-300: borde gris cuando NO está seleccionado
            // dark:border-gray-600: gris en dark
            // rounded-lg: bordes redondeados
            // overflow-hidden: oculta la imagen que se sale
            // cursor-pointer: cambia a manita
            // background: transparente para que solo se vea la imagen
            // transition-all: anima cambios suavemente
            // opacity-100: completamente opaco cuando seleccionado
            // opacity-60: semi-transparente (60%) cuando NO seleccionado
            // hover:opacity-100: opaco al pasar mouse
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`
                relative w-20 h-20 p-0 rounded-lg overflow-hidden cursor-pointer
                bg-transparent transition-all
                ${
                  // Si es la imagen seleccionada
                  selectedImage === index
                    ? "border-2 border-blue-500 dark:border-blue-400 opacity-100"
                    : "border-2 border-gray-300 dark:border-gray-600 opacity-60 hover:opacity-100"
                }
              `}
            >
              {/* Imagen thumbnail */}
              {/* fill: llena todo el botón */}
              {/* object-cover: cubre sin distorsionar */}
              <Image
                src={img}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

