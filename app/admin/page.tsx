import { prisma } from "@/lib/prisma";
import AdminPageClient from "@/components/admin/AdminPageClient";

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

  return <AdminPageClient products={products} />;
}
