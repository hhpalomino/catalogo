import { prisma } from "@/lib/prisma";
import ProductsClient from "@/components/ProductsClient";

export const revalidate = 60; // Revalidar cada 60 segundos

export default async function Home() {
  // Obtener productos de la base de datos
  const products = await prisma.product.findMany();

  // Transformar productos para que tengan la estructura esperada por el cliente
  const transformedProducts = products.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    state: product.state,
    condition: product.condition,
    measurements: product.measurements,
    price: product.price,
    images: product.images.split(","),
  }));

  return (
    <ProductsClient initialProducts={transformedProducts} />
  );
}
