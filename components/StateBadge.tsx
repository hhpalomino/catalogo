type StateBadgeProps = {
  status: {
    id: string;
    name: string;
    displayName: string;
    color: string;
    displayOrder: number;
    isActive: boolean;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  size?: "sm" | "md";
};

export default function StateBadge({ status, size = "sm" }: StateBadgeProps) {
  // Determinar si es tamaño pequeño o mediano
  const isSmall = size === "sm";

  // Usar nueva paleta si el color es antiguo
  let bgColor = status.color;
  let borderColor = status.color;
  let textColor = "#ffffff";
  // Detectar colores antiguos y reemplazar
  const oldColors = [
    "#4F6F52", "#C26D4A", "olive", "#3F5C43", "#E3BDAD",
    "#B05A3A", "#E8B5A0", "#334B37", "#6B8C6F", "#F0F3F1"
  ];
  if (oldColors.includes(status.color)) {
    bgColor = "#2563EB"; // Azul principal
    borderColor = "#2563EB";
    textColor = "#fff";
  }

  return (
    <span
      style={{
        display: "inline-block",
        borderRadius: "9999px",
        fontWeight: 700,
        letterSpacing: "0.2px",
        padding: isSmall ? "6px 10px" : "8px 14px",
        fontSize: isSmall ? "12px" : "13px",
        background: bgColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      {status.displayName}
    </span>
  );
}

