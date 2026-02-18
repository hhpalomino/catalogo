"use client";

import { useState, useMemo } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import FilterDropdown from "@/components/FilterDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStepBackward, faChevronLeft, faChevronRight, faStepForward } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "@/components/ProductCard";
import IntroductionBanner from "@/components/IntroductionBanner";
import EditProductModal from "@/components/admin/EditProductModal";


import type { ProductWithRelations, ProductStatus } from "@/lib/types";

type ProductWithStatusForCard = Omit<ProductWithRelations, 'status'> & {
  status: ProductStatus & { createdAt: Date; updatedAt: Date };
};

interface ProductsClientProps {
  initialProducts: ProductWithStatusForCard[];
  isAdmin?: boolean;
}

const ITEMS_PER_PAGE = 20;

export default function ProductsClient({ initialProducts, isAdmin = false }: ProductsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [entregadoFilter, setEntregadoFilter] = useState<string>("all");
  const [pagadoFilter, setPagadoFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Lógica de filtros (ejemplo, ajustar según tu lógica real)
  const filters = useMemo(() => {
    const all = { id: null, label: "Todos", count: initialProducts.length };
    const statusNames = Array.from(new Set(initialProducts.map(p => p.status.name).filter(Boolean)));
    const statusFilters = statusNames.map(statusName => ({
      id: statusName,
      label: statusName,
      count: initialProducts.filter(p => p.status.name === statusName).length,
    }));
    return [all, ...statusFilters];
  }, [initialProducts]);

  const handleEdit = (productId: string) => {
    setEditingProductId(productId);
    setEditModalOpen(true);
  };

  const handleEditSuccess = () => {
    setEditModalOpen(false);
    setEditingProductId(null);
    // Aquí podrías recargar productos si es necesario
  };

  // Filtrado principal
  const filteredProducts = useMemo(() => {
    let products = [...initialProducts];
    // Filtro de búsqueda
    if (searchQuery.trim()) {
      products = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Filtro de categoría (adaptado a estructura relacional)
    if (selectedCategories.length > 0) {
      products = products.filter(p => {
        if (!Array.isArray((p as any).attributes)) return false;
        // Buscar atributo de categoría
        const catAttr = (p as any).attributes.find(
          (attr: any) => attr.attribute?.name?.toLowerCase() === "categoría"
        );
        if (!catAttr || !catAttr.option) return false;
        return selectedCategories.includes(catAttr.option.id);
      });
    }
    // Filtro de estado
    if (selectedFilter) {
      products = products.filter(p => p.status.name === selectedFilter);
    }
    // Filtro entregado
    if (entregadoFilter !== "all") {
      products = products.filter(p =>
        entregadoFilter === "si" ? p.entregado : !p.entregado
      );
    }
    // Filtro pagado
    if (pagadoFilter !== "all") {
      products = products.filter(p =>
        pagadoFilter === "si" ? p.pagado : !p.pagado
      );
    }
    return products;
  }, [initialProducts, searchQuery, selectedCategories, selectedFilter, entregadoFilter, pagadoFilter]);

  return (
    <>
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <IntroductionBanner />
        {/* Sección de búsqueda y filtros */}
        <div className="mb-8 mt-8 flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Buscar productos..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full max-w-md px-4 py-3 border-2 border-[#DADADA] dark:border-[#415543] rounded-lg bg-white dark:bg-[#455C47] text-[#2E2E2E] dark:text-white placeholder-[#6B6B6B] dark:placeholder-[#DADADA] focus:outline-none focus:border-[#4F6F52] dark:focus:border-[#4F6F52] transition-colors"
            />
          </div>
          {/* Filtros de categoría: sidebar en desktop, dropdown en mobile */}
          {!searchQuery && (
            <div className="flex-1">
              <FilterDropdown selectedCategories={selectedCategories} onChangeCategories={setSelectedCategories} />
            </div>
          )}
        </div>
        <div className="flex">
          {/* Sidebar solo si no hay búsqueda */}
          {!searchQuery && (
            <FilterSidebar selectedCategories={selectedCategories} onChangeCategories={setSelectedCategories} />
          )}
          <div className="flex-1">
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
                          key={filter.id ?? 'all'}
                          onClick={() => {
                            setSelectedFilter(filter.id ?? null);
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
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {searchQuery
                    ? `No se encontraron productos con "${searchQuery}"`
                    : "No hay productos en esta categoría"}
                </p>
              </div>
            ) : (
              <>
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
                {filteredProducts.length > ITEMS_PER_PAGE && (
                  <div className="mt-12 mb-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-gradient-to-r from-[#F0F3F1] to-[#E2E7E3] dark:from-[#455C47] dark:to-[#3F5C43] rounded-lg border border-[#DADADA] dark:border-[#334B37]">
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
                      <div className="flex items-center gap-2">
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
          </div>
        </div>
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
// ...existing code...
