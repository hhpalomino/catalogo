"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import ProductGallery from "@/components/ProductGallery";
import StateBadge from "@/components/StateBadge";
import { formatPriceCLP } from "@/lib/product-ui";
import EditProductModal from "@/components/admin/EditProductModal";
import { Button } from "@/components/ui/Button";
interface ProductPageClientProps {
  product: any;
  isAdmin?: boolean;
}

 export default function ProductPageClient({ product, isAdmin = false }: ProductPageClientProps) {
  const [editOpen, setEditOpen] = useState(false);
  // Botón fijo: siempre volver al catálogo
  const backHref = "/";
  const backText = "Volver al catálogo";

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-lg font-semibold text-red-600">
        Producto no encontrado
      </div>
    );
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link href={backHref}>
          <Button
            variant="ghost"
            size="md"
            icon={faArrowLeft}
            iconPosition="left"
            className="!px-5 !py-2 !rounded-full border border-[#2563EB] text-[#2563EB] hover:bg-[#E8F0FE] dark:hover:bg-[#25304A] font-semibold shadow-sm transition-all"
          >
            {backText}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ProductGallery images={product.images} title={product.title} />
        </div>
        <div>
          <div className="mb-4">
            <StateBadge status={product.status} size="md" />
          </div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {product.title}
                </h1>
                {isAdmin && (
                  <Button
                    variant="primary"
                    size="md"
                    className="ml-4"
                    icon={faPencil}
                    iconPosition="left"
                    onClick={() => setEditOpen(true)}
                  />
                )}
              </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Condición: <strong>{product.condition}</strong>
          </p>
          <p className="text-4xl font-bold text-[#E88C76] dark:text-[#F0A99A] mb-8">
            ${formatPriceCLP(product.price)}
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Descripción</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Medidas / Talla</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {product.measurements}
            </p>
          </div>
          {product.attributes && product.attributes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Características</h3>
              <dl className="space-y-2">
                {Object.entries(
                  product.attributes.reduce((acc: any, attr: any) => {
                    const key = attr.attribute.id;
                    if (!acc[key]) {
                      acc[key] = {
                        name: attr.attribute.name,
                        values: [],
                      };
                    }
                    const value = attr.textValue || attr.option?.value;
                    if (value) {
                      acc[key].values.push(value);
                    }
                    return acc;
                  }, {})
                ).map(([attrId, data]: [string, any]) => (
                  <div
                    key={attrId}
                    className="flex flex-col sm:flex-row sm:gap-4"
                  >
                    <dt className="font-medium text-gray-900 dark:text-gray-200 sm:w-1/3">
                      {data.name}:
                    </dt>
                    <dd className="sm:w-2/3 flex flex-wrap gap-2 items-center">
                      {data.values.map((val: string, idx: number) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-brand-pill rounded-full text-sm font-semibold border border-brand-primary"
                          style={{ minHeight: 32 }}
                        >
                          {val}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="font-semibold text-lg mb-4">
              ¿Te interesa? Contacta por WhatsApp:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/56991594818?text=Hola%2C%20me%20interesa%20el%20producto%3A%20${encodeURIComponent(product.title)}%20%24${formatPriceCLP(product.price)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#04b948] hover:bg-[#039e3a] text-white !text-white font-semibold rounded-lg shadow-sm transition-colors"
              >
                <Image src="/images/icons/whatsapp-white.svg" alt="WhatsApp" width={24} height={24} className="w-6 h-6" />
                Escribir a Tito
              </a>
              <a
                href={`https://wa.me/56996990301?text=Hola%2C%20me%20interesa%20el%20producto%3A%20${encodeURIComponent(product.title)}%20%24${formatPriceCLP(product.price)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#04b948] hover:bg-[#039e3a] text-white !text-white font-semibold rounded-lg shadow-sm transition-colors"
              >
                <Image src="/images/icons/whatsapp-white.svg" alt="WhatsApp" width={24} height={24} className="w-6 h-6" />
                Escribir a Nati
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de edición */}
      <EditProductModal
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        productId={product.id}
        onSuccess={() => setEditOpen(false)}
      />
    </main>
  );
}