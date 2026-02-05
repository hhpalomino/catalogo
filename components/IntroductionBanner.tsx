"use client";

export default function IntroductionBanner() {
  return (
    <div className="w-full bg-gradient-to-br from-blue-600 via-blue-500 to-amber-400 dark:from-blue-800 dark:via-blue-700 dark:to-amber-600 py-16 shadow-lg">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            ¡Hola! Somos Nati y Tito
          </h2>
          <p className="text-lg sm:text-xl text-white/95 max-w-2xl mx-auto mb-8 drop-shadow-md font-medium">
            Vendemos nuestras cosas. Si tienes cualquier duda sobre algún producto, 
            <span className="block mt-1">escríbenos por WhatsApp:</span>
          </p>

          {/* Botones de WhatsApp */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/56996990301?text=Hola%20Nati%2C%20te%20escribo%20desde%20tu%20cat%C3%A1logo%20de%20productos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-100 text-emerald-600 font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
            >
              <span className="text-2xl">💬</span>
              <div className="text-left">
                <div className="font-bold">Escribir a Nati</div>
                <div className="text-sm font-semibold text-emerald-500">(+56 9 9699 0301)</div>
              </div>
            </a>
            <a
              href="https://wa.me/56991594818?text=Hola%20Tito%2C%20te%20escribo%20desde%20tu%20cat%C3%A1logo%20de%20productos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-100 text-emerald-600 font-bold rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
            >
              <span className="text-2xl">💬</span>
              <div className="text-left">
                <div className="font-bold">Escribir a Tito</div>
                <div className="text-sm font-semibold text-emerald-500">(+56 9 9159 4818)</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
