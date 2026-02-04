"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

type Product = {
  id: string;
  title: string;
  description: string;
  state: string;
  condition: string;
  measurements: string;
  price: number;
  images: string[];
};

export default function ProductsClient({ initialProducts }: { initialProducts: Product[] }) {
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
  const filteredProducts = initialProducts
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
    all: initialProducts.length,
    available: initialProducts.filter((p) => p.state === "available").length,
    reserved: initialProducts.filter((p) => p.state === "reserved").length,
    paid: initialProducts.filter((p) => p.state === "paid").length,
    delivered: initialProducts.filter((p) => p.state === "delivered").length,
    sold: initialProducts.filter((p) => p.state === "sold").length,
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
    <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header con gradient de fondo - diseño profesional */}
      {/* -mx-4: extiende el fondo más allá de los márgenes */}
      {/* px-4 sm:px-6 lg:px-8: padding interno responsive */}
      {/* py-12: padding vertical 3rem */}
      {/* bg-gradient-to-r: gradiente de izquierda a derecha */}
      {/* from-slate-50 to-slate-100: gradiente gris claro a más claro */}
      {/* dark:from-slate-950 dark:to-slate-900: gradiente oscuro en dark mode */}
      {/* border-b border-slate-200: borde inferior sutil */}
      {/* dark:border-slate-800: borde más oscuro en dark */}
      {/* mb-12: margen inferior 3rem */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-b border-slate-200 dark:border-slate-800 mb-12">
        {/* Título principal con gradiente verde sage a naranja */}
        {/* text-4xl sm:text-5xl lg:text-6xl: tamaños responsive (36px → 60px) */}
        {/* font-bold: peso 700 */}
        {/* tracking-tight: reduce espaciado entre letras */}
        {/* bg-clip-text: permite aplicar gradiente al texto */}
        {/* bg-gradient-to-r from-emerald-600 to-orange-500: verde sage a naranja */}
        {/* text-transparent: hace el texto transparente para mostrar el gradiente */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text bg-gradient-to-r from-emerald-600 to-orange-500 dark:from-emerald-400 dark:to-orange-400 text-transparent">
          Nati y Tito
        </h1>
        {/* Subtítulo mejorado */}
        {/* text-lg sm:text-xl: tamaño responsive (18px → 20px) */}
        {/* text-slate-700 dark:text-slate-300: color responsive para dark mode */}
        {/* font-medium: peso 500 */}
        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-300 font-medium">
          Venden sus cosas
        </p>
      </div>

      {/* Sección de botones de WhatsApp */}
      {/* flex: utiliza flexbox para layout */}
      {/* flex-wrap: los botones se envuelven si no caben */}
      {/* gap-3: espacio entre botones (0.75rem) */}
      {/* mb-8: margen inferior 2rem */}
      <div className="mb-8 flex flex-wrap gap-3">
        {/* Botón de WhatsApp para Tito - verde sage */}
        {/* inline-flex: flexbox inline para alinear items */}
        {/* items-center: centra verticalmente los items (el emoji y el texto) */}
        {/* gap-2: espacio entre icon y texto (0.5rem) */}
        {/* px-4: padding horizontal 1rem */}
        {/* py-2: padding vertical 0.5rem */}
        {/* bg-emerald-600: color verde sage profesional */}
        {/* hover:bg-emerald-700: verde más oscuro al pasar el mouse */}
        {/* text-white: texto blanco */}
        {/* font-semibold: peso 600 */}
        {/* rounded-lg: bordes redondeados (0.5rem) */}
        {/* shadow-md: sombra mediana */}
        {/* hover:shadow-lg: sombra grande al pasar el mouse */}
        {/* transition-colors: anima cambios de color suavemente */}
        <a
          href="https://wa.me/56991594818?text=Hola%20Tito%2C%20te%20escribo%20desde%20tu%20cat%C3%A1logo%20de%20productos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors"
        >
          💬 WhatsApp Tito
        </a>
        {/* Botón de WhatsApp para Nati - mismo color verde sage */}
        <a
          href="https://wa.me/56996990301?text=Hola%20Nati%2C%20te%20escribo%20desde%20tu%20cat%C3%A1logo%20de%20productos"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors"
        >
          💬 WhatsApp Nati
        </a>
      </div>

      {/* Botón para ir al admin panel */}
      <div className="mb-8 flex gap-3">
        <a
          href="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors"
        >
          ⚙️ Admin
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
        {/* border-slate-300: borde gris claro */}
        {/* dark:border-slate-600: borde gris más oscuro en dark mode */}
        {/* rounded-lg: bordes redondeados */}
        {/* bg-white: fondo blanco */}
        {/* dark:bg-slate-900: fondo muy oscuro en dark mode */}
        {/* text-slate-900: texto oscuro */}
        {/* dark:text-white: texto blanco en dark mode */}
        {/* placeholder-slate-500: color del placeholder gris */}
        {/* dark:placeholder-slate-400: placeholder más claro en dark */}
        {/* focus:outline-none: quita el outline por defecto del navegador */}
        {/* focus:border-emerald-500: borde verde sage al hacer focus */}
        {/* dark:focus:border-emerald-400: verde sage claro en dark mode */}
        {/* transition-colors: anima cambios de color */}
        <input
          type="text"
          placeholder="🔍 Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-3 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-colors"
        />
      </div>

      {/* Sección de filtros */}
      {/* mb-8: margen inferior 2rem */}
      <div className="mb-8">
        {/* Etiqueta para los filtros */}
        {/* text-sm: tamaño pequeño (14px) */}
        {/* font-medium: peso 500 */}
        {/* text-slate-700: texto gris oscuro */}
        {/* dark:text-slate-300: texto gris claro en dark */}
        {/* mb-3: margen inferior 0.75rem */}
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
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
            //   - bg-emerald-600: fondo verde sage
            //   - hover:bg-emerald-700: verde más oscuro al pasar mouse
            //   - text-white: texto blanco
            //   - shadow-md: sombra mediana
            // Si NO está activo:
            //   - bg-slate-200: fondo gris claro
            //   - dark:bg-slate-700: fondo gris en dark
            //   - text-slate-900: texto oscuro
            //   - dark:text-slate-100: texto claro en dark
            //   - hover:bg-slate-300: gris más oscuro al pasar mouse
            //   - dark:hover:bg-slate-600: gris más claro en dark al pasar
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all
                ${
                  // Si el filtro está activo, mostrar en verde sage, si no, en gris
                  selectedFilter === filter.id
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600"
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
