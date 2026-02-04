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
          <p style={{ margin: "0 0 1.5rem", color: "var(--text-secondary)", fontSize: "1.1rem" }}>
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
              color: "var(--text-tertiary)", 
              lineHeight: "1.6",
              whiteSpace: "pre-line"
            }}>
              {product.description}
            </p>
          </div>

          {/* Medidas */}
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ margin: "0 0 0.5rem", fontSize: "1.1rem" }}>
              Medidas / Talla
            </h3>
            <p style={{ 
              margin: 0, 
              color: "var(--text-tertiary)", 
              lineHeight: "1.6",
              whiteSpace: "pre-line"
            }}>
              {product.measurements}
            </p>
          </div>

          {/* Botones de contacto WhatsApp */}
          <div style={{ marginTop: "2rem" }}>
            <p style={{ margin: "0 0 1rem", fontWeight: 600, fontSize: "1rem" }}>
              ¿Te interesa? Contacta por WhatsApp:
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href={`https://wa.me/56991594818?text=Hola%2C%20me%20interesa%20el%20producto%3A%20${encodeURIComponent(product.title)}%20%24${formatPriceCLP(product.price)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  background: "#25D366",
                  color: "white",
                  borderRadius: "8px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "background 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#20BA5A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#25D366";
                }}
              >
                💬 Escribir a Tito
              </a>
              <a
                href={`https://wa.me/56996990301?text=Hola%2C%20me%20interesa%20el%20producto%3A%20${encodeURIComponent(product.title)}%20%24${formatPriceCLP(product.price)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  background: "#25D366",
                  color: "white",
                  borderRadius: "8px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "background 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#20BA5A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#25D366";
                }}
              >
                💬 Escribir a Nati
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
