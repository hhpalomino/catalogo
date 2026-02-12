import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#F3F7FF] dark:bg-[#1A2233] border-t border-[#E5E7EB] dark:border-[#25304A]">
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        {/* Grid de 3 columnas en desktop, 1 en mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Columna 1: Información de la marca */}
          <div>
            <h3 className="text-lg font-bold text-[#2563EB] dark:text-[#2563EB] mb-3">
              Garage Market
            </h3>
            <p className="text-sm text-[#64748B] dark:text-[#A3B0C5]">
              Venden sus cosas con la mejor calidad y atención al cliente.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-sm font-semibold text-[#143A73] dark:text-[#2563EB] mb-4 uppercase tracking-wide">
              Enlaces rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-[#2563EB] dark:text-[#2563EB] hover:text-[#18468B] dark:hover:text-[#E88C76] transition-colors"
                >
                  Catálogo de productos
                </Link>
              </li>
              <li>
                <a
                  href="/admin"
                  className="text-sm text-[#2563EB] dark:text-[#2563EB] hover:text-[#18468B] dark:hover:text-[#E88C76] transition-colors"
                >
                  Panel de administración
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="text-sm font-semibold text-[#143A73] dark:text-[#2563EB] mb-4 uppercase tracking-wide">
              Contacto
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-[#2563EB] dark:text-[#2563EB]">
                <span className="font-medium">Nati: +56 9 9699 0301</span>
              </li>
              <li className="text-sm text-[#2563EB] dark:text-[#2563EB]">
                <span className="font-medium">Tito: +56 9 9159 4818</span>
              </li>
              <li className="text-sm text-[#2563EB] dark:text-[#2563EB] mt-3">
                📍 Santiago, Chile
              </li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-[#E5E7EB] dark:border-[#25304A] pt-8"></div>

        {/* Footer inferior */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B] dark:text-[#A3B0C5]">
          <div>
            © 2026 Garage Market. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <a
              href="#"
              className="hover:text-[#2563EB] dark:hover:text-[#E88C76] transition-colors"
            >
              Privacidad
            </a>
            <a
              href="#"
              className="hover:text-[#E88C76] dark:hover:text-[#E88C76] transition-colors"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
