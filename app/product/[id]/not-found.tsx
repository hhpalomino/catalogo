"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    // Contenedor principal - página 404
    // flex: utiliza flexbox para centrar
    // flex-col: alinea items verticalmente
    // items-center: centra horizontalmente
    // justify-center: centra verticalmente
    // min-h-screen: altura mínima de todo el viewport
    // md:min-h-[60vh]: altura mínima 60vh en tablets y arriba (deja espacio para header)
    // px-4: padding horizontal 1rem
    // py-8: padding vertical 2rem
    // text-center: centra el texto
    <main className="flex flex-col items-center justify-center min-h-screen md:min-h-[60vh] px-4 py-8 text-center">
      {/* Número 404 */}
      {/* text-6xl: 60px */}
      {/* md:text-7xl: 84px en tablets */}
      {/* font-bold: peso 700 */}
      {/* mb-4: margen inferior 1rem */}
      {/* text-emerald-600: verde sage */}
      {/* dark:text-emerald-400: verde sage más claro en dark mode */}
      <h1 className="text-6xl md:text-7xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        404
      </h1>

      {/* Título "Producto no encontrado" */}
      {/* text-2xl: 24px */}
      {/* md:text-3xl: 30px en tablets */}
      {/* font-semibold: peso 600 */}
      {/* mb-4: margen inferior 1rem */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        Producto no encontrado
      </h2>

      {/* Texto descriptivo */}
      {/* text-slate-600: gris en light mode */}
      {/* dark:text-slate-400: gris claro en dark mode */}
      {/* mb-8: margen inferior 2rem */}
      {/* max-w-md: ancho máximo 448px */}
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
        Lo sentimos, no pudimos encontrar el producto que estás buscando.
        Puede que haya sido eliminado o nunca existió.
      </p>

      {/* Botón para volver al catálogo */}
      {/* inline-block: se muestra en línea pero se puede estilizar */}
      {/* px-6: padding horizontal 1.5rem */}
      {/* py-3: padding vertical 0.75rem */}
      {/* bg-emerald-600: fondo verde sage */}
      {/* hover:bg-emerald-700: verde sage oscuro al pasar mouse */}
      {/* active:bg-emerald-800: verde sage aún más oscuro al hacer click */}
      {/* text-white: texto blanco */}
      {/* font-semibold: peso 600 */}
      {/* rounded-lg: bordes redondeados */}
      {/* transition-colors: anima cambios de color */}
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg transition-colors"
      >
        Volver al catálogo
      </Link>
    </main>
  );
}

