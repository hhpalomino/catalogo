import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AdminProductList from "@/components/admin/AdminProductList";

export default async function AdminPage() {
  const products = await prisma.product.findMany();

  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Admin Panel
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Gestiona los productos del catálogo
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/create"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors"
          >
            ✨ Nuevo Producto
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-colors"
          >
            ← Volver
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Productos</p>
          <p className="text-3xl font-bold text-emerald-600">{products.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Disponibles</p>
          <p className="text-3xl font-bold text-blue-600">
            {products.filter((p) => p.state === "available").length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Vendidos</p>
          <p className="text-3xl font-bold text-red-600">
            {products.filter((p) => p.state === "sold").length}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Valor Total</p>
          <p className="text-3xl font-bold text-orange-600">
            ${(products.reduce((sum, p) => sum + p.price, 0) / 1000).toFixed(0)}k
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <AdminProductList products={products} />
      </div>
    </main>
  );
}
