"use client";

import { useState } from "react";
import products from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  // Estado para el filtro seleccionado (todos, disponible, reservado, etc)
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  // Estado para la búsqueda de productos
  const [searchQuery, setSearchQuery] = useState("");

  // Define el orden en que se muestran los estados
  // Los números definen la prioridad (1 = primero, 5 = último)
  const stateOrder: Record<string, number> = {
    available: 1,
    reserved: 2,
    paid: 3,
    delivered: 4,
    sold: 5,
  };

  // Filtrar productos según estado y búsqueda
  const filteredProducts = products
    .filter((product) => {
      // Si el filtro es "all", mostrar todo. Si no, comparar con el estado seleccionado
      if (selectedFilter !== "all" && product.state !== selectedFilter) {
        return false;
      }
      // Si hay texto de búsqueda, filtrar por título, descripción o condición
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.condition.toLowerCase().includes(query)
        );
      }
      return true;
    })
    // Ordenar productos por su estado (disponibles primero)
    .sort((a, b) => {
      const orderA = stateOrder[a.state] || 999;
      const orderB = stateOrder[b.state] || 999;
      return orderA - orderB;
    });

  // Contar cuántos productos hay en cada categoría
  const counts = {
    all: products.length,
    available: products.filter((p) => p.state === "available").length,
    reserved: products.filter((p) => p.state === "reserved").length,
    paid: products.filter((p) => p.state === "paid").length,
    delivered: products.filter((p) => p.state === "delivered").length,
    sold: products.filter((p) => p.state === "sold").length,
  };

  // Array de filtros para mostrar como botones
  const filters = [
    { id: "all", label: "Todos", count: counts.all },
    { id: "available", label: "Disponible", count: counts.available },
    { id: "reserved", label: "Reservado", count: counts.reserved },
    { id: "paid", label: "Pagado", count: counts.paid },
    { id: "delivered", label: "Entregado", count: counts.delivered },
    { id: "sold", label: "Vendido", count: counts.sold },
  ];

  return (
    // Contenedor principal con padding y ancho máximo
    // px-4: padding horizontal en mobile (1rem)
    // sm:px-6: aumenta a 1.5rem en tablets
    // lg:px-8: aumenta a 2rem en desktop
    // py-8: padding vertical 2rem
    // md:py-12: aumenta a 3rem en tablets
    // max-w-7xl: ancho máximo de 80rem (1280px)
    // mx-auto: centra horizontalmente
    <main className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl mx-auto">
      {/* Título principal */}
      {/* text-4xl: 36px en mobile */}
      {/* sm:text-5xl: 48px en tablets y arriba */}
      {/* font-bold: peso 700 */}
      {/* mb-2: margen inferior 0.5rem */}
      {/* tracking-tight: reduce el espaciado entre letras (-0.025em) */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight">
        Nati y Tito venden sus cosas :D
      </h1>
      {/* Subtítulo descriptivo */}
      {/* text-gray-600: color gris en light mode */}
      {/* dark:text-gray-400: color gris más claro en dark mode */}
      {/* mb-8: margen inferior 2rem */}
      {/* text-lg: 18px font size */}
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
        Descubre nuestros productos disponibles
      </p>

      {/* Sección de botones de WhatsApp */}
      {/* flex: utiliza flexbox para layout */}
      {/* flex-wrap: los botones se envuelven si no caben */}
      {/* gap-3: espacio entre botones (0.75rem) */}
      {/* mb-8: margen inferior 2rem */}
      <div className="mb-8 flex flex-wrap gap-3">
        {/* Botón de WhatsApp para Tito */}
        {/* inline-flex: flexbox inline para alinear items */}
        {/* items-center: centra verticalmente los items (el emoji y el texto) */}
        {/* gap-2: espacio entre icon y texto (0.5rem) */}
        {/* px-4: padding horizontal 1rem */}
        {/* py-2: padding vertical 0.5rem */}
        {/* bg-green-500: color de fondo verde (WhatsApp) */}
        {/* hover:bg-green-600: verde más oscuro al pasar el mouse */}
        {/* text-white: texto blanco */}
        {/* font-semibold: peso 600 */}
        {/* rounded-lg: bordes redondeados (0.5rem) */}
        {/* transition-colors: anima cambios de color suavemente */}
        <a
          href="https://wa.me/56991594818?text=Hola%20Tito%2C%20te%20escribo%20desde%20tu%20cat%C3%A1logo%20de%20productos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
        >
          💬 WhatsApp Tito
        </a>
        {/* Botón de WhatsApp para Nati - mismos estilos que Tito */}
        <a
          href="https://wa.me/56996990301?text=Hola%20Nati%2C%20te%20escribo%20desde%20tu%20cat%C3%A1logo%20de%20productos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
        >
          💬 WhatsApp Nati
        </a>
      </div>

      {/* Sección de búsqueda */}
      {/* mb-8: margen inferior 2rem */}
      <div className="mb-8">
        {/* Input de búsqueda */}
        {/* w-full: 100% de ancho */}
        {/* max-w-md: máximo 28rem (448px) */}
        {/* px-4: padding horizontal 1rem */}
        {/* py-3: padding vertical 0.75rem */}
        {/* border-2: borde de 2px */}
        {/* border-gray-300: borde gris claro */}
        {/* dark:border-gray-600: borde gris más oscuro en dark mode */}
        {/* rounded-lg: bordes redondeados */}
        {/* bg-white: fondo blanco */}
        {/* dark:bg-gray-900: fondo muy oscuro en dark mode */}
        {/* text-gray-900: texto oscuro */}
        {/* dark:text-white: texto blanco en dark mode */}
        {/* placeholder-gray-500: color del placeholder gris */}
        {/* dark:placeholder-gray-400: placeholder más claro en dark */}
        {/* focus:outline-none: quita el outline por defecto del navegador */}
        {/* focus:border-blue-500: borde azul al hacer focus */}
        {/* dark:focus:border-blue-400: azul más claro en dark mode */}
        {/* transition-colors: anima cambios de color */}
        <input
          type="text"
          placeholder="🔍 Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
        />
      </div>

      {/* Sección de filtros */}
      {/* mb-8: margen inferior 2rem */}
      <div className="mb-8">
        {/* Etiqueta para los filtros */}
        {/* text-sm: tamaño pequeño (14px) */}
        {/* font-medium: peso 500 */}
        {/* text-gray-700: texto gris oscuro */}
        {/* dark:text-gray-300: texto gris claro en dark */}
        {/* mb-3: margen inferior 0.75rem */}
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Filtrar por estado:
        </p>
        {/* Contenedor con flex para mostrar botones en fila */}
        {/* flex: utiliza flexbox */}
        {/* flex-wrap: los botones se envuelven si es necesario */}
        {/* gap-2: espacio entre botones (0.5rem) */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            // Botón de filtro con estilos dinámicos
            // px-4: padding horizontal 1rem
            // py-2: padding vertical 0.5rem
            // rounded-lg: bordes redondeados
            // font-medium: peso 500
            // transition-all: anima todos los cambios suavemente
            // Nota: Los estilos entre llaves son condicionales:
            // Si el filtro está activo (selectedFilter === filter.id):
            //   - bg-blue-500: fondo azul
            //   - hover:bg-blue-600: azul más oscuro al pasar mouse
            //   - text-white: texto blanco
            //   - shadow-md: sombra mediana
            // Si NO está activo:
            //   - bg-gray-200: fondo gris claro
            //   - dark:bg-gray-700: fondo gris en dark
            //   - text-gray-900: texto oscuro
            //   - dark:text-gray-100: texto claro en dark
            //   - hover:bg-gray-300: gris más oscuro al pasar mouse
            //   - dark:hover:bg-gray-600: gris más claro en dark al pasar
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all
                ${
                  // Si el filtro está activo, mostrar en azul, si no, en gris
                  selectedFilter === filter.id
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                }
              `}
            >
              {/* Mostrar el label y el contador entre paréntesis */}
              {filter.label} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Sección de resultados */}
      {filteredProducts.length === 0 ? (
        // Mensaje cuando no hay resultados
        // text-center: centra el texto */}
        // py-12: padding vertical 3rem
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {searchQuery
              ? `No se encontraron productos con "${searchQuery}"`
              : "No hay productos en esta categoría"}
          </p>
        </div>
      ) : (
        <>
          {/* Contador de productos mostrados */}
          {/* text-sm: tamaño pequeño (14px) */}
          {/* text-gray-600: texto gris */}
          {/* dark:text-gray-400: texto gris más claro en dark */}
          {/* mb-6: margen inferior 1.5rem */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Mostrando {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "producto" : "productos"}
          </p>

          {/* Grid de productos - se adapta automáticamente en mobile, tablet y desktop */}
          {/* grid: utiliza CSS Grid */}
          {/* grid-cols-1: 1 columna en mobile */}
          {/* sm:grid-cols-2: 2 columnas en tablets pequeñas (640px+) */}
          {/* lg:grid-cols-3: 3 columnas en tablets grandes (1024px+) */}
          {/* xl:grid-cols-4: 4 columnas en desktop (1280px+) */}
          {/* gap-6: espacio entre items (1.5rem) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
