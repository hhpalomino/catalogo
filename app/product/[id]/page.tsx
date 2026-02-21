

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductPageClient from "@/components/ProductPageClient";
import { isAuthenticated } from "@/lib/auth";

export default async function ProductPage({ params }: { params: any }) {
  console.log("params recibido:", params);
  let id = params?.id;
  if (!id && typeof params?.value === "string") {
    try {
      const parsed = JSON.parse(params.value);
      id = parsed.id;
    } catch (e) {
      id = undefined;
    }
  }
  // Si params es una promesa, resolverla
  if (!id && typeof params?.then === "function") {
    const resolved = await params;
    if (resolved?.id) {
      id = resolved.id;
    } else if (typeof resolved?.value === "string") {
      try {
        const parsed = JSON.parse(resolved.value);
        id = parsed.id;
      } catch (e) {
        id = undefined;
      }
    }
  }
  console.log("Fetching product with ID:", id); // Debug: Verificar el ID recibido

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
  // Si no es admin, mostrar solo productos disponibles
  if (!isAdmin) {
    const statusId = product.status?.id;
    if (statusId !== "status_disponible_002") {
      notFound();
    }
  }
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
