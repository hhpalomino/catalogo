"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPriceCLP } from "@/lib/product-ui";
import StateBadge from "@/components/StateBadge";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    // Link a la página de detalle del producto
    // href: construye la URL dinámicamente con el ID del producto
    <Link href={`/product/${product.id}`}>
      <div
        // Contenedor principal de la tarjeta
        // border: borde gris sutil
        // border-gray-200: color del borde en light mode
        // dark:border-gray-700: borde más oscuro en dark mode
        // rounded-lg: bordes redondeados (0.5rem)
        // p-4: padding interno 1rem
        // relative: posicionamiento relativo para el badge absolute
        // overflow-hidden: oculta contenido que se sale del contenedor
        // bg-white: fondo blanco
        // dark:bg-gray-900: fondo muy oscuro en dark mode
        // cursor-pointer: cambia el cursor a manita
        // transition-shadow: anima cambios de sombra
        // hover:shadow-lg: sombra grande al pasar mouse
        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 relative overflow-hidden bg-white dark:bg-gray-900 cursor-pointer transition-shadow hover:shadow-lg"
      >
        {/* Badge con el estado del producto */}
        {/* absolute: posicionamiento absoluto */}
        {/* top-3: 0.75rem desde la parte superior */}
        {/* left-3: 0.75rem desde la izquierda */}
        {/* z-10: aparece encima de otros elementos */}
        <div className="absolute top-3 left-3 z-10">
          <StateBadge state={product.state} />
        </div>

        {/* Contenedor de la imagen */}
        {/* relative: para que funcione el "fill" de Next/Image */}
        {/* w-full: ancho 100% */}
        {/* h-40: altura 160px */}
        {/* mb-3: margen inferior 0.75rem */}
        <div className="relative w-full h-40 mb-3">
          {/* Imagen del producto */}
          {/* fill: la imagen llena todo el contenedor padre */}
          {/* sizes: indica qué tamaño de imagen usar según el viewport */}
          {/* object-cover: la imagen cubre todo el espacio sin distorsionarse */}
          {/* rounded-lg: bordes redondeados */}
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-lg"
          />
        </div>

        {/* Título del producto */}
        {/* text-base: tamaño 16px */}
        {/* font-semibold: peso 600 */}
        {/* mb-1: margen inferior pequeño (0.25rem) */}
        {/* line-clamp-2: máximo 2 líneas, corta con ... si es muy largo */}
        <h2 className="text-base font-semibold mb-1 line-clamp-2">
          {product.title}
        </h2>

        {/* Condición del producto */}
        {/* text-sm: tamaño pequeño (14px) */}
        {/* text-gray-600: gris en light mode */}
        {/* dark:text-gray-400: gris claro en dark mode */}
        {/* mb-2: margen inferior 0.5rem */}
        {/* line-clamp-1: máximo 1 línea */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
          {product.condition}
        </p>

        {/* Precio */}
        {/* text-lg: tamaño 18px */}
        {/* font-bold: peso 700 */}
        {/* text-gray-900: texto oscuro */}
        {/* dark:text-white: texto blanco en dark mode */}
        <p className="text-lg font-bold text-gray-900 dark:text-white">
          ${formatPriceCLP(product.price)}
        </p>
      </div>
    </Link>
  );
}