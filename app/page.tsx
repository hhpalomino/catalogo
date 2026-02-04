"use client";

import { useState } from "react";
import products from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Definir orden de estados
  const stateOrder: Record<string, number> = {
    available: 1,
    reserved: 2,
    paid: 3,
    delivered: 4,
    sold: 5,
  };

  // Filtrar productos
  const filteredProducts = products
    .filter((product) => {
      // Filtro por estado
      if (selectedFilter !== "all" && product.state !== selectedFilter) {
        return false;
      }
      // Filtro por búsqueda
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.condition.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      // Ordenar por estado
      const orderA = stateOrder[a.state] || 999;
      const orderB = stateOrder[b.state] || 999;
      return orderA - orderB;
    });

  // Contar productos por estado
  const counts = {
    all: products.length,
    available: products.filter((p) => p.state === "available").length,
    reserved: products.filter((p) => p.state === "reserved").length,
    paid: products.filter((p) => p.state === "paid").length,
    delivered: products.filter((p) => p.state === "delivered").length,
    sold: products.filter((p) => p.state === "sold").length,
  };

  const filters = [
    { id: "all", label: "Todos", count: counts.all },
    { id: "available", label: "Disponible", count: counts.available },
    { id: "reserved", label: "Reservado", count: counts.reserved },
    { id: "paid", label: "Pagado", count: counts.paid },
    { id: "delivered", label: "Entregado", count: counts.delivered },
    { id: "sold", label: "Vendido", count: counts.sold },
  ];

  return (
    <main style={{ padding: "1rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 style={{ 
        fontSize: "2.5rem", 
        marginBottom: "1.5rem",
        fontWeight: 700,
        letterSpacing: "-0.02em"
      }}>
        Nati y Tito venden sus cosas :D
      </h1>

      {/* Botones de contacto WhatsApp */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href="https://wa.me/56991594818?text=Hola%20Tito%2C%20te%20escribo%20desde%20tu%20cat%C3%A1logo%20de%20productos"
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
            💬 WhatsApp Tito
          </a>
          <a
            href="https://wa.me/56996990301?text=Hola%20Nati%2C%20te%20escribo%20desde%20tu%20cat%C3%A1logo%20de%20productos"
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
            💬 WhatsApp Nati
          </a>
        </div>
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "0.75rem 1rem",
            fontSize: "1rem",
            border: "2px solid var(--border)",
            borderRadius: "8px",
            background: "var(--background)",
            color: "var(--foreground)",
            outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#0070f3";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
          }}
        />
      </div>

      {/* Filtros */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.id)}
            style={{
              padding: "0.5rem 1rem",
              border: selectedFilter === filter.id ? "2px solid #0070f3" : "2px solid var(--border)",
              borderRadius: "8px",
              background: selectedFilter === filter.id ? "#0070f3" : "var(--background)",
              color: selectedFilter === filter.id ? "white" : "var(--foreground)",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: selectedFilter === filter.id ? 600 : 400,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (selectedFilter !== filter.id) {
                e.currentTarget.style.borderColor = "#0070f3";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedFilter !== filter.id) {
                e.currentTarget.style.borderColor = "var(--border)";
              }
            }}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      {/* Resultados */}
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 0" }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>
            {searchQuery
              ? `No se encontraron productos con "${searchQuery}"`
              : "No hay productos en esta categoría"}
          </p>
        </div>
      ) : (
        <>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
            Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"}
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))",
              gap: "1.5rem"
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
