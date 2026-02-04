export function formatPriceCLP(price: number) {
  return price.toLocaleString("es-CL");
}

export function getStateBadge(state: string) {
  const normalized = (state || "").toLowerCase().trim();

  const map: Record<
    string,
    { label: string; bg: string; color: string; border?: string }
  > = {
    available: { label: "Disponible", bg: "#E8F7EE", color: "#16794C", border: "#BFE8D1" },
    reserved: { label: "Reservado", bg: "#FFF6E5", color: "#8A5A00", border: "#FFE3B3" },
    paid: { label: "Pagado", bg: "#EAF2FF", color: "#1E4DB7", border: "#C9DCFF" },
    delivered: { label: "Entregado", bg: "#F2F2F2", color: "#444", border: "#E0E0E0" },
    sold: { label: "Vendido", bg: "#FFECEC", color: "#A32020", border: "#FFC7C7" },
  };

  return (
    map[normalized] ?? {
      label: normalized ? normalized : "Sin estado",
      bg: "#F5F5F5",
      color: "#555",
      border: "#E5E5E5",
    }
  );
}
