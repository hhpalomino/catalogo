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
  const isAdmin = await isAuthenticated();

  // Obtener productos de la base de datos
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

  // Transformar productos para que tengan la estructura esperada por el cliente
  const transformedProducts = products.map((product: ProductWithRelations) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    status: product.status,
    entregado: product.entregado,
    pagado: product.pagado,
    condition: product.condition,
    measurements: product.measurements,
    price: product.price,
    images: product.images,
  }));

  return (
    <ProductsClient initialProducts={transformedProducts} isAdmin={isAdmin} />
  );
}
