import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        {/* Grid de 3 columnas en desktop, 1 en mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Columna 1: Información de la marca */}
          <div>
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-3">
              Nati y Tito
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Venden sus cosas con la mejor calidad y atención al cliente.
            </p>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">
              Enlaces rápidos
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Catálogo de productos
                </Link>
              </li>
              <li>
                <a
                  href="/admin"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Panel de administración
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wide">
              Contacto
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium">Nati:</span> +56 9 9699 0301
              </li>
              <li className="text-sm text-slate-600 dark:text-slate-400">
                <span className="font-medium">Tito:</span> +56 9 9159 4818
              </li>
              <li className="text-sm text-slate-600 dark:text-slate-400 mt-3">
                📍 Santiago, Chile
              </li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8"></div>

        {/* Footer inferior */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div>
            © {currentYear} Nati y Tito. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacidad
            </a>
            <a
              href="#"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
