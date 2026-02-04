import { Metadata } from "next";
import products from "@/data/products";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Nati y Tito venden sus cosas :D",
  description: "Explora nuestro catálogo de productos disponibles",
};

export default function Home() {
  const availableProducts = products.filter(
    (product) => product.state === "available"
  );

  return (
    <main style={{ padding: "1rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ 
        fontSize: "2.5rem", 
        marginBottom: "1.5rem",
        fontWeight: 700,
        color: "#1a1a1a",
        letterSpacing: "-0.02em"
      }}>
        Nati y Tito venden sus cosas :D
      </h1>

      {availableProducts.length === 0 ? (
        <p style={{ color: "#666" }}>No hay productos disponibles en este momento.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))",
            gap: "1.5rem"
          }}
        >
          {availableProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
