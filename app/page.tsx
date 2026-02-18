import { prisma } from "@/lib/prisma";
import ProductsClient from "@/components/ProductsClient";
import { isAuthenticated } from "@/lib/auth";
import type { Product, ProductStatus, ProductImage } from "@prisma/client";

export const revalidate = 60; // Revalidar cada 60 segundos

type ProductWithRelations = Product & {
  status: ProductStatus;
  images: ProductImage[];
};

export default async function Home() {
  // Verificar si el usuario es admin
  const isAdmin = !!(await isAuthenticated());

  // Obtener productos de la base de datos, incluyendo atributos y opción
  const products = await prisma.product.findMany({
    include: {
      status: true,
      images: {
        orderBy: {
          displayOrder: "asc",
        },
      },
      attributes: {
        include: {
          attribute: true,
          option: true,
        },
      },
    },
  });

  // Transformar productos para que tengan la estructura esperada por el cliente
  const transformedProducts = products.map((product: any) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    statusId: product.statusId ?? product.status?.id ?? "",
    status: {
      ...product.status,
      createdAt: product.status.createdAt ?? new Date(),
      updatedAt: product.status.updatedAt ?? new Date(),
    },
    entregado: product.entregado,
    pagado: product.pagado,
    condition: product.condition,
    measurements: product.measurements,
    price: product.price,
    images: Array.isArray(product.images) ? product.images.map(img => ({
      id: img.id,
      imageUrl: img.imageUrl,
      isMain: img.isMain,
      displayOrder: img.displayOrder,
      productId: img.productId ?? "",
      createdAt: img.createdAt ?? new Date(),
    })) : [],
    attributes: Array.isArray(product.attributes) ? product.attributes : [],
  }));

  return (
    <>
      <ProductsClient initialProducts={transformedProducts} isAdmin={isAdmin} />
    </>
  );
}
