
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import ProductPageClient from "@/components/ProductPageClient";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {


  const { id } = await params;
  if (!id) {
    notFound();
  }
  const product = await prisma.product.findUnique({
    where: { id },
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
  if (!product) {
    notFound();
  }
  return <ProductPageClient product={product} />;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      status: true,
    },
  });

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: `${product.title} - Catálogo`,
    description: product.description.replace(/\n/g, " "),
  };
}
