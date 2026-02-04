"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPriceCLP } from "@/lib/product-ui";
import StateBadge from "@/components/StateBadge";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link 
      href={`/product/${product.id}`} 
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "1rem",
          position: "relative",
          overflow: "hidden",
          background: "white",
          cursor: "pointer",
          transition: "box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Badge */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            zIndex: 1,
          }}
        >
          <StateBadge state={product.state} />
        </div>

        {/* Imagen */}
        <div style={{ position: "relative", width: "100%", height: "160px", marginBottom: "0.75rem" }}>
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Info */}
        <h2 style={{ margin: "0 0 0.25rem", fontSize: "1.05rem" }}>
          {product.title}
        </h2>

        <p style={{ margin: "0 0 0.5rem", color: "#666" }}>
          {product.condition}
        </p>

        <p style={{ margin: 0, fontSize: "1.1rem" }}>
          <strong>${formatPriceCLP(product.price)}</strong>
        </p>
      </div>
    </Link>
  );
}