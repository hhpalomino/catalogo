import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductGallery from "@/components/ProductGallery";
import StateBadge from "@/components/StateBadge";
import { formatPriceCLP } from "@/lib/product-ui";



export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      status: true,
    },
  });

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: `${product.title} - Catálogo`,
    description: product.description.replace(/\n/g, " "),
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      status: true,
      images: {
        orderBy: {
          displayOrder: "asc",
        },
      },
      attributes: {
        include: {
          attribute: true,
          option: true,
        },
      },
    },
  });

  if (!product) {
    notFound();
  }

  // Usar directamente product.images sin transformar

  return (
    // Contenedor principal de la página
    // px-4: padding horizontal en mobile (1rem)
    // sm:px-6: aumenta en tablets
    // lg:px-8: aumenta en desktop
    // py-8: padding vertical 2rem
    // max-w-6xl: ancho máximo 1152px
    // mx-auto: centra horizontalmente
    <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
      {/* Botón para volver al catálogo */}
      {/* inline-block: se muestra en línea pero se puede estilizar */}
      {/* mb-6: margen inferior 1.5rem */}
      {/* text-[#4F6F52]: texto olive */}
      {/* hover:text-[#3F5C43]: olive más oscuro al pasar mouse */}
      {/* text-sm: tamaño pequeño */}
      {/* transition-colors: anima cambios de color */}
      <Link
        href="/"
        className="inline-block mb-6 text-[#2563EB] hover:text-[#18468B] text-sm transition-colors"
      >
        ← Volver al catálogo
      </Link>

      {/* Grid responsivo para alinear imagen y contenido */}
      {/* grid: utiliza CSS Grid */}
      {/* grid-cols-1: 1 columna en mobile */}
      {/* md:grid-cols-2: 2 columnas en tablets y arriba */}
      {/* gap-8: espacio entre columnas (2rem) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda: Galería de imágenes */}
        <div>
          <ProductGallery images={product.images} title={product.title} />
        </div>

        {/* Columna derecha: Información del producto */}
        <div>
          {/* Badge de estado del producto */}
          {/* mb-4: margen inferior 1rem */}
          <div className="mb-4">
            <StateBadge status={product.status} size="md" />
          </div>

          {/* Título del producto */}
          {/* text-3xl: 30px en mobile */}
          {/* sm:text-4xl: 36px en tablets y arriba */}
          {/* font-bold: peso 700 */}
          {/* mb-2: margen inferior 0.5rem */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {product.title}
          </h1>

          {/* Condición del producto */}
          {/* text-lg: 18px */}
          {/* text-gray-600: gris en light mode */}
          {/* dark:text-gray-400: gris claro en dark mode */}
          {/* mb-6: margen inferior 1.5rem */}
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Condición: <strong>{product.condition}</strong>
          </p>

          {/* Precio del producto */}
          {/* text-4xl: 36px */}
          {/* font-bold: peso 700 */}
          {/* text-[#C26D4A]: terracotta (color destacado de marca) */}
          {/* dark:text-[#E3BDAD]: terracotta más claro en dark mode */}
          {/* mb-8: margen inferior 2rem */}
          <p className="text-4xl font-bold text-[#E88C76] dark:text-[#F0A99A] mb-8">
            ${formatPriceCLP(product.price)}
          </p>

          {/* Sección de descripción */}
          {/* mb-6: margen inferior 1.5rem */}
          <div className="mb-6">
            {/* Título de sección */}
            {/* text-xl: 20px */}
            {/* font-semibold: peso 600 */}
            {/* mb-2: margen inferior 0.5rem */}
            <h3 className="text-xl font-semibold mb-2">
              Descripción
            </h3>
            {/* Contenido de descripción */}
            {/* text-gray-700: gris oscuro */}
            {/* dark:text-gray-300: gris claro en dark */}
            {/* leading-relaxed: aumenta el espaciado entre líneas (1.625) */}
            {/* whitespace-pre-line: preserva saltos de línea del texto */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>

          {/* Sección de medidas */}
          {/* mb-8: margen inferior 2rem */}
          <div className="mb-8">
            {/* Título de sección */}
            <h3 className="text-xl font-semibold mb-2">
              Medidas / Talla
            </h3>
            {/* Contenido de medidas */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {product.measurements}
            </p>
          </div>

          {/* Sección de atributos dinámicos */}
          {product.attributes && product.attributes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">
                Características
              </h3>
              <dl className="space-y-2">
                {/* Agrupar atributos por attributeId */}
                {Object.entries(
                  product.attributes.reduce((acc: any, attr: any) => {
                    const key = attr.attribute.id;
                    if (!acc[key]) {
                      acc[key] = {
                        name: attr.attribute.name,
                        values: [],
                      };
                    }
                    const value = attr.textValue || attr.option?.value;
                    if (value) {
                      acc[key].values.push(value);
                    }
                    return acc;
                  }, {})
                ).map(([attrId, data]: [string, any]) => (
                  <div
                    key={attrId}
                    className="flex flex-col sm:flex-row sm:gap-4"
                  >
                    <dt className="font-medium text-gray-900 dark:text-gray-200 sm:w-1/3">
                      {data.name}:
                    </dt>
                    <dd className="sm:w-2/3 flex flex-wrap gap-2 items-center">
                      {data.values.map((val: string, idx: number) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-brand-pill rounded-full text-sm font-semibold border border-brand-primary"
                          style={{ minHeight: 32 }}
                        >
                          {val}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Sección de contacto por WhatsApp */}
          {/* mt-8: margen superior 2rem */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            {/* Texto invitando a contactar */}
            {/* font-semibold: peso 600 */}
            {/* text-lg: 18px */}
            {/* mb-4: margen inferior 1rem */}
            <p className="font-semibold text-lg mb-4">
              ¿Te interesa? Contacta por WhatsApp:
            </p>
            {/* Contenedor con los dos botones */}
            {/* flex: utiliza flexbox */}
            {/* flex-col: una columna (vertical) en mobile */}
            {/* sm:flex-row: horizontal en tablets y arriba */}
            {/* gap-3: espacio entre botones (0.75rem) */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Botón WhatsApp para Tito - azul profesional */}
              {/* inline-flex: flexbox inline */}
              {/* items-center: centra verticalmente */}
              {/* gap-2: espacio entre emoji y texto */}
              {/* px-4: padding horizontal 1rem */}
              {/* py-2: padding vertical 0.5rem */}
              {/* bg-blue-500: fondo azul profesional */}
              {/* hover:bg-blue-600: azul más oscuro al pasar mouse */}
              {/* text-white: texto blanco */}
              {/* font-semibold: peso 600 */}
              {/* rounded-lg: bordes redondeados */}
              {/* shadow-md: sombra mediana */}
              {/* hover:shadow-lg: sombra grande al pasar mouse */}
              {/* transition-colors: anima cambios de color */}
              <a
                href={`https://wa.me/56991594818?text=Hola%2C%20me%20interesa%20el%20producto%3A%20${encodeURIComponent(product.title)}%20%24${formatPriceCLP(product.price)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#04b948] hover:bg-[#039e3a] text-white !text-white font-semibold rounded-lg shadow-sm transition-colors"
              >
                <img src="/images/icons/whatsapp-white.svg" alt="WhatsApp" className="w-6 h-6" />
                Escribir a Tito
              </a>
              <a
                href={`https://wa.me/56996990301?text=Hola%2C%20me%20interesa%20el%20producto%3A%20${encodeURIComponent(product.title)}%20%24${formatPriceCLP(product.price)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#04b948] hover:bg-[#039e3a] text-white !text-white font-semibold rounded-lg shadow-sm transition-colors"
              >
                <img src="/images/icons/whatsapp-white.svg" alt="WhatsApp" className="w-6 h-6" />
                Escribir a Nati
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
