"use client";

import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepBackward, faChevronLeft, faChevronRight, faStepForward } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "@/components/ProductCard";
import IntroductionBanner from "@/components/IntroductionBanner";
import EditProductModal from "@/components/admin/EditProductModal";
import { useRouter } from "next/navigation";

type Product = {
  id: string;
  title: string;
  description: string;
  status: {
    id: string;
    name: string;
    displayName: string;
    color: string;
    displayOrder: number;
    isActive: boolean;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  entregado: boolean;
  pagado: boolean;
  condition: string;
  measurements: string;
  price: number;
  images: Array<{
    id: string;
    imageUrl: string;
    isMain: boolean;
    displayOrder: number;
  }>;
};

const ITEMS_PER_PAGE = 12;

export default function ProductsClient({ initialProducts, isAdmin = false }: { initialProducts: Product[], isAdmin?: boolean }) {
  const router = useRouter();
  // Estado para el filtro seleccionado (todos, disponible, pendiente, agotado)
  // Si no es admin, siempre mostrar solo disponibles
  const [selectedFilter, setSelectedFilter] = useState<string>(isAdmin ? "all" : "disponible");
  const [entregadoFilter, setEntregadoFilter] = useState<string>("all");
  const [pagadoFilter, setPagadoFilter] = useState<string>("all");
  // Estado para la búsqueda de productos
  const [searchQuery, setSearchQuery] = useState("");
  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Estado para el modal de edición
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const handleEdit = (productId: string) => {
    setEditingProductId(productId);
    setEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    router.refresh(); // Refresca los datos del servidor
  };

  // Memoizar filtrado y conteo para evitar recálculos innecesarios
  const { filteredProducts, counts } = useMemo(() => {
    // Define el orden en que se muestran los estados
    const stateOrder: Record<string, number> = {
      disponible: 1,
      pendiente: 2,
      vendido: 3,
    };

    // Filtrar productos según estado y búsqueda
    const filtered = initialProducts
      .filter((product) => {
        // Si no es admin, solo mostrar disponibles
        if (!isAdmin && product.status.name !== "disponible") {
          return false;
        }
        // Si el filtro es "all", mostrar todo. Si no, comparar con el estado seleccionado
        if (selectedFilter !== "all" && product.status.name !== selectedFilter) {
          return false;
        }
        // Filtro por entregado
        if (entregadoFilter !== "all") {
          if (entregadoFilter === "si" && !product.entregado) return false;
          if (entregadoFilter === "no" && product.entregado) return false;
        }
        // Filtro por pagado
        if (pagadoFilter !== "all") {
          if (pagadoFilter === "si" && !product.pagado) return false;
          if (pagadoFilter === "no" && product.pagado) return false;
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
        const orderA = stateOrder[a.status.name] || 999;
        const orderB = stateOrder[b.status.name] || 999;
        return orderA - orderB;
      });

    // Contar cuántos productos hay en cada categoría
    const productCounts = {
      all: initialProducts.length,
      disponible: initialProducts.filter((p) => p.status.name === "disponible").length,
      pendiente: initialProducts.filter((p) => p.status.name === "pendiente").length,
      vendido: initialProducts.filter((p) => p.status.name === "vendido").length,
    };

    return { filteredProducts: filtered, counts: productCounts };
  }, [initialProducts, selectedFilter, entregadoFilter, pagadoFilter, searchQuery, isAdmin]);

  // Array de filtros para mostrar como botones
  const filters = isAdmin ? [
    { id: "all", label: "Todos", count: counts.all },
    { id: "disponible", label: "Disponible", count: counts.disponible },
    { id: "pendiente", label: "Pendiente", count: counts.pendiente },
    { id: "vendido", label: "Vendido", count: counts.vendido },
  ] : [
    { id: "disponible", label: "Disponible", count: counts.disponible },
  ];

  return (
    <>
      {/* Contenedor principal con padding y ancho máximo */}
      {/* px-4: padding horizontal en mobile (1rem) */}
      {/* sm:px-6: aumenta a 1.5rem en tablets */}
      {/* lg:px-8: aumenta a 2rem en desktop */}
      {/* py-8: padding vertical 2rem */}
      {/* md:py-12: aumenta a 3rem en tablets */}
      {/* max-w-7xl: ancho máximo de 80rem (1280px) */}
      {/* mx-auto: centra horizontalmente */}
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header profesional de marketplace */}
      {/* -mx-4: extiende el fondo más allá de los márgenes */}
      {/* px-4 sm:px-6 lg:px-8: padding interno responsive */}
      {/* py-6: padding vertical compacto */}
      {/* Banner de introducción con descripción y botones WhatsApp */}
      <IntroductionBanner />

      {/* Sección de búsqueda */}
      {/* mb-8: margen inferior 2rem */}
      <div className="mb-8 mt-8">
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
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset a página 1 cuando se busca
          }}
          className="w-full max-w-md px-4 py-3 border-2 border-[#DADADA] dark:border-[#415543] rounded-lg bg-white dark:bg-[#455C47] text-[#2E2E2E] dark:text-white placeholder-[#6B6B6B] dark:placeholder-[#DADADA] focus:outline-none focus:border-[#4F6F52] dark:focus:border-[#4F6F52] transition-colors"
        />
      </div>

      {/* Sección de filtros - Solo visible para admins */}
      {isAdmin && (
        <div className="mb-8 p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Estado */}
            <div>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2">Estado</p>
              <div className="flex flex-wrap gap-1.5">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => {
                      setSelectedFilter(filter.id);
                      setCurrentPage(1);
                    }}
                    className={`
                      px-2.5 py-1 text-xs rounded font-medium transition-all
                      ${
                        selectedFilter === filter.id
                          ? "bg-[#2563EB] hover:bg-[#18468B] text-white shadow-md"
                          : "bg-[#E6EEFB] dark:bg-[#18468B] text-[#2563EB] dark:text-white hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#2563EB] dark:hover:text-white"
                      }
                    `}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Entregado */}
            <div>
              <p className="text-xs font-semibold text-[#6B6B6B] dark:text-[#E2E7E3] uppercase mb-2">Entregado</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setEntregadoFilter("all"); setCurrentPage(1); }}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                    entregadoFilter === "all"
                      ? "bg-[#2563EB] hover:bg-[#18468B] text-white shadow-md"
                      : "bg-[#E6EEFB] dark:bg-[#18468B] text-[#2563EB] dark:text-white hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#2563EB] dark:hover:text-white"
                  }`}
                >
                  Todos ({initialProducts.length})
                </button>
                <button
                  onClick={() => { setEntregadoFilter("si"); setCurrentPage(1); }}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                    entregadoFilter === "si"
                      ? "bg-[#2563EB] hover:bg-[#18468B] text-white shadow-md"
                      : "bg-[#E2E7E3] dark:bg-[#455C47] text-[#2563EB] dark:text-white hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#2563EB] dark:hover:text-white"
                  }`}
                >
                  Sí ({initialProducts.filter(p => p.entregado).length})
                </button>
                <button
                  onClick={() => { setEntregadoFilter("no"); setCurrentPage(1); }}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                    entregadoFilter === "no"
                      ? "bg-[#2563EB] hover:bg-[#18468B] text-white shadow-md"
                      : "bg-[#E2E7E3] dark:bg-[#455C47] text-[#2563EB] dark:text-white hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#2563EB] dark:hover:text-white"
                  }`}
                >
                  No ({initialProducts.filter(p => !p.entregado).length})
                </button>
              </div>
            </div>

            {/* Pagado */}
            <div>
              <p className="text-xs font-semibold text-[#6B6B6B] dark:text-[#E2E7E3] uppercase mb-2">Pagado</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => { setPagadoFilter("all"); setCurrentPage(1); }}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                    pagadoFilter === "all"
                      ? "bg-[#2563EB] hover:bg-[#18468B] text-white shadow-md"
                      : "bg-[#E6EEFB] dark:bg-[#18468B] text-[#2563EB] dark:text-white hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#2563EB] dark:hover:text-white"
                  }`}
                >
                  Todos ({initialProducts.length})
                </button>
                <button
                  onClick={() => { setPagadoFilter("si"); setCurrentPage(1); }}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                    pagadoFilter === "si"
                      ? "bg-[#2563EB] hover:bg-[#18468B] text-white shadow-md"
                      : "bg-[#E6EEFB] dark:bg-[#18468B] text-[#2563EB] dark:text-white hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#2563EB] dark:hover:text-white"
                  }`}
                >
                  Sí ({initialProducts.filter(p => p.pagado).length})
                </button>
                <button
                  onClick={() => { setPagadoFilter("no"); setCurrentPage(1); }}
                  className={`px-2.5 py-1 text-xs rounded font-medium transition-all ${
                    pagadoFilter === "no"
                      ? "bg-[#2563EB] hover:bg-[#18468B] text-white shadow-md"
                      : "bg-[#E6EEFB] dark:bg-[#18468B] text-[#2563EB] dark:text-white hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#2563EB] dark:hover:text-white"
                  }`}
                >
                  No ({initialProducts.filter(p => !p.pagado).length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
          {/* Grid de productos - se adapta automáticamente en mobile, tablet y desktop */}
          {/* grid: utiliza CSS Grid */}
          {/* grid-cols-1: 1 columna en mobile */}
          {/* sm:grid-cols-2: 2 columnas en tablets pequeñas (640px+) */}
          {/* lg:grid-cols-3: 3 columnas en tablets grandes (1024px+) */}
          {/* xl:grid-cols-4: 4 columnas en desktop (1280px+) */}
          {/* gap-6: espacio entre items (1.5rem) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts
              .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
              .map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isAdmin={isAdmin}
                onEdit={handleEdit}
              />
            ))}
          </div>

          {/* Controles de paginación mejorados */}
          {filteredProducts.length > ITEMS_PER_PAGE && (
            <div className="mt-12 mb-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-gradient-to-r from-[#F0F3F1] to-[#E2E7E3] dark:from-[#455C47] dark:to-[#3F5C43] rounded-lg border border-[#DADADA] dark:border-[#334B37]">
                {/* Información de paginación */}
                <div className="text-center sm:text-left">
                  <p className="text-sm font-medium text-[#6B6B6B] dark:text-[#FFFFFF]">
                    Página <span className="font-bold text-[#4F6F52] dark:text-[#C26D4A]">{currentPage}</span> de{" "}
                    <span className="font-bold text-[#4F6F52] dark:text-[#C26D4A]">
                      {Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                    </span>
                  </p>
                  <p className="text-xs text-[#6B6B6B] dark:text-[#E2E7E3] mt-1">
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} de {filteredProducts.length}{" "}
                    {filteredProducts.length === 1 ? "producto" : "productos"}
                  </p>
                </div>

                {/* Botones de navegación */}
                <div className="flex items-center gap-2">
                  {/* Primera */}
                  <button
                    onClick={() => {
                      setCurrentPage(1);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={currentPage === 1}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:shadow-md"
                    style={{
                      backgroundColor: currentPage === 1 ? "#e2e8f0" : "#3b82f6",
                      color: currentPage === 1 ? "#64748b" : "#ffffff",
                    }}
                    title="Primera página"
                  >
                    <FontAwesomeIcon icon={faStepBackward} size="sm" />
                  </button>

                  {/* Anterior */}
                  <button
                    onClick={() => {
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={currentPage === 1}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:shadow-md"
                    style={{
                      backgroundColor: currentPage === 1 ? "#e2e8f0" : "#3b82f6",
                      color: currentPage === 1 ? "#64748b" : "#ffffff",
                    }}
                    title="Página anterior"
                  >
                    <FontAwesomeIcon icon={faChevronLeft} size="sm" />
                  </button>

                  {/* Indicador de página actual */}
                  <div className="px-4 py-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600">
                    <input
                      type="number"
                      min="1"
                      max={Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                      value={currentPage}
                      onChange={(e) => {
                        const page = Math.max(
                          1,
                          Math.min(
                            parseInt(e.target.value) || 1,
                            Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
                          )
                        );
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="w-12 text-center text-sm font-medium bg-transparent text-slate-900 dark:text-white outline-none"
                    />
                  </div>

                  {/* Siguiente */}
                  <button
                    onClick={() => {
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))
                      );
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:shadow-md"
                    style={{
                      backgroundColor:
                        currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
                          ? "#e2e8f0"
                          : "#3b82f6",
                      color:
                        currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
                          ? "#64748b"
                          : "#ffffff",
                    }}
                    title="Página siguiente"
                  >
                    <FontAwesomeIcon icon={faChevronRight} size="sm" />
                  </button>

                  {/* Última */}
                  <button
                    onClick={() => {
                      setCurrentPage(Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    disabled={currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:shadow-md"
                    style={{
                      backgroundColor:
                        currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
                          ? "#e2e8f0"
                          : "#3b82f6",
                      color:
                        currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
                          ? "#64748b"
                          : "#ffffff",
                    }}
                    title="Última página"
                  >
                    <FontAwesomeIcon icon={faStepForward} size="sm" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      </main>

      {/* Modal de edición */}
      <EditProductModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        productId={editingProductId}
        onSuccess={handleEditSuccess}
      />
    </>
  );
}
