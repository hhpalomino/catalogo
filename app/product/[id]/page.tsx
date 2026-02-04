import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import products from "@/data/products";
import ProductGallery from "@/components/ProductGallery";
import StateBadge from "@/components/StateBadge";
import { formatPriceCLP } from "@/lib/product-ui";

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

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

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    notFound();
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Header con botón volver */}
      <Link 
        href="/" 
        style={{ 
          display: "inline-block", 
          marginBottom: "1.5rem", 
          color: "#0070f3",
          textDecoration: "none",
          fontSize: "0.95rem"
        }}
      >
        ← Volver al catálogo
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(400px, 100%), 1fr))",
          gap: "2rem",
        }}
      >
        {/* Columna izquierda: Galería */}
        <div>
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* Columna derecha: Info */}
        <div>
          {/* Badge de estado */}
          <div style={{ marginBottom: "1rem" }}>
            <StateBadge state={product.state} size="md" />
          </div>

          {/* Título */}
          <h1 style={{ margin: "0 0 0.5rem", fontSize: "2rem" }}>
            {product.title}
          </h1>

          {/* Condición */}
          <p style={{ margin: "0 0 1.5rem", color: "#666", fontSize: "1.1rem" }}>
            Condición: <strong>{product.condition}</strong>
          </p>

          {/* Precio */}
          <p style={{ 
            margin: "0 0 2rem", 
            fontSize: "2rem", 
            fontWeight: 700,
            color: "#0070f3"
          }}>
            ${formatPriceCLP(product.price)}
          </p>

          {/* Descripción */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>
              Descripción
            </h3>
            <p style={{ 
              margin: 0, 
              color: "#444", 
              lineHeight: "1.6",
              whiteSpace: "pre-line"
            }}>
              {product.description}
            </p>
          </div>

          {/* Medidas */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>
              Medidas / Talla
            </h3>
            <p style={{ 
              margin: 0, 
              color: "#444", 
              lineHeight: "1.6",
              whiteSpace: "pre-line"
            }}>
              {product.measurements}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
