"use client";

/**
 * Skeleton loader animado mientras la imagen se carga
 * Simula el efecto de YouTube con una animación de "onda" gris
 */
export default function ImageSkeleton() {
  return (
    <div
      className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse rounded-lg"
      style={{
        backgroundSize: "200% 100%",
        animation: "shimmer 2s infinite",
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}
