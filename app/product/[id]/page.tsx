

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductPageClient from "@/components/ProductPageClient";
import { isAuthenticated } from "@/lib/auth";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
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
  const isAdmin = await isAuthenticated();
  return <ProductPageClient product={product} isAdmin={isAdmin} />;
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
