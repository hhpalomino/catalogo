"use client";

import Link from "next/link";
import { useState } from "react";

export default function NotFound() {
  const [isHover, setIsHover] = useState(false);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: "0 0 1rem", color: "#0070f3" }}>
        404
      </h1>
      <h2 style={{ fontSize: "1.5rem", margin: "0 0 1rem", fontWeight: 600 }}>
        Producto no encontrado
      </h2>
      <p style={{ color: "#666", marginBottom: "2rem", maxWidth: "400px" }}>
        Lo sentimos, no pudimos encontrar el producto que estás buscando.
        Puede que haya sido eliminado o nunca existió.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          background: isHover ? "#0051cc" : "#0070f3",
          color: "white",
          borderRadius: "8px",
          fontWeight: 600,
          transition: "background 0.2s",
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        Volver al catálogo
      </Link>
    </main>
  );
}
