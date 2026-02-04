import { getStateBadge } from "@/lib/product-ui";

type StateBadgeProps = {
  state: string;
  size?: "sm" | "md";
};

export default function StateBadge({ state, size = "sm" }: StateBadgeProps) {
  // Obtener información del estado (label, colores, etc)
  const badge = getStateBadge(state);
  // Determinar si es tamaño pequeño o mediano
  const isSmall = size === "sm";

  return (
    // Badge con estilos dinámicos según el estado
    // inline-block: se muestra en línea pero se puede dar ancho y alto
    // rounded-full: bordes completamente redondeados (píldora)
    // font-bold: peso 700
    // tracking-wider: aumenta el espaciado entre letras
    // border: borde de 1px
    // Clases condicionales según tamaño:
    // Si es pequeño (sm):
    //   - px-2.5: padding horizontal 0.625rem (10px)
    //   - py-1: padding vertical 0.25rem (4px)
    //   - text-xs: tamaño muy pequeño (12px)
    // Si es mediano (md):
    //   - px-3.5: padding horizontal 0.875rem (14px)
    //   - py-1.5: padding vertical 0.375rem (6px)
    //   - text-sm: tamaño pequeño (14px)
    // Los colores vienen de la función getStateBadge() que devuelve:
    // - badge.bg: color de fondo
    // - badge.color: color del texto
    // - badge.border: color del borde
    <span
      style={{
        display: "inline-block",
        borderRadius: "9999px",
        fontWeight: 700,
        letterSpacing: "0.2px",
        padding: isSmall ? "6px 10px" : "8px 14px",
        fontSize: isSmall ? "12px" : "13px",
        background: badge.bg,
        color: badge.color,
        border: `1px solid ${badge.border ?? "transparent"}`,
      }}
    >
      {badge.label}
    </span>
  );
}

