import { getStateBadge } from "@/lib/product-ui";

type StateBadgeProps = {
  state: string;
  size?: "sm" | "md";
};

export default function StateBadge({ state, size = "sm" }: StateBadgeProps) {
  const badge = getStateBadge(state);
  const isSmall = size === "sm";

  return (
    <span
      style={{
        display: "inline-block",
        padding: isSmall ? "6px 10px" : "8px 14px",
        borderRadius: "999px",
        fontSize: isSmall ? "12px" : "13px",
        fontWeight: 700,
        background: badge.bg,
        color: badge.color,
        border: `1px solid ${badge.border ?? "transparent"}`,
        letterSpacing: "0.2px",
      }}
    >
      {badge.label}
    </span>
  );
}
