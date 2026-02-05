import { prisma } from "@/lib/prisma";
import AdminProductForm from "@/components/admin/AdminProductForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await (prisma.product.findUnique as any)({
    where: { id },
    include: {
      status: true,
      images: {
        orderBy: {
          displayOrder: "asc",
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium mb-4 inline-flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Volver al Admin
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
            statusId: product.statusId,
            entregado: product.entregado,
            pagado: product.pagado,
            condition: product.condition,
            measurements: product.measurements,
            price: product.price,
            images: product.images.map((img: any) => img.imageUrl).join(","),
          }}
          initialImages={product.images.map((img: any, index: number) => ({
            id: img.id,
            url: img.imageUrl,
            isMain: img.isMain,
            displayOrder: img.displayOrder,
          }))}
        />
      </div>
    </main>
  );
}
