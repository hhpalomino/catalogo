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

  return (
    <div>
      {/* Search y Nuevo Producto */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <input
          type="text"
          placeholder="🔍 Buscar por título o ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-md px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-800 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-700 !text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors whitespace-nowrap"
        >
          <FontAwesomeIcon icon={faPlus} size="sm" />
          Nuevo Producto
        </button>
      </div>

      {/* Filtros compactos en grid */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Estado */}
          <div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">ESTADO</p>
            <div className="flex flex-wrap gap-1.5">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`
                    px-2.5 py-1 rounded text-xs font-medium transition-all
                    ${
                      selectedFilter === filter.id
                        ? "bg-blue-600 hover:bg-blue-700 !text-white shadow-sm"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600"
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
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">ENTREGADO</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setEntregadoFilter("all")}
                className={`
                  px-2.5 py-1 rounded text-xs font-medium transition-all
                  ${
                    entregadoFilter === "all"
                      ? "bg-blue-600 hover:bg-blue-700 !text-white shadow-sm"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600"
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
                      ? "bg-blue-600 hover:bg-blue-700 !text-white shadow-sm"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600"
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
                      ? "bg-blue-600 hover:bg-blue-700 !text-white shadow-sm"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600"
                  }
                `}
              >
                No ({products.filter(p => !p.entregado).length})
              </button>
            </div>
          </div>

          {/* Pagado */}
          <div>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">PAGADO</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setPagadoFilter("all")}
                className={`
                  px-2.5 py-1 rounded text-xs font-medium transition-all
                  ${
                    pagadoFilter === "all"
                      ? "bg-blue-600 hover:bg-blue-700 !text-white shadow-sm"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600"
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
                      ? "bg-blue-600 hover:bg-blue-700 !text-white shadow-sm"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600"
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
                      ? "bg-blue-600 hover:bg-blue-700 !text-white shadow-sm"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600"
                  }
                `}
              >
                No ({products.filter(p => !p.pagado).length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Título
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Entregado
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Pagado
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Precio
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                Condición
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900 dark:text-white">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                  No hay productos que coincidan con tu búsqueda
                </td>
              </tr>
            ) : (
              filteredProducts
                .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                .map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-slate-900 dark:text-white font-medium">
                    <div>
                      <p>{product.title}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">ID: {product.id}</p>
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
                  <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">
                    {product.entregado ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Sí
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-900 dark:text-white">
                    {product.pagado ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        Sí
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-900 dark:text-white font-semibold">
                    ${formatPriceCLP(product.price)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                    {product.condition}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/product/${product.id}`}
                        className="inline-flex items-center justify-center w-8 h-8 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition-colors"
                        title="Ver producto"
                      >
                        <FontAwesomeIcon icon={faEye} size="sm" />
                      </Link>
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="inline-flex items-center justify-center w-8 h-8 bg-blue-800 dark:bg-blue-600 hover:bg-blue-900 dark:hover:bg-blue-700 !text-white rounded-lg transition-colors"
                        title="Editar producto"
                      >
                        <FontAwesomeIcon icon={faPencil} size="sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.title)}
                        className="inline-flex items-center justify-center w-8 h-8 bg-red-800 dark:bg-red-600 hover:bg-red-900 dark:hover:bg-red-700 !text-white rounded-lg transition-colors"
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
          <tfoot className="bg-slate-50 dark:bg-slate-800 border-t-2 border-slate-300 dark:border-slate-600">
            <tr>
              <td colSpan={7} className="px-4 py-4 text-sm">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">
                    Total de {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}:
                  </span>
                  <span className="text-lg text-blue-600 dark:text-blue-400">
                    ${formatPriceCLP(filteredProducts.reduce((sum, p) => sum + p.price, 0))}
                  </span>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Pagination info */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-700 text-sm text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-3">
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
                backgroundColor: currentPage === 1 ? "#e2e8f0" : "#3b82f6",
                color: currentPage === 1 ? "#64748b" : "#ffffff",
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
                backgroundColor: currentPage === 1 ? "#e2e8f0" : "#3b82f6",
                color: currentPage === 1 ? "#64748b" : "#ffffff",
              }}
              title="Página anterior"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="sm" />
            </button>
            
            <span className="px-3 py-1 text-sm font-medium">
              {currentPage} de {Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
            </span>
            
            <button
              onClick={() => setCurrentPage((p) => Math.min(Math.ceil(filteredProducts.length / ITEMS_PER_PAGE), p + 1))}
              disabled={currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:shadow-md"
              style={{
                backgroundColor: currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) ? "#e2e8f0" : "#3b82f6",
                color: currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) ? "#64748b" : "#ffffff",
              }}
              title="Página siguiente"
            >
              <FontAwesomeIcon icon={faChevronRight} size="sm" />
            </button>
            <button
              onClick={() => setCurrentPage(Math.ceil(filteredProducts.length / ITEMS_PER_PAGE))}
              disabled={currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)}
              className="inline-flex items-center justify-center w-8 h-8 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed enabled:hover:shadow-md"
              style={{
                backgroundColor: currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) ? "#e2e8f0" : "#3b82f6",
                color: currentPage === Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) ? "#64748b" : "#ffffff",
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
