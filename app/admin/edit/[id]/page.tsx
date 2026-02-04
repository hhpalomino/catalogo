import { prisma } from "@/lib/prisma";
import AdminProductForm from "@/components/admin/AdminProductForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium mb-4 inline-flex items-center gap-1"
        >
          ← Volver al Admin
        </Link>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Editar Producto
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">{product.title}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
        <AdminProductForm
          initialProduct={{
            id: product.id,
            title: product.title,
            description: product.description,
            state: product.state,
            condition: product.condition,
            measurements: product.measurements,
            price: product.price,
            images: product.images,
          }}
        />
      </div>
    </main>
  );
}
