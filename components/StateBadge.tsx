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

  // Parse color to get background, text and border
  const bgColor = status.color;
  const textColor = "#ffffff"; // Always white text for better contrast
  const borderColor = status.color;

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

