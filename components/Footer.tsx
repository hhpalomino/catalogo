import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-gradient-to-b from-[#F0F3F1] to-[#E2E7E3] dark:from-[#455C47] dark:to-[#3F5C43] border-t border-[#DADADA] dark:border-[#334B37]">
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        {/* Grid de 3 columnas en desktop, 1 en mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Columna 1: Información de la marca */}
          <div>
            <h3 className="text-lg font-bold text-[#4F6F52] dark:text-[#FFFFFF] mb-3">
              Garage Market
            </h3>
            <p className="text-sm text-[#6B6B6B] dark:text-[#E2E7E3]">
              Venden sus cosas con la mejor calidad y atención al cliente.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-sm font-semibold text-[#2E2E2E] dark:text-[#FFFFFF] mb-4 uppercase tracking-wide">
              Enlaces rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-[#6B6B6B] dark:text-[#E2E7E3] hover:text-[#4F6F52] dark:hover:text-[#C26D4A] transition-colors"
                >
                  Catálogo de productos
                </Link>
              </li>
              <li>
                <a
                  href="/admin"
                  className="text-sm text-[#6B6B6B] dark:text-[#E2E7E3] hover:text-[#4F6F52] dark:hover:text-[#C26D4A] transition-colors"
                >
                  Panel de administración
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="text-sm font-semibold text-[#2E2E2E] dark:text-[#FFFFFF] mb-4 uppercase tracking-wide">
              Contacto
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-[#6B6B6B] dark:text-[#E2E7E3]">
                <span className="font-medium">Nati:</span> +56 9 9699 0301
              </li>
              <li className="text-sm text-[#6B6B6B] dark:text-[#E2E7E3]">
                <span className="font-medium">Tito:</span> +56 9 9159 4818
              </li>
              <li className="text-sm text-[#6B6B6B] dark:text-[#E2E7E3] mt-3">
                📍 Santiago, Chile
              </li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-[#DADADA] dark:border-[#334B37] pt-8"></div>

        {/* Footer inferior */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B6B6B] dark:text-[#E2E7E3]">
          <div>
            © {currentYear} Garage Market. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <a
              href="#"
              className="hover:text-[#4F6F52] dark:hover:text-[#C26D4A] transition-colors"
            >
              Privacidad
            </a>
            <a
              href="#"
              className="hover:text-[#4F6F52] dark:hover:text-[#C26D4A] transition-colors"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
