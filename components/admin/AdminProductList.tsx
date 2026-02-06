"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { formatPriceCLP } from "@/lib/product-ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faPlus, faStepBackward, faChevronLeft, faChevronRight, faStepForward, faEye } from "@fortawesome/free-solid-svg-icons";
import EditProductModal from "@/components/admin/EditProductModal";
import DeleteProductModal from "@/components/admin/DeleteProductModal";
import CreateProductModal from "@/components/admin/CreateProductModal";

const ITEMS_PER_PAGE = 10;

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

export default function AdminProductList({ products }: { products: Product[] }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [entregadoFilter, setEntregadoFilter] = useState<string>("all"); // all, si, no
  const [pagadoFilter, setPagadoFilter] = useState<string>("all"); // all, si, no
  const [currentPage, setCurrentPage] = useState(1);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<{ id: string; title: string } | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleEdit = (productId: string) => {
    setEditingProductId(productId);
    setEditModalOpen(true);
  };

  const handleDelete = (productId: string, productTitle: string) => {
    setDeletingProduct({ id: productId, title: productTitle });
    setDeleteModalOpen(true);
  };

  const handleEditSuccess = () => {
    router.refresh(); // Refresca los datos del servidor
  };

  const handleDeleteSuccess = () => {
    router.refresh(); // Refresca los datos del servidor
  };

  const handleCreateSuccess = () => {
    router.refresh(); // Refresca los datos del servidor
  };

  // Filtros disponibles
  const filters = useMemo(() => {
    const counts = {
      all: products.length,
      pendiente: products.filter((p) => p.status.name === "pendiente").length,
      disponible: products.filter((p) => p.status.name === "disponible").length,
      vendido: products.filter((p) => p.status.name === "vendido").length,
    };

    return [
      { id: "all", label: "Todos", count: counts.all },
      { id: "pendiente", label: "Pendiente", count: counts.pendiente },
      { id: "disponible", label: "Disponible", count: counts.disponible },
      { id: "vendido", label: "Vendido", count: counts.vendido },
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Filtro por estado
      if (selectedFilter !== "all" && p.status.name !== selectedFilter) {
        return false;
      }
      // Filtro por entregado
      if (entregadoFilter !== "all") {
        if (entregadoFilter === "si" && !p.entregado) return false;
        if (entregadoFilter === "no" && p.entregado) return false;
      }
      // Filtro por pagado
      if (pagadoFilter !== "all") {
        if (pagadoFilter === "si" && !p.pagado) return false;
        if (pagadoFilter === "no" && p.pagado) return false;
      }
      // Filtro por búsqueda
      if (searchQuery) {
        return (
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.id.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      return true;
    });
  }, [products, selectedFilter, entregadoFilter, pagadoFilter, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
  const pagedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      {/* Search y Nuevo Producto */}
      <div className="p-4 border-b border-[#DADADA] dark:border-[#455C47] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <input
          type="text"
          placeholder="🔍 Buscar por título o ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-md px-4 py-2 border-2 border-[#DADADA] dark:border-[#415543] rounded-lg bg-white dark:bg-[#455C47] text-[#2E2E2E] dark:text-white placeholder-[#6B6B6B] dark:placeholder-[#DADADA] focus:outline-none focus:border-[#4F6F52]"
        />
        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#4F6F52] dark:bg-[#4F6F52] hover:bg-[#3F5C43] dark:hover:bg-[#3F5C43] !text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors whitespace-nowrap"
        >
          <FontAwesomeIcon icon={faPlus} size="sm" />
          Nuevo Producto
        </button>
      </div>

      {/* Filtros compactos en grid */}
      <div className="p-4 border-b border-[#DADADA] dark:border-[#455C47]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Estado */}
          <div>
            <p className="text-xs font-semibold text-[#6B6B6B] dark:text-[#E2E7E3] mb-2">ESTADO</p>
            <div className="flex flex-wrap gap-1.5">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`
                    px-2.5 py-1 rounded text-xs font-medium transition-all
                    ${
                      selectedFilter === filter.id
                        ? "bg-[#4F6F52] hover:bg-[#3F5C43] !text-white shadow-sm"
                        : "bg-[#E2E7E3] dark:bg-[#455C47] text-[#2E2E2E] dark:text-[#FFFFFF] hover:bg-[#CAD3CB] dark:hover:bg-[#3F5C43]"
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
            <p className="text-xs font-semibold text-[#6B6B6B] dark:text-[#E2E7E3] mb-2">ENTREGADO</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setEntregadoFilter("all")}
                className={`
                  px-2.5 py-1 rounded text-xs font-medium transition-all
                  ${
                    entregadoFilter === "all"
                      ? "bg-[#4F6F52] hover:bg-[#3F5C43] !text-white shadow-sm"
                      : "bg-[#E2E7E3] dark:bg-[#455C47] text-[#2E2E2E] dark:text-[#FFFFFF] hover:bg-[#CAD3CB] dark:hover:bg-[#3F5C43]"
                  }
                `}
              >
                Todos ({products.length})
              </button>
              <button
                onClick={() => setEntregadoFilter("si")}
                className={`
                  px-2.5 py-1 rounded text-xs font-medium transition-all
                  ${
                    entregadoFilter === "si"
                      ? "bg-[#4F6F52] hover:bg-[#3F5C43] !text-white shadow-sm"
                      : "bg-[#E2E7E3] dark:bg-[#455C47] text-[#2E2E2E] dark:text-[#FFFFFF] hover:bg-[#CAD3CB] dark:hover:bg-[#3F5C43]"
                  }
                `}
              >
                Sí ({products.filter(p => p.entregado).length})
              </button>
              <button
                onClick={() => setEntregadoFilter("no")}
                className={`
                  px-2.5 py-1 rounded text-xs font-medium transition-all
                  ${
                    entregadoFilter === "no"
                      ? "bg-[#4F6F52] hover:bg-[#3F5C43] !text-white shadow-sm"
                      : "bg-[#E2E7E3] dark:bg-[#455C47] text-[#2E2E2E] dark:text-[#FFFFFF] hover:bg-[#CAD3CB] dark:hover:bg-[#3F5C43]"
                  }
                `}
              >
                No ({products.filter(p => !p.entregado).length})
              </button>
            </div>
          </div>

          {/* Pagado */}
          <div>
            <p className="text-xs font-semibold text-[#6B6B6B] dark:text-[#E2E7E3] mb-2">PAGADO</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setPagadoFilter("all")}
                className={`
                  px-2.5 py-1 rounded text-xs font-medium transition-all
                  ${
                    pagadoFilter === "all"
                      ? "bg-[#4F6F52] hover:bg-[#3F5C43] !text-white shadow-sm"
                      : "bg-[#E2E7E3] dark:bg-[#455C47] text-[#2E2E2E] dark:text-[#FFFFFF] hover:bg-[#CAD3CB] dark:hover:bg-[#3F5C43]"
                  }
                `}
              >
                Todos ({products.length})
              </button>
              <button
                onClick={() => setPagadoFilter("si")}
                className={`
                  px-2.5 py-1 rounded text-xs font-medium transition-all
                  ${
                    pagadoFilter === "si"
                      ? "bg-[#4F6F52] hover:bg-[#3F5C43] !text-white shadow-sm"
                      : "bg-[#E2E7E3] dark:bg-[#455C47] text-[#2E2E2E] dark:text-[#FFFFFF] hover:bg-[#CAD3CB] dark:hover:bg-[#3F5C43]"
                  }
                `}
              >
                Sí ({products.filter(p => p.pagado).length})
              </button>
              <button
                onClick={() => setPagadoFilter("no")}
                className={`
                  px-2.5 py-1 rounded text-xs font-medium transition-all
                  ${
                    pagadoFilter === "no"
                      ? "bg-[#4F6F52] hover:bg-[#3F5C43] !text-white shadow-sm"
                      : "bg-[#E2E7E3] dark:bg-[#455C47] text-[#2E2E2E] dark:text-[#FFFFFF] hover:bg-[#CAD3CB] dark:hover:bg-[#3F5C43]"
                  }
                `}
              >
                No ({products.filter(p => !p.pagado).length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards (mobile) */}
      <div className="lg:hidden p-4 space-y-3">
        {pagedProducts.length === 0 ? (
          <div className="px-4 py-8 text-center text-[#6B6B6B] dark:text-[#E2E7E3] bg-[#F5F3EF] dark:bg-[#3A4F3B] rounded-xl">
            No hay productos que coincidan con tu búsqueda
          </div>
        ) : (
          pagedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-[#2E2E2E] border border-[#DADADA] dark:border-[#415543] rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-[#2E2E2E] dark:text-white truncate">
                    {product.title}
                  </p>
                  <p className="text-xs text-[#6B6B6B] dark:text-[#E2E7E3] break-all">
                    ID: {product.id}
                  </p>
                </div>
                <span
                  className="px-2 py-1 rounded text-xs font-medium text-white whitespace-nowrap"
                  style={{ backgroundColor: product.status.color }}
                >
                  {product.status.displayName}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-base font-semibold text-[#C26D4A]">
                  ${formatPriceCLP(product.price)}
                </p>
                <span className="text-xs text-[#6B6B6B] dark:text-[#E2E7E3]">
                  {product.condition}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium ${
                  product.entregado
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-[#DADADA] text-[#2E2E2E] dark:bg-[#455C47] dark:text-white"
                }`}>
                  Entregado: {product.entregado ? "Sí" : "No"}
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-medium ${
                  product.pagado
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-[#DADADA] text-[#2E2E2E] dark:bg-[#455C47] dark:text-white"
                }`}>
                  Pagado: {product.pagado ? "Sí" : "No"}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Link
                  href={`/product/${product.id}`}
                  className="inline-flex items-center justify-center w-9 h-9 bg-[#E2E7E3] dark:bg-[#455C47] hover:bg-[#CAD3CB] dark:hover:bg-[#3F5C43] text-[#2E2E2E] dark:text-white rounded-lg transition-colors"
                  title="Ver producto"
                >
                  <FontAwesomeIcon icon={faEye} size="sm" />
                </Link>
                <button
                  onClick={() => handleEdit(product.id)}
                  className="inline-flex items-center justify-center w-9 h-9 bg-[#4F6F52] hover:bg-[#3F5C43] !text-white rounded-lg transition-colors"
                  title="Editar producto"
                >
                  <FontAwesomeIcon icon={faPencil} size="sm" />
                </button>
                <button
                  onClick={() => handleDelete(product.id, product.title)}
                  className="inline-flex items-center justify-center w-9 h-9 bg-[#C0392B] hover:bg-[#A0311E] !text-white rounded-lg transition-colors"
                  title="Eliminar producto"
                >
                  <FontAwesomeIcon icon={faTrash} size="sm" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Table (desktop) */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F0F3F1] dark:bg-[#455C47]">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#2E2E2E] dark:text-[#FFFFFF]">
                Título
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#2E2E2E] dark:text-[#FFFFFF]">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#2E2E2E] dark:text-[#FFFFFF]">
                Entregado
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#2E2E2E] dark:text-[#FFFFFF]">
                Pagado
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#2E2E2E] dark:text-[#FFFFFF]">
                Precio
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-[#2E2E2E] dark:text-[#FFFFFF]">
                Condición
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-[#2E2E2E] dark:text-[#FFFFFF]">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DADADA] dark:divide-[#455C47]">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-[#6B6B6B] dark:text-[#E2E7E3]">
                  No hay productos que coincidan con tu búsqueda
                </td>
              </tr>
            ) : (
              pagedProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-[#F5F3EF] dark:hover:bg-[#455C47] transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-[#2E2E2E] dark:text-[#FFFFFF] font-medium">
                    <div>
                      <p>{product.title}</p>
                      <p className="text-xs text-[#6B6B6B] dark:text-[#E2E7E3]">ID: {product.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span 
                      className="px-2 py-1 rounded text-xs font-medium text-white"
                      style={{ backgroundColor: product.status.color }}
                    >
                      {product.status.displayName}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#2E2E2E] dark:text-[#FFFFFF]">
                    {product.entregado ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Sí
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DADADA] text-[#2E2E2E] dark:bg-[#455C47] dark:text-[#FFFFFF]">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#2E2E2E] dark:text-[#FFFFFF]">
                    {product.pagado ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Sí
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#DADADA] text-[#2E2E2E] dark:bg-[#455C47] dark:text-[#FFFFFF]">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#2E2E2E] dark:text-[#FFFFFF] font-semibold">
                    ${formatPriceCLP(product.price)}
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6B6B6B] dark:text-[#E2E7E3]">
                    {product.condition}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/product/${product.id}`}
                        className="inline-flex items-center justify-center w-8 h-8 bg-[#E2E7E3] dark:bg-[#455C47] hover:bg-[#CAD3CB] dark:hover:bg-[#3F5C43] text-[#2E2E2E] dark:text-[#FFFFFF] rounded-lg transition-colors"
                        title="Ver producto"
                      >
                        <FontAwesomeIcon icon={faEye} size="sm" />
                      </Link>
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="inline-flex items-center justify-center w-8 h-8 bg-[#4F6F52] dark:bg-[#4F6F52] hover:bg-[#3F5C43] dark:hover:bg-[#3F5C43] !text-white rounded-lg transition-colors"
                        title="Editar producto"
                      >
                        <FontAwesomeIcon icon={faPencil} size="sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.title)}
                        className="inline-flex items-center justify-center w-8 h-8 bg-[#C0392B] dark:bg-[#C0392B] hover:bg-[#A0311E] dark:hover:bg-[#A0311E] !text-white rounded-lg transition-colors"
                        title="Eliminar producto"
                      >
                        <FontAwesomeIcon icon={faTrash} size="sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot className="bg-[#F0F3F1] dark:bg-[#455C47] border-t-2 border-[#DADADA] dark:border-[#334B37]">
            <tr>
              <td colSpan={7} className="px-4 py-4 text-sm">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-[#6B6B6B] dark:text-[#FFFFFF]">
                    Total de {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}:
                  </span>
                  <span className="text-lg text-[#C26D4A] dark:text-[#E3BDAD]">
                    ${formatPriceCLP(filteredProducts.reduce((sum, p) => sum + p.price, 0))}
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination info */}
      <div className="px-4 py-3 bg-[#F0F3F1] dark:bg-[#455C47] text-sm text-[#6B6B6B] dark:text-[#FFFFFF] flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="text-center sm:text-left">
          Mostrando {filteredProducts.length > 0 ? Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredProducts.length) : 0}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} de {filteredProducts.length} productos
        </div>
        
        {/* Controles de paginación */}
        {filteredProducts.length > ITEMS_PER_PAGE && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:shadow-md"
              style={{
                backgroundColor: currentPage === 1 ? "#E2E7E3" : "#4F6F52",
                color: currentPage === 1 ? "#6B6B6B" : "#ffffff",
              }}
              title="Primera página"
            >
              <FontAwesomeIcon icon={faStepBackward} size="sm" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:shadow-md"
              style={{
                backgroundColor: currentPage === 1 ? "#E2E7E3" : "#4F6F52",
                color: currentPage === 1 ? "#6B6B6B" : "#ffffff",
              }}
              title="Página anterior"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="sm" />
            </button>
            
            <span className="px-3 py-1 text-sm font-medium">
              {currentPage} de {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:shadow-md"
              style={{
                backgroundColor: currentPage === totalPages ? "#E2E7E3" : "#4F6F52",
                color: currentPage === totalPages ? "#6B6B6B" : "#ffffff",
              }}
              title="Página siguiente"
            >
              <FontAwesomeIcon icon={faChevronRight} size="sm" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:shadow-md"
              style={{
                backgroundColor: currentPage === totalPages ? "#E2E7E3" : "#4F6F52",
                color: currentPage === totalPages ? "#6B6B6B" : "#ffffff",
              }}
              title="Última página"
            >
              <FontAwesomeIcon icon={faStepForward} size="sm" />
            </button>
          </div>
        )}
      </div>

      {/* Modal de edición */}
      <EditProductModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        productId={editingProductId}
        onSuccess={handleEditSuccess}
      />

      {/* Modal de eliminación */}
      <DeleteProductModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        productId={deletingProduct?.id || null}
        productTitle={deletingProduct?.title}
        onSuccess={handleDeleteSuccess}
      />

      {/* Modal de creación */}
      <CreateProductModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
