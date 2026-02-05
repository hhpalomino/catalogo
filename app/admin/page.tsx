import { prisma } from "@/lib/prisma";
import { formatPriceCLP } from "@/lib/product-ui";
import AdminProductList from "@/components/admin/AdminProductList";
import AdminHeader from "@/components/admin/AdminHeader";

export default async function AdminPage() {
  const products = await prisma.product.findMany({
    include: {
      status: true,
      images: {
        orderBy: {
          displayOrder: "asc",
        },
      },
    },
  });

  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header profesional de admin */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 mb-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo y nombre */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">⚙️</div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Admin Panel
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Gestiona los productos del catálogo
              </p>
            </div>
          </div>

          {/* AdminHeader con botones de acción */}
          <AdminHeader />
        </div>
      </div>

      {/* Stats */}
      <div className="py-8 space-y-4 mb-8">
        {/* Fila 1: Estados con cantidad y precio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Pendientes */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Pendientes</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-yellow-600">
                {products.filter((p) => p.status.name === "pendiente").length}
              </p>
              <p className="text-base sm:text-lg font-semibold text-yellow-500">
                ${formatPriceCLP(products.filter((p) => p.status.name === "pendiente").reduce((sum: number, p) => sum + p.price, 0))}
              </p>
            </div>
          </div>

          {/* Disponibles */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Disponibles</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                {products.filter((p) => p.status.name === "disponible").length}
              </p>
              <p className="text-base sm:text-lg font-semibold text-green-500">
                ${formatPriceCLP(products.filter((p) => p.status.name === "disponible").reduce((sum: number, p) => sum + p.price, 0))}
              </p>
            </div>
          </div>

          {/* Vendidos (Agotados) */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Vendidos</p>
            <div className="flex items-baseline justify-between">
              <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                {products.filter((p) => p.status.name === "vendido").length}
              </p>
              <p className="text-base sm:text-lg font-semibold text-blue-500">
                ${formatPriceCLP(products.filter((p) => p.status.name === "vendido").reduce((sum: number, p) => sum + p.price, 0))}
              </p>
            </div>
          </div>
        </div>

        {/* Fila 2: Montos de dinero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* $ Recibido (pagado = sí) */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">💰 Recibido</p>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-600">
              ${formatPriceCLP(products.filter((p) => p.pagado).reduce((sum: number, p) => sum + p.price, 0))}
            </p>
          </div>

          {/* $ Pendiente (vendido/agotado pero no pagado) */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">⏳ Pendiente de Pago</p>
            <p className="text-2xl sm:text-3xl font-bold text-orange-600">
              ${formatPriceCLP(products.filter((p) => p.status.name === "vendido" && !p.pagado).reduce((sum: number, p) => sum + p.price, 0))}
            </p>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
        <AdminProductList products={products} />
      </div>
    </main>
  );
}
