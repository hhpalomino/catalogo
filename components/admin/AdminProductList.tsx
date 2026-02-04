"use client";

import Link from "next/link";
import { useState } from "react";

type Product = {
  id: string;
  title: string;
  description: string;
  state: string;
  condition: string;
  measurements: string;
  price: number;
  images: string;
};

export default function AdminProductList({ products }: { products: Product[] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStateColor = (state: string) => {
    const colors: Record<string, string> = {
      available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      reserved: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      paid: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      delivered: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      sold: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return colors[state] || "bg-gray-100 text-gray-800";
  };

  return (
    <div>
      {/* Search */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <input
          type="text"
          placeholder="🔍 Buscar por título o ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border-2 border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-emerald-500"
        />
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
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                  No hay productos que coincidan con tu búsqueda
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
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
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStateColor(product.state)}`}>
                      {product.state}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-900 dark:text-white font-semibold">
                    ${(product.price / 1000).toFixed(1)}k
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
                    {product.condition}
                  </td>
                  <td className="px-4 py-3 text-sm text-center space-x-2 flex justify-center gap-2">
                    <Link
                      href={`/admin/edit/${product.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded transition-colors"
                    >
                      ✏️ Editar
                    </Link>
                    <Link
                      href={`/admin/delete/${product.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded transition-colors"
                    >
                      🗑️ Eliminar
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination info */}
      <div className="px-4 py-3 bg-slate-50 dark:bg-slate-700 text-sm text-slate-600 dark:text-slate-400">
        Mostrando {filteredProducts.length} de {products.length} productos
      </div>
    </div>
  );
}
